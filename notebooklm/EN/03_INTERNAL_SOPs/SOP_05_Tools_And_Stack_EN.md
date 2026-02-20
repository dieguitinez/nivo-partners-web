# 🔧 SOP-05 — Complete Tools & Stack — Nivo Partners

**Purpose:** Central reference for all active tools, their roles, and which division uses them.
**Audience:** Any team member or authorized contractor.
**Update:** Every time a tool is added or removed from the stack.

---

> [!IMPORTANT]
> Access credentials are NOT documented here. They are in the internal password manager. This document only lists what tools exist and what they're for.

---

## Category 1 — Gemini Pro Suite (Google) *(Core AI Stack)*

| Tool | Role at Nivo | Primary Division | Plan |
|---|---|---|---|
| **Antigravity** | Agentic development, code, documentation, deployment | I, III | Gemini Pro |
| **Jules** | Async agent: refactors, scripts, code QA | I, III | Gemini Pro |
| **Gemini Code Assist** | Code copilot for technical contractors | I | Gemini Pro |
| **Gemini Deep Research** | Competitive intelligence, market research | II | Gemini Pro |
| **NotebookLM** | Knowledge bases per client (up to 5 notebooks) | II, III | Gemini Pro |
| **Gemini in Gmail** | Email drafting, follow-ups, proposals | All | Gemini Pro |
| **Gemini in Docs** | Copy writing, contracts, reports | All | Gemini Pro |
| **Flow** | Video generation for Sovereign tier clients | III | Gemini Pro |
| **Whisk** | Image/visual generation for clients | III | Gemini Pro |
| **Google Drive (2TB)** | Central repository of assets, deliverables, docs | All | Gemini Pro |
| **Google Search Labs** | Advanced search intent research | II | Gemini Pro |

---

## Category 2 — Web Infrastructure *(Division I)*

| Tool | Role | Account |
|---|---|---|
| **Vercel** | Edge deploy and hosting for client sites | Shared account (client gets access) |
| **GitHub** | Version control, code delivery to client | Personal + repos per client |
| **GCP** | Infrastructure for Neural Engines (Sovereign tier) | Nivo account |
| **Supabase** | Database with RLS for lead capture and CRM | Project per client (client is owner) |
| **Resend** | Transactional email (forms, notifications) | Nivo account |

### Ownership Rule (critical)

- **Vercel:** Client has their domain connected. On transfer, Nivo does final deploy and client becomes owner.
- **GitHub:** The final repo is transferred to the client in the delivery call.
- **Supabase:** Project is created in the client's account from the start; Nivo has temporary admin access.
- **Domain:** Always in the client's account (GoDaddy, Namecheap, etc.). Nivo only configures DNS.

---

## Category 3 — Marketing & Analytics *(Division II)*

| Tool | Role | Account |
|---|---|---|
| **Google Ads** | Paid acquisition campaign platform | MCC Nivo account → client sub-account |
| **Google Analytics 4 (GA4)** | Conversion and behavior tracking | Property in client's account |
| **Google Tag Manager** | Tag and tracking event management | Container per client |
| **Google Search Console** | Technical SEO, indexing, organic performance | Access per client |
| **Microsoft Clarity** | Heatmaps and session recordings | Project per client |
| **HubSpot** *(optional)* | Advanced CRM for clients who require it | Evaluate per client |

### Ads Rule

- Always use Nivo's **MCC (Manager account)** to create client sub-accounts.
- Billing goes directly to the client (client's payment method in their sub-account).
- Nivo charges a management fee separately — never a markup on media spend.

---

## Category 4 — Productivity & Communication *(All divisions)*

| Tool | Role | Access |
|---|---|---|
| **Google Workspace (Gmail)** | Corporate email (@nivopartners.com) | Full team |
| **Google Meet / Zoom** | Sales calls, diagnosis, delivery | Shared Zoom Pro |
| **Google Drive** | Internal and client documents | Folder per client |
| **Slack** *(future)* | Internal team communication | Pending activation when team exists |

---

## Category 5 — Security & Access

| Tool | Role | Note |
|---|---|---|
| **Password Manager** | All credentials centralized | Bitwarden Teams or 1Password |
| **2FA Authentication** | Required on all critical accounts | Google Authenticator or Authy |

> [!CAUTION]
> No contractor receives admin access to client production accounts without being explicitly added by the Division Director. Access is revoked immediately upon project completion.

---

## Stack Map by Scenario

### Scenario A — Core Unit ($3,500)

```
Client signs →
GitHub (private repo) →
Development with Antigravity + Jules →
Supabase (lead capture) →
Vercel (deploy) →
Transfer of access to client →
GA4 (basic setup)
```

### Scenario B — Growth Reactor ($6,500)

```
Full Core Unit +
Google Ads (MCC sub-account) →
GA4 conversions configured →
GTM (events) →
Microsoft Clarity (heatmaps) →
Deep Research (competitive analysis)
```

### Scenario C — Sovereign Ecosystem ($12,500+)

```
Full Growth Reactor +
GCP (Neural Engine) →
Jules + Gemini Pro (custom agents) →
NotebookLM (client business knowledge base) →
Resend (email automation) →
Flow/Whisk (generative content) →
Monthly reporting with Antigravity
```

---

## Tools Under Evaluation (Not active)

| Tool | Potential Use | Status |
|---|---|---|
| Zapier / Make | No-code automation for basic clients | Evaluating |
| Intercom | AI-powered site chat for Sovereign clients | Evaluating |
| Airtable | Client project management | Evaluating |
| Figma | UI mockups before development | Per-project only |

---

## Protocol for Onboarding a New Tool

Before adding a tool to the stack, validate:

1. Does it have an API or integration with our current stack?
2. Can the client be the owner, or are we always the intermediary?
3. Does it have a plan that scales with client volume?
4. Does it add unnecessary complexity to something that already works?

**Rule:** First try to solve with what you already have. Only add if there's no reasonable alternative.

---

*Document: Feb 2026 — Update with each tool onboarded or deprecated.*
