// 드릴 enrich 제너레이터: 현재 문제를 로드 → explain(전 390)·mem(참조류)·링크(핵심) 병합 → 3파일 재생성
const fs = require('fs')
const SRC = 'E:/back_from_prev_pc_20260707/Documents/sy/JS입문/src/drills/'
function makeEl(){return{style:{},append(){},querySelector(){return makeEl()},addEventListener(){},children:[]}}
global.window={Lessons:{},Practices:{},Drills:{easy:{},normal:{},hard:{}}};global.document={createElement:makeEl}
;['easy','normal','hard'].forEach(f=>require(SRC+f+'.js'))
const D=window.Drills

// ── mem 빌더 (이름표 장부 │ 값 메모리 2컬럼) ─────────────────────────────
const L='📇 이름표 장부'
// 원시값 복사 독립: kept·changed 각자 셀. changed만 바뀜.
function copyMem(kept,changed,v0,v1){return{title:`${changed}만 바뀌고 ${kept}는 그대로 — 원시값은 각자 셀로 복사`,stackLabel:L,code:[`let ${kept} = ${v0}`,`let ${changed} = ${kept}`,`${changed} = ${v1}`],steps:[
 {line:1,stack:[{name:'main',slots:[{name:kept,value:String(v0)},{name:changed,value:String(v0)}]}],heap:{},note:`복사 → ${kept}·${changed}가 <b>각자 셀</b>(값 ${v0}).`},
 {line:2,stack:[{name:'main',slots:[{name:kept,value:String(v0)},{name:changed,value:String(v1),bad:true}]}],heap:{},note:`<code>${changed}=${v1}</code>는 <b>${changed}의 셀만</b> 바꾼다. <b>${kept}는 ${v0} 그대로</b>.`}]}}
// 객체 별칭: a·b가 같은 힙 객체. 한쪽으로 고치면 둘 다.
function aliasMem(a,b,prop,v0,v1,q){const V0=q?`"${v0}"`:String(v0),V1=q?`"${v1}"`:String(v1);return{title:`${a}·${b}는 같은 힙 객체 — 한쪽을 고치면 함께 바뀐다`,stackLabel:L,code:[`let ${a} = { ${prop}: ${V0} }`,`let ${b} = ${a}`,`${b}.${prop} = ${V1}`],steps:[
 {line:1,stack:[{name:'main',slots:[{name:a,ref:'h1'},{name:b,ref:'h1'}]}],heap:{h1:{fields:[{key:prop,value:V0}]}},note:`<code>let ${b}=${a}</code> → 주소 복사 → <b>같은 h1</b>(별칭).`},
 {line:2,stack:[{name:'main',slots:[{name:a,ref:'h1'},{name:b,ref:'h1'}]}],heap:{h1:{fields:[{key:prop,value:V1,bad:true}]}},note:`<code>${b}.${prop}=${V1}</code> → h1을 고침 → <b>${a}.${prop}도 ${V1}</b>.`}]}}
// 객체 전달: 밖 outer·함수 프레임 param이 같은 힙 객체.
function passMem(outer,param,fn,prop,v0,v1,q){const V0=q?`"${v0}"`:String(v0),V1=q?`"${v1}"`:String(v1);return{title:`${param}(함수 안)과 ${outer}(밖)는 같은 힙 객체 — 속성 변경이 원본에 샌다`,stackLabel:L,code:[`let ${outer} = { ${prop}: ${V0} }`,`${fn}(${outer})   // ${param} = ${outer}`,`${param}.${prop} = ${V1}`],steps:[
 {line:1,stack:[{name:'main',slots:[{name:outer,ref:'h1'}]},{name:fn,slots:[{name:param,ref:'h1'}]}],heap:{h1:{fields:[{key:prop,value:V0}]}},note:`호출 → 주소 복사 → <code>${param}</code>도 <b>같은 h1</b>.`},
 {line:2,stack:[{name:'main',slots:[{name:outer,ref:'h1'}]},{name:fn,slots:[{name:param,ref:'h1'}]}],heap:{h1:{fields:[{key:prop,value:V1,bad:true}]}},note:`<code>${param}.${prop}=${V1}</code> → h1을 고침 → <b>${outer}.${prop}도 ${V1}</b>.`}]}}
// 값 전달: 함수 param은 복사본. 원본 안전.
function passValMem(outer,param,fn,v0,v1){return{title:`${param}(함수 안)은 복사본 — ${outer}(원본)는 안전`,stackLabel:L,code:[`let ${outer} = ${v0}`,`${fn}(${outer})   // ${param} = 복사 ${v0}`,`${param} = ${v1}`],steps:[
 {line:1,stack:[{name:'main',slots:[{name:outer,value:String(v0)}]},{name:fn,slots:[{name:param,value:String(v0)}]}],heap:{},note:`원시값을 넘기면 <b>값을 복사</b> → ${param}은 별개 셀(${v0}).`},
 {line:2,stack:[{name:'main',slots:[{name:outer,value:String(v0)}]},{name:fn,slots:[{name:param,value:String(v1),bad:true}]}],heap:{},note:`<code>${param}=${v1}</code>는 복사본만 바꾼다. <b>${outer}는 ${v0} 그대로</b>.`}]}}
