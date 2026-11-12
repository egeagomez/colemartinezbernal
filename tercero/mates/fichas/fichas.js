'use strict';

const WORKSHEET_LENGTHS = [2, 3, 4];
const EXERCISES_PER_LENGTH = 4;

function randomInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateWorksheet(isSubtraction, excluded = []) {
  const used = new Set(excluded.map(exercise => exercise.key));
  const exercises = [];

  for (const length of WORKSHEET_LENGTHS) {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;

    for (let index = 0; index < EXERCISES_PER_LENGTH; index++) {
      let left, right, key;
      do {
        // Force a carry or a borrow in a random column below the leading digit.
        const place = 10 ** randomInteger(0, length - 2);
        const leftDigit = isSubtraction ? randomInteger(0, 8) : randomInteger(1, 9);
        const rightDigit = randomInteger(isSubtraction ? leftDigit + 1 : 10 - leftDigit, 9);
        const replaceDigit = (number, digit) => number + (digit - Math.floor(number / place) % 10) * place;
        left = replaceDigit(randomInteger(min, max), leftDigit);
        right = replaceDigit(randomInteger(min, max), rightDigit);
        key = isSubtraction ? `${left}-${right}` : `${Math.min(left, right)}+${Math.max(left, right)}`;
      } while (used.has(key) || (isSubtraction ? left <= right : left + right > 9999));

      used.add(key);
      exercises.push({ left, right, key, answer: isSubtraction ? left - right : left + right });
    }
  }

  return exercises;
}

function exerciseMarkup({ left, right }, sign, index) {
  const digits = number => Array.from(String(number).padStart(4), digit => `<span>${digit}</span>`).join('');
  return `<li class="worksheet-exercise" aria-label="${index + 1}. ${left} ${sign} ${right}">
    <span class="exercise-number" aria-hidden="true">${index + 1}.</span>
    <div class="worksheet-operation" aria-hidden="true">
      <div class="operation-row carry-row"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="operation-row"><span></span>${digits(left)}</div>
      <div class="operation-row"><span>${sign}</span>${digits(right)}</div>
      <div class="operation-result"></div>
    </div>
  </li>`;
}

function initWorksheet() {
  const type = new URLSearchParams(location.search).get('tipo') === 'restas' ? 'restas' : 'sumas';
  const isSubtraction = type === 'restas';
  const title = isSubtraction ? 'Restas con llevadas' : 'Sumas con llevadas';
  const sign = isSubtraction ? '−' : '+';
  const byId = id => document.getElementById(id);
  let exercises = [];
  let sheetNumber = 1;

  document.title = `${title} · Matemáticas 3.º`;
  byId('sheet-title').textContent = title;
  byId(`tab-${type}`).setAttribute('aria-current', 'page');

  function render() {
    exercises = generateWorksheet(isSubtraction, exercises);
    byId('exercises').innerHTML = exercises.map((exercise, index) => exerciseMarkup(exercise, sign, index)).join('');
    byId('answers').innerHTML = exercises.map(({ left, right, answer }) => `<li>${left} ${sign} ${right} = <strong>${answer}</strong></li>`).join('');
    byId('solutions').open = false;
  }

  render();
  byId('generate').addEventListener('click', () => {
    render();
    sheetNumber++;
    byId('status').textContent = `Ficha ${sheetNumber} lista para imprimir.`;
  });
  byId('print').addEventListener('click', () => window.print());
}

initWorksheet();
