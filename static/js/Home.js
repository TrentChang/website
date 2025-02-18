import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Initialize scene, camera, and renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(w, h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();
scene.background = null;

// Configure OrbitControls to only allow rotation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zoom
controls.enablePan = false; // Disable panning
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2; // Lock the distance
controls.maxDistance = 2; // Lock the distance

// Geometry and Materials
const geo = new THREE.IcosahedronGeometry(0.8, 4);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
  metalness: 0.5,
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
  transparent: true,
  opacity: 0.3,
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// Improved Lighting
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
scene.add(hemiLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Handle window resize
window.addEventListener(
  "resize",
  () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
  },
  false
);

// Animation loop
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  requestAnimationFrame(animate);

  // Smooth auto-rotation (optional - comment out if you only want manual rotation)
  mesh.rotation.y = elapsedTime * 0.3;

  // Update controls
  controls.update();

  renderer.render(scene, camera);
}

// Position the canvas
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "-5px";
renderer.domElement.style.left = "200px";
renderer.domElement.style.zIndex = "3";

// Start animation
animate();
