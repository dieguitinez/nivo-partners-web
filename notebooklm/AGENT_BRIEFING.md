# 🤖 AGENT BRIEFING — Cómo leer este sistema

**Para:** Agentes de IA que colaboran con Nivo Partners  
**Cuándo leer esto:** Antes de tocar cualquier otro archivo  
**Versión:** 1.0 — Feb 19, 2026

---

> [!IMPORTANT]
> Este documento es tu punto de entrada obligatorio al sistema de conocimiento de Nivo Partners. Léelo completo antes de hacer cualquier cambio, crear cualquier documento, o responder cualquier pregunta sobre la empresa. Está diseñado para que entiendas el sistema como si lo hubieras construido tú mismo.

---

## Quién es Nivo Partners

**Nivo Partners, LLC** es una **firma de infraestructura de ingresos** — no una agencia de marketing, no una agencia de diseño. Instala sistemas digitales (sitios, automatizaciones, campañas, agentes IA) que pertenecen al cliente y trabajan 24/7.

- **Fundación legal:** Florida, LLC  
- **Modelo:** Tres divisiones internas bajo una sola entidad legal  
- **Stack tecnológico:** Gemini Pro Suite (Antigravity, Jules, NotebookLM, Code Assist, Deep Research, Flow, Whisk, Drive 2TB) + Vercel, GitHub, Supabase, GCP  
- **Clientes ideales:** Negocios con ticket promedio >$2,000, premium B2B o B2C  
- **Idioma principal de operaciones:** Español (EN/ para documentos en inglés)

---

## Cómo está organizado este directorio

```
notebooklm/
│
├── AGENT_BRIEFING.md            ← Estás aquí. Leer primero.
│
├── 00_MASTER_INDEX/
│   └── NIVO_KNOWLEDGE_SYSTEM.md ← Índice completo de todos los documentos
│
├── 01_SALES_DECK/               ← Para cerrar clientes
│   ├── DECK_01 — Qué es Nivo (pitch deck completo)
│   ├── DECK_02 — Los 3 Ecosistemas en detalle
│   ├── DECK_03 — Flujo de llamada de diagnóstico
│   └── DECK_06 — Manejo de objeciones (10 objeciones + respuestas)
│
├── 02_CLIENT_ONBOARDING/        ← Para cuando alguien firma
│   ├── ONBOARD_01 — Welcome Kit (qué enviar al cliente)
│   ├── ONBOARD_02 — Discovery Questionnaire (primera llamada)
│   └── ONBOARD_04 — Delivery Protocol (cómo entregar el proyecto)
│
├── 03_INTERNAL_SOPs/            ← Para operar la empresa
│   ├── ORG_01 — Arquitectura de las 3 Divisiones (documento más importante)
│   ├── ORG_02 — Organigrama (quién hace qué, modelo de escala)
│   ├── SOP_01 — Cómo trabajamos (flujo completo de un proyecto)
│   ├── SOP_03 — Protocolo de comunicación
│   ├── SOP_04 — Estándares de calidad
│   └── SOP_05 — Tools & Stack (todas las herramientas)
│
├── EN/                          ← Versiones en inglés (espejo de lo anterior)
│   ├── 00_MASTER_INDEX/NIVO_KNOWLEDGE_SYSTEM_EN.md
│   ├── 01_SALES_DECK/ (DECK_01_EN, DECK_06_EN)
│   ├── 02_CLIENT_ONBOARDING/ (ONBOARD_02_EN, ONBOARD_04_EN)
│   └── 03_INTERNAL_SOPs/ (ORG_01_EN, SOP_05_EN)
│
├── MODULE_12_Business_Model_Decisions.md ← Registro de decisiones estratégicas
└── MODULE_00 al MODULE_11              ← Metodología técnica propietaria
```

---

## Qué leer según tu tarea

| Si vas a hacer... | Lee primero... |
|---|---|
| Responder preguntas sobre la empresa | `00_MASTER_INDEX/NIVO_KNOWLEDGE_SYSTEM.md` + `ORG_01_Division_Architecture.md` |
| Trabajo de ventas / propuestas | `DECK_01`, `DECK_02`, `DECK_06` |
| Onboarding de un nuevo cliente | `ONBOARD_02` (antes del proyecto) → `ONBOARD_04` (al entregar) |
| Trabajo técnico (código, deploy) | `SOP_01`, `SOP_04`, `SOP_05` |
| Tomar una decisión estratégica nueva | `MODULE_12_Business_Model_Decisions.md` — luego agrega la decisión ahí |
| Contratar un contratista | `ORG_02_Organigrama.md` |
| Añadir un documento nuevo | Lee este briefing + el índice maestro, y sigue el protocolo de abajo |

---

## Las Tres Divisiones (resumen ejecutivo)

| División | Nombre externo | Para qué sirve | Stack principal |
|---|---|---|---|
| **División I** | Digital Authority | Presencia digital premium (sitios, Kai, lead capture) | Antigravity + Jules + Vercel + Supabase |
| **División II** | Revenue Engine | Adquisición de clientes (Google Ads, analytics, SEO) | Deep Research + Google Ads + GA4 |
| **División III** | Intelligent Ecosystem | IA y automatización instalada en el negocio del cliente | Jules + Gemini Pro + GCP + NotebookLM |

> Para el detalle completo de cada división (stack, arquetipos de cliente, precios, protocolo de upsell), leer: `03_INTERNAL_SOPs/ORG_01_Division_Architecture.md`

