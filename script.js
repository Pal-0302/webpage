// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1a2a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

// Sun (central star)
const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 }); // Golden Sun
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Array to store planets and their corresponding messages
const planets = [];
const planetMessages = [
  "Mercury: The smallest planet!",
  "Venus: Brightest in the sky!",
  "Earth: Our home planet!",
  "Mars: The
