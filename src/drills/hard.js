// 🔴 어려움 드릴 — 응용·전이(경계·함정·다개념 결합). (ADR 0008)
// 규범: 문제에 답을 노출하지 말 것. 진짜 도는 코드. 계약 테스트(test/drills.html)로 채점.
;(function () {
  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }
  const H = window.Drills.hard

  // ── 8강 · 객체 : 메서드 · 키 개수 · 깊은 중첩 · reduce 합산 · 조건 결합 ──
  H['8'] = {
    pattern: '🔴 어려움 · 메서드·깊은 중첩·reduce·조건 결합 — 응용',
    problems: [
      { label: '메서드', ask: 'dog의 bark 메서드를 불러 "멍"이 나오게 — 빈칸에 메서드 이름?', code: 'let dog = { bark: function () { return "멍" } }\nprint(dog.____())', expect: '"멍"', answer: 'bark', hint: 'dog.bark()' },
      { label: '키 개수', ask: '객체의 이름(키) 개수 2를 구하려면? (Object.keys의 무엇?)', code: 'let o = { a: 1, b: 2 }\nprint(Object.keys(o).____)', expect: '2', answer: 'length', hint: '.length' },
      { label: '깊은 중첩', ask: 'data 안 첫 사람의 펫 이름("콩이")까지 닿으려면 마지막 칸에?', code: 'let data = { users: [{ pet: { name: "콩이" } }] }\nprint(data.users[0].pet.____)', expect: '"콩이"', answer: 'name', hint: 'data.users[0].pet.name' },
      { label: '나이 합(reduce)', ask: '사람들의 나이 합(54)이 나오게 — 각 사람의 무엇을 더할까?', code: 'let ppl = [{ age: 24 }, { age: 30 }]\nprint(ppl.reduce((s, p) => s + p.____, 0))', expect: '54', answer: 'age', hint: 's + p.age' },
      { label: '조건 결합', ask: 'vip면 이름 뒤에 별이 붙어 "민지⭐"가 나오게 — vip가 참일 때 값?', code: 'let p = { name: "민지", vip: true }\nprint(p.name + (p.vip ? "____" : ""))', expect: '"민지⭐"', answer: '⭐', hint: 'true면 "⭐"' },
    ],
  }
})()
