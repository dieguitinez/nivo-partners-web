# ♿ LEGAL-06 — Accessibility Statement: ADA & WCAG 2.1 Compliance

**Type:** Internal reference — corresponds to the public page at `/legal/ada.html`  
**Standard:** WCAG 2.1 Level AA  
**Last updated:** Feb 2026

---

## Conformance Status

Nivo Partners is **partially conformant** with WCAG 2.1 Level AA. This means that some content may not fully meet the standard. We are actively working to resolve known limitations outlined below.

---

## Practices Currently Implemented

| Area | Practice |
|---|---|
| Semantic HTML | Correct use of `<header>`, `<main>`, `<nav>`, `<footer>`, heading hierarchy |
| Color contrast | Minimum 4.5:1 ratio for body text, 3:1 for large text |
| Keyboard navigation | Tab order follows visual layout |
| Focus indicators | Visible `:focus` states on all interactive elements |
| Alt text | Descriptive `alt` attributes on all images |
| Responsive design | Content accessible on all screen sizes |
| Form labels | All inputs have associated `<label>` elements |
| Language declaration | `lang="en"` / `lang="es"` set on `<html>` element |

---

## Known Limitations

| Component | Issue | Status | Expected Resolution |
|---|---|---|---|
| Kai AI Chatbot | ARIA `role="dialog"` and `aria-live` not yet implemented | In progress | Q1 2026 |
| Revenue Core animation | Does not respect `prefers-reduced-motion` media query | In progress | Q1 2026 |
| Tab navigation on mobile menu | Focus trap not fully implemented | Planned | Q2 2026 |

---

## Compatible Assistive Technologies

This website is tested for compatibility with:

| Technology | Platform |
|---|---|
| NVDA + Chrome | Windows |
| VoiceOver + Safari | macOS, iOS |
| TalkBack + Chrome | Android |
| Keyboard-only navigation | All desktop browsers |

---

## Reporting an Accessibility Barrier

If you encounter a barrier accessing any content on our website:

**Email:** <accessibility@nivopartners.com>  
**Response time:** Within 3 business days  
**Include:** URL, description of the issue, assistive technology or browser used

We are committed to resolving accessibility issues within 30 days of receiving a valid report.

---

## Formal Complaint Procedure

If you are not satisfied with our response to an accessibility complaint, you may contact:

- **United States:** ADA National Network — 1-800-949-4232 / [adata.org](https://adata.org)
- **European Union:** Your country's national disability rights authority

---

## Technical Specifications

This website is built with:

- **HTML5** with semantic elements
- **CSS3** with custom properties (no vendor dependency for accessibility)
- **Vanilla JavaScript** (no heavy frameworks that block screen readers)
- **ARIA attributes** where applicable

No features require Flash, Java, or other browser plugins.

---

*Corresponds to: `/legal/ada.html` — Review every 6 months or when major site changes occur.*
