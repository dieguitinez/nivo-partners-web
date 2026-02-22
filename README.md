# Nivo Partners | Digital Architecture Infrastructure

Nivo Partners engineers sovereign digital infrastructure for B2B leaders. This repository contains the high-end web architecture and AI-augmented protocols that power the Nivo ecosystem.

## 🏗 System Architecture

The platform is built on a **Neural-Native Stack** designed for speed, security, and data sovereignty:

- **Frontend:** Vanilla HTML5/CSS3/JS (No-framework, zero-bloat approach).
- **Styling:** Custom "Prestige Glass" design system via CSS variables.
- **Cognitive Layer:** Gemini 2.5 Flash via Vercel Serverless Functions.
- **Data Persistence:** Supabase (Sovereign PostgreSQL with RLS).
- **Communication:** Resend API for transactional intelligence notifications.
- **Intelligence Host:** Vercel Edge/Serverless Infrastructure.

## 🛡 Security & Compliance

- **FDUTPA & FIPA:** Architected to comply with Florida Information Protection and Deceptive Trade Practices acts.
- **Sovereignity:** All code and data are strictly client-owned.
- **Hardened API:** Centralized CORS and Sanitization utilities (`api/utils/security.js`).
- **Data Privacy:** Local-only NotebookLM for institutional knowledge protection.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Vercel CLI (Optional but recommended)

### Environment Setup

1. Copy `.env.example` to `.env.local`.
2. Populate the required keys (Gemini, Supabase, Resend).

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npx serve .
# OR use Vercel Dev
vercel dev
```

## 📂 Project Structure

- `/api`: Vercel Serverless Functions (Cognitive & Operational nodes).
- `/css`: Styles and design system tokens.
- `/js`: Frontend logic and i18n translation engine.
- `/services`: Deep-dive infrastructure service pages.
- `/legal`: Compliance documentation.
- `/notebooklm`: Institutional knowledge base (LOCAL ONLY).

## 📊 Monitoring & Maintenance

- **Diagnostics:** `/api/diag` and `/api/ping` (Authorized origins only).
- **Leads:** Managed via Supabase Dashboard.
- **Telemetry:** In-scope/OOS queries are logged via Resend telemetry.
