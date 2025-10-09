export const area5Content = {
    title: "Incident & Event Response",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>`,
    sections: [
        {
            title: "Informe de Misión: Respuesta Rápida",
            content: `
                <h3>Misión: Detectar, Responder, Recuperar</h3>
                <p>Un incidente es cualquier evento no planificado que interrumpe o reduce la calidad de un servicio. Tu misión como DevOps Engineer es construir sistemas que no solo sean resistentes a los incidentes, sino que también permitan una respuesta automatizada y rápida para minimizar el impacto en el negocio.</p>
            `
        },
        {
            title: "Arsenal: Herramientas de Respuesta",
            content: `
                <h3>Automatizando la Remediación</h3>
                <p>La clave para una respuesta a incidentes eficaz en la nube es la automatización. La intervención manual es lenta y propensa a errores.</p>

                <h4>Amazon EventBridge: El Sistema Nervioso Central</h4>
                <p>EventBridge es fundamental para la respuesta a eventos. Te permite crear reglas que detectan eventos específicos (ej. un hallazgo de seguridad de GuardDuty, un cambio de estado en una instancia EC2) y enrutan esos eventos a 'targets' para tomar acción.</p>

                <h4>AWS Systems Manager: La Caja de Herramientas del Operador</h4>
                <p>SSM es un conjunto de herramientas para la gestión y automatización de operaciones en AWS.</p>
                <ul>
                    <li><strong>Automation (Runbooks):</strong> Te permite crear 'runbooks' para automatizar tareas operativas comunes, como parchear una instancia, crear una AMI o reiniciar un servicio. Puedes invocar estos runbooks desde EventBridge.</li>
                    <li><strong>Incident Manager:</strong> Un servicio de gestión de incidentes que te ayuda a preparar planes de respuesta (response plans), involucrar a las personas adecuadas y realizar análisis post-incidente.</li>
                    <li><strong>OpsCenter:</strong> Centraliza los problemas operativos (OpsItems) de varias fuentes de AWS, permitiéndote investigar y remediar desde un único lugar.</li>
                </ul>

                <h4>AWS Config: El Guardián de la Configuración</h4>
                <p>AWS Config monitorea y registra continuamente las configuraciones de tus recursos. Puedes crear reglas de Config para evaluar si tus recursos cumplen con las políticas deseadas. <strong>Intel Clave:</strong> Se integra con Systems Manager Automation para permitir la remediación automática de recursos no conformes.</p>
            `
        },
        {
            title: "Tácticas de Notificación y Análisis",
            content: `
                <h3>Comunicación y Mejora Continua</h3>
                
                <h4>Amazon Simple Notification Service (SNS)</h4>
                <p>SNS es un servicio de mensajería pub/sub totalmente gestionado. Es el método más común para enviar notificaciones a personas (vía email, SMS) o a otros servicios (endpoints HTTP, colas SQS, funciones Lambda) en respuesta a una alarma o evento.</p>

                <h4>Análisis Post-Incidente</h4>
                <p>Después de que un incidente se resuelve, el trabajo no ha terminado. Es crucial realizar un análisis post-mortem (o post-incidente) para entender la causa raíz y definir acciones para prevenir que vuelva a ocurrir. Herramientas como CloudWatch Logs Insights y AWS X-Ray son fundamentales en esta fase de investigación.</p>
                 <div class="info-box mt-8">
                    <strong>Alerta Táctica:</strong> Un patrón de respuesta común para el examen: <strong>CloudWatch Alarm -> SNS Topic -> Lambda Function -> Systems Manager Automation Runbook.</strong> Domina este flujo.
                </div>
            `
        }
    ]
};

