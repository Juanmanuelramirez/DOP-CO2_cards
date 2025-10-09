export const area1Content = {
    title: "SDLC Automation",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`,
    sections: [
        {
            title: "Informe de Misión: CI/CD",
            content: `
                <h3>Misión: Automatizar el Flujo de Entrega</h3>
                <p>Tu objetivo es dominar la Integración Continua y la Entrega/Despliegue Continuos (CI/CD). Esta es la columna vertebral de DevOps en AWS, permitiendo ciclos de lanzamiento rápidos y fiables. Tu misión es automatizar cada paso, desde el commit del código hasta su puesta en producción.</p>
                
                <h4>Fases de Combate: CI vs. CD</h4>
                <ul>
                    <li><strong>Integración Continua (CI):</strong> La práctica de fusionar el código de todos los desarrolladores en una rama principal de forma regular. Cada fusión dispara una compilación y pruebas automatizadas. <strong>Intel Clave:</strong> Su principal objetivo es detectar conflictos y errores de integración de forma temprana.</li>
                    <li><strong>Entrega Continua (Continuous Delivery):</strong> El siguiente nivel. El código que pasa la fase de CI se empaqueta y se despliega automáticamente en un entorno de pre-producción (staging). El despliegue final a producción requiere una aprobación manual. <strong>Ventaja Táctica:</strong> Siempre tienes un artefacto listo para ser desplegado.</li>
                    <li><strong>Despliegue Continuo (Continuous Deployment):</strong> El despliegue de élite. Cada cambio que supera todas las pruebas se despliega en producción automáticamente. <strong>Alerta:</strong> Requiere un altísimo nivel de confianza en tu suite de pruebas automatizadas.</li>
                </ul>
            `
        },
        {
            title: "Arsenal: AWS Developer Tools",
            content: `
                <h3>Tu Equipamiento Táctico en AWS</h3>
                <p>Para ejecutar tu misión de CI/CD, AWS te proporciona un conjunto de herramientas especializadas, cada una con un propósito específico en el campo de batalla del desarrollo.</p>
                
                <h4>AWS CodePipeline: El Orquestador</h4>
                <p>Piensa en CodePipeline como tu centro de mando. Orquesta el flujo de trabajo completo, conectando los diferentes servicios. Sus componentes son:</p>
                <ul>
                    <li><strong>Stages (Etapas):</strong> Fases lógicas del pipeline (ej. Source, Build, Deploy).</li>
                    <li><strong>Actions (Acciones):</strong> Tareas específicas dentro de una etapa (ej. obtener código de CodeCommit, compilar con CodeBuild).</li>
                    <li><strong>Artifacts (Artefactos):</strong> Los archivos (código fuente, binarios compilados) que se mueven entre etapas. Se almacenan en un bucket de S3 gestionado por el pipeline.</li>
                    <li><strong>Transitions (Transiciones):</strong> Conectan las etapas. Puedes deshabilitarlas para pausar el pipeline.</li>
                </ul>

                <h4>AWS CodeCommit: El Repositorio Seguro</h4>
                <p>Un servicio de control de código fuente basado en Git, totalmente gestionado. Es tu base de operaciones segura para el código. <strong>Intel Clave:</strong> Se integra nativamente con IAM, permitiendo un control de acceso granular.</p>
                
                <h4>AWS CodeBuild: La Fábrica de Artefactos</h4>
                <p>Un servicio de compilación efímero y totalmente gestionado. Compila tu código, ejecuta pruebas y produce artefactos de software listos para desplegar. Su comportamiento se define en un archivo <code>buildspec.yml</code>.</p>
                
                <h4>AWS CodeDeploy: El Equipo de Despliegue</h4>
                <p>Automatiza los despliegues de aplicaciones en una variedad de servicios. <strong>Intel Clave:</strong> Su principal fortaleza son las estrategias de despliegue avanzadas para minimizar el tiempo de inactividad.</p>
            `
        },
        {
            title: "Tácticas de Despliegue Avanzadas",
            content: `
                <h3>Estrategias para un Despliegue sin Bajas</h3>
                <p>CodeDeploy te permite ejecutar despliegues complejos que protegen tu aplicación y a tus usuarios. Dominar estas tácticas es crucial.</p>
                
                <h4>Despliegue Blue/Green</h4>
                <ul>
                    <li><strong>Cómo funciona:</strong> Se aprovisiona un nuevo entorno (Green) idéntico al de producción (Blue). El tráfico se redirige instantáneamente del entorno Blue al Green.</li>
                    <li><strong>Ventaja Táctica:</strong> Rollback casi instantáneo simplemente redirigiendo el tráfico de vuelta al entorno Blue. Ideal para despliegues sin tiempo de inactividad.</li>
                    <li><strong>Soporte:</strong> EC2, ECS, y Lambda.</li>
                </ul>

                <h4>Despliegue Canary (Lineal)</h4>
                <ul>
                    <li><strong>Cómo funciona:</strong> El tráfico se desplaza gradualmente de la versión antigua a la nueva en incrementos predefinidos (ej. 10% cada minuto).</li>
                    <li><strong>Ventaja Táctica:</strong> Permite monitorizar la nueva versión con una pequeña porción de tráfico real. Se pueden configurar alarmas de CloudWatch para revertir automáticamente si se detectan problemas.</li>
                    <li><strong>Soporte:</strong> Lambda y ECS.</li>
                </ul>

                <div class="info-box mt-8">
                    <strong>Alerta Táctica:</strong> Para el examen, recuerda la diferencia clave: Blue/Green cambia el 100% del tráfico de una vez, mientras que Canary/Linear lo hace de forma gradual e incremental.
                </div>
            `
        }
    ]
};

