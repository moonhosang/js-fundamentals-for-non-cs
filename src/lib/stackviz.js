// 🃏 <StackViz> — 스택 LIFO 놀이터. 접시가 층층이 쌓이고(push, 위로) 맨 위부터 나간다(pop).
// 입문자가 "마지막에 넣은 게 먼저 나온다(Last In First Out)"를 손으로 느끼게.
// 쓰는 법:  container.append(StackViz())

;(function () {
  window.StackViz = function (opts) {
    opts = opts || {}
    const labels = opts.labels || ['접시 A', '접시 B', '접시 C', '접시 D', '접시 E', '접시 F', '접시 G']
    let stack = (opts.initial || ['접시 A', '접시 B', '접시 C']).slice()
    let next = stack.length

    const root = document.createElement('div')
    root.className = 'sv'
    root.innerHTML = `
      <div class="sv-controls">
        <button class="chip on" data-push>⬇ push — 위에 쌓기</button>
        <button class="chip" data-pop>⬆ pop — 위에서 빼기</button>
        <span class="sv-note"></span>
      </div>
      <div class="sv-pile">
        <div class="sv-top-tag">👆 맨 위 — 넣고(push)·빼는(pop) 곳</div>
        <div class="sv-stage"></div>
        <div class="sv-floor">▬▬ 스택 바닥 ▬▬</div>
      </div>
      <div class="sv-cap"></div>
    `
    const stage = root.querySelector('.sv-stage')
    const cap = root.querySelector('.sv-cap')
    const note = root.querySelector('.sv-note')

    function render(enterTop) {
      stage.innerHTML = ''
      if (!stack.length) {
        stage.innerHTML = '<div class="sv-empty">(비어 있음 — ⬇ push로 접시를 쌓아 보라)</div>'
      } else {
        const top = stack.length - 1
        for (let i = top; i >= 0; i--) { // 맨 위(top)가 화면 위로
          const b = document.createElement('div')
          b.className = 'sv-plate' + (i === top ? ' top' : '') + (enterTop && i === top ? ' enter' : '')
          b.innerHTML = `<span class="sv-lab">${stack[i]}</span>` +
            (i === top ? '<span class="sv-flag">👆 다음 나감</span>' : `<span class="sv-idx">#${i}</span>`)
          stage.append(b)
        }
      }
      cap.textContent = `쌓인 접시 ${stack.length}개 · 맨 위부터 나간다 (LIFO)`
    }

    root.querySelector('[data-push]').onclick = () => {
      const lab = labels[next % labels.length]; next++
      stack.push(lab)
      render(true)
      note.textContent = `${lab} 를 맨 위에 얹었다 (push).`
    }
    root.querySelector('[data-pop]').onclick = () => {
      if (!stack.length) { note.textContent = '비어서 뺄 게 없다.'; return }
      const lab = stack[stack.length - 1]
      const topEl = stage.querySelector('.sv-plate.top')
      if (topEl) {
        topEl.classList.add('leaving')
        setTimeout(() => { stack.pop(); render() }, 230)
      } else { stack.pop(); render() }
      note.textContent = `맨 위 ${lab} 가 먼저 나온다 (pop) — 마지막에 넣은 게 먼저!`
    }

    render()
    return root
  }
})()
