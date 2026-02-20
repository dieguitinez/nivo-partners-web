# 🤖 GOV_03 — Carta de Ética de IA y Soberanía de Datos (ES)

**Nivo Partners** | *Compromiso Institucional sobre Inteligencia Artificial*
**Versión:** 1.0 (Feb 2026)

---

## 1. El Principio de No-Explotación (Integridad de Datos)

En Nivo Partners, tratamos la información de nuestros socios como un activo sagrado. Reconocemos que en la era de la IA, los datos son el combustible del dominio de mercado. Por lo tanto:

* **Aislamiento de Modelos:** Los datos de entrenamiento de un Socio, los registros de chat y la información de leads **NUNCA** se usarán para mejorar, entrenar o ajustar modelos compartidos con otros socios o competidores.
* **Propiedad de Pesos:** Si se realiza un ajuste fino (fine-tuning) del modelo para un cliente específico, los pesos resultantes o el adaptador (LoRA) pertenecen exclusivamente al cliente o se encapsulan en su arquitectura soberana.

---

## 2. Transparencia Algorítmica (La Regla "Kai")

La Inteligencia Artificial en Nivo Partners (incluyendo nuestro agente principal, Kai) opera bajo el principio de **Transparencia Operativa**:

1. **Identificación Clara:** El usuario final siempre debe saber si está interactuando con un agente de IA o un arquitecto humano. No permitimos el "Neural Ghosting" (fingir que una IA es humana para engañar).
2. **Explicabilidad:** Todos nuestros bots y agentes deben poder explicar la fuente de su conocimiento cuando se solicite (enlazando de vuelta a la base de conocimientos cargada).
3. **Humano-en-el-Bucle:** Ninguna acción de IA en Nivo Partners con impacto legal o financiero directo (ej. cerrar un contrato o disponer de fondos) se ejecuta sin la validación final de un humano autorizado del Socio.

---

## 3. Arquitectura de Privacidad por Diseño (Cumplimiento FIPA)

Nivo Partners cumple estrictamente con el **Florida Information Protection Act (FIPA)**. Nuestra IA no es una excepción:

* **Anonimización Proactiva:** Antes de enviar datos a LLMs externos (como Gemini u OpenAI) para procesamiento masivo, aplicamos protocolos de limpieza de PII (Personally Identifiable Information) donde el contexto lo permita.
* **Cifrado en Reposo:** Los datos almacenados para la memoria a largo plazo de los agentes (Vector Databases) se cifran con claves gestionadas dentro del entorno del cliente.

---

## 4. Auditoría Continua

Nos comprometemos a realizar auditorías internas trimestrales de nuestros prompts y flujos lógicos para asegurar que no se introduzcan sesgos perjudiciales para el negocio del Socio o la ética de la firma.

---

> *"La IA es una herramienta para la liberación, no para la vigilancia. En Nivo Partners, construimos muros de código para proteger la libertad de nuestros socios."*
> — **Nivo Partners Governance Board**
