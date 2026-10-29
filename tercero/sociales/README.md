# Sociales de Tercero · Tema 1: Descubrimos los paisajes

18 juegos, 160 retos y un taller creativo, basados en las fotografías de las páginas 6–21 facilitadas por la familia. Las preguntas, dibujos y mapas esquemáticos son propios; las fotografías del libro no se copian ni se publican.

## Contenidos y formatos

- Tierra: agua, rocas y vegetación; seis continentes y cinco océanos, con el modelo del libro que agrupa América en un solo continente.
- Clasificación entre elementos naturales y construidos, y entre relieve, vegetación y aguas. Se puede tocar una ficha y su caja o arrastrar con el ratón.
- Montaña, sierra, cordillera, valle, cima, ladera y pie; montañas señalables en un dibujo.
- Llanuras, mesetas, depresiones y cerros, usando la caracterización del cerro del libro.
- Costa alta y baja; mapa con ocho formas costeras y frases para completar.
- Vida, trabajos, transportes y transformaciones de los paisajes.
- Orientación cardinal, leyendas, símbolos y lectura de un esquema del relieve peninsular.
- Conservación: selección de varias acciones correctas y respeto de los espacios naturales.
- Verdadero/falso con explicación de las frases falsas, parejas de términos y definiciones y una expedición final de repaso.
- Taller de paisaje con fondo de montaña, llanura o costa, elementos naturales y humanos y descripción escrita. Se guarda en el navegador y no recibe una calificación automática.

Los mapas son esquemas de orientación y no reproducen tamaños o distancias reales. Las dos zonas que representan el Pacífico en los extremos del mapamundi se aceptan como respuesta correcta.

## Puntuación y progreso

No hay cronómetro ni vidas limitadas. Cada cuatro retos hay una pausa. Se puntúa el primer intento, con una explicación al corregir. Cada clasificación o panel completo de parejas cuenta como un reto; el número de fichas o uniones dentro del panel es mayor. El mejor resultado, los retos pendientes y el taller se guardan solo en este navegador, cuando el almacenamiento está permitido.

El repaso de errores recupera los retos pendientes en tandas de hasta doce y los retira cuando se responden correctamente. No suma un juego adicional al contador de los dieciocho juegos. El repaso final mezcla actividades de todos los bloques.

## Archivos

- `assets/content.js`: contenidos y relación con páginas del tema.
- `assets/scenes.js`: dibujos y posiciones de las zonas señalables.
- `assets/model.js`: comprobación de respuestas, clasificaciones y parejas.
- `assets/app.js`: navegación, juegos, repaso y taller.
- `assets/sociales.css`: estilos propios; la base se comparte con Tercero.

Comprobaciones desde la raíz del repositorio:

```text
node tercero/sociales/tools/verificar.cjs
python tools/verificar-sitio.py
node tools/verificar-sintaxis.cjs
```
