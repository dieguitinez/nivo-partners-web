import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

serve(async (req: Request) => {
    // 1. Handle CORS Preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        let email = "";

        // Support both GET (url params) and POST (body)
        if (req.method === "GET") {
            const url = new URL(req.url);
            email = url.searchParams.get("email") || "";
        } else {
            const body = await req.json();
            email = body.email || "";
        }

        if (!email) {
            throw new Error("Missing email address");
        }

        console.log(`[Unsubscribe] Processing request for: ${email}`);

        // Update the database
        const { error } = await supabase
            .from("leads")
            .update({ unsubscribed: true })
            .eq("email", email);

        if (error) {
            console.error("[Unsubscribe Error]", error);
            throw error;
        }

        return new Response(JSON.stringify({ success: true, message: `Email ${email} has been unsubscribed.` }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error: any) {
        console.error("[Unsubscribe Function Error]", error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
