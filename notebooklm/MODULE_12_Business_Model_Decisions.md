# 📋 MODULE 12: Business Model Decisions & Strategic Log

**Version:** 1.0 (Living Document — se actualiza con cada sesión)
**Owner:** Strategy & Documentation Agent
**Last Audit:** Feb 19, 2026

> [!IMPORTANT]
> Este módulo es el **registro vivo** de decisiones estratégicas, pivots y descubrimientos que no están capturados en los módulos técnicos (01-11). Funciona como la memoria institucional de las decisiones de negocio. Se actualiza en cada sesión de trabajo.

---

## 📅 Log Feb 19, 2026 — Sesión de Reestructuración

### DEC-001: Modelo de Entrega Remota (GitHub Repos)

**Decisión:** Nivo Partners opera como firma de infraestructura **100% remota**.

- **Proceso:** Zoom Strategy Call → Producción → Entrega vía GitHub Repository → Deploy en Vercel en vivo durante la llamada.
- **Por qué importa:** El cliente recibe la llave de su infraestructura. No hay dependencia de nuestra disponibilidad para cambios futuros (alineado con Módulo 07 — Soberanía IP).
- **Impacto en Copy:** NO anclar a geografía. El copy habla de *arquetipos de cliente*, no de ciudades.

---

### DEC-002: Posicionamiento Geográfico Intencionalmente Ambiguo

**Decisión:** No se menciona Tampa Bay, Florida, ni ninguna ciudad en el copy principal.

- **Razón:** El modelo de entrega es remoto. Anclar a una ciudad limita el pipeline y señala una agencia local (menor prestige).
- **Referencia implícita:** "Maybe Florida" - se puede sugerir en conversaciones de ventas pero no en el sitio.
- **Regla:** Si un cliente pregunta ubicación → *"Operamos donde opera tu negocio."*

---

### DEC-003: Arquetipos de Cliente Primarios

**Decisión:** Los sectores objetivo no se definen por geografía sino por **arquetipo de negocio**.

| Arquetipo | Hook | Prioridad |
| :--- | :--- | :--- |
| **Spa / Med-Spa / Wellness** | *"Tu servicio es de lujo. Tu web no debería serlo menos."* | 🔴 Primario |
| **Constructor Premium / Remodeling** | *"Tu portafolio vale millones. ¿Lo refleja tu presencia?"* | 🔴 Primario |
| **Profesional (Abogado/Médico Estético)** | *"Tu reputación: años. Tu percepción online: 3 segundos."* | 🟡 Secundario |
| **HVAC / Home Services Premium** | Alto volumen, presencia digital primitiva | 🟡 Secundario |

**Sectores a EVITAR hasta nuevo aviso:**

- Roofing (publicidad de mala reputación percibida en el sector).
- Restaurantes (ticket bajo, alta rotación de clientes).

---

### DEC-004: Estructura de Tiers de Servicio

**Decisión:** Tres tiers con rangos de inversión definidos internamente.

| Tier | Nombre | Inversión | Contenido |
| :--- | :--- | :--- | :--- |
| 1 | **Core Unit** | ~$3,500 | Landing + Kai + Supabase Lead Capture |
| 2 | **Growth Reactor** | ~$6,500 | Core + Wizard + GA4 + Google Ads Setup |
| 3 | **Sovereign Ecosystem** | $12,500+ | Todo + GCP Neural Engine + Prospect Intelligence |

**Regla de Kai:** NUNCA mencionar precios. Siempre redirigir a la Auditoría de Diagnóstico. El precio se entrega en llamada estratégica.

---

### DEC-005: Prioridad de Optimización — Conversión Over SEO

**Decisión:** El sitio prioriza la conversión de visitantes sobre el tráfico orgánico.

- **Implicación:** El texto SEO (keywords largas) va en páginas legales y de compliance, NO en el copy principal.
- **Páginas legales como asset SEO:** Privacy, Terms, Disclaimer, Ethics, Cookie Policy, ADA Statement.
- **Copy principal:** Minimalista, emocional, de autoridad. Cero relleno.

---

### DEC-006: Renombre de Servicios (Pendiente de Implementar)

**Decisión:** Los URLs/nombres técnicos deben renombrarse para hablar de *resultados*, no de *tecnología*.

| Actual | Propuesto | Archivo |
| :--- | :--- | :--- |
| Web Infrastructure | **Autoridad Digital** | `services/web_infrastructure.html` |
| Performance Marketing | **Motor de Ingresos** | `services/performance_marketing.html` |
| AI Infrastructure | **Ecosistema Inteligente** | `services/ai_infrastructure.html` |

**Status:** Pendiente. Requiere actualizar también `translations.js`, el navbar y `sitemap.xml`.

---

## 📋 Protocolo de Documentación (El Acuerdo)

> Este módulo se actualiza en CADA sesión de trabajo. El agente tiene la responsabilidad de:
>
> 1. Documentar toda decisión estratégica nueva como `DEC-XXX`.
> 2. Registrar errores descubiertos y su corrección como `BUG-XXX`.
> 3. Registrar descubrimientos técnicos importantes como `TECH-XXX`.
> 4. Nunca dejar una sesión sin actualizar este log.

---

## 🐛 Bug Log

### BUG-001: Conflicto Animación Revenue Core vs. Sistema de Traducción

**Detectado:** Feb 18, 2026
**Causa:** `switchLanguage()` sobrescribía el DOM de nodos animados al cambiar idioma.
**Solución:** `updateSectionTranslations()` + protección del `.visual-engine-badge`.
**Archivo:** `js/script.js`
**Status:** ✅ Resuelto

### BUG-002: Chatbot Kai perdía contexto entre páginas

**Detectado:** Feb 18, 2026
**Causa:** `this.state` y `this.memory` no persistían en navegación.
**Solución:** `localStorage` con `saveState()` method.
**Archivo:** `js/chat.js`
**Status:** ✅ Resuelto

---

## ⚠️ Decisiones Pendientes de Respuesta

- [ ] **DEC-007:** ¿Agregar Cookie Policy Banner interactivo? (Requerido para GDPR/CCPA si hay visitantes EU/CA)
- [ ] **DEC-008:** ¿El caso de éxito de "la firma de automatización en Florida" es público o anónimo?
- [ ] **DEC-009:** ¿Se despliega el Prospect Intelligence Engine en GCP para el primer cliente del tier Sovereign?

---

### DEC-010: Arquitectura de Divisiones Internas (Feb 19, 2026)

**Decisión:** Nivo Partners, LLC opera con **3 divisiones internas** independientes bajo una sola entidad legal.

| División | Nombre Externo | Stack Principal |
|---|---|---|
| División I | Digital Authority | Antigravity + Jules + Vercel |
| División II | Revenue Engine | Gemini Deep Research + Google Ads + GA4 |
| División III | Intelligent Ecosystem | Jules + Gemini Pro + GCP + NotebookLM |

**Documento completo:** `03_INTERNAL_SOPs/ORG_01_Division_Architecture.md`

**Umbral para DBA:** Cuando una división supere $10k/mes de revenue sostenido por 3 meses consecutivos.

**Stack habilitado por Gemini Pro Suite:**

- Antigravity (agentic development)
- Jules (async coding agent)
- NotebookLM × 5 (knowledge bases por cliente)
- Gemini Code Assist (para contratistas técnicos)
- Gemini Deep Research (inteligencia competitiva)
- Flow + Whisk (contenido visual/video para clientes IA-tier)
- Google Drive 2TB (repositorio centralizado de activos)
