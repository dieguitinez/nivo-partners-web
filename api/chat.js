import { GoogleGenerativeAI } from '@google/generative-ai';
import { Resend } from 'resend';
import { setSecurityHeaders, sanitize, getValidatedOrigin, isRateLimited, captureException } from './utils/security.js';

// ============================================================
// KAI COMPACT SYSTEM PROMPT (hardcoded for reliability)
// ============================================================
const KAI_SYSTEM_PROMPT = `You are Kai, Lead Strategist and Senior Digital Architect at Nivo Partners.
We are a high-end Computer Systems Design firm engineering sovereign digital infrastructure. (Not a marketing agency — we engineer systems.)

IDENTITY: Authoritative, consultative, concise. You represent "The Aesthetic of Trust."
PHRASING: No robotic fluff. 2–3 sentences per reply max. Always guide toward a Strategy Audit.
DIALECT: Professional, sovereign, technically sophisticated — but accessible. Never intimidate.

THE 3 NIVO DIVISIONS (Your Knowledge Base):
1. DIGITAL AUTHORITY: We engineer high-performance, secure web systems built on certified enterprise-grade platforms. Fast, mobile-native, and fully owned by the client.
2. REVENUE ENGINE: Precision paid-acquisition systems powered by AI and proprietary research protocols. We engineer market dominance, not ad campaigns.
3. INTELLIGENT ECOSYSTEM: Custom AI agents, intelligent automation pipelines, and smart operational systems that eliminate operational fatigue and scale without headcount.

SOVEREIGNTY RULE: The client ALWAYS owns their data, code, and infrastructure. We engineer and install systems — we never rent or lock clients in.

CRITICAL CONFIDENTIALITY RULE — NEVER VIOLATE:
- DO NOT mention specific technology platforms, tools, software vendors, or service names (e.g., do NOT say Vercel, Supabase, GCP, n8n, Cloudflare, or any other specific tool name) in any chat conversation.
- Instead, use terms like: "certified infrastructure", "authorized enterprise platforms", "platforms that comply with industry standards", "compliant hosting", "enterprise-grade automation", "our proprietary stack".
- Specific technology recommendations are ONLY disclosed during official Strategy Audit sessions — never in pre-qualification chat.
- If a user asks what specific tools or platforms you use, respond that all infrastructure is built on "authorized, enterprise-certified platforms" and invite them to a Strategy Audit where the full architecture is presented.

LEGAL/COMPLIANCE:
- FDUTPA: NEVER guarantee financial ROI. Use "projections" or "audit analysis."
- FIPA: All data is bank-grade encrypted and compliant with Florida Information Protection Act.
- CONTACT: contact@nivopartners.com | Strategy audit: #apply

SCOPE RULE: If someone asks about topics completely unrelated to digital infrastructure, web systems, marketing, or automation, politely redirect them. Do NOT engage off-topic.

LANGUAGE: Respond in the EXACT same language as the user writes in (Spanish/English/other). Detect automatically.`;

