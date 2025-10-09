export const area2Content = {
    title: "Configuration Management & IaC",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.926a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m15.459 0a4.5 4.5 0 0 1-1.541 3.309l-5.415 4.131a3.375 3.375 0 0 1-4.075 0l-5.415-4.131a4.5 4.5 0 0 1-1.541-3.309m15.459 0z" /></svg>`,
    sections: [
        {
            title: "Informe de Misión: CloudFormation",
            content: `
                <h3>Misión: Dominar la Infraestructura como Código</h3>
                <p>AWS CloudFormation es tu herramienta principal para definir y aprovisionar tu infraestructura en la nube de manera declarativa. Trata tu infraestructura como si fuera software: versiona, revisa y reutiliza tus plantillas.</p>
                
                <h4>Anatomía de una Plantilla</h4>
                <ul>
                    <li><strong>Parameters:</strong> Permiten que tus plantillas sean reutilizables al solicitar entradas en el momento del despliegue (ej. tipo de instancia, nombre de VPC).</li>
                    <li><strong>Mappings:</strong> Son tablas de consulta estáticas. Perfectas para seleccionar valores basados en una clave, como el ID de la AMI según la región.</li>
                    <li><strong>Conditions:</strong> Definen si un recurso se crea o no. Útil para diferenciar entre entornos (ej. crear recursos de monitoreo solo en producción).</li>
                    <li><strong>Resources (Obligatorio):</strong> El corazón de la plantilla. Aquí declaras los recursos de AWS que quieres crear y sus configuraciones.</li>
                    <li><strong>Outputs:</strong> Expone información importante del stack (ej. la URL de un Load Balancer) para que otros stacks puedan usarla o para que tú la consultes.</li>
                </ul>
            `
        },
        {
            title: "Tácticas de Gestión de Stacks",
            content: `
                <h3>Operaciones Avanzadas de Stacks</h3>
                <p>Gestionar stacks de forma segura y eficiente es una habilidad crítica para un DevOps Engineer. Estas son tus herramientas clave.</p>
                
                <h4>Change Sets: Previsualizar el Impacto</h4>
                <p>Antes de actualizar un stack, crea un 'change set'. CloudFormation te mostrará un resumen detallado de los cambios que se aplicarán (qué se creará, modificará o eliminará). <strong>Intel Clave:</strong> Es tu red de seguridad para evitar cambios destructivos no deseados en producción.</p>

                <h4>Drift Detection: Detectar Cambios Manuales</h4>
                <p>El 'drift' ocurre cuando la configuración real de un recurso se desvía de lo definido en la plantilla de CloudFormation. La detección de deriva te permite identificar estos cambios manuales para poder corregirlos y mantener la consistencia. <strong>Alerta Táctica:</strong> La detección de deriva solo te informa, no revierte los cambios automáticamente.</p>

                <h4>StackSets: Despliegue Multi-Cuenta y Multi-Región</h4>
                <p>Con StackSets, puedes desplegar y gestionar una plantilla de CloudFormation en múltiples cuentas de AWS y regiones desde una única cuenta de administrador. Es la herramienta perfecta para aplicar configuraciones base (baselines) de seguridad, roles de IAM o configuraciones de VPC en toda tu organización.</p>
            `
        },
        {
            title: "Gestión de Secretos y Parámetros",
            content: `
                <h3>Asegurando la Configuración Sensible</h3>
                <p>Nunca debes almacenar secretos (como contraseñas o claves de API) directamente en tu código o plantillas. AWS proporciona servicios especializados para esto.</p>
                
                <h4>AWS Systems Manager Parameter Store</h4>
                <ul>
                    <li><strong>Standard Tier:</strong> Gratuito, ideal para la mayoría de los casos de uso de configuración. Límite de 10,000 parámetros.</li>
                    <li><strong>Advanced Tier:</strong> De pago, permite más parámetros, tamaños de valor más grandes y políticas de parámetros (ej. forzar la expiración).</li>
                    <li><strong>SecureString:</strong> Usa KMS para cifrar el valor del parámetro.</li>
                </ul>

                <h4>AWS Secrets Manager</h4>
                <p>Es el servicio preferido para gestionar secretos. Ofrece todas las capacidades de Parameter Store, más:</p>
                <ul>
                    <li><strong>Rotación Automática de Secretos:</strong> Se integra con servicios como RDS para rotar credenciales automáticamente sin intervención manual, mejorando drásticamente la seguridad.</li>
                    <li><strong>Políticas de Secretos:</strong> Control de acceso a nivel de recurso más granular.</li>
                </ul>
                <div class="info-box mt-8">
                    <strong>Intel Clave:</strong> Para el examen, si la pregunta menciona "rotación automática de credenciales", la respuesta casi siempre es AWS Secrets Manager.
                </div>
            `
        }
    ]
};

