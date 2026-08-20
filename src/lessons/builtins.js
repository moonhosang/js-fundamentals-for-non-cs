// 📚 레퍼런스 — 두 종류로 나눈다.
//  (1) 내장 기능(빌트인) = 값·배열·객체에 딸린 '도구'(함수/메서드). 분류별 서브페이지로 분리:
//      builtins(개요) → builtins-1 타입 · -2 숫자 · -3 문자열 · -4 배열 · -5 객체.
//  (2) coercion = '참·거짓(truthy/falsy)과 형 변환(캐스팅)'. 이건 도구가 아니라 '언어의 평가 규칙'이라
//      도구 카탈로그에서 빼 별도 항목으로(SSOT). 3강 축약·4강 조건이 여기로 링크.
// design-principles: 진짜 도는 코드(각 표 밑에 실행 Runner).

;(function () {
  window.Lessons = window.Lessons || {}

  const cell = (c) => '<code>' + String(c).replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code>'
  const tbl = (rows) => `<div class="table-wrap"><table class="ref-table">
    <thead><tr><th>기능</th><th>하는 일</th><th>예 → 결과</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${cell(r[0])}</td><td>${r[1]}</td><td>${cell(r[2])} → ${cell(r[3])}</td></tr>`).join('')}</tbody>
  </table></div>`
  // 레슨 안 이동 버튼([data-goto]→다른 레슨) · 같은 페이지 앵커([data-scroll]→data-m 위젯으로 스크롤)를 배선.
  const wireNav = (root) => {
    root.querySelectorAll('[data-goto]').forEach((el) => {
      el.onclick = () => { const v = el.getAttribute('data-goto'); window.goLesson(/^\d+$/.test(v) ? Number(v) : v) }
    })
    root.querySelectorAll('[data-scroll]').forEach((el) => {
      el.onclick = () => { const t = root.querySelector('[data-m="' + el.getAttribute('data-scroll') + '"]'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
    })
  }
  // 서브페이지 하단 내비게이션(← 목차 · 이전/다음 분류).
  const subNav = (prev, next) => `<div class="practice-nav">
    ${prev ? `<button class="chip" data-goto="${prev[0]}">← ${prev[1]}</button>` : '<button class="chip" data-goto="builtins">← 레퍼런스 목차</button>'}
    <span class="practice-nav-dots">📚 도구 카탈로그</span>
    ${next ? `<button class="chip on" data-goto="${next[0]}">${next[1]} →</button>` : '<button class="chip on" data-goto="coercion">참·거짓·형 변환 →</button>'}
  </div>`
  const subHead = (badge, title, sub) => `<header class="lesson-header"><span class="badge">${badge}</span><h2>${title}</h2><p>${sub}</p></header>`

  // ════════════════════════════════════════════════════════════
  // 📚 내장 기능 — 개요(인덱스)
  // ════════════════════════════════════════════════════════════
  window.Lessons['builtins'] = function render(root) {
    root.innerHTML = `
      ${subHead('📚 레퍼런스', '내장 기능(빌트인) — 값에 딸린 도구 모음', '실습에서 <code>typeof</code>·<code>sort</code>·<code>Object.keys</code> 같은 <b>내장 기능</b>을 만난다. 외울 필요 없다 — <b>분류별 페이지에서 "이게 뭔지" 찾아보고</b> 예제를 ▶ 눌러 확인하면 된다.')}

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 이 레퍼런스 쓰는 법</span>
        <p>JS엔 값·배열·객체를 다루는 <b>이미 만들어진 도구</b>가 딸려 있다. 아래 <b>분류를 눌러</b> 표로 무엇을 하는지 훑고, 각 예제를 <b>실행</b>해 결과를 눈으로 본다. 드릴에서 막히면 해당 분류로 온다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/자료형" target="_blank" rel="noopener noreferrer">자료형 ↗</a> · <a href="https://ko.wikipedia.org/wiki/배열" target="_blank" rel="noopener noreferrer">배열 ↗</a> · <a href="https://ko.wikipedia.org/wiki/연산자_(프로그래밍)" target="_blank" rel="noopener noreferrer">연산자 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "내장 기능은 다 외워야 한다"</div>
        <p class="section-desc" style="margin:0">아니다. 프로는 <b>필요할 때 찾아 쓴다</b>. 중요한 건 "이런 도구가 있다"는 감과, <b>그게 값을 바꾸는지(원본 변경) 새 값을 주는지</b>를 아는 것. 표의 마지막 열(→ 결과)을 눈에 익혀라.</p>
      </div>

      <h3 class="section-title">🧰 도구 카탈로그 — 분류를 골라 보세요</h3>
      <div class="home-grid">
        <button class="home-card" data-goto="builtins-1"><span class="home-card-title">① 타입·판별</span><span class="home-card-sub">typeof · instanceof · NaN</span></button>
        <button class="home-card" data-goto="builtins-2"><span class="home-card-title">② 숫자·수학</span><span class="home-card-sub">Number · Math.max · ** · %</span></button>
        <button class="home-card" data-goto="builtins-3"><span class="home-card-title">③ 문자열</span><span class="home-card-sub">length · toUpperCase · split</span></button>
        <button class="home-card" data-goto="builtins-4"><span class="home-card-title">④ 배열</span><span class="home-card-sub">push/pop · map/filter/reduce</span></button>
        <button class="home-card" data-goto="builtins-5"><span class="home-card-title">⑤ 객체</span><span class="home-card-sub">Object.keys · delete</span></button>
      </div>

      <div class="card" style="border-color:var(--brand);margin-top:16px">
        <div class="file-label">📐 도구가 아니라 '규칙' — 따로 뺐어요</div>
        <p class="section-desc" style="margin:0 0 8px"><b>참·거짓(truthy/falsy)</b>과 <b>형 변환(캐스팅)</b>은 부르는 도구가 아니라 <b>언어가 값을 판단·변환하는 규칙</b>이라, 도구 카탈로그에서 빼 별도 항목으로 뒀다. <code>if</code>·<code>||</code>·비교에서 늘 쓰인다.</p>
        <button class="chip on" data-goto="coercion">📐 참·거짓과 형 변환 →</button>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">내장 기능은 <b>값·배열·객체에 딸린 도구</b>다. 외우기보다 <b>①이런 게 있다 ②원본을 바꾸나(push·pop·sort) 새 값을 주나(map·filter·includes)</b>를 안다. 화면 기능(<code>createElement</code>·<code>querySelector</code>·<code>addEventListener</code>)은 <b>9강 DOM</b>에서.</p>
      </div>
    `
    wireNav(root)
  }

  // ════════════════════════════════════════════════════════════
  // ① 타입·판별
  // ════════════════════════════════════════════════════════════
  window.Lessons['builtins-1'] = function render(root) {
    root.innerHTML = `
      ${subHead('📚 ① 타입', '타입·판별 — 이 값이 뭐지?', '값이 어떤 <b>부류</b>인지 알아내는 도구. (참/거짓으로 바꾸는 <code>Boolean()</code>은 <b>형 변환</b> 쪽에 있어요.)')}
      ${tbl([
        ['typeof x', '값의 <b>타입 이름</b>을 문자열로', 'typeof 24', '"number"'],
        ['typeof x', '', 'typeof "hi"', '"string"'],
        ['typeof x', '함정: null도 <b>"object"</b>(옛 버그)', 'typeof null', '"object"'],
        ['x instanceof C', 'x가 C로 만든 것인가', '[] instanceof Array', 'true'],
        ['NaN', '"숫자가 아님"(실패한 계산). <b>자기와도 다름</b>', 'NaN === NaN', 'false'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="type"></div></div>
      ${subNav(null, ['builtins-2', '② 숫자·수학'])}
    `
    root.querySelector('[data-m="type"]').append(Runner({ showBox: false, code: [
      'print(typeof 24)        // "number"',
      'print(typeof "hi")      // "string"',
      'print(typeof null)      // "object"',
      '// 유명한 함정',
      'print([] instanceof Array)  // true',
      'print(NaN === NaN)      // false',
      '// 자기와도 다름',
    ].join('\n') }))
    wireNav(root)
  }

  // ════════════════════════════════════════════════════════════
  // ② 숫자·수학
  // ════════════════════════════════════════════════════════════
  window.Lessons['builtins-2'] = function render(root) {
    root.innerHTML = `
      ${subHead('📚 ② 숫자', '숫자·수학', '수 계산에 쓰는 도구. (<code>Number()</code>로 문자→숫자 <b>변환</b>은 <b>형 변환</b> 페이지에 자세히.)')}
      ${tbl([
        ['Number(s)', '문자를 <b>숫자로</b> 변환 (→ 형 변환)', 'Number("12")', '12'],
        ['Math.max(a,b,…)', '가장 큰 값', 'Math.max(1, 9, 3)', '9'],
        ['Math.min(a,b,…)', '가장 작은 값', 'Math.min(1, 9, 3)', '1'],
        ['Math.round(x)', '반올림', 'Math.round(2.6)', '3'],
        ['a ** b', 'a의 b제곱(지수)', '2 ** 3', '8'],
        ['a % b', 'a를 b로 나눈 <b>나머지</b>', '10 % 3', '1'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="num"></div></div>
      ${subNav(['builtins-1', '① 타입'], ['builtins-3', '③ 문자열'])}
    `
    root.querySelector('[data-m="num"]').append(Runner({ showBox: false, code: [
      'print(Number("12") + 3)   // 15',
      'print(Math.max(1, 9, 3))  // 9',
      'print(2 ** 3)             // 8',
      '// 2의 3제곱',
      'print(10 % 3)             // 1',
      '// 나머지',
    ].join('\n') }))
    wireNav(root)
  }

  // ════════════════════════════════════════════════════════════
  // ③ 문자열
  // ════════════════════════════════════════════════════════════
  window.Lessons['builtins-3'] = function render(root) {
    root.innerHTML = `
      ${subHead('📚 ③ 문자열', '문자열', '글자를 다루는 도구. (메서드는 대개 <b>원본을 안 바꾸고 새 문자열</b>을 준다 — 문자열은 불변.)')}
      ${tbl([
        ['s.length', '글자 수', '"abc".length', '3'],
        ['s[i]', 'i번째 글자(0부터)', '"abc"[1]', '"b"'],
        ['s.toUpperCase()', '전부 대문자(새 문자열)', '"hi".toUpperCase()', '"HI"'],
        ['s.includes(x)', 'x를 담고 있나', '"abc".includes("b")', 'true'],
        ['s.split(x)', 'x로 잘라 <b>배열</b>로', '"a,b,c".split(",")', '["a","b","c"]'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="str"></div></div>
      <div class="card"><div class="file-label">⏱ 시뮬레이션 — <code>split ↔ join</code> (문자 ↔ 배열, 다음 ▶)</div><div data-m="sim-str"></div></div>
      ${subNav(['builtins-2', '② 숫자'], ['builtins-4', '④ 배열'])}
    `
    root.querySelector('[data-m="str"]').append(Runner({ showBox: false, code: [
      'print("abc".length)          // 3',
      'print("abc"[1])              // "b"',
      'print("hi".toUpperCase())    // "HI"',
      'print("a,b,c".split(","))    // ["a","b","c"]',
    ].join('\n') }))
    root.querySelector('[data-m="sim-str"]').append(ExprReduce({
      title: '"a,b,c" 를 "-" 로 바꾸기 (split 으로 자르고 join 으로 잇기)',
      steps: [
        { code: '"a,b,c".split(",").join("-")', mark: 'split(",")', note: '왼쪽부터 — 먼저 <b>split(",")</b>: 콤마로 잘라 <b>배열</b>로 만든다.' },
        { code: '["a", "b", "c"].join("-")', mark: 'join("-")', note: '이제 <b>join("-")</b>: 그 배열을 "-"로 이어 <b>문자열</b>로.' },
        { code: '"a-b-c"', note: '= <b>"a-b-c"</b>. <b>split</b>(문자→배열) ↔ <b>join</b>(배열→문자)은 정반대 <b>짝</b>이다.' },
      ],
    }))
    wireNav(root)
  }

  // ════════════════════════════════════════════════════════════
  // ④ 배열 (꺼내기·바꾸기 + 변환·훑기)
  // ════════════════════════════════════════════════════════════
  window.Lessons['builtins-4'] = function render(root) {
    root.innerHTML = `
      ${subHead('📚 ④ 배열', '배열 — 꺼내기·바꾸기 · 변환·훑기', '여러 값을 다루는 도구(6·7강). 핵심은 <b>원본을 바꾸나 / 새 값을 주나</b>를 구분하는 것.')}

      <h4 class="section-title">꺼내기·바꾸기 (6강)</h4>
      <span class="learn-tag">⚠️ push·pop·sort는 <b>원본을 바꾼다</b> / includes·indexOf·join·concat은 <b>원본 그대로</b> 새 값을 준다</span>
      ${tbl([
        ['a.length', '개수', '[1,2,3].length', '3'],
        ['a[i]', 'i번째(0부터)', '[10,20][1]', '20'],
        ['a.push(x)', '끝에 추가 <b>(원본 변경)</b>', '[1].push(2)', '// 길이 2'],
        ['a.pop()', '끝을 빼서 반환 <b>(원본 변경)</b>', '[1,2].pop()', '2'],
        ['a.includes(x)', 'x를 담고 있나', '[1,2].includes(2)', 'true'],
        ['a.indexOf(x)', 'x의 위치(없으면 -1)', '["a","b"].indexOf("b")', '1'],
        ['a.join(x)', 'x로 이어 <b>문자열</b>로', '[1,2,3].join("-")', '"1-2-3"'],
        ['a.concat(b)', '두 배열을 이은 <b>새 배열</b>', '[1].concat([2])', '[1,2]'],
        ['a.sort()', '정렬 <b>(원본 변경·기본은 문자 비교!)</b>', '[3,20,100].sort()', '[100,20,3]'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="arr"></div></div>

      <h4 class="section-title">변환·훑기 (7강에서 자세히)</h4>
      <span class="learn-tag">📎 이 다섯은 <b>원본을 안 바꾸고</b> 새 값/새 배열을 준다 (map·filter·reduce는 7강)</span>
      ${tbl([
        ['a.map(f)', '각 요소를 변환한 <b>새 배열</b>', '[1,2].map(x=>x*2)', '[2,4]'],
        ['a.filter(f)', '조건 맞는 것만 <b>새 배열</b>', '[1,2,3].filter(x=>x>1)', '[2,3]'],
        ['a.reduce(f,init)', '하나로 <b>접기</b>(합·곱…)', '[1,2,3].reduce((s,x)=>s+x,0)', '6'],
        ['a.forEach(f)', '하나씩 <b>실행만</b>(반환 없음)', '[1,2].forEach(print)', 'undefined'],
        ['a.find(f)', '조건 맞는 <b>첫 값</b>', '[5,10].find(x=>x>7)', '10'],
        ['a.some(f)', '<b>하나라도</b> 맞나', '[1,2].some(x=>x>1)', 'true'],
        ['a.every(f)', '<b>모두</b> 맞나', '[2,4].every(x=>x%2===0)', 'true'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="arr2"></div></div>
      <div class="card"><div class="file-label">⏱ 시뮬레이션 — filter로 걸러서 map으로 변환 (체인, 다음 ▶)</div><div data-m="sim-arr"></div></div>
      <div class="card"><div class="file-label">⏱ 시뮬레이션 — reduce: 목록을 하나로 접기 (한 요소씩)</div><div data-m="sim-reduce"></div></div>
      ${subNav(['builtins-3', '③ 문자열'], ['builtins-5', '⑤ 객체'])}
    `
    root.querySelector('[data-m="arr"]').append(Runner({ showBox: false, code: [
      'let a = [3, 20, 100]',
      'print(a.includes(20))    // true',
      'print(a.indexOf(100))    // 2',
      'print([1, 2, 3].join("-"))   // "1-2-3"',
      'print(a.sort())          // [100,20,3]',
      '// 기본은 문자 비교!',
      'a.push(9); print(a.length)   // 4',
      '// push는 원본 변경',
    ].join('\n') }))
    root.querySelector('[data-m="arr2"]').append(Runner({ showBox: false, code: [
      'print([1, 2, 3].map(x => x * 2))       // [2,4,6]',
      'print([1, 2, 3].filter(x => x > 1))    // [2,3]',
      'print([1, 2, 3].reduce((s, x) => s + x, 0))  // 6',
      'print([5, 10, 15].find(x => x > 7))    // 10',
      'print([2, 4].every(x => x % 2 === 0))  // true',
    ].join('\n') }))
    root.querySelector('[data-m="sim-arr"]').append(ExprReduce({
      title: '짝수만 골라 10배로 — filter 다음 map',
      steps: [
        { code: '[1, 2, 3, 4].filter(n => n % 2 === 0).map(n => n * 10)', mark: 'filter(n => n % 2 === 0)', note: '왼쪽부터 — 먼저 <b>filter</b>: 짝수(<code>n % 2 === 0</code>)만 남긴다.' },
        { code: '[2, 4].map(n => n * 10)', mark: 'map(n => n * 10)', note: '남은 <b>[2, 4]</b>에 <b>map</b>: 각 요소를 ×10.' },
        { code: '[20, 40]', note: '= <b>[20, 40]</b>. filter로 <b>거르고</b> map으로 <b>변환</b> — 둘 다 원본은 그대로, <b>새 배열</b>(6강).' },
      ],
    }))
    root.querySelector('[data-m="sim-reduce"]').append(ExprReduce({
      title: '합계 구하기 — reduce는 누적값(acc)을 한 요소씩 접는다',
      steps: [
        { code: '[10, 20, 30].reduce((acc, n) => acc + n, 0)', note: '시작값 <b>acc = 0</b>(마지막 인자). 각 요소 n을 <code>acc + n</code>으로 접어 간다.' },
        { code: 'n = 10  →  acc = 0 + 10 = 10', mark: 'n = 10', note: '첫 요소 <b>10</b> → acc = 0 + 10 = <b>10</b>.' },
        { code: 'n = 20  →  acc = 10 + 20 = 30', mark: 'n = 20', note: '다음 <b>20</b> → acc = 10 + 20 = <b>30</b>.' },
        { code: 'n = 30  →  acc = 30 + 30 = 60', mark: 'n = 30', note: '마지막 <b>30</b> → acc = 30 + 30 = <b>60</b>.' },
        { code: 'acc = 60', note: '= <b>60</b>. reduce = <b>목록을 값 하나로 접기</b>(합계·최댓값·객체 만들기…). map/filter와 달리 <b>결과가 배열이 아니라 값 하나</b>.' },
      ],
    }))
    wireNav(root)
  }

  // ════════════════════════════════════════════════════════════
  // ⑤ 객체
  // ════════════════════════════════════════════════════════════
  window.Lessons['builtins-5'] = function render(root) {
    root.innerHTML = `
      ${subHead('📚 ⑤ 객체', '객체', '<code>이름:값</code> 묶음을 다루는 도구(8강).')}
      ${tbl([
        ['o.키 / o["키"]', '속성 꺼내기·넣기 (8강)', '({a:1}).a', '1'],
        ['Object.keys(o)', '<b>키 이름들</b>을 배열로', 'Object.keys({a:1,b:2})', '["a","b"]'],
        ['Object.values(o)', '<b>값들</b>을 배열로', 'Object.values({a:1,b:2})', '[1,2]'],
        ['delete o.키', '속성을 <b>지운다</b>', 'delete o.a', '// o.a는 undefined'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="obj"></div></div>
      ${subNav(['builtins-4', '④ 배열'], ['coercion', '📐 참·거짓·형 변환'])}
    `
    root.querySelector('[data-m="obj"]').append(Runner({ showBox: false, code: [
      'let o = { a: 1, b: 2 }',
      'print(Object.keys(o))    // ["a","b"]',
      'print(Object.keys(o).length)  // 2',
      'delete o.a',
      'print(o.a)               // undefined',
      '// 지워짐',
    ].join('\n') }))
    wireNav(root)
  }

  // ════════════════════════════════════════════════════════════
  // 📐 참·거짓(truthy/falsy)과 형 변환(캐스팅) — 규칙(SSOT)
  //    도구가 아니라 '언어가 값을 판단·변환하는 규칙'. 3강 축약·4강 조건이 이리로 링크.
  // ════════════════════════════════════════════════════════════
  window.Lessons['coercion'] = function render(root) {
    root.innerHTML = `
      ${subHead('📐 규칙', '참·거짓과 형 변환 — 조건에서의 값과 타입 강제', '이건 부르는 <b>도구가 아니라 언어의 규칙</b>이다 — 값이 <b>조건 자리에서 참/거짓으로</b>(truthy/falsy), 또 <b>연산에서 다른 타입으로</b>(형 변환) 어떻게 취급되는지. <code>if</code>·<code>||</code>·비교·표현식 어디서나 작동한다.')}

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 왜 따로 있나</span>
        <p><code>typeof</code>·<code>sort</code>는 "부르는 도구"지만, 이건 <b>부르지 않아도 언어가 자동으로 적용하는 규칙</b>이다. 그래서 도구 카탈로그에서 뺐다. <b>표현식 함정(3강)</b>과 <b>조건(4강)</b>의 뿌리라 한곳에 모아 둔다.</p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔮 먼저 예측하고 → 표로 확인 (한 번 봐선 안 붙는다)</div>
        <p class="section-desc" style="margin:0 0 8px">답을 먼저 맞혀 보라. 틀려도 좋다 — <b>예측하고 확인</b>해야 손에 붙는다.</p>
        <div data-m="pq1"></div>
        <div data-m="pq2"></div>
      </div>

      <h3 class="section-title">A. 형 변환(캐스팅) — 타입을 바꾸기</h3>
      <p class="section-desc"><b>캐스팅</b> = 값의 타입을 바꾸는 것. 두 가지다 — <b>내가 직접</b>(명시적: <code>Number()</code>·<code>String()</code>·<code>Boolean()</code>) 하거나, <b>연산자가 알아서</b>(암묵적: <code>"5" - 1</code>에서 문자열을 숫자로). 암묵적 변환이 <b>표현식의 함정</b> 대부분을 만든다.</p>
      <span class="learn-tag">🙋 명시적 — 내가 함수로 직접 바꾼다</span>
      ${tbl([
        ['Number(x)', '숫자로. 빈칸/공백은 0, 못 바꾸면 <b>NaN</b>', 'Number("12")', '12'],
        ['Number(x)', '', 'Number("abc")', 'NaN'],
        ['String(x)', '문자열로', 'String(12)', '"12"'],
        ['Boolean(x)', '참/거짓으로(truthy/falsy → 아래 B)', 'Boolean(0)', 'false'],
        ['parseInt(s)', '앞쪽 <b>정수</b>만 뽑음(뒤 글자 무시)', 'parseInt("12px")', '12'],
        ['parseFloat(s)', '앞쪽 <b>소수</b>만 뽑음', 'parseFloat("3.14x")', '3.14'],
        ['`${x}`', '템플릿도 문자열로 캐스팅', '`값:${12}`', '"값:12"'],
      ])}
      <span class="learn-tag">🤖 암묵적(coercion) — 연산자가 알아서 바꾼다 · <b>표현식 함정의 근원</b></span>
      ${tbl([
        ['+ (한쪽이 문자열)', '숫자를 문자열로 → <b>이어붙임</b>', '1 + "2"', '"12"'],
        ['- * / % (산술)', '문자열을 <b>숫자로</b> 강제', '"5" - 1', '4'],
        ['- * /', '', '"6" * "2"', '12'],
        ['+ (true/null)', 'true→1, null→0, undefined→NaN', 'true + 1', '2'],
        ['&gt; &lt; (비교)', '양쪽을 숫자로', 'true > 0', 'true'],
        ['== (느슨한 같음)', '타입 맞춰 강제(그래서 <b>=== 권장</b>)', '1 == "1"', 'true'],
        ['=== (엄격한 같음)', '강제 안 함 → 타입 다르면 false', '1 === "1"', 'false'],
      ])}
      <div class="card"><div class="file-label">🔬 실행 — 명시적 vs 암묵적</div><div data-m="cast"></div></div>
      <div class="card"><div class="file-label">⏱ 시간 시뮬레이션 — <code>"5" - 1</code> 이 접히는 과정 (다음 ▶)</div><div data-m="sim-coerce"></div></div>

      <h3 class="section-title">B. truthy / falsy — 조건에서 참·거짓으로 취급되는 값</h3>
      <p class="section-desc"><code>if</code>·<code>||</code>·<code>&amp;&amp;</code>·삼항의 조건은 꼭 <code>true</code>/<code>false</code>가 아니어도 된다 — 아무 값이나 오면 JS가 <b>참 같은가(truthy) / 거짓 같은가(falsy)</b>로 본다(값→불리언 강제). <b>falsy는 딱 8개</b>, <b>나머지는 전부 truthy</b>. 이 8개만 외우면 된다.</p>
      <div class="card" style="border-color:var(--red)">
        <div class="file-label">❌ falsy — 이 8개가 전부 (나머지는 다 truthy)</div>
        <p class="section-desc" style="margin:0"><code>false</code> · <code>0</code> · <code>-0</code> · <code>0n</code>(BigInt 0) · <code>""</code>(빈 문자열) · <code>null</code> · <code>undefined</code> · <code>NaN</code></p>
      </div>
      <span class="learn-tag">⚠️ 헷갈리는 <b>truthy</b> — 이건 다 <b>참</b>이다: <code>"0"</code> · <code>"false"</code> · <code>" "</code>(공백) · <code>[]</code>(빈 배열) · <code>{}</code>(빈 객체) · <code>-1</code></span>
      <div class="table-wrap"><table class="ref-table">
        <thead><tr><th>값</th><th><code>Boolean(값)</code></th><th>분류 · 왜</th></tr></thead>
        <tbody>
          <tr><td><code>false</code></td><td><b>false</b></td><td>❌ falsy 8개</td></tr>
          <tr><td><code>0</code> · <code>-0</code></td><td><b>false</b></td><td>❌ falsy — 숫자 0</td></tr>
          <tr><td><code>0n</code></td><td><b>false</b></td><td>❌ falsy — BigInt 0</td></tr>
          <tr><td><code>""</code></td><td><b>false</b></td><td>❌ falsy — 빈 문자열</td></tr>
          <tr><td><code>null</code></td><td><b>false</b></td><td>❌ falsy — 비었음(의도)</td></tr>
          <tr><td><code>undefined</code></td><td><b>false</b></td><td>❌ falsy — 아직 없음</td></tr>
          <tr><td><code>NaN</code></td><td><b>false</b></td><td>❌ falsy — 실패한 계산</td></tr>
          <tr><td><code>"0"</code></td><td><b>true</b></td><td>⚠️ 글자라 truthy (빈 문자열 아님)</td></tr>
          <tr><td><code>"false"</code> · <code>" "</code></td><td><b>true</b></td><td>⚠️ 글자·공백도 truthy</td></tr>
          <tr><td><code>[]</code> · <code>{}</code></td><td><b>true</b></td><td>⚠️ 빈 배열·객체도 truthy(원시 아님)</td></tr>
          <tr><td><code>-1</code> · <code>3.14</code></td><td><b>true</b></td><td>0 아닌 숫자는 truthy</td></tr>
        </tbody>
      </table></div>
      ${tbl([
        ['if (x)', 'x가 truthy면 실행', 'if ("0") …', '실행됨(문자열은 truthy)'],
        ['a || b', 'a가 falsy면 b (기본값 패턴)', '"" || "익명"', '"익명"'],
        ['a || b', 'a가 truthy면 a', '"홍길동" || "익명"', '"홍길동"'],
        ['a && b', 'a가 truthy면 b (가드 패턴)', '1 && "OK"', '"OK"'],
        ['a && b', 'a가 falsy면 a', '0 && "OK"', '0'],
        ['!x', 'truthy/falsy를 뒤집어 <b>진짜 boolean</b>', '![]', 'false'],
        ['!!x', '두 번 뒤집어 <b>truthy 판정만</b> 얻기', '!!"hi"', 'true'],
      ])}
      <div class="card"><div class="file-label">🔬 실행 — falsy 8개 & truthy 함정</div><div data-m="truthy"></div></div>
      <div class="card"><div class="file-label">⏱ 판정 시뮬레이션 — <code>if("0")</code>은 왜 실행되나 (다음 ▶)</div><div data-m="sim-tobool"></div></div>
      <div class="card"><div class="file-label">⏱ 시간 시뮬레이션 — <code>"" || "익명"</code> 의 참·거짓 판정 (다음 ▶)</div><div data-m="sim-truthy"></div></div>
      <div class="card"><div class="file-label">⏱ 응용 — 후보가 셋: <code>nick || name || "익명"</code> (기본값 사슬)</div><div data-m="sim-chain"></div></div>
      <span class="learn-tag">🔗 같은 사슬을 <code>??</code>로 하면 훑는 규칙만 다르다 — <code>""</code>·<code>0</code>은 <b>건너뛰지 않고</b> <b>null·undefined일 때만</b> 다음으로. <button class="inline-goto" data-scroll="sim-default"><code>||</code> vs <code>??</code> 대비 보기 ↓</button></span>

      <h3 class="section-title">🎯 반복 드릴 — 값만 바꿔 손에 붙이기</h3>
      <span class="learn-tag">📎 예측해서 빈칸을 채워라 — <code>+</code>vs<code>-</code> 강제 · falsy 판별 · <code>==</code>vs<code>===</code> (틀리면 다시)</span>
      <div data-m="coerce-drill"></div>

      <h3 class="section-title">C. 값을 고르는 짧은 표기 — 삼항 · <code>||</code> · <code>??</code></h3>
      <p class="section-desc">조건에 따라 <b>값 하나를 고르는</b> 짧은 표기 셋. <b>삼항</b>은 조건으로, <code>||</code>·<code>??</code>는 "없으면 기본값"으로 고른다.</p>
      ${tbl([
        ['a ? b : c', '삼항 — a가 truthy면 b, 아니면 c', '85>=60 ? "합격":"불합격"', '"합격"'],
        ['a || b', '기본값 — a가 <b>falsy면</b> b (단락 평가)', '"" || "익명"', '"익명"'],
        ['a ?? b', '널 병합 — a가 <b>null/undefined일 때만</b> b', 'null ?? 10', '10'],
      ])}
      <span class="learn-tag">⚠️ <code>||</code>는 <code>0</code>·<code>""</code>·<code>false</code>도 falsy라 <b>날려버린다</b> — "값이 아예 없을 때만"이면 <code>??</code></span>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔮 먼저 예측 — 같은 <code>count = 0</code> 인데 결과가?</div>
        <div data-m="pq-def1"></div>
        <div data-m="pq-def2"></div>
      </div>
      <div class="card"><div class="file-label">⏱ 시간 시뮬레이션 — <code>0 || 10</code> vs <code>0 ?? 10</code> (다음 ▶)</div><div data-m="sim-default"></div></div>
      <div class="card"><div class="file-label">🔬 실행 — 삼항·||·?? 나란히</div><div data-m="run-default"></div></div>
      <p class="section-desc">삼항의 <b>단계 추적</b>(조건→값)은 조건 챕터에 있다 → <button class="inline-goto" data-goto="4">4강 · ④ 삼항</button>. 📚 위키: <a href="https://ko.wikipedia.org/wiki/조건_연산자" target="_blank" rel="noopener noreferrer">삼항 연산자 ↗</a></p>
      <div data-m="def-drill"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>형 변환</b>은 명시적(<code>Number()</code>…)과 암묵적(연산자가 강제) 둘, <b>falsy는 딱 8개</b>(나머지 truthy). 둘 다 부르는 도구가 아니라 <b>언어가 자동 적용하는 규칙</b>이다. 이 규칙이 <b>표현식 축약에 끼어드는 건 3강(3-4·3-6)</b>, <b>조건 분기로 쓰이는 건 4강</b>에서 본다.</p>
      </div>

      <div class="practice-nav">
        <button class="chip" data-goto="builtins">← 레퍼런스 목차</button>
        <span class="practice-nav-dots">📐 언어 규칙</span>
        <button class="chip on" data-goto="4">4강 · 조건에서 쓰기 →</button>
      </div>
    `
    root.querySelector('[data-m="cast"]').append(Runner({ showBox: false, code: [
      '// 🙋 명시적 — 내가 직접',
      'print(Number("12") + 3)       // 15',
      '// 문자 → 숫자',
      'print(Number("abc"))          // NaN',
      '// 못 바꾸면',
      'print(String(12) + "!")       // "12!"',
      'print(parseInt("12px"))       // 12',
      '// 앞 정수만',
      '',
      '// 🤖 암묵적 — 연산자가 알아서 (같은 "5"인데 다르다)',
      'print("5" + 1)                // "51"',
      '// +는 이어붙임',
      'print("5" - 1)                // 4',
      '// −는 숫자로 강제',
      'print(true + 1)               // 2',
      '// true → 1',
      'print(1 == "1", 1 === "1")    // true false',
      '// ==는 강제, ===는 안 함',
    ].join('\n') }))
    root.querySelector('[data-m="truthy"]').append(Runner({ showBox: false, code: [
      '// ❌ falsy 8개 — 전부 false 취급',
      'print(Boolean(false), Boolean(0), Boolean(""))       // false false false',
      'print(Boolean(null), Boolean(undefined), Boolean(NaN)) // false false false',
      '',
      '// ⚠️ truthy 함정 — 이건 다 true다!',
      'print(Boolean("0"), Boolean("false"), Boolean(" "))  // true true true',
      'print(Boolean([]), Boolean({}))                      // true true',
      '',
      '// 실전 패턴',
      'print("" || "익명")           // "익명"',
      '// 빈값이면 기본값',
      'print(0 && "실행")            // 0',
      '// 앞이 falsy면 멈춤',
    ].join('\n') }))
    root.querySelector('[data-m="sim-tobool"]').append(ExprReduce({
      title: 'if ("0") { … }  — "0"은 참일까 거짓일까?',
      steps: [
        { code: 'if ("0") { 실행 }', mark: '"0"', note: '조건 자리의 <b>"0"</b>을 JS가 <b>참/거짓으로</b> 본다(값→불리언 강제, ToBoolean).' },
        { code: '"0" 가 falsy 8개 목록에 있나?', mark: 'falsy 8개', note: 'falsy는 딱 8개: <code>false · 0 · -0 · 0n · "" · null · undefined · NaN</code>. <b>"0"은 그 목록에 없다</b> — 빈 문자열 <code>""</code>만 falsy다.' },
        { code: '"0" → ✅ truthy → 블록 실행', note: '목록에 없으니 <b>참</b> → <code>{ … }</code>이 <b>실행된다</b>. "0"이 숫자 0처럼 보여도 <b>글자</b>라 truthy — 대표 함정. (반대로 <code>if("")</code>는 빈 문자열이라 falsy → 안 함)' },
      ],
    }))

    // 🔮 예측 먼저(표 보기 전) — 스포일러 없이 감을 깨운다.
    root.querySelector('[data-m="pq1"]').append(Quiz({
      q: '먼저 예측 — <code>"5" - 1</code> 의 값은?',
      options: ['<code>"51"</code> (이어붙임)', '<code>4</code> (숫자로 강제)', '<code>NaN</code>'],
      answer: 1,
      explain: '<code>-</code>는 문자열 "5"를 <b>숫자 5로 강제</b> → 5−1=<b>4</b>. (<code>+</code>였다면 이어붙여 "51" — 연산자마다 다르다.)',
    }))
    root.querySelector('[data-m="pq2"]').append(Quiz({
      q: '먼저 예측 — <code>Boolean("0")</code> 은?',
      options: ['<code>false</code> (0이니까)', '<code>true</code> ("0"은 글자니까)'],
      answer: 1,
      explain: '<code>"0"</code>은 <b>빈 문자열이 아닌 글자</b> → <b>truthy</b>. falsy인 문자열은 빈 <code>""</code>뿐. 숫자 0과 헷갈리지 말 것.',
    }))
    // ⏱ 시간 시뮬레이션 — ExprReduce 재사용(위젯 수정 없이 시나리오만).
    root.querySelector('[data-m="sim-coerce"]').append(ExprReduce({
      title: '"5" - 1   (연산자가 타입을 강제한다)',
      steps: [
        { code: 'const r = "5" - 1', mark: '"5" - 1', note: '<code>-</code>(산술)는 문자열을 <b>숫자로 강제</b>한다 — "5"를 숫자 <b>5</b>로.' },
        { code: 'const r = 5 - 1', mark: '5 - 1', note: '이제 숫자끼리 <b>5 - 1</b>.' },
        { code: 'const r = 4', note: '= <b>4</b>. 만약 <code>+</code>였다면 <code>"5" + 1</code>은 <b>이어붙여 "51"</b> — 같은 "5"인데 연산자가 강제 방향을 가른다.' },
      ],
    }))
    root.querySelector('[data-m="sim-truthy"]').append(ExprReduce({
      title: 'name || "익명"   // name = ""',
      steps: [
        { code: 'const who = "" || "익명"', mark: '""', note: '① <code>||</code>는 <b>왼쪽부터 truthy/falsy로</b> 본다. <b>""(빈 문자열)은 falsy 8개 중 하나</b>.' },
        { code: '"" 는 falsy  →  ❌ 거짓  →  오른쪽 사용', note: '② 왼쪽이 <b style="color:var(--red)">거짓(falsy)</b>이라 <code>||</code>는 <b>오른쪽</b>으로 넘어간다(단락 평가).' },
        { code: 'const who = "익명"', note: '③ = <b>"익명"</b>. "빈 값이면 기본값" 패턴. (name이 <code>"홍길동"</code>이면 <b style="color:var(--green)">truthy</b> → 왼쪽 그대로)' },
      ],
    }))
    // ⏱ 응용 — 후보 셋의 기본값 사슬. ||를 이어 쓰면 왼→오로 훑어 '처음 만난 truthy'에서 멈춘다(단락).
    root.querySelector('[data-m="sim-chain"]').append(ExprReduce({
      title: 'const 표시이름 = nick || name || "익명"   // nick = "", name = "홍길동"',
      steps: [
        { code: 'const 표시이름 = nick || name || "익명"', mark: 'nick', note: '① 후보가 <b>셋</b>. <code>||</code>는 언제나 <b>왼쪽부터</b> 훑는다. 첫 후보 <code>nick</code> = <b>""</b>(별명 안 정함).' },
        { code: '"" || name || "익명"', mark: '""', note: '② <b>""은 falsy</b> → 이 후보는 버리고 <b>다음 후보</b>로 넘어간다.' },
        { code: 'name || "익명"', mark: 'name', note: '③ 다음 후보 <code>name</code> = <b>"홍길동"</b>. 이건 truthy일까?' },
        { code: '"홍길동" || "익명"', mark: '"홍길동"', note: '④ <b>"홍길동"은 truthy</b> → <b>여기서 멈춘다(단락)</b>. 오른쪽 <code>"익명"</code>은 <b>보지도 않는다</b>.' },
        { code: 'const 표시이름 = "홍길동"', note: '⑤ = <b>"홍길동"</b>. 여러 후보를 <b>왼→오</b>로 훑어 <b>처음 만난 truthy</b>를 고른다 — <b>기본값 사슬(fallback chain)</b>. 별명 있으면 별명, 없으면 실명, 그것도 없으면 <code>"익명"</code>.' },
      ],
    }))
    // 🎯 반복 드릴 — 예측 패턴(빈칸=예측값, 맞으면 true). 값만 바꿔 여러 번.
    root.querySelector('[data-m="coerce-drill"]').append(Drill({
      pattern: '빈칸에 "이 식의 값"을 예측해 넣어라 — 맞으면 true가 출력된다.',
      problems: [
        { ask: '문자열 − 숫자: −는 숫자로 강제', code: 'print(("5" - 1) === ____)', expect: 'true', answer: '4', hint: '−는 "5"를 숫자 5로' },
        { ask: '숫자 + 문자열: +는 이어붙임', code: 'print((1 + "2") === ____)', expect: 'true', answer: '"12"', hint: '문자열이 끼면 붙인다(따옴표 포함!)' },
        { ask: 'true는 숫자 1로 강제', code: 'print((true + 1) === ____)', expect: 'true', answer: '2', hint: 'true → 1' },
        { ask: 'falsy 판별: 빈 문자열', code: 'print(Boolean("") === ____)', expect: 'true', answer: 'false', hint: '""는 falsy 8개 중 하나' },
        { ask: 'truthy 함정: "0"은 글자', code: 'print(Boolean("0") === ____)', expect: 'true', answer: 'true', hint: '"0"은 빈 문자열이 아니다' },
        { ask: '기본값 패턴 ||', code: 'print(("" || "기본") === ____)', expect: 'true', answer: '"기본"', hint: '왼쪽이 falsy면 오른쪽' },
        { ask: '== 는 타입을 강제', code: 'print((1 == "1") === ____)', expect: 'true', answer: 'true', hint: '==는 타입 맞춰 강제' },
        { ask: '=== 는 타입까지 본다', code: 'print((1 === "1") === ____)', expect: 'true', answer: 'false', hint: '숫자 vs 문자열 → 다름' },
      ],
    }))
    // C. 값 고르기 — 삼항·||·?? · 핵심은 count=0에서 ||와 ??가 갈리는 것.
    root.querySelector('[data-m="pq-def1"]').append(Quiz({
      q: '<code>let count = 0</code> 일 때 <code>count || 10</code> 은?',
      options: ['<code>0</code> (count 그대로)', '<code>10</code> (0이 falsy라 날아감)', '에러'],
      answer: 1,
      explain: '<code>||</code>는 왼쪽을 truthy/falsy로 본다 → <b>0은 falsy</b>라 버리고 <b>10</b>. count가 <b>진짜 0</b>이어도 10으로 바뀐다 — 흔한 버그.',
    }))
    root.querySelector('[data-m="pq-def2"]').append(Quiz({
      q: '이번엔 <code>count ?? 10</code> (여전히 count=0) 은?',
      options: ['<code>0</code> (0은 null/undefined 아님)', '<code>10</code> (아까처럼)'],
      answer: 0,
      explain: '<code>??</code>(널 병합)는 왼쪽이 <b>null 또는 undefined일 때만</b> 오른쪽. <b>0은 둘 다 아니라</b> 그대로 <b>0</b>. "값이 아예 없을 때만 기본값"이면 <code>??</code>.',
    }))
    root.querySelector('[data-m="sim-default"]').append(ExprReduce({
      title: 'count || 10   vs   count ?? 10   // count = 0 (진짜 0)',
      steps: [
        { code: 'count || 10', mark: 'count', note: 'count = <b>0</b>. <code>||</code>는 왼쪽을 <b>truthy/falsy</b>로 본다.' },
        { code: '0 || 10', mark: '0', note: '<b>0은 falsy 8개 중 하나</b> → <code>||</code>는 왼쪽을 버리고 <b>오른쪽</b>으로.' },
        { code: '10', note: '= <b>10</b>. count가 <b>진짜 0</b>이었는데 <b style="color:var(--red)">10으로 바뀌었다 — 버그!</b> (0을 유효한 값으로 쓸 때 <code>||</code>는 위험)' },
        { code: 'count ?? 10', mark: 'count', note: '이번엔 <code>??</code>(널 병합). 왼쪽이 <b>null 또는 undefined일 때만</b> 오른쪽을 쓴다.' },
        { code: '0 ?? 10', mark: '0', note: '<b>0은 null도 undefined도 아니다</b> → 왼쪽을 <b style="color:var(--green)">그대로 유지</b>.' },
        { code: '0', note: '= <b>0</b>. "값이 <b>아예 없을 때만</b>(null·undefined) 기본값"이 목적이면 <code>??</code>가 정답. (빈 문자열·0을 falsy로 걸러도 되면 <code>||</code>)' },
      ],
    }))
    root.querySelector('[data-m="run-default"]').append(Runner({ showBox: false, code: [
      'let count = 0',
      'print(count || 10)   // 10',
      '// ← 0이 falsy라 날아감 (함정!)',
      'print(count ?? 10)   // 0',
      '// ??는 null/undefined일 때만',
      '',
      'print("" || "익명")   // "익명"',
      '// ← 빈칸이면 기본값 (여기선 ||가 맞다)',
      'print(null ?? "기본") // "기본"',
      '// 값이 아예 없을 때',
      '',
      'let score = 85',
      'print(score >= 60 ? "합격" : "불합격")   // "합격"',
      '// 삼항: 조건으로 고르기',
    ].join('\n') }))
    root.querySelector('[data-m="def-drill"]').append(Drill({
      pattern: '빈칸에 예측값을 넣어라 — 맞으면 true. (0에서 ||와 ??가 갈린다)',
      problems: [
        { ask: '|| : 0은 falsy라 날아감', code: 'print((0 || 10) === ____)', expect: 'true', answer: '10', hint: '0은 falsy' },
        { ask: '?? : 0은 유지', code: 'print((0 ?? 10) === ____)', expect: 'true', answer: '0', hint: '0은 null/undefined 아님' },
        { ask: '|| : 빈칸이면 기본값', code: 'print(("" || "익명") === ____)', expect: 'true', answer: '"익명"', hint: '""는 falsy(따옴표!)' },
        { ask: '삼항 : 조건으로 고르기', code: 'print((5 > 3 ? "y" : "n") === ____)', expect: 'true', answer: '"y"', hint: '5>3 참 → ? 뒤' },
      ],
    }))
    wireNav(root)
  }
})()
