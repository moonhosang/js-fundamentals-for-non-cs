// ✏️ 객체 × 원시값 — 조화 연습 (순수 예측·반복 챕터)
// 개념은 objanat(M3-1)에서 끝냈다 — 여기선 "조합"을 손에 붙인다.
// 관통 규칙 딱 하나: 원시값 = 값 복사(독립) · 객체 = 주소 복사(공유). 넣든 꺼내든 어디서나 같다.
// 커버: A 넣기 · B 꺼내기 · C 속성끼리 · D 이름 함정 · E 중첩 · F 배열 원소 · G 얕은 복사
//
// 오해: 넣기·꺼내기·속성끼리·중첩·배열마다 규칙이 따로 있다 (외울 게 많다)
// 왜:   규칙은 단 하나 — 원시=값 복사(독립)·객체=주소 복사(공유). 방향이 바뀌어도 동일
// 대비: a.num(원시 꺼냄=복사·독립) vs a(객체째=주소·공유) — 같은 = 인데 갈린다

;(function () {
  window.Lessons = window.Lessons || {}

  window.Lessons['objprim'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">✏️ M3-2 · 연습</span>
        <h2>객체 × 원시값 — 조화 연습</h2>
        <p>규칙은 하나(원시=복사·객체=공유), 조합은 많다 — <b>예측으로 손에 붙인다.</b>
        넣기·꺼내기·속성끼리·중첩·배열·얕은 복사 — 방향이 바뀌어도 답을 내는 근거는 <b>단 한 줄</b>이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 규칙 — 이 챕터의 모든 정답 근거</span>
        <p><b>원시값 = 값 복사(독립) · 객체 = 주소 복사(공유). 넣든 꺼내든 어디서나 같다.</b>
        봉투 칸에 <b>값</b>이 들었으면 값이 오가고(사본·독립), <b>주소표</b>가 들었으면 주소가 오간다(같은 봉투·공유).
        조합이 헷갈리면 매번 이 한 줄로 돌아온다. 개념이 흐릿하면 → <button class="inline-goto" data-goto="objanat">🧠 객체 해부</button></p>
      </div>

      <h3 class="section-title">👁️ 눈으로 ① — 별칭 vs 재할당 (한쪽을 바꾸면?)</h3>
      <span class="learn-tag">📎 ▶ — <code>const heyony = myFriend</code>는 같은 봉투(별칭) · <code>myFriend = …</code>는 myFriend 화살표만 옮긴다(heyony는 옛 봉투 그대로)</span>
      <div data-m="sim-alias"></div>

      <h3 class="section-title">👁️ 눈으로 ② — 같은 내용인데 <code>===</code>가 거짓? (봉투 주소로 비교)</h3>
      <span class="learn-tag">📎 ▶ — <code>{n:1}</code>과 <code>{n:1}</code>은 내용은 같아도 <b>다른 봉투</b> · <code>===</code>는 내용이 아니라 <b>주소</b>를 비교한다(입문자 최대 맹점)</span>
      <div data-m="sim-eq"></div>

      <h3 class="section-title">① A · 넣기 — 변수 → 속성</h3>
      <span class="learn-tag">📎 o.x = a — 변수에 든 것이 봉투 칸으로 복사된다: 원시면 값이(독립), 객체면 주소가(공유)</span>
      <div data-m="qz-a1"></div>
      <div data-m="qz-a2"></div>

      <h3 class="section-title">② B · 꺼내기 — 속성 → 변수</h3>
      <span class="learn-tag">📎 let x = o.n — 봉투 칸에 든 것이 변수로 복사된다: 값이면 값이(독립), 주소표면 주소가(공유)</span>
      <div data-m="qz-b1"></div>
      <div data-m="qz-b2"></div>

      <h3 class="section-title">③ C · 속성 → 속성</h3>
      <span class="learn-tag">📎 a.x = b.y — 봉투에서 봉투로도 규칙은 그대로: 원시=값 복사 · 객체=주소 복사</span>
      <div data-m="sim-c"></div>
      <div data-m="qz-c1"></div>
      <div data-m="qz-c2"></div>

      <h3 class="section-title">④ D · 이름 함정 — 같은 철자, 다른 것</h3>
      <span class="learn-tag">📎 me.name = name — 왼쪽 name은 속성 키(봉투 칸 이름), 오른쪽 name은 변수. 철자만 같다</span>
      <div data-m="qz-d1"></div>

      <h3 class="section-title">⑤ E · 중첩 — 봉투 안의 봉투</h3>
      <span class="learn-tag">📎 o.inner를 꺼내면 주소가 나온다 — 아무리 깊어도 각 칸마다 "값이냐 주소표냐"만 보면 된다</span>
      <div data-m="qz-e1"></div>

      <h3 class="section-title">⑥ F · 배열 원소</h3>
      <span class="learn-tag">📎 arr[0]도 봉투의 한 칸 — 원소가 원시면 꺼낼 때 복사, 객체면 주소 공유. 배열이라고 다르지 않다</span>
      <div data-m="sim-farr"></div>
      <div data-m="qz-f1"></div>
      <div data-m="qz-f2"></div>

      <h3 class="section-title">⑦ G · 심화 — 얕은 복사의 함정</h3>
      <span class="learn-tag">📎 { ...o }는 봉투 칸을 한 겹만 복사 — 원시 필드는 값이 복사돼 독립, 객체 필드는 주소만 복사돼 여전히 공유</span>
      <div data-m="qz-g1"></div>
      <div data-m="qz-g2"></div>

      <h3 class="section-title">⑧ H · 함수에 전달 — 매개변수도 결국 '대입'이다</h3>
      <span class="learn-tag">📎 f(인자) 호출은 매개변수 = 인자 대입과 같다 — 그래서 넣기·꺼내기와 똑같은 규칙</span>
      <div class="concept">
        <p class="concept-lead">📖 핵심 다리 — 매개변수 전달 = 대입</p>
        <p class="section-desc" style="margin-top:0"><code>f(x)</code>로 부르면 함수는 매개변수 자리에 <code>매개변수 = x</code>를 <b>대입</b>하는 것과 똑같다.
        그러니 <b>새 규칙이 아니다</b> — <b>원시면 값이 복사</b>돼 원본 안전, <b>객체면 주소가 복사=공유</b>돼 함수 안에서 바꾸면 원본도 바뀐다. 지금까지의 한 줄 그대로다.</p>
      </div>
      <span class="learn-tag">📎 ▶ — <code>hurt(u)</code>는 같은 봉투를 넘겨(p=u) 함수 안 변경이 원본에 샌다 · 함수 끝엔 undefined가 반환된다</span>
      <div data-m="sim-fn"></div>
      <div data-m="qz-h1"></div>
      <div data-m="qz-h2"></div>

      <div class="card">
        <div class="file-label">⚠️ 최대 함정 — 매개변수를 '변경(mutate)' 하나, '재할당(reassign)' 하나</div>
        <pre class="err-code">function 변경(p)   { p.hp = 0 }       // p가 가리키는 봉투를 뜯어고침 → 원본도 바뀜
function 재할당(p) { p = { hp: 0 } }  // p를 아예 새 봉투로 갈아끼움 → 원본은 그대로</pre>
      </div>
      <p class="section-desc"><b>변경</b>(<code>p.hp = 0</code>)은 넘겨받은 <b>같은 봉투</b>를 고치니 원본에 뚫고 나간다. <b>재할당</b>(<code>p = { ... }</code>)은 매개변수 <code>p</code>의 <b>화살표만 새 봉투로</b> 옮길 뿐 — 바깥 변수의 화살표는 <b>옛 봉투 그대로</b>라 원본이 안전하다. 같은 <code>=</code>이라도 <b>p.hp = …</b>는 봉투 <u>안</u>을, <b>p = …</b>는 <u>화살표</u>를 바꾼다.</p>
      <div data-m="qz-h3"></div>

      <p class="section-desc" style="opacity:.85">🔎 왜 그런지 <b>메모리 그림</b>으로 낱낱이 — <button class="inline-goto" data-goto="passval">🧠 M5 · 원시 전달</button> · <button class="inline-goto" data-goto="passobj">🧠 M6 · 객체 전달</button> · <button class="inline-goto" data-goto="passarr">🧠 M7 · 배열 전달</button></p>

      <h3 class="section-title">⑨ 🎯 예측 드릴 — A~H 섞어서, 손에 붙이자</h3>
      <p class="section-desc">위 개념을 <b>예측 드릴</b>로 굳힌다 — 매 문제, <b>그 칸에 값이 들었나 주소표가 들었나</b>부터 판정하라. 사이드바의 이 강의 아래 <b>쉬움·보통·어려움</b> 3단계, 아래 버튼으로 바로 시작:</p>
      <div class="practice-cta"><span>예측 드릴 —</span><button class="chip on" data-goto="objprim:easy">🟢 쉬움</button><button class="chip on" data-goto="objprim:normal">🟡 보통</button><button class="chip on" data-goto="objprim:hard">🔴 어려움</button></div>

      <div class="practice-cta"><span>이제 복사·공유의 진짜 함정으로 —</span><button class="chip on" data-goto="ref">🧠 M4-1 · 값 = 복사 →</button></div>
    `

    // ── 눈으로 ① · 별칭 vs 재할당 ────────────────────────────
    root.querySelector('[data-m="sim-alias"]').append(MemoryModel({
      title: '별칭(같은 봉투) vs 재할당(화살표만 이동)',
      stackLabel: '📇 이름표 장부',
      code: ['let myFriend = { name: "효니" }', 'const heyony = myFriend', 'myFriend = "효니"'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'myFriend', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"효니"' }] } }, note: 'myFriend가 봉투 <b>h1</b>을 가리킨다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'myFriend', ref: 'h1' }, { name: 'heyony', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"효니"' }] } }, note: '<b>const heyony = myFriend</b> → <b>주소만 복사</b> → heyony도 <b>같은 h1</b>(별칭). 봉투는 하나뿐.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'myFriend', value: '"효니"' }, { name: 'heyony', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"효니"' }] } }, note: '<b>myFriend = "효니"</b>는 <b>재할당</b> — myFriend의 <b>화살표만</b> 문자열 "효니"로 옮긴다. <b>heyony는 여전히 h1</b>(봉투 그대로). 별칭이라도 <b>한쪽 재할당은 다른 쪽과 무관</b> — 변경(봉투 안)과 재할당(화살표)은 다르다.' },
      ],
    }))

    // ── 눈으로 ② · === 는 주소로 비교 ───────────────────────
    root.querySelector('[data-m="sim-eq"]').append(MemoryModel({
      title: '=== 는 객체를 주소로 비교 — 내용이 같아도 다른 봉투면 거짓',
      stackLabel: '📇 이름표 장부',
      code: ['let a = { n: 1 }', 'let b = { n: 1 }', 'let c = a', 'print(a === b)   // ?', 'print(a === c)   // ?'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'n', value: '1' }] } }, note: 'a가 봉투 <b>h1</b>{n:1}을 가리킨다.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h2' }] }], heap: { h1: { fields: [{ key: 'n', value: '1' }] }, h2: { fields: [{ key: 'n', value: '1' }] } }, note: 'b도 <code>{ n: 1 }</code>이지만 <b>새 봉투 h2</b>가 생긴다 — <b>내용이 같아도 다른 주소</b>. (리터럴 <code>{}</code>는 볼 때마다 새 봉투)' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h2' }, { name: 'c', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'n', value: '1' }] }, h2: { fields: [{ key: 'n', value: '1' }] } }, note: '<code>let c = a</code> → 주소 복사 → c도 <b>같은 h1</b>(별칭).' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h2' }, { name: 'c', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'n', value: '1' }] }, h2: { fields: [{ key: 'n', value: '1' }] } }, note: '<b>a === b</b>? 주소 <b>h1 vs h2</b> → <b>다르다 → false</b>. 내용이 같아도(둘 다 n:1) <b>봉투가 다르면 거짓</b> — ===는 <b>내용이 아니라 주소</b>를 본다.' },
        { line: 4, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'b', ref: 'h2' }, { name: 'c', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'n', value: '1' }] }, h2: { fields: [{ key: 'n', value: '1' }] } }, note: '<b>a === c</b>? 주소 <b>h1 vs h1</b> → <b>같다 → true</b>(별칭이라 같은 봉투). 정리: <b>객체 === 는 같은 봉투(주소)일 때만 참</b>. (원시값 ===는 값으로 비교 — 그래서 5===5는 참)' },
      ],
    }))

    // ── A 넣기 ──────────────────────────────────────────────
    root.querySelector('[data-m="qz-a1"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let o = {}\nlet a = 5\no.x = a\na = 9</pre><b>o.x</b>는?',
      options: ['5 — 넣을 때 값이 복사돼 독립, 변수를 바꿔도 무관', '9 — 변수 a와 이어져 같이 바뀐다'],
      answer: 0,
      explain: '<code>o.x = a</code>는 a의 <b>값 5를 복사</b>해 봉투 칸에 넣는다. 그 뒤 <code>a = 9</code>는 변수만 바꾼다 — <b>o.x는 그대로 5</b>. 규칙: <b>원시=값 복사(독립) · 객체=주소 복사(공유)</b>.',
    }))
    root.querySelector('[data-m="qz-a2"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let o = {}\nlet h = { v: 1 }\no.f = h\nh.v = 9</pre><b>o.f.v</b>는?',
      options: ['1 — 넣을 때 복사됐으니 독립', '9 — 주소가 복사돼 h와 같은 봉투를 공유'],
      answer: 1,
      explain: 'h에 든 건 값이 아니라 <b>주소표</b> — <code>o.f = h</code>는 그 <b>주소를 복사</b>한다. o.f와 h는 <b>같은 봉투</b>라 <code>h.v = 9</code>가 o.f.v로도 보인다. 규칙: <b>원시=값 복사 · 객체=주소 복사(공유)</b>.',
    }))

    // ── B 꺼내기 ────────────────────────────────────────────
    root.querySelector('[data-m="qz-b1"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let o = { n: 5 }\nlet x = o.n\nx = 9</pre><b>o.n</b>은?',
      options: ['5 — 꺼낼 때 값이 복사돼 봉투와 무관', '9 — 꺼낸 x와 이어져 같이 바뀐다'],
      answer: 0,
      explain: 'n 칸엔 <b>값 5</b>가 들었으니 꺼내면 <b>값이 복사</b>돼 나온다. x는 봉투 밖 독립 사본 — <code>x = 9</code> 해도 <b>o.n은 그대로 5</b>. 규칙: <b>원시=값 복사(독립)</b>.',
    }))
    root.querySelector('[data-m="qz-b2"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let o = { best: { v: 1 } }\nlet f = o.best\nf.v = 9</pre><b>o.best.v</b>는?',
      options: ['1 — 꺼내면 복사라 독립', '9 — best 칸엔 주소표가 들어 있어 같은 봉투를 공유'],
      answer: 1,
      explain: 'best 칸엔 <b>주소표</b>가 들었으니 꺼내면 <b>주소가 복사</b>된다. f와 o.best는 <b>같은 봉투</b> — f로 고치면 o.best로 봐도 9. 규칙: <b>객체=주소 복사(공유)</b>. B는 A의 반대 방향이지만 규칙은 같다.',
    }))

    // ── C 속성끼리 ──────────────────────────────────────────
    root.querySelector('[data-m="sim-c"]').append(MemoryModel({
      title: '같은 문법 a.속성 = b.속성 — 그런데 x는 독립, g는 공유',
      stackLabel: '📇 이름표 장부',
      code: ['let b = { y: 5, f: { v: 1 } }', 'let a = {}', 'a.x = b.y', 'a.g = b.f'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'b', ref: 'h2' }] }], heap: { h2: { fields: [{ key: 'y', value: '5' }, { key: 'f', ref: 'h3' }] }, h3: { fields: [{ key: 'v', value: '1' }] } }, note: 'b 봉투 h2: y 칸엔 <b>값 5</b>, f 칸엔 <b>주소표(→h3)</b>.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'b', ref: 'h2' }, { name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [] }, h2: { fields: [{ key: 'y', value: '5' }, { key: 'f', ref: 'h3' }] }, h3: { fields: [{ key: 'v', value: '1' }] } }, note: 'a는 빈 봉투 h1.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'b', ref: 'h2' }, { name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'x', value: '5' }] }, h2: { fields: [{ key: 'y', value: '5' }, { key: 'f', ref: 'h3' }] }, h3: { fields: [{ key: 'v', value: '1' }] } }, note: '<b>a.x = b.y</b> — b.y 칸엔 <b>값 5</b> → <b>값이 복사</b>돼 a.x 칸에. a.x와 b.y는 <b>따로</b>(독립) — b.y를 바꿔도 a.x는 5.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'b', ref: 'h2' }, { name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'x', value: '5' }, { key: 'g', ref: 'h3' }] }, h2: { fields: [{ key: 'y', value: '5' }, { key: 'f', ref: 'h3' }] }, h3: { fields: [{ key: 'v', value: '1' }] } }, note: '<b>a.g = b.f</b> — b.f 칸엔 <b>주소표(→h3)</b> → <b>주소가 복사</b>돼 a.g도 <b>같은 h3</b>(공유). <b>같은 문법인데</b> x는 독립·g는 공유 — <b>칸에 값이냐 주소표냐</b>가 갈랐다.' },
      ],
    }))
    root.querySelector('[data-m="qz-c1"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let a = { x: 1 }\nlet b = { y: 5 }\na.x = b.y\nb.y = 9</pre><b>a.x</b>는?',
      options: ['5 — 값이 복사돼 독립, b를 바꿔도 무관', '9 — 속성끼리 대입하면 이어진다'],
      answer: 0,
      explain: 'b.y 칸엔 <b>값 5</b> — 그러니 <code>a.x = b.y</code>는 <b>값 복사</b>다. 봉투에서 봉투로 가도 똑같다 — <b>a.x는 5</b>. 규칙: <b>원시=값 복사(독립)</b>. "속성끼리는 특별하다"는 없다.',
    }))
    root.querySelector('[data-m="qz-c2"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let a = {}\nlet b = { f: { v: 1 } }\na.g = b.f\nb.f.v = 9</pre><b>a.g.v</b>는?',
      options: ['1 — 다른 봉투로 옮겨 담았으니 독립', '9 — 주소가 복사돼 같은 봉투를 공유'],
      answer: 1,
      explain: 'b.f 칸엔 <b>주소표</b> — <code>a.g = b.f</code>는 그 주소를 복사한다. a.g와 b.f는 <b>같은 안쪽 봉투</b>를 가리켜 <code>b.f.v = 9</code>가 a.g.v로도 보인다. 규칙: <b>객체=주소 복사(공유)</b>.',
    }))

    // ── D 이름 함정 ─────────────────────────────────────────
    root.querySelector('[data-m="qz-d1"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let name = "민지"\nlet me = {}\nme.name = name</pre>왼쪽 <code>me.name</code>의 name과 오른쪽 <code>name</code>은 <b>같은 것</b>인가?',
      options: ['같다 — 철자가 같으니 같은 name이다', '다르다 — 왼쪽은 속성 키(봉투 칸 이름), 오른쪽은 변수'],
      answer: 1,
      explain: '철자만 같을 뿐 <b>완전히 다른 것</b>이다. 읽는 법: "<b>변수 name의 값을 꺼내 → me 봉투의 name 칸에 복사하라</b>". 문자열은 원시라 <b>값 복사(독립)</b> — 이후 변수 name을 바꿔도 me.name은 무관. 규칙은 여기서도 하나다.',
    }))

    // ── E 중첩 ─────────────────────────────────────────────
    root.querySelector('[data-m="qz-e1"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let o = { inner: { val: 1 } }\nlet p = o.inner\np.val = 9</pre><b>o.inner.val</b>은?',
      options: ['1 — 중첩된 안쪽 값이라 안전하게 복사된다', '9 — inner 칸의 주소가 복사돼 p와 같은 봉투'],
      answer: 1,
      explain: 'inner 칸엔 안쪽 봉투의 <b>주소표</b> — 꺼내면 주소가 복사돼 p와 o.inner는 <b>같은 봉투</b>다(공유). 반대로 그 안의 <b>원시값 val을 꺼내면</b>(<code>let v = p.val</code>) 그건 <b>값 복사(독립)</b>. 아무리 깊어도 각 칸마다 <b>원시=복사 · 객체=공유</b>만 판정하면 된다.',
    }))

    // ── F 배열 원소 ─────────────────────────────────────────
    root.querySelector('[data-m="sim-farr"]').append(MemoryModel({
      title: '배열도 객체 — let c = arr는 같은 배열(별칭)',
      stackLabel: '📇 이름표 장부',
      code: ['let arr = [1, 2]', 'let c = arr', 'c.push(9)'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'arr', ref: 'h1' }] }], heap: { h1: { label: '[1, 2]' } }, note: 'arr가 배열 봉투 <b>h1</b>을 가리킨다(배열도 힙 객체).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'arr', ref: 'h1' }, { name: 'c', ref: 'h1' }] }], heap: { h1: { label: '[1, 2]' } }, note: '<code>let c = arr</code> — 배열도 객체라 <b>주소 복사</b> → c와 arr은 <b>같은 배열 h1</b>(별칭). "배열은 특별"이 아니다.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'arr', ref: 'h1' }, { name: 'c', ref: 'h1' }] }], heap: { h1: { label: '[1, 2, 9]' } }, note: '<code>c.push(9)</code>가 h1을 늘린다 → <b>arr로 봐도 [1, 2, 9]</b>. 같은 배열을 공유하니까. (사본을 원하면 <code>[ ...arr ]</code> — 스프레드!)' },
      ],
    }))
    root.querySelector('[data-m="qz-f1"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let arr = [1, 2, 3]\nlet x = arr[0]\nx = 9</pre><b>arr[0]</b>은?',
      options: ['1 — 원소가 원시라 꺼낼 때 값이 복사된다', '9 — 배열 원소와 이어져 같이 바뀐다'],
      answer: 0,
      explain: '배열도 봉투다 — <code>arr[0]</code> 칸엔 <b>값 1</b>이 들었으니 꺼내면 <b>값 복사</b>. x는 독립 사본이라 <code>x = 9</code> 해도 <b>arr[0]은 1</b>. 규칙: <b>원시=값 복사(독립)</b> — 배열이라고 다르지 않다.',
    }))
    root.querySelector('[data-m="qz-f2"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let arr = [{ v: 1 }]\nlet e = arr[0]\ne.v = 9</pre><b>arr[0].v</b>는?',
      options: ['1 — 꺼내면 복사돼 독립', '9 — 원소가 객체라 주소가 복사돼 공유'],
      answer: 1,
      explain: '이번엔 <code>arr[0]</code> 칸에 <b>주소표</b> — 꺼내면 주소가 복사돼 e와 arr[0]은 <b>같은 봉투</b>. <code>e.v = 9</code>가 arr[0].v로도 보인다. 규칙: <b>객체=주소 복사(공유)</b>. F-1과의 차이는 배열이 아니라 <b>원소의 종류</b>다.',
    }))

    // ── G 얕은 복사 ─────────────────────────────────────────
    root.querySelector('[data-m="qz-g1"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let o = { n: 5, f: { v: 1 } }\nlet c = { ...o }\nc.n = 9</pre><b>o.n</b>은?',
      options: ['5 — 원시 필드는 값이 복사돼 c와 독립', '9 — 복사본이라도 원본과 이어진다'],
      answer: 0,
      explain: '<code>{ ...o }</code>는 봉투 칸을 하나씩 새 봉투로 복사한다. n 칸엔 <b>값 5</b> → <b>값이 복사</b>돼 c.n은 독립 사본. <code>c.n = 9</code> 해도 <b>o.n은 5</b>. 규칙: <b>원시=값 복사(독립)</b>.',
    }))
    root.querySelector('[data-m="qz-g2"]').append(Quiz({
      q: '같은 코드에서 이번엔 <code>c.f.v = 9</code> — <b>o.f.v</b>는?',
      options: ['1 — 복사했으니 안쪽도 독립이다', '9 — 객체 필드는 주소만 복사돼 안쪽 봉투는 여전히 공유'],
      answer: 1,
      explain: 'f 칸엔 <b>주소표</b> → 복사되는 건 <b>주소뿐</b>이다. c.f와 o.f는 <b>같은 안쪽 봉투</b> — 그래서 <code>c.f.v = 9</code>가 o.f.v로도 보인다. 이게 <b>"얕은" 복사</b>의 정체: 한 겹만 새 봉투, 안쪽은 공유. 규칙은 그대로 — <b>원시=복사 · 객체=공유</b>가 필드마다 적용될 뿐.',
    }))

    // ── H 함수에 전달 (매개변수 = 대입) ──────────────────────
    root.querySelector('[data-m="sim-fn"]').append(MemoryModel({
      title: 'hurt(u) — 같은 봉투를 넘긴다(주소 복사) · 끝엔 undefined 반환',
      stackLabel: '📇 이름표 장부',
      code: ['let u = { hp: 100 }', 'function hurt(p) { p.hp = 0 }', 'hurt(u)'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'u', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }] } }, note: 'u가 봉투 h1을 가리킨다.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'u', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }] } }, note: '<b>①호출</b> — <code>hurt(u)</code> 호출 직전. 아직 hurt 프레임 없다(main만).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'u', ref: 'h1' }] }, { name: 'hurt', slots: [{ name: 'p', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '100' }] } }, note: '<b>②push + ③바인딩</b> — hurt 프레임 push, 매개변수 <b>p = u</b>는 <b>주소 복사</b> → p와 u는 <b>같은 봉투 h1</b>(공유).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'u', ref: 'h1' }] }, { name: 'hurt', slots: [{ name: 'p', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '0', bad: true }] } }, note: '<b>④본문</b> — <code>p.hp = 0</code>이 h1을 고친다 → 같은 봉투라 <b>u.hp도 0</b>(변경이 원본에 샌다).' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'u', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'hp', value: '0', bad: true }] } }, returning: { value: 'undefined', discarded: true }, note: '<b>⑤ 반환·pop</b> — hurt는 return이 없어 <b>undefined를 통로로</b>(💨 버려짐) 내보내고 pop. p 사라짐. 그래도 <b>u.hp는 0</b>(같은 봉투 변경은 남는다).' },
      ],
    }))
    root.querySelector('[data-m="qz-h1"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let money = 100\nfunction pay(n) { n = 0 }\npay(money)</pre><b>money</b>는?',
      options: ['0 — 함수 안에서 0으로 바꿨으니까', '100 — 복사본이 전달돼 원본은 안전'],
      answer: 1,
      explain: '원시값은 넘길 때 <b>값이 복사</b>된다 — 매개변수 <code>n</code>은 money의 <b>독립 사본</b>. <code>n = 0</code>은 사본만 바꾼다 → 원본 <b>money는 100 그대로</b>. <b>원시=값 복사(독립)</b> — 대입일 때와 똑같다.',
    }))
    root.querySelector('[data-m="qz-h2"]').append(Quiz({
      q: '<pre class="err-code" style="color:inherit;background:transparent">let u = { hp: 100 }\nfunction hurt(p) { p.hp = 0 }\nhurt(u)</pre><b>u.hp</b>는?',
      options: ['100 — 함수에 넘긴 건 사본이라 원본 안전', '0 — 같은 봉투라 함수 안 변경이 원본에 보인다'],
      answer: 1,
      explain: '객체는 넘길 때 <b>주소가 복사=공유</b> — 매개변수 <code>p</code>와 <code>u</code>는 <b>같은 봉투</b>다. <code>p.hp = 0</code>이 그 봉투를 고치니 <b>u.hp도 0</b>. <b>객체=주소 복사(공유)</b>.',
    }))
    root.querySelector('[data-m="qz-h3"]').append(Quiz({
      q: '이번엔 (u는 <code>{ hp: 100 }</code>):<pre class="err-code" style="color:inherit;background:transparent">function reset(p) { p = { hp: 0 } }\nreset(u)</pre><b>u.hp</b>는?',
      options: ['0 — 함수가 hp를 0으로 만들었다', '100 — p를 새 봉투로 갈아껴 원본은 그대로'],
      answer: 1,
      explain: '<code>p = { hp: 0 }</code>은 매개변수 <code>p</code>의 <b>화살표만 새 봉투로</b> 옮긴다 — 바깥 <code>u</code>의 화살표는 <b>옛 봉투 그대로</b>. 그래서 <b>u.hp는 100</b>. (만약 <code>p.hp = 0</code>였다면 같은 봉투를 고쳐 원본도 0 — <b>변경 vs 재할당</b>의 갈림길!)',
    }))
  }
})()
