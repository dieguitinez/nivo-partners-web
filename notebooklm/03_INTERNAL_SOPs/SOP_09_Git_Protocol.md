# 🛠️ SOP 09 — Protocolo de Gestión de Código Soberano (Git & GitHub)

**Versión:** 1.0 — Feb 2026
**Propósito:** Estandarizar el flujo de trabajo de Git para garantizar que cada cambio en la infraestructura sea rastreable, seguro y active correctamente el despliegue en Vercel.

---

## 🏛️ Filosofía de Git en Nivo

En Nivo Partners, tratamos el código como **Infraestructura Crítica**. Git no es solo para "guardar" archivos; es el sistema de control que garantiza la **Soberanía Digital** del cliente y la nuestra.

---

## 1. Comandos Esenciales (Flujo Diario)

Para subir cambios al repositorio de GitHub (`dieguitinez/nivo-partners-web` o el repositorio del cliente), sigue este flujo estrictamente:

### A. Preparación (Status Check)

Antes de nada, verifica qué archivos han cambiado.

```powershell
git status
```

### B. Indexación (Staging)

Agrega solo los archivos que son parte de la tarea actual. Evita `git add .` si hay archivos temporales o de configuración sensible.

```powershell
git add [nombre-del-archivo]
# O para todos los archivos con cambios confirmados:
git add -A
```

### C. Confirmación (Commit)

Los mensajes de commit deben ser descriptivos y seguir el estilo de Nivo (Ver sección 2).

```powershell
git commit -m "feat(chat): integrar kai en todas las páginas de servicio"
```

### D. Despliegue (Push)

Al hacer push a `main`, Vercel iniciará automáticamente el build de producción.

```powershell
git push origin main
```

---

## 2. Estándares de Mensajes (Commit Styles)

Nivo utiliza una versión simplificada de *Conventional Commits* para que el historial sea legible para humanos e IAs.

| Prefijo | Uso | Ejemplo |
| :--- | :--- | :--- |
| `feat:` | Nueva característica o sección | `feat: añadir modal de auditoría` |
| `fix:` | Corrección de un error/bug | `fix: ruta de avatar en subpáginas` |
| `docs:` | Cambios solo en documentación (notebooklm) | `docs: actualizar sop de git` |
| `style:` | Cambios visuales (CSS/Layout) sin afectar lógica | `style: ajustar blur de glassmorphism` |
| `refactor:` | Mejora de código sin cambiar funcionalidad | `refactor: limpiar fetch de chat.js` |

---

## 3. GitOps & Despliegue Automático

Nivo Partners utiliza **Vercel** como motor de despliegue.

- **Branch `main`**: Es sagrada. Cada push aquí es un despliegue a **PRODUCCIÓN**.
- **Pre-flight Check**: Antes de hacer push, verifica localmente que no haya errores de sintaxis en JS o links rotos en HTML.

---

## 4. Seguridad y Soberanía (.gitignore)

Nunca, bajo ninguna circunstancia, se deben subir estos archivos al repositorio:

- `.env` (Contiene GEMINI_API_KEY, SUPABASE_KEY, etc.)
- `node_modules/`
- Archivos temporales de sistema (`.DS_Store`)

Verifica siempre tu archivo `.gitignore` antes del primer push en un proyecto nuevo.

---

## 5. Transferencia de Propiedad (GitHub)

Cuando el proyecto se marca como **"Delivered"** (Ver [`ONBOARD_04`](../02_CLIENT_ONBOARDING/ONBOARD_04_Delivery_Protocol.md)):

1. El repositorio se transfiere a la cuenta personal del cliente.
2. Nivo Partners queda como colaborador con acceso de escritura para mantenimiento (si hay retainer).

---

*Documento creado por AntiGravity AI para garantizar la continuidad del conocimiento — Feb 21, 2026*
