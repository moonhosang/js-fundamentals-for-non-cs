// 7강 · 반복과 map (for · forEach · map · filter · reduce)  ── design-principles 규범
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
        <b>map·filter는 원본을 안 바꾸고 새 배열</b>을 만든다(6강 참조 · 원본 보호). 콜백(함수를 인자로 넘김)은 <b>5강 함수</b>가 바탕.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/반복문" target="_blank" rel="noopener noreferrer">반복문 ↗</a> · <a href="https://ko.wikipedia.org/wiki/고차_함수" target="_blank" rel="noopener noreferrer">고차 함수(map·filter·reduce) ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — "map이 원본 배열을 바꾼다"</div>
        <p class="section-desc" style="margin:0"><code>map</code>·<code>filter</code>는 <b>원본을 건드리지 않고 새 배열을 만들어 돌려준다</b>. 그래서 <b>담아야</b> 쓴다(<code>let 결과 = arr.map(...)</code>). 담지 않으면 만든 새 배열이 그냥 사라진다. (반대로 <code>push</code>는 원본을 바꾼다 — 6강.)</p>
      </div>

      <h3 class="section-title">① for — 번호로 하나씩 훑기</h3>
      <span class="learn-tag">📎 i를 0부터 length 전까지 1씩 — arr[i]로 꺼낸다 (번호는 0부터, 6강)</span>
      <div class="card"><div class="file-label">🔬 for로 순서대로</div><div data-m="for"></div></div>

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
        <button class="chip on" data-goto="7-1">📝 7강 실습 시작 (7-1) →</button>
      </div>
    `

    root.querySelector('[data-m="for"]').append(Runner({ showBox: false, code: [
      'let nums = [10, 20, 30]',
      'for (let i = 0; i < nums.length; i++) {   // i: 0 → 1 → 2',
      '  print(nums[i])                          // 10, 20, 30',
      '}',
    ].join('\n') }))

    root.querySelector('[data-m="foreach"]').append(Runner({ showBox: false, code: [
      'let fruits = ["사과", "배", "귤"]',
      'fruits.forEach(function (f) {   // 각 요소 f로 함수를 실행',
      '  print(f)                      // 사과, 배, 귤',
      '})',
      '',
      'let r = fruits.forEach(function (f) {})',
      'print(r)   // undefined — forEach는 값을 안 돌려준다',
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
      'print(doubled)   // [2,4,6]  (새 배열)',
      'print(nums)      // [1,2,3]  (원본 그대로!)',
    ].join('\n') }))

    root.querySelector('[data-m="mapmem"]').append(MemoryModel({
      title: 'map은 새 배열을 힙에 만든다 — 원본은 그대로',
      stackLabel: '📇 이름표 장부 (변수)',
      code: ['let nums = [1, 2, 3]', 'let doubled = nums.map(n => n * 2)'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'nums', ref: 'h1' }] }], heap: { h1: { label: '[1, 2, 3]' } }, note: 'nums는 값 메모리의 배열 <b>[1,2,3]</b>을 가리킨다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'nums', ref: 'h1' }, { name: 'doubled', ref: 'h2' }] }], heap: { h1: { label: '[1, 2, 3]' }, h2: { label: '[2, 4, 6]' } }, note: 'map은 <b>새 배열 [2,4,6]</b>을 만들어(h2) doubled가 가리킨다. 원본 <b>[1,2,3](h1)은 그대로</b> — 둘은 다른 배열이다.' },
      ],
    }))

    root.querySelector('[data-m="filter"]').append(Runner({ showBox: false, code: [
      'let nums = [1, 2, 3, 4, 5]',
      'let evens = nums.filter(function (n) { return n % 2 === 0 })   // 짝수만 통과',
      'print(evens)   // [2,4]',
      'print(nums)    // [1,2,3,4,5]  (원본 그대로)',
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
      'print(sum)   // 60  (0+10+20+30)',
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

    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
  }

  // 유형 드릴 ×10 — for·map·filter·reduce. 목표 결과가 나오게 스스로 채운다(정답은 문제에 없음).
  window.Practices[7] = {
    pattern: '유형: 목표 출력이 나오도록 빈칸을 채워 ▶확인 (for·map·filter·reduce)',
    problems: [
      { label: 'for 조건', ask: '배열을 끝까지 훑으려면 i는 무엇보다 작아야 할까? (개수)', code: 'let a = [1, 2, 3]\nfor (let i = 0; i < a.____; i++) { print(a[i]) }', expect: '1\n2\n3', answer: 'length', hint: '개수 = .length' },
      { label: 'map ×2', ask: '각 요소를 2배로 만들어 [2,4,6]이 되게.', code: 'let n = [1, 2, 3]\nlet d = n.map(function (x) { return x * ____ })\nprint(d)', expect: '[2,4,6]', answer: '2', hint: 'x * 2' },
      { label: 'map +1', ask: '각 요소에 1을 더해 [2,3,4]가 되게 — return에 무엇을?', code: 'let n = [1, 2, 3]\nlet d = n.map(function (x) { return ____ })\nprint(d)', expect: '[2,3,4]', answer: 'x + 1', hint: 'x + 1' },
      { label: 'filter >2', ask: '2보다 큰 것만 남겨 [3,4]가 되게.', code: 'let n = [1, 2, 3, 4]\nlet r = n.filter(function (x) { return x > ____ })\nprint(r)', expect: '[3,4]', answer: '2', hint: 'x > 2' },
      { label: 'reduce 합', ask: '누적값 acc에 n을 더해 합계 60이 되게 — 무슨 연산?', code: 'let n = [10, 20, 30]\nlet s = n.reduce(function (a, b) { return a ____ b }, 0)\nprint(s)', expect: '60', answer: '+', hint: '더하기' },
      { label: 'forEach 합', ask: 'sum에 각 x를 더해 6이 되게 — 무슨 연산?', code: 'let nums = [1, 2, 3]\nlet sum = 0\nnums.forEach(function (x) { sum = sum ____ x })\nprint(sum)', expect: '6', answer: '+', hint: 'sum + x' },
      { label: 'map 원본', ask: 'map을 써도 원본 n의 개수는 그대로 3. 개수를 꺼내려면?', code: 'let n = [1, 2, 3]\nn.map(function (x) { return x * 2 })\nprint(n.____)', expect: '3', answer: 'length', hint: 'map은 원본 안 바꿈' },
      { label: 'filter 짝수', ask: '짝수만 남기려면 나머지가 무엇과 같아야? [2,4,6]', code: 'let n = [1, 2, 3, 4, 5, 6]\nlet r = n.filter(function (x) { return x % 2 === ____ })\nprint(r)', expect: '[2,4,6]', answer: '0', hint: '짝수 = 나머지 0' },
      { label: 'reduce 곱', ask: '다 곱해서 24가 되게 — 시작값은? (곱셈의 시작)', code: 'let n = [2, 3, 4]\nlet p = n.reduce(function (a, b) { return a * b }, ____)\nprint(p)', expect: '24', answer: '1', hint: '곱셈 시작값 = 1' },
      { label: 'map 메서드', ask: '각 글자를 대문자로 바꿔 ["A","B"]가 되게 — 무슨 메서드?', code: 'let names = ["a", "b"]\nlet up = names.map(function (s) { return s.____() })\nprint(up)', expect: '["A","B"]', answer: 'toUpperCase', hint: '대문자 = toUpperCase' },
    ],
  }
})()
