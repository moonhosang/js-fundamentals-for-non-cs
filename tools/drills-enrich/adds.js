// ADD['base|tier'] = { idx: { mem?, see?, wiki? } } — mem 빌더 + 링크
module.exports = function (D, B) {
  const { copyMem, aliasMem, passMem, passValMem, gcMem, W } = B
  return {
    // ── 원시 복사 (ref) ──
    'ref|easy': {
      0: { mem: copyMem('x', 'y', 10, 99), see: 'ref2', wiki: W.prim },
      1: { mem: copyMem('b', 'a', 5, 100) },
      2: { mem: copyMem('money1', 'money2', 200, 0) },
      3: { mem: copyMem('s1', 's2', '"무지"', '"어피치"') },
    },
    'ref|normal': {
      0: { mem: copyMem('x', 'y', 3, 6) },
    },
    'ref|hard': {
      0: { see: 'ref2', wiki: W.ref2 },
    },
    // ── 객체 별칭 (ref2 / heap) ──
    'ref2|easy': { 0: { see: 'ref2', wiki: W.ref2 } },
    'heap|normal': {
      3: { mem: aliasMem('a', 'b', 'v', 1, 9) },
    },
    'ram|normal': {
      1: { mem: copyMem('b', 'a', 7, 0) },
    },
    // ── 값 전달 (passval) ──
    'passval|easy': {
      0: { mem: passValMem('money', 'bill', 'f', 100, 0), see: 'passobj', wiki: W.call },
      2: { mem: passValMem('a', 'x', 'add1', 10, 15) },
    },
    // ── 참조 전달 (passobj) ──
    'passobj|easy': {
      1: { mem: passMem('user', 'u', 'rename', 'name', '민지', '지훈', true) },
      2: { mem: passMem('hero', 'p', 'grow', 'hp', 100, 999) },
      4: { mem: passMem('data', 'o', 'zero', 'count', 99, 0) },
    },
    // ── 그래프 공유 (graph) ── (0은 이미 mem)
    'graph|hard': { 0: { see: 'ref2', wiki: W.obj } },
    // ── GC ──
    'gc|easy': {
      1: { mem: gcMem('data', 'ref', 'v', 1), see: 'ref2', wiki: W.gc },
      4: { mem: gcMem('a', 'b', 'n', 1) },
    },
    'gc|normal': {
      0: { mem: gcMem('a', 'b', 'n', 1) },
    },
    // ── 링크: 챕터 대표 문항 ──
    '1|hard': { 0: { wiki: W.type } },
    '2|hard': { 0: { wiki: W.coerce } },
    '4|hard': { 0: { wiki: W.coerce } },
    '5|hard': { 0: { wiki: W.scope, see: 'stack' } },
    '6|hard': { 1: { see: 'ref2', wiki: W.arr } },
    '7|hard': { 4: { wiki: W.arr } },
    '8|hard': { 0: { wiki: W.obj } },
    'stack|hard': { 4: { wiki: W.scope } },
    'callstack|easy': { 0: { wiki: W.func } },
    'closure|hard': { 2: { see: 'stack', wiki: W.closure } },
    'class|hard': { 4: { wiki: W.obj } },
  }
}
