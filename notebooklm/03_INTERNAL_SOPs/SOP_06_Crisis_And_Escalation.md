# 🚨 SOP-06 — Protocolo de Crisis y Escalación

**Propósito:** Guía de respuesta rápida cuando algo sale mal. No es para analizar el problema — es para ejecutar la solución.
**Cuándo usar:** Cualquier incidente que afecte a un cliente activo o a la operación interna.

---

> [!CAUTION]
> La respuesta incorrecta durante una crisis puede dañar la relación más que el incidente en sí. Este protocolo existe para que respondas rápido, honesto y con control — sin improvisar bajo presión.

---

## Clasificación de Crisis

Antes de actuar, clasifica el incidente:

| Nivel | Definición | Tiempo de respuesta máximo | Quién responde |
|---|---|---|---|
| 🔴 **CRÍTICO** | Sitio caído, datos perdidos, leads no llegan, hack | 2 horas — incluyendo fines de semana | Fundador directo |
| 🟡 **MAYOR** | Formulario roto, GA4 sin datos, Kai no responde | 4 horas hábiles | Fundador o Director técnico |
| 🟢 **MENOR** | Error visual, typo, link roto, velocidad degradada | 24 horas hábiles | Dev disponible |
| ⚪ **CONSULTA** | El cliente pregunta algo que no es un error | 4 horas hábiles | Quien lleve la cuenta |

**Regla de clasificación:** Cuando no estés seguro, clasifica más alto, no más bajo. Es mejor sobrereaccionar y quedar bien que subreaccionar y perder la confianza del cliente.

---

## Protocolo por Nivel

---

### 🔴 CRISIS CRÍTICA — Respuesta en 2 horas

**Paso 1 — Confirma el incidente (15 min)**

```
□ ¿El sitio sigue caído? Prueba desde otro dispositivo y red.
□ ¿El problema está en Vercel (hosting)? → Revisar status.vercel.com
□ ¿El problema está en Supabase (DB)? → Revisar status.supabase.com
□ ¿El problema está en el dominio/DNS? → Probar con dig o nslookup
□ ¿Es un error nuestro de código? → Revisar deploy logs en Vercel
```

**Paso 2 — Notifica al cliente ANTES de tener la solución (15 min)**

> *"[Nombre], detectamos un problema con [sitio/sistema]. Estamos trabajando en esto ahora mismo. Te doy una actualización en máximo [1 hora]. Nos disculpamos por cualquier inconveniente."*

**NUNCA** esperes a tener la solución para notificar. El cliente debe saber que estás encima del problema antes de que ellos te llamen.

**Paso 3 — Diagnostica y resuelve**

| Problema | Solución inmediata |
|---|---|
| Vercel deploy fallido | `vercel rollback` → volver al último deploy estable |
| DNS no resuelve | Verificar registros en panel del dominio del cliente |
| Supabase no conecta | Verificar `anon key` y URL en variables de entorno de Vercel |
| Formulario no envía | Revisar consola del browser → identificar error de JS o CORS |
| Sitio cargando lento | Revisar Vercel Analytics → ¿aumentó el tráfico? ¿asset sin comprimir? |
| Error 404 en producción | Revisar `vercel.json` → rutas de rewrites |

**Paso 4 — Cierre del incidente**

Una vez resuelto, envía un email de cierre:

> *"[Nombre], el problema está resuelto. [Descripción honesta de qué pasó y qué hicimos para solucionarlo]. Implementamos [medida preventiva] para que esto no vuelva a ocurrir. Si notas cualquier otro comportamiento inusual, escríbeme directamente."*

**Paso 5 — Post-mortem interno (24 horas después)**

```
REPORTE DE INCIDENTE (uso interno):
  Fecha y hora del incidente:
  Fecha y hora de resolución:
  Causa raíz:
  Impacto en el cliente (tiempo caído, leads perdidos estimados):
  Solución aplicada:
  Medida preventiva implementada:
  Lección documentada: (agregar a SOP_04 o SOP_05 si aplica)
```

---

### 🟡 CRISIS MAYOR — Respuesta en 4 horas hábiles

