# 🧱 재사용 위젯 레퍼런스

모두 전역 팩토리다. `container.append(위젯(config))` 로 쓴다. 전역 `index.css`를 쓰려고 (shadow DOM 없는) 팩토리 함수로 만들었다 — 단 `<memory-model>`만 캡슐화 이점이 커서 커스텀 엘리먼트(shadow DOM, 테마 토큰은 CSS 변수로 관통).

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

## 🎯 Drill — 빈칸 유형 드릴
`src/lib/drill.js` · `Drill({ pattern, problems, stepped?, hideHead?, onSolved? }) → div`
`____` 빈칸을 채워 실행 → `print` 출력을 정답과 비교(✅/❌). 동일 유형 반복용.
- ⚠️ 채점이 **출력 문자열 일치**라 배열·객체로 가면 취약 → 그땐 예측형/반환값 비교로 갈아탈 것(백로그).

---

## 관례
- 위젯 config·시나리오 데이터는 **레슨 파일 안**에 둔다(위젯은 순수 렌더러).
- 새 시각 개념이 반복되면 위젯에 **선언적 옵션**으로 흡수한다(예: person·items·faded·stackLabel은 요구가 생길 때마다 추가된 것). 레슨이 아니라 엔진이 자란다.
