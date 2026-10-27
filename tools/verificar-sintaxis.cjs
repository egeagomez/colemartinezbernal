const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
let count = 0;
function check(folder) {
  for (const entry of fs.readdirSync(folder, {withFileTypes: true})) {
    if (entry.name.startsWith('.')) continue;
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) check(file);
    else if (file.endsWith('.js')) {
      new vm.Script(fs.readFileSync(file, 'utf8'), {filename: file}); count++;
    } else if (file.endsWith('.html')) {
      const source = fs.readFileSync(file, 'utf8');
      for (const script of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (script[2].trim() && !/type=["'](?:application|text)\/json/.test(script[1])) {
          new vm.Script(script[2], {filename: file}); count++;
        }
      }
    }
  }
}
const root = path.resolve(__dirname, '..');
check(path.join(root, 'segundo')); check(path.join(root, 'tercero'));
console.log(`Sintaxis JavaScript correcta: ${count} bloques y archivos.`);
