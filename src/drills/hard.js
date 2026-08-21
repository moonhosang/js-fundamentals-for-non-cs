// 🔴 어려움 드릴 (ADR 0008) — 예측 패턴 · 정답 시 설명/메모리 증명. 자동 생성.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const H = window.Drills.hard
  H["spread"] = {
    pattern: "🔴 어려움 · 얕은 복사(shallow) — 중첩 객체·배열 칸은 주소만 복사돼 여전히 공유",
    problems: [
      {"label":"중첩 공유(함정)","ask":"{...p} 사본의 중첩 객체를 바꾸면 원본은? (얕은 복사!)","code":"let p = { best: { n: \"효니\" } }\nlet c = { ...p }\nc.best.n = \"보리\"\nprint((p.best.n) === \"____\")","expect":"true","answer":"보리","hint":"best 칸은 주소만 복사 — 같은 봉투 공유","explain":"<code>{ ...p }</code>는 <b>얕은 복사</b> — best 칸의 <b>주소만 복사</b>돼 c.best와 p.best는 <b>같은 봉투</b>. c.best.n을 고치면 <b>p.best.n도 \"보리\"</b>로 샌다.","see":"spread"},
      {"label":"배열 칸 공유","ask":"{...p} 사본의 배열 칸에 push하면 원본 개수는?","code":"let p = { tags: [\"a\"] }\nlet c = { ...p }\nc.tags.push(\"b\")\nprint((p.tags.length) === ____)","expect":"true","answer":"2","hint":"배열도 객체 — 주소만 복사(공유)","explain":"tags 칸엔 <b>배열 주소</b>. 얕은 복사라 주소만 복사돼 c.tags와 p.tags는 <b>같은 배열</b> — push가 p.tags에도 보여 length 2."},
      {"label":"원시는 독립·중첩은 공유","ask":"같은 사본에서 원시 hp를 바꾸면 원본 hp는?","code":"let p = { hp: 100, best: { n: \"효니\" } }\nlet c = { ...p }\nc.hp = 0\nprint((p.hp) === ____)","expect":"true","answer":"100","hint":"hp는 원시 — 값복사(독립). best만 공유였다","explain":"같은 얕은 복사라도 <b>칸마다 다르다</b> — hp(원시)는 값복사라 <b>독립</b>(p.hp는 100), best(객체)만 주소복사라 공유. '칸에 값이냐 주소표냐'가 갈림."},
      {"label":"깊게 끊기","ask":"중첩도 스프레드하면? {...p, best: {...p.best}}","code":"let p = { best: { n: \"효니\" } }\nlet c = { ...p, best: { ...p.best } }\nc.best.n = \"보리\"\nprint((p.best.n) === \"____\")","expect":"true","answer":"효니","hint":"best도 새 봉투로 떠서 이제 독립","explain":"<code>best: { ...p.best }</code>로 <b>안쪽 봉투까지 새로</b> 떴다 → c.best와 p.best는 <b>다른 봉투</b>. 이제 c.best.n을 고쳐도 <b>p.best.n은 \"효니\"</b>. (얕은 복사 함정을 한 겹 더 떠서 해결)"},
      {"label":"배열 속 객체 공유","ask":"[...arr] 사본 속 객체를 바꾸면 원본 쪽은?","code":"let arr = [{ hp: 100 }]\nlet c = [ ...arr ]\nc[0].hp = 0\nprint((arr[0].hp) === ____)","expect":"true","answer":"0","hint":"배열은 얕게 복사 — 원소가 객체면 그 객체는 공유","explain":"<code>[ ...arr ]</code>도 <b>얕은 복사</b> — 원소가 <b>객체 주소</b>면 그 주소만 복사돼 c[0]과 arr[0]은 <b>같은 봉투</b>. c[0].hp=0이 arr[0].hp도 0."}
    ]
  }
  H["objanat"] = {
    pattern: "🔴 어려움 · 중첩·수명·스프레드 — 봉투 규칙의 함정을 예측",
    problems: [
      {"label":"2겹 중첩 공유","ask":"g로 2겹 안을 바꾸면 p 쪽은?","code":"let p = { inner: { hp: 100 } }\nlet g = p.inner\ng.hp = 0\nprint((p.inner.hp) === ____)","expect":"true","answer":"0","hint":"inner 칸도 주소표 — g와 p.inner는 같은 봉투","explain":"inner 칸엔 <b>안쪽 봉투의 주소</b>. g에 그 주소가 복사돼 <b>같은 안쪽 봉투</b> — <code>g.hp=0</code>이 p.inner.hp도 0."},
      {"label":"반환 후 생존","ask":"함수가 만든 봉투를 돌려받으면 hp는?","code":"function make() { let q = { hp: 7 }; return q }\nlet c = make()\nprint((c.hp) === ____)","expect":"true","answer":"7","hint":"객체는 힙에 살아 반환된다 — 프레임 pop과 무관","explain":"q는 <b>힙 봉투</b>. return이 그 <b>주소를 내보내</b> c가 받는다. make 프레임은 pop돼도 봉투는 힙에 살아남아 <b>c.hp는 7</b>. (속성은 봉투째 산다)","see":"heap"},
      {"label":"스프레드 새 봉투","ask":"{...p}로 사본을 만들고 원본 원시를 바꾸면 사본은?","code":"let p = { hp: 100 }\nlet copy = { ...p }\np.hp = 0\nprint((copy.hp) === ____)","expect":"true","answer":"100","hint":"스프레드는 새 봉투 — 원시 값은 복사(독립)","explain":"<code>{ ...p }</code>는 <b>새 봉투</b>에 p의 칸을 복사. 원시(hp)는 <b>값 복사=독립</b> → 원본 p.hp를 0으로 바꿔도 <b>copy.hp는 100</b>."},
      {"label":"얕은 복사 함정","ask":"{...p}로 복사해도 중첩 객체는 공유 — 원본 안쪽을 바꾸면 copy 쪽은?","code":"let p = { in: { n: 1 } }\nlet copy = { ...p }\np.in.n = 9\nprint((copy.in.n) === ____)","expect":"true","answer":"9","hint":"스프레드는 얕은 복사 — 중첩 봉투는 주소만 복사(공유)","explain":"<code>{...p}</code>는 <b>얕은 복사</b> — in 칸의 <b>주소표만 복사</b>라 copy.in과 p.in은 <b>같은 안쪽 봉투</b>. <code>p.in.n=9</code>가 copy.in.n도 9. (중첩은 공유가 샌다)"},
      {"label":"배열 속성 공유","ask":"객체 안 배열을 꺼내 push하면 원본 쪽 개수는?","code":"let p = { tags: [\"a\"] }\nlet t = p.tags\nt.push(\"b\")\nprint((p.tags.length) === ____)","expect":"true","answer":"2","hint":"배열도 객체 — 꺼내면 주소 공유","explain":"tags 칸엔 <b>배열 주소</b>. t에 복사돼 <b>같은 배열</b> — <code>t.push</code>가 p.tags에도 보여 length 2. (배열=객체라 공유)"}
    ]
  }
  H["1"] = {
    pattern: "🔴 어려움 · typeof 함정·부동소수점·+와 -의 차이 — 아는 것도 틀린다",
    problems: [
      {"label":"typeof null","ask":"null 의 typeof 결과는? (JS의 유명한 버그)","code":"print((typeof null) === \"____\")","expect":"true","answer":"object","hint":"오래된 버그 — object","explain":"<code>typeof null</code>은 <b>\"object\"</b> — JS 초창기 버그가 호환성 때문에 남았다.","see":"builtins","wiki":{"label":"자료형","url":"https://ko.wikipedia.org/wiki/자료형"}},
      {"label":"typeof NaN","ask":"NaN(계산 실패값)의 typeof 이름은?","code":"print((typeof NaN) === \"____\")","expect":"true","answer":"number","hint":"뜻밖에 number","explain":"NaN은 \"숫자가 아님\"이지만 <b>타입은 number</b>(실패한 숫자 계산 결과).","see":"builtins"},
      {"label":"부동소수점","ask":"0.1 + 0.2 는 0.3 과 정확히 같은가?","code":"print((0.1 + 0.2 === 0.3) === ____)","expect":"true","answer":"false","hint":"미세 오차로 다르다","explain":"0.1·0.2는 2진 소수로 딱 안 떨어져 <b>미세 오차</b>가 생겨 0.3과 다르다."},
      {"label":"- 는 숫자로","ask":"\"5\" - 1 의 결과는? (빼기는 +와 다르게)","code":"print((\"5\" - 1) === ____)","expect":"true","answer":"4","hint":"\"5\"가 숫자 5로 강제","explain":"<code>-</code>는 <code>\"5\"</code>를 <b>숫자 5로 강제</b> → <code>5-1=4</code>. (+와 반대)"},
      {"label":"미초기화","ask":"값을 안 넣은 변수 x의 타입 이름은?","code":"let x\nprint((typeof x) === \"____\")","expect":"true","answer":"undefined","hint":"선언만 = undefined","explain":"선언만 하고 값을 안 넣은 변수는 <code>undefined</code>.","see":"builtins"}
    ],
  }
  H["2"] = {
    pattern: "🔴 어려움 · +는 글자로, -·*는 숫자로 — 연산자마다 다른 강제 변환",
    problems: [
      {"label":"* 는 숫자로","ask":"\"5\" * 2 는? (곱하기는 숫자로 강제)","code":"print((\"5\" * 2) === ____)","expect":"true","answer":"10","hint":"\"5\"→5, 5×2","explain":"<code>*</code>는 글자를 <b>숫자로 강제</b> → <code>5*2=10</code>. (+와 반대)","wiki":{"label":"형 변환","url":"https://ko.wikipedia.org/wiki/형_변환"}},
      {"label":"+ \"\" 는 글자로","ask":"10 + \"\" 는? (숫자 + 빈 글자)","code":"print((10 + \"\") === \"____\")","expect":"true","answer":"10","hint":"글자로 변함 → \"10\"","explain":"<code>+</code>에 빈 글자가 끼면 숫자가 <b>문자로</b> → <code>\"10\"</code>. 숫자→문자 변환 관용구."},
      {"label":"글자도 인덱스","ask":"\"abc\"[1] 는? (글자도 번호로 접근)","code":"print((\"abc\"[1]) === \"____\")","expect":"true","answer":"b","hint":"0:a,1:b","explain":"문자열도 <b>번호로 접근</b> → 1번 글자 <code>\"b\"</code>."},
      {"label":"split 개수","ask":"\"a,b,c\".split(\",\") 의 개수는?","code":"print((\"a,b,c\".split(\",\").length) === ____)","expect":"true","answer":"3","hint":"쉼표로 3조각","explain":"<code>split(\",\")</code>는 쉼표로 잘라 배열 <code>[\"a\",\"b\",\"c\"]</code> → 길이 3.","see":"builtins"},
      {"label":"Number 변환","ask":"Number(\"12\") + 3 는?","code":"print((Number(\"12\") + 3) === ____)","expect":"true","answer":"15","hint":"\"12\"→숫자 12, +3","explain":"<code>Number(\"12\")</code>는 문자를 숫자 12로 → <code>12+3=15</code>.","see":"builtins"}
    ],
  }
  H["3"] = {
    pattern: "🔴 어려움 · 지수·왼쪽부터 결합·강제 형변환·비교 체인",
    problems: [
      {"label":"지수","ask":"2 ** 3 은? (2의 3제곱)","code":"print((2 ** 3) === ____)","expect":"true","answer":"8","hint":"2*2*2","explain":"<code>2**3</code>은 2의 3제곱 → 8.","see":"builtins"},
      {"label":"왼쪽부터 결합","ask":"1 + 2 + \"3\" 은? (왼쪽부터: 3, 그다음 문자 이어붙이기)","code":"print((1 + 2 + \"3\") === ____)","expect":"true","answer":"\"33\"","hint":"1+2=3 → 3+\"3\"=\"33\"","explain":"왼쪽부터: <code>1+2=3</code>, <code>3+\"3\"</code>은 글자 → <code>\"33\"</code>."},
      {"label":"문자 - 숫자","ask":"\"5\" - 1 은? (빼기는 숫자로 강제 변환)","code":"print((\"5\" - 1) === ____)","expect":"true","answer":"4","hint":"\"5\"가 숫자 5로 → 5-1","explain":"<code>-</code>는 <code>\"5\"</code>를 숫자 5로 강제 → <code>5-1=4</code>."},
      {"label":"true + 1","ask":"true + 1 은? (true는 1로)","code":"print((true + 1) === ____)","expect":"true","answer":"2","hint":"true → 1","explain":"true가 숫자 1로 강제 → <code>1+1=2</code>."},
      {"label":"비교 체인","ask":"10 > 5 === true 는? (> 가 === 보다 먼저)","code":"print((10 > 5 === true) === ____)","expect":"true","answer":"true","hint":"10>5=true, true===true","explain":"<code>&gt;</code>가 먼저: <code>10&gt;5=true</code>, <code>true===true=true</code>."}
    ],
  }
  H["4"] = {
    pattern: "🔴 어려움 · 결과를 예측 — 강제 변환·단축평가·평가 순서·NaN 함정",
    problems: [
      {"label":"&&는 값을 돌려준다","ask":"&&는 불리언이 아니라 \"피연산자\"를 돌려준다. 1 && 2 의 값은?","code":"print((1 && 2) === ____)","expect":"true","answer":"2","hint":"둘 다 참이면 뒤쪽(2)을 돌려준다","explain":"<code>&amp;&amp;</code>는 참/거짓이 아니라 <b>피연산자 자체</b>를 돌려준다 → 둘 다 참이면 뒤쪽 2.","wiki":{"label":"형 변환","url":"https://ko.wikipedia.org/wiki/형_변환"}},
      {"label":"||는 값을 돌려준다","ask":"||는 참인 쪽 \"피연산자\"를 돌려준다. 0 || \"안녕\" 의 값은?","code":"print((0 || \"안녕\") === ____)","expect":"true","answer":"\"안녕\"","hint":"0은 falsy → 오른쪽 값 자체","explain":"<code>||</code>는 <b>참인 쪽 피연산자</b>를 돌려준다 → 0은 falsy라 <code>\"안녕\"</code>."},
      {"label":"비교 체인","ask":"2 > 1 > 0 의 결과는? (왼쪽부터: 앞이 true가 되고, 그 true가 다시...)","code":"print((2 > 1 > 0) === ____)","expect":"true","answer":"true","hint":"(2>1)=true → true>0 → 1>0 → true","explain":"왼쪽부터: <code>2&gt;1=true</code>, <code>true</code>가 1로 강제 → <code>1&gt;0=true</code>."},
      {"label":"NaN 함정","ask":"NaN === NaN 의 결과는? (자기 자신과 비교)","code":"print((NaN === NaN) === ____)","expect":"true","answer":"false","hint":"NaN은 자기 자신과도 같지 않다","explain":"NaN은 <b>자기 자신과도 같지 않게</b> 정의돼 있다 → false. (유일한 예외)","see":"builtins"},
      {"label":"느슨한 ==","ask":"느슨한 == 로 \"\" 와 0 을 비교하면? (양쪽을 숫자로 강제 변환)","code":"print((\"\" == 0) === ____)","expect":"true","answer":"true","hint":"\"\"→0, 0==0 → true","explain":"느슨한 <code>==</code>는 양쪽을 숫자로 강제: <code>\"\"→0</code>, <code>0==0=true</code>."}
    ],
  }
  H["5"] = {
    pattern: "🔴 어려움 · 조합·콜백 + 본문을 직접 조립해 🔨만들기",
    problems: [
      {"label":"중첩 호출","ask":"twice는 2배. twice(twice(3))은?","code":"function twice(n) { return n * 2 }\nprint(twice(twice(3)) === ____)","expect":"true","answer":"12","hint":"안쪽부터 — twice(3)=6, 그다음 6×2","explain":"<b>안쪽부터</b> — twice(3)=6이 먼저, 그 6이 바깥 twice로 → 12. 반환값이 곧 다음 인수.","see":"5-5","mem":{"title":"안쪽 호출이 먼저 — 프레임이 쌓였다 반환된다","stackLabel":"📚 스택 (이름표 장부)","code":["function twice(n) { return n * 2 }","twice(twice(3))"],"steps":[{"line":1,"stack":[{"name":"main","slots":[]},{"name":"twice","slots":[{"name":"n","value":"3"}]}],"heap":{},"note":"<b>안쪽 twice(3)</b> 먼저 — n=3."},{"line":0,"stack":[{"name":"main","slots":[]}],"heap":{},"returning":{"value":"6"},"note":"<b>⑤</b> 안쪽이 6을 통로로 반환·pop."},{"line":1,"stack":[{"name":"main","slots":[]},{"name":"twice","slots":[{"name":"n","value":"6"}]}],"heap":{},"note":"그 <b>6으로 바깥 twice</b> 호출 — n=6."},{"line":0,"stack":[{"name":"main","slots":[]}],"heap":{},"returning":{"value":"12"},"note":"<b>⑤</b> 바깥이 12를 반환·pop → 최종 12."}]}},
      {"label":"반환값 재사용","ask":"add의 반환값을 다시 인수로. add(add(1,2), 3)은?","code":"function add(a, b) { return a + b }\nprint(add(add(1, 2), 3) === ____)","expect":"true","answer":"6","hint":"안쪽 add(1,2)=3, 그다음 add(3,3)","explain":"안쪽 <code>add(1,2)</code>=3 → <code>add(3,3)</code>=6. 반환값을 <b>부품으로 조립</b>하는 게 함수의 힘."},
      {"label":"콜백","ask":"map에 함수를 넘기면? [1,2,3].map(dbl)의 첫 요소는?","code":"function dbl(n) { return n * 2 }\nlet r = [1, 2, 3].map(dbl)\nprint(r[0] === ____)","expect":"true","answer":"2","hint":"각 요소에 dbl 적용 → 1→2","explain":"<code>map(dbl)</code>은 각 요소마다 dbl을 <b>불러</b> 변환 → [2,4,6]. 첫 요소 2. (함수를 값처럼 넘긴다 = 콜백)","see":"5-7"},
      {"label":"🔨 만들기·큰 값","ask":"max2(a,b)가 둘 중 큰 값을 돌려주도록 채워라 (삼항)","code":"function max2(a, b) { return ____ }\nprint(max2(3, 8) === 8 && max2(10, 2) === 10)","expect":"true","answer":"a > b ? a : b","hint":"삼항 조건 ? 참 : 거짓","explain":"<code>a > b ? a : b</code> — a가 크면 a, 아니면 b. 삼항은 <b>값을 낳는 if</b>라 그대로 return.","see":"5-4"},
      {"label":"🔨 만들기·본문 조립","ask":"greet(name)이 \"안녕, 민지님\"처럼 돌려주도록 채워라","code":"function greet(name) { return ____ }\nprint(greet(\"민지\") === \"안녕, 민지님\")","expect":"true","answer":"\"안녕, \" + name + \"님\"","hint":"문자열 이어붙이기 + 매개변수","explain":"<code>\"안녕, \" + name + \"님\"</code>으로 조립 → greet(\"민지\")=\"안녕, 민지님\". 매개변수를 문장에 끼워 만든다."},
      {"label":"🔨 만들기·화살표로","ask":"function으로 된 dbl을 화살표로 재작성 — 빈칸은?","code":"let dbl = (n) => ____\nprint(dbl(5) === 10)","expect":"true","answer":"n * 2","hint":"한 줄이면 return 생략","explain":"화살표는 한 줄이면 <b>return 생략</b> — <code>(n) => n * 2</code>. 보통 함수 <code>function dbl(n){return n*2}</code>와 완전히 같다.","see":"5-7"}
    ],
  }
  H["6"] = {
    pattern: "🔴 어려움 · 배열은 참조·sort는 문자 비교·음수 인덱스 없음 — 함정",
    problems: [
      {"label":"join","ask":"[1,2,3] 을 \"-\" 로 이으면?","code":"print(([1, 2, 3].join(\"-\")) === \"____\")","expect":"true","answer":"1-2-3","hint":"사이에 - 끼움","explain":"<code>join(\"-\")</code>은 요소 사이에 \"-\"를 끼워 문자열 → <code>\"1-2-3\"</code>.","see":"builtins"},
      {"label":"배열은 참조","ask":"b = a 로 둔 뒤 b에 push하면 원본 a의 개수는?","code":"let a = [1, 2, 3]\nlet b = a\nb.push(4)\nprint(a.length === ____)","expect":"true","answer":"4","hint":"같은 배열 → a도 늘어남","explain":"<b>배열은 참조</b> → b·a가 같은 배열이라 b에 push하면 a도 늘어 4.","see":"ref2","wiki":{"label":"배열","url":"https://ko.wikipedia.org/wiki/배열"}},
      {"label":"sort 함정","ask":"[3, 20, 100].sort() 의 첫 요소는? (기본 정렬은 문자로 비교!)","code":"print(([3, 20, 100].sort()[0]) === ____)","expect":"true","answer":"100","hint":"\"100\" < \"20\" < \"3\" → 첫째 100","explain":"기본 <code>sort()</code>는 <b>문자로 비교</b> → \"100\"&lt;\"20\"&lt;\"3\" → 첫째 100. (함정)","see":"builtins"},
      {"label":"음수 인덱스 없음","ask":"a[-1] 로 마지막을 꺼내려 하면? (JS엔 음수 인덱스가 없다)","code":"let a = [1, 2, 3]\nprint((a[-1]) === ____)","expect":"true","answer":"undefined","hint":"없는 칸 → undefined","explain":"JS엔 <b>음수 인덱스가 없다</b> → 없는 칸 <code>undefined</code>. (파이썬과 다름)"},
      {"label":"filter 개수","ask":"[1,2,3,4] 에서 2보다 큰 것만 거르면 몇 개?","code":"print(([1, 2, 3, 4].filter(x => x > 2).length) === ____)","expect":"true","answer":"2","hint":"3,4 → 2개","explain":"<code>filter(x&gt;2)</code>는 3,4만 남겨 개수 2."}
    ],
  }
  H["7"] = {
    pattern: "🔴 어려움 · 시작값 없는 reduce·find·every·객체 배열 집계·forEach는 undefined",
    problems: [
      {"label":"reduce 시작값 없음","ask":"요소가 하나면 시작값 없는 reduce는? [5].reduce((a,b)=>a+b)","code":"print([5].reduce((a, b) => a + b) === ____)","expect":"true","answer":"5","hint":"더할 짝이 없어 그대로 5","explain":"시작값 없는 reduce는 <b>첫 요소를 그대로 시작값</b>으로 → 요소 하나면 5."},
      {"label":"find","ask":"7보다 큰 첫 값은?","code":"print([5, 10, 15].find(x => x > 7) === ____)","expect":"true","answer":"10","hint":"조건 맞는 첫 값","explain":"<code>find</code>는 조건 맞는 <b>첫 값</b>을 돌려준다 → 10.","see":"builtins"},
      {"label":"every","ask":"전부 0보다 큰가?","code":"print([1, 2, 3].every(x => x > 0) === ____)","expect":"true","answer":"true","hint":"모두 만족 → true","explain":"<code>every</code>는 <b>모두</b> 만족하면 true.","see":"builtins"},
      {"label":"객체 배열 집계","ask":"나이만 뽑아 다 더하면?","code":"print([{ age: 20 }, { age: 30 }].map(p => p.age).reduce((a, b) => a + b, 0) === ____)","expect":"true","answer":"50","hint":"20 + 30","explain":"<code>map</code>으로 나이만 뽑아 <code>reduce</code>로 합 → <code>20+30=50</code>."},
      {"label":"forEach 반환","ask":"forEach는 무엇을 돌려주나?","code":"let r = [1, 2].forEach(x => x)\nprint(r === ____)","expect":"true","answer":"undefined","hint":"forEach는 반환이 없다","explain":"<code>forEach</code>는 <b>반환이 없다</b> → r은 undefined. (map과 다름)","wiki":{"label":"배열","url":"https://ko.wikipedia.org/wiki/배열"}}
    ],
  }
  H["8"] = {
    pattern: "🔴 어려움 · 메서드·깊은 중첩·reduce 집계·조건 결합·this 결과 예측",
    problems: [
      {"label":"메서드","ask":"dog.bark() 는?","code":"let dog = { bark: function () { return \"멍\" } }\nprint(dog.bark() === \"____\")","expect":"true","answer":"멍","hint":"bark의 반환","explain":"값이 함수인 속성 = <b>메서드</b> → <code>dog.bark()</code>가 <code>\"멍\"</code>.","wiki":{"label":"객체 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)"}},
      {"label":"깊은 중첩","ask":"data.users[0].pet.name 은?","code":"let data = { users: [{ pet: { name: \"콩이\" } }] }\nprint(data.users[0].pet.name === \"____\")","expect":"true","answer":"콩이","hint":"끝까지 따라감","explain":"점·번호를 이어 끝까지 → <code>data.users[0].pet.name=\"콩이\"</code>."},
      {"label":"나이 합(reduce)","ask":"사람들의 나이를 다 더하면?","code":"let ppl = [{ age: 24 }, { age: 30 }]\nprint(ppl.reduce((s, p) => s + p.age, 0) === ____)","expect":"true","answer":"54","hint":"24 + 30","explain":"각 사람의 age를 누적 → <code>24+30=54</code>."},
      {"label":"조건 결합","ask":"vip면 이름 뒤에 별을 붙인다. 결과는?","code":"let p = { name: \"민지\", vip: true }\nprint((p.name + (p.vip ? \"⭐\" : \"\")) === \"____\")","expect":"true","answer":"민지⭐","hint":"vip라 별 붙음","explain":"vip가 참이라 <code>\"⭐\"</code>가 붙어 <code>\"민지⭐\"</code>."},
      {"label":"this 메서드","ask":"c.hi() 는? (hi는 \"나는 \"+this.name 반환)","code":"let c = { name: \"민지\", hi() { return \"나는 \" + this.name } }\nprint(c.hi() === \"____\")","expect":"true","answer":"나는 민지","hint":"this.name = \"민지\"","explain":"메서드 안 <code>this</code>는 <b>자기 객체</b> → <code>this.name=\"민지\"</code>."}
    ],
  }
  H["9"] = {
    pattern: "🔴 어려움 · innerHTML 안 찾기·스타일·속성·append는 이동(중복 아님) 예측",
    problems: [
      {"label":"innerHTML 안 찾기","ask":"넣은 <p>의 글자는?","code":"let el = document.createElement(\"div\")\nel.innerHTML = \"<p>hi</p>\"\nprint(el.querySelector(\"p\").textContent === \"____\")","expect":"true","answer":"hi","hint":"p 안의 글자","explain":"<code>innerHTML</code>로 넣은 <code>&lt;p&gt;</code>를 골라 글자를 읽는다."},
      {"label":"크기 스타일","ask":"el.style.width 는?","code":"let el = document.createElement(\"div\")\nel.style.width = \"10px\"\nprint(el.style.width === \"____\")","expect":"true","answer":"10px","hint":"방금 정한 너비","explain":"<code>style.width</code>에 정한 값을 읽는다."},
      {"label":"속성","ask":"getAttribute(\"href\") 는?","code":"let el = document.createElement(\"a\")\nel.setAttribute(\"href\", \"#\")\nprint(el.getAttribute(\"href\") === \"____\")","expect":"true","answer":"#","hint":"방금 넣은 값","explain":"<code>setAttribute</code>로 넣은 값을 <code>getAttribute</code>로 읽는다."},
      {"label":"append는 이동","ask":"같은 span을 두 번 append하면 자식 개수는? (같은 요소는 이동일 뿐)","code":"let box2 = document.createElement(\"div\")\nlet s = document.createElement(\"span\")\nbox2.append(s)\nbox2.append(s)\nprint(box2.children.length === ____)","expect":"true","answer":"1","hint":"복제가 아니라 이동 → 1개","explain":"<b>같은 요소는 복제가 아니라 이동</b> → 두 번 append해도 자식 1개."},
      {"label":"숫자+글자","ask":"el.textContent = 90 + \"점\" 은?","code":"let el = document.createElement(\"div\")\nel.textContent = 90 + \"점\"\nprint(el.textContent === \"____\")","expect":"true","answer":"90점","hint":"숫자가 문자로","explain":"숫자+글자라 <code>textContent</code>가 <code>\"90점\"</code>."}
    ],
  }
  H["10"] = {
    pattern: "🔴 어려움 · 카드 문자열·조건 배지·filter 집계·메서드·DOM 결과 예측",
    problems: [
      {"label":"카드 문자열","ask":"u.name + \"(\" + u.age + \")\" 는?","code":"let u = { name: \"민지\", age: 24 }\nprint((u.name + \"(\" + u.age + \")\") === \"____\")","expect":"true","answer":"민지(24)","hint":"이어붙이기","explain":"속성을 이어붙인 카드 문자열 <code>\"민지(24)\"</code>."},
      {"label":"VIP 배지","ask":"vip면 별을 붙인다. 결과는?","code":"let u = { name: \"민지\", vip: true }\nprint((u.name + (u.vip ? \"⭐\" : \"\")) === \"____\")","expect":"true","answer":"민지⭐","hint":"vip라 별 붙음","explain":"vip라 <code>\"⭐\"</code>가 붙어 <code>\"민지⭐\"</code>."},
      {"label":"거르고 세기","ask":"25살 초과는 몇 명?","code":"let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.filter(p => p.age > 25).length === ____)","expect":"true","answer":"1","hint":"30살 한 명","explain":"<code>filter</code>로 25 초과(30살)만 → 1명."},
      {"label":"메서드","ask":"dog.bark() 는?","code":"let dog = { bark: function () { return \"멍\" } }\nprint(dog.bark() === \"____\")","expect":"true","answer":"멍","hint":"bark의 반환","explain":"메서드 <code>dog.bark()</code> → <code>\"멍\"</code>."},
      {"label":"DOM + 숫자","ask":"el.textContent = 90 + \"점\" 은?","code":"let el = document.createElement(\"div\")\nel.textContent = 90 + \"점\"\nprint(el.textContent === \"____\")","expect":"true","answer":"90점","hint":"숫자가 문자로","explain":"숫자 90이 문자로 → <code>\"90점\"</code>."}
    ],
  }
  H["ram"] = {
    pattern: "🔴 어려움 · typeof null=object·NaN=number·부동소수점·복사 독립",
    problems: [
      {"label":"typeof null","ask":"null 의 typeof 는? (유명 버그)","code":"print((typeof null) === \"____\")","expect":"true","answer":"object","hint":"오래된 버그 — object","explain":"<code>typeof null=\"object\"</code> — JS의 오래된 버그(호환성 때문에 유지).","see":"builtins"},
      {"label":"typeof NaN","ask":"NaN 의 typeof 는?","code":"print((typeof NaN) === \"____\")","expect":"true","answer":"number","hint":"뜻밖에 number","explain":"NaN은 실패한 <b>숫자</b> → 타입은 number.","see":"builtins"},
      {"label":"부동소수점","ask":"0.1 + 0.2 는 0.3 과 정확히 같은가?","code":"print((0.1 + 0.2 === 0.3) === ____)","expect":"true","answer":"false","hint":"미세 오차로 다르다","explain":"2진 소수 오차로 <code>0.1+0.2 ≠ 0.3</code>."},
      {"label":"복사 두 값","ask":"a=1,b=a,b=9 후 a + b 는? (a는 복사라 그대로)","code":"let a = 1\nlet b = a\nb = 9\nprint((a + b) === ____)","expect":"true","answer":"10","hint":"a=1 + b=9","explain":"a는 복사라 1, b만 9 → <code>1+9=10</code>."},
      {"label":"복사 독립","ask":"a=5,b=a,b=b+1 후 a는?","code":"let a = 5\nlet b = a\nb = b + 1\nprint(a === ____)","expect":"true","answer":"5","hint":"b만 바뀜","explain":"b만 +1, a는 복제본이라 5."}
    ],
  }
  H["ref"] = {
    pattern: "🔴 어려움 · 복사(원시)와 공유(객체)의 차이를 한 식에서 예측",
    problems: [
      {"label":"복사 vs 공유","ask":"b=a.v(복사), c=a(공유). c.v=9 후 b + c.v 는?","code":"let a = { v: 1 }\nlet b = a.v\nlet c = a\nc.v = 9\nprint((b + c.v) === ____)","expect":"true","answer":"10","hint":"b=1(복사) + c.v=9(공유)","explain":"b는 <code>a.v</code>를 <b>꺼내는 순간 값 1을 복사</b>해 독립 셀에 담는다. c는 <code>a</code> 자체라 <b>같은 객체를 공유</b>. 그래서 <code>c.v=9</code>는 b(1)엔 영향 없고 c.v만 9 → 1+9=10. <b>같은 =라도 원시는 복사, 객체는 공유</b>가 갈린다.","see":"ref2","wiki":{"label":"참조 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)"}},
      {"label":"복사는 그대로","ask":"a=1,b=a,b=9. a === 1 인가?","code":"let a = 1\nlet b = a\nb = 9\nprint((a === 1) === ____)","expect":"true","answer":"true","hint":"a는 복사라 1","explain":"a는 복사라 1 그대로 → <code>1===1</code>은 true."},
      {"label":"함수도 복사","ask":"함수를 두 번 불러도 원본 a는?","code":"function f(n) { n = 99 }\nlet a = 3\nf(a)\nf(a)\nprint(a === ____)","expect":"true","answer":"3","hint":"복사본만 바뀜","explain":"함수에 원시를 넘기면 복사 → 몇 번 불러도 a는 3."},
      {"label":"반환값 더하기","ask":"a=4. inc(a) + a 는? (a는 안 변함)","code":"function inc(n) { return n + 1 }\nlet a = 4\nprint((inc(a) + a) === ____)","expect":"true","answer":"9","hint":"5 + 4","explain":"a는 안 변해 4 → <code>inc(a)=5</code>, <code>5+4=9</code>."},
      {"label":"문자 복사","ask":"t만 \"bye\"로 바꿔도 s는?","code":"let s = \"hi\"\nlet t = s\nt = \"bye\"\nprint(s === \"____\")","expect":"true","answer":"hi","hint":"s는 그대로","explain":"t만 바꿔도 s는 <code>\"hi\"</code>."}
    ],
  }
  H["ref2"] = {
    pattern: "🔴 어려움 · 복사와 공유가 한 식에·재할당은 끊고·concat은 안 바꾼다",
    problems: [
      {"label":"복사+공유","ask":"snap은 복사(1), b는 공유. b.n=9 후 snap + b.n 은?","code":"let a = { n: 1 }\nlet b = a\nlet snap = a.n\nb.n = 9\nprint((snap + b.n) === ____)","expect":"true","answer":"10","hint":"1(복사) + 9(공유)","explain":"snap은 복사(1), b는 공유(9) → <code>1+9=10</code>."},
      {"label":"끊긴 뒤 변경","ask":"b를 새 객체로 바꾼 뒤 b.n=100. 원래 a.n은?","code":"let a = { n: 1 }\nlet b = a\nb = { n: 9 }\nb.n = 100\nprint(a.n === ____)","expect":"true","answer":"1","hint":"연결 끊긴 뒤라 a는 1","explain":"재할당으로 연결 끊긴 뒤라 이후 변경은 a와 무관 → 1."},
      {"label":"함수+별칭","ask":"f가 a.n을 0으로. b는 a의 별칭. b.n은?","code":"function f(o) { o.n = 0 }\nlet a = { n: 5 }\nlet b = a\nf(a)\nprint(b.n === ____)","expect":"true","answer":"0","hint":"함수가 공유 객체를 바꿈","explain":"함수가 공유 객체를 바꿔 b(별칭)도 0."},
      {"label":"concat은 새 배열","ask":"b = b.concat(4) 는 새 배열을 만든다. 원본 a 개수는?","code":"let a = [1, 2, 3]\nlet b = a\nb = b.concat(4)\nprint(a.length === ____)","expect":"true","answer":"3","hint":"concat은 원본 안 바꿈(push와 다름)","explain":"<code>concat</code>은 <b>새 배열</b>을 만들 뿐 원본 안 바꿈 → a는 3. (push와 다름)","see":"builtins"},
      {"label":"중첩 공유","ask":"p는 me.pet과 같은 객체. p.hp=0 후 me.pet.hp는?","code":"let me = { pet: { hp: 10 } }\nlet p = me.pet\np.hp = 0\nprint(me.pet.hp === ____)","expect":"true","answer":"0","hint":"p = me.pet(같은 객체)","explain":"p는 <code>me.pet</code>과 같은 객체 → 0."}
    ],
  }
  H["stack"] = {
    pattern: "🔴 어려움 · 함수 사슬·중첩 호출·지역 vs 전역·스코프 격리 예측",
    problems: [
      {"label":"2배 사슬","ask":"a는 b()의 2배, b()=5. a()는?","code":"function a() { return b() * 2 }\nfunction b() { return 5 }\nprint(a() === ____)","expect":"true","answer":"10","hint":"5 × 2","explain":"b가 5를 돌려주고 a가 2배 → 10. (프레임이 쌓였다 반환)"},
      {"label":"중첩 호출","ask":"f=+1. f(f(f(0)))은?","code":"function f(n) { return n + 1 }\nprint(f(f(f(0))) === ____)","expect":"true","answer":"3","hint":"0→1→2→3","explain":"f=+1을 세 번 → <code>0→1→2→3</code>."},
      {"label":"지역 vs 전역","ask":"함수 안 n=10, 밖 n=99. f() + 밖n 은?","code":"let n = 99\nfunction f() { let n = 10; return n }\nprint((f() + n) === ____)","expect":"true","answer":"109","hint":"10 + 99","explain":"함수 안 n=10과 밖 n=99는 <b>다른 칸</b> → <code>10+99=109</code>."},
      {"label":"조기 반환","ask":"f(-1)은? (양수면 \"양\", 아니면 \"음\")","code":"function f(n) { if (n > 0) return \"양\"; return \"음\" }\nprint(f(-1) === \"____\")","expect":"true","answer":"음","hint":"-1은 아래 return","explain":"-1은 아래 return → <code>\"음\"</code>."},
      {"label":"스코프 격리","ask":"함수 안 변수는 밖에서 안 보인다. 밖 n은?","code":"let n = 5\nfunction f() { let n = 100 }\nf()\nprint(n === ____)","expect":"true","answer":"5","hint":"안의 n=100은 밖과 무관","explain":"함수 안 지역 n=100은 <b>밖에서 안 보인다</b> → 밖 n은 5.","wiki":{"label":"변수의 유효 범위","url":"https://ko.wikipedia.org/wiki/변수의_유효_범위"}}
    ],
  }
  H["heap"] = {
    pattern: "🔴 어려움 · 힙 공유 vs 원시 복사·깊은 중첩·배열 별칭·삭제 예측",
    problems: [
      {"label":"공유 vs 복사","ask":"x=o.n(복사), a=o(공유). a.n=0 후 x + a.n 은?","code":"let o = { n: 5 }\nlet a = o\nlet x = o.n\na.n = 0\nprint((x + a.n) === ____)","expect":"true","answer":"5","hint":"x=5(복사) + a.n=0(공유)","explain":"x는 <code>o.n</code> 복사(5), a는 공유 → a.n=0이라도 <code>5+0=5</code>."},
      {"label":"깊은 중첩","ask":"d.a.b.c 는?","code":"let d = { a: { b: { c: 7 } } }\nprint(d.a.b.c === ____)","expect":"true","answer":"7","hint":"끝까지 따라감","explain":"점을 이어 <code>d.a.b.c</code> → 7."},
      {"label":"배열 별칭","ask":"b=a 배열 별칭. b.push(4) 후 a의 개수는?","code":"let a = [1, 2, 3]\nlet b = a\nb.push(4)\nprint(a.length === ____)","expect":"true","answer":"4","hint":"같은 배열 → a도 늘어남","explain":"<b>배열은 참조</b> → b에 push하면 a도 늘어 4."},
      {"label":"중첩 배열 객체","ask":"o.list[1].v 는? {list:[{v:1},{v:2}]}","code":"let o = { list: [{ v: 1 }, { v: 2 }] }\nprint(o.list[1].v === ____)","expect":"true","answer":"2","hint":"두 번째 객체","explain":"<code>o.list[1].v</code> → 2."},
      {"label":"삭제","ask":"delete o.a 후 o.a 는?","code":"let o = { a: 1 }\ndelete o.a\nprint(o.a === ____)","expect":"true","answer":"undefined","hint":"지워진 키 = undefined","explain":"<code>delete</code>로 지운 키는 <code>undefined</code>.","see":"builtins"}
    ],
  }
  H["passval"] = {
    pattern: "🔴 어려움 · 원시값은 반환+재대입해야 바뀐다(원본은 여전히 안전)",
    problems: [
      {"label":"반환+재대입","ask":"원시는 반환+재대입해야 바뀐다. a = dbl(a) 후 a는?","code":"function dbl(n) { return n * 2 }\nlet a = 5\na = dbl(a)\nprint(a === ____)","expect":"true","answer":"10","hint":"a에 반환값을 다시 담아야","explain":"원시값을 바꾸려면 <b>반환값을 다시 담아야</b> → <code>a=dbl(a)=10</code>."},
      {"label":"원본 확인","ask":"f가 0으로 해도 a === 7 인가?","code":"function f(n) { n = 0 }\nlet a = 7\nf(a)\nprint((a === 7) === ____)","expect":"true","answer":"true","hint":"원본 안전","explain":"함수가 바꿔도 원본 a는 7 → <code>a===7</code> true."},
      {"label":"두 번 전달","ask":"f를 두 번 불러도 a는?","code":"function f(n) { n = 99 }\nlet a = 3\nf(a)\nf(a)\nprint(a === ____)","expect":"true","answer":"3","hint":"복사본만 바뀜","explain":"복사본만 바뀌니 몇 번 불러도 a는 3."},
      {"label":"문자 안전","ask":"f가 \"!\"를 붙여도 t는?","code":"function f(s) { s = s + \"!\" }\nlet t = \"hi\"\nf(t)\nprint(t === \"____\")","expect":"true","answer":"hi","hint":"t는 그대로","explain":"t는 <code>\"hi\"</code> 그대로."},
      {"label":"반환값 더하기","ask":"a=4. inc(a) + a 는? (a는 안 변함)","code":"function inc(n) { return n + 1 }\nlet a = 4\nprint((inc(a) + a) === ____)","expect":"true","answer":"9","hint":"5 + 4","explain":"a는 안 변해 4 → <code>inc(a)=5</code>, <code>5+4=9</code>."}
    ],
  }
  H["passobj"] = {
    pattern: "🔴 어려움 · 속성값(원시)만 넘기면 안전·매개변수 재대입은 안 샌다 — 함정",
    problems: [
      {"label":"객체는 샌다","ask":"객체를 넘겨 속성을 바꾸면? z 후 d.c는?","code":"function z(o) { o.c = 0 }\nlet d = { c: 5 }\nz(d)\nprint(d.c === ____)","expect":"true","answer":"0","hint":"같은 객체 → 샌다","explain":"객체는 주소 공유 → 속성 변경이 원본에 샌다 → d.c는 0."},
      {"label":"속성값만 넘기면?","ask":"속성값(원시)만 넘기면 안전. f(d.n) 후 d.n은?","code":"function f(x) { x = 0 }\nlet d = { n: 5 }\nf(d.n)\nprint(d.n === ____)","expect":"true","answer":"5","hint":"d.n의 값(5)이 복사됨 → 안전","explain":"<b>속성값(원시)만</b> 넘기면 그 값이 복사됨 → d.n은 5 안전. (객체 전체와 다름)"},
      {"label":"재대입은 안 샌다","ask":"매개변수를 새 객체로 재대입하면? f가 o={n:99}. d.n은?","code":"function f(o) { o = { n: 99 } }\nlet d = { n: 5 }\nf(d)\nprint(d.n === ____)","expect":"true","answer":"5","hint":"o가 딴 객체를 가리킬 뿐 d와 무관","explain":"<b>매개변수 재대입</b>은 지역 이름만 바꿀 뿐 → d는 원래 객체 그대로 5."},
      {"label":"중첩 변경","ask":"f가 pet.name을 바꾸면 me.pet.name은?","code":"function f(o) { o.pet.name = \"루비\" }\nlet me = { pet: { name: \"콩이\" } }\nf(me)\nprint(me.pet.name === \"____\")","expect":"true","answer":"루비","hint":"중첩도 공유","explain":"중첩 객체도 공유 → me.pet.name은 <code>\"루비\"</code>."},
      {"label":"배열 속성","ask":"f가 arr[0]=9로 하면 arr[0]은?","code":"function f(a) { a[0] = 9 }\nlet arr = [1, 2]\nf(arr)\nprint(arr[0] === ____)","expect":"true","answer":"9","hint":"같은 배열","explain":"같은 배열 → arr[0]도 9."}
    ],
  }
  H["passarr"] = {
    pattern: "🔴 어려움 · 여러 push·map은 원본 불변·재대입은 안 샌다 — 함정",
    problems: [
      {"label":"두 번 호출","ask":"f는 push(1). 두 번 부른 뒤 arr의 개수는?","code":"function f(a) { a.push(1) }\nlet arr = [0]\nf(arr)\nf(arr)\nprint(arr.length === ____)","expect":"true","answer":"3","hint":"1 + 2번 push","explain":"같은 배열에 두 번 push → 3."},
      {"label":"map은 원본유지","ask":"f 안 map은 새 배열만 만든다. 원본 arr의 개수는?","code":"function f(a) { a.map(x => x * 2) }\nlet arr = [1, 2]\nf(arr)\nprint(arr.length === ____)","expect":"true","answer":"2","hint":"map은 원본 안 바꿈","explain":"<code>map</code>은 <b>새 배열만</b> 만들고 원본은 안 바꿈 → arr은 2."},
      {"label":"재대입은 안 샌다","ask":"매개변수를 새 배열로 재대입하면? f가 a=[]. arr의 개수는?","code":"function f(a) { a = [] }\nlet arr = [1, 2, 3]\nf(arr)\nprint(arr.length === ____)","expect":"true","answer":"3","hint":"a가 딴 배열을 가리킬 뿐","explain":"<b>매개변수 재대입</b>은 지역 이름만 → 원본 arr은 3 그대로."},
      {"label":"별칭 전달","ask":"ref는 arr의 별칭. f(ref) 후 arr의 개수는?","code":"function f(a) { a.push(5) }\nlet arr = [1]\nlet ref = arr\nf(ref)\nprint(arr.length === ____)","expect":"true","answer":"2","hint":"ref·arr 같은 배열","explain":"ref는 arr의 별칭(같은 배열) → push하면 arr도 2."},
      {"label":"요소 수정","ask":"f가 0번을 +1로 하면 arr[0]은?","code":"function f(a) { a[0] = a[0] + 1 }\nlet arr = [9]\nf(arr)\nprint(arr[0] === ____)","expect":"true","answer":"10","hint":"9 + 1","explain":"같은 배열의 0번 +1 → 10."}
    ],
  }
  H["graph"] = {
    pattern: "🔴 어려움 · 두 갈래가 한 노드 공유·깊은 경로·배열+객체 결과 예측",
    problems: [
      {"label":"두 갈래 한 노드","ask":"a.x와 b.y가 같은 n. a.x.v=9 후 b.y.v는?","code":"let n = { v: 1 }\nlet a = { x: n }\nlet b = { y: n }\na.x.v = 9\nprint(b.y.v === ____)","expect":"true","answer":"9","hint":"a.x·b.y 같은 노드","explain":"a.x와 b.y가 <b>같은 노드 n</b>을 가리켜 → 한쪽 변경이 다른 쪽에도 → 9.","see":"ref2","wiki":{"label":"객체 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)"}},
      {"label":"4단계 경로","ask":"r.c.c.c.v 는?","code":"let r = { c: { c: { c: { v: 7 } } } }\nprint(r.c.c.c.v === ____)","expect":"true","answer":"7","hint":"r.c.c.c.v","explain":"4단계 경로 <code>r.c.c.c.v</code> → 7."},
      {"label":"공유 노드","ask":"me.f=h(공유). me.f.hair 바꾸면 h.hair는?","code":"let h = { hair: \"긴\" }\nlet me = { f: h }\nme.f.hair = \"숏\"\nprint(h.hair === \"____\")","expect":"true","answer":"숏","hint":"me.f = h(같은 노드)","explain":"<code>me.f</code>는 h와 같은 노드 → 고치면 h도 <code>\"숏\"</code>."},
      {"label":"배열+객체 경로","ask":"g.list[1].v 는?","code":"let g = { list: [{ v: 1 }, { v: 2 }] }\nprint(g.list[1].v === ____)","expect":"true","answer":"2","hint":"g.list[1].v","explain":"<code>g.list[1].v</code> → 2."},
      {"label":"배열 안 이름","ask":"d.items[0].name 은?","code":"let d = { items: [{ name: \"가\" }] }\nprint(d.items[0].name === \"____\")","expect":"true","answer":"가","hint":"d.items[0].name","explain":"<code>d.items[0].name</code> → <code>\"가\"</code>."}
    ],
  }
  H["friends"] = {
    pattern: "🔴 어려움 · 배열 속 객체 공유 변경·map·filter·reduce 집계 예측",
    problems: [
      {"label":"공유 변경","ask":"arr[0]=a(공유). arr[0].hp=50 후 a.hp는?","code":"let a = { hp: 100 }\nlet arr = [a]\narr[0].hp = 50\nprint(a.hp === ____)","expect":"true","answer":"50","hint":"arr[0] = a(같은 객체)","explain":"<code>arr[0]</code>은 a와 같은 객체 → a.hp도 50."},
      {"label":"map으로 나이","ask":"나이만 뽑은 배열의 개수는?","code":"let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.map(p => p.age).length === ____)","expect":"true","answer":"2","hint":"map 결과의 .length","explain":"<code>map</code>으로 나이만 뽑은 배열의 개수 2."},
      {"label":"filter로 세기","ask":"25살 초과는 몇 명?","code":"let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.filter(p => p.age > 25).length === ____)","expect":"true","answer":"1","hint":"30살 한 명","explain":"<code>filter</code>로 25 초과 → 1명."},
      {"label":"reduce 합","ask":"나이를 다 더하면?","code":"let ppl = [{ age: 20 }, { age: 30 }]\nprint(ppl.reduce((s, p) => s + p.age, 0) === ____)","expect":"true","answer":"50","hint":"20 + 30","explain":"<code>reduce</code>로 나이 합 → <code>20+30=50</code>."},
      {"label":"중첩 배열","ask":"g.members[0].n 은?","code":"let g = { members: [{ n: \"가\" }] }\nprint(g.members[0].n === \"____\")","expect":"true","answer":"가","hint":"g.members[0].n","explain":"<code>g.members[0].n</code> → <code>\"가\"</code>."}
    ],
  }
  H["family"] = {
    pattern: "🔴 어려움 · 3대 경로·좌우 자식·부모 노드 공유 결과 예측",
    problems: [
      {"label":"3대","ask":"me.parent.parent.name 은?","code":"let g = { name: \"할\" }\nlet m = { parent: g }\nlet me = { parent: m }\nprint(me.parent.parent.name === \"____\")","expect":"true","answer":"할","hint":"me.parent.parent.name","explain":"3대 경로 <code>me.parent.parent.name</code> → <code>\"할\"</code>."},
      {"label":"경로 수렴(별칭)","ask":"삼촌의 형은 아빠, 아빠의 wife는 엄마. uncle.brother.wife 와 me.mother는 같은 사람일까? (=== 결과를 예측)","code":"let dad = { name: \"아빠\" }\nlet mom = { name: \"엄마\" }\nlet uncle = { brother: dad }\nlet me = { mother: mom }\ndad.wife = mom\nprint((uncle.brother.wife === me.mother) === ____)","expect":"true","answer":"true","hint":"두 경로가 같은 mom 상자에 도착하나?","explain":"<code>uncle.brother.wife</code> = 삼촌→형(아빠)→와이프(엄마), <code>me.mother</code> = 엄마 → <b>하나의 엄마 객체</b>라 <code>===</code> <b>true</b>. 다른 경로가 같은 노드 = <b>별칭</b>."},
      {"label":"오른쪽 값","ask":"r.right.v 는?","code":"let r = { left: { v: 1 }, right: { v: 2 } }\nprint(r.right.v === ____)","expect":"true","answer":"2","hint":"r.right.v","explain":"<code>r.right.v</code> → 2."},
      {"label":"부모 공유","ask":"a.parent·b.parent가 같은 dad. a.parent.name 바꾸면 b.parent.name은?","code":"let dad = { name: \"아빠\" }\nlet a = { parent: dad }\nlet b = { parent: dad }\na.parent.name = \"X\"\nprint(b.parent.name === \"____\")","expect":"true","answer":"X","hint":"같은 부모 노드","explain":"a.parent·b.parent가 <b>같은 dad</b> → 한쪽 변경이 둘 다 → <code>\"X\"</code>."},
      {"label":"자식 배열","ask":"p.kids[1].name 은?","code":"let p = { kids: [{ name: \"첫\" }, { name: \"둘\" }] }\nprint(p.kids[1].name === \"____\")","expect":"true","answer":"둘","hint":"p.kids[1].name","explain":"<code>p.kids[1].name</code> → <code>\"둘\"</code>."}
    ],
  }
  H["cycle"] = {
    pattern: "🔴 어려움 · 순환을 두 단계 따라가기·순환 경로로 변경 결과 예측",
    problems: [
      {"label":"왕복 두 단계","ask":"a.to=b, b.to=a, a.v=1. b.to.v 는?","code":"let a = {}\nlet b = {}\na.to = b\nb.to = a\na.v = 1\nprint(b.to.v === ____)","expect":"true","answer":"1","hint":"b.to = a","explain":"<code>a.to=b</code>, <code>b.to=a</code> → <code>b.to</code>는 a → a.v 1."},
      {"label":"순환 변경","ask":"x.ref=y, y.ref=x. y.ref.n=9 후 x.n은?","code":"let x = { n: 1 }\nlet y = { ref: x }\nx.ref = y\ny.ref.n = 9\nprint(x.n === ____)","expect":"true","answer":"9","hint":"y.ref = x","explain":"<code>y.ref</code>는 x(순환) → x.n도 9."},
      {"label":"자기순환 두 번","ask":"n.self=n, n.v=5. n.self.self.v 는?","code":"let n = { v: 5 }\nn.self = n\nprint(n.self.self.v === ____)","expect":"true","answer":"5","hint":"self.self도 n","explain":"<code>n.self.self</code>도 결국 n → v 5."},
      {"label":"3자 순환","ask":"a.next=b, b.next=a, a.id=1. a.next.next.id 는?","code":"let a = { id: 1 }\nlet b = { id: 2 }\na.next = b\nb.next = a\nprint(a.next.next.id === ____)","expect":"true","answer":"1","hint":"a.next.next = a","explain":"<code>a.next.next</code>는 a로 돌아옴 → id 1."},
      {"label":"서로 이름","ask":"p.peer=q, q.peer=p, p.name=\"P\". p.peer.peer.name 은?","code":"let p = { name: \"P\" }\nlet q = { name: \"Q\" }\np.peer = q\nq.peer = p\nprint(p.peer.peer.name === \"____\")","expect":"true","answer":"P","hint":"p.peer.peer = p","explain":"<code>p.peer.peer</code>는 p로 돌아옴 → name <code>\"P\"</code>."}
    ],
  }
  H["callstack"] = {
    pattern: "🔴 어려움 · 깊은 호출 사슬·사슬 속 지역변수·조기 반환 결과 예측",
    problems: [
      {"label":"사슬 + 지역","ask":"a는 지역 x=2와 b() 곱, b()=5. a()는?","code":"function a() { let x = 2; return b() * x }\nfunction b() { return 5 }\nprint(a() === ____)","expect":"true","answer":"10","hint":"5 × 2","explain":"지역 x=2와 b()=5를 곱 → 10."},
      {"label":"조건 후 호출","ask":"chk(1)이 b() 부름, b()=5. chk(1)은?","code":"function chk(n) { if (n > 0) return b(); return -1 }\nfunction b() { return 5 }\nprint(chk(1) === ____)","expect":"true","answer":"5","hint":"1>0 → b()","explain":"1&gt;0이라 b()를 부름 → 5."},
      {"label":"깊이 4","ask":"a→b→c→d, d()=8. a()는?","code":"function a() { return b() }\nfunction b() { return c() }\nfunction c() { return d() }\nfunction d() { return 8 }\nprint(a() === ____)","expect":"true","answer":"8","hint":"d가 8","explain":"4단계 사슬 a→b→c→d, d가 8 → 8."},
      {"label":"중첩 2배","ask":"d=2배. d(d(3))은?","code":"function d(n) { return n * 2 }\nprint(d(d(3)) === ____)","expect":"true","answer":"12","hint":"3→6→12","explain":"d=2배를 두 번 → <code>3→6→12</code>."},
      {"label":"두 함수 합","ask":"a()=3, b()=4. a() + b() 은?","code":"function a() { return 3 }\nfunction b() { return 4 }\nprint((a() + b()) === ____)","expect":"true","answer":"7","hint":"3 + 4","explain":"a=3, b=4 → <code>3+4=7</code>."}
    ],
  }
  H["closure"] = {
    pattern: "🔴 어려움 · 안쪽 인수+붙잡은 값·누적·인스턴스는 독립 — 결과 예측",
    problems: [
      {"label":"인수+붙잡기","ask":"adder(5)는 5를 붙잡고 y도 받는다. add5(3)은?","code":"function adder(x) { return function (y) { return x + y } }\nlet add5 = adder(5)\nprint(add5(3) === ____)","expect":"true","answer":"8","hint":"5 + 3","explain":"adder(5)의 5를 붙잡고 y(3)도 받아 <code>5+3=8</code>."},
      {"label":"3회 누적","ask":"next를 세 번 부르면(매번 +1)?","code":"function c() { let n = 0; return function () { return n = n + 1 } }\nlet next = c()\nnext()\nnext()\nprint(next() === ____)","expect":"true","answer":"3","hint":"1,2,3","explain":"n이 누적 기억 → 세 번 불러 3."},
      {"label":"독립 인스턴스","ask":"a·b는 별개 카운터. a를 두 번 불러도 b()는?","code":"function c() { let n = 0; return function () { n++; return n } }\nlet a = c()\nlet b = c()\na()\na()\nprint(b() === ____)","expect":"true","answer":"1","hint":"b는 a와 독립 → 처음이라 1","explain":"<b>클로저마다 자기 스코프</b> → a와 별개인 b는 처음이라 1.","see":"stack","wiki":{"label":"클로저","url":"https://ko.wikipedia.org/wiki/클로저_(컴퓨터_프로그래밍)"}},
      {"label":"곱셈 팩토리","ask":"mult(3)은 3을 붙잡는다. triple(4)는?","code":"function mult(n) { return function (x) { return x * n } }\nlet triple = mult(3)\nprint(triple(4) === ____)","expect":"true","answer":"12","hint":"4 × 3","explain":"mult(3)의 3을 붙잡아 <code>4×3=12</code>."},
      {"label":"누적 합","ask":"add(10) 뒤 add(20)은? (sum이 쌓인다)","code":"function acc() { let sum = 0; return function (x) { sum = sum + x; return sum } }\nlet add = acc()\nadd(10)\nprint(add(20) === ____)","expect":"true","answer":"30","hint":"10 + 20","explain":"sum이 누적 → <code>10 다음 +20=30</code>."}
    ],
  }
  H["gc"] = {
    pattern: "🔴 어려움 · 참조가 남으면 산다·중첩 참조 유지·재대입 고아 결과 예측",
    problems: [
      {"label":"한 참조 남으면","ask":"a를 비워도 b가 가리킨다. b.v 는?","code":"let a = { v: 1 }\nlet b = a\na = null\nprint(b.v === ____)","expect":"true","answer":"1","hint":"b가 살림 → GC 안 함","explain":"GC(가비지 컬렉션)는 <b>아무도 안 가리키는 힙 객체만</b> 치운다. <code>a=null</code>로 a의 화살표를 끊어도 <b>b가 아직 그 객체를 가리키므로</b> 살아남는다. 마지막 참조까지 끊겨야 치워진다.","see":"ref2","wiki":{"label":"쓰레기 수집 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/쓰레기_수집_(컴퓨터_과학)"},"mem":{"title":"a를 끊어도 b가 가리켜 객체는 산다","stackLabel":"📇 이름표 장부","code":["let a = { v: 1 }","let b = a","a = null"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"1"}]}},"note":"a·b 둘 다 h1을 가리킨다(참조 2개)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","value":"null","bad":true},{"name":"b","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"v","value":"1"}]}},"note":"<code>a=null</code> → a의 화살표는 끊김. 하지만 <b>b가 아직 h1을 가리켜 살아남는다</b>(GC 대상 아님)."}]}},
      {"label":"둘 중 하나만","ask":"x·y가 같은 객체. x를 비워도 y.n 은?","code":"let o = { n: 9 }\nlet x = o\nlet y = o\nx = null\nprint(y.n === ____)","expect":"true","answer":"9","hint":"y가 아직 가리킴","explain":"x를 끊어도 y가 가리켜 n=9."},
      {"label":"배열 요소 참조","ask":"r이 arr[0]을 붙잡았다. arr을 비워도 r.v 는?","code":"let arr = [{ v: 5 }]\nlet r = arr[0]\narr = null\nprint(r.v === ____)","expect":"true","answer":"5","hint":"r이 그 객체를 가리킴","explain":"r이 배열 요소 객체를 붙잡아 → arr을 끊어도 v=5."},
      {"label":"중첩 유지","ask":"c가 root.child를 붙잡았다. root을 비워도 c.v 는?","code":"let root = { child: { v: 3 } }\nlet c = root.child\nroot = null\nprint(c.v === ____)","expect":"true","answer":"3","hint":"c가 자식을 가리킴","explain":"c가 자식을 붙잡아 → root를 끊어도 v=3."},
      {"label":"재대입 고아","ask":"x를 새 객체로 바꾸면 지금 x.n 은?","code":"let x = { n: 1 }\nx = { n: 2 }\nprint(x.n === ____)","expect":"true","answer":"2","hint":"x는 이제 {n:2}","explain":"x를 새 객체로 바꾸면 옛 것은 고아, 지금 x.n은 2."}
    ],
  }
  H["class"] = {
    pattern: "🔴 어려움 · 인스턴스는 각자 힙 객체(독립)·상속·instanceof·typeof",
    problems: [
      {"label":"인스턴스 독립","ask":"a·b는 각자 다른 객체. a.n=9로 바꿔도 b.n은?","code":"class C { constructor() { this.n = 0 } }\nlet a = new C()\nlet b = new C()\na.n = 9\nprint(b.n === ____)","expect":"true","answer":"0","hint":"각자 힙 객체 → b는 0","explain":"<code>new</code>마다 <b>힙에 다른 객체</b> → a·b는 별개, b.n은 0.","mem":{"title":"new 마다 힙에 새 객체 — a와 b는 다른 객체","stackLabel":"📇 이름표 장부","code":["let a = new C()","let b = new C()","a.n = 9"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h2"}]}],"heap":{"h1":{"label":"C","fields":[{"key":"n","value":"0"}]},"h2":{"label":"C","fields":[{"key":"n","value":"0"}]}},"note":"new 두 번 → <b>힙에 서로 다른 객체</b> h1, h2. a·b는 별칭이 아니다."},{"line":2,"stack":[{"name":"main","slots":[{"name":"a","ref":"h1"},{"name":"b","ref":"h2"}]}],"heap":{"h1":{"label":"C","fields":[{"key":"n","value":"9","bad":true}]},"h2":{"label":"C","fields":[{"key":"n","value":"0"}]}},"note":"<code>a.n = 9</code>는 h1만 고침. <b>b(h2).n은 0 그대로</b>."}]}},
      {"label":"상속(extends)","ask":"B는 A를 물려받는다. new B().hi() 는?","code":"class A { hi() { return \"A\" } }\nclass B extends A {}\nprint(new B().hi() === \"____\")","expect":"true","answer":"A","hint":"물려받은 hi()","explain":"B가 A를 물려받아(extends) A의 hi()를 그대로 → <code>\"A\"</code>."},
      {"label":"인스턴스 배열","ask":"ds[1].name 은?","code":"class D { constructor(n) { this.name = n } }\nlet ds = [new D(\"가\"), new D(\"나\")]\nprint(ds[1].name === \"____\")","expect":"true","answer":"나","hint":"두 번째 인스턴스","explain":"<code>ds[1]</code>은 두 번째 인스턴스 → <code>\"나\"</code>."},
      {"label":"instanceof","ask":"c instanceof C 는?","code":"class C {}\nlet c = new C()\nprint((c instanceof C) === ____)","expect":"true","answer":"true","hint":"C로 만든 c","explain":"c는 C로 만들어졌다 → <code>instanceof</code> true.","see":"builtins"},
      {"label":"그냥 객체","ask":"typeof (new C()) 는? (인스턴스도 특별하지 않다)","code":"class C {}\nprint((typeof (new C())) === \"____\")","expect":"true","answer":"object","hint":"인스턴스 = 그냥 객체","explain":"<b>인스턴스도 그냥 객체</b> → <code>typeof=\"object\"</code>. (class는 프로토타입 문법설탕)","see":"builtins","wiki":{"label":"객체 (컴퓨터 과학)","url":"https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)"}}
    ],
  }
  H["objprim"] = {
    pattern: "🔴 어려움 · 함수에 전달 — 매개변수 = 대입. 규칙 하나가 함수 호출까지 (return·undefined 포함)",
    problems: [
      {"label":"원시 전달·숫자","ask":"숫자를 함수에 넘겨 함수 안에서 0으로 바꾸면 — 원본 money는?","code":"let money = 100\nfunction f(n) { n = 0 }\nf(money)\nprint(money === ____)","expect":"true","answer":"100","hint":"원시=값복사 — 매개변수는 사본","explain":"원시값은 넘길 때 <b>값이 복사</b>돼 매개변수 n은 <b>독립 사본</b>. <code>n=0</code>은 사본만 바꿔 <b>money는 100</b>. (함수 전달도 '매개변수 = 인자' 대입 — 규칙 그대로)","see":"objprim","mem":{"title":"money 안전 — 원시는 값복사(사본), 함수 끝엔 undefined 반환","stackLabel":"📇 이름표 장부","code":["let money = 100","f(money)   // n = 복사 100","n = 0"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]},{"name":"f","slots":[{"name":"n","value":"100"}]}],"heap":{},"note":"②push+③바인딩 — 원시 넘기면 <b>값 복사</b> → n은 별개 셀(100)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]},{"name":"f","slots":[{"name":"n","value":"0","bad":true}]}],"heap":{},"note":"④본문 <code>n = 0</code>은 사본만 바꾼다. <b>money는 100</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"money","value":"100"}]}],"heap":{},"returning":{"value":"undefined","discarded":true},"note":"⑤ f는 return 없어 <b>undefined를 통로로</b>(💨 버려짐)·pop. money는 100 그대로."}]}},
      {"label":"원시 전달·문자열","ask":"문자열을 넘겨 함수 안에서 바꾸면 — 원본 name은?","code":"let name = \"민지\"\nfunction f(s) { s = \"바보\" }\nf(name)\nprint(name === \"____\")","expect":"true","answer":"민지","hint":"문자열도 원시 — 값복사(독립)","explain":"문자열도 <b>원시</b>라 넘길 때 값 복사 → s는 사본. <code>s=\"바보\"</code>는 사본만 바꿔 <b>name은 \"민지\"</b>. (문자열은 길어도 원시!)"},
      {"label":"원시 전달·계산 후","ask":"함수가 x를 +1 해도 원본 a는?","code":"let a = 5\nfunction f(x) { x = x + 1 }\nf(a)\nprint(a === ____)","expect":"true","answer":"5","hint":"사본에만 +1","explain":"a의 값 5가 <b>복사</b>돼 x로. <code>x=x+1</code>은 사본을 6으로 — 원본 <b>a는 5</b> 그대로."},
      {"label":"객체 전달·변경","ask":"객체를 넘겨 함수 안에서 hp를 0으로 — 원본 u.hp는?","code":"let u = { hp: 100 }\nfunction hurt(p) { p.hp = 0 }\nhurt(u)\nprint((u.hp) === ____)","expect":"true","answer":"0","hint":"객체=주소복사(공유) — p와 u는 같은 봉투","explain":"객체는 넘길 때 <b>주소가 복사=공유</b> → p와 u는 <b>같은 봉투</b>. <code>p.hp=0</code>이 그걸 고쳐 <b>u.hp도 0</b>. (원시였다면 안전 — 정반대)","see":"objprim","mem":{"title":"u.hp도 0 — 객체는 주소복사(공유), 함수 끝엔 undefined","stackLabel":"📇 이름표 장부","code":["let u = { hp: 100 }","hurt(u)   // p = u (공유)","p.hp = 0"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]},{"name":"hurt","slots":[{"name":"p","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]}},"note":"②push+③바인딩 — <b>주소 복사</b> → p와 u는 <b>같은 h1</b>(공유)."},{"line":2,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]},{"name":"hurt","slots":[{"name":"p","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"0","bad":true}]}},"note":"④ <code>p.hp=0</code>이 h1을 고침 → <b>u.hp도 0</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"0","bad":true}]}},"returning":{"value":"undefined","discarded":true},"note":"⑤ hurt는 undefined 반환(💨 버려짐)·pop. u.hp는 0(변경이 남음)."}]}},
      {"label":"객체 전달·배열 push","ask":"배열을 넘겨 함수 안에서 push하면 — 원본 cart 개수는?","code":"let cart = [\"우유\"]\nfunction add(list) { list.push(\"빵\") }\nadd(cart)\nprint((cart.length) === ____)","expect":"true","answer":"2","hint":"배열도 객체 — 주소공유","explain":"배열도 객체라 <b>주소 복사=공유</b> → list와 cart는 <b>같은 배열</b>. <code>list.push</code>가 cart에도 보여 length 2."},
      {"label":"객체 전달·중첩","ask":"중첩 객체를 넘겨 안쪽을 바꾸면 — 원본 u.best.n은?","code":"let u = { best: { n: \"효니\" } }\nfunction ren(p) { p.best.n = \"보리\" }\nren(u)\nprint((u.best.n) === \"____\")","expect":"true","answer":"보리","hint":"p=u 공유, best도 같은 안쪽 봉투","explain":"p와 u는 같은 봉투 → p.best와 u.best도 <b>같은 안쪽 봉투</b>. <code>p.best.n=\"보리\"</code>가 u.best.n에도 → \"보리\"."},
      {"label":"변경 vs 재할당·변경","ask":"함수 안에서 p.hp = 0 (변경) — 원본 u.hp는?","code":"let u = { hp: 100 }\nfunction set(p) { p.hp = 0 }\nset(u)\nprint((u.hp) === ____)","expect":"true","answer":"0","hint":"변경은 같은 봉투를 고침 → 원본도","explain":"<code>p.hp=0</code>은 넘겨받은 <b>같은 봉투</b>를 고친다 → <b>u.hp도 0</b>. (다음 문제 '재할당'과 정반대)"},
      {"label":"변경 vs 재할당·재할당","ask":"함수 안에서 p = { hp: 0 } (재할당) — 원본 u.hp는?","code":"let u = { hp: 100 }\nfunction reset(p) { p = { hp: 0 } }\nreset(u)\nprint((u.hp) === ____)","expect":"true","answer":"100","hint":"재할당은 p 화살표만 새 봉투로 — 원본 그대로","explain":"<code>p = { hp: 0 }</code>은 매개변수 <b>p의 화살표만 새 봉투</b>로 옮긴다 — u의 화살표는 <b>옛 봉투 그대로</b> → <b>u.hp는 100</b>. (변경 p.hp=0과 정반대 — 최대 함정)","see":"objprim","mem":{"title":"u.hp는 100 — 재할당은 매개변수 화살표만 옮긴다","stackLabel":"📇 이름표 장부","code":["let u = { hp: 100 }","reset(u)   // p = u (공유)","p = { hp: 0 }"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]},{"name":"reset","slots":[{"name":"p","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]}},"note":"②push+③바인딩 — p = u 주소복사, 같은 봉투 h1."},{"line":2,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]},{"name":"reset","slots":[{"name":"p","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]},"h2":{"fields":[{"key":"hp","value":"0"}]}},"note":"④ <code>p = { hp: 0 }</code>은 <b>새 봉투 h2</b>를 만들고 <b>p 화살표만</b> h2로. u는 <b>여전히 h1(100)</b>."},{"line":1,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]}},"returning":{"value":"undefined","discarded":true},"note":"⑤ reset은 undefined 반환(💨)·pop, h2는 GC 대상. u.hp는 100 — 재할당은 원본을 못 건드린다."}]}},
      {"label":"반환 객체 생존","ask":"함수가 만든 객체를 돌려받으면 — c.hp는?","code":"function make() { return { hp: 7 } }\nlet c = make()\nprint((c.hp) === ____)","expect":"true","answer":"7","hint":"객체는 힙에 살아 반환 — 프레임 pop과 무관","explain":"return이 <b>봉투의 주소를 통로로</b> 내보내 c가 받는다. make 프레임은 pop돼도 <b>봉투는 힙에 살아남아</b> c.hp는 7.","see":"heap","mem":{"title":"c.hp는 7 — 반환된 봉투는 프레임 pop 후에도 힙에 산다","stackLabel":"📇 이름표 장부","code":["function make() { return { hp: 7 } }","let c = make()"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"c","value":"(대기)","bad":true}]}],"heap":{},"note":"①호출 — make() 호출 직전, c 대기, 프레임 없음."},{"line":0,"stack":[{"name":"main","slots":[{"name":"c","value":"(대기)","bad":true}]},{"name":"make","slots":[]}],"heap":{"h1":{"fields":[{"key":"hp","value":"7"}]}},"note":"②push+④본문 — make 프레임 + <code>return { hp: 7 }</code>이 힙에 봉투 h1 생성."},{"line":0,"stack":[{"name":"main","slots":[{"name":"c","value":"(대기)","bad":true}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"7"}]}},"returning":{"ref":"h1","label":"객체"},"note":"⑤ return이 h1 주소를 통로로 내보내고 make pop. <b>봉투 h1은 힙에 삶</b>(프레임 무관)."},{"line":1,"stack":[{"name":"main","slots":[{"name":"c","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"7"}]}},"note":"⑥ c가 h1 주소를 받음 → c.hp는 7. 프레임 죽어도 객체는 산다."}]}},
      {"label":"void → undefined","ask":"return 없는 함수의 결과를 담으면 — r은?","code":"function f(x) { let y = x * 2 }\nlet r = f(5)\nprint((r === undefined) === ____)","expect":"true","answer":"true","hint":"계산만 하고 안 돌려줌 → undefined","explain":"함수 안에서 계산은 했지만 <b>return이 없다</b> → 함수는 <b>undefined</b>를 돌려준다. r엔 undefined. ('계산했으니 10' 최대 착각)"},
      {"label":"함수 안 안전 복사","ask":"함수 안에서 {...p} 사본을 바꾸면 — 원본 u.hp는?","code":"let u = { hp: 100 }\nfunction safe(p) { let c = { ...p }; c.hp = 0 }\nsafe(u)\nprint((u.hp) === ____)","expect":"true","answer":"100","hint":"함수 안에서 사본을 떠서 바꾸면 원본 안전","explain":"p는 u와 공유지만 <code>{ ...p }</code>로 <b>새 봉투 c</b>를 떴다 → <code>c.hp=0</code>은 c만 고쳐 <b>u.hp는 100</b>. (공유를 스프레드로 끊는 실전 패턴)","see":"spread","mem":{"title":"u 안전 — 함수 안에서 {...p}로 새 봉투를 떴다","stackLabel":"📇 이름표 장부","code":["let u = { hp: 100 }","safe(u)   // p = u (공유)","let c = { ...p }","c.hp = 0"],"steps":[{"line":1,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]},{"name":"safe","slots":[{"name":"p","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]}},"note":"②③ p = u 주소공유 — 같은 봉투 h1."},{"line":2,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]},{"name":"safe","slots":[{"name":"p","ref":"h1"},{"name":"c","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]},"h2":{"fields":[{"key":"hp","value":"100"}]}},"note":"④ <code>{ ...p }</code> → <b>새 봉투 h2</b>. 이제 c는 u와 별개."},{"line":3,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]},{"name":"safe","slots":[{"name":"p","ref":"h1"},{"name":"c","ref":"h2"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]},"h2":{"fields":[{"key":"hp","value":"0","bad":true}]}},"note":"<code>c.hp=0</code>은 <b>h2만</b>. u는 h1(100) 그대로."},{"line":1,"stack":[{"name":"main","slots":[{"name":"u","ref":"h1"}]}],"heap":{"h1":{"fields":[{"key":"hp","value":"100"}]}},"returning":{"value":"undefined","discarded":true},"note":"⑤ safe는 undefined 반환(💨)·pop. u.hp는 100 — 사본을 떠서 원본 보호."}]}},
      {"label":"같은 객체 두 매개변수","ask":"같은 객체를 두 매개변수로 넘겨 하나를 바꾸면 — u.hp는?","code":"let u = { hp: 100 }\nfunction two(a, b) { a.hp = 0 }\ntwo(u, u)\nprint((u.hp) === ____)","expect":"true","answer":"0","hint":"a·b·u 셋 다 같은 봉투","explain":"<code>two(u, u)</code>는 a와 b <b>둘 다 u의 주소</b>를 받는다 → a·b·u가 <b>같은 봉투</b>. <code>a.hp=0</code>이 u.hp에도 → 0. (b로 봐도 0)"}
    ],
  }
})()
