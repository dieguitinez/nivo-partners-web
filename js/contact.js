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
            <div id="nivo-lead-modal" class="modal-overlay">
                <div class="modal-container crm-modal animate-fade-in">
                    <button class="modal-close" onclick="window.nivoCRM.close()">&times;</button>
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="modal-badge">Strategic Audit Request</span>
                            <h2>Initialize <span class="text-gradient">Revenue Core</span> Protocol</h2>
                            <p>Configure your architectural requirements. Our architects will review your infrastructure within 24 hours.</p>
                        </div>
                        
                        <form id="nivo-lead-form" onsubmit="window.nivoCRM.handleSubmit(event)">
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="lead-name">Director / Lead Name</label>
                                    <input type="text" id="lead-name" name="name" placeholder="Name" required>
                                </div>
                                <div class="form-group">
                                    <label for="lead-email">Corporate Entity Email</label>
                                    <input type="email" id="lead-email" name="email" placeholder="email@company.com" required>
                                </div>
                                <div class="form-group">
                                    <label for="lead-company">Entity / Company Name</label>
                                    <input type="text" id="lead-company" name="company" placeholder="Company Name" required>
                                </div>
                                <div class="form-group">
                                    <label for="lead-service">Architecture Segment</label>
                                    <select id="lead-service" name="service">
                                        <option value="web">Digital Architecture Deployment</option>
                                        <option value="performance">High-Precision Yield Engineering</option>
                                        <option value="ai">Asynchronous Neural Protocols</option>
                                        <option value="full">Sovereign Ecosystem (Full Stack)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group full-width">
                                <label for="lead-requirements">Infrastructure Requirements / Context</label>
                                <textarea id="lead-requirements" name="requirements" rows="4" placeholder="Briefly describe your current revenue friction or growth targets..."></textarea>
                            </div>
                            <div class="form-footer">
                                <button type="submit" class="btn btn-primary full-width">Initialize Protocol Audit</button>
                                <p class="footer-note">Secure Transmission Active | Bank-Grade Encryption Verified</p>
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
            document.getElementById('nivo-lead-form').classList.remove('hidden');
            document.getElementById('lead-success').classList.add('hidden');
            document.getElementById('nivo-lead-form').reset();
        }, 300);
    },

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = "Transmitting to Revenue Core...";
        btn.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // created_at is handled by Supabase default now(), but we can send it explicitly
        data.created_at = new Date().toISOString();

        try {
            // Neural Pipeline Endpoint: Supabase REST API
            const response = await fetch(`${this.config.url}/rest/v1/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.config.key,
                    'Authorization': `Bearer ${this.config.key}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                let errorMessage = 'Transmission Failed';
                try {
                    const errorJson = await response.json();
                    // Identify common Supabase/PostgreSQL errors
                    if (errorJson.code === '42P01') {
                        errorMessage = 'Database Error: The "leads" table does not exist. Please run the SQL initialization script.';
                    } else if (errorJson.code === '23502') {
                        errorMessage = 'Validation Error: Missing required fields in the transmission.';
                    } else {
                        errorMessage = `Supabase Error: ${errorJson.message || errorJson.hint || 'Unknown protocol error'}`;
                    }
                } catch (e) {
                    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            // Success Transition
            form.classList.add('hidden');
            document.getElementById('lead-success').classList.remove('hidden');

            // Optional: Track conversion
            console.log("Protocol Sync Complete: Lead archived in Sovereign Storage.");

        } catch (error) {
            console.error("Transmission Interrupted:", error);
            btn.innerText = "Retry Protocol Audit";
            btn.disabled = false;

            // Show detailed error to help the user debug
            const errorBanner = document.createElement('div');
            errorBanner.className = 'form-error-banner';
            errorBanner.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${error.message}`;

            // Remove existing error banners
            const existing = form.querySelector('.form-error-banner');
            if (existing) existing.remove();

            form.insertBefore(errorBanner, form.firstChild);
        }
    }
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => window.nivoCRM.init());
