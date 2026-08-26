// 🧠 스프레드 … — 새 봉투 뜨기 (얕은 복사)
// 봉투 3부작의 마무리: 해부(objanat) → 조화(objprim) → 통째로 복사하는 법(여기).
// 관통 진실: { ...obj }는 봉투 칸을 '한 겹만' 새 봉투에 복사한다(얕은 복사) —
//   원시 칸=값 복사(독립) · 객체 칸=주소 복사(여전히 공유). 이게 얕은 복사의 함정.
//
// 오해: { ...obj }면 완전히 딴 객체다 (깊이까지 독립)
// 왜:   한 겹만 복사(얕은 복사) — 원시 칸=값 복사(독립)·객체 칸=주소만 복사(여전히 공유)
// 대비: copy.hp=0(독립·원본 그대로) vs copy.best.n=…(중첩 공유·원본에 샘) → best도 {...} 떠야 끊김

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  window.Lessons['spread'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 봉투 3부작 ③</span>
        <h2>스프레드 <code>...</code> — 새 봉투 뜨기</h2>
        <p>objanat에서 객체를 <b>'캐릭터의 데이터를 담은 상자(봉투)'</b>로 봤다. 별칭이 문제라면(objprim·M4의 그 통증) — 이번엔 그 봉투를 <b>통째로 새로 떠서</b> 원본과 별개인 사본을 만든다(캐릭터를 복제하듯).
        <code>{ ...obj }</code>가 그 도구다. 단, <b>한 겹만</b> 복사한다(얕은 복사) — 그 경계를 메모리로 정확히 본다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p><b><code>{ ...p }</code>는 <u>새 봉투</u>를 만들고 p의 칸을 <u>한 겹</u> 복사한다.</b>
        원시 칸은 <b>값이 복사</b>돼 독립 · 객체 칸은 <b>주소만 복사</b>돼 <b>여전히 같은 봉투(공유)</b>.
        이게 <b>얕은 복사(shallow copy)</b> — objanat의 "칸에 값이냐 주소표냐"가 그대로 적용된다. 흐릿하면 → <button class="inline-goto" data-goto="objprim">🧠 조화 연습</button></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "<code>{ ...obj }</code>면 완전히 딴 객체다"</div>
        <p class="section-desc" style="margin:0"><b>절반만 맞다.</b> 새 봉투가 생기는 건 맞지만 <b>한 겹만</b> 복사한다. 봉투 안의 <b>또 다른 봉투(중첩 객체·배열)</b>는 <b>주소만 복사</b>돼 원본과 <b>계속 공유</b>된다 — 그래서 중첩을 고치면 원본에 샌다. "새 봉투 = 완전 독립"이 최대 착각.</p>
      </div>

      <h3 class="section-title">① 왜 필요한가 — 별칭을 끊는 도구</h3>
      <span class="learn-tag">📎 let b = a는 같은 봉투(별칭) · let b = { ...a }는 새 봉투(사본)</span>
      <div class="card"><div class="file-label">🔬 별칭 vs 사본</div><div data-m="why"></div></div>

      <h3 class="section-title">② 눈으로 — 얕은 복사의 경계 (원시는 독립, 중첩은 공유)</h3>
      <span class="learn-tag">📎 ▶ — copy.hp는 원본과 갈라서고(독립), copy.best는 원본과 같은 봉투(공유)로 남는다</span>
      <div data-m="mem"></div>

      <h3 class="section-title">③ 배열도 똑같다 — <code>[ ...arr ]</code></h3>
      <span class="learn-tag">📎 [ ...arr ]도 새 배열(한 겹) — 원소가 원시면 독립, 객체면 그 원소는 여전히 공유</span>
      <div data-m="qz-arrobj"></div>
      <div class="card"><div class="file-label">🔬 배열 사본 — 원시 원소는 독립, 객체 원소는 공유(대비)</div><div data-m="arr"></div></div>

      <h3 class="section-title">④ 불변 업데이트 — "고치지 말고 새로 떠라"</h3>
      <span class="learn-tag">📎 { ...obj, key: 새값 } — 원본은 그대로 두고, 한 칸만 바꾼 새 봉투를 만든다(React의 그 관례)</span>
      <div data-m="qz-imm"></div>
      <div data-m="qz-nested"></div>
      <div class="card" style="border-color:var(--red)"><div class="file-label">🐛 실전 지뢰 — 중첩 상태를 얕게만 복사했다가 원본 오염 → 고치기</div><div data-m="nestedfix"></div></div>
      <p class="section-desc" style="opacity:.85">React에서 <code>obj.age = 31; setState(obj)</code>가 화면을 안 바꾸는 이유가 objanat의 그 그림이다 — 봉투 <b>주소가 그대로</b>라 "같은 객체"로 보고 넘긴다. 그래서 <code>setState({ ...obj, age: 31 })</code>처럼 <b>새 봉투</b>를 떠서 준다. 스프레드가 그 새 봉투를 뜨는 도구.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b><code>{ ...p }</code>·<code>[ ...arr ]</code> = 새 봉투/배열을 한 겹 복사.</b>
        원시 칸은 값 복사(독립) · 객체 칸은 주소 복사(공유·얕은 복사). 깊이 독립시키려면 <b>중첩도 각각 스프레드</b>(<code>{ ...p, best: { ...p.best } }</code>). 불변 업데이트 = <code>{ ...obj, key: 새값 }</code>.</p>
      </div>

      <h3 class="section-title">⑤ 🎯 예측 드릴 — 손에 붙이자</h3>
      <p class="section-desc">매 문제, <b>그 칸이 원시(값·독립)냐 객체(주소·공유)냐</b>부터 판정하라. 사이드바 이 강의 아래 <b>쉬움·보통·어려움</b> 3단계:</p>
      <div class="practice-cta"><span>예측 드릴 —</span><button class="chip on" data-goto="spread:easy">🟢 쉬움</button><button class="chip on" data-goto="spread:normal">🟡 보통</button><button class="chip on" data-goto="spread:hard">🔴 어려움</button></div>

      <div class="practice-cta"><span>이제 복사·공유를 변수 관점에서 형식화 —</span><button class="chip on" data-goto="ref">🧠 M4-1 · 값 = 복사 →</button></div>
    `

    root.querySelector('[data-m="why"]').append(Runner({ showBox: false, code: [
      'let a = { hp: 100 }',
      'let alias = a          // 같은 봉투(별칭)',
      'let copy  = { ...a }   // 새 봉투(사본)',
      '',
      'alias.hp = 0',
      'print(a.hp)            // 0   ← 별칭이라 원본도 바뀜',
      '',
      'let b = { hp: 100 }',
      'let c = { ...b }',
      'c.hp = 0',
      'print(b.hp)            // 100 ← 사본이라 원본은 안전',
    ].join('\n') }))

    root.querySelector('[data-m="qz-arrobj"]').append(Quiz({
      q: '🔮 예측 — <code>list[0].hp</code>는?<pre class="err-code" style="color:inherit;background:transparent">let list = [{ hp: 100 }]   // 원소가 객체!\nlet copy = [ ...list ]\ncopy[0].hp = 0</pre>',
      options: ['100 — 새 배열(<code>[...]</code>)이니 원소도 독립이다', '0 — 원소가 객체라 주소만 복사돼 그 객체는 공유', '에러 — 배열 안 객체는 스프레드가 안 된다'],
      answer: 1,
      explain: '배열의 <b>0번 칸엔 객체 주소</b>가 들었다 → <code>[ ...list ]</code>는 그 <b>주소만 복사</b>(얕은 복사) → copy[0]과 list[0]은 <b>같은 봉투</b> → <code>copy[0].hp=0</code>이 list[0].hp도 0. "새 배열이니 독립"은 <b>한 겹</b>만 맞다 — 배열도 <b>객체를 담으면 그 칸은 주소</b>. (원소가 원시(숫자)였다면 값복사라 독립 — 아래에서 나란히 본다.)',
    }))
    root.querySelector('[data-m="arr"]').append(Runner({ showBox: false, code: [
      'let nums = [1, 2]              // 원소가 원시(숫자)',
      'let copyA = [ ...nums ]',
      'copyA.push(9)',
      'print(nums.length)            // 2   ← 원본 그대로(원시 원소라 독립)',
      '',
      'let list = [{ hp: 100 }]      // 원소가 객체!',
      'let copyB = [ ...list ]',
      'copyB[0].hp = 0',
      'print(list[0].hp)             // 0   ← 원본도 바뀜! 객체 원소는 주소만 복사(공유)',
    ].join('\n') }))

    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '{ ...p }는 새 봉투 — hp는 값복사(독립), best는 주소복사(공유)',
      stackLabel: '📇 이름표 장부',
      code: ['let p = { hp: 100, best: { n: "효니" } }', 'let copy = { ...p }', 'copy.hp = 0', 'copy.best.n = "보리"'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'n', value: '"효니"' }] } }, note: 'p 봉투 <b>h1</b>: hp 칸엔 <b>값 100</b>, best 칸엔 <b>주소표(→h2)</b>. h2는 효니 봉투.', engine: 'h1은 hidden class(hp:SMI 인라인, best:포인터). h2는 별도 힙 객체.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }, { name: 'copy', ref: 'h3' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'n', value: '"효니"' }] }, h3: { fields: [{ key: 'hp', value: '100' }, { key: 'best', ref: 'h2' }] } }, note: '<b>{ ...p }</b> → <b>새 봉투 h3</b>를 만들고 p의 칸을 <b>한 겹</b> 복사. hp는 <b>값 100 복사</b>(독립된 칸) · best는 <b>주소만 복사</b> → h3.best도 <b>같은 h2</b>를 가리킨다! ← 얕은 복사.', engine: '스프레드는 자체(own·enumerable) 속성을 새 객체에 얕게 복사. 원시는 값, 객체 필드는 참조(포인터)만 복사된다.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }, { name: 'copy', ref: 'h3' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'n', value: '"효니"' }] }, h3: { fields: [{ key: 'hp', value: '0', bad: true }, { key: 'best', ref: 'h2' }] } }, note: '<code>copy.hp = 0</code> → <b>h3만</b> 고친다. <b>p.hp는 100 그대로</b> — hp는 값이 복사돼 <b>독립</b>이니까.', engine: 'h3의 hp 슬롯만 제자리 갱신. h1은 손 안 댐.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }, { name: 'copy', ref: 'h3' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'n', value: '"보리"', bad: true }] }, h3: { fields: [{ key: 'hp', value: '0', bad: true }, { key: 'best', ref: 'h2' }] } }, note: '<code>copy.best.n = "보리"</code> → copy.best와 p.best는 <b>같은 h2</b>! 그래서 <b>p.best.n도 "보리"</b>로 샌다. ← <b>얕은 복사의 함정</b>(중첩은 공유). 깊이 끊으려면 <code>best: { ...p.best }</code>도 떠야 한다.', engine: 'h2의 n 슬롯을 고침 — h1·h3 둘 다 h2를 가리키므로 양쪽에서 보인다.' },
      ],
    }))

    root.querySelector('[data-m="qz-imm"]').append(Quiz({
      q: '원본을 <b>안 건드리고</b> hp만 50인 <b>새 객체</b>를 만들려면?<pre class="err-code" style="color:inherit;background:transparent">let p = { hp: 100, name: "민지" }</pre>',
      options: ['<code>let q = { ...p, hp: 50 }</code>', '<code>p.hp = 50</code>', '<code>let q = p; q.hp = 50</code>'],
      answer: 0,
      explain: '<code>{ ...p, hp: 50 }</code>는 p의 칸을 새 봉투에 복사한 뒤 hp만 50으로 <b>덮어쓴다</b>(뒤 값이 우선) — 원본 p는 그대로. 나머지 둘은 원본을 고치거나(<code>p.hp=50</code>) 별칭이라(<code>q=p</code>) 원본도 바뀐다.',
    }))
    root.querySelector('[data-m="qz-nested"]').append(Quiz({
      q: '🔮 예측 — <code>{ ...state }</code>로 새로 떴는데도 <code>state.todos</code>가 오염될까?<pre class="err-code" style="color:inherit;background:transparent">let state = { title: "할일", todos: ["산책"] }\nlet next = { ...state }\nnext.todos.push("공부")</pre>',
      options: ['["산책"] — <code>{ ...state }</code>로 새 객체를 떴으니 todos도 독립', '["산책", "공부"] — todos 칸은 배열 주소만 복사돼 공유, push가 원본에 샌다', '["공부"] — push가 기존 걸 덮어쓴다'],
      answer: 1,
      explain: '<code>{ ...state }</code>는 <b>한 겹</b>만 복사한다 — title(문자열)은 값복사로 독립이지만, <b>todos 칸엔 배열 \'주소\'</b>가 들어 그 주소만 복사된다. next.todos와 state.todos는 <b>같은 배열</b> → push가 원본에도 샌다. <b>이게 불변 업데이트 최대 지뢰</b>("스프레드했으니 안전"이 착각). 안전하려면 <b>중첩도 새로</b>: <code>{ ...state, todos: [...state.todos, "공부"] }</code>.',
    }))
    root.querySelector('[data-m="nestedfix"]').append(Runner({ showBox: false, code: [
      'let state = { title: "할일", todos: ["산책"] }',
      '',
      '// ❌ 얕게만 복사 — todos(배열 칸)는 주소 공유라 원본이 오염된다',
      'let bad = { ...state }',
      'bad.todos.push("공부")',
      'print(state.todos.length)    // 2  ← 원본이 샜다! (버그)',
      '',
      '// ✅ 중첩(todos)도 새로 떠서 공유를 끊는다',
      'let state2 = { title: "할일", todos: ["산책"] }',
      'let ok = { ...state2, todos: [...state2.todos, "공부"] }',
      'print(state2.todos.length)   // 1  ← 원본 안전',
      'print(ok.todos.length)       // 2',
    ].join('\n') }))

    wireGoto(root)
  }
})()
