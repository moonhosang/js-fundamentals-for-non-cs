// 🟡 보통 드릴 — 변형·조합(한 겹 더). 같은 개념을 살짝 다른 맥락에. (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것. 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const N = window.Drills.normal

  // ── 8강 · 객체 : 없는 키 · 중첩 · 배열 안 객체 · 대괄호 · 조합 출력 ──
  N['8'] = {
    pattern: '🟡 보통 · 없는 키·중첩·배열 안 객체·대괄호 — 한 겹 더',
    problems: [
      { label: '없는 키', ask: 'u엔 name만 있다. u.age(없는 이름)를 꺼내면? 빈칸에 age를 넣고 ▶확인', code: 'let u = { name: "민지" }\nprint(u.____)', expect: 'undefined', answer: 'age', hint: '없는 키 = undefined' },
      { label: '중첩', ask: 'me.pet.name이 "콩이"가 되게 안쪽을 채워라.', code: 'let me = { pet: { name: "____" } }\nprint(me.pet.name)', expect: '"콩이"', answer: '콩이', hint: '제일 안쪽 name' },
      { label: '배열 안 객체', ask: '두 번째 사람의 이름(지훈)을 꺼내려면 어떤 속성?', code: 'let users = [{ name: "민지" }, { name: "지훈" }]\nprint(users[1].____)', expect: '"지훈"', answer: 'name', hint: 'users[1].name' },
      { label: '대괄호(공백 키)', ask: '"my key"처럼 공백 있는 이름은 대괄호로! 값 7을 꺼내려면 빈칸에?', code: 'let o = { "my key": 7 }\nprint(o[____])', expect: '7', answer: '"my key"', hint: 'o["my key"]' },
      { label: '속성 조합 출력', ask: '"민지(24)"가 나오게 나이 속성을 꺼내라.', code: 'let p = { name: "민지", age: 24 }\nprint(p.name + "(" + p.____ + ")")', expect: '"민지(24)"', answer: 'age', hint: 'p.age' },
    ],
  }
})()
