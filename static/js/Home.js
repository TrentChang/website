import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

// Set up the renderer
const w = 1000; // Fixed width of the canvas
const h = 750; // Fixed height of the canvas
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency with alpha: true
renderer.setSize(w, h); // Set renderer to the fixed size
document.body.appendChild(renderer.domElement);

// Set up camera and scene
const fov = 90;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10; // Move the camera further away to fit the bigger model
const scene = new THREE.Scene();

// Set the background to transparent
scene.background = null; // This will remove the background

// Set up controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.enableZoom = false; // Disable zoom functionality

// Add a hemisphere light to the scene
const hemilight = new THREE.HemisphereLight(0xffffff);
scene.add(hemilight);

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the .gltf model (replace with your model path)
loader.load(
  "./models/your_model/scene.gltf", // Replace with your model's path
  (gltf) => {
    const model = gltf.scene;

    // Set the position of the model at the same position as the sphere
    model.position.set(0, 0, 0); // Position it at the center of the scene
    scene.add(model); // Add the loaded model to the scene
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.error(error);
  }
);

// Animation loop
function animate(t = 0) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();
