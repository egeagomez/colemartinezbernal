// ==================== AVATARS ====================
const AVATARS = ['🦁', '🐱', '🐶', '🦊', '🐸', '🐼', '🦄', '🐰', '🐵', '🐲', '🦋', '🐬'];

// ==================== KEYBOARD LAYOUT ====================
const KEYBOARD_ROWS = [
  ['º','1','2','3','4','5','6','7','8','9','0','\'','¡'],
  ['q','w','e','r','t','y','u','i','o','p','`','+'],
  ['a','s','d','f','g','h','j','k','l','ñ','´','ç'],
  ['<','z','x','c','v','b','n','m',',','.','-'],
  [' ']
];

const FINGER_MAP = {
  'º':'lpinky','1':'lpinky','q':'lpinky','a':'lpinky','<':'lpinky','z':'lpinky',
  '2':'lring','w':'lring','s':'lring','x':'lring',
  '3':'lmiddle','e':'lmiddle','d':'lmiddle','c':'lmiddle',
  '4':'lindex','5':'lindex','r':'lindex','t':'lindex','f':'lindex','g':'lindex','v':'lindex','b':'lindex',
  '6':'rindex','7':'rindex','y':'rindex','u':'rindex','h':'rindex','j':'rindex','n':'rindex','m':'rindex',
  '8':'rmiddle','i':'rmiddle','k':'rmiddle',',':'rmiddle',
  '9':'rring','o':'rring','l':'rring','.':'rring',
  '0':'rpinky','\'':'rpinky','¡':'rpinky','p':'rpinky','`':'rpinky','+':'rpinky',
  'ñ':'rpinky','´':'rpinky','ç':'rpinky','-':'rpinky',
  ' ':'thumb'
};

// ==================== LESSON DATA ====================
const LESSONS = [
  {
    id: 'home-1', name: 'Home Row - Básico', level: 1,
    keys: ['a','s','d','f','g','h','j','k','l','ñ'],
    targetPPM: 20,
    drills: [
      'fff jjj fff jjj ddd kkk ddd kkk',
      'aaa sss ddd fff ggg hhh jjj kkk lll ñññ',
      'ff jj dd kk ss ll aa ññ ff jj dd kk',
      'asdf asdf jklñ jklñ asdf jklñ',
      'fdsa fdsa ñlkj ñlkj fdsa ñlkj'
    ]
  },
  {
    id: 'home-2', name: 'Home Row - Palabras', level: 1,
    keys: ['a','s','d','f','g','h','j','k','l','ñ'],
    targetPPM: 25,
    drills: [
      'ala ala ala asa asa asa ada ada ada',
      'ama ama ama asa asa asa ala ala ala',
      'sal sal sal gas gas gas las las las',
      'ala sal las gala gala ala sal las gala',
      'ama a mama ama a papa la sala da a la gala'
    ]
  },
  {
    id: 'top-1', name: 'Fila Superior - Básico', level: 2,
    keys: ['q','w','e','r','t','y','u','i','o','p'],
    targetPPM: 25,
    drills: [
      'rrr uuu rrr uuu eee iii eee iii',
      'www ooo www ooo qqq ppp qqq ppp',
      'ttt yyy ttt yyy rr uu ee ii oo',
      'qwer qwer tyui tyui opqw opqw',
      'reto reto rui rui puro puro'
    ]
  },
  {
    id: 'top-2', name: 'Fila Superior - Palabras', level: 2,
    keys: ['a','s','d','f','g','h','j','k','l','ñ','q','w','e','r','t','y','u','i','o','p'],
    targetPPM: 30,
    drills: [
      'ojo ojo ojo ojo pie pie pie pie',
      'que que que rio rio rio sol sol sol',
      'ojo pie que rio sol pez luz rey ley',
      'que risa que risa esa joya esa joya',
      'el perro pasea por la orilla del rio'
    ]
  },
  {
    id: 'bottom-1', name: 'Fila Inferior - Básico', level: 3,
    keys: ['z','x','c','v','b','n','m'],
    targetPPM: 25,
    drills: [
      'zzz mmm zzz mmm xxx nnn xxx nnn',
      'ccc bbb ccc bbb vvv mmm vvv nnn',
      'zxc zxc vbn vbn mcx mcx nbv nbv',
      'vez vez voz voz van van ven ven',
      'zinc zinc cama cama nave nave'
    ]
  },
  {
    id: 'bottom-2', name: 'Fila Inferior - Palabras', level: 3,
    keys: ['a','s','d','f','g','h','j','k','l','ñ','q','w','e','r','t','y','u','i','o','p','z','x','c','v','b','n','m'],
    targetPPM: 35,
    drills: [
      'cama cama nube nube vaca vaca',
      'bici bici mono mono nariz nariz',
      'el caballo blanco camina bien',
      'ven con mama a buscar un mango',
      'la vaca bonita come en el campo verde'
    ]
  },
  {
    id: 'words-1', name: 'Palabras Fáciles', level: 4,
    keys: [],
    targetPPM: 40,
    drills: [
      'casa casa gato gato perro perro',
      'mama papa hijo hija niño niña',
      'mesa silla cama libro lapiz goma',
      'el gato come su comida en casa',
      'mi mama tiene un perro muy bonito'
    ]
  },
  {
    id: 'words-2', name: 'Palabras con Acentos', level: 4,
    keys: [],
    targetPPM: 35,
    drills: [
      'árbol árbol pájaro pájaro ratón ratón',
      'mamá mamá papá papá bebé bebé',
      'camión camión avión avión león león',
      'el pájaro azul vuela sobre el árbol',
      'mamá compró un camión rojo para josé'
    ]
  },
  {
    id: 'sentences-1', name: 'Frases Cortas', level: 5,
    keys: [],
    targetPPM: 45,
    drills: [
      'hoy es un buen día para aprender',
      'me gusta jugar con mis amigos en el parque',
      'el sol sale por la mañana y se va por la noche',
      'mi hermano tiene un gato negro muy juguetón',
      'los niños corren y saltan en el patio del colegio'
    ]
  },
  {
    id: 'sentences-2', name: 'Frases Largas', level: 5,
    keys: [],
    targetPPM: 50,
    drills: [
      'la maestra nos enseña cosas nuevas todos los días en clase',
      'cuando llueve me gusta quedarme en casa leyendo un libro bonito',
      'en el zoológico vimos leones jirafas elefantes y muchos pájaros de colores',
      'mi abuela hace las mejores galletas del mundo con chocolate y nueces',
      'los domingos vamos al parque a jugar al fútbol con toda la familia'
    ]
  }
];

