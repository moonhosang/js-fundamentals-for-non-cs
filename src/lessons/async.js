// ⏳ 비동기 — 나중에 오는 값 (setTimeout · Promise · async/await)
// 콜스택(5강·메모리 심화) 위에 얹는 '시간' 축. 별도 notional machine = 이벤트 루프.
//
// 오해: setTimeout(fn, 0)이면 fn이 '지금 바로' 실행된다 · await는 프로그램 전체를 멈춘다
// 왜:   비동기 콜백은 '대기 큐'에서 기다리다 콜스택이 텅 빈 뒤에야 실행(이벤트 루프) · await는 그 async 함수만 양보
// 대비: 동기=한 줄씩 즉시(콜스택) vs 비동기=나중에(큐→루프) · 그래서 순서가 코드 순서와 다르다
//
// ⚠️ 드릴 노트: 비동기는 '값 하나 예측(POE)'보다 '실행 순서 예측'이 핵심이라, 동기 전용
//   Drill(빈칸=값) 포맷과 안 맞는다(await은 sync new Function 본문서 불가). → 순서 예측은
//   인라인 Quiz로, 실제 순서는 Runner(비동기 출력 지원)로 눈으로 확인. 값-드릴은 의도적 생략.

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + t) }
    })
  }

  window.Lessons['async'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">⏳ 시간</span>
        <h2>비동기 — 나중에 오는 값</h2>
        <p>서버 응답·타이머·파일 읽기는 <b>지금 당장 값이 안 온다</b> — "준비되면 이 콜백을 불러줘"라고 맡기고 <b>다음 줄로 넘어간다</b>.
        그 맡긴 일이 언제·어떤 순서로 도는지가 <b>이벤트 루프</b>다. 코드 순서 ≠ 실행 순서라 헷갈리는 그 지점.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p><b>동기 코드는 콜스택에서 한 줄씩 즉시</b> 실행된다. <b>비동기 콜백</b>(setTimeout·Promise)은 <b>대기 큐</b>에 들어가 <b>콜스택이 텅 빈 뒤</b>에야 꺼내져 실행된다(이벤트 루프).
        그래서 <code>setTimeout(fn, 0)</code>도 "지금"이 아니라 <b>"동기 코드 다 끝난 다음"</b>이다. <code>await</code>는 <b>그 async 함수만</b> 잠시 멈추고 나머지 프로그램엔 제어를 <b>양보</b>한다.</p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "<code>setTimeout(fn, 0)</code>이면 fn이 지금 바로 돈다"</div>
        <p class="section-desc" style="margin:0"><b>아니다.</b> 0ms는 "0ms 뒤 <b>대기 큐에 넣어라</b>"일 뿐 — 실제 실행은 <b>지금 돌고 있는 동기 코드가 전부 끝나고 콜스택이 빈 다음</b>이다. 그래서 <code>print("A"); setTimeout(()=>print("B"),0); print("C")</code>는 <b>A · C · B</b> 순으로 찍힌다(B가 꼴찌). "0인데 왜 마지막?"이 최대 함정.</p>
      </div>

      <h3 class="section-title">① 동기 vs 비동기 순서 — 직접 보라 (진짜 순서로 찍힌다)</h3>
      <span class="learn-tag">📎 ▶ 실행 → A·C가 먼저, B는 <b>맨 나중</b>. setTimeout은 '지금'이 아니라 '나중'이다</span>
      <div class="card"><div class="file-label">🔬 순서를 예측하고 ▶ (B는 언제?)</div><div data-m="order"></div></div>
      <div data-m="qz-order"></div>

      <h3 class="section-title">② 눈으로 — 이벤트 루프 (콜스택 비면 큐에서 꺼낸다)</h3>
      <span class="learn-tag">📎 ▶ — setTimeout 콜백은 '대기 큐'로 → 동기 코드(콜스택)가 다 끝난 뒤 루프가 꺼내 실행</span>
      <div data-m="mem"></div>

      <h3 class="section-title">③ Promise — "나중에 올 값"의 그릇 · <code>.then</code></h3>
      <span class="learn-tag">📎 Promise = 아직 없는 값의 약속. .then(콜백)으로 "값 오면 이거 해줘"를 건다(콜백 지옥의 대안)</span>
      <div class="card"><div class="file-label">🔬 Promise · then (직접 실행)</div><div data-m="promise"></div></div>
      <span class="learn-tag">📎 ▶ 다음 단계 — <code>.then</code> 콜백은 <b>대기 큐로</b> 예약되고, <b>동기 코드가 먼저</b> 실행된 뒤에야 큐에서 꺼내진다</span>
      <div data-m="promise-elv"></div>

      <h3 class="section-title">④ <code>async / await</code> — 비동기를 동기처럼 읽기</h3>
      <span class="learn-tag">📎 await = "이 값 올 때까지 이 함수만 기다림" — .then 사슬을 위→아래 평범한 코드처럼. 에러는 try/catch로</span>
      <div class="card"><div class="file-label">🔬 async 함수 안에서 await (직접 실행)</div><div data-m="await"></div></div>
      <span class="learn-tag">📎 ▶ 다음 단계 — <code>await</code>마다 함수가 <b>멈추고(양보) → 밖이 먼저 → 멈춘 자리부터 재개</b>. 두 번의 await를 각각 눈으로</span>
      <div data-m="await-elv"></div>
      <span class="learn-tag">📎 ⚖️ 대비 — 위(그냥 <code>run()</code>)와 아래(<code>await run()</code>)의 <b>유일한 차이는 <code>await</code> 한 단어</b>. 붙이면 <b>부른 쪽이 기다린다</b></span>
      <div class="card"><div class="file-label">🔬 <code>await run()</code> — 부른 쪽(main)이 run()을 기다린다 (직접 실행)</div><div data-m="await-vs"></div></div>
      <span class="learn-tag">📎 ▶ 다음 단계 — 같은 걸 애니로: <code>await run()</code>이라 main이 run()을 <b>끝까지 기다렸다가</b> 재개(main·run 둘 다 멈췄다 순서대로 재개)</span>
      <div data-m="await-vs-elv"></div>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚖️ 이 둘의 차이 = <code>await</code> 하나</div>
        <p class="section-desc" style="margin:0">같은 <code>run()</code>인데 <b>부른 쪽에 <code>await</code>를 붙였냐</b>로 흐름이 정반대다:
        <br>• <code>run()</code> <b>(위 애니 · await 없음)</b> → 부른 쪽이 <b>안 기다리고</b> 다음 줄로 → <b>"run()은 기다리지 않고 넘어감"이 먼저</b> 찍힘.
        <br>• <code>await run()</code> <b>(이 예시 · await 있음)</b> → 부른 쪽이 <b>run()이 끝날 때까지 기다렸다가</b> 다음 줄 → <b>"...끝난 뒤에야"가 나중</b>.
        <br><b>즉 <code>await</code>는 "부른 쪽을 기다리게 하느냐"를 정한다.</b> 코드는 한 글자 차이, 실행 흐름은 반대. (단, <code>await</code>는 <code>async</code> 함수 안에서만 쓸 수 있어 <code>main</code>도 async로 감쌌다.)</p>
      </div>
      <span class="learn-tag">📎 🔻 다음 — 왼쪽 <code>async/await</code>와 오른쪽 <code>.then</code>은 <b>완전히 같은 동작</b>. <code>await</code>=<code>.then</code>, <code>try/catch</code>=<code>.catch</code>를 한 겹씩</span>
      <p class="section-desc" style="margin-top:0"><code>getUser()</code>는 <b>서버에서 사용자를 받아오는 함수</b>(Promise를 돌려줌)라고 보면 된다.</p>
      <div data-m="await-desugar"></div>
      <span class="learn-tag">📎 🔻 한 번 더 — <b>await 두 개</b>를 <b>try/catch 하나</b>로 감싸면? <code>await</code>당 <code>.then</code> 한 겹(→ 중첩), 그리고 <code>.catch</code> <b>하나</b>가 <b>둘 다</b> 받아낸다</span>
      <div data-m="await-desugar2"></div>
      <span class="learn-tag">📎 🔻 마지막 — <b>각 <code>await</code>마다 <code>try/catch</code></b>를 따로 두면? 사슬이 <b>평평</b>해지고 <code>.catch</code>가 <b>단계마다</b> — 하나 실패해도 <b>잡고 계속</b>(Ex2의 fail-fast와 대비)</span>
      <div data-m="await-desugar3"></div>
      <div style="border:2px solid #7c3aed;border-left-width:6px;border-radius:10px;padding:12px 14px;background:rgba(124,58,237,.06);margin:14px 0">
        <div style="font-weight:800;color:#7c3aed;margin-bottom:6px">🔑 결론 — <code>async/await</code>는 새 문법이 아니라 <u>Promise의 껍데기</u></div>
        <div class="section-desc" style="margin:0">
          위 세 애니 <b>오른쪽 열("엔진이 보는 실체")이 진짜 모습</b>이다. 우리가 쓰는 왼쪽은 그걸 <b>위→아래로 읽는 편의</b>일 뿐 —
          <br>• <code>await</code> 벗기면 → <code>.then</code> &nbsp;·&nbsp; <code>try/catch</code> 벗기면 → <code>.catch</code>
          <br>• <b><code>async</code> 함수는 <u>언제나 <code>Promise</code>를 돌려준다</u></b> — <code>return 3</code>도 <code>Promise</code>로 감싸지고, 던진 에러는 <b>rejected <code>Promise</code></b>가 된다.
          <br><span style="color:#6b7280">⚠️ 단, <b>"모든 비동기 = Promise"는 아니다</b> — <code>setTimeout</code>·이벤트·옛 콜백은 <code>Promise</code> 없이도 비동기. <code>Promise</code>는 그 <b>'나중 값'을 담는 표준 그릇</b>이고, <code>async/await</code>는 그 <code>Promise</code> <b>위에</b> 얹은 문법이다(<code>async/await → Promise → 마이크로태스크 → 이벤트 루프</code>).</span>
        </div>
      </div>
      <div data-m="qz-await"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>비동기 = 나중에 오는 값.</b> 콜백/Promise는 <b>대기 큐</b>에서 기다리다 <b>콜스택이 빈 뒤</b> 실행(이벤트 루프) — 그래서 코드 순서 ≠ 실행 순서.
        <code>Promise</code>는 나중 값의 그릇, <code>.then</code>으로 이어 붙이고, <code>async/await</code>로 <b>동기처럼 위→아래</b> 읽는다(에러는 <code>try/catch</code>). <code>setTimeout(_,0)</code>도 "지금"이 아니라 "다음 차례".</p>
      </div>

      <div class="card" style="opacity:.9">
        <div class="file-label">🧭 이 강의는 '순서 예측' 중심 (값-드릴 없음) · 다음은 심화 3강</div>
        <p class="section-desc" style="margin:0">비동기는 "값 하나 맞히기"보다 <b>"어떤 순서로 도나"</b>가 핵심이라, 위 <b>예측 Quiz + 실행 Runner</b>로 익힌다. 여기서 <b>"대기 큐"로 뭉뚱그린 것</b>·<code>await</code>·에러는 전용 애니메이션으로 더 깊이 파는 심화 3강이 이어진다 —
        <button class="inline-goto" data-goto="microtask">마이크로 vs 매크로 큐</button> · <button class="inline-goto" data-goto="promiseall">Promise.all·race</button> · <button class="inline-goto" data-goto="asyncerr">비동기 에러 전파</button>.</p>
      </div>

      <div class="practice-cta"><span>왜 순서가 또 뒤집히나 —</span><button class="chip on" data-goto="microtask">⏳ 마이크로 vs 매크로 큐 →</button></div>
    `

    root.querySelector('[data-m="order"]').append(Runner({ showBox: false, code: [
      'print("A")                       // 동기 — 지금',
      'setTimeout(() => print("B"), 0)  // 비동기 — 대기 큐로 (0이어도!)',
      'print("C")                       // 동기 — 지금',
      '',
      '// 예측: 어떤 순서로 찍힐까? ▶ 눌러 확인',
      '// (A → C → B — B는 동기 코드가 다 끝난 뒤 맨 나중)',
    ].join('\n') }))

    root.querySelector('[data-m="qz-order"]').append(Quiz({
      q: '아래는 어떤 순서로 찍히나?<pre class="err-code" style="color:inherit;background:transparent">print("1")\nsetTimeout(() => print("2"), 0)\nprint("3")</pre>',
      options: ['1 · 3 · 2 — setTimeout은 0이어도 동기 코드가 다 끝난 뒤', '1 · 2 · 3 — 코드 적힌 순서대로', '2 · 1 · 3 — setTimeout이 0이라 먼저'],
      answer: 0,
      explain: '<code>setTimeout</code>은 콜백을 <b>대기 큐</b>에 넣을 뿐, 지금 <b>콜스택의 동기 코드(1·3)가 전부 끝난 뒤</b> 이벤트 루프가 큐에서 꺼내 실행한다 → <b>1 · 3 · 2</b>. 0ms는 "지금"이 아니라 "가능한 한 빨리 = 동기 다음 차례".',
    }))

    root.querySelector('[data-m="mem"]').append(EventLoopViz({
      title: '이벤트 루프 — 콜스택이 비어야 대기 큐에서 꺼낸다',
      singleQueue: true, showLoop: true, // intro라 큐를 '하나'로(마이크로/매크로 구분은 다음 강의)
      code: [
        'print("A")                       // 동기 — 지금',
        'setTimeout(() => print("B"), 0)  // 이 콜백을 대기 큐로',
        'print("C")                       // 동기 — 지금',
        '// 동기 끝·콜스택 빔 → 대기 큐에서 꺼내 실행',
      ],
      steps: [
        { line: 0, phase: 'sync', stack: ['main'], macro: [], out: ['A'], note: '<code>print("A")</code> — 동기라 <b>콜스택(main)에서 지금</b> 실행 → 출력 <b>A</b>. 대기 큐는 비어 있다.' },
        { line: 1, phase: 'sync', stack: ['main'], macro: ['() => print("B")'], out: ['A'], note: '<code>setTimeout(() => print("B"), 0)</code> — 그 <b>콜백을 지금 실행하지 않고 대기 큐에 넣는다</b>. main은 <b>안 멈추고 다음 줄로</b>.' },
        { line: 2, phase: 'sync', stack: ['main'], macro: ['() => print("B")'], out: ['A', 'C'], note: '<code>print("C")</code> — 여전히 동기 코드가 콜스택에서 실행 중 → 출력 <b>C</b>. 콜백은 큐에서 <b>계속 대기</b>(콜스택이 안 비었으니 못 꺼냄).' },
        { line: 3, phase: 'idle', stack: [], macro: ['() => print("B")'], out: ['A', 'C'], note: '동기 코드가 다 끝나 <b>콜스택이 텅 빔</b> → 이제 <b>이벤트 루프</b>가 "대기 큐에 콜백이 있나?" 확인한다.' },
        { line: 3, phase: 'run', stack: [{ label: '콜백', from: 'macro' }], macro: [], out: ['A', 'C', 'B'], note: '루프가 큐에서 <b>콜백을 꺼내 콜스택에 올려 실행</b>(왼쪽으로 날아가 착지) → 이제야 출력 <b>B</b>. <b>그래서 B가 꼴찌</b> — 순서 = A · C · B.' },
        { line: 3, phase: 'idle', stack: [], macro: [], out: ['A', 'C', 'B'], note: '대기 큐도 콜스택도 비었다 — 끝. <b>핵심: setTimeout은 "지금"이 아니라 "동기 다 끝난 뒤 대기 큐에서".</b>' },
      ],
    }))

    root.querySelector('[data-m="promise"]').append(Runner({ showBox: false, code: [
      '// Promise = "나중에 올 값"의 그릇',
      'let p = Promise.resolve(10)   // 이미 10으로 준비된 약속',
      'print(p instanceof Promise)   // true — 값이 아니라 "약속" 객체',
      '',
      'p.then((value) => {',
      '  print("값 도착: " + value)  // "값 도착: 10" (나중에)',
      '})',
      'print("먼저 찍힘")            // 이게 then보다 먼저 (then은 큐로)',
    ].join('\n') }))

    root.querySelector('[data-m="promise-elv"]').append(EventLoopViz({
      title: 'then 콜백은 대기 큐로 — 동기가 먼저',
      singleQueue: true, showLoop: true,
      code: [
        'let p = Promise.resolve(10)                     // 이미 10으로 준비된 약속',
        'p.then((value) => print("값 도착: " + value))   // 콜백을 대기 큐로',
        'print("먼저 찍힘")                              // 동기',
        '// 콜스택 빔 → 대기 큐에서 then 콜백 실행',
      ],
      steps: [
        { line: 0, phase: 'sync', stack: ['main'], macro: [], out: [], note: '<code>p = Promise.resolve(10)</code> — p는 값이 아니라 <b>"10을 줄" 약속(Promise 객체)</b>. 이미 준비됐다.' },
        { line: 1, phase: 'sync', stack: ['main'], macro: ['(value) => print("값 도착")'], out: [], note: '<code>.then(콜백)</code> — "값 오면 실행할" 콜백을 <b>대기 큐에 예약</b>한다. p가 <b>이미 준비됐어도 지금 실행하지 않는다</b>.' },
        { line: 2, phase: 'sync', stack: ['main'], macro: ['(value) => print("값 도착")'], out: ['먼저 찍힘'], note: '동기 <code>print("먼저 찍힘")</code>이 <b>먼저</b> 실행 → 출력. then 콜백은 큐에서 대기.' },
        { line: 3, phase: 'idle', stack: [], macro: ['(value) => print("값 도착")'], out: ['먼저 찍힘'], note: '동기 끝 → <b>콜스택 빔</b> → 이제 대기 큐에서 then 콜백을 꺼낼 차례.' },
        { line: 3, phase: 'run', stack: [{ label: 'then 콜백', from: 'macro' }], macro: [], out: ['먼저 찍힘', '값 도착: 10'], note: 'then 콜백을 콜스택에 올려 실행 → "값 도착: 10". <b>그래서 then은 동기보다 늦다</b> — 값이 이미 있어도 큐를 거친다.' },
      ],
    }))

    root.querySelector('[data-m="await"]').append(Runner({ showBox: false, code: [
      'function wait(v) { return Promise.resolve(v) }',
      '',
      '// async 함수 안에서 await — .then 없이 위→아래로 읽는다',
      'async function run() {',
      '  print("시작")',
      '  let a = await wait(1)   // 값 올 때까지 이 함수만 기다림',
      '  let b = await wait(2)',
      '  print("합계: " + (a + b))   // "합계: 3"',
      '}',
      'run()   // ⚠️ await 없음! run을 안 기다리고 다음 줄로 (밑의 await run()과 대비)',
      'print("run()은 기다리지 않고 넘어감")   // await는 run만 멈춤',
    ].join('\n') }))

    root.querySelector('[data-m="await-elv"]').append(EventLoopViz({
      title: 'await마다 멈춤(양보) → 밖이 먼저 → 멈춘 자리부터 재개',
      singleQueue: true, showLoop: true, queueLabel: '⏳ 대기 큐 <small style="font-weight:500">(멈춘 함수의 "이어서"가 기다림)</small>',
      code: [
        'function wait(v) { return Promise.resolve(v) }   // v로 이미 준비된 약속을 돌려줌',
        'async function run() {',
        '  print("시작")',
        '  let a = await wait(1)   // ① 여기서 멈춤(양보)',
        '  let b = await wait(2)   // ② 또 멈춤(양보)',
        '  print("합계: " + (a + b))',
        '}',
        'run()   // ⚠️ await 없음! (밑의 await run()과 대비)',
        'print("run()은 기다리지 않고 넘어감")',
      ],
      steps: [
        { line: 7, phase: 'sync', stack: ['main', 'run()'], macro: [], out: [], note: '<code>run()</code> 호출 → run 프레임이 콜스택에 올라간다(main 위). (<code>wait</code>은 값을 즉시 주는 약속 함수 — 맨 윗줄에 정의.)' },
        { line: 2, phase: 'sync', stack: ['main', 'run()'], macro: [], out: ['시작'], note: 'run() 본문 시작 → <code>print("시작")</code> 동기 실행 → 출력 <b>시작</b>.' },
        { line: 3, phase: 'idle', stack: ['main'], macro: ['run() 이어서 · a=1 받고 계속'], out: ['시작'], note: '<b>① <code>await wait(1)</code> 만남.</b> 먼저 <code>wait(1)</code>이 <b>즉시 "1을 줄 약속"을 돌려주고 끝난다</b>(wait는 큐에 안 감!). 그다음 <code>await</code>가 그 약속을 기다리며 <b>run()을 멈춘다</b>(프레임 내려감=양보) → <b>run()의 나머지</b>(await 뒤)를 대기 큐에 예약. <b>그래서 큐 칩이 "wait"가 아니라 "run() 이어서"</b> — 멈추는 건 await를 쓴 함수(run)다.' },
        { line: 8, phase: 'sync', stack: ['main'], macro: ['run() 이어서 · a=1 받고 계속'], out: ['시작', 'run()은 기다리지 않고 넘어감'], note: '제어가 밖(main)으로 돌아와 <b>밖의 동기 코드가 먼저</b> 실행 → 출력. <b>run()은 안 기다린다</b> — 멈춘 채 큐에서 대기.' },
        { line: 8, phase: 'idle', stack: [], macro: ['run() 이어서 · a=1 받고 계속'], out: ['시작', 'run()은 기다리지 않고 넘어감'], note: 'main도 끝 → <b>콜스택 빔</b> → 대기 큐에서 run()의 "이어서"를 꺼낼 차례.' },
        { line: 4, phase: 'run', stack: [{ label: 'run() 재개', from: 'macro' }], macro: [], out: ['시작', 'run()은 기다리지 않고 넘어감'], note: 'run()이 <b>멈춘 자리부터 재개</b> → <code>a</code>에 1 확정. 곧 <b>② <code>await wait(2)</code></b>를 만난다.' },
        { line: 4, phase: 'idle', stack: [], macro: ['run() 이어서 · b=2 받고 계속'], out: ['시작', 'run()은 기다리지 않고 넘어감'], note: '<b>② <code>await wait(2)</code></b>도 똑같다: <code>wait(2)</code>는 "2를 줄 약속"만 주고 <b>끝</b>(큐에 안 감), <code>await</code>가 <b>run()을</b> 또 멈춰 <b>run()의 나머지</b>를 대기 큐로. <b>멈추고 재개되는 건 언제나 await를 쓴 함수(run)</b>지 wait가 아니다. (await 하나당 한 번씩 반복)' },
        { line: 5, phase: 'run', stack: [{ label: 'run() 재개', from: 'macro' }], macro: [], out: ['시작', 'run()은 기다리지 않고 넘어감', '합계: 3'], note: '다시 재개 → <code>b</code>에 2 확정 → <code>a+b=3</code> → 출력 <b>합계: 3</b>.' },
        { line: 6, phase: 'idle', stack: [], macro: [], out: ['시작', 'run()은 기다리지 않고 넘어감', '합계: 3'], note: '끝. <b>핵심: <code>await</code>마다 함수가 멈추고(양보) → 밖이 먼저 돌고 → 멈춘 자리부터 재개.</b> 그래서 "run()은 안 기다리고" 밖이 먼저 찍혔다.' },
      ],
    }))

    root.querySelector('[data-m="await-vs"]').append(Runner({ showBox: false, code: [
      'function wait(v) { return Promise.resolve(v) }',
      'async function run() {',
      '  print("run: 시작")',
      '  await wait(1)',
      '  print("run: 끝")',
      '}',
      '',
      'async function main() {',
      '  await run()          // ← run() 앞에 await! run()이 다 끝날 때까지 기다림',
      '  print("main: run() 끝난 뒤에야 이 줄")   // run이 끝나야 이 줄',
      '}',
      'main()',
      '// 순서: "run: 시작" → "run: 끝" → "main: ... 끝난 뒤에야" (기다렸다 실행)',
      '// (await 없이 run()만 했다면 "main: ..."이 run 끝나기 전에 먼저 나왔다)',
    ].join('\n') }))

    root.querySelector('[data-m="await-vs-elv"]').append(EventLoopViz({
      title: 'await run() — main이 run() 끝까지 기다렸다가 재개',
      singleQueue: true, showLoop: true, queueLabel: '⏳ 대기 큐 <small style="font-weight:500">(멈춘 함수의 "이어서"가 기다림)</small>',
      code: [
        'function wait(v) { return Promise.resolve(v) }',
        'async function run() {',
        '  print("run: 시작")',
        '  await wait(1)',
        '  print("run: 끝")',
        '}',
        'async function main() {',
        '  await run()   // run()이 끝날 때까지 기다림',
        '  print("main: run() 끝난 뒤에야")',
        '}',
        'main()',
      ],
      steps: [
        { line: 10, phase: 'sync', stack: ['main()'], macro: [], out: [], note: '<code>main()</code> 호출 → main 프레임이 콜스택에 올라간다.' },
        { line: 7, phase: 'sync', stack: ['main()', 'run()'], macro: [], out: [], note: 'main이 <code>await run()</code> 만남 → 먼저 <b>run()을 호출</b>(run 프레임 push, main 위). run 본문이 돌기 시작.' },
        { line: 2, phase: 'sync', stack: ['main()', 'run()'], macro: [], out: ['run: 시작'], note: 'run() 실행 → <code>print("run: 시작")</code> 동기 출력.' },
        { line: 3, phase: 'idle', stack: [], macro: ['run() 이어서 · "run: 끝"부터'], out: ['run: 시작'], note: 'run이 <code>await wait(1)</code>에서 <b>멈춤</b>(run 프레임 내려감). 게다가 main도 <b>run()을 await 중</b>이라 <b>같이 멈춘다</b>(main 프레임도 내려감) → <b>둘 다 멈춰 콜스택이 빈다.</b> run의 나머지를 대기 큐로.' },
        { line: 4, phase: 'run', stack: [{ label: 'run() 재개', from: 'macro' }], macro: [], out: ['run: 시작', 'run: 끝'], note: '콜스택이 비었으니 루프가 run의 "이어서"를 꺼내 <b>재개</b> → <code>print("run: 끝")</code> 출력. 이로써 <b>run()이 끝나고 그 약속이 풀린다</b>.' },
        { line: 8, phase: 'idle', stack: [], macro: ['main() 이어서 · run 끝난 뒤부터'], out: ['run: 시작', 'run: 끝'], note: 'run이 끝나 약속이 풀리자 → <b>run을 기다리던 main의 "이어서"가 이제 대기 큐로</b>. (main이 여태 멈춰 있던 이유 = run이 끝나길 기다린 것.)' },
        { line: 8, phase: 'run', stack: [{ label: 'main() 재개', from: 'macro' }], macro: [], out: ['run: 시작', 'run: 끝', 'main: run() 끝난 뒤에야'], note: '루프가 main의 "이어서"를 <b>재개</b> → <code>print("main: run() 끝난 뒤에야")</code> 출력. <b>main이 run()을 끝까지 기다렸다가</b> 이 줄을 실행했다.' },
        { line: 8, phase: 'idle', stack: [], macro: [], out: ['run: 시작', 'run: 끝', 'main: run() 끝난 뒤에야'], note: '끝. <b>핵심: <code>await run()</code>이라 main이 run() 끝날 때까지 기다렸다</b> → "main: …"이 맨 나중. (<code>await</code> 없이 <code>run()</code>만 했다면 run 끝나기 전에 "main: …"이 먼저 나왔다 — 바로 위 애니와 대비.)' },
      ],
    }))

    root.querySelector('[data-m="await-desugar"]').append(DesugarViz({
      title: 'await = .then · try/catch = .catch (같은 동작, 위→아래로 읽기)',
      asyncCode: [
        'async function load() {',
        '  try {',
        '    const user = await getUser()   // 값 기다림',
        '    print("이름: " + user.name)',
        '  } catch (e) {',
        '    print("실패: " + e.message)',
        '  }',
        '}',
      ],
      steps: [
        { aline: 0, then: ['function load() {'], hot: [0], note: 'async 함수도 <b>그냥 함수</b> — 그 안을 <code>.then</code> 사슬로 바꿔 보자.' },
        { aline: 2, then: ['function load() {', '  return getUser()', '    .then((user) => {'], hot: [1, 2], note: '<b><code>await getUser()</code></b> → <b><code>getUser().then(user => …)</code></b>. "await로 기다린 값"이 <code>.then</code> 콜백의 매개변수 <code>user</code>로 들어온다.' },
        { aline: 3, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      print("이름: " + user.name)'], hot: [3], note: '<code>await</code> 다음 줄(정상 흐름)이 <code>.then</code> 콜백 <b>안으로</b>.' },
        { aline: 4, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      print("이름: " + user.name)', '    })', '    .catch((e) => {'], hot: [5], note: '<b><code>try/catch</code></b> → <b><code>.catch(e => …)</code></b>. 에러 처리가 사슬 <b>끝의 <code>.catch</code></b>로 간다.' },
        { aline: 5, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      print("이름: " + user.name)', '    })', '    .catch((e) => {', '      print("실패: " + e.message)', '    })', '}'], hot: [6], note: '<code>catch</code> 블록 내용이 <code>.catch</code> 콜백 안으로 → 사슬 마무리.' },
        { aline: null, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      print("이름: " + user.name)', '    })', '    .catch((e) => {', '      print("실패: " + e.message)', '    })', '}'], hot: [1, 5], note: '정리 — 왼쪽(<code>await</code>·<code>try/catch</code>)과 오른쪽(<code>.then</code>·<code>.catch</code>)은 <b>완전히 같은 동작</b>. <code>async/await</code>은 이 사슬을 <b>위→아래 평범한 코드처럼</b> 읽게 해줄 뿐 — 그게 편한 이유다.' },
      ],
    }))

    root.querySelector('[data-m="await-desugar2"]').append(DesugarViz({
      title: 'await 두 개 + try/catch 하나 (같은 규칙을 두 번)',
      asyncCode: [
        'async function load() {',
        '  try {',
        '    const user = await getUser()          // 값 ①',
        '    const more = await getUserMoreInfo()  // 값 ②',
        '    return { ...user, ...more }',
        '  } catch (e) {',
        '    print("실패: " + e.message)',
        '  }',
        '}',
      ],
      steps: [
        { aline: 0, then: ['function load() {'], hot: [0], note: '앞 예시와 <b>똑같은 규칙</b> — 이번엔 <code>await</code>가 <b>두 개</b>. 하나씩 풀어보자.' },
        { aline: 2, then: ['function load() {', '  return getUser()', '    .then((user) => {'], hot: [1, 2], note: '<b>첫 번째</b> <code>await getUser()</code> → <code>getUser().then(user => …)</code>. 여기까진 앞 예시와 판박이.' },
        { aline: 3, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      return getUserMoreInfo()', '        .then((more) => {'], hot: [3, 4], note: '<b>두 번째</b> <code>await</code>도 <b>또 한 겹</b> <code>.then</code> — 게다가 <b>안쪽으로 중첩</b>된다(<code>user</code>를 계속 쓰려면 그 콜백 <b>안에서</b> 다음 <code>.then</code>). <b>await 하나 = <code>.then</code> 한 겹</b>이라, await이 늘수록 콜백이 깊어진다.' },
        { aline: 4, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      return getUserMoreInfo()', '        .then((more) => {', '          return { ...user, ...more }', '        })', '    })'], hot: [5], note: '두 값을 합치는 정상 흐름은 <b>가장 안쪽</b> <code>.then</code> 안으로 — <code>user</code>·<code>more</code> 둘 다 이 자리에서만 함께 보인다.' },
        { aline: 5, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      return getUserMoreInfo()', '        .then((more) => {', '          return { ...user, ...more }', '        })', '    })', '    .catch((e) => {'], hot: [8], note: '<b>여기가 핵심</b> — <code>try/catch</code> <b>하나</b>가 <code>await</code> <b>둘</b>을 감쌌으니, <code>.catch</code>도 <b>사슬 맨 끝에 딱 하나</b>. <code>getUser</code>가 깨지든 <code>getUserMoreInfo</code>가 깨지든 <b>전부 이 하나로</b> 굴러온다(중첩 콜백을 뚫고).' },
        { aline: 6, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      return getUserMoreInfo()', '        .then((more) => {', '          return { ...user, ...more }', '        })', '    })', '    .catch((e) => {', '      print("실패: " + e.message)', '    })', '}'], hot: [9], note: '<code>catch</code> 블록 내용이 그 하나뿐인 <code>.catch</code> 콜백 안으로 → 마무리.' },
        { aline: null, then: ['function load() {', '  return getUser()', '    .then((user) => {', '      return getUserMoreInfo()', '        .then((more) => {', '          return { ...user, ...more }', '        })', '    })', '    .catch((e) => {', '      print("실패: " + e.message)', '    })', '}'], hot: [4, 8], note: '정리 — <b>await 하나당 <code>.then</code> 한 겹</b>(두 개면 <b>중첩</b>), <b>try/catch 하나</b>는 <b>끝의 <code>.catch</code> 하나</b>로 <b>모든 await</b>를 덮는다. 오른쪽 계단이 이렇게 깊어질 걸 왼쪽처럼 <b>위→아래 평평하게</b> 읽는 것 — <b>await이 많아질수록</b> <code>async/await</code>의 값어치가 커지는 이유다.' },
      ],
    }))

    root.querySelector('[data-m="await-desugar3"]').append(DesugarViz({
      title: 'await마다 try/catch 하나 (실패해도 잡고 계속)',
      asyncCode: [
        'async function load() {',
        '  let user, more',
        '  try {',
        '    user = await getUser()          // 값 ①',
        '  } catch (e) {',
        '    print("실패: " + e.message)',
        '  }',
        '  try {',
        '    more = await getUserMoreInfo()  // 값 ②',
        '  } catch (e) {',
        '    print("실패: " + e.message)',
        '  }',
        '  return { ...user, ...more }',
        '}',
      ],
      steps: [
        { aline: 1, then: ['function load() {', '  let user, more'], hot: [1], note: '이번엔 값을 <b>바깥 <code>let</code>에 미리 선언</b>. 각 <code>try/catch</code>가 따로라, 값이 그 블록 밖에서도 <b>살아남아야</b> 마지막 <code>return</code>에서 쓴다.' },
        { aline: 3, then: ['function load() {', '  let user, more', '  return getUser()', '    .then((u) => { user = u })'], hot: [2, 3], note: '첫 <code>await getUser()</code> → <code>.then</code>. 단 값을 콜백 안에서 쓰지 않고 <b>바깥 <code>user</code>에 담아만</b> 둔다.' },
        { aline: 4, then: ['function load() {', '  let user, more', '  return getUser()', '    .then((u) => { user = u })', '    .catch((e) => { print("실패: " + e.message) })'], hot: [4], note: '<b>여기가 Ex2와 갈리는 지점</b> — <code>try/catch</code>가 이 await만 감쌌으니 <code>.catch</code>가 <b>사슬 중간</b>에 붙는다. 그리고 <code>.catch</code>는 <b>에러를 잡고 나면 사슬을 정상으로 되돌린다</b> → <b>다음 <code>.then</code>이 계속 실행</b>(안 멈춤).' },
        { aline: 8, then: ['function load() {', '  let user, more', '  return getUser()', '    .then((u) => { user = u })', '    .catch((e) => { print("실패: " + e.message) })', '    .then(() => getUserMoreInfo())', '    .then((m) => { more = m })'], hot: [5, 6], note: '둘째 <code>await</code>는 <b>중첩이 아니라 다음 칸</b>에 <b>평평하게</b> 이어진다(값을 안 물려주니까). <code>more</code>도 바깥에 담아둠. — Ex2의 <b>중첩 사다리</b>와 정반대.' },
        { aline: 9, then: ['function load() {', '  let user, more', '  return getUser()', '    .then((u) => { user = u })', '    .catch((e) => { print("실패: " + e.message) })', '    .then(() => getUserMoreInfo())', '    .then((m) => { more = m })', '    .catch((e) => { print("실패: " + e.message) })'], hot: [7], note: '둘째 <code>try/catch</code> → 또 하나의 <b>중간 <code>.catch</code></b>. 얘도 잡고 계속.' },
        { aline: 12, then: ['function load() {', '  let user, more', '  return getUser()', '    .then((u) => { user = u })', '    .catch((e) => { print("실패: " + e.message) })', '    .then(() => getUserMoreInfo())', '    .then((m) => { more = m })', '    .catch((e) => { print("실패: " + e.message) })', '    .then(() => ({ ...user, ...more }))', '}'], hot: [8], note: '마지막에 <code>user</code>·<code>more</code>를 합쳐 반환. <b>⚠️ 함정</b>: 앞에서 하나가 실패해 잡혔다면 그 값은 <code>undefined</code>인 채 — <code>{...undefined}</code>는 <b>에러 없이 그냥 빈 것</b>이라 <b>반쪽 객체가 조용히 반환</b>된다. "잡고 계속"의 대가.' },
        { aline: null, then: ['function load() {', '  let user, more', '  return getUser()', '    .then((u) => { user = u })', '    .catch((e) => { print("실패: " + e.message) })', '    .then(() => getUserMoreInfo())', '    .then((m) => { more = m })', '    .catch((e) => { print("실패: " + e.message) })', '    .then(() => ({ ...user, ...more }))', '}'], hot: [4, 7], note: '정리 — <b>Ex2</b>(바깥 <code>try/catch</code> 하나): <b>중첩</b> 사슬 + <b>맨 끝 <code>.catch</code> 하나</b> → 하나 깨지면 <b>즉시 끝</b>(나머지 건너뜀, <b>fail-fast</b>). <b>Ex3</b>(await마다 <code>try/catch</code>): <b>평평</b>한 사슬 + <b>단계마다 <code>.catch</code></b> → 깨져도 <b>잡고 계속</b>(되는 것만 모음). <b><code>try/catch</code>를 어디 두느냐가 실패 시 동작을 바꾼다.</b>' },
      ],
    }))

    root.querySelector('[data-m="qz-await"]').append(Quiz({
      q: '<code>await</code>는 무엇을 멈추나?',
      options: ['<b>그 async 함수만</b> 잠시 멈추고, 나머지 프로그램엔 제어를 양보한다', '프로그램 <b>전체</b>를 멈춘다(그동안 아무것도 못 함)', '아무것도 안 멈추고 즉시 다음 줄로 간다'],
      answer: 0,
      explain: '<code>await</code>는 <b>자기가 속한 async 함수만</b> "값 올 때까지" 일시정지하고, <b>제어권을 밖으로 양보</b>한다 — 그동안 다른 동기 코드·이벤트가 계속 돈다(UI가 안 얼어붙는 이유). 전체를 멈추는 게 아니다. 값이 오면 그 함수가 <b>멈춘 자리부터</b> 이어서 실행.',
    }))

    wireGoto(root)
  }
})()
