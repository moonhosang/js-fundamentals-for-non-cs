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

      <h3 class="section-title">② 눈으로 — 얕은 복사의 경계 (원시는 사본, 객체는 참조)</h3>
      <span class="learn-tag">📎 판별은 <b>위치(중첩)가 아니라 타입</b> — 막둥이 <code>{ ...hyoni }</code>: name·age는 <b>값을 복사(사본)</b>라 효니와 갈라서고, mother·father는 <b>주소를 복사(참조)</b>라 <b>같은 부모를 공유</b>(형제처럼)</span>
      <div data-m="mem"></div>

      <h3 class="section-title">③ 🎚️ 그래서 '얕다'가 뭔데? — 깊이(층)로 보기</h3>
      <span class="learn-tag">📎 객체가 객체를 품으면 '층(깊이)'이 생긴다 · 얕은 복사 = 맨 위 1층만 새로, 그 아래 층은 원본과 공유</span>
      <p class="section-desc">②는 2층짜리였다(<code>best</code> 봉투 안에 효니). 층이 더 깊어지면? 먼저 <b>'깊이'</b>부터 — 객체 안에 객체, 그 안에 또 객체. 이 <b>겹의 수가 깊이(층)</b>다:</p>
      <div style="font-family:var(--font-mono);font-size:13px;line-height:1.5;margin:12px 0">
        <div style="border:2px solid #4D96FF;border-radius:10px;padding:10px 12px;background:rgba(77,150,255,.07)">
          <b style="color:#4D96FF">1층 · a</b> = { x: 1,&nbsp; child: ↓ }
          <div style="border:2px solid #a78bfa;border-radius:10px;padding:10px 12px;margin-top:8px;background:rgba(167,139,250,.07)">
            <b style="color:#a78bfa">2층 · child</b> = { y: 2,&nbsp; grand: ↓ }
            <div style="border:2px solid #f472b6;border-radius:10px;padding:10px 12px;margin-top:8px;background:rgba(244,114,182,.07)">
              <b style="color:#f472b6">3층 · grand</b> = { z: 3 }
            </div>
          </div>
        </div>
      </div>
      <p class="section-desc"><b>얕은 복사(shallow)</b> = <code>{ ...a }</code>는 <b>맨 바깥 1층만</b> 새 봉투로 뜬다. 1층의 <b>원시 칸</b>(x)은 값이 복제돼 그 자리서 독립, <b>객체 칸</b>(child)은 <b>주소만</b> 복제 → <b style="color:#a78bfa">2층</b>·<b style="color:#f472b6">3층</b>은 <b>원본과 똑같은 봉투(공유)</b>. "얕다"= 표면 <b>한 겹</b>만 긁는다는 뜻이다. <b>깊은 복사(deep)</b> = <b>바닥층까지 전부</b> 새로 떠 아무것도 안 공유.</p>
      <div class="card"><div class="file-label">🎬 3층 그래프에서 — <code>{ ...a }</code>가 어디까지 새로 뜨고 어디부터 공유인가 (▶ 한 단계씩)</div><div data-m="sim-depth"></div></div>
      <div data-m="qz-depth"></div>
      <p class="section-desc">🔑 규칙은 <b>모든 층에서 똑같다</b> — 그 칸이 <b>원시면 값 복제</b>(그 층에서 독립), <b>객체면 주소 복제</b>(다음 층 공유). 얕은 복사가 특별한 건 <b>딱 1층에서만</b> 이 복제를 하고 멈춘다는 것 → 그래서 <b>첫 객체 칸을 만나는 순간, 그 아래로는 전부 공유</b>. 깊이 끊으려면 <b>층마다 스프레드</b>하거나 → <button class="inline-goto" data-goto="json">JSON 왕복(깊은 복사)</button>:</p>
      <div class="card"><div class="file-label">🔬 얕은 복사(깊은 것 샘) vs 깊은 복사(층마다 스프레드 = 완전 독립)</div><div data-m="deepcopy"></div></div>

      <h3 class="section-title">④ 배열도 똑같다 — <code>[ ...arr ]</code></h3>
      <span class="learn-tag">📎 [ ...arr ]도 새 배열(한 겹) — 원소가 원시면 독립, 객체면 그 원소는 여전히 공유</span>
      <div data-m="qz-arrobj"></div>
      <div class="card"><div class="file-label">🔬 배열 사본 — 원시 원소는 독립, 객체 원소는 공유(대비)</div><div data-m="arr"></div></div>

      <h3 class="section-title">⑤ 불변 업데이트 — "고치지 말고 새로 떠라"</h3>
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

      <h3 class="section-title">⑥ 🎯 예측 드릴 — 손에 붙이자</h3>
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
      title: '얕은 복사 { ...hyoni } — name·age는 사본(독립), 엄마·아빠는 참조(공유)',
      stackLabel: '📇 이름표 장부',
      code: [
        'const hyoni = {',
        '  name: "효니", age: 28,             // 원시',
        '  mother: { name: "엄마", age: 48 },  // 객체',
        '  father: { name: "김우빈", age: 50 },// 객체',
        '}',
        'const youngest = { ...hyoni }        // 막둥이 — 얕은 복사',
        'youngest.age = 21                    // 원시 → 사본(독립)',
        'youngest.mother.name = "신민아"       // 객체 → 참조(공유!)',
      ],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"효니"' }, { key: 'age', value: '28' }, { key: 'mother', ref: 'h2' }, { key: 'father', ref: 'h3' }] }, h2: { fields: [{ key: 'name', value: '"엄마"' }, { key: 'age', value: '48' }] }, h3: { fields: [{ key: 'name', value: '"김우빈"' }, { key: 'age', value: '50' }] } }, note: '효니(h1) — <b>원시 칸</b>(name·age)엔 값이 그대로, <b>mother·father 칸엔 주소표</b>(→엄마 h2·아빠 h3). 엄마·아빠는 각자 봉투다.', engine: 'h1의 name·age는 인라인, mother·father 필드엔 h2·h3 포인터. 엄마·아빠는 별도 힙 객체.' },
        { line: 5, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'youngest', ref: 'h4' }] }], heap: { h1: { fields: [{ key: 'name', value: '"효니"' }, { key: 'age', value: '28' }, { key: 'mother', ref: 'h2' }, { key: 'father', ref: 'h3' }] }, h2: { fields: [{ key: 'name', value: '"엄마"' }, { key: 'age', value: '48' }] }, h3: { fields: [{ key: 'name', value: '"김우빈"' }, { key: 'age', value: '50' }] }, h4: { fields: [{ key: 'name', value: '"효니"' }, { key: 'age', value: '28' }, { key: 'mother', ref: 'h2' }, { key: 'father', ref: 'h3' }] } }, note: '<b>{ ...hyoni } → 새 봉투 h4(막둥이).</b> name·age는 <b>값을 복사(사본)</b> → 막둥이만의 칸. mother·father는 <b>주소를 복사(참조)</b> → 막둥이도 <b>같은 엄마(h2)·아빠(h3)</b>를 가리킨다! <b>형제가 부모를 공유</b>하듯 — 얕은 복사.', engine: '스프레드는 1층 자체 속성만 얕게 복사: 원시는 값, 객체 필드는 포인터(참조)만. h2·h3는 새로 안 만듦.' },
        { line: 6, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'youngest', ref: 'h4' }] }], heap: { h1: { fields: [{ key: 'name', value: '"효니"' }, { key: 'age', value: '28' }, { key: 'mother', ref: 'h2' }, { key: 'father', ref: 'h3' }] }, h2: { fields: [{ key: 'name', value: '"엄마"' }, { key: 'age', value: '48' }] }, h3: { fields: [{ key: 'name', value: '"김우빈"' }, { key: 'age', value: '50' }] }, h4: { fields: [{ key: 'name', value: '"효니"' }, { key: 'age', value: '21', bad: true }, { key: 'mother', ref: 'h2' }, { key: 'father', ref: 'h3' }] } }, note: '<code>youngest.age = 21</code> → <b>h4(막둥이)만</b> 21로. <b>효니.age는 28 그대로</b> — age는 원시라 <b>사본(값 복사)</b>이니 독립.', engine: 'h4의 age 슬롯만 갱신. h1 손 안 댐.' },
        { line: 7, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'youngest', ref: 'h4' }] }], heap: { h1: { fields: [{ key: 'name', value: '"효니"' }, { key: 'age', value: '28' }, { key: 'mother', ref: 'h2' }, { key: 'father', ref: 'h3' }] }, h2: { fields: [{ key: 'name', value: '"신민아"', bad: true }, { key: 'age', value: '48' }] }, h3: { fields: [{ key: 'name', value: '"김우빈"' }, { key: 'age', value: '50' }] }, h4: { fields: [{ key: 'name', value: '"효니"' }, { key: 'age', value: '21', bad: true }, { key: 'mother', ref: 'h2' }, { key: 'father', ref: 'h3' }] } }, note: '<code>youngest.mother.name = "신민아"</code> → 막둥이.mother와 효니.mother는 <b>같은 h2</b>(참조 공유)! 그래서 <b>효니.mother.name도 "신민아"</b> — 한 엄마니까 당연. <b>원시(age)는 사본이라 독립, 객체(mother)는 참조라 공유.</b>', engine: 'h2의 name을 고침 — h1·h4 둘 다 mother 칸이 h2를 가리키므로 양쪽에서 보인다.' },
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
    root.querySelector('[data-m="sim-depth"]').append(MemoryModel({
      title: '얕은 복사 { ...a } — 1층만 새 봉투, 2·3층은 공유',
      stackLabel: '📇 이름표 장부',
      code: [
        'let a = { x: 1, child: { y: 2, grand: { z: 3 } } }',
        'let b = { ...a }          // 얕은 복사 — 1층만',
        'b.x = 9                   // 1층 원시',
        'b.child.grand.z = 9       // 3층 깊숙이',
      ],
      steps: [
        { line: 0,
          stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }] }],
          heap: { h1: { fields: [{ key: 'x', value: '1' }, { key: 'child', ref: 'h2' }] }, h2: { fields: [{ key: 'y', value: '2' }, { key: 'grand', ref: 'h3' }] }, h3: { fields: [{ key: 'z', value: '3' }] } },
          note: '<b>3층 그래프</b> — a(h1)의 child 칸은 <b>주소표(→h2)</b>, h2의 grand 칸도 <b>주소표(→h3)</b>. 각 층 원시(x·y·z)만 그 봉투 안에 든 값이다.',
          engine: '리터럴 3개 → 힙 할당 3번(h1·h2·h3). child·grand 필드엔 포인터.' },
        { line: 1,
          stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h4' }] }],
          heap: { h1: { fields: [{ key: 'x', value: '1' }, { key: 'child', ref: 'h2' }] }, h2: { fields: [{ key: 'y', value: '2' }, { key: 'grand', ref: 'h3' }] }, h3: { fields: [{ key: 'z', value: '3' }] }, h4: { fields: [{ key: 'x', value: '1' }, { key: 'child', ref: 'h2' }] } },
          note: '<b>{ ...a } → 새 봉투 h4는 딱 1층만.</b> x는 값 1 <b>복제</b>(독립 칸) · child 칸은 <b>주소만 복제 → h4.child도 h2</b>(a.child와 <b>같은 봉투</b>!). <b>2·3층(h2·h3)은 새로 안 만든다 — 공유.</b> 얕은 복사는 여기서 멈춘다.',
          engine: 'h4는 새 객체지만 child 필드엔 h2 포인터를 그대로 복사. h2·h3는 재사용(할당 없음).' },
        { line: 2,
          stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h4' }] }],
          heap: { h1: { fields: [{ key: 'x', value: '1' }, { key: 'child', ref: 'h2' }] }, h2: { fields: [{ key: 'y', value: '2' }, { key: 'grand', ref: 'h3' }] }, h3: { fields: [{ key: 'z', value: '3' }] }, h4: { fields: [{ key: 'x', value: '9', bad: true }, { key: 'child', ref: 'h2' }] } },
          note: '<code>b.x = 9</code> → <b>h4의 x만</b> 9. <b>a.x는 1 그대로</b> — 1층 원시라 값이 복제돼 독립.',
          engine: 'h4의 x 슬롯만 갱신. h1 손 안 댐.' },
        { line: 3,
          stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h4' }] }],
          heap: { h1: { fields: [{ key: 'x', value: '1' }, { key: 'child', ref: 'h2' }] }, h2: { fields: [{ key: 'y', value: '2' }, { key: 'grand', ref: 'h3' }] }, h3: { fields: [{ key: 'z', value: '9', bad: true }] }, h4: { fields: [{ key: 'x', value: '9', bad: true }, { key: 'child', ref: 'h2' }] } },
          note: '<code>b.child.grand.z = 9</code> → b.child는 <b>h2(공유)</b> → grand는 <b>h3(공유)</b> → z를 9로. <b>a.child.grand.z도 9!</b> — 3층은 공유 경계 아래라 원본에 샌다. <b>첫 객체 칸(child)을 만나는 순간, 아래로는 전부 공유.</b>',
          engine: 'h3의 z를 고침 — h1·h4 둘 다 h2→h3 경로로 도달하므로 양쪽에서 보인다.' },
      ],
    }))
    root.querySelector('[data-m="qz-depth"]').append(Quiz({
      q: '🎯 판별 — <code>b.x=9</code>·<code>b.child.grand.z=9</code> 후, <b>a.x</b>와 <b>a.child.grand.z</b>는?<pre class="err-code" style="color:inherit;background:transparent">let a = { x: 1, child: { y: 2, grand: { z: 3 } } }\nlet b = { ...a }\nb.x = 9\nb.child.grand.z = 9</pre>',
      options: [
        'a.x=1, a.child.grand.z=3 — <code>{ ...a }</code>로 복사했으니 다 독립',
        'a.x=9, a.child.grand.z=9 — 복사본이 원본과 이어져 다 샌다',
        'a.x=1, a.child.grand.z=9 — 1층 원시는 독립, 깊은 객체는 공유',
        'a.x=9, a.child.grand.z=3 — 얕으니 얕은(1층) 것만 샌다',
      ],
      answer: 2,
      explain: '1층 <b>x는 원시</b> → 값 복제라 독립 → a.x는 <b>1</b>. child는 <b>객체 칸</b>이라 얕은 복사가 <b>주소만</b> 복제 → b.child·a.child는 같은 봉투 → 그 아래 grand·z도 공유 → a.child.grand.z도 <b>9</b>. <b>"얕다"는 깊은 걸 안 건드린다가 아니라, 1층만 새로 뜨고 그 아래(깊은 것)는 원본과 공유</b>라는 뜻 — 오히려 깊은 쪽이 샌다.',
    }))
    root.querySelector('[data-m="deepcopy"]').append(Runner({ showBox: false, code: [
      'let a = { x: 1, child: { grand: { z: 3 } } }',
      '',
      '// ❌ 얕은 복사 — 1층만 새로, 깊은 grand는 공유',
      'let sh = { ...a }',
      'sh.child.grand.z = 9',
      'print(a.child.grand.z)   // 9  ← 깊은 것이 샜다',
      '',
      '// ✅ 깊은 복사 — 층마다 스프레드해서 바닥까지 새로',
      'let a2 = { x: 1, child: { grand: { z: 3 } } }',
      'let dp = { ...a2, child: { ...a2.child, grand: { ...a2.child.grand } } }',
      'dp.child.grand.z = 9',
      'print(a2.child.grand.z)  // 3  ← 원본 안전 (완전 독립)',
    ].join('\n') }))

    wireGoto(root)
  }
})()
