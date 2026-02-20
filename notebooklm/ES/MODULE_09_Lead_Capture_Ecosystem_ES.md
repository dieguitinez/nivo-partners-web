# 🗄️ MÓDULO 09: Captura de Leads Soberana y Notificaciones Neuronales

**Objetivo:** Dominar la construcción de un ecosistema de captura de leads asíncrono y serverless que garantice la soberanía de los datos.

---

## 1. Almacenamiento Soberano: Supabase (PostgreSQL)

En el corazón de nuestro motor de leads está **Supabase**. No usamos formularios de terceros que "alquilan" sus datos. Construimos **Almacenamiento Soberano**.

* **Seguridad (RLS):** Garantiza que mientras cualquiera puede enviar un lead, nadie puede leer la base de datos sin la clave secreta.

---

## 2. Ejecución Autónoma: Edge Functions

¿Qué pasa después de guardar los datos? Disparamos una **Función de Edge Autónoma**.

1. **Escucha:** Espera un Webhook de la base de datos.
2. **Notifica:** Formatea el email y llama a la API de Resend.

---

## 3. El Bucle de Asistencia IA

* **Consulta del Usuario** -> Kai (Gemini 2.5 Flash) -> Análisis de Contexto -> **Escalamiento Automático al Modal de Auditoría**.

---

> [!IMPORTANT]
> **Conclusión Clave:** Al combinar Supabase, Funciones de Edge y Resend, usted está construyendo una **Infraestructura**, no solo un sitio web.
