document.addEventListener('DOMContentLoaded', () => {

    // =======================================================================
    // ¡LA SOLUCIÓN MÁS UNIVERSAL! - DEFINE AQUÍ LA ESTRUCTURA DE TU SITIO
    // =======================================================================
    // Este método es el más confiable y funcionará en CUALQUIER LUGAR 
    // (en tu PC, en GitHub, en cualquier hosting).
    //
    // Para que el menú se actualice automáticamente cuando añades archivos,
    // solo tienes que añadir la nueva entrada en esta lista.
    // =======================================================================
    const fileStructure = [
        {
            folder: 'Introducción',
            files: [
                { name: 'Bienvenida', path: 'introduccion/bienvenida.html' },
                { name: 'Acerca de', path: 'introduccion/acerca.html' }
            ]
        },
        {
            folder: 'Guías de Usuario',
            files: [
                { name: 'Guía de Inicio', path: 'guias/inicio.html' }
            ]
        }
    ];

    const menuContainer = document.getElementById('menu-container');
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    
    /**
     * Genera el menú HTML en la barra lateral a partir de la estructura definida.
     */
    function generateMenu() {
        if (fileStructure.length === 0) {
            menuContainer.innerHTML = '<p class="text-gray-500">No hay elementos en el menú. Define la estructura en <code>scripts.js</code>.</p>';
            return;
        }

        menuContainer.innerHTML = '';
        fileStructure.forEach(item => {
            const folderTitle = document.createElement('h3');
            folderTitle.className = 'text-lg font-semibold text-gray-500 mt-6 mb-2 uppercase tracking-wider';
            folderTitle.textContent = item.folder;
            menuContainer.appendChild(folderTitle);

            const fileList = document.createElement('ul');
            fileList.className = 'space-y-1';
            item.files.forEach(file => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = file.name;
                link.dataset.path = file.path;
                link.className = 'block text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-md p-2 transition-colors duration-200';
                listItem.appendChild(link);
                fileList.appendChild(listItem);
            });
            menuContainer.appendChild(fileList);
        });
    }
    
    /**
     * Carga el contenido de un archivo HTML y ejecuta sus scripts de forma segura.
     */
    function loadContent(path) {
         fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP ${response.status} - No se pudo encontrar el archivo en: ${path}`);
                }
                return response.text();
            })
            .then(html => {
                // Limpiamos los scripts que fueron inyectados en la carga anterior para evitar conflictos.
                const oldInjectedScripts = document.querySelectorAll('script[data-injected="true"]');
                oldInjectedScripts.forEach(s => s.remove());

                // 1. Inyectamos el HTML en el área de contenido principal.
                mainContent.innerHTML = html;

                // 2. Buscamos los scripts dentro del contenido recién inyectado.
                const scripts = mainContent.querySelectorAll("script");
                
                // 3. Ejecutamos cada script de una manera que el navegador no bloquee.
                scripts.forEach(script => {
                    // Creamos un nuevo elemento script
                    const newScript = document.createElement("script");
                    
                    // Copiamos el contenido del script original al nuevo.
                    newScript.textContent = script.textContent;
                    
                    // Marcamos este script para poder encontrarlo y limpiarlo en la siguiente carga.
                    newScript.setAttribute('data-injected', 'true');
                    
                    // Añadimos el nuevo script al final del body. Esto fuerza al navegador a ejecutarlo.
                    document.body.appendChild(newScript);

                    // Eliminamos el script original del área de contenido, ya que no se ejecutará ahí.
                    script.remove();
                });
            })
            .catch(error => {
                console.error('Error al cargar la página:', error);
                mainContent.innerHTML = `
                    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md" role="alert">
                        <h2 class="font-bold text-xl mb-2">Error al Cargar Contenido</h2>
                        <p>${error.message}</p>
                        <p class="mt-2 text-sm">Asegúrate de que la ruta en 'fileStructure' sea correcta y el archivo exista.</p>
                    </div>
                `;
            });
    }

    // Event listener para los clics en el menú
    menuContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.dataset.path) {
            event.preventDefault();
            loadContent(event.target.dataset.path);
        }
    });

    // Funcionalidad para ocultar/mostrar la barra lateral
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        mainContent.classList.toggle('ml-64');
    });

    // --- INICIALIZACIÓN ---
    // 1. Generar el menú.
    generateMenu();
    
    // 2. Cargar la primera página por defecto para que no se vea vacío.
    if (fileStructure.length > 0 && fileStructure[0].files.length > 0) {
        loadContent(fileStructure[0].files[0].path);
    }
});

