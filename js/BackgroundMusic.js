// For handling backgroud music and its controls.
import { camera } from './SceneSetup.js';

let audioListener, sound, audioLoader;
let soundEnabled = true;

export function initBackgroundMusic() {
  audioListener = new THREE.AudioListener();
  camera.add(audioListener);

  sound = new THREE.Audio(audioListener);
  audioLoader = new THREE.AudioLoader();
  audioLoader.load('sounds/matrix_theme.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(soundEnabled ? 0.5 : 0);
    sound.play();
  }, undefined, function(e) {
    console.error('Error loading audio:', e);
  });
}

let lastToggleTime = 0;
let isToggleInitialized = false; // variable to track if the toggle has been initialized

export function initAudioToggle() {
  if (isToggleInitialized) return; // Prevent multiple initializations

  let audioToggleBtn = document.getElementById('audioToggle');
  audioToggleBtn.addEventListener('click', function() {
    const now = Date.now();
    if (now - lastToggleTime < 300) { // 300 milliseconds debounce period
      console.log('Toggled too quickly. Ignoring.');
      return;
    }
    lastToggleTime = now;
    
    console.log('Before toggle - Sound enabled:', soundEnabled);
    // If the AudioContext is suspended, resume it
    if (THREE.AudioContext.getContext().state === 'suspended') {
      THREE.AudioContext.getContext().resume();
    }
    
    soundEnabled = !soundEnabled; // Toggle the sound state
    sound.setVolume(soundEnabled ? 0.5 : 0); // Set volume based on soundEnabled

    // Update button text and aria-pressed attribute based on soundEnabled
    audioToggleBtn.textContent = soundEnabled ? 'Mute Sound' : 'Unmute Sound';
    audioToggleBtn.setAttribute('aria-pressed', soundEnabled.toString());

    console.log('After toggle - Sound enabled:', soundEnabled);
  });
  
  isToggleInitialized = true; // Set to true after initializing
}
