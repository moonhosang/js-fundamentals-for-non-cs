// 🔻 <desugar-viz> — async/await 가 .then 사다리로 '풀리는(desugar)' 과정 단계 애니메이션
//
// 왜 이렇게 만드나:
//  - 입문자는 async/await를 '완전 새 외계 문법'으로 받아들여 공포한다(cf. 화살표=문법설탕 함정 B17).
//    실제로는 Promise.then 위의 '읽기 좋은 껍데기'다. 그 변환을 좌(async)·우(.then) 나란히 두고
//    await 한 개가 '함수를 자르는 가위'가 되어 아래 전부를 .then 콜백으로 밀어넣는 걸 단계로 드러낸다.
//  - 핵심 payoff: await 뒷부분 = .then 콜백 = 🟣마이크로태스크. 마이크로 강의와 정확히 이어진다.
//
// 쓰는 법:
//   DesugarViz({ title, asyncCode:[...], steps:[ { aline, then:[...누적 우측 줄...], hot:[방금 추가된 우측 인덱스…], note } ] })

;(function () {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  class DesugarViz extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); this._step = 0 }
    set scenario(s) { this._s = s; this._step = 0; this._build() }
    connectedCallback() { if (this._s && !this._built) this._build() }

    _build() {
      this._built = true
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block; font-family:var(--font-sans,system-ui,sans-serif); color:var(--text,#1f2937); }
          .wrap { border:1px solid var(--border,#e5e7eb); border-radius:14px; overflow:hidden; background:var(--panel,#fff); }
          .head { display:flex; align-items:center; gap:10px; padding:10px 14px; border-bottom:1px solid var(--border,#e5e7eb); }
          .title { font-weight:700; font-size:14px; }
          .cols { display:grid; grid-template-columns:1fr 1fr; gap:0; }
          @media (max-width:620px){ .cols{ grid-template-columns:1fr; } }
          .col { padding:12px 14px; }
          .col.left { border-right:1px solid var(--border,#e5e7eb); }
          @media (max-width:620px){ .col.left{ border-right:none; border-bottom:1px solid var(--border,#e5e7eb); } }
          .col h4 { margin:0 0 8px; font-size:12px; font-weight:800; letter-spacing:.02em; display:flex; align-items:center; gap:6px; }
          .col.left h4 { color:var(--brand,#6366f1); }
          .col.right h4 { color:#7c3aed; }
          .codeblk { font-family:var(--font-mono,monospace); font-size:13px; line-height:1.75; white-space:pre; overflow-x:auto; }
          .cl { display:block; padding:0 6px; border-radius:4px; color:var(--muted,#6b7280); }
          .cl.on { background:var(--brand-soft,#eef2ff); color:var(--text,#1f2937); font-weight:700; box-shadow:inset 3px 0 0 var(--brand,#6366f1); }
          .col.right .cl.on { background:rgba(124,58,237,.12); box-shadow:inset 3px 0 0 #7c3aed; }
          .col.right .cl { color:var(--text,#1f2937); }
          .col.right .cl.fresh { animation: dsg-in .4s cubic-bezier(.2,.7,.3,1); }
          .col.right .placeholder { color:var(--muted,#9ca3af); font-style:italic; }
          .scissors { display:inline-block; }
          .note { padding:11px 14px; font-size:13px; border-top:1px solid var(--border,#e5e7eb); line-height:1.6; }
          .note b.k { color:#7c3aed; }
          .controls { display:flex; align-items:center; gap:8px; padding:10px 14px; border-top:1px solid var(--border,#e5e7eb); }
          .controls button { font:inherit; cursor:pointer; border:1px solid var(--border,#e5e7eb); background:var(--panel,#fff); border-radius:8px; padding:5px 12px; font-size:13px; }
          .controls button.primary { background:#7c3aed; color:#fff; border-color:#7c3aed; }
          .controls button:disabled { opacity:.4; cursor:not-allowed; }
          .counter { margin-left:auto; font-size:12.5px; color:var(--muted,#6b7280); font-variant-numeric:tabular-nums; }
          @keyframes dsg-in { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:none; } }
          @media (prefers-reduced-motion: reduce){ .col.right .cl.fresh { animation:none; } }
        </style>
        <div class="wrap">
          <div class="head"><span class="title"></span></div>
          <div class="cols">
            <div class="col left"><h4>✍️ 우리가 쓰는 코드 <small style="font-weight:500">(async / await)</small></h4><div class="codeblk leftcode"></div></div>
            <div class="col right"><h4>🔻 엔진이 보는 실체 <small style="font-weight:500">(Promise.then 사다리)</small></h4><div class="codeblk rightcode"></div></div>
          </div>
          <div class="note"></div>
          <div class="controls">
            <button data-prev>◀ 이전</button>
            <button data-next class="primary">🔻 다음 — 한 겹 풀기</button>
            <button data-reset>↺ 처음</button>
            <span class="counter"></span>
          </div>
        </div>
      `
      const $ = (s) => this.shadowRoot.querySelector(s)
      $('.title').textContent = this._s.title || 'async/await = Promise.then 껍데기'
      $('[data-prev]').onclick = () => { if (this._step > 0) { this._step--; this._update() } }
      $('[data-next]').onclick = () => { if (this._step < this._s.steps.length - 1) { this._step++; this._update() } }
      $('[data-reset]').onclick = () => { this._step = 0; this._update() }
      this._update()
    }

    _update() {
      const s = this._s
      const st = s.steps[this._step]
      const $ = (sel) => this.shadowRoot.querySelector(sel)
      const prevN = this._prevN || 0

      $('.leftcode').innerHTML = (s.asyncCode || []).map((l, i) =>
        `<span class="cl${i === st.aline ? ' on' : ''}">${esc(l)}</span>`).join('')

      const then = st.then || []
      const hot = new Set(st.hot || [])
      $('.rightcode').innerHTML = then.length ? then.map((l, i) =>
        `<span class="cl${hot.has(i) ? ' on' : ''}${i >= prevN ? ' fresh' : ''}">${esc(l)}</span>`).join('')
        : '<span class="placeholder">(아래 버튼을 누르면 한 겹씩 풀립니다)</span>'

      $('.note').innerHTML = st.note ? `<b class="k">🔻</b> ${st.note}` : ''
      $('[data-prev]').disabled = this._step <= 0
      $('[data-next]').disabled = this._step >= s.steps.length - 1
      $('.counter').textContent = `${this._step + 1} / ${s.steps.length}`
      this._prevN = then.length
    }
  }

  if (!customElements.get('desugar-viz')) customElements.define('desugar-viz', DesugarViz)
  window.DesugarViz = function (config) {
    const el = document.createElement('desugar-viz')
    el.scenario = config
    return el
  }
})()
