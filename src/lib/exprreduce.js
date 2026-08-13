// ExprReduce — 표현식 축약(reduction) 시각화 위젯.
// 복합 표현식이 "한 번에 한 조각(redex)"씩 값으로 치환되며 접혀 올라가는 과정을 ▶로 보여준다.
// 재사용 팩토리(웹컴포넌트 아님, 전역 index.css 사용). window.ExprReduce(config) → HTMLElement.
//
//   ExprReduce({
//     title: '축약: 2 + 3 * 4 - 1',
//     steps: [
//       { code: 'const total = 2 + 3 * 4 - 1', mark: '3 * 4', note: '곱셈이 가장 급 → 3*4 먼저' },
//       { code: 'const total = 2 + 12 - 1',    mark: '2 + 12', note: '덧셈·뺄셈은 왼쪽부터' },
//       ...
//       { code: 'const total = 13', note: '식이 하나의 값으로 접혔다' },   // 마지막: mark 없음
//     ],
//   })
//
// 각 step.code = 그 시점의 '전체 식'(직접 문자열로 저술 — 런타임 계산 없음, 정직하고 안전).
// step.mark = 이번에 값으로 줄어들 조각(redex). 강조 표시된다. 마지막엔 없음(더 못 줄임).

;(function () {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // code(문자열)에서 mark(부분문자열, 첫 등장)를 redex 강조 span으로 감싼다. 둘 다 이스케이프 후 매칭.
  function highlight(code, mark) {
    const ec = esc(code)
    if (!mark) return ec
    const em = esc(mark)
    const i = ec.indexOf(em)
    if (i < 0) return ec
    return ec.slice(0, i) + '<span class="exprd-redex">' + em + '</span>' + ec.slice(i + em.length)
  }

  function ExprReduce(config) {
    const steps = (config && config.steps) || []
    const el = document.createElement('div')
    el.className = 'exprd'

    let i = 0

    el.innerHTML = `
      ${config.title ? `<div class="exprd-title"><span class="exprd-tag">▶ 축약</span>${esc(config.title)}</div>` : ''}
      <pre class="exprd-code"><code></code></pre>
      <div class="exprd-note"></div>
      <div class="exprd-ctrl">
        <button class="chip" data-prev>◀ 이전</button>
        <button class="chip on" data-next>다음 ▶</button>
        <button class="chip" data-reset>↺ 처음</button>
        <span class="exprd-count"></span>
      </div>
    `
    const codeEl = el.querySelector('.exprd-code code')
    const noteEl = el.querySelector('.exprd-note')
    const countEl = el.querySelector('.exprd-count')
    const prevBtn = el.querySelector('[data-prev]')
    const nextBtn = el.querySelector('[data-next]')
    const resetBtn = el.querySelector('[data-reset]')

    function draw() {
      const s = steps[i] || {}
      codeEl.innerHTML = highlight(s.code || '', s.mark)
      noteEl.innerHTML = s.note || ''
      countEl.textContent = `${i + 1} / ${steps.length}`
      prevBtn.disabled = i === 0
      nextBtn.disabled = i === steps.length - 1
      const done = i === steps.length - 1
      nextBtn.textContent = done ? '✓ 완료' : '다음 ▶'
      el.classList.toggle('exprd-done', done)
      // 방금 값으로 접힌 자리에 살짝 flash (이전 step의 redex가 이번엔 값이 됨)
      codeEl.classList.remove('exprd-flash'); void codeEl.offsetWidth; codeEl.classList.add('exprd-flash')
      // 스텝 훅 — 외부(예: 우선순위 눈금 줄 하이라이트)와 동기화용
      if (typeof config.onStep === 'function') config.onStep(i, s)
    }
    prevBtn.onclick = () => { if (i > 0) { i--; draw() } }
    nextBtn.onclick = () => { if (i < steps.length - 1) { i++; draw() } }
    resetBtn.onclick = () => { i = 0; draw() }

    draw()
    return el
  }

  window.ExprReduce = ExprReduce
})()
