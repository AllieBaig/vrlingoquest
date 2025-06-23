
/*
1. Purpose: Load MixLingo question data from external JSON files.
2. Key features: Fetch JSON file, parse data, handle errors.
3. Dependencies: none (pure fetch API)
4. Related helpers: logic.js (for setting loaded questions)
5. Function names: fetchQuestionData
6. MIT License: https://github.com/AllieBaig/vrlingoquest/blob/main/LICENSE
7. Timestamp: 2025-06-23 18:55 | File: js/modes/mixlingo3d/loader.js
*/

export async function fetchQuestionData(language = 'fr') {
    const filePath = `assets/questions/mixlingo-${language}.json`;
    console.log(`[loader] Fetching question data from ${filePath}`);

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        console.log(`[loader] Loaded ${data.length} questions.`);
        return data;
    } catch (error) {
        console.error('[loader] Failed to load question data:', error);
        return [];
    }
}
