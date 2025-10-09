export const area3Content = {
    title: "Resilient Cloud Solutions",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
    sections: [
        {
            title: "Informe de Misión: Alta Disponibilidad",
            content: `
                <h3>Misión: Construir Sistemas Inquebrantables</h3>
                <p>La resiliencia es la capacidad de tu aplicación para soportar fallos y recuperarse automáticamente. El objetivo es eliminar los puntos únicos de fallo (Single Points of Failure) y asegurar la continuidad del servicio.</p>
                
                <h4>Pilares de la Resiliencia</h4>
                <ul>
                    <li><strong>Multi-AZ (Multi-Availability Zone):</strong> Desplegar recursos en múltiples Zonas de Disponibilidad dentro de una misma región. Si una AZ falla (ej. por una inundación o un corte de energía), tu aplicación sigue funcionando desde las otras AZ.</li>
                    <li><strong>Elastic Load Balancing (ELB):</strong> Distribuye el tráfico entrante entre múltiples destinos (como instancias EC2) en múltiples AZ. Es un componente fundamental para la alta disponibilidad.</li>
                    <li><strong>Auto Scaling:</strong> Asegura que siempre tengas el número óptimo de instancias para manejar la carga de tu aplicación. Reemplaza automáticamente las instancias que fallen.</li>
                </ul>
            `
        },
        {
            title: "Tácticas de Escalabilidad",
            content: `
                <h3>Estrategias para Manejar Cualquier Carga</h3>
                <p>La escalabilidad es la capacidad de un sistema para manejar una carga creciente. En AWS, la escalabilidad debe ser elástica y automática.</p>
                
                <h4>Políticas de Auto Scaling</h4>
                <ul>
                    <li><strong>Target Tracking:</strong> La más simple y recomendada. Mantienes una métrica clave (ej. utilización de CPU) en un valor objetivo (ej. 75%). Auto Scaling se encarga de añadir o quitar instancias para mantener ese objetivo.</li>
                    <li><strong>Step Scaling:</strong> Permite definir diferentes acciones de escalado basadas en el tamaño de la brecha de la alarma (ej. si la CPU está entre 70-80%, añade 1 instancia; si supera el 80%, añade 3).</li>
                    <li><strong>Scheduled Scaling:</strong> Para patrones de tráfico predecibles. Aumentas la capacidad antes de un pico conocido (ej. a las 8 AM cada día laboral) y la reduces después.</li>
                </ul>

                <h4>Lifecycle Hooks de Auto Scaling</h4>
                <p>Los 'hooks' te permiten pausar el lanzamiento o la terminación de una instancia para ejecutar acciones personalizadas. <strong>Caso de uso común:</strong> Antes de que una instancia sea terminada, un 'hook' puede ejecutar un script para descargar logs o drenar conexiones de forma segura.</p>
            `
        },
        {
            title: "Estrategias de Recuperación de Desastres (DR)",
            content: `
                <h3>Planes de Contingencia Global</h3>
                <p>La Recuperación de Desastres (DR) se enfoca en recuperarse de eventos que afectan a toda una región de AWS.</p>
                
                <h4>Objetivos Clave: RTO y RPO</h4>
                <ul>
                    <li><strong>RTO (Recovery Time Objective):</strong> El tiempo máximo que puede tardar tu aplicación en recuperarse después de un desastre.</li>
                    <li><strong>RPO (Recovery Point Objective):</strong> La cantidad máxima de pérdida de datos aceptable, medida en tiempo (ej. 5 minutos de datos perdidos).</li>
                </ul>

                <h4>Estrategias Comunes (De más barata a más cara)</h4>
                <ul>
                    <li><strong>Backup and Restore:</strong> La más lenta y barata. Simplemente haces copias de seguridad de tus datos en otra región.</li>
                    <li><strong>Pilot Light:</strong> Se mantiene una réplica mínima de tu infraestructura en la región de DR, con los servicios principales encendidos pero a mínima escala.</li>
                    <li><strong>Warm Standby:</strong> Una versión a escala reducida de tu infraestructura siempre está funcionando en la región de DR. La recuperación es más rápida.</li>
                    <li><strong>Multi-Site Active/Active:</strong> Tu aplicación funciona a plena capacidad en múltiples regiones simultáneamente. El RTO y RPO son cercanos a cero, pero es la opción más compleja y costosa.</li>
                </ul>
                <div class="info-box mt-8">
                    <strong>Intel Clave:</strong> Usa Amazon Route 53 con políticas de enrutamiento como 'Failover' para redirigir automáticamente el tráfico a tu región de DR cuando se detecta un fallo en la región primaria.
                </div>
            `
        }
    ]
};

