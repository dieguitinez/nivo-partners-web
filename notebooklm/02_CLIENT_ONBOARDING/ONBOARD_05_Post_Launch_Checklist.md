# ✅ ONBOARD-05 — Post-Launch Checklist

**Uso:** Después de hacer el delivery al cliente, antes de cerrar el proyecto como "entregado"
**Responsable:** El Fundador (Phase 0) o el Director de División (Phase 1+)
**Cuándo ejecutar:** En las 72 horas posteriores al Delivery Call

---

> [!IMPORTANT]
> Un proyecto no está "terminado" el día que se entrega. Está terminado cuando confirmas que todo funciona en producción con tráfico real. Este checklist es la diferencia entre un cliente satisfecho y un ticket de soporte a las 2am.

---

## BLOQUE A — Verificación Técnica (Día 1 post-delivery)

### Infraestructura

- [ ] El sitio carga en HTTPS (no HTTP) en todos los dominios
- [ ] El dominio principal redirige al www o viceversa (no hay versión duplicada)
- [ ] El sitio carga en <3 segundos en mobile (verificar con PageSpeed Insights)
- [ ] No hay errores en la consola del browser (F12 → Console → cero errores rojos)
- [ ] Todos los links internos funcionan (navegar el sitio completo)
- [ ] Las imágenes cargan en todos los dispositivos (mobile, tablet, desktop)

### Formulario de Lead Capture

- [ ] Llenar el formulario como si fuera un lead real
- [ ] Verificar que el registro aparece en Supabase → tabla `leads`
- [ ] Verificar que el email de notificación llega al inbox correcto del cliente
- [ ] Verificar que Kai activa el flujo post-formulario correctamente
- [ ] Probar con datos inválidos (email sin @, campos vacíos) — el formulario debe rechazarlos

### Chatbot Kai

- [ ] Kai aparece en desktop y mobile
- [ ] El saludo inicial se muestra correctamente
- [ ] Todos los nodos del árbol de conversación son alcanzables
- [ ] El botón de contacto abre el formulario sin errores
- [ ] Si hay cambio de idioma (es/en), Kai cambia su idioma en tiempo real
- [ ] No hay nodos que lleven a un dead-end (callejón sin salida)

### Analytics y Tracking

- [ ] GA4 está reportando visitas en tiempo real (verificar con DebugView mientras navegas)
- [ ] Los eventos de conversión disparan al llenar el formulario
- [ ] Google Search Console tiene la propiedad verificada
- [ ] El sitemap.xml está enviado a Search Console
- [ ] Microsoft Clarity (si aplica) está grabando sesiones

---

## BLOQUE B — Verificación de Accesos del Cliente (Día 1–2 post-delivery)

- [ ] El cliente tiene acceso admin a su repositorio de GitHub
- [ ] El cliente puede entrar a Vercel con su cuenta y ver el proyecto
- [ ] El cliente puede ver los registros de leads en Supabase
- [ ] El cliente tiene acceso admin a GA4
- [ ] El cliente tiene acceso a Google Search Console
- [ ] El Documento de Credenciales fue enviado al cliente por email

**Verificación de seguridad:**

- [ ] El API key de Supabase usado en el sitio está limitado (solo `anon` key, no `service_role`)
- [ ] No hay credenciales hardcodeadas en el código visible del repositorio
- [ ] El acceso de Nivo al repositorio del cliente está como "collaborator" (no owner) post-transferencia

---

## BLOQUE C — Verificación de Ads (solo Growth Reactor y Sovereign) (Día 1–3 post-delivery)

- [ ] Las campañas están en estado "Activo" en Google Ads
- [ ] El método de pago del cliente está configurado en su subcuenta de Ads
- [ ] Las conversiones están siendo rastreadas (ver columna "Conv." en Google Ads)
- [ ] Los anuncios están aprobados (sin la bandera "En revisión" o "Rechazado")
- [ ] No hay keywords en estado "Relevancia baja" sin justificación
- [ ] Los límites de presupuesto diario están configurados
- [ ] Las extensiones de anuncio (sitelinks, callouts) están activas

---

## BLOQUE D — Confirmación con el Cliente (Día 3–7 post-delivery)

### Email de check-in del Día 3

```
Asunto: [Nombre del negocio] — ¿Cómo está corriendo todo?

Hola [Nombre],

Han pasado [X] días desde que lanzamos. Quería hacer un check-in rápido:

1. ¿Llegaron leads al formulario ya? (Puedes verlos en [link a Supabase])
2. ¿El equipo pudo revisar los accesos sin problemas?
3. ¿Hay algo que no funcione como esperabas?

Si quieres revisamos juntos el dashboard de GA4 en una llamada corta esta semana.

[Firma]
```

### Email de check-in del Día 30

```
Asunto: [Nombre del negocio] — Reporte del primer mes

Hola [Nombre],

Aquí el resumen del primer mes:

LEADS CAPTURADOS: ______
SESIONES EN EL SITIO: ______
TASA DE CONVERSIÓN ESTIMADA: ______%

[Si hay campañas activas:]
INVERSIÓN EN ADS: $______
LEADS ATRIBUIDOS A ADS: ______
COSTO POR LEAD: $______

¿Hay clientes que cerraste que vinieron de estos leads? Si me lo dices,
puedo calcular el ROI real del sistema con tus números.

¿Agenda para una llamada de revisión esta misma semana?

[Firma]
```

---

## BLOQUE E — Cierre Interno del Proyecto

Una vez completados los bloques A, B y C, marcar el proyecto como cerrado internamente:

- [ ] Todos los archivos del proyecto están en Google Drive (carpeta del cliente)
- [ ] El repositorio de GitHub está transferido y organizado
- [ ] El Brief Post-Llamada + Credenciales + Cualquier contrato está en Drive
- [ ] El Reporte de Incidentes (si los hubo) está documentado
- [ ] El caso está listo para ser agregado a `DECK_04_Case_Studies.md` cuando haya resultados
- [ ] Se agendó la llamada de check-in del Día 30 en el calendario

---

## Señales de un Cliente en Riesgo (detectar en los primeros 30 días)

| Señal | Acción |
|---|---|
| No abre los emails de check-in | Llamar directamente en la semana 2 |
| Reporta que no llegaron leads | Revisar formulario y GA4 juntos en pantalla compartida |
| Dice "no funciona" sin especificar | Pedir screen recording o llamada inmediata |
| Silencio total después de la entrega | 🚨 Contacto proactivo Día 5 — es una señal de insatisfacción pasiva |
| Pregunta sobre el refund antes de 30 días | Escalar a conversación honesta: ¿qué no cumplió con sus expectativas? |

---

*Documento: Feb 2026 — Actualizar con cada proyecto completado, especialmente si emerge un nuevo punto ciego.*
