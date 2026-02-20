# 🏛️ ORG-01 — Division Architecture of Nivo Partners, LLC

**Version:** 1.0 — Feb 2026  
**Type:** Internal Organizational Document  
**Access:** Founders · Authorized Partners · Division Directors

---

> [!IMPORTANT]
> This document defines the **internal operational structure** of Nivo Partners, LLC. The three divisions described here are independent business units operating under the same legal entity. Each division has its own value proposition, tech stack, client archetypes, and revenue model. When any of them generates sufficient revenue to justify it, they can be established as an independent DBA (Doing Business As) without needing a new LLC.

---

## Why We Structured the Firm as 3 Divisions

Nivo Partners is not a generalist agency. We are a revenue infrastructure firm with three specialized capabilities. Each capability requires:

- A different talent profile
- Different tools
- Clients with different problems
- A different sales cycle

Operating under a single brand without clear internal structure creates confusion for clients, employees, and partners. This document gives each division its operational identity.

---

## Contrast with Existing Documentation

> [!NOTE]
> The 3 divisions already existed implicitly in our documentation — but as **products** (outward-facing) rather than **operating units** (inward-facing). This document formalizes them internally.

| Where they appeared before | External name (product) | Internal name (division) |
|---|---|---|
| `DECK_01` — Slides 4 & 5 | Digital Authority | Division of Digital Architecture |
| `DECK_01` — Slides 4 & 5 | Revenue Engine | Division of Commercial Performance |
| `DECK_01` — Slides 4 & 5 | Intelligent Ecosystem | Division of Operational Intelligence |
| `MODULE_12` — DEC-006 | Web Infrastructure | Division of Digital Architecture |
| `MODULE_12` — DEC-006 | Performance Marketing | Division of Commercial Performance |
| `MODULE_12` — DEC-006 | AI Infrastructure | Division of Operational Intelligence |

---

## Corporate Structure

```
Nivo Partners, LLC (Root Entity — Florida)
│
├── Division I:  Digital Architecture
│   └── (Future DBA: "Nivo Studio" or "Nivo Digital")
│
├── Division II: Commercial Performance
│   └── (Future DBA: "Nivo Growth" or "Nivo Reach")
│
└── Division III: Operational Intelligence
    └── (Future DBA: "Nivo Intelligence" or "Nivo Core")
```

**Current legal model:** Single LLC. Three internal units. No additional filing required today.
**Evolution:** When a division generates >$10k/month sustained revenue for 3 months, a DBA is evaluated.

---

## Division I — Digital Architecture

**Internal name:** Division of Digital Architecture  
**External name (product):** Digital Authority  
**Mantra:** *"Your digital presence as a commercial asset, not an expense."*

### What it does

Designs and implements the client's high-fidelity digital infrastructure. This includes:

- High-conversion websites (landing pages, service pages, premium portfolios)
- Digital brand identity (visual architecture, not commodity graphic design)
- Lead capture infrastructure (Kai, forms, CRM)
- Technical stack integration (Supabase, Vercel, GCP)
- Secure delivery via GitHub → Vercel with ownership transfer to the client

### Technology Stack

| Tool | Purpose | Source |
|---|---|---|
| **Antigravity (Google)** | Agentic development and documentation | Gemini Pro Suite |
| **Gemini Code Assist** | Copilot for any technical contractor | Gemini Pro Suite |
| **Jules** | Async code tasks (refactors, QA) | Gemini Pro Suite |
| **Vercel** | Edge deployment and hosting | External |
| **GitHub** | Version control and client delivery | External |
| **Supabase** | Database with RLS (client-owned) | External |
| **Google Drive (2TB)** | Client asset repository | Gemini Pro Suite |

### Client Archetypes

| Archetype | Hook | Typical Tier |
|---|---|---|
| High-ticket Spa / Med-Spa | *"Your service is luxury. Your website should be too."* | Core Unit ($3,500) |
| Premium Builder / Remodeling | *"Your portfolio is worth millions. Does your presence reflect that?"* | Core Unit or Growth Reactor |
| Aesthetic Practice / Dentistry | *"Your reputation: years. Your online perception: 3 seconds."* | Core Unit ($3,500) |
| Attorney / Premium Professional | Authority + credibility at the first digital touchpoint | Core Unit ($3,500) |

### Revenue Model

| Tier | Price | Contents |
|---|---|---|
| Core Unit | ~$3,500 (one-time) | Landing + Kai + Lead Capture + Deploy |
| Expansion | +$1,500–2,500 | Additional pages, integrations |
| Maintenance Retainer | $350–500/month | Updates, performance, hosting |

---

## Division II — Commercial Performance

**Internal name:** Division of Commercial Performance  
**External name (product):** Revenue Engine  
**Mantra:** *"Every dollar invested in ads, traceable to the client that closed."*

### What it does

Designs and operates high-precision client acquisition systems. This includes:

- Google Ads calibrated for real purchase intent (not vanity traffic)
- Conversion optimization — improving existing sites without touching core code
- Pre-campaign competitive Deep Research
- Financial ROI tracking down to closed revenue (GA4 + Supabase)
- Copy engineering for ads and landing pages

### Technology Stack

