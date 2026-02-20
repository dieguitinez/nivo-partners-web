const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const report = {
        timestamp: new Date().toISOString(),
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
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
            const result = await model.generateContent('Say "OK" in one word.');
            report.gemini_test = result.response.text().trim();
        } catch (err) {
            report.error = err.message;
        }
    }

    return res.status(200).json(report);
};
