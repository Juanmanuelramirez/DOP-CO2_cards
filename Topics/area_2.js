export const area2Content = {
    title: "Configuration Management & IaC",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.926a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m15.459 0a4.5 4.5 0 0 1-1.541 3.309l-5.415 4.131a3.375 3.375 0 0 1-4.075 0l-5.415-4.131a4.5 4.5 0 0 1-1.541-3.309m15.459 0z" /></svg>`,
    sections: [
        {
            title: "AWS CloudFormation a Profundidad",
            content: `
                <h3>Dominando CloudFormation</h3>
                <p>AWS CloudFormation es el servicio nativo de AWS para la Infraestructura como Código (IaC). Permite modelar, aprovisionar y gestionar recursos de AWS y de terceros de forma predecible y segura.</p>
                <h4>Componentes Clave de una Plantilla</h4>
                <ul>
                    <li><strong>Parameters:</strong> Permiten introducir valores personalizados a tu plantilla cada vez que creas o actualizas un stack. Son como los argumentos de una función.</li>
                    <li><strong>Mappings:</strong> Son tablas de consulta clave-valor que puedes usar para establecer valores condicionales. Un caso de uso común es seleccionar el tipo de AMI según la región.</li>
                    <li><strong>Conditions:</strong> Controlan si ciertos recursos se crean o si ciertas propiedades se asignan a un recurso durante la creación o actualización del stack.</li>
                    <li><strong>Resources (Obligatorio):</strong> Especifica los recursos del stack que quieres crear, como una instancia EC2 o un bucket S3.</li>
                    <li><strong>Outputs:</strong> Declara valores que quieres que se devuelvan para poder importarlos en otros stacks o simplemente para consultarlos.</li>
                </ul>
                <h4>Gestión Avanzada de Stacks</h4>
                <p>Para el examen, es crucial entender cómo gestionar stacks de forma segura:</p>
                <ul>
                    <li><strong>Change Sets:</strong> Antes de aplicar cambios a un stack, crea un 'change set' para previsualizar exactamente qué recursos serán modificados, creados o eliminados. Es una práctica de seguridad fundamental para evitar cambios inesperados.</li>
                    <li><strong>Drift Detection:</strong> Detecta cambios en la configuración de los recursos de tu stack realizados fuera de CloudFormation (ej. manualmente desde la consola). Esto te ayuda a mantener la consistencia entre tu plantilla y el estado real de tu infraestructura.</li>
                    <li><strong>StackSets:</strong> Permite desplegar y gestionar el mismo stack en múltiples cuentas de AWS y regiones con una sola plantilla. Ideal para configuraciones base (baseline) de seguridad o gobernanza.</li>
                </ul>
            `
        },
        // ... (Más secciones detalladas para el Área 2)
    ]
};
