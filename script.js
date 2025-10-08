document.addEventListener('DOMContentLoaded', () => {
    // --- DATOS DE LAS FLASHCARDS ---
    const flashcardData = [
        {
            pregunta: "¿Qué servicio de AWS se utiliza para automatizar la implementación de software en una variedad de servicios de cómputo como Amazon EC2, AWS Fargate, AWS Lambda y servidores locales?",
            opciones: '["AWS CodeDeploy", "AWS CodePipeline", "AWS CodeBuild", "AWS CloudFormation"]',
            area: 1,
            respuesta_correcta: "AWS CodeDeploy",
            explicacion: "AWS CodeDeploy es un servicio que automatiza las implementaciones de código en instancias de Amazon EC2, funciones de AWS Lambda o clústeres de Amazon ECS, así como en servidores locales."
        },
        {
            pregunta: "En una canalización de CI/CD, ¿cuál es el propósito principal de AWS CodeBuild?",
            opciones: '["Orquestar el flujo de trabajo", "Compilar el código fuente y ejecutar pruebas", "Almacenar artefactos de compilación", "Versionar el código fuente"]',
            area: 1,
            respuesta_correcta: "Compilar el código fuente y ejecutar pruebas",
            explicacion: "AWS CodeBuild es un servicio de integración continua totalmente administrado que compila el código fuente, ejecuta pruebas y produce paquetes de software listos para implementar."
        },
        {
            pregunta: "¿Qué herramienta de IaC (Infraestructura como Código) es nativa de AWS y utiliza plantillas en formato JSON o YAML para aprovisionar recursos?",
            opciones: '["Terraform", "Ansible", "AWS CloudFormation", "Pulumi"]',
            area: 2,
            respuesta_correcta: "AWS CloudFormation",
            explicacion: "AWS CloudFormation te permite modelar y configurar tus recursos de Amazon Web Services para que puedas pasar menos tiempo administrando esos recursos y más tiempo centrándote en tus aplicaciones."
        },
        {
            pregunta: "Para asegurar que las instancias EC2 en un Auto Scaling Group tengan una configuración consistente, ¿qué servicio de AWS es el más adecuado para crear 'imágenes doradas'?",
            opciones: '["AWS Systems Manager", "Amazon Machine Image (AMI)", "AWS OpsWorks", "Docker Hub"]',
            area: 2,
            respuesta_correcta: "Amazon Machine Image (AMI)",
            explicacion: "Una AMI (Amazon Machine Image) proporciona la información necesaria para lanzar una instancia. Crear una AMI personalizada o 'dorada' con todo el software y configuración preinstalados es una práctica recomendada para la consistencia."
        },
        {
            pregunta: "¿Qué patrón de arquitectura ayuda a prevenir un punto único de fallo al distribuir el tráfico entre múltiples recursos, como instancias EC2 en diferentes Zonas de Disponibilidad?",
            opciones: '["Balanceo de Carga (Load Balancing)", "Caching", "Fanout", "Sharding"]',
            area: 3,
            respuesta_correcta: "Balanceo de Carga (Load Balancing)",
            explicacion: "Elastic Load Balancing (ELB) distribuye automáticamente el tráfico de aplicaciones entrantes en varias instancias de Amazon EC2, contenedores, direcciones IP y funciones de Lambda, en una o varias Zonas de Disponibilidad."
        }
    ];

    // --- VALIDACIÓN DE ELEMENTOS DEL DOM ---
    // Se verifica que todos los IDs requeridos existan en el HTML antes de continuar.
    const requiredIds = [
        'area-title', 'card-counter', 'question-text', 'options-container',
        'answer-container', 'explanation-text', 'flip-button', 'prev-button',
        'next-button', 'flashcard', 'welcome-message'
    ];
    const elements = {};
    let missingElement = false;

    for (const id of requiredIds) {
        const el = document.getElementById(id);
        if (!el) {
            console.error(`Error Crítico: No se encontró el elemento con ID "${id}". Verifica tu archivo HTML.`);
            missingElement = true;
            break;
        }
        elements[id] = el;
    }

    if (missingElement) {
        document.body.innerHTML = `
            <div style="padding: 2rem; text-align: center; font-family: sans-serif; color: #333;">
                <h1 style="color: #D9534F; font-size: 1.5rem; margin-bottom: 1rem;">Error de Configuración</h1>
                <p>Falta un elemento HTML requerido para que la aplicación funcione.</p>
                <p style="margin-top: 0.5rem;">Por favor, revisa la consola del navegador (F12) para ver el ID específico que falta y asegúrate de que tu archivo HTML esté correcto.</p>
            </div>
        `;
        return; // Detiene la ejecución del script para prevenir más errores.
    }

    // --- ELEMENTOS DEL DOM (YA VALIDADOS) ---
    const {
        areaTitle, cardCounter, questionText, optionsContainer,
        answerContainer, explanationText, flipButton, prevButton,
        nextButton, flashcard, welcomeMessage
    } = elements;

    let allFlashcards = [];
    let currentFlashcards = [];
    let currentIndex = 0;
    let isFlipped = false;

    const areas = {
        '1': 'Automatización del SDLC', '2': 'Gestión de Configuración e IaC', '3': 'Soluciones de Nube Resilientes',
        '4': 'Monitoreo y Registros', '5': 'Respuesta a Incidentes y Eventos', '6': 'Seguridad y Cumplimiento'
    };
    
    const processFlashcardData = () => {
        allFlashcards = flashcardData.map(row => {
            let opcionesParsed;
            try {
                opcionesParsed = JSON.parse(row.opciones.replace(/""/g, '"'));
            } catch (e) {
                console.warn("No se pudieron parsear las opciones para la pregunta:", row.pregunta, e);
                opcionesParsed = [];
            }
            return { ...row, area: row.area.toString(), opciones: opcionesParsed };
        });
    };

    const filterFlashcards = (area) => {
        currentFlashcards = allFlashcards.filter(card => card.area === area);
        currentIndex = 0;
        if (currentFlashcards.length > 0) {
            flashcard.style.display = 'block';
            welcomeMessage.style.display = 'none';
            areaTitle.textContent = areas[area] || 'Área Desconocida';
            displayCard();
        } else {
            flashcard.style.display = 'none';
            welcomeMessage.style.display = 'flex';
            welcomeMessage.innerHTML = `<div class="text-center"><h2 class="text-2xl font-bold mb-2">Área sin Preguntas</h2><p class="text-gray-600">Aún no hay preguntas para "${areas[area]}".</p></div>`;
        }
    };

    const displayCard = () => {
        if (currentFlashcards.length === 0) return;
        isFlipped = false;
        flashcard.classList.remove('flipped');
        const card = currentFlashcards[currentIndex];
        questionText.textContent = card.pregunta;
        cardCounter.textContent = `${currentIndex + 1} / ${currentFlashcards.length}`;
        optionsContainer.innerHTML = '';
        card.opciones.forEach(opcion => {
            const button = document.createElement('button');
            button.className = 'w-full text-left p-3 my-2 border rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400';
            button.textContent = opcion;
            optionsContainer.appendChild(button);
        });
        explanationText.textContent = card.explicacion;
        const answerContent = answerContainer.querySelector('.p-6');
        if (answerContent) {
            answerContent.innerHTML = `<p class="text-gray-700">${card.explicacion}</p><p class="mt-4 text-lg"><strong>Respuesta Correcta:</strong> ${card.respuesta_correcta}</p>`;
        }
        updateNavButtons();
    };

    const updateNavButtons = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === currentFlashcards.length - 1;
        prevButton.classList.toggle('opacity-50', prevButton.disabled);
        nextButton.classList.toggle('opacity-50', nextButton.disabled);
    };

    // --- MANEJADORES DE EVENTOS ---
    flipButton.addEventListener('click', () => {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('flipped');
    });
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayCard();
        }
    });
    nextButton.addEventListener('click', () => {
        if (currentIndex < currentFlashcards.length - 1) {
            currentIndex++;
            displayCard();
        }
    });

    // --- INICIALIZACIÓN ---
    processFlashcardData();
    const urlParams = new URLSearchParams(window.location.search);
    const area = urlParams.get('area');
    if (area) {
        filterFlashcards(area);
    } else {
        flashcard.style.display = 'none';
        welcomeMessage.style.display = 'flex';
    }
});

