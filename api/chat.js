const { GoogleGenAI } = require('@google/genai');
const { Resend } = require('resend');

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
module.exports = async function handler(req, res) {
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
        return res.status(200).json({
            reply: lang === 'es'
                ? 'Configurando mi núcleo cognitivo. Para asistencia inmediata, contacta a contact@nivopartners.com'
                : 'Configuring my cognitive core. For immediate assistance, contact contact@nivopartners.com',
            escalated: false
        });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const langPrefix = lang === 'es'
            ? 'INSTRUCCIÓN ACTIVA: Responde SIEMPRE en español.\n\n'
            : 'ACTIVE INSTRUCTION: Respond in English.\n\n';

        // Use multi-turn contents array — proven to work (confirmed by /api/ping)
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: KAI_SYSTEM_PROMPT + '\n\n' + langPrefix + 'Acknowledge your persona briefly.' }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am Kai, Lead Strategist at Nivo Partners. Ready.' }]
                },
                {
                    role: 'user',
                    parts: [{ text: userMessage }]
                }
            ]
        });

        const responseText = response.text.trim();

        const oosSignals = ['outside my operational scope', 'fuera de mi alcance', 'falls outside', 'cae fuera'];
        const isOutOfScope = oosSignals.some(s => responseText.toLowerCase().includes(s));

        if (isOutOfScope) {
            fireTelemetry(userMessage, sessionId);
        }

        // Intent detection: Audit / Wizard Suggestions
        const auditSignals = ['auditoría', 'audit', 'wizard', 'formulario', 'asistente', 'solicitud', 'audit request'];
        const triggerAudit = auditSignals.some(s => responseText.toLowerCase().includes(s));

        return res.status(200).json({
            reply: responseText,
            escalated: isOutOfScope,
            triggerAudit: triggerAudit
        });

    } catch (error) {
        console.error('[KAI ERROR]', error.message);

        // Graceful fallback — never show raw error to user
        const fallback = lang === 'es'
            ? 'Estoy procesando una alta carga de consultas en este momento. Para asistencia estratégica inmediata, escríbenos a contact@nivopartners.com'
            : 'I\'m currently handling high query volume. For immediate strategic assistance, email us at contact@nivopartners.com';

        return res.status(200).json({ reply: fallback, escalated: false });
    }
};

// ============================================================
// SILENT TELEMETRY
// ============================================================
async function fireTelemetry(query, sessionId) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return;
    try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
            from: 'Kai Telemetry <system@nivopartners.com>',
            to: 'contact@nivopartners.com',
            subject: '[KAI OOS] Out-of-scope query detected',
            html: `<p><strong>Query:</strong> ${query}</p><p><strong>Session:</strong> ${sessionId || 'unknown'}</p><p><strong>Time:</strong> ${new Date().toISOString()}</p>`
        });
    } catch (e) {
        console.warn('[TELEMETRY] Failed silently:', e.message);
    }
}
