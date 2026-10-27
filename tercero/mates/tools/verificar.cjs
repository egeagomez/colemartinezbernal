const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(const file of ['content.js','model.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'assets',file),'utf8'),ctx);
const {games}=ctx.window.MatesContent,M=ctx.window.MatesModel;
assert.equal(games.length,12);assert.equal(new Set(games.map(g=>g.id)).size,12);
let total=0;
for(const g of games)for(const q of g.questions){total++;assert(q.prompt);switch(q.type){
  case'column':assert.equal(q.answer,q.sign==='−'?q.nums[0]-q.nums[1]:q.nums.reduce((a,b)=>a+b,0));if(q.sign==='−')assert(q.nums[0]>q.nums[1]);break;
  case'pairs':assert.equal(q.pairs.length,4);for(const p of q.pairs)assert.equal(p.answer,p.sign==='+'?p.a+p.b:p.a-p.b);break;
  case'place':if(q.mode==='compose')assert.equal(q.answer,q.values[0]*100+q.values[1]*10+q.values[2]);else assert.equal(q.places,String(q.number).length);break;
  case'digit':assert.equal(q.answer,String(q.number).length-1-q.power);assert(q.answer>=0);break;
  case'problem':{
    const data=q.story.filter(v=>typeof v==='object'&&v.needed).map(v=>v.value);assert(data.length>=2);
    const initial=q.steps[0];for(const n of initial.operands)assert(data.includes(n));
    q.steps.forEach((step,i)=>{assert.equal(step.answer,step.op==='+'?step.operands.reduce((a,b)=>a+b,0):step.operands[0]-step.operands[1]);assert(M.operationMatches(M.expression(step),step));if(i)assert.equal(step.operands[0],q.steps[i-1].answer);});
    assert.equal(q.answer,q.steps.at(-1).answer);assert(q.unit);break;
  }
  case'choice':assert(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);break;
  case'perimeter':assert.equal(M.polygonPoints(q.shape).length,q.sides.length);assert.equal(q.answer,q.sides.reduce((a,b)=>a+b,0));if(q.shape==='triangle')assert(q.sides.every((v,i)=>v<q.sides.reduce((a,b)=>a+b,0)-v));break;
  case'area':if(q.mask){assert(q.mask.every(r=>r.length===q.mask[0].length));assert.equal(q.answer,q.mask.join('').replaceAll('0','').length);}else assert.equal(q.answer,q.rows*q.cols);break;
  case'clock':assert(q.hour>=1&&q.hour<=12);assert([0,15,30,45].includes(q.minute));break;
  case'round-hour':assert.notEqual(q.minute,30);assert.equal(q.answer,(q.hour+(q.minute>30?1:0)-1)%12+1);break;
  default:throw Error(q.type);
}}
const plus={op:'+',operands:[12,23,18],answer:53},minus={op:'−',operands:[72,28],answer:44};
assert(M.operationMatches('18 + 12 + 23 = 53',plus));assert(!M.operationMatches('12 + 23 + 18 = 43',plus));
assert(M.operationMatches('72 - 28',minus));assert(!M.operationMatches('28 - 72',minus));assert(!M.operationMatches('72 + 28',minus));assert(!M.operationMatches('44',minus));assert(!M.operationMatches('alert(1)',minus));
assert.equal(M.integer(''),null);assert.equal(M.integer('1e2'),null);assert.equal(M.integer('6.807'),6807);
for(const [a,b] of [[72,48],[90,27],[142,58],[502,178],[400,156],[705,369],[500,267],[1000,999]]){
  const steps=M.subtractionSteps(a,b),place={Unidades:1,Decenas:10,Centenas:100,Millares:1000};let result=0;
  for(const line of steps){assert(!/undefined|NaN/.test(line));const m=line.match(/^(Unidades|Decenas|Centenas|Millares): (\d+) − (\d+) = (\d+)\.$/);if(m){assert.equal(Number(m[2])-Number(m[3]),Number(m[4]));assert(Number(m[4])<10);result+=Number(m[4])*place[m[1]];}}
  assert.equal(result,a-b);
}
assert.equal(M.clockAngles(8,30).hour,255);assert.equal(M.clockAngles(5,45).hour,172.5);assert.equal(M.clockAngles(12,15).minute,90);assert.equal(M.clockWords(12,45),'la una menos cuarto');
const rombo=M.polygonPoints('rhombus'),lengths=rombo.map((p,i)=>Math.hypot(p[0]-rombo[(i+1)%4][0],p[1]-rombo[(i+1)%4][1]));assert(lengths.every(l=>Math.abs(l-lengths[0])<1e-9));
assert.equal(total,108);
console.log(`Correcto: ${games.length} juegos, ${total} retos y 16 uniones; operaciones, datos, figuras y unidades coherentes.`);
console.log('Correcto: restas con ceros y reagrupamiento, operaciones de problemas sin eval, y agujas horarias proporcionales a los minutos.');
