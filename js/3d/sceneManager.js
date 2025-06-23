
/*
1. Purpose: Initialize and manage the main Three.js 3D scene.
2. Key features: Scene setup, renderer creation, orthographic camera, resize handling.
3. Dependencies: ../libs/three.module.min.js (local import), DOM container with id="gameCanvas"
4. Related helpers: tileRenderer.js, wordAnimator.js
5. Function names: initScene, getSceneComponents, resizeRenderer
6. MIT License: https://github.com/AllieBaig/vrlingoquest/blob/main/LICENSE
7. Timestamp: 2025-06-23 18:05 | File: js/3d/sceneManager.js
*/

import * as THREE from '../libs/three.module.min.js';

let scene, camera, renderer;

export function initScene() {
    console.log('[sceneManager] Initializing scene...');
    const container = document.getElementById('gameCanvas');
    if (!container) {
        console.error('Missing DOM element: #gameCanvas');
        return;
    }

    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Orthographic Camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.OrthographicCamera(
        width / -2, width / 2, height / 2, height / -2, 0.1, 1000
    );
    camera.position.z = 500;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', resizeRenderer);
}

export function getSceneComponents() {
    return { scene, camera, renderer };
}

function resizeRenderer() {
    const container = document.getElementById('gameCanvas');
    if (!container || !renderer || !camera) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);

    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.updateProjectionMatrix();
}
