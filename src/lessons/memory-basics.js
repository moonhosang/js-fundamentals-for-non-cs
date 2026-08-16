// 🧠 메모리 기초 챕터 — 메모리(주로 RAM) → 스택 → 힙 → 값복사vs참조 (바닥부터 단계별)
// [notional machine] 실제 CPU가 아니라 "이렇게 상상하면 동작을 정확히 예측하는" 일관된 모형.
// 콜 스택 심화·클로저는 함수(5강) 뒤 '메모리 심화'로.

;(function () {
  window.Lessons = window.Lessons || {}

  const wireCTA = (root) => {
    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(/^\d+$/.test(t) ? Number(t) : t) : (location.hash = '#' + t) }
  }

  // ══ M1 · 메모리(Memory)란 — 주로 RAM ═══════════════════════
  // 📇 이름표 장부 = 사상(Map): 이름(●) ──화살표──▶ 🗄️ 메모리 칸(주소:값).
  // names: [{name, c, to(=cell id)}], cells: [{id, val, adr, at, c}]. 여러 이름이 한 셀을 가리키면 = 별칭.
  function buildNameMap(ledgerHead, ramHead, names, cells, N) {
    const NS = 'http://www.w3.org/2000/svg'
    const stage = document.createElement('div'); stage.className = 'namemap'
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'nm-arrows')
    const ledger = document.createElement('div'); ledger.className = 'nm-ledger'
    ledger.innerHTML = `<div class="nm-head">${ledgerHead}</div>`
    const frame = document.createElement('div'); frame.className = 'nm-frame'
    names.forEach((it, i) => {
      const row = document.createElement('div'); row.className = 'nm-src'; row.dataset.k = i
      row.innerHTML = `<span class="nm-name" style="color:${it.c}">${it.name}${it.tag ? ` <small>${it.tag}</small>` : ''}</span><span class="nm-dot" style="color:${it.c};background:${it.c}"></span>`
      frame.append(row)
    })
    ledger.append(frame)
    const ram = document.createElement('div'); ram.className = 'nm-ram'
    ram.innerHTML = `<div class="nm-head">${ramHead}</div>`
    const grid = document.createElement('div'); grid.className = 'ram-grid'
    const dots = () => { const d = document.createElement('span'); d.className = 'ram-dots'; d.textContent = '⋯'; return d }
    const byAt = {}; cells.forEach((c) => { byAt[c.at] = c })
    grid.append(dots())
    for (let j = 0; j < N; j++) {
      const c = byAt[j]
      if (c) {
        const hi = document.createElement('div'); hi.className = 'ram-hi nm-dst'; hi.dataset.cell = c.id
        hi.innerHTML = `<span class="cell" style="border-color:${c.c};color:${c.c};background:${c.c}1a">${String(c.val).replace(/</g, '&lt;')}</span><span class="adr">${c.adr}</span>`
        grid.append(hi)
      } else { const el = document.createElement('div'); el.className = 'ram-c'; grid.append(el) }
    }
    grid.append(dots())
    ram.append(grid)
    stage.append(ledger, ram, svg)
    const draw = () => {
      const sb = stage.getBoundingClientRect(); if (!sb.width) return
      while (svg.firstChild) svg.removeChild(svg.firstChild)
      names.forEach((it, i) => {
        const src = stage.querySelector(`.nm-src[data-k="${i}"] .nm-dot`)
        const dst = stage.querySelector(`.nm-dst[data-cell="${it.to}"] .cell`)
        if (!src || !dst) return
        const s = src.getBoundingClientRect(), d = dst.getBoundingClientRect()
        const x1 = s.left + s.width / 2 - sb.left, y1 = s.top + s.height / 2 - sb.top
        const x2 = d.left - sb.left - 3, y2 = d.top + d.height / 2 - sb.top
        const mx = x1 + Math.max(24, (x2 - x1) * 0.5)
        const p = document.createElementNS(NS, 'path')
        p.setAttribute('d', `M ${x1} ${y1} C ${mx} ${y1}, ${x2 - 28} ${y2}, ${x2} ${y2}`)
        p.setAttribute('stroke', it.c); p.setAttribute('fill', 'none'); p.setAttribute('stroke-width', '2'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('opacity', '0.85')
        svg.append(p)
        const h = document.createElementNS(NS, 'path')
        h.setAttribute('d', `M ${x2} ${y2} l -7 -4 l 0 8 z`); h.setAttribute('fill', it.c)
        svg.append(h)
      })
    }
    if (window.ResizeObserver) { try { new ResizeObserver(draw).observe(stage) } catch (e) {} }
    if (window.requestAnimationFrame) requestAnimationFrame(() => requestAnimationFrame(draw))
    window.addEventListener('resize', draw)
    return stage
  }

  window.Lessons['ram'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M1</span>
        <h2>메모리(Memory) — 값이 잠깐 사는 작업 공간</h2>
        <p>변수에 값을 담으면 그 값은 <b>어딘가에</b> 실제로 저장된다. 그 어딘가가 <b>메모리</b>다 — 프로그램이 도는 동안 값을 두는 곳. (그중 우리가 주로 쓰는 게 <b>RAM</b>.) 스택·힙을 배우기 전에, 그 무대부터 본다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><b>메모리</b>는 프로그램이 <b>값을 잠깐 적어두는</b> 아주 빠른 작업 공간이다. (우리가 주로 쓰는 종류가 <b>RAM</b> — Random Access Memory.)
        번호(<b>주소</b>)가 붙은 칸이 줄지어 있고, 변수는 그중 어떤 칸에 값을 적고 <b>이름표</b>를 붙인 것이다.</p>
      </div>

      <div class="card" style="background:color-mix(in srgb, var(--muted) 6%, var(--panel));border-style:dashed">
        <p class="section-desc" style="margin:0;font-size:13px">ℹ️ <b>안내 — 입문자를 위해 단순화했습니다.</b> 우리는 값이 사는 곳을 그냥 "<b>메모리</b>"라 부르지만(주로 <b>RAM</b>), 실제 메모리는
        <b>CPU 캐시(L1·L2·L3) → RAM → 디스크 스왑</b>으로 이어진 <b>여러 층(메모리 계층)</b>입니다. 여기선 값이 '<b>어디에</b> 사는지'의 감을 위해 <b>RAM 한 층으로 뭉뚱그렸고</b>, CPU 캐시·디스크 스왑은 <b>의도적으로 뺐습니다</b>. 스택·힙도 <b>개념 모델</b>이고요.</p>
        <p class="section-desc" style="margin:8px 0 0;font-size:12.5px">📚 <b>더 깊이 (선택) — 우리가 단순화한 것들의 진짜 이름:</b></p>
        <ul style="margin:6px 0 0;padding-left:18px;font-size:12.5px;line-height:1.9;color:var(--muted)">
          <li><b>전체 그림</b> → <a href="https://ko.wikipedia.org/wiki/메모리_계층_구조" target="_blank" rel="noopener noreferrer">메모리 계층 구조 ↗</a></li>
          <li><b>우리가 "메모리"라 부른 것</b> → <a href="https://ko.wikipedia.org/wiki/랜덤_액세스_메모리" target="_blank" rel="noopener noreferrer">랜덤 액세스 메모리(RAM) ↗</a></li>
          <li><b>뺀 층 ①</b> CPU 옆 초고속 임시저장 → <a href="https://ko.wikipedia.org/wiki/CPU_캐시" target="_blank" rel="noopener noreferrer">CPU 캐시 ↗</a></li>
          <li><b>뺀 층 ②</b> RAM이 모자라면 디스크를 빌려 씀 → <a href="https://ko.wikipedia.org/wiki/가상_메모리" target="_blank" rel="noopener noreferrer">가상 메모리(디스크 스왑) ↗</a></li>
          <li><b>이름표 장부 쪽</b> 함수가 쌓였다 사라지는 구조 → <a href="https://ko.wikipedia.org/wiki/콜_스택" target="_blank" rel="noopener noreferrer">콜 스택 ↗</a></li>
          <li><b>값 메모리(힙) 쪽</b> 객체가 사는 곳의 관리 방식 → <a href="https://ko.wikipedia.org/wiki/동적_메모리_할당" target="_blank" rel="noopener noreferrer">동적 메모리 할당 ↗</a></li>
        </ul>
      </div>

      <h3 class="section-title">① 왜 메모리가 필요한가</h3>
      <p class="section-desc">컴퓨터가 <code>3 + 4</code>를 계산하려면 <b>3</b>과 <b>4</b>를 잠깐 어딘가에 적어둬야 한다. 그 "메모장"이 메모리다.
      변수 <code>let age = 20</code>은 곧 <b>"메모리 한 칸에 20을 적고 age라는 이름을 붙여라"</b>는 뜻이다.</p>

      <h3 class="section-title">② 메모리의 모습 — 주소가 붙은 칸들</h3>
      <span class="learn-tag">📎 칸마다 번호(주소)가 있어 CPU가 아무 칸이나 즉시 읽는다 (그래서 RAM = <b>R</b>andom <b>A</b>ccess <b>M</b>emory)</span>
      <div class="card">
        <div class="file-label">📄 변수명은 어디 있나? — 이름은 '장부', 값은 '메모리 칸' (따로다)</div>
        <div data-m="ramgrid"></div>
        <p class="section-desc" style="margin:10px 0 0">헷갈리기 쉬운 것 — <b>변수 이름(age)은 메모리 칸 안에 있는 게 아니다.</b> 이름은 <b>📇 이름표 장부</b>에 살며 <b>주소(#0042)로 그 칸을 가리킬</b> 뿐이다. 실제 <b>값</b>은 <b>🗄️ 메모리의 그 주소 칸</b>에 있다. (메모리는 수십억 칸 ⋯. 원시값 칸=스택 구역·객체 칸=힙 구역 — 다음 M2·M3)</p>
      </div>

      <div class="card" style="background:color-mix(in srgb, #f59e0b 8%, var(--panel));border-color:color-mix(in oklab, #f59e0b 32%, var(--border))">
        <div class="file-label" style="color:#b45309">💡 토막상식 — 왜 변수가 순서대로 가지런히 안 놓일까?</div>
        <ul class="section-list" style="margin-bottom:0">
          <li><b>빈 자리에 아무 데나</b> — 값이 생겼다 사라지길 반복하면 칸 사이사이 <b>빈틈</b>이 생긴다(<b>파편화</b>, fragmentation). 새 값은 '들어갈 만한 빈 곳'에 놓인다. 주소는 우리가 고르는 게 아니라 <b>메모리 관리자(할당자)</b>가 정한다.</li>
          <li><b>스택은 사실 가지런하다</b> — 착착 쌓이는 <b>스택</b>(다음 강의)의 지역변수는 순서대로다. 흩어지는 건 주로 <b>힙</b>(객체·배열) — 크기가 제각각이라 빈 곳에 끼워 넣는다.</li>
          <li><b>일부러 무작위로도</b> — 요즘 시스템은 보안상 위치를 <b>랜덤</b>하게 흩뿌린다(<b>ASLR</b>) — 해커가 "그 값이 어디 있는지" 못 찍게.</li>
        </ul>
        <p class="section-desc" style="margin:8px 0 0">그래서 이 그림은 <b>개념도</b>일 뿐 — 진짜 주소는 <b>실행할 때마다 다르다</b>.</p>
      </div>

      <h3 class="section-title">③ 칸에 이름 붙이기 — let · const · var (변수 vs 상수)</h3>
      <span class="learn-tag">📎 셋 다 '장부에 이름을 올린다'. 차이는 값 종류가 아니라 — 장부 칸에 <b>담긴 것</b>을 나중에 바꿀 수 있느냐</span>
      <p class="section-desc">이름을 <b>장부(변수 관리 영역)</b>에 올리는 걸 <b>선언</b>이라 한다. 값(원시값이든 객체든)은 <b>값 메모리</b>에 살고, 장부 칸은 <b>이름과 가리키는 화살표</b>를 쥔다. 올리는 방법이 셋 — <b>화살표를 나중에 옮길 수 있느냐</b>만 다르다:</p>
      <ul class="section-list">
        <li><code>let</code> — <b>변수</b>: 장부 칸에 <b>담긴 것을 나중에 바꿀 수 있다</b>(재할당 O).</li>
        <li><code>const</code> — <b>상수</b>: 장부 칸에 <b>담긴 것을 한 번 정하면 못 바꾼다</b>(재할당 X). "안 바뀔 값"(세율·원주율·설정값)에 쓴다.</li>
        <li><code>var</code> — <b>옛날 방식</b>: 스코프·순서 함정이 있어 <b>지금은 거의 안 쓴다</b>. <b>let·const만</b> 기억하면 된다.</li>
      </ul>
      <div class="card">
        <div class="file-label">📍 이름은 '장부'에, 값은 '메모리 칸'에 — 변수는 주소로 그 칸을 가리킨다</div>
        <div data-m="letconst-ram"></div>
        <p class="section-desc" style="margin:10px 0 0">주소 <code>#0042</code>는 <b>기계가 쓰는 번호</b>일 뿐 — 사람은 못 외우고, 실행할 때마다 바뀐다(위 💡). 그래서 그 칸에 <b>접근하려고</b> 사람이 부를 이름(<b>변수</b>)을 붙인다 — <code>score</code>라고 쓰면 그 칸에 닿는다. (원시값도 <b>값 메모리 칸</b>에 살고, 변수는 <b>화살표로 가리킨다</b>.) <code>🏷️ score</code>(let)는 화살표를 <b>다른 값으로 옮길 수 있고</b>, <code>🔒 PI</code>(const)는 <b>화살표가 잠겨</b> 못 옮긴다.</p>
      </div>
      <div class="card">
        <div class="file-label">🎬 눈으로 — 원시값도 값 메모리에, let은 화살표를 옮기고 const는 잠근다 (▶ 한 단계씩)</div>
        <div data-m="letconst-viz"></div>
      </div>
      <div class="card">
        <div class="file-label">🔬 const를 옮기려 하면? (▶ 실행해서 에러를 직접 보라)</div>
        <div data-m="letconst"></div>
      </div>
      <p class="section-desc">🔑 흔한 오해 — "const는 <b>값</b>을 못 바꾸는 것"? ❌. const가 막는 건 <b>이름표를 옮기는 것(재할당)</b>이지 값의 타입·내용이 아니다. (객체를 const로 잡아도 그 <b>안의 내용</b>은 바뀔 수 있다 — 이름표만 고정. 자세힌 🧠 M4)</p>

      <h3 class="section-title">④ 이름표를 떼면? — <code>null</code> · <code>undefined</code> · <code>""</code> 과 GC</h3>
      <span class="learn-tag">📎 이름표(변수)가 없어진 값은 못 찾는다 → JS가 자동으로 치운다(가비지 컬렉션). 그리고 null을 넣어도 '슬롯'에 써질 뿐</span>
      <div class="card" style="background:color-mix(in srgb, #f59e0b 8%, var(--panel));border-color:color-mix(in oklab, #f59e0b 32%, var(--border))">
        <div class="file-label" style="color:#b45309">💡 토막상식 — 접근용 이름(변수)이 하나도 없으면?</div>
        <ul class="section-list" style="margin-bottom:0">
          <li><b>닿을 방법이 없다</b> — 주소는 사람이 못 쓰니(위), 이름표가 없는 값은 사실상 <b>잃어버린 값</b>이다. 다시 꺼낼 손잡이가 없다.</li>
          <li><b>그럼 JS가 치운다</b> — 아무도 안 가리키는 값은 <b>가비지 컬렉션(GC)</b>이 자동으로 수거해 그 칸을 비운다. 그래서 안 쓰는 메모리를 <b>손으로 안 지워도 된다</b>.</li>
          <li>예: <code>let box = { … }</code> 뒤 <code>box = null</code> 하면, 그 객체는 이제 이름표가 없어 → 곧 청소된다.</li>
        </ul>
        <p class="section-desc" style="margin:8px 0 0">뒤집으면 — <b>값을 계속 쓰려면 이름표를 붙여 둬야 한다</b>. 이름표 = <b>접근 + 생존</b>. (자세힌 뒤 '가비지 컬렉션' 강의에서)</p>
      </div>

      <div class="card">
        <div class="file-label">🔬 그럼 <code>box = null</code>은 어디에 써질까? (▶ — 장부 칸엔 null, 값 메모리 객체는 버려짐)</div>
        <div data-m="boxnull-viz"></div>
        <p class="section-desc" style="margin:10px 0 0">null이 <b>값 메모리(객체)에 써지는 게 아니다</b> — <b>장부의 box 칸</b>에 null이 써지고(화살표 끊김), 값 메모리의 객체는 손 안 대고 버려져 GC 대상이 된다. <b>변수(장부 칸) ≠ 그가 가리키던 값(값 메모리)</b>.</p>
      </div>
      <p class="section-desc" style="margin-bottom:6px">그리고 <code>box = null</code> · <code>box = undefined</code> · <code>box = ""</code> — <b>객체를 버리는 건 셋 다 똑같다</b>(참조가 끊겨 고아 → GC). 다만 <b>box 슬롯에 남는 값</b>이 다르다:</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:12.5px">
          <tr style="text-align:left;color:var(--muted)">
            <th style="padding:6px 9px;border-bottom:2px solid var(--border)">대입</th>
            <th style="padding:6px 9px;border-bottom:2px solid var(--border)">box에 남는 값</th>
            <th style="padding:6px 9px;border-bottom:2px solid var(--border)">typeof</th>
            <th style="padding:6px 9px;border-bottom:2px solid var(--border)">힙 객체</th>
          </tr>
          <tr>
            <td style="padding:6px 9px;border-bottom:1px solid var(--border);font-family:var(--font-mono)">box = null</td>
            <td style="padding:6px 9px;border-bottom:1px solid var(--border)"><b>null</b> · 일부러 '없음'</td>
            <td style="padding:6px 9px;border-bottom:1px solid var(--border);font-family:var(--font-mono)">"object" ⚠️</td>
            <td style="padding:6px 9px;border-bottom:1px solid var(--border);color:#dc2626">버려짐 → GC</td>
          </tr>
          <tr>
            <td style="padding:6px 9px;border-bottom:1px solid var(--border);font-family:var(--font-mono)">box = undefined</td>
            <td style="padding:6px 9px;border-bottom:1px solid var(--border)"><b>undefined</b> · 값 미정</td>
            <td style="padding:6px 9px;border-bottom:1px solid var(--border);font-family:var(--font-mono)">"undefined"</td>
            <td style="padding:6px 9px;border-bottom:1px solid var(--border);color:#dc2626">버려짐 → GC</td>
          </tr>
          <tr>
            <td style="padding:6px 9px;font-family:var(--font-mono)">box = ""</td>
            <td style="padding:6px 9px"><b>""</b> · 빈 문자열(값은 있음)</td>
            <td style="padding:6px 9px;font-family:var(--font-mono)">"string"</td>
            <td style="padding:6px 9px;color:#dc2626">버려짐 → GC</td>
          </tr>
        </table>
      </div>
      <p class="section-desc">🔑 <b>값 메모리의 객체를 버리는 효과는 셋 다 같다</b>(참조가 끊기니까 GC 대상). 차이는 <b>장부 칸에 남는 값·타입·의미</b>뿐 — <code>null</code>(일부러 비움) / <code>undefined</code>(값 미정) / <code>""</code>(빈 문자열, 여전히 값 있음). (<code>typeof null === "object"</code>는 JS의 유명한 버그.)</p>
      <p class="section-desc" style="opacity:.85">❓ "그런데 <code>null</code>은 어디 있지? 전역변수 같은 건가?" — <b>아니다.</b> <code>null</code>·<code>undefined</code>는 <b>변수가 아니라 값(리터럴)</b>이다 — <code>5</code>·<code>"hi"</code>처럼 그냥 쓰는 값일 뿐. '전역에 딱 하나 있는 무언가'가 아니라, 대입하면 그 변수가 가리키는 <b>원시값</b>이다(그래서 다른 원시값처럼 값 메모리에 담기고 이름표가 가리킨다).</p>

      <h3 class="section-title">⑤ 휘발성 — 끄면 사라진다 (디스크와 다름)</h3>
      <div data-m="qz"></div>
      <span class="learn-tag">📎 메모리(작업용 RAM) = 넓고 빠른 '작업 책상' · 디스크(SSD) = 느리지만 영구인 '서랍'</span>
      <ul class="section-list">
        <li><b>메모리(RAM)</b> — 빠르고 넓지만 <b>전원이 꺼지면 싹 지워진다</b>(휘발성). 프로그램이 도는 <b>동안만</b> 값을 둔다.</li>
        <li><b>디스크/SSD</b> — 느리지만 <b>영구</b>. 파일 저장, 사진, 문서는 여기에.</li>
        <li>비유: 메모리는 지금 펼쳐 놓은 <b>작업 책상</b>(끝나면 치움), 디스크는 <b>서랍/캐비닛</b>(계속 보관).</li>
      </ul>

      <h3 class="section-title">⑥ 이 메모리를 '두 방식'으로 나눠 쓴다</h3>
      <p class="section-desc">프로그램은 이 메모리를 아무렇게나 쓰지 않고, 성격이 다른 <b>두 방식</b>으로 나눠 쓴다 — <b>스택</b>과 <b>힙</b>.
      다음 두 강의에서 각각 자세히 본다.</p>
      <div class="card">
        <div class="file-label">🗺️ 앞으로</div>
        <ul class="section-list" style="margin:0">
          <li><b>M2 · 스택</b> — 작고 빠르게 쌓고 뗀다(원시값·이름표 슬롯).</li>
          <li><b>M3 · 힙</b> — 크고 변하는 묶음(객체·배열)을 두는 창고.</li>
        </ul>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">값은 <b>메모리</b>(주로 RAM)의 <b>주소 붙은 칸</b>에 저장된다. 변수 = 그 칸에 값을 적고 이름표를 붙인 것.
        메모리는 빠르지만 <b>끄면 사라진다</b>. 이 메모리를 스택·힙 두 방식으로 나눠 쓴다.</p>
      </div>

      <div class="practice-cta">
        <span>먼저 '스택' 방식부터 자세히 —</span>
        <button class="chip on" data-goto="stack">🧠 M2 · 스택 →</button>
      </div>
    `
    // 📇 이름표 장부(이름→●) ──화살표──▶ 🗄️ 메모리 칸(값). 변수명 공간과 메모리를 분리해 보인다.
    const grid = root.querySelector('[data-m="ramgrid"]')
    if (grid) {
      grid.append(buildNameMap(
        '📇 이름표 장부 <small>— 변수명이 사는 곳 (이름 → 칸)</small>',
        '🗄️ 메모리 <small>— 값이 사는 물리 칸 (주소마다). 이름은 여기 없다!</small>',
        [
          { name: 'age', c: '#16a34a', to: 'a1' },
          { name: 'done', c: '#0891b2', to: 'a2' },
          { name: 'card', c: '#6366f1', to: 'a3' },
        ],
        [
          { id: 'a1', val: '20', adr: '#0042', at: 3, c: '#16a34a' },
          { id: 'a2', val: 'true', adr: '#0043', at: 10, c: '#0891b2' },
          { id: 'a3', val: '{ name: "민지" }', adr: '#0055', at: 17, c: '#6366f1' },
        ], 24,
      ))
    }
    const g2 = root.querySelector('[data-m="letconst-ram"]')
    if (g2) {
      g2.append(buildNameMap(
        '📇 이름표 장부 <small>— 이름(+let/const) → 칸</small>',
        '🗄️ 메모리 <small>— 값 칸 (이름 없음)</small>',
        [
          { name: '🏷️ score', tag: 'let', c: '#16a34a', to: 's1' },
          { name: '🔒 PI', tag: 'const', c: '#dc2626', to: 's2' },
        ],
        [
          { id: 's1', val: '20', adr: '#0042', at: 4, c: '#16a34a' },
          { id: 's2', val: '3.14', adr: '#0043', at: 12, c: '#dc2626' },
        ], 22,
      ))
    }
    root.querySelector('[data-m="letconst-viz"]').append(MemoryModel({
      title: 'let은 화살표를 옮기고 · const는 잠근다 (값은 값 메모리에)',
      stackLabel: '📇 이름표 장부 (변수)', heapLabel: '🗄️ 값 메모리',
      code: ['let score = 10', 'score = 20        // let: 값 바꾸기 OK', 'const PI = 3.14', 'PI = 3            // const: ❌ 못 바꿈'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'score', value: '10' }] }], heap: {},
          note: '<code>let score = 10</code> — 장부에 이름 <b>score</b>, 화살표가 값 메모리의 <b>10</b>을 가리킨다(장부엔 이름+화살표).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'score', value: '20', bad: true }] }], heap: {},
          note: '<code>score = 20</code> → score가 가리키는 <b>값이 20으로 바뀐다</b>(재할당). let이라 가능. (원시값의 불변·화살표 이동은 🧠 M4에서 정밀하게)' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'score', value: '20' }, { name: '🔒 PI', value: '3.14' }] }], heap: {},
          note: '<code>const PI = 3.14</code> — 장부에 <b>PI</b>, 화살표가 값 메모리의 3.14를 가리킨다. 이 <b>화살표는 🔒 잠긴다</b>.' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'score', value: '20' }, { name: '🔒 PI', value: '3.14' }] }], heap: {},
          note: '<code>PI = 3</code> → 화살표가 잠겨 <b>다른 값을 못 가리킨다 → ❌ 에러</b>. PI는 그대로 3.14. (score(let)는 화살표를 옮겼지만 PI(const)는 못 옮긴다.)' },
      ],
    }))
    root.querySelector('[data-m="boxnull-viz"]').append(MemoryModel({
      title: 'box = null — 장부 칸엔 null, 값 메모리의 객체는 버려진다',
      stackLabel: '📇 이름표 장부 (변수)', heapLabel: '🗄️ 값 메모리',
      code: ['let box = { name: "민지" }', 'box = null'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'box', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"민지"' }] } },
          note: '<code>box = { … }</code> — 객체라 실체는 <b>값 메모리(힙)</b>에. 장부의 box 칸엔 <b>주소(화살표)</b>만 담긴다. (원시값과 달리 값이 장부 밖에 있다)' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'box', value: 'null' }] }], heap: { h1: { fields: [{ key: 'name', value: '"민지"' }], faded: true } },
          note: '<code>box = null</code> → <b>장부의 box 칸에 null</b>이 써진다(화살표 끊김). <b>값 메모리의 객체는 손 안 대고 그대로</b> — 다만 아무도 안 가리켜 <b>고아(회색) → 나중에 GC 수거</b>. null이 값 메모리에 써지는 게 아니다.' },
      ],
    }))
    root.querySelector('[data-m="letconst"]').append(Runner({
      showBox: false,
      code: [
        'const rate = 0.1     // 세율 — 안 바뀔 값이라 const(상수)',
        'rate = 0.2           // 이름표를 옮기려 하면?',
        '// ▶ 실행하면 "Assignment to constant variable" 에러 — const가 막는다',
      ].join('\n'),
    }))
    root.querySelector('[data-m="qz"]').append(Quiz({
      q: '<code>let x = 10</code> 을 실행한 프로그램을 <b>껐다가 다시 켜면</b> x는?',
      options: ['10 그대로 — 자동 저장됨', '없다 — 메모리는 껐다 켜면 싹 지워진다(휘발성)'],
      answer: 1,
      explain: '변수 값은 <b>메모리(RAM)</b>에 있고, 메모리는 <b>전원이 꺼지면 사라진다</b>(휘발성). 남기려면 <b>디스크(파일·DB)</b>에 따로 저장해야 한다 — 파일처럼 자동으로 남지 않는다.',
    }))
    wireCTA(root)
  }

  // ══ M2 · 스택 ═══════════════════════════════════════════════
  const SCENARIO_STACK_SLOTS = {
    title: '스택 = 이름표 장부 — 이름표가 값째로 쌓인다',
    stackLabel: '📚 스택 (= M1의 이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: ['let age = 20', 'let count = 3', 'let ok = true'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }] }], heap: {}, note: '<b>age</b>라는 이름표가 스택에 놓인다 — 값 20을 가진다. (왼쪽 age=이름, 오른쪽 20=값)' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'count', value: '3' }] }], heap: {}, note: 'count 이름표가 그 위에 쌓인다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'count', value: '3' }, { name: 'ok', value: 'true' }] }], heap: {}, note: '스택에 쌓이는 건 <b>이름표(변수)</b>다. 원시값도 값 메모리에 살고 이름표가 <b>가리킨다</b> — <b>이름표(age) ≠ 값(20)</b>. 이 경계가 핵심.' },
    ],
  }
  const SCENARIO_PUSHPOP = {
    title: '함수가 함수를 부르면 — 칸이 쌓였다 사라진다',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: [
      'function makeGreeting(name) {',
      '  return "안녕, " + name + "님"',
      '}',
      'function welcome(name) {',
      '  let msg = makeGreeting(name)',
      '  return "🎉 " + msg',
      '}',
      'const say = welcome("민지")',
    ],
    steps: [
      { line: 7, stack: [{ name: 'main', slots: [{ name: 'say', value: '(대기)', bad: true }] }, { name: 'welcome', slots: [{ name: 'name', value: '"민지"' }] }], heap: {},
        note: 'welcome("민지") 호출 → 스택에 <b>welcome 칸</b>이 push. 인수 "민지"가 name에. (main의 say는 아직 대기 — 반환을 기다린다)' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'say', value: '(대기)', bad: true }] }, { name: 'welcome', slots: [{ name: 'name', value: '"민지"' }] }, { name: 'makeGreeting', slots: [{ name: 'name', value: '"민지"' }] }], heap: {},
        note: 'welcome 안에서 makeGreeting을 부른다 → <b>또 push</b>. 이제 프레임이 <b>3개</b>(main · welcome · makeGreeting) 쌓였다.' },
      { line: 5, stack: [{ name: 'main', slots: [{ name: 'say', value: '(대기)', bad: true }] }, { name: 'welcome', slots: [{ name: 'name', value: '"민지"' }, { name: 'msg', value: '"안녕, 민지님"' }] }], heap: {},
        note: 'makeGreeting가 값을 반환 → 그 칸이 <b>통째로 pop(사라짐)</b>. 반환값이 welcome의 <b>msg</b>에 담긴다.' },
      { line: 7, stack: [{ name: 'main', slots: [{ name: 'say', value: '"🎉 안녕, 민지님"' }] }], heap: {},
        note: 'welcome도 반환 → <b>pop</b>. name·msg는 <b>사라졌지만</b>, 반환값은 main의 <b>say</b>에 담겼다. <b>프레임은 사라져도 결과는 남는다</b>(return으로 빼냈으니까 — §4의 이유).' },
    ],
  }
  // ⑤ 스코프 — 전역 장부 vs 함수 장부(프레임), 접근 범위.
  const SCENARIO_SCOPE = {
    title: '전역 장부 vs 함수 장부(프레임) — 접근 범위가 다르다',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: [
      'let appName = "메모장"       // 전역변수 (함수 밖)',
      'function greet(user) {',
      '  let hi = appName + " · " + user + " 님"   // 지역변수',
      '  return hi',
      '}',
      'greet("민지")',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main · 전역 장부', slots: [{ name: 'appName', value: '"메모장"' }] }], heap: {},
        note: 'appName은 함수 <b>밖</b>(맨 바깥)에 선언 → <b>전역 장부</b>에 산다. 프로그램 내내 살고 <b>어디서나</b> 접근된다(전역변수).' },
      { line: 1, stack: [{ name: 'main · 전역 장부', slots: [{ name: 'appName', value: '"메모장"' }] }, { name: 'greet · 함수 장부', slots: [{ name: 'user', value: '"민지"' }] }], heap: {},
        note: 'greet("민지") 호출 → <b>새 장부(프레임)가 push</b>. 매개변수 <b>user</b>는 이 <b>greet 장부</b>의 지역변수.' },
      { line: 2, stack: [{ name: 'main · 전역 장부', slots: [{ name: 'appName', value: '"메모장"' }] }, { name: 'greet · 함수 장부', slots: [{ name: 'user', value: '"민지"' }, { name: 'hi', value: '"메모장 · 민지 님"' }] }], heap: {},
        note: '<b>hi</b>도 greet 장부의 지역변수. 이 안에선 <b>appName(전역)도 보이고</b> user·hi(지역)도 보인다 — 안쪽 장부는 바깥 장부를 <b>참고할 수 있다</b>(스코프).' },
      { line: 5, stack: [{ name: 'main · 전역 장부', slots: [{ name: 'appName', value: '"메모장"' }] }], heap: {},
        note: 'greet 끝 → <b>함수 장부 pop</b>. user·hi(지역변수)는 <b>사라진다</b>. 바깥(전역)에선 hi를 <b>못 쓴다</b>(스코프 밖 = 접근 불가). appName(전역)은 그대로.' },
    ],
  }
  window.Lessons['stack'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M2</span>
        <h2>스택 — 이름표 장부가 쌓이는 곳</h2>
        <p>M1에서 메모리를 <b>변수 영역</b>과 <b>값 메모리</b> 둘로 나눴다. 그중 <b>변수 영역(이름표 장부)이 바로 이 스택</b>이다 — 이름표 슬롯을 <b>작고 빠르게</b> 쌓고(push) 뗀다(pop).</p>
      </header>

      <div data-m="qzs"></div>
      <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/콜_스택" target="_blank" rel="noopener noreferrer">콜 스택 ↗</a> · <a href="https://ko.wikipedia.org/wiki/스택_(자료_구조)" target="_blank" rel="noopener noreferrer">스택(자료구조) ↗</a></p>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔗 M1에서 이어집니다</div>
        <p class="section-desc" style="margin:0">M1의 <b>📇 이름표 장부(변수 영역)</b> = 지금 배울 <b>📚 스택</b>. 같은 것을 <b>쌓임(LIFO)</b>이라는 각도에서 자세히 본다. (다른 구역 <b>🗄️ 값 메모리 = 힙</b>은 다음 M3)</p>
      </div>

      <h3 class="section-title">① 스택이란 — 접시 더미</h3>
      <span class="learn-tag">📎 마지막에 올린 걸 먼저 뗀다(LIFO) · 슬롯 = 이름표(값은 값 메모리에)</span>
      <ul class="section-list">
        <li>접시를 쌓듯 <b>위로 쌓고</b>, 뗄 땐 <b>맨 위부터</b>(Last In, First Out).</li>
        <li>칸 하나 = <b>슬롯 = 이름표</b>. ⚠️ 변수는 값을 담는 <b>통이 아니라 이름표</b> — 값을 <b>가리킨다</b>. 원시값도 값 메모리에 살고, 이름표가 <b>화살표로 가리킨다</b>(불변이라 대입하면 각자 셀로 복사).</li>
        <li>스택은 <b>빠르다</b> — 순서대로 쌓고 떼기만 하니까.</li>
      </ul>
      <div class="card">
        <div class="file-label">🃏 직접 쌓고(push) 빼보기(pop) — 마지막 게 먼저 나온다</div>
        <div data-m="stackviz"></div>
      </div>

      <h3 class="section-title">② 눈으로 — 이름표가 쌓이고, 각자 값을 가진다</h3>
      <span class="learn-tag">📎 경계 분명히 — 스택에 쌓이는 건 <b>데이터</b>가 아니라 <b>이름표(변수)</b>. 이름표 ≠ 값</span>
      <p class="section-desc">스택에 쌓이는 건 <b>이름표(변수)</b>다 — 데이터 자체가 아니라. (M1의 그 <b>이름표 장부</b>가 이거다.) 원시값도 값 메모리에 살고, 이름표가 <b>화살표로</b> 가리킨다(불변이라 복사되면 각자 셀 · 슬롯 = 이름 + 화살표).
      반대로 <b>큰 묶음(객체)</b>이면 값을 스택에 못 담고 <b>값 메모리(힙)를 참조</b>한다(장부 칸엔 주소만 — 다음 M3). 어느 쪽이든 <b>변수(이름) ≠ 값(데이터)</b>라는 경계가 핵심이다.</p>
      <div data-m="slots"></div>

      <h3 class="section-title">③ 핵심 성질 — 작업이 끝나면 칸이 통째로 사라진다</h3>
      <span class="learn-tag">📎 함수를 부르면 새 칸(프레임) push, 끝나면 pop — 그 안 변수도 함께 사라진다 (함수는 5강에서 제대로 · 여기선 "호출=스택에 쌓임"만)</span>
      <p class="section-desc">이게 스택에서 <b>가장 중요한</b> 성질이다. 함수 같은 "작업 구역"이 시작되면 스택에 <b>새 칸</b>이 생기고, 그 작업이 끝나면 <b>그 칸이 통째로 치워진다</b>. ▶로 직접 보라.</p>
      <div data-m="pushpop"></div>

      <h3 class="section-title">④ 왜 지워도 괜찮을까? — 여러 이유</h3>
      <span class="learn-tag">📎 데이터를 버리는 것 같지만 사실 안전하다 — 이유가 여럿이다</span>
      <ul class="section-list">
        <li><b>① 규약(스코프)</b> — 지역변수는 "그 함수 <b>안에서만</b> 쓴다"는 약속이다. 함수가 끝나면 밖에선 그 이름으로 <b>접근 자체가 안 된다</b>. 애초에 못 찾으니 지워도 문제없다.</li>
        <li><b>② 더 이상 쓸 곳이 없다</b> — 함수가 끝났다는 건 그 지역변수를 쓸 코드가 <b>더 없다</b>는 뜻. 남겨 둬도 그냥 <b>쓰레기</b>다.</li>
        <li><b>③ 필요한 건 이미 빼냈다</b> — 바깥이 필요로 하는 값은 <code>return</code>으로 <b>먼저 넘겼다</b>. (원시값은 복사돼 나가고, 객체는 <b>값 메모리(힙)</b>에 있어 살아남는다 — 프레임 장부엔 주소만 있었다.)</li>
        <li><b>④ LIFO라 안전하다</b> — 항상 <b>맨 위</b>(방금 끝난 것)만 지운다. 그 위엔 아무도 없어서, 이 칸에 <b>기대고 있는 진행 중 작업이 없다</b>. 아래 칸들은 멀쩡.</li>
        <li><b>⑤ 지워야 재사용된다</b> — 안 지우면 스택이 끝없이 쌓여 넘친다(Stack Overflow). 지운 공간을 <b>다음 함수 호출이 재사용</b>한다. (사실 비트를 지우는 게 아니라 "이 위는 없는 셈" 표시만 내려 — 그래서 <b>빠르다</b>.)</li>
        <li><b>⑥ 자동이라 편하다</b> — 개발자가 일일이 안 치워도, 함수만 끝나면 <b>저절로</b> 정리된다.</li>
      </ul>
      <p class="section-desc">⚠️ <b>딱 하나 예외</b> — 안쪽 함수가 그 지역변수를 <b>붙잡으면</b>(클로저) 안 지워지고 <b>값 메모리(힙)로 옮겨져 살아남는다</b>. 그건 <b>🧠 메모리 심화 · 클로저</b>에서.</p>

      <h3 class="section-title">⑤ 지역변수 vs 전역변수 — 장부에 '층'이 있다</h3>
      <span class="learn-tag">📎 함수 밖 = 전역 장부(오래·어디서나) · 함수 안 = 그 함수 장부(임시·그 안에서만)</span>
      <p class="section-desc">스택 장부는 한 층이 아니다. <b>맨 바깥(전역 장부)</b> 위로, 함수를 부를 때마다 <b>함수 장부(프레임)</b>가 층층이 쌓인다. 변수가 <b>어느 장부에</b> 사느냐가 <b>어디서 접근되는지(스코프)</b>를 정한다.</p>
      <ul class="section-list">
        <li><b>전역변수</b> — 함수 <b>밖</b>에 선언. <b>전역 장부</b>에 살아 <b>프로그램 내내 · 어디서나</b> 접근. (남용하면 이름 충돌·추적 어려움 → 되도록 적게)</li>
        <li><b>지역변수</b> — 함수 <b>안</b>에 선언(매개변수 포함). 그 <b>함수 장부</b>에 살아 <b>함수 안에서만</b> 접근. 함수가 끝나면 장부째 <b>사라진다</b>(③).</li>
      </ul>
      <div class="card">
        <div class="file-label">🎬 전역 장부 · 함수 장부 — ▶로 push · 접근 · pop 보기</div>
        <div data-m="scope"></div>
      </div>
      <p class="section-desc">🔑 그래서 좋다 — 함수마다 자기 <b>user</b>를 따로 가져 <b>이름이 안 부딪히고</b>, 지역변수는 함수가 끝나면 <b>자동 정리</b>(스택 pop)돼 안전하다. (<code>{ }</code> 블록도 <code>let·const</code>에 <b>스코프</b>를 만든다 — 자세힌 나중.)</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">스택 = M1의 <b>이름표 장부(변수 영역)</b> = 이름표 슬롯이 <b>LIFO</b>로 쌓이는 빠른 공간. 개념 그림은 이름(장부)과 값(값 메모리)을 갈라 그리지만, <b>원시값은 물리적으론 이 스택 프레임에 이름과 함께</b> 있어 함수가 끝나면 같이 사라진다. 객체만 <b>힙</b>에 따로(장부·값 메모리 셀엔 주소). 즉 <b>값 메모리 = 스택 구역(원시값) + 힙 구역(객체)</b>.
        <b>작업이 끝나면 그 칸이 통째로 사라진다</b> — 규약상 밖에서 못 쓰고, 필요한 건 이미 빼냈고, 지워야 재사용되니 <b>안전하다</b>. 이게 다음 M3의 "왜 묶음은 값 메모리(힙)에?"로 이어진다.</p>
      </div>

      <div class="practice-cta">
        <span>그럼 크고 오래 살아야 하는 묶음은? — 힙으로 —</span>
        <button class="chip on" data-goto="heap">🧠 M3 · 힙 →</button>
      </div>
    `
    root.querySelector('[data-m="stackviz"]').append(StackViz())
    root.querySelector('[data-m="slots"]').append(MemoryModel(SCENARIO_STACK_SLOTS))
    root.querySelector('[data-m="pushpop"]').append(MemoryModel(SCENARIO_PUSHPOP))
    root.querySelector('[data-m="scope"]').append(MemoryModel(SCENARIO_SCOPE))
    root.querySelector('[data-m="qzs"]').append(Quiz({ q: '접시를 A → B → C 순서로 쌓았다(push). 먼저 빼는(pop) 건?', options: ['A (맨 먼저 넣은 것)', 'C (맨 마지막 넣은 것)'], answer: 1, explain: '스택은 <b>LIFO</b>(Last In, First Out) — 마지막에 올린 게 먼저 나온다. 접시 더미처럼 맨 위(C)부터.' }))
    wireCTA(root)
  }

  // ══ M3 · 힙 ═════════════════════════════════════════════════
  const SCENARIO_HEAP = {
    title: '묶음은 값 메모리(힙)에, 장부 칸엔 주소만',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: ['let age = 20', 'let tags = ["신상", "세일"]', 'let card = { name: "민지" }'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }] }], heap: {}, note: '원시값 age — 이름은 장부에, 값 20은 값 메모리 셀에(물리적으론 한 스택 프레임).', engine: 'SMI 태깅 — 실제론 슬롯에 인라인.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'tags', ref: 'h1' }] }], heap: { h1: { label: '["신상", "세일"]' } }, note: '<b>배열</b>은 힙으로. tags 슬롯엔 <b>주소</b>만 → 힙으로 화살표.', engine: '힙 할당, tags엔 포인터.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'tags', ref: 'h1' }, { name: 'card', ref: 'h2' }] }], heap: { h1: { label: '["신상", "세일"]' }, h2: { label: '{ name: "민지" }' } }, note: '<b>객체</b>도 힙으로. 힙에 박스 둘, 슬롯이 각각을 화살표로 가리킨다.', engine: '힙 할당 + 히든클래스.' },
    ],
  }
  const SCENARIO_STACK_FAIL = {
    title: '❌ 만약 묶음(객체)을 스택 칸에 뒀다면?',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: ['function makeCard() {', '  return { name: "민지" }', '}', 'let c = makeCard()'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [] }, { name: 'makeCard', slots: [{ name: '(객체)', value: '{ name: "민지" }' }] }], heap: {}, note: '<b>상상</b>: 객체를 힙이 아니라 <b>makeCard 칸(스택) 안</b>에 통째로 뒀다.' },
      { line: 1, stack: [{ name: 'main', slots: [] }, { name: 'makeCard', slots: [{ name: '(객체)', value: '{ name: "민지" }' }] }], heap: {}, note: '이 객체를 <b>밖으로 반환</b>해 c에 담으려 한다.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'c', value: '💥 사라진 메모리', bad: true }] }], heap: {}, note: 'makeCard가 끝나 칸이 <b>pop(치워짐)</b> → M2에서 봤듯 <b>그 안의 객체도 함께 사라진다</b>. c는 없어진 메모리를 가리킨다 💥. <b>그래서</b> 오래 살아야 할 묶음은 스택이 아니라 <b>힙</b>에 둔다.' },
    ],
  }
  // 거꾸로 — 원시값이 힙에 사는 경우(객체 속성). 같은 20이 스택(age)과 힙(card.age)에.
  const SCENARIO_PRIM_IN_HEAP = {
    title: '같은 20인데 — age는 독립 셀, card.age는 객체 안',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: ['let age = 20', 'let card = { age: 20, name: "민지" }'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }] }], heap: {}, note: '독립 변수 age의 20은 값 메모리에 <b>자기 셀</b>(스택 구역).' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'age', value: '20' }, { name: 'card', ref: 'h1' }] }],
        heap: { h1: { fields: [{ key: 'age', value: '20' }, { key: 'name', value: '"민지"' }] } },
        note: 'card 객체(힙 구역) 안의 <b>age: 20</b>은 <b>객체 안 필드</b>. 같은 숫자 20이 한 번은 <b>자기 셀</b>(age·스택 구역), 한 번은 <b>객체 안 필드</b>(card.age·힙 구역)에 산다.' },
    ],
  }

  window.Lessons['heap'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M3</span>
        <h2>힙 — 값 메모리, 큰 묶음을 두는 창고</h2>
        <p>M1에서 나눈 <b>🗄️ 값 메모리</b> — M2에서 "객체는 장부에 <b>주소만</b> 두고 여길 가리킨다"던 <b>바로 그곳</b>이 힙이다. <b>크고 변하는 묶음</b>(객체·배열)의 실체가 여기 산다.</p>
      </header>

      <div data-m="qzh"></div>
      <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/동적_메모리_할당" target="_blank" rel="noopener noreferrer">동적 메모리 할당 ↗</a> · <a href="https://ko.wikipedia.org/wiki/메모리_관리" target="_blank" rel="noopener noreferrer">메모리 관리 ↗</a></p>

      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🔗 M1·M2에서 이어집니다</div>
        <p class="section-desc" style="margin:0">M1 두 구역 중 <b>🗄️ 값 메모리 = 힙</b>. M2의 <b>📚 스택(이름표 장부)</b>엔 객체를 못 담아 <b>주소만</b> 뒀는데, 그 객체의 <b>실체가 사는 곳</b>이 여기다. (M1 <code>box = null</code>에서 본 <code>{ name:"민지" }</code>도 여기 살았다.)</p>
      </div>

      <h3 class="section-title">① 힙(값 메모리)이란 — 자유로운 창고</h3>
      <ul class="section-list">
        <li>스택처럼 순서대로 쌓는 게 아니라, <b>빈자리에 자유롭게</b> 둔다.</li>
        <li>객체·배열처럼 <b>크거나 변하는</b> 것을 여기 둔다. 스택의 <b>장부 칸엔 그 주소</b>만 적는다.</li>
        <li>스택 장부 칸과 달리, 값 메모리의 물건은 <b>아무도 안 가리킬 때까지</b> 산다(함수가 끝나도 살아남음 — 청소는 GC · 심화).</li>
      </ul>

      <h3 class="section-title">② 눈으로 — 묶음은 값 메모리, 장부 칸엔 주소</h3>
      <span class="learn-tag">📎 장부 칸 → 값 메모리 화살표가 곧 '주소를 가리킨다'는 뜻</span>
      <div data-m="heap"></div>

      <h3 class="section-title">③ 무엇이 어디로 — 분류</h3>
      <div class="card">
        <div class="file-label">📄 원시값(스택) vs 묶음(힙)</div>
        <div class="mem-cls">
          <div class="mem-cls-col">
            <div class="mem-cls-head" style="color:#16a34a">🟢 원시값 → 스택 슬롯에 직접</div>
            <ul class="section-list" style="margin:0"><li><b>숫자</b> · <b>문자열</b> · <b>참/거짓</b> · <b>null · undefined</b></li></ul>
            <p class="mem-cls-why">크기가 <b>고정</b>이라 슬롯에 딱 맞는다.</p>
          </div>
          <div class="mem-cls-col">
            <div class="mem-cls-head" style="color:var(--brand)">🔵 묶음(참조값) → 힙에, 슬롯엔 주소</div>
            <ul class="section-list" style="margin:0"><li><b>객체</b> <code>{ }</code> · <b>배열</b> <code>[ ]</code> · <b>함수</b>(5강)</li></ul>
            <p class="mem-cls-why">크기가 <b>가변</b>이라 슬롯에 못 넣는다.</p>
          </div>
        </div>
      </div>

      <h3 class="section-title">④ 왜 묶음은 스택 말고 힙인가 — 세 가지</h3>
      <ul class="section-list">
        <li><b>① 크기</b> — 객체·배열은 런타임에 <b>커질 수 있다</b>(계속 추가). 고정 크기인 스택 슬롯엔 안 맞는다.</li>
        <li><b>② 수명</b> — 스택 칸은 작업이 끝나면 <b>사라진다</b>(M2). 오래 살거나 함수 밖으로 나갈 묶음을 거기 두면 없어진다 → 아래 ⑤.</li>
        <li><b>③ 공유</b> — 여러 변수가 한 객체를 <b>같이 쓰려면</b>(별칭 · M4) 한 곳(힙)에 두고 <b>주소</b>를 나눈다.</li>
      </ul>

      <h3 class="section-title">⑤ ❌ 묶음을 스택에 두면? — M2의 pop 때문에 사라진다</h3>
      <span class="learn-tag">📎 M2에서 본 "칸이 통째로 사라짐"을 그대로 적용 — 뭐가(그 칸의 객체) 어디서(스택) 왜(pop)</span>
      <div data-m="fail"></div>
      <p class="section-desc">이 💥 때문에 JS는 묶음을 <b>힙</b>에 두고 슬롯엔 <b>주소만</b> 담는다. 그래서 함수가 끝나도 객체는 살아남는다(위 ②).</p>

      <h3 class="section-title">⑥ 거꾸로 — 원시값이 힙에 사는 경우</h3>
      <span class="learn-tag">📎 "원시값=스택"은 '독립 변수일 때' — 객체의 속성이면 그 원시값은 힙(객체 안)에 산다</span>
      <p class="section-desc">그럼 반대로 <b>원시값이 힙에</b> 있을 수도 있나? <b>있다.</b> 원시값이 <b>객체·배열의 속성</b>이면, 그 객체를 따라 힙에 산다.
      (앞서 본 효니의 hair·money도 다 힙에 있던 원시값이다.) 아래 — 같은 숫자 20이 스택(age)과 힙(card.age) 양쪽에.</p>
      <div data-m="priminheap"></div>
      <p class="section-desc">💡 그래서 정확한 규칙: <b>독립 변수로 담긴 원시값 = 스택</b> · <b>객체·배열 = 힙</b> · <b>객체 안의 원시값 = 그 객체를 따라 힙</b>.
      (반대로 <b>객체를 스택에</b> 두면? ⑤에서 봤듯 작업이 끝날 때 <b>사라진다</b> 💥.)</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">묶음(객체·배열)은 <b>힙</b>에 살고 슬롯엔 <b>주소</b>만. 크기가 가변이고, 오래 살아야 하고, 공유되기 때문.
        스택에 뒀다면 작업이 끝날 때 <b>함께 사라진다</b>.</p>
      </div>

      <div class="practice-cta">
        <span>슬롯이 '주소'를 담는다 — 그래서 생기는 유명한 함정을 다음에서 —</span>
        <button class="chip on" data-goto="ref">🧠 M4-1 · 값 = 복사 →</button>
      </div>
    `
    root.querySelector('[data-m="heap"]').append(MemoryModel(SCENARIO_HEAP))
    root.querySelector('[data-m="fail"]').append(MemoryModel(SCENARIO_STACK_FAIL))
    root.querySelector('[data-m="priminheap"]').append(MemoryModel(SCENARIO_PRIM_IN_HEAP))
    root.querySelector('[data-m="qzh"]').append(Quiz({ q: '객체 <code>{ name: "민지" }</code>는 스택에 저장될까, 힙에 저장될까?', options: ['스택', '힙'], answer: 1, explain: '객체·배열 같은 <b>묶음</b>은 크기가 유동적이라 <b>힙</b>에 산다. 스택(이름표 장부)엔 그 힙을 가리키는 <b>주소</b>만.' }))
    wireCTA(root)
  }

  // ══ M4 · 값 복사 vs 참조 ════════════════════════════════════
  const SCENARIO_REF = {
    title: '값 복사 vs 참조 — 왜 p를 바꿨는데 obj도 바뀌나',
    code: ['let a = 3', 'let b = a', 'let obj = { n: 1 }', 'let p = obj', 'p.n = 9'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }] }], heap: {}, note: 'a는 값 메모리의 3을 가리킨다.', engine: 'SMI 태깅 — 작은 정수는 실제로 슬롯에 인라인. 개념 모델에선 통일해 값 메모리 셀로 본다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '3' }] }], heap: {}, note: 'b엔 a의 <b>값을 복사</b>. a·b는 무관한 3 두 개.', engine: '값 복사 — 별개 슬롯.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '3' }, { name: 'obj', ref: 'h1' }] }], heap: { h1: { label: '{ n: 1 }' } }, note: '객체는 힙에, obj엔 <b>주소</b>만.', engine: '힙 할당, 포인터.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '3' }, { name: 'obj', ref: 'h1' }, { name: 'p', ref: 'h1' }] }], heap: { h1: { label: '{ n: 1 }' } }, note: 'p엔 obj의 <b>주소를 복사</b> — 둘이 <b>같은 힙 박스</b>(별칭).', engine: '참조 복사. 객체는 하나.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'a', value: '3' }, { name: 'b', value: '3' }, { name: 'obj', ref: 'h1' }, { name: 'p', ref: 'h1' }] }], heap: { h1: { label: '{ n: 9 }' } }, note: 'p로 힙을 바꾸면 <b>obj로 봐도 9</b> — 같은 박스니까. (a·b는 그대로) ← 흔한 오해가 여기서 풀린다.', engine: 'p.n=9는 힙 필드 변경.' },
    ],
  }
  // 값에 의한 전달 — 원시값을 함수에 넘기면 '복사본'이 전달된다(원본 안전).
  const SCENARIO_PASSVAL = {
    title: '값에 의한 전달 — 복사본이라 원본이 안전하다',
    stackLabel: '📚 스택 (이름표 장부)', heapLabel: '🗄️ 값 메모리',
    code: ['let money = 10000', 'function tear(bill) {', '  bill = 0        // 건네받은 걸 찢어 못 쓰게', '}', 'tear(money)'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'money', value: '10000' }] }], heap: {}, note: 'money 슬롯에 10000이 담긴다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'money', value: '10000' }] }, { name: 'tear', slots: [{ name: 'bill', value: '10000' }] }], heap: {}, note: 'tear(money) 호출 → money의 <b>값을 복사</b>해 bill에 담는다. bill은 money와 <b>별개의 슬롯</b>(복사된 만원 한 장 더).' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'money', value: '10000' }] }, { name: 'tear', slots: [{ name: 'bill', value: '0', bad: true }] }], heap: {}, note: 'bill(복사본)을 0으로 찢어도 → <b>money(원본)는 그대로 10000</b>. 애초에 서로 다른 두 장이니까.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'money', value: '10000' }] }], heap: {}, note: 'tear 끝 → bill(복사본) 사라짐. money는 여전히 <b>10000</b>. 원시값은 <b>복사본</b>으로 전달돼 원본이 안전하다.' },
    ],
  }

  // 객체 그래프 — hyoni(스택 변수)와 me.bestFriend(힙 필드)가 같은 효니 객체를 가리킨다.
  // 두 변화를 '별개 예시'로: ① 베프가 머리 자름 → 효니도  ② 효니가 복권 → 베프도 (양방향)
  // 효니·나를 '사람 카드'(아바타)로. 효니 아바타는 상태에 반응: 머리 자름 💇‍♀️ · 복권 🤑
  const meBox = () => ({ person: '🧑', name: '나', fields: [{ key: 'bestFriend', ref: 'h1' }] })
  const hyoniBox = (emoji, field) => ({ person: emoji, name: '효니', fields: [field] })
  const stackHyoni = [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }] }]
  const stackBoth = [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'me', ref: 'h2' }] }]
  const SCENARIO_GRAPH_HAIR = {
    title: '① 내 베프가 머리를 자르면 → 효니도 숏컷',
    code: ['let hyoni = { name: "효니", hair: "긴머리" }', 'let me = { name: "나", bestFriend: hyoni }', 'me.bestFriend.hair = "숏컷"   // 내 베프가 머리 자름'],
    steps: [
      { line: 0, stack: stackHyoni, heap: { h1: hyoniBox('👩', { key: 'hair', value: '"긴머리"' }) }, note: '효니(사람)가 힙에. hyoni 슬롯이 그를 가리킨다.' },
      { line: 1, stack: stackBoth, heap: { h1: hyoniBox('👩', { key: 'hair', value: '"긴머리"' }), h2: meBox() }, note: 'me(나) 생성. 내 <b>bestFriend</b>가 효니를 가리킨다 → 효니를 향한 화살표가 <b>둘</b>(hyoni · me.bestFriend) = 같은 사람!' },
      { line: 2, stack: stackBoth, heap: { h1: hyoniBox('💇‍♀️', { key: 'hair', value: '"숏컷"' }), h2: meBox() }, note: '<b>내 베프</b> 쪽으로 머리를 자르니(<code>me.bestFriend.hair="숏컷"</code>) → <b>효니도 숏컷</b> 💇‍♀️. 같은 사람이니까!' },
    ],
  }
  const SCENARIO_GRAPH_MONEY = {
    title: '② 효니가 복권에 당첨되면 → 내 베프도 부자',
    code: ['let hyoni = { name: "효니", money: 0 }', 'let me = { name: "나", bestFriend: hyoni }', 'hyoni.money = 1000000000      // 효니가 복권 당첨'],
    steps: [
      { line: 0, stack: stackHyoni, heap: { h1: hyoniBox('👩', { key: 'money', value: '0' }) }, note: '효니(사람)가 힙에. hyoni가 가리킨다.' },
      { line: 1, stack: stackBoth, heap: { h1: hyoniBox('👩', { key: 'money', value: '0' }), h2: meBox() }, note: 'me(나) 생성. 내 bestFriend가 같은 효니를 가리킨다.' },
      { line: 2, stack: stackBoth, heap: { h1: hyoniBox('🤑', { key: 'money', value: '1000000000' }), h2: meBox() }, note: '<b>효니</b> 쪽으로 복권 당첨(<code>hyoni.money=10억</code>) → <b>내 베프도 10억</b> 🤑. 반대 방향도 같은 사람!' },
    ],
  }

  // 2중(중첩) 그래프 — me → 효니 → 지민. 객체가 객체를, 그 객체가 또 객체를.
  const SCENARIO_GRAPH_NESTED = {
    title: '2중 그래프 — 친구의 친구 (me → 효니 → 지민)',
    code: [
      'let jimin = { name: "지민", hair: "파마" }',
      'let hyoni = { name: "효니", bestFriend: jimin }',
      'let me = { name: "나", bestFriend: hyoni }',
      'me.bestFriend.bestFriend.hair = "삭발"   // 친구의 친구가 삭발',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'jimin', ref: 'h1' }] }],
        heap: { h1: { person: '👩‍🦱', name: '지민', fields: [{ key: 'hair', value: '"파마"' }] } },
        note: '지민(사람)이 힙에. jimin이 가리킨다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'jimin', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }] }],
        heap: { h1: { person: '👩‍🦱', name: '지민', fields: [{ key: 'hair', value: '"파마"' }] }, h2: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h1' }] } },
        note: '효니 생성. <b>효니.bestFriend가 지민</b>을 가리킨다 → 효니 → 지민.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'jimin', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }, { name: 'me', ref: 'h3' }] }],
        heap: { h1: { person: '👩‍🦱', name: '지민', fields: [{ key: 'hair', value: '"파마"' }] }, h2: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h1' }] }, h3: { person: '🧑', name: '나', fields: [{ key: 'bestFriend', ref: 'h2' }] } },
        note: '나 생성. 이제 <b>me → 효니 → 지민</b> 화살표 사슬(2중 그래프). <code>me.bestFriend</code>는 효니, <code>me.bestFriend.bestFriend</code>는 지민.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'jimin', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }, { name: 'me', ref: 'h3' }] }],
        heap: { h1: { person: '👩‍🦲', name: '지민', fields: [{ key: 'hair', value: '"삭발"' }] }, h2: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h1' }] }, h3: { person: '🧑', name: '나', fields: [{ key: 'bestFriend', ref: 'h2' }] } },
        note: 'me에서 bestFriend를 <b>두 번</b> 따라가(<code>me.bestFriend.bestFriend</code>) 지민에 도달 → hair "삭발" 👩‍🦲. 화살표를 여러 번 건너는 게 <b>2중 그래프 탐색</b>이다.' },
    ],
  }

  // ══ M4 · 값 복사 vs 참조 ════════════════════════════════════
  // 이름표 착각 정면돌파 — let y = x. 원시값은 각자 자기 셀로 복사(같은 10 셀에 안 붙는다).
  const SCENARIO_XY_COPY = {
    title: '이름표 착각 깨기 — let y = x 하면 같은 10에 붙나?',
    stackLabel: '📇 이름표 장부 (변수)', heapLabel: '🗄️ 값 메모리',
    code: ['let x = 10', 'let y = x        // y도 10 — 같은 10에 붙나?', 'y = 20           // y만 바꾸면 x는?'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'x', value: '10' }] }], heap: {}, note: 'x는 값 메모리의 <b>10</b>을 가리킨다(원시값도 값 메모리에, 장부엔 이름+화살표).' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'x', value: '10' }, { name: 'y', value: '10' }] }], heap: {}, note: '😵 착각: "x·y가 <b>같은 10 셀 하나</b>를 같이 가리킨다"? ❌ 아니다. 원시값은 불변이라 대입하면 <b>각자 셀로 복사</b> — y는 <b>자기 10 셀</b>을 가리킨다. <b>셀이 둘</b>이다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'x', value: '10' }, { name: 'y', value: '20', bad: true }] }], heap: {}, note: 'y=20 → <b>y 칸의 값만 20으로 바뀐다</b>. <b>x는 그대로 10</b>. 애초에 별개의 두 셀이라 x는 안 움직인다 → "같은 10 셀에 같이 붙어있다"는 그림은 <b>틀렸다</b>.' },
    ],
  }
  // 객체 속성끼리 숫자 복사 — 객체가 껴도 숫자면 복사(안 공유)
  const SCENARIO_PROP_COPY = {
    title: '속성끼리 — hyoni.money = me.money (객체가 껴도 복사!)',
    code: ['let me = { money: 100 }', 'let hyoni = { money: 0 }', 'hyoni.money = me.money   // me의 money(숫자) 복사', 'hyoni.money = 50          // hyoni.money만 바꿈'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] } }, note: 'me 객체 money 100.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] }, h2: { fields: [{ key: 'money', value: '0' }] } }, note: 'hyoni 객체 money 0. me와 <b>다른 박스</b>.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] }, h2: { fields: [{ key: 'money', value: '100' }] } }, note: '<code>hyoni.money = me.money</code> → me.money(숫자 100)를 <b>복사</b>해 hyoni.money에. 두 객체는 여전히 <b>다른 박스</b> — 숫자만 베낀 것.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }, { name: 'hyoni', ref: 'h2' }] }], heap: { h1: { fields: [{ key: 'money', value: '100' }] }, h2: { fields: [{ key: 'money', value: '50' }] } }, note: 'hyoni.money만 50. <b>me.money는 그대로 100</b>! 객체가 둘 껴 있어도, 대입된 게 <b>숫자(원시값)</b>라 복사였다 = 안 공유.' },
    ],
  }
  // 문자열도 원시값 → 복사(숫자만이 아님)
  const SCENARIO_STR_COPY = {
    title: '문자열도 복사 — nick2 = nick1 (숫자만이 아니다)',
    stackLabel: '📇 이름표 장부 (변수)', heapLabel: '🗄️ 값 메모리',
    code: ['let nick1 = "무지"', 'let nick2 = nick1      // 문자열도 복사', 'nick2 = "어피치"        // nick2만 바뀜'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'nick1', value: '"무지"' }] }], heap: {}, note: 'nick1에 "무지".' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'nick1', value: '"무지"' }, { name: 'nick2', value: '"무지"' }] }], heap: {}, note: '문자열 "무지"를 <b>복사</b>해 nick2에. 별개의 두 슬롯 — 숫자와 똑같다.', engine: '실제 V8: 문자열은 값 메모리에 두고 nick1·nick2가 <b>같은 "무지"를 가리킴</b>(주소 복사·공유). 하지만 불변이라 복사와 100% 동일 — 아래 💡심화 참고.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'nick1', value: '"무지"' }, { name: 'nick2', value: '"어피치"', bad: true }] }], heap: {}, note: 'nick2만 "어피치". <b>nick1은 그대로 "무지"</b> — 문자열도 <b>원시값</b>이라 복사(안 공유). "숫자만 복사"가 아니다.' },
    ],
  }
  // 불변 (model B) — 재할당은 이름표의 화살표가 '새 값 셀'로 옮겨가는 것. 옛 값 셀은 안 고쳐지고 회색으로 남는다.
  const SCENARIO_IMM_NUM = {
    title: '① 숫자 · 재할당 — money = 200',
    code: ['let money = 100', 'money = 200   // 100이 200으로 변신? 아니다'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'money', ref: 'v1' }] }], heap: { v1: { label: '100', prim: true } }, note: 'money는 값 메모리의 <b>100</b>을 가리킨다(장부엔 이름+화살표).' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'money', ref: 'v2' }] }], heap: { v1: { label: '100', prim: true, faded: true }, v2: { label: '200', prim: true } }, note: '<code>money = 200</code> → money의 <b>화살표가 새 200 셀로 옮겨간다</b>(재할당). 옛 <b>100은 그대로</b>(불변) — 아무도 안 가리켜 회색. 값 100이 200으로 "변신"한 게 아니다.' },
    ],
  }
  const SCENARIO_IMM_STR = {
    title: '② 문자열 · 연산은 새 값을 만든다 — "kim".toUpperCase()',
    code: ['let name = "kim"', 'name.toUpperCase()   // 새 값 "KIM"을 만들 뿐', '// name 은? 여전히 "kim"'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'name', ref: 'v1' }] }], heap: { v1: { label: '"kim"', prim: true } }, note: 'name은 값 메모리의 <b>"kim"</b>을 가리킨다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'name', ref: 'v1' }] }], heap: { v1: { label: '"kim"', prim: true }, v2: { label: '"KIM"', prim: true, faded: true } }, note: '.toUpperCase()는 <b>새 값 "KIM"</b>을 만든다(v2) — 하지만 <b>어디에도 안 담아</b> 아무도 안 가리킨다(회색). 원본 "kim"은 <b>제자리에서 안 바뀐다</b>. name의 화살표도 그대로.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'name', ref: 'v1' }] }], heap: { v1: { label: '"kim"', prim: true } }, note: '그래서 name은 <b>여전히 "kim"</b>. 진짜 바꾸려면 <code>name = name.toUpperCase()</code>로 <b>재할당</b>(화살표를 KIM 셀로 옮김, ①처럼). 문자열도 불변.' },
    ],
  }
  const SCENARIO_IMM_BOOL = {
    title: '③ 참거짓 · 뒤집기도 재할당 — on = !on',
    code: ['let on = true', 'on = !on   // 뒤집기 = 새 값을 가리키기'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'on', ref: 'v1' }] }], heap: { v1: { label: 'true', prim: true } }, note: 'on은 값 메모리의 <b>true</b>를 가리킨다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'on', ref: 'v2' }] }], heap: { v1: { label: 'true', prim: true, faded: true }, v2: { label: 'false', prim: true } }, note: '!on은 <b>새 값 false</b>를 만들고 on의 <b>화살표가 그리로 옮겨간다</b>(재할당). true는 그대로(불변). <b>뒤집기도 결국 "다른 값 가리키기"</b> — 참거짓도 불변.' },
    ],
  }
  // 묶음이면 다 참조 — object/array 말고 Date·class 인스턴스도 힙에, 슬롯엔 주소, 복사하면 별칭.
  const SCENARIO_BUNDLE = {
    title: '묶음은 다 참조 — Date · 클래스 인스턴스도 힙에',
    code: [
      'let today = new Date()             // 날짜도 여러 값(연·월·일…)의 묶음',
      'class Hero { constructor(n) { this.name = n; this.hp = 100 } }  // 설계도(틀)',
      'let link = new Hero("링크")         // new로 찍어낸 인스턴스',
      'let p2 = link                      // 주소만 복사',
      'p2.hp = 50                         // p2로 hp를 깎으면?',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'today', ref: 'h1' }] }],
        heap: { h1: { label: '📅 Date { 2026, 8, 13, … }' } },
        note: 'new Date()도 <b>연·월·일·시를 하나로 묶은 객체</b> → 힙에 만들어진다. today는 <b>주소만</b> 가진다({ } 안이 아니라 힙을 가리킴).' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'today', ref: 'h1' }, { name: 'link', ref: 'h2' }] }],
        heap: { h1: { label: '📅 Date { … }' }, h2: { person: '🦸', name: '링크', fields: [{ key: 'hp', value: '100' }] } },
        note: 'class Hero는 <b>설계도(틀)</b>일 뿐. <code>new Hero("링크")</code>로 <b>찍어낸 인스턴스</b>가 진짜 객체 → 힙에. link는 주소만. (클래스는 뒤에서 자세히 — 여기선 "new로 만든 것도 묶음이라 힙"만 기억)' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'today', ref: 'h1' }, { name: 'link', ref: 'h2' }, { name: 'p2', ref: 'h2' }] }],
        heap: { h1: { label: '📅 Date { … }' }, h2: { person: '🦸', name: '링크', fields: [{ key: 'hp', value: '100' }] } },
        note: 'p2 = link → <b>주소만 복사</b>. link와 p2가 <b>같은 히어로</b>를 가리킨다(별칭). 화살표 둘이 한 박스로 모인다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'today', ref: 'h1' }, { name: 'link', ref: 'h2' }, { name: 'p2', ref: 'h2' }] }],
        heap: { h1: { label: '📅 Date { … }' }, h2: { person: '🦸', name: '링크', fields: [{ key: 'hp', value: '50' }] } },
        note: 'p2.hp = 50 → 같은 박스라 <b>link.hp도 50</b>. 숫자·문자열이면 복사였지만, 이건 <b>묶음(객체)</b>이라 공유. Date·배열·클래스… <b>묶음이면 전부 참조</b>, 같은 규칙이 그대로 적용된다.' },
    ],
  }
  // ── M4-1 · 값 = 복사 (이름표 착각 정면돌파) ──────────────────
  window.Lessons['ref'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M4-1</span>
        <h2>값 = 복사 — 원시값은 각자 '자기 값'을 가진다</h2>
        <p>변수를 다른 변수에 담으면? 원시값(숫자·문자열·참거짓)은 <b>값이 복사</b>돼 서로 무관해진다. 입문자의 '이름표 착각'을 정면으로 깬다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>원시값 대입 = <b>값 복사</b>(독립). <code>let y = x</code>는 "같은 10 셀에 같이 붙는" 게 아니라 <b>각자 자기 값 셀을 가리킨다</b>. 객체가 껴도 <b>꺼낸 게 원시값이면 복사</b>다.</p>
      </div>

      <div data-m="qzr1"></div>

      <h3 class="section-title">1단계 · 변수는 이름표 — 맞다 (1강 복습)</h3>
      <p class="section-desc">변수는 <b>값에 붙인 이름표</b>. 여기까진 좋다 — <b>ok!</b> 그런데 이 그림을 <b>과하게 밀면</b> 착각이 생긴다. 2단계에서 정면으로 본다.
      <br><span style="opacity:.8">📚 이 챕터가 파고드는 용어: <a href="https://ko.wikipedia.org/wiki/자료형" target="_blank" rel="noopener noreferrer">자료형(원시/참조) ↗</a> · <a href="https://ko.wikipedia.org/wiki/불변객체" target="_blank" rel="noopener noreferrer">불변 객체(immutable) ↗</a></span></p>

      <h3 class="section-title">2단계 · 이름표 착각 깨기 — <code>let y = x</code></h3>
      <div class="card warn-box">
        <p class="section-desc" style="margin:0">😵 <b>흔한 착각:</b> "이름표 x와 y가 <b>10이라는 글자 하나에 같이 붙어</b> 있다가, <code>y = 20</code>하면 y가 <b>20으로 옮겨붙는</b> 거 아냐? 그럼 x는 어떻게 되지?"</p>
      </div>
      <span class="learn-tag">📎 ▶로 확인 — x와 y는 애초에 '다른 칸'이다</span>
      <div class="card"><div class="file-label">🎬 let y = x — 같은 10에 붙나, 각자 복사하나 (▶ 한 단계씩)</div><div data-m="xy"></div></div>
      <p class="section-desc">원시값은 불변이라 대입하면 <b>각자 셀로 복사</b>한다 — y는 <b>자기 10 셀</b>을 가리킨다(셀이 둘). 그래서 <code>y = 20</code>은 y의 화살표만 <b>20 셀</b>로 옮기고 <b>x는 그대로 10</b>. "같은 10 셀에 붙어있다 옮겨붙는다"는 그림은 <b>틀렸다</b>.</p>
      <p class="section-desc" style="margin-bottom:6px">숫자만이 아니다 — <b>문자열·참거짓</b>도 원시값이라 똑같이 각자 복사:</p>
      <div class="card"><div class="file-label">🔬 문자열도 복사 — nick2 = nick1</div><div data-m="strcopy"></div></div>

      <div class="card" style="border-style:dashed">
        <div class="file-label">💡 심화(선택) — 사실 문자열은 '공유'되는데 왜 '복사'로 볼까 (개념 vs 실제 엔진)</div>
        <p class="section-desc" style="margin-top:0">위 그림은 <b>개념 모델</b>(각자 자기 "무지"). 그런데 <b>실제 엔진(V8)</b>은 문자열을 값 메모리에 두고 <b>주소만 복사</b>해 <b>같은 "무지"를 공유</b>한다(매번 통째로 베끼면 낭비). 이 차이는 <b>이름표 장부와 값 메모리를 나눠 화살표로</b> 그려야 보인다:</p>
        <div style="margin:12px 0 0">
          <div style="font-size:12.5px;font-weight:700;opacity:.85;margin-bottom:6px">🧠 개념 모델 — 각자 자기 "무지" (복사·독립)</div>
          <div data-m="strshare-c"></div>
        </div>
        <div style="margin:16px 0 0">
          <div style="font-size:12.5px;font-weight:700;opacity:.85;margin-bottom:6px">⚙️ 실제 엔진(V8) — 같은 "무지"를 공유 (주소 복사 · 🔒 불변이라 안전)</div>
          <div data-m="strshare-e"></div>
        </div>
        <p class="section-desc" style="margin:12px 0 0">🔑 공유하고 있어도 문자열은 <b>불변(🔒)</b> — <b>아무도 그 "무지"를 못 바꾼다</b>. <code>nick2 = "어피치"</code>는 nick2를 <b>다른 문자열로 재할당</b>할 뿐, 공유하던 "무지"엔 손도 못 댄다. 그래서 <b>공유든 복사든 결과가 100% 똑같다</b> → 우리는 그냥 <b>'복사'로 본다</b>. (객체는 <b>가변</b>이라 공유가 티 나서 위험 — 그게 M4-2.)</p>
      </div>

      <h3 class="section-title">3단계 · 객체가 껴도 — 속성을 '꺼내면' 복사 (<code>let b = a.num</code>)</h3>
      <span class="learn-tag">📎 최대 함정: 객체째 담기(공유) ↔ 속성 꺼내기(복사) — 글자 하나(.num) 차이</span>
      <p class="section-desc"><code>let b = a</code>(객체째)와 <code>let b = a.num</code>(그 안 숫자를 꺼냄)는 <b>정반대</b>다. 지금은 <b>꺼내는 쪽(복사)</b>을 판다 — 객체가 껴 있어도 <b>꺼낸 게 숫자면 복사</b>라 원본과 무관하다.</p>
      <div class="card" style="border-color:var(--brand)">
        <div class="file-label">🎯 객체째 담기(공유) vs 속성 꺼내기(복사)</div>
        <div data-m="extract"></div>
        <div class="card" style="margin-top:12px"><div class="file-label">🔮 예측 후 ▶ — copied를 20으로 바꾸면 a.num은?</div><div data-m="extract-run"></div></div>
      </div>
      <div class="card"><div class="file-label">🔬 속성끼리도 복사 — hyoni.money = me.money (객체가 껴도 숫자면 복사!)</div><div data-m="propcopy"></div></div>
      <p class="section-desc">🔑 <b>객체(참조)를 통째로 담으면 공유, 그 안의 원시값을 꺼내 담으면 복사.</b> 꺼내는 순간 값이 복사되니 그 뒤로는 원본과 무관하다. 그럼 <b>객체째 담는(<code>let b = a</code>) 쪽</b>은? — 그게 <b>M4-2 · 참조 = 공유</b>다.</p>

      <h3 class="section-title">4단계 · 원시값은 불변 — "money=200, 변했잖아?"의 진실</h3>
      <span class="learn-tag">📎 값이 '변신'하는 게 아니다 — 이름표의 화살표가 새 값 셀로 옮겨갈 뿐, 값 자체는 불변</span>
      <p class="section-desc">"원시값은 불변"이라는데 <code>money = 200</code>은 변한 것 같다. 진실은 — <b>값 100 자체는 안 변한다</b>.
      money의 <b>화살표가 새 200 셀로 옮겨갔을</b> 뿐(재할당) — 옛 100 셀은 손 안 대고 그대로. <b>세 가지 타입·상황</b>으로 확인한다. ▶로 한 단계씩 보라 — 값은 <b>값 메모리 셀</b>에 살고, 바뀌는 건 <b>어느 셀을 가리키느냐</b>다.</p>
      <div class="card"><div class="file-label">🔬 ① 숫자 · 재할당</div><div data-m="imm-num"></div></div>
      <div class="card"><div class="file-label">🔬 ② 문자열 · 연산은 원본을 안 바꾼다(새 값)</div><div data-m="imm-str"></div></div>
      <div class="card"><div class="file-label">🔬 ③ 참거짓 · 뒤집기도 재할당</div><div data-m="imm-bool"></div></div>
      <ul class="section-list">
        <li><b>불변(immutable)</b> = 값 자체를 <b>제자리에서 못 바꾼다</b>. 숫자·문자열·참거짓 <b>모든 원시값</b>이 그렇다 (<code>100</code>→<code>101</code>, <code>"kim"</code>→<code>"KIM"</code>을 제자리에서 바꾸는 일은 없다).</li>
        <li><code>money = 200</code>·<code>on = !on</code>은 <b>재할당</b> — 이름표의 화살표를 <b>다른 값 셀로 옮기는</b> 것. 값의 '변신'이 아니다.</li>
        <li>반대로 <b>객체는 가변(mutable)</b> — <code>obj.x = 2</code>는 값(객체)을 <b>제자리에서</b> 바꾼다. 그래서 공유되면 위험하다(→ M4-2).</li>
      </ul>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약 (M4-1)</p>
        <p class="section-desc" style="margin-top:0">원시값을 담으면 <b>복사</b> — 변수든 속성이든, 객체가 껴도, 꺼낸 게 원시값이면 <b>독립</b>. 다음은 정반대 이야기: <b>객체째 담으면 공유(별칭)</b>.</p>
      </div>

      <div class="practice-cta">
        <span>그럼 객체째 담으면? — 정반대 이야기 —</span>
        <button class="chip on" data-goto="ref2">🧠 M4-2 · 참조 = 공유 →</button>
      </div>
    `
    root.querySelector('[data-m="xy"]').append(MemoryModel(SCENARIO_XY_COPY))
    root.querySelector('[data-m="strcopy"]').append(MemoryModel(SCENARIO_STR_COPY))
    root.querySelector('[data-m="strshare-c"]').append(buildNameMap(
      '📇 이름표 장부 <small>— 이름 둘</small>',
      '🗄️ 값 메모리 <small>— "무지"가 둘 (각자 복사)</small>',
      [
        { name: 'nick1', c: '#2563eb', to: 'c1' },
        { name: 'nick2', c: '#ea580c', to: 'c2' },
      ],
      [
        { id: 'c1', val: '"무지"', adr: '#0031', at: 2, c: '#2563eb' },
        { id: 'c2', val: '"무지"', adr: '#0058', at: 8, c: '#ea580c' },
      ], 12,
    ))
    root.querySelector('[data-m="strshare-e"]').append(buildNameMap(
      '📇 이름표 장부 <small>— 이름 둘</small>',
      '🗄️ 값 메모리 <small>— "무지"는 하나 (🔒 불변·공유)</small>',
      [
        { name: 'nick1', c: '#2563eb', to: 'c1' },
        { name: 'nick2', c: '#ea580c', to: 'c1' },
      ],
      [
        { id: 'c1', val: '"무지" 🔒', adr: '#0031', at: 5, c: '#6366f1' },
      ], 12,
    ))
    root.querySelector('[data-m="extract"]').append(MemoryModel({
      title: '객체째 담기 vs 속성 꺼내기 — 공유냐 복사냐',
      stackLabel: '📇 이름표 장부 (변수)', heapLabel: '🗄️ 값 메모리',
      code: ['let a = { num: 10 }', 'let shared = a       // 객체째 → 주소 복사(공유)', 'let copied = a.num   // 그 안 숫자를 꺼냄 → 값 복사', 'copied = 20          // copied만 바뀜'],
      steps: [
        { line: 0, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'num', value: '10' }] } }, note: 'a는 객체를 가리킨다(장부 칸엔 주소).' },
        { line: 1, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'shared', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'num', value: '10' }] } }, note: '<code>let shared = a</code> → <b>주소를 복사</b> → shared·a가 <b>같은 객체</b>를 가리킨다(별칭·공유).' },
        { line: 2, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'shared', ref: 'h1' }, { name: 'copied', value: '10' }] }], heap: { h1: { fields: [{ key: 'num', value: '10' }] } }, note: '<code>let copied = a.num</code> → 객체 안에서 <b>숫자 10을 꺼내 복사</b>. copied는 힙과 <b>무관한 독립 슬롯</b>(자기 10 셀을 가리킴).' },
        { line: 3, stack: [{ name: 'main', slots: [{ name: 'a', ref: 'h1' }, { name: 'shared', ref: 'h1' }, { name: 'copied', value: '20', bad: true }] }], heap: { h1: { fields: [{ key: 'num', value: '10' }] } }, note: '<code>copied = 20</code> → copied만 20. <b>a.num은 그대로 10!</b> (꺼낼 때 복사됐으니 무관.) ↔ 반대로 <code>shared.num = 99</code> 했다면 <b>a.num도 99</b>(같은 객체 공유). <b>객체째 = 공유, 속성 꺼내기 = 복사.</b>' },
      ],
    }))
    root.querySelector('[data-m="extract-run"]').append(Runner({
      showBox: false,
      code: [
        'let a = { num: 10 }',
        'let copied = a.num      // 그 안 숫자 10을 꺼내 복사',
        'copied = 20             // copied만 바꾼다',
        'print(copied)           // 20',
        'print(a.num)            // 예측? … ▶ 눌러 확인 (꺼낼 때 복사됐다)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="propcopy"]').append(MemoryModel(SCENARIO_PROP_COPY))
    root.querySelector('[data-m="imm-num"]').append(MemoryModel(SCENARIO_IMM_NUM))
    root.querySelector('[data-m="imm-str"]').append(MemoryModel(SCENARIO_IMM_STR))
    root.querySelector('[data-m="imm-bool"]').append(MemoryModel(SCENARIO_IMM_BOOL))
    root.querySelector('[data-m="qzr1"]').append(Quiz({ q: '<code>let x = 10; let y = x; y = 20</code> — 이제 x는?', options: ['10 (각자 복사)', '20 (같이 바뀜)'], answer: 0, explain: '원시값은 <b>값을 복사</b> → y는 자기 셀. y=20은 y만 바꾼다. x는 그대로 <b>10</b>.' }))
    wireCTA(root)
  }

  // ── M4-2 · 참조 = 공유 (별칭 · "왜 obj도 바뀌지") ──────────────
  window.Lessons['ref2'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M4-2</span>
        <h2>참조 = 공유 — "왜 obj까지 바뀌지?"</h2>
        <p>객체·배열을 <b>통째로</b> 담으면 값이 아니라 <b>주소가 복사</b>된다 → 둘이 <b>같은 것</b>을 가리킨다(별칭). 한쪽을 바꾸면 양쪽에 보인다. (M4-1의 복사와 정반대)</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>객체 대입 = <b>주소 복사</b>(공유·별칭). <code>let p = obj</code>면 p·obj가 <b>같은 힙 박스</b> → <code>p.n = 9</code>가 <b>obj.n도 9</b>로 보인다. "객체가 끼면 공유"가 아니라 — <b>대입되는 값이 객체 주소</b>일 때 공유.</p>
      </div>

      <div data-m="qzr2"></div>

      <h3 class="section-title">① 눈으로 — "안 건드린 obj가 왜 9가 됐나"</h3>
      <span class="learn-tag">📎 마지막 단계에서 정체가 풀린다 — 같은 박스니까</span>
      <div data-m="ref"></div>

      <div class="card">
        <div class="file-label">🔗 별칭(alias)이란 — <b>장부의 두 이름이 한 칸을 가리킨다</b> (let a = box)</div>
        <div data-m="alias"></div>
        <p class="section-desc" style="margin:10px 0 0">M1의 장부/메모리 그림으로 — <code>let a = box</code>는 <b>주소를 복사</b>한다. 그래서 장부에 <b>이름은 둘(box·a)</b>인데 화살표는 <b>같은 칸</b>으로 모인다 = <b>별칭</b>. 한 이름으로 그 칸의 객체를 바꾸면 <b>다른 이름으로 봐도 바뀐 값</b>이 보인다(위 시뮬의 정체).</p>
      </div>

      <div class="concept">
        <p class="concept-lead">🔑 복제냐 참조냐 — 실전은 이게 전부 (그럼 무엇으로 예측하나?)</p>
        <p class="section-desc" style="margin-top:0"><code>b = a</code>에서 "b를 바꾸면 a도 바뀌나?" — <b>복제(독립)냐 참조(공유)냐</b>가 실전에서 유일하게 중요한 물음이다. 그럼 <b>무엇으로 예측하나?</b> → <b>a에 든 값의 부류</b>. <b>1강에서 본 원시/객체 두 부류</b>가 그대로 답을 준다 — <b>라벨(원시/참조)은 예측 도구일 뿐, 주인공은 복제/참조</b>:</p>
        <ul class="section-list">
          <li><b>원시 타입(primitive) — 복사된다(독립·불변) · M4-1</b>:
            <code>숫자 number</code> · <code>문자열 string</code> · <code>참거짓 boolean</code> · <code>null</code>(비어있음을 <b>일부러</b> 넣음) · <code>undefined</code>(아직 값 없음) · <span style="opacity:.75">고급: <code>symbol</code> · <code>bigint</code>(아주 큰 정수)</span>.
            → 값 메모리 셀에 살고, 슬롯은 <b>화살표로</b> 가리킨다(불변이라 대입하면 각자 셀로 복사).</li>
          <li><b>참조 타입(reference) — 공유된다(별칭·가변) · M4-2</b>: <b>여러 값을 하나로 묶은 것</b>은 다 여기다 —
            <code>객체 object {}</code> · <code>배열 array []</code> · <code>함수 function</code>(함수도 값!) ·
            <code>Date</code>(날짜) · <code>Map·Set</code>(모음) · <code>RegExp</code>(정규식),
            그리고 <b>우리가 <code>class</code>로 만든 인스턴스</b>(<code>new Hero(...)</code>).
            → 하나같이 <b>힙</b>에 살고, 슬롯엔 <b>주소만</b> 들어간다. (그래서 <code>typeof</code>는 대부분 <code>"object"</code>)</li>
        </ul>
        <p class="section-desc" style="margin:6px 0 0">🔍 확인법 <code>typeof</code>: <code>typeof 100</code>→"number", <code>typeof "kim"</code>→"string", <code>typeof true</code>→"boolean", <code>typeof {}</code>→"object", <code>typeof []</code>→"object"(배열도 객체!), <code>typeof new Date()</code>→"object", <code>typeof function(){}</code>→"function".
        <br>그래서 규칙은 하나 — <b>대입되는 값이 원시면 복사, 참조(묶음의 주소)면 공유.</b> "객체가 끼었냐"가 아니라 <b>대입되는 값의 타입</b>이 전부를 가른다.
        <br>🔑 <b>왜 하나는 복사고 하나는 공유일까?</b> 그림에선 둘 다 "이름 → 화살표 → 셀"로 같아 보인다. 차이는 <b>셀의 가변성</b>이다 — 원시값 셀은 <b>🔒 불변</b>이라 대입 시 <b>각자 새 셀로 복사</b>(공유해도 못 바꾸니 굳이 안 함), 객체 셀은 <b>가변</b>이라 <b>같은 셀을 공유(별칭)</b>. <b>가변성이 복사냐 공유냐를 가른다.</b>
        <br><span style="opacity:.8">📚 더 깊이: <a href="https://ko.wikipedia.org/wiki/자료형" target="_blank" rel="noopener noreferrer">자료형 ↗</a> · <a href="https://ko.wikipedia.org/wiki/포인터_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">포인터(주소) ↗</a> · <a href="https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">참조·별칭 ↗</a></span></p>
      </div>

      <h3 class="section-title">② 묶음이면 다 참조 — Date · 클래스 인스턴스도</h3>
      <div class="card">
        <div class="file-label">🔬 "묶음이면 다 참조" — Date · 클래스 인스턴스도 힙에 (▶로 확인)</div>
        <div data-m="bundle"></div>
        <p class="section-desc" style="margin:10px 0 0">plain 객체 <code>{}</code>·배열 <code>[]</code>만 참조가 아니다. <b>Date, 우리가 만든 클래스 인스턴스</b>도 결국 "여러 값을 묶은 것" → 힙에 살고 슬롯엔 주소만 → 복사하면 <b>별칭</b>. 참조의 규칙은 <b>묶음이면 종류를 안 가리고</b> 똑같다.</p>
      </div>

      <h3 class="section-title">③ 그래서 실무에서</h3>
      <ul class="section-list">
        <li>객체·배열을 함수에 넘기면 <b>같은 것</b>을 넘긴다 → 함수 안에서 바꾸면 <b>원본도 바뀐다</b> (→ M6).</li>
        <li>원본을 지키려면 <b>복사본</b>을 만든다 — 스프레드 <code>{...obj}</code> / <code>[...arr]</code> (뒤 강의).</li>
        <li><code>const obj = {...}</code>여도 <code>obj.n = 9</code>는 된다 — const가 막는 건 <b>슬롯의 주소</b>지 <b>힙 내용</b>이 아니다.</li>
      </ul>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">슬롯에 <b>숫자가 들면 복사</b>(독립·M4-1), <b>객체 주소가 들면 공유</b>(별칭·M4-2). <b>변수든 객체 속성이든 똑같다.</b>
        "객체가 끼면 무조건 공유"는 착각 — 대입되는 값의 종류로 갈린다.</p>
      </div>

      <div class="practice-cta">
        <span>그럼 함수에 '넘길' 때는? — 다음 —</span>
        <button class="chip on" data-goto="passval">🧠 M5 · 값에 의한 전달 →</button>
      </div>
    `
    root.querySelector('[data-m="ref"]').append(MemoryModel(SCENARIO_REF))
    root.querySelector('[data-m="alias"]').append(buildNameMap(
      '📇 이름표 장부 <small>— 이름 둘, 같은 칸을 가리킴</small>',
      '🗄️ 메모리 (값이 사는 칸) <small>— 객체 하나</small>',
      [
        { name: 'box', c: '#2563eb', to: 'o1' },
        { name: 'a', c: '#ea580c', to: 'o1' },
      ],
      [
        { id: 'o1', val: '{ name: "민지" }', adr: '#0055', at: 8, c: '#6366f1' },
      ], 20,
    ))
    root.querySelector('[data-m="bundle"]').append(MemoryModel(SCENARIO_BUNDLE))
    root.querySelector('[data-m="qzr2"]').append(Quiz({ q: '<code>let a = { n: 1 }; let b = a; b.n = 9</code> — a.n은?', options: ['1 (안 바뀜)', '9 (같은 객체 공유)'], answer: 1, explain: '<code>let b = a</code>는 <b>주소 복사</b> → a·b가 <b>같은 객체</b>(별칭). b.n=9가 a.n에도 보인다 → <b>9</b>.' }))
    wireCTA(root)
  }

  // ══ M5 · 값에 의한 전달 ═════════════════════════════════════
  window.Lessons['passval'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M5</span>
        <h2>값에 의한 전달 — 넘기면 '복사본'이라 원본이 안전하다</h2>
        <p>원시값을 함수에 넘기면 <b>값이 복사</b>된다. 받은 쪽이 망가뜨려도 내 원본은 멀쩡하다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 헷갈리는 '돈' 비유 바로잡기</span>
        <p>실제 지폐 <b>한 장</b>을 건네는 건 '같은 물건'이라 오히려 <b>참조</b>에 가깝다. <b>값에 의한 전달</b>은 건네는 순간 <b>똑같은 복사본이 하나 더 생기는</b> 것 —
        그래서 '내 것'과 '건넨 것'은 처음부터 <b>다른 두 장</b>이다. 비유는 <b>복사본</b>(문서를 복사해 주면 상대가 사본에 낙서해도 내 원본은 그대로)이 좋다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/값에_의한_호출" target="_blank" rel="noopener noreferrer">평가 전략(값에 의한 호출) ↗</a> · <a href="https://ko.wikipedia.org/wiki/매개변수_(컴퓨터_프로그래밍)" target="_blank" rel="noopener noreferrer">매개변수 ↗</a></p>
      </div>

      <div data-m="qzpv"></div>

      <h3 class="section-title">① 눈으로 — 사본을 찢어도 원본은 안전</h3>
      <span class="learn-tag">📎 공통 스택 그림으로 — 사본 bill을 0으로 만들어도 원본 money는 그대로</span>
      <div data-m="passval"></div>

      <h3 class="section-title">② 객체는 다르다 — 넘겨도 '같은 것'</h3>
      <p class="section-desc">반대로 <b>객체·배열</b>을 넘기면 복사본이 아니라 <b>주소(같은 것)</b>를 넘긴다 → 함수 안에서 바꾸면 <b>원본도 바뀐다</b>.
      그래서 원본을 지키려면 스프레드 <code>{...obj}</code>로 <b>복사본</b>을 만들어 넘긴다(뒤 강의). 왜 그런지는 다음 <b>객체 그래프</b>에서 그림으로.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">원시값을 넘기면 <b>복사본</b>이 전달돼 원본이 안전. 객체를 넘기면 <b>주소</b>가 전달돼 원본이 바뀔 수 있다.</p>
      </div>

      <div class="practice-cta">
        <span>그럼 객체를 넘기면? — 정반대다 —</span>
        <button class="chip on" data-goto="passobj">🧠 M6 · 참조에 의한 전달 →</button>
      </div>
    `
    root.querySelector('[data-m="passval"]').append(MemoryModel(SCENARIO_PASSVAL))
    root.querySelector('[data-m="qzpv"]').append(Quiz({ q: '숫자 money를 함수에 넘겨 함수 안에서 0으로 바꿨다. 원본 money는?', options: ['0으로 바뀐다', '그대로 (복사본이 전달됨)'], answer: 1, explain: '원시값은 <b>복사본</b>이 전달된다. 함수 안에서 아무리 바꿔도 <b>원본은 안전</b>.' }))
    wireCTA(root)
  }

  // ══ M6 · 참조에 의한 전달 (객체를 함수에) ══════════════════
  const SCENARIO_PASSOBJ = {
    title: '객체를 함수에 넘기면 → 원본이 바뀐다',
    code: ['let hero = { name: "용사", level: 1 }', 'function levelUp(user) {', '  user.level = user.level + 1', '}', 'levelUp(hero)'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'hero', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"용사"' }, { key: 'level', value: '1' }] } }, note: 'hero 객체가 힙에. hero 슬롯은 <b>주소</b>만.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'hero', ref: 'h1' }] }, { name: 'levelUp', slots: [{ name: 'user', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"용사"' }, { key: 'level', value: '1' }] } }, note: 'levelUp(hero) 호출 → user에 hero의 <b>주소를 복사</b>. user와 hero는 <b>같은 객체</b>(별칭)! (복사본 아님)' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'hero', ref: 'h1' }] }, { name: 'levelUp', slots: [{ name: 'user', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"용사"' }, { key: 'level', value: '2' }] } }, note: 'user.level을 올리면 → 같은 객체라 <b>hero.level도 2</b>. 함수 안 변경이 원본에 뚫고 나간다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'hero', ref: 'h1' }] }], heap: { h1: { fields: [{ key: 'name', value: '"용사"' }, { key: 'level', value: '2' }] } }, note: 'levelUp 끝. 그래도 <b>hero.level은 2로 바뀐 채</b>. 객체는 주소로 전달돼 원본이 바뀐다. (M5의 원시값과 정반대!)' },
    ],
  }
  window.Lessons['passobj'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M6</span>
        <h2>참조에 의한 전달 — 객체를 함수에 넘기면 원본이 바뀐다</h2>
        <p>M5의 원시값은 <b>복사본</b>이라 안전했다. 객체는 <b>주소</b>가 전달돼, 함수 안에서 바꾸면 <b>원본까지 바뀐다</b>.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>객체를 함수에 넘기면 매개변수와 원본이 <b>같은 힙 객체</b>를 가리킨다(별칭). 그래서 함수 안 <code>user.level = ...</code>가 <b>바깥 hero</b>에도 보인다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/값에_의한_호출" target="_blank" rel="noopener noreferrer">평가 전략 ↗</a> · <a href="https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">참조 ↗</a></p>
      </div>

      <div data-m="qzpo"></div>

      <h3 class="section-title">① 눈으로 — 함수가 원본을 바꾼다</h3>
      <span class="learn-tag">📎 user와 hero가 같은 객체 → user를 바꾸면 hero도 바뀐다</span>
      <div data-m="passobj"></div>

      <h3 class="section-title">② 친근한 예시 — 다 원본이 바뀐다</h3>
      <div class="card">
        <div class="file-label">📄 객체를 넘기면 함수가 원본을 주무른다</div>
        <pre class="err-code">function birthday(user)   { user.age = user.age + 1 }   // 나이 +1 → 원본 바뀜
function discount(item)   { item.price = item.price - 1000 } // 가격 내림 → 원본 바뀜
function equip(char, gear){ char.weapon = gear }        // 장비 장착 → 원본 바뀜
function like(post)       { post.likes = post.likes + 1 }    // 좋아요 +1 → 원본 바뀜</pre>
      </div>
      <p class="section-desc">전부 <b>객체 하나</b>를 넘겨 그 안을 바꾼다 → 넘긴 원본이 그대로 바뀐다. (편할 때도, 사고 날 때도 있다.)</p>

      <h3 class="section-title">③ 원본을 지키려면 — 복사본을 넘긴다</h3>
      <span class="learn-tag">📎 스프레드 {...obj}로 사본을 만들어 넘기거나, 함수가 새 객체를 return</span>
      <div class="card">
        <div class="file-label">📄 원본 안 건드리는 법</div>
        <pre class="err-code">levelUp({ ...hero })                 // 사본을 넘긴다 → 원본 hero 안전
function levelUpSafe(user) {
  return { ...user, level: user.level + 1 }  // 새 객체를 돌려줌 (원본 그대로)
}
let strong = levelUpSafe(hero)       // hero는 그대로, strong만 레벨업</pre>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">객체를 함수에 넘기면 <b>주소</b>가 전달 → 함수 안 변경이 <b>원본까지</b> 바꾼다.
        원본을 지키려면 <b>복사본</b>(<code>{...obj}</code>)을 넘긴다.</p>
      </div>

      <div class="practice-cta">
        <span>배열도 똑같을까? — 다음 —</span>
        <button class="chip on" data-goto="passarr">🧠 M7 · 배열도 참조다 →</button>
      </div>
    `
    root.querySelector('[data-m="passobj"]').append(MemoryModel(SCENARIO_PASSOBJ))
    root.querySelector('[data-m="qzpo"]').append(Quiz({ q: '객체를 함수에 넘겨 함수 안에서 <code>obj.x = 9</code>로 바꿨다. 원본은?', options: ['그대로', '바뀐다 (같은 객체를 넘김)'], answer: 1, explain: '객체는 <b>주소(참조)</b>가 전달된다 → 함수 안과 밖이 <b>같은 객체</b>. 원본도 바뀐다.' }))
    wireCTA(root)
  }

  // ══ M7 · 배열도 참조다 (배열을 함수에) ═════════════════════
  const SCENARIO_PASSARR = {
    title: '배열을 함수에 넘기면 → 원본이 늘어난다',
    code: ['let cart = ["우유"]', 'function addItem(list, item) {', '  list.push(item)', '}', 'addItem(cart, "빵")'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'cart', ref: 'h1' }] }], heap: { h1: { label: '["우유"]' } }, note: 'cart 배열이 힙에. cart 슬롯은 주소만.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'cart', ref: 'h1' }] }, { name: 'addItem', slots: [{ name: 'list', ref: 'h1' }, { name: 'item', value: '"빵"' }] }], heap: { h1: { label: '["우유"]' } }, note: 'addItem 호출 → list에 cart의 <b>주소를 복사</b>. list와 cart는 <b>같은 배열</b>!' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'cart', ref: 'h1' }] }, { name: 'addItem', slots: [{ name: 'list', ref: 'h1' }, { name: 'item', value: '"빵"' }] }], heap: { h1: { label: '["우유", "빵"]' } }, note: 'list.push("빵") → 같은 배열이라 <b>cart도 ["우유","빵"]</b>으로 늘어난다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'cart', ref: 'h1' }] }], heap: { h1: { label: '["우유", "빵"]' } }, note: 'addItem 끝. cart는 이제 <b>2칸</b>. 배열도 객체라 주소로 전달 = 원본 바뀜.' },
    ],
  }
  window.Lessons['passarr'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 M7</span>
        <h2>배열도 참조다 — 배열을 함수에 넘기면</h2>
        <p><b>배열도 객체</b>다. 그래서 함수에 넘기면 <b>같은 배열</b>을 넘기는 것 — 함수 안에서 <code>push</code>하면 원본이 늘어난다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>배열을 넘기면 매개변수와 원본이 <b>같은 배열</b>을 가리킨다. <code>push·sort·splice</code>처럼 <b>원본을 바꾸는</b> 메서드는 바깥 배열도 바꾼다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/배열" target="_blank" rel="noopener noreferrer">배열 ↗</a> · <a href="https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">참조 ↗</a></p>
      </div>

      <div data-m="qzpa"></div>

      <h3 class="section-title">① 눈으로 — 함수가 원본 배열을 늘린다</h3>
      <span class="learn-tag">📎 list와 cart가 같은 배열 → list.push하면 cart도 늘어난다</span>
      <div data-m="passarr"></div>

      <h3 class="section-title">② 예시 — 원본을 바꾸는 것 vs 새 배열을 주는 것</h3>
      <div class="card">
        <div class="file-label">🔴 원본을 바꾼다 (mutating) — 함수에 넘기면 바깥도 바뀜</div>
        <pre class="err-code">arr.push("x")     // 끝에 추가
arr.pop()         // 끝 제거
arr.unshift("x")  // 앞에 추가
arr.sort()        // 정렬
arr.reverse()     // 뒤집기
arr.splice(0, 1)  // 잘라내기</pre>
      </div>
      <div class="card">
        <div class="file-label">🟢 새 배열을 만든다 (원본 안전) — 6강에서 자세히</div>
        <pre class="err-code">arr.map(x => x * 2)     // 변환한 새 배열
arr.filter(x => x > 3)  // 거른 새 배열
arr.slice(0, 2)         // 잘라낸 새 배열
arr.concat([9])         // 이어붙인 새 배열
[...arr]                // 복사본</pre>
      </div>
      <p class="section-desc">🔑 <b>원본을 바꾸는(mutating)</b> 것과 <b>새 배열을 주는</b> 것을 구분하면, "왜 내 배열이 몰래 바뀌었지?"가 사라진다.</p>

      <h3 class="section-title">③ 원본을 지키려면 — 복사본을 넘긴다</h3>
      <div class="card">
        <div class="file-label">📄 사본을 넘겨 원본 보호</div>
        <pre class="err-code">addItem([...cart], "빵")   // 사본을 넘긴다 → 원본 cart 안전</pre>
      </div>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">배열도 객체라 <b>주소</b>로 전달된다. <code>push·sort</code> 같은 <b>원본 변경</b> 메서드는 바깥 배열도 바꾼다.
        지키려면 <code>[...arr]</code> 복사본을 넘긴다.</p>
      </div>

      <div class="practice-cta">
        <span>객체가 객체를 가리키면? — 다음 —</span>
        <button class="chip on" data-goto="graph">🧠 M8 · 객체 그래프 →</button>
      </div>
    `
    root.querySelector('[data-m="passarr"]').append(MemoryModel(SCENARIO_PASSARR))
    root.querySelector('[data-m="qzpa"]').append(Quiz({ q: '배열을 함수에 넘겨 함수 안에서 <code>arr.push(9)</code>했다. 원본 배열은?', options: ['그대로', '늘어난다 (같은 배열)'], answer: 1, explain: '배열도 객체(참조) → 함수 안팎이 같은 배열. push한 게 <b>원본에도</b> 새어 나간다.' }))
    wireCTA(root)
  }

  // ══ M8 · 객체 그래프 (두 변화를 별개 예시로) ════════════════
  // 같은 그림, 다른 코드 — 힙 그래프는 같고 스택 변수 구성(parent 독립 변수)만 다름.
  const SCENARIO_SAME_A = {
    title: 'A · 중첩 리터럴 — 스택엔 me 하나',
    code: ['let me = {', '  name: "나",', '  parent: { name: "아빠" }', '}'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'me', ref: 'h1' }] }],
        heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h2' }] }, h2: { person: '👨', name: '아빠', fields: [] } },
        note: '스택엔 <b>me 하나</b>. 아빠 객체는 <b>me.parent로만</b> 닿는다(독립 변수 없음) → 아빠로 향한 화살표 <b>1개</b>.' },
    ],
  }
  const SCENARIO_SAME_BC = {
    title: 'B·C · 따로 만들어 잇기 — parent 변수도 있음',
    code: ['let parent = { name: "아빠" }', 'let me = { name: "나", parent: parent }'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }] }],
        heap: { h2: { person: '👨', name: '아빠', fields: [] } }, note: '아빠 객체 + 그걸 가리키는 <b>독립 변수 parent</b>.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }],
        heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h2' }] }, h2: { person: '👨', name: '아빠', fields: [] } },
        note: 'me.parent가 <b>같은 아빠</b>를 가리킨다 → 아빠로 향한 화살표 <b>2개</b>(parent·me.parent). <b>힙 그래프는 A와 똑같다!</b> 차이는 parent 변수뿐.' },
    ],
  }
  // 거꾸로 — 같은 코드처럼 보이는데 그림이 다르다: 공유(parent) vs 복사본({...parent}).
  const dad = (age) => ({ person: '👨', name: '아빠', fields: [{ key: 'age', value: age }] })
  const SCENARIO_SHARED = {
    title: '❗ me.parent = parent — 같은 아빠(공유)',
    code: ['let parent = { name: "아빠", age: 50 }', 'let me = { name: "나" }', 'me.parent = parent', 'parent.age = 51'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }] }], heap: { h2: dad('50') }, note: '아빠 객체 + 변수 parent.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [] }, h2: dad('50') }, note: '나 객체.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h2' }] }, h2: dad('50') }, note: 'me.parent = parent → <b>같은 아빠</b>를 가리킨다(화살표 2개).' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h2' }] }, h2: dad('51') }, note: 'parent.age=51 → <b>me.parent.age도 51</b>! 같은 객체라서.' },
    ],
  }
  const SCENARIO_COPY = {
    title: '✅ me.parent = { ...parent } — 복사본(독립)',
    code: ['let parent = { name: "아빠", age: 50 }', 'let me = { name: "나" }', 'me.parent = { ...parent }', 'parent.age = 51'],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }] }], heap: { h2: dad('50') }, note: '아빠 객체 + 변수 parent.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [] }, h2: dad('50') }, note: '나 객체.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h3' }] }, h2: dad('50'), h3: dad('50') }, note: '{ ...parent }는 <b>새 복사본</b>(h3)을 만든다 → me.parent는 <b>복사본</b>을 가리킨다. 원본 h2와 <b>별개</b>!' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'parent', ref: 'h2' }, { name: 'me', ref: 'h1' }] }], heap: { h1: { person: '🧑', name: '나', fields: [{ key: 'parent', ref: 'h3' }] }, h2: dad('51'), h3: dad('50') }, note: 'parent.age=51 → 원본만 51. <b>me.parent.age는 여전히 50</b>! 복사본이라 안 링크.' },
    ],
  }
  window.Lessons['graph'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 G1</span>
        <h2>객체 그래프 — 객체가 객체를 가리킨다 (효니와 내 베프)</h2>
        <p>참조는 스택→객체뿐 아니라 <b>객체→객체</b>로도 이어진다. 내 베프는 <b>효니</b> 한 명이라 <code>me.bestFriend</code>와 <code>hyoni</code>는 <b>같은 사람</b>이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p><code>me.bestFriend</code>가 효니 객체를 가리키면, 효니를 가리키는 화살표가 <b>둘</b>(hyoni · me.bestFriend)이 된다. 같은 객체라 <b>어느 쪽으로 바꿔도 양쪽에 보인다</b> — 두 방향을 각각 본다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">객체 ↗</a> · <a href="https://ko.wikipedia.org/wiki/그래프_(자료_구조)" target="_blank" rel="noopener noreferrer">그래프(자료구조) ↗</a></p>
      </div>

      <div data-m="qzg1"></div>

      <h3 class="section-title">① 내 베프가 머리를 자르면? → 효니의 머리는</h3>
      <span class="learn-tag">📎 me.bestFriend 쪽으로 바꾼다 → 효니에도 반영</span>
      <div data-m="hair"></div>

      <h3 class="section-title">② 효니가 복권에 당첨되면? → 내 베프는</h3>
      <span class="learn-tag">📎 반대로 hyoni 쪽으로 바꾼다 → me.bestFriend에도 반영</span>
      <div data-m="money"></div>

      <h3 class="section-title">③ 2중 그래프 — 친구의 친구 (me → 효니 → 지민)</h3>
      <span class="learn-tag">📎 객체가 객체를, 그 객체가 또 객체를 → 화살표가 사슬처럼 이어진다</span>
      <p class="section-desc">효니에게도 베프가 있다 — <b>지민</b>. 그래서 <code>me.bestFriend.bestFriend</code>는 지민이다. 점(.)을 따라 <b>화살표를 두 번</b> 건너간다. ▶로 사슬이 만들어지는 걸 보라.</p>
      <div data-m="nested"></div>
      <p class="section-desc">참조가 여러 겹이면 <b>깊은 객체 그래프</b>가 된다. 실전 데이터(댓글 → 작성자 → 프로필 → 회사 …)가 다 이 사슬 모양이다.</p>

      <h3 class="section-title">④ 같은 그림, 다른 코드 — 문법 말고 메모리로 생각하기</h3>
      <span class="learn-tag">📎 세 가지로 같은 관계(me → 아빠)를 만든다 — 힙 그래프는 같고, 변수 구성만 다르다</span>
      <div class="card">
        <div class="file-label">📄 셋 다 me → 아빠 관계를 만든다</div>
        <pre class="err-code">A) let me = { name:"나", parent: { name:"아빠" } }            // 중첩 리터럴
