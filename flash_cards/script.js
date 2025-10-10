import { area1Questions } from './area_1.js';
import { area2Questions } from './area_2.js';
import { area3Questions } from './area_3.js';
import { area4Questions } from './area_4.js';
import { area5Questions } from './area_5.js';
import { area6Questions } from './area_6.js';

// --- State Variables ---
let currentLanguage = 'en';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionsAnswered = false;
let currentArea = 0;

// Combine all questions from global scope
const allQuestions = [
    ...area1Questions,
    ...area2Questions,
    ...area3Questions,
    ...area4Questions,
    ...area5Questions,
    ...area6Questions,
];

const domainInfo = {
    en: [
        {id: 1, name: "SDLC Automation"},
        {id: 2, name: "Config Mgmt & IaC"},
        {id: 3, name: "Resilient Cloud Solutions"},
        {id: 4, name: "Monitoring & Logging"},
        {id: 5, name: "Incident Response"},
        {id: 6, name: "Security & Compliance"}
    ],
    es: [
        {id: 1, name: "Automatización del SDLC"},
        {id: 2, name: "Gestión de Config. e IaC"},
        {id: 3, name: "Soluciones de Nube Resilientes"},
        {id: 4, name: "Monitoreo y Registros"},
        {id: 5, name: "Respuesta a Incidentes"},
        {id: 6, name: "Seguridad y Cumplimiento"}
    ]
};

// --- Sound Effects ---
let synth;
const playSound = (note, duration) => {
    if (typeof Tone === 'undefined') return;
    if (!synth) {
        synth = new Tone.Synth().toDestination();
    }
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    synth.triggerAttackRelease(note, duration);
}

// --- UI Elements ---
const screens = {
    welcome: document.getElementById('welcome-screen'),
    game: document.getElementById('game-screen'),
    end: document.getElementById('end-screen'),
};

const elements = {
    domainMenu: document.getElementById('domain-menu'),
    langEnBtn: document.getElementById('lang-en-btn'),
    langEsBtn: document.getElementById('lang-es-btn'),
    mainContent: document.getElementById('main-content'),
    
    // Welcome
    welcomeTitle: document.getElementById('welcome-title'),
    welcomeText: document.getElementById('welcome-text'),

    // Game
    questionCounter: document.getElementById('question-counter'),
    scoreDisplay: document.getElementById('score'),
    progressBar: document.getElementById('progress-bar'),
    card: document.getElementById('card'),
    questionText: document.getElementById('question-text'),
    explanationTitle: document.getElementById('explanation-title'),
    explanationText: document.getElementById('explanation-text'),
    optionsContainer: document.getElementById('options-container'),
    nextQuestionBtn: document.getElementById('next-question'),
    
    // End
    endTitle: document.getElementById('end-title'),
    finalScore: document.getElementById('final-score-text'),
    finalPercentage: document.getElementById('final-percentage-text'),
    playAgainBtn: document.getElementById('play-again'),
    mainMenuBtn: document.getElementById('main-menu'),

    // Mobile Menu
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileSidebar: document.getElementById('mobile-sidebar'),
    mobileSidebarOverlay: document.getElementById('mobile-sidebar-overlay'),
    sidebar: document.getElementById('sidebar'),
};

const translations = {
    en: {
        welcomeTitle: "Welcome!",
        welcomeText: "Select a domain from the sidebar to start practicing for your AWS DOP-C02 certification.",
        explanation: "Explanation",
        nextQuestion: "Next Question",
        quizComplete: "Quiz Complete!",
        finalScore: "Final Score:",
        playAgain: "Play This Domain Again",
        mainMenu: "Back to Main Menu",
    },
    es: {
        welcomeTitle: "¡Bienvenido!",
        welcomeText: "Selecciona un dominio de la barra lateral para comenzar a practicar para tu certificación AWS DOP-C02.",
        explanation: "Explicación",
        nextQuestion: "Siguiente Pregunta",
        quizComplete: "¡Prueba Completa!",
        finalScore: "Puntaje Final:",
        playAgain: "Jugar este Dominio de Nuevo",
        mainMenu: "Volver al Menú Principal",
    }
};

// --- Functions ---
const showMainContent = (screenName) => {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    if (screens[screenName]) {
        screens[screenName].classList.remove('hidden');
    }
};

const parseText = (text) => {
    if (!text || !text.includes('/')) return text;
    const parts = text.split('/').map(p => p.trim());
    return currentLanguage === 'es' ? (parts[1] || parts[0]) : parts[0];
};

const updateUIText = () => {
    const t = translations[currentLanguage];
    elements.welcomeTitle.textContent = t.welcomeTitle;
    elements.welcomeText.textContent = t.welcomeText;
    elements.explanationTitle.textContent = t.explanation;
    elements.nextQuestionBtn.textContent = t.nextQuestion;
    elements.endTitle.textContent = t.quizComplete;
    elements.playAgainBtn.textContent = t.playAgain;
    elements.mainMenuBtn.textContent = t.mainMenu;
    buildDomainMenu();
};

