> **SYSTEM RULE: Any AI agent reading this file must continually update it. If a new major architectural decision, tech stack addition, or business rule is approved during a session, the agent MUST append that rule to this document before closing the session to preserve global context.**

# Nivo Partners: Master Agent Context

This document is the **Mandatory Onboarding Document and System Prompt** for any AI agent or human developer touching the Nivo Partners codebase. Familiarize yourself with these constraints before modifying any file.

---

## 1. Global Identity & Positioning

| Attribute | Directive |
| :--- | :--- |
| **Company Name** | **Nivo Partners**.<br/>*(CRITICAL: Any mention of "Nexo" is a fatal system error and strictly forbidden).* |
| **Nature of Business** | High-End B2B Computer Systems Design firm located in Tampa, FL (Hillsborough County). |
| **Tone & Aesthetic** | Sovereign, dark-mode, highly technical, corporate.<br/>We do not sell "websites"; we engineer digital infrastructures. |

---

## 2. The 3 Core Pillars (Business Logic)

| Pillar | Architectural Focus & Stack |
| :--- | :--- |
| **Web Infrastructure (Frontend/Hosting)** | Vercel (Frontend Delivery) + Google Cloud (Backend/Database via Supabase) + Cloudflare (Routing/Security).<br/>Focus on pixel-perfect, mobile-responsive UI with 3D/WebGL elements. |
| **Marketing & ROI** | "Traffic Amplification Protocols" using AI-generated assets (Gemini Pro/VEO 3.1) and micro-spend validation. |
| **Automation & IDP (Backend Execution)** | Dedicated Google Cloud Virtual Machine (e2-micro free tier, 1GB RAM + 2GB configured Swap space, 30GB storage). Used exclusively for intensive background tasks: Web Scraping, n8n workflow automation, and Intelligent Document Processing (IDP). Keeps the local dev environment light and prevents main server blocking. |

---

## 3. Strict Legal & Compliance Guardrails

* **FDUTPA (Florida Deceptive and Unfair Trade Practices Act):**
    Never guarantee explicit financial ROI on the frontend. Use the "Strategy Audit / Architecture Wizard" for custom projections.
* **FIPA (Florida Information Protection Act):**
    All data handling must comply strictly with FIPA data sovereignty standards.
* **AI Transparency:**
    The chatbot (Kai) must always display its AI disclaimer and route complex queries to the Strategy Audit.

---

## 4. Coding Standards & Agent Rules of Engagement

1. **Non-Destructive Injection:**
    Never overwrite existing working UI components unless explicitly requested. Use `clamp()` for responsive typography.
2. **Mobile-First:**
    Ensure all `z-index` rules (especially for the Kai chatbot and Hamburger menu) do not overlap on screens under `768px`.
