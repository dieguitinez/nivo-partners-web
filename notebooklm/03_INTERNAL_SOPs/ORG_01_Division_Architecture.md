# 🏛️ ORG-01 — Arquitectura de Divisiones de Nivo Partners, LLC

**Versión:** 1.0 — Feb 2026
**Tipo:** Documento Organizacional Interno
**Acceso:** Fundadores · Partners autorizados · Directores de División

---

> [!IMPORTANT]
> Este documento define la **estructura operativa interna** de Nivo Partners, LLC. Las tres divisiones descritas aquí son unidades de negocio independientes que operan bajo la misma entidad legal. Cada división tiene su propia propuesta de valor, stack tecnológico, arquetipos de clientes y modelo de revenue. Cuando cualquiera de ellas genere revenue suficiente para justificarlo, se puede establecer como DBA (Doing Business As) independiente sin necesidad de una nueva LLC.

---

## Por qué dividimos la firma en 3 extremidades

Nivo Partners no es una agencia generalista. Somos una firma de infraestructura de ingresos con tres capacidades especializadas. Cada capacidad requiere:

- Un perfil de talento diferente
- Herramientas distintas
- Clientes con problemas distintos
- Un ciclo de venta diferente

Operar bajo una sola marca sin estructura interna clara genera confusión para clientes, empleados y socios. Este documento le da a cada extremidad su identidad operativa.

---

## Contraste con Documentos Existentes

> [!NOTE]
> Las 3 divisiones ya existían implícitamente en nuestra documentación — pero como **productos** (hacia afuera) en lugar de **unidades operativas** (hacia adentro). Este documento los formaliza internamente.

| Donde aparecían antes | Nombre externo (producto) | Nombre interno (división) |
|---|---|---|
| `DECK_01` — Slide 4 & 5 | Digital Authority | División de Arquitectura Digital |
| `DECK_01` — Slide 4 & 5 | Revenue Engine | División de Rendimiento Comercial |
| `DECK_01` — Slide 4 & 5 | Intelligent Ecosystem | División de Inteligencia Operativa |
| `MODULE_12` — DEC-006 | Web Infrastructure | División de Arquitectura Digital |
| `MODULE_12` — DEC-006 | Performance Marketing | División de Rendimiento Comercial |
| `MODULE_12` — DEC-006 | AI Infrastructure | División de Inteligencia Operativa |
| `index.html` — Ecosystem Cards | Digital Authority Card | División 1 |
| `index.html` — Ecosystem Cards | Revenue Engine Card | División 2 |
| `index.html` — Ecosystem Cards | Intelligent Ecosystem Card | División 3 |

**Síntesis:** El mismo concepto ha vivido bajo al menos 3 nombres distintos en fuentes distintas. Este documento es la nomenclatura oficial interna a partir de Feb 2026.

---

## Estructura Corporativa

```
Nivo Partners, LLC (Entidad Raíz — Florida)
│
├── División I:  Arquitectura Digital
│   └── (Futuro DBA: "Nivo Studio" o "Nivo Digital")
│
├── División II: Rendimiento Comercial
│   └── (Futuro DBA: "Nivo Growth" o "Nivo Reach")
│
└── División III: Inteligencia Operativa
    └── (Futuro DBA: "Nivo Intelligence" o "Nivo Core")
```

**Modelo legal vigente:** Una sola LLC. Tres unidades internas. Sin filing adicional requerido hoy.
**Evolución:** Cuando una división genere >$10k/mes de revenue sostenido por 3 meses, se evalúa DBA.

---

## División I — Arquitectura Digital

**Nombre interno:** División de Arquitectura Digital
**Nombre externo (producto):** Digital Authority
**Mantra:** *"Tu presencia digital como activo comercial, no como gasto."*

### Qué hace

Diseña e implementa la infraestructura digital de alta fidelidad del cliente. Esto incluye:

