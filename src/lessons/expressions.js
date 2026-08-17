// 🌳 3강 표현식 — 식을 분해하는 눈. design-principles 규범(misconception-first).
// 한 페이지에 몰지 않고 '단계(3-1~3-6, 개념)'로 쪼갬 + 드릴(Practices[3], startAt:7 → 3-7~).
// 오해: "코드는 위→아래 한 줄씩만" · "if도 값을 낼 것 같다" · "긴 식은 통째로 마법처럼 계산"
// 진실: 표현식은 값을 낳음(문은 동작만) · 식은 나무처럼 중첩 · 안쪽·우선순위·좌→우로 한 겹씩 축약

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  // 단계 하단 내비게이션 (← 이전 / 스텝 N/6 / 다음 →)
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
      <span class="badge">🌳 ${badge}</span>
      <h2>${title}</h2>
      <p>${sub}</p>
    </header>`

  // ── 3강 랜딩 (개요 + 단계 안내) ──────────────────────────────
  window.Lessons[3] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">3강 · 표현식</span>
        <h2>표현식 — 식을 분해하는 눈</h2>
        <p>코드를 위→아래로만 읽으면 <code>const x = f1(1) * f2(a, fx(b))</code> 같은 한 줄 앞에서 막힌다.
        비밀은 — <b>식은 나무처럼 중첩</b>돼 있고, <b>안쪽부터 한 겹씩 값으로 접힌다</b>. 그 눈을 키운다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 이 강에서</span>
        <p><b>표현식(expression)</b>은 <b>값을 낳는다</b>. 식은 <b>중첩</b>되고(인자·피연산자도 표현식),
        <b>우선순위·안쪽·좌→우</b>로 <b>축약(reduction)</b>된다. (선수: 2강 연산자·우선순위)</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/식_(프로그래밍)" target="_blank" rel="noopener noreferrer">식(expression) ↗</a> · <a href="https://ko.wikipedia.org/wiki/연산자_(프로그래밍)" target="_blank" rel="noopener noreferrer">연산자 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — "코드는 한 줄씩 순서대로만"</div>
        <p class="section-desc" style="margin:0">한 줄 안이 <b>여러 겹</b>일 수 있다. <code>2 + 3 * 4</code>는 왼쪽부터가 아니라 <b>3*4가 먼저</b> 값이 된다.
        한 줄을 <b>나무로 쪼개 안쪽부터 계산</b>하는 눈이 없으면, 함수가 낀 긴 식에서 반드시 막힌다.</p>
      </div>

      <h3 class="section-title">📚 단계로 배웁니다 (한 번에 하나씩)</h3>
      <div class="home-grid">
        <button class="home-card" data-goto="3-1"><span class="home-card-title">3-1 · 식 vs 문</span><span class="home-card-sub">표현식은 값을 낳는다</span></button>
        <button class="home-card" data-goto="3-2"><span class="home-card-title">3-2 · 우선순위 눈금</span><span class="home-card-sub">factor ‹ term ‹ expression</span></button>
        <button class="home-card" data-goto="3-3"><span class="home-card-title">3-3 · 축약 ①</span><span class="home-card-sub">순수 계산 접기</span></button>
        <button class="home-card" data-goto="3-4"><span class="home-card-title">3-4 · 축약 ②</span><span class="home-card-sub">함수 · 중첩 삼항</span></button>
        <button class="home-card" data-goto="3-5"><span class="home-card-title">3-5 · 🔒 중첩 함수</span><span class="home-card-sub">좌→우·안쪽 (5강 후)</span></button>
        <button class="home-card" data-goto="3-6"><span class="home-card-title">3-6 · 조건도 표현식</span><span class="home-card-sub">if·for·while·switch</span></button>
        <button class="home-card" data-goto="3-7"><span class="home-card-title">3-7 · 요약</span><span class="home-card-sub">식을 나무로 보기</span></button>
      </div>

      <div class="practice-cta">
        <span>🎯 첫 단계부터 — <b>표현식은 값을 낳는다</b>.</span>
        <button class="chip on" data-goto="3-1">3-1 시작 →</button>
      </div>
    `
    wireGoto(root)
  }

  // ── 3-1 · 식 vs 문 ──────────────────────────────────────────
  window.Lessons['3-1'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('3-1 · 식 vs 문', "표현식은 '값을 낳는다'", '이 구분이 "여긴 왜 안 되지?"를 풀어 준다')}

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 이 단계의 의도</span>
        <p>JS의 모든 조각은 <b>둘 중 하나</b>다 — <b>값을 낳는 것(표현식)</b>이거나, <b>동작만 하는 것(문)</b>.
        이 눈이 <b>"이 자리에 뭘 놓을 수 있나"</b>를 결정한다. 없으면 <code>let x = if(...)</code> 같은 걸 써 보고 <b>왜 에러인지</b> 영영 못 푼다.</p>
      </div>

      <h3 class="section-title">① 현실 감각 — '답이 돌아오나?' vs '그냥 시키나?'</h3>
      <p class="section-desc"><b>표현식</b>은 <b>질문</b> 같다 — 물으면 <b>답(값)이 돌아온다</b>. "3 더하기 4는?" → <b>7</b>. "10이 3보다 큰가?" → <b>true</b>.
      <b>문</b>은 <b>명령</b> 같다 — 시키면 <b>동작</b>은 하지만, <b>손에 쥐여주는 값은 없다</b>: "x 상자에 5를 넣어라"(<code>let x = 5</code>), "점수가 높으면 이걸 해라"(<code>if</code>).</p>
      <div class="card">
        <div class="file-label">🔬 판별법 — print() 안에 넣어 보라. '값'이면 들어간다</div>
        <div data-m="e1-run"></div>
        <p class="section-desc" style="margin:10px 0 0">전부 <b>값</b>이 돌아오니 <code>print(…)</code> 안에 들어간다 → <b>표현식</b>.
        반대로 <code>print(let x = 5)</code>나 <code>print(if (a>0){})</code>는 <b>에러</b> — 문은 값이 아니라 <b>넣을 게 없다</b>.</p>
      </div>

      <h3 class="section-title">② 그래서 중요한 이유 — '값 자리'엔 표현식만</h3>
      <span class="learn-tag">📎 값이 필요한 자리(= 오른쪽 · return · \${ } · 함수 인자 · 배열 요소 · 삼항 가지)엔 '표현식'만 온다</span>
      <p class="section-desc">JS가 <b>값을 기다리는 자리</b>가 곳곳에 있다(아래 <em class="slot">값</em> = 표현식이 들어가야 하는 빈 칸). 그 칸엔 <b>값을 낳는 것(표현식)</b>만 놓을 수 있다:</p>
      <ul class="section-list">
        <li><code>let x = <em class="slot">값</em></code> — 대입의 오른쪽</li>
        <li><code>return <em class="slot">값</em></code> · <code>\`\${<em class="slot">값</em>}\`</code> — 돌려줄 값 · 문자열에 끼울 값</li>
        <li><code>Math.max(<em class="slot">값</em>, <em class="slot">값</em>)</code> · <code>[<em class="slot">값</em>, <em class="slot">값</em>]</code> — 함수 인자 · 배열 요소</li>
      </ul>

      <h3 class="section-title">③ 입문자가 꼭 걸리는 함정 — if는 문이다</h3>
      <p class="section-desc">영어·의사코드 감각으로 이렇게 써 보게 된다(자연스럽다). 하지만 <b>if는 문</b>이라 값을 안 내므로, <code>=</code>의 오른쪽(값 자리)에 <b>담을 게 없다</b>:</p>
      <div class="falsy-grid" style="margin-top:12px">
        <div class="card" style="margin:0"><div class="file-label" style="color:#dc2626">❌ if는 문 → 값이 아니라 = 오른쪽에 못 온다</div>
          <pre class="err-code" style="color:inherit;background:transparent">let grade = if (score>90) "A" else "B"
// SyntaxError: 여기엔 '값'이 와야 하는데
// if는 값이 아니다</pre></div>
        <div class="card" style="margin:0"><div class="file-label" style="color:#16a34a">✅ 삼항은 표현식 → 값이라 = 오른쪽에 온다</div>
          <pre class="err-code" style="color:inherit;background:transparent">let grade = score > 90 ? "A" : "B"
// "높으면 A, 아니면 B" 라는
// 하나의 '값'이 나온다</pre></div>
      </div>
      <p class="section-desc">🔑 <b>바로 이래서 삼항(<code>? :</code>)이 존재</b>한다 — "값이 되는 if"가 필요할 때 쓰라고 만든 것. 즉 <b>문(if)을 값 자리에 욱여넣지 말고, 값을 내는 표현식(삼항)을 써라</b>는 신호다. (<code>return</code>, <code>\`\${___}\`</code>, <code>map(n => ___)</code> 빈칸도 전부 같은 "값 자리".)</p>

      <div class="concept">
        <p class="concept-lead">🔎 그럼 <code>if</code>는 정확히 뭘 하나?</p>
        <p class="section-desc" style="margin-top:0"><code>if (조건) { … }</code>는 <b>"조건이 참이면 이 <code>{ }</code> 안을 실행해라"</b>는 <b>명령(문)</b>이다.
        하는 일은 <b>동작 — 갈림길에서 어느 블록을 실행할지 정하는 것</b>뿐. <b>그 자리에 값을 남기지 않는다</b>(그래서 <code>=</code> 오른쪽에 못 온다).
        반대로 <b>삼항은 갈림길의 결과를 <u>값으로 돌려준다</u></b> — 그래서 담을 수 있다. 아래 <b>다음 ▶</b>을 눌러, 삼항이 <b>3-6의 나무처럼 한 겹씩 값으로 접히는</b> 걸 보라(<code>if</code>엔 이렇게 남는 값이 없다):</p>
      </div>
      <div class="card"><div class="file-label">🔬 삼항이 '값'으로 접힌다 — score > 90 ? "A" : "B"   (score = 95)</div><div data-m="red-tern-fold"></div></div>

      <h3 class="section-title">④ 놓치기 쉬운 것 — 비교·논리도 '값'이다</h3>
      <span class="learn-tag">📎 <code>&lt; &gt; ===</code> 나 <code>&amp;&amp; ||</code> 도 표현식 → 계산하면 값(대개 true/false)을 낳는다. if 안에서만 사는 게 아니다</span>
      <p class="section-desc">입문자는 <code>age &gt; 5</code>, <code>a &amp;&amp; b</code>를 "if에 쓰는 조건"으로만 본다. 하지만 이것도 <b>표현식</b> — <b>계산하면 값(참/거짓)이 나오고</b>, 그 값을 <b>변수에 담고 · print하고 · 이어붙일</b> 수 있다. "표현식은 계산 결과 그 자체를 돌려준다"가 핵심이다.</p>
      <div class="card">
        <div class="file-label">🔬 비교·논리 결과도 '값' — 변수에 담기고 print된다</div>
        <div data-m="e1b-run"></div>
      </div>
      <p class="section-desc">🔑 마지막 <code>true &lt; true &amp;&amp; true</code>가 <b>false라는 하나의 값</b>이 되는 게 포인트 — 이상해 보여도 표현식이라 <b>우선순위대로 접혀(→ 3-2·3-3) 값 하나</b>가 된다: <code>&lt;</code>가 <code>&amp;&amp;</code>보다 먼저 → <code>(true&lt;true) &amp;&amp; true</code> → <code>false &amp;&amp; true</code> → <b>false</b>.</p>
      <p class="section-desc" style="opacity:.78">※ 참고(나중에): <code>&amp;&amp;</code>·<code>||</code>는 사실 true/false가 아니라 <b>피연산자 중 하나</b>를 돌려준다 — <code>0 || "손님"</code> → <code>"손님"</code>. 이것도 "값을 낳는다"의 한 얼굴(단락 평가).</p>
      ${nav(3, 1, '3-2')}
    `
    root.querySelector('[data-m="e1-run"]').append(Runner({
      showBox: false,
      code: [
        'print(3 + 4)                    // 7     (계산 → 값)',
        'print(10 > 3)                   // true  (비교 → 값)',
        'print(10 > 3 ? "큼" : "작음")     // "큼"   (삼항 → 값!)',
        'print("kim".toUpperCase())       // "KIM" (메서드 호출 → 값)',
        'print(Math.max(2, 7, 5))         // 7     (함수 호출 → 값)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="e1b-run"]').append(Runner({
      showBox: false,
      code: [
        'let ok = 10 > 3',
        'print(ok)                    // true   (비교 결과를 변수에 담았다)',
        'print(5 > 3 && 2 < 4)         // true   (논리도 값)',
        'let canEnter = 20 >= 18 && 5 > 0',
        'print(canEnter)              // true   ("조건"이 아니라 "값")',
        'print(true < true && true)   // false  (이상해 보여도 하나의 값!)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="red-tern-fold"]').append(ExprReduce({
      title: 'score > 90 ? "A" : "B"   // score = 95',
      steps: [
        { code: 'let grade = 95 > 90 ? "A" : "B"', mark: '95 > 90', note: '삼항도 <b>표현식</b> → 안쪽 <b>조건부터</b> 접는다. <b>95 &gt; 90</b> 은 <b>true</b>.' },
        { code: 'let grade = true ? "A" : "B"', mark: 'true ? "A" : "B"', note: '조건이 <b>true</b> → <code>?</code>(then) 쪽 값 <b>"A"</b>를 고른다. <code>: "B"</code>는 버린다.' },
        { code: 'let grade = "A"', note: '삼항이 <b>하나의 값 "A"</b>로 접혔다 → grade에 담긴다. <b>if였다면 이 자리에 남는 값이 없어</b> 못 담는다 — 이게 문(if)과 식(삼항)의 갈림.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 3-2 · 우선순위 눈금 ─────────────────────────────────────
  window.Lessons['3-2'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('3-2 · 우선순위 눈금', 'factor ‹ term ‹ expression', '무엇이 먼저 묶이나 — 단계로 켜 본다')}
      <div data-m="qz32"></div>
      <span class="learn-tag">📎 ▶를 누르면 눈금이 아래→위로 하나씩 켜지고, 식이 그 층으로 묶이는 걸 보라</span>
      <p class="section-desc">식이 중첩될 때 <b>어느 조각이 먼저 묶이는지</b>를 정하는 게 우선순위다. 세 층으로 본다(<b>아래로 갈수록 강하게</b> 묶는다):</p>
      <div class="tier">
        <div class="tier-row" data-tier="expression"><span class="tier-name">expression<br><small>식</small></span>
          <span class="tier-desc"><code>+ -</code> 까지 묶은 전체 — <code>2 + 3*4 - 1</code> (가장 <b>약하게</b> 묶음 = 맨 마지막)</span></div>
        <div class="tier-row" data-tier="term"><span class="tier-name">term<br><small>항</small></span>
          <span class="tier-desc"><code>* / %</code> 로 묶인 덩어리 — <code>3 * 4</code> (덧셈보다 <b>먼저</b>)</span></div>
        <div class="tier-row" data-tier="factor"><span class="tier-name">factor<br><small>원자</small></span>
          <span class="tier-desc">더 못 쪼개는 값 — 리터럴 <code>3</code> · 변수 <code>price</code> · <code>(괄호식)</code> · <code>함수호출()</code> (가장 <b>강함</b>)</span></div>
      </div>
      <div class="card">
        <div class="file-label">🔬 눈금이 하나씩 켜진다 — 2 + 3 * 4 - 1 을 계층으로 묶기</div>
        <div data-m="group"></div>
      </div>
      <div class="card">
        <div class="file-label">🔬 괄호가 눈금을 뒤집는다 (직접 실행)</div>
        <div data-m="e2-run"></div>
      </div>

      <h3 class="section-title">③ 같은 규칙의 '문법' 버전 — 생성규칙(BNF)</h3>
      <span class="learn-tag">📎 위 세 층을 형식 문법으로 적으면 — 컴파일러가 실제로 식을 읽는 규칙이다</span>
      <p class="section-desc">세 층은 사실 <b>세 개의 규칙</b>이다. <code>→</code>는 "왼쪽 이름은 오른쪽 중 <b>하나로 펼쳐진다</b>", <code>|</code>는 "또는"을 뜻한다:</p>
      <div class="bnf">
        <div class="bnf-rule"><span class="bnf-lhs">expression</span>→&nbsp; term&nbsp; <b>|</b>&nbsp; expression <b>(+ | -)</b> term</div>
        <div class="bnf-rule"><span class="bnf-lhs">term</span>→&nbsp; factor&nbsp; <b>|</b>&nbsp; term <b>(* | / | %)</b> factor</div>
        <div class="bnf-rule"><span class="bnf-lhs">factor</span>→&nbsp; 숫자 <b>|</b> 변수 <b>|</b> 함수호출(…) <b>|</b> <span class="bnf-rec">( expression )</span></div>
      </div>
      <p class="section-desc">여기서 <b>두 가지</b>가 전부를 설명한다:</p>
      <ul class="section-list">
        <li>🥇 <b>왜 <code>*</code>가 먼저?</b> — <code>term</code>(<code>* / %</code>)이 <code>expression</code>(<code>+ -</code>) <b>규칙 안쪽</b>에 있다. <b>문법 계층이 곧 우선순위</b>다(외울 필요 없음).</li>
        <li>🔁 <b>재귀</b> — <code>factor</code>의 마지막 <span class="bnf-rec">( expression )</span>: factor가 <b>다시 expression을 품는다</b>. 이 <b>되돌아가는 고리</b> 덕에 <code>((2+3)*4)</code>처럼 <b>괄호·중첩이 무한히</b> 된다. (이게 사용자가 말한 <code>expr → … | factor</code>, <code>factor → ( expr )</code> 그 자체.)</li>
      </ul>
      <div data-m="qz-bnf"></div>

      ${nav('3-1', 2, '3-3')}
    `
    const tiers = [...root.querySelectorAll('.tier-row')]
    const lightTier = (name) => tiers.forEach((r) => r.classList.toggle('tier-active', r.getAttribute('data-tier') === name))
    root.querySelector('[data-m="group"]').append(ExprReduce({
      title: '2 + 3 * 4 - 1 을 계층으로 묶기 (값이 아니라 "누가 먼저 묶이나")',
      onStep: (i, s) => lightTier(s.tier),
      steps: [
        { tier: 'factor', code: '2 + 3 * 4 - 1', note: '① <b>factor(원자)</b> — <b>2 · 3 · 4 · 1</b>. 더 못 쪼개는 값들. 여기서 출발.' },
        { tier: 'term', code: '2 + 3 * 4 - 1', mark: '3 * 4', note: '② <b>term(<code>* / %</code>)</b>이 가장 <b>강하게</b> 묶는다 → <b>3 * 4</b>가 한 덩어리.' },
        { tier: 'term', code: '2 + (3 * 4) - 1', mark: '(3 * 4)', note: 'term을 괄호로 묶어 보면 — 이 덩어리는 이제 <b>하나의 factor처럼</b> 취급된다.' },
        { tier: 'expression', code: '(2 + (3 * 4)) - 1', mark: '(2 + (3 * 4))', note: '③ <b>expression(<code>+ -</code>)</b> 층, <b>왼쪽부터</b> 묶는다.' },
        { tier: 'expression', code: '((2 + (3 * 4)) - 1)', note: '완성! 괄호 없이 쓴 식을 JS는 이렇게 <b>계층(나무)</b>으로 읽는다 — 그래서 <code>3*4</code>가 먼저다. (이제 값으로 접는 건 다음 3-3)' },
      ],
    }))
    root.querySelector('[data-m="e2-run"]').append(Runner({
      showBox: false,
      code: [
        'print(2 + 3 * 4)      // 14   (곱셈 먼저 → 2 + 12)',
        'print((2 + 3) * 4)    // 20   (괄호가 덧셈을 먼저로)',
        'print(10 - 2 - 3)     // 5    (뺄셈은 왼쪽부터: (10-2)-3)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="qz32"]').append(Quiz({ q: '<code>2 + 3 * 4</code> 의 값은?', options: ['20 (왼쪽부터)', '14 (곱셈 먼저)', '24'], answer: 1, explain: '<code>*</code>가 <code>+</code>보다 <b>우선순위가 높다</b> → 3*4=12 먼저, 그다음 2+12=<b>14</b>. 왼쪽부터가 아니다.' }))
    root.querySelector('[data-m="qz-bnf"]').append(Quiz({
      q: '문법에서 <code>factor → ( expression )</code> 이 규칙이 없다면 무슨 일이 생길까?',
      options: ['괄호 <code>( )</code> 로 우선순위를 못 바꾼다 (중첩 불가)', '아무 차이 없다', '곱셈이 안 된다'],
      answer: 0,
      explain: 'factor가 <b>다시 expression을 품는(재귀)</b> 이 한 줄이 있어서 <code>(2+3)*4</code>·<code>((…))</code>처럼 <b>괄호로 우선순위를 뒤집고 무한히 중첩</b>할 수 있다. 이 고리가 없으면 식은 한 겹짜리로 끝난다.',
    }))
    wireGoto(root)
  }

  // ── 3-3 · 축약 ① 순수 계산 ──────────────────────────────────
  window.Lessons['3-3'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('3-3 · 축약 ①', '한 겹씩 값으로 접기', '순수 계산 — 이게 컴퓨터가 식을 푸는 방식')}
      <span class="learn-tag">📎 ▶를 누르며 '이번에 줄어들 조각(강조)'이 값으로 바뀌는 걸 보라</span>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🧶 현실 감각 — 엉킨 실타래 / 단계별 산수</div>
        <p class="section-desc" style="margin:0">복합 표현식을 푸는 건 <b>엉킨 실타래를 한 올씩 푸는 것</b>과 같다 — 아무 데나 잡아당기면 더 엉킨다. <b>가장 안쪽·가장 급한 매듭(redex)</b>부터 하나씩 풀어야 한다. 결국 우리가 <b>산수를 단계별로</b>(곱셈 먼저, 그다음 덧셈…) 푸는 것과 똑같다 — 컴퓨터도 이렇게 <b>한 줄을 여러 단계로</b> 접는다.</p>
      </div>
      <p class="section-desc">복합 표현식은 <b>한 번에 한 조각(redex)</b>씩 값으로 <b>치환(축약)</b>되며 접혀 올라간다.</p>
      <div class="card"><div class="file-label">🔬 축약: 2 + 3 * 4 - 1</div><div data-m="red1"></div></div>
      ${nav('3-2', 3, '3-4')}
    `
    root.querySelector('[data-m="red1"]').append(ExprReduce({
      title: '2 + 3 * 4 - 1',
      steps: [
        { code: 'const total = 2 + 3 * 4 - 1', mark: '3 * 4', note: '가장 급한 건 <b>곱셈</b>(term) → <b>3 * 4</b>부터 값으로.' },
        { code: 'const total = 2 + 12 - 1', mark: '2 + 12', note: '이제 <code>+ -</code>만 남음. <b>왼쪽부터</b> → <b>2 + 12</b>.' },
        { code: 'const total = 14 - 1', mark: '14 - 1', note: '다음 조각 <b>14 - 1</b>.' },
        { code: 'const total = 13', note: '식이 <b>하나의 값</b>으로 접혔다 → total에 대입. 이게 축약의 끝.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 3-4 · 축약 ② 함수 낀 식 ─────────────────────────────────
  window.Lessons['3-4'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('3-4 · 축약 ②', '중첩되면 안쪽부터 — 함수든, 삼항이든', '인자도 가지도 표현식이라 안쪽부터 값이 된다')}
      <span class="learn-tag">📎 함수 인자·삼항 가지도 전부 표현식 → 안쪽이 먼저 값이 돼야 바깥이 접힌다</span>

      <h3 class="section-title">① 함수가 껴도</h3>
      <div class="card"><div class="file-label">🔬 축약: "hi " + Math.max(2, 3 * 2)</div><div data-m="red2"></div></div>

      <h3 class="section-title">② 삼항이 중첩돼도 — 중첩 삼항</h3>
      <p class="section-desc">삼항도 <b>표현식</b>이라, <b>삼항의 가지(<code>:</code> 뒤) 안에 또 삼항</b>이 올 수 있다 — 이게 <b>중첩 삼항</b>(점수→등급처럼 여러 갈래에 쓴다).
      삼항은 <b>오른쪽 결합</b>: <code>a ? b : c ? d : e</code> = <code>a ? b : (c ? d : e)</code> — <b>else(:) 쪽이 통째로 또 하나의 삼항</b>이다.</p>
      <div class="card"><div class="file-label">🔬 축약: score>=90 ? "A" : score>=80 ? "B" : "C"  (score=85)</div><div data-m="red-tern"></div></div>
      <div class="card"><div class="file-label">🔬 직접 바꿔 실행 — score를 95·75·50으로 바꿔 보라</div><div data-m="tern-run"></div></div>

      <h3 class="section-title">③ 산수·비교·논리가 섞여도 — 우선순위 순으로</h3>
      <p class="section-desc">한 줄에 <b>산수(<code>+ / </code>) · 비교(<code>&gt; ===</code>) · 논리(<code>&amp;&amp;</code>)</b>가 다 섞여도 규칙은 하나 — <b>우선순위 높은 것부터</b> 접는다: <b>산수 → 비교 → 논리</b> 순. 실타래를 안쪽 매듭부터 푸는 것과 같다.</p>
      <div class="card"><div class="file-label">🔬 축약: 2 + 3 > 4 && 10 / 2 === 5</div><div data-m="red-mix"></div></div>
      <div data-m="qz-mix"></div>

      <h3 class="section-title">③′ 타입이 섞이면 — 강제변환(coercion)이 끼어든다</h3>
      <p class="section-desc">축약 도중 <b>타입이 다른 두 값</b>이 만나면, 연산자가 <b>한쪽을 강제로 바꾼다</b>. 규칙: <code>+</code>는 <b>한쪽이 문자열이면 이어붙이기</b>(숫자→문자), 그 외 산술 <code>- * / %</code>·비교는 <b>숫자로</b> 강제. 그래서 같은 <code>"5"</code>인데 <code>"5" + 1 = "51"</code>, <code>"5" - 1 = 4</code>로 갈린다.
      <button class="inline-goto" data-goto="coercion">형 변환·강제변환 표 자세히 → 참·거짓과 형 변환</button></p>
      <div class="card"><div class="file-label">🔬 축약: 1 + 2 + "3"  — 왼쪽부터, 글자를 만나는 순간 바뀐다</div><div data-m="red-coerce"></div></div>
      <div data-m="qz-coerce"></div>

      <h3 class="section-title">④ 축약 예시 10선 — ★5개는 당신의 예상을 깬다</h3>
      <p class="section-desc">먼저 <b>머릿속으로 값을 예측</b>하고 ▶ 실행으로 확인하라. <b>★ 표시 5개</b>는 규칙을 알아도 대부분 틀린다 — 축약(왼쪽부터·우선순위·강제변환)이 만드는 함정이다. 몇 개나 맞혔나?</p>
      <div class="card"><div class="file-label">🔬 10개를 예측하고 실행</div><div data-m="gallery"></div></div>

      <div class="concept">
        <p class="concept-lead">😲 예상을 깨는 5 — 인식 밖에 있던 규칙들</p>
        <ul class="section-list">
          <li>★ <code>3 &gt; 2 &gt; 1</code> → <b>false</b>: 왼쪽부터 <code>(3&gt;2)=true</code>, 그다음 <code>true &gt; 1</code>에서 <b>true가 숫자 1로 강제</b> → <code>1 &gt; 1 = false</code>. <b>비교는 사슬로 안 된다</b>(수학의 "2와 3 사이"가 아님).</li>
          <li>★ <code>2 ** 3 ** 2</code> → <b>512</b>: 지수 <code>**</code>만 <b>오른쪽부터</b> → <code>3**2=9</code> 먼저, <code>2**9=512</code>. 다른 연산자는 왼쪽부터인데 <b>지수만 반대</b>(<code>(2**3)**2=64</code> 아님).</li>
          <li>★ <code>typeof typeof 42</code> → <b>"string"</b>: 안쪽 <code>typeof 42</code>가 <b>"number"</b>(문자열)로 접히고, <code>typeof "number"</code> → <b>"string"</b>. typeof는 <b>항상 문자열</b>을 낳는다.</li>
          <li>★ <code>"5" + 1</code> → <b>"51"</b> 인데 <code>"5" - 1</code> → <b>4</b>: 피연산자는 같은데 <b>+는 이어붙이고 −는 숫자로 강제</b>. 연산자마다 강제변환이 다르다.</li>
          <li>★ <code>1 + 2 + "3"</code> → <b>"33"</b>: <b>왼쪽부터</b> 접힌다 — <code>1+2=3</code> 먼저, 그다음 <code>3 + "3"</code>은 <b>글자를 만나 이어붙이기</b> → "33". (6도 "123"도 아니다)</li>
        </ul>
      </div>
      <div class="card"><div class="file-label">🔬 ★ 3 > 2 > 1 이 왜 false인지 — 한 겹씩</div><div data-m="red-chain"></div></div>
      <div class="card"><div class="file-label">🔬 ★ 2 ** 3 ** 2 — 지수는 오른쪽부터</div><div data-m="red-exp"></div></div>

      ${nav('3-3', 4, '3-5')}
    `
    root.querySelector('[data-m="red2"]').append(ExprReduce({
      title: '"hi " + Math.max(2, 3 * 2)',
      steps: [
        { code: 'const label = "hi " + Math.max(2, 3 * 2)', mark: '3 * 2', note: '<b>인자도 표현식</b> → 인자 안의 <b>3 * 2</b>가 먼저 값이 돼야 호출할 수 있다(안쪽 먼저).' },
        { code: 'const label = "hi " + Math.max(2, 6)', mark: 'Math.max(2, 6)', note: '인자가 다 값이 됐으니 <b>Math.max(2, 6)</b> 호출 → 6.' },
        { code: 'const label = "hi " + 6', mark: '"hi " + 6', note: '<b>문자열 + 숫자</b> → 숫자가 문자열로 <b>강제돼(새 값이 만들어져)</b> 이어붙는다(2강 형변환). → "hi 6"' },
        { code: 'const label = "hi 6"', note: '완성. 함수가 껴도 규칙은 같다 — 안쪽부터 접어 올린다.' },
      ],
    }))
    root.querySelector('[data-m="red-tern"]').append(ExprReduce({
      title: 'score >= 90 ? "A" : score >= 80 ? "B" : "C"   // score = 85',
      steps: [
        { code: 'let grade = 85 >= 90 ? "A" : 85 >= 80 ? "B" : "C"', mark: '85 >= 90', note: 'score(85)를 넣고 <b>맨 왼쪽 조건부터</b>. 85 >= 90 은 <b>false</b>. (오른쪽 결합이라 <code>:</code> 뒤 전체가 또 하나의 삼항)' },
        { code: 'let grade = false ? "A" : 85 >= 80 ? "B" : "C"', mark: 'false ? "A"', note: '조건이 false → 첫 삼항은 <b>else(:) 쪽</b>을 고른다. then("A")은 버리고 <b>안쪽 삼항</b>으로.' },
        { code: 'let grade = 85 >= 80 ? "B" : "C"', mark: '85 >= 80', note: '이제 <b>안쪽 삼항</b>. 85 >= 80 은 <b>true</b>.' },
        { code: 'let grade = true ? "B" : "C"', mark: 'true ? "B" : "C"', note: 'true → <b>?(then) 쪽</b> → "B". "C"는 버린다.' },
        { code: 'let grade = "B"', note: '완성. 중첩 삼항도 <b>한 겹씩 접히는 나무</b> — 삼항 가지 안에 삼항이 들어간 것뿐이다.' },
      ],
    }))
    root.querySelector('[data-m="tern-run"]').append(Runner({
      showBox: false,
      code: [
        'let score = 85',
        'print(score >= 90 ? "A"',
        '    : score >= 80 ? "B"',
        '    : score >= 70 ? "C"',
        '    : "F")            // 85 → "B"  (오른쪽 결합: else가 또 삼항)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="red-mix"]').append(ExprReduce({
      title: '2 + 3 > 4 && 10 / 2 === 5',
      steps: [
        { code: 'const ok = 2 + 3 > 4 && 10 / 2 === 5', mark: '2 + 3', note: '① <b>산수</b>부터(가장 급함). <b>2 + 3 = 5</b>.' },
        { code: 'const ok = 5 > 4 && 10 / 2 === 5', mark: '10 / 2', note: '다른 쪽 산수도 — <b>10 / 2 = 5</b>.' },
        { code: 'const ok = 5 > 4 && 5 === 5', mark: '5 > 4', note: '② 이제 <b>비교</b>. <b>5 &gt; 4 = true</b>.' },
        { code: 'const ok = true && 5 === 5', mark: '5 === 5', note: '다른 비교도 — <b>5 === 5 = true</b>.' },
        { code: 'const ok = true && true', mark: 'true && true', note: '③ 마지막으로 <b>논리 &&</b>. 둘 다 참 → <b>true</b>.' },
        { code: 'const ok = true', note: '완성. 섞여 있어도 <b>산수 → 비교 → 논리</b> 순으로 한 겹씩 접힌다.' },
      ],
    }))
    root.querySelector('[data-m="qz-mix"]').append(Quiz({
      q: '<code>2 + 3 > 4</code> 에서 가장 먼저 값이 되는 조각은?',
      options: ['<code>3 > 4</code> (왼쪽부터)', '<code>2 + 3</code> (산수가 비교보다 먼저)', '<code>2 + 3 > 4</code> 통째로'],
      answer: 1,
      explain: '<b>산수(<code>+</code>)가 비교(<code>&gt;</code>)보다 우선순위가 높다</b> → <code>2+3=5</code> 먼저, 그다음 <code>5 &gt; 4 = true</code>. 문법 계층: 산수가 비교 규칙 안쪽에 있다.',
    }))
    root.querySelector('[data-m="red-coerce"]').append(ExprReduce({
      title: '1 + 2 + "3"  (타입이 섞이면?)',
      steps: [
        { code: 'const r = 1 + 2 + "3"', mark: '1 + 2', note: '왼쪽부터 → <b>1 + 2</b> 는 둘 다 숫자라 그냥 산수 → <b>3</b>.' },
        { code: 'const r = 3 + "3"', mark: '3 + "3"', note: '이제 <b>숫자 3 + 문자열 "3"</b> → <code>+</code>는 한쪽이 문자열이면 <b>숫자를 문자로 강제</b>(coercion)해 이어붙인다.' },
        { code: 'const r = "33"', note: '완성 = <b>"33"</b>. 6도 "123"도 아니다 — 강제변환은 <b>왼쪽부터·만나는 순간</b> 일어난다. 순서가 결과를 바꾼다.' },
      ],
    }))
    root.querySelector('[data-m="qz-coerce"]').append(Quiz({
      q: '<code>"5" - 1</code> 의 값은?',
      options: ['<code>"51"</code> (이어붙임)', '<code>4</code> (숫자로 강제)', '<code>NaN</code>'],
      answer: 1,
      explain: '<code>−</code>는 문자열을 <b>숫자로 강제</b> → <code>"5"→5</code>, <code>5 − 1 = <b>4</b></code>. (<code>+</code>였다면 이어붙여 <code>"51"</code> — 연산자마다 강제 방향이 다르다.)',
    }))
    root.querySelector('[data-m="gallery"]').append(Runner({
      showBox: false,
      code: [
        'print(2 * 3 + 4 * 5)              // 26   (곱셈 먼저)',
        'print((2 + 3) * (4 - 1))          // 15   (괄호 둘)',
        'print(Math.max(1, 2 * 3, 10 / 5)) // 6    (인자 안 계산)',
        'print(10 > 5 && 3 < 1)            // false',
        'print("Hi, " + "bob".toUpperCase())  // "Hi, BOB"',
        '',
        'print(3 > 2 > 1)         // ★ false   (사슬 비교 안 됨)',
        'print(2 ** 3 ** 2)       // ★ 512     (지수 오른쪽부터)',
        'print(typeof typeof 42)  // ★ "string"',
        'print("5" + 1, "5" - 1)  // ★ "51"  4 (+와 −가 다름)',
        'print(1 + 2 + "3")       // ★ "33"    (왼쪽부터, 글자 만나면 이어붙임)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="red-chain"]').append(ExprReduce({
      title: '3 > 2 > 1  (왜 false?)',
      steps: [
        { code: 'const r = 3 > 2 > 1', mark: '3 > 2', note: '비교도 <b>왼쪽부터</b> → <b>3 &gt; 2</b> 먼저. 이건 <b>true</b>.' },
        { code: 'const r = true > 1', mark: 'true > 1', note: '이제 <b>true &gt; 1</b>. 비교에서 <b>true는 숫자 1로 강제</b>된다(2강 형변환).' },
        { code: 'const r = 1 > 1', mark: '1 > 1', note: '<b>1 &gt; 1</b> 은 <b>false</b>(1은 1보다 크지 않다).' },
        { code: 'const r = false', note: '그래서 <code>3 &gt; 2 &gt; 1</code> 은 <b>false</b>. 수학처럼 "2와 3 사이"로 읽히지 않는다 — <b>비교는 사슬이 안 된다</b>. (원했다면 <code>3 &gt; 2 && 2 &gt; 1</code>)' },
      ],
    }))
    root.querySelector('[data-m="red-exp"]').append(ExprReduce({
      title: '2 ** 3 ** 2  (지수는 오른쪽 결합)',
      steps: [
        { code: 'const r = 2 ** 3 ** 2', mark: '3 ** 2', note: '거의 모든 연산자는 왼쪽부터지만 <b>지수 <code>**</code>는 오른쪽부터</b>(오른쪽 결합) → 안쪽 <b>3 ** 2</b> 먼저.' },
        { code: 'const r = 2 ** 9', mark: '2 ** 9', note: '<code>3 ** 2 = 9</code>. 이제 <b>2 ** 9</b>.' },
        { code: 'const r = 512', note: '<code>2의 9제곱 = 512</code>. 만약 왼쪽부터 <code>(2**3)**2</code> 였다면 <b>64</b> — 지수만 방향이 반대라 결과가 크게 갈린다.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 3-5 · 🔒 중첩 함수 (5강 함수 후) ────────────────────────
  window.Lessons['3-5'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('3-5 · 🔒 중첩 함수', '좌→우 · 안쪽 먼저', '이건 5강(함수) 배우고 오면 완전히 이해돼요')}
      <div class="card gate-card">
        <div class="file-label">🔒 심화 — 지금은 '눈'만, 정확한 이해는 <b>5강(함수)</b> 뒤에</div>
        <p class="section-desc" style="margin-top:0">실무 코드는 <b>우리가 만든 함수가 여러 겹</b> 중첩된다(예: 장바구니 총액 = 배송비 + 할인가). 원리는 똑같다 — <b>JS 평가순서 = 좌→우 + 안쪽 먼저</b>.
        함수에 부작용(로그·카운터)이 있으면 <b>순서가 결과를 바꾸므로</b> 정확히 알아야 한다.</p>

        <div class="file-label" style="margin-top:6px">🔧 함수 정의 — 이대로 실행하면 25000</div>
        <div data-m="defs"></div>

        <div class="file-label" style="margin-top:14px">🔬 ① 그 한 줄이 어떻게 25000이 되나 — 한 겹씩</div>
        <div data-m="red3"></div>
        <p class="section-desc">⬅️ <code>shippingFee(2)</code>가 <code>discounted(...)</code>보다 <b>먼저</b> 접히는 것에 주목 — "안쪽부터 아무거나"가 아니라 <b>왼쪽 피연산자를 완전히 먼저</b> 평가한다.</p>

        <div class="file-label" style="margin-top:14px">🔬 ② 콤마(,)는 '각각의 표현식'을 나눈다 — console.log(A, B)</div>
        <p class="section-desc" style="margin-top:0">함수 인자를 나누는 <b>콤마(<code>,</code>)</b>는 계산이 아니다 — <b>양쪽이 각각 독립된 표현식</b>이라는 <b>구분자</b>다. 각자 따로 접힌 뒤, 그 두 값이 함께 전달된다.</p>
        <div class="arg-split">
          <span>console.log(</span>
          <span class="arg-box"><span class="arg-tag">표현식 1</span>shippingFee(1) + shippingFee(2)</span>
          <span class="sep-comma">,</span>
          <span class="arg-box"><span class="arg-tag">표현식 2</span>discounted(30000, memberRate("gold"))</span>
          <span>)</span>
        </div>
        <p class="section-desc" style="margin:0 0 4px">↑ <b class="sep-inline">,</b> 가 <b>표현식 1</b>과 <b>표현식 2</b>를 가른다 — 계산 기호가 아니라 <b>구분자</b>. (안쪽 <code>discounted(30000<b class="sep-inline">,</b> …)</code>의 콤마도 마찬가지 — 인자를 나누는 구분자다.)</p>
        <div data-m="red-log"></div>
      </div>
      ${nav('3-4', 5, '3-6')}
    `
    root.querySelector('[data-m="defs"]').append(Runner({
      showBox: false,
      code: [
        'function shippingFee(weight) {      // 무게(kg)당 배송비',
        '  return weight * 500',
        '}',
        'function memberRate(grade) {        // 등급별 할인율',
        '  return grade === "gold" ? 0.2 : 0.1',
        '}',
        'function discounted(price, rate) {  // 할인 적용가',
        '  return price * (1 - rate)',
        '}',
        '',
        'let total = shippingFee(2) + discounted(30000, memberRate("gold"))',
        'print(total)   // 25000  (배송비 1000 + 할인가 24000)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="red3"]').append(ExprReduce({
      title: 'total = shippingFee(2) + discounted(30000, memberRate("gold"))',
      steps: [
        { code: 'total = shippingFee(2) + discounted(30000, memberRate("gold"))', mark: 'shippingFee(2)', note: '<code>+</code>의 <b>왼쪽 피연산자부터</b>(좌→우) → <b>shippingFee(2)</b> = 2*500 = <b>1000</b>.' },
        { code: 'total = 1000 + discounted(30000, memberRate("gold"))', mark: 'memberRate("gold")', note: '이제 오른쪽 <code>discounted(...)</code>의 인자를 왼쪽부터: 30000은 그대로, 그다음 <b>안쪽 호출 memberRate("gold")</b> = <b>0.2</b>.' },
        { code: 'total = 1000 + discounted(30000, 0.2)', mark: 'discounted(30000, 0.2)', note: '인자가 다 값이 됐으니 <b>discounted(30000, 0.2)</b> = 30000*(1-0.2) = <b>24000</b>.' },
        { code: 'total = 1000 + 24000', mark: '1000 + 24000', note: '마지막 <b>덧셈</b> → 25000.' },
        { code: 'total = 25000', note: '완성. 배송비 1000 + 할인가 24000. 아무리 긴 식도 <b>안쪽·왼쪽부터 접히는 나무</b>일 뿐이다.' },
      ],
    }))
    root.querySelector('[data-m="red-log"]').append(ExprReduce({
      title: 'console.log( shippingFee(1) + shippingFee(2) ,  discounted(30000, memberRate("gold")) )',
      steps: [
        { code: 'console.log(shippingFee(1) + shippingFee(2), discounted(30000, memberRate("gold")))', mark: 'shippingFee(1)', note: '콤마 <b>왼쪽 전체가 첫 번째 인자</b>(표현식1), 오른쪽이 <b>두 번째 인자</b>(표현식2). 서로 <b>독립</b> — 왼쪽부터, 그 안에서도 <b>맨 왼쪽 <code>shippingFee(1)</code>부터</b> 접는다.' },
        { code: 'console.log(500 + shippingFee(2), discounted(30000, memberRate("gold")))', mark: 'shippingFee(2)', note: '첫 인자 안: <code>shippingFee(1)</code>=500. 다음 <code>shippingFee(2)</code>=1000.' },
        { code: 'console.log(500 + 1000, discounted(30000, memberRate("gold")))', mark: '500 + 1000', note: '500 + 1000 = <b>1500</b> → 첫 인자(표현식1) 완성.' },
        { code: 'console.log(1500, discounted(30000, memberRate("gold")))', mark: 'memberRate("gold")', note: '이제 <b>두 번째 인자</b>(별개 표현식) 차례. 안쪽 <code>memberRate("gold")</code>=0.2.' },
        { code: 'console.log(1500, discounted(30000, 0.2))', mark: 'discounted(30000, 0.2)', note: '<code>discounted(30000, 0.2)</code> = <b>24000</b>.' },
        { code: 'console.log(1500, 24000)', note: '<b>두 표현식이 각자 값</b>이 됐다 → <code>console.log</code>에 <b>두 값(1500, 24000)</b>이 전달돼 출력. 콤마는 계산이 아니라 <b>표현식 구분자</b>다.' },
      ],
    }))
    wireGoto(root)
  }

  // ── 3-6 · 조건도 표현식 (if·for·while·switch) ────────────────
  window.Lessons['3-6'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('3-6 · 조건도 표현식', 'if·for·while·switch의 (조건)', '반복·분기의 괄호도 결국 표현식 하나 — 완전히 같은 축약')}
      <p class="section-desc"><code>if</code>·<code>for</code>·<code>while</code>·<code>switch</code>는 <b>문</b>(값을 안 냄)이지만, 괄호 안 <b>(조건)은 표현식</b>이다. 그래서 <b>조건이 먼저 하나의 값으로 접혀야</b> 갈림길·반복 여부가 정해진다. (3-1의 "식 vs 문"이 여기서 만난다.)</p>
      <div class="card"><div class="file-label">🔬 축약: if (age >= 19 && hasTicket) { … }  (age=20, hasTicket=true)</div><div data-m="red-if"></div></div>

      <span class="learn-tag">📎 반복·분기의 괄호 <code>(…)</code>은 전부 같은 '값 자리' — <b>여기서 배운 축약이 어디서나 완벽히 동일</b>하게 일어난다(새로 외울 것 0)</span>
      <div class="card">
        <div class="file-label">🧩 같은 자리, 같은 규칙 — 조건은 어디서나 표현식</div>
        <div class="bnf">
          <div class="bnf-rule">if&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="bnf-rec">(score >= 80)</span>&nbsp; { … }&nbsp;&nbsp;<span style="opacity:.65">← 조건 → 참/거짓</span></div>
          <div class="bnf-rule">while&nbsp;&nbsp;<span class="bnf-rec">(n < 10)</span>&nbsp; { … }&nbsp;&nbsp;<span style="opacity:.65">← 조건 → 참/거짓 (매 반복 다시 접힘)</span></div>
          <div class="bnf-rule">for&nbsp;&nbsp;&nbsp;&nbsp;(i = 0; <span class="bnf-rec">i &lt; 3</span>; i++)&nbsp;&nbsp;<span style="opacity:.65">← 가운데 → 참/거짓 (매 반복)</span></div>
          <div class="bnf-rule">switch&nbsp;<span class="bnf-rec">(day % 7)</span>&nbsp; { … }&nbsp;&nbsp;<span style="opacity:.65">← 값 → 각 case와 === 비교</span></div>
        </div>
        <p class="section-desc" style="margin:8px 0 0">전부 <b>같은 축약</b>이다 — 산수·비교·논리·삼항·함수호출이 그 안에서 똑같이 접힌다. 문(if/for/switch)이 달라도 <b>(괄호 안)은 늘 표현식 하나</b>. 새 규칙이 아니라 <b>이미 배운 그 규칙</b>이다.</p>
      </div>
      <div class="card"><div class="file-label">🔬 조건이 값으로 접히는 걸 직접 — if·for·switch 자리</div><div data-m="cond-run"></div></div>

      <h3 class="section-title">조건은 <code>true</code>/<code>false</code>가 아니어도 된다 — truthy/falsy로 접힌다</h3>
      <p class="section-desc">조건 자리엔 <b>아무 값</b>이 와도 된다 — JS가 <b>참 같은가(truthy)/거짓 같은가(falsy)</b>로 접는다. <b>falsy는 딱 8개</b>(<code>false 0 -0 0n "" null undefined NaN</code>), <b>나머지는 전부 truthy</b>. 함정: <code>"0"</code>·<code>" "</code>·<code>[]</code>는 <b>truthy</b>(그래서 <code>if("0")</code>은 실행된다). <code>||</code>·<code>&amp;&amp;</code>도 이 축약을 그대로 쓴다.
      <button class="inline-goto" data-goto="coercion">truthy/falsy 표 자세히 → 참·거짓과 형 변환</button></p>
      <div class="card"><div class="file-label">🔬 축약: name || "익명"   (name = "")</div><div data-m="red-truthy"></div></div>
      ${nav('3-5', 6, '3-7')}
    `
    root.querySelector('[data-m="red-if"]').append(ExprReduce({
      title: 'if (age >= 19 && hasTicket) { 입장() }   // age = 20, hasTicket = true',
      steps: [
        { code: 'if (20 >= 19 && true) { 입장() }', mark: '20 >= 19', note: '<code>if</code>는 문이지만 <b>(조건)은 표현식</b> → 먼저 접는다. <b>20 &gt;= 19</b> 는 <b>true</b>. (비교부터)' },
        { code: 'if (true && true) { 입장() }', mark: 'true && true', note: '이제 논리 <code>&&</code> → 둘 다 참이라 <b>true</b>.' },
        { code: 'if (true) { 입장() }', note: '조건이 <b>하나의 값(true)</b>으로 접혔다 → if가 <b>블록을 실행</b>한다. (거짓이었다면 건너뛴다) — 조건이 값이 돼야 갈림길이 정해진다.' },
      ],
    }))
    root.querySelector('[data-m="cond-run"]').append(Runner({
      showBox: false,
      code: [
        'let score = 85, n = 5, day = 9',
        '',
        'print(score >= 80)   // true   ← if (…) · while (…) 의 그 조건 자리',
        'print(n < 10)        // true   ← for (…; 조건; …) 가운데도 같은 자리',
        'print(day % 7)       // 2      ← switch (…) 값도 표현식 → case 2: 와 === 비교',
        '',
        '// for의 조건은 매 반복 "다시" 접힌다 — i가 0,1,2 → true, 3 → false(종료)',
        'for (let i = 0; i < 3; i++) print("i=" + i + " → " + (i < 3))',
      ].join('\n'),
    }))
    root.querySelector('[data-m="red-truthy"]').append(ExprReduce({
      title: 'name || "익명"   // name = ""',
      steps: [
        { code: 'const who = name || "익명"', mark: 'name', note: 'name(<code>""</code>)을 넣는다. <code>||</code>는 <b>왼쪽부터 truthy/falsy로</b> 본다.' },
        { code: 'const who = "" || "익명"', mark: '""', note: '<b>""(빈 문자열)은 falsy 8개 중 하나</b> → 왼쪽이 "거짓 같음" → <code>||</code>는 <b>오른쪽</b>을 값으로.' },
        { code: 'const who = "익명"', note: '완성 = <b>"익명"</b>. 이게 "빈 값이면 기본값" 패턴. (name이 <code>"홍길동"</code>이면 truthy → 왼쪽 그대로 <code>"홍길동"</code>, 오른쪽은 안 봄)' },
      ],
    }))
    wireGoto(root)
  }

  // ── 3-7 · 요약 ──────────────────────────────────────────────
  window.Lessons['3-7'] = function render(root) {
    root.innerHTML = `
      ${stepHeader('3-7 · 요약', '식을 나무로 보는 눈', '한 줄을 쪼개 안쪽부터 접는다')}
      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">한 줄을 <b>나무로 쪼개고</b>, <b>우선순위 높은 것·안쪽·왼쪽부터</b> 값으로 <b>접어 올린다</b>.
        표현식은 값을 낳고(문은 동작만), 그래서 값이 필요한 자리엔 표현식만 온다.</p>
      </div>
      <ul class="section-list">
        <li><b>표현식</b>은 값을 낳는다 · <b>문</b>은 동작만 (삼항 ✅ vs <code>let=if</code> ❌).</li>
        <li>우선순위 눈금 <b>factor ‹ term ‹ expression</b> — 곱·나눗셈이 덧·뺄셈보다 먼저.</li>
        <li><b>축약</b>: 한 조각(redex)씩 값으로 치환, <b>안쪽·좌→우</b>로 접는다.</li>
      </ul>

      <div class="card">
        <div class="file-label">🎯 종합 — 실제 결제 한 줄을 '이 눈'으로 (12000원 3개, 5000원 쿠폰, 세금 10%)</div>
        <div data-m="cap"></div>
        <p class="section-desc" style="margin:10px 0 0">실무 코드가 이렇게 길어도 겁먹지 않는다 — <b>괄호 → term(곱) → expression(덧뺄)</b> 순으로 <b>안쪽부터 한 겹씩</b> 접으면 그만이다.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>직접 축약</b>해 보자 — 🟢쉬움 → 🟡보통 → 🔴어려움 (각 5문제).</span>
        <button class="chip on" data-goto="3:easy">📝 표현식 실습 시작 (🟢 쉬움) →</button>
      </div>
      <div class="practice-nav">
        <button class="chip" data-goto="3-6">← 이전</button>
        <span class="practice-nav-dots">스텝 7 / 7 · 개념 끝</span>
        <button class="chip on" data-goto="3:easy">드릴로 →</button>
      </div>
    `
    root.querySelector('[data-m="cap"]').append(ExprReduce({
      title: 'const pay = (12000 * 3 - 5000) * 1.1',
      steps: [
        { code: 'const pay = (12000 * 3 - 5000) * 1.1', mark: '12000 * 3', note: '가장 강한 건 <b>괄호(factor)</b> — 그 안부터. 괄호 안에서도 <b>term(곱)</b> <b>12000 * 3</b> 먼저 = 36000. (상품 3개 값)' },
        { code: 'const pay = (36000 - 5000) * 1.1', mark: '36000 - 5000', note: '괄호 안 뺄셈 <b>36000 - 5000</b> = 31000 (쿠폰 차감). 이제 괄호가 <b>하나의 값(factor)</b>이 됐다.' },
        { code: 'const pay = 31000 * 1.1', mark: '31000 * 1.1', note: '남은 <b>term(곱)</b> — 세금 10% 곱하기 → 34100.' },
        { code: 'const pay = 34100', note: '완성. <b>괄호 → term → expression</b> 순으로 안쪽부터 접었다. 이게 "식을 나무로 보는 눈".' },
      ],
    }))
    wireGoto(root)
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
