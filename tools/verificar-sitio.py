"""Verifica rutas locales con distinción de mayúsculas, como GitHub Pages."""
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
errors = []
checked = set()

def check(source, url):
    url = url.strip()
    if not url or '${' in url or '{{' in url or url.startswith(('#', 'data:', 'javascript:', 'mailto:', 'tel:')):
        return
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc:
        return
    key = (source, url)
    if key in checked:
        return
    checked.add(key)
    if url.startswith('/'):
        errors.append(f'{source.relative_to(ROOT)}: ruta absoluta incompatible con un subdirectorio: {url}')
        return
    target = (source.parent / unquote(parsed.path)).resolve()
    try:
        relative = target.relative_to(ROOT)
    except ValueError:
        errors.append(f'{source.relative_to(ROOT)}: ruta fuera del sitio: {url}')
        return
    current = ROOT
    for part in relative.parts:
        names = {p.name for p in current.iterdir()} if current.is_dir() else set()
        if part not in names:
            similar = next((name for name in names if name.lower() == part.lower()), None)
            errors.append(f'{source.relative_to(ROOT)}: {url} → ' + (f'mayúsculas incorrectas; existe {similar}' if similar else 'no existe'))
            return
        current /= part
    if current.is_dir() and not (current / 'index.html').is_file():
        errors.append(f'{source.relative_to(ROOT)}: falta index.html en {url}')

for folder in [ROOT, ROOT / 'segundo', ROOT / 'tercero']:
    files = folder.glob('*') if folder == ROOT else folder.rglob('*')
    for source in files:
        if source.suffix not in ('.html', '.css', '.js') or not source.is_file():
            continue
        text = source.read_text(encoding='utf-8-sig')
        for match in re.finditer(r'(?:src|href)\s*=\s*[\"\x27]([^\"\x27]+)[\"\x27]|url\(\s*[\"\x27]?([^\"\x27)]+)', text):
            check(source, match[1] or match[2])
        for match in re.finditer(r'[\"\x27]((?:\.\./|\./|assets/)[^\"\x27\n]+\.(?:jpg|jpeg|png|svg|wav|css|js|html))[\"\x27]', text):
            check(source, match[1])

expected = {'juego': 19, 'mat': 37, 'eng': 17, 'sci': 15, 'soc': 17}
for prefix, maximum in expected.items():
    for i in range(1, maximum + 1):
        game = ROOT / 'segundo' / f'{prefix}{i}' / 'index.html'
        if not game.is_file():
            errors.append(f'Falta el juego {prefix}{i} de Segundo')
if not (ROOT / 'segundo/mecanografia/index.html').is_file():
    errors.append('Falta Mecanografía')
if not (ROOT / '.nojekyll').exists():
    errors.append('Falta .nojekyll')

if errors:
    print('\n'.join(sorted(set(errors))))
    sys.exit(1)
print(f'Correcto: {len(checked)} rutas locales, recursos y nombres de archivo.')
print('Correcto: portada de cursos, 106 juegos/aplicaciones de Segundo y juegos de Tercero.')
