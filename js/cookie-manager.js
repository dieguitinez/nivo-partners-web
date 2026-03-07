/**
 * Nivo Partners - Cookie Consent Manager
 * Handles local storage consent and script execution for analytics.
 */

class CookieConsentManager {
    constructor() {
        this.consentKey = 'nivo_cookie_consent';
        this.consentGiven = localStorage.getItem(this.consentKey);
        this.bannerElement = null;
        this.analyticsScripts = [];
    }

    init() {
        // Collect scripts that require consent
        this.analyticsScripts = document.querySelectorAll('script[data-cookiecategory="analytics"]');

        // Wait for translations to load if using the translation system
        // setTimeout ensures it runs after initial DOM processing
        setTimeout(() => {
            if (this.consentGiven === 'all') {
                this.executeScripts();
            } else if (this.consentGiven === 'essential') {
                // Do not execute analytics scripts
            } else {
                this.renderBanner();
            }
        }, 500);
    }

    renderBanner() {
        const lang = localStorage.getItem('selectedLanguage') || 'en';

        // Use translation system if available, else fallback
        const t = window.translations && window.translations[lang] ? window.translations[lang].cookieBanner : {
            title: lang === 'en' ? "Privacy & Cookies" : "Privacidad y Cookies",
            message: lang === 'en' ? "We use essential cookies for site functionality and analytics cookies to optimize your experience." : "Usamos cookies esenciales para el funcionamiento del sitio y cookies de analítica para optimizar su experiencia.",
            acceptAll: lang === 'en' ? "Accept All" : "Aceptar Todas",
            decline: lang === 'en' ? "Decline Non-Essential" : "Rechazar No Esenciales"
        };

        const bannerHtml = `
            <div id="nivo-cookie-banner" class="cookie-glass-banner">
                <div class="cookie-banner-content">
                    <div class="cookie-icon"><i class="fas fa-shield-alt"></i></div>
                    <div class="cookie-text">
                        <h4>${t.title}</h4>
                        <p>${t.message}</p>
                    </div>
                </div>
                <div class="cookie-actions">
                    <button id="cookie-btn-decline" class="btn btn-outline small">${t.decline}</button>
                    <button id="cookie-btn-accept" class="btn btn-primary small">${t.acceptAll}</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', bannerHtml);
        this.bannerElement = document.getElementById('nivo-cookie-banner');

        // Animate in
        setTimeout(() => {
            this.bannerElement.classList.add('visible');
        }, 100);

        this.attachEventListeners();
    }

    attachEventListeners() {
        const acceptBtn = document.getElementById('cookie-btn-accept');
        const declineBtn = document.getElementById('cookie-btn-decline');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.handleConsent('all'));
        }
        if (declineBtn) {
            declineBtn.addEventListener('click', () => this.handleConsent('essential'));
        }
    }

    handleConsent(type) {
        // Save choice
        localStorage.setItem(this.consentKey, type);
        this.consentGiven = type;

        // Hide banner
        if (this.bannerElement) {
            this.bannerElement.classList.remove('visible');
            setTimeout(() => {
                this.bannerElement.remove();
            }, 500); // Wait for transition
        }

        // Execute conditional scripts if accepted
        if (type === 'all') {
            this.executeScripts();
        }
    }

    executeScripts() {
        this.analyticsScripts.forEach(script => {
            // Create a new script element to force execution
            const newScript = document.createElement('script');

            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }

            newScript.type = 'text/javascript';

            // Append and execute
            document.body.appendChild(newScript);
        });

        // Log action safely
        if (window.console) {
            console.log('Nivo Partners: Analytics scripts initialized.');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cookieManager = new CookieConsentManager();
    window.cookieManager.init();
});
