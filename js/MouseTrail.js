// For creating an updating the mouse trail effect.
import { scene, camera } from './SceneSetup.js';

let mouseTrail, trailGeometry, trailMaterial;
let mouse = { x: 0, y: 0 };
let trailCount = 50;

export function initMouseTrail() {
  trailGeometry = new THREE.BufferGeometry();
  let positions = new Float32Array(trailCount * 3);
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  trailMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 1.5, transparent: true, opacity: 0.5 });
  mouseTrail = new THREE.Points(trailGeometry, trailMaterial);
  scene.add(mouseTrail);

  document.addEventListener('mousemove', onDocumentMouseMove, true);
}

export function updateMouseTrail() {
  let positions = mouseTrail.geometry.attributes.position.array;
  let mousePos = new THREE.Vector3(mouse.x * window.innerWidth * 0.5, mouse.y * window.innerHeight * 0.5, camera.position.z - 5);
  
  positions[0] = mousePos.x;
  positions[1] = mousePos.y;
  positions[2] = mousePos.z;

  for (let i = 3; i < trailCount * 3; i += 3) {
    positions[i] = THREE.MathUtils.lerp(positions[i], positions[i - 3], 0.5);
    positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], positions[i - 2], 0.5);
    positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], positions[i - 1], 0.5);
  }

  mouseTrail.geometry.attributes.position.needsUpdate = true;
}

function onDocumentMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