- Sitios web de alta conversión (Landing pages, páginas de servicio, portafolios premium)
- Identidad de marca digital (arquitectura visual, no diseño gráfico commodity)
- Infraestructura de lead capture (Kai, formularios, CRM)
- Integración con stack técnico del cliente (Supabase, Vercel, GCP)
- Deploy seguro vía GitHub → Vercel con transferencia de propiedad al cliente

### Stack Tecnológico

| Herramienta | Propósito | Fuente |
|---|---|---|
| **Antigravity (Google)** | Desarrollo y documentación de sistemas | Gemini Pro Suite |
| **Gemini Code Assist** | Copiloto para cualquier contratista técnico | Gemini Pro Suite |
| **Gemini CLI** | Operaciones de desarrollo en terminal | Gemini Pro Suite |
| **Jules** | Tareas de código asíncrono (refactors, QA) | Gemini Pro Suite |
| **Vercel** | Deploy y hosting edge | Externo |
| **GitHub** | Control de versiones y entrega al cliente | Externo |
| **Supabase** | Base de datos con RLS (propiedad del cliente) | Externo |
| **Google Drive (2TB)** | Repositorio de assets de cliente | Gemini Pro Suite |

### Arquetipos de Cliente

| Arquetipo | Hook | Tier Típico |
|---|---|---|
| Spa / Med-Spa de alto ticket | *"Tu servicio es de lujo. Tu web también debería serlo."* | Core Unit ($3,500) |
| Constructor Premium / Remodeling | *"Tu portafolio vale millones. ¿Lo refleja tu presencia?"* | Core Unit o Growth Reactor |
| Clínica Dental Estética | *"Tu reputación: años. Tu percepción online: 3 segundos."* | Core Unit ($3,500) |
| Abogado / Profesional Premium | Autoridad + credibilidad en primera cita digital | Core Unit ($3,500) |

### Modelo de Revenue

| Tier | Precio | Contenido |
|---|---|---|
| Core Unit | ~$3,500 (one-time) | Landing + Kai + Lead Capture + Deploy |
| Expansión | +$1,500–2,500 | Páginas adicionales, integraciones |
| Retainer Mantenimiento | $350–500/mes | Actualizaciones, rendimiento, hosting |

### Métricas de Éxito de la División

- Tiempo de delivery: ≤ 3 semanas para Core Unit
- Tasa de entrega completa (sin re-work): ≥ 90%
- NPS del cliente en entrega: ≥ 8/10

---

## División II — Rendimiento Comercial

**Nombre interno:** División de Rendimiento Comercial
**Nombre externo (producto):** Revenue Engine
**Mantra:** *"Cada peso invertido en ads, rastreable hasta el cliente que cerró."*

### Qué hace

Diseña y opera sistemas de adquisición de clientes de alta precisión. Esto incluye:

- Google Ads calibrado para intención de compra real (no tráfico de vanidad)
- Optimización de conversión — mejora en sitios web existentes sin tocar el código core
- Deep Research competitivo previo a cada campaña
- Rastreo financiero de ROI hasta el ingreso cerrado (GA4 + Supabase)
- Ingeniería de copy para anuncios y páginas de aterrizaje

### Stack Tecnológico

| Herramienta | Propósito | Fuente |
|---|---|---|
| **Gemini Deep Research** | Inteligencia competitiva antes de cada campaña | Gemini Pro Suite |
| **Google Search + Search Labs** | Investigación de intención de búsqueda | Gemini Pro Suite |
| **Gemini in Docs/Gmail** | Redacción de copy y comunicación con clientes | Gemini Pro Suite |
| **Google Ads** | Plataforma de adquisición pagada | Externo |
| **GA4 + Microsoft Clarity** | Rastreo de comportamiento y conversión | Externo |
| **Antigravity** | Automatización de reportes y análisis | Gemini Pro Suite |
| **NotebookLM** | Base de conocimiento de campañas (qué funcionó) | Gemini Pro Suite |

