const { GoogleGenAI } = require('@google/genai');
const { Resend } = require('resend');
const { readFileSync } = require('fs');
const { join } = require('path');

// ============================================================
// INITIALIZE EXTERNAL SERVICES
// ============================================================
const resend = new Resend(process.env.RESEND_API_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ============================================================
// LOAD KAI'S KNOWLEDGE BASE AT COLD START (Cached in memory)
// ============================================================
let KAI_KNOWLEDGE_BASE = '';
try {
    const kbPath = join(process.cwd(), 'notebooklm', '08_Kai_Knowledge_Base.md');
    KAI_KNOWLEDGE_BASE = readFileSync(kbPath, 'utf-8');
    console.log('[KAI BOOT] Knowledge Base loaded successfully.');
} catch (err) {
    console.error('[KAI BOOT] Failed to load Knowledge Base:', err.message);
    KAI_KNOWLEDGE_BASE = 'You are Kai, Lead Strategist at Nivo Partners, a digital infrastructure firm based in Tampa, Florida.';
}

// ============================================================
// KAI SYSTEM PROMPT — THE SOVEREIGN ARCHITECT PERSONA
// ============================================================
const KAI_SYSTEM_PROMPT = `
You are **Kai**, the Lead Knowledge Interface and Principal Strategist of Nivo Partners.

## CORE PERSONA RULES
- You are authoritative, consultative, and precise. Never robotic or generic.
- You respond in the SAME LANGUAGE the user writes in (English → English, Spanish → Spanish).
- Keep responses concise: 2-4 sentences max for most replies.
- Always end with a clear next action or question to advance the conversation.
- NEVER hallucinate services, prices, or timelines not in the Knowledge Base below.
- NEVER provide specific pricing numbers. Route all pricing to the Strategy Audit.
- NEVER guarantee financial ROI (FDUTPA compliance).

## WHAT YOU KNOW ABOUT NIVO PARTNERS
${KAI_KNOWLEDGE_BASE}

## ESCALATION PROTOCOL
If a question is completely outside Nivo Partners' scope (personal advice, weather, unrelated topics):
- Respond with: "That falls outside my operational scope. However, I can analyze your digital infrastructure — which area should we explore?"
- Note: the frontend will detect this phrase and show the escalation button.

## RESPONSE FORMAT
Always answer naturally. Do not use headers or bullet lists unless explaining multiple items. Be direct.
`;

// ============================================================
// MAIN HANDLER
// ============================================================
module.exports = async function handler(req, res) {
    // Add CORS headers FIRST — before any method checks
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle Preflight Request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const { userMessage, sessionId, lang = 'en' } = req.body;

        if (!userMessage || userMessage.trim().length === 0) {
            return res.status(400).json({ error: 'Missing user message.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.warn('[KAI] Missing GEMINI_API_KEY — returning fallback response.');
            return res.status(200).json({
                reply: lang === 'es'
                    ? 'Mi núcleo cognitivo está siendo configurado. Por favor, continúa por el Asistente de Arquitectura.'
                    : 'My cognitive core is being configured. Please proceed through the Architecture Wizard.',
                escalated: false
            });
        }

        const { reply, isOutOfScope } = await callGemini(userMessage, lang);

        if (isOutOfScope) {
            triggerSilentTelemetryAlert(userMessage, sessionId).catch(err => {
                console.error('[TELEMETRY] Alert failed silently:', err.message);
            });
        }

        return res.status(200).json({ reply, escalated: isOutOfScope });

    } catch (error) {
        console.error('[KAI] Handler error:', error.message);
        return res.status(500).json({
            error: 'Neural link interrupted.',
            details: error.message
        });
    }
};

// ============================================================
// GEMINI 1.5 FLASH INVOCATION (New @google/genai SDK - API v1)
// ============================================================
async function callGemini(userMessage, lang = 'en') {
    const langHint = lang === 'es'
        ? '[SYSTEM: User is writing in Spanish. Respond fully in Spanish.]\n\n'
        : '';

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: langHint + userMessage,
        config: {
            systemInstruction: KAI_SYSTEM_PROMPT,
            maxOutputTokens: 300,
            temperature: 0.7,
        }
    });

    const responseText = response.text.trim();

    const oosSignals = [
        'outside my operational scope',
        'fuera de mi alcance operativo',
        'falls outside',
        'cae fuera'
    ];
    const isOutOfScope = oosSignals.some(signal =>
        responseText.toLowerCase().includes(signal.toLowerCase())
    );

    return { reply: responseText, isOutOfScope };
}

// ============================================================
// SILENT TELEMETRY ALERT (OOS Event Logger)
// ============================================================
async function triggerSilentTelemetryAlert(unmappedInput, sessionId = 'UNKNOWN') {
    const timestamp = new Date().toISOString();

    if (!process.env.RESEND_API_KEY) {
        console.warn('[TELEMETRY] No RESEND_API_KEY set. Alert skipped.');
        return;
    }

    const emailHtml = `
        <div style="font-family: monospace; padding: 20px; background-color: #111827; color: #f3f4f6; border: 1px solid #dc2626;">
            <h2 style="color: #ef4444;">[KAI TELEMETRY] Out-of-Scope Query Alert</h2>
            <p><strong>SYSTEM ALERT:</strong> Kai detected a user query outside the current Knowledge Base scope.</p>
            <div style="background-color: #1f2937; padding: 15px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <strong>User Input:</strong><br/><br/>
                "${unmappedInput.replace(/</g, "&lt;").replace(/>/g, "&gt;")}"
            </div>
            <p><strong>Session ID:</strong> ${sessionId}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
        </div>
    `;

    const { error } = await resend.emails.send({
        from: 'Kai Telemetry <system@nivopartners.com>',
        to: 'contact@nivopartners.com',
        subject: '[KAI OOS ALERT] New unmapped query — Nivo Partners',
        html: emailHtml
    });

    if (error) throw new Error(`Resend API Error: ${error.message}`);
    console.log(`[TELEMETRY LOGGED] OOS event captured for session: ${sessionId}`);
}
