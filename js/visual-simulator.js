/**
 * Nivo Partners - Visual Identity Simulator
 * Allows users to test brand archetypes and visualize them in real-time.
 */

class VisualSimulator {
    constructor() {
        this.isOpen = false;
        this.archetypes = {
            minimal: {
                name: 'Minimalist / Sovereign',
                font: "'Inter', sans-serif",
                tracking: '2px',
                weight: '300',
                bg: '#ffffff',
                text: '#000000',
                accent: '#333333',
                desc: 'Clean, authoritative, and stripped of noise. Signals institutional confidence.'
            },
            bold: {
                name: 'Bold / Disruptor',
                font: "'Outfit', sans-serif",
                tracking: '-1px',
                weight: '800',
                bg: '#000000',
                text: '#ffffff',
                accent: '#00ccff',
                desc: 'High contrast and heavy typography. Demands attention and dominates the feed.'
            },
            luxury: {
                name: 'Luxury / Legacy',
                font: "'Playfair Display', serif",
                tracking: '0.5px',
                weight: '500',
                bg: '#0f0f0f',
                text: '#d4af37', // Gold
                accent: '#fdfbf7',
                desc: 'Elegant, timeless, and exclusive. For brands that sell status, not just services.'
            }
        };
        this.currentArchetype = 'minimal';
    }

    init() {
        if (document.getElementById('sim-modal')) return; // Already inited
        this.injectHTML();
        this.attachListeners();
        console.log('Visual Simulator Initialized');
    }

    open() {
        this.init(); // lazy load
        const modal = document.getElementById('sim-modal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
            this.updatePreview();
        }
    }

    close() {
        const modal = document.getElementById('sim-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
            document.body.style.overflow = '';
        }
    }

    setArchetype(type) {
        if (!this.archetypes[type]) return;
        this.currentArchetype = type;

        // Update UI buttons
        document.querySelectorAll('.sim-opt').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });

        this.updatePreview();
    }

    updatePreview() {
        const config = this.archetypes[this.currentArchetype];
        const previewEl = document.getElementById('sim-logo-preview');
        const descEl = document.getElementById('sim-desc');
        const bgEl = document.getElementById('sim-canvas');

        if (previewEl && config) {
            previewEl.style.fontFamily = config.font;
            previewEl.style.letterSpacing = config.tracking;
            previewEl.style.fontWeight = config.weight;
            previewEl.style.color = config.text;

            bgEl.style.backgroundColor = config.bg;
            bgEl.style.borderColor = config.accent;

            descEl.textContent = config.desc;
            descEl.style.color = config.currentArchetype === 'bold' ? '#ccc' : '#666';
        }
    }

    convert() {
        this.close();
        if (typeof openNivoCRM === 'function') {
            // Pass data to CRM if possible, otherwise just open it
            // We could set a global or localstorage to pre-select "Branding"
            localStorage.setItem('nivo_interest', 'branding_' + this.currentArchetype);
            openNivoCRM();
        }
    }

    embed(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Inject content
        container.innerHTML = this.getHTML();

        // Adjust UI for embedded state
        const root = container.querySelector('#sim-modal');
        if (root) {
            root.id = 'sim-embedded';
            root.classList.remove('modal-overlay');
            root.classList.add('active'); // Visible immediately
            root.style.position = 'relative';
            root.style.background = 'transparent';
        }

        // Hide close button
        const closeBtn = container.querySelector('.sim-close');
        if (closeBtn) closeBtn.style.display = 'none';

        this.attachListeners(container);
        this.updatePreview();
    }

    injectHTML() {
        document.body.insertAdjacentHTML('beforeend', this.getHTML());
    }

    getHTML() {
        return `
        <div id="sim-modal" class="modal-overlay">
            <div class="sim-content">
                <button class="sim-close">&times;</button>
                
                <div class="sim-layout">
                    <!-- Controls -->
                    <div class="sim-sidebar">
                        <h3>Identity Lab</h3>
                        <p>Select an archetype to construct your sovereign signal.</p>
                        
                        <div class="sim-options">
                            <button class="sim-opt active" data-type="minimal">
                                <span class="dot" style="background:#333"></span> Sovereign / Minimal
                            </button>
                            <button class="sim-opt" data-type="bold">
                                <span class="dot" style="background:#00ccff"></span> Disruptor / Bold
                            </button>
                            <button class="sim-opt" data-type="luxury">
                                <span class="dot" style="background:#d4af37"></span> Legacy / Luxury
                            </button>
                        </div>

                        <div class="sim-desc-box">
                            <p id="sim-desc">...</p>
                        </div>

                        <button class="btn btn-primary btn-block" id="sim-convert">
                            Build This Reality
                        </button>
                    </div>

                    <!-- Visual Canvas -->
                    <div class="sim-canvas" id="sim-canvas">
                        <div class="sim-logo-preview" id="sim-logo-preview">
                            NIVO<br>PARTNERS
                        </div>
                        <div class="sim-mockup-label">LIVE PREVIEW</div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    attachListeners(scope = document) {
        const closeBtn = scope.querySelector('.sim-close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());

        const convertBtn = scope.querySelector('#sim-convert');
        if (convertBtn) convertBtn.addEventListener('click', () => this.convert());

        scope.querySelectorAll('.sim-opt').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.setArchetype(type);
            });
        });

        // Close on outside click (only if modal)
        const modal = scope.getElementById('sim-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'sim-modal') this.close();
            });
        }
    }
}

// Expose instance
window.visualSimulator = new VisualSimulator();
