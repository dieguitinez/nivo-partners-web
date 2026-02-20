# 👥 SOP-02 — Roles y Responsabilidades

**Propósito:** Definir quién hace qué en cada fase de un proyecto Nivo y qué nivel de autoridad tiene cada rol.
**Relación con ORG_02:** ORG_02 define la estructura macro (organigrama por fases). Este documento define las responsabilidades concretas por tarea.

---

> [!NOTE]
> En la Phase 0 (solo fundador), todas las columnas apuntan a la misma persona. El valor de este documento en esa fase es preparar la transición: saber qué responsabilidades delegar primero cuando llegue el primer contratista.

---

## Matriz de Roles por Función

### División I — Digital Authority

| Tarea | Phase 0 (Fundador solo) | Phase 1 (+Contratistas) | Phase 2 (+Equipo) |
|---|---|---|---|
| Discovery call / diagnóstico | Fundador | Fundador | Director Comercial |
| Diseño visual (wireframe) | Fundador + Antigravity AI | Dev Frontend | Dev Frontend |
| Desarrollo (HTML/CSS/JS) | Fundador + Jules | Dev Frontend | Dev Frontend + QA |
| Integración Supabase / GA4 | Fundador | Dev Backend | Dev Backend |
| Configuración de Kai (nodos) | Fundador | Dev Frontend | Director Técnico |
| QA interno (pre-delivery) | Fundador | Fundador | QA Lead |
| Delivery Call | Fundador | Fundador | Account Manager |
| Transferencia de accesos | Fundador | Dev responsable | Account Manager |
| Soporte post-delivery (30 días) | Fundador | Dev Frontend asignado | Soporte Junior |

---

### División II — Revenue Engine

| Tarea | Phase 0 | Phase 1 | Phase 2 |
|---|---|---|---|
| Estrategia de keywords | Fundador + Deep Research | Especialista en Ads | Director de Performance |
| Setup de campaña Google Ads | Fundador | Especialista en Ads | Especialista en Ads |
| Copy de anuncios | Fundador | Copywriter | Copywriter |
| Configuración de conversiones | Fundador | Dev Backend | Dev Backend |
| Optimización semanal | Fundador | Especialista en Ads | Especialista en Ads |
| Reporte mensual | Fundador | Especialista en Ads | Analista de Datos |
| Llamada de revisión | Fundador | Fundador | Account Manager |

---

### División III — Intelligent Ecosystem

| Tarea | Phase 0 | Phase 1 | Phase 2 |
|---|---|---|---|
| Workshop de inteligencia de negocio | Fundador | Fundador | Director Técnico |
| Diseño de árbol de decisión del agente | Fundador | Director Técnico | Director Técnico |
| Desarrollo de agentes IA | Fundador + Jules | Dev IA | Dev IA |
| Entrenamiento de knowledge base (NotebookLM) | Fundador | Dev IA | Dev IA |
| Monitoreo continuo de agentes | Fundador | Dev IA asignado | Ops Junior |
| Actualización mensual de flujos | Fundador | Dev IA | Dev IA |

---

## Responsabilidades por Rol

### Fundador (Phase 0 — actual)

**Responsable de:**

- Toda la relación con el cliente (ventas, delivery, soporte)
- Decisiones técnicas y de arquitectura
- Aprobación de todo entregable antes de que salga al cliente
- Facturación y contabilidad
- Estrategia y roadmap de la firma
- Actualización de la biblia (este sistema de conocimiento)

**Límite de carga:** ~3 proyectos activos simultáneos antes de necesitar el primer contratista

---

### Dev Frontend (Phase 1+)

**Responsable de:**

- Implementación de diseños en HTML/CSS/JS
- Implementación de Kai (nodos, lógica de chat)
- Asegurar responsive design (mobile, tablet, desktop)
- QA visual antes de entregarlo al Fundador para aprobación

**NO hace:**

- Contacto directo con el cliente (todo pasa por el Fundador)
- Decisiones de arquitectura sin aprobación
- Deploy a producción sin QA firmado

