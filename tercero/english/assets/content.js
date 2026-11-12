'use strict';

window.PracticeContent = (() => {
  const { sports, days, yoga, replies } = window.EnglishTopics;
  const choice = (prompt, options, answer, why, icon) => ({ type: 'choice', prompt, options, answer, why, icon });
  const write = (prompt, answer, why, bank = []) => ({
    type: 'write', prompt, answer: [answer.toLowerCase().replace(/[.!?]+$/, '')], example: answer, why, bank
  });
  const order = (prompt, answer, why) => ({ type: 'order', prompt, answer, why });
  const match = (prompt, pairs, why) => ({ type: 'match', prompt, pairs, why });
  const phrase = ([verb, sport]) => verb + ' ' + sport;
  const pickThree = (list, index) => [list[index], list[(index + 1) % list.length], list[(index + 3) % list.length]];
  const dayNames = days.map(([day]) => day);
  const sportNames = sports.map(([, sport]) => sport);
  const yogaNames = yoga.map(([en]) => en);
  const sportsVerbs = ['play', 'go', 'do'];
  const groups = ['Sports', 'Days of the week', 'Do you…?', 'Yoga for kids', 'Exam practice'];
  const games = [
    {
      id: 'sports', group: 0, icon: '⚽', title: 'Name the sport', description: 'Match the Spanish clue to the sport in English.',
      questions: sports.map(([verb, sport, es, icon], i) =>
        choice('Choose the sport in English. ' + es + '.', pickThree(sportNames, i), sport, 'Say “' + verb + ' ' + sport + '”.', icon))
    },
    {
      id: 'play-go-do', group: 0, icon: '🏸', title: 'Play, go or do?', description: 'Choose the verb that goes with each sport.',
      questions: sports.map(([verb, sport, , icon]) =>
        choice('I ___ ' + sport + '.', sportsVerbs, verb, 'Say “I ' + verb + ' ' + sport + '”.', icon))
    },
    {
      id: 'write-sports', group: 0, icon: '✏️', title: 'Write the sports phrases', description: 'Write the whole phrase, including play, go or do.',
      questions: sports.map(item => write('Write the sports phrase in English. ' + item[2] + '.', phrase(item), 'The phrase is “' + phrase(item) + '”.'))
    },
    {
      id: 'days', group: 1, icon: '📅', title: 'Name the days', description: 'Match days in English and Spanish and practise spelling them.',
      questions: [
        ...days.map(([day, es], i) => choice('Which day is “' + es + '”?', pickThree(dayNames, i), day, day + ' means ' + es + '.')),
        ...days.map(([day, es]) => write('Write the day in English. ' + es + '.', day, 'Write “' + day + '” with a capital letter.')),
        match('Match the English days to their Spanish names.', days.slice(0, 4), 'Monday, Tuesday, Wednesday and Thursday are the first four days of our week.'),
        match('Match the English days to their Spanish names.', days.slice(4), 'Friday, Saturday and Sunday come after Thursday.')
      ]
    },
    {
      id: 'day-order', group: 1, icon: '🗓️', title: 'Put the week in order', description: 'Order the days and find the day before or after.',
      questions: [
        order('Tap the days in order, starting with Monday.', dayNames, 'Monday comes first in this week, and Sunday comes last.'),
        ...days.slice(0, 6).map(([day], i) => choice('What day comes after ' + day + '?', pickThree(dayNames, i + 1), dayNames[i + 1], dayNames[i + 1] + ' comes after ' + day + '.')),
        ...days.slice(1).map(([day], i) => choice('What day comes before ' + day + '?', pickThree(dayNames, i), dayNames[i], dayNames[i] + ' comes before ' + day + '.'))
      ]
    },
    {
      id: 'do-you', group: 2, icon: '💬', title: 'Complete the question', description: 'Choose play, go or do after “Do you…?”.',
      questions: sports.map(([verb, sport, , icon]) =>
        choice('Do you ___ ' + sport + '?', sportsVerbs, verb, '“Do” starts the question. The sports phrase is “' + verb + ' ' + sport + '”.', icon))
    },
    {
      id: 'short-answers', group: 2, icon: '✅', title: 'Yes, I do. / No, I don’t.', description: 'Give the short answer that matches the cue.',
      questions: sports.map(([verb, sport], i) => {
        const isNo = i % 2 === 1;
        const cue = isNo ? 'no' : 'yes';
        const prompt = 'Do you ' + verb + ' ' + sport + '? Answer ' + cue + '.';
        const answer = replies[Number(isNo)];
        const why = 'For a “Do you…?” question, say “' + answer + '” to answer ' + cue + '.';
        return i >= 8 ? write(prompt, answer, why) :
          choice(prompt, [...replies, isNo ? "No, I doesn't." : 'Yes, I does.'], answer, why);
      })
    },
    {
      id: 'build-questions', group: 2, icon: '🧩', title: 'Build the question', description: 'Tap the words in the right order.',
      questions: sports.slice(0, 9).map(([verb, sport, es, icon]) =>
        ({ ...order('Ask the question in English. ¿Sueles ' + es + '?', ['Do', 'you', verb, sport + '?'], 'The question is “Do you ' + verb + ' ' + sport + '?”'), icon }))
    },
    {
      id: 'yoga', group: 3, icon: '🧘', title: 'Yoga instructions', description: 'Find the meaning of each movement.',
      questions: [
        ...yoga.map(([en, es], i) => choice('Choose the instruction in English. ' + es + '.', pickThree(yogaNames, i), en, '“' + en + '” means “' + es + '”.')),
        ...yoga.map(([en, es], i) => choice('What does “' + en + '” mean?', pickThree(yoga.map(item => item[1]), i), es, '“' + en + '” means “' + es + '”.')),
        match('Match each yoga instruction to its meaning.', yoga.slice(0, 3), 'These instructions tell you which movement to make.'),
        match('Match each yoga instruction to its meaning.', yoga.slice(3), 'These instructions tell you which movement to make.')
      ]
    },
    {
      id: 'write-yoga', group: 3, icon: '🦶', title: 'Finish the yoga instructions', description: 'Write the missing word in each instruction.',
      questions: yoga.map(([en, es, answer]) =>
        write(es + '. ' + en.slice(0, -answer.length) + '___.', answer, 'The instruction is “' + en + '”.'))
    }
  ];

  for (const game of games) {
    game.questions.forEach((question, index) => { question.id = game.id + '-' + (index + 1); });
  }

  const review = [[0, 1, 9], [1, 3, 6], [2, 4, 8], [3, 3, 9, 14], [4, 0, 8], [5, 0, 10], [6, 5, 8], [7, 6], [8, 4, 13], [9, 2, 5]];
  games.push({
    id: 'exam', group: 4, icon: '🏆', title: 'English practice test', description: 'Mix all four topics in one round.',
    questions: review.flatMap(([game, ...indices]) => indices.map(index => games[game].questions[index]))
  });

  const glossary = [...sports.map(item => [phrase(item), item[2]]), ...days, ...yoga,
    ['Do you play football?', '¿Juegas al fútbol?'], ['Do you go swimming?', '¿Vas a nadar?'], ['Do you do karate?', '¿Haces kárate?'],
    [replies[0], 'Sí'], [replies[1], 'No']];
  const theme = {
    storageKey: 'english-tercero-sports',
    subject: 'English',
    title: 'English',
    accent: 'Club',
    unit: 'Sports, days and yoga',
    description: 'Practise the words and questions for your English test.',
    mascot: '🏅'
  };

  return { games, groups, glossary, theme };
})();
