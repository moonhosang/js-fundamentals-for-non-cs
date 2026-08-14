// 8강 · 객체 (만들기 · 점/대괄호 꺼내기 · 중첩 · 배열 안 객체 · 메서드)  ── design-principles 규범
// 오해: 객체는 순서가 있다?(→ 이름으로 접근, 순서 무관) · 없는 키를 꺼내면 에러?(→ undefined) · obj.key와 obj["key"]가 다르다?(→ 같다)
// 왜:  객체 = 이름표(key):값 묶음 · 점(.)이나 대괄호([])로 꺼낸다 · 메서드는 값이 함수인 속성(5강)
// 대비: 배열(번호로) vs 객체(이름으로) · 점 표기 vs 대괄호(변수/공백 키) · 없는 키(undefined) vs 있는 키

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Lessons[8] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">8강</span>
        <h2>객체 — 이름표를 붙인 값 묶음</h2>
        <p>배열이 <b>번호</b>로 꺼낸다면, 객체는 <b>이름(key)</b>으로 꺼낸다. 관련된 값들을 하나로 묶어 <code>{ 이름: 값 }</code>. 실전 데이터의 기본 모양이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>객체는 <code>{ key: value }</code> — <b>이름:값</b> 쌍의 묶음. <code>obj.key</code>(점) 또는 <code>obj["key"]</code>(대괄호)로 꺼내고 넣는다.
        <b>없는 키</b>는 <code>undefined</code>. 값이 함수면 <b>메서드</b>(5강). 객체는 <b>힙에 살고 참조로 공유</b>(M4)된다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">객체 ↗</a> · <a href="https://ko.wikipedia.org/wiki/연관_배열" target="_blank" rel="noopener noreferrer">연관 배열(key:value) ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — "객체도 순서(번호)로 꺼낸다"</div>
        <p class="section-desc" style="margin:0">아니다. 배열은 <b>번호</b>(<code>arr[0]</code>), 객체는 <b>이름</b>(<code>obj.name</code>)으로 꺼낸다. 그래서 순서는 중요하지 않다. 그리고 <b>없는 이름</b>을 꺼내도 에러가 아니라 <code>undefined</code>(빈손)를 준다.</p>
      </div>

      <h3 class="section-title">① 만들기 & 꺼내기 — 점(.)으로</h3>
      <span class="learn-tag">📎 { 이름: 값 } 로 묶고, obj.이름 으로 꺼낸다</span>
      <div class="card"><div class="file-label">🔬 프로필 객체 만들고 꺼내기</div><div data-m="make"></div></div>
      <div data-m="qz-miss"></div>

      <h3 class="section-title">② 넣기 · 바꾸기 — 없던 이름도 추가된다</h3>
      <span class="learn-tag">📎 obj.key = 값 — 있으면 바꾸고, 없으면 새로 추가된다</span>
      <div class="card"><div class="file-label">🔬 속성 바꾸고 추가하기</div><div data-m="set"></div></div>

      <h3 class="section-title">③ 대괄호 표기 — 변수·공백 있는 이름</h3>
      <span class="learn-tag">📎 obj["이름"] 는 obj.이름 과 같다 · 이름이 변수거나 공백이 있으면 대괄호만 가능</span>
      <div data-m="qz-bracket"></div>
      <div class="card"><div class="file-label">🔬 점 vs 대괄호 (같은 값)</div><div data-m="bracket"></div></div>

      <h3 class="section-title">④ 중첩 & 배열 안 객체 — 실전 데이터 모양</h3>
      <span class="learn-tag">📎 객체 안에 객체, 배열 안에 객체 — API·DB 데이터가 이렇게 생겼다</span>
      <div class="card"><div class="file-label">🔬 중첩 객체 · 사람 목록</div><div data-m="nested"></div></div>
      <div data-m="objmem"></div>

      <h3 class="section-title">⑤ 메서드 — 값이 '함수'인 속성</h3>
      <span class="learn-tag">📎 속성 값이 함수면 '메서드' — obj.행동() 으로 부른다 (5강 함수가 바탕)</span>
      <div class="card"><div class="file-label">🔬 강아지의 bark() 메서드</div><div data-m="method"></div></div>

      <h3 class="section-title">⑥ 화면 — 객체로 프로필 카드</h3>
      <span class="learn-tag">📎 실전 — 사람 객체 하나로 이름·나이 카드를 그린다</span>
      <div class="card"><div class="file-label">🔬 프로필 카드 (객체를 바꿔 실행)</div><div data-m="card"></div></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">객체 <code>{ 이름: 값 }</code>는 <b>이름으로</b> 꺼낸다(<code>obj.key</code>·<code>obj["key"]</code>). 없는 이름은 <code>undefined</code>.
        값이 함수면 <b>메서드</b>. 중첩·배열 안 객체가 <b>실전 데이터</b>의 모양이고, 객체는 <b>참조로 공유</b>(M4)된다.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>단계별 실습</b>으로 — 만들기·꺼내기·중첩·메서드를 손에 붙이자 (10문제).</span>
        <button class="chip on" data-goto="8-1">📝 8강 실습 시작 (8-1) →</button>
      </div>
    `

    root.querySelector('[data-m="make"]').append(Runner({ showBox: false, code: [
      'let user = { name: "민지", age: 24 }   // 이름:값 두 쌍',
      'print(user.name)   // "민지"',
      'print(user.age)    // 24',
    ].join('\n') }))

    root.querySelector('[data-m="qz-miss"]').append(Quiz({
      q: '<code>let u = { name: "민지" }</code> 인데 <code>u.age</code>를 꺼내면? (age는 없는 이름)',
      options: ['에러가 난다', 'undefined (없는 이름은 빈손)', '0'],
      answer: 1,
      explain: '없는 이름(key)을 꺼내도 <b>에러가 아니라 undefined</b>를 준다(6강 배열의 칸 밖과 같다). 그래서 "값이 있나?"를 확인할 때 <code>if (u.age)</code>처럼 쓴다.',
    }))

    root.querySelector('[data-m="set"]').append(Runner({ showBox: false, code: [
      'let user = { name: "민지" }',
      'user.name = "지훈"   // 있는 속성 → 바꾼다',
      'user.age = 30        // 없던 속성 → 새로 추가된다',
      'print(user.name)     // "지훈"',
      'print(user.age)      // 30',
    ].join('\n') }))

    root.querySelector('[data-m="qz-bracket"]').append(Quiz({
      q: '<code>user.name</code> 과 <code>user["name"]</code> 는?',
      options: ['완전히 같다 (표기만 다름)', '다르다 — 대괄호는 배열용'],
      answer: 0,
      explain: '둘은 <b>완전히 같은 속성 접근</b>이다. 다만 이름이 <b>변수</b>이거나 <b>공백·특수문자</b>가 있으면 <b>대괄호 <code>obj["key"]</code>만</b> 된다.',
    }))

    root.querySelector('[data-m="bracket"]').append(Runner({ showBox: false, code: [
      'let user = { name: "민지" }',
      'print(user.name)       // "민지"  (점)',
      'print(user["name"])    // "민지"  (대괄호 — 같다)',
      '',
      'let key = "name"       // 이름이 변수에 담겨 있으면?',
      'print(user[key])       // "민지"  (대괄호만 가능!)',
    ].join('\n') }))

    root.querySelector('[data-m="nested"]').append(Runner({ showBox: false, code: [
      'let me = { name: "나", pet: { name: "콩이", kind: "강아지" } }',
      'print(me.pet.name)     // "콩이"  (객체 안 객체 → 점을 이어서)',
      '',
      'let users = [',
      '  { name: "민지", age: 24 },',
      '  { name: "지훈", age: 30 },',
      ']',
      'print(users[1].name)   // "지훈"  (배열[번호].이름)',
    ].join('\n') }))

    root.querySelector('[data-m="objmem"]').append(MemoryModel({
      title: '객체는 힙에 · 변수는 참조 (M4와 같은 규칙)',
      stackLabel: '📇 이름표 장부 (변수)',
      code: ['let a = { hp: 100 }', 'let b = a', 'b.hp = 50'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }] } }, note: '객체는 <b>힙</b>에. a는 주소만 가진다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }] } }, note: '<code>let b = a</code> → <b>주소 복사</b> → a·b가 <b>같은 객체</b>(별칭).' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '50' }] } }, note: '<code>b.hp = 50</code> → 같은 객체라 <b>a.hp도 50</b>. 객체는 공유된다(M4).' },
      ],
    }))

    root.querySelector('[data-m="method"]').append(Runner({ showBox: false, code: [
      'let dog = {',
      '  name: "콩이",',
      '  bark: function () { return "멍멍!" },   // 값이 함수 = 메서드',
      '}',
      'print(dog.name)      // "콩이"  (보통 속성)',
      'print(dog.bark())    // "멍멍!" (메서드 — ()로 부른다)',
    ].join('\n') }))

    root.querySelector('[data-m="card"]').append(Runner({ code: [
      'let user = { name: "민지", age: 24, job: "디자이너" }',
      '',
      'let card = document.createElement("div")',
      'card.style.cssText = "padding:14px 18px;border-radius:12px;background:#eef2ff;color:#3730a3;font-weight:700;line-height:1.7"',
      'card.textContent = user.name + " (" + user.age + ") · " + user.job',
      'box.append(card)',
      'print(user.name + " 카드 완성")',
    ].join('\n') }))

    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
  }

  // 유형 드릴 ×10 — 만들기·꺼내기·넣기·중첩·메서드. 목표 결과에서 도출(답 노출 없음).
  window.Practices[8] = {
    pattern: '유형: 목표 출력이 나오도록 빈칸을 채워 ▶확인 (객체 만들기·꺼내기·중첩·메서드)',
    problems: [
      { label: '만들기', ask: 'p.name이 "민지"가 되게 객체를 채워라.', code: 'let p = { name: "____" }\nprint(p.name)', expect: '"민지"', answer: '민지', hint: '따옴표 안에 민지' },
      { label: '점으로 꺼내기', ask: 'u의 나이(24)를 꺼내려면 어떤 이름?', code: 'let u = { age: 24 }\nprint(u.____)', expect: '24', answer: 'age', hint: 'u.age' },
      { label: '속성 추가', ask: 'o에 color 속성을 "빨강"으로 추가해 출력되게.', code: 'let o = {}\no.color = "____"\nprint(o.color)', expect: '"빨강"', answer: '빨강', hint: '따옴표 안에 빨강' },
      { label: '없는 키', ask: 'u엔 name만 있다. u.age(없는 이름)를 꺼내면? 빈칸에 age를 넣고 ▶확인', code: 'let u = { name: "민지" }\nprint(u.____)', expect: 'undefined', answer: 'age', hint: '없는 키 = undefined' },
      { label: '값 바꾸기', ask: 'u.hp를 50으로 바꿔 출력되게.', code: 'let u = { hp: 100 }\nu.hp = ____\nprint(u.hp)', expect: '50', answer: '50', hint: 'u.hp = 50' },
      { label: '중첩', ask: 'me.pet.name이 "콩이"가 되게 안쪽을 채워라.', code: 'let me = { pet: { name: "____" } }\nprint(me.pet.name)', expect: '"콩이"', answer: '콩이', hint: '제일 안쪽 name' },
      { label: '배열 안 객체', ask: '두 번째 사람의 이름(지훈)을 꺼내려면 어떤 속성?', code: 'let users = [{ name: "민지" }, { name: "지훈" }]\nprint(users[1].____)', expect: '"지훈"', answer: 'name', hint: 'users[1].name' },
      { label: '대괄호(공백 키)', ask: '"my key"처럼 공백 있는 이름은 대괄호로! 값 7을 꺼내려면 빈칸에?', code: 'let o = { "my key": 7 }\nprint(o[____])', expect: '7', answer: '"my key"', hint: 'o["my key"]' },
      { label: '메서드 호출', ask: 'dog의 bark 메서드를 불러 "멍"이 나오게 — 빈칸에 메서드 이름?', code: 'let dog = { bark: function () { return "멍" } }\nprint(dog.____())', expect: '"멍"', answer: 'bark', hint: 'dog.bark()' },
      { label: '키 개수', ask: '객체의 이름(키) 개수 2를 구하려면? (Object.keys의 무엇?)', code: 'let o = { a: 1, b: 2 }\nprint(Object.keys(o).____)', expect: '2', answer: 'length', hint: '.length' },
    ],
  }
})()
