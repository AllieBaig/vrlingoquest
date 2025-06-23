
/*
1. Purpose: Handle MixLingo 3D question logic, random question selection, and MCQ generation.
2. Key features: Load question set, select random question, provide options per difficulty.
3. Dependencies: (to be loaded later) questionsUtils.js for shared utilities.
4. Related helpers: loader.js (for future JSON loading), mixlingo3d.js (to connect rendering)
5. Function names: loadQuestions, getNextQuestion
6. MIT License: https://github.com/AllieBaig/vrlingoquest/blob/main/LICENSE
7. Timestamp: 2025-06-23 18:45 | File: js/modes/mixlingo3d/logic.js
*/

let questions = [];
let usedIds = new Set();

// Temporary static question set
const questionSet = [
    {
        id: 'fr-001',
        sentence: 'The dog is very friendly.',
        correct: 'chien',
        options: ['chien', 'chat', 'oiseau', 'cheval']
    },
    {
        id: 'fr-002',
        sentence: 'The cat sleeps all day.',
        correct: 'chat',
        options: ['chat', 'chien', 'cheval', 'oiseau']
    }
    // Add more questions later
];

// Simulated loader
export function loadQuestions() {
    console.log('[logic] Loading questions...');
    questions = questionSet;
    usedIds.clear();
}

// Get random unused question
export function getNextQuestion(difficulty = 'easy') {
    const available = questions.filter(q => !usedIds.has(q.id));
    if (available.length === 0) {
        console.log('[logic] No more questions available.');
        return null;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex];
    usedIds.add(selected.id);

    let numOptions = 2;
    if (difficulty === 'medium') numOptions = 3;
    if (difficulty === 'hard') numOptions = 4;

    // Shuffle and limit options
    const shuffled = shuffleArray(selected.options).slice(0, numOptions);
    if (!shuffled.includes(selected.correct)) {
        shuffled[0] = selected.correct; // Ensure correct answer is present
        shuffleArray(shuffled);
    }

    return {
        id: selected.id,
        sentence: selected.sentence,
        correct: selected.correct,
        options: shuffled
    };
}

// Utility shuffle
function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}
