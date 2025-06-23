
/*
1. Purpose: Render word tiles into the 3D scene as interactive panels.
2. Key features: Create tiles with text, position them dynamically, prepare for MCQ selection.
3. Dependencies: ../libs/three.module.min.js, sceneManager.js
4. Related helpers: wordAnimator.js
5. Function names: createWordTile, addWordTiles
6. MIT License: https://github.com/AllieBaig/vrlingoquest/blob/main/LICENSE
7. Timestamp: 2025-06-23 18:15 | File: js/3d/tileRenderer.js
*/

import * as THREE from '../libs/three.module.min.js';
import { getSceneComponents } from './sceneManager.js';

// Utility to create texture from text
function createTextTexture(word, width = 256, height = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(word, width / 2, height / 2);
    return new THREE.CanvasTexture(canvas);
}

// Create one word tile
export function createWordTile(word, position = { x: 0, y: 0, z: 0 }) {
    const texture = createTextTexture(word);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(200, 100);
    const tile = new THREE.Mesh(geometry, material);
    tile.position.set(position.x, position.y, position.z);
    tile.userData.word = word; // store word for interaction
    return tile;
}

// Add multiple word tiles into scene
export function addWordTiles(wordList) {
    const { scene } = getSceneComponents();
    const spacing = 250;
    const startX = -((wordList.length - 1) * spacing) / 2;

    wordList.forEach((word, index) => {
        const posX = startX + index * spacing;
        const tile = createWordTile(word, { x: posX, y: 0, z: 0 });
        scene.add(tile);
    });
}
