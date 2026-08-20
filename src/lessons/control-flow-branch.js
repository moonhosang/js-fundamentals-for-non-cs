// 🔀 제어 흐름 · 조합과 중첩 (branch 쪽: 개요 + if 사다리·중첩 if·if×switch)
// 개별 문(if·switch·for·while)은 이미 4강·7강에서 배웠다 — 여기선 '겹쳐 쓰기(중첩)'에 집중.
// 비교 연산자·truthy/falsy는 재설명 없이 링크(4강·coercion, SSOT). 드릴은 인라인(계약테스트 무손상).
;(function () {
  window.Lessons = window.Lessons || {}
  const wireNav = (root) => root.querySelectorAll('[data-goto]').forEach((el) => {
    el.onclick = () => { const v = el.getAttribute('data-goto'); window.goLesson ? window.goLesson(/^\d+$/.test(v) ? Number(v) : v) : (location.hash = '#' + v) }
  })

  // ── 개요(index) ──────────────────────────────────────────
  window.Lessons['cf'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🔀 제어 흐름</span>
        <h2>제어 흐름 · 조합과 중첩 — 문을 겹쳐 쓰기</h2>
        <p><code>if</code>·<code>switch</code>·<code>for</code>·<code>while</code> <b>하나하나는 이미 배웠다</b>. 실전 코드는 이들을 <b>겹쳐(중첩)</b> 쓴다 — 조건 안의 조건, 반복 안의 조건, 반복 안의 반복. 그 조립을 초보자 눈높이로 한 단계씩.</p>
      </header>
      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 먼저 짚기 (앞서 배운 것은 링크)</span>
        <p>비교 연산자(<code>&gt; &lt; === !==</code>)와 <code>==</code> 함정은 <b>앞서 배웠으니 재설명 없이</b> 링크만: <button class="inline-goto" data-goto="4">4강 · 조건(비교·if·삼항·switch)</button> · <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button> · <button class="inline-goto" data-goto="7">7강 · for·while</button>.</p>
      </div>
      <h3 class="section-title">🧩 조합을 골라 보세요</h3>
      <div class="home-grid">
        <button class="home-card" data-goto="cf-1"><span class="home-card-title">cf-1 · if 사다리</span><span class="home-card-sub">else if · else — 여러 갈래</span></button>
        <button class="home-card" data-goto="cf-2"><span class="home-card-title">cf-2 · 중첩 if</span><span class="home-card-sub">if 안의 if · &amp;&amp; 대비</span></button>
        <button class="home-card" data-goto="cf-3"><span class="home-card-title">cf-3 · 반복 × 조건</span><span class="home-card-sub">for 안의 if · 목록 거르기</span></button>
        <button class="home-card" data-goto="cf-4"><span class="home-card-title">cf-4 · 중첩 반복</span><span class="home-card-sub">for 안의 for · 격자·구구단</span></button>
        <button class="home-card" data-goto="cf-5"><span class="home-card-title">cf-5 · if × switch</span><span class="home-card-sub">고르고 다시 분기</span></button>
      </div>
    `
    wireNav(root)
  }

  // ── FABLE-A: 아래에 window.Lessons['cf-1'](if 사다리)·['cf-2'](중첩 if)·['cf-5'](if × switch) 추가 ──

  // ── cf-1 · if 사다리 (else if / else) ────────────────────
  window.Lessons['cf-1'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🔀 cf-1</span>
        <h2>if 사다리 — 갈래는 여럿, 실행은 하나</h2>
        <p><code>else if</code>로 이어 붙인 <b>사다리</b>와, <code>else</code> 없이 <code>if</code>를 여러 번 쓴 것 — 겉은 비슷한데 <b>전혀 다른 일</b>을 한다. 하나는 갈래를 <b>딱 하나</b> 고르고, 하나는 참인 갈래를 <b>전부</b> 실행한다. 그 차이가 이번 레슨의 전부다.</p>
      </header>
      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 먼저 짚기 — 개별 문법은 링크로 재소환</span>
        <p><code>if</code>·비교·truthy는 이미 배웠다(재설명 없음): <button class="inline-goto" data-goto="4">4강 · 조건</button> · <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>. 여기선 <b>여러 갈래를 잇는 법</b>만 본다.</p>
      </div>

      <h3 class="section-title">① 🔮 먼저 예측 — 몇 갈래가 실행될까?</h3>
      <div data-m="qz1"></div>
      <div data-m="qz2"></div>

      <h3 class="section-title">② ⏱ 사다리가 접히는 시간 — 지하철 요금 구간</h3>
      <span class="learn-tag">📎 현실 그대로 — 나이 구간 따라 요금이 갈린다 (성적→등급도 같은 모양)</span>
      <div class="card">
        <div class="file-label">⏱ 시간 시뮬레이션 ① — age = 10 (어린이) · 사다리를 위에서부터 (다음 ▶)</div>
        <div data-m="red1"></div>
      </div>
      <div class="card" style="border-color:var(--red)">
        <div class="file-label">⏱ 시간 시뮬레이션 ② — 🐛 else를 뗀 순간 벌어지는 사고 (같은 age = 10 · 다음 ▶)</div>
        <div data-m="red2"></div>
      </div>

      <h3 class="section-title">③ 🔬 진짜 코드로 — 두 버전을 나란히</h3>
      <span class="learn-tag">📎 age를 3·10·16·30으로 바꿔 실행 — 사다리는 늘 하나만, 독립 if는 덮어쓴다</span>
      <div class="card">
        <div class="file-label">🔬 요금 계산 — 사다리(정상) vs else 뗀 if들(버그) + 화면 배지</div>
        <div data-m="run1"></div>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 순서도 사다리의 일부다 — 좁은 조건이 먼저</div>
        <p class="section-desc" style="margin:0">"왜 <code>age &lt; 8</code>부터 쓰지? <code>age &lt; 19</code>부터 쓰면 안 되나?" — 안 된다. 사다리는 <b>위에서부터</b>라, 넓은 조건(<code>&lt; 19</code>)을 먼저 두면 유아든 어린이든 <b>전부 첫 계단에 걸려</b> 아래 계단은 영영 안 열린다. <b>좁은(구체적인) 조건이 위, 넓은 조건이 아래.</b> 아래 드릴 3번에서 직접 밟는다.</p>
      </div>

      <div class="card">
        <div class="file-label">🧩 사실 else if는… 중첩이다</div>
        <p class="section-desc" style="margin:0"><code>else if</code>는 새 문법이 아니다 — <code>else { if (…) { } }</code>, 즉 <b>else 안에 if를 중첩</b>해 넣은 걸 붙여 쓴 표기다. "앞 계단이 거짓일 때만 다음 검사"라는 성질이 바로 여기서 나온다. if 안에 if를 넣는 이야기는 다음 레슨에서 → <button class="inline-goto" data-goto="cf-2">cf-2 · 중첩 if</button></p>
      </div>

      <h3 class="section-title">④ 🔁 반복 드릴 — 값만 바꿔 손에 붙이기</h3>
      <div data-m="dr"></div>

      <div class="practice-nav">
        <button class="chip" data-goto="cf">← 조합 개요</button>
        <button class="chip on" data-goto="cf-2">다음 · cf-2 중첩 if →</button>
      </div>
    `

    root.querySelector('[data-m="qz1"]').append(Quiz({
      q: '<code>score = 85</code>. 사다리 — <code>if (score >= 90) g="A"; else if (score >= 80) g="B"; else if (score >= 70) g="C"; else g="F"</code>. g는?',
      options: ['"B" — 참인 첫 갈래에서 멈춘다', '"C" — 85는 70 이상이기도 하니 아래 갈래가 g를 또 덮어쓴다', '"B" 그리고 "C" — 참인 갈래가 둘이니 둘 다 실행'],
      answer: 0,
      explain: '사다리는 <b>위에서부터</b> — <code>85 >= 90</code> 거짓, <code>85 >= 80</code> <b>참 → 여기서 실행하고 사다리 전체를 빠져나온다</b>. <code>85 >= 70</code>도 참이지만 <b>검사조차 안 한다</b>(4강에서 밟았던 그 길).',
    }))
    root.querySelector('[data-m="qz2"]').append(Quiz({
      q: '이번엔 else를 다 뗐다 — <code>if (score >= 90) g="A"; if (score >= 80) g="B"; if (score >= 70) g="C"</code>. 같은 <code>score = 85</code>. 마지막에 g는?',
      options: ['"B" — 아까처럼 참인 첫 갈래에서 멈춘다', '"C" — 참인 두 갈래가 다 실행되고 마지막이 덮어쓴다', '에러 — if를 연달아 쓸 수 없다'],
      answer: 1,
      explain: 'else 고리가 없으면 <b>서로 남남인 if 3개</b> — 각자 자기 검사를 한다. <code>85 >= 80</code> 참 → g="B", 이어서 <code>85 >= 70</code>도 참 → g="C"로 <b>덮어쓴다</b>. "하나만 실행"은 if의 성질이 아니라 <b>else if가 만들어 주는 성질</b>이다.',
    }))

    root.querySelector('[data-m="red1"]').append(ExprReduce({
      title: '지하철 요금 사다리 — age = 10 이 갈래를 고르기까지',
      steps: [
        {
          code: 'if (age < 8)       { fare = 0 }\nelse if (age < 14) { fare = 450 }\nelse if (age < 19) { fare = 720 }\nelse               { fare = 1250 }',
          mark: 'age < 8',
          note: '지금 age는 <b>10</b>을 가리킨다. 사다리는 <b>맨 위 계단부터</b> — <code>age &lt; 8</code>?',
        },
        {
          code: 'if (10 < 8)        { fare = 0 }\nelse if (age < 14) { fare = 450 }\nelse if (age < 19) { fare = 720 }\nelse               { fare = 1250 }',
          mark: '10 < 8',
          note: '<code>10 &lt; 8</code> → <b style="color:var(--red)">거짓</b> — 이 갈래(무료)는 닫힌다. <b>else</b>가 받아서 다음 계단으로.',
        },
        {
          code: 'if (✗ 거짓)         { fare = 0 }\nelse if (10 < 14)  { fare = 450 }\nelse if (age < 19) { fare = 720 }\nelse               { fare = 1250 }',
          mark: '10 < 14',
          note: '두 번째 계단 — 여긴 <b>앞이 거짓이어서만</b> 온 것이다. <code>10 &lt; 14</code>?',
        },
        {
          code: 'if (✗ 거짓)         { fare = 0 }\nelse if (✅ 참)      { fare = 450 }\nelse if (age < 19) { fare = 720 }\nelse               { fare = 1250 }',
          mark: 'fare = 450',
          note: '<b style="color:var(--green)">참</b> — 이 갈래가 열려 <b>fare = 450</b>. 그리고 <b>여기서 사다리 전체가 끝난다.</b>',
        },
        {
          code: 'fare = 450   // 사다리 끝 — 아래 계단은 검사도 안 했다',
          note: '10은 <code>age &lt; 19</code>에도 맞지만, 사다리는 <b>참인 첫 갈래에서 멈춘다</b> — 아래 계단은 <b>검사조차 안 한다</b>. 그래서 실행되는 갈래는 언제나 <b>딱 하나</b>(다 거짓이면 else).',
        },
      ],
    }))
    root.querySelector('[data-m="red2"]').append(ExprReduce({
      title: '🐛 else를 떼면 — 같은 age = 10 인데 요금이 달라진다',
      steps: [
        {
          code: 'if (age < 8)  { fare = 0 }\nif (age < 14) { fare = 450 }\nif (age < 19) { fare = 720 }',
          mark: 'age < 8',
          note: '겉보기엔 비슷하지만 <b>else가 없다</b> — 사다리가 아니라 <b>서로 남남인 if 3개</b>다. 첫 if부터: age = 10, <code>10 &lt; 8</code>?',
        },
        {
          code: 'if (10 < 8)   { fare = 0 }\nif (age < 14) { fare = 450 }\nif (age < 19) { fare = 720 }',
          mark: '10 < 8',
          note: '<b style="color:var(--red)">거짓</b> — 몸통 스킵. <b>그런데 여기서 안 멈춘다</b> — 다음 줄은 else가 아니라 그냥 새 if라서, <b>무조건 자기 검사를 새로 한다</b>.',
        },
        {
          code: 'if (✗ 거짓)    { fare = 0 }\nif (10 < 14)  { fare = 450 }\nif (age < 19) { fare = 720 }',
          mark: '10 < 14',
          note: '<b style="color:var(--green)">참</b> → <b>fare = 450</b>. 여기까지는 사다리와 같은 결과다. 문제는 다음 줄.',
        },
        {
          code: 'if (✗ 거짓)    { fare = 0 }\nif (✅ 참)      { fare = 450 }   // fare는 지금 450\nif (10 < 19)  { fare = 720 }',
          mark: '10 < 19',
          note: '사다리였다면 이미 끝났을 자리. 하지만 독립 if라 <b>또 검사한다</b> — <code>10 &lt; 19</code>?',
        },
        {
          code: 'if (✗ 거짓)    { fare = 0 }\nif (✅ 참)      { fare = 450 }   // ← 방금 담은 450이…\nif (✅ 참)      { fare = 720 }   // ← 720으로 덮인다!',
          mark: 'fare = 720',
          note: '<b style="color:var(--green)">참</b> → <b>fare = 720</b>. 방금 담은 450이 <b>덮어써졌다</b> — 마지막 대입이 이긴다.',
        },
        {
          code: 'fare = 720   // 🐛 어린이(450원)인데 청소년 요금(720원)',
          note: '버그 완성. <code>else if</code>는 "앞이 거짓일 때만"이라는 <b>연결 고리</b>다 — 고리를 떼면 참인 갈래가 <b>전부</b> 실행된다. <b>"하나 고르기"가 목적이면 반드시 else if로 이어라.</b>',
        },
      ],
    }))

    root.querySelector('[data-m="run1"]').append(Runner({
      code: [
        'let age = 10',
        'let fare',
        'if (age < 8)       { fare = 0 }     // 유아 — 무료',
        'else if (age < 14) { fare = 450 }   // 어린이  ← age=10은 여기서 멈춘다',
        'else if (age < 19) { fare = 720 }   // 청소년',
        'else               { fare = 1250 }  // 성인',
        'print(fare)   // 450',
        '// 참인 첫 갈래만',
        '',
        '// ⚠️ else를 떼면? — 남남인 if들: 참인 게 전부 실행 → 마지막이 덮어쓴다',
        'let f2',
        'if (age < 8)  { f2 = 0 }',
        'if (age < 14) { f2 = 450 }',
        'if (age < 19) { f2 = 720 }',
        'print(f2)   // 720!',
        '// 어린이인데 청소년 요금 (버그)',
        '',
        '// ─ 출구: 계산한 요금을 화면 배지로 ─',
        'box.textContent = fare + "원"',
        'box.style.cssText = "padding:16px 24px;font-size:26px;font-weight:800;color:white;border-radius:12px;background:#6BCB77"',
      ].join('\n'),
    }))

    root.querySelector('[data-m="dr"]').append(Drill({
      pattern: '빈칸에 예측값을 넣어라 — 맞으면 true. (글자 답은 따옴표까지: "A")',
      problems: [
        {
          ask: '점수 72점 — 사다리는 g를 무엇으로 정할까?',
          code: 'let score = 72, g\nif (score >= 90) { g = "A" }\nelse if (score >= 80) { g = "B" }\nelse if (score >= 70) { g = "C" }\nelse { g = "F" }\nprint((g) === ____)',
          expect: 'true',
          answer: '"C"',
          hint: '위에서부터 — 90 이상? 80 이상? 70 이상? 참인 첫 계단에서 멈춘다.',
        },
        {
          ask: '95점 — 첫 계단에서 무슨 일이? g는?',
          code: 'let score = 95, g\nif (score >= 90) { g = "A" }\nelse if (score >= 80) { g = "B" }\nelse if (score >= 70) { g = "C" }\nelse { g = "F" }\nprint((g) === ____)',
          expect: 'true',
          answer: '"A"',
          hint: '95 >= 90 참 → 첫 계단에서 바로 끝. 95 >= 80도 참이지만 검사조차 안 한다.',
        },
        {
          ask: '⚠️ 사다리 순서를 뒤집었다 — 넓은 조건이 먼저다. 95점인데 g는?',
          code: 'let score = 95, g\nif (score >= 70) { g = "C" }\nelse if (score >= 90) { g = "A" }\nprint((g) === ____)',
          expect: 'true',
          answer: '"C"',
          hint: '95 >= 70이 먼저 참 → 아래의 >= 90은 영영 안 열린다. 좁은 조건이 위로 가야 한다.',
        },
        {
          ask: 'else를 뗀 독립 if 2개 — 마지막에 g는?',
          code: 'let g\nif (85 >= 80) { g = "B" }\nif (85 >= 70) { g = "C" }\nprint((g) === ____)',
          expect: 'true',
          answer: '"C"',
          hint: '남남인 if — 둘 다 참이라 둘 다 실행. 마지막 대입이 덮어쓴다.',
        },
      ],
    }))

    wireNav(root)
  }

  // ── cf-2 · 중첩 if (if 안의 if) ──────────────────────────
  window.Lessons['cf-2'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🔀 cf-2</span>
        <h2>중첩 if — 관문을 통과해야 다음 관문</h2>
        <p><b>건물 문을 열어야 방 문 앞에 설 수 있다.</b> <code>if</code> 안에 <code>if</code>를 넣으면 그런 <b>단계적 관문</b>이 된다 — 바깥이 거짓이면 안쪽은 어떻게 될까? 그리고 <code>if (a &amp;&amp; b)</code> 한 줄과는 뭐가 다를까?</p>
      </header>
      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 먼저 짚기 — 개별 문법은 링크로 재소환</span>
        <p><code>if</code>와 <code>&amp;&amp;</code>·truthy는 이미 배웠다(재설명 없음): <button class="inline-goto" data-goto="4">4강 · 조건</button> · <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>. 여기선 <b>if 안에 if를 넣는 법</b>만 본다.</p>
      </div>

      <h3 class="section-title">① 🔮 먼저 예측 — 안쪽은 검사될까?</h3>
      <div data-m="qz1"></div>
      <div data-m="qz2"></div>

      <h3 class="section-title">② ⏱ 관문 두 개를 시간순으로 — 술집 입장</h3>
      <span class="learn-tag">📎 관문 ① 로그인(건물 문) → 관문 ② 나이(방 문). 바깥을 통과해야 안쪽 검사가 존재한다</span>
      <div class="card">
        <div class="file-label">⏱ 시간 시뮬레이션 ① — loggedIn = true, age = 15 · 바깥 통과, 안쪽에서 막힘 (다음 ▶)</div>
        <div data-m="red1"></div>
      </div>
      <div class="card" style="border-color:var(--red)">
        <div class="file-label">⏱ 시간 시뮬레이션 ② — loggedIn = false, age = 25 · 바깥에서 전부 끝 (다음 ▶)</div>
        <div data-m="red2"></div>
      </div>

      <h3 class="section-title">③ 🥊 오해 정면돌파 — <code>if (a) { if (b) }</code> vs <code>if (a &amp;&amp; b)</code></h3>
      <span class="learn-tag">📎 결과 조건은 같다 — 차이는 "바깥 통과 후"라는 끼움 자리의 유무</span>
      <p class="section-desc"><b>안쪽 X가 실행될 조건</b>만 보면 둘은 같다("a 참 그리고 b 참"). 하지만 <b>중첩</b>에는 바깥 통과 직후·안쪽 검사 전이라는 <b>자리</b>가 생긴다 — 로그인만 하면 나오는 인사말처럼, <b>바깥만 통과하면 되는 일</b>을 거기 끼울 수 있다. 낄 코드가 없다면? <b><code>&amp;&amp;</code> 한 줄이 낫다</b> — 평평할수록 읽기 쉽다.</p>
      <div class="card">
        <div class="file-label">🔬 같은 관문, 두 표기 — 실행해 비교 (age를 25로 바꿔 보라)</div>
        <div data-m="run1"></div>
      </div>

      <div class="card">
        <div class="file-label">🧱 중괄호 짝 — 들여쓰기는 장식이 아니라 지도다</div>
        <pre class="runner-code runner-code-static" style="margin:0 0 8px">if (a) {          ← 바깥 문 열림
  if (b) {        ← 안쪽 문 열림
    …
  }               ← 안쪽 문 닫힘 (같은 들여쓰기의 { 와 짝)
}                 ← 바깥 문 닫힘</pre>
        <p class="section-desc" style="margin:0">중첩이 깊어질수록 <code>}</code>가 <b>누구의 짝인지</b>가 버그의 온상이다 — <code>}</code> 하나가 빠지면 에러는 <b>엉뚱한 줄</b>에서 난다. 규칙 하나로 산다: <b>닫는 <code>}</code>는 자기 <code>{</code>가 있는 줄과 같은 들여쓰기</b>. 안 맞으면 이미 뭔가 샌 것이다.</p>
      </div>

      <h3 class="section-title">④ 🔁 반복 드릴 — 관문을 값만 바꿔 통과시켜 보기</h3>
      <div data-m="dr"></div>

      <div class="practice-nav">
        <button class="chip" data-goto="cf">← 조합 개요</button>
        <button class="chip on" data-goto="cf-3">다음 · cf-3 반복 × 조건 →</button>
      </div>
    `

    root.querySelector('[data-m="qz1"]').append(Quiz({
      q: '<code>if (a) { if (b) { print("입장") } }</code> — a는 <b>false</b>, b는 <b>true</b>다. 안쪽 조건 b는 검사될까?',
      options: ['검사된다 — b가 참이니 print도 실행된다', '검사 안 된다 — 바깥이 거짓이면 몸통 전체를 건너뛴다'],
      answer: 1,
      explain: '안쪽 if는 바깥 if의 <b>몸통 안</b>에 산다 — 바깥이 거짓이면 몸통이 통째로 스킵되어 안쪽은 <b>평가조차 없다</b>. 건물 문이 잠겼는데 방 문을 두드릴 수는 없다.',
    }))
    root.querySelector('[data-m="qz2"]').append(Quiz({
      q: '<code>if (a &amp;&amp; b) { X }</code> 와 <code>if (a) { if (b) { X } }</code> — X가 실행되는 조건은 같을까?',
      options: ['같다 — 그러니 언제나 완전히 바꿔 쓸 수 있다', '같다 — 하지만 중첩은 "바깥 통과 후" 자리에 다른 코드를 끼울 수 있다', '다르다 — 중첩이 더 엄격하게 검사한다'],
      answer: 1,
      explain: 'X만 보면 둘 다 "a 참 <b>그리고</b> b 참" — 같은 조건이다. 차이는 <b>자리</b>: 중첩에는 바깥 통과 직후(안쪽 검사 전)라는 <b>끼움 자리</b>가 있다. 낄 코드가 없으면 <code>&amp;&amp;</code>가 짧고 평평해서 낫다.',
    }))

    root.querySelector('[data-m="red1"]').append(ExprReduce({
      title: '중첩 if — loggedIn = true, age = 15 의 실제 경로',
      steps: [
        {
          code: 'if (loggedIn) {\n  print("어서오세요")\n  if (age >= 19) { print("성인 라운지 입장") }\n}',
          mark: 'loggedIn',
          note: '관문 ① — <b>건물 문</b>. loggedIn은 <b>true</b>, age는 <b>15</b>를 가리킨다.',
        },
        {
          code: 'if (true) {\n  print("어서오세요")\n  if (age >= 19) { print("성인 라운지 입장") }\n}',
          mark: 'true',
          note: '<b style="color:var(--green)">참</b> — 문이 열려 <b>몸통 안으로 들어간다</b>. 몸통 안은 <b>위에서부터 한 줄씩</b>.',
        },
        {
          code: 'if (true) {\n  print("어서오세요")\n  if (age >= 19) { print("성인 라운지 입장") }\n}',
          mark: 'print("어서오세요")',
          note: '안쪽 if를 보기 <b>전에</b> 이 줄이 먼저 실행 → "어서오세요". <b>바깥 통과와 안쪽 검사 사이에 코드가 낄 수 있다</b> — 이게 중첩의 힘(뒤 ③에서 &amp;&amp;와 비교).',
        },
        {
          code: 'if (true) {\n  ✅ "어서오세요" 출력됨\n  if (15 >= 19) { print("성인 라운지 입장") }\n}',
          mark: '15 >= 19',
          note: '관문 ② — <b>방 문</b>. age(15)를 넣고 검사: <code>15 &gt;= 19</code>?',
        },
        {
          code: 'if (true) {\n  ✅ "어서오세요" 출력됨\n  if (✗ 거짓)   { print("성인 라운지 입장") }\n}',
          mark: '✗ 거짓',
          note: '<b style="color:var(--red)">거짓</b> — 방 문은 닫힌다. 안쪽 print는 스킵.',
        },
        {
          code: '→ 출력: "어서오세요"  (성인 라운지는 ✗)',
          note: '건물엔 들어왔지만(바깥 참) 그 방엔 못 들어갔다(안쪽 거짓). 중첩 if = <b>단계적 관문</b> — 각 관문은 <b>앞 관문을 통과한 뒤에만</b> 검사된다.',
        },
      ],
    }))
    root.querySelector('[data-m="red2"]').append(ExprReduce({
      title: '같은 코드, 이번엔 loggedIn = false, age = 25',
      steps: [
        {
          code: 'if (loggedIn) {\n  print("어서오세요")\n  if (age >= 19) { print("성인 라운지 입장") }\n}',
          mark: 'loggedIn',
          note: '이번엔 loggedIn = <b>false</b>, age = <b>25</b> — 나이 조건만 보면 성인이다. 그래도 관문 ①부터.',
        },
        {
          code: 'if (false) {\n  print("어서오세요")\n  if (age >= 19) { print("성인 라운지 입장") }\n}',
          mark: 'false',
          note: '<b style="color:var(--red)">거짓</b> — 건물 문이 잠겼다. 몸통 <b>전체</b>(인사 + 안쪽 if)를 통째로 건너뛴다.',
        },
        {
          code: '→ 출력 없음.  age >= 19 는 계산조차 안 됐다',
          note: 'age가 25든 250이든 상관없다 — 바깥이 거짓이면 <b>안쪽 조건은 평가 자체가 없다</b>. 아까 🔮 ①의 답이 이것.',
        },
      ],
    }))

    root.querySelector('[data-m="run1"]').append(Runner({
      code: [
        'let loggedIn = true, age = 15',
        '',
        '// ① && — 두 검사를 "동시에 한 줄" (사이에 낄 코드가 없을 때)',
        'if (loggedIn && age >= 19) { print("성인 라운지 입장") }',
        '',
        '// ② 중첩 — 바깥 통과 "후에만" 할 일이 따로 있을 때',
        'if (loggedIn) {',
        '  print("어서오세요")               // 로그인만 하면 나오는 인사 — &&론 이 자리가 없다',
        '  if (age >= 19) { print("성인 라운지 입장") }',
        '}',
        '',
        '// ─ 출구: 같은 관문을 화면 배지로 ─',
        'let label = "로그인 필요 🔒"',
        'if (loggedIn) {',
        '  label = "일반 입장 🙌"',
        '  if (age >= 19) { label = "성인 라운지 🍷" }',
        '}',
        'box.textContent = label',
        'box.style.cssText = "padding:14px 22px;font-size:22px;font-weight:800;color:white;border-radius:12px;background:#4D96FF"',
      ].join('\n'),
    }))

    root.querySelector('[data-m="dr"]').append(Drill({
      pattern: '빈칸에 예측값을 넣어라 — 맞으면 true. (글자 답은 따옴표까지: "문", 빈 글자는 "")',
      problems: [
        {
          ask: '바깥 참·안쪽 참 — 두 관문을 다 통과하면 s는?',
          code: 'let s = "", a = true, b = true\nif (a) { s = s + "문" ; if (b) { s = s + "방" } }\nprint((s) === ____)',
          expect: 'true',
          answer: '"문방"',
          hint: '바깥 통과에서 "문", 이어서 안쪽 통과에서 "방"이 붙는다.',
        },
        {
          ask: '바깥이 거짓이다 — 안쪽 b는 참인데도, s는?',
          code: 'let s = "", a = false, b = true\nif (a) { s = s + "문" ; if (b) { s = s + "방" } }\nprint((s) === ____)',
          expect: 'true',
          answer: '""',
          hint: '바깥이 거짓이면 몸통 전체 스킵 — 안쪽은 검사조차 없다. s는 처음 그대로.',
        },
        {
          ask: '바깥 참·안쪽 거짓 — 건물엔 들어갔지만 방은 못 들어가면 s는?',
          code: 'let s = "", a = true, b = false\nif (a) { s = s + "문" ; if (b) { s = s + "방" } }\nprint((s) === ____)',
          expect: 'true',
          answer: '"문"',
          hint: '바깥 통과분("문")은 남는다 — 안쪽만 막혔다.',
        },
        {
          ask: '중첩과 && — 결과가 같은지 코드로 증명해 보자. n === m 은?',
          code: 'let a = true, b = true, n = 0, m = 0\nif (a) { if (b) { n = 1 } }\nif (a && b) { m = 1 }\nprint((n === m) === ____)',
          expect: 'true',
          answer: 'true',
          hint: '안쪽 X가 실행될 조건은 둘 다 "a 참 그리고 b 참" — n도 m도 1이 된다.',
        },
      ],
    }))

    wireNav(root)
  }

  // ── cf-5 · if × switch 조합 ──────────────────────────────
  window.Lessons['cf-5'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🔀 cf-5</span>
        <h2>if × switch — 큰 문은 if가, 세부 갈래는 switch가</h2>
        <p>실전 분기는 도구를 <b>섞어</b> 쓴다 — <b>범위·상황 판단</b>("영업 중인가?")은 <code>if</code>로 크게 가르고, 그 안에서 <b>값 하나로 여러 갈래</b>("문의 번호가 몇 번?")는 <code>switch</code>로 고른다. 그리고 switch로 <b>범위를 흉내 내면 왜 조용히 망하는지</b>도 직접 본다.</p>
      </header>
      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 먼저 짚기 — 개별 문법은 링크로 재소환</span>
        <p><code>if</code>·<code>switch</code>(case는 <b>===</b>·break·default)는 이미 배웠다(재설명 없음): <button class="inline-goto" data-goto="4">4강 · 조건</button> · <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>. 여기선 <b>둘을 언제·어떻게 섞는지</b>만 본다.</p>
      </div>

      <h3 class="section-title">① 🔮 먼저 예측 — 도구를 잘못 고르면?</h3>
      <div data-m="qz1"></div>
      <div data-m="qz2"></div>

      <h3 class="section-title">② 🧭 언제 if, 언제 switch — 검사기와 자판기</h3>
      <span class="learn-tag">📎 if = 질문 검사기(참/거짓 아무 질문이나) · switch = 값 맞추기 자판기(버튼이 딱 맞아야)</span>
      <p class="section-desc"><b>값 하나</b>를 여러 후보와 <b>===로 딱 맞추는</b> 일(요일 번호, 메뉴 번호, 등급 글자) → <b>switch</b>. <b>범위</b>(<code>&gt;= 90</code>)·<b>복합 조건</b>(<code>&amp;&amp;</code>·<code>||</code>)·서로 <b>다른 변수</b>를 묻는 일 → <b>if</b>. 둘은 경쟁자가 아니라 <b>서로 안에 품을 수 있는 부품</b>이다 — 아래에서 그 조합을 시간순으로 밟는다.</p>

      <h3 class="section-title">③ ⏱ 조합이 굴러가는 시간 — 고객센터 자동 응답</h3>
      <span class="learn-tag">📎 바깥: 영업 중인가(if) → 안: 문의 번호(switch). open = true, menu = 2의 실제 경로</span>
      <div class="card">
        <div class="file-label">⏱ 시간 시뮬레이션 ① — if가 문을 열고, switch가 갈래를 고른다 (다음 ▶)</div>
        <div data-m="red1"></div>
      </div>
      <div class="card" style="border-color:var(--red)">
        <div class="file-label">⏱ 시간 시뮬레이션 ② — 🪤 switch로 범위를 흉내 내면 (score = 95 · 다음 ▶)</div>
        <div data-m="red2"></div>
      </div>

      <h3 class="section-title">④ 🔬 진짜 코드로 — 범위는 if, 번호는 switch</h3>
      <span class="learn-tag">📎 hour를 20으로, menu를 7로 바꿔 다시 실행 — 어느 층에서 갈리는지 보라</span>
      <div class="card">
        <div class="file-label">🔬 고객센터 — 영업시간(범위) 안에서만 메뉴(값) 분기 + 화면 배지</div>
        <div data-m="run1"></div>
      </div>

      <h3 class="section-title">⑤ 🔁 반복 드릴 — 조합을 값만 바꿔 굴리기</h3>
      <div data-m="dr"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>값 하나 === 여러 후보 → switch</b>, <b>범위·복합 조건 → if</b>. switch의 case 대조는 <b>값 맞추기</b>라 <code>case score &gt;= 90</code>은 (에러도 없이) 뜻대로 안 된다 — 범위는 if에게, 그리고 큰 if 안에 세부 switch를 품어라.</p>
      </div>

      <div class="practice-nav">
        <button class="chip" data-goto="cf">← 조합 개요</button>
      </div>
    `

    root.querySelector('[data-m="qz1"]').append(Quiz({
      q: '<code>score = 95</code>. switch로 등급 <b>범위</b>를 흉내 내 봤다 — g는?<pre class="err-code" style="color:inherit;background:transparent">switch (score) {\n  case score >= 90: g = "A"; break\n  default:          g = "?"\n}</pre>',
      options: ['"A" — 95는 90 이상이니까', '"?" — case 식은 true로 접히고, 대조는 95 === true 라 거짓', '에러 — case 자리에 식을 쓸 수 없다'],
      answer: 1,
      explain: 'case 자리도 표현식이라 <b>값으로 접힌다</b>: <code>score >= 90</code> → <b>true</b>. 그런데 switch의 대조는 <code>95 === true</code> — <b>거짓!</b> 조건이 참인데도 갈래가 안 열린다. case에 식을 쓰는 것 자체는 합법이라 <b>에러조차 안 난다</b> — 그래서 더 위험한 함정. <b>범위·대소 비교는 if의 일이다.</b>',
    }))
    root.querySelector('[data-m="qz2"]').append(Quiz({
      q: '도구 고르기 — ⓐ "요일 번호(1~7)마다 다른 인사말" ⓑ "온도가 30 이상인지 검사". 어느 쪽이 switch 감일까?',
      options: ['둘 다 switch — 분기는 전부 switch가 낫다', 'ⓐ는 switch, ⓑ는 if — 값 하나 딱 맞추기 vs 범위', '둘 다 if — switch는 쓸 일이 없다'],
      answer: 1,
      explain: 'ⓐ는 <b>값 하나</b>(요일 번호)를 여러 후보와 <b>===로 딱 맞추는</b> 일 — switch의 홈그라운드. ⓑ는 <b>범위</b>(>= 30) — ===로 맞출 값이 없으니 if. 그리고 ⓑ 같은 큰 판단을 if로 하고 <b>그 안에</b> ⓐ 같은 다분기를 switch로 — 이게 이번 레슨의 조합이다.',
    }))

    root.querySelector('[data-m="red1"]').append(ExprReduce({
      title: '고객센터 — open = true, menu = 2 가 응답을 받기까지',
      steps: [
        {
          code: 'if (open) {\n  switch ( menu ) {\n    case 1: print("주문 접수"); break\n    case 2: print("배송 조회"); break\n    default: print("상담사 연결")\n  }\n} else {\n  print("영업시간이 아닙니다")\n}',
          mark: 'open',
          note: '큰 갈래부터 — <b>"영업 중인가?"</b>는 if의 몫. open은 <b>true</b>, menu는 <b>2</b>를 가리킨다.',
        },
        {
          code: 'if (true) {\n  switch ( menu ) {\n    case 1: print("주문 접수"); break\n    case 2: print("배송 조회"); break\n    default: print("상담사 연결")\n  }\n} else {\n  print("영업시간이 아닙니다")\n}',
          mark: 'true',
          note: '<b style="color:var(--green)">참</b> — else 갈래("영업시간이 아닙니다")는 버리고 몸통 진입. 이제 안에서 <b>switch가 이어받는다</b>.',
        },
        {
          code: 'if (true) {\n  switch ( menu ) {\n    case 1: print("주문 접수"); break\n    case 2: print("배송 조회"); break\n    default: print("상담사 연결")\n  }\n} else {\n  print("영업시간이 아닙니다")\n}',
          mark: '( menu )',
          note: 'switch 차례 — 4강 그대로, 괄호 안 표현식을 <b>먼저 하나의 값으로 접는다</b>.',
        },
        {
          code: 'if (true) {\n  switch ( 2 ) {\n    case 1: print("주문 접수"); break\n    case 2: print("배송 조회"); break\n    default: print("상담사 연결")\n  }\n} else {\n  print("영업시간이 아닙니다")\n}',
          mark: '( 2 )',
          note: 'menu → <b>2</b>. 이 값 하나를 들고 <b>위에서부터</b> case와 <b>=== 대조</b>.',
        },
        {
          code: 'if (true) {\n  switch ( 2 ) {\n    case 1: print("주문 접수"); break\n    case 2: print("배송 조회"); break\n    default: print("상담사 연결")\n  }\n} else {\n  print("영업시간이 아닙니다")\n}',
          mark: 'case 1:',
          note: '<code>2 === 1</code> → <b style="color:var(--red)">거짓</b> — 통과.',
        },
        {
          code: 'if (true) {\n  switch ( 2 ) {\n    case 1: ✗ 거짓 — 통과\n    case 2: print("배송 조회"); break\n    default: print("상담사 연결")\n  }\n} else {\n  print("영업시간이 아닙니다")\n}',
          mark: 'case 2:',
          note: '<code>2 === 2</code> → <b style="color:var(--green)">참</b> — 갈래가 열린다!',
        },
        {
          code: 'if (true) {\n  switch ( 2 ) {\n    case 1: ✗ 거짓 — 통과\n    case 2: print("배송 조회"); break\n    default: print("상담사 연결")\n  }\n} else {\n  print("영업시간이 아닙니다")\n}',
          mark: 'print("배송 조회")',
          note: '열린 갈래의 코드 실행 → 화면에 <b>"배송 조회"</b>.',
        },
        {
          code: 'if (true) {\n  switch ( 2 ) {\n    case 1: ✗ 거짓 — 통과\n    case 2: print("배송 조회"); break\n    default: print("상담사 연결")\n  }\n} else {\n  print("영업시간이 아닙니다")\n}',
          mark: 'break',
          note: '<b>break</b> — switch 탈출. switch가 끝났으니 if 몸통도 끝, 전체가 마무리된다.',
        },
        {
          code: '→ "배송 조회" 출력 — if가 큰 문을 열고, switch가 세부 갈래를 골랐다',
          note: '정리 — 바깥 <b>if</b>: 상황 판단(영업 중?), 안쪽 <b>switch</b>: 값 하나 다분기(몇 번 문의?). <b>역할 분담</b>이 조합의 전부다.',
        },
      ],
    }))
    root.querySelector('[data-m="red2"]').append(ExprReduce({
      title: '🪤 switch로 범위 흉내 — score = 95 인데 왜 "?"가 되나',
      steps: [
        {
          code: 'switch ( score ) {\n  case score >= 90: g = "A"; break\n  default: g = "?"\n}',
          mark: '( score )',
          note: 'score엔 <b>95</b>. 늘 하던 대로 괄호 안을 값으로 접는다.',
        },
        {
          code: 'switch ( 95 ) {\n  case score >= 90: g = "A"; break\n  default: g = "?"\n}',
          mark: '( 95 )',
          note: '95를 들고 case 값과 === 대조하러 간다. 그런데 case 자리에 <b>식</b>이 있다?',
        },
        {
          code: 'switch ( 95 ) {\n  case score >= 90: g = "A"; break\n  default: g = "?"\n}',
          mark: 'score >= 90',
          note: 'case 자리도 표현식 — 대조 전에 <b>값으로 접힌다</b>: <code>95 &gt;= 90</code>?',
        },
        {
          code: 'switch ( 95 ) {\n  case true: g = "A"; break\n  default: g = "?"\n}',
          mark: 'case true:',
          note: '조건은 <b style="color:var(--green)">참</b>이라 <b>true</b>로 접혔다. 그럼 switch의 대조는? — <code>95 === true</code>.',
        },
        {
          code: 'switch ( 95 ) {\n  case true: ✗ 95 === true → 거짓\n  default: g = "?"\n}',
          mark: '95 === true',
          note: '<code>95 === true</code> → <b style="color:var(--red)">거짓!</b> 95는 95일 뿐 true가 아니다 — 조건이 참이었는데도 갈래가 안 열린다.',
        },
        {
          code: 'switch ( 95 ) {\n  case true: ✗ 95 === true → 거짓\n  default: g = "?"\n}',
          mark: 'default:',
          note: '남은 건 <b>default</b>뿐 → <b>g = "?"</b>.',
        },
        {
          code: 'g = "?"   // 🐛 95점인데 등급을 못 받았다 — 에러도 없이',
          note: 'switch는 <b>값 맞추기 자판기</b> — 버튼(값)이 딱 맞아야 나온다. "90 이상?"처럼 <b>범위를 묻는 질문은 if에게</b>. 문법상 합법이라 <b>조용히</b> 틀리는 게 이 함정의 무서운 점이다.',
        },
      ],
    }))

    root.querySelector('[data-m="run1"]').append(Runner({
      code: [
        'let hour = 14, menu = 2, msg',
        '',
        'if (hour >= 9 && hour < 18) {   // 범위 판단 — if의 몫',
        '  switch (menu) {               // 값 하나 다분기 — switch의 몫',
        '    case 1: msg = "주문 접수"; break',
        '    case 2: msg = "배송 조회"; break',
        '    default: msg = "상담사 연결"',
        '  }',
        '} else {',
        '  msg = "영업시간(9~18시)이 아닙니다"',
        '}',
        'print(msg)',
        '',
        '// ─ 출구: 응답을 화면 배지로 (hour = 20, menu = 7 로도 바꿔 보라) ─',
        'box.textContent = msg',
        'box.style.cssText = "padding:14px 22px;font-size:20px;font-weight:800;color:white;border-radius:12px;background:#6BCB77"',
      ].join('\n'),
    }))

    root.querySelector('[data-m="dr"]').append(Drill({
      pattern: '빈칸에 예측값을 넣어라 — 맞으면 true. (글자 답은 따옴표까지: "주문 접수")',
      problems: [
        {
          ask: 'open = true, menu = 1 — if 문을 지나 switch가 고르는 msg는?',
          code: 'let open = true, menu = 1, msg\nif (open) {\n  switch (menu) {\n    case 1: msg = "주문 접수"; break\n    case 2: msg = "배송 조회"; break\n    default: msg = "상담사 연결"\n  }\n} else { msg = "영업 종료" }\nprint((msg) === ____)',
          expect: 'true',
          answer: '"주문 접수"',
          hint: '바깥 if 참 → 몸통 진입 → switch가 1을 case들과 === 대조.',
        },
        {
          ask: 'open = false, menu = 2 — menu는 2지만, switch가 시작이나 할까? msg는?',
          code: 'let open = false, menu = 2, msg\nif (open) {\n  switch (menu) {\n    case 1: msg = "주문 접수"; break\n    case 2: msg = "배송 조회"; break\n    default: msg = "상담사 연결"\n  }\n} else { msg = "영업 종료" }\nprint((msg) === ____)',
          expect: 'true',
          answer: '"영업 종료"',
          hint: '바깥 if가 거짓이면 몸통(switch 전체)은 실행조차 안 된다 — else 갈래로.',
        },
        {
          ask: '🪤 switch로 범위 흉내 — score = 95 인데 g는?',
          code: 'let score = 95, g\nswitch (score) {\n  case score >= 90: g = "A"; break\n  default: g = "?"\n}\nprint((g) === ____)',
          expect: 'true',
          answer: '"?"',
          hint: 'case 식이 true로 접히고, 대조는 95 === true → 거짓. 범위는 if의 일이다.',
        },
        {
          ask: 'open = true, menu = 7 — 어떤 case와도 안 맞는 번호다. msg는?',
          code: 'let open = true, menu = 7, msg\nif (open) {\n  switch (menu) {\n    case 1: msg = "주문 접수"; break\n    case 2: msg = "배송 조회"; break\n    default: msg = "상담사 연결"\n  }\n} else { msg = "영업 종료" }\nprint((msg) === ____)',
          expect: 'true',
          answer: '"상담사 연결"',
          hint: '아무 case도 안 맞으면 default가 잡는다 — if의 마지막 else와 같다.',
        },
      ],
    }))

    wireNav(root)
  }
})()
