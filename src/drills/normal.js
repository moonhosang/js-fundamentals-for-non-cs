// 🟡 보통 드릴 — 변형·조합(한 겹 더). 같은 개념을 살짝 다른 맥락에. (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것. 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const N = window.Drills.normal

  // ── 1강 · 값과 타입, 변수 : 재할당·typeof·복사독립·null ──
  N['1'] = {
    pattern: '🟡 보통 · 재할당·typeof·복사 독립·null — 값의 성질',
    problems: [
      { label: '재할당', ask: 'x(10)에 얼마를 더해야 15가 될까?', code: 'let x = 10\nx = x + ____\nprint(x)', expect: '15', answer: '5', hint: '15 - 10' },
      { label: 'typeof 숫자', ask: '결과가 "number"가 나오게 — 어떤 값을? (숫자)', code: 'print(typeof ____)', expect: '"number"', answer: '99', hint: '아무 숫자' },
      { label: '복사=독립', ask: 'b를 99로 바꿔 보세요. 그러면 a는? (▶ 확인)', code: 'let a = 10\nlet b = a\nb = ____\nprint(a)', expect: '10', answer: '99', hint: '원시값은 복사라 a는 안 변함' },
      { label: 'null로 비우기', ask: 'memo를 "값을 일부러 비움" 상태로. (0이나 빈 글자 말고)', code: 'let memo = "메모"\nmemo = ____\nprint(memo)', expect: 'null', answer: 'null', hint: '의도적 빈 값' },
      { label: '문자열 담기', ask: '화면에 토끼가 나오게 — 문자열은 어떻게 쓰지?', code: 'let name = ____\nprint(name)', expect: '"토끼"', answer: '"토끼"', hint: '따옴표로 감싼다' },
    ],
  }

  // ── 2강 · 계산과 문자열 : 템플릿 나머지 + 이어붙이기 ──
  N['2'] = {
    pattern: '🟡 보통 · 템플릿에 숫자·문장 앞자리 넣기 변형',
    problems: [
      { label: '오늘의 과일 ${fruit}', ask: 'fruit(="사과")를 넣어 "오늘의 과일: 사과"가 나오게.', code: 'let fruit = "사과"\nprint(`오늘의 과일: ____`)', expect: '"오늘의 과일: 사과"', answer: '${fruit}', hint: '${fruit}' },
      { label: '점수 ${score}', ask: 'score(=95)를 넣어 "점수는 95점"이 나오게.', code: 'let score = 95\nprint(`점수는 ____점`)', expect: '"점수는 95점"', answer: '${score}', hint: '숫자도 ${ } 안에' },
      { label: '${team}팀', ask: 'team(="파랑")을 넣어 "파랑팀 화이팅"이 나오게.', code: 'let team = "파랑"\nprint(`____팀 화이팅`)', expect: '"파랑팀 화이팅"', answer: '${team}', hint: '문장 맨 앞에도 ${ }' },
      { label: '남은 자리 ${seat}', ask: 'seat(=7)을 넣어 "남은 자리 7개"가 나오게.', code: 'let seat = 7\nprint(`남은 자리 ____개`)', expect: '"남은 자리 7개"', answer: '${seat}', hint: '${seat}' },
      { label: '${who} 로그인', ask: 'who(="관리자")를 넣어 "관리자님이 로그인"이 나오게.', code: 'let who = "관리자"\nprint(`____님이 로그인`)', expect: '"관리자님이 로그인"', answer: '${who}', hint: '문장 맨 앞에도 ${ }' },
    ],
  }

  // ── 3강 · 표현식 : 문자열·함수·삼항·논리도 값 ──
  N['3'] = {
    pattern: '🟡 보통 · 문자열·인자·삼항·논리 축약 — 표현식은 모두 값',
    problems: [
      { label: '문자열 + 괄호', ask: '"n=" + (1 + 2) 는? (괄호 안 먼저, 그다음 이어붙이기)', code: 'print(("n=" + (1 + 2)) === ____)', expect: 'true', answer: '"n=3"', hint: '1+2=3 → "n=3" (따옴표째 입력)' },
      { label: '인자 안 먼저', ask: 'Math.max(1, 2 * 3) 은? (인자 안 곱셈 먼저)', code: 'print((Math.max(1, 2 * 3)) === ____)', expect: 'true', answer: '6', hint: '2*3=6 → max(1,6)=6' },
      { label: '삼항도 값', ask: '7 > 3 ? "y" : "n" 은? (삼항은 표현식 → 값)', code: 'print((7 > 3 ? "y" : "n") === ____)', expect: 'true', answer: '"y"', hint: '7>3은 true → "y" (따옴표째)' },
      { label: '비교·논리도 값', ask: 'true < true && true 는? (< 가 && 보다 먼저!)', code: 'print((true < true && true) === ____)', expect: 'true', answer: 'false', hint: 'true<true=false → false && true' },
      { label: '나머지 연산', ask: '10 % 3 은? (나눈 나머지)', code: 'print((10 % 3) === ____)', expect: 'true', answer: '1', hint: '10 = 3*3 + 1' },
    ],
  }

  // ── 4강 · 조건 : truthy/falsy + 삼항 ──
  N['4'] = {
    pattern: '🟡 보통 · truthy/falsy 함정 + 삼항',
    problems: [
      { label: 'Boolean("") → false', ask: '빈 문자열은 falsy → false. 빈칸에 빈 문자열을.', code: 'print(Boolean(____))', expect: 'false', answer: '""', hint: '빈 글자: ""' },
      { label: 'Boolean(0) → false', ask: '숫자 0은 falsy → false.', code: 'print(Boolean(____))', expect: 'false', answer: '0', hint: '0은 falsy' },
      { label: 'Boolean([]) → true(함정)', ask: '빈 배열은 truthy(함정!) → true.', code: 'print(Boolean(____))', expect: 'true', answer: '[]', hint: '빈 배열 [] 도 "있는 것"' },
      { label: 'Boolean("false") → true(함정)', ask: '글자 "false"는 truthy → true. (진짜 false 아님)', code: 'print(Boolean(____))', expect: 'true', answer: '"false"', hint: '따옴표 친 글자는 있는 것' },
      { label: '삼항 → "성인"', ask: '20세는 18 이상 → "성인"이 나오게 빈칸을.', code: 'let age = 20\nprint(age >= 18 ? ____ : "미성년")', expect: '"성인"', answer: '"성인"', hint: '조건 ? 참일때 : 거짓일때' },
    ],
  }

  // ── 5강 · 함수 : 반환 담기·화살표·여러 인수·전역 ──
  N['5'] = {
    pattern: '🟡 보통 · 반환값 담기·화살표·여러 인수·전역 참조',
    problems: [
      { label: '반환값 담기', ask: 'sq(4)의 결과를 r에 담으세요. 무슨 함수를 부르나?', code: 'function sq(x) { return x * x }\nlet r = ____(4)\nprint(r)', expect: '16', answer: 'sq', hint: 'sq를 호출' },
      { label: 'return 없으면', ask: 'x*2를 돌려주도록 빈칸을. (없으면 undefined)', code: 'function f(x) { ____ x * 2 }\nprint(f(3))', expect: '6', answer: 'return', hint: '돌려주려면 return' },
      { label: '화살표 함수', ask: '화살표 함수로 n의 2배. 연산자는?', code: 'const dbl = (n) => n ____ 2\nprint(dbl(6))', expect: '12', answer: '*', hint: '2배 = 곱하기' },
      { label: '두 인수', ask: 'add(4, ?)가 10이 되게 두 번째 인수를 채우세요.', code: 'function add(a, b) { return a + b }\nprint(add(4, ____))', expect: '10', answer: '6', hint: '4 + ? = 10' },
      { label: '전역 쓰기', ask: '함수가 전역 base를 더한다. add5(?)가 15가 되게.', code: 'let base = 10\nfunction add5(n) { return n + base }\nprint(add5(____))', expect: '15', answer: '5', hint: 'n + 10 = 15' },
    ],
  }

  // ── 6강 · 배열 : push·칸 바꾸기·마지막·이름배열 ──
  N['6'] = {
    pattern: '🟡 보통 · push 추가·칸 바꾸기·마지막(length-1) 변형',
    problems: [
      { label: 'push로 추가', ask: '[1,2]에 값을 하나 추가해 개수가 3이 되게. 무슨 메서드?', code: 'let a = [1, 2]\na.____(3)\nprint(a.length)', expect: '3', answer: 'push', hint: '끝에 추가: push' },
      { label: '칸 바꾸기', ask: '[1,2,3]의 0번 칸을 9로 바꾸세요.', code: 'let a = [1, 2, 3]\na[0] = ____\nprint(a[0])', expect: '9', answer: '9', hint: 'arr[0] = 9' },
      { label: '마지막 = length-1', ask: '[5,6,7]의 마지막(7)을 length로 꺼내세요.', code: 'let a = [5, 6, 7]\nprint(a[a.length - ____])', expect: '7', answer: '1', hint: '마지막 번호 = length - 1' },
      { label: '이름 배열', ask: '["민지","지훈","서연"]의 세 번째(서연)를 꺼내세요.', code: 'let names = ["민지", "지훈", "서연"]\nprint(names[____])', expect: '"서연"', answer: '2', hint: '세 번째 = 2번' },
      { label: 'push 값', ask: '["우유"]에 뭐든 하나 추가해 개수가 2가 되게 빈칸을.', code: 'let cart = ["우유"]\ncart.push(____)\nprint(cart.length)', expect: '2', answer: '"빵"', hint: 'push는 뭘 넣어도 개수 +1' },
    ],
  }

  // ── 7강 · 반복과 map : forEach·map원본·짝수·reduce곱·메서드 ──
  N['7'] = {
    pattern: '🟡 보통 · forEach 누적·map은 원본 그대로·짝수 filter·reduce 곱',
    problems: [
      { label: 'forEach 합', ask: 'sum에 각 x를 더해 6이 되게 — 무슨 연산?', code: 'let nums = [1, 2, 3]\nlet sum = 0\nnums.forEach(function (x) { sum = sum ____ x })\nprint(sum)', expect: '6', answer: '+', hint: 'sum + x' },
      { label: 'map 원본', ask: 'map을 써도 원본 n의 개수는 그대로 3. 개수를 꺼내려면?', code: 'let n = [1, 2, 3]\nn.map(function (x) { return x * 2 })\nprint(n.____)', expect: '3', answer: 'length', hint: 'map은 원본 안 바꿈' },
      { label: 'filter 짝수', ask: '짝수만 남기려면 나머지가 무엇과 같아야? [2,4,6]', code: 'let n = [1, 2, 3, 4, 5, 6]\nlet r = n.filter(function (x) { return x % 2 === ____ })\nprint(r)', expect: '[2,4,6]', answer: '0', hint: '짝수 = 나머지 0' },
      { label: 'reduce 곱', ask: '다 곱해서 24가 되게 — 시작값은? (곱셈의 시작)', code: 'let n = [2, 3, 4]\nlet p = n.reduce(function (a, b) { return a * b }, ____)\nprint(p)', expect: '24', answer: '1', hint: '곱셈 시작값 = 1' },
      { label: 'map 메서드', ask: '각 글자를 대문자로 바꿔 ["A","B"]가 되게 — 무슨 메서드?', code: 'let names = ["a", "b"]\nlet up = names.map(function (s) { return s.____() })\nprint(up)', expect: '["A","B"]', answer: 'toUpperCase', hint: '대문자 = toUpperCase' },
    ],
  }

  // ── 8강 · 객체 : 없는 키·중첩·배열 안 객체·대괄호·조합 출력 ──
  N['8'] = {
    pattern: '🟡 보통 · 없는 키·중첩·배열 안 객체·대괄호 — 한 겹 더',
    problems: [
      { label: '없는 키', ask: 'u엔 name만 있다. u.age(없는 이름)를 꺼내면? 빈칸에 age를 넣고 ▶확인', code: 'let u = { name: "민지" }\nprint(u.____)', expect: 'undefined', answer: 'age', hint: '없는 키 = undefined' },
      { label: '중첩', ask: 'me.pet.name이 "콩이"가 되게 안쪽을 채워라.', code: 'let me = { pet: { name: "____" } }\nprint(me.pet.name)', expect: '"콩이"', answer: '콩이', hint: '제일 안쪽 name' },
      { label: '배열 안 객체', ask: '두 번째 사람의 이름(지훈)을 꺼내려면 어떤 속성?', code: 'let users = [{ name: "민지" }, { name: "지훈" }]\nprint(users[1].____)', expect: '"지훈"', answer: 'name', hint: 'users[1].name' },
      { label: '대괄호(공백 키)', ask: '"my key"처럼 공백 있는 이름은 대괄호로! 값 7을 꺼내려면 빈칸에?', code: 'let o = { "my key": 7 }\nprint(o[____])', expect: '7', answer: '"my key"', hint: 'o["my key"]' },
      { label: '속성 조합 출력', ask: '"민지(24)"가 나오게 나이 속성을 꺼내라.', code: 'let p = { name: "민지", age: 24 }\nprint(p.name + "(" + p.____ + ")")', expect: '"민지(24)"', answer: 'age', hint: 'p.age' },
    ],
  }

  // ── 9강 · DOM : 태그이름·붙이기·클릭·숫자→글자 ──
  N['9'] = {
    pattern: '🟡 보통 · tagName(대문자)·append·click·숫자→문자',
    problems: [
      { label: '태그 이름', ask: 'tagName이 "BUTTON"(대문자!)이 되려면 어떤 태그로 만들까?', code: 'let el = document.createElement("____")\nprint(el.tagName)', expect: '"BUTTON"', answer: 'button', hint: 'tagName은 항상 대문자로 나온다' },
      { label: '붙이기', ask: 'c를 box2 안에 붙여 자식 1개가 되게 — 무슨 함수?', code: 'let box2 = document.createElement("div")\nlet c = document.createElement("span")\nbox2.____(c)\nprint(box2.children.length)', expect: '1', answer: 'append', hint: 'box2.append(c)' },
      { label: '클릭 실행', ask: '버튼을 눌러 n이 1이 되게 — 버튼을 누르는 함수는?', code: 'let n = 0\nlet btn = document.createElement("button")\nbtn.addEventListener("click", function () { n = 1 })\nbtn.____()\nprint(n)', expect: '1', answer: 'click', hint: 'btn.click() 이 클릭을 흉내낸다' },
      { label: '숫자→글자', ask: '화면 글자를 "90점"으로 만들려면 숫자 자리에 무엇?', code: 'let el = document.createElement("div")\nel.textContent = ____ + "점"\nprint(el.textContent)', expect: '"90점"', answer: '90', hint: '숫자 90은 자동으로 문자가 된다' },
      { label: '이벤트 종류', ask: '"클릭" 이벤트를 듣게 하려면 첫 칸에 무슨 이름?', code: 'let ok = 0\nlet btn = document.createElement("button")\nbtn.addEventListener("____", function () { ok = 1 })\nbtn.click()\nprint(ok)', expect: '1', answer: 'click', hint: 'addEventListener("click", ...)' },
    ],
  }

  // ── 10강 · 실전 캡스톤 : 조건·map·이벤트·객체배열·reduce ──
  N['10'] = {
    pattern: '🟡 보통 · 조건·map 변환·이벤트·객체 배열·reduce 합',
    problems: [
      { label: '조건', ask: '나이 15는 성인이 아니다 — else 쪽 글자를 "청소년"으로.', code: 'let age = 15\nprint(age >= 19 ? "성인" : "____")', expect: '"청소년"', answer: '청소년', hint: '15 < 19 → else 쪽' },
      { label: 'map 변환', ask: '나이를 1씩 올린 next에서 20→21을 꺼내려면 몇 번?', code: 'let ages = [10, 20]\nlet next = ages.map(a => a + 1)\nprint(next[____])', expect: '21', answer: '1', hint: '두 번째 = 번호 1' },
      { label: '이벤트', ask: '버튼을 눌러 clicked가 1이 되게 — 클릭을 흉내내는 함수?', code: 'let clicked = 0\nlet b = document.createElement("button")\nb.addEventListener("click", () => clicked++)\nb.____()\nprint(clicked)', expect: '1', answer: 'click', hint: 'b.click()' },
      { label: '객체 배열', ask: '목록 첫 사람의 이름(민지)을 꺼내려면 어떤 속성?', code: 'let ppl = [{ name: "민지" }, { name: "지훈" }]\nprint(ppl[0].____)', expect: '"민지"', answer: 'name', hint: 'ppl[0].name' },
      { label: 'reduce 합', ask: '두 값을 더해 30이 되게 — 무슨 연산?', code: 'let a = [10, 20]\nprint(a.reduce((s, x) => s ____ x, 0))', expect: '30', answer: '+', hint: 's + x' },
    ],
  }
})()
