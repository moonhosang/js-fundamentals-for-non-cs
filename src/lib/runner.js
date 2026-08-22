// 🔬 라이브 JS 실행기 (순수 JS · 빌드 없음)
// 코드 결과를 두 가지로 동시에 — ① print(...) 로 '값'을, ② box 로 '화면(DOM)'을.
// '눈으로 보는' 시각 강점을 살려 값-중심/화면-중심을 균형 있게 익힌다.
//
// 쓰는 법:  const node = Runner({ code, editable, showBox, autorun, rows })
//           container.append(node)
// expectError (repair drill / error-first): 이 코드는 '에러가 정답'이다.
//   문자열(에러 메시지에 포함될 조각, 예 'Cannot read properties') 또는 true(아무 에러나).
//   처음 ▶: 예상 에러 → 🎯(expected, 아직 통과 아님). 고쳐서 에러가 사라지면 → ✅(pass). 다른 에러 → ⚠️(mismatch).
//   expectError면 정답-주석 마스킹을 끈다(주석이 '정답 값'이 아니라 '고치는 법 지시'라서).

;(function () {
  // 값을 사람이 읽기 좋은 글자로. 문자열은 따옴표로 감싸 숫자 5와 글자 "5"를 구분한다.
  function fmt(v) {
    if (typeof v === 'string') return '"' + v + '"'
    if (typeof v === 'function') return '(함수)'
    if (v === undefined) return 'undefined'
    if (v === null) return 'null'
    if (typeof v === 'object') {
      try { return JSON.stringify(v) } catch { return String(v) }
    }
    return String(v)
  }

  // print(...) 줄 끝의 결과 주석(정답 스포일러)만 가린다. 단독 설명 주석(// …)·URL은 그대로.
  function maskResults(src) {
    return String(src).split('\n').map((line) =>
      /\bprint\s*\(/.test(line) && !/:\/\//.test(line)
        ? line.replace(/\s*\/\/.*$/, '   // ?')
        : line
    ).join('\n')
  }

  window.Runner = function Runner(opts) {
    // autorun 기본 false — 커리큘럼 철학이 '읽고 → 눌러 보고'라, 학습자가 직접 ▶실행을 눌러
    // 결과를 확인하게 한다(자동 실행은 결과를 미리 보여줘 '예측→실행' 경험을 없앤다).
    const { code = '', editable = true, showBox = true, autorun = false, rows, expectError = null } = opts || {}

    const root = document.createElement('div')
    root.className = 'runner'

    // 정답(결과) 주석 가리기 — print 줄 끝 결과는 스포일러라 기본 '// ?'로 가림. 💡로 펼침.
    // expectError(repair drill)일 땐 마스킹 안 함 — 주석이 '정답'이 아니라 '고치는 법 지시'라 가리면 안 된다.
    const masked = expectError ? code : maskResults(code)
    const hasSpoiler = masked !== code
    let revealed = false
    let hintBtn = null

    // 편집창(또는 고정 코드)
    let getCode, setDisplay
    if (editable) {
      const ta = document.createElement('textarea')
      ta.className = 'runner-code'
      ta.value = hasSpoiler ? masked : code
      ta.spellcheck = false
      ta.rows = rows || Math.max(3, code.split('\n').length)
      root.append(ta)
      getCode = () => ta.value
      setDisplay = () => { ta.value = revealed || !hasSpoiler ? code : masked }
      root._reset = () => { revealed = false; setDisplay(); if (hintBtn) hintBtn.textContent = '💡 정답 보기' }
    } else {
      const pre = document.createElement('pre')
      pre.className = 'runner-code runner-code-static'
      pre.textContent = hasSpoiler ? masked : code
      root.append(pre)
      getCode = () => code
      setDisplay = () => { pre.textContent = revealed || !hasSpoiler ? code : masked }
    }

    // 버튼
    const btns = document.createElement('div')
    btns.className = 'button-row'
    btns.style.marginTop = '8px'
    const runBtn = document.createElement('button')
    runBtn.className = 'chip on'
    runBtn.textContent = '▶ 실행'
    btns.append(runBtn)
    if (hasSpoiler) {
      hintBtn = document.createElement('button')
      hintBtn.className = 'chip'
      hintBtn.textContent = '💡 정답 보기'
      hintBtn.title = '실행 결과(정답)를 코드에 다시 보여줘요'
      hintBtn.onclick = () => { revealed = !revealed; hintBtn.textContent = revealed ? '🙈 정답 가리기' : '💡 정답 보기'; setDisplay() }
      btns.append(hintBtn)
    }
    if (editable) {
      const resetBtn = document.createElement('button')
      resetBtn.className = 'chip'
      resetBtn.textContent = '↺ 처음으로'
      resetBtn.onclick = () => { root._reset(); clearBox(); renderConsole([], null, false) }
      btns.append(resetBtn)
    }
    root.append(btns)

    // 출력 영역
    const out = document.createElement('div')
    out.className = 'runner-out' + (showBox ? ' with-box' : '')
    const consoleWrap = document.createElement('div')
    consoleWrap.className = 'runner-console'
    const consoleLabel = document.createElement('div')
    consoleLabel.className = 'runner-out-label'
    consoleLabel.textContent = '🖨️ 값 (print)'
    const consoleBody = document.createElement('div')
    consoleWrap.append(consoleLabel, consoleBody)
    out.append(consoleWrap)

    let box = null
    if (showBox) {
      const boxWrap = document.createElement('div')
      boxWrap.className = 'runner-boxwrap'
      const boxLabel = document.createElement('div')
      boxLabel.className = 'runner-out-label'
      boxLabel.textContent = '🖼️ 화면 (box)'
      box = document.createElement('div')
      box.className = 'runner-box'
      boxWrap.append(boxLabel, box)
      out.append(boxWrap)
    }
    root.append(out)

    function clearBox() {
      if (box) { box.innerHTML = ''; box.removeAttribute('style'); box.className = 'runner-box' }
    }

    function renderConsole(logs, error, ran, verdict) {
      consoleBody.innerHTML = ''
      if (verdict) {
        const v = document.createElement('div')
        v.className = 'runner-verdict ' + verdict.kind
        v.textContent = verdict.text
        consoleBody.append(v)
      }
      // print로 찍힌 값은 에러가 나도 '멈추기 직전까지' 보여준다 — 크래시 전 로그가 단서다.
      logs.forEach((l) => {
        const line = document.createElement('div')
        line.className = 'runner-line'
        line.textContent = l
        consoleBody.append(line)
      })
      if (error) {
        const pre = document.createElement('pre')
        pre.className = 'runner-error'
        pre.textContent = '⚠️ ' + error
        consoleBody.append(pre)
      } else if (!logs.length && !verdict) {
        const empty = document.createElement('div')
        empty.className = 'runner-empty'
        empty.textContent = ran ? '(print로 찍은 값이 없어요)' : '▶ 실행을 눌러 보세요'
        consoleBody.append(empty)
      }
    }

    // 늦게 오는(비동기) print를 콘솔에 라이브로 덧붙인다 — setTimeout·Promise 출력이 진짜로 뜨게.
    function appendLine(s) {
      const empty = consoleBody.querySelector('.runner-empty')
      if (empty) empty.remove()
      const line = document.createElement('div')
      line.className = 'runner-line'
      line.textContent = s
      consoleBody.append(line)
    }

    function run() {
      const logs = []
      let rendered = false
      // 동기 print는 logs에 모아 renderConsole이 그리고, 렌더 이후(비동기) print는 라이브로 덧붙인다.
      const print = (...args) => { const s = args.map(fmt).join(' '); logs.push(s); if (rendered) appendLine(s) }
      clearBox()
      let error = null
      try {
        // 문자열 코드를 진짜 함수로 만들어 실행한다. print·box를 재료로 넘긴다.
        const fn = new Function('print', 'box', getCode())
        fn(print, box)
      } catch (e) {
        error = (e && e.message) || String(e)
      }
      // repair drill 판정 — '에러가 정답'인 코드. 처음엔 예상 에러(🎯), 고쳐서 에러가 사라지면 통과(✅).
      let verdict = null
      if (expectError) {
        if (!error) {
          verdict = { kind: 'pass', text: '✅ 통과! 에러를 고쳤습니다.' }
        } else if (expectError === true || error.indexOf(expectError) !== -1) {
          verdict = { kind: 'expected', text: '🎯 예상대로 바로 그 에러가 났어요 — 이제 코드를 고쳐 통과(✅)시켜 보세요.' }
        } else {
          verdict = { kind: 'mismatch', text: '⚠️ 예상과 다른 에러예요. 기대한 것: "' + expectError + '"' }
        }
      }
      renderConsole(logs, error, true, verdict)
      rendered = true // 이후 도착하는(비동기) print는 appendLine으로 라이브 표시
    }

    runBtn.onclick = run
    renderConsole([], null, false)
    if (autorun) run()

    return root
  }
})()
