// 5강 · 함수 (정의·호출 · 매개변수/인수 · return · 화살표 · 스코프)  ── design-principles 규범
// 오해: 함수는 마법 블랙박스? · 매개변수=인수? · return과 print가 같다? · 함수 안 변수를 밖에서 쓸 수 있다?
// 왜:  함수=입력→처리→출력 상자(재사용) · 매개변수는 '빈 자리', 인수는 '넣는 값' · return은 값을 돌려줌(print는 찍기만)
// 대비: return(돌려줌) vs print(찍기만) · 매개변수(정의) vs 인수(호출) · 지역(함수 안) vs 전역(밖)
// 내부 원리(스택 프레임·전달·클로저)는 🧠 메모리 챕터가 담당 — 여기선 '쓰는 법'만, 그쪽으로 forward-link.

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Lessons[5] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">5강</span>
        <h2>함수 — 값을 넣으면 값이 나오는 상자</h2>
        <p>같은 작업을 매번 다시 쓰지 말고, <b>이름 붙인 상자</b>에 넣어 두고 <b>필요할 때 부른다</b>. 값을 <b>넣으면(입력)</b> 결과가 <b>나온다(출력)</b>.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><code>function 이름(매개변수) { … return 값 }</code>로 <b>정의</b>하고 <code>이름(인수)</code>로 <b>호출</b>한다.
        <b>매개변수</b>=받을 빈 자리, <b>인수</b>=넣는 실제 값. <code>return</code>은 값을 <b>돌려준다</b>(print는 찍기만). 함수 안 변수는 <b>지역</b>(밖에서 안 보임).</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/함수_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">함수 ↗</a> · <a href="https://ko.wikipedia.org/wiki/매개변수_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">매개변수 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — 함수는 '마법 블랙박스'가 아니다</div>
        <p class="section-desc" style="margin:0">함수는 신비한 마법이 아니라 <b>입력 → 처리 → 출력</b>을 하는 <b>상자</b>다 — 자판기처럼. <b>넣는 값</b>(인수)을 바꾸면 <b>나오는 값</b>이 바뀐다. 같은 값을 넣으면 늘 같은 결과가 나오는 상자를 만드는 게 목표다.</p>
      </div>

      <h3 class="section-title">① 정의 & 호출 — 상자를 만들고, 부른다</h3>
      <span class="learn-tag">📎 이름 뒤의 <b>( )</b>가 "지금 실행해!"라는 호출 신호 — ( ) 없으면 상자 자체(안 돎)</span>
      <div class="card">
        <div class="file-label">🔬 만들고(정의) 부르기(호출)</div>
        <div data-m="def"></div>
      </div>
      <p class="section-desc"><code>function greet() { … }</code>는 상자를 <b>만들어 둘</b> 뿐 — 이 줄만으론 아무 일도 안 난다. <code>greet()</code>처럼 <b>( )를 붙여 불러야</b> 안이 실행된다. <b>정의(1번)</b>와 <b>호출(N번)</b>은 다르다.</p>

      <h3 class="section-title">② 매개변수 vs 인수 — 빈 자리 vs 넣는 값</h3>
      <span class="learn-tag">📎 정의의 name = 매개변수(빈 자리) · 호출의 "민지" = 인수(실제 값). 자판기 버튼 vs 실제 동전</span>
      <div class="card">
        <div class="file-label">🔬 같은 상자, 넣는 값만 바꾸기</div>
        <div data-m="param"></div>
      </div>
      <ul class="section-list">
        <li><b>매개변수(parameter)</b> — 정의할 때 <code>function greet(<b>name</b>)</code>의 <b>name</b>. "값을 받을 빈 이름".</li>
        <li><b>인수(argument)</b> — 호출할 때 <code>greet(<b>"민지"</b>)</code>의 <b>"민지"</b>. "실제로 넣는 값". 이 값이 매개변수 name에 담긴다.</li>
      </ul>

      <h3 class="section-title">③ <code>return</code> — 값을 '돌려준다' (print와 다르다!)</h3>
      <span class="learn-tag">📎 return = 결과를 호출한 자리로 돌려줌(담아서 재사용) · print = 화면에 찍기만(못 담음)</span>
      <div class="card">
        <div class="file-label">🔬 돌려받아 담고, 또 쓰기</div>
        <div data-m="ret"></div>
      </div>
      <p class="section-desc">🔑 <code>return</code>이 있어야 <b>결과를 변수에 담거나 다른 계산에 쓸 수</b> 있다. <code>return</code>이 없으면 함수는 <code>undefined</code>를 돌려준다(돌려준 게 없으니까). <b><code>print</code>는 화면에 보여줄 뿐 값을 돌려주지 않는다</b> — 이 둘을 헷갈리면 안 된다.</p>

      <h3 class="section-title">④ 화살표 함수 — 짧게 쓰는 표기</h3>
      <span class="learn-tag">📎 (n) => n * 2 는 function (n) { return n * 2 } 의 짧은 표기 (한 줄이면 return 생략)</span>
      <div class="card">
        <div class="file-label">🔬 같은 함수, 두 가지 표기</div>
        <div data-m="arrow"></div>
      </div>

      <h3 class="section-title">⑤ 스코프 기초 — 함수 안 변수는 '지역'</h3>
      <span class="learn-tag">📎 함수 안에서 만든 변수는 그 함수 안에서만 산다(지역) · 밖에서 부르면 에러</span>
      <div class="card">
        <div class="file-label">🔬 지역 vs 전역 (밖에서 msg를 부르면?)</div>
        <div data-m="scope"></div>
      </div>
      <p class="section-desc">함수 안에서 <code>let</code>으로 만든 변수(<b>지역변수</b>)는 <b>함수가 끝나면 사라지고</b>, 밖에선 안 보인다. 함수 밖 변수(<b>전역변수</b>)는 어디서나 보인다. (자세힌 🧠 M2 스택에서 눈으로 — 프레임과 함께 생겼다 사라진다.)</p>

      <h3 class="section-title">⑥ 눈으로 — 부르면 '프레임'이 쌓였다 사라진다</h3>
      <span class="learn-tag">📎 호출 = 스택에 칸(프레임) push · 반환 = pop. 값은 값 메모리 셀로 (🧠 콜 스택 미리보기)</span>
      <div data-m="frame"></div>
      <p class="section-desc">함수를 부르면 그 함수만의 <b>작업 칸(프레임)</b>이 스택에 쌓이고, <code>return</code>하면 <b>통째로 사라진다</b>. 안의 지역변수도 함께. → 더 깊이는 <b>🧠 콜 스택</b>(함수의 삶과 죽음), 함수에 값을 <b>넘길 때</b> 원본이 안전한지는 <b>🧠 M5~M7</b>에서.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">함수는 <b>입력→처리→출력 상자</b>. <code>function 이름(매개변수){ return 값 }</code>로 정의, <code>이름(인수)</code>로 호출.
        <b>return은 돌려주기</b>(print는 찍기만), <b>함수 안 변수는 지역</b>. 내부 원리는 🧠 메모리 챕터로.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>단계별 실습</b>으로 — 정의·호출·인수·return을 손에 붙이자 (10문제).</span>
        <button class="chip on" data-goto="5-1">📝 5강 실습 시작 (5-1) →</button>
      </div>
    `

    root.querySelector('[data-m="def"]').append(Runner({
      showBox: false,
      code: [
        'function greet() {          // 정의: "greet라는 상자를 만든다"',
        '  return "안녕!"',
        '}',
        '',
        'print(greet())             // 호출: ( ) 를 붙여 실행 → "안녕!"',
        'print(greet())             // 몇 번이든 다시 부를 수 있다',
      ].join('\n'),
    }))

    root.querySelector('[data-m="param"]').append(Runner({
      showBox: false,
      code: [
        'function greet(name) {          // name = 매개변수(빈 자리)',
        '  return "안녕, " + name + " 님!"',
        '}',
        '',
        'print(greet("민지"))            // "민지" = 인수 → name에 담긴다',
        'print(greet("지훈"))            // 넣는 값만 바꾸면 결과가 바뀐다',
      ].join('\n'),
    }))

    root.querySelector('[data-m="ret"]').append(Runner({
      showBox: false,
      code: [
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
      ].join('\n'),
    }))

    root.querySelector('[data-m="arrow"]').append(Runner({
      showBox: false,
      code: [
        '// 두 표기는 완전히 같은 함수다',
        'function doubleA(n) { return n * 2 }   // 보통 표기',
        'const doubleB = (n) => n * 2           // 화살표(한 줄이면 return 생략)',
        '',
        'print(doubleA(10))   // 20',
        'print(doubleB(10))   // 20  (똑같다)',
      ].join('\n'),
    }))

    root.querySelector('[data-m="scope"]').append(Runner({
      showBox: false,
      code: [
        'let appName = "메모장"              // 전역 — 어디서나 보인다',
        '',
        'function makeMsg(user) {',
        '  let msg = user + " 님, " + appName + "에 오신 걸 환영해요"  // msg = 지역',
        '  return msg',
        '}',
        '',
        'print(makeMsg("민지"))             // OK — 함수가 msg를 만들어 돌려준다',
        '// print(msg)   // ❌ 여기선 msg가 안 보인다(지역이라) — 켜면 에러',
      ].join('\n'),
    }))

    root.querySelector('[data-m="frame"]').append(MemoryModel({
      title: 'add(3, 4) 호출 — 프레임이 쌓였다 사라진다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function add(a, b) {', '  return a + b', '}', 'let sum = add(3, 4)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }], heap: {},
          note: '<code>add(3, 4)</code>를 호출하려 한다. main의 sum은 아직 <b>반환을 기다린다</b>(대기).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }, { name: 'add', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '4' }] }], heap: {},
          note: 'add 프레임이 <b>push</b>된다. 인수 <b>3·4</b>가 매개변수 <b>a·b</b>에 담긴다. (값은 값 메모리 셀, 이름은 장부)' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'sum', value: '7' }] }], heap: {},
          note: '<code>return a + b</code>(=7)를 돌려주고 add 프레임은 <b>pop(사라짐)</b> — a·b도 함께. 반환값 7이 <b>sum</b>에 담긴다.' },
      ],
    }))

    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
  }

  // 유형 드릴 ×10 — 정의·호출·인수·return. 1-5 기본, 6-10 응용(스코프·화살표·조합).
  window.Practices[5] = {
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
