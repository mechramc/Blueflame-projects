let scene, camera, renderer;

function initFlyingMathSymbols() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const symbols = ['+', '-', '×', '÷', '=', '√', '∫', '∑'];
    const geometry = new THREE.TextGeometry('', { font: new THREE.FontLoader().load('path/to/font.json'), size: 1, height: 0.1 });
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    symbols.forEach(symbol => {
        const textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
        scene.add(textMesh);
    });

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    scene.children.forEach(symbol => {
        symbol.position.x += (Math.random() - 0.5) * 0.1;
        symbol.position.y += (Math.random() - 0.5) * 0.1;
    });
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});