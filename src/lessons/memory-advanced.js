// 🧠 메모리 심화 챕터 — 콜 스택 · 클로저(예정) · GC(예정). 함수(6강)·객체(7강) 뒤.
// 함수(6강)·객체(7강) 뒤에 오는 챕터. 콜 스택은 함수 호출의 삶과 죽음을 시뮬레이션한다.

;(function () {
  window.Lessons = window.Lessons || {}

  // ── M3 시나리오: 콜 스택 push/pop ──
  const SCENARIO_STACK = {
    title: '콜 스택 — 함수가 쌓였다 사라진다',
    code: ['function addTax(price) {', '  return price + price * 0.1', '}', 'let total = addTax(1000)'],
    steps: [
      { line: 3, stack: [{ name: 'main', slots: [] }], heap: {},
        note: 'addTax(1000)을 호출하려 한다. 지금은 main 프레임만 있다.', engine: '현재 실행 컨텍스트 = main.' },
      { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'addTax', slots: [{ name: 'price', value: '1000' }] }], heap: {},
        note: 'addTax 호출 → 스택에 <b>addTax 프레임</b>이 쌓인다(push). 인수 1000이 지역변수 price에 담긴다.',
        engine: '새 활성 레코드(activation record)를 push. price는 이 프레임 소유.' },
      { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'addTax', slots: [{ name: 'price', value: '1000' }] }], heap: {},
        note: 'price + price * 0.1 = 1100 을 계산해 <b>반환값 1100</b>을 준비한다.', engine: 'price=1000 → 1100.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'total', value: '1100' }] }], heap: {},
        note: 'addTax 프레임은 <b>사라지고(pop)</b>, 반환값 1100이 total에 담긴다. 지역변수 price도 함께 사라진다.',
        engine: '프레임 해제 → price 소멸. (예외: <b>클로저</b>는 이 스코프를 붙잡아 살린다 → 다음 · 클로저)' },
    ],
  }

  window.Lessons['callstack'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 심화</span>
        <h2>콜 스택 — 함수의 삶과 죽음</h2>
        <p>함수를 부르면 스택에 <b>프레임</b>이 쌓이고(push), 끝나면 사라진다(pop). 그때 <b>지역변수도 함께 사라진다</b> — 이게 클로저를 이해하는 바탕이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>함수 호출 = 스택에 <b>프레임 push</b>. 반환 = <b>pop</b>. 프레임 안의 <b>지역변수</b>는 그 프레임과 생사를 함께한다.
        (선수: 6강 함수)</p>
      </div>

      <h3 class="section-title">① 눈으로 — push 되고 pop 된다</h3>
      <span class="learn-tag">📎 ▶ 다음 단계로 addTax 프레임이 쌓였다 사라지는 걸 보라</span>
      <div data-m="mem-stack"></div>

      <h3 class="section-title">② 왜 중요한가</h3>
      <ul class="section-list">
        <li>함수가 끝나면 그 안의 지역변수는 <b>없어진다</b> → 그래서 함수 밖에서 못 쓴다(스코프).</li>
        <li>스택이 너무 깊이 쌓이면(끝없는 재귀) <b>Stack Overflow</b> 에러 — 스택이 꽉 찬 것.</li>
        <li>그런데… <b>사라져야 할 지역변수가 안 사라지는</b> 경우가 있다. 그게 <b>클로저</b> — 다음 강의.</li>
      </ul>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">함수 호출은 스택에 프레임을 쌓고, 반환하면 프레임과 지역변수가 함께 사라진다.
        이 "사라짐"의 예외가 클로저다.</p>
      </div>

      <div class="practice-cta">
        <span>사라져야 할 스코프가 살아남는다? — 다음 —</span>
        <button class="chip on" data-goto="closure">🧠 · 클로저 →</button>
      </div>
    `
    root.querySelector('[data-m="mem-stack"]').append(MemoryModel(SCENARIO_STACK))
    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(/^\d+$/.test(t) ? Number(t) : t) : (location.hash = '#' + t) }
  }
})()
