// 🔁 <event-loop-viz> — 이벤트 루프 단계 애니메이션 (웹 컴포넌트, Shadow DOM)
//
// 왜 이렇게 만드나:
//  - MemoryModel은 '스택+힙'(값이 어디 사나)이 메타포다. 이벤트 루프는 '두 대기줄과 한 실행대 사이를
//    콜백이 오가는' 시간 축이라 다른 그림이 필요하다. 큐가 차고→콜스택 빔→큐에서 꺼내 실행→출력을
//    '항목이 이동하는 애니메이션'으로 보여줘 순서를 몸으로 익히게 한다.
//  - 개념 모델(notional machine): 실제 엔진 큐 구현과 1:1은 아니지만, "이렇게 상상하면 순서를 정확히
//    예측한다"는 일관 모형. 🟣마이크로(Promise) 먼저·전부 / 🟠매크로(setTimeout·이벤트) 나중·하나.
//
// 쓰는 법:
//   const el = EventLoopViz({ title, code:[...], steps:[ snapshot, ... ] })
//   snapshot = {
//     line: <code 인덱스 하이라이트 | null>,
//     stack: [ 'main', {label:'then콜백', from:'micro'} ],   // 아래→위(맨 뒤가 top=실행 중)
//     micro: [ '() → print "3"' | {label} ],                  // 🟣 큐: 앞(index 0)이 다음 차례
//     macro: [ '() → print "2"' ],                            // 🟠 큐
//     out:   [ '1', '4' ],                                    // 🖨️ 누적 출력(마지막이 방금 찍힘)
//     phase: 'sync'|'drain-micro'|'drain-macro'|'idle',       // (선택) 지금 국면 배지
//     note:  'html',
//   }

