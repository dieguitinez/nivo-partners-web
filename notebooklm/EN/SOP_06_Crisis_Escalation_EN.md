# 🚨 SOP-06 — Crisis & Escalation Protocol: When Things Go Wrong

**Use:** Internal reference for any situation that risks client satisfaction, revenue, or reputation.  
**Owner:** Founding Partner (all Level 3+ decisions)  
**Last updated:** Feb 2026

---

> [!CAUTION]
> Speed of response matters more than perfection of response during a crisis. A fast, honest acknowledgment buys time. Silence kills trust.

---

## 🔴 Crisis Classification

### Level 1 — Minor (Operational issue, no client impact)

- Tool or platform temporarily unavailable
- Internal deadline missed by <24h (not yet visible to client)
- Minor bug discovered post-launch that doesn't affect functionality

**Response:** Self-resolve within 4 hours. Log the issue internally. No client communication required unless resolved outcome affects them.

---

### Level 2 — Moderate (Client-visible issue, reputational risk)

- Client site returns error or blank page
- Contact form not receiving submissions
- Campaign paused unexpectedly by Google
- Wrong content published on client site
- Client did not receive a deliverable on agreed date

**Response time:** Acknowledge within 1 hour. Resolve within 4–8 hours.

**Protocol:**

1. **Acknowledge immediately** via text/call to client: *"We're aware of [issue] and we're actively resolving it. We'll have a status update for you by [time]."*
2. **Diagnose** — identify root cause before telling the client what happened
3. **Resolve or implement workaround**
4. **Send recap email** once resolved: what happened, what was done, what prevents recurrence

**Do NOT:**

- Promise resolution times you can't meet
- Blame third-party tools to the client (Google, Vercel, etc.) before you've verified the cause
- Go silent for more than 2 hours on a visible issue

---

### Level 3 — Critical (Business impact, revenue risk, legal risk)

- Client site down for more than 2 hours during business hours
- Data breach or unauthorized access to client credentials
- Client disputes validity of ad spend invoices
- Client threatens legal action or chargeback
- Severely underperforming campaigns with no clear recovery path
- Loss of client's access to their Google Ads or GA4 account

**Response time:** Immediate — drop everything.

**Protocol:**

1. **Founding Partner takes direct control** — no delegation on Level 3
2. **Call the client within 30 minutes** — do not email only
3. **Document everything** in real-time: screenshots, timestamps, actions taken
4. **If legal risk:** Consult attorney before sending any written communication that could be used as admission of liability
5. **Resolution memo:** Send formal written summary within 24h of resolution

---

## 📋 Issue Log Template

Use this format when logging any Level 2+ issue:

```
DATE: [Date and time]
LEVEL: [1 / 2 / 3]
CLIENT: [Client name]
ISSUE: [1-2 sentence description]
DETECTED BY: [Self / Client / Monitoring]
ROOT CAUSE: [What actually caused it]
ACTIONS TAKEN:
  - [Timestamp] [Action taken]
  - [Timestamp] [Action taken]
RESOLVED AT: [Time]
TOTAL IMPACT: [How many hours / what was affected]
CLIENT COMMUNICATION:
  - [Timestamp] [What was communicated]
PREVENTION: [What we're changing to prevent recurrence]
```

---

## 🛡️ Preventive Monitoring

### What to monitor proactively

| Item | Method | Frequency |
|---|---|---|
| Client site uptime | Vercel dashboard / UptimeRobot (free) | Continuous |
| Google Ads campaign status | Daily login + email alerts enabled | Daily |
| GA4 data flowing | Check "Real-time" tab | Weekly |
| Lead capture working | Test form submission monthly | Monthly |
| Domain expiration | Check registrar renewal date | Monthly |
| SSL certificate expiration | Check browser padlock | Monthly |

### Google Ads Alert Setup (Required for every active client)

In Google Ads → Tools → Alerts, set up:

- Campaign paused (any reason)
- Budget depleted before end of day
- Significant conversion drop (>50% vs prior period)

---

## 💬 Client Communication Templates

### Template 1 — Initial Acknowledgment (Level 2)
>
> *"Hi [Name] — we're aware that [brief description of issue] is happening right now. We're actively looking into it and will have a full update for you by [time]. No action needed from your end."*

### Template 2 — Resolution Confirmation
>
> *"Hi [Name] — [Issue] has been resolved as of [time]. Here's a quick summary of what happened: [1-2 sentences]. What we've put in place to prevent a recurrence: [1 sentence]. Let me know if you have any questions."*

### Template 3 — Pre-Legal (Level 3 — DO NOT MODIFY without attorney review)
>
> *"We take this matter seriously and want to address your concerns directly. I'll call you within the next 30 minutes to discuss."*
> [Do not put anything else in writing until the call has happened and you understand the client's specific complaint.]

---

## 📞 Emergency Contact Protocol

| Situation | First action |
|---|---|
| Site down | Check Vercel status → contact provider support |
| Ads paused by Google | Check Google Ads billing → check policy violation flag → call Google Ads support |
| Domain expired | Contact domain registrar emergency support |
| Supabase error | Check Supabase status page → contact <support@supabase.io> |
| Suspected security breach | Change all associated passwords immediately → notify client → document everything |

---

*Document: Feb 2026 — Review after every Level 2+ incident and update templates based on what worked.*