Mismos pasos que Crítico, pero con mayor calma y sin necesidad de notificar al cliente en los primeros 30 minutos si estás en diagnóstico activo.

**Para Kai no responde:**

```
□ Verificar que translations.js carga correctamente (DevTools → Network)
□ Verificar que chat.js está cargando (sin errores de JS en consola)
□ Probar en modo incógnito (descarta cache)
□ Verificar que el nodo inicial ('hello') existe en el árbol de traducción
```

**Para GA4 sin datos:**

```
□ Verificar con GA4 DebugView que el tag está activo
□ Revisar GTM si se usa — ¿el contenedor publicó correctamente?
□ Verificar que el Measurement ID es correcto en el código
□ Usar Google Tag Assistant para diagnosticar
```

---

### 🟢 CRISIS MENOR — Respuesta en 24 horas hábiles

- No requiere notificación inmediata al cliente
- Si el cliente lo reportó, responde con: *"Gracias por avisarlo. Lo corrijo antes de [fecha] y te confirmo."*
- Documenta en el registro de cambios del proyecto

---

## Escalación a Terceros

Cuando el problema está fuera del control de Nivo:

| Servicio caído | Cómo verificar | Cómo responder al cliente |
|---|---|---|
| Vercel | status.vercel.com | *"El hosting de terceros que usamos está experimentando interrupciones. Estamos monitoreando y activamos rollback si es necesario."* |
| Supabase | status.supabase.com | *"La base de datos está experimentando problemas del lado del proveedor. Los leads se recuperarán al restaurarse el servicio."* |
| Google Ads | ads.google.com/status | *"Las campañas están en pausa por un problema en la plataforma de Google. No hay gasto ocurrido."* |
| Dominio/DNS | Proveedor del cliente | *"Hay un problema con la configuración del dominio. Necesito acceso al panel del proveedor para revisarlo contigo."* |

**Regla:** Cuando el problema es de un tercero, comunicarlo al cliente con transparencia. Nunca digas "estamos trabajando en ello" si el problema no está en tu control.

---

## Gestión de Crisis de Reputación

*(Para cuando hay una reseña muy negativa, un comentario viral, o un malentendido público)*

### Si el cliente reporta una reseña negativa falsa

1. No respondas con emoción. Espera 30 minutos.
2. Busca la reseña y lee todo el contexto.
3. Borradores de respuesta para el cliente (con nombre del negocio, no de Nivo):
   > *"Agradecemos su feedback. Sin embargo, no encontramos registro de su visita/servicio en nuestro sistema. Si hubo algún malentendido, le invitamos a contactarnos directamente para resolverlo. [Nombre del negocio]"*
4. Reportar la reseña en Google como "contenido engañoso" si aplica.

### Si el propio cliente está enojado con Nivo

1. Escucha sin interrumpir. Confirma que entendiste la queja.
2. No te pongas a la defensiva — aunque tengas razón.
3. Pregunta: *"¿Qué tendría que pasar para que esto quede resuelto para ti?"*
4. Si la queja es válida → resuelve y documenta.
5. Si no es válida → explica con datos, no con opiniones.
6. Nunca termines la conversación sin un acuerdo sobre el siguiente paso.

---

## Comunicación Interna Durante una Crisis

1. El Fundador sabe de todo. No hay sorpresas a nivel directivo.
2. Los contratistas reciben información de "need to know" — solo lo necesario para resolver su parte.
3. Ningún contratista se comunica con el cliente durante una crisis. Todo pasa por el Fundador.
4. El channel de crisis (WhatsApp directo) se usa con mensajes concisos:

   ```
   🚨 CRISIS [nivel]
   Cliente: [nombre]
   Problema: [descripción en 1 línea]
   Estado: [diagnosticando / resolviendo / resuelto]
   ETA: [tiempo estimado de resolución]
   ```

---

## Lecciones Aprendidas (Log)

| Fecha | Tipo | Causa raíz | Solución | Prevención implementada |
|---|---|---|---|---|
| Feb 2026 | — | (primer incidente a documentar) | — | — |

---

*Documento: Feb 2026 — Agregar cada incidente al log de lecciones aprendidas. Los problemas que no se documentan se repiten.*
