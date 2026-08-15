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

  // ── 🧠 M1 램(ram) : typeof 함정·부동소수점·복사 독립 예측 ──
  H['ram'] = {
    pattern: '🔴 어려움 · typeof null=object·NaN=number·부동소수점·복사 독립',
    problems: [
      { label: 'typeof null', ask: 'null 의 typeof 는? (유명 버그)', code: 'print((typeof null) === "____")', expect: 'true', answer: 'object', hint: '오래된 버그 — object' },
      { label: 'typeof NaN', ask: 'NaN 의 typeof 는?', code: 'print((typeof NaN) === "____")', expect: 'true', answer: 'number', hint: '뜻밖에 number' },
      { label: '부동소수점', ask: '0.1 + 0.2 는 0.3 과 정확히 같은가?', code: 'print((0.1 + 0.2 === 0.3) === ____)', expect: 'true', answer: 'false', hint: '미세 오차로 다르다' },
      { label: '복사 두 값', ask: 'a=1,b=a,b=9 후 a + b 는? (a는 복사라 그대로)', code: 'let a = 1\nlet b = a\nb = 9\nprint((a + b) === ____)', expect: 'true', answer: '10', hint: 'a=1 + b=9' },
      { label: '복사 독립', ask: 'a=5,b=a,b=b+1 후 a는?', code: 'let a = 5\nlet b = a\nb = b + 1\nprint(a === ____)', expect: 'true', answer: '5', hint: 'b만 바뀜' },
    ],
  }

  // ── 🧠 M4-1 값=복사(ref) : 복사 vs 공유를 한 식에서 예측 ──
  H['ref'] = {
    pattern: '🔴 어려움 · 복사(원시)와 공유(객체)의 차이를 한 식에서 예측',
    problems: [
      { label: '복사 vs 공유', ask: 'b=a.v(복사), c=a(공유). c.v=9 후 b + c.v 는?', code: 'let a = { v: 1 }\nlet b = a.v\nlet c = a\nc.v = 9\nprint((b + c.v) === ____)', expect: 'true', answer: '10', hint: 'b=1(복사) + c.v=9(공유)',
        explain: 'b는 <code>a.v</code>를 <b>꺼내는 순간 값 1을 복사</b>해 독립 셀에 담는다. c는 <code>a</code> 자체라 <b>같은 객체를 공유</b>. 그래서 <code>c.v=9</code>는 b(1)엔 영향 없고 c.v만 9 → 1+9=10. <b>같은 =라도 원시는 복사, 객체는 공유</b>가 갈린다.', see: 'ref2', wiki: { label: '참조 (컴퓨터 과학)', url: 'https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)' } },
      { label: '복사는 그대로', ask: 'a=1,b=a,b=9. a === 1 인가?', code: 'let a = 1\nlet b = a\nb = 9\nprint((a === 1) === ____)', expect: 'true', answer: 'true', hint: 'a는 복사라 1' },
      { label: '함수도 복사', ask: '함수를 두 번 불러도 원본 a는?', code: 'function f(n) { n = 99 }\nlet a = 3\nf(a)\nf(a)\nprint(a === ____)', expect: 'true', answer: '3', hint: '복사본만 바뀜' },
      { label: '반환값 더하기', ask: 'a=4. inc(a) + a 는? (a는 안 변함)', code: 'function inc(n) { return n + 1 }\nlet a = 4\nprint((inc(a) + a) === ____)', expect: 'true', answer: '9', hint: '5 + 4' },
      { label: '문자 복사', ask: 't만 "bye"로 바꿔도 s는?', code: 'let s = "hi"\nlet t = s\nt = "bye"\nprint(s === "____")', expect: 'true', answer: 'hi', hint: 's는 그대로' },
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
    pattern: '🔴 어려움 · 함수 사슬·중첩 호출·지역 vs 전역·스코프 격리 예측',
    problems: [
      { label: '2배 사슬', ask: 'a는 b()의 2배, b()=5. a()는?', code: 'function a() { return b() * 2 }\nfunction b() { return 5 }\nprint(a() === ____)', expect: 'true', answer: '10', hint: '5 × 2' },
      { label: '중첩 호출', ask: 'f=+1. f(f(f(0)))은?', code: 'function f(n) { return n + 1 }\nprint(f(f(f(0))) === ____)', expect: 'true', answer: '3', hint: '0→1→2→3' },
      { label: '지역 vs 전역', ask: '함수 안 n=10, 밖 n=99. f() + 밖n 은?', code: 'let n = 99\nfunction f() { let n = 10; return n }\nprint((f() + n) === ____)', expect: 'true', answer: '109', hint: '10 + 99' },
      { label: '조기 반환', ask: 'f(-1)은? (양수면 "양", 아니면 "음")', code: 'function f(n) { if (n > 0) return "양"; return "음" }\nprint(f(-1) === "____")', expect: 'true', answer: '음', hint: '-1은 아래 return' },
      { label: '스코프 격리', ask: '함수 안 변수는 밖에서 안 보인다. 밖 n은?', code: 'let n = 5\nfunction f() { let n = 100 }\nf()\nprint(n === ____)', expect: 'true', answer: '5', hint: '안의 n=100은 밖과 무관' },
    ],
  }

  // ── 🧠 M3 힙(heap) : 공유 대비·깊은 중첩·동적 키 ──
  H['heap'] = {
    pattern: '🔴 어려움 · 힙 공유 vs 원시 복사·깊은 중첩·배열 별칭·삭제 예측',
    problems: [
      { label: '공유 vs 복사', ask: 'x=o.n(복사), a=o(공유). a.n=0 후 x + a.n 은?', code: 'let o = { n: 5 }\nlet a = o\nlet x = o.n\na.n = 0\nprint((x + a.n) === ____)', expect: 'true', answer: '5', hint: 'x=5(복사) + a.n=0(공유)' },
      { label: '깊은 중첩', ask: 'd.a.b.c 는?', code: 'let d = { a: { b: { c: 7 } } }\nprint(d.a.b.c === ____)', expect: 'true', answer: '7', hint: '끝까지 따라감' },
      { label: '배열 별칭', ask: 'b=a 배열 별칭. b.push(4) 후 a의 개수는?', code: 'let a = [1, 2, 3]\nlet b = a\nb.push(4)\nprint(a.length === ____)', expect: 'true', answer: '4', hint: '같은 배열 → a도 늘어남' },
      { label: '중첩 배열 객체', ask: 'o.list[1].v 는? {list:[{v:1},{v:2}]}', code: 'let o = { list: [{ v: 1 }, { v: 2 }] }\nprint(o.list[1].v === ____)', expect: 'true', answer: '2', hint: '두 번째 객체' },
      { label: '삭제', ask: 'delete o.a 후 o.a 는?', code: 'let o = { a: 1 }\ndelete o.a\nprint(o.a === ____)', expect: 'true', answer: 'undefined', hint: '지워진 키 = undefined' },
    ],
  }

  // ── 🧠 M5 값 전달(passval) : 원시는 반환해야 바뀐다 ──
  H['passval'] = {
    pattern: '🔴 어려움 · 원시값은 반환+재대입해야 바뀐다(원본은 여전히 안전)',
    problems: [
      { label: '반환+재대입', ask: '원시는 반환+재대입해야 바뀐다. a = dbl(a) 후 a는?', code: 'function dbl(n) { return n * 2 }\nlet a = 5\na = dbl(a)\nprint(a === ____)', expect: 'true', answer: '10', hint: 'a에 반환값을 다시 담아야' },
      { label: '원본 확인', ask: 'f가 0으로 해도 a === 7 인가?', code: 'function f(n) { n = 0 }\nlet a = 7\nf(a)\nprint((a === 7) === ____)', expect: 'true', answer: 'true', hint: '원본 안전' },
      { label: '두 번 전달', ask: 'f를 두 번 불러도 a는?', code: 'function f(n) { n = 99 }\nlet a = 3\nf(a)\nf(a)\nprint(a === ____)', expect: 'true', answer: '3', hint: '복사본만 바뀜' },
      { label: '문자 안전', ask: 'f가 "!"를 붙여도 t는?', code: 'function f(s) { s = s + "!" }\nlet t = "hi"\nf(t)\nprint(t === "____")', expect: 'true', answer: 'hi', hint: 't는 그대로' },
      { label: '반환값 더하기', ask: 'a=4. inc(a) + a 는? (a는 안 변함)', code: 'function inc(n) { return n + 1 }\nlet a = 4\nprint((inc(a) + a) === ____)', expect: 'true', answer: '9', hint: '5 + 4' },
    ],
  }

  // ── 🧠 M6 참조 전달(passobj) : 중첩·배열 속성·공유 참조 ──
  H['passobj'] = {
    pattern: '🔴 어려움 · 속성값(원시)만 넘기면 안전·매개변수 재대입은 안 샌다 — 함정',
    problems: [
      { label: '객체는 샌다', ask: '객체를 넘겨 속성을 바꾸면? z 후 d.c는?', code: 'function z(o) { o.c = 0 }\nlet d = { c: 5 }\nz(d)\nprint(d.c === ____)', expect: 'true', answer: '0', hint: '같은 객체 → 샌다' },
      { label: '속성값만 넘기면?', ask: '속성값(원시)만 넘기면 안전. f(d.n) 후 d.n은?', code: 'function f(x) { x = 0 }\nlet d = { n: 5 }\nf(d.n)\nprint(d.n === ____)', expect: 'true', answer: '5', hint: 'd.n의 값(5)이 복사됨 → 안전' },
      { label: '재대입은 안 샌다', ask: '매개변수를 새 객체로 재대입하면? f가 o={n:99}. d.n은?', code: 'function f(o) { o = { n: 99 } }\nlet d = { n: 5 }\nf(d)\nprint(d.n === ____)', expect: 'true', answer: '5', hint: 'o가 딴 객체를 가리킬 뿐 d와 무관' },
      { label: '중첩 변경', ask: 'f가 pet.name을 바꾸면 me.pet.name은?', code: 'function f(o) { o.pet.name = "루비" }\nlet me = { pet: { name: "콩이" } }\nf(me)\nprint(me.pet.name === "____")', expect: 'true', answer: '루비', hint: '중첩도 공유' },
      { label: '배열 속성', ask: 'f가 arr[0]=9로 하면 arr[0]은?', code: 'function f(a) { a[0] = 9 }\nlet arr = [1, 2]\nf(arr)\nprint(arr[0] === ____)', expect: 'true', answer: '9', hint: '같은 배열' },
    ],
  }

  // ── 🧠 M7 배열 전달(passarr) : 누적·요소 수정·map은 원본유지 ──
  H['passarr'] = {
    pattern: '🔴 어려움 · 여러 push·map은 원본 불변·재대입은 안 샌다 — 함정',
    problems: [
      { label: '두 번 호출', ask: 'f는 push(1). 두 번 부른 뒤 arr의 개수는?', code: 'function f(a) { a.push(1) }\nlet arr = [0]\nf(arr)\nf(arr)\nprint(arr.length === ____)', expect: 'true', answer: '3', hint: '1 + 2번 push' },
      { label: 'map은 원본유지', ask: 'f 안 map은 새 배열만 만든다. 원본 arr의 개수는?', code: 'function f(a) { a.map(x => x * 2) }\nlet arr = [1, 2]\nf(arr)\nprint(arr.length === ____)', expect: 'true', answer: '2', hint: 'map은 원본 안 바꿈' },
      { label: '재대입은 안 샌다', ask: '매개변수를 새 배열로 재대입하면? f가 a=[]. arr의 개수는?', code: 'function f(a) { a = [] }\nlet arr = [1, 2, 3]\nf(arr)\nprint(arr.length === ____)', expect: 'true', answer: '3', hint: 'a가 딴 배열을 가리킬 뿐' },
      { label: '별칭 전달', ask: 'ref는 arr의 별칭. f(ref) 후 arr의 개수는?', code: 'function f(a) { a.push(5) }\nlet arr = [1]\nlet ref = arr\nf(ref)\nprint(arr.length === ____)', expect: 'true', answer: '2', hint: 'ref·arr 같은 배열' },
      { label: '요소 수정', ask: 'f가 0번을 +1로 하면 arr[0]은?', code: 'function f(a) { a[0] = a[0] + 1 }\nlet arr = [9]\nf(arr)\nprint(arr[0] === ____)', expect: 'true', answer: '10', hint: '9 + 1' },
    ],
  }

  // ── 🕸️ G1 그래프(graph) : 두 갈래 공유 노드·깊은 경로·배열+객체 예측 ──
  H['graph'] = {
    pattern: '🔴 어려움 · 두 갈래가 한 노드 공유·깊은 경로·배열+객체 결과 예측',
    problems: [
      { label: '두 갈래 한 노드', ask: 'a.x와 b.y가 같은 n. a.x.v=9 후 b.y.v는?', code: 'let n = { v: 1 }\nlet a = { x: n }\nlet b = { y: n }\na.x.v = 9\nprint(b.y.v === ____)', expect: 'true', answer: '9', hint: 'a.x·b.y 같은 노드' },
      { label: '4단계 경로', ask: 'r.c.c.c.v 는?', code: 'let r = { c: { c: { c: { v: 7 } } } }\nprint(r.c.c.c.v === ____)', expect: 'true', answer: '7', hint: 'r.c.c.c.v' },
      { label: '공유 노드', ask: 'me.f=h(공유). me.f.hair 바꾸면 h.hair는?', code: 'let h = { hair: "긴" }\nlet me = { f: h }\nme.f.hair = "숏"\nprint(h.hair === "____")', expect: 'true', answer: '숏', hint: 'me.f = h(같은 노드)' },
      { label: '배열+객체 경로', ask: 'g.list[1].v 는?', code: 'let g = { list: [{ v: 1 }, { v: 2 }] }\nprint(g.list[1].v === ____)', expect: 'true', answer: '2', hint: 'g.list[1].v' },
      { label: '배열 안 이름', ask: 'd.items[0].name 은?', code: 'let d = { items: [{ name: "가" }] }\nprint(d.items[0].name === "____")', expect: 'true', answer: '가', hint: 'd.items[0].name' },
    ],
  }

  // ── 🕸️ G2 친구 목록(friends) : 공유 변경·map·filter·reduce 집계 예측 ──
  H['friends'] = {
    pattern: '🔴 어려움 · 배열 속 객체 공유 변경·map·filter·reduce 집계 예측',
    problems: [
      { label: '공유 변경', ask: 'arr[0]=a(공유). arr[0].hp=50 후 a.hp는?', code: 'let a = { hp: 100 }\nlet arr = [a]\narr[0].hp = 50\nprint(a.hp === ____)', expect: 'true', answer: '50', hint: 'arr[0] = a(같은 객체)' },
      { label: 'map으로 나이', ask: '나이만 뽑은 배열의 개수는?', code: 'let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.map(p => p.age).length === ____)', expect: 'true', answer: '2', hint: 'map 결과의 .length' },
      { label: 'filter로 세기', ask: '25살 초과는 몇 명?', code: 'let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.filter(p => p.age > 25).length === ____)', expect: 'true', answer: '1', hint: '30살 한 명' },
      { label: 'reduce 합', ask: '나이를 다 더하면?', code: 'let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.reduce((s, p) => s + p.age, 0) === ____)', expect: 'true', answer: '50', hint: '20 + 30' },
      { label: '중첩 배열', ask: 'g.members[0].n 은?', code: 'let g = { members: [{ n: "가" }] }\nprint(g.members[0].n === "____")', expect: 'true', answer: '가', hint: 'g.members[0].n' },
    ],
  }

  // ── 🕸️ G3 계통도(family) : 3대·좌우·부모 공유 결과 예측 ──
  H['family'] = {
    pattern: '🔴 어려움 · 3대 경로·좌우 자식·부모 노드 공유 결과 예측',
    problems: [
      { label: '3대', ask: 'me.parent.parent.name 은?', code: 'let g = { name: "할" }\nlet m = { parent: g }\nlet me = { parent: m }\nprint(me.parent.parent.name === "____")', expect: 'true', answer: '할', hint: 'me.parent.parent.name' },
      { label: '깊은 트리', ask: 't.l.l.l.v 는?', code: 'let t = { l: { l: { l: { v: 7 } } } }\nprint(t.l.l.l.v === ____)', expect: 'true', answer: '7', hint: 't.l.l.l.v' },
      { label: '오른쪽 값', ask: 'r.right.v 는?', code: 'let r = { left: { v: 1 }, right: { v: 2 } }\nprint(r.right.v === ____)', expect: 'true', answer: '2', hint: 'r.right.v' },
      { label: '부모 공유', ask: 'a.parent·b.parent가 같은 dad. a.parent.name 바꾸면 b.parent.name은?', code: 'let dad = { name: "아빠" }\nlet a = { parent: dad }\nlet b = { parent: dad }\na.parent.name = "X"\nprint(b.parent.name === "____")', expect: 'true', answer: 'X', hint: '같은 부모 노드' },
      { label: '자식 배열', ask: 'p.kids[1].name 은?', code: 'let p = { kids: [{ name: "첫" }, { name: "둘" }] }\nprint(p.kids[1].name === "____")', expect: 'true', answer: '둘', hint: 'p.kids[1].name' },
    ],
  }

  // ── 🕸️ G4 순환(cycle) : 두 단계 순환·순환 변경 결과 예측 ──
  H['cycle'] = {
    pattern: '🔴 어려움 · 순환을 두 단계 따라가기·순환 경로로 변경 결과 예측',
    problems: [
      { label: '왕복 두 단계', ask: 'a.to=b, b.to=a, a.v=1. b.to.v 는?', code: 'let a = {}\nlet b = {}\na.to = b\nb.to = a\na.v = 1\nprint(b.to.v === ____)', expect: 'true', answer: '1', hint: 'b.to = a' },
      { label: '순환 변경', ask: 'x.ref=y, y.ref=x. y.ref.n=9 후 x.n은?', code: 'let x = { n: 1 }\nlet y = { ref: x }\nx.ref = y\ny.ref.n = 9\nprint(x.n === ____)', expect: 'true', answer: '9', hint: 'y.ref = x' },
      { label: '자기순환 두 번', ask: 'n.self=n, n.v=5. n.self.self.v 는?', code: 'let n = { v: 5 }\nn.self = n\nprint(n.self.self.v === ____)', expect: 'true', answer: '5', hint: 'self.self도 n' },
      { label: '3자 순환', ask: 'a.next=b, b.next=a, a.id=1. a.next.next.id 는?', code: 'let a = { id: 1 }\nlet b = { id: 2 }\na.next = b\nb.next = a\nprint(a.next.next.id === ____)', expect: 'true', answer: '1', hint: 'a.next.next = a' },
      { label: '서로 이름', ask: 'p.peer=q, q.peer=p, p.name="P". p.peer.peer.name 은?', code: 'let p = { name: "P" }\nlet q = { name: "Q" }\np.peer = q\nq.peer = p\nprint(p.peer.peer.name === "____")', expect: 'true', answer: 'P', hint: 'p.peer.peer = p' },
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
