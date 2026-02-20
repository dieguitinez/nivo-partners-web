/* AI Chat Widget Logic */

class AntigravityChat {
    constructor() {
        this.isOpen = false;
        this.hasGreeted = false;
        this.messages = [];
        this.currentLang = localStorage.getItem('nivo_lang') || 'en';

        // Load persistent state and memory
        const savedState = localStorage.getItem('ag_chat_state');
        this.state = savedState ? JSON.parse(savedState) : { discussedValueProp: false };

        if (!this.state.sessionId) {
            this.state.sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
        }

        const savedMemory = localStorage.getItem('ag_chat_memory');
        this.memory = savedMemory ? JSON.parse(savedMemory) : {};

        // Hydrate messages if they exist in state, else empty
        this.messages = this.state.messages || [];

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

        // Close button listener
        const closeBtn = widget.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }

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

            // Force initial greeting IF chat is completely empty
            const body = chatWindow.querySelector('.ag-chat-messages');
            if (body && body.innerHTML.trim() === '') {
                const currentLang = localStorage.getItem('nivo_lang') || 'en';
                const t = translations[currentLang].chat;
                if (t && t.responses && t.responses.hello) {
                    this.addMessage(t.responses.hello.text, 'agent');
                    if (t.responses.hello.options) {
                        this.addOptions(t.responses.hello.options);
                    }
                }
            }
        } else {
            chatWindow.classList.remove('active');
            btn.classList.remove('active');
        }
    }

    saveState() {
        localStorage.setItem('ag_chat_state', JSON.stringify(this.state));
        localStorage.setItem('ag_chat_memory', JSON.stringify(this.memory));
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
        let text = '';
        let isForced = false;

        // Verify forceText is actually a string and not an Event object
        if (typeof forceText === 'string' && forceText.trim() !== '') {
            text = forceText.trim();
            isForced = true;
        } else if (input && input.value) {
            text = input.value.trim();
        }

        if (text) {
            this.addMessage(text, 'user');
            if (!isForced && input) {
                input.value = ''; // Clear input if typed
            }
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

        // Initialize State if not present (constructor handles this now, but safety first)
        if (!this.state) {
            this.state = { discussedValueProp: false };
        }

        // Simple Memory (if they mention their name)
        if (lowercaseText.includes('name is') || lowercaseText.includes('soy')) {
            const name = text.split(' ').pop();
            this.memory = { name: name };
            this.saveState();
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

        // General Website Sections (Footer, Images, Processes)
        let siteQueryTrigger = null;
        // Includes: location, where, address, footer, contact, ubicacion, ubicados, donde estan, correo, etc.
        if (/(footer|address|location|contact email|where are you|ubicacion|ubicación|ubicados|dónde están|donde estan|pie de pagina|correo de contacto)/i.test(lowercaseText)) {
            siteQueryTrigger = 'footer_info';
        } else if (/(diagram|image|core|revenue core|diagrama|imagen|foto|dibujo|grafico|núcleo)/i.test(lowercaseText)) {
            siteQueryTrigger = 'core_image';
        } else if (/(process|methodology|how does it work|steps|proceso|pasos|metodologia|como funciona)/i.test(lowercaseText)) {
            siteQueryTrigger = 'process_info';
        }

        // Services Queries
        let serviceQueryTrigger = null;
        if (/(web|website|page|site|sitio web|página|pagina web)/i.test(lowercaseText)) {
            serviceQueryTrigger = 'srv_web';
        } else if (/(marketing|ads|traffic|seo|posicionamiento|lead|trafico)/i.test(lowercaseText)) {
            serviceQueryTrigger = 'srv_marketing';
        } else if (/(automation|agent|ai|artificial intelligence|automatizacion|agente|ia|bot)/i.test(lowercaseText)) {
            serviceQueryTrigger = 'srv_automation';
        }

        // Terminology Alignment (Logo -> Engineered Brand Assets)
        if (lowercaseText.includes('logo') || lowercaseText.includes('logotipo')) intent.technical += 5;

        // Security / Compliance Trigger
        let securityTrigger = false;
        if (/(security|data|fipa|fdutpa|privacy|secure|compliance|seguridad|datos|privacidad)/i.test(lowercaseText)) securityTrigger = true;

        // ROI / Returns Trigger
        let roiTrigger = false;
        if (/(roi|return|profit|guarantee|garantia|retorno|ganancia)/i.test(lowercaseText)) roiTrigger = true;


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
                if (text === 'web') {
                    this.state.discussedValueProp = true; // Mark as discussed
                    this.saveState();
                }
            }
        }
        else if (definitions[text]) {
            responseNode = definitions[text];
        }

        // B. Archetype Recognition
        else if (intent.archetype >= 5 && archetypeKey) {
            responseNode = responses[archetypeKey];
        }

        // B2. Website Section Queries
        else if (siteQueryTrigger) {
            responseNode = responses[siteQueryTrigger];
        }

        // B3. Service Queries
        else if (serviceQueryTrigger) {
            responseNode = responses[serviceQueryTrigger];
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
            responseNode = definitions.pricing;
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
                if (key.length > 3 && lowercaseText.includes(key)) {
                    responseNode = definitions[key];
                    break;
                }
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
            else if (lowercaseText.includes('location') || lowercaseText.includes('where') || lowercaseText.includes('ubicacion') || lowercaseText.includes('donde') || lowercaseText.includes('contact') || lowercaseText.includes('email')) responseNode = responses.footer_info;
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

            // Greetings and Conversational Fluidity (Handling ok, yes, etc.)
            else if (/^(hello|hi|hola|hey|ok|yes|si|sí|bueno)$/i.test(lowercaseText.trim())) responseNode = responses.hello;
        }

        // ---------------------------------------------------------
        // 3. FALLBACK & CONTEXT INJECTION (HITL API INTEGRATION)
        // ---------------------------------------------------------
        if (!responseNode) {
            // Escalate unmapped queries to Vercel API
            this.sendToBackend(text);
            return;
        }

        // Safety Fallback for missing nodes
        if (!responseNode) responseNode = responses.fallback || responses.hello;

        // ---------------------------------------------------------
        // 6. Handle Special Actions (Form Triggers)
        // open_contact: triggered AFTER Kai shows the 'opening form...' message
        // ---------------------------------------------------------
        if (text === 'open_contact') {
            setTimeout(() => {
                if (window.nivoCRM) {
                    window.nivoCRM.open();
                } else {
                    const contactBtn = document.querySelector('a[href="#apply"]');
                    if (contactBtn) contactBtn.click();
                }
            }, 1200); // Delay so Kai's message renders first
        }
        if (text === 'open_booking') {
            setTimeout(() => {
                if (window.nivoCRM) {
                    window.nivoCRM.open();
                } else {
                    const contactBtn = document.querySelector('a[href="#apply"]');
                    if (contactBtn) contactBtn.click();
                }
            }, 1200);
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

            if (responseNode.type === 'exit' && responseNode.options && responseNode.options.length > 0) {
                setTimeout(() => {
                    this.addExitButton(responseNode.options[0]);
                }, 400);
            } else if (responseNode.options && responseNode.options.length > 0) {
                setTimeout(() => {
                    this.addOptions(responseNode.options);
                }, 400);
            }
        }, baseLatency + typingTime);
    }

    addExitButton(option) {
        const container = document.getElementById('ag-messages');
        const btnDiv = document.createElement('div');
        btnDiv.className = 'ag-chat-options exit-mode';

        const btn = document.createElement('button');
        btn.className = 'ag-option-btn btn-primary full-width';
        btn.innerHTML = `<i class="fas fa-check-circle"></i> ${option.label}`;
        btn.onclick = (e) => {
            e.stopPropagation();
            this.simulateResponse(option.value); // Will trigger the action handler
            btnDiv.remove();
        };

        btnDiv.appendChild(btn);
        container.appendChild(btnDiv);
        container.scrollTop = container.scrollHeight;
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

    async sendToBackend(text) {
        this.showTyping();
        try {
            // Determine API Base URL for local testing vs Vercel Production
            let apiUrl = '/api/chat';
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
                // If running locally without a Next.js server, point to the live Vercel API
                // Assuming standard vercel domain pattern or production domain
                apiUrl = 'https://nivo-partners-web.vercel.app/api/chat';
            }

            const currentLang = localStorage.getItem('nivo_lang') || 'en';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userMessage: text,
                    sessionId: this.state.sessionId,
                    lang: currentLang
                })
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();

            this.hideTyping();
            this.addMessage(data.reply, 'agent');

            // Bilingual escalation button
            if (data.escalated) {
                const escalateLabel = currentLang === 'es'
                    ? 'Abrir Asistente de Arquitectura'
                    : 'Open Architecture Wizard';
                setTimeout(() => {
                    this.addOptions([{ label: escalateLabel, value: "open_contact" }]);
                }, 400);
            }
        } catch (error) {
            console.error(error);
            this.hideTyping();
            const currentLang = localStorage.getItem('nivo_lang') || 'en';
            const errMsg = currentLang === 'es'
                ? 'Conexión con el núcleo cognitivo interrumpida. Por favor intenta de nuevo.'
                : 'Connection to cognitive cores interrupted. Please try again later.';
            this.addMessage(errMsg, 'agent');
        }
    }
}

// Initialize
window.agChat = new AntigravityChat();
