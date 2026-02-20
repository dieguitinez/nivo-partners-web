> **SYSTEM RULE: Any AI agent reading this file must continually update it. If a new major architectural decision, tech stack addition, or business rule is approved during a session, the agent MUST append that rule to this document before closing the session to preserve global context.**

# Nivo Partners: Master Agent Context

This document is the **Mandatory Onboarding Document and System Prompt** for any AI agent or human developer touching the Nivo Partners codebase. Familiarize yourself with these constraints before modifying any file.

---

## 1. Global Identity & Positioning

| Attribute | Directive |
| :--- | :--- |
| **Company Name** | **Nivo Partners**.<br/>*(CRITICAL: Any mention of "Nexo" is a fatal system error and strictly forbidden).* |
| **Nombre de la Empresa** | **Nivo Partners**.<br/>*(CRÍTICO: Cualquier mención de "Nexo" es un error fatal y está estrictamente prohibido).* |
| **Nature of Business** | High-End B2B Computer Systems Design firm located in Tampa, FL (Hillsborough County). |
| **Tone & Aesthetic** | Sovereign, dark-mode, highly technical, corporate.<br/>We do not sell "websites"; we engineer digital infrastructures. |

---

## 2. The 3 Core Pillars (Business Logic)

| Pillar | Architectural Focus & Stack |
| :--- | :--- |
| **Web Infrastructure** | Vercel + Gemini 2.5 Flash + Cloudflare + Supabase. Native `generateContent` API for hybrid intelligence. |
| **Marketing & ROI** | "Traffic Amplification Protocols" (AI VEO/Gemini 2.5) + Micro-spend validation. |
| **Automation & IDP** | Dedicated GCP VM (e2-micro) for Scrapers & n8n workflow processing. |

---

## 3. Recent Architectural Decisions (Feb 2026)

* **Gemini 2.5 Flash Migration:** The core AI (Kai) was migrated from Pro to **Gemini 2.5 Flash** using the `@google/genai` SDK and the `generateContent` method for superior stability and lower latency in chat-style interactions.
* **Telemetry Isolation:** The `Resend` service for out-of-scope (OOS) alerts was refactored to initialize inside functions rather than at the module level to prevent 500 errors on Vercel when API keys are missing.
* **Gold Accent Branding:** The primary brand asset is now the **NP Minimalist Gold Accent** logo (`images/favicon.png`), applied across all headers and footers.
* **Icon Stability:** Scripts from FontAwesome kit were replaced by a stable CSS CDN (`cdnjs`) to bypass CORS and script-blocking issues.

---

## 4. Strict Legal & Compliance Guardrails

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
