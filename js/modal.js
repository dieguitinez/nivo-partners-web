class AgencyModal {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.isOpen = false;
        this.formData = {};
        this.init();
    }

    init() {
        // Inject Modal HTML if not exists
        if (!document.getElementById('agency-modal')) {
            this.createModal();
        }

        // Bind triggers
        document.querySelectorAll('a[href="#apply"], a[href="#audit"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Initialize translations for modal
        this.updateTexts();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'agency-modal';
        modal.className = 'modal-backdrop';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="window.agencyModal.close()"><i class="fas fa-times"></i></button>
                
                <div class="modal-header">
                    <h3 data-i18n="modal.title">Growth Infrastructure Audit</h3>
                    <p data-i18n="modal.subtitle">We only work with 3 new partners per quarter. Let's see if we're a match.</p>
                </div>

                <div class="modal-progress">
                    <div class="progress-bar" style="width: 33%"></div>
                </div>

                <form id="audit-form" onsubmit="return false;">
                    <!-- Step 1: About You -->
                    <div class="form-step active" data-step="1">
                        <h4 data-i18n="modal.step1">About You</h4>
                        <div class="input-group">
                            <label data-i18n="modal.labels.name">Full Name</label>
                            <input type="text" name="name" required placeholder="John Doe">
                        </div>
                        <div class="input-group">
                            <label data-i18n="modal.labels.email">Work Email</label>
                            <input type="email" name="email" required placeholder="john@company.com">
                        </div>
                        <div class="input-group">
                            <label data-i18n="modal.labels.website">Company Website</label>
                            <input type="url" name="website" placeholder="https://company.com (Optional)">
                        </div>
                        <button class="btn btn-primary btn-full" onclick="window.agencyModal.nextStep()" data-i18n="modal.next">Next Step</button>
                    </div>

                    <!-- Step 2: Metrics -->
                    <div class="form-step" data-step="2">
                        <h4 data-i18n="modal.step2">Your Goals</h4>
                        <div class="input-group">
                            <label data-i18n="modal.labels.revenue">Current Monthly Revenue</label>
                            <select name="revenue">
                                <option value="Startup" data-i18n="modal.options.rev1">< $10k/mo (Startup)</option>
                                <option value="Growth" selected data-i18n="modal.options.rev2">$10k - $50k/mo (Growth)</option>
                                <option value="Scaling" data-i18n="modal.options.rev3">> $50k/mo (Scaling)</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label data-i18n="modal.labels.interest">What process would you like to automate today?</label>
                            <input type="text" name="interest" placeholder="e.g. Lead Qualification, Customer Support, Outreach..." required>
                        </div>
                        <button class="btn btn-primary btn-full" onclick="window.agencyModal.nextStep()" data-i18n="modal.next">Next Step</button>
                    </div>

                    <!-- Step 3: Success -->
                    <div class="form-step" data-step="3">
                        <div class="success-view">
                            <div class="check-icon"><i class="fas fa-check-circle"></i></div>
                            <h3 data-i18n="modal.successTitle">Application Received</h3>
                            <p data-i18n="modal.successDesc">Our team is analyzing your digital infrastructure. If qualified, you will receive an invitation to a Strategy Call within 24 hours.</p>
                            <button class="btn btn-primary btn-full" onclick="window.agencyModal.close()" data-i18n="modal.close">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });
    }

    updateTexts() {
        const lang = localStorage.getItem('nivo_lang') || 'en';
        if (typeof switchLanguage === 'function') {
            // Re-run switchLanguage logic specifically for modal elements
            const elements = document.querySelectorAll('#agency-modal [data-i18n]');
            elements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);
                if (value) {
                    if (el.tagName === 'OPTION') el.text = value;
                    else el.textContent = value;
                }
            });
        }
    }

    open() {
        this.isOpen = true;
        document.getElementById('agency-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateTexts(); // Ensure language is correct on open
    }

    close() {
        this.isOpen = false;
        document.getElementById('agency-modal').classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => this.reset(), 300);
    }

    nextStep() {
        const currentStepEl = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const inputs = currentStepEl.querySelectorAll('input, select');
        let valid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                valid = false;
            }
        });

        if (valid) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateUI();

                // If it's the last step (success), trigger "submission"
                if (this.currentStep === 3) {
                    this.submitForm();
                }
            }
        }
    }

    updateUI() {
        document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
        document.querySelector(`.form-step[data-step="${this.currentStep}"]`).classList.add('active');

        // Update Progress Bar
        const progress = (this.currentStep / this.totalSteps) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
    }

    submitForm() {
        // Mock Submission
        console.log("Form Submitted");
        // Here you would send data to a backend
    }

    reset() {
        this.currentStep = 1;
        this.updateUI();
        document.getElementById('audit-form').reset();
    }
}

// Initialize
window.agencyModal = new AgencyModal();
