import { area1Questions } from './area_1.js';
import { area2Questions } from './area_2.js';
import { area3Questions } from './area_3.js';
import { area4Questions } from './area_4.js';
import { area5Questions } from './area_5.js';
import { area6Questions } from './area_6.js';


document.addEventListener('DOMContentLoaded', () => {

    // --- DICCIONARIO DE TEXTOS UI ---
    const uiText = {
        es: {
            areas_conocimiento: "Áreas de Conocimiento",
            area_1: "Automatización del SDLC",
            area_2: "Gestión de Configuración e IaC",
            area_3: "Soluciones de Nube Resilientes",
            area_4: "Monitoreo y Registros",
            area_5: "Respuesta a Incidentes y Eventos",
            area_6: "Seguridad y Cumplimiento",
            welcome_title: "Desafío Flashcards DOP-C02",
            welcome_subtitle: "Selecciona un área para iniciar el desafío.",
            puntuacion: "Puntuación",
            pregunta: "Pregunta",
            respuesta_correcta_label: "Respuesta Correcta:",
            siguiente_pregunta: "Siguiente Pregunta",
            results_title: "¡Desafío Completado!",
            results_subtitle: "Tu puntuación final es:",
            reintentar: "Reintentar",
            proximamente_title: "Próximamente",
            proximamente_subtitle: "Aún no hay preguntas para el área de {area}.",
            feedback_correcto: "¡Correcto!",
            feedback_incorrecto: "¡Incorrecto!"
        }
        // English translations would go here
    };
    
    // --- ELEMENTOS DEL DOM ---
    const welcomeMessage = document.getElementById('welcome-message');
    const gameContainer = document.getElementById('game-container');
    const areaTitle = document.getElementById('area-title');
    const mobileAreaTitle = document.getElementById('mobile-area-title');
    const scoreEl = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    const cardInner = document.getElementById('card-inner');
    const cardCounter = document.getElementById('card-counter');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackHeader = document.getElementById('feedback-header');
    const explanationText = document.getElementById('explanation-text');
    const correctAnswerText = document.getElementById('correct-answer-text');
    const nextButton = document.getElementById('next-button');
    const resultsScreen = document.getElementById('results-screen');
    const finalScore = document.getElementById('final-score');
    const retryButton = document.getElementById('retry-button');
    const areaMenu = document.getElementById('area-menu');
    
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileSidebarOverlay = document.getElementById('mobile-sidebar-overlay');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileAreaMenu = document.getElementById('mobile-area-menu');


    // --- ESTADO DEL JUEGO ---
    let allFlashcards = [];
    let currentFlashcards = [];
    let currentIndex = 0;
    let score = 0;
    let currentArea = null;
    let currentLanguage = 'es'; // Default language

    // --- LÓGICA DEL JUEGO ---
    function initialize() {
        allFlashcards = [
            ...area1Questions,
            ...area2Questions,
            ...area3Questions,
            ...area4Questions,
            ...area5Questions,
            ...area6Questions
        ];

        // Clonar menú para móvil
        const menuLinks = areaMenu.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            const clone = link.cloneNode(true);
            mobileAreaMenu.appendChild(clone);
        });

        // Asignar eventos
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const area = e.target.dataset.area;
                startGame(area);
                // Cerrar menú móvil si está abierto
                if (document.body.classList.contains('mobile-menu-open')) {
                    toggleMobileMenu();
                }
            });
        });

        nextButton.addEventListener('click', showNextCard);
        retryButton.addEventListener('click', () => startGame(currentArea));
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
        mobileSidebarOverlay.addEventListener('click', toggleMobileMenu);

        // Iniciar juego si hay un parámetro en la URL
        const urlParams = new URLSearchParams(window.location.search);
        const areaParam = urlParams.get('area');
        if (areaParam) {
            startGame(areaParam);
        }
    }

    function toggleMobileMenu() {
        document.body.classList.toggle('mobile-menu-open');
        mobileSidebarOverlay.classList.toggle('hidden');
        mobileSidebar.classList.toggle('-translate-x-full');
    }

    function startGame(area) {
        currentArea = area;
        currentFlashcards = allFlashcards.filter(card => card.area.toString() === area);
        const areaName = uiText[currentLanguage][`area_${area}`];
        
        if (currentFlashcards.length === 0) {
            welcomeMessage.innerHTML = `<div class="text-center">
                <h2 class="text-2xl font-bold mb-2">${uiText[currentLanguage].proximamente_title}</h2>
                <p class="text-gray-600">${uiText[currentLanguage].proximamente_subtitle.replace('{area}', areaName)}</p>
            </div>`;
            welcomeMessage.classList.remove('hidden');
            gameContainer.classList.add('hidden');
            resultsScreen.classList.add('hidden');
            updateMenuHighlight();
            return;
        }
        
        currentFlashcards.sort(() => Math.random() - 0.5); // Aleatorizar preguntas

        currentIndex = 0;
        score = 0;

        welcomeMessage.classList.add('hidden');
        resultsScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        nextButton.classList.add('hidden');

        updateScore();
        displayCard();
        updateMenuHighlight();
    }
    
    function displayCard() {
        cardInner.classList.remove('flipped');
        
        setTimeout(() => {
            const card = currentFlashcards[currentIndex];
            questionText.textContent = card.pregunta;
            cardCounter.textContent = `${currentIndex + 1} / ${currentFlashcards.length}`;
            
            const areaName = uiText[currentLanguage][`area_${currentArea}`];
            areaTitle.textContent = areaName;
            mobileAreaTitle.textContent = areaName;
            
            optionsContainer.innerHTML = '';
            card.opciones.forEach(opcion => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = opcion;
                button.onclick = () => handleOptionClick(opcion, card.respuesta_correcta, button);
                optionsContainer.appendChild(button);
            });

            explanationText.textContent = card.explicacion;
            correctAnswerText.textContent = card.respuesta_correcta;
            updateProgressBar();
        }, 300);
    }

    function handleOptionClick(selectedOption, correctAnswer, button) {
        const isCorrect = selectedOption === correctAnswer;
        
        if (isCorrect) {
            score += 10;
            button.classList.add('correct');
            feedbackHeader.innerHTML = `<h2 class="text-2xl font-bold text-green-600">${uiText[currentLanguage].feedback_correcto}</h2>`;
        } else {
            button.classList.add('incorrect');
            feedbackHeader.innerHTML = `<h2 class="text-2xl font-bold text-red-600">${uiText[currentLanguage].feedback_incorrecto}</h2>`;
        }

        updateScore();
        
        Array.from(optionsContainer.children).forEach(btn => {
            btn.disabled = true;
            if (!isCorrect && btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        cardInner.classList.add('flipped');
        nextButton.classList.remove('hidden');
    }

    function showNextCard() {
        currentIndex++;
        if (currentIndex < currentFlashcards.length) {
            nextButton.classList.add('hidden');
            displayCard();
        } else {
            showResults();
        }
    }

    function showResults() {
        gameContainer.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        finalScore.textContent = score;
    }

    function updateScore() {
        scoreEl.textContent = score;
    }

    function updateProgressBar() {
        const progress = ((currentIndex + 1) / currentFlashcards.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function updateMenuHighlight() {
        document.querySelectorAll('.menu-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.area === currentArea) {
                link.classList.add('active');
            }
        });
    }

    initialize();
});
