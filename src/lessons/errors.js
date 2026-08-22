// 🛟 에러 처리 (try / catch / finally) — 죽지 않고 붙잡기
// 8강에서 만난 "💥 TypeError 1위(undefined.x)" 를 실제로 다루는 법. 함수(5강)·객체(8강) 뒤.
//
// 오해: 에러가 나면 프로그램이 그냥 죽는다 · try만 쓰면 에러가 사라진다
// 왜:   에러는 던져지는(throw) 값 — try로 감싸 catch로 붙잡으면 죽지 않고 흐름을 이어간다
// 대비: try/catch로 잡음(흐름 계속) vs 안 잡음(콜스택 타고 올라가 프로그램 중단) · finally=항상 실행

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  window.Lessons['errors'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🛟 오류</span>
        <h2>에러 처리 — <code>try</code> <code>catch</code> <code>finally</code></h2>
        <p>8강에서 만난 그 <b>💥 TypeError</b>(<code>undefined.title</code>) — 실전에선 이게 나도 <b>프로그램이 죽으면 안 된다</b>.
        에러를 <b>붙잡아</b> 흐름을 잇는 도구가 <code>try/catch</code>다. 서버 응답·사용자 입력·JSON 파싱 어디에나 쓴다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p><b>에러는 "던져지는(throw) 값"이다.</b> <code>try</code>로 감싼 곳에서 에러가 던져지면 — 그 자리서 <b>즉시 <code>catch</code>로 점프</b>(try 안 나머지 줄은 건너뜀)해 <b>죽지 않고</b> 흐름을 잇는다.
        안 잡으면 에러는 <b>콜스택을 타고 위로 올라가</b>(전파) 아무도 안 잡으면 프로그램이 멈춘다. <code>finally</code>는 <b>잡히든 말든 항상</b> 실행.</p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "<code>try</code>로 감싸면 에러가 사라진다"</div>
        <p class="section-desc" style="margin:0"><b>아니다.</b> <code>try</code>는 에러를 <b>없애는 게 아니라 "붙잡을 준비"</b>일 뿐. 실제로 붙잡아 처리하는 건 <code>catch</code>다. 그리고 <b>붙잡았다고 문제가 해결된 것도 아니다</b> — catch 안에서 <b>무엇을 할지</b>(대체값·재시도·사용자 알림)를 당신이 정해야 한다. 빈 <code>catch (e) {}</code>는 에러를 <b>조용히 삼켜</b> 더 큰 버그를 부른다.</p>
      </div>

      <h3 class="section-title">① 에러가 흐름을 끊는다 — 직접 보라 (error-first)</h3>
      <span class="learn-tag">📎 ▶ 실행 → 진짜 에러 메시지를 눈으로. 이 줄에서 멈추고 아래 print는 안 돈다</span>
      <div class="card"><div class="file-label">🔬 안 잡으면? (💥 에러가 실행을 끊는다)</div><div data-m="uncaught"></div></div>

      <h3 class="section-title">② try / catch 로 붙잡기 — 죽지 않고 이어간다</h3>
      <span class="learn-tag">📎 같은 코드를 try로 감싸면 — 에러 지점에서 catch로 점프하고, 그 뒤 흐름은 계속된다</span>
      <div class="card"><div class="file-label">🔬 잡으면 흐름이 이어진다</div><div data-m="caught"></div></div>

      <h3 class="section-title">③ 에러도 값 — <code>e.name</code> · <code>e.message</code> · 내가 <code>throw</code></h3>
      <span class="learn-tag">📎 catch(e)의 e는 에러 객체 — 이름·메시지를 읽는다. 내 규칙 위반은 throw new Error(...)로 직접 던진다</span>
      <div class="card"><div class="file-label">🔬 에러 객체 읽기 · 직접 던지기</div><div data-m="throw"></div></div>

      <h3 class="section-title">④ 눈으로 — 안 잡은 에러는 콜스택을 타고 올라간다</h3>
      <span class="learn-tag">📎 ▶ — boom()이 던진 에러가 프레임을 pop하며 위로 전파 → main의 catch가 붙잡는다</span>
      <div data-m="mem"></div>

      <h3 class="section-title">⑤ finally — 항상 실행 (정리 담당)</h3>
      <span class="learn-tag">📎 try가 성공하든 catch로 잡히든 finally는 늘 돈다 — 파일 닫기·로딩 끄기 같은 '뒷정리'</span>
      <div class="card"><div class="file-label">🔬 finally는 언제나</div><div data-m="finally"></div></div>
      <div data-m="qz"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>에러 = 던져지는 값.</b> <code>try</code>로 감싸고 <code>catch (e)</code>로 붙잡아 <b>죽지 않고</b> 흐름을 잇는다(에러 지점서 catch로 점프).
        안 잡으면 <b>콜스택 위로 전파</b>돼 멈춤. <code>e.name</code>·<code>e.message</code>로 읽고, 내 규칙 위반은 <code>throw new Error("...")</code>로 던진다. <code>finally</code>는 항상. <b>빈 catch는 금지</b>(조용한 버그).</p>
      </div>

      <h3 class="section-title">⑥ 🎯 예측 드릴 — 손에 붙이자</h3>
      <p class="section-desc">매 문제, <b>에러가 던져지나? 잡히나? 그 뒤 흐름은?</b>을 예측하라. 사이드바 이 강의 아래 <b>쉬움·보통·어려움</b> 3단계:</p>
      <div class="practice-cta"><span>예측 드릴 —</span><button class="chip on" data-goto="errors:easy">🟢 쉬움</button><button class="chip on" data-goto="errors:normal">🟡 보통</button><button class="chip on" data-goto="errors:hard">🔴 어려움</button></div>

      <div class="practice-cta"><span>이 에러를 처음 만난 곳 —</span><button class="chip on" data-goto="8">8강 · 객체(TypeError 1위) →</button></div>
    `

    root.querySelector('[data-m="uncaught"]').append(Runner({ showBox: false, expectError: 'Cannot read properties', code: [
      'let user = { name: "민지" }   // job 키가 없다',
      '',
      'print("여기까진 실행")',
      'print(user.job.title)         // 💥 user.job은 undefined → undefined.title',
      'print("이 줄은 안 돈다")       // 위에서 끊겨 도달 못 함',
    ].join('\n') }))

    root.querySelector('[data-m="caught"]').append(Runner({ showBox: false, code: [
      'let user = { name: "민지" }',
      '',
      'try {',
      '  print(user.job.title)       // 💥 여기서 에러 → 즉시 catch로 점프',
      '  print("이 줄은 건너뜀")      // 실행 안 됨',
      '} catch (e) {',
      '  print("에러 잡음! 계속 진행")  // 여기로 점프',
      '}',
      'print("프로그램은 안 죽었다")   // 흐름이 이어진다',
    ].join('\n') }))

    root.querySelector('[data-m="throw"]').append(Runner({ showBox: false, code: [
      '// (1) 잡은 에러 객체 읽기',
      'try {',
      '  null.x',
      '} catch (e) {',
      '  print(e.name)      // "TypeError"',
      '  print(e.message)   // "Cannot read properties of null ..."',
      '}',
      '',
      '// (2) 내 규칙 위반은 직접 던진다',
      'function buy(stock) {',
      '  if (stock === 0) throw new Error("품절입니다")',
      '  return "구매 완료"',
      '}',
      'try {',
      '  print(buy(0))',
      '} catch (e) {',
      '  print("실패: " + e.message)   // "실패: 품절입니다"',
      '}',
    ].join('\n') }))

    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: '안 잡은 에러는 콜스택을 타고 올라간다 — boom() → main의 catch',
      stackLabel: '📚 스택 (콜스택)',
      code: ['function boom() { null.x }   // 여기서 던짐', 'try {', '  boom()', '} catch (e) { }              // main이 붙잡음'],
      steps: [
        { line: 2, stack: [{ name: 'main', slots: [] }, { name: 'boom', slots: [] }], heap: {}, note: '<code>boom()</code> 호출 → boom 프레임 push. main은 try 안에서 대기.', engine: 'main의 try 블록이 활성 — 예외 핸들러가 이 프레임에 등록돼 있다.' },
        { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'boom', slots: [] }], heap: {}, returning: { value: '💥 TypeError', discarded: false }, note: '<code>null.x</code> → boom 안에서 <b>에러가 던져진다</b>. boom엔 catch가 없다 → 에러가 <b>반환값처럼 통로로</b> 나오며 boom <b>pop</b>(정상 반환 아님).', engine: '예외 전파: boom 프레임에 핸들러 없음 → 프레임을 언와인드(unwind)하며 호출자로.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'e', value: '💥 TypeError', bad: true }] }], heap: {}, note: '에러가 <b>main까지 올라옴</b> → main의 <code>catch (e)</code>가 <b>붙잡는다</b>. e에 에러 객체가 담기고, 프로그램은 <b>안 죽는다</b>. (아무도 안 잡았다면 여기서 중단됐다.)', engine: '언와인딩이 try 블록을 만나 멈춤 — catch로 제어 이동, 에러 객체를 e에 바인딩.' },
      ],
    }))

    root.querySelector('[data-m="finally"]').append(Runner({ showBox: false, code: [
      'function load(ok) {',
      '  let loading = true',
      '  try {',
      '    if (!ok) throw new Error("실패")',
      '    return "성공"',
      '  } catch (e) {',
      '    return "실패 처리"',
      '  } finally {',
      '    loading = false          // 성공이든 실패든 로딩은 끈다',
      '    print("finally: loading = " + loading)',
      '  }',
      '}',
      'print(load(true))    // finally 먼저 → "성공"',
      'print(load(false))   // finally 먼저 → "실패 처리"',
    ].join('\n') }))

    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '함수 안에서 던진 에러를 그 함수가 안 잡으면 어떻게 되나?<pre class="err-code" style="color:inherit;background:transparent">function boom() { throw new Error("x") }\ntry { boom() } catch (e) { print("잡음") }</pre>',
      options: ['에러가 <b>콜스택을 타고 올라가</b> 호출부(main)의 catch가 잡는다 → "잡음"', 'boom 안에 catch가 없으니 프로그램이 즉시 죽는다', 'boom이 undefined를 반환하고 조용히 넘어간다'],
      answer: 0,
      explain: '에러는 <b>던진 함수가 안 잡으면 콜스택을 타고 위로 전파</b>된다. boom엔 catch가 없으니 호출부 main으로 올라가고, main의 <code>try/catch</code>가 붙잡아 "잡음"을 출력. <b>어느 단계서든 try/catch를 만나면</b> 거기서 멈춰 잡힌다 — 끝까지 아무도 안 잡을 때만 프로그램이 중단된다.',
    }))

    wireGoto(root)
  }
})()
