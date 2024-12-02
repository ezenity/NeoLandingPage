import { scene } from './SceneSetup.js';
import helvetikerFont from '../fonts/helvetiker_regular.typeface.json'; // Adjust based on your project structure

let mesh, textMaterial, loader;
const phrases = [
  '"Welcome to the Matrix"',
  '"The Matrix Has You"',
  '"Enter the Matrix"',
  '"Reality is a Simulation"',
  '"Red Pill or Blue Pill?"',
  '"Follow the White Rabbit"',
  '"Break Free from the Matrix"',
  '"Question Reality"',
  '"Awaken Your Mind"',
  '"Escape the Construct"'
];
let currentPhraseIndex = 0;

export function create3DText() {
  loader = new THREE.FontLoader();
  textMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true, opacity: 0.7 });

  updateText();
  window.addEventListener('resize', updateText); // Update text on window resize
}

function updateText() {
  // Remove existing text mesh from the scene
  if (mesh) {
    scene.remove(mesh);
  }

  // Dynamically determine text size and position based on window width
  const windowWidth = window.innerWidth;
  let textSize = 0.4, textPositionY = 0.6; // Desktops and larger screens

  if (windowWidth < 480) { // Small mobile devices
    textSize = 0.1;
    textPositionY = 0.9;
  } else if (windowWidth < 768) { // Medium mobile devices
    textSize = 0.2;
    textPositionY = 1;
  } else if (windowWidth < 1024) { // Tablets
    textSize = 0.3;
    textPositionY = 1;
  }

  // Load new text
  loader.load(helvetikerFont, function (font) {
    let geometry = new THREE.TextGeometry(phrases[currentPhraseIndex], {
      font: font,
      size: textSize,
      height: 0.2
    });

    geometry.center();
    mesh = new THREE.Mesh(geometry, textMaterial);
    mesh.position.set(0, textPositionY, 2);
    scene.add(mesh);
  });

  // Update the phrase index
  currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
}

// Call updateText() every x seconds
setInterval(updateText, 10000); // Change every 10 seconds
