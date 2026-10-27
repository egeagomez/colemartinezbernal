/* =============================================
   score.js — Sistema de puntuación compartido
   Almacena puntuaciones en localStorage
============================================= */

const ScoreManager = (() => {
  const KEY = 'lenguaSegundo_scores';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }

  function save(gameId, score, total) {
    const data = getAll();
    data[gameId] = { score, total, percent: Math.round(score/total*100), date: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function get(gameId) {
    return getAll()[gameId] || null;
  }

  function totalPoints() {
    return Object.values(getAll()).reduce((s, v) => s + (v.score || 0), 0);
  }

  function reset() { localStorage.removeItem(KEY); }

  return { save, get, getAll, totalPoints, reset };
})();

/* ——— Sonidos via Web Audio API ——— */
const Sound = (() => {
  let ctx = null;
  function init() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  function beep(freq, dur, type = 'sine', vol = 0.4) {
    try {
      init();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.start(); osc.stop(ctx.currentTime + dur);
    } catch(e) {}
  }
  function correct() {
    beep(523, .12); setTimeout(() => beep(659, .12), 120); setTimeout(() => beep(784, .2), 240);
  }
  function wrong() {
    beep(220, .15, 'sawtooth', .3); setTimeout(() => beep(180, .2, 'sawtooth', .2), 150);
  }
  function fanfare() {
    [523,659,784,1047].forEach((f,i) => setTimeout(() => beep(f, .18), i*120));
  }
  return { correct, wrong, fanfare };
})();

/* ——— Helpers drag-and-drop con soporte táctil ——— */
function makeDraggable(el) {
  // Desktop
  el.setAttribute('draggable', 'true');
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', el.dataset.value || el.textContent.trim());
    e.dataTransfer.setData('id', el.id);
    el.classList.add('dragging');
  });
  el.addEventListener('dragend', () => el.classList.remove('dragging'));

  // Touch / Pointer
  let clone = null, startX, startY;
  el.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    e.preventDefault();
    startX = e.clientX; startY = e.clientY;
    clone = el.cloneNode(true);
    clone.style.cssText = `position:fixed;z-index:999;opacity:.85;pointer-events:none;
      left:${e.clientX - el.offsetWidth/2}px;top:${e.clientY - el.offsetHeight/2}px;
      width:${el.offsetWidth}px;`;
    document.body.appendChild(clone);
    el.style.opacity = '.4';
  });
  el.addEventListener('pointermove', e => {
    if (!clone) return;
    e.preventDefault();
    clone.style.left = (e.clientX - el.offsetWidth/2) + 'px';
    clone.style.top  = (e.clientY - el.offsetHeight/2) + 'px';
  });
  el.addEventListener('pointerup', e => {
    if (!clone) return;
    clone.remove(); clone = null;
    el.style.opacity = '';
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const zone = target?.closest('[data-drop]');
    if (zone) {
      zone.dispatchEvent(new CustomEvent('touchdrop', {
        detail: { value: el.dataset.value || el.textContent.trim(), sourceId: el.id },
        bubbles: false
      }));
    }
  });
}

function makeDropZone(el, onDrop) {
  el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('over'); });
  el.addEventListener('dragleave', () => el.classList.remove('over'));
  el.addEventListener('drop', e => {
    e.preventDefault();
    el.classList.remove('over');
    onDrop(e.dataTransfer.getData('text/plain'), e.dataTransfer.getData('id'), el);
  });
  el.addEventListener('touchdrop', e => {
    el.classList.remove('over');
    onDrop(e.detail.value, e.detail.sourceId, el);
  });
}

/* ——— Feedback visual ——— */
function showFeedback(correct, msg) {
  const ov = document.createElement('div');
  ov.className = 'feedback-overlay';
  ov.innerHTML = `<div class="feedback-box ${correct ? 'correct' : 'wrong'}">
    <span class="feedback-emoji">${correct ? '🌟' : '😕'}</span>
    <div class="feedback-msg">${msg}</div>
  </div>`;
  document.body.appendChild(ov);
  setTimeout(() => ov.remove(), correct ? 900 : 1300);
  correct ? Sound.correct() : Sound.wrong();
}

/* ——— Ir al podio si toca ——— */
function maybePodio(gameId, score, total) {
  ScoreManager.save(gameId, score, total);
  window.location.href = '../podio.html?from=' + gameId;
}
