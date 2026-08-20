// 7강 · 반복과 map (for · while · forEach · map · filter · reduce)  ── design-principles 규범
// 오해: map/filter가 원본을 바꾼다?(→ 새 배열!) · forEach도 값을 돌려준다?(→ undefined) · reduce는 마법?(→ 하나로 접기)
// 왜:  for=번호로 훑기 · forEach=각 요소에 실행(반환X) · map=변환해 새 배열 · filter=조건 통과만 새 배열 · reduce=누적해 하나로
// 대비: forEach(실행·반환X) vs map(변환·새 배열) · map(전부 변환) vs filter(거르기) · 원본 안 바뀜(map/filter) vs 바뀜(push)

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Lessons[7] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">7강</span>
        <h2>반복과 map — 목록을 훑고, 통째로 바꾸기</h2>
        <p>값이 여러 개(배열)면 하나씩 <b>훑고</b>, 통째로 <b>바꾸고</b>, <b>거르고</b>, 하나로 <b>합친다</b>. 손으로 열 번 쓰지 말고 도구에 맡긴다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><code>for</code>·<code>forEach</code>로 훑고, <code>map</code>으로 <b>변환(새 배열)</b>, <code>filter</code>로 <b>거르고</b>, <code>reduce</code>로 <b>하나로 합친다</b>.
        <b>map·filter는 원본을 안 바꾸고 새 배열</b>을 만든다(6강 참조 · 원본 보호). 콜백(함수를 인자로 넘김)은 <b>5강 함수</b>가 바탕 — JS에선 <b>함수도 값</b>이라 변수에 담고 인자로 넘길 수 있다(정식 용어: <b>일급 함수</b>). 그런 함수를 받아 쓰는 map·filter 같은 걸 <b>고차 함수</b>라 한다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/반복문" target="_blank" rel="noopener noreferrer">반복문 ↗</a> · <a href="https://ko.wikipedia.org/wiki/고차_함수" target="_blank" rel="noopener noreferrer">고차 함수(map·filter·reduce) ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — "map이 원본 배열을 바꾼다"</div>
        <p class="section-desc" style="margin:0"><code>map</code>·<code>filter</code>는 <b>원본을 건드리지 않고 새 배열을 만들어 돌려준다</b>. 그래서 <b>담아야</b> 쓴다(<code>let 결과 = arr.map(...)</code>). 담지 않으면 만든 새 배열이 그냥 사라진다. (반대로 <code>push</code>는 원본을 바꾼다 — 6강.)</p>
      </div>

      <h3 class="section-title">① for — 번호로 하나씩 훑기</h3>
      <span class="learn-tag">📎 i를 0부터 length 전까지 1씩 — arr[i]로 꺼낸다 (번호는 0부터, 6강)</span>
      <div class="card"><div class="file-label">🔬 for로 순서대로</div><div data-m="for"></div></div>

      <h3 class="section-title">🔁 for가 '도는' 원리 — 조건이 매 바퀴 접힌다 (⏱ 시간 시뮬레이션)</h3>
      <span class="learn-tag">📎 <code>if</code>·<code>for</code>·<code>while</code>의 (괄호 안)은 전부 <b>표현식</b> → <b>expr → factor(축약) → 참/거짓(truthy·falsy)</b>으로 접혀 갈림/반복을 정한다</span>
      <p class="section-desc">한 번 봐선 안 붙는다 — <b>다음 ▶을 눌러 시간 순서대로</b> 밟아 보라. 먼저 <b>if</b>(딱 한 번 검사), 그다음 <b>for</b>(조건이 거짓이 될 때까지 매 바퀴 다시 검사).</p>
      <div class="card"><div class="file-label">🔬 if — 조건이 한 번 접힌다:  if (age >= 19)  ·  age = 20</div><div data-m="cond-if"></div></div>
      <div class="card"><div class="file-label">🔬 for — 매 바퀴 조건이 다시 접힌다:  for (i=0; i&lt;3; i++)</div><div data-m="cond-for"></div></div>
      <div data-m="qz-loop"></div>
      <p class="section-desc">🔑 <b>if는 딱 한 번, for는 매 바퀴</b> 조건을 다시 접는다 — 그래서 for엔 '시간'이 흐른다. 괄호 안 원리는 셋 다 <b>완전히 같다</b>(값 → 참/거짓). 더 깊이: <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button> · <button class="inline-goto" data-goto="4">4강 · 조건</button> · <button class="inline-goto" data-goto="3-6">3-6 · 조건도 표현식</button>.</p>

      <h3 class="section-title">🔁 while — 조건만 남은 반복, 카운터는 내 손으로</h3>
      <span class="learn-tag">📎 <code>while (조건) { 몸통 }</code> — 매 바퀴 조건을 <b>다시 값으로 접어</b> 참이면 한 바퀴 더 · 단, 카운터는 <b>내가 직접</b> 움직인다</span>
      <p class="section-desc">☕ 현실 그대로다: <b>커피가 남아 있는 동안(while) 계속 마신다</b> — 한 모금씩 줄여야(<code>n--</code>) 언젠가 끝난다. 줄이지 않으면? 영원히 마신다. 코드도 똑같다. 시뮬레이션을 보기 전에 <b>먼저 예측</b>해 보라.</p>
      <div data-m="qz-while"></div>
      <div data-m="qz-while2"></div>
      <p class="section-desc">이제 <b>다음 ▶으로 한 바퀴씩</b> 밟아 보라 — 위 for(cond-for)와 <b>완전히 같은 리듬</b>이다: 매 바퀴 괄호 안을 다시 접는다.</p>
      <div class="card"><div class="file-label">🔬 while — 매 바퀴 조건이 다시 접힌다:  while (n &gt; 0)  ·  n = 3</div><div data-m="sim-while"></div></div>
      <div class="card"><div class="file-label">🔬 진짜 도는 while — 카운트다운 · 잔액이 남는 동안</div><div data-m="while-run"></div></div>
      <div data-m="while-drill"></div>
      <p class="section-desc">🔑 <b>while (조건)도 위 for와 같은 심장</b> — 매 바퀴 괄호 안 <b>표현식을 다시 값으로 접어</b>(expr → 참/거짓) 참이면 한 바퀴 더, 거짓이면 끝. 다른 건 딱 하나: for는 <code>(초기화; 조건; 증감)</code>이 한 줄에 모여 있고, while은 <b>카운터를 내 손으로</b>(<code>n--</code>) 움직여야 한다 — 안 움직이면 조건이 영원히 참, <b>무한루프</b>. 고르는 법: <b>몇 번 돌지 미리 알면 for, '언제 끝나는지'를 조건으로만 알면 while</b>(잔액이 남는 동안, 입력이 있는 동안). 괄호 안 원리 복습: <button class="inline-goto" data-goto="3-6">3-6 · 조건도 표현식</button> · <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button>.</p>

      <h3 class="section-title">② forEach — 각 요소에 '실행'만 (값은 안 돌려줌)</h3>
      <span class="learn-tag">📎 forEach는 각 요소로 함수를 실행할 뿐 — 결과를 안 돌려준다(undefined). 변환하려면 map!</span>
      <div class="card"><div class="file-label">🔬 forEach로 각각 출력</div><div data-m="foreach"></div></div>
      <div data-m="qz-fe"></div>

      <h3 class="section-title">③ map — 각 요소를 '변환'해 새 배열</h3>
      <span class="learn-tag">📎 map = "모든 요소를 이 함수로 바꿔 새 배열" · 원본은 그대로!</span>
      <div data-m="qz-map"></div>
      <div class="card"><div class="file-label">🔬 두 배로 바꾸기 (원본 확인)</div><div data-m="map"></div></div>
      <div data-m="mapmem"></div>
      <p class="section-desc">그래서 <code>map</code>은 <b>담아야</b> 쓸모가 있다 — <code>let doubled = nums.map(...)</code>. 원본 <code>nums</code>는 <b>그대로</b> 남아 있어 안전하다.</p>
      <p class="section-desc" style="opacity:.9">🔗 <code>map</code>에 넘긴 이 함수가 바로 <b>5-7에서 본 화살표가 빛나는 그 자리</b>다 — 위 실행의 <code>function (n) { return n * 2 }</code>를 <code>n => n * 2</code>로 쓰면 껍데기 없이 <b>변환만</b> 남는다: <code>nums.map(n => n * 2)</code>(둘은 <b>똑같은 함수</b>). <button class="inline-goto" data-goto="5-7">5-7 · 화살표</button></p>

      <h3 class="section-title">④ filter — 조건에 맞는 것만 거르기</h3>
      <span class="learn-tag">📎 filter = "이 조건이 true인 요소만" 새 배열로 (4강 조건이 바탕)</span>
      <div class="card"><div class="file-label">🔬 짝수만 거르기</div><div data-m="filter"></div></div>

      <h3 class="section-title">⑤ reduce — 여러 값을 하나로 '접기'</h3>
      <span class="learn-tag">📎 reduce = "누적값(acc)에 하나씩 더해가며 하나로" — 합계·최댓값 등</span>
      <div data-m="qz-reduce"></div>
      <div class="card"><div class="file-label">🔬 합계 구하기 (0에서 시작해 누적)</div><div data-m="reduce"></div></div>
      <p class="section-desc"><code>reduce(콜백, 시작값)</code> — <code>acc</code>(누적)에 각 요소를 콜백대로 합쳐 <b>하나</b>로 만든다. 합계는 <code>acc + n</code>, 곱은 <code>acc * n</code>. 처음엔 어렵지만 "누적 상자에 하나씩 담는다"로 보면 쉽다.</p>

      <h3 class="section-title">⑥ 화면 — 데이터 배열을 카드 목록으로</h3>
      <span class="learn-tag">📎 실전 패턴 — 데이터 배열 → map/forEach로 화면에 카드 여러 개</span>
      <div class="card"><div class="file-label">🔬 상품 목록을 카드로 (배열을 바꿔 실행)</div><div data-m="cards"></div></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>훑기</b> for·forEach(반환X) · <b>변환</b> map(새 배열) · <b>거르기</b> filter(새 배열) · <b>합치기</b> reduce(하나로).
        <b>map·filter는 원본을 안 바꾸니 담아서</b> 쓴다. 콜백은 5강 함수.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>단계별 실습</b>으로 — for·map·filter·reduce를 손에 붙이자 (10문제).</span>
        <button class="chip on" data-goto="7:easy">📝 7강 실습 시작 (🟢 쉬움) →</button>
      </div>
    `

    root.querySelector('[data-m="for"]').append(Runner({ showBox: false, code: [
      'let nums = [10, 20, 30]',
      'for (let i = 0; i < nums.length; i++) {   // i: 0 → 1 → 2',
      '  print(nums[i])                          // 10, 20, 30',
      '}',
    ].join('\n') }))

    // ⏱ 조건이 expr → factor → 참/거짓으로 접히는 '시간 시뮬레이션' — if(1회)와 for(매 바퀴). 위젯 재사용.
    root.querySelector('[data-m="cond-if"]').append(ExprReduce({
      title: 'if (age >= 19)   // age = 20',
      steps: [
        { code: 'if ( age >= 19 )', mark: 'age >= 19', note: '① 괄호 안은 <b>표현식</b> — 먼저 값 하나로 접는다(3강 축약).' },
        { code: 'if ( 20 >= 19 )', mark: '20 >= 19', note: '② age에 지금 값 <b>20</b>을 넣는다.' },
        { code: 'if ( true )', note: '③ <b>factor 비교</b> → <b>true</b>. 조건 자리에선 이 값을 <b>truthy/falsy로</b> 본다 → <b style="color:var(--green)">✅ 참(truthy)</b>.' },
        { code: '✅ 참  →  입장() 실행', note: '조건이 <b>참</b> → 몸통 <b>실행</b>(거짓이면 건너뜀). if는 이 검사를 <b>딱 한 번</b> 한다.' },
      ],
    }))
    root.querySelector('[data-m="cond-for"]').append(ExprReduce({
      title: 'for (let i = 0; i < 3; i++)  total += i     // total: 0',
      steps: [
        { code: 'i = 0 ,  total = 0', note: '🚦 시작. 반복은 <b>매 바퀴 조건 (i < 3)</b>을 먼저 검사한다 — 그게 바로 <b>표현식</b>이다.' },
        { code: 'i < 3     // i = 0', mark: 'i < 3', note: '<b>1바퀴</b> · ① <b>표현식</b> → i에 0을 넣는다.' },
        { code: '0 < 3', mark: '0 < 3', note: '① → ② <b>factor 비교</b>로 축약.' },
        { code: 'true  →  ✅ 참  →  몸통 실행', note: '② → ③ <b>true</b> → <b style="color:var(--green)">참(truthy)</b> → total = 0 + 0 = <b>0</b>. 그다음 <b>i++ → i = 1</b>, 다시 조건으로.' },
        { code: 'i < 3     // i = 1', mark: 'i < 3', note: '<b>2바퀴</b> · 같은 과정 반복 — i에 1을 넣는다.' },
        { code: '1 < 3  →  true  →  ✅ 참', note: '<b style="color:var(--green)">참</b> → total = 0 + 1 = <b>1</b>. i++ → i = 2.' },
        { code: 'i < 3     // i = 2', mark: 'i < 3', note: '<b>3바퀴</b> — i에 2를 넣는다.' },
        { code: '2 < 3  →  true  →  ✅ 참', note: '<b style="color:var(--green)">참</b> → total = 1 + 2 = <b>3</b>. i++ → i = 3.' },
        { code: 'i < 3     // i = 3', mark: 'i < 3', note: '<b>4바퀴 검사</b> — i에 3을 넣는다.' },
        { code: '3 < 3  →  false  →  ❌ 거짓', note: '<b style="color:var(--red)">거짓(falsy)</b> → 반복 <b>종료</b>. 최종 total = <b>3</b>. 조건이 거짓이 되는 순간 for가 멈춘다.' },
      ],
    }))
    root.querySelector('[data-m="qz-loop"]').append(Quiz({
      q: '<code>for (let i = 0; i &lt; 3; i++)</code> 는 몸통을 <b>몇 번</b> 실행하나?',
      options: ['2번', '3번 (i = 0, 1, 2)', '4번'],
      answer: 1,
      explain: '조건 <code>i &lt; 3</code>이 <b>참인 동안</b>만 실행 — i=0·1·2에서 참이라 <b>3번</b>, i=3에서 <code>3 &lt; 3 = 거짓</code>이라 멈춘다.',
    }))

    // 🔁 while — for와 같은 심장(매 바퀴 expr→참/거짓), 다른 건 카운터가 내 손이라는 것뿐.
    root.querySelector('[data-m="qz-while"]').append(Quiz({
      q: '🔮 예측 — <code>let n = 3; while (n &gt; 0) { n-- }</code> 몸통은 <b>몇 번</b> 실행되나?',
      options: ['2번', '3번 (n = 3, 2, 1)', '4번 (n = 0까지)'],
      answer: 1,
      explain: 'while도 위 for처럼 <b>매 바퀴 <code>n &gt; 0</code>을 다시 접는다</b> — 3&gt;0 참, 2&gt;0 참, 1&gt;0 참, 그리고 <code>0 &gt; 0</code>은 <b>거짓</b>이라 멈춘다. 참이었던 <b>3번</b>만 실행.',
    }))
    root.querySelector('[data-m="qz-while2"]').append(Quiz({
      q: '🔮 예측 — 위 코드에서 <code>n--</code>를 <b>지우면</b> 어떻게 되나?',
      options: ['그래도 3번 돌고 멈춘다', 'n이 안 변해 한 번만 돈다', '영원히 안 멈춘다 (무한루프)'],
      answer: 2,
      explain: '멈춤은 공짜가 아니다 — <b>매 바퀴 조건을 거짓 쪽으로 밀 무언가(<code>n--</code>)가 몸통에 반드시 있어야</b> 한다. n이 영원히 3이면 <code>3 &gt; 0</code>은 매 바퀴 참 → 브라우저 탭이 멈출 때까지 돈다. for는 <code>i++</code>가 괄호 안에 붙박이라 잊기 어렵지만, while은 <b>내 손</b>에 달렸다.',
    }))
    root.querySelector('[data-m="sim-while"]').append(ExprReduce({
      title: 'let n = 3;  while (n > 0) { print(n); n-- }',
      steps: [
        { code: 'n = 3', note: '🚦 시작. while도 위 for와 <b>완전히 같은 심장</b> — <b>매 바퀴 괄호 안 (n > 0)</b>을 먼저 값으로 접는다. 초기화는 while <b>바깥</b>에 내가 썼다.' },
        { code: 'n > 0     // n = 3', mark: 'n > 0', note: '<b>1바퀴</b> · ① 괄호 안은 <b>표현식</b> → n에 지금 값 3을 넣는다.' },
        { code: '3 > 0  →  true  →  ✅ 참', note: '② <b>factor 비교</b> → <b style="color:var(--green)">참(truthy)</b> → 몸통 실행: print(3), 그리고 <b>n-- → n = 2</b>. 이 n--는 for의 i++와 달리 <b>내가 몸통에 직접 쓴 것</b>이다.' },
        { code: 'n > 0     // n = 2', mark: 'n > 0', note: '<b>2바퀴</b> · 같은 과정 — n에 2를 넣는다.' },
        { code: '2 > 0  →  true  →  ✅ 참', note: '<b style="color:var(--green)">참</b> → print(2) → n-- → n = 1.' },
        { code: 'n > 0     // n = 1', mark: 'n > 0', note: '<b>3바퀴</b> — n에 1을 넣는다.' },
        { code: '1 > 0  →  true  →  ✅ 참', note: '<b style="color:var(--green)">참</b> → print(1) → n-- → n = 0. n--가 매 바퀴 조건을 <b>거짓 쪽으로</b> 밀어 왔다.' },
        { code: 'n > 0     // n = 0', mark: 'n > 0', note: '<b>4바퀴 검사</b> — n에 0을 넣는다.' },
        { code: '0 > 0  →  false  →  ❌ 거짓 → 종료', note: '<b style="color:var(--red)">거짓(falsy)</b> → 반복 <b>종료</b>. 만약 n--가 없었다면 n은 영원히 3 — <b>이 마지막 줄이 영원히 오지 않는다(무한루프)</b>.' },
      ],
    }))
    root.querySelector('[data-m="while-run"]').append(Runner({ showBox: false, code: [
      'let n = 3',
      'while (n > 0) {   // 매 바퀴 (n > 0)을 다시 접는다 — 위 시뮬레이션 그대로',
      '  print(n)        // 3, 2, 1',
      '  n--             // ★ 내가 직접 줄인다 — 이 줄을 빼먹으면 무한루프!',
      '}',
      '',
      'let money = 10000, cups = 0',
      'while (money >= 3500) {   // 몇 바퀴일지 미리 모른다 — "잔액이 남는 동안"만 안다',
      '  money -= 3500           // 커피 한 잔',
      '  cups++',
      '}',
      'print(cups + "잔 마시고 " + money + "원 남음")   // 2잔 마시고 3000원 남음',
    ].join('\n') }))
    root.querySelector('[data-m="while-drill"]').append(Drill({
      pattern: '빈칸에 예측값을 넣어라 — 맞으면 true. (전부 반드시 끝나는 while — 몸통 속 무언가가 조건을 거짓 쪽으로 민다.)',
      problems: [
        { ask: '몇 바퀴 도나 — c가 센다', code: 'let n = 3, c = 0; while (n > 0) { n--; c++ } print(c === ____)', expect: 'true', answer: '3', hint: '3>0, 2>0, 1>0 참 — 0>0에서 멈춤' },
        { ask: '끝난 뒤 n은? (2씩 감소)', code: 'let n = 5; while (n > 0) { n = n - 2 } print(n === ____)', expect: 'true', answer: '-1', hint: '5 → 3 → 1 → -1 — 마지막 검사 -1>0은 거짓' },
        { ask: '잔액이 남는 동안 — 몇 잔?', code: 'let money = 10000, cups = 0; while (money >= 3500) { money -= 3500; cups++ } print(cups === ____)', expect: 'true', answer: '2', hint: '10000 → 6500 → 3000 — 3000은 3500 미만' },
        { ask: '문자열이 다 자랄 때까지', code: 'let s = "ha"; while (s.length < 6) { s = s + "ha" } print(s === ____)', expect: 'true', answer: '"hahaha"', hint: '길이 2 → 4 → 6 — 6<6 거짓 (따옴표!)' },
      ],
    }))

    root.querySelector('[data-m="foreach"]').append(Runner({ showBox: false, code: [
      'let fruits = ["사과", "배", "귤"]',
      'fruits.forEach(function (f) {   // 각 요소 f로 함수를 실행',
      '  print(f)                      // 사과, 배, 귤',
      '})',
      '',
      'let r = fruits.forEach(function (f) {})',
      'print(r)   // undefined',
      '// forEach는 값을 안 돌려준다',
    ].join('\n') }))

    root.querySelector('[data-m="qz-fe"]').append(Quiz({
      q: '<code>let r = [1, 2, 3].forEach(function(x){ return x * 2 })</code> — <b>r</b>은?',
      options: ['[2, 4, 6]', 'undefined (forEach는 값을 안 돌려줌)', '[1, 2, 3]'],
      answer: 1,
      explain: '<code>forEach</code>는 각 요소로 함수를 <b>실행만</b> 하고 <b>아무것도 돌려주지 않는다</b>(undefined). 변환한 새 배열이 필요하면 <b>map</b>을 써야 한다.',
    }))

    root.querySelector('[data-m="qz-map"]').append(Quiz({
      q: '<code>let d = nums.map(n => n * 2)</code> 실행 뒤, 원본 <b>nums</b>는?',
      options: ['두 배로 바뀐다', '그대로다 (map은 새 배열을 만들 뿐)'],
      answer: 1,
      explain: '<code>map</code>은 <b>원본을 건드리지 않고</b> 변환된 <b>새 배열</b>을 만들어 돌려준다. 원본 nums는 그대로 — 그래서 <code>let d =</code>로 <b>담아야</b> 결과를 쓴다.',
    }))

    root.querySelector('[data-m="map"]').append(Runner({ showBox: false, code: [
      'let nums = [1, 2, 3]',
      'let doubled = nums.map(function (n) { return n * 2 })   // 각 요소 × 2',
      'print(doubled)   // [2,4,6]',
      '// 새 배열',
      'print(nums)      // [1,2,3]',
      '// 원본 그대로!',
    ].join('\n') }))

    root.querySelector('[data-m="mapmem"]').append(MemoryModel({
      title: 'map은 새 배열을 힙에 만든다 — 원본은 그대로',
      stackLabel: '📇 이름표 장부 (변수)',
      code: ['let nums = [1, 2, 3]', 'let doubled = nums.map(n => n * 2)'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'nums', ref: 'h1' }] }], heap: { h1: { label: '[1, 2, 3]' } }, note: 'nums는 값 메모리의 배열 <b>[1,2,3]</b>을 가리킨다.', engine: '원본 배열은 힙에 연속 backing store로 놓인다. 1·2·3은 SMI라 밀집(PACKED_SMI) 저장. 슬롯 nums엔 포인터만.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'nums', ref: 'h1' }, { name: 'doubled', ref: 'h2' }] }], heap: { h1: { label: '[1, 2, 3]' }, h2: { label: '[2, 4, 6]' } }, note: 'map은 <b>새 배열 [2,4,6]</b>을 만들어(h2) doubled가 가리킨다. 원본 <b>[1,2,3](h1)은 그대로</b> — 둘은 다른 배열이다.', engine: 'map: 원본은 읽기만 하고, 길이가 같은 새 배열 h2를 힙에 따로 할당해 채운다. 콜백이 각 요소마다 호출되며 인라인 캐시(IC)로 가속되고, n*2 결과도 SMI라 밀집 저장. h1과 h2는 서로 다른 backing store라 원본은 불변.' },
      ],
    }))

    root.querySelector('[data-m="filter"]').append(Runner({ showBox: false, code: [
      'let nums = [1, 2, 3, 4, 5]',
      'let evens = nums.filter(function (n) { return n % 2 === 0 })   // 짝수만 통과',
      'print(evens)   // [2,4]',
      'print(nums)    // [1,2,3,4,5]',
      '// 원본 그대로',
    ].join('\n') }))

    root.querySelector('[data-m="qz-reduce"]').append(Quiz({
      q: '<code>[10, 20, 30].reduce((acc, n) => acc + n, 0)</code> 의 결과는?',
      options: ['[10, 20, 30]', '60 (0에서 시작해 다 더함)', '30'],
      answer: 1,
      explain: '<code>reduce</code>는 시작값 0에 각 요소를 <b>누적</b>한다 — 0+10=10, +20=30, +30=<b>60</b>. 여러 값을 <b>하나</b>로 접는다.',
    }))

    root.querySelector('[data-m="reduce"]').append(Runner({ showBox: false, code: [
      'let nums = [10, 20, 30]',
      'let sum = nums.reduce(function (acc, n) {   // acc=누적, n=이번 요소',
      '  return acc + n',
      '}, 0)   // 0에서 시작',
      'print(sum)   // 60',
      '// 0+10+20+30',
    ].join('\n') }))

    root.querySelector('[data-m="cards"]').append(Runner({ code: [
      'let products = ["🍎 사과 1200원", "🍞 빵 3000원", "🥛 우유 2500원"]',
      '',
      'products.forEach(function (p) {',
      '  let card = document.createElement("div")',
      '  card.textContent = p',
      '  card.style.cssText = "padding:10px 14px;margin:4px;border-radius:10px;background:#eef2ff;color:#4338ca;font-weight:700"',
      '  box.append(card)',
      '})',
      'print(products.length + "개 상품")',
    ].join('\n') }))

    root.querySelectorAll('[data-goto]').forEach((el) => {
      el.onclick = () => { const t = el.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
    })
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
