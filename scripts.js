document.addEventListener('DOMContentLoaded', () => {

    // =======================================================================
    // ¡IMPORTANTE! - CONFIGURA AQUÍ TU REPOSITORIO DE GITHUB
    // =======================================================================
    // Reemplaza los siguientes valores con tu nombre de usuario y el nombre
    // de tu repositorio donde se encuentran los archivos HTML.
    // =======================================================================
    const GITHUB_USER = 'TU_USUARIO_DE_GITHUB';
    const GITHUB_REPO = 'TU_NOMBRE_DE_REPOSITORIO';


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
     * Se conecta a la API de GitHub, construye la estructura de archivos
     * y llama a la función para generar el menú.
     */
    async function fetchAndBuildMenu() {
        menuContainer.innerHTML = '<p class="text-gray-500">Cargando menú desde GitHub...</p>';
        const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents`;

        // Verifica si los datos del repositorio fueron ingresados.
        if (GITHUB_USER === 'TU_USUARIO_DE_GITHUB' || GITHUB_REPO === 'TU_NOMBRE_DE_REPOSITORIO') {
            menuContainer.innerHTML = '<p class="text-red-500 font-semibold">Error de Configuración</p><p class="text-xs text-red-700">Por favor, actualiza las constantes GITHUB_USER y GITHUB_REPO en el archivo <strong>scripts.js</strong>.</p>';
            return;
        }

        try {
            // 1. Obtener el contenido de la raíz del repositorio.
            const rootResponse = await fetch(apiUrl);
            if (!rootResponse.ok) throw new Error(`No se pudo acceder al repositorio. Verifica que el usuario y el nombre del repo sean correctos.`);
            const rootContents = await rootResponse.json();

            // 2. Filtrar para obtener solo las carpetas, ignorando las que empiezan con "." (como .github).
            const folders = rootContents.filter(item => item.type === 'dir' && !item.name.startsWith('.'));
            let dynamicFileStructure = [];

            // 3. Para cada carpeta, obtener su contenido.
            for (const folder of folders) {
                const folderResponse = await fetch(folder.url);
                if (!folderResponse.ok) continue; // Si falla una carpeta, la saltamos.
                const folderContents = await folderResponse.json();

                // 4. Filtrar solo los archivos que terminan en .html.
                const htmlFiles = folderContents
                    .filter(file => file.type === 'file' && file.name.endsWith('.html'))
                    .map(file => ({
                        name: file.name.replace('.html', '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        path: file.path
                    }));
                
                // 5. Si la carpeta contiene archivos HTML, la añadimos a nuestra estructura.
                if (htmlFiles.length > 0) {
                    dynamicFileStructure.push({
                        folder: folder.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        files: htmlFiles
                    });
                }
            }

            if (dynamicFileStructure.length === 0) {
                menuContainer.innerHTML = '<p class="text-orange-500">No se encontraron carpetas con archivos .html en el repositorio.</p>';
                return;
            }

            // 6. Generar el menú con la estructura obtenida de GitHub.
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