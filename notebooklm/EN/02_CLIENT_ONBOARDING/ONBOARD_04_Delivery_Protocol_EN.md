# 🚀 Delivery Protocol — Nivo Partners

**Purpose:** Standardize how Nivo delivers projects to guarantee a premium experience and clean ownership transfer.
**Applies to:** All projects (Core Unit, Growth Reactor, Sovereign Ecosystem)

---

> [!IMPORTANT]
> Delivery is the most important moment in the client relationship. It's not the end of the project — it's the beginning of a long-term relationship. Execute every step with the same level of attention as development.

---

## Pre-Delivery Phase (3–5 days before deploy)

### Internal technical checklist

- [ ] Code reviewed and clean (no console.logs, no orphaned variables)
- [ ] Site tested on Chrome, Safari, Firefox, and Edge
- [ ] Fully responsive on mobile, tablet, and desktop
- [ ] Lead capture form tested and connected to Supabase (data arriving)
- [ ] Kai working correctly (complete node flow)
- [ ] GA4 firing events correctly (verify in DebugView)
- [ ] Page load speed <2.5s on Lighthouse (mobile)
- [ ] Basic SEO: title tags, meta descriptions, sitemap.xml, robots.txt
- [ ] SSL active (HTTPS)
- [ ] No broken links (404s)
- [ ] Client domain pointing to Vercel (DNS verified)

### Prepare client deliverables

- [ ] **Credentials Document** (template): list of all accounts created with access
- [ ] **Video Walkthrough** (5–10 min): Loom recording of the complete site with all features
- [ ] **Project README** on GitHub: what each file does, how to make basic changes
- [ ] **GA4 Brief**: how to read the dashboard, which metrics matter

---

## The Delivery Call (60–90 minutes)

This is the most important call in the process. Done LIVE with screen sharing.

### Call Agenda

```
[00:00–05:00]  Opening
  → Context: "Today is the day your infrastructure goes live."
  → Expectations: "By the end of this call, you have all access and I don't."

[05:00–25:00]  Site Walkthrough
  → Complete tour of the site from the visitor's perspective
  → Form demo (fill one out live → show it arrives in the CRM)
  → Kai demo (complete interaction of a potential lead)
  → Mobile review

[25:00–45:00]  Live Access Transfer
  → GitHub repo: transfer to client's account (or add as owner)
  → Vercel: transfer domain or add as team member
  → Supabase: verify client has admin access
  → GA4: verify client has admin access
  → Google Search Console: verify property

[45:00–60:00]  "How to use your infrastructure"
  → How to view leads in Supabase
  → How to read GA4 (basic dashboard)
  → How to make simple text changes in the code (for technical clients)
  → Who to call if something doesn't work (Nivo SLA)

[60:00–75:00]  Q&A and next steps
  → Is there anything you'd like to revisit?
  → Present the next evolution (if applicable): "Now that you have the foundation, the natural next step is..."
  → Agree on the 30-day check-in
```

---

## Ownership Transfer — Step-by-Step Guide

### GitHub

1. Go to `Settings → Danger Zone → Transfer Repository`
2. Enter the client's GitHub username
3. Confirm the transfer
4. Client accepts from their account
5. ✅ Nivo is no longer the owner. The client has the code.

### Vercel

**Option A (recommended):** Client creates their free Vercel account, Nivo does the deploy from their own account and then transfers the project.

1. Project settings → Transfer Project → enter client email
2. Client accepts, connects their credit card if applicable

**Option B:** Nivo adds the client as "Owner" of the Vercel team and then Nivo exits.

### Supabase

1. If the project was created in Nivo's account: `Settings → Team → Invite` the client as Owner
2. If it was created in the client's account from the start: verify they have full access
3. Ensure the API key the site uses is in the client's environment, not hardcoded in the code

### Domain

- The domain must always be in the client's account (Namecheap, GoDaddy, Google Domains, etc.)
- Nivo only configures DNS. Domain management is never charged.
- If the client doesn't have a domain and Nivo provisionally purchased one: transfer before delivery.

---

## Credentials Document (Template)

```
PROJECT: [Client name]
DELIVERY DATE: [Date]
DELIVERED BY: Nivo Partners, LLC

ACCESS DELIVERED:
---
GitHub Repository: https://github.com/[user]/[repo]
  → Login: client's account
  → Main branch: main

Vercel (Hosting):
  → Project URL: https://[project].vercel.app
  → Custom domain: https://[domain.com]
  → Login: client's account

Supabase (Database):
  → Project URL: https://[id].supabase.co
  → Login: client's account
  → Leads table: 'leads' (see columns documented in README)

Google Analytics 4:
  → Measurement ID: G-XXXXXXXXXX
  → Access: admin in client's account

Google Search Console:
  → Verified property: https://[domain.com]
  → Access: client's account

ADDITIONAL NOTES:
[Any credential, API key, or special configuration the client must keep]

---
THIS DOCUMENT IS CONFIDENTIAL.
Store in a secure place. Do not share by email without encryption.
```

---

## Post-Delivery: The First 30 Days

### Week 1 post-deploy

- [ ] Send check-in email: "How's everything going? Have the first leads arrived?"
- [ ] Verify GA4 is still reporting (sometimes browsers block it)
- [ ] Confirm that lead capture emails are arriving in the client's correct inbox

### Day 30

- [ ] 30-minute check-in call
- [ ] Review captured leads: how many came in? how many closed?
- [ ] Identify if anything needs adjustment
- [ ] If results are positive → open conversation about Revenue Engine (Ecosystem 2)

### Post-Delivery Support SLA

- **Critical bugs (site down, leads not arriving):** Response in <4 hours, resolution in <24 hours
- **Minor adjustments (text, color, image):** Response in <24 hours, resolution in <48 hours
- **New features:** Outside SLA — separate quote

> [!NOTE]
> The support SLA applies for the first 30 days post-delivery at no additional cost. After that, the optional maintenance retainer is activated ($350–500/month).

---

*Document: Feb 2026 — Update with each iteration of the delivery process.*