### Arquetipos de Cliente

| Arquetipo | Hook | Tier Típico |
|---|---|---|
| Negocio existente con ads que no convierten | *"¿Gastas en ads pero no sabes cuántos clientes genera?"* | Growth Reactor ($6,500) |
| Spa / Dental con presencia digital pero sin leads | Auditoría de conversión + ads | Growth Reactor |
| HVAC Premium con volumen estacional | Alto volumen, ciclo corto, urgencia | Growth Reactor o add-on |

### Modelo de Revenue

| Tier | Precio | Contenido |
|---|---|---|
| Growth Reactor | ~$6,500 (setup) | Auditoría + Google Ads Config + GA4 + 30 días de optimización |
| Retainer de Rendimiento | $800–1,500/mes | Gestión activa de campaigns + reportes mensuales de ROI |
| Add-on Deep Research | +$500 | Reporte competitivo mensual de industria |

### Métricas de Éxito de la División

- ROAS mínimo objetivo: 3.5x en 60 días
- Reducción de CPL (Costo por Lead): ≥ 20% en 90 días
- Reportes entregados on-time: 100%

---

## División III — Inteligencia Operativa

**Nombre interno:** División de Inteligencia Operativa
**Nombre externo (producto):** Intelligent Ecosystem (Elite)
**Mantra:** *"Deja de alquilar labor. Empieza a ser dueño de la inteligencia."*

### Qué hace

Diseña e implementa sistemas de IA y automatización propietarios instalados en el negocio del cliente. Esto incluye:

- **Kai / Chatbots customizados:** Agentes de conversación entrenados con el conocimiento del negocio
- **Prospect Intelligence Engine:** Sistema que califica leads automáticamente antes de tocar el teléfono
- **Review Guardian:** Monitoreo y gestión automática de reseñas en Google/Yelp/Healthgrades
- **Smart Inbox / Email Automation:** Secuencias de seguimiento automáticas con personalización real
- **Rastreo web avanzado:** Heatmaps, session recordings, análisis de comportamiento de usuario
- **Automatización de flujos operativos internos:** Notificaciones, reportes, tareas repetitivas

> [!IMPORTANT]
> **Propiedad Intelectual:** Los prompts, árboles de decisión, algoritmos de calificación y flujos de automatización diseñados por Nivo son propiedad exclusiva de Nivo Partners, LLC. El cliente recibe el **sistema funcional instalado** pero no el código fuente de los algoritmos propietarios. (Ver cláusula IP en `ONBOARD_01_Welcome_Kit.md`)

### Stack Tecnológico

| Herramienta | Propósito | Fuente |
|---|---|---|
| **Jules (Google)** | Agente asíncrono — automatización de código y scripts | Gemini Pro Suite |
| **Gemini 3.1 Pro** | LLM base para agentes de IA de clientes | Gemini Pro Suite |
| **Gemini in Gmail** | Automatización de respuestas y follow-ups | Gemini Pro Suite |
| **Whisk + Flow** | Generación de contenido visual/video para clientes AI-tier | Gemini Pro Suite |
| **NotebookLM (×5)** | Base de conocimiento por cliente (source documents del negocio) | Gemini Pro Suite |
| **Antigravity** | Construcción y deployment de agentes customizados | Gemini Pro Suite |
| **GCP (Google Cloud)** | Infraestructura de procesamiento para neural engines | Externo |
| **Supabase** | Base de datos de prospectos y actividad (propiedad del cliente) | Externo |
| **Resend** | Infraestructura de email automatizado transaccional | Externo |

### Arquetipos de Cliente

| Arquetipo | Hook | Tier Típico |
|---|---|---|
| Negocio con >100 leads/mes que no puede dar seguimiento | *"¿Cuántos leads mueren por falta de seguimiento?"* | Sovereign ($12,500+) |
| Spa o clínica con sistema de reseñas vulnerable | Protección de reputación + automatización | Sovereign o add-on |
| Empresa con operaciones repetitivas manuales | Automatización de tareas de alto costo humano | Sovereign |
| Cliente existente de División I o II que quiere escalar | Upsell natural: ya confían, ya tienen la base | Sovereign |

