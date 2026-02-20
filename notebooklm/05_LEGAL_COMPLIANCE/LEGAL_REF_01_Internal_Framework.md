# ⚖️ LEGAL REF-01 — Marco Legal Interno de Nivo Partners

**Propósito:** Referencia rápida del marco legal bajo el que opera Nivo Partners. No reemplaza asesoría de un abogado. Para emergencias legales, siempre contactar al abogado de la firma.
**Estado:** Referencia interna activa — Feb 2026

---

> [!CAUTION]
> Este documento es referencia informativa interna. No constituye asesoría legal. Ante cualquier situación legal real (demanda, disputa contractual, auditoría), consultar inmediatamente con el abogado de la firma antes de actuar.

---

## Estructura Legal de la Empresa

| Campo | Detalle |
|---|---|
| **Nombre legal** | Nivo Partners, LLC |
| **Tipo de entidad** | Single-member LLC |
| **Estado de registro** | Florida, EEUU |
| **EIN** | [Completar cuando se obtenga] |
| **Cuenta bancaria comercial** | [Completar — separar personal de negocio] |
| **Año de formación** | 2025–2026 |

> [!IMPORTANT]
> La separación entre finanzas personales y de la LLC es crítica para mantener la protección de responsabilidad limitada. NUNCA mezcles cuentas. Si el IRS o un cliente te demandan, la separación es tu primera línea de defensa.

---

## Herramientas Legales Activas en el Sitio Web

Los siguientes documentos legales están implementados en `nivopartners.com` y en `nivo-partners-dev`:

| Documento | Archivo en sitio | Estado |
|---|---|---|
| Política de Privacidad (FIPA) | `/privacy.html` | ✅ Publicado |
| Términos de Servicio | `/terms.html` | ✅ Publicado |
| Earnings Disclaimer (FDUTPA/FTC) | `/disclaimer.html` | ✅ Publicado |
| Anti-Spam / CAN-SPAM | Parte de los términos | ✅ Publicado |
| Cookie Policy (GDPR/CCPA) | Pendiente | ⚠️ Pendiente |
| Declaración ADA | Pendiente | ⚠️ Pendiente |

---

## Contratos con Clientes

### Elementos mínimos que debe tener todo contrato

1. **Alcance del servicio** — qué está incluido, qué no (con bullet points claros)
2. **Timeline** — fechas de entrega por hito
3. **Estructura de pagos** — % por hito, método de pago, penalidad por pago tardío
4. **Política de revisiones** — cuántas rondas de cambios están incluidas
5. **Propiedad intelectual** — el cliente posee el código, el sitio y los datos al entregar
6. **Confidencialidad** — ambas partes se comprometen a no compartir información del proyecto
7. **Terminación** — condiciones para terminar el contrato (con o sin causa)
8. **Limitación de responsabilidad** — Nivo no es responsable de pérdidas indirectas o de resultados de negocio
9. **Jurisdicción** — Florida, EEUU (ley del estado de registro)
10. **Signatures** — firma electrónica válida (DocuSign o equivalente)

---

### Política de Reembolsos (para contratos)

| Situación | Política |
|---|---|
| El cliente cancela antes de que inicie el trabajo | Reembolso del 100% del depósito |
| El cliente cancela después de que inicia el trabajo | El depósito (50%) no es reembolsable |
| El cliente cancela después de la entrega del wireframe | Solo se reembolsa el 25% final |
| El cliente cancela después del delivery | No hay reembolso |
| Nivo no entrega en el plazo acordado (más de 14 días) | El cliente puede solicitar reembolso proporcional |

---

## Contratos con Contratistas

Cuando se contrate el primer contratista, el acuerdo debe incluir:

