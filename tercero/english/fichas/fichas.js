'use strict';

(() => {
  const { sports, days, yoga, replies } = window.EnglishTopics;
  const byId = id => document.getElementById(id);
  const item = (cue, answer) => ({ cue, answer });
  const block = (title, instruction, items) => ({ title, instruction, items });

  function shuffled(values) {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const verbItem = ([verb, sport]) => item('I ___ ' + sport + '.', verb);
  const sportItem = ([verb, sport, es]) => item(es, verb + ' ' + sport);
  const dayItem = ([day, es]) => item(es, day);
  const questionItem = ([verb, sport]) => item('Do you ___ ' + sport + '?', verb);
  const yogaItem = ([en, es]) => item(es, en);
  const fillYoga = ([en, es, answer]) => item(es + ' → ' + en.slice(0, -answer.length) + '___.', answer);

  function answerItems(values) {
    const first = Math.random() < 0.5 ? 0 : 1;
    return values.map(([verb, sport], index) => {
      const no = (first + index) % 2;
      return item('Do you ' + verb + ' ' + sport + '? (' + (no ? 'no' : 'yes') + ')', replies[no]);
    });
  }

  function buildQuestionItem([verb, sport]) {
    const words = ['Do', 'you', verb, sport + '?'];
    let mixed = shuffled(words);
    if (mixed.join(' ') === words.join(' ')) mixed = [...mixed.slice(1), mixed[0]];
    return item(mixed.join(' / '), words.join(' '));
  }

  const worksheets = {
    deportes: {
      title: 'Sports',
      build() {
        const pool = shuffled(sports);
        return [
          block('Play, go or do?', 'Write play, go or do in each gap.', pool.slice(0, 6).map(verbItem)),
          block('Sports phrases', 'Write the complete phrase in English, including the verb.', pool.slice(6).map(sportItem))
        ];
      }
    },
    dias: {
      title: 'Days of the week',
      build() {
        return [
          block('Write the days', 'Write each day in English. Start with a capital letter.', shuffled(days).map(dayItem)),
          block('Order the week', 'Write the days in order, starting with Monday. Word bank: ' +
            shuffled(days).map(([day]) => day).join(' · '), days.map(([day], i) => item('Day ' + (i + 1), day)))
        ];
      }
    },
    preguntas: {
      title: 'Do you…?',
      build() {
        const pool = shuffled(sports);
        return [
          block('Complete the questions', 'Write play, go or do.', pool.slice(0, 6).map(questionItem)),
          block('Write short answers', 'Use the cue in brackets. Write Yes, I do. or No, I don’t.', answerItems(pool.slice(6))),
          block('Build the questions', 'Put the words in order and write the whole question.', pool.slice(0, 2).map(buildQuestionItem))
        ];
      }
    },
    yoga: {
      title: 'Yoga for kids',
      build() {
        return [
          block('Yoga instructions', 'Write each instruction in English. Word bank: ' +
            shuffled(yoga).map(([en]) => en).join(' · '), shuffled(yoga).map(yogaItem)),
          block('Finish the instructions', 'Use the Spanish clue to write the missing word.', shuffled(yoga).map(fillYoga))
        ];
      }
    },
    repaso: {
      title: 'English review',
      build() {
        const sportPool = shuffled(sports);
        const dayPool = shuffled(days);
        const yogaPool = shuffled(yoga);
        const dayOrder = dayPool.filter(([day]) => day !== 'Sunday').slice(0, 2).map(([day]) => {
          const index = days.findIndex(([name]) => name === day);
          return item('What day comes after ' + day + '?', days[index + 1][0]);
        });
        return [
          block('Sports', 'Write play, go or do. For Spanish clues, write the whole phrase in English.',
            [...sportPool.slice(0, 2).map(verbItem), ...sportPool.slice(2, 4).map(sportItem)]),
          block('Days of the week', 'Write each answer in English with a capital letter.',
            [...dayPool.slice(0, 2).map(dayItem), ...dayOrder]),
          block('Do you…?', 'Fill the gaps. For the other questions, use the cue to write a short answer.',
            [...sportPool.slice(4, 6).map(questionItem), ...answerItems(sportPool.slice(6, 8))]),
          block('Yoga for kids', 'Write the instruction in English or fill the gap.',
            [...yogaPool.slice(0, 2).map(yogaItem), ...yogaPool.slice(2, 4).map(fillYoga)])
        ];
      }
    }
  };

  const requested = new URLSearchParams(location.search).get('tema');
  const type = Object.hasOwn(worksheets, requested) ? requested : 'repaso';
  const worksheet = worksheets[type];
  let version = 1;

  byId('tab-' + type).setAttribute('aria-current', 'page');
  byId('sheet-title').textContent = worksheet.title;
  document.title = worksheet.title + ' · Fichas English 3.º';

  function render() {
    const blocks = worksheet.build();
    byId('exercises').innerHTML = blocks.map(({ title, instruction, items }) => `<section class="sheet-block">
      <h2>${title}</h2><p>${instruction}</p>
      <ol>${items.map(({ cue }) => `<li><span class="sheet-cue">${cue}</span><span class="answer-line" aria-hidden="true"></span></li>`).join('')}</ol>
    </section>`).join('');
    byId('answers').innerHTML = blocks.map(({ title, items }) => `<section>
      <h3>${title}</h3><ol>${items.map(({ answer }) => `<li>${answer}</li>`).join('')}</ol>
    </section>`).join('');
    byId('solutions').open = false;
  }

  render();
  byId('generate').addEventListener('click', () => {
    render();
    version++;
    byId('status').textContent = 'Versión ' + version + ' lista para imprimir.';
  });
  byId('print').addEventListener('click', () => window.print());
})();