// GC: a 끊어도 b가 가리켜 생존.
function gcMem(a,b,prop,v){const V=String(v);return{title:`${a}를 끊어도 ${b}가 가리켜 객체는 산다`,stackLabel:L,code:[`let ${a} = { ${prop}: ${V} }`,`let ${b} = ${a}`,`${a} = null`],steps:[
 {line:1,stack:[{name:'main',slots:[{name:a,ref:'h1'},{name:b,ref:'h1'}]}],heap:{h1:{fields:[{key:prop,value:V}]}},note:`${a}·${b} 둘 다 h1을 가리킨다(참조 2개).`},
 {line:2,stack:[{name:'main',slots:[{name:a,value:'null',bad:true},{name:b,ref:'h1'}]}],heap:{h1:{fields:[{key:prop,value:V}]}},note:`<code>${a}=null</code> → ${a} 화살표 끊김. 하지만 <b>${b}가 h1을 가리켜 살아남는다</b>(GC 대상 아님).`}]}}

// 링크 프리셋
const W={
 ref2:{label:'참조 (컴퓨터 과학)',url:'https://ko.wikipedia.org/wiki/참조_(컴퓨터_과학)'},
 prim:{label:'원시 자료형',url:'https://ko.wikipedia.org/wiki/원시_자료형'},
 obj:{label:'객체 (컴퓨터 과학)',url:'https://ko.wikipedia.org/wiki/객체_(컴퓨터_과학)'},
 call:{label:'값에 의한 호출',url:'https://ko.wikipedia.org/wiki/값에_의한_호출'},
 gc:{label:'쓰레기 수집 (컴퓨터 과학)',url:'https://ko.wikipedia.org/wiki/쓰레기_수집_(컴퓨터_과학)'},
 func:{label:'함수 (컴퓨터 과학)',url:'https://ko.wikipedia.org/wiki/함수_(컴퓨터_과학)'},
 closure:{label:'클로저',url:'https://ko.wikipedia.org/wiki/클로저_(컴퓨터_프로그래밍)'},
 coerce:{label:'형 변환',url:'https://ko.wikipedia.org/wiki/형_변환'},
 type:{label:'자료형',url:'https://ko.wikipedia.org/wiki/자료형'},
 arr:{label:'배열',url:'https://ko.wikipedia.org/wiki/배열'},
 scope:{label:'변수의 유효 범위',url:'https://ko.wikipedia.org/wiki/변수의_유효_범위'},
}

// ── EXPLAIN: 전 390문제. base|tier -> [5개] (없으면 기존 explain 유지) ──
const EX = require('./explains.js')
// ── MEM/LINK 지정: 'base|tier' -> { idx: {mem, see, wiki} } ──
const ADD = require('./adds.js')(D,{copyMem,aliasMem,passMem,passValMem,gcMem,W})

// ── 병합 ──
let nExplain=0,nMem=0,nLink=0
for(const tier of ['easy','normal','hard']){
 for(const base of Object.keys(D[tier])){
  const key=base+'|'+tier, ex=EX[key], add=ADD[key]||{}
  D[tier][base].problems.forEach((p,i)=>{
   if(ex&&ex[i]&&!p.explain){p.explain=ex[i];nExplain++}
   const a=add[i]
   if(a){ if(a.mem&&!p.mem){p.mem=a.mem;nMem++} if(a.see&&!p.see){p.see=a.see} if(a.wiki&&!p.wiki){p.wiki=a.wiki;nLink++} }
  })
 }
}

// ── 재생성 ──
function serProblem(p){
 const order=['label','ask','code','expect','answer','hint','explain','see','wiki','mem']
 const o={}; for(const k of order) if(p[k]!==undefined) o[k]=p[k]
 return JSON.stringify(o)
}
function genFile(tier,cname){
 let s=`// ${tier==='easy'?'🟢 쉬움':tier==='normal'?'🟡 보통':'🔴 어려움'} 드릴 (ADR 0008) — 예측 패턴 · 정답 시 설명/메모리 증명. 자동 생성(scratchpad/gen.js).\n`
 s+=`;(function () {\n  window.Drills = window.Drills || { easy: {}, normal: {}, hard: {} }\n  const ${cname} = window.Drills.${tier}\n`
 for(const base of Object.keys(D[tier])){
  const cfg=D[tier][base]
  s+=`  ${cname}[${JSON.stringify(base)}] = {\n    pattern: ${JSON.stringify(cfg.pattern)},\n    problems: [\n`
  s+=cfg.problems.map(p=>'      '+serProblem(p)).join(',\n')+'\n    ],\n  }\n'
 }
 s+='})()\n'
 return s
}
fs.writeFileSync(SRC+'easy.js',genFile('easy','E'))
fs.writeFileSync(SRC+'normal.js',genFile('normal','N'))
fs.writeFileSync(SRC+'hard.js',genFile('hard','H'))
console.log('병합: explain +'+nExplain+' · mem +'+nMem+' · link +'+nLink)
let tot=0,ex=0,mem=0
for(const t of ['easy','normal','hard'])for(const b of Object.keys(D[t]))for(const p of D[t][b].problems){tot++;if(p.explain)ex++;if(p.mem)mem++}
console.log('최종: 총 '+tot+' · explain '+ex+' · mem '+mem)
