// 🔴 어려움 드릴 — 응용·전이(경계·함정·다개념 결합). (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것. 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const H = window.Drills.hard

  // ── 1강 · 값과 타입, 변수 : typeof 경계·형 결합 ──
  H['1'] = {
    pattern: '🔴 어려움 · typeof 여러 타입·형 결합·미초기화',
    problems: [
      { label: 'typeof 문자', ask: '결과가 "string"이 나오게 — 어떤 값을?', code: 'print(typeof ____)', expect: '"string"', answer: '"hi"', hint: '따옴표 친 글자' },
      { label: 'typeof 불리언', ask: '결과가 "boolean"이 나오게 — 어떤 값을?', code: 'print(typeof ____)', expect: '"boolean"', answer: 'true', hint: 'true / false' },
      { label: '미초기화', ask: '값을 안 넣은 변수 x의 타입은 "undefined". 빈칸에 x', code: 'let x\nprint(typeof ____)', expect: '"undefined"', answer: 'x', hint: '선언만 하면 undefined' },
      { label: '문자+숫자', ask: '숫자 n을 이어붙여 "n=3"이 나오게 — 무엇을 더할까?', code: 'let n = 3\nprint("n=" + ____)', expect: '"n=3"', answer: 'n', hint: '문자열 + 숫자 → 문자열' },
      { label: '재할당 타입변경', ask: 'v에 글자를 담아 typeof가 "string"이 되게.', code: 'let v = 10\nv = "____"\nprint(typeof v)', expect: '"string"', answer: '글', hint: '따옴표 안 아무 글자' },
    ],
  }

  // ── 2강 · 계산과 문자열 : 템플릿 속 계산·형변환·메서드 ──
  H['2'] = {
    pattern: '🔴 어려움 · 템플릿 속 계산·문자열 메서드·형 결합',
    problems: [
      { label: '템플릿 속 계산', ask: '"합 5"가 나오게 — a에 무엇을 더할까?', code: 'let a = 2\nlet b = 3\nprint(`합 ${a + ____}`)', expect: '"합 5"', answer: 'b', hint: 'a + b = 5' },
      { label: '문자열 + 숫자', ask: '"점수 90"이 나오게 숫자를 이어붙여라.', code: 'print("점수 " + ____)', expect: '"점수 90"', answer: '90', hint: '문자 + 숫자 → 문자' },
      { label: '가격 계산', ask: '"3000원"이 나오게 — p에 무엇을 곱할까?', code: 'let p = 1000\nprint(`${p * ____}원`)', expect: '"3000원"', answer: '3', hint: '1000 * 3' },
      { label: '글자 수', ask: '"abc"의 글자 수 3을 구하려면?', code: 'print("abc".____)', expect: '3', answer: 'length', hint: '문자열도 .length' },
      { label: '대문자', ask: '"hi"를 "HI"로 바꾸려면 무슨 메서드?', code: 'print("hi".____())', expect: '"HI"', answer: 'toUpperCase', hint: '대문자 = toUpperCase' },
    ],
  }

  // ── 3강 · 표현식 : 지수·왼쪽부터·강제변환·비교 체인 ──
  H['3'] = {
    pattern: '🔴 어려움 · 지수·왼쪽부터 결합·강제 형변환·비교 체인',
    problems: [
      { label: '지수', ask: '2 ** 3 은? (2의 3제곱)', code: 'print((2 ** 3) === ____)', expect: 'true', answer: '8', hint: '2*2*2' },
      { label: '왼쪽부터 결합', ask: '1 + 2 + "3" 은? (왼쪽부터: 3, 그다음 문자 이어붙이기)', code: 'print((1 + 2 + "3") === ____)', expect: 'true', answer: '"33"', hint: '1+2=3 → 3+"3"="33"' },
      { label: '문자 - 숫자', ask: '"5" - 1 은? (빼기는 숫자로 강제 변환)', code: 'print(("5" - 1) === ____)', expect: 'true', answer: '4', hint: '"5"가 숫자 5로 → 5-1' },
      { label: 'true + 1', ask: 'true + 1 은? (true는 1로)', code: 'print((true + 1) === ____)', expect: 'true', answer: '2', hint: 'true → 1' },
      { label: '비교 체인', ask: '10 > 5 === true 는? (> 가 === 보다 먼저)', code: 'print((10 > 5 === true) === ____)', expect: 'true', answer: 'true', hint: '10>5=true, true===true' },
    ],
  }

  // ── 4강 · 조건 : && · || · 삼항 · 단축평가 ──
  H['4'] = {
    pattern: '🔴 어려움 · &&·||·삼항·단축평가(기본값)',
    problems: [
      { label: 'AND', ask: 'true와 무엇을 &&하면 false가 될까?', code: 'print(true && ____)', expect: 'false', answer: 'false', hint: '하나라도 false면 false' },
      { label: 'OR', ask: 'false와 무엇을 ||하면 true가 될까?', code: 'print(false || ____)', expect: 'true', answer: 'true', hint: '하나라도 true면 true' },
      { label: '조합 조건', ask: '5>3 이고 2<? 가 참이 되게 — 2보다 큰 수를.', code: 'print(5 > 3 && 2 < ____)', expect: 'true', answer: '4', hint: '2 < 4' },
      { label: '삼항 else', ask: 'n(3)은 5보다 크지 않다 — else 쪽을 "작음"으로.', code: 'let n = 3\nprint(n > 5 ? "큼" : "____")', expect: '"작음"', answer: '작음', hint: '3 < 5 → else' },
      { label: '기본값(||)', ask: '0은 falsy → 오른쪽이 결과. "기본"이 나오게.', code: 'print(0 || "____")', expect: '"기본"', answer: '기본', hint: 'falsy면 오른쪽 값' },
    ],
  }

  // ── 5강 · 함수 : 중첩 호출·조건 반환·함수를 값으로·콜백 ──
  H['5'] = {
    pattern: '🔴 어려움 · 중첩 호출·조건 반환·함수를 반환·콜백 연결',
    problems: [
      { label: '중첩 호출', ask: 'inc는 +1. inc(inc(?))가 5가 되려면 안쪽 인수는?', code: 'function inc(n) { return n + 1 }\nprint(inc(inc(____)))', expect: '5', answer: '3', hint: 'inc(inc(3)) = 5' },
      { label: '조건 반환', ask: 'big(2)가 "작은"이 나오게 — else 쪽을 채워라.', code: 'function big(n) { return n > 5 ? "큰" : "____" }\nprint(big(2))', expect: '"작은"', answer: '작은', hint: '2 < 5 → else' },
      { label: '함수를 반환', ask: '안쪽 함수가 7을 돌려주게.', code: 'function make() { return function () { return ____ } }\nprint(make()())', expect: '7', answer: '7', hint: '안쪽 return 7' },
      { label: '콜백 연결', ask: 'map(d) 결과의 개수 2를 구하려면?', code: 'function d(n) { return n * 2 }\nprint([1, 2].map(d).____)', expect: '2', answer: 'length', hint: 'map 결과도 배열 → .length' },
      { label: '문자열 반환', ask: 'greet("민지")가 "민지님"이 되게 붙일 글자는?', code: 'function greet(n) { return n + "____" }\nprint(greet("민지"))', expect: '"민지님"', answer: '님', hint: 'n + "님"' },
    ],
  }

  // ── 6강 · 배열 : includes·indexOf·join·concat·2차원 ──
  H['6'] = {
    pattern: '🔴 어려움 · includes·indexOf·join·concat·중첩 배열',
    problems: [
      { label: '포함?', ask: '[1,2,3]이 2를 담고 있나? true가 나오게 — 무슨 메서드?', code: 'let a = [1, 2, 3]\nprint(a.____(2))', expect: 'true', answer: 'includes', hint: '담고 있나 = includes' },
      { label: '위치 찾기', ask: '["x","y"]에서 "y"의 위치(1)를 찾으려면?', code: 'let a = ["x", "y"]\nprint(a.____("y"))', expect: '1', answer: 'indexOf', hint: '위치 = indexOf' },
      { label: '이어붙이기', ask: '[1,2,3]을 "-"로 이어 "1-2-3"이 되게 — 무슨 메서드?', code: 'print([1, 2, 3].____("-"))', expect: '"1-2-3"', answer: 'join', hint: '합치기 = join' },
      { label: '합친 개수', ask: '[1,2]에 [3]을 붙인 배열의 개수(3)를 구하려면?', code: 'print([1, 2].concat([3]).____)', expect: '3', answer: 'length', hint: 'concat 결과의 .length' },
      { label: '2차원', ask: '[[1,2],[3,4]] 에서 3을 꺼내려면 m[1] 다음 몇 번?', code: 'let m = [[1, 2], [3, 4]]\nprint(m[1][____])', expect: '3', answer: '0', hint: 'm[1]=[3,4]의 0번' },
    ],
  }

  // ── 7강 · 반복과 map : 체이닝·find·some·every·reduce max ──
  H['7'] = {
    pattern: '🔴 어려움 · 체이닝·find·some·every·reduce로 최댓값',
    problems: [
      { label: '체이닝', ask: '1보다 큰 것만 2배 한 배열의 개수(3)를 구하려면?', code: 'let n = [1, 2, 3, 4]\nprint(n.filter(x => x > 1).map(x => x * 2).____)', expect: '3', answer: 'length', hint: 'filter→map 결과의 .length' },
      { label: '처음 찾기', ask: '7보다 큰 첫 값(10)을 찾으려면 무슨 메서드?', code: 'let n = [5, 10, 15]\nprint(n.____(x => x > 7))', expect: '10', answer: 'find', hint: '조건 맞는 첫 값 = find' },
      { label: '하나라도?', ask: '2보다 큰 게 하나라도 있나? true — 무슨 메서드?', code: 'let n = [1, 2, 3]\nprint(n.____(x => x > 2))', expect: 'true', answer: 'some', hint: '하나라도 = some' },
      { label: '모두?', ask: '전부 짝수인가? true — 무슨 메서드?', code: 'let n = [2, 4, 6]\nprint(n.____(x => x % 2 === 0))', expect: 'true', answer: 'every', hint: '모두 = every' },
      { label: '최댓값(reduce)', ask: '가장 큰 값(7)이 나오게 — 작을 때 어느 쪽을 남길까?', code: 'let n = [3, 7, 2]\nprint(n.reduce((a, b) => a > b ? a : ____, 0))', expect: '7', answer: 'b', hint: 'a가 작으면 b를 남긴다' },
    ],
  }

  // ── 8강 · 객체 : 메서드·키 개수·깊은 중첩·reduce·조건 결합 ──
  H['8'] = {
    pattern: '🔴 어려움 · 메서드·깊은 중첩·reduce·조건 결합 — 응용',
    problems: [
      { label: '메서드', ask: 'dog의 bark 메서드를 불러 "멍"이 나오게 — 빈칸에 메서드 이름?', code: 'let dog = { bark: function () { return "멍" } }\nprint(dog.____())', expect: '"멍"', answer: 'bark', hint: 'dog.bark()' },
      { label: '키 개수', ask: '객체의 이름(키) 개수 2를 구하려면? (Object.keys의 무엇?)', code: 'let o = { a: 1, b: 2 }\nprint(Object.keys(o).____)', expect: '2', answer: 'length', hint: '.length' },
      { label: '깊은 중첩', ask: 'data 안 첫 사람의 펫 이름("콩이")까지 닿으려면 마지막 칸에?', code: 'let data = { users: [{ pet: { name: "콩이" } }] }\nprint(data.users[0].pet.____)', expect: '"콩이"', answer: 'name', hint: 'data.users[0].pet.name' },
      { label: '나이 합(reduce)', ask: '사람들의 나이 합(54)이 나오게 — 각 사람의 무엇을 더할까?', code: 'let ppl = [{ age: 24 }, { age: 30 }]\nprint(ppl.reduce((s, p) => s + p.____, 0))', expect: '54', answer: 'age', hint: 's + p.age' },
      { label: '조건 결합', ask: 'vip면 이름 뒤에 별이 붙어 "민지⭐"가 나오게 — vip가 참일 때 값?', code: 'let p = { name: "민지", vip: true }\nprint(p.name + (p.vip ? "____" : ""))', expect: '"민지⭐"', answer: '⭐', hint: 'true면 "⭐"' },
    ],
  }

  // ── 9강 · DOM : innerHTML·연속 클릭·스타일·다중 붙이기·속성 ──
  H['9'] = {
    pattern: '🔴 어려움 · innerHTML+querySelector·연속 클릭·다중 append·속성',
    problems: [
      { label: 'innerHTML 안 찾기', ask: '넣은 <p>의 글자("hi")를 꺼내려면 p의 무엇?', code: 'let el = document.createElement("div")\nel.innerHTML = "<p>hi</p>"\nprint(el.querySelector("p").____)', expect: '"hi"', answer: 'textContent', hint: 'p.textContent' },
      { label: '두 번 클릭', ask: '두 번 눌러 n이 2가 되게 — 한 번 더 누르는 함수는?', code: 'let n = 0\nlet b = document.createElement("button")\nb.addEventListener("click", () => n++)\nb.click()\nb.____()\nprint(n)', expect: '2', answer: 'click', hint: 'b.click() 두 번' },
      { label: '크기 스타일', ask: 'el의 너비를 "10px"로 정해 출력되게.', code: 'let el = document.createElement("div")\nel.style.width = "____"\nprint(el.style.width)', expect: '"10px"', answer: '10px', hint: 'style.width = "10px"' },
      { label: '둘 붙이기', ask: 'span 둘을 붙였을 때 자식 개수(2)를 구하려면?', code: 'let box2 = document.createElement("div")\nbox2.append(document.createElement("span"), document.createElement("span"))\nprint(box2.children.____)', expect: '2', answer: 'length', hint: 'children.length' },
      { label: '속성 넣기', ask: 'href를 "#"로 넣어 다시 꺼내면 "#". 빈칸에 넣을 값은?', code: 'let el = document.createElement("a")\nel.setAttribute("href", "____")\nprint(el.getAttribute("href"))', expect: '"#"', answer: '#', hint: 'setAttribute("href", "#")' },
    ],
  }

  // ── 10강 · 실전 캡스톤 : 카드 문자열·배지·filter·메서드·DOM 결합 ──
  H['10'] = {
    pattern: '🔴 어려움 · 카드 문자열·조건 배지·filter·메서드·DOM 결합',
    problems: [
      { label: '카드 문자열', ask: '"민지(24)"가 나오게 나이 속성을 꺼내라.', code: 'let u = { name: "민지", age: 24 }\nprint(u.name + "(" + u.____ + ")")', expect: '"민지(24)"', answer: 'age', hint: 'u.age' },
      { label: 'VIP 배지', ask: 'vip면 "민지⭐"가 나오게 — 참일 때 붙일 값?', code: 'let u = { name: "민지", vip: true }\nprint(u.name + (u.vip ? "____" : ""))', expect: '"민지⭐"', answer: '⭐', hint: 'true면 "⭐"' },
      { label: '거르고 세기', ask: '25살 초과가 몇 명(1)인지 세려면 filter 뒤에 무엇?', code: 'let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.filter(p => p.age > 25).____)', expect: '1', answer: 'length', hint: 'filter 결과의 .length' },
      { label: '메서드', ask: 'dog의 bark를 불러 "멍"이 나오게 — 메서드 이름?', code: 'let dog = { bark: function () { return "멍" } }\nprint(dog.____())', expect: '"멍"', answer: 'bark', hint: 'dog.bark()' },
      { label: 'DOM + 숫자', ask: '화면 글자를 "90점"으로 — 숫자 자리에 무엇?', code: 'let el = document.createElement("div")\nel.textContent = ____ + "점"\nprint(el.textContent)', expect: '"90점"', answer: '90', hint: '숫자 90 → 자동 문자' },
    ],
  }

  // ── 🧠 M1 램(ram) : typeof 함정·복사 독립 산술 ──
  H['ram'] = {
    pattern: '🔴 어려움 · typeof 함정(null)·복사 독립·재할당 타입변경',
    problems: [
      { label: 'typeof null(함정)', ask: 'typeof null 의 결과는? (유명한 함정 — "object") 빈칸에 null', code: 'print(typeof ____)', expect: '"object"', answer: 'null', hint: 'JS의 오래된 버그 — null의 typeof는 object' },
      { label: '복사 독립 산술', ask: 'y에 5를 더해 보세요. x는? (▶ 확인)', code: 'let x = 10\nlet y = x\ny = y + ____\nprint(x)', expect: '10', answer: '5', hint: '복사라 x는 10' },
      { label: 'typeof 식', ask: '(1 + ?)의 타입이 "number"가 되게 — 숫자를.', code: 'print(typeof (1 + ____))', expect: '"number"', answer: '1', hint: '숫자끼리 더하면 number' },
      { label: '재할당 타입변경', ask: 'v에 글자를 담으면 typeof는? 빈칸에 v', code: 'let v = 1\nv = "hi"\nprint(typeof ____)', expect: '"string"', answer: 'v', hint: '문자 담긴 v → string' },
      { label: '복사 두 값', ask: 'b만 9로 바꿨다. a는 그대로라 a+b는? 빈칸에 b', code: 'let a = 1\nlet b = a\nb = 9\nprint(a + ____)', expect: '10', answer: 'b', hint: 'a=1(그대로) + b=9' },
    ],
  }

  // ── 🧠 M4-1 값=복사(ref) : 복사 vs 공유 대비 ──
  H['ref'] = {
    pattern: '🔴 어려움 · 복사(원시)와 공유(객체)의 차이를 한 식에서',
    problems: [
      { label: '복사는 그대로', ask: 'b를 9로 바꿨다. a는 여전히 1이라 a===? 가 참. 빈칸에 1', code: 'let a = 1\nlet b = a\nb = 9\nprint(a === ____)', expect: 'true', answer: '1', hint: 'a는 복사라 1 그대로' },
      { label: '독립한 두 값', ask: 'x(10)는 그대로, y(20)만 바뀜. x+y는? 빈칸에 y', code: 'let x = 10\nlet y = x\ny = 20\nprint(x + ____)', expect: '30', answer: 'y', hint: '10 + 20' },
      { label: '함수도 복사', ask: 'f가 받은 값을 0으로 해도 p(200)는 안전. p+? 는? 빈칸에 0', code: 'let p = 200\nfunction f(x) { x = 0 }\nf(p)\nprint(p + ____)', expect: '200', answer: '0', hint: '원본 안전 → 200 + 0' },
      { label: '꺼낸 값 vs 객체', ask: 'b는 a.v 복사(1), c는 a 자체. c.v=9 후 b+c.v는? 빈칸에 c', code: 'let a = { v: 1 }\nlet b = a.v\nlet c = a\nc.v = 9\nprint(b + ____.v)', expect: '10', answer: 'c', hint: 'b=1(복사) + c.v=9(공유)' },
      { label: '문자 복사', ask: 't만 "b"로 바꿈. s는 "a" 그대로라 s+t는? 빈칸에 t', code: 'let s = "a"\nlet t = s\nt = "b"\nprint(s + ____)', expect: '"ab"', answer: 't', hint: '"a" + "b"' },
    ],
  }

  // ── 🧠 M4-2 참조=공유(ref2) : 별칭 끊김·중첩 공유 ──
  H['ref2'] = {
    pattern: '🔴 어려움 · 별칭이 끊기는 재할당·중첩 객체 공유',
    problems: [
      { label: '복사값 vs 공유', ask: 'x는 a.n 복사(1), b는 a 자체. b.n=9 후 x+b.n은? 빈칸에 b', code: 'let a = { n: 1 }\nlet b = a\nlet x = a.n\nb.n = 9\nprint(x + ____.n)', expect: '10', answer: 'b', hint: 'x=1(복사) + b.n=9(공유)' },
      { label: '두 별칭', ask: 'a·b 둘 다 o의 별칭. a.c=5 후 b로 c를 꺼내면? 빈칸에 c', code: 'let o = { c: 0 }\nlet a = o\nlet b = o\na.c = 5\nprint(b.____)', expect: '5', answer: 'c', hint: '셋 다 같은 객체' },
      { label: '재할당은 끊는다', ask: 'b를 새 객체로 재할당하면 a와의 연결이 끊긴다. a.n은? 빈칸에 n', code: 'let a = { n: 1 }\nlet b = a\nb = { n: 9 }\nprint(a.____)', expect: '1', answer: 'n', hint: 'b가 다른 객체를 가리켜 a는 1 그대로' },
      { label: '배열 공유', ask: 'c는 arr과 같은 배열. c.push(3) 후 arr 길이는? 빈칸에 length', code: 'let arr = [1, 2]\nlet c = arr\nc.push(3)\nprint(arr.____)', expect: '3', answer: 'length', hint: '같은 배열' },
      { label: '중첩 공유', ask: 'p는 me.pet과 같은 객체. p.hp=0 후 me.pet.hp는? 빈칸에 p', code: 'let me = { pet: { hp: 10 } }\nlet p = me.pet\n____.hp = 0\nprint(me.pet.hp)', expect: '0', answer: 'p', hint: 'p = me.pet(같은 객체)' },
    ],
  }

  // ── 🧠 M2 스택(stack) : 호출 사슬·조기 반환·지역 vs 전역 ──
  H['stack'] = {
    pattern: '🔴 어려움 · 함수가 함수를 부르는 사슬·조기 반환·스코프',
    problems: [
      { label: '2배 사슬', ask: 'a는 b()의 2배. a()가 10이 되려면 b는 얼마를 돌려줘야?', code: 'function a() { return b() * 2 }\nfunction b() { return ____ }\nprint(a())', expect: '10', answer: '5', hint: '10의 절반' },
      { label: '+1 사슬', ask: 'outer는 inner()+1. outer()가 10이 되려면 inner는?', code: 'function outer() { return inner() + 1 }\nfunction inner() { return ____ }\nprint(outer())', expect: '10', answer: '9', hint: '10 - 1' },
      { label: '중첩 호출', ask: 'f는 +1. f(f(f(?)))가 3이 되려면 안쪽 인수는?', code: 'function f(n) { return n + 1 }\nprint(f(f(f(____))))', expect: '3', answer: '0', hint: '0→1→2→3' },
      { label: '지역 vs 전역', ask: '함수 안 n(10)과 밖 n(99)은 다른 칸. f()+밖n = 109가 되게 빈칸에 n', code: 'function f() { let n = 10; return n }\nlet n = 99\nprint(f() + ____)', expect: '109', answer: 'n', hint: '10 + 99' },
      { label: '조기 반환', ask: 'f(-1)이 "음"이 되게 — 두 번째 return을 채워라.', code: 'function f(n) { if (n > 0) return "양"; return "____" }\nprint(f(-1))', expect: '"음"', answer: '음', hint: '음수는 아래 return' },
    ],
  }

  // ── 🧠 M3 힙(heap) : 공유 대비·깊은 중첩·동적 키 ──
  H['heap'] = {
    pattern: '🔴 어려움 · 힙 공유 vs 원시 복사·깊은 중첩·동적 키',
    problems: [
      { label: '공유 vs 복사', ask: 'x는 o.n 복사(5), a는 o 자체. a.n=0 후 x+a.n은? 빈칸에 a', code: 'let o = { n: 5 }\nlet a = o\nlet x = o.n\na.n = 0\nprint(x + ____.n)', expect: '5', answer: 'a', hint: 'x=5(복사) + a.n=0(공유)' },
      { label: '배열 속 객체', ask: 'arr[0].v를 9로 바꾼 뒤 다시 꺼내려면 어떤 속성?', code: 'let arr = [{ v: 1 }]\narr[0].v = 9\nprint(arr[0].____)', expect: '9', answer: 'v', hint: 'arr[0].v' },
      { label: '깊은 중첩', ask: '3단계 중첩 안 c(7)를 꺼내려면 마지막 속성?', code: 'let d = { a: { b: { c: 7 } } }\nprint(d.a.b.____)', expect: '7', answer: 'c', hint: 'd.a.b.c' },
      { label: '객체 안 배열', ask: 'o.list의 개수(3)를 구하려면?', code: 'let o = { list: [1, 2, 3] }\nprint(o.list.____)', expect: '3', answer: 'length', hint: 'o.list.length' },
      { label: '동적 키', ask: 'k("score")로 넣은 값을 점 표기로 꺼내려면 어떤 속성?', code: 'let o = {}\nlet k = "score"\no[k] = 100\nprint(o.____)', expect: '100', answer: 'score', hint: 'o.score' },
    ],
  }

  // ── 🧠 M5 값 전달(passval) : 원시는 반환해야 바뀐다 ──
  H['passval'] = {
    pattern: '🔴 어려움 · 원시값은 반환+재대입해야 바뀐다(원본은 여전히 안전)',
    problems: [
      { label: '반환+재대입', ask: 'dbl은 2배를 돌려준다. a가 10이 되게 하려면 a에 무엇을 다시 담을까?', code: 'function dbl(n) { return n * 2 }\nlet a = 5\na = dbl(____)\nprint(a)', expect: '10', answer: 'a', hint: 'a = dbl(a)' },
      { label: '원본 확인', ask: 'f가 받은 값을 0으로 해도 a는 7. a===? 가 참이 되게 빈칸에 7', code: 'function f(n) { n = 0 }\nlet a = 7\nf(a)\nprint(a === ____)', expect: 'true', answer: '7', hint: '원본 안전' },
      { label: '두 번 전달', ask: 'f가 받은 값을 99로 해도 a는 3. a+? 가 3이 되게 빈칸에 0', code: 'function f(n) { n = 99 }\nlet a = 3\nf(a)\nf(a)\nprint(a + ____)', expect: '3', answer: '0', hint: '3 + 0' },
      { label: '문자 안전', ask: 'f가 받은 글자에 "!"를 붙여도 t는 "hi". t+"?" 가 "hi!"가 되게 빈칸에 !', code: 'function f(s) { s = s + "!" }\nlet t = "hi"\nf(t)\nprint(t + "____")', expect: '"hi!"', answer: '!', hint: 't는 "hi" 그대로' },
      { label: '반환값 더하기', ask: 'inc(a)는 5를 준다. a는 그대로 4라 inc(a)+a는? 빈칸에 a', code: 'function inc(n) { return n + 1 }\nlet a = 4\nprint(inc(a) + ____)', expect: '9', answer: 'a', hint: '5 + 4' },
    ],
  }

  // ── 🧠 M6 참조 전달(passobj) : 중첩·배열 속성·공유 참조 ──
  H['passobj'] = {
    pattern: '🔴 어려움 · 함수가 중첩 속성·배열 속성을 바꾸고, 공유 참조도 함께',
    problems: [
      { label: '속성 0으로', ask: 'z는 받은 것 c를 0으로. d.c를 꺼내려면 어떤 속성?', code: 'function z(o) { o.c = 0 }\nlet d = { c: 5 }\nz(d)\nprint(d.____)', expect: '0', answer: 'c', hint: 'd.c' },
      { label: '중첩 변경', ask: 'f는 받은 것의 pet.hp를 0으로. me.pet의 무엇을 꺼내면 0?', code: 'function f(o) { o.pet.hp = 0 }\nlet me = { pet: { hp: 9 } }\nf(me)\nprint(me.pet.____)', expect: '0', answer: 'hp', hint: 'me.pet.hp' },
      { label: '배열 속성', ask: 'f는 받은 것의 list에 push. d.list의 개수(2)를 구하려면?', code: 'function f(o) { o.list.push(9) }\nlet d = { list: [1] }\nf(d)\nprint(d.list.____)', expect: '2', answer: 'length', hint: 'd.list.length' },
      { label: '반환 없이 변경', ask: 'grow는 받은 것 n을 2배로. d.n(10)을 꺼내려면?', code: 'function grow(o) { o.n = o.n * 2 }\nlet d = { n: 5 }\ngrow(d)\nprint(d.____)', expect: '10', answer: 'n', hint: 'd.n' },
      { label: '공유 참조도', ask: 'b는 a의 별칭. f(a)가 a.v를 1로 바꾸면 b.v는? 빈칸에 v', code: 'function f(o) { o.v = 1 }\nlet a = { v: 0 }\nlet b = a\nf(a)\nprint(b.____)', expect: '1', answer: 'v', hint: 'a·b 같은 객체' },
    ],
  }

  // ── 🧠 M7 배열 전달(passarr) : 누적·요소 수정·map은 원본유지 ──
  H['passarr'] = {
    pattern: '🔴 어려움 · 여러 번 push·요소 수정·map은 원본을 안 바꿈(대비)',
    problems: [
      { label: '두 번 호출', ask: 'f는 push(1). 두 번 부른 뒤 arr 개수(3)를 구하려면?', code: 'function f(a) { a.push(1) }\nlet arr = [0]\nf(arr)\nf(arr)\nprint(arr.____)', expect: '3', answer: 'length', hint: '1 + 2번 push' },
      { label: 'map은 원본유지', ask: 'f 안 map은 새 배열만 만들 뿐 원본은 그대로. arr 개수(2)를 구하려면?', code: 'function f(a) { a.map(x => x * 2) }\nlet arr = [1, 2]\nf(arr)\nprint(arr.____)', expect: '2', answer: 'length', hint: 'map은 원본 안 바꿈' },
      { label: '요소 수정', ask: 'f는 0번을 +1. arr[0]이 10이 되었으니 꺼내려면 몇 번?', code: 'function f(a) { a[0] = a[0] + 1 }\nlet arr = [9]\nf(arr)\nprint(arr[____])', expect: '10', answer: '0', hint: 'arr[0]' },
      { label: '별칭 전달', ask: 'ref는 arr의 별칭. f(ref)가 push하면 arr 개수(2)를 구하려면?', code: 'function f(a) { a.push(5) }\nlet arr = [1]\nlet ref = arr\nf(ref)\nprint(arr.____)', expect: '2', answer: 'length', hint: 'ref·arr 같은 배열' },
      { label: '비우기', ask: 'clr은 받은 배열을 비운다. arr의 개수(0)를 구하려면?', code: 'function clr(a) { a.length = 0 }\nlet arr = [1, 2, 3]\nclr(arr)\nprint(arr.____)', expect: '0', answer: 'length', hint: 'arr.length' },
    ],
  }
})()
