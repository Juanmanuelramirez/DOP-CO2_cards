export const area4Content = {
    title: "Monitoring & Logging",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>`,
    sections: [
        {
            title: "Informe de Misión: Visibilidad Total",
            content: `
                <h3>Misión: Ver Todo, Saber Todo</h3>
                <p>El monitoreo y el registro son tus ojos y oídos en la nube. Sin una visibilidad completa del rendimiento y el estado de tu aplicación, estás operando a ciegas. Tu misión es implementar una estrategia de monitoreo robusta que te permita detectar, diagnosticar y resolver problemas de forma proactiva.</p>
            `
        },
        {
            title: "Arsenal: Amazon CloudWatch",
            content: `
                <h3>CloudWatch: Tu Centro de Observabilidad</h3>
                <p>CloudWatch es un conjunto de servicios que te proporciona datos y conocimientos prácticos para monitorear tus aplicaciones, responder a los cambios de rendimiento y optimizar el uso de recursos.</p>
                
                <h4>CloudWatch Metrics</h4>
                <p>Son series temporales de datos. AWS proporciona métricas estándar para la mayoría de sus servicios (ej. CPUUtilization de EC2). También puedes publicar tus propias <strong>métricas personalizadas</strong> desde tus aplicaciones.</p>
                <ul>
                    <li><strong>Resolución Estándar:</strong> 1 minuto.</li>
                    <li><strong>Resolución Alta:</strong> Hasta 1 segundo. <strong>Intel Clave:</strong> Útil para aplicaciones muy dinámicas, pero tiene un costo mayor.</li>
                </ul>

                <h4>CloudWatch Alarms</h4>
                <p>Observan una única métrica durante un período de tiempo y ejecutan acciones basadas en el valor de la métrica en relación con un umbral. <strong>Novedad importante:</strong> Las <strong>alarmas compuestas</strong> te permiten combinar múltiples alarmas en una lógica más compleja (ej. ALARMA si (CPU > 80%) Y (Latencia > 500ms)).</p>
                
                <h4>CloudWatch Logs</h4>
                <p>Centraliza los logs de todos tus sistemas, aplicaciones y servicios de AWS. Puedes analizar estos datos con <strong>CloudWatch Logs Insights</strong>, un lenguaje de consulta potente para buscar y visualizar tus logs de forma interactiva.</p>
                
                <h4>CloudWatch Events / Amazon EventBridge</h4>
                <p>EventBridge es la evolución de CloudWatch Events. Es un bus de eventos sin servidor que facilita la conexión de aplicaciones utilizando datos de tus propias aplicaciones, SaaS y servicios de AWS. Permite construir arquitecturas basadas en eventos de forma sencilla.</p>
            `
        },
        {
            title: "Tácticas de Rastreo y Auditoría",
            content: `
                <h3>Siguiendo el Rastro: X-Ray y CloudTrail</h3>
                
                <h4>AWS X-Ray: Depuración de Microservicios</h4>
                <p>X-Ray te ayuda a analizar y depurar aplicaciones distribuidas, como las construidas con una arquitectura de microservicios. Proporciona una vista de extremo a extremo de las solicitudes a medida que viajan a través de tu aplicación.</p>
                <ul>
                    <li><strong>Traces (Trazas):</strong> Recopilan todos los segmentos generados por una única solicitud.</li>
                    <li><strong>Segments (Segmentos):</strong> La información sobre el trabajo realizado por un recurso (ej. una función Lambda).</li>
                    <li><strong>Service Map (Mapa de Servicio):</strong> Una representación visual de los componentes de tu aplicación.</li>
                </ul>

                <h4>AWS CloudTrail: Auditoría de API</h4>
                <p>CloudTrail registra todas las llamadas a la API de AWS realizadas en tu cuenta. Es tu principal herramienta para la auditoría de seguridad, el seguimiento de cambios y la solución de problemas operativos.</p>
                <ul>
                    <li><strong>Eventos de Gestión:</strong> Registran operaciones de gestión (ej. crear un bucket S3, lanzar una instancia EC2). Habilitados por defecto.</li>
                    <li><strong>Eventos de Datos:</strong> Registran operaciones a nivel de objeto (ej. GetObject de S3). Deshabilitados por defecto y de alto volumen.</li>
                </ul>
                 <div class="info-box mt-8">
                    <strong>Alerta Táctica:</strong> Para el examen, recuerda: CloudWatch es para el <strong>rendimiento</strong> (métricas, logs), CloudTrail es para la <strong>auditoría</strong> (quién hizo qué y cuándo).
                </div>
            `
        }
    ]
};

