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
      <div class="card">
        <div class="file-label">⏱ 단계 추적 — <code>"5" == 5</code> 는 왜 true? (다음 ▶)</div>
        <div data-m="red-cmp"></div>
      </div>
      <p class="section-desc">🔎 <b>애초에 왜 <code>"5" == 5</code>가 참/거짓 값으로 바뀌나?</b> — 비교식도 <b>표현식</b>이라, 조건 자리에서 먼저 <b>하나의 값(참/거짓)으로 접힌다</b>(3강: "식은 값을 낳는다" <button class="inline-goto" data-goto="3-1">3-1 · 식 vs 문</button>). 그 접히는 도중 <code>==</code>가 <b>타입을 맞추는 규칙</b>이 형 변환이다 <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>. 📚 위키: <a href="https://ko.wikipedia.org/wiki/관계_연산자" target="_blank" rel="noopener noreferrer">비교 연산자 ↗</a> · <a href="https://ko.wikipedia.org/wiki/형_변환" target="_blank" rel="noopener noreferrer">형 변환 ↗</a></p>
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
      <div class="card">
        <div class="file-label">⏱ 단계 추적 — if 사다리가 갈래를 고르기까지 (score = 85, 다음 ▶)</div>
        <pre class="err-code" style="color:inherit;background:transparent">let score = 85
