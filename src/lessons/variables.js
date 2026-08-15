// 1강 · 변수 — 값에 이름 붙이기
// 완전 처음이라 가정. 'Figma 컬러 스타일 이름'·'연락처 이름 저장' 같은 일상 비유로 연다.
// window.Lessons[1] 에 render 함수를 등록한다. (app.js가 불러 화면에 그린다)

;(function () {
  window.Lessons = window.Lessons || {}
  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills['1'].

  window.Lessons[1] = function render(root) {
    // ── 산문(정적 HTML). 위젯이 들어갈 자리는 data-m 으로 표시해 두고 아래에서 주입한다. ──
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">1강</span>
        <h2>값과 타입, 그리고 변수</h2>
        <p>프로그램이 다루는 재료가 <b>값</b>이고, 값엔 <b>타입(종류)</b>이 있다. 그리고 값에 <b>이름표(변수)</b>를 달아 부른다 — 코딩의 가장 기본 벽돌 셋.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><b>값(value)</b>은 다뤄지는 데이터 하나 — <code>3</code>, <code>"안녕"</code>, <code>true</code>.
        <b> 변수(variable)</b>는 그 값에 붙이는 <b>이름표</b>다. <code>let</code>으로 만들고, <code>=</code>로
        이름표를 값에 <b>붙인다</b>. 이름을 부르면 그 값이 나온다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/변수_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">변수 ↗</a> · <a href="https://ko.wikipedia.org/wiki/상수_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">상수 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 중요한 오해 — 변수는 '밥통'이 아니다</div>
        <p class="section-desc" style="margin:0">변수를 "값을 담아 가둬 두는 <b>그릇·밥통</b>"으로 여기면 나중에 <b>참조·별칭·불변</b>에서 전부 무너진다.
        변수는 <b>값을 가리키는 이름표</b>다 — 값은 메모리에 있고, 변수는 그걸 <b>가진다/가리킨다</b>. 즉 <b>이름표(변수) ≠ 값(데이터)</b>. (🧠 메모리 기초에서 이 경계를 눈으로 확인한다.)</p>
      </div>

      <h3 class="section-title">① 값과 타입 — 재료엔 '종류'가 있다</h3>
      <span class="learn-tag">📎 값은 세 가지부터 — 숫자 · 글자(문자열) · 참/거짓</span>
      <p class="section-desc">프로그램이 다루는 재료가 <b>값</b>이다. 지금은 세 종류만 알면 된다.
      아래 <b>▶ 실행</b>을 누르면 <code>print(...)</code>가 값을 글로 찍어 준다.</p>
      <div class="card">
        <div class="file-label">🔬 값 세 가지를 찍어 보기</div>
        <div data-m="v1"></div>
      </div>
      <ul class="section-list">
        <li><b>숫자</b> — <code>3</code>, <code>100</code>, <code>3.5</code>. 따옴표 없이 그냥 쓴다.</li>
        <li><b>문자열</b>(글자) — <code>"안녕"</code>처럼 <b>따옴표로 감싼다</b>. 그래서 값 칸에 <code>"3"</code>과 <code>3</code>이 다르게 보인다.</li>
        <li><b>참/거짓</b> — <code>true</code>(참) 또는 <code>false</code>(거짓). 조건을 다룰 때 쓴다(뒤 강의).</li>
      </ul>

      <div class="concept">
        <p class="concept-lead">🧩 값엔 '타입(종류)'이 있다 — 크게 두 부류</p>
        <p class="section-desc" style="margin-top:0">값의 종류를 <b>타입(type)</b>이라 한다. 종류가 많아 보여도 <b>딱 두 부류</b>로 갈리고, 이 갈림이 <b>뒤 강의 전부</b>(메모리·복제·참조)를 좌우한다.</p>
        <ul class="section-list">
          <li><b>원시 타입 — '값 하나'</b>: <code>숫자</code> · <code>문자열</code> · <code>참거짓</code> · <code>null</code>(비었음을 일부러) · <code>undefined</code>(아직 없음). 작고 <b>불변</b>이라, 대입하면 <b>각자 복제</b>(독립).</li>
          <li><b>객체 타입 — '여러 값을 묶은 것'</b>: <code>객체 {}</code> · <code>배열 []</code> 등. <b>가변</b>이라, 대입하면 <b>같은 걸 공유(참조)</b>. (뒤 M4에서 정면으로)</li>
        </ul>
        <p class="section-desc" style="margin:6px 0 0">🔍 <code>typeof</code>로 확인 — <code>typeof 3</code>→"number", <code>typeof "hi"</code>→"string", <code>typeof true</code>→"boolean", <code>typeof {}</code>→"object".
        <br><b>핵심 훅</b>: <b>원시 = 값 하나 / 객체 = 묶음</b>. 이 한 줄이 힙(M3)·복제vs참조(M4)·GC의 씨앗이다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.8">💡 심화(지금은 몰라도 됨): 원시는 정확힌 7종(<code>symbol</code>·<code>bigint</code> 포함) · JS의 <code>===</code>는 <b>값</b>을 비교(참조 아님) · 문자열 메서드(<code>.length</code>)는 <b>오토박싱</b>(잠깐 래퍼 객체)으로 동작 · <b>Java와 달리 JS 문자열은 객체가 아니라 원시</b>다. <a href="https://ko.wikipedia.org/wiki/자료형" target="_blank" rel="noopener noreferrer">자료형 ↗</a></p>
      </div>

      <div class="card">
        <div class="file-label">🔬 typeof — 값의 타입 이름을 확인하는 내장 기능</div>
        <div data-m="typeof"></div>
      </div>
      <p class="section-desc"><code>typeof 값</code>은 그 값의 <b>타입 이름</b>을 문자열로 돌려준다(실습에서 자주 만난다). <code>typeof</code>·<code>sort</code>·<code>Object.keys</code> 같은 <b>이미 만들어진 도구</b>는 <button class="inline-goto" data-goto="builtins">📚 내장 기능 레퍼런스</button>에 한곳에 모아 뒀다.</p>

      <div data-m="qz1"></div>

      <h3 class="section-title">② 변수 = 값에 붙이는 '이름표'</h3>
      <span class="learn-tag">📎 Figma의 '컬러 스타일 이름'처럼 — 값 대신 이름을 부른다</span>
      <p class="section-desc">디자인 툴을 써봤다면 이미 익숙하다 — Figma에서 <code>#3B82F6</code>을 매번 쓰지 않고 <b>Primary</b>라는
      스타일 이름을 붙여 두는 것, 그게 바로 변수다. (연락처에 번호 대신 <b>이름</b>을 저장하는 것도 똑같은 원리.) 코드에선 <code>let 이름 = 값</code>으로 만든다.</p>
      <div class="card">
        <div class="file-label">🔬 이름을 만들고, 값으로도 화면으로도 꺼내 보기</div>
        <div data-m="v2"></div>
      </div>
      <p class="section-desc">핵심은 <b>한 번 이름표를 달면, 그다음부턴 이름만 부른다</b>는 것. 위에서 <code>primary</code>를
      값 칸과 화면 배경 <b>두 곳</b>에 썼다. 색을 바꾸고 싶으면 맨 윗줄 하나만 고치면 된다 — 직접 바꿔서 다시 실행해 보라.</p>
      <div class="card">
        <div class="file-label">🧠 메모리 그림 — 이름표가 값을 가리킨다 (밥통 아님!)</div>
        <div data-m="mem"></div>
      </div>

      <h3 class="section-title">③ <code>=</code> 는 '같다'가 아니라 '이 이름으로 가리켜라'</h3>
      <span class="learn-tag">📎 수학의 = 와 다르다 — 왼쪽 이름표를 오른쪽 값에 붙이라는 '동작'</span>
      <div class="card">
        <div class="file-label">📄 읽는 법</div>
        <pre class="err-code">let score = 10
  │     │      └─ 가리킬 값 (오른쪽)
  │     └─ 이름표
  └─ "새 이름표를 만든다"는 신호

읽기: "score 라는 이름표를 10에 붙여라(10을 가리켜라)"  (10 = score 아님!)</pre>
      </div>
      <div class="card">
        <div class="file-label">🔬 붙이고 → 옮겨 붙이기</div>
        <div data-m="v3"></div>
      </div>
      <ul class="section-list">
        <li>처음 만들 때만 <code>let</code>을 붙인다. 다시 가리킬 땐 <code>score = 25</code>처럼 이름만.</li>
        <li><b>이름을 부르면 '지금 가리키는 값'</b>이 나온다 — 마지막으로 붙인 값.</li>
      </ul>

      <h3 class="section-title">④ 바꾸면 안 되는 값 — <code>const</code></h3>
      <span class="learn-tag">📎 const = 이름 칸에 '다시 담기(재할당)' 금지 — 원시값이면 값을, 객체면 가리키는 포인터를 고정</span>
      <p class="section-desc">한 번 정하면 안 바뀔 값(예: 세율, 로고 색)은 <code>const</code>로 만든다. const가 막는 건 <b>그 이름 칸에 다른 걸 다시 담는 것(재할당)</b> —
      담긴 게 <b>원시값</b>이면 그 <b>값</b>을, <b>객체</b>면 그 칸이 <b>가리키는 포인터(메모리 주소)</b>를 고정한다. 실수로 바꾸는 걸 막아 준다. 아래를 실행해 에러를 직접 만나 보라.</p>
      <div class="card">
        <div class="file-label">🔬 const에 다시 담으면?</div>
        <div data-m="v4"></div>
      </div>
      <p class="section-desc" style="margin-top:-2px">규칙: <b>바뀌지 않을 값이면 <code>const</code>, 바뀔 값이면 <code>let</code></b>.
      실무에선 대부분 const로 시작하고, 꼭 바꿔야 할 때만 let으로 바꾼다. (옛날 방식 <code>var</code>도 있지만 함정이 있어 <b>지금은 안 쓴다</b> — <b>let·const만</b> 기억.)</p>

      <h3 class="section-title">⑤ const에 객체를 담으면? — 가장 헷갈리는 지점</h3>
      <div data-m="qz5"></div>
      <span class="learn-tag">📎 const는 '변수 재할당'을 막는다 — 객체 '속성 변경'은 안 막는다 (가리키는 포인터만 고정)</span>
      <p class="section-desc">입문자가 제일 많이 걸리는 곳 — <code>const user = { name: "민지" }</code> 인데 <code>user.name = "지훈"</code>이 <b>된다?!</b>
      맞다. const가 고정하는 건 <b>변수(이름표)가 가리키는 대상(주소·포인터)</b>이지 <b>그 객체의 내용</b>이 아니다. <b>화살표는 못 옮겨도, 화살표가 가리키는 객체 안</b>은 바꿀 수 있다.</p>
      <div class="card">
        <div class="file-label">🔬 const 객체 — 속성 변경은 된다 (직접 실행)</div>
        <div data-m="v5"></div>
      </div>
      <div class="card">
        <div class="file-label">🎬 눈으로 — const는 '화살표(포인터)'를 잠근다, 객체 내용은 아니다 (▶ 한 단계씩)</div>
        <div data-m="constobj"></div>
      </div>
      <p class="section-desc">🔑 그래서 <b>const obj여도 <code>obj.x = 5</code> · <code>arr.push(…)</code>는 된다.</b> "안 바뀌게 하려고 const 했는데 왜 바뀌지?" — const는 <b>이름표(포인터)만</b> 고정하니까. 객체 내용까지 얼리려면 다른 방법(<code>Object.freeze</code> 등 — 나중). 이 화살표/객체 이야기는 <b>🧠 메모리 기초</b>에서 더 깊이 본다.</p>

      <div class="practice-cta">
        <span>🎯 개념은 여기까지. 이제 <b>단계별 실습</b>으로 손에 붙일 차례예요 — 같은 유형 5문제.</span>
        <button class="chip on" data-goto="1:easy">📝 1강 실습 시작 (🟢 쉬움) →</button>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>값</b>(숫자·글자·참거짓)에 <code>let 이름 = 값</code>으로 <b>이름표</b>를 붙인다.
        <b>변수는 밥통이 아니라 이름표</b> — <code>=</code>는 '이 이름으로 가리켜라'. 바뀔 값은 <code>let</code>, 안 바뀔 값은 <code>const</code>. 이름을 부르면 그 값이 나온다.</p>
      </div>
    `

    // ── 위젯 주입 ──
    root.querySelector('[data-m="qz1"]').append(Quiz({
      q: '<code>typeof []</code> (빈 배열)의 결과는?',
      options: ['"array"', '"object"', '"list"'],
      answer: 1,
      explain: '배열도 <b>객체(참조 타입)</b>라 <code>typeof []</code>는 <b>"object"</b>! (배열 전용 타입은 없다.) 원시(숫자·문자열·불린)만 각자 타입 이름을 갖고, 나머지 묶음은 다 object.',
    }))
    root.querySelector('[data-m="qz5"]').append(Quiz({
      q: '<code>const user = { name: "민지" }</code> 다음 <code>user.name = "지훈"</code> — 될까?',
      options: ['에러 — const라서 못 바꾼다', '된다 — 이름은 "지훈"으로 바뀐다'],
      answer: 1,
      explain: 'const가 고정하는 건 <b>변수가 가리키는 대상(주소·포인터)</b>이지 <b>객체 내용</b>이 아니다. <code>user.name=…</code>은 내용 변경이라 <b>된다</b>. 막히는 건 <code>user = {…}</code>(다른 객체로 재할당)뿐.',
    }))
    root.querySelector('[data-m="v1"]').append(Runner({
      showBox: false,
      code: 'print(3)          // 숫자\nprint("안녕")      // 글자 (문자열 — 따옴표로 감싼다)\nprint(true)       // 참/거짓 (true 아니면 false)',
    }))

    root.querySelector('[data-m="v2"]').append(Runner({
      code: [
        'let primary = "#3B82F6"    // primary 이름표를 이 색에 붙인다',
        'let title = "안녕, 반가워"',
        '',
        'print(primary)             // 이름이 가리키는 값 → 왼쪽에 글자로',
        'print(title)',
        '',
        '// 화면(box)으로도 꺼내 보자 — 이름이 가리키는 값을 그대로 쓴다',
        'box.textContent = title',
        'box.style.background = primary',
        'box.style.color = "white"',
        'box.style.padding = "16px"',
        'box.style.borderRadius = "10px"',
      ].join('\n'),
    }))

    root.querySelector('[data-m="v3"]').append(Runner({
      showBox: false,
      code: 'let score = 10\nprint(score)        // 10\n\nscore = 25          // 같은 이름표를 다른 값(25)으로 옮겨 붙인다 (let은 OK)\nprint(score)        // 25 — 방금 가리킨 값으로 바뀜',
    }))

    root.querySelector('[data-m="v4"]').append(Runner({
      showBox: false,
      code: 'const TAX = 0.1\nprint(TAX)      // 0.1\n\nTAX = 0.2       // ❌ 여기서 에러가 난다 (const는 다른 값으로 옮겨 붙이기 금지)\nprint(TAX)',
    }))

    root.querySelector('[data-m="v5"]').append(Runner({
      showBox: false,
      code: [
        'const user = { name: "민지" }',
        'user.name = "지훈"      // 객체 속성을 바꾼다',
        'print(user.name)        // "지훈" — const인데도 바뀐다!',
        '// (user = { ... } 처럼 통째로 다시 담으면 그땐 에러 — 아래 그림)',
      ].join('\n'),
    }))

    root.querySelector('[data-m="constobj"]').append(MemoryModel({
      title: 'const 객체 — 화살표는 잠기고, 객체 내용은 바뀐다',
      stackLabel: '🏷️ 변수 (이름표)', heapLabel: '📦 객체 (힙)',
      code: ['const user = { name: "민지" }', 'user.name = "지훈"      // 내용 변경 ✅', 'user = { name: "새" }   // 재할당 ❌'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: '🔒 user', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"민지"' }] } },
          note: 'const user → 변수 칸엔 <b>객체를 가리키는 화살표(주소)</b>가 담기고, 그 <b>화살표가 🔒 고정</b>된다. (객체 내용을 잠그는 게 아니라 — 화살표를 잠근다.)' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: '🔒 user', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"지훈"' }] } },
          note: '<code>user.name = "지훈"</code> → <b>화살표는 그대로</b>, 가리키는 객체의 <b>내용만</b> 바뀐다(민지→지훈). const는 이걸 <b>안 막는다</b> — 화살표를 안 옮겼으니까. ✅' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: '🔒 user', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"지훈"' }] }, h2: { fields: [{ key: 'name', value: '"새"' }], faded: true } },
          note: '<code>user = { … }</code> → <b>화살표를 다른 객체로 옮기려는 것</b>(재할당). const가 <b>바로 이걸</b> 막는다 → ❌ 에러. (새 객체는 아무도 안 가리켜 회색.)' },
      ],
    }))

    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '🧠 메모리 모델 — 스택(Stack)과 힙(Heap), 값이 사는 두 방',
      code: ['let primary = "#3B82F6"', 'let title = "안녕, 반가워"', 'let card = { name: "명함" }'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'primary', value: '"#3B82F6"' }] }], heap: {}, note: '변수 primary는 <b>스택(Stack)</b>에 산다 — 왼쪽이 스택, 오른쪽이 <b>힙(Heap)</b>. 이 <b>두 방</b>이 곧 "메모리 모델"이다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'primary', value: '"#3B82F6"' }, { name: 'title', value: '"안녕, 반가워"' }] }], heap: {}, note: '숫자·글자 같은 <b>작은 값</b>은 이렇게 <b>스택</b>에 놓인다. 힙은 아직 비어 있다.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'primary', value: '"#3B82F6"' }, { name: 'title', value: '"안녕, 반가워"' }, { name: 'card', ref: 'h1' }] }], heap: { h1: { label: '{ name: "명함" }' } }, note: '<b>큰 묶음</b>(객체 <code>{ }</code> 같은 것)은 <b>힙</b>에 산다 — card는 스택에서 힙을 <b>가리킨다</b>(화살표). 스택·힙을 각각 자세힌 🧠 메모리 기초에서.' },
      ],
    }))

    root.querySelector('[data-m="typeof"]').append(Runner({
      showBox: false,
      code: [
        'print(typeof 3)        // "number"',
        'print(typeof "안녕")    // "string"',
        'print(typeof true)     // "boolean"',
        'print(typeof { a: 1 }) // "object"  (묶음은 객체)',
      ].join('\n'),
    }))

    // 모든 data-goto(실습 CTA + 인라인 레퍼런스 링크)를 배선한다.
    root.querySelectorAll('[data-goto]').forEach((el) => {
      el.onclick = () => { const t = el.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }
})()
