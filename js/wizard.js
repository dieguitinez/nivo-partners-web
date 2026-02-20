/**
 * Nivo Architecture Wizard
 * Handles the multi-step configuration flow for web infrastructure.
 */
class NivoArchitectureWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.selections = {
            niche: '',
            dna: '',
            experience: '',
            navigation: ''
        };
        this.containerId = 'architecture-wizard';
        this.init();
    }

    init() {
        this.renderStep(this.currentStep);
    }

    reRender() {
        if (this.currentStep <= this.totalSteps) {
            this.renderStep(this.currentStep);
        }
    }

    getTranslations() {
        const lang = localStorage.getItem('nivo_lang') || 'en';
        return translations[lang].webPage.wizard;
    }

    selectOption(step, value) {
        const keys = ['niche', 'dna', 'experience', 'navigation'];
        this.selections[keys[step - 1]] = value;

        if (this.currentStep < this.totalSteps) {
            this.nextStep();
        } else {
            this.showLoading();
        }
    }

    nextStep() {
        const wizardEl = document.getElementById(this.containerId);
        wizardEl.classList.add('fade-out');

        setTimeout(() => {
            this.currentStep++;
            this.renderStep(this.currentStep);
            wizardEl.classList.remove('fade-out');
            wizardEl.classList.add('fade-in');
            setTimeout(() => wizardEl.classList.remove('fade-in'), 500);
        }, 500);
    }

    renderStep(stepNum) {
        const t = this.getTranslations();
        const stepData = t.steps[`step${stepNum}`];
        const container = document.getElementById(this.containerId);

        let optionsHtml = stepData.options.map(opt => `
            <div class="wizard-option-card" onclick="window.nivoWizard.selectOption(${stepNum}, '${opt.id}')">
                <div class="option-label">${opt.label}</div>
                <div class="option-detail">${opt.detail}</div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="wizard-step-header">
                <div class="wizard-progress">0${stepNum} / 04</div>
                <h3 class="wizard-question">${stepData.q}</h3>
            </div>
            <div class="wizard-options-grid">
                ${optionsHtml}
            </div>
        `;
    }

    showLoading() {
        const t = this.getTranslations();
        const container = document.getElementById(this.containerId);
        container.innerHTML = `
            <div class="wizard-loading">
                <div class="loader-ring"></div>
                <p>${t.generating}</p>
            </div>
        `;

        setTimeout(() => {
            this.showResults();
        }, 2500);
    }

    showResults() {
        const t = this.getTranslations();
        const container = document.getElementById(this.containerId);

        // Prepare result strings based on selections
        const dnaLabel = this.getOptionLabel(2, this.selections.dna);
        const nicheLabel = this.getOptionLabel(1, this.selections.niche);
        const navLabel = this.getOptionLabel(4, this.selections.navigation);

        let resultTitle = t.result_title
            .replace('[NICHE]', nicheLabel);

        let resultDesc = t.result_desc
            .replace('[DNA]', dnaLabel)
            .replace('[NAV]', navLabel);

        container.innerHTML = `
            <div class="wizard-results animate-fade-in">
                <div class="blueprint-box">
                    <i class="fas fa-file-invoice blueprint-icon"></i>
                    <h3>${resultTitle}</h3>
                    <p>${resultDesc}</p>
                </div>
                <div class="wizard-cta-group">
                    <a href="#contact" class="btn btn-primary" onclick="window.nivoWizard.saveToContact()">${t.audit_cta}</a>
                </div>
            </div>
        `;
    }

    sanitize(text) {
        if (!text) return "";
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getOptionLabel(step, optionId) {
        const t = this.getTranslations();
        const stepData = t.steps[`step${step}`];
        if (!stepData) return optionId;
        const opt = stepData.options.find(o => o.id === optionId);
        return opt ? opt.label : optionId;
    }

    saveToContact() {
        // Prepare a summary for the contact form
        const summary = `Wizard Selection: ${JSON.stringify(this.selections)}`;
        localStorage.setItem('nivo_wizard_blueprint', summary);

        // Trigger the Sovereign CRM Modal
        if (window.nivoCRM) {
            window.nivoCRM.open();
            // Pre-fill segment based on wizard logic if possible
            const serviceField = document.getElementById('lead-service');
            if (serviceField) serviceField.value = 'web';

            const requirementsField = document.getElementById('lead-requirements');
            if (requirementsField) {
                const niche = this.getOptionLabel(1, this.selections.niche);
                const dna = this.getOptionLabel(2, this.selections.dna);
                requirementsField.value = `Architecture Blueprint Generated: ${this.sanitize(niche)} core with ${this.sanitize(dna)} DNA.`;
            }
        }
    }
}

// Initialize on DOM load if container exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('architecture-wizard')) {
        window.nivoWizard = new NivoArchitectureWizard();
    }
});
