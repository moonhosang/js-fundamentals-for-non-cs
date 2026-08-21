// 클래스 (선택 심화) — 객체 찍는 틀 · new · this · 메서드 · 인스턴스는 힙 객체  ── design-principles 규범
// 오해: class는 완전히 새로운 것?(→ 객체 찍는 틀 · 함수·객체 위 문법 설탕) · class로 만든 건 특별?(→ 그냥 객체, 인스턴스는 힙에)
// 왜:  같은 모양 객체를 여러 개 손으로 만들기 지겹다 → 틀(class) 하나로 찍는다(new). 8강 객체·메서드의 연장.
// 대비: 객체 리터럴 { } (하나) vs class (여러 개 찍는 틀) · class = 프로토타입(prototype) 기반의 문법 설탕(정직)

;(function () {
  window.Lessons = window.Lessons || {}

  window.Lessons['class'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧬 선택</span>
        <h2>클래스 — 같은 모양 객체를 찍어내는 틀</h2>
        <p>8강에서 객체 <code>{ }</code> 하나를 손으로 만들었다. 같은 모양이 100개 필요하면? <b>틀(class)</b> 하나를 만들고 <code>new</code>로 찍는다. 새 문법 같지만 <b>객체 위의 문법</b>일 뿐이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><code>class</code>는 <b>객체 찍는 틀</b>. <code>constructor</code>에서 <code>this.속성 = 값</code>으로 모양을 정하고, <code>new 클래스()</code>로 <b>인스턴스</b>(실제 객체)를 만든다.
        틀 안 함수는 <b>메서드</b>(8강). 인스턴스는 <b>각자 힙 객체</b>(M3·M4) — 서로 독립.
        정직하게: JS <code>class</code>는 <b>프로토타입(prototype) 위의 문법 설탕</b>이다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/클래스_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">클래스 ↗</a> · <a href="https://ko.wikipedia.org/wiki/프로토타입_기반_프로그래밍" target="_blank" rel="noopener noreferrer">프로토타입 기반 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — "class는 완전히 새로운, 특별한 무언가다"</div>
        <p class="section-desc" style="margin:0">아니다. class로 <code>new</code> 해서 나온 것도 <b>그냥 객체</b>다(8강의 그 객체). class는 그 객체를 <b>여러 개 편하게 찍는 틀</b>일 뿐. 특별한 세계가 아니라 <b>객체 위에 얹은 문법</b>이다.</p>
      </div>

      <h3 class="section-title">① 왜 class — 같은 걸 손으로 여러 번 만들기 지겹다</h3>
      <span class="learn-tag">📎 모양이 같은 객체가 여러 개 → 틀 하나로</span>
      <div class="card"><div class="file-label">🔬 손으로 만들 때 vs 틀로 찍을 때</div><div data-m="why"></div></div>

      <h3 class="section-title">② class 정의 & new — constructor·this</h3>
      <span class="learn-tag">📎 constructor에서 this.속성=값 · new 클래스(값) 로 인스턴스를 만든다</span>
      <div data-m="qz-new"></div>
      <div class="card"><div class="file-label">🔬 Dog 틀 만들고 찍기</div><div data-m="def"></div></div>

      <h3 class="section-title">③ 메서드 — 틀에 행동을 (8강 메서드와 같은 것)</h3>
      <span class="learn-tag">📎 class 안 함수 = 메서드 · this로 자기 속성을 읽는다</span>
      <div class="card"><div class="file-label">🔬 자기소개 메서드</div><div data-m="method"></div></div>

      <h3 class="section-title">④ 여러 인스턴스 — 각자 힙 객체 (M3·M4)</h3>
      <span class="learn-tag">📎 new 할 때마다 힙에 새 객체 · 서로 독립(한쪽 바꿔도 다른 쪽 그대로)</span>
      <div data-m="qz-indep"></div>
      <div class="card"><div class="file-label">🔬 인스턴스 둘은 서로 다른 객체</div><div data-m="many"></div></div>
      <div data-m="mem"></div>

      <h3 class="section-title">⑤ 정직 — class는 프로토타입 위의 '문법 설탕'</h3>
      <span class="learn-tag">📎 class 없이 함수로도 같은 걸 만든다 — class는 보기 좋게 감싼 문법(sugar)</span>
      <div class="concept">
        <p class="concept-lead">🍬 문법 설탕(syntactic sugar)이란</p>
        <p class="section-desc" style="margin-top:0">JS 객체는 원래 <b>프로토타입</b>이라는 '원본 객체'에 기대어 메서드를 공유한다. <code>class</code>는 그 프로토타입 배선을 <b>보기 좋은 문법으로 감싼 것</b>이다 — 없던 능력을 준 게 아니다.
        그래서 <code>typeof (new Dog())</code>는 여전히 <code>"object"</code>다. 인스턴스는 <b>특별한 종류가 아니라 그냥 객체</b> — 8강·메모리 모델이 그대로 적용된다.</p>
      </div>
      <div class="card"><div class="file-label">🔬 직접 — 인스턴스도 그냥 객체 · class 없이 함수로도 같은 것</div><div data-m="sugar"></div></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><code>class</code> = <b>객체 찍는 틀</b>. <code>constructor</code>의 <code>this.속성=값</code>으로 모양을, <code>new</code>로 <b>인스턴스</b>를 만든다.
        메서드는 <code>this</code>로 자기 속성을 읽고, 인스턴스는 <b>각자 힙 객체</b>라 서로 독립. 본질은 <b>프로토타입 위의 문법 설탕</b> — 인스턴스도 그냥 객체다.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>난이도별 실습</b>으로 — 🟢쉬움 → 🟡보통 → 🔴어려움 (각 5문제).</span>
        <button class="chip on" data-goto="class:easy">📝 클래스 실습 시작 (🟢 쉬움) →</button>
      </div>
    `

    root.querySelector('[data-m="why"]').append(Runner({ showBox: false, code: [
      '// 손으로: 같은 모양을 매번 반복 (지겹다)',
      'let dog1 = { name: "콩이", bark: function () { return "멍" } }',
      'let dog2 = { name: "루비", bark: function () { return "멍" } }',
      '',
      '// 틀로: class 하나 만들고 new 로 찍는다',
      'class Dog {',
      '  constructor(name) { this.name = name }',
      '  bark() { return "멍" }',
      '}',
      'let d1 = new Dog("콩이")',
      'let d2 = new Dog("루비")',
      'print(d1.name + " / " + d2.name)   // 콩이 / 루비',
    ].join('\n') }))

    root.querySelector('[data-m="qz-new"]').append(Quiz({
      q: '<code>new Dog("콩이")</code> 에서 <code>new</code>가 하는 일은?',
      options: ['틀(class)을 실행만 한다', '힙에 새 객체를 만들어 this로 준다', '이름을 화면에 그린다'],
      answer: 1,
      explain: '<code>new</code>는 <b>힙에 빈 객체를 새로 만들고</b> 그걸 <code>this</code>로 삼아 <code>constructor</code>를 돌린 뒤 <b>그 객체를 돌려준다</b>. 그래서 <code>new</code> 할 때마다 <b>새 인스턴스(힙 객체)</b>가 생긴다.',
    }))

    root.querySelector('[data-m="def"]').append(Runner({ showBox: false, code: [
      'class Dog {',
      '  constructor(name) {   // new 할 때 자동 실행',
      '    this.name = name     // 만들어지는 객체(this)에 속성을 심는다',
      '  }',
      '}',
      '',
      'let d = new Dog("콩이")   // 인스턴스 하나 찍기',
      'print(d.name)             // "콩이"  (그냥 객체의 속성)',
    ].join('\n') }))

    root.querySelector('[data-m="method"]').append(Runner({ showBox: false, code: [
      'class Person {',
      '  constructor(name) { this.name = name }',
      '  hello() { return "안녕, 나는 " + this.name }   // 메서드 — this로 자기 속성',
      '}',
      '',
      'let p = new Person("민지")',
      'print(p.hello())   // "안녕, 나는 민지"',
    ].join('\n') }))

    root.querySelector('[data-m="qz-indep"]').append(Quiz({
      q: '<code>new C()</code>로 만든 a와 b가 있다. <code>a.hp = 50</code>으로 바꾸면 b.hp는?',
      options: ['b.hp도 50이 된다 (같은 틀이니까)', 'b.hp는 그대로다 (각자 다른 객체)'],
      answer: 1,
      explain: 'a와 b는 <b>각자 힙의 다른 객체</b>다(M4). 같은 <b>틀</b>로 찍었을 뿐 <b>같은 객체가 아니다</b> — 그래서 a를 바꿔도 b는 그대로. (별칭 <code>let b = a</code>였다면 이야기가 달랐다.)',
    }))

    root.querySelector('[data-m="many"]').append(Runner({ showBox: false, code: [
      'class Cat { constructor() { this.hp = 100 } }',
      '',
      'let a = new Cat()',
      'let b = new Cat()   // 또 하나 — 힙에 새 객체',
      'a.hp = 50           // a만 바꾼다',
      'print(a.hp + " / " + b.hp)   // 50 / 100',
      '// b는 그대로 — 독립',
    ].join('\n') }))

    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'new = 빈 봉투 생성→채우기→this 반환(⑤)→대입(⑥) · 할 때마다 새 인스턴스(독립)',
      stackLabel: '📇 이름표 장부 (변수)',
      code: ['let a = new Cat()', 'let b = new Cat()', 'a.hp = 50'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }], heap: {}, note: '<b>①호출부 — <code>new Cat()</code> 시작</b> — <code>new</code>는 "인스턴스를 만들라"는 신호. <b>아직 생성자 프레임도, 객체도 없다</b> — a는 결과를 기다린다(대기).', engine: '<code>new</code>는 (1)빈 객체 생성 (2)프로토타입 연결 (3)생성자를 this로 실행 (4)this 반환, 이 네 단계를 묶은 연산. 아직 시작 전.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }, { name: 'Cat', slots: [{ name: 'this', ref: 'h1' }] }], heap: { h1: { label: 'Cat · (빈 봉투)' } }, note: '<b>②프레임 push + 빈 봉투 생성</b> — Cat <b>생성자 프레임</b>이 쌓이고, <code>new</code>가 힙에 <b>빈 인스턴스 h1</b>(아직 속성 없음)을 만들어 <b>this로 묶는다</b>. Cat은 매개변수 없음(③ 바인딩 생략).', engine: 'new: 힙에 빈 Cat 객체 할당 + Cat.prototype 연결. this가 이 객체를 가리킨다. 생성자 인자 없음.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }, { name: 'Cat', slots: [{ name: 'this', ref: 'h1' }] }], heap: { h1: { label: 'Cat', fields: [{ key: 'hp', value: '100' }] } }, note: '<b>④본문</b> — 생성자 몸통 <code>this.hp = 100</code> 실행 → <b>프레임이 살아있는 채</b>로 h1 봉투에 <b>hp 칸이 채워진다</b>. 곧 돌려줄 반환값(=this=h1)이 이렇게 갖춰진다.', engine: 'this.hp = 100 → h1에 hp 슬롯 추가(hidden class 확정, 100은 SMI 인라인).' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }], heap: { h1: { label: 'Cat', fields: [{ key: 'hp', value: '100' }] } }, returning: { ref: 'h1', label: 'Cat 인스턴스' }, note: '<b>⑤ 반환·pop</b> — 생성자가 <b>this(h1)를 암묵 반환</b>(반환 통로엔 h1을 가리키는 화살표)하고 Cat 프레임은 <b>pop(사라짐)</b>. 반환된 h1 <b>주소</b>는 통로에서 호출한 자리로 가는 중 — a는 <b>아직 대기</b>. <b>객체 h1은 힙에 살아남는다</b>(프레임과 무관).', engine: '생성자는 명시적 return이 없으면 this를 반환. Cat 프레임 pop → this 슬롯 소멸, 그러나 h1 객체는 힙에 남아 반환된다.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }] }], heap: { h1: { label: 'Cat', fields: [{ key: 'hp', value: '100' }] } }, note: '<b>⑥ 호출부 대입</b> — 호출한 자리 <code>let a = …</code>가 반환된 <b>h1 주소를 a에 담는다</b> ✔. <b>반환(⑤)과 대입(⑥)은 별개의 두 단계</b>. 이제 a가 첫 인스턴스를 가리킨다.', engine: '반환된 압축 포인터가 a 슬롯에 안착. 프레임은 이미 없다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h2' }] }], heap: { h1: { label: 'Cat', fields: [{ key: 'hp', value: '100' }] }, h2: { label: 'Cat', fields: [{ key: 'hp', value: '100' }] } }, note: '<b>두 번째 <code>new</code></b> — <b>같은 과정(①~⑥)을 통째로 다시</b> 돈다 → 힙에 <b>또 다른 객체 h2</b>가 생기고 b가 가리킨다. h1과 <b>별개</b>(별칭 아님!).', engine: '두 번째 new Cat(): 힙에 새 객체 할당. 모양이 같아 h1·h2는 같은 hidden class 공유(속성 배치 재사용). b는 h2 포인터 — a와 다른 객체.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h2' }] }], heap: { h1: { label: 'Cat', fields: [{ key: 'hp', value: '50', bad: true }] }, h2: { label: 'Cat', fields: [{ key: 'hp', value: '100' }] } }, note: '<code>a.hp = 50</code> → <b>h1만 바뀐다</b>. h2(b)는 <b>그대로 100</b> — 각자 다른 객체라 <b>독립</b>. (별칭 <code>let b = a</code>였다면 둘 다 바뀌었다.)', engine: 'a.hp = 50: h1의 hp 슬롯을 제자리 덮어쓰기(50도 SMI라 HeapNumber 승격 없음). hidden class 그대로 → IC로 가속. h2는 손대지 않아 그대로.' },
      ],
    }))
    root.querySelector('[data-m="sugar"]').append(Runner({ showBox: false, code: [
      'class Dog { constructor(name) { this.name = name } }',
      'let d = new Dog("콩이")',
      'print(typeof d)          // "object"  (인스턴스도 그냥 객체!)',
      'print(d.name)            // "콩이"',
      '',
      '// class 없이 — 함수로도 같은 걸 만든다',
      'function makeCat(name) { return { name: name } }',
      'let c = makeCat("나비")',
      'print(typeof c)          // "object"  (똑같다)',
      'print(c.name)            // "나비"',
    ].join('\n') }))

    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/easy·normal·hard.js 의 window.Drills['class'].
})()
