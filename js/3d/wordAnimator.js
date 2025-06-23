
/*
1. Purpose: Animate word tiles with simple floating and rotation effects.
2. Key features: Frame-based animation, rotation, vertical floating effect.
3. Dependencies: ../libs/three.module.min.js, sceneManager.js
4. Related helpers: tileRenderer.js
5. Function names: animateScene, startAnimationLoop
6. MIT License: https://github.com/AllieBaig/vrlingoquest/blob/main/LICENSE
7. Timestamp: 2025-06-23 18:25 | File: js/3d/wordAnimator.js
*/

import { getSceneComponents } from './sceneManager.js';

let animationId = null;
let startTime = null;

export function startAnimationLoop() {
    console.log('[wordAnimator] Starting animation loop...');
    startTime = Date.now();
    animateScene();
}

function animateScene() {
    const { scene, renderer, camera } = getSceneComponents();
    const elapsed = (Date.now() - startTime) / 1000; // seconds

    scene.traverse((object) => {
        if (object.isMesh) {
            // Gentle rotation
            object.rotation.y = Math.sin(elapsed + object.position.x * 0.01) * 0.2;

            // Floating effect
            object.position.y = Math.sin(elapsed + object.position.x * 0.05) * 20;
        }
    });

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animateScene);
}

export function stopAnimationLoop() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
