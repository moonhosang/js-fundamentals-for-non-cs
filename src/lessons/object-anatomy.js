// 🧠 객체 해부 — "원시는 스택이라며? 왜 age가 객체 안에 있지?" 정면돌파
// 오해: 원시타입 변수=스택 이라 배웠는데, p = { age: 30 }의 age(원시)는 힙 객체 안 → 모순감.
// 해소: 타입이 위치를 정하는 게 아니라 '누가 들고 있느냐(소속)'가 정한다 — 값은 담긴 그릇을 따라간다.
// 대비: 독립 변수(스택 슬롯) vs 속성(힙 봉투 안) · 원시 필드(값 그대로) vs 참조 필드(주소표) · 꺼내기: 복사 vs 주소.

;(function () {
  window.Lessons = window.Lessons || {}

  window.Lessons['objanat'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M3-1</span>
        <h2>객체 해부 — 왜 원시값 age가 객체 안에 있지?</h2>
        <p>"원시타입은 <b>스택</b>에 산다"고 배웠다. 그런데 <code>p = { age: 30 }</code>의 <b>age도 분명 number(원시)</b>인데 <b>힙 객체 안</b>에 들어가 있다. 스택이야 힙이야? — 이 모순을 정면으로 부순다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><b>타입이 위치를 정하는 게 아니다 — "누가 들고 있느냐(소속)"가 정한다. 값은 담긴 그릇을 따라간다.</b>
        <code>let age = 30</code>의 age는 <b>독립 변수</b> → 스택 슬롯 안. <code>p = { age: 30 }</code>의 age는 <b>p의 속성(부품)</b> → p가 사는 <b>힙 봉투 안</b>.
        봉투 속: <b>원시 필드 = 값 그대로</b> · <b>참조 필드(다른 객체) = 주소표(화살표)</b>.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/레코드_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">레코드(필드 묶음) ↗</a> · <a href="https://ko.wikipedia.org/wiki/합성_자료형" target="_blank" rel="noopener noreferrer">합성 자료형 ↗</a></p>
      </div>

      <h3 class="section-title">① 🧠 오해 정면돌파 — "원시는 스택이라며?"</h3>
      <div class="card warn-box">
        <p class="section-desc" style="margin:0">😵 <b>모순감:</b> "M2·M3에서 <b>원시값 → 스택, 객체 → 힙</b>이라 했잖아. 그런데 <code>p = { age: 30 }</code>을 그리면 <b>30이 힙 박스 안</b>에 있네? age는 number(원시)인데?? <b>규칙이 깨진 건가, 내가 잘못 배운 건가?</b>"</p>
      </div>
      <p class="section-desc">둘 다 아니다. <b>"원시 = 스택"은 절반만 맞는 문장</b>이었다. 정확한 규칙은 — 타입은 위치를 정하지 않는다.
      위치를 정하는 건 <b>소속</b>: 그 값이 <b>독립 변수</b>냐, 아니면 <b>객체의 속성(부품)</b>이냐. <b>값은 자기가 담긴 그릇을 따라간다.</b></p>

      <h3 class="section-title">② 해소 — 값은 담긴 그릇을 따라간다 (같은 30, 다른 집)</h3>
      <span class="learn-tag">📎 let age = 30 → 독립 변수 = 스택 슬롯 · p = { age: 30 } → p의 속성 = 힙 봉투 안</span>
      <div class="card">
        <div class="file-label">🎬 같은 30인데 집이 다르다 — 변수 age vs 속성 p.age (▶ 한 단계씩)</div>
        <div data-m="sim-home"></div>
      </div>
      <p class="section-desc">왼쪽 age의 30은 <b>자기 이름표(슬롯)가 그릇</b>이라 스택에. p 안의 30은 <b>객체가 그릇</b>이라 객체를 따라 힙에.
      속성 age는 <b>독립 변수가 아니다</b> — 장부에 "age"라는 이름표가 <b>따로 없다</b>. p라는 봉투의 <b>부품(종속)</b>이라, 봉투가 가는 곳(힙)에 같이 간다.</p>
      <div data-m="qz-home"></div>

      <h3 class="section-title">③ 객체 해부 — 봉투 속엔 뭐가 들었나</h3>
      <span class="learn-tag">📎 객체 = 데이터를 통째로 담은 봉투 · 원시 필드 = 값 그대로 · 객체 필드 = 주소표(화살표)</span>
      <p class="section-desc">객체를 갈라 보자. 봉투 안에 들어가는 건 <b>딱 두 종류</b>다:</p>
      <ul class="section-list">
        <li><b>원시 필드</b>(숫자·문자열·참거짓) — 봉투 안에 <b>값이 그대로</b> 들어 있다. (age: 30, name: "민지")</li>
        <li><b>참조 필드</b>(다른 객체·배열) — 봉투 안에 값 대신 <b>주소표</b>가 들어 있다. 그 객체는 <b>자기 봉투가 따로</b> 있다. (best: → 효니)</li>
      </ul>
      <div class="card">
        <div class="file-label">🔬 봉투 해부 — 원시는 안에, 객체는 화살표로 (▶ 한 필드씩)</div>
        <div data-m="sim-dissect"></div>
      </div>
      <p class="section-desc">🔑 그래서 "객체 안에 객체가 들어 있다"는 그림도 사실은 <b>틀렸다</b> — 봉투 안엔 <b>주소표만</b> 있고, 효니 봉투는 힙의 <b>딴 자리</b>에 산다. 봉투 속 원시값(30, "민지")만이 <b>진짜로 안에</b> 있다.</p>

      <h3 class="section-title">④ ❓ 왜 이렇게 — 세 가지 각도</h3>
      <ul class="section-list">
        <li><b>① 소속</b> — 속성은 <b>객체의 부품</b>이지 독립 변수가 아니다. 스택 장부엔 <code>p</code>만 있지 <code>p.age</code>라는 이름표는 없다. 부품이 몸체(봉투)와 떨어져 살면 "p를 따라가면 age가 나온다"는 접근 자체가 안 된다.</li>
        <li><b>② 수명</b> — 스택 슬롯은 함수가 끝나면 <b>pop으로 사라진다</b>(M2). 그런데 객체는 함수 밖으로 살아 나갈 수 있다(M3). 만약 age만 스택에 있었다면 — 객체는 살았는데 <b>속만 빈 봉투</b>가 된다 💥. 그래서 <b>객체가 사는 한 속성도 같이 산다</b> — 봉투째로.</li>
        <li><b>③ 꺼내면 복사</b> — 봉투 안 원시값은 <b>꺼내는 순간 값이 복사</b>돼 나온다(<code>let x = p.age</code>). 봉투 안에 있을 땐 객체 규칙(힙)을 따르고, 꺼내 담으면 다시 원시 규칙(복사·독립)을 따른다 — <b>그릇이 바뀌면 규칙도 바뀐다</b>. (⑤ 넣기 · ⑥ 꺼내기에서 정면으로)</li>
      </ul>
      <div data-m="qz-life"></div>

      <h3 class="section-title">⑤ 🔗 결합·넣기 — 변수 값을 속성 칸에 담기</h3>
      <span class="learn-tag">📎 me.age = age → 변수의 값이 봉투 칸에 <b>복사</b>돼 들어간다(원시라 독립) · me.name = name의 두 name은 <b>다른 것</b></span>
      <p class="section-desc">③은 "봉투 안에 뭐가 있나"였다. 이번엔 그 반대 — <b>변수의 값을 어떻게 속성에 넣나</b>. 입문자가 가장 헷갈리는 세 지점을 정면으로 판다.</p>

      <p class="section-desc" style="margin-top:14px"><b>(1) 넣으면 '연결'되나, '복사'되나?</b> — <code>const age = 30</code> 변수를 <code>me.age = age</code>로 넣으면, me.age가 변수 age와 <b>이어지나</b>? <b>아니다.</b> 값 <b>30이 복사</b>돼 봉투 칸에 들어간다. 이제 <b>사본이 둘</b>(변수의 30 · 봉투 안 30)이라 <b>따로 논다</b> — 한쪽을 바꿔도 다른 쪽은 그대로.</p>
      <div class="card">
        <div class="file-label">🎬 메모리에서 — 값이 복사돼 들어가고, 봉투를 바꿔도 변수는 그대로 (▶ 한 단계씩)</div>
        <div data-m="sim-assign"></div>
      </div>

      <p class="section-desc" style="margin-top:16px"><b>(2) <code>me.name = name</code> — 같은 철자, 다른 것.</b> 진짜 함정은 <b>name이 두 번</b> 나오는 것. 같은 걸까? <b>아니다.</b></p>
      <pre class="err-code" style="color:inherit;background:transparent">const name = "민지"     // ← name = 스택의 변수
let me = {}
me.name = name
//  └┬─┘   └┬─┘
//   속성 키   변수 — 철자만 같을 뿐 완전히 다른 것</pre>
      <p class="section-desc">읽는 법: <b>"변수 name의 값을 꺼내(오른쪽) → me 봉투의 name 칸에 넣어라(왼쪽)."</b> 왼쪽 <code>me.name</code>의 name은 <b>봉투 칸 이름(속성 키)</b>, 오른쪽 <code>name</code>은 <b>스택 변수</b>다. 헷갈리면 이름을 다르게 써 보면 분명해진다 — <code>me.name = who</code>. 그래도 <b>하는 일은 똑같다</b>(who의 값을 name 칸에 복사).</p>
      <div data-m="qz-assign"></div>

      <p class="section-desc" style="margin-top:16px"><b>(3) 그럼 <span style="color:var(--red)">객체</span>를 넣으면?</b> — <code>me.best = hyoni</code>처럼 객체를 넣으면, 봉투 칸엔 값이 아니라 <b>주소표</b>가 들어간다(③의 그 그림). 그래서 <code>hyoni.name = "보리"</code> 하면 <b>me.best.name도 "보리"</b>(공유). <b>넣을 때도 규칙은 하나 — 원시면 값 복사(독립), 객체면 주소 복사(공유).</b> 꺼낼 때(⑥)와 완전히 대칭이다.</p>

      <h3 class="section-title">⑥ 🔀 경계·대비 — 꺼내기: 원시는 복사, 객체는 주소</h3>
      <span class="learn-tag">📎 p.age 꺼내면 값 복사(독립) ↔ p.best 꺼내면 주소 복사(공유) — 봉투 안에 든 것이 그대로 나온다</span>
      <p class="section-desc">③의 해부도가 그대로 답이 된다 — <b>봉투 안에 든 것이 꺼내진다</b>. age 자리엔 <b>값</b>이 들어 있으니 값이(복사), best 자리엔 <b>주소표</b>가 들어 있으니 주소가(공유) 나온다.</p>
      <div class="card">
        <div class="file-label">▶ 축약으로 — 읽으면 뭐가 나오나 (값 vs 주소)</div>
        <div data-m="xr-extract"></div>
      </div>
      <div class="card">
        <div class="file-label">🎬 메모리에서 — x는 봉투 밖 독립 30, f는 효니 봉투를 공유 (▶)</div>
        <div data-m="sim-extract"></div>
      </div>
      <p class="section-desc">🔑 그래서 <code>x = 9</code> 해도 <b>p.age는 그대로</b>(복사·독립 — M4-1 규칙), <code>f.name = "보리"</code> 하면 <b>p.best.name도 "보리"</b>(주소·공유 — M4-2 규칙). <b>어느 규칙이 적용되나 = 봉투의 그 칸에 값이 들었나 주소표가 들었나.</b></p>

      <h3 class="section-title">⑦ 💡 실무에서</h3>
      <p class="section-desc" style="opacity:.85">React에서 <code>obj.age = 31; setState(obj)</code> 해도 화면이 <b>안 바뀌는</b> 이유가 이 그림이다 — 봉투 <b>안</b>만 고쳤지 봉투의 <b>주소는 그대로</b>라, 주소만 비교하는 React는 "같은 객체네" 하고 넘어간다. 그래서 <code>setState({ ...obj, age: 31 })</code>처럼 <b>새 봉투</b>를 만들어 준다 — 속성이 봉투 안에 산다는 그림이 있어야 이 관례가 이해된다.</p>

      <h3 class="section-title">⑧ 📖 요약</h3>
      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>타입이 아니라 소속이 집을 정한다 — 값은 담긴 그릇을 따라간다.</b>
        독립 변수(원시) = 스택 슬롯 안 · 속성 = 객체 봉투(힙) 안. 봉투 속: 원시 = <b>값 그대로</b> · 객체 = <b>주소표</b>.
        꺼내면 봉투에 든 그대로 나온다 — 값이면 <b>복사(독립)</b>, 주소표면 <b>공유</b>.</p>
      </div>
      <div class="practice-cta"><span>예측 드릴 —</span><button class="chip on" data-goto="objanat:easy">🟢 쉬움</button><button class="chip on" data-goto="objanat:normal">🟡 보통</button><button class="chip on" data-goto="objanat:hard">🔴 어려움</button></div>

      <div class="practice-cta"><span>규칙은 하나인데 조합이 많다 — 예측으로 손에 붙이자 —</span><button class="chip on" data-goto="objprim">🧠 객체 × 원시값 · 조화 연습 →</button></div>
    `

    // ② 대비 시뮬 — 같은 30, 다른 집 (변수 vs 속성)
    root.querySelector('[data-m="sim-home"]').append(MemoryModel({
      title: '같은 30, 다른 집 — 소속이 위치를 정한다',
      stackLabel: '📇 이름표 장부(변수)', heapLabel: '🗄️ 값 메모리',
      code: ['let age = 30', 'let p = { age: 30 }'],
      steps: [
        { line: 0,
          stack: [{ name: 'main', slots: [{ name: 'age', value: '30' }] }],
          heap: {},
          note: '<code>let age = 30</code> — 이 age는 <b>독립 변수</b>. 자기 이름표(슬롯)가 그릇이라 <b>스택 슬롯</b> 안에 산다. 여기까진 배운 대로.',
          engine: 'age는 <b>SMI(작은 정수)</b>라 슬롯에 <b>태그 비트로 인라인</b> — 이름표 그릇 안. V8 방식·스펙 비강제.' },
        { line: 1,
          stack: [{ name: 'main', slots: [{ name: 'age', value: '30' }, { name: 'p', ref: 'h1' }] }],
          heap: { h1: { fields: [{ key: 'age', value: '30' }] } },
          note: '<b>같은 30인데 age는 스택 슬롯, p.age는 힙 봉투 안 — 소속이 집을 정한다.</b> 속성 age는 독립 변수가 아니라 p의 <b>부품</b>이라, p가 사는 힙 봉투를 <b>따라간다</b>(종속). 장부엔 p만 있다 — "age" 이름표는 봉투 안 칸 이름일 뿐.',
          engine: 'age는 SMI라 슬롯에 인라인 / p.age도 SMI라 <b>객체 안에 인라인</b> — 둘 다 "담긴 그릇 안"이라는 점은 실제 엔진도 같다. V8 방식·스펙 비강제.' },
      ],
    }))

    root.querySelector('[data-m="qz-home"]').append(Quiz({
      q: '<code>let p = { age: 30 }</code> — 이 <b>age의 30</b>(number, 원시)은 어디에 사나?',
      options: ['스택 — 원시타입은 무조건 스택이니까', '힙 — age는 p의 속성(부품)이라 p의 봉투 안에'],
      answer: 1,
      explain: '<b>타입이 아니라 소속이 위치를 정한다.</b> age는 독립 변수가 아니라 p라는 봉투의 <b>부품</b> — 값은 담긴 그릇(객체)을 따라 <b>힙</b>에 산다. "원시=스택"은 <b>독립 변수일 때</b>의 이야기다.',
    }))

    // ③ 해부 시뮬 — 봉투 속: 원시=값 그대로, 객체=주소표
    root.querySelector('[data-m="sim-dissect"]').append(MemoryModel({
      title: '객체 해부 — 봉투 안: 원시는 값, 객체는 주소표',
      stackLabel: '📇 이름표 장부(변수)', heapLabel: '🗄️ 값 메모리',
      code: ['let p = {', '  age: 30,', '  name: "민지",', '  best: { name: "효니" }', '}'],
      steps: [
        { line: 0,
          stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }] }],
          heap: { h1: { fields: [] } },
          note: '힙에 <b>빈 봉투(h1)</b>가 만들어지고, 장부의 p 칸엔 <b>주소</b>만 담긴다. 이제 필드를 하나씩 채워 본다.',
          engine: '객체 리터럴 → 힙 할당 + <b>hidden class(Shape)</b>가 필드 배치를 정한다. p 슬롯엔 (압축)포인터만.' },
        { line: 1,
          stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }] }],
          heap: { h1: { fields: [{ key: 'age', value: '30' }] } },
          note: '<b>age: 30</b> — 원시(숫자)라 봉투 안에 <b>값 30이 그대로</b> 들어간다. 봉투가 30을 직접 품는다.',
          engine: '30은 SMI — <b>객체의 age 필드 슬롯에 인라인</b>. 별도 힙 셀 없음.' },
        { line: 2,
          stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }] }],
          heap: { h1: { fields: [{ key: 'age', value: '30' }, { key: 'name', value: '"민지"' }] } },
          note: '<b>name: "민지"</b> — 문자열도 원시. 개념 모델에선 봉투 안에 <b>값 그대로</b>다.',
          engine: '실제 V8: 문자열은 힙의 불변 객체라 name 필드엔 그 <b>포인터</b>가 담긴다. 하지만 불변이라 공유든 복사든 관찰 결과가 같아, 개념 모델에선 "값 그대로"로 본다(M4-1 심화와 동일).' },
        { line: 3,
          stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }] }],
          heap: { h1: { fields: [{ key: 'age', value: '30' }, { key: 'name', value: '"민지"' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'name', value: '"효니"' }] } },
          note: '<b>best: { name: "효니" }</b> — 값이 객체다. 봉투 안엔 효니가 <b>통째로 안 들어간다</b> — <b>주소표(화살표)</b>만 들어가고, 효니는 <b>자기 봉투(h2)</b>를 따로 받는다.',
          engine: '중첩 리터럴 = <b>힙 할당이 두 번</b>(h1·h2). best 필드엔 h2의 포인터. "객체 안의 객체"는 물리적으론 <b>없다</b> — 항상 별도 할당 + 참조.' },
        { line: 4,
          stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }] }],
          heap: { h1: { fields: [{ key: 'age', value: '30' }, { key: 'name', value: '"민지"' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'name', value: '"효니"' }] } },
          note: '해부 완료 — <b>원시(age·name) = 봉투 안 값 그대로 · 객체(best) = 봉투 안 주소표(화살표)</b>. 봉투 안엔 딱 이 두 종류뿐이다.',
          engine: '요약: 필드 슬롯엔 <b>SMI 인라인</b> 또는 <b>포인터</b> 둘 중 하나. 이 이분법이 개념 모델의 "값 vs 주소표"와 일치한다.' },
      ],
    }))

    root.querySelector('[data-m="qz-life"]').append(Quiz({
      q: 'make가 끝나 스택이 pop되면, <b>hp의 100</b>(원시)은?<pre class="err-code" style="color:inherit;background:transparent">function make() {\n  let p = { hp: 100 }\n  return p\n}</pre>',
      options: ['사라진다 — 원시는 스택이라 pop과 함께 지워진다', '산다 — hp는 객체의 부품이라, 객체(힙)가 사는 한 같이 산다'],
      answer: 1,
      explain: 'pop으로 사라지는 건 <b>스택 슬롯(이름표 p)</b>뿐이다. 반환된 객체는 힙에 살아남고(M3), hp는 그 <b>봉투 안</b>에 있으니 <b>봉투째 같이 산다</b>. 속성이 스택에 살았다면 "속만 빈 봉투"가 됐을 것 — 이게 속성이 객체를 따라가는 이유(수명).',
    }))

    // ⑤ 결합·넣기 — 값이 복사돼 봉투 칸에 들어가고, 봉투를 바꿔도 변수는 그대로
    root.querySelector('[data-m="sim-assign"]').append(MemoryModel({
      title: 'me.age = age — 변수 값을 봉투 칸에 복사',
      stackLabel: '📇 이름표 장부(변수)', heapLabel: '🗄️ 값 메모리',
      code: ['let me = {}', 'const age = 30', 'me.age = age', 'me.age = 99   // 봉투 칸만 바꿔도?'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }] }], heap: { h1: { fields: [] } }, note: '<code>let me = {}</code> — <b>빈 봉투</b> me가 힙에 생긴다(아직 속성 없음).', engine: '빈 객체도 힙 할당 + hidden class. me 슬롯엔 포인터.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'age', value: '30' }] }], heap: { h1: { fields: [] } }, note: '<code>const age = 30</code> — 변수 age는 <b>독립 변수</b>라 값 30이 자기 <b>스택 슬롯(값 셀)</b>에. me 봉투는 아직 비었다.', engine: '30은 SMI라 age 슬롯에 인라인.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'age', value: '30' }] }], heap: { h1: { fields: [{ key: 'age', value: '30' }] } }, note: '<code>me.age = age</code> — 변수 age의 값 <b>30을 복사</b>해 me 봉투의 <b>age 칸</b>에 넣는다. 이제 30이 <b>둘</b>(변수의 30 · 봉투 안 30) — <b>별개 사본</b>이라 링크가 없다.', engine: '변수 age의 SMI 비트를 h1의 age 필드로 <b>복사</b>(봉투 안 인라인). 변수와 필드는 <b>서로 다른 저장 자리</b>.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'age', value: '30' }] }], heap: { h1: { fields: [{ key: 'age', value: '99' }] } }, note: '<code>me.age = 99</code> — 봉투 안 age 칸만 99로. <b>변수 age는 그대로 30!</b> 넣을 때 값이 <b>복사</b>됐으니 둘은 무관 — 원시라서 독립. (반대로 <code>let age</code>였고 age를 바꿔도 봉투는 그대로)', engine: 'h1의 age 필드를 <b>제자리 변경</b>(객체는 가변). age 슬롯(변수)은 손도 안 댐 — 별개 저장 자리라.' },
      ],
    }))
    root.querySelector('[data-m="qz-assign"]').append(Quiz({
      q: '<code>let me = {}; const age = 30; me.age = age;</code> 그다음 <code>me.age = 99</code>. 변수 <b>age</b>는?',
      options: ['99 — 같이 바뀐다(연결돼 있으니)', '30 — 넣을 때 값이 복사돼 별개라 그대로'],
      answer: 1,
      explain: '<code>me.age = age</code>는 값 30을 <b>복사</b>해 봉투 칸에 넣은 것. 봉투 안 사본을 99로 바꿔도 <b>변수 age는 그대로 30</b> — 원시는 넣을 때 복사돼 독립. (객체를 넣었다면 주소 공유라 이야기가 다르다 — (3))',
    }))

    // ⑥ 축약 — 읽으면 뭐가 나오나: 값 vs 주소
    root.querySelector('[data-m="xr-extract"]').append(ExprReduce({
      title: 'p 봉투에서 꺼내기 — age는 값이, best는 주소가 나온다',
      steps: [
        { code: 'p = { age: 30, best: {name: "효니"} }', mark: 'age', note: '먼저 <b>p가 뭐였지?</b> — ③에서 만든 그 <b>봉투</b>다. <b>age 칸엔 값 30</b>, <b>best 칸엔 효니 봉투의 주소표</b>. 이걸 기억하고 꺼내 보자.' },
        { code: 'let x = p.age', mark: 'p.age', note: 'p의 봉투를 열어 <b>age 칸</b>을 읽는다 — 그 칸엔 <b>값 30이 그대로</b> 들어 있다 → <b>30</b>이 나온다.' },
        { code: 'let x = 30', mark: '30', note: '나온 30이 <b>복사</b>돼 x에 담긴다 — x는 <b>봉투 밖 독립 30</b>.' },
        { code: 'let f = p.best', mark: 'p.best', note: '이번엔 <b>best 칸</b> — 이 칸엔 값이 아니라 <b>주소표</b>가 들어 있다 → <b>주소</b>가 나온다.' },
        { code: 'let f = (효니 봉투의 주소)', note: 'f = <b>주소의 사본</b> → p.best와 <b>같은 효니 봉투</b>를 가리킨다(공유). 규칙은 하나 — <b>봉투 칸에 든 그대로</b> 나온다. age 칸엔 값이라 값이(복사), best 칸엔 주소라 주소가(공유).' },
      ],
    }))

    // ⑤ 꺼내기 시뮬 — x는 독립 30, f는 h2 공유
    root.querySelector('[data-m="sim-extract"]').append(MemoryModel({
      title: '꺼내기 — 원시는 복사(독립), 객체는 주소(공유)',
      stackLabel: '📇 이름표 장부(변수)', heapLabel: '🗄️ 값 메모리',
      code: ['let p = { age: 30, best: { name: "효니" } }', 'let x = p.age   // 원시 → 복사', 'let f = p.best  // 객체 → 주소'],
      steps: [
        { line: 0,
          stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }] }],
          heap: { h1: { fields: [{ key: 'age', value: '30' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'name', value: '"효니"' }] } },
          note: '먼저 <b>p</b>부터 — ③에서 본 그 <b>봉투</b>다. <b>age 칸엔 값 30</b>, <b>best 칸엔 효니 봉투(h2)의 주소표</b>. (아직 x·f 없음) 이제 여기서 꺼내 보자.',
          engine: 'h1은 힙에 할당된 객체. age는 SMI라 <b>봉투 안에 인라인</b>, best는 h2를 가리키는 포인터. 봉투와 그 부품들이 준비됐다.' },
        { line: 1,
          stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }, { name: 'x', value: '30' }] }],
          heap: { h1: { fields: [{ key: 'age', value: '30' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'name', value: '"효니"' }] } },
          note: '<code>let x = p.age</code> — age 칸의 <b>값 30이 복사</b>돼 나온다. x는 <b>봉투 밖 독립 30</b> — 이후 <code>p.age = 99</code> 해도 x는 그대로, <code>x = 9</code> 해도 p.age는 그대로(M4-1 · 값 = 복사).',
          engine: 'p.age의 SMI 비트를 x 슬롯으로 <b>복사</b> — h1을 가리키는 참조가 아니다. 봉투와의 링크가 애초에 없다.' },
        { line: 2,
          stack: [{ name: 'main', slots: [{ name: 'p', ref: 'h1' }, { name: 'x', value: '30' }, { name: 'f', ref: 'h2' }] }],
          heap: { h1: { fields: [{ key: 'age', value: '30' }, { key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'name', value: '"효니"' }] } },
          note: '<code>let f = p.best</code> — best 칸엔 <b>주소표</b>가 들어 있으니 <b>주소가 복사</b>된다. f와 p.best가 <b>같은 효니 봉투(h2)</b>를 가리킨다(공유) — <code>f.name = "보리"</code> 하면 <b>p.best.name도 "보리"</b>. 원시=복사·독립 vs 객체=주소·공유.',
          engine: 'best 필드의 <b>포인터만 복사</b> — 새 객체 할당 없음. f·p.best 두 곳이 같은 힙 주소를 담는다(별칭).' },
      ],
    }))

  }
})()
