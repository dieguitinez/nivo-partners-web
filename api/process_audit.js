import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase and Resend strictly from Server ENV Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
// Always use Service Role for backend insertion to bypass RLS safely
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

const supabase = (supabaseUrl && supabaseServiceKey) ? createClient(supabaseUrl, supabaseServiceKey) : null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Log initialization status (internal logs only)
if (!supabase) console.warn('[INIT] Supabase client failed: Missing URL or Key');
if (!resend) console.warn('[INIT] Resend client failed: Missing API Key');

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
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        // Phase 1: Data Ingestion and Sanitization
        const { name, email, company, service, requirements } = req.body;

        if (!name || !email || !company) {
            return res.status(400).json({ error: 'Missing required parameters: name, email, company.' });
        }

        // Basic Sanitization (preventing immediate HTML injection attempts)
        const sanitizedData = {
            name: String(name).trim().replace(/<[^>]*>?/gm, ''),
            email: String(email).trim().toLowerCase(),
            company: String(company).trim().replace(/<[^>]*>?/gm, ''),
            service: String(service || '').trim().replace(/<[^>]*>?/gm, ''),
            requirements: String(requirements || '').trim().replace(/<[^>]*>?/gm, ''),
            source: 'strategy_audit',
            status: 'new'
        };

        // Phase 1b: Database Logging (Supabase)
        // Inserting into 'leads' table
        if (!supabase) throw new Error('Database connection parameters not configured.');

        const { data: dbData, error: dbError } = await supabase
            .from('leads')
            .insert([sanitizedData])
            .select()
            .single();

        if (dbError) {
            console.error('Database Insertion Error:', dbError);
            throw new Error(`System architecture execution failed: ${dbError.message}`);
        }

        const auditId = dbData ? dbData.id : null;

        // Phase 2 & 3: Trigger Client Email (Resend)
        let clientEmailError = null;
        if (resend) {
            const clientEmailHtml = getEmailTemplate(sanitizedData.name);
            const { error } = await resend.emails.send({
                from: 'Nivo Partners System <system@send.nivopartners.com>',
                to: sanitizedData.email,
                subject: `Action Required: Nivo Partners Strategy Audit Initiated - ${sanitizedData.company}`,
                html: clientEmailHtml
            });
            clientEmailError = error;
        }

        if (clientEmailError) {
            console.error('Client Email Transmission Error:', clientEmailError);
        }

        // Phase 4: Internal Notification (The Ping)
        let internalEmailError = null;
        if (resend) {
            const { error } = await resend.emails.send({
                from: 'Operations Node <system@send.nivopartners.com>',
                to: 'contact@nivopartners.com',
                subject: `NEW AUDIT SUBMITTED: ${sanitizedData.name} - ${sanitizedData.company}`,
                text: `System Alert:\n\nA new Architecture Wizard audit has been submitted.\n\nName: ${sanitizedData.name}\nCompany: ${sanitizedData.company}\nService Request: ${sanitizedData.service}\n\nCheck the Supabase 'leads' dashboard for full context.`
            });
            internalEmailError = error;
        }

        if (internalEmailError) {
            console.error('Internal Notification Transmission Error:', internalEmailError);
        }

        // Successful Payload Response
        return res.status(200).json({
            success: true,
            message: 'Audit parameters securely ingested. Communication protocols triggered.',
            audit_ref: auditId,
            email_status: (clientEmailError || internalEmailError) ? 'partial_failure' : 'all_green'
        });

    } catch (error) {
        console.error('Operations Error:', error);

        // Dynamic error message for debugging
        const friendlyError = error.message && error.message.includes('leads')
            ? 'Database error: Ensure the leads table exists and is accessible.'
            : error.message;

        return res.status(500).json({
            error: 'System architecture execution failed.',
            details: friendlyError || 'Unknown backend exception'
        });
    }
}
