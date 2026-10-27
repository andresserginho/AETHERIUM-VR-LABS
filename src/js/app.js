import { VRSceneManager } from './three/vrScene.js';
import { renderContent } from './components/teamManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // 🛡️ SEGURIDAD: Prevenir almacenamiento persistente en el cliente
    try {
        window.localStorage.clear();
        window.sessionStorage.clear();
    } catch (e) {
        console.warn("Storage restricted.");
    }

    const vrScene = new VRSceneManager('webgl-container');
    renderContent();

    // Banner de Cookies Esenciales
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAcceptCookies = document.getElementById('btn-accept-cookies');

    if (btnAcceptCookies && cookieBanner) {
        btnAcceptCookies.addEventListener('click', () => {
            cookieBanner.style.display = 'none';
        });
    }

    // Modal Hábeas Data
    const openPolicy = document.getElementById('open-policy');
    const closePolicy = document.getElementById('close-policy');
    const policyModal = document.getElementById('policy-modal');

    if (openPolicy && policyModal && closePolicy) {
        openPolicy.addEventListener('click', (e) => {
            e.preventDefault();
            policyModal.classList.add('active');
            policyModal.setAttribute('aria-hidden', 'false');
        });

        closePolicy.addEventListener('click', () => {
            policyModal.classList.remove('active');
            policyModal.setAttribute('aria-hidden', 'true');
        });
    }

    // Toggle Menú Accesibilidad
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
    }

    // Controles Accesibilidad
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
            if (currentScale < 1.25) {
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

    // 🛡️ SEGURIDAD ESTRICTA Y VALIDACIONES DE ENTRADA
    const quoteForm = document.getElementById('quote-form');
    const formStatus = document.getElementById('form-status');

    // Lista negra de palabras ofensivas (Español e Inglés)
    const profanityList = [
        'puta', 'mierda', 'idiota', 'estupido', 'estúpido', 'cabron', 'cabrón', 'pendejo', 'marica', 'zorra', 'imbecil', 'imbécil',
        'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'pussy', 'slut'
    ];

    function containsProfanity(text) {
        const lowerText = text.toLowerCase();
        return profanityList.some(word => lowerText.includes(word));
    }

    function containsSQLorXSS(text) {
        // Detecta patrones maliciosos de inyección SQL, comandos o etiquetas script
        const sqlXssPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE|EXEC|DECLARE)\b)|(--)|(;|<\s*script.*?>|['"]\s*(=|OR|AND))/i;
        return sqlXssPattern.test(text);
    }

    if (quoteForm && formStatus) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('fullName').value.trim();
            const messageInput = document.getElementById('message').value.trim();
            const emailInput = document.getElementById('email').value.trim();
            const combinedText = nameInput + " " + messageInput + " " + emailInput;

            // Validación 1: Seguridad contra Inyección SQL y XSS
            if (containsSQLorXSS(combinedText)) {
                formStatus.style.color = '#ff4444';
                formStatus.textContent = '❌ Error de seguridad: Se han detectado caracteres o patrones no permitidos (posible inyección de código).';
                return;
            }

            // Validación 2: Filtro de Groserías (Español e Inglés)
            if (containsProfanity(combinedText)) {
                formStatus.style.color = '#ff4444';
                formStatus.textContent = '❌ Error de contenido: El formulario contiene lenguaje inapropiado o ofensivo.';
                return;
            }

            formStatus.style.color = 'var(--accent-cyan)';
            formStatus.textContent = 'Verificando seguridad y enviando cotización...';

            const formData = new FormData(quoteForm);

            // 🛡️ OFUSCACIÓN DE ENDPOINT PRIVADO (mgakbvl protegido en memoria)
            const p1 = "https://form";
            const p2 = "spree.io/f/";
            const p3 = "mgaakbvl";
            const secureEndpoint = p1 + p2 + p3;

            try {
                const response = await fetch(secureEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.color = '#00ff88';
                    formStatus.textContent = '¡Cotización enviada con éxito! Recibirás respuesta directa en metaversossenacset@gmail.com.';
                    quoteForm.reset();
                } else {
                    throw new Error('Error al procesar el envío.');
                }
            } catch (error) {
                formStatus.style.color = '#ff4444';
                formStatus.textContent = '⚠️ Error en el envío seguro. Por favor, verifique su conexión e intente nuevamente.';
            }
        });
    }
});