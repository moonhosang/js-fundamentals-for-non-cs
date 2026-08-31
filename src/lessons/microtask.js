// ⏳ 심화 — 마이크로태스크 vs 매크로태스크 큐 (이벤트 루프의 두 대기줄)
// 'async' 강의 후속. 거기서 "대기 큐 하나"로 뭉뚱그린 걸 두 줄로 정확히 쪼갠다.
//
// 오해: 대기 큐는 하나다 · 먼저 등록한 콜백이 먼저 실행 · setTimeout(_,0)이 제일 빠르다
// 왜:   큐가 둘 — 🟣마이크로(Promise.then)·🟠매크로(setTimeout). 콜스택 빌 때마다 마이크로를 '전부'
//        비운 뒤에야 매크로를 '딱 하나'. 그래서 나중 등록한 then이 먼저 등록한 setTimeout(0)을 앞지른다
// 대비: 콜스택(지금) → 🟣마이크로 전부 → 🟠매크로 하나 → (그게 만든 🟣 다시 전부) → 반복

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  window.Lessons['microtask'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">⏳ 심화</span>
        <h2>마이크로 vs 매크로 큐 — <code>Promise</code>가 <code>setTimeout</code>보다 먼저</h2>
        <p>비동기 강의에서 콜백이 기다리는 곳을 <b>"대기 큐 하나"</b>로 뭉뚱그렸다. 사실 대기줄은 <b>둘</b>이다 —
        <b>🟣 마이크로</b>(Promise)와 <b>🟠 매크로</b>(setTimeout). 이 둘의 <b>우선순위</b>가 "왜 순서가 또 뒤집히지?"의 정체다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p>콜스택이 <b>빌 때마다</b> 이벤트 루프는 이 순서로 움직인다: <b>① 🟣마이크로 큐를 전부 비운다</b>(하나도 안 남을 때까지) → <b>② 🟠매크로 큐에서 딱 하나</b> 꺼낸다 → 그 하나가 새 🟣마이크로를 만들었으면 <b>다시 ①로</b>.
        <code>Promise.then/catch/finally</code>·<code>await</code> 뒷부분·<code>queueMicrotask</code>는 <b>🟣마이크로</b>, <code>setTimeout/setInterval</code>·클릭 이벤트·I/O는 <b>🟠매크로</b>. <b>마이크로가 매크로보다 항상 먼저</b> — <code>setTimeout(fn, 0)</code>도 마이크로 뒤로 밀린다.</p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "먼저 등록한 게 먼저 실행된다"</div>
        <p class="section-desc" style="margin:0"><b>아니다.</b> 아래에선 <code>setTimeout</code>을 <b>먼저</b> 등록하고 <code>Promise.then</code>을 <b>나중에</b> 등록한다. 그런데 <b>나중에 등록한 then이 먼저 실행</b>된다. 등록 순서가 아니라 <b>어느 큐냐</b>(🟣먼저·전부 / 🟠나중·하나)가 순서를 정하기 때문이다. "0ms면 제일 빠르겠지"라는 감이 여기서 두 번째로 깨진다(첫 번째는 "0=지금"이 아니라는 것 — 비동기 강의).</p>
      </div>

      <h3 class="section-title">① 순서를 보라 — 등록은 setTimeout이 먼저인데 (직접 실행)</h3>
      <span class="learn-tag">📎 ▶ 실행 → 1 · 4 · 3 · 2. 동기(1·4) 먼저, 그다음 🟣마이크로(3), 맨 끝이 🟠매크로(2)</span>
      <div class="card"><div class="file-label">🔬 순서를 예측하고 ▶ (2와 3 중 누가 먼저?)</div><div data-m="order"></div></div>
      <div data-m="qz-order"></div>

      <h3 class="section-title">② 눈으로 — 콜스택이 비면 🟣부터 전부, 🟠는 하나 (애니메이션)</h3>
      <span class="learn-tag">📎 ▶ 다음 단계(또는 ▶▶ 자동재생) — 두 큐에 각각 쌓인 뒤, 콜스택이 텅 비면 🟣를 <b>먼저·전부</b> 비우고 🟠로</span>
      <div data-m="elv"></div>

      <h3 class="section-title">③ 왜 마이크로가 먼저인가 — "한 호흡에 끝내기"</h3>
      <p class="section-desc" style="margin-top:0"><code>Promise</code> 연쇄(<code>.then().then()</code>)는 <b>한 논리적 작업의 마무리</b>다. 그 사이에 타이머·클릭·화면 다시 그리기 같은 <b>바깥 일</b>이 끼어들면 상태가 어긋난다. 그래서 엔진은 <b>지금 벌어진 Promise 뒷정리(마이크로)를 전부 끝낸 뒤에야</b> 다음 매크로(타이머·이벤트)로 넘어간다 — <b>일관성을 위해</b>. 매크로를 하나씩 처리하며 그 틈에 화면을 다시 그릴 기회를 주는 것도 이 구조 덕분(🟠 하나씩).</p>

      <h3 class="section-title">④ 경계·대비 — 어느 게 🟣이고 어느 게 🟠인가</h3>
      <div class="card">
        <table class="fit-table" style="width:100%">
          <tbody>
            <tr><td><b>🟣 마이크로 (먼저·전부 비움)</b><span><code>Promise.then</code> · <code>.catch</code> · <code>.finally</code> · <code>await</code> 뒷부분 · <code>queueMicrotask</code></span></td></tr>
            <tr><td><b>🟠 매크로 (나중·하나씩)</b><span><code>setTimeout</code> · <code>setInterval</code> · 클릭 등 이벤트 콜백 · I/O 완료</span></td></tr>
          </tbody>
        </table>
        <p class="section-desc" style="margin:8px 0 0">판별 한마디: <b>Promise에서 나온 콜백이면 🟣, 타이머·이벤트에서 나온 콜백이면 🟠.</b> 🟣가 하나라도 남아 있으면 🟠는 <b>절대 차례가 안 온다.</b></p>
      </div>

      <h3 class="section-title">⑤ 그런데 <code>await</code>는 왜 🟣인가 — async는 사실 <code>.then</code>이다 (한 겹씩 풀기)</h3>
      <span class="learn-tag">📎 🔻 다음 — async/await가 Promise.then 사다리로 '풀리는' 과정. await 하나가 '함수를 자르는 가위'다</span>
      <p class="section-desc" style="margin-top:0">아래 <code>getA()</code>·<code>getB()</code>는 <b>Promise를 돌려주는 함수</b>(예: 서버에서 값 받아오기 — 결과가 나중에 온다)라고 보면 된다. 좌(우리가 쓰는 async)와 우(엔진이 보는 <code>.then</code>)는 <b>완전히 같은 동작</b>이다.</p>
      <div data-m="desugar"></div>
      <p class="section-desc"><code>await</code> 뒷부분이 곧 <code>.then</code> 콜백 → <b>🟣마이크로태스크</b>. 그래서 <code>await</code> 다음 줄은 <code>setTimeout</code>보다 <b>항상 먼저</b> 돈다(아래 마지막 퀴즈로 확인).</p>

      <h3 class="section-title">⑥ 🎯 정곡 예측 — 섞이면 진짜 아나?</h3>
      <p class="section-desc" style="margin-top:0">아래 3문제는 <b>중첩·혼합</b>이라 감으로는 틀린다. 매번 <b>"지금 콜스택 빔 → 🟣 남은 것부터 전부 → 🟠 하나"</b>만 적용하라.</p>
      <div data-m="qz-1"></div>
      <div data-m="qz-2"></div>
      <div data-m="qz-3"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>대기줄은 둘이다.</b> 콜스택이 빌 때마다 <b>🟣마이크로(Promise)를 전부</b> 비운 뒤 <b>🟠매크로(setTimeout·이벤트)를 하나</b> 꺼낸다 — 그 하나가 만든 🟣를 <b>다시 전부</b> 비우고 반복.
        그래서 <b>등록 순서와 무관하게</b> <code>Promise.then</code>(과 <code>await</code> 뒷부분)이 <code>setTimeout(_,0)</code>을 앞지른다. "0ms니까 제일 빠르다"는 틀렸다 — 🟣 뒤에 서 있으니까.</p>
      </div>

      <div class="card" style="opacity:.9">
        <div class="file-label">🧭 이 강의는 '순서 예측' 중심 (값-드릴 없음)</div>
        <p class="section-desc" style="margin:0">비동기는 "값 하나 맞히기"보다 <b>"어떤 순서로 도나"</b>가 핵심이라 위 <b>예측 Quiz + 실행 Runner + 애니메이션</b>으로 익힌다(빈칸 드릴은 동기 전용이라 포맷이 안 맞음 — 비동기 강의 노트와 동일). 다음은 여러 비동기를 <b>한꺼번에</b> 기다리는 법.</p>
      </div>

      <div class="practice-cta"><span>여러 비동기를 한꺼번에 —</span><button class="chip on" data-goto="promiseall">⏳ Promise.all · race →</button></div>
    `

    root.querySelector('[data-m="order"]').append(Runner({ showBox: false, code: [
      'print("1")                                 // 동기 — 지금',
      'setTimeout(() => print("2"), 0)            // 🟠 매크로 큐로 (먼저 등록·0이어도!)',
      'Promise.resolve().then(() => print("3"))   // 🟣 마이크로 큐로 (나중 등록)',
      'print("4")                                 // 동기 — 지금',
      '',
      '// 예측: 어떤 순서로 찍힐까? ▶ 눌러 확인',
      '// (1 · 4 · 3 · 2 — 나중 등록한 🟣마이크로 3이, 먼저 등록한 🟠매크로 2보다 앞선다)',
    ].join('\n') }))

    root.querySelector('[data-m="qz-order"]').append(Quiz({
      q: '아래는 어떤 순서로 찍히나?<pre class="err-code" style="color:inherit;background:transparent">print("1")\nsetTimeout(() => print("2"), 0)\nPromise.resolve().then(() => print("3"))\nprint("4")</pre>',
      options: [
        '1 · 4 · 3 · 2 — 동기(1·4) → 🟣마이크로(3) → 🟠매크로(2)',
        '1 · 4 · 2 · 3 — 등록 순서대로 setTimeout(2)이 then(3)보다 먼저',
        '1 · 2 · 3 · 4 — 적힌 순서대로',
        '1 · 4 · 2 · 3 — setTimeout이 0ms라 제일 빨리 실행',
      ],
      answer: 0,
      explain: '동기 <b>1·4</b>가 먼저(콜스택). 그다음 콜스택이 비면 <b>🟣마이크로부터 전부</b> → <code>then</code>의 <b>3</b>. 마이크로가 비어야 <b>🟠매크로 하나</b> → <code>setTimeout</code>의 <b>2</b>. 등록은 setTimeout이 먼저였지만 <b>어느 큐냐</b>가 우선순위를 정한다 → <b>1·4·3·2</b>. (②·④ 오답은 "먼저 등록/0ms면 먼저"라는 감 — 큐 규칙 하나면 둘 다 깨진다.)',
    }))

    root.querySelector('[data-m="elv"]').append(EventLoopViz({
      title: '콜스택이 비면 → 🟣마이크로 전부 → 🟠매크로 하나',
      code: [
        'print("1")                                // 동기',
        'setTimeout(() => print("2"), 0)           // 🟠 매크로로',
        'Promise.resolve().then(() => print("3"))  // 🟣 마이크로로',
        'print("4")                                // 동기',
        '// ↓ 콜스택 빔 → 🟣 전부 → 🟠 하나',
      ],
      steps: [
        { line: 0, phase: 'sync', stack: ['main'], micro: [], macro: [], out: ['1'], note: '<code>print("1")</code> — 동기라 <b>콜스택(main)에서 지금</b> 실행 → 출력 <b>1</b>. 두 큐 모두 비어 있다.' },
        { line: 1, phase: 'sync', stack: ['main'], micro: [], macro: ['() => print("2")'], out: ['1'], note: '<code>setTimeout(_, 0)</code> — 콜백을 <b>🟠매크로 큐</b>에 넣고 <b>즉시 다음 줄로</b>(실행 안 함). 0ms여도 "지금"이 아니다.' },
        { line: 2, phase: 'sync', stack: ['main'], micro: ['() => print("3")'], macro: ['() => print("2")'], out: ['1'], note: '<code>.then(_)</code> — 콜백을 <b>🟣마이크로 큐</b>로. 이제 두 줄에 하나씩(🟠 먼저 등록, 🟣 나중 등록).' },
        { line: 3, phase: 'sync', stack: ['main'], micro: ['() => print("3")'], macro: ['() => print("2")'], out: ['1', '4'], note: '<code>print("4")</code> — 여전히 동기 → 출력 <b>4</b>. 콜스택이 <b>안 비었으니</b> 두 큐는 <b>계속 대기</b>.' },
        { line: 4, phase: 'idle', stack: [], micro: ['() => print("3")'], macro: ['() => print("2")'], out: ['1', '4'], note: '동기 코드 끝 → <b>콜스택 텅 빔</b>. 이제 루프가 큐를 본다. <b>규칙: 🟣마이크로부터 전부</b> — 🟠는 아직 쳐다도 안 본다.' },
        { line: 4, phase: 'drain-micro', stack: [{ label: 'then 콜백', from: 'micro' }], micro: [], macro: ['() => print("2")'], out: ['1', '4', '3'], note: '🟣마이크로에서 콜백을 꺼내 콜스택에 올려 실행 → 출력 <b>3</b>. 마이크로 큐가 비었다.' },
        { line: 4, phase: 'idle', stack: [], micro: [], macro: ['() => print("2")'], out: ['1', '4', '3'], note: '🟣마이크로 큐 <b>비었음</b> → <b>이제서야</b> 🟠매크로 차례. 큐에서 <b>딱 하나</b> 꺼낸다.' },
        { line: 4, phase: 'drain-macro', stack: [{ label: 'timer 콜백', from: 'macro' }], micro: [], macro: [], out: ['1', '4', '3', '2'], note: '🟠매크로 콜백 실행 → 출력 <b>2</b>. <b>그래서 2가 꼴찌</b> — 최종 <b>1 · 4 · 3 · 2</b>. 나중 등록한 🟣가 먼저 등록한 🟠(0ms)를 앞질렀다.' },
        { line: 4, phase: 'idle', stack: [], micro: [], macro: [], out: ['1', '4', '3', '2'], note: '두 큐 모두 비었다 — 끝. <b>핵심: 콜스택 빔 → 🟣 전부 → 🟠 하나.</b> 이 한 규칙이 모든 순서를 정한다.' },
      ],
    }))

    root.querySelector('[data-m="desugar"]').append(DesugarViz({
      title: 'async / await 는 Promise.then 사다리의 껍데기',
      asyncCode: [
        'async function go() {',
        '  print("A")',
        '  const x = await getA()   // getA()는 Promise',
        '  print("B: " + x)',
        '  const y = await getB()',
        '  print("C: " + y)',
        '  return x + y',
        '}',
      ],
      steps: [
        { aline: 1, then: ['function go() {', '  print("A")'], hot: [1], note: '<code>await</code> <b>전</b>의 동기 부분(<code>print("A")</code>)은 그대로 옮겨진다 — 여기까진 평범한 함수.' },
        { aline: 2, then: ['function go() {', '  print("A")', '  return getA().then(x => {'], hot: [2], note: '✂️ <b><code>await</code> = 함수를 자르는 가위.</b> <code>getA()</code>가 준 Promise에 <code>.then</code>을 걸고, <b><code>await</code> 아래 나머지 전부</b>를 그 콜백 속으로 밀어넣는다. 이 콜백이 곧 🟣마이크로태스크.' },
        { aline: 3, then: ['function go() {', '  print("A")', '  return getA().then(x => {', '    print("B: " + x)'], hot: [3], note: '<code>await</code>가 돌려준 값은 <b>콜백 매개변수 <code>x</code></b>로 들어온다 — <code>const x = await …</code>의 정체.' },
        { aline: 4, then: ['function go() {', '  print("A")', '  return getA().then(x => {', '    print("B: " + x)', '    return getB().then(y => {'], hot: [4], note: '두 번째 <code>await</code> → 콜백 <b>안에 또 한 겹</b> <code>.then</code>. 그래서 <code>await</code> 여러 개 = 사다리처럼 <b>중첩·순차</b>(앞이 끝나야 뒤).' },
        { aline: 5, then: ['function go() {', '  print("A")', '  return getA().then(x => {', '    print("B: " + x)', '    return getB().then(y => {', '      print("C: " + y)'], hot: [5], note: '역시 <code>await getB()</code> 아래는 <b>안쪽 콜백</b>으로.' },
        { aline: 6, then: ['function go() {', '  print("A")', '  return getA().then(x => {', '    print("B: " + x)', '    return getB().then(y => {', '      print("C: " + y)', '      return x + y', '    })', '  })', '}'], hot: [6], note: '<code>return x + y</code> = 최종 Promise가 <b>resolve하는 값</b>. 닫는 괄호들이 <code>.then</code> 사다리를 마무리한다.' },
        { aline: null, then: ['function go() {', '  print("A")', '  return getA().then(x => {', '    print("B: " + x)', '    return getB().then(y => {', '      print("C: " + y)', '      return x + y', '    })', '  })', '}'], hot: [2, 4], note: '정리 — <code>async/await</code>는 이 <code>.then</code> 사다리의 <b>읽기 좋은 껍데기</b>일 뿐(새 외계 문법 아님). 각 <code>await</code> 뒤가 <b><code>.then</code> 콜백 = 🟣마이크로</b>라, "await 뒷부분은 마이크로태스크"가 여기서 증명된다.' },
      ],
    }))

    root.querySelector('[data-m="qz-1"]').append(Quiz({
      q: '(혼합) 출력 순서는?<pre class="err-code" style="color:inherit;background:transparent">print("A")\nsetTimeout(() => print("B"), 0)\nPromise.resolve().then(() => {\n  print("C")\n  setTimeout(() => print("D"), 0)\n})\nPromise.resolve().then(() => print("E"))\nprint("F")</pre>',
      options: [
        'A · F · C · E · B · D',
        'A · F · C · E · D · B',
        'A · B · C · D · E · F',
        'A · F · B · C · D · E',
      ],
      answer: 0,
      explain: '동기: <b>A · F</b>. 콜스택 빔 → 🟣마이크로 전부: <code>then</code>(C) 실행 → 그 안 <code>setTimeout(D)</code>는 <b>🟠매크로로 등록</b>(지금 실행 X), 이어 <code>then</code>(E). 🟣 다 비움 → <b>C · E</b>. 이제 🟠매크로 큐엔 <b>B</b>(먼저 등록), <b>D</b>(나중 등록) 순 → 하나씩 <b>B · D</b>. 합쳐 <b>A · F · C · E · B · D</b>. 함정: C가 만든 D는 "지금"이 아니라 매크로 뒤에 붙는다.',
    }))

    root.querySelector('[data-m="qz-2"]').append(Quiz({
      q: '(중첩 마이크로) 출력 순서는? — 마이크로를 비우는 <b>도중에</b> 새 마이크로가 생기면?<pre class="err-code" style="color:inherit;background:transparent">Promise.resolve().then(() => {\n  print("1")\n  Promise.resolve().then(() => print("2"))\n})\nPromise.resolve().then(() => print("3"))</pre>',
      options: [
        '1 · 3 · 2 — 큐를 "전부" 비우니, 도중에 생긴 2도 같은 회차에 처리(3 뒤)',
        '1 · 2 · 3 — 안쪽 then이 먼저 끝나야 다음으로',
        '3 · 1 · 2 — 마지막 then이 먼저',
        '1 · 2 · 3 을 무한 반복',
      ],
      answer: 0,
      explain: '마이크로 큐: [then①, then③]. ①실행 → <b>1</b>, 그 안 <code>then</code>은 큐 <b>뒤에</b> 추가(②). ③실행 → <b>3</b>. 아직 마이크로 <b>비우는 중</b>이고 큐에 ②가 남았다 → ②실행 → <b>2</b>. <b>1 · 3 · 2.</b> 핵심: "🟣를 <b>전부</b> 비운다"는 <b>비우는 도중에 새로 생긴 🟣까지</b> 포함 — 그래서 🟠매크로는 계속 못 끼어든다(이래서 마이크로 폭주는 화면을 얼릴 수 있다).',
    }))

    root.querySelector('[data-m="qz-3"]').append(Quiz({
      q: '(async 섞기) <code>await</code> <b>뒷부분</b>은 어느 큐? 출력 순서는?<pre class="err-code" style="color:inherit;background:transparent">async function go() {\n  print("1")\n  await null          // await 뒤부터는 🟣마이크로\n  print("3")\n}\nsetTimeout(() => print("4"), 0)\ngo()\nprint("2")</pre>',
      options: [
        '1 · 2 · 3 · 4 — await 뒤(3)는 🟣마이크로라 🟠매크로(4)보다 먼저',
        '1 · 3 · 2 · 4 — go()가 끝까지 실행된 뒤 다음 줄',
        '1 · 2 · 4 · 3 — setTimeout이 0ms라 3보다 먼저',
        '1 · 4 · 2 · 3 — 비동기가 다 먼저',
      ],
      answer: 0,
      explain: '<code>go()</code> 진입 → <b>1</b>(동기). <code>await null</code>을 만나면 <b>거기서 함수를 멈추고 제어를 밖으로 양보</b> — <b>await 뒷부분(<code>print("3")</code>)은 🟣마이크로로 예약</b>된다(위 디슈가 애니메이션의 <code>.then</code> 콜백). 밖으로 나와 동기 <code>print("2")</code> → <b>2</b>. 콜스택 빔 → 🟣마이크로(3) → <b>3</b> → 🟠매크로(4) → <b>4</b>. <b>1 · 2 · 3 · 4.</b>',
    }))

    wireGoto(root)
  }
})()
