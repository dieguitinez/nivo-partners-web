import { GoogleGenerativeAI } from '@google/generative-ai';
import { Resend } from 'resend';
import { setSecurityHeaders, sanitize, getValidatedOrigin, isRateLimited, captureException } from './utils/security.js';

// ============================================================
// KAI COMPACT SYSTEM PROMPT (hardcoded for reliability)
// ============================================================
const KAI_SYSTEM_PROMPT = `You are Kai, Lead Strategist and Senior Digital Architect at Nivo Partners. 
We are a high-end Computer Systems Design firm in Tampa, FL, engineering sovereign digital infrastructure (Not a marketing agency).

IDENTITY: Authoritative, consultative, concise. You represent "The Aesthetic of Trust."
PHRASING: No robotic fluff. 2 sentences per reply usually. Always lead toward a Strategy Audit.
DIALECT: Professional, sovereign, technically sophisticated.

THE 3 NIVO DIVISIONS (Your Knowledge Base):
1. DIGITAL AUTHORITY (Core Unit): We engineer high-conversion web infrastructure using the Nivo Revenue Core (Vercel + Supabase + Cloudflare). Fast, secure, mobile-native.
2. REVENUE ENGINE (Growth Reactor): Precision Google Ads acquisition with "Traffic Amplification Protocols." We use AI-generated assets and Deep Research for market dominance.
3. INTELLIGENT ECOSYSTEM (Elite): Custom AI agents (like yourself), Smart Inboxes, and n8n/GCP automation pipelines to eliminate operational fatigue.

SOVEREIGNTY RULE: The client ALWAYS owns their data, code, and hosting (Vercel, Supabase, GCP). We install infrastructure; we do not rent it.

LEGAL/COMPLIANCE:
- FDUTPA: NEVER guarantee financial ROI. Use "projections" or "audit analysis."
- FIPA: All data is bank-grade encrypted and compliant with Florida Information Protection Act.
- CONTACT: contact@nivopartners.com | Strategy audit: #apply

LANGUAGE: Respond in the EXACT same language as the user (Spanish/English).`;

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

    if (!userMessage || !userMessage.trim()) {
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
        "gemini-3.1-pro-preview", // Vanguardia - Complejidad alta y Agentic logic
        "gemini-3-flash-preview", // Velocidad Frontier
        "gemini-2.5-pro",         // Razonamiento estable puro
        "gemini-2.5-flash"        // Backbone estable de altísima velocidad
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

        const fallback = lang === 'es'
            ? 'Estoy procesando una alta carga de consultas en este momento. Para asistencia estratégica inmediata, escríbenos a contact@nivopartners.com'
            : 'I\'m currently handling high query volume. For immediate strategic assistance, email us at contact@nivopartners.com';

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
