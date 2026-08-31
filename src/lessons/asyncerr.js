// ⏳ 오류 — 비동기 에러 전파 (try/catch가 콜백을 왜 못 잡나)
// 'errors'(콜스택 전파)와 'microtask'(빈 콜스택)를 잇는 캡스톤. 이벤트 루프 + 에러의 교차점.
//
// 오해: try/catch로 감싸면 그 안의 setTimeout 콜백 에러도 잡힌다
// 왜:   try/catch는 '콜스택을 타고 올라오는' 에러만 잡는다(errors 강의). 비동기 콜백은 새(빈) 콜스택에서
//        나중에 도는데 그땐 try/catch가 이미 끝나(pop) 사라졌다 → 못 잡음. Promise는 .catch / await+try-catch
// 대비: 동기 throw(콜스택 전파·잡힘) vs setTimeout 콜백 throw(빈 스택·안 잡힘) vs await된 rejection(재던짐·잡힘)

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  window.Lessons['asyncerr'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">⏳ 오류</span>
        <h2>비동기 에러 전파 — <code>try/catch</code>가 콜백을 <b>못</b> 잡는다</h2>
        <p>에러 처리 강의에서 <code>try/catch</code>는 <b>콜스택을 타고 올라오는</b> 에러를 잡았다. 그런데 <code>setTimeout</code> 콜백 안에서 터진 에러는
        <b>바깥 <code>try/catch</code>가 못 잡는다.</b> 왜? 콜백이 <b>나중에, 빈 콜스택</b>에서 돌 땐 그 try/catch가 <b>이미 사라졌기</b> 때문. 이벤트 루프와 에러가 만나는 지점이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p><code>try/catch</code>는 <b>같은 콜스택에서 위로 전파되는</b> 에러만 잡는다(에러 처리 강의). 비동기 콜백(<code>setTimeout</code>·이벤트)은 <b>완전히 새 콜스택</b>(빈 스택 위)에서 <b>나중에</b> 돈다 — 그때 바깥 <code>try/catch</code>는 <b>이미 끝나 pop됐다</b>. 그래서 못 잡는다.
        해법: <b>콜백 안에</b> try/catch를 넣거나, <b>Promise</b>로 바꿔 <code>.catch()</code> / <code>async·await + try/catch</code>로 잡는다(<code>await</code>가 rejection을 <b>그 자리서 다시 throw</b>해 주니까).</p>
      </div>

      <div class="card" style="opacity:.92">
        <div class="file-label">🔄 되짚기 — 에러 처리 강의에서 (동기)</div>
        <p class="section-desc" style="margin:0"><b>동기</b> 에러는 던져지면 <b>콜스택을 타고 위로</b> 올라가다 <code>try/catch</code>를 만나면 잡혔다. 핵심은 <b>"같은 콜스택 위에서"</b> 일어난다는 것. 비동기는 바로 이 전제가 깨진다.</p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "<code>try</code>로 감싸면 그 안 <code>setTimeout</code> 콜백 에러도 잡힌다"</div>
        <p class="section-desc" style="margin:0"><b>아니다.</b> <code>try</code>는 <b>지금 당장</b> 그 블록을 실행하며 터지는 에러만 지킨다. <code>setTimeout(cb)</code>은 cb를 <b>큐에 넣기만</b> 하고 <b>즉시 통과</b> — try 블록은 에러 없이 끝나고 catch는 놀고 있다가 <b>사라진다</b>. cb는 한참 뒤 <b>빈 콜스택</b>에서 터지는데 거긴 지켜 줄 try/catch가 없다.</p>
      </div>

      <h3 class="section-title">① 직접 보라 — <code>catch</code>가 안 찍힌다 (콜백 에러는 새어 나간다)</h3>
      <span class="learn-tag">📎 ▶ 실행 → "catch: 잡았다!"가 <b>안</b> 찍힌다. 콜백 에러는 바깥 try/catch를 그냥 지나친다(Uncaught)</span>
      <div class="card"><div class="file-label">🔬 try로 감쌌는데도 못 잡는다</div><div data-m="miss"></div></div>

      <h3 class="section-title">② 눈으로 — try/catch는 콜백이 돌기 <b>전에</b> 사라진다 (애니메이션)</h3>
      <span class="learn-tag">📎 ▶ 다음 단계 — main(try/catch)이 pop되어 사라진 <b>뒤에야</b> 콜백이 빈 콜스택에서 실행 → 안전망 없음</span>
      <div data-m="elv"></div>

      <h3 class="section-title">③ 그럼 어떻게 잡나 — <code>.catch()</code> · <code>async/await + try/catch</code></h3>
      <span class="learn-tag">📎 ▶ — Promise 에러는 .catch로, 혹은 await + try/catch로 잡힌다(await가 rejection을 그 자리서 다시 throw)</span>
      <div class="card"><div class="file-label">🔬 (1) .then / .catch &nbsp; (2) async·await + try/catch</div><div data-m="fix"></div></div>
      <div data-m="qz-catch"></div>

      <h3 class="section-title">④ 경계·대비 — 어떤 에러가 어디서 잡히나</h3>
      <div class="card">
        <table class="fit-table" style="width:100%"><tbody>
          <tr><td><b>동기 <code>throw</code></b><span>콜스택을 타고 전파 → 바깥 <code>try/catch</code>가 <b>잡음</b> ✅ (에러 처리 강의)</span></td></tr>
          <tr><td><b><code>setTimeout</code> 콜백의 <code>throw</code></b><span>빈 콜스택에서 나중에 → 바깥 try/catch <b>못 잡음</b> ❌ → <b>콜백 안에</b> try/catch를 넣어야</span></td></tr>
          <tr><td><b>Promise <code>reject</code></b><span><code>.catch()</code>로 잡거나, <code>await</code>했다면 <code>try/catch</code>로 <b>잡음</b> ✅ (await가 다시 throw)</span></td></tr>
          <tr><td><b>안 잡은 Promise <code>reject</code></b><span>어디서도 <code>.catch</code>/try/catch 없음 → <b><code>unhandledrejection</code></b>(전역 경고)</span></td></tr>
        </tbody></table>
        <p class="section-desc" style="margin:8px 0 0">판별 한마디: <b>"이 에러가 터질 때, 그걸 감싼 try/catch가 <u>같은 콜스택에 아직 살아 있나</u>?"</b> — setTimeout 콜백은 아니오, <code>await</code>된 코드는 예.</p>
      </div>

      <h3 class="section-title">⑤ 🎯 정곡 예측</h3>
      <div data-m="qz-1"></div>
      <div data-m="qz-2"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><code>try/catch</code>는 <b>같은 콜스택에서 올라오는</b> 에러만 잡는다. <code>setTimeout</code> 콜백은 <b>빈 콜스택</b>에서 나중에 터지니 바깥 try/catch가 <b>이미 사라져</b> 못 잡는다 — <b>콜백 안에</b> 넣어야.
        Promise 에러는 <code>.catch()</code>나 <code>async·await + try/catch</code>로 잡는다(<code>await</code>가 rejection을 다시 throw). 아무도 안 잡은 Promise 실패는 <code>unhandledrejection</code>. <b>비동기 코드엔 항상 실패 경로를 설계하라.</b></p>
      </div>

      <div class="practice-cta"><span>동기 에러 처리 복습 —</span><button class="chip on" data-goto="errors">🛟 에러 처리(try/catch)</button><button class="chip on" data-goto="9">9강 · 화면 조작 →</button></div>
    `

    root.querySelector('[data-m="miss"]').append(Runner({ showBox: false, code: [
      'try {',
      '  setTimeout(() => {',
      '    print("콜백 시작 — 여긴 나중, 빈 콜스택")',
      '    null.x                       // 💥 여기서 터짐',
      '  }, 0)',
      '  print("try 블록 끝 — 콜백은 아직 큐에서 대기")',
      '} catch (e) {',
      '  print("catch: 잡았다! " + e.message)   // ← 이 줄은 절대 안 찍힌다',
      '}',
      'print("동기 코드 끝")',
      '// 순서: "try 블록 끝" → "동기 코드 끝" → (나중) "콜백 시작" → 💥 Uncaught',
      '//   catch는 콜백이 돌 땐 이미 사라져서, 에러가 그냥 새어 나간다(브라우저 콘솔로)',
    ].join('\n') }))

    root.querySelector('[data-m="elv"]').append(EventLoopViz({
      title: 'try/catch는 콜백이 돌기 전에 pop되어 사라진다',
      code: [
        'try {',
        '  setTimeout(() => { null.x }, 0)   // 🟠 매크로로 등록만',
        '  // try 블록 끝 (에러 없이 통과)',
        '} catch (e) { /* 잡길 기대 */ }',
        '// ↓ 나중, 빈 콜스택에서 콜백 실행',
      ],
      steps: [
        { line: 1, phase: 'sync', stack: ['main · try{ }catch'], micro: [], macro: ['() → null.x 💥'], out: [], note: '<code>setTimeout</code> — 콜백을 <b>🟠매크로 큐에 등록만</b> 하고 즉시 통과. 지금 <code>try/catch</code>는 main 위에 <b>살아 있지만</b>, 콜백은 <b>아직 안 돈다</b>(큐에서 대기).' },
        { line: 3, phase: 'sync', stack: ['main · try{ }catch'], micro: [], macro: ['() → null.x 💥'], out: ['try/catch 통과 (에러 없음)'], note: 'try 블록이 <b>에러 없이 정상 종료</b> → <code>catch</code>는 잡을 게 없어 <b>실행 안 됨</b>. 콜백은 여전히 큐에서 대기.' },
        { line: 4, phase: 'idle', stack: [], micro: [], macro: ['() → null.x 💥'], out: ['try/catch 통과 (에러 없음)'], note: '<b>main이 끝나 콜스택에서 pop</b> → <b>try/catch가 main과 함께 사라졌다.</b> 이제 콜백을 지켜 줄 안전망이 어디에도 없다.' },
        { line: 4, phase: 'drain-macro', stack: [{ label: 'timer 콜백 (try/catch 없음!)', from: 'macro' }], micro: [], macro: [], out: ['try/catch 통과 (에러 없음)', '💥 null.x — Uncaught!'], note: '콜백이 <b>텅 빈 콜스택</b> 위에서 실행 → <code>null.x</code> 터짐. 이 콜스택엔 <code>try/catch</code>가 <b>없다</b>(아까 그건 이미 소멸). → <b>Uncaught 에러</b>로 새어 나간다. 그래서 바깥 try/catch로는 절대 못 잡는다.' },
      ],
    }))

    root.querySelector('[data-m="fix"]').append(Runner({ showBox: false, code: [
      '// 가짜 실패 서버: ms 뒤에 reject하는 Promise',
      'function loadFail(ms) {',
      '  return new Promise((_, reject) => setTimeout(() => reject(new Error("서버 실패")), ms))',
      '}',
      '',
      '// (1) Promise 에러 — .catch 로',
      'loadFail(300)',
      '  .then((v) => print("성공: " + v))',
      '  .catch((e) => print("① .catch로 잡음: " + e.message))   // 여기로',
      '',
      '// (2) async/await — 평범한 try/catch 로 (await가 rejection을 다시 throw)',
      'async function go() {',
      '  try {',
      '    await loadFail(600)',
      '    print("성공")',
      '  } catch (e) {',
      '    print("② await + try/catch로 잡음: " + e.message)   // 여기로',
      '  }',
      '}',
      'go()',
    ].join('\n') }))

    root.querySelector('[data-m="qz-catch"]').append(Quiz({
      q: '왜 <code>await</code>한 에러는 <code>try/catch</code>로 잡히는데, <code>setTimeout</code> 콜백 에러는 안 잡히나?',
      options: [
        '<code>await</code>는 rejection을 <b>같은 함수 안에서 그 자리에 다시 throw</b>해 준다(같은 흐름) — setTimeout 콜백은 <b>딴 콜스택</b>이라 바깥 try/catch와 무관',
        '<code>setTimeout</code>은 원래 에러를 안 던지고 조용히 삼킨다',
        '<code>await</code>가 프로그램 전체를 멈춰서 그 사이 에러를 다 잡는다',
        '둘은 사실 똑같이 잡힌다 — 예제가 잘못됐다',
      ],
      answer: 0,
      explain: '<code>await</code> 뒷부분은 그 async 함수의 <b>이어지는 흐름</b>(디슈가하면 <code>.then</code> 콜백)이라, rejection이 오면 <code>await</code>가 <b>그 자리서 <code>throw</code>로 바꿔</b> 같은 함수의 <code>try/catch</code>에 걸린다. 반면 <code>setTimeout</code> 콜백은 <b>완전히 새 콜스택</b>에서 돌아 바깥 try/catch(이미 사라짐)와 아무 관계가 없다. <b>"터질 때 그 try/catch가 같은 콜스택에 살아 있나"</b>가 갈림.',
    }))

    root.querySelector('[data-m="qz-1"]').append(Quiz({
      q: '이 코드는 에러를 잡나?<pre class="err-code" style="color:inherit;background:transparent">try {\n  setTimeout(() => { throw new Error("펑") }, 0)\n} catch (e) {\n  print("잡음")\n}</pre>',
      options: [
        '못 잡는다 — 콜백은 나중에 <b>빈 콜스택</b>에서 터지고, 그땐 이 try/catch가 이미 pop됨 → Uncaught',
        '잡는다 — try가 setTimeout 전체를 감쌌으니 "잡음" 출력',
        '잡는다 — 0ms라 콜백이 try 안에서 바로 실행',
        '에러 자체가 안 난다',
      ],
      answer: 0,
      explain: '<code>setTimeout</code>은 콜백을 <b>큐에 넣고 즉시 통과</b> → try 블록은 에러 없이 끝나 catch는 놀다가 <b>사라진다</b>. 콜백은 한참 뒤 <b>빈 콜스택</b>에서 <code>throw</code> → 지켜 줄 try/catch가 없어 <b>Uncaught</b>. 잡으려면 <b>콜백 안에</b> try/catch를 넣어야 한다.',
    }))

    root.querySelector('[data-m="qz-2"]').append(Quiz({
      q: '<code>Promise.all</code>이 실패했다. 어떻게 잡나?<pre class="err-code" style="color:inherit;background:transparent">const r = Promise.all([okP, failP])\n// failP가 reject → all이 reject</pre>',
      options: [
        '<code>r.catch(e => …)</code> 또는 <code>try { await r } catch (e) { … }</code>',
        '<code>try { Promise.all([...]) } catch</code> 로 감싸면 잡힌다',
        '<code>Promise.all</code>은 실패해도 조용히 넘어가 잡을 필요 없다',
        '<code>.then</code>의 첫 번째 콜백에서 잡는다',
      ],
      answer: 0,
      explain: '<code>Promise.all</code>이 돌려주는 것도 <b>Promise</b>다 — 그 rejection은 다른 Promise 에러와 똑같이 <code>.catch()</code> 또는 <code>await</code> + <code>try/catch</code>로 잡는다. <b>동기 <code>try { Promise.all(...) }</code>로는 못 잡는다</b>(Promise를 만드는 동기 코드는 에러를 안 던짐 — 실패는 나중에 비동기로 온다). "터져도 끝까지 결과를 보고 싶다"면 애초에 <code>allSettled</code>를 쓰는 것도 방법.',
    }))

    wireGoto(root)
  }
})()
