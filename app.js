/* =========================================================================
   APP.JS - Core Interactive Mechanics for Riwaz Udas Portfolio
   ========================================================================= */

// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  initParticleBackground();
  initHeroTypewriter();
  initScrollAnimations();
  initTerminalCLI();
  
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

    gsap.from([content, sidebar], {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 40,
      stagger: 0.2,
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
    ease: "power3.out"
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
      ease: "power2.out"
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
    ease: "power3.out"
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
  
  window.addEventListener("scroll", () => {
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
  });
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
  
  // Inject alert line in terminal
  const alertLine = document.createElement("div");
  alertLine.className = "terminal-line terminal-text-indigo";
  alertLine.innerHTML = `
    [ALERT EVENT TRIGGERED] Routing incoming connection...<br>
    ---------------------------------------------------------<br>
    SENDER   : ${name}<br>
    ENDPOINT : ${email}<br>
    PAYLOAD  : "${msg.substring(0, 60)}..."<br>
    ---------------------------------------------------------<br>
    [STATUS] Packet dispatched to Riwaz's SMTP pipeline. [SUCCESS]
  `;
  
  body.insertBefore(alertLine, inputRow);
  body.scrollTop = body.scrollHeight;
  
  // Flash terminal widget border
  const widget = document.getElementById("cli-widget");
  if (widget) {
    widget.style.borderColor = "var(--accent-cyan)";
    widget.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.2)";
    setTimeout(() => {
      widget.style.borderColor = "var(--glass-border)";
      widget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.4)";
    }, 1500);
  }
  
  // Reset form
  document.getElementById("contact-form").reset();
  
  // Trigger nice window alert
  alert("Message Payload Dispatched! Check the terminal console to view the telemetry log of your event.");
}
