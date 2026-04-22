import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { setSecurityHeaders } from './utils/security.js';

/**
 * NIVO PARTNERS | System Health Check Endpoint
 * GET /api/health
 *
 * Verifica el estado de todos los subsistemas críticos:
 *   1. Variables de entorno requeridas
 *   2. Conectividad con Supabase (ping real)
 *   3. Validez de la API Key de Resend
 *
 * Seguro para uso con UptimeRobot y monitores externos.
 * NO expone valores de las variables, solo su estado (SET/MISSING).
 */

// Subsistemas a validar
const REQUIRED_ENV_VARS = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'RESEND_API_KEY',
];

export default async function handler(req, res) {
    setSecurityHeaders(req, res);

    // Solo GET permitido para este endpoint
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed. Use GET.' });
    }

    const startTime = Date.now();
    const checks = {};
    let overallStatus = 'healthy';

    // ─────────────────────────────────────────────────────────
    // CHECK 1: Variables de Entorno
    // ─────────────────────────────────────────────────────────
    const envCheck = {};
    let missingVars = [];

    for (const varName of REQUIRED_ENV_VARS) {
        const isSet = !!process.env[varName];
        envCheck[varName] = isSet ? 'SET' : 'MISSING ⚠️';
        if (!isSet) missingVars.push(varName);
    }

    // NEXT_PUBLIC_SUPABASE_URL es un alias aceptable
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    if (supabaseUrl && !process.env.SUPABASE_URL) {
        envCheck['SUPABASE_URL'] = 'SET (via NEXT_PUBLIC_SUPABASE_URL)';
        missingVars = missingVars.filter(v => v !== 'SUPABASE_URL');
    }

    checks.environment = {
        status: missingVars.length === 0 ? 'ok' : 'degraded',
        variables: envCheck,
        missing: missingVars.length > 0 ? missingVars : undefined,
    };

    if (missingVars.length > 0) overallStatus = 'degraded';

    // ─────────────────────────────────────────────────────────
    // CHECK 2: Supabase — Ping Real
    // ─────────────────────────────────────────────────────────
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        checks.supabase = {
            status: 'skipped',
            reason: 'Missing env vars — cannot initialize client',
        };
    } else {
        const supabaseStart = Date.now();
        try {
            const supabase = createClient(supabaseUrl, supabaseServiceKey);

            // Hacemos un query mínimo: solo pedimos el count de la tabla leads
            const { count, error } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true }); // head:true = no rows, solo count

            const latencyMs = Date.now() - supabaseStart;

            if (error) {
                throw new Error(error.message || JSON.stringify(error));
            }

            checks.supabase = {
                status: 'ok',
                latency_ms: latencyMs,
                leads_count: count,
            };
        } catch (err) {
            checks.supabase = {
                status: 'error',
                error: err.message,
                latency_ms: Date.now() - supabaseStart,
            };
            overallStatus = 'degraded';
        }
    }

    // ─────────────────────────────────────────────────────────
    // CHECK 3: Resend — Validar API Key (sin enviar email)
    // ─────────────────────────────────────────────────────────
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
        checks.resend = {
            status: 'skipped',
            reason: 'RESEND_API_KEY not set',
        };
    } else {
        const resendStart = Date.now();
        try {
            // Llamamos /domains de Resend — endpoint ligero que valida la key
            // sin enviar ningún email real
            const response = await fetch('https://api.resend.com/domains', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            const latencyMs = Date.now() - resendStart;
            const body = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${body.message || body.name || 'Auth failed'}`);
            }

            // Verificamos que el dominio nivopartners.com esté verificado
            const domains = body.data || [];
            const nivoPartnersDomain = domains.find(d =>
                d.name === 'nivopartners.com' && d.status === 'verified'
            );

            checks.resend = {
                status: 'ok',
                latency_ms: latencyMs,
                api_key_valid: true,
                domain_nivopartners_com: nivoPartnersDomain
                    ? `verified ✅ (region: ${nivoPartnersDomain.region})`
                    : 'not found or not verified ⚠️',
                domains_configured: domains.length,
            };

            if (!nivoPartnersDomain) overallStatus = 'degraded';

        } catch (err) {
            checks.resend = {
                status: 'error',
                api_key_valid: false,
                error: err.message,
                latency_ms: Date.now() - resendStart,
            };
            overallStatus = 'degraded';
        }
    }

    // ─────────────────────────────────────────────────────────
    // RESPUESTA FINAL
    // ─────────────────────────────────────────────────────────
    const totalMs = Date.now() - startTime;
    const httpStatus = overallStatus === 'healthy' ? 200 : 503;

    return res.status(httpStatus).json({
        status: overallStatus,
        timestamp: new Date().toISOString(),
        total_check_duration_ms: totalMs,
        service: 'Nivo Partners — Sovereign Infrastructure',
        checks,
    });
}
