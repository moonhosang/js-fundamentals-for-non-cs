// 📦 5강 · 함수 — 한 페이지에 몰지 않고 '단계(5-1~5-7, 쇼츠)'로 쪼갬 + 드릴(Practices[5], startAt:8 → 5-8~).
// design-principles: 문법 나열 금지 → 왜/언제부터, 여러 왜, 반복 드릴, 경계. 메모리는 '가정' 말고 강의 안에서 재활성화.
// 오해: 함수=마법 블랙박스/어려운것 · 정의하면 실행됨? · return=print? · 함수 안 변수를 밖에서 씀?
// 왜:  함수=입력→처리→출력 상자(반복 제거·이름으로 의도·수정 한 곳·조립) · return은 돌려줌(print는 찍기만) · 지역변수는 프레임과 함께 사라짐

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  const nav = (prev, pos, next, nextLabel) => `
    <div class="practice-nav">
      <button class="chip" data-goto="${prev}">← 이전</button>
      <span class="practice-nav-dots">스텝 ${pos} / 7</span>
      <button class="chip on" data-goto="${next}">${nextLabel || '다음 →'}</button>
    </div>`

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }
  const stepHeader = (badge, title, sub) => `
    <header class="lesson-header">
      <span class="badge">📦 ${badge}</span>
      <h2>${title}</h2>
      <p>${sub}</p>
    </header>`

  // ── 5강 랜딩 (왜 함수인가 + 단계 안내) ───────────────────────
  window.Lessons[5] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">5강 · 함수</span>
        <h2>함수 — 값을 넣으면 값이 나오는 상자</h2>
        <p>같은 작업을 매번 다시 쓰지 말고, <b>이름 붙인 상자</b>에 넣어 두고 <b>필요할 때 부른다</b>. 값을 <b>넣으면(입력)</b> 결과가 <b>나온다(출력)</b>.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 이 강에서</span>
        <p>먼저 <b>왜 함수가 필요한지</b>부터. 그다음 <b>정의·호출·매개변수/인수·return·스코프</b>를 <b>하나씩(쇼츠처럼)</b>. 부르면 메모리에서 무슨 일이 나는지도 <b>그 자리에서 다시</b> 본다. (선수: 1강 값·변수. 메모리 기초는 안 봤어도 5-5에서 짧게 복습한다.)</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/함수_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">함수 ↗</a> · <a href="https://ko.wikipedia.org/wiki/매개변수_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">매개변수 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — 함수는 '마법 블랙박스'가 아니다</div>
        <p class="section-desc" style="margin:0">함수는 어려운 마법이 아니라 <b>입력 → 처리 → 출력</b>을 하는 <b>상자</b>다 — 자판기처럼. <b>넣는 값</b>을 바꾸면 <b>나오는 값</b>이 바뀐다. 왜 이 상자가 필요한지(5-1)부터 보면 나머지가 쉬워진다.</p>
      </div>

      <h3 class="section-title">📚 단계로 배웁니다 (한 번에 하나씩)</h3>
      <div class="home-grid">
        <button class="home-card" data-goto="5-1"><span class="home-card-title">5-1 · 왜 함수?</span><span class="home-card-sub">반복을 하나로 묶기</span></button>
        <button class="home-card" data-goto="5-2"><span class="home-card-title">5-2 · 정의 & 호출</span><span class="home-card-sub">만들고 ( )로 부르기</span></button>
        <button class="home-card" data-goto="5-3"><span class="home-card-title">5-3 · 매개변수 vs 인수</span><span class="home-card-sub">빈 자리 vs 넣는 값</span></button>
        <button class="home-card" data-goto="5-4"><span class="home-card-title">5-4 · return</span><span class="home-card-sub">돌려줌 vs print</span></button>
        <button class="home-card" data-goto="5-5"><span class="home-card-title">5-5 · 🧠 프레임</span><span class="home-card-sub">부르면 칸이 쌓인다(복습)</span></button>
        <button class="home-card" data-goto="5-6"><span class="home-card-title">5-6 · 스코프</span><span class="home-card-sub">지역 vs 전역</span></button>
        <button class="home-card" data-goto="5-7"><span class="home-card-title">5-7 · 화살표 & 요약</span><span class="home-card-sub">짧은 표기 · 언제 만드나</span></button>
      </div>

      <div class="practice-cta">
        <span>🎯 첫 단계부터 — <b>왜 함수를 쓰는가</b>.</span>
        <button class="chip on" data-goto="5-1">5-1 시작 →</button>
      </div>
    `
    wireGoto(root)
  }

  // ── 5-1 · 왜 함수? (동기 — 문법 전에) ────────────────────────
  window.Lessons['5-1'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-1 · 왜 함수?', '같은 코드가 반복되면 — 하나로 묶는다', '문법보다 먼저: 함수를 "왜" 쓰는지 감부터')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/함수_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">함수 ↗</a></p>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "함수는 어렵고 나중에 배우는 것"</div>
        <p class="section-desc" style="margin:0">반대다. 함수는 <b>귀찮음을 줄이는 도구</b>다. 같은 계산을 여기저기 <b>복붙</b>하다 보면, 나중에 <b>한 곳만 바꿔도 전부 틀어진다</b>. 그 고통을 없애려고 만든 게 함수다.</p>
      </div>

      <h3 class="section-title">① 반복의 고통 — 복붙한 코드</h3>
      <span class="learn-tag">📎 세율(0.1)이 세 줄에 흩어져 있다 — 바꾸려면 세 곳을 다 고쳐야</span>
      <div class="card"><div class="file-label">🔬 같은 식이 세 번</div><div data-m="before"></div></div>
      <div data-m="qz"></div>

      <h3 class="section-title">② 함수로 묶기 — 상자 하나로</h3>
      <span class="learn-tag">📎 '세금 포함 가격' 상자 하나 → 세율은 함수 안 한 곳에만</span>
      <div class="card"><div class="file-label">🔬 하나로 묶은 뒤</div><div data-m="after"></div></div>

      <h3 class="section-title">③ 그래서 함수를 쓰는 이유 — 하나가 아니다</h3>
      <ul class="section-list">
        <li><b>반복 제거(DRY)</b> — 같은 코드를 한 번만 쓴다.
          <span style="display:block;color:var(--muted);font-size:12.5px;margin-top:2px">예: <code>a * 1.1</code>, <code>b * 1.1</code>, <code>c * 1.1</code>를 세 번 쓰는 대신 → <code>withTax(a)</code>, <code>withTax(b)</code>, <code>withTax(c)</code>. <b>계산식은 함수 안에 딱 한 번</b>만 산다.</span></li>
        <li><b>이름으로 의도</b> — <code>withTax(...)</code>라고 쓰면 <b>뭘 하는지</b> 한눈에(주석보다 낫다).
          <span style="display:block;color:var(--muted);font-size:12.5px;margin-top:2px">예: <code>price * 1.1</code>은 "1.1이 뭐지?" 싶지만, <code>withTax(price)</code>는 읽는 순간 "아, 세금 붙이는구나". <b>이름이 곧 설명</b> — 주석은 코드가 바뀌면 낡지만, 이름은 호출할 때마다 읽힌다.</span></li>
        <li><b>수정은 한 곳만</b> — 세율이 바뀌어도 함수 안 한 줄만 고치면 전부 반영.
          <span style="display:block;color:var(--muted);font-size:12.5px;margin-top:2px">예: 세율이 10%→13%로 바뀌면 — 함수가 없으면 코드에 흩어진 <code>* 1.1</code>을 <b>전부 찾아</b> 고쳐야 한다(하나라도 놓치면 버그). 함수면 <code>withTax</code> 안의 <code>1.1</code>을 <code>1.13</code>으로 <b>한 줄</b>만 → 모든 호출에 한꺼번에 반영.</span></li>
        <li><b>조립</b> — 만든 상자를 다른 계산의 <b>부품</b>으로 끼운다(3강 표현식의 그 중첩).
          <span style="display:block;color:var(--muted);font-size:12.5px;margin-top:2px">예: <code>Math.round(withTax(price))</code> — withTax가 돌려준 값을 그대로 <code>Math.round</code>의 입력으로 끼운다. <code>withTax(withDiscount(price))</code>처럼 <b>함수를 함수 안에</b> — 식이 중첩되듯(3강) 상자를 상자에 꽂는다.</span></li>
      </ul>
      <p class="section-desc">👉 <b>"같은 코드를 두 번 이상 쓰게 되면 함수를 생각하라."</b> 이 감각이 이 강의 전체의 목적이다. 이제 상자 만드는 법(5-2)으로.</p>

      <h3 class="section-title">④ 눈으로 — withTax를 부르면? (이름표 장부 │ 값 메모리)</h3>
      <span class="learn-tag">📎 ▶ — 함수로 묶어도, 부를 때마다 그 함수 칸(프레임)이 잠깐 생겼다 사라진다 (자세힌 5-5)</span>
      <div data-m="mem"></div>

      ${nav(5, 1, '5-2', '5-2 · 정의 & 호출 →')}
    `
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '세율을 <code>0.1 → 0.15</code>로 바꾸려면, 위 <b>복붙 코드</b>에서 몇 줄을 고쳐야 할까?',
      options: ['1줄만', '3줄 다', '안 고쳐도 됨'],
      answer: 1,
      explain: '세 줄에 <code>0.1</code>이 흩어져 있어 <b>3곳 다</b> — 하나라도 빠뜨리면 버그다. 함수로 묶으면? <b>함수 안 1곳만</b>(아래에서 확인). 이게 함수를 쓰는 첫 이유.',
    }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'withTax(10000) — 함수를 부르면 프레임이 잠깐 생긴다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function withTax(price) {', '  return price + price * 0.1', '}', 'let a = withTax(10000)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }], heap: {}, note: '<b>①인자 평가</b> — <code>withTax(10000)</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>10000</code>을 값으로 읽는다(식이면 계산). <b>아직 withTax 프레임 없다</b> — a는 반환을 기다린다(대기).', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. a 슬롯은 값 미정(대기는 교육용). 인수 10000은 작은 정수라 <b>SMI</b>로 넘어갈 값.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }, { name: 'withTax', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — withTax의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 price 칸은 아직 비어 있다</b>(바인딩 전).', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 배치는 스펙 비강제.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }, { name: 'withTax', slots: [{ name: 'price', ref: 'price10000' }] }], heap: { price10000: { label: '10000', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>10000</b>을 매개변수 price에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). price는 별개 슬롯.', engine: '인자 <b>값복사</b> — price 슬롯에 10000 비트 복사(작은 정수라 <b>SMI</b> 인라인, 별개 슬롯). 객체였다면 주소(포인터) 복사(공유). 힙은 안 쓴다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }, { name: 'withTax', slots: [{ name: 'price', ref: 'price10000' }] }], heap: { price10000: { label: '10000', prim: true } }, note: '<b>④본문 첫 줄</b> — <code>return price + price*0.1</code>이 <b>11000</b>을 만든다.', engine: '0.1은 소수라 <b>HeapNumber</b>(힙 박스+포인터), price*0.1 결과도 소수. 이 배치는 V8 구현이고 스펙은 강제하지 않는다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', value: '(대기)', bad: true }] }], heap: {}, returning: { value: '11000' }, note: '<b>⑤ 반환 — 값이 통로로 나오고 프레임 pop</b> — <code>return</code>이 <b>11000을 프레임 밖 반환 통로로</b> 내보내고 withTax를 <b>즉시 끝낸다</b>(프레임 pop, 지역 price 사라짐). 11000은 <b>통로에서 호출한 자리로</b> 건네지는 중 — a는 <b>아직 대기</b>.', engine: '<b>return</b> → 결과 11000이 <b>레지스터</b>에 실려 호출자에게 전달되고, withTax 프레임은 <b>pop(즉시 회수)</b> — price 슬롯 소멸. 대입은 아직 안 됐다 — 호출자가 받아야 한다.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'a', value: '11000' }] }], heap: {}, note: '<b>⑥ 호출부 대입</b> — 호출한 자리 <code>let a = …</code>가 반환값 <b>11000</b>을 받아 <b>a에 대입</b>. 이제 a=11000. <b>반환(⑤)과 대입(⑥)은 별개의 두 단계</b> — 프레임이 먼저 죽고, 그 다음 값이 담긴다. 부를 때마다 프레임은 <b>잠깐</b> 생겼다 사라지고 <b>돌려준 값만</b> 남는다.', engine: '레지스터의 반환값 11000이 a 슬롯에 안착(SMI). 프레임은 이미 없다 — 값만 남았다.' },
      ],
    }))
    root.querySelector('[data-m="before"]').append(Runner({ showBox: false, code: [
      '// 세 상품의 "세금 포함 가격" — 같은 식(+ price*0.1)이 반복된다',
      'let a = 10000 + 10000 * 0.1',
      'let b = 25000 + 25000 * 0.1',
      'let c = 8000 + 8000 * 0.1',
      'print(a); print(b); print(c)   // 11000, 27500, 8800',
      '// 😫 세율이 0.1 → 0.15로 바뀌면? 세 줄을 다 고쳐야 한다 (빠뜨리면 버그)',
    ].join('\n') }))
    root.querySelector('[data-m="after"]').append(Runner({ showBox: false, code: [
      'function withTax(price) {        // 상자 하나 — 세율은 여기 한 곳에만',
      '  return price + price * 0.1',
      '}',
      '',
      'print(withTax(10000))   // 11000',
      'print(withTax(25000))   // 27500',
      'print(withTax(8000))    // 8800',
      '// 🎉 세율 바꾸려면? 함수 안 0.1 한 곳만!',
    ].join('\n') }))
    wireGoto(root)
  }

  // ── 5-2 · 정의 & 호출 ───────────────────────────────────────
  window.Lessons['5-2'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-2 · 정의 & 호출', '상자를 만들고(정의), 부른다(호출)', '이름 뒤 ( )가 "지금 실행해!" 신호')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/서브루틴" target="_blank" rel="noopener noreferrer">서브루틴(함수·호출) ↗</a></p>
      <div data-m="qz"></div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "함수를 정의하면 바로 실행된다"</div>
        <p class="section-desc" style="margin:0"><code>function greet() { … }</code>는 상자를 <b>만들어 둘</b> 뿐 — 이 줄만으론 <b>아무 일도 안 난다</b>. <code>greet()</code>처럼 <b>이름 뒤에 ( )를 붙여 불러야</b> 비로소 안이 실행된다.</p>
      </div>

      <h3 class="section-title">① 정의 1번, 호출 여러 번</h3>
      <span class="learn-tag">📎 상자는 한 번 만들고(정의), 필요할 때마다 여러 번 부른다(호출)</span>
      <div class="card"><div class="file-label">🔬 만들고(정의) 부르기(호출)</div><div data-m="def"></div></div>
      <ul class="section-list">
        <li><b>정의(definition)</b> — <code>function greet() { … }</code>. 상자를 <b>만들어 두는</b> 것. <b>딱 한 번</b>.</li>
        <li><b>호출(call)</b> — <code>greet()</code>. 상자를 <b>실행</b>하는 것. <b>몇 번이든</b>. <b>( )가 핵심</b> — 없으면 실행이 아니라 '상자 자체'를 가리킬 뿐(안 돎).</li>
      </ul>

      <h3 class="section-title">② 눈으로 — 스택에서 (이름표 장부 │ 값 메모리)</h3>
      <span class="learn-tag">📎 ▶ — 정의→프레임 X · <b>①호출부</b>가 greet를 부르면 → <b>②프레임 push</b> · <b>④</b>return이 값 생성 → <b>⑤</b>내보내고 pop → <b>⑥</b>print가 받음</span>
      <div data-m="mem"></div>

      ${nav('5-1', 2, '5-3', '5-3 · 매개변수 vs 인수 →')}
    `
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '아래처럼 정의한 뒤 <code>greet</code>라고 <b>( ) 없이</b> 쓰면 "안녕!"이 나올까?<pre class="err-code" style="color:inherit;background:transparent">function greet() {\n  return "안녕!"\n}</pre>',
      options: ['나온다 — "안녕!"', '안 나온다 — 함수 자체를 가리킬 뿐(실행 X)', '에러가 난다'],
      answer: 1,
      explain: '<b>( )가 "지금 실행" 신호</b>다. <code>greet</code>는 상자 <b>자체</b>를 가리킬 뿐(안 돎), <code>greet()</code>라야 안이 실행돼 "안녕!"이 나온다.',
    }))
    root.querySelector('[data-m="def"]').append(Runner({ showBox: false, code: [
      'function greet() {          // 정의: "greet라는 상자를 만든다" (아직 안 돎)',
      '  return "안녕!"',
      '}',
      '',
      'print(greet())             // "안녕!"',
      '// ( )를 붙여야 호출(실행)된다',
      'print(greet())             // "안녕!"',
      '// 몇 번이든 다시 부를 수 있다',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '정의→상자만 · ①호출→②프레임 · return→④값생성·⑤반환pop·⑥호출부 사용',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function greet() {', '  return "안녕!"', '}', 'print(greet())'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>정의만</b> — <code>function greet(){…}</code>는 스택에 <b>아무 프레임도 안 만든다</b>(상자만 만들어 둠). 아직 아무것도 안 돈다.', engine: '<b>함수 정의</b>는 힙에 <b>함수 객체</b>를 만들어 이름에 묶을 뿐 — <b>실행 컨텍스트(프레임)는 생기지 않는다</b>. 호출해야 프레임이 push된다.' },
        { line: 3, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>①호출부 — 호출부가 greet를 부른다</b> — 마지막 줄 <code>print(greet())</code>를 실행하려면 <b>먼저 그 인자 <code>greet()</code>를 값으로 만들어야</b> 한다 → 그래서 <b>print보다 greet가 먼저</b> 호출된다(( )가 그 신호). <b>아직 greet 프레임은 없다</b>(main만) — print는 인자가 준비되길 기다린다.', engine: '<b>호출 규약</b>: 바깥 <code>print(...)</code>의 인자부터 평가된다(인자 평가가 함수 진입보다 먼저). 인수가 없어 값복사(③ 바인딩)는 없다. 아직 새 프레임 없음 — 다음 순간 push된다.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'greet', slots: [] }], heap: {}, note: '<b>②프레임 push(진입)</b> — 그 호출로 greet의 <b>실행 컨텍스트</b>가 스택에 쌓이고 본문으로 들어간다. <b>매개변수 없음</b>(빈 프레임). <b>아직 돌려줄 값은 없다</b>.', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다. 매개변수가 없어 인자 값복사(③ 바인딩)는 생략된다. 배치는 스펙 비강제.' },
        { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'greet', slots: [] }], heap: {}, note: '<b>④본문 — 반환값이 <u>지금</u> 만들어진다</b> — <code>return</code>은 먼저 <b>오른쪽 식을 값으로 만든다</b> → 문자열 <b>"안녕!"</b>이 <b>만들어진다</b>(아직 프레임 안, 통로 전). greet 프레임은 <b>아직 살아 있다</b>. 이 값이 곧 돌려줄 <b>반환값</b>이다.', engine: '<b>return의 오른쪽 식</b>부터 평가 — 문자열 리터럴 <b>"안녕!"</b>이 힙의 <b>불변 String</b>으로 만들어진다(리터럴이라 <b>인터닝</b>될 수 있음). 프레임은 아직 살아 있고, 이 값의 <b>포인터</b>가 반환 준비된다.' },
        { line: 1, stack: [{ name: 'main', slots: [] }], heap: {}, returning: { value: '"안녕!"' }, note: '<b>⑤ 반환·pop — 값이 통로로 나오고 프레임 종료</b> — <code>return</code>이 <b>"안녕!"을 프레임 <u>밖 반환 통로로</u> 내보내고</b> greet를 <b>즉시 끝낸다</b>(프레임 pop). 값은 <b>어떤 이름표도 안 붙은 채</b> 통로에서 호출한 자리로 가는 중 — <b>값은 살아 있지만 프레임은 사라졌다</b>.', engine: '<b>return</b> → 값(포인터)이 <b>레지스터</b>에 실려 호출자에게 전달되고 greet 프레임은 <b>pop(즉시 회수)</b>. 문자열 객체 자체는 힙에 남아 <b>참조되는 동안</b> 산다.' },
        { line: 3, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>⑥ 호출부 — 돌려받은 값을 쓴다</b> — 호출한 자리 <code>print(<u>여기</u>)</code>가 반환값 <b>"안녕!"</b>을 받아 <b>화면에 찍는다</b>. <b>반환(⑤)과 사용(⑥)은 별개의 두 단계</b>. (여기선 변수에 담지 않고 바로 print에 넘겼다 — 담고 싶으면 <code>let m = greet()</code>, 그건 5-4.)', engine: '레지스터의 반환값이 <code>print</code>의 인자로 넘어간다. 아무 지역 슬롯에도 안 담겼다 — 담으려면 호출부에서 <code>=</code> 대입이 필요(5-4의 ⑥).' },
      ],
    }))
    wireGoto(root)
  }

  // ── 5-3 · 매개변수 vs 인수 ──────────────────────────────────
  window.Lessons['5-3'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-3 · 매개변수 vs 인수', '빈 자리 vs 넣는 값', '같은 상자, 넣는 값만 바꾸면 결과가 바뀐다')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/매개변수_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">매개변수 ↗</a></p>
      <h3 class="section-title">① 값을 받는 상자</h3>
      <span class="learn-tag">📎 정의의 name = 매개변수(빈 자리) · 호출의 "민지" = 인수(실제 값)</span>
      <div class="card"><div class="file-label">🔬 같은 상자, 다른 입력</div><div data-m="param"></div></div>
      <ul class="section-list">
        <li><b>매개변수(parameter)</b> — 정의의 <code>function greet(<b>name</b>)</code>의 <b>name</b>. "값을 받을 <b>빈 이름</b>". (자판기의 버튼 자리)</li>
        <li><b>인수(argument)</b> — 호출의 <code>greet(<b>"민지"</b>)</code>의 <b>"민지"</b>. "실제로 <b>넣는 값</b>". 이 값이 매개변수 name에 담긴다. (넣는 동전)</li>
      </ul>
      <p class="section-desc">여러 개도 가능 — <code>function add(a, b)</code>처럼 쉼표로. 순서대로 <code>add(3, 4)</code>의 3→a, 4→b.</p>

      <h3 class="section-title">② 눈으로 — 인수가 매개변수 칸에 담긴다</h3>
      <span class="learn-tag">📎 ▶ — 인수 "민지"가 매개변수 name 셀에 들어가는 걸 본다</span>
      <div data-m="mem"></div>

      <h3 class="section-title">③ ⚠️ 개수가 안 맞으면? — 부족 / 초과</h3>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "매개변수가 2개면 인수도 딱 2개여야 에러난다"</div>
        <p class="section-desc" style="margin:0"><b>에러 안 난다.</b> JS는 개수가 안 맞아도 <b>그냥 실행</b>한다 — <b>부족</b>하면 안 채운 매개변수는 <code>undefined</code>, <b>초과</b>하면 남는 인수는 <b>버려진다</b>(무시). 그래서 <code>add(3)</code>이 에러가 아니라 조용히 <b>NaN</b>을 내는 함정이 생긴다("계산 안 되니 에러겠지"가 착각).</p>
      </div>
      <div data-m="qz-ar1"></div>
      <div data-m="qz-ar2"></div>
      <span class="learn-tag">📎 부족 → 빈 매개변수는 <code>undefined</code> · 초과 → 남는 인수는 무시(버려짐)</span>
      <div data-m="sim-arity"></div>
      <div class="card"><div class="file-label">🔬 실행 — 2개 선언, 1개·3개 넘겨보기</div><div data-m="arity"></div></div>
      <p class="section-desc">🔑 "부족"을 막는 도구가 <b>기본 매개변수</b> — <code>function add(a, b = 0)</code>처럼 두면, b를 안 넘겼을 때 <code>undefined</code> 대신 <b>0</b>이 들어간다. 반대로 <b>"초과"를 다 받으려면 <code>나머지 매개변수 ...args</code></b> — 넘긴 인수를 <b>배열로 모은다</b>(<code>function sumAll(...nums)</code>). 버려지던 초과분을 오히려 활용하는 도구다.</p>

      ${nav('5-2', 3, '5-4', '5-4 · return →')}
    `
    root.querySelector('[data-m="param"]').append(Runner({ showBox: false, code: [
      'function greet(name) {          // name = 매개변수(빈 자리)',
      '  return "안녕, " + name + " 님!"',
      '}',
      '',
      'print(greet("민지"))            // "민지" = 인수 → name에 담긴다',
      'print(greet("지훈"))            // 넣는 값만 바꾸면 결과가 바뀐다',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'greet("민지") — 인수가 매개변수 name에 담긴다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function greet(name) {', '  return "안녕, " + name + " 님!"', '}', 'print(greet("민지"))'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>①인자 평가</b> — <code>greet("민지")</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>"민지"</code>를 값으로 읽는다(식이면 계산). <b>아직 greet 프레임 없다.</b>', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. 인수 "민지"는 힙의 <b>문자열 객체</b>이고, 넘어가는 건 그 <b>포인터</b>다.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'greet', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — greet의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 name 칸은 아직 비어 있다</b>(바인딩 전).', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 배치는 스펙 비강제.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'greet', slots: [{ name: 'name', ref: 'nameMinji' }] }], heap: { nameMinji: { label: '"민지"', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>"민지"</b>를 매개변수 name에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). name 셀 = "민지".', engine: '인자 <b>값복사</b> — 문자열은 <b>포인터 값복사</b>로 name 슬롯에 담긴다(본체는 힙에 하나, 복사되는 건 주소; 원시로 다루면 별개 셀). 객체였다면 주소복사(공유). 이 배치 V8 구현, 스펙 비강제.' },
        { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'greet', slots: [{ name: 'name', ref: 'nameMinji' }] }], heap: { nameMinji: { label: '"민지"', prim: true } }, note: '<b>④본문 첫 줄</b> — <code>return "안녕, " + name + " 님!"</code>이 새 문자열을 만든다. 이름은 장부, 값은 값 메모리.', engine: '이어붙이기는 새 <b>문자열 객체</b>를 힙에 만들고 그 <b>포인터</b>가 반환값이 된다.' },
        { line: 1, stack: [{ name: 'main', slots: [] }], heap: {}, returning: { value: '"안녕, 민지 님!"' }, note: '<b>⑤ 반환 — 값이 통로로 나오고 프레임 pop</b> — <code>return</code>이 <b>"안녕, 민지 님!"</b>을 프레임 밖 <b>반환 통로로</b> 내보내고 greet를 <b>즉시 끝낸다</b>(프레임 pop, 지역 name 사라짐). 반환값은 <b>통로에서 호출한 자리(print의 인자)로</b> 건네지는 중.', engine: '<b>return</b> → 이어붙인 새 문자열의 <b>포인터</b>가 레지스터로 넘어가고 greet 프레임은 <b>pop</b>. 지역 슬롯 name은 사라진다(가리키던 "민지" 본체는 아무도 안 쓰면 추후 GC).' },
        { line: 3, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>⑥ 호출부에서 사용</b> — 호출한 자리 <code>print(…)</code>가 반환값 <b>"안녕, 민지 님!"</b>을 받아 <b>화면에 찍는다</b>. <b>반환(⑤)과 사용(⑥)은 별개의 두 단계</b> — greet가 먼저 끝나고, 그 반환값을 print가 받는다.', engine: 'print는 반환값(문자열 포인터)을 인자로 받아 출력한다. greet 프레임은 이미 pop된 뒤 — 값만 넘어왔다.' },
      ],
    }))
    root.querySelector('[data-m="arity"]').append(Runner({ showBox: false, code: [
      'function add(a, b) { return a + b }   // 매개변수 2개 (a, b)',
      '',
      '// 딱 맞게 — 2개',
      'print(add(3, 4))      // 7',
      '',
      '// 부족 — 1개만 넘김 → b는 undefined → 3 + undefined',
      'print(add(3))         // NaN  (에러 아님! 조용한 함정)',
      '',
      '// 초과 — 3개 넘김 → 남는 5는 버려짐(무시)',
      'print(add(3, 4, 5))   // 7',
      '',
      '// 🔑 "부족"을 막는 법 — 기본 매개변수',
      'function add2(a, b = 0) { return a + b }',
      'print(add2(3))        // 3   (b를 안 넘기면 undefined 대신 0)',
      '',
      '// 🔑 반대로 "초과"를 다 받으려면 — 나머지 매개변수 ...rest',
      'function sumAll(...nums) { return nums.reduce((a, b) => a + b, 0) }',
      'print(sumAll(1, 2, 3, 4))   // 10  (넘긴 걸 배열 nums로 다 모음)',
    ].join('\n') }))
    root.querySelector('[data-m="qz-ar1"]').append(Quiz({
      q: '<code>function add(a, b) { return a + b }</code> — <b>인수를 하나만</b> 넘겨 <code>add(10)</code>을 부르면?',
      options: ['에러가 난다 (인수 부족)', 'NaN — b가 undefined라 10 + undefined', '10 — b는 그냥 무시된다', 'undefined'],
      answer: 1,
      explain: '에러가 <b>아니다!</b> b에 넣을 인수가 없어 <b>b는 undefined</b> → <code>10 + undefined = NaN</code>. "개수 안 맞으면 에러"가 최대 착각 — JS는 조용히 undefined로 채운다.',
    }))
    root.querySelector('[data-m="qz-ar2"]').append(Quiz({
      q: '<b>인수를 더 많이</b> — <code>add(1, 2, 3)</code>을 부르면? (add는 a, b <b>2개만</b> 받는다)',
      options: ['에러가 난다 (인수 초과)', '6 — 1+2+3', '3 — 1+2, 남는 3은 버려짐', '1'],
      answer: 2,
      explain: '남는 인수 <b>3은 그냥 버려진다</b>(무시) → a=1, b=2 → <code>1+2=3</code>. 초과도 에러가 아니다 — 매개변수 자리에 없는 인수는 조용히 사라진다. (전부 받으려면 나머지 매개변수 <code>...args</code> — 심화.)',
    }))
    root.querySelector('[data-m="sim-arity"]').append(MemoryModel({
      title: 'add(3) — 인수 1개, 매개변수 2개 → b는 undefined',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function add(a, b) { return a + b }', 'add(3)'],
      steps: [
        { line: 1, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>①인자 평가</b> — <code>add(3)</code>은 인수 <b>3 하나</b>만 준비된다. b에 넣을 인수는 <b>없다</b>.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'add', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — add 프레임. 매개변수 a·b 빈칸.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'add', slots: [{ name: 'a', value: '3' }, { name: 'b', value: 'undefined', bad: true }] }], heap: {}, note: '<b>③바인딩(부족)</b> — 인수는 1개뿐 → a엔 <b>3</b>, b는 채울 인수가 없어 <b>undefined</b>로 남는다(빈 자리 그대로).' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'add', slots: [{ name: 'a', value: '3' }, { name: 'b', value: 'undefined', bad: true }] }], heap: {}, note: '<b>④본문</b> — <code>return a + b</code> = <code>3 + undefined</code> = <b>NaN</b>(숫자+undefined는 NaN). 에러가 아니다.' },
        { line: 1, stack: [{ name: 'main', slots: [] }], heap: {}, returning: { value: 'NaN' }, note: '<b>⑤ 반환·pop</b> — NaN이 반환 통로로 나오고 add pop. 조용히 NaN이 나오는 함정.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 5-4 · return (vs print) ─────────────────────────────────
  window.Lessons['5-4'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-4 · return', "값을 '돌려준다' — print와 다르다!", '돌려받아 담고, 또 다른 계산에 쓴다')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/반환문" target="_blank" rel="noopener noreferrer">반환문(return) ↗</a></p>
      <div data-m="qz"></div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "return과 print가 같다"</div>
        <p class="section-desc" style="margin:0"><b>다르다.</b> <code>return</code>은 결과를 <b>호출한 자리로 돌려줘</b> 변수에 담거나 다시 쓸 수 있다. <code>print</code>는 <b>화면에 찍기만</b> 하고 값을 <b>못 돌려준다</b>. return이 없으면 함수는 <code>undefined</code>를 돌려준다.</p>
      </div>
      <h3 class="section-title">① 돌려받아 담고, 또 쓰기</h3>
      <span class="learn-tag">📎 let sum = add(3,4) — 돌려준 값을 담는다 · return 없으면 undefined</span>
      <div class="card"><div class="file-label">🔬 return 있음 vs 없음</div><div data-m="ret"></div></div>
      <p class="section-desc">🔑 <b>결과를 다시 쓰려면 반드시 return</b>. "화면에만 보이면 됐지"가 아니다 — 담아서 조립하려면 돌려줘야 한다(그게 5-1의 '부품으로 조립').</p>

      <h3 class="section-title">② 눈으로 — 돌려준 값이 변수에 담긴다</h3>
      <span class="learn-tag">📎 ▶ — return 10이 double 프레임에서 나와 r 셀에 담긴다</span>
      <div data-m="mem"></div>

      <h3 class="section-title">③ 🔨 직접 만들어보기 — 예측을 넘어 '생산'으로</h3>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">💡 읽기 ≠ 짜기</div>
        <p class="section-desc" style="margin:0">함수가 어떻게 도는지 <b>예측</b>하는 것과 직접 <b>짜는</b> 것은 다른 능력이다. 아래 <b>빈 본문을 채우고 ▶실행</b>하라. 결과 주석(<code>// ?</code>)은 <b>정답 스포일러</b>라 가려져 있다 — 먼저 스스로 맞히고 💡로 펼쳐 확인하라.</p>
      </div>

      <span class="learn-tag">🔨 과제 1 (기초) — <code>dbl(n)</code>이 n의 <b>2배</b>를 돌려주도록 본문을 채워라</span>
      <div data-m="make1"></div>

      <span class="learn-tag">🔨 과제 2 (조립) — <code>greet(name)</code>이 <code>"안녕, ○○님"</code>을 돌려주도록(문자열 이어붙이기)</span>
      <div data-m="make2"></div>

      <span class="learn-tag">🔨 과제 3 (조건) — <code>max2(a, b)</code>가 <b>둘 중 큰 값</b>을 돌려주도록(삼항 <code>? :</code> 또는 if)</span>
      <div data-m="make3"></div>
      <p class="section-desc" style="opacity:.85">🔑 막히면? <b>매개변수를 써서 식을 만들고 <code>return</code></b>하면 된다. 정답을 예측형 드릴로 더 굳히려면 → 사이드바 이 강의 아래 <b>🟢🟡🔴</b>의 🔨 만들기 문제들.</p>

      ${nav('5-3', 4, '5-5', '5-5 · 🧠 프레임 →')}
    `
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '아래 함수는 <b>return이 없다</b>. <code>print(f(5))</code>는 뭘 찍을까?<pre class="err-code" style="color:inherit;background:transparent">function f(x) {\n  let y = x * 2   // ← return 없음!\n}</pre>',
      options: ['10', 'undefined (돌려준 게 없다)', '0', '에러'],
      answer: 1,
      explain: '함수 안에서 계산은 했지만 <b>return으로 내보내지 않았다</b> → 함수는 <b>undefined</b>를 돌려준다. "계산했으니 10이 나오겠지"가 최대 착각. return이 있어야 값이 밖으로 나온다.',
    }))
    root.querySelector('[data-m="ret"]').append(Runner({ showBox: false, code: [
      'function add(a, b) {',
      '  return a + b            // 결과를 "돌려준다"',
      '}',
      '',
      'let sum = add(3, 4)       // 돌려준 값을 변수에 담는다',
      'print(sum)                // 7',
      'print(add(sum, 10))       // 17',
      '// 돌려받은 값을 또 다른 계산에 넣었다',
      '',
      'function noReturn(x) {     // return이 없으면?',
      '  let y = x * 2           // 계산만 하고 안 돌려줌',
      '}',
      'print(noReturn(5))        // undefined',
      '// 돌려준 게 없다',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'return이 값을 돌려줘 변수에 담긴다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function double(x) {', '  return x * 2', '}', 'let r = double(5)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }], heap: {}, note: '<b>①인자 평가</b> — <code>double(5)</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>5</code>를 값으로 읽는다(식이면 계산). <b>아직 double 프레임 없다</b> — r은 반환을 기다린다(대기).', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. r 슬롯은 값 미정(대기는 교육용). 인수 5는 작은 정수라 <b>SMI</b>.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }, { name: 'double', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — double의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 x 칸은 아직 비어 있다</b>(바인딩 전).', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 배치는 스펙 비강제.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }, { name: 'double', slots: [{ name: 'x', ref: 'x5' }] }], heap: { x5: { label: '5', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>5</b>를 매개변수 x에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). x는 별개 슬롯.', engine: '인자 <b>값복사</b> — x 슬롯에 5 비트 복사(<b>SMI</b> 인라인, 별개 슬롯). 객체였다면 주소(포인터) 복사(공유).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }, { name: 'double', slots: [{ name: 'x', ref: 'x5' }] }], heap: { x5: { label: '5', prim: true } }, note: '<b>④본문 첫 줄</b> — <code>return x*2</code>가 <b>10</b>을 만든다.', engine: 'x*2도 정수라 <b>SMI</b> 범위.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }], heap: {}, returning: { value: '10' }, note: '<b>⑤ 반환 — 값이 <span style="color:#b45309">통로</span>로 나오고 프레임 pop</b> — <code>return x*2</code>가 <b>10을 프레임 밖 반환 통로로</b> 내보내고 double을 <b>즉시 끝낸다</b>(프레임 pop, 지역 x 사라짐). 10은 이제 <b>통로에서 호출한 자리로</b> 가는 중 — r은 <b>아직 대기</b>. (통로 = 값이 사는 곳 아님, 잠깐 지나감.)', engine: '<b>return 10</b> → 값이 <b>레지스터</b>(=이 통로)에 실려 호출자에게 전달되고 double 프레임은 <b>pop(즉시 회수)</b> — x 슬롯 소멸. (return이 없었다면 싱글턴 <b>undefined</b>가 넘어갔을 것.)' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'r', value: '10' }] }], heap: {}, note: '<b>⑥ 호출부 대입</b> — 호출한 자리 <code>let r = …</code>가 <b>반환 통로의 10</b>을 받아 <b>r 셀에 담는다</b> ✔ (통로는 <b>비워짐</b>). <b>반환(⑤)과 대입(⑥)은 별개의 두 단계</b>. (return이 없었다면 r엔 <b>undefined</b>가 담겼을 것.)', engine: '레지스터의 반환값 10이 r 슬롯에 안착(SMI). 프레임은 이미 없다.' },
      ],
    }))
    root.querySelector('[data-m="make1"]').append(Runner({ showBox: false, code: [
      '// n의 2배를 돌려주도록 아래 본문을 채우고 ▶실행',
      'function dbl(n) {',
      '  // 여기에 return 문을 쓰세요 (매개변수 n 사용)',
      '}',
      '',
      'print(dbl(4))    // 8',
      'print(dbl(10))   // 20',
    ].join('\n') }))
    root.querySelector('[data-m="make2"]').append(Runner({ showBox: false, code: [
      '// "안녕, ○○님"을 돌려주도록 채우고 ▶실행',
      'function greet(name) {',
      '  // 여기에 return 문을 쓰세요 (name을 문장에 끼우기)',
      '}',
      '',
      'print(greet("민지"))   // "안녕, 민지님"',
      'print(greet("지훈"))   // "안녕, 지훈님"',
    ].join('\n') }))
    root.querySelector('[data-m="make3"]').append(Runner({ showBox: false, code: [
      '// 둘 중 큰 값을 돌려주도록 채우고 ▶실행',
      'function max2(a, b) {',
      '  // 여기에 return 문을 쓰세요 (삼항 a > b ? _ : _ 또는 if)',
      '}',
      '',
      'print(max2(3, 8))    // 8',
      'print(max2(10, 2))   // 10',
    ].join('\n') }))
    wireGoto(root)
  }

  // ── 5-5 · 🧠 반환(return)을 프레임으로 — 아주 자세히 ──────────
  window.Lessons['5-5'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-5 · 🧠 반환의 여러 모습', "반환은 '있을 수도, 없을 수도, 다를 수도'", '함수 최대 난관 — 프레임 push/pop으로 낱낱이 본다')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/반환문" target="_blank" rel="noopener noreferrer">반환문 ↗</a> · <a href="https://ko.wikipedia.org/wiki/콜_스택" target="_blank" rel="noopener noreferrer">콜 스택 ↗</a> · <a href="https://ko.wikipedia.org/wiki/제어_흐름" target="_blank" rel="noopener noreferrer">제어 흐름 ↗</a></p>
      <div class="card">
        <div class="file-label">🧠 30초 복습 — 프레임이 뭐였더라</div>
        <p class="section-desc" style="margin:0">함수를 부르면 <b>그 함수만의 작업 칸(프레임)</b>이 <b>스택</b>에 잠깐 쌓인다. 왼쪽 <b>이름표 장부</b>(이름) · 오른쪽 <b>값 메모리</b>(실제 값). <b>핵심: <code>return</code>은 두 가지를 동시에 한다 — ① 값을 프레임 <u>밖으로</u> 내보내고 ② 함수를 <u>즉시 끝낸다</u>(프레임 pop).</b> (더 깊이는 🧠 M1~M2 · 콜 스택.)</p>
      </div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 왜 어렵나 — 반환은 '있을 수도, 없을 수도'</div>
        <p class="section-desc" style="margin:0">같은 함수라도 <b>어떤 길로 가느냐에 따라</b> 값을 <b>돌려줄 수도(return), 안 돌려줄 수도(undefined)</b> 있고, <b>여러 return 중 하나만</b> 실행된다. 이 '경우의 수'를 프레임으로 보면 헷갈림이 풀린다. 아래 네 가지를 ▶로.</p>
      </div>

      <h3 class="section-title">① 있음 — return이 값을 '밖으로' 내보낸다</h3>
      <span class="learn-tag">📎 ▶ — return 7이 add 프레임에서 나와 sum에 담기고, 프레임은 pop</span>
      <div data-m="f1"></div>

      <h3 class="section-title">② 없음 — return이 없으면?</h3>
      <div data-m="qz2"></div>
      <span class="learn-tag">📎 계산만 하고 안 돌려주면? 함수는 자동으로 undefined를 내놓는다</span>
      <div data-m="f2"></div>
      <div class="card"><div class="file-label">🔬 직접 — 돌려준 게 없으면</div><div data-m="r2"></div></div>

      <h3 class="section-title">③ 조기 반환 — return을 먼저 만나면?</h3>
      <div data-m="qz3"></div>
      <span class="learn-tag">📎 return은 함수를 그 자리에서 끝낸다 — 그 아래 코드는 실행조차 안 된다(dead)</span>
      <div data-m="f3"></div>
      <div class="card"><div class="file-label">🔬 직접 — 0으로 나눌 때 막기(가드)</div><div data-m="r3"></div></div>

      <h3 class="section-title">④ 조건부 반환 — 분기마다 다른 return</h3>
      <div data-m="qz4"></div>
      <span class="learn-tag">📎 점수에 따라 A·B·C 중 하나만 실행 — "있을 수도, 다를 수도"의 정체</span>
      <div data-m="f4"></div>
      <div class="card"><div class="file-label">🔬 직접 — 점수 → 등급</div><div data-m="r4"></div></div>

      <div class="concept">
        <p class="concept-lead">📖 이 단계 요약</p>
        <p class="section-desc" style="margin-top:0"><code>return 값</code>: 값을 <b>밖으로</b> + 함수 <b>즉시 종료</b>(pop). <b>return 없음/끝까지 안 만남 → undefined</b>. <b>여러 return</b> 중 <b>먼저 만나는 하나</b>만 실행. 지역변수는 프레임과 함께 사라진다(→ 5-6).</p>
      </div>
      ${nav('5-4', 5, '5-6', '5-6 · 스코프 →')}
    `
    root.querySelector('[data-m="qz2"]').append(Quiz({
      q: '아래 함수는 <b>return이 없다</b>. <code>let r = shout(5)</code> 뒤 <b>r은?</b><pre class="err-code" style="color:inherit;background:transparent">function shout(x) {\n  let big = x * 100   // ← return 없음!\n}</pre>',
      options: ['500', 'undefined', '0'],
      answer: 1,
      explain: 'big=500을 <b>계산은</b> 했지만 <b>return으로 내보내지 않았다</b> → 함수는 undefined를 돌려주고, big(지역)은 사라진다. r엔 <b>undefined</b>.',
    }))
    root.querySelector('[data-m="qz3"]').append(Quiz({
      q: '<code>safeDiv(a,b)</code>가 <code>if(b===0) return "못 나눔"</code> 다음 줄에 <code>return a/b</code>가 있다. <b>safeDiv(10, 0)</b>에서 <code>return a/b</code>가 실행될까?',
      options: ['실행된다 (10/0 계산)', '실행 안 된다 (위에서 이미 return해 끝남)'],
      answer: 1,
      explain: 'b가 0이라 첫 줄 <code>return "못 나눔"</code>에서 <b>함수가 즉시 끝난다</b> — 아래 <code>return a/b</code>는 <b>실행조차 안 됨</b>(dead). return은 값을 내보내며 <b>함수를 종료</b>한다.',
    }))
    root.querySelector('[data-m="qz4"]').append(Quiz({
      q: '<code>grade</code>: <code>if(≥90)return"A"; if(≥80)return"B"; return"C"</code>. <b>grade(85)</b>는?',
      options: ['"A"', '"B"', '"C"'],
      answer: 1,
      explain: '첫 <code>if(≥90)</code>는 거짓(건너뜀), 둘째 <code>if(≥80)</code>는 참 → <b>return "B"</b>에서 끝(셋째 "C"는 안 옴). 점수가 달랐다면 다른 return이 실행됐을 것.',
    }))
    root.querySelector('[data-m="f1"]').append(MemoryModel({
      title: '① 있음 — return이 값을 밖으로 내보낸다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function add(a, b) {', '  return a + b', '}', 'let sum = add(3, 4)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }], heap: {}, note: '<b>①인자 평가</b> — <code>add(3,4)</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>3</code>·<code>4</code>를 값으로 읽는다(식이면 계산). <b>아직 add 프레임 없다</b> — sum은 반환을 기다린다(대기).', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. 인수 3·4는 작은 정수라 <b>SMI</b>로 넘어갈 값.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }, { name: 'add', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — add의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 a·b 칸은 아직 비어 있다</b>(바인딩 전).', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 배치는 스펙 비강제.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }, { name: 'add', slots: [{ name: 'a', ref: 'a3' }, { name: 'b', ref: 'b4' }] }], heap: { a3: { label: '3', prim: true }, b4: { label: '4', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>3·4</b>를 각각 매개변수 a·b에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). 각자 별개 슬롯.', engine: '인자 <b>값복사</b> — 3·4가 각각 a·b 슬롯에 비트 복사(<b>SMI</b> 인라인, 별개 슬롯, 힙 안 씀). 객체였다면 주소(포인터) 복사(공유).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }, { name: 'add', slots: [{ name: 'a', ref: 'a3' }, { name: 'b', ref: 'b4' }] }], heap: { a3: { label: '3', prim: true }, b4: { label: '4', prim: true } }, note: '<b>④본문 첫 줄</b> — <code>return a+b</code>가 <b>7</b>을 만든다.', engine: '중첩·재귀라면 이렇게 프레임이 여러 개 쌓인다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'sum', value: '(대기)', bad: true }] }], heap: {}, returning: { value: '7' }, note: '<b>⑤ 반환 — 값이 통로로 나오고 프레임 pop</b> — <code>return a+b</code>가 <b>7을 프레임 밖 반환 통로로</b> 내보내고 add를 <b>즉시 끝낸다</b>(프레임 pop, 지역 a·b 사라짐). 7은 <b>통로에서 호출한 자리로</b> 가는 중 — sum은 <b>아직 대기</b>.', engine: '<b>return 7</b> → 값이 <b>레지스터</b>에 실려 호출자에게 전달되고 add 프레임은 <b>pop(즉시 회수)</b> — a·b 슬롯 소멸.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'sum', value: '7' }] }], heap: {}, note: '<b>⑥ 호출부 대입</b> — 호출한 자리 <code>let sum = …</code>가 반환값 <b>7</b>을 받아 <b>sum에 담는다</b> ✔ 값이 있다. <b>반환(⑤)과 대입(⑥)은 별개의 두 단계</b>.', engine: '레지스터의 반환값 7이 sum 슬롯에 안착. 프레임은 이미 없다.' },
      ],
    }))
    root.querySelector('[data-m="f2"]').append(MemoryModel({
      title: '② 없음 — 끝까지 return이 없으면 undefined',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function shout(x) {', '  let big = x * 100', '}', 'let r = shout(5)'],
      steps: [
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }], heap: {}, note: '<b>①인자 평가</b> — <code>shout(5)</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>5</code>를 값으로 읽는다(식이면 계산). <b>아직 shout 프레임 없다.</b>', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. 인수 5는 <b>SMI</b>.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }, { name: 'shout', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — shout의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 x 칸은 아직 비어 있다</b>(바인딩 전).', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 배치는 스펙 비강제.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }, { name: 'shout', slots: [{ name: 'x', ref: 'x5' }] }], heap: { x5: { label: '5', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>5</b>를 매개변수 x에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). x는 별개 슬롯.', engine: '인자 <b>값복사</b> — x 슬롯에 5 비트 복사(<b>SMI</b> 인라인, 별개 슬롯). 객체였다면 주소(포인터) 복사(공유).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }, { name: 'shout', slots: [{ name: 'x', ref: 'x5' }, { name: 'big', ref: 'big500' }] }], heap: { x5: { label: '5', prim: true }, big500: { label: '500', prim: true } }, note: '<b>④본문 첫 줄</b> — <code>let big = x*100</code> → big=500 <b>계산만</b>. 그런데 <b>return이 없다</b>.', engine: '지역 big=500도 이 프레임 슬롯에(정수라 SMI). 다만 <b>return이 없다</b>.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'r', value: '(대기)', bad: true }] }], heap: {}, returning: { value: 'undefined' }, note: '<b>⑤ 반환 — 자동 undefined, 프레임 pop</b> — 끝까지 <code>return</code>이 없으면 함수는 <b>자동으로 undefined</b>를 <b>반환 통로로</b> 내보내고(에러가 아니라 <b>정상적인 "값 없음"</b>) shout를 끝낸다(프레임 pop, 지역 x·big 사라짐). 이 undefined가 <b>통로에서 호출한 자리로</b> 가는 중 — r은 <b>아직 대기</b>.', engine: '끝까지 return이 없으면 엔진이 <b>싱글턴 undefined</b>를 반환값으로 넘긴다(에러 아님). shout 프레임은 <b>pop</b> → 지역 x·big 슬롯 즉시 소멸.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'r', value: 'undefined' }] }], heap: {}, note: '<b>⑥ 호출부 대입</b> — 호출한 자리 <code>let r = …</code>가 반환값 <b>undefined</b>를 받아 r에 담는다. <b>반환(⑤)과 대입(⑥)은 별개의 두 단계</b> — 돌려준 게 undefined라도 대입은 똑같이 일어난다.', engine: '레지스터의 싱글턴 undefined가 r 슬롯에 안착. 프레임은 이미 없다.' },
      ],
    }))
    root.querySelector('[data-m="r2"]').append(Runner({ showBox: false, code: [
      'function shout(x) {',
      '  let big = x * 100      // 계산만 하고',
      '}                        // return이 없다',
      'let r = shout(5)',
      'print(r)                 // undefined',
      '// 돌려준 게 없다',
    ].join('\n') }))
    root.querySelector('[data-m="f3"]').append(MemoryModel({
      title: '③ 조기 반환 — return을 만나면 즉시 끝',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function safeDiv(a, b) {', '  if (b === 0) return "못 나눔"', '  return a / b', '}', 'safeDiv(10, 0)'],
      steps: [
        { line: 4, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>①인자 평가</b> — <code>safeDiv(10, 0)</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>10</code>·<code>0</code>을 값으로 읽는다(식이면 계산). <b>아직 safeDiv 프레임 없다.</b>', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. 인수 10·0은 작은 정수라 <b>SMI</b>.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'safeDiv', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — safeDiv의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 a·b 칸은 아직 비어 있다</b>(바인딩 전).', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 배치는 스펙 비강제.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'safeDiv', slots: [{ name: 'a', ref: 'a10' }, { name: 'b', ref: 'b0' }] }], heap: { a10: { label: '10', prim: true }, b0: { label: '0', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>10·0</b>을 각각 매개변수 a·b에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). 각자 별개 슬롯.', engine: '인자 <b>값복사</b> — 10·0이 각각 a·b 슬롯에 비트 복사(<b>SMI</b> 인라인, 별개 슬롯). 객체였다면 주소(포인터) 복사(공유).' },
        { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'safeDiv', slots: [{ name: 'a', ref: 'a10' }, { name: 'b', ref: 'b0' }] }], heap: { a10: { label: '10', prim: true }, b0: { label: '0', prim: true } }, note: '<b>④본문 첫 줄</b> — a=10, b=0. <code>b===0</code>이 <b>참</b> → 여기서 <b>return "못 나눔"</b>을 만난다.', engine: 'if 분기는 같은 프레임 안 <b>제어 흐름</b>일 뿐 새 프레임을 만들지 않는다.' },
        { line: 1, stack: [{ name: 'main', slots: [] }], heap: {}, returning: { value: '"못 나눔"', discarded: true }, note: 'return을 만나는 <b>순간 함수는 즉시 끝</b> — <b>아래 <code>return a/b</code>는 실행조차 안 됨</b>(dead code). "못 나눔"이 <b>반환 통로로</b> 나가고 프레임 pop — <code>safeDiv(10,0)</code>은 결과를 안 담아 <b>버려진다</b>.', engine: '<b>조기 return</b> → "못 나눔"(힙 문자열)의 포인터가 레지스터로 넘어가고 프레임은 <b>즉시 pop</b>. 아래 <code>return a/b</code>는 실행 자체가 안 되니 어떤 슬롯·연산도 만들지 않는다.' },
      ],
    }))
    root.querySelector('[data-m="r3"]').append(Runner({ showBox: false, code: [
      'function safeDiv(a, b) {',
      '  if (b === 0) return "0으로 못 나눔"   // 여기서 즉시 끝',
      '  return a / b                          // b가 0이면 여긴 안 온다',
      '}',
      'print(safeDiv(10, 2))   // 5',
      'print(safeDiv(10, 0))   // "0으로 못 나눔" (조기 반환)',
    ].join('\n') }))
    root.querySelector('[data-m="f4"]').append(MemoryModel({
      title: '④ 조건부 — 분기마다 다른 return',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['function grade(score) {', '  if (score >= 90) return "A"', '  if (score >= 80) return "B"', '  return "C"', '}', 'grade(85)'],
      steps: [
        { line: 5, stack: [{ name: 'main', slots: [] }], heap: {}, note: '<b>①인자 평가</b> — <code>grade(85)</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>85</code>를 값으로 읽는다(식이면 계산). <b>아직 grade 프레임 없다.</b>', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. 인수 85는 <b>SMI</b>.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'grade', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — grade의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 score 칸은 아직 비어 있다</b>(바인딩 전).', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 배치는 스펙 비강제.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'grade', slots: [{ name: 'score', ref: 'score85' }] }], heap: { score85: { label: '85', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>85</b>를 매개변수 score에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). score는 별개 슬롯.', engine: '인자 <b>값복사</b> — score 슬롯에 85 비트 복사(<b>SMI</b> 인라인, 별개 슬롯). 객체였다면 주소(포인터) 복사(공유).' },
        { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'grade', slots: [{ name: 'score', ref: 'score85' }] }], heap: { score85: { label: '85', prim: true } }, note: '<b>④본문 첫 줄</b> — score=85. 첫 <code>if(≥90)</code> <b>거짓</b> → 건너뛴다(이 return은 안 됨).', engine: 'if 분기는 같은 프레임 안 제어 흐름이라 프레임 수는 그대로.' },
        { line: 2, stack: [{ name: 'main', slots: [] }, { name: 'grade', slots: [{ name: 'score', ref: 'score85' }] }], heap: { score85: { label: '85', prim: true } }, note: '둘째 <code>if(≥80)</code> <b>참</b> → <b>return "B"</b>. 여기서 끝(셋째 줄 "C"는 안 옴).', engine: '둘째 if가 참이 돼 <b>return "B"</b>로 간다 — 아직 같은 grade 프레임 안. 돌려줄 "B"는 힙 문자열(포인터로 전달될 값).' },
        { line: 2, stack: [{ name: 'main', slots: [] }], heap: {}, returning: { value: '"B"', discarded: true }, note: '"B"가 <b>반환 통로로</b> 나가고 pop — <code>grade(85)</code>는 결과를 안 담아 <b>버려진다</b>. <b>점수가 달랐다면 다른 return</b>이 실행됐을 것 — 그래서 반환값은 "있을 수도, <b>다를 수도</b>".', engine: '<b>return "B"</b> → 문자열 포인터가 <b>레지스터</b>로 넘어가고 grade 프레임은 <b>pop(즉시 회수)</b>. 지역 score는 사라진다.' },
      ],
    }))
    root.querySelector('[data-m="r4"]').append(Runner({ showBox: false, code: [
      'function grade(score) {',
      '  if (score >= 90) return "A"',
      '  if (score >= 80) return "B"',
      '  return "C"',
      '}',
      'print(grade(95))   // "A"',
      'print(grade(85))   // "B"  (첫 if 건너뛰고 둘째서 반환)',
      'print(grade(70))   // "C"  (둘 다 건너뛰고 마지막)',
    ].join('\n') }))
    wireGoto(root)
  }

  // ── 5-6 · 스코프 (지역 vs 전역) ─────────────────────────────
  window.Lessons['5-6'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-6 · 스코프', "함수 안 변수는 '지역' — 밖에서 안 보인다", '5-5에서 봤듯 프레임과 함께 생겼다 사라지니까')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/지역_변수" target="_blank" rel="noopener noreferrer">지역 변수 ↗</a> · <a href="https://ko.wikipedia.org/wiki/전역_변수" target="_blank" rel="noopener noreferrer">전역 변수 ↗</a></p>
      <div data-m="qz"></div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "함수 안에서 만든 변수를 밖에서도 쓸 수 있다"</div>
        <p class="section-desc" style="margin:0">못 쓴다. 함수 안 <code>let</code> 변수(<b>지역변수</b>)는 <b>그 함수 안에서만</b> 살고, 함수가 끝나면 <b>프레임과 함께 사라진다</b>(5-5). 밖에서 부르면 에러다.</p>
      </div>
      <h3 class="section-title">① 지역 vs 전역</h3>
      <span class="learn-tag">📎 함수 밖 변수(전역)는 어디서나 · 함수 안 변수(지역)는 그 안에서만</span>
      <div class="card"><div class="file-label">🔬 밖에서 msg를 부르면? (주석 풀면 에러)</div><div data-m="scope"></div></div>
      <p class="section-desc">그래서 함수는 <b>안전</b>하다 — 함수 안에서 뭘 하든 지역변수라 <b>밖을 안 건드린다</b>. 이름이 겹쳐도 서로 다른 프레임이라 안 부딪힌다.</p>

      <span class="learn-tag">📎 <b>매개변수도 지역이다</b> — 매개변수(빈 자리)도 그 함수 안에서만 사는 지역변수, 밖에선 못 쓴다</span>
      <div data-m="qz-param"></div>
      <span class="learn-tag">📎 이름이 겹치면? 함수 안 매개변수가 바깥 같은 이름을 <b>가린다</b>(shadowing) — 안쪽이 우선</span>
      <div data-m="qz-shadow"></div>
      <div class="card" style="border-color:var(--red)">
        <div class="file-label">🐛 직접 체험 — 예측이 맞는지 실행해 보라. 그리고 고쳐 보라</div>
        <div data-m="param-crash"></div>
        <p class="section-desc" style="margin:8px 0 0">▶ 하면 <b>💥 ReferenceError: name is not defined</b> — 매개변수 <code>name</code>은 greet <b>안에서만</b> 산다. 고치기: 밖에서 쓰고 싶으면 함수가 <b>돌려주게</b> 하고(<code>return name</code>) 그 <b>반환값을 변수에 받아</b> 쓴다 — 주석의 ✅ 두 줄 주석을 풀고 마지막 줄은 지운 뒤 다시 ▶.</p>
      </div>

      <h3 class="section-title">② 눈으로 — 전역은 남고, 지역은 사라진다</h3>
      <span class="learn-tag">📎 ▶ — appName(전역)은 main에 남고, user·msg(지역)는 프레임과 함께 사라진다</span>
      <div data-m="mem"></div>

      ${nav('5-5', 6, '5-7', '5-7 · 화살표 & 요약 →')}
    `
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '함수 <b>안</b>에서 <code>let msg = ...</code>로 만든 변수를, 함수 <b>밖</b>에서 <code>print(msg)</code>하면?',
      options: ['msg 값이 나온다', 'undefined가 나온다', '에러 — 밖에선 msg가 안 보인다(지역)'],
      answer: 2,
      explain: '<b>지역변수</b>는 그 함수 <b>프레임 안에서만</b> 살고, 함수가 끝나면 <b>프레임과 함께 사라진다</b>(5-5). 밖에는 그런 이름이 아예 없어서 <b>에러</b>. 이게 스코프.',
    }))
    root.querySelector('[data-m="qz-param"]').append(Quiz({
      q: '<b>매개변수</b>도 지역일까? 함수 밖에서 <code>print(who)</code> 하면?<pre class="err-code" style="color:inherit;background:transparent">function greet(who) { return who }\ngreet("민지")\nprint(who)   // ← 함수 밖에서 who?</pre>',
      options: ['"민지"가 찍힌다', '에러 — who는 매개변수(지역)라 함수 밖엔 없다', 'undefined가 찍힌다'],
      answer: 1,
      explain: '<b>매개변수도 지역변수</b>다. <code>who</code>는 greet 안에서만 살고 함수가 끝나면 프레임과 함께 사라진다 → 함수 밖 <code>print(who)</code>은 <b>ReferenceError</b>. "매개변수는 빈 자리라 밖에서도 되겠지"가 착각 — 지역 <code>let</code>과 똑같다. (바로 아래에서 직접 돌려 본다.)',
    }))
    root.querySelector('[data-m="qz-shadow"]').append(Quiz({
      q: '바깥 <code>n = 9</code>, 매개변수도 <code>n</code>. <code>f(1)</code>은 무엇을 볼까?<pre class="err-code" style="color:inherit;background:transparent">let n = 9\nfunction f(n) { return n * 2 }   // 매개변수도 n\nprint(f(1))   // f(1)은?</pre>',
      options: ['18 — 바깥 n=9를 본다', '2 — 함수 안 매개변수 n(=1)이 바깥 n을 가린다', '에러 — 이름이 겹쳐서'],
      answer: 1,
      explain: '함수 안 <b>매개변수 n</b>이 바깥 <code>n=9</code>를 <b>가린다</b>(shadowing) — 안에선 매개변수 n(=1)만 보여 <code>1*2=2</code>. 이름이 같아도 <b>다른 프레임의 다른 셀</b>이라 안 부딪히고, 안쪽이 우선. 바깥 n은 그대로 9.',
    }))
    root.querySelector('[data-m="param-crash"]').append(Runner({ showBox: false, expectError: 'is not defined', code: [
      'function greet(who) {',
      '  return who + " 님 환영"',
      '}',
      'greet("민지")',
      '',
      'print(who)       // 💥 ReferenceError: who is not defined (who는 greet 지역)',
      '',
      '// ✅ 고치는 법 — 반환값을 밖에서 변수로 받아 쓴다',
      '// let msg = greet("민지")',
      '// print(msg)',
    ].join('\n') }))
    root.querySelector('[data-m="scope"]').append(Runner({ showBox: false, code: [
      'let appName = "메모장"              // 전역 — 어디서나 보인다',
      '',
      'function makeMsg(user) {',
      '  let msg = user + " 님, " + appName + "에 오신 걸 환영해요"  // msg = 지역',
      '  return msg',
      '}',
      '',
      'print(makeMsg("민지"))             // OK',
      '// 함수가 msg를 만들어 돌려준다',
      '// print(msg)   // ❌ 여기선 msg가 안 보인다(지역이라) — 주석 풀면 에러',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '전역(main)은 남고 · 지역(프레임)은 사라진다',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['let appName = "메모장"', 'function makeMsg(user) {', '  let msg = user + " 님"', '  return msg', '}', 'makeMsg("민지")'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }], heap: {}, note: 'appName은 함수 <b>밖</b> — <b>전역</b>. main 장부에 산다(어디서나 보임).', engine: '전역 <code>appName</code>은 최상위(main) 실행 컨텍스트의 슬롯. 문자열이라 값 본체는 힙에 있고 슬롯엔 <b>포인터</b>가 든다. 프로그램 내내 산다.' },
        { line: 5, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }], heap: {}, note: '<b>①인자 평가</b> — <code>makeMsg("민지")</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>"민지"</code>를 값으로 읽는다(식이면 계산). <b>아직 makeMsg 프레임 없다.</b>', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. appName(전역)은 상위 슬롯에 그대로.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }, { name: 'makeMsg', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — makeMsg의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 user 칸은 아직 비어 있다</b>(바인딩 전) — 지역 msg도 아직 없다.', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 배치는 스펙 비강제.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }, { name: 'makeMsg', slots: [{ name: 'user', ref: 'userMinji' }] }], heap: { userMinji: { label: '"민지"', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>"민지"</b>를 매개변수 user에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). user는 별개 슬롯.', engine: '인자 <b>값복사</b> — user 슬롯에 "민지"가 담긴다(문자열, 원시로 다루면 별개 셀 / 실제론 힙 문자열의 포인터 복사). 객체였다면 주소복사(공유).' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }, { name: 'makeMsg', slots: [{ name: 'user', ref: 'userMinji' }, { name: 'msg', ref: 'msgMinji' }] }], heap: { userMinji: { label: '"민지"', prim: true }, msgMinji: { label: '"민지 님"', prim: true } }, note: '<b>④본문 첫 줄</b> — <code>let msg = user + " 님"</code> 실행 → msg="민지 님". <b>user(인수)·msg(지역)는 이 프레임 안에만</b> 있다.', engine: 'user(인수 복사)·msg(지역)는 <b>이 프레임 슬롯에만</b> 산다. appName은 상위 프레임 슬롯이라 참조로 읽는다.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }, { name: 'makeMsg', slots: [{ name: 'user', ref: 'userMinji' }, { name: 'msg', ref: 'msgMinji' }] }], heap: { userMinji: { label: '"민지"', prim: true }, msgMinji: { label: '"민지 님"', prim: true } }, returning: { value: '"민지 님"', discarded: true }, note: '<b>⑤ 반환 — 값을 내보내지만 <u>아무도 안 받는다</u></b> — <code>return msg</code>가 msg 값 <b>"민지 님"</b>을 <b>프레임 밖 반환 통로로</b> 내보낸다. <b>return은 분명히 일어난다</b> — 그런데 호출부 <code>makeMsg("민지")</code>가 <b>아무 변수에도 안 담아</b> 그 반환값은 <b>그냥 버려진다</b>. (담으려면 <code>let x = makeMsg("민지")</code>.)', engine: '반환값(문자열 포인터)이 레지스터로 나가지만 호출부가 안 받아 곧 도달 불가(GC 대상)가 된다. 다음 순간 프레임 pop.' },
        { line: 5, stack: [{ name: 'main', slots: [{ name: 'appName', value: '"메모장"' }] }], heap: {}, note: '방금 return을 끝냈으니 makeMsg <b>pop</b> → user·msg <b>사라짐</b>(지역이라). appName(전역)은 <b>그대로</b>. 그래서 밖에서 msg는 <b>없다</b>.', engine: '<b>return</b> 뒤 makeMsg 프레임 <b>pop(즉시 회수)</b> → user·msg 슬롯은 사라진다. appName 슬롯은 main에 그대로. (지역이 함수 밖에도 살아남는 경우는 <b>클로저</b>로 힙 context에 승격될 때뿐 — 여긴 아님.)' },
      ],
    }))
    wireGoto(root)
  }

  // ── 5-7 · 화살표 & 요약 ─────────────────────────────────────
  window.Lessons['5-7'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('5-7 · 화살표 & 요약', '짧은 표기, 그리고 "언제 함수를 만드나"', '표기는 상황에 맞게, 감각이 핵심')}
      <p class="section-desc" style="margin:6px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/익명_함수" target="_blank" rel="noopener noreferrer">익명 함수 ↗</a> · <a href="https://ko.wikipedia.org/wiki/람다_대수" target="_blank" rel="noopener noreferrer">람다 ↗</a></p>
      <h3 class="section-title">① 화살표 함수 — 짧게 쓰는 표기</h3>
      <span class="learn-tag">📎 (n) => n * 2 는 function (n) { return n * 2 } 의 짧은 표기 (한 줄이면 return 생략)</span>
      <div class="card"><div class="file-label">🔬 같은 함수, 두 표기</div><div data-m="arrow"></div></div>
      <p class="section-desc"><b>왜 짧은 표기가 따로 있나? — 취향이 아니라 쓸모가 있다.</b> <b>작은 함수를 그 자리에 인자로 넘길 때</b>(콜백, 특히 <b>7강 map·filter</b>) 빛난다 — 특히 <b>여러 개를 이어 붙이면</b>(체이닝) 차이가 확 벌어진다:</p>
      <div class="falsy-grid" style="margin-top:8px">
        <div class="card" style="margin:0"><div class="file-label">😵 <code>function</code> — 껍데기가 겹겹이</div>
          <pre class="err-code" style="color:inherit;background:transparent">nums
  .filter(function (n) { return n > 0 })
  .map(function (n) { return n * 2 })</pre></div>
        <div class="card" style="margin:0"><div class="file-label">✅ 화살표 — 각 단계가 한 줄</div>
          <pre class="err-code" style="color:inherit;background:transparent">nums
  .filter(n => n > 0)
  .map(n => n * 2)
// "양수만 → 두 배" 가 줄줄이 읽힌다</pre></div>
      </div>
      <p class="section-desc" style="margin:6px 0 0;opacity:.75">(<code>filter</code>·<code>map</code>은 <b>7강</b>에서 제대로 배운다 — 여기선 화살표가 <b>왜</b> 좋은지만.)</p>
      <p class="section-desc" style="margin-top:10px">👉 <b>기준</b>: <b>작고 · 이름 없고 · 그 자리서 한 번 쓰는</b> 함수엔 <b>화살표</b>, <b>크거나 · 이름 붙여 여러 번 쓸</b> 함수엔 <code>function</code>(또는 <code>const 이름 = …</code>)이 낫다. 무작정 취향이 아니라 <b>상황에 맞춰</b> 고른다.
      <br><span style="opacity:.75">💡 심화(지금은 몰라도 됨): 화살표는 <code>this</code> 규칙도 달라서(자기 <code>this</code>가 없음) 그 때문에 쓰는 경우도 있다 — 나중에.</span></p>

      <span class="learn-tag">📎 <b>함수도 '값'이다</b> — 변수에 담고, 인자로 넘기고(콜백), 배열·객체에도 넣을 수 있다</span>
      <div data-m="qz-fnval"></div>

      <span class="learn-tag">📎 ▶ — 화살표 함수도 부르면 똑같이 프레임이 쌓인다(표기만 짧을 뿐)</span>
      <div data-m="mem"></div>

      <h3 class="section-title">⚠️ 함정 — 선언 방식에 따라 '선언 전 호출'이 되기도, 안 되기도</h3>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔮 먼저 예측 — 선언보다 <b>먼저</b> 불렀을 때 되는 건?</div>
        <div data-m="qz-hoist"></div>
      </div>
      <span class="learn-tag">📎 <code>function</code> 선언은 위로 끌어올려짐(호이스팅) → 선언 전 호출 OK · <code>const</code> 화살표는 안 됨(에러)</span>
      <div class="card"><div class="file-label">🔬 실행 — 같은 함수, 선언 방식만 다르게</div><div data-m="hoist"></div></div>
      <p class="section-desc">🔑 <code>function foo(){}</code>는 실행 전에 <b>선언이 통째로 위로</b> 올라간다(호이스팅) — 그래서 <b>선언보다 위에서 불러도</b> 된다. 하지만 <code>const foo = () => {}</code>는 <b>변수 대입</b>이라 그 줄에 닿기 전엔 <b>foo가 아직 없다</b>(TDZ) — 위에서 부르면 에러. <b>"함수는 아무 데서나 불러도 되겠지"가 애매한 착각</b>이다.</p>

      <h3 class="section-title">② 언제 함수를 만드나 — 감각</h3>
      <ul class="section-list">
        <li>같은 코드를 <b>두 번 이상</b> 쓰게 될 때 (5-1의 그 고통).</li>
        <li><b>이름 붙일 만한 의미 있는 작업</b>일 때 (<code>withTax</code>, <code>makeMsg</code>처럼).</li>
        <li>복잡한 한 줄을 <b>부품으로 쪼갤</b> 때 (3강 표현식 · 조립).</li>
      </ul>

      <h3 class="section-title">③ 좋은 상자의 감각 — '순수 함수'</h3>
      <span class="learn-tag">📎 순수 함수 = ① 입력만 보고(밖의 값 안 훔쳐봄) ② 값만 돌려줌(밖을 안 건드림 · 부수효과 없음)</span>
      <div data-m="qz-pure"></div>
      <div class="card"><div class="file-label">🔬 순수 vs 비순수 — 직접 실행해 차이를 본다</div><div data-m="pure"></div></div>
      <p class="section-desc">위 <code>withTax</code>는 <b>순수 함수</b>다 — 들어온 값(<code>p</code>)만 보고, 결과만 돌려주고, 밖의 무엇도 안 바꾼다. 그래서:</p>
      <ul class="section-list">
        <li><b>예측 가능</b> — 같은 입력이면 <b>언제 어디서 불러도 같은 출력</b>. <code>withTax(100)</code>은 늘 <code>110</code>. (정식 용어: <b>참조 투명성</b>)</li>
        <li><b>안전 · 조립 쉬움</b> — 밖을 안 건드리니 원본이 안 상하고(🧠 M5), 다른 계산의 <b>부품</b>으로 마음껏 끼운다(<code>Math.round(withTax(p))</code>).</li>
        <li><b>테스트 쉬움</b> — 입력만 넣어 보면 되니 검증이 간단.</li>
      </ul>
      <p class="section-desc" style="opacity:.85">↔ 반대로 <b>화면에 찍거나</b>(<code>print</code>), <b>전역을 바꾸거나</b>, <b>넘겨받은 객체를 수정하는</b>(🧠 M6) 함수는 <b>부수효과(side effect)</b>가 있어 <b>비순수</b>하다. 부수효과가 나쁜 건 아니다 — 출력·저장은 결국 필요하니까. 다만 <b>순수한 계산과 부수효과를 섞지 말고 나눠 두면</b> 예측·수정이 쉬워진다.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>함수 = 입력→처리→출력 상자</b>(반복 제거·이름·수정 한 곳·조립). <code>function 이름(매개변수){ return 값 }</code> 정의, <code>이름(인수)</code> 호출.
        <b>return은 돌려주기</b>(print는 찍기만), <b>지역변수는 프레임과 함께</b> 산다. 내부 원리는 🧠 메모리 챕터로.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>드릴</b>로 손에 붙이자 — 🟢쉬움 → 🟡보통 → 🔴어려움 (각 8문제, 🔨 만들기·선언 포함).</span>
        <button class="chip on" data-goto="5:easy">📝 5강 실습 시작 (🟢 쉬움) →</button>
      </div>
    `
    root.querySelector('[data-m="arrow"]').append(Runner({ showBox: false, code: [
      '// 두 표기는 완전히 같은 함수다',
      'function doubleA(n) { return n * 2 }   // 보통 표기',
      'const doubleB = (n) => n * 2           // 화살표(한 줄이면 return 생략)',
      '',
      'print(doubleA(10))   // 20',
      'print(doubleB(10))   // 20',
      '// 똑같다',
    ].join('\n') }))
    root.querySelector('[data-m="qz-fnval"]').append(Quiz({
      q: '함수를 <b>( ) 없이 변수에 담아</b> 부를 수 있을까?<pre class="err-code" style="color:inherit;background:transparent">function greet() { return "안녕" }\nlet f = greet     // ( ) 없이 — 함수 자체를 담기\nprint(f())        // f() 는?</pre>',
      options: ['"안녕" — 함수도 값이라 변수에 담아 f()로 부른다', '에러 — 함수는 변수에 못 담는다', 'undefined'],
      answer: 0,
      explain: '<b>함수도 값</b>이다 — <code>let f = greet</code>(( ) 없이)는 함수 <b>자체</b>를 f에 담는다. 그럼 <code>f()</code>로 부를 수 있다 → "안녕". 이렇게 함수를 <b>인자로 넘기면 콜백</b>(map·filter), 배열·객체 속성에도 담는다(메서드). "함수는 특별해서 값처럼 못 다룬다"가 착각.',
    }))
    root.querySelector('[data-m="qz-hoist"]').append(Quiz({
      q: '<b>선언보다 먼저</b> 호출한다. 어느 게 정상 실행될까?<pre class="err-code" style="color:inherit;background:transparent">say()                        // A\nfunction say() { return "hi" }\n\ngo()                          // B\nconst go = () => "go"</pre>',
      options: ['A만 된다 (function 선언은 끌어올려짐)', 'B만 된다', '둘 다 된다', '둘 다 에러난다'],
      answer: 0,
      explain: '<b>A만</b> 된다. <code>function say(){}</code>는 <b>선언이 통째로 위로 올라가(호이스팅)</b> 선언 전 호출도 OK. 반면 <code>const go = …</code>는 <b>변수 대입</b>이라 그 줄 전엔 go가 아직 없어(TDZ) <b>B는 ReferenceError</b>. 선언 방식이 "언제부터 부를 수 있나"를 가른다.',
    }))
    root.querySelector('[data-m="hoist"]').append(Runner({ showBox: false, code: [
      '// function 선언 — 선언보다 위에서 불러도 된다(호이스팅)',
      'print(say())         // "hi"  (선언은 아래인데 됨!)',
      'function say() { return "hi" }',
      '',
      '// const 화살표 — 선언 전엔 못 부른다(아래 주석 풀면 에러)',
      '// print(go())       // ❌ ReferenceError: go 아직 없음',
      'const go = () => "go"',
      'print(go())          // "go"  (선언 뒤엔 OK)',
    ].join('\n') }))
    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '화살표 함수도 똑같이 — push→본문→반환(⑤)→대입(⑥)',
      stackLabel: '📚 스택 (이름표 장부)',
      code: ['const doubleB = (n) => n * 2', 'let x = doubleB(10)'],
      steps: [
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'x', value: '(대기)', bad: true }] }], heap: {}, note: '<b>①인자 평가</b> — <code>doubleB(10)</code>는 <b>본문으로 바로 안 뛴다</b>. 먼저 괄호 안 <code>10</code>을 값으로 읽는다(식이면 계산). <b>아직 doubleB 프레임 없다.</b>', engine: '인자는 <b>호출자(main) 쪽</b>에서 먼저 평가돼 <b>레지스터·스택</b>으로 전달 준비된다. 화살표 함수도 <b>함수 객체</b>(힙)이고 const 슬롯이 그걸 가리킨다. 인수 10은 <b>SMI</b>.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'x', value: '(대기)', bad: true }] }, { name: 'doubleB', slots: [] }], heap: {}, note: '<b>②프레임 push</b> — 화살표 함수도 부르면 <b>똑같이</b> doubleB의 <b>실행 컨텍스트</b>가 스택에 쌓인다. <b>매개변수 n 칸은 아직 비어 있다</b>(바인딩 전).', engine: '새 <b>스택 프레임(실행 컨텍스트)</b> 생성. 이때 <b>스코프·호이스팅</b>(var·함수선언 등록, let/const는 TDZ)과 <b>this·arguments</b>도 준비된다 — 컴파일 때 만든 스코프 정보로. 화살표도 실행 컨텍스트는 보통 함수와 동일하다. 배치는 스펙 비강제.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'x', value: '(대기)', bad: true }] }, { name: 'doubleB', slots: [{ name: 'n', ref: 'n10' }] }], heap: { n10: { label: '10', prim: true } }, note: '<b>③매개변수 바인딩(복사)</b> — 인수 <b>10</b>을 매개변수 n에 <b>복사</b>(원시=값복사·별개 셀 / 객체=주소복사·공유). n은 별개 슬롯.', engine: '인자 <b>값복사</b> — n 슬롯에 10 비트 복사(<b>SMI</b> 인라인, 별개 슬롯). 객체였다면 주소(포인터) 복사(공유).' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'x', value: '(대기)', bad: true }] }, { name: 'doubleB', slots: [{ name: 'n', ref: 'n10' }] }], heap: { n10: { label: '10', prim: true } }, note: '<b>④본문</b> — <code>n*2=20</code>을 (암묵적으로) 만든다. 표기만 짧을 뿐 동작은 같다.', engine: '화살표는 본문이 식 하나면 <b>암묵적 return</b>. 실행 컨텍스트는 보통 함수와 동일하다.' },
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'x', value: '(대기)', bad: true }] }], heap: {}, returning: { value: '20' }, note: '<b>⑤ 반환·pop</b> — <code>n*2=20</code>을 (암묵적으로) <b>프레임 밖 반환 통로로</b> 내보내고 doubleB를 <b>즉시 끝낸다</b>(pop, 지역 n 사라짐). 20은 <b>통로에서 호출한 자리로</b> 가는 중 — x는 <b>아직 대기</b>. 화살표도 <b>보통 함수와 완전히 같다</b>.', engine: '<b>암묵적 return</b>(n*2=20) → 값이 <b>레지스터</b>로 넘어가고 doubleB 프레임은 <b>pop(즉시 회수)</b> — n 슬롯 소멸. 대입은 아직 — 호출자가 받아야 한다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'x', value: '20' }] }], heap: {}, note: '<b>⑥ 호출부 대입</b> — 호출한 자리 <code>let x = …</code>가 반환값 <b>20</b>을 받아 <b>x에 담는다</b> ✔. <b>반환(⑤)과 대입(⑥)은 별개의 두 단계</b>.', engine: '레지스터의 반환값 20이 x 슬롯에 안착(SMI). 프레임은 이미 없다.' },
      ],
    }))
    root.querySelector('[data-m="qz-pure"]').append(Quiz({
      q: '넷 중 <b>순수 함수</b>는? (입력만 보고 · 값만 돌려주고 · 밖을 안 건드림)',
      options: ['<code>function f(a, b) { return a + b }</code>', '<code>function f(x) { print(x); return x }</code> (화면에 찍음)', '<code>let n = 0; function f() { n++; return n }</code> (전역 바꿈)', '<code>function f(o) { o.x = 9; return o }</code> (넘겨받은 객체 수정)'],
      answer: 0,
      explain: '<b>①만 순수</b> — 입력 a·b만 보고 결과만 돌려주며 밖을 안 건드린다. ②는 <code>print</code>(화면 부수효과), ③은 전역 n 변경, ④는 넘겨받은 객체 변경 → 모두 <b>부수효과 있는 비순수</b>. 순수는 <b>같은 입력이면 항상 같은 출력</b>(참조 투명성).',
    }))
    root.querySelector('[data-m="pure"]').append(Runner({ showBox: false, code: [
      '// ✅ 순수 — 입력만 보고, 값만 돌려줌 (밖을 안 건드림)',
      'function withTax(p) { return p * 1.1 }',
      'print(withTax(100))   // 110  (언제 불러도 같음 = 참조 투명성)',
      'print(withTax(100))   // 110',
      '',
      '// ❌ 비순수 — 전역을 바꾼다 (부수효과)',
      'let total = 0',
      'function addToTotal(p) { total = total + p }',
      'addToTotal(100)',
      'print(total)          // 100  (부를 때마다 밖이 달라짐)',
      '',
      '// ❌ 비순수 — 넘겨받은 객체를 수정한다 (🧠 M6)',
      'function discount(obj) { obj.price = obj.price - 10 }',
      'let item = { price: 100 }',
      'discount(item)',
      'print(item.price)     // 90  (원본이 바뀜)',
    ].join('\n') }))
    wireGoto(root)
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
