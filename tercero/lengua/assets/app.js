'use strict';
(() => {
  const {games, dictations} = window.LenguaContent;
  const app = document.getElementById('app');
  const key = 'lengua-tercero-octubre-2026-v1';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle = items => {const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  function readStore(){try{return JSON.parse(localStorage.getItem(key))||{};}catch{return {};}}
  function writeStore(value){try{localStorage.setItem(key,JSON.stringify(value));}catch{/* El juego sigue funcionando si el navegador no permite guardar. */}}
  let saved=readStore(), session=null, stopAudio=()=>{};
  function save(id, score, total){
    const old=saved[id];
    const percent=score===null?null:Math.round(score/total*100);
    saved[id]={done:true,best:percent===null?(old?.best??null):Math.max(old?.best??0,percent),date:new Date().toISOString()};
    writeStore(saved);
  }
  function render(html){app.innerHTML=html;}
  function bind(id,fn){document.getElementById(id)?.addEventListener('click',fn);}
  function focus(id){document.getElementById(id)?.focus();}
  const button=(id,text,extra='')=>`<button type="button" class="button ${extra}" id="${id}">${text}</button>`;
  const mascot=`<div class="mascot" aria-hidden="true"><div class="speech">¡Vamos a por una palabra más!</div><svg viewBox="0 0 300 225" fill="none"><ellipse cx="150" cy="212" rx="110" ry="11" fill="#b8d8ca"/><path d="M72 73Q54 31 103 28L150 48L197 28Q246 31 228 73L218 161Q209 201 150 205Q91 201 82 161Z" fill="#087e95"/><path d="M94 91Q122 55 150 94Q178 55 206 91V156Q180 180 150 161Q120 180 94 156Z" fill="#fff5d6"/><circle cx="121" cy="113" r="18" fill="white"/><circle cx="179" cy="113" r="18" fill="white"/><circle cx="125" cy="115" r="8" fill="#183f50"/><circle cx="175" cy="115" r="8" fill="#183f50"/><path d="M140 140L150 153L160 140" fill="#f5a35d"/><path d="M60 152Q30 137 42 183L94 200" fill="#0d6e83"/><path d="M240 152Q270 137 258 183L206 200" fill="#0d6e83"/><path d="M92 166L150 179L208 166V212L150 201L92 212Z" fill="#ffcd59" stroke="#d49a30" stroke-width="3"/><path d="M150 179V201" stroke="#d49a30" stroke-width="3"/><path d="M110 182L135 188M110 192L135 198M165 188L190 182M165 198L190 192" stroke="#8e722e" stroke-width="3" stroke-linecap="round"/><path d="M45 56L50 43L55 56L68 61L55 66L50 79L45 66L32 61Z" fill="#f8c752"/><circle cx="255" cy="29" r="8" fill="#ed997d"/></svg></div>`;
  function card(g,i,dictation=false){const s=saved[g.id];const badge=s?.done?(s.best===null?'✓ Revisado':`★ Mejor: ${(s.best/10).toLocaleString('es-ES')}/10`):dictation?'Con audio pausado':`${g.questions.length} retos · Sin prisa`;return `<a class="card ${dictation?'dictation-card':''}" href="#${g.id}" style="--card-color:${g.color||'#9d9cdb'}"><span class="card-icon" aria-hidden="true">${g.icon}</span><h3>${esc(g.title)}</h3><p>${esc(g.desc)}</p><div class="card-foot"><span>${dictation?'ESCUCHA Y ESCRIBE':String(i+1).padStart(2,'0')+' · '+esc(g.skill)}</span><span class="${s?.done?'saved':''}">${badge}</span></div></a>`;}
  function menu(){
    const complete=[...games,...dictations].filter(g=>saved[g.id]?.done).length;
    render(`<section class="hero"><div><p class="eyebrow">Pequeños retos, grandes palabras</p><h1>Tu próxima aventura<br>empieza con <span class="highlight">una palabra.</span></h1><p>Juega, escucha y escribe a tu ritmo. Vamos a preparar Lengua para el jueves 29 de octubre.</p><div class="actions"><a class="button" href="#mb-mp">¡Empezamos! <span aria-hidden="true">→</span></a><a class="button secondary" href="#dictado-1">🎧 Quiero un dictado</a></div></div>${mascot}</section><div class="summary-strip"><div><strong>⭐ Tu mochila de logros</strong><p class="muted">Cada intento cuenta. Puedes repetir lo que quieras.</p></div><strong>${complete} de 12 completados</strong></div><section aria-labelledby="practice-title"><div class="section-heading"><h2 id="practice-title">Elige tu reto</h2><p>10 juegos · Letras grandes · Sin cronómetro</p></div><div class="cards">${games.map((g,i)=>card(g,i)).join('')}</div></section><section aria-labelledby="dictation-title"><div class="section-heading"><h2 id="dictation-title">🎧 El rincón de los dictados</h2><p>Escucha trocitos cortos y escribe en tu cuaderno.</p></div><div class="cards">${dictations.map((d,i)=>card(d,i,true)).join('')}</div></section><details class="help-panel"><summary>Para la familia: cómo practicar</summary><p>Propuesta: dos o tres juegos, un descanso y un dictado en papel. Los juegos dan explicaciones y una nota orientativa. Cada cuatro preguntas hay una pequeña celebración.</p><p>Los dictados usan audio en castellano incluido en esta carpeta. Por defecto, el niño pulsa para avanzar; en modo automático, cada fragmento se repite y deja 12 o 18 segundos para escribir. No se muestra el texto hasta pedir la corrección.</p><p>El contenido sigue las fotografías del libro y los deberes: mb/mp, sílabas y división al final de línea, familias de palabras, frases y palabras simples y compuestas. Las actividades y los dictados son originales. Los logros y el borrador se guardan solo en este navegador cuando está permitido.</p></details>`);
  }
  function frame(g,inside){return `<a class="back" href="#">← Todos los juegos</a><div class="game-head"><div><p class="eyebrow">${g.icon} ${esc(g.skill||'Escucha y escribe')}</p><h1>${esc(g.title)}</h1></div>${session?`<div class="score" aria-label="Aciertos">⭐ ${session.score} / ${session.questions.length}</div>`:''}</div><section class="board">${inside}</section>`;}
  function startGame(g){session={game:g,questions:shuffle(g.questions),index:0,score:0,answers:[],selection:null,locked:false,cuts:new Set(),pieces:[]};question();}
  function question(){
    const s=session,g=s.game,q=s.questions[s.index];s.selection=null;s.locked=false;s.cuts=new Set();s.pieces=[];
    const progress=`<div class="progress-label"><span>Reto ${s.index+1} de ${s.questions.length}</span><span>¡Tú puedes!</span></div><div class="progress" role="progressbar" aria-label="Progreso" aria-valuemin="0" aria-valuemax="${s.questions.length}" aria-valuenow="${s.index}"><div style="width:${s.index/s.questions.length*100}%"></div></div>`;
    let task='';
    if(g.type==='split'){
      task=`<div class="word">${esc(q.word)}</div><p class="hint">Toca los huecos para poner o quitar guiones.</p><div class="syllable-builder" aria-label="Separar ${esc(q.word)} en sílabas">${[...q.word].map((c,i)=>`<span class="syllable-part">${esc(c)}</span>${i<q.word.length-1?`<button type="button" class="cut" data-cut="${i+1}" aria-pressed="false" aria-label="Separar después de ${esc(q.word.slice(0,i+1))}">·</button>`:''}`).join('')}</div><p class="hint" id="split-preview" aria-live="polite">${esc(q.word)}</p>`;
    }else if(g.type==='build'){
      task=`<p class="hint">Elige dos piezas en orden. También puedes arrastrarlas.</p><div class="assembled" id="assembly" aria-label="Palabra construida" tabindex="0"><span class="muted">Aquí van tus dos piezas</span></div><div class="tiles" id="bank">${shuffle(q.options).map(v=>`<button type="button" class="tile" draggable="true" data-piece="${esc(v)}">${esc(v)}</button>`).join('')}</div><div class="check-row">${button('undo','↶ Quitar última pieza','secondary')}</div>`;
    }else{
      task=`${q.icon?`<div class="big-icon" aria-hidden="true">${q.icon}</div>`:''}${q.display?`<div class="word">${esc(q.display)}</div>`:''}${q.hint?`<p class="hint">${esc(q.hint)}</p>`:''}<div class="choices">${shuffle(q.options).map((opt,i)=>`<button type="button" class="choice" data-option="${esc(opt)}" aria-pressed="false">${esc(opt)}</button>`).join('')}</div>`;
    }
    render(frame(g,`${progress}<p class="rule">💡 ${esc(g.rule)}</p><h2 class="question" id="question-heading" tabindex="-1">${esc(q.prompt)}</h2>${task}<div id="feedback" role="status" aria-live="polite"></div><div class="check-row">${button('check','Comprobar ✓')}${button('next','Siguiente →','gold')}</div>`));
    document.getElementById('next').hidden=true;
    if(g.type==='split'){
      document.querySelectorAll('[data-cut]').forEach(el=>el.addEventListener('click',()=>{if(s.locked)return;const n=Number(el.dataset.cut);s.cuts.has(n)?s.cuts.delete(n):s.cuts.add(n);el.setAttribute('aria-pressed',s.cuts.has(n));el.textContent=s.cuts.has(n)?'−':'·';document.getElementById('split-preview').textContent=splitAnswer(q.word,s.cuts);}));
    }else if(g.type==='build'){
      document.querySelectorAll('[data-piece]').forEach(el=>{
        el.addEventListener('click',()=>addPiece(el.dataset.piece));
        el.addEventListener('dragstart',ev=>{if(s.locked){ev.preventDefault();return;}ev.dataTransfer.setData('text/plain',el.dataset.piece);ev.dataTransfer.effectAllowed='copy';});
      });
      const zone=document.getElementById('assembly');zone.addEventListener('dragover',ev=>ev.preventDefault());zone.addEventListener('drop',ev=>{ev.preventDefault();addPiece(ev.dataTransfer.getData('text/plain'));});
      bind('undo',()=>{if(!s.locked){s.pieces.pop();updatePieces();}});
    }else{
      document.querySelectorAll('[data-option]').forEach(el=>el.addEventListener('click',()=>{if(s.locked)return;s.selection=el.dataset.option;document.querySelectorAll('[data-option]').forEach(b=>{const yes=b===el;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',yes);});}));
    }
    bind('check',check);bind('next',next);focus('question-heading');
  }
  function splitAnswer(word,cuts){return [...word].map((c,i)=>c+(cuts.has(i+1)?'-':'')).join('');}
  function addPiece(value){const s=session,q=s.questions[s.index];if(s.locked||s.pieces.length>=2||!q.options.includes(value)||s.pieces.includes(value))return;s.pieces.push(value);updatePieces();}
  function updatePieces(){const s=session;document.getElementById('assembly').innerHTML=s.pieces.length?s.pieces.map(p=>`<span class="tile">${esc(p)}</span>`).join('<span aria-hidden="true">+</span>'):'<span class="muted">Aquí van tus dos piezas</span>';document.querySelectorAll('[data-piece]').forEach(b=>{b.disabled=s.pieces.includes(b.dataset.piece);});}
  function check(){
    const s=session;if(!s||s.locked)return;const g=s.game,q=s.questions[s.index];
    let answer=s.selection;
    if(g.type==='split')answer=splitAnswer(q.word,s.cuts);
    if(g.type==='build')answer=s.pieces.length===q.parts.length&&s.pieces.every((p,i)=>p===q.parts[i])?q.answer:s.pieces.join('');
    if((g.type==='build'&&s.pieces.length!==2)||answer===null){document.getElementById('feedback').innerHTML='<p class="toast">Elige tu respuesta antes de comprobar.</p>';return;}
    s.locked=true;const ok=answer===q.answer;if(ok)s.score++;
    s.answers.push({prompt:q.word||q.display||q.prompt,answer,correct:q.answer,explanation:q.explanation,ok});
    document.querySelectorAll('.choice,.cut,#bank .tile,#undo').forEach(b=>{b.disabled=true;if(b.dataset.option===q.answer)b.classList.add('correct');else if(b.dataset.option===answer)b.classList.add('wrong');});
    const fb=document.getElementById('feedback');fb.className=`feedback ${ok?'good':'again'}`;fb.innerHTML=`<strong>${ok?'🌟 ¡Muy bien!':'🌱 Vamos a aprenderlo.'}</strong>${esc(q.explanation).replace(/\n/g,'<br>')}`;
    document.getElementById('check').hidden=true;const n=document.getElementById('next');n.hidden=false;n.textContent=s.index===s.questions.length-1?'Ver mi podio 🏆':'Siguiente →';document.querySelector('.score').textContent=`⭐ ${s.score} / ${s.questions.length}`;focus('next');
  }
  function next(){if(!session?.locked)return;session.index++;if(session.index===session.questions.length){finish();}else if(session.index%4===0){checkpoint();}else question();}
  function checkpoint(){const s=session;render(frame(s.game,`<div class="checkpoint"><div class="big-icon" aria-hidden="true">🌟</div><h2>¡Cuatro pasos más!</h2><p>Ya has resuelto ${s.index} retos. Respira, estira los dedos<br>y seguimos cuando tú quieras.</p>${button('continue','¡Sigo la aventura! →','gold')}</div>`));bind('continue',question);focus('continue');}
  function finish(){const s=session,g=s.game;save(g.id,s.score,s.questions.length);const grade=(s.score/s.questions.length*10).toLocaleString('es-ES',{maximumFractionDigits:1});const mistakes=s.answers.filter(a=>!a.ok);const nextGame=games[games.findIndex(x=>x.id===g.id)+1];render(frame(g,`<div class="result"><div class="trophy" aria-hidden="true">🏆</div><h1>¡Aventura completada!</h1><div class="grade">${grade}<span style="font-size:1.2rem"> / 10</span></div><p>${s.score} de ${s.questions.length} respuestas correctas.<br>${mistakes.length?'Cada error te enseña algo nuevo. ¡Seguimos aprendiendo!':'¡Un gran trabajo! Has cuidado cada palabra.'}</p><div class="podium" aria-hidden="true"><div class="silver">Esfuerzo</div><div class="gold">⭐<br>¡Tú!</div><div class="bronze">Práctica</div></div><div class="check-row">${button('retry','↻ Volver a jugar','secondary')}<a class="button" href="#">Ver los juegos</a>${nextGame?`<a class="button gold" href="#${nextGame.id}">Próximo reto →</a>`:`<a class="button gold" href="#dictado-1">Probar un dictado →</a>`}</div>${mistakes.length?`<details class="review"><summary>Repasamos ${mistakes.length} ${mistakes.length===1?'respuesta':'respuestas'}</summary><ul>${mistakes.map(a=>`<li><strong>${esc(a.prompt)}</strong><br>Elegiste: ${esc(a.answer)}.<br>${esc(a.explanation)}</li>`).join('')}</ul></details>`:''}</div>`));bind('retry',()=>startGame(g));}

  /* La comparación alinea palabras: una omisión no desplaza el resto del dictado.
     Se conservan las tildes y la ñ; mayúsculas y puntuación se revisan aparte. */
  function compareWords(expected,actual){
    const tokenize=t=>t.normalize('NFC').match(/[\p{L}\p{N}]+/gu)||[];
    const a=tokenize(expected),b=tokenize(actual),dp=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
    for(let i=0;i<=a.length;i++)dp[i][0]=i;for(let j=0;j<=b.length;j++)dp[0][j]=j;
    const equal=(x,y)=>x.toLocaleLowerCase('es')===y.toLocaleLowerCase('es');
    for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(equal(a[i-1],b[j-1])?0:1));
    let i=a.length,j=b.length,rows=[];
    while(i||j){if(i&&j&&dp[i][j]===dp[i-1][j-1]+(equal(a[i-1],b[j-1])?0:1)){rows.push({expected:a[i-1],actual:b[j-1],ok:equal(a[i-1],b[j-1])});i--;j--;}else if(i&&dp[i][j]===dp[i-1][j]+1){rows.push({expected:a[i-1],actual:'(falta)',ok:false});i--;}else{rows.push({expected:'',actual:b[j-1],ok:false});j--;}}
    return {rows:rows.reverse(),correct:rows.filter(r=>r.ok).length,total:a.length,extra:rows.filter(r=>!r.expected).length};
  }
  function startDictation(d){
    session=null;let index=0,started=false,finished=false,busy=false,paused=false,whole=false,token=0,timer=null,audio=null,failed=false;
    render(frame(d,`<p class="rule">Prepara tu lápiz y tu cuaderno. Escucha trocitos de 2 a 4 palabras, escribe y sigue cuando estés listo. La voz dice «punto» al final de cada frase: escribe el signo, no la palabra.</p><div class="dictation-tools"><label class="field">¿A qué ritmo vamos?<select id="pace"><option value="manual">A mi ritmo · yo pulso para seguir</option><option value="12000">Muy despacio · pausa de 12 segundos</option><option value="18000">Todavía más despacio · pausa de 18 segundos</option></select></label><label class="field">¿Dónde escribes?<select id="write-mode"><option value="paper">En mi cuaderno, con lápiz</option><option value="screen">Aquí, con el teclado</option></select></label></div><div class="listen-box"><div class="listen-icon" aria-hidden="true">🎧</div><p class="listen-status" id="audio-status" role="status" aria-live="polite">¡Preparado! Son ${d.sentences.length} frases cortas.<br>Pulsa para escuchar el primer trocito.</p><div class="audio-actions">${button('play','▶ Empezar despacio')}${button('pause','⏸ Pausar','secondary')}${button('repeat','↻ Repetir trocito','secondary')}</div><div class="audio-actions">${button('previous','← Trocito anterior','secondary')}${button('advance','Ya lo he escrito →','gold')}</div><div class="check-row">${button('whole','🔊 Escuchar todo el dictado','secondary')}${button('restart','Volver al principio','secondary')}</div></div><div class="writing"><div id="paper-note"><p>✏️ Escribe en tu cuaderno. No hace falta ir deprisa: cuida los espacios, las mayúsculas y los puntos.</p></div><div id="screen-writing" hidden><label for="draft">Mi dictado</label><p>Escribe lo que escuchas. Aquí no hay corrector de ortografía.</p><textarea id="draft" spellcheck="false" autocorrect="off" autocapitalize="off" autocomplete="off" placeholder="Empieza aquí cuando escuches la voz…"></textarea></div></div><div class="check-row">${button('reveal','He terminado: revisar mi dictado ✓','gold')}</div><div id="correction" aria-live="polite"></div>`));
    const status=document.getElementById('audio-status'),pace=document.getElementById('pace'),mode=document.getElementById('write-mode'),draft=document.getElementById('draft');
    try{draft.value=localStorage.getItem(key+'-draft-'+d.id)||'';}catch{}
    draft.addEventListener('input',()=>{try{localStorage.setItem(key+'-draft-'+d.id,draft.value);}catch{}});
    function cancel(){token++;clearTimeout(timer);timer=null;if(audio){audio.pause();audio.onended=null;audio.onerror=null;audio=null;}busy=false;whole=false;}
    stopAudio=cancel;
    function update(){
      document.getElementById('pause').disabled=!busy;
      document.getElementById('repeat').disabled=!started||whole;
      document.getElementById('previous').disabled=!started||index===0||whole;
      document.getElementById('advance').disabled=!started||finished||whole;
      document.getElementById('play').disabled=busy;
      document.getElementById('play').textContent=finished?'↻ Volver a dictar':paused?'▶ Continuar':started?'▶ Escuchar trocito':'▶ Empezar despacio';
    }
    function playFile(src,mine,done){
      audio=new Audio(src);audio.onended=()=>{if(mine===token){audio=null;done();}};
      const error=()=>{if(mine!==token)return;cancel();failed=true;paused=true;status.textContent='No se ha podido reproducir el audio. Comprueba el volumen y pulsa Continuar para intentarlo otra vez.';update();};
      audio.onerror=error;audio.play().catch(error);
    }
    function readChunk(){
      cancel();if(finished){index=0;finished=false;}started=true;paused=false;failed=false;busy=true;const mine=token;
      status.textContent=`Escucha el trocito ${index+1} de ${d.chunks.length}. Se repetirá una vez.`;update();
      const file=`assets/audio/${d.id}-${index}.wav`;
      playFile(file,mine,()=>{timer=setTimeout(()=>{if(mine!==token)return;status.textContent=`Otra vez el trocito ${index+1}.`;playFile(file,mine,afterRepeated);},1700);});
      function afterRepeated(){
        if(mine!==token)return;
        if(pace.value==='manual'){
          busy=false;status.textContent=`Trocito ${index+1} de ${d.chunks.length}. Escribe con calma y pulsa «Ya lo he escrito».`;update();
        }else{
          let remaining=Number(pace.value)/1000;
          function tick(){if(mine!==token)return;status.textContent=`Ahora escribe con calma. Quedan ${remaining} segundos de pausa. Puedes pausar o repetir.`;if(remaining<=0){advance();return;}remaining--;timer=setTimeout(tick,1000);}
          tick();
        }
      }
    }
    function advance(){if(!started||finished||whole)return;cancel();if(index<d.chunks.length-1){index++;readChunk();}else{finished=true;paused=false;status.textContent='¡Has escuchado todos los trocitos! Revisa tu escrito. Puedes escuchar el texto completo antes de corregir.';update();}}
    bind('play',readChunk);bind('repeat',readChunk);bind('advance',advance);
    bind('previous',()=>{if(index>0){cancel();finished=false;index--;readChunk();}});
    bind('pause',()=>{cancel();paused=true;status.textContent='En pausa. Tienes todo el tiempo que necesites. Al continuar, repetimos este trocito.';update();});
    bind('restart',()=>{cancel();index=0;started=false;finished=false;paused=false;status.textContent='Volvemos al principio. Tu escrito sigue aquí. Pulsa «Empezar despacio».';update();});
    bind('whole',()=>{cancel();busy=true;whole=true;const mine=token;status.textContent='Escucha el texto completo. Después lo dictamos por trocitos o lo usamos para revisar.';update();playFile(`assets/audio/${d.id}-full.wav`,mine,()=>{busy=false;whole=false;status.textContent='Texto completo escuchado. Puedes continuar con los trocitos o revisar tu dictado.';update();});});
    pace.addEventListener('change',()=>{if(busy){cancel();paused=true;status.textContent='Ritmo cambiado. Pulsa Continuar para escuchar de nuevo este trocito.';update();}});
    function syncWriting(){const screen=mode.value==='screen';document.getElementById('screen-writing').hidden=!screen;document.getElementById('paper-note').hidden=screen;document.getElementById('correction').innerHTML='';}
    mode.addEventListener('change',syncWriting);
    bind('reveal',()=>{
      if(mode.value==='screen'&&!draft.value.trim()){document.getElementById('correction').innerHTML='<p class="toast">Escribe el dictado antes de corregir o elige «En mi cuaderno» si lo has hecho en papel.</p>';return;}
      cancel();paused=true;status.textContent='Audio detenido para revisar. Puedes volver a escucharlo cuando quieras.';update();
      const report=mode.value==='screen'?compareWords(d.text,draft.value):null;
      let detail='';
      if(report){const percent=Math.round(report.correct/report.total*100);detail=`<p><strong>${report.correct} de ${report.total} palabras bien escritas (${percent} %).</strong>${report.extra?` Hay ${report.extra} ${report.extra===1?'palabra añadida':'palabras añadidas'}.`:''}</p><p class="muted">Esta comparación revisa las palabras y sus tildes. Revisa también las mayúsculas y la puntuación con el modelo.</p><div class="comparison">${report.rows.map(r=>`<span class="${r.ok?'match':'miss'}">${esc(r.expected||'(sobra)')}${!r.ok?`<small>Escribiste: ${esc(r.actual)}</small>`:''}</span>`).join('')}</div>`;save(d.id,report.correct,report.total);}
      document.getElementById('correction').innerHTML=`<div class="help-panel"><h2>🔎 Vamos a revisarlo</h2><p>Compara tu escrito con el modelo, palabra a palabra.</p><div class="model-text">${esc(d.text)}</div><div style="margin-top:20px">${detail}</div><p>☐ He dejado espacios entre las palabras.<br>☐ He empezado cada frase con mayúscula.<br>☐ He escrito los nombres propios con mayúscula.<br>☐ He puesto los cuatro puntos finales.<br>☐ He revisado mb, mp y las tildes.</p><div class="check-row">${button('reviewed','Ya he revisado mi cuaderno ⭐','gold')}<a class="button secondary" href="#">Volver a los juegos</a></div><p class="muted" id="review-note"></p></div>`;
      document.getElementById('reviewed').hidden=!!report;
      bind('reviewed',()=>{save(d.id,null,1);document.getElementById('review-note').textContent='⭐ ¡Dictado revisado! Un paso más en tu aventura.';document.getElementById('reviewed').disabled=true;});
    });
    update();
    // Al ocultar la página, detenemos el avance para no dictar mientras el niño está fuera.
    const onHide=()=>{if(document.hidden&&busy){cancel();paused=true;status.textContent='En pausa. Pulsa Continuar cuando vuelvas.';update();}};
    document.addEventListener('visibilitychange',onHide);
    stopAudio=()=>{cancel();document.removeEventListener('visibilitychange',onHide);};
  }
  function route(){stopAudio();stopAudio=()=>{};session=null;let id=location.hash.slice(1);const g=games.find(g=>g.id===id),d=dictations.find(d=>d.id===id);if(g)startGame(g);else if(d)startDictation(d);else menu();window.scrollTo(0,0);}
  window.addEventListener('hashchange',route);window.addEventListener('pagehide',()=>stopAudio());route();
})();
