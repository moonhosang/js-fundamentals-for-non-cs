// ⏳ 뿌리 — 이벤트 루프는 왜 있나 (프로세스·스레드·싱글 스레드부터)
// async 트랙의 최하층 '왜'. setTimeout/Promise가 '어떻게'라면, 여긴 그게 애초에 왜 필요한가.
//
// 오해: JS는 여러 일을 (멀티스레드로) 진짜 동시에 처리한다 · 스레드/프로세스는 어려운 CS 용어라 나완 무관
// 왜:   JS를 실행하는 일꾼(스레드)은 '한 명' → 콜스택도 하나 → 오래 걸리는 일을 붙잡으면 전부 멈춤(블로킹)
//        → 느린 일은 브라우저에 '위임'하고, 콜스택 비면 맡긴 결과를 큐에서 꺼내 실행(그 반복이 이벤트 루프)
// 대비: 싱글 스레드(한 명·레이스 없음·대신 위임 필요) vs 멀티스레드(여럿·진짜 병렬·대신 락 지옥)

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  window.Lessons['eventloop'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">⏳ 뿌리</span>
        <h2>이벤트 루프는 <b>왜</b> 있나 — 스레드·프로세스부터</h2>
        <p>앞으로 배울 <code>setTimeout</code>·<code>Promise</code>는 이벤트 루프가 <b>어떻게</b> 도는지다. 그 전에 <b>애초에 왜 이런 게 필요한가</b>를 판다.
        답은 딱 하나 — <b>JS를 실행하는 일꾼이 한 명뿐</b>이라서. 그 말을 이해하려면 <b>프로세스·스레드</b>부터 봐야 한다(전공 아니어도 5분이면 된다).</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p>JS 코드를 실제로 실행하는 <b>일꾼(스레드)은 한 명</b> → <b>콜스택도 하나</b>다. 한 명이라 <b>오래 걸리는 일을 붙잡고 기다리면 나머지가 전부 멈춘다</b>(블로킹 = 화면 얼음).
        그래서 느린 일(타이머·네트워크)은 <b>브라우저에게 맡기고(위임)</b> 다음 줄로 넘어간다. 맡긴 일이 끝나면 그 콜백이 <b>큐</b>에 쌓이고, <b>콜스택이 비는 순간</b> 하나 꺼내 실행 — <b>이 "비면 꺼내 실행"을 영원히 반복하는 게 이벤트 루프</b>다.</p>
      </div>

      <h3 class="section-title">① 프로그램 · 프로세스 · 스레드 — 이 셋부터 (제로에서)</h3>
      <span class="learn-tag">📎 프로그램=레시피(파일) · 프로세스=요리 중인 식당 한 채(메모리 공간) · 스레드=그 안에서 실제로 요리하는 요리사(콜스택)</span>
      <div class="card">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px" class="el-cols">
          <div>
            <div style="border:2px solid var(--muted);border-radius:12px;padding:12px">
              <div style="font-weight:800;margin-bottom:8px">🖥️ 컴퓨터</div>
              <div style="border:2px solid #6366f1;border-radius:10px;padding:10px;background:var(--brand-soft)">
                <div style="font-weight:800;color:#6366f1">📦 프로세스</div>
                <div class="section-desc" style="margin:4px 0 8px">실행 <b>중인</b> 프로그램. <b>자기만의 메모리 공간</b>(우리가 배운 <b>스택+힙</b>)을 통째로 가진다. 크롬 탭 하나 = 프로세스 하나쯤.</div>
                <div style="position:relative;margin:0 12px 12px 0">
                  <div style="border:2px solid #0891b2;border-radius:8px;padding:8px;background:var(--panel);position:relative;z-index:2;box-shadow:6px 6px 0 0 var(--panel),6px 6px 0 2px #67e8f9,12px 12px 0 0 var(--panel),12px 12px 0 2px #a5f3fc">
                  <div style="font-weight:800;color:#0e7490">🧵 스레드 (일꾼) <span style="font-weight:600;font-size:12px;color:#0891b2">— 겹친 카드 = 일꾼이 여럿(멀티스레드)</span></div>
                  <div class="section-desc" style="margin:4px 0 0">코드를 <b>실제로 한 줄씩 실행</b>하는 손. <b>콜스택이 스레드마다 하나</b>(5강 콜스택 = 이 스레드의 실행 기록). <b>뒤에 겹쳐 보이는 게 그 여러 명</b> — 일꾼이 여럿이면 멀티스레드.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style="border:2px dashed var(--border);border-radius:12px;padding:12px;height:100%">
              <div style="font-weight:800;margin-bottom:8px">🍳 같은 걸 식당으로</div>
              <table class="fit-table" style="width:100%"><tbody>
                <tr><td><b>📜 프로그램</b><span>레시피 종이 (디스크에 저장된 코드 파일 — 아직 안 움직임)</span></td></tr>
                <tr><td><b>📦 프로세스</b><span>그 레시피로 <b>영업 중인 식당 한 채</b> — 주방·냉장고·공간(=메모리)을 다 갖춤. 같은 레시피로 두 채 열면 프로세스 둘</span></td></tr>
                <tr><td><b>🧵 스레드</b><span>그 식당 안에서 <b>실제로 요리하는 요리사</b>. 손이 곧 콜스택. 요리사 여럿 = 멀티스레드</span></td></tr>
              </tbody></table>
            </div>
          </div>
        </div>
      </div>
      <div data-m="qz-thread"></div>

      <h3 class="section-title">② JS는 <b>요리사가 한 명</b> — 싱글 스레드 (콜스택 하나)</h3>
      <p class="section-desc" style="margin-top:0">브라우저에서 우리 JS를 실행하는 <b>메인 스레드는 딱 하나</b>다. 요리사 한 명 = <b>한 번에 한 접시</b>. 5강에서 본 콜스택이 <b>이 한 명의 작업대</b>고, 그게 유일하다. 함수를 아무리 많이 불러도 <b>같은 한 스택</b>에 쌓였다 빠질 뿐 — 두 줄을 진짜 동시에 실행하는 일은 없다.</p>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "JS는 (멀티스레드로) 여러 일을 진짜 동시에 한다"</div>
        <p class="section-desc" style="margin:0"><b>아니다.</b> JS 메인 스레드는 <b>한 명</b>이라 <b>진짜 병렬</b>은 못 한다. setTimeout·네트워크가 "동시에 되는 것처럼" 보이는 건, 그 <b>느린 일을 브라우저(딴 일꾼)에게 맡겨</b> 두고 JS 요리사는 계속 다음 일을 하기 때문이다 — <b>번갈아</b> 하는 착시(concurrency)지, 요리사가 둘이 된 게(parallelism) 아니다.</p>
      </div>

      <h3 class="section-title">③ 그래서 붙잡으면 다 멈춘다 — 블로킹 직접 보라</h3>
      <span class="learn-tag">📎 ▶ 실행 → ②가 뜰 때까지 ~1.5초, 그동안 이 페이지 전체가 <b>얼어붙는다</b>(스크롤·클릭 안 먹음). 요리사 한 명이 붙잡혀서</span>
      <div class="card"><div class="file-label">🔬 한 명이 오래 붙잡으면? (busy-wait 블로킹)</div><div data-m="block"></div></div>
      <p class="section-desc">이래서 <b>느린 일을 콜스택에서 직접 기다리면 안 된다.</b> 서버 응답 3초를 이렇게 기다리면 3초간 화면이 죽는다. 해결이 다음 ④.</p>

      <h3 class="section-title">④ 해결 = <b>위임 + 이벤트 루프</b> (애니메이션)</h3>
      <span class="learn-tag">📎 ▶ 다음 단계 — setTimeout 콜백은 🌐 Web API(브라우저)로 <b>맡겨지고</b>, 타이머 끝나면 🟠 큐로 → 콜스택 비면 루프가 꺼내 실행</span>
      <div data-m="elv"></div>
      <p class="section-desc"><b>🌐 Web API</b> = 브라우저가 JS 대신 돌려 주는 '보조 주방'. 여기 맡기는 느린 일엔 <b>타이머</b>(<code>setTimeout</code>), <b>네트워크</b>(<code>fetch</code>·XHR), <b>DOM 이벤트</b>(클릭·입력 대기), <b>위치</b>(Geolocation) 등이 있다. JS 요리사는 맡기고 <b>안 기다린다</b> — 다 되면 콜백이 🟠 큐에 서고, <b>콜스택이 빌 때</b> 이벤트 루프가 꺼내 온다. <b>그래서 안 멈추고 번갈아</b> 돌아간다.</p>

      <h3 class="section-title">⑤ 왜 하필 한 명인가 — 싱글 스레드의 거래(trade-off)</h3>
      <div class="card">
        <table class="fit-table" style="width:100%"><tbody>
          <tr><td><b>🧵 싱글 스레드 (JS의 선택)</b><span>일꾼 하나 → <b>진짜 동시</b>는 못 함 → 느린 일은 <b>위임</b> 필요(이벤트 루프). <b>대신</b> 두 일꾼이 같은 값을 동시에 건드려 꼬이는 <b>데이터 레이스가 원천 봉쇄</b> — 단순·안전.</span></td></tr>
          <tr><td><b>🧵🧵 멀티 스레드</b><span>일꾼 여럿 → <b>진짜 병렬</b>로 빠름. <b>대신</b> 둘이 같은 메모리를 동시에 고치면 값이 깨져(<b>레이스</b>), 이를 막는 <b>락(lock)</b>이 복잡·버그 온상.</span></td></tr>
        </tbody></table>
        <p class="section-desc" style="margin:8px 0 0">JS는 <b>기본 실행을 한 스레드로</b> 두고 <b>단순함(레이스 없음)</b>을 택했다. 그 대가로 "안 멈추기"를 <b>이벤트 루프</b>가 책임진다. (진짜 병렬이 정말 필요하면? → 바로 아래 🔬 카드) <b>"왜 이렇게 만들었나"의 마지막 바닥이 이 거래다.</b></p>
      </div>
      <div class="card">
        <div class="file-label">🔬 한 겹 더 — 왜 멀티는 레이스가 나고, JS는 안 나나 (작업 '한 덩어리'와 끊기는 지점)</div>
        <p class="section-desc" style="margin:0 0 8px"><b>멀티스레드가 위험한 진짜 이유:</b> OS가 스레드를 <b>아무 명령어 사이에서나</b> 끊고 다른 스레드로 넘긴다(<b>preemptive</b> 스케줄링). 그래서 내 계산 <b>한 줄이 끝나기도 전에</b> 남이 끼어든다. 예를 들어 통장 잔고 더하기 한 줄도 사실 <b>3동작</b>이다:</p>
        <pre class="err-code" style="color:inherit;background:transparent;margin:0 0 8px">잔고 = 잔고 + 1000   // ① 잔고 읽기 → ② +1000 → ③ 다시 쓰기</pre>
        <p class="section-desc" style="margin:0 0 8px">두 창구 직원(스레드)이 <b>같은 통장</b>을 동시에 처리하면: A가 ①읽고(0) <b>…여기서 끊김…</b> B도 ①읽고(0)→③쓰기(1000), 다시 A가 ③쓰기(1000) → <b>B의 갱신이 덮여 사라진다.</b> 2000이어야 하는데 1000 (<b>lost update</b>). 이게 레이스.</p>
        <p class="section-desc" style="margin:0 0 8px"><b>JS 싱글스레드는?</b> 한 <b>작업 덩어리(태스크)를 끝까지</b> 다 돈 뒤에만 다음으로 넘어간다(<b>run-to-completion</b>). 내 함수가 도는 중엔 <b>아무도 못 끼어들어</b> 위 사고가 원천봉쇄 — 이게 싱글스레드의 진짜 혜택 <b>원자성(atomicity)</b>이다. <b>끊기는 지점이 '덩어리 사이'에만</b> 있는 셈.</p>
        <p class="section-desc" style="margin:0 0 8px">🧵 관통 원리: <b>레이스 = 「공유된 가변 상태」 × 「아무 데서나 끊기」</b> — 둘 다 있어야 터진다. JS는 <b>싱글스레드로 '끊기'를 없애고</b>, 진짜 병렬이 필요하면 <b>Web Worker</b>로 JS를 별도 스레드에서 돌리되 <b>메모리를 공유 안 하고 메시지(<code>postMessage</code>)로만</b> 주고받아 <b>'공유'를 없앤다</b> → 락 없이도 레이스 불가. 즉 <b>진짜 병렬을 포기한 게 아니라, 안전한 방식으로 따로 뺀 것.</b> (Web Worker는 이 커리큘럼 범위 밖 — 존재만 알아두기)</p>
        <p class="section-desc" style="margin:0;padding:8px 10px;background:var(--brand-soft,#eef2ff);border-radius:8px;font-size:13px"><b>⚠️ 용어 주의:</b> 이 "한 번에·끝까지 처리되는 작업 덩어리"를 <b>트랜잭션</b>이라 부르기도 한다. <b>단, DB의 트랜잭션과는 다른 맥락</b>이다 — DB 트랜잭션은 계좌이체처럼 <b>여러 작업을 묶어 "전부 성공 아니면 전부 취소"(commit/rollback·ACID)</b>를 보장하는 것. 여기선 그냥 <b>"스레드가 한 번에 처리하는 일 뭉치"</b> 정도의 뜻이다. (검색용 용어: critical section, preemptive vs cooperative 스케줄링)</p>
      </div>
      <div class="card" style="opacity:.92">
        <div class="file-label">🖥️ 참고 — 이건 '브라우저' 기준 (Node.js는 조금 다르다)</div>
        <p class="section-desc" style="margin:0">여기 🌐 Web API·큐는 <b>브라우저 환경</b> 이야기다. <b>Node.js</b>는 브라우저 대신 <b>libuv</b>라는 엔진으로 이벤트 루프를 돌리고(파일·네트워크 담당), <code>process.nextTick</code>·<code>setImmediate</code> 같은 <b>추가 큐</b>가 더 있다. 세부는 달라도 <b>뿌리 원리는 똑같다</b> — <b>한 스레드 + 콜스택 비면 큐에서 꺼내 실행</b>. 지금은 이 원리만 확실히 쥐면 된다.</p>
      </div>
      <div data-m="qz-block"></div>
      <div data-m="qz-why"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>JS 일꾼(스레드)은 한 명 → 콜스택 하나.</b> 한 명이라 오래 걸리는 일을 붙잡으면 <b>전부 멈춘다(블로킹)</b>. 그래서 느린 일은 <b>브라우저(🌐 Web API)에 위임</b>하고 다음 줄로 —
        맡긴 일이 끝나면 콜백이 <b>큐</b>에 서고 <b>콜스택이 빌 때</b> 꺼내 실행. <b>이 반복이 이벤트 루프.</b> 싱글 스레드는 <b>레이스 없는 단순함</b>을 얻고 그 대가로 이벤트 루프가 <b>안 멈춤</b>을 책임진다.</p>
      </div>

      <div class="practice-cta"><span>이제 실제 도구로 —</span><button class="chip on" data-goto="async">⏳ 비동기(setTimeout·Promise) →</button></div>
    `

    root.querySelector('[data-m="qz-thread"]').append(Quiz({
      q: '브라우저에서 <b>내 JS 코드를 실제로 한 줄씩 실행하는 일꾼(메인 스레드)</b>은 몇 개인가?',
      options: [
        '<b>하나</b> — 그래서 콜스택도 하나, 한 번에 한 줄',
        '함수마다 하나씩 — 부를 때마다 새 스레드',
        'CPU 코어 수만큼 — 알아서 나눠 병렬 실행',
        '무제한 — 필요하면 계속 늘어난다',
      ],
      answer: 0,
      explain: 'JS 메인 스레드는 <b>하나</b>다(요리사 한 명). 그래서 콜스택도 하나고 <b>한 번에 한 줄</b>만 실행한다. 함수를 많이 불러도 <b>같은 한 스택</b>에 쌓였다 빠질 뿐. 이 "한 명" 때문에 블로킹·위임·이벤트 루프가 전부 따라온다.',
    }))

    root.querySelector('[data-m="block"]').append(Runner({ showBox: false, code: [
      'print("① 시작")',
      '',
      '// 아래 while이 콜스택을 "붙잡고" 안 놓는다 — 요리사 한 명이 묶인다',
      'const 끝 = Date.now() + 1500',
      'while (Date.now() < 끝) {}   // 1.5초간 아무 일도 못 하게 막음(블로킹)',
      '',
      'print("② 1.5초 뒤에야 이 줄 — 그동안 페이지가 얼어 있었다")',
      '// setTimeout은 이렇게 안 막는다(브라우저에 위임) — 그게 ④',
    ].join('\n') }))

    root.querySelector('[data-m="elv"]').append(EventLoopViz({
      title: '위임 → 이벤트 루프: setTimeout 콜백은 🌐 Web API를 거쳐 🟠 큐로',
      showLoop: true, // 🔄 이벤트 루프 인디케이터 예시 — 주인공을 눈에 보이게(규칙, 일꾼 아님)
      code: [
        'print("주문 시작")                        // 동기',
        'setTimeout(() => print("배달 도착"), 1000) // 🌐 브라우저에 타이머 위임',
        'print("다음 손님 받기")                    // 동기 — 안 기다림',
        '// 콜스택 빔 · 타이머 아직 안 끝남 → 대기',
        '// (1초 뒤) 타이머 끝 → 콜백을 🟠 큐로',
        '// 콜스택 빔 → 루프가 큐에서 꺼내 실행',
      ],
      steps: [
        { line: 0, phase: 'sync', stack: ['main'], webapi: [], macro: [], out: ['주문 시작'], note: '<code>print("주문 시작")</code> — 동기라 <b>콜스택(요리사)에서 지금</b> 실행. Web API·큐 모두 비어 있다.' },
        { line: 1, phase: 'delegate', stack: ['main'], webapi: ['⏰ 1초 타이머 · () => print("배달 도착")'], macro: [], out: ['주문 시작'], note: '<code>setTimeout(_, 1000)</code> — 콜백을 <b>지금 실행하지 않고 🌐 Web API(브라우저)에 맡긴다</b>. 브라우저가 <b>딴 데서 1초를 센다</b>. JS 요리사는 안 기다리고 다음 줄로. <b>← 이게 "위임".</b>' },
        { line: 2, phase: 'sync', stack: ['main'], webapi: ['⏰ 타이머 진행 중 · () => print("배달 도착")'], macro: [], out: ['주문 시작', '다음 손님 받기'], note: '<code>print("다음 손님 받기")</code> — JS는 <b>안 멈추고 계속 일한다</b>. 타이머는 그동안 🌐 Web API에서 브라우저가 대신 센다. <b>(블로킹 없음!)</b>' },
        { line: 3, phase: 'idle', stack: [], webapi: ['⏰ 타이머 진행 중 · () => print("배달 도착")'], macro: [], out: ['주문 시작', '다음 손님 받기'], note: 'main이 끝나 <b>콜스택이 빔</b>. 하지만 <b>타이머가 아직 안 끝나</b> 큐는 비어 있다 — 이벤트 루프는 할 일 없이 돈다(대기).' },
        { line: 4, phase: 'idle', stack: [], webapi: [], macro: ['() => print("배달 도착")'], out: ['주문 시작', '다음 손님 받기'], note: '<b>1초 경과 → 타이머 끝!</b> 브라우저가 콜백을 🌐 Web API에서 꺼내 <b>🟠 매크로 큐로 옮긴다</b>. 이제 "실행 대기" 상태.' },
        { line: 5, phase: 'drain-macro', stack: [{ label: '콜백', from: 'macro' }], webapi: [], macro: [], out: ['주문 시작', '다음 손님 받기', '배달 도착'], note: '콜스택이 비어 있으니 <b>이벤트 루프가 🟠 큐에서 콜백을 꺼내 콜스택에 올려 실행</b> → "배달 도착" 출력. <b>이 왕복 전체(위임 → 대기 → 큐 → 스택)가 이벤트 루프.</b>' },
        { line: 5, phase: 'idle', stack: [], webapi: [], macro: [], out: ['주문 시작', '다음 손님 받기', '배달 도착'], note: '전부 비었다 — 끝. <b>한 명(싱글 스레드)이지만, 느린 일을 위임하고 큐에서 꺼내 쓰니 안 멈추고 번갈아</b> 처리했다.' },
      ],
    }))

    root.querySelector('[data-m="qz-block"]').append(Quiz({
      q: '아래를 실행하면, 그 3초 동안 페이지의 <b>버튼 클릭</b>은?<pre class="err-code" style="color:inherit;background:transparent">const 끝 = Date.now() + 3000\nwhile (Date.now() < 끝) {}   // 3초간 콜스택을 붙잡음</pre>',
      options: [
        '<b>안 먹는다</b> — 콜스택이 3초간 안 비어, 클릭 콜백을 큐에서 <b>못 꺼낸다</b>(화면 얼음)',
        '정상 작동한다 — 클릭은 while과 별개라 바로 처리',
        '클릭이 큐에 쌓였다가 while <b>도중에</b> 끼어들어 실행된다',
        '3초 뒤 밀린 클릭이 한꺼번에 안 되고 사라진다',
      ],
      answer: 0,
      explain: '이벤트 루프는 <b>콜스택이 빌 때만</b> 큐에서 다음 걸 꺼낸다. <code>while</code>이 3초간 콜스택을 붙잡으면 그 사이 클릭 이벤트 콜백은 큐에 <b>쌓이기만 하고 못 꺼내진다</b> → 화면이 완전히 언다(클릭·스크롤 무반응). ③에서 직접 본 그 현상. <b>run-to-completion</b>: 루프는 지금 task를 <b>중간에 못 끊는다</b>. (참고: 3초 뒤 콜스택이 비면 밀렸던 클릭들이 그제야 처리된다.)',
    }))

    root.querySelector('[data-m="qz-why"]').append(Quiz({
      q: '한 문장으로 — <b>이벤트 루프는 왜 존재하나?</b>',
      options: [
        '<b>일꾼 하나(싱글 스레드)로도 안 멈추고</b> 여러 일을 번갈아 처리하려고 — 느린 일은 위임하고, 콜스택 비면 큐에서 꺼내 실행',
        'JS를 여러 스레드로 <b>진짜 병렬</b> 실행하기 위해',
        '코드를 적힌 순서대로 <b>한 번에</b> 실행하기 위해',
        '메모리(스택·힙)를 자동으로 청소하기 위해(가비지 컬렉션)',
      ],
      answer: 0,
      explain: 'JS는 일꾼이 <b>한 명</b>이라, 느린 일을 직접 기다리면 전부 멈춘다. 그래서 <b>위임하고 → 콜스택 빌 때 큐에서 꺼내 실행</b>하는 <b>반복 장치</b>가 필요하다 — 그게 이벤트 루프. 목적은 <b>"한 명으로도 안 멈추기"</b>(concurrency). 진짜 병렬(②)도, 순서 보장도, GC도 아니다.',
    }))

    wireGoto(root)
  }
})()
