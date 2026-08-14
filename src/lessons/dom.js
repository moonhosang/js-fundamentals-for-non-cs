// 9강 · 화면 조작 (DOM) — 선택 · 바꾸기 · 만들어 붙이기 · 이벤트  ── design-principles 규범
// 오해: 화면에 보이는 건 고정?(→ JS가 실시간으로 바꾼다) · querySelector가 여러 개를 준다?(→ 첫 하나만) · textContent=90 이면 숫자 90?(→ 화면엔 문자 "90")
// 왜:  화면 = 요소(element)들의 나무(DOM) · 골라서(querySelector) 바꾸고(textContent/style) 붙이고(createElement/append) 반응(addEventListener)
// 대비: querySelector(하나) vs querySelectorAll(전부) · textContent(글자) vs innerHTML(HTML) · tagName은 대문자

;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}

  window.Lessons[9] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">9강</span>
        <h2>화면 조작 (DOM) — 값이 드디어 눈에 보인다</h2>
        <p>지금까진 <code>print()</code>로만 봤다. 이제 진짜 화면을 <b>고르고 · 바꾸고 · 만들어 붙이고 · 클릭에 반응</b>시킨다. 화면은 요소들의 <b>나무(DOM)</b>다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><b>고르기</b> <code>box.querySelector("#id")</code> · <b>바꾸기</b> <code>el.textContent</code>·<code>el.style.색</code> ·
        <b>만들어 붙이기</b> <code>document.createElement("div")</code> + <code>box.append(el)</code> ·
        <b>반응</b> <code>el.addEventListener("click", 함수)</code>. 이벤트가 배운 걸 전부 이어 붙인다(5강 함수·7강 반복).</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/문서_객체_모델" target="_blank" rel="noopener noreferrer">문서 객체 모델(DOM) ↗</a> · <a href="https://ko.wikipedia.org/wiki/이벤트_핸들러" target="_blank" rel="noopener noreferrer">이벤트 핸들러 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 가장 흔한 오해 — "화면에 보이는 글자는 고정이다"</div>
        <p class="section-desc" style="margin:0">아니다. HTML은 <b>처음 모습</b>일 뿐, JS가 실행 중에 <b>실시간으로</b> 글자·색·요소를 바꾼다(새로고침 없이). 아래 버튼을 눌러보면 안다 — 화면은 살아 있다.</p>
      </div>

      <h3 class="section-title">① 고르기 & 바꾸기 — querySelector · textContent</h3>
      <span class="learn-tag">📎 box.querySelector("#id") 로 하나 고르고, .textContent 로 글자를 갈아끼운다</span>
      <div data-m="qz-first"></div>
      <div class="card"><div class="file-label">🔬 요소를 골라 글자 바꾸기</div><div data-m="pick"></div></div>

      <h3 class="section-title">② 스타일 — el.style 로 꾸미기</h3>
      <span class="learn-tag">📎 el.style.color·background·padding … CSS를 JS로 준다</span>
      <div class="card"><div class="file-label">🔬 상자에 스타일 입히기</div><div data-m="style"></div></div>
      <div data-m="qz-num"></div>

      <h3 class="section-title">③ 만들어 붙이기 — createElement + append (7강 반복과 합체)</h3>
      <span class="learn-tag">📎 없던 요소를 만들어(createElement) 화면에 붙인다(append) · 배열 훑어 여러 개</span>
      <div class="card"><div class="file-label">🔬 배열 → 화면 칩 여러 개</div><div data-m="build"></div></div>

      <h3 class="section-title">④ 이벤트 — 클릭에 반응 (addEventListener)</h3>
      <span class="learn-tag">📎 "클릭되면 이 함수를 실행해" — 사용자의 행동에 화면이 반응한다 (5강 함수가 바탕)</span>
      <div data-m="qz-tag"></div>
      <div class="card"><div class="file-label">🔬 누르면 바뀌는 버튼 (직접 눌러보세요!)</div><div data-m="event"></div></div>

      <h3 class="section-title">⑤ 합치기 — 실전 카운터 (값·함수·이벤트·DOM 총동원)</h3>
      <span class="learn-tag">📎 +1 / -1 버튼이 숫자를 바꾸고 화면에 그린다 — 지금까지 배운 게 한 화면에</span>
      <div class="card"><div class="file-label">🔬 카운터 미니앱 (버튼을 눌러보세요!)</div><div data-m="counter"></div></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">화면 = <b>DOM 나무</b>. <code>querySelector</code>로 <b>고르고</b>, <code>textContent</code>·<code>style</code>로 <b>바꾸고</b>,
        <code>createElement</code>+<code>append</code>로 <b>만들어 붙이고</b>, <code>addEventListener("click", 함수)</code>로 <b>반응</b>시킨다.
        이벤트 안의 함수가 배운 값·조건·배열·반복을 전부 불러온다.</p>
      </div>

      <div class="practice-cta">
        <span>🎯 이제 <b>단계별 실습</b>으로 — 고르기·바꾸기·붙이기·이벤트를 손에 붙이자 (10문제).</span>
        <button class="chip on" data-goto="9:easy">📝 9강 실습 시작 (🟢 쉬움) →</button>
      </div>
    `

    root.querySelector('[data-m="qz-first"]').append(Quiz({
      q: '화면에 <code>.item</code> 요소가 3개 있다. <code>querySelector(".item")</code> 는 몇 개를 줄까?',
      options: ['3개 전부 (배열로)', '딱 1개 — 맨 처음 것', '에러가 난다'],
      answer: 1,
      explain: '<code>querySelector</code>는 <b>맨 처음 하나</b>만 준다. <b>전부</b>가 필요하면 <code>querySelectorAll(".item")</code>(목록)을 쓴다 — 이름 끝의 <b>All</b>이 힌트.',
    }))

    root.querySelector('[data-m="pick"]').append(Runner({ code: [
      'box.innerHTML = \'<p id="msg" style="font-size:20px">원래 글자</p>\'',
      'let p = box.querySelector("#msg")   // #id 로 하나 고른다',
      'p.textContent = "JS가 바꾼 글자!"    // 실시간으로 갈아끼운다',
      'print("바꿈 완료 — 위 글자를 보세요")',
    ].join('\n') }))

    root.querySelector('[data-m="style"]').append(Runner({ code: [
      'let el = document.createElement("div")',
      'el.textContent = "스타일 입힌 상자"',
      'el.style.padding = "14px 18px"',
      'el.style.background = "#fde68a"',
      'el.style.borderRadius = "10px"',
      'el.style.fontWeight = "700"',
      'box.append(el)',
      'print("완성")',
    ].join('\n') }))

    root.querySelector('[data-m="qz-num"]').append(Quiz({
      q: '<code>el.textContent = 90</code> 처럼 <b>숫자</b>를 넣으면 화면엔 무엇이 보일까?',
      options: ['숫자 90 (계산 가능한 값)', '문자 "90" (화면 글자는 항상 문자)'],
      answer: 1,
      explain: '화면에 그려지는 <code>textContent</code>는 <b>항상 문자</b>다. 숫자 <code>90</code>은 자동으로 문자 <code>"90"</code>이 되어 그려진다(2강 문자열).',
    }))

    root.querySelector('[data-m="build"]').append(Runner({ code: [
      'let fruits = ["🍎 사과", "🍌 바나나", "🍇 포도"]',
      '',
      'fruits.forEach(function (f) {          // 7강 forEach 로 훑으며',
      '  let chip = document.createElement("span")   // 요소를 만들고',
      '  chip.textContent = f',
      '  chip.style.cssText = "display:inline-block;margin:4px;padding:8px 12px;background:#e0e7ff;border-radius:8px;font-weight:700"',
      '  box.append(chip)                     // 화면에 붙인다',
      '})',
      'print(fruits.length + "개 칩 생성 완료")',
    ].join('\n') }))

    root.querySelector('[data-m="qz-tag"]').append(Quiz({
      q: '<code>addEventListener("click", 함수)</code> 에서 두 번째 자리에 <b>함수</b>를 넘긴다. 이 함수는 언제 실행될까?',
      options: ['지금 즉시 한 번', '사용자가 그 요소를 클릭할 때마다', '1초 뒤 자동으로'],
      answer: 1,
      explain: '지금 실행하는 게 아니라 <b>"클릭되면 실행해줘"라고 맡겨두는</b> 것이다(콜백). 실제 실행은 사용자가 <b>클릭할 때마다</b> 일어난다 — 그래서 <code>()</code> 없이 함수 자체를 넘긴다.',
    }))

    root.querySelector('[data-m="event"]').append(Runner({ code: [
      'let btn = document.createElement("button")',
      'btn.textContent = "눌러봐"',
      'btn.style.cssText = "padding:10px 18px;font-weight:700;border-radius:8px;cursor:pointer;border:1px solid #c7d2fe"',
      '',
      'let count = 0',
      'btn.addEventListener("click", function () {   // 클릭될 때마다 실행',
      '  count = count + 1',
      '  btn.textContent = count + "번 눌렀어요"',
      '})',
      'box.append(btn)',
      'print("버튼 준비 완료 — 직접 눌러보세요 👆")',
    ].join('\n') }))

    root.querySelector('[data-m="counter"]').append(Runner({ code: [
      'let n = 0',
      'let display = document.createElement("div")',
      'display.style.cssText = "font-size:30px;font-weight:800;margin-bottom:10px"',
      'display.textContent = n',
      '',
      'function makeBtn(label, onClick) {   // 5강 함수로 버튼 찍어내기',
      '  let b = document.createElement("button")',
      '  b.textContent = label',
      '  b.style.cssText = "padding:8px 16px;margin-right:6px;font-weight:700;border-radius:8px;cursor:pointer;border:1px solid #c7d2fe"',
      '  b.addEventListener("click", onClick)',
      '  return b',
      '}',
      '',
      'let plus = makeBtn("+1", function () { n = n + 1; display.textContent = n })',
      'let minus = makeBtn("-1", function () { n = n - 1; display.textContent = n })',
      '',
      'box.append(display, plus, minus)',
      'print("카운터 완성 — +1 / -1 을 눌러보세요 👆")',
    ].join('\n') }))

    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(t) : (location.hash = '#' + t) }
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
