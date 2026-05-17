/* =========================================================================
   APP.JS - Core Interactive Mechanics for Riwaz Udas Portfolio
   ========================================================================= */

// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// EmailJS Live Email Configuration (Optional - Paste credentials here to enable live messaging!)
const EMAILJS_PUBLIC_KEY = "32hIuMQjWu7TqwS--"; 
const EMAILJS_SERVICE_ID = "service_j4p2t2i";
const EMAILJS_TEMPLATE_ID = "template_fsl9xap";

document.addEventListener("DOMContentLoaded", () => {
  // Force browser to load at the absolute top of the page
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  });

  // Initialize EmailJS if credentials are provided
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
    });
    console.log("[EMAILJS]: Active live emailing pipeline initialized.");
  }

  // Smooth scroll for all internal anchor links (nav links, CTAs, logo)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Update URL hash without triggering a browser jump
        history.pushState(null, null, targetId);
      }
    });
  });

  // Tag all non-GSAP animated glass cards as revealed immediately
  document.querySelectorAll('.glass-card').forEach(card => {
    if (!card.matches('.case-study-content, .project-card-large, .project-card-small, .skills-category, .contact-card-form')) {
      card.classList.add('gsap-revealed');
    }
  });

  initParticleBackground();
  initHeroTypewriter();
  initScrollAnimations();
  initTerminalCLI();
  initAIHelperChatbot();
  
  // Trigger initial RAG simulation
  runRagSimulation('court');
});

/* =========================================================================
   1. CANVAS PARTICLE SYSTEM (Ambient Multi-Agent Node Flow)
   ========================================================================= */
function initParticleBackground() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 40 : 80;
  const connectionDistance = 120;
  
  let mouse = {
    x: null,
    y: null,
    radius: 180
  };
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.3 + 0.1;
      this.alpha = this.baseAlpha;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      
      // Mouse interaction (Soft Attraction/Glow)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 0.8;
          this.y -= (dy / dist) * force * 0.8;
          this.alpha = Math.min(0.8, this.baseAlpha + force * 0.5);
        } else {
          if (this.alpha > this.baseAlpha) this.alpha -= 0.02;
        }
      } else {
        if (this.alpha > this.baseAlpha) this.alpha -= 0.02;
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${this.alpha})`;
      ctx.fill();
    }
  }
  
  function setupParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  setupParticles();
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < connectionDistance) {
          const force = (connectionDistance - dist) / connectionDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Blended cyan & purple lines
          ctx.strokeStyle = `rgba(104, 107, 253, ${force * 0.08})`;
          ctx.lineWidth = force * 0.6;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* =========================================================================
   2. HERO TYPEWRITER ENGINE (Rotating Role Specs)
   ========================================================================= */
function initHeroTypewriter() {
  const words = [
    "Large Language Models (LLMs)", 
    "Multi-Agent Workflows", 
    "Bilingual RAG Architectures", 
    "Secure Identity Platforms", 
    "Distributed Microservices",
    "Self-Healing Agent Systems"
  ];
  const target = document.getElementById("typewriter-text");
  if (!target) return;
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  type();
}

/* =========================================================================
   3. GSAP SCROLL TRIGGER ANIMATION SUITE (Cinematic Transitions)
   ========================================================================= */
function initScrollAnimations() {
  // Navigation bar background reveal on scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Staggered reveal headings
  gsap.utils.toArray(".section-header").forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    });
  });

  // Timeline Cases Reveal
  gsap.utils.toArray(".timeline-item").forEach(item => {
    const content = item.querySelector(".case-study-content");
    const sidebar = item.querySelector(".case-study-sidebar");
    const dot = item.querySelector(".timeline-dot");
    
    gsap.from(dot, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%"
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    });

    // Animate content (the glass card) separately to resolve CSS transition conflicts
    gsap.from(content, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all",
      onComplete: () => {
        content.classList.add("gsap-revealed");
      }
    });

    // Animate sidebar
    gsap.from(sidebar, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 40,
      delay: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });
  });

  // Projects Grid Items Reveal
  gsap.from(".projects-grid > *", {
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
    clearProps: "all",
    onComplete: function() {
      this.targets().forEach(t => t.classList.add("gsap-revealed"));
    }
  });

  // Skills Category Cards & Progress Bar Animations
  gsap.utils.toArray(".skills-category").forEach(category => {
    gsap.from(category, {
      scrollTrigger: {
        trigger: category,
        start: "top 85%"
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
      onComplete: () => {
        category.classList.add("gsap-revealed");
      }
    });
    
    // Animate inner skills bars
    const bars = category.querySelectorAll(".skill-bar-inner");
    bars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = "0%"; // Reset first
      
      gsap.to(bar, {
        scrollTrigger: {
          trigger: category,
          start: "top 80%"
        },
        width: targetWidth,
        duration: 1.4,
        ease: "power4.out"
      });
    });
  });

  // Contact Grid Reveal
  gsap.from(".contact-grid > *", {
    scrollTrigger: {
      trigger: ".contact-grid",
      start: "top 85%"
    },
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out",
    clearProps: "all",
    onComplete: function() {
      this.targets().forEach(t => t.classList.add("gsap-revealed"));
    }
  });

  // Floating Metrics Counts Interpolation
  const metrics = document.querySelectorAll(".metric-val");
  metrics.forEach(metric => {
    const target = parseInt(metric.getAttribute("data-target"), 10);
    
    gsap.to(metric, {
      scrollTrigger: {
        trigger: ".hero-metrics",
        start: "top 90%"
      },
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      ease: "power2.out",
      onUpdate: function() {
        // Formatting counts (e.g. adding commas or suffixes)
        const val = Math.floor(metric.innerText);
        if (target >= 1000) {
          metric.innerHTML = (val / 1000).toFixed(1) + "K+";
        } else if (target === 100) {
          metric.innerHTML = val + "M+";
        } else if (target === 2) {
          metric.innerHTML = val + "M+";
        } else {
          metric.innerHTML = val;
        }
      }
    });
  });

  // Active section scroll spying
  const sections = document.querySelectorAll("section, header");
  const navLinks = document.querySelectorAll(".nav-link");
  
  function updateScrollSpy() {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute("id");
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  }
  
  window.addEventListener("scroll", updateScrollSpy);
  // Run scroll spy on initialization to correct highlighted links
  updateScrollSpy();
}

/* =========================================================================
   4. BILINGUAL RAG SIMULATOR CONTROLLER (Live pipeline flow)
   ========================================================================= */
const simulationData = {
  court: {
    query: "How does the Supreme Court of Nepal review bills?",
    step1: "Extracting linguistic markers: <span class='terminal-text-cyan'>'Supreme Court'</span>, <span class='terminal-text-cyan'>'Nepal'</span>, <span class='terminal-text-cyan'>'review bills'</span>. Conducting bilingual translation mapping... [SUCCESS]",
    step2: "Computing vector queries with 1,536-dim embedding models. Initiating search scan in collection <span class='terminal-text-indigo'>'legislation_acts'</span>... Nearest neighbors distance threshold: 0.89",
    step3: "MATCH FOUND: <span class='terminal-text-white'>Constitution of Nepal, Chapter 5, Article 111.</span> Retrived chunk size: 842 tokens. Section details 'Procedures for Assent of Bills' isolated.",
    step4: "LLM synthesis using contextual reinforcement: <strong class='terminal-text-white'>Passed Bills are submitted to the President. If returned with critiques, Parliament conducts revisions...</strong>",
    log: "RAG_CORE_DAEMON: Computed retrieval matrix in 38ms. Semantic density threshold: 0.94."
  },
  rights: {
    query: "What are the core rights protected under Article 16?",
    step1: "Linguistic match: <span class='terminal-text-cyan'>'Article 16'</span>, <span class='terminal-text-cyan'>'fundamental rights'</span>. Initiating parallel English-Nepali query expansion... [SUCCESS]",
    step2: "Scanning database node partitions in <span class='terminal-text-indigo'>'constitution_bilingual'</span>. Dense embedding search similarity index: 0.96. Document mapping: active.",
    step3: "MATCH FOUND: <span class='terminal-text-white'>Article 16 (Right to live with dignity).</span> Sub-clause extracted: 'No law shall be made providing for capital punishment.'",
    step4: "LLM output: <strong class='terminal-text-white'>Guarantees every person the right to live with dignity. Strictly prohibits legislations enforcing death penalties.</strong>",
    log: "RAG_CORE_DAEMON: Semantic match score: 0.98. Query resolved in 24ms."
  },
  forgery: {
    query: "What is the penalty for contract forgery?",
    step1: "Token parsing: <span class='terminal-text-cyan'>'forgery penalty'</span>. <span class='terminal-text-purple'>[WARNING]</span> Outdated Act code detected. Redirecting request to self-healing schema mapping database...",
    step2: "Self-repair logic activated. Re-indexing query vectors on <span class='terminal-text-indigo'>'Muluki_Civil_Code_2074'</span> (updated registry). Embedding index cache refreshed successfully.",
    step3: "MATCH FOUND: <span class='terminal-text-white'>Chapter 14, Article 520 (Contract Liabilities).</span> Extracted terms regarding complete asset restitution and operational damages.",
    step4: "LLM alignment response: <strong class='terminal-text-white'>Forged contracts hold zero legal weight. Court mandates total asset return and financial liabilities compensation.</strong>",
    log: "KNOWLEDGE_HEALER: Dynamic self-repair routine resolved. Refresh latency: 56ms."
  }
};

function runRagSimulation(queryType) {
  const data = simulationData[queryType];
  if (!data) return;
  
  // Highlight selector button
  const buttons = document.querySelectorAll(".rag-query-btn");
  buttons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("onclick").includes(queryType)) {
      btn.classList.add("active");
    }
  });
  
  // Reset stages
  const stages = document.querySelectorAll(".rag-stage");
  stages.forEach(st => st.classList.remove("active"));
  
  const bodies = {
    1: document.getElementById("rag-stage-1-body"),
    2: document.getElementById("rag-stage-2-body"),
    3: document.getElementById("rag-stage-3-body"),
    4: document.getElementById("rag-stage-4-body")
  };
  
  const logStream = document.getElementById("rag-log-stream");
  
  // Set contents
  bodies[1].innerHTML = `<span class='terminal-text-white'>Query:</span> "${data.query}"<br><br>${data.step1}`;
  bodies[2].innerHTML = data.step2;
  bodies[3].innerHTML = data.step3;
  bodies[4].innerHTML = data.step4;
  
  logStream.innerHTML = "SYSTEM INIT: Launching bilingual text parsing...";
  
  // Stage animation timelines
  setTimeout(() => {
    document.getElementById("rag-stage-1").classList.add("active");
    logStream.innerHTML = "RAG_DAEMON: Translating structures and processing query embeddings...";
  }, 100);
  
  setTimeout(() => {
    document.getElementById("rag-stage-2").classList.add("active");
    logStream.innerHTML = "VECTOR_INDEXER: Scanning Qdrant coordinate cluster matrices...";
  }, 1200);
  
  setTimeout(() => {
    document.getElementById("rag-stage-3").classList.add("active");
    logStream.innerHTML = "CONTEXT_BUILDER: Document fragments isolated. Re-ordering ranks...";
  }, 2400);
  
  setTimeout(() => {
    document.getElementById("rag-stage-4").classList.add("active");
    logStream.innerHTML = data.log;
  }, 3600);
}

/* =========================================================================
   5. OPERATOR TERMINAL CLI INTERPRETER (Developer Dashboard Console)
   ========================================================================= */
const cliOutputTemplates = {
  help: `
    <span class="terminal-text-cyan">Available System Utilities:</span>
    ---------------------------------------------------------
    <span class="terminal-text-white">about</span>       - Print a biographical summary of Riwaz Udas.
    <span class="terminal-text-white">skills</span>      - Print technical command matrix & competence levels.
    <span class="terminal-text-white">matrix</span>      - Trigger visual cryptographic data scan streams.
    <span class="terminal-text-white">system</span>      - Output node technical metrics & pipeline diagnostic logs.
    <span class="terminal-text-white">secret</span>      - Retrieve encrypted background operations memo.
    <span class="terminal-text-white">clear</span>       - Wipe the local operator terminal history.
    ---------------------------------------------------------
  `,
  about: `
    <span class="terminal-text-cyan">COGNITIVE COMPILING AGENT ID: Riwaz Udas</span>
    ---------------------------------------------------------
    <span class="terminal-text-white">Credentials:</span> Master of Computer Science, University of Melbourne
    <span class="terminal-text-white">Focus Areas:</span> LLM Finetuning (LoRA), High-Throughput Distributed Backends
    <span class="terminal-text-white">Experience:</span> Member of Technical Staff I & Software Engineer at Byju's,
                where I engineered identity platforms handling 100M+
                annual audits and 2M+ daily active connections.
    <span class="terminal-text-white">Mission:</span>    Crafting resilient, secure, self-healing machine learning
                and platform ecosystems.
    ---------------------------------------------------------
  `,
  skills: `
    <span class="terminal-text-cyan">OPERATOR SKILLS MATRIX:</span>
    ---------------------------------------------------------
    - Python (PyTorch, Transformers, LoRA)    [██████████████████] 95%
    - Go / Golang (APIs, Ory Hydra, Kafka)   [█████████████████] 90%
    - Java / Spring Boot (Microservices)     [████████████████] 85%
    - RAG Frameworks & Vector DBs            [██████████████████] 95%
    - Prometheus & Grafana Telemetry         [█████████████████] 88%
    - Kubernetes, Docker & Cloud DevOps     [█████████████████] 90%
    ---------------------------------------------------------
  `,
  system: `
    <span class="terminal-text-cyan">SYSTEM DIAGNOSTIC LOGS:</span>
    ---------------------------------------------------------
    HOST_NODE_OS      : OperatorOS v1.2.0-Production
    AGENT_ENGINE      : Gemini-3-Flash-Agentic
    THROUGHPUT_AUDIT  : 100M+ secure sweeps / year (Byju's platform)
    LATENCY_RAG       : Avg. bilingual retrieval lookup 35ms (NepalLaw)
    NEURAL_DENSITIES  : LLaMA-8B-Instruct, Gemma-7B, Mistral-7B
    SYSTEM_STATUS     : <span class="pulse-dot" style="display:inline-block; vertical-align:middle;"></span> ACTIVE_RUNNING
    ---------------------------------------------------------
  `,
  secret: `
    <span class="terminal-text-indigo">[ENCRYPTED DECREE RECEIVED]</span>
    ---------------------------------------------------------
    "Riwaz is architecting a multi-agent pipeline capable of
     self-correcting structural errors inside vector coordinate mappings.
     If you are reading this command, you have successfully initialized
     the operator secret route. Deploy code. Automate everything."
    ---------------------------------------------------------
  `
};

function initTerminalCLI() {
  const input = document.getElementById("terminal-input");
  const body = document.getElementById("terminal-body");
  if (!input || !body) return;
  
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const commandText = input.value.trim().toLowerCase();
      input.value = "";
      
      if (!commandText) return;
      
      // Print command line
      const cmdRow = document.createElement("div");
      cmdRow.className = "terminal-line";
      cmdRow.innerHTML = `<span class="terminal-prompt">riwaz@operator:~$</span> <span class="terminal-text-white">${commandText}</span>`;
      body.insertBefore(cmdRow, document.getElementById("terminal-input-row"));
      
      // Process Command
      const outputLine = document.createElement("div");
      outputLine.className = "terminal-line";
      
      if (commandText === "clear") {
        // Clear all elements except the input row
        const lines = body.querySelectorAll(".terminal-line");
        lines.forEach(l => l.remove());
      } else if (cliOutputTemplates[commandText]) {
        outputLine.innerHTML = cliOutputTemplates[commandText];
        body.insertBefore(outputLine, document.getElementById("terminal-input-row"));
      } else if (commandText === "matrix") {
        outputLine.innerHTML = `<span class="terminal-text-cyan">Establishing direct bit stream tunnel...</span><br>`;
        body.insertBefore(outputLine, document.getElementById("terminal-input-row"));
        triggerMatrixStream();
      } else {
        outputLine.innerHTML = `bash: command not found: <span class="terminal-text-white">${commandText}</span>. Type <span class="terminal-text-cyan">help</span> for system diagnostics commands.`;
        body.insertBefore(outputLine, document.getElementById("terminal-input-row"));
      }
      
      // Scroll to bottom
      body.scrollTop = body.scrollHeight;
    }
  });
}

function triggerMatrixStream() {
  const body = document.getElementById("terminal-body");
  const inputRow = document.getElementById("terminal-input-row");
  let frames = 0;
  
  function printMatrixRow() {
    if (frames > 15) {
      const finishLine = document.createElement("div");
      finishLine.className = "terminal-line terminal-text-cyan";
      finishLine.innerHTML = `Matrix code pipeline verification complete. [STABLE]`;
      body.insertBefore(finishLine, inputRow);
      body.scrollTop = body.scrollHeight;
      return;
    }
    
    let chars = "010101XYZ{}[]<>$#!@%^&*()";
    let text = "";
    for (let i = 0; i < 50; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const row = document.createElement("div");
    row.className = "terminal-line terminal-text-indigo";
    row.style.opacity = 1 - (frames * 0.05);
    row.textContent = `0x${frames.toString(16).toUpperCase()} >>  ` + text;
    
    body.insertBefore(row, inputRow);
    body.scrollTop = body.scrollHeight;
    
    frames++;
    setTimeout(printMatrixRow, 60);
  }
  
  printMatrixRow();
}

// Global hook to support keyword clicks and inject info logs directly inside the CLI
function showTerminalMsg(topic) {
  const body = document.getElementById("terminal-body");
  const inputRow = document.getElementById("terminal-input-row");
  if (!body) return;
  
  const line = document.createElement("div");
  line.className = "terminal-line";
  
  const timestamps = new Date().toLocaleTimeString();
  
  const messages = {
    uom: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">UOM_NODE:</span> Resolving Master's specialization... Specialized in Multimodal LLMs, Distributed Systems, ML in Health, AI for Autonomy. Master's Thesis focused on Geotagging and instruction-tuning. Grade Average: H1.`,
    llms: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">LLM_ENG:</span> Activating fine-tuning layer. Adjusting hyper-parameters of Mistral, LLaMA, and Gemma via QLoRA. Successfully compiled multi-task geographic prediction architectures on millions of data nodes.`,
    rag: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">RAG_AGENT:</span> Initializing semantic search index on collection 'NepalLaw'. Bilingual vectors mapping: ON. Self-healing node daemon: operational.`,
    go: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">GO_ENGINE:</span> Initializing OAuth 2.0 Ory Hydra identity daemon. Rate-limiting middleware: active. 100M+ auth database sweep cleanups processed with sub-millisecond thread lock times.`,
    python: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">PYTHON_CORE:</span> Deploying PyTorch neural layers. Activating Hugging Face transformer libraries. Setting up token weights and gradient tracking optimization nodes.`,
    ops: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">PLATFORM_OPS:</span> Containerized backend microservices built in Docker. Deploying load balancing grids on AWS ECS and EKS. Automating delivery chains from GitHub commits.`,
    oauth: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">AUTH_SHIELD:</span> Deploying Ory Hydra secure OAuth 2.0 structures. Creating sliding-window middleware blockades. Neutralized 50K+ malicious authentication attempts.`,
    hydra: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">HYDRA_PLATFORM:</span> Handling scale for 2M+ active consumers. Managing custom database indices to maximize security API processing rates.`,
    ratelimit: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">MIDDLEWARE_RL:</span> Sliding-window IP rate limiter triggered. Blocking excessive request payloads. Adaptive threat matrix analysis activated.`,
    rl: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">Q_SCHEDULER:</span> Running task placement simulators. Policy networks trained via PPO & SAC to allocate cloud workloads efficiently.`,
    prometheus: `<span class="terminal-text-white">[${timestamps}]</span> <span class="terminal-text-cyan">TELEMETRY:</span> Scraping API metrics channels. Grafana alerts status: OK. 15+ real-time incidents thresholds monitored.`
  };
  
  if (messages[topic]) {
    line.innerHTML = messages[topic];
    body.insertBefore(line, inputRow);
    body.scrollTop = body.scrollHeight;
    
    // Smooth scroll contact/terminal into view if not visible
    document.getElementById("contact").scrollIntoView({ behavior: 'smooth' });
    document.getElementById("terminal-input").focus();
  }
}

/* =========================================================================
   6. CONTACT FORM DISPATCH INJECTION ROUTINE (Simulating live operations)
   ========================================================================= */
function triggerFormContact() {
  const name = document.getElementById("form-name").value;
  const email = document.getElementById("form-email").value;
  const msg = document.getElementById("form-msg").value;
  
  const body = document.getElementById("terminal-body");
  const inputRow = document.getElementById("terminal-input-row");
  if (!body) return;
  
  // 1. Inject alert line in terminal showing connection route
  const alertLine = document.createElement("div");
  alertLine.className = "terminal-line terminal-text-indigo";
  alertLine.innerHTML = `
    [ALERT EVENT TRIGGERED] Routing incoming connection...<br>
    ---------------------------------------------------------<br>
    SENDER   : ${name}<br>
    ENDPOINT : ${email}<br>
    PAYLOAD  : "${msg.substring(0, 60)}..."<br>
    ---------------------------------------------------------<br>
    [STATUS] Packet dispatched to EmailJS network pipeline...
  `;
  body.insertBefore(alertLine, inputRow);
  body.scrollTop = body.scrollHeight;
  
  // Flash terminal widget border to alert theme (indigo)
  const widget = document.getElementById("cli-widget");
  if (widget) {
    widget.style.borderColor = "var(--accent-indigo)";
    widget.style.boxShadow = "0 0 30px rgba(99, 102, 241, 0.2)";
  }

  // Reset form fields immediately for clean client UX
  document.getElementById("contact-form").reset();

  // 2. EmailJS Dispatch Logic
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    const templateParams = {
      name: name,
      from_name: name,
      email: email,
      from_email: email,
      message: msg,
      time: new Date().toLocaleString()
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        // Success terminal log
        const successLine = document.createElement("div");
        successLine.className = "terminal-line terminal-text-cyan";
        successLine.innerHTML = `[SUCCESS] Email successfully dispatched via EmailJS! Check your inbox.`;
        body.insertBefore(successLine, inputRow);
        body.scrollTop = body.scrollHeight;
        
        if (widget) {
          widget.style.borderColor = "var(--accent-cyan)";
          widget.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.2)";
          setTimeout(() => {
            widget.style.borderColor = "var(--glass-border)";
            widget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.4)";
          }, 1500);
        }
      })
      .catch((error) => {
        // Failure terminal log
        const errorLine = document.createElement("div");
        errorLine.className = "terminal-line terminal-text-red";
        errorLine.innerHTML = `[ERROR] EmailJS dispatch failed: ${error.text || error.message || 'Unknown network error'}`;
        body.insertBefore(errorLine, inputRow);
        body.scrollTop = body.scrollHeight;
        
        if (widget) {
          widget.style.borderColor = "red";
          widget.style.boxShadow = "0 0 30px rgba(255, 0, 0, 0.2)";
          setTimeout(() => {
            widget.style.borderColor = "var(--glass-border)";
            widget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.4)";
          }, 1500);
        }
      });
  } else {
    // Simulated fallback mode (when EMAILJS credentials are not pasted yet)
    setTimeout(() => {
      const successLine = document.createElement("div");
      successLine.className = "terminal-line terminal-text-cyan";
      successLine.innerHTML = `[SUCCESS] Packet dispatched to Riwaz's SMTP pipeline (SIMULATED).<br>
      *(To activate live email delivery, please edit 'app.js' and fill in your EmailJS Public Key, Service ID, and Template ID).*`;
      body.insertBefore(successLine, inputRow);
      body.scrollTop = body.scrollHeight;
      
      if (widget) {
        widget.style.borderColor = "var(--accent-cyan)";
        widget.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.2)";
        setTimeout(() => {
          widget.style.borderColor = "var(--glass-border)";
          widget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.4)";
        }, 1500);
      }
      
      alert("Message Payload Dispatched! Check the terminal console next to the form to view the simulated log.");
    }, 800);
  }
}

/* =========================================================================
   8. CLIENT-SIDE GEMINI RAG CHATBOT CONTROLLER
   ========================================================================= */

// Initial Semantic Knowledge Base Chunks (Pre-processed plain-text resume blocks)
const initialResumeChunks = [
  {
    tag: "SUMMARY",
    text: "Riwaz Udas is an AI Engineer with a Master's degree in Computer Science from the University of Melbourne, specializing in Large Language Models, multimodal machine learning, and geospatial AI systems. Experienced in fine-tuning and deploying transformer models using PyTorch and Hugging Face, and building production-grade backend systems using Go and Spring Boot. Strong background in scalable APIs, authentication infrastructure, database optimization, and monitoring systems."
  },
  {
    tag: "AI_SKILLS",
    text: "Artificial Intelligence and Machine Learning Skills: PyTorch, TensorFlow, Scikit-learn, Reinforcement Learning (PPO, SAC, A2C, IMPALA). LLM & NLP Tooling: Hugging Face Transformers, Prompt Engineering, Instruction Tuning, LoRA Fine-tuning, Retrieval-Augmented Generation (RAG)."
  },
  {
    tag: "BACKEND_SKILLS",
    text: "Programming Languages & Backend Tools: Python, Go, Java, JavaScript, C, C#. Databases: PostgreSQL, MySQL, MongoDB, Query Optimization, Indexing, Vector Databases. Backend & APIs: Spring Boot, FastAPI, NodeJS, REST API Design, OAuth 2.0 Security, Identity Systems, and Microservices. DevOps & Cloud: AWS, Google Cloud, Firebase, Kafka, Linux, Git, Docker, Kubernetes, Prometheus, Grafana."
  },
  {
    tag: "EXP_BYJUS_MTS",
    text: "Experience at Byju's (Bangalore, India) as Member of Technical Staff I (Oct 2023 - Jan 2024): Developed and maintained auth/authz systems based on OAuth 2.0 using Ory Hydra. Designed and maintained 30+ production REST APIs supporting identity services used across large-scale products. Coordinated third-party mobile OTP login-link systems. Implemented Go sliding-window rate limiting middleware blocking 50K+ malicious requests. Automated cleanups for OAuth records in Ory Hydra using Go, processing 100M+ records annually. Optimized SQL queries for databases supporting 2M+ daily active users. Containerized microservices using Docker and deployed them on AWS ECS/EKS with GitHub Actions CI/CD."
  },
  {
    tag: "EXP_BYJUS_INTERN",
    text: "Experience at Byju's as Software Engineering Intern (Jan 2023 - Sep 2023): Contributed to a Golang-based OAuth 2.0 identity platform responsible for login flows across 10+ internal products. Integrated Prometheus custom metrics to monitor request latency, authentication failures, and API throughput across 30+ APIs. Constructed Grafana observability dashboards and alert pipelines with 15+ automated alert configurations."
  },
  {
    tag: "EXP_QUANTUM_AI",
    text: "Experience at Quantum AI Cloud (Melbourne, Australia) as Research Intern (Jul 2024 - Sep 2024): Developed reinforcement learning frameworks for intelligent task scheduling in quantum cloud computing environments. Implemented and benchmarked advanced RL algorithms including A2C, PPO, SAC, and IMPALA for dynamic workload allocation on hybrid classical-quantum hardware."
  },
  {
    tag: "PROJ_THESIS",
    text: "Master's Thesis Project: Social Media Geotagging using Large Language Models at the University of Melbourne. Designed a multimodal geolocation prediction system combining textual signals, metadata, and hierarchical location structures. Fine-tuned Gemma-7B, LLaMA-8B, and Mistral-7B transformer models using PyTorch, Hugging Face, instruction tuning, prompt engineering, and LoRA-based fine-tuning over a dataset of millions of Australian geotagged posts."
  },
  {
    tag: "PROJ_NEPAL_LAW_AI",
    text: "Project: Nepal Law AI Chatbot & Ingestion Pipeline using Retrieval-Augmented Generation (RAG). Built a self-healing legal assistant capable of answering bilingual (English/Nepali) legislative queries. Developed autonomous web scrapers to collect legal codes from online repositories. Integrated multilingual embedding models and semantic vector search. Constructed automated knowledge-base self-repair pipelines to detect outdated legal files, refresh embeddings, and resolve match anomalies."
  },
  {
    tag: "PROJ_SENTIMENT",
    text: "Project: Sentiment Analysis Web Application. Fine-tuned a BERT transformer model using Hugging Face Transformers for restaurant review sentiment classification. Developed a FastAPI-based inference REST service and deployed a React frontend via Firebase Hosting and Cloud Functions."
  },
  {
    tag: "PROJ_SIGNATURE",
    text: "Project: Signature Forgery Detection using CNN. Trained a ResNet-based Convolutional Neural Network (CNN) in PyTorch to analyze and identify forged handwritten signatures. Constructed and labelled a custom dataset of 1200+ signatures."
  },
  {
    tag: "PROJ_AKI_PREDICTION",
    text: "Project: Acute Kidney Injury Prediction in ICU. Developed predictive machine learning models (Random Forest, Gradient Boosting classifiers) in Python to predict Acute Kidney Injury (AKI) risk from medication records, demographics, and clinical diagnostic telemetry."
  },
  {
    tag: "EDUCATION",
    text: "Education Credentials: Master of Computer Science from the University of Melbourne (Feb 2024 - Dec 2025). Coursework: Computer Vision, Distributed Systems, Advanced Databases, AI Planning for Autonomy, Machine Learning in Health. Bachelor of Technology (B.Tech) in Computer Science and Engineering from Vellore Institute of Technology, India (2019 - 2023)."
  },
  {
    tag: "CERTIFICATIONS",
    text: "Professional Certifications: Salesforce Certified AI Associate; Algorithmic Thinking (Rice University - Coursera); Artificial Intelligence Foundation Certification (NASSCOM); Big Data Foundation Certification (NASSCOM); Kotlin for Java Developers (JetBrains - Coursera)."
  }
];

// Active State Storage
let knowledgeBase = [];
let geminiApiKey = "";
let geminiModel = "gemini-2.5-flash";
let cachedEmbeddings = {};

// GCP Secure Cloud Function Relay URL (Pattern A)
// If you deploy Pattern A, paste your Cloud Function URL here (e.g. 'https://us-central1-myproject.cloudfunctions.net/gemini-relay')
// This allows secure API execution across all devices on the internet without storing any keys locally!
const gcpRelayUrl = "https://gemini-relay-970435669308.asia-southeast3.run.app"; 

/**
 * Initializes the AI Chatbot mechanics, event listeners, and default Vector DB chunks
 */
function initAIHelperChatbot() {
  // Load settings from storage
  geminiApiKey = localStorage.getItem("gemini_rag_apikey") || "";
  geminiModel = localStorage.getItem("gemini_rag_model") || "gemini-2.5-flash";
  
  // Load cached embeddings
  const rawCache = localStorage.getItem("gemini_rag_embeddings");
  if (rawCache) {
    try {
      cachedEmbeddings = JSON.parse(rawCache);
    } catch (e) {
      console.error("Failed to parse embeddings cache, resetting", e);
      cachedEmbeddings = {};
    }
  }

  // Initialize active knowledge base chunks (support custom resume chunks override from Admin)
  let activeChunksList = initialResumeChunks;
  const rawCustomResumeChunks = localStorage.getItem("chatbot_custom_resume_chunks");
  if (rawCustomResumeChunks) {
    try {
      activeChunksList = JSON.parse(rawCustomResumeChunks);
    } catch (e) {
      console.error("Failed to parse custom resume chunks from localStorage, defaulting", e);
    }
  }

  knowledgeBase = activeChunksList.map((chunk, index) => ({
    id: index,
    tag: chunk.tag,
    text: chunk.text,
    vector: (typeof precomputedEmbeddings !== 'undefined' && precomputedEmbeddings[chunk.text]) || cachedEmbeddings[chunk.text] || null
  }));

  // Merge custom facts from localStorage
  const rawCustomFacts = localStorage.getItem("gemini_rag_custom_facts");
  if (rawCustomFacts) {
    try {
      const customFacts = JSON.parse(rawCustomFacts);
      customFacts.forEach((fact, idx) => {
        knowledgeBase.push({
          id: `custom_${idx}`,
          tag: "CUSTOM_FACT",
          text: fact,
          vector: cachedEmbeddings[fact] || null
        });
      });
    } catch (e) {
      console.error("Failed to parse custom facts", e);
    }
  }

  // Update Status Display
  updateApiStatusIndicator();

  // If API Key or GCP Cloud Function Relay is present, trigger async background generation for missing embeddings
  if (geminiApiKey || gcpRelayUrl) {
    triggerBackgroundEmbedding();
  }
}

/**
 * Toggles the visibility of the expanded chatbot widget
 */
function toggleChatbot() {
  const panel = document.getElementById("chatbot-panel");
  if (!panel) return;

  panel.classList.toggle("hidden");
  
  // Focus input if opened
  if (!panel.classList.contains("hidden")) {
    const input = document.getElementById("chat-input");
    if (input) setTimeout(() => input.focus(), 100);
  }
}

/**
 * Updates visual badges and status indicators across panels
 */
function updateApiStatusIndicator() {
  const chatStatus = document.getElementById("chatbot-api-status");

  if (gcpRelayUrl) {
    if (chatStatus) {
      chatStatus.textContent = "API Status: GCP Relay Active";
      chatStatus.style.color = "var(--accent-cyan)";
    }
  } else if (geminiApiKey) {
    if (chatStatus) {
      chatStatus.textContent = "API Status: Neural RAG Active";
      chatStatus.style.color = "var(--accent-cyan)";
    }
  } else {
    if (chatStatus) {
      chatStatus.textContent = "API Status: Keyword Fallback Mode";
      chatStatus.style.color = "var(--text-muted)";
    }
  }
}

/**
 * Loops and generates missing vectors in the background
 */
async function triggerBackgroundEmbedding() {
  if (!geminiApiKey && !gcpRelayUrl) return;

  let updated = false;
  for (let i = 0; i < knowledgeBase.length; i++) {
    const chunk = knowledgeBase[i];
    if (!chunk.vector) {
      console.log(`[RAG ENGINE] Background embedding generation for Chunk #${chunk.id}...`);
      try {
        const vec = await embedText(chunk.text);
        if (vec) {
          chunk.vector = vec;
          cachedEmbeddings[chunk.text] = vec;
          updated = true;
        }
        // Small delay to prevent API key quota exhaust
        await new Promise(r => setTimeout(r, 200));
      } catch (e) {
        console.error(`Failed background embedding for chunk ${chunk.id}`, e);
        break; // Stop loop on API errors
      }
    }
  }

  if (updated) {
    localStorage.setItem("gemini_rag_embeddings", JSON.stringify(cachedEmbeddings));
    console.log("[RAG ENGINE] All background resume vectors synced and saved successfully!");
  }
}

/**
 * Sends a query using standard prompt chips
 */
function sendPromptChip(text) {
  const input = document.getElementById("chat-input");
  if (input) {
    input.value = text;
    sendChatMessage();
  }
}

/**
 * Handles sending messages, running cosine similarity comparison, and invoking Gemini
 */
async function sendChatMessage() {
  const input = document.getElementById("chat-input");
  if (!input || !input.value.trim()) return;

  const queryText = input.value.trim();
  input.value = "";

  // Append user bubble
  appendChatBubble("user", queryText);

  // Scroll to bottom
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Append diagnostic log loader
  const diagnosticId = appendDiagnosticLog("⚡ [VECTOR_DB]: Fetching query context...");

  let retrievedContext = "";
  let matchedScoresLog = "";

  try {
    if (geminiApiKey || gcpRelayUrl) {
      // Step 1: Embed Query
      updateDiagnosticLog(diagnosticId, "⚡ [VECTOR_DB]: Query embedding initiated via gemini-embedding-001...");
      const queryVector = await embedText(queryText);
      
      if (!queryVector) {
        throw new Error("Failed to retrieve embedding vector.");
      }

      // Step 2: Compute Cosine Similarities
      updateDiagnosticLog(diagnosticId, "⚡ [COSINE_MATRIX]: Comparing distance values against indexed database vectors...");
      const scoredChunks = knowledgeBase
        .map(chunk => {
          if (!chunk.vector) return { chunk, score: 0 };
          return { chunk, score: cosineSimilarity(queryVector, chunk.vector) };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

      // Step 3: Extract Top 3 chunks
      const topMatches = scoredChunks.slice(0, 3);
      retrievedContext = topMatches.map(m => `[SOURCE: ${m.chunk.tag}] ${m.chunk.text}`).join("\n\n");

      // Compile matching diagnostic metrics
      matchedScoresLog = topMatches
        .map(m => `#${m.chunk.tag.substring(0,10)} (Similarity: ${m.score.toFixed(3)})`)
        .join(", ");
      updateDiagnosticLog(diagnosticId, `⚡ [NEAREST_NEIGHBORS]: Hits: ${matchedScoresLog}`);

      // Wait a fraction to simulate premium technical operator latency
      await new Promise(r => setTimeout(r, 600));

      // Step 4: Generate content via Gemini
      updateDiagnosticLog(diagnosticId, `⚡ [GEMINI_GENERATION]: Ingesting context payload to ${geminiModel}...`);
      
      const systemPrompt = `You are Riwaz Udas, a highly skilled AI Engineer and Software Developer. 
You are speaking directly with a visitor to your portfolio in the first person ("I", "me", "my", "we"). 
Your tone is confident, professional, friendly, and highly articulate. You are passionate about LLMs, Ory Hydra, Go backend engineering, and distributed scalable systems.

Answer the user's query directly and precisely using ONLY the facts in the provided context blocks. 
Keep your response concise, engaging, and aligned with your exact accomplishments. 

Context:
${retrievedContext}

If the context does NOT contain relevant facts to satisfy the query, politely say in character: "I don't have that specific details in my offline index, but I'd love to chat about it! Feel free to drop a message in my contact form below or reach me directly at udasriwaz@gmail.com!"

User Query: "${queryText}"
Answer:`;

      const responseText = await callGeminiGenerate(systemPrompt);
      
      // Purge log and append real answer
      removeDiagnosticLog(diagnosticId);
      appendChatBubble("assistant", responseText);

    } else {
      // Fallback: Local Keyword Overlap Parser
      updateDiagnosticLog(diagnosticId, "⚡ [SIMULATION_MODE]: Querying keyword indexing...");
      await new Promise(r => setTimeout(r, 500));

      const scoredChunks = localKeywordMatch(queryText);
      const topMatches = scoredChunks.slice(0, 3);
      
      retrievedContext = topMatches.map(m => m.chunk.text).join("\n\n");
      matchedScoresLog = topMatches.map(m => `#${m.chunk.tag} (Overlap: ${m.score})`).join(", ");
      
      updateDiagnosticLog(diagnosticId, `⚡ [SIMULATION_MATCH]: Hits: ${matchedScoresLog}`);
      await new Promise(r => setTimeout(r, 700));

      removeDiagnosticLog(diagnosticId);

      // Compile structured reply from matched sections in first person
      let structuredReply = `Hey! Based on my local offline indices for **"${queryText}"**, here is the relevant telemetry from my background:\n\n`;
      
      if (topMatches.length > 0 && topMatches[0].score > 0) {
        topMatches.forEach(m => {
          structuredReply += `*   **${m.chunk.tag}:** ${m.chunk.text}\n\n`;
        });
      } else {
        structuredReply += `I couldn't find any direct matches in my local database blocks for that query.\n\n`;
      }
      
      structuredReply += `\n*(Note: To unlock my full conversational AI engine, feel free to enter your Gemini API Key in the **Settings** tab above! It stays 100% secure in your local browser storage).*`;
      
      appendChatBubble("assistant", structuredReply);
    }
  } catch (err) {
    console.error("RAG flow failed", err);
    updateDiagnosticLog(diagnosticId, "❌ [CRITICAL_ERROR]: Telemetry check failed. Reverting.");
    setTimeout(() => {
      removeDiagnosticLog(diagnosticId);
      appendChatBubble("assistant", "My secure RAG network suffered a connection drop. Please confirm your internet connection and verify that your Gemini API key in the settings tab is fully valid.");
    }, 1200);
  }

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Performs a simple keyword overlap search in chunks
 */
function localKeywordMatch(query) {
  const stopWords = new Set(["i", "want", "to", "add", "a", "the", "and", "is", "of", "in", "what", "are", "his", "did", "he", "do", "at", "for", "with", "on", "about"]);
  const queryTokens = query.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(t => t.length > 1 && !stopWords.has(t));

  if (queryTokens.length === 0) {
    return knowledgeBase.map(chunk => ({ chunk, score: 0 }));
  }

  return knowledgeBase.map(chunk => {
    const chunkTextLower = chunk.text.toLowerCase();
    let score = 0;
    queryTokens.forEach(token => {
      const regex = new RegExp(`\\b${token}\\b`, 'g');
      const matches = chunkTextLower.match(regex);
      if (matches) {
        score += matches.length;
      }
    });
    return { chunk, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score);
}

/**
 * Calls Gemini gemini-embedding-001 API via secure HTTPS Fetch
 */
async function embedText(text) {
  if (gcpRelayUrl) {
    const response = await fetch(gcpRelayUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "embed",
        text: text
      })
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`GCP Relay Embedding error: ${response.status} - ${errText}`);
    }
    const data = await response.json();
    return data?.embedding?.values || null;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${geminiApiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/gemini-embedding-001",
      content: { parts: [{ text: text }] },
      outputDimensionality: 768
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Embedding API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data?.embedding?.values || null;
}

/**
 * Calls selected Gemini text generation endpoint
 */
async function callGeminiGenerate(prompt) {
  if (gcpRelayUrl) {
    const response = await fetch(gcpRelayUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "generate",
        prompt: prompt,
        model: geminiModel
      })
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`GCP Relay Generation error: ${response.status} - ${errText}`);
    }
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No output returned from neural node.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Generation API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No output returned from neural node.";
}

/**
 * Calculates high-dimensional Cosine Similarity
 */
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Visual bubble rendering helper
 */
function appendChatBubble(role, text) {
  const chatMessages = document.getElementById("chat-messages");
  if (!chatMessages) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-message ${role}`;
  
  // Format simple markdown lists & line breaks
  let formattedText = text
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
    
  bubble.innerHTML = formattedText;
  chatMessages.appendChild(bubble);
}

/**
 * Telemetry Diagnostics Log helper
 */
function appendDiagnosticLog(text) {
  const chatMessages = document.getElementById("chat-messages");
  if (!chatMessages) return null;

  const id = `diag_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const bubble = document.createElement("div");
  bubble.className = "chat-message system";
  bubble.id = id;
  bubble.textContent = text;
  
  chatMessages.appendChild(bubble);
  return id;
}

function updateDiagnosticLog(id, text) {
  const log = document.getElementById(id);
  if (log) log.textContent = text;
}

function removeDiagnosticLog(id) {
  const log = document.getElementById(id);
  if (log) log.remove();
}

