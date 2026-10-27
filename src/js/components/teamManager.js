export const projectsData = [
    {
        title: "AetherVerse Core",
        description: "Entorno virtual interactivo multiusuario optimizado para visualización arquitectónica e industrial.",
        status: "Comercializado"
    },
    {
        title: "Nexus VR Training",
        description: "Simulador de entrenamiento de alta precisión para operaciones críticas en entornos industriales.",
        status: "Desarrollado & Vendido"
    }
];

export const teamData = [
    {
        name: "Andrés",
        role: "Co-Fundador & Lead Software Architect",
        github: "https://github.com/andresserginho"
    },
    {
        name: "David Ramirez",
        role: "Co-Fundador & Systems Engineer",
        github: "https://github.com/manolora67-cloud"
    },
    {
        name: "Javier Armando",
        role: "Co-Fundador & Immersive Tech Developer",
        github: "https://github.com/moz-glitch"
    }
];

export function renderContent() {
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = projectsData.map(p => `
            <div class="card">
                <h3>${p.title}</h3>
                <p style="color: var(--text-muted); margin: 0.5rem 0 1rem 0;">${p.description}</p>
                <span style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600;">Estado: ${p.status}</span>
            </div>
        `).join('');
    }

    const teamGrid = document.getElementById('team-grid');
    if (teamGrid) {
        teamGrid.innerHTML = teamData.map(t => `
            <div class="card">
                <h3>${t.name}</h3>
                <p style="color: var(--text-muted); margin: 0.5rem 0 1rem 0;">${t.role}</p>
                <a href="${t.github}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 0.4rem 1rem; font-size: 0.85rem;">Ver Perfil de GitHub</a>
            </div>
        `).join('');
    }
}