// 3강 · 조건 (if · 비교 · truthy/falsy · 삼항 · switch)  ── design-principles 규범으로 작성
// 오해: if는 true/false만 받는다?(아무 값이나—truthy/falsy) · = vs == vs === · "5"==5는 참?
//       switch는 새 문법?(if 여러 개의 정리본) · break 빠뜨리면 fall-through · case는 ===(엄격)
// 왜:  ===는 값+타입 비교(예측가능), ==는 형변환(함정) · truthy/falsy는 "있냐 없냐" 편의
// 대비: == vs === · falsy(0 "" null) vs truthy("0" [] {}) · =(대입) vs ==(비교) · break 유/무

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Lessons[4] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">4강</span>
        <h2>조건 — 갈림길</h2>
        <p>참(true)이냐 거짓(false)이냐에 따라 코드의 <b>길을 가른다</b>. 비교로 참·거짓을 만들고, <code>if</code>로 갈림길을, 삼항으로 한 줄 갈림길을 만든다. <b>조건 자리에 오는 값은 결국 <code>true</code>/<code>false</code> 딱 둘로 접힌다</b> — 이미 불리언이면 그대로, 아니면 <b>truthy/falsy 규칙</b>으로 정해진다(항상 그렇다). <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환 →</button></p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><b>비교</b>(<code>&gt; &lt; ===</code>)는 참/거짓을 만든다. <code>if</code>는 그 갈림길을 고른다.
        그리고 <code>if</code>는 true/false만이 아니라 <b>아무 값의 '있냐/없냐'(truthy/falsy)</b>로도 판단한다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/조건문" target="_blank" rel="noopener noreferrer">조건문 ↗</a> · <a href="https://ko.wikipedia.org/wiki/제어_흐름" target="_blank" rel="noopener noreferrer">제어 흐름 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 함정 — = 와 == 와 ===</div>
        <p class="section-desc" style="margin:0"><code>=</code>는 <b>대입</b>(이름표 붙이기), <code>==</code>는 <b>느슨한 비교</b>(타입을 맘대로 바꿔 비교 → 함정),
        <code>===</code>는 <b>엄격한 비교</b>(값+타입 둘 다). <code>"5" == 5</code>는 <b>참</b>이지만 <code>"5" === 5</code>는 <b>거짓</b>이다. → <b>항상 <code>===</code></b>를 써라.</p>
      </div>

      <h3 class="section-title">① 비교 — 참/거짓을 만든다</h3>
      <span class="learn-tag">📎 크다/작다/같은가? → true 아니면 false. 같음은 반드시 === (값+타입)</span>
      <div class="card">
        <div class="file-label">🔬 === 는 예측 가능, == 는 함정</div>
        <div data-m="cmp"></div>
      </div>
      <ul class="section-list">
        <li><code>&gt;</code> <code>&lt;</code> <code>&gt;=</code> <code>&lt;=</code> — 크기 비교. <code>===</code> 같음 · <code>!==</code> 다름.</li>
        <li><b><code>"5" === 5</code> → false</b> (글자 vs 숫자, 타입 다름). <b><code>"5" == 5</code> → true</b> (==가 타입을 바꿔 비교 = 함정).</li>
      </ul>

      <h3 class="section-title">② if / else — 갈림길을 고른다</h3>
      <span class="learn-tag">📎 만약 ~라면 이 길, 아니면 저 길. 값·화면 균형 — 점수를 등급 배지로</span>
      <div class="card">
        <div class="file-label">🔬 점수 → 등급 (값 + 화면 배지)</div>
        <div data-m="ifel"></div>
      </div>

      <h3 class="section-title">③ truthy / falsy — 값의 '있냐/없냐'</h3>
      <div data-m="qz"></div>
      <span class="learn-tag">📎 if는 true/false만 받는 게 아니다 — 아무 값이나. 있으면 통과, 없으면 막힘</span>
      <p class="section-desc"><b>문지기</b>라고 생각하라 — 뭔가 들고 있으면(truthy) 통과, 빈손이면(falsy) 막는다.
      그래서 <code>if (name)</code> 은 "이름이 <b>있으면</b>"이란 뜻이 된다.</p>
      <div class="card">
        <div class="file-label">📄 falsy — 자주 만나는 6개 (나머지는 전부 truthy)</div>
        <div class="falsy-grid">
          <div class="falsy-cell">false</div><div class="falsy-cell">0</div><div class="falsy-cell">"" <span>(빈 글자)</span></div>
          <div class="falsy-cell">null</div><div class="falsy-cell">undefined</div><div class="falsy-cell">NaN</div>
        </div>
        <p class="section-desc" style="margin:10px 0 0">⚠️ 함정 — 이건 전부 <b>truthy</b>(있는 것): <code>"0"</code>·<code>"false"</code>(글자!) · <code>[]</code>(빈 배열) · <code>{}</code>(빈 객체).</p>
        <p class="section-desc" style="margin:6px 0 0">정확히는 <code>-0</code>·<code>0n</code>(BigInt 0)을 더해 <b>딱 8개</b>가 falsy의 전부다. 규칙·형 변환 표는 <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>에 모아 뒀다.</p>
      </div>
      <div class="card">
        <div class="file-label">🔬 Boolean()로 참·거짓을 찍어 보기</div>
        <div data-m="tf"></div>
      </div>

      <h3 class="section-title">④ 삼항 — 한 줄 갈림길</h3>
      <span class="learn-tag">📎 조건 ? 참일때 : 거짓일때 — 실무에서 매우 자주 쓴다</span>
      <div class="card">
        <div class="file-label">🔬 나이 → 라벨 (한 줄로)</div>
        <div data-m="tern"></div>
      </div>

      <h3 class="section-title">⑤ switch — 값 하나로 여러 갈래</h3>
      <span class="learn-tag">📎 완전히 새 게 아니다 — "if 여러 개"를 값 하나로 고르는 정리본</span>
      <p class="section-desc"><b>요일 번호 → 안내 문구</b>, <b>등급 → 혜택</b>처럼 <b>값 하나</b>를 보고 여러 갈래 중 하나를 골라야 할 때가 많다.
      <code>if (day === 1) … else if (day === 2) … else if (day === 3) …</code>를 줄줄이 쓰는 대신,
      <code>switch</code>는 그 대조를 한 곳에 정리한다. 생김새만 먼저 —
      <code>switch (값) { case 값: 코드; break … default: 코드 }</code>.
      규칙은 아직 안 배웠다 — 아래 두 문제를 <b>감으로 예측</b>해 보라. <b>틀리라고 있는 문제다.</b></p>
      <div data-m="qz-sw1"></div>
      <div data-m="qz-sw2"></div>
      <p class="section-desc">🔗 <b>같은 실이다</b> — <code>switch (expr)</code>도 결국 <b>괄호 안 expr을 한 번 값으로 접은 뒤</b>,
      그 값을 각 <code>case</code> 값과 <b><code>===</code>(엄격 비교)</b>로 대조해 갈림길을 고른다.
      조건 자리가 표현식인 건 if와 똑같고 <button class="inline-goto" data-goto="3-6">3-6 · 조건도 표현식</button>,
      비교가 엄격해서 글자 <code>"3"</code>과 숫자 <code>3</code>이 다른 것도 ①비교와 같은 실이다
      <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>. 아래에서 그 대조 과정을 <b>한 단계씩</b> 밟아 보자.</p>
      <div class="card">
        <div class="file-label">⏱ 시간 시뮬레이션 — switch(day)가 갈래를 고르기까지</div>
        <div data-m="sw-red"></div>
      </div>
      <div class="card">
        <div class="file-label">🔬 요일 안내 — switch ↔ if는 같은 일 · break를 지우면?</div>
        <div data-m="sw-run"></div>
      </div>
      <div data-m="dr-sw"></div>

      <h3 class="section-title">⑥ 화면 — 조건에 따라 배지 색</h3>
      <span class="learn-tag">📎 눈으로 — 온도에 따라 배지 색을 바꾼다</span>
      <div class="card">
        <div class="file-label">🔬 온도 배지 (직접 숫자를 바꿔 실행)</div>
        <div data-m="badge"></div>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">비교(<b>===</b>)로 참/거짓을 만들고 <code>if</code>/삼항으로 길을 가른다.
        <code>if</code>는 <b>아무 값의 truthy/falsy</b>로도 판단한다 — falsy는 딱 6개(<code>false 0 "" null undefined NaN</code>), 나머지는 다 있는 것(truthy).</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>단계별 실습</b>으로 — 참·거짓을 직접 만들어 보자 (10문제).</span>
        <button class="chip on" data-goto="4:easy">📝 4강 실습 시작 (🟢 쉬움) →</button>
      </div>
    `

    root.querySelector('[data-m="cmp"]').append(Runner({
      showBox: false,
      code: [
        'print(10 > 5)      // true',
        'print(3 === 3)     // true  (값·타입 같음)',
        'print("5" === 5)   // false! 글자 vs 숫자 (타입 다름)',
        'print("5" == 5)    // true  — ==는 타입을 바꿔 비교 (함정!)',
        'print(0 == "")     // true  — == 함정',
      ].join('\n'),
    }))

    root.querySelector('[data-m="ifel"]').append(Runner({
      code: [
        'let score = 85',
        'let grade',
        'if (score >= 90)      { grade = "A" }',
        'else if (score >= 80) { grade = "B" }',
        'else                  { grade = "C" }',
        'print(grade)          // "B"',
        '',
        '// 화면 배지로',
        'box.textContent = grade',
        'box.style.cssText = "font-size:40px;font-weight:800;padding:20px 28px;color:white;border-radius:14px;background:#4D96FF"',
      ].join('\n'),
    }))

    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '<code>if ("0") { print("실행!") }</code> — <code>"0"</code>은 <b>따옴표 있는 글자</b>다. 실행될까?',
      options: ['실행된다 — 글자라 truthy', '안 된다 — 0이니까 falsy'],
      answer: 0,
      explain: 'falsy는 딱 <b>빈 글자 <code>""</code></b>뿐 — <code>"0"</code>은 <b>내용이 있는 글자</b>라 <b>truthy</b>! 숫자 <code>0</code>과 글자 <code>"0"</code>은 다르다. 이게 최대 함정.',
    }))
    root.querySelector('[data-m="tf"]').append(Runner({
      showBox: false,
      code: [
        'print(Boolean(0))       // false  (falsy)',
        'print(Boolean(""))      // false  (빈 글자)',
        'print(Boolean(null))    // false',
        'print(Boolean("0"))     // true!  글자 "0"은 있는 것',
        'print(Boolean([]))      // true!  빈 배열도 있는 것',
        '',
        '// 실전 — 있으면 통과',
        'let name = "민지"',
        'if (name) { print(name + "님 환영") }',
      ].join('\n'),
    }))

    root.querySelector('[data-m="tern"]').append(Runner({
      showBox: false,
      code: [
        'let age = 20',
        'let label = age >= 18 ? "성인" : "미성년"   // 조건 ? 참 : 거짓',
        'print(label)   // "성인"',
      ].join('\n'),
    }))

    // ⑤ switch — 🔮 예측(스포일러 전) → ⏱ step-through → 🔬 실행 → 🎯 드릴
    root.querySelector('[data-m="qz-sw1"]').append(Quiz({
      q: '<code>let n = 1</code> 일 때 — <code>switch (n) { case 1: print("A");  case 2: print("B"); break }</code>. case 1 뒤에 <b>break가 없다</b>. 무엇이 출력될까?',
      options: ['"A"만 — case 1만 맞았으니까', '"A" 그리고 "B" — 둘 다 나온다', '에러가 난다'],
      answer: 1,
      explain: 'switch는 <b>맞은 case부터 break를 만날 때까지</b> 실행한다. break가 없으면 <b>아래 case 코드로 줄줄 샌다(fall-through)</b> — case 2와 비교도 안 하고 그냥 실행! 그래서 "A" "B" 둘 다. 이게 switch 최대 함정 — <b>case마다 break</b>가 기본이다.',
    }))
    root.querySelector('[data-m="qz-sw2"]').append(Quiz({
      q: '<code>let x = "3"</code> (따옴표 있는 <b>글자</b>) 일 때 — <code>switch (x) { case 3: print("숫자!"); break;  default: print("몰라요") }</code>. 무엇이 출력될까?',
      options: ['"숫자!" — 3이니까 맞는다', '"몰라요" — 글자 "3"과 숫자 3은 다르다'],
      answer: 1,
      explain: 'case의 대조는 <b>===(엄격 비교)</b>다 — <code>"3" === 3</code>은 <b>거짓</b>(글자 vs 숫자). ①비교의 <code>"5" === 5</code>와 같은 실! switch엔 느슨한(<code>==</code>) 버전이 아예 없다 — <b>타입까지 맞아야</b> 갈래가 열리고, 아무것도 안 맞으면 <b>default</b>가 잡는다.',
    }))

    root.querySelector('[data-m="sw-red"]').append(ExprReduce({
      title: 'switch(day) — day에 2가 들어 있을 때, 갈래가 열리기까지',
      steps: [
        {
          code: 'switch ( day ) {\n  case 1: print("월요일"); break\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: '( day )',
          note: '괄호 안은 <b>표현식</b> — if와 똑같이 <b>먼저 한 번 값으로 접는다</b>. (지금 day에는 2가 들어 있다)',
        },
        {
          code: 'switch ( 2 ) {\n  case 1: print("월요일"); break\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: '( 2 )',
          note: 'day → <b>2</b>. 이제 이 값 <b>하나</b>를 들고 <b>위에서부터 차례로</b> case 값과 <b>=== (엄격 비교)</b>로 대조한다.',
        },
        {
          code: 'switch ( 2 ) {\n  case 1: print("월요일"); break\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: 'case 1:',
          note: '<code>2 === 1</code> → <b style="color:var(--red)">거짓</b> — 이 갈래는 닫힌 채 통과. 다음 case로.',
        },
        {
          code: 'switch ( 2 ) {\n  case 1: ✗ 거짓 — 통과\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: 'case 2:',
          note: '<code>2 === 2</code> → <b style="color:var(--green)">참</b> — 이 갈래가 열린다!',
        },
        {
          code: 'switch ( 2 ) {\n  case 1: ✗ 거짓 — 통과\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: 'print("화요일")',
          note: '열린 case의 코드가 실행된다 → 화면에 <b>"화요일"</b>.',
        },
        {
          code: 'switch ( 2 ) {\n  case 1: ✗ 거짓 — 통과\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: 'break',
          note: '<b>break = 탈출</b> — 여기서 switch 전체를 빠져나온다. ⚠️ break가 없으면 <b>아래 case 코드로 줄줄 샌다(fall-through)</b> — 비교도 없이! (아까 🔮 1번 문제가 바로 이것)',
        },
        {
          code: 'switch ( 2 ) {\n  case 1: ✗ 거짓 — 통과\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: 'default:',
          note: '만약 day가 9였다면? — 1·2·3 전부 <b style="color:var(--red)">거짓</b> → <b>default</b>("그 외 전부")가 잡는다. if의 마지막 <code>else</code>와 같은 안전망이다.',
        },
        {
          code: '→ "화요일" 출력, switch 끝.',
          note: '정리 — ① 괄호 안 expr을 <b>값으로 접고</b> ② 위에서부터 case와 <b>===</b> ③ 맞으면 실행 ④ <b>break로 탈출</b>. <code>if (day === 1) … else if (day === 2) …</code>와 <b>완전히 같은 일</b>이다.',
        },
      ],
    }))

    root.querySelector('[data-m="sw-run"]').append(Runner({
      showBox: false,
      code: [
        'let day = 2',
        'switch (day) {',
        '  case 1: print("월요일"); break',
        '  case 2: print("화요일"); break',
        '  case 3: print("수요일"); break',
        '  default: print("그 외의 날")   // 아무 case도 안 맞을 때',
        '}',
        '',
        '// ↕ 완전히 같은 일 — switch는 이 if 사다리의 "정리본"일 뿐',
        'if (day === 1)      { print("월요일") }',
        'else if (day === 2) { print("화요일") }',
        'else if (day === 3) { print("수요일") }',
        'else                { print("그 외의 날") }',
        '',
        '// ⚠️ break를 지우면? — 멈추지 못하고 아래로 줄줄 샌다 (fall-through)',
        'switch (day) {',
        '  case 2: print("화")      // ← break 없음!',
        '  case 3: print("수")      // ← 비교도 없이 그냥 실행됨',
        '  default: print("그 외")  // ← 여기까지 줄줄',
        '}',
      ].join('\n'),
    }))

    root.querySelector('[data-m="dr-sw"]').append(Drill({
      pattern: '빈칸에 예측값을 넣어라 — 맞으면 true. (글자 답은 따옴표까지: "월")',
      problems: [
        {
          ask: 'day가 3이다. switch가 msg에 무엇을 담을까?',
          code: 'let day = 3, msg\nswitch (day) {\n  case 1: msg = "월"; break\n  case 2: msg = "화"; break\n  case 3: msg = "수"; break\n  default: msg = "?"\n}\nprint((msg) === ____)',
          expect: 'true',
          answer: '"수"',
          hint: 'day의 값 3을 위에서부터 case 값들과 === 대조 — 맞는 갈래의 코드만 실행된다.',
        },
        {
          ask: 'day가 9다 — 어떤 case와도 안 맞는다. msg는?',
          code: 'let day = 9, msg\nswitch (day) {\n  case 1: msg = "월"; break\n  case 2: msg = "화"; break\n  case 3: msg = "수"; break\n  default: msg = "?"\n}\nprint((msg) === ____)',
          expect: 'true',
          answer: '"?"',
          hint: '아무 case도 안 맞으면 default가 잡는다 — if의 마지막 else와 같다.',
        },
        {
          ask: 'case 1에 break가 없다! day가 1일 때 msg의 최종 값은?',
          code: 'let day = 1, msg\nswitch (day) {\n  case 1: msg = "월"\n  case 2: msg = "화"; break\n  case 3: msg = "수"; break\n}\nprint((msg) === ____)',
          expect: 'true',
          answer: '"화"',
          hint: 'break가 없으면 다음 case 코드까지 줄줄 실행된다(fall-through) — msg가 덮어써진다.',
        },
        {
          ask: 'day가 글자 "2"다(따옴표!). 숫자 case 2와 맞을까? msg는?',
          code: 'let day = "2", msg\nswitch (day) {\n  case 2: msg = "화"; break\n  default: msg = "안 맞음"\n}\nprint((msg) === ____)',
          expect: 'true',
          answer: '"안 맞음"',
          hint: 'case는 ===(엄격) — "2" === 2 는 거짓. 글자와 숫자는 다르다.',
        },
      ],
    }))

    root.querySelector('[data-m="badge"]').append(Runner({
      code: [
        'let temp = 32',
        'let color = temp >= 30 ? "#FF6B6B" : "#4D96FF"   // 더우면 빨강, 아니면 파랑',
        'box.textContent = temp + "°C"',
        'box.style.cssText = "padding:20px 28px;font-size:30px;font-weight:800;color:white;border-radius:14px;background:" + color',
      ].join('\n'),
    }))

    root.querySelectorAll('[data-goto]').forEach((el) => {
      el.onclick = () => { const t = el.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
    })
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
