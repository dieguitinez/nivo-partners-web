# 🛠️ SOP 07: Troubleshooting Serverless Email Integration (Vercel + Supabase + Resend)

**Objective:** Document the complete diagnostics and resolution process for the 500 Internal Server Error encountered during the Lead Capture (Architecture Wizard) implementation. This guide serves as an internal reference and a high-value blueprint for external developers facing similar asynchronous neural pipeline issues.

---

## 1. The Symptom: HTTP 500 Error on Lead Submission

When a high-value partner attempted to submit the Architecture Audit request, the frontend threw a generic `HTTP 500: Internal Server Error`. No emails were dispatched to `contact@nivopartners.com`, and the lead was seemingly lost in the void.

### Initial Investigation

* The `api/process_audit.js` Vercel Serverless Function was crashing before returning a payload.
* Because the frontend caught a generic 500 error, there was zero visibility into *where* the failure occurred in the pipeline (Supabase vs. Resend vs. Code Syntax).

---

## 2. Phase 1 Resolution: Building the Diagnostic Tool (`api/diag.js`)

To understand the "black box" of the Vercel serverless environment, we built a real-time health-check endpoint.

**Action Taken:**
Created `/api/diag` to independently test:

1. **Environment Variables:** Are `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `RESEND_API_KEY` mapped correctly in the live environment?
2. **Supabase Connection:** Can the server ping the `leads` table using the Service Role Key?
3. **Resend Connection:** Is the API key valid, and what is the status of the sending domains?

**The Finding:**
The diagnostic tool revealed that Vercel was missing all critical environment variables (`❌ CONFIG_MISSING`). The server could not authenticate with Supabase or Resend.

---

## 3. Phase 2 Resolution: Hardening the Lead Pipeline (Database First)

Before fixing the keys, we restructured `api/process_audit.js` to ensure data resilience.

**The Problem:** The original code treated the Supabase insertion and the Resend email dispatch as a single atomic operation. If Resend failed (e.g., due to unverified DNS), it threw an error that aborted the *entire* function, meaning the lead was never saved to the database.

**The Fix:**

* Implemented a *Database-First* capture protocol. The lead is securely lodged into Supabase immediately.
* Added `try/catch` logic around the Resend email dispatch. If the email fails, the function catches the error, logs it internally, but still returns a `200 Success` to the user, ensuring the conversion is not lost.

---

## 4. Phase 3 Resolution: Vercel ESM Compatibility Fix

After adding the correct API keys to Vercel, the diagnostic tool suddenly started throwing a 500 Error: `ReferenceError: require is not defined`.

**The Problem:**
We had recently added `"type": "module"` to `package.json` to silence Vercel build warnings. However, Node.js files using the older CommonJS `require()` syntax instantly break in a strict ESM (ECMAScript Module) environment.

**The Fix:**
Converted all serverless endpoints (`api/chat.js`, `api/process_audit.js`, `api/diag.js`) from CommonJS to ESM:

* Changed `const { Resend } = require('resend');` to `import { Resend } from 'resend';`
* Changed `module.exports = async function handler` to `export default async function handler`

---

## 5. Phase 4 Resolution: Resend DNS Propagation & Subdomain Routing

With the code stable, the diagnostic tool reported Supabase as `✅ OK` but the Resend domain `nivopartners.com` as `failed` / `pending`.

**The Problem:**
Resend strictly enforces DKIM and SPF records to prevent spoofing. It will silently block emails originating from unverified domains to protect sender reputation.

**The Fix:**

1. **DNS Configuration (Turbify):** Extracted the required DKIM (`resend._domainkey`) and SPF (`feedback-smtp.us-east-1.amazonses.com`) records from Resend and added them to the Turbify DNS Control Panel.
2. **Subdomain Alignment:** Turbify's panel was resistant to adding root MX records accurately. To ensure flawless delivery, we pivoted to using a dedicated sending subdomain: `send.nivopartners.com`.
3. **Code Update:** Updated all `from:` fields in the code to match the verified subdomain: `from: 'Nivo Partners System <system@send.nivopartners.com>'`.

---

## Executive Summary & Key Takeaways

By isolating the architecture into distinct layers (Code -> Keys -> Database -> DNS), we transformed a brittle script into a highly resilient, enterprise-grade pipeline.

1. **Never blind-fire APIs:** Always build a `/diag` endpoint for production troubleshooting.
2. **Database First:** Secure the data immediately. Secondary actions (emails/SMS) must never block the primary conversion event.
3. **Strict ESM:** If `"type": "module"` exists, ensure absolute consistency across all `.js` files.
4. **DNS Patience:** Resend/AWS verification requires exact DNS matching and patience for global propagation.

*This knowledge asset is property of Nivo Partners and represents a high-value blueprint for serverless architecture troubleshooting.*