---

## Decisiones Estratégicas ya tomadas (resumen)

No reinventes lo que ya está decidido. Las decisiones de negocio viven en `MODULE_12_Business_Model_Decisions.md`. Las más críticas:

- **DEC-005:** Los clientes son siempre dueños de su código, dominio y datos. Nivo nunca retiene propiedad del cliente.
- **DEC-006:** Los servicios se nombran por el resultado que generan, no por el trabajo técnico que implican.
- **DEC-009:** El modelo de ventas no incluye markup sobre gasto de medios. Nivo cobra fee de gestión por separado.
- **DEC-010:** Nivo opera con 3 divisiones internas bajo una LLC. Threshold para crear un DBA: >$10k/mes sostenido por 3 meses.

---

## Estado actual del sistema (Feb 2026)

### Documentos completos ✅

- Sales: DECK_01, DECK_02, DECK_03, DECK_06
- Onboarding: ONBOARD_01, ONBOARD_02, ONBOARD_04
- SOPs: ORG_01, ORG_02, SOP_01, SOP_03, SOP_04, SOP_05
- Módulos técnicos: MODULE_00 al MODULE_12
- EN Mirror: DECK_01, DECK_06, ONBOARD_02, ONBOARD_04, ORG_01, SOP_05

### Pendientes de crear ⚠️

- `DECK_04_Case_Studies.md` — Casos de éxito formalizados
- `DECK_05_ROI_Walkthrough.md` — Cómo presentar el ROI en 15 min
- `ONBOARD_03_Project_Timeline.md` — Timeline visual por ecosistema
- `ONBOARD_05_Post_Launch_Checklist.md` — Checklist post-lanzamiento
- `SOP_06_Crisis_And_Escalation.md` — Protocolo si algo sale mal
- Sección `05_LEGAL_COMPLIANCE/` — Referencias legales internas

---

## Protocolos que debes respetar como agente

### Antes de crear un documento nuevo

1. Verifícalo en el índice maestro — puede que ya exista o esté en construcción
2. Si es una decisión estratégica → anótala en `MODULE_12_Business_Model_Decisions.md` con formato `DEC-XXX`
3. Usa el idioma correcto: **español para el doc principal**, luego crea la versión EN/ si aplica
4. Agrega el nuevo documento al índice maestro `NIVO_KNOWLEDGE_SYSTEM.md`

### Antes de modificar un documento existente

1. Lee la versión actual completa
2. No elimines secciones sin entender su propósito — podem estar referenciadas en otros documentos
3. Si cambias algo significativo, registra el rationale en `MODULE_12` como nueva decisión

### Sobre el tono y el lenguaje

- El español es la lengua operativa de Nivo. Toda la documentación principal va en español.
- Los documentos en `EN/` son espejos — si editas el español, actualiza el inglés también.
- El tono es: **directo, confiado, sin jerga innecesaria**. Nada de "estimado cliente" — Nivo escribe como un socio, no como un proveedor.

### Sobre el código y el sitio web

- El sitio vive en: `nivo-partners-dev/` (carpeta padre de este directorio `notebooklm/`)
- El chatbot Kai tiene su lógica en `js/chat.js` y `js/translations.js`
- Los estilos están en `css/styles.css`
- El formulario de leads conecta a Supabase — las credenciales están en el entorno, nunca hardcodeadas

---

## Mapa de relaciones entre documentos

```
DECK_01 "Qué es Nivo"
    └─► DECK_02 "Los 3 Ecosistemas" (para cliente que quiere detalle)
    └─► DECK_06 "Objeciones" (para cuando dudan)
    └─► DECK_03 "Flujo de diagnóstico" (para la llamada de ventas)

ONBOARD_02 "Discovery" (primera llamada)
    └─► ONBOARD_01 "Welcome Kit" (cuando firma)
    └─► SOP_01 "Cómo trabajamos" (durante el proyecto)
    └─► ONBOARD_04 "Delivery" (al entregar)

ORG_01 "División Architecture"
    └─► ORG_02 "Organigrama" (quién ejecuta qué)
    └─► SOP_05 "Tools & Stack" (con qué herramientas)
    └─► SOP_04 "Estándares de calidad" (a qué nivel)
    └─► MODULE_12 "DEC-010" (decisión que lo formalizó)

MODULE_12 "Business Model Decisions"
    └─► Es el registro histórico de todas las decisiones estratégicas
    └─► Siempre es el último en actualizarse cuando algo cambia
```

---

## Lo que hace único a Nivo (para que lo reflejes en todo)

1. **Propiedad total del cliente:** Lo que construimos es del cliente. Siempre.
2. **Revenue como único KPI que importa:** No vendemos tráfico ni likes. Vendemos ingresos medibles.
3. **Infraestructura, no servicio:** Un servicio termina. Una infraestructura crece.
4. **IA como operación, no como gadget:** Los agentes (Kai, Jules, los Neural Engines) son herramientas de trabajo, no características de marketing.
5. **90% built on Gemini Pro Suite:** El stack interno de Nivo opera principalmente con Google/Gemini Pro. Esto es una ventaja de costo y coherencia — no cambies herramientas sin justificación.

---

*Documento creado por Antigravity AI — Feb 19, 2026*  
*Actualizar este briefing cada vez que cambie la estructura del sistema o se complete una sección pendiente.*
