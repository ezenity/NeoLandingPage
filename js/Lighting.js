// For adding ambient and directional lights.
import { scene } from './SceneSetup.js';

export function addLights() {
  // Ambient light
  let ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  // Directional light
  let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);
}
