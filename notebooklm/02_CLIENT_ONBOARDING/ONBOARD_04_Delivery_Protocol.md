# 🚀 ONBOARD-04 — Protocolo de Entrega (Delivery Protocol)

**Propósito:** Estandarizar cómo Nivo entrega sus proyectos para garantizar una experiencia premium y transferencia de propiedad limpia.
**Aplica a:** Todos los proyectos (Core Unit, Growth Reactor, Sovereign Ecosystem)

---

> [!IMPORTANT]
> La entrega es el momento más importante de la relación con el cliente. No es el final del proyecto — es el inicio de la relación a largo plazo. Ejecuta cada paso con el mismo nivel de atención que el desarrollo.

---

## Fase de Pre-Entrega (3-5 días antes del deploy)

### Checklist técnico interno

- [ ] Código revisado y limpio (sin console.logs, sin variables huérfanas)
- [ ] Sitio probado en Chrome, Safari, Firefox y Edge
- [ ] Responsive completo en mobile, tablet y desktop
- [ ] Formulario de lead capture probado y conectado a Supabase (datos llegando)
- [ ] Kai funcionando correctamente (flujo de nodos completo)
- [ ] GA4 disparando eventos correctamente (verificar en DebugView)
- [ ] Velocidad de carga <2.5s en Lighthouse (mobile)
- [ ] SEO básico: title tags, meta descriptions, sitemap.xml, robots.txt
- [ ] SSL activo (HTTPS)
- [ ] No hay links rotos (404s)
- [ ] Dominio del cliente apunta a Vercel (DNS verificado)

### Preparar los entregables del cliente

- [ ] **Documento de Credenciales** (template): lista de todas las cuentas creadas con sus accesos
- [ ] **Video Walkthrough** (5-10 min): grabación en Loom del sitio completo con todas sus funciones
- [ ] **README del proyecto** en GitHub: qué hace cada archivo, cómo hacer cambios básicos
- [ ] **Brief de GA4**: cómo leer el dashboard, qué métricas importan

---

## La Llamada de Delivery (60-90 minutos)

Esta es la llamada más importante del proceso. Se hace EN VIVO y en pantalla compartida.

### Agenda de la llamada

```
[00:00–05:00]  Apertura
  → Contexto: "Hoy es el día que tu infraestructura queda activa."
  → Expectativas: "Al final de esta llamada, tú tienes todos los accesos y yo no."

[05:00–25:00]  Walkthrough del sitio
  → Tour completo del sitio desde la perspectiva del visitante
  → Demo del formulario (llenar uno en vivo → mostrar que llega al CRM)
  → Demo de Kai (interacción completa de un lead potencial)
  → Revisión mobile

[25:00–45:00]  Transferencia de accesos (en vivo)
  → GitHub repo: transferir a cuenta del cliente (o agregar como owner)
  → Vercel: transferir dominio o agregar como team member
  → Supabase: verificar que el cliente tiene acceso admin
  → GA4: verificar que el cliente tiene admin access
  → Google Search Console: verificar propiedad

[45:00–60:00]  "Cómo usar tu infraestructura"
  → Cómo ver los leads en Supabase
  → Cómo leer GA4 (dashboard básico)
  → Cómo hacer cambios de texto simples en el código (para clientes técnicos)
  → Para quién llamar si algo no funciona (Nivo SLA)

[60:00–75:00]  Preguntas y siguientes pasos
  → ¿Hay algo que quieras ver de nuevo?
  → Presentar la siguiente evolución (si aplica): "Ahora que tienes la base, el siguiente paso natural es..."
  → Acordar el check-in de 30 días
```

---

## Transferencia de Propiedad — Guía Paso a Paso

### GitHub

1. Ve a `Settings → Danger Zone → Transfer Repository`
2. Ingresa el nombre del usuario GitHub del cliente
3. Confirma la transferencia
4. El cliente acepta desde su cuenta
5. ✅ Nivo ya no es owner. El cliente tiene el código.

### Vercel

**Opción A (recomendada):** Cliente crea su cuenta Vercel gratuita, Nivo hace el deploy desde la suya y luego transfiere el proyecto.

1. Settings del proyecto → Transfer Project → ingresa email del cliente
2. Cliente acepta, conecta su tarjeta de crédito si aplica

**Opción B:** Nivo agrega al cliente como "Owner" del team en Vercel y luego Nivo sale.

### Supabase

1. Si el proyecto fue creado en cuenta Nivo: `Settings → Team → Invite` al cliente como Owner
2. Si fue creado en cuenta del cliente desde el inicio: verificar que tienen acceso completo
3. Asegurarse que la API key que usa el sitio está en el entorno del cliente, no hardcoded en el código

### Dominio

- El dominio siempre debe estar en cuenta del cliente (Namecheap, GoDaddy, Google Domains, etc.)
- Nivo solo configura el DNS. Nunca se cobra gestión de dominio.
- Si el cliente no tiene dominio y Nivo lo compró provisionalmente: transferir antes del delivery.

---

## Documento de Credenciales (Template)

```
PROYECTO: [Nombre del cliente]
FECHA DE ENTREGA: [Fecha]
ENTREGADO POR: Nivo Partners, LLC

ACCESOS ENTREGADOS:
---
GitHub Repository: https://github.com/[usuario]/[repo]
  → Login: cuenta del cliente
  → Branch principal: main

Vercel (Hosting):
  → URL del proyecto: https://[proyecto].vercel.app
  → Dominio personalizado: https://[dominio.com]
  → Login: cuenta del cliente

Supabase (Base de datos):
  → URL del proyecto: https://[id].supabase.co
  → Login: cuenta del cliente
  → Tabla de leads: 'leads' (ver columnas documentadas en README)

Google Analytics 4:
  → ID de medición: G-XXXXXXXXXX
  → Acceso: admin en cuenta del cliente

Google Search Console:
  → Propiedad verificada: https://[dominio.com]
  → Acceso: cuenta del cliente

NOTAS ADICIONALES:
[Cualquier credencial, clave API, o configuración especial que el cliente debe guardar]

---
ESTE DOCUMENTO ES CONFIDENCIAL.
Almacenar en lugar seguro. No compartir por email sin cifrado.
```

---

## Post-Delivery: Los Primeros 30 Días

### Semana 1 post-deploy

- [ ] Enviar email de check-in: "¿Cómo va todo? ¿Llegaron los primeros leads?"
- [ ] Verificar GA4 sigue reportando (a veces los browsers bloquean)
- [ ] Confirmar que los emails de lead capture llegan al inbox correcto del cliente

### Día 30

- [ ] Llamada de check-in de 30 minutos
- [ ] Revisar los leads capturados: ¿cuántos llegaron? ¿cuántos cerraron?
- [ ] Identificar si algo necesita ajuste
- [ ] Si hay resultados positivos → abrir conversación de Revenue Engine (Ecosistema 2)

### SLA de Soporte Post-Entrega

- **Bugs críticos (sitio caído, leads no llegan):** Respuesta en <4 horas, solución en <24 horas
- **Ajustes menores (texto, color, imagen):** Respuesta en <24 horas, solución en <48 horas
- **Nuevas funciones:** Fuera del SLA — cotización por separado

> [!NOTE]
> El SLA de soporte aplica los primeros 30 días post-delivery sin costo adicional. Después, se activa el retainer de mantenimiento opcional ($350–500/mes).

---

*Documento: Feb 2026 — Actualizar con cada iteración del proceso de entrega.*
