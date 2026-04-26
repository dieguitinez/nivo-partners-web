import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { setSecurityHeaders, getValidatedOrigin, isRateLimited, captureException } from './utils/security.js';

export default async function handler(req, res) {
    setSecurityHeaders(req, res);

    // Rate Limiting
    if (isRateLimited(req)) return res.status(429).json({ error: 'Rate limit exceeded.' });

    /* 
    // 🧪 Sentry Verification Trigger (Commented out after successful verification)
    if (req.query.test_error === 'true') {
        const testError = new Error('🧪 NIVO PARTNERS: Sentry Verification Test');
        captureException(testError, { type: 'Manual_Verification' });
        return res.status(500).json({ 
            success: false, 
            message: 'Test error triggered and sent to Sentry.',
            note: 'If you see this, check your Sentry dashboard!' 
        });
    }
    */

    if (!getValidatedOrigin(req)) return res.status(403).json({ error: 'Access Denied.' });

    // Build env status map dynamically — no literal secret-name assignments
    const requiredVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'RESEND_API_KEY'];
    const optionalVars = ['NEXT_PUBLIC_SUPABASE_URL'];
    const envMap = {};
    requiredVars.forEach(v => { envMap[v] = process.env[v] ? '✅ SET' : '❌ MISSING'; });
    optionalVars.forEach(v => { envMap[v] = process.env[v] ? '✅ SET' : '⚪ NOT_SET'; });

    const diag = {
        timestamp: new Date().toISOString(),
        env: envMap,
        supabase: {
            status: 'checking...',
            error: null
        },
        resend: {
            status: 'checking...',
            error: null
        }
    };

    // 1. Check Supabase
    try {
        const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (url && key) {
            const supabase = createClient(url, key);
            // Try to fetch 1 lead from 'leads' table to verify table exists and key works
            const { data, error } = await supabase.from('leads').select('id').limit(1);
            if (error) {
                diag.supabase.status = '❌ TABLE_ERROR';
                diag.supabase.error = error.message;
            } else {
                diag.supabase.status = '✅ OK (leads table accessible)';
            }
        } else {
            diag.supabase.status = '❌ CONFIG_MISSING';
        }
    } catch (e) {
        captureException(e);
        diag.supabase.status = '❌ CRASH';
        diag.supabase.error = e.message;
    }

    // 2. Check Resend (Limited check since we don't want to send real emails)
    try {
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            // We'll just verify the key format or try to fetch domain info if possible
            const { data, error } = await resend.domains.list();
            if (error) {
                diag.resend.status = '❌ API_ERROR';
                diag.resend.error = error.message;
            } else {
                diag.resend.status = '✅ OK (API key valid)';
                diag.resend.domains = data.data.map(d => ({ name: d.name, status: d.status }));
            }
        } else {
            diag.resend.status = '❌ CONFIG_MISSING';
        }
    } catch (e) {
        captureException(e);
        diag.resend.status = '❌ CRASH';
        diag.resend.error = e.message;
    }

    return res.status(200).json(diag);
};
