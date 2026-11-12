'use strict';

(() => {
  const { games, groups, diagrams = {}, glossary, theme } = window.PracticeContent;
  const app = document.getElementById('app');
  const extraMenu = document.getElementById('practice-extra')?.innerHTML ?? '';
  const { storageKey, subject, title, accent, unit, description, mascot, familyNote = '' } = theme;
  const questionBank = new Map(games.flatMap(game => game.questions.map(question => [question.id, question])));

  function loadProgress() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey));
      return value && typeof value === 'object' ? value : {};
    } catch {
      return {};
    }
  }

  const progress = loadProgress();
  const records = progress.records && typeof progress.records === 'object' ? progress.records : {};
  const pending = new Set(Array.isArray(progress.pending) ? progress.pending.filter(id => questionBank.has(id)) : []);
  let state;

  function saveProgress() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ records, pending: [...pending] }));
    } catch {}
  }

  function shuffle(values) {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function normalise(value) {
    return value.trim().toLowerCase().replace(/[‘’´]/g, "'").replace(/[.!?]+$/, '').trim().replace(/\s+/g, ' ');
  }

  const byId = id => document.getElementById(id);
  const current = () => state.questions[state.index];
  const button = (action, label, style = '') => `<button class="button ${style}" type="button" data-action="${action}">${label}</button>`;
  const glossaryMarkup = `<details class="help-panel quiz-glossary">
    <summary lang="es">Glosario inglés–español</summary>
    <dl>${glossary.map(([en, es]) => `<dt>${en}</dt><dd lang="es">${es}</dd>`).join('')}</dl>
  </details>`;

  function showMenu() {
    state = null;
    const done = games.filter(game => records[game.id]).length;
    app.innerHTML = `<section class="quiz-hero">
      <div>
        <p class="eyebrow">${unit}</p>
        <h1>${title} <span class="highlight">${accent}</span></h1>
        <p>${description}</p>
        <div class="actions">
          <a class="button" href="#${games[0].id}">Start exploring →</a>
          <a class="button secondary" href="#exam">Practice test</a>
        </div>
      </div>
      <div class="quiz-illustration" aria-hidden="true">${mascot}</div>
    </section>
    <div class="summary-strip"><strong>⭐ Your progress</strong><span>${done} of ${games.length} games completed</span></div>
    ${pending.size ? `<aside class="help-panel quiz-review"><p>Try ${pending.size} ${pending.size === 1 ? 'question' : 'questions'} again.</p>
      <a class="button gold" href="#review">Review my mistakes →</a></aside>` : ''}
    ${extraMenu}
    ${glossaryMarkup}
    ${groups.map((group, index) => `<section aria-labelledby="group-${index}">
      <div class="section-heading"><h2 id="group-${index}">${group}</h2></div>
      <div class="cards">${games.filter(game => game.group === index).map(game => `<a class="card quiz-card" href="#${game.id}">
        <span class="card-icon" aria-hidden="true">${game.icon}</span><h3>${game.title}</h3><p>${game.description}</p>
        <div class="card-foot"><span>${game.questions.length} challenges</span>${records[game.id] ? `<span>★ Best: ${records[game.id].best}%</span>` : ''}</div>
      </a>`).join('')}</div>
    </section>`).join('')}
    <details class="help-panel" lang="es"><summary>Para la familia</summary>
      <p>Las preguntas y correcciones están en inglés. El glosario sirve de apoyo. No hay cronómetro. El simulacro mezcla los contenidos de la unidad.</p>
      <p>Se puntúa el primer intento y se pueden repasar los errores. El progreso se guarda en este navegador.${familyNote ? ` ${familyNote}` : ''}</p>
    </details>`;
  }

  function start(game) {
    state = { game, questions: game.id === 'exam' ? shuffle(game.questions) : game.questions, index: 0, score: 0 };
    showQuestion();
  }

  function frame(content) {
    return `<a class="back" href="#">← All ${subject} games</a>
      <div class="game-head">
        <div><p class="eyebrow">${unit}</p><h1>${state.game.title}</h1></div>
        <div class="score" id="quiz-score" aria-label="Correct answers">⭐ ${state.score} / ${state.questions.length}</div>
      </div>
      <section class="board">${content}</section>`;
  }

  function diagramMarkup(question) {
    const diagram = diagrams[question.diagram];
    const labels = diagram.parts.map((part, i) => {
      const point = i + 1;
      const hint = `Point ${point}, ${diagram.clues[i]}`;
      if (question.type === 'spot') {
        const result = state.locked ? (part === question.answer ? 'correct' : state.selected === i ? 'wrong' : '') : '';
        return `<button type="button" class="cell-point point-${point} ${result}" data-action="pick" data-index="${i}"
          aria-label="${hint}" aria-pressed="${state.selected === i}" ${state.locked ? 'disabled' : ''}>${point}</button>`;
      }
      return `<span class="cell-point point-${point} ${question.point === point ? 'target' : ''}" aria-label="${hint}">${point}</span>`;
    }).join('');

    return `<figure class="cell-figure">
      <figcaption>${diagram.title} · simplified diagram</figcaption>
      <div class="cell-diagram ${question.diagram}" role="group" aria-label="${diagram.title}">
        <div class="cell-body" aria-hidden="true">
          <span class="cell-membrane"></span><span class="cell-vacuole"></span><span class="cell-nucleus"></span>
          ${question.diagram === 'plant' ? '<span class="chloroplast chloroplast-one"></span><span class="chloroplast chloroplast-two"></span><span class="chloroplast chloroplast-three"></span>' : ''}
        </div>
        ${labels}
      </div>
      ${question.point ? `<p class="sr-only">Point ${question.point} marks the ${diagram.clues[question.point - 1]}.</p>` : ''}
    </figure>`;
  }

  function optionMarkup(question) {
    return `<div class="choices">${state.options.map((option, i) => {
      const selected = state.selected === i;
      const result = state.locked ? (option === question.answer ? 'correct' : selected ? 'wrong' : '') : '';
      return `<button type="button" class="choice ${selected ? 'selected' : ''} ${result}" data-action="pick" data-index="${i}"
        aria-pressed="${selected}" ${state.locked ? 'disabled' : ''}>${option}</button>`;
    }).join('')}</div>`;
  }

  function matchMarkup(question) {
    return `<p class="hint">Tap a word, then its match. You can change a pair before checking.</p>
      <div class="quiz-matches">
        <div>${question.pairs.map(([term], i) => `<button type="button" class="quiz-match ${state.active === i ? 'selected' : ''}"
          data-action="match-left" data-index="${i}" aria-pressed="${state.active === i}" ${state.locked ? 'disabled' : ''}>
          ${term}${state.links.has(i) ? '<small>✓ Paired</small>' : ''}
        </button>`).join('')}</div>
        <div>${state.options.map((option, i) => {
          const linked = [...state.links].find(([, value]) => value === i);
          return `<button type="button" class="quiz-match" data-action="match-right" data-index="${i}" ${state.locked ? 'disabled' : ''}>
            ${option}${linked ? `<small>↔ ${question.pairs[linked[0]][0]}</small>` : ''}
          </button>`;
        }).join('')}</div>
      </div><p class="hint" role="status">${state.links.size} of ${question.pairs.length} pairs matched.${state.active === null ? '' : ' Choose its match.'}</p>`;
  }

  function orderMarkup() {
    return `<div class="quiz-order">
      <ol aria-label="Your order">${state.order.map(i => `<li>${state.options[i]}</li>`).join('')}</ol>
      <div class="actions">${state.options.map((option, i) => `<button type="button" class="choice" data-action="order" data-index="${i}"
        ${state.locked || state.order.includes(i) ? 'disabled' : ''}>${option}</button>`).join('')}</div>
      ${!state.locked && state.order.length ? button('undo', 'Undo last', 'secondary') : ''}
    </div>`;
  }

  function taskMarkup(question) {
    const visual = question.diagram ? diagramMarkup(question) : question.icon ? `<div class="quiz-example" aria-hidden="true">${question.icon}</div>` : '';
    if (question.type === 'choice') return visual + optionMarkup(question);
    if (question.type === 'spot') return visual;
    if (question.type === 'match') return matchMarkup(question);
    if (question.type === 'order') return orderMarkup();
    return `${question.bank.length ? `<p class="rule"><strong>Word bank</strong> · ${question.bank.join(' · ')}</p>` : ''}
      <label class="quiz-write">Your answer
        <input id="written-answer" type="text" lang="en" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="60">
      </label>`;
  }

  function showQuestion() {
    const question = current();
    Object.assign(state, { selected: null, active: null, links: new Map(), order: [], locked: false });
    state.options = shuffle(question.options ?? (question.type === 'order' ? question.answer : question.pairs?.map(([, answer]) => answer) ?? []));
    // Make the ordering activity start out of order even if the shuffle lands on the answer.
    if (question.type === 'order' && state.options.every((value, i) => value === question.answer[i])) {
      state.options.push(state.options.shift());
    }
    app.innerHTML = frame(`<p class="progress-label">Challenge ${state.index + 1} of ${state.questions.length}</p>
      <progress class="quiz-progress" aria-label="Progress" value="${state.index}" max="${state.questions.length}"></progress>
      <h2 class="question" id="quiz-question" tabindex="-1">${question.prompt.replace('___', '<span class="quiz-blank">_____</span>')}</h2>
      <form id="answer-form">
        <div id="quiz-task">${taskMarkup(question)}</div>
        <div id="quiz-feedback" role="status" aria-live="polite"></div>
        <div class="check-row">
          <button type="submit" id="check-answer" class="button">Check answer ✓</button>
          <button type="button" id="next-question" class="button gold" data-action="next" hidden>${state.index + 1 === state.questions.length ? 'See results 🏆' : 'Next challenge →'}</button>
        </div>
      </form>
      ${glossaryMarkup}`);
    byId('quiz-question').focus();
  }

  function grade(question) {
    if (question.type === 'match') {
      return state.links.size < question.pairs.length ? null :
        question.pairs.every(([, answer], i) => state.options[state.links.get(i)] === answer);
    }
    if (question.type === 'order') {
      return state.order.length < question.answer.length ? null :
        question.answer.every((answer, i) => state.options[state.order[i]] === answer);
    }
    if (question.type === 'write') {
      const value = normalise(byId('written-answer').value);
      return value ? question.answer.includes(value) : null;
    }
    if (state.selected === null) return null;
    const options = question.type === 'spot' ? diagrams[question.diagram].parts : state.options;
    return options[state.selected] === question.answer;
  }

  function solution(question) {
    if (question.type === 'order') return question.answer.join(' → ');
    if (question.type === 'match') return `<ul>${question.pairs.map(([term, answer]) => `<li>${term} → ${answer}</li>`).join('')}</ul>`;
    if (question.type === 'spot') return `Point ${diagrams[question.diagram].parts.indexOf(question.answer) + 1} · ${question.answer}`;
    if (question.type === 'write') return question.example ?? question.answer[0];
    return question.answer;
  }

  function checkAnswer() {
    if (state.locked) return;
    const question = current();
    const result = grade(question);
    const feedback = byId('quiz-feedback');
    if (result === null) {
      feedback.className = 'feedback again';
      feedback.textContent = {
        match: 'Match every pair before checking.',
        order: 'Put all the words in order before checking.',
        write: 'Type an answer before checking.'
      }[question.type] ?? 'Choose an answer before checking.';
      return;
    }

    state.locked = true;
    if (result) {
      state.score++;
      pending.delete(question.id);
    } else {
      pending.add(question.id);
    }
    saveProgress();
    if (question.type === 'write') byId('written-answer').disabled = true;
    else byId('quiz-task').innerHTML = taskMarkup(question);
    feedback.className = `feedback ${result ? 'good' : 'again'}`;
    feedback.innerHTML = `<strong>${result ? '⭐ Well done!' : '🌱 Let’s check it.'}</strong>
      ${result ? '' : `<div class="quiz-solution"><strong>${question.type === 'write' ? 'Example answer' : 'Correct answer'}</strong> · ${solution(question)}</div>`}
      <p>${question.why}</p>`;
    byId('quiz-score').textContent = `⭐ ${state.score} / ${state.questions.length}`;
    byId('check-answer').hidden = true;
    byId('next-question').hidden = false;
    byId('next-question').focus();
  }

  function finish() {
    const { game, score, questions } = state;
    const percentage = Math.round(score * 100 / questions.length);
    if (game.id !== 'review') {
      records[game.id] = { best: Math.max(records[game.id]?.best ?? 0, percentage) };
      saveProgress();
    }
    app.innerHTML = frame(`<div class="result">
      <div class="trophy" aria-hidden="true">🏆</div>
      <h2 tabindex="-1" id="quiz-result">Round complete!</h2>
      <div class="grade">${score} / ${questions.length}</div><p>Correct answers</p>
      <div class="check-row">
        ${game.id !== 'review' ? button('replay', 'Play again', 'secondary') : ''}
        <a class="button" href="#">All games</a>
        ${pending.size ? button('review', 'Review my mistakes →', 'gold') : ''}
      </div>
    </div>`);
    byId('quiz-result').focus();
  }

  function advance() {
    if (!state.locked) return;
    state.index++;
    if (state.index >= state.questions.length) {
      finish();
    } else if (state.index % 4 === 0) {
      app.innerHTML = frame(`<div class="checkpoint"><h2>Take a short break</h2>
        <p>You have finished ${state.index} of ${state.questions.length} challenges.</p>${button('continue', 'Keep going →', 'gold')}</div>`);
      app.querySelector('[data-action="continue"]').focus();
    } else {
      showQuestion();
    }
  }

  function updateTask(action, index) {
    if (state.locked) return;
    if (action === 'pick') state.selected = index;
    if (action === 'order') state.order.push(index);
    if (action === 'undo') state.order.pop();
    if (action === 'match-left') state.active = index;
    if (action === 'match-right') {
      if (state.active === null) {
        const feedback = byId('quiz-feedback');
        feedback.className = 'feedback again';
        feedback.textContent = 'Choose a word in the left column first.';
        return;
      }
      for (const [left, right] of state.links) {
        if (right === index) state.links.delete(left);
      }
      state.links.set(state.active, index);
      state.active = null;
    }
    const task = byId('quiz-task');
    task.innerHTML = taskMarkup(current());
    byId('quiz-feedback').textContent = '';
    byId('quiz-feedback').className = '';
    const sameButton = task.querySelector(`[data-action="${action}"][data-index="${index}"]:enabled`);
    const nextButton = task.querySelector('[data-action="order"]:enabled') ?? byId('check-answer');
    (sameButton ?? nextButton).focus();
  }

  function route() {
    const id = location.hash.slice(1);
    if (id === 'review' && pending.size) {
      start({ id, title: 'Review my mistakes', questions: [...pending].slice(0, 16).map(key => questionBank.get(key)) });
    } else {
      const game = games.find(item => item.id === id);
      if (game) start(game);
      else showMenu();
    }
    window.scrollTo(0, 0);
  }

  app.addEventListener('submit', event => {
    if (event.target.id !== 'answer-form') return;
    event.preventDefault();
    checkAnswer();
  });
  app.addEventListener('click', event => {
    const control = event.target.closest('[data-action]');
    if (!control || !state) return;
    const { action, index } = control.dataset;
    if (action === 'next') advance();
    else if (action === 'continue') showQuestion();
    else if (action === 'replay') start(state.game);
    else if (action === 'review') {
      if (location.hash === '#review') route();
      else location.hash = 'review';
    }
    else updateTask(action, Number(index));
  });
  window.addEventListener('hashchange', route);
  route();
})();
