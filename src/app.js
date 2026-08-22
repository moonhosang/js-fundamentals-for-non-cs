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
    { id: 'objanat', badge: '🧠 해부', title: '객체 해부 · 속성은 어디', subtitle: '원시는 스택이라며? · 봉투 속 데이터' },
    { id: 'objprim', badge: '🧠 조화', title: '객체 × 원시값 · 조화 연습', subtitle: '넣기·꺼내기·중첩 · 규칙은 하나' },
    { id: 'spread', badge: '🧠 봉투③', title: '스프레드 … · 새 봉투 뜨기', subtitle: '얕은 복사 · { ...obj } · 별칭 끊기' },
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
    { id: '3-6', badge: '3-6', title: '3-6 · 조건도 표현식', subtitle: 'if·for·while·switch의 (조건)', step: true },
    { id: '3-7', badge: '3-7', title: '3-7 · 요약', subtitle: '식을 나무로 보는 눈', step: true },
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
    // 🎁 구조분해 (객체·배열 뒤) — spread의 역: 모양 맞춰 값 꺼내기.
    { id: 'destructuring', badge: '🎁 추출', title: '구조분해 { } [ ]', subtitle: '모양 맞춰 꺼내기 · spread의 역' },
    // 📦 JSON (객체·문자열 뒤) — 객체 ↔ 문자열 왕복, 저장·전송의 형태.
    { id: 'json', badge: '📦 데이터', title: 'JSON', subtitle: '객체를 문자열로 · stringify/parse' },
    // 🧬 클래스 (선택 심화 · 객체 뒤) — class=프로토타입 문법설탕, 인스턴스=힙 객체.
    { id: 'class', badge: '🧬 선택', title: '클래스', subtitle: '객체 찍는 틀 · new · 프로토타입 설탕' },
    // 🛟 에러 처리 (함수·객체 뒤) — try/catch/finally, 8강 TypeError 후속.
    { id: 'errors', badge: '🛟 오류', title: '에러 처리', subtitle: 'try · catch · finally · throw' },
    // ⏳ 비동기 (콜스택·에러 뒤) — setTimeout·Promise·async/await, 이벤트 루프. 순서예측 Quiz 중심.
    { id: 'async', badge: '⏳ 시간', title: '비동기', subtitle: 'setTimeout · Promise · async/await' },
    { id: 9, name: '화면 조작 (DOM)', subtitle: '선택 · 바꾸기 · 이벤트',
      plan: ['요소 선택 querySelector', 'textContent · style 로 바꾸기', '버튼 클릭에 반응 addEventListener', '유형 드릴 ×10'] },
    { id: 10, name: '실전 미니앱', subtitle: '배운 걸 합쳐 하나 만들기',
      plan: ['컬러 팔레트 생성기 or 디지털 명함 카드', '지금까지의 값·배열·함수·DOM 총동원', '단계별로 조립'] },
    // 📚 레퍼런스 — 내장 기능(도구)은 분류별 서브페이지(builtins-1~5, step), 참·거짓/형변환은 규칙 항목(coercion).
    { id: 'builtins', badge: '📚 레퍼런스', title: '내장 기능', subtitle: '분류별 도구 카탈로그(개요)' },
    { id: 'builtins-1', badge: '①', title: '① 타입·판별', subtitle: 'typeof · instanceof · NaN', step: true },
    { id: 'builtins-2', badge: '②', title: '② 숫자·수학', subtitle: 'Number · Math · ** · %', step: true },
    { id: 'builtins-3', badge: '③', title: '③ 문자열', subtitle: 'length · toUpperCase · split', step: true },
    { id: 'builtins-4', badge: '④', title: '④ 배열', subtitle: 'push/pop · map/filter/reduce', step: true },
    { id: 'builtins-5', badge: '⑤', title: '⑤ 객체', subtitle: 'Object.keys · delete', step: true },
    // 📐 규칙(도구 아님) — truthy/falsy + 형 변환(캐스팅). 3강 축약·4강 조건이 이리로 링크(SSOT).
    { id: 'coercion', badge: '📐 규칙', title: '참·거짓과 형 변환', subtitle: 'truthy/falsy(8개) · 캐스팅' },
    // 🔀 제어 흐름 조합·중첩 (개별 문은 4강·7강 · 여기선 겹쳐 쓰기) — 서브레슨은 인라인 드릴(tiered 아님).
    { id: 'cf', badge: '🔀 제어', title: '제어 흐름 · 조합과 중첩', subtitle: 'if·switch·for를 겹쳐 쓰기' },
    { id: 'cf-1', badge: '🔀', title: 'cf-1 · if 사다리', subtitle: 'else if · else — 여러 갈래', step: true },
    { id: 'cf-2', badge: '🔀', title: 'cf-2 · 중첩 if', subtitle: 'if 안의 if · && 대비', step: true },
    { id: 'cf-3', badge: '🔀', title: 'cf-3 · 반복 × 조건', subtitle: 'for 안의 if · 목록 거르기', step: true },
    { id: 'cf-4', badge: '🔀', title: 'cf-4 · 중첩 반복', subtitle: 'for 안의 for · 격자·구구단', step: true },
    { id: 'cf-5', badge: '🔀', title: 'cf-5 · if × switch', subtitle: '조건으로 고르고 다시 분기', step: true },
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
  // 난이도 3단계(ADR 0008): 챕터마다 쉬움·보통·어려움 × 5, 난이도별 페이지(practiceset).
  // 데이터는 난이도별 파일 window.Drills.{easy,normal,hard}[base] (개념 강의 파일엔 드릴 없음).
  const TIERS = [
    { key: 'easy', label: '쉬움', badge: '🟢' },
    { key: 'normal', label: '보통', badge: '🟡' },
    { key: 'hard', label: '어려움', badge: '🔴' },
  ]
  const drillTiersFor = (base) => {
    const D = window.Drills
    if (!D) return []
    const key = String(base)
    return TIERS
      .map((t) => ({ t, cfg: D[t.key] && D[t.key][key] }))
      .filter((x) => x.cfg && x.cfg.problems && x.cfg.problems.length)
  }
  // 챕터 base → 쉬움/보통/어려움 3페이지(있는 난이도만).
  const practiceItemsFor = (base) =>
    drillTiersFor(base).map(({ t, cfg }) => ({
      id: base + ':' + t.key, kind: 'practiceset', base, tier: t.key,
      badge: t.badge, title: t.label, subtitle: cfg.problems.length + '문제',
    }))
  const PRACTICE_ITEMS = LESSONS.flatMap((l) => practiceItemsFor(l.id))
  const byId = Object.fromEntries([...LESSONS, ...PRACTICE_ITEMS].map((l) => [l.id, l]))
  // 강의 자식(하위스텝 X-N · 드릴 X:tier)의 부모 강 id를 돌려준다(아니면 null).
  const lessonParent = (id) => {
    const s = String(id)
    if (s.includes(':')) return s.split(':')[0]                 // 드릴 X:tier → X
    const m = s.match(/^(.*)-\d+$/); return m && byId[m[1]] ? m[1] : null  // 하위스텝 X-N → X
  }

  // 사이드바 목차 — 개념 강의 + 그 강의의 실습 문제들을 명시적으로 배치한다.
  // 🧠 메모리 챕터도 이제 개념 + 실습(드릴) — items에 P()로 실습 항목 전개(tag로 '파트' 대신 아이콘 표시).
  const P = (base) => practiceItemsFor(base).map((pi) => pi.id)
  // 목차 = 파트 4개 + 레퍼런스. 원리 심화(메모리·그래프·클래스·콜스택)는 별도 트랙이
  // 아니라 '자기 파트 안의 자연스러운 챕터'로 녹인다.
  //  - 메모리 기초 → 파트1(값과 메모리): 값을 배웠으니 "그 값이 어디 사는가".
  //  - 메모리 심화(콜스택·클로저·GC) → 파트2 끝: 함수(5강)를 배웠으니 프레임의 삶/죽음.
  //  - 객체 그래프·클래스 → 파트3 끝: 객체(8강)를 배웠으니 참조 그래프·클래스.
  // 이러면 사이드바 최상위는 파트1~4만 보여 흐름이 깔끔하고(예전엔 1강↔2강 사이에 심화
  // 11개가 벽처럼 끼어 끊겼다), 파트를 펼치면 심화가 제 자리에 자연히 이어진다.
  const CHAPTERS = [
    { n: '1', title: '값과 메모리', items: [1, ...P(1), 'ram', ...P('ram'), 'stack', ...P('stack'), 'heap', ...P('heap'), 'objanat', ...P('objanat'), 'objprim', ...P('objprim'), 'spread', ...P('spread'), 'ref', ...P('ref'), 'ref2', ...P('ref2'), 'passval', ...P('passval'), 'passobj', ...P('passobj'), 'passarr', ...P('passarr')] },
    // 표현식(3강)·함수(5강)는 개념 단계(3-1~3-7 / 5-1~5-7) + 드릴을 items에 펼친다. 함수 뒤에 메모리 심화.
    { n: '2', title: '값 다루기와 함수', items: [2, ...P(2), 3, '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', ...P(3), 4, ...P(4), 5, '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', ...P(5), 'callstack', ...P('callstack'), 'closure', ...P('closure'), 'gc', ...P('gc')] },
    // 객체(8강) 뒤에 그래프·클래스.
    { n: '3', title: '여러 값 · 반복 · 객체', items: [6, ...P(6), 7, ...P(7), 8, ...P(8), 'destructuring', ...P('destructuring'), 'json', ...P('json'), 'graph', ...P('graph'), 'friends', ...P('friends'), 'family', ...P('family'), 'cycle', ...P('cycle'), 'class', ...P('class'), 'errors', ...P('errors'), 'async', ...P('async'), 'cf', 'cf-1', 'cf-2', 'cf-3', 'cf-4', 'cf-5'] },
    { n: '4', title: '화면을 움직이기', items: [9, ...P(9), 10, ...P(10)] },
    { tag: '📚', title: '레퍼런스', items: ['builtins', 'builtins-1', 'builtins-2', 'builtins-3', 'builtins-4', 'builtins-5', 'coercion'] },
  ]
  // 원리 심화 개념 강의 → "급하면 다음 파트로" 건너뛰기 배너의 이동 목적지(파트 안에 있지만 선택).
  const DEEP_SKIP = { ram: 2, stack: 2, heap: 2, ref: 2, ref2: 2, passval: 2, passobj: 2, passarr: 2, callstack: 6, closure: 6, gc: 6, graph: 9, friends: 9, family: 9, cycle: 9, class: 9 }
  // 자식(스텝·드릴)을 가진 강 id 집합 — 이 강들에 '강 접기' chevron을 단다.
  const lessonsWithChildren = new Set()
  CHAPTERS.forEach((ch) => ch.items.forEach((it) => { const p = lessonParent(it); if (p != null) lessonsWithChildren.add(p) }))

  const kindOf = (l) => (l && l.kind) || 'lesson'
  const hasContent = (id) => {
    const l = byId[id]
    if (!l) return false
    if (kindOf(l) === 'practiceset') return !!(window.Drills && window.Drills[l.tier] && window.Drills[l.tier][String(l.base)])
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
    openSteps: new Set(), // 하위 단계(3-1…·5-1…)를 펼친 부모 강의 id. 기본 접힘.
    collapsedLessons: new Set(), // 사용자가 수동으로 접은 강 id. 기본 비어 있음 = 모든 강 펼침(드릴 보임). 접으면 그 강의 스텝+드릴 모두 숨김.
    homeCollapsed: new Set(), // 목차(홈)에서 접은 파트 인덱스. 기본 다 펼침.
  }
  const CHECK_MODES = [
    { key: 'study', label: '📖 진도', get: () => state.study, k: 'doneStudy' },
    { key: 'practice', label: '✏️ 연습', get: () => state.practice, k: 'donePractice' },
  ]
  const activeMode = () => CHECK_MODES.find((m) => m.key === state.checkMode) || CHECK_MODES[0]

  // ── 체크 단일 출처(SSOT) — 사이드바·목차 어디서 눌러도 여기로. 양쪽 UI를 즉시 동기화. ──
  const isPracticeId = (id) => typeof id === 'string' && id.includes(':') // 드릴(base:tier)
  // 숫자 id는 사이드바(숫자)·목차(문자 attr) 양쪽에서 오므로 두 형태를 모두 저장/조회한다.
  const idForms = (id) => { const s = String(id); return /^\d+$/.test(s) ? [s, Number(s)] : [s] }
  function setDone(id, on) {
    const isPr = isPracticeId(id)
    const set = isPr ? state.practice : state.study
    idForms(id).forEach((f) => (on ? set.add(f) : set.delete(f)))
    saveSet(isPr ? 'donePractice' : 'doneStudy', set)
    renderProgress()
    // 사이드바 전체를 state로 재렌더 → 접혀 숨은 챕터의 체크까지 완전 정합. 스크롤은 보존.
    if (typeof toc !== 'undefined' && toc) { const sc = toc.scrollTop; renderToc(); toc.scrollTop = sc }
    syncCheckUI(id) // 홈(목차) 체크·파트 카운터는 in-place(홈 스크롤·포커스 방해 없이)
  }
  function isDone(id) { const set = isPracticeId(id) ? state.practice : state.study; return idForms(id).some((f) => set.has(f)) }
  function syncCheckUI(id) { // 홈(목차) 페이지의 체크·파트 카운터만 in-place 갱신(사이드바는 setDone에서 재렌더)
    const on = isDone(id)
    const sel = `[data-cid="${id}"]`
    if (typeof page !== 'undefined' && page) {
      page.querySelectorAll('input.bt-check' + sel + ', input.bt-tier-check' + sel).forEach((s) => { s.checked = on })
      page.querySelectorAll('.bt-part').forEach((part) => {
        const ct = part.querySelector('[data-ct]'); if (!ct) return
        const cs = part.querySelectorAll('input.bt-check[data-cid]')
        ct.textContent = [...cs].filter((c) => c.checked).length + '/' + cs.length
      })
    }
  }

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
  // 현재 항목이 속한 챕터(와 하위단계 부모)를 펼침 집합에 넣는다 — 탐색하면 자동으로 보이게.
  // renderToc가 아니라 '탐색 시점'에만 부른다(렌더마다 부르면 수동 접기가 되살아나 못 접음).
  function revealCurrent() {
    const id = state.currentId
    const ci = CHAPTERS.findIndex((c) => c.items.includes(id))
    if (ci >= 0) state.openChapters.add(ci)
    const sid = String(id)
    if (/-\d+$/.test(sid) && byId[sid.replace(/-\d+$/, '')]) {
      state.openSteps.add(sid.replace(/-\d+$/, '')) // 하위단계 페이지면 부모를 펼침
    } else if (CHAPTERS.some((c) => c.items.some((it) => typeof it === 'string' && new RegExp('^' + sid + '-\\d+$').test(it)))) {
      state.openSteps.add(sid) // 하위단계를 가진 부모 강의면 자신을 펼침
    }
    // 강이 접혀 있으면 펼친다 — 자식(드릴·스텝)으로 가거나 강 자체로 가면 그 강을 보여야 한다.
    const pl = lessonParent(id)
    if (pl != null) state.collapsedLessons.delete(pl)
    state.collapsedLessons.delete(sid)
  }

  function renderToc() {
    toc.innerHTML = ''
    const homeBtn = document.createElement('button')
    homeBtn.className = 'toc-home' + (state.currentId === 'home' ? ' active' : '')
    homeBtn.textContent = '🗺️ 커리큘럼 한눈에'
    homeBtn.onclick = () => go('home')
    toc.append(homeBtn)

    // 모두 접기 / 모두 펼치기 — 사이드바 전체를 한 번에.
    const substepParents = []
    CHAPTERS.forEach((ch) => ch.items.forEach((id) => {
      if (typeof id === 'string' && ch.items.some((it) => typeof it === 'string' && new RegExp('^' + id + '-\\d+$').test(it))) substepParents.push(String(id))
    }))
    const anyOpen = state.openChapters.size > 0
    const allBtn = document.createElement('button')
    allBtn.className = 'toc-collapse-all'
    allBtn.textContent = anyOpen ? '⊟ 모두 접기' : '⊞ 모두 펼치기'
    allBtn.onclick = () => {
      if (state.openChapters.size > 0) { state.openChapters.clear(); state.openSteps.clear(); lessonsWithChildren.forEach((p) => state.collapsedLessons.add(p)) }
      else { CHAPTERS.forEach((_, i) => state.openChapters.add(i)); substepParents.forEach((p) => state.openSteps.add(p)); state.collapsedLessons.clear() }
      renderToc()
    }
    toc.append(allBtn)

    const set = activeMode().get()
    CHAPTERS.forEach((ch, ci) => {
      // 펼침 여부는 openChapters 집합만으로 결정 — 현재 챕터도 수동으로 접을 수 있게.
      // (탐색 시엔 revealCurrent()가 해당 챕터를 미리 집합에 넣어 자동으로 열어 둔다.)
      const open = state.openChapters.has(ci)
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
        // 하위 단계(3-1…·5-1…) 아코디언: openSteps 집합에 부모가 있을 때만 하위를 보인다.
        // (탐색 시 revealCurrent()가 부모를 미리 넣어 자동으로 펼치되, ▸로 수동 접기는 항상 허용.)
        const stepOpen = (p) => state.openSteps.has(String(p))
        const hasSteps = (id) => ch.items.some((it) => typeof it === 'string' && new RegExp('^' + id + '-\\d+$').test(it))
        ch.items.forEach((id) => {
          const l = byId[id]
          if (!l) return
          // 강이 접혀 있으면 그 강의 자식(하위스텝·드릴)은 렌더하지 않는다(단일 chevron으로 스텝+드릴 함께 접힘).
          const parentL = lessonParent(id)
          if (parentL != null && state.collapsedLessons.has(parentL)) return
          const isSub = typeof id === 'string' && /-\d+$/.test(id) && byId[id.replace(/-\d+$/, '')]
          const row = document.createElement('div')
          row.className = 'toc-item-row'
          // 강 접기/펼치기 chevron(왼쪽, 파트처럼) — 자식(하위스텝·드릴)을 가진 강에. 접으면 그 강의 스텝+드릴 전부 숨김(기본 펼침).
          if (!l.step && kindOf(l) === 'lesson' && lessonsWithChildren.has(String(id))) {
            const lopen = !state.collapsedLessons.has(String(id))
            const chev = document.createElement('button')
            chev.className = 'toc-lesson-toggle' + (lopen ? ' open' : '')
            chev.textContent = '▸'
            chev.title = lopen ? '강 접기(하위 단계·드릴 숨김)' : '강 펼치기'
            chev.setAttribute('aria-label', chev.title)
            chev.onclick = (e) => { e.stopPropagation(); const k = String(id); state.collapsedLessons.has(k) ? state.collapsedLessons.delete(k) : state.collapsedLessons.add(k); renderToc() }
            row.append(chev)
          } else {
            const sp = document.createElement('span'); sp.className = 'toc-lesson-toggle-blank'; row.append(sp)
          }
          // 체크박스: 개념 서브내비(step)만 빼고 항상 표시. 각 항목은 '제 종류'의 집계셋에 연결
          // (개념 강의 → 📖 진도 셋, 실습 문제 → ✏️ 연습 셋). 모드 탭은 진행률 분모만 바꾼다.
          const isPr = isPracticeKind(l)
          // 탭별 필터: 진도 탭은 개념 강의만, 연습 탭은 드릴만 체크박스 노출(각 탭이 안 겹쳐 멘탈모델과 일치).
          const matchesTab = isPr === (state.checkMode === 'practice')
          if (!l.step && matchesTab) {
            const itemSet = isPr ? state.practice : state.study
            const cb = document.createElement('input')
            cb.type = 'checkbox'
            cb.className = 'toc-check'
            cb.checked = itemSet.has(id)
            cb.dataset.cid = id // 목차와 동기화용 키
            cb.setAttribute('aria-label', `${isPr ? '✏️ 연습' : '📖 진도'}: ${l.title}`)
            cb.onchange = () => setDone(id, cb.checked) // 중앙 토글 → 목차도 즉시 갱신
            row.append(cb)
          } else {
            const blank = document.createElement('span')
            blank.className = 'toc-check-blank'
            row.append(blank)
          }
          const btn = document.createElement('button')
          // 하위 항목(부모-번호 꼴, 예: 3-1)이면 부모 아래로 들여쓴다. 개념 단계(lesson)와 드릴(practice)은 색으로 구분.
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
  // 원리 심화 개념 강의 입구 — 파트 안 자연스러운 챕터지만, 급하면 다음 파트로 건너뛰게 안내.
  function deepBanner(skipTo) {
    const el = document.createElement('div')
    el.className = 'skip-banner'
    const msg = document.createElement('span')
    msg.innerHTML = '🧭 <b>원리 심화</b> — 값·객체가 메모리에서 어떻게 사는지 깊이 보는 장이에요. 이 커리큘럼의 핵심이지만, <b>급하면 다음 파트로 건너뛰어도</b> 됩니다 <b>(언제든 돌아오세요)</b>.'
    const btn = document.createElement('button')
    btn.className = 'chip on'
    btn.textContent = `${skipTo}강으로 건너뛰기 →`
    btn.onclick = () => go(skipTo)
    el.append(msg, btn)
    return el
  }

  function renderPage() {
    page.innerHTML = ''
    if (state.currentId === 'home') { page.append(renderHome()); return }
    const l = byId[state.currentId]
    if (!l) { page.append(renderHome()); return }
    // 원리 심화 개념 강의면 상단에 '건너뛰기' 배너를 (레슨과 별도 호스트로) 얹는다.
    const skipTo = DEEP_SKIP[String(state.currentId)]
    if (skipTo != null) page.append(deepBanner(skipTo))
    const host = document.createElement('div')
    page.append(host)
    try {
      if (kindOf(l) === 'practiceset') {
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
    const nav = pageNav()
    if (nav) page.append(nav)
    // 레슨 본문의 [data-goto] 버튼(예측 드릴 칩·개념 이동)을 전역 배선 — 레슨마다 wireGoto를 두지 않아도 동작.
    page.querySelectorAll('[data-goto]').forEach((b) => {
      b.onclick = () => { const t = b.getAttribute('data-goto'); const gid = /^\d+$/.test(t) ? Number(t) : t; window.goLesson ? window.goLesson(gid) : (location.hash = '#' + gid) }
    })
  }

  // 페이지 하단 이전/다음 — 모바일에서 목차 안 열고 순서대로(강의·드릴) 넘어가기.
  function pageNav() {
    const order = CHAPTERS.flatMap((c) => c.items).filter((id) => byId[id] && hasContent(id))
    const i = order.indexOf(state.currentId)
    if (i < 0) return null
    const label = (id) => {
      const l = byId[id]
      if (kindOf(l) === 'practiceset') return ((l.badge ? l.badge + ' ' : '') + (l.title || '') + (l.subtitle ? ' ' + l.subtitle : '')).trim()
      return l.title || String(id)
    }
    const btn = (id, dir) => {
      const b = document.createElement('button')
      b.className = 'page-nav-btn ' + dir
      b.innerHTML = `<span class="pn-dir">${dir === 'prev' ? '← 이전' : '다음 →'}</span><span class="pn-title">${label(id)}</span>`
      b.onclick = () => go(id)
      return b
    }
    const nav = document.createElement('nav')
    nav.className = 'page-nav'
    nav.append(i > 0 ? btn(order[i - 1], 'prev') : document.createElement('span'))
    nav.append(i < order.length - 1 ? btn(order[i + 1], 'next') : document.createElement('span'))
    return nav
  }

  // 실습 문제를 풀면(정답) 그 문제 항목을 '연습' 진도에 자동 체크한다.
  function markPractice(id) {
    if (state.practice.has(id)) return
    state.practice.add(id)
    saveSet('donePractice', state.practice)
    renderProgress()
    renderToc()
  }

  // 난이도별 실습 페이지 — 그 난이도 5문제를 '한 페이지에서 연속 반복'(stepped Drill).
  function renderDrillSet(l) {
    const tierMeta = TIERS.find((t) => t.key === l.tier)
    const cfg = window.Drills[l.tier][String(l.base)]
    const base = byId[l.base]
    const tierTag = tierMeta ? `${tierMeta.badge} ${tierMeta.label}` : '실습'
    const sec = document.createElement('section')
    sec.innerHTML = `
      <header class="lesson-header">
        <span class="badge">📝 ${base ? base.badge : ''} · ${tierTag}</span>
        <h2>${base ? base.title : ''} — ${tierTag} 실습</h2>
        <p>${cfg.pattern} · <b>${cfg.problems.length}문제</b>를 한 페이지에서 (하나 풀면 다음이 열려요).</p>
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
    // 책 목차 — 파트(접이식) → 강의 행(읽음 ○/✓) → 드릴 칩(각자 완료 ○/✓). 체크는 사이드바와 동기화.
    const parentOf = (id) => (typeof id === 'string' && /-\d+$/.test(id)) ? id.replace(/-\d+$/, '') : null
    const trackable = (id, l) => !isPracticeId(id) && l && !l.step
    const parts = CHAPTERS.map((ch, ci) => {
      let done = 0, total = 0
      const rows = ch.items.map((id) => {
        if (isPracticeId(id)) return '' // 드릴은 부모 강의 아래 묶어 그린다
        const l = byId[id]
        if (!l) return ''
        const sub = parentOf(id) && byId[parentOf(id)] ? ' sub' : ''
        const track = trackable(id, l)
        const on = track && isDone(id)
        if (track) { total++; if (on) done++ }
        const check = track
          ? `<input type="checkbox" class="bt-check" data-cid="${id}"${on ? ' checked' : ''} title="읽음 표시" aria-label="읽음 표시">`
          : '<span class="bt-check ghost"></span>'
        const flag = hasContent(id) ? '' : '<span class="bt-flag" title="준비 중">🚧</span>'
        const stext = (l.title + ' ' + (l.subtitle || '')).replace(/<[^>]+>/g, '').replace(/"/g, '').toLowerCase()
        const tiers = track ? practiceItemsFor(id) : []
        const drills = tiers.length ? `<div class="bt-drills">${tiers.map((p) => {
          const pon = isDone(p.id)
          return `<span class="bt-tier"><input type="checkbox" class="bt-tier-check" data-cid="${p.id}"${pon ? ' checked' : ''} title="완료 표시" aria-label="완료 표시"><button class="bt-tier-go" data-go="${p.id}">${p.badge} ${p.title} <span class="bt-tier-n">${p.subtitle}</span></button></span>`
        }).join('')}</div>` : ''
        return `<div class="bt-item" data-s="${stext}">
          <div class="bt-row${sub}" data-go="${id}">
            ${check}<span class="bt-title">${flag}${l.title}</span><span class="bt-dots"></span><span class="bt-sub">${l.subtitle || ''}</span>
          </div>${drills}
        </div>`
      }).join('')
      const label = ch.tag ? `${ch.tag} ${ch.title}` : `파트 ${ch.n} · ${ch.title}`
      const collapsed = state.homeCollapsed.has(ci) ? ' collapsed' : ''
      return `<div class="bt-part${collapsed}" data-pi="${ci}">
        <button class="bt-part-head" data-pi="${ci}"><span class="bt-chev">▸</span><span class="bt-part-label">${label}</span><span class="bt-part-count" data-ct>${done}/${total}</span></button>
        <div class="bt-part-body">${rows}</div>
      </div>`
    }).join('')
    sec.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🌱 → 💻</span>
        <h2>IT 전공자가 아닌 사람을 위한 JavaScript 입문</h2>
        <p><b>일은 하고 있지만 기초가 없어 답답했던</b> 사람을 위한, <b>기초를 밑바닥(제로)부터</b> 다지는 실습형 커리큘럼. 읽고 → 눌러 보고 → 같은 유형 5문제로 손에 붙인다.</p>
      </header>
      <div class="fit-check">
        <span class="fit-check-tag">🧭 이 강의, 나에게 맞나? (30초 체크)</span>
        <table class="fit-table"><tbody>
          <tr>
            <td class="fit-who">🎯 <b>비전공 실무자</b><span>일은 하지만 기초 없이 복붙·감으로 짜다 "왜 되는지"에서 막힘</span></td>
            <td class="fit-star">★★★★★</td>
            <td class="fit-verdict"><b>딱 맞음</b></td>
          </tr>
          <tr>
            <td class="fit-who">🌱 <b>완전 입문자</b><span>코드가 처음</span></td>
            <td class="fit-star">★★★☆☆</td>
            <td class="fit-verdict">OK — 이미 짜봤다면 "그래서 그때 그 버그가!" 더 세게</td>
          </tr>
          <tr>
            <td class="fit-who">🙅 <b>전공자·시니어</b><span>메모리·스택·참조가 이미 몸에 밴</span></td>
            <td class="fit-star">★★☆☆☆</td>
            <td class="fit-verdict">너무 기초일 수 (원리 체득용)</td>
          </tr>
        </tbody></table>
      </div>
      <div class="lesson-goal">
        <span class="lesson-goal-tag">이렇게 배워요</span>
        <p>아래는 <b>책 목차</b> — 제목을 누르면 그 강의로, <b>체크박스로 읽음/완료 표시</b>(사이드바와 자동 동기화), <b>파트 제목을 눌러 접기</b>, 위 칸에서 <b>검색</b>도 돼요.</p>
      </div>
      <input class="bt-search" type="search" placeholder="🔍 강의 검색 — 제목·설명으로 (예: 스택, map, 중첩, truthy)">
      <div class="book-toc">${parts}</div>
      <p class="section-desc" style="margin-top:16px">👉 <b>1강 · 값과 타입, 변수</b>부터 시작하세요.</p>
    `
    // 행·드릴 라벨 클릭 → 이동
    sec.querySelectorAll('.bt-row[data-go], .bt-tier-go[data-go]').forEach((el) => {
      el.onclick = (e) => { e.stopPropagation(); const v = el.getAttribute('data-go'); go(/^\d+$/.test(v) ? Number(v) : v) }
    })
    // 체크박스(개념 읽음 · 드릴 완료) → 중앙 토글(사이드바까지 즉시 동기화)
    sec.querySelectorAll('input.bt-check[data-cid], input.bt-tier-check[data-cid]').forEach((chk) => {
      chk.onclick = (e) => e.stopPropagation() // 체크 클릭이 행(bt-row) 이동을 트리거하지 않도록
      chk.onchange = () => setDone(chk.getAttribute('data-cid'), chk.checked)
    })
    // 파트 접기/펼치기
    sec.querySelectorAll('.bt-part-head[data-pi]').forEach((h) => {
      h.onclick = () => {
        const i = +h.getAttribute('data-pi')
        state.homeCollapsed.has(i) ? state.homeCollapsed.delete(i) : state.homeCollapsed.add(i)
        h.closest('.bt-part').classList.toggle('collapsed')
      }
    })
    // 검색 → 제목·설명 실시간 필터. 검색 중엔 접힘 무시(매칭을 보이게).
    const bookToc = sec.querySelector('.book-toc')
    const search = sec.querySelector('.bt-search')
    search.oninput = () => {
      const q = search.value.trim().toLowerCase()
      bookToc.classList.toggle('searching', !!q)
      sec.querySelectorAll('.bt-part').forEach((part) => {
        let any = false
        part.querySelectorAll('.bt-item').forEach((item) => {
          const hit = !q || (item.getAttribute('data-s') || '').includes(q)
          item.classList.toggle('bt-hide', !hit); if (hit) any = true
        })
        part.classList.toggle('bt-hide', !any)
      })
    }
    return sec
  }

  // 열린 메뉴(활성 항목)를 사이드바 목차의 '정중앙'으로 스크롤한다.
  // window는 안 건드리고 .toc(overflow-y:auto) 내부만 움직인다 — getBoundingClientRect 델타로 위치 무관 계산.
  function centerActiveInToc(smooth) {
    const el = toc.querySelector('.toc-item.active') || toc.querySelector('.toc-home.active')
    if (!el || toc.clientHeight === 0) return // 접힌/숨은 사이드바(모바일)면 건너뜀
    requestAnimationFrame(() => {
      const tr = toc.getBoundingClientRect()
      const er = el.getBoundingClientRect()
      const delta = (er.top - tr.top) - (tr.height - er.height) / 2 // 항목을 toc 뷰 정중앙으로
      toc.scrollTo({ top: toc.scrollTop + delta, behavior: smooth ? 'smooth' : 'auto' })
    })
  }

  // ── 내비게이션 ────────────────────────────────────────────
  let firstSync = true
  function go(id) {
    state.currentId = id
    revealCurrent()
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
    centerActiveInToc(true)
    renderPage()
  }

  // 레슨 안의 버튼(개념→실습 CTA 등)이 직접 이동을 부를 수 있게 훅을 노출한다.
  window.goLesson = go

  window.addEventListener('hashchange', () => {
    const h = hashToId()
    if (validId(h) && h !== state.currentId) { state.currentId = h; revealCurrent(); renderToc(); centerActiveInToc(true); renderPage() }
  })
  window.addEventListener('resize', () => { backdrop.hidden = !state.sidebarOpen || window.innerWidth > 720 })

  // ── 최초 그리기 ───────────────────────────────────────────
  setSidebar(window.innerWidth > 720 && state.sidebarOpen) // 모바일은 콘텐츠 먼저 — ☰로 목차 연다
  revealCurrent()
  renderCheckTabs()
  renderProgress()
  renderToc()
  centerActiveInToc(false) // 최초 로드 — 현재 강의를 정중앙에 (애니메이션 없이 즉시)
  renderPage()
})()
