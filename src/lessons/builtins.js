// 📚 내장 기능(빌트인) 레퍼런스 — 드릴에서 만나는 기능을 분류별로 카탈로그(무엇+예+실행). design-principles: 진짜 도는 코드.
// 오해: 이 기능들은 "따로 외워야 하는 마법"? → 아니다, 값·배열·객체에 딸린 도구. 필요할 때 찾아 쓰면 된다.
// 왜:  드릴이 typeof·sort·Object.keys 등을 쓰는데 소개한 적이 없어 — 여기서 한곳에 모아 "이게 뭔지"를 준다.
// 대비: 언어 문법(typeof·%·**·delete) vs 내장 함수/메서드(Number()·[].map()·Object.keys())

;(function () {
  window.Lessons = window.Lessons || {}

  window.Lessons['builtins'] = function render(root) {
    const cell = (c) => '<code>' + c.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code>'
    const tbl = (rows) => `<div class="table-wrap"><table class="ref-table">
      <thead><tr><th>기능</th><th>하는 일</th><th>예 → 결과</th></tr></thead>
      <tbody>${rows.map(r => `<tr><td>${cell(r[0])}</td><td>${r[1]}</td><td>${cell(r[2])} → ${cell(r[3])}</td></tr>`).join('')}</tbody>
    </table></div>`

    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">📚 레퍼런스</span>
        <h2>내장 기능(빌트인) — 값에 딸린 도구 모음</h2>
        <p>실습에서 <code>typeof</code>·<code>sort</code>·<code>Object.keys</code> 같은 <b>내장 기능</b>을 만난다. 외울 필요 없다 — <b>여기서 "이게 뭔지" 찾아보고</b> 예제를 ▶ 눌러 확인하면 된다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 이 페이지 쓰는 법</span>
        <p>JS엔 값·배열·객체를 다루는 <b>이미 만들어진 도구</b>가 딸려 있다. 분류별 표로 <b>무엇을 하는지</b> 훑고, 각 예제를 <b>실행</b>해 결과를 눈으로 본다. 드릴에서 막히면 이 페이지로 온다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/자료형" target="_blank" rel="noopener noreferrer">자료형 ↗</a> · <a href="https://ko.wikipedia.org/wiki/배열" target="_blank" rel="noopener noreferrer">배열 ↗</a> · <a href="https://ko.wikipedia.org/wiki/연산자_(프로그래밍)" target="_blank" rel="noopener noreferrer">연산자 ↗</a></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "내장 기능은 다 외워야 한다"</div>
        <p class="section-desc" style="margin:0">아니다. 프로는 <b>필요할 때 찾아 쓴다</b>. 중요한 건 "이런 도구가 있다"는 감과, <b>그게 값을 바꾸는지(원본 변경) 새 값을 주는지</b>를 아는 것. 표의 마지막 열(→ 결과)을 눈에 익혀라.</p>
      </div>

      <h3 class="section-title">① 타입·판별 — 이 값이 뭐지?</h3>
      ${tbl([
        ['typeof x', '값의 <b>타입 이름</b>을 문자열로', 'typeof 24', '"number"'],
        ['typeof x', '', 'typeof "hi"', '"string"'],
        ['typeof x', '함정: null도 <b>"object"</b>(옛 버그)', 'typeof null', '"object"'],
        ['x instanceof C', 'x가 C로 만든 것인가', '[] instanceof Array', 'true'],
        ['NaN', '"숫자가 아님"(실패한 계산). <b>자기와도 다름</b>', 'NaN === NaN', 'false'],
        ['Boolean(x)', 'truthy/falsy를 참/거짓으로', 'Boolean(0)', 'false'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="type"></div></div>

      <h3 class="section-title">② 숫자·수학</h3>
      ${tbl([
        ['Number(s)', '문자를 <b>숫자로</b> 변환', 'Number("12")', '12'],
        ['Math.max(a,b,…)', '가장 큰 값', 'Math.max(1, 9, 3)', '9'],
        ['a ** b', 'a의 b제곱(지수)', '2 ** 3', '8'],
        ['a % b', 'a를 b로 나눈 <b>나머지</b>', '10 % 3', '1'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="num"></div></div>

      <h3 class="section-title">③ 문자열</h3>
      ${tbl([
        ['s.length', '글자 수', '"abc".length', '3'],
        ['s[i]', 'i번째 글자(0부터)', '"abc"[1]', '"b"'],
        ['s.toUpperCase()', '전부 대문자(새 문자열)', '"hi".toUpperCase()', '"HI"'],
        ['s.split(x)', 'x로 잘라 <b>배열</b>로', '"a,b,c".split(",")', '["a","b","c"]'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="str"></div></div>

      <h3 class="section-title">④ 배열 — 꺼내기·바꾸기 (6강)</h3>
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

      <h3 class="section-title">⑤ 배열 — 변환·훑기 (7강에서 자세히)</h3>
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

      <h3 class="section-title">⑥ 객체</h3>
      ${tbl([
        ['o.키 / o["키"]', '속성 꺼내기·넣기 (8강)', '({a:1}).a', '1'],
        ['Object.keys(o)', '<b>키 이름들</b>을 배열로', 'Object.keys({a:1,b:2})', '["a","b"]'],
        ['delete o.키', '속성을 <b>지운다</b>', 'delete o.a', '// o.a는 undefined'],
      ])}
      <div class="card"><div class="file-label">🔬 실행</div><div data-m="obj"></div></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">내장 기능은 <b>값·배열·객체에 딸린 도구</b>다. 외우기보다 <b>①이런 게 있다 ②원본을 바꾸나(push·pop·sort) 새 값을 주나(map·filter·slice·includes)</b>를 안다. 화면 기능(<code>createElement</code>·<code>querySelector</code>·<code>addEventListener</code>)은 <b>9강 DOM</b>에서 다룬다.</p>
      </div>
    `

    root.querySelector('[data-m="type"]').append(Runner({ showBox: false, code: [
      'print(typeof 24)        // "number"',
      'print(typeof "hi")      // "string"',
      'print(typeof null)      // "object"  (유명한 함정)',
      'print([] instanceof Array)  // true',
      'print(NaN === NaN)      // false  (자기와도 다름)',
    ].join('\n') }))
    root.querySelector('[data-m="num"]').append(Runner({ showBox: false, code: [
      'print(Number("12") + 3)   // 15',
      'print(Math.max(1, 9, 3))  // 9',
      'print(2 ** 3)             // 8  (2의 3제곱)',
      'print(10 % 3)             // 1  (나머지)',
    ].join('\n') }))
    root.querySelector('[data-m="str"]').append(Runner({ showBox: false, code: [
      'print("abc".length)          // 3',
      'print("abc"[1])              // "b"',
      'print("hi".toUpperCase())    // "HI"',
      'print("a,b,c".split(","))    // ["a","b","c"]',
    ].join('\n') }))
    root.querySelector('[data-m="arr"]').append(Runner({ showBox: false, code: [
      'let a = [3, 20, 100]',
      'print(a.includes(20))    // true',
      'print(a.indexOf(100))    // 2',
      'print([1, 2, 3].join("-"))   // "1-2-3"',
      'print(a.sort())          // [100,20,3]  (기본은 문자 비교!)',
      'a.push(9); print(a.length)   // 4  (push는 원본 변경)',
    ].join('\n') }))
    root.querySelector('[data-m="arr2"]').append(Runner({ showBox: false, code: [
      'print([1, 2, 3].map(x => x * 2))       // [2,4,6]',
      'print([1, 2, 3].filter(x => x > 1))    // [2,3]',
      'print([1, 2, 3].reduce((s, x) => s + x, 0))  // 6',
      'print([5, 10, 15].find(x => x > 7))    // 10',
      'print([2, 4].every(x => x % 2 === 0))  // true',
    ].join('\n') }))
    root.querySelector('[data-m="obj"]').append(Runner({ showBox: false, code: [
      'let o = { a: 1, b: 2 }',
      'print(Object.keys(o))    // ["a","b"]',
      'print(Object.keys(o).length)  // 2',
      'delete o.a',
      'print(o.a)               // undefined  (지워짐)',
    ].join('\n') }))
  }
})()
