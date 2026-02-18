// Supabase Edge Function: notify-new-lead
// Deploy with: supabase functions deploy notify-new-lead
// 
// This function fires automatically when a new row is inserted in the 'leads' table.
// It sends an email notification to contact@nivopartners.com via Resend API.
//
// Setup:
// 1. Deploy this function: supabase functions deploy notify-new-lead
// 2. Set secret: supabase secrets set RESEND_API_KEY=re_xxxxxxxx
// 3. Create DB webhook in Supabase Dashboard:
//    Table Editor → leads → Webhooks → Create Webhook
//    → Event: INSERT → URL: https://<project>.supabase.co/functions/v1/notify-new-lead

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL = "contact@nivopartners.com";

serve(async (req) => {
    try {
        const payload = await req.json();
        const lead = payload.record;

        // Build notification email
        const emailBody = {
            from: "Nivo Revenue Core <onboarding@resend.dev>",
            to: [NOTIFY_EMAIL],
            subject: `🚨 New Lead: ${lead.name} — ${lead.company || "Unknown Company"}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0c14; color: #e2e8f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #3b82f6; margin-bottom: 8px;">⚡ New Lead Captured</h2>
          <p style="color: #94a3b8; margin-bottom: 24px;">A new prospect has entered the Revenue Core pipeline.</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 12px 0; color: #64748b; width: 40%;">Name</td>
              <td style="padding: 12px 0; font-weight: bold;">${lead.name || "—"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 12px 0; color: #64748b;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${lead.email}" style="color: #3b82f6;">${lead.email || "—"}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 12px 0; color: #64748b;">Company</td>
              <td style="padding: 12px 0;">${lead.company || "—"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 12px 0; color: #64748b;">Service Interest</td>
              <td style="padding: 12px 0;">${lead.service || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b;">Requirements</td>
              <td style="padding: 12px 0;">${lead.requirements || "—"}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #1e293b; border-radius: 8px; border-left: 3px solid #3b82f6;">
            <p style="margin: 0; font-size: 12px; color: #64748b;">
              Captured: ${new Date(lead.created_at).toLocaleString("en-US", { timeZone: "America/New_York" })} EST<br>
              Source: nivopartners.com
            </p>
          </div>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://supabase.com/dashboard/project/_/editor" 
               style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              View in Supabase →
            </a>
          </div>
        </div>
      `
        };

        // Send via Resend API
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emailBody)
        });

        if (!res.ok) {
            const error = await res.text();
            console.error("Resend error:", error);
            return new Response(JSON.stringify({ error }), { status: 500 });
        }

        console.log(`Notification sent for lead: ${lead.email}`);
        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (err) {
        console.error("Edge function error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
});