;(function () {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const asItem = (x) => (x && typeof x === 'object') ? x : { label: String(x) }
  const PHASE = {
    sync: { t: '동기 실행', c: '#6366f1' },
    delegate: { t: '🌐 브라우저에 위임', c: '#0891b2' },
    'drain-micro': { t: '🟣 마이크로 비우기', c: '#7c3aed' },
    'drain-macro': { t: '🟠 매크로 하나', c: '#d97706' },
    render: { t: '🖼️ 화면 렌더', c: '#16a34a' },
    idle: { t: '큐 대기', c: '#6b7280' },
  }

  class EventLoopViz extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this._step = 0
      this._timer = null
    }

    set scenario(s) { this._s = s; this._step = 0; this._prev = null; this._build() }
    connectedCallback() { if (this._s && !this._built) this._build() }
    disconnectedCallback() { this._stopAuto() }

    _build() {
      this._built = true
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block; font-family: var(--font-sans, system-ui, sans-serif); color: var(--text,#1f2937); }
          .wrap { border:1px solid var(--border,#e5e7eb); border-radius:14px; overflow:hidden; background:var(--panel,#fff); position:relative; }
          /* ✈️ 큐 → 콜스택 비행체(FLIP): 큐 칩이 떠올라 콜스택으로 날아가 착지 */
          .flyer { position:absolute; z-index:6; font-family:var(--font-mono,monospace); font-size:12px; border:1.5px solid; border-radius:999px; padding:4px 11px; background:var(--panel,#fff); white-space:nowrap; box-shadow:0 6px 18px rgba(0,0,0,.16); transition:transform .62s cubic-bezier(.34,.02,.2,1), opacity .62s ease; will-change:transform, opacity; pointer-events:none; }
          .flyer.micro { border-color:#7c3aed; color:#7c3aed; }
          .flyer.macro { border-color:#d97706; color:#b45309; }
          .frame.arriving { opacity:0; }
          .head { display:flex; align-items:center; gap:10px; padding:10px 14px; border-bottom:1px solid var(--border,#e5e7eb); flex-wrap:wrap; }
          .title { font-weight:700; font-size:14px; }
          .phase { margin-left:auto; font-size:11.5px; font-weight:800; color:#fff; border-radius:999px; padding:3px 11px; }
          .code { font-family: var(--font-mono, monospace); font-size:13px; background:var(--bg,#f6f7fb); padding:10px 14px; line-height:1.7; white-space:pre; overflow-x:auto; }
          .code .ln { display:block; padding:0 6px; border-radius:4px; color:var(--muted,#6b7280); }
          .code .ln.active { background:var(--brand-soft,#eef2ff); color:var(--text,#1f2937); font-weight:700; box-shadow:inset 3px 0 0 var(--brand,#6366f1); }
          .stage { display:grid; grid-template-columns: 1fr 1.3fr; gap:14px; padding:14px; }
          @media (max-width:560px){ .stage{ grid-template-columns:1fr; } }
          .zone { border:1.5px solid var(--border,#e5e7eb); border-radius:12px; padding:8px 10px; background:var(--bg,#f6f7fb); min-height:64px; transition: box-shadow .25s, border-color .25s; }
          .zone.hot { border-color:var(--brand,#6366f1); box-shadow:0 0 0 3px var(--brand-soft,#eef2ff); }
          .zone.hot.micro { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,.18); }
          .zone.hot.macro { border-color:#d97706; box-shadow:0 0 0 3px rgba(217,119,6,.18); }
          .zone.hot.webapi { border-color:#0891b2; box-shadow:0 0 0 3px rgba(8,145,178,.18); }
          .zone.hot.render { border-color:#16a34a; box-shadow:0 0 0 3px rgba(22,163,74,.15); }
          .screen { border:1.5px solid var(--border,#e5e7eb); border-radius:8px; padding:9px 11px; font-size:12.5px; background:var(--panel,#fff); transition:background .2s,border-color .2s; min-height:34px; display:flex; align-items:center; gap:8px; }
          .screen.painting { border-color:#16a34a; background:rgba(22,163,74,.08); animation: elv-paint .55s ease; }
          .screen .rf { margin-left:auto; color:var(--muted,#9ca3af); font-family:var(--font-mono,monospace); font-size:11px; font-variant-numeric:tabular-nums; white-space:nowrap; }
          .screen .wait { color:var(--muted,#9ca3af); font-style:italic; }
          @keyframes elv-paint { from { background:#bbf7d0; } to { background:rgba(22,163,74,.08); } }
          .zlabel { font-size:11px; font-weight:800; color:var(--muted,#6b7280); letter-spacing:.02em; margin-bottom:7px; display:flex; align-items:center; gap:6px; }
          .zlabel .cnt { margin-left:auto; font-weight:700; color:var(--muted,#9ca3af); font-variant-numeric:tabular-nums; }
          .col-right { display:flex; flex-direction:column; gap:14px; }
          /* 콜스택 — 아래서 위로 쌓임(맨 위 top=실행 중) */
          .stackcol { display:flex; flex-direction:column-reverse; gap:6px; justify-content:flex-start; }
          .frame { font-family:var(--font-mono,monospace); font-size:12.5px; font-weight:700; border:1.5px solid var(--border,#e5e7eb); border-radius:8px; padding:5px 9px; background:var(--panel,#fff); display:flex; align-items:center; gap:7px; }
          .frame.top { border-color:var(--brand,#6366f1); box-shadow:0 0 0 2px var(--brand-soft,#eef2ff); }
          .frame.top .run { animation: elv-pulse 1.1s ease-in-out infinite; }
          .frame .run { font-size:11px; color:var(--brand,#6366f1); }
          .frame .dot { width:9px; height:9px; border-radius:50%; flex:none; }
          /* from-micro/from-macro는 '방금 큐에서 온 프레임' 표시자 — 실제 이동은 .flyer가 담당 */
          /* 큐 — 앞(다음 차례)이 왼쪽 */
          .queue { display:flex; align-items:center; gap:7px; flex-wrap:wrap; min-height:34px; }
          .chip { font-family:var(--font-mono,monospace); font-size:12px; border:1.5px solid; border-radius:999px; padding:4px 11px; background:var(--panel,#fff); position:relative; white-space:nowrap; }
          .chip.micro { border-color:#7c3aed; color:#7c3aed; }
          .chip.macro { border-color:#d97706; color:#b45309; }
          .chip.webapi { border-color:#0891b2; color:#0e7490; }
          .chip.next::before { content:'다음 ▶'; position:absolute; top:-9px; left:8px; font-size:8.5px; font-weight:800; color:var(--muted,#9ca3af); background:var(--panel,#fff); padding:0 3px; }
          .chip.enter { animation: elv-enter .34s cubic-bezier(.2,.7,.3,1); }
          .qempty { font-size:11.5px; color:var(--muted,#9ca3af); font-style:italic; padding:6px 4px; }
          /* 출력 */
          .outzone { margin:0 14px 12px; border:1.5px dashed var(--border,#e5e7eb); border-radius:12px; padding:8px 12px; background:var(--bg,#f6f7fb); }
          .outrow { display:flex; align-items:center; gap:7px; flex-wrap:wrap; min-height:30px; }
          .ochip { font-family:var(--font-mono,monospace); font-size:13px; font-weight:700; border:1.5px solid var(--green,#16a34a); color:var(--green,#16a34a); border-radius:8px; padding:3px 11px; background:var(--panel,#fff); }
          .ochip.enter { animation: elv-pop .34s cubic-bezier(.2,.7,.3,1); }
          .oarrow { color:var(--muted,#cbd5e1); font-size:12px; }
          .note { padding:11px 14px; font-size:13px; border-top:1px solid var(--border,#e5e7eb); line-height:1.6; }
          .note b.k { color:var(--brand,#6366f1); }
          .controls { display:flex; align-items:center; gap:8px; padding:10px 14px; border-top:1px solid var(--border,#e5e7eb); flex-wrap:wrap; }
          .controls button { font:inherit; cursor:pointer; border:1px solid var(--border,#e5e7eb); background:var(--panel,#fff); border-radius:8px; padding:5px 12px; font-size:13px; }
          .controls button.primary { background:var(--brand,#6366f1); color:#fff; border-color:var(--brand,#6366f1); }
          .controls button.play { background:#7c3aed; color:#fff; border-color:#7c3aed; }
          .controls button:disabled { opacity:.4; cursor:not-allowed; }
          .counter { margin-left:auto; font-size:12.5px; color:var(--muted,#6b7280); font-variant-numeric:tabular-nums; }
          @keyframes elv-enter { from { opacity:0; transform:translateX(20px) scale(.9); } to { opacity:1; transform:none; } }
          @keyframes elv-pop { from { opacity:0; transform:translateY(7px) scale(.8); } to { opacity:1; transform:none; } }
          @keyframes elv-pulse { 0%,100% { opacity:.5; } 50% { opacity:1; } }
          @keyframes elv-fly-micro { from { opacity:0; transform:translate(34px,-14px) scale(.85); box-shadow:0 0 0 4px rgba(124,58,237,.3); } to { opacity:1; transform:none; } }
          @keyframes elv-fly-macro { from { opacity:0; transform:translate(34px,14px) scale(.85); box-shadow:0 0 0 4px rgba(217,119,6,.3); } to { opacity:1; transform:none; } }
          @media (prefers-reduced-motion: reduce) { .chip.enter,.ochip.enter,.frame.from-micro,.frame.from-macro { animation:none; } .frame.top .run { animation:none; } }
        </style>
        <div class="wrap">
          <div class="head"><span class="title"></span><span class="phase"></span></div>
          <div class="code"></div>
          <div class="stage">
            <div class="zone stackzone"><div class="zlabel">📚 콜스택 <small style="font-weight:500">(지금 실행)</small><span class="cnt scnt"></span></div><div class="stackcol"></div></div>
            <div class="col-right">
              <div class="zone webapi"><div class="zlabel">🌐 Web API <small style="font-weight:500">(브라우저가 타이머·네트워크 대신 처리)</small><span class="cnt wacnt"></span></div><div class="queue webapiq"></div></div>
              <div class="zone micro"><div class="zlabel">🟣 마이크로 큐 <small style="font-weight:500">(Promise · 먼저·전부)</small><span class="cnt micnt"></span></div><div class="queue microq"></div></div>
              <div class="zone macro"><div class="zlabel">🟠 매크로 큐 <small style="font-weight:500">(setTimeout·이벤트 · 나중·하나)</small><span class="cnt macnt"></span></div><div class="queue macroq"></div></div>
              <div class="zone render"><div class="zlabel">🖼️ 렌더 <small style="font-weight:500">(화면 그리기 · ~60fps '기회')</small></div><div class="renderbox screen"></div></div>
            </div>
          </div>
          <div class="outzone"><div class="zlabel">🖨️ 출력 <small style="font-weight:500">(찍힌 순서)</small></div><div class="outrow"></div></div>
          <div class="note"></div>
          <div class="controls">
            <button data-prev>◀ 이전</button>
            <button data-next class="primary">▶ 다음 단계</button>
            <button data-play class="play">▶▶ 자동재생</button>
            <button data-reset>↺ 처음</button>
            <span class="counter"></span>
          </div>
        </div>
      `
      const $ = (s) => this.shadowRoot.querySelector(s)
      $('.title').textContent = this._s.title || '이벤트 루프 시뮬레이션'
      // 🌐 Web API 존은 쓰는 시나리오(위임 있는)에서만 노출 — microtask처럼 안 쓰면 숨겨 깔끔하게.
      this._hasWebapi = (this._s.steps || []).some((st) => (st.webapi || []).length)
      if (!this._hasWebapi) $('.zone.webapi').style.display = 'none'
      // 🖼️ 렌더 존도 위임 존과 같은 정책 — render 쓰는 시나리오(렌더 강)에서만 노출.
      this._hasRender = (this._s.steps || []).some((st) => st.render || st.phase === 'render')
      if (!this._hasRender) $('.zone.render').style.display = 'none'
      $('[data-prev]').onclick = () => { this._stopAuto(); if (this._step > 0) { this._step--; this._update() } }
      $('[data-next]').onclick = () => { this._stopAuto(); this._next() }
      $('[data-reset]').onclick = () => { this._stopAuto(); this._step = 0; this._update() }
      $('[data-play]').onclick = () => this._toggleAuto()
      this._update()
    }

    _next() { if (this._step < this._s.steps.length - 1) { this._step++; this._update(); return true } return false }
    _toggleAuto() {
      if (this._timer) { this._stopAuto(); return }
      if (this._step >= this._s.steps.length - 1) { this._step = 0; this._update() }
      this.shadowRoot.querySelector('[data-play]').textContent = '⏸ 멈춤'
      this._timer = setInterval(() => { if (!this._next()) this._stopAuto() }, 1150)
    }
    _stopAuto() { if (this._timer) { clearInterval(this._timer); this._timer = null } const b = this.shadowRoot.querySelector('[data-play]'); if (b) b.textContent = '▶▶ 자동재생' }

    _update() {
      const s = this._s
      const st = s.steps[this._step]
      const $ = (sel) => this.shadowRoot.querySelector(sel)
      const prev = this._prev || { stack: new Set(), webapi: new Set(), micro: new Set(), macro: new Set(), out: 0 }

      // ✈️ 비행 애니: 재렌더 '전에' 각 큐 맨 앞 칩의 화면 위치를 붙잡아 둔다(곧 콜스택으로 날아갈 후보).
      const flySrc = {}
      if (!this._reduceMotion()) {
        ;['micro', 'macro', 'webapi'].forEach((k) => {
          const c = this.shadowRoot.querySelector('.' + k + 'q .chip')
          if (c) { const r = c.getBoundingClientRect(); flySrc[k] = { left: r.left, top: r.top, w: r.width, text: c.textContent } }
        })
      }

      // 코드 하이라이트
      $('.code').innerHTML = (s.code || []).map((line, i) =>
        `<span class="ln${i === st.line ? ' active' : ''}">${esc(line)}</span>`).join('')

      // 국면 배지
      const ph = PHASE[st.phase]
      const pe = $('.phase')
      if (ph) { pe.style.display = ''; pe.style.background = ph.c; pe.textContent = ph.t }
      else pe.style.display = 'none'

      // 콜스택 (아래→위, column-reverse라 배열 순서대로 넣으면 첫 요소가 바닥)
      const stack = (st.stack || []).map(asItem)
      const curStack = new Set(stack.map((f, i) => i + ':' + f.label))
      $('.stackcol').innerHTML = stack.length ? stack.map((f, i) => {
        const top = i === stack.length - 1
        const key = i + ':' + f.label
        const fresh = !prev.stack.has(key)
        const fromCls = (fresh && f.from) ? ' from-' + f.from : ''
        const dot = f.from === 'micro' ? '<span class="dot" style="background:#7c3aed"></span>' : f.from === 'macro' ? '<span class="dot" style="background:#d97706"></span>' : ''
        return `<div class="frame${top ? ' top' : ''}${fromCls}">${dot}<span>${esc(f.label)}</span>${top ? '<span class="run">● 실행 중</span>' : ''}</div>`
      }).join('') : '<div class="qempty">(비어 있음 · 지금 실행 중인 코드 없음 → 이벤트 루프가 큐를 확인)</div>'

      // 큐 렌더러 (앞=다음 차례)
      const renderQueue = (arr, kind, prevSet) => {
        const items = (arr || []).map(asItem)
        const curSet = new Set(items.map((it, i) => i + ':' + it.label))
        const html = items.length ? items.map((it, i) => {
          const fresh = !prevSet.has(i + ':' + it.label)
          return `<span class="chip ${kind}${i === 0 ? ' next' : ''}${fresh ? ' enter' : ''}">${esc(it.label)}</span>`
        }).join('') : `<span class="qempty">(비어 있음)</span>`
        return { html, curSet, n: items.length }
      }
      const wa = renderQueue(st.webapi, 'webapi', prev.webapi)
      const mi = renderQueue(st.micro, 'micro', prev.micro)
      const ma = renderQueue(st.macro, 'macro', prev.macro)
      if (this._hasWebapi) $('.webapiq').innerHTML = wa.html
      $('.microq').innerHTML = mi.html
      $('.macroq').innerHTML = ma.html

      // 출력 (누적, 새로 늘어난 마지막 칩만 pop)
      const out = st.out || []
      $('.outrow').innerHTML = out.length ? out.map((o, i) =>
        `${i ? '<span class="oarrow">→</span>' : ''}<span class="ochip${i >= prev.out ? ' enter' : ''}">${esc(o)}</span>`
      ).join('') : '<span class="qempty">(아직 출력 없음)</span>'

      // 카운터
      $('.scnt').textContent = stack.length ? stack.length + '칸' : ''
      if (this._hasWebapi) $('.wacnt').textContent = wa.n ? wa.n + '개' : ''
      $('.micnt').textContent = mi.n ? mi.n + '개' : ''
      $('.macnt').textContent = ma.n ? ma.n + '개' : ''

      // 🖼️ 렌더 존 — st.render면 '그리는 중'(초록 플래시), 아니면 '그릴 차례 대기'. 프레임 = 지금까지 렌더 횟수.
      if (this._hasRender) {
        const painting = !!st.render
        const rframe = s.steps.slice(0, this._step + 1).filter((x) => x.render).length
        const rb = $('.renderbox')
        rb.className = 'renderbox screen' + (painting ? ' painting' : '')
        rb.innerHTML = painting
          ? `🖼️ <b>화면 그림!</b>${typeof st.render === 'string' ? ' <span>' + esc(st.render) + '</span>' : ''}<span class="rf">프레임 ${rframe}</span>`
          : `<span class="wait">🖼️ 그릴 차례 대기 (스택·마이크로 비어야 그림)</span><span class="rf">${rframe ? '최근 프레임 ' + rframe : '아직 못 그림'}</span>`
      }

      // 활성 구역 하이라이트
      $('.stackzone').classList.toggle('hot', st.phase === 'sync' || (stack.length > 0 && st.phase !== 'idle' && st.phase !== 'render'))
      if (this._hasWebapi) $('.zone.webapi').classList.toggle('hot', st.phase === 'delegate')
      $('.zone.micro').classList.toggle('hot', st.phase === 'drain-micro')
      $('.zone.macro').classList.toggle('hot', st.phase === 'drain-macro')
      if (this._hasRender) $('.zone.render').classList.toggle('hot', st.phase === 'render' || !!st.render)

      // 설명
      $('.note').innerHTML = st.note ? `<b class="k">🔑</b> ${st.note}` : ''

      // 버튼·카운터
      $('[data-prev]').disabled = this._step <= 0
      $('[data-next]').disabled = this._step >= s.steps.length - 1
      $('.counter').textContent = `${this._step + 1} / ${s.steps.length}`

      this._prev = { stack: curStack, webapi: wa.curSet, micro: mi.curSet, macro: ma.curSet, out: out.length }

      // ✈️ 방금 큐에서 온 프레임(from-*)을 그 출처 큐 위치에서 콜스택으로 날려 보낸다.
      this._flyIntoStack(flySrc)
    }

    _reduceMotion() { try { return matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false } }

    _flyIntoStack(flySrc) {
      const wrap = this.shadowRoot.querySelector('.wrap')
      if (!wrap) return
      const frames = this.shadowRoot.querySelectorAll('.frame.from-micro, .frame.from-macro')
      if (!frames.length) return
      requestAnimationFrame(() => {
        const wr = wrap.getBoundingClientRect()
        frames.forEach((fr) => {
          const kind = fr.classList.contains('from-micro') ? 'micro' : 'macro'
          const src = flySrc[kind]
          if (!src) return
          const dr = fr.getBoundingClientRect()
          fr.classList.add('arriving') // 착지 전까지 실제 프레임은 숨김(비행체가 대신 이동)
          const flyer = document.createElement('div')
          flyer.className = 'flyer ' + kind
          flyer.textContent = src.text
          flyer.style.left = (src.left - wr.left) + 'px'
          flyer.style.top = (src.top - wr.top) + 'px'
          flyer.style.width = src.w + 'px'
          wrap.appendChild(flyer)
          flyer.getBoundingClientRect() // reflow — 시작 위치 확정
          const dx = dr.left - src.left, dy = dr.top - src.top
          flyer.style.transform = `translate(${dx}px, ${dy}px)`
          flyer.style.opacity = '.6'
          let done = false
          const finish = () => { if (done) return; done = true; fr.classList.remove('arriving'); flyer.remove() }
          flyer.addEventListener('transitionend', finish, { once: true })
          setTimeout(finish, 780) // 폴백(transitionend 누락 대비)
        })
      })
    }
  }

  if (!customElements.get('event-loop-viz')) customElements.define('event-loop-viz', EventLoopViz)
  window.EventLoopViz = function (config) {
    const el = document.createElement('event-loop-viz')
    el.scenario = config
    return el
  }
})()
