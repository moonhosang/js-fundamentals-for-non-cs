# 🧱 재사용 위젯 레퍼런스

모두 전역 팩토리다. `container.append(위젯(config))` 로 쓴다. 전역 `index.css`를 쓰려고 (shadow DOM 없는) 팩토리 함수로 만들었다 — 단 **단계 시뮬레이터류**(`<memory-model>` · `<event-loop-viz>` · `<promise-viz>` · `<desugar-viz>`)만 캡슐화 이점이 커서 커스텀 엘리먼트(shadow DOM, 테마 토큰은 CSS 변수 `var(--brand …)` 로 관통).

---

## 🧠 MemoryModel — 메모리 시뮬레이터 · 이름표 장부 │ 값 메모리 (핵심 자산)
`src/lib/memory-model.js` · `MemoryModel(config) → <memory-model>` (왜 별도 웹컴포넌트: [../decisions/0003-reusable-memory-model-web-component.md](../decisions/0003-reusable-memory-model-web-component.md))

값이 메모리에서 어떻게 사는지 **단계별로** 보여준다. 참조·별칭·전달·객체그래프·트리·순환·불변 등 십수 개 개념을 이 하나로 시각화했다.

### config
| 키 | 뜻 |
|---|---|
| `title` | 제목 |
| `code` | 코드 줄 배열(하이라이트용) |
| `steps` | 스냅샷 배열 (아래) |
| `showHeap:false` | 힙 열 숨김. **메모리 주제에선 쓰지 않는다** — 두 칸 항상 노출(ADR 0007). |
| `stackLabel`/`heapLabel` | 열 이름 override. **기본값 = `📇 이름표 장부 (변수)` / `🗄️ 값 메모리`** (ADR 0007). 콜스택 강조 강의는 `📚 스택 (이름표 장부)`. |
| (자동) 원시값 셀 | **model B**: `value:` 슬롯은 이름표엔 이름+화살표로, 값은 값 메모리에 **초록 🔒 셀**(`p:frame#name`)로 자동 렌더. 명시적 셀이 필요하면(예: 불변 재할당) 힙 박스에 `prim:true`. |

### step(스냅샷) 스키마
```js
{
  line: 2,                    // code 하이라이트 인덱스
  stack: [                    // 콜 스택 (아래→위)
    { name:'main', slots:[
      { name:'a', value:'3' },            // 원시값 슬롯
      { name:'a', value:'0', bad:true },  // 💥 죽은/잘못된 값(빨강)
      { name:'obj', ref:'h1' },           // 참조 슬롯 → 힙 화살표
    ]},
  ],
  heap: {                     // 힙 박스들 (id 키)
    h1: { label:'{ n: 1 }' },                                  // 간단 라벨
    h2: { fields:[ {key:'name',value:'"민지"'}, {key:'bestFriend',ref:'h1'} ] }, // 객체(힙→힙 화살표 가능)
    h3: { items:[ {ref:'h1'}, {value:'3'} ] },                 // 배열(참조 배열)
    h4: { person:'👩', name:'효니', fields:[…] },              // 사람 카드(아바타)
    h5: { label:'100', faded:true },                           // 회색(아무도 안 가리킴)
  },
  note: '개념 모델 설명(HTML 가능)',
  engine: '실제 엔진(V8) 심화 — [실제 엔진] 토글 시 보임',
}
```
- **애니메이션**: 직전 스텝과 diff → 새 슬롯/힙만 등장, 힙 값 변경은 플래시, 참조 화살표는 그려지는(draw-on) 효과.
- **2층 토글**: 기본 [개념 모델](notional machine) / [실제 엔진](V8 심화). (왜: [../decisions/0004-notional-machine-framing.md](../decisions/0004-notional-machine-framing.md)) 예: 문자열 복사 step에 `engine`으로 "실제론 interning 공유" 노출.
- `KEY_ICON` 맵 — person 필드 키에 아이콘(hair💇·money💰·parent👆 등).
- **두 칸 프레임은 늘 유지** — 모든 값이 값 메모리에 산다(model B). 원시값도 값 메모리에 **초록 🔒 셀**, 변수는 이름표에서 화살표로 가리킨다. [ADR 0007](../decisions/0007-all-values-in-value-memory-model-b.md).

---

## 🗺️ buildNameMap — 이름표 장부 → 값 메모리 '사상(별칭)' 그림
`src/lessons/memory-basics.js` (레슨 내부 헬퍼) · `buildNameMap(ledgerHead, ramHead, names, cells, N) → div`

