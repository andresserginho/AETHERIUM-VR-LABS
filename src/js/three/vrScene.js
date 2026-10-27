import * as THREE from 'three';

export class VRSceneManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 6;

        // Iluminación espacial
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const cyanLight = new THREE.PointLight(0x00f0ff, 3, 50);
        cyanLight.position.set(3, 3, 3);
        this.scene.add(cyanLight);

        const blueLight = new THREE.PointLight(0x0077ff, 3, 50);
        blueLight.position.set(-3, -3, 2);
        this.scene.add(blueLight);

        this.createDynamicCore();
        this.addListeners();
        this.animate();
    }

    createDynamicCore() {
        this.coreGroup = new THREE.Group();

        // Núcleo principal 3D (Icosaedro)
        const coreGeo = new THREE.IcosahedronGeometry(1.4, 2);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x00f0ff,
            wireframe: true,
            roughness: 0.1,
            metalness: 0.9
        });
        this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
        this.coreGroup.add(this.coreMesh);

        // Anillo orbital exterior
        const ringGeo = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
        this.ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
        this.coreGroup.add(this.ringMesh1);

        // Segundo anillo inclinado
        this.ringMesh2 = new THREE.Mesh(
            new THREE.TorusGeometry(2.7, 0.015, 16, 100),
            new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true })
        );
        this.ringMesh2.rotation.x = Math.PI / 3;
        this.coreGroup.add(this.ringMesh2);

        this.scene.add(this.coreGroup);

        // Nube de partículas holográficas
        const particlesCount = 350;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMat = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.8
        });

        this.particlesMesh = new THREE.Points(particlesGeo, particlesMat);
        this.scene.add(this.particlesMesh);
    }

    addListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
            this.mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
        });
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        // Interpolación suave hacia el mouse (Parallax)
        this.targetX += (this.mouseX - this.targetX) * 0.05;
        this.targetY += (this.mouseY - this.targetY) * 0.05;

        if (this.coreGroup) {
            this.coreGroup.rotation.y += 0.005;
            this.coreGroup.rotation.x = this.targetY * 2;
            this.coreGroup.rotation.z = this.targetX * 2;
        }

        if (this.coreMesh) {
            this.coreMesh.rotation.x += 0.004;
        }

        if (this.ringMesh1) {
            this.ringMesh1.rotation.z -= 0.008;
        }

        if (this.ringMesh2) {
            this.ringMesh2.rotation.y += 0.006;
        }

        if (this.particlesMesh) {
            this.particlesMesh.rotation.y -= 0.0008;
        }

        this.renderer.render(this.scene, this.camera);
    }
}