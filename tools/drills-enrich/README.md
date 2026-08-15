# 드릴 enrich 제너레이터 (일회성 마이그레이션)

`explain`(전 390문제 '왜 그런가') · `mem`(참조/복사/전달/GC류 메모리 증명) · `see`/`wiki` 링크를
드릴에 병합해 `src/drills/{easy,normal,hard}.js`를 재생성한 도구.

- `gen.js` — 현재 드릴 로드 → mem 빌더 + 병합 → 3파일 재생성 (SRC 절대경로는 실행 환경에 맞게 수정)
- `explains.js` — `EX['base|tier'] = [5개 explain]`
- `adds.js` — `ADD['base|tier'] = { idx: {mem, see, wiki} }`, mem 빌더로 구성

재생성된 드릴 파일이 이제 **단일 출처**(문제+explain+mem+링크 포함). 이후 편집은 드릴 파일에서 직접.
