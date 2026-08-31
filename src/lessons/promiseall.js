// ⏳ 병렬 — Promise.all / race / allSettled / any (여러 비동기를 한꺼번에)
// 'microtask' 후속. 하나의 비동기가 아니라 '여럿을 동시에' 다루는 법.
//
// 오해: await를 여러 개 쓰면 병렬로 동시에 기다린다 · Promise.all은 하나씩 순서대로
// 왜:   Promise는 '만드는 순간' 이미 일을 시작한다(await가 시작시키는 게 아님). 그래서 await를 줄줄이
//        쓰면 앞이 끝나야 뒤를 시작=순차. 여럿을 먼저 만들어 Promise.all로 묶으면 동시=병렬
// 대비: all(모두·fail-fast) / allSettled(전부 기다림) / race(first-settled) / any(first-success)

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  window.Lessons['promiseall'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">⏳ 병렬</span>
        <h2>여러 비동기를 한꺼번에 — <code>Promise.all</code> · <code>race</code></h2>
        <p>사진 3장을 서버에서 받는다. 하나씩 기다리면 3배 느리다 — 셋을 <b>동시에</b> 시작해 <b>다 오면</b> 한 번에 쓰고 싶다.
        그게 <code>Promise.all</code>. 그리고 "제일 먼저 온 하나만"(<code>race</code>), "터져도 끝까지"(<code>allSettled</code>)까지.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p><b>Promise는 <u>만드는 순간</u> 이미 일을 시작한다</b> — <code>await</code>가 일을 <b>시작</b>시키는 게 아니라 <b>결과를 기다릴</b> 뿐이다.
        그래서 <code>await a(); await b()</code>처럼 줄줄이 쓰면 <b>앞이 끝나야 뒤를 시작</b>(순차). 여럿을 <b>먼저 다 만들어</b> 놓고(=동시 시작) <code>Promise.all([...])</code>로 묶어 기다리면 <b>병렬</b>. <b>순차냐 병렬이냐는 "언제 만드나"가 가른다.</b></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "<code>await</code>를 여러 개 쓰면 동시에(병렬) 기다린다"</div>
        <p class="section-desc" style="margin:0"><b>아니다.</b> <code>await A(); await B(); await C()</code>는 <b>A 끝 → B 시작 → B 끝 → C 시작</b>. 각 500ms면 <b>1500ms</b>다(순차). 셋이 서로 독립인데도 줄 서서 기다린다. 아래에서 <b>실제 걸린 시간</b>을 재 보면 감이 온다 — "여러 개 = 병렬"은 착각.</p>
      </div>

      <h3 class="section-title">① 순차의 고통 vs 병렬 — 진짜 시간을 재 보라 (▶ 후 잠깐 기다림)</h3>
      <span class="learn-tag">📎 ▶ 실행 → ① 순차는 ~1500ms, ② Promise.all은 ~500ms. 같은 일인데 3배 차이</span>
      <div class="card"><div class="file-label">🔬 걸린 시간 측정 (setTimeout으로 가짜 서버)</div><div data-m="timing"></div></div>

      <h3 class="section-title">② 눈으로 — 동시에 흐르고, 다 오면 확정 (애니메이션)</h3>
      <span class="learn-tag">📎 ▶ 재생 — 세 막대가 <b>함께</b> 차오른다. <code>Promise.all</code>은 <b>제일 늦은 것</b>(C)이 끝나야 확정</span>
      <div data-m="pv-all"></div>

      <h3 class="section-title">③ 왜 병렬이 빠른가 — "먼저 만들면 이미 시작"</h3>
      <span class="learn-tag">📎 ▶ — Promise를 먼저 만들어 두면 await를 하나씩 해도 병렬이 된다(핵심은 '만든 시점')</span>
      <div class="card"><div class="file-label">🔬 await 두 개인데 병렬인 코드</div><div data-m="whenmade"></div></div>
      <div data-m="qz-timing"></div>

      <h3 class="section-title">④ 네 형제 — all · allSettled · race · any (같은 작업, 모드만 바꿔 대비)</h3>
      <span class="learn-tag">📎 위 <b>모드 버튼(all·allSettled·race·any)</b>을 바꿔 가며 ▶ 재생 — <b>같은 세 작업</b>인데 언제·무엇으로 확정되나</span>
      <div data-m="pv-compare"></div>
      <div class="card">
        <table class="fit-table" style="width:100%"><tbody>
          <tr><td><b><code>Promise.all</code></b><span>모두 성공 → 값 <b>배열</b>(입력 순서 보존). <b>하나라도 실패 → 그 즉시 실패</b>(fail-fast, 나머지 결과는 버림).</span></td></tr>
          <tr><td><b><code>Promise.allSettled</code></b><span>성공·실패 불문 <b>전부 끝날 때까지</b> → <code>{status:'fulfilled'|'rejected'}</code> 배열. "다 해보고 결과 취합".</span></td></tr>
          <tr><td><b><code>Promise.race</code></b><span><b>제일 먼저 끝난 하나</b>로 확정 — 성공이든 <b>실패든</b>. 타임아웃 만들 때 자주.</span></td></tr>
          <tr><td><b><code>Promise.any</code></b><span><b>제일 먼저 성공한 하나</b>. 전부 실패해야 실패(<code>AggregateError</code>).</span></td></tr>
        </tbody></table>
      </div>
      <div data-m="qz-mode"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>Promise는 만들면 이미 시작.</b> 그래서 <code>await</code>를 줄줄이 = 순차, 여럿을 <b>먼저 만들어</b> <code>Promise.all([...])</code>로 묶으면 = 병렬.
        <code>all</code>=모두 성공(하나 실패 시 즉시 실패) · <code>allSettled</code>=전부 기다려 취합 · <code>race</code>=먼저 끝난 하나 · <code>any</code>=먼저 성공한 하나. <b>독립적인 여러 일은 병렬로</b> — 사용자를 기다리게 하지 마라.</p>
      </div>

      <div class="card" style="opacity:.9">
        <div class="file-label">🧭 다음 — 비동기에서 에러가 나면?</div>
        <p class="section-desc" style="margin:0"><code>all</code>이 <b>실패</b>하면, <code>race</code>가 <b>실패</b>를 물어오면 그 에러를 어떻게 잡을까? 그리고 <code>setTimeout</code> 콜백 안의 에러를 <code>try/catch</code>가 <b>왜 못 잡는지</b> — 다음 강의에서.</p>
      </div>

      <div class="practice-cta"><span>비동기 에러는 어디로 튀나 —</span><button class="chip on" data-goto="asyncerr">⏳ 비동기 에러 전파 →</button></div>
    `

    root.querySelector('[data-m="timing"]').append(Runner({ showBox: false, code: [
      '// 가짜 서버: ms 뒤에 name을 돌려주는 Promise',
      'function task(name, ms) {',
      '  return new Promise((resolve) => setTimeout(() => resolve(name), ms))',
      '}',
      '',
      'async function demo() {',
      '  let t0 = Date.now()',
      '  await task("A", 500)   // A 끝나야',
      '  await task("B", 500)   // B 시작 … 끝나야',
      '  await task("C", 500)   // C 시작',
      '  print("① 순차(await 하나씩): " + (Date.now() - t0) + "ms")   // ~1500',
      '',
      '  t0 = Date.now()',
      '  await Promise.all([task("A", 500), task("B", 500), task("C", 500)])',
      '  print("② 병렬(Promise.all): " + (Date.now() - t0) + "ms")    // ~500',
      '}',
      'demo()',
    ].join('\n') }))

    root.querySelector('[data-m="pv-all"]').append(PromiseViz({
      title: 'Promise.all([A, B, C]) — 셋이 동시에, 제일 늦은 C가 끝나야 확정',
      mode: 'all',
      tasks: [
        { name: 'A', ms: 500, ok: true, value: 'a' },
        { name: 'B', ms: 900, ok: true, value: 'b' },
        { name: 'C', ms: 1300, ok: true, value: 'c' },
      ],
    }))

    root.querySelector('[data-m="whenmade"]').append(Runner({ showBox: false, code: [
      'function task(name, ms) {',
      '  return new Promise((resolve) => setTimeout(() => resolve(name), ms))',
      '}',
      '',
      'async function 병렬() {',
      '  const t0 = Date.now()',
      '  const pa = task("A", 500)   // ← 여기서 A가 이미 시작(달리는 중)',
      '  const pb = task("B", 500)   // ← 여기서 B도 이미 시작',
      '  await pa                    // 기다리기만 — A는 벌써 뛰고 있었다',
      '  await pb                    // B도 그동안 같이 뛰었으니 곧 끝',
      '  print("await 두 개인데: " + (Date.now() - t0) + "ms")   // ~500, 병렬!',
      '}',
      '병렬()',
    ].join('\n') }))

    root.querySelector('[data-m="qz-timing"]').append(Quiz({
      q: '각 <code>task</code>가 500ms일 때, 아래는 총 몇 ms?<pre class="err-code" style="color:inherit;background:transparent">const pa = task("A", 500)\nconst pb = task("B", 500)\nawait pa\nawait pb</pre>',
      options: [
        '약 500ms — pa·pb를 <b>먼저 만들어</b> 둘 다 이미 시작했다(병렬)',
        '약 1000ms — await가 2개니 500 + 500',
        '약 1000ms — await pa가 끝나야 pb가 시작',
        '약 0ms — await가 아무것도 안 기다린다',
      ],
      answer: 0,
      explain: '<code>const pa = task(...)</code>를 <b>부르는 순간 A가 시작</b>(Promise는 만들면 즉시 달린다). pb도 마찬가지 — <b>둘 다 이미 뛰는 중</b>. 그래서 <code>await pa</code>로 A(500ms)를 기다리는 동안 B도 같이 흘러 거의 끝난다 → 총 <b>~500ms</b>. 만약 <code>await task("A")</code>를 <b>만들면서 바로</b> 기다렸다면(중간 변수 없이 줄줄이) 순차 1000ms가 됐을 것. <b>차이는 오직 "언제 만드나".</b>',
    }))

    root.querySelector('[data-m="pv-compare"]').append(PromiseViz({
      title: '같은 세 작업 (A성공·B실패·C성공) — 모드만 바꿔 대비',
      mode: 'all',
      tasks: [
        { name: 'A', ms: 500, ok: true, value: 'a' },
        { name: 'B', ms: 800, ok: false, reason: 'B터짐' },
        { name: 'C', ms: 1300, ok: true, value: 'c' },
      ],
    }))

    root.querySelector('[data-m="qz-mode"]').append(Quiz({
      q: 'A(성공·500ms)·B(<b>실패</b>·800ms)·C(성공·1300ms)일 때, <code>Promise.all</code>은?',
      options: [
        '<b>800ms에 실패</b>로 확정 — B가 터진 순간, C를 기다리지 않고 즉시 실패(fail-fast)',
        '1300ms에 성공 — 성공한 A·C만 모아 배열로',
        '800ms에 성공 — 실패는 무시하고 진행',
        '전부 무시하고 undefined',
      ],
      answer: 0,
      explain: '<code>Promise.all</code>은 <b>하나라도 실패하면 그 즉시 전체가 실패</b>(fail-fast). B가 800ms에 터지면 <b>C(1300ms)를 기다리지 않고</b> 바로 reject된다 — 결과 배열은 안 나온다. "터져도 끝까지 다 보고 싶다"면 <code>allSettled</code>(1300ms에 성공/실패 취합), "제일 먼저 성공한 하나"면 <code>any</code>(500ms, A). 위 위젯에서 모드를 바꿔 <b>확정 시점(결정선)</b>이 어떻게 달라지는지 확인하라.',
    }))

    wireGoto(root)
  }
})()
