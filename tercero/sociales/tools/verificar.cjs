const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx={window:{}};
for(const f of ['content.js','scenes.js','model.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'assets',f),'utf8'),ctx);
const {games,sections}=ctx.window.SocialesContent,S=ctx.window.SocialesScenes,M=ctx.window.SocialesModel;
assert.equal(games.length,18);assert.equal(new Set(games.map(g=>g.id)).size,18);
const questions=games.flatMap(g=>g.questions);assert.equal(questions.length,160);assert.equal(new Set(questions.map(q=>q.id)).size,160);
for(const g of games){assert(sections.includes(g.section));assert(g.pages.every(p=>Number.isInteger(p)&&p>=6&&p<=21));for(const q of g.questions){
  assert(q.prompt&&q.explanation);assert(q.pages.length>0);
  const correct=M.grade(q,M.expected(q));assert(correct.ready&&correct.ok,q.id);
  assert(!M.grade(q,null).ready||!M.grade(q,null).ok,q.id);
  if(q.options){assert.equal(new Set(q.options).size,q.options.length);if(q.type==='multi'){assert(q.answer.every(a=>q.options.includes(a)));assert(M.grade(q,[...q.answer].reverse()).ok);assert(!M.grade(q,[...q.answer,q.answer[0]]).ok);assert(!M.grade(q,[q.options.find(v=>!q.answer.includes(v))]).ok);}else{assert(q.options.includes(q.answer));assert(!M.grade(q,q.options.find(v=>v!==q.answer)).ok);}}
  if(q.type==='hotspot'){const scene=S.scenes[q.scene];assert(scene);assert(scene.targets.some(t=>t.key===q.answer));assert(!M.grade(q,'zona-inexistente').ok);}
  if(q.scene)assert(q.scene==='legend'||S.scenes[q.scene]);
  if(q.type==='sort'){assert.equal(q.items.length,4);assert(q.items.every(i=>q.groups.includes(i.group)));const wrong=M.expected(q);wrong[0]=q.groups.find(g=>g!==q.items[0].group);assert(!M.grade(q,wrong).ok);assert(!M.grade(q,{}).ready);}
  if(q.type==='pairs'){assert.equal(q.pairs.length,4);assert.equal(new Set(q.pairs.map(p=>p.right)).size,4);const wrong=M.expected(q);[wrong[0],wrong[1]]=[wrong[1],wrong[0]];assert(!M.grade(q,wrong).ok);assert(!M.grade(q,[q.pairs[0].right]).ready);}
}}
for(const scene of Object.values(S.scenes)){assert(scene.svg.startsWith('<svg'));assert(scene.svg.endsWith('</svg>'));assert(!/undefined|NaN|<script|foreignObject|<image/.test(scene.svg));assert.equal(new Set(scene.targets.map(t=>t.label)).size,scene.targets.length);for(const t of scene.targets){assert(t.name&&t.key);assert(t.x>=7&&t.x<=93);assert(t.y>=8&&t.y<=92);}}
assert.equal(S.scenes['world-land'].targets.length,6);
assert.equal(new Set(S.scenes['world-water'].targets.map(t=>t.key)).size,5);
assert.equal(S.scenes['world-water'].targets.filter(t=>t.key==='pacifico').length,2);
assert.equal(S.scenes.coast.targets.length,8);assert.equal(S.scenes.spain.targets.length,8);
assert.equal(new Set(games.at(-1).questions.map(q=>games.find(g=>g.id===q.originGame)?.section)).size,sections.length);
// El repaso incluye mapas, clasificación y selección múltiple, además de preguntas.
for(const type of ['hotspot','sort','choice','fill','multi'])assert(games.at(-1).questions.some(q=>q.type===type));
assert.equal(S.studioElements.length,6);assert.equal(new Set(S.studioElements.map(e=>e.key)).size,6);
for(const kind of ['montana','llanura','costa'])for(const selected of [[],['arboles','rio'],S.studioElements.map(e=>e.key)]){const svg=S.studioSvg(kind,selected);assert(svg.startsWith('<svg')&&svg.endsWith('</svg>'));assert(!/undefined|NaN/.test(svg));}
assert(M.sameSet(['b','a'],['a','b']));assert(!M.sameSet(['a','a'],['a','b']));
console.log('Correcto: 18 juegos, 160 retos, 16 parejas y 24 fichas de clasificación; respuestas, páginas y tipos coherentes.');
console.log('Correcto: 6 continentes, 5 océanos con ambos Pacíficos válidos, 8 formas de costa, mapas y taller propios.');
