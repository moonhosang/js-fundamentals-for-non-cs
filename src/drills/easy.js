// 🟢 쉬움 드릴 — 동일 유형 반복(automaticity). 값만 바꿔 손에 붙인다. (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것(목표 결과만). 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const E = window.Drills.easy

  // ── 8강 · 객체 : 만들고 · 점으로 꺼내고 · 바꾸고 · 추가하기 ──
  E['8'] = {
    pattern: '🟢 쉬움 · 객체를 만들고 점(.)으로 꺼내기 — 값만 바꿔 반복',
    problems: [
      { label: '만들기', ask: 'p.name이 "민지"가 되게 값을 채워라.', code: 'let p = { name: "____" }\nprint(p.name)', expect: '"민지"', answer: '민지', hint: '따옴표 안에 민지' },
      { label: '점으로 꺼내기', ask: 'u의 나이(24)를 꺼내려면 어떤 이름?', code: 'let u = { age: 24 }\nprint(u.____)', expect: '24', answer: 'age', hint: 'u.age' },
      { label: '다른 속성 꺼내기', ask: 'car의 브랜드("기아")를 꺼내려면 어떤 이름?', code: 'let car = { brand: "기아", year: 2020 }\nprint(car.____)', expect: '"기아"', answer: 'brand', hint: 'car.brand' },
      { label: '값 바꾸기', ask: 'u.hp를 50으로 바꿔 출력되게.', code: 'let u = { hp: 100 }\nu.hp = ____\nprint(u.hp)', expect: '50', answer: '50', hint: 'u.hp = 50' },
      { label: '속성 추가', ask: 'o에 color를 "빨강"으로 추가해 출력되게.', code: 'let o = {}\no.color = "____"\nprint(o.color)', expect: '"빨강"', answer: '빨강', hint: '따옴표 안에 빨강' },
    ],
  }
})()
