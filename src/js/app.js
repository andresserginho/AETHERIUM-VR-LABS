import { VRSceneManager } from './three/vrScene.js';
import { renderContent } from './components/teamManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el escenario 3D del metaverso
    const vrScene = new VRSceneManager('webgl-container');

    // Inyectar contenido dinámico de proyectos y equipo
    renderContent();

    console.log("Aetherium VR Labs Engine initialized successfully.");
});