// 📦 5강 · 함수 — 한 페이지에 몰지 않고 '단계(5-1~5-7, 쇼츠)'로 쪼갬 + 드릴(Practices[5], startAt:8 → 5-8~).
// design-principles: 문법 나열 금지 → 왜/언제부터, 여러 왜, 반복 드릴, 경계. 메모리는 '가정' 말고 강의 안에서 재활성화.
// 오해: 함수=마법 블랙박스/어려운것 · 정의하면 실행됨? · return=print? · 함수 안 변수를 밖에서 씀?
// 왜:  함수=입력→처리→출력 상자(반복 제거·이름으로 의도·수정 한 곳·조립) · return은 돌려줌(print는 찍기만) · 지역변수는 프레임과 함께 사라짐

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  const nav = (prev, pos, next, nextLabel) => `
    <div class="practice-nav">
      <button class="chip" data-goto="${prev}">← 이전</button>
      <span class="practice-nav-dots">스텝 ${pos} / 7</span>
      <button class="chip on" data-goto="${next}">${nextLabel || '다음 →'}</button>
    </div>`

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }
  const stepHeader = (badge, title, sub) => `
    <header class="lesson-header">
      <span class="badge">📦 ${badge}</span>
      <h2>${title}</h2>
      <p>${sub}</p>
    </header>`

  // ── 5강 랜딩 (왜 함수인가 + 단계 안내) ───────────────────────
  window.Lessons[5] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">5강 · 함수</span>
        <h2>함수 — 값을 넣으면 값이 나오는 상자</h2>
        <p>같은 작업을 매번 다시 쓰지 말고, <b>이름 붙인 상자</b>에 넣어 두고 <b>필요할 때 부른다</b>. 값을 <b>넣으면(입력)</b> 결과가 <b>나온다(출력)</b>.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 이 강에서</span>
        <p>먼저 <b>왜 함수가 필요한지</b>부터. 그다음 <b>정의·호출·매개변수/인수·return·스코프</b>를 <b>하나씩(쇼츠처럼)</b>. 부르면 메모리에서 무슨 일이 나는지도 <b>그 자리에서 다시</b> 본다. (선수: 1강 값·변수. 메모리 기초는 안 봤어도 5-5에서 짧게 복습한다.)</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/함수_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">함수 ↗</a> · <a href="https://ko.wikipedia.org/wiki/매개변수_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">매개변수 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — 함수는 '마법 블랙박스'가 아니다</div>
        <p class="section-desc" style="margin:0">함수는 어려운 마법이 아니라 <b>입력 → 처리 → 출력</b>을 하는 <b>상자</b>다 — 자판기처럼. <b>넣는 값</b>을 바꾸면 <b>나오는 값</b>이 바뀐다. 왜 이 상자가 필요한지(5-1)부터 보면 나머지가 쉬워진다.</p>
      </div>

      <h3 class="section-title">📚 단계로 배웁니다 (한 번에 하나씩)</h3>
      <div class="home-grid">
        <button class="home-card" data-goto="5-1"><span class="home-card-title">5-1 · 왜 함수?</span><span class="home-card-sub">반복을 하나로 묶기</span></button>
        <button class="home-card" data-goto="5-2"><span class="home-card-title">5-2 · 정의 & 호출</span><span class="home-card-sub">만들고 ( )로 부르기</span></button>
        <button class="home-card" data-goto="5-3"><span class="home-card-title">5-3 · 매개변수 vs 인수</span><span class="home-card-sub">빈 자리 vs 넣는 값</span></button>
        <button class="home-card" data-goto="5-4"><span class="home-card-title">5-4 · return</span><span class="home-card-sub">돌려줌 vs print</span></button>
        <button class="home-card" data-goto="5-5"><span class="home-card-title">5-5 · 🧠 프레임</span><span class="home-card-sub">부르면 칸이 쌓인다(복습)</span></button>
        <button class="home-card" data-goto="5-6"><span class="home-card-title">5-6 · 스코프</span><span class="home-card-sub">지역 vs 전역</span></button>
        <button class="home-card" data-goto="5-7"><span class="home-card-title">5-7 · 화살표 & 요약</span><span class="home-card-sub">짧은 표기 · 언제 만드나</span></button>
      </div>

      <div class="practice-cta">
        <span>🎯 첫 단계부터 — <b>왜 함수를 쓰는가</b>.</span>
        <button class="chip on" data-goto="5-1">5-1 시작 →</button>
      </div>
    `
    wireGoto(root)
  }

  // ── 5-1 · 왜 함수? (동기 — 문법 전에) ────────────────────────
  window.Lessons['5-1'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-1 · 왜 함수?', '같은 코드가 반복되면 — 하나로 묶는다', '문법보다 먼저: 함수를 "왜" 쓰는지 감부터')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/함수_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">함수 ↗</a></p>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "함수는 어렵고 나중에 배우는 것"</div>
        <p class="section-desc" style="margin:0">반대다. 함수는 <b>귀찮음을 줄이는 도구</b>다. 같은 계산을 여기저기 <b>복붙</b>하다 보면, 나중에 <b>한 곳만 바꿔도 전부 틀어진다</b>. 그 고통을 없애려고 만든 게 함수다.</p>
      </div>

      <h3 class="section-title">① 반복의 고통 — 복붙한 코드</h3>
      <span class="learn-tag">📎 세율(0.1)이 세 줄에 흩어져 있다 — 바꾸려면 세 곳을 다 고쳐야</span>
      <div class="card"><div class="file-label">🔬 같은 식이 세 번</div><div data-m="before"></div></div>
      <div data-m="qz"></div>

      <h3 class="section-title">② 함수로 묶기 — 상자 하나로</h3>
      <span class="learn-tag">📎 '세금 포함 가격' 상자 하나 → 세율은 함수 안 한 곳에만</span>
      <div class="card"><div class="file-label">🔬 하나로 묶은 뒤</div><div data-m="after"></div></div>

      <h3 class="section-title">③ 그래서 함수를 쓰는 이유 — 하나가 아니다</h3>
      <ul class="section-list">
        <li><b>반복 제거(DRY)</b> — 같은 코드를 한 번만 쓴다.</li>
        <li><b>이름으로 의도</b> — <code>withTax(...)</code>라고 쓰면 <b>뭘 하는지</b> 한눈에(주석보다 낫다).</li>
        <li><b>수정은 한 곳만</b> — 세율이 바뀌어도 함수 안 한 줄만 고치면 전부 반영.</li>
        <li><b>조립</b> — 만든 상자를 다른 계산의 <b>부품</b>으로 끼운다(3강 표현식의 그 중첩).</li>
      </ul>
      <p class="section-desc">👉 <b>"같은 코드를 두 번 이상 쓰게 되면 함수를 생각하라."</b> 이 감각이 이 강의 전체의 목적이다. 이제 상자 만드는 법(5-2)으로.</p>

      <h3 class="section-title">④ 눈으로 — withTax를 부르면? (이름표 장부 │ 값 메모리)</h3>
      <span class="learn-tag">📎 ▶ — 함수로 묶어도, 부를 때마다 그 함수 칸(프레임)이 잠깐 생겼다 사라진다 (자세힌 5-5)</span>
      <div data-m="mem"></div>

      ${nav(5, 1, '5-2', '5-2 · 정의 & 호출 →')}
    `
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '세율을 <code>0.1 → 0.15</code>로 바꾸려면, 위 <b>복붙 코드</b>에서 몇 줄을 고쳐야 할까?',
      options: ['1줄만', '3줄 다', '안 고쳐도 됨'],
      answer: 1,
      explain: '세 줄에 <code>0.1</code>이 흩어져 있어 <b>3곳 다</b> — 하나라도 빠뜨리면 버그다. 함수로 묶으면? <b>함수 안 1곳만</b>(아래에서 확인). 이게 함수를 쓰는 첫 이유.',
    }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'withTax(10000) — 함수를 부르면 프레임이 잠깐 생긴다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function withTax(price) {', '  return price + price * 0.1', '}', 'let a = withTax(10000)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }], heap: {}, note: '<code>withTax(10000)</code> 호출 직전 — a는 반환을 기다린다(대기).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }, { name: 'withTax', slots: [{ name: 'price', value: '10000' }] }], heap: {}, note: 'withTax 프레임 push — 인수 10000이 매개변수 price에 담긴다. <code>return price+price*0.1</code>이 <b>11000</b>을 만든다.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'a', value: '11000' }] }], heap: {}, note: '<b>11000</b>을 돌려주고 withTax 프레임은 <b>pop</b>. a에 담긴다. 부를 때마다 이렇게 프레임이 <b>잠깐</b> 생겼다 사라진다.' },
      ],
    }))
    root.querySelector('[data-m="before"]').append(Runner({ showBox: false, code: [
      '// 세 상품의 "세금 포함 가격" — 같은 식(+ price*0.1)이 반복된다',
      'let a = 10000 + 10000 * 0.1',
      'let b = 25000 + 25000 * 0.1',
      'let c = 8000 + 8000 * 0.1',
      'print(a); print(b); print(c)   // 11000, 27500, 8800',
      '// 😫 세율이 0.1 → 0.15로 바뀌면? 세 줄을 다 고쳐야 한다 (빠뜨리면 버그)',
    ].join('\n') }))
    root.querySelector('[data-m="after"]').append(Runner({ showBox: false, code: [
      'function withTax(price) {        // 상자 하나 — 세율은 여기 한 곳에만',
      '  return price + price * 0.1',
      '}',
      '',
      'print(withTax(10000))   // 11000',
      'print(withTax(25000))   // 27500',
      'print(withTax(8000))    // 8800',
      '// 🎉 세율 바꾸려면? 함수 안 0.1 한 곳만!',
    ].join('\n') }))
    wireGoto(root)
  }

  // ── 5-2 · 정의 & 호출 ───────────────────────────────────────
  window.Lessons['5-2'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-2 · 정의 & 호출', '상자를 만들고(정의), 부른다(호출)', '이름 뒤 ( )가 "지금 실행해!" 신호')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/서브루틴" target="_blank" rel="noopener noreferrer">서브루틴(함수·호출) ↗</a></p>
      <div data-m="qz"></div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "함수를 정의하면 바로 실행된다"</div>
        <p class="section-desc" style="margin:0"><code>function greet() { … }</code>는 상자를 <b>만들어 둘</b> 뿐 — 이 줄만으론 <b>아무 일도 안 난다</b>. <code>greet()</code>처럼 <b>이름 뒤에 ( )를 붙여 불러야</b> 비로소 안이 실행된다.</p>
      </div>

      <h3 class="section-title">① 정의 1번, 호출 여러 번</h3>
      <span class="learn-tag">📎 상자는 한 번 만들고(정의), 필요할 때마다 여러 번 부른다(호출)</span>
      <div class="card"><div class="file-label">🔬 만들고(정의) 부르기(호출)</div><div data-m="def"></div></div>
      <ul class="section-list">
        <li><b>정의(definition)</b> — <code>function greet() { … }</code>. 상자를 <b>만들어 두는</b> 것. <b>딱 한 번</b>.</li>
        <li><b>호출(call)</b> — <code>greet()</code>. 상자를 <b>실행</b>하는 것. <b>몇 번이든</b>. <b>( )가 핵심</b> — 없으면 실행이 아니라 '상자 자체'를 가리킬 뿐(안 돎).</li>
      </ul>

      <h3 class="section-title">② 눈으로 — 스택에서 (이름표 장부 │ 값 메모리)</h3>
      <span class="learn-tag">📎 ▶ — 정의만 하면 프레임이 안 생기고, 호출해야 greet 칸이 쌓인다</span>
      <div data-m="mem"></div>

      ${nav('5-1', 2, '5-3', '5-3 · 매개변수 vs 인수 →')}
    `
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '<code>function greet(){ return "안녕!" }</code> 다음에 <code>greet</code>라고 <b>( ) 없이</b> 쓰면 "안녕!"이 나올까?',
      options: ['나온다 — "안녕!"', '안 나온다 — 함수 자체를 가리킬 뿐(실행 X)', '에러가 난다'],
      answer: 1,
      explain: '<b>( )가 "지금 실행" 신호</b>다. <code>greet</code>는 상자 <b>자체</b>를 가리킬 뿐(안 돎), <code>greet()</code>라야 안이 실행돼 "안녕!"이 나온다.',
    }))
    root.querySelector('[data-m="def"]').append(Runner({ showBox: false, code: [
      'function greet() {          // 정의: "greet라는 상자를 만든다" (아직 안 돎)',
      '  return "안녕!"',
      '}',
      '',
      'print(greet())             // 호출: ( )를 붙여 실행 → "안녕!"',
      'print(greet())             // 몇 번이든 다시 부를 수 있다',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '정의는 상자만 · 호출해야 프레임이 생긴다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function greet() {', '  return "안녕!"', '}', 'print(greet())'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<code>function greet(){…}</code> <b>정의만</b> 하면 스택엔 <b>아무 프레임도 안 생긴다</b>(상자만 만들어 둠).' },
        { line: 3, stack: [{ name: 'main', slots: [] }, { name: 'greet', slots: [] }], heap: {}, note: '<code>greet()</code> <b>호출</b> → 비로소 <b>greet 프레임이 push</b>된다. ( )가 그 신호.' },
        { line: 3, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<code>return "안녕!"</code> → 값을 돌려주고 greet 프레임은 <b>pop(사라짐)</b>. print가 "안녕!"을 찍는다.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 5-3 · 매개변수 vs 인수 ──────────────────────────────────
  window.Lessons['5-3'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-3 · 매개변수 vs 인수', '빈 자리 vs 넣는 값', '같은 상자, 넣는 값만 바꾸면 결과가 바뀐다')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/매개변수_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">매개변수 ↗</a></p>
      <h3 class="section-title">① 값을 받는 상자</h3>
      <span class="learn-tag">📎 정의의 name = 매개변수(빈 자리) · 호출의 "민지" = 인수(실제 값)</span>
      <div class="card"><div class="file-label">🔬 같은 상자, 다른 입력</div><div data-m="param"></div></div>
      <ul class="section-list">
        <li><b>매개변수(parameter)</b> — 정의의 <code>function greet(<b>name</b>)</code>의 <b>name</b>. "값을 받을 <b>빈 이름</b>". (자판기의 버튼 자리)</li>
        <li><b>인수(argument)</b> — 호출의 <code>greet(<b>"민지"</b>)</code>의 <b>"민지"</b>. "실제로 <b>넣는 값</b>". 이 값이 매개변수 name에 담긴다. (넣는 동전)</li>
      </ul>
      <p class="section-desc">여러 개도 가능 — <code>function add(a, b)</code>처럼 쉼표로. 순서대로 <code>add(3, 4)</code>의 3→a, 4→b.</p>

      <h3 class="section-title">② 눈으로 — 인수가 매개변수 칸에 담긴다</h3>
      <span class="learn-tag">📎 ▶ — 인수 "민지"가 매개변수 name 셀에 들어가는 걸 본다</span>
      <div data-m="mem"></div>

      ${nav('5-2', 3, '5-4', '5-4 · return →')}
    `
    root.querySelector('[data-m="param"]').append(Runner({ showBox: false, code: [
      'function greet(name) {          // name = 매개변수(빈 자리)',
      '  return "안녕, " + name + " 님!"',
      '}',
      '',
      'print(greet("민지"))            // "민지" = 인수 → name에 담긴다',
      'print(greet("지훈"))            // 넣는 값만 바꾸면 결과가 바뀐다',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'greet("민지") — 인수가 매개변수 name에 담긴다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function greet(name) {', '  return "안녕, " + name + " 님!"', '}', 'print(greet("민지"))'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<code>greet("민지")</code>를 호출하려 한다.' },
        { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'greet', slots: [{ name: 'name', value: '"민지"' }] }], heap: {}, note: 'greet 프레임 push — <b>인수 "민지"가 매개변수 name에 담긴다</b>(name 셀 = "민지"). 이름은 장부, 값은 값 메모리.' },
        { line: 3, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>"안녕, 민지 님!"</b>을 돌려주고 greet 프레임 pop. name도 함께 사라진다.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 5-4 · return (vs print) ─────────────────────────────────
  window.Lessons['5-4'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-4 · return', "값을 '돌려준다' — print와 다르다!", '돌려받아 담고, 또 다른 계산에 쓴다')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/반환문" target="_blank" rel="noopener noreferrer">반환문(return) ↗</a></p>
      <div data-m="qz"></div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "return과 print가 같다"</div>
        <p class="section-desc" style="margin:0"><b>다르다.</b> <code>return</code>은 결과를 <b>호출한 자리로 돌려줘</b> 변수에 담거나 다시 쓸 수 있다. <code>print</code>는 <b>화면에 찍기만</b> 하고 값을 <b>못 돌려준다</b>. return이 없으면 함수는 <code>undefined</code>를 돌려준다.</p>
      </div>
      <h3 class="section-title">① 돌려받아 담고, 또 쓰기</h3>
      <span class="learn-tag">📎 let sum = add(3,4) — 돌려준 값을 담는다 · return 없으면 undefined</span>
      <div class="card"><div class="file-label">🔬 return 있음 vs 없음</div><div data-m="ret"></div></div>
      <p class="section-desc">🔑 <b>결과를 다시 쓰려면 반드시 return</b>. "화면에만 보이면 됐지"가 아니다 — 담아서 조립하려면 돌려줘야 한다(그게 5-1의 '부품으로 조립').</p>

      <h3 class="section-title">② 눈으로 — 돌려준 값이 변수에 담긴다</h3>
      <span class="learn-tag">📎 ▶ — return 10이 double 프레임에서 나와 r 셀에 담긴다</span>
      <div data-m="mem"></div>

      ${nav('5-3', 4, '5-5', '5-5 · 🧠 프레임 →')}
    `
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '<code>function f(x){ let y = x*2 }</code> — <b>return이 없다</b>. <code>print(f(5))</code>는 뭘 찍을까?',
      options: ['10', 'undefined (돌려준 게 없다)', '0', '에러'],
      answer: 1,
      explain: '함수 안에서 계산은 했지만 <b>return으로 내보내지 않았다</b> → 함수는 <b>undefined</b>를 돌려준다. "계산했으니 10이 나오겠지"가 최대 착각. return이 있어야 값이 밖으로 나온다.',
    }))
    root.querySelector('[data-m="ret"]').append(Runner({ showBox: false, code: [
      'function add(a, b) {',
      '  return a + b            // 결과를 "돌려준다"',
      '}',
      '',
      'let sum = add(3, 4)       // 돌려준 값을 변수에 담는다',
      'print(sum)                // 7',
      'print(add(sum, 10))       // 돌려받은 값을 또 다른 계산에! → 17',
      '',
      'function noReturn(x) {     // return이 없으면?',
      '  let y = x * 2           // 계산만 하고 안 돌려줌',
      '}',
      'print(noReturn(5))        // undefined (돌려준 게 없다)',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'return이 값을 돌려줘 변수에 담긴다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function double(x) {', '  return x * 2', '}', 'let r = double(5)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }], heap: {}, note: '<code>double(5)</code> 호출 직전 — r은 반환을 <b>기다린다</b>(대기).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }, { name: 'double', slots: [{ name: 'x', value: '5' }] }], heap: {}, note: 'double 프레임: x=5. <code>return x*2</code>가 <b>10</b>을 만든다.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'r', value: '10' }] }], heap: {}, note: '<b>return 10</b>을 돌려줘 <b>r 셀에 담긴다</b> ✔. (return이 없었다면 r엔 <b>undefined</b>가 담겼을 것.)' },
      ],
    }))
    wireGoto(root)
  }

  // ── 5-5 · 🧠 반환(return)을 프레임으로 — 아주 자세히 ──────────
  window.Lessons['5-5'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-5 · 🧠 반환의 여러 모습', "반환은 '있을 수도, 없을 수도, 다를 수도'", '함수 최대 난관 — 프레임 push/pop으로 낱낱이 본다')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/반환문" target="_blank" rel="noopener noreferrer">반환문 ↗</a> · <a href="https://ko.wikipedia.org/wiki/콜_스택" target="_blank" rel="noopener noreferrer">콜 스택 ↗</a> · <a href="https://ko.wikipedia.org/wiki/제어_흐름" target="_blank" rel="noopener noreferrer">제어 흐름 ↗</a></p>
      <div class="card">
        <div class="file-label">🧠 30초 복습 — 프레임이 뭐였더라</div>
        <p class="section-desc" style="margin:0">함수를 부르면 <b>그 함수만의 작업 칸(프레임)</b>이 <b>스택</b>에 잠깐 쌓인다. 왼쪽 <b>이름표 장부</b>(이름) · 오른쪽 <b>값 메모리</b>(실제 값). <b>핵심: <code>return</code>은 두 가지를 동시에 한다 — ① 값을 프레임 <u>밖으로</u> 내보내고 ② 함수를 <u>즉시 끝낸다</u>(프레임 pop).</b> (더 깊이는 🧠 M1~M2 · 콜 스택.)</p>
      </div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 왜 어렵나 — 반환은 '있을 수도, 없을 수도'</div>
        <p class="section-desc" style="margin:0">같은 함수라도 <b>어떤 길로 가느냐에 따라</b> 값을 <b>돌려줄 수도(return), 안 돌려줄 수도(undefined)</b> 있고, <b>여러 return 중 하나만</b> 실행된다. 이 '경우의 수'를 프레임으로 보면 헷갈림이 풀린다. 아래 네 가지를 ▶로.</p>
      </div>

      <h3 class="section-title">① 있음 — return이 값을 '밖으로' 내보낸다</h3>
      <span class="learn-tag">📎 ▶ — return 7이 add 프레임에서 나와 sum에 담기고, 프레임은 pop</span>
      <div data-m="f1"></div>

      <h3 class="section-title">② 없음 — return이 없으면?</h3>
      <div data-m="qz2"></div>
      <span class="learn-tag">📎 계산만 하고 안 돌려주면? 함수는 자동으로 undefined를 내놓는다</span>
      <div data-m="f2"></div>
      <div class="card"><div class="file-label">🔬 직접 — 돌려준 게 없으면</div><div data-m="r2"></div></div>

      <h3 class="section-title">③ 조기 반환 — return을 먼저 만나면?</h3>
      <div data-m="qz3"></div>
      <span class="learn-tag">📎 return은 함수를 그 자리에서 끝낸다 — 그 아래 코드는 실행조차 안 된다(dead)</span>
      <div data-m="f3"></div>
      <div class="card"><div class="file-label">🔬 직접 — 0으로 나눌 때 막기(가드)</div><div data-m="r3"></div></div>

      <h3 class="section-title">④ 조건부 반환 — 분기마다 다른 return</h3>
      <div data-m="qz4"></div>
      <span class="learn-tag">📎 점수에 따라 A·B·C 중 하나만 실행 — "있을 수도, 다를 수도"의 정체</span>
      <div data-m="f4"></div>
      <div class="card"><div class="file-label">🔬 직접 — 점수 → 등급</div><div data-m="r4"></div></div>

      <div class="concept">
        <p class="concept-lead">📖 이 단계 요약</p>
        <p class="section-desc" style="margin-top:0"><code>return 값</code>: 값을 <b>밖으로</b> + 함수 <b>즉시 종료</b>(pop). <b>return 없음/끝까지 안 만남 → undefined</b>. <b>여러 return</b> 중 <b>먼저 만나는 하나</b>만 실행. 지역변수는 프레임과 함께 사라진다(→ 5-6).</p>
      </div>
      ${nav('5-4', 5, '5-6', '5-6 · 스코프 →')}
    `
    root.querySelector('[data-m="qz2"]').append(Quiz({
      q: '<code>function shout(x){ let big = x*100 }</code> — return이 없다. <code>let r = shout(5)</code> 뒤 <b>r은?</b>',
      options: ['500', 'undefined', '0'],
      answer: 1,
      explain: 'big=500을 <b>계산은</b> 했지만 <b>return으로 내보내지 않았다</b> → 함수는 undefined를 돌려주고, big(지역)은 사라진다. r엔 <b>undefined</b>.',
    }))
    root.querySelector('[data-m="qz3"]').append(Quiz({
      q: '<code>safeDiv(a,b)</code>가 <code>if(b===0) return "못 나눔"</code> 다음 줄에 <code>return a/b</code>가 있다. <b>safeDiv(10, 0)</b>에서 <code>return a/b</code>가 실행될까?',
      options: ['실행된다 (10/0 계산)', '실행 안 된다 (위에서 이미 return해 끝남)'],
      answer: 1,
      explain: 'b가 0이라 첫 줄 <code>return "못 나눔"</code>에서 <b>함수가 즉시 끝난다</b> — 아래 <code>return a/b</code>는 <b>실행조차 안 됨</b>(dead). return은 값을 내보내며 <b>함수를 종료</b>한다.',
    }))
    root.querySelector('[data-m="qz4"]').append(Quiz({
      q: '<code>grade</code>: <code>if(≥90)return"A"; if(≥80)return"B"; return"C"</code>. <b>grade(85)</b>는?',
      options: ['"A"', '"B"', '"C"'],
      answer: 1,
      explain: '첫 <code>if(≥90)</code>는 거짓(건너뜀), 둘째 <code>if(≥80)</code>는 참 → <b>return "B"</b>에서 끝(셋째 "C"는 안 옴). 점수가 달랐다면 다른 return이 실행됐을 것.',
    }))
    root.querySelector('[data-m="f1"]').append(MemoryModel({
      title: '① 있음 — return이 값을 밖으로 내보낸다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function add(a, b) {', '  return a + b', '}', 'let sum = add(3, 4)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }], heap: {}, note: '<code>add(3,4)</code> 호출 직전 — sum은 반환을 기다린다(대기).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }, { name: 'add', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '4' }] }], heap: {}, note: 'add 프레임 push. a=3, b=4. <code>return a+b</code>가 <b>7</b>을 만든다.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'sum', value: '7' }] }], heap: {}, note: '<b>return 7</b>이 프레임 <b>밖으로</b> 나와 sum에 담기고, add 프레임은 <b>pop</b>. ✔ 값이 있다.' },
      ],
    }))
    root.querySelector('[data-m="f2"]').append(MemoryModel({
      title: '② 없음 — 끝까지 return이 없으면 undefined',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function shout(x) {', '  let big = x * 100', '}', 'let r = shout(5)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }], heap: {}, note: '<code>shout(5)</code> 호출 직전.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }, { name: 'shout', slots: [{ name: 'x', value: '5' }, { name: 'big', value: '500' }] }], heap: {}, note: 'shout 프레임: x=5, big=500 <b>계산만</b>. 그런데 <b>return이 없다</b>.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'r', value: 'undefined' }] }], heap: {}, note: '끝까지 return이 없으면 함수는 <b>자동으로 undefined</b>를 돌려준다(에러가 아니라 <b>정상적인 "값 없음"</b>). big(지역)은 사라지고 <b>r엔 undefined</b>.' },
      ],
    }))
    root.querySelector('[data-m="r2"]').append(Runner({ showBox: false, code: [
      'function shout(x) {',
      '  let big = x * 100      // 계산만 하고',
      '}                        // return이 없다',
      'let r = shout(5)',
      'print(r)                 // undefined (돌려준 게 없다)',
    ].join('\n') }))
    root.querySelector('[data-m="f3"]').append(MemoryModel({
      title: '③ 조기 반환 — return을 만나면 즉시 끝',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function safeDiv(a, b) {', '  if (b === 0) return "못 나눔"', '  return a / b', '}', 'safeDiv(10, 0)'],
      steps: [
        { line: 4, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<code>safeDiv(10, 0)</code> 호출.' },
        { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'safeDiv', slots: [{ name: 'a', value: '10' }, { name: 'b', value: '0' }] }], heap: {}, note: 'safeDiv 프레임: a=10, b=0. <code>b===0</code>이 <b>참</b> → 여기서 <b>return "못 나눔"</b>을 만난다.' },
        { line: 1, stack: [{ name: 'main', slots: [] }], heap: {}, note: 'return을 만나는 <b>순간 함수는 즉시 끝</b> — <b>아래 <code>return a/b</code>는 실행조차 안 됨</b>(dead code). 프레임 pop, "못 나눔" 반환.' },
      ],
    }))
    root.querySelector('[data-m="r3"]').append(Runner({ showBox: false, code: [
      'function safeDiv(a, b) {',
      '  if (b === 0) return "0으로 못 나눔"   // 여기서 즉시 끝',
      '  return a / b                          // b가 0이면 여긴 안 온다',
      '}',
      'print(safeDiv(10, 2))   // 5',
      'print(safeDiv(10, 0))   // "0으로 못 나눔" (조기 반환)',
    ].join('\n') }))
    root.querySelector('[data-m="f4"]').append(MemoryModel({
      title: '④ 조건부 — 분기마다 다른 return',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function grade(score) {', '  if (score >= 90) return "A"', '  if (score >= 80) return "B"', '  return "C"', '}', 'grade(85)'],
      steps: [
        { line: 5, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<code>grade(85)</code> 호출.' },
        { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'grade', slots: [{ name: 'score', value: '85' }] }], heap: {}, note: 'score=85. 첫 <code>if(≥90)</code> <b>거짓</b> → 건너뛴다(이 return은 안 됨).' },
        { line: 2, stack: [{ name: 'main', slots: [] }, { name: 'grade', slots: [{ name: 'score', value: '85' }] }], heap: {}, note: '둘째 <code>if(≥80)</code> <b>참</b> → <b>return "B"</b>. 여기서 끝(셋째 줄 "C"는 안 옴).' },
        { line: 2, stack: [{ name: 'main', slots: [] }], heap: {}, note: '"B" 반환하고 pop. <b>점수가 달랐다면 다른 return</b>이 실행됐을 것 — 그래서 반환값은 "있을 수도, <b>다를 수도</b>".' },
      ],
    }))
    root.querySelector('[data-m="r4"]').append(Runner({ showBox: false, code: [
      'function grade(score) {',
      '  if (score >= 90) return "A"',
      '  if (score >= 80) return "B"',
      '  return "C"',
      '}',
      'print(grade(95))   // "A"',
      'print(grade(85))   // "B"  (첫 if 건너뛰고 둘째서 반환)',
      'print(grade(70))   // "C"  (둘 다 건너뛰고 마지막)',
    ].join('\n') }))
    wireGoto(root)
  }

  // ── 5-6 · 스코프 (지역 vs 전역) ─────────────────────────────
  window.Lessons['5-6'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-6 · 스코프', "함수 안 변수는 '지역' — 밖에서 안 보인다", '5-5에서 봤듯 프레임과 함께 생겼다 사라지니까')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/지역_변수" target="_blank" rel="noopener noreferrer">지역 변수 ↗</a> · <a href="https://ko.wikipedia.org/wiki/전역_변수" target="_blank" rel="noopener noreferrer">전역 변수 ↗</a></p>
      <div data-m="qz"></div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "함수 안에서 만든 변수를 밖에서도 쓸 수 있다"</div>
        <p class="section-desc" style="margin:0">못 쓴다. 함수 안 <code>let</code> 변수(<b>지역변수</b>)는 <b>그 함수 안에서만</b> 살고, 함수가 끝나면 <b>프레임과 함께 사라진다</b>(5-5). 밖에서 부르면 에러다.</p>
      </div>
      <h3 class="section-title">① 지역 vs 전역</h3>
      <span class="learn-tag">📎 함수 밖 변수(전역)는 어디서나 · 함수 안 변수(지역)는 그 안에서만</span>
      <div class="card"><div class="file-label">🔬 밖에서 msg를 부르면? (주석 풀면 에러)</div><div data-m="scope"></div></div>
      <p class="section-desc">그래서 함수는 <b>안전</b>하다 — 함수 안에서 뭘 하든 지역변수라 <b>밖을 안 건드린다</b>. 이름이 겹쳐도 서로 다른 프레임이라 안 부딪힌다.</p>

      <h3 class="section-title">② 눈으로 — 전역은 남고, 지역은 사라진다</h3>
      <span class="learn-tag">📎 ▶ — appName(전역)은 main에 남고, user·msg(지역)는 프레임과 함께 사라진다</span>
      <div data-m="mem"></div>

      ${nav('5-5', 6, '5-7', '5-7 · 화살표 & 요약 →')}
    `
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '함수 <b>안</b>에서 <code>let msg = ...</code>로 만든 변수를, 함수 <b>밖</b>에서 <code>print(msg)</code>하면?',
      options: ['msg 값이 나온다', 'undefined가 나온다', '에러 — 밖에선 msg가 안 보인다(지역)'],
      answer: 2,
      explain: '<b>지역변수</b>는 그 함수 <b>프레임 안에서만</b> 살고, 함수가 끝나면 <b>프레임과 함께 사라진다</b>(5-5). 밖에는 그런 이름이 아예 없어서 <b>에러</b>. 이게 스코프.',
    }))
    root.querySelector('[data-m="scope"]').append(Runner({ showBox: false, code: [
      'let appName = "메모장"              // 전역 — 어디서나 보인다',
      '',
      'function makeMsg(user) {',
      '  let msg = user + " 님, " + appName + "에 오신 걸 환영해요"  // msg = 지역',
      '  return msg',
      '}',
      '',
      'print(makeMsg("민지"))             // OK — 함수가 msg를 만들어 돌려준다',
      '// print(msg)   // ❌ 여기선 msg가 안 보인다(지역이라) — 주석 풀면 에러',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '전역(main)은 남고 · 지역(프레임)은 사라진다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['let appName = "메모장"', 'function makeMsg(user) {', '  let msg = user + " 님"', '  return msg', '}', 'makeMsg("민지")'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }], heap: {}, note: 'appName은 함수 <b>밖</b> — <b>전역</b>. main 장부에 산다(어디서나 보임).' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }, { name: 'makeMsg', slots: [{ name: 'user', value: '"민지"' }, { name: 'msg', value: '"민지 님"' }] }], heap: {}, note: 'makeMsg 프레임: <b>user(인수)·msg(지역변수)는 이 프레임 안에만</b> 있다.' },
        { line: 5, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }], heap: {}, note: 'makeMsg <b>pop</b> → user·msg <b>사라짐</b>(지역이라). appName(전역)은 <b>그대로</b>. 그래서 밖에서 msg는 <b>없다</b>.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 5-7 · 화살표 & 요약 ─────────────────────────────────────
  window.Lessons['5-7'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-7 · 화살표 & 요약', '짧은 표기, 그리고 "언제 함수를 만드나"', '표기는 취향, 감각은 핵심')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/익명_함수" target="_blank" rel="noopener noreferrer">익명 함수 ↗</a> · <a href="https://ko.wikipedia.org/wiki/람다_대수" target="_blank" rel="noopener noreferrer">람다 ↗</a></p>
      <h3 class="section-title">① 화살표 함수 — 짧게 쓰는 표기</h3>
      <span class="learn-tag">📎 (n) => n * 2 는 function (n) { return n * 2 } 의 짧은 표기 (한 줄이면 return 생략)</span>
      <div class="card"><div class="file-label">🔬 같은 함수, 두 표기</div><div data-m="arrow"></div></div>
      <p class="section-desc">뒤 강의(<b>7강 map</b>)에서 함수를 <b>인자로 넘길 때</b> 이 짧은 표기가 자주 나온다. 지금은 "둘은 같다"만 기억.</p>

      <span class="learn-tag">📎 ▶ — 화살표 함수도 부르면 똑같이 프레임이 쌓인다(표기만 짧을 뿐)</span>
      <div data-m="mem"></div>

      <h3 class="section-title">② 언제 함수를 만드나 — 감각</h3>
      <ul class="section-list">
        <li>같은 코드를 <b>두 번 이상</b> 쓰게 될 때 (5-1의 그 고통).</li>
        <li><b>이름 붙일 만한 의미 있는 작업</b>일 때 (<code>withTax</code>, <code>makeMsg</code>처럼).</li>
        <li>복잡한 한 줄을 <b>부품으로 쪼갤</b> 때 (3강 표현식 · 조립).</li>
      </ul>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>함수 = 입력→처리→출력 상자</b>(반복 제거·이름·수정 한 곳·조립). <code>function 이름(매개변수){ return 값 }</code> 정의, <code>이름(인수)</code> 호출.
        <b>return은 돌려주기</b>(print는 찍기만), <b>지역변수는 프레임과 함께</b> 산다. 내부 원리는 🧠 메모리 챕터로.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>드릴</b>로 손에 붙이자 — 🟢쉬움 → 🟡보통 → 🔴어려움 (각 5문제).</span>
        <button class="chip on" data-goto="5:easy">📝 5강 실습 시작 (🟢 쉬움) →</button>
      </div>
    `
    root.querySelector('[data-m="arrow"]').append(Runner({ showBox: false, code: [
      '// 두 표기는 완전히 같은 함수다',
      'function doubleA(n) { return n * 2 }   // 보통 표기',
      'const doubleB = (n) => n * 2           // 화살표(한 줄이면 return 생략)',
      '',
      'print(doubleA(10))   // 20',
      'print(doubleB(10))   // 20  (똑같다)',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '화살표 함수도 똑같이 프레임이 쌓인다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['const doubleB = (n) => n * 2', 'let x = doubleB(10)'],
      steps: [
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'x', value: '(대기)', bad: true }] }], heap: {}, note: '<code>doubleB(10)</code> 호출 직전.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'x', value: '(대기)', bad: true }] }, { name: 'doubleB', slots: [{ name: 'n', value: '10' }] }], heap: {}, note: '화살표 함수도 부르면 <b>똑같이 프레임 push</b> — n=10. 표기만 짧을 뿐 동작은 같다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'x', value: '20' }] }], heap: {}, note: '<b>n*2=20</b>을 (암묵적으로) 돌려주고 pop → x=20. <b>보통 함수와 완전히 같다</b>.' },
      ],
    }))
    wireGoto(root)
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
