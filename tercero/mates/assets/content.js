'use strict';
window.MatesContent=(()=>{
  const column=(nums,sign)=>({type:'column',nums,sign,prompt:sign==='−'?'Resuelve la resta. Empieza por las unidades.':'Suma en columna. Empieza por las unidades.',answer:sign==='−'?nums[0]-nums[1]:nums.reduce((a,b)=>a+b,0)});
  const choice=(prompt,options,answer,extra={})=>({type:'choice',prompt,options,answer,...extra});
  const problem=(story,question,steps,unit,answerStart='En total hay')=>({type:'problem',story,question,prompt:question,steps,unit,answer:steps.at(-1).answer,answerStart});
  const datum=(text,value)=>({text,value,needed:true});
  const add=(operands,label='Calcula el total.')=>({op:'+',operands,answer:operands.reduce((a,b)=>a+b,0),label});
  const sub=(a,b,label='Calcula lo que queda.')=>({op:'−',operands:[a,b],answer:a-b,label});
  const problems=[
    problem(['En la biblioteca hay ',datum('34 libros',34),'. Llegan ',datum('28 libros nuevos',28),'.'],'¿Cuántos libros hay ahora?',[add([34,28])],'libros'),
    problem(['Una tienda tiene ',datum('82 botellas',82),'. Vende ',datum('37 botellas',37),'.'],'¿Cuántas botellas quedan?',[sub(82,37)],'botellas','Quedan'),
    problem(['Ana tiene ',datum('72 euros',72),'. Compra una mochila de ',datum('28 euros',28),'.'],'¿Cuánto dinero le queda?',[sub(72,28)],'euros','Le quedan'),
    problem(['Una hormiga recorre ',datum('12 metros',12),' por la mañana, ',datum('23 metros',23),' por la tarde y ',datum('18 metros',18),' por la noche.'],'¿Cuántos metros recorre en total?',[add([12,23,18])],'metros','Recorre'),
    problem(['En un teatro hay ',datum('89 entradas',89),'. Se venden ',datum('24 entradas',24),'.'],'¿Cuántas entradas quedan?',[sub(89,24)],'entradas','Quedan'),
    problem(['En un puesto venden ',datum('23 zumos de naranja',23),', ',datum('15 zumos de piña',15),' y ',datum('12 zumos de fresa',12),'.'],'¿Cuántos zumos venden en total?',[add([23,15,12])],'zumos','Venden'),
    problem(['En una caja hay ',datum('46 lápices',46),'. Sacamos ',datum('19 lápices',19),'. La caja es azul.'],'¿Cuántos lápices quedan?',[sub(46,19)],'lápices','Quedan'),
    problem(['María tiene ',{text:'8 años',value:8,needed:false},'. Guarda ',datum('35 cromos',35),' y su abuelo le regala ',datum('17 cromos',17),'.'],'¿Cuántos cromos tiene ahora?',[add([35,17])],'cromos','Tiene')
  ];
  const twoSteps=[
    problem(['Hay ',datum('12 manzanas rojas',12),', ',datum('15 verdes',15),' y ',datum('18 amarillas',18),'. Se venden ',datum('23 manzanas',23),'.'],'¿Cuántas manzanas quedan?',[add([12,15,18],'Primero suma todas las manzanas.'),sub(45,23,'Ahora resta las manzanas vendidas.')],'manzanas','Quedan'),
    problem(['En el autobús viajan ',datum('28 personas',28),'. Suben ',datum('16 personas',16),' y después bajan ',datum('9 personas',9),'.'],'¿Cuántas personas quedan en el autobús?',[add([28,16],'Primero añade las personas que suben.'),sub(44,9,'Después resta las personas que bajan.')],'personas','Quedan'),
    problem(['En la clase hay ',datum('24 cartulinas',24),'. Llegan ',datum('18 más',18),' y usamos ',datum('15 cartulinas',15),'.'],'¿Cuántas cartulinas quedan?',[add([24,18],'Primero calcula cuántas cartulinas hay.'),sub(42,15,'Ahora quita las que usamos.')],'cartulinas','Quedan'),
    problem(['En una hucha hay ',datum('35 euros',35),'. Añadimos ',datum('20 euros',20),' y gastamos ',datum('18 euros',18),'.'],'¿Cuánto dinero queda?',[add([35,20],'Primero añade el dinero nuevo.'),sub(55,18,'Después resta el dinero gastado.')],'euros','Quedan')
  ];
  const games=[
    {id:'restas',title:'El taller de las llevadas',icon:'🔧',skill:'Restas',desc:'Resta en columna y descubre cómo reagrupar.',rule:'Coloca unidades debajo de unidades. Si arriba no alcanza, cambia una decena por diez unidades.',questions:[[72,48],[90,27],[74,38],[81,46],[63,28],[95,57],[142,58],[324,167],[502,178],[400,156],[630,284],[705,369]].map(n=>column(n,'−'))},
    {id:'sumas',title:'La torre de las sumas',icon:'🏗️',skill:'Sumas',desc:'Dos o tres números, con sus llevadas.',rule:'Diez unidades forman una decena. Suma de derecha a izquierda y anota las llevadas arriba.',questions:[[23,18],[47,36],[45,39],[35,28,17],[42,15,28],[31,26,18],[38,13,17],[152,129],[250,162],[146,235,118]].map(n=>column(n,'+'))},
    {id:'parejas',title:'Cada operación con su pareja',icon:'🔗',skill:'Unir operaciones',desc:'Toca una operación y después su resultado.',rule:'Elige una operación de la izquierda y su resultado de la derecha. Puedes cambiar tus uniones antes de comprobar.',questions:[
      [[45,23,'+'],[64,38,'−'],[56,27,'+'],[93,47,'−']],
      [[25,37,'+'],[72,29,'−'],[58,34,'−'],[34,19,'+']],
      [[63,28,'−'],[48,27,'+'],[91,56,'−'],[37,26,'+']],
      [[125,36,'+'],[142,58,'−'],[73,29,'+'],[205,87,'−']]
    ].map((pairs,i)=>({type:'pairs',prompt:`Une las cuatro parejas del panel ${i+1}.`,pairs:pairs.map(([a,b,sign])=>({a,b,sign,answer:sign==='+'?a+b:a-b}))}))},
    {id:'descomponer',title:'Casitas de los números',icon:'🏠',skill:'Centenas, decenas y unidades',desc:'Construye y descompón números; también con millares.',rule:'U = unidades, D = decenas, C = centenas, UM = unidades de millar. Cada posición vale diez veces la anterior.',questions:[
      ...[246,308,603,840,907,6807].map(number=>({type:'place',mode:'split',number,prompt:`Descompón ${number.toLocaleString('es-ES')} en sus casitas.`,places:number>999?4:3})),
      ...[[3,2,5],[4,0,8],[1,0,15],[2,11,0]].map(values=>({type:'place',mode:'compose',values,prompt:`Construye el número: ${values[0]} centenas, ${values[1]} decenas y ${values[2]} unidades.`,answer:values[0]*100+values[1]*10+values[2]}))
    ]},
    {id:'cifras',title:'Detectives de cifras',icon:'🔎',skill:'Valor de cada cifra',desc:'Encuentra unidades, decenas, centenas y millares.',rule:'Cuenta desde la derecha: U, D, C, UM… La cifra indica cuántos grupos de ese tamaño hay en esa posición.',questions:[[682,2],[456,1],[3608,0],[3908,2],[4567,3],[75682,2],[354476,2],[46471,1],[87960,3],[126332,0]].map(([number,power])=>({type:'digit',number,power,prompt:`Toca la cifra de ${['las unidades','las decenas','las centenas','las unidades de millar'][power]}.`,answer:String(number).length-1-power}))},
    {id:'problemas',title:'Datos, operación y respuesta',icon:'🕵️',skill:'Problemas',desc:'Subraya los datos y escribe cómo lo has resuelto.',rule:'Primero localiza los datos que necesitas. Después escribe la operación y el resultado. Termina con una respuesta y su unidad.',questions:problems},
    {id:'dos-pasos',title:'Una misión en dos pasos',icon:'🗺️',skill:'Problemas de dos operaciones',desc:'Suma primero y resta después. Con guía.',rule:'Algunos problemas necesitan dos operaciones. El resultado del primer paso te ayuda a resolver el segundo.',questions:twoSteps},
    {id:'figuras',title:'El club de las figuras',icon:'🔺',skill:'Figuras geométricas',desc:'Reconoce figuras, lados y vértices.',rule:'Los polígonos tienen lados rectos. Cada esquina es un vértice. El círculo tiene un borde curvo.',questions:[
      choice('¿Cómo se llama esta figura?',['Triángulo','Rectángulo','Círculo'],'Triángulo',{shape:'triangle',explanation:'El triángulo tiene tres lados y tres vértices.'}),
      choice('¿Cómo se llama esta figura?',['Cuadrado','Rectángulo','Pentágono'],'Rectángulo',{shape:'rectangle',explanation:'Es un rectángulo: tiene cuatro ángulos rectos y los lados opuestos son iguales.'}),
      choice('¿Cómo se llama esta figura?',['Hexágono','Cuadrado','Círculo'],'Cuadrado',{shape:'square',explanation:'El cuadrado tiene cuatro lados iguales y cuatro ángulos rectos.'}),
      choice('¿Cómo se llama esta figura?',['Hexágono','Pentágono','Triángulo'],'Pentágono',{shape:'pentagon',explanation:'El pentágono tiene cinco lados.'}),
      choice('¿Cómo se llama esta figura?',['Hexágono','Pentágono','Rombo'],'Hexágono',{shape:'hexagon',explanation:'El hexágono tiene seis lados.'}),
      choice('¿Cómo se llama esta figura?',['Rombo','Círculo','Rectángulo'],'Rombo',{shape:'rhombus',explanation:'Este rombo tiene cuatro lados iguales y sus ángulos no son rectos.'}),
      choice('¿Qué figura NO es un polígono?',['Círculo','Triángulo','Cuadrado'],'Círculo',{shape:'circle',explanation:'El círculo tiene un borde curvo, no lados rectos.'}),
      choice('¿Cuántos vértices tiene este pentágono?',['4','5','6'],'5',{shape:'pentagon',explanation:'Tiene cinco vértices, uno en cada esquina.'}),
      choice('¿Cuántos lados tiene este hexágono?',['5','6','8'],'6',{shape:'hexagon',explanation:'El hexágono tiene seis lados.'}),
      choice('¿Cómo se llama esta figura?',['Trapecio','Triángulo','Círculo'],'Trapecio',{shape:'trapezoid',explanation:'Este trapecio es un cuadrilátero con dos lados paralelos.'})
    ]},
    {id:'perimetros',title:'La vuelta al jardín',icon:'📏',skill:'Perímetros',desc:'Suma todos los lados para recorrer el borde.',rule:'El perímetro es la longitud de todo el contorno. Suma TODOS los lados. El dibujo es orientativo: usa las medidas escritas.',questions:[
      ['rectangle',[7,12,7,12],'cm'],['square',[6,6,6,6],'cm'],['triangle',[14,9,14],'cm'],['house',[7,4,14,4,7],'m'],['rectangle',[9,4,9,4],'m'],['rhombus',[8,8,8,8],'cm'],['pentagon',[5,5,5,5,5],'cm'],['hexagon',[4,4,4,4,4,4],'cm'],['triangle',[10,12,10],'m'],['trapezoid',[6,5,12,5],'cm']
    ].map(([shape,sides,unit])=>({type:'perimeter',shape,sides,unit,answer:sides.reduce((a,b)=>a+b,0),prompt:'¿Cuánto mide todo el perímetro?'}))},
    {id:'areas',title:'Baldosas y multiplicaciones',icon:'🟪',skill:'Áreas',desc:'Multiplica filas por columnas y cuenta cuadrados.',rule:'El área mide la superficie. En un rectángulo, multiplica filas por columnas. Cada casilla representa un cuadrado unidad.',questions:[
      ...[[4,3],[5,4],[7,5],[9,3],[8,2],[6,4],[10,5],[3,7]].map(([cols,rows])=>({type:'area',cols,rows,prompt:'Cuenta las filas y columnas. Multiplica para hallar el área.',answer:cols*rows})),
      ...[['11100','10000','11100','10000','11100'],['11011','11011','11111','11011','11011']].map(mask=>({type:'area',mask,prompt:'Esta figura no llena un rectángulo. Cuenta solo las casillas coloreadas.',answer:mask.join('').split('').filter(c=>c==='1').length}))
    ]},
    {id:'relojes',title:'El reloj del mago',icon:'🕒',skill:'La hora',desc:'Lee el reloj y coloca sus dos agujas.',rule:'La aguja corta marca las horas. La larga marca los minutos: 12 → en punto, 3 → y cuarto, 6 → y media, 9 → menos cuarto.',questions:[
      ...[[5,30],[4,15],[6,0],[9,0],[8,45],[12,15]].map(([hour,minute])=>({type:'clock',mode:'read',hour,minute,prompt:'¿Qué hora marca este reloj?'})),
      ...[[8,30],[2,15],[5,45],[11,0],[12,45],[7,30]].map(([hour,minute])=>({type:'clock',mode:'set',hour,minute,prompt:'Coloca las agujas usando los controles.'}))
    ]},
    {id:'hora-cercana',title:'La hora más cercana',icon:'⏰',skill:'Aproximar la hora',desc:'¿A qué hora en punto se acerca más?',rule:'Antes de y media, la hora en punto más cercana es la anterior. Después de y media, es la siguiente.',questions:[[7,46],[5,20],[3,15],[9,40],[12,45],[8,10],[11,50],[2,5]].map(([hour,minute])=>({type:'round-hour',hour,minute,prompt:'Aproxima a la hora en punto más cercana.',answer:minute<30?hour:hour%12+1}))}
  ];
  return {games};
})();