1. **Clasificación correcta** — Contratista independiente (1099), no empleado (W-2). Esto afecta impuestos.
2. **Scope of Work (SOW)** — Descripción exacta del trabajo
3. **Tarifa y forma de pago** — Por hora, por proyecto, o retainer
4. **IP assignment** — Todo el trabajo creado para Nivo o para un cliente de Nivo es propiedad de Nivo (o del cliente final según el contrato de cliente)
5. **NDA** — Confidencialidad sobre todos los proyectos, clientes, precios y metodología
6. **Non-solicitation** — El contratista no puede contactar directamente a los clientes de Nivo por 12 meses después de terminar la relación
7. **At-will** — La relación puede terminar en cualquier momento con 7–14 días de aviso

> [!WARNING]
> No contrates a nadie sin un contrato firmado primero. Por más que sea alguien de confianza. El NDA y el IP assignment son especialmente críticos — protegen la metodología propietaria de Nivo.

---

## Obligaciones Fiscales (Referencia Rápida)

| Obligación | Frecuencia | Detalle |
|---|---|---|
| Estimated Taxes (IRS) | Trimestral | Ene 15, Abr 15, Jun 15, Sep 15 |
| Florida Sales Tax | Cuando aplica | Los servicios digitales pueden no aplicar, verificar |
| 1099-NEC para contratistas | Anual (Ene 31) | Para cualquier contratista que pague >$600/año |
| Annual Report (Florida LLC) | Anual (Mayo 1) | $138.75 — renovación de la LLC en el estado |
| Separación de cuentas | Continua | Nunca mezclar personal y negocio |

> [!TIP]
> Usa QuickBooks Self-Employed o Wave para registrar ingresos y gastos desde el primer dólar. Guarda todos los recibos de gastos del negocio — son deducibles (software, herramientas, equipo, internet, espacio de trabajo en casa).

---

## Propiedad Intelectual — Política de Nivo

### Lo que Nivo posee

- La metodología propietaria (los Módulos 01–12)
- El sistema de conocimiento organizacional (esta biblia)
- El nombre "Nivo Partners" y cualquier marca asociada
- El código base reutilizable (componentes, templates, el agente Kai genérico)

### Lo que el cliente posee (al pagar completo)

- El código específico desarrollado para su proyecto
- El sitio web, dominio y hosting
- Los datos de leads y analytics
- Los agentes IA entrenados con su información de negocio

### Lo que nunca se transfiere al cliente

- La metodología (cómo lo construimos, el por qué de las decisiones)
- Los templates base (el cliente recibe el resultado, no el molde)
- Acceso a la biblia interna

---

## Privacidad y Datos de Clientes

### Datos que Nivo recopila de leads del cliente

- Nombre, email, teléfono (vía formulario de lead capture)
- Datos de comportamiento en el sitio (vía GA4 y Clarity)
- Mensajes del chat con Kai

### Dónde se almacenan

- **Supabase:** Lead capture data — siempre bajo la cuenta del cliente, no de Nivo
- **GA4:** Datos de analytics — bajo la propiedad del cliente
- **NotebookLM:** Knowledge bases — en la cuenta Gemini Pro de Nivo (datos del proyecto, no datos de usuarios finales)

### Obligaciones de Nivo

- No compartir datos de clientes con terceros
- No usar datos de leads de un cliente para contactarlos directamente
- Eliminar datos de proyectos al terminar la relación comercial (a solicitud del cliente)

---

## Checklist Legal para Nuevo Cliente

Antes de iniciar cualquier proyecto, verificar:

- [ ] Contrato firmado (ambas partes)
- [ ] Depósito del 50% recibido
- [ ] El cliente tiene su propio dominio registrado (si aplica)
- [ ] El cliente entiende que poseerá el código
- [ ] El cliente tiene cuenta en Google (para GA4), GitHub (si requiere) y Vercel (si aplica)
- [ ] Si el proyecto involucra datos de usuarios finales: política de privacidad del cliente actualizada

---

*Documento: Feb 2026 — Revisar cada vez que cambie la ley estatal/federal aplicable o cuando se expanda a nuevos estados/países.*
