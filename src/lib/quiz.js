// 🔮 Quiz — 예측(prediction) 미니 퀴즈. 개념 '직전'에 던져 인출·마찰을 유도한다(design-principles §5).
// 객관식: 찍는 순간이 retrieval. 클릭 → 즉시 ✅/❌ + 해설. Drill(빈칸 타이핑)과 역할이 다르다(퀴즈=방아쇠, 드릴=숙달).
;(function () {
  // config: { q(질문 HTML), options:[HTML…], answer:정답 인덱스, explain(해설 HTML) }
  window.Quiz = function (config) {
    const el = document.createElement('div')
    el.className = 'quiz'
    const q = document.createElement('div')
    q.className = 'quiz-q'
    q.innerHTML = '🔮 <b>예측</b> — ' + config.q
    el.append(q)
    const opts = document.createElement('div')
    opts.className = 'quiz-opts'
    let done = false
    ;(config.options || []).forEach((opt, i) => {
      const b = document.createElement('button')
      b.className = 'quiz-opt'
      b.type = 'button'
      b.innerHTML = opt
      b.onclick = () => {
        if (done) return
        done = true
        const correct = i === config.answer
        opts.querySelectorAll('.quiz-opt').forEach((x) => x.classList.add('answered'))
        b.classList.add(correct ? 'ok' : 'no')
        const right = opts.children[config.answer]
        if (right) right.classList.add('ok') // 정답 항상 표시
        const ex = document.createElement('div')
        ex.className = 'quiz-explain'
        ex.innerHTML = (correct ? '✅ <b>정답!</b> ' : '❌ <b>아쉬워요.</b> ') + (config.explain || '')
        el.append(ex)
      }
      opts.append(b)
    })
    el.append(opts)
    return el
  }
})()
