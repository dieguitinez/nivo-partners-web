# 📖 SOP 07: Blueprint de Ejecución — Proyecto Trinity-Alpha

**Versión:** 1.0
**Misión:** Convertir la infraestructura de Nivo Partners en una máquina de generación de ingresos en 5 pasos.
**Stack:** n8n + Gemini Pro + Vercel + Supabase + Resend.

---

## 🏗️ Paso 1: Selección del Nicho y "Gold Mine"

No todos los mercados pagan igual. Buscamos nichos con ticket alto (+$5k) e ineficiencias digitales visibles.

- **Acción:** Escoger entre Med-Spas, Roofing, Remodelaciones de Lujo o Abogados de Inmigración.
- **Herramienta:** Gemini Deep Research para encontrar el "Pain Point" específico de ese sector en el 2026 (ej. "Pierden leads por no responder en < 5 min").

---

## 🌐 Paso 2: La Infraestructura de Captación (El Hook)

Creamos una página ultra-veloz enfocada en un solo objetivo: una auditoría gratuita.

- **Acción:** Desplegar en Vercel una landing minimalista (ej. `auditoria.nivopartners.com`).
- **Input:** Un solo campo: "Ingresa la URL de tu negocio" + "Email para recibir el reporte".
- **Backend:** Conectar el formulario a un **Webhook de n8n**.

---

## 🧠 Paso 3: El Cerebro Analítico (n8n + Gemini)

Este es el "Loop" que genera el valor sin que nosotros hagamos nada.

- **Acción en n8n:**
    1. **Scraping:** n8n usa un nodo de HTTP Request para leer el contenido del sitio web del cliente.
    2. **Análisis:** Envía ese texto a **Gemini Pro** con un prompt especializado: *"Actúa como un Auditor de Ingresos de Nivo Partners. Detecta 3 fallas críticas en este sitio y cómo le hacen perder dinero."*
    3. **Generación de Reporte:** Gemini redacta un reporte en Markdown profesional e hiper-personalizado.

---

## 📧 Paso 4: El SDR Agéntico (La Entrega y el Pitch)

Aquí es donde la auditoría se convierte en dinero.

- **Acción:** n8n envía el reporte vía **Resend** al cliente.
- **El "Kicker":** El email no solo envía el PDF; incluye un video de 30 segundos (opcionalmente generado por IA) o un link directo a tu calendario: *"He detectado que estás perdiendo aproximadamente $X al mes por estos errores. Agenda aquí para que mi equipo te entregue el plan de reparación gratuito."*

---

## 📈 Paso 5: Escalamiento y Arbitraje

Una vez que el flujo Web -> n8n -> Email funciona, "encendemos" la máquina.

- **Acción:** Usar n8n para buscar en masa sitios de ese nicho en Google Maps (Place API).
- **Escalabilidad:** Ejecutar la auditoría en frío (Cold Audit) y enviarla a 100 dueños de negocio al día.
- **Resultado:** Tu calendario se llena de llamadas de dueños de negocio que ya vieron el valor de lo que haces porque les entregaste un reporte real antes de pedirles un dólar.

---

## 🛠️ Checklist Técnico de Inicio

- [ ] **n8n:** Workflow activo con Webhook URL.
- [ ] **Gemini API Key:** Conexión verificada.
- [ ] **Resend:** Dominio `@nivopartners.com` verificado para evitar spam.
- [ ] **Vercel:** Landing page con Form ID conectado.

---

> [!TIP]
> **La Clave del Éxito:** No intentes vender "Infraestructura de IA". Vende "Tengo el reporte de por qué tu competencia te está ganando y cómo arreglarlo hoy".
