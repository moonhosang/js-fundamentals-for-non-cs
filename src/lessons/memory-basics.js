// 🧠 메모리 기초 챕터 — RAM → 스택 → 힙 → 값복사vs참조 (바닥부터 단계별)
// [notional machine] 실제 CPU가 아니라 "이렇게 상상하면 동작을 정확히 예측하는" 일관된 모형.
// 콜 스택 심화·클로저는 함수(6강) 뒤 '메모리 심화'로.

;(function () {
  window.Lessons = window.Lessons || {}

  const wireCTA = (root) => {
    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(/^\d+$/.test(t) ? Number(t) : t) : (location.hash = '#' + t) }
  }

  // ══ M1 · 메모리(RAM)란 ══════════════════════════════════════
  window.Lessons['ram'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M1</span>
        <h2>메모리(RAM) — 값이 잠깐 사는 작업 공간</h2>
        <p>변수에 값을 담으면 그 값은 <b>어딘가에</b> 실제로 저장된다. 그 어딘가가 <b>메모리(RAM)</b>다. 스택·힙을 배우기 전에, 그 무대부터 본다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><b>RAM</b>(Random Access Memory)은 프로그램이 <b>값을 잠깐 적어두는</b> 아주 빠른 작업 공간이다.
        번호(<b>주소</b>)가 붙은 칸이 줄지어 있고, 변수는 그중 어떤 칸에 값을 적고 <b>이름표</b>를 붙인 것이다.</p>
      </div>

      <h3 class="section-title">① 왜 메모리가 필요한가</h3>
      <p class="section-desc">컴퓨터가 <code>3 + 4</code>를 계산하려면 <b>3</b>과 <b>4</b>를 잠깐 어딘가에 적어둬야 한다. 그 "메모장"이 메모리다.
      변수 <code>let age = 20</code>은 곧 <b>"메모리 한 칸에 20을 적고 age라는 이름을 붙여라"</b>는 뜻이다.</p>

      <h3 class="section-title">② 칸에 이름 붙이기 — let · const · var (변수 vs 상수)</h3>
      <span class="learn-tag">📎 셋 다 'RAM 칸을 잡고 이름표를 붙인다'. 차이는 값이 아니라 — 이름표를 나중에 옮겨 달 수 있느냐</span>
      <p class="section-desc">값을 메모리에 두고 이름표를 붙이는 걸 <b>선언</b>이라 한다. 붙이는 방법이 셋 — <b>값이 사는 방식(RAM)은 똑같고</b>, 이름표를 <b>옮길 수 있느냐</b>만 다르다:</p>
      <ul class="section-list">
        <li><code>let</code> — <b>변수</b>: 이름표를 나중에 <b>다른 값으로 옮겨 달 수 있다</b>(재할당 O).</li>
        <li><code>const</code> — <b>상수</b>: 이름표를 한 번 달면 <b>못 옮긴다</b>(재할당 X). "안 바뀔 값"(세율·원주율·설정값)에 쓴다.</li>
        <li><code>var</code> — <b>옛날 방식</b>: 스코프·순서 함정이 있어 <b>지금은 거의 안 쓴다</b>. <b>let·const만</b> 기억하면 된다.</li>
      </ul>
      <div class="falsy-grid">
        <div class="card" style="margin:0"><div class="file-label" style="color:#16a34a">✅ let — 이름표를 옮길 수 있다</div>
          <pre class="err-code" style="color:inherit;background:transparent">let score = 10
score = 20      // 이름표를 20으로 옮김 ✅
// score → 20</pre></div>
        <div class="card" style="margin:0"><div class="file-label" style="color:#dc2626">❌ const — 옮기려 하면 에러</div>
          <pre class="err-code" style="color:inherit;background:transparent">const PI = 3.14
PI = 3          // 옮기기 금지 ❌
// TypeError: Assignment to constant</pre></div>
      </div>
      <div class="card">
        <div class="file-label">🔬 const를 옮기려 하면? (▶ 실행해서 에러를 직접 보라)</div>
        <div data-m="letconst"></div>
      </div>
      <p class="section-desc">🔑 흔한 오해 — "const는 <b>값</b>을 못 바꾸는 것"? ❌. const가 막는 건 <b>이름표를 옮기는 것(재할당)</b>이지 값의 타입·내용이 아니다. (객체를 const로 잡아도 그 <b>안의 내용</b>은 바뀔 수 있다 — 이름표만 고정. 자세힌 🧠 M4)</p>

      <h3 class="section-title">③ RAM의 모습 — 주소가 붙은 칸들</h3>
      <span class="learn-tag">📎 칸마다 번호(주소)가 있어 CPU가 아무 칸이나 즉시 읽는다 → 그래서 Random Access</span>
      <div class="card">
        <div class="file-label">📄 변수·객체·배열이 메모리에 놓인 모습 (개념도) — 칸은 <b>수십억 개</b></div>
        <div data-m="ramgrid"></div>
        <p class="section-desc" style="margin:10px 0 0">RAM엔 이런 칸이 <b>수십억 개</b>(기가바이트) — <b>⋯</b>는 "끝없이 이어진다"는 뜻. <b>변수·객체·배열</b> 온갖 것이 여기저기 칸에 놓인다. 원시값(<code>age=20</code>)은 작아 <b>한 칸</b>, 객체·배열은 커서 <b>여러 칸</b>을 차지한다. (이 RAM을 <b>스택·힙</b>으로 나눠 쓰는 건 다음 강의)</p>
      </div>

      <h3 class="section-title">④ 휘발성 — 끄면 사라진다 (디스크와 다름)</h3>
      <span class="learn-tag">📎 RAM = 넓고 빠른 '작업 책상' · 디스크(SSD) = 느리지만 영구인 '서랍'</span>
      <ul class="section-list">
        <li><b>RAM</b> — 빠르고 넓지만 <b>전원이 꺼지면 싹 지워진다</b>(휘발성). 프로그램이 도는 <b>동안만</b> 값을 둔다.</li>
        <li><b>디스크/SSD</b> — 느리지만 <b>영구</b>. 파일 저장, 사진, 문서는 여기에.</li>
        <li>비유: RAM은 지금 펼쳐 놓은 <b>작업 책상</b>(끝나면 치움), 디스크는 <b>서랍/캐비닛</b>(계속 보관).</li>
      </ul>

      <h3 class="section-title">⑤ 이 RAM을 '두 방식'으로 나눠 쓴다</h3>
      <p class="section-desc">프로그램은 이 메모리를 아무렇게나 쓰지 않고, 성격이 다른 <b>두 방식</b>으로 나눠 쓴다 — <b>스택</b>과 <b>힙</b>.
      다음 두 강의에서 각각 자세히 본다.</p>
      <div class="card">
        <div class="file-label">🗺️ 앞으로</div>
        <ul class="section-list" style="margin:0">
          <li><b>M2 · 스택</b> — 작고 빠르게 쌓고 뗀다(원시값·이름표 슬롯).</li>
          <li><b>M3 · 힙</b> — 크고 변하는 묶음(객체·배열)을 두는 창고.</li>
        </ul>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">값은 <b>메모리(RAM)</b>의 <b>주소 붙은 칸</b>에 저장된다. 변수 = 그 칸에 값을 적고 이름표를 붙인 것.
        RAM은 빠르지만 <b>끄면 사라진다</b>. 이 RAM을 스택·힙 두 방식으로 나눠 쓴다.</p>
      </div>

      <div class="practice-cta">
        <span>먼저 '스택' 방식부터 자세히 —</span>
        <button class="chip on" data-goto="stack">🧠 M2 · 스택 →</button>
      </div>
    `
    // RAM 격자 — 칸이 수십억 개임을 느끼게, 작은 칸을 잔뜩 + 양끝 ⋯.
    // 변수·객체·배열 등 온갖 것이 여기저기 칸에 놓인다.
    const grid = root.querySelector('[data-m="ramgrid"]')
    if (grid) {
      const wrap = document.createElement('div')
      wrap.className = 'ram-grid'
      const dots = () => { const d = document.createElement('span'); d.className = 'ram-dots'; d.textContent = '⋯'; return d }
      const items = {
        16: { lbl: '🏷️ 변수 age', val: '20', c: '#16a34a' },
        30: { lbl: '🔤 문자열', val: '"안녕"', c: '#0891b2' },
        58: { lbl: '📦 객체', val: '{ name: "민지", age: 24 }', c: '#6366f1' },
        96: { lbl: '📚 배열', val: '[1, 2, 3]', c: '#7c3aed' },
      }
      const N = 120
      wrap.append(dots())
      for (let i = 0; i < N; i++) {
        const it = items[i]
        if (it) {
          const hi = document.createElement('div')
          hi.className = 'ram-hi'
          hi.innerHTML = `<span class="lbl" style="color:${it.c}">${it.lbl}</span><span class="cell" style="border-color:${it.c};color:${it.c};background:${it.c}1a">${it.val.replace(/</g, '&lt;')}</span>`
          wrap.append(hi)
        } else {
          const c = document.createElement('div')
          c.className = 'ram-c'
          wrap.append(c)
        }
      }
      wrap.append(dots())
      grid.append(wrap)
    }
    root.querySelector('[data-m="letconst"]').append(Runner({
      showBox: false,
      code: [
        'const rate = 0.1     // 세율 — 안 바뀔 값이라 const(상수)',
        'rate = 0.2           // 이름표를 옮기려 하면?',
        '// ▶ 실행하면 "Assignment to constant variable" 에러 — const가 막는다',
      ].join('\n'),
    }))
    wireCTA(root)
  }

  // ══ M2 · 스택 ═══════════════════════════════════════════════
  const SCENARIO_STACK_SLOTS = {
    title: '스택엔 이름표가 쌓인다 — 각자 값을 가진다', showHeap: false,
    code: ['let age = 20', 'let count = 3', 'let ok = true'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }] }], heap: {}, note: '<b>age</b>라는 이름표가 스택에 놓인다 — 값 20을 가진다. (왼쪽 age=이름, 오른쪽 20=값)' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'count', value: '3' }] }], heap: {}, note: 'count 이름표가 그 위에 쌓인다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'count', value: '3' }, { name: 'ok', value: 'true' }] }], heap: {}, note: '스택에 쌓이는 건 <b>이름표(변수)</b>다. 원시값은 이름표가 값을 <b>직접 가진다</b> — 하지만 <b>이름표(age) ≠ 값(20)</b>. 이 경계가 핵심.' },
    ],
  }
  const SCENARIO_PUSHPOP = {
    title: '함수가 함수를 부르면 — 칸이 쌓였다 사라진다', showHeap: false,
    code: [
      'function makeGreeting(name) {',
      '  return "안녕, " + name + "님"',
      '}',
      'function welcome(name) {',
      '  let msg = makeGreeting(name)',
      '  return "🎉 " + msg',
      '}',
      'const say = welcome("민지")',
    ],
    steps: [
      { line: 7, stack: [{ name: 'main', slots: [{ name: 'say', value: '(대기)', bad: true }] }, { name: 'welcome', slots: [{ name: 'name', value: '"민지"' }] }], heap: {},
        note: 'welcome("민지") 호출 → 스택에 <b>welcome 칸</b>이 push. 인수 "민지"가 name에. (main의 say는 아직 대기 — 반환을 기다린다)' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'say', value: '(대기)', bad: true }] }, { name: 'welcome', slots: [{ name: 'name', value: '"민지"' }] }, { name: 'makeGreeting', slots: [{ name: 'name', value: '"민지"' }] }], heap: {},
        note: 'welcome 안에서 makeGreeting을 부른다 → <b>또 push</b>. 이제 프레임이 <b>3개</b>(main · welcome · makeGreeting) 쌓였다.' },
      { line: 5, stack: [{ name: 'main', slots: [{ name: 'say', value: '(대기)', bad: true }] }, { name: 'welcome', slots: [{ name: 'name', value: '"민지"' }, { name: 'msg', value: '"안녕, 민지님"' }] }], heap: {},
        note: 'makeGreeting가 값을 반환 → 그 칸이 <b>통째로 pop(사라짐)</b>. 반환값이 welcome의 <b>msg</b>에 담긴다.' },
      { line: 7, stack: [{ name: 'main', slots: [{ name: 'say', value: '"🎉 안녕, 민지님"' }] }], heap: {},
        note: 'welcome도 반환 → <b>pop</b>. name·msg는 <b>사라졌지만</b>, 반환값은 main의 <b>say</b>에 담겼다. <b>프레임은 사라져도 결과는 남는다</b>(return으로 빼냈으니까 — §4의 이유).' },
    ],
  }
  window.Lessons['stack'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M2</span>
        <h2>스택 — 이름표가 쌓이는 곳</h2>
        <p>메모리(RAM)를 쓰는 첫 번째 방식. <b>작고 빠르게</b> 쌓고 뗀다. 지금 하는 작업의 <b>이름표 슬롯</b>들이 여기 산다.</p>
      </header>

      <h3 class="section-title">① 스택이란 — 접시 더미</h3>
      <span class="learn-tag">📎 마지막에 올린 걸 먼저 뗀다(LIFO) · 슬롯 = 이름표 + 값</span>
      <ul class="section-list">
        <li>접시를 쌓듯 <b>위로 쌓고</b>, 뗄 땐 <b>맨 위부터</b>(Last In, First Out).</li>
        <li>칸 하나 = <b>슬롯 = 이름표</b>. ⚠️ 변수는 값을 담는 <b>통이 아니라 이름표</b> — 값을 <b>가리킨다</b>. 원시값은 작고 불변이라 이름표가 그 값을 <b>바로 가리킨다</b>(칸에 적어 둔다).</li>
        <li>스택은 <b>빠르다</b> — 순서대로 쌓고 떼기만 하니까.</li>
      </ul>
      <div class="card">
        <div class="file-label">🃏 직접 쌓고(push) 빼보기(pop) — 마지막 게 먼저 나온다</div>
        <div data-m="stackviz"></div>
      </div>

      <h3 class="section-title">② 눈으로 — 이름표가 쌓이고, 각자 값을 가진다</h3>
      <span class="learn-tag">📎 경계 분명히 — 스택에 쌓이는 건 <b>데이터</b>가 아니라 <b>이름표(변수)</b>. 이름표 ≠ 값</span>
      <p class="section-desc">스택에 쌓이는 건 <b>이름표(변수)</b>다 — 데이터 자체가 아니라. 원시값은 작고 불변이라 이름표가 값을 <b>직접 가진다</b>(슬롯 = 이름 + 값).
      반대로 <b>큰 묶음(객체)</b>이면 값을 스택에 못 담고 <b>힙을 참조</b>한다(주소만 — 다음 M3). 어느 쪽이든 <b>변수(이름) ≠ 값(데이터)</b>라는 경계가 핵심이다.</p>
      <div data-m="slots"></div>

      <h3 class="section-title">③ 핵심 성질 — 작업이 끝나면 칸이 통째로 사라진다</h3>
      <span class="learn-tag">📎 함수를 부르면 새 칸(프레임) push, 끝나면 pop — 그 안 변수도 함께 사라진다 (함수는 6강)</span>
      <p class="section-desc">이게 스택에서 <b>가장 중요한</b> 성질이다. 함수 같은 "작업 구역"이 시작되면 스택에 <b>새 칸</b>이 생기고, 그 작업이 끝나면 <b>그 칸이 통째로 치워진다</b>. ▶로 직접 보라.</p>
      <div data-m="pushpop"></div>

      <h3 class="section-title">④ 왜 지워도 괜찮을까? — 여러 이유</h3>
      <span class="learn-tag">📎 데이터를 버리는 것 같지만 사실 안전하다 — 이유가 여럿이다</span>
      <ul class="section-list">
        <li><b>① 규약(스코프)</b> — 지역변수는 "그 함수 <b>안에서만</b> 쓴다"는 약속이다. 함수가 끝나면 밖에선 그 이름으로 <b>접근 자체가 안 된다</b>. 애초에 못 찾으니 지워도 문제없다.</li>
        <li><b>② 더 이상 쓸 곳이 없다</b> — 함수가 끝났다는 건 그 지역변수를 쓸 코드가 <b>더 없다</b>는 뜻. 남겨 둬도 그냥 <b>쓰레기</b>다.</li>
        <li><b>③ 필요한 건 이미 빼냈다</b> — 바깥이 필요로 하는 값은 <code>return</code>으로 <b>먼저 넘겼다</b>. (원시값은 복사돼 나가고, 객체는 <b>힙</b>에 있어 살아남는다 — 프레임엔 주소만 있었다.)</li>
        <li><b>④ LIFO라 안전하다</b> — 항상 <b>맨 위</b>(방금 끝난 것)만 지운다. 그 위엔 아무도 없어서, 이 칸에 <b>기대고 있는 진행 중 작업이 없다</b>. 아래 칸들은 멀쩡.</li>
        <li><b>⑤ 지워야 재사용된다</b> — 안 지우면 스택이 끝없이 쌓여 넘친다(Stack Overflow). 지운 공간을 <b>다음 함수 호출이 재사용</b>한다. (사실 비트를 지우는 게 아니라 "이 위는 없는 셈" 표시만 내려 — 그래서 <b>빠르다</b>.)</li>
        <li><b>⑥ 자동이라 편하다</b> — 개발자가 일일이 안 치워도, 함수만 끝나면 <b>저절로</b> 정리된다.</li>
      </ul>
      <p class="section-desc">⚠️ <b>딱 하나 예외</b> — 안쪽 함수가 그 지역변수를 <b>붙잡으면</b>(클로저) 안 지워지고 <b>힙으로 옮겨져 살아남는다</b>. 그건 <b>🧠 메모리 심화 · 클로저</b>에서.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">스택 = 이름표 슬롯이 <b>LIFO</b>로 쌓이는 빠른 공간. 원시값은 슬롯에 그대로.
        <b>작업이 끝나면 그 칸이 통째로 사라진다</b> — 규약상 밖에서 못 쓰고, 필요한 건 이미 빼냈고, 지워야 재사용되니 <b>안전하다</b>. 이게 다음 M3의 "왜 묶음은 힙에?"로 이어진다.</p>
      </div>

      <div class="practice-cta">
        <span>그럼 크고 오래 살아야 하는 묶음은? — 힙으로 —</span>
        <button class="chip on" data-goto="heap">🧠 M3 · 힙 →</button>
      </div>
    `
    root.querySelector('[data-m="stackviz"]').append(StackViz())
    root.querySelector('[data-m="slots"]').append(MemoryModel(SCENARIO_STACK_SLOTS))
    root.querySelector('[data-m="pushpop"]').append(MemoryModel(SCENARIO_PUSHPOP))
    wireCTA(root)
  }

  // ══ M3 · 힙 ═════════════════════════════════════════════════
  const SCENARIO_HEAP = {
    title: '묶음은 힙에, 슬롯엔 주소만',
    code: ['let age = 20', 'let tags = ["신상", "세일"]', 'let card = { name: "민지" }'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }] }], heap: {}, note: '원시값 age는 스택 슬롯에 그대로.', engine: 'SMI 태깅.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'tags', ref: 'h1' }] }], heap: { h1: { label: '["신상", "세일"]' } }, note: '<b>배열</b>은 힙으로. tags 슬롯엔 <b>주소</b>만 → 힙으로 화살표.', engine: '힙 할당, tags엔 포인터.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'tags', ref: 'h1' }, { name: 'card', ref: 'h2' }] }], heap: { h1: { label: '["신상", "세일"]' }, h2: { label: '{ name: "민지" }' } }, note: '<b>객체</b>도 힙으로. 힙에 박스 둘, 슬롯이 각각을 화살표로 가리킨다.', engine: '힙 할당 + 히든클래스.' },
    ],
  }
  const SCENARIO_STACK_FAIL = {
    title: '❌ 만약 묶음(객체)을 스택 칸에 뒀다면?',
    code: ['function makeCard() {', '  return { name: "민지" }', '}', 'let c = makeCard()'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'makeCard', slots: [{ name: '(객체)', value: '{ name: "민지" }' }] }], heap: {}, note: '<b>상상</b>: 객체를 힙이 아니라 <b>makeCard 칸(스택) 안</b>에 통째로 뒀다.' },
      { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'makeCard', slots: [{ name: '(객체)', value: '{ name: "민지" }' }] }], heap: {}, note: '이 객체를 <b>밖으로 반환</b>해 c에 담으려 한다.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'c', value: '💥 사라진 메모리', bad: true }] }], heap: {}, note: 'makeCard가 끝나 칸이 <b>pop(치워짐)</b> → M2에서 봤듯 <b>그 안의 객체도 함께 사라진다</b>. c는 없어진 메모리를 가리킨다 💥. <b>그래서</b> 오래 살아야 할 묶음은 스택이 아니라 <b>힙</b>에 둔다.' },
    ],
  }
  // 거꾸로 — 원시값이 힙에 사는 경우(객체 속성). 같은 20이 스택(age)과 힙(card.age)에.
  const SCENARIO_PRIM_IN_HEAP = {
    title: '같은 20인데 — age는 스택, card.age는 힙',
    code: ['let age = 20', 'let card = { age: 20, name: "민지" }'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }] }], heap: {}, note: '독립 변수 age의 20은 <b>스택 슬롯</b>에 직접.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'card', ref: 'h1' }] }],
        heap: { h1: { fields: [{ key: 'age', value: '20' }, { key: 'name', value: '"민지"' }] } },
        note: 'card 객체는 힙에. 그런데 그 안의 <b>age: 20</b>도 <b>힙(객체 안)</b>에 있다! 같은 숫자 20이 한 번은 스택(age), 한 번은 힙(card.age)에 산다.' },
    ],
  }

  window.Lessons['heap'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M3</span>
        <h2>힙 — 큰 묶음을 두는 창고</h2>
        <p>메모리를 쓰는 두 번째 방식. <b>크고 변하는 묶음</b>(객체·배열)을 두는 자유로운 창고다. 슬롯엔 <b>주소</b>만 담긴다.</p>
      </header>

      <h3 class="section-title">① 힙이란 — 자유로운 창고</h3>
      <ul class="section-list">
        <li>스택처럼 순서대로 쌓는 게 아니라, <b>빈자리에 자유롭게</b> 둔다.</li>
        <li>객체·배열처럼 <b>크거나 변하는</b> 것을 여기 둔다. 스택 슬롯엔 그 <b>주소</b>만 적는다.</li>
        <li>스택 칸과 달리, 힙 물건은 <b>아무도 안 가리킬 때까지</b> 산다(함수가 끝나도 살아남음 — 청소는 GC · 심화).</li>
      </ul>

      <h3 class="section-title">② 눈으로 — 묶음은 힙, 슬롯엔 주소</h3>
      <span class="learn-tag">📎 슬롯 → 힙 화살표가 곧 '주소를 가리킨다'는 뜻</span>
      <div data-m="heap"></div>

      <h3 class="section-title">③ 무엇이 어디로 — 분류</h3>
      <div class="card">
        <div class="file-label">📄 원시값(스택) vs 묶음(힙)</div>
        <div class="mem-cls">
          <div class="mem-cls-col">
            <div class="mem-cls-head" style="color:#16a34a">🟢 원시값 → 스택 슬롯에 직접</div>
            <ul class="section-list" style="margin:0"><li><b>숫자</b> · <b>문자열</b> · <b>참/거짓</b> · <b>null · undefined</b></li></ul>
            <p class="mem-cls-why">크기가 <b>고정</b>이라 슬롯에 딱 맞는다.</p>
          </div>
          <div class="mem-cls-col">
            <div class="mem-cls-head" style="color:var(--brand)">🔵 묶음(참조값) → 힙에, 슬롯엔 주소</div>
            <ul class="section-list" style="margin:0"><li><b>객체</b> <code>{ }</code> · <b>배열</b> <code>[ ]</code> · <b>함수</b>(6강)</li></ul>
            <p class="mem-cls-why">크기가 <b>가변</b>이라 슬롯에 못 넣는다.</p>
          </div>
        </div>
      </div>

      <h3 class="section-title">④ 왜 묶음은 스택 말고 힙인가 — 세 가지</h3>
      <ul class="section-list">
        <li><b>① 크기</b> — 객체·배열은 런타임에 <b>커질 수 있다</b>(계속 추가). 고정 크기인 스택 슬롯엔 안 맞는다.</li>
        <li><b>② 수명</b> — 스택 칸은 작업이 끝나면 <b>사라진다</b>(M2). 오래 살거나 함수 밖으로 나갈 묶음을 거기 두면 없어진다 → 아래 ⑤.</li>
        <li><b>③ 공유</b> — 여러 변수가 한 객체를 <b>같이 쓰려면</b>(별칭 · M4) 한 곳(힙)에 두고 <b>주소</b>를 나눈다.</li>
      </ul>

      <h3 class="section-title">⑤ ❌ 묶음을 스택에 두면? — M2의 pop 때문에 사라진다</h3>
      <span class="learn-tag">📎 M2에서 본 "칸이 통째로 사라짐"을 그대로 적용 — 뭐가(그 칸의 객체) 어디서(스택) 왜(pop)</span>
      <div data-m="fail"></div>
      <p class="section-desc">이 💥 때문에 JS는 묶음을 <b>힙</b>에 두고 슬롯엔 <b>주소만</b> 담는다. 그래서 함수가 끝나도 객체는 살아남는다(위 ②).</p>

      <h3 class="section-title">⑥ 거꾸로 — 원시값이 힙에 사는 경우</h3>
      <span class="learn-tag">📎 "원시값=스택"은 '독립 변수일 때' — 객체의 속성이면 그 원시값은 힙(객체 안)에 산다</span>
      <p class="section-desc">그럼 반대로 <b>원시값이 힙에</b> 있을 수도 있나? <b>있다.</b> 원시값이 <b>객체·배열의 속성</b>이면, 그 객체를 따라 힙에 산다.
      (앞서 본 효니의 hair·money도 다 힙에 있던 원시값이다.) 아래 — 같은 숫자 20이 스택(age)과 힙(card.age) 양쪽에.</p>
      <div data-m="priminheap"></div>
      <p class="section-desc">💡 그래서 정확한 규칙: <b>독립 변수로 담긴 원시값 = 스택</b> · <b>객체·배열 = 힙</b> · <b>객체 안의 원시값 = 그 객체를 따라 힙</b>.
      (반대로 <b>객체를 스택에</b> 두면? ⑤에서 봤듯 작업이 끝날 때 <b>사라진다</b> 💥.)</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">묶음(객체·배열)은 <b>힙</b>에 살고 슬롯엔 <b>주소</b>만. 크기가 가변이고, 오래 살아야 하고, 공유되기 때문.
        스택에 뒀다면 작업이 끝날 때 <b>함께 사라진다</b>.</p>
      </div>

      <div class="practice-cta">
        <span>슬롯이 '주소'를 담는다 — 그래서 생기는 유명한 함정을 다음에서 —</span>
        <button class="chip on" data-goto="ref">🧠 M4 · 값 복사 vs 참조 →</button>
      </div>
    `
    root.querySelector('[data-m="heap"]').append(MemoryModel(SCENARIO_HEAP))
    root.querySelector('[data-m="fail"]').append(MemoryModel(SCENARIO_STACK_FAIL))
    root.querySelector('[data-m="priminheap"]').append(MemoryModel(SCENARIO_PRIM_IN_HEAP))
    wireCTA(root)
  }

  // ══ M4 · 값 복사 vs 참조 ════════════════════════════════════
  const SCENARIO_REF = {
    title: '값 복사 vs 참조 — 왜 p를 바꿨는데 obj도 바뀌나',
    code: ['let a = 3', 'let b = a', 'let obj = { n: 1 }', 'let p = obj', 'p.n = 9'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }] }], heap: {}, note: 'a 슬롯에 값 3을 직접.', engine: 'SMI 태깅.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '3' }] }], heap: {}, note: 'b엔 a의 <b>값을 복사</b>. a·b는 무관한 3 두 개.', engine: '값 복사 — 별개 슬롯.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '3' }, { name: 'obj', ref: 'h1' }] }], heap: { h1: { label: '{ n: 1 }' } }, note: '객체는 힙에, obj엔 <b>주소</b>만.', engine: '힙 할당, 포인터.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '3' }, { name: 'obj', ref: 'h1' }, { name: 'p', ref: 'h1' }] }], heap: { h1: { label: '{ n: 1 }' } }, note: 'p엔 obj의 <b>주소를 복사</b> — 둘이 <b>같은 힙 박스</b>(별칭).', engine: '참조 복사. 객체는 하나.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '3' }, { name: 'obj', ref: 'h1' }, { name: 'p', ref: 'h1' }] }], heap: { h1: { label: '{ n: 9 }' } }, note: 'p로 힙을 바꾸면 <b>obj로 봐도 9</b> — 같은 박스니까. (a·b는 그대로) ← 흔한 오해가 여기서 풀린다.', engine: 'p.n=9는 힙 필드 변경.' },
    ],
  }
  // 값에 의한 전달 — 원시값을 함수에 넘기면 '복사본'이 전달된다(원본 안전).
  const SCENARIO_PASSVAL = {
    title: '값에 의한 전달 — 복사본이라 원본이 안전하다', showHeap: false,
    code: ['let money = 10000', 'function tear(bill) {', '  bill = 0        // 건네받은 걸 찢어 못 쓰게', '}', 'tear(money)'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'money', value: '10000' }] }], heap: {}, note: 'money 슬롯에 10000이 담긴다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'money', value: '10000' }] }, { name: 'tear', slots: [{ name: 'bill', value: '10000' }] }], heap: {}, note: 'tear(money) 호출 → money의 <b>값을 복사</b>해 bill에 담는다. bill은 money와 <b>별개의 슬롯</b>(복사된 만원 한 장 더).' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'money', value: '10000' }] }, { name: 'tear', slots: [{ name: 'bill', value: '0', bad: true }] }], heap: {}, note: 'bill(복사본)을 0으로 찢어도 → <b>money(원본)는 그대로 10000</b>. 애초에 서로 다른 두 장이니까.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'money', value: '10000' }] }], heap: {}, note: 'tear 끝 → bill(복사본) 사라짐. money는 여전히 <b>10000</b>. 원시값은 <b>복사본</b>으로 전달돼 원본이 안전하다.' },
    ],
  }

  // 객체 그래프 — hyoni(스택 변수)와 me.bestFriend(힙 필드)가 같은 효니 객체를 가리킨다.
  // 두 변화를 '별개 예시'로: ① 베프가 머리 자름 → 효니도  ② 효니가 복권 → 베프도 (양방향)
  // 효니·나를 '사람 카드'(아바타)로. 효니 아바타는 상태에 반응: 머리 자름 💇‍♀️ · 복권 🤑
  const meBox = () => ({ person: '🧑', name: '나', fields: [{ key: 'bestFriend', ref: 'h1' }] })
  const hyoniBox = (emoji, field) => ({ person: emoji, name: '효니', fields: [field] })
  const stackHyoni = [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }] }]
  const stackBoth = [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'me', ref: 'h2' }] }]
  const SCENARIO_GRAPH_HAIR = {
    title: '① 내 베프가 머리를 자르면 → 효니도 숏컷',
    code: ['let hyoni = { name: "효니", hair: "긴머리" }', 'let me = { name: "나", bestFriend: hyoni }', 'me.bestFriend.hair = "숏컷"   // 내 베프가 머리 자름'],
    steps: [
      { line: 0, stack: stackHyoni, heap: { h1: hyoniBox('👩', { key: 'hair', value: '"긴머리"' }) }, note: '효니(사람)가 힙에. hyoni 슬롯이 그를 가리킨다.' },
      { line: 1, stack: stackBoth, heap: { h1: hyoniBox('👩', { key: 'hair', value: '"긴머리"' }), h2: meBox() }, note: 'me(나) 생성. 내 <b>bestFriend</b>가 효니를 가리킨다 → 효니를 향한 화살표가 <b>둘</b>(hyoni · me.bestFriend) = 같은 사람!' },
      { line: 2, stack: stackBoth, heap: { h1: hyoniBox('💇‍♀️', { key: 'hair', value: '"숏컷"' }), h2: meBox() }, note: '<b>내 베프</b> 쪽으로 머리를 자르니(<code>me.bestFriend.hair="숏컷"</code>) → <b>효니도 숏컷</b> 💇‍♀️. 같은 사람이니까!' },
    ],
  }
  const SCENARIO_GRAPH_MONEY = {
    title: '② 효니가 복권에 당첨되면 → 내 베프도 부자',
    code: ['let hyoni = { name: "효니", money: 0 }', 'let me = { name: "나", bestFriend: hyoni }', 'hyoni.money = 1000000000      // 효니가 복권 당첨'],
    steps: [
      { line: 0, stack: stackHyoni, heap: { h1: hyoniBox('👩', { key: 'money', value: '0' }) }, note: '효니(사람)가 힙에. hyoni가 가리킨다.' },
      { line: 1, stack: stackBoth, heap: { h1: hyoniBox('👩', { key: 'money', value: '0' }), h2: meBox() }, note: 'me(나) 생성. 내 bestFriend가 같은 효니를 가리킨다.' },
      { line: 2, stack: stackBoth, heap: { h1: hyoniBox('🤑', { key: 'money', value: '1000000000' }), h2: meBox() }, note: '<b>효니</b> 쪽으로 복권 당첨(<code>hyoni.money=10억</code>) → <b>내 베프도 10억</b> 🤑. 반대 방향도 같은 사람!' },
    ],
  }

  // 2중(중첩) 그래프 — me → 효니 → 지민. 객체가 객체를, 그 객체가 또 객체를.
  const SCENARIO_GRAPH_NESTED = {
    title: '2중 그래프 — 친구의 친구 (me → 효니 → 지민)',
    code: [
      'let jimin = { name: "지민", hair: "파마" }',
      'let hyoni = { name: "효니", bestFriend: jimin }',
      'let me = { name: "나", bestFriend: hyoni }',
      'me.bestFriend.bestFriend.hair = "삭발"   // 친구의 친구가 삭발',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'jimin', ref: 'h1' }] }],
        heap: { h1: { person: '👩‍🦱', name: '지민', fields: [{ key: 'hair', value: '"파마"' }] } },
        note: '지민(사람)이 힙에. jimin이 가리킨다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'jimin', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }] }],
        heap: { h1: { person: '👩‍🦱', name: '지민', fields: [{ key: 'hair', value: '"파마"' }] }, h2: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h1' }] } },
        note: '효니 생성. <b>효니.bestFriend가 지민</b>을 가리킨다 → 효니 → 지민.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'jimin', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }, { name: 'me', ref: 'h3' }] }],
        heap: { h1: { person: '👩‍🦱', name: '지민', fields: [{ key: 'hair', value: '"파마"' }] }, h2: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h1' }] }, h3: { person: '🧑', name: '나', fields: [{ key: 'bestFriend', ref: 'h2' }] } },
        note: '나 생성. 이제 <b>me → 효니 → 지민</b> 화살표 사슬(2중 그래프). <code>me.bestFriend</code>는 효니, <code>me.bestFriend.bestFriend</code>는 지민.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'jimin', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }, { name: 'me', ref: 'h3' }] }],
        heap: { h1: { person: '👩‍🦲', name: '지민', fields: [{ key: 'hair', value: '"삭발"' }] }, h2: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h1' }] }, h3: { person: '🧑', name: '나', fields: [{ key: 'bestFriend', ref: 'h2' }] } },
        note: 'me에서 bestFriend를 <b>두 번</b> 따라가(<code>me.bestFriend.bestFriend</code>) 지민에 도달 → hair "삭발" 👩‍🦲. 화살표를 여러 번 건너는 게 <b>2중 그래프 탐색</b>이다.' },
    ],
  }

  // ══ M4 · 값 복사 vs 참조 ════════════════════════════════════
  // 변수끼리 숫자 복사 (순수 값 복사)
  const SCENARIO_VAR_COPY = {
    title: '변수끼리 — money2 = money1 (숫자 복사)', showHeap: false,
    code: ['let money1 = 100', 'let money2 = money1     // 숫자 복사', 'money2 = 0              // money2만 0으로'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'money1', value: '100' }] }], heap: {}, note: 'money1에 100.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'money1', value: '100' }, { name: 'money2', value: '100' }] }], heap: {}, note: 'money1의 숫자 100을 <b>복사</b>해 money2에. 별개의 두 슬롯.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'money1', value: '100' }, { name: 'money2', value: '0', bad: true }] }], heap: {}, note: 'money2만 0. <b>money1은 그대로 100</b> — 숫자는 복사라 서로 무관.' },
    ],
  }
  // 객체 속성끼리 숫자 복사 — 객체가 껴도 숫자면 복사(안 공유)
  const SCENARIO_PROP_COPY = {
    title: '속성끼리 — hyoni.money = me.money (객체가 껴도 복사!)',
    code: ['let me = { money: 100 }', 'let hyoni = { money: 0 }', 'hyoni.money = me.money   // me의 money(숫자) 복사', 'hyoni.money = 50          // hyoni.money만 바꿈'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] } }, note: 'me 객체 money 100.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] }, h2: { fields: [{ key: 'money', value: '0' }] } }, note: 'hyoni 객체 money 0. me와 <b>다른 박스</b>.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] }, h2: { fields: [{ key: 'money', value: '100' }] } }, note: '<code>hyoni.money = me.money</code> → me.money(숫자 100)를 <b>복사</b>해 hyoni.money에. 두 객체는 여전히 <b>다른 박스</b> — 숫자만 베낀 것.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] }, h2: { fields: [{ key: 'money', value: '50' }] } }, note: 'hyoni.money만 50. <b>me.money는 그대로 100</b>! 객체가 둘 껴 있어도, 대입된 게 <b>숫자(원시값)</b>라 복사였다 = 안 공유.' },
    ],
  }
  // 문자열도 원시값 → 복사(숫자만이 아님)
  const SCENARIO_STR_COPY = {
    title: '문자열도 복사 — nick2 = nick1 (숫자만이 아니다)', showHeap: false,
    code: ['let nick1 = "무지"', 'let nick2 = nick1      // 문자열도 복사', 'nick2 = "어피치"        // nick2만 바뀜'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'nick1', value: '"무지"' }] }], heap: {}, note: 'nick1에 "무지".' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'nick1', value: '"무지"' }, { name: 'nick2', value: '"무지"' }] }], heap: {}, note: '문자열 "무지"를 <b>복사</b>해 nick2에. 별개의 두 슬롯 — 숫자와 똑같다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'nick1', value: '"무지"' }, { name: 'nick2', value: '"어피치"', bad: true }] }], heap: {}, note: 'nick2만 "어피치". <b>nick1은 그대로 "무지"</b> — 문자열도 <b>원시값</b>이라 복사(안 공유). "숫자만 복사"가 아니다.' },
    ],
  }
  // 불변 — 변수(이름표)와 값(그 자체)을 분리. 3타입×3상황: 숫자 재할당 / 문자열 메서드=새값 / 참거짓 토글.
  const SCENARIO_IMM_NUM = {
    title: '① 숫자 · 재할당 — money = 200',
    stackLabel: '🏷️ 변수 (이름표)', heapLabel: '💎 값 (그 자체 · 불변)',
    code: ['let money = 100', 'money = 200   // 100이 200으로 변신? 아니다'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'money', ref: 'v1' }] }], heap: { v1: { label: '100' } }, note: 'money는 값 100을 가리킨다. (값과 변수를 <b>따로</b> 놓고 보자)' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'money', ref: 'v2' }] }], heap: { v1: { label: '100', faded: true }, v2: { label: '200' } }, note: 'money = 200 → money가 <b>다른 값 200</b>을 가리키게 됐다(재할당). 값 <b>100은 그대로</b>(불변) — 변신이 아니라 <b>가리키는 대상</b>이 바뀐 것. (안 쓰는 100은 회색)' },
    ],
  }
  const SCENARIO_IMM_STR = {
    title: '② 문자열 · 연산은 새 값을 만든다 — "kim".toUpperCase()',
    stackLabel: '🏷️ 변수', heapLabel: '💎 값 (불변)',
    code: ['let name = "kim"', 'name.toUpperCase()   // 새 값 "KIM"을 만들 뿐', '// name 은? 여전히 "kim"'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'name', ref: 'v1' }] }], heap: { v1: { label: '"kim"' } }, note: 'name은 "kim"을 가리킨다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'name', ref: 'v1' }] }], heap: { v1: { label: '"kim"' }, v2: { label: '"KIM"', faded: true } }, note: '.toUpperCase()는 <b>새 값 "KIM"</b>을 만든다(v2) — 하지만 <b>어디에도 안 담아</b> 아무도 안 가리킨다(회색). 원본 "kim"은 <b>제자리에서 안 바뀐다</b>. name도 그대로.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'name', ref: 'v1' }] }], heap: { v1: { label: '"kim"' } }, note: '그래서 name은 <b>여전히 "kim"</b>. 진짜 바꾸려면 <code>name = name.toUpperCase()</code>로 <b>재할당</b>해야 한다(①처럼). 문자열도 불변이다.' },
    ],
  }
  const SCENARIO_IMM_BOOL = {
    title: '③ 참거짓 · 뒤집기도 재할당 — on = !on',
    stackLabel: '🏷️ 변수', heapLabel: '💎 값 (불변)',
    code: ['let on = true', 'on = !on   // 뒤집기 = 새 값을 가리키기'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'on', ref: 'v1' }] }], heap: { v1: { label: 'true' } }, note: 'on은 true를 가리킨다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'on', ref: 'v2' }] }], heap: { v1: { label: 'true', faded: true }, v2: { label: 'false' } }, note: '!on은 <b>새 값 false</b>를 만들고 on이 그걸 가리키게 된다(재할당). true는 그대로. <b>뒤집기도 결국 "다른 값 가리키기"</b> — 참거짓도 불변.' },
    ],
  }
  // 묶음이면 다 참조 — object/array 말고 Date·class 인스턴스도 힙에, 슬롯엔 주소, 복사하면 별칭.
  const SCENARIO_BUNDLE = {
    title: '묶음은 다 참조 — Date · 클래스 인스턴스도 힙에',
    code: [
      'let today = new Date()             // 날짜도 여러 값(연·월·일…)의 묶음',
      'class Hero { constructor(n) { this.name = n; this.hp = 100 } }  // 설계도(틀)',
      'let link = new Hero("링크")         // new로 찍어낸 인스턴스',
      'let p2 = link                      // 주소만 복사',
      'p2.hp = 50                         // p2로 hp를 깎으면?',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'today', ref: 'h1' }] }],
        heap: { h1: { label: '📅 Date { 2026, 8, 13, … }' } },
        note: 'new Date()도 <b>연·월·일·시를 하나로 묶은 객체</b> → 힙에 만들어진다. today는 <b>주소만</b> 가진다({ } 안이 아니라 힙을 가리킴).' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'today', ref: 'h1' }, { name: 'link', ref: 'h2' }] }],
        heap: { h1: { label: '📅 Date { … }' }, h2: { person: '🦸', name: '링크', fields: [{ key: 'hp', value: '100' }] } },
        note: 'class Hero는 <b>설계도(틀)</b>일 뿐. <code>new Hero("링크")</code>로 <b>찍어낸 인스턴스</b>가 진짜 객체 → 힙에. link는 주소만. (클래스는 뒤에서 자세히 — 여기선 "new로 만든 것도 묶음이라 힙"만 기억)' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'today', ref: 'h1' }, { name: 'link', ref: 'h2' }, { name: 'p2', ref: 'h2' }] }],
        heap: { h1: { label: '📅 Date { … }' }, h2: { person: '🦸', name: '링크', fields: [{ key: 'hp', value: '100' }] } },
        note: 'p2 = link → <b>주소만 복사</b>. link와 p2가 <b>같은 히어로</b>를 가리킨다(별칭). 화살표 둘이 한 박스로 모인다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'today', ref: 'h1' }, { name: 'link', ref: 'h2' }, { name: 'p2', ref: 'h2' }] }],
        heap: { h1: { label: '📅 Date { … }' }, h2: { person: '🦸', name: '링크', fields: [{ key: 'hp', value: '50' }] } },
        note: 'p2.hp = 50 → 같은 박스라 <b>link.hp도 50</b>. 숫자·문자열이면 복사였지만, 이건 <b>묶음(객체)</b>이라 공유. Date·배열·클래스… <b>묶음이면 전부 참조</b>, 같은 규칙이 그대로 적용된다.' },
    ],
  }
  window.Lessons['ref'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M4</span>
        <h2>값 복사 vs 참조 — "왜 obj까지 바뀌지?"</h2>
        <p>원시값을 넣으면 <b>값이 복사</b>, 객체·배열을 넣으면 <b>주소가 복사</b>된다. 이 차이가 입문자 최대 함정이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>원시값 = <b>값 복사</b>(서로 무관). 객체·배열 = <b>주소 복사</b>(같은 힙 = 별칭). 별칭이면 한쪽 변경이 <b>양쪽에 보인다</b>.</p>
      </div>

      <div class="concept">
        <p class="concept-lead">🗺️ 타입 지도 — 이 한 장이 '복사냐 공유냐'를 가른다</p>
        <p class="section-desc" style="margin-top:0">JS의 값은 딱 <b>두 부류</b>다. 어느 부류냐가 복사/공유를 결정한다. (지금까지 배운 숫자·문자열·객체·배열이 다 여기 들어간다.)</p>
        <ul class="section-list">
          <li><b>원시 타입(primitive) — 복사된다(독립·불변)</b>:
            <code>숫자 number</code> · <code>문자열 string</code> · <code>참거짓 boolean</code> · <code>null</code>(비어있음을 <b>일부러</b> 넣음) · <code>undefined</code>(아직 값 없음) · <span style="opacity:.75">고급: <code>symbol</code> · <code>bigint</code>(아주 큰 정수)</span>.
            → 슬롯에 <b>값이 직접</b> 들어간다.</li>
          <li><b>참조 타입(reference) — 공유된다(별칭·가변)</b>: <b>여러 값을 하나로 묶은 것</b>은 다 여기다 —
            <code>객체 object {}</code> · <code>배열 array []</code> · <code>함수 function</code>(함수도 값!) ·
            <code>Date</code>(날짜) · <code>Map·Set</code>(모음) · <code>RegExp</code>(정규식),
            그리고 <b>우리가 <code>class</code>로 만든 인스턴스</b>(<code>new Hero(...)</code>).
            → 하나같이 <b>힙</b>에 살고, 슬롯엔 <b>주소만</b> 들어간다. (그래서 <code>typeof</code>는 대부분 <code>"object"</code>)</li>
        </ul>
        <p class="section-desc" style="margin:6px 0 0">🔍 확인법 <code>typeof</code>: <code>typeof 100</code>→"number", <code>typeof "kim"</code>→"string", <code>typeof true</code>→"boolean", <code>typeof {}</code>→"object", <code>typeof []</code>→"object"(배열도 객체!), <code>typeof new Date()</code>→"object", <code>typeof function(){}</code>→"function".
        <br>그래서 이 강의 규칙은 하나 — <b>대입되는 값이 원시면 복사, 참조(묶음의 주소)면 공유.</b> "객체가 끼었냐"가 아니라 <b>대입되는 값의 타입</b>이 전부를 가른다.</p>
      </div>

      <div class="card">
        <div class="file-label">🔬 "묶음이면 다 참조" — Date · 클래스 인스턴스도 힙에 (▶로 확인)</div>
        <div data-m="bundle"></div>
        <p class="section-desc" style="margin:10px 0 0">plain 객체 <code>{}</code>·배열 <code>[]</code>만 참조가 아니다. <b>Date, 우리가 만든 클래스 인스턴스</b>도 결국 "여러 값을 묶은 것" → 힙에 살고 슬롯엔 주소만 → 복사하면 <b>별칭</b>. 참조의 규칙은 <b>묶음이면 종류를 안 가리고</b> 똑같다.</p>
      </div>

      <h3 class="section-title">① 눈으로 — 한 줄씩</h3>
      <span class="learn-tag">📎 마지막 단계에서 "안 건드린 obj가 왜 9가 됐나"가 풀린다</span>
      <div data-m="ref"></div>

      <h3 class="section-title">② 그래서 실무에서</h3>
      <ul class="section-list">
        <li>객체·배열을 함수에 넘기면 <b>같은 것</b>을 넘긴다 → 함수 안에서 바꾸면 <b>원본도 바뀐다</b>.</li>
        <li>원본을 지키려면 <b>복사본</b>을 만든다 — 스프레드 <code>{...obj}</code> / <code>[...arr]</code> (뒤 강의).</li>
        <li><code>const obj = {...}</code>여도 <code>obj.n = 9</code>는 된다 — const가 막는 건 <b>슬롯의 주소</b>지 <b>힙 내용</b>이 아니다.</li>
      </ul>

      <h3 class="section-title">③ 변수든 속성이든 — 원시값이면 복사 (숫자·문자열·참거짓, 객체가 껴도!)</h3>
      <span class="learn-tag">📎 흔한 착각: "객체가 끼면 다 공유"? NO — 대입되는 게 '원시값'이면 복사다</span>
      <p class="section-desc">아래는 <b>완전히 같은 일</b> — 원시값을 복사한다. 참조냐 값이냐는 <b>"객체가 끼었냐"가 아니라 "대입되는 값이 원시값이냐 객체 주소냐"</b>로 갈린다.</p>
      <div class="card"><div class="file-label">🔬 ① 변수끼리 — money2 = money1 (숫자)</div><div data-m="varcopy"></div></div>
      <div class="card"><div class="file-label">🔬 ② 객체 속성끼리 — hyoni.money = me.money (객체가 껴도 숫자면 복사!)</div><div data-m="propcopy"></div></div>
      <p class="section-desc" style="margin-bottom:6px">그리고 <b>숫자만이 아니다</b> — 문자열·참거짓도 원시값이라 똑같이 복사된다:</p>
      <div class="card"><div class="file-label">🔬 ③ 문자열도 복사 — nick2 = nick1</div><div data-m="strcopy"></div></div>
      <p class="section-desc">🔑 me·hyoni는 객체(참조)지만 <code>me.money</code>는 <b>숫자</b>, <code>nick</code>은 <b>문자열</b> → 둘 다 원시값이라 복사, 안 공유.
      만약 <code>hyoni.buddy = me</code> 였다면? me는 <b>객체</b> → 주소 복사 = <b>공유(참조)</b>. <b>대입되는 값의 타입</b>(타입 지도 참고)이 전부를 가른다.</p>

      <h3 class="section-title">④ 원시값은 불변 — "money=200, 변했잖아?"의 진실</h3>
      <span class="learn-tag">📎 '변수 칸'과 '값 칸'을 나눠서 보라 — 값은 안 변하고, 변수가 다른 값을 가리킬 뿐</span>
      <p class="section-desc">"원시값은 불변"이라는데 <code>money = 200</code>은 변한 것 같다. 진실은 — <b>값 자체는 안 변한다</b>.
      변수가 <b>다른 값을 가리키게</b> 됐을 뿐(재할당). <b>세 가지 타입·상황</b>으로 확인한다. 각 카드에서 <b>변수 칸</b>과 <b>값 칸</b>을 나눠 ▶로 보라.</p>
      <div class="card"><div class="file-label">🔬 ① 숫자 · 재할당</div><div data-m="imm-num"></div></div>
      <div class="card"><div class="file-label">🔬 ② 문자열 · 연산은 원본을 안 바꾼다(새 값)</div><div data-m="imm-str"></div></div>
      <div class="card"><div class="file-label">🔬 ③ 참거짓 · 뒤집기도 재할당</div><div data-m="imm-bool"></div></div>
      <ul class="section-list">
        <li><b>불변(immutable)</b> = 값 자체를 <b>제자리에서 못 바꾼다</b>. 숫자·문자열·참거짓 <b>모든 원시값</b>이 그렇다 (<code>100</code>→<code>101</code>, <code>"kim"</code>→<code>"KIM"</code>을 제자리에서 바꾸는 일은 없다).</li>
        <li><code>money = 200</code>·<code>on = !on</code>은 <b>재할당</b> — 이름표가 <b>다른 값을 가리키게</b> 하는 것. 값의 '변신'이 아니다.</li>
        <li>반대로 <b>객체는 가변(mutable)</b> — <code>obj.x = 2</code>는 값(객체)을 <b>제자리에서</b> 바꾼다. 그래서 공유되면 위험했다(②).</li>
      </ul>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">슬롯에 <b>숫자가 들면 복사</b>(독립), <b>객체 주소가 들면 공유</b>(별칭). <b>변수든 객체 속성이든 똑같다.</b>
        "객체가 끼면 무조건 공유"는 착각 — 대입되는 값의 종류로 갈린다.</p>
      </div>

      <div class="practice-cta">
        <span>그럼 함수에 '넘길' 때는? — 다음 —</span>
        <button class="chip on" data-goto="passval">🧠 M5 · 값에 의한 전달 →</button>
      </div>
    `
    root.querySelector('[data-m="bundle"]').append(MemoryModel(SCENARIO_BUNDLE))
    root.querySelector('[data-m="ref"]').append(MemoryModel(SCENARIO_REF))
    root.querySelector('[data-m="varcopy"]').append(MemoryModel(SCENARIO_VAR_COPY))
    root.querySelector('[data-m="propcopy"]').append(MemoryModel(SCENARIO_PROP_COPY))
    root.querySelector('[data-m="strcopy"]').append(MemoryModel(SCENARIO_STR_COPY))
    root.querySelector('[data-m="imm-num"]').append(MemoryModel(SCENARIO_IMM_NUM))
    root.querySelector('[data-m="imm-str"]').append(MemoryModel(SCENARIO_IMM_STR))
    root.querySelector('[data-m="imm-bool"]').append(MemoryModel(SCENARIO_IMM_BOOL))
    wireCTA(root)
  }

  // ══ M5 · 값에 의한 전달 ═════════════════════════════════════
  window.Lessons['passval'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M5</span>
        <h2>값에 의한 전달 — 넘기면 '복사본'이라 원본이 안전하다</h2>
        <p>원시값을 함수에 넘기면 <b>값이 복사</b>된다. 받은 쪽이 망가뜨려도 내 원본은 멀쩡하다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 헷갈리는 '돈' 비유 바로잡기</span>
        <p>실제 지폐 <b>한 장</b>을 건네는 건 '같은 물건'이라 오히려 <b>참조</b>에 가깝다. <b>값에 의한 전달</b>은 건네는 순간 <b>똑같은 복사본이 하나 더 생기는</b> 것 —
        그래서 '내 것'과 '건넨 것'은 처음부터 <b>다른 두 장</b>이다. 비유는 <b>복사본</b>(문서를 복사해 주면 상대가 사본에 낙서해도 내 원본은 그대로)이 좋다.</p>
      </div>

      <h3 class="section-title">① 눈으로 — 사본을 찢어도 원본은 안전</h3>
      <span class="learn-tag">📎 공통 스택 그림으로 — 사본 bill을 0으로 만들어도 원본 money는 그대로</span>
      <div data-m="passval"></div>

      <h3 class="section-title">② 객체는 다르다 — 넘겨도 '같은 것'</h3>
      <p class="section-desc">반대로 <b>객체·배열</b>을 넘기면 복사본이 아니라 <b>주소(같은 것)</b>를 넘긴다 → 함수 안에서 바꾸면 <b>원본도 바뀐다</b>.
      그래서 원본을 지키려면 스프레드 <code>{...obj}</code>로 <b>복사본</b>을 만들어 넘긴다(뒤 강의). 왜 그런지는 다음 <b>객체 그래프</b>에서 그림으로.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">원시값을 넘기면 <b>복사본</b>이 전달돼 원본이 안전. 객체를 넘기면 <b>주소</b>가 전달돼 원본이 바뀔 수 있다.</p>
      </div>

      <div class="practice-cta">
        <span>그럼 객체를 넘기면? — 정반대다 —</span>
        <button class="chip on" data-goto="passobj">🧠 M6 · 참조에 의한 전달 →</button>
      </div>
    `
    root.querySelector('[data-m="passval"]').append(MemoryModel(SCENARIO_PASSVAL))
    wireCTA(root)
  }

  // ══ M6 · 참조에 의한 전달 (객체를 함수에) ══════════════════
  const SCENARIO_PASSOBJ = {
    title: '객체를 함수에 넘기면 → 원본이 바뀐다',
    code: ['let hero = { name: "용사", level: 1 }', 'function levelUp(user) {', '  user.level = user.level + 1', '}', 'levelUp(hero)'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'hero', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"용사"' }, { key: 'level', value: '1' }] } }, note: 'hero 객체가 힙에. hero 슬롯은 <b>주소</b>만.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'hero', ref: 'h1' }] }, { name: 'levelUp', slots: [{ name: 'user', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"용사"' }, { key: 'level', value: '1' }] } }, note: 'levelUp(hero) 호출 → user에 hero의 <b>주소를 복사</b>. user와 hero는 <b>같은 객체</b>(별칭)! (복사본 아님)' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'hero', ref: 'h1' }] }, { name: 'levelUp', slots: [{ name: 'user', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"용사"' }, { key: 'level', value: '2' }] } }, note: 'user.level을 올리면 → 같은 객체라 <b>hero.level도 2</b>. 함수 안 변경이 원본에 뚫고 나간다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'hero', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"용사"' }, { key: 'level', value: '2' }] } }, note: 'levelUp 끝. 그래도 <b>hero.level은 2로 바뀐 채</b>. 객체는 주소로 전달돼 원본이 바뀐다. (M5의 원시값과 정반대!)' },
    ],
  }
  window.Lessons['passobj'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M6</span>
        <h2>참조에 의한 전달 — 객체를 함수에 넘기면 원본이 바뀐다</h2>
        <p>M5의 원시값은 <b>복사본</b>이라 안전했다. 객체는 <b>주소</b>가 전달돼, 함수 안에서 바꾸면 <b>원본까지 바뀐다</b>.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>객체를 함수에 넘기면 매개변수와 원본이 <b>같은 힙 객체</b>를 가리킨다(별칭). 그래서 함수 안 <code>user.level = ...</code>가 <b>바깥 hero</b>에도 보인다.</p>
      </div>

      <h3 class="section-title">① 눈으로 — 함수가 원본을 바꾼다</h3>
      <span class="learn-tag">📎 user와 hero가 같은 객체 → user를 바꾸면 hero도 바뀐다</span>
      <div data-m="passobj"></div>

      <h3 class="section-title">② 친근한 예시 — 다 원본이 바뀐다</h3>
      <div class="card">
        <div class="file-label">📄 객체를 넘기면 함수가 원본을 주무른다</div>
        <pre class="err-code">function birthday(user)   { user.age = user.age + 1 }   // 나이 +1 → 원본 바뀜
function discount(item)   { item.price = item.price - 1000 } // 가격 내림 → 원본 바뀜
function equip(char, gear){ char.weapon = gear }        // 장비 장착 → 원본 바뀜
function like(post)       { post.likes = post.likes + 1 }    // 좋아요 +1 → 원본 바뀜</pre>
      </div>
      <p class="section-desc">전부 <b>객체 하나</b>를 넘겨 그 안을 바꾼다 → 넘긴 원본이 그대로 바뀐다. (편할 때도, 사고 날 때도 있다.)</p>

      <h3 class="section-title">③ 원본을 지키려면 — 복사본을 넘긴다</h3>
      <span class="learn-tag">📎 스프레드 {...obj}로 사본을 만들어 넘기거나, 함수가 새 객체를 return</span>
      <div class="card">
        <div class="file-label">📄 원본 안 건드리는 법</div>
        <pre class="err-code">levelUp({ ...hero })                 // 사본을 넘긴다 → 원본 hero 안전
function levelUpSafe(user) {
  return { ...user, level: user.level + 1 }  // 새 객체를 돌려줌 (원본 그대로)
}
let strong = levelUpSafe(hero)       // hero는 그대로, strong만 레벨업</pre>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">객체를 함수에 넘기면 <b>주소</b>가 전달 → 함수 안 변경이 <b>원본까지</b> 바꾼다.
        원본을 지키려면 <b>복사본</b>(<code>{...obj}</code>)을 넘긴다.</p>
      </div>

      <div class="practice-cta">
        <span>배열도 똑같을까? — 다음 —</span>
        <button class="chip on" data-goto="passarr">🧠 M7 · 배열도 참조다 →</button>
      </div>
    `
    root.querySelector('[data-m="passobj"]').append(MemoryModel(SCENARIO_PASSOBJ))
    wireCTA(root)
  }

  // ══ M7 · 배열도 참조다 (배열을 함수에) ═════════════════════
  const SCENARIO_PASSARR = {
    title: '배열을 함수에 넘기면 → 원본이 늘어난다',
    code: ['let cart = ["우유"]', 'function addItem(list, item) {', '  list.push(item)', '}', 'addItem(cart, "빵")'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'cart', ref: 'h1' }] }], heap: { h1: { label: '["우유"]' } }, note: 'cart 배열이 힙에. cart 슬롯은 주소만.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'cart', ref: 'h1' }] }, { name: 'addItem', slots: [{ name: 'list', ref: 'h1' }, { name: 'item', value: '"빵"' }] }], heap: { h1: { label: '["우유"]' } }, note: 'addItem 호출 → list에 cart의 <b>주소를 복사</b>. list와 cart는 <b>같은 배열</b>!' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'cart', ref: 'h1' }] }, { name: 'addItem', slots: [{ name: 'list', ref: 'h1' }, { name: 'item', value: '"빵"' }] }], heap: { h1: { label: '["우유", "빵"]' } }, note: 'list.push("빵") → 같은 배열이라 <b>cart도 ["우유","빵"]</b>으로 늘어난다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'cart', ref: 'h1' }] }], heap: { h1: { label: '["우유", "빵"]' } }, note: 'addItem 끝. cart는 이제 <b>2칸</b>. 배열도 객체라 주소로 전달 = 원본 바뀜.' },
    ],
  }
  window.Lessons['passarr'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M7</span>
        <h2>배열도 참조다 — 배열을 함수에 넘기면</h2>
        <p><b>배열도 객체</b>다. 그래서 함수에 넘기면 <b>같은 배열</b>을 넘기는 것 — 함수 안에서 <code>push</code>하면 원본이 늘어난다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>배열을 넘기면 매개변수와 원본이 <b>같은 배열</b>을 가리킨다. <code>push·sort·splice</code>처럼 <b>원본을 바꾸는</b> 메서드는 바깥 배열도 바꾼다.</p>
      </div>

      <h3 class="section-title">① 눈으로 — 함수가 원본 배열을 늘린다</h3>
      <span class="learn-tag">📎 list와 cart가 같은 배열 → list.push하면 cart도 늘어난다</span>
      <div data-m="passarr"></div>

      <h3 class="section-title">② 예시 — 원본을 바꾸는 것 vs 새 배열을 주는 것</h3>
      <div class="card">
        <div class="file-label">🔴 원본을 바꾼다 (mutating) — 함수에 넘기면 바깥도 바뀜</div>
        <pre class="err-code">arr.push("x")     // 끝에 추가
arr.pop()         // 끝 제거
arr.unshift("x")  // 앞에 추가
arr.sort()        // 정렬
arr.reverse()     // 뒤집기
arr.splice(0, 1)  // 잘라내기</pre>
      </div>
      <div class="card">
        <div class="file-label">🟢 새 배열을 만든다 (원본 안전) — 5강에서 자세히</div>
        <pre class="err-code">arr.map(x => x * 2)     // 변환한 새 배열
arr.filter(x => x > 3)  // 거른 새 배열
arr.slice(0, 2)         // 잘라낸 새 배열
arr.concat([9])         // 이어붙인 새 배열
[...arr]                // 복사본</pre>
      </div>
      <p class="section-desc">🔑 <b>원본을 바꾸는(mutating)</b> 것과 <b>새 배열을 주는</b> 것을 구분하면, "왜 내 배열이 몰래 바뀌었지?"가 사라진다.</p>

      <h3 class="section-title">③ 원본을 지키려면 — 복사본을 넘긴다</h3>
      <div class="card">
        <div class="file-label">📄 사본을 넘겨 원본 보호</div>
        <pre class="err-code">addItem([...cart], "빵")   // 사본을 넘긴다 → 원본 cart 안전</pre>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">배열도 객체라 <b>주소</b>로 전달된다. <code>push·sort</code> 같은 <b>원본 변경</b> 메서드는 바깥 배열도 바꾼다.
        지키려면 <code>[...arr]</code> 복사본을 넘긴다.</p>
      </div>

      <div class="practice-cta">
        <span>객체가 객체를 가리키면? — 다음 —</span>
        <button class="chip on" data-goto="graph">🧠 M8 · 객체 그래프 →</button>
      </div>
    `
    root.querySelector('[data-m="passarr"]').append(MemoryModel(SCENARIO_PASSARR))
    wireCTA(root)
  }

  // ══ M8 · 객체 그래프 (두 변화를 별개 예시로) ════════════════
  // 같은 그림, 다른 코드 — 힙 그래프는 같고 스택 변수 구성(parent 독립 변수)만 다름.
  const SCENARIO_SAME_A = {
    title: 'A · 중첩 리터럴 — 스택엔 me 하나',
    code: ['let me = {', '  name: "나",', '  parent: { name: "아빠" }', '}'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }] }],
        heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h2' }] }, h2: { person: '👨', name: '아빠', fields: [] } },
        note: '스택엔 <b>me 하나</b>. 아빠 객체는 <b>me.parent로만</b> 닿는다(독립 변수 없음) → 아빠로 향한 화살표 <b>1개</b>.' },
    ],
  }
  const SCENARIO_SAME_BC = {
    title: 'B·C · 따로 만들어 잇기 — parent 변수도 있음',
    code: ['let parent = { name: "아빠" }', 'let me = { name: "나", parent: parent }'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }] }],
        heap: { h2: { person: '👨', name: '아빠', fields: [] } }, note: '아빠 객체 + 그걸 가리키는 <b>독립 변수 parent</b>.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }],
        heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h2' }] }, h2: { person: '👨', name: '아빠', fields: [] } },
        note: 'me.parent가 <b>같은 아빠</b>를 가리킨다 → 아빠로 향한 화살표 <b>2개</b>(parent·me.parent). <b>힙 그래프는 A와 똑같다!</b> 차이는 parent 변수뿐.' },
    ],
  }
  // 거꾸로 — 같은 코드처럼 보이는데 그림이 다르다: 공유(parent) vs 복사본({...parent}).
  const dad = (age) => ({ person: '👨', name: '아빠', fields: [{ key: 'age', value: age }] })
  const SCENARIO_SHARED = {
    title: '❗ me.parent = parent — 같은 아빠(공유)',
    code: ['let parent = { name: "아빠", age: 50 }', 'let me = { name: "나" }', 'me.parent = parent', 'parent.age = 51'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }] }], heap: { h2: dad('50') }, note: '아빠 객체 + 변수 parent.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [] }, h2: dad('50') }, note: '나 객체.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h2' }] }, h2: dad('50') }, note: 'me.parent = parent → <b>같은 아빠</b>를 가리킨다(화살표 2개).' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h2' }] }, h2: dad('51') }, note: 'parent.age=51 → <b>me.parent.age도 51</b>! 같은 객체라서.' },
    ],
  }
  const SCENARIO_COPY = {
    title: '✅ me.parent = { ...parent } — 복사본(독립)',
    code: ['let parent = { name: "아빠", age: 50 }', 'let me = { name: "나" }', 'me.parent = { ...parent }', 'parent.age = 51'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }] }], heap: { h2: dad('50') }, note: '아빠 객체 + 변수 parent.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [] }, h2: dad('50') }, note: '나 객체.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h3' }] }, h2: dad('50'), h3: dad('50') }, note: '{ ...parent }는 <b>새 복사본</b>(h3)을 만든다 → me.parent는 <b>복사본</b>을 가리킨다. 원본 h2와 <b>별개</b>!' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h3' }] }, h2: dad('51'), h3: dad('50') }, note: 'parent.age=51 → 원본만 51. <b>me.parent.age는 여전히 50</b>! 복사본이라 안 링크.' },
    ],
  }
  window.Lessons['graph'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 G1</span>
        <h2>객체 그래프 — 객체가 객체를 가리킨다 (효니와 내 베프)</h2>
        <p>참조는 스택→객체뿐 아니라 <b>객체→객체</b>로도 이어진다. 내 베프는 <b>효니</b> 한 명이라 <code>me.bestFriend</code>와 <code>hyoni</code>는 <b>같은 사람</b>이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><code>me.bestFriend</code>가 효니 객체를 가리키면, 효니를 가리키는 화살표가 <b>둘</b>(hyoni · me.bestFriend)이 된다. 같은 객체라 <b>어느 쪽으로 바꿔도 양쪽에 보인다</b> — 두 방향을 각각 본다.</p>
      </div>

      <h3 class="section-title">① 내 베프가 머리를 자르면? → 효니의 머리는</h3>
      <span class="learn-tag">📎 me.bestFriend 쪽으로 바꾼다 → 효니에도 반영</span>
      <div data-m="hair"></div>

      <h3 class="section-title">② 효니가 복권에 당첨되면? → 내 베프는</h3>
      <span class="learn-tag">📎 반대로 hyoni 쪽으로 바꾼다 → me.bestFriend에도 반영</span>
      <div data-m="money"></div>

      <h3 class="section-title">③ 2중 그래프 — 친구의 친구 (me → 효니 → 지민)</h3>
      <span class="learn-tag">📎 객체가 객체를, 그 객체가 또 객체를 → 화살표가 사슬처럼 이어진다</span>
      <p class="section-desc">효니에게도 베프가 있다 — <b>지민</b>. 그래서 <code>me.bestFriend.bestFriend</code>는 지민이다. 점(.)을 따라 <b>화살표를 두 번</b> 건너간다. ▶로 사슬이 만들어지는 걸 보라.</p>
      <div data-m="nested"></div>
      <p class="section-desc">참조가 여러 겹이면 <b>깊은 객체 그래프</b>가 된다. 실전 데이터(댓글 → 작성자 → 프로필 → 회사 …)가 다 이 사슬 모양이다.</p>

      <h3 class="section-title">④ 같은 그림, 다른 코드 — 문법 말고 메모리로 생각하기</h3>
      <span class="learn-tag">📎 세 가지로 같은 관계(me → 아빠)를 만든다 — 힙 그래프는 같고, 변수 구성만 다르다</span>
      <div class="card">
        <div class="file-label">📄 셋 다 me → 아빠 관계를 만든다</div>
        <pre class="err-code">A) let me = { name:"나", parent: { name:"아빠" } }            // 중첩 리터럴
B) let parent = {name:"아빠"};  let me = {};  me.parent = parent   // 따로 만들어 잇기
C) let parent = {name:"아빠"};  let me = { name:"나", parent: parent }  // 만들고 참조</pre>
      </div>
      <div class="card"><div class="file-label">🔬 A — 스택엔 me 하나 (아빠 화살표 1개)</div><div data-m="sameA"></div></div>
      <div class="card"><div class="file-label">🔬 B·C — parent 변수도 (아빠 화살표 2개)</div><div data-m="sameBC"></div></div>
      <p class="section-desc">🔑 <b>힙 그래프(me → 아빠)는 셋 다 같다.</b> 차이는 딱 하나 — 아빠를 독립으로 가리키는 <code>parent</code> 변수가 있느냐(B·C)·없느냐(A).
      교훈: <b>코드 생김새가 달라도 메모리 그림은 같을 수 있다 → 문법이 아니라 "무엇이 무엇을 가리키나"로 생각하라.</b>
      (실용 차이: A는 아빠를 <code>me.parent</code>로만 만지고 me를 놓으면 아빠도 쓰레기, B·C는 <code>parent</code>로도 만지고 붙잡아 둔다 → 별칭·GC에서 갈린다.)</p>

      <h3 class="section-title">⑤ 거꾸로 — 같은 코드처럼 보이는데 그림이 다르다</h3>
      <span class="learn-tag">📎 me.parent = parent (공유) vs me.parent = { ...parent } (복사본) — 한 끗 차이, 딴 세상</span>
      <p class="section-desc">④는 "다른 코드, 같은 그림"이었다. 이번엔 반대 — <b>거의 같아 보이는 코드가 전혀 다른 그림</b>을 만든다. 이게 <b>별칭 버그</b>의 핵심이다.</p>
      <div class="card"><div class="file-label">❗ me.parent = parent — 같은 아빠를 공유</div><div data-m="shared"></div></div>
      <div class="card"><div class="file-label">✅ me.parent = { ...parent } — 복사본(독립)</div><div data-m="copy"></div></div>
      <p class="section-desc">🔑 <code>parent</code>면 <b>같은 객체</b>(바꾸면 양쪽 반영), <code>{ ...parent }</code>면 <b>새 복사본</b>(바꿔도 원본 그대로). 코드 겉모습이 아니라 <b>메모리 그림</b>을 봐야 안다. (스프레드 <code>{ ... }</code>는 뒤 강의 — 여기선 그림만.)</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">여러 객체가 서로를 가리키면 힙에 <b>객체 그래프</b>가 생긴다. 같은 객체를 가리키는 이름이 여럿이면,
        <b>어느 이름으로 바꾸든 모두에게 보인다</b>. 실전 데이터(친구 목록·댓글 작성자·장바구니 상품)가 다 이 모양이다.</p>
      </div>

      <div class="practice-cta">
        <span>친구가 여럿이면? 배열에 담는다 — 다음 —</span>
        <button class="chip on" data-goto="friends">🧠 G2 · 친구 목록 (5명) →</button>
      </div>
    `
    root.querySelector('[data-m="hair"]').append(MemoryModel(SCENARIO_GRAPH_HAIR))
    root.querySelector('[data-m="money"]').append(MemoryModel(SCENARIO_GRAPH_MONEY))
    root.querySelector('[data-m="nested"]').append(MemoryModel(SCENARIO_GRAPH_NESTED))
    root.querySelector('[data-m="sameA"]').append(MemoryModel(SCENARIO_SAME_A))
    root.querySelector('[data-m="sameBC"]').append(MemoryModel(SCENARIO_SAME_BC))
    root.querySelector('[data-m="shared"]').append(MemoryModel(SCENARIO_SHARED))
    root.querySelector('[data-m="copy"]').append(MemoryModel(SCENARIO_COPY))
    wireCTA(root)
  }

  // ══ 객체 그래프 · 친구 목록 (배열 안 사람들 + 참조 증명) ═════
  const friendBox = (emoji, name, mood) => ({ person: emoji, name, fields: [{ key: 'mood', value: mood }] })
  const meWithFriends = { person: '🧑', name: '나', fields: [{ key: 'friends', ref: 'h7' }] }
  const others = { h3: friendBox('🧑', '지민', '"😎"'), h4: friendBox('👨', '민수', '"😴"'), h5: friendBox('👧', '서연', '"🤗"'), h6: friendBox('👦', '준호', '"😐"') }
  const friendsArr = { items: [{ ref: 'h1' }, { ref: 'h3' }, { ref: 'h4' }, { ref: 'h5' }, { ref: 'h6' }] }
  const SCENARIO_FRIENDS = {
    title: '친구 목록 — me.friends[0]과 hyoni는 같은 효니',
    code: [
      'let hyoni = { name: "효니", mood: "😀" }',
      '',
      'let me = {',
      '  name: "나",',
      '  friends: [',
      '    hyoni,                          // 변수로 넣음 (같은 효니!)',
      '    { name: "지민", mood: "😎" },   // 나머지는 바로 객체로',
      '    { name: "민수", mood: "😴" },',
      '    { name: "서연", mood: "🤗" },',
      '    { name: "준호", mood: "😐" },',
      '  ],',
      '}',
      '',
      'me.friends[0].mood = "😭"   // 목록 0번(효니) 기분 바꿈',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }] }], heap: { h1: friendBox('👩', '효니', '"😀"') }, note: '효니(사람)를 변수 hyoni로 가리킨다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'me', ref: 'h2' }] }],
        heap: { h1: friendBox('👩', '효니', '"😀"'), h2: meWithFriends, ...others, h7: friendsArr },
        note: 'me.friends는 <b>5명</b> 배열. <b>0번은 변수 hyoni</b>(같은 효니), 나머지 4명은 객체 리터럴로 바로 만든다 → 효니를 향한 화살표가 <b>둘</b>(hyoni · me.friends[0])!' },
      { line: 13, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'me', ref: 'h2' }] }],
        heap: { h1: friendBox('😭', '효니', '"😭"'), h2: meWithFriends, ...others, h7: friendsArr },
        note: '<code>me.friends[0].mood = "😭"</code> → 목록 0번(효니)을 바꿨는데 <b>hyoni.mood도 😭</b>! 복사본이면 이럴 수 없다 → 이게 <b>참조</b>라는 증거.' },
    ],
  }
  window.Lessons['friends'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 G2</span>
        <h2>친구 목록 — 배열 안에 사람들 (참조 증명)</h2>
        <p>사람(me)이 <b>friends 배열</b>에 친구 5명을 담는다. 그중 효니는 <code>hyoni</code>로도 가리켜져 — 목록에서 바꾸면 hyoni도 바뀐다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>배열에 <b>객체들</b>을 담으면 me → friends배열 → 여러 사람으로 그래프가 <b>가지친다</b>. 같은 객체를 두 경로(hyoni · me.friends[0])로 가리키면 <b>한쪽 변경이 양쪽에</b> — 참조의 증거.</p>
      </div>

      <h3 class="section-title">① 눈으로 — 친구 5명, 그리고 참조 증명</h3>
      <span class="learn-tag">📎 me.friends[0]의 속성을 바꾸면 → hyoni도 바뀐다(같은 객체니까)</span>
      <div data-m="friends"></div>
      <p class="section-desc">🔑 <b>me.friends[0]</b>과 <b>hyoni</b>가 같은 효니를 가리키니, 목록 쪽으로 속성을 바꿔도 hyoni로 봐도 똑같다. 복사본이면 불가능 → 그래서 <b>참조</b>임을 안다.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">배열에 객체를 담으면 <b>가지친 객체 그래프</b>(친구 목록·상품 목록·댓글 목록…).
        같은 객체를 여러 경로로 가리키면 어느 경로로 바꾸든 모두에게 보인다 = 참조.</p>
      </div>

      <div class="practice-cta">
        <span>사람이 사람을 부모로 가리키면? 트리가 된다 — 다음 —</span>
        <button class="chip on" data-goto="family">🕸️ G3 · 계통도 (가계도) →</button>
      </div>
    `
    root.querySelector('[data-m="friends"]').append(MemoryModel(SCENARIO_FRIENDS))
    wireCTA(root)
  }

  // ══ 객체 그래프 · 계통도 (가계도 트리) ══════════════════════
  const P = (emoji, name, parentRef) => ({ person: emoji, name, fields: parentRef ? [{ key: 'parent', ref: parentRef }] : [] })
  const SCENARIO_FAMILY = {
    title: '계통도 — 사람이 부모(객체)를 가리키면 트리가 된다',
    code: [
      'let grandpa = { name: "할아버지" }',
      'let dad    = { name: "아빠",   parent: grandpa }',
      'let uncle  = { name: "삼촌",   parent: grandpa }',
      'let me     = { name: "나",     parent: dad }',
      'let sister = { name: "동생",   parent: dad }',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }] }], heap: { h1: P('👴', '할아버지') }, note: '할아버지 — 뿌리(root). 부모가 없다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }, { name: 'dad', ref: 'h2' }] }], heap: { h1: P('👴', '할아버지'), h2: P('👨', '아빠', 'h1') }, note: '아빠.parent = 할아버지 → 아빠에서 할아버지로 화살표.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }, { name: 'dad', ref: 'h2' }, { name: 'uncle', ref: 'h3' }] }], heap: { h1: P('👴', '할아버지'), h2: P('👨', '아빠', 'h1'), h3: P('🧔', '삼촌', 'h1') }, note: '삼촌도 parent가 할아버지 → 할아버지를 가리키는 화살표가 <b>둘</b>(아빠·삼촌).' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }, { name: 'dad', ref: 'h2' }, { name: 'uncle', ref: 'h3' }, { name: 'me', ref: 'h4' }] }], heap: { h1: P('👴', '할아버지'), h2: P('👨', '아빠', 'h1'), h3: P('🧔', '삼촌', 'h1'), h4: P('🧑', '나', 'h2') }, note: '나.parent = 아빠 → 한 층 더 내려간다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }, { name: 'dad', ref: 'h2' }, { name: 'uncle', ref: 'h3' }, { name: 'me', ref: 'h4' }, { name: 'sister', ref: 'h5' }] }], heap: { h1: P('👴', '할아버지'), h2: P('👨', '아빠', 'h1'), h3: P('🧔', '삼촌', 'h1'), h4: P('🧑', '나', 'h2'), h5: P('👧', '동생', 'h2') }, note: '<b>계통도 완성!</b> <code>me.parent</code>=아빠, <code>me.parent.parent</code>=할아버지. 나와 동생은 <b>같은 아빠</b>를 가리킨다(참조).' },
    ],
  }
  // 계통도 + 구매 → 공유된 아빠 지갑에서 차감 = 참조 증명 (돈으로 실감나게)
  const Pm = (emoji, name, extra) => ({ person: emoji, name, fields: extra })
  const SCENARIO_FAMILY_MONEY = {
    title: '아빠 지갑에서 사면? — 나·동생이 같은 지갑',
    code: [
      'let dad    = { name: "아빠", money: 100000 }   // 가족 지갑',
      'let me     = { name: "나",   parent: dad }',
      'let sister = { name: "동생", parent: dad }',
      'me.parent.money = me.parent.money - 30000   // 내가 3만원 씀',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '100000' }]) }, note: '아빠 객체 — money 10만원(가족 지갑).' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'me', ref: 'h2' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '100000' }]), h2: Pm('🧑', '나', [{ key: 'parent', ref: 'h1' }]) }, note: '나.parent = 아빠.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'me', ref: 'h2' }, { name: 'sister', ref: 'h3' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '100000' }]), h2: Pm('🧑', '나', [{ key: 'parent', ref: 'h1' }]), h3: Pm('👧', '동생', [{ key: 'parent', ref: 'h1' }]) }, note: '동생도 parent가 아빠 → 나·동생이 <b>같은 아빠 지갑</b>을 가리킨다(화살표 둘).' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'me', ref: 'h2' }, { name: 'sister', ref: 'h3' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '70000' }]), h2: Pm('🧑', '나', [{ key: 'parent', ref: 'h1' }]), h3: Pm('👧', '동생', [{ key: 'parent', ref: 'h1' }]) }, note: '내가 <code>me.parent</code>(=아빠) 지갑에서 3만원 씀 → 아빠.money <b>70000</b>. <b>동생이 봐도 sister.parent.money는 70000</b>! 같은 아빠(객체)라서 = <b>참조 증명</b>.' },
    ],
  }
  // 대비 — 객체 속 '원시값(금액 숫자)'을 꺼내 적으면 복사(공유 안 됨). 지갑 vs 수첩에 베낀 숫자.
  const SCENARIO_PRIM_COPY = {
    title: "'금액'을 꺼내 적으면? — 숫자는 복사(공유 안 됨)",
    code: [
      'let dad = { name: "아빠", money: 100000 }',
      'let myNote = dad.money       // 지갑 금액을 수첩에 베낌 (숫자 복사)',
      'myNote = myNote - 30000      // 내 수첩 숫자만 고침',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [{ key: 'money', value: '100000' }] } }, note: '아빠 지갑(객체) money 10만.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'myNote', value: '100000' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [{ key: 'money', value: '100000' }] } }, note: 'myNote = dad.money → 지갑 <b>금액(숫자)만 값으로 복사</b>. myNote는 <b>지갑을 가리키지 않는다</b>(화살표 아님, 그냥 숫자).' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'myNote', value: '70000', bad: true }] }], heap: { h1: { person: '👨', name: '아빠', fields: [{ key: 'money', value: '100000' }] } }, note: '내 수첩(myNote)만 70000. <b>아빠 지갑은 그대로 10만!</b> 숫자를 베낀 것뿐이라 지갑과 무관 = <b>원시값은 복사</b>(공유 안 됨).' },
    ],
  }

  window.Lessons['family'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🕸️ G3</span>
        <h2>계통도 — 트리 (가계도)</h2>
        <p>사람 객체가 <code>parent</code>로 부모 객체를 가리키면, 힙에 <b>트리(계통도)</b>가 생긴다. 별칭·목록에 이은 객체 그래프의 정점.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>객체가 서로를 가리키면 <b>어떤 구조든</b> 만든다 — 한 줄(별칭), 목록(배열), 그리고 <b>트리(계통도)</b>.
        점(.)을 따라가면 <code>me.parent.parent</code>처럼 위로 거슬러 오른다.</p>
      </div>

      <h3 class="section-title">① 눈으로 — 3대(代)가 이어진다</h3>
      <span class="learn-tag">📎 ▶로 할아버지 → 아빠·삼촌 → 나·동생 트리가 만들어진다</span>
      <div data-m="family"></div>

      <h3 class="section-title">② 💳 아빠 지갑에서 사면? — 구매로 참조 증명</h3>
      <span class="learn-tag">📎 나·동생이 같은 아빠를 가리킨다 → 내가 쓰면 동생이 봐도 줄어든다</span>
      <p class="section-desc">가장 실감나는 증거 — 아빠가 <b>가족 지갑(money)</b>을 가졌다고 하자. 내가 <code>me.parent.money</code>에서 3만원을 쓰면?
      복사본이면 나만 줄겠지만, <b>참조</b>라 <b>동생이 봐도 아빠 지갑이 줄어 있다</b>. ▶로 확인하라.</p>
      <div data-m="familyMoney"></div>

      <h3 class="section-title">③ 근데 '금액'만 꺼내 적으면? — 숫자는 복사(공유 안 됨)</h3>
      <span class="learn-tag">📎 지갑(객체)은 공유되지만, 지갑 속 '금액 숫자'를 꺼내면 복사다 — 값 vs 참조</span>
      <p class="section-desc">현실 감각 그대로 — <b>지갑을 통째로 건네면</b> 같은 지갑(참조, ②)이다. 그런데 <b>"얼마 있어?"라고 물어 금액을 수첩에 적으면</b>?
      그 숫자는 <b>복사</b>다. 내 수첩을 고쳐도 아빠 지갑은 그대로. ▶로 확인하라.</p>
      <div data-m="primCopy"></div>
      <p class="section-desc">🔑 정리: <b>객체(지갑) = 가리키면 공유(참조)</b> · <b>원시값(금액 숫자) = 꺼내면 복사</b>. 같은 아빠라도 "지갑을 나눠 가지는 것"과 "금액을 베껴 적는 것"은 완전히 다르다.</p>

      <h3 class="section-title">④ 트리를 타고 오르기</h3>
      <div class="card">
        <div class="file-label">📄 점(.)으로 조상 찾아가기</div>
        <pre class="err-code">me.name                 // "나"
me.parent.name          // "아빠"      (한 칸 위)
me.parent.parent.name   // "할아버지"  (두 칸 위)
me.parent === sister.parent   // true — 나와 동생은 같은 아빠(참조)</pre>
      </div>
      <p class="section-desc">🔑 이 <b>트리 모양</b>이 실전에 그대로 쓰인다 — <b>조직도</b>(사원→팀장→임원), <b>카테고리</b>(소분류→대분류), <b>댓글의 답글</b>, <b>폴더 구조</b>. 전부 객체가 부모를 가리키는 계통도다.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">객체 참조로 <b>트리(계통도)</b>를 만든다. 자식이 부모를 가리키고, <code>.parent.parent</code>로 거슬러 오른다.
        여러 자식이 <b>같은 부모</b>를 가리키면 그 부모는 하나의 객체(참조).</p>
      </div>

      <div class="practice-cta">
        <span>친구끼리 서로를 가리키면? 순환이 생긴다 — 다음 —</span>
        <button class="chip on" data-goto="cycle">🕸️ G4 · 친구 네트워크 (순환) →</button>
      </div>
    `
    root.querySelector('[data-m="family"]').append(MemoryModel(SCENARIO_FAMILY))
    root.querySelector('[data-m="familyMoney"]').append(MemoryModel(SCENARIO_FAMILY_MONEY))
    root.querySelector('[data-m="primCopy"]').append(MemoryModel(SCENARIO_PRIM_COPY))
    wireCTA(root)
  }

  // ══ 객체 그래프 · 순환 (친구끼리 서로 가리킴) ═══════════════
  const SCENARIO_CYCLE = {
    title: '순환 — 효니와 지민은 서로의 베프',
    code: [
      'let hyoni = { name: "효니" }',
      'let jimin = { name: "지민" }',
      'hyoni.bestFriend = jimin   // 효니의 베프 = 지민',
      'jimin.bestFriend = hyoni   // 지민의 베프 = 효니 (서로!)',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }] }], heap: { h1: { person: '👩', name: '효니', fields: [] } }, note: '효니 객체.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'jimin', ref: 'h2' }] }], heap: { h1: { person: '👩', name: '효니', fields: [] }, h2: { person: '🧑', name: '지민', fields: [] } }, note: '지민 객체. 아직 서로 모른다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'jimin', ref: 'h2' }] }], heap: { h1: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h2' }] }, h2: { person: '🧑', name: '지민', fields: [] } }, note: '효니.bestFriend = 지민 → 효니에서 지민으로 화살표.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'jimin', ref: 'h2' }] }], heap: { h1: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h2' }] }, h2: { person: '🧑', name: '지민', fields: [{ key: 'bestFriend', ref: 'h1' }] } }, note: '지민.bestFriend = 효니 → <b>서로 가리킨다 = 순환(cycle)!</b> <code>hyoni.bestFriend.bestFriend</code>는 돌고 돌아 다시 <b>효니 자신</b>.' },
    ],
  }
  window.Lessons['cycle'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🕸️ G4</span>
        <h2>친구 네트워크 — 서로가 서로를 (순환)</h2>
        <p>친구끼리는 <b>서로를</b> 가리킨다 — 효니의 베프는 지민, 지민의 베프는 효니. 이렇게 <b>돌아오는</b> 참조가 <b>순환(cycle)</b>이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>객체 그래프의 마지막 모양 — <b>한 줄(별칭) → 목록 → 트리 → 순환(그물)</b>. 순환에선 화살표를 따라가면 <b>제자리로 돌아온다</b>(<code>hyoni.bestFriend.bestFriend === hyoni</code>).</p>
      </div>

      <h3 class="section-title">① 눈으로 — 서로 가리키기</h3>
      <span class="learn-tag">📎 ▶로 효니→지민, 지민→효니 화살표가 고리를 이룬다</span>
      <div data-m="cycle"></div>

      <h3 class="section-title">② 순환은 실전에 흔하다</h3>
      <p class="section-desc">맞팔로우, 상호 친구, 채팅방 ↔ 참가자, 주문 ↔ 고객 — 서로를 가리키는 <b>순환</b>은 실전 데이터에 아주 많다.
      다만 <code>console.log</code>로 통째로 찍거나 <code>JSON.stringify</code>하면 <b>무한 루프</b>가 날 수 있어 주의한다(돌고 돌아 끝이 없어서).</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약 · 그리고 다음</p>
        <p class="section-desc" style="margin-top:0">객체가 <b>서로를</b> 가리키면 <b>순환</b>. 그래프는 어떤 모양이든 된다(줄·목록·트리·순환).
        🔑 그런데 <b>서로만 가리키고 아무도 안 쓰는 순환</b>은 어떻게 치울까? → <b>메모리 심화 · 가비지 컬렉션</b>에서 이어진다.</p>
      </div>

      <div class="practice-cta">
        <span>객체 그래프 완성! 값 다루기를 이어서 —</span>
        <button class="chip on" data-goto="2">2강 · 계산과 문자열 →</button>
      </div>
    `
    root.querySelector('[data-m="cycle"]').append(MemoryModel(SCENARIO_CYCLE))
    wireCTA(root)
  }
})()
