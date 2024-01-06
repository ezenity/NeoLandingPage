// For creating and managing 3D text.
import { scene } from './SceneSetup.js';

export function create3DText() {
  let loader = new THREE.FontLoader();
  loader.load('fonts/helvetiker_regular.typeface.json', function(font) {
    let geometry = new THREE.TextGeometry('Coming Soon', {
      font: font,
      size: 0.5,
      height: 0.2
    });
    geometry.center();
    let material = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 0.7 });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -2; // original: -2, sugested: -10
    scene.add(mesh);
  }, undefined, function (error) {
    console.error('An error happened with the font loader:', error);
  });
}
