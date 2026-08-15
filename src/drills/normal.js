// 🟡 보통 드릴 — 변형·조합(한 겹 더). 같은 개념을 살짝 다른 맥락에. (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것. 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const N = window.Drills.normal

  // ── 1강 · 값과 타입 : 여러 단계·형 결합을 예측 ──
  N['1'] = {
    pattern: '🟡 보통 · 두 단계 계산·타입 결합을 예측',
    problems: [
      { label: '두 단계', ask: '1에서 +1 한 뒤 ×3 하면?', code: 'let x = 1\nx = x + 1\nx = x * 3\nprint(x === ____)', expect: 'true', answer: '6', hint: '2 × 3' },
      { label: '식의 타입', ask: '10 + 5 의 타입 이름은?', code: 'print((typeof (10 + 5)) === "____")', expect: 'true', answer: 'number', hint: '숫자끼리 → number' },
      { label: '섞인 타입', ask: '1 + "2" 의 타입 이름은? (숫자와 글자를 더하면)', code: 'print((typeof (1 + "2")) === "____")', expect: 'true', answer: 'string', hint: '글자로 끌려간다' },
      { label: '복사 후 원본 변경', ask: 'a를 복사해 b를 만든 뒤 a에만 +5. b는?', code: 'let a = 10\nlet b = a\na = a + 5\nprint(b === ____)', expect: 'true', answer: '10', hint: 'b는 복사본 → 그대로' },
      { label: '+ 강제 변환', ask: '"5" + 3 의 결과는? (+는 함정)', code: 'print(("5" + 3) === "____")', expect: 'true', answer: '53', hint: '글자 이어붙이기 → "53"' },
    ],
  }

  // ── 2강 · 계산과 문자열 : 왼쪽부터 결합·문자열 메서드 예측 ──
  N['2'] = {
    pattern: '🟡 보통 · 왼쪽부터 결합·length·템플릿 계산·대문자 예측',
    problems: [
      { label: '왼쪽부터', ask: '1 + 2 + "3" 는? (왼쪽부터 접힌다)', code: 'print((1 + 2 + "3") === "____")', expect: 'true', answer: '33', hint: '1+2=3 → 3+"3"="33"' },
      { label: '첫 만남이 글자', ask: '"3" + 2 + 1 는? (첫 만남이 글자면)', code: 'print(("3" + 2 + 1) === "____")', expect: 'true', answer: '321', hint: '"3"+2="32", +1="321"' },
      { label: '글자 수', ask: '"abc" 의 글자 수는?', code: 'print(("abc".length) === ____)', expect: 'true', answer: '3', hint: '.length' },
      { label: '템플릿 계산', ask: 'a=2, b=3일 때 `합 ${a + b}` 은?', code: 'let a = 2\nlet b = 3\nprint((`합 ${a + b}`) === "____")', expect: 'true', answer: '합 5', hint: '${a+b}=5' },
      { label: '대문자', ask: '"hi".toUpperCase() 는?', code: 'print(("hi".toUpperCase()) === "____")', expect: 'true', answer: 'HI', hint: '전부 대문자' },
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

  // ── 4강 · 조건 : truthy/falsy를 스스로 예측 (비어 보여도 '있는 것'?) ──
  N['4'] = {
    pattern: '🟡 보통 · Boolean(값)의 결과를 예측 — "비어 보이는 것"의 함정',
    problems: [
      { label: 'Boolean(0)', ask: '숫자 0을 Boolean()에 넣으면 참일까 거짓일까?', code: 'print(Boolean(0) === ____)', expect: 'true', answer: 'false', hint: '0은 falsy → false' },
      { label: 'Boolean("")', ask: '빈 문자열 "" 은?', code: 'print(Boolean("") === ____)', expect: 'true', answer: 'false', hint: '빈 글자는 falsy' },
      { label: 'Boolean([])', ask: '빈 배열 [] 은? (비어 보이지만 "객체"다)', code: 'print(Boolean([]) === ____)', expect: 'true', answer: 'true', hint: '빈 배열도 truthy — 함정' },
      { label: 'Boolean("false")', ask: '글자 "false" 는? (진짜 false 가 아니라 5글자 문자열)', code: 'print(Boolean("false") === ____)', expect: 'true', answer: 'true', hint: '따옴표 친 글자는 truthy' },
      { label: 'Boolean(" ")', ask: '공백 한 칸 " " 은? (눈엔 비어 보인다)', code: 'print(Boolean(" ") === ____)', expect: 'true', answer: 'true', hint: '공백도 글자 1개 → truthy' },
    ],
  }

  // ── 5강 · 함수 : 중첩 호출·화살표·조건 반환·전역 참조 예측 ──
  N['5'] = {
    pattern: '🟡 보통 · 중첩 호출·화살표·조건 반환·전역 참조 결과 예측',
    problems: [
      { label: '중첩 호출', ask: 'twice는 2배. twice(twice(3))은?', code: 'function twice(n) { return n * 2 }\nprint(twice(twice(3)) === ____)', expect: 'true', answer: '12', hint: '3→6→12' },
      { label: '화살표', ask: '화살표 함수 dbl. dbl(6)은?', code: 'const dbl = n => n * 2\nprint(dbl(6) === ____)', expect: 'true', answer: '12', hint: '6 × 2' },
      { label: '세금 계산', ask: 'tax는 10%를 더한다. tax(100)은?', code: 'function tax(p) { return p + p * 0.1 }\nprint(tax(100) === ____)', expect: 'true', answer: '110', hint: '100 + 10' },
      { label: '조건 반환', ask: 'sign은 양수면 "+", 아니면 "-". sign(-2)는?', code: 'function sign(n) { return n > 0 ? "+" : "-" }\nprint(sign(-2) === "____")', expect: 'true', answer: '-', hint: '-2는 양수 아님' },
      { label: '전역 참조', ask: 'base=10을 더하는 함수. addBase(5)는?', code: 'let base = 10\nfunction addBase(n) { return n + base }\nprint(addBase(5) === ____)', expect: 'true', answer: '15', hint: '5 + 10' },
    ],
  }

  // ── 6강 · 배열 : 두 단계 조작·메서드 결과 예측 ──
  N['6'] = {
    pattern: '🟡 보통 · 칸 바꾸기·여러 push·includes/indexOf 결과 예측',
    problems: [
      { label: '바꾼 뒤 합', ask: '0번을 9로 바꾼 뒤 a[0] + a[1] 은?', code: 'let a = [1, 2, 3]\na[0] = 9\nprint((a[0] + a[1]) === ____)', expect: 'true', answer: '11', hint: '9 + 2' },
      { label: 'push 둘', ask: '2개짜리 배열에 push(3, 4) 하면 개수는?', code: 'let a = [1, 2]\na.push(3, 4)\nprint(a.length === ____)', expect: 'true', answer: '4', hint: '한 번에 둘 → 2+2' },
      { label: 'includes', ask: '[1,2,3] 에 2가 들어 있는가?', code: 'print([1, 2, 3].includes(2) === ____)', expect: 'true', answer: 'true', hint: '있으면 true' },
      { label: 'indexOf', ask: '["a","b","c"] 에서 "c"의 위치(번호)는?', code: 'print(["a", "b", "c"].indexOf("c") === ____)', expect: 'true', answer: '2', hint: '0,1,2' },
      { label: 'pop', ask: '3개짜리에서 pop 하면 개수는?', code: 'let a = [1, 2, 3]\na.pop()\nprint(a.length === ____)', expect: 'true', answer: '2', hint: '하나 빠짐' },
    ],
  }

  // ── 7강 · 반복과 map : 원본 불변·짝수 개수·곱 누적·체이닝 예측 ──
  N['7'] = {
    pattern: '🟡 보통 · map은 원본 불변·짝수 개수·곱 누적·체이닝 결과 예측',
    problems: [
      { label: 'map은 원본 불변', ask: 'map은 원본을 안 바꾼다. map 후 원본 n의 개수는?', code: 'let n = [1, 2, 3]\nn.map(x => x * 2)\nprint(n.length === ____)', expect: 'true', answer: '3', hint: '새 배열을 만들 뿐' },
      { label: '짝수 개수', ask: '짝수만 거른 개수는?', code: 'print([1, 2, 3, 4, 5, 6].filter(x => x % 2 === 0).length === ____)', expect: 'true', answer: '3', hint: '2,4,6 → 3개' },
      { label: '곱 누적', ask: '곱을 누적하면? (시작 1)', code: 'print([2, 3, 4].reduce((a, b) => a * b, 1) === ____)', expect: 'true', answer: '24', hint: '2×3×4' },
      { label: '대문자 변환', ask: '각 글자를 대문자로 바꾼 배열의 첫 요소는?', code: 'print(["a", "b"].map(s => s.toUpperCase())[0] === "____")', expect: 'true', answer: 'A', hint: '"a" → "A"' },
      { label: '체이닝', ask: '1보다 큰 것만 걸러 2배 한 배열의 첫 요소는?', code: 'print([1, 2, 3].filter(x => x > 1).map(x => x * 2)[0] === ____)', expect: 'true', answer: '4', hint: '[2,3]→[4,6]→첫째 4' },
    ],
  }

  // ── 8강 · 객체 : 중첩·배열 안 객체·대괄호·조합 결과를 예측 ──
  N['8'] = {
    pattern: '🟡 보통 · 중첩·배열 안 객체·대괄호·속성 조합의 결과를 예측',
    problems: [
      { label: '중첩', ask: 'me.pet.name 은?', code: 'let me = { pet: { name: "콩이" } }\nprint(me.pet.name === "____")', expect: 'true', answer: '콩이', hint: '안쪽 name' },
      { label: '배열 안 객체', ask: 'users[1].name 은?', code: 'let users = [{ name: "민지" }, { name: "지훈" }]\nprint(users[1].name === "____")', expect: 'true', answer: '지훈', hint: '두 번째 사람' },
      { label: '대괄호(공백 키)', ask: 'o["my key"] 는?', code: 'let o = { "my key": 7 }\nprint(o["my key"] === ____)', expect: 'true', answer: '7', hint: '대괄호로 접근' },
      { label: '속성 조합', ask: '이름과 나이를 이으면? name(age)', code: 'let p = { name: "민지", age: 24 }\nprint((p.name + "(" + p.age + ")") === "____")', expect: 'true', answer: '민지(24)', hint: '이어붙이기' },
      { label: '키 개수', ask: '객체의 키(속성) 개수는?', code: 'let o = { a: 1, b: 2 }\nprint(Object.keys(o).length === ____)', expect: 'true', answer: '2', hint: 'a, b → 2개' },
    ],
  }

  // ── 9강 · DOM : tagName·숫자 강제·클릭 결과를 예측 ──
  N['9'] = {
    pattern: '🟡 보통 · tagName(대문자)·숫자→문자·클릭 횟수 결과를 예측',
    problems: [
      { label: '태그 이름', ask: 'button으로 만든 요소의 tagName 은? (대문자!)', code: 'let el = document.createElement("button")\nprint(el.tagName === "____")', expect: 'true', answer: 'BUTTON', hint: 'tagName은 항상 대문자' },
      { label: '숫자→문자', ask: 'textContent에 숫자를 넣으면? (문자가 된다)', code: 'let el = document.createElement("div")\nel.textContent = 90 + ""\nprint(el.textContent === "____")', expect: 'true', answer: '90', hint: '숫자 90 → 문자 "90"' },
      { label: '클릭', ask: '한 번 클릭하면 n은?', code: 'let n = 0\nlet b = document.createElement("button")\nb.addEventListener("click", () => n = 1)\nb.click()\nprint(n === ____)', expect: 'true', answer: '1', hint: '리스너가 1로' },
      { label: '두 번 클릭', ask: '두 번 클릭하면 n은?', code: 'let n = 0\nlet b = document.createElement("button")\nb.addEventListener("click", () => n++)\nb.click()\nb.click()\nprint(n === ____)', expect: 'true', answer: '2', hint: '매번 +1' },
      { label: '둘 붙이기', ask: 'span 둘을 붙이면 자식 개수는?', code: 'let box2 = document.createElement("div")\nbox2.append(document.createElement("span"), document.createElement("span"))\nprint(box2.children.length === ____)', expect: 'true', answer: '2', hint: '둘 붙임' },
    ],
  }

  // ── 10강 · 실전 캡스톤 : 조건·map·이벤트·객체배열·reduce ──
  N['10'] = {
    pattern: '🟡 보통 · 조건·map·이벤트·객체 배열·reduce 결과를 예측',
    problems: [
      { label: '조건', ask: '나이 15일 때 등급은? (19세 이상이면 "성인")', code: 'let age = 15\nprint((age >= 19 ? "성인" : "청소년") === "____")', expect: 'true', answer: '청소년', hint: '15 < 19 → else' },
      { label: 'map 변환', ask: '나이를 1씩 올린 배열의 두 번째는?', code: 'let ages = [10, 20]\nprint(ages.map(a => a + 1)[1] === ____)', expect: 'true', answer: '21', hint: '20 + 1' },
      { label: '이벤트', ask: '한 번 클릭하면 clicked는?', code: 'let clicked = 0\nlet b = document.createElement("button")\nb.addEventListener("click", () => clicked++)\nb.click()\nprint(clicked === ____)', expect: 'true', answer: '1', hint: '+1' },
      { label: '객체 배열', ask: '목록 첫 사람의 name 은?', code: 'let ppl = [{ name: "민지" }, { name: "지훈" }]\nprint(ppl[0].name === "____")', expect: 'true', answer: '민지', hint: 'ppl[0].name' },
      { label: 'reduce 합', ask: '두 값을 다 더하면?', code: 'let a = [10, 20]\nprint(a.reduce((s, x) => s + x, 0) === ____)', expect: 'true', answer: '30', hint: '10 + 20' },
    ],
  }

  // ── 🧠 M1 램(ram) : 재할당 누적·typeof·복사 후 원본 예측 ──
  N['ram'] = {
    pattern: '🟡 보통 · 재할당 누적·여러 타입·복사 후 원본 예측',
    problems: [
      { label: '두 단계', ask: '1에서 +1 한 뒤 ×3 하면?', code: 'let x = 1\nx = x + 1\nx = x * 3\nprint(x === ____)', expect: 'true', answer: '6', hint: '2 × 3' },
      { label: '원본은 그대로', ask: 'a=7, b=a 뒤 a=0 하면 b는?', code: 'let a = 7\nlet b = a\na = 0\nprint(b === ____)', expect: 'true', answer: '7', hint: 'b는 복사본 → 그대로' },
      { label: '참거짓 타입', ask: '참거짓 값의 타입 이름은?', code: 'print((typeof true) === "____")', expect: 'true', answer: 'boolean', hint: 'boolean' },
      { label: '미초기화', ask: '값을 안 넣은 x의 타입 이름은?', code: 'let x\nprint((typeof x) === "____")', expect: 'true', answer: 'undefined', hint: '선언만 = undefined' },
      { label: '재할당 타입변경', ask: 'v=1 이었다가 v="hi" 하면 typeof v는?', code: 'let v = 1\nv = "hi"\nprint((typeof v) === "____")', expect: 'true', answer: 'string', hint: '문자 담긴 v' },
    ],
  }

  // ── 🧠 M4-1 값=복사(ref) : 계산해 바꿔도 원본을 예측 ──
  N['ref'] = {
    pattern: '🟡 보통 · 계산·전달로 바꿔도 원시값 원본이 어떻게 되는지 예측',
    problems: [
      { label: '곱해 바꿔도?', ask: 'y=x 뒤 y=y*2 하면 x는?', code: 'let x = 3\nlet y = x\ny = y * 2\nprint(x === ____)', expect: 'true', answer: '3', hint: '복사라 x는 그대로' },
      { label: '빼서 바꿔도?', ask: 'b=a 뒤 b=b-30 하면 a는?', code: 'let a = 100\nlet b = a\nb = b - 30\nprint(a === ____)', expect: 'true', answer: '100', hint: 'a는 그대로' },
      { label: '함수에 넘겨도?', ask: '함수가 x=0 해도 원본 p는?', code: 'function f(x) { x = 0 }\nlet p = 5\nf(p)\nprint(p === ____)', expect: 'true', answer: '5', hint: '복사본만 바뀜' },
      { label: '둘 다 살아있음', ask: 'x=10, y=x, y=20 후 x + y 는?', code: 'let x = 10\nlet y = x\ny = 20\nprint((x + y) === ____)', expect: 'true', answer: '30', hint: '10 + 20' },
      { label: '문자 복사', ask: 's="a", t=s, t="b" 후 s + t 는?', code: 'let s = "a"\nlet t = s\nt = "b"\nprint((s + t) === "____")', expect: 'true', answer: 'ab', hint: 's는 "a" 그대로' },
    ],
  }

  // ── 🧠 M4-2 참조=공유(ref2) : 복사 vs 공유 대비·연결 끊김 ──
  N['ref2'] = {
    pattern: '🟡 보통 · 복사(원시)와 공유(객체)를 한 식에서 구분',
    problems: [
      { label: '복사는 그대로', ask: 'c는 a.n을 복사(원시값), b는 같은 객체. b.n=9 후 c는?', code: 'let a = { n: 1 }\nlet b = a\nlet c = a.n\nb.n = 9\nprint(c === ____)', expect: 'true', answer: '1', hint: 'c는 꺼낼 때 복사 → 1 그대로' },
      { label: '둘 다 바뀜', ask: 'a·b가 같은 객체. b.n=9 후 a.n + b.n 은?', code: 'let a = { n: 1 }\nlet b = a\nb.n = 9\nprint((a.n + b.n) === ____)', expect: 'true', answer: '18', hint: '둘 다 9 → 18' },
      { label: '두 번 push', ask: 'c는 arr과 같은 배열. 두 번 push하면 arr 개수는?', code: 'let arr = [1]\nlet c = arr\nc.push(2)\nc.push(3)\nprint(arr.length === ____)', expect: 'true', answer: '3', hint: '1 + 2번' },
      { label: '재할당은 끊는다', ask: 'b를 새 객체로 재할당하면 a.n은? (연결이 끊긴다)', code: 'let a = { n: 1 }\nlet b = a\nb = { n: 9 }\nprint(a.n === ____)', expect: 'true', answer: '1', hint: 'b가 다른 객체를 가리켜 a는 그대로' },
      { label: '중첩 공유', ask: 'p는 o와 같은 객체. p.list에 push하면 o.list 개수는?', code: 'let o = { list: [1, 2] }\nlet p = o\np.list.push(3)\nprint(o.list.length === ____)', expect: 'true', answer: '3', hint: '같은 객체 → 같은 list' },
    ],
  }

  // ── 🧠 M2 스택(stack) : 계산·조건·문자 반환값을 예측 ──
  N['stack'] = {
    pattern: '🟡 보통 · 계산·조건·문자 결합 반환값을 예측',
    problems: [
      { label: '곱 반환', ask: 'mul(3, 4)는?', code: 'function mul(a, b) { return a * b }\nprint(mul(3, 4) === ____)', expect: 'true', answer: '12', hint: '3 × 4' },
      { label: '뺄셈', ask: 'sub(10, 4)는?', code: 'function sub(a, b) { return a - b }\nprint(sub(10, 4) === ____)', expect: 'true', answer: '6', hint: '10 - 4' },
      { label: '조건 반환', ask: 'sign(-2)는? (양수면 "+", 아니면 "-")', code: 'function sign(n) { return n > 0 ? "+" : "-" }\nprint(sign(-2) === "____")', expect: 'true', answer: '-', hint: '-2는 양수 아님' },
      { label: '지역 계산', ask: 'f는 지역 x=5의 2배를 반환. f()는?', code: 'function f() { let x = 5; return x * 2 }\nprint(f() === ____)', expect: 'true', answer: '10', hint: '5 × 2' },
      { label: '문자 결합', ask: 'g("z")는? (return "hi " + n)', code: 'function g(n) { return "hi " + n }\nprint(g("z") === "____")', expect: 'true', answer: 'hi z', hint: '"hi " + "z"' },
    ],
  }

  // ── 🧠 M3 힙(heap) : 속성 추가·중첩·동적 키·배열 속 객체 예측 ──
  N['heap'] = {
    pattern: '🟡 보통 · 속성 추가·중첩·동적 키·배열 속 객체 결과 예측',
    problems: [
      { label: '속성 추가', ask: 'o.x 추가 후 o.x 는?', code: 'let o = {}\no.x = 5\nprint(o.x === ____)', expect: 'true', answer: '5', hint: '방금 넣은 값' },
      { label: '중첩', ask: 'd.in.v 는?', code: 'let d = { in: { v: 7 } }\nprint(d.in.v === ____)', expect: 'true', answer: '7', hint: '안쪽 v' },
      { label: '동적 키', ask: 'o[k]=100, k="score" 뒤 o.score 는?', code: 'let o = {}\nlet k = "score"\no[k] = 100\nprint(o.score === ____)', expect: 'true', answer: '100', hint: 'k가 "score"라 o.score' },
      { label: '배열 속 객체', ask: 'arr[0].v=9 후 arr[0].v 는?', code: 'let arr = [{ v: 1 }]\narr[0].v = 9\nprint(arr[0].v === ____)', expect: 'true', answer: '9', hint: '방금 바꾼 값' },
      { label: '객체 안 배열', ask: 'o.list.length 는? {list:[1,2,3]}', code: 'let o = { list: [1, 2, 3] }\nprint(o.list.length === ____)', expect: 'true', answer: '3', hint: '3개' },
    ],
  }

  // ── 🧠 M5 값 전달(passval) : 여러 상황에서 원본 안전 예측 ──
  N['passval'] = {
    pattern: '🟡 보통 · 곱·빼기·문자·불리언을 넘겨도 원본이 어떻게 되는지 예측',
    problems: [
      { label: '곱해도 안전', ask: 'f가 2배 해도 a는?', code: 'function f(n) { n = n * 2 }\nlet a = 5\nf(a)\nprint(a === ____)', expect: 'true', answer: '5', hint: '원본 안전' },
      { label: '리셋해도 안전', ask: 'reset이 0으로 해도 s는?', code: 'function reset(x) { x = 0 }\nlet s = 100\nreset(s)\nprint(s === ____)', expect: 'true', answer: '100', hint: '원본 안전' },
      { label: '더해도 안전', ask: 'g가 +5 해도 n은?', code: 'function g(v) { v = v + 5 }\nlet n = 10\ng(n)\nprint(n === ____)', expect: 'true', answer: '10', hint: '복사본만 바뀜' },
      { label: '글자도 안전', ask: 'clr이 글자 바꿔도 name은?', code: 'function clr(s) { s = "x" }\nlet name = "민지"\nclr(name)\nprint(name === "____")', expect: 'true', answer: '민지', hint: '원본 안전' },
      { label: '불리언도 안전', ask: 'h가 false로 해도 flag는?', code: 'function h(b) { b = false }\nlet flag = true\nh(flag)\nprint(flag === ____)', expect: 'true', answer: 'true', hint: '원본 안전' },
    ],
  }

  // ── 🧠 M6 참조 전달(passobj) : 여러 속성 변경 결과 예측 ──
  N['passobj'] = {
    pattern: '🟡 보통 · 객체를 넘겨 속성·중첩·배열·공유를 바꾸면 원본 예측',
    problems: [
      { label: 'n 설정', ask: 'f가 n=5로 하면 a.n은?', code: 'function f(o) { o.n = 5 }\nlet a = { n: 0 }\nf(a)\nprint(a.n === ____)', expect: 'true', answer: '5', hint: '같은 객체' },
      { label: '중첩 변경', ask: 'f가 pet.hp=0 하면 me.pet.hp는?', code: 'function f(o) { o.pet.hp = 0 }\nlet me = { pet: { hp: 9 } }\nf(me)\nprint(me.pet.hp === ____)', expect: 'true', answer: '0', hint: '중첩도 공유' },
      { label: '배열 속성', ask: 'f가 list.push 하면 d.list의 개수는?', code: 'function f(o) { o.list.push(9) }\nlet d = { list: [1] }\nf(d)\nprint(d.list.length === ____)', expect: 'true', answer: '2', hint: '같은 배열' },
      { label: '2배', ask: 'grow가 n을 2배로 하면 d.n은?', code: 'function grow(o) { o.n = o.n * 2 }\nlet d = { n: 5 }\ngrow(d)\nprint(d.n === ____)', expect: 'true', answer: '10', hint: '5 × 2' },
      { label: '공유 참조', ask: 'f(a)가 a.v=1로. b는 a의 별칭. b.v는?', code: 'function f(o) { o.v = 1 }\nlet a = { v: 0 }\nlet b = a\nf(a)\nprint(b.v === ____)', expect: 'true', answer: '1', hint: 'a·b 같은 객체' },
    ],
  }

  // ── 🧠 M7 배열 전달(passarr) : push·수정·비우기 결과 예측 ──
  N['passarr'] = {
    pattern: '🟡 보통 · 배열을 넘겨 push·수정·비우기 하면 원본 예측',
    problems: [
      { label: '빈 배열에 push', ask: 'add(a) 후 a[0]은?', code: 'function add(l) { l.push(9) }\nlet a = []\nadd(a)\nprint(a[0] === ____)', expect: 'true', answer: '9', hint: '같은 배열' },
      { label: '비우기', ask: 'clr 후 items의 개수는?', code: 'function clr(a) { a.length = 0 }\nlet items = [1, 2]\nclr(items)\nprint(items.length === ____)', expect: 'true', answer: '0', hint: '같은 배열' },
      { label: '0번 수정', ask: 'set0 후 arr[0]은?', code: 'function set0(a) { a[0] = 7 }\nlet arr = [1, 2]\nset0(arr)\nprint(arr[0] === ____)', expect: 'true', answer: '7', hint: '같은 배열' },
      { label: '항목 추가', ask: 'grow 후 cart의 개수는?', code: 'function grow(l) { l.push("새") }\nlet cart = ["빵"]\ngrow(cart)\nprint(cart.length === ____)', expect: 'true', answer: '2', hint: '같은 배열' },
      { label: '두 번 push', ask: 'fill 후 n의 개수는?', code: 'function fill(a) { a.push(1); a.push(2) }\nlet n = []\nfill(n)\nprint(n.length === ____)', expect: 'true', answer: '2', hint: '둘 push' },
    ],
  }

  // ── 🕸️ G1 그래프(graph) : 더 긴 경로·별칭 경로 ──
  N['graph'] = {
    pattern: '🟡 보통 · 더 긴 화살표 경로·별칭 경로로 변경',
    problems: [
      { label: '두 단계', ask: 'a.b.c(5)를 꺼내려면 마지막 속성?', code: 'let a = { b: { c: 5 } }\nprint(a.b.____)', expect: '5', answer: 'c', hint: 'a.b.c' },
      { label: '세 단계', ask: 'p.next.next.v(9)를 꺼내려면 마지막 속성?', code: 'let p = { next: { next: { v: 9 } } }\nprint(p.next.next.____)', expect: '9', answer: 'v', hint: 'p.next.next.v' },
      { label: '경로로 변경', ask: 'y.ref는 x. y.ref.n을 7로 바꾸면 x.n은? 빈칸에 y.ref', code: 'let x = { n: 1 }\nlet y = { ref: x }\n____.n = 7\nprint(x.n)', expect: '7', answer: 'y.ref', hint: 'y.ref = x' },
      { label: '리더 이름', ask: 't.leader(=p)의 이름을 꺼내려면?', code: 'let p = { name: "김" }\nlet t = { leader: p }\nprint(t.leader.____)', expect: '"김"', answer: 'name', hint: '.name' },
      { label: '링크 값', ask: 'g.link.val(3)을 꺼내려면 마지막 속성?', code: 'let g = { link: { val: 3 } }\nprint(g.link.____)', expect: '3', answer: 'val', hint: 'g.link.val' },
    ],
  }

  // ── 🕸️ G2 친구 목록(friends) : 배열 속 객체 변형 ──
  N['friends'] = {
    pattern: '🟡 보통 · 배열 속 객체 별칭·인덱스 변형',
    problems: [
      { label: '두 번째 n', ask: 'ppl[1].n(2)을 꺼내려면 어떤 속성?', code: 'let ppl = [{ n: 1 }, { n: 2 }]\nprint(ppl[1].____)', expect: '2', answer: 'n', hint: 'ppl[1].n' },
      { label: '이름', ask: 'list[0]의 이름("가")을 꺼내려면?', code: 'let list = [{ name: "가" }]\nprint(list[0].____)', expect: '"가"', answer: 'name', hint: 'list[0].name' },
      { label: '배열 별칭', ask: 'arr[0]은 m과 같은 객체. arr[0].hp를 0으로 하면 m.hp는? 빈칸에 arr[0]', code: 'let m = { hp: 9 }\nlet arr = [m]\n____.hp = 0\nprint(m.hp)', expect: '0', answer: 'arr[0]', hint: 'arr[0] = m' },
      { label: '첫 id', ask: 'u[0]의 id(5)를 꺼내려면?', code: 'let u = [{ id: 5 }, { id: 6 }]\nprint(u[0].____)', expect: '5', answer: 'id', hint: 'u[0].id' },
      { label: '두 번째 item', ask: 'c[1]의 item("우유")을 꺼내려면?', code: 'let c = [{ item: "빵" }, { item: "우유" }]\nprint(c[1].____)', expect: '"우유"', answer: 'item', hint: 'c[1].item' },
    ],
  }

  // ── 🕸️ G3 계통도(family) : 좌우·중첩 경로 ──
  N['family'] = {
    pattern: '🟡 보통 · 좌우 자식·중첩 트리 경로',
    problems: [
      { label: '엄마 이름', ask: 'me.mom의 이름("엄마")을 꺼내려면?', code: 'let me = { mom: { name: "엄마" } }\nprint(me.mom.____)', expect: '"엄마"', answer: 'name', hint: 'me.mom.name' },
      { label: '왼쪽', ask: 'r.left.val(5)에 닿으려면 r 다음 어떤 속성?', code: 'let r = { left: { val: 5 } }\nprint(r.____.val)', expect: '5', answer: 'left', hint: 'r.left.val' },
      { label: '손자', ask: '2대 아래 손자 이름을 꺼내려면 마지막 속성?', code: 'let a = { child: { child: { name: "손자" } } }\nprint(a.child.child.____)', expect: '"손자"', answer: 'name', hint: '.name' },
      { label: '오른쪽', ask: 'r.right.val(8)을 꺼내려면 마지막 속성?', code: 'let r = { right: { val: 8 } }\nprint(r.right.____)', expect: '8', answer: 'val', hint: 'r.right.val' },
      { label: '노드 데이터', ask: 't.node.data(3)를 꺼내려면 마지막 속성?', code: 'let t = { node: { data: 3 } }\nprint(t.node.____)', expect: '3', answer: 'data', hint: 't.node.data' },
    ],
  }

  // ── 🕸️ G4 순환(cycle) : 두 단계 순환 경로 ──
  N['cycle'] = {
    pattern: '🟡 보통 · 순환 관계에서 한두 단계 경로',
    problems: [
      { label: 'a.to.v', ask: 'a.to(=b)의 v(5)를 꺼내려면?', code: 'let a = {}\nlet b = {}\na.to = b\nb.v = 5\nprint(a.to.____)', expect: '5', answer: 'v', hint: 'a.to = b' },
      { label: 'x.p.id', ask: 'x.p(=y)의 id(2)를 꺼내려면?', code: 'let x = { id: 1 }\nlet y = { id: 2 }\nx.p = y\nprint(x.p.____)', expect: '2', answer: 'id', hint: 'x.p = y' },
      { label: '자기 순환', ask: 'n.self(=자기)의 v(7)를 꺼내려면?', code: 'let n = {}\nn.self = n\nn.v = 7\nprint(n.self.____)', expect: '7', answer: 'v', hint: 'self = n' },
      { label: 'b.back.n', ask: 'b.back(=a)의 n(3)을 꺼내려면?', code: 'let a = { n: 3 }\nlet b = { back: a }\nprint(b.back.____)', expect: '3', answer: 'n', hint: 'b.back = a' },
      { label: 'p.q.name', ask: 'p.q(=q)의 name("큐")을 꺼내려면?', code: 'let p = {}\nlet q = { name: "큐" }\np.q = q\nprint(p.q.____)', expect: '"큐"', answer: 'name', hint: 'p.q = q' },
    ],
  }

  // ── 🧠 콜 스택(callstack) : 3중 사슬·인수 전달 ──
  N['callstack'] = {
    pattern: '🟡 보통 · 3중 호출 사슬·인수 전달·중첩 호출',
    problems: [
      { label: '3중 사슬', ask: 'a→b→c로 이어진다. a()가 9가 되려면 c는?', code: 'function a() { return b() }\nfunction b() { return c() }\nfunction c() { return ____ }\nprint(a())', expect: '9', answer: '9', hint: 'c가 9' },
      { label: '곱 사슬', ask: 'a는 b()의 3배. a()가 6이 되려면 b는?', code: 'function a() { return b() * 3 }\nfunction b() { return ____ }\nprint(a())', expect: '6', answer: '2', hint: '6의 1/3' },
      { label: '뺄셈 사슬', ask: 'a는 b()-1. a()가 9가 되려면 b는?', code: 'function a() { return b() - 1 }\nfunction b() { return ____ }\nprint(a())', expect: '9', answer: '10', hint: '9 + 1' },
      { label: '인수 전달', ask: 'a(3)이 b로 3을 넘긴다. 6이 되려면 b는 몇 배?', code: 'function a(n) { return b(n) }\nfunction b(n) { return n * ____ }\nprint(a(3))', expect: '6', answer: '2', hint: '3 * 2' },
      { label: '중첩 호출', ask: 'inc는 +1. inc(inc(?))가 5가 되려면 안쪽 인수는?', code: 'function inc(n) { return n + 1 }\nprint(inc(inc(____)))', expect: '5', answer: '3', hint: '3→4→5' },
    ],
  }

  // ── 🧠 클로저(closure) : 인수 팩토리·2회 카운트 ──
  N['closure'] = {
    pattern: '🟡 보통 · 인수를 붙잡는 팩토리·2회 카운터',
    problems: [
      { label: '붙잡아 더하기', ask: 'v(3)를 붙잡아 7을 돌려주게 하려면 뭘 더할까?', code: 'function make() { let v = 3; return function () { return v + ____ } }\nlet f = make()\nprint(f())', expect: '7', answer: '4', hint: '3 + 4' },
      { label: '카운터 2번', ask: 'next()를 두 번 불러 2가 나오게 매번 얼마씩?', code: 'function c() { let n = 0; return function () { n = n + ____; return n } }\nlet next = c()\nnext()\nprint(next())', expect: '2', answer: '1', hint: '1,2' },
      { label: '곱 팩토리', ask: 'mk(5)가 붙잡은 5로 10을 돌려주게 몇을 곱할까?', code: 'function mk(x) { return function () { return x * ____ } }\nlet f = mk(5)\nprint(f())', expect: '10', answer: '2', hint: '5 * 2' },
      { label: '인사말 팩토리', ask: 'greeter("z")가 "hi z"를 돌려주게 — 붙잡은 name을 붙여라.', code: 'function greeter(name) { return function () { return "hi " + ____ } }\nlet g = greeter("z")\nprint(g())', expect: '"hi z"', answer: 'name', hint: '"hi " + name' },
      { label: '잔액', ask: 'm(100)을 붙잡아 60을 돌려주게 얼마를 뺄까?', code: 'function bank() { let m = 100; return function () { return m - ____ } }\nlet b = bank()\nprint(b())', expect: '60', answer: '40', hint: '100 - 40' },
    ],
  }

  // ── 🧠 가비지 컬렉션(gc) : 남은 참조로 접근 ──
  N['gc'] = {
    pattern: '🟡 보통 · 한 참조를 끊어도 남은 참조로 객체는 산다',
    problems: [
      { label: '남은 참조', ask: 'a=null이어도 b가 가리켜 산다. b로 n(1)을 꺼내려면?', code: 'let a = { n: 1 }\nlet b = a\na = null\nprint(b.____)', expect: '1', answer: 'n', hint: 'b.n' },
      { label: '고아 만들기', ask: 'x가 가리키던 객체를 고아로 만들려면 뭘 담을까?', code: 'let x = { big: "d" }\nx = ____\nprint(x)', expect: 'null', answer: 'null', hint: 'null' },
      { label: '배열 살아있음', ask: 'o=null이어도 r이 가리켜 산다. r.list의 개수(1)를 꺼내려면?', code: 'let o = { list: [1] }\nlet r = o\no = null\nprint(r.list.____)', expect: '1', answer: 'length', hint: 'r.list.length' },
      { label: '지켜둔 참조', ask: 'data=null이어도 keep이 가리켜 산다. keep.v(5)를 꺼내려면?', code: 'let data = { v: 5 }\nlet keep = data\ndata = null\nprint(keep.____)', expect: '5', answer: 'v', hint: 'keep.v' },
      { label: '노드 비우기', ask: 'node를 GC 대상으로 만들려면 뭘 담을까?', code: 'let node = { v: 7 }\nnode = ____\nprint(node)', expect: 'null', answer: 'null', hint: 'null' },
    ],
  }

  // ── 🧬 클래스(class) : 메서드·this·여러 인수·조건 메서드 결과 예측 ──
  N['class'] = {
    pattern: '🟡 보통 · 메서드·this로 자기 속성·여러 인수·조건 메서드 결과 예측',
    problems: [
      { label: 'this 쓰는 메서드', ask: 'new P("z").hi() 는? (hi는 "hi "+this.name 반환)', code: 'class P { constructor(n) { this.name = n } hi() { return "hi " + this.name } }\nprint(new P("z").hi() === "____")', expect: 'true', answer: 'hi z', hint: '"hi " + "z"' },
      { label: '속성 변경', ask: '바꾼 뒤 c.hp 는?', code: 'class C { constructor() { this.hp = 100 } }\nlet c = new C()\nc.hp = 50\nprint(c.hp === ____)', expect: 'true', answer: '50', hint: '방금 넣은 값' },
      { label: '두 인수', ask: 'new Pt(2, 3).y 는?', code: 'class Pt { constructor(x, y) { this.x = x; this.y = y } }\nprint(new Pt(2, 3).y === ____)', expect: 'true', answer: '3', hint: '두 번째 인수' },
      { label: '계산 메서드', ask: 'new Box(5).dbl() 는? (dbl은 n×2)', code: 'class Box { constructor(n) { this.n = n } dbl() { return this.n * 2 } }\nprint(new Box(5).dbl() === ____)', expect: 'true', answer: '10', hint: '5 × 2' },
      { label: '조건 메서드', ask: '나이 15일 때 grade() 는? (19세 이상이면 "성인")', code: 'class P { constructor(a) { this.age = a } grade() { return this.age >= 19 ? "성인" : "청소년" } }\nprint(new P(15).grade() === "____")', expect: 'true', answer: '청소년', hint: '15 < 19' },
    ],
  }
})()
