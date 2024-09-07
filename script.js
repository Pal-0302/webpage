let scene, camera, renderer;
let planets = [];
let messages = {
    Mercury: "Mercury is the smallest planet in our solar system.",
    Venus: "Venus is the hottest planet.",
    Earth: "Earth is our home!",
    Mars: "Mars is known as the Red Planet.",
    Jupiter: "Jupiter is the largest planet in our solar system.",
    Saturn: "Saturn has beautiful rings.",
    Uranus: "Uranus orbits the Sun on its side.",
    Neptune: "Neptune is known for its intense blue color."
};

init();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 50;

    // Create orbits and planets
    createSolarSystem();

    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function createSolarSystem() {
    // Sun
    let sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    let sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    let sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create planets with orbits
    let planetData = [
        { name: 'Mercury', distance: 10, color: 0xa3a3a3 },
        { name: 'Venus', distance: 15, color: 0xff9900 },
        { name: 'Earth', distance: 20, color: 0x0000ff },
        { name: 'Mars', distance: 25, color: 0xff0000 },
        { name: 'Jupiter', distance: 35, color: 0xffa500 },
        { name: 'Saturn', distance: 45, color: 0xf5deb3 },
        { name: 'Uranus', distance: 55, color: 0x00ffff },
        { name: 'Neptune', distance: 65, color: 0x0000ff }
    ];

    planetData.forEach(data => {
        let orbit = new THREE.RingGeometry(data.distance - 0.2, data.distance, 64);
        let orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        let orbitMesh = new THREE.Mesh(orbit, orbitMaterial);
        orbitMesh.rotation.x = Math.PI / 2;
        scene.add(orbitMesh);

        let geometry = new THREE.SphereGeometry(1, 32, 32);
        let material = new THREE.MeshBasicMaterial({ color: data.color });
        let planet = new THREE.Mesh(geometry, material);
        planet.position.x = data.distance;
        planet.name = data.name;
        scene.add(planet);
        planets.push(planet);
    });

    // Add click event listener for planets
    document.addEventListener('click', onPlanetClick);
}

function onPlanetClick(event) {
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
        let planet = intersects[0].object;
        let message = messages[planet.name];
        document.getElementById('message-box').innerText = message;

        // Send message to ESP8266
        sendMessageToESP8266(message);
    }
}

function sendMessageToESP8266(message) {
    fetch('http://<ESP8266_IP_ADDRESS>/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    }).then(response => {
        console.log('Message sent to ESP8266');
    }).catch(error => {
        console.error('Error sending message to ESP8266:', error);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