const setLanguage = (lang) => {
    if (currentLanguage === lang) return;
    currentLanguage = lang;
    updateUIText();
    // Update active language button style
    document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.classList.toggle('bg-blue-500', btn.dataset.lang === lang);
        btn.classList.toggle('text-white', btn.dataset.lang === lang);
    });
};

const buildDomainMenu = () => {
    const domains = domainInfo[currentLanguage];
    elements.domainMenu.innerHTML = '';
    domains.forEach(domain => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'menu-link';
        link.dataset.area = domain.id;
        link.textContent = domain.name;
        link.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            startGame(domain.id);
            closeMobileMenu();
        };
        elements.domainMenu.appendChild(link);
    });
    // Clone for mobile menu
    elements.mobileSidebar.innerHTML = elements.sidebar.innerHTML;
    // Re-attach listeners for cloned mobile elements
    elements.mobileSidebar.querySelectorAll('.menu-link').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
            // Highlight both desktop and mobile links
            document.querySelector(`.menu-link[data-area='${link.dataset.area}']`).classList.add('active');
            link.classList.add('active');
            startGame(parseInt(link.dataset.area));
            closeMobileMenu();
        };
    });
    elements.mobileSidebar.querySelectorAll('[data-lang]').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const startGame = (area) => {
    currentArea = area;
    currentQuestions = shuffleArray([...allQuestions.filter(q => q.area === area)]);
    currentQuestionIndex = 0;
    score = 0;
    elements.scoreDisplay.textContent = `Score: 0`;
    showMainContent('game');
    displayQuestion();
};

const displayQuestion = () => {
    if (currentQuestionIndex >= currentQuestions.length) {
        showEndScreen();
        return;
    }

    questionsAnswered = false;
    const question = currentQuestions[currentQuestionIndex];

    elements.card.classList.remove('flipped');
    elements.nextQuestionBtn.classList.add('hidden');

    elements.questionText.textContent = parseText(question.pregunta);
    elements.explanationText.textContent = parseText(question.explicacion);
    elements.questionCounter.textContent = `Q ${currentQuestionIndex + 1}/${currentQuestions.length}`;
    elements.scoreDisplay.textContent = `Score: ${score}`;
    elements.progressBar.style.width = `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;

    elements.optionsContainer.innerHTML = '';
    const options = shuffleArray([...question.opciones]);
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `<span class="font-semibold">${parseText(option)}</span>`;
        button.onclick = () => selectAnswer(button, option, question.respuesta_correcta);
        elements.optionsContainer.appendChild(button);
    });
};

const selectAnswer = (selectedButton, selectedOptionText, correctOptionText) => {
    if (questionsAnswered) return;
    questionsAnswered = true;

    const isCorrect = parseText(selectedOptionText) === parseText(correctOptionText);

    if (isCorrect) {
        score++;
        playSound('C5', '8n');
        selectedButton.classList.add('correct');
    } else {
        playSound('A3', '8n');
        selectedButton.classList.add('incorrect');
    }
    elements.scoreDisplay.textContent = `Score: ${score}`;

    Array.from(elements.optionsContainer.children).forEach(button => {
        button.disabled = true;
        const buttonText = button.querySelector('span').textContent;
        if (buttonText === parseText(correctOptionText) && !isCorrect) {
            button.classList.add('correct');
        }
    });

    setTimeout(() => {
        elements.card.classList.add('flipped');
        elements.nextQuestionBtn.classList.remove('hidden');
    }, 800);
};

const showEndScreen = () => {
    showMainContent('end');
    const percentage = currentQuestions.length > 0 ? ((score / currentQuestions.length) * 100).toFixed(0) : 0;
    const t = translations[currentLanguage];
    elements.finalScore.textContent = `${t.finalScore} ${score}/${currentQuestions.length}`;
    elements.finalPercentage.textContent = `${percentage}%`;
};

const openMobileMenu = () => {
    elements.mobileSidebarOverlay.classList.remove('hidden');
    elements.mobileSidebar.classList.remove('-translate-x-full');
    document.body.classList.add('mobile-menu-open');
}
const closeMobileMenu = () => {
    elements.mobileSidebarOverlay.classList.add('hidden');
    elements.mobileSidebar.classList.add('-translate-x-full');
    document.body.classList.remove('mobile-menu-open');
}

// --- Event Listeners ---
const initialize = () => {
    setLanguage('en'); // Set default language
    showMainContent('welcome');

    elements.langEnBtn.addEventListener('click', () => setLanguage('en'));
    elements.langEsBtn.addEventListener('click', () => setLanguage('es'));

    elements.nextQuestionBtn.onclick = () => {
        currentQuestionIndex++;
        displayQuestion();
    };

    elements.playAgainBtn.onclick = () => startGame(currentArea);
    elements.mainMenuBtn.onclick = () => showMainContent('welcome');
    
    // Mobile Menu listeners
    elements.mobileMenuBtn.addEventListener('click', openMobileMenu);
    elements.mobileSidebarOverlay.addEventListener('click', closeMobileMenu);
};

// Initialize the app once the DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);


