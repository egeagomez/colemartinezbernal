/* Actividades originales a partir de los contenidos de las páginas 20–23
   y las fichas de mb/mp aportadas por la familia. Sin dependencias externas. */
'use strict';
window.LenguaContent = (() => {
  const q = (prompt, options, answer, explanation, extra = {}) => ({prompt, options, answer, explanation, ...extra});
  const games = [
    {id:'mb-mp', title:'El taller de MB y MP', icon:'🔔', color:'#eda673', desc:'Completa palabras con las piezas que faltan.', skill:'Ortografía', rule:'Antes de b y de p escribimos m: mb y mp.', questions:[
      ...[['ca','ana','mp','campana','Suena para avisar.','🔔'],['bo','illa','mb','bombilla','Sirve para iluminar.','💡'],['tro','eta','mp','trompeta','Un instrumento de viento.','🎺'],['colu','io','mp','columpio','Te balanceas en él.','🛝'],['ta','or','mb','tambor','Lo tocas con baquetas.','🥁'],['cha','ú','mp','champú','Te lavas el pelo con él.','🧴'],['so','rero','mb','sombrero','Te lo pones en la cabeza.','👒'],['ca','o','mp','campo','Hay árboles y animales.','🌳'],['tie','o','mp','tiempo','Lo mides con el reloj.','🕒'],['o','ligo','mb','ombligo','Lo tienes en la barriga.','🧒'],['li','io','mp','limpio','Lo contrario de sucio.','✨'],['a','ulancia','mb','ambulancia','Ayuda en las emergencias.','🚑']].map(([left,right,answer,full,hint,icon])=>q('Completa la palabra.',['mb','mp'],answer,`${full}: antes de ${answer[1]} escribimos m.`,{display:`${left}__${right}`,full,hint,icon}))
    ]},
    {id:'detectives',title:'Detectives de palabras',icon:'🔎',color:'#eda673',desc:'Encuentra la palabra que está bien escrita.',skill:'Ortografía',rule:'Mira la letra que viene después: delante de b y p va m.',questions:[
      q('¿Cuál está bien escrita?',['canpana','campana','cam pana'],'campana','Campana lleva mp.'),
      q('¿Cuál está bien escrita?',['bonbilla','bombiya','bombilla'],'bombilla','Bombilla lleva mb y ll.'),
      q('¿Cuál está bien escrita?',['tanbor','tambor','tamborr'],'tambor','Tambor lleva mb.'),
      q('¿Cuál está bien escrita?',['conprar','comprar','com prar'],'comprar','Comprar lleva mp.'),
      q('¿Cuál está bien escrita?',['sombrero','sonbrero','som vrero'],'sombrero','Sombrero lleva mb.'),
      q('¿Cuál está bien escrita?',['linpio','limpio','lim pio'],'limpio','Limpio lleva mp y se escribe en una sola palabra.'),
      q('¿Cuál está bien escrita?',['canpeón','campeón','can peón'],'campeón','Campeón lleva mp y tilde en la ó.'),
      q('¿Cuál está bien escrita?',['alfrombra','alfonbra','alfombra'],'alfombra','Alfombra lleva mb.')
    ]},
    {id:'silabas',title:'Palabras a trocitos',icon:'🧩',color:'#77b9cd',desc:'Toca los huecos para separar las sílabas.',skill:'Sílabas',type:'split',rule:'Cada sílaba es un golpe de voz. Toca entre las letras para poner o quitar un guion.',questions:[
      ['gato','ga-to'],['mapa','ma-pa'],['bosque','bos-que'],['castillo','cas-ti-llo'],['sombrero','som-bre-ro'],['campana','cam-pa-na'],['carroza','ca-rro-za'],['hechizo','he-chi-zo'],['trompeta','trom-pe-ta'],['zapato','za-pa-to']
    ].map(([word,answer])=>({word,answer,prompt:'Separa en sílabas.',explanation:`${word} se divide así: ${answer}.`}))},
    {id:'guiones',title:'El salto de línea',icon:'↩️',color:'#77b9cd',desc:'Ayuda a las palabras a cambiar de renglón.',skill:'División de palabras',rule:'Para cambiar de línea, divide entre sílabas y pon un guion al final. No separes las letras de una misma sílaba.',questions:[
      q('Elige una separación correcta de «zapato».',['zapa-\nto','zap-\nato','zapat-\no'],'zapa-\nto','Za-pa-to: podemos separar za- / pato o zapa- / to.'),
      q('Elige una separación correcta de «bosque».',['bo-\nsque','bos-\nque','bosq-\nue'],'bos-\nque','Bos-que: la q y la u de «que» van juntas.'),
      q('Elige una separación correcta de «castillo».',['cast-\nillo','castil-\nlo','casti-\nllo'],'casti-\nllo','Cas-ti-llo: las dos eles de ll van juntas.'),
      q('Elige una separación correcta de «carroza».',['car-\nroza','carro-\nza','carr-\noza'],'carro-\nza','Ca-rro-za: las dos erres van juntas.'),
      q('Elige una separación correcta de «sombrero».',['som-\nbrero','somb-\nrero','so-\nmbrero'],'som-\nbrero','Som-bre-ro: m y b quedan en sílabas distintas.'),
      q('Elige una separación correcta de «campana».',['ca-\nmpana','camp-\nana','cam-\npana'],'cam-\npana','Cam-pa-na: m y p quedan en sílabas distintas.'),
      q('Elige una separación correcta de «hechizo».',['hec-\nhizo','he-\nchizo','hech-\nizo'],'he-\nchizo','He-chi-zo: la c y la h de ch van juntas.'),
      q('Elige una separación correcta de «tesoro».',['tes-\noro','tesor-\no','te-\nsoro'],'te-\nsoro','Te-so-ro: separamos entre sílabas.')
    ]},
    {id:'familias',title:'Cada palabra con su familia',icon:'🌳',color:'#84bda1',desc:'Relaciona palabras que nacen de la misma raíz.',skill:'Familias de palabras',rule:'Las palabras de una familia comparten una raíz y un significado relacionado: pan, panadero, panadería.',questions:[
      q('¿A qué familia pertenece «florista»?',['flor','bosque','jardín'],'flor','Florista viene de flor. Jardín está relacionado, pero no tiene la misma raíz.'),
      q('¿A qué familia pertenece «zapatero»?',['pie','zapato','tienda'],'zapato','Zapato, zapatero y zapatería comparten la raíz zapat-.'),
      q('¿A qué familia pertenece «librería»?',['lectura','papel','libro'],'libro','Libro, librero y librería pertenecen a la misma familia.'),
      q('¿A qué familia pertenece «casero»?',['casa','calle','cama'],'casa','Casa, casita y casero pertenecen a la misma familia.'),
      q('¿A qué familia pertenece «panadería»?',['pastel','comida','pan'],'pan','Pan, panadero y panadería comparten la raíz pan-.'),
      q('¿A qué familia pertenece «niñera»?',['niño','niña bonita','escuela'],'niño','Niño, niñez y niñera comparten la raíz niñ-.'),
      q('¿A qué familia pertenece «leñador»?',['árbol','leña','bosque'],'leña','Leña y leñador pertenecen a la misma familia.'),
      q('¿A qué familia pertenece «soleado»?',['calor','verano','sol'],'sol','Sol y soleado comparten la raíz sol-.')
    ]},
    {id:'intruso',title:'¿Quién se ha colado?',icon:'🕵️',color:'#84bda1',desc:'Busca la palabra que no pertenece a la familia.',skill:'Familias de palabras',rule:'Hablar del mismo tema no basta: las palabras de la misma familia tienen una raíz común.',questions:[
      q('¿Cuál NO es de la familia de flor?',['florero','florista','árbol'],'árbol','Florero y florista vienen de flor; árbol no.'),
      q('¿Cuál NO es de la familia de pan?',['panadero','queso','panecillo'],'queso','Queso también es un alimento, pero no viene de pan.'),
      q('¿Cuál NO es de la familia de zapato?',['calcetín','zapatería','zapatero'],'calcetín','Calcetín se usa en el pie, pero no viene de zapato.'),
      q('¿Cuál NO es de la familia de libro?',['librero','librería','cuaderno'],'cuaderno','Cuaderno no comparte la raíz libr-.'),
      q('¿Cuál NO es de la familia de casa?',['casita','casero','castillo'],'castillo','Aunque empieza de forma parecida, castillo no viene de casa.'),
      q('¿Cuál NO es de la familia de niño?',['niñera','colegio','niñez'],'colegio','Colegio no comparte la raíz niñ-.'),
      q('¿Cuál NO es de la familia de sol?',['soleado','soldado','solecito'],'soldado','Soldado empieza por sol, pero su significado no viene de sol.'),
      q('¿Cuál NO es de la familia de leña?',['leñador','leñera','hoja'],'hoja','Leñador y leñera vienen de leña; hoja no.')
    ]},
    {id:'frases',title:'La frase que encaja',icon:'💬',color:'#b6a2d5',desc:'Completa pequeñas historias con sentido.',skill:'Completar frases',rule:'Lee toda la frase y elige la palabra que tiene sentido.',questions:[
      q('El dragón vive en un ___.',['castillo','tambor','zapato'],'castillo','Un castillo puede ser el hogar de un dragón en un cuento.'),
      q('La sirena tiene muchas ___ en la cola.',['campanas','escamas','bombillas'],'escamas','La cola de la sirena está cubierta de escamas.'),
      q('Para lavarme el pelo uso ___.',['champú','trompeta','sombrero'],'champú','El champú sirve para lavar el pelo.'),
      q('La ___ ilumina mi habitación.',['campana','bombilla','alfombra'],'bombilla','La bombilla da luz.'),
      q('Cuando suena la ___, entramos en clase.',['sombra','campana','bandeja'],'campana','Una campana puede avisarnos de que empieza la clase.'),
      q('El panadero prepara el ___ cada mañana.',['libro','tambor','pan'],'pan','Panadero y pan son de la misma familia.'),
      q('Estoy muy bien. ¿Y ___?',['tú','ayer','azul'],'tú','«¿Y tú?» sirve para preguntar cómo está la otra persona.'),
      q('Voy al parque para jugar en el ___.',['columpio','champú','ombligo'],'columpio','En el parque podemos jugar en el columpio.')
    ]},
    {id:'simples',title:'¿Simple o compuesta?',icon:'🧱',color:'#e0b45e',desc:'Descubre cómo están construidas las palabras.',skill:'Palabras simples y compuestas',rule:'Una palabra compuesta se forma uniendo dos o más palabras: para + sol → parasol. Una palabra simple no se forma así.',questions:[
      ...[['perro','Simple','Perro no se forma uniendo otras palabras.'],['parasol','Compuesta','Para + sol → parasol.'],['coche','Simple','Coche no se forma uniendo otras palabras.'],['sacacorchos','Compuesta','Saca + corchos → sacacorchos.'],['flor','Simple','Flor es una palabra simple.'],['telaraña','Compuesta','Tela + araña → telaraña.'],['ayer','Simple','Ayer es una palabra simple.'],['parabrisas','Compuesta','Para + brisas → parabrisas.'],['portarretratos','Compuesta','Porta + retratos → portarretratos.'],['cumpleaños','Compuesta','Cumple + años → cumpleaños.']].map(([word,answer,explanation])=>q(`«${word}» es una palabra…`,['Simple','Compuesta'],answer,explanation))
    ]},
    {id:'compuestas',title:'La fábrica de palabras',icon:'🏗️',color:'#e0b45e',desc:'Une dos piezas y construye una palabra nueva.',skill:'Palabras compuestas',type:'build',rule:'Toca las dos piezas en orden. También puedes arrastrarlas al recuadro. Une las palabras sin dejar espacios.',questions:[
      {prompt:'Protege del sol.',parts:['para','sol'],options:['sol','para','luna'],answer:'parasol',explanation:'Para + sol = parasol.'},
      {prompt:'La construye una araña.',parts:['tela','araña'],options:['rana','araña','tela'],answer:'telaraña',explanation:'Tela + araña = telaraña. Al unirlas, las dos aes se convierten en una.'},
      {prompt:'Sirve para sacar un corcho.',parts:['saca','corchos'],options:['corchos','saca','coche'],answer:'sacacorchos',explanation:'Saca + corchos = sacacorchos.'},
      {prompt:'Se usa para abrir latas.',parts:['abre','latas'],options:['lava','latas','abre'],answer:'abrelatas',explanation:'Abre + latas = abrelatas.'},
      {prompt:'Gira buscando la luz del sol.',parts:['gira','sol'],options:['sol','para','gira'],answer:'girasol',explanation:'Gira + sol = girasol.'},
      {prompt:'Se usa para lavar la vajilla.',parts:['lava','vajillas'],options:['vajillas','lava','quita'],answer:'lavavajillas',explanation:'Lava + vajillas = lavavajillas.'},
      {prompt:'Sirve para quitar manchas.',parts:['quita','manchas'],options:['manchas','porta','quita'],answer:'quitamanchas',explanation:'Quita + manchas = quitamanchas.'},
      {prompt:'Es el día en que cumples un año más.',parts:['cumple','años'],options:['cumple','años','fiesta'],answer:'cumpleaños',explanation:'Cumple + años = cumpleaños.'}
    ]},
    {id:'repaso',title:'La gran aventura final',icon:'🏆',color:'#f2bf52',desc:'Un poco de todo para preparar el examen.',skill:'Repaso del examen',rule:'Lee sin prisa. No hay cronómetro. Piensa antes de corregir.',questions:[
      q('Completa: ca__ana.',['mb','mp'],'mp','Campana se escribe con mp.'),
      q('¿Cuál está bien escrita?',['bonbilla','bombilla','vonbilla'],'bombilla','Antes de b escribimos m: bombilla.'),
      q('¿Cómo se separa «tambor» en sílabas?',['tam-bor','ta-mbor','tamb-or'],'tam-bor','Tam-bor tiene dos sílabas.'),
      q('¿Cómo puede cambiar de línea «castillo»?',['castil-\nlo','casti-\nllo','cast-\nillo'],'casti-\nllo','No separamos las dos letras de ll.'),
      q('¿Cuál pertenece a la familia de zapato?',['calcetín','zapatería','pie'],'zapatería','Zapato y zapatería comparten la raíz zapat-.'),
      q('¿Cuál NO pertenece a la familia de flor?',['florero','florista','maceta'],'maceta','Una maceta contiene flores, pero no viene de la palabra flor.'),
      q('El ___ prepara pan en la panadería.',['panadero','librero','florista'],'panadero','Pan, panadero y panadería pertenecen a la misma familia.'),
      q('«Coche» es una palabra…',['Simple','Compuesta'],'Simple','Coche no se forma uniendo otras palabras.'),
      q('¿Qué palabra se forma con «para + sol»?',['parasol','parasoles','pasador'],'parasol','Para + sol = parasol.'),
      q('¿Cuál es una palabra compuesta?',['ayer','perro','quitamanchas'],'quitamanchas','Quita + manchas = quitamanchas.')
    ]}
  ];
  const dictations = [
    {id:'dictado-1',title:'Dictado 1 · Una tarde en el campo',icon:'🎧',desc:'4 frases cortas · MB y MP · Primer paso',sentences:[
      ['Amparo lleva','un sombrero.'],
      ['En el campo','suena una campana.'],
      ['Pablo toca','la trompeta','y el tambor.'],
      ['La sombra','del árbol','es grande.']
    ]},
    {id:'dictado-2',title:'Dictado 2 · El cumpleaños',icon:'✏️',desc:'4 frases · Palabras compuestas · Un paso más',sentences:[
      ['Hoy es','el cumpleaños','de mi compañero.'],
      ['Compramos pan','en la panadería.'],
      ['En el jardín','hay un girasol','y un columpio.'],
      ['Mi hermana','abre el regalo','y encuentra','un tambor pequeño.']
    ]}
  ];
  dictations.forEach(d=>{d.text=d.sentences.map(s=>s.join(' ')).join(' ');d.chunks=d.sentences.flat();});
  return {games,dictations};
})();
