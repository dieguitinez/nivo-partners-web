# ⚡ EBS 03: Plan de Acción — Primeros 7 Días (Costo $0)

**Objetivo:** Tener la máquina de ingresos (Proyecto Trinity-Alpha) funcionando y con los primeros leads en 1 semana.

---

## 📅 Día 1: El Nicho y la Identidad

*No busques el nicho perfecto, busca el que ya tiene dinero.*

1. **Elegir Nicho:** Escoger entre **Med-Spas Premium** o **Abogados de Inmigración**.
2. **Naming:** No necesitas un dominio nuevo aún. Usa un subdominio de Nivo (ej: `audit.nivopartners.com`) o un dominio gratis de Vercel.
3. **Hook:** Definir la oferta: "Auditoría de Fuga de Ingresos mediante IA" (Gratis).

## 📅 Día 2: La Terminal de Captura (Vercel)

1. **Clonar Landing:** Usar un template minimalista de Vercel.
2. **Formulario:** Crear un formulario simple (URL + Email).
3. **Conexión:** Conectar el formulario a un **Webhook de n8n**.

## 📅 Día 3: El Flujo Automatizado (n8n)

*Aquí es donde yo te puedo ayudar más.*

1. **Trigger:** n8n recibe los datos del formulario.
2. **Scraper:** Nodo de n8n para leer el sitio del cliente.
3. **IA Logic:** Nodo de Gemini Pro pidiéndole: "Analiza este sitio y encuentra 3 errores que le hacen perder dinero. Escribe un reporte formal."
4. **Email:** Nodo de Resend para enviar el reporte automáticamente al cliente.

## 📅 Día 4: El "Cold Audit" (Prospección Activa)

*No esperes a que lleguen, ve por ellos.*

1. **Lista de Prospectos:** Buscar 50 negocios del nicho en Google Maps (Place API).
2. **Auditoría Masiva:** Hacer que n8n corra el flujo del Día 3 para estos 50 negocios SIN que ellos lo pidan aún.
3. **Envío en Frío:** Mandar un email: "Hola [Nombre], he analizado tu sitio y he encontrado [Error]. Te adjunto la auditoría completa que hice con mi IA. ¿Hablamos?"

## 📅 Día 5 al 7: Gestión de Respuestas y Cierre

1. **Seguimiento:** Si no responden en 48h, n8n manda un segundo email automático.
2. **Llamadas:** Agendar a los interesados en tu Calendly.
3. **Venta:** En la llamada, no vendes "software", vendes "Yo arreglo estos 3 errores por [Precio] y te instalo Kai para que no pierdas más leads".

---

## 🛠️ Tu "To-Do List" Inmediata (Hoy mismo)

- [ ] Confirma el nicho: ¿**Med-Spas** o **Abogados**?
- [ ] Pásame la URL donde quieres la landing o si quieres que usemos una sub-página de Nivo.
- [ ] Asegúrate de tener tu **API Key de Gemini** a la mano.

---

> [!IMPORTANT]
> **Tu única tarea hoy:** Decidir el nicho. El resto lo podemos automatizar juntos en las próximas horas.
