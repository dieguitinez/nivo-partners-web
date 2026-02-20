/**
 * Nivo Partners | Sovereign Lead Capture System
 * Manages the transition from conversion touchpoints to asynchronous neural storage.
 */

window.nivoCRM = {
    isOpen: false,
    config: {
        url: 'https://wagqcziphaxffghdwojb.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZ3FjemlwaGF4ZmZnaGR3b2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzODA3MTEsImV4cCI6MjA4Njk1NjcxMX0.RzdAAB-4i4VsG15Ot0dhi8Y0ruR2uOcRJsIv7atBcMI'
    },

    init() {
        this.injectModal();
        this.bindTriggers();
    },

    injectModal() {
        const modalHtml = `
            <div id="nivo-lead-modal" class="modal-backdrop">
                <div class="modal-container crm-modal animate-fade-in">
                    <button class="modal-close" onclick="window.nivoCRM.close()">&times;</button>
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="modal-badge" data-i18n="modal.badge">Strategic Audit Request</span>
                            <h2 data-i18n="modal.title">Initialize <span class="text-gradient">Revenue Core</span> Protocol</h2>
                            <p data-i18n="modal.subtitle">Configure your architectural requirements. Our architects will review your infrastructure within 24 hours.</p>
                        </div>
                        
                        <form id="nivo-lead-form" onsubmit="window.nivoCRM.handleSubmit(event)">
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="lead-name" data-i18n="modal.labels.name">Director / Lead Name</label>
                                    <input type="text" id="lead-name" name="name" placeholder="Name" required>
                                </div>
                                <div class="form-group">
                                    <label for="lead-email" data-i18n="modal.labels.email">Corporate Entity Email</label>
                                    <input type="email" id="lead-email" name="email" placeholder="email@company.com" required>
                                </div>
                                <div class="form-group">
                                    <label for="lead-company" data-i18n="modal.labels.company">Entity / Company Name</label>
                                    <input type="text" id="lead-company" name="company" placeholder="Company Name" required>
                                </div>
                                <div class="form-group">
                                    <label for="lead-service" data-i18n="modal.labels.service">Architecture Segment</label>
                                    <select id="lead-service" name="service">
                                        <option value="web" data-i18n="nav.services.web">Digital Architecture Deployment</option>
                                        <option value="performance" data-i18n="nav.services.marketing">High-Precision Yield Engineering</option>
                                        <option value="ai" data-i18n="nav.services.growth">Asynchronous Neural Protocols</option>
                                        <option value="full">Sovereign Ecosystem (Full Stack)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group full-width">
                                <label for="lead-requirements" data-i18n="modal.labels.requirements">Infrastructure Requirements / Context</label>
                                <textarea id="lead-requirements" name="requirements" rows="4" placeholder="Briefly describe your current revenue friction or growth targets..."></textarea>
                            </div>
                            <div class="form-footer">
                                <button type="submit" class="btn btn-primary full-width" data-i18n="modal.labels.button">Initialize Protocol Audit</button>
                                <p class="footer-note" data-i18n="modal.labels.note">Secure Transmission Active | Bank-Grade Encryption Verified</p>
                            </div>
                        </form>
                        
                        <div id="lead-success" class="success-state hidden">
                            <i class="fas fa-check-circle success-icon"></i>
                            <h3>Protocol Initialized</h3>
                            <p>Your institutional data has been transmitted to our strategic engine. An architect will contact you shortly to begin the sync.</p>
                            <button class="btn btn-secondary mt-1rem" onclick="window.nivoCRM.close()">Close Session</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Translate the freshly injected modal content
        if (typeof switchLanguage === 'function') {
            const lang = localStorage.getItem('nivo_lang') || 'en';
            switchLanguage(lang);
        }
    },

    bindTriggers() {
        // Find all buttons with btn-audit class or specific CTA patterns
        const triggers = document.querySelectorAll('.btn-audit, [href="#apply"], [data-i18n="nav.audit"], .hero-cta-group .btn-primary');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });
    },

    open() {
        const modal = document.getElementById('nivo-lead-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    },

    close() {
        const modal = document.getElementById('nivo-lead-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        // Reset form
        setTimeout(() => {
            const form = document.getElementById('nivo-lead-form');
            if (form) {
                form.classList.remove('hidden');
                form.reset();
                const banner = form.querySelector('.form-error-banner');
                if (banner) banner.remove();
            }
            document.getElementById('lead-success').classList.add('hidden');
        }, 300);
    },

    sanitize(text) {
        if (!text) return "";
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = "Transmitting to Revenue Core...";
        btn.disabled = true;

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = this.sanitize(value);
        });

        // created_at is handled by Supabase default now(), but we can send it explicitly
        data.created_at = new Date().toISOString();

        try {
            // Neural Pipeline Endpoint: Vercel Serverless Tunnel
            const response = await fetch('/api/process_audit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                let errorMessage = 'Transmission Failed';
                try {
                    const errorJson = await response.json();
                    errorMessage = `Server Error: ${errorJson.error || 'Unknown protocol error'}`;
                    if (errorJson.details) {
                        errorMessage += ` (${errorJson.details})`;
                    }
                } catch (e) {
                    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            // Success Transition
            form.classList.add('hidden');
            document.getElementById('lead-success').classList.remove('hidden');
            console.log("Neural Link Established: Audit ingested, emails dispatched by backend.");


            // Update success message with dynamic translation
            const lang = localStorage.getItem('nivo_lang') || 'en';
            // Fallback to English if translation key missing (safety check)
            const t = (translations[lang] && translations[lang].modal) ? translations[lang].modal : translations['en'].modal;

            const successMsg = document.querySelector('#lead-success p');
            if (successMsg) successMsg.innerHTML = t.successDesc;


        } catch (error) {
            console.error("Transmission Interrupted (Internal Log):", error);

            // Per user request: Suppress the red error banner.
            // We just reset the button so they can try again if it was a transient network issue.
            btn.innerText = "Retry Protocol Audit";
            btn.disabled = false;

            // Optional: Log to an internal monitoring endpoint if we had one
            // For now, console.error is sufficient for debugging.
        }
    }
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => window.nivoCRM.init());