### Modelo de Revenue

| Tier | Precio | Contenido |
|---|---|---|
| Sovereign Ecosystem | $12,500+ (setup) | Neural Engine + 3 agentes + Automatización completa |
| Retainer Inteligencia | $1,500–2,500/mes | Operación, monitoreo y evolución de los sistemas |
| Add-on por agente extra | +$2,000–3,500 | Un agente adicional (Inbox, Guardian, etc.) |

### Métricas de Éxito de la División

- Uptime de agentes: ≥ 99.5%
- Reducción de carga operativa del cliente: ≥ 30% en tareas automatizadas
- Tiempo de respuesta a leads: de horas → segundos

---

## Revenue Consolidado de la Firma

```
                    INGRESOS ANUALES PROYECTADOS (Año 1)
                    
División I  (Arquitectura Digital)
  4 clientes/mes × $3,500 = $14,000/mes
  + Retainers ($400/mes × 20 clientes acumulados) = $8,000/mes
  Total Anual: ~$264,000

División II (Rendimiento Comercial)
  2 clientes/mes × $6,500 setup = $13,000/mes setup
  + Retainers ($1,000/mes × 10 clientes) = $10,000/mes
  Total Anual: ~$276,000

División III (Inteligencia Operativa)
  1 cliente/mes × $12,500 setup = $12,500/mes setup
  + Retainers ($2,000/mes × 5 clientes) = $10,000/mes
  Total Anual: ~$270,000

TOTAL FIRMA (Año 1, conservador): ~$810,000
```

> [!NOTE]
> Estas proyecciones son conservadoras e internas. No se comparten con clientes ni en materiales de marketing públicos. El modelo de upsell natural (División I → II → III) es el motor real de crecimiento de la firma.

---

## Roles y Responsabilidades por División

| Rol | División I | División II | División III |
|---|---|---|---|
| **Director de División** | TBD | TBD | TBD |
| **Desarrollador/Implementador** | 1 full-time o contratista | — | 1 especialista IA |
| **Estratega de Campaña** | — | 1 full-time | — |
| **Gestor de Cuentas** | Compartido firma | Compartido firma | Compartido firma |
| **Herramienta IA principal** | Antigravity + Jules | Gemini Deep Research | Jules + Gemini Pro |

> **Regla de escalamiento:** Ninguna división contrata personal fijo hasta tener retainers activos cubriendo el salario completo más 20% de margen.

---

## Protocolo de Transferencia de Cliente entre Divisiones

El modelo de upsell más poderoso de Nivo es el **camino natural** entre divisiones:

```
CLIENTE NUEVO
    ↓
División I: Arquitectura Digital (Core Unit)
    ↓ (60-90 días después, cuando el sitio ya tiene tráfico)
División II: Rendimiento Comercial (Growth Reactor)
    ↓ (90-180 días después, cuando el volumen de leads lo justifica)
División III: Inteligencia Operativa (Sovereign Ecosystem)
```

**Regla:** El Account Manager detecta señales de readiness y genera el brief de upsell. Nunca se ofrece la siguiente división sin datos que justifiquen la conversación.

---

## Próximos Pasos para Formalización

- [ ] **ORG-02:** Definir Organigrama Formal (quién lidera qué hoy y con qué capacidad)
- [ ] **ORG-03:** Protocolo de onboarding para contratistas por división
- [ ] **DEC-010 (MODULE_12):** Decisión sobre umbral de revenue para primer DBA
- [ ] **DECK-02:** Actualizar la presentación de Ecosistemas para usar la nomenclatura de divisiones consistent

---

*Documento creado: Feb 19, 2026. Próxima revisión: cuando División I supere 5 clientes activos de retainer.*
