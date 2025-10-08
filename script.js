document.addEventListener('DOMContentLoaded', () => {
    // --- DATOS DE LAS FLASHCARDS ---
    // Los datos del CSV se integran directamente aquí para eliminar errores de carga de archivos.
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
        // Puedes seguir agregando más preguntas aquí.
    ];

    // --- ELEMENTOS DEL DOM ---
    const areaTitle = document.getElementById('area-title');
    const cardCounter = document.getElementById('card-counter');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const answerContainer = document.getElementById('answer-container');
    const explanationText = document.getElementById('explanation-text');
    const flipButton = document.getElementById('flip-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const flashcard = document.getElementById('flashcard');
    const welcomeMessage = document.getElementById('welcome-message');

    let allFlashcards = [];
    let currentFlashcards = [];
    let currentIndex = 0;
    let isFlipped = false;

    const areas = {
        '1': 'Automatización del SDLC',
        '2': 'Gestión de Configuración e IaC',
        '3': 'Soluciones de Nube Resilientes',
        '4': 'Monitoreo y Registros',
        '5': 'Respuesta a Incidentes y Eventos',
        '6': 'Seguridad y Cumplimiento'
    };

    const displayErrorMessage = (error) => {
        console.error(error); // Mantenemos el log para depuración
        flashcard.style.display = 'none';
        welcomeMessage.style.display = 'flex';
        welcomeMessage.innerHTML = `
            <div class="text-center">
                <h2 class="text-2xl font-bold mb-2 text-red-600">Error de Carga</h2>
                <p class="text-gray-600">¡Oh no! No pudimos procesar las preguntas.</p>
                <p class="text-gray-500 text-sm mt-2">La causa más común es un error en el formato de los datos internos. Por favor, verifica la consola para más detalles.</p>
            </div>
        `;
    };

    const displayWelcomeMessage = () => {
        flashcard.style.display = 'none';
        welcomeMessage.style.display = 'flex';
    }

    const processFlashcardData = () => {
        try {
            allFlashcards = flashcardData.map(row => {
                // Aseguramos que las opciones se parseen correctamente.
                // El replace es un seguro por si las comillas vienen dobles.
                let opcionesParsed;
                try {
                    opcionesParsed = JSON.parse(row.opciones.replace(/""/g, '"'));
                } catch (e) {
                    console.warn("No se pudieron parsear las opciones para la pregunta:", row.pregunta, e);
                    opcionesParsed = []; // Devolvemos un array vacío si falla
                }
                return {
                    pregunta: row.pregunta,
                    opciones: opcionesParsed,
                    area: row.area.toString(),
                    respuesta_correcta: row.respuesta_correcta,
                    explicacion: row.explicacion
                };
            });
        } catch (error) {
            throw new Error("El formato de los datos internos (flashcardData) es incorrecto.");
        }
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
             welcomeMessage.innerHTML = `
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-2">Área sin Preguntas</h2>
                    <p class="text-gray-600">Aún no hay preguntas para "${areas[area]}".</p>
                    <p class="text-gray-500 text-sm mt-2">Selecciona otra área del menú.</p>
                </div>
            `;
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
        const correctAnswerElement = document.createElement('p');
        correctAnswerElement.className = 'mt-4 text-lg';
        correctAnswerElement.innerHTML = `<strong>Respuesta Correcta:</strong> ${card.respuesta_correcta}`;
        
        const answerContent = answerContainer.querySelector('.p-6');
        answerContent.innerHTML = '';
        answerContent.appendChild(explanationText);
        answerContent.appendChild(correctAnswerElement);

        updateNavButtons();
    };

    const updateNavButtons = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === currentFlashcards.length - 1;
        prevButton.classList.toggle('opacity-50', prevButton.disabled);
        nextButton.classList.toggle('opacity-50', nextButton.disabled);
    };

    // --- MANEJADORES DE EVENTOS (CON VERIFICACIÓN) ---
    if (flipButton) {
        flipButton.addEventListener('click', () => {
            isFlipped = !isFlipped;
            flashcard.classList.toggle('flipped');
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                displayCard();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentIndex < currentFlashcards.length - 1) {
                currentIndex++;
                displayCard();
            }
        });
    }


    // --- INICIALIZACIÓN ---
    try {
        processFlashcardData();
        const urlParams = new URLSearchParams(window.location.search);
        const area = urlParams.get('area');
        if (area) {
            filterFlashcards(area);
        } else {
            displayWelcomeMessage();
        }
    } catch (error) {
        displayErrorMessage(error);
    }
});

