// ✏️ 객체 × 원시값 — 조화 연습 (순수 예측·반복 챕터)
// 개념은 objanat(M3-1)에서 끝냈다 — 여기선 "조합"을 손에 붙인다.
// 관통 규칙 딱 하나: 원시값 = 값 복사(독립) · 객체 = 주소 복사(공유). 넣든 꺼내든 어디서나 같다.
// 커버: A 넣기 · B 꺼내기 · C 속성끼리 · D 이름 함정 · E 중첩 · F 배열 원소 · G 얕은 복사

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
      <div data-m="qz-f1"></div>
      <div data-m="qz-f2"></div>

      <h3 class="section-title">⑦ G · 심화 — 얕은 복사의 함정</h3>
      <span class="learn-tag">📎 { ...o }는 봉투 칸을 한 겹만 복사 — 원시 필드는 값이 복사돼 독립, 객체 필드는 주소만 복사돼 여전히 공유</span>
      <div data-m="qz-g1"></div>
      <div data-m="qz-g2"></div>

      <h3 class="section-title">⑧ 🎯 예측 드릴 — A~G 섞어서, 손에 붙이자</h3>
      <p class="section-desc">위 개념을 <b>예측 드릴</b>로 굳힌다 — 매 문제, <b>그 칸에 값이 들었나 주소표가 들었나</b>부터 판정하라. 사이드바의 이 강의 아래 <b>쉬움·보통·어려움</b> 3단계, 아래 버튼으로 바로 시작:</p>
      <div class="practice-cta"><span>예측 드릴 —</span><button class="chip on" data-goto="objprim:easy">🟢 쉬움</button><button class="chip on" data-goto="objprim:normal">🟡 보통</button><button class="chip on" data-goto="objprim:hard">🔴 어려움</button></div>

      <div class="practice-cta"><span>이제 복사·공유의 진짜 함정으로 —</span><button class="chip on" data-goto="ref">🧠 M4-1 · 값 = 복사 →</button></div>
    `

    // ── A 넣기 ──────────────────────────────────────────────
    root.querySelector('[data-m="qz-a1"]').append(Quiz({
      q: '<code>let o = {}; let a = 5; o.x = a; a = 9</code> — <b>o.x</b>는?',
      options: ['5 — 넣을 때 값이 복사돼 독립, 변수를 바꿔도 무관', '9 — 변수 a와 이어져 같이 바뀐다'],
      answer: 0,
      explain: '<code>o.x = a</code>는 a의 <b>값 5를 복사</b>해 봉투 칸에 넣는다. 그 뒤 <code>a = 9</code>는 변수만 바꾼다 — <b>o.x는 그대로 5</b>. 규칙: <b>원시=값 복사(독립) · 객체=주소 복사(공유)</b>.',
    }))
    root.querySelector('[data-m="qz-a2"]').append(Quiz({
      q: '<code>let o = {}; let h = { v: 1 }; o.f = h; h.v = 9</code> — <b>o.f.v</b>는?',
      options: ['1 — 넣을 때 복사됐으니 독립', '9 — 주소가 복사돼 h와 같은 봉투를 공유'],
      answer: 1,
      explain: 'h에 든 건 값이 아니라 <b>주소표</b> — <code>o.f = h</code>는 그 <b>주소를 복사</b>한다. o.f와 h는 <b>같은 봉투</b>라 <code>h.v = 9</code>가 o.f.v로도 보인다. 규칙: <b>원시=값 복사 · 객체=주소 복사(공유)</b>.',
    }))

    // ── B 꺼내기 ────────────────────────────────────────────
    root.querySelector('[data-m="qz-b1"]').append(Quiz({
      q: '<code>let o = { n: 5 }; let x = o.n; x = 9</code> — <b>o.n</b>은?',
      options: ['5 — 꺼낼 때 값이 복사돼 봉투와 무관', '9 — 꺼낸 x와 이어져 같이 바뀐다'],
      answer: 0,
      explain: 'n 칸엔 <b>값 5</b>가 들었으니 꺼내면 <b>값이 복사</b>돼 나온다. x는 봉투 밖 독립 사본 — <code>x = 9</code> 해도 <b>o.n은 그대로 5</b>. 규칙: <b>원시=값 복사(독립)</b>.',
    }))
    root.querySelector('[data-m="qz-b2"]').append(Quiz({
      q: '<code>let o = { best: { v: 1 } }; let f = o.best; f.v = 9</code> — <b>o.best.v</b>는?',
      options: ['1 — 꺼내면 복사라 독립', '9 — best 칸엔 주소표가 들어 있어 같은 봉투를 공유'],
      answer: 1,
      explain: 'best 칸엔 <b>주소표</b>가 들었으니 꺼내면 <b>주소가 복사</b>된다. f와 o.best는 <b>같은 봉투</b> — f로 고치면 o.best로 봐도 9. 규칙: <b>객체=주소 복사(공유)</b>. B는 A의 반대 방향이지만 규칙은 같다.',
    }))

    // ── C 속성끼리 ──────────────────────────────────────────
    root.querySelector('[data-m="qz-c1"]').append(Quiz({
      q: '<code>let a = { x: 1 }; let b = { y: 5 }; a.x = b.y; b.y = 9</code> — <b>a.x</b>는?',
      options: ['5 — 값이 복사돼 독립, b를 바꿔도 무관', '9 — 속성끼리 대입하면 이어진다'],
      answer: 0,
      explain: 'b.y 칸엔 <b>값 5</b> — 그러니 <code>a.x = b.y</code>는 <b>값 복사</b>다. 봉투에서 봉투로 가도 똑같다 — <b>a.x는 5</b>. 규칙: <b>원시=값 복사(독립)</b>. "속성끼리는 특별하다"는 없다.',
    }))
    root.querySelector('[data-m="qz-c2"]').append(Quiz({
      q: '<code>let a = {}; let b = { f: { v: 1 } }; a.g = b.f; b.f.v = 9</code> — <b>a.g.v</b>는?',
      options: ['1 — 다른 봉투로 옮겨 담았으니 독립', '9 — 주소가 복사돼 같은 봉투를 공유'],
      answer: 1,
      explain: 'b.f 칸엔 <b>주소표</b> — <code>a.g = b.f</code>는 그 주소를 복사한다. a.g와 b.f는 <b>같은 안쪽 봉투</b>를 가리켜 <code>b.f.v = 9</code>가 a.g.v로도 보인다. 규칙: <b>객체=주소 복사(공유)</b>.',
    }))

    // ── D 이름 함정 ─────────────────────────────────────────
    root.querySelector('[data-m="qz-d1"]').append(Quiz({
      q: '<code>let name = "민지"; let me = {}; me.name = name</code> — 왼쪽 <code>me.name</code>의 name과 오른쪽 <code>name</code>은 <b>같은 것</b>인가?',
      options: ['같다 — 철자가 같으니 같은 name이다', '다르다 — 왼쪽은 속성 키(봉투 칸 이름), 오른쪽은 변수'],
      answer: 1,
      explain: '철자만 같을 뿐 <b>완전히 다른 것</b>이다. 읽는 법: "<b>변수 name의 값을 꺼내 → me 봉투의 name 칸에 복사하라</b>". 문자열은 원시라 <b>값 복사(독립)</b> — 이후 변수 name을 바꿔도 me.name은 무관. 규칙은 여기서도 하나다.',
    }))

    // ── E 중첩 ─────────────────────────────────────────────
    root.querySelector('[data-m="qz-e1"]').append(Quiz({
      q: '<code>let o = { inner: { val: 1 } }; let p = o.inner; p.val = 9</code> — <b>o.inner.val</b>은?',
      options: ['1 — 중첩된 안쪽 값이라 안전하게 복사된다', '9 — inner 칸의 주소가 복사돼 p와 같은 봉투'],
      answer: 1,
      explain: 'inner 칸엔 안쪽 봉투의 <b>주소표</b> — 꺼내면 주소가 복사돼 p와 o.inner는 <b>같은 봉투</b>다(공유). 반대로 그 안의 <b>원시값 val을 꺼내면</b>(<code>let v = p.val</code>) 그건 <b>값 복사(독립)</b>. 아무리 깊어도 각 칸마다 <b>원시=복사 · 객체=공유</b>만 판정하면 된다.',
    }))

    // ── F 배열 원소 ─────────────────────────────────────────
    root.querySelector('[data-m="qz-f1"]').append(Quiz({
      q: '<code>let arr = [1, 2, 3]; let x = arr[0]; x = 9</code> — <b>arr[0]</b>은?',
      options: ['1 — 원소가 원시라 꺼낼 때 값이 복사된다', '9 — 배열 원소와 이어져 같이 바뀐다'],
      answer: 0,
      explain: '배열도 봉투다 — <code>arr[0]</code> 칸엔 <b>값 1</b>이 들었으니 꺼내면 <b>값 복사</b>. x는 독립 사본이라 <code>x = 9</code> 해도 <b>arr[0]은 1</b>. 규칙: <b>원시=값 복사(독립)</b> — 배열이라고 다르지 않다.',
    }))
    root.querySelector('[data-m="qz-f2"]').append(Quiz({
      q: '<code>let arr = [{ v: 1 }]; let e = arr[0]; e.v = 9</code> — <b>arr[0].v</b>는?',
      options: ['1 — 꺼내면 복사돼 독립', '9 — 원소가 객체라 주소가 복사돼 공유'],
      answer: 1,
      explain: '이번엔 <code>arr[0]</code> 칸에 <b>주소표</b> — 꺼내면 주소가 복사돼 e와 arr[0]은 <b>같은 봉투</b>. <code>e.v = 9</code>가 arr[0].v로도 보인다. 규칙: <b>객체=주소 복사(공유)</b>. F-1과의 차이는 배열이 아니라 <b>원소의 종류</b>다.',
    }))

    // ── G 얕은 복사 ─────────────────────────────────────────
    root.querySelector('[data-m="qz-g1"]').append(Quiz({
      q: '<code>let o = { n: 5, f: { v: 1 } }; let c = { ...o }; c.n = 9</code> — <b>o.n</b>은?',
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
  }
})()
