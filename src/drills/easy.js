// 🟢 쉬움 드릴 — 동일 유형 반복(automaticity). 값만 바꿔 손에 붙인다. (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것(목표 결과만). 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const E = window.Drills.easy

  // ── 1강 · 값과 타입, 변수 : 이름표에 값 담기(리터럴) ──
  E['1'] = {
    pattern: '🟢 쉬움 · let 이름 = 값 으로 담고 print(이름) — 리터럴 담기 반복',
    problems: [
      { label: 'age 에 24', ask: 'age가 24가 나오게 담으세요.', code: 'let age = ____\nprint(age)', expect: '24', answer: '24', hint: '숫자는 따옴표 없이' },
      { label: 'name 에 이름', ask: 'name이 "민지"가 나오게 담으세요.', code: 'let name = ____\nprint(name)', expect: '"민지"', answer: '"민지"', hint: '글자는 따옴표로 감싼다' },
      { label: 'price 에 12000', ask: 'price가 12000이 나오게 담으세요.', code: 'let price = ____\nprint(price)', expect: '12000', answer: '12000', hint: '숫자' },
      { label: 'isOpen 에 참', ask: 'isOpen이 true가 나오게 담으세요.', code: 'let isOpen = ____\nprint(isOpen)', expect: 'true', answer: 'true', hint: '참은 true (따옴표 없음)' },
      { label: 'grade 에 A', ask: 'grade가 "A"가 나오게 담으세요.', code: 'let grade = ____\nprint(grade)', expect: '"A"', answer: '"A"', hint: '한 글자도 글자 → 따옴표' },
    ],
  }

  // ── 2강 · 계산과 문자열 : 템플릿 리터럴 ${변수} ──
  E['2'] = {
    pattern: '🟢 쉬움 · 템플릿 `...${____}...` 자리에 ${변수} 넣기 반복',
    problems: [
      { label: '안녕 ${name}', ask: 'name(="민지")을 넣어 "안녕, 민지님"이 나오게.', code: 'let name = "민지"\nprint(`안녕, ____님`)', expect: '"안녕, 민지님"', answer: '${name}', hint: '자리에 넣을 땐 ${이름}' },
      { label: '여기는 ${city}', ask: 'city(="서울")를 넣어 "여기는 서울 입니다"가 나오게.', code: 'let city = "서울"\nprint(`여기는 ____ 입니다`)', expect: '"여기는 서울 입니다"', answer: '${city}', hint: '${city}' },
      { label: '장바구니 ${count}', ask: 'count(=3)를 넣어 "장바구니에 3개"가 나오게.', code: 'let count = 3\nprint(`장바구니에 ____개`)', expect: '"장바구니에 3개"', answer: '${count}', hint: '숫자도 ${ } 안에 그대로' },
      { label: '가격 ${price}', ask: 'price(=5000)를 넣어 "가격: 5000원"이 나오게.', code: 'let price = 5000\nprint(`가격: ____원`)', expect: '"가격: 5000원"', answer: '${price}', hint: '${price}' },
      { label: '${user}님 환영', ask: 'user(="지훈")를 넣어 "지훈님 환영해요"가 나오게.', code: 'let user = "지훈"\nprint(`____님 환영해요`)', expect: '"지훈님 환영해요"', answer: '${user}', hint: '문장 맨 앞에도 ${ }' },
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

  // ── 4강 · 조건 : 비교 연산자 ──
  E['4'] = {
    pattern: '🟢 쉬움 · 비교 연산자를 채워 true/false 맞히기 반복',
    problems: [
      { label: '10 __ 5 → true', ask: '10이 5보다 크면 true. 빈칸을 채우세요.', code: 'print(10 ____ 5)', expect: 'true', answer: '>', hint: '크다: >' },
      { label: '3 __ 3 → true(엄격)', ask: '3과 3이 같으면 true. 엄격한 같음을 쓰세요.', code: 'print(3 ____ 3)', expect: 'true', answer: '===', hint: '값+타입 같음: ===' },
      { label: '"5" __ 5 → false', ask: '글자 "5"와 숫자 5는 타입이 달라 false가 되게(엄격 비교).', code: 'print("5" ____ 5)', expect: 'false', answer: '===', hint: '===면 타입까지 봐서 false' },
      { label: '7 __ 10 → true', ask: '7이 10보다 작거나 같으면 true.', code: 'print(7 ____ 10)', expect: 'true', answer: '<=', hint: '작거나 같다: <=' },
      { label: '9 __ 4 → true(다름)', ask: '9와 4가 다르면 true. 다름을 쓰세요.', code: 'print(9 ____ 4)', expect: 'true', answer: '!==', hint: '다르다: !==' },
    ],
  }

  // ── 5강 · 함수 : 정의·호출·인수·return 기본 ──
  E['5'] = {
    pattern: '🟢 쉬움 · 함수 정의·호출·인수·return 기본 반복',
    problems: [
      { label: '정의 키워드', ask: '함수를 만드는 키워드는? 빈칸을 채우세요.', code: '____ hi() { return 7 }\nprint(hi())', expect: '7', answer: 'function', hint: '함수 정의 = function' },
      { label: '호출의 ( )', ask: '함수를 실행(호출)하려면 이름 뒤에 뭘 붙이나?', code: 'function hi() { return "야" }\nprint(hi____)', expect: '"야"', answer: '()', hint: '이름() 로 부른다' },
      { label: '인수 넣기', ask: 'dbl에 값을 넣어 10이 나오게. 무슨 값?', code: 'function dbl(n) { return n * 2 }\nprint(dbl(____))', expect: '10', answer: '5', hint: 'n*2=10이면 n은?' },
      { label: 'return', ask: '결과를 돌려주는 키워드는? (없으면 undefined)', code: 'function add(a, b) { ____ a + b }\nprint(add(2, 3))', expect: '5', answer: 'return', hint: '값을 돌려줌 = return' },
      { label: '매개변수 쓰기', ask: '받은 name을 인사말에 넣으세요.', code: 'function g(name) { return "hi " + ____ }\nprint(g("z"))', expect: '"hi z"', answer: 'name', hint: '매개변수 이름 그대로' },
    ],
  }

  // ── 6강 · 배열 : 인덱스·length 기본 ──
  E['6'] = {
    pattern: '🟢 쉬움 · 인덱스로 꺼내기·length 개수 (번호는 0부터!) 반복',
    problems: [
      { label: '첫째 = a[0]', ask: '[10,20,30]의 첫 번째(10)를 꺼내세요. 번호는?', code: 'let a = [10, 20, 30]\nprint(a[____])', expect: '10', answer: '0', hint: '첫째는 0번' },
      { label: '둘째 = a[1]', ask: '[10,20,30]의 두 번째(20)를 꺼내세요.', code: 'let a = [10, 20, 30]\nprint(a[____])', expect: '20', answer: '1', hint: '둘째는 1번' },
      { label: '문자 배열', ask: '["사과","배","귤"]의 마지막(귤)을 번호로 꺼내세요.', code: 'let f = ["사과", "배", "귤"]\nprint(f[____])', expect: '"귤"', answer: '2', hint: '셋 중 마지막 = 2번' },
      { label: 'length=개수', ask: '[1,2,3,4]의 개수를 구하세요.', code: 'let a = [1, 2, 3, 4]\nprint(a.____)', expect: '4', answer: 'length', hint: '개수: .length' },
      { label: '빈 배열 length', ask: '빈 배열의 개수는 0. 무엇으로 구하나?', code: 'let a = []\nprint(a.____)', expect: '0', answer: 'length', hint: '.length' },
    ],
  }

  // ── 7강 · 반복과 map : for·map·filter·reduce 기본 ──
  E['7'] = {
    pattern: '🟢 쉬움 · for·map·filter·reduce 기본형 반복',
    problems: [
      { label: 'for 조건', ask: '배열을 끝까지 훑으려면 i는 무엇보다 작아야 할까? (개수)', code: 'let a = [1, 2, 3]\nfor (let i = 0; i < a.____; i++) { print(a[i]) }', expect: '1\n2\n3', answer: 'length', hint: '개수 = .length' },
      { label: 'map ×2', ask: '각 요소를 2배로 만들어 [2,4,6]이 되게.', code: 'let n = [1, 2, 3]\nlet d = n.map(function (x) { return x * ____ })\nprint(d)', expect: '[2,4,6]', answer: '2', hint: 'x * 2' },
      { label: 'map +1', ask: '각 요소에 1을 더해 [2,3,4]가 되게 — return에 무엇을?', code: 'let n = [1, 2, 3]\nlet d = n.map(function (x) { return ____ })\nprint(d)', expect: '[2,3,4]', answer: 'x + 1', hint: 'x + 1' },
      { label: 'filter >2', ask: '2보다 큰 것만 남겨 [3,4]가 되게.', code: 'let n = [1, 2, 3, 4]\nlet r = n.filter(function (x) { return x > ____ })\nprint(r)', expect: '[3,4]', answer: '2', hint: 'x > 2' },
      { label: 'reduce 합', ask: '누적값 a에 b를 더해 합계 60이 되게 — 무슨 연산?', code: 'let n = [10, 20, 30]\nlet s = n.reduce(function (a, b) { return a ____ b }, 0)\nprint(s)', expect: '60', answer: '+', hint: '더하기' },
    ],
  }

  // ── 8강 · 객체 : 만들고 · 점으로 꺼내고 · 바꾸고 · 추가하기 ──
  E['8'] = {
    pattern: '🟢 쉬움 · 객체를 만들고 점(.)으로 꺼내기 — 값만 바꿔 반복',
    problems: [
      { label: '만들기', ask: 'p.name이 "민지"가 되게 값을 채워라.', code: 'let p = { name: "____" }\nprint(p.name)', expect: '"민지"', answer: '민지', hint: '따옴표 안에 민지' },
      { label: '점으로 꺼내기', ask: 'u의 나이(24)를 꺼내려면 어떤 이름?', code: 'let u = { age: 24 }\nprint(u.____)', expect: '24', answer: 'age', hint: 'u.age' },
      { label: '다른 속성 꺼내기', ask: 'car의 브랜드("기아")를 꺼내려면 어떤 이름?', code: 'let car = { brand: "기아", year: 2020 }\nprint(car.____)', expect: '"기아"', answer: 'brand', hint: 'car.brand' },
      { label: '값 바꾸기', ask: 'u.hp를 50으로 바꿔 출력되게.', code: 'let u = { hp: 100 }\nu.hp = ____\nprint(u.hp)', expect: '50', answer: '50', hint: 'u.hp = 50' },
      { label: '속성 추가', ask: 'o에 color를 "빨강"으로 추가해 출력되게.', code: 'let o = {}\no.color = "____"\nprint(o.color)', expect: '"빨강"', answer: '빨강', hint: '따옴표 안에 빨강' },
    ],
  }

  // ── 9강 · DOM : 요소 만들고 글자/스타일 바꾸기 기본 ──
  E['9'] = {
    pattern: '🟢 쉬움 · 요소 만들고 textContent·style·className·id 바꾸기 반복',
    problems: [
      { label: '글자 넣기', ask: 'el의 글자를 "안녕"으로 만들어 출력되게.', code: 'let el = document.createElement("div")\nel.textContent = "____"\nprint(el.textContent)', expect: '"안녕"', answer: '안녕', hint: 'textContent = "안녕"' },
      { label: 'box 글자', ask: 'box(화면 영역)의 글자를 "완료"로 바꿔 출력되게.', code: 'box.textContent = "____"\nprint(box.textContent)', expect: '"완료"', answer: '완료', hint: 'box.textContent = "완료"' },
      { label: '색 바꾸기', ask: 'el의 글자색을 "red"로 정해 출력되게.', code: 'let el = document.createElement("div")\nel.style.color = "____"\nprint(el.style.color)', expect: '"red"', answer: 'red', hint: 'style.color = "red"' },
      { label: '클래스', ask: 'el의 class 이름을 "on"으로 정해 출력되게.', code: 'let el = document.createElement("div")\nel.className = "____"\nprint(el.className)', expect: '"on"', answer: 'on', hint: 'className = "on"' },
      { label: '아이디', ask: 'el의 id를 "title"로 정해 출력되게.', code: 'let el = document.createElement("div")\nel.id = "____"\nprint(el.id)', expect: '"title"', answer: 'title', hint: 'id = "title"' },
    ],
  }

  // ── 10강 · 실전 캡스톤 : 배운 조각 한 문제씩(기본) ──
  E['10'] = {
    pattern: '🟢 쉬움 · 값·문자열·배열·객체·함수·DOM 기본을 한 문제씩',
    problems: [
      { label: '값·문자열', ask: '변수 name을 인사말에 끼워 "안녕, 민지님"이 나오게.', code: 'let name = "민지"\nprint("안녕, " + ____ + "님")', expect: '"안녕, 민지님"', answer: 'name', hint: '변수 name을 이어붙인다' },
      { label: '배열 개수', ask: '사람이 몇 명인지(3) 구하려면 배열의 무엇?', code: 'let users = ["민지", "지훈", "서연"]\nprint(users.____)', expect: '3', answer: 'length', hint: '.length' },
      { label: '객체 속성', ask: '"콩이는 3살"이 나오게 나이 속성을 꺼내라.', code: 'let p = { name: "콩이", age: 3 }\nprint(p.name + "는 " + p.____ + "살")', expect: '"콩이는 3살"', answer: 'age', hint: 'p.age' },
      { label: 'DOM 글자', ask: '요소의 글자를 "명함"으로 만들어 출력되게.', code: 'let el = document.createElement("div")\nel.textContent = "____"\nprint(el.textContent)', expect: '"명함"', answer: '명함', hint: 'textContent = "명함"' },
      { label: '함수 반환', ask: 'greet("지훈")이 "지훈님 환영!"이 되게 인자를 넣어라.', code: 'function greet(n) { return n + "님 환영!" }\nprint(greet("____"))', expect: '"지훈님 환영!"', answer: '지훈', hint: 'greet에 "지훈"' },
    ],
  }
})()