| Tool | Purpose | Source |
|---|---|---|
| **Gemini Deep Research** | Competitive intelligence before each campaign | Gemini Pro Suite |
| **Google Search + Search Labs** | Search intent research | Gemini Pro Suite |
| **Gemini in Docs/Gmail** | Copy drafting and client communication | Gemini Pro Suite |
| **Google Ads** | Paid acquisition platform | External |
| **GA4 + Microsoft Clarity** | Behavior and conversion tracking | External |
| **NotebookLM** | Campaign knowledge base (what worked) | Gemini Pro Suite |

### Client Archetypes

| Archetype | Hook | Typical Tier |
|---|---|---|
| Existing business with non-converting ads | *"Spending on ads but don't know how many clients it generates?"* | Growth Reactor ($6,500) |
| Spa / Dental with digital presence but no leads | Conversion audit + ads | Growth Reactor |
| Premium HVAC with seasonal volume | High volume, short cycle, urgency | Growth Reactor or add-on |

### Revenue Model

| Tier | Price | Contents |
|---|---|---|
| Growth Reactor | ~$6,500 (setup) | Audit + Google Ads Config + GA4 + 30 days optimization |
| Performance Retainer | $800–1,500/month | Active campaign management + monthly ROI reports |
| Deep Research Add-on | +$500 | Monthly competitive industry report |

---

## Division III — Operational Intelligence

**Internal name:** Division of Operational Intelligence  
**External name (product):** Intelligent Ecosystem (Elite)  
**Mantra:** *"Stop renting labor. Start owning intelligence."*

### What it does

Designs and implements proprietary AI and automation systems installed in the client's business. This includes:

- **Kai / Custom Chatbots:** Conversational agents trained on the business's knowledge
- **Prospect Intelligence Engine:** System that qualifies leads automatically before anyone picks up the phone
- **Review Guardian:** Automated monitoring and management of reviews on Google/Yelp/Healthgrades
- **Smart Inbox / Email Automation:** Automated follow-up sequences with real personalization
- **Advanced web tracking:** Heatmaps, session recordings, user behavior analysis
- **Internal operational flow automation:** Notifications, reports, repetitive tasks

> [!IMPORTANT]
> **Intellectual Property:** The prompts, decision trees, qualification algorithms, and automation flows designed by Nivo are the exclusive property of Nivo Partners, LLC. The client receives the **functional installed system** but not the source code of proprietary algorithms. (See IP clause in `ONBOARD_01_Welcome_Kit.md`)

### Technology Stack

| Tool | Purpose | Source |
|---|---|---|
| **Jules (Google)** | Async agent — code automation and scripts | Gemini Pro Suite |
| **Gemini 3.1 Pro** | Base LLM for client AI agents | Gemini Pro Suite |
| **Gemini in Gmail** | Response automation and follow-ups | Gemini Pro Suite |
| **Whisk + Flow** | Visual/video content generation for AI-tier clients | Gemini Pro Suite |
| **NotebookLM (×5)** | Knowledge base per client | Gemini Pro Suite |
| **Antigravity** | Construction and deployment of custom agents | Gemini Pro Suite |
| **GCP (Google Cloud)** | Processing infrastructure for neural engines | External |
| **Supabase** | Prospect and activity database (client-owned) | External |
| **Resend** | Transactional automated email infrastructure | External |

### Client Archetypes

| Archetype | Hook | Typical Tier |
|---|---|---|
| Business with >100 leads/month they can't follow up | *"How many leads die from lack of follow-up?"* | Sovereign ($12,500+) |
| Spa or clinic with vulnerable review system | Reputation protection + automation | Sovereign or add-on |
| Company with expensive manual repetitive operations | Automation of high human-cost tasks | Sovereign |
| Existing Division I or II client who wants to scale | Natural upsell: they already trust, they already have the base | Sovereign |

### Revenue Model

| Tier | Price | Contents |
|---|---|---|
| Sovereign Ecosystem | $12,500+ (setup) | Neural Engine + 3 agents + Full automation |
| Intelligence Retainer | $1,500–2,500/month | Operation, monitoring, and system evolution |
| Extra agent add-on | +$2,000–3,500 | One additional agent (Inbox, Guardian, etc.) |

---

## Consolidated Firm Revenue

```
                PROJECTED ANNUAL REVENUE (Year 1)
                
Division I  (Digital Architecture)
  4 clients/month × $3,500 = $14,000/month
  + Retainers ($400/month × 20 accumulated clients) = $8,000/month
  Annual Total: ~$264,000

Division II (Commercial Performance)
  2 clients/month × $6,500 setup = $13,000/month setup
  + Retainers ($1,000/month × 10 clients) = $10,000/month
  Annual Total: ~$276,000

Division III (Operational Intelligence)
  1 client/month × $12,500 setup = $12,500/month setup
  + Retainers ($2,000/month × 5 clients) = $10,000/month
  Annual Total: ~$270,000

FIRM TOTAL (Year 1, conservative): ~$810,000
```

---

## Client Transfer Protocol Between Divisions

```
NEW CLIENT
    ↓
Division I: Digital Architecture (Core Unit)
    ↓ (60-90 days later, once the site has traffic)
Division II: Commercial Performance (Growth Reactor)
    ↓ (90-180 days later, once lead volume justifies it)
Division III: Operational Intelligence (Sovereign Ecosystem)
```

**Rule:** The Account Manager detects readiness signals and generates the upsell brief. Never offer the next division without data that justifies the conversation.

---

*Document created: Feb 19, 2026. Next review: when Division I exceeds 5 active retainer clients.*
