'use strict';
window.SocialesContent=(()=>{
  const choice=(prompt,answer,others,explanation,extra={})=>({type:'choice',prompt,answer,options:[answer,...others],explanation,...extra});
  const hot=(scene,prompt,answer,explanation)=>({type:'hotspot',scene,prompt,answer,explanation});
  const fill=(prompt,answer,others,explanation)=>({...choice(prompt,answer,others,explanation),type:'fill'});
  const sorting=(prompt,groups,items)=>({type:'sort',prompt,groups,items:items.map(([text,group])=>({text,group})),explanation:items.map(([t,g])=>`${t}: ${g}`).join(' · ')});
  const multi=(prompt,options,answer,explanation)=>({type:'multi',prompt,options,answer,explanation});
  const game=(id,title,icon,section,desc,pages,questions)=>({id,title,icon,section,desc,pages,questions});
  const games=[
    game('planeta','Los colores de la Tierra','🌍','La Tierra','Agua, rocas y vegetación: mira nuestro planeta.',[8,9],[
      choice('En las imágenes de la Tierra, ¿qué representa principalmente el azul?','El agua de océanos y mares',['Las montañas','Las ciudades'],'El azul corresponde sobre todo al agua de los océanos y mares.'),
      choice('¿Con qué se relaciona el verde de los paisajes naturales?','Con la vegetación',['Con las carreteras','Con las rocas sin plantas'],'La vegetación está formada por las plantas naturales que crecen en el terreno.'),
      choice('¿Qué representa el marrón en la explicación del libro?','Las rocas de continentes e islas',['El agua de los mares','Las nubes'],'El marrón se relaciona con las rocas de las tierras emergidas.'),
      choice('¿Qué permite ver un mapamundi?','Los continentes y océanos a la vez',['Solo nuestra calle','Solo las montañas de un pueblo'],'Un mapamundi representa toda la superficie terrestre.'),
      choice('¿Qué es un continente?','Una gran extensión de tierra',['Un río muy largo','Un conjunto de barcos'],'Los continentes son grandes extensiones de tierra.'),
      choice('¿Cómo es el agua de los océanos?','Salada',['Dulce','Siempre congelada'],'Los océanos son enormes superficies de agua salada.'),
      choice('¿Cuántos continentes aparecen en el modelo de este tema?','Seis',['Cinco','Siete'],'El libro agrupa América como un solo continente y trabaja seis continentes.'),
      choice('¿Cuántos océanos estudia este tema?','Cinco',['Tres','Seis'],'Pacífico, Atlántico, Índico, Glacial Ártico y Glacial Antártico son los cinco océanos del tema.')
    ]),
    game('continentes','Un viaje por los continentes','🗺️','La Tierra','Encuentra los seis continentes en un mapa.',[8],[
      hot('world-land','Señala Europa, el continente donde vivimos.','europa','Europa está al norte de África y al oeste de Asia.'),
      hot('world-land','Señala África.','africa','África está al sur de Europa.'),
      hot('world-land','Señala América.','america','En este tema América se estudia como un solo continente, al oeste del Atlántico.'),
      hot('world-land','Señala Asia.','asia','Asia ocupa la gran región situada al este de Europa.'),
      hot('world-land','Señala Oceanía.','oceania','Oceanía se representa aquí en la parte inferior derecha del mapamundi.'),
      hot('world-land','Señala la Antártida.','antartida','La Antártida se encuentra alrededor del polo sur.'),
      choice('¿En qué continente está España?','Europa',['Asia','Oceanía'],'España está en Europa.'),
      choice('¿Cuál de estos nombres es un continente?','África',['Atlántico','Índico'],'África es un continente; Atlántico e Índico son océanos.')
    ]),
    game('oceanos','Los cinco grandes azules','🌊','La Tierra','Busca los océanos y distingue tierra de agua.',[8],[
      hot('world-water','Señala el océano Atlántico.','atlantico','El Atlántico queda entre América y Europa y África.'),
      hot('world-water','Señala el océano Pacífico. Aparece en los dos extremos del mapa.','pacifico','El Pacífico aparece a izquierda y derecha porque el mapamundi representa una superficie redonda en plano. Las dos zonas son válidas.'),
      hot('world-water','Señala el océano Índico.','indico','El Índico está entre África, Asia y Oceanía.'),
      hot('world-water','Señala el océano Glacial Ártico.','artico','El Glacial Ártico está en el norte, alrededor del polo norte.'),
      hot('world-water','Señala el océano Glacial Antártico.','antartico','El Glacial Antártico rodea la Antártida, en el sur.'),
      choice('¿Cuál es un océano y no un continente?','Pacífico',['Oceanía','Antártida'],'Pacífico es un océano. Oceanía y Antártida son continentes.'),
      choice('¿Qué océano separa América de Europa y África?','Atlántico',['Índico','Glacial Ártico'],'Entre América y Europa y África está el Atlántico.'),
      choice('¿Cuál de estos océanos está en el extremo norte?','Glacial Ártico',['Glacial Antártico','Índico'],'Ártico se refiere al extremo norte; Antártico, al extremo sur.')
    ]),
    game('natural-humano','¿Naturaleza o construcción?','🌳','Los paisajes','Lleva cada ficha a su caja. Puedes tocar o arrastrar.',[9,11,12,17,20],[
      sorting('Clasifica las cuatro fichas.',['Natural','Construido por personas'],[['Río','Natural'],['Puente','Construido por personas'],['Montaña','Natural'],['Carretera','Construido por personas']]),
      sorting('¿Qué procede de la naturaleza y qué hemos construido?',['Natural','Construido por personas'],[['Bosque natural','Natural'],['Hotel','Construido por personas'],['Acantilado','Natural'],['Puerto','Construido por personas']]),
      sorting('Clasifica estos elementos del paisaje.',['Natural','Construido por personas'],[['Lago','Natural'],['Túnel','Construido por personas'],['Playa natural','Natural'],['Ciudad','Construido por personas']])
    ]),
    game('elementos','Las tres piezas del paisaje','🔎','Los paisajes','Relieve, vegetación o aguas: busca su familia.',[9,20],[
      sorting('Clasifica los elementos naturales.',['Relieve','Vegetación','Aguas'],[['Montaña','Relieve'],['Pinos silvestres','Vegetación'],['Río','Aguas'],['Llanura','Relieve']]),
      sorting('¿A qué grupo pertenece cada ficha?',['Relieve','Vegetación','Aguas'],[['Arroyo','Aguas'],['Arbustos naturales','Vegetación'],['Valle','Relieve'],['Lago','Aguas']]),
      sorting('Completa las tres cajas del paisaje.',['Relieve','Vegetación','Aguas'],[['Sierra','Relieve'],['Mar','Aguas'],['Hierbas silvestres','Vegetación'],['Meseta','Relieve']])
    ]),
    game('montanas','Exploradores de las montañas','⛰️','El relieve','Descubre montañas, sierras, cordilleras y valles.',[10,11],[
      choice('¿Cómo es una montaña?','Un terreno elevado y en cuesta',['Un terreno siempre plano','Una entrada del mar'],'Una montaña es una elevación del terreno con pendientes.'),
      choice('¿Qué forman varias montañas juntas?','Una sierra',['Una bahía','Una isla'],'Una sierra es una agrupación de montañas.'),
      choice('¿Qué forman varias sierras unidas?','Una cordillera',['Una playa','Un puerto'],'Varias sierras forman una cordillera.'),
      choice('¿Dónde se encuentra un valle?','Entre montañas',['Siempre en una isla','Encima de todas las cimas'],'Los valles son terrenos más bajos que se abren entre montañas.'),
      choice('¿Qué suele recorrer el fondo de muchos valles?','Un río',['Un océano entero','Una cordillera'],'Muchos valles están recorridos por ríos.'),
      choice('¿Qué parte de la montaña está más alta?','La cima',['El pie','La ladera entera'],'La cima es la parte más alta de la montaña.'),
      choice('¿Cómo se llama la parte inclinada de una montaña?','Ladera',['Istmo','Golfo'],'La ladera es la pendiente que baja desde la cima.'),
      choice('¿Qué parte está más abajo?','El pie',['La cima','La cumbre'],'El pie es la base o parte más baja de la montaña.'),
      choice('¿Para qué se construye un túnel en una montaña?','Para atravesarla',['Para rodear una isla','Para formar un océano'],'Un túnel permite atravesar una montaña.'),
      choice('En el paisaje de montaña del tema, ¿qué actividad atrae visitantes?','El turismo de naturaleza y los deportes de montaña',['La pesca en alta mar','La construcción de grandes playas'],'Las personas visitan las montañas para disfrutar de la naturaleza y practicar deportes.')
    ]),
    game('partes-montana','Señala la montaña','🏔️','El relieve','Busca las partes en un dibujo interactivo.',[10,11],[
      hot('mountain','Toca la cima de la montaña de la izquierda.','cima','La cima está en lo más alto de la montaña.'),
      hot('mountain','Toca la ladera de la montaña de la izquierda.','ladera','La ladera es la parte inclinada.'),
      hot('mountain','Toca el pie de la montaña de la izquierda.','pie','El pie es su base.'),
      hot('mountain','Señala el valle entre las montañas.','valle','El valle está en la parte baja situada entre montañas.'),
      hot('mountain','Señala el grupo de montañas del fondo: la sierra.','sierra','Varias montañas agrupadas forman una sierra.'),
      choice('Ordena de menor agrupación a mayor agrupación.','Montaña → sierra → cordillera',['Cordillera → montaña → sierra','Sierra → cordillera → montaña'],'Una sierra agrupa montañas; una cordillera agrupa varias sierras.')
    ]),
    game('llanuras','El secreto de los terrenos planos','🌾','El relieve','Distingue llanuras, mesetas, depresiones y cerros.',[12,13],[
      choice('¿Qué caracteriza una llanura?','Una gran extensión de terreno plano',['Una pendiente muy fuerte','Un terreno rodeado de mar'],'Las llanuras son grandes extensiones de terreno plano.'),
      choice('¿Cómo es una meseta?','Llano situado a bastante altura',['Una cima puntiaguda','Una pequeña entrada del mar'],'Una meseta tiene una superficie llana, pero está elevada.'),
      choice('¿Qué es una depresión del terreno?','Una zona baja rodeada de terrenos más altos',['Un grupo de islas','Una montaña con nieve'],'Una depresión es una zona hundida respecto a los terrenos que la rodean.'),
      choice('Según este tema, ¿cómo es un cerro?','Una elevación de poca altura con cima plana',['Una montaña enorme y puntiaguda','Una costa con acantilados'],'En este tema se presenta el cerro como una elevación baja de cima plana.'),
      choice('¿Qué tienen en común una meseta y una depresión?','Son formas de terreno llano',['Están siempre cubiertas de nieve','Son océanos'],'El libro estudia mesetas y depresiones como formas de los paisajes de llanura.'),
      choice('Una zona llana se encuentra por encima del terreno cercano. Es una…','Meseta',['Bahía','Península'],'La meseta es llana y está situada en altura.'),
      choice('Un terreno plano está hundido entre terrenos más altos. Es una…','Depresión',['Sierra','Isla'],'La depresión ocupa una posición más baja.'),
      choice('¿Por qué es más fácil construir en una llanura?','Porque el terreno es plano',['Porque no existe ningún río','Porque todas las llanuras están vacías'],'La ausencia de grandes pendientes facilita muchas construcciones.'),
      choice('¿Cómo suelen ser las carreteras de llanura frente a las de montaña?','Más rectas',['Siempre llenas de curvas','Siempre subterráneas'],'En las llanuras las carreteras y vías pueden seguir recorridos más rectos.'),
      choice('¿Qué actividad es habitual en los pueblos de llanura del tema?','La agricultura',['La pesca en alta mar','El esquí en cimas nevadas'],'Los cultivos crecen bien en terrenos llanos, especialmente cerca de los ríos.')
    ]),
    game('tipos-costa','¿Costa alta o costa baja?','🏖️','La costa','Observa y compara playas y acantilados.',[14,15,21],[
      choice('Observa el dibujo. ¿Qué tipo de costa aparece?','Costa alta',['Costa baja','Llanura interior'],'Los acantilados son propios de la costa alta.',{scene:'cliff'}),
      choice('Observa el dibujo. ¿Qué tipo de costa aparece?','Costa baja',['Costa alta','Sierra'],'Las playas de arena o cantos son propias de la costa baja.',{scene:'beach'}),
      choice('¿Qué es la costa?','La tierra en contacto con el mar',['Cualquier terreno lejano al mar','Una montaña del interior'],'La costa es la zona de contacto entre la tierra y el mar.'),
      choice('¿Dónde esperarías ver una pared rocosa que cae al mar?','En una costa alta',['En el centro de una meseta','En una playa llana de arena'],'Una pared rocosa que cae al mar es un acantilado.'),
      choice('Una playa de cantos puede formar parte de una…','Costa baja',['Cordillera','Depresión del interior'],'La costa baja puede tener playas de arena o de cantos.'),
      choice('¿Qué elemento del dibujo es natural?','El acantilado',['El hotel','La carretera'],'El acantilado es una forma natural del relieve costero.',{scene:'cliff'}),
      choice('¿Cuál es un elemento construido por personas en la costa?','Un puerto deportivo',['Una isla natural','Un cabo'],'Los puertos son construcciones humanas.'),
      choice('¿En qué se diferencian estos dos tipos de costa?','En la forma del relieve junto al mar',['En que una no tiene mar','En que todas las playas tienen nieve'],'La costa alta tiene acantilados; la baja suele presentar playas.')
    ]),
    game('mapa-costa','La costa de las ocho pistas','🏝️','La costa','Señala islas, cabos, golfos y otras formas.',[14,15],[
      hot('coast','Señala el archipiélago.','archipielago','Un archipiélago es un grupo de islas próximas.'),
      hot('coast','Señala el cabo: el gran saliente de tierra.','cabo','Un cabo es una porción de tierra que se adentra en el mar.'),
      hot('coast','Señala el golfo: la entrada grande del mar.','golfo','Un golfo es una gran entrada del mar en la tierra.'),
      hot('coast','Señala la isla que está sola.','isla','Una isla está rodeada de agua por todas partes.'),
      hot('coast','Señala la península.','peninsula','Una península está casi rodeada de agua, pero sigue unida a otra tierra.'),
      hot('coast','Señala el istmo de la península.','istmo','El istmo es la franja estrecha de tierra que une la península al continente.'),
      hot('coast','Señala la bahía: la entrada pequeña del mar.','bahia','En este tema, una bahía es una entrada del mar menor que un golfo.'),
      hot('coast','Señala la punta: el saliente pequeño de tierra.','punta','Una punta es un saliente de tierra más pequeño que un cabo.')
    ]),
    game('palabras-costa','El diccionario de la costa','📖','La costa','Completa las frases eligiendo la palabra.',[14,15],[
      fill('Una tierra rodeada de agua por todas partes es una ___.','isla',['península','sierra'],'Una isla está completamente rodeada de agua.'),
      fill('Varias islas cercanas forman un ___.','archipiélago',['golfo','cerro'],'Archipiélago es el nombre del conjunto de islas.'),
      fill('La franja de tierra que une una península al continente es el ___.','istmo',['valle','acantilado'],'El istmo mantiene unida la península a otra tierra.'),
      fill('Una entrada grande del mar en la tierra es un ___.','golfo',['cabo','cerro'],'En un golfo es el mar el que entra en la tierra.'),
      fill('Una entrada menor del mar se llama ___.','bahía',['sierra','punta'],'En este tema se compara la bahía con una entrada más pequeña que el golfo.'),
      fill('Un saliente grande de tierra hacia el mar es un ___.','cabo',['golfo','lago'],'En el cabo es la tierra la que entra en el mar.'),
      fill('Un saliente de tierra más pequeño que un cabo es una ___.','punta',['bahía','depresión'],'La punta también se adentra en el mar, pero es menor que un cabo.'),
      fill('Un terreno rodeado de agua salvo por la unión con otra tierra es una ___.','península',['isla','cordillera'],'La península se une a otra tierra mediante un istmo.'),
      fill('En una costa alta son frecuentes los ___.','acantilados',['campos de trigo','valles interiores'],'Los acantilados son paredes rocosas junto al mar.'),
      fill('La zona de contacto entre la tierra y el mar se llama ___.','costa',['meseta','continente'],'La costa está en contacto con el mar.')
    ]),
    game('vida','¿Cómo vivimos en cada paisaje?','🏘️','Las personas','Relaciona paisajes, transportes y trabajos.',[10,11,13,15],[
      choice('Un pueblo tiene carreteras estrechas y con muchas curvas. ¿Qué paisaje del tema encaja mejor?','Montaña',['Llanura muy plana','Mar abierto'],'Las pendientes de montaña suelen exigir curvas para salvar el desnivel.'),
      choice('¿Dónde resulta más sencillo construir pistas de aeropuerto?','En zonas llanas',['En laderas muy inclinadas','En cimas estrechas'],'Las pistas de aeropuerto necesitan superficies llanas.'),
      choice('Un lugar recibe turistas para esquiar en invierno. ¿Qué paisaje encaja?','Montaña',['Playa baja','Océano abierto'],'Los deportes de nieve atraen turistas a algunas montañas.'),
      choice('¿Qué trabajo se relaciona directamente con los cultivos?','La agricultura',['La recepción de un hotel','La conducción de un barco de pesca'],'La agricultura consiste en cultivar la tierra.'),
      choice('¿Qué servicio puede atender a turistas en un hotel costero?','La recepción',['La formación de una sierra','La creación de un océano'],'La recepción es un servicio de atención a visitantes.'),
      choice('¿Qué construcción permite atravesar una montaña?','Un túnel',['Una playa','Un archipiélago'],'El túnel es una infraestructura que atraviesa una montaña.'),
      choice('¿Qué actividad tradicional aparece asociada a la costa en el tema?','La pesca',['El esquí de montaña','La minería de una cima nevada'],'La pesca ha sido una actividad importante en muchas costas.'),
      choice('¿Para qué sirve un puerto?','Para la llegada y salida de embarcaciones',['Para cultivar cereales','Para formar montañas'],'Un puerto es una infraestructura relacionada con la navegación.'),
      choice('Según el tema, ¿dónde trabaja mucha gente de las ciudades?','En oficinas, comercios, fábricas y servicios',['Únicamente en campos de cultivo','Siempre en barcos de pesca'],'Las ciudades concentran actividades industriales y de servicios.'),
      choice('¿Qué elemento indica que las personas han transformado un paisaje?','Una carretera',['Una montaña natural','Un río sin modificar'],'La carretera es una construcción humana.'),
      choice('¿Qué trabajo ayuda a visitantes a conocer un lugar?','Guía turístico',['Formar un acantilado','Ser un continente'],'Un guía turístico acompaña e informa a los visitantes.'),
      choice('¿Por qué podemos encontrar hoteles y centros de ocio en zonas turísticas de costa?','Para atender a las personas que las visitan',['Para convertir el mar en montaña','Para que desaparezcan las playas'],'El turismo necesita alojamientos, transportes y otros servicios.')
    ]),
    game('mapas','La brújula y la leyenda','🧭','Leer mapas','Usa símbolos, colores y puntos cardinales.',[16],[
      hot('route','Con el norte arriba, señala lo que está al norte del pueblo.','bosque','El bosque está encima del pueblo, hacia el norte.'),
      hot('route','Señala lo que está al este del pueblo.','lago','El lago está a la derecha del pueblo, hacia el este.'),
      hot('route','Señala lo que está al sur del pueblo.','cultivos','Los cultivos están debajo del pueblo, hacia el sur.'),
      hot('route','Señala lo que está al oeste del pueblo.','montanas','Las montañas están a la izquierda, hacia el oeste.'),
      choice('¿Qué explica una leyenda del mapa?','El significado de símbolos y colores',['El precio de los libros','Solo el nombre del dibujante'],'La leyenda permite interpretar los signos y colores de un mapa.'),
      choice('En la leyenda de este juego, ¿qué indica el verde?','Terreno de poca altura',['Terreno de mucha altura','Una ciudad construida'],'En nuestra leyenda de relieve el verde corresponde a poca altura.',{scene:'legend'}),
      choice('En esta leyenda, ¿qué indica el amarillo?','Altura media',['La zona más alta','Un océano'],'El amarillo indica altura media en esta leyenda.',{scene:'legend'}),
      choice('En esta leyenda, ¿qué indica el marrón?','Mucha altura',['Poca altura','Una playa de arena'],'El marrón identifica mucha altura en esta leyenda.',{scene:'legend'}),
      choice('¿Para qué sirve la rosa de los vientos?','Para indicar los puntos cardinales',['Para dibujar todas las plantas','Para calcular un perímetro'],'La rosa de los vientos orienta el mapa.'),
      choice('Si el norte está arriba, ¿dónde queda el oeste?','A la izquierda',['A la derecha','Abajo'],'Con el norte arriba, este queda a la derecha y oeste a la izquierda.'),
      choice('¿Qué nos dicen los textos junto a los lugares del mapa?','Sus nombres y otra información',['Que todos son islas','Que no existen colores'],'Los textos identifican los lugares representados.'),
      choice('Un mapa de relieve utiliza un color para una gran zona llana. ¿Qué debes mirar para conocer su altura?','La leyenda',['El tamaño del título','El color de la mesa'],'La leyenda explica la altura que representa ese color.')
    ]),
    game('espana','Un paseo por el relieve de España','📍','Leer mapas','Busca las formas del relieve que aparecen en el libro.',[16],[
      hot('spain','Localiza los Pirineos, en el noreste del esquema.','pirineos','Los Pirineos se sitúan en el noreste de la península, junto a Francia.'),
      hot('spain','Localiza la Cordillera Cantábrica, al norte.','cantabrica','La Cordillera Cantábrica está en el norte de la península.'),
      hot('spain','Localiza el Sistema Central, en la zona central.','central','El Sistema Central atraviesa la zona central de la Meseta.'),
      hot('spain','Localiza el Sistema Ibérico, hacia el este.','iberico','El Sistema Ibérico se encuentra en la parte oriental del interior peninsular.'),
      hot('spain','Localiza los Sistemas Béticos, al sur.','beticos','Los Sistemas Béticos ocupan parte del sur de la península.'),
      hot('spain','Localiza la Meseta Central, en el interior.','meseta','La Meseta Central es una gran zona llana elevada del interior.'),
      hot('spain','Localiza la depresión del Ebro, al noreste interior.','ebro','La depresión del Ebro aparece entre los Pirineos y el Sistema Ibérico.'),
      hot('spain','Localiza la depresión del Guadalquivir, al suroeste.','guadalquivir','La depresión del Guadalquivir se sitúa en el suroeste peninsular.'),
      choice('¿En qué archipiélago aparece el Teide en el mapa del tema?','Islas Canarias',['Islas Baleares','Antártida'],'El Teide está en las islas Canarias.'),
      choice('¿Qué nombre corresponde a un terreno llano elevado del interior de España?','Meseta Central',['Océano Atlántico','Mar Cantábrico'],'La Meseta Central es un relieve llano y elevado.')
    ]),
    game('protege','Guardianes del paisaje','🦅','Cuidar la naturaleza','Elige todas las acciones que ayudan a conservarlo.',[9,18,19],[
      multi('Selecciona las DOS acciones que cuidan un sendero.',['Seguir el camino señalizado','Llevarse los residuos','Arrancar plantas','Dejar envoltorios'],['Seguir el camino señalizado','Llevarse los residuos'],'Caminar por el sendero y retirar nuestros residuos ayuda a proteger el entorno.'),
      multi('Selecciona las DOS formas de respetar a los animales.',['Observarlos desde lejos','Evitar gritos junto a ellos','Perseguirlos para una foto','Tocar sus nidos'],['Observarlos desde lejos','Evitar gritos junto a ellos'],'Debemos observar sin perseguir ni molestar a los animales.'),
      multi('Selecciona las DOS formas de cuidar las plantas silvestres.',['Observarlas sin arrancarlas','Respetar las zonas señalizadas','Cortar todas las flores','Pisar los brotes'],['Observarlas sin arrancarlas','Respetar las zonas señalizadas'],'Las plantas se disfrutan sin arrancarlas ni pisotearlas.'),
      multi('Selecciona las DOS acciones adecuadas al terminar un pícnic.',['Recoger los envases','Comprobar que no dejamos basura','Enterrar los plásticos','Tirar restos al río'],['Recoger los envases','Comprobar que no dejamos basura'],'Al terminar debemos recoger los residuos y dejar limpio el lugar.'),
      multi('Selecciona los DOS trabajos propios de un agente medioambiental del tema.',['Observar plantas y animales','Informar a visitantes','Convertir el parque en un hotel','Quitar todos los árboles'],['Observar plantas y animales','Informar a visitantes'],'La agente cuida el espacio natural y atiende a quienes lo visitan.'),
      multi('Selecciona las DOS cosas que debes hacer si ves un animal herido.',['Avisar al personal del parque o a un adulto','Mantener la distancia','Llevártelo a casa','Intentar curarlo sin ayuda'],['Avisar al personal del parque o a un adulto','Mantener la distancia'],'Es mejor avisar y mantener la distancia para que intervengan personas preparadas.'),
      multi('Selecciona las DOS conductas que respetan un espacio protegido.',['Leer y respetar sus indicaciones','Usar las zonas autorizadas','Salir del camino hacia un nido','Ignorar todas las señales'],['Leer y respetar sus indicaciones','Usar las zonas autorizadas'],'Las indicaciones y las zonas autorizadas ayudan a cuidar el espacio.'),
      multi('Selecciona los DOS elementos naturales que se conservan al proteger un paisaje.',['Su vegetación silvestre','Sus animales en libertad','Una bolsa abandonada','Una pintada en una roca'],['Su vegetación silvestre','Sus animales en libertad'],'Proteger un paisaje ayuda a conservar sus elementos naturales.'),
      multi('Selecciona las DOS maneras respetuosas de llevarte un recuerdo.',['Hacer un dibujo','Tomar una foto sin molestar','Arrancar una planta','Grabar tu nombre en una roca'],['Hacer un dibujo','Tomar una foto sin molestar'],'Un dibujo o una fotografía permiten recordar el lugar sin dañarlo.'),
      multi('Selecciona las DOS buenas ideas para una excursión.',['Preparar una bolsa para los residuos','Consultar las indicaciones del lugar','Dejar botellas por el camino','Acercarse a los nidos'],['Preparar una bolsa para los residuos','Consultar las indicaciones del lugar'],'Preparar la visita ayuda a disfrutar del paisaje y conservarlo.')
    ]),
    game('detectives','Detectives de frases despistadas','🕵️','Repaso','Decide si es verdad y aprende a corregir las falsas.',[8,9,10,12,14,16,18],[
      ...[
        ['Una isla está rodeada de agua por todas partes.',true,'La isla está completamente rodeada de agua.'],
        ['Un golfo es tierra que entra en el mar.',false,'Es al revés: el golfo es una entrada del MAR en la tierra. El cabo es tierra que entra en el mar.'],
        ['Una meseta es un terreno llano situado a bastante altura.',true,'Una meseta es llana y elevada.'],
        ['Una sierra está formada por varias montañas.',true,'Las montañas se agrupan en sierras.'],
        ['El pie es la parte más alta de una montaña.',false,'El pie está abajo; la cima está arriba.'],
        ['Un puente es un elemento natural.',false,'El puente está construido por personas.'],
        ['La leyenda ayuda a entender símbolos y colores de un mapa.',true,'La leyenda explica el significado de esos símbolos y colores.'],
        ['Las depresiones están más altas que todos los terrenos que las rodean.',false,'Las depresiones están más bajas que los terrenos que las rodean.'],
        ['Una península está unida a otra tierra por un istmo.',true,'Esa franja de unión se llama istmo.'],
        ['La costa alta suele presentar acantilados.',true,'Los acantilados caracterizan la costa alta.'],
        ['Todos los parques naturales se cuidan solos y no necesitan protección.',false,'Los espacios naturales se conservan con protección y conductas respetuosas.'],
        ['El río forma parte de las aguas de un paisaje.',true,'Los ríos, mares, lagos y arroyos forman parte de sus aguas.']
      ].map(([sentence,truth,explanation])=>choice(sentence,truth?'Verdadero':'Falso',[truth?'Falso':'Verdadero'],explanation))
    ]),
    game('parejas','Palabras que se dan la mano','🔗','Repaso','Une cada palabra con su explicación.',[8,10,12,14,16],[
      [['Continente','Gran extensión de tierra'],['Océano','Enorme superficie de agua salada'],['Vegetación','Plantas naturales del terreno'],['Relieve','Formas que tiene el terreno']],
      [['Cima','Parte más alta de una montaña'],['Ladera','Pendiente de una montaña'],['Sierra','Grupo de montañas'],['Valle','Terreno bajo entre montañas']],
      [['Meseta','Terreno llano elevado'],['Depresión','Terreno más bajo que los que lo rodean'],['Isla','Tierra rodeada totalmente de agua'],['Istmo','Franja de unión de una península']],
      [['Cabo','Saliente de tierra hacia el mar'],['Golfo','Gran entrada del mar en la tierra'],['Archipiélago','Conjunto de islas cercanas'],['Leyenda','Explicación de símbolos y colores del mapa']]
    ].map(pairs=>({type:'pairs',prompt:'Une cada palabra con su significado.',pairs:pairs.map(([left,right])=>({left,right})),explanation:pairs.map(([l,r])=>`${l}: ${r}`).join(' · ')})))
  ];
  const reviewSources=[['planeta',3],['continentes',6],['oceanos',0],['natural-humano',0],['elementos',1],['montanas',2],['partes-montana',1],['llanuras',2],['tipos-costa',1],['mapa-costa',5],['palabras-costa',3],['vida',1],['mapas',0],['espana',4],['protege',1],['detectives',1],['llanuras',1],['palabras-costa',5]];
  const review=reviewSources.map(([id,i])=>({...games.find(g=>g.id===id).questions[i],originGame:id}));
  games.push(game('gran-repaso','La gran expedición final','🏆','Repaso','Una ruta completa por todos los contenidos del tema.',[8,9,10,11,12,13,14,15,16,18,19,20,21],review));
  games.forEach(g=>g.questions.forEach((q,i)=>{q.id=`${g.id}-${i+1}`;q.pages=g.pages;}));
  const sections=['La Tierra','Los paisajes','El relieve','La costa','Las personas','Leer mapas','Cuidar la naturaleza','Repaso'];
  return {games,sections};
})();
