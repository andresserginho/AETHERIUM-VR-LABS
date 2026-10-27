export const projectsData = [
    {
        title: "Turismo Santander",
        description: "Plataforma interactiva de turismo regional accesible enfocada en experiencias inmersivas y promoción cultural.",
        status: "Desplegado / Activo",
        link: "https://dev.turismo-santander.desarrollos-pablo-carvajal.com/"
    },
    {
        title: "Supermarket Sena Tycoon",
        description: "Simulación interactiva empresarial y gestión comercial estilo Tycoon en entornos 3D/VR.",
        status: "Desplegado / Activo",
        link: "https://supermarket-sena-tycoon.vercel.app/"
    },
    {
        title: "Meta Login",
        description: "Sistema de autenticación inmersivo e interactivo diseñado para plataformas y entornos virtuales.",
        status: "Desplegado / Activo",
        link: "https://meta-login-sigma.vercel.app/"
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
            <div class="card card-project">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="card-footer">
                    <span class="badge">${p.status}</span>
                    <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="btn-link">🔗 Visitar Sitio</a>
                </div>
            </div>
        `).join('');
    }

    const teamGrid = document.getElementById('team-grid');
    if (teamGrid) {
        teamGrid.innerHTML = teamData.map(t => `
            <div class="card card-team">
                <h3>${t.name}</h3>
                <p class="role-text">${t.role}</p>
                <a href="${t.github}" target="_blank" rel="noopener noreferrer" class="btn-primary">Ver GitHub</a>
            </div>
        `).join('');
    }
}