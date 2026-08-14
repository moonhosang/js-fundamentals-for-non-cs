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

  // ── 🧠 M1 램(ram) : 재할당·null·복사 독립·typeof ──
  E['ram'] = {
    pattern: '🟢 쉬움 · 재할당·null·복사 독립·typeof 기본',
    problems: [
      { label: 'let 재할당', ask: 'x(10)를 15로 만들려면 얼마를 더해야 할까?', code: 'let x = 10\nx = x + ____\nprint(x)', expect: '15', answer: '5', hint: '15 - 10' },
      { label: 'null로 비우기', ask: 'memo를 "값을 일부러 비움" 상태로. (0이나 빈 글자 말고)', code: 'let memo = "메모"\nmemo = ____\nprint(memo)', expect: 'null', answer: 'null', hint: '의도적 빈 값' },
      { label: '복사=독립', ask: 'b를 99로 바꿔 보세요. 그러면 a는? (▶ 확인)', code: 'let a = 10\nlet b = a\nb = ____\nprint(a)', expect: '10', answer: '99', hint: '원시값은 복사라 a는 안 변함' },
      { label: 'typeof', ask: '결과가 "number"가 나오게 — 어떤 값을? (숫자)', code: 'print(typeof ____)', expect: '"number"', answer: '99', hint: '아무 숫자' },
      { label: '문자열', ask: '화면에 토끼가 나오게 — 문자열은 어떻게 쓰지?', code: 'let name = ____\nprint(name)', expect: '"토끼"', answer: '"토끼"', hint: '따옴표로 감싼다' },
    ],
  }

  // ── 🧠 M4-1 값=복사(ref) : 한쪽 바꿔도 원본 그대로 ──
  E['ref'] = {
    pattern: '🟢 쉬움 · 원시값은 복사 — 한쪽을 바꿔도 원본 그대로',
    problems: [
      { label: 'y를 바꾸면 x는?', ask: 'y를 99로 바꿔 보세요. 그러면 x는? (▶ 확인)', code: 'let x = 10\nlet y = x\ny = ____\nprint(x)', expect: '10', answer: '99', hint: '복사라 x는 그대로 10' },
      { label: 'a를 바꾸면 b는?', ask: 'a를 100으로 바꿔 보세요. 그러면 b는? (▶ 확인)', code: 'let a = 5\nlet b = a\na = ____\nprint(b)', expect: '5', answer: '100', hint: 'b는 자기 값 5 그대로' },
      { label: '돈을 바꾸면?', ask: 'money2를 0으로 바꿔 보세요. money1은? (▶ 확인)', code: 'let money1 = 200\nlet money2 = money1\nmoney2 = ____\nprint(money1)', expect: '200', answer: '0', hint: '숫자는 복사 → money1 그대로' },
      { label: '글자를 바꾸면?', ask: 's2를 "어피치"로 바꿔 보세요. s1은? (▶ 확인)', code: 'let s1 = "무지"\nlet s2 = s1\ns2 = ____\nprint(s1)', expect: '"무지"', answer: '"어피치"', hint: '문자열도 복사 → s1 그대로' },
      { label: '꺼낸 값을 바꾸면?', ask: 'a.num을 꺼내 담은 b를 20으로 바꿔 보세요. a.num은? (▶ 확인)', code: 'let a = { num: 10 }\nlet b = a.num\nb = ____\nprint(a.num)', expect: '10', answer: '20', hint: '꺼낼 때 복사 → a.num 그대로' },
    ],
  }

  // ── 🧠 M4-2 참조=공유(ref2) : 별칭으로 바꾸면 원본도 ──
  E['ref2'] = {
    pattern: '🟢 쉬움 · 별칭(같은 객체)으로 바꾸면 원본도 함께',
    problems: [
      { label: '별칭으로 바꾸면?', ask: 'b는 a와 같은 객체다(별칭). b.n을 9로 바꾸면 a.n은? 빈칸에 b를 넣고 ▶확인', code: 'let a = { n: 1 }\nlet b = a\n____.n = 9\nprint(a.n)', expect: '9', answer: 'b', hint: '같은 객체라 a.n도 9' },
      { label: 'p2로 깎으면?', ask: 'p2는 p1과 같은 객체다. p2.hp를 50으로 깎으면 p1.hp는? 빈칸에 p2를 넣고 ▶확인', code: 'let p1 = { hp: 100 }\nlet p2 = p1\n____.hp = 50\nprint(p1.hp)', expect: '50', answer: 'p2', hint: 'p1·p2 같은 객체' },
      { label: 'copy에 push하면?', ask: 'copy는 arr과 같은 배열이다. copy에 9를 push하면 arr 길이는? 빈칸에 copy를 넣고 ▶확인', code: 'let arr = [1, 2]\nlet copy = arr\n____.push(9)\nprint(arr.length)', expect: '3', answer: 'copy', hint: '같은 배열이라 arr도 늘어남' },
      { label: 'ref로 바꾸면?', ask: 'ref는 user와 같은 객체다. ref.name을 "지훈"으로 바꾸면 user.name은? 빈칸에 ref를 넣고 ▶확인', code: 'let user = { name: "민지" }\nlet ref = user\n____.name = "지훈"\nprint(user.name)', expect: '"지훈"', answer: 'ref', hint: '같은 객체' },
      { label: 'f로 바꾸면?', ask: 'f는 me.friend와 같은 객체다. f.hair를 "숏컷"으로 바꾸면 me.friend.hair는? 빈칸에 f를 넣고 ▶확인', code: 'let me = { friend: { hair: "긴머리" } }\nlet f = me.friend\n____.hair = "숏컷"\nprint(me.friend.hair)', expect: '"숏컷"', answer: 'f', hint: 'f = me.friend' },
    ],
  }

  // ── 🧠 M2 스택(stack) : 함수가 return으로 값 돌려주기 ──
  E['stack'] = {
    pattern: '🟢 쉬움 · 함수가 return으로 목표 값 돌려주기',
    problems: [
      { label: 'return 합', ask: 'add(3,4)가 7을 돌려주게 — 무엇을 return?', code: 'function add(a, b) { return ____ }\nprint(add(3, 4))', expect: '7', answer: 'a + b', hint: '두 매개변수를 더한다' },
      { label: '지역변수 반환', ask: 'f()가 지역변수 n을 돌려주게.', code: 'function f() { let n = 10; return ____ }\nprint(f())', expect: '10', answer: 'n', hint: 'return n' },
      { label: '세금', ask: 'tax(100)이 110이 되게 — 세율은? (세금 10 = 100 * ?)', code: 'function tax(p) { return p + p * ____ }\nprint(tax(100))', expect: '110', answer: '0.1', hint: '세금 10 = 100 * ?' },
      { label: '배수', ask: 'twice(6)이 12가 되게 — 몇 배?', code: 'function twice(n) { return n * ____ }\nprint(twice(6))', expect: '12', answer: '2', hint: '6의 2배' },
      { label: '문자열 반환', ask: 'name()이 "토끼"를 돌려주게.', code: 'function name() { return ____ }\nprint(name())', expect: '"토끼"', answer: '"토끼"', hint: '따옴표' },
    ],
  }

  // ── 🧠 M3 힙(heap) : 속성·인덱스·별칭 ──
  E['heap'] = {
    pattern: '🟢 쉬움 · 속성·인덱스·별칭으로 목표 값 만들기',
    problems: [
      { label: '곱해서', ask: 'obj.x가 6이 되게 — 3에 뭘 곱할까?', code: 'let obj = { x: 3 * ____ }\nprint(obj.x)', expect: '6', answer: '2', hint: '3 * 2' },
      { label: '마지막 인덱스', ask: '마지막 값 30을 꺼내려면 몇 번 인덱스? (0부터!)', code: 'let arr = [10, 20, 30]\nprint(arr[____])', expect: '30', answer: '2', hint: '셋 중 마지막 = 2' },
      { label: '별칭으로 바꾸면?', ask: 'b는 a와 같은 힙 객체다. b.v를 9로 바꾸면 a.v는? 빈칸에 b를 넣고 ▶확인', code: 'let a = { v: 1 }\nlet b = a\n____.v = 9\nprint(a.v)', expect: '9', answer: 'b', hint: '같은 객체라 a.v도 9' },
      { label: '이름', ask: 'card.name이 "민지"가 되게.', code: 'let card = { name: "____" }\nprint(card.name)', expect: '"민지"', answer: '민지', hint: '따옴표 안에' },
      { label: '중첩 속성', ask: '중첩된 n(7)에 도달하려면 어떤 속성?', code: 'let data = { inner: { n: 7 } }\nprint(data.inner.____)', expect: '7', answer: 'n', hint: 'data.inner.n' },
    ],
  }

  // ── 🧠 M5 값 전달(passval) : 원본은 안전 ──
  E['passval'] = {
    pattern: '🟢 쉬움 · 값(원시)을 넘겨 바꿔도 원본은 안전',
    problems: [
      { label: '돈은 안전?', ask: 'tear가 받은 bill을 0으로 만든다. tear(money) 뒤 원본 money(100)는? 빈칸에 0을 넣고 ▶확인', code: 'function tear(bill){ bill = ____ }\nlet money = 100\ntear(money)\nprint(money)', expect: '100', answer: '0', hint: '복사본이 전달됨 → 원본 안전' },
      { label: '점수는 안전?', ask: 'reset이 받은 값을 999로 만든다. score(50)는? 빈칸에 999를 넣고 ▶확인', code: 'function reset(n){ n = ____ }\nlet score = 50\nreset(score)\nprint(score)', expect: '50', answer: '999', hint: '원본 안전' },
      { label: '더해도 안전?', ask: 'add1이 받은 값에 5를 더한다. a(10)는? 빈칸에 5를 넣고 ▶확인', code: 'function add1(x){ x = x + ____ }\nlet a = 10\nadd1(a)\nprint(a)', expect: '10', answer: '5', hint: '복사본만 바뀜' },
      { label: '반으로 해도?', ask: 'half가 받은 값을 0으로 만든다. price(200)는? 빈칸에 0을 넣고 ▶확인', code: 'function half(v){ v = ____ }\nlet price = 200\nhalf(price)\nprint(price)', expect: '200', answer: '0', hint: '원본 안전' },
      { label: '지워도 안전?', ask: 'clear가 받은 값을 빈 글자로 만든다. name("민지")은? 빈칸에 ""(빈 문자열)을 넣고 ▶확인', code: 'function clear(s){ s = ____ }\nlet name = "민지"\nclear(name)\nprint(name)', expect: '"민지"', answer: '""', hint: '원본 안전' },
    ],
  }

  // ── 🧠 M6 참조 전달(passobj) : 그 객체를 넘기면 원본이 바뀐다 ──
  E['passobj'] = {
    pattern: '🟢 쉬움 · "그 객체"를 넘기면 함수 안에서 원본이 바뀐다',
    problems: [
      { label: '지갑', ask: 'pay는 받은 지갑의 money를 0으로. wallet.money도 0이 되게 하려면 pay에 무엇을 넘길까?', code: 'function pay(acc){ acc.money = 0 }\nlet wallet = { money: 100 }\npay(____)\nprint(wallet.money)', expect: '0', answer: 'wallet', hint: '그 객체를 넘기면 공유' },
      { label: '이름 변경', ask: 'rename은 받은 객체 이름을 바꾼다. user.name도 바뀌게 하려면?', code: 'function rename(u){ u.name = "지훈" }\nlet user = { name: "민지" }\nrename(____)\nprint(user.name)', expect: '"지훈"', answer: 'user', hint: 'user를 넘긴다' },
      { label: 'hp', ask: 'grow는 받은 것의 hp를 999로. hero.hp도 바뀌게 하려면?', code: 'function grow(p){ p.hp = 999 }\nlet hero = { hp: 100 }\ngrow(____)\nprint(hero.hp)', expect: '999', answer: 'hero', hint: 'hero를 넘긴다' },
      { label: '완료', ask: 'done은 받은 것의 ok를 true로. task.ok도 바뀌게 하려면?', code: 'function done(t){ t.ok = true }\nlet task = { ok: false }\ndone(____)\nprint(task.ok)', expect: 'true', answer: 'task', hint: 'task를 넘긴다' },
      { label: '0으로', ask: 'zero는 받은 것의 count를 0으로. data.count도 바뀌게 하려면?', code: 'function zero(o){ o.count = 0 }\nlet data = { count: 99 }\nzero(____)\nprint(data.count)', expect: '0', answer: 'data', hint: 'data를 넘긴다' },
    ],
  }

  // ── 🧠 M7 배열 전달(passarr) : 그 배열을 넘기면 원본이 바뀐다 ──
  E['passarr'] = {
    pattern: '🟢 쉬움 · "그 배열"을 넘기면 함수 안에서 원본이 바뀐다',
    problems: [
      { label: 'push', ask: 'add는 받은 배열에 push한다. arr이 늘어나게 하려면 무엇을 넘길까?', code: 'function add(list){ list.push(9) }\nlet arr = [1, 2]\nadd(____)\nprint(arr.length)', expect: '3', answer: 'arr', hint: 'arr을 넘기면 같은 배열' },
      { label: '빈 배열에', ask: 'fill9는 받은 배열에 9를 push. nums에 들어가게 하려면?', code: 'function fill9(a){ a.push(9) }\nlet nums = []\nfill9(____)\nprint(nums[0])', expect: '9', answer: 'nums', hint: 'nums를 넘긴다' },
      { label: '비우기', ask: 'reset은 받은 배열을 비운다. items가 비게 하려면?', code: 'function reset(a){ a.length = 0 }\nlet items = [1, 2, 3]\nreset(____)\nprint(items.length)', expect: '0', answer: 'items', hint: 'items를 넘긴다' },
      { label: '항목 추가', ask: 'grow는 받은 배열에 항목을 더한다. cart가 늘어나게 하려면?', code: 'function grow(list){ list.push("새") }\nlet cart = ["빵"]\ngrow(____)\nprint(cart.length)', expect: '2', answer: 'cart', hint: 'cart를 넘긴다' },
      { label: '0번 수정', ask: 'double0은 받은 배열의 0번을 2배로. arr[0]이 바뀌게 하려면?', code: 'function double0(a){ a[0] = a[0] * 2 }\nlet arr = [5, 6]\ndouble0(____)\nprint(arr[0])', expect: '10', answer: 'arr', hint: 'arr을 넘긴다' },
    ],
  }

  // ── 🕸️ G1 그래프(graph) : 화살표 경로 따라가기 ──
  E['graph'] = {
    pattern: '🟢 쉬움 · 화살표(참조)를 따라 경로로 값에 닿기',
    problems: [
      { label: 'me.friend로 바꾸면?', ask: 'me.friend는 효니를 가리킨다. me.friend.hair를 "숏컷"으로 바꾸면 효니 본인은? 빈칸에 me.friend를 넣고 ▶확인', code: 'let hyoni = { hair: "긴머리" }\nlet me = { friend: hyoni }\n____.hair = "숏컷"\nprint(hyoni.hair)', expect: '"숏컷"', answer: 'me.friend', hint: 'me.friend = 효니(같은 사람)' },
      { label: '화살표 따라', ask: 'a.next 안의 값 7을 꺼내려면 어떤 속성?', code: 'let a = { next: { val: 7 } }\nprint(a.next.____)', expect: '7', answer: 'val', hint: 'a.next.val' },
      { label: 'y.ref로 바꾸면?', ask: 'y.ref는 x를 가리킨다. y.ref.n을 9로 바꾸면 x.n은? 빈칸에 y.ref를 넣고 ▶확인', code: 'let x = { n: 1 }\nlet y = { ref: x }\n____.n = 9\nprint(x.n)', expect: '9', answer: 'y.ref', hint: 'y.ref = x(같은 객체)' },
      { label: '리더 이름', ask: 'team.leader(=p)의 이름을 꺼내려면?', code: 'let p = { name: "김" }\nlet team = { leader: p }\nprint(team.leader.____)', expect: '"김"', answer: 'name', hint: '.name' },
      { label: '2중 중첩', ask: '2중 중첩 안의 v(3)를 꺼내려면?', code: 'let root = { child: { child: { v: 3 } } }\nprint(root.child.child.____)', expect: '3', answer: 'v', hint: '.v' },
    ],
  }

  // ── 🕸️ G2 친구 목록(friends) : 배열 안 사람 객체 ──
  E['friends'] = {
    pattern: '🟢 쉬움 · 배열 안 사람 객체에 닿는 경로',
    problems: [
      { label: 'list[0]으로 바꾸면?', ask: 'list[0]은 minji와 같은 객체다. list[0].name을 "X"로 바꾸면 minji.name은? 빈칸에 list[0]을 넣고 ▶확인', code: 'let minji = { name: "민지" }\nlet list = [minji]\n____.name = "X"\nprint(minji.name)', expect: '"X"', answer: 'list[0]', hint: 'list[0] = minji(같은 객체)' },
      { label: '두 번째 나이', ask: 'people의 두 번째 사람 나이(30)를 꺼내려면?', code: 'let people = [{ age: 20 }, { age: 30 }]\nprint(people[1].____)', expect: '30', answer: 'age', hint: '.age' },
      { label: 'arr[0]으로 바꾸면?', ask: 'arr[0]은 a와 같은 객체다. arr[0].hp를 50으로 바꾸면 a.hp는? 빈칸에 arr[0]을 넣고 ▶확인', code: 'let a = { hp: 100 }\nlet arr = [a]\n____.hp = 50\nprint(a.hp)', expect: '50', answer: 'arr[0]', hint: 'arr[0] = a(같은 객체)' },
      { label: 'id 찾기', ask: 'id가 2인 사람은 몇 번째? (0부터)', code: 'let users = [{ id: 1 }, { id: 2 }]\nprint(users[____].id)', expect: '2', answer: '1', hint: '두 번째 = 1' },
      { label: '항목', ask: 'cart 0번 객체의 item을 꺼내려면?', code: 'let cart = [{ item: "빵" }]\nprint(cart[0].____)', expect: '"빵"', answer: 'item', hint: '.item' },
    ],
  }

  // ── 🕸️ G3 계통도(family) : 트리 경로 ──
  E['family'] = {
    pattern: '🟢 쉬움 · 트리에서 원하는 사람/값에 닿는 경로',
    problems: [
      { label: '할머니', ask: 'me → 엄마 → 할머니. 할머니 이름에 닿으려면 me.parent 다음 어떤 속성?', code: 'let grandma = { name: "할머니" }\nlet mom = { parent: grandma }\nlet me = { parent: mom }\nprint(me.parent.____.name)', expect: '"할머니"', answer: 'parent', hint: '엄마의 parent = 할머니' },
      { label: '손자', ask: '2대 아래 손자 이름을 꺼내려면?', code: 'let a = { child: { child: { name: "손자" } } }\nprint(a.child.child.____)', expect: '"손자"', answer: 'name', hint: '.name' },
      { label: '왼쪽', ask: 'root의 왼쪽(left) 안 val을 꺼내려면 어떤 속성?', code: 'let root = { left: { val: 5 } }\nprint(root.____.val)', expect: '5', answer: 'left', hint: '.left' },
      { label: '엄마 이름', ask: 'me.mom의 이름을 꺼내려면?', code: 'let me = { mom: { name: "엄마" } }\nprint(me.mom.____)', expect: '"엄마"', answer: 'name', hint: '.name' },
      { label: '깊은 데이터', ask: 'tree.node 다음 한 단계 더 들어가 data에 닿으려면?', code: 'let tree = { node: { node: { data: 7 } } }\nprint(tree.node.____.data)', expect: '7', answer: 'node', hint: 'node를 한 번 더' },
    ],
  }

  // ── 🕸️ G4 순환(cycle) : 서로 가리켜도 경로로 도달 ──
  E['cycle'] = {
    pattern: '🟢 쉬움 · 순환(서로 가리킴)에서도 경로를 따라가면 도달',
    problems: [
      { label: '왕복', ask: 'a.to(=b)의 val을 꺼내려면?', code: 'let a = {}\nlet b = {}\na.to = b\nb.to = a\nb.val = 9\nprint(a.to.____)', expect: '9', answer: 'val', hint: 'a.to = b' },
      { label: '서로 가리킴', ask: 'x.peer(=y)의 id를 꺼내려면?', code: 'let x = { id: 1 }\nlet y = { id: 2 }\nx.peer = y\ny.peer = x\nprint(x.peer.____)', expect: '2', answer: 'id', hint: 'x.peer = y' },
      { label: '자기 순환', ask: 'node.self(=자기 자신)의 v를 꺼내려면?', code: 'let node = {}\nnode.self = node\nnode.v = 7\nprint(node.self.____)', expect: '7', answer: 'v', hint: 'self = node' },
      { label: '앞뒤 연결', ask: 'b.back(=a)의 n을 꺼내려면?', code: 'let a = { n: 3 }\nlet b = { back: a }\na.fwd = b\nprint(b.back.____)', expect: '3', answer: 'n', hint: 'b.back = a' },
      { label: '큐 이름', ask: 'p.q(=q)의 name을 꺼내려면?', code: 'let p = {}\nlet q = {}\np.q = q\nq.p = p\nq.name = "큐"\nprint(p.q.____)', expect: '"큐"', answer: 'name', hint: 'p.q = q' },
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

  // ── 🧬 클래스(class) : 틀 만들고 new 로 찍어 속성 꺼내기 ──
  E['class'] = {
    pattern: '🟢 쉬움 · constructor·this·new 로 인스턴스 만들고 속성 꺼내기',
    problems: [
      { label: '인스턴스 속성', ask: 'new C().n 이 5가 되게 this.n에 담을 값은?', code: 'class C { constructor() { this.n = ____ } }\nprint(new C().n)', expect: '5', answer: '5', hint: 'this.n = 5' },
      { label: '생성자 인수', ask: '이름을 넘겨 new Dog().name이 "콩이"가 되게.', code: 'class Dog { constructor(name) { this.name = name } }\nprint(new Dog("____").name)', expect: '"콩이"', answer: '콩이', hint: 'new Dog("콩이")' },
      { label: 'new 키워드', ask: '인스턴스를 만드는 키워드는? 빈칸을 채워라.', code: 'class C { constructor() { this.v = 7 } }\nlet c = ____ C()\nprint(c.v)', expect: '7', answer: 'new', hint: 'new C()' },
      { label: 'this 속성', ask: 'new P(24)의 나이를 꺼내려면 어떤 속성?', code: 'class P { constructor(a) { this.age = a } }\nprint(new P(24).____)', expect: '24', answer: 'age', hint: '.age' },
      { label: '기본값', ask: 'c의 hp(100)를 꺼내려면 어떤 속성?', code: 'class C { constructor() { this.hp = 100 } }\nlet c = new C()\nprint(c.____)', expect: '100', answer: 'hp', hint: 'c.hp' },
    ],
  }
})()