// ============================================================
// HANDLER
// ============================================================
export default async function handler(req, res) {
    // Phase 0: Security Headers
    setSecurityHeaders(req, res);
    if (!getValidatedOrigin(req)) {
        // We still allow the request to proceed for now to avoid breaking deployments, 
        // but strictly enforced browsers will block it due to missing CORS header.
        // For higher security, we could return 403 here.
    }

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed.' });

    let { userMessage, sessionId, lang = 'en' } = req.body || {};

    if (typeof userMessage !== 'string' || !userMessage.trim()) {
        return res.status(400).json({ error: 'Missing user message.' });
    }

    // Phase 1: Sanitization
    userMessage = sanitize(userMessage);

    if (!process.env.GEMINI_API_KEY) {
        console.warn('[KAI] GEMINI_API_KEY is missing from environment');
        return res.status(200).json({
            reply: lang === 'es'
                ? 'Configurando mi núcleo cognitivo. Para asistencia inmediata, contacta a contact@nivopartners.com'
                : 'Configuring my cognitive core. For immediate assistance, contact contact@nivopartners.com',
            escalated: false
        });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // CAScada de alta disponibilidad para Google AI Studio (Actualizado 2026)
    const cascadeModels = [
        "gemini-2.5-flash",        // Primario: velocidad máxima — respuesta < 2s
        "gemini-2.5-pro",          // Respaldo 1: razonamiento profundo si Flash falla
        "gemini-3-flash-preview",  // Respaldo 2: velocidad frontier (preview)
        "gemini-3.1-pro-preview"   // Respaldo 3: vanguardia — sólo si todo lo anterior falla
    ];

    const langPrefix = lang === 'es'
        ? 'INSTRUCCIÓN ACTIVA: Responde SIEMPRE en español.\n\n'
        : 'ACTIVE INSTRUCTION: Respond in English.\n\n';

    const chatSequenceContents = [
        {
            role: 'user',
            parts: [{ text: KAI_SYSTEM_PROMPT + '\n\n' + langPrefix + 'Status Check: Acknowledge your persona and service pillars.' }]
        },
        {
            role: 'model',
            parts: [{
                text: lang === 'es'
                    ? 'Entendido. Soy Kai, Estratega Principal de Nivo Partners. Operativo bajo los 3 pilares de infraestructura.'
                    : 'Understood. I am Kai, Lead Strategist at Nivo Partners. Operational across the 3 infrastructure pillars.'
            }]
        },
        {
            role: 'user',
            parts: [{ text: userMessage }]
        }
    ];

    let responseText = null;
    let lastError = null;
    let successfulModelName = null;

    for (const modelName of cascadeModels) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            
            // High-precision chat sequence
            const result = await model.generateContent({
                contents: chatSequenceContents
            });

            responseText = result.response.text().trim();
            successfulModelName = modelName;
            console.log(`[KAI] Response generated successfully using: ${successfulModelName}`);
            
            break; // Rompe el loop si tenemos una respuesta exitosa
        } catch (error) {
            console.warn(`[KAI CASCADE] Fallo en el nodo ${modelName}. Rotando al siguiente respaldo... Detalles: ${error.message}`);
            lastError = error;
            // Solo continuamos intentando en el loop
        }
    }

    if (responseText) {
        // Fallback or cascade succeeded
        try {
            // OOS Detection
            const oosSignals = ['outside my operational scope', 'fuera de mi alcance', 'falls outside', 'cae fuera', 'not programmed to', 'no puedo ayudar'];
            const isOutOfScope = oosSignals.some(s => responseText.toLowerCase().includes(s));

            if (isOutOfScope) {
                await fireTelemetry(userMessage, sessionId);
            }

            // Intent detection: Audit / Wizard Suggestions
            const auditSignals = ['auditoría', 'audit', 'wizard', 'formulario', 'asistente', 'solicitud', 'audit request', 'wizard'];
            const triggerAudit = auditSignals.some(s => responseText.toLowerCase().includes(s));

            return res.status(200).json({
                reply: responseText,
                escalated: isOutOfScope,
                triggerAudit: triggerAudit
            });
        } catch (postError) {
             console.error('[KAI] OOS/Intent detection failure after successful model execution:', postError);
             return res.status(200).json({ reply: responseText, escalated: false, triggerAudit: false });
        }
    } else {
        // Full Cascade Collapse (All 4 models failed)
        captureException(lastError, { sessionId, lang });
        console.error('[KAI TOTAL COLLAPSE] Todos los nodos fallaron. Último error:', lastError);

        const errorStr = lastError ? lastError.message.toLowerCase() : '';
        const isQuotaError = errorStr.includes('429') || errorStr.includes('quota') || errorStr.includes('exhausted');

        let fallback = '';
        if (isQuotaError) {
            fallback = lang === 'es'
                ? 'Mis sistemas cognitivos están en mantenimiento temporal (Límite de capacidad alcanzado). Por favor, escríbenos directamente a contact@nivopartners.com para programar tu Auditoría.'
                : 'My cognitive systems are undergoing temporary maintenance (Capacity limit reached). Please email us directly at contact@nivopartners.com to schedule your Audit.';
        } else {
            fallback = lang === 'es'
                ? 'Estoy procesando una alta carga de consultas en este momento. Para asistencia estratégica inmediata, escríbenos a contact@nivopartners.com'
                : 'I\'m currently handling high query volume. For immediate strategic assistance, email us at contact@nivopartners.com';
        }

        return res.status(200).json({ reply: fallback, escalated: false });
    }
}

// ============================================================
// SILENT TELEMETRY
// ============================================================
async function fireTelemetry(query, sessionId) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return;
    try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
            from: 'Kai AI | Telemetry <system@send.nivopartners.com>',
            to: 'contact@nivopartners.com',
            subject: `OOS Inquiry: ${query.substring(0, 30)}...`,
            html: `<p><strong>Query:</strong> ${query}</p><p><strong>Session:</strong> ${sessionId || 'unknown'}</p><p><strong>Time:</strong> ${new Date().toISOString()}</p>`
        });
    } catch (e) {
        console.warn('[TELEMETRY] Failed silently:', e.message);
    }
}
