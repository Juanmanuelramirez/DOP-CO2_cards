document.addEventListener('DOMContentLoaded', () => {

    // ========================================================================
    //  BASE DE DATOS DE CONTENIDO DE ESTUDIO
    // ========================================================================
    const studyData = {
        '1': {
            title: "SDLC Automation",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`,
            sections: [
                {
                    title: "Conceptos de CI/CD",
                    content: `
                        <h3>CI/CD: El Corazón de DevOps</h3>
                        <p>CI/CD (Integración Continua y Despliegue/Entrega Continuos) es una práctica que automatiza las fases del ciclo de vida del desarrollo de software. Permite a los equipos entregar código de manera más frecuente y fiable.</p>
                        <ul>
                            <li><strong>Integración Continua (CI):</strong> Los desarrolladores fusionan sus cambios de código en un repositorio central con frecuencia. Cada fusión desencadena una compilación y pruebas automatizadas, detectando errores rápidamente.</li>
                            <li><strong>Entrega Continua (Continuous Delivery):</strong> Es una extensión de CI. El código que pasa todas las pruebas se despliega automáticamente en un entorno de pruebas. El despliegue a producción requiere una aprobación manual.</li>
                            <li><strong>Despliegue Continuo (Continuous Deployment):</strong> Va un paso más allá. Cada cambio que pasa todas las etapas del pipeline se libera automáticamente a los clientes finales. No hay intervención humana.</li>
                        </ul>
                        <h4>Servicios Clave de AWS para CI/CD</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="info-box"><strong>AWS CodeCommit:</strong> Repositorio Git privado y gestionado.</div>
                            <div class="info-box"><strong>AWS CodeBuild:</strong> Servicio de compilación que compila código, ejecuta pruebas y produce artefactos.</div>
                            <div class="info-box"><strong>AWS CodeDeploy:</strong> Automatiza los despliegues en EC2, Fargate, Lambda y servidores on-premises.</div>
                            <div class="info-box"><strong>AWS CodePipeline:</strong> Orquesta todo el proceso de CI/CD, desde el código hasta el despliegue.</div>
                        </div>
                    `
                },
                {
                    title: "Estrategias de Despliegue",
                    content: `
                        <h3>Minimizando el Riesgo: Estrategias de Despliegue</h3>
                        <p>AWS CodeDeploy soporta varias estrategias para reducir el riesgo durante los despliegues y minimizar el tiempo de inactividad.</p>
                        <ul>
                            <li><strong>In-place (en el lugar):</strong> La aplicación en cada instancia se detiene, se instala la nueva versión y se inicia. Es simple pero causa tiempo de inactividad.</li>
                            <li><strong>Blue/Green:</strong> Se aprovisiona un nuevo entorno (Green) idéntico al de producción (Blue). El tráfico se redirige al nuevo entorno una vez que las pruebas son exitosas. Permite una reversión instantánea.</li>
                            <li><strong>Canary:</strong> Una pequeña porción del tráfico se desvía a la nueva versión. Si no se detectan problemas, el tráfico se incrementa gradualmente.</li>
                            <li><strong>Linear:</strong> El tráfico se desvía en incrementos fijos (ej. 10% cada minuto) a la nueva versión.</li>
                        </ul>
                        <h4>Ejemplo de buildspec.yml en CodeBuild</h4>
                        <p>El archivo <code>buildspec.yml</code> es fundamental para definir los comandos que CodeBuild ejecutará en cada fase del proceso de compilación.</p>
                        <pre><code>version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - echo "Installing dependencies..."
      - npm install
  build:
    commands:
      - echo "Running build scripts..."
      - npm run build
  post_build:
    commands:
      - echo "Build completed on `date`"
artifacts:
  files:
    - '**/*'
  base-directory: 'dist'
</code></pre>
                    `
                }
            ]
        },
        '2': {
            title: "Configuration Management & IaC",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.926a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m15.459 0a4.5 4.5 0 0 1-1.541 3.309l-5.415 4.131a3.375 3.375 0 0 1-4.075 0l-5.415-4.131a4.5 4.5 0 0 1-1.541-3.309m15.459 0z" /></svg>`,
            sections: [
                 {
                    title: "Infraestructura como Código (IaC)",
                    content: `
                        <h3>Definiendo la Nube con Código: IaC</h3>
                        <p>La Infraestructura como Código (IaC) es la práctica de gestionar y aprovisionar infraestructura a través de código en lugar de procesos manuales. Esto permite que la infraestructura sea versionada, reutilizable y consistente.</p>
                        <h4>AWS CloudFormation</h4>
                        <p>Es el servicio principal de AWS para IaC. Utiliza plantillas (en formato JSON o YAML) para modelar y configurar tus recursos de AWS de manera automatizada y segura.</p>
                        <ul>
                            <li><strong>Stacks:</strong> Un conjunto de recursos de AWS gestionados como una sola unidad.</li>
                            <li><strong>Templates (Plantillas):</strong> El archivo de código que define los recursos del stack.</li>
                            <li><strong>Change Sets:</strong> Permiten previsualizar los cambios que CloudFormation hará en tu stack antes de aplicarlos.</li>
                            <li><strong>Drift Detection:</strong> Detecta si la configuración de los recursos ha cambiado fuera de CloudFormation.</li>
                            <li><strong>StackSets:</strong> Permiten crear, actualizar o eliminar stacks en múltiples cuentas y regiones con una sola operación.</li>
                        </ul>
                    `
                },
                {
                    title: "Gestión de Configuración y Secretos",
                    content: `
                        <h3>Gestión Centralizada con Systems Manager</h3>
                        <p>AWS Systems Manager (SSM) proporciona una interfaz unificada para ver y automatizar tareas operativas en tus recursos de AWS.</p>
                        <ul>
                            <li><strong>Parameter Store:</strong> Almacenamiento seguro y jerárquico para datos de configuración y secretos. Ofrece un tier estándar (gratuito) y avanzado.</li>
                            <li><strong>Secrets Manager:</strong> Servicio dedicado para gestionar secretos, con capacidades de rotación automática de credenciales. Es la opción preferida para datos altamente sensibles.</li>
                            <li><strong>Session Manager:</strong> Permite un acceso seguro a tus instancias (EC2, on-premises) a través de una shell basada en navegador o la AWS CLI, sin necesidad de abrir puertos inbound o gestionar claves SSH.</li>
                            <li><strong>Patch Manager:</strong> Automatiza el proceso de aplicar parches de seguridad y de otro tipo a tus instancias gestionadas.</li>
                        </ul>
                    `
                }
            ]
        },
        '3': {
            title: "Resilient Cloud Solutions",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
            sections: [
                {
                    title: "Alta Disponibilidad y Escalabilidad",
                    content: `
                        <h3>Construyendo Sistemas a Prueba de Fallos</h3>
                        <p>La resiliencia en la nube se basa en la capacidad de un sistema para recuperarse de fallos y seguir funcionando. La alta disponibilidad (HA) y la escalabilidad son los pilares de esta capacidad.</p>
                        <ul>
                            <li><strong>Elastic Load Balancing (ELB):</strong> Distribuye automáticamente el tráfico entrante entre múltiples destinos, como instancias EC2, contenedores y direcciones IP, en una o más Zonas de Disponibilidad (AZs).</li>
                            <li><strong>Auto Scaling:</strong> Asegura que tengas el número correcto de instancias EC2 disponibles para manejar la carga de tu aplicación. Puede escalar hacia arriba o hacia abajo automáticamente según las condiciones que definas.</li>
                            <li><strong>Multi-AZ:</strong> Desplegar recursos en múltiples Zonas de Disponibilidad dentro de una región para proteger las aplicaciones de fallos en un único centro de datos.</li>
                        </ul>
                    `
                },
                {
                    title: "Desacoplamiento y Recuperación de Desastres (DR)",
                    content: `
                        <h3>Desacoplamiento y Planificación para lo Peor</h3>
                        <p>El desacoplamiento de componentes y una sólida estrategia de DR son cruciales para la resiliencia.</p>
                        <h4>Desacoplamiento con SQS y SNS</h4>
                        <ul>
                            <li><strong>Amazon SQS (Simple Queue Service):</strong> Un servicio de colas de mensajes totalmente gestionado que permite desacoplar y escalar microservicios, sistemas distribuidos y aplicaciones sin servidor.</li>
                            <li><strong>Amazon SNS (Simple Notification Service):</strong> Un servicio de mensajería para comunicación de aplicación a aplicación (A2A) y de aplicación a persona (A2P), usando un modelo de publicador/suscriptor.</li>
                        </ul>
                        <h4>Estrategias de Disaster Recovery (DR)</h4>
                        <ul>
                            <li><strong>Backup & Restore:</strong> La estrategia más simple y de menor costo.</li>
                            <li><strong>Pilot Light:</strong> Se replica una versión mínima del entorno en la región de DR, lista para escalar rápidamente.</li>
                            <li><strong>Warm Standby:</strong> Una versión reducida pero completamente funcional del entorno siempre está activa en la región de DR.</li>
                            <li><strong>Multi-Site Active/Active:</strong> El servicio se ejecuta en ambas regiones simultáneamente, distribuyendo el tráfico entre ellas.</li>
                        </ul>
                    `
                }
            ]
        },
        '4': {
            title: "Monitoring & Logging",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>`,
             sections: [
                {
                    title: "Visibilidad con CloudWatch",
                    content: `
                        <h3>Observabilidad Integral con Amazon CloudWatch</h3>
                        <p>CloudWatch es un servicio de monitoreo y observabilidad que proporciona datos y conocimientos prácticos para monitorear tus aplicaciones, responder a cambios de rendimiento y optimizar el uso de recursos.</p>
                        <ul>
                            <li><strong>Metrics:</strong> La base de CloudWatch. Son series temporales de datos. AWS genera métricas para la mayoría de sus servicios, y también puedes publicar tus propias métricas personalizadas.</li>
                            <li><strong>Logs:</strong> Permite centralizar, monitorear y almacenar logs de tus aplicaciones, sistemas y servicios de AWS. Puedes buscar y filtrar logs, crear métricas a partir de ellos y establecer alarmas.</li>
                            <li><strong>Alarms:</strong> Observan una única métrica durante un período de tiempo y ejecutan acciones (como enviar una notificación SNS o escalar un grupo de Auto Scaling) si el valor de la métrica supera un umbral.</li>
                            <li><strong>Dashboards:</strong> Vistas personalizables de las métricas y alarmas para tener una visión unificada de la salud de tus recursos.</li>
                        </ul>
                    `
                },
                {
                    title: "Auditoría y Trazabilidad",
                    content: `
                        <h3>¿Quién Hizo Qué?: Auditoría y Depuración</h3>
                        <h4>AWS CloudTrail</h4>
                        <p>CloudTrail registra toda la actividad de la cuenta y las llamadas a la API de AWS. Es fundamental para la auditoría de seguridad, el cumplimiento normativo y la gobernanza. Responde a la pregunta: ¿quién hizo qué, cuándo y desde dónde?</p>
                        <h4>AWS X-Ray</h4>
                        <p>Ayuda a los desarrolladores a analizar y depurar aplicaciones distribuidas, como las construidas con una arquitectura de microservicios. Proporciona una visión de extremo a extremo de las solicitudes a medida que viajan a través de tu aplicación, mostrando un mapa de los componentes de la aplicación.</p>
                    `
                }
            ]
        },
        '5': {
            title: "Incident & Event Response",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>`,
            sections: [
                {
                    title: "Arquitectura Orientada a Eventos",
                    content: `
                        <h3>Reaccionando en Tiempo Real: Eventos</h3>
                        <p>Una arquitectura orientada a eventos utiliza eventos para desencadenar y comunicar entre servicios desacoplados. Es un patrón común para aplicaciones modernas y resilientes.</p>
                        <h4>Amazon EventBridge</h4>
                        <p>Es un bus de eventos sin servidor que facilita la conexión de aplicaciones con datos de diversas fuentes. EventBridge recibe un evento (un indicador de un cambio en un entorno) y aplica una regla para enrutar el evento a un destino.</p>
                        <ul>
                            <li><strong>Event Bus:</strong> Un canal que recibe eventos. Existe un bus de eventos predeterminado en cada cuenta de AWS.</li>
                            <li><strong>Rules:</strong> Coinciden con los eventos entrantes y los enrutan a los destinos para su procesamiento.</li>
                            <li><strong>Targets:</strong> El recurso que procesa el evento (ej. una función Lambda, una cola SQS, una máquina de estados de Step Functions).</li>
                        </ul>
                    `
                },
                {
                    title: "Remediación Automatizada",
                    content: `
                        <h3>De la Detección a la Corrección Automática</h3>
                        <p>La respuesta a incidentes eficaz en la nube se basa en la automatización para remediar problemas sin intervención humana.</p>
                        <h4>AWS Config</h4>
                        <p>Permite evaluar, auditar y registrar las configuraciones de tus recursos de AWS. Con las reglas de AWS Config, puedes comprobar continuamente si tus recursos cumplen con las políticas y directrices deseadas. Es clave para la detección de configuraciones no deseadas.</p>
                        <h4>Systems Manager Automation</h4>
                        <p>Permite crear flujos de trabajo (runbooks) para automatizar tareas operativas comunes, como reiniciar una instancia, crear una AMI o aplicar parches. Puede ser el destino de una regla de EventBridge para una remediación automática. Por ejemplo, si AWS Config detecta un bucket S3 público, una regla de EventBridge puede activar un runbook de SSM Automation para hacerlo privado.</p>
                    `
                }
            ]
        },
        '6': {
            title: "Security & Compliance",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm-1.5 6.445-1.5 1.5M7.5 12l-1.5 1.5m1.5-1.5 1.5-1.5m-1.5 1.5L9 10.5m-1.5 1.5-1.5-1.5M15 9.75l-1.5-1.5M13.5 12l-1.5-1.5m1.5 1.5 1.5 1.5m-1.5-1.5 1.5-1.5m-1.5 1.5-1.5 1.5" /></svg>`,
            sections: [
                {
                    title: "Gestión de Identidad y Acceso (IAM)",
                    content: `
                        <h3>Control de Acceso: ¿Quién Puede Hacer Qué?</h3>
                        <p>IAM (Identity and Access Management) es el servicio que te permite gestionar de forma segura el acceso a los servicios y recursos de AWS. Es uno de los pilares de la seguridad en la nube.</p>
                        <ul>
                            <li><strong>Users:</strong> Una entidad que creas en AWS para representar a la persona o aplicación que interactúa con AWS.</li>
                            <li><strong>Groups:</strong> Una colección de usuarios de IAM. Permiten especificar permisos para múltiples usuarios, lo que facilita la gestión.</li>
                            <li><strong>Roles:</strong> Una identidad con políticas de permisos que puede ser asumida por cualquier entidad que la necesite. No tienen credenciales a largo plazo. Es la forma recomendada de conceder permisos a servicios de AWS o a usuarios federados.</li>
                            <li><strong>Policies:</strong> Documentos JSON que definen los permisos. Se adjuntan a usuarios, grupos o roles.</li>
                        </ul>
                        <div class="info-box"><strong>Principio de Privilegio Mínimo:</strong> Concede solo los permisos necesarios para realizar una tarea y nada más.</div>
                    `
                },
                {
                    title: "Protección de Datos y Red",
                    content: `
                        <h3>Asegurando tus Activos Digitales</h3>
                        <h4>Cifrado de Datos</h4>
                        <ul>
                            <li><strong>AWS KMS (Key Management Service):</strong> Facilita la creación y gestión de claves criptográficas y controla su uso en una amplia gama de servicios de AWS.</li>
                            <li><strong>Cifrado en Reposo (at-rest):</strong> Proteger los datos mientras están almacenados en servicios como S3, EBS o RDS.</li>
                            <li><strong>Cifrado en Tránsito (in-transit):</strong> Proteger los datos mientras viajan entre tus recursos y tus usuarios, típicamente usando TLS/SSL.</li>
                        </ul>
                        <h4>Seguridad de Red y Aplicaciones</h4>
                        <ul>
                            <li><strong>VPC (Virtual Private Cloud):</strong> Te permite aprovisionar una sección lógicamente aislada de la nube de AWS donde puedes lanzar recursos en una red virtual que tú definas.</li>
                            <li><strong>Security Groups:</strong> Actúan como un firewall virtual para tus instancias, controlando el tráfico entrante y saliente a nivel de instancia.</li>
                            <li><strong>AWS WAF (Web Application Firewall):</strong> Ayuda a proteger tus aplicaciones web o APIs contra exploits web comunes que pueden afectar la disponibilidad, comprometer la seguridad o consumir recursos excesivos.</li>
                            <li><strong>AWS Shield:</strong> Un servicio gestionado de protección contra ataques de denegación de servicio distribuido (DDoS).</li>
                        </ul>
                    `
                }
            ]
        }
    };


    // ========================================================================
    //  LÓGICA DE LA APLICACIÓN
    // ========================================================================
    const mainMenu = document.getElementById('main-menu');
    const topicGrid = document.getElementById('topic-grid');
    const studyView = document.getElementById('study-view');
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarNav = document.getElementById('sidebar-nav');
    const studyContent = document.getElementById('study-content');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');

    // --- Inicialización ---
    function init() {
        renderMainMenu();
        backToMenuBtn.addEventListener('click', showMainMenu);
    }

    // --- Renderizado del Menú Principal ---
    function renderMainMenu() {
        topicGrid.innerHTML = '';
        Object.keys(studyData).forEach(id => {
            const topic = studyData[id];
            const card = document.createElement('div');
            card.className = 'topic-card cursor-pointer p-6 flex flex-col items-center text-center fade-in';
            card.style.animationDelay = `${id * 100}ms`;
            card.innerHTML = `
                <div class="icon-container p-4 rounded-full mb-4">${topic.icon}</div>
                <h2 class="text-2xl font-bold text-white">${topic.title}</h2>
            `;
            card.addEventListener('click', () => showStudyView(id));
            topicGrid.appendChild(card);
        });
    }

    // --- Transiciones de Vista ---
    function showStudyView(topicId) {
        mainMenu.classList.add('fade-out');
        setTimeout(() => {
            mainMenu.style.display = 'none';
            studyView.style.display = 'block';
            studyView.classList.remove('slide-out-left');
            studyView.classList.add('slide-in-right');
            renderStudySection(topicId, 0); // Mostrar la primera sección por defecto
        }, 500);
    }

    function showMainMenu() {
        studyView.classList.remove('slide-in-right');
        studyView.classList.add('slide-out-left');
        setTimeout(() => {
            studyView.style.display = 'none';
            mainMenu.style.display = 'block';
            mainMenu.classList.remove('fade-out');
        }, 500);
    }

    // --- Renderizado del Contenido de Estudio ---
    function renderStudySection(topicId, sectionIndex) {
        const topic = studyData[topicId];
        sidebarTitle.textContent = topic.title;

        // Renderizar navegación del sidebar
        sidebarNav.innerHTML = '';
        topic.sections.forEach((section, index) => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = section.title;
            link.className = 'sub-topic-link block p-3 rounded-lg text-gray-300 hover:bg-gray-700';
            if (index === sectionIndex) {
                link.classList.add('active');
            }
            link.addEventListener('click', (e) => {
                e.preventDefault();
                renderStudySection(topicId, index);
            });
            sidebarNav.appendChild(link);
        });

        // Renderizar contenido principal
        studyContent.innerHTML = topic.sections[sectionIndex].content;
        document.querySelector('#study-view main').scrollTop = 0; // Reset scroll
    }
    
    init();
});