// ==================== MEDALS DEFINITION ====================
const MEDAL_DEFS = [
  { id: 'primera', name: 'Primera Lección', icon: '🎓', desc: 'Completa tu primera lección' },
  { id: 'veloz', name: 'Veloz', icon: '⚡', desc: 'Alcanza 50 PPM' },
  { id: 'perfecto', name: 'Perfecto', icon: '💎', desc: '100% de precisión en una lección' },
  { id: 'constante', name: 'Constante', icon: '🔥', desc: 'Completa 10 lecciones' },
  { id: 'rey-lluvia', name: 'Rey de la Lluvia', icon: '🌧️', desc: 'Record en Lluvia de Letras' },
  { id: 'campeon-carrera', name: 'Campeón de Carreras', icon: '🏆', desc: 'Gana una Carrera de Palabras' },
  { id: 'maestro-tiempo', name: 'Maestro del Tiempo', icon: '⏱️', desc: 'Record en Contrarreloj' },
];

// ==================== APP STATE ====================
let state = {
  profiles: [],
  activeProfile: null,
  currentLesson: null,
  currentDrillIndex: 0,
  exerciseChars: [],
  exercisePos: 0,
  correctCount: 0,
  errorCount: 0,
  startTime: null,
  timerInterval: null,
  ppmInterval: null,
  // game state
  currentGame: null,
  rainItems: [],
  rainInterval: null,
  rainLives: 3,
  rainScore: 0,
  rainStartTime: null,
  rainCorrect: 0,
  rainTotal: 0,
  raceWords: [],
  raceWordIndex: 0,
  racePlayerPos: 0,
  raceCpuPos: 0,
  raceCpuInterval: null,
  raceStartTime: null,
  raceCorrect: 0,
  raceTotal: 0,
  timeLimit: 60,
  timeRemaining: 60,
  timeInterval: null,
  timeWords: 0,
  timeStartTime: null,
  timeCorrect: 0,
  timeTotal: 0,
};

// ==================== STORAGE ====================
function loadProfiles() {
  const raw = localStorage.getItem('mecanokids_profiles');
  state.profiles = raw ? JSON.parse(raw) : [];
}
function saveProfiles() {
  localStorage.setItem('mecanokids_profiles', JSON.stringify(state.profiles));
}
function getProfile(id) {
  return state.profiles.find(p => p.id === id);
}
function saveActiveProfile() {
  if (!state.activeProfile) return;
  const idx = state.profiles.findIndex(p => p.id === state.activeProfile.id);
  if (idx >= 0) state.profiles[idx] = state.activeProfile;
  saveProfiles();
}

// ==================== NAVIGATION ====================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  stopExercise();
  stopAllGames();
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('btn-back')) {
    const target = e.target.dataset.target;
    if (target) showScreen(target);
  }
});

