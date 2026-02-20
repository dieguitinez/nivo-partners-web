# 👥 ORG-02 — Organigrama de Nivo Partners

**Versión:** 1.0 — Feb 2026  
**Estado:** Operación de Fundador Solo (Phase 0)
**Próxima revisión:** Al cerrar el primer cliente de retainer Division II

---

> [!NOTE]
> Este documento describe la estructura organizacional real hoy — no la aspiracional. La honestidad sobre la capacidad actual es lo que permite escalar con integridad. Cada fase tiene criterios claros de activación.

---

## Fase 0 — Operación Actual: Sole Founder (Feb 2026)

En esta fase, el fundador opera todas las funciones. El objetivo no es cubrirlo todo perfecto — es identificar qué subcontratar primero para escalar sin quemarse.

```
┌─────────────────────────────────────┐
│         NIVO PARTNERS, LLC          │
│         Fundador / Director General │
└─────────────┬───────────────────────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
 División I  División II   División III
 [Founder]  [Founder]    [Founder + AI Tools]
```

### Roles que el Fundador cubre HOY

| Función | Tiempo estimado/semana | Prioridad de delegar |
|---|---|---|
| **Ventas y cierre** | 6-8 hrs | 🔴 NUNCA delegar (es el diferenciador) |
| **Estrategia de cliente** | 4-6 hrs | 🔴 No en Phase 0 |
| **Desarrollo web (Div I)** | 10-15 hrs | 🟡 Primero a delegar (Phase 1) |
| **Gestión de ads (Div II)** | 4-6 hrs | 🟡 Segundo a delegar (Phase 1-2) |
| **Automatización IA (Div III)** | 3-5 hrs | 🔴 Retener — es el core diferenciador |
| **Administración y facturación** | 2-3 hrs | 🟢 Delegar con herramientas (hoy) |
| **Documentación y sistema** | 2-3 hrs | 🟢 Delegar a Antigravity (hoy) |

**Insight clave:** Las ventas, la estrategia y la IA son las 3 funciones intransferibles. Todo lo demás es delegable.

---

## Fase 1 — Primer Contratista (al cerrar 3 clientes activos)

**Threshold de activación:** 3 proyectos activos simultáneos = el fundador no puede hacer desarrollo solo.

**Primer hire:** Desarrollador Front-End (contratista por proyecto)

```
┌─────────────────────────────────────────┐
│         NIVO PARTNERS, LLC              │
│         Fundador / Director General     │
│         Ventas · Estrategia · IA        │
└───────────────┬─────────────────────────┘
                │
      ┌─────────┴──────────┐
      ▼                    ▼
 Desarrollador         Fundador
 Front-End             continúa:
 (Contratista)         - Ventas
 División I            - Estrategia
                       - Div II & III
```

### Perfil del primer contratista

- **Rol:** Desarrollador Front-End
- **Skills requeridos:** HTML/CSS/JS avanzado, Vercel, GitHub, Figma básico
- **Herramientas que debe conocer:** Git, Vercel CLI, Supabase básico
- **Herramienta IA que usará:** Gemini Code Assist (acceso temporal mientras dure el proyecto)
- **Modelo de pago:** Por proyecto (% del valor del contrato, acordado antes de iniciar)
- **Contrato:** Work-for-hire con cláusula de propiedad intelectual (ver ONBOARD_01 — cláusula IP)

**Proceso de onboarding del contratista:**

1. Firma de NDA + Work-for-hire agreement
2. Acceso a: GitHub repo del proyecto, Supabase (read-only inicial), Vercel (preview only)
3. Briefing de 1 hora: contexto del cliente, diseño esperado, deadline
4. Check-in diario vía mensaje (no reuniones)
5. Revisión de entrega: Fundador aprueba antes de deploy a producción

---

## Fase 2 — Equipo Mínimo Viable (al superar $15k/mes en revenue)

**Threshold de activación:** Revenue consistente de $15k/mes por 2 meses.

```
┌─────────────────────────────────────────┐
│       FUNDADOR / CEO · Nivo Partners    │
│     Visión · Estrategia · Ventas Grandes│
└──┬──────────────────┬────────────────┬──┘
   ▼                  ▼                ▼
División I         División II      División III
Director Técnico   Estratega de     Fundador
(Part-time/        Campañas         + IA Tools
Full-time)         (Contratista)
   │
Full-Stack Dev
(Contratista pool)
```

### Roles en Fase 2

| Rol | Tipo | Salary/Fee estimado |
|---|---|---|
| Director Técnico División I | Part-time → Full-time | $2,500–4,000/mes |
| Estratega de Campañas División II | Contratista | $1,500–2,500/proyecto |
| Desarrolladores pool | Contratistas por proyecto | Varía |
| Account Manager (Fase 2 tardía) | Part-time | $1,500–2,000/mes |

---

## Fase 3 — Empresa Escalada (al superar $50k/mes)

**Threshold de activación:** Revenue >$50k/mes por 3 meses.

```
CEO (Fundador) — Visión y Partnerships
       │
   ┌───┴───────────────────┐
   ▼                       ▼
COO (Operaciones)    CTO (Técnico)
       │                   │
  ┌────┴───┐          ┌────┴────┐
  ▼        ▼          ▼         ▼
Ventas   Ops       Div I    Div II/III
Team     Team      Team     Team
```

En esta fase se considera:

- Documentar como **Series LLC** o mantener LLC con 3 DBAs activos
- Contratar primer empleado a tiempo completo (no contratista)
- HQ físico opcional (coworking en primera instancia)

---

## Matriz de Decisión para Contratar

Antes de agregar a cualquier persona al equipo, responde estas 4 preguntas:

| Pregunta | Si la respuesta es NO |
|---|---|
| ¿Esta función está documentada en un SOP? | Documéntala primero. No contrates para algo que no sabes cómo hacer tú. |
| ¿Tienes el revenue para pagar 3 meses sin nuevos clientes? | Espera. |
| ¿Esta persona amplía tu capacidad o reemplaza algo que no deberías hacer tú? | Si reemplaza → prioridad alta. Si amplía → espera a tener el flujo. |
| ¿Tienes un contrato de work-for-hire claro? | Nunca trabajes sin contrato firmado. |

---

## Protocolos de Trabajo con Contratistas

### Reglas No Negociables

1. **Todo trabajo = contrato firmado.** Sin excepciones. Un DM de "sí, te ayudo" no es un acuerdo.
2. **IP es de Nivo.** Todo lo producido por contratistas para clientes de Nivo es propiedad de Nivo Partners, LLC. (Ver cláusula en contratos.)
3. **Accesos temporales.** Se dan al inicio, se revocan en el delivery. Nunca acceso permanente a cuentas de producción.
4. **Pago por hitos.** Divide el pago en al menos 2 partes: 50% al inicio, 50% en entrega aprobada.
5. **Sin contacto directo con el cliente.** El contratista no habla con el cliente final. Todo pasa por el fundador.

---

## KPIs Organizacionales por Fase

| KPI | Phase 0 (Hoy) | Phase 1 | Phase 2 |
|---|---|---|---|
| Revenue mensual | $0–$10k | $10k–$25k | $25k–$50k |
| Clientes activos | 1–3 | 4–8 | 8–15 |
| Headcount | 1 (Fundador) | 2–3 | 5–8 |
| Tiempo del fundador en ventas | 60% | 40% | 25% |
| Proyectos en paralelo | 1–2 | 3–5 | 5–10 |

---

*Documento: Feb 2026 — Actualizar al pasar de fase.*
