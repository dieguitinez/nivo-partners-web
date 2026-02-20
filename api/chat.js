import { GoogleGenerativeAI } from '@google/generative-ai';
import { Resend } from 'resend';

// ============================================================
// KAI COMPACT SYSTEM PROMPT (hardcoded for reliability)
// ============================================================
const KAI_SYSTEM_PROMPT = `You are Kai, Lead Strategist at Nivo Partners — a sovereign digital infrastructure firm in Tampa, Florida.

PERSONA: Authoritative, consultative, concise. Never robotic. 2-3 sentences max per reply. Always end with a question or next step.

LANGUAGE RULE: Respond in the SAME language the user writes. Spanish → Spanish. English → English.

WHAT WE DO (3 Pillars):
1. DIGITAL INFRASTRUCTURE: We build sovereign web stacks (Vercel + Supabase + Cloudflare) for B2B businesses. Not templates — custom architecture.
2. TRAFFIC & MARKETING: AI-driven "Traffic Amplification Protocols" with micro-spend validation. We use AI-generated video assets. No ROI guarantees (FDUTPA compliance).
3. AUTOMATION & IDP: Intelligent Document Processing pipelines — we process PDFs, invoices, CRM exports into actionable intelligence.

PRICING RULE: NEVER give prices. Route to Strategy Audit always.

SCOPE RULE: If question is completely off-topic (personal, weather, etc.), respond: "That falls outside my operational scope. I can analyze your digital infrastructure — which pillar interests you?"

CONTACT: contact@nivopartners.com | Tampa, Florida | FIPA compliant`;

// ============================================================
// HANDLER
// ============================================================
export default async function handler(req, res) {
    // CORS configuration for local and wide access
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed.' });

    const { userMessage, sessionId, lang = 'en' } = req.body || {};

    if (!userMessage || !userMessage.trim()) {
        return res.status(400).json({ error: 'Missing user message.' });
    }

    if (!process.env.GEMINI_API_KEY) {
        console.warn('[KAI] GEMINI_API_KEY is missing from environment');
        return res.status(200).json({
            reply: lang === 'es'
                ? 'Configurando mi núcleo cognitivo. Para asistencia inmediata, contacta a contact@nivopartners.com'
                : 'Configuring my cognitive core. For immediate assistance, contact contact@nivopartners.com',
            escalated: false
        });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using Gemini 2.5 Flash as per Master Agent Context requirements
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const langPrefix = lang === 'es'
            ? 'INSTRUCCIÓN ACTIVA: Responde SIEMPRE en español.\n\n'
            : 'ACTIVE INSTRUCTION: Respond in English.\n\n';

        // High-precision chat sequence
        const result = await model.generateContent({
            contents: [
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
            ]
        });

        const responseText = result.response.text().trim();

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

    } catch (error) {
        console.error('[KAI ERROR]', error.message);

        // Soft fallback if model name fails (retry with 1.5 if 2.5 is unavailable in certain deployments)
        if (error.message.includes('model not found') || error.message.includes('404')) {
            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
                const result = await model.generateContent(userMessage);
                return res.status(200).json({ reply: result.response.text().trim(), escalated: false });
            } catch (e2) {
                console.error('[KAI EMERGENCY FALLBACK FAILED]', e2.message);
            }
        }

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
