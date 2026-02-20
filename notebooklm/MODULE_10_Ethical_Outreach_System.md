# MODULE_10: Ethics & Anti-Spam (CAN-SPAM/FIPA)

## 1. Technical Compliance (The Pre-flight Check)

Our outbound systems utilize a **"Pre-flight Compliance Check"**. Before any email is sent via Resend API, our Edge Functions query the leads database to verify the user's unsubscribed status. This prevents accidental outreach to opted-out entities.

## 2. Regulatory Adherence

We strictly adhere to the **Federal CAN-SPAM Act of 2003** and the **Florida Electronic Mail Communications Act** (Chapter 668, Part III, F.S.).

## 3. Transparency Protocol

**Identity:** All emails are cryptographically signed (DKIM) to prove origin.

**Mechanism:** One-click opt-out headers are injected into every message payload.
