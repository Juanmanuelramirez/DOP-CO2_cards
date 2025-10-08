document.addEventListener('DOMContentLoaded', () => {

    // =======================================================================
    // ¡IMPORTANTE! - DEFINE AQUÍ LA ESTRUCTURA DE TU SITIO
    // =======================================================================
    // JavaScript no puede "leer" tus carpetas directamente por seguridad.
    // Por lo tanto, debes listar tus carpetas y archivos HTML en este arreglo.
    // El resto del script es DINÁMICO y generará el menú a partir de esta lista.
    //
    // Para actualizar tu menú, solo tienes que añadir o quitar elementos aquí.
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
                { name: 'Guía de Inicio', path: 'guias/inicio.html' },
                { name: 'Guía Avanzada', path: 'guias/avanzada.html' }
            ]
        },
        {
            folder: 'Contacto',
            files: [
                { name: 'Formulario', path: 'contacto/formulario.html' }
            ]
        }
    ];

    const menuContainer = document.getElementById('menu-container');
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');

    // --- ESTA PARTE ES COMPLETAMENTE DINÁMICA ---
    // Genera el menú HTML a partir de la estructura definida arriba.
    // No necesitas tocar nada de aquí en adelante.
    function generateMenu() {
        menuContainer.innerHTML = ''; // Limpiamos el menú por si acaso
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
    
    // Función para cargar contenido dinámicamente
    function loadContent(path) {
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

    // Generar el menú inicial al cargar la página
    generateMenu();
});
