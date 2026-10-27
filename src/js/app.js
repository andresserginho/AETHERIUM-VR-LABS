import { VRSceneManager } from './three/vrScene.js';
import { renderContent } from './components/teamManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const vrScene = new VRSceneManager('webgl-container');
    renderContent();

    // Toggle del menú desplegable de accesibilidad
    const toggleBtn = document.getElementById('accessibility-toggle');
    const menu = document.getElementById('accessibility-menu');

    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            menu.classList.remove('active');
        });

        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Controles de Accesibilidad
    const btnContrast = document.getElementById('btn-contrast');
    const btnTextInc = document.getElementById('btn-text-inc');
    const btnTextDec = document.getElementById('btn-text-dec');
    const btnMotion = document.getElementById('btn-motion');

    let currentScale = 1;

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }

    if (btnTextInc) {
        btnTextInc.addEventListener('click', () => {
            if (currentScale < 1.3) {
                currentScale += 0.08;
                document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
            }
        });
    }

    if (btnTextDec) {
        btnTextDec.addEventListener('click', () => {
            if (currentScale > 0.85) {
                currentScale -= 0.08;
                document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
            }
        });
    }

    if (btnMotion) {
        btnMotion.addEventListener('click', () => {
            vrScene.toggleAnimation();
            btnMotion.textContent = vrScene.isPaused ? "▶️ Reanudar Animación" : "⏸️ Pausar Animación";
        });
    }
});