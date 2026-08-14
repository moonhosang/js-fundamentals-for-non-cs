# 🧩 새 강의 작성 템플릿

[design-principles.md](design-principles.md)를 코드로 옮기는 실무 절차. **misconception-first**로 시작한다.

## 0. 시작 전 3줄 (misconception-first)
강의 파일 상단 주석에 먼저 적는다. 못 적으면 아직 가르칠 준비가 안 된 것:
```js
// 오해: (초보자가 여기서 뭘 착각하나 · 인식 밖이라 놓치는 건 뭔가)
// 왜:   (왜 그런가 — 여러 이유)
// 대비: (헷갈리는 이웃과 같은/다른 점)
```

## 1. 표준 흐름 (한 강의)
```
헤더(badge · 제목 · 한 줄)
🎯 학습 포인트 (goal)
⚠️ 오해 정면 돌파      ← 있으면 눈에 띄게 (예: "변수는 밥통이 아니다")
① 규칙/개념 설명
② 눈으로 — 라이브 시각화  ← <memory-model> / Runner / StackViz
③ 왜? — 여러 이유
④ 경계·대비 (같은/다른)
📖 한 줄 요약 (concept)
🎯 실습 CTA → 유형 드릴
```

## 2. 코드 골격 (바닐라, `src/lessons/<name>.js`)
```js
;(function () {
  window.Lessons = window.Lessons || {}
  window.Practices = window.Practices || {}   // 드릴 있으면

  // (개념 강의) — 산문은 HTML 문자열, 위젯은 data-m 마운트로 주입
  window.Lessons['myid'] = function render(root) {
    root.innerHTML = `
      <header class="lesson-header"><span class="badge">…</span><h2>…</h2><p>…</p></header>
      <div class="lesson-goal"><span class="lesson-goal-tag">🎯 학습 포인트</span><p>…</p></div>
      <h3 class="section-title">② 눈으로</h3>
      <div data-m="viz"></div>
      …
      <div class="practice-cta"><span>…</span><button class="chip on" data-goto="next">다음 →</button></div>
    `
    root.querySelector('[data-m="viz"]').append(MemoryModel({ /* … */ }))
    const cta = root.querySelector('[data-goto]')
    if (cta) cta.onclick = () => { const t = cta.getAttribute('data-goto'); window.goLesson ? window.goLesson(/^\d+$/.test(t) ? Number(t) : t) : (location.hash = '#' + t) }
  }
})()
```

## 3. 등록 (3곳)
1. `index.html` — `<script src="src/lessons/<name>.js"></script>` 추가 (app.js보다 **먼저**).
2. `src/app.js` — `LESSONS` 배열에 `{ id:'myid', badge, title, subtitle }` 추가.
3. `src/app.js` — `CHAPTERS`의 알맞은 챕터 `items`에 `'myid'` 넣기. (심화면 그 챕터에.)

드릴이면: `window.Practices['myid'] = { pattern, problems:[{label,ask,code('…____…'),expect,answer,hint}] }` — app.js가 문제별 항목(`myid-1`…)으로 자동 전개.

## 4. 시각 자산 (재사용)
안 보이는 것을 보이게 — [../architecture/components.md](../architecture/components.md) 참고:
- **MemoryModel** — 이름표 장부 │ 값 메모리(모든 값이 셀, 변수는 화살표 · 참조/별칭/사람카드/배열). 대부분 여기로 해결. (표기 규칙: [ADR 0007](../decisions/0007-all-values-in-value-memory-model-b.md))
- **StackViz** — 스택 LIFO 접시더미.
- **ExprReduce** — 표현식 축약(reduction) 단계 애니.
- **Runner** — 라이브 JS 실행(값 print + 화면 box).
- **Quiz** — 🔮 예측 미니 퀴즈(객관식→즉시 ✅/❌+해설). 마찰 큰 이음새에 '개념 직전'.
- **Drill** — 빈칸 유형 드릴(끝에서 누적 숙달).

## 5. 검증 (완성 판정)
- [ ] `node --check src/lessons/<name>.js` (문법)
- [ ] 예제 코드가 실제로 도는가 — `node -e '…'` (미선언 변수·의사코드 금지)
- [ ] jsdom 스모크 — 렌더/스텝/드릴 채점
- [ ] **실브라우저 스크린샷** — 레이아웃·화살표·이모지 눈으로 (Chrome 헤드리스, [overview.md](../architecture/overview.md#시각-검증) 참고)
- [ ] 📚 **관련 용어(위키) 링크** 있나 — 각 강의·단계에. URL은 실제 200인지 확인(오답 링크 금지)
- [ ] 🔮 **의문-사슬(§5)** — 마찰 큰 이음새에 예측 퀴즈로 declarative 함정을 experienced로 바꿨나 ([design-principles §5](design-principles.md))
- [ ] 7 체크리스트를 렌즈로 재검토
