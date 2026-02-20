const { GoogleGenAI } = require('@google/genai');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const report = {
        timestamp: new Date().toISOString(),
        sdk: '@google/genai (new)',
        env: {
            GEMINI_API_KEY: process.env.GEMINI_API_KEY
                ? `SET (starts with: ${process.env.GEMINI_API_KEY.substring(0, 8)}...)`
                : 'MISSING ❌',
            RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET ✅' : 'MISSING ❌',
        },
        gemini_test: null,
        error: null
    };

    if (process.env.GEMINI_API_KEY) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: 'Say "OK" in one word.',
            });
            report.gemini_test = response.text.trim();
        } catch (err) {
            report.error = err.message;
        }
    }

    return res.status(200).json(report);
};
