# ♿ LEGAL-06 — Declaración de Accesibilidad (ADA / WCAG)

**Sitio web:** nivopartners.com  
**Última actualización:** Feb 19, 2026  
**Estándar objetivo:** WCAG 2.1 Nivel AA  
**Archivo en sitio:** `/legal/ada.html`

---

## Compromiso de Nivo Partners con la Accesibilidad

Nivo Partners, LLC está comprometida con garantizar que su presencia digital sea accesible para todas las personas, incluyendo aquellas con discapacidades visuales, auditivas, motoras o cognitivas. Trabajamos continuamente para mejorar la accesibilidad de nuestro sitio web en conformidad con:

- **ADA** — Americans with Disabilities Act (Ley de Estadounidenses con Discapacidades)
- **Section 508** — Requisitos de accesibilidad para servicios federales (referencia)
- **WCAG 2.1 Nivel AA** — Pautas de Accesibilidad para el Contenido Web del W3C

---

## Estado Actual de Conformidad

### Lo que cumplimos

| Área | Práctica implementada |
|---|---|
| Contraste de color | Relación de contraste mínima 4.5:1 para texto normal |
| Navegación por teclado | Todos los elementos interactivos son accesibles con Tab |
| Textos alternativos | Todas las imágenes relevantes tienen atributo `alt` descriptivo |
| Estructura de encabezados | Jerarquía H1→H2→H3 consistente en todas las páginas |
| Formularios | Todos los campos tienen labels asociados |
| Links | Todos los links tienen texto descriptivo (no "click aquí") |
| Fuentes | Tamaño mínimo de 16px en texto de cuerpo |
| Viewport | El sitio es completamente responsive y funciona con zoom hasta 200% |

### Áreas en mejora continua

| Área | Estado |
|---|---|
| ARIA landmarks | En proceso de implementación completa |
| Videos con subtítulos | Pendiente (no hay video content actual) |
| Documentos PDF | No se usa PDF — todo el contenido es HTML nativo |
| Chatbot Kai (accesibilidad) | Funcional con teclado; ARIA roles en mejora |

---

## Tecnologías Asistivas Compatibles

El sitio ha sido probado y es compatible con las siguientes tecnologías:

- **Lectores de pantalla:** NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- **Navegación por teclado:** Tab, Enter, Escape, teclas de flecha
- **Zoom del navegador:** Hasta 200% sin pérdida de contenido
- **Modo de alto contraste:** Compatible con el modo de Windows y macOS
- **Navegadores:** Chrome, Firefox, Safari, Edge (versiones actuales)

---

## Proceso de Evaluación

Nivo Partners evalúa la accesibilidad del sitio mediante:

1. **Evaluación automática:** Google Lighthouse (sección Accessibility) — objetivo: puntuación ≥90/100
2. **Revisión manual:** En cada nuevo deploy, revisión de estructura de encabezados, contraste y navegación con teclado
3. **Evaluación periódica:** Al agregar nuevas secciones o páginas al sitio

---

## Limitaciones Conocidas

Somos transparentes sobre las áreas donde aún trabajamos:

| Limitación | Plan de acción | Fecha objetivo |
|---|---|---|
| El chatbot Kai no tiene anuncio ARIA completo al abrirse | Agregar `aria-live="polite"` al contenedor del chat | Q1 2026 |
| Las animaciones CSS no tienen opción de reducción de movimiento | Implementar `prefers-reduced-motion` media query | Q1 2026 |

---

## Cómo Reportar un Problema de Accesibilidad

Si encuentras alguna barrera de accesibilidad en nuestro sitio que no está cubierta aquí, o si necesitas la información de una página en formato alternativo, por favor contáctanos:

**Email:** <accessibility@nivopartners.com> *(o el email que el fundador designe)*  
**Asunto:** [Accesibilidad] Descripción breve del problema  
**Incluye:** URL de la página, descripción del problema, tecnología asistiva que usas (si aplica)

**Tiempo de respuesta:** Responderemos en máximo 5 días hábiles con una solución o un plan de acción con fecha.

---

## Marco Legal de Referencia

### ADA (Americans with Disabilities Act)

El Título III de la ADA prohíbe la discriminación por discapacidad en "lugares de acomodación pública", lo cual los tribunales han extendido para incluir sitios web. Los negocios en EEUU con >15 empleados tienen obligaciones específicas; los de menor tamaño siguen siendo recomendados seguir las buenas prácticas.

### WCAG 2.1 Nivel AA

Las Pautas de Accesibilidad para el Contenido Web del W3C establecen cuatro principios:

- **Perceptible:** La información debe poder percibirse de múltiples formas
- **Operable:** Todos los componentes deben poder operarse
- **Comprensible:** La información y la operación de la interfaz deben ser comprensibles
- **Robusto:** El contenido debe poder interpretarse por tecnologías asistivas actuales y futuras

---

## Historial de Actualizaciones

| Fecha | Cambio |
|---|---|
| Feb 19, 2026 | Declaración inicial publicada |

---

*Documento: Feb 2026 — Actualizar al hacer cambios significativos al sitio o al agregar nuevas páginas.*
