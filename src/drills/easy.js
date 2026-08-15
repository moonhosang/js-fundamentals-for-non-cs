// 🟢 쉬움 드릴 — 동일 유형 반복(automaticity). 값만 바꿔 손에 붙인다. (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것(목표 결과만). 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const E = window.Drills.easy

  // ── 1강 · 값과 타입 : 타입·계산 결과를 스스로 예측 (답은 문제에 없음) ──
  E['1'] = {
    pattern: '🟢 쉬움 · 값의 타입·계산 결과를 스스로 예측해 채운다 (=== true 면 정답)',
    problems: [
      { label: '숫자의 타입', ask: '숫자 24의 타입 이름은? (typeof 결과)', code: 'print((typeof 24) === "____")', expect: 'true', answer: 'number', hint: '숫자 = number' },
      { label: '글자의 타입', ask: '글자 "안녕"의 타입 이름은?', code: 'print((typeof "안녕") === "____")', expect: 'true', answer: 'string', hint: '글자 = string' },
      { label: '참거짓의 타입', ask: '참/거짓 값의 타입 이름은?', code: 'print((typeof true) === "____")', expect: 'true', answer: 'boolean', hint: '참거짓 = boolean' },
      { label: '재할당 결과', ask: 'x = 10 다음 x = x + 5 를 하면 x는?', code: 'let x = 10\nx = x + 5\nprint(x === ____)', expect: 'true', answer: '15', hint: '10 + 5' },
      { label: '복사는 독립', ask: 'a를 복사해 b를 만들고 b만 9로 바꾸면 a는?', code: 'let a = 5\nlet b = a\nb = 9\nprint(a === ____)', expect: 'true', answer: '5', hint: '원시값 복사 → a는 그대로' },
    ],
  }

  // ── 2강 · 계산과 문자열 : + 와 템플릿의 결과를 예측 ──
  E['2'] = {
    pattern: '🟢 쉬움 · 이어붙이기·템플릿의 결과를 스스로 예측',
    problems: [
      { label: '숫자 덧셈', ask: '3 + 4 는?', code: 'print((3 + 4) === ____)', expect: 'true', answer: '7', hint: '둘 다 숫자 → 계산' },
      { label: '글자+숫자', ask: '"3" + 4 는? (글자+숫자)', code: 'print(("3" + 4) === "____")', expect: 'true', answer: '34', hint: '글자로 이어붙임 → "34"' },
      { label: '글자+글자', ask: '"가" + "나" 는?', code: 'print(("가" + "나") === "____")', expect: 'true', answer: '가나', hint: '이어붙이기' },
      { label: '템플릿', ask: 'n이 5일 때 `${n}점` 은?', code: 'let n = 5\nprint((`${n}점`) === "____")', expect: 'true', answer: '5점', hint: '${n} 자리에 5' },
      { label: '두 글자', ask: '"ab" + "cd" 는?', code: 'print(("ab" + "cd") === "____")', expect: 'true', answer: 'abcd', hint: '이어붙이기' },
    ],
  }

  // ── 3강 · 표현식 : 우선순위·축약(=== 로 결과 맞히기) ──
  E['3'] = {
    pattern: '🟢 쉬움 · 식을 축약한 결과값을 빈칸에 (=== true 면 정답) — 우선순위 기본',
    problems: [
      { label: '곱셈 먼저', ask: '2 + 3 * 4 는 얼마로 축약될까요? (곱셈 먼저!)', code: 'print((2 + 3 * 4) === ____)', expect: 'true', answer: '14', hint: '3*4=12, +2 → 14' },
      { label: '괄호가 먼저', ask: '(2 + 3) * 4 는? (괄호가 덧셈을 먼저로)', code: 'print(((2 + 3) * 4) === ____)', expect: 'true', answer: '20', hint: '(5)*4 → 20' },
      { label: '좌결합', ask: '10 - 2 - 3 은? (뺄셈은 왼쪽부터)', code: 'print((10 - 2 - 3) === ____)', expect: 'true', answer: '5', hint: '(10-2)-3 → 5' },
      { label: '두 항(term)', ask: '2 * 3 + 4 * 5 는? (곱셈 둘 먼저)', code: 'print((2 * 3 + 4 * 5) === ____)', expect: 'true', answer: '26', hint: '6 + 20 → 26' },
      { label: '섞인 식', ask: '5 + 2 * 3 은?', code: 'print((5 + 2 * 3) === ____)', expect: 'true', answer: '11', hint: '2*3 먼저 → 5+6' },
    ],
  }

  // ── 4강 · 조건 : 비교의 결과를 스스로 예측 (답은 문제에 없음) ──
  E['4'] = {
    pattern: '🟢 쉬움 · 비교의 결과(참/거짓)를 스스로 계산해 채운다 (=== true 면 정답)',
    problems: [
      { label: '10 > 5', ask: '10은 5보다 큰가? 결과(참/거짓)를 넣어라.', code: 'print((10 > 5) === ____)', expect: 'true', answer: 'true', hint: '참이면 true' },
      { label: '3 >= 3', ask: '3은 3보다 크거나 같은가? (>= 에 주의)', code: 'print((3 >= 3) === ____)', expect: 'true', answer: 'true', hint: '같아도 >= 는 참' },
      { label: '5 !== 5', ask: '5와 5는 서로 "다른가"? (!== = 다름)', code: 'print((5 !== 5) === ____)', expect: 'true', answer: 'false', hint: '같으니 "다르다"는 거짓' },
      { label: '"5" === 5', ask: '문자 "5"와 숫자 5는 (타입까지 보는 ===로) 같은가?', code: 'print(("5" === 5) === ____)', expect: 'true', answer: 'false', hint: '타입이 달라 false' },
      { label: '7 <= 10', ask: '7은 10보다 작거나 같은가?', code: 'print((7 <= 10) === ____)', expect: 'true', answer: 'true', hint: '참' },
    ],
  }

  // ── 5강 · 함수 : 함수의 반환값을 예측 ──
  E['5'] = {
    pattern: '🟢 쉬움 · 함수를 부르면 무엇이 돌아오는지 예측',
    problems: [
      { label: '두 인수 합', ask: 'add는 두 인수를 더한다. add(2, 3)은?', code: 'function add(a, b) { return a + b }\nprint(add(2, 3) === ____)', expect: 'true', answer: '5', hint: '2 + 3' },
      { label: '2배', ask: 'dbl은 2배. dbl(4)는?', code: 'function dbl(n) { return n * 2 }\nprint(dbl(4) === ____)', expect: 'true', answer: '8', hint: '4 × 2' },
      { label: '문자 반환', ask: 'greet는 이름에 "님"을 붙인다. greet("z")는?', code: 'function greet(n) { return n + "님" }\nprint(greet("z") === "____")', expect: 'true', answer: 'z님', hint: '"z" + "님"' },
      { label: '제곱', ask: 'sq는 제곱. sq(5)는?', code: 'function sq(x) { return x * x }\nprint(sq(5) === ____)', expect: 'true', answer: '25', hint: '5 × 5' },
      { label: 'return 없으면', ask: 'return이 없는 함수는 무엇을 돌려주나?', code: 'function f() { let x = 1 }\nprint(f() === ____)', expect: 'true', answer: 'undefined', hint: '돌려줄 게 없으면 undefined' },
    ],
  }

  // ── 6강 · 배열 : 개수·인덱스·push 결과를 예측 (번호는 0부터!) ──
  E['6'] = {
    pattern: '🟢 쉬움 · 개수·인덱스·push 결과를 스스로 예측',
    problems: [
      { label: '개수', ask: '[1,2,3,4] 의 요소 개수는?', code: 'let a = [1, 2, 3, 4]\nprint(a.length === ____)', expect: 'true', answer: '4', hint: '세어 본다' },
      { label: '번호 1', ask: '[10,20,30] 에서 번호 1(두 번째) 요소는?', code: 'let a = [10, 20, 30]\nprint(a[1] === ____)', expect: 'true', answer: '20', hint: '0,1,2 → 1은 두 번째' },
      { label: '빈 배열', ask: '빈 배열의 요소 개수는?', code: 'let a = []\nprint(a.length === ____)', expect: 'true', answer: '0', hint: '없으면 0' },
      { label: 'push 후 개수', ask: '3개짜리 배열에 하나 push하면 개수는?', code: 'let a = [5, 6, 7]\na.push(8)\nprint(a.length === ____)', expect: 'true', answer: '4', hint: '3 + 1' },
      { label: '마지막', ask: '[1,2,3] 의 마지막 요소는?', code: 'let a = [1, 2, 3]\nprint(a[a.length - 1] === ____)', expect: 'true', answer: '3', hint: 'length-1 번' },
    ],
  }

  // ── 7강 · 반복과 map : map·filter·reduce의 결과를 예측 ──
  E['7'] = {
    pattern: '🟢 쉬움 · map·filter·reduce·forEach의 결과를 스스로 예측',
    problems: [
      { label: 'map 첫 요소', ask: '각 요소를 2배 한 배열의 첫 요소는?', code: 'print([1, 2, 3].map(x => x * 2)[0] === ____)', expect: 'true', answer: '2', hint: '1 × 2' },
      { label: 'map 마지막', ask: '각 요소에 +1 한 배열의 마지막 요소는?', code: 'print([1, 2, 3].map(x => x + 1)[2] === ____)', expect: 'true', answer: '4', hint: '3 + 1' },
      { label: 'filter 개수', ask: '2보다 큰 것만 거른 배열의 개수는?', code: 'print([1, 2, 3, 4].filter(x => x > 2).length === ____)', expect: 'true', answer: '2', hint: '3,4 → 2개' },
      { label: 'reduce 합', ask: '[10,20,30] 을 다 더하면?', code: 'print([10, 20, 30].reduce((a, b) => a + b, 0) === ____)', expect: 'true', answer: '60', hint: '10+20+30' },
      { label: 'forEach 합', ask: 'forEach로 sum에 다 더하면?', code: 'let sum = 0\nlet nums = [1, 2, 3]\nnums.forEach(x => sum = sum + x)\nprint(sum === ____)', expect: 'true', answer: '6', hint: '1+2+3' },
    ],
  }

  // ── 8강 · 객체 : 속성 값을 예측 ──
  E['8'] = {
    pattern: '🟢 쉬움 · 객체에서 점(.)으로 꺼낸 값을 예측',
    problems: [
      { label: '점으로 꺼내기', ask: 'u.age 는?', code: 'let u = { age: 24 }\nprint(u.age === ____)', expect: 'true', answer: '24', hint: 'age 값' },
      { label: '다른 속성', ask: 'car.brand 는?', code: 'let car = { brand: "기아", year: 2020 }\nprint(car.brand === "____")', expect: 'true', answer: '기아', hint: 'brand 값' },
      { label: '값 바꾸기', ask: '바꾼 뒤 u.hp 는?', code: 'let u = { hp: 100 }\nu.hp = 50\nprint(u.hp === ____)', expect: 'true', answer: '50', hint: '방금 넣은 값' },
      { label: '속성 추가', ask: '추가한 뒤 o.color 는?', code: 'let o = {}\no.color = "빨강"\nprint(o.color === "____")', expect: 'true', answer: '빨강', hint: '방금 추가한 값' },
      { label: '없는 키', ask: 'u엔 name만 있다. u.age 는?', code: 'let u = { name: "민지" }\nprint(u.age === ____)', expect: 'true', answer: 'undefined', hint: '없는 키 = undefined' },
    ],
  }

  // ── 9강 · DOM : 요소 속성을 바꾼 뒤 그 값을 예측 ──
  E['9'] = {
    pattern: '🟢 쉬움 · textContent·style·className·id를 바꾼 뒤 그 값을 예측',
    problems: [
      { label: '글자', ask: 'el.textContent 는?', code: 'let el = document.createElement("div")\nel.textContent = "안녕"\nprint(el.textContent === "____")', expect: 'true', answer: '안녕', hint: '방금 넣은 글자' },
      { label: '색', ask: 'el.style.color 는?', code: 'let el = document.createElement("div")\nel.style.color = "red"\nprint(el.style.color === "____")', expect: 'true', answer: 'red', hint: '방금 정한 색' },
      { label: '클래스', ask: 'el.className 는?', code: 'let el = document.createElement("div")\nel.className = "on"\nprint(el.className === "____")', expect: 'true', answer: 'on', hint: '방금 정한 클래스' },
      { label: '아이디', ask: 'el.id 는?', code: 'let el = document.createElement("div")\nel.id = "title"\nprint(el.id === "____")', expect: 'true', answer: 'title', hint: '방금 정한 id' },
      { label: '붙인 개수', ask: 'span 하나를 붙이면 자식 개수는?', code: 'let box2 = document.createElement("div")\nbox2.append(document.createElement("span"))\nprint(box2.children.length === ____)', expect: 'true', answer: '1', hint: '하나 붙임' },
    ],
  }

  // ── 10강 · 실전 캡스톤 : 배운 조각의 결과를 예측(기본) ──
  E['10'] = {
    pattern: '🟢 쉬움 · 값·문자열·배열·객체·함수·DOM의 결과를 한 문제씩 예측',
    problems: [
      { label: '값·문자열', ask: 'name="민지"일 때 "안녕, " + name + "님" 은?', code: 'let name = "민지"\nprint(("안녕, " + name + "님") === "____")', expect: 'true', answer: '안녕, 민지님', hint: '이어붙이기' },
      { label: '배열 개수', ask: 'users의 개수는?', code: 'let users = ["민지", "지훈", "서연"]\nprint(users.length === ____)', expect: 'true', answer: '3', hint: '세 명' },
      { label: '객체 속성', ask: 'p.name + "는 " + p.age + "살" 은?', code: 'let p = { name: "콩이", age: 3 }\nprint((p.name + "는 " + p.age + "살") === "____")', expect: 'true', answer: '콩이는 3살', hint: '속성을 이어붙임' },
      { label: 'DOM 글자', ask: 'el.textContent 는?', code: 'let el = document.createElement("div")\nel.textContent = "명함"\nprint(el.textContent === "____")', expect: 'true', answer: '명함', hint: '방금 넣은 글자' },
      { label: '함수 반환', ask: 'greet("지훈") 은?', code: 'function greet(n) { return n + "님 환영!" }\nprint(greet("지훈") === "____")', expect: 'true', answer: '지훈님 환영!', hint: 'n + "님 환영!"' },
    ],
  }

  // ── 🧠 M1 램(ram) : 재할당·복사 독립·typeof 결과를 예측 ──
  E['ram'] = {
    pattern: '🟢 쉬움 · 재할당·복사 독립·typeof 결과를 스스로 예측',
    problems: [
      { label: '재할당', ask: 'x=10 다음 x=x+5 하면 x는?', code: 'let x = 10\nx = x + 5\nprint(x === ____)', expect: 'true', answer: '15', hint: '10 + 5' },
      { label: '숫자 타입', ask: '숫자 값의 타입 이름은?', code: 'print((typeof 99) === "____")', expect: 'true', answer: 'number', hint: '숫자 = number' },
      { label: '복사는 독립', ask: 'b를 99로 바꿔도 a는? (b=a로 복사한 뒤)', code: 'let a = 10\nlet b = a\nb = 99\nprint(a === ____)', expect: 'true', answer: '10', hint: '원시값은 복사 → a는 그대로',
        explain: '원시값(숫자·문자·불리언)은 <code>=</code>로 넘길 때 <b>값을 각자 셀에 복제</b>한다. 그래서 b의 셀을 99로 바꿔도 a의 셀은 10 그대로. (만약 객체였다면 <b>주소를 공유</b>해 함께 바뀐다 — M4-2 참조=공유.)', see: 'ref2', wiki: { label: '원시 자료형', url: 'https://ko.wikipedia.org/wiki/원시_자료형' },
        mem: { title: '왜 a는 10 그대로인가 — 원시값은 각자 셀로 복사', stackLabel: '📇 이름표 장부', code: ['let a = 10', 'let b = a', 'b = 99'], steps: [
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', value: '10' }, { name: 'b', value: '10' }] }], heap: {}, note: '<code>let b = a</code> → 값 10을 <b>b의 셀에 복제</b>. a·b는 <b>각자 셀</b>(별개).' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', value: '10' }, { name: 'b', value: '99', bad: true }] }], heap: {}, note: '<code>b = 99</code>는 <b>b의 셀만</b> 바꾼다. <b>a는 10 그대로</b> — 서로 독립.' },
        ] } },
      { label: 'null', ask: 'memo를 "일부러 비움"으로 만들면? (0이나 빈 글자 말고)', code: 'let memo = "메모"\nmemo = null\nprint(memo === ____)', expect: 'true', answer: 'null', hint: '의도적 빈 값' },
      { label: '글자 타입', ask: '글자 값의 타입 이름은?', code: 'print((typeof "hi") === "____")', expect: 'true', answer: 'string', hint: '글자 = string' },
    ],
  }

  // ── 🧠 M4-1 값=복사(ref) : 한쪽 바꾼 뒤 원본을 예측 ──
  E['ref'] = {
    pattern: '🟢 쉬움 · 원시값은 복사 — 한쪽을 바꾼 뒤 원본이 어떻게 되는지 예측',
    problems: [
      { label: 'y 바꾸면 x는?', ask: 'y=x 로 복사한 뒤 y=99 하면 x는?', code: 'let x = 10\nlet y = x\ny = 99\nprint(x === ____)', expect: 'true', answer: '10', hint: '복사라 x는 그대로' },
      { label: 'a 바꾸면 b는?', ask: 'b=a 로 복사한 뒤 a=100 하면 b는?', code: 'let a = 5\nlet b = a\na = 100\nprint(b === ____)', expect: 'true', answer: '5', hint: 'b는 자기 값 그대로' },
      { label: '돈 바꾸면?', ask: 'money2=money1 뒤 money2=0 하면 money1은?', code: 'let money1 = 200\nlet money2 = money1\nmoney2 = 0\nprint(money1 === ____)', expect: 'true', answer: '200', hint: '복사 → money1 그대로' },
      { label: '글자 바꾸면?', ask: 's2=s1 뒤 s2="어피치" 하면 s1은?', code: 'let s1 = "무지"\nlet s2 = s1\ns2 = "어피치"\nprint(s1 === "____")', expect: 'true', answer: '무지', hint: '문자열도 복사' },
      { label: '꺼낸 값 바꾸면?', ask: 'a.num을 꺼낸 b를 20으로 바꾸면 a.num은?', code: 'let a = { num: 10 }\nlet b = a.num\nb = 20\nprint(a.num === ____)', expect: 'true', answer: '10', hint: '꺼낼 때 복사' },
    ],
  }

  // ── 🧠 M4-2 참조=공유(ref2) : 별칭으로 바꾼 뒤 원본을 예측 → 메모리로 증명 ──
  E['ref2'] = {
    pattern: '🟢 쉬움 · 별칭(같은 객체)으로 바꾼 뒤, 원본이 어떻게 되는지 예측 (맞히면 메모리로 왜 그런지 확인)',
    problems: [
      { label: '별칭 변경', ask: 'b는 a와 같은 객체다. b.n을 9로 바꾸면 a.n은?', code: 'let a = { n: 1 }\nlet b = a\nb.n = 9\nprint(a.n === ____)', expect: 'true', answer: '9', hint: '같은 객체라 a.n도 바뀐다',
        mem: { title: '왜 a.n도 9인가 — b는 a의 별칭(같은 힙 객체)', stackLabel: '📇 이름표 장부', code: ['let a = { n: 1 }', 'let b = a', 'b.n = 9'], steps: [
          { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'n', value: '1' }] } }, note: 'a는 힙 객체 h1을 가리킨다.' },
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'n', value: '1' }] } }, note: '<code>let b = a</code> → 주소만 복사 → b도 <b>같은 h1</b>(별칭).' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'n', value: '9', bad: true }] } }, note: '<code>b.n = 9</code>는 h1을 고친다. a도 같은 h1이라 <b>a.n도 9</b>.' },
        ] } },
      { label: 'hp 깎기', ask: 'p2는 p1과 같은 객체. p2.hp를 50으로 깎으면 p1.hp는?', code: 'let p1 = { hp: 100 }\nlet p2 = p1\np2.hp = 50\nprint(p1.hp === ____)', expect: 'true', answer: '50', hint: '같은 객체',
        mem: { title: '왜 p1.hp도 50인가 — p2는 p1의 별칭', stackLabel: '📇 이름표 장부', code: ['let p1 = { hp: 100 }', 'let p2 = p1', 'p2.hp = 50'], steps: [
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'p1', ref: 'h1' }, { name: 'p2', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }] } }, note: 'p1·p2가 <b>같은 h1</b>을 가리킨다(별칭).' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'p1', ref: 'h1' }, { name: 'p2', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '50', bad: true }] } }, note: '<code>p2.hp = 50</code> → h1을 고침 → <b>p1.hp도 50</b>.' },
        ] } },
      { label: '배열 별칭', ask: 'c는 arr과 같은 배열. c에 하나 push하면 원본 arr 개수는?', code: 'let arr = [1, 2]\nlet c = arr\nc.push(9)\nprint(arr.length === ____)', expect: 'true', answer: '3', hint: '같은 배열 → 함께 늘어남' },
      { label: '이름 변경', ask: 'r은 u와 같은 객체. r.name을 "지훈"으로 바꾸면 u.name은?', code: 'let u = { name: "민지" }\nlet r = u\nr.name = "지훈"\nprint(u.name === "____")', expect: 'true', answer: '지훈', hint: '같은 객체',
        mem: { title: '왜 u.name도 "지훈"인가 — r은 u의 별칭', stackLabel: '📇 이름표 장부', code: ['let u = { name: "민지" }', 'let r = u', 'r.name = "지훈"'], steps: [
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'u', ref: 'h1' }, { name: 'r', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"민지"' }] } }, note: 'u·r이 <b>같은 h1</b>(별칭).' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'u', ref: 'h1' }, { name: 'r', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"지훈"', bad: true }] } }, note: '<code>r.name = "지훈"</code> → h1을 고침 → <b>u.name도 "지훈"</b>.' },
        ] } },
      { label: 'v 변경', ask: 'y는 x와 같은 객체. y.v를 5로 바꾸면 x.v는?', code: 'let x = { v: 1 }\nlet y = x\ny.v = 5\nprint(x.v === ____)', expect: 'true', answer: '5', hint: '같은 객체',
        mem: { title: '왜 x.v도 5인가 — y는 x의 별칭', stackLabel: '📇 이름표 장부', code: ['let x = { v: 1 }', 'let y = x', 'y.v = 5'], steps: [
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'x', ref: 'h1' }, { name: 'y', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'v', value: '1' }] } }, note: 'x·y가 <b>같은 h1</b>(별칭).' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'x', ref: 'h1' }, { name: 'y', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'v', value: '5', bad: true }] } }, note: '<code>y.v = 5</code> → h1을 고침 → <b>x.v도 5</b>.' },
        ] } },
    ],
  }

  // ── 🧠 M2 스택(stack) : 함수의 반환값을 예측 ──
  E['stack'] = {
    pattern: '🟢 쉬움 · 함수를 부르면 무엇이 돌아오는지 예측',
    problems: [
      { label: '합 반환', ask: 'add(3, 4)는?', code: 'function add(a, b) { return a + b }\nprint(add(3, 4) === ____)', expect: 'true', answer: '7', hint: '3 + 4' },
      { label: '지역변수 반환', ask: 'f는 지역변수 n을 돌려준다. f()는?', code: 'function f() { let n = 10; return n }\nprint(f() === ____)', expect: 'true', answer: '10', hint: '안의 n' },
      { label: '세금', ask: 'tax는 10%를 더한다. tax(100)은?', code: 'function tax(p) { return p + p * 0.1 }\nprint(tax(100) === ____)', expect: 'true', answer: '110', hint: '100 + 10' },
      { label: '배수', ask: 'twice(6)은?', code: 'function twice(n) { return n * 2 }\nprint(twice(6) === ____)', expect: 'true', answer: '12', hint: '6 × 2' },
      { label: '문자 반환', ask: 'name()은?', code: 'function name() { return "토끼" }\nprint(name() === "____")', expect: 'true', answer: '토끼', hint: '돌려주는 글자' },
    ],
  }

  // ── 🧠 M3 힙(heap) : 속성·인덱스·별칭 결과를 예측 ──
  E['heap'] = {
    pattern: '🟢 쉬움 · 힙 객체의 속성·인덱스·별칭 결과를 예측',
    problems: [
      { label: '계산 속성', ask: 'obj.x 는? (x: 3 * 2)', code: 'let obj = { x: 3 * 2 }\nprint(obj.x === ____)', expect: 'true', answer: '6', hint: '3 × 2' },
      { label: '마지막 인덱스', ask: 'arr[2] 는?', code: 'let arr = [10, 20, 30]\nprint(arr[2] === ____)', expect: 'true', answer: '30', hint: '0,1,2번' },
      { label: '별칭', ask: 'b는 a와 같은 힙 객체. b.v=9 후 a.v 는?', code: 'let a = { v: 1 }\nlet b = a\nb.v = 9\nprint(a.v === ____)', expect: 'true', answer: '9', hint: '같은 객체라 a.v도 9',
        explain: '객체는 <b>힙에 하나</b> 있고 a·b는 <b>같은 주소</b>를 가리킨다(별칭). b로 고쳐도 a로 봐도 <b>같은 셀</b>이라 함께 바뀐다. (원시값이었다면 각자 복사돼 독립 — M4-1.)', see: 'ref', wiki: { label: '객체 (컴퓨터 과학)', url: 'https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)' },
        mem: { title: '왜 a.v도 9인가 — a·b가 같은 힙 객체', stackLabel: '📇 이름표 장부', code: ['let a = { v: 1 }', 'let b = a', 'b.v = 9'], steps: [
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'v', value: '1' }] } }, note: '<code>let b = a</code> → 주소 복사 → a·b가 <b>같은 h1</b>.' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'v', value: '9', bad: true }] } }, note: '<code>b.v = 9</code> → h1을 고침 → <b>a.v도 9</b>.' },
        ] } },
      { label: '이름 속성', ask: 'card.name 는?', code: 'let card = { name: "민지" }\nprint(card.name === "____")', expect: 'true', answer: '민지', hint: 'name 값' },
      { label: '중첩 속성', ask: 'data.inner.n 는?', code: 'let data = { inner: { n: 7 } }\nprint(data.inner.n === ____)', expect: 'true', answer: '7', hint: '안쪽 n' },
    ],
  }

  // ── 🧠 M5 값 전달(passval) : 함수에 넘겨 바꿔도 원본을 예측 ──
  E['passval'] = {
    pattern: '🟢 쉬움 · 원시값을 함수에 넘겨 바꿔도 원본이 어떻게 되는지 예측',
    problems: [
      { label: '돈은 안전?', ask: 'f가 받은 값을 0으로 해도 원본 money는?', code: 'function f(bill) { bill = 0 }\nlet money = 100\nf(money)\nprint(money === ____)', expect: 'true', answer: '100', hint: '복사본이 전달됨 → 원본 안전' },
      { label: '점수는 안전?', ask: 'reset이 999로 해도 score는?', code: 'function reset(n) { n = 999 }\nlet score = 50\nreset(score)\nprint(score === ____)', expect: 'true', answer: '50', hint: '원본 안전' },
      { label: '더해도 안전?', ask: 'add1이 +5 해도 a는?', code: 'function add1(x) { x = x + 5 }\nlet a = 10\nadd1(a)\nprint(a === ____)', expect: 'true', answer: '10', hint: '복사본만 바뀜' },
      { label: '반으로 해도?', ask: 'half가 0으로 해도 price는?', code: 'function half(v) { v = 0 }\nlet price = 200\nhalf(price)\nprint(price === ____)', expect: 'true', answer: '200', hint: '원본 안전' },
      { label: '지워도 안전?', ask: 'clear가 빈 글자로 해도 name은?', code: 'function clear(s) { s = "" }\nlet name = "민지"\nclear(name)\nprint(name === "____")', expect: 'true', answer: '민지', hint: '원본 안전' },
    ],
  }

  // ── 🧠 M6 참조 전달(passobj) : 객체를 넘겨 바꾸면 원본을 예측 ──
  E['passobj'] = {
    pattern: '🟢 쉬움 · 객체를 함수에 넘겨 속성을 바꾸면 원본이 어떻게 되는지 예측',
    problems: [
      { label: '지갑', ask: 'pay가 wallet.money를 0으로. wallet.money는?', code: 'function pay(acc) { acc.money = 0 }\nlet wallet = { money: 100 }\npay(wallet)\nprint(wallet.money === ____)', expect: 'true', answer: '0', hint: '같은 객체를 공유 → 원본도 0',
        explain: '객체를 넘기면 <b>주소(참조)를 복사</b>해 전달한다. 그래서 함수 안 <code>acc</code>와 밖 <code>wallet</code>은 <b>같은 힙 객체</b> — <code>acc.money=0</code>이 <code>wallet.money</code>도 0으로. (원시값이었다면 복사라 원본이 안전 — M5.)', see: 'passval', wiki: { label: '참조에 의한 호출', url: 'https://ko.wikipedia.org/wiki/값에_의한_호출' },
        mem: { title: '왜 wallet.money도 0인가 — acc와 wallet은 같은 힙 객체', stackLabel: '📇 이름표 장부', code: ['let wallet = { money: 100 }', 'pay(wallet)   // acc = wallet', 'acc.money = 0'], steps: [
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'wallet', ref: 'h1' }] }, { name: 'pay', slots: [{ name: 'acc', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] } }, note: 'pay 호출 → 주소를 복사 → <code>acc</code>도 <b>같은 h1</b>을 가리킨다.' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'wallet', ref: 'h1' }] }, { name: 'pay', slots: [{ name: 'acc', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'money', value: '0', bad: true }] } }, note: '<code>acc.money = 0</code> → h1을 고침 → <b>wallet.money도 0</b>.' },
        ] } },
      { label: '이름 변경', ask: 'rename 후 user.name은?', code: 'function rename(u) { u.name = "지훈" }\nlet user = { name: "민지" }\nrename(user)\nprint(user.name === "____")', expect: 'true', answer: '지훈', hint: '같은 객체' },
      { label: 'hp', ask: 'grow 후 hero.hp는?', code: 'function grow(p) { p.hp = 999 }\nlet hero = { hp: 100 }\ngrow(hero)\nprint(hero.hp === ____)', expect: 'true', answer: '999', hint: '같은 객체' },
      { label: '완료', ask: 'done 후 task.ok는?', code: 'function done(t) { t.ok = true }\nlet task = { ok: false }\ndone(task)\nprint(task.ok === ____)', expect: 'true', answer: 'true', hint: '같은 객체' },
      { label: '0으로', ask: 'zero 후 data.count는?', code: 'function zero(o) { o.count = 0 }\nlet data = { count: 99 }\nzero(data)\nprint(data.count === ____)', expect: 'true', answer: '0', hint: '같은 객체' },
    ],
  }

  // ── 🧠 M7 배열 전달(passarr) : 배열을 넘겨 바꾸면 원본을 예측 ──
  E['passarr'] = {
    pattern: '🟢 쉬움 · 배열을 함수에 넘겨 바꾸면 원본이 어떻게 되는지 예측',
    problems: [
      { label: 'push', ask: 'add가 push하면 원본 arr의 개수는?', code: 'function add(list) { list.push(9) }\nlet arr = [1, 2]\nadd(arr)\nprint(arr.length === ____)', expect: 'true', answer: '3', hint: '같은 배열 → arr도 늘어남' },
      { label: '빈 배열에', ask: 'fill9(nums) 후 nums[0]은?', code: 'function fill9(a) { a.push(9) }\nlet nums = []\nfill9(nums)\nprint(nums[0] === ____)', expect: 'true', answer: '9', hint: '같은 배열' },
      { label: '비우기', ask: 'reset이 비우면 items의 개수는?', code: 'function reset(a) { a.length = 0 }\nlet items = [1, 2, 3]\nreset(items)\nprint(items.length === ____)', expect: 'true', answer: '0', hint: '같은 배열' },
      { label: '항목 추가', ask: 'grow가 push하면 cart의 개수는?', code: 'function grow(list) { list.push("새") }\nlet cart = ["빵"]\ngrow(cart)\nprint(cart.length === ____)', expect: 'true', answer: '2', hint: '같은 배열' },
      { label: '0번 수정', ask: 'double0 후 arr[0]은?', code: 'function double0(a) { a[0] = a[0] * 2 }\nlet arr = [5, 6]\ndouble0(arr)\nprint(arr[0] === ____)', expect: 'true', answer: '10', hint: '같은 배열' },
    ],
  }

  // ── 🕸️ G1 그래프(graph) : 화살표 경로를 따라간 값·공유 효과를 예측 ──
  E['graph'] = {
    pattern: '🟢 쉬움 · 화살표(참조)를 따라간 값·공유 노드의 변경 효과를 예측',
    problems: [
      { label: '효니를 바꾸면?', ask: 'me.friend는 효니를 가리킨다. me.friend.hair를 바꾸면 효니 본인은?', code: 'let hyoni = { hair: "긴머리" }\nlet me = { friend: hyoni }\nme.friend.hair = "숏컷"\nprint(hyoni.hair === "____")', expect: 'true', answer: '숏컷', hint: 'me.friend = 효니(같은 사람)',
        explain: '<code>me.friend</code>는 <b>효니와 같은 힙 객체</b>를 가리킨다(참조). 그래서 <code>me.friend.hair</code>를 고치면 <b>효니.hair도 함께</b> 바뀐다 — 이름이 둘이어도 같은 사람.', see: 'ref2', wiki: { label: '객체 그래프', url: 'https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)' },
        mem: { title: 'me.friend와 효니는 같은 객체 — 한쪽을 고치면 함께 바뀐다', stackLabel: '📇 이름표 장부', code: ['let hyoni = { hair: "긴머리" }', 'let me = { friend: hyoni }', 'me.friend.hair = "숏컷"'], steps: [
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'me', ref: 'h2' }] }], heap: { h1: { label: '효니', fields: [{ key: 'hair', value: '"긴머리"' }] }, h2: { fields: [{ key: 'friend', ref: 'h1' }] } }, note: 'me.friend가 <b>효니(h1)를 가리킨다</b>. hyoni·me.friend 둘 다 h1.' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'me', ref: 'h2' }] }], heap: { h1: { label: '효니', fields: [{ key: 'hair', value: '"숏컷"', bad: true }] }, h2: { fields: [{ key: 'friend', ref: 'h1' }] } }, note: '<code>me.friend.hair="숏컷"</code> → h1을 고침 → <b>hyoni.hair도 "숏컷"</b>.' },
        ] } },
      { label: '화살표 따라', ask: 'a.next.val 은?', code: 'let a = { next: { val: 7 } }\nprint(a.next.val === ____)', expect: 'true', answer: '7', hint: 'a.next.val' },
      { label: 'y.ref로 바꾸면?', ask: 'y.ref는 x를 가리킨다. y.ref.n=9 후 x.n은?', code: 'let x = { n: 1 }\nlet y = { ref: x }\ny.ref.n = 9\nprint(x.n === ____)', expect: 'true', answer: '9', hint: 'y.ref = x(같은 객체)' },
      { label: '리더 이름', ask: 'team.leader.name 은?', code: 'let p = { name: "김" }\nlet team = { leader: p }\nprint(team.leader.name === "____")', expect: 'true', answer: '김', hint: 'leader가 p' },
      { label: '2중 중첩', ask: 'root.child.child.v 은?', code: 'let root = { child: { child: { v: 3 } } }\nprint(root.child.child.v === ____)', expect: 'true', answer: '3', hint: '끝까지 따라감' },
    ],
  }

  // ── 🕸️ G2 친구 목록(friends) : 배열 안 사람 객체의 값·공유 효과 예측 ──
  E['friends'] = {
    pattern: '🟢 쉬움 · 배열 안 사람 객체의 값·공유 변경 효과를 예측',
    problems: [
      { label: 'list[0]으로 바꾸면?', ask: 'list[0]은 minji와 같은 객체다. list[0].name을 바꾸면 minji.name은?', code: 'let minji = { name: "민지" }\nlet list = [minji]\nlist[0].name = "X"\nprint(minji.name === "____")', expect: 'true', answer: 'X', hint: 'list[0] = minji(같은 객체)' },
      { label: '두 번째 나이', ask: 'people[1].age 는?', code: 'let people = [{ age: 20 }, { age: 30 }]\nprint(people[1].age === ____)', expect: 'true', answer: '30', hint: '두 번째 사람' },
      { label: 'arr[0]으로 바꾸면?', ask: 'arr[0]은 a와 같은 객체. arr[0].hp=50 후 a.hp는?', code: 'let a = { hp: 100 }\nlet arr = [a]\narr[0].hp = 50\nprint(a.hp === ____)', expect: 'true', answer: '50', hint: 'arr[0] = a(같은 객체)' },
      { label: '두 번째 id', ask: 'users[1].id 는?', code: 'let users = [{ id: 1 }, { id: 2 }]\nprint(users[1].id === ____)', expect: 'true', answer: '2', hint: '두 번째' },
      { label: '항목', ask: 'cart[0].item 은?', code: 'let cart = [{ item: "빵" }]\nprint(cart[0].item === "____")', expect: 'true', answer: '빵', hint: '.item' },
    ],
  }

  // ── 🕸️ G3 계통도(family) : 트리 경로 끝의 값을 예측 ──
  E['family'] = {
    pattern: '🟢 쉬움 · 트리 경로를 따라간 끝의 값을 예측',
    problems: [
      { label: '2대 위', ask: 'me.parent.parent.name 은? (2대 위)', code: 'let grandma = { name: "할머니" }\nlet mom = { parent: grandma }\nlet me = { parent: mom }\nprint(me.parent.parent.name === "____")', expect: 'true', answer: '할머니', hint: '엄마의 parent' },
      { label: '2대 아래', ask: 'a.child.child.name 은?', code: 'let a = { child: { child: { name: "손자" } } }\nprint(a.child.child.name === "____")', expect: 'true', answer: '손자', hint: '자식의 자식' },
      { label: '왼쪽', ask: 'root.left.val 은?', code: 'let root = { left: { val: 5 } }\nprint(root.left.val === ____)', expect: 'true', answer: '5', hint: 'root.left.val' },
      { label: '엄마 이름', ask: 'me.mom.name 은?', code: 'let me = { mom: { name: "엄마" } }\nprint(me.mom.name === "____")', expect: 'true', answer: '엄마', hint: 'me.mom.name' },
      { label: '깊은 데이터', ask: 'tree.node.node.data 은?', code: 'let tree = { node: { node: { data: 7 } } }\nprint(tree.node.node.data === ____)', expect: 'true', answer: '7', hint: 'node를 두 번' },
    ],
  }

  // ── 🕸️ G4 순환(cycle) : 순환 경로를 따라간 값을 예측 ──
  E['cycle'] = {
    pattern: '🟢 쉬움 · 순환(서로 가리킴)에서도 경로를 따라간 값을 예측',
    problems: [
      { label: '왕복', ask: 'a.to=b, b.to=a, b.val=9. a.to.val 은?', code: 'let a = {}\nlet b = {}\na.to = b\nb.to = a\nb.val = 9\nprint(a.to.val === ____)', expect: 'true', answer: '9', hint: 'a.to = b' },
      { label: '서로 가리킴', ask: 'x.peer=y, y.peer=x. x.peer.id 는? (y.id=2)', code: 'let x = { id: 1 }\nlet y = { id: 2 }\nx.peer = y\ny.peer = x\nprint(x.peer.id === ____)', expect: 'true', answer: '2', hint: 'x.peer = y' },
      { label: '자기 순환', ask: 'node.self=node, node.v=7. node.self.v 는?', code: 'let node = {}\nnode.self = node\nnode.v = 7\nprint(node.self.v === ____)', expect: 'true', answer: '7', hint: 'self = node' },
      { label: '앞뒤 연결', ask: 'b.back=a, a.n=3. b.back.n 은?', code: 'let a = { n: 3 }\nlet b = { back: a }\nprint(b.back.n === ____)', expect: 'true', answer: '3', hint: 'b.back = a' },
      { label: '큐 이름', ask: 'p.q=q, q.name="큐". p.q.name 은?', code: 'let p = {}\nlet q = { name: "큐" }\np.q = q\nprint(p.q.name === "____")', expect: 'true', answer: '큐', hint: 'p.q = q' },
    ],
  }

  // ── 🧠 콜 스택(callstack) : 함수가 함수를 부르는 사슬 ──
  E['callstack'] = {
    pattern: '🟢 쉬움 · 함수가 함수를 부를 때 안쪽 반환을 도출',
    problems: [
      { label: '2배 사슬', ask: 'a는 b()의 2배를 돌려준다. a()가 10이 되려면 b는 얼마를 돌려줘야?', code: 'function a() { return b() * 2 }\nfunction b() { return ____ }\nprint(a())', expect: '10', answer: '5', hint: '10의 절반' },
      { label: '+1 사슬', ask: 'outer는 inner()+1을 돌려준다. outer()가 10이 되려면 inner는?', code: 'function outer() { return inner() + 1 }\nfunction inner() { return ____ }\nprint(outer())', expect: '10', answer: '9', hint: '10 - 1' },
      { label: '세금', ask: 'tax(100)이 110이 되게 — 세율은?', code: 'function tax(p) { return p + p * ____ }\nprint(tax(100))', expect: '110', answer: '0.1', hint: '세금 10 = 100 * ?' },
      { label: '그대로 전달', ask: 'a는 b()를 그대로 돌려준다. a()가 7이 되려면 b는?', code: 'function a() { return b() }\nfunction b() { return ____ }\nprint(a())', expect: '7', answer: '7', hint: 'b가 7' },
      { label: '더하는 사슬', ask: 'f는 g()에 얼마를 더해 5가 되게? (g는 4)', code: 'function f() { return g() + ____ }\nfunction g() { return 4 }\nprint(f())', expect: '5', answer: '1', hint: '4 + 1' },
    ],
  }

  // ── 🧠 클로저(closure) : 안쪽 함수가 붙잡은 값 ──
  E['closure'] = {
    pattern: '🟢 쉬움 · 안쪽 함수가 바깥 값을 붙잡아 쓴다',
    problems: [
      { label: '붙잡은 값', ask: 'make 안 c(100)를 안쪽 함수가 붙잡는다. get()이 70이 되려면 얼마를 빼야?', code: 'function make() { let c = 100; return function () { return c - ____ } }\nlet get = make()\nprint(get())', expect: '70', answer: '30', hint: '100 - 70' },
      { label: '카운터', ask: 'n은 호출 사이 기억된다. next()를 세 번 불러 3이 나오려면 매번 얼마씩?', code: 'function counter() { let n = 0; return function () { n = n + ____; return n } }\nlet next = counter()\nnext()\nnext()\nprint(next())', expect: '3', answer: '1', hint: '1씩 → 1,2,3' },
      { label: '숨은 잔액', ask: 'bank의 money(100)를 그대로 돌려주게 하려면 뭘 더할까? (그대로)', code: 'function bank() { let money = 100; return function () { return money + ____ } }\nlet balance = bank()\nprint(balance())', expect: '100', answer: '0', hint: '더 안 더함 = 0' },
      { label: '붙잡아 더하기', ask: 'x(5)를 붙잡아 그대로 돌려주게 하려면 뭘 더할까?', code: 'function make() { let x = 5; return function () { return x + ____ } }\nprint(make()())', expect: '5', answer: '0', hint: '5 + 0' },
      { label: '붙잡아 곱하기', ask: 'n(10)을 붙잡아 20을 돌려주게 하려면 몇을 곱할까?', code: 'function make() { let n = 10; return function () { return n * ____ } }\nprint(make()())', expect: '20', answer: '2', hint: '10 * 2' },
    ],
  }

  // ── 🧠 가비지 컬렉션(gc) : 참조를 끊으면 치워진다 ──
  E['gc'] = {
    pattern: '🟢 쉬움 · 참조를 끊거나(=null) 남은 참조로 접근하기',
    problems: [
      { label: 'null로 끊기', ask: '큰 객체 a를 더 안 써서 GC가 치우게 — 참조를 끊으려면 뭘 담을까?', code: 'let a = { big: "data" }\na = ____\nprint(a)', expect: 'null', answer: 'null', hint: '의도적 빈 값' },
      { label: '다른 참조', ask: 'data=null이어도 ref가 아직 가리켜 객체는 산다. ref로 v를 꺼내려면?', code: 'let data = { v: 1 }\nlet ref = data\ndata = null\nprint(ref.____)', expect: '1', answer: 'v', hint: 'ref.v' },
      { label: '고아 만들기', ask: 'x가 가리키던 객체를 고아로 만들려면(참조 끊기) x에 뭘 담을까?', code: 'let x = { n: 5 }\nx = ____\nprint(x)', expect: 'null', answer: 'null', hint: 'null' },
      { label: '원본 끊어도', ask: 'o=null이어도 r이 가리켜 산다. r로 v(9)를 꺼내려면?', code: 'let o = { v: 9 }\nlet r = o\no = null\nprint(r.____)', expect: '9', answer: 'v', hint: 'r.v' },
      { label: '큰 데이터 비우기', ask: 'big을 GC 대상으로 만들려면 뭘 담을까?', code: 'let big = { data: 1 }\nbig = ____\nprint(big)', expect: 'null', answer: 'null', hint: 'null' },
    ],
  }

  // ── 🧬 클래스(class) : new 로 만든 인스턴스의 속성/메서드 결과를 예측 ──
  E['class'] = {
    pattern: '🟢 쉬움 · new 로 만든 인스턴스의 속성·메서드 결과를 예측',
    problems: [
      { label: '인스턴스 속성', ask: 'new C().n 은?', code: 'class C { constructor() { this.n = 5 } }\nprint(new C().n === ____)', expect: 'true', answer: '5', hint: 'constructor의 this.n' },
      { label: '생성자 인수', ask: '만든 인스턴스의 name 은?', code: 'class Dog { constructor(name) { this.name = name } }\nlet d = new Dog("콩이")\nprint(d.name === "____")', expect: 'true', answer: '콩이', hint: '넘긴 인수' },
      { label: 'age 속성', ask: '만든 인스턴스의 age 는?', code: 'class P { constructor(a) { this.age = a } }\nlet p = new P(24)\nprint(p.age === ____)', expect: 'true', answer: '24', hint: '넘긴 인수' },
      { label: '기본값', ask: 'new C().hp 은?', code: 'class C { constructor() { this.hp = 100 } }\nprint(new C().hp === ____)', expect: 'true', answer: '100', hint: 'constructor의 this.hp' },
      { label: '메서드', ask: 'new Dog().bark() 은?', code: 'class Dog { bark() { return "멍" } }\nprint(new Dog().bark() === "____")', expect: 'true', answer: '멍', hint: 'bark의 반환' },
    ],
  }
})()
