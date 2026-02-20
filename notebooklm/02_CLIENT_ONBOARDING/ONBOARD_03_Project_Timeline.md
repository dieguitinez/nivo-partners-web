# 📅 ONBOARD-03 — Timeline de Proyecto

**Uso:** Presentar al cliente cuándo está listo su sistema y qué pasa en cada semana
**Compartir con el cliente:** ✅ Sí — es un entregable del proceso de onboarding
**Personalizar por cliente:** Ajusta las fechas reales antes de enviar

---

> [!NOTE]
> El timeline se comparte después de que el cliente firma. No antes. Antes de firmar, la respuesta a "¿cuánto tarda?" es: *"Entre 2 y 12 semanas según el ecosistema. En la llamada de diagnóstico definimos el tuyo exacto."*

---

## ⚡ Ecosistema 1 — Digital Authority (2–3 semanas)

```
SEMANA 1
  Día 1–2:   Kickoff call + recolección de assets (logo, fotos, copy)
  Día 3–5:   Arquitectura visual y wireframe de la landing page
  Día 5–7:   Revisión del wireframe con el cliente → aprobación

SEMANA 2
  Día 8–10:  Desarrollo completo de la landing page
  Día 11–12: Integración de Kai (chatbot) + formulario → Supabase
  Día 13–14: QA interno (móvil, desktop, velocidad, formulario)

SEMANA 3
  Día 15:    Preview para el cliente (URL temporal de Vercel)
  Día 16–17: Ajustes post-revisión del cliente (máx. 2 rondas)
  Día 18:    Configuración de DNS + deploy a dominio real
  Día 19:    GA4 setup + verificación final
  Día 20:    DELIVERY CALL — transferencia de accesos
```

**Hitos de cliente requeridos:**

- Día 1: Envío de assets (logo en SVG/PNG HD, fotos, copy o briefing)
- Día 7: Aprobación del wireframe (máx. 48hrs para responder)
- Día 15: Revisión del preview (máx. 48hrs para dar feedback)

> [!IMPORTANT]
> El timeline asume que el cliente responde en menos de 48hrs. Cada día de retraso en la aprobación del cliente corre el timeline 1:1. El timeline se congela si no hay respuesta en >72hrs.

---

## 🚀 Ecosistema 2 — Revenue Engine (4–6 semanas)

*(Incluye todo el Ecosistema 1 + las fases de Ads)*

```
SEMANAS 1–3:  Ecosistema 1 completo (ver arriba)

SEMANA 4
  Día 21–22: Deep Research competitivo de la industria del cliente
  Día 23–24: Estructura de campañas de Google Ads (grupos, keywords, negativos)
  Día 25:    Configuración de cuenta en Google Ads MCC → subcuenta cliente
  Día 26:    Copy de anuncios (mín. 3 variantes por ad group)

SEMANA 5
  Día 27–28: Configuración de conversiones en GA4 + GTM
  Día 29:    Microsoft Clarity setup (heatmaps)
  Día 30:    Revisión completa pre-launch con cliente
  Día 31:    Launch de campañas + presupuesto inicial definido

SEMANA 6
  Días 32–42: Período de optimización inicial
  → Ajuste de bids, pausar keywords de bajo rendimiento
  → Optimizar el Quality Score
  Día 42: REPORTE DE PRIMERAS 2 SEMANAS → reunión de revisión
```

**Hitos de cliente requeridos:**

- Día 21: Briefing competitivo (3–5 competidores que el cliente conoce)
- Día 25: Acceso a Google Ads (crear cuenta si no tiene)
- Día 30: Aprobación del copy de anuncios antes de lanzar
- Presupuesto mínimo de ads: $500–$1,000/mes (no incluido en el fee de Nivo)

---

## 🧠 Ecosistema 3 — Intelligent Ecosystem (8–12 semanas)

*(Incluye Ecosistemas 1 + 2 + instalación de agentes IA)*

