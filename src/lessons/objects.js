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

      <h3 class="section-title">③ 대괄호 표기 — 변수·숫자·공백 있는 이름</h3>
      <span class="learn-tag">📎 obj["이름"] 는 obj.이름 과 같다 · 이름이 변수거나 숫자로 시작·공백·하이픈이면 <b>대괄호만</b></span>
      <div data-m="qz-bracket"></div>
      <div data-m="qz-5th"></div>
      <div class="card"><div class="file-label">🔬 점 vs 대괄호 · 숫자 키 · 변수 키 vs 문자열 키</div><div data-m="bracket"></div></div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 최대 함정 — <code>obj[key]</code> vs <code>obj["key"]</code> (따옴표가 다른 뜻)</div>
        <p class="section-desc" style="margin:0"><code>obj[<b>key</b>]</code>는 <b>변수 key에 든 값</b>을 이름으로 쓴다(<code>key = "name"</code>이면 <code>obj.name</code>). <code>obj["<b>key</b>"]</code>는 <b>글자 그대로 "key"</b>라는 이름. <b>따옴표 유무가 완전히 다른 접근</b> — 이걸 헷갈리면 반복문으로 객체를 순회할 때(다음 강) 무너진다.</p>
      </div>

      <h3 class="section-title">④ 중첩 & 배열 안 객체 — 실전 데이터 모양</h3>
      <span class="learn-tag">📎 객체 안에 객체, 배열 안에 객체 — API·DB 데이터가 이렇게 생겼다</span>
      <div class="card"><div class="file-label">🔬 중첩 객체 · 사람 목록</div><div data-m="nested"></div></div>
      <div data-m="objmem"></div>

      <h3 class="section-title">⑤ 메서드 — 값이 '함수'인 속성</h3>
      <span class="learn-tag">📎 <b>함수도 값</b>(5-7)이라 속성에 담을 수 있다 → 그게 '메서드'. <code>obj.행동()</code> 으로 부른다 (5강 함수가 바탕)</span>
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
        <span>🎯 이제 <b>난이도별 실습</b>으로 — 🟢쉬움 → 🟡보통 → 🔴어려움 (각 5문제).</span>
        <button class="chip on" data-goto="8:easy">📝 8강 실습 시작 (🟢 쉬움) →</button>
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

    root.querySelector('[data-m="qz-5th"]').append(Quiz({
      q: '속성 이름이 <code>"5thSkill"</code>이다. <code>user.5thSkill</code>로 꺼내면?<pre class="err-code" style="color:inherit;background:transparent">let user = { "5thSkill": "코딩" }\nprint(user.5thSkill)   // ← 이렇게 되나?</pre>',
      options: ['"코딩" — 잘 나온다', '문법 에러 — 숫자로 시작하는 이름은 점 표기 불가, user["5thSkill"]만', 'undefined가 나온다'],
      answer: 1,
      explain: '점 표기 <code>obj.이름</code>은 <b>유효한 변수 이름</b>만 된다. <code>5thSkill</code>은 <b>숫자로 시작</b>해 <code>user.5thSkill</code>은 <b>문법 에러</b> — <code>user["5thSkill"]</code>처럼 <b>대괄호 + 문자열</b>로만 접근한다. 공백(<code>"my key"</code>)·하이픈(<code>"a-b"</code>)도 마찬가지.',
    }))
    root.querySelector('[data-m="bracket"]').append(Runner({ showBox: false, code: [
      'let user = { name: "민지", "5thSkill": "코딩" }',
      'print(user.name)          // "민지"  (점)',
      'print(user["name"])       // "민지"  (대괄호 — 같다)',
      '',
      '// 숫자로 시작하는 이름은 대괄호만 (user.5thSkill 은 문법 에러!)',
      'print(user["5thSkill"])   // "코딩"',
      '',
      '// ⚠️ 변수 키 vs 문자열 키 — 따옴표가 다른 뜻',
      'let key = "name"',
      'print(user[key])          // "민지"  (변수 key의 값 "name"으로 접근)',
      'print(user["key"])        // undefined  ("key"라는 이름은 없다!)',
      '',
      '// ⚠️ 객체엔 "번호 칸"이 없다 — 배열처럼 순서로 못 꺼낸다',
      'print(user[0])            // undefined  (arr[0]과 달리 0번 칸 없음)',
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
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }] } }, note: '객체는 <b>힙</b>에. a는 주소만 가진다.', engine: '객체 리터럴 { hp: 100 }: 힙에 객체를 할당하고 hidden class(Shape)가 hp 속성의 오프셋을 정한다. hp:100은 작은 정수라 SMI로 인라인 저장. 슬롯 a에는 이 객체로의 압축 포인터만 담긴다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }] } }, note: '<code>let b = a</code> → <b>주소 복사</b> → a·b가 <b>같은 객체</b>(별칭).', engine: 'let b = a: 객체를 복사하지 않고 포인터(주소)만 복사한다. a·b 두 슬롯이 같은 h1을 가리키는 별칭 — 힙엔 여전히 객체 하나뿐이고 hidden class·오프셋도 그대로 재사용된다.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '50' }] } }, note: '<code>b.hp = 50</code> → 같은 객체라 <b>a.hp도 50</b>. 객체는 공유된다(M4).', engine: 'b.hp = 50: 기존 hp 슬롯을 제자리에서 덮어쓴다(속성 추가·삭제가 아니라 hidden class 전이 없음, 50도 SMI). a·b가 같은 h1이라 a.hp로 읽어도 50 — 사본이 아니라 공유이기 때문.' },
      ],
    }))

    root.querySelector('[data-m="method"]').append(Runner({ showBox: false, code: [
      'let dog = {',
      '  name: "콩이",',
      '  bark: function () { return "멍멍!" },   // 값이 함수 = 메서드',
      '}',
      'print(dog.name)      // "콩이"  (보통 속성)',
      'print(dog.bark())    // "멍멍!"',
      '// 메서드 — ()로 부른다',
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

  // 드릴은 난이도별 파일로 분리(ADR 0008): src/drills/easy·normal·hard.js 의 window.Drills['8'].
})()
