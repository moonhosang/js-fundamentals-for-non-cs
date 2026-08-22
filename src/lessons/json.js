// 📦 JSON — 객체를 '문자열'로 (저장·전송의 형태)
// 8강 객체 + 2강 문자열 위에 얹는 응용. 서버 통신·localStorage의 실전 형태.
//
// 오해: JSON은 자바스크립트 객체다 (객체를 그대로 저장/전송하면 된다)
// 왜:   JSON은 객체가 아니라 '문자열' — 저장·전송은 글자로만 가능해서 객체↔문자열 왕복이 필요
// 대비: 객체 { }(메모리 속 값·힙) vs JSON 문자열 "{ }"(그냥 글자) · stringify=객체→글자, parse=글자→객체

;(function () {
  window.Lessons = window.Lessons || {}

  function wireGoto(root) {
    root.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const id = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(id) : (location.hash = '#' + id) }
    })
  }

  window.Lessons['json'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">📦 데이터</span>
        <h2>JSON — 객체를 <b>문자열</b>로</h2>
        <p>서버에 보내거나 <code>localStorage</code>에 저장할 땐 <b>객체를 그대로 못 보낸다</b> — <b>글자(문자열)</b>로만 오간다.
        객체 ↔ 문자열을 오가는 표준 형식이 <b>JSON</b>이다. <code>fetch</code>·저장·API 어디에나 나온다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 관통 진실 — 이 강의의 모든 정답 근거</span>
        <p><b>JSON은 객체가 아니라 "문자열"이다.</b> <code>JSON.stringify(객체)</code> = 객체 → <b>글자</b>(보내기·저장), <code>JSON.parse(문자열)</code> = 글자 → <b>객체</b>(받아서 쓰기).
        저장·전송은 <b>글자만</b> 가능하므로 이 <b>왕복</b>이 필요하다. 왕복하면 <b>완전히 새 객체</b>가 생긴다(깊은 복사) — 흐릿하면 → <button class="inline-goto" data-goto="spread">🧠 스프레드(얕은 복사)</button></p>
      </div>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">⚠️ 오해 — "객체를 그냥 저장/전송하면 된다"</div>
        <p class="section-desc" style="margin:0"><b>안 된다.</b> 객체는 <b>메모리(힙) 속 값</b>이라 그 상태로는 파일·네트워크로 못 나간다 — 나가는 건 <b>글자(bytes)</b>뿐. 그래서 <b>객체를 글자로 직렬화(stringify)</b>해 보내고, 받는 쪽에서 <b>글자를 객체로 역직렬화(parse)</b>한다. <code>localStorage.setItem("u", user)</code>가 <code>"[object Object]"</code>라는 엉뚱한 글자를 저장하는 사고가 이걸 몰라 난다.</p>
      </div>

      <h3 class="section-title">① <code>JSON.stringify</code> — 객체를 글자로</h3>
      <span class="learn-tag">📎 결과는 <b>문자열</b>(typeof "string") — 겉보기는 객체 같아도 글자다. 키가 큰따옴표로 감싸진다</span>
      <div class="card"><div class="file-label">🔬 직접 실행</div><div data-m="stringify"></div></div>

      <h3 class="section-title">② <code>JSON.parse</code> — 글자를 객체로</h3>
      <span class="learn-tag">📎 문자열을 다시 객체로 → 점(.)으로 꺼내 쓸 수 있다. 형식이 틀리면 에러(그래서 try/catch)</span>
      <div class="card"><div class="file-label">🔬 직접 실행</div><div data-m="parse"></div></div>

      <h3 class="section-title">③ 왕복 = 깊은 복사 (스프레드와 대비)</h3>
      <span class="learn-tag">📎 stringify→parse 하면 중첩까지 <b>전부 새 객체</b> — 스프레드(얕은 복사)가 못 끊던 중첩 공유를 끊는다</span>
      <div data-m="mem"></div>

      <h3 class="section-title">④ 함정 — 함수·undefined는 사라진다</h3>
      <span class="learn-tag">📎 JSON은 '데이터'만 담는다 — 함수·undefined는 stringify에서 조용히 빠진다(값이 아닌 것들)</span>
      <div class="card"><div class="file-label">🔬 무엇이 사라지나</div><div data-m="trap"></div></div>
      <div data-m="qz"></div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0"><b>JSON = 객체의 문자열 표현.</b> <code>stringify</code>(객체→글자, 저장·전송) ↔ <code>parse</code>(글자→객체, 받아 쓰기).
        왕복하면 <b>깊은 복사</b>된 새 객체(중첩까지 독립). 단 <b>함수·undefined는 빠진다</b>(데이터만). parse는 형식 틀리면 에러 → <code>try/catch</code>로 감싼다.</p>
      </div>

      <h3 class="section-title">⑤ 🎯 예측 드릴 — 손에 붙이자</h3>
      <p class="section-desc">매 문제, <b>결과가 문자열이냐 객체냐</b>부터 판정하라. 사이드바 이 강의 아래 <b>쉬움·보통·어려움</b> 3단계:</p>
      <div class="practice-cta"><span>예측 드릴 —</span><button class="chip on" data-goto="json:easy">🟢 쉬움</button><button class="chip on" data-goto="json:normal">🟡 보통</button><button class="chip on" data-goto="json:hard">🔴 어려움</button></div>

      <div class="practice-cta"><span>parse 실패에 대비하려면 —</span><button class="chip on" data-goto="errors">🛟 에러 처리(try/catch) →</button></div>
    `

    root.querySelector('[data-m="stringify"]').append(Runner({ showBox: false, code: [
      'let user = { name: "민지", age: 20, vip: true }',
      '',
      'let text = JSON.stringify(user)',
      'print(text)              // {"name":"민지","age":20,"vip":true}  ← 글자!',
      'print(typeof text)       // "string"  ← 객체가 아니라 문자열',
      '',
      'print(user.name)         // "민지"   (객체는 점으로)',
      '// text.name 은? → undefined (text는 글자라 속성이 없다)',
    ].join('\n') }))

    root.querySelector('[data-m="parse"]').append(Runner({ showBox: false, code: [
      'let text = \'{"name":"민지","age":20}\'   // 서버에서 온 글자',
      '',
      'let obj = JSON.parse(text)',
      'print(typeof obj)        // "object"  ← 이제 진짜 객체',
      'print(obj.name)          // "민지"   (점으로 꺼내 쓴다)',
      'print(obj.age + 1)       // 21       (숫자로 복원됨)',
    ].join('\n') }))

    root.querySelector('[data-m="mem"]').append(MemoryModel({
      title: 'JSON 왕복 = 깊은 복사 — 중첩까지 새 봉투(스프레드가 못 끊던 공유를 끊는다)',
      stackLabel: '📇 이름표 장부',
      code: ['let o = { best: { n: "효니" } }', 'let c = JSON.parse(JSON.stringify(o))', 'c.best.n = "보리"   // 중첩을 바꿔도?'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'o', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'n', value: '"효니"' }] } }, note: 'o 봉투 h1 → best는 <b>중첩 봉투 h2</b>를 가리킨다.', engine: 'h1·h2 두 힙 객체. best 필드는 h2 포인터.' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'o', ref: 'h1' }, { name: 'c', ref: 'h3' }] }], heap: { h1: { fields: [{ key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'n', value: '"효니"' }] }, h3: { fields: [{ key: 'best', ref: 'h4' }] }, h4: { fields: [{ key: 'n', value: '"효니"' }] } }, note: '<b>stringify→parse</b>: 객체를 글자로 폈다가 다시 읽으면 — <b>완전히 새 봉투 h3</b>, 그 안 중첩도 <b>새 h4</b>. 원본 어디와도 공유 없음(깊은 복사). ← 스프레드는 h2를 공유했다(얕은 복사).', engine: 'parse가 문자열을 순회하며 새 객체 그래프를 처음부터 만든다 — 원본 참조를 재사용하지 않는다.' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'o', ref: 'h1' }, { name: 'c', ref: 'h3' }] }], heap: { h1: { fields: [{ key: 'best', ref: 'h2' }] }, h2: { fields: [{ key: 'n', value: '"효니"' }] }, h3: { fields: [{ key: 'best', ref: 'h4' }] }, h4: { fields: [{ key: 'n', value: '"보리"', bad: true }] } }, note: '<code>c.best.n = "보리"</code> → <b>h4만</b> 바뀐다. <b>o.best.n은 "효니" 그대로</b> — 중첩까지 별개라 안 샌다. (스프레드였다면 공유돼 샜다!)', engine: 'h4 수정 — h2는 무관. 완전 독립 그래프.' },
      ],
    }))

    root.querySelector('[data-m="trap"]').append(Runner({ showBox: false, code: [
      'let data = {',
      '  name: "민지",',
      '  greet: function () { return "안녕" },  // 함수',
      '  nickname: undefined,                    // undefined',
      '  age: 20,',
      '}',
      '',
      'let text = JSON.stringify(data)',
      'print(text)   // {"name":"민지","age":20}  ← 함수·undefined는 빠졌다!',
      '',
      '// JSON은 "데이터"만 담는다 — 함수·undefined는 값으로 안 본다',
    ].join('\n') }))

    root.querySelector('[data-m="qz"]').append(Quiz({
      q: 'JSON 왕복으로 만든 사본의 중첩을 바꾸면 원본은?<pre class="err-code" style="color:inherit;background:transparent">let o = { inner: { v: 1 } }\nlet c = JSON.parse(JSON.stringify(o))\nc.inner.v = 9</pre>',
      options: ['1 — JSON 왕복은 <b>깊은 복사</b>라 중첩까지 새 객체(독립)', '9 — 얕은 복사라 중첩은 공유된다', '에러 — 중첩 객체는 JSON이 안 된다'],
      answer: 0,
      explain: '<code>JSON.parse(JSON.stringify(o))</code>는 <b>깊은 복사</b> — 글자로 폈다 다시 읽으며 중첩까지 <b>전부 새 객체</b>를 만든다. c.inner와 o.inner는 <b>다른 봉투</b>라 <code>c.inner.v=9</code>는 <b>o.inner.v를 안 건드린다</b>(1 그대로). 스프레드 <code>{...o}</code>는 얕은 복사라 중첩을 공유했다 — 그 차이를 JSON이 메운다. (단 함수·undefined는 왕복에서 사라진다.)',
    }))

    wireGoto(root)
  }
})()
