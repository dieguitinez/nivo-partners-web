# 🧠 MODULE 02: Serverless Intelligence & Data Sovereignty

**Version:** 3.0
**Owner:** Head of Data Architecture
**Last Audit:** Feb 2026

---

## 1. Strategic Context (The "Why")

**Business Problem:**
Traditional agencies rely on "Contact Form Plugins" (WordPress/PHP) that are insecure, slow, and often land emails in Spam. They create a single point of failure and offer zero data governance.

**Nivo Partners Solution:**
We implemented a **Serverless Data Pipeline**. By decoupling the database (Supabase) from the frontend (Vercel) and the email courier (Resend), we ensure that:

1. **Sovereignty:** You own the data in a raw SQL format (not locked in a plugin).
2. **Scalability:** The system can handle 10 or 10,000 leads per hour without crashing.
3. **Deliverability:** Transactional email APIs guarantee inbox placement.
4. **Resiliency:** The brain (Gemini 2.5 Flash) is decoupled from the transactional flow to ensure continuity even during AI downtime.

---

## 2. Implementation Mechanics (Deep Dive)

### Component A: The Neural Core (Gemini 2.5 Flash)

We migrated from Gemini Pro to **Gemini 2.5 Flash** due to its superior speed/latency ratio for B2B chat applications.

- **SDK:** `@google/genai` (Native).
- **Architecture:** We use the `generateContent` method with multi-turn history injection to maintain context without the overhead of the Chat API sessions.
- **Fail-safe Telemetría:** Telemetry calls (via Resend) are initialized *within* the handler to prevent server crashes if API keys are missing.

### Component A: The Variable Ledger (Supabase Database)

We utilize PostgreSQL, the "Gold Standard" of enterprise databases.

- **Schema:** The `leads` table acts as the immutable ledger of business interest.
- **Security (RLS):** We configured **Row Level Security**.
  - *Public Rule:* Anyone can `INSERT` (submit a form).
  - *Private Rule:* No one (except Admin) can `SELECT` (read data).
  - *Impact:* Even if the frontend API key is exposed, your customer data remains invisible to hackers.

### Component B: The Neural Reflex (Edge Functions)

Instead of a server running 24/7 waiting for emails, we use **Event-Driven Compute**.

- **Trigger:** When a new row hits `leads`.
- **Action:** The `notify_new_lead` function spins up in a Deno runtime -> Formats HTML Email -> Calls Resend API -> Shuts down.
- **Speed:** Total execution time <400ms.

---

## 3. Analysis: Current vs. Optimized State

### ✅ Current State

- **Ingestion:** Fully functional via `contact.js`.
- **Notification:** Instant Admin alerts via Resend.
- **Storage:** Secure PostgreSQL table.

### 🚀 Improvement Plan (Gap Analysis)

- **Best Practice:** **Queue Management**.
- **Current Risk:** If Supabase triggers 1,000 function calls instantly (DDoS), we might hit rate limits.
- **Optimization:** Implement a "Message Queue" (Supabase Realtime) to buffer incoming leads and process them in batches.
- **Timeline:** When daily lead volume > 500.

---

## 4. Value Transfer to Client (The Sales Pitch)

> "Ms. Client, we don't use 'Contact Forms'. We build a **Data Vault**.
>
> 1. **Bank-Grade Security:** Your customer data isn't sitting in a WordPress plugin; it's in an encrypted PostgreSQL database protected by Row Level Security.
> 2. **Instant Reaction:** Our 'Edge Logic' processes leads in milliseconds, ensuring your sales team gets the alert before the customer even closes the tab.
> 3. **Ownership:** You can plug this database directly into Salesforce or HubSpot later. You own the raw data pipes."

---

## 5. Audit Checklist (The "Infalible" Protocol)

- [ ] **RLS Policy:** Verify `leads` table allows `INSERT` to `anon` role but DENIES `SELECT`.
- [ ] **Edge Logs:** Check Supabase Dashboard -> Edge Functions -> `notify_new_lead`. Success rate must be 100%.
- [ ] **DNS Auth:** Verify Resend Domain Status is "Verified" (DKIM/SPF Active).
- [ ] **Failover:** Disconnect internet and try the form. Does it fail gracefully with a user-friendly error?
