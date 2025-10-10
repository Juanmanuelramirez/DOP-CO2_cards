// --- Import Question Data ---
import { area1Questions } from './area_1.js';
import { area2Questions } from './area_2.js';
import { area3Questions } from './area_3.js';
import { area4Questions } from './area_4.js';
import { area5Questions } from './area_5.js';
import { area6Questions } from './area_6.js';

const allQuestions = [
    ...area1Questions,
    ...area2Questions,
    ...area3Questions,
    ...area4Questions,
    ...area5Questions,
    ...area6Questions,
];

// --- State Variables ---
let currentLanguage = 'en';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionsAnswered = false;

// --- Sound Effects ---
let synth;
const playSound = (note, duration) => {
    // Initialize Tone.js on the first user interaction
    if (!synth) {
        if (typeof Tone === 'undefined') return;
        synth = new Tone.Synth().toDestination();
    }
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
    synth.triggerAttackRelease(note, duration);
}

// --- UI Elements ---
const screens = {
    language: document.getElementById('language-screen'),
    domain: document.getElementById('domain-screen'),
    game: document.getElementById('game-screen'),
    end: document.getElementById('end-screen'),
};

const elements = {
    // Language/Domain
    langEnBtn: document.getElementById('lang-en'),
    langEsBtn: document.getElementById('lang-es'),
    domainTitle: document.getElementById('domain-title'),
    backToLangBtn: document.getElementById('back-to-lang'),
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
    backToMenuBtn: document.getElementById('back-to-menu'),
    // End
    endTitle: document.getElementById('end-title'),
    finalScore: document.getElementById('final-score-text'),
    finalPercentage: document.getElementById('final-percentage-text'),
    playAgainBtn: document.getElementById('play-again'),
    mainMenuBtn: document.getElementById('main-menu'),
};

const translations = {
    en: {
        selectDomain: "Select Domain",
        back: "Back",
        explanation: "Explanation",
        nextQuestion: "Next Question",
        backToMenu: "Menu",
        quizComplete: "Quiz Complete!",
        finalScore: "Final Score:",
        finalPercentage: "Accuracy:",
        playAgain: "Play Again",
        mainMenu: "Main Menu",
    },
    es: {
        selectDomain: "Selecciona Dominio",
        back: "Volver",
        explanation: "Explicación",
        nextQuestion: "Siguiente Pregunta",
        backToMenu: "Menú",
        quizComplete: "¡Prueba Completa!",
        finalScore: "Puntaje Final:",
        finalPercentage: "Precisión:",
        playAgain: "Jugar de Nuevo",
        mainMenu: "Menú Principal",
    }
};

// --- Functions ---
const showScreen = (screenName) => {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
};

const parseText = (text) => {
    if (!text || !text.includes('/')) return text;
    const parts = text.split('/').map(p => p.trim());
    return currentLanguage === 'es' ? parts[1] : parts[0];
};

const updateUIText = () => {
    const t = translations[currentLanguage];
    elements.domainTitle.textContent = t.selectDomain;
    elements.backToLangBtn.textContent = t.back;
    elements.explanationTitle.textContent = t.explanation;
    elements.nextQuestionBtn.textContent = t.nextQuestion;
    elements.backToMenuBtn.textContent = t.backToMenu;
    elements.endTitle.textContent = t.quizComplete;
    elements.playAgainBtn.textContent = t.playAgain;
    elements.mainMenuBtn.textContent = t.mainMenu;
}

const setLanguage = (lang) => {
    currentLanguage = lang;
    updateUIText();
    showScreen('domain');
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const startGame = (area) => {
    currentQuestions = shuffleArray(allQuestions.filter(q => q.area === area));
    currentQuestionIndex = 0;
    score = 0;
    elements.scoreDisplay.textContent = `Score: 0`;
    showScreen('game');
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
        playSound('C4', '8n');
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
    }, 500);
};

const showEndScreen = () => {
    showScreen('end');
    const percentage = currentQuestions.length > 0 ? ((score / currentQuestions.length) * 100).toFixed(0) : 0;
    const t = translations[currentLanguage];
    elements.finalScore.textContent = `${t.finalScore} ${score}/${currentQuestions.length}`;
    elements.finalPercentage.textContent = `${percentage}%`;
};

// --- Event Listeners ---
const initialize = () => {
    elements.langEnBtn.onclick = () => {
        playSound('C4', '8n');
        setLanguage('en');
    };
    elements.langEsBtn.onclick = () => {
        playSound('C4', '8n');
        setLanguage('es');
    };
    elements.backToLangBtn.onclick = () => showScreen('language');
    
    document.querySelectorAll('.domain-btn').forEach(button => {
        button.onclick = () => startGame(parseInt(button.dataset.area));
    });

    elements.nextQuestionBtn.onclick = () => {
        currentQuestionIndex++;
        displayQuestion();
    };

    elements.backToMenuBtn.onclick = () => showScreen('domain');
    elements.playAgainBtn.onclick = () => startGame(currentQuestions[0].area);
    elements.mainMenuBtn.onclick = () => showScreen('domain');
};

// Initialize the app once the DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);
