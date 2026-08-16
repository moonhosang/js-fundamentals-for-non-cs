// 🔀 제어 흐름 · 조합과 중첩 (loop 쪽: 반복 × 조건 · 중첩 반복)
// cf-3(for 안의 if · 목록 거르기) · cf-4(for 안의 for · 격자·구구단). 인라인 드릴(계약테스트 무손상).
;(function () {
  window.Lessons = window.Lessons || {}
  const wireNav = (root) => root.querySelectorAll('[data-goto]').forEach((el) => {
    el.onclick = () => { const v = el.getAttribute('data-goto'); window.goLesson ? window.goLesson(/^\d+$/.test(v) ? Number(v) : v) : (location.hash = '#' + v) }
  })

  // ── FABLE-B: 아래에 window.Lessons['cf-3'](반복 × 조건)·['cf-4'](중첩 반복) 추가 ──

  // ── cf-3 · 반복 × 조건 — for 안의 if ──────────────────────
  window.Lessons['cf-3'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🔀 cf-3</span>
        <h2>반복 × 조건 — for 안의 if, 훑으면서 골라내기</h2>
        <p>실전에서 가장 많이 쓰는 조합. 목록을 <b>하나씩 훑으면서</b>(for) <b>조건에 맞는 것만</b>(if) 처리한다 — <code>for</code>가 매 바퀴 돌고, 그 안의 <code>if</code>가 <b>매 요소를 검사</b>한다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 먼저 짚기 (개별 문법은 링크만)</span>
        <p><code>for</code>가 도는 원리·<code>if</code>·배열 인덱스는 <b>이미 배웠다</b> — 여기선 <b>겹쳐 쓰기</b>만 새로 본다. 복습: <button class="inline-goto" data-goto="7">7강 · for·while</button> · <button class="inline-goto" data-goto="4">4강 · 조건</button> · <button class="inline-goto" data-goto="6">6강 · 배열</button>.</p>
      </div>

      <h3 class="section-title">📦 현실 그대로 — 검수대의 상자 하나씩</h3>
      <p class="section-desc">택배 검수대를 떠올려 보라. 컨베이어가 상자를 <b>한 개씩</b> 내 앞에 가져다 놓는다(= for가 요소를 하나씩). 나는 상자를 <b>열 때마다</b> "불량인가?" 확인한다(= if가 매 요소 검사). 불량이면 골라내고, 아니면 그냥 보낸다. 확인을 <b>딱 한 번만</b> 하고 나머지 상자를 안 열어 보면? 검수가 아니다 — 이 차이가 아래 '오해 정면돌파'다.</p>

      <h3 class="section-title">🔮 예측 — 스포일러 없이 먼저 찍어 보기</h3>
      <div data-m="qz-guess"></div>
      <div data-m="qz-count"></div>

      <h3 class="section-title">⏱ 시간 시뮬레이션 — if가 매 바퀴 다시 접힌다</h3>
      <span class="learn-tag">📎 바깥 for 조건은 7강 그대로 — 새로 볼 것은 <b>몸통 안 if가 요소마다 다시 접히는 시간</b>이다</span>
      <p class="section-desc"><b>다음 ▶을 눌러</b> 5바퀴를 그대로 밟아 보라. for가 요소를 가져올 때마다 if의 괄호 안 표현식이 <b>그 요소의 값으로</b> 새로 접힌다 — 참이면 print, 거짓이면 건너뜀.</p>
      <div class="card"><div class="file-label">🔬 for (let i = 0; i &lt; nums.length; i++) { if (nums[i] % 2 === 0) print(nums[i]) }  ·  nums = [1,2,3,4,5]</div><div data-m="sim"></div></div>

      <h3 class="section-title">⚠️ 오해 정면돌파 — if를 for '밖'에 두면?</h3>
      <span class="learn-tag">📎 밖의 if = 검사 <b>딱 한 번</b> · 안의 if = <b>매 요소</b> 검사 — 위치가 곧 횟수다</span>
      <p class="section-desc">입문자가 가장 자주 헷갈리는 지점: "if를 어디에 쓰든 알아서 다 검사해 주겠지?" 아니다. <b>if는 자기가 놓인 자리에서, 흐름이 지나갈 때만</b> 검사한다. for 밖에 두면 흐름이 한 번 지나가니 <b>한 번만</b>, for 안에 두면 매 바퀴 지나가니 <b>매 요소</b> 검사다. 직접 돌려서 확인하라.</p>
      <div class="card"><div class="file-label">🔬 밖의 if(한 번) vs 안의 if(매 요소) — 실행해 비교</div><div data-m="run-inout"></div></div>

      <h3 class="section-title">🔁 반복 드릴 — 훑으면서 세기·더하기</h3>
      <div data-m="drill"></div>

      <h3 class="section-title">🔗 출구 — 이 조합이 filter·map의 밑바탕</h3>
      <p class="section-desc">방금 쓴 "훑으면서 조건 맞는 것만" 패턴은 너무 흔해서 JS가 <b>도구로 만들어 뒀다</b> — <code>filter</code>가 정확히 이것(for + if + 담기)을 한 줄로 한다. 여기서 손으로 굴려 봤으니, 선언형 도구가 <b>속에서 뭘 하는지</b> 이제 보인다: <button class="inline-goto" data-goto="7">7강 · map·filter</button>.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>for가 요소를 하나씩 가져오고, 안의 if가 요소마다 다시 검사한다</b>(검사 n번 · 통과는 조건이 참인 것만). if를 밖에 두면 검사는 한 번뿐. 이 손 패턴이 <code>filter</code>의 정체다.</p>
      </div>

      <div class="practice-nav"><button class="chip" data-goto="cf">← 조합 개요</button><button class="chip on" data-goto="cf-4">다음 · cf-4 중첩 반복 →</button></div>
    `

    root.querySelector('[data-m="qz-guess"]').append(Quiz({
      q: '<code>let nums = [1,2,3,4,5]</code>를 for로 훑으며 <code>if (nums[i] % 2 === 0) print(nums[i])</code> — 화면엔 뭐가 찍힐까?',
      options: ['1, 3, 5', '2, 4', '1, 2, 3, 4, 5'],
      answer: 1,
      explain: 'for는 <b>다섯 요소 전부</b>를 가져오지만, if가 요소마다 <code>% 2 === 0</code>(짝수인가)를 검사해 <b>참인 2와 4만</b> print에 도달한다. 홀수 1·3·5는 검사에서 거짓 → 건너뜀.',
    }))
    root.querySelector('[data-m="qz-count"]').append(Quiz({
      q: '같은 코드에서 if의 괄호 안 검사는 <b>몇 번</b> 실행될까? (출력이 아니라 <b>검사</b> 횟수)',
      options: ['1번 — if는 원래 한 번', '2번 — 통과한 짝수만큼', '5번 — 요소마다 한 번씩'],
      answer: 2,
      explain: '<b>검사와 통과는 다르다.</b> if는 for 몸통 안에 있으니 <b>매 바퀴(5번) 검사</b>하고, 그중 <b>참이었던 2번만 통과</b>다. "통과 못 한 요소는 검사도 안 했겠지"가 흔한 착각 — 전부 검사됐고, 거짓이라 버려졌다.',
    }))

    // ⏱ 실제 경로 하나 — nums = [1,2,3,4,5], 짝수만 print. 매 바퀴 if가 그 요소 값으로 다시 접힌다.
    root.querySelector('[data-m="sim"]').append(ExprReduce({
      title: 'for + if — 5바퀴 전부 밟기  ·  nums = [1, 2, 3, 4, 5]',
      steps: [
        { code: 'nums = [1, 2, 3, 4, 5] ,  i = 0', note: '🚦 시작. 바깥 for는 7강에서 본 그대로 매 바퀴 <code>i &lt; nums.length</code>를 접는다. 오늘의 주인공은 <b>몸통 안의 if</b> — 요소마다 새로 접히는 걸 보라.' },
        { code: 'i < nums.length  →  0 < 5  →  ✅ 참  →  몸통으로', mark: 'i < nums.length', note: '<b>1바퀴</b> · 바깥 조건 <b style="color:var(--green)">참</b> → 몸통 실행. 몸통엔 if가 기다린다.' },
        { code: 'if ( nums[i] % 2 === 0 )     // i = 0', mark: 'nums[i] % 2 === 0', note: '몸통의 if — 괄호 안은 <b>표현식</b>. 먼저 <code>nums[0]</code>을 꺼낸다(0번 칸 → <b>1</b>).' },
        { code: 'if ( 1 % 2 === 0 )', mark: '1 % 2 === 0', note: '이번 요소 <b>1</b>로 검사한다. 나머지 연산 먼저: 1 % 2 = <b>1</b>.' },
        { code: 'if ( 1 === 0 )  →  ❌ 거짓  →  print 건너뜀', note: '<b style="color:var(--red)">거짓</b> → 1은 출력되지 않는다. 버려진 게 아니라 <b>검사받고 탈락</b>한 것. i++ → i = 1, 다시 바깥 조건으로.' },
        { code: 'i < nums.length  →  1 < 5  →  ✅ 참', mark: 'i < nums.length', note: '<b>2바퀴</b> · 이번 요소는 <code>nums[1]</code> = <b>2</b>. if가 <b>같은 검사를 새 값으로</b> 다시 한다.' },
        { code: 'if ( 2 % 2 === 0 )', mark: '2 % 2 === 0', note: '2 % 2 = <b>0</b> — 짝수는 2로 나눈 나머지가 0이다.' },
        { code: 'if ( 0 === 0 )  →  ✅ 참  →  print(2)', note: '<b style="color:var(--green)">참</b> → 처음으로 print 도달, 화면에 <b>2</b>. i++ → i = 2.' },
        { code: '3바퀴 · if ( 3 % 2 === 0 )  →  if ( 1 === 0 )  →  ❌ 거짓', mark: '3 % 2 === 0', note: '<code>nums[2]</code> = 3 → <b style="color:var(--red)">거짓</b> → 건너뜀. i = 3. 리듬이 잡히는가 — <b>요소가 바뀔 때마다 if가 새로 접힌다</b>.' },
        { code: '4바퀴 · if ( 4 % 2 === 0 )  →  if ( 0 === 0 )  →  ✅ 참  →  print(4)', mark: '4 % 2 === 0', note: '<code>nums[3]</code> = 4 → <b style="color:var(--green)">참</b> → 화면에 <b>4</b>. i = 4.' },
        { code: '5바퀴 · if ( 5 % 2 === 0 )  →  if ( 1 === 0 )  →  ❌ 거짓', mark: '5 % 2 === 0', note: '<code>nums[4]</code> = 5 → <b style="color:var(--red)">거짓</b> → 건너뜀. i++ → i = 5.' },
        { code: 'i < nums.length  →  5 < 5  →  ❌ 거짓  →  반복 종료', note: '<b style="color:var(--red)">거짓</b> → 끝. 최종 출력: <b>2, 4</b>. for는 <b>5바퀴 다</b> 돌았고(검사 5번), if가 그중 <b>2개만</b> 통과시켰다.' },
      ],
    }))

    root.querySelector('[data-m="run-inout"]').append(Runner({ showBox: false, code: [
      'let nums = [1, 2, 3, 4, 5]',
      '',
      '// ❌ if가 for 밖 — 검사는 지금 이 순간 딱 한 번',
      'if (nums[0] % 2 === 0) {      // nums[0]=1 → 거짓 → 통째로 건너뜀',
      '  for (let i = 0; i < nums.length; i++) print(nums[i])',
      '}',
      'print("밖의 if: 여기까지 출력 0개")',
      '',
      '// ✅ if가 for 안 — 흐름이 매 바퀴 if를 지나간다',
      'for (let i = 0; i < nums.length; i++) {',
      '  if (nums[i] % 2 === 0) print(nums[i])   // 2, 4',
      '}',
    ].join('\n') }))

    root.querySelector('[data-m="drill"]').append(Drill({
      pattern: '빈칸에 예측값을 넣어라 — 맞으면 true. (전부 for가 끝까지 훑고, 안의 if가 매 요소를 검사한다.)',
      problems: [
        { ask: '짝수는 몇 개? — c가 센다', code: 'let nums = [1, 2, 3, 4, 5], c = 0; for (let i = 0; i < nums.length; i++) { if (nums[i] % 2 === 0) c++ } print(c === ____)', expect: 'true', answer: '2', hint: '검사는 5번, c++는 2와 4에서만' },
        { ask: '3보다 큰 것만 더하면?', code: 'let nums = [1, 2, 3, 4, 5], sum = 0; for (let i = 0; i < nums.length; i++) { if (nums[i] > 3) sum += nums[i] } print(sum === ____)', expect: 'true', answer: '9', hint: '4와 5만 통과 → 4 + 5' },
        { ask: '글자 수 4 이상인 단어는 몇 개?', code: 'let words = ["fig", "kiwi", "apple"], c = 0; for (let i = 0; i < words.length; i++) { if (words[i].length >= 4) c++ } print(c === ____)', expect: 'true', answer: '2', hint: 'fig는 3글자라 탈락 — kiwi(4)·apple(5)만' },
        { ask: '검사 횟수와 통과 횟수는 다르다 — "검사,통과"로', code: 'let nums = [10, 25, 30, 45], checks = 0, hits = 0; for (let i = 0; i < nums.length; i++) { checks++; if (nums[i] % 10 === 0) hits++ } print(checks + "," + hits === ____)', expect: 'true', answer: '"4,2"', hint: '검사는 매 요소(4번), 10의 배수는 10·30(2번) — 따옴표!' },
      ],
    }))

    wireNav(root)
  }

  // ── cf-4 · 중첩 반복 — for 안의 for ──────────────────────
  window.Lessons['cf-4'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🔀 cf-4</span>
        <h2>중첩 반복 — for 안의 for, 바퀴 안에서 완주하는 바퀴</h2>
        <p>격자·구구단·좌표 — 2차원을 훑을 때 쓰는 조합. 핵심 감각은 하나다: <b>바깥이 한 바퀴 갈 때마다, 안쪽 for는 처음부터 끝까지 다 돈다</b>. 그래서 몸통은 바깥×안쪽 번 실행된다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 먼저 짚기 (개별 문법은 링크만)</span>
        <p>for 자체가 도는 원리는 <b>이미 배웠다</b> — 여기선 for를 <b>for 몸통 안에 넣으면</b> 시간이 어떻게 흐르는지만 본다. 복습: <button class="inline-goto" data-goto="7">7강 · for·while</button> · <button class="inline-goto" data-goto="6">6강 · 배열</button>.</p>
      </div>

      <h3 class="section-title">🏢 현실 그대로 — 3층 건물의 우편배달</h3>
      <p class="section-desc">3층 건물, 층마다 1~3호. 배달부는 <b>1층에서 1·2·3호를 다 돌고 나서야</b> 2층으로 올라간다. 2층에 오르면 어디부터? <b>다시 1호부터</b> — 1층에서 3호까지 갔다고 2층을 4호부터 돌 수는 없다(4호는 없다!). 바깥 for = 층 이동, 안쪽 for = 그 층의 호수 돌기. <b>층이 바뀔 때마다 호수는 1호부터 새로 시작</b> — 이게 중첩 반복의 전부다.</p>

      <h3 class="section-title">🔮 예측 — 스포일러 없이 먼저 찍어 보기</h3>
      <div data-m="qz-total"></div>
      <div data-m="qz-reset"></div>

      <h3 class="section-title">⏱ 시간 시뮬레이션 — 안쪽이 매번 처음부터 다시 도는 걸 눈으로</h3>
      <span class="learn-tag">📎 바깥 1바퀴 = 안쪽 for <b>완주 1회</b> · 바깥이 한 칸 가면 안쪽은 <code>let j = 1</code>부터 <b>새로 태어난다</b></span>
      <p class="section-desc"><b>다음 ▶</b>으로 바깥 3바퀴 × 안쪽 3바퀴 = 9번의 print를 그대로 밟아 보라. 특히 <b>i가 2로 바뀌는 순간 j가 어디서 시작하는지</b>를 노려보라.</p>
      <div class="card"><div class="file-label">🔬 for (let i = 1; i &lt;= 3; i++) { for (let j = 1; j &lt;= 3; j++) print(i + "," + j) }</div><div data-m="sim"></div></div>

      <h3 class="section-title">⚠️ 오해 정면돌파 — "안쪽 j는 왜 매번 1로 리셋되나?"</h3>
      <span class="learn-tag">📎 j가 리셋'되는' 게 아니다 — 바깥 몸통이 다시 실행되며 안쪽 for 문 <b>전체가 처음부터 다시 실행</b>되는 것</span>
      <p class="section-desc">"j가 3까지 갔는데 왜 4부터 안 이어져?"가 자연스러운 첫 질문이다. 답: 안쪽 <code>for (let j = 1; ...)</code>는 바깥 몸통 안의 <b>문(statement) 하나</b>일 뿐이다. 바깥이 한 바퀴 돌 때마다 몸통이 통째로 다시 실행되니, 안쪽 for도 <b><code>let j = 1</code>이라는 첫 글자부터</b> 다시 실행된다. 이어달리기가 아니라 <b>매번 새 경기</b>다 — 배달부가 새 층에서 1호부터 다시 도는 것처럼. 그리고 안쪽이 <b>끝까지 다 돌아야</b>(j &lt;= 3이 거짓이 돼야) 흐름이 바깥으로 빠져나가 i++가 실행된다.</p>
      <div class="card"><div class="file-label">🔬 진짜 도는 중첩 for — 구구단(2~3단) · 좌표 격자</div><div data-m="run-grid"></div></div>

      <h3 class="section-title">🔁 반복 드릴 — 총 몇 번 도는지 손에 붙이기</h3>
      <div data-m="drill"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>바깥 1바퀴마다 안쪽 for가 처음부터 끝까지 완주</b>한다(몸통 = 바깥×안쪽 번). j는 리셋'당하는' 게 아니라 안쪽 for 문이 <b>매번 새로 실행</b>되는 것. 격자·구구단·좌표 = 전부 이 패턴이다.</p>
      </div>

      <div class="practice-nav"><button class="chip" data-goto="cf">← 조합 개요</button><button class="chip on" data-goto="cf-5">다음 · cf-5 if × switch →</button></div>
    `

    root.querySelector('[data-m="qz-total"]').append(Quiz({
      q: '<code>for (let i = 1; i &lt;= 3; i++) { for (let j = 1; j &lt;= 3; j++) { print(i, j) } }</code> — 안쪽 몸통 print는 <b>총 몇 번</b> 실행될까?',
      options: ['3번 — 같이 한 바퀴씩 돈다', '6번 — 3번 + 3번', '9번 — 바깥 3 × 안쪽 3'],
      answer: 2,
      explain: '더하기(3+3)가 아니라 <b>곱하기</b>다. 바깥이 <b>한 바퀴 갈 때마다</b> 안쪽이 3바퀴를 <b>다</b> 돌기 때문 — i=1에서 3번, i=2에서 3번, i=3에서 3번 = <b>3 × 3 = 9번</b>.',
    }))
    root.querySelector('[data-m="qz-reset"]').append(Quiz({
      q: '위 코드에서 i가 1을 마치고 <b>2가 된 직후</b>, 안쪽 j는 어디서 시작할까?',
      options: ['이어서 4부터', '다시 1부터', '안쪽은 이미 끝나서 다시 안 돈다'],
      answer: 1,
      explain: '바깥 몸통이 다시 실행되면 그 안의 <code>for (let j = 1; ...)</code>도 <b>처음부터 다시 실행</b>된다 — j는 <b>다시 1부터</b>. 배달부가 2층에 올라가면 다시 1호부터 도는 것과 같다. 이어달리기가 아니라 매번 새 경기.',
    }))

    // ⏱ 실제 경로 하나 — i=1~3 × j=1~3, 9번의 print. 리셋(재실행)을 눈으로.
    root.querySelector('[data-m="sim"]').append(ExprReduce({
      title: '중첩 for — 바깥 3바퀴 × 안쪽 완주 3회',
      steps: [
        { code: 'i = 1   (바깥 1바퀴 시작)', mark: 'i = 1', note: '🚦 바깥 for가 첫 바퀴. 몸통을 열어 보면 통째로 <b>안쪽 for 문</b>이다 — 이제 안쪽 for가 <code>let j = 1</code>부터 실행된다.' },
        { code: 'i = 1 :  j = 1  →  print("1,1")', mark: 'j = 1', note: '안쪽 1바퀴. 조건 <code>j &lt;= 3</code>은 <b style="color:var(--green)">참</b>(1 ≤ 3) → 몸통 실행 → j++.' },
        { code: 'i = 1 :  j = 2  →  print("1,2")', mark: 'j = 2', note: '안쪽 2바퀴 — 바깥 i는 <b>1에 멈춘 채</b> 안쪽만 돌고 있다.' },
        { code: 'i = 1 :  j = 3  →  print("1,3")', mark: 'j = 3', note: '안쪽 3바퀴. j++ → j = 4.' },
        { code: 'i = 1 :  j <= 3 ?  4 <= 3  →  ❌ 거짓  →  안쪽 for 종료', mark: '4 <= 3', note: '<b style="color:var(--red)">거짓</b> → 안쪽 for가 <b>완주</b>했다. 그제서야 흐름이 바깥으로 빠져나가 i++ → i = 2.' },
        { code: 'i = 2 :  안쪽 for 문을 처음부터 다시  →  let j = 1', mark: 'let j = 1', note: '★ 오늘의 핵심 장면. j는 4에서 이어지지 않는다 — 바깥 몸통이 다시 실행되며 안쪽 for 문이 <b><code>let j = 1</code>부터 새로 실행</b>된다(2층 → 다시 1호부터).' },
        { code: 'i = 2 :  j = 1 → "2,1"   j = 2 → "2,2"   j = 3 → "2,3"', mark: 'j = 1', note: '안쪽이 또 <b>처음부터 끝까지 3바퀴</b>. 완주 후 4 ≤ 3 <b style="color:var(--red)">거짓</b> → i++ → i = 3.' },
        { code: 'i = 3 :  j = 1 → "3,1"   j = 2 → "3,2"   j = 3 → "3,3"', mark: 'j = 1', note: '마지막 바깥 바퀴에도 안쪽은 어김없이 <b>새로 태어나 완주</b>한다. i++ → i = 4.' },
        { code: 'i <= 3 ?  4 <= 3  →  ❌ 거짓  →  전체 종료', note: '<b style="color:var(--red)">거짓</b> → 끝. print는 총 <b>3 × 3 = 9번</b> — 바깥 1바퀴 = 안쪽 완주 1회였다.' },
      ],
    }))

    root.querySelector('[data-m="run-grid"]').append(Runner({ showBox: false, code: [
      '// 구구단 — 바깥 한 바퀴(2단)가 다 끝나야 3단으로',
      'for (let dan = 2; dan <= 3; dan++) {',
      '  for (let n = 1; n <= 3; n++) {',
      '    print(dan + " x " + n + " = " + dan * n)',
      '  }',
      '}',
      '',
      '// 좌표 격자 — 줄(y) 하나마다 칸(x)을 처음부터 끝까지',
      'for (let y = 0; y < 3; y++) {',
      '  let row = ""',
      '  for (let x = 0; x < 3; x++) {',
      '    row += "(" + x + "," + y + ") "',
      '  }',
      '  print(row)   // 한 줄 완성 후에야 다음 줄',
      '}',
    ].join('\n') }))

    root.querySelector('[data-m="drill"]').append(Drill({
      pattern: '빈칸에 예측값을 넣어라 — 맞으면 true. (전부 반드시 끝나는 중첩 for — 총 횟수는 곱셈이 기본.)',
      problems: [
        { ask: '총 몇 번 도나 — c가 센다', code: 'let c = 0; for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) { c++ } } print(c === ____)', expect: 'true', answer: '9', hint: '바깥 3 × 안쪽 3' },
        { ask: '바깥 2 × 안쪽 4면?', code: 'let c = 0; for (let i = 0; i < 2; i++) { for (let j = 0; j < 4; j++) { c++ } } print(c === ____)', expect: 'true', answer: '8', hint: '더하기(2+4=6)가 아니라 곱하기' },
        { ask: '마지막으로 기록된 "i,j" 조합은?', code: 'let last = ""; for (let i = 1; i <= 2; i++) { for (let j = 1; j <= 2; j++) { last = i + "," + j } } print(last === ____)', expect: 'true', answer: '"2,2"', hint: '1,1 → 1,2 → 2,1 → 2,2 — 마지막 조합. 문자열이니 따옴표!' },
        { ask: '안쪽 한도가 바깥 i를 따라가면? (j <= i)', code: 'let c = 0; for (let i = 0; i < 3; i++) { for (let j = 0; j <= i; j++) { c++ } } print(c === ____)', expect: 'true', answer: '6', hint: 'i=0→1번, i=1→2번, i=2→3번 — 1+2+3 (계단 모양)' },
      ],
    }))

    wireNav(root)
  }
})()
