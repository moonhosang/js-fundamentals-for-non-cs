// ⏱ <promise-viz> — 여러 Promise의 '동시 진행'과 조합기(all/race/allSettled/any) 게이트 애니메이션
//
// 왜 이렇게 만드나:
//  - Promise.all/race의 핵심은 "여러 일이 '동시에' 흐르고, 어느 시점에 '묶음 결과'가 정해지나"는 시간 감각이다.
//    글·표로는 안 잡힌다 → 가로 타임라인 바가 '함께' 차오르고, 모드에 따라 게이트가 언제 확정되는지(결정선)
//    를 눈으로 보게 한다. 모드 버튼으로 같은 작업을 all↔race↔allSettled↔any 갈아 끼워 '대비'시킨다.
//
// 쓰는 법:
//   const el = PromiseViz({ title, mode:'all', tasks:[ {name:'A', ms:600, ok:true, value:'a'}, ... ] })
//   tasks[i] = { name, ms(끝나는 시각), ok(성공 여부), value(성공값) | reason(실패 사유) }

;(function () {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const MODES = {
    all:        { label: 'Promise.all',        desc: '<b>모두 성공</b>하면 값 배열. <b>하나라도 실패</b>하면 그 즉시 실패(fail-fast).' },
    allSettled: { label: 'Promise.allSettled',  desc: '성공·실패 상관없이 <b>전부 끝날 때까지</b> 기다려 각자 결과({status})를 담는다.' },
    race:       { label: 'Promise.race',        desc: '<b>제일 먼저 끝난 하나</b>로 확정 — 성공이든 실패든 first-settled.' },
    any:        { label: 'Promise.any',         desc: '<b>제일 먼저 성공한 하나</b>로 확정. 전부 실패해야 실패(AggregateError).' },
  }

  class PromiseViz extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); this._timers = []; this._playing = false }
    set scenario(s) { this._s = s; this._mode = s.mode || 'all'; this._build() }
    connectedCallback() { if (this._s && !this._built) this._build() }
    disconnectedCallback() { this._clear() }
    _clear() { this._timers.forEach(clearTimeout); this._timers = []; this._playing = false }

    _build() {
      this._built = true
      const tasks = this._s.tasks || []
      const maxMs = Math.max(1, ...tasks.map((t) => t.ms))
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block; font-family:var(--font-sans,system-ui,sans-serif); color:var(--text,#1f2937); }
          .wrap { border:1px solid var(--border,#e5e7eb); border-radius:14px; overflow:hidden; background:var(--panel,#fff); }
          .head { display:flex; align-items:center; gap:10px; padding:10px 14px; border-bottom:1px solid var(--border,#e5e7eb); flex-wrap:wrap; }
          .title { font-weight:700; font-size:14px; }
          .modes { margin-left:auto; display:flex; gap:5px; flex-wrap:wrap; }
          .modes button { font:inherit; font-size:12px; cursor:pointer; border:1px solid var(--border,#e5e7eb); background:var(--bg,#f6f7fb); color:var(--muted,#6b7280); border-radius:999px; padding:3px 10px; }
          .modes button.on { background:var(--brand,#6366f1); color:#fff; border-color:var(--brand,#6366f1); }
          .desc { padding:9px 14px; font-size:12.5px; background:var(--brand-soft,#eef2ff); color:var(--text,#1f2937); line-height:1.5; }
          .lanes { padding:14px 14px 6px; position:relative; }
          .lane { display:grid; grid-template-columns:64px 1fr auto; align-items:center; gap:10px; margin-bottom:11px; }
          .lname { font-family:var(--font-mono,monospace); font-weight:700; font-size:13px; }
          .track { position:relative; height:22px; background:var(--bg,#f6f7fb); border:1px solid var(--border,#e5e7eb); border-radius:999px; overflow:hidden; }
          .fill { position:absolute; inset:0 auto 0 0; width:0; border-radius:999px; background:linear-gradient(90deg,#a5b4fc,#6366f1); }
          .fill.ok { background:linear-gradient(90deg,#86efac,#16a34a); }
          .fill.fail { background:linear-gradient(90deg,#fca5a5,#ef4444); }
          .lresult { font-family:var(--font-mono,monospace); font-size:12.5px; font-weight:700; min-width:58px; text-align:right; opacity:0; transition:opacity .2s; }
          .lresult.show { opacity:1; }
          .lresult.ok { color:var(--green,#16a34a); }
          .lresult.fail { color:var(--red,#ef4444); }
          .settle-line { position:absolute; top:6px; bottom:34px; width:0; border-left:2.5px dashed #d97706; opacity:0; transition:opacity .25s; }
          .settle-line.show { opacity:1; }
          .settle-line span { position:absolute; top:-4px; left:6px; font-size:10px; font-weight:800; color:#b45309; white-space:nowrap; }
          .gate { margin:6px 14px 4px; border:1.5px dashed var(--border,#e5e7eb); border-radius:12px; padding:10px 12px; display:flex; align-items:center; gap:10px; transition:border-color .25s, background .25s; }
          .gate.settled.ok { border-color:var(--green,#16a34a); background:rgba(22,163,74,.06); }
          .gate.settled.fail { border-color:var(--red,#ef4444); background:rgba(239,68,68,.06); }
          .gate-tag { font-family:var(--font-mono,monospace); font-weight:800; font-size:13px; white-space:nowrap; }
          .gate-state { font-family:var(--font-mono,monospace); font-size:13px; font-weight:700; }
          .gate-state.pending { color:var(--muted,#9ca3af); font-weight:500; font-style:italic; }
          .gate-state.ok { color:var(--green,#16a34a); }
          .gate-state.fail { color:var(--red,#ef4444); }
          .gate-time { margin-left:auto; font-size:11.5px; color:var(--muted,#9ca3af); font-variant-numeric:tabular-nums; }
          .controls { display:flex; align-items:center; gap:8px; padding:10px 14px; border-top:1px solid var(--border,#e5e7eb); }
          .controls button { font:inherit; cursor:pointer; border:1px solid var(--border,#e5e7eb); background:var(--panel,#fff); border-radius:8px; padding:5px 13px; font-size:13px; }
          .controls button.primary { background:var(--brand,#6366f1); color:#fff; border-color:var(--brand,#6366f1); }
          .hint { margin-left:auto; font-size:11.5px; color:var(--muted,#9ca3af); }
          @media (prefers-reduced-motion: reduce) { .fill { transition:none !important; } }
        </style>
        <div class="wrap">
          <div class="head"><span class="title"></span><span class="modes"></span></div>
          <div class="desc"></div>
          <div class="lanes"></div>
          <div class="gate"><span class="gate-tag"></span><span class="gate-state pending">▶ 재생을 눌러 시작</span><span class="gate-time"></span></div>
          <div class="controls"><button data-play class="primary">▶ 재생</button><button data-reset>↺ 다시</button><span class="hint">막대가 함께 차오릅니다 — 게이트가 언제 확정되는지 보세요</span></div>
        </div>
      `
      const $ = (s) => this.shadowRoot.querySelector(s)
      $('.title').textContent = this._s.title || 'Promise 조합기'
      // 모드 버튼
      $('.modes').innerHTML = Object.keys(MODES).map((m) =>
        `<button data-mode="${m}" class="${m === this._mode ? 'on' : ''}">${MODES[m].label.replace('Promise.', '')}</button>`).join('')
      this.shadowRoot.querySelectorAll('[data-mode]').forEach((b) => {
        b.onclick = () => { this._mode = b.getAttribute('data-mode'); this._build() }
      })
      // 레인
      $('.lanes').innerHTML = tasks.map((t, i) =>
        `<div class="lane" data-i="${i}">
           <span class="lname">${esc(t.name)}</span>
           <div class="track"><div class="fill" style="transition:width ${t.ms}ms linear"></div></div>
           <span class="lresult">${esc(t.ok ? '✅ ' + t.value : '❌ ' + (t.reason || 'fail'))}</span>
         </div>`).join('') +
        `<div class="settle-line"><span></span></div>`
      $('.desc').innerHTML = '<b>' + MODES[this._mode].label + '</b> — ' + MODES[this._mode].desc
      $('.gate-tag').textContent = MODES[this._mode].label
      $('.gate-time').textContent = ''
      $('[data-play]').onclick = () => this._play()
      $('[data-reset]').onclick = () => this._build()
      this._maxMs = maxMs
    }

    _play() {
      if (this._playing) return
      this._playing = true
      const $ = (s) => this.shadowRoot.querySelector(s)
      const tasks = this._s.tasks || []
      const maxMs = this._maxMs
      // 막대 채우기 시작
      this.shadowRoot.querySelectorAll('.lane').forEach((lane, i) => {
        const fill = lane.querySelector('.fill')
        requestAnimationFrame(() => { fill.style.width = '100%' })
      })
      // 게이트 상태 계산 준비
      let settled = false
      const results = tasks.map(() => null)
      let okCount = 0, failCount = 0
      const settleGate = (kind, text, atMs) => {
        if (settled) return
        settled = true
        const g = $('.gate')
        g.classList.add('settled', kind)
        const gs = $('.gate-state'); gs.className = 'gate-state ' + kind; gs.innerHTML = text
        $('.gate-time').textContent = '⏱ ' + atMs + 'ms 시점 확정'
        // 결정선
        const line = $('.settle-line')
        // track 영역은 grid 2번째 칼럼 — 대략 위치: lanes 패딩(14) + lname(64) + gap(10)
        const pct = Math.min(100, (atMs / maxMs) * 100)
        line.style.left = `calc(88px + (100% - 88px - 14px - 58px - 10px) * ${pct / 100})`
        line.querySelector('span').textContent = '여기서 확정 (' + atMs + 'ms)'
        line.classList.add('show')
      }
      // 각 작업 완료 스케줄
      tasks.forEach((t, i) => {
        const id = setTimeout(() => {
          const lane = this.shadowRoot.querySelector(`.lane[data-i="${i}"]`)
          const fill = lane.querySelector('.fill'); fill.classList.add(t.ok ? 'ok' : 'fail')
          const lr = lane.querySelector('.lresult'); lr.classList.add('show', t.ok ? 'ok' : 'fail')
          results[i] = t
          if (t.ok) okCount++; else failCount++
          // 모드별 게이트 판정
          const m = this._mode
          if (m === 'race') {
            settleGate(t.ok ? 'ok' : 'fail', t.ok ? '✅ ' + t.value + ' <small>(제일 먼저 끝남)</small>' : '❌ ' + (t.reason || 'fail') + ' <small>(제일 먼저 끝남)</small>', t.ms)
          } else if (m === 'any') {
            if (t.ok) settleGate('ok', '✅ ' + t.value + ' <small>(제일 먼저 성공)</small>', t.ms)
            else if (failCount === tasks.length) settleGate('fail', '❌ AggregateError <small>(전부 실패)</small>', t.ms)
          } else if (m === 'all') {
            if (!t.ok) settleGate('fail', '❌ ' + (t.reason || 'fail') + ' <small>(하나 실패 → 즉시 실패)</small>', t.ms)
            else if (okCount === tasks.length) settleGate('ok', '✅ [' + tasks.map((x) => x.value).join(', ') + '] <small>(모두 성공)</small>', t.ms)
          } else if (m === 'allSettled') {
            if (okCount + failCount === tasks.length) {
              settleGate('ok', '✅ [' + tasks.map((x) => x.ok ? 'fulfilled:' + x.value : 'rejected').join(', ') + '] <small>(전부 끝남)</small>', t.ms)
            }
          }
        }, t.ms)
        this._timers.push(id)
      })
    }
  }

  if (!customElements.get('promise-viz')) customElements.define('promise-viz', PromiseViz)
  window.PromiseViz = function (config) {
    const el = document.createElement('promise-viz')
    el.scenario = config
    return el
  }
})()
