// 🔬 라이브 JS 실행기 (순수 JS · 빌드 없음)
// 코드 결과를 두 가지로 동시에 — ① print(...) 로 '값'을, ② box 로 '화면(DOM)'을.
// '눈으로 보는' 시각 강점을 살려 값-중심/화면-중심을 균형 있게 익힌다.
//
// 쓰는 법:  const node = Runner({ code, editable, showBox, autorun, rows })
//           container.append(node)

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

  window.Runner = function Runner(opts) {
    // autorun 기본 false — 커리큘럼 철학이 '읽고 → 눌러 보고'라, 학습자가 직접 ▶실행을 눌러
    // 결과를 확인하게 한다(자동 실행은 결과를 미리 보여줘 '예측→실행' 경험을 없앤다).
    const { code = '', editable = true, showBox = true, autorun = false, rows } = opts || {}

    const root = document.createElement('div')
    root.className = 'runner'

    // 편집창(또는 고정 코드)
    let getCode
    if (editable) {
      const ta = document.createElement('textarea')
      ta.className = 'runner-code'
      ta.value = code
      ta.spellcheck = false
      ta.rows = rows || Math.max(3, code.split('\n').length)
      root.append(ta)
      getCode = () => ta.value
      root._reset = () => { ta.value = code }
    } else {
      const pre = document.createElement('pre')
      pre.className = 'runner-code runner-code-static'
      pre.textContent = code
      root.append(pre)
      getCode = () => code
    }

    // 버튼
    const btns = document.createElement('div')
    btns.className = 'button-row'
    btns.style.marginTop = '8px'
    const runBtn = document.createElement('button')
    runBtn.className = 'chip on'
    runBtn.textContent = '▶ 실행'
    btns.append(runBtn)
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

    function renderConsole(logs, error, ran) {
      consoleBody.innerHTML = ''
      if (error) {
        const pre = document.createElement('pre')
        pre.className = 'runner-error'
        pre.textContent = '⚠️ ' + error
        consoleBody.append(pre)
      } else if (logs.length) {
        logs.forEach((l) => {
          const line = document.createElement('div')
          line.className = 'runner-line'
          line.textContent = l
          consoleBody.append(line)
        })
      } else {
        const empty = document.createElement('div')
        empty.className = 'runner-empty'
        empty.textContent = ran ? '(print로 찍은 값이 없어요)' : '▶ 실행을 눌러 보세요'
        consoleBody.append(empty)
      }
    }

    function run() {
      const logs = []
      const print = (...args) => logs.push(args.map(fmt).join(' '))
      clearBox()
      let error = null
      try {
        // 문자열 코드를 진짜 함수로 만들어 실행한다. print·box를 재료로 넘긴다.
        const fn = new Function('print', 'box', getCode())
        fn(print, box)
      } catch (e) {
        error = (e && e.message) || String(e)
      }
      renderConsole(logs, error, true)
    }

    runBtn.onclick = run
    renderConsole([], null, false)
    if (autorun) run()

    return root
  }
})()
