// 🎁 구조분해 할당 (destructuring) — 모양 맞춰 값 꺼내기
// spread({...})의 역(逆): spread=펼쳐 담기, 구조분해=모양 맞춰 꺼내기. 8강 객체·6강 배열 뒤.
//
// 오해: const {name} = user 는 새 변수 name에 user를 통째로 넣는다 · [a,b]=arr 는 순서 상관없다
// 왜:   구조분해는 '모양을 맞춰' 안의 값만 꺼내 각 변수에 대입 — 객체는 키 이름으로, 배열은 위치로
// 대비: 객체 {name}=키 매칭(순서 무관) vs 배열 [a,b]=위치 매칭(순서 중요) · 꺼낸 원시값은 복사(독립)

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  window.Lessons['destructuring'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🎁 추출</span>
        <h2>구조분해 <code>{ }</code> <code>[ ]</code> — 모양 맞춰 꺼내기</h2>
        <p>스프레드 <code>{ ...obj }</code>가 <b>펼쳐 담는</b> 도구였다면, 구조분해는 그 <b>역(逆)</b> — <b>안의 값만 꺼내 이름표에 붙이는</b> 도구다.
        <code>const { name } = user</code> 한 줄이 <code>const name = user.name</code>과 같다. 실무 코드 어디에나 나온다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p><b>구조분해 = 왼쪽에 '모양'을 그려 오른쪽에서 값을 꺼낸다.</b>
        <b>객체 <code>{ }</code>는 <u>키 이름</u>으로</b>(순서 무관), <b>배열 <code>[ ]</code>는 <u>위치</u>로</b>(순서 중요) 꺼낸다.
        꺼낸 값은 <b>M4 규칙 그대로</b> — 원시면 <b>값 복사(독립)</b>, 객체면 <b>주소 복사(공유)</b>. 흐릿하면 → <button class="inline-goto" data-goto="ref">🧠 M4-1 값=복사</button></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "<code>const {name} = user</code> 면 name에 user가 통째로 들어간다"</div>
        <p class="section-desc" style="margin:0"><b>아니다.</b> <code>{ }</code>는 "user에서 <b>name 칸만 꺼내</b> 같은 이름의 변수에 담아라"는 뜻. name엔 <b>"민지"라는 값</b>이 들어가지 user 객체가 통째로 들어가는 게 아니다. 왼쪽 <code>{ name }</code>은 <b>객체를 만드는 게 아니라 "꺼낼 모양"을 그리는 것</b> — 같은 중괄호라도 대입의 <b>왼쪽</b>이냐 오른쪽이냐로 뜻이 정반대다.</p>
      </div>

      <h3 class="section-title">① 객체 구조분해 — 키 이름으로 꺼낸다 (순서 무관)</h3>
      <span class="learn-tag">📎 const { a, b } = obj → obj.a·obj.b를 같은 이름 변수로. 키로 찾으니 순서는 상관없다</span>
      <div class="card"><div class="file-label">🔬 직접 실행 (값·순서를 바꿔 보라)</div><div data-m="obj"></div></div>

      <h3 class="section-title">② 배열 구조분해 — 위치로 꺼낸다 (순서 중요)</h3>
      <span class="learn-tag">📎 const [x, y] = arr → 0번·1번 요소를 위치대로. 건너뛰려면 쉼표만: const [, second] = arr</span>
      <div class="card"><div class="file-label">🔬 직접 실행</div><div data-m="arr"></div></div>

      <h3 class="section-title">③ 눈으로 — 꺼낸 원시값은 복사(독립)</h3>
      <span class="learn-tag">📎 ▶ — name 셀은 user.name과 <b>별개 셀</b>(값 복사). name을 바꿔도 user는 그대로 (M4 규칙)</span>
      <div data-m="mem"></div>

      <h3 class="section-title">④ 실무에서 — 기본값 · 별칭 · 함수 매개변수 · 스왑</h3>
      <span class="learn-tag">📎 없을 때 기본값 = · 다른 이름 별칭 : · 함수 인자를 바로 풀기 · 임시변수 없이 두 값 교환</span>
      <div class="card"><div class="file-label">🔬 네 가지 실전 패턴</div><div data-m="real"></div></div>
      <div data-m="qz"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>구조분해 = 왼쪽에 모양을 그려 값만 꺼낸다.</b>
        객체 <code>{ }</code>=키로(순서 무관·별칭 <code>:</code>·기본값 <code>=</code>), 배열 <code>[ ]</code>=위치로(쉼표로 건너뛰기·<code>...rest</code>).
        꺼낸 값은 M4 그대로 — <b>원시=복사(독립)·객체=주소(공유)</b>. spread의 짝꿍(펼치기↔꺼내기).</p>
      </div>

      <h3 class="section-title">⑤ 🎯 예측 드릴 — 손에 붙이자</h3>
      <p class="section-desc">매 문제, <b>객체(키)냐 배열(위치)냐</b>부터 판정하라. 사이드바 이 강의 아래 <b>쉬움·보통·어려움</b> 3단계:</p>
      <div class="practice-cta"><span>예측 드릴 —</span><button class="chip on" data-goto="destructuring:easy">🟢 쉬움</button><button class="chip on" data-goto="destructuring:normal">🟡 보통</button><button class="chip on" data-goto="destructuring:hard">🔴 어려움</button></div>

      <div class="practice-cta"><span>펼치는 쪽(짝꿍)도 다시 —</span><button class="chip on" data-goto="spread">🧠 스프레드 …</button></div>
    `

    root.querySelector('[data-m="obj"]').append(Runner({ showBox: false, code: [
      'let user = { name: "민지", age: 20 }',
      '',
      'let { name, age } = user   // 키 이름으로 꺼낸다',
      'print(name)                // "민지"',
      'print(age)                 // 20',
      '',
      'let { age: a, name: n } = user  // 순서 바꿔도 키로 찾으니 OK',
      'print(a)                   // 20  ← 키(age)로 찾음, 순서 무관',
    ].join('\n') }))

    root.querySelector('[data-m="arr"]').append(Runner({ showBox: false, code: [
      'let scores = [90, 80, 70]',
      '',
      'let [first, second] = scores  // 위치(0·1)로 꺼낸다',
      'print(first)                  // 90',
      'print(second)                 // 80',
      '',
      'let [, , third] = scores      // 쉼표로 앞을 건너뛰기',
      'print(third)                  // 70  ← 위치가 중요(이름 없음)',
    ].join('\n') }))

    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'const { name } = user — user.name의 값을 꺼내 복사(독립 셀)',
      stackLabel: '📇 이름표 장부',
      code: ['let user = { name: "민지", age: 20 }', 'let { name } = user', 'name = "지훈"   // name만 바꾸면 user는?'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'user', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"민지"' }, { key: 'age', value: '20' }] } }, note: 'user는 객체 <b>h1</b>을 가리킨다(장부 칸엔 주소). name·age는 봉투 안 칸.', engine: 'h1은 힙 객체(hidden class). name은 문자열, age는 SMI로 필드에 배치.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'user', ref: 'h1' }, { name: 'name', value: '"민지"' }] }], heap: { h1: { fields: [{ key: 'name', value: '"민지"' }, { key: 'age', value: '20' }] } }, note: '<code>{ name } = user</code> → user.name의 <b>값 "민지"를 꺼내 복사</b> → 변수 name은 <b>자기 셀</b>(독립). 봉투 안 "민지"와 <b>별개</b>. (통째로 담는 게 아니다!)', engine: '문자열은 불변이라 값 복사=포인터 복사와 관찰상 동일. name 슬롯은 "민지"를 가리킨다.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'user', ref: 'h1' }, { name: 'name', value: '"지훈"', bad: true }] }], heap: { h1: { fields: [{ key: 'name', value: '"민지"' }, { key: 'age', value: '20' }] } }, note: '<code>name = "지훈"</code> → <b>name의 화살표만</b> "지훈"으로 옮긴다(재할당). <b>user.name은 "민지" 그대로</b> — 꺼낼 때 복사돼 독립이니까. 원시값 구조분해는 <b>복사</b>(M4).', engine: 'name 슬롯을 "지훈"으로 재연결. h1은 손 안 댐 — 둘은 처음부터 별개 셀.' },
      ],
    }))

    root.querySelector('[data-m="real"]').append(Runner({ showBox: false, code: [
      '// ① 기본값 — 없으면 이 값을 쓴다',
      'let { color = "검정" } = { size: "L" }',
      'print(color)              // "검정" (color 키가 없어 기본값)',
      '',
      '// ② 별칭 — 다른 이름으로 받기',
      'let { name: userName } = { name: "민지" }',
      'print(userName)           // "민지" (name을 userName으로)',
      '',
      '// ③ 함수 매개변수를 바로 풀기 (실무 최다 패턴)',
      'function greet({ name, age }) { return name + "(" + age + ")" }',
      'print(greet({ name: "민지", age: 20 }))   // "민지(20)"',
      '',
      '// ④ 두 값 교환 — 임시변수 없이',
      'let x = 1, y = 2',
      ';[x, y] = [y, x]',
      'print(x + "," + y)        // "2,1"',
    ].join('\n') }))

    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '꺼낸 값이 <b>원시</b>면 복사(독립), <b>객체</b>면 주소(공유)다. 아래에서 <code>o.inner.v</code>는?<pre class="err-code" style="color:inherit;background:transparent">let o = { inner: { v: 1 } }\nlet { inner } = o\ninner.v = 9</pre>',
      options: ['9 — inner는 객체라 <b>주소를 꺼냄</b>(공유) → 원본도 바뀐다', '1 — 꺼내면 무조건 복사라 원본은 그대로', '에러 — 중첩 객체는 구조분해 못 한다'],
      answer: 0,
      explain: '<code>inner</code>는 <b>객체</b>라 구조분해가 <b>주소를 꺼낸다</b>(값 복사가 아니라 참조 복사) → 변수 inner와 o.inner가 <b>같은 봉투</b>. <code>inner.v = 9</code>는 그 봉투를 고치니 <b>o.inner.v도 9</b>. (원시값이었다면 복사돼 독립이었다 — M4 규칙 그대로.)',
    }))

    wireGoto(root)
  }
})()
