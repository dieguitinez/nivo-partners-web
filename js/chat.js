/* AI Chat Widget Logic */

class AntigravityChat {
    constructor() {
        this.isOpen = false;
        this.hasGreeted = false;
        this.messages = [];
        this.currentLang = localStorage.getItem('nivo_lang') || 'en';

        // Load persistent state and memory
        const savedState = localStorage.getItem('ag_chat_state');
        this.state = savedState ? JSON.parse(savedState) : {
            discussedValueProp: false,
            auditSuggested: false
        };

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
            this.setAuditSuggested(false); // Reset on new message
            this.simulateResponse(text);
        } else if (!isForced && this.state.auditSuggested) {
            // User clicked send on empty input while audit was suggested
            this.simulateResponse('open_contact');
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
                e.stopPropagation();
                // Send the label to the AI for human-readable context
                this.sendMessage(opt.label);
                // Also process the value if it's a structural action
                if (opt.value === 'open_contact' || opt.value === 'open_booking') {
                    this.simulateResponse(opt.value);
                }
                optionsDiv.remove();
            };
            optionsDiv.appendChild(btn);
        });

        container.appendChild(optionsDiv);
        container.scrollTop = container.scrollHeight;
    }


    simulateResponse(text) {
        // Handle structural actions locally without generating a text response
        if (text === 'open_contact' || text === 'open_booking') {
            setTimeout(() => {
                const contactBtn = document.querySelector('a[href="#apply"]');
                if (contactBtn) contactBtn.click();
                else if (window.nivoCRM) window.nivoCRM.open();
            }, 800);
            return;
        }

        // All other inputs (free text or button clicks) go directly to Gemini
        this.sendToBackend(text);
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

        // Visual nudge: set state for Send button sync
        if (option.value === 'open_contact') {
            this.setAuditSuggested(true);
        }
    }

    setAuditSuggested(val) {
        this.state.auditSuggested = val;
        const sendBtn = document.querySelector('.ag-send-btn');
        if (!sendBtn) return;

        if (val) {
            sendBtn.classList.add('audit-mode');
            const currentLang = localStorage.getItem('nivo_lang') || 'en';
            sendBtn.textContent = currentLang === 'es' ? 'Abrir Auditoría' : 'Open Audit';
        } else {
            sendBtn.classList.remove('audit-mode');
            const currentLang = localStorage.getItem('nivo_lang') || 'en';
            sendBtn.textContent = translations[currentLang].chat.send;
        }
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
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                apiUrl = '/api/chat'; // Use relative path for local dev
            } else if (window.location.protocol === 'file:') {
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

            if (!response.ok) {
                const errorBody = await response.text();
                console.error(`[KAI] API Error ${response.status}:`, errorBody);
                throw new Error(`HTTP ${response.status}: ${errorBody}`);
            }

            const data = await response.json();

            this.hideTyping();
            this.addMessage(data.reply, 'agent');

            // Handle Proactive Escalation / Audit Trigger
            if (data.triggerAudit || data.escalated) {
                const currentLang2 = localStorage.getItem('nivo_lang') || 'en';
                const escalateLabel = currentLang2 === 'es'
                    ? 'Abrir Auditoría Estratégica'
                    : 'Open Strategic Audit';

                setTimeout(() => {
                    // Use addExitButton for higher prominence (full width, primary color)
                    this.addExitButton({ label: escalateLabel, value: "open_contact" });
                }, 600);
            }
        } catch (error) {
            console.error('[KAI] Backend connection failed:', error.message);
            this.hideTyping();
            const currentLang = localStorage.getItem('nivo_lang') || 'en';
            // Show a soft fallback rather than a hard error
            const errMsg = currentLang === 'es'
                ? 'Estoy procesando tu consulta. Para asistencia inmediata, puedes solicitar una Auditoría Estratégica con nuestro equipo.'
                : 'I\'m processing your query. For immediate assistance, you can request a Strategic Audit with our team.';
            this.addMessage(errMsg, 'agent');
            setTimeout(() => {
                const label = currentLang === 'es' ? 'Solicitar Auditoría' : 'Request Audit';
                this.addOptions([{ label, value: 'open_contact' }]);
            }, 400);
        }
    }
}

// Initialize
window.agChat = new AntigravityChat();
