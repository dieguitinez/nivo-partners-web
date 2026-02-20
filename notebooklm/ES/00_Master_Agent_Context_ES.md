# Nivo Partners: Contexto Maestro del Agente

Este documento es el **Manual de Onboarding Obligatorio** para cualquier agente de IA o desarrollador humano que trabaje en el código de Nivo Partners.

---

## 1. Identidad Global y Posicionamiento

| Atributo | Directiva |
| :--- | :--- |
| **Nombre de la Empresa** | **Nivo Partners**.<br/>*(CRÍTICO: Cualquier mención de "Nexo" es un error fatal).* |
| **Naturaleza del Negocio** | Firma de Diseño de Sistemas B2B de Alta Gama en Tampa, FL. |
| **Tono y Estética** | Soberano, modo oscuro, altamente técnico, corporativo. |

---

## 2. Los 3 Pilares Core (Lógica de Negocio)

| Pilar | Enfoque Arquitectónico |
| :--- | :--- |
| **Infraestructura Web** | Vercel + Gemini 2.5 Flash + Cloudflare + Supabase. |
| **Marketing y ROI** | Protocolos de Amplificación de Tráfico (IA VEO/Gemini 2.5) + Validación de micro-gasto. |
| **Automatización e IDP** | VM dedicada en GCP (e2-micro) para Scrapers y procesos de n8n. |

---

## 3. Reglas de Oro para Agentes

1. **Inyección No Destructiva:** Nunca sobrescribir componentes UI que funcionan. Usar `clamp()` para tipografía responsiva.
2. **Mobile-First:** Asegurar que las reglas de `z-index` no causen colisiones en pantallas menores a `768px`.
3. **Blacklist:** La palabra "Nexo" está estrictamente prohibida.
