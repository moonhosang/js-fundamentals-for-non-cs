// 🧠 <memory-model> — 메모리(콜 스택 + 힙) 단계별 시뮬레이터 (웹 컴포넌트, Shadow DOM)
//
// 왜 이렇게 만드나:
//  - 입문자에게 "값이 어디에 사나"를 시각으로 정확히 심는다. 대충 그리면 오해가 박힌다.
//  - JS는 스택/힙 배치가 '언어 명세'가 아니다(V8이 최적화). 그래서 이건 [개념 모델](notional machine) —
//    "이렇게 상상하면 코드 동작을 정확히 예측한다"는 일관된 모형이다. 실제 엔진 심화는 토글로 분리.
//
// 쓰는 법:
//   const el = MemoryModel({ title, code:[...], steps:[ snapshot, ... ] })
//   snapshot = {
//     line: <code 인덱스, 하이라이트>,
//     stack: [ { name:'main', slots:[ {name:'a', value:'3'} | {name:'obj', ref:'h1'} ] }, ... ],  // 아래→위
//     heap:  { h1: { label:'{ n: 9 }' }, h2:{ label:'[1, 2]' } },
//     note:  '개념 모델 설명',
//     engine:'실제 엔진(V8) 심화 — 토글 시 보임'
//   }

;(function () {
  const COLORS = ['#6366f1', '#0891b2', '#db2777', '#16a34a', '#d97706', '#7c3aed']
  const PRIM_COLOR = '#16a34a' // 원시값 셀·화살표 색(초록). model B: 원시값도 값 메모리에 산다.
  // 힙 박스가 'person'이면 필드에 이 아이콘을 붙여 사람 카드처럼 보여준다.
  const KEY_ICON = { hair: '💇', money: '💰', bestFriend: '👥', friends: '👥', name: '🏷️', age: '🎂', pet: '🐶', mood: '💬', level: '⭐', parent: '👆', children: '👶' }
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  class MemoryModel extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this._step = 0
      this._layer = 'concept' // 'concept' | 'engine'
    }

    set scenario(s) {
      this._s = s
      this._step = 0
      this._prev = null
      // 힙 id에 색을 고정 배정(모든 스텝에서 같은 객체 = 같은 색)
      const ids = new Set()
      ;(s.steps || []).forEach((st) => Object.keys(st.heap || {}).forEach((k) => ids.add(k)))
      this._color = {}
      ;[...ids].forEach((id, i) => { this._color[id] = COLORS[i % COLORS.length] })
      // 명시적 원시값 힙 박스({prim:true})는 값 메모리 색(초록)으로 — 자동 원시셀과 화살표 색 통일.
      ;(s.steps || []).forEach((st) => Object.entries(st.heap || {}).forEach(([k, box]) => { if (box && box.prim) this._color[k] = PRIM_COLOR }))
      // 원시값 셀(model B, ADR 0007): 슬롯 값을 값 메모리에 둔다 — 셀 id = 'p:'+frame#name, 초록 고정.
      ;(s.steps || []).forEach((st) => (st.stack || []).forEach((f) => (f.slots || []).forEach((sl) => {
        if (!('ref' in sl && sl.ref)) this._color['p:' + f.name + '#' + sl.name] = PRIM_COLOR
      })))
      this._build()
    }

    connectedCallback() { if (this._s && !this._built) this._build() }

    _build() {
      this._built = true
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block; font-family: var(--font-sans, system-ui, sans-serif); color: var(--text, #1f2937); }
          .wrap { border:1px solid var(--border,#e5e7eb); border-radius:14px; overflow:hidden; background:var(--panel,#fff); }
          .head { display:flex; align-items:center; gap:10px; padding:10px 14px; border-bottom:1px solid var(--border,#e5e7eb); flex-wrap:wrap; }
          .title { font-weight:700; font-size:14px; }
          .toggle { margin-left:auto; display:flex; align-items:center; gap:8px; font-size:12px; color:var(--muted,#6b7280); }
          .toggle button { font:inherit; cursor:pointer; border:1px solid var(--border,#e5e7eb); background:var(--bg,#f6f7fb); color:var(--muted,#6b7280); border-radius:999px; padding:3px 10px; font-size:12px; }
          .toggle button.on { background:var(--brand,#6366f1); color:#fff; border-color:var(--brand,#6366f1); }
          .code { font-family: var(--font-mono, monospace); font-size:13px; background:var(--bg,#f6f7fb); padding:10px 14px; line-height:1.7; white-space:pre; overflow-x:auto; }
          .code .ln { display:block; padding:0 6px; border-radius:4px; color:var(--muted,#6b7280); }
          .code .ln.active { background:var(--brand-soft,#eef2ff); color:var(--text,#1f2937); font-weight:700; }
          .stage { position:relative; display:grid; grid-template-columns:1fr 1fr; gap:16px; padding:16px; min-height:130px; }
          @media (max-width:560px){ .stage{ grid-template-columns:1fr; } }
          .col h4 { margin:0 0 8px; font-size:12px; color:var(--muted,#6b7280); letter-spacing:.02em; }
          .frame { border:1px solid var(--border,#e5e7eb); border-radius:10px; padding:6px; margin-bottom:8px; background:var(--bg,#f6f7fb); }
          .frame.top { border-color:var(--brand,#6366f1); box-shadow:0 0 0 2px var(--brand-soft,#eef2ff); }
          .frame-name { font-family:var(--font-mono,monospace); font-size:11px; color:var(--brand,#6366f1); font-weight:700; margin-bottom:4px; }
          .slot { display:flex; align-items:center; gap:8px; padding:4px 6px; }
          .sname { font-family:var(--font-mono,monospace); font-size:13px; font-weight:700; min-width:34px; }
          .sval { font-family:var(--font-mono,monospace); font-size:13px; border:1px solid var(--border,#e5e7eb); border-radius:6px; padding:2px 10px; background:var(--panel,#fff); }
          .sval.prim { color:#16a34a; }
          .sval.bad { color:#dc2626; border-color:#dc2626; background:#fef2f2; font-weight:700; }
          .sref { font-family:var(--font-mono,monospace); font-size:12px; font-weight:700; display:inline-flex; align-items:center; gap:5px; }
          .sref .dot { width:9px; height:9px; border-radius:50%; }
          .hbox { border:2px solid; border-radius:10px; padding:8px 10px; margin-bottom:8px; display:flex; align-items:center; gap:8px; background:var(--panel,#fff); }
          .htag { font-size:11px; font-weight:700; color:#fff; border-radius:6px; padding:1px 7px; }
          .hlabel { font-family:var(--font-mono,monospace); font-size:13px; }
          .hbox { align-items:flex-start; }
          .hbox.prim { border-width:1.5px; padding:4px 11px; align-items:center; }
          .hbox.prim::before { content:'🔒'; font-size:10px; opacity:.45; }
          .hbox.prim .hlabel { color:#16a34a; }
          .hbox.prim.bad { border-color:#dc2626 !important; }
          .hbox.prim.bad .hlabel { color:#dc2626; font-weight:700; }
          .hfields { display:flex; flex-direction:column; gap:2px; }
          .hfield { display:flex; align-items:center; gap:6px; font-family:var(--font-mono,monospace); font-size:12.5px; }
          .hfkey { color:var(--muted,#6b7280); }
          .hfval { color:var(--text,#1f2937); }
          .hbox.faded { opacity:.4; border-style:dashed; }
          .hbox.person { align-items:center; gap:10px; padding:10px 12px; }
          .pavatar { font-size:34px; line-height:1; flex:none; transition:transform .2s; }
          .hbox.person.flash .pavatar { transform:scale(1.25); }
          .pinfo { display:flex; flex-direction:column; gap:3px; min-width:0; }
          .pname { font-weight:800; font-size:14px; }
          .hlabel.arr { display:flex; align-items:center; gap:3px; flex-wrap:wrap; }
          .acomma { color:var(--muted,#888); }
          .empty { font-size:12px; color:var(--muted,#9ca3af); font-style:italic; padding:4px 6px; }
          /* 값 메모리 구역 분리 — 원시값 vs 힙(객체·배열은 항상 힙) */
          .mem-grp { margin-bottom:6px; }
          .mem-lbl { font-size:10.5px; font-weight:700; color:var(--muted,#9ca3af); letter-spacing:.03em; margin:0 0 5px 2px; }
          .mem-heap { margin-top:10px; padding:8px 8px 3px; border:1px dashed var(--border,#e5e7eb); border-radius:12px; background:var(--bg,#f6f7fb); }
          .mem-heap .mem-lbl { color:var(--brand,#6366f1); }
          .arrows { position:absolute; inset:0; pointer-events:none; overflow:visible; }
          /* 🔙 반환 통로 — 값이 '사는' 스택·힙과 달리 '잠깐 지나가는' 곳(개념: 반환 레지스터) */
          .retlane { grid-column:1 / -1; margin-top:2px; display:flex; align-items:center; gap:12px; padding:9px 14px; border:1.5px dashed #f59e0b; border-radius:12px; background:rgba(245,158,11,.08); }
          .retlane[hidden] { display:none; }
          .retlane-label { font-size:11px; font-weight:800; color:#b45309; white-space:nowrap; line-height:1.25; }
          .retlane-label small { display:block; font-weight:500; opacity:.72; font-size:9.5px; }
          .retval { font-family:var(--font-mono,monospace); font-size:13px; font-weight:700; border:1.5px solid #f59e0b; border-radius:8px; padding:3px 12px; background:var(--panel,#fff); color:#b45309; display:inline-flex; align-items:center; gap:6px; }
          .retlane .disc-tag { color:#dc2626; font-weight:700; font-size:12px; }
          .retlane.discarded { border-style:solid; }
          .retlane.discarded .retval { text-decoration:line-through; opacity:.55; }
          @keyframes ret-in { from { opacity:0; transform:translateY(7px) scale(.96); } to { opacity:1; transform:none; } }
          .retlane.enter { animation: ret-in .34s cubic-bezier(.2,.7,.3,1); }
          .note { padding:10px 14px; font-size:13px; border-top:1px solid var(--border,#e5e7eb); }
          .note b.k { color:var(--brand,#6366f1); }
          .engine { padding:10px 14px; font-size:12.5px; background:#0f172a; color:#cbd5e1; border-top:1px solid var(--border,#e5e7eb); font-family:var(--font-mono,monospace); line-height:1.6; }
          .engine .tag { color:#f59e0b; font-weight:700; }
          .controls { display:flex; align-items:center; gap:8px; padding:10px 14px; border-top:1px solid var(--border,#e5e7eb); }
          .controls button { font:inherit; cursor:pointer; border:1px solid var(--border,#e5e7eb); background:var(--panel,#fff); border-radius:8px; padding:5px 12px; font-size:13px; }
          .controls button.primary { background:var(--brand,#6366f1); color:#fff; border-color:var(--brand,#6366f1); }
          .controls button:disabled { opacity:.4; cursor:not-allowed; }
          .counter { margin-left:auto; font-size:12.5px; color:var(--muted,#6b7280); font-variant-numeric:tabular-nums; }
          /* ── 애니메이션 ── */
          .frame { transition: box-shadow .2s, border-color .2s; }
          @keyframes mm-enter { from { opacity:0; transform: translateY(8px) scale(.94); } to { opacity:1; transform:none; } }
          @keyframes mm-flash { 0% { background:#fde68a; } 100% { background:var(--panel,#fff); } }
          .slot.enter { animation: mm-enter .32s cubic-bezier(.2,.7,.3,1); }
          .hbox.enter { animation: mm-enter .36s cubic-bezier(.2,.7,.3,1); }
          .hbox.flash { animation: mm-flash .85s ease; }
          @media (prefers-reduced-motion: reduce) {
            .slot.enter, .hbox.enter, .hbox.flash, .retlane.enter { animation: none; }
            .arrows path { transition: none !important; }
          }
        </style>
        <div class="wrap">
          <div class="head">
            <span class="title"></span>
            <span class="toggle">
              <button data-layer="concept" class="on">개념 모델</button>
              <button data-layer="engine">실제 엔진</button>
            </span>
          </div>
          <div class="code"></div>
          <div class="stage">
            <div class="col col-stack"><h4>📇 이름표 장부 (변수)</h4><div class="stack-body"></div></div>
            <div class="col col-heap"><h4>🗄️ 값 메모리</h4><div class="heap-body"></div></div>
            <div class="retlane" hidden></div>
            <svg class="arrows"></svg>
          </div>
          <div class="note"></div>
          <div class="engine" hidden></div>
          <div class="controls">
            <button data-prev>◀ 이전</button>
            <button data-next class="primary">▶ 다음 단계</button>
            <button data-reset>↺ 처음</button>
            <span class="counter"></span>
          </div>
        </div>
      `
      const $ = (s) => this.shadowRoot.querySelector(s)
      $('.title').textContent = this._s.title || '메모리 시뮬레이션'
      // 스택 전용 화면 — 힙 열을 숨긴다.
      if (this._s.showHeap === false) {
        $('.col-heap').style.display = 'none'
        $('.stage').style.gridTemplateColumns = '1fr'
      }
      // 열 이름 바꾸기(예: '변수 / 값' 분리 화면)
      if (this._s.stackLabel) $('.col-stack h4').textContent = this._s.stackLabel
      if (this._s.heapLabel) $('.col-heap h4').textContent = this._s.heapLabel
      $('[data-prev]').onclick = () => { if (this._step > 0) { this._step--; this._update() } }
      $('[data-next]').onclick = () => { if (this._step < this._s.steps.length - 1) { this._step++; this._update() } }
      $('[data-reset]').onclick = () => { this._step = 0; this._update() }
      this.shadowRoot.querySelectorAll('[data-layer]').forEach((b) => {
        b.onclick = () => {
          this._layer = b.getAttribute('data-layer')
          this.shadowRoot.querySelectorAll('[data-layer]').forEach((x) => x.classList.toggle('on', x === b))
          this._update()
        }
      })
      this._update()
      // 창 크기 바뀌면 화살표 다시 그림
      if (!this._ro && typeof ResizeObserver !== 'undefined') {
        this._ro = new ResizeObserver(() => this._drawArrows(false))
        this._ro.observe($('.stage'))
      }
    }

    _update() {
      const s = this._s
      const st = s.steps[this._step]
      const $ = (sel) => this.shadowRoot.querySelector(sel)
      // 직전 스텝과 비교해 '새로 생긴 것'만 등장 애니메이션, '값 바뀐 힙'은 플래시.
      const prev = this._prev || { slots: new Set(), heaps: new Set(), labels: {} }
      const curSlots = new Set(), curHeaps = new Set(), curLabels = {}

      // 코드 하이라이트
      $('.code').innerHTML = (s.code || []).map((line, i) =>
        `<span class="ln${i === st.line ? ' active' : ''}">${esc(line)}</span>`).join('')

      // 스택 — 위에 최근 프레임이 오도록 역순
      const engine = this._layer === 'engine' // 실제 엔진: 원시값은 프레임 슬롯에 인라인, 객체만 공유 힙
      const heap = st.heap || {}
      const slotRef = (name, ref, extra) => {
        const c = this._color[ref] || '#888'
        return `<span class="sname">${esc(name)}</span><span class="sref" data-ref="${esc(ref)}" style="color:${c}"><span class="dot" style="background:${c}"></span>→</span>`
      }
      const frames = (st.stack || []).slice().reverse()
      const primCells = [] // model B(개념): 원시값도 값 메모리에 셀로 (엔진에선 슬롯 인라인이라 안 씀)
      $('.stack-body').innerHTML = frames.length ? frames.map((f, ri) => {
        const isTop = ri === 0
        const slots = (f.slots || []).map((sl) => {
          const key = f.name + '#' + sl.name
          curSlots.add(key)
          const en = prev.slots.has(key) ? '' : ' enter'
          const inlineVal = (v, bad) => `<div class="slot${en}"><span class="sname">${esc(sl.name)}</span><span class="sval prim${bad ? ' bad' : ''}">${esc(v)}</span></div>`
          if ('ref' in sl && sl.ref) {
            const box = heap[sl.ref]
            // 엔진 레이어: 원시 값 박스는 슬롯에 인라인(스택), 객체만 화살표(공유 힙)
            if (engine && box && box.prim) return inlineVal(box.label, box.bad)
            return `<div class="slot${en}">${slotRef(sl.name, sl.ref)}</div>`
          }
          // 원시값(value:) — 엔진은 슬롯 인라인, 개념은 값 메모리 셀 + 화살표
          if (engine) return inlineVal(sl.value, sl.bad)
          const pid = 'p:' + f.name + '#' + sl.name
          primCells.push({ id: pid, value: sl.value, bad: !!sl.bad })
          return `<div class="slot${en}">${slotRef(sl.name, pid)}</div>`
        }).join('') || '<div class="empty">(비어 있음)</div>'
        return `<div class="frame${isTop ? ' top' : ''}"><div class="frame-name">${esc(f.name)}()</div>${slots}</div>`
      }).join('') : '<div class="empty">(스택 비어 있음)</div>'

      // 힙 — 박스는 label(간단) 또는 fields(객체 그래프: 필드가 다른 힙을 가리킬 수 있음)
      const ids = Object.keys(heap)
      const fieldRows = (fields, person) => `<div class="hfields">` + fields.map((fl) => {
        const ico = person && KEY_ICON[fl.key] ? KEY_ICON[fl.key] + ' ' : ''
        if ('ref' in fl && fl.ref) {
          const fc = this._color[fl.ref] || '#888'
          return `<div class="hfield"><span class="hfkey">${ico}${esc(fl.key)}:</span><span class="sref" data-ref="${esc(fl.ref)}" style="color:${fc}"><span class="dot" style="background:${fc}"></span>→</span></div>`
        }
        return `<div class="hfield"><span class="hfkey">${ico}${esc(fl.key)}:</span><span class="hfval">${esc(fl.value)}</span></div>`
      }).join('') + `</div>`
      // 원시값 셀(값 메모리 맨 위) — 이름표 장부의 화살표가 여기로 꽂힌다
      const primHTML = primCells.map((pc) => {
        const sig = 'prim:' + pc.value + (pc.bad ? '!' : '')
        curHeaps.add(pc.id); curLabels[pc.id] = sig
        let anim = ''
        if (!prev.heaps.has(pc.id)) anim = ' enter'
        else if (prev.labels[pc.id] !== sig) anim = ' flash'
        return `<div class="hbox prim${pc.bad ? ' bad' : ''}${anim}" data-heap="${esc(pc.id)}" style="border-color:${PRIM_COLOR}"><span class="hlabel">${esc(pc.value)}</span></div>`
      }).join('')
      const renderBox = (id) => {
        const c = this._color[id] || '#888'
        const box = heap[id]
        const sig = JSON.stringify([!!box.faded, box.person || 0, box.name || 0, box.items || 0, box.fields || 0, box.label != null ? String(box.label) : 0])
        curHeaps.add(id); curLabels[id] = sig
        let anim = ''
        if (!prev.heaps.has(id)) anim = ' enter'
        else if (prev.labels[id] !== sig) anim = ' flash'
        let body, cls = 'hbox'
        if (box.faded) cls += ' faded'
        if (box.prim) cls += ' prim'
        if (box.bad) cls += ' bad'
        if (box.person) {
          cls += ' person'
          body = `<span class="pavatar">${esc(box.person)}</span><div class="pinfo"><div class="pname">${esc(box.name)}</div>${fieldRows(box.fields || [], true)}</div>`
        } else if (box.items) {
          // 참조/값이 든 배열: [ →, →, 3, … ]
          body = `<span class="hlabel arr">[ ` + box.items.map((it) => {
            if ('ref' in it && it.ref) {
              const ic = this._color[it.ref] || '#888'
              return `<span class="sref" data-ref="${esc(it.ref)}" style="color:${ic}"><span class="dot" style="background:${ic}"></span>→</span>`
            }
            return `<span class="hfval">${esc(it.value)}</span>`
          }).join('<span class="acomma">, </span>') + ` ]</span>`
        } else if (box.fields) {
          body = fieldRows(box.fields, false)
        } else {
          body = `<span class="hlabel">${esc(box.label)}</span>`
        }
        const bc = box.prim ? PRIM_COLOR : c
        const tag = box.prim ? '' : `<span class="htag" style="background:${c}">${esc(id)}</span>`
        return `<div class="${cls}${anim}" data-heap="${esc(id)}" style="border-color:${bc}">${tag}${body}</div>`
      }
      // 값 메모리(개념) = 원시값 구역 + 힙 구역. 실제 엔진 = 원시값은 슬롯 인라인이라 힙(객체)만 남는다.
      const heapBoxHTML = ids.filter((id) => !heap[id].prim).map(renderBox).join('')
      let bodyHTML = ''
      if (engine) {
        bodyHTML = heapBoxHTML || '<div class="empty">(힙 비어 있음 — 원시값은 각 프레임 슬롯 안에 산다)</div>'
      } else {
        const primAll = primHTML + ids.filter((id) => heap[id].prim).map(renderBox).join('')
        if (primAll) bodyHTML += heapBoxHTML
          ? `<div class="mem-grp"><div class="mem-lbl">원시값</div>${primAll}</div>`
          : primAll
        if (heapBoxHTML) bodyHTML += `<div class="mem-grp mem-heap"><div class="mem-lbl">🗄️ 힙 · 객체·배열</div>${heapBoxHTML}</div>`
        bodyHTML = bodyHTML || '<div class="empty">(값 메모리 비어 있음)</div>'
      }
      $('.heap-body').innerHTML = bodyHTML
      // 열 제목 — 엔진 레이어는 왼쪽=프레임(원시값 인라인), 오른쪽=힙(객체만)
      $('.col-stack h4').innerHTML = engine ? '📚 스택 <small>(프레임 · 원시값 인라인)</small>' : (this._s.stackLabel || '📇 이름표 장부 (변수)')
      $('.col-heap h4').innerHTML = engine ? '🗄️ 힙 <small>(heap · 객체·배열만)</small>' : (this._s.heapLabel || '🗄️ 값 메모리')

      // 🔙 반환 통로 — st.returning 있을 때만 등장(원시=값 인라인 / 객체=힙으로 화살표). 값이 '사는' 곳(스택·힙)과 달리 '지나가는' 곳.
      const retEl = $('.retlane')
      const ret = st.returning
      let curRet = null
      if (ret) {
        const isRef = 'ref' in ret && ret.ref
        curRet = (isRef ? 'r:' + ret.ref : 'v:' + ret.value) + (ret.discarded ? '!' : '')
        let valHTML
        if (isRef) {
          const rc = this._color[ret.ref] || '#888'
          valHTML = `<span class="retval"><span class="sref" data-ref="${esc(ret.ref)}" style="color:${rc}"><span class="dot" style="background:${rc}"></span>→</span>${ret.label ? ' ' + esc(ret.label) : ''}</span>`
        } else {
          valHTML = `<span class="retval">${esc(ret.value)}</span>`
        }
        const discTag = ret.discarded ? `<span class="disc-tag">💨 아무도 안 받음 → 버려짐</span>` : ''
        const enter = prev.ret !== curRet ? ' enter' : ''
        retEl.className = 'retlane' + (ret.discarded ? ' discarded' : '') + enter
        retEl.hidden = false
        retEl.innerHTML = `<span class="retlane-label">🔙 반환 통로<small>값이 잠깐 지나감</small></span>${valHTML}${discTag}`
      } else {
        retEl.hidden = true
        retEl.innerHTML = ''
      }

      this._prev = { slots: curSlots, heaps: curHeaps, labels: curLabels, ret: curRet }

      // 설명
      $('.note').innerHTML = st.note ? `<b class="k">🔑</b> ${st.note}` : ''
      const eng = $('.engine')
      if (this._layer === 'engine' && st.engine) { eng.hidden = false; eng.innerHTML = `<span class="tag">⚙️ 실제 엔진(V8)</span> ${st.engine}` }
      else { eng.hidden = true }

      // 버튼 상태 + 카운터
      $('[data-prev]').disabled = this._step <= 0
      $('[data-next]').disabled = this._step >= s.steps.length - 1
      $('.counter').textContent = `${this._step + 1} / ${s.steps.length}`

      // 화살표는 레이아웃 후에 (스텝 이동이면 그려지는 효과)
      requestAnimationFrame(() => this._drawArrows(true))
    }

    _drawArrows(animate) {
      const svg = this.shadowRoot.querySelector('.arrows')
      const stage = this.shadowRoot.querySelector('.stage')
      if (!svg || !stage) return
      const sb = stage.getBoundingClientRect()
      if (!sb.width) return // 레이아웃 없음(예: 테스트 환경) → 건너뜀
      const refs = this.shadowRoot.querySelectorAll('.sref[data-ref]')
      let defs = '', paths = ''
      refs.forEach((r, i) => {
        const id = r.getAttribute('data-ref')
        const target = this.shadowRoot.querySelector(`.hbox[data-heap="${id}"]`)
        if (!target || target.contains(r)) return // 자기 자신 가리키면 skip
        const c = this._color[id] || '#888'
        const a = r.getBoundingClientRect(), t = target.getBoundingClientRect()
        const x1 = a.right - sb.left, y1 = a.top - sb.top + a.height / 2
        // 대상이 왼쪽이면 왼쪽 변, 오른쪽이면 왼쪽 변으로 (대개 힙은 오른쪽)
        const toLeft = t.left >= a.right
        const x2 = (toLeft ? t.left : t.right) - sb.left, y2 = t.top - sb.top + t.height / 2
        const mid = Math.max(28, Math.abs(x2 - x1) / 2)
        const c1x = toLeft ? x1 + mid : x1 + mid, c2x = toLeft ? x2 - mid : x2 + mid
        const mk = 'ah' + i
        defs += `<marker id="${mk}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${c}"/></marker>`
        paths += `<path d="M${x1},${y1} C${c1x},${y1} ${c2x},${y2} ${x2},${y2}" fill="none" stroke="${c}" stroke-width="2" marker-end="url(#${mk})"/>`
      })
      svg.innerHTML = `<defs>${defs}</defs>${paths}`
      if (animate) {
        svg.querySelectorAll('path').forEach((p) => {
          try {
            const L = p.getTotalLength()
            p.style.strokeDasharray = L
            p.style.strokeDashoffset = L
            p.getBoundingClientRect() // 리플로우 강제
            p.style.transition = 'stroke-dashoffset .45s ease'
            p.style.strokeDashoffset = '0'
          } catch {}
        })
      }
    }
  }

  if (!customElements.get('memory-model')) customElements.define('memory-model', MemoryModel)

  window.MemoryModel = function (config) {
    const el = document.createElement('memory-model')
    el.scenario = config
    return el
  }
})()
