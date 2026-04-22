import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { setSecurityHeaders, sanitize, getValidatedOrigin, isRateLimited, captureException } from './utils/security.js';

// Initialize Supabase and Resend strictly from Server ENV Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
// Always use Service Role for backend insertion to bypass RLS safely
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

const supabase = (supabaseUrl && supabaseServiceKey) ? createClient(supabaseUrl, supabaseServiceKey) : null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Detailed initialization diagnostics (internal logs only)
console.log(`[INIT] Supabase URL: ${supabaseUrl ? 'SET (' + supabaseUrl.substring(0, 30) + '...)' : 'MISSING'}`);
console.log(`[INIT] Supabase Service Key: ${supabaseServiceKey ? 'SET (length: ' + supabaseServiceKey.length + ')' : 'MISSING'}`);
console.log(`[INIT] Resend API Key: ${resendApiKey ? 'SET' : 'MISSING'}`);
console.log(`[INIT] Supabase Client: ${supabase ? 'ACTIVE' : 'FAILED'}`);
console.log(`[INIT] Resend Client: ${resend ? 'ACTIVE' : 'FAILED'}`);

const getEmailTemplate = (clientName) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Action Required: Nivo Partners Strategy Audit Initiated</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #111827; color: #f3f4f6; }
        .container { max-width: 600px; margin: 40px auto; background-color: #1f2937; border-radius: 8px; border: 1px solid #374151; overflow: hidden; }
        .header { padding: 30px; border-bottom: 1px solid #374151; text-align: left; }
        .header-logo { font-size: 14px; font-weight: 700; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; margin: 0; }
        .header-badge { display: inline-block; padding: 4px 8px; background: rgba(16, 185, 129, 0.1); color: #10b981; font-size: 10px; font-weight: 600; letter-spacing: 1px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.2); margin-top: 8px; }
        .body-content { padding: 40px 30px; font-size: 14px; line-height: 1.6; color: #d1d5db; }
        h1 { font-size: 18px; font-weight: 600; color: #ffffff; margin-top: 0; margin-bottom: 20px; }
        .status-box { background-color: #111827; border: 1px solid #374151; border-left: 3px solid #06b6d4; padding: 15px; border-radius: 4px; margin: 25px 0; }
        .status-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 5px; }
        .status-value { font-size: 14px; font-weight: 600; color: #06b6d4; }
        .footer { padding: 30px; background-color: #111827; border-top: 1px solid #374151; font-size: 12px; color: #6b7280; line-height: 1.5; }
        .signature { margin-top: 30px; font-weight: 500; color: #ffffff; }
        .accent { color: #06b6d4; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="header-logo">NIVO <span class="accent">PARTNERS</span> | System Notification</h2>
            <div class="header-badge">ENCRYPTED TRANSMISSION</div>
        </div>
        <div class="body-content">
            <h1>Audit Request Acknowledged</h1>
            <p>Hello ${clientName},</p>
            <p>This is an automated system confirmation from Nivo Partners. We have securely received your digital infrastructure parameters via the Architecture Wizard.</p>
            
            <div class="status-box">
                <div class="status-label">Current Node Status</div>
                <div class="status-value">Audit in Queue.</div>
            </div>

            <p>Our engineering and strategy team is currently processing your data. We are evaluating your current web architecture, traffic amplification potential, and internal data processing bottlenecks.</p>
            
            <p>In accordance with the Florida Information Protection Act (FIPA), your submitted information is fully encrypted and stored in our sovereign environment.</p>
            
            <p>An executive architect will contact you within 24 hours to present our preliminary findings and schedule your formal Strategy Audit call.</p>
            
            <div class="signature">
                Securely,<br/>
                The Operations Node | Nivo Partners<br/>
                <span style="color: #9ca3af; font-size: 12px; font-weight: normal;">Tampa, FL (Hillsborough County Jurisdiction)</span>
            </div>
        </div>
        <div class="footer">
            CONFIDENTIALITY NOTICE: This transmission and any attachments are intended solely for the use of the individual or entity to whom they are addressed. Securely routed by Nivo Partners Infrastructure.
        </div>
    </div>
</body>
</html>
`;

export default async function handler(req, res) {
    // Phase 0: Security Headers
    setSecurityHeaders(req, res);

    // Rate Limiting
    if (isRateLimited(req)) {
        return res.status(429).json({ error: 'Too many requests.' });
    }

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed.' });

    // Track subsystem statuses for the response
    const status = {
        database: 'skipped',
        clientEmail: 'skipped',
        internalEmail: 'skipped',
        auditId: null
    };

    try {
        // Phase 1: Data Ingestion and Sanitization
        let { name, email, company, service, requirements } = req.body;

        if (!name || !email || !company) {
            return res.status(400).json({ error: 'Missing required parameters: name, email, company.' });
        }

        const sanitizedData = {
            name: sanitize(name),
            email: String(email).trim().toLowerCase(),
            company: sanitize(company),
            service: sanitize(service),
            requirements: sanitize(requirements)
        };

        // Phase 1b: Database Logging (Supabase) — Graceful Degradation
        if (!supabase) {
            console.error('[PROCESS_AUDIT] Supabase client is NULL. Check env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
            status.database = 'not_configured';
        } else {
            try {
                const { data: dbData, error: dbError } = await supabase
                    .from('leads')
                    .insert([sanitizedData])
                    .select()
                    .single();

                if (dbError) {
                    console.error('[PROCESS_AUDIT] Database Insertion Error:', dbError);
                    status.database = `error: ${dbError.message}`;
                } else {
                    status.auditId = dbData ? dbData.id : null;
                    status.database = 'success';
                }
            } catch (dbException) {
                console.error('[PROCESS_AUDIT] Database Exception:', dbException);
                status.database = `exception: ${dbException.message}`;
            }
        }

        // Phase 2: Trigger Client Confirmation Email (Resend)
        if (!resend) {
            console.error('[PROCESS_AUDIT] Resend client is NULL. Check env var: RESEND_API_KEY');
            status.clientEmail = 'not_configured';
        } else {
            try {
                const clientEmailHtml = getEmailTemplate(sanitizedData.name);
                const { error } = await resend.emails.send({
                    from: 'Nivo Partners System <system@nivopartners.com>',
                    to: sanitizedData.email,
                    subject: `Action Required: Nivo Partners Strategy Audit Initiated - ${sanitizedData.company}`,
                    html: clientEmailHtml
                });
                if (error) {
                    console.error('[PROCESS_AUDIT] Client Email Error:', error);
                    status.clientEmail = `error: ${error.message || JSON.stringify(error)}`;
                } else {
                    status.clientEmail = 'success';
                }
            } catch (emailException) {
                console.error('[PROCESS_AUDIT] Client Email Exception:', emailException);
                status.clientEmail = `exception: ${emailException.message}`;
            }
        }

        // Phase 3: Internal Notification (The Ping to contact@nivopartners.com)
        if (!resend) {
            status.internalEmail = 'not_configured';
        } else {
            try {
                const { error } = await resend.emails.send({
                    from: 'Operations Node <system@nivopartners.com>',
                    to: 'contact@nivopartners.com',
                    subject: `NEW AUDIT SUBMITTED: ${sanitizedData.name} - ${sanitizedData.company}`,
                    text: `System Alert:\n\nA new Architecture Wizard audit has been submitted.\n\nName: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nCompany: ${sanitizedData.company}\nService Request: ${sanitizedData.service}\nRequirements: ${sanitizedData.requirements}\n\nDatabase Status: ${status.database}\nAudit Ref: ${status.auditId || 'N/A'}\n\nCheck the Supabase 'leads' dashboard for full context.`
                });
                if (error) {
                    console.error('[PROCESS_AUDIT] Internal Email Error:', error);
                    status.internalEmail = `error: ${error.message || JSON.stringify(error)}`;
                } else {
                    status.internalEmail = 'success';
                }
            } catch (emailException) {
                console.error('[PROCESS_AUDIT] Internal Email Exception:', emailException);
                status.internalEmail = `exception: ${emailException.message}`;
            }
        }

        // Determine overall success: At least ONE subsystem must succeed
        const anySuccess = status.database === 'success' || status.clientEmail === 'success' || status.internalEmail === 'success';
        const allFailed = status.database !== 'success' && status.clientEmail !== 'success' && status.internalEmail !== 'success';

        // ─── CAPA 2: Auto-Alerta Preventiva ─────────────────────────────────────
        // Si algún subsistema falló (aunque no todos), enviar alerta interna.
        // Esto corre en background, no bloquea la respuesta al usuario.
        const failedSubsystems = [];
        if (status.database !== 'success') failedSubsystems.push(`Database: ${status.database}`);
        if (status.clientEmail !== 'success') failedSubsystems.push(`Client Email: ${status.clientEmail}`);
        if (status.internalEmail !== 'success') failedSubsystems.push(`Internal Email: ${status.internalEmail}`);

        if (failedSubsystems.length > 0 && resend) {
            // Fire-and-forget: no await, no bloqueo
            resend.emails.send({
                from: 'Operations Node <system@nivopartners.com>',
                to: 'contact@nivopartners.com',
                subject: `🚨 SYSTEM ALERT: Subsystem Failure Detected — ${new Date().toISOString()}`,
                text: [
                    'NIVO PARTNERS | INFRASTRUCTURE ALERT',
                    '=====================================',
                    '',
                    `Timestamp: ${new Date().toISOString()}`,
                    `Lead Name: ${sanitizedData.name}`,
                    `Lead Email: ${sanitizedData.email}`,
                    `Lead Company: ${sanitizedData.company}`,
                    '',
                    'FAILED SUBSYSTEMS:',
                    ...failedSubsystems.map(s => `  ❌ ${s}`),
                    '',
                    'IMMEDIATE ACTIONS REQUIRED:',
                    '  1. Go to vercel.com → Project → Settings → Environment Variables',
                    '  2. Verify RESEND_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY are set',
                    '  3. Check https://nivopartners.com/api/health for full diagnostic',
                    '  4. Check Resend dashboard for domain verification status',
                    '',
                    'The lead data may not have been fully captured. Check Supabase manually.',
                    '',
                    '— Nivo Partners Autonomous Alert System'
                ].join('\n')
            }).catch(alertErr => {
                // Si hasta la alerta falla, al menos lo logueamos
                console.error('[PROCESS_AUDIT] CRITICAL: Alert email also failed:', alertErr.message);
            });

            console.warn('[PROCESS_AUDIT] ⚠️ PARTIAL FAILURE ALERT TRIGGERED. Failed:', failedSubsystems.join(', '));
        }
        // ─────────────────────────────────────────────────────────────────────────

        if (allFailed) {
            // All subsystems failed — this is a critical configuration error
            const missingVars = [];
            if (!supabaseUrl) missingVars.push('SUPABASE_URL');
            if (!supabaseServiceKey) missingVars.push('SUPABASE_SERVICE_ROLE_KEY');
            if (!resendApiKey) missingVars.push('RESEND_API_KEY');

            return res.status(500).json({
                error: 'All subsystems failed. Check Vercel Environment Variables.',
                missing_env_vars: missingVars.length > 0 ? missingVars : 'All vars present but connections failed',
                subsystems: status
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Audit parameters securely ingested. Communication protocols triggered.',
            audit_ref: status.auditId,
            subsystems: {
                database: status.database,
                client_email: status.clientEmail,
                internal_email: status.internalEmail
            }
        });

    } catch (error) {
        captureException(error, req.body);
        console.error('[PROCESS_AUDIT] Unhandled Operations Error:', error);

        return res.status(500).json({
            error: 'System architecture execution failed.',
            details: error.message || 'Unknown backend exception',
            subsystems: status,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