**Stack que debe dominar:** Vanilla HTML/CSS/JS, Vercel CLI, GitHub básico

---

### Dev Backend (Phase 1+)

**Responsable de:**

- Integraciones: Supabase, GA4, GTM, APIs externas
- Seguridad de credenciales (variables de entorno, no hardcoded)
- Configuración de conversiones y eventos
- Base de datos: diseño de tablas, permisos RLS en Supabase

**NO hace:**

- UX/UI (eso es del Frontend)
- Gestión de campañas de ads

**Stack que debe dominar:** Supabase, Google Analytics 4, GTM, variables de entorno en Vercel

---

### Especialista en Ads (Phase 1+)

**Responsable de:**

- Gestión diaria/semanal de campañas de Google Ads
- Investigación de keywords y análisis de search terms
- Copy de anuncios y A/B testing
- Reporte mensual de performance

**NO hace:**

- Cambios al sitio web
- Contacto directo con el cliente sin supervisión del Fundador en Phase 1

**Acceso requerido:** Google Ads MCC (como gestor), GA4 (view access), Looker Studio

---

### Dev IA (Phase 1+)

**Responsable de:**

- Desarrollo y mantenimiento de agentes (Prospect Intelligence Engine, Smart Inbox, Review Guardian)
- Entrenamiento y actualización de knowledge bases en NotebookLM
- Monitoreo del comportamiento de agentes en producción
- Documentación técnica de cada agente entregado

**Stack que debe dominar:** Gemini API, NotebookLM, Jules, Google Cloud (básico)

---

### Account Manager (Phase 2+)

**Responsable de:**

- Punto de contacto principal del cliente (post-venta)
- Coordinación interna entre divisiones para el proyecto
- Asegurar que los timelines se cumplan
- Identificar oportunidades de upsell y escalarlas al Fundador

**NO hace:**

- Decisiones técnicas
- Aprobación de entregables (eso siempre es el Director Técnico o Fundador)

---

## Protocolo de Escalación Interna

```
Nivel 1 — El responsable del task resuelve
  → Cualquier tarea dentro de su alcance normal

Nivel 2 — Escala al Director de División (Phase 2) o Fundador (Phase 0–1)
  → Decisiones que afectan al cliente
  → Bloqueantes técnicos que no se pueden resolver en 2 horas
  → Situaciones no cubiertas por los SOPs

Nivel 3 — Escala al Fundador (siempre)
  → Conflictos con el cliente
  → Cambios al scope o al precio
  → Incidentes críticos (ver SOP_06)
  → Decisiones estratégicas que afecten a la firma
```

---

## Nivel de Autoridad de Aprobación

| Decisión | Quién aprueba |
|---|---|
| Entregar trabajo al cliente | Fundador (Phase 0–1) / Director Técnico (Phase 2) |
| Cambiar el scope de un proyecto | Solo Fundador |
| Dar un descuento | Solo Fundador |
| Contratar un contratista | Solo Fundador |
| Publicar contenido en nombre de Nivo | Fundador |
| Hacer un cambio de deploy a producción | Aprobación técnica del Dev responsable + visto bueno del Fundador |
| Acceder a la cuenta de ads del cliente | Siempre con autorización escrita del cliente |

---

## Onboarding de un Contratista Nuevo

Cuando llegue el primer contratista, hacer en este orden:

1. Darle acceso a este sistema de conocimiento (`notebooklm/`) — leer `AGENT_BRIEFING.md` primero
2. Leer estos documentos en orden: `ORG_01` → `SOP_01` → `SOP_04` → `SOP_03` → este documento
3. Darle acceso a las herramientas necesarias para su rol (ver `SOP_05_Tools_And_Stack.md`)
4. Asignarlo a un proyecto de baixo riesgo como primera tarea, con supervisión directa
5. Primer entregable siempre pasa por revisión del Fundador antes de ir al cliente

---

*Documento: Feb 2026 — Actualizar a medida que se contraten los primeros roles.*
