# Aprendemos jugando · Segundo y Tercero

Juegos de repaso de Primaria para practicar en familia.

- `index.html`: portada para elegir curso.
- `segundo/`: todos los juegos anteriores, sus imágenes, puntuaciones y selector de asignaturas. Incluye Lengua, Matemáticas, English, Science, Sociales y Mecanografía.
- `tercero/`: selector de Lengua, Matemáticas y Sociales. `tercero/lengua/` contiene diez juegos de Lengua (90 preguntas) y dos dictados con audio en castellano. `tercero/mates/` contiene doce juegos de Matemáticas. `tercero/sociales/` contiene dieciocho juegos (160 retos) y un taller creativo del tema 1: paisajes, continentes, océanos, relieve, mapas y conservación.

## Abrir la web

Se puede abrir `index.html` directamente en un navegador o servir esta carpeta como sitio estático. No necesita base de datos, instalación de dependencias ni compilación. Los resultados y borradores se guardan solo en el navegador y no se sincronizan entre dispositivos.

## GitHub Pages

Publicar la rama `main` desde la raíz (`/`) en Settings → Pages. `.nojekyll` permite servir directamente los archivos HTML, CSS, JavaScript, imágenes y audios.

- Portada: `https://egeagomez.github.io/colemartinezbernal/`
- Segundo: `https://egeagomez.github.io/colemartinezbernal/segundo/`
- Tercero: `https://egeagomez.github.io/colemartinezbernal/tercero/`

Las rutas son relativas y permiten alojar la web bajo el nombre del repositorio. Las fotografías originales del libro y del cuaderno de tercero no forman parte del sitio.

## Comprobar los archivos

```text
python tools/verificar-sitio.py
node tercero/lengua/tools/verificar.cjs
node tercero/mates/tools/verificar.cjs
node tercero/sociales/tools/verificar.cjs
node tools/verificar-sintaxis.cjs
```

El primer comando comprueba enlaces, recursos y mayúsculas de los nombres de archivo, que deben coincidir en GitHub Pages. El segundo comprueba el contenido de tercero y la correspondencia entre dictados y audios.

Las instrucciones de Docker siguen disponibles en `DEPLOY.md`; el `Dockerfile` publica la portada y ambos cursos.
