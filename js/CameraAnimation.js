// For managing camera animations
import { camera } from './SceneSetup.js';

export function initCameraAnimation() {
  new TWEEN.Tween(camera.position)
    .to({ z: 2 }, 10000)
    .repeat(Infinity)
    .yoyo(true)
    .start();
}
