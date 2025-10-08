document.addEventListener('DOMContentLoaded', () => {
    // --- DATOS DE LAS FLASHCARDS ---
    const flashcardData = [
        {
            pregunta: "¿Qué servicio de AWS se utiliza para automatizar la implementación de software en una variedad de servicios de cómputo como Amazon EC2, AWS Fargate, AWS Lambda y servidores locales?",
            opciones: ["AWS CodeDeploy", "AWS CodePipeline", "AWS CodeBuild", "AWS CloudFormation"],
            area: 1,
            respuesta_correcta: "AWS CodeDeploy",
            explicacion: "AWS CodeDeploy es un servicio que automatiza las implementaciones de código en instancias de Amazon EC2, funciones de AWS Lambda o clústeres de Amazon ECS, así como en servidores locales."
        },
        {
            pregunta: "En una canalización de CI/CD, ¿cuál es el propósito principal de AWS CodeBuild?",
            opciones: ["Orquestar el flujo de trabajo", "Compilar el código fuente y ejecutar pruebas", "Almacenar artefactos de compilación", "Versionar el código fuente"],
            area: 1,
            respuesta_correcta: "Compilar el código fuente y ejecutar pruebas",
            explicacion: "AWS CodeBuild es un servicio de integración continua totalmente administrado que compila el código fuente, ejecuta pruebas y produce paquetes de software listos para implementar."
        },
        {
            pregunta: "¿Qué herramienta de IaC (Infraestructura como Código) es nativa de AWS y utiliza plantillas en formato JSON o YAML para aprovisionar recursos?",
            opciones: ["Terraform", "Ansible", "AWS CloudFormation", "Pulumi"],
            area: 2,
            respuesta_correcta: "AWS CloudFormation",
            explicacion: "AWS CloudFormation te permite modelar y configurar tus recursos de Amazon Web Services para que puedas pasar menos tiempo administrando esos recursos y más tiempo centrándote en tus aplicaciones."
        },
        {
            pregunta: "Para asegurar que las instancias EC2 en un Auto Scaling Group tengan una configuración consistente, ¿qué servicio de AWS es el más adecuado para crear 'imágenes doradas'?",
            opciones: ["AWS Systems Manager", "Amazon Machine Image (AMI)", "AWS OpsWorks", "Docker Hub"],
            area: 2,
            respuesta_correcta: "Amazon Machine Image (AMI)",
            explicacion: "Una AMI (Amazon Machine Image) proporciona la información necesaria para lanzar una instancia. Crear una AMI personalizada o 'dorada' con todo el software y configuración preinstalados es una práctica recomendada para la consistencia."
        },
        {
            pregunta: "¿Qué patrón de arquitectura ayuda a prevenir un punto único de fallo al distribuir el tráfico entre múltiples recursos, como instancias EC2 en diferentes Zonas de Disponibilidad?",
            opciones: ["Balanceo de Carga (Load Balancing)", "Caching", "Fanout", "Sharding"],
            area: 3,
            respuesta_correcta: "Balanceo de Carga (Load Balancing)",
            explicacion: "Elastic Load Balancing (ELB) distribuye automáticamente el tráfico de aplicaciones entrantes en varias instancias de Amazon EC2, contenedores, direcciones IP y funciones de Lambda, en una o varias Zonas de Disponibilidad."
        }
    ];

    // --- ELEMENTOS DEL DOM ---
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

    const areas = {
        '1': 'Automatización del SDLC', '2': 'Gestión de Configuración e IaC', '3': 'Soluciones de Nube Resilientes',
        '4': 'Monitoreo y Registros', '5': 'Respuesta a Incidentes y Eventos', '6': 'Seguridad y Cumplimiento'
    };

    function startGame(area) {
        currentArea = area;
        currentFlashcards = allFlashcards.filter(card => card.area.toString() === area);
        
        if (currentFlashcards.length === 0) {
            alert(`No hay preguntas para el área: ${areas[area]}`);
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
        
        // Espera a que la tarjeta se voltee antes de cambiar el contenido
        setTimeout(() => {
            const card = currentFlashcards[currentIndex];
            questionText.textContent = card.pregunta;
            cardCounter.textContent = `${currentIndex + 1} / ${currentFlashcards.length}`;
            areaTitle.textContent = areas[currentArea];
            
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
            feedbackHeader.innerHTML = `<h2 class="text-2xl font-bold text-green-600">¡Correcto!</h2>`;
        } else {
            button.classList.add('incorrect');
            feedbackHeader.innerHTML = `<h2 class="text-2xl font-bold text-red-600">¡Incorrecto!</h2>`;
        }

        updateScore();
        
        // Deshabilitar todos los botones
        Array.from(optionsContainer.children).forEach(btn => {
            btn.disabled = true;
             // Marcar la respuesta correcta si el usuario se equivocó
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
        const links = areaMenu.querySelectorAll('a');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.area === currentArea) {
                link.classList.add('active');
            }
        });
    }

    // --- INICIALIZACIÓN Y EVENTOS ---
    function initialize() {
        allFlashcards = flashcardData.map(row => ({ ...row }));
        
        nextButton.addEventListener('click', showNextCard);
        retryButton.addEventListener('click', () => startGame(currentArea));
        
        const urlParams = new URLSearchParams(window.location.search);
        const area = urlParams.get('area');
        if (area && areas[area]) {
            startGame(area);
        }
    }
    
    initialize();
});

