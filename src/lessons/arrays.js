// 4강 · 배열 (만들기 · 인덱스 · length · push · 힙)  ── design-principles 규범
// 오해: 인덱스는 1부터?(0부터!) · arr[length]는 마지막?(undefined) · 배열은 스택?(힙·참조)
// 왜:  0-based=시작에서 몇 칸 떨어졌나 · length=개수, 마지막 인덱스=length-1
// 대비: arr[0](첫째) vs arr[length-1](마지막) · push(원본 바뀜) vs 새 배열

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Lessons[5] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">5강</span>
        <h2>배열 — 여러 값을 한 줄로</h2>
        <p>값이 여러 개면 이름을 여러 개 만들 필요 없다. <b>배열</b> <code>[ ]</code>에 <b>순서대로</b> 담고, <b>번호(인덱스)</b>로 꺼낸다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>배열은 <code>[ ]</code>로 만들고 <code>arr[번호]</code>로 꺼낸다. <b>번호는 0부터</b>. <code>arr.length</code>는 개수,
        마지막은 <code>arr[length - 1]</code>. <code>push</code>로 끝에 추가한다. 배열은 <b>객체 → 힙</b>에 산다.</p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 함정 — 번호는 0부터</div>
        <p class="section-desc" style="margin:0">사물함 줄을 떠올려라 — 첫 칸이 <b>0번</b>, 그다음 1번, 2번… 그래서 <b>첫 번째는 <code>arr[0]</code></b>, 세 개면 마지막은 <code>arr[2]</code>다.
        <code>arr[3]</code>(칸 밖)은 에러가 아니라 <b><code>undefined</code></b>(빈손)를 준다.</p>
      </div>

      <h3 class="section-title">① 만들기 & 꺼내기 — 번호는 0부터</h3>
      <span class="learn-tag">📎 사물함: 0번·1번·2번 … 첫째 = arr[0]</span>
      <div class="card">
        <div class="file-label">🔬 인덱스로 꺼내 보기</div>
        <div data-m="idx"></div>
      </div>

      <h3 class="section-title">② length & 마지막 — 개수 vs 마지막 번호</h3>
      <span class="learn-tag">📎 length는 개수(3), 마지막 번호는 length-1(2). arr[length]는 undefined!</span>
      <div class="card">
        <div class="file-label">🔬 개수와 마지막</div>
        <div data-m="len"></div>
      </div>

      <h3 class="section-title">③ 추가 & 바꾸기 — push, arr[i] =</h3>
      <span class="learn-tag">📎 push는 끝에 추가(원본이 늘어난다) · arr[i] = 로 그 칸을 바꾼다</span>
      <div class="card">
        <div class="file-label">🔬 추가하고 바꾸고 (값 + 화면 칩)</div>
        <div data-m="push"></div>
      </div>

      <h3 class="section-title">④ 배열은 힙에 산다 — 변수는 참조</h3>
      <span class="learn-tag">📎 배열도 객체 → 힙. 변수는 스택에서 힙을 참조(주소만). (🧠 메모리 기초와 연결)</span>
      <div data-m="heap"></div>
      <p class="section-desc">그래서 배열을 다른 변수에 넣거나 함수에 넘기면 <b>같은 배열</b>을 공유한다(원본이 바뀜). 원본을 지키려면 <b>복사본</b> <code>[...arr]</code>을 쓴다(뒤 강의).</p>

      <h3 class="section-title">⑤ 화면 — 배열을 칩으로 그리기</h3>
      <span class="learn-tag">📎 눈으로 — 색 배열을 그대로 색칩 팔레트로</span>
      <div class="card">
        <div class="file-label">🔬 색 팔레트 (배열을 바꿔서 실행)</div>
        <div data-m="chips"></div>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">배열 <code>[ ]</code>는 값을 <b>순서대로</b>. <code>arr[번호]</code>로 꺼내고 <b>번호는 0부터</b>,
        마지막은 <code>arr[length - 1]</code>. <code>push</code>로 추가. 배열은 <b>힙</b>에 살고 변수는 <b>참조</b>한다.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>단계별 실습</b>으로 — 번호·length·push를 손에 붙이자 (10문제).</span>
        <button class="chip on" data-goto="5-1">📝 5강 실습 시작 (5-1) →</button>
      </div>
    `

    root.querySelector('[data-m="idx"]').append(Runner({
      showBox: false,
      code: [
        'let fruits = ["사과", "배", "귤"]',
        'print(fruits[0])   // "사과"  (첫째 = 0번!)',
        'print(fruits[1])   // "배"',
        'print(fruits[2])   // "귤"   (셋 중 마지막 = 2번)',
        'print(fruits[3])   // undefined  (칸 밖 → 빈손)',
      ].join('\n'),
    }))

    root.querySelector('[data-m="len"]').append(Runner({
      showBox: false,
      code: [
        'let nums = [10, 20, 30]',
        'print(nums.length)              // 3   (개수)',
        'print(nums[nums.length - 1])    // 30  (마지막 = length-1)',
        'print(nums[nums.length])        // undefined  (length번은 칸 밖! 함정)',
      ].join('\n'),
    }))

    root.querySelector('[data-m="push"]').append(Runner({
      code: [
        'let cart = ["우유", "빵"]',
        'cart.push("계란")        // 끝에 추가 → 원본이 늘어난다',
        'cart[0] = "두유"          // 0번 칸을 바꾼다',
        'print(cart)              // ["두유","빵","계란"]',
        'print(cart.length)       // 3',
        '',
        '// 화면 칩으로',
        'cart.forEach(function (item) {',
        '  let chip = document.createElement("span")',
        '  chip.textContent = item',
        '  chip.style.cssText = "display:inline-block;padding:8px 14px;margin:3px;border-radius:999px;background:#eef2ff;color:#4338ca;font-weight:700"',
        '  box.append(chip)',
        '})',
      ].join('\n'),
    }))

    root.querySelector('[data-m="heap"]').append(MemoryModel({
      title: '배열은 힙에 산다 — 변수는 참조(주소만)',
      code: ['let nums = [10, 20, 30]', 'nums.push(40)'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'nums', ref: 'h1' }] }], heap: { h1: { label: '[10, 20, 30]' } }, note: '배열은 <b>객체</b> → <b>힙</b>에 만들어진다. 변수 nums는 스택에서 힙을 <b>참조</b>(주소만 가진다).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'nums', ref: 'h1' }] }], heap: { h1: { label: '[10, 20, 30, 40]' } }, note: 'push하면 <b>힙의 배열</b>이 커진다. 변수 nums는 그대로 — 같은 배열을 가리킨 채.' },
      ],
    }))

    root.querySelector('[data-m="chips"]').append(Runner({
      code: [
        'let palette = ["#FF6B6B", "#4D96FF", "#6BCB77", "#FFD93D"]',
        '',
        'palette.forEach(function (color) {',
        '  let chip = document.createElement("span")',
        '  chip.style.cssText = "display:inline-block;width:48px;height:48px;border-radius:10px;margin:4px;background:" + color',
        '  box.append(chip)',
        '})',
        'print("색 " + palette.length + "개")',
      ].join('\n'),
    }))

    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
  }

  // 유형 드릴 ×10 — 인덱스/length/push. 1-5 기본(만들기·꺼내기·length), 6-10 유사(push·바꾸기·응용).
  window.Practices[5] = {
    pattern: '유형: 빈칸을 채워 배열에서 원하는 값·개수가 나오게 하기 (번호는 0부터!)',
    problems: [
      { label: '첫째 = a[0]', ask: '[10,20,30]의 첫 번째(10)를 꺼내세요. 번호는?', code: 'let a = [10, 20, 30]\nprint(a[____])', expect: '10', answer: '0', hint: '첫째는 0번' },
      { label: '둘째 = a[1]', ask: '[10,20,30]의 두 번째(20)를 꺼내세요.', code: 'let a = [10, 20, 30]\nprint(a[____])', expect: '20', answer: '1', hint: '둘째는 1번' },
      { label: '문자 배열', ask: '["사과","배","귤"]의 마지막(귤)을 번호로 꺼내세요.', code: 'let f = ["사과", "배", "귤"]\nprint(f[____])', expect: '"귤"', answer: '2', hint: '셋 중 마지막 = 2번' },
      { label: 'length=개수', ask: '[1,2,3,4]의 개수를 구하세요.', code: 'let a = [1, 2, 3, 4]\nprint(a.____)', expect: '4', answer: 'length', hint: '개수: .length' },
      { label: '빈 배열 length', ask: '빈 배열의 개수는 0. 무엇으로 구하나?', code: 'let a = []\nprint(a.____)', expect: '0', answer: 'length', hint: '.length' },
      { label: 'push로 추가', ask: '[1,2]에 값을 하나 추가해 개수가 3이 되게. 무슨 메서드?', code: 'let a = [1, 2]\na.____(3)\nprint(a.length)', expect: '3', answer: 'push', hint: '끝에 추가: push' },
      { label: '칸 바꾸기', ask: '[1,2,3]의 0번 칸을 9로 바꾸세요.', code: 'let a = [1, 2, 3]\na[0] = ____\nprint(a[0])', expect: '9', answer: '9', hint: 'arr[0] = 9' },
      { label: '마지막 = length-1', ask: '[5,6,7]의 마지막(7)을 length로 꺼내세요.', code: 'let a = [5, 6, 7]\nprint(a[a.length - ____])', expect: '7', answer: '1', hint: '마지막 번호 = length - 1' },
      { label: '이름 배열', ask: '["민지","지훈","서연"]의 세 번째(서연)를 꺼내세요.', code: 'let names = ["민지", "지훈", "서연"]\nprint(names[____])', expect: '"서연"', answer: '2', hint: '세 번째 = 2번' },
      { label: 'push 값', ask: '["우유"]에 뭐든 하나 추가해 개수가 2가 되게 빈칸을 채우세요.', code: 'let cart = ["우유"]\ncart.push(____)\nprint(cart.length)', expect: '2', answer: '"빵"', hint: 'push는 뭘 넣어도 개수 +1' },
    ],
  }
})()
