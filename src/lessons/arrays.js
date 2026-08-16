// 6강 · 배열 (만들기 · 인덱스 · length · push · 힙)  ── design-principles 규범
// 오해: 인덱스는 1부터?(0부터!) · arr[length]는 마지막?(undefined) · 배열은 스택?(힙·참조)
// 왜:  0-based=시작에서 몇 칸 떨어졌나 · length=개수, 마지막 인덱스=length-1
// 대비: arr[0](첫째) vs arr[length-1](마지막) · push(원본 바뀜) vs 새 배열

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Lessons[6] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">6강</span>
        <h2>배열 — 여러 값을 한 줄로</h2>
        <p>값이 여러 개면 이름을 여러 개 만들 필요 없다. <b>배열</b> <code>[ ]</code>에 <b>순서대로</b> 담고, <b>번호(인덱스)</b>로 꺼낸다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>배열은 <code>[ ]</code>로 만들고 <code>arr[번호]</code>로 꺼낸다. <b>번호는 0부터</b>. <code>arr.length</code>는 개수,
        마지막은 <code>arr[length - 1]</code>. <code>push</code>로 끝에 추가한다. 배열은 <b>객체 → 힙</b>에 산다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/배열" target="_blank" rel="noopener noreferrer">배열 ↗</a> · <a href="https://ko.wikipedia.org/wiki/자료구조" target="_blank" rel="noopener noreferrer">자료구조 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 함정 — 번호는 0부터</div>
        <p class="section-desc" style="margin:0">사물함 줄을 떠올려라 — 첫 칸이 <b>0번</b>, 그다음 1번, 2번… 그래서 <b>첫 번째는 <code>arr[0]</code></b>, 세 개면 마지막은 <code>arr[2]</code>다.
        <code>arr[3]</code>(칸 밖)은 에러가 아니라 <b><code>undefined</code></b>(빈손)를 준다.</p>
      </div>

      <h3 class="section-title">🎯 번호는 0부터 — 예측 → 한 칸씩 → 반복 (⏱ 시뮬레이션)</h3>
      <span class="learn-tag">📎 한 번 봐선 안 붙는 함정 — 예측하고, 걸어보고, 반복해 손에 붙인다</span>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔮 먼저 예측 → 확인</div>
        <div data-m="qz-i1"></div>
        <div data-m="qz-i2"></div>
      </div>
      <div class="card"><div class="file-label">⏱ 한 칸씩 걸어보기 — fruits[0] → [3] (다음 ▶)</div><div data-m="sim-idx"></div></div>
      <div class="card"><div class="file-label">🎯 반복 드릴 — 예측해서 빈칸 채우기</div><div data-m="idx-drill"></div></div>

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
      <div data-m="qz"></div>
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
        <button class="chip on" data-goto="6:easy">📝 6강 실습 시작 (🟢 쉬움) →</button>
      </div>
    `

    // 🔮 예측(off-by-one 함정을 표 보기 전에 맞혀 본다)
    root.querySelector('[data-m="qz-i1"]').append(Quiz({
      q: '세 개짜리 <code>["사과","배","귤"]</code>의 <b>마지막</b>은 몇 번(인덱스)?',
      options: ['<code>3</code>번', '<code>2</code>번 (0부터라 length−1)', '<code>1</code>번'],
      answer: 1,
      explain: '번호가 <b>0부터</b>라 0·1·2 세 칸 → 마지막은 <code>arr[2]</code>(= length−1 = 3−1 = 2). <code>arr[3]</code>이 아니다.',
    }))
    root.querySelector('[data-m="qz-i2"]').append(Quiz({
      q: '<code>["사과","배","귤"][3]</code> (칸 밖)은?',
      options: ['에러(터진다)', '<code>undefined</code> (빈손)', '<code>"귤"</code>'],
      answer: 1,
      explain: '칸은 0·1·2까지뿐. 없는 번호를 꺼내도 <b>에러가 아니라 <code>undefined</code></b>(빈손)를 준다 — 그래서 조용히 지나가 더 위험한 함정.',
    }))
    // ⏱ 시간 시뮬레이션 — 번호로 한 칸씩(0부터), 마지막 [3]에서 칸 밖. ExprReduce 재사용.
    root.querySelector('[data-m="sim-idx"]').append(ExprReduce({
      title: 'fruits[i] — 번호로 한 칸씩 (칸: 0·1·2)',
      steps: [
        { code: 'fruits = ["사과", "배", "귤"]   // 칸 번호 0·1·2', note: '번호는 <b>0부터</b> 붙는다 — "시작에서 몇 칸 떨어졌나".' },
        { code: 'fruits[0]  →  "사과"', mark: 'fruits[0]', note: '<b>0번</b> = 0칸 떨어진 시작칸 → "사과"(첫째).' },
        { code: 'fruits[1]  →  "배"', mark: 'fruits[1]', note: '<b>1번</b> = 한 칸 뒤 → "배".' },
        { code: 'fruits[2]  →  "귤"', mark: 'fruits[2]', note: '<b>2번</b> = 세 개 중 <b>마지막</b>(length−1 = 3−1 = 2) → "귤".' },
        { code: 'fruits[3]  →  undefined', mark: 'fruits[3]', note: '<b>3번은 칸 밖</b>(0·1·2뿐) → 에러가 아니라 <b>undefined</b>(빈손). 이게 <b>off-by-one</b> 함정.' },
      ],
    }))
    // 🎯 반복 드릴 — 예측 패턴(빈칸=예측값, 맞으면 true)
    root.querySelector('[data-m="idx-drill"]').append(Drill({
      pattern: '빈칸에 "이 값"을 예측해 넣어라 — 맞으면 true가 출력된다.',
      problems: [
        { ask: '개수(length)', code: 'print([10, 20, 30].length === ____)', expect: 'true', answer: '3', hint: 'length=개수' },
        { ask: '첫째 = 0번', code: 'print(["a", "b", "c"][0] === ____)', expect: 'true', answer: '"a"', hint: '0번=시작칸(따옴표!)' },
        { ask: '마지막 = length−1', code: 'print([10, 20, 30][2] === ____)', expect: 'true', answer: '30', hint: '0부터라 마지막은 2번' },
        { ask: '칸 밖 = undefined', code: 'print([10, 20, 30][3] === ____)', expect: 'true', answer: 'undefined', hint: '3번은 없다 → 빈손' },
      ],
    }))

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

    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '<code>let a = [1, 2]; let b = a; b.push(9)</code> — 이제 <b>a</b>는?',
      options: ['[1, 2] — b만 바뀜(복사본)', '[1, 2, 9] — a도 바뀜(같은 배열)'],
      answer: 1,
      explain: '<code>let b = a</code>는 배열을 <b>복사하는 게 아니라 같은 배열을 가리킨다</b>(주소만 복사=참조). b·a가 <b>같은 힙 배열</b>이라 <code>b.push(9)</code>가 a에도 보인다 → <code>[1, 2, 9]</code>. 원본을 지키려면 <code>[...a]</code>로 복사. (🧠 M4 별칭)',
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

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
