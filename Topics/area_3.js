export const area3Content = {
    title: "Resilient Cloud Solutions",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
    sections: [
        {
            title: "Alta Disponibilidad (HA) y Escalabilidad",
            content: `
                <h3>Construyendo Sistemas a Prueba de Fallos</h3>
                <p>La resiliencia en la nube se basa en la capacidad de un sistema para recuperarse de fallos y seguir funcionando. La alta disponibilidad (HA) y la escalabilidad son los pilares de esta capacidad.</p>
                <h4>Elastic Load Balancing (ELB)</h4>
                <ul>
                    <li><strong>Application Load Balancer (ALB):</strong> Ideal para tráfico HTTP/HTTPS (Capa 7). Permite enrutamiento avanzado basado en contenido (host, path), lo que es perfecto para microservicios y contenedores.</li>
                    <li><strong>Network Load Balancer (NLB):</strong> Para tráfico TCP/UDP (Capa 4). Ofrece un rendimiento ultra alto y una dirección IP estática por Zona de Disponibilidad.</li>
                    <li><strong>Gateway Load Balancer (GWLB):</strong> Permite desplegar, escalar y gestionar dispositivos virtuales de terceros, como firewalls o sistemas de prevención de intrusiones.</li>
                </ul>
                 <h4>Auto Scaling a Detalle</h4>
                <p>AWS Auto Scaling monitorea tus aplicaciones y ajusta automáticamente la capacidad para mantener un rendimiento estable y predecible al menor costo posible.</p>
                 <ul>
                    <li><strong>Políticas de Escalado Dinámico:</strong> Responden a cambios en la demanda. Incluyen 'Target Tracking' (ej. mantener la CPU al 70%), 'Step Scaling' y 'Simple Scaling'.</li>
                    <li><strong>Escalado Predictivo:</strong> Utiliza machine learning para predecir los picos de tráfico futuros y aprovisionar la capacidad por adelantado.</li>
                    <li><strong>Escalado Programado:</strong> Escala la aplicación en respuesta a cambios predecibles en la demanda (ej. aumentar la capacidad todos los días a las 9 AM).</li>
                </ul>
            `
        },
        // ... (Más secciones detalladas para el Área 3)
    ]
};
