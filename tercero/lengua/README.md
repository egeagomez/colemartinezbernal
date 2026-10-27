# Lengua de tercero · Examen del 29 de octubre de 2026

Abre `index.html` en Edge, Chrome o Firefox. Los archivos de esta carpeta son independientes de los juegos de segundo. No hace falta instalar nada y los audios están incluidos. También puedes servir esta carpeta con un servidor de archivos estáticos.

## Contenido

Diez juegos con 90 preguntas: completar mb/mp, detectar la escritura correcta, separar en sílabas, dividir palabras al final de línea, relacionar familias, encontrar intrusos, completar frases, clasificar palabras simples y compuestas, construir palabras compuestas y repasar todo.

Dos dictados originales de cuatro frases. Usan una voz de castellano (Microsoft Helena), sintetizada más despacio. Cada fragmento contiene entre dos y cuatro palabras y se escucha dos veces, con 1,7 segundos entre repeticiones. El modo inicial es manual. Los modos automáticos dejan pausas de 12 o 18 segundos después de la segunda lectura. Los puntos se anuncian oralmente. Hay pausa, repetición, retroceso, reinicio y lectura del texto completo. Cambiar de página o esconderla detiene el audio.

Se recomienda escribir los dictados en el cuaderno para practicar la escritura a mano. Al final se puede ver el modelo y marcar el dictado como revisado. La opción de escribir en pantalla compara las palabras, conserva las tildes y la ñ y reconoce las omisiones sin desplazar toda la corrección. Las mayúsculas y la puntuación se revisan con el modelo; la cifra de palabras correctas no las puntúa. Las notas son orientativas.

Los juegos muestran una explicación tras comprobar cada respuesta, celebran cada cuatro retos y terminan en un podio. Se guardan el mejor resultado y los borradores en el almacenamiento del navegador, si está disponible. No hay cuentas ni envío de resultados. Las fotografías originales no se copian a esta web.

## Fuentes de contenido

Fotografías del libro y del cuaderno facilitadas por la familia: páginas 20–23 y ejercicios del cuaderno, especialmente la ficha de mb/mp. Esas fotografías no se publican en este repositorio. Se han creado ejercicios originales sobre los contenidos indicados en el mensaje de la reunión. No es un examen oficial del colegio.

## Mantenimiento

- `assets/content.js`: preguntas, respuestas, explicaciones y textos de dictados.
- `assets/app.js`: navegación, juegos, corrección y controles de audio.
- `assets/style.css`: presentación y adaptación a móvil.
- `assets/audio`: 24 archivos WAV, incluida una lectura completa de cada dictado.
- `tools/audio-manifest.json`: texto de cada audio. Debe actualizarse si cambia un dictado.
- `tools/generar-audios.ps1`: regenera los audios en Windows con una voz es-ES instalada. Ejecutar con Windows PowerShell 5.1. No cambia las voces ni la configuración del equipo.
- `node tools/verificar.cjs`: comprueba el contenido, la corrección de palabras y la correspondencia entre textos y audios.

La portada principal del repositorio permite elegir Segundo o Tercero. En Tercero se puede elegir Lengua o Matemáticas. Estos archivos se publican en GitHub Pages dentro de `tercero/lengua/`; los estilos comunes están en `tercero/assets/`.
