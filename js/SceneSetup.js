// For setting up the Three.js scene, camera, and renderer.
export let scene, camera, renderer, clock;

export function initScene() {
  clock = new THREE.Clock();
  
  // Scene
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); // 75, window.innerWidth / window.innerHeight, 0.1, 1000
  // this will make the camera box start out really far (small) then zoom closer (big)
  camera.position.z = 55; // Original 5

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
