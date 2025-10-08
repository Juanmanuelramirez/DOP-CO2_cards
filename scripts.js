document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const areaTitle = document.getElementById('area-title');
    const cardCounter = document.getElementById('card-counter');
    const flashcardContainer = document.getElementById('flashcard-container');
    const welcomeMessage = document.getElementById('welcome-message');
    const flashcard = document.getElementById('flashcard');
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const correctAnswerEl = document.getElementById('correct-answer');
    const explanationEl = document.getElementById('explanation');
    const controls = document.getElementById('controls');
    const flipBtn = document.getElementById('flip-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // --- ESTADO DE LA APLICACIÓN ---
    let allFlashcards = [];
    let currentCards = [];
    let currentIndex = 0;
    
    const KNOWLEDGE_AREAS = {
        '1': "Automatización del SDLC",
        '2': "Gestión de Configuración e IaC",
        '3': "Soluciones de Nube Resilientes",
        '4': "Monitoreo y Registros",
        '5': "Respuesta a Incidentes y Eventos",
        '6': "Seguridad y Cumplimiento"
    };

    // --- INICIALIZACIÓN ---
    
    // Función para obtener parámetros de la URL
    const getAreaFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('area');
    };

    // Cargar y procesar el archivo CSV
    const loadFlashcards = async () => {
        try {
            const response = await fetch('flashcards.csv');
            if (!response.ok) {
                throw new Error(`Error al cargar el archivo CSV: ${response.statusText}`);
            }
            const csvData = await response.text();
            allFlashcards = parseCSV(csvData);
            
            const areaId = getAreaFromURL();
            if (areaId && KNOWLEDGE_AREAS[areaId]) {
                filterAndDisplayCards(areaId);
            }
        } catch (error) {
            console.error(error);
            areaTitle.textContent = "Error";
            welcomeMessage.innerHTML = `<p>No se pudieron cargar las tarjetas. Revisa la consola para más detalles y asegúrate de que el archivo 'flashcards.csv' exista.</p>`;
            welcomeMessage.style.display = 'flex';
        }
    };

    // Función simple para parsear CSV (asume un formato específico)
    const parseCSV = (csv) => {
        const lines = csv.split('\n').slice(1); // Omitir cabecera
        return lines.map(line => {
            const [pregunta, opciones, area, respuesta_correcta, explicacion] = line.split(';');
            return { pregunta, opciones: JSON.parse(opciones), area, respuesta_correcta, explicacion };
        }).filter(card => card.pregunta); // Filtrar líneas vacías
    };

    // --- LÓGICA DE VISUALIZACIÓN ---
    
    const filterAndDisplayCards = (areaId) => {
        const areaName = KNOWLEDGE_AREAS[areaId];
        currentCards = allFlashcards.filter(card => card.area === areaName);
        currentIndex = 0;

        if (currentCards.length > 0) {
            areaTitle.textContent = areaName;
            welcomeMessage.style.display = 'none';
            flashcardContainer.style.display = 'block';
            controls.style.display = 'flex';
            displayCard();
        } else {
            areaTitle.textContent = areaName;
            cardCounter.textContent = 'No hay tarjetas para esta área.';
            welcomeMessage.style.display = 'flex';
            welcomeMessage.innerHTML = `<p>Aún no hay preguntas cargadas para el área de <strong>${areaName}</strong>.</p>`;
            flashcardContainer.style.display = 'none';
            controls.style.display = 'none';
        }
    };

    const displayCard = () => {
        if (currentIndex < 0 || currentIndex >= currentCards.length) return;
        
        // Resetear el estado de la tarjeta
        flashcard.classList.remove('flipped');
        
        const card = currentCards[currentIndex];
        questionEl.textContent = card.pregunta;
        correctAnswerEl.textContent = `${card.respuesta_correcta}) ${card.opciones[card.respuesta_correcta]}`;
        explanationEl.textContent = card.explicacion;

        // Limpiar opciones anteriores y crear nuevas
        optionsEl.innerHTML = '';
        for (const key in card.opciones) {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.textContent = `${key}) ${card.opciones[key]}`;
            optionsEl.appendChild(optionDiv);
        }

        updateCounter();
    };

    const updateCounter = () => {
        cardCounter.textContent = `Tarjeta ${currentIndex + 1} de ${currentCards.length}`;
    };

    // --- MANEJO DE EVENTOS ---
    
    flipBtn.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentCards.length - 1) {
            currentIndex++;
            displayCard();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayCard();
        }
    });

    // Iniciar la carga de datos al cargar la página
    loadFlashcards();
});
