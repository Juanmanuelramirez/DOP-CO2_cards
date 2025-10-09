// Importar el contenido de cada área desde sus archivos dedicados
import { area1Content } from './area_1.js';
import { area2Content } from './area_2.js';
import { area3Content } from './area_3.js';
import { area4Content } from './area_4.js';
import { area5Content } from './area_5.js';
import { area6Content } from './area_6.js';


document.addEventListener('DOMContentLoaded', () => {

    // Combinar todos los datos importados en un solo objeto para la aplicación
    const studyData = {
        '1': area1Content,
        '2': area2Content,
        '3': area3Content,
        '4': area4Content,
        '5': area5Content,
        '6': area6Content,
    };

    // ========================================================================
    //  LÓGICA DE LA APLICACIÓN
    // ========================================================================
    const mainMenu = document.getElementById('main-menu');
    const topicGrid = document.getElementById('topic-grid');
    const studyView = document.getElementById('study-view');
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarNav = document.getElementById('sidebar-nav');
    const studyContent = document.getElementById('study-content');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');

    // --- Inicialización ---
    function init() {
        renderMainMenu();
        backToMenuBtn.addEventListener('click', showMainMenu);
    }

    // --- Renderizado del Menú Principal ---
    function renderMainMenu() {
        topicGrid.innerHTML = '';
        Object.keys(studyData).forEach(id => {
            const topic = studyData[id];
            const card = document.createElement('div');
            card.className = 'topic-card cursor-pointer p-6 flex flex-col items-center text-center fade-in';
            card.style.animationDelay = `${id * 100}ms`;
            card.innerHTML = `
                <div class="icon-container p-4 rounded-full text-white mb-4">${topic.icon}</div>
                <h2 class="text-2xl font-bold">${topic.title}</h2>
            `;
            card.addEventListener('click', () => showStudyView(id));
            topicGrid.appendChild(card);
        });
    }

    // --- Transiciones de Vista ---
    function showStudyView(topicId) {
        mainMenu.classList.add('fade-out');
        setTimeout(() => {
            mainMenu.style.display = 'none';
            studyView.style.display = 'block';
            studyView.classList.remove('slide-out-left');
            studyView.classList.add('slide-in-right');
            renderStudySection(topicId, 0); // Mostrar la primera sección por defecto
        }, 500);
    }

    function showMainMenu() {
        studyView.classList.remove('slide-in-right');
        studyView.classList.add('slide-out-left');
        setTimeout(() => {
            studyView.style.display = 'none';
            mainMenu.style.display = 'block';
            mainMenu.classList.remove('fade-out');
        }, 500);
    }

    // --- Renderizado del Contenido de Estudio ---
    function renderStudySection(topicId, sectionIndex) {
        const topic = studyData[topicId];
        sidebarTitle.textContent = topic.title;

        // Renderizar navegación del sidebar
        sidebarNav.innerHTML = '';
        topic.sections.forEach((section, index) => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = section.title;
            link.className = 'sub-topic-link block p-3 rounded-lg';
            if (index === sectionIndex) {
                link.classList.add('active');
            }
            link.addEventListener('click', (e) => {
                e.preventDefault();
                renderStudySection(topicId, index);
            });
            sidebarNav.appendChild(link);
        });

        // Renderizar contenido principal
        studyContent.innerHTML = topic.sections[sectionIndex].content;
        document.querySelector('#study-view main').scrollTop = 0; // Reset scroll
    }
    
    init();
});

