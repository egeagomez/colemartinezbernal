'use strict';

window.PracticeContent = (() => {
  const living = ['Living thing', 'Non-living thing'];
  const kinds = ['Living thing', 'Natural non-living thing', 'Artificial non-living thing'];
  const vital = ['Nutrition', 'Interaction', 'Reproduction'];
  const terms = ['Cell', 'Unicellular organism', 'Multicellular organism'];
  const plant = ['Cell wall', 'Chloroplasts', 'Cell membrane', 'Nucleus', 'Large vacuole'];
  const animal = ['Cell membrane', 'Nucleus', 'Small vacuole'];
  const comparison = ['Plant cell', 'Animal cell', 'Both'];
  const levels = ['Cell', 'Tissue', 'Organ', 'Organ system', 'Organism'];
  const kingdoms = ['Plant kingdom', 'Animal kingdom', 'Fungi kingdom', 'Monera kingdom', 'Protist kingdom'];
  const choice = (prompt, options, answer, why, extra = {}) => ({ type: 'choice', prompt, options, answer, why, ...extra });
  const fromRows = (options, rows) => rows.map(([prompt, answer, why, icon]) => choice(prompt, options, options[answer], why, { icon }));
  const match = (prompt, pairs, why) => ({ type: 'match', prompt, pairs, why });
  const order = (prompt, answer, why) => ({ type: 'order', prompt, answer, why });
  const write = (prompt, answer, why, bank = []) => ({ type: 'write', prompt, answer, why, bank });
  const spot = (diagram, part, why) => ({ type: 'spot', diagram, prompt: 'Find the ' + part.toLowerCase() + '.', answer: part, why });
  const label = (diagram, point, options, why) => choice('Which part is at point ' + point + '?', options, options[point - 1], why, { diagram, point });
  const examples = (rows, options) => rows.map(([example, answer, why, icon]) => choice('Which kingdom does ' + example + ' belong to?', options, options[answer], why, { icon }));

  const plantJobs = [
    'The cell wall is the stiff outer layer. It helps the plant keep its shape.',
    'Chloroplasts contain chlorophyll and help the plant use light to make food.',
    'The cell membrane controls what goes in and out of the cell.',
    'The nucleus controls the activities of the cell.',
    'The large vacuole stores water.'
  ];
  const animalJobs = [plantJobs[2], plantJobs[3], 'Small vacuoles can store water and other substances.'];

  const groups = ['Living things', 'Cells', 'Levels of organisation', 'The five kingdoms', 'Exam practice'];
  const games = [
    {
      id: 'living', group: 0, icon: '🌱', title: 'Living or non-living?', description: 'Look at each example and choose its group.',
      questions: fromRows(living, [
        ['Is a rabbit a living thing?', 0, 'A rabbit grows and carries out the vital functions.', '🐇'],
        ['Is a pencil a living thing?', 1, 'A pencil is an object made by people.', '✏️'],
        ['Is a pine tree a living thing?', 0, 'A pine tree is a plant. Plants are living things.', '🌲'],
        ['Is a rock a living thing?', 1, 'A rock is natural and non-living.', '🪨'],
        ['Is a butterfly a living thing?', 0, 'A butterfly is an animal.', '🦋'],
        ['Is the Sun a living thing?', 1, 'The Sun is a star. It is a natural non-living thing.', '☀️'],
        ['Is a frog a living thing?', 0, 'A frog is an animal that grows and reproduces.', '🐸'],
        ['Is a clock a living thing?', 1, 'A clock can move its hands, but it has no cells.', '⏰'],
        ['Is a sunflower a living thing?', 0, 'A sunflower is a plant that grows and can make seeds.', '🌻'],
        ['Is a toy robot a living thing?', 1, 'A toy robot may move, but it has no cells or vital functions.', '🤖']
      ])
    },
    {
      id: 'natural-artificial', group: 0, icon: '🪨', title: 'Three groups', description: 'Sort living things and natural or artificial objects.',
      questions: fromRows(kinds, [
        ['Classify a bicycle.', 2, 'People make bicycles.', '🚲'],
        ['Classify a fern.', 0, 'A fern is a plant.', '🌿'],
        ['Classify rainwater.', 1, 'Rainwater comes from nature and is non-living.', '🌧️'],
        ['Classify a spoon.', 2, 'A spoon is made by people.', '🥄'],
        ['Classify a robin.', 0, 'A robin is a bird.', '🐦'],
        ['Classify a cloud.', 1, 'A cloud forms in nature and has no cells.', '☁️'],
        ['Classify a cotton T-shirt.', 2, 'People make T-shirts. Cotton comes from a plant.', '👕'],
        ['Classify a mushroom growing in a forest.', 0, 'A mushroom is part of a living fungus.', '🍄'],
        ['Classify a mountain rock.', 1, 'A rock comes from nature and is non-living.', '🪨'],
        ['Classify a glass bottle.', 2, 'People make glass bottles.', '🫙'],
        ['Classify a goldfish.', 0, 'A goldfish is a living animal.', '🐠'],
        ['Classify seawater.', 1, 'Seawater is natural and non-living. Living things can live in it.', '🌊']
      ])
    },
    {
      id: 'vital-functions', group: 0, icon: '🐣', title: 'Vital functions', description: 'Choose nutrition, interaction or reproduction.',
      questions: fromRows(vital, [
        ['A goat eats some grass. Which vital function is this?', 0, 'Eating provides nutrients and energy.', '🐐'],
        ['A cat turns its head when it hears a bell.', 1, 'The cat detects a sound and responds to it.', '🐈'],
        ['A hen lays an egg that can develop into a chick.', 2, 'Reproduction makes new living things of the same kind.', '🐣'],
        ['A plant takes in water through its roots.', 0, 'Taking in water is part of plant nutrition.', '🪴'],
        ['A snail hides in its shell when you touch it.', 1, 'The snail senses touch and responds.', '🐌'],
        ['A tomato plant makes seeds that can grow into new plants.', 2, 'Seeds can grow into new plants.', '🍅'],
        ['A child drinks a glass of water.', 0, 'Drinking is part of nutrition.', '💧'],
        ['A plant bends towards light from a window.', 1, 'The plant responds to light in its environment.', '🌤️'],
        ['A dog has puppies.', 2, 'The puppies are new living things of the same kind.', '🐶'],
        ['A plant uses sunlight to make its own food.', 0, 'Making food is part of plant nutrition.', '🌻'],
        ['A rabbit runs away when it sees a fox.', 1, 'The rabbit sees danger and responds.', '🦊'],
        ['A frog produces eggs that can develop into tadpoles.', 2, 'The eggs can develop into new frogs.', '🐸']
      ])
    },
    {
      id: 'cell-basics', group: 1, icon: '🔬', title: 'One cell or many?', description: 'Match the names and definitions.',
      questions: [
        ...fromRows(terms, [
          ['What is the smallest living unit?', 0, 'All living things are made of one or more cells.'],
          ['Which term means a living thing with just one cell?', 1, 'Uni- means one.'],
          ['Which term means a living thing with many cells?', 2, 'Multi- means many.'],
          ['A bacterium has one cell. What is it?', 1, 'A single cell makes up the whole bacterium.'],
          ['An oak tree is made of many cells. What is it?', 2, 'An oak tree is a multicellular organism.'],
          ['Which word describes one tiny living unit inside your body?', 0, 'Your body is made of many cells.']
        ]),
        match('Match each word to its definition.', [
          [terms[0], 'The smallest living unit'],
          [terms[1], 'A living thing with one cell'],
          [terms[2], 'A living thing with many cells']
        ], 'A microscope helps us see very small cells and unicellular organisms.'),
        choice('What helps us see most cells?', ['A microscope', 'A telescope', 'A ruler'], 'A microscope', 'A microscope makes tiny things look larger.')
      ]
    },
    {
      id: 'plant-cell', group: 1, icon: '🌿', title: 'Label the plant cell', description: 'Read a diagram and name its five parts.',
      questions: plant.flatMap((part, i) => [label('plant', i + 1, plant, plantJobs[i]), spot('plant', part, plantJobs[i])])
    },
    {
      id: 'animal-cell', group: 1, icon: '🐾', title: 'Label the animal cell', description: 'Find its membrane, nucleus and small vacuole.',
      questions: animal.flatMap((part, i) => [label('animal', i + 1, animal, animalJobs[i]), spot('animal', part, animalJobs[i])])
    },
    {
      id: 'cell-jobs', group: 1, icon: '🧩', title: 'What does each part do?', description: 'Complete sentences about cell parts.',
      questions: [
        ...fromRows(plant, [
          ['The ___ helps the plant stay rigid.', 0, plantJobs[0]],
          ['___ contain chlorophyll, the green pigment.', 1, plantJobs[1]],
          ['The ___ controls what enters and leaves a cell.', 2, plantJobs[2]],
          ['The ___ controls the activities of the cell.', 3, plantJobs[3]],
          ['The ___ stores water in the plant cell.', 4, plantJobs[4]]
        ]),
        ...fromRows(animal, [
          ['The ___ is the outer boundary of an animal cell.', 0, animalJobs[0]],
          ['In the animal cell, the ___ controls its activities.', 1, animalJobs[1]],
          ['Which part can store water in the animal cell diagram?', 2, animalJobs[2]]
        ]),
        match('Match each part to its job.', [
          [plant[0], 'Gives support'],
          [plant[1], 'Contain chlorophyll'],
          [plant[2], 'Controls what enters and leaves'],
          [plant[3], 'Controls cell activities'],
          [plant[4], 'Stores water in the plant cell']
        ], 'The plant cell diagram includes these five parts.')
      ]
    },
    {
      id: 'compare-cells', group: 1, icon: '⚖️', title: 'Plant cell or animal cell?', description: 'Decide which cell has each feature.',
      questions: fromRows(comparison, [
        ['Which cell has a cell wall?', 0, 'The plant cell has a cell wall outside its membrane.'],
        ['Which cell has a nucleus?', 2, 'Both typical cells in these diagrams have a nucleus.'],
        ['Which cell has chloroplasts in these diagrams?', 0, 'Chloroplasts are shown in the plant cell, where they help make food.'],
        ['Which diagram shows a small vacuole rather than a large central one?', 1, 'The animal cell diagram shows a small vacuole.'],
        ['Which cell has a cell membrane?', 2, 'Both plant and animal cells have a cell membrane.'],
        ['Which diagram shows a large central vacuole?', 0, 'The plant cell diagram shows a large central vacuole.'],
        ['Which cell in these diagrams has neither a cell wall nor chloroplasts?', 1, 'The animal cell has a membrane but no cell wall or chloroplasts.'],
        ['Which cell has a cell membrane and a nucleus together?', 2, 'A membrane and a nucleus appear in both diagrams.']
      ])
    },
    {
      id: 'organisation', group: 2, icon: '🧱', title: 'From cell to organism', description: 'Put the five levels in order and spot examples.',
      questions: [
        order('Tap the five levels from smallest to largest.', levels, 'Cells form tissues, tissues form organs, and organs work together in organ systems.'),
        ...fromRows(levels, [
          ['What level is a single muscle cell?', 0, 'It is one cell, the smallest level in this list.'],
          ['What level is a group of similar cells working together?', 1, 'A group of cells working together makes a tissue.'],
          ['What level is a heart?', 2, 'The heart is an organ made of different tissues.', '🫀'],
          ['What level is the digestive system?', 3, 'The stomach and intestines are organs that work together in this system.'],
          ['What level is a whole horse?', 4, 'A whole horse is one living organism.', '🐎'],
          ['What level is one leaf on a plant?', 2, 'A leaf is a plant organ.', '🍃'],
          ['What level is a whole sunflower, with roots, stem and leaves?', 4, 'All the parts together form one living organism.', '🌻'],
          ['What level comes between tissue and organ system?', 2, 'A tissue is part of an organ. An organ can be part of a system.'],
          ['What level comes just after cell?', 1, 'Groups of cells form tissues.'],
          ['What level comes just before organism?', 3, 'Organ systems work together in a multicellular organism.']
        ]),
        order('Tap the animal examples from smallest to largest.', ['Muscle cell', 'Muscle tissue', 'Heart', 'Circulatory system', 'Horse'], 'The heart is an organ in the circulatory system. The whole horse is the organism.'),
        order('Tap the plant examples from smallest to largest.', ['Leaf cell', 'Leaf tissue', 'Leaf', 'Shoot system', 'Whole plant'], 'A leaf belongs to the shoot system, which includes the stem and leaves above ground.')
      ]
    },
    {
      id: 'kingdom-examples', group: 3, icon: '🍄', title: 'Find the kingdom', description: 'Sort trees, animals, mushrooms, bacteria and algae.',
      questions: examples([
        ['an oak tree', 0, 'Trees are plants.', '🌳'],
        ['a dolphin', 1, 'A dolphin is a mammal.', '🐬'],
        ['a mushroom', 2, 'A mushroom is part of a fungus.', '🍄'],
        ['a bacterium', 3, 'In the five-kingdom model used in class, bacteria belong to Monera.'],
        ['an alga like the ones in the unit', 4, 'The unit uses algae as its example of protists.', '🌊'],
        ['a rose bush', 0, 'A rose bush is a plant.', '🌹'],
        ['a butterfly', 1, 'A butterfly is an insect, and insects are animals.', '🦋'],
        ['a yeast cell used in bread', 2, 'Yeast is a fungus, even though it has one cell.', '🍞'],
        ['a bacterium living in your gut', 3, 'Some bacteria live inside other living things.'],
        ['an amoeba from a pond', 4, 'An amoeba is a common example of a protist.'],
        ['grass', 0, 'Grass is a plant.', '🌱'],
        ['a human', 1, 'Humans are mammals, so they belong to the animal kingdom.', '🧍']
      ], kingdoms)
    },
    {
      id: 'kingdom-clues', group: 3, icon: '🔎', title: 'Kingdom detectives', description: 'Use clues about food, habitat and size.',
      questions: [
        ...fromRows(kingdoms, [
          ['Which kingdom includes organisms such as trees that use sunlight to make food?', 0, 'Green plants use light to make food.'],
          ['Which kingdom includes animals that get food by eating plants, other animals or both?', 1, 'Animals get their food from other living things.'],
          ['Which kingdom includes mushrooms that get nutrients from dead leaves and wood?', 2, 'Many fungi break down dead material to get nutrients.'],
          ['Which kingdom includes tiny bacteria, some of which live inside us?', 3, 'Monera is the group used for bacteria in this unit.'],
          ['Which kingdom includes the algae in our unit, often found in or near water?', 4, 'Algae are the example of protists in the unit.'],
          ['Which kingdom includes fish, birds and reptiles?', 1, 'Fish, birds and reptiles are all animals.'],
          ['Which kingdom includes grass and bushes?', 0, 'Grass and bushes are both plants.'],
          ['Which kingdom includes mushrooms and yeast?', 2, 'Mushrooms and yeast belong to the fungi kingdom.'],
          ['Which kingdom includes the bacteria in yoghurt?', 3, 'In the model from the unit, bacteria are grouped in Monera.']
        ]),
        match('Match each kingdom to one example.', [
          [kingdoms[0], 'Pine tree'], [kingdoms[1], 'Sparrow'], [kingdoms[2], 'Mushroom'],
          [kingdoms[3], 'Bacteria'], [kingdoms[4], 'Algae']
        ], 'These are the five kingdoms used in this unit.')
      ]
    },
    {
      id: 'write-words', group: 4, icon: '✏️', title: 'Write the science words', description: 'Type key words and give an example for each kingdom.',
      questions: [
        write('Write the name of the smallest living unit.', ['cell', 'a cell'], 'A cell is the smallest living unit.'),
        write('Write the vital function that makes new living things of the same kind.', ['reproduction'], 'Reproduction makes new living things.'),
        write('Write the name of the cell part that controls its activities.', ['nucleus', 'the nucleus'], plantJobs[3]),
        write('Write the level between cell and organ.', ['tissue', 'a tissue'], 'Cells form tissues, and tissues form organs.'),
        write('Write the level that means a complete living thing.', ['organism', 'living thing', 'an organism', 'a living thing'], 'An organism is a complete living thing.'),
        ...[
          ['plant', ['tree', 'pine tree', 'oak tree', 'grass', 'bush', 'rose bush', 'sunflower', 'fern', 'rose'], 'A tree is an example of a plant.'],
          ['animal', ['frog', 'bird', 'butterfly', 'fish', 'dog', 'cat', 'human', 'rabbit', 'elephant', 'horse', 'dolphin', 'lizard', 'bee'], 'A frog is an example of an animal.'],
          ['fungi', ['mushroom', 'mushrooms', 'yeast', 'mould', 'mold'], 'A mushroom is an example from the fungi kingdom.'],
          ['Monera', ['bacteria', 'bacterium'], 'Bacteria are the example of Monera in this unit.'],
          ['protist', ['algae', 'alga', 'amoeba'], 'Algae are the example of protists in this unit.']
        ].map(([name, answers, why]) => write('Write one example from the ' + name + ' kingdom. You can use the word bank.', answers, why, ['algae', 'bacteria', 'frog', 'mushroom', 'tree']))
      ]
    }
  ];

  for (const game of games) {
    game.questions.forEach((question, i) => { question.id = game.id + '-' + (i + 1); });
  }

  const review = [[0, 9], [1, 1, 5], [2, 1, 3, 8], [3, 6], [4, 2, 9], [5, 0, 3], [6, 3], [7, 0], [8, 0, 6], [9, 3], [10, 9], [11, 8]];
  games.push({
    id: 'exam', group: 4, icon: '🏆', title: 'Unit 1 practice test', description: 'A mixed round covering all six exam topics.',
    questions: review.flatMap(([game, ...indices]) => indices.map(index => games[game].questions[index]))
  });

  const diagrams = {
    plant: {
      title: 'Plant cell',
      parts: plant,
      clues: ['thick outer border', 'small green oval', 'thin inner border', 'purple circle', 'large blue shape']
    },
    animal: {
      title: 'Animal cell',
      parts: animal,
      clues: ['outer border', 'purple circle', 'small blue circle']
    }
  };

  const glossary = [
    ['Living thing / non-living thing', 'Ser vivo / elemento no vivo'],
    ['Natural / artificial (made by people)', 'Natural / artificial (fabricado por personas)'],
    ['Nutrition / interaction / reproduction', 'Nutrición / relación / reproducción'],
    ['Cell / unicellular / multicellular', 'Célula / unicelular / pluricelular'],
    ['Cell wall / cell membrane', 'Pared celular / membrana celular'],
    ['Chloroplasts / nucleus', 'Cloroplastos / núcleo'],
    ['Large vacuole / small vacuole', 'Vacuola grande / vacuola pequeña'],
    ['Cell → tissue → organ → organ system → organism', 'Célula → tejido → órgano → aparato o sistema → organismo'],
    ['Plants / animals / fungi / Monera / protists', 'Plantas / animales / hongos / moneras / protistas']
  ];

  const theme = {
    storageKey: 'science-tercero-unit-1',
    subject: 'Science',
    title: 'Science',
    accent: 'Lab',
    unit: 'Unit 1 · Living things',
    description: 'Explore living things, look inside cells and get ready for your Science test.',
    mascot: '🔬',
    familyNote: 'Los cinco reinos siguen el modelo que usa la unidad.'
  };

  return { games, groups, diagrams, glossary, theme };
})();