```
SEMANAS 1–6:  Ecosistemas 1 y 2 (ver arriba)

SEMANA 7
  Día 43–44: Workshop de inteligencia de negocio (60 min con el fundador/CEO del cliente)
             → Cómo se califica un lead ideal, qué preguntas hace el equipo de ventas,
               objeciones más comunes, flujo de trabajo actual
  Día 45–46: Diseño del árbol de decisión del agente de calificación
  Día 47:    Aprobación del flujo con el cliente

SEMANA 8
  Día 48–53: Desarrollo del Prospect Intelligence Engine
             → Entrenamiento con NotebookLM (knowledge base del negocio)
             → Integración con Supabase (scoring de leads)
             → Lógica de escalado a humano

SEMANA 9
  Día 54–56: Smart Inbox setup (respuestas automáticas + secuencias de seguimiento)
  Día 57–58: Review Guardian configuration
  Día 59:    QA de todos los agentes con simulaciones

SEMANA 10
  Día 60–62: Testing con el equipo del cliente (ellos prueban el sistema)
  Día 63–65: Ajustes post-testing
  Día 66:    Launch completo del Sovereign Ecosystem

SEMANAS 11–12: Período de calibración
  → Monitoreo diario de todos los agentes
  → Ajustes de flujos según comportamiento real
  → Documentación del sistema para el cliente
  Día 84: DELIVERY CALL FINAL — transferencia de accesos y documentación
```

**Hitos de cliente requeridos:**

- Día 43: Workshop de inteligencia de negocio (obligatorio — sin esto, los agentes no se pueden entrenar)
- Día 60: Disponibilidad del equipo del cliente para testing (mín. 2 personas, 2 horas)
- Semanas 11–12: Feedback activo sobre el comportamiento de los agentes

---

## Comunicación Durante el Proyecto

| Momento | Formato | Frecuencia |
|---|---|---|
| Actualizaciones de progreso | Email breve | 2× por semana |
| Revisión de hitos | Llamada de 20 min | Por hito completado |
| Emergencias / bloqueos | WhatsApp directo | Inmediato |
| Reporte ejecutivo | Documento + llamada | Al final de cada fase |

---

## Qué pasa si hay retrasos

**Del lado de Nivo:**

- Si Nivo se retrasa en un entregable → notificación proactiva con nueva fecha
- Si el retraso supera 3 días hábiles → Nivo ofrece descuento en siguiente milestone

**Del lado del cliente:**

- Si el cliente no entrega assets en los primeros 5 días → el proyecto se pausa oficialmente
- Si la pausa supera 10 días hábiles → el proyecto entra a cola de reactivación (próximo slot disponible)
- El timeline se recalcula desde el día que se reanudan los assets

---

## Template de Email de Kickoff (enviar el Día 1)

```
Asunto: [Nombre del proyecto] — Kickoff + Qué necesito de ti esta semana

Hola [Nombre],

¡Arrancamos! Estoy emocionado de construir esto contigo.

Para que podamos entregar en el tiempo acordado, necesito los siguientes
assets antes del [Fecha — Día 5]:

ASSETS REQUERIDOS:
[ ] Logo en formato SVG o PNG de alta resolución
[ ] 3–5 fotos del negocio o del servicio (si las tienes)
[ ] Colores de marca (si tienes brand guidelines, compártelas)
[ ] Texto que describes en tu servicio principal
    (si no tienes, te hago 3 preguntas rápidas)
[ ] URL del sitio actual (si existe)
[ ] 2–3 sitios de competidores que admires visualmente

FECHAS CLAVE:
  [Fecha — Día 7]: Revisamos el wireframe juntos
  [Fecha — Día 15]: Preview del sitio completo
  [Fecha — Día 20]: LANZAMIENTO

Si tienes preguntas antes del [Día 7], escríbeme directamente.

[Firma]
```

---

*Documento: Feb 2026 — Ajustar timelines según la carga de trabajo actual del equipo.*
