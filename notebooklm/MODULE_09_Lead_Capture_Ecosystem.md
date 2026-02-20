# 🗄️ MODULE 09: Sovereign Lead Capture & Neural Notifications

**Objective:** Master the construction of an asynchronous, serverless lead capture ecosystem that ensures data sovereignty and real-time processing.

---

## 👨‍🏫 Professor's Overview

Greetings, scholars. In our previous discussions, we focused on the "frontend" and the "Aesthetic of Trust". Today, we go "under the hood" to explore the **Asynchronous Neural Pipeline**.

When a high-value partner interacts with our **Revenue Core**, their data must be handled with bank-grade precision. We do not use generic, third-party forms that "rent" your data. We build **Sovereign Storage**.

---

## 1. Sovereign Storage: Supabase (PostgreSQL)

At the heart of our lead engine is **Supabase**. It provides more than just a database; it provides an **Infrastructure Layer**.

### A. The "Leads" Relation

Our database is structured to capture institutional data securely.

* **Primary Key (uuid):** Each lead is a unique, unforgeable entity.
* **Row Level Security (RLS):** This is critical, students. RLS ensures that while anyone can *submit* a lead via the API, no one can *read* your database without the Secret Service Key.
* **Field Mapping:** Note how we synchronize the `infrastructure-context` from our Wizard directly into the database schema.

---

## 2. Autonomous Execution: Supabase Edge Functions

What happens after the data is stored? We don't wait for a human to check the logs. We trigger an **Autonomous Edge Function**.

### A. The `notify_new_lead` Protocol

Using Deno (a secure runtime for JavaScript/TypeScript), we've deployed a script that:

1. **Listens:** It waits for a "Webhook" from the database.
2. **Sanitizes:** It verifies the payload to prevent injection attacks.
3. **Compliance Check:** In Module 07, we discussed Anti-Spam. Here, the function checks the `unsubscribed` flag *before* doing anything else.

---

## 3. Real-Time Sync: Resend Integration

To close the loop, we must notify the architects. We use **Resend**, a modern bridge for transactional email.

* **The Workflow:**
  * Lead Submits Form -> Database Captures -> Edge Function Triggers -> **Resend Dispatches Email**.
* **The Advantage:** This is "Serverless". It scales gracefully from 1 lead a day to 10,000, with zero management of email servers.

---

## 4. Laboratory Assignment: Tracking a Submission

1. Open the Browser Console (`F12`) on the Audit Request modal.
2. Submit a test lead.
3. Watch the `fetch()` call to the `/rest/v1/leads` endpoint.
4. **Observation:** Notice the `Authorization: Bearer [ANON_KEY]` header. Why do we use the *Anon* key here instead of the *Service Role* key? (Hint: See Section 1A on RLS).

---

> [!IMPORTANT]
> **Key Takeaway:** By combining Supabase, Edge Functions, and Resend, you are building an **Infrastructure**, not just a website. You are ensuring that every lead is an asset that is archived, processed, and responded to automatically.
