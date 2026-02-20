# 🧠 MÓDULO 02: Inteligencia Serverless y Soberanía de Datos

**Versión:** 3.1
**Propietario:** Director de Arquitectura de Datos
**Última Auditoría:** Feb 2026

---

## 1. Contexto Estratégico (El "Por qué")

**Problema del Negocio:**
Las agencias tradicionales dependen de plugins que son lentos e inseguros.

**Solución de Nivo Partners:**
Implementamos un **Pipeline de Datos Serverless**.

1. **Soberanía:** Usted es dueño de sus datos en formato SQL.
2. **Escalabilidad:** El sistema soporta miles de leads sin crashear.
3. **Resiliencia:** El cerebro (Gemini 2.5 Flash) está desacoplado del flujo transaccional.

---

## 2. Mecánica de Implementación

### Componente A: El Núcleo Neuronal (Gemini 2.5 Flash)

Migramos a **Gemini 2.5 Flash** por su relación velocidad/latencia superior.

- **SDK:** `@google/genai`.
- **Telemetría:** Aislada para evitar errores 500 en Vercel.

### Componente B: El Libro Mayor (Base de Datos Supabase)

Usamos PostgreSQL con **Row Level Security (RLS)**. Los datos del cliente son invisibles incluso si se expone la API key del frontend.

---

## 3. Auditoría de Seguridad

* [ ] **Política RLS:** Verificar que la tabla `leads` solo permita `INSERT` al rol público.
- [ ] **Logs de Edge:** Verificar que `notify_new_lead` tenga un éxito del 100%.
