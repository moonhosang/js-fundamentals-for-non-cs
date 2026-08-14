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
})()
