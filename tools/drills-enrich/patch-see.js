const fs=require('fs')
const SRC='E:/back_from_prev_pc_20260707/Documents/sy/JS입문/src/drills/'
function makeEl(){return{style:{},append(){},querySelector(){return makeEl()},addEventListener(){},children:[]}}
global.window={Drills:{easy:{},normal:{},hard:{}}};global.document={createElement:makeEl}
;['easy','normal','hard'].forEach(f=>require(SRC+f+'.js'))
const D=window.window?window.Drills:window.Drills
// 미소개 내장 기능(7강 map/filter/reduce/forEach, 6강 push/pop/length 제외)
const ORPHAN=/\btypeof\b|\binstanceof\b|\bNaN\b|\bNumber\(|Math\.max|\*\*|[^*]%[^=]|\.toUpperCase\(|\.split\(|\.includes\(|\.indexOf\(|\.join\(|\.concat\(|\.sort\(|\.find\(|\.some\(|\.every\(|Object\.keys|\bdelete\b|\bBoolean\(/
let n=0
for(const t of ['easy','normal','hard'])for(const b of Object.keys(D[t]))for(const p of D[t][b].problems){
  if(!p.see && ORPHAN.test(p.code)){p.see='builtins';n++}
}
function serProblem(p){const order=['label','ask','code','expect','answer','hint','explain','see','wiki','mem'];const o={};for(const k of order)if(p[k]!==undefined)o[k]=p[k];return JSON.stringify(o)}
function genFile(tier,c){let s=`// ${tier==='easy'?'🟢 쉬움':tier==='normal'?'🟡 보통':'🔴 어려움'} 드릴 (ADR 0008) — 예측 패턴 · 정답 시 설명/메모리 증명. 자동 생성.\n;(function () {\n  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }\n  const ${c} = window.Drills.${tier}\n`;for(const b of Object.keys(D[tier])){const cfg=D[tier][b];s+=`  ${c}[${JSON.stringify(b)}] = {\n    pattern: ${JSON.stringify(cfg.pattern)},\n    problems: [\n`+cfg.problems.map(p=>'      '+serProblem(p)).join(',\n')+'\n    ],\n  }\n'}return s+'})()\n'}
fs.writeFileSync(SRC+'easy.js',genFile('easy','E'));fs.writeFileSync(SRC+'normal.js',genFile('normal','N'));fs.writeFileSync(SRC+'hard.js',genFile('hard','H'))
console.log('see:builtins 추가:',n)
