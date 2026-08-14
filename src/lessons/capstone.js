// 10강 · 실전 미니앱 — 디지털 명함 카드 생성기 (배운 조각을 조립)  ── design-principles 규범
// 오해: 실전 앱은 특별하고 어렵다?(→ 배운 조각의 '조립'일 뿐 — 새 문법 없음)
// 왜:  값·문자열(1·2강) + 조건(4강) + 함수(5강) + 배열·map·forEach(6·7강) + 객체(8강) + DOM·이벤트(9강) 을 한 화면에 합친다
// 대비: '개념 하나씩' vs '여러 개념을 엮어 흐름 만들기' — 실전은 후자다

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Lessons[10] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">실전</span>
        <h2>실전 미니앱 — 디지털 명함 카드 생성기</h2>
        <p>새 문법은 하나도 없다. <b>배운 조각을 조립</b>해 진짜 앱을 만든다 — 사람 데이터(객체·배열)를 함수로 카드(DOM)로 바꾸고, 클릭에 반응(이벤트)시킨다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 이 앱에 쓰이는 것 (전부 배운 것)</span>
        <p><b>객체·배열</b>(8·6강) 사람 데이터 → <b>함수</b>(5강) <code>makeCard()</code>로 카드 만들기 →
        <b>forEach</b>(7강)로 여러 명 그리기 → <b>조건</b>(4강)으로 배지 붙이기 → <b>DOM·이벤트</b>(9강)로 클릭 강조. 흐름을 5단계로 조립한다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/이벤트_기반_프로그래밍" target="_blank" rel="noopener noreferrer">이벤트 기반 프로그래밍 ↗</a> · <a href="https://ko.wikipedia.org/wiki/사용자_인터페이스" target="_blank" rel="noopener noreferrer">사용자 인터페이스(UI) ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — "실전 앱은 뭔가 특별하고 어렵다"</div>
        <p class="section-desc" style="margin:0">아니다. 앱은 <b>배운 조각들을 순서대로 잇는 것</b>뿐이다. 아래 5단계는 전부 이미 배운 문법이다 — 새로 외울 건 없다. 조립의 <b>흐름</b>만 눈에 익히면 된다.</p>
      </div>

      <h3 class="section-title">① 데이터 — 사람들을 객체 배열로 (8·6강)</h3>
      <span class="learn-tag">📎 화면보다 데이터가 먼저 — 무엇을 그릴지부터 정한다</span>
      <div class="card"><div class="file-label">🔬 사람 데이터</div><div data-m="data"></div></div>

      <h3 class="section-title">② 함수 — 사람 하나를 카드 하나로 (5·9강)</h3>
      <span class="learn-tag">📎 makeCard(person) — 입력(객체) → 출력(DOM 카드). 함수로 '카드 찍는 틀'을 만든다</span>
      <div class="card"><div class="file-label">🔬 카드 만드는 함수</div><div data-m="fn"></div></div>

      <h3 class="section-title">③ 반복 — 배열을 훑어 여러 카드 (7강)</h3>
      <span class="learn-tag">📎 forEach 로 사람마다 makeCard 를 불러 화면에 붙인다 — 3명이든 30명이든 같은 코드</span>
      <div class="card"><div class="file-label">🔬 목록 전체 렌더</div><div data-m="list"></div></div>

      <h3 class="section-title">④ 조건 — VIP엔 배지를 (4강)</h3>
      <span class="learn-tag">📎 person.vip 이면 ⭐ 배지를 덧붙인다 — 데이터에 따라 화면이 달라진다</span>
      <div class="card"><div class="file-label">🔬 조건부 배지</div><div data-m="badge"></div></div>

      <h3 class="section-title">⑤ 완성 — 클릭에 반응하는 앱 (9강 · 총조립)</h3>
      <span class="learn-tag">📎 카드를 클릭하면 강조(테마 토글) — 모든 조각이 한 화면에서 살아 움직인다</span>
      <div class="card"><div class="file-label">🔬 최종 앱 (카드를 클릭해보세요!)</div><div data-m="app"></div></div>

      <div class="concept">
        <p class="concept-lead">🎓 배운 것을 다 썼다 — 이게 전부다</p>
        <p class="section-desc" style="margin-top:0"><b>값·문자열</b>로 이름을 잇고, <b>객체·배열</b>로 데이터를 담고, <b>함수</b>로 반복을 줄이고,
        <b>forEach·조건</b>으로 흐름을 만들고, <b>DOM·이벤트</b>로 화면을 움직였다. 실전 앱은 결국 <b>이 조각들의 조립</b>이다.
        더 큰 앱도 원리는 똑같다 — 데이터 → 함수 → 반복 → 화면 → 이벤트.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 <b>졸업 실습</b> — 전 강의 조각을 한 문제씩 다시 맞춰보자 (8문제). 다 풀면 완주다.</span>
        <button class="chip on" data-goto="10:easy">🎓 졸업 실습 시작 (🟢 쉬움) →</button>
      </div>
    `

    root.querySelector('[data-m="data"]').append(Runner({ showBox: false, code: [
      'let people = [',
      '  { name: "민지", job: "디자이너", vip: true },',
      '  { name: "지훈", job: "개발자",   vip: false },',
      '  { name: "서연", job: "기획자",   vip: false },',
      ']',
      'print(people.length + "명 · 첫 사람: " + people[0].name)',
    ].join('\n') }))

    root.querySelector('[data-m="fn"]').append(Runner({ code: [
      'function makeCard(person) {          // 객체 하나 → 카드 하나',
      '  let card = document.createElement("div")',
      '  card.style.cssText = "padding:14px 18px;margin:6px 0;border-radius:12px;background:#eef2ff;color:#3730a3;font-weight:700;line-height:1.6"',
      '  card.textContent = person.name + " · " + person.job',
      '  return card                        // DOM 요소를 반환',
      '}',
      '',
      'let one = makeCard({ name: "민지", job: "디자이너" })',
      'box.append(one)',
      'print("카드 1장 완성")',
    ].join('\n') }))

    root.querySelector('[data-m="list"]').append(Runner({ code: [
      'let people = [',
      '  { name: "민지", job: "디자이너" },',
      '  { name: "지훈", job: "개발자" },',
      '  { name: "서연", job: "기획자" },',
      ']',
      'function makeCard(p) {',
      '  let c = document.createElement("div")',
      '  c.style.cssText = "padding:12px 16px;margin:6px 0;border-radius:12px;background:#eef2ff;color:#3730a3;font-weight:700"',
      '  c.textContent = p.name + " · " + p.job',
      '  return c',
      '}',
      'people.forEach(function (p) { box.append(makeCard(p)) })   // 사람마다 한 장',
      'print(people.length + "장 렌더 완료")',
    ].join('\n') }))

    root.querySelector('[data-m="badge"]').append(Runner({ code: [
      'let people = [',
      '  { name: "민지", job: "디자이너", vip: true },',
      '  { name: "지훈", job: "개발자",   vip: false },',
      ']',
      'function makeCard(p) {',
      '  let c = document.createElement("div")',
      '  c.style.cssText = "padding:12px 16px;margin:6px 0;border-radius:12px;background:#eef2ff;color:#3730a3;font-weight:700"',
      '  let badge = p.vip ? " ⭐VIP" : ""      // 4강 조건 — 데이터에 따라 다르게',
      '  c.textContent = p.name + " · " + p.job + badge',
      '  return c',
      '}',
      'people.forEach(function (p) { box.append(makeCard(p)) })',
      'print("VIP엔 ⭐가 붙었나요?")',
    ].join('\n') }))

    root.querySelector('[data-m="app"]').append(Runner({ code: [
      'let people = [',
      '  { name: "민지", job: "디자이너", vip: true },',
      '  { name: "지훈", job: "개발자",   vip: false },',
      '  { name: "서연", job: "기획자",   vip: true },',
      ']',
      '',
      'function makeCard(p) {',
      '  let c = document.createElement("div")',
      '  let base = "padding:14px 18px;margin:8px 0;border-radius:12px;font-weight:700;cursor:pointer;transition:.15s;"',
      '  let normal = base + "background:#eef2ff;color:#3730a3"',
      '  let active = base + "background:#3730a3;color:#fff"',
      '  c.style.cssText = normal',
      '  c.textContent = p.name + " · " + p.job + (p.vip ? " ⭐VIP" : "")',
      '',
      '  let on = false',
      '  c.addEventListener("click", function () {   // 클릭 때마다 테마 토글',
      '    on = !on',
      '    c.style.cssText = on ? active : normal',
      '  })',
      '  return c',
      '}',
      '',
      'people.forEach(function (p) { box.append(makeCard(p)) })   // 데이터→함수→반복→화면→이벤트',
      'print("명함 앱 완성 🎉 — 카드를 클릭해보세요 👆")',
    ].join('\n') }))

    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
