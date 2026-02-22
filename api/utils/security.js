/**
 * NIVO PARTNERS | API SECURITY UTILITY
 * Standardized sanitization and origin validation for serverless functions.
 */

const ALLOWED_ORIGINS = [
    'https://nivopartners.com',
    'https://www.nivopartners.com',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:5173',
];

// Simple in-memory cache for basic rate limiting (Note: Limited effectiveness in Serverless)
const ipCache = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

/**
 * Validates the request origin against a whitelist.
 * Returns the allowed origin string or null if rejected.
 */
export function getValidatedOrigin(req) {
    const origin = req.headers.origin;

    // 1. Allow if it's on the whitelist
    if (ALLOWED_ORIGINS.includes(origin)) return origin;

    // 2. Allow Vercel preview deployments (ending in .vercel.app)
    if (origin && origin.endsWith('.vercel.app')) return origin;

    // 3. Reject otherwise
    return null;
}

/**
 * Standard CORS headers setup.
 */
export function setSecurityHeaders(req, res) {
    const allowedOrigin = getValidatedOrigin(req);

    if (allowedOrigin) {
        res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    } else {
        // If it's a browser request (has origin) but not allowed, 
        // we strictly don't set the header, effectively blocking it.
        // If it's a server-to-server request (no origin), we might allow it 
        // depending on the policy, but for web-facing APIs, Origin is expected.
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
}

/**
 * Deep sanitization for user-provided strings.
 * Removes HTML tags and potential script injections.
 */
export function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .trim()
        .replace(/<[^>]*>?/gm, '') // Remove HTML tags
        .replace(/[<>\"\'\&\/]/g, function (s) { // Escape special characters
            const entityMap = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '&': '&amp;',
                '/': '&#47;'
            };
            return entityMap[s];
        });
}

/**
 * Basic rate limiting check.
 * Strictly educational in serverless unless paired with KV/Redis.
 */
export function isRateLimited(req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();

    if (!ipCache.has(ip)) {
        ipCache.set(ip, { count: 1, firstRequest: now });
        return false;
    }

    const entry = ipCache.get(ip);
    if (now - entry.firstRequest > RATE_LIMIT_WINDOW) {
        entry.count = 1;
        entry.firstRequest = now;
        return false;
    }

    entry.count++;
    return entry.count > MAX_REQUESTS;
}

/**
 * Validates required fields in a request body.
 */
export function validateBody(body, requiredFields) {
    if (!body || typeof body !== 'object') return false;
    return requiredFields.every(field => body[field] && String(body[field]).trim().length > 0);
}
