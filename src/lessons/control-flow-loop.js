// 🔀 제어 흐름 · 조합과 중첩 (loop 쪽: 반복 × 조건 · 중첩 반복)
// cf-3(for 안의 if · 목록 거르기) · cf-4(for 안의 for · 격자·구구단). 인라인 드릴(계약테스트 무손상).
;(function () {
  window.Lessons = window.Lessons || {}
  const wireNav = (root) => root.querySelectorAll('[data-goto]').forEach((el) => {
    el.onclick = () => { const v = el.getAttribute('data-goto'); window.goLesson ? window.goLesson(/^\d+$/.test(v) ? Number(v) : v) : (location.hash = '#' + v) }
  })

  // ── FABLE-B: 아래에 window.Lessons['cf-3'](반복 × 조건)·['cf-4'](중첩 반복) 추가 ──
  void wireNav // (Fable가 render에서 사용)
})()