// ==================== PROFILE SCREENS ====================
function renderProfiles() {
  const list = document.getElementById('profile-list');
  const btnNew = document.getElementById('btn-new-profile');
  const limitMsg = document.getElementById('profile-limit-msg');

  list.innerHTML = '';
  state.profiles.forEach(p => {
    const completedCount = Object.keys(p.progress || {}).filter(k => p.progress[k].completed).length;
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <button class="btn-delete" data-id="${p.id}">&times;</button>
      <span class="avatar">${p.avatar}</span>
      <span class="name">${p.name}</span>
      <span class="summary">${completedCount} lecciones</span>
    `;
    card.addEventListener('click', e => {
      if (e.target.classList.contains('btn-delete')) return;
      selectProfile(p.id);
    });
    card.querySelector('.btn-delete').addEventListener('click', e => {
      e.stopPropagation();
      deleteProfile(p.id, p.name);
    });
    list.appendChild(card);
  });

  if (state.profiles.length >= 6) {
    btnNew.classList.add('hidden');
    limitMsg.classList.remove('hidden');
  } else {
    btnNew.classList.remove('hidden');
    limitMsg.classList.add('hidden');
  }
}

function selectProfile(id) {
  state.activeProfile = JSON.parse(JSON.stringify(getProfile(id)));
  if (!state.activeProfile.progress) state.activeProfile.progress = {};
  if (!state.activeProfile.medals) state.activeProfile.medals = [];
  if (!state.activeProfile.gameStats) state.activeProfile.gameStats = {};
  document.getElementById('menu-avatar').textContent = state.activeProfile.avatar;
  document.getElementById('menu-player-name').textContent = state.activeProfile.name;
  showScreen('screen-menu');
  updateGamesLock();
}

function deleteProfile(id, name) {
  if (!confirm(`¿Eliminar a ${name}? Se perderá todo su progreso.`)) return;
  state.profiles = state.profiles.filter(p => p.id !== id);
  saveProfiles();
  renderProfiles();
}

document.getElementById('btn-new-profile').addEventListener('click', () => {
  document.getElementById('profile-name').value = '';
  renderAvatarPicker();
  showScreen('screen-create-profile');
});

document.getElementById('btn-cancel-profile').addEventListener('click', () => showScreen('screen-profiles'));

function renderAvatarPicker() {
  const picker = document.getElementById('avatar-picker');
  picker.innerHTML = '';
  AVATARS.forEach((a, i) => {
    const opt = document.createElement('div');
    opt.className = 'avatar-option' + (i === 0 ? ' selected' : '');
    opt.textContent = a;
    opt.dataset.avatar = a;
    opt.addEventListener('click', () => {
      picker.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
    picker.appendChild(opt);
  });
}

document.getElementById('btn-save-profile').addEventListener('click', () => {
  const name = document.getElementById('profile-name').value.trim();
  if (!name) return alert('Escribe tu nombre');
  const avatar = document.querySelector('#avatar-picker .selected')?.dataset.avatar || AVATARS[0];
  const profile = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name, avatar,
    progress: {},
    medals: [],
    gameStats: {}
  };
  state.profiles.push(profile);
  saveProfiles();
  selectProfile(profile.id);
});

// ==================== MAIN MENU ====================
document.getElementById('btn-lessons').addEventListener('click', () => {
  renderLessons();
  showScreen('screen-lessons');
});
document.getElementById('btn-free-practice').addEventListener('click', () => startFreePractice());
document.getElementById('btn-games').addEventListener('click', () => {
  if (getCompletedLessonCount() < 3) return;
  showScreen('screen-games');
});
document.getElementById('btn-progress').addEventListener('click', () => {
  renderProgress();
  showScreen('screen-progress');
});
document.getElementById('btn-change-player').addEventListener('click', () => {
  saveActiveProfile();
  showScreen('screen-profiles');
  renderProfiles();
});

function updateGamesLock() {
  const btn = document.getElementById('btn-games');
  if (getCompletedLessonCount() < 3) {
    btn.classList.add('locked');
    btn.title = 'Completa 3 lecciones para desbloquear';
  } else {
    btn.classList.remove('locked');
    btn.title = '';
  }
}

function getCompletedLessonCount() {
  if (!state.activeProfile?.progress) return 0;
  return Object.values(state.activeProfile.progress).filter(p => p.completed).length;
}

// ==================== LESSON SELECTION ====================
function isLessonUnlocked(lessonIndex) {
  if (lessonIndex === 0) return true;
  const prevLesson = LESSONS[lessonIndex - 1];
  const prevProgress = state.activeProfile.progress[prevLesson.id];
  return prevProgress && prevProgress.completed;
}

function renderLessons() {
  const list = document.getElementById('lesson-list');
  list.innerHTML = '';
  LESSONS.forEach((lesson, i) => {
    const unlocked = isLessonUnlocked(i);
    const progress = state.activeProfile.progress[lesson.id];
    const card = document.createElement('div');
    card.className = 'lesson-card' + (unlocked ? '' : ' locked');
    const stars = progress ? renderStarsText(progress.bestStars || 0) : '';
    card.innerHTML = `
      <div class="lesson-name">${lesson.name}</div>
      <div class="lesson-keys">${lesson.keys.length ? lesson.keys.join(' ').toUpperCase() : 'Todas las teclas'}</div>
      ${stars ? `<div class="lesson-stars">${stars}</div>` : ''}
      ${!unlocked ? '<span class="lock-icon">🔒</span>' : ''}
    `;
    if (unlocked) {
      card.addEventListener('click', () => startLesson(i));
    }
    list.appendChild(card);
  });
}

function renderStarsText(count) {
  return '⭐'.repeat(count) + '☆'.repeat(3 - count);
}

// ==================== TYPING ENGINE ====================
function startLesson(lessonIndex) {
  const lesson = LESSONS[lessonIndex];
  state.currentLesson = lessonIndex;
  state.currentDrillIndex = 0;
  document.getElementById('exercise-title').textContent = lesson.name;
  loadDrill();
  showScreen('screen-exercise');
  buildKeyboard('virtual-keyboard');
  document.addEventListener('keydown', handleExerciseKey);
}

function loadDrill() {
  const lesson = LESSONS[state.currentLesson];
  const text = lesson.drills[state.currentDrillIndex];
  state.exercisePos = 0;
  state.correctCount = 0;
  state.errorCount = 0;
  state.startTime = null;
  clearInterval(state.timerInterval);
  clearInterval(state.ppmInterval);
  state.exerciseChars = text.split('');
  renderExerciseText('exercise-text');
  updateExerciseStats();
  highlightKey('virtual-keyboard', state.exerciseChars[0]);
}

function renderExerciseText(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  state.exerciseChars.forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'char' + (i === 0 ? ' active' : ' pending');
    span.textContent = ch === ' ' ? ' ' : ch;
    span.dataset.index = i;
    container.appendChild(span);
  });
}

function handleExerciseKey(e) {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const key = e.key;
  if (['Shift','Control','Alt','Tab','Escape','CapsLock','Meta','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','Insert','Delete','Home','End','PageUp','PageDown'].includes(key)) return;
  e.preventDefault();

  if (state.exercisePos >= state.exerciseChars.length) return;

  if (!state.startTime) {
    state.startTime = Date.now();
    state.timerInterval = setInterval(updateTimer, 1000);
    state.ppmInterval = setInterval(updatePPM, 500);
  }

  const expected = state.exerciseChars[state.exercisePos];
  const container = document.getElementById('exercise-text');
  const charSpan = container.querySelector(`[data-index="${state.exercisePos}"]`);

  if (key === expected) {
    state.correctCount++;
    charSpan.classList.remove('active', 'pending');
    charSpan.classList.add('correct');
    flashKey('virtual-keyboard', expected, true);
  } else {
    state.errorCount++;
    charSpan.classList.remove('active', 'pending');
    charSpan.classList.add('incorrect');
    flashKey('virtual-keyboard', key, false);
    flashKey('virtual-keyboard', expected, false);
  }

  state.exercisePos++;

  if (state.exercisePos < state.exerciseChars.length) {
    const nextSpan = container.querySelector(`[data-index="${state.exercisePos}"]`);
    nextSpan.classList.remove('pending');
    nextSpan.classList.add('active');
    highlightKey('virtual-keyboard', state.exerciseChars[state.exercisePos]);
  } else {
    drillComplete();
  }

  updateExerciseStats();
}

function drillComplete() {
  clearInterval(state.timerInterval);
  clearInterval(state.ppmInterval);
  clearHighlightKeys('virtual-keyboard');

  const lesson = LESSONS[state.currentLesson];
  state.currentDrillIndex++;

  if (state.currentDrillIndex < lesson.drills.length) {
    setTimeout(() => loadDrill(), 800);
  } else {
    exerciseComplete();
  }
}

function exerciseComplete() {
  document.removeEventListener('keydown', handleExerciseKey);
  const elapsed = (Date.now() - state.startTime) / 60000;
  const ppm = elapsed > 0 ? Math.round(state.correctCount / elapsed) : 0;
  const total = state.correctCount + state.errorCount;
  const accuracy = total > 0 ? Math.round((state.correctCount / total) * 100) : 100;
  const timeStr = formatTime(Date.now() - state.startTime);
  const stars = calcStars(accuracy, ppm, LESSONS[state.currentLesson].targetPPM);
  const passed = accuracy >= 70;

  saveExerciseResult(ppm, accuracy, stars, passed);

  document.getElementById('result-ppm').textContent = ppm;
  document.getElementById('result-accuracy').textContent = accuracy + '%';
  document.getElementById('result-time').textContent = timeStr;
  document.getElementById('result-errors').textContent = state.errorCount;
  document.getElementById('results-stars').textContent = renderStarsText(stars);

  if (passed) {
    document.getElementById('results-title').textContent = '¡Muy bien!';
    document.getElementById('results-message').textContent = stars === 3 ? '¡Increíble! ¡Eres una estrella!' : stars === 2 ? '¡Buen trabajo! ¡Sigue así!' : '¡Lo lograste! ¡A por más!';
    spawnConfetti('confetti-container');
  } else {
    document.getElementById('results-title').textContent = '¡Casi lo logras!';
    document.getElementById('results-message').textContent = '¡Inténtalo de nuevo! ¡Tú puedes!';
  }

  const newMedals = checkNewMedals(ppm, accuracy);
  const medalContainer = document.getElementById('results-medal');
  if (newMedals.length > 0) {
    medalContainer.classList.remove('hidden');
    medalContainer.innerHTML = newMedals.map(m => `<div class="medal-item">${m.icon} ${m.name}</div>`).join('');
  } else {
    medalContainer.classList.add('hidden');
  }

  const nextBtn = document.getElementById('btn-next-lesson');
  if (passed && state.currentLesson < LESSONS.length - 1) {
    nextBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.add('hidden');
  }

  showScreen('screen-results');
}

function saveExerciseResult(ppm, accuracy, stars, passed) {
  const lesson = LESSONS[state.currentLesson];
  const prog = state.activeProfile.progress[lesson.id] || {
    bestPPM: 0, bestAccuracy: 0, bestStars: 0, attempts: 0, completed: false
  };
  prog.attempts++;
  if (ppm > prog.bestPPM) prog.bestPPM = ppm;
  if (accuracy > prog.bestAccuracy) prog.bestAccuracy = accuracy;
  if (stars > prog.bestStars) prog.bestStars = stars;
  if (passed) prog.completed = true;
  prog.lastDate = new Date().toISOString();
  state.activeProfile.progress[lesson.id] = prog;
  saveActiveProfile();
  updateGamesLock();
}

function calcStars(accuracy, ppm, targetPPM) {
  if (accuracy >= 95 && ppm >= targetPPM) return 3;
  if (accuracy >= 80) return 2;
  if (accuracy >= 70) return 1;
  return 0;
}

function stopExercise() {
  clearInterval(state.timerInterval);
  clearInterval(state.ppmInterval);
  document.removeEventListener('keydown', handleExerciseKey);
}

function updateExerciseStats() {
  const total = state.correctCount + state.errorCount;
  const accuracy = total > 0 ? Math.round((state.correctCount / total) * 100) : 100;
  document.getElementById('stat-accuracy').textContent = accuracy + '%';
}

function updateTimer() {
  if (!state.startTime) return;
  document.getElementById('stat-time').textContent = formatTime(Date.now() - state.startTime);
}

function updatePPM() {
  if (!state.startTime) return;
  const elapsed = (Date.now() - state.startTime) / 60000;
  const ppm = elapsed > 0 ? Math.round(state.correctCount / elapsed) : 0;
  document.getElementById('stat-ppm').textContent = ppm;
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

// results buttons
document.getElementById('btn-retry').addEventListener('click', () => {
  startLesson(state.currentLesson);
});
document.getElementById('btn-next-lesson').addEventListener('click', () => {
  if (state.currentLesson < LESSONS.length - 1) {
    startLesson(state.currentLesson + 1);
  }
});
document.getElementById('btn-back-lessons').addEventListener('click', () => {
  renderLessons();
  showScreen('screen-lessons');
});

// ==================== VIRTUAL KEYBOARD ====================
function buildKeyboard(containerId) {
  const kb = document.getElementById(containerId);
  kb.innerHTML = '';
  KEYBOARD_ROWS.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';
    row.forEach(k => {
      const keyDiv = document.createElement('div');
      const finger = FINGER_MAP[k.toLowerCase()] || 'thumb';
      keyDiv.className = `key finger-${finger}` + (k === ' ' ? ' key-space' : '');
      keyDiv.textContent = k === ' ' ? 'ESPACIO' : k.toUpperCase();
      keyDiv.dataset.key = k.toLowerCase();
      rowDiv.appendChild(keyDiv);
    });
    kb.appendChild(rowDiv);
  });
}

function highlightKey(kbId, char) {
  clearHighlightKeys(kbId);
  const kb = document.getElementById(kbId);
  const key = kb.querySelector(`[data-key="${char.toLowerCase()}"]`);
  if (key) key.classList.add('highlight');
}

function clearHighlightKeys(kbId) {
  document.getElementById(kbId).querySelectorAll('.highlight').forEach(k => k.classList.remove('highlight'));
}

function flashKey(kbId, char, correct) {
  const kb = document.getElementById(kbId);
  const key = kb.querySelector(`[data-key="${char.toLowerCase()}"]`);
  if (!key) return;
  const cls = correct ? 'flash-correct' : 'flash-incorrect';
  key.classList.add(cls);
  setTimeout(() => key.classList.remove(cls), 300);
}

// ==================== FREE PRACTICE ====================
let freePracticeHandler = null;

function startFreePractice() {
  showScreen('screen-free-practice');
  buildKeyboard('free-virtual-keyboard');
  state.correctCount = 0;
  state.errorCount = 0;
  state.startTime = null;

  const words = getWordPool();
  const text = generateFreeText(words, 40);
  state.exerciseChars = text.split('');
  state.exercisePos = 0;
  renderExerciseText('free-exercise-text');
  highlightKey('free-virtual-keyboard', state.exerciseChars[0]);

  freePracticeHandler = e => handleFreePracticeKey(e, words);
  document.addEventListener('keydown', freePracticeHandler);
}

function handleFreePracticeKey(e, words) {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const key = e.key;
  if (['Shift','Control','Alt','Tab','Escape','CapsLock','Meta','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','Insert','Delete','Home','End','PageUp','PageDown'].includes(key)) return;
  e.preventDefault();

  if (!state.startTime) state.startTime = Date.now();

  const expected = state.exerciseChars[state.exercisePos];
  const container = document.getElementById('free-exercise-text');
  const charSpan = container.querySelector(`[data-index="${state.exercisePos}"]`);

  if (key === expected) {
    state.correctCount++;
    charSpan.classList.remove('active', 'pending');
    charSpan.classList.add('correct');
    flashKey('free-virtual-keyboard', expected, true);
  } else {
    state.errorCount++;
    charSpan.classList.remove('active', 'pending');
    charSpan.classList.add('incorrect');
    flashKey('free-virtual-keyboard', key, false);
  }
  state.exercisePos++;

  if (state.exercisePos >= state.exerciseChars.length) {
    const newText = generateFreeText(words, 40);
    state.exerciseChars = newText.split('');
    state.exercisePos = 0;
    renderExerciseText('free-exercise-text');
  }

  const nextSpan = container.querySelector(`[data-index="${state.exercisePos}"]`);
  if (nextSpan) {
    nextSpan.classList.remove('pending');
    nextSpan.classList.add('active');
    highlightKey('free-virtual-keyboard', state.exerciseChars[state.exercisePos]);
  }

  const elapsed = (Date.now() - state.startTime) / 60000;
  const ppm = elapsed > 0 ? Math.round(state.correctCount / elapsed) : 0;
  const total = state.correctCount + state.errorCount;
  const acc = total > 0 ? Math.round((state.correctCount / total) * 100) : 100;
  document.getElementById('free-stat-ppm').textContent = ppm;
  document.getElementById('free-stat-accuracy').textContent = acc + '%';
}

function getWordPool() {
  const words = [];
  LESSONS.forEach((lesson, i) => {
    if (!isLessonUnlocked(i)) return;
    lesson.drills.forEach(d => {
      d.split(/\s+/).forEach(w => {
        if (w.length >= 2 && !words.includes(w)) words.push(w);
      });
    });
  });
  if (words.length === 0) {
    return ['ala', 'ama', 'asa', 'sal', 'las', 'gala'];
  }
  return words;
}

function generateFreeText(words, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(' ');
}

// clean up free practice on navigation
const origShowScreen = showScreen;
showScreen = function(id) {
  if (freePracticeHandler) {
    document.removeEventListener('keydown', freePracticeHandler);
    freePracticeHandler = null;
  }
  origShowScreen(id);
};

// ==================== MEDALS ====================
function checkNewMedals(ppm, accuracy) {
  const newMedals = [];
  const medals = state.activeProfile.medals;

  if (!medals.includes('primera') && getCompletedLessonCount() >= 1) {
    medals.push('primera');
    newMedals.push(MEDAL_DEFS.find(m => m.id === 'primera'));
  }
  if (!medals.includes('veloz') && ppm >= 50) {
    medals.push('veloz');
    newMedals.push(MEDAL_DEFS.find(m => m.id === 'veloz'));
  }
  if (!medals.includes('perfecto') && accuracy === 100) {
    medals.push('perfecto');
    newMedals.push(MEDAL_DEFS.find(m => m.id === 'perfecto'));
  }
  if (!medals.includes('constante') && getCompletedLessonCount() >= 10) {
    medals.push('constante');
    newMedals.push(MEDAL_DEFS.find(m => m.id === 'constante'));
  }

  if (newMedals.length > 0) saveActiveProfile();
  return newMedals;
}

function checkGameMedal(gameType, isRecord, won) {
  const medals = state.activeProfile.medals;
  let medal = null;
  if (gameType === 'rain' && isRecord && !medals.includes('rey-lluvia')) {
    medals.push('rey-lluvia');
    medal = MEDAL_DEFS.find(m => m.id === 'rey-lluvia');
  }
  if (gameType === 'race' && won && !medals.includes('campeon-carrera')) {
    medals.push('campeon-carrera');
    medal = MEDAL_DEFS.find(m => m.id === 'campeon-carrera');
  }
  if (gameType === 'time' && isRecord && !medals.includes('maestro-tiempo')) {
    medals.push('maestro-tiempo');
    medal = MEDAL_DEFS.find(m => m.id === 'maestro-tiempo');
  }
  if (medal) saveActiveProfile();
  return medal;
}

// ==================== CONFETTI ====================
function spawnConfetti(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const colors = ['#FF6B6B','#4ECDC4','#FFE66D','#4D96FF','#9B59B6','#6BCB77','#FFA94D','#FF6B9D'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 2 + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    container.appendChild(piece);
  }
  setTimeout(() => container.innerHTML = '', 5000);
}

// ==================== PROGRESS DASHBOARD ====================
function renderProgress() {
  const prog = state.activeProfile.progress;
  const completed = Object.values(prog).filter(p => p.completed).length;
  const total = LESSONS.length;

  document.getElementById('progress-lessons').textContent = `${completed}/${total}`;
  document.getElementById('progress-bar').style.width = (total > 0 ? (completed / total) * 100 : 0) + '%';

  const allCompleted = Object.values(prog).filter(p => p.completed);
  const avgPPM = allCompleted.length > 0 ? Math.round(allCompleted.reduce((s, p) => s + p.bestPPM, 0) / allCompleted.length) : 0;
  const avgAcc = allCompleted.length > 0 ? Math.round(allCompleted.reduce((s, p) => s + p.bestAccuracy, 0) / allCompleted.length) : 0;

  document.getElementById('progress-ppm').textContent = avgPPM;
  document.getElementById('progress-accuracy').textContent = avgAcc + '%';

  // medals
  const medalsGrid = document.getElementById('medals-display');
  medalsGrid.innerHTML = '';
  MEDAL_DEFS.forEach(md => {
    const earned = state.activeProfile.medals.includes(md.id);
    const card = document.createElement('div');
    card.className = 'medal-card' + (earned ? '' : ' locked');
    card.innerHTML = `<div class="medal-icon">${md.icon}</div><div class="medal-name">${md.name}</div>`;
    card.title = md.desc;
    medalsGrid.appendChild(card);
  });

  // per lesson
  const lessonList = document.getElementById('lesson-stats-list');
  lessonList.innerHTML = '';
  LESSONS.forEach(lesson => {
    const p = prog[lesson.id];
    if (!p) return;
    const row = document.createElement('div');
    row.className = 'lesson-stat-row';
    row.innerHTML = `
      <span class="ls-name">${lesson.name}</span>
      <span class="ls-stars">${renderStarsText(p.bestStars || 0)}</span>
      <span class="ls-detail">${p.bestPPM} PPM · ${p.bestAccuracy}% · ${p.attempts} intentos</span>
    `;
    lessonList.appendChild(row);
  });
}

// ==================== GAME: WORD POOL ====================
function getGameWordPool() {
  const words = [];
  LESSONS.forEach((lesson, i) => {
    if (!isLessonUnlocked(i)) return;
    lesson.drills.forEach(d => {
      d.split(/\s+/).forEach(w => {
        if (w.length >= 2 && w.length <= 8 && !words.includes(w)) words.push(w);
      });
    });
  });
  return words.length > 0 ? words : ['ala', 'ama', 'sal', 'gas', 'las'];
}

function randomWord(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// ==================== GAME: LLUVIA DE LETRAS ====================
document.querySelectorAll('.game-select').forEach(btn => {
  btn.addEventListener('click', () => {
    const game = btn.dataset.game;
    if (game === 'rain') startRainGame();
    else if (game === 'race') startRaceGame();
    else if (game === 'time') showScreen('screen-game-time');
  });
});

function startRainGame() {
  showScreen('screen-game-rain');
  state.currentGame = 'rain';
  state.rainLives = 3;
  state.rainScore = 0;
  state.rainCorrect = 0;
  state.rainTotal = 0;
  state.rainStartTime = Date.now();
  state.rainItems = [];
  document.getElementById('rain-score').textContent = '0';
  document.getElementById('rain-lives').textContent = '❤️❤️❤️';
  document.getElementById('rain-ppm').textContent = '0';
  document.getElementById('rain-area').innerHTML = '';
  const input = document.getElementById('rain-input');
  input.value = '';
  input.focus();

  const pool = getGameWordPool();
  const baseDuration = Math.max(3, 7 - getCompletedLessonCount() * 0.3);

  state.rainInterval = setInterval(() => {
    if (state.rainLives <= 0) return;
    spawnRainItem(pool, baseDuration);
  }, 1500);

  input.onkeydown = e => {
    if (e.key === 'Enter') {
      const typed = input.value.trim().toLowerCase();
      input.value = '';
      if (!typed) return;
      state.rainTotal++;
      const area = document.getElementById('rain-area');
      const items = area.querySelectorAll('.rain-item:not(.destroyed)');
      let hit = false;
      items.forEach(item => {
        if (item.textContent.toLowerCase() === typed && !hit) {
          hit = true;
          state.rainCorrect++;
          state.rainScore += typed.length * 10;
          item.classList.add('destroyed');
          setTimeout(() => item.remove(), 300);
        }
      });
      document.getElementById('rain-score').textContent = state.rainScore;
      updateRainPPM();
    }
  };
}

function spawnRainItem(pool, duration) {
  const word = randomWord(pool);
  const area = document.getElementById('rain-area');
  const item = document.createElement('div');
  item.className = 'rain-item';
  item.textContent = word;
  item.style.left = Math.floor(Math.random() * 80 + 5) + '%';
  item.style.animationDuration = duration + 's';
  area.appendChild(item);

  item.addEventListener('animationend', () => {
    if (!item.classList.contains('destroyed')) {
      item.remove();
      state.rainLives--;
      const hearts = '❤️'.repeat(Math.max(0, state.rainLives)) + '🖤'.repeat(3 - Math.max(0, state.rainLives));
      document.getElementById('rain-lives').textContent = hearts;
      if (state.rainLives <= 0) endRainGame();
    }
  });
}

function updateRainPPM() {
  const elapsed = (Date.now() - state.rainStartTime) / 60000;
  const ppm = elapsed > 0 ? Math.round(state.rainCorrect * 5 / elapsed) : 0;
  document.getElementById('rain-ppm').textContent = ppm;
}

function endRainGame() {
  clearInterval(state.rainInterval);
  document.getElementById('rain-input').onkeydown = null;
  const elapsed = (Date.now() - state.rainStartTime) / 60000;
  const ppm = elapsed > 0 ? Math.round(state.rainCorrect * 5 / elapsed) : 0;
  const accuracy = state.rainTotal > 0 ? Math.round((state.rainCorrect / state.rainTotal) * 100) : 0;
  const timeStr = formatTime(Date.now() - state.rainStartTime);

  const gs = state.activeProfile.gameStats;
  const isRecord = !gs.rainBest || state.rainScore > gs.rainBest;
  if (isRecord) gs.rainBest = state.rainScore;
  gs.rainLast = { score: state.rainScore, ppm, accuracy, date: new Date().toISOString() };
  saveActiveProfile();

  showGameResults('Lluvia de Letras', state.rainScore, 'Puntos', ppm, accuracy, timeStr, 'Tiempo', checkGameMedal('rain', isRecord, false));
}

// ==================== GAME: CARRERA DE PALABRAS ====================
function startRaceGame() {
  showScreen('screen-game-race');
  state.currentGame = 'race';
  state.racePlayerPos = 0;
  state.raceCpuPos = 0;
  state.raceWordIndex = 0;
  state.raceCorrect = 0;
  state.raceTotal = 0;
  state.raceStartTime = Date.now();

  const pool = getGameWordPool();
  state.raceWords = [];
  for (let i = 0; i < 20; i++) state.raceWords.push(randomWord(pool));

  document.getElementById('racer-player').style.left = '0%';
  document.getElementById('racer-cpu').style.left = '0%';
  document.getElementById('race-ppm').textContent = '0';
  document.getElementById('race-accuracy').textContent = '100%';

  const input = document.getElementById('race-input');
  input.value = '';
  input.focus();

  renderRaceWord();

  const avgPPM = getAvgPPM();
  const cpuSpeed = Math.max(15, avgPPM * 0.7);
  state.raceCpuInterval = setInterval(() => {
    state.raceCpuPos += cpuSpeed / 600;
    if (state.raceCpuPos >= 100) state.raceCpuPos = 100;
    document.getElementById('racer-cpu').style.left = Math.min(state.raceCpuPos, 85) + '%';
    if (state.raceCpuPos >= 100) endRaceGame(false);
  }, 100);

  input.oninput = () => {
    const typed = input.value;
    const word = state.raceWords[state.raceWordIndex];
    renderRaceWordProgress(word, typed);
  };

  input.onkeydown = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const typed = input.value.trim().toLowerCase();
      const word = state.raceWords[state.raceWordIndex];
      state.raceTotal += word.length;
      let correct = 0;
      for (let i = 0; i < Math.min(typed.length, word.length); i++) {
        if (typed[i] === word[i]) correct++;
      }
      state.raceCorrect += correct;
      const errorInWord = typed !== word;
      if (errorInWord) {
        document.getElementById('racer-player').style.transition = 'none';
        setTimeout(() => {
          document.getElementById('racer-player').style.transition = 'left 0.3s ease';
        }, 300);
      } else {
        state.racePlayerPos += 100 / state.raceWords.length;
        document.getElementById('racer-player').style.left = Math.min(state.racePlayerPos, 85) + '%';
      }

      state.raceWordIndex++;
      input.value = '';

      const elapsed = (Date.now() - state.raceStartTime) / 60000;
      const ppm = elapsed > 0 ? Math.round(state.raceCorrect / elapsed) : 0;
      const acc = state.raceTotal > 0 ? Math.round((state.raceCorrect / state.raceTotal) * 100) : 100;
      document.getElementById('race-ppm').textContent = ppm;
      document.getElementById('race-accuracy').textContent = acc + '%';

      if (state.racePlayerPos >= 100) {
        endRaceGame(true);
      } else if (state.raceWordIndex < state.raceWords.length) {
        renderRaceWord();
      } else {
        endRaceGame(state.racePlayerPos > state.raceCpuPos);
      }
    }
  };
}

function renderRaceWord() {
  const display = document.getElementById('race-word-display');
  const word = state.raceWords[state.raceWordIndex];
  display.innerHTML = word.split('').map((ch, i) =>
    `<span class="char${i === 0 ? ' active' : ''}">${ch}</span>`
  ).join('');
}

function renderRaceWordProgress(word, typed) {
  const display = document.getElementById('race-word-display');
  display.innerHTML = word.split('').map((ch, i) => {
    let cls = '';
    if (i < typed.length) {
      cls = typed[i] === ch ? 'correct' : 'incorrect';
    } else if (i === typed.length) {
      cls = 'active';
    }
    return `<span class="char ${cls}">${ch}</span>`;
  }).join('');
}

function endRaceGame(playerWon) {
  clearInterval(state.raceCpuInterval);
  const input = document.getElementById('race-input');
  input.onkeydown = null;
  input.oninput = null;

  const elapsed = (Date.now() - state.raceStartTime) / 60000;
  const ppm = elapsed > 0 ? Math.round(state.raceCorrect / elapsed) : 0;
  const acc = state.raceTotal > 0 ? Math.round((state.raceCorrect / state.raceTotal) * 100) : 100;

  const gs = state.activeProfile.gameStats;
  gs.raceLast = { won: playerWon, ppm, accuracy: acc, date: new Date().toISOString() };
  saveActiveProfile();

  showGameResults(
    playerWon ? '¡Ganaste la Carrera!' : 'El Robot Ganó',
    playerWon ? '🏆' : '🥈', playerWon ? 'Resultado' : 'Resultado',
    ppm, acc, state.raceWordIndex.toString(), 'Palabras',
    checkGameMedal('race', false, playerWon)
  );
}

// ==================== GAME: CONTRARRELOJ ====================
document.querySelectorAll('.time-option').forEach(btn => {
  btn.addEventListener('click', () => {
    state.timeLimit = parseInt(btn.dataset.seconds);
    startTimeGame();
  });
});

function startTimeGame() {
  document.getElementById('time-select').classList.add('hidden');
  document.getElementById('time-game-area').classList.remove('hidden');
  state.currentGame = 'time';
  state.timeRemaining = state.timeLimit;
  state.timeWords = 0;
  state.timeCorrect = 0;
  state.timeTotal = 0;
  state.timeStartTime = null;

  const pool = getGameWordPool();
  let currentWord = randomWord(pool);
  renderTimeWord(currentWord);

  document.getElementById('time-countdown').textContent = state.timeRemaining;
  document.getElementById('time-words').textContent = '0';
  document.getElementById('time-ppm').textContent = '0';

  const input = document.getElementById('time-input');
  input.value = '';
  input.focus();

  input.oninput = () => {
    const typed = input.value;
    renderTimeWordProgress(currentWord, typed);
  };

  input.onkeydown = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!state.timeStartTime) {
        state.timeStartTime = Date.now();
        state.timeInterval = setInterval(() => {
          state.timeRemaining--;
          document.getElementById('time-countdown').textContent = Math.max(0, state.timeRemaining);
          if (state.timeRemaining <= 0) endTimeGame();
        }, 1000);
      }
      const typed = input.value.trim().toLowerCase();
      state.timeTotal += currentWord.length;
      let correct = 0;
      for (let i = 0; i < Math.min(typed.length, currentWord.length); i++) {
        if (typed[i] === currentWord[i]) correct++;
      }
      state.timeCorrect += correct;
      if (typed === currentWord) state.timeWords++;
      input.value = '';
      currentWord = randomWord(pool);
      renderTimeWord(currentWord);

      const elapsed = (Date.now() - state.timeStartTime) / 60000;
      const ppm = elapsed > 0 ? Math.round(state.timeCorrect / elapsed) : 0;
      document.getElementById('time-words').textContent = state.timeWords;
      document.getElementById('time-ppm').textContent = ppm;
    }
  };
}

function renderTimeWord(word) {
  const display = document.getElementById('time-word-display');
  display.innerHTML = word.split('').map((ch, i) =>
    `<span class="char${i === 0 ? ' active' : ''}">${ch}</span>`
  ).join('');
}

function renderTimeWordProgress(word, typed) {
  const display = document.getElementById('time-word-display');
  display.innerHTML = word.split('').map((ch, i) => {
    let cls = '';
    if (i < typed.length) cls = typed[i] === ch ? 'correct' : 'incorrect';
    else if (i === typed.length) cls = 'active';
    return `<span class="char ${cls}">${ch}</span>`;
  }).join('');
}

function endTimeGame() {
  clearInterval(state.timeInterval);
  const input = document.getElementById('time-input');
  input.onkeydown = null;
  input.oninput = null;

  const elapsed = state.timeStartTime ? (Date.now() - state.timeStartTime) / 60000 : 0;
  const ppm = elapsed > 0 ? Math.round(state.timeCorrect / elapsed) : 0;
  const acc = state.timeTotal > 0 ? Math.round((state.timeCorrect / state.timeTotal) * 100) : 0;

  const gs = state.activeProfile.gameStats;
  const isRecord = !gs.timeBest || state.timeWords > gs.timeBest;
  if (isRecord) gs.timeBest = state.timeWords;
  gs.timeLast = { words: state.timeWords, ppm, accuracy: acc, seconds: state.timeLimit, date: new Date().toISOString() };
  saveActiveProfile();

  showGameResults(
    'Contrarreloj', state.timeWords, 'Palabras',
    ppm, acc, state.timeLimit + 's', 'Tiempo',
    checkGameMedal('time', isRecord, false)
  );

  // reset time screen
  document.getElementById('time-select').classList.remove('hidden');
  document.getElementById('time-game-area').classList.add('hidden');
}

// ==================== GAME RESULTS ====================
function showGameResults(title, scoreValue, scoreLabel, ppm, accuracy, extraValue, extraLabel, medal) {
  document.getElementById('game-results-title').textContent = title;
  document.getElementById('game-result-score').textContent = scoreValue;
  document.getElementById('game-result-score-label').textContent = scoreLabel;
  document.getElementById('game-result-ppm').textContent = ppm;
  document.getElementById('game-result-accuracy').textContent = accuracy + '%';
  document.getElementById('game-result-extra').textContent = extraValue;
  document.getElementById('game-result-extra-label').textContent = extraLabel;

  const medalContainer = document.getElementById('game-results-medal');
  if (medal) {
    medalContainer.classList.remove('hidden');
    medalContainer.innerHTML = `<div class="medal-item">${medal.icon} ${medal.name}</div>`;
  } else {
    medalContainer.classList.add('hidden');
  }

  spawnConfetti('game-confetti-container');
  showScreen('screen-game-results');
}

document.getElementById('btn-game-retry').addEventListener('click', () => {
  if (state.currentGame === 'rain') startRainGame();
  else if (state.currentGame === 'race') startRaceGame();
  else if (state.currentGame === 'time') showScreen('screen-game-time');
});
document.getElementById('btn-game-back').addEventListener('click', () => showScreen('screen-games'));

function getAvgPPM() {
  const prog = state.activeProfile.progress;
  const completed = Object.values(prog).filter(p => p.completed);
  if (completed.length === 0) return 30;
  return Math.round(completed.reduce((s, p) => s + p.bestPPM, 0) / completed.length);
}

// ==================== STOP ALL GAMES ====================
function stopAllGames() {
  clearInterval(state.rainInterval);
  clearInterval(state.raceCpuInterval);
  clearInterval(state.timeInterval);
  ['rain-input', 'race-input', 'time-input'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.onkeydown = null; el.oninput = null; }
  });
}

// ==================== INIT ====================
function init() {
  loadProfiles();
  renderProfiles();
  if (state.profiles.length === 0) {
    showScreen('screen-profiles');
  } else {
    showScreen('screen-profiles');
  }
}

init();
