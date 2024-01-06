import { initBackgroundMusic, initAudioToggle } from './BackgroundMusic.js';
import { MatrixRain } from './MatrixRain.js';

export function initAudioConsent() {
  var audioConsentModal = document.getElementById('audioConsentModal');
  var playAudioButton = document.getElementById('playAudio');

  // Check if the user has already given consent
  // if (!localStorage.getItem('audioConsentGiven')) {
    // Show the modal if they haven't
    audioConsentModal.style.display = 'flex';
  // }

  playAudioButton.addEventListener('click', function() {
    // User gives consent to play audio
    // localStorage.setItem('audioConsentGiven', 'true');
    audioConsentModal.style.display = 'none';  // Hide the modal

    // Initialize the background music and other components
    initBackgroundMusic();
    initAudioToggle();
    MatrixRain.init({
      fontSize: 14,
      fontFamily: 'Courier New, Courier, monospace',
      color: '#00ff00',
      speed: 0.15
    });

    // Since the user interacted, it's safe to start the audio
  });
}
