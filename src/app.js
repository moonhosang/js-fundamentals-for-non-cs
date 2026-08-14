// 앱 껍데기 — 커리큘럼 목차 · 사이드바 · 해시 라우팅 · 진도 체크 (순수 JS, 빌드 없음)
// 레슨 내용은 window.Lessons[id] 의 render 함수가 그린다. 여긴 '틀'만 담당.

;(function () {
  // ── 커리큘럼 ──────────────────────────────────────────────
  // 완성된 강의는 window.Lessons[id] 에 render가 등록돼 있다(변수 강의처럼).
  // 없으면 plan(계획)만 있는 '준비 중' 자리로 나온다.
  // 개념 강의(진도). 완성되면 window.Lessons[id] 에 render가 등록된다.
  const LESSONS = [
    { id: 1, name: '값과 타입, 변수', subtitle: '값 · 타입(원시/객체) · 이름표' },
    // 🧠 메모리 기초 (개념 + 실습 드릴 — Practices['ram'] 등). 콜스택·클로저는 함수 필요 → 심화로.
    { id: 'ram', badge: '🧠 M1', title: 'M1 · 메모리(Memory)', subtitle: '값이 사는 공간 · 주소 · 휘발성 (주로 RAM)' },
    { id: 'stack', badge: '🧠 M2', title: 'M2 · 스택', subtitle: '슬롯 · LIFO · push/pop' },
    { id: 'heap', badge: '🧠 M3', title: 'M3 · 힙', subtitle: '창고 · 주소 · 왜 힙인가 · ❌스택' },
    { id: 'ref', badge: '🧠 M4-1', title: 'M4-1 · 값 = 복사', subtitle: '이름표 착각 정면돌파 · a.num은 복사' },
    { id: 'ref2', badge: '🧠 M4-2', title: 'M4-2 · 참조 = 공유', subtitle: '별칭 · "왜 obj도 바뀌지"' },
    { id: 'passval', badge: '🧠 M5', title: 'M5 · 값에 의한 전달', subtitle: '원시값 → 함수 · 원본 안전' },
    { id: 'passobj', badge: '🧠 M6', title: 'M6 · 참조에 의한 전달', subtitle: '객체 → 함수 · 원본 바뀜' },
    { id: 'passarr', badge: '🧠 M7', title: 'M7 · 배열도 참조다', subtitle: '배열 → 함수 · push 새어나감' },
    // 🧠 객체 그래프 (별도 챕터)
    { id: 'graph', badge: '🧠 G1', title: 'G1 · 별칭·중첩', subtitle: '효니·나 · 양방향 · 2중(친구의 친구)' },
    { id: 'friends', badge: '🧠 G2', title: 'G2 · 친구 목록', subtitle: '배열 안 사람 5명 · 참조 증명' },
    { id: 'family', badge: '🕸️ G3', title: 'G3 · 계통도', subtitle: '가계도 트리 · me.parent.parent' },
    { id: 'cycle', badge: '🕸️ G4', title: 'G4 · 친구 네트워크', subtitle: '서로 가리킴 · 순환(cycle)' },
    // 🧠 메모리 심화 (함수·객체 뒤).
    { id: 'callstack', badge: '🧠 심화', title: '콜 스택', subtitle: '함수의 삶과 죽음 (push/pop)' },
    { id: 'closure', badge: '🧠 심화', title: '클로저', subtitle: '사라지지 않는 스코프',
      plan: ['콜 스택 복습 — 보통은 프레임이 pop되며 지역변수 소멸', '그런데 안쪽 함수가 바깥 변수를 붙잡으면? → 스코프가 힙에 살아남는다', 'memory-model 시나리오: 카운터 만들기(makeCounter) 단계 시뮬레이션', '왜 유용한가 — 상태를 숨겨 안전하게 보관'] },
    { id: 'gc', badge: '🧠 심화', title: '가비지 컬렉션', subtitle: '힙을 누가 치우나 (선택)',
      plan: ['아무도 안 가리키는 힙 객체는 자동으로 치워진다(GC)', '참조가 남아 있으면 안 치워진다 — 누수(leak)의 개념', 'memory-model: 참조가 끊기는 순간 힙 박스가 사라지는 시뮬레이션'] },
    { id: 2, name: '계산과 문자열', subtitle: '연산자 · 글자 합치기 · 템플릿',
      plan: ['숫자 계산: + - * / 와 우선순위', '문자열 합치기와 템플릿 리터럴 `안녕 ${name}`', '값·화면 균형: 계산 결과를 카드에 표시', '유형 드릴 ×10'] },
    // 🌳 3강 표현식 — 개념을 단계로 쪼갬(3-1~3-6, 진도) + 예측 드릴(Practices[3], startAt:7 → 3-7~).
    { id: 3, name: '표현식', subtitle: '식을 분해하는 눈 (단계로 배웁니다)' },
    // step:true → 개념 단계(3강의 하위 내비게이션). 별도 체크박스·진도 집계 없이 3강 하나가 진도 단위.
    { id: '3-1', badge: '3-1', title: '3-1 · 식 vs 문', subtitle: '표현식은 값을 낳는다', step: true },
    { id: '3-2', badge: '3-2', title: '3-2 · 우선순위 눈금', subtitle: 'factor ‹ term ‹ expression', step: true },
    { id: '3-3', badge: '3-3', title: '3-3 · 축약 ①', subtitle: '순수 계산 한 겹씩 접기', step: true },
    { id: '3-4', badge: '3-4', title: '3-4 · 축약 ②', subtitle: '함수 · 중첩 삼항 · 안쪽부터', step: true },
    { id: '3-5', badge: '3-5', title: '3-5 · 🔒 중첩 함수', subtitle: '좌→우·안쪽 먼저 (5강 함수 후)', step: true },
    { id: '3-6', badge: '3-6', title: '3-6 · 요약', subtitle: '식을 나무로 보는 눈', step: true },
    { id: 4, name: '조건', subtitle: 'if · 비교 · 참/거짓 · 삼항',
      plan: ['비교 연산자 == vs === · > < >=', 'truthy/falsy — 빈 값의 참·거짓', 'if / else 와 삼항 연산자', '화면: 조건에 따라 배지 색 바꾸기', '유형 드릴 ×10'] },
    { id: 5, name: '함수', subtitle: '왜 · 정의 · 호출 · return · 스코프 (단계로 배웁니다)' },
    // step:true → 함수 하위 단계(5강의 쇼츠, 5-1~5-7). 진도 단위는 5강 하나. 드릴은 startAt:8 → 5-8~.
    { id: '5-1', badge: '5-1', title: '5-1 · 왜 함수?', subtitle: '반복을 하나로 묶기', step: true },
    { id: '5-2', badge: '5-2', title: '5-2 · 정의 & 호출', subtitle: '만들고 ( )로 부르기', step: true },
    { id: '5-3', badge: '5-3', title: '5-3 · 매개변수 vs 인수', subtitle: '빈 자리 vs 넣는 값', step: true },
    { id: '5-4', badge: '5-4', title: '5-4 · return', subtitle: '돌려줌 vs print', step: true },
    { id: '5-5', badge: '5-5', title: '5-5 · 🧠 프레임', subtitle: '부르면 칸이 쌓인다(복습)', step: true },
    { id: '5-6', badge: '5-6', title: '5-6 · 스코프', subtitle: '지역 vs 전역', step: true },
    { id: '5-7', badge: '5-7', title: '5-7 · 화살표 & 요약', subtitle: '짧은 표기 · 언제 만드나', step: true },
    { id: 6, name: '배열', subtitle: '여러 값을 목록으로',
      plan: ['배열 만들기 [ ] · 인덱스로 꺼내기', 'length · push 로 추가', '화면: 목록을 여러 칩으로 그리기', '유형 드릴 ×10'] },
    { id: 7, name: '반복과 map', subtitle: '훑기 · 변환하기',
      plan: ['for 로 하나씩 훑기', 'map 으로 목록을 통째로 바꾸기', 'filter 로 거르기', '화면: 데이터 배열 → 카드 목록', '유형 드릴 ×10'] },
    { id: 8, name: '객체', subtitle: '이름:값 묶음',
      plan: ['객체 { key: value } · 점(.)으로 꺼내기', '배열 안의 객체 (실전 데이터 모양)', '화면: 프로필 카드 만들기', '유형 드릴 ×10'] },
    { id: 9, name: '화면 조작 (DOM)', subtitle: '선택 · 바꾸기 · 이벤트',
      plan: ['요소 선택 querySelector', 'textContent · style 로 바꾸기', '버튼 클릭에 반응 addEventListener', '유형 드릴 ×10'] },
    { id: 10, name: '실전 미니앱', subtitle: '배운 걸 합쳐 하나 만들기',
      plan: ['컬러 팔레트 생성기 or 디지털 명함 카드', '지금까지의 값·배열·함수·DOM 총동원', '단계별로 조립'] },
  ]
  // 번호(N강)의 단일 출처(SSOT): 숫자 id에서 badge·title을 파생한다.
  // → 강의를 재배치할 땐 여기 id만 바꾸면 badge·title·목차가 다 따라온다.
  //   (레슨 파일 헤더의 badge도 renderPage가 이 값으로 덮어써 화면을 강제 일치시킨다.)
  const chapterBadge = (id) => (id === 10 ? '실전' : id + '강')
  LESSONS.forEach((l) => {
    l.kind = 'lesson'
    if (typeof l.id === 'number' && l.name) {
      l.badge = chapterBadge(l.id)
      l.title = l.id + '강 · ' + l.name
    }
  })

  // 실습을 '문제마다 별도 항목'으로 펼친다 — 1-1, 1-2, … 1-10 (리액트공부 종합연습 방식).
  // 한 강의 실습 = 동일 유형 5개(1-5) + 유사한 5개 더(6-10).
  // startAt: 실습 항목 번호 시작값(기본 1). 표현식(3강)은 개념이 3-1~3-6을 쓰므로 드릴은 3-7부터(startAt:7).
  const practiceItemsFor = (base) => {
    const cfg = window.Practices && window.Practices[base]
    if (!cfg) return []
    // 문자열 id 챕터(메모리·그래프·심화)는 '동일 유형 반복' → 한 페이지에 전부(stepped Drill).
    // 숫자 강의(1~10강)는 문제별 페이지 유지(기본→유사, 점진). '동일 유형은 한 페이지, 난이도 점진은 분리'.
    if (typeof base === 'string') {
      return [{ id: base + '-drill', kind: 'practiceset', base, badge: '📝', title: 'Practice', subtitle: '동일 유형 ' + cfg.problems.length + '문제' }]
    }
    const start = cfg.startAt || 1
    return cfg.problems.map((p, i) => ({
      id: `${base}-${start + i}`, kind: 'practice', base, idx: i,
      badge: '실습', title: `${base}-${start + i}`, subtitle: p.label || p.ask,
    }))
  }
  const PRACTICE_ITEMS = LESSONS.flatMap((l) => practiceItemsFor(l.id))
  const byId = Object.fromEntries([...LESSONS, ...PRACTICE_ITEMS].map((l) => [l.id, l]))

  // 사이드바 목차 — 개념 강의 + 그 강의의 실습 문제들을 명시적으로 배치한다.
  // 🧠 메모리 챕터도 이제 개념 + 실습(드릴) — items에 P()로 실습 항목 전개(tag로 '파트' 대신 아이콘 표시).
  const P = (base) => practiceItemsFor(base).map((pi) => pi.id)
  const CHAPTERS = [
    { n: '1', title: '값·타입과 변수', items: [1, ...P(1)] },
    { tag: '🧠', title: '메모리 기초', optional: true, skipTo: 2, items: ['ram', ...P('ram'), 'stack', ...P('stack'), 'heap', ...P('heap'), 'ref', ...P('ref'), 'ref2', ...P('ref2'), 'passval', ...P('passval'), 'passobj', ...P('passobj'), 'passarr', ...P('passarr')] },
    { tag: '🕸️', title: '객체 그래프', optional: true, skipTo: 2, items: ['graph', ...P('graph'), 'friends', ...P('friends'), 'family', ...P('family'), 'cycle', ...P('cycle')] },
    // 표현식(3강)은 개념 단계(3, 3-1~3-6) + 드릴(...P(3) = 3-7~). 조건은 4강으로.
    { n: '2', title: '값 다루기와 함수', items: [2, ...P(2), 3, '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', ...P(3), 4, ...P(4), 5, '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', ...P(5)] },
    { n: '3', title: '여러 값과 반복', items: [6, ...P(6), 7, ...P(7), 8, ...P(8)] },
    { tag: '🧠', title: '메모리 심화', optional: true, skipTo: 9, items: ['callstack', ...P('callstack'), 'closure', ...P('closure'), 'gc', ...P('gc')] },
    { n: '4', title: '화면을 움직이기', items: [9, ...P(9), 10, ...P(10)] },
  ]

  const kindOf = (l) => (l && l.kind) || 'lesson'
  const hasContent = (id) => {
    const l = byId[id]
    if (!l) return false
    if (kindOf(l) === 'practice' || kindOf(l) === 'practiceset') return !!(window.Practices && window.Practices[l.base])
    return !!(window.Lessons && window.Lessons[id])
  }
  const isPracticeKind = (l) => kindOf(l) === 'practice' || kindOf(l) === 'practiceset'
  // 진도는 개념 강의에, 연습은 실습 문제에 집계.
  const modeApplies = (modeKey, l) => (modeKey === 'practice' ? isPracticeKind(l) : kindOf(l) === 'lesson')

  // ── 저장소 헬퍼 ───────────────────────────────────────────
  const load = (k, fb) => { try { const v = localStorage.getItem(k); return v == null ? fb : v } catch { return fb } }
  const save = (k, v) => { try { localStorage.setItem(k, v) } catch {} }
  const loadSet = (k) => { try { return new Set(JSON.parse(localStorage.getItem(k) || '[]')) } catch { return new Set() } }
  const saveSet = (k, set) => save(k, JSON.stringify([...set]))

  // ── 상태 ─────────────────────────────────────────────────
  const state = {
    currentId: initialId(),
    study: loadSet('doneStudy'),
    practice: loadSet('donePractice'),
    checkMode: load('checkMode', 'study'),
    sidebarOpen: load('sidebarOpen', 'true') !== 'false',
    openChapters: new Set(CHAPTERS.map((_, i) => i)),
  }
  const CHECK_MODES = [
    { key: 'study', label: '📖 진도', get: () => state.study, k: 'doneStudy' },
    { key: 'practice', label: '✏️ 연습', get: () => state.practice, k: 'donePractice' },
  ]
  const activeMode = () => CHECK_MODES.find((m) => m.key === state.checkMode) || CHECK_MODES[0]

  function hashToId() {
    try {
      const raw = decodeURIComponent(location.hash.replace(/^#/, ''))
      if (!raw) return null
      return /^\d+$/.test(raw) ? Number(raw) : raw
    } catch { return null }
  }
  const validId = (id) => id === 'home' || byId[id] !== undefined
  function initialId() {
    const h = hashToId()
    if (h != null && (h === 'home' || byId[h])) return h
    const saved = load('lastLesson', null)
    if (saved) { const n = /^\d+$/.test(saved) ? Number(saved) : saved; if (n === 'home' || byId[n]) return n }
    return 'home'
  }

  // ── 렌더: 껍데기(1회) ─────────────────────────────────────
  const rootEl = document.getElementById('root')
  const layout = document.createElement('div')
  layout.className = 'layout'
  layout.innerHTML = `
    <div class="sidebar-backdrop" hidden></div>
    <aside class="sidebar">
      <div class="book-title">
        <span class="book-ico">🌱</span>
        <span>IT 전공자가 아닌 사람을 위한 JS 입문</span>
        <button class="sidebar-collapse" title="사이드바 접기" aria-label="사이드바 접기">◀</button>
      </div>
      <div class="check-tabs"></div>
      <div class="progress">
        <div class="progress-track"><div class="progress-fill"></div></div>
        <span class="progress-text"></span>
      </div>
      <nav class="toc"></nav>
    </aside>
    <main class="content">
      <button class="sidebar-open" title="목차 열기" hidden>☰ 목차</button>
      <div class="page"></div>
    </main>
  `
  rootEl.append(layout)

  const $ = (sel) => layout.querySelector(sel)
  const backdrop = $('.sidebar-backdrop')
  const checkTabs = $('.check-tabs')
  const progressFill = $('.progress-fill')
  const progressText = $('.progress-text')
  const toc = $('.toc')
  const page = $('.page')
  const openBtn = $('.sidebar-open')

  $('.sidebar-collapse').onclick = () => setSidebar(false)
  openBtn.onclick = () => setSidebar(true)
  backdrop.onclick = () => setSidebar(false)

  function setSidebar(open) {
    state.sidebarOpen = open
    save('sidebarOpen', String(open))
    layout.classList.toggle('sidebar-collapsed', !open)
    openBtn.hidden = open
    backdrop.hidden = !open || window.innerWidth > 720
  }

  // ── 렌더: 체크 탭 ─────────────────────────────────────────
  function renderCheckTabs() {
    checkTabs.innerHTML = ''
    CHECK_MODES.forEach((m) => {
      const b = document.createElement('button')
      b.className = 'check-tab' + (m.key === state.checkMode ? ' on' : '')
      b.textContent = m.label
      b.onclick = () => { state.checkMode = m.key; save('checkMode', m.key); renderCheckTabs(); renderProgress(); renderToc() }
      checkTabs.append(b)
    })
  }

  // ── 렌더: 진행률 ──────────────────────────────────────────
  function renderProgress() {
    // 현재 모드에 해당하는 항목만 분모로(진도=개념 강의, 연습=실습 항목).
    const items = CHAPTERS.flatMap((c) => c.items).filter((id) => byId[id] && !byId[id].step && modeApplies(state.checkMode, byId[id]))
    const set = activeMode().get()
    const done = items.filter((id) => set.has(id)).length
    const pct = items.length ? Math.round((done / items.length) * 100) : 0
    progressFill.style.width = pct + '%'
    progressText.textContent = `${activeMode().label} ${done}/${items.length} · ${pct}%`
  }

  // ── 렌더: 목차 ────────────────────────────────────────────
  function renderToc() {
    toc.innerHTML = ''
    const homeBtn = document.createElement('button')
    homeBtn.className = 'toc-home' + (state.currentId === 'home' ? ' active' : '')
    homeBtn.textContent = '🗺️ 커리큘럼 한눈에'
    homeBtn.onclick = () => go('home')
    toc.append(homeBtn)

    const set = activeMode().get()
    CHAPTERS.forEach((ch, ci) => {
      const hasCurrent = ch.items.includes(state.currentId)
      const open = state.openChapters.has(ci) || hasCurrent
      const chDiv = document.createElement('div')
      chDiv.className = 'toc-chapter'
      const head = document.createElement('button')
      head.className = 'toc-chapter-head' + (open ? ' open' : '')
      head.innerHTML = `<span class="toc-chev">▸</span><span class="toc-ch-n">${ch.tag ? ch.tag : '파트 ' + ch.n}</span><span class="toc-ch-title">${ch.title}</span>`
      head.onclick = () => { state.openChapters.has(ci) ? state.openChapters.delete(ci) : state.openChapters.add(ci); renderToc() }
      chDiv.append(head)

      if (open) {
        const sec = document.createElement('div')
        sec.className = 'toc-sections'
        ch.items.forEach((id) => {
          const l = byId[id]
          if (!l) return
          const row = document.createElement('div')
          row.className = 'toc-item-row'
          // 체크박스: 개념 서브내비(step)만 빼고 항상 표시. 각 항목은 '제 종류'의 집계셋에 연결
          // (개념 강의 → 📖 진도 셋, 실습 문제 → ✏️ 연습 셋). 모드 탭은 진행률 분모만 바꾼다.
          if (!l.step) {
            const isPr = isPracticeKind(l)
            const itemSet = isPr ? state.practice : state.study
            const itemK = isPr ? 'donePractice' : 'doneStudy'
            const cb = document.createElement('input')
            cb.type = 'checkbox'
            cb.className = 'toc-check'
            cb.checked = itemSet.has(id)
            cb.setAttribute('aria-label', `${isPr ? '✏️ 연습' : '📖 진도'}: ${l.title}`)
            cb.onchange = () => { itemSet.has(id) ? itemSet.delete(id) : itemSet.add(id); saveSet(itemK, itemSet); renderProgress() }
            row.append(cb)
          } else {
            const blank = document.createElement('span')
            blank.className = 'toc-check-blank'
            row.append(blank)
          }
          const btn = document.createElement('button')
          // 하위 항목(부모-번호 꼴, 예: 3-1)이면 부모 아래로 들여쓴다. 개념 단계(lesson)와 드릴(practice)은 색으로 구분.
          const isSub = typeof id === 'string' && /-\d+$/.test(id) && byId[id.replace(/-\d+$/, '')]
          const subCls = isPracticeKind(l) ? ' toc-item-practice' : (isSub ? ' toc-item-substep' : '')
          btn.className = 'toc-item' + (id === state.currentId ? ' active' : '') + subCls
          const flag = hasContent(id) ? '' : '<span class="toc-flag" title="준비 중">🚧</span>'
          btn.innerHTML = `<span class="toc-item-title">${flag}${l.title}</span><span class="toc-item-sub">${l.subtitle}</span>`
          btn.onclick = () => go(id)
          row.append(btn)
          sec.append(row)
        })
        chDiv.append(sec)
      }
      toc.append(chDiv)
    })
  }

  // ── 렌더: 본문 ────────────────────────────────────────────
  // 원리 심화(선택) 챕터 입구 — "코드 급하면 건너뛰기" 안내 배너.
  function skipBanner(ch) {
    const el = document.createElement('div')
    el.className = 'skip-banner'
    const msg = document.createElement('span')
    msg.innerHTML = '🧭 <b>원리 심화 파트</b> — 값이 메모리에서 어떻게 사는지 깊이 보는 곳이에요. 코드를 빨리 써보고 싶으면 건너뛰어도 됩니다 <b>(언제든 돌아오세요)</b>.'
    const btn = document.createElement('button')
    btn.className = 'chip on'
    btn.textContent = `${ch.skipTo}강으로 건너뛰기 →`
    btn.onclick = () => go(ch.skipTo)
    el.append(msg, btn)
    return el
  }

  function renderPage() {
    page.innerHTML = ''
    if (state.currentId === 'home') { page.append(renderHome()); return }
    const l = byId[state.currentId]
    if (!l) { page.append(renderHome()); return }
    // 선택·심화 챕터면 상단에 '건너뛰기' 배너를 (레슨과 별도 호스트로) 얹는다.
    const ch = CHAPTERS.find((c) => c.items.includes(state.currentId))
    if (ch && ch.optional && ch.skipTo != null) page.append(skipBanner(ch))
    const host = document.createElement('div')
    page.append(host)
    try {
      if (kindOf(l) === 'practice') {
        if (hasContent(l.id)) host.append(renderPracticeProblem(l))
        else host.append(renderComingSoon(l))
      } else if (kindOf(l) === 'practiceset') {
        host.append(renderDrillSet(l))
      } else if (hasContent(l.id)) {
        window.Lessons[l.id](host)
        // 번호 SSOT: 숫자 강의만 헤더 badge를 메타(l.badge='N강')로 강제 동기화 — 파일이 옛 번호여도 화면 정확.
        // (substep '3-1'·메모리 'ram' 등은 이모지 badge를 파일이 직접 그리므로 건드리지 않는다.)
        if (typeof l.id === 'number') {
          const bdg = host.querySelector('.lesson-header .badge')
          if (bdg && l.badge) bdg.textContent = l.badge
        }
      } else {
        host.append(renderComingSoon(l))
      }
    } catch (e) {
      const err = document.createElement('div')
      err.className = 'card'
      err.style.borderColor = '#dc2626'
      err.innerHTML = `<div class="file-label">⚠️ 이 레슨을 그리다 문제가 생겼어요</div><pre class="err-code">${String((e && e.message) || e)}</pre>`
      host.append(err)
    }
  }

  // 실습 문제를 풀면(정답) 그 문제 항목을 '연습' 진도에 자동 체크한다.
  function markPractice(id) {
    if (state.practice.has(id)) return
    state.practice.add(id)
    saveSet('donePractice', state.practice)
    renderProgress()
    renderToc()
  }

  // 실습 세트 페이지 — 동일 유형 문제를 '한 페이지에서 연속 반복'(stepped Drill).
  // (점진 난이도면 페이지를 나누지만, 같은 유형 반복은 한 페이지가 낫다.)
  function renderDrillSet(l) {
    const cfg = window.Practices[l.base]
    const base = byId[l.base]
    const sec = document.createElement('section')
    sec.innerHTML = `
      <header class="lesson-header">
        <span class="badge">📝 ${base ? base.badge : ''} · 실습</span>
        <h2>${base ? base.title : ''} — 실습</h2>
        <p>${cfg.pattern} · <b>동일 유형 ${cfg.problems.length}문제</b>를 한 페이지에서 (하나 풀면 다음이 열려요).</p>
      </header>
      <div class="practice-back"><button class="chip" data-back="${l.base}">← ${base ? base.title : '개념'} 다시 보기</button></div>
      <div data-m="drill"></div>
    `
    const solved = new Set()
    sec.querySelector('[data-m="drill"]').append(Drill({
      hideHead: true, stepped: true, problems: cfg.problems,
      onSolved: (i) => { solved.add(i); if (solved.size === cfg.problems.length) markPractice(l.id) },
    }))
    const back = sec.querySelector('[data-back]')
    if (back) back.onclick = () => go(l.base)
    return sec
  }

  // 단일 실습 문제 페이지 — 문제 하나 + 이전/다음 + 개념으로.
  function renderPracticeProblem(l) {
    const cfg = window.Practices[l.base]
    const p = cfg.problems[l.idx]
    const base = byId[l.base]
    const start = cfg.startAt || 1
    const num = start + l.idx          // 사이드바에 보이는 번호(3-7 …)
    const pos = l.idx + 1              // 문제 세트 안 위치(1..total)
    const total = cfg.problems.length
    const batch = pos <= Math.ceil(total / 2) ? '기본 유형' : '유사 유형 +'
    const sec = document.createElement('section')
    sec.innerHTML = `
      <header class="lesson-header">
        <span class="badge">📝 ${l.base}-${num} · ${batch}</span>
        <h2>${base ? base.title.replace(/^\d+강 · /, '') : ''} 실습 · ${pos} / ${total}</h2>
        <p>${cfg.pattern}</p>
      </header>
      <div class="practice-back"><button class="chip" data-back="${l.base}">← ${base ? base.title : '개념'} 다시 보기</button></div>
      <div data-m="drill"></div>
      <div data-m="mem" hidden></div>
      <div class="practice-nav">
        <button class="chip" data-prev ${l.idx <= 0 ? 'disabled' : ''}>← 이전</button>
        <span class="practice-nav-dots">${pos} / ${total}</span>
        <button class="chip on" data-next ${l.idx >= total - 1 ? 'disabled' : ''}>다음 →</button>
      </div>
    `
    // 정답을 맞히면(memViz 강의) '이름표 → 값' 메모리 그림을 드러낸다. (스포일러 방지 — 풀기 전엔 숨김)
    const memHost = sec.querySelector('[data-m="mem"]')
    const revealMem = () => {
      if (!cfg.memViz || !memHost || memHost.dataset.shown) return
      const m = /(?:let|const)\s+([A-Za-z_$][\w$]*)\s*=/.exec(p.code)
      const varName = m ? m[1] : 'x'
      memHost.dataset.shown = '1'
      memHost.hidden = false
      memHost.innerHTML = '<div class="card"><div class="file-label">🧠 정답의 메모리 모델 — 이 값은 어디에 사나 (이름표 장부 / 값 메모리)</div><div data-mem-mount></div></div>'
      memHost.querySelector('[data-mem-mount]').append(MemoryModel({
        title: `${varName} = ${p.answer} — 이름표 장부에 직접`,
        code: [`let ${varName} = ${p.answer}`],
        steps: [{ line: 0, stack: [{ name: 'main', slots: [{ name: varName, value: p.answer }] }], heap: {}, note: `이런 <b>작은 값</b>(원시값)은 변수 ${varName}의 <b>이름표 장부 칸에 직접</b> 산다. <b>값 메모리(힙)</b>는 큰 묶음(객체·배열)용 — 뒤 강의.` }],
      }))
    }
    sec.querySelector('[data-m="drill"]').append(Drill({ problems: [p], hideHead: true, onSolved: () => { markPractice(l.id); revealMem() } }))
    const back = sec.querySelector('[data-back]')
    if (back) back.onclick = () => go(l.base)
    const prev = sec.querySelector('[data-prev]')
    if (prev && l.idx > 0) prev.onclick = () => go(`${l.base}-${num - 1}`)
    const next = sec.querySelector('[data-next]')
    if (next && l.idx < total - 1) next.onclick = () => go(`${l.base}-${num + 1}`)
    return sec
  }

  function renderComingSoon(l) {
    const sec = document.createElement('section')
    const items = (l.plan || ['곧 채워집니다']).map((t) => `<li>${t}</li>`).join('')
    sec.innerHTML = `
      <header class="lesson-header">
        <span class="badge">${l.badge || '준비 중'}</span>
        <h2>${l.title}</h2>
        <p>${l.subtitle}</p>
      </header>
      <div class="card">
        <div class="file-label">🚧 이 강의는 준비 중이에요</div>
        <p class="section-desc" style="margin-top:0">여기서 다룰 내용:</p>
        <ul class="section-list" style="margin-bottom:0">${items}</ul>
      </div>
      <p class="section-desc">먼저 완성된 <b>1강 · 변수</b>를 보면 이 커리큘럼이 어떤 식으로 흘러가는지 감이 와요.</p>
    `
    return sec
  }

  function renderHome() {
    const sec = document.createElement('section')
    const cards = CHAPTERS.map((ch) => {
      const btns = ch.items.map((id) => {
        const l = byId[id]
        if (!l) return ''
        const flag = hasContent(id) ? '' : '<span title="준비 중" style="margin-right:4px">🚧</span>'
        return `<button class="home-card" data-go="${id}">
          <span class="home-card-title">${flag}${l.title}</span>
          <span class="home-card-sub">${l.subtitle}</span>
        </button>`
      }).join('')
      return `<div class="card"><div class="file-label">${ch.tag ? ch.tag : '파트 ' + ch.n} · ${ch.title}</div><div class="home-grid">${btns}</div></div>`
    }).join('')
    sec.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🌱 → 💻</span>
        <h2>IT 전공자가 아닌 사람을 위한 JavaScript 입문</h2>
        <p><b>일은 하고 있지만 기초가 없어 답답했던</b> 사람을 위한, 코딩 <b>완전 제로</b>부터의 실습형 커리큘럼. 읽고 → 눌러 보고 → 같은 유형 5문제로 손에 붙인다.</p>
      </header>
      <div class="lesson-goal">
        <span class="lesson-goal-tag">이렇게 배워요</span>
        <p>모든 강의는 <b>규칙 설명 → 라이브 실행(값·화면 둘 다) → 유형 드릴 ×5</b> 순서예요.
        코드는 그 자리에서 고쳐 <b>▶ 실행</b>해 볼 수 있고, 결과는 <b>값(print)</b>과 <b>화면(box)</b> 두 가지로 나타나요.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;margin-top:16px">${cards}</div>
      <p class="section-desc" style="margin-top:16px">👉 <b>1강 · 변수</b>부터 시작하세요.</p>
    `
    sec.querySelectorAll('[data-go]').forEach((b) => {
      b.onclick = () => { const v = b.getAttribute('data-go'); go(/^\d+$/.test(v) ? Number(v) : v) }
    })
    return sec
  }

  // ── 내비게이션 ────────────────────────────────────────────
  let firstSync = true
  function go(id) {
    state.currentId = id
    const target = '#' + id
    if (location.hash !== target) {
      if (firstSync) history.replaceState(null, '', target)
      else location.hash = target
    }
    firstSync = false
    save('lastLesson', String(id))
    try { window.scrollTo(0, 0) } catch {}
    if (window.innerWidth <= 720) setSidebar(false)
    renderToc()
    renderPage()
  }

  // 레슨 안의 버튼(개념→실습 CTA 등)이 직접 이동을 부를 수 있게 훅을 노출한다.
  window.goLesson = go

  window.addEventListener('hashchange', () => {
    const h = hashToId()
    if (validId(h) && h !== state.currentId) { state.currentId = h; renderToc(); renderPage() }
  })
  window.addEventListener('resize', () => { backdrop.hidden = !state.sidebarOpen || window.innerWidth > 720 })

  // ── 최초 그리기 ───────────────────────────────────────────
  setSidebar(state.sidebarOpen)
  renderCheckTabs()
  renderProgress()
  renderToc()
  renderPage()
})()
