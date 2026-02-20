import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface LeadRecord {
    id?: string;
    name: string;
    email: string;
    company: string;
    service?: string;
    requirements?: string;
    unsubscribed?: boolean;
}

serve(async (req: Request) => {
    // 1. Handle CORS Preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        console.log("[Edge] Received request");

        // 2. Parse Environment & Payload
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (!RESEND_API_KEY) {
            console.error("[Edge] Missing RESEND_API_KEY secret");
            throw new Error("Missing RESEND_API_KEY");
        }

        const resend = new Resend(RESEND_API_KEY);
        const payload = await req.json();
        const record: LeadRecord = payload.record || payload;

        console.log(`[Edge] Processing lead: ${record.email} (${record.company})`);

        if (!record.email) throw new Error("Missing email in payload");

        // 3. Pre-flight Compliance Check (Lead Privacy Guard)
        // If this is a webhook trigger from an existing record, check the unsubscribed flag.
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

        if (supabaseUrl && supabaseServiceKey) {
            const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.39.3");
            const supabase = createClient(supabaseUrl, supabaseServiceKey);

            const { data: leadStatus } = await supabase
                .from("leads")
                .select("unsubscribed")
                .eq("email", record.email)
                .single();

            if (leadStatus?.unsubscribed) {
                console.warn(`[Compliance] Blocking email: ${record.email} has opted out.`);
                return new Response(JSON.stringify({
                    success: false,
                    message: "Email blocked: User has opted out of communications."
                }), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 200 // Return 200 but indicate success: false for silent drop
                });
            }
        }

        console.log(`[Resend] Preparing email for lead: ${record.email}`);

        // 3. Send Email via Resend API
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                // IMPORTANT: Once domain is verified, use consistent FROM address
                from: "Nivo Partners <contact@nivopartners.com>",
                to: ["contact@nivopartners.com"],
                subject: `New Lead: ${record.company}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #000;">New Lead Generated</h1>
                        <hr style="border: 0; border-top: 1px solid #eee;">
                        <p><strong>Name:</strong> ${record.name}</p>
                        <p><strong>Company:</strong> ${record.company}</p>
                        <p><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>
                        <p><strong>Service:</strong> ${record.service || "Not specified"}</p>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                            <strong>Requirements:</strong><br>
                            ${record.requirements || "None provided"}
                        </div>
                        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;">
                        <p style="color: #888; font-size: 12px; line-height: 1.5;">
                            Sent from Nivo Partners Revenue Core Protocol.<br>
                            <em>Jurisdiction: Florida, USA | HIPAA/CAN-SPAM Compliant</em>
                        </p>
                        <p style="color: #aaa; font-size: 10px; margin-top: 20px;">
                            You are receiving this internal notification because a lead submitted a request on nivopartners.com.<br>
                            For outreach campaigns, ensure the following mechanism is active: 
                            <a href="https://nivopartners.com/legal/unsubscribe.html?email=${record.email}" style="color: #0066ff;">Immediate Opt-Out</a>
                        </p>
                    </div>
                `,
            }),
        });

        const data = await res.json();
        console.log("[Resend Response Status]", res.status);
        console.log("[Resend Response Data]", JSON.stringify(data, null, 2));

        if (!res.ok) {
            console.error("[Resend Error Payload]", data);
            const errorMsg = data.message || data.error || "Unknown Resend Error";
            throw new Error(`Resend API Failure (${res.status}): ${errorMsg}`);
        }

        console.log("[Resend Success]", data.id);

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error: any) {
        console.error("[Function Error]", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
