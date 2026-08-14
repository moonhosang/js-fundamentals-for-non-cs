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

  // ── 🧠 M1 램(ram) : 재할당 여러 번·typeof·복사 후 원본 ──
  N['ram'] = {
    pattern: '🟡 보통 · 재할당 누적·typeof 여러 타입·복사 후 원본',
    problems: [
      { label: '두 번 재할당', ask: 'x를 두 번 더해 10이 되게 — 마지막에 얼마를?', code: 'let x = 1\nx = x + 1\nx = x + ____\nprint(x)', expect: '10', answer: '8', hint: '1+1=2, +8 → 10' },
      { label: 'typeof 문자', ask: '결과가 "string"이 나오게 — 어떤 값을?', code: 'print(typeof ____)', expect: '"string"', answer: '"hi"', hint: '따옴표 친 글자' },
      { label: '원본은 그대로', ask: 'a를 0으로 바꿔 보세요. 먼저 복사한 b는? (▶ 확인)', code: 'let a = 7\nlet b = a\na = ____\nprint(b)', expect: '7', answer: '0', hint: 'b는 복사본 → 그대로 7' },
      { label: 'typeof 불리언', ask: '결과가 "boolean"이 나오게 — 어떤 값을?', code: 'print(typeof ____)', expect: '"boolean"', answer: 'true', hint: 'true / false' },
      { label: '미초기화', ask: '값을 안 넣은 x의 타입은 "undefined". 빈칸에 x', code: 'let x\nprint(typeof ____)', expect: '"undefined"', answer: 'x', hint: '선언만 하면 undefined' },
    ],
  }

  // ── 🧠 M4-1 값=복사(ref) : 계산해 바꿔도 원본 그대로 ──
  N['ref'] = {
    pattern: '🟡 보통 · 계산으로 바꿔도 원시값 원본은 그대로',
    problems: [
      { label: '곱해 바꿔도?', ask: 'y를 2배로 바꿔 보세요. x는? (▶ 확인)', code: 'let x = 3\nlet y = x\ny = y * ____\nprint(x)', expect: '3', answer: '2', hint: '복사라 x는 3' },
      { label: '빼서 바꿔도?', ask: 'b에서 30을 빼 보세요. a는? (▶ 확인)', code: 'let a = 100\nlet b = a\nb = b - ____\nprint(a)', expect: '100', answer: '30', hint: 'a는 100 그대로' },
      { label: '0으로 해도?', ask: 'm을 0으로 바꿔 보세요. n은? (▶ 확인)', code: 'let n = 5\nlet m = n\nm = ____\nprint(n)', expect: '5', answer: '0', hint: 'n은 5 그대로' },
      { label: '글자 바꿔도?', ask: 's2를 다른 글자로 바꿔 보세요. s1은? (▶ 확인)', code: 'let s1 = "무지"\nlet s2 = s1\ns2 = "____"\nprint(s1)', expect: '"무지"', answer: '어피치', hint: '문자열도 복사' },
      { label: '꺼낸 값 바꿔도?', ask: 'a.num을 꺼낸 b를 20으로 바꿔 보세요. a.num은? (▶ 확인)', code: 'let a = { num: 10 }\nlet b = a.num\nb = ____\nprint(a.num)', expect: '10', answer: '20', hint: '꺼낼 때 복사' },
    ],
  }

  // ── 🧠 M4-2 참조=공유(ref2) : 여러 별칭·배열 별칭 ──
  N['ref2'] = {
    pattern: '🟡 보통 · 별칭으로 속성/배열을 바꾸면 원본도 함께',
    problems: [
      { label: '별칭 속성', ask: 'b는 a와 같은 객체. b.x를 5로 바꾸면 a.x는? 빈칸에 b', code: 'let a = { x: 1 }\nlet b = a\n____.x = 5\nprint(a.x)', expect: '5', answer: 'b', hint: '같은 객체' },
      { label: '배열 별칭 push', ask: 'c는 arr과 같은 배열. c에 2를 push하면 arr 길이는? 빈칸에 c', code: 'let arr = [1]\nlet c = arr\n____.push(2)\nprint(arr.length)', expect: '2', answer: 'c', hint: '같은 배열' },
      { label: 'hp 깎기', ask: 'v는 u와 같은 객체. v.hp를 0으로 하면 u.hp는? 빈칸에 v', code: 'let u = { hp: 10 }\nlet v = u\n____.hp = 0\nprint(u.hp)', expect: '0', answer: 'v', hint: '같은 객체' },
      { label: '완료 표시', ask: 'r은 o와 같은 객체. r.done을 true로 하면 o.done은? 빈칸에 r', code: 'let o = { done: false }\nlet r = o\n____.done = true\nprint(o.done)', expect: 'true', answer: 'r', hint: '같은 객체' },
      { label: '이름 바꾸기', ask: 'q는 p와 같은 객체. q.name을 "b"로 하면 p.name은? 빈칸에 q', code: 'let p = { name: "a" }\nlet q = p\n____.name = "b"\nprint(p.name)', expect: '"b"', answer: 'q', hint: '같은 객체' },
    ],
  }

  // ── 🧠 M2 스택(stack) : 계산·조건·문자 반환 ──
  N['stack'] = {
    pattern: '🟡 보통 · 계산·조건·문자 결합을 return',
    problems: [
      { label: '곱 반환', ask: 'mul(3,4)가 12를 돌려주게 — 무엇을 return?', code: 'function mul(a, b) { return ____ }\nprint(mul(3, 4))', expect: '12', answer: 'a * b', hint: 'a * b' },
      { label: '뺄셈', ask: 'sub(10,4)가 6이 되게 — 무슨 연산?', code: 'function sub(a, b) { return a ____ b }\nprint(sub(10, 4))', expect: '6', answer: '-', hint: '빼기' },
      { label: '조건 반환', ask: 'sign(-2)가 "-"가 되게 — else 쪽을 채워라.', code: 'function sign(n) { return n > 0 ? "+" : "____" }\nprint(sign(-2))', expect: '"-"', answer: '-', hint: '음수 → else' },
      { label: '지역 계산', ask: 'f()가 10을 돌려주게 — x(5)에 몇을 곱할까?', code: 'function f() { let x = 5; return x * ____ }\nprint(f())', expect: '10', answer: '2', hint: '5 * 2' },
      { label: '문자 결합 반환', ask: 'g("z")가 "hi z"가 되게 — 매개변수를 붙여라.', code: 'function g(n) { return "hi " + ____ }\nprint(g("z"))', expect: '"hi z"', answer: 'n', hint: '"hi " + n' },
    ],
  }

  // ── 🧠 M3 힙(heap) : 속성 추가·중첩·별칭·동적 접근 ──
  N['heap'] = {
    pattern: '🟡 보통 · 속성 추가·중첩·별칭 변경',
    problems: [
      { label: '속성 추가', ask: 'o.x가 5가 되게 값을 채워라.', code: 'let o = {}\no.x = ____\nprint(o.x)', expect: '5', answer: '5', hint: 'o.x = 5' },
      { label: '0번 꺼내기', ask: '[10,20]의 첫 값(10)을 꺼내려면 몇 번?', code: 'let a = [10, 20]\nprint(a[____])', expect: '10', answer: '0', hint: '첫째 = 0' },
      { label: '중첩', ask: 'd.in.v(7)를 꺼내려면 어떤 속성?', code: 'let d = { in: { v: 7 } }\nprint(d.in.____)', expect: '7', answer: 'v', hint: 'd.in.v' },
      { label: '별칭 변경', ask: 'b는 a와 같은 객체. b.v를 9로 바꾸면 a.v는? 빈칸에 b', code: 'let a = { v: 1 }\nlet b = a\n____.v = 9\nprint(a.v)', expect: '9', answer: 'b', hint: '같은 객체' },
      { label: '이름', ask: 'c.name이 "민지"가 되게.', code: 'let c = { name: "____" }\nprint(c.name)', expect: '"민지"', answer: '민지', hint: '따옴표 안에' },
    ],
  }

  // ── 🧠 M5 값 전달(passval) : 여러 상황에서 원본 안전 ──
  N['passval'] = {
    pattern: '🟡 보통 · 곱·빼기·문자·불리언을 넘겨도 원본 안전',
    problems: [
      { label: '곱해도 안전', ask: 'f는 받은 값을 2배로. a(5)는? 빈칸에 2를 넣고 ▶확인', code: 'function f(n) { n = n * ____ }\nlet a = 5\nf(a)\nprint(a)', expect: '5', answer: '2', hint: '원본 안전' },
      { label: '리셋해도 안전', ask: 'reset은 받은 값을 0으로. s(100)는? 빈칸에 0을 넣고 ▶확인', code: 'function reset(x) { x = ____ }\nlet s = 100\nreset(s)\nprint(s)', expect: '100', answer: '0', hint: '원본 안전' },
      { label: '더해도 안전', ask: 'g는 받은 값에 5를 더한다. n(10)는? 빈칸에 5를 넣고 ▶확인', code: 'function g(v) { v = v + ____ }\nlet n = 10\ng(n)\nprint(n)', expect: '10', answer: '5', hint: '복사본만 바뀜' },
      { label: '글자도 안전', ask: 'clr은 받은 글자를 바꾼다. name("민지")은? 빈칸에 아무 글자를 넣고 ▶확인', code: 'function clr(s) { s = "____" }\nlet name = "민지"\nclr(name)\nprint(name)', expect: '"민지"', answer: 'x', hint: '원본 안전' },
      { label: '불리언도 안전', ask: 'h는 받은 값을 false로. flag(true)는? 빈칸에 false를 넣고 ▶확인', code: 'function h(b) { b = ____ }\nlet flag = true\nh(flag)\nprint(flag)', expect: 'true', answer: 'false', hint: '원본 안전' },
    ],
  }

  // ── 🧠 M6 참조 전달(passobj) : 여러 속성 변경 ──
  N['passobj'] = {
    pattern: '🟡 보통 · 그 객체를 넘겨 여러 속성을 바꾼다',
    problems: [
      { label: 'n 설정', ask: 'f는 받은 것의 n을 5로. a.n도 바뀌게 하려면?', code: 'function f(o) { o.n = 5 }\nlet a = { n: 0 }\nf(____)\nprint(a.n)', expect: '5', answer: 'a', hint: 'a를 넘긴다' },
      { label: '이름', ask: 'setName은 받은 것 이름을 바꾼다. p.name도 바뀌게 하려면?', code: 'function setName(u) { u.name = "지훈" }\nlet p = { name: "x" }\nsetName(____)\nprint(p.name)', expect: '"지훈"', answer: 'p', hint: 'p를 넘긴다' },
      { label: '회복', ask: 'heal은 받은 것 hp를 100으로. e.hp도 바뀌게 하려면?', code: 'function heal(c) { c.hp = 100 }\nlet e = { hp: 1 }\nheal(____)\nprint(e.hp)', expect: '100', answer: 'e', hint: 'e를 넘긴다' },
      { label: '완료', ask: 'fin은 받은 것 done을 true로. task.done도 바뀌게 하려면?', code: 'function fin(t) { t.done = true }\nlet task = { done: false }\nfin(____)\nprint(task.done)', expect: 'true', answer: 'task', hint: 'task를 넘긴다' },
      { label: '증가', ask: 'add는 받은 것 x를 +1. d.x가 10이 되게 하려면?', code: 'function add(o) { o.x = o.x + 1 }\nlet d = { x: 9 }\nadd(____)\nprint(d.x)', expect: '10', answer: 'd', hint: 'd를 넘긴다' },
    ],
  }

  // ── 🧠 M7 배열 전달(passarr) : 여러 조작 ──
  N['passarr'] = {
    pattern: '🟡 보통 · 그 배열을 넘겨 push·수정·비우기',
    problems: [
      { label: '빈 배열에 push', ask: 'add는 받은 배열에 9를 push. a[0]이 9가 되게 하려면?', code: 'function add(l) { l.push(9) }\nlet a = []\nadd(____)\nprint(a[0])', expect: '9', answer: 'a', hint: 'a를 넘긴다' },
      { label: '비우기', ask: 'clr은 받은 배열을 비운다. items가 비게 하려면?', code: 'function clr(a) { a.length = 0 }\nlet items = [1, 2]\nclr(____)\nprint(items.length)', expect: '0', answer: 'items', hint: 'items를 넘긴다' },
      { label: '0번 수정', ask: 'set0은 받은 배열 0번을 7로. arr[0]이 바뀌게 하려면?', code: 'function set0(a) { a[0] = 7 }\nlet arr = [1, 2]\nset0(____)\nprint(arr[0])', expect: '7', answer: 'arr', hint: 'arr을 넘긴다' },
      { label: '항목 추가', ask: 'grow는 받은 배열에 항목을 더한다. cart가 늘어나게 하려면?', code: 'function grow(l) { l.push("새") }\nlet cart = ["빵"]\ngrow(____)\nprint(cart.length)', expect: '2', answer: 'cart', hint: 'cart를 넘긴다' },
      { label: '두 번 push', ask: 'fill은 받은 배열에 둘을 push. n의 개수가 2가 되게 하려면?', code: 'function fill(a) { a.push(1); a.push(2) }\nlet n = []\nfill(____)\nprint(n.length)', expect: '2', answer: 'n', hint: 'n을 넘긴다' },
    ],
  }
})()
