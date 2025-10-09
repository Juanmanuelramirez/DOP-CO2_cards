export const area6Content = {
    title: "Security & Compliance",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm-1.5 6.445-1.5 1.5M7.5 12l-1.5 1.5m1.5-1.5 1.5-1.5m-1.5 1.5L9 10.5m-1.5 1.5-1.5-1.5M15 9.75l-1.5-1.5M13.5 12l-1.5-1.5m1.5 1.5 1.5 1.5m-1.5-1.5 1.5-1.5m-1.5 1.5-1.5 1.5" /></svg>`,
    sections: [
        {
            title: "Informe de Misión: Seguridad Integral",
            content: `
                <h3>Misión: Fortificar tu Infraestructura</h3>
                <p>La seguridad en AWS es una responsabilidad compartida. AWS se encarga de la seguridad <strong>de</strong> la nube, pero tú eres responsable de la seguridad <strong>en</strong> la nube. Tu misión es implementar una defensa en profundidad, aplicando controles de seguridad en cada capa de tu aplicación.</p>
            `
        },
        {
            title: "Arsenal: Control de Acceso y Cifrado",
            content: `
                <h3>IAM y KMS: Las Llaves del Reino</h3>
                
                <h4>AWS Identity and Access Management (IAM)</h4>
                <p>IAM es el núcleo de la seguridad en AWS. Aplica siempre el <strong>principio de mínimo privilegio</strong>.</p>
                <ul>
                    <li><strong>Roles de IAM:</strong> El método más seguro para otorgar permisos a los servicios de AWS o a usuarios federados. Son temporales y no requieren claves de acceso de larga duración.</li>
                    <li><strong>Políticas de IAM:</strong> Definen los permisos. Pueden ser basadas en identidad (adjuntas a un usuario/rol) o basadas en recursos (adjuntas a un bucket S3, por ejemplo).</li>
                    <li><strong>Límites de Permisos (Permissions Boundaries):</strong> Una característica avanzada para delegar la creación de roles. Un límite establece los permisos máximos que un rol puede tener, incluso si su política de identidad le otorga más.</li>
                </ul>

                <h4>AWS Key Management Service (KMS)</h4>
                <p>KMS es un servicio gestionado que facilita la creación y el control de las claves de cifrado utilizadas para cifrar tus datos.</p>
                <ul>
                    <li><strong>Claves Gestionadas por el Cliente (CMK):</strong> Tú controlas la política de la clave, puedes rotarla y auditar su uso.</li>
                    <li><strong>Claves Gestionadas por AWS:</strong> AWS gestiona el ciclo de vida de la clave por ti.</li>
                    <li><strong>Cifrado de Sobre (Envelope Encryption):</strong> KMS utiliza este método. Genera una clave de datos única para cifrar tus datos; luego, cifra esa clave de datos con una CMK. Esto es más eficiente que enviar grandes cantidades de datos a KMS para ser cifrados.</li>
                </ul>
            `
        },
        {
            title: "Tácticas de Seguridad de Red y Aplicación",
            content: `
                <h3>Defendiendo el Perímetro y el Código</h3>
                
                <h4>Seguridad de VPC</h4>
                <ul>
                    <li><strong>Grupos de Seguridad (Security Groups):</strong> Actúan como un firewall a nivel de instancia (stateful). Permites tráfico entrante y el tráfico de retorno se permite automáticamente.</li>
                    <li><strong>Listas de Control de Acceso de Red (NACLs):</strong> Actúan como un firewall a nivel de subred (stateless). Debes definir reglas tanto para el tráfico de entrada como para el de salida.</li>
                </ul>

                <h4>AWS WAF & Shield</h4>
                <ul>
                    <li><strong>AWS WAF (Web Application Firewall):</strong> Protege tus aplicaciones web de exploits comunes como inyección SQL y Cross-Site Scripting (XSS). Se integra con CloudFront, ALB y API Gateway.</li>
                    <li><strong>AWS Shield:</strong> Un servicio gestionado de protección contra ataques de Denegación de Servicio Distribuido (DDoS). Shield Standard está activado por defecto y sin costo adicional. Shield Advanced ofrece protección adicional y soporte especializado.</li>
                </ul>

                 <div class="info-box mt-8">
                    <strong>Intel Clave:</strong> Para el examen, entiende la diferencia fundamental: los Grupos de Seguridad son 'stateful' y operan a nivel de ENI/instancia, mientras que las NACLs son 'stateless' y operan a nivel de subred.
                </div>
            `
        }
    ]
};

