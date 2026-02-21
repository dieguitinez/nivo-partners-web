document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Dropdown Toggle on Mobile
        const dropdownToggles = document.querySelectorAll('.has-dropdown > .dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const isMobile = window.innerWidth <= 768;
                if (isMobile) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parent = toggle.parentElement;
                    parent.classList.toggle('active');

                    // FORCE REFLOW: Fixes centering/alignment glitches on some mobile browsers
                    // by forcing the browser to recalculate the layout of the sub-menu.
                    if (parent.classList.contains('active')) {
                        const menu = parent.querySelector('.dropdown-menu');
                        if (menu) {
                            menu.style.display = 'none';
                            menu.offsetHeight; // trigger reflow
                            menu.style.display = 'flex';
                        }
                    }
                }
                // On desktop, the <a> with href="#" still allows hover or simple click fallback
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileBtn.classList.remove('active');
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
    window.switchLanguage = switchLanguage;
    switchLanguage(currentLang);
});

/**
 * Update translations for a specific section only
 * Prevents full DOM re-translation when only a part needs update
 */
window.updateSectionTranslations = function (containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const lang = localStorage.getItem('nivo_lang') || 'en';
    if (!translations[lang]) return;

    const elements = container.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);
        if (value) el.innerHTML = value;
    });

    const placeholders = container.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);
        if (value) el.placeholder = value;
    });
};

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
    // CRITICAL FIX: Save Three.js canvas before DOM translation.
    // switchLanguage uses el.innerHTML which destroys the WebGL canvas context
    // when any ancestor element with data-i18n gets its innerHTML replaced.
    const twinVisualizer = document.getElementById('twin-visualizer');
    const twin3DActive = twinVisualizer && twinVisualizer.classList.contains('active');
    const savedCanvas = twin3DActive ? twinVisualizer.querySelector('canvas') : null;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[lang]);

        if (value) {
            // SPECIAL CASE: Prevent overwriting nodes that contain critical animation elements
            // if the element has children and we only want to translate text nodes, OR
            // if it's the 3D switcher, we use updateSectionTranslations logic
            if (el.classList.contains('visual-engine-badge')) {
                // The badge has an <i> icon we don't want to lose
                const span = el.querySelector('span');
                if (span) span.innerHTML = value;
                else el.innerHTML = value;
            } else {
                el.innerHTML = value;
            }
        }
    });

    // Restore the Three.js canvas after DOM translation if it was active
    if (twin3DActive && savedCanvas && twinVisualizer && !twinVisualizer.contains(savedCanvas)) {
        twinVisualizer.appendChild(savedCanvas);
        if (window.twinEngine && window.twinEngine.initialized && window.twinEngine.renderer) {
            const w = twinVisualizer.clientWidth;
            const h = twinVisualizer.clientHeight;
            window.twinEngine.renderer.setSize(w, h);
            window.twinEngine.camera.aspect = w / h;
            window.twinEngine.camera.updateProjectionMatrix();
        }
    }

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

    const growthExamples = document.getElementById('growth-examples');
    if (growthExamples && translations[lang]?.paths?.growth?.examples) {
        growthExamples.innerHTML = translations[lang].paths.growth.examples
            .map(item => `<li>${item}</li>`)
            .join('');
    }

    // SEO & Page Title Dynamics
    const path = window.location.pathname;
    let pageKey = 'index';
    if (path.includes('web_infrastructure')) pageKey = 'web';
    else if (path.includes('performance_marketing')) pageKey = 'marketing';
    else if (path.includes('ai_infrastructure') || path.includes('growth')) pageKey = 'ai';

    const seo = translations[lang].seo?.[pageKey];
    if (seo) {
        if (seo.title) document.title = seo.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && seo.desc) metaDesc.setAttribute('content', seo.desc);

        // OpenGraph Sync
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogTitle && seo.title) ogTitle.setAttribute('content', seo.title);
        if (ogDesc && seo.desc) ogDesc.setAttribute('content', seo.desc);
    }

    // Render CEO Letter Points (Dynamic List)
    renderCeoLetter(lang);
}

// Global Helper for CTA
window.openNivoCRM = function () {
    if (window.nivoCRM) {
        window.nivoCRM.open();
    } else {
        console.error('Nivo CRM module not loaded');
        // Fallback or retry
        setTimeout(() => {
            if (window.nivoCRM) window.nivoCRM.open();
        }, 500);
    }
};

/* =========================================
   CEO Letter Modal Logic
   ========================================= */

function openCeoModal() {
    const modal = document.getElementById('ceo-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Small delay for transition
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

window.closeCeoModal = function () {
    const modal = document.getElementById('ceo-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

// Close on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('ceo-modal');
    if (e.target === modal) {
        closeCeoModal();
    }
});

function renderCeoLetter(lang) {
    const pointsContainer = document.getElementById('ceo-letter-points');
    // Safety check
    if (!pointsContainer || !translations[lang]?.legal?.ceoLetter?.points) return;

    const points = translations[lang].legal.ceoLetter.points;

    // Generate HTML
    pointsContainer.innerHTML = points.map(p => `
        <div class="commitment-point">
            <h4>${p.title}</h4>
            <p>${p.text}</p>
        </div>
    `).join('');
}

// Event Listener for Compliance Seal
document.addEventListener('DOMContentLoaded', () => {
    // Re-attach listener if DOM content loaded
    const seals = document.querySelectorAll('.compliance-seal');
    seals.forEach(seal => {
        seal.addEventListener('click', () => {
            openCeoModal();
        });
    });

    // Lightbox Logic Restoration
    window.openLightbox = function (src) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightbox.classList.add('active');
    };

    window.closeLightbox = function () {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) lightbox.classList.remove('active');
    };

    // Visual Engine Switcher (CSS Diagram ↔ 3D View)
    window.toggleVisualEngine = function () {
        const twinContainer = document.getElementById('twin-visualizer');
        const badge = document.querySelector('.visual-engine-badge');

        if (!twinContainer || !badge) return;

        const is3DActive = twinContainer.classList.contains('active');
        const lang = localStorage.getItem('nivo_lang') || 'en';

        if (is3DActive) {
            // Back to CSS orbit diagram
            twinContainer.classList.remove('active');
            const label = (window.translations && window.translations[lang]?.core?.view_3d) || 'Enhanced 3D View';
            badge.innerHTML = `<i class="fas fa-cube"></i> <span data-i18n="core.view_3d">${label}</span>`;
        } else {
            // Lazy-initialize 3D engine only on first activation
            if (window.twinEngine && !window.twinEngine.initialized) {
                window.twinEngine.init('twin-visualizer');
                window.twinEngine.initialized = true;
            }
            twinContainer.classList.add('active');
            const label = (window.translations && window.translations[lang]?.core?.view_static) || 'Back to Core Schema';
            badge.innerHTML = `<i class="fas fa-microchip"></i> <span data-i18n="core.view_static">${label}</span>`;
        }
    };
});
