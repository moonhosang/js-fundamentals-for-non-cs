// 3강 · 조건 (if · 비교 · truthy/falsy · 삼항)  ── design-principles 규범으로 작성
// 오해: if는 true/false만 받는다?(아무 값이나—truthy/falsy) · = vs == vs === · "5"==5는 참?
// 왜:  ===는 값+타입 비교(예측가능), ==는 형변환(함정) · truthy/falsy는 "있냐 없냐" 편의
// 대비: == vs === · falsy(0 "" null) vs truthy("0" [] {}) · =(대입) vs ==(비교)

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

      <h3 class="section-title">⑤ 화면 — 조건에 따라 배지 색</h3>
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
