# ⚙️ SOP 01 — Cómo Funciona un Proyecto Nivo Partners

### *El flujo completo de un proyecto de principio a fin*

**Uso:** Onboarding de nuevo empleado · Referencia interna · Reuniones de equipo
**Audiencia:** Todo el equipo de Nivo Partners

---

> [!NOTE]
> Este documento describe el flujo **estándar** de un proyecto. Cada ecosistema (Core, Growth, Sovereign) tiene tiempos diferentes pero el flujo es el mismo. Las variaciones están documentadas en `ONBOARD_03_Project_Timeline.md`.

---

## El Flujo Completo

```
PIPELINE DE VENTAS
│
├── 1. PROSPECTO ENTRA (web, referido, outreach)
│        ↓
├── 2. CALIFICACIÓN INICIAL (Kai AI o email)
│        ↓
├── 3. LLAMADA DE DIAGNÓSTICO (30-45 min)
│        ↓
├── 4. PROPUESTA + CONTRATO
│        ↓
│
PRODUCCIÓN
│
├── 5. KICKOFF + CUESTIONARIO DE DESCUBRIMIENTO
│        ↓
├── 6. ARQUITECTURA Y CONSTRUCCIÓN (modo silencioso)
│        ↓
├── 7. REVISIÓN INTERNA (QA checklist)
│        ↓
├── 8. PRESENTACIÓN AL CLIENTE (aprobación)
│        ↓
├── 9. DEPLOYMENT EN VIVO (llamada de deploy)
│        ↓
│
POST-LANZAMIENTO
│
├── 10. TRANSFERENCIA DE OWNERSHIP (GitHub + credenciales)
│        ↓
├── 11. PERÍODO DE AJUSTES (30 días)
│        ↓
└── 12. OPTIMIZACIÓN CONTINUA (si hay retainer)
```

---

## Detalle por Fase

### Fase 1: Prospecto Entra

**Canales de entrada:**

- Formulario web (Supabase → notificación email)
- Kai chatbot (lead captura y califica)
- Referido directo
- Outreach del equipo (LinkedIn / email frío)

**Responsable:** Sistema automatizado → Kai → Equipo de ventas

**SLA:** Respuesta inicial en máximo 2 horas hábiles.

---

### Fase 2: Calificación Inicial

**Criterios de calificación** (cliente debe cumplir ≥ 3):

- [ ] Ticket promedio de su servicio > $500 por cliente
- [ ] Negocio con al menos 6 meses de operación
- [ ] Tiene presupuesto para invertir (no busca "lo más barato")
- [ ] Toma decisiones el mismo en la llamada (o tiene poder de decisión)
- [ ] Entiende que esto es un proceso, no una solución instantánea

**Si NO califica:** Responder con amabilidad e indicar que no es el momento correcto. No invertir tiempo en demos.

---

### Fase 3: Llamada de Diagnóstico

Ver [`DECK_03_Diagnostic_Call_Flow.md`](../01_SALES_DECK/DECK_03_Diagnostic_Call_Flow.md) para el guión completo.

**Resultado esperado:** Recomendación clara de ecosistema + siguiente paso definido.

---

### Fase 4: Propuesta + Contrato

**La propuesta incluye:**

- Resumen del diagnóstico y el problema identificado
- Ecosistema recomendado con descripción de qué incluye
- Timeline estimado
- Inversión total
- Términos de pago

**Contrato:**

- Se firma digitalmente (DocuSign o equivalente)
- Incluye cláusula de IP (ver sección de propiedad intelectual abajo)
- 50% al firmar, 50% al deploy

**IP Protegida en Contrato:**
> Los siguientes elementos son propiedad intelectual exclusiva de Nivo Partners, LLC y no se transfieren al cliente bajo ningún acuerdo:
>
> - Prompts de inteligencia artificial (Kai y cualquier otro agente)
> - Lógica de automatización y bots propietarios
> - Flujos de nodos de conversación y árboles de decisión
> - Metodología y arquitectura del Revenue Core
> - Algoritmos del Prospect Intelligence Engine y Review Guardian
>
> El cliente recibe licencia de uso del resultado deployado, no de la metodología que lo produce.

