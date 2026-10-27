/* Comprobación sin dependencias: node tools/verificar.cjs */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/content.js'),'utf8'),context);
const {games,dictations}=context.window.LenguaContent;
assert.equal(games.length,10);assert.equal(dictations.length,2);
const ids=[...games,...dictations].map(g=>g.id);assert.equal(new Set(ids).size,12);
let count=0;
for(const g of games){
  assert(g.questions.length>=8);
  for(const q of g.questions){
    count++;assert(q.prompt&&q.explanation&&q.answer);
    if(!g.type){assert(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);}
    if(q.full)assert.equal(q.display.replace('__',q.answer),q.full);
    if(g.type==='split'){assert.equal(q.answer.replaceAll('-',''),q.word);assert(!q.answer.includes('l-l'));assert(!q.answer.includes('r-r'));assert(!q.answer.includes('c-h'));}
    if(g.type==='build')for(const p of q.parts)assert(q.options.includes(p));
  }
}
const source=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const compareSource=source.slice(source.indexOf('  function compareWords('),source.indexOf('  function startDictation('));
vm.runInNewContext(compareSource+';globalThis.compare=compareWords;',context);
assert.equal(context.compare('Amparo lleva un sombrero.','Amparo lleva un sombrero.').correct,4);
assert.equal(context.compare('Amparo lleva un sombrero.','Amparo un sombrero.').correct,3);
assert.equal(context.compare('El árbol tiene sombra.','El arbol tiene sombra.').correct,3);
assert.equal(context.compare('El niño juega.','El nino juega.').correct,2);
assert.equal(context.compare('El campo.','El campo verde.').extra,1);
assert.equal(context.compare('El campo.','').correct,0);
assert.equal(context.compare('El árbol.','El a\u0301rbol.').correct,2);
assert.equal(context.compare('El campo.','el CAMPO').correct,2);
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'audio-manifest.json'),'utf8'));
let seconds=0;
for(const item of manifest){
  const wav=fs.readFileSync(path.join(root,'assets/audio',item.file));
  assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');
  let offset=12,bytesPerSecond=0,dataLength=0;
  while(offset+8<=wav.length){const type=wav.toString('ascii',offset,offset+4),length=wav.readUInt32LE(offset+4);if(type==='fmt ')bytesPerSecond=wav.readUInt32LE(offset+16);if(type==='data')dataLength=length;offset+=8+length+(length%2);}
  assert(bytesPerSecond>0&&dataLength>0);assert(dataLength/bytesPerSecond>.3);seconds+=dataLength/bytesPerSecond;
}
for(const d of dictations){
  assert.equal(d.sentences.length,4);assert.equal(d.text,d.chunks.join(' '));
  assert.equal(manifest.find(a=>a.file===d.id+'-full.wav').text,d.text);
  d.chunks.forEach((c,i)=>{assert(c.replace(/\.$/,'').split(' ').length<=4);const m=manifest.find(a=>a.file===`${d.id}-${i}.wav`);assert(m);assert.equal(m.text,c.replace(/\.$/,'')+(c.endsWith('.')?'. Punto.':''));});
}
assert.equal(manifest.length,dictations.reduce((n,d)=>n+d.chunks.length+1,0));
console.log(`Correcto: ${games.length} juegos, ${count} preguntas, ${dictations.length} dictados, ${manifest.length} audios WAV (${Math.round(seconds)} s de voz).`);
console.log('Correcto: familias de respuestas, sílabas, formación de palabras, comparación con omisiones, tildes y ñ, y correspondencia entre texto y audio.');
