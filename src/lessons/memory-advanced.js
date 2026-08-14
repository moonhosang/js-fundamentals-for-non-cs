// 🧠 메모리 심화 챕터 — 콜 스택 · 클로저(예정) · GC(예정). 함수(5강)·객체(8강) 뒤.
// 함수(5강)·객체(8강) 뒤에 오는 챕터. 콜 스택은 함수 호출의 삶과 죽음을 시뮬레이션한다.

;(function () {
  window.Lessons = window.Lessons || {}

  // ── M3 시나리오: 콜 스택 push/pop ──
  const SCENARIO_STACK = {
    title: '콜 스택 — 함수가 쌓였다 사라진다',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
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
        (선수: 5강 함수 — 심화 챕터는 선택이라 함수 전에 훑어도 됨)</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/콜_스택" target="_blank" rel="noopener noreferrer">콜 스택 ↗</a> · <a href="https://ko.wikipedia.org/wiki/스택_(자료_구조)" target="_blank" rel="noopener noreferrer">스택(자료구조) ↗</a></p>
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
    wireGoto(root)
  }

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  // ══ 심화 · 클로저 ═══════════════════════════════════════════
  const SCENARIO_CLOSURE = {
    title: '클로저 — 사라졌어야 할 count가 값 메모리에 살아남는다',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: [
      'function makeCounter() {',
      '  let count = 0',
      '  return function () {   // 안쪽 함수가 count를 붙잡는다',
      '    count = count + 1',
      '    return count',
      '  }',
      '}',
      'const next = makeCounter()',
      'next()   // 1',
      'next()   // 2',
    ],
    steps: [
      { line: 7, stack: [{ name: 'main', slots: [{ name: 'next', value: '(대기)', bad: true }] }, { name: 'makeCounter', slots: [{ name: 'count', value: '0' }] }], heap: {},
        note: 'makeCounter() 호출 → 지역변수 <b>count = 0</b> (makeCounter 장부에). 보통이면 함수가 끝날 때 사라질 값이다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'next', value: '(대기)', bad: true }] }, { name: 'makeCounter', slots: [{ name: 'count', value: '0' }] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '0' }] } },
        note: 'return 하는 <b>안쪽 함수가 count를 붙잡는다</b>(참조). → count가 못 죽는다. <b>값 메모리로 옮겨져</b> 클로저에 담긴다.' },
      { line: 7, stack: [{ name: 'main', slots: [{ name: 'next', ref: 'h1' }] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '0' }] } },
        note: 'makeCounter 장부는 <b>pop(사라짐)</b> — 그런데 <b>count는 값 메모리에 살아남았다!</b> next가 그 클로저(안쪽 함수 + count)를 가리킨다. 이게 클로저 — 사라졌어야 할 장부가 안 사라진 것.' },
      { line: 8, stack: [{ name: 'main', slots: [{ name: 'next', ref: 'h1' }] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '1' }] } },
        note: 'next() → 살아있는 count를 +1 → <b>1</b>. 밖에선 count를 <b>직접 못 보는데</b>(숨겨짐), next()로만 만진다.' },
      { line: 9, stack: [{ name: 'main', slots: [{ name: 'next', ref: 'h1' }] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '2' }] } },
        note: '또 next() → <b>2</b>. count가 프레임과 함께 사라지지 않고 <b>기억</b>된다. 이게 클로저의 힘 — 상태를 숨겨 보관.' },
    ],
  }

  window.Lessons['closure'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 심화 · 클로저</span>
        <h2>클로저 — 사라지지 않는 장부</h2>
        <p>M2에서 "함수가 끝나면 그 장부(프레임)가 pop되며 지역변수가 사라진다" 했다. <b>딱 하나 예외</b> — 안쪽 함수가 그 변수를 <b>붙잡으면</b> 안 사라진다. 그게 클로저.</p>
      </header>
      <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/클로저_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">클로저 ↗</a></p>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔗 M2에서 이어집니다</div>
        <p class="section-desc" style="margin:0">M2 스코프에서 <code>greet</code> 장부가 pop되면 user·hi(지역변수)가 사라졌다. 클로저는 그 규칙의 <b>예외</b> — 사라졌어야 할 변수가 <b>값 메모리(힙)로 옮겨져 살아남는다</b>.</p>
      </div>

      <h3 class="section-title">① 복습 — 보통은 프레임이 pop되며 사라진다</h3>
      <p class="section-desc">함수를 부르면 장부(프레임)가 push, 끝나면 pop. 그 안 지역변수도 함께 <b>사라진다</b>(M2 ③·⑤). 보통은 그렇다.</p>

      <h3 class="section-title">② 반전 — 붙잡으면 살아남는다 (makeCounter)</h3>
      <span class="learn-tag">📎 안쪽 함수가 바깥 count를 쓰면, count는 못 죽고 값 메모리로 옮겨져 기억된다</span>
      <p class="section-desc"><code>makeCounter</code>는 <b>안쪽 함수</b>를 돌려준다. 그 안쪽 함수가 <code>count</code>를 쓰기 때문에, makeCounter가 끝나도 <b>count가 안 사라진다</b>. ▶로 보라.</p>
      <div data-m="closure"></div>

      <h3 class="section-title">③ 왜 유용한가 — 상태를 숨겨 보관</h3>
      <ul class="section-list">
        <li><b>기억</b> — count가 호출 사이에 <b>유지</b>된다(1 → 2 → 3…). 함수가 자기만의 상태를 갖는다.</li>
        <li><b>숨김(private)</b> — count는 <b>밖에서 직접 못 건드린다</b>. <code>next()</code>라는 <b>정해진 통로</b>로만 바꾼다 — 안전하다.</li>
        <li>실전: 버튼 클릭 수 세기 · 설정 보관 · "한 번만 실행" 등 상태를 감춰 관리할 때.</li>
      </ul>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">안쪽 함수가 바깥 지역변수를 <b>붙잡으면</b>, 그 변수는 프레임과 함께 안 사라지고 <b>값 메모리로 옮겨져 살아남는다</b>. 그 "살아남은 변수 + 함수" 묶음이 <b>클로저</b> — 상태를 <b>기억하고 숨긴다</b>.</p>
      </div>

      <div class="practice-cta">
        <span>그럼 값 메모리에 살아남은 것들은 언제 치워지나? — 다음 —</span>
        <button class="chip on" data-goto="gc">🧠 · 가비지 컬렉션 →</button>
      </div>
    `
    root.querySelector('[data-m="closure"]').append(MemoryModel(SCENARIO_CLOSURE))
    wireGoto(root)
  }

  // ══ 심화 · 가비지 컬렉션 ════════════════════════════════════
  const SCENARIO_GC = {
    title: '도달 가능성 — 마지막 참조가 끊겨야 치워진다',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: ['let box = { msg: "안녕" }', 'let a = box        // a도 같은 객체를 가리킴', 'box = null         // box 화살표만 끊음', 'a = null           // 마지막 화살표도 끊음'],
    steps: [
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'box', ref: 'h1' }, { name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'msg', value: '"안녕"' }] } },
        note: 'box와 a <b>둘 다</b> 같은 객체를 가리킨다(참조 2개). 객체는 <b>도달 가능</b> — 산다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'box', value: 'null' }, { name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'msg', value: '"안녕"' }] } },
        note: '<code>box = null</code> → box 화살표만 끊긴다. 하지만 <b>a가 여전히 가리켜</b> 객체는 <b>도달 가능 → 안 치워진다</b>. box=null이 객체를 죽이는 게 아니다!' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'box', value: 'null' }, { name: 'a', value: 'null' }] }], heap: { h1: { fields: [{ key: 'msg', value: '"안녕"' }], faded: true } },
        note: '<code>a = null</code> → <b>마지막 화살표도 끊김</b> → 이제 <b>아무도 못 닿는다(도달 불가) → GC가 수거</b>(회색). 마지막 참조가 끊겨야 죽는다.' },
    ],
  }

  window.Lessons['gc'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 심화 · GC</span>
        <h2>가비지 컬렉션 — 값 메모리를 누가 치우나</h2>
        <p>M1에서 "아무도 안 가리키는 값은 자동으로 치워진다" 예고했다. 그 <b>가비지 컬렉션(GC)</b>을 자세히 — <b>값 메모리(힙)</b>의 청소부다.</p>
      </header>
      <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/쓰레기_수집_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">쓰레기 수집(GC) ↗</a> · <a href="https://ko.wikipedia.org/wiki/메모리_관리" target="_blank" rel="noopener noreferrer">메모리 관리 ↗</a></p>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔗 M1·M4에서 이어집니다</div>
        <p class="section-desc" style="margin:0">M1: 이름표 없는 값 → GC. M4: 여러 이름표가 한 객체를 <b>공유</b>(별칭). 이 둘이 합쳐진 질문 — <b>"box = null 하면 객체가 죽나?"</b>의 정확한 답이 여기 있다.</p>
      </div>

      <h3 class="section-title">① 도달 가능성 — '닿을 수 있으면' 산다</h3>
      <span class="learn-tag">📎 값 메모리의 객체는 '이름표(참조)로 닿을 수 있는 동안' 산다. 아무도 못 닿으면 치워진다</span>
      <ul class="section-list">
        <li>GC는 "지금 <b>닿을 수 있는(reachable)</b> 객체"를 표시한다 — 변수·다른 객체를 통해 도달되는 것들.</li>
        <li><b>아무 참조도 없어 못 닿는</b> 객체 = 쓰레기 → 그 칸을 <b>회수</b>해 재사용한다. (자동, 개발자가 안 시켜도)</li>
      </ul>

      <h3 class="section-title">② box = null 하면 객체가 죽나? — 마지막 참조가 관건</h3>
      <span class="learn-tag">📎 참조가 '하나라도' 남으면 안 죽는다. box=null은 화살표 하나만 끊을 뿐</span>
      <p class="section-desc">앞서 나온 질문의 정확한 답 — <code>box = null</code>은 <b>box 화살표 하나만</b> 끊는다. 다른 이름표(a)가 아직 가리키면 객체는 <b>안 치워진다</b>. ▶로 보라.</p>
      <div data-m="gc"></div>

      <h3 class="section-title">③ 누수(leak) — 안 쓰는데 참조가 남으면</h3>
      <p class="section-desc">반대 함정 — <b>더 안 쓰는데</b> 어딘가(전역 배열·오래 사는 객체)가 <b>계속 가리키고</b> 있으면 GC가 못 치운다. 값 메모리가 쌓여 <b>메모리 누수</b>가 된다. → 다 쓴 참조는 <b>끊어 준다</b>(null 대입, 배열에서 제거 등).</p>

      <h3 class="section-title">④ JS엔 '수동 해제'가 없다</h3>
      <p class="section-desc">C의 <code>free()</code>처럼 객체를 직접 지우는 명령이 <b>없다</b>. 우리가 하는 건 <b>참조를 끊는 것</b>뿐 — 회수 판단·시점은 <b>GC가 알아서</b> 한다. 그래서 "객체를 해제하는 순간"은 코드 어디에도 없다.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">값 메모리 객체는 <b>도달 가능한 동안</b> 산다. <b>마지막 참조가 끊기면</b> GC가 자동 회수. <code>box=null</code>은 화살표 하나만 끊는 것 — 다른 참조가 있으면 안 죽는다. 안 쓰는데 참조가 남으면 <b>누수</b>.</p>
      </div>

      <div class="practice-cta">
        <span>🎉 메모리 여정 완주 — 이제 값이 '어디' 사는지 훤히 보인다.</span>
        <button class="chip on" data-goto="home">🗺️ 커리큘럼 한눈에</button>
      </div>
    `
    root.querySelector('[data-m="gc"]').append(MemoryModel(SCENARIO_GC))
    wireGoto(root)
  }
})()
