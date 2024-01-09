// This will be the entry point where everything is initialized
import { initScene, camera, renderer, scene, clock } from './SceneSetup.js';
import { addLights } from './Lighting.js';
import { create3DText } from './3DText.js';
import { initAdvancedParticleSystem, updateParticles } from './AdvancedParticleSystem.js';
import { initMouseTrail, updateMouseTrail } from './MouseTrail.js';
import { initCameraAnimation } from './CameraAnimation.js';
import { initBackgroundMusic, initAudioToggle } from './BackgroundMusic.js';
import { MatrixRain } from './MatrixRain.js';
import { initAudioConsent } from './AudioConsent.js';

document.addEventListener('DOMContentLoaded', function() {
  initAudioConsent(); // Initialize the audio consent modal
});

function init() {
  if (typeof THREE === 'undefined' || typeof TWEEN === 'undefined') {
    console.error('Three.js or Tween.js is not loaded');
    return;
  }

  initScene();
  addLights();
  create3DText();
  initAdvancedParticleSystem();
  initMouseTrail();
  initCameraAnimation();
  initBackgroundMusic();
  initAudioToggle();
  MatrixRain.init({
    fontSize: 12,
    fontFamily: 'Courier New, Courier, monospace',
    color: '#00ff00',
    speed: 0.9,
    opacity: 0.2,  // Adjust as needed to make other effects visible
    spacing: 5 // Adjust this value to change the spacing between columns
  });
  
  
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Update time
  let deltaTime = clock.getDelta();

  // Update Mouse Trail
  updateMouseTrail();

  // Update Tween animations
  TWEEN.update();

  updateParticles(); // Update the particles each frame

  // Render the main scene
  renderer.render(scene, camera);
}

init();
