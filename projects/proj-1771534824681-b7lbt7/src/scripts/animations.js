// Initialize 3.js scene and animations
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('animation-container').appendChild(renderer.domElement);

// Optimize performance by reducing the number of objects and using simpler geometries
const geometry = new THREE.SphereGeometry(0.1, 8, 8); // Reduced detail for better performance
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
const spheres = [];

for (let i = 0; i < 20; i++) { // Further reduced number of spheres
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
    spheres.push(sphere);
    scene.add(sphere);
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    spheres.forEach(sphere => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}

// Optimize rendering performance
const render = () => {
    renderer.render(scene, camera);
};

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Optimize loading time by deferring the loading of music
const music = document.getElementById('background-music');
music.volume = 0.5; // Set initial volume
window.addEventListener('load', () => {
    music.play();
});