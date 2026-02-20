/**
 * Nivo Partners - Digital Twin Engine 2.0
 * High-performance WebGL infrastructure visualization.
 * Optimized for Mobile (iPhone SE+) with GPU Throttling.
 */

class DigitalTwin {
    constructor() {
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.nodes = [];
        this.particles = null;
        this.clock = new THREE.Clock();
        this.isMobile = window.innerWidth < 768;
        this.dpr = Math.min(window.devicePixelRatio, 2); // Cap for performance
        this.isLowEnd = false;
        this.fpsList = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Setup Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x050507, 10, 50);

        // Setup Camera
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 15, 25);
        this.camera.lookAt(0, 0, 0);

        // Setup Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: !this.isMobile, // Disable high-weight AA on mobile
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setPixelRatio(this.dpr);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        // Add Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x3B82F6, 5, 100);
        pointLight.position.set(10, 20, 10);
        this.scene.add(pointLight);

        // Create Infrastructure Nodes
        this.createNodes();
        this.createParticles();
        this.createGrid();

        // Listeners
        this.setupEventListeners();

        // Start Loop
        this.animate();
        console.log(`Digital Twin 2.0 Initialized | Mobile: ${this.isMobile} | DPR: ${this.dpr}`);
    }

    createNodes() {
        const nodeSpecs = [
            { name: 'Cloudflare', color: 0xF38020, pos: [-10, 0, 0], scale: 1.5, type: 'shield' },
            { name: 'GCP', color: 0x4285F4, pos: [0, 0, 0], scale: 2.5, type: 'core' },
            { name: 'Supabase', color: 0x3ECF8E, pos: [10, 0, 5], scale: 1.8, type: 'db' },
            { name: 'Resend', color: 0xffffff, pos: [12, 0, -5], scale: 1.2, type: 'emitter' }
        ];

        nodeSpecs.forEach(spec => {
            let geometry;
            if (spec.type === 'shield') geometry = new THREE.SphereGeometry(1, 32, 32);
            else if (spec.type === 'db') geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
            else geometry = new THREE.BoxGeometry(1, 1, 1);

            const material = new THREE.MeshPhongMaterial({
                color: spec.color,
                emissive: spec.color,
                emissiveIntensity: 0.5,
                shininess: 100
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...spec.pos);
            mesh.scale.set(spec.scale, spec.scale, spec.scale);
            mesh.userData = { name: spec.name, info: `System: ${spec.name}\nStatus: Operational` };

            this.nodes.push(mesh);
            this.scene.add(mesh);
        });
    }

    createParticles() {
        const count = this.isMobile ? 500 : 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color: 0x3B82F6, size: 0.1, transparent: true, opacity: 0.8 });
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createGrid() {
        const gridHelper = new THREE.GridHelper(100, 50, 0x3B82F6, 0x1a1a1c);
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
    }

    setupEventListeners() {
        // Resize Handling
        const resizeObserver = new ResizeObserver(() => {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
        resizeObserver.observe(this.container);

        // Touch/Mouse Interaction
        const handleInteraction = (x, y) => {
            this.mouse.x = (x / this.container.clientWidth) * 2 - 1;
            this.mouse.y = -(y / this.container.clientHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.nodes);

            if (intersects.length > 0) {
                const target = intersects[0].object;
                this.zoomToNode(target);
                this.showNodeDetails(target.userData);
            }
        };

        this.container.addEventListener('click', (e) => {
            const rect = this.container.getBoundingClientRect();
            handleInteraction(e.clientX - rect.left, e.clientY - rect.top);
        });

        this.container.addEventListener('touchstart', (e) => {
            const rect = this.container.getBoundingClientRect();
            const touch = e.touches[0];
            handleInteraction(touch.clientX - rect.left, touch.clientY - rect.top);
        }, { passive: true });
    }

    zoomToNode(node) {
        // Smooth camera transition (Simplified for POC, usually use GSAP)
        const targetPos = new THREE.Vector3().copy(node.position).add(new THREE.Vector3(0, 5, 10));
        const currentPos = this.camera.position;

        // Basic interpolation
        let t = 0;
        const zoomLoop = () => {
            t += 0.05;
            if (t <= 1) {
                this.camera.position.lerp(targetPos, 0.1);
                requestAnimationFrame(zoomLoop);
            }
        };
        zoomLoop();
    }

    showNodeDetails(data) {
        // Bottom Sheet Logic for Mobile
        let sheet = document.getElementById('twin-bottom-sheet');
        if (!sheet) {
            sheet = document.createElement('div');
            sheet.id = 'twin-bottom-sheet';
            sheet.className = 'bottom-sheet';
            document.body.appendChild(sheet);
        }

        sheet.innerHTML = `
            <div class="sheet-content">
                <div class="sheet-handle"></div>
                <h4>${data.name}</h4>
                <p>${data.info.replace('\n', '<br>')}</p>
                <button onclick="document.getElementById('twin-bottom-sheet').classList.remove('active')">Close</button>
            </div>
        `;

        setTimeout(() => sheet.classList.add('active'), 10);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();

        // Rotate nodes
        this.nodes.forEach((node, i) => {
            node.rotation.y += delta * 0.5;
            node.position.y = Math.sin(this.clock.elapsedTime + i) * 0.5;
        });

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.y += delta * 0.05;
        }

        this.renderer.render(this.scene, this.camera);
        this.checkPerformance();
    }

    checkPerformance() {
        const fps = 1 / this.clock.getDelta();
        if (isNaN(fps)) return;

        this.fpsList.push(fps);
        if (this.fpsList.length > 100) {
            const avg = this.fpsList.reduce((a, b) => a + b) / 100;
            if (avg < 30 && !this.isLowEnd) {
                this.throttlePower();
            }
            this.fpsList = [];
        }
    }

    throttlePower() {
        console.warn('Low FPS detected. Throttling Digital Twin performance.');
        this.isLowEnd = true;

        // Remove particles
        if (this.particles) {
            this.scene.remove(this.particles);
            this.particles = null;
        }

        // Reduce pixel ratio further
        this.renderer.setPixelRatio(1);
    }
}

// Global scope — lazy init: do NOT call init() here.
// The DigitalTwin is only initialized when the user activates the 3D toggle.
window.twinEngine = new DigitalTwin();
window.twinEngine.initialized = false;
