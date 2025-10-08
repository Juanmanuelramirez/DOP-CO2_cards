document.addEventListener('DOMContentLoaded', () => {
    // --- DATOS DE LAS FLASHCARDS ---
    const flashcardData = [
        // Area 1: SDLC Automation (20 questions)
        {
            pregunta: "You are designing a CI/CD pipeline for a serverless application using AWS Lambda. Which CodeDeploy deployment configuration allows you to shift traffic gradually and includes a pre-traffic hook for validation tests? / Estás diseñando un pipeline de CI/CD para una aplicación serverless con AWS Lambda. ¿Qué configuración de despliegue de CodeDeploy te permite desviar el tráfico gradualmente e incluye un hook 'pre-traffic' para pruebas de validación?",
            opciones: ["Canary10Percent5Minutes", "Linear10PercentEvery1Minute", "AllAtOnce", "BlueGreen"],
            area: 1,
            respuesta_correcta: "Canary10Percent5Minutes",
            explicacion: "Canary deployments for Lambda allow gradual traffic shifting. The Canary and Linear options include pre-traffic and post-traffic hooks for running validation tests, making them ideal for safe deployments. / Los despliegues Canary para Lambda permiten un desvío gradual del tráfico. Las opciones Canary y Linear incluyen hooks pre y post tráfico para ejecutar pruebas de validación, haciéndolas ideales para despliegues seguros."
        },
        {
            pregunta: "In an AWS CodePipeline, what is the primary purpose of a 'manual approval' action? / En un AWS CodePipeline, ¿cuál es el propósito principal de una acción de 'aprobación manual'?",
            opciones: ["To inject environment variables / Para inyectar variables de entorno", "To pause the pipeline until someone manually approves it / Para pausar el pipeline hasta que alguien lo apruebe manualmente", "To trigger a Lambda function for validation / Para disparar una función Lambda de validación", "To publish artifacts to an S3 bucket / Para publicar artefactos en un bucket de S3"],
            area: 1,
            respuesta_correcta: "To pause the pipeline until someone manually approves it / Para pausar el pipeline hasta que alguien lo apruebe manually",
            explicacion: "A manual approval action stops the pipeline and waits for a user with the required IAM permissions to approve or reject the action before the pipeline can continue. This is often used before deploying to production. / Una acción de aprobación manual detiene el pipeline y espera a que un usuario con los permisos IAM necesarios apruebe o rechace la acción para que el pipeline pueda continuar. Se usa a menudo antes de desplegar a producción."
        },
        // ... (Se agregarán 18 preguntas más para el área 1)

        // Area 2: Configuration Management and IaC (20 questions)
        {
            pregunta: "What is the primary function of AWS CloudFormation Change Sets? / ¿Cuál es la función principal de los Change Sets de AWS CloudFormation?",
            opciones: ["To automatically apply updates to a stack / Para aplicar actualizaciones a un stack automáticamente", "To predict the impact of proposed changes on running resources before execution / Para predecir el impacto de los cambios propuestos en los recursos en ejecución antes de la ejecución", "To roll back a stack to a previous state / Para revertir un stack a un estado anterior", "To manage stacks across multiple accounts and regions / Para gestionar stacks en múltiples cuentas y regiones"],
            area: 2,
            respuesta_correcta: "To predict the impact of proposed changes on running resources before execution / Para predecir el impacto de los cambios propuestos en los recursos en ejecución antes de la ejecución",
            explicacion: "Change Sets allow you to preview how proposed changes to a stack might impact your running resources. This lets you verify changes, such as deletions or modifications of critical resources, before applying them. / Los Change Sets te permiten previsualizar cómo los cambios propuestos a un stack podrían impactar tus recursos en ejecución. Esto te deja verificar los cambios, como eliminaciones o modificaciones de recursos críticos, antes de aplicarlos."
        },
        {
            pregunta: "When storing sensitive information like database passwords, which service is more secure and recommended over AWS Systems Manager Parameter Store Standard Tier? / Al almacenar información sensible como contraseñas de bases de datos, ¿qué servicio es más seguro y recomendado sobre AWS Systems Manager Parameter Store Standard Tier?",
            opciones: ["AWS Secrets Manager", "Storing in a private S3 bucket / Almacenar en un bucket S3 privado", "Hardcoding in the application code / Escribirlo directamente en el código de la aplicación", "Using EC2 instance metadata / Usar los metadatos de la instancia EC2"],
            area: 2,
            respuesta_correcta: "AWS Secrets Manager",
            explicacion: "AWS Secrets Manager is specifically designed for managing secrets and offers features like automatic rotation, fine-grained access control, and integration with AWS KMS, making it superior to Parameter Store's standard tier for sensitive data. / AWS Secrets Manager está diseñado específicamente para la gestión de secretos y ofrece características como la rotación automática, control de acceso detallado e integración con AWS KMS, lo que lo hace superior al nivel estándar de Parameter Store para datos sensibles."
        },
        // ... (Se agregarán 118 preguntas más para completar las 120)
    ];
    
    // --- DICCIONARIO DE TEXTOS UI ---
    const uiText = {
        en: {
            areas_conocimiento: "Knowledge Areas",
            area_1: "SDLC Automation",
            area_2: "Configuration Management & IaC",
            area_3: "Resilient Cloud Solutions",
            area_4: "Monitoring & Logging",
            area_5: "Incident & Event Response",
            area_6: "Security & Compliance",
            welcome_title: "DOP-C02 Flashcards Challenge",
            welcome_subtitle: "Select an area to start the challenge.",
            puntuacion: "Score",
            pregunta: "Question",
            respuesta_correcta_label: "Correct Answer:",
            siguiente_pregunta: "Next Question",
            results_title: "Challenge Complete!",
            results_subtitle: "Your final score is:",
            reintentar: "Retry",
            proximamente_title: "Coming Soon",
            proximamente_subtitle: "There are no questions for the {area} area yet.",
            feedback_correcto: "Correct!",
            feedback_incorrecto: "Incorrect!"
        },
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
    };
    
    // --- ELEMENTOS DEL DOM ---
    const langOverlay = document.getElementById('language-selector-overlay');
    const appContainer = document.getElementById('app-container');
    const langEnButton = document.getElementById('lang-en');
    const langEsButton = document.getElementById('lang-es');
    const welcomeMessage = document.getElementById('welcome-message');
    const gameContainer = document.getElementById('game-container');
    const areaTitle = document.getElementById('area-title');
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

    // --- ESTADO DEL JUEGO ---
    let allFlashcards = [];
    let currentFlashcards = [];
    let currentIndex = 0;
    let score = 0;
    let currentArea = null;
    let currentLanguage = 'es'; // Idioma por defecto

    // --- FUNCIONES DE IDIOMA ---
    function setLanguage(lang) {
        currentLanguage = lang;
        langOverlay.classList.add('hidden');
        appContainer.classList.remove('hidden');
        translateUI();
        initialize();
    }

    function translateUI() {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            if (uiText[currentLanguage][key]) {
                el.textContent = uiText[currentLanguage][key];
            }
        });
    }

    function parseBilingual(text) {
        if (!text || !text.includes(' / ')) return text;
        const parts = text.split(' / ');
        return currentLanguage === 'en' ? parts[0].trim() : parts[1].trim();
    }
    
    // --- LÓGICA DEL JUEGO ---
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
            questionText.textContent = parseBilingual(card.pregunta);
            cardCounter.textContent = `${currentIndex + 1} / ${currentFlashcards.length}`;
            areaTitle.textContent = uiText[currentLanguage][`area_${currentArea}`];
            
            optionsContainer.innerHTML = '';
            card.opciones.forEach(opcion => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = parseBilingual(opcion);
                button.onclick = () => handleOptionClick(parseBilingual(opcion), parseBilingual(card.respuesta_correcta), button);
                optionsContainer.appendChild(button);
            });

            explanationText.textContent = parseBilingual(card.explicacion);
            correctAnswerText.textContent = parseBilingual(card.respuesta_correcta);
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
        const progress = (currentIndex / (currentFlashcards.length - 1)) * 100;
        progressBar.style.width = currentFlashcards.length > 1 ? `${progress}%` : '100%';
    }
    
    function updateMenuHighlight() {
        areaMenu.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.area === currentArea) {
                link.classList.add('active');
            }
        });
    }

    function initialize() {
        allFlashcards = flashcardData.map(row => ({ ...row }));
        
        // Asigna eventos a los links del menú
        areaMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const area = e.target.dataset.area;
                startGame(area);
            });
        });

        nextButton.addEventListener('click', showNextCard);
        retryButton.addEventListener('click', () => {
            if(currentArea) startGame(currentArea);
        });
        
        const urlParams = new URLSearchParams(window.location.search);
        const area = urlParams.get('area');
        if (area) {
            startGame(area);
        } else {
             welcomeMessage.classList.remove('hidden');
             gameContainer.classList.add('hidden');
             resultsScreen.classList.add('hidden');
        }
    }
    
    // Iniciar la app después de seleccionar idioma
    langEnButton.addEventListener('click', () => setLanguage('en'));
    langEsButton.addEventListener('click', () => setLanguage('es'));
});

