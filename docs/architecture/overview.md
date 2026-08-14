# 🏗️ 아키텍처 개요

## 철학 한 줄
**빌드 없는 바닐라 JS.** 배우는 언어(순수 JS)와 앱이 만들어진 언어가 일치한다. (왜: [../decisions/0001-vanilla-over-react.md](../decisions/0001-vanilla-over-react.md))

## 실행
- **`index.html` 더블클릭** → 끝. (ES 모듈을 안 써서 `file://`에서 바로 돈다.)
- 인터넷 없으면 폰트만 시스템 폰트로 폴백.

## 파일 구조
```
index.html          # 클래식 <script>로 순서 로드 (빌드 없음)
src/
├─ index.css        # 전체 스타일(디자인 시스템 + 위젯)
├─ app.js           # 껍데기: 커리큘럼·사이드바·해시 라우팅·진도·건너뛰기 배너
├─ lib/             # 재사용 위젯 (→ components.md)
│  ├─ runner.js         # Runner — 라이브 JS 실행기 (print + box)
│  ├─ drill.js          # Drill — 빈칸 유형 드릴
│  ├─ memory-model.js   # <memory-model> — 메모리 시뮬레이터 (이름표 장부 │ 값 메모리, 핵심 자산)
│  ├─ stackviz.js       # StackViz — 스택 LIFO 접시더미
│  └─ exprreduce.js     # ExprReduce — 표현식 축약(reduction) 애니
└─ lessons/         # 강의 (순수 .js — 배우는 언어와 일치)
   ├─ variables.js         # 1강 값·타입·변수
   ├─ calc-strings.js      # 2강 계산과 문자열
   ├─ expressions.js       # 3강 표현식 (3-1…3-6 단계)
   ├─ conditions.js        # 4강 조건
   ├─ functions.js         # 5강 함수
   ├─ arrays.js            # 6강 배열
   ├─ loops.js             # 7강 반복과 map (for·forEach·map·filter·reduce)
   ├─ objects.js           # 8강 객체 ({ key: value }·점/대괄호·중첩·메서드)
   ├─ classes.js           # 클래스 (선택 심화 · 프로토타입 문법설탕)
   ├─ dom.js               # 9강 화면 조작 (querySelector·textContent·이벤트)
   ├─ capstone.js          # 10강 실전 캡스톤 (디지털 명함 카드 생성기)
   ├─ memory-basics.js     # 메모리 기초(M1~M7) + 객체 그래프 챕터(G1~G4)
   └─ memory-advanced.js   # 메모리 심화 (콜스택·클로저·GC)
   (드릴은 개념 파일이 아니라 난이도별 파일에: src/drills/{easy,normal,hard}.js — window.Drills, ADR 0008)
```

## 로드 순서 (index.html)
클래식 스크립트라 **순서가 중요**하다: 위젯(lib) → 레슨(lessons) → `app.js`.
레슨은 `window.Lessons[id]`·`window.Practices[base]`에 자기를 등록하고, `app.js`가 그걸 읽어 화면에 건다.

## app.js 가 하는 일
- **LESSONS** — 강의 메타(id·badge·title·subtitle·plan). 완성 강의는 `window.Lessons[id]`에 render 있음, 없으면 ComingSoon.
- **CHAPTERS** — 사이드바 목차. `{ n | tag, title, items, optional?, skipTo? }`. 실습 문제는 `id-1`…로 자동 전개(practiceItemsFor).
- **라우팅** — URL 해시(`#id`) ↔ 현재 강의. 뒤로/앞으로·새로고침·링크 공유 지원.
- **진도** — 진도(📖 개념)·연습(✏️ 실습) 2종, localStorage 저장. 드릴 정답 시 자동 체크.
- **건너뛰기 배너** — `optional:true` 챕터엔 상단에 "N강으로 건너뛰기". (레슨이 host를 덮으므로 배너는 **별도 host div**로 분리 — 안 그러면 지워진다.)

## 레슨 렌더 규약 (중요)
레슨 render(root)는 `root.innerHTML = …`로 **root를 통째로 덮는다.** 그래서:
- app.js는 레슨을 **전용 host div**에 렌더하고, 배너 등은 그 바깥(page)에 둔다.
- 산문은 HTML 문자열, 인터랙티브 위젯은 `<div data-m="x"></div>` 마운트에 `append`로 주입(문자열에 `<` 이스케이프 문제를 피함).

## <a name="시각-검증"></a>시각 검증 (개발 시)
로직은 jsdom, **레이아웃·SVG·이모지는 실브라우저**로 확인한다:
```bash
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
# 한글 폴더는 URL 인코딩: JS입문 → JS%EC%9E%85%EB%AC%B8
"$CHROME" --headless=new --disable-gpu --window-size=1300,1100 \
  --screenshot=out.png "file:///…/JS%EC%9E%85%EB%AC%B8/index.html#<id>"
```
(클래식 스크립트라 `file://`로 바로 뜬다. `<memory-model>` 화살표는 getBoundingClientRect 기반이라 실브라우저에서만 그려진다.)