이름(●)에서 값 메모리 칸으로 **SVG 화살표**를 그린다. `<memory-model>`이 스텝 시뮬이라면, 이건 **한 장짜리 사상 그림** — 특히 **여러 이름이 한 칸을 가리키면 = 별칭(alias)**을 한눈에.
- `names: [{ name, c, to(=cell id), tag? }]` · `cells: [{ id, val, adr, at, c }]` · `N` = 격자 칸 수.
- 쓰임: `let a = box` 별칭, 문자열 복사 **개념(칸 둘) vs 실제 엔진(칸 하나·공유)** 대비.
- 왜 memory-model이 아니라 별도 헬퍼: 스텝 애니가 아니라 **정적 사상 + 화살표 수렴**이 요점이라. (ADR 0007의 "이름 → 값 셀" 사상을 그리는 도구.)

---

## 🃏 StackViz — 스택 LIFO 놀이터
`src/lib/stackviz.js` · `StackViz({ labels?, initial? }) → div`
접시가 층층이 쌓이고(push) 맨 위부터 나가는(pop) 걸 손으로. 입체 그림자·맨위 하이라이트·애니. (재사용 — 큐 등 확장 여지.)

## 🔬 Runner — 라이브 JS 실행기
`src/lib/runner.js` · `Runner({ code, showBox?, editable?, autorun?, rows? }) → div`
결과를 두 가지로: `print(...)`(값·콘솔) + `box`(화면 DOM). 시각(눈)으로 확인하는 값·화면 균형. 그 자리서 고쳐 ▶실행.

## 🔽 ExprReduce — 표현식 축약(reduction) 애니
`src/lib/exprreduce.js` · `ExprReduce({ title, steps:[{code, mark, note}], onStep? }) → div`
표현식이 **한 번에 한 redex씩** 값으로 줄어드는 걸 단계별로. `mark` = 이번에 계산되는 부분 하이라이트. 3강 표현식(식 vs 문·우선순위·중첩)에서 씀. (`onStep(i, step)`로 외부 훅 — 예: 우선순위 눈금 tier 점등.)

## 🔮 Quiz — 예측 미니 퀴즈 (의문-사슬의 방아쇠)
`src/lib/quiz.js` · `Quiz({ q, options:[…], answer:idx, explain }) → div`
객관식 **예측** 퀴즈. 클릭 → 즉시 정답 표시(✅/❌) + 해설. **개념 '직전'** 마찰 큰 이음새에 놓아 declarative 함정을 **experienced**로 바꾼다([design-principles §5](../pedagogy/design-principles.md) Inquiry-Driven Sequencing). Drill(빈칸 타이핑=숙달)과 역할이 다르다 — Quiz는 **마찰 방아쇠**(찍는 순간이 retrieval).

## 🎯 Drill — 빈칸 유형 드릴
`src/lib/drill.js` · `Drill({ pattern, problems, stepped?, hideHead?, onSolved? }) → div`
`____` 빈칸을 채워 실행 → `print` 출력을 정답과 비교(✅/❌). 동일 유형 반복용.
- ⚠️ 채점이 **출력 문자열 일치**라 배열·객체로 가면 취약 → 그땐 예측형/반환값 비교로 갈아탈 것(백로그).

---

## 🔁 EventLoopViz — 이벤트 루프 큐 드레인 애니 (비동기 심화 핵심 자산)
`src/lib/event-loop-viz.js` · `EventLoopViz(config) → <event-loop-viz>` (shadow DOM)

