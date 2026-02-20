# 🔧 SOP-05 — Tools & Stack Completo de Nivo Partners

**Propósito:** Referencia central de todas las herramientas activas, sus roles y qué división las usa.
**Audiencia:** Cualquier persona del equipo o contratista autorizado.
**Actualizar:** Cada vez que se agrega o elimina una herramienta del stack.

---

> [!IMPORTANT]
> Las credenciales de acceso NO se documentan aquí. Están en el gestor de contraseñas interno. Este documento solo lista qué herramientas existen y para qué sirven.

---

## Categoría 1 — Suite Gemini Pro (Google) *(Core del Stack de IA)*

| Herramienta | Rol en Nivo | División Principal | Plan |
|---|---|---|---|
| **Antigravity** | Desarrollo agentic, código, documentación, deployment | I, III | Gemini Pro |
| **Jules** | Agente asíncrono: refactors, scripts, QA de código | I, III | Gemini Pro |
| **Gemini Code Assist** | Copiloto de código para contratistas técnicos | I | Gemini Pro |
| **Gemini Deep Research** | Inteligencia competitiva, investigación de mercado | II | Gemini Pro |
| **NotebookLM** | Knowledge bases por cliente (hasta 5 notebooks) | II, III | Gemini Pro |
| **Gemini in Gmail** | Drafting de emails, follow-ups, propuestas | Todas | Gemini Pro |
| **Gemini in Docs** | Redacción de copy, contratos, reports | Todas | Gemini Pro |
| **Flow** | Generación de video para clientes Sovereign tier | III | Gemini Pro |
| **Whisk** | Generación de imágenes/visuales para clientes | III | Gemini Pro |
| **Google Drive (2TB)** | Repositorio central de activos, entregables, docs | Todas | Gemini Pro |
| **Google Search Labs** | Investigación de intención de búsqueda avanzada | II | Gemini Pro |

---

## Categoría 2 — Infraestructura Web *(División I)*

| Herramienta | Rol | Cuenta |
|---|---|---|
| **Vercel** | Deploy y hosting edge de sitios de clientes | Cuenta compartida (cliente recibe acceso) |
| **GitHub** | Control de versiones, entrega de código al cliente | Personal + Repos por cliente |
| **Google Cloud Platform (GCP)** | Infraestructura para Neural Engines (Sovereign tier) | Cuenta Nivo |
| **Supabase** | Base de datos con RLS para lead capture y CRM | Proyecto por cliente (cliente es owner) |
| **Resend** | Email transaccional (formularios, notificaciones) | Cuenta Nivo |

### Regla de Propiedad (crítico)

- **Vercel:** El cliente tiene su dominio conectado. Al hacer transferencia, Nivo hace deploy final y el cliente queda como owner.
- **GitHub:** El repo final se transfiere al cliente en el delivery call.
- **Supabase:** El proyecto se crea en cuenta del cliente desde el inicio, Nivo tiene acceso admin temporal.
- **Dominio:** Siempre en cuenta del cliente (GoDaddy, Namecheap, etc.). Nivo solo configura DNS.

---

## Categoría 3 — Marketing & Analytics *(División II)*

| Herramienta | Rol | Cuenta |
|---|---|---|
| **Google Ads** | Plataforma de campañas de adquisición pagada | Cuenta MCC Nivo → subcuenta cliente |
| **Google Analytics 4 (GA4)** | Rastreo de conversión y comportamiento | Propiedad en cuenta del cliente |
| **Google Tag Manager** | Gestión de tags y eventos de tracking | Contenedor por cliente |
| **Google Search Console** | SEO técnico, indexación, rendimiento orgánico | Acceso por cliente |
| **Microsoft Clarity** | Heatmaps y session recordings | Proyecto por cliente |
| **HubSpot** *(opcional)* | CRM avanzado para clientes que lo requieren | Evaluar por cliente |

### Regla de Ads

- Siempre usar **MCC (Manager account)** de Nivo para crear subcuentas de cliente.
- Facturación va directamente al cliente (método de pago del cliente en su subcuenta).
- Nivo cobra fee de gestión por separado — nunca markup sobre gasto de medios.

---

## Categoría 4 — Productividad & Comunicación *(Todas las divisiones)*

| Herramienta | Rol | Acceso |
|---|---|---|
| **Google Workspace (Gmail)** | Email corporativo (@nivopartners.com) | Todo el equipo |
| **Google Meet / Zoom** | Llamadas de ventas, diagnóstico, delivery | Zoom Pro compartido |
| **Google Drive** | Documentos internos y de clientes | Carpeta por cliente |
| **Slack** *(futuro)* | Comunicación interna del equipo | Pendiente activar al tener equipo |
| **Notion** *(evaluando)* | Alternativa para project management | No activo |

---

## Categoría 5 — Seguridad & Accesos

| Herramienta | Rol | Nota |
|---|---|---|
| **Gestor de contraseñas** | Todas las credenciales centralizadas | Bitwarden Teams o 1Password |
| **Autenticación 2FA** | Obligatorio en todas las cuentas críticas | Google Authenticator o Authy |

> [!CAUTION]
> Ningún contratista recibe acceso admin a cuentas de producción de clientes sin ser agregado explícitamente por el Director de la División. Los accesos se revocan inmediatamente al término del proyecto.

---

## Mapa de Stack por Escenario

### Scenario A — Proyecto Core Unit ($3,500)

```
Cliente firma → 
GitHub (repo privado) → 
Desarrollo con Antigravity + Jules → 
Supabase (lead capture) → 
Vercel (deploy) → 
Transferencia de accesos al cliente → 
GA4 (setup básico)
```

### Scenario B — Growth Reactor ($6,500)

```
Core Unit completo +
Google Ads (subcuenta MCC) →
GA4 conversiones configuradas →
GTM (eventos) →
Microsoft Clarity (heatmaps) →
Deep Research (análisis competitivo)
```

### Scenario C — Sovereign Ecosystem ($12,500+)

```
Growth Reactor completo +
GCP (Neural Engine) →
Jules + Gemini Pro (agentes custom) →
NotebookLM (knowledge base del negocio del cliente) →
Resend (automatización email) →
Flow/Whisk (contenido generativo) →
Reporting mensual con Antigravity
```

---

## Herramientas en Evaluación (No activas)

| Herramienta | Uso Potencial | Estado |
|---|---|---|
| Zapier / Make | Automatización no-code para clientes básicos | Evaluando |
| Intercom | Chat en sitio con IA para clientes Sovereign | Evaluando |
| Airtable | Project management de clientes | Evaluando |
| Figma | Mockups UI antes de desarrollo | Puntual por proyecto |

---

## Protocolo de Onboarding de Herramienta Nueva

Antes de agregar una herramienta al stack, validar:

1. ¿Tiene API o integración con nuestro stack actual?
2. ¿El cliente puede ser owner o seguimos siendo intermediarios?
3. ¿Tiene plan que escale con el volumen de clientes?
4. ¿Agrega complejidad innecesaria a algo que ya funciona?

**Regla:** Primero intenta resolver con lo que ya tienes. Solo agrega si no hay alternativa razonable.

---

*Documento: Feb 2026 — Actualizar con cada nueva herramienta onboarded o deprecada.*
