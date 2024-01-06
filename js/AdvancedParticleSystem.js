import { scene } from './SceneSetup.js';
import { particleSettings } from './ParticleSettings.js';

export let particleSystem;

export function initAdvancedParticleSystem() {
  let particles = new THREE.BufferGeometry();
  let vertices = [];

  for (let i = 0; i < particleSettings.particleCount; i++) {
    let x = Math.random() * particleSettings.positionSpread.x - particleSettings.positionSpread.x / 2;
    let y = Math.random() * particleSettings.positionSpread.y - particleSettings.positionSpread.y / 2;
    let z = Math.random() * particleSettings.positionSpread.z - particleSettings.positionSpread.z / 2;
    vertices.push(x, y, z);
  }

  particles.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  let pMaterial = new THREE.PointsMaterial({
    color: particleSettings.particleColor,
    size: particleSettings.size,
    transparent: particleSettings.transparent,
    opacity: particleSettings.opacity,
    blending: particleSettings.blendingMode
  });

  particleSystem = new THREE.Points(particles, pMaterial);
  scene.add(particleSystem);
}

export function updateParticles() {
  if (!particleSystem) {
    console.error("Particle system is not initialized.");
    return;
  }
  
  let positions = particleSystem.geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    // Update positions based on velocity
    positions[i] += (Math.random() * (particleSettings.velocity.x[1] - particleSettings.velocity.x[0])) + particleSettings.velocity.x[0]; // x
    positions[i + 1] += (Math.random() * (particleSettings.velocity.y[1] - particleSettings.velocity.y[0])) + particleSettings.velocity.y[0]; // y
    positions[i + 2] += (Math.random() * (particleSettings.velocity.z[1] - particleSettings.velocity.z[0])) + particleSettings.velocity.z[0]; // z

    // Reset particles that go too high
    if (positions[i] > 500) { 
      positions[i] = -500;
    }
  }
  particleSystem.geometry.attributes.position.needsUpdate = true; // Required after changing the positions
}
