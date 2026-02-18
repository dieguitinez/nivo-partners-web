/* AI Chat Widget Logic */

class AntigravityChat {
    constructor() {
        this.isOpen = false;
        this.hasGreeted = false;
        this.messages = [];
        this.currentLang = localStorage.getItem('nivo_lang') || 'en';
        // Safety check: if lang is not in translations, revert to en
        if (!translations[this.currentLang]) {
            this.currentLang = 'en';
        }
        this.init();
    }

    init() {
        // Create Widget HTML
        // Hydrate existing widget
        let widget = document.getElementById('ag-chat-widget');

        if (!widget) {
            console.error("Chat widget not found in DOM");
            return;
        }

        this.widget = widget;
        // Ensure image paths are correct if JS runs relative to root
        const avatarImg = widget.querySelector('.ag-chat-button img');
        if (avatarImg && !avatarImg.src.includes('images/')) avatarImg.src = 'images/agent-avatar.png';

        // Auto-greet after 2 seconds (faster)
        // Auto-greet after 2 seconds (faster)
        setTimeout(() => {
            // FORCE GREETING for debugging/reliability
            if (!this.isOpen) {
                // Determine current language from localStorage or default to 'en'
                let currentLang = localStorage.getItem('nivo_lang') || 'en';
                // Validate lang
                if (!translations[currentLang] || !translations[currentLang].chat) {
                    console.warn(`Language ${currentLang} not found or missing chat keys, falling back to en`);
                    currentLang = 'en';
                }

                const t = translations[currentLang].chat;
                const path = window.location.pathname;

                // Context-Aware Greeting Logic
                let greetingNode = t.responses.hello; // Default
                let greetingType = 'default';

                if (path.includes('web_infrastructure')) {
                    greetingNode = t.responses.web;
                    greetingType = 'web';
                } else if (path.includes('performance_marketing')) {
                    greetingNode = t.responses.marketing;
                    greetingType = 'marketing';
                } else if (path.includes('ai_infrastructure') || path.includes('growth')) {
                    greetingNode = t.responses.growth;
                    greetingType = 'growth';
                }

                // If greetingNode is missing, fallback to hello
                if (!greetingNode) greetingNode = t.responses.hello;

                this.addMessage(greetingNode.text, 'agent');

                // Add Options
                if (greetingNode.options) {
                    this.addOptions(greetingNode.options);
                }

                const dot = document.querySelector('.notification-dot');
                if (dot) dot.style.display = 'block';

                // Show label
                const label = document.querySelector('.chat-label');
                if (label) label.classList.add('visible');

                this.hasGreeted = true;
            }
        }, 2000);

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (this.isOpen && this.widget && !this.widget.contains(e.target)) {
                this.toggle();
            }
        });
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        // Update placeholder
        const input = document.getElementById('ag-input');
        if (input && translations[lang].chat.placeholder) {
            input.placeholder = translations[lang].chat.placeholder;
        }

        // Update Send Button
        const sendBtn = document.querySelector('.ag-send-btn');
        if (sendBtn && translations[lang].chat.send) {
            sendBtn.textContent = translations[lang].chat.send;
        }

        // Update Agent Name
        const nameEl = document.querySelector('.ag-agent-info h4');
        if (nameEl && translations[lang].chat.agentName) {
            nameEl.textContent = translations[lang].chat.agentName;
        }

        // Note: Dynamically updating existing messages is complex for options. 
        // We'll leave existing messages as is, but new ones will use new lang.
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const widget = document.getElementById('ag-chat-widget');
        const chatWindow = widget.querySelector('.ag-chat-window');
        const btn = widget.querySelector('.ag-chat-button');
        const label = widget.querySelector('.chat-label');

        if (this.isOpen) {
            chatWindow.classList.add('active');
            btn.classList.add('active');
            document.querySelector('.notification-dot').style.display = 'none';
            if (label) label.classList.remove('visible');
        } else {
            chatWindow.classList.remove('active');
            btn.classList.remove('active');
        }
    }

    handleEnter(e) {
        if (e.key === 'Enter') this.sendMessage();
    }

    sendMessage(forceText = null) {
        // Ensure chat is open so user sees the action
        if (!this.isOpen) {
            this.toggle();
        }

        const input = document.getElementById('ag-input');
        const text = forceText || input.value.trim();

        if (text) {
            this.addMessage(text, 'user');
            if (!forceText) input.value = ''; // Clear input if typed
            this.simulateResponse(text);
        }
    }

    addMessage(text, sender) {
        const container = document.getElementById('ag-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `ag-message ${sender}`;

        // Allow simple HTML parsing for bolding **text**
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        msgDiv.innerHTML = `<p>${formattedText}</p>`;

        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }

    addOptions(options) {
        const container = document.getElementById('ag-messages');
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'ag-chat-options';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'ag-option-btn';
            btn.textContent = opt.label;
            btn.onclick = (e) => {
                e.stopPropagation(); // Prevent the document click listener from closing the chat
                this.addMessage(opt.label, 'user'); // Show what they clicked (Text)
                this.simulateResponse(opt.value);   // Process the ID (e.g. 'web_portfolio')
                optionsDiv.remove(); // Remove buttons after selection
            };
            optionsDiv.appendChild(btn);
        });

        container.appendChild(optionsDiv);
        container.scrollTop = container.scrollHeight;
    }


    simulateResponse(text) {
        /* 
        KAI 3.0 LOGIC ENGINE - THE SOVEREIGN ARCHITECT
        - Context Awareness: Knows which page the user is on.
        - Intent Recognition: Scores input for Buying vs Learning vs Technical.
        - Black Box Protocol: Redirects cheap/free inquiries to High-Ticket Pricing.
        */

        let currentLang = this.currentLang || localStorage.getItem('nivo_lang') || 'en';
        if (!translations[currentLang]) currentLang = 'en';

        const t = translations[currentLang].chat;
        const responses = t.responses;
        const definitions = t.definitions || {};
        const companyInfo = t.company_info || {};

        let responseNode = null;
        let lowercaseText = text.toLowerCase();

        // ---------------------------------------------------------
        // 0. CONTEXT AWARENESS & MEMORY
        // ---------------------------------------------------------
        const pageContext = {
            isWeb: window.location.pathname.includes('web'),
            isMarketing: window.location.pathname.includes('marketing'),
            isGrowth: window.location.pathname.includes('growth') || window.location.pathname.includes('ai'),
            title: document.title
        };

        // Initialize State if not present
        if (!this.state) {
            this.state = {
                discussedValueProp: false
            };
        }

        // Simple Memory (if they mention their name)
        if (lowercaseText.includes('name is') || lowercaseText.includes('soy')) {
            const name = text.split(' ').pop();
            this.memory = { name: name };
        }

        // ---------------------------------------------------------
        // 1. INTENT RECOGNITION (Scoring System)
        // ---------------------------------------------------------
        let intent = {
            buying: 0,
            learning: 0,
            technical: 0,
            guardrail: 0,
            archetype: 0,
            conversion: 0
        };

        // Buying Signals
        if (/(price|cost|quote|audit|hire|comprar|precio|costo|cotizar|contract|agreement|how much|cuanto cuesta|cuánto cuesta)/i.test(lowercaseText)) intent.buying += 5;

        // Timeline Signals
        if (/(duration|how long|timeline|schedule|deadline|timeframe|tiempo|tardan|entrega|plazo)/i.test(lowercaseText)) intent.timeline = 5;

        // Learning Signals
        if (/(what is|define|explain|mean|que es|explicar|significa|how does|como funciona)/i.test(lowercaseText)) intent.learning += 5;

        // Technical Signals (Black Box Protocol)
        if (/(api|json|react|stack|cloud|framework|code|codigo|python|javascript|node|sql)/i.test(lowercaseText)) intent.technical += 5;

        // Guardrail Signals (Cheap/Free/Template)
        if (/(free|cheap|barato|gratis|template|plantilla|wordpress|wix|fiverr|upwork)/i.test(lowercaseText)) intent.guardrail += 10;

        // Archetype Detection
        let archetypeKey = null;
        if (lowercaseText.includes('spa')) { intent.archetype = 5; archetypeKey = 'arch_spa'; }
        if (lowercaseText.includes('saas')) { intent.archetype = 5; archetypeKey = 'arch_saas'; }
        if (lowercaseText.includes('industrial')) { intent.archetype = 5; archetypeKey = 'arch_industrial'; }
        if (lowercaseText.includes('authority')) { intent.archetype = 5; archetypeKey = 'arch_authority'; }

        // Conversion Intent
        if (lowercaseText.includes('conversion') || lowercaseText.includes('conversión')) intent.conversion = 5;

        // Branding Protocol Trigger (New / Old Business)
        let brandingTrigger = false;
        if (/(new business|new company|startup|start-up|just started|nueva empresa|negocio nuevo|empresa nueva)/i.test(lowercaseText)) brandingTrigger = true;
        if (/(old website|outdated|redesign|vieja|antigua|hace años|rediseño|actualizar)/i.test(lowercaseText)) brandingTrigger = true;

        // Terminology Alignment (Logo -> Engineered Brand Assets)
        if (lowercaseText.includes('logo') || lowercaseText.includes('logotipo')) intent.technical += 5;


        // ---------------------------------------------------------
        // 2. ROUTING LOGIC
        // ---------------------------------------------------------

        // A. Direct Matches (Buttons or Specific Keywords)
        if (responses[text]) {
            // REDUNDANCY CONTROL: If user clicks "Digital Infrastructure" (web) again
            if (text === 'web' && this.state.discussedValueProp) {
                responseNode = responses.web_types; // Skip straight to types
            } else {
                responseNode = responses[text];
                if (text === 'web') this.state.discussedValueProp = true; // Mark as discussed
            }
        }
        else if (definitions[text]) {
            responseNode = definitions[text];
        }

        // B. Archetype Recognition
        else if (intent.archetype >= 5 && archetypeKey) {
            responseNode = responses[archetypeKey];
        }

        // C. Branding Protocol Trigger
        else if (brandingTrigger) {
            responseNode = responses.branding_trigger;
        }

        // D. Conversion -> Audit Flow
        else if (intent.conversion >= 5) {
            responseNode = responses.conversion_audit;
        }

        // E. Guardrail Activation (redirect low-quality leads to strict pricing)
        else if (intent.guardrail >= 5) {
            responseNode = definitions.pricing || responses.default;
        }

        // F. Timeline Inquiries (Senior Roadmap Logic)
        else if (intent.timeline >= 5) {
            responseNode = definitions.delivery;
        }

        // G. Technical Inquiries -> Route to Tech Stack or Branding Asset definition
        else if (intent.technical >= 5) {
            if (lowercaseText.includes('logo')) {
                responseNode = definitions.def_brand_assets;
            } else {
                responseNode = definitions.tech_stack || definitions.infrastructure;
            }
        }

        // H. High Intent (Buying) -> Push to Conversion based on Context
        else if (intent.buying >= 5) {
            // If specifically asking for price/cost, show pricing node first
            if (/(price|cost|precio|costo|how much|cuanto|cuánto)/i.test(lowercaseText)) {
                responseNode = definitions.pricing;
            } else {
                // Otherwise general buying intent -> Contextual Call to Action
                if (pageContext.isWeb) responseNode = responses.web_quote;
                else if (pageContext.isMarketing) responseNode = responses.marketing_call;
                else responseNode = responses.growth_audit;
            }
        }

        // I. Learning Intent -> Check Definitions First
        else if (intent.learning >= 5) {
            // Search Definitions keys
            for (const key in definitions) {
                if (lowercaseText.includes(key)) {
                    responseNode = definitions[key];
                    break;
                }
            }
            // Fallback for Learning if no definition found
            if (!responseNode) {
                // If on a specific page, explain that service
                if (pageContext.isWeb) responseNode = responses.web;
                else if (pageContext.isMarketing) responseNode = responses.marketing;
                else responseNode = companyInfo.methodology;
            }
        }

        // H. Concept Matching (Keywords without explicit question)
        else {
            if (lowercaseText.includes('seo')) responseNode = definitions.seo;
            else if (lowercaseText.includes('b2b')) responseNode = definitions.b2b;
            else if (lowercaseText.includes('roi')) responseNode = definitions.roi;
            else if (lowercaseText.includes('abm')) responseNode = definitions.abm || definitions.marketing;

            // Product Specifics
            else if (lowercaseText.includes('review') || lowercaseText.includes('guardian')) responseNode = definitions.def_review_guardian || definitions.agents;
            else if (lowercaseText.includes('inbox') || lowercaseText.includes('email')) responseNode = definitions.def_smart_inbox || definitions.agents;
            else if (lowercaseText.includes('sniper') || lowercaseText.includes('lead')) responseNode = definitions.def_lead_sniper || definitions.agents;

            // Company Info Matches
            else if (lowercaseText.includes('trust') || lowercaseText.includes('client') || lowercaseText.includes('partner')) responseNode = companyInfo.trusted_by;
            else if (lowercaseText.includes('method') || lowercaseText.includes('process') || lowercaseText.includes('fase')) responseNode = companyInfo.methodology;
            else if (lowercaseText.includes('criteria') || lowercaseText.includes('who')) responseNode = companyInfo.criteria;

            // Service Matching
            else if (lowercaseText.includes('web') || lowercaseText.includes('design') || lowercaseText.includes('infra')) {
                if (this.state.discussedValueProp) {
                    responseNode = responses.web_types;
                } else {
                    responseNode = responses.web;
                    this.state.discussedValueProp = true;
                }
            }
            else if (lowercaseText.includes('market') || lowercaseText.includes('ads')) responseNode = responses.marketing;
            else if (lowercaseText.includes('growth') || lowercaseText.includes('ai') || lowercaseText.includes('auto')) responseNode = responses.growth;

            // Greetings
            else if (/(hello|hi|hola|hey)/i.test(lowercaseText)) responseNode = responses.hello;
        }

        // ---------------------------------------------------------
        // 3. FALLBACK & CONTEXT INJECTION
        // ---------------------------------------------------------
        if (!responseNode) {
            responseNode = responses.default;
            // Inject context if possible
            if (this.memory && this.memory.name) {
                // Determine greeting based on language
                const prefix = currentLang === 'es' ? `Hola ${this.memory.name}. ` : `Hello ${this.memory.name}. `;
                // Create a temporary copy to avoid mutating the original
                responseNode = { ...responseNode, text: prefix + responseNode.text, options: responseNode.options };
            }
        }

        // Safety Fallback for missing nodes
        if (!responseNode) responseNode = responses.default;

        // ---------------------------------------------------------
        // 6. Handle Special Actions
        // ---------------------------------------------------------
        if (text === 'open_contact' || text === 'web_quote') {
            const contactBtn = document.querySelector('a[href="#apply"]'); // Updated anchor
            if (contactBtn) contactBtn.click();
        }
        // ---------------------------------------------------------
        // 6. Handle Special Actions (Form Triggers)
        // ---------------------------------------------------------
        // These triggers now happen ALONGSIDE the response, not replacing it.
        if (text === 'open_contact' || text.includes('web_final')) {
            setTimeout(() => {
                const contactBtn = document.querySelector('a[href="#apply"]');
                if (contactBtn) contactBtn.click();
            }, 800); // Slight delay for effect
        }
        if (text === 'open_booking' || text.includes('mkt_final')) {
            setTimeout(() => {
                const contactBtn = document.querySelector('a[href="#book"]'); // Assuming #book anchor or similar
                // Fallback to apply if no specific book anchor
                const target = contactBtn || document.querySelector('a[href="#apply"]');
                if (target) target.click();
            }, 800);
        }

        // ---------------------------------------------------------
        // 7. Render Response
        // ---------------------------------------------------------
        const baseLatency = 600;
        const typingTime = Math.min((responseNode.text.length * 5), 2000); // Cap typing time
        this.showTyping();

        setTimeout(() => {
            this.hideTyping();
            this.addMessage(responseNode.text, 'agent');

            if (responseNode.options && responseNode.options.length > 0) {
                setTimeout(() => {
                    this.addOptions(responseNode.options);
                }, 400);
            }
        }, baseLatency + typingTime);
    }

    showTyping() {
        const messagesContainer = this.widget.querySelector('.ag-chat-messages');
        const typingEl = document.createElement('div');
        typingEl.className = 'ag-message agent typing-indicator-msg';
        typingEl.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        messagesContainer.appendChild(typingEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingEl = this.widget.querySelector('.typing-indicator-msg');
        if (typingEl) typingEl.remove();
    }
}

// Initialize
window.agChat = new AntigravityChat();
