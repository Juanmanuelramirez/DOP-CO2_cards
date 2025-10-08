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
            const response = await fetch('./flashcards.csv');
            if (!response.ok) {
                // Si la respuesta no es OK (ej. 404), lanzamos un error claro
                throw new Error(`Error de red: No se encontró el archivo (código ${response.status})`);
            }
            const csvData = await response.text();
            allFlashcards = parseCSV(csvData);
            
            if (allFlashcards.length === 0) {
                 throw new Error("El archivo CSV está vacío o no se pudo procesar correctamente.");
            }

            const areaId = getAreaFromURL();
            if (areaId && KNOWLEDGE_AREAS[areaId]) {
                filterAndDisplayCards(areaId);
            }
        } catch (error) {
            console.error("Error detallado al cargar las flashcards:", error);
            areaTitle.textContent = "Error de Carga";
            // Mensaje más específico para el usuario
            welcomeMessage.innerHTML = `<p><strong>¡Oh no! No pudimos cargar las preguntas.</strong><br>La causa más común es que el archivo <code>flashcards.csv</code> no se encuentra en el servidor. Por favor, verifica que el archivo exista en tu repositorio de GitHub y que los cambios se hayan publicado.</p>`;
            welcomeMessage.style.display = 'flex';
        }
    };

    // Función para parsear CSV más robusta
    const parseCSV = (csv) => {
        const lines = csv.split('\n').slice(1); // Omitir cabecera
        const cards = [];
        lines.forEach((line, index) => {
            // Ignorar líneas vacías
            if (line.trim() === '') return;

            const parts = line.split(';');
            if (parts.length < 5) {
                console.warn(`Línea ${index + 2} malformada en CSV (menos de 5 columnas), se omitirá:`, line);
                return;
            }
            
            const [pregunta, opcionesStr, area, respuesta_correcta, explicacion] = parts;
            
            try {
                // Aseguramos que tengamos algo que parsear
                if (pregunta && opcionesStr && area && respuesta_correcta) {
                    const opciones = JSON.parse(opcionesStr);
                    cards.push({ pregunta, opciones, area, respuesta_correcta, explicacion: explicacion || '' });
                }
            } catch (e) {
                console.error(`Error al procesar JSON en la línea ${index + 2} del CSV. Revisa el formato de las opciones.`, {linea: line, error: e});
            }
        });
        return cards;
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
        
        // Manejar el caso de que la respuesta no exista en las opciones
        const respuestaTexto = card.opciones[card.respuesta_correcta] || 'Respuesta no encontrada';
        correctAnswerEl.textContent = `${card.respuesta_correcta}) ${respuestaTexto}`;
        
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

