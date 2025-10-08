document.addEventListener('DOMContentLoaded', () => {

    // =======================================================================
    // ¡IMPORTANTE! - CONFIGURA AQUÍ TU REPOSITORIO DE GITHUB
    // =======================================================================
    // Reemplaza los siguientes valores con tu nombre de usuario y el nombre
    // de tu repositorio donde se encuentran los archivos HTML.
    // =======================================================================
    const GITHUB_USER = 'Juanmanuelramirez';
    const GITHUB_REPO = 'DOP-CO2_cards';


    const menuContainer = document.getElementById('menu-container');
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');

    /**
     * Genera el menú HTML en la barra lateral a partir de una estructura de archivos.
     * @param {Array} fileStructure - La estructura de carpetas y archivos del sitio.
     */
    function generateMenu(fileStructure) {
        menuContainer.innerHTML = ''; // Limpiamos el menú
        // Ordena la estructura para que la carpeta Principal (raíz) aparezca primero.
        fileStructure.sort((a, b) => {
            if (a.folder === 'Principal') return -1;
            if (b.folder === 'Principal') return 1;
            return a.folder.localeCompare(b.folder);
        });

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
     * Carga el contenido de un archivo HTML en el área principal.
     * @param {string} path - La ruta al archivo HTML.
     */
    function loadContent(path) {
         // Si tu sitio está en GitHub Pages, la ruta relativa funcionará directamente.
         fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP ${response.status} - No se pudo encontrar el archivo: ${path}`);
                }
                return response.text();
            })
            .then(html => {
                mainContent.innerHTML = html;
            })
            .catch(error => {
                console.error('Error al cargar la página:', error);
                mainContent.innerHTML = `
                    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md" role="alert">
                        <h2 class="font-bold text-xl mb-2">Error al Cargar Contenido</h2>
                        <p>${error.message}</p>
                        <p class="mt-2 text-sm">Asegúrate de que la ruta sea correcta y el archivo exista en el repositorio.</p>
                    </div>
                `;
            });
    }

    /**
     * Se conecta a la API de GitHub y recorre RECURSIVAMENTE el repositorio
     * para construir la estructura de archivos y generar el menú.
     */
    async function fetchAndBuildMenu() {
        menuContainer.innerHTML = '<p class="text-gray-500">Buscando archivos en GitHub...</p>';
        const apiBaseUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents`;

        if (GITHUB_USER === 'TU_USUARIO_DE_GITHUB' || GITHUB_REPO === 'TU_NOMBRE_DE_REPOSITORIO') {
            menuContainer.innerHTML = '<p class="text-red-500 font-semibold">Error de Configuración</p><p class="text-xs text-red-700">Por favor, actualiza las constantes GITHUB_USER y GITHUB_REPO en el archivo <strong>scripts.js</strong>.</p>';
            return;
        }

        try {
            const folderMap = new Map();

            // Función recursiva para explorar las carpetas del repositorio
            async function traverseRepo(path = '') {
                const response = await fetch(`${apiBaseUrl}/${path}`);
                if (!response.ok) return;
                const contents = await response.json();

                for (const item of contents) {
                    if (item.type === 'dir' && !item.name.startsWith('.')) {
                        // Si es una carpeta, la exploramos recursivamente
                        await traverseRepo(item.path);
                    } else if (item.type === 'file' && item.name.endsWith('.html')) {
                        // Si es un archivo HTML, lo procesamos
                        const dirPath = item.path.substring(0, item.path.lastIndexOf('/') || 0);
                        if (!folderMap.has(dirPath)) {
                            folderMap.set(dirPath, []);
                        }
                        folderMap.get(dirPath).push({
                            name: item.name.replace('.html', '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                            path: item.path
                        });
                    }
                }
            }

            await traverseRepo(); // Empezamos la búsqueda desde la raíz

            if (folderMap.size === 0) {
                menuContainer.innerHTML = '<p class="text-orange-500">No se encontraron archivos .html en el repositorio.</p>';
                return;
            }

            // Convertimos el mapa a la estructura que espera generateMenu
            const dynamicFileStructure = Array.from(folderMap.entries()).map(([path, files]) => {
                 let folderName = 'Principal'; // Nombre para archivos en la raíz
                 if (path) {
                     const pathParts = path.split('/');
                     folderName = pathParts.pop().replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                 }
                 return { folder: folderName, files };
            });
            
            generateMenu(dynamicFileStructure);

        } catch (error) {
            console.error('Error al construir el menú desde GitHub:', error);
            menuContainer.innerHTML = `<p class="text-red-500 font-semibold">Error al cargar el menú.</p><p class="text-xs text-red-700">${error.message}</p>`;
        }
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

    // Iniciar todo el proceso.
    fetchAndBuildMenu();
});

