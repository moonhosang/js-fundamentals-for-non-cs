// 2강 · 계산과 문자열 — 숫자 다루기 · 글자 잇기 · 템플릿 · 형 변환 함정
// javascript.info 매핑에서 드러난 '형 변환' 구멍("5"+3="53")을 여기서 메운다.
// window.Lessons[2] 에 render를 등록. (index.html에 <script>로 추가돼 있어야 함)

;(function () {
  window.Lessons = window.Lessons || {}
  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills['2'].

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
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/문자열_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">문자열 ↗</a> · <a href="https://ko.wikipedia.org/wiki/부동_소수점" target="_blank" rel="noopener noreferrer">부동소수점(숫자) ↗</a></p>
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

      <h3 class="section-title">③ ⚠️ 형 변환 함정 — <code>"5" + 3</code>은?</h3>
      <div data-m="qz"></div>
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
      <p class="section-desc">정확한 <b>형 변환·강제변환 규칙</b>(<code>==</code> vs <code>===</code>, truthy/falsy까지)은 한곳에 모아 뒀다 → <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button></p>

      <h3 class="section-title">⚠️ NaN — 계산이 실패하면 '숫자 아님'(Not-a-Number)</h3>
      <span class="learn-tag">📎 글자를 숫자로 못 바꾸거나 이상한 계산 → NaN. 함정: NaN은 자기 자신과도 다르다</span>
      <div data-m="qz-nan1"></div>
      <div data-m="qz-nan2"></div>
      <div class="card"><div class="file-label">🔬 NaN은 어디서 나오나 + 자기와도 다름</div><div data-m="nan"></div></div>
      <p class="section-desc">🔑 <code>NaN === NaN</code>이 <b>false</b>라 <code>x === NaN</code>으로는 못 잡는다 — <code>Number.isNaN(x)</code>로 검사한다. (NaN은 에러로 안 터지고 <b>조용히 퍼져</b> 계산을 오염시키는 게 진짜 함정.)</p>

      <h3 class="section-title">④ 화면으로 — 계산 결과를 카드에</h3>
      <span class="learn-tag">📎 값을 화면(box)에 붙여, 계산이 '보이게' 만든다</span>
      <div class="card">
        <div class="file-label">🔬 장바구니 합계 카드</div>
        <div data-m="card"></div>
      </div>

      <div class="practice-cta">
        <span>🎯 개념은 여기까지. <b>단계별 실습</b>에서 템플릿 \${ } 끼우기를 5문제로 익혀요.</span>
        <button class="chip on" data-goto="2:easy">📝 2강 실습 시작 (🟢 쉬움) →</button>
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

    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '<code>"5" + 3</code> 의 결과는? (<code>"5"</code>는 따옴표 있는 <b>글자</b>)',
      options: ['8 (숫자)', '"53" (글자로 이어붙임)', '에러'],
      answer: 1,
      explain: '<code>+</code>는 <b>한쪽이 글자면 둘 다 글자로</b> 만들어 <b>이어붙인다</b> → <code>"53"</code>. 입력칸·API 값은 대개 글자라 이 지뢰를 자주 밟는다. (숫자로 더하려면 <code>Number("5")+3</code>.)',
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

    root.querySelector('[data-m="qz-nan1"]').append(Quiz({
      q: '<code>Number("삼")</code> 처럼 글자를 숫자로 <b>못</b> 바꾸면?',
      options: ['<code>0</code>', '<code>NaN</code> (숫자 아님)', '에러(터진다)'],
      answer: 1,
      explain: '숫자로 바꿀 수 없으면 <b>NaN</b>(Not-a-Number). 에러로 안 터지고 <b>조용히 NaN이 퍼져</b> 이후 계산을 오염시키는 게 함정.',
    }))
    root.querySelector('[data-m="qz-nan2"]').append(Quiz({
      q: '<code>NaN === NaN</code> (같은 NaN끼리) 의 결과는?',
      options: ['<code>true</code> (같은 값이니까)', '<code>false</code> (자기 자신과도 다르다!)', '에러'],
      answer: 1,
      explain: '<b>NaN은 정해진 값이 없어</b> 유일하게 <b>자기 자신과도 같지 않다</b>. 그래서 <code>x === NaN</code>은 늘 false → 검사는 <code>Number.isNaN(x)</code>로.',
    }))
    root.querySelector('[data-m="nan"]').append(Runner({
      showBox: false,
      code: [
        'print(Number("삼"))                 // NaN  (글자를 숫자로 못 바꿈)',
        'print(0 / 0)                        // NaN',
        'print(10 - "가")                    // NaN  (숫자 아닌 걸 빼기)',
        'print(NaN === NaN)                  // false — 자기와도 다르다!',
        'print(Number.isNaN(Number("삼")))   // true  — 이렇게 검사한다',
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

    root.querySelectorAll('[data-goto]').forEach((el) => {
      el.onclick = () => { const t = el.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
    })
  }
})()
