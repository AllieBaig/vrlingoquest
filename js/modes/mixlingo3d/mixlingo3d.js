
/*
1. Purpose: Entry point for MixLingo 3D game mode; initialize scene, load words, start rendering.
2. Key features: Scene setup, render word options, start animations.
3. Dependencies: sceneManager.js, tileRenderer.js, wordAnimator.js
4. Related helpers: (to be linked) logic.js for MCQ logic
5. Function names: startMixLingo3D
6. MIT License: https://github.com/AllieBaig/vrlingoquest/blob/main/LICENSE
7. Timestamp: 2025-06-23 18:35 | File: js/modes/mixlingo3d/mixlingo3d.js
*/

import { initScene } from '../../3d/sceneManager.js';
import { addWordTiles } from '../../3d/tileRenderer.js';
import { startAnimationLoop } from '../../3d/wordAnimator.js';

// Temporary sample words (will come from logic.js later)
const sampleWords = ['chien', 'chat', 'oiseau', 'cheval'];

export function startMixLingo3D() {
    console.log('[mixlingo3d] Starting MixLingo 3D mode...');
    initScene();

    // Slight delay to allow renderer to initialize
    setTimeout(() => {
        addWordTiles(sampleWords);
        startAnimationLoop();
    }, 300);
}
