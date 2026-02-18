document.addEventListener('DOMContentLoaded', () => {
    console.log('Nivo Partners Interface Loaded');

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Growth Simulator Logic
    function updateGrowthSimulator() {
        const budgetInput = document.getElementById('budget-slider');
        const revenueInput = document.getElementById('current-revenue-slider');

        // Safety check
        if (!budgetInput || !revenueInput) return;

        const budget = parseInt(budgetInput.value);
        const currentRevenue = parseInt(revenueInput.value);

        // Update labels
        const budgetDisplay = document.getElementById('budget-value');
        const revenueDisplay = document.getElementById('current-revenue-value');

        if (budgetDisplay) budgetDisplay.textContent = `$${budget.toLocaleString()}`;
        if (revenueDisplay) revenueDisplay.textContent = `$${currentRevenue.toLocaleString()}`;

        // Logic: 
        // 1. Efficiency Gain (Base): Current Revenue * 0.25 (25% boost from optimization)
        // 2. Ad Impact: Budget * 3.5 (Conservative 3.5 ROAS)
        // Total = Current + Efficiency + Ad Impact
        const efficiencyGain = currentRevenue * 0.25;
        const adImpact = budget * 3.5;
        const totalProjected = currentRevenue + efficiencyGain + adImpact;

        // Est Leads (assuming $50 CPL avg)
        const estLeads = Math.floor(budget / 50);

        const leadsDisplay = document.getElementById('leads-value');
        const resultDisplay = document.getElementById('revenue-value');

        if (leadsDisplay) leadsDisplay.textContent = estLeads.toLocaleString();
        if (resultDisplay) resultDisplay.textContent = `$${totalProjected.toLocaleString()}`;

        // Color/Gradient Updates
        updateSliderBackground(budgetInput);
        updateSliderBackground(revenueInput);
    }

    function updateSliderBackground(slider) {
        if (!slider) return;
        const max = parseInt(slider.max);
        const val = parseInt(slider.value);
        const progress = (val / max) * 100;
        slider.style.background = `linear-gradient(90deg, var(--accent-blue) ${progress}%, rgba(255,255,255,0.1) ${progress}%)`;
    }

    const budgetSlider = document.getElementById('budget-slider');
    const revenueSlider = document.getElementById('current-revenue-slider');

    if (budgetSlider && revenueSlider) {
        budgetSlider.addEventListener('input', updateGrowthSimulator);
        revenueSlider.addEventListener('input', updateGrowthSimulator);
        // Init
        updateGrowthSimulator();
    }

    // 3D Tilt Effect (Vanilla JS)
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to card center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Set CSS variables
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });

        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--x', `0px`);
            card.style.setProperty('--y', `0px`);
        });
    });

    // Reveal on scroll logic (Simple IntersectionObserver)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(el => observer.observe(el));

    // Lightbox Logic
    window.openLightbox = function (src) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (!lightbox || !lightboxImg) return;

        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        // Small delay to allow display:flex to apply before adding active class for opacity transition
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    window.closeLightbox = function () {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300); // Match transition duration
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeLightbox();
    });

    // Initialize Language
    const currentLang = localStorage.getItem('nivo_lang') || 'en';
    switchLanguage(currentLang);
});

function switchLanguage(lang) {
    if (!translations[lang]) return;

    // Save preference
    localStorage.setItem('nivo_lang', lang);

    // Update active class in switcher
    const spans = document.querySelectorAll('.lang-switch span');
    spans.forEach(span => {
        if (span.textContent.toLowerCase() === lang) {
            span.classList.add('active');
        } else if (span.classList.contains('active')) {
            span.classList.remove('active');
        }
    });

    // Update text content for static elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);

        if (value) {
            // Check if element has HTML content (like <span> or <br>)
            if (value.includes('<') && value.includes('>')) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        }
    });

    // Update placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);
        if (value) {
            el.placeholder = value;
        }
    });

    // Notify Chat Widget if available
    if (window.agChat) {
        window.agChat.updateLanguage(lang);
    }

    // Notify Wizard if available
    if (window.nivoWizard) {
        window.nivoWizard.reRender();
    }

    // Dynamic List Population for Growth Card
    const growthBullets = document.getElementById('growth-bullets');
    const growthExamples = document.getElementById('growth-examples');

    if (growthBullets && translations[lang]?.paths?.growth?.bullets) {
        growthBullets.innerHTML = translations[lang].paths.growth.bullets
            .map(item => `<li>${item}</li>`)
            .join('');
    }

    if (growthExamples && translations[lang]?.paths?.growth?.examples) {
        growthExamples.innerHTML = translations[lang].paths.growth.examples
            .map(item => `<li>${item}</li>`)
            .join('');
    }
}
