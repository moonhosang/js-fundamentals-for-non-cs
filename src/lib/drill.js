// 🎯 동일 유형 5문제 드릴 (순수 JS) — 단계별(stepped) 진행 지원
// 같은 '유형'을 값만 살짝 바꿔 여러 번 반복해 손에 붙인다. (난이도 상승이 아니라 '반복')
// 각 문제는 빈칸(____) 채우기 — 채운 걸 끼워 실제로 실행하고, print 출력이 정답과 같은지 본다.
// stepped:true 면 한 문제를 풀어야 다음 문제가 열린다(단계별 실습).
//
// 쓰는 법:  const node = Drill({ pattern, stepped, problems: [{ ask, code, expect, answer, hint }] })

;(function () {
  const BLANK = '____'

  function fmt(v) {
    if (typeof v === 'string') return '"' + v + '"'
    if (v === undefined) return 'undefined'
    if (v === null) return 'null'
    if (typeof v === 'object') { try { return JSON.stringify(v) } catch { return String(v) } }
    return String(v)
  }
  const normalize = (s) => s.split('\n').map((l) => l.trim()).join('\n').trim()

  function runFilled(code, filled) {
    const out = []
    const print = (...a) => out.push(a.map(fmt).join(' '))
    const box = document.createElement('div')
    const full = code.replace(BLANK, filled)
    const fn = new Function('print', 'box', full)
    fn(print, box)
    return out.join('\n')
  }

  // onSolved(index): 정답을 처음 맞혔을 때 한 번 호출된다(단계 진행용).
  function Problem(p, no, onSolved) {
    const card = document.createElement('div')
    card.className = 'drill'
    let solvedOnce = false

    const ask = document.createElement('div')
    ask.className = 'drill-ask'
    ask.innerHTML = '<span class="drill-no">' + no + '</span>'
    ask.append(document.createTextNode(p.ask))
    card.append(ask)

    const codeLine = document.createElement('div')
    codeLine.className = 'drill-code'
    const [before, after] = p.code.split(BLANK)
    const preSpan = document.createElement('span'); preSpan.className = 'drill-pre'; preSpan.textContent = before
    const input = document.createElement('input')
    input.className = 'drill-input'
    input.placeholder = '여기에 채우기'
    input.spellcheck = false
    const postSpan = document.createElement('span'); postSpan.className = 'drill-post'; postSpan.textContent = after
    codeLine.append(preSpan, input, postSpan)
    card.append(codeLine)

    const row = document.createElement('div')
    row.className = 'button-row'
    const checkBtn = document.createElement('button'); checkBtn.className = 'chip on'; checkBtn.textContent = '확인'
    const ansBtn = document.createElement('button'); ansBtn.className = 'chip'; ansBtn.textContent = '정답'
    row.append(checkBtn, ansBtn)
    if (p.hint) {
      const hint = document.createElement('span'); hint.className = 'drill-hint'; hint.textContent = '💡 ' + p.hint
      row.append(hint)
    }
    card.append(row)

    const feedback = document.createElement('div')
    card.append(feedback)

    // 🧠 예측 → 관찰(시뮬레이션) → 설명: 정답을 맞히면 '왜 그런가'를 메모리 모델로 드러낸다.
    // (스포일러 방지 — 풀기 전엔 숨김. p.mem 이 있는 문제만.)
    const memHost = document.createElement('div')
    memHost.className = 'drill-mem'
    memHost.hidden = true
    card.append(memHost)
    function revealMem() {
      if (!p.mem || memHost.dataset.shown || typeof MemoryModel !== 'function') return
      memHost.dataset.shown = '1'
      memHost.hidden = false
      const label = document.createElement('div')
      label.className = 'file-label'
      label.textContent = '🧠 왜 그런가 — 메모리에서 확인 (이름표 장부 │ 값 메모리)'
      memHost.append(label)
      try { memHost.append(MemoryModel(p.mem)) } catch {}
    }

    function check() {
      feedback.className = ''
      input.classList.remove('ok', 'bad')
      if (!input.value.trim()) return
      let got, error = null
      try { got = runFilled(p.code, input.value) } catch (e) { error = (e && e.message) || String(e) }
      if (error) {
        feedback.className = 'drill-feedback bad'
        feedback.textContent = '⚠️ 에러: ' + error
        input.classList.add('bad')
      } else if (normalize(got) === normalize(p.expect)) {
        feedback.className = 'drill-feedback ok'
        feedback.textContent = '✅ 정답! 출력 → ' + got.replace(/\n/g, ' / ')
        input.classList.add('ok')
        card.classList.add('solved')
        revealMem()
        if (!solvedOnce) { solvedOnce = true; if (onSolved) onSolved() }
      } else {
        feedback.className = 'drill-feedback bad'
        feedback.textContent = '❌ 아직이에요. 내 출력 → ' + (got.replace(/\n/g, ' / ') || '(없음)') +
          ' · 기대 → ' + p.expect.replace(/\n/g, ' / ')
        input.classList.add('bad')
        card.classList.remove('solved')
      }
    }

    checkBtn.onclick = check
    input.addEventListener('input', () => { input.classList.remove('ok', 'bad'); feedback.className = ''; feedback.textContent = '' })
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check() })
    ansBtn.onclick = () => {
      input.value = p.answer
      feedback.className = 'drill-answer'
      // 정답 + '왜 그런가' 설명(explain, 없으면 hint) + (필요 시) 개념 다시 보기·위키 링크
      let html = '정답 예시: <code>' + p.answer.replace(/</g, '&lt;') + '</code>'
      const why = p.explain || p.hint
      if (why) html += '<div class="drill-explain">💡 ' + why + '</div>'
      const links = []
      if (p.see) links.push('<a class="drill-link" data-see="' + p.see + '" role="button" tabindex="0">📖 개념 다시 보기</a>')
      if (p.wiki && p.wiki.url) links.push('<a class="drill-link" href="' + p.wiki.url + '" target="_blank" rel="noopener noreferrer">📚 ' + (p.wiki.label || '위키') + ' ↗</a>')
      if (links.length) html += '<div class="drill-links">' + links.join('') + '</div>'
      feedback.innerHTML = html
      const seeLink = feedback.querySelector('[data-see]')
      if (seeLink) {
        const go = () => { const t = seeLink.getAttribute('data-see'); const id = /^\d+$/.test(t) ? Number(t) : t; if (window.goLesson) window.goLesson(id); else location.hash = '#' + id }
        seeLink.onclick = go
        seeLink.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go() } })
      }
      revealMem() // 포기하고 정답을 봐도 메모리 증명(있으면)을 함께 드러낸다
    }

    card._focus = () => { try { input.focus() } catch {} }
    return card
  }

  window.Drill = function Drill(opts) {
    const { pattern, problems = [], stepped = false, hideHead = false, onSolved: onSolvedCb } = opts || {}
    const root = document.createElement('div')
    root.className = 'drill-set'

    if (!hideHead) {
      const head = document.createElement('div')
      head.className = 'drill-set-head'
      const badge = document.createElement('span')
      badge.className = 'practice-badge'
      badge.textContent = '🎯 유형 드릴 · ' + problems.length + '문제'
      head.append(badge)
      if (pattern) {
        const pat = document.createElement('p')
        pat.className = 'drill-pattern'
        pat.textContent = pattern
        head.append(pat)
      }
      root.append(head)
    }

    // 단계 표시(●○) — stepped일 때만.
    let dots, counter, done
    if (stepped) {
      const bar = document.createElement('div')
      bar.className = 'drill-steps'
      dots = document.createElement('div')
      dots.className = 'drill-dots'
      problems.forEach(() => { const d = document.createElement('span'); d.className = 'drill-dot'; dots.append(d) })
      counter = document.createElement('span')
      counter.className = 'drill-counter'
      bar.append(dots, counter)
      root.append(bar)
    }

    let current = 0
    const solved = new Set()
    const cards = problems.map((p, i) => Problem(p, i + 1, () => onSolved(i)))
    cards.forEach((c, i) => { root.append(c); if (stepped && i > 0) c.hidden = true })

    if (stepped) {
      done = document.createElement('div')
      done.className = 'drill-done'
      done.hidden = true
      done.innerHTML = '🎉 실습 완료! 5문제를 모두 풀었어요. 왼쪽 목차에서 ✏️ 연습에 체크하세요.'
      root.append(done)
      updateSteps()
    }

    function updateSteps() {
      if (!stepped) return
      ;[...dots.children].forEach((d, i) => {
        d.className = 'drill-dot' + (solved.has(i) ? ' done' : (i === current ? ' current' : ''))
      })
      counter.textContent = `${solved.size} / ${problems.length}`
    }

    function onSolved(i) {
      solved.add(i)
      if (onSolvedCb) onSolvedCb(i)
      if (stepped) {
        if (i === current && current < problems.length - 1) {
          current++
          cards[current].hidden = false
          try { cards[current].scrollIntoView({ block: 'nearest' }) } catch {}
          cards[current]._focus && cards[current]._focus()
        }
        if (solved.size === problems.length) done.hidden = false
        updateSteps()
      }
    }

    return root
  }
})()