if (score >= 90)      { grade = "A" }
else if (score >= 80) { grade = "B" }
else if (score >= 70) { grade = "C" }
else                  { grade = "F" }</pre>
        <div data-m="red-if"></div>
      </div>

      <h3 class="section-title">③ truthy / falsy — 값의 '있냐/없냐'</h3>
      <div data-m="qz"></div>
      <div data-m="qz2"></div>
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
      <div class="card">
        <div class="file-label">⏱ 단계 추적 — <code>if ("0")</code>은 왜 실행되나 (다음 ▶)</div>
        <div data-m="red-tf"></div>
      </div>
      <div class="card" style="border-color:var(--red)">
        <div class="file-label">⏱ 단계 추적 — 🤯 <code>if ("0" - 0)</code>은 왜 <b>반대로</b> 안 되나 (다음 ▶)</div>
        <div data-m="red-tf2"></div>
      </div>

      <h3 class="section-title">④ 삼항 — 한 줄 갈림길</h3>
      <span class="learn-tag">📎 조건 ? 참일때 : 거짓일때 — 실무에서 매우 자주 쓴다</span>
      <div class="card">
        <div class="file-label">🔬 나이 → 라벨 (한 줄로)</div>
        <div data-m="tern"></div>
      </div>
      <div class="card">
        <div class="file-label">⏱ 단계 추적 — 삼항이 값으로 접힌다 (age = 20, 다음 ▶)</div>
        <div data-m="red-tern"></div>
      </div>

      <h3 class="section-title">⑤ switch — 값 하나로 여러 갈래</h3>
      <span class="learn-tag">📎 완전히 새 게 아니다 — "if 여러 개"를 값 하나로 고르는 정리본</span>
      <p class="section-desc"><b>요일 번호 → 안내 문구</b>, <b>등급 → 혜택</b>처럼 <b>값 하나</b>를 보고 여러 갈래 중 하나를 골라야 할 때가 많다.
      <code>if (day === 1)</code> · <code>else if (day === 2)</code> · <code>else if (day === 3)</code> …를 줄줄이 쓰는 대신, <code>switch</code>는 그 대조를 <b>한 곳에</b> 정리한다. 생김새만 먼저 —</p>
      <pre class="err-code" style="color:inherit;background:transparent">switch (값) {
  case A:  코드; break
  case B:  코드; break
  default: 코드
}</pre>
      <p class="section-desc">규칙은 아직 안 배웠다 — 아래 두 문제를 <b>감으로 예측</b>해 보라. <b>틀리라고 있는 문제다.</b></p>
      <div data-m="qz-sw1"></div>
      <div data-m="qz-sw2"></div>
      <p class="section-desc">🔗 <b>같은 실이다</b> — <code>switch (expr)</code>도 결국 <b>괄호 안 expr을 한 번 값으로 접은 뒤</b>,
      그 값을 각 <code>case</code> 값과 <b><code>===</code>(엄격 비교)</b>로 대조해 갈림길을 고른다.
      조건 자리가 표현식인 건 if와 똑같고 <button class="inline-goto" data-goto="3-6">3-6 · 조건도 표현식</button>,
      비교가 엄격해서 글자 <code>"3"</code>과 숫자 <code>3</code>이 다른 것도 ①비교와 같은 실이다
      <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>. 아래에서 그 대조 과정을 <b>한 단계씩</b> 밟아 보자.</p>
      <div class="card">
        <div class="file-label">⏱ 시간 시뮬레이션 ① — <code>const day = 2</code> (case에 맞을 때 · 다음 ▶)</div>
        <div data-m="sw-red"></div>
      </div>
      <div class="card" style="border-color:var(--red)">
        <div class="file-label">⏱ 시간 시뮬레이션 ② — <code>const day = 0</code> (아무 case도 안 맞음 → default · 다음 ▶)</div>
        <div data-m="sw-red2"></div>
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
        <code>if</code>는 <b>아무 값의 truthy/falsy</b>로도 판단한다 — falsy는 자주 만나는 6개(<code>false 0 "" null undefined NaN</code>), 정식 8개는 <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>, 나머지는 다 있는 것(truthy).</p>
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

    // ⏱ 각 예시코드를 '다음 ▶'로 한 단계씩 추적 — ExprReduce 재사용(위젯 수정 없이).
    root.querySelector('[data-m="red-cmp"]').append(ExprReduce({
      title: '"5" == 5   (== 는 타입을 맞춰 강제 — 함정)',
      steps: [
        { code: '"5" == 5', mark: '"5" == 5', note: '비교식도 <b>표현식</b> — 먼저 <b>하나의 값으로 접힌다</b>(3강). 그 도중 <code>==</code>는 <b>타입이 다르면 맞춰서 강제</b>한다(함정): 문자열 "5"를 숫자로.' },
        { code: '5 == 5', mark: '5 == 5', note: '이제 <b>5 == 5</b> — 같은 숫자끼리.' },
        { code: 'true', note: '→ <b>true</b>. 그래서 <code>"5" == 5</code>는 참. 만약 <code>"5" === 5</code>였다면 <b>타입이 달라</b> 볼 것도 없이 <b style="color:var(--red)">false</b> — <code>===</code>는 강제를 안 한다. <b>그래서 항상 ===.</b>' },
      ],
    }))
    root.querySelector('[data-m="red-if"]').append(ExprReduce({
      title: 'score = 85 — 위 사다리는 어느 갈래를 고를까?',
      steps: [
        { code: 'if ( 85 >= 90 )', mark: '85 >= 90', note: 'score(85)를 넣고 <b>맨 위 조건부터</b>. <b>85 >= 90</b>?' },
        { code: 'if ( false )', note: '<b style="color:var(--red)">false</b> → 이 갈래(<code>"A"</code>)는 건너뛰고 <b>else if</b>로.' },
        { code: 'else if ( 85 >= 80 )', mark: '85 >= 80', note: '다음 조건. <b>85 >= 80</b>?' },
        { code: 'else if ( true )', note: '<b style="color:var(--green)">true</b> → 이 갈래 실행 → grade = <b>"B"</b>. 뒤 <code>else</code>는 <b>안 본다</b>.' },
        { code: 'grade = "B"', note: 'if 사다리는 <b>위에서부터 참인 첫 갈래</b>만 실행하고 멈춘다.' },
      ],
    }))
    root.querySelector('[data-m="red-tf"]').append(ExprReduce({
      title: 'if ("0") { … }   ("0"은 따옴표 있는 글자)',
      steps: [
        { code: 'if ( "0" )', mark: '"0"', note: '조건 자리에 값 <code>"0"</code>(빈 문자열이 아닌 <b>글자</b>)이 왔다. 불리언이 아니면 <b>truthy/falsy</b>로 본다.' },
        { code: 'if ( truthy )', note: 'falsy는 빈 문자열 <code>""</code>뿐 — <code>"0"</code>은 <b>글자가 있으니</b> <b style="color:var(--green)">✅ truthy</b>. (숫자 0과 헷갈리지 말 것)' },
        { code: '✅ 참  →  실행', note: '그래서 <code>if("0")</code>은 <b>실행된다</b>. falsy 8개가 아니면 전부 truthy.' },
      ],
    }))
    root.querySelector('[data-m="red-tf2"]').append(ExprReduce({
      title: 'if ("0" - 0) { … }   — 한 줄에 숨은 변환이 두 번!',
      steps: [
        { code: 'if ( "0" - 0 )', mark: '"0" - 0', note: '<code>if</code>는 문이지만 괄호 안 <code>"0" - 0</code>은 <b>표현식</b> — 참/거짓을 보기 <b>전에 먼저 하나의 값으로 접힌다</b>. 그런데 왼쪽 <code>"0"</code>은 <b>따옴표 있는 문자열(글자)</b>, 오른쪽 <code>0</code>은 <b>숫자</b> — <b>타입이 서로 다르다</b>.' },
        { code: 'if ( 숫자("0") - 0 )', mark: '숫자("0")', note: '① <b>첫 번째 숨은 변환</b>. 뺄셈 <code>-</code>는 <b>숫자끼리만</b> 할 수 있다 → JS가 문자열 <code>"0"</code>을 <b>몰래 숫자로 바꾼다</b>(<b>암묵적 형 변환 = 캐스팅/coercion</b>, 안에서 <code>Number("0")</code>을 부르는 셈). 눈엔 안 보이지만 반드시 일어난다.' },
        { code: 'if ( 0 - 0 )', mark: '0 - 0', note: '그 변환(<code>숫자("0")</code>, 실제 함수명은 <code>Number</code>)의 결과는 <b>숫자 0</b> — 글자 "0"이 아니라 진짜 숫자다. 이제 <b>둘 다 숫자</b>가 됐으니 진짜 뺄셈 <code>0 - 0</code>을 한다.' },
        { code: 'if ( 0 )', mark: '0', note: '<code>0 - 0</code> = <b>0</b>(숫자). 조건이 <b>하나의 값</b>으로 다 접혔다. 여기까지가 "표현식이 값이 되는" 단계.' },
        { code: 'if ( 0 → ❌거짓 )', mark: '0', note: '② <b>두 번째 숨은 변환</b>. 조건 자리에선 값을 <b>참/거짓으로</b> 봐야 한다(불리언화 = ToBoolean). 그런데 숫자 <b>0은 falsy 8개</b>(<code>false 0 -0 0n "" null undefined NaN</code>) 중 하나 → <b style="color:var(--red)">거짓</b>. (형 변환 규칙은 ③ 위의 📐 참·거짓과 형 변환 참고)' },
        { code: '❌ 거짓  →  몸통 안 실행', note: '그래서 <code>print("실행!")</code>은 <b>안 돈다</b>. <code>if("0")</code>는 글자 그대로 truthy라 <b>실행됐는데</b>, <code>- 0</code> 하나가 먼저 <b>숫자 0으로 접어</b> falsy로 뒤집은 것. <b>한 줄에 숨은 변환이 두 번</b> — ① 숫자화(뺄셈용) → ② 불리언화(조건용). 겉모습(<code>"0"</code>)이 아니라 <b>접힌 값</b>이 truthy/falsy를 정한다.' },
      ],
    }))
    root.querySelector('[data-m="red-tern"]').append(ExprReduce({
      title: 'age >= 18 ? "성인" : "미성년"   // age = 20',
      steps: [
        { code: '20 >= 18 ? "성인" : "미성년"', mark: '20 >= 18', note: 'age(20)를 넣고 <b>조건부터</b> 접는다(삼항도 조건이 먼저).' },
        { code: 'true ? "성인" : "미성년"', mark: 'true ? "성인" : "미성년"', note: '<b>20 >= 18 = true</b> → 삼항은 조건이 참이면 <b>? 뒤(참일 때)</b>를 고른다.' },
        { code: '"성인"', note: '→ <b>"성인"</b>. <code>"미성년"</code>은 버린다. 삼항은 <b>값을 낳는 표현식</b>(3강)이라 <code>let label = …</code>로 담긴다.' },
      ],
    }))

    root.querySelector('[data-m="ifel"]').append(Runner({
      code: [
        'let score = 85',
        'let grade                          // 아직 빈 이름표 (undefined)',
        'if (score >= 90)      { grade = "A" }   // 90 이상이면 A',
        'else if (score >= 80) { grade = "B" }   // 아니고 80 이상이면 B  ← 85는 여기서 멈춘다',
        'else                  { grade = "C" }   // 위가 다 거짓이면 C',
        'print(grade)          // "B"  (위에서부터 참인 첫 갈래만)',
        '',
        '// ─ 화면 배지로: 계산한 grade를 box에 그린다 ─',
        'box.textContent = grade            // ① 글자를 넣고',
        'box.style.cssText = "font-size:40px;font-weight:800;padding:20px 28px;color:white;border-radius:14px;background:#4D96FF"   // ② 색·크기 스타일을 입힌다',
      ].join('\n'),
    }))

    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '<code>if ("0") { print("실행!") }</code> — <code>"0"</code>은 <b>따옴표 있는 글자</b>다. 실행될까?',
      options: ['실행된다 — 글자라 truthy', '안 된다 — 0이니까 falsy'],
      answer: 0,
      explain: 'falsy는 딱 <b>빈 글자 <code>""</code></b>뿐 — <code>"0"</code>은 <b>내용이 있는 글자</b>라 <b>truthy</b>! 숫자 <code>0</code>과 글자 <code>"0"</code>은 다르다. 이게 최대 함정.',
    }))
    root.querySelector('[data-m="qz2"]').append(Quiz({
      q: '🤯 이번엔 <code>if ("0" - 0) { print("실행!") }</code> — 겉은 쌍둥이다. 이건 실행될까?',
      options: ['실행된다 — 아까처럼 <code>"0"</code>이니까', '안 된다 — <code>"0" - 0</code>이 먼저 <code>0</code>으로 접혀 falsy'],
      answer: 1,
      explain: '함정! 괄호 안은 <b>표현식</b>이라 truthy/falsy를 보기 <b>전에 먼저 접힌다</b>: <code>-</code>가 <code>"0"</code>을 숫자로 강제 → <code>0 - 0 = 0</code> → <b>0은 falsy</b> → <b>안 실행</b>. 아까 <code>if("0")</code>은 글자 그대로라 truthy였는데, <code>- 0</code> 하나가 결과를 뒤집는다. <b>조건은 늘 먼저 값으로 접힌 뒤 truthy/falsy.</b>',
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
      q: '<code>let n = 1</code> 일 때, <b>case 1 뒤에 <span style="color:var(--red)">break가 없다</span></b> — 무엇이 출력될까?<pre class="err-code" style="color:inherit;background:transparent">switch (n) {\n  case 1: print("A")   // ← break 없음!\n  case 2: print("B"); break\n}</pre>',
      options: ['"A"만 — case 1만 맞았으니까', '"A" 그리고 "B" — 둘 다 나온다', '에러가 난다'],
      answer: 1,
      explain: 'switch는 <b>맞은 case부터 break를 만날 때까지</b> 실행한다. break가 없으면 <b>아래 case 코드로 줄줄 샌다(fall-through)</b> — case 2와 비교도 안 하고 그냥 실행! 그래서 "A" "B" 둘 다. 이게 switch 최대 함정 — <b>case마다 break</b>가 기본이다.',
    }))
    root.querySelector('[data-m="qz-sw2"]').append(Quiz({
      q: '<code>let x = "3"</code> (따옴표 있는 <b>글자</b>) 일 때 — 무엇이 출력될까?<pre class="err-code" style="color:inherit;background:transparent">switch (x) {\n  case 3:  print("숫자!"); break\n  default: print("몰라요")\n}</pre>',
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
          code: '→ "화요일" 출력, switch 끝.',
          note: '정리 — ① 괄호 안 expr을 <b>값으로 접고</b> ② 위에서부터 case와 <b>===</b> ③ 맞으면 실행 ④ <b>break로 탈출</b>. <code>if (day === 1) … else if (day === 2) …</code>와 <b>완전히 같은 일</b>이다. (아무 case도 안 맞으면? → 바로 아래 <b>②(day=0)</b>에서 <code>default</code>가 잡는 걸 직접 본다)',
        },
      ],
    }))
    root.querySelector('[data-m="sw-red2"]').append(ExprReduce({
      title: 'switch(day) — day에 0이 들어 있을 때 (아무 case도 안 맞는다)',
      steps: [
        {
          code: 'switch ( day ) {\n  case 1: print("월요일"); break\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: '( day )',
          note: '이번엔 <code>const day = 0</code>. 똑같이 괄호 안을 <b>먼저 값으로 접는다</b>.',
        },
        {
          code: 'switch ( 0 ) {\n  case 1: print("월요일"); break\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: '( 0 )',
          note: 'day → <b>0</b>. 이 값 하나를 들고 <b>위에서부터</b> case와 <b>=== 대조</b>.',
        },
        {
          code: 'switch ( 0 ) {\n  case 1: print("월요일"); break\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: 'case 1:',
          note: '<code>0 === 1</code> → <b style="color:var(--red)">거짓</b> — 통과.',
        },
        {
          code: 'switch ( 0 ) {\n  case 1: ✗ 거짓 — 통과\n  case 2: print("화요일"); break\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: 'case 2:',
          note: '<code>0 === 2</code> → <b style="color:var(--red)">거짓</b> — 통과.',
        },
        {
          code: 'switch ( 0 ) {\n  case 1: ✗ 거짓 — 통과\n  case 2: ✗ 거짓 — 통과\n  case 3: print("수요일"); break\n  default: print("그 외")\n}',
          mark: 'case 3:',
          note: '<code>0 === 3</code> → <b style="color:var(--red)">거짓</b> — 통과. <b>case가 다 떨어졌다!</b>',
        },
        {
          code: 'switch ( 0 ) {\n  case 1: ✗ 거짓 — 통과\n  case 2: ✗ 거짓 — 통과\n  case 3: ✗ 거짓 — 통과\n  default: print("그 외")\n}',
          mark: 'default:',
          note: '1·2·3 <b>전부 거짓</b> → <b style="color:var(--green)">default</b>가 잡는다 — 아무 case도 안 맞을 때의 <b>안전망</b>(if의 마지막 <code>else</code>와 같다).',
        },
        {
          code: '→ "그 외" 출력, switch 끝.',
          note: '맞는 case가 없으면 <b>default</b>. 만약 default<b>도</b> 없었다면? — <b>아무것도 안 하고</b> switch를 조용히 빠져나간다(에러 아님). 그래서 default를 두면 "예상 못 한 값"을 놓치지 않는다.',
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
