# Matemáticas · Tercero de Primaria

Doce juegos y 108 retos, creados a partir de los contenidos comunicados por la maestra y las once fichas facilitadas por la familia. Las imágenes del cuaderno no se publican.

1. Restas con llevadas, de dos y tres cifras, incluyendo ceros intermedios. Hay espacio opcional para anotar y una explicación de cada cambio de centena o decena.
2. Sumas en columna de dos o tres números.
3. Cuatro paneles de cuatro parejas entre operaciones y resultados. Cuando hay resultados repetidos, cualquiera de las dos casillas con el mismo valor es válida.
4. Construcción y descomposición de números en C, D y U; incluye un ejemplo con UM y reagrupamientos de más de diez unidades o decenas.
5. Identificación de la cifra de una posición en números de hasta seis cifras.
6. Ocho problemas guiados: datos que se subrayan al tocarlos, operación, resultado y respuesta con unidad. Uno contiene un dato que no se necesita.
7. Cuatro problemas con dos operaciones, mostrando el resultado del primer paso antes del segundo.
8. Figuras, lados, vértices y distinción entre polígonos y círculo.
9. Perímetros con todos los lados rotulados y la unidad indicada. Los dibujos son orientativos.
10. Áreas de rectángulos multiplicando filas por columnas; dos figuras irregulares para contar casillas.
11. Lectura y ajuste de relojes analógicos en punto, y cuarto, y media y menos cuarto. La aguja horaria avanza también con los minutos.
12. Aproximación a la hora en punto más cercana. Se evitan casos justo a y media para que no haya empate.

## Funcionamiento

Las actividades empiezan por lo más sencillo y no tienen cronómetro. Cada cuatro retos hay una pausa. Se muestra una explicación tras la corrección y un podio al terminar.

En los problemas hay que completar todos los pasos; una respuesta incorrecta muestra ayuda y permite rectificar. Se gana la estrella del problema si todos los pasos se resuelven sin errores. En las demás actividades se puntúa el primer intento. Las anotaciones de las llevadas no se comprueban. Las notas son orientativas y el mejor resultado se guarda solo en el navegador cuando es posible.

`assets/content.js` contiene los enunciados y datos; `assets/model.js`, las funciones de cálculo y los dibujos SVG; `assets/app.js`, los juegos. Se comparten estilos con las otras asignaturas de Tercero. No se necesitan servicios externos ni instalación de dependencias.

## Comprobar

Desde la raíz del repositorio:

```text
node tercero/mates/tools/verificar.cjs
python tools/verificar-sitio.py
node tools/verificar-sintaxis.cjs
```
