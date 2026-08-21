// 🟢 쉬움 드릴 (ADR 0008) — 예측 패턴 · 정답 시 설명/메모리 증명. 자동 생성.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const E = window.Drills.easy
  E["spread"] = {
    pattern: "🟢 쉬움 · { ...obj }·[ ...arr ]는 새 봉투/배열 — 원시는 값복사(독립) (=== true 면 정답)",
    problems: [
      {"label":"사본은 독립","ask":"{...p}로 사본을 만들고 사본 hp를 바꾸면 원본은?","code":"let p = { hp: 100 }\nlet c = { ...p }\nc.hp = 0\nprint(p.hp === ____)","expect":"true","answer":"100","hint":"새 봉투 — 원시 hp는 값복사(독립)","explain":"<code>{ ...p }</code>는 <b>새 봉투</b>. hp는 원시라 <b>값이 복사</b>돼 독립 — 사본을 바꿔도 <b>원본 p.hp는 100</b>.","see":"spread"},
      {"label":"덮어쓰기","ask":"{...p, hp: 50}에서 hp는?","code":"let p = { hp: 100, n: \"민지\" }\nlet c = { ...p, hp: 50 }\nprint(c.hp === ____)","expect":"true","answer":"50","hint":"뒤에 쓴 값이 이긴다","explain":"<code>{ ...p, hp: 50 }</code>은 p를 복사한 뒤 hp를 50으로 <b>덮어쓴다</b>(뒤 값 우선) → 50. 나머지 칸(n)은 그대로 복사."},
      {"label":"병합","ask":"두 객체를 합치면 칸 개수는?","code":"let a = { x: 1 }\nlet b = { y: 2 }\nlet m = { ...a, ...b }\nprint(Object.keys(m).length === ____)","expect":"true","answer":"2","hint":"x와 y 둘 다","explain":"<code>{ ...a, ...b }</code>는 두 봉투의 칸을 새 봉투에 모은다 → x, y 둘 → 길이 2."},
      {"label":"배열 사본","ask":"[...arr] 사본에 push하면 원본 개수는?","code":"let arr = [1, 2]\nlet c = [ ...arr ]\nc.push(9)\nprint(arr.length === ____)","expect":"true","answer":"2","hint":"새 배열 — 원본 그대로","explain":"<code>[ ...arr ]</code>는 <b>새 배열</b>. 사본에 push해도 <b>원본 arr은 2칸</b> 그대로.","see":"spread"},
      {"label":"배열 합치기","ask":"두 배열을 이어붙이면 길이는?","code":"let a = [1, 2]\nlet b = [3, 4, 5]\nlet m = [ ...a, ...b ]\nprint(m.length === ____)","expect":"true","answer":"5","hint":"2 + 3","explain":"<code>[ ...a, ...b ]</code>는 두 배열 원소를 새 배열에 펼쳐 담는다 → 2+3 = 5."}
    ]
  }
  E["objanat"] = {
    pattern: "🟢 쉬움 · 객체 봉투 속 속성을 읽고·바꾸고·세어 본다 (=== true 면 정답)",
    problems: [
      {"label":"속성 읽기","ask":"봉투 안 age를 읽으면?","code":"let p = { age: 20 }\nprint(p.age === ____)","expect":"true","answer":"20","hint":"점(.)으로 봉투 안 값을 꺼낸다","explain":"<code>p.age</code>는 p 봉투 안 <b>age 칸의 값</b>을 꺼낸다 → 20.","see":"objanat"},
      {"label":"속성 바꾸기","ask":"p.hp를 50으로 바꾸면 p.hp는?","code":"let p = { hp: 100 }\np.hp = 50\nprint(p.hp === ____)","expect":"true","answer":"50","hint":"봉투 안 hp 칸을 덮어쓴다","explain":"<code>p.hp = 50</code>은 봉투 안 hp 칸을 <b>50으로 고친다</b> → 50."},
      {"label":"없는 속성","ask":"봉투에 없는 칸을 읽으면? (에러 아님!)","code":"let p = { n: 1 }\nprint((p.zzz === undefined) === ____)","expect":"true","answer":"true","hint":"없는 칸 = undefined (에러 아니다)","explain":"객체에 <b>없는 속성</b>을 읽으면 에러가 아니라 <code>undefined</code>다 — 6강 배열 칸 밖과 같은 규칙.","see":"objanat"},
      {"label":"속성 개수","ask":"봉투 안 칸이 몇 개?","code":"let p = { a: 1, b: 2, c: 3 }\nprint(Object.keys(p).length === ____)","expect":"true","answer":"3","hint":"키(칸) 3개","explain":"<code>Object.keys(p)</code>는 봉투 안 <b>칸 이름 목록</b>을 준다 → 길이 3."},
      {"label":"새 칸 넣기","ask":"빈 봉투에 name을 넣으면?","code":"let p = {}\np.name = \"민지\"\nprint(p.name === \"____\")","expect":"true","answer":"민지","hint":"없던 칸도 대입하면 생긴다","explain":"없던 속성도 <code>p.name = ...</code>로 대입하면 봉투에 <b>칸이 새로 생긴다</b> → \"민지\"."}
    ]
  }
  E["1"] = {
    pattern: "🟢 쉬움 · 값의 타입·계산 결과를 스스로 예측해 채운다 (=== true 면 정답)",
    problems: [
      {"label":"숫자의 타입","ask":"숫자 24의 타입 이름은? (typeof 결과)","code":"print((typeof 24) === \"____\")","expect":"true","answer":"number","hint":"숫자 = number","explain":"<b>typeof</b>는 값의 종류 이름을 준다. 숫자는 <code>\"number\"</code>.","see":"builtins"},
      {"label":"글자의 타입","ask":"글자 \"안녕\"의 타입 이름은?","code":"print((typeof \"안녕\") === \"____\")","expect":"true","answer":"string","hint":"글자 = string","explain":"따옴표로 감싼 값은 <b>문자열</b> → <code>\"string\"</code>.","see":"builtins"},
      {"label":"참거짓의 타입","ask":"참/거짓 값의 타입 이름은?","code":"print((typeof true) === \"____\")","expect":"true","answer":"boolean","hint":"참거짓 = boolean","explain":"<code>true</code>·<code>false</code>는 <b>불리언</b> → <code>\"boolean\"</code>.","see":"builtins"},
      {"label":"재할당 결과","ask":"x = 10 다음 x = x + 5 를 하면 x는?","code":"let x = 10\nx = x + 5\nprint(x === ____)","expect":"true","answer":"15","hint":"10 + 5","explain":"<code>x = x + 5</code>는 <b>지금 x의 값(10)에 5를 더한 15</b>를 다시 x에 담는다."},
      {"label":"복사는 독립","ask":"a를 복사해 b를 만들고 b만 9로 바꾸면 a는?","code":"let a = 5\nlet b = a\nb = 9\nprint(a === ____)","expect":"true","answer":"5","hint":"원시값 복사 → a는 그대로","explain":"원시값은 <code>=</code>로 넘길 때 <b>값을 복제</b>한다. b를 바꿔도 a의 셀은 그대로 10."}
    ],
  }
  E["2"] = {
    pattern: "🟢 쉬움 · 이어붙이기·템플릿의 결과를 스스로 예측",
    problems: [
      {"label":"숫자 덧셈","ask":"3 + 4 는?","code":"print((3 + 4) === ____)","expect":"true","answer":"7","hint":"둘 다 숫자 → 계산","explain":"둘 다 숫자라 <b>산술 덧셈</b> → 7."},
      {"label":"글자+숫자","ask":"\"3\" + 4 는? (글자+숫자)","code":"print((\"3\" + 4) === \"____\")","expect":"true","answer":"34","hint":"글자로 이어붙임 → \"34\"","explain":"<code>+</code>에 글자가 끼면 <b>이어붙이기</b> → 숫자 4가 문자로 → <code>\"34\"</code>."},
      {"label":"글자+글자","ask":"\"가\" + \"나\" 는?","code":"print((\"가\" + \"나\") === \"____\")","expect":"true","answer":"가나","hint":"이어붙이기","explain":"문자열끼리 <code>+</code>는 이어붙이기 → <code>\"가나\"</code>."},
      {"label":"템플릿","ask":"n이 5일 때 `${n}점` 은?","code":"let n = 5\nprint((`${n}점`) === \"____\")","expect":"true","answer":"5점","hint":"${n} 자리에 5","explain":"템플릿 <code>${n}</code> 자리에 n의 값 5가 끼워진다 → <code>\"5점\"</code>."},
      {"label":"두 글자","ask":"\"ab\" + \"cd\" 는?","code":"print((\"ab\" + \"cd\") === \"____\")","expect":"true","answer":"abcd","hint":"이어붙이기","explain":"이어붙여 <code>\"abcd\"</code>."}
    ],
  }
  E["3"] = {
    pattern: "🟢 쉬움 · 식을 축약한 결과값을 빈칸에 (=== true 면 정답) — 우선순위 기본",
    problems: [
      {"label":"곱셈 먼저","ask":"2 + 3 * 4 는 얼마로 축약될까요? (곱셈 먼저!)","code":"print((2 + 3 * 4) === ____)","expect":"true","answer":"14","hint":"3*4=12, +2 → 14","explain":"곱셈이 덧셈보다 먼저 → <code>3*4=12</code>, <code>+2=14</code>."},
      {"label":"괄호가 먼저","ask":"(2 + 3) * 4 는? (괄호가 덧셈을 먼저로)","code":"print(((2 + 3) * 4) === ____)","expect":"true","answer":"20","hint":"(5)*4 → 20","explain":"괄호가 최우선 → <code>(2+3)=5</code>, <code>*4=20</code>."},
      {"label":"좌결합","ask":"10 - 2 - 3 은? (뺄셈은 왼쪽부터)","code":"print((10 - 2 - 3) === ____)","expect":"true","answer":"5","hint":"(10-2)-3 → 5","explain":"같은 우선순위는 <b>왼쪽부터</b> → <code>(10-2)-3=5</code>."},
      {"label":"두 항(term)","ask":"2 * 3 + 4 * 5 는? (곱셈 둘 먼저)","code":"print((2 * 3 + 4 * 5) === ____)","expect":"true","answer":"26","hint":"6 + 20 → 26","explain":"곱셈 둘이 먼저 → <code>6</code>과 <code>20</code>, 더해 26."},
      {"label":"섞인 식","ask":"5 + 2 * 3 은?","code":"print((5 + 2 * 3) === ____)","expect":"true","answer":"11","hint":"2*3 먼저 → 5+6","explain":"곱셈 먼저 → <code>2*3=6</code>, <code>5+6=11</code>."}
    ],
  }
  E["4"] = {
    pattern: "🟢 쉬움 · 비교의 결과(참/거짓)를 스스로 계산해 채운다 (=== true 면 정답)",
    problems: [
      {"label":"10 > 5","ask":"10은 5보다 큰가? 결과(참/거짓)를 넣어라.","code":"print((10 > 5) === ____)","expect":"true","answer":"true","hint":"참이면 true","explain":"10은 5보다 크다 → 참."},
      {"label":"3 >= 3","ask":"3은 3보다 크거나 같은가? (>= 에 주의)","code":"print((3 >= 3) === ____)","expect":"true","answer":"true","hint":"같아도 >= 는 참","explain":"<code>&gt;=</code>는 \"크거나 <b>같음</b>\"도 참 → true."},
      {"label":"5 !== 5","ask":"5와 5는 서로 \"다른가\"? (!== = 다름)","code":"print((5 !== 5) === ____)","expect":"true","answer":"false","hint":"같으니 \"다르다\"는 거짓","explain":"5와 5는 같으니 \"<b>다르다</b>(!==)\"는 거짓."},
      {"label":"\"5\" === 5","ask":"문자 \"5\"와 숫자 5는 (타입까지 보는 ===로) 같은가?","code":"print((\"5\" === 5) === ____)","expect":"true","answer":"false","hint":"타입이 달라 false","explain":"<code>===</code>는 <b>타입까지</b> 본다. 문자 \"5\"≠숫자 5 → false."},
      {"label":"7 <= 10","ask":"7은 10보다 작거나 같은가?","code":"print((7 <= 10) === ____)","expect":"true","answer":"true","hint":"참","explain":"7은 10보다 작거나 같다 → 참."}
    ],
  }
  E["5"] = {
    pattern: "🟢 쉬움 · 함수를 부르면 무엇이 돌아오는지 예측",
    problems: [
      {"label":"두 인수 합","ask":"add는 두 인수를 더한다. add(2, 3)은?","code":"function add(a, b) { return a + b }\nprint(add(2, 3) === ____)","expect":"true","answer":"5","hint":"2 + 3","explain":"함수는 입력→처리→<b>출력(return)</b> → <code>2+3=5</code>."},
      {"label":"2배","ask":"dbl은 2배. dbl(4)는?","code":"function dbl(n) { return n * 2 }\nprint(dbl(4) === ____)","expect":"true","answer":"8","hint":"4 × 2","explain":"인수 4가 매개변수 n에 담겨 <code>4*2=8</code>."},
      {"label":"문자 반환","ask":"greet는 이름에 \"님\"을 붙인다. greet(\"z\")는?","code":"function greet(n) { return n + \"님\" }\nprint(greet(\"z\") === \"____\")","expect":"true","answer":"z님","hint":"\"z\" + \"님\"","explain":"받은 <code>\"z\"</code>에 <code>\"님\"</code>을 이어붙여 반환."},
      {"label":"제곱","ask":"sq는 제곱. sq(5)는?","code":"function sq(x) { return x * x }\nprint(sq(5) === ____)","expect":"true","answer":"25","hint":"5 × 5","explain":"<code>5*5=25</code>를 돌려준다."},
      {"label":"return 없으면","ask":"return이 없는 함수는 무엇을 돌려주나?","code":"function f() { let x = 1 }\nprint(f() === ____)","expect":"true","answer":"undefined","hint":"돌려줄 게 없으면 undefined","explain":"<code>return</code>이 없으면 함수는 <b>undefined</b>를 돌려준다."}
    ],
  }
  E["6"] = {
    pattern: "🟢 쉬움 · 개수·인덱스·push 결과를 스스로 예측",
    problems: [
      {"label":"개수","ask":"[1,2,3,4] 의 요소 개수는?","code":"let a = [1, 2, 3, 4]\nprint(a.length === ____)","expect":"true","answer":"4","hint":"세어 본다","explain":"<code>.length</code>는 요소 개수 → 4."},
      {"label":"번호 1","ask":"[10,20,30] 에서 번호 1(두 번째) 요소는?","code":"let a = [10, 20, 30]\nprint(a[1] === ____)","expect":"true","answer":"20","hint":"0,1,2 → 1은 두 번째","explain":"번호는 <b>0부터</b> → 1번은 두 번째 20."},
      {"label":"빈 배열","ask":"빈 배열의 요소 개수는?","code":"let a = []\nprint(a.length === ____)","expect":"true","answer":"0","hint":"없으면 0","explain":"요소가 없으면 개수 0."},
      {"label":"push 후 개수","ask":"3개짜리 배열에 하나 push하면 개수는?","code":"let a = [5, 6, 7]\na.push(8)\nprint(a.length === ____)","expect":"true","answer":"4","hint":"3 + 1","explain":"<code>push</code>는 끝에 하나 추가 → <code>3+1=4</code>."},
      {"label":"마지막","ask":"[1,2,3] 의 마지막 요소는?","code":"let a = [1, 2, 3]\nprint(a[a.length - 1] === ____)","expect":"true","answer":"3","hint":"length-1 번","explain":"마지막 번호는 <code>length-1</code> → <code>a[2]=3</code>."}
    ],
  }
  E["7"] = {
    pattern: "🟢 쉬움 · map·filter·reduce·forEach의 결과를 스스로 예측",
    problems: [
      {"label":"map 첫 요소","ask":"각 요소를 2배 한 배열의 첫 요소는?","code":"print([1, 2, 3].map(x => x * 2)[0] === ____)","expect":"true","answer":"2","hint":"1 × 2","explain":"<code>map</code>은 각 요소를 변환한 새 배열 → 첫 요소 <code>1*2=2</code>."},
      {"label":"map 마지막","ask":"각 요소에 +1 한 배열의 마지막 요소는?","code":"print([1, 2, 3].map(x => x + 1)[2] === ____)","expect":"true","answer":"4","hint":"3 + 1","explain":"각 요소 +1 → 마지막 <code>3+1=4</code>."},
      {"label":"filter 개수","ask":"2보다 큰 것만 거른 배열의 개수는?","code":"print([1, 2, 3, 4].filter(x => x > 2).length === ____)","expect":"true","answer":"2","hint":"3,4 → 2개","explain":"<code>filter</code>는 조건 맞는 것만 → 3,4 두 개."},
      {"label":"reduce 합","ask":"[10,20,30] 을 다 더하면?","code":"print([10, 20, 30].reduce((a, b) => a + b, 0) === ____)","expect":"true","answer":"60","hint":"10+20+30","explain":"<code>reduce</code>로 누적 합 → <code>10+20+30=60</code>."},
      {"label":"forEach 합","ask":"forEach로 sum에 다 더하면?","code":"let sum = 0\nlet nums = [1, 2, 3]\nnums.forEach(x => sum = sum + x)\nprint(sum === ____)","expect":"true","answer":"6","hint":"1+2+3","explain":"<code>forEach</code>로 sum에 하나씩 더해 <code>1+2+3=6</code>."}
    ],
  }
  E["8"] = {
    pattern: "🟢 쉬움 · 객체에서 점(.)으로 꺼낸 값을 예측",
    problems: [
      {"label":"점으로 꺼내기","ask":"u.age 는?","code":"let u = { age: 24 }\nprint(u.age === ____)","expect":"true","answer":"24","hint":"age 값","explain":"<code>obj.키</code>로 그 속성 값을 꺼낸다 → 24."},
      {"label":"다른 속성","ask":"car.brand 는?","code":"let car = { brand: \"기아\", year: 2020 }\nprint(car.brand === \"____\")","expect":"true","answer":"기아","hint":"brand 값","explain":"<code>car.brand</code> → <code>\"기아\"</code>."},
      {"label":"값 바꾸기","ask":"바꾼 뒤 u.hp 는?","code":"let u = { hp: 100 }\nu.hp = 50\nprint(u.hp === ____)","expect":"true","answer":"50","hint":"방금 넣은 값","explain":"<code>u.hp = 50</code>으로 덮어써 50."},
      {"label":"속성 추가","ask":"추가한 뒤 o.color 는?","code":"let o = {}\no.color = \"빨강\"\nprint(o.color === \"____\")","expect":"true","answer":"빨강","hint":"방금 추가한 값","explain":"없던 속성도 <code>=</code>로 <b>새로 추가</b>된다."},
      {"label":"없는 키","ask":"u엔 name만 있다. u.age 는?","code":"let u = { name: \"민지\" }\nprint(u.age === ____)","expect":"true","answer":"undefined","hint":"없는 키 = undefined","explain":"<b>없는 키</b>를 꺼내면 에러가 아니라 <code>undefined</code>."}
    ],
  }
  E["9"] = {
    pattern: "🟢 쉬움 · textContent·style·className·id를 바꾼 뒤 그 값을 예측",
    problems: [
      {"label":"글자","ask":"el.textContent 는?","code":"let el = document.createElement(\"div\")\nel.textContent = \"안녕\"\nprint(el.textContent === \"____\")","expect":"true","answer":"안녕","hint":"방금 넣은 글자","explain":"<code>textContent</code>에 넣은 글자를 그대로 읽는다."},
      {"label":"색","ask":"el.style.color 는?","code":"let el = document.createElement(\"div\")\nel.style.color = \"red\"\nprint(el.style.color === \"____\")","expect":"true","answer":"red","hint":"방금 정한 색","explain":"<code>style.color</code>에 정한 색을 읽는다."},
      {"label":"클래스","ask":"el.className 는?","code":"let el = document.createElement(\"div\")\nel.className = \"on\"\nprint(el.className === \"____\")","expect":"true","answer":"on","hint":"방금 정한 클래스","explain":"<code>className</code>에 정한 클래스를 읽는다."},
      {"label":"아이디","ask":"el.id 는?","code":"let el = document.createElement(\"div\")\nel.id = \"title\"\nprint(el.id === \"____\")","expect":"true","answer":"title","hint":"방금 정한 id","explain":"<code>id</code>에 정한 값을 읽는다."},
      {"label":"붙인 개수","ask":"span 하나를 붙이면 자식 개수는?","code":"let box2 = document.createElement(\"div\")\nbox2.append(document.createElement(\"span\"))\nprint(box2.children.length === ____)","expect":"true","answer":"1","hint":"하나 붙임","explain":"<code>append</code>로 자식 하나 붙여 <code>children.length=1</code>."}
    ],
  }
  E["10"] = {
    pattern: "🟢 쉬움 · 값·문자열·배열·객체·함수·DOM의 결과를 한 문제씩 예측",
    problems: [
      {"label":"값·문자열","ask":"name=\"민지\"일 때 \"안녕, \" + name + \"님\" 은?","code":"let name = \"민지\"\nprint((\"안녕, \" + name + \"님\") === \"____\")","expect":"true","answer":"안녕, 민지님","hint":"이어붙이기","explain":"변수 name을 문장에 이어붙여 <code>\"안녕, 민지님\"</code>."},
      {"label":"배열 개수","ask":"users의 개수는?","code":"let users = [\"민지\", \"지훈\", \"서연\"]\nprint(users.length === ____)","expect":"true","answer":"3","hint":"세 명","explain":"<code>.length</code>로 사람 수 3."},
      {"label":"객체 속성","ask":"p.name + \"는 \" + p.age + \"살\" 은?","code":"let p = { name: \"콩이\", age: 3 }\nprint((p.name + \"는 \" + p.age + \"살\") === \"____\")","expect":"true","answer":"콩이는 3살","hint":"속성을 이어붙임","explain":"속성을 이어붙여 <code>\"콩이는 3살\"</code>."},
      {"label":"DOM 글자","ask":"el.textContent 는?","code":"let el = document.createElement(\"div\")\nel.textContent = \"명함\"\nprint(el.textContent === \"____\")","expect":"true","answer":"명함","hint":"방금 넣은 글자","explain":"<code>textContent</code>에 넣은 글자 그대로."},
      {"label":"함수 반환","ask":"greet(\"지훈\") 은?","code":"function greet(n) { return n + \"님 환영!\" }\nprint(greet(\"지훈\") === \"____\")","expect":"true","answer":"지훈님 환영!","hint":"n + \"님 환영!\"","explain":"받은 이름에 <code>\"님 환영!\"</code>을 붙여 반환."}
    ],
  }
  E["ram"] = {
    pattern: "🟢 쉬움 · 재할당·복사 독립·typeof 결과를 스스로 예측",
    problems: [
      {"label":"재할당","ask":"x=10 다음 x=x+5 하면 x는?","code":"let x = 10\nx = x + 5\nprint(x === ____)","expect":"true","answer":"15","hint":"10 + 5","explain":"<code>x=x+5</code>는 현재 10에 5를 더한 15를 다시 담는다."},
      {"label":"숫자 타입","ask":"숫자 값의 타입 이름은?","code":"print((typeof 99) === \"____\")","expect":"true","answer":"number","hint":"숫자 = number","explain":"숫자의 타입 이름은 <code>\"number\"</code>.","see":"builtins"},
      {"label":"복사는 독립","ask":"b를 99로 바꿔도 a는? (b=a로 복사한 뒤)","code":"let a = 10\nlet b = a\nb = 99\nprint(a === ____)","expect":"true","answer":"10","hint":"원시값은 복사 → a는 그대로","explain":"원시값(숫자·문자·불리언)은 <code>=</code>로 넘길 때 <b>값을 각자 셀에 복제</b>한다. 그래서 b의 셀을 99로 바꿔도 a의 셀은 10 그대로. (만약 객체였다면 <b>주소를 공유</b>해 함께 바뀐다 — M4-2 참조=공유.)","see":"ref2","wiki":{"label":"원시 자료형","url":"https://ko.wikipedia.org/wiki/원시_자료형"},"mem":{"title":"왜 a는 10 그대로인가 — 원시값은 각자 셀로 복사","stackLabel":"📇 이름표 장부","code":["let a = 10","let b = a","b = 99"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"a","value":"10"},{"name":"b","value":"10"}]}],"heap":{},"note":"<code>let b = a</code> → 값 10을 <b>b의 셀에 복제</b>. a·b는 <b>각자 셀</b>(별개)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","value":"10"},{"name":"b","value":"99","bad":true}]}],"heap":{},"note":"<code>b = 99</code>는 <b>b의 셀만</b> 바꾼다. <b>a는 10 그대로</b> — 서로 독립."}]}},
      {"label":"null","ask":"memo를 \"일부러 비움\"으로 만들면? (0이나 빈 글자 말고)","code":"let memo = \"메모\"\nmemo = null\nprint(memo === ____)","expect":"true","answer":"null","hint":"의도적 빈 값","explain":"<code>null</code>은 \"<b>일부러 비움</b>\"을 뜻하는 값. (undefined=아직 없음과 구분)"},
      {"label":"글자 타입","ask":"글자 값의 타입 이름은?","code":"print((typeof \"hi\") === \"____\")","expect":"true","answer":"string","hint":"글자 = string","explain":"글자의 타입 이름은 <code>\"string\"</code>.","see":"builtins"}
    ],
  }
  E["ref"] = {
    pattern: "🟢 쉬움 · 원시값은 복사 — 한쪽을 바꾼 뒤 원본이 어떻게 되는지 예측",
    problems: [
      {"label":"y 바꾸면 x는?","ask":"y=x 로 복사한 뒤 y=99 하면 x는?","code":"let x = 10\nlet y = x\ny = 99\nprint(x === ____)","expect":"true","answer":"10","hint":"복사라 x는 그대로","explain":"<b>원시값 복사</b> → y를 바꿔도 x는 10.","see":"ref2","wiki":{"label":"원시 자료형","url":"https://ko.wikipedia.org/wiki/원시_자료형"},"mem":{"title":"y만 바뀌고 x는 그대로 — 원시값은 각자 셀로 복사","stackLabel":"📇 이름표 장부","code":["let x = 10","let y = x","y = 99"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"x","value":"10"},{"name":"y","value":"10"}]}],"heap":{},"note":"복사 → x·y가 <b>각자 셀</b>(값 10)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"x","value":"10"},{"name":"y","value":"99","bad":true}]}],"heap":{},"note":"<code>y=99</code>는 <b>y의 셀만</b> 바꾼다. <b>x는 10 그대로</b>."}]}},
      {"label":"a 바꾸면 b는?","ask":"b=a 로 복사한 뒤 a=100 하면 b는?","code":"let a = 5\nlet b = a\na = 100\nprint(b === ____)","expect":"true","answer":"5","hint":"b는 자기 값 그대로","explain":"b는 자기 셀(5) → a를 바꿔도 그대로.","mem":{"title":"a만 바뀌고 b는 그대로 — 원시값은 각자 셀로 복사","stackLabel":"📇 이름표 장부","code":["let b = 5","let a = b","a = 100"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"b","value":"5"},{"name":"a","value":"5"}]}],"heap":{},"note":"복사 → b·a가 <b>각자 셀</b>(값 5)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"b","value":"5"},{"name":"a","value":"100","bad":true}]}],"heap":{},"note":"<code>a=100</code>는 <b>a의 셀만</b> 바꾼다. <b>b는 5 그대로</b>."}]}},
      {"label":"돈 바꾸면?","ask":"money2=money1 뒤 money2=0 하면 money1은?","code":"let money1 = 200\nlet money2 = money1\nmoney2 = 0\nprint(money1 === ____)","expect":"true","answer":"200","hint":"복사 → money1 그대로","explain":"숫자는 복사 → money1은 200 안전.","mem":{"title":"money2만 바뀌고 money1는 그대로 — 원시값은 각자 셀로 복사","stackLabel":"📇 이름표 장부","code":["let money1 = 200","let money2 = money1","money2 = 0"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"money1","value":"200"},{"name":"money2","value":"200"}]}],"heap":{},"note":"복사 → money1·money2가 <b>각자 셀</b>(값 200)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"money1","value":"200"},{"name":"money2","value":"0","bad":true}]}],"heap":{},"note":"<code>money2=0</code>는 <b>money2의 셀만</b> 바꾼다. <b>money1는 200 그대로</b>."}]}},
      {"label":"글자 바꾸면?","ask":"s2=s1 뒤 s2=\"어피치\" 하면 s1은?","code":"let s1 = \"무지\"\nlet s2 = s1\ns2 = \"어피치\"\nprint(s1 === \"____\")","expect":"true","answer":"무지","hint":"문자열도 복사","explain":"문자열도 복사 → s1은 <code>\"무지\"</code>.","mem":{"title":"s2만 바뀌고 s1는 그대로 — 원시값은 각자 셀로 복사","stackLabel":"📇 이름표 장부","code":["let s1 = \"무지\"","let s2 = s1","s2 = \"어피치\""],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"s1","value":"\"무지\""},{"name":"s2","value":"\"무지\""}]}],"heap":{},"note":"복사 → s1·s2가 <b>각자 셀</b>(값 \"무지\")."},{"line":2,"stack":[{"name":"main","slots":[{"name":"s1","value":"\"무지\""},{"name":"s2","value":"\"어피치\"","bad":true}]}],"heap":{},"note":"<code>s2=\"어피치\"</code>는 <b>s2의 셀만</b> 바꾼다. <b>s1는 \"무지\" 그대로</b>."}]}},
      {"label":"꺼낸 값 바꾸면?","ask":"a.num을 꺼낸 b를 20으로 바꾸면 a.num은?","code":"let a = { num: 10 }\nlet b = a.num\nb = 20\nprint(a.num === ____)","expect":"true","answer":"10","hint":"꺼낼 때 복사","explain":"<code>a.num</code>을 꺼낼 때 <b>값을 복사</b> → a.num은 10."}
    ],
  }
  E["ref2"] = {
    pattern: "🟢 쉬움 · 별칭(같은 객체)으로 바꾼 뒤, 원본이 어떻게 되는지 예측 (맞히면 메모리로 왜 그런지 확인)",
    problems: [
      {"label":"별칭 변경","ask":"b는 a와 같은 객체다. b.n을 9로 바꾸면 a.n은?","code":"let a = { n: 1 }\nlet b = a\nb.n = 9\nprint(a.n === ____)","expect":"true","answer":"9","hint":"같은 객체라 a.n도 바뀐다","explain":"b는 a의 별칭(같은 힙 객체) → b.n을 바꾸면 a.n도 9.","see":"ref2","wiki":{"label":"참조 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)"},"mem":{"title":"왜 a.n도 9인가 — b는 a의 별칭(같은 힙 객체)","stackLabel":"📇 이름표 장부","code":["let a = { n: 1 }","let b = a","b.n = 9"],"steps":[{"line":0,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"n","value":"1"}]}},"note":"a는 힙 객체 h1을 가리킨다."},{"line":1,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"n","value":"1"}]}},"note":"<code>let b = a</code> → 주소만 복사 → b도 <b>같은 h1</b>(별칭)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"n","value":"9","bad":true}]}},"note":"<code>b.n = 9</code>는 h1을 고친다. a도 같은 h1이라 <b>a.n도 9</b>."}]}},
      {"label":"hp 깎기","ask":"p2는 p1과 같은 객체. p2.hp를 50으로 깎으면 p1.hp는?","code":"let p1 = { hp: 100 }\nlet p2 = p1\np2.hp = 50\nprint(p1.hp === ____)","expect":"true","answer":"50","hint":"같은 객체","explain":"p1·p2 같은 객체 → 50.","mem":{"title":"왜 p1.hp도 50인가 — p2는 p1의 별칭","stackLabel":"📇 이름표 장부","code":["let p1 = { hp: 100 }","let p2 = p1","p2.hp = 50"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"p1","ref":"h1"},{"name":"p2","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]}},"note":"p1·p2가 <b>같은 h1</b>을 가리킨다(별칭)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"p1","ref":"h1"},{"name":"p2","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"50","bad":true}]}},"note":"<code>p2.hp = 50</code> → h1을 고침 → <b>p1.hp도 50</b>."}]}},
      {"label":"배열 별칭","ask":"c는 arr과 같은 배열. c에 하나 push하면 원본 arr 개수는?","code":"let arr = [1, 2]\nlet c = arr\nc.push(9)\nprint(arr.length === ____)","expect":"true","answer":"3","hint":"같은 배열 → 함께 늘어남","explain":"<b>배열도 참조</b> → 같은 배열이라 arr도 늘어 3."},
      {"label":"이름 변경","ask":"r은 u와 같은 객체. r.name을 \"지훈\"으로 바꾸면 u.name은?","code":"let u = { name: \"민지\" }\nlet r = u\nr.name = \"지훈\"\nprint(u.name === \"____\")","expect":"true","answer":"지훈","hint":"같은 객체","explain":"u·r 같은 객체 → <code>\"지훈\"</code>.","mem":{"title":"왜 u.name도 \"지훈\"인가 — r은 u의 별칭","stackLabel":"📇 이름표 장부","code":["let u = { name: \"민지\" }","let r = u","r.name = \"지훈\""],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"},{"name":"r","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"name","value":"\"민지\""}]}},"note":"u·r이 <b>같은 h1</b>(별칭)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"},{"name":"r","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"name","value":"\"지훈\"","bad":true}]}},"note":"<code>r.name = \"지훈\"</code> → h1을 고침 → <b>u.name도 \"지훈\"</b>."}]}},
      {"label":"v 변경","ask":"y는 x와 같은 객체. y.v를 5로 바꾸면 x.v는?","code":"let x = { v: 1 }\nlet y = x\ny.v = 5\nprint(x.v === ____)","expect":"true","answer":"5","hint":"같은 객체","explain":"x·y 같은 객체 → 5.","mem":{"title":"왜 x.v도 5인가 — y는 x의 별칭","stackLabel":"📇 이름표 장부","code":["let x = { v: 1 }","let y = x","y.v = 5"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"x","ref":"h1"},{"name":"y","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"1"}]}},"note":"x·y가 <b>같은 h1</b>(별칭)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"x","ref":"h1"},{"name":"y","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"5","bad":true}]}},"note":"<code>y.v = 5</code> → h1을 고침 → <b>x.v도 5</b>."}]}}
    ],
  }
  E["stack"] = {
    pattern: "🟢 쉬움 · 함수를 부르면 무엇이 돌아오는지 예측",
    problems: [
      {"label":"합 반환","ask":"add(3, 4)는?","code":"function add(a, b) { return a + b }\nprint(add(3, 4) === ____)","expect":"true","answer":"7","hint":"3 + 4","explain":"두 매개변수를 더해 <code>3+4=7</code>."},
      {"label":"지역변수 반환","ask":"f는 지역변수 n을 돌려준다. f()는?","code":"function f() { let n = 10; return n }\nprint(f() === ____)","expect":"true","answer":"10","hint":"안의 n","explain":"지역변수 n(10)을 반환."},
      {"label":"세금","ask":"tax는 10%를 더한다. tax(100)은?","code":"function tax(p) { return p + p * 0.1 }\nprint(tax(100) === ____)","expect":"true","answer":"110","hint":"100 + 10","explain":"<code>100 + 100*0.1 = 110</code>."},
      {"label":"배수","ask":"twice(6)은?","code":"function twice(n) { return n * 2 }\nprint(twice(6) === ____)","expect":"true","answer":"12","hint":"6 × 2","explain":"<code>6*2=12</code>."},
      {"label":"문자 반환","ask":"name()은?","code":"function name() { return \"토끼\" }\nprint(name() === \"____\")","expect":"true","answer":"토끼","hint":"돌려주는 글자","explain":"문자열 <code>\"토끼\"</code>를 반환."}
    ],
  }
  E["heap"] = {
    pattern: "🟢 쉬움 · 힙 객체의 속성·인덱스·별칭 결과를 예측",
    problems: [
      {"label":"계산 속성","ask":"obj.x 는? (x: 3 * 2)","code":"let obj = { x: 3 * 2 }\nprint(obj.x === ____)","expect":"true","answer":"6","hint":"3 × 2","explain":"<code>3*2=6</code>이 먼저 계산돼 x에 담긴다."},
      {"label":"마지막 인덱스","ask":"arr[2] 는?","code":"let arr = [10, 20, 30]\nprint(arr[2] === ____)","expect":"true","answer":"30","hint":"0,1,2번","explain":"마지막 번호는 2 → 30."},
      {"label":"별칭","ask":"b는 a와 같은 힙 객체. b.v=9 후 a.v 는?","code":"let a = { v: 1 }\nlet b = a\nb.v = 9\nprint(a.v === ____)","expect":"true","answer":"9","hint":"같은 객체라 a.v도 9","explain":"객체는 <b>힙에 하나</b> 있고 a·b는 <b>같은 주소</b>를 가리킨다(별칭). b로 고쳐도 a로 봐도 <b>같은 셀</b>이라 함께 바뀐다. (원시값이었다면 각자 복사돼 독립 — M4-1.)","see":"ref","wiki":{"label":"객체 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)"},"mem":{"title":"왜 a.v도 9인가 — a·b가 같은 힙 객체","stackLabel":"📇 이름표 장부","code":["let a = { v: 1 }","let b = a","b.v = 9"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"1"}]}},"note":"<code>let b = a</code> → 주소 복사 → a·b가 <b>같은 h1</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"9","bad":true}]}},"note":"<code>b.v = 9</code> → h1을 고침 → <b>a.v도 9</b>."}]}},
      {"label":"이름 속성","ask":"card.name 는?","code":"let card = { name: \"민지\" }\nprint(card.name === \"____\")","expect":"true","answer":"민지","hint":"name 값","explain":"<code>card.name</code> → <code>\"민지\"</code>."},
      {"label":"중첩 속성","ask":"data.inner.n 는?","code":"let data = { inner: { n: 7 } }\nprint(data.inner.n === ____)","expect":"true","answer":"7","hint":"안쪽 n","explain":"점을 이어 <code>data.inner.n</code> → 7."}
    ],
  }
  E["passval"] = {
    pattern: "🟢 쉬움 · 원시값을 함수에 넘겨 바꿔도 원본이 어떻게 되는지 예측",
    problems: [
      {"label":"돈은 안전?","ask":"f가 받은 값을 0으로 해도 원본 money는?","code":"function f(bill) { bill = 0 }\nlet money = 100\nf(money)\nprint(money === ____)","expect":"true","answer":"100","hint":"복사본이 전달됨 → 원본 안전","explain":"원시값은 <b>복사본</b>이 전달 → 함수가 바꿔도 원본 money는 100.","see":"passobj","wiki":{"label":"값에 의한 호출","url":"https://ko.wikipedia.org/wiki/값에_의한_호출"},"mem":{"title":"bill(함수 안)은 복사본 — money(원본)는 안전","stackLabel":"📇 이름표 장부","code":["let money = 100","f(money)   // bill = 복사 100","bill = 0"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]},{"name":"f","slots":[{"name":"bill","value":"100"}]}],"heap":{},"note":"원시값을 넘기면 <b>값을 복사</b> → bill은 별개 셀(100)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]},{"name":"f","slots":[{"name":"bill","value":"0","bad":true}]}],"heap":{},"note":"<code>bill=0</code>는 복사본만 바꾼다. <b>money는 100 그대로</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]}],"heap":{},"returning":{"value":"undefined","discarded":true},"note":"f는 <b>return이 없어도</b> 함수라 <b>undefined를 반환 통로로</b> 내보내고(💨 버려짐) <b>pop</b> — bill(복사본) 사라짐. <b>money는 100 그대로</b>(복사본만 바뀌었으니 안전)."}]}},
      {"label":"점수는 안전?","ask":"reset이 999로 해도 score는?","code":"function reset(n) { n = 999 }\nlet score = 50\nreset(score)\nprint(score === ____)","expect":"true","answer":"50","hint":"원본 안전","explain":"복사본만 999 → score는 50."},
      {"label":"더해도 안전?","ask":"add1이 +5 해도 a는?","code":"function add1(x) { x = x + 5 }\nlet a = 10\nadd1(a)\nprint(a === ____)","expect":"true","answer":"10","hint":"복사본만 바뀜","explain":"복사본에만 +5 → a는 10.","mem":{"title":"x(함수 안)은 복사본 — a(원본)는 안전","stackLabel":"📇 이름표 장부","code":["let a = 10","add1(a)   // x = 복사 10","x = 15"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"a","value":"10"}]},{"name":"add1","slots":[{"name":"x","value":"10"}]}],"heap":{},"note":"원시값을 넘기면 <b>값을 복사</b> → x은 별개 셀(10)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","value":"10"}]},{"name":"add1","slots":[{"name":"x","value":"15","bad":true}]}],"heap":{},"note":"<code>x=15</code>는 복사본만 바꾼다. <b>a는 10 그대로</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"a","value":"10"}]}],"heap":{},"returning":{"value":"undefined","discarded":true},"note":"add1은 <b>return이 없어 undefined를 통로로</b>(💨 버려짐) 내보내고 <b>pop</b> — x(복사본) 사라짐. <b>a는 10 그대로</b>."}]}},
      {"label":"반으로 해도?","ask":"half가 0으로 해도 price는?","code":"function half(v) { v = 0 }\nlet price = 200\nhalf(price)\nprint(price === ____)","expect":"true","answer":"200","hint":"원본 안전","explain":"복사본만 0 → price는 200."},
      {"label":"지워도 안전?","ask":"clear가 빈 글자로 해도 name은?","code":"function clear(s) { s = \"\" }\nlet name = \"민지\"\nclear(name)\nprint(name === \"____\")","expect":"true","answer":"민지","hint":"원본 안전","explain":"복사본만 비움 → name은 <code>\"민지\"</code>."}
    ],
  }
  E["passobj"] = {
    pattern: "🟢 쉬움 · 객체를 함수에 넘겨 속성을 바꾸면 원본이 어떻게 되는지 예측",
    problems: [
      {"label":"지갑","ask":"pay가 wallet.money를 0으로. wallet.money는?","code":"function pay(acc) { acc.money = 0 }\nlet wallet = { money: 100 }\npay(wallet)\nprint(wallet.money === ____)","expect":"true","answer":"0","hint":"같은 객체를 공유 → 원본도 0","explain":"객체를 넘기면 <b>주소(참조)를 복사</b>해 전달한다. 그래서 함수 안 <code>acc</code>와 밖 <code>wallet</code>은 <b>같은 힙 객체</b> — <code>acc.money=0</code>이 <code>wallet.money</code>도 0으로. (원시값이었다면 복사라 원본이 안전 — M5.)","see":"passval","wiki":{"label":"참조에 의한 호출","url":"https://ko.wikipedia.org/wiki/값에_의한_호출"},"mem":{"title":"왜 wallet.money도 0인가 — acc와 wallet은 같은 힙 객체","stackLabel":"📇 이름표 장부","code":["let wallet = { money: 100 }","pay(wallet)   // acc = wallet","acc.money = 0"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"wallet","ref":"h1"}]},{"name":"pay","slots":[{"name":"acc","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"money","value":"100"}]}},"note":"pay 호출 → 주소를 복사 → <code>acc</code>도 <b>같은 h1</b>을 가리킨다."},{"line":2,"stack":[{"name":"main","slots":[{"name":"wallet","ref":"h1"}]},{"name":"pay","slots":[{"name":"acc","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"money","value":"0","bad":true}]}},"note":"<code>acc.money = 0</code> → h1을 고침 → <b>wallet.money도 0</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"wallet","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"money","value":"0","bad":true}]}},"returning":{"value":"undefined","discarded":true},"note":"pay는 <b>return이 없어 undefined를 통로로</b>(💨 버려짐) 내보내고 <b>pop</b> — acc 사라짐. 그래도 <b>wallet.money는 0</b>(같은 봉투를 고쳤으니 변경이 남음)."}]}},
      {"label":"이름 변경","ask":"rename 후 user.name은?","code":"function rename(u) { u.name = \"지훈\" }\nlet user = { name: \"민지\" }\nrename(user)\nprint(user.name === \"____\")","expect":"true","answer":"지훈","hint":"같은 객체","explain":"같은 객체라 user.name도 <code>\"지훈\"</code>.","mem":{"title":"u(함수 안)과 user(밖)는 같은 힙 객체 — 속성 변경이 원본에 샌다","stackLabel":"📇 이름표 장부","code":["let user = { name: \"민지\" }","rename(user)   // u = user","u.name = \"지훈\""],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"user","ref":"h1"}]},{"name":"rename","slots":[{"name":"u","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"name","value":"\"민지\""}]}},"note":"호출 → 주소 복사 → <code>u</code>도 <b>같은 h1</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"user","ref":"h1"}]},{"name":"rename","slots":[{"name":"u","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"name","value":"\"지훈\"","bad":true}]}},"note":"<code>u.name=\"지훈\"</code> → h1을 고침 → <b>user.name도 \"지훈\"</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"user","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"name","value":"\"지훈\"","bad":true}]}},"returning":{"value":"undefined","discarded":true},"note":"rename은 <b>undefined를 통로로</b>(💨 버려짐) 내보내고 <b>pop</b> — u 사라짐. 그래도 <b>user.name은 \"지훈\"</b>(같은 봉투 변경이 남음)."}]}},
      {"label":"hp","ask":"grow 후 hero.hp는?","code":"function grow(p) { p.hp = 999 }\nlet hero = { hp: 100 }\ngrow(hero)\nprint(hero.hp === ____)","expect":"true","answer":"999","hint":"같은 객체","explain":"같은 객체라 hero.hp도 999.","mem":{"title":"p(함수 안)과 hero(밖)는 같은 힙 객체 — 속성 변경이 원본에 샌다","stackLabel":"📇 이름표 장부","code":["let hero = { hp: 100 }","grow(hero)   // p = hero","p.hp = 999"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"hero","ref":"h1"}]},{"name":"grow","slots":[{"name":"p","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]}},"note":"호출 → 주소 복사 → <code>p</code>도 <b>같은 h1</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"hero","ref":"h1"}]},{"name":"grow","slots":[{"name":"p","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"999","bad":true}]}},"note":"<code>p.hp=999</code> → h1을 고침 → <b>hero.hp도 999</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"hero","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"999","bad":true}]}},"returning":{"value":"undefined","discarded":true},"note":"grow는 <b>undefined를 통로로</b>(💨 버려짐) 내보내고 <b>pop</b> — p 사라짐. 그래도 <b>hero.hp는 999</b>."}]}},
      {"label":"완료","ask":"done 후 task.ok는?","code":"function done(t) { t.ok = true }\nlet task = { ok: false }\ndone(task)\nprint(task.ok === ____)","expect":"true","answer":"true","hint":"같은 객체","explain":"같은 객체라 task.ok도 true."},
      {"label":"0으로","ask":"zero 후 data.count는?","code":"function zero(o) { o.count = 0 }\nlet data = { count: 99 }\nzero(data)\nprint(data.count === ____)","expect":"true","answer":"0","hint":"같은 객체","explain":"같은 객체라 data.count도 0.","mem":{"title":"o(함수 안)과 data(밖)는 같은 힙 객체 — 속성 변경이 원본에 샌다","stackLabel":"📇 이름표 장부","code":["let data = { count: 99 }","zero(data)   // o = data","o.count = 0"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"data","ref":"h1"}]},{"name":"zero","slots":[{"name":"o","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"count","value":"99"}]}},"note":"호출 → 주소 복사 → <code>o</code>도 <b>같은 h1</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"data","ref":"h1"}]},{"name":"zero","slots":[{"name":"o","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"count","value":"0","bad":true}]}},"note":"<code>o.count=0</code> → h1을 고침 → <b>data.count도 0</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"data","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"count","value":"0","bad":true}]}},"returning":{"value":"undefined","discarded":true},"note":"zero는 <b>undefined를 통로로</b>(💨 버려짐) 내보내고 <b>pop</b> — o 사라짐. 그래도 <b>data.count는 0</b>."}]}}
    ],
  }
  E["passarr"] = {
    pattern: "🟢 쉬움 · 배열을 함수에 넘겨 바꾸면 원본이 어떻게 되는지 예측",
    problems: [
      {"label":"push","ask":"add가 push하면 원본 arr의 개수는?","code":"function add(list) { list.push(9) }\nlet arr = [1, 2]\nadd(arr)\nprint(arr.length === ____)","expect":"true","answer":"3","hint":"같은 배열 → arr도 늘어남","explain":"배열도 참조 → 같은 배열이라 arr도 늘어 3."},
      {"label":"빈 배열에","ask":"fill9(nums) 후 nums[0]은?","code":"function fill9(a) { a.push(9) }\nlet nums = []\nfill9(nums)\nprint(nums[0] === ____)","expect":"true","answer":"9","hint":"같은 배열","explain":"같은 배열에 push → nums[0]은 9."},
      {"label":"비우기","ask":"reset이 비우면 items의 개수는?","code":"function reset(a) { a.length = 0 }\nlet items = [1, 2, 3]\nreset(items)\nprint(items.length === ____)","expect":"true","answer":"0","hint":"같은 배열","explain":"같은 배열을 비움 → items 개수 0."},
      {"label":"항목 추가","ask":"grow가 push하면 cart의 개수는?","code":"function grow(list) { list.push(\"새\") }\nlet cart = [\"빵\"]\ngrow(cart)\nprint(cart.length === ____)","expect":"true","answer":"2","hint":"같은 배열","explain":"같은 배열에 추가 → cart 개수 2."},
      {"label":"0번 수정","ask":"double0 후 arr[0]은?","code":"function double0(a) { a[0] = a[0] * 2 }\nlet arr = [5, 6]\ndouble0(arr)\nprint(arr[0] === ____)","expect":"true","answer":"10","hint":"같은 배열","explain":"같은 배열의 0번 수정 → arr[0]은 10."}
    ],
  }
  E["graph"] = {
    pattern: "🟢 쉬움 · 화살표(참조)를 따라간 값·공유 노드의 변경 효과를 예측",
    problems: [
      {"label":"효니를 바꾸면?","ask":"me.friend는 효니를 가리킨다. me.friend.hair를 바꾸면 효니 본인은?","code":"let hyoni = { hair: \"긴머리\" }\nlet me = { friend: hyoni }\nme.friend.hair = \"숏컷\"\nprint(hyoni.hair === \"____\")","expect":"true","answer":"숏컷","hint":"me.friend = 효니(같은 사람)","explain":"<code>me.friend</code>는 <b>효니와 같은 힙 객체</b>를 가리킨다(참조). 그래서 <code>me.friend.hair</code>를 고치면 <b>효니.hair도 함께</b> 바뀐다 — 이름이 둘이어도 같은 사람.","see":"ref2","wiki":{"label":"객체 그래프","url":"https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)"},"mem":{"title":"me.friend와 효니는 같은 객체 — 한쪽을 고치면 함께 바뀐다","stackLabel":"📇 이름표 장부","code":["let hyoni = { hair: \"긴머리\" }","let me = { friend: hyoni }","me.friend.hair = \"숏컷\""],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"hyoni","ref":"h1"},{"name":"me","ref":"h2"}]}],"heap":{"h1":{"label":"효니","fields":[{"key":"hair","value":"\"긴머리\""}]},"h2":{"fields":[{"key":"friend","ref":"h1"}]}},"note":"me.friend가 <b>효니(h1)를 가리킨다</b>. hyoni·me.friend 둘 다 h1."},{"line":2,"stack":[{"name":"main","slots":[{"name":"hyoni","ref":"h1"},{"name":"me","ref":"h2"}]}],"heap":{"h1":{"label":"효니","fields":[{"key":"hair","value":"\"숏컷\"","bad":true}]},"h2":{"fields":[{"key":"friend","ref":"h1"}]}},"note":"<code>me.friend.hair=\"숏컷\"</code> → h1을 고침 → <b>hyoni.hair도 \"숏컷\"</b>."}]}},
      {"label":"화살표 따라","ask":"a.next.val 은?","code":"let a = { next: { val: 7 } }\nprint(a.next.val === ____)","expect":"true","answer":"7","hint":"a.next.val","explain":"점을 이어 <code>a.next.val</code> → 7."},
      {"label":"y.ref로 바꾸면?","ask":"y.ref는 x를 가리킨다. y.ref.n=9 후 x.n은?","code":"let x = { n: 1 }\nlet y = { ref: x }\ny.ref.n = 9\nprint(x.n === ____)","expect":"true","answer":"9","hint":"y.ref = x(같은 객체)","explain":"<code>y.ref</code>는 x와 같은 객체 → x.n도 9."},
      {"label":"리더 이름","ask":"team.leader.name 은?","code":"let p = { name: \"김\" }\nlet team = { leader: p }\nprint(team.leader.name === \"____\")","expect":"true","answer":"김","hint":"leader가 p","explain":"<code>team.leader</code>는 p → 이름 <code>\"김\"</code>."},
      {"label":"2중 중첩","ask":"root.child.child.v 은?","code":"let root = { child: { child: { v: 3 } } }\nprint(root.child.child.v === ____)","expect":"true","answer":"3","hint":"끝까지 따라감","explain":"점을 이어 끝까지 → 3."}
    ],
  }
  E["friends"] = {
    pattern: "🟢 쉬움 · 배열 안 사람 객체의 값·공유 변경 효과를 예측",
    problems: [
      {"label":"list[0]으로 바꾸면?","ask":"list[0]은 minji와 같은 객체다. list[0].name을 바꾸면 minji.name은?","code":"let minji = { name: \"민지\" }\nlet list = [minji]\nlist[0].name = \"X\"\nprint(minji.name === \"____\")","expect":"true","answer":"X","hint":"list[0] = minji(같은 객체)","explain":"<code>list[0]</code>은 minji와 같은 객체 → 바꾸면 minji도 <code>\"X\"</code>."},
      {"label":"두 번째 나이","ask":"people[1].age 는?","code":"let people = [{ age: 20 }, { age: 30 }]\nprint(people[1].age === ____)","expect":"true","answer":"30","hint":"두 번째 사람","explain":"<code>people[1].age</code> → 30."},
      {"label":"arr[0]으로 바꾸면?","ask":"arr[0]은 a와 같은 객체. arr[0].hp=50 후 a.hp는?","code":"let a = { hp: 100 }\nlet arr = [a]\narr[0].hp = 50\nprint(a.hp === ____)","expect":"true","answer":"50","hint":"arr[0] = a(같은 객체)","explain":"<code>arr[0]</code>은 a와 같은 객체 → a.hp도 50."},
      {"label":"두 번째 id","ask":"users[1].id 는?","code":"let users = [{ id: 1 }, { id: 2 }]\nprint(users[1].id === ____)","expect":"true","answer":"2","hint":"두 번째","explain":"<code>users[1].id</code> → 2."},
      {"label":"항목","ask":"cart[0].item 은?","code":"let cart = [{ item: \"빵\" }]\nprint(cart[0].item === \"____\")","expect":"true","answer":"빵","hint":".item","explain":"<code>cart[0].item</code> → <code>\"빵\"</code>."}
    ],
  }
  E["family"] = {
    pattern: "🟢 쉬움 · 트리 경로를 따라간 끝의 값을 예측",
    problems: [
      {"label":"2대 위","ask":"me.parent.parent.name 은? (2대 위)","code":"let grandma = { name: \"할머니\" }\nlet mom = { parent: grandma }\nlet me = { parent: mom }\nprint(me.parent.parent.name === \"____\")","expect":"true","answer":"할머니","hint":"엄마의 parent","explain":"<code>me.parent.parent</code>는 할머니 → 이름 <code>\"할머니\"</code>."},
      {"label":"2대 아래","ask":"a.child.child.name 은?","code":"let a = { child: { child: { name: \"손자\" } } }\nprint(a.child.child.name === \"____\")","expect":"true","answer":"손자","hint":"자식의 자식","explain":"<code>a.child.child.name</code> → <code>\"손자\"</code>."},
      {"label":"왼쪽","ask":"root.left.val 은?","code":"let root = { left: { val: 5 } }\nprint(root.left.val === ____)","expect":"true","answer":"5","hint":"root.left.val","explain":"<code>root.left.val</code> → 5."},
      {"label":"엄마 이름","ask":"me.mom.name 은?","code":"let me = { mom: { name: \"엄마\" } }\nprint(me.mom.name === \"____\")","expect":"true","answer":"엄마","hint":"me.mom.name","explain":"<code>me.mom.name</code> → <code>\"엄마\"</code>."},
      {"label":"깊은 데이터","ask":"tree.node.node.data 은?","code":"let tree = { node: { node: { data: 7 } } }\nprint(tree.node.node.data === ____)","expect":"true","answer":"7","hint":"node를 두 번","explain":"<code>tree.node.node.data</code> → 7."}
    ],
  }
  E["cycle"] = {
    pattern: "🟢 쉬움 · 순환(서로 가리킴)에서도 경로를 따라간 값을 예측",
    problems: [
      {"label":"왕복","ask":"a.to=b, b.to=a, b.val=9. a.to.val 은?","code":"let a = {}\nlet b = {}\na.to = b\nb.to = a\nb.val = 9\nprint(a.to.val === ____)","expect":"true","answer":"9","hint":"a.to = b","explain":"<code>a.to</code>는 b → <code>b.val</code>이 9."},
      {"label":"서로 가리킴","ask":"x.peer=y, y.peer=x. x.peer.id 는? (y.id=2)","code":"let x = { id: 1 }\nlet y = { id: 2 }\nx.peer = y\ny.peer = x\nprint(x.peer.id === ____)","expect":"true","answer":"2","hint":"x.peer = y","explain":"<code>x.peer</code>는 y → id 2."},
      {"label":"자기 순환","ask":"node.self=node, node.v=7. node.self.v 는?","code":"let node = {}\nnode.self = node\nnode.v = 7\nprint(node.self.v === ____)","expect":"true","answer":"7","hint":"self = node","explain":"<code>node.self</code>는 자기 자신 → v 7."},
      {"label":"앞뒤 연결","ask":"b.back=a, a.n=3. b.back.n 은?","code":"let a = { n: 3 }\nlet b = { back: a }\nprint(b.back.n === ____)","expect":"true","answer":"3","hint":"b.back = a","explain":"<code>b.back</code>은 a → n 3."},
      {"label":"큐 이름","ask":"p.q=q, q.name=\"큐\". p.q.name 은?","code":"let p = {}\nlet q = { name: \"큐\" }\np.q = q\nprint(p.q.name === \"____\")","expect":"true","answer":"큐","hint":"p.q = q","explain":"<code>p.q</code>는 q → name <code>\"큐\"</code>."}
    ],
  }
  E["callstack"] = {
    pattern: "🟢 쉬움 · 함수가 함수를 부를 때 최종 반환값을 예측",
    problems: [
      {"label":"2배 사슬","ask":"a는 b()의 2배, b()=5. a()는?","code":"function a() { return b() * 2 }\nfunction b() { return 5 }\nprint(a() === ____)","expect":"true","answer":"10","hint":"5 × 2","explain":"b가 5, a가 2배 → 10. (b 프레임이 쌓였다 반환되고 a가 이어감)","wiki":{"label":"함수 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/함수_(컴퓨터_과학)"}},
      {"label":"+1 사슬","ask":"outer는 inner()+1, inner()=9. outer()는?","code":"function outer() { return inner() + 1 }\nfunction inner() { return 9 }\nprint(outer() === ____)","expect":"true","answer":"10","hint":"9 + 1","explain":"inner가 9, outer가 +1 → 10."},
      {"label":"세금","ask":"tax는 10%를 더한다. tax(100)은?","code":"function tax(p) { return p + p * 0.1 }\nprint(tax(100) === ____)","expect":"true","answer":"110","hint":"100 + 10","explain":"<code>100 + 100*0.1 = 110</code>."},
      {"label":"그대로 전달","ask":"a는 b()를 그대로, b()=7. a()는?","code":"function a() { return b() }\nfunction b() { return 7 }\nprint(a() === ____)","expect":"true","answer":"7","hint":"b가 7","explain":"b가 7을 그대로 전달 → 7."},
      {"label":"더하는 사슬","ask":"f는 g()+1, g()=4. f()는?","code":"function f() { return g() + 1 }\nfunction g() { return 4 }\nprint(f() === ____)","expect":"true","answer":"5","hint":"4 + 1","explain":"g가 4, f가 +1 → 5."}
    ],
  }
  E["closure"] = {
    pattern: "🟢 쉬움 · 안쪽 함수가 바깥 값을 붙잡아 쓴 결과를 예측",
    problems: [
      {"label":"붙잡은 값","ask":"make 안 c=100. get()이 c-30을 돌려주면?","code":"function make() { let c = 100; return function () { return c - 30 } }\nlet get = make()\nprint(get() === ____)","expect":"true","answer":"70","hint":"100 - 30","explain":"안쪽 함수가 바깥 c(100)를 <b>붙잡아</b> → <code>100-30=70</code>."},
      {"label":"카운터","ask":"n은 호출 사이 기억된다. next()를 세 번 부르면(매번 +1)?","code":"function counter() { let n = 0; return function () { n = n + 1; return n } }\nlet next = counter()\nnext()\nnext()\nprint(next() === ____)","expect":"true","answer":"3","hint":"1,2,3","explain":"n이 호출 사이 <b>기억</b>돼 → 세 번 불러 <code>1,2,3</code>."},
      {"label":"숨은 잔액","ask":"bank가 붙잡은 money를 그대로 돌려주면? (money=100)","code":"function bank() { let money = 100; return function () { return money + 0 } }\nlet balance = bank()\nprint(balance() === ____)","expect":"true","answer":"100","hint":"그대로 100","explain":"money(100)를 그대로 → 100."},
      {"label":"붙잡아 곱하기","ask":"n=10을 붙잡아 2배를 돌려주면?","code":"function make() { let n = 10; return function () { return n * 2 } }\nprint(make()() === ____)","expect":"true","answer":"20","hint":"10 × 2","explain":"n(10)을 붙잡아 2배 → 20."},
      {"label":"붙잡아 더하기","ask":"v=3을 붙잡아 +4를 돌려주면?","code":"function make() { let v = 3; return function () { return v + 4 } }\nprint(make()() === ____)","expect":"true","answer":"7","hint":"3 + 4","explain":"v(3)를 붙잡아 +4 → 7."}
    ],
  }
  E["gc"] = {
    pattern: "🟢 쉬움 · 참조를 끊으면 무엇이 되나·남은 참조로 접근한 결과 예측",
    problems: [
      {"label":"참조 끊기","ask":"a의 참조를 끊으면(비우면) a는?","code":"let a = { big: \"data\" }\na = null\nprint(a === ____)","expect":"true","answer":"null","hint":"의도적 빈 값","explain":"<code>null</code>을 담아 <b>참조를 끊는다</b>(더 안 쓴다는 표시)."},
      {"label":"다른 참조","ask":"data를 비워도 ref가 아직 가리킨다. ref.v 는?","code":"let data = { v: 1 }\nlet ref = data\ndata = null\nprint(ref.v === ____)","expect":"true","answer":"1","hint":"ref가 살림","explain":"data를 끊어도 <b>ref가 아직 가리켜</b> 객체는 살아 v=1.","see":"ref2","wiki":{"label":"쓰레기 수집 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/쓰레기_수집_(컴퓨터_과학)"},"mem":{"title":"data를 끊어도 ref가 가리켜 객체는 산다","stackLabel":"📇 이름표 장부","code":["let data = { v: 1 }","let ref = data","data = null"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"data","ref":"h1"},{"name":"ref","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"1"}]}},"note":"data·ref 둘 다 h1을 가리킨다(참조 2개)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"data","value":"null","bad":true},{"name":"ref","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"1"}]}},"note":"<code>data=null</code> → data 화살표 끊김. 하지만 <b>ref가 h1을 가리켜 살아남는다</b>(GC 대상 아님)."}]}},
      {"label":"고아 만들기","ask":"x의 참조를 끊으면 x는?","code":"let x = { n: 5 }\nx = null\nprint(x === ____)","expect":"true","answer":"null","hint":"null","explain":"<code>null</code>로 참조를 끊는다."},
      {"label":"원본 끊어도","ask":"o를 비워도 r이 가리킨다. r.v 는?","code":"let o = { v: 9 }\nlet r = o\no = null\nprint(r.v === ____)","expect":"true","answer":"9","hint":"r이 살림","explain":"o를 끊어도 r이 가리켜 v=9."},
      {"label":"남은 참조","ask":"a를 비워도 b가 가리킨다. b.n 은?","code":"let a = { n: 1 }\nlet b = a\na = null\nprint(b.n === ____)","expect":"true","answer":"1","hint":"b가 살림","explain":"a를 끊어도 b가 가리켜 n=1.","mem":{"title":"a를 끊어도 b가 가리켜 객체는 산다","stackLabel":"📇 이름표 장부","code":["let a = { n: 1 }","let b = a","a = null"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"n","value":"1"}]}},"note":"a·b 둘 다 h1을 가리킨다(참조 2개)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","value":"null","bad":true},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"n","value":"1"}]}},"note":"<code>a=null</code> → a 화살표 끊김. 하지만 <b>b가 h1을 가리켜 살아남는다</b>(GC 대상 아님)."}]}}
    ],
  }
  E["class"] = {
    pattern: "🟢 쉬움 · new 로 만든 인스턴스의 속성·메서드 결과를 예측",
    problems: [
      {"label":"인스턴스 속성","ask":"new C().n 은?","code":"class C { constructor() { this.n = 5 } }\nprint(new C().n === ____)","expect":"true","answer":"5","hint":"constructor의 this.n","explain":"<code>new</code>가 힙에 객체를 만들고 constructor가 <code>this.n=5</code>."},
      {"label":"생성자 인수","ask":"만든 인스턴스의 name 은?","code":"class Dog { constructor(name) { this.name = name } }\nlet d = new Dog(\"콩이\")\nprint(d.name === \"____\")","expect":"true","answer":"콩이","hint":"넘긴 인수","explain":"넘긴 인수가 <code>this.name</code>에 담겨 <code>\"콩이\"</code>."},
      {"label":"age 속성","ask":"만든 인스턴스의 age 는?","code":"class P { constructor(a) { this.age = a } }\nlet p = new P(24)\nprint(p.age === ____)","expect":"true","answer":"24","hint":"넘긴 인수","explain":"넘긴 인수 24가 age에."},
      {"label":"기본값","ask":"new C().hp 은?","code":"class C { constructor() { this.hp = 100 } }\nprint(new C().hp === ____)","expect":"true","answer":"100","hint":"constructor의 this.hp","explain":"constructor의 <code>this.hp=100</code>."},
      {"label":"메서드","ask":"new Dog().bark() 은?","code":"class Dog { bark() { return \"멍\" } }\nprint(new Dog().bark() === \"____\")","expect":"true","answer":"멍","hint":"bark의 반환","explain":"메서드 <code>bark()</code>가 <code>\"멍\"</code>을 반환."}
    ],
  }
  E["objprim"] = {
    pattern: "🟢 쉬움 · 넣기·꺼내기 — 원시는 복사(독립)·객체는 주소(공유)를 예측",
    problems: [
      {"label":"넣기·원시","ask":"o.x = a 로 넣은 뒤 a = 9 하면 o.x는?","code":"let o = {}\nlet a = 5\no.x = a\na = 9\nprint((o.x) === ____)","expect":"true","answer":"5","hint":"넣는 순간 값 복사 → o.x는 그대로","explain":"<b>원시=값 복사(독립)</b> — <code>o.x = a</code>는 a의 값 5를 <b>복사</b>해 봉투의 x 칸에 담는다. 이후 <code>a=9</code>는 a의 셀만 바꿔 <b>o.x는 5</b>. (객체=주소 복사(공유)와 대비)","mem":{"title":"o.x는 5 그대로 — 원시는 넣는 순간 값 복사","stackLabel":"📇 이름표 장부","code":["let o = {}","let a = 5","o.x = a","a = 9"],"steps":[{"line":2,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"a","value":"5"}]}],"heap":{"h1":{"fields":[{"key":"x","value":"5"}]}},"note":"<code>o.x = a</code> → a의 값 5를 <b>복사</b>해 h1의 x 칸에. a와 x는 <b>각자 셀</b>."},{"line":3,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"a","value":"9","bad":true}]}],"heap":{"h1":{"fields":[{"key":"x","value":"5"}]}},"note":"<code>a = 9</code>는 <b>a의 셀만</b> 바꾼다. <b>o.x는 5 그대로</b>."}]}},
      {"label":"넣기·객체","ask":"o.f = h 로 넣은 뒤 h.v = 9 하면 o.f.v는?","code":"let o = {}\nlet h = { v: 1 }\no.f = h\nh.v = 9\nprint((o.f.v) === ____)","expect":"true","answer":"9","hint":"객체는 주소만 복사 → 같은 봉투","explain":"<b>객체=주소 복사(공유)</b> — <code>o.f = h</code>는 h의 <b>주소만 복사</b> → o.f와 h가 같은 봉투를 가리킨다. <code>h.v=9</code>가 그 봉투를 고쳐 <b>o.f.v도 9</b>. (원시=값 복사(독립)와 대비)","mem":{"title":"o.f.v도 9 — 객체를 넣으면 주소만 복사(공유)","stackLabel":"📇 이름표 장부","code":["let o = {}","let h = { v: 1 }","o.f = h","h.v = 9"],"steps":[{"line":2,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"h","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"f","ref":"h2"}]},"h2":{"fields":[{"key":"v","value":"1"}]}},"note":"<code>o.f = h</code> → <b>주소만 복사</b> → o.f와 h가 <b>같은 h2</b>를 가리킨다."},{"line":3,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"h","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"f","ref":"h2"}]},"h2":{"fields":[{"key":"v","value":"9","bad":true}]}},"note":"<code>h.v = 9</code>가 h2를 고침 → <b>o.f.v도 9</b>."}]}},
      {"label":"꺼내기·원시","ask":"x = o.n 으로 꺼낸 뒤 x = 9 하면 o.n은?","code":"let o = { n: 5 }\nlet x = o.n\nx = 9\nprint((o.n) === ____)","expect":"true","answer":"5","hint":"꺼낼 때 값 복사 → o.n은 그대로","explain":"<b>원시=값 복사(독립)</b> — <code>o.n</code>(원시 5)을 꺼내면 값이 <b>복사</b>돼 x는 각자 셀. <code>x=9</code>는 x의 셀만 바꿔 <b>o.n은 5</b>. (객체=주소 복사(공유)와 대비)","mem":{"title":"o.n은 5 그대로 — 원시는 꺼내는 순간 값 복사","stackLabel":"📇 이름표 장부","code":["let o = { n: 5 }","let x = o.n","x = 9"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"x","value":"5"}]}],"heap":{"h1":{"fields":[{"key":"n","value":"5"}]}},"note":"<code>let x = o.n</code> → 값 5를 <b>복사</b> → x는 <b>각자 셀</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"x","value":"9","bad":true}]}],"heap":{"h1":{"fields":[{"key":"n","value":"5"}]}},"note":"<code>x = 9</code>는 <b>x의 셀만</b> 바꾼다. <b>o.n은 5 그대로</b>."}]}},
      {"label":"꺼내기·객체","ask":"f = o.best 로 꺼낸 뒤 f.v = 9 하면 o.best.v는?","code":"let o = { best: { v: 1 } }\nlet f = o.best\nf.v = 9\nprint((o.best.v) === ____)","expect":"true","answer":"9","hint":"꺼낸 것이 객체면 주소 복사 → 공유","explain":"<b>객체=주소 복사(공유)</b> — 꺼낸 <code>o.best</code>가 객체라 <b>주소만 복사</b> → f와 o.best가 같은 봉투. <code>f.v=9</code>가 그 봉투를 고쳐 <b>o.best.v도 9</b>. (원시=값 복사(독립)와 대비)","mem":{"title":"o.best.v도 9 — 꺼낸 것이 객체면 주소 복사(공유)","stackLabel":"📇 이름표 장부","code":["let o = { best: { v: 1 } }","let f = o.best","f.v = 9"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"f","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"best","ref":"h2"}]},"h2":{"fields":[{"key":"v","value":"1"}]}},"note":"<code>let f = o.best</code> → <b>주소만 복사</b> → f와 o.best가 <b>같은 h2</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"f","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"best","ref":"h2"}]},"h2":{"fields":[{"key":"v","value":"9","bad":true}]}},"note":"<code>f.v = 9</code> → h2를 고침 → <b>o.best.v도 9</b>."}]}},
      {"label":"배열·원시","ask":"x = arr[0] 으로 꺼낸 뒤 x = 9 하면 arr[0]은?","code":"let arr = [1, 2, 3]\nlet x = arr[0]\nx = 9\nprint((arr[0]) === ____)","expect":"true","answer":"1","hint":"요소(원시)도 꺼낼 때 값 복사","explain":"배열도 힙 객체지만 <b>요소가 원시면 값 복사(독립)</b> — <code>arr[0]</code>(1)을 꺼내면 복사돼 x는 각자 셀. <code>x=9</code>는 x만 바꿔 <b>arr[0]은 1</b>. (요소가 객체면 주소 복사(공유))","mem":{"title":"arr[0]은 1 그대로 — 배열 요소(원시)도 꺼낼 때 값 복사","stackLabel":"📇 이름표 장부","code":["let arr = [1, 2, 3]","let x = arr[0]","x = 9"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"arr","ref":"h1"},{"name":"x","value":"1"}]}],"heap":{"h1":{"fields":[{"key":"0","value":"1"},{"key":"1","value":"2"},{"key":"2","value":"3"}]}},"note":"배열도 <b>힙 객체</b>(h1). <code>arr[0]</code>(원시 1)을 꺼내면 <b>값 복사</b> → x는 각자 셀."},{"line":2,"stack":[{"name":"main","slots":[{"name":"arr","ref":"h1"},{"name":"x","value":"9","bad":true}]}],"heap":{"h1":{"fields":[{"key":"0","value":"1"},{"key":"1","value":"2"},{"key":"2","value":"3"}]}},"note":"<code>x = 9</code>는 <b>x의 셀만</b> 바꾼다. <b>arr[0]은 1 그대로</b>."}]}},
      {"label":"함수·원시 전달","ask":"숫자를 함수에 넘겨 함수 안에서 0으로 바꾸면 — 원본 money는?","code":"let money = 100\nfunction pay(n) { n = 0 }\npay(money)\nprint((money) === ____)","expect":"true","answer":"100","hint":"원시는 복사본이 전달 — 원본 안전","explain":"함수에 넘길 때 <b>값이 복사</b>돼 매개변수 n은 money의 독립 사본. <code>n = 0</code>은 사본만 바꾼다 → 원본 <b>money는 100 그대로</b>. <b>원시=값 복사(독립)</b> — 대입일 때와 똑같다.","mem":{"title":"왜 money는 100 그대로 — 원시는 복사본이 전달","stackLabel":"📇 이름표 장부","code":["let money = 100","pay(money) → n = money","n = 0  (함수 안)"],"steps":[{"line":0,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]}],"heap":{},"note":"money = 100."},{"line":1,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]},{"name":"pay","slots":[{"name":"n","value":"100"}]}],"heap":{},"note":"<code>pay(money)</code> → 매개변수 <b>n에 100을 복사</b>(원시=값 복사). money와 n은 <b>각자 셀</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]},{"name":"pay","slots":[{"name":"n","value":"0","bad":true}]}],"heap":{},"note":"<code>n = 0</code>은 <b>n 셀만</b> 바꾼다. <b>money는 100 그대로</b> — 원본 안전."}]}}
    ],
  }
})()
