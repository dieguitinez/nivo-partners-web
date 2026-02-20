# ✅ SOP-04 — Estándares de Calidad de Nivo Partners

**Propósito:** Definir qué significa "calidad Nivo" para cada tipo de entregable. Si no cumple estos estándares, no sale.
**Aplica a:** Desarrolladores, contratistas, Account Managers — cualquiera que produzca algo para un cliente.

---

> [!IMPORTANT]
> La mediocridad es del mercado masivo. Nivo opera en el segmento premium. Un cliente que paga $3,500+ tiene derecho a recibir trabajo que justifique ese precio en cada detalle. La calidad no se negocia internamente — se garantiza antes de llegar al cliente.

---

## Los 5 Principios de Calidad Nivo

1. **Tú eres el cliente final.** Antes de entregar algo, pregúntate: ¿Lo aceptarías personalmente si fueras el cliente?
2. **Los detalles definen la percepción.** Un sitio puede funcionar perfectamente y parecer amateur por una fuente mal elegida o un espaciado irregular.
3. **La velocidad importa.** Premium no es lento. Si algo tarda >3 segundos en cargar, no está listo.
4. **La propiedad es sagrada.** El cliente debe terminar la relación con Nivo siendo dueño de más de lo que tenía al inicio.
5. **Si tienes que preguntar si está bien, no está bien.** El trabajo de calidad es obvio para el ojo entrenado.

---

## Estándares por Tipo de Entregable

### 🖥️ Sitios Web (División I)

| Criterio | Estándar Mínimo | Estándar Nivo |
|---|---|---|
| Velocidad de carga (mobile) | <3 segundos | <2 segundos (Lighthouse >85) |
| Responsive | Funciona en mobile | Perfecto en mobile, tablet y desktop |
| Formulario funcional | El botón envía | Datos confirmados en Supabase + email al cliente |
| Tipografía | Fuente legible | Jerarquía tipográfica clara, tamaño mínimo 16px body |
| Colores | Esquema coherente | Sistema de variables CSS, consistencia total |
| Código | Funciona | Limpio, comentado, sin código muerto |
| SEO básico | Tiene título | Title, meta description, OG tags, sitemap, robots.txt |
| SSL | HTTPS activo | HTTPS + HSTS |
| Accesibilidad | No hay errores obvios | Contraste AA, alt texts en imágenes, roles ARIA |

**Lo que NUNCA se entrega:**

- Sitios con `console.log()` activos en producción
- Imágenes sin comprimir (>500kb sin razón)
- Links rotos (probados con herramienta antes del delivery)
- Estilos inline mezclados con CSS externo sin razón
- Texto placeholder ("Lorem ipsum") en cualquier sección visible

---

### 📊 Campañas de Google Ads (División II)

| Criterio | Estándar Mínimo | Estándar Nivo |
|---|---|---|
| Estructura de campañas | Una campaña, múltiples ad groups | Campañas separadas por intención/fase del funnel |
| Keywords | Broad match genérico | Exact + Phrase match + negativos configurados |
| Ad copy | 1 versión | Mínimo 3 variantes por ad group (RSA) |
| Conversiones | Configuradas en GA4 | Conversiones verificadas + micro-conversiones |
| Presupuesto | Configurado | Con límites diarios + alertas de overspend |
| Reportes | Datos de plataforma | ROI en pesos (revenue atribuido / inversión) |

**Lo que NUNCA se lanza:**

- Campañas sin conversiones configuradas primero
- Ad copy con errores de ortografía (revisado con Gemini antes de publicar)
- Presupuesto sin límite de gasto configurado
- Keywords sin negativas básicas (competidores, términos irrelevantes)

---

### 🤖 Agentes IA y Automatizaciones (División III)

| Criterio | Estándar Mínimo | Estándar Nivo |
|---|---|---|
| Flujo de conversación | Responde preguntas básicas | Árbol de decisión completo, sin dead-ends |
| Manejo de errores | No se cuelga | Fallback claro para preguntas fuera de scope |
| Latencia de respuesta | <5 segundos | <2 segundos |
| Personalización | Respuestas genéricas | Entrenado con información específica del negocio |
| Testing | Probado por el dev | Mínimo 20 interacciones de prueba antes de lanzar |
| Handoff humano | No existe | Siempre hay un camino a contacto humano claro |

---

### 📄 Documentos y Reportes (Todas las divisiones)

| Criterio | Estándar Mínimo | Estándar Nivo |
|---|---|---|
| Ortografía y gramática | Comprensible | Sin errores (revisado con Gemini antes de enviar) |
| Formato | Legible | Jerarquía clara, tablas cuando aplica, no walls of text |
| Datos | Presentes | Fuente de cada dato citada |
| CTA | Implícito | Explícito — el cliente sabe exactamente qué sigue |
| Idioma | El acordado | Siempre preguntar: ¿español, inglés o bilingüe? |

---

## Proceso de QA Interno

### Antes de mostrar cualquier trabajo al cliente

```
PASO 1: Auto-revisión del creador
  → Revisa contra los estándares de este documento
  → Prueba en condiciones reales (mobile, browser diferente, conexion lenta)
  → Deja pasar 30 minutos y revísalo "con ojos frescos"

PASO 2: Revisión del Fundador / Director de División
  → El cliente nunca ve el trabajo antes de que el fundador lo haya aprobado
  → En Phase 0: El fundador aprueba TODO
  → En Phase 1+: El Director de División aprueba antes de escalar al cliente

PASO 3: Entrega al cliente
  → Si hay feedback del cliente → se implementa dentro del SLA
  → Si el feedback revela un error nuestro → se corrige gratis, se aprende, se documenta
```

---

## Qué hacer cuando algo no cumple el estándar

### Escenario A: Lo descubrimos antes de la entrega

**Acción:** Corregirlo. No se negocia. Si necesitas más tiempo, comunica con honradez al cliente:
> *"Queremos asegurarnos de que lo que recibes está perfecto. Necesitamos [X días] adicionales."*

Nunca entregues algo que sabes que no está bien y esperas que el cliente "no note".

### Escenario B: El cliente reporta un error después de la entrega

**Acción:** Agradece el reporte. Clasifica:

- ¿Es un bug (algo que debió funcionar desde el inicio)? → Se corrige gratis, dentro del SLA.
- ¿Es un cambio de scope (algo nuevo que piden ahora)? → Se cotiza por separado.

Lenguaje para distinguir:
> *"Eso que describes es [un bug que corregimos sin costo / una mejora adicional fuera del scope original, la cual podemos cotizar rápidamente]."*

### Escenario C: Error causado por terceros (hosting caído, API de Google, etc.)

**Acción:** Comunicar proactivamente al cliente. No esperar a que ellos lo reporten.
> *"Detectamos un problema en [servicio externo]. No es algo bajo nuestro control directo, pero ya estamos encima de la situación y te actualizamos en [tiempo]."*

---

## Métricas de Calidad a Nivel Firma

Se revisan mensualmente:

| Métrica | Objetivo |
|---|---|
| % de proyectos entregados sin re-trabajo mayor | ≥ 85% |
| NPS promedio al momento de delivery | ≥ 8/10 |
| % de bugs reportados por clientes en primeros 30 días | ≤ 15% |
| % de entregables aprobados en primera revisión | ≥ 70% |

---

*Documento: Feb 2026 — El estándar evoluciona con cada proyecto completado.*