B) let parent = {name:"아빠"};  let me = {};  me.parent = parent   // 따로 만들어 잇기
C) let parent = {name:"아빠"};  let me = { name:"나", parent: parent }  // 만들고 참조</pre>
      </div>
      <div class="card"><div class="file-label">🔬 A — 스택엔 me 하나 (아빠 화살표 1개)</div><div data-m="sameA"></div></div>
      <div class="card"><div class="file-label">🔬 B·C — parent 변수도 (아빠 화살표 2개)</div><div data-m="sameBC"></div></div>
      <p class="section-desc">🔑 <b>힙 그래프(me → 아빠)는 셋 다 같다.</b> 차이는 딱 하나 — 아빠를 독립으로 가리키는 <code>parent</code> 변수가 있느냐(B·C)·없느냐(A).
      교훈: <b>코드 생김새가 달라도 메모리 그림은 같을 수 있다 → 문법이 아니라 "무엇이 무엇을 가리키나"로 생각하라.</b>
      (실용 차이: A는 아빠를 <code>me.parent</code>로만 만지고 me를 놓으면 아빠도 쓰레기, B·C는 <code>parent</code>로도 만지고 붙잡아 둔다 → 별칭·GC에서 갈린다.)</p>

      <h3 class="section-title">⑤ 거꾸로 — 같은 코드처럼 보이는데 그림이 다르다</h3>
      <span class="learn-tag">📎 me.parent = parent (공유) vs me.parent = { ...parent } (복사본) — 한 끗 차이, 딴 세상</span>
      <p class="section-desc">④는 "다른 코드, 같은 그림"이었다. 이번엔 반대 — <b>거의 같아 보이는 코드가 전혀 다른 그림</b>을 만든다. 이게 <b>별칭 버그</b>의 핵심이다.</p>
      <div class="card"><div class="file-label">❗ me.parent = parent — 같은 아빠를 공유</div><div data-m="shared"></div></div>
      <div class="card"><div class="file-label">✅ me.parent = { ...parent } — 복사본(독립)</div><div data-m="copy"></div></div>
      <p class="section-desc">🔑 <code>parent</code>면 <b>같은 객체</b>(바꾸면 양쪽 반영), <code>{ ...parent }</code>면 <b>새 복사본</b>(바꿔도 원본 그대로). 코드 겉모습이 아니라 <b>메모리 그림</b>을 봐야 안다. (스프레드 <code>{ ... }</code>는 뒤 강의 — 여기선 그림만.)</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">여러 객체가 서로를 가리키면 힙에 <b>객체 그래프</b>가 생긴다. 같은 객체를 가리키는 이름이 여럿이면,
        <b>어느 이름으로 바꾸든 모두에게 보인다</b>. 실전 데이터(친구 목록·댓글 작성자·장바구니 상품)가 다 이 모양이다.</p>
      </div>

      <div class="practice-cta">
        <span>친구가 여럿이면? 배열에 담는다 — 다음 —</span>
        <button class="chip on" data-goto="friends">🧠 G2 · 친구 목록 (5명) →</button>
      </div>
    `
    root.querySelector('[data-m="hair"]').append(MemoryModel(SCENARIO_GRAPH_HAIR))
    root.querySelector('[data-m="money"]').append(MemoryModel(SCENARIO_GRAPH_MONEY))
    root.querySelector('[data-m="nested"]').append(MemoryModel(SCENARIO_GRAPH_NESTED))
    root.querySelector('[data-m="sameA"]').append(MemoryModel(SCENARIO_SAME_A))
    root.querySelector('[data-m="sameBC"]').append(MemoryModel(SCENARIO_SAME_BC))
    root.querySelector('[data-m="shared"]').append(MemoryModel(SCENARIO_SHARED))
    root.querySelector('[data-m="copy"]').append(MemoryModel(SCENARIO_COPY))
    root.querySelector('[data-m="qzg1"]').append(Quiz({ q: '<code>me.bestFriend</code>가 효니를 가리킨다. <code>me.bestFriend.hair = "숏컷"</code>하면 효니 본인은?', options: ['안 바뀐다', '숏컷이 된다 (같은 사람)'], answer: 1, explain: 'me.bestFriend와 효니 변수가 <b>같은 사람 객체</b>를 가리킨다. 한쪽으로 바꾸면 다른 쪽으로 봐도 바뀐다.' }))
    wireCTA(root)
  }

  // ══ 객체 그래프 · 친구 목록 (배열 안 사람들 + 참조 증명) ═════
  const friendBox = (emoji, name, mood) => ({ person: emoji, name, fields: [{ key: 'mood', value: mood }] })
  const meWithFriends = { person: '🧑', name: '나', fields: [{ key: 'friends', ref: 'h7' }] }
  const others = { h3: friendBox('🧑', '지민', '"😎"'), h4: friendBox('👨', '민수', '"😴"'), h5: friendBox('👧', '서연', '"🤗"'), h6: friendBox('👦', '준호', '"😐"') }
  const friendsArr = { items: [{ ref: 'h1' }, { ref: 'h3' }, { ref: 'h4' }, { ref: 'h5' }, { ref: 'h6' }] }
  const SCENARIO_FRIENDS = {
    title: '친구 목록 — me.friends[0]과 hyoni는 같은 효니',
    code: [
      'let hyoni = { name: "효니", mood: "😀" }',
      '',
      'let me = {',
      '  name: "나",',
      '  friends: [',
      '    hyoni,                          // 변수로 넣음 (같은 효니!)',
      '    { name: "지민", mood: "😎" },   // 나머지는 바로 객체로',
      '    { name: "민수", mood: "😴" },',
      '    { name: "서연", mood: "🤗" },',
      '    { name: "준호", mood: "😐" },',
      '  ],',
      '}',
      '',
      'me.friends[0].mood = "😭"   // 목록 0번(효니) 기분 바꿈',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }] }], heap: { h1: friendBox('👩', '효니', '"😀"') }, note: '효니(사람)를 변수 hyoni로 가리킨다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'me', ref: 'h2' }] }],
        heap: { h1: friendBox('👩', '효니', '"😀"'), h2: meWithFriends, ...others, h7: friendsArr },
        note: 'me.friends는 <b>5명</b> 배열. <b>0번은 변수 hyoni</b>(같은 효니), 나머지 4명은 객체 리터럴로 바로 만든다 → 효니를 향한 화살표가 <b>둘</b>(hyoni · me.friends[0])!' },
      { line: 13, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'me', ref: 'h2' }] }],
        heap: { h1: friendBox('😭', '효니', '"😭"'), h2: meWithFriends, ...others, h7: friendsArr },
        note: '<code>me.friends[0].mood = "😭"</code> → 목록 0번(효니)을 바꿨는데 <b>hyoni.mood도 😭</b>! 복사본이면 이럴 수 없다 → 이게 <b>참조</b>라는 증거.' },
    ],
  }
  window.Lessons['friends'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🧠 G2</span>
        <h2>친구 목록 — 배열 안에 사람들 (참조 증명)</h2>
        <p>사람(me)이 <b>friends 배열</b>에 친구 5명을 담는다. 그중 효니는 <code>hyoni</code>로도 가리켜져 — 목록에서 바꾸면 hyoni도 바뀐다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>배열에 <b>객체들</b>을 담으면 me → friends배열 → 여러 사람으로 그래프가 <b>가지친다</b>. 같은 객체를 두 경로(hyoni · me.friends[0])로 가리키면 <b>한쪽 변경이 양쪽에</b> — 참조의 증거.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/배열" target="_blank" rel="noopener noreferrer">배열 ↗</a> · <a href="https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">참조 ↗</a></p>
      </div>

      <div data-m="qzg2"></div>

      <h3 class="section-title">① 눈으로 — 친구 5명, 그리고 참조 증명</h3>
      <span class="learn-tag">📎 me.friends[0]의 속성을 바꾸면 → hyoni도 바뀐다(같은 객체니까)</span>
      <div data-m="friends"></div>
      <p class="section-desc">🔑 <b>me.friends[0]</b>과 <b>hyoni</b>가 같은 효니를 가리키니, 목록 쪽으로 속성을 바꿔도 hyoni로 봐도 똑같다. 복사본이면 불가능 → 그래서 <b>참조</b>임을 안다.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">배열에 객체를 담으면 <b>가지친 객체 그래프</b>(친구 목록·상품 목록·댓글 목록…).
        같은 객체를 여러 경로로 가리키면 어느 경로로 바꾸든 모두에게 보인다 = 참조.</p>
      </div>

      <div class="practice-cta">
        <span>사람이 사람을 부모로 가리키면? 트리가 된다 — 다음 —</span>
        <button class="chip on" data-goto="family">🕸️ G3 · 계통도 (가계도) →</button>
      </div>
    `
    root.querySelector('[data-m="friends"]').append(MemoryModel(SCENARIO_FRIENDS))
    root.querySelector('[data-m="qzg2"]').append(Quiz({ q: '사람 객체가 든 배열 <code>list</code>. <code>list[0].name = "X"</code>로 바꾸면, 원래 그 사람 변수로 봐도?', options: ['안 바뀜', '바뀜 (같은 객체)'], answer: 1, explain: '배열 안엔 사람 객체의 <b>주소(참조)</b>가 들었다. list[0]과 그 변수가 <b>같은 객체</b> → 한쪽 변경이 양쪽에 보인다.' }))
    wireCTA(root)
  }

  // ══ 객체 그래프 · 계통도 (가계도 트리) ══════════════════════
  const P = (emoji, name, parentRef) => ({ person: emoji, name, fields: parentRef ? [{ key: 'parent', ref: parentRef }] : [] })
  const SCENARIO_FAMILY = {
    title: '계통도 — 사람이 부모(객체)를 가리키면 트리가 된다',
    code: [
      'let grandpa = { name: "할아버지" }',
      'let dad    = { name: "아빠",   parent: grandpa }',
      'let uncle  = { name: "삼촌",   parent: grandpa }',
      'let me     = { name: "나",     parent: dad }',
      'let sister = { name: "동생",   parent: dad }',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }] }], heap: { h1: P('👴', '할아버지') }, note: '할아버지 — 뿌리(root). 부모가 없다.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }, { name: 'dad', ref: 'h2' }] }], heap: { h1: P('👴', '할아버지'), h2: P('👨', '아빠', 'h1') }, note: '아빠.parent = 할아버지 → 아빠에서 할아버지로 화살표.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }, { name: 'dad', ref: 'h2' }, { name: 'uncle', ref: 'h3' }] }], heap: { h1: P('👴', '할아버지'), h2: P('👨', '아빠', 'h1'), h3: P('🧔', '삼촌', 'h1') }, note: '삼촌도 parent가 할아버지 → 할아버지를 가리키는 화살표가 <b>둘</b>(아빠·삼촌).' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }, { name: 'dad', ref: 'h2' }, { name: 'uncle', ref: 'h3' }, { name: 'me', ref: 'h4' }] }], heap: { h1: P('👴', '할아버지'), h2: P('👨', '아빠', 'h1'), h3: P('🧔', '삼촌', 'h1'), h4: P('🧑', '나', 'h2') }, note: '나.parent = 아빠 → 한 층 더 내려간다.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'grandpa', ref: 'h1' }, { name: 'dad', ref: 'h2' }, { name: 'uncle', ref: 'h3' }, { name: 'me', ref: 'h4' }, { name: 'sister', ref: 'h5' }] }], heap: { h1: P('👴', '할아버지'), h2: P('👨', '아빠', 'h1'), h3: P('🧔', '삼촌', 'h1'), h4: P('🧑', '나', 'h2'), h5: P('👧', '동생', 'h2') }, note: '<b>계통도 완성!</b> <code>me.parent</code>=아빠, <code>me.parent.parent</code>=할아버지. 나와 동생은 <b>같은 아빠</b>를 가리킨다(참조).' },
    ],
  }
  // 계통도 + 구매 → 공유된 아빠 지갑에서 차감 = 참조 증명 (돈으로 실감나게)
  const Pm = (emoji, name, extra) => ({ person: emoji, name, fields: extra })
  const SCENARIO_FAMILY_MONEY = {
    title: '아빠 지갑에서 사면? — 나·동생이 같은 지갑',
    code: [
      'let dad    = { name: "아빠", money: 100000 }   // 가족 지갑',
      'let me     = { name: "나",   parent: dad }',
      'let sister = { name: "동생", parent: dad }',
      'me.parent.money = me.parent.money - 30000   // 내가 3만원 씀',
      'sister.parent.money = sister.parent.money - 90000  // 동생이 9만원짜리 삼',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '100000' }]) }, note: '아빠 객체 — money 10만원(가족 지갑).' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'me', ref: 'h2' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '100000' }]), h2: Pm('🧑', '나', [{ key: 'parent', ref: 'h1' }]) }, note: '나.parent = 아빠.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'me', ref: 'h2' }, { name: 'sister', ref: 'h3' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '100000' }]), h2: Pm('🧑', '나', [{ key: 'parent', ref: 'h1' }]), h3: Pm('👧', '동생', [{ key: 'parent', ref: 'h1' }]) }, note: '동생도 parent가 아빠 → 나·동생이 <b>같은 아빠 지갑</b>을 가리킨다(화살표 둘).' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'me', ref: 'h2' }, { name: 'sister', ref: 'h3' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '70000' }]), h2: Pm('🧑', '나', [{ key: 'parent', ref: 'h1' }]), h3: Pm('👧', '동생', [{ key: 'parent', ref: 'h1' }]) }, note: '내가 <code>me.parent</code>(=아빠) 지갑에서 3만원 씀 → 아빠.money <b>70000</b>. <b>동생이 봐도 sister.parent.money는 70000</b>! 같은 아빠(객체)라서 = <b>참조 증명</b>.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'me', ref: 'h2' }, { name: 'sister', ref: 'h3' }] }], heap: { h1: Pm('👨', '아빠', [{ key: 'money', value: '-20000' }]), h2: Pm('🧑', '나', [{ key: 'parent', ref: 'h1' }]), h3: Pm('👧', '동생', [{ key: 'parent', ref: 'h1' }]) }, note: '이번엔 <b>동생</b>이 <code>sister.parent</code>(=<b>같은 아빠</b>) 지갑에서 9만원 씀. 근데 지갑은 이미 <b>70000</b>(내가 3만 씀)에서 출발 → 70000 - 90000 = <b>-20000, 펑크!</b> 내 3만 + 동생 9만 = 12만이 <b>하나의 money 셀</b>에서 빠졌다. 각자 지갑(복사)이면 10만-9만=+1만이라 절대 안 나올 결과 → 둘이 <b>한 지갑을 공유(참조)</b>한 증거. (공유는 편하지만 서로 모르고 쓰면 펑크난다.)' },
    ],
  }
  // 대비 — 객체 속 '원시값(금액 숫자)'을 꺼내 적으면 복사(공유 안 됨). 지갑 vs 수첩에 베낀 숫자.
  const SCENARIO_PRIM_COPY = {
    title: "'금액'을 꺼내 적으면? — 숫자는 복사(공유 안 됨)",
    code: [
      'let dad = { name: "아빠", money: 100000 }',
      'let myNote = dad.money       // 지갑 금액을 수첩에 베낌 (숫자 복사)',
      'myNote = myNote - 30000      // 내 수첩 숫자만 고침',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [{ key: 'money', value: '100000' }] } }, note: '아빠 지갑(객체) money 10만.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'myNote', value: '100000' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [{ key: 'money', value: '100000' }] } }, note: 'myNote = dad.money → 지갑 <b>금액(숫자)만 값으로 복사</b>. myNote는 <b>지갑 객체(h1)를 가리키지 않고</b> — 자기만의 <b>숫자 셀(10만)</b>을 가리킨다(그래서 지갑과 무관).' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'myNote', value: '70000', bad: true }] }], heap: { h1: { person: '👨', name: '아빠', fields: [{ key: 'money', value: '100000' }] } }, note: '내 수첩(myNote)만 70000. <b>아빠 지갑은 그대로 10만!</b> 숫자를 베낀 것뿐이라 지갑과 무관 = <b>원시값은 복사</b>(공유 안 됨).' },
    ],
  }

  // 부모는 둘 — 한 객체(me)가 father·mother 두 참조를 가진다 (다중 엣지)
  const SCENARIO_TWO_PARENTS = {
    title: '부모는 둘 — me가 father·mother 두 개를 가리킨다',
    code: [
      'let dad = { name: "아빠" }',
      'let mom = { name: "엄마" }',
      'let me  = { name: "나", father: dad, mother: mom }',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [] } }, note: '아빠 객체.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'mom', ref: 'h2' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [] }, h2: { person: '👩', name: '엄마', fields: [] } }, note: '엄마 객체도.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'mom', ref: 'h2' }, { name: 'me', ref: 'h3' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [] }, h2: { person: '👩', name: '엄마', fields: [] }, h3: { person: '🧑', name: '나', fields: [{ key: 'father', ref: 'h1' }, { key: 'mother', ref: 'h2' }] } }, note: '<b>me 하나가 화살표 둘</b> — <code>father</code>→아빠, <code>mother</code>→엄마. 한 객체는 참조를 <b>여러 개</b> 가질 수 있다. (①에선 아빠만 <code>parent</code>로 그렸지만, 실은 부모가 둘.)' },
    ],
  }
  // 관계는 parent만이 아니다 — 삼촌의 형의 와이프 = 엄마 = me.mother (두 경로가 한 노드에 수렴 = 별칭)
  const SCENARIO_RELATION = {
    title: '삼촌의 형의 와이프 = ? — 두 경로가 한 사람에 수렴(별칭)',
    code: [
      'let dad   = { name: "아빠" }',
      'let mom   = { name: "엄마" }',
      'let uncle = { name: "삼촌", brother: dad }  // 삼촌의 형 = 아빠',
      'let me    = { name: "나", father: dad, mother: mom }',
      'dad.wife  = mom                            // 아빠의 와이프 = 엄마',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [] } }, note: '아빠.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'mom', ref: 'h2' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [] }, h2: { person: '👩', name: '엄마', fields: [] } }, note: '엄마.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'mom', ref: 'h2' }, { name: 'uncle', ref: 'h3' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [] }, h2: { person: '👩', name: '엄마', fields: [] }, h3: { person: '🧔', name: '삼촌', fields: [{ key: 'brother', ref: 'h1' }] } }, note: '삼촌의 <code>brother</code>(형) = 아빠 → 삼촌에서 아빠로 화살표.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'mom', ref: 'h2' }, { name: 'uncle', ref: 'h3' }, { name: 'me', ref: 'h4' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [] }, h2: { person: '👩', name: '엄마', fields: [] }, h3: { person: '🧔', name: '삼촌', fields: [{ key: 'brother', ref: 'h1' }] }, h4: { person: '🧑', name: '나', fields: [{ key: 'father', ref: 'h1' }, { key: 'mother', ref: 'h2' }] } }, note: '나 → <code>father</code>=아빠, <code>mother</code>=엄마.' },
      { line: 4, stack: [{ name: 'main', slots: [{ name: 'dad', ref: 'h1' }, { name: 'mom', ref: 'h2' }, { name: 'uncle', ref: 'h3' }, { name: 'me', ref: 'h4' }] }], heap: { h1: { person: '👨', name: '아빠', fields: [{ key: 'wife', ref: 'h2' }] }, h2: { person: '👩', name: '엄마', fields: [] }, h3: { person: '🧔', name: '삼촌', fields: [{ key: 'brother', ref: 'h1' }] }, h4: { person: '🧑', name: '나', fields: [{ key: 'father', ref: 'h1' }, { key: 'mother', ref: 'h2' }] } }, note: '아빠의 <code>wife</code> = 엄마. 이제 걸어 보자 — <code>uncle.brother.wife</code>: 삼촌→형(아빠)→와이프 = <b>엄마(h2)</b>. 그런데 <code>me.mother</code>도 <b>엄마(h2)</b> → <b>두 경로가 같은 상자에 수렴</b>! 문장은 달라도 메모리에선 <b>같은 객체(별칭)</b>.' },
    ],
  }

  window.Lessons['family'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🕸️ G3</span>
        <h2>계통도 — 트리 (가계도)</h2>
        <p>사람 객체가 <code>parent</code>로 부모 객체를 가리키면, 힙에 <b>트리(계통도)</b>가 생긴다. 별칭·목록에 이은 객체 그래프의 정점.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>객체가 서로를 가리키면 <b>어떤 구조든</b> 만든다 — 한 줄(별칭), 목록(배열), 그리고 <b>트리(계통도)</b>.
        점(.)을 따라가면 <code>me.parent.parent</code>처럼 위로 거슬러 오른다.</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">객체 ↗</a> · <a href="https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">참조 ↗</a></p>
      </div>

      <div data-m="qzg3"></div>

      <h3 class="section-title">① 눈으로 — 3대(代)가 이어진다</h3>
      <span class="learn-tag">📎 ▶로 할아버지 → 아빠·삼촌 → 나·동생 트리가 만들어진다</span>
      <div data-m="family"></div>

      <h3 class="section-title">② 💳 아빠 지갑에서 사면? — 구매로 참조 증명</h3>
      <span class="learn-tag">📎 나·동생이 같은 아빠를 가리킨다 → 내가 쓰면 동생이 봐도 줄어든다</span>
      <p class="section-desc">가장 실감나는 증거 — 아빠가 <b>가족 지갑(money)</b>을 가졌다고 하자. 내가 <code>me.parent.money</code>에서 3만원을 쓰면?
      복사본이면 나만 줄겠지만, <b>참조</b>라 <b>동생이 봐도 아빠 지갑이 줄어 있다</b>. 이어서 <b>동생</b>이 9만원을 쓰면? 이미 줄어든 <b>7만원에서 또</b> 빠져 <b>펑크(-2만)</b>난다 — 둘이 한 지갑을 헐기 때문. ▶로 확인하라.</p>
      <div data-m="familyMoney"></div>

      <h3 class="section-title">③ 근데 '금액'만 꺼내 적으면? — 숫자는 복사(공유 안 됨)</h3>
      <span class="learn-tag">📎 지갑(객체)은 공유되지만, 지갑 속 '금액 숫자'를 꺼내면 복사다 — 값 vs 참조</span>
      <p class="section-desc">현실 감각 그대로 — <b>지갑을 통째로 건네면</b> 같은 지갑(참조, ②)이다. 그런데 <b>"얼마 있어?"라고 물어 금액을 수첩에 적으면</b>?
      그 숫자는 <b>복사</b>다. 내 수첩을 고쳐도 아빠 지갑은 그대로. ▶로 확인하라.</p>
      <div data-m="primCopy"></div>
      <p class="section-desc">🔑 정리: <b>객체(지갑) = 가리키면 공유(참조)</b> · <b>원시값(금액 숫자) = 꺼내면 복사</b>. 같은 아빠라도 "지갑을 나눠 가지는 것"과 "금액을 베껴 적는 것"은 완전히 다르다.</p>

      <h3 class="section-title">④ 트리를 타고 오르기</h3>
      <div class="card">
        <div class="file-label">📄 점(.)으로 조상 찾아가기</div>
        <pre class="err-code">me.name                 // "나"
me.parent.name          // "아빠"      (한 칸 위)
me.parent.parent.name   // "할아버지"  (두 칸 위)
me.parent === sister.parent   // true — 나와 동생은 같은 아빠(참조)</pre>
      </div>
      <div class="card"><div class="file-label">🔬 진짜 출력해 보기 — "아빠의 아빠"(두 칸 위)까지 거슬러</div><div data-m="climb"></div></div>
      <p class="section-desc">🔑 이 <b>트리 모양</b>이 실전에 그대로 쓰인다 — <b>조직도</b>(사원→팀장→임원), <b>카테고리</b>(소분류→대분류), <b>댓글의 답글</b>, <b>폴더 구조</b>. 전부 객체가 부모를 가리키는 계통도다.</p>

      <h3 class="section-title">⑤ 엄마는? — 부모는 둘 (한 객체가 참조 여럿)</h3>
      <span class="learn-tag">📎 ①에선 아빠만 그렸다. 실은 me가 father·mother 둘을 가리킨다 — 노드 하나에 화살표 여럿</span>
      <p class="section-desc">계통도를 아빠 쪽(<code>parent</code>)만으로 그렸지만, 실제 가족엔 <b>엄마</b>도 있다. me에 <code>father</code>·<code>mother</code>를 주면
      <b>한 사람(객체)이 여러 관계로 이어진다</b> — 이게 그래프의 본모습(참조는 개수 제한이 없다).</p>
      <div data-m="twoParents"></div>
      <div class="card"><div class="file-label">🔬 두 부모를 각각 따라가기</div><div data-m="twoParentsRun"></div></div>

      <h3 class="section-title">⑥ 🧩 삼촌의 형의 와이프는? — 서로 다른 길이 같은 사람에 (별칭)</h3>
      <span class="learn-tag">📎 관계엔 여러 종류(부모·형제·배우자) — 각각이 화살표(키)다. 다른 경로가 같은 노드에 도착하면 = 별칭</span>
      <p class="section-desc">관계는 <code>parent</code>만이 아니다 — <b>형제(brother)·배우자(wife)</b>도 각각 화살표다. 재미난 퀴즈:
      <b>"삼촌의 형의 와이프"</b>는 누구? 삼촌 → 형(=아빠) → 와이프(=엄마). 그런데 그 엄마는 <b>내 엄마(<code>me.mother</code>)와 같은 사람</b>이다.
      완전히 다른 문장(경로)이 <b>메모리에선 같은 상자 하나</b>에 도착한다. ▶로 화살표가 <b>수렴</b>하는 걸 보라.</p>
      <div data-m="relation"></div>
      <div class="card"><div class="file-label">🔬 두 경로가 정말 같은지 === 로 증명</div><div data-m="relationRun"></div></div>
      <p class="section-desc">🔑 <code>uncle.brother.wife === me.mother</code> → <b>true</b>. 겉보기 경로는 "삼촌의 형의 와이프" vs "내 엄마"로 딴판이어도,
      가리키는 건 <b>하나의 엄마 객체</b>. 서로 다른 경로가 한 노드를 가리키는 게 <b>별칭(alias)</b> — G1에서 본 별칭이 그래프로 커진 모습이다.</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약</p>
        <p class="section-desc" style="margin-top:0">객체 참조로 <b>트리(계통도)</b>를 만든다. 자식이 부모를 가리키고, <code>.parent.parent</code>로 거슬러 오른다.
        여러 자식이 <b>같은 부모</b>를 가리키면 그 부모는 하나의 객체(참조). 한 객체는 <b>참조를 여럿</b>(father·mother·brother·wife) 가질 수 있고,
        <b>서로 다른 경로가 같은 노드에 도착</b>하면 그게 <b>별칭</b>이다.</p>
      </div>

      <div class="practice-cta">
        <span>친구끼리 서로를 가리키면? 순환이 생긴다 — 다음 —</span>
        <button class="chip on" data-goto="cycle">🕸️ G4 · 친구 네트워크 (순환) →</button>
      </div>
    `
    root.querySelector('[data-m="family"]').append(MemoryModel(SCENARIO_FAMILY))
    root.querySelector('[data-m="familyMoney"]').append(MemoryModel(SCENARIO_FAMILY_MONEY))
    root.querySelector('[data-m="primCopy"]').append(MemoryModel(SCENARIO_PRIM_COPY))
    root.querySelector('[data-m="climb"]').append(Runner({
      showBox: false,
      code: [
        'let grandpa = { name: "할아버지" }',
        'let dad = { name: "아빠", parent: grandpa }',
        'let me  = { name: "나", parent: dad }',
        'print(me.parent.name)          // "아빠"     (한 칸 위)',
        'print(me.parent.parent.name)   // "할아버지"  (두 칸 위!)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="twoParents"]').append(MemoryModel(SCENARIO_TWO_PARENTS))
    root.querySelector('[data-m="twoParentsRun"]').append(Runner({
      showBox: false,
      code: [
        'let dad = { name: "아빠" }',
        'let mom = { name: "엄마" }',
        'let me  = { name: "나", father: dad, mother: mom }',
        'print(me.father.name)   // "아빠"',
        'print(me.mother.name)   // "엄마"  (한 객체가 화살표 둘)',
      ].join('\n'),
    }))
    root.querySelector('[data-m="relation"]').append(MemoryModel(SCENARIO_RELATION))
    root.querySelector('[data-m="relationRun"]').append(Runner({
      showBox: false,
      code: [
        'let dad   = { name: "아빠" }',
        'let mom   = { name: "엄마" }',
        'let uncle = { name: "삼촌", brother: dad }',
        'let me    = { name: "나", father: dad, mother: mom }',
        'dad.wife  = mom',
        'print(uncle.brother.wife.name)          // "엄마"  (삼촌→형→와이프)',
        'print(me.mother.name)                   // "엄마"  (나→엄마)',
        'print(uncle.brother.wife === me.mother) // true — 같은 사람(별칭)!',
      ].join('\n'),
    }))
    root.querySelector('[data-m="qzg3"]').append(Quiz({ q: '<code>me.parent</code>는 엄마, 엄마의 <code>parent</code>는 할머니. <code>me.parent.parent</code>는?', options: ['엄마', '할머니', '나'], answer: 1, explain: '화살표를 <b>두 번</b> 따라간다 — me→엄마→할머니. 이게 <b>트리(그래프) 탐색</b>.' }))
    wireCTA(root)
  }

  // ══ 객체 그래프 · 순환 (친구끼리 서로 가리킴) ═══════════════
  const SCENARIO_CYCLE = {
    title: '순환 — 효니와 지민은 서로의 베프',
    code: [
      'let hyoni = { name: "효니" }',
      'let jimin = { name: "지민" }',
      'hyoni.bestFriend = jimin   // 효니의 베프 = 지민',
      'jimin.bestFriend = hyoni   // 지민의 베프 = 효니 (서로!)',
    ],
    steps: [
      { line: 0, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }] }], heap: { h1: { person: '👩', name: '효니', fields: [] } }, note: '효니 객체.' },
      { line: 1, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'jimin', ref: 'h2' }] }], heap: { h1: { person: '👩', name: '효니', fields: [] }, h2: { person: '🧑', name: '지민', fields: [] } }, note: '지민 객체. 아직 서로 모른다.' },
      { line: 2, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'jimin', ref: 'h2' }] }], heap: { h1: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h2' }] }, h2: { person: '🧑', name: '지민', fields: [] } }, note: '효니.bestFriend = 지민 → 효니에서 지민으로 화살표.' },
      { line: 3, stack: [{ name: 'main', slots: [{ name: 'hyoni', ref: 'h1' }, { name: 'jimin', ref: 'h2' }] }], heap: { h1: { person: '👩', name: '효니', fields: [{ key: 'bestFriend', ref: 'h2' }] }, h2: { person: '🧑', name: '지민', fields: [{ key: 'bestFriend', ref: 'h1' }] } }, note: '지민.bestFriend = 효니 → <b>서로 가리킨다 = 순환(cycle)!</b> <code>hyoni.bestFriend.bestFriend</code>는 돌고 돌아 다시 <b>효니 자신</b>.' },
    ],
  }
  window.Lessons['cycle'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header">
        <span class="badge">🕸️ G4</span>
        <h2>친구 네트워크 — 서로가 서로를 (순환)</h2>
        <p>친구끼리는 <b>서로를</b> 가리킨다 — 효니의 베프는 지민, 지민의 베프는 효니. 이렇게 <b>돌아오는</b> 참조가 <b>순환(cycle)</b>이다.</p>
      </header>

      <div class="lesson-goal">
        <span class="lesson-goal-tag">🎯 학습 포인트</span>
        <p>객체 그래프의 마지막 모양 — <b>한 줄(별칭) → 목록 → 트리 → 순환(그물)</b>. 순환에선 화살표를 따라가면 <b>제자리로 돌아온다</b>(<code>hyoni.bestFriend.bestFriend === hyoni</code>).</p>
        <p class="section-desc" style="margin:8px 0 0;opacity:.82">📚 관련 용어(위키): <a href="https://ko.wikipedia.org/wiki/쓰레기_수집_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">순환 참조와 GC ↗</a> · <a href="https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)" target="_blank" rel="noopener noreferrer">참조 ↗</a></p>
      </div>

      <div data-m="qzg4"></div>

      <h3 class="section-title">① 눈으로 — 서로 가리키기</h3>
      <span class="learn-tag">📎 ▶로 효니→지민, 지민→효니 화살표가 고리를 이룬다</span>
      <div data-m="cycle"></div>

      <h3 class="section-title">② 순환은 실전에 흔하다</h3>
      <p class="section-desc">맞팔로우, 상호 친구, 채팅방 ↔ 참가자, 주문 ↔ 고객 — 서로를 가리키는 <b>순환</b>은 실전 데이터에 아주 많다.
      다만 <code>console.log</code>로 통째로 찍거나 <code>JSON.stringify</code>하면 <b>무한 루프</b>가 날 수 있어 주의한다(돌고 돌아 끝이 없어서).</p>

      <div class="concept">
        <p class="concept-lead">📖 한 줄 요약 · 그리고 다음</p>
        <p class="section-desc" style="margin-top:0">객체가 <b>서로를</b> 가리키면 <b>순환</b>. 그래프는 어떤 모양이든 된다(줄·목록·트리·순환).
        🔑 그런데 <b>서로만 가리키고 아무도 안 쓰는 순환</b>은 어떻게 치울까? → <b>메모리 심화 · 가비지 컬렉션</b>에서 이어진다.</p>
      </div>

      <div class="practice-cta">
        <span>객체 그래프 완성! 값 다루기를 이어서 —</span>
        <button class="chip on" data-goto="2">2강 · 계산과 문자열 →</button>
      </div>
    `
    root.querySelector('[data-m="cycle"]').append(MemoryModel(SCENARIO_CYCLE))
    root.querySelector('[data-m="qzg4"]').append(Quiz({ q: 'A 객체가 B를, B 객체가 다시 A를 가리킨다. 이런 <b>순환</b>이 가능할까?', options: ['불가능 — 에러', '가능 — 서로 주소를 가리킬 뿐'], answer: 1, explain: '객체는 서로의 <b>주소</b>를 담을 뿐이라 <b>순환 참조</b>가 된다. (단, 무한 탐색·GC에서 조심 — 심화.)' }))
    wireCTA(root)
  }

  // 드릴은 난이도별 파일(ADR 0008): src/drills/{easy,normal,hard}.js 의 window.Drills.
})()