---

### Fase 5: Kickoff + Cuestionario de Descubrimiento

**Cuestionario cubre:**

- Información de marca (colores, fuentes, tono de voz)
- Competidores principales y diferenciadores del cliente
- Llamadas a la acción prioritarias
- Integraciones existentes (CRM, POS, calendario)
- Metas de negocios en 90 días

**Llamada de Kickoff (60 min):**

- Revisar cuestionario con el cliente
- Alinear expectativas y timeline
- Definir métricas de éxito
- Presentar el equipo que trabajará en el proyecto

---

### Fase 6: Arquitectura y Construcción

**Modo silencioso:** El equipo trabaja. El cliente no necesita hacer nada.

**Comunicación proactiva:** Enviar actualización de progreso cada 3-5 días.

**Stack estándar:**

- Frontend: HTML/CSS/JS con diseño "Prestige Glass"
- Hosting: Vercel (Edge Network)
- Base de datos: Supabase (con RLS policies configuradas)
- Analytics: GA4 + Microsoft Clarity
- Chatbot: Kai con nodos en `translations.js`
- Email: Resend API

---

### Fase 7: Revisión Interna (QA Checklist)

**Antes de mostrar al cliente, verificar:**

**Técnico:**

- [ ] Formulario de lead capture funciona y llega a Supabase
- [ ] Kai chatbot carga, responde correctamente y captura leads
- [ ] Analytics (GA4) registra eventos
- [ ] Velocidad de página: < 3 segundos en mobile
- [ ] Mobile responsive en todos los breakpoints
- [ ] Sin errores en console del browser
- [ ] HTTPS activo en el dominio del cliente
- [ ] Todas las páginas legales accesibles

**Contenido:**

- [ ] Copy está 100% correcto (sin placeholders)
- [ ] Imágenes optimizadas y sin copyright issues
- [ ] Links funcionan correctamente
- [ ] Datos del cliente correctos (nombre, teléfono, dirección si aplica)

**Performance:**

- [ ] Lighthouse Score > 85 en todos los criterios
- [ ] Sin recursos bloqueantes de render

---

### Fase 8: Presentación al Cliente

- Llamada de revisión de 30-45 min
- Compartir pantalla y navegar el sitio en vivo
- Recopilar feedback — máximo 1 ronda de revisiones
- Obtener aprobación escrita (email o mensaje)

---

### Fase 9: Deployment en Vivo

- Deploy final en Vercel con dominio del cliente
- Hacer en llamada para que el cliente lo vea en tiempo real
- Verificar DNS propagation
- Confirmar que todo funciona en dominio de producción

---

### Fase 10: Transferencia de Ownership

**Lo que se transfiere:**

- [ ] Acceso al repositorio GitHub (cliente como colaborador)
- [ ] Credenciales de Supabase (email del cliente como admin)
- [ ] Acceso a GA4 / Google Search Console
- [ ] Credenciales de Vercel si el cliente las quiere
- [ ] Video walkthrough grabado del sistema

**Lo que NO se transfiere:**

- Prompts de AI
- Algoritmos propietarios de automatización
- Metodología del motor (ver contrato, Cláusula 4)

---

### Fase 11: Período de Ajustes (30 días)

- Bugs = se corrigen. Sin preguntas.
- Cambios de contenido = se hacen. Sin costo adicional.
- Nuevas funcionalidades = fuera del scope. Se cotiza aparte.

**SLA:** Bugs críticos (sitio caído) — respuesta en 2 horas. Ajustes normales — 24-48 horas.

---

### Fase 12: Optimización Continua (Retainer Opcional)

Si el cliente quiere mantener el crecimiento:

- Revisión mensual de métricas (leads, conversión, revenue)
- Ajustes de Google Ads basados en datos
- Actualizaciones de contenido
- Prioridad en nuevas funcionalidades

**Precio de retainer:** A definir según ecosistema y necesidades.
