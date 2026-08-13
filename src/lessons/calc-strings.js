// 2강 · 계산과 문자열 — 숫자 다루기 · 글자 잇기 · 템플릿 · 형 변환 함정
// javascript.info 매핑에서 드러난 '형 변환' 구멍("5"+3="53")을 여기서 메운다.
// window.Lessons[2] 에 render를 등록. (index.html에 <script>로 추가돼 있어야 함)

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Practices[2] = {
    pattern: '유형: 템플릿 리터럴 `...${____}...` 의 빈칸에 ${변수} 를 넣어 문장 완성하기',
    problems: [
      // ── 기본 유형 1-5 ──
      { label: '안녕 ${name}', ask: 'name(="민지")을 넣어 "안녕, 민지님"이 나오게 하세요.', code: 'let name = "민지"\nprint(`안녕, ____님`)', expect: '"안녕, 민지님"', answer: '${name}', hint: '자리에 넣을 땐 ${이름}' },
      { label: '여기는 ${city}', ask: 'city(="서울")를 넣어 "여기는 서울 입니다"가 나오게.', code: 'let city = "서울"\nprint(`여기는 ____ 입니다`)', expect: '"여기는 서울 입니다"', answer: '${city}', hint: '${city}' },
      { label: '장바구니 ${count}', ask: 'count(=3)를 넣어 "장바구니에 3개"가 나오게.', code: 'let count = 3\nprint(`장바구니에 ____개`)', expect: '"장바구니에 3개"', answer: '${count}', hint: '숫자도 ${ } 안에 그대로' },
      { label: '가격 ${price}', ask: 'price(=5000)를 넣어 "가격: 5000원"이 나오게.', code: 'let price = 5000\nprint(`가격: ____원`)', expect: '"가격: 5000원"', answer: '${price}', hint: '${price}' },
      { label: '${user}님 환영', ask: 'user(="지훈")를 넣어 "지훈님 환영해요"가 나오게.', code: 'let user = "지훈"\nprint(`____님 환영해요`)', expect: '"지훈님 환영해요"', answer: '${user}', hint: '문장 맨 앞에도 ${ }' },
      // ── 유사한 5개 더 6-10 ──
      { label: '오늘의 과일 ${fruit}', ask: 'fruit(="사과")를 넣어 "오늘의 과일: 사과"가 나오게.', code: 'let fruit = "사과"\nprint(`오늘의 과일: ____`)', expect: '"오늘의 과일: 사과"', answer: '${fruit}', hint: '${fruit}' },
      { label: '점수 ${score}', ask: 'score(=95)를 넣어 "점수는 95점"이 나오게.', code: 'let score = 95\nprint(`점수는 ____점`)', expect: '"점수는 95점"', answer: '${score}', hint: '숫자도 ${ } 안에' },
      { label: '${team}팀', ask: 'team(="파랑")을 넣어 "파랑팀 화이팅"이 나오게.', code: 'let team = "파랑"\nprint(`____팀 화이팅`)', expect: '"파랑팀 화이팅"', answer: '${team}', hint: '문장 맨 앞에도 ${ }' },
      { label: '남은 자리 ${seat}', ask: 'seat(=7)을 넣어 "남은 자리 7개"가 나오게.', code: 'let seat = 7\nprint(`남은 자리 ____개`)', expect: '"남은 자리 7개"', answer: '${seat}', hint: '${seat}' },
      { label: '${who} 로그인', ask: 'who(="관리자")를 넣어 "관리자님이 로그인"이 나오게.', code: 'let who = "관리자"\nprint(`____님이 로그인`)', expect: '"관리자님이 로그인"', answer: '${who}', hint: '문장 맨 앞에도 ${ }' },
    ],
  }

  window.Lessons[2] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">2강</span>
        <h2>계산과 문자열 — 숫자를 다루고, 글자를 잇는다</h2>
        <p>값에 이름표만 붙여선 심심하다. 이번엔 값끼리 <b>계산</b>하고, 글자를 <b>합쳐</b> 문장을 만든다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>숫자는 <code>+ - * / %</code>로 계산한다(<b>우선순위</b>는 곱·나눗셈 먼저).
        글자(문자열)는 <code>+</code>로 <b>이어붙이고</b>, 요즘은 <b>템플릿 리터럴</b> <code>\`안녕 \${name}\`</code>로 깔끔하게 끼워 넣는다.
        <b>주의</b>: 숫자와 글자가 <code>+</code>로 만나면 <b>글자로 변한다</b> — <code>"5" + 3 = "53"</code>.</p>
      </div>

      <h3 class="section-title">① 숫자 계산</h3>
      <span class="learn-tag">📎 + - * / 와 나머지 % · 곱·나눗셈이 덧·뺄셈보다 먼저</span>
      <div class="card">
        <div class="file-label">🔬 직접 바꿔서 실행해 보기</div>
        <div data-m="calc"></div>
      </div>
      <ul class="section-list">
        <li><code>*</code> 곱하기 · <code>/</code> 나누기 · <code>%</code> 나머지(<code>7 % 3</code> → 1).</li>
        <li>순서가 헷갈리면 <b>괄호</b>로 강제한다 — <code>(price + tax) * qty</code>.</li>
      </ul>

      <h3 class="section-title">② 글자 잇기 — <code>+</code> 그리고 템플릿 리터럴</h3>
      <span class="learn-tag">📎 옛 방식 "a" + b + "c" → 요즘 방식 \`a\${b}c\` (역따옴표 \` 사용)</span>
      <div class="card">
        <div class="file-label">🔬 두 방식 비교</div>
        <div data-m="concat"></div>
      </div>
      <p class="section-desc">템플릿 리터럴은 <b>역따옴표</b>(<code>\`</code>, 키보드 숫자 1 왼쪽)로 감싸고, 값을 넣을 자리에
      <code>\${ }</code>를 쓴다. 문장이 길수록 <code>+ " " +</code> 범벅보다 훨씬 읽기 쉽다.</p>

      <h3 class="section-title">③ ⚠️ 형 변환 함정 — <code>"5" + 3</code>은 8이 아니다</h3>
      <span class="learn-tag">📎 입문자가 자주 밟는 지뢰 — 입력값·API 값은 대개 '글자(문자열)'다</span>
      <p class="section-desc">화면 입력칸에서 온 값은 <b>숫자처럼 보여도 글자</b>인 경우가 많다.
      <code>+</code>는 한쪽이 글자면 <b>둘 다 글자로 만들어 이어붙인다</b>. 아래로 직접 확인하라.</p>
      <div class="card">
        <div class="file-label">🔬 같은 +인데 결과가 다르다</div>
        <div data-m="coerce"></div>
      </div>
      <ul class="section-list">
        <li><code>"5" + 3</code> → <code>"53"</code> (글자가 이김: 이어붙이기)</li>
        <li><code>"5" * 2</code> → <code>10</code> (곱셈엔 글자를 숫자로 바꿔줌)</li>
        <li>일부러 바꾸기: <code>Number("5")</code> → 숫자 5 · <code>String(5)</code> → 글자 "5"</li>
      </ul>

      <h3 class="section-title">④ 화면으로 — 계산 결과를 카드에</h3>
      <span class="learn-tag">📎 값을 화면(box)에 붙여, 계산이 '보이게' 만든다</span>
      <div class="card">
        <div class="file-label">🔬 장바구니 합계 카드</div>
        <div data-m="card"></div>
      </div>

      <div class="practice-cta">
        <span>🎯 개념은 여기까지. <b>단계별 실습</b>에서 템플릿 \${ } 끼우기를 5문제로 익혀요.</span>
        <button class="chip on" data-goto="2-1">📝 2강 실습 시작 (2-1) →</button>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">숫자는 <code>+ - * / %</code>로 계산(곱·나눗셈 먼저).
        글자는 템플릿 리터럴 <code>\`...\${값}...\`</code>로 잇는다. <b>숫자+글자는 글자가 된다</b> —
        계산하려면 <code>Number()</code>로 먼저 바꿔라.</p>
      </div>
    `

    root.querySelector('[data-m="calc"]').append(Runner({
      showBox: false,
      code: [
        'print(3 + 4)          // 7',
        'print(10 - 2 * 3)     // 4  (곱셈 먼저!)',
        'print((10 - 2) * 3)   // 24 (괄호로 순서 강제)',
        'print(7 / 2)          // 3.5',
        'print(7 % 3)          // 1  (나머지)',
      ].join('\n'),
    }))

    root.querySelector('[data-m="concat"]').append(Runner({
      showBox: false,
      code: [
        'let name = "민지"',
        'let age = 24',
        '',
        '// 옛 방식 — + 로 이어붙이기 (따옴표·공백 챙기기 번거롭다)',
        'print("저는 " + name + "이고, " + age + "살이에요")',
        '',
        '// 요즘 방식 — 템플릿 리터럴 (역따옴표 ` 와 ${ })',
        'print(`저는 ${name}이고, ${age}살이에요`)',
      ].join('\n'),
    }))

    root.querySelector('[data-m="coerce"]').append(Runner({
      showBox: false,
      code: [
        'print("5" + 3)          // "53"  — 글자가 이겨 이어붙임',
        'print(5 + 3)            // 8     — 둘 다 숫자',
        'print("5" * 2)          // 10    — 곱셈은 숫자로 바꿔줌',
        'print(Number("5") + 3)  // 8     — 일부러 숫자로 바꿔서 더함',
        'print(String(5) + 3)    // "53"  — 일부러 글자로 바꿔서 이음',
      ].join('\n'),
    }))

    root.querySelector('[data-m="card"]').append(Runner({
      code: [
        'let item = "머그컵"',
        'let price = 8500',
        'let qty = 3',
        'let total = price * qty      // 계산',
        '',
        '// 계산 결과를 화면 카드로 — 템플릿 리터럴로 HTML을 짠다',
        'box.innerHTML = `',
        '  <div style="font-weight:700;font-size:16px">${item}</div>',
        '  <div style="color:#6b7280">${price}원 × ${qty}개</div>',
        '  <div style="margin-top:6px;font-size:20px;font-weight:800">합계 ${total}원</div>',
        '`',
        'box.style.textAlign = "left"',
        'box.style.padding = "16px"',
      ].join('\n'),
    }))

    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
  }
})()
