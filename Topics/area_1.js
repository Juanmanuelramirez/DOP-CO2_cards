export const area1Content = {
    title: "SDLC Automation",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>`,
    sections: [
        {
            title: "Conceptos Fundamentales de CI/CD",
            content: `
                <h3>CI/CD: El Corazón de DevOps</h3>
                <p>La Integración Continua y la Entrega/Despliegue Continuos (CI/CD) son la base de las prácticas modernas de DevOps, permitiendo a los equipos de desarrollo entregar software de alta calidad de manera rápida y fiable. El objetivo es automatizar el ciclo de vida del software, desde la confirmación del código hasta la producción.</p>
                <h4>Integración Continua (CI)</h4>
                <p>Es la práctica de automatizar la integración de los cambios de código de múltiples contribuidores en un único proyecto de software. Los pasos clave son:</p>
                <ul>
                    <li>Los desarrolladores confirman el código en un repositorio compartido (ej. AWS CodeCommit) varias veces al día.</li>
                    <li>Cada confirmación desencadena una compilación automatizada (ej. con AWS CodeBuild).</li>
                    <li>Se ejecutan pruebas unitarias y de integración automatizadas para validar los cambios.</li>
                    <li><strong>Beneficio Principal:</strong> Detectar errores de integración de forma temprana y reducir los problemas de fusión de código.</li>
                </ul>
                <h4>Entrega Continua (Continuous Delivery)</h4>
                <p>Extiende la CI al asegurar que se pueda liberar nuevo código en producción en cualquier momento. Después de la fase de CI, el software se despliega automáticamente en un entorno similar a producción (staging) para más pruebas (rendimiento, seguridad, aceptación del usuario).</p>
                <ul>
                    <li>El despliegue a producción es un paso manual, a menudo con un solo clic, lo que proporciona control de negocio sobre cuándo liberar las nuevas características.</li>
                </ul>
                <h4>Despliegue Continuo (Continuous Deployment)</h4>
                <p>Es la máxima automatización del pipeline. Cada cambio que pasa todas las pruebas automatizadas se despliega directamente en producción sin intervención humana. Esta práctica es ideal para equipos con una alta confianza en su proceso de pruebas y monitoreo.</p>
            `
        },
        // ... (Más secciones detalladas para el Área 1)
    ]
};
