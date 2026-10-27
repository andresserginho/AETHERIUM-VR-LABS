import * as THREE from 'three';

export class VRSceneManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00f0ff, 2, 50);
        pointLight.position.set(2, 3, 4);
        this.scene.add(pointLight);

        this.createMetaverseElements();
        this.addListeners();
        this.animate();
    }

    createMetaverseElements() {
        const geometry = new THREE.IcosahedronGeometry(1.5, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x0077ff,
            wireframe: true,
            roughness: 0.2,
            metalness: 0.8
        });

        this.coreMesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.coreMesh);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 200;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00f0ff
        });

        this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particlesMesh);
    }

    addListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        if (this.coreMesh) {
            this.coreMesh.rotation.x += 0.003;
            this.coreMesh.rotation.y += 0.005;
        }

        if (this.particlesMesh) {
            this.particlesMesh.rotation.y -= 0.001;
        }

        this.renderer.render(this.scene, this.camera);
    }
}