// 🟡 보통 드릴 (ADR 0008) — 예측 패턴 · 정답 시 설명/메모리 증명. 자동 생성.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const N = window.Drills.normal
  N["1"] = {
    pattern: "🟡 보통 · 두 단계 계산·타입 결합을 예측",
    problems: [
      {"label":"두 단계","ask":"1에서 +1 한 뒤 ×3 하면?","code":"let x = 1\nx = x + 1\nx = x * 3\nprint(x === ____)","expect":"true","answer":"6","hint":"2 × 3","explain":"왼쪽부터: <code>1+1=2</code>, 그다음 <code>2*3=6</code>."},
      {"label":"식의 타입","ask":"10 + 5 의 타입 이름은?","code":"print((typeof (10 + 5)) === \"____\")","expect":"true","answer":"number","hint":"숫자끼리 → number","explain":"숫자끼리의 계산 결과도 숫자 → <code>\"number\"</code>.","see":"builtins"},
      {"label":"섞인 타입","ask":"1 + \"2\" 의 타입 이름은? (숫자와 글자를 더하면)","code":"print((typeof (1 + \"2\")) === \"____\")","expect":"true","answer":"string","hint":"글자로 끌려간다","explain":"숫자+글자는 <b>글자로 끌려간다</b>(2강) → <code>\"1\"+\"2\"=\"12\"</code>는 문자열.","see":"builtins"},
      {"label":"복사 후 원본 변경","ask":"a를 복사해 b를 만든 뒤 a에만 +5. b는?","code":"let a = 10\nlet b = a\na = a + 5\nprint(b === ____)","expect":"true","answer":"10","hint":"b는 복사본 → 그대로","explain":"b는 대입 순간 값 10을 <b>복제</b>. 나중에 a만 바꿔도 b는 10."},
      {"label":"+ 강제 변환","ask":"\"5\" + 3 의 결과는? (+는 함정)","code":"print((\"5\" + 3) === \"____\")","expect":"true","answer":"53","hint":"글자 이어붙이기 → \"53\"","explain":"<code>+</code>는 한쪽이 글자면 <b>이어붙이기</b> → <code>\"5\"+3=\"53\"</code>."}
    ],
  }
  N["2"] = {
    pattern: "🟡 보통 · 왼쪽부터 결합·length·템플릿 계산·대문자 예측",
    problems: [
      {"label":"왼쪽부터","ask":"1 + 2 + \"3\" 는? (왼쪽부터 접힌다)","code":"print((1 + 2 + \"3\") === \"____\")","expect":"true","answer":"33","hint":"1+2=3 → 3+\"3\"=\"33\"","explain":"왼쪽부터: <code>1+2=3</code>, 다음 <code>3+\"3\"</code>은 글자 이어붙이기 → <code>\"33\"</code>."},
      {"label":"첫 만남이 글자","ask":"\"3\" + 2 + 1 는? (첫 만남이 글자면)","code":"print((\"3\" + 2 + 1) === \"____\")","expect":"true","answer":"321","hint":"\"3\"+2=\"32\", +1=\"321\"","explain":"첫 <code>\"3\"+2</code>가 이미 문자 <code>\"32\"</code>, 이어서 <code>+1=\"321\"</code>."},
      {"label":"글자 수","ask":"\"abc\" 의 글자 수는?","code":"print((\"abc\".length) === ____)","expect":"true","answer":"3","hint":".length","explain":"문자열 <code>.length</code>는 글자 수 → 3."},
      {"label":"템플릿 계산","ask":"a=2, b=3일 때 `합 ${a + b}` 은?","code":"let a = 2\nlet b = 3\nprint((`합 ${a + b}`) === \"____\")","expect":"true","answer":"합 5","hint":"${a+b}=5","explain":"<code>${a+b}</code>는 <b>먼저 계산</b>돼 5가 끼워진다."},
      {"label":"대문자","ask":"\"hi\".toUpperCase() 는?","code":"print((\"hi\".toUpperCase()) === \"____\")","expect":"true","answer":"HI","hint":"전부 대문자","explain":"<code>toUpperCase()</code>는 전부 대문자로 → <code>\"HI\"</code>.","see":"builtins"}
    ],
  }
  N["3"] = {
    pattern: "🟡 보통 · 문자열·인자·삼항·논리 축약 — 표현식은 모두 값",
    problems: [
      {"label":"문자열 + 괄호","ask":"\"n=\" + (1 + 2) 는? (괄호 안 먼저, 그다음 이어붙이기)","code":"print((\"n=\" + (1 + 2)) === ____)","expect":"true","answer":"\"n=3\"","hint":"1+2=3 → \"n=3\" (따옴표째 입력)","explain":"괄호 안 <code>1+2=3</code> 먼저, 그다음 문자 이어붙이기 → <code>\"n=3\"</code>."},
      {"label":"인자 안 먼저","ask":"Math.max(1, 2 * 3) 은? (인자 안 곱셈 먼저)","code":"print((Math.max(1, 2 * 3)) === ____)","expect":"true","answer":"6","hint":"2*3=6 → max(1,6)=6","explain":"인자 안 <code>2*3=6</code> 먼저 계산 → <code>max(1,6)=6</code>.","see":"builtins"},
      {"label":"삼항도 값","ask":"7 > 3 ? \"y\" : \"n\" 은? (삼항은 표현식 → 값)","code":"print((7 > 3 ? \"y\" : \"n\") === ____)","expect":"true","answer":"\"y\"","hint":"7>3은 true → \"y\" (따옴표째)","explain":"삼항도 <b>값을 내는 식</b> → <code>7>3</code>이 참이라 <code>\"y\"</code>."},
      {"label":"비교·논리도 값","ask":"true < true && true 는? (< 가 && 보다 먼저!)","code":"print((true < true && true) === ____)","expect":"true","answer":"false","hint":"true<true=false → false && true","explain":"<code>&lt;</code>가 <code>&amp;&amp;</code>보다 먼저 → <code>true&lt;true=false</code>, <code>false&amp;&amp;true=false</code>."},
      {"label":"나머지 연산","ask":"10 % 3 은? (나눈 나머지)","code":"print((10 % 3) === ____)","expect":"true","answer":"1","hint":"10 = 3*3 + 1","explain":"<code>%</code>는 나눈 나머지 → <code>10=3·3+1</code> → 1.","see":"builtins"}
    ],
  }
  N["4"] = {
    pattern: "🟡 보통 · Boolean(값)의 결과를 예측 — \"비어 보이는 것\"의 함정",
    problems: [
      {"label":"Boolean(0)","ask":"숫자 0을 Boolean()에 넣으면 참일까 거짓일까?","code":"print(Boolean(0) === ____)","expect":"true","answer":"false","hint":"0은 falsy → false","explain":"0은 <b>falsy</b>(거짓 취급) → <code>Boolean(0)=false</code>.","see":"builtins"},
      {"label":"Boolean(\"\")","ask":"빈 문자열 \"\" 은?","code":"print(Boolean(\"\") === ____)","expect":"true","answer":"false","hint":"빈 글자는 falsy","explain":"빈 문자열은 falsy → false.","see":"builtins"},
      {"label":"Boolean([])","ask":"빈 배열 [] 은? (비어 보이지만 \"객체\"다)","code":"print(Boolean([]) === ____)","expect":"true","answer":"true","hint":"빈 배열도 truthy — 함정","explain":"<b>빈 배열도 객체</b> → truthy → true. (내용 아니라 \"존재\"로 판단)","see":"builtins"},
      {"label":"Boolean(\"false\")","ask":"글자 \"false\" 는? (진짜 false 가 아니라 5글자 문자열)","code":"print(Boolean(\"false\") === ____)","expect":"true","answer":"true","hint":"따옴표 친 글자는 truthy","explain":"<code>\"false\"</code>는 5글자짜리 <b>문자열</b>(값이 있음) → truthy → true.","see":"builtins"},
      {"label":"Boolean(\" \")","ask":"공백 한 칸 \" \" 은? (눈엔 비어 보인다)","code":"print(Boolean(\" \") === ____)","expect":"true","answer":"true","hint":"공백도 글자 1개 → truthy","explain":"공백 한 칸도 <b>글자 1개</b> → truthy → true.","see":"builtins"}
    ],
  }
  N["5"] = {
    pattern: "🟡 보통 · 중첩 호출·화살표·조건 반환·전역 참조 결과 예측",
    problems: [
      {"label":"중첩 호출","ask":"twice는 2배. twice(twice(3))은?","code":"function twice(n) { return n * 2 }\nprint(twice(twice(3)) === ____)","expect":"true","answer":"12","hint":"3→6→12","explain":"안쪽부터: <code>twice(3)=6</code>, <code>twice(6)=12</code>."},
      {"label":"화살표","ask":"화살표 함수 dbl. dbl(6)은?","code":"const dbl = n => n * 2\nprint(dbl(6) === ____)","expect":"true","answer":"12","hint":"6 × 2","explain":"화살표 함수도 같은 함수 → <code>6*2=12</code>."},
      {"label":"세금 계산","ask":"tax는 10%를 더한다. tax(100)은?","code":"function tax(p) { return p + p * 0.1 }\nprint(tax(100) === ____)","expect":"true","answer":"110","hint":"100 + 10","explain":"<code>100 + 100*0.1 = 110</code>(세금 10 포함)."},
      {"label":"조건 반환","ask":"sign은 양수면 \"+\", 아니면 \"-\". sign(-2)는?","code":"function sign(n) { return n > 0 ? \"+\" : \"-\" }\nprint(sign(-2) === \"____\")","expect":"true","answer":"-","hint":"-2는 양수 아님","explain":"-2는 양수가 아니라 삼항의 else → <code>\"-\"</code>."},
      {"label":"전역 참조","ask":"base=10을 더하는 함수. addBase(5)는?","code":"let base = 10\nfunction addBase(n) { return n + base }\nprint(addBase(5) === ____)","expect":"true","answer":"15","hint":"5 + 10","explain":"함수 안에서 <b>바깥 base(10)</b>를 읽어 <code>5+10=15</code>."}
    ],
  }
  N["6"] = {
    pattern: "🟡 보통 · 칸 바꾸기·여러 push·includes/indexOf 결과 예측",
    problems: [
      {"label":"바꾼 뒤 합","ask":"0번을 9로 바꾼 뒤 a[0] + a[1] 은?","code":"let a = [1, 2, 3]\na[0] = 9\nprint((a[0] + a[1]) === ____)","expect":"true","answer":"11","hint":"9 + 2","explain":"0번을 9로 바꾼 뒤 <code>a[0]+a[1] = 9+2 = 11</code>."},
      {"label":"push 둘","ask":"2개짜리 배열에 push(3, 4) 하면 개수는?","code":"let a = [1, 2]\na.push(3, 4)\nprint(a.length === ____)","expect":"true","answer":"4","hint":"한 번에 둘 → 2+2","explain":"<code>push(3,4)</code>는 한 번에 둘 추가 → <code>2+2=4</code>."},
      {"label":"includes","ask":"[1,2,3] 에 2가 들어 있는가?","code":"print([1, 2, 3].includes(2) === ____)","expect":"true","answer":"true","hint":"있으면 true","explain":"<code>includes(2)</code>는 담고 있으면 true.","see":"builtins"},
      {"label":"indexOf","ask":"[\"a\",\"b\",\"c\"] 에서 \"c\"의 위치(번호)는?","code":"print([\"a\", \"b\", \"c\"].indexOf(\"c\") === ____)","expect":"true","answer":"2","hint":"0,1,2","explain":"<code>indexOf(\"c\")</code>는 위치(0부터) → 2.","see":"builtins"},
      {"label":"pop","ask":"3개짜리에서 pop 하면 개수는?","code":"let a = [1, 2, 3]\na.pop()\nprint(a.length === ____)","expect":"true","answer":"2","hint":"하나 빠짐","explain":"<code>pop</code>은 끝을 하나 빼 → <code>3-1=2</code>."}
    ],
  }
  N["7"] = {
    pattern: "🟡 보통 · map은 원본 불변·짝수 개수·곱 누적·체이닝 결과 예측",
    problems: [
      {"label":"map은 원본 불변","ask":"map은 원본을 안 바꾼다. map 후 원본 n의 개수는?","code":"let n = [1, 2, 3]\nn.map(x => x * 2)\nprint(n.length === ____)","expect":"true","answer":"3","hint":"새 배열을 만들 뿐","explain":"<code>map</code>은 <b>새 배열을 만들 뿐 원본은 그대로</b> → 개수 3."},
      {"label":"짝수 개수","ask":"짝수만 거른 개수는?","code":"print([1, 2, 3, 4, 5, 6].filter(x => x % 2 === 0).length === ____)","expect":"true","answer":"3","hint":"2,4,6 → 3개","explain":"짝수(나머지 0)만 → 2,4,6 세 개.","see":"builtins"},
      {"label":"곱 누적","ask":"곱을 누적하면? (시작 1)","code":"print([2, 3, 4].reduce((a, b) => a * b, 1) === ____)","expect":"true","answer":"24","hint":"2×3×4","explain":"<code>reduce</code>로 곱 누적 → <code>2×3×4=24</code>(시작 1)."},
      {"label":"대문자 변환","ask":"각 글자를 대문자로 바꾼 배열의 첫 요소는?","code":"print([\"a\", \"b\"].map(s => s.toUpperCase())[0] === \"____\")","expect":"true","answer":"A","hint":"\"a\" → \"A\"","explain":"<code>toUpperCase</code>로 대문자 → 첫 요소 <code>\"A\"</code>.","see":"builtins"},
      {"label":"체이닝","ask":"1보다 큰 것만 걸러 2배 한 배열의 첫 요소는?","code":"print([1, 2, 3].filter(x => x > 1).map(x => x * 2)[0] === ____)","expect":"true","answer":"4","hint":"[2,3]→[4,6]→첫째 4","explain":"체이닝: <code>filter</code>로 [2,3] → <code>map</code>으로 [4,6] → 첫째 4."}
    ],
  }
  N["8"] = {
    pattern: "🟡 보통 · 중첩·배열 안 객체·대괄호·속성 조합의 결과를 예측",
    problems: [
      {"label":"중첩","ask":"me.pet.name 은?","code":"let me = { pet: { name: \"콩이\" } }\nprint(me.pet.name === \"____\")","expect":"true","answer":"콩이","hint":"안쪽 name","explain":"점을 이어 <code>me.pet.name</code> → <code>\"콩이\"</code>."},
      {"label":"배열 안 객체","ask":"users[1].name 은?","code":"let users = [{ name: \"민지\" }, { name: \"지훈\" }]\nprint(users[1].name === \"____\")","expect":"true","answer":"지훈","hint":"두 번째 사람","explain":"<code>users[1]</code>은 두 번째 객체 → <code>.name=\"지훈\"</code>."},
      {"label":"대괄호(공백 키)","ask":"o[\"my key\"] 는?","code":"let o = { \"my key\": 7 }\nprint(o[\"my key\"] === ____)","expect":"true","answer":"7","hint":"대괄호로 접근","explain":"공백 있는 키는 <b>대괄호</b>로만 → <code>o[\"my key\"]=7</code>."},
      {"label":"속성 조합","ask":"이름과 나이를 이으면? name(age)","code":"let p = { name: \"민지\", age: 24 }\nprint((p.name + \"(\" + p.age + \")\") === \"____\")","expect":"true","answer":"민지(24)","hint":"이어붙이기","explain":"속성을 이어붙여 <code>\"민지(24)\"</code>."},
      {"label":"키 개수","ask":"객체의 키(속성) 개수는?","code":"let o = { a: 1, b: 2 }\nprint(Object.keys(o).length === ____)","expect":"true","answer":"2","hint":"a, b → 2개","explain":"<code>Object.keys(o)</code>는 키 배열 <code>[\"a\",\"b\"]</code> → 길이 2.","see":"builtins"}
    ],
  }
  N["9"] = {
    pattern: "🟡 보통 · tagName(대문자)·숫자→문자·클릭 횟수 결과를 예측",
    problems: [
      {"label":"태그 이름","ask":"button으로 만든 요소의 tagName 은? (대문자!)","code":"let el = document.createElement(\"button\")\nprint(el.tagName === \"____\")","expect":"true","answer":"BUTTON","hint":"tagName은 항상 대문자","explain":"<code>tagName</code>은 <b>항상 대문자</b>로 나온다 → <code>\"BUTTON\"</code>."},
      {"label":"숫자→문자","ask":"textContent에 숫자를 넣으면? (문자가 된다)","code":"let el = document.createElement(\"div\")\nel.textContent = 90 + \"\"\nprint(el.textContent === \"____\")","expect":"true","answer":"90","hint":"숫자 90 → 문자 \"90\"","explain":"<code>textContent</code>는 <b>항상 문자</b> → 숫자 90이 <code>\"90\"</code>이 된다."},
      {"label":"클릭","ask":"한 번 클릭하면 n은?","code":"let n = 0\nlet b = document.createElement(\"button\")\nb.addEventListener(\"click\", () => n = 1)\nb.click()\nprint(n === ____)","expect":"true","answer":"1","hint":"리스너가 1로","explain":"클릭하면 리스너가 실행돼 n이 1."},
      {"label":"두 번 클릭","ask":"두 번 클릭하면 n은?","code":"let n = 0\nlet b = document.createElement(\"button\")\nb.addEventListener(\"click\", () => n++)\nb.click()\nb.click()\nprint(n === ____)","expect":"true","answer":"2","hint":"매번 +1","explain":"리스너가 매번 +1 → 두 번 클릭 2."},
      {"label":"둘 붙이기","ask":"span 둘을 붙이면 자식 개수는?","code":"let box2 = document.createElement(\"div\")\nbox2.append(document.createElement(\"span\"), document.createElement(\"span\"))\nprint(box2.children.length === ____)","expect":"true","answer":"2","hint":"둘 붙임","explain":"span 둘 붙여 <code>children.length=2</code>."}
    ],
  }
  N["10"] = {
    pattern: "🟡 보통 · 조건·map·이벤트·객체 배열·reduce 결과를 예측",
    problems: [
      {"label":"조건","ask":"나이 15일 때 등급은? (19세 이상이면 \"성인\")","code":"let age = 15\nprint((age >= 19 ? \"성인\" : \"청소년\") === \"____\")","expect":"true","answer":"청소년","hint":"15 < 19 → else","explain":"15는 19 미만이라 삼항 else → <code>\"청소년\"</code>."},
      {"label":"map 변환","ask":"나이를 1씩 올린 배열의 두 번째는?","code":"let ages = [10, 20]\nprint(ages.map(a => a + 1)[1] === ____)","expect":"true","answer":"21","hint":"20 + 1","explain":"<code>map</code>으로 +1 한 배열의 두 번째 <code>20+1=21</code>."},
      {"label":"이벤트","ask":"한 번 클릭하면 clicked는?","code":"let clicked = 0\nlet b = document.createElement(\"button\")\nb.addEventListener(\"click\", () => clicked++)\nb.click()\nprint(clicked === ____)","expect":"true","answer":"1","hint":"+1","explain":"클릭 리스너가 실행돼 clicked 1."},
      {"label":"객체 배열","ask":"목록 첫 사람의 name 은?","code":"let ppl = [{ name: \"민지\" }, { name: \"지훈\" }]\nprint(ppl[0].name === \"____\")","expect":"true","answer":"민지","hint":"ppl[0].name","explain":"<code>ppl[0].name</code> → <code>\"민지\"</code>."},
      {"label":"reduce 합","ask":"두 값을 다 더하면?","code":"let a = [10, 20]\nprint(a.reduce((s, x) => s + x, 0) === ____)","expect":"true","answer":"30","hint":"10 + 20","explain":"<code>reduce</code>로 합 <code>10+20=30</code>."}
    ],
  }
  N["ram"] = {
    pattern: "🟡 보통 · 재할당 누적·여러 타입·복사 후 원본 예측",
    problems: [
      {"label":"두 단계","ask":"1에서 +1 한 뒤 ×3 하면?","code":"let x = 1\nx = x + 1\nx = x * 3\nprint(x === ____)","expect":"true","answer":"6","hint":"2 × 3","explain":"왼쪽부터: <code>1+1=2</code>, <code>2*3=6</code>."},
      {"label":"원본은 그대로","ask":"a=7, b=a 뒤 a=0 하면 b는?","code":"let a = 7\nlet b = a\na = 0\nprint(b === ____)","expect":"true","answer":"7","hint":"b는 복사본 → 그대로","explain":"a를 바꿔도 b는 <b>복사본</b>이라 7 그대로.","mem":{"title":"a만 바뀌고 b는 그대로 — 원시값은 각자 셀로 복사","stackLabel":"📇 이름표 장부","code":["let b = 7","let a = b","a = 0"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"b","value":"7"},{"name":"a","value":"7"}]}],"heap":{},"note":"복사 → b·a가 <b>각자 셀</b>(값 7)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"b","value":"7"},{"name":"a","value":"0","bad":true}]}],"heap":{},"note":"<code>a=0</code>는 <b>a의 셀만</b> 바꾼다. <b>b는 7 그대로</b>."}]}},
      {"label":"참거짓 타입","ask":"참거짓 값의 타입 이름은?","code":"print((typeof true) === \"____\")","expect":"true","answer":"boolean","hint":"boolean","explain":"참거짓의 타입 이름은 <code>\"boolean\"</code>.","see":"builtins"},
      {"label":"미초기화","ask":"값을 안 넣은 x의 타입 이름은?","code":"let x\nprint((typeof x) === \"____\")","expect":"true","answer":"undefined","hint":"선언만 = undefined","explain":"선언만 하고 값이 없으면 <code>\"undefined\"</code>.","see":"builtins"},
      {"label":"재할당 타입변경","ask":"v=1 이었다가 v=\"hi\" 하면 typeof v는?","code":"let v = 1\nv = \"hi\"\nprint((typeof v) === \"____\")","expect":"true","answer":"string","hint":"문자 담긴 v","explain":"v에 글자를 담으면 타입도 <b>string</b>으로 바뀐다(동적 타입).","see":"builtins"}
    ],
  }
  N["ref"] = {
    pattern: "🟡 보통 · 계산·전달로 바꿔도 원시값 원본이 어떻게 되는지 예측",
    problems: [
      {"label":"곱해 바꿔도?","ask":"y=x 뒤 y=y*2 하면 x는?","code":"let x = 3\nlet y = x\ny = y * 2\nprint(x === ____)","expect":"true","answer":"3","hint":"복사라 x는 그대로","explain":"복사본 y를 곱해도 x는 3.","mem":{"title":"y만 바뀌고 x는 그대로 — 원시값은 각자 셀로 복사","stackLabel":"📇 이름표 장부","code":["let x = 3","let y = x","y = 6"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"x","value":"3"},{"name":"y","value":"3"}]}],"heap":{},"note":"복사 → x·y가 <b>각자 셀</b>(값 3)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"x","value":"3"},{"name":"y","value":"6","bad":true}]}],"heap":{},"note":"<code>y=6</code>는 <b>y의 셀만</b> 바꾼다. <b>x는 3 그대로</b>."}]}},
      {"label":"빼서 바꿔도?","ask":"b=a 뒤 b=b-30 하면 a는?","code":"let a = 100\nlet b = a\nb = b - 30\nprint(a === ____)","expect":"true","answer":"100","hint":"a는 그대로","explain":"복사본 b에서 빼도 a는 100."},
      {"label":"함수에 넘겨도?","ask":"함수가 x=0 해도 원본 p는?","code":"function f(x) { x = 0 }\nlet p = 5\nf(p)\nprint(p === ____)","expect":"true","answer":"5","hint":"복사본만 바뀜","explain":"함수 인수도 <b>복사</b> → p는 5 안전."},
      {"label":"둘 다 살아있음","ask":"x=10, y=x, y=20 후 x + y 는?","code":"let x = 10\nlet y = x\ny = 20\nprint((x + y) === ____)","expect":"true","answer":"30","hint":"10 + 20","explain":"x·y 각자 셀 → <code>10+20=30</code>."},
      {"label":"문자 복사","ask":"s=\"a\", t=s, t=\"b\" 후 s + t 는?","code":"let s = \"a\"\nlet t = s\nt = \"b\"\nprint((s + t) === \"____\")","expect":"true","answer":"ab","hint":"s는 \"a\" 그대로","explain":"s는 <code>\"a\"</code> 그대로 → <code>\"a\"+\"b\"=\"ab\"</code>."}
    ],
  }
  N["ref2"] = {
    pattern: "🟡 보통 · 복사(원시)와 공유(객체)를 한 식에서 구분",
    problems: [
      {"label":"복사는 그대로","ask":"c는 a.n을 복사(원시값), b는 같은 객체. b.n=9 후 c는?","code":"let a = { n: 1 }\nlet b = a\nlet c = a.n\nb.n = 9\nprint(c === ____)","expect":"true","answer":"1","hint":"c는 꺼낼 때 복사 → 1 그대로","explain":"c는 <code>a.n</code> 복사(1), b는 공유 → c는 1 그대로."},
      {"label":"둘 다 바뀜","ask":"a·b가 같은 객체. b.n=9 후 a.n + b.n 은?","code":"let a = { n: 1 }\nlet b = a\nb.n = 9\nprint((a.n + b.n) === ____)","expect":"true","answer":"18","hint":"둘 다 9 → 18","explain":"a·b 같은 객체라 둘 다 9 → <code>9+9=18</code>."},
      {"label":"두 번 push","ask":"c는 arr과 같은 배열. 두 번 push하면 arr 개수는?","code":"let arr = [1]\nlet c = arr\nc.push(2)\nc.push(3)\nprint(arr.length === ____)","expect":"true","answer":"3","hint":"1 + 2번","explain":"같은 배열에 두 번 push → 3."},
      {"label":"재할당은 끊는다","ask":"b를 새 객체로 재할당하면 a.n은? (연결이 끊긴다)","code":"let a = { n: 1 }\nlet b = a\nb = { n: 9 }\nprint(a.n === ____)","expect":"true","answer":"1","hint":"b가 다른 객체를 가리켜 a는 그대로","explain":"b를 <b>새 객체로 재할당</b>하면 a와 연결이 끊겨 a.n은 1."},
      {"label":"중첩 공유","ask":"p는 o와 같은 객체. p.list에 push하면 o.list 개수는?","code":"let o = { list: [1, 2] }\nlet p = o\np.list.push(3)\nprint(o.list.length === ____)","expect":"true","answer":"3","hint":"같은 객체 → 같은 list","explain":"p·o 같은 객체라 같은 list → 3."}
    ],
  }
  N["stack"] = {
    pattern: "🟡 보통 · 계산·조건·문자 결합 반환값을 예측",
    problems: [
      {"label":"곱 반환","ask":"mul(3, 4)는?","code":"function mul(a, b) { return a * b }\nprint(mul(3, 4) === ____)","expect":"true","answer":"12","hint":"3 × 4","explain":"두 매개변수를 곱해 <code>3×4=12</code>."},
      {"label":"뺄셈","ask":"sub(10, 4)는?","code":"function sub(a, b) { return a - b }\nprint(sub(10, 4) === ____)","expect":"true","answer":"6","hint":"10 - 4","explain":"<code>10-4=6</code>."},
      {"label":"조건 반환","ask":"sign(-2)는? (양수면 \"+\", 아니면 \"-\")","code":"function sign(n) { return n > 0 ? \"+\" : \"-\" }\nprint(sign(-2) === \"____\")","expect":"true","answer":"-","hint":"-2는 양수 아님","explain":"-2는 양수 아님 → <code>\"-\"</code>."},
      {"label":"지역 계산","ask":"f는 지역 x=5의 2배를 반환. f()는?","code":"function f() { let x = 5; return x * 2 }\nprint(f() === ____)","expect":"true","answer":"10","hint":"5 × 2","explain":"지역 x=5의 2배 → 10."},
      {"label":"문자 결합","ask":"g(\"z\")는? (return \"hi \" + n)","code":"function g(n) { return \"hi \" + n }\nprint(g(\"z\") === \"____\")","expect":"true","answer":"hi z","hint":"\"hi \" + \"z\"","explain":"<code>\"hi \"+\"z\"=\"hi z\"</code>."}
    ],
  }
  N["heap"] = {
    pattern: "🟡 보통 · 속성 추가·중첩·동적 키·배열 속 객체 결과 예측",
    problems: [
      {"label":"속성 추가","ask":"o.x 추가 후 o.x 는?","code":"let o = {}\no.x = 5\nprint(o.x === ____)","expect":"true","answer":"5","hint":"방금 넣은 값","explain":"없던 속성도 <code>=</code>로 추가 → 5."},
      {"label":"중첩","ask":"d.in.v 는?","code":"let d = { in: { v: 7 } }\nprint(d.in.v === ____)","expect":"true","answer":"7","hint":"안쪽 v","explain":"점을 이어 <code>d.in.v</code> → 7."},
      {"label":"동적 키","ask":"o[k]=100, k=\"score\" 뒤 o.score 는?","code":"let o = {}\nlet k = \"score\"\no[k] = 100\nprint(o.score === ____)","expect":"true","answer":"100","hint":"k가 \"score\"라 o.score","explain":"<code>o[k]</code>는 k의 값 \"score\"를 키로 → <code>o.score=100</code>."},
      {"label":"배열 속 객체","ask":"arr[0].v=9 후 arr[0].v 는?","code":"let arr = [{ v: 1 }]\narr[0].v = 9\nprint(arr[0].v === ____)","expect":"true","answer":"9","hint":"방금 바꾼 값","explain":"<code>arr[0]</code>은 객체 → v를 9로 바꿔 9.","mem":{"title":"a·b는 같은 힙 객체 — 한쪽을 고치면 함께 바뀐다","stackLabel":"📇 이름표 장부","code":["let a = { v: 1 }","let b = a","b.v = 9"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"1"}]}},"note":"<code>let b=a</code> → 주소 복사 → <b>같은 h1</b>(별칭)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"9","bad":true}]}},"note":"<code>b.v=9</code> → h1을 고침 → <b>a.v도 9</b>."}]}},
      {"label":"객체 안 배열","ask":"o.list.length 는? {list:[1,2,3]}","code":"let o = { list: [1, 2, 3] }\nprint(o.list.length === ____)","expect":"true","answer":"3","hint":"3개","explain":"<code>o.list.length</code> → 3."}
    ],
  }
  N["passval"] = {
    pattern: "🟡 보통 · 곱·빼기·문자·불리언을 넘겨도 원본이 어떻게 되는지 예측",
    problems: [
      {"label":"곱해도 안전","ask":"f가 2배 해도 a는?","code":"function f(n) { n = n * 2 }\nlet a = 5\nf(a)\nprint(a === ____)","expect":"true","answer":"5","hint":"원본 안전","explain":"복사본을 2배 → a는 5."},
      {"label":"리셋해도 안전","ask":"reset이 0으로 해도 s는?","code":"function reset(x) { x = 0 }\nlet s = 100\nreset(s)\nprint(s === ____)","expect":"true","answer":"100","hint":"원본 안전","explain":"복사본만 0 → s는 100."},
      {"label":"더해도 안전","ask":"g가 +5 해도 n은?","code":"function g(v) { v = v + 5 }\nlet n = 10\ng(n)\nprint(n === ____)","expect":"true","answer":"10","hint":"복사본만 바뀜","explain":"복사본에만 +5 → n은 10."},
      {"label":"글자도 안전","ask":"clr이 글자 바꿔도 name은?","code":"function clr(s) { s = \"x\" }\nlet name = \"민지\"\nclr(name)\nprint(name === \"____\")","expect":"true","answer":"민지","hint":"원본 안전","explain":"복사본만 바뀜 → name은 <code>\"민지\"</code>."},
      {"label":"불리언도 안전","ask":"h가 false로 해도 flag는?","code":"function h(b) { b = false }\nlet flag = true\nh(flag)\nprint(flag === ____)","expect":"true","answer":"true","hint":"원본 안전","explain":"복사본만 false → flag는 true."}
    ],
  }
  N["passobj"] = {
    pattern: "🟡 보통 · 객체를 넘겨 속성·중첩·배열·공유를 바꾸면 원본 예측",
    problems: [
      {"label":"n 설정","ask":"f가 n=5로 하면 a.n은?","code":"function f(o) { o.n = 5 }\nlet a = { n: 0 }\nf(a)\nprint(a.n === ____)","expect":"true","answer":"5","hint":"같은 객체","explain":"같은 객체 → a.n도 5."},
      {"label":"중첩 변경","ask":"f가 pet.hp=0 하면 me.pet.hp는?","code":"function f(o) { o.pet.hp = 0 }\nlet me = { pet: { hp: 9 } }\nf(me)\nprint(me.pet.hp === ____)","expect":"true","answer":"0","hint":"중첩도 공유","explain":"중첩 객체도 공유 → me.pet.hp도 0."},
      {"label":"배열 속성","ask":"f가 list.push 하면 d.list의 개수는?","code":"function f(o) { o.list.push(9) }\nlet d = { list: [1] }\nf(d)\nprint(d.list.length === ____)","expect":"true","answer":"2","hint":"같은 배열","explain":"같은 배열 → list 개수 2."},
      {"label":"2배","ask":"grow가 n을 2배로 하면 d.n은?","code":"function grow(o) { o.n = o.n * 2 }\nlet d = { n: 5 }\ngrow(d)\nprint(d.n === ____)","expect":"true","answer":"10","hint":"5 × 2","explain":"같은 객체 → d.n도 10."},
      {"label":"공유 참조","ask":"f(a)가 a.v=1로. b는 a의 별칭. b.v는?","code":"function f(o) { o.v = 1 }\nlet a = { v: 0 }\nlet b = a\nf(a)\nprint(b.v === ____)","expect":"true","answer":"1","hint":"a·b 같은 객체","explain":"함수가 a를 바꾸면 별칭 b도 1(같은 객체)."}
    ],
  }
  N["passarr"] = {
    pattern: "🟡 보통 · 배열을 넘겨 push·수정·비우기 하면 원본 예측",
    problems: [
      {"label":"빈 배열에 push","ask":"add(a) 후 a[0]은?","code":"function add(l) { l.push(9) }\nlet a = []\nadd(a)\nprint(a[0] === ____)","expect":"true","answer":"9","hint":"같은 배열","explain":"같은 배열에 push → a[0]은 9."},
      {"label":"비우기","ask":"clr 후 items의 개수는?","code":"function clr(a) { a.length = 0 }\nlet items = [1, 2]\nclr(items)\nprint(items.length === ____)","expect":"true","answer":"0","hint":"같은 배열","explain":"같은 배열을 비움 → 0."},
      {"label":"0번 수정","ask":"set0 후 arr[0]은?","code":"function set0(a) { a[0] = 7 }\nlet arr = [1, 2]\nset0(arr)\nprint(arr[0] === ____)","expect":"true","answer":"7","hint":"같은 배열","explain":"같은 배열 0번 수정 → 7."},
      {"label":"항목 추가","ask":"grow 후 cart의 개수는?","code":"function grow(l) { l.push(\"새\") }\nlet cart = [\"빵\"]\ngrow(cart)\nprint(cart.length === ____)","expect":"true","answer":"2","hint":"같은 배열","explain":"같은 배열에 추가 → 2."},
      {"label":"두 번 push","ask":"fill 후 n의 개수는?","code":"function fill(a) { a.push(1); a.push(2) }\nlet n = []\nfill(n)\nprint(n.length === ____)","expect":"true","answer":"2","hint":"둘 push","explain":"같은 배열에 둘 push → 2."}
    ],
  }
  N["graph"] = {
    pattern: "🟡 보통 · 더 긴 화살표 경로·경로로 바꾼 결과 예측",
    problems: [
      {"label":"두 단계","ask":"a.b.c 는?","code":"let a = { b: { c: 5 } }\nprint(a.b.c === ____)","expect":"true","answer":"5","hint":"a.b.c","explain":"점을 이어 <code>a.b.c</code> → 5."},
      {"label":"세 단계","ask":"p.next.next.v 는?","code":"let p = { next: { next: { v: 9 } } }\nprint(p.next.next.v === ____)","expect":"true","answer":"9","hint":"p.next.next.v","explain":"<code>p.next.next.v</code> → 9."},
      {"label":"경로로 변경","ask":"y.ref는 x. y.ref.n=5 후 x.n은?","code":"let x = { n: 1 }\nlet y = { ref: x }\ny.ref.n = 5\nprint(x.n === ____)","expect":"true","answer":"5","hint":"y.ref = x","explain":"<code>y.ref</code>는 x와 같은 객체 → x.n도 5."},
      {"label":"링크 값","ask":"g.link.val 은?","code":"let g = { link: { val: 3 } }\nprint(g.link.val === ____)","expect":"true","answer":"3","hint":"g.link.val","explain":"<code>g.link.val</code> → 3."},
      {"label":"데이터 값","ask":"node.data.v 은?","code":"let node = { data: { v: 8 } }\nprint(node.data.v === ____)","expect":"true","answer":"8","hint":"node.data.v","explain":"<code>node.data.v</code> → 8."}
    ],
  }
  N["friends"] = {
    pattern: "🟡 보통 · 배열 속 객체의 값·별칭 변경 결과 예측",
    problems: [
      {"label":"두 번째 n","ask":"ppl[1].n 은?","code":"let ppl = [{ n: 1 }, { n: 2 }]\nprint(ppl[1].n === ____)","expect":"true","answer":"2","hint":"ppl[1].n","explain":"<code>ppl[1].n</code> → 2."},
      {"label":"이름","ask":"list[0].name 은?","code":"let list = [{ name: \"가\" }]\nprint(list[0].name === \"____\")","expect":"true","answer":"가","hint":"list[0].name","explain":"<code>list[0].name</code> → <code>\"가\"</code>."},
      {"label":"배열 별칭","ask":"arr[0]은 m과 같은 객체. arr[0].hp=0 후 m.hp는?","code":"let m = { hp: 9 }\nlet arr = [m]\narr[0].hp = 0\nprint(m.hp === ____)","expect":"true","answer":"0","hint":"arr[0] = m","explain":"<code>arr[0]</code>은 m과 같은 객체 → m.hp도 0."},
      {"label":"첫 id","ask":"u[0].id 는?","code":"let u = [{ id: 5 }, { id: 6 }]\nprint(u[0].id === ____)","expect":"true","answer":"5","hint":"u[0].id","explain":"<code>u[0].id</code> → 5."},
      {"label":"두 번째 item","ask":"c[1].item 은?","code":"let c = [{ item: \"빵\" }, { item: \"우유\" }]\nprint(c[1].item === \"____\")","expect":"true","answer":"우유","hint":"c[1].item","explain":"<code>c[1].item</code> → <code>\"우유\"</code>."}
    ],
  }
  N["family"] = {
    pattern: "🟡 보통 · 좌우 자식·중첩 트리 경로 끝의 값을 예측",
    problems: [
      {"label":"엄마 이름","ask":"me.mom.name 은?","code":"let me = { mom: { name: \"엄마\" } }\nprint(me.mom.name === \"____\")","expect":"true","answer":"엄마","hint":"me.mom.name","explain":"<code>me.mom.name</code> → <code>\"엄마\"</code>."},
      {"label":"왼쪽","ask":"r.left.val 은?","code":"let r = { left: { val: 5 } }\nprint(r.left.val === ____)","expect":"true","answer":"5","hint":"r.left.val","explain":"<code>r.left.val</code> → 5."},
      {"label":"자식 이름","ask":"p.child.name 은?","code":"let p = { child: { name: \"자식\" } }\nprint(p.child.name === \"____\")","expect":"true","answer":"자식","hint":"p.child.name","explain":"<code>p.child.name</code> → <code>\"자식\"</code>."},
      {"label":"오른쪽","ask":"r.right.val 은?","code":"let r = { right: { val: 8 } }\nprint(r.right.val === ____)","expect":"true","answer":"8","hint":"r.right.val","explain":"<code>r.right.val</code> → 8."},
      {"label":"노드 데이터","ask":"t.node.data 은?","code":"let t = { node: { data: 3 } }\nprint(t.node.data === ____)","expect":"true","answer":"3","hint":"t.node.data","explain":"<code>t.node.data</code> → 3."}
    ],
  }
  N["cycle"] = {
    pattern: "🟡 보통 · 순환 관계에서 한두 단계 따라간 값을 예측",
    problems: [
      {"label":"a.to.v","ask":"a.to=b, b.v=5. a.to.v 는?","code":"let a = {}\nlet b = {}\na.to = b\nb.v = 5\nprint(a.to.v === ____)","expect":"true","answer":"5","hint":"a.to = b","explain":"<code>a.to</code>는 b → v 5."},
      {"label":"x.p.id","ask":"x.p=y, y.id=2. x.p.id 는?","code":"let x = { id: 1 }\nlet y = { id: 2 }\nx.p = y\nprint(x.p.id === ____)","expect":"true","answer":"2","hint":"x.p = y","explain":"<code>x.p</code>는 y → id 2."},
      {"label":"a.next.n","ask":"a.next=b, b.n=4. a.next.n 는?","code":"let a = {}\nlet b = { n: 4 }\na.next = b\nprint(a.next.n === ____)","expect":"true","answer":"4","hint":"a.next = b","explain":"<code>a.next</code>는 b → n 4."},
      {"label":"b.back.n","ask":"b.back=a, a.n=3. b.back.n 는?","code":"let a = { n: 3 }\nlet b = { back: a }\nprint(b.back.n === ____)","expect":"true","answer":"3","hint":"b.back = a","explain":"<code>b.back</code>은 a → n 3."},
      {"label":"자기 순환","ask":"node.self=node, node.id=9. node.self.id 는?","code":"let node = { id: 9 }\nnode.self = node\nprint(node.self.id === ____)","expect":"true","answer":"9","hint":"self = node","explain":"<code>node.self</code>는 자기 → id 9."}
    ],
  }
  N["callstack"] = {
    pattern: "🟡 보통 · 3중 호출 사슬·인수 전달·중첩 호출 결과 예측",
    problems: [
      {"label":"3중 사슬","ask":"a→b→c, c()=9. a()는?","code":"function a() { return b() }\nfunction b() { return c() }\nfunction c() { return 9 }\nprint(a() === ____)","expect":"true","answer":"9","hint":"c가 9","explain":"a→b→c로 깊어졌다 c가 9를 반환 → 되돌아와 9."},
      {"label":"곱 사슬","ask":"a는 b()의 3배, b()=2. a()는?","code":"function a() { return b() * 3 }\nfunction b() { return 2 }\nprint(a() === ____)","expect":"true","answer":"6","hint":"2 × 3","explain":"b가 2, a가 3배 → 6."},
      {"label":"뺄셈 사슬","ask":"a는 b()-1, b()=10. a()는?","code":"function a() { return b() - 1 }\nfunction b() { return 10 }\nprint(a() === ____)","expect":"true","answer":"9","hint":"10 - 1","explain":"b가 10, a가 -1 → 9."},
      {"label":"인수 전달","ask":"a(3)이 b로 3 전달, b는 2배. a(3)은?","code":"function a(n) { return b(n) }\nfunction b(n) { return n * 2 }\nprint(a(3) === ____)","expect":"true","answer":"6","hint":"3 × 2","explain":"a가 3을 b로 넘기고 b가 2배 → 6."},
      {"label":"중첩 호출","ask":"inc=+1. inc(inc(3))은?","code":"function inc(n) { return n + 1 }\nprint(inc(inc(3)) === ____)","expect":"true","answer":"5","hint":"3→4→5","explain":"inc를 두 번 → <code>3→4→5</code>."}
    ],
  }
  N["closure"] = {
    pattern: "🟡 보통 · 인수를 붙잡는 팩토리·2회 카운터 결과 예측",
    problems: [
      {"label":"붙잡아 더하기","ask":"v=3을 붙잡아 v+4를 돌려주면?","code":"function make() { let v = 3; return function () { return v + 4 } }\nlet f = make()\nprint(f() === ____)","expect":"true","answer":"7","hint":"3 + 4","explain":"v(3)를 붙잡아 +4 → 7."},
      {"label":"카운터 2번","ask":"next()를 두 번 부르면(매번 +1)?","code":"function c() { let n = 0; return function () { n = n + 1; return n } }\nlet next = c()\nnext()\nprint(next() === ____)","expect":"true","answer":"2","hint":"1,2","explain":"두 번 불러 <code>1,2</code>."},
      {"label":"곱 팩토리","ask":"mk(5)가 붙잡은 5로 2배를 돌려주면?","code":"function mk(x) { return function () { return x * 2 } }\nlet f = mk(5)\nprint(f() === ____)","expect":"true","answer":"10","hint":"5 × 2","explain":"mk(5)의 5를 붙잡아 2배 → 10."},
      {"label":"인사말 팩토리","ask":"greeter(\"z\")가 만든 함수를 부르면? (return \"hi \"+name)","code":"function greeter(name) { return function () { return \"hi \" + name } }\nlet g = greeter(\"z\")\nprint(g() === \"____\")","expect":"true","answer":"hi z","hint":"\"hi \" + \"z\"","explain":"greeter의 name(\"z\")을 붙잡아 <code>\"hi z\"</code>."},
      {"label":"잔액","ask":"m=100을 붙잡아 m-40을 돌려주면?","code":"function bank() { let m = 100; return function () { return m - 40 } }\nlet b = bank()\nprint(b() === ____)","expect":"true","answer":"60","hint":"100 - 40","explain":"m(100)을 붙잡아 -40 → 60."}
    ],
  }
  N["gc"] = {
    pattern: "🟡 보통 · 한 참조를 끊어도 남은 참조로 객체는 산다 — 결과 예측",
    problems: [
      {"label":"남은 참조","ask":"a를 비워도 b가 가리킨다. b.n 은?","code":"let a = { n: 1 }\nlet b = a\na = null\nprint(b.n === ____)","expect":"true","answer":"1","hint":"b가 살림","explain":"a를 끊어도 b가 가리켜 n=1.","mem":{"title":"a를 끊어도 b가 가리켜 객체는 산다","stackLabel":"📇 이름표 장부","code":["let a = { n: 1 }","let b = a","a = null"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"n","value":"1"}]}},"note":"a·b 둘 다 h1을 가리킨다(참조 2개)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","value":"null","bad":true},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"n","value":"1"}]}},"note":"<code>a=null</code> → a 화살표 끊김. 하지만 <b>b가 h1을 가리켜 살아남는다</b>(GC 대상 아님)."}]}},
      {"label":"고아 만들기","ask":"x의 참조를 끊으면 x는?","code":"let x = { big: \"d\" }\nx = null\nprint(x === ____)","expect":"true","answer":"null","hint":"null","explain":"<code>null</code>로 참조를 끊는다."},
      {"label":"배열 살아있음","ask":"o를 비워도 r이 가리킨다. r.list의 개수는?","code":"let o = { list: [1] }\nlet r = o\no = null\nprint(r.list.length === ____)","expect":"true","answer":"1","hint":"r이 살림","explain":"o를 끊어도 r이 가리켜 list 개수 1."},
      {"label":"지켜둔 참조","ask":"data를 비워도 keep이 가리킨다. keep.v 는?","code":"let data = { v: 5 }\nlet keep = data\ndata = null\nprint(keep.v === ____)","expect":"true","answer":"5","hint":"keep이 살림","explain":"data를 끊어도 keep이 가리켜 v=5."},
      {"label":"여러 참조","ask":"x·y가 같은 객체. x를 비워도 y.n 은?","code":"let o = { n: 9 }\nlet x = o\nlet y = o\nx = null\nprint(y.n === ____)","expect":"true","answer":"9","hint":"y가 살림","explain":"x를 끊어도 y가 가리켜 n=9."}
    ],
  }
  N["class"] = {
    pattern: "🟡 보통 · 메서드·this로 자기 속성·여러 인수·조건 메서드 결과 예측",
    problems: [
      {"label":"this 쓰는 메서드","ask":"new P(\"z\").hi() 는? (hi는 \"hi \"+this.name 반환)","code":"class P { constructor(n) { this.name = n } hi() { return \"hi \" + this.name } }\nprint(new P(\"z\").hi() === \"____\")","expect":"true","answer":"hi z","hint":"\"hi \" + \"z\"","explain":"메서드 안 <code>this.name</code>은 자기 인스턴스 → <code>\"hi z\"</code>."},
      {"label":"속성 변경","ask":"바꾼 뒤 c.hp 는?","code":"class C { constructor() { this.hp = 100 } }\nlet c = new C()\nc.hp = 50\nprint(c.hp === ____)","expect":"true","answer":"50","hint":"방금 넣은 값","explain":"<code>c.hp=50</code>으로 덮어써 50."},
      {"label":"두 인수","ask":"new Pt(2, 3).y 는?","code":"class Pt { constructor(x, y) { this.x = x; this.y = y } }\nprint(new Pt(2, 3).y === ____)","expect":"true","answer":"3","hint":"두 번째 인수","explain":"두 번째 인수가 y → 3."},
      {"label":"계산 메서드","ask":"new Box(5).dbl() 는? (dbl은 n×2)","code":"class Box { constructor(n) { this.n = n } dbl() { return this.n * 2 } }\nprint(new Box(5).dbl() === ____)","expect":"true","answer":"10","hint":"5 × 2","explain":"<code>dbl</code>은 <code>this.n×2</code> → 10."},
      {"label":"조건 메서드","ask":"나이 15일 때 grade() 는? (19세 이상이면 \"성인\")","code":"class P { constructor(a) { this.age = a } grade() { return this.age >= 19 ? \"성인\" : \"청소년\" } }\nprint(new P(15).grade() === \"____\")","expect":"true","answer":"청소년","hint":"15 < 19","explain":"15는 19 미만 → <code>\"청소년\"</code>."}
    ],
  }
  N["objprim"] = {
    pattern: "🟡 보통 · 속성끼리·이름 함정·중첩·배열 — 어디로 값이 가나 예측",
    problems: [
      {"label":"속성끼리·원시","ask":"a.x = b.y 뒤 b.y = 9 하면 a.x는?","code":"let a = { x: 1 }\nlet b = { y: 5 }\na.x = b.y\nb.y = 9\nprint((a.x) === ____)","expect":"true","answer":"5","hint":"b.y의 값 5가 복사됨 → a.x는 독립","explain":"<b>원시=값 복사(독립)</b> — <code>a.x = b.y</code>는 b.y의 값 5를 <b>복사</b>해 a의 봉투에 담는다. 이후 <code>b.y=9</code>는 b의 봉투만 고쳐 <b>a.x는 5</b>. (객체=주소 복사(공유)와 대비)","mem":{"title":"a.x는 5 그대로 — 속성끼리도 원시는 값 복사","stackLabel":"📇 이름표 장부","code":["let a = { x: 1 }","let b = { y: 5 }","a.x = b.y","b.y = 9"],"steps":[{"line":2,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"x","value":"5","bad":true}]},"h2":{"fields":[{"key":"y","value":"5"}]}},"note":"<code>a.x = b.y</code> → 값 5를 <b>복사</b>해 h1의 x 칸에. h1·h2는 <b>별개 봉투</b>."},{"line":3,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"x","value":"5"}]},"h2":{"fields":[{"key":"y","value":"9","bad":true}]}},"note":"<code>b.y = 9</code>는 <b>h2만</b> 고친다. <b>a.x는 5 그대로</b>."}]}},
      {"label":"속성끼리·객체","ask":"a.g = b.f 뒤 b.f.v = 9 하면 a.g.v는?","code":"let a = {}\nlet b = { f: { v: 1 } }\na.g = b.f\nb.f.v = 9\nprint((a.g.v) === ____)","expect":"true","answer":"9","hint":"b.f는 객체 → 주소만 복사(공유)","explain":"<b>객체=주소 복사(공유)</b> — <code>a.g = b.f</code>는 안쪽 객체의 <b>주소만 복사</b> → a.g와 b.f가 같은 봉투. <code>b.f.v=9</code>가 그 봉투를 고쳐 <b>a.g.v도 9</b>. (원시=값 복사(독립)와 대비)","mem":{"title":"a.g.v도 9 — 속성에 객체를 넣으면 주소 공유","stackLabel":"📇 이름표 장부","code":["let a = {}","let b = { f: { v: 1 } }","a.g = b.f","b.f.v = 9"],"steps":[{"line":2,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"g","ref":"h3"}]},"h2":{"fields":[{"key":"f","ref":"h3"}]},"h3":{"fields":[{"key":"v","value":"1"}]}},"note":"<code>a.g = b.f</code> → <b>주소만 복사</b> → a.g와 b.f가 <b>같은 h3</b>을 가리킨다."},{"line":3,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"g","ref":"h3"}]},"h2":{"fields":[{"key":"f","ref":"h3"}]},"h3":{"fields":[{"key":"v","value":"9","bad":true}]}},"note":"<code>b.f.v = 9</code>가 h3을 고침 → <b>a.g.v도 9</b>."}]}},
      {"label":"이름 함정","ask":"me.name = name 뒤 변수 name = \"지훈\" 하면 me.name은?","code":"let name = \"민지\"\nlet me = {}\nme.name = name\nname = \"지훈\"\nprint((me.name) === \"____\")","expect":"true","answer":"민지","hint":"이름이 같아도 별개 셀 — 넣는 순간 값 복사","explain":"<b>원시=값 복사(독립)</b> — <code>me.name = name</code>은 변수 name의 값 \"민지\"를 <b>복사</b>해 봉투의 name 칸에 담는다. 이후 변수 <code>name=\"지훈\"</code> 재할당은 봉투와 무관 → <b>me.name은 \"민지\"</b>. 이름이 같을 뿐 <b>다른 셀</b>이다. (객체=주소 복사(공유)와 대비)","mem":{"title":"me.name은 \"민지\" 그대로 — 이름이 같아도 별개 셀","stackLabel":"📇 이름표 장부","code":["let name = \"민지\"","let me = {}","me.name = name","name = \"지훈\""],"steps":[{"line":2,"stack":[{"name":"main","slots":[{"name":"name","value":"\"민지\""},{"name":"me","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"name","value":"\"민지\""}]}},"note":"<code>me.name = name</code> → 값 \"민지\"를 <b>복사</b>해 h1의 name 칸에. 변수 name과는 <b>별개 셀</b>."},{"line":3,"stack":[{"name":"main","slots":[{"name":"name","value":"\"지훈\"","bad":true},{"name":"me","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"name","value":"\"민지\""}]}},"note":"변수 <code>name=\"지훈\"</code> 재할당은 h1과 무관 → <b>me.name은 \"민지\" 그대로</b>."}]}},
      {"label":"중첩 꺼내기","ask":"p = o.inner 뒤 p.val = 9 하면 o.inner.val은?","code":"let o = { inner: { val: 1 } }\nlet p = o.inner\np.val = 9\nprint((o.inner.val) === ____)","expect":"true","answer":"9","hint":"안쪽 객체의 주소를 복사 → 공유","explain":"<b>객체=주소 복사(공유)</b> — <code>o.inner</code>는 안쪽 봉투의 주소 → p와 o.inner가 <b>같은 봉투</b>. <code>p.val=9</code>가 그걸 고쳐 <b>o.inner.val도 9</b>. (원시=값 복사(독립)와 대비)","mem":{"title":"o.inner.val도 9 — 중첩 객체를 꺼내면 주소 공유","stackLabel":"📇 이름표 장부","code":["let o = { inner: { val: 1 } }","let p = o.inner","p.val = 9"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"p","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"inner","ref":"h2"}]},"h2":{"fields":[{"key":"val","value":"1"}]}},"note":"<code>let p = o.inner</code> → <b>주소만 복사</b> → p와 o.inner가 <b>같은 h2</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"o","ref":"h1"},{"name":"p","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"inner","ref":"h2"}]},"h2":{"fields":[{"key":"val","value":"9","bad":true}]}},"note":"<code>p.val = 9</code> → h2를 고침 → <b>o.inner.val도 9</b>."}]}},
      {"label":"배열·객체","ask":"e = arr[0](객체) 뒤 e.v = 9 하면 arr[0].v는?","code":"let arr = [{ v: 1 }]\nlet e = arr[0]\ne.v = 9\nprint((arr[0].v) === ____)","expect":"true","answer":"9","hint":"요소가 객체면 주소 복사 → 공유","explain":"<b>객체=주소 복사(공유)</b> — 요소가 객체면 <code>arr[0]</code>을 꺼낼 때 <b>주소만 복사</b> → e와 arr[0]이 같은 봉투. <code>e.v=9</code>가 그걸 고쳐 <b>arr[0].v도 9</b>. (요소가 원시면 값 복사(독립)라 안 샌다)","mem":{"title":"arr[0].v도 9 — 요소가 객체면 꺼낼 때 주소 공유","stackLabel":"📇 이름표 장부","code":["let arr = [{ v: 1 }]","let e = arr[0]","e.v = 9"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"arr","ref":"h1"},{"name":"e","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"0","ref":"h2"}]},"h2":{"fields":[{"key":"v","value":"1"}]}},"note":"<code>let e = arr[0]</code> → 요소가 객체라 <b>주소만 복사</b> → e와 arr[0]이 <b>같은 h2</b>."},{"line":2,"stack":[{"name":"main","slots":[{"name":"arr","ref":"h1"},{"name":"e","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"0","ref":"h2"}]},"h2":{"fields":[{"key":"v","value":"9","bad":true}]}},"note":"<code>e.v = 9</code> → h2를 고침 → <b>arr[0].v도 9</b>."}]}}
    ],
  }
})()
