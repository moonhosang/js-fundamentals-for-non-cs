// 🔀 제어 흐름 · 조합과 중첩 (branch 쪽: 개요 + if 사다리·중첩 if·if×switch)
// 개별 문(if·switch·for·while)은 이미 4강·7강에서 배웠다 — 여기선 '겹쳐 쓰기(중첩)'에 집중.
// 비교 연산자·truthy/falsy는 재설명 없이 링크(4강·coercion, SSOT). 드릴은 인라인(계약테스트 무손상).
;(function () {
  window.Lessons = window.Lessons || {}
  const wireNav = (root) => root.querySelectorAll('[data-goto]').forEach((el) => {
    el.onclick = () => { const v = el.getAttribute('data-goto'); window.goLesson ? window.goLesson(/^\d+$/.test(v) ? Number(v) : v) : (location.hash = '#' + v) }
  })

  // ── 개요(index) ──────────────────────────────────────────
  window.Lessons['cf'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🔀 제어 흐름</span>
        <h2>제어 흐름 · 조합과 중첩 — 문을 겹쳐 쓰기</h2>
        <p><code>if</code>·<code>switch</code>·<code>for</code>·<code>while</code> <b>하나하나는 이미 배웠다</b>. 실전 코드는 이들을 <b>겹쳐(중첩)</b> 쓴다 — 조건 안의 조건, 반복 안의 조건, 반복 안의 반복. 그 조립을 초보자 눈높이로 한 단계씩.</p>
      </header>
      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 먼저 짚기 (앞서 배운 것은 링크)</span>
        <p>비교 연산자(<code>&gt; &lt; === !==</code>)와 <code>==</code> 함정은 <b>앞서 배웠으니 재설명 없이</b> 링크만: <button class="inline-goto" data-goto="4">4강 · 조건(비교·if·삼항·switch)</button> · <button class="inline-goto" data-goto="coercion">📐 참·거짓과 형 변환</button> · <button class="inline-goto" data-goto="7">7강 · for·while</button>.</p>
      </div>
      <h3 class="section-title">🧩 조합을 골라 보세요</h3>
      <div class="home-grid">
        <button class="home-card" data-goto="cf-1"><span class="home-card-title">cf-1 · if 사다리</span><span class="home-card-sub">else if · else — 여러 갈래</span></button>
        <button class="home-card" data-goto="cf-2"><span class="home-card-title">cf-2 · 중첩 if</span><span class="home-card-sub">if 안의 if · &amp;&amp; 대비</span></button>
        <button class="home-card" data-goto="cf-3"><span class="home-card-title">cf-3 · 반복 × 조건</span><span class="home-card-sub">for 안의 if · 목록 거르기</span></button>
        <button class="home-card" data-goto="cf-4"><span class="home-card-title">cf-4 · 중첩 반복</span><span class="home-card-sub">for 안의 for · 격자·구구단</span></button>
        <button class="home-card" data-goto="cf-5"><span class="home-card-title">cf-5 · if × switch</span><span class="home-card-sub">고르고 다시 분기</span></button>
      </div>
    `
    wireNav(root)
  }

  // ── FABLE-A: 아래에 window.Lessons['cf-1'](if 사다리)·['cf-2'](중첩 if)·['cf-5'](if × switch) 추가 ──
})()
