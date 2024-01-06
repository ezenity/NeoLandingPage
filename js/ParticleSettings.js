// Define settings for your particle system
export const particleSettings = {
  particleCount: 1000,
  // Red: 0xff0000, White: 0xffffff, Blue: 0x0000ff, Silver: 0xc0c0c0
  particleColor: 0xffffff,
  size: 3,
  transparent: true,
  opacity: 8,
  blendingMode: THREE.AdditiveBlending,
  // velocity: { x: [-0.5, 0.5], y: [1, 3], z: [-0.5, 0.5] }, // Range of velocity - Moves down to up
  velocity: {
    x: [1, 3], // Range of velocity along the x-axis
    y: [-1.1, 1.1], // Range of velocity along the y-axis (increase these values to make particles move faster)
    z: [-0.5, 0.5] // Range of velocity along the z-axis
  },
  positionSpread: { x: 1000, y: 500, z: 1000 } // How far from the center particles can spawn
};
