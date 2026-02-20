import { Resend } from 'resend';

// Initialize Telemetry Node (Resend)
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const { userMessage, sessionId } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: 'Missing user message.' });
        }

        // ------------------------------------------------------------------
        // [SIMULATED LLM INVOCATION]
        // This simulates a real LLM checking against 08_Kai_Knowledge_Base.md
        // ------------------------------------------------------------------
        const llmResponse = await generateAIResponse(userMessage);

        // ------------------------------------------------------------------
        // PHASE 1: THE FALLBACK LOGIC (Graceful Degradation)
        // Check if the LLM flagged the request as Out of Scope (OOS)
        // or if confidence is too low.
        // ------------------------------------------------------------------
        const isOutOfScope = llmResponse.isOutOfBounds || llmResponse.confidenceScore < 0.70;

        let finalClientResponse = llmResponse.text;

        if (isOutOfScope) {
            // Override the AI's response with the approved Sovereign Escapement Strategy
            finalClientResponse = "That is a highly specific operational inquiry. To ensure absolute precision, I am escalating this parameter to our human executive architects. For immediate priority, please submit your baseline data through our Architecture Wizard, and they will address this directly during your Strategy Audit.";

            // ------------------------------------------------------------------
            // PHASE 2: THE SILENT TELEMETRY (Non-blocking execution)
            // Fire the alert asynchronously so the client doesn't wait for the email
            // ------------------------------------------------------------------
            triggerSilentTelemetryAlert(userMessage, sessionId).catch(err => {
                console.error("Telemetry Endpoint Failure:", err);
            });
        }

        // Return the final response to the frontend client immediately
        return res.status(200).json({
            reply: finalClientResponse,
            escalated: isOutOfScope
        });

    } catch (error) {
        console.error('Chat Node Error:', error);
        return res.status(500).json({ error: 'Neural link interrupted.' });
    }
}

/**
 * Executes the Silent Alert Protocol seamlessly in the background.
 */
async function triggerSilentTelemetryAlert(unmappedInput, sessionId = 'UNKNOWN-SESSION') {
    const timestamp = new Date().toISOString();

    // Construct Telemetry Payload
    const emailHtml = `
        <div style="font-family: monospace; padding: 20px; background-color: #111827; color: #f3f4f6; border: 1px solid #dc2626;">
            <h2 style="color: #ef4444;">[KAI TELEMETRY] Unmapped Query Alert</h2>
            <p><strong>SYSTEM ALERT:</strong> Kai encountered a user query that is not currently mapped in the <code>08_Kai_Knowledge_Base.md</code> matrix.</p>
            
            <div style="background-color: #1f2937; padding: 15px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <strong>Unmapped User Input:</strong><br/>
                <br/>
                "${unmappedInput.replace(/</g, "&lt;").replace(/>/g, "&gt;")}"
            </div>
            
            <p><strong>Session ID:</strong> ${sessionId}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            
            <hr style="border-color: #374151; margin: 20px 0;" />
            <p><strong>ACTION REQUIRED:</strong></p>
            <p>Review the input above. If valid, formulate a strategic response and append it to <strong>Section 4</strong> of the <code>08_Kai_Knowledge_Base.md</code> file to upgrade Kai's cognitive matrix for future interactions.</p>
        </div>
    `;

    // Dispatch the alert to the Operations Hub
    if (!process.env.RESEND_API_KEY) {
        console.warn("Missing RESEND_API_KEY. Telemetry alert skipped for dev environment.");
        return;
    }

    const { error } = await resend.emails.send({
        from: 'Kai Telemetry <system@nivopartners.com>',
        to: 'contact@nivopartners.com',
        subject: '[KAI TELEMETRY] Unmapped Query Alert - Nivo Partners',
        html: emailHtml
    });

    if (error) {
        throw new Error(`Resend API Error: ${error.message}`);
    }

    console.log(`[TELEMETRY LOGGED] OOS event captured for session: ${sessionId}`);
}

/**
 * Mock LLM Wrapper Structure for Demonstration
 */
async function generateAIResponse(userInput) {
    // In production, replace this with your actual LangChain / Gemini / OpenAI call

    // For HITL fallback testing, detect some unmapped topics or gibberish
    const unmappedTopics = ['tax advice', 'legal counsel', 'hardware repair', 'coding my app', 'what is your name again', 'joke', 'weather', 'who is the president'];
    const isUnmapped = unmappedTopics.some(topic => userInput.toLowerCase().includes(topic)) || userInput.length < 3 || userInput.length > 200;

    if (isUnmapped) {
        return { text: "I don't know.", confidenceScore: 0.4, isOutOfBounds: true };
    }

    return { text: "We provide sovereign digital architectures for sophisticated B2B operations...", confidenceScore: 0.95, isOutOfBounds: false };
}
