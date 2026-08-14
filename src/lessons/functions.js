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
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "함수는 어렵고 나중에 배우는 것"</div>
        <p class="section-desc" style="margin:0">반대다. 함수는 <b>귀찮음을 줄이는 도구</b>다. 같은 계산을 여기저기 <b>복붙</b>하다 보면, 나중에 <b>한 곳만 바꿔도 전부 틀어진다</b>. 그 고통을 없애려고 만든 게 함수다.</p>
      </div>

      <h3 class="section-title">① 반복의 고통 — 복붙한 코드</h3>
      <span class="learn-tag">📎 세율(0.1)이 세 줄에 흩어져 있다 — 바꾸려면 세 곳을 다 고쳐야</span>
      <div class="card"><div class="file-label">🔬 같은 식이 세 번</div><div data-m="before"></div></div>

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
      ${nav(5, 1, '5-2', '5-2 · 정의 & 호출 →')}
    `
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
      ${nav('5-1', 2, '5-3', '5-3 · 매개변수 vs 인수 →')}
    `
    root.querySelector('[data-m="def"]').append(Runner({ showBox: false, code: [
      'function greet() {          // 정의: "greet라는 상자를 만든다" (아직 안 돎)',
      '  return "안녕!"',
      '}',
      '',
      'print(greet())             // 호출: ( )를 붙여 실행 → "안녕!"',
      'print(greet())             // 몇 번이든 다시 부를 수 있다',
    ].join('\n') }))
    wireGoto(root)
  }

  // ── 5-3 · 매개변수 vs 인수 ──────────────────────────────────
  window.Lessons['5-3'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-3 · 매개변수 vs 인수', '빈 자리 vs 넣는 값', '같은 상자, 넣는 값만 바꾸면 결과가 바뀐다')}
      <h3 class="section-title">① 값을 받는 상자</h3>
      <span class="learn-tag">📎 정의의 name = 매개변수(빈 자리) · 호출의 "민지" = 인수(실제 값)</span>
      <div class="card"><div class="file-label">🔬 같은 상자, 다른 입력</div><div data-m="param"></div></div>
      <ul class="section-list">
        <li><b>매개변수(parameter)</b> — 정의의 <code>function greet(<b>name</b>)</code>의 <b>name</b>. "값을 받을 <b>빈 이름</b>". (자판기의 버튼 자리)</li>
        <li><b>인수(argument)</b> — 호출의 <code>greet(<b>"민지"</b>)</code>의 <b>"민지"</b>. "실제로 <b>넣는 값</b>". 이 값이 매개변수 name에 담긴다. (넣는 동전)</li>
      </ul>
      <p class="section-desc">여러 개도 가능 — <code>function add(a, b)</code>처럼 쉼표로. 순서대로 <code>add(3, 4)</code>의 3→a, 4→b.</p>
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
    wireGoto(root)
  }

  // ── 5-4 · return (vs print) ─────────────────────────────────
  window.Lessons['5-4'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-4 · return', "값을 '돌려준다' — print와 다르다!", '돌려받아 담고, 또 다른 계산에 쓴다')}
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "return과 print가 같다"</div>
        <p class="section-desc" style="margin:0"><b>다르다.</b> <code>return</code>은 결과를 <b>호출한 자리로 돌려줘</b> 변수에 담거나 다시 쓸 수 있다. <code>print</code>는 <b>화면에 찍기만</b> 하고 값을 <b>못 돌려준다</b>. return이 없으면 함수는 <code>undefined</code>를 돌려준다.</p>
      </div>
      <h3 class="section-title">① 돌려받아 담고, 또 쓰기</h3>
      <span class="learn-tag">📎 let sum = add(3,4) — 돌려준 값을 담는다 · return 없으면 undefined</span>
      <div class="card"><div class="file-label">🔬 return 있음 vs 없음</div><div data-m="ret"></div></div>
      <p class="section-desc">🔑 <b>결과를 다시 쓰려면 반드시 return</b>. "화면에만 보이면 됐지"가 아니다 — 담아서 조립하려면 돌려줘야 한다(그게 5-1의 '부품으로 조립').</p>
      ${nav('5-3', 4, '5-5', '5-5 · 🧠 프레임 →')}
    `
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
    wireGoto(root)
  }

  // ── 5-5 · 🧠 눈으로: 프레임 (메모리 재활성화) ──────────────────
  window.Lessons['5-5'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-5 · 🧠 부르면 칸이 쌓인다', '함수 호출 = 프레임 push, 반환 = pop', '메모리 기초를 안 봤어도 — 여기서 30초 복습하고 눈으로')}
      <div class="card">
        <div class="file-label">🧠 30초 복습 — 스택이 뭐였더라</div>
        <p class="section-desc" style="margin:0">값은 <b>메모리</b>에 산다. 그중 변수(이름표)는 <b>스택</b>이라는 공간에 <b>쌓였다 사라진다</b>(접시 더미처럼). 왼쪽은 <b>이름표 장부</b>(이름), 오른쪽 <b>값 메모리</b>(실제 값). 함수를 부르면 <b>그 함수만의 칸(프레임)</b>이 스택에 <b>잠깐</b> 생긴다. (더 깊이는 🧠 M1~M2.)</p>
      </div>
      <h3 class="section-title">① 눈으로 — add(3,4) 한 단계씩</h3>
      <span class="learn-tag">📎 ▶ 눌러 — 호출하면 add 칸이 쌓이고(push), return하면 통째로 사라진다(pop)</span>
      <div data-m="frame"></div>
      <p class="section-desc">이래서 함수는 <b>서로 안 간섭</b>한다 — 각자 자기 프레임에서 일한다. 그리고 <b>끝나면 그 칸이 통째로 사라져</b> 안의 지역변수도 함께 없어진다(→ 다음 5-6 스코프). 함수의 삶과 죽음 자세히는 <b>🧠 콜 스택</b>, 값을 넘길 때 원본이 안전한지는 <b>🧠 M5~M7</b>.</p>
      ${nav('5-4', 5, '5-6', '5-6 · 스코프 →')}
    `
    root.querySelector('[data-m="frame"]').append(MemoryModel({
      title: 'add(3, 4) 호출 — 프레임이 쌓였다 사라진다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function add(a, b) {', '  return a + b', '}', 'let sum = add(3, 4)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }], heap: {},
          note: '<code>add(3, 4)</code>를 호출하려 한다. main의 sum은 아직 <b>반환을 기다린다</b>(대기).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }, { name: 'add', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '4' }] }], heap: {},
          note: 'add 프레임이 <b>push</b>된다. 인수 <b>3·4</b>가 매개변수 <b>a·b</b>에 담긴다. (이름은 장부, 값은 값 메모리 셀)' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'sum', value: '7' }] }], heap: {},
          note: '<code>return a + b</code>(=7)를 돌려주고 add 프레임은 <b>pop(사라짐)</b> — a·b도 함께. 반환값 7이 <b>sum</b>에 담긴다.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 5-6 · 스코프 (지역 vs 전역) ─────────────────────────────
  window.Lessons['5-6'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-6 · 스코프', "함수 안 변수는 '지역' — 밖에서 안 보인다", '5-5에서 봤듯 프레임과 함께 생겼다 사라지니까')}
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "함수 안에서 만든 변수를 밖에서도 쓸 수 있다"</div>
        <p class="section-desc" style="margin:0">못 쓴다. 함수 안 <code>let</code> 변수(<b>지역변수</b>)는 <b>그 함수 안에서만</b> 살고, 함수가 끝나면 <b>프레임과 함께 사라진다</b>(5-5). 밖에서 부르면 에러다.</p>
      </div>
      <h3 class="section-title">① 지역 vs 전역</h3>
      <span class="learn-tag">📎 함수 밖 변수(전역)는 어디서나 · 함수 안 변수(지역)는 그 안에서만</span>
      <div class="card"><div class="file-label">🔬 밖에서 msg를 부르면? (주석 풀면 에러)</div><div data-m="scope"></div></div>
      <p class="section-desc">그래서 함수는 <b>안전</b>하다 — 함수 안에서 뭘 하든 지역변수라 <b>밖을 안 건드린다</b>. 이름이 겹쳐도 서로 다른 프레임이라 안 부딪힌다.</p>
      ${nav('5-5', 6, '5-7', '5-7 · 화살표 & 요약 →')}
    `
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
    wireGoto(root)
  }

  // ── 5-7 · 화살표 & 요약 ─────────────────────────────────────
  window.Lessons['5-7'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-7 · 화살표 & 요약', '짧은 표기, 그리고 "언제 함수를 만드나"', '표기는 취향, 감각은 핵심')}
      <h3 class="section-title">① 화살표 함수 — 짧게 쓰는 표기</h3>
      <span class="learn-tag">📎 (n) => n * 2 는 function (n) { return n * 2 } 의 짧은 표기 (한 줄이면 return 생략)</span>
      <div class="card"><div class="file-label">🔬 같은 함수, 두 표기</div><div data-m="arrow"></div></div>
      <p class="section-desc">뒤 강의(<b>7강 map</b>)에서 함수를 <b>인자로 넘길 때</b> 이 짧은 표기가 자주 나온다. 지금은 "둘은 같다"만 기억.</p>

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
        <span>🎯 이제 <b>드릴</b>로 손에 붙이자 — 정의·호출·인수·return (10문제).</span>
        <button class="chip on" data-goto="5-8">📝 5강 실습 시작 (5-8) →</button>
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
    wireGoto(root)
  }

  // 유형 드릴 ×10 (5-8~5-17) — 정의·호출·인수·return·스코프. startAt:8 (개념이 5-1~5-7).
  window.Practices[5] = {
    startAt: 8,
    pattern: '유형: 빈칸을 채워 함수가 원하는 값을 print 하게 하기 (정의·호출·인수·return)',
    problems: [
      { label: '정의 키워드', ask: '함수를 만드는 키워드는? 빈칸을 채우세요.', code: '____ hi() { return 7 }\nprint(hi())', expect: '7', answer: 'function', hint: '함수 정의 = function' },
      { label: '호출의 ( )', ask: '함수를 실행(호출)하려면 이름 뒤에 뭘 붙이나?', code: 'function hi() { return "야" }\nprint(hi____)', expect: '"야"', answer: '()', hint: '이름() 로 부른다' },
      { label: '인수 넣기', ask: 'dbl에 값을 넣어 10이 나오게. 무슨 값?', code: 'function dbl(n) { return n * 2 }\nprint(dbl(____))', expect: '10', answer: '5', hint: 'n*2=10이면 n은?' },
      { label: 'return', ask: '결과를 돌려주는 키워드는? (없으면 undefined)', code: 'function add(a, b) { ____ a + b }\nprint(add(2, 3))', expect: '5', answer: 'return', hint: '값을 돌려줌 = return' },
      { label: '매개변수 쓰기', ask: '받은 name을 인사말에 넣으세요.', code: 'function g(name) { return "hi " + ____ }\nprint(g("z"))', expect: '"hi z"', answer: 'name', hint: '매개변수 이름 그대로' },
      { label: '반환값 담기', ask: 'sq(4)의 결과를 r에 담으세요. 무슨 함수를 부르나?', code: 'function sq(x) { return x * x }\nlet r = ____(4)\nprint(r)', expect: '16', answer: 'sq', hint: 'sq를 호출' },
      { label: 'return 없으면', ask: 'x*2를 돌려주도록 빈칸을. (없으면 undefined였다)', code: 'function f(x) { ____ x * 2 }\nprint(f(3))', expect: '6', answer: 'return', hint: '돌려주려면 return' },
      { label: '화살표 함수', ask: '화살표 함수로 n의 2배. 연산자는?', code: 'const dbl = (n) => n ____ 2\nprint(dbl(6))', expect: '12', answer: '*', hint: '2배 = 곱하기' },
      { label: '두 인수', ask: 'add(4, ?)가 10이 되게 두 번째 인수를 채우세요.', code: 'function add(a, b) { return a + b }\nprint(add(4, ____))', expect: '10', answer: '6', hint: '4 + ? = 10' },
      { label: '전역 쓰기', ask: '함수가 전역 base를 더한다. add5(?)가 15가 되게.', code: 'let base = 10\nfunction add5(n) { return n + base }\nprint(add5(____))', expect: '15', answer: '5', hint: 'n + 10 = 15' },
    ],
  }
})()