**📜코드 · 📚콜스택 · 🌐Web API · 🟣마이크로 큐 · 🟠매크로 큐 · 🖼️렌더 · 🖨️출력** 구역. 콜백이 (Web API→)큐→콜스택→출력으로 **이동하는 걸 단계 애니**로. MemoryModel이 '값이 어디 사나'라면 이건 '콜백이 언제 도나'(시간 축). 씀: `eventloop`(위임: setTimeout→Web API→큐) · `microtask`(1·4·3·2 드레인 + 🖼️렌더 사이클) · `asyncerr`(try/catch가 콜백 전에 pop).
- `code:[...]` · `steps:[{ line, phase, stack, webapi, micro, macro, render, out, note }]`.
- `phase`: `'sync'|'delegate'|'drain-micro'|'drain-macro'|'render'|'idle'` — 국면 배지 + 활성 구역 하이라이트.
- **선택 존 = progressive disclosure**(핵심 설계): 🌐 Web API(`webapi:[...]`)·🖼️ 렌더(`render:` truthy=그리는 중, 라벨 문자열 가능)는 **그 필드를 쓰는 스텝이 하나라도 있을 때만 자동 노출**. microtask 순서 드릴처럼 위임·렌더가 불필요하면 존이 숨어 깔끔 → **N개 맞춤 위젯이 아니라 옵션 존으로 조립되는 단일 정규 기구**(SSOT). 새 국면 요구 시 존을 더 붙인다(레슨 아니라 엔진이 자람).
- ⚠️ 렌더는 매 사이클 보장 아닌 **~60fps '기회'**로 표기(과단순화 방지). 긴 동기·🟣폭주가 그 기회를 굶기는 걸로 블로킹·starvation을 한 원리로 회수.
- **`showLoop:true`**: 🔄 **이벤트 루프 인디케이터**(큐↔스택 사이 순환의 주인공을 가시화). phase에 따라 흐림(대기)↔활성(회전) — 스택 비고 큐에 항목 있으면 "꺼내 올릴 차례", drain/run이면 "올렸다". ⚠️ **"옮기는 규칙 · 일꾼 아님"** 명시로 *두 번째 워커=멀티스레드* 오해 차단(캐릭터 의인화 금지, 그게 핵심 설계 판단). 예시: `eventloop` ④.
- **`singleQueue:true`**(+`queueLabel?`): 마이크로/매크로를 아직 안 가르치는 **intro(`async` ②)**용 — 🟣존 숨기고 🟠존을 중립 "⏳ 대기 큐"로 relabel. 큐를 '하나'로 본 뒤 `microtask` 강에서 둘로 쪼개는 seam. (이걸로 async 트랙 전체가 EventLoopViz 단일 엔진으로 통일 — MemoryModel-relabel 하치 제거.)
- **✈️ FLIP 비행**: 큐→콜스택 이동을 실제로 날려 보냄(재렌더 전 큐 앞칩 좌표 포착 → `from-*` 프레임 위치로 `.flyer` 클론 transition 0.62s, 착지 전 프레임 `arriving`으로 숨김). reduced-motion이면 생략.
- `stack` 항목: `'main'`(문자열) 또는 `{label, from:'micro'|'macro'}` — `from`이면 그 큐 색으로 **날아드는(fly-in) 애니**. `micro`/`macro`: 콜백 라벨 배열(앞=다음 차례, `다음 ▶` 표시). `out`: 누적 출력(마지막 칩만 pop).
- ▶ 다음 단계 / **▶▶ 자동재생**(1.15s 간격) / ◀ 이전 / ↺.

## ⏱ PromiseViz — Promise 조합기 타임라인 (all/race/allSettled/any)
`src/lib/promise-viz.js` · `PromiseViz({ title, mode, tasks }) → <promise-viz>` (shadow DOM)

여러 Promise가 가로 막대로 **동시에** 차오르고, **모드**에 따라 게이트(묶음 결과)가 **언제 확정되나**(결정선)를 ▶재생으로. **모드 토글**(all·allSettled·race·any)로 *같은 작업*을 갈아 끼워 대비. 씀: `promiseall`.
- `mode`: `'all'|'allSettled'|'race'|'any'`. `tasks:[{ name, ms(끝나는 시각), ok:bool, value|reason }]`.
- 막대 채우기 = CSS width transition(`ms`), 완료 마커·게이트 확정 = `setTimeout(ms)`. (헤드리스 virtual-time에선 트랜지션 중간이 안 잡힘 — 실브라우저에서 부드럽게 채워짐.)

## 🔻 DesugarViz — async/await → Promise.then '풀기' 애니
`src/lib/desugar-viz.js` · `DesugarViz({ title, asyncCode, steps }) → <desugar-viz>` (shadow DOM)

좌(✍️ async/await) ↔ 우(🔻 .then 사다리)를 나란히 두고, `await` 하나가 **'함수를 자르는 가위'**가 되어 아래 전부를 `.then` 콜백으로 미는 걸 **한 겹씩** 드러낸다. payoff: await 뒷부분 = .then 콜백 = 🟣마이크로. 씀: `microtask`.
- `asyncCode:[...]`(좌·고정) · `steps:[{ aline(좌 하이라이트|null), then:[...누적 우측 줄...], hot:[방금 강조할 우측 인덱스…], note }]`.

---

## 관례
- 위젯 config·시나리오 데이터는 **레슨 파일 안**에 둔다(위젯은 순수 렌더러).
- 새 시각 개념이 반복되면 위젯에 **선언적 옵션**으로 흡수한다(예: person·items·faded·stackLabel은 요구가 생길 때마다 추가된 것). 레슨이 아니라 엔진이 자란다.
