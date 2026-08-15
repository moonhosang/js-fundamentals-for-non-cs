// 🔴 어려움 드릴 — 응용·전이(경계·함정·다개념 결합). (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것. 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const H = window.Drills.hard

  // ── 1강 · 값과 타입 : typeof 함정·부동소수점·강제변환 ──
  H['1'] = {
    pattern: '🔴 어려움 · typeof 함정·부동소수점·+와 -의 차이 — 아는 것도 틀린다',
    problems: [
      { label: 'typeof null', ask: 'null 의 typeof 결과는? (JS의 유명한 버그)', code: 'print((typeof null) === "____")', expect: 'true', answer: 'object', hint: '오래된 버그 — object' },
      { label: 'typeof NaN', ask: 'NaN(계산 실패값)의 typeof 이름은?', code: 'print((typeof NaN) === "____")', expect: 'true', answer: 'number', hint: '뜻밖에 number' },
      { label: '부동소수점', ask: '0.1 + 0.2 는 0.3 과 정확히 같은가?', code: 'print((0.1 + 0.2 === 0.3) === ____)', expect: 'true', answer: 'false', hint: '미세 오차로 다르다' },
      { label: '- 는 숫자로', ask: '"5" - 1 의 결과는? (빼기는 +와 다르게)', code: 'print(("5" - 1) === ____)', expect: 'true', answer: '4', hint: '"5"가 숫자 5로 강제' },
      { label: '미초기화', ask: '값을 안 넣은 변수 x의 타입 이름은?', code: 'let x\nprint((typeof x) === "____")', expect: 'true', answer: 'undefined', hint: '선언만 = undefined' },
    ],
  }

  // ── 2강 · 계산과 문자열 : 연산자별 강제 변환 함정 ──
  H['2'] = {
    pattern: '🔴 어려움 · +는 글자로, -·*는 숫자로 — 연산자마다 다른 강제 변환',
    problems: [
      { label: '* 는 숫자로', ask: '"5" * 2 는? (곱하기는 숫자로 강제)', code: 'print(("5" * 2) === ____)', expect: 'true', answer: '10', hint: '"5"→5, 5×2' },
      { label: '+ "" 는 글자로', ask: '10 + "" 는? (숫자 + 빈 글자)', code: 'print((10 + "") === "____")', expect: 'true', answer: '10', hint: '글자로 변함 → "10"' },
      { label: '글자도 인덱스', ask: '"abc"[1] 는? (글자도 번호로 접근)', code: 'print(("abc"[1]) === "____")', expect: 'true', answer: 'b', hint: '0:a,1:b' },
      { label: 'split 개수', ask: '"a,b,c".split(",") 의 개수는?', code: 'print(("a,b,c".split(",").length) === ____)', expect: 'true', answer: '3', hint: '쉼표로 3조각' },
      { label: 'Number 변환', ask: 'Number("12") + 3 는?', code: 'print((Number("12") + 3) === ____)', expect: 'true', answer: '15', hint: '"12"→숫자 12, +3' },
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

  // ── 4강 · 조건 : 강제 변환·단축평가·평가 순서·NaN (아는 문법도 틀리는 것들) ──
  H['4'] = {
    pattern: '🔴 어려움 · 결과를 예측 — 강제 변환·단축평가·평가 순서·NaN 함정',
    problems: [
      { label: '&&는 값을 돌려준다', ask: '&&는 불리언이 아니라 "피연산자"를 돌려준다. 1 && 2 의 값은?', code: 'print((1 && 2) === ____)', expect: 'true', answer: '2', hint: '둘 다 참이면 뒤쪽(2)을 돌려준다' },
      { label: '||는 값을 돌려준다', ask: '||는 참인 쪽 "피연산자"를 돌려준다. 0 || "안녕" 의 값은?', code: 'print((0 || "안녕") === ____)', expect: 'true', answer: '"안녕"', hint: '0은 falsy → 오른쪽 값 자체' },
      { label: '비교 체인', ask: '2 > 1 > 0 의 결과는? (왼쪽부터: 앞이 true가 되고, 그 true가 다시...)', code: 'print((2 > 1 > 0) === ____)', expect: 'true', answer: 'true', hint: '(2>1)=true → true>0 → 1>0 → true' },
      { label: 'NaN 함정', ask: 'NaN === NaN 의 결과는? (자기 자신과 비교)', code: 'print((NaN === NaN) === ____)', expect: 'true', answer: 'false', hint: 'NaN은 자기 자신과도 같지 않다' },
      { label: '느슨한 ==', ask: '느슨한 == 로 "" 와 0 을 비교하면? (양쪽을 숫자로 강제 변환)', code: 'print(("" == 0) === ____)', expect: 'true', answer: 'true', hint: '""→0, 0==0 → true' },
    ],
  }

  // ── 5강 · 함수 : 스코프·함수를 값으로·인수는 복사·조기 반환 ──
  H['5'] = {
    pattern: '🔴 어려움 · 지역 vs 전역·함수를 반환·인수는 복사·조기 반환 예측',
    problems: [
      { label: '지역 우선', ask: '함수 안 n=1, 밖 n=9. f()는? (지역이 우선)', code: 'let n = 9\nfunction f() { let n = 1; return n }\nprint(f() === ____)', expect: 'true', answer: '1', hint: '안쪽 n을 본다' },
      { label: '함수를 반환', ask: '함수가 함수를 돌려준다. make()()는?', code: 'function make() { return function () { return 7 } }\nprint(make()() === ____)', expect: 'true', answer: '7', hint: '부른 함수가 또 부른다' },
      { label: '인수는 복사', ask: '인수는 복사(원시). f 안에서 x=0 해도 a는?', code: 'function f(x) { x = 0 }\nlet a = 5\nf(a)\nprint(a === ____)', expect: 'true', answer: '5', hint: '원본은 안전' },
      { label: '조기 반환', ask: '조기 반환. f(-1) (양수면 "양", 아니면 "음")은?', code: 'function f(n) { if (n > 0) return "양"; return "음" }\nprint(f(-1) === "____")', expect: 'true', answer: '음', hint: '-1은 아래 return' },
      { label: '콜백', ask: '콜백. [1,2,3].map(dbl) 의 첫 요소는?', code: 'function dbl(n) { return n * 2 }\nprint([1, 2, 3].map(dbl)[0] === ____)', expect: 'true', answer: '2', hint: '1 × 2' },
    ],
  }

  // ── 6강 · 배열 : 참조·정렬 함정·음수 인덱스·체이닝 ──
  H['6'] = {
    pattern: '🔴 어려움 · 배열은 참조·sort는 문자 비교·음수 인덱스 없음 — 함정',
    problems: [
      { label: 'join', ask: '[1,2,3] 을 "-" 로 이으면?', code: 'print(([1, 2, 3].join("-")) === "____")', expect: 'true', answer: '1-2-3', hint: '사이에 - 끼움' },
      { label: '배열은 참조', ask: 'b = a 로 둔 뒤 b에 push하면 원본 a의 개수는?', code: 'let a = [1, 2, 3]\nlet b = a\nb.push(4)\nprint(a.length === ____)', expect: 'true', answer: '4', hint: '같은 배열 → a도 늘어남' },
      { label: 'sort 함정', ask: '[3, 20, 100].sort() 의 첫 요소는? (기본 정렬은 문자로 비교!)', code: 'print(([3, 20, 100].sort()[0]) === ____)', expect: 'true', answer: '100', hint: '"100" < "20" < "3" → 첫째 100' },
      { label: '음수 인덱스 없음', ask: 'a[-1] 로 마지막을 꺼내려 하면? (JS엔 음수 인덱스가 없다)', code: 'let a = [1, 2, 3]\nprint((a[-1]) === ____)', expect: 'true', answer: 'undefined', hint: '없는 칸 → undefined' },
      { label: 'filter 개수', ask: '[1,2,3,4] 에서 2보다 큰 것만 거르면 몇 개?', code: 'print(([1, 2, 3, 4].filter(x => x > 2).length) === ____)', expect: 'true', answer: '2', hint: '3,4 → 2개' },
    ],
  }

  // ── 7강 · 반복과 map : reduce 함정·find·every·집계·forEach 반환 ──
  H['7'] = {
    pattern: '🔴 어려움 · 시작값 없는 reduce·find·every·객체 배열 집계·forEach는 undefined',
    problems: [
      { label: 'reduce 시작값 없음', ask: '요소가 하나면 시작값 없는 reduce는? [5].reduce((a,b)=>a+b)', code: 'print([5].reduce((a, b) => a + b) === ____)', expect: 'true', answer: '5', hint: '더할 짝이 없어 그대로 5' },
      { label: 'find', ask: '7보다 큰 첫 값은?', code: 'print([5, 10, 15].find(x => x > 7) === ____)', expect: 'true', answer: '10', hint: '조건 맞는 첫 값' },
      { label: 'every', ask: '전부 0보다 큰가?', code: 'print([1, 2, 3].every(x => x > 0) === ____)', expect: 'true', answer: 'true', hint: '모두 만족 → true' },
      { label: '객체 배열 집계', ask: '나이만 뽑아 다 더하면?', code: 'print([{ age: 20 }, { age: 30 }].map(p => p.age).reduce((a, b) => a + b, 0) === ____)', expect: 'true', answer: '50', hint: '20 + 30' },
      { label: 'forEach 반환', ask: 'forEach는 무엇을 돌려주나?', code: 'let r = [1, 2].forEach(x => x)\nprint(r === ____)', expect: 'true', answer: 'undefined', hint: 'forEach는 반환이 없다' },
    ],
  }

  // ── 8강 · 객체 : 메서드·깊은 중첩·reduce·조건 결합·this 결과 예측 ──
  H['8'] = {
    pattern: '🔴 어려움 · 메서드·깊은 중첩·reduce 집계·조건 결합·this 결과 예측',
    problems: [
      { label: '메서드', ask: 'dog.bark() 는?', code: 'let dog = { bark: function () { return "멍" } }\nprint(dog.bark() === "____")', expect: 'true', answer: '멍', hint: 'bark의 반환' },
      { label: '깊은 중첩', ask: 'data.users[0].pet.name 은?', code: 'let data = { users: [{ pet: { name: "콩이" } }] }\nprint(data.users[0].pet.name === "____")', expect: 'true', answer: '콩이', hint: '끝까지 따라감' },
      { label: '나이 합(reduce)', ask: '사람들의 나이를 다 더하면?', code: 'let ppl = [{ age: 24 }, { age: 30 }]\nprint(ppl.reduce((s, p) => s + p.age, 0) === ____)', expect: 'true', answer: '54', hint: '24 + 30' },
      { label: '조건 결합', ask: 'vip면 이름 뒤에 별을 붙인다. 결과는?', code: 'let p = { name: "민지", vip: true }\nprint((p.name + (p.vip ? "⭐" : "")) === "____")', expect: 'true', answer: '민지⭐', hint: 'vip라 별 붙음' },
      { label: 'this 메서드', ask: 'c.hi() 는? (hi는 "나는 "+this.name 반환)', code: 'let c = { name: "민지", hi() { return "나는 " + this.name } }\nprint(c.hi() === "____")', expect: 'true', answer: '나는 민지', hint: 'this.name = "민지"' },
    ],
  }

  // ── 9강 · DOM : innerHTML·스타일·속성·append는 '이동' 함정 예측 ──
  H['9'] = {
    pattern: '🔴 어려움 · innerHTML 안 찾기·스타일·속성·append는 이동(중복 아님) 예측',
    problems: [
      { label: 'innerHTML 안 찾기', ask: '넣은 <p>의 글자는?', code: 'let el = document.createElement("div")\nel.innerHTML = "<p>hi</p>"\nprint(el.querySelector("p").textContent === "____")', expect: 'true', answer: 'hi', hint: 'p 안의 글자' },
      { label: '크기 스타일', ask: 'el.style.width 는?', code: 'let el = document.createElement("div")\nel.style.width = "10px"\nprint(el.style.width === "____")', expect: 'true', answer: '10px', hint: '방금 정한 너비' },
      { label: '속성', ask: 'getAttribute("href") 는?', code: 'let el = document.createElement("a")\nel.setAttribute("href", "#")\nprint(el.getAttribute("href") === "____")', expect: 'true', answer: '#', hint: '방금 넣은 값' },
      { label: 'append는 이동', ask: '같은 span을 두 번 append하면 자식 개수는? (같은 요소는 이동일 뿐)', code: 'let box2 = document.createElement("div")\nlet s = document.createElement("span")\nbox2.append(s)\nbox2.append(s)\nprint(box2.children.length === ____)', expect: 'true', answer: '1', hint: '복제가 아니라 이동 → 1개' },
      { label: '숫자+글자', ask: 'el.textContent = 90 + "점" 은?', code: 'let el = document.createElement("div")\nel.textContent = 90 + "점"\nprint(el.textContent === "____")', expect: 'true', answer: '90점', hint: '숫자가 문자로' },
    ],
  }

  // ── 10강 · 실전 캡스톤 : 카드 문자열·배지·filter·메서드·DOM 결과 예측 ──
  H['10'] = {
    pattern: '🔴 어려움 · 카드 문자열·조건 배지·filter 집계·메서드·DOM 결과 예측',
    problems: [
      { label: '카드 문자열', ask: 'u.name + "(" + u.age + ")" 는?', code: 'let u = { name: "민지", age: 24 }\nprint((u.name + "(" + u.age + ")") === "____")', expect: 'true', answer: '민지(24)', hint: '이어붙이기' },
      { label: 'VIP 배지', ask: 'vip면 별을 붙인다. 결과는?', code: 'let u = { name: "민지", vip: true }\nprint((u.name + (u.vip ? "⭐" : "")) === "____")', expect: 'true', answer: '민지⭐', hint: 'vip라 별 붙음' },
      { label: '거르고 세기', ask: '25살 초과는 몇 명?', code: 'let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.filter(p => p.age > 25).length === ____)', expect: 'true', answer: '1', hint: '30살 한 명' },
      { label: '메서드', ask: 'dog.bark() 는?', code: 'let dog = { bark: function () { return "멍" } }\nprint(dog.bark() === "____")', expect: 'true', answer: '멍', hint: 'bark의 반환' },
      { label: 'DOM + 숫자', ask: 'el.textContent = 90 + "점" 은?', code: 'let el = document.createElement("div")\nel.textContent = 90 + "점"\nprint(el.textContent === "____")', expect: 'true', answer: '90점', hint: '숫자가 문자로' },
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

  // ── 🧠 M4-2 참조=공유(ref2) : 복사↔공유 결합·재할당·concat 함정 ──
  H['ref2'] = {
    pattern: '🔴 어려움 · 복사와 공유가 한 식에·재할당은 끊고·concat은 안 바꾼다',
    problems: [
      { label: '복사+공유', ask: 'snap은 복사(1), b는 공유. b.n=9 후 snap + b.n 은?', code: 'let a = { n: 1 }\nlet b = a\nlet snap = a.n\nb.n = 9\nprint((snap + b.n) === ____)', expect: 'true', answer: '10', hint: '1(복사) + 9(공유)' },
      { label: '끊긴 뒤 변경', ask: 'b를 새 객체로 바꾼 뒤 b.n=100. 원래 a.n은?', code: 'let a = { n: 1 }\nlet b = a\nb = { n: 9 }\nb.n = 100\nprint(a.n === ____)', expect: 'true', answer: '1', hint: '연결 끊긴 뒤라 a는 1' },
      { label: '함수+별칭', ask: 'f가 a.n을 0으로. b는 a의 별칭. b.n은?', code: 'function f(o) { o.n = 0 }\nlet a = { n: 5 }\nlet b = a\nf(a)\nprint(b.n === ____)', expect: 'true', answer: '0', hint: '함수가 공유 객체를 바꿈' },
      { label: 'concat은 새 배열', ask: 'b = b.concat(4) 는 새 배열을 만든다. 원본 a 개수는?', code: 'let a = [1, 2, 3]\nlet b = a\nb = b.concat(4)\nprint(a.length === ____)', expect: 'true', answer: '3', hint: 'concat은 원본 안 바꿈(push와 다름)' },
      { label: '중첩 공유', ask: 'p는 me.pet과 같은 객체. p.hp=0 후 me.pet.hp는?', code: 'let me = { pet: { hp: 10 } }\nlet p = me.pet\np.hp = 0\nprint(me.pet.hp === ____)', expect: 'true', answer: '0', hint: 'p = me.pet(같은 객체)' },
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

  // ── 🕸️ G1 그래프(graph) : 공유 노드·긴 경로·배열+객체 ──
  H['graph'] = {
    pattern: '🔴 어려움 · 두 갈래가 한 노드를 공유·깊은 경로·경로로 변경',
    problems: [
      { label: '공유 노드', ask: 'me.f는 h. me.f.hair를 "숏"으로 바꾸면 h.hair는? 빈칸에 hair', code: 'let h = { hair: "긴" }\nlet me = { f: h }\nme.f.hair = "숏"\nprint(h.____)', expect: '"숏"', answer: 'hair', hint: 'me.f = h(같은 노드)' },
      { label: '두 갈래 한 노드', ask: 'a.x와 b.y가 같은 n을 가리킨다. a.x.v=9 후 b.y.v는? 빈칸에 v', code: 'let n = { v: 1 }\nlet a = { x: n }\nlet b = { y: n }\na.x.v = 9\nprint(b.y.____)', expect: '9', answer: 'v', hint: 'a.x·b.y 같은 노드' },
      { label: '4단계 경로', ask: 'r.c.c.c.v(7)에 닿으려면 마지막 속성?', code: 'let r = { c: { c: { c: { v: 7 } } } }\nprint(r.c.c.c.____)', expect: '7', answer: 'v', hint: 'r.c.c.c.v' },
      { label: '경로로 변경', ask: 'y.ref는 x. y.ref.n=5 후 x.n은? 빈칸에 n', code: 'let x = { n: 1 }\nlet y = { ref: x }\ny.ref.n = 5\nprint(x.____)', expect: '5', answer: 'n', hint: 'y.ref = x' },
      { label: '배열+객체 경로', ask: 'g.list[1].v(2)에 닿으려면 마지막 속성?', code: 'let g = { list: [{ v: 1 }, { v: 2 }] }\nprint(g.list[1].____)', expect: '2', answer: 'v', hint: 'g.list[1].v' },
    ],
  }

  // ── 🕸️ G2 친구 목록(friends) : 공유 변경·map·filter ──
  H['friends'] = {
    pattern: '🔴 어려움 · 배열 속 객체 공유 변경·map·filter로 집계',
    problems: [
      { label: '공유 변경', ask: 'arr[0]은 a. arr[0].hp=50 후 a.hp는? 빈칸에 hp', code: 'let a = { hp: 100 }\nlet arr = [a]\narr[0].hp = 50\nprint(a.____)', expect: '50', answer: 'hp', hint: 'arr[0] = a' },
      { label: '이름 바꿔도', ask: 'list[0]은 m. list[0].name="X" 후 m.name은? 빈칸에 name', code: 'let m = { name: "민지" }\nlet list = [m]\nlist[0].name = "X"\nprint(m.____)', expect: '"X"', answer: 'name', hint: 'list[0] = m' },
      { label: 'map으로 나이', ask: '나이만 뽑은 배열의 개수(2)를 구하려면?', code: 'let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.map(p => p.age).____)', expect: '2', answer: 'length', hint: 'map 결과의 .length' },
      { label: 'filter로 세기', ask: '25살 초과가 몇 명(1)인지 세려면 filter 뒤에?', code: 'let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.filter(p => p.age > 25).____)', expect: '1', answer: 'length', hint: 'filter 결과의 .length' },
      { label: '중첩 배열', ask: 'g.members[0].n("가")에 닿으려면 마지막 속성?', code: 'let g = { members: [{ n: "가" }] }\nprint(g.members[0].____)', expect: '"가"', answer: 'n', hint: 'g.members[0].n' },
    ],
  }

  // ── 🕸️ G3 계통도(family) : 3대·좌우·부모 공유 ──
  H['family'] = {
    pattern: '🔴 어려움 · 3대 경로·좌우 자식·부모 노드 공유',
    problems: [
      { label: '3대', ask: 'me→엄마→할머니. 할머니 이름에 닿으려면 me.parent.parent 다음?', code: 'let g = { name: "할" }\nlet m = { parent: g }\nlet me = { parent: m }\nprint(me.parent.parent.____)', expect: '"할"', answer: 'name', hint: 'me.parent.parent.name' },
      { label: '깊은 트리', ask: 't.l.l.l.v(7)에 닿으려면 마지막 속성?', code: 'let t = { l: { l: { l: { v: 7 } } } }\nprint(t.l.l.l.____)', expect: '7', answer: 'v', hint: 't.l.l.l.v' },
      { label: '오른쪽 값', ask: 'r.right.v(2)를 꺼내려면 마지막 속성?', code: 'let r = { left: { v: 1 }, right: { v: 2 } }\nprint(r.right.____)', expect: '2', answer: 'v', hint: 'r.right.v' },
      { label: '부모 공유', ask: 'a.parent와 b.parent가 같은 dad. a.parent.name="X" 후 b.parent.name은? 빈칸에 name', code: 'let dad = { name: "아빠" }\nlet a = { parent: dad }\nlet b = { parent: dad }\na.parent.name = "X"\nprint(b.parent.____)', expect: '"X"', answer: 'name', hint: '같은 부모 노드' },
      { label: '자식 배열', ask: 'p.kids[1].name("둘")에 닿으려면 마지막 속성?', code: 'let p = { kids: [{ name: "첫" }, { name: "둘" }] }\nprint(p.kids[1].____)', expect: '"둘"', answer: 'name', hint: 'p.kids[1].name' },
    ],
  }

  // ── 🕸️ G4 순환(cycle) : 두 단계 순환·순환 변경 ──
  H['cycle'] = {
    pattern: '🔴 어려움 · 순환을 두 단계 따라가기·순환 경로로 변경',
    problems: [
      { label: '왕복 두 단계', ask: 'a.to=b, b.to=a. b.to.v(=a.v=1)를 꺼내려면 마지막 속성?', code: 'let a = {}\nlet b = {}\na.to = b\nb.to = a\na.v = 1\nprint(b.to.____)', expect: '1', answer: 'v', hint: 'b.to = a' },
      { label: '순환 변경', ask: 'x.ref=y, y.ref=x. y.ref.n=9 후 x.n은? 빈칸에 n', code: 'let x = { n: 1 }\nlet y = { ref: x }\nx.ref = y\ny.ref.n = 9\nprint(x.____)', expect: '9', answer: 'n', hint: 'y.ref = x' },
      { label: '자기순환 두 번', ask: 'n.self=n. n.self.self.v(5)를 꺼내려면 마지막 속성?', code: 'let n = { v: 5 }\nn.self = n\nprint(n.self.self.____)', expect: '5', answer: 'v', hint: 'self.self도 n' },
      { label: '3자 순환', ask: 'a.next=b, b.next=a. a.next.next(=a)의 id(1)를 꺼내려면?', code: 'let a = { id: 1 }\nlet b = { id: 2 }\na.next = b\nb.next = a\nprint(a.next.next.____)', expect: '1', answer: 'id', hint: 'a.next.next = a' },
      { label: '서로 이름', ask: 'p.peer=q, q.peer=p. p.peer.peer(=p)의 name("P")을 꺼내려면?', code: 'let p = { name: "P" }\nlet q = { name: "Q" }\np.peer = q\nq.peer = p\nprint(p.peer.peer.____)', expect: '"P"', answer: 'name', hint: 'p.peer.peer = p' },
    ],
  }

  // ── 🧠 콜 스택(callstack) : 깊은 사슬·지역 스코프·조기 반환 ──
  H['callstack'] = {
    pattern: '🔴 어려움 · 깊은 호출 사슬·사슬 속 지역변수·조기 반환',
    problems: [
      { label: '사슬 + 지역', ask: 'a는 지역 x(2)와 b()를 곱한다. a()가 10이 되려면 b는?', code: 'function a() { let x = 2; return b() * x }\nfunction b() { return ____ }\nprint(a())', expect: '10', answer: '5', hint: '5 * 2' },
      { label: '조건 후 호출', ask: 'chk(1)은 b()를 부른다. 5가 되려면 b는?', code: 'function chk(n) { if (n > 0) return b(); return -1 }\nfunction b() { return ____ }\nprint(chk(1))', expect: '5', answer: '5', hint: 'b가 5' },
      { label: '깊이 4', ask: 'a→b→c→d. a()가 8이 되려면 d는?', code: 'function a() { return b() }\nfunction b() { return c() }\nfunction c() { return d() }\nfunction d() { return ____ }\nprint(a())', expect: '8', answer: '8', hint: 'd가 8' },
      { label: '중첩 2배', ask: 'd는 2배. d(d(?))가 12가 되려면 안쪽 인수는?', code: 'function d(n) { return n * 2 }\nprint(d(d(____)))', expect: '12', answer: '3', hint: '3→6→12' },
      { label: '두 함수 합', ask: 'a()+b()+? 가 10이 되게 (a=3, b=4)', code: 'function a() { return 3 }\nfunction b() { return 4 }\nprint(a() + b() + ____)', expect: '10', answer: '3', hint: '3+4+3' },
    ],
  }

  // ── 🧠 클로저(closure) : 인수 붙잡기·누적·독립 인스턴스 ──
  H['closure'] = {
    pattern: '🔴 어려움 · 안쪽 인수+붙잡은 값·누적·인스턴스는 독립',
    problems: [
      { label: '인수+붙잡기', ask: 'adder(5)의 5를 붙잡고 y도 받는다. add5(3)이 8이 되게 빈칸에 y', code: 'function adder(x) { return function (y) { return x + ____ } }\nlet add5 = adder(5)\nprint(add5(3))', expect: '8', answer: 'y', hint: '5 + 3' },
      { label: '3회 누적', ask: 'next를 세 번 불러 3이 나오게 매번 얼마씩 더할까?', code: 'function c() { let n = 0; return function () { return n = n + ____ } }\nlet next = c()\nnext()\nnext()\nprint(next())', expect: '3', answer: '1', hint: '1,2,3' },
      { label: '독립 인스턴스', ask: 'a·b는 별개 카운터. a를 두 번 불러도 b()는 1. b()+? 가 1이 되게 빈칸에 0', code: 'function c() { let n = 0; return function () { n++; return n } }\nlet a = c()\nlet b = c()\na()\na()\nprint(b() + ____)', expect: '1', answer: '0', hint: 'b는 a와 독립 → 1' },
      { label: '곱셈 팩토리', ask: 'mult(3)의 3을 붙잡는다. triple(4)가 12가 되게 빈칸에 n', code: 'function mult(n) { return function (x) { return x * ____ } }\nlet triple = mult(3)\nprint(triple(4))', expect: '12', answer: 'n', hint: 'x * n' },
      { label: '누적 합', ask: 'add(10) 뒤 add(20)이 30이 되게 — 인수를 채워라.', code: 'function acc() { let sum = 0; return function (x) { sum = sum + x; return sum } }\nlet add = acc()\nadd(10)\nprint(add(____))', expect: '30', answer: '20', hint: '10 + 20' },
    ],
  }

  // ── 🧠 가비지 컬렉션(gc) : 참조 유지 vs 끊김·재대입 고아 ──
  H['gc'] = {
    pattern: '🔴 어려움 · 참조가 남으면 산다·중첩 참조 유지·재대입 고아',
    problems: [
      { label: '한 참조 남으면', ask: 'a=null이어도 b가 가리켜 산다. b.v(1)를 꺼내려면?', code: 'let a = { v: 1 }\nlet b = a\na = null\nprint(b.____)', expect: '1', answer: 'v', hint: 'b.v' },
      { label: '둘 중 하나만', ask: 'x·y가 o를 가리킨다. x=null이어도 y로 n(9)을 꺼내려면?', code: 'let o = { n: 9 }\nlet x = o\nlet y = o\nx = null\nprint(y.____)', expect: '9', answer: 'n', hint: 'y가 아직 가리킴' },
      { label: '배열 요소 참조', ask: 'r이 arr[0]을 붙잡았다. arr=null이어도 r.v(5)를 꺼내려면?', code: 'let arr = [{ v: 5 }]\nlet r = arr[0]\narr = null\nprint(r.____)', expect: '5', answer: 'v', hint: 'r이 그 객체를 가리킴' },
      { label: '중첩 유지', ask: 'c가 root.child를 붙잡았다. root=null이어도 c.v(3)를 꺼내려면?', code: 'let root = { child: { v: 3 } }\nlet c = root.child\nroot = null\nprint(c.____)', expect: '3', answer: 'v', hint: 'c가 자식을 가리킴' },
      { label: '재대입 고아', ask: 'x를 새 객체로 바꾸면 옛 것은 고아. 지금 x.n(2)을 꺼내려면?', code: 'let x = { n: 1 }\nx = { n: 2 }\nprint(x.____)', expect: '2', answer: 'n', hint: 'x는 이제 {n:2}' },
    ],
  }

  // ── 🧬 클래스(class) : 인스턴스 독립·상속·instanceof·인스턴스도 그냥 객체 ──
  H['class'] = {
    pattern: '🔴 어려움 · 인스턴스는 각자 힙 객체(독립)·상속·instanceof·typeof',
    problems: [
      { label: '인스턴스 독립', ask: 'a·b는 각자 다른 객체. a.n=9로 바꿔도 b.n은?', code: 'class C { constructor() { this.n = 0 } }\nlet a = new C()\nlet b = new C()\na.n = 9\nprint(b.n === ____)', expect: 'true', answer: '0', hint: '각자 힙 객체 → b는 0',
        mem: { title: 'new 마다 힙에 새 객체 — a와 b는 다른 객체', stackLabel: '📇 이름표 장부', code: ['let a = new C()', 'let b = new C()', 'a.n = 9'], steps: [
          { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h2' }] }], heap: { h1: { label: 'C', fields: [{ key: 'n', value: '0' }] }, h2: { label: 'C', fields: [{ key: 'n', value: '0' }] } }, note: 'new 두 번 → <b>힙에 서로 다른 객체</b> h1, h2. a·b는 별칭이 아니다.' },
          { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h2' }] }], heap: { h1: { label: 'C', fields: [{ key: 'n', value: '9', bad: true }] }, h2: { label: 'C', fields: [{ key: 'n', value: '0' }] } }, note: '<code>a.n = 9</code>는 h1만 고침. <b>b(h2).n은 0 그대로</b>.' },
        ] } },
      { label: '상속(extends)', ask: 'B는 A를 물려받는다. new B().hi() 는?', code: 'class A { hi() { return "A" } }\nclass B extends A {}\nprint(new B().hi() === "____")', expect: 'true', answer: 'A', hint: '물려받은 hi()' },
      { label: '인스턴스 배열', ask: 'ds[1].name 은?', code: 'class D { constructor(n) { this.name = n } }\nlet ds = [new D("가"), new D("나")]\nprint(ds[1].name === "____")', expect: 'true', answer: '나', hint: '두 번째 인스턴스' },
      { label: 'instanceof', ask: 'c instanceof C 는?', code: 'class C {}\nlet c = new C()\nprint((c instanceof C) === ____)', expect: 'true', answer: 'true', hint: 'C로 만든 c' },
      { label: '그냥 객체', ask: 'typeof (new C()) 는? (인스턴스도 특별하지 않다)', code: 'class C {}\nprint((typeof (new C())) === "____")', expect: 'true', answer: 'object', hint: '인스턴스 = 그냥 객체' },
    ],
  }
})()
