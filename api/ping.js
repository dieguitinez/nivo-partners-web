import { GoogleGenerativeAI } from '@google/generative-ai';
import { setSecurityHeaders, sanitize, getValidatedOrigin, isRateLimited, captureException } from './utils/security.js';

export default async function handler(req, res) {
    // Phase 0: Security Headers
    setSecurityHeaders(req, res);

    // Rate Limiting
    if (isRateLimited(req)) {
        return res.status(429).json({ error: 'Too many requests.' });
    }

    if (!getValidatedOrigin(req)) return res.status(403).json({ error: 'Access Denied.' });

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({ error: 'GEMINI_API_KEY not set' });
    }

    const report = {
        timestamp: new Date().toISOString(),
        sdk: '@google/genai (new)',
        env: {
            GEMINI_API_KEY: `SET (starts with: ${process.env.GEMINI_API_KEY.substring(0, 8)}...)`,
        },
        models_tested: {},
        listModels: null,
        listModels_error: null
    };

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Test multiple model names in parallel
    const modelsToTest = [
        'gemini-2.5-flash',
        'gemini-2.5-flash-preview-04-17',
        'gemini-2.0-flash-lite',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-3-flash-preview'
    ];

    await Promise.all(modelsToTest.map(async (model) => {
        try {
            const response = await ai.models.generateContent({
                model,
                contents: 'Say "OK".',
            });
            report.models_tested[model] = `✅ OK: ${response.text.trim()}`;
        } catch (err) {
            captureException(err); // Added captureException
            const code = err.message.includes('404') ? '404' :
                err.message.includes('429') ? '429' :
                    err.message.includes('400') ? '400' : 'ERR';
            report.models_tested[model] = `❌ ${code}: ${err.message.substring(0, 120)}`;
        }
    }));

    // Also try to list available models
    try {
        const models = ai.models.list();
        const names = [];
        for await (const m of models) {
            if (m.name) names.push(m.name);
            if (names.length >= 20) break;
        }
        report.listModels = names;
    } catch (e) {
        captureException(e); // Added captureException
        report.listModels_error = e.message.substring(0, 200);
    }

    return res.status(200).json(report);
};
