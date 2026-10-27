import * as THREE from 'three';

export class VRSceneManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.isPaused = false;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 7;

        // Luces tenues
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00f0ff, 2, 40);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        this.createSubtleMetaverse();
        this.addListeners();
        this.animate();
    }

    createSubtleMetaverse() {
        // Núcleo 3D refinado ubicado a la derecha para no obstruir texto
        const geometry = new THREE.IcosahedronGeometry(1.6, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00f0ff,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });

        this.coreMesh = new THREE.Mesh(geometry, material);
        this.coreMesh.position.set(3.5, 0, -2);
        this.scene.add(this.coreMesh);

        // Nube de estrellas/partículas flotantes
        const count = 400;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 18;
        }

        const partGeo = new THREE.BufferGeometry();
        partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const partMat = new THREE.PointsMaterial({
            size: 0.025,
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(partGeo, partMat);
        this.scene.add(this.particles);
    }

    addListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    toggleAnimation() {
        this.isPaused = !this.isPaused;
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        if (!this.isPaused) {
            if (this.coreMesh) {
                this.coreMesh.rotation.x += 0.002;
                this.coreMesh.rotation.y += 0.003;
            }
            if (this.particles) {
                this.particles.rotation.y -= 0.0005;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}