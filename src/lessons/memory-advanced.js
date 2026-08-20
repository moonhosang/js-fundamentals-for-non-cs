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
        note: '<b>①인자 평가</b> — 호출은 본문으로 바로 안 뛴다. 먼저 괄호 안 인자 <b>1000</b>을 값으로 준비한다. <b>아직 addTax 프레임은 없다</b> — 지금은 main 프레임만.', engine: '현재 실행 컨텍스트 = main 활성 레코드 하나. addTax 프레임은 아직 없음. 인자는 호출자(main) 쪽에서 먼저 평가된다. (스택/힙 배치는 스펙 비강제 — 관찰되는 의미만 고정)' },
      { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'addTax', slots: [] }], heap: {},
        note: '<b>②프레임 push</b> — addTax 실행 컨텍스트가 스택에 쌓인다(push). <b>매개변수 price 칸은 아직 비어 있다</b>(바인딩 전 — 프레임만 등장).',
        engine: '새 스택 프레임(활성 레코드) 생성 + 스코프·호이스팅(var·함수선언 등록, let/const는 TDZ)·this·arguments 준비. 본문은 아직 한 줄도 실행 안 됨 — 슬롯은 비어 있다. 배치는 스펙 비강제.' },
      { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'addTax', slots: [{ name: 'price', value: '1000' }] }], heap: {},
        note: '<b>③매개변수 바인딩(복사)</b> — 인수 1000을 매개변수 price에 <b>복사</b>해 담는다(price는 별개 슬롯).',
        engine: '인자 1000은 값 복사되어 지역 price로 — 작은 정수라 SMI로 프레임 슬롯에 인라인(힙 안 씀). ※SMI 태깅은 V8 방식, JSC/SM은 NaN-boxing.' },
      { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'addTax', slots: [{ name: 'price', value: '1000' }] }], heap: {},
        note: 'price + price * 0.1 = 1100 을 계산해 <b>반환값 1100</b>을 준비한다.', engine: 'price(1000) + price*0.1 = 1100. 결과도 작은 정수라 SMI. 반환값은 힙이 아니라 레지스터에 실려 호출자에게 전달된다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'total', value: '(대기)', bad: true }] }], heap: {},
        note: '<b>⑤ 반환 — 값 내보내고 프레임 pop</b> — <code>return</code>이 <b>1100을 프레임 밖으로</b> 내보내고 addTax를 <b>즉시 끝낸다</b>(프레임 pop, 지역 price 사라짐). 반환값 1100은 <b>호출한 자리로</b> 가는 중 — total은 <b>아직 대기</b>.',
        engine: '프레임 pop → 활성 레코드 해제, price 슬롯 소멸. 반환값 1100은 레지스터에 실려 호출자에게 전달된다. 대입은 아직 — 호출자가 받아야 한다.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'total', value: '1100' }] }], heap: {},
        note: '<b>⑥ 호출부 대입</b> — 호출한 자리 <code>let total = …</code>가 반환값 <b>1100</b>을 받아 <b>total에 담는다</b>. <b>반환(⑤)과 대입(⑥)은 별개의 두 단계</b> — 프레임이 먼저 죽고, 그 다음 값이 담긴다.',
        engine: '레지스터의 반환값 1100이 total에 안착(SMI). 프레임은 이미 없다. 예외: 클로저면 캡처된 변수가 힙 context로 승격돼 프레임이 죽어도 살아남음 → 다음 · 클로저.' },
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

      <div data-m="qzcs"></div>

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
    root.querySelector('[data-m="qzcs"]').append(Quiz({ q: '<code>addTax(1000)</code>를 부르는 순간, 스택엔 프레임이 몇 개?', options: ['1개 (addTax만)', '2개 (main + addTax)'], answer: 1, explain: '프로그램의 <b>main</b> 프레임 위에 <b>addTax</b> 프레임이 쌓인다 → 2개. addTax가 반환하면 pop되어 다시 1개.' }))
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
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'next', value: '(대기)', bad: true }] }, { name: 'makeCounter', slots: [] }], heap: {},
        note: '<b>②프레임 push</b> — makeCounter() 호출 → makeCounter 실행 컨텍스트가 스택에 쌓인다(push). <b>매개변수 없음</b>, 그리고 <b>아직 count도 없다</b>(본문 실행 전 — 프레임만 등장, 슬롯 빈칸).',
        engine: '새 스택 프레임(활성 레코드) push + 스코프·호이스팅·this·arguments 준비. 매개변수가 없어 바인딩(③) 단계도 없다. 본문은 아직 한 줄도 실행 안 됨 — 슬롯은 비어 있다. 배치는 스펙 비강제.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'next', value: '(대기)', bad: true }] }, { name: 'makeCounter', slots: [{ name: 'count', value: '0' }] }], heap: {},
        note: '<b>④본문 첫 줄</b> <code>let count = 0</code> — <b>이제야</b> 지역변수 <b>count = 0</b>이 makeCounter 장부에 생긴다(호출 즉시 있던 게 아니라 <b>프레임 push 후 본문에서</b> 생김). 보통이면 함수가 끝날 때 사라질 값이다.',
        engine: 'count(0)는 작은 정수라 SMI로 프레임 슬롯에 인라인 — 아직은 평범한 지역변수, 프레임 소유. (다음 줄에서 반전이 온다.)' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'next', value: '(대기)', bad: true }] }, { name: 'makeCounter', slots: [] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '0' }] } },
        note: 'return 하는 <b>안쪽 함수가 count를 붙잡는다</b> → 하나뿐인 <b>count가 makeCounter 장부에서 값 메모리로 이사</b>한다(복사가 아니라 <b>이동</b> — count는 여전히 하나). 그래서 makeCounter가 끝나도 안 사라진다.',
        engine: '반환될 안쪽 함수가 count를 캡처 → 엔진이 count를 힙 context 객체로 승격한다. 이게 "이사"의 실체 — 이제 count는 SMI 인라인이 아니라 힙 셀, 안쪽 함수의 [[Scope]]가 그 셀을 붙잡는다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'next', value: '(대기)', bad: true }] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '0' }] } },
        note: '<b>⑤ 반환 — 안쪽 함수 내보내고 프레임 pop</b> — makeCounter가 <b>안쪽 함수(+ 붙잡은 count)</b>를 반환하고 <b>장부는 pop(사라짐)</b>. 그런데 <b>count는 값 메모리에 살아남았다!</b> 반환값(클로저 h1)은 <b>호출한 자리로</b> 가는 중 — next는 <b>아직 대기</b>.',
        engine: 'makeCounter 프레임 pop → 활성 레코드 해제. 그러나 count는 힙 context에 있어 회수 안 됨 — 반환되는 안쪽 함수가 붙잡고 있다. 스택 프레임 소멸 ≠ 캡처 변수 소멸. 대입은 아직 — 호출자가 받아야 한다.' },
      { line: 7, stack: [{ name: 'main', slots: [{ name: 'next', ref: 'h1' }] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '0' }] } },
        note: '<b>⑥ 호출부 대입</b> — 호출한 자리 <code>const next = …</code>가 반환값(클로저)을 받아 <b>next에 담는다</b>. next가 그 클로저(안쪽 함수 + count)를 가리킨다 — 사라졌어야 할 장부가 count째로 살아남았다. <b>반환(⑤)과 대입(⑥)은 별개의 두 단계</b>.',
        engine: 'next → 클로저 → context 경로로 count에 도달 가능. 프레임은 이미 pop된 뒤 — 클로저 참조만 남았다.' },
      { line: 8, stack: [{ name: 'main', slots: [{ name: 'next', ref: 'h1' }] }, { name: '(익명)', slots: [] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '1' }] } },
        note: 'next() 호출 → <b>(익명) 프레임이 push</b>돼 실행된다(호출=push, 끝나면 pop). 그 함수가 클로저의 <b>count를 +1 → 1</b>. 밖에선 count를 직접 못 보고 next()로만 만진다.',
        engine: 'next() 호출 = 익명 함수 활성 레코드 push. 몸통이 힙 context의 count를 읽어 +1 → 1로 갱신(SMI 값 덮어씀). 프레임은 끝나면 pop되지만 힙 context는 그대로 남는다.' },
      { line: 9, stack: [{ name: 'main', slots: [{ name: 'next', ref: 'h1' }] }, { name: '(익명)', slots: [] }], heap: { h1: { person: '🔒', name: '클로저', fields: [{ key: 'count', value: '2' }] } },
        note: '또 next() → 다시 <b>프레임 push</b> → count <b>+1 → 2</b>. count가 프레임과 함께 사라지지 않고 <b>기억</b>된다 — 이게 클로저의 힘(상태를 숨겨 보관).',
        engine: '또 push/실행/pop. 같은 힙 context의 count를 1 → 2로 갱신. 호출마다 새 프레임이지만 캡처된 count는 하나의 힙 셀을 공유 — 그래서 값이 누적된다.' },
    ],
  }

  window.Lessons['closure'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 심화 · 클로저</span>
        <h2>클로저 — 사라지지 않는 장부</h2>
        <p>M2에서 "함수가 끝나면 그 장부(프레임)가 pop되며 지역변수가 사라진다" 했다. <b>딱 하나 예외</b> — 안쪽 함수가 그 변수를 <b>붙잡으면</b> 안 사라진다. 그게 클로저.</p>
      </header>

      <div data-m="qzcl"></div>
      <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/클로저_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">클로저 ↗</a></p>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔗 M2에서 이어집니다</div>
        <p class="section-desc" style="margin:0">M2 스코프에서 <code>greet</code> 장부가 pop되면 user·hi(지역변수)가 사라졌다. 클로저는 그 규칙의 <b>예외</b> — 사라졌어야 할 변수가 <b>힙으로 옮겨져 살아남는다</b>.</p>
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
    root.querySelector('[data-m="qzcl"]').append(Quiz({ q: '<code>makeCounter()</code>가 반환된 뒤에도, 그 안에서 세던 <code>count</code>는 살아있을까?', options: ['사라진다 (함수 끝났으니)', '산다 (클로저가 붙잡음)'], answer: 1, explain: '보통은 함수가 끝나면 지역변수가 사라지지만, <b>안쪽 함수가 count를 붙잡으면</b> 스코프가 살아남는다 — 이게 <b>클로저</b>.' }))
    wireGoto(root)
  }

  // ══ 심화 · 가비지 컬렉션 ════════════════════════════════════
  const SCENARIO_GC = {
    title: '도달 가능성 — 마지막 참조가 끊겨야 치워진다',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: ['let box = { msg: "안녕" }', 'let a = box        // a도 같은 객체를 가리킴', 'box = null         // box 화살표만 끊음', 'a = null           // 마지막 화살표도 끊음'],
    steps: [
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'box', ref: 'h1' }, { name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'msg', value: '"안녕"' }] } },
        note: 'box와 a <b>둘 다</b> 같은 객체를 가리킨다(참조 2개). 객체는 <b>도달 가능</b> — 산다.',
        engine: '{ msg } 객체는 힙에 할당(형태는 hidden class로 기술). box·a 슬롯은 같은 압축 포인터를 담는다 — 참조 2개. GC 루트(스택 변수)에서 도달 가능 → 산다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'box', value: 'null' }, { name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'msg', value: '"안녕"' }] } },
        note: '<code>box = null</code> → box 화살표만 끊긴다. 하지만 <b>a가 여전히 가리켜</b> 객체는 <b>도달 가능 → 안 치워진다</b>. box=null이 객체를 죽이는 게 아니다!',
        engine: 'box 슬롯을 null(힙 싱글턴)로 덮어씀 → 포인터 하나만 끊김. a가 아직 도달 경로를 유지 → mark 단계에서 reachable로 표시돼 회수 대상 아님.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'box', value: 'null' }, { name: 'a', value: 'null' }] }], heap: { h1: { fields: [{ key: 'msg', value: '"안녕"' }], faded: true } },
        note: '<code>a = null</code> → <b>마지막 화살표도 끊김</b> → 이제 <b>아무도 못 닿는다(도달 불가) → GC가 수거</b>(회색). 마지막 참조가 끊겨야 죽는다.',
        engine: '마지막 포인터도 null로 → 어떤 GC 루트에서도 못 닿음(unreachable). 다음 mark-sweep에서 이 힙 칸 회수(원시 인라인 값은 애초에 대상 아님). 회수 "시점"은 엔진 재량 — 즉시 아님.' },
    ],
  }

  window.Lessons['gc'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 심화 · GC</span>
        <h2>가비지 컬렉션 — 값 메모리를 누가 치우나</h2>
        <p>M1에서 "아무도 안 가리키는 값은 자동으로 치워진다" 예고했다. 그 <b>가비지 컬렉션(GC)</b>을 자세히 — <b>힙</b>의 청소부다.</p>
      </header>

      <div data-m="qzgc"></div>
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
    root.querySelector('[data-m="qzgc"]').append(Quiz({ q: '힙에 있던 객체를 <b>아무 변수도 안 가리키게</b> 되면?', options: ['영원히 남는다', '자동으로 치워진다 (GC)'], answer: 1, explain: '아무도 안 가리키는(도달 불가) 객체는 <b>가비지 컬렉터</b>가 자동으로 메모리에서 치운다.' }))
    wireGoto(root)
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
