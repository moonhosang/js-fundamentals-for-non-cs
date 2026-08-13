# 🧭 결정 기록 (ADR — Architecture/Design Decision Records)

방향을 바꾸는 판단은 여기 남긴다. **코드는 "무엇"을, ADR은 "왜"를 기억한다.**
6개월·6년 뒤 "왜 이렇게 했지?"에 답하고, 되돌리기 전에 근거를 알게 한다.

## 규칙
- **불변(immutable).** 한번 쓴 ADR은 지우거나 고치지 않는다. 결정을 뒤집으면 **새 ADR**을 쓰고, 옛 것에 `Superseded by 000X` 표시만 단다. 역사가 곧 근거다.
- 번호는 4자리 순번. 파일명 `000N-슬러그.md`.
- 짧게. 형식: **맥락 → 결정 → 결과(트레이드오프)**.

## 목록
| # | 결정 | 상태 |
|---|---|---|
| [0001](0001-vanilla-over-react.md) | React/Vite 말고 **바닐라 JS(빌드 없음)** | Accepted |
| [0002](0002-variable-is-alias-not-container.md) | 변수는 **밥통이 아니라 이름표(alias)** | Accepted |
| [0003](0003-reusable-memory-model-web-component.md) | 메모리 모델을 **재사용 웹 컴포넌트**로 | Accepted |
| [0004](0004-notional-machine-framing.md) | 스택/힙은 **개념 모델(notional machine)** + 실제엔진 토글 | Accepted |
| [0005](0005-optional-deep-theory-with-skip.md) | 이론 심화는 **선택 + 건너뛰기** | Accepted |

## 새 ADR 템플릿
```
# 000N. 제목
Status: Proposed | Accepted | Superseded by 000X
## 맥락  (무슨 문제·상황이었나)
## 결정  (무엇을 하기로 했나)
## 결과  (얻는 것 / 잃는 것 / 대안)
```
