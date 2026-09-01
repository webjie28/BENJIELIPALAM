<template>
  <div class="portfolio-app">
    <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }" aria-hidden="true"></div>
    <!-- Smooth Animated Fixed Background Glowing Spheres -->
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>

    <!-- Sticky Navigation Bar (Archi Green Inspiration) -->
    <header class="navbar animate-in">
      <div class="nav-content">
        <a href="#" class="nav-logo">
          <span class="logo-text">B</span><span class="logo-dot">L</span>
        </a>
        
        <!-- Hamburger Menu Button (Mobile) -->
        <button 
          class="hamburger-btn" 
          @click="toggleMobileMenu" 
          :class="{ active: mobileMenuOpen }"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <nav class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <a href="#origin" @click="closeMobileMenu">Origin</a>
          <a href="#creations" @click="closeMobileMenu">Projects</a>
          <a href="#automations" @click="closeMobileMenu">n8n</a>
          <a href="#thesis" @click="closeMobileMenu">Thesis</a>
          <button @click="showCV = true; closeMobileMenu()" class="cv-nav-btn">CV</button>
          
          <!-- Mobile-only: CTA and controls inside menu -->
          <div class="mobile-menu-extras">
            <a href="#connection" class="nav-cta-btn" @click="closeMobileMenu">Get In Touch</a>
            <div class="mobile-controls-row">
              <div class="theme-switcher">
                <button 
                  v-for="t in ['orange', 'teal', 'blue']" 
                  :key="t"
                  :class="['theme-dot', t, { active: activeTheme === t }]"
                  @click="changeTheme(t)"
                  :title="`Switch to ${t} accent theme`"
                ></button>
              </div>
              <button 
                @click="toggleDarkMode" 
                class="dark-mode-toggle"
                :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
              >
                <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="M4.93 4.93l1.41 1.41"></path>
                  <path d="M17.66 17.66l1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="M6.34 17.66l-1.41 1.41"></path>
                  <path d="M19.07 4.93l-1.41 1.41"></path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              </button>
              
              <div class="responsive-indicator" @click="showResponsiveAlert" title="Responsive Design Indicator">
                <div class="show-on-mobile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </div>
                <div class="show-on-desktop">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                </div>
              </div>

            </div>
          </div>
        </nav>

        <!-- Mobile menu backdrop -->
        <div class="mobile-menu-backdrop" :class="{ active: mobileMenuOpen }" @click="closeMobileMenu"></div>

        <div class="nav-right">
          <a href="#connection" class="nav-cta-btn">Get In Touch</a>
          
          <div class="nav-controls">
            <!-- Theme Switcher -->
            <div class="theme-switcher">
              <button 
                v-for="t in ['orange', 'teal', 'blue']" 
                :key="t"
                :class="['theme-dot', t, { active: activeTheme === t }]"
                @click="changeTheme(t)"
                :title="`Switch to ${t} accent theme`"
              ></button>
            </div>

            <!-- Dark/Light Mode Toggle -->
            <button 
              @click="toggleDarkMode" 
              class="dark-mode-toggle"
              :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            >
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="M4.93 4.93l1.41 1.41"></path>
                <path d="M17.66 17.66l1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="M6.34 17.66l-1.41 1.41"></path>
                <path d="M19.07 4.93l-1.41 1.41"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>

            <div class="responsive-indicator" @click="showResponsiveAlert" title="Responsive Design Indicator">
              <div class="show-on-mobile">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <div class="show-on-desktop">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>

    <div class="portfolio-container">
      <!-- FULL-SCREEN SPLIT HERO SECTION (Archi Green Layout) -->
      <section id="hero" class="hero-section">
        <!-- Ambient Hero Glow Layers (Dark Mode Only) -->
        <div class="hero-glow-layer primary-glow"></div>
        <div class="hero-glow-layer secondary-glow"></div>

        <div class="hero-content">
          <!-- Left Side: Typography -->
          <div class="hero-left">
            <h1 class="hero-title animate-in stagger-2">
              <span class="typewriter-text pinia-accent">Benjie Lipalam</span>
            </h1>
            <p class="hero-tagline animate-in stagger-3">
              Frontend developer building interfaces, agentic systems on the side.
            </p>
            <p class="hero-desc muted animate-in stagger-4">
              A Computer Science &amp; Web Design Enthusiast focused on visually appealing, responsive, and user-centric web applications. I combine modern frameworks with clean UI/UX principles.
            </p>

            <div class="hero-ctas animate-in stagger-5">
              <a href="#creations" class="cta-btn pinia-primary-btn">View Projects</a>
              <button @click="showCV = true" class="cta-btn pinia-secondary-btn">View My CV</button>
              <a href="https://github.com/webjie28" target="_blank" title="GitHub" class="cta-btn pinia-secondary-btn github-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <!-- Right Side: Graphic Portrait Frame -->
          <div class="hero-right animate-in">
            <div class="hero-image-frame">
              <img 
                v-if="hasImage" 
                :src="avatarImg" 
                alt="Benjie Lipalam" 
                class="hero-avatar"
                @error="hasImage = false"
              />
              <div v-else class="hero-avatar-fallback">BL</div>
            </div>

            <div class="hero-quick-facts animate-in stagger-4">
              <span class="hero-fact-tag"><span class="fact-bullet orange"></span> Frontend</span>
              <span class="hero-fact-tag"><span class="fact-bullet green"></span> UI/UX Design</span>
              <span class="hero-fact-tag"><span class="fact-bullet blue"></span> Agentic AI</span>
            </div>
          </div>
        </div>
        <a href="#origin" class="hero-scroll-cue" aria-label="Explore portfolio">
          <span>Explore the work</span><i></i>
        </a>
      </section>

      <section class="toolbelt" aria-label="Tools Benjie works with">
        <div class="toolbelt-mask">
          <div class="toolbelt-track">
            <div v-for="(tool, index) in [...toolStack, ...toolStack]" :key="`${tool.name}-${index}`" class="tool-card" :title="tool.name">
              <span class="tool-mark" :style="{ color: tool.color }"><img :src="tool.icon" :alt="`${tool.name} logo`" loading="lazy"></span><span>{{ tool.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <main class="portfolio-main">
        
        <!-- SECTION 1: THE ORIGIN -->
        <section id="origin" class="chapter-section scroll-section reveal-on-scroll origin-editorial">
          <div class="origin-head"><span class="section-index">01</span><div><span class="section-eyebrow">The origin</span><h2>The craft behind the systems.</h2></div></div>
          <div class="origin-story">
            <p class="origin-statement">I design interfaces people enjoy using—and engineer the systems that make them useful.</p>
            <div class="origin-copy"><p>My path began with technology, aesthetics, and the small details that make an interface feel natural. Computer Science gave me the structure; design gave that structure a human purpose.</p><p>Today, I bring both together in responsive web experiences and AI-assisted workflows that are clear, thoughtful, and practical.</p></div>
          </div>
          <div class="origin-milestones" aria-label="Benjie's journey">
            <article><span>01</span><h3>Foundation</h3><p>Algorithms, software engineering, and the discipline to build dependable products.</p></article>
            <article><span>02</span><h3>Interface</h3><p>Typography, layout, and interaction design that make technology feel approachable.</p></article>
            <article><span>03</span><h3>Systems</h3><p>Frontend craft connected to AI agents, n8n workflows, and useful automation.</p></article>
          </div>
          <div class="competency-rail reveal-on-scroll">
            <div class="competency-intro"><span class="section-eyebrow">Capabilities</span><h3>From interface to automation.</h3><p>Three disciplines, used together rather than shown as separate job titles.</p></div>
            <div class="competency-list">
              <article><span>01</span><div><h4>Product Engineering</h4><p>Vue, JavaScript, semantic HTML, responsive CSS, and maintainable implementation.</p></div></article>
              <article><span>02</span><div><h4>UI/UX Direction</h4><p>Clear hierarchy, balanced typography, interaction details, and visual systems.</p></div></article>
              <article><span>03</span><div><h4>AI &amp; Automation</h4><p>n8n, Gemini, APIs, and agentic workflows that turn routine work into useful systems.</p></div></article>
            </div>
          </div>
        </section>

        <!-- SECTION 2: THE CREATIONS -->
        <section id="creations" class="chapter-section scroll-section reveal-on-scroll">
          <div class="feature-shell feature-works">
            <div class="section-heading-row"><span class="section-index">02</span><div><span class="section-eyebrow">Selected work</span><h2 class="chapter-header">Interfaces with a point of view.</h2></div></div>
            <p class="chapter-subtitle">Short visual case studies built from real interfaces, workflow captures, and live project sources.</p>
            <div class="reel-grid">
              <article v-for="reel in systemReels" :key="reel.title" :class="['system-reel', reel.tone, 'reveal-on-scroll']">
                <div v-if="reel.kind === 'assistant'" class="assistant-demo">
                  <div class="assistant-demo-head"><span></span><b>Ask Benjie's AI</b><small>Live n8n + Gemini demo</small></div>
                  <div class="assistant-demo-body"><p v-if="!assistantDemoReply">Ask a real question about Benjie's work, skills, or projects.</p><p v-else>{{ assistantDemoReply }}</p></div>
                  <form @submit.prevent="runAssistantDemo"><input v-model="assistantDemoInput" maxlength="160" placeholder="What can Benjie build?" :disabled="assistantDemoLoading" /><button :disabled="assistantDemoLoading || !assistantDemoInput.trim()">{{ assistantDemoLoading ? 'Thinking…' : 'Ask AI' }}</button></form>
                </div>
                <div v-else class="reel-stage">
                  <iframe :src="reel.href" :title="`${reel.title} live demo`" loading="lazy"></iframe>
                  <a :href="reel.href" target="_blank" rel="noopener" class="reel-play" :aria-label="`Open ${reel.title} in a new tab`">↗</a><span class="reel-duration">INTERACTIVE DEMO</span>
                </div>
                <div class="reel-copy"><span>{{ reel.kicker }}</span><h3>{{ reel.title }}</h3><p>{{ reel.description }}</p><small>{{ reel.detail }}</small></div>
              </article>
            </div>
          </div>
        </section>

        <!-- SECTION 2.5: n8n AUTOMATIONS -->
        <section id="automations" class="chapter-section scroll-section reveal-on-scroll">
          <div class="feature-shell feature-automation">
            <div class="section-heading-row"><span class="section-index">03</span><div><span class="section-eyebrow">Automation systems</span><h2 class="chapter-header">n8n Automations</h2></div></div>
            <p class="chapter-subtitle">Automated workflows built with n8n to streamline processes and integrate APIs seamlessly.</p>

            <div class="system-flow reveal-on-scroll" aria-label="Portfolio AI system workflow">
              <div class="system-flow-copy"><span class="eyebrow">Live system</span><h3>From a visitor question to a useful response.</h3><p>The portfolio is not just a showcase—it's connected to an AI assistant, n8n automation, Telegram alerts, and a private live inbox.</p></div>
              <div class="flow-nodes">
                <div class="flow-node"><b>01</b><span>Visitor</span></div><i></i>
                <div class="flow-node accent"><b>02</b><span>AI + n8n</span></div><i></i>
                <div class="flow-node"><b>03</b><span>Live inbox</span></div>
              </div>
            </div>
            
            <div class="workflow-demo-heading reveal-on-scroll">
              <span class="eyebrow">Actual workflow demos</span>
              <h3>Actual n8n workflow demos, captured from the automations in this portfolio.</h3>
              <p>Each demo is manual-triggered and testable in n8n. Explore the real node topology without exposing the private workspace or sending an external action.</p>
            </div>
            <div class="workflow-demo-grid">
              <article v-for="demo in workflowDemos" :key="demo.title" :class="['workflow-demo-card', demo.tone, 'reveal-on-scroll']">
                <div class="workflow-demo-top"><span>n8n · {{ demo.mode || 'demo mode' }}</span><b>{{ demo.status || 'SAFE · MANUAL' }}</b></div>
                <h3>{{ demo.title }}</h3>
                <p>{{ demo.description }}</p>
                <div class="workflow-mini-flow" :aria-label="`${demo.title} workflow steps`">
                  <template v-for="(step, index) in demo.steps" :key="step">
                    <span>{{ step }}</span><i v-if="index < demo.steps.length - 1">→</i>
                  </template>
                </div>
                <button type="button" class="workflow-demo-link" @click="selectedWorkflowDemo = demo">Explore workflow demo <span>→</span></button>
              </article>
            </div>
          </div>
        </section>

        <Transition name="workflow-modal">
          <div v-if="selectedWorkflowDemo" class="workflow-modal-backdrop" @click.self="selectedWorkflowDemo = null">
            <section class="workflow-modal" role="dialog" aria-modal="true" :aria-label="`${selectedWorkflowDemo.title} workflow demo`">
              <button type="button" class="workflow-modal-close" @click="selectedWorkflowDemo = null" aria-label="Close workflow demo">×</button>
              <span class="workflow-modal-kicker">n8n · actual workflow topology</span>
              <h2>{{ selectedWorkflowDemo.title }}</h2>
              <p>{{ selectedWorkflowDemo.description }}</p>
              <div v-if="selectedWorkflowDemo.stages" class="video-workflow-stages">
                <article v-for="stage in selectedWorkflowDemo.stages" :key="stage.title" class="video-workflow-stage">
                  <span>{{ stage.index }}</span><h3>{{ stage.title }}</h3><p>{{ stage.summary }}</p>
                  <div class="video-workflow-nodes"><b v-for="node in stage.nodes" :key="node">{{ node }}</b></div>
                </article>
              </div>
              <div v-else class="workflow-canvas">
                <template v-for="(node, index) in selectedWorkflowDemo.nodes" :key="node.label">
                  <div :class="['workflow-canvas-node', node.kind]"><b>{{ String(index + 1).padStart(2, '0') }} · {{ node.kind }}</b><span>{{ node.label }}</span><small>{{ node.detail }}</small></div>
                  <i v-if="index < selectedWorkflowDemo.nodes.length - 1">→</i>
                </template>
              </div>
              <div class="workflow-modal-note"><b>{{ selectedWorkflowDemo.status ? 'Portfolio preview' : 'Demo mode' }}</b><span>{{ selectedWorkflowDemo.safety }}</span></div>
            </section>
          </div>
        </Transition>

        <!-- SECTION 3: CASE STUDY (STICKY SCROLLYTELLING) -->
        <section id="thesis" class="chapter-section scroll-section reveal-on-scroll">
          <div class="feature-shell thesis-shell scrollytelling-wrapper">
            <div class="section-heading-row"><span class="section-index">04</span><div><span class="section-eyebrow">Case study</span><h2 class="chapter-header">Thesis DSS</h2></div></div>
            <p class="chapter-subtitle">An interactive walkthrough of the "Sales Reports Analysis On Automotive Spare Parts Business Using Decision Support System" prototype.</p>

            <div class="scrollytelling-container">
              <!-- Left Side: Sticky Visual Mockup -->
              <div class="scrolly-visual">
                <div class="browser-mockup">
                  <div class="browser-header">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                    <span class="browser-url">automotive-spare-parts-dss-thesis.vercel.app</span>
                  </div>
                  <div class="browser-body">
                    <div class="screenshot-container">
                      <img :src="thesisDashboard" alt="Dashboard Overview" :class="['thesis-img', { active: activeStep === 1 }]" />
                      <img :src="thesisSalesReports" alt="Sales Reports" :class="['thesis-img', { active: activeStep === 2 }]" />
                      <img :src="thesisPredictions" alt="Predictions & Trends" :class="['thesis-img', { active: activeStep === 3 }]" />
                      <img :src="thesisRecommendations" alt="AI Recommendations" :class="['thesis-img', { active: activeStep === 4 }]" />
                      <img :src="thesisInventory" alt="Inventory Management" :class="['thesis-img', { active: activeStep === 5 }]" />
                      <img :src="thesisSuppliers" alt="Supplier Directory" :class="['thesis-img', { active: activeStep === 6 }]" />
                      <img :src="thesisSettings" alt="Configuration Settings" :class="['thesis-img', { active: activeStep === 7 }]" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Side: Scrolling Story Steps -->
              <div class="scrolly-text-column">
                <div class="scrolly-step reveal-on-scroll" data-step="1" :class="{ active: activeStep === 1 }">
                  <span class="step-num-badge">Step 01</span>
                  <h3>Dashboard Overview</h3>
                  <p>
                    This operational dashboard aggregates all business health data into real-time metrics. It tracks Gross Profit, Net Income, Total Revenue, and Units Sold. An interactive timeline chart highlights monthly revenue trends, allowing business owners to monitor performance at a single glance.
                  </p>
                </div>

                <div class="scrolly-step reveal-on-scroll" data-step="2" :class="{ active: activeStep === 2 }">
                  <span class="step-num-badge">Step 02</span>
                  <h3>Sales Invoicing &amp; Reports</h3>
                  <p>
                    This category tracks and structures historical sales transactions. It processes detailed invoice logs (including item descriptions, quantities, unit prices, and purchase dates) to create a clean, searchable dataset for business analytics.
                  </p>
                </div>

                <div class="scrolly-step reveal-on-scroll" data-step="3" :class="{ active: activeStep === 3 }">
                  <span class="step-num-badge">Step 03</span>
                  <h3>Predictions &amp; Demand Forecasting</h3>
                  <p>
                    The mathematical core of the DSS. The system uses statistical models and trend projection algorithms to calculate future demand patterns. It visualizes forecast accuracy, enabling businesses to prevent stockouts and avoid overstocking capital.
                  </p>
                </div>

                <div class="scrolly-step reveal-on-scroll" data-step="4" :class="{ active: activeStep === 4 }">
                  <span class="step-num-badge">Step 04</span>
                  <h3>Smart Decision Recommendations</h3>
                  <p>
                    Rather than requiring managers to analyze complex formulas and raw tables, the system automatically generates purchase recommendations. It identifies critical low-stock items and advises exactly when and how much inventory to order.
                  </p>
                </div>

                <div class="scrolly-step reveal-on-scroll" data-step="5" :class="{ active: activeStep === 5 }">
                  <span class="step-num-badge">Step 05</span>
                  <h3>Inventory Control &amp; SKUs</h3>
                  <p>
                    Provides real-time visibility into the status of every stock item. It integrates color-coded stock level indicators (such as orange or red warnings for critical items) and enables adding or editing product data instantly.
                  </p>
                </div>

                <div class="scrolly-step reveal-on-scroll" data-step="6" :class="{ active: activeStep === 6 }">
                  <span class="step-num-badge">Step 06</span>
                  <h3>Supplier Directory</h3>
                  <p>
                    Connects inventory products with their respective suppliers. Managing supplier directories directly in the DSS streamlines restock operations, ensuring contact details, catalog data, and delivery coordinates are readily available.
                  </p>
                </div>

                <div class="scrolly-step reveal-on-scroll" data-step="7" :class="{ active: activeStep === 7 }">
                  <span class="step-num-badge">Step 07</span>
                  <h3>Configuration &amp; Settings</h3>
                  <p>
                    Allows administrators to adjust DSS parameters, update business metadata, and configure user credentials. This ensures the system remains flexible and scalable as business operations grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION: WEEKLY ROUTINES -->
        <section v-if="false" id="routines" class="chapter-section scroll-section reveal-on-scroll">
          <div class="glass-card">
            <h2 class="chapter-header">Weekly Routines</h2>
            <p class="chapter-subtitle">My current V-Taper workout split and active recovery tracking.</p>
            
            <div class="routine-grid">
              <!-- MONDAY -->
              <div class="routine-day glass-card sub-card">
                <div class="day-header">
                  <span class="day-badge">Monday</span>
                  <h4>Push (Chest Focus)</h4>
                </div>
                <ul class="exercise-list">
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Incline DB Press <span class="sets-reps">– 4x6-8</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Flat DB Press <span class="sets-reps">– 3x10</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Shoulder Press <span class="sets-reps">– 3x6-8</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Lateral Raise <span class="sets-reps">– 5x15</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Cable / Rope Pushdown <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Overhead Tricep Extension <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Incline Walk <span class="sets-reps">– 20 mins</span></span>
                  </li>
                </ul>
              </div>

              <!-- TUESDAY -->
              <div class="routine-day glass-card sub-card">
                <div class="day-header">
                  <span class="day-badge">Tuesday</span>
                  <h4>Pull (Back Width Focus)</h4>
                </div>
                <ul class="exercise-list">
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Lat Pulldown (wide grip) <span class="sets-reps">– 4×10</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Assisted Pullups / Pullups <span class="sets-reps">– 3 sets</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Chest Supported Row <span class="sets-reps">– 3×10</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Seated Cable Row <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Straight Arm Pulldown <span class="sets-reps">– 3×15</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Face Pull <span class="sets-reps">– 3×15</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Rear Delt Fly <span class="sets-reps">– 3×15</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Barbell Curl <span class="sets-reps">– 3×10</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Incline Walk <span class="sets-reps">– 15 mins</span></span>
                  </li>
                </ul>
              </div>

              <!-- WEDNESDAY -->
              <div class="routine-day glass-card sub-card">
                <div class="day-header">
                  <span class="day-badge">Wednesday</span>
                  <h4>Legs + Core</h4>
                </div>
                <ul class="exercise-list">
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Squat / Leg Press <span class="sets-reps">– 4×6-8m</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Romanian Deadlift <span class="sets-reps">– 3×10</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Walking Lunges <span class="sets-reps">– 3×12 each</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Leg Extension <span class="sets-reps">– 3×15</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Plank <span class="sets-reps">– 3×1 min</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Leg Raises <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Russian Twist <span class="sets-reps">– 3×20</span></span>
                  </li>
                </ul>
              </div>

              <!-- THURSDAY -->
              <div class="routine-day glass-card sub-card">
                <div class="day-header">
                  <span class="day-badge">Thursday</span>
                  <h4>Active Recovery</h4>
                </div>
                <ul class="exercise-list">
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">10k steps</span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Stretching</span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Dead hang <span class="sets-reps">– 3× max</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">15 min HIIT <span class="sets-reps">– bike/jog intervals</span></span>
                  </li>
                </ul>
              </div>

              <!-- FRIDAY -->
              <div class="routine-day glass-card sub-card">
                <div class="day-header">
                  <span class="day-badge">Friday</span>
                  <h4>Upper (Shape Day)</h4>
                </div>
                <ul class="exercise-list">
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Incline DB Press <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Single Arm Lat Pulldown <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Chest Supported Row <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Lateral Raise <span class="sets-reps">– 5x15</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Leaning Lateral Raise <span class="sets-reps">– 3×15</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Rear Delt Fly <span class="sets-reps">– 3×15</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">Dips <span class="sets-reps">– 3× failure</span></span>
                  </li>
                  <li class="exercise-item done">
                    <span class="checkbox">✓</span>
                    <span class="exercise-name">DB Curl <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">20 min incline walk</span>
                  </li>
                </ul>
              </div>

              <!-- SATURDAY -->
              <div class="routine-day glass-card sub-card">
                <div class="day-header">
                  <span class="day-badge">Saturday</span>
                  <h4>Lower + Fat Burn</h4>
                </div>
                <ul class="exercise-list">
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Goblet Squat <span class="sets-reps">– 3×15</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">RDL <span class="sets-reps">– 3×12</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Leg Press <span class="sets-reps">– 3×15</span></span>
                  </li>
                  <li class="exercise-item">
                    <span class="checkbox">○</span>
                    <span class="exercise-name">Kettlebell Swings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 4: THE CONNECTION -->
        <section id="connection" class="chapter-section scroll-section reveal-on-scroll">
          <div class="contact-wrapper">
            <span class="section-eyebrow">05 · Start a conversation</span>
            <h2 class="chapter-header">Let’s make something useful.</h2>
            <p class="chapter-subtitle">Have an interesting project, design idea, or want to collaborate? Send a message directly.</p>

            <div class="contact-layout">
              <!-- Details Card -->
              <div class="contact-details reveal-on-scroll">
                <h3>Let's collaborate</h3>
                <p>I'm always open to discussing new opportunities, frontend development projects, and custom web designs.</p>
                
                <div class="details-list">
                  <div class="detail-item">
                    <span class="detail-icon">📍</span>
                    <span>Rosario, Cavite</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">✉️</span>
                    <span>lipalambenjie@gmail.com</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">📞</span>
                    <span>09954853868</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">👥</span>
                    <a href="https://facebook.com/benjie.lipalam03" target="_blank" class="detail-link">facebook.com/benjie.lipalam03</a>
                  </div>
                </div>

              </div>

              <!-- Contact Form -->
              <form @submit.prevent="submitContact" class="contact-form reveal-on-scroll">
                <!-- Success Banner -->
                <Transition name="slide-fade">
                  <div v-if="isSubmitted" class="success-banner">
                    <h4>Message Sent!</h4>
                    <p>Thank you for reaching out, {{ contactForm.name }}. I'll get back to you shortly.</p>
                  </div>
                </Transition>

                <!-- Error Banner -->
                <Transition name="slide-fade">
                  <div v-if="sendError" class="error-banner">
                    <h4>Failed to send.</h4>
                    <p>Something went wrong. Please try again or email me directly.</p>
                  </div>
                </Transition>

                <div class="form-group">
                  <label for="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="contactForm.name" 
                    required 
                    placeholder="Benjie"
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="contactForm.email" 
                    required 
                    placeholder="benjielipalam@example.com"
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea 
                    id="message" 
                    v-model="contactForm.message" 
                    required 
                    placeholder="Write your message here..."
                    rows="5"
                    class="form-input"
                  ></textarea>
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitted || isSending">
                  <span>{{ isSending ? 'Sending...' : 'Send Message' }}</span>
                  <svg v-if="!isSending" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>
    </div>
    
    <footer class="portfolio-footer-nav">
      <p>&copy; 2026 Benjie Lipalam. Built with Vue 3 &amp; Vite.</p>
    </footer>
  </div>

  <!-- Curriculum Vitae Modal -->
  <Transition name="fade">
    <div v-if="showCV" class="cv-modal-backdrop" @click.self="showCV = false">
      <div class="cv-modal-card animate-in">
        <!-- Modal Toolbar -->
        <div class="cv-modal-header no-print">
          <h3>Curriculum Vitae</h3>
          <div class="cv-header-actions">
            <button @click="downloadCV" class="cv-action-btn download-btn" title="Download CV as PDF">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download PDF</span>
            </button>
            <button @click="showCV = false" class="cv-action-btn close-btn" title="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span>Close</span>
            </button>
          </div>
        </div>

        <!-- Printable CV -->
        <div class="cv-document-wrapper" id="printable-cv">
          <!-- Header -->
          <div class="cv-doc-header">
            <h1 class="cv-name">BENJIE LIPALAM</h1>
            <div class="cv-contact-line">
              Rosario, Cavite &nbsp;|&nbsp; +63 995 485 3868 &nbsp;|&nbsp; <a href="mailto:Lipalambenjie@gmail.com" class="cv-link">Lipalambenjie@gmail.com</a> &nbsp;&nbsp;<a href="https://benjielipalam.vercel.app/" target="_blank" class="cv-link">https://benjielipalam.vercel.app/</a>
            </div>
          </div>

          <!-- Education -->
          <div class="cv-section">
            <h2 class="cv-section-heading">Education</h2>
            
            <div class="cv-edu-item">
              <div class="cv-edu-details">
                <span class="cv-school-name"><a href="https://cvsu.edu.ph/" target="_blank" class="cv-link-accent">Cavite State University – CCAT Campus</a> &nbsp;&nbsp; <em>2022 – 2026</em></span>
                <span class="cv-degree-name"><em>Bachelor of Science in Computer Science</em></span>
              </div>
            </div>
          </div>

          <!-- Projects -->
          <div class="cv-section">
            <h2 class="cv-section-heading">Projects</h2>
            
            <div class="cv-project-item">
              <h3 class="cv-project-title">AI Recruiter Agent &nbsp;<span class="cv-tech-stack">| &nbsp;<em>n8n, Google Gemini API, Google Sheets, Gmail API</em></span></h3>
              <ul class="cv-bullets">
                <li>Built a production-grade recruitment automation agent that screens incoming resumes from Gmail, filters spam, and uses AI to parse and log candidate data to Google Sheets.</li>
                <li>Designed a 4-route classification system that auto-drafts tailored interview invitations or HR review alerts based on candidate seniority and role fit, with duplicate-candidate prevention via upsert logic.</li>
                <li>Deployed the workflow engine 24/7 on Railway for real-time processing of incoming applications.</li>
              </ul>
            </div>

            <div class="cv-project-item">
              <h3 class="cv-project-title">n8n Automated Attendance Engine &nbsp;<span class="cv-tech-stack">| &nbsp;<em>n8n, Railway, Gmail API, PostgreSQL</em></span></h3>
              <ul class="cv-bullets">
                <li>Developed a serverless workflow automating daily attendance clock-in/clock-out with weekday-aware scheduling and timezone-safe logic to prevent UTC/local discrepancies.</li>
                <li>Integrated Gmail API with OAuth2 for real-time HTML email notifications and PostgreSQL for persistent cloud storage of credentials and configuration.</li>
              </ul>
            </div>

            <div class="cv-project-item">
              <h3 class="cv-project-title">Automotive Spare Parts Decision Support System (Thesis) &nbsp;<span class="cv-tech-stack">| &nbsp;<em>React, TypeScript, Node.js, Express, Python</em></span></h3>
              <ul class="cv-bullets">
                <li>Collaborated in a team of three to design and build a decision support system for spare parts inventory.</li>
                <li>Developed responsive frontend views using React and TypeScript, and engineered statistical forecasting APIs using Node.js, Express.js, and Python.</li>
              </ul>
            </div>

            <div class="cv-project-item">
              <h3 class="cv-project-title">MNL Lumiere — Streetwear Brand Web Application &nbsp;<span class="cv-tech-stack">| &nbsp;<em>React, Vite, Firebase</em></span></h3>
              <ul class="cv-bullets">
                <li>Built a modern e-commerce-style brand website using React 19 and Vite, with Firebase integration for scalable data handling and hosting.</li>
                <li>Designed a custom typography and visual identity system for on-brand, responsive UI, and set up Oxlint for code quality consistency.</li>
              </ul>
            </div>

            <div class="cv-project-item">
              <h3 class="cv-project-title">Daily Life Tracking System &nbsp;<span class="cv-tech-stack">| &nbsp;<em>Vue.js, Firebase, Pinia</em></span></h3>
              <ul class="cv-bullets">
                <li>Programmed a productivity platform to log and track personal routines, habits, finances, and workouts.</li>
                <li>Built reactive visualization widgets and responsive charts to help users review habit completion logs and analyze daily schedules.</li>
              </ul>
            </div>

            <div class="cv-project-item">
              <h3 class="cv-project-title">Mobile App UI/UX Design — Pharmacy & E-commerce Apps &nbsp;<span class="cv-tech-stack">| &nbsp;<em>Figma</em></span></h3>
              <ul class="cv-bullets">
                <li>Designed complete mobile app UI/UX flows in Figma, including onboarding, authentication, and home dashboard screens for a pharmacy ordering app and a separate e-commerce concept.</li>
                <li>Applied consistent branding, color systems, and layout structure across multi-screen user flows.</li>
              </ul>
            </div>

            <div class="cv-project-item">
              <h3 class="cv-project-title">Bayanihan Escrow &nbsp;<span class="cv-tech-stack">| &nbsp;<em>Rust, Soroban (Stellar Smart Contracts)</em></span></h3>
              <ul class="cv-bullets">
                <li>Built an on-chain escrow smart contract securing freelance milestone payments for Southeast Asian freelancers, developed during the Stellar Philippines Bootcamp 2026.</li>
                <li>Implemented fund deposit, approval-based release, and cancellation-refund logic in Rust, validated with automated unit tests and deployed to the Stellar Testnet.</li>
              </ul>
            </div>
          </div>

          <!-- Skills -->
          <div class="cv-section">
            <h2 class="cv-section-heading">Skills</h2>
            
            <div class="cv-skills-content">
              <p><strong>Programming Languages:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3, Java, C++, Python, Rust</p>
              <p><strong>Frameworks &amp; Libraries:</strong> React, Vue.js (Vue 3), Vite, Node.js, Express.js, Firebase, EmailJS, Tailwind CSS</p>
              <p><strong>AI &amp; Automation:</strong> n8n workflow automation, Make, Google Gemini API, agentic AI tooling (OpenAI Agents SDK, Cursor)</p>
              <p><strong>Tools &amp; Platforms:</strong> VS Code, Git, GitHub, Vercel, Railway, PostgreSQL, NetBeans, Eclipse, Code::Blocks, Figma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- n8n-powered portfolio assistant -->
  <div class="chatbot-shell">
    <Transition name="chat-pop">
      <section v-if="chatOpen" class="chatbot-panel" role="dialog" aria-label="Portfolio assistant">
        <header class="chatbot-header"><div class="chatbot-title"><span class="chatbot-status" aria-hidden="true"></span><div><strong>Ask Benjie's AI</strong><small>Powered by n8n</small></div></div><button class="chatbot-icon-btn" type="button" @click="chatOpen = false" aria-label="Close chat">×</button></header>
        <div ref="chatMessagesEl" class="chatbot-messages" aria-live="polite"><div v-for="message in chatMessages" :key="message.id" :class="['chat-message', message.role]">{{ message.content }}</div><div v-if="chatSending" class="chat-message assistant chat-typing"><i></i><i></i><i></i></div></div>
        <div class="chatbot-suggestions"><button v-for="question in chatSuggestions" :key="question" type="button" @click="sendChatMessage(question)">{{ question }}</button></div>
        <form class="chatbot-form" @submit.prevent="sendChatMessage()"><input v-model="chatInput" :disabled="chatSending" maxlength="1000" autocomplete="off" placeholder="Type your message..." aria-label="Your message" /><button type="submit" :disabled="chatSending || !chatInput.trim()" aria-label="Send message"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg></button></form>
      </section>
    </Transition>
    <button class="chatbot-launcher" type="button" @click="toggleChat" :aria-expanded="chatOpen" aria-label="Open portfolio assistant"><svg v-if="!chatOpen" viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path><path d="M8 11h.01M12 11h.01M16 11h.01"></path></svg><span v-else aria-hidden="true">×</span></button>
  </div>

  <section v-if="isInbox" class="inbox-overlay" aria-label="Live chat inbox">
    <div class="inbox-header"><div><strong>Live Chat Inbox</strong><span>{{ inboxUser ? 'Realtime visitor conversations' : 'Private admin view' }}</span></div><button @click="closeInbox">×</button></div>
    <div v-if="!inboxUser" class="inbox-login"><h2>Private inbox</h2><p>Sign in with Benjie's Google account to view live portfolio chats.</p><button @click="signInToInbox">Sign in with Google</button></div>
    <div v-else-if="!isAdmin" class="inbox-login"><h2>Access restricted</h2><p>This inbox is available only to Benjie's authorized Google account.</p></div>
    <div v-else class="inbox-content"><aside><button v-for="chat in chatSessions" :key="chat.id" @click="selectedChatId = chat.id" :class="{ selected: selectedChatId === chat.id }"><strong>{{ chat.id.replace('portfolio-', '').slice(0, 12) }}</strong><small>{{ chat.messages.at(-1)?.content || 'New conversation' }}</small></button></aside><main><template v-if="selectedChat"><h2>Conversation</h2><div v-for="message in selectedChat.messages" :key="message.id" :class="['inbox-message', message.role]">{{ message.content }}</div></template><p v-else class="inbox-empty">Waiting for the first live chat…</p></main></div>
  </section>


</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import avatarImg from './avatar.png';
import thesisDashboard from './screenshots/thesis_1_dashboard.png';
import thesisSalesReports from './screenshots/thesis_2_sales_reports.png';
import thesisPredictions from './screenshots/thesis_3_predictions.png';
import thesisRecommendations from './screenshots/thesis_4_recommendations.png';
import thesisInventory from './screenshots/thesis_5_inventory.png';
import thesisSuppliers from './screenshots/thesis_6_suppliers.png';
import thesisSettings from './screenshots/thesis_7_settings.png';

const hasImage = ref(true);
const activeStep = ref(1);
const activeTheme = ref('orange');
const isDarkMode = ref(false);
const showCV = ref(false);
const mobileMenuOpen = ref(false);
const scrollProgress = ref(0);
const assistantDemoInput = ref('');
const assistantDemoReply = ref('');
const assistantDemoLoading = ref(false);
const selectedWorkflowDemo = ref(null);
const toolIcon = (name, color) => `https://cdn.simpleicons.org/${name}/${color.replace('#', '')}`;
const toolStack = [
  { name: 'Vue', color: '#42b883', icon: toolIcon('vuedotjs', '#42b883') },
  { name: 'Figma', color: '#f24e1e', icon: toolIcon('figma', '#f24e1e') },
  { name: 'n8n', color: '#ea4b71', icon: toolIcon('n8n', '#ea4b71') },
  { name: 'Firebase', color: '#f59e0b', icon: toolIcon('firebase', '#f59e0b') },
  { name: 'Gemini', color: '#4285f4', icon: toolIcon('googlegemini', '#4285f4') },
  { name: 'GitHub', color: '#181717', icon: toolIcon('github', '#181717') },
  { name: 'Vercel', color: '#111111', icon: toolIcon('vercel', '#111111') },
  { name: 'PostgreSQL', color: '#336791', icon: toolIcon('postgresql', '#336791') },
  { name: 'JavaScript', color: '#d69e2e', icon: toolIcon('javascript', '#d69e2e') },
  { name: 'Tailwind CSS', color: '#38bdf8', icon: toolIcon('tailwindcss', '#38bdf8') }
];
const systemReels = [
  { kind: 'assistant', kicker: 'Interactive AI demo', title: 'Portfolio AI Assistant', description: 'Ask a real question and watch the portfolio assistant call the same n8n + Gemini system used by the chat widget.', detail: 'Visitor → n8n → Gemini → response', tone: 'orange' },
  { kicker: 'Automation case study', title: 'AI Recruitment Agent', description: 'Explore the live build log and workflow documentation for a recruitment automation system.', detail: 'Gmail → Gemini → Sheets → reply', href: 'https://ai-recruitment-agent-n8n.vercel.app/', tone: 'violet' },
  { kicker: 'Live web app', title: 'Daily Life Tracking System', description: 'Open the real productivity and daily tracking web application.', detail: 'Vue → state → personal analytics', href: 'https://dailylife-trackingsystem.vercel.app/#/', tone: 'blue' },
  { kicker: 'Live e-commerce site', title: 'MNLLUMIERE', description: 'Browse the real responsive e-commerce website and its storefront experience.', detail: 'JavaScript → responsive commerce UI', href: 'https://mnllumiere.vercel.app', tone: 'green' }
];
const workflowDemos = [
  {
    title: 'AI Recruitment Agent',
    description: 'An email-driven hiring workflow that extracts resume text, evaluates candidates with Gemini, updates the candidate record, and routes the right draft.',
    steps: ['Ingest', 'Evaluate', 'Route'], mode: 'email workflow', status: 'PRIVATE · EMAIL-DRIVEN',
    stages: [
      { index: '01', title: 'Gmail intake', summary: 'Gmail Ingestion receives an applicant email, gets the message, and checks recruitment keywords.', nodes: ['Gmail Ingestion', 'Get a message', 'Recruitment Keywords'] },
      { index: '02', title: 'Resume gate', summary: 'The workflow checks whether a PDF resume is attached. Incomplete applications are logged and receive a resume-request draft.', nodes: ['Check: Has PDF Resume?', 'DB · Log Incomplete App', 'Gmail · Draft Resume Request'] },
      { index: '03', title: 'AI evaluation', summary: 'PDF text is read, then an AI Agent uses Gemini with session memory and search context to assess the candidate.', nodes: ['PDF · Read Resume Text', 'AI Agent', 'Google Gemini Chat Model', 'Simple Memory', 'Search tool'] },
      { index: '04', title: 'Candidate routing', summary: 'The candidate record is saved or updated, then a router prepares the appropriate email draft without automatically sending it.', nodes: ['DB · Save/Update Candidate', 'Router · Classify Applicant', 'Draft Junior Invitation', 'Draft Senior Invitation', 'Archive/Ignore Spam', 'Draft HR Alert · Needs Review'] }
    ],
    safety: 'Portfolio visual only. The private workflow and applicant data are not exposed here; opening this preview does not read Gmail, store a resume, or send an email.', tone: 'violet'
  },
  { title: 'Auto Clock-In/Out', description: 'The actual n8n demo workflow: Manila time validation selects an approved attendance action or safe hold.', steps: ['Time', 'Validate', 'Audit'], nodes: [{ kind:'trigger', label:'Run attendance demo', detail:'Manual Trigger' }, { kind:'code', label:'Read Manila work time', detail:'Code in JavaScript' }, { kind:'code', label:'Validate clock window', detail:'Code in JavaScript' }, { kind:'if', label:'Approved time window?', detail:'IF decision' }, { kind:'code', label:'Prepare audit event', detail:'True branch output' }, { kind:'code', label:'Record safe hold', detail:'False branch output' }], safety: 'No attendance platform is called and no clock action is made in this portfolio demo.', tone: 'blue' },
  { title: 'Call Auto-Reply', description: 'The actual n8n demo workflow: inbound call context is classified, drafted, and routed by priority.', steps: ['Call', 'Intent', 'Route'], nodes: [{ kind:'trigger', label:'Run incoming call demo', detail:'Manual Trigger' }, { kind:'code', label:'Example incoming call', detail:'Code in JavaScript' }, { kind:'code', label:'Classify call intent', detail:'Code in JavaScript' }, { kind:'code', label:'Draft polite auto-reply', detail:'Code in JavaScript' }, { kind:'if', label:'High-priority callback?', detail:'IF decision' }, { kind:'code', label:'Route standard follow-up', detail:'Safe output branch' }], safety: 'No call, SMS, or email is sent from this portfolio demo.', tone: 'orange' },
  {
    title: 'YouTube & Reels Publishing System',
    description: 'A five-workflow production pipeline that researches, builds, renders, uploads, and publishes short-form video.',
    steps: ['Script', 'Render', 'Publish'], mode: 'production pipeline', status: 'LIVE · SCHEDULED',
    stages: [
      { index: '01', title: 'Script Factory 1', summary: 'Schedules at 6:00 AM and 1:00 PM, with a manual trigger for review.', nodes: ['Get row(s) in sheet', 'Filter', 'Limit', 'Grounded PH Research', 'Basic LLM Chain · Gemini', 'Parse Gemini JSON', 'Update row in sheet'] },
      { index: '02', title: 'Pexels Background Factory 2', summary: 'Builds portrait background candidates from Pexels and writes the selected URLs back to Sheets.', nodes: ['Get row(s) in sheet', 'Limit', 'Build 4 Pexels Searches', 'Search Pexels Videos', 'Pick Best Portrait Clip', 'Combine 4 Background URLs', 'Update row in sheet'] },
      { index: '03', title: 'Video Factory 3', summary: 'Generates and shares four voiceovers, renders them with FFmpeg, then waits, checks, and routes the final MP4 for review.', nodes: ['Get Script-Ready Topics', 'One Video Per Run', 'Generate Voiceover ×4', 'Upload + Share to Drive', 'Start FFmpeg Render', 'Wait + Check FFmpeg', 'Upload MP4 to Drive', 'Mark Video Ready for Review'] },
      { index: '04', title: 'YouTube Unlisted Upload 4', summary: 'Runs at 7:30 AM/PM; downloads the reviewed MP4 from Drive, uploads it to YouTube, and marks the sheet row.', nodes: ['Get row(s) in sheet', 'Filter', 'Limit', 'Download MP4 from Drive', 'Upload a video · YouTube', 'Update row in sheet'] },
      { index: '05', title: 'Facebook Reels Auto Publish 5', summary: 'Runs at 8:15 AM/PM; fetches the YouTube-uploaded video, uploads it to Facebook, publishes the Reel, and marks it complete.', nodes: ['Get YouTube-uploaded video', 'One Reel Per Run', 'Download video from Drive', 'Start Facebook Reel Upload', 'Merge + Code', 'Upload Reel video', 'Publish Facebook Reel', 'Mark Facebook Reel uploaded'] }
    ],
    safety: 'Portfolio visual only. The production workflow stays private and opening this preview does not run schedules, render media, or publish a video.', tone: 'green'
  }
];
const isInbox = ref(location.hash === '#inbox');
const inboxUser = ref(null);
const chatSessions = ref([]);
const selectedChatId = ref(null);
const isAdmin = computed(() => inboxUser.value?.email === import.meta.env.VITE_ADMIN_EMAIL);
const selectedChat = computed(() => chatSessions.value.find(chat => chat.id === selectedChatId.value));
const closeInbox = () => { location.hash = ''; isInbox.value = false; };
const signInToInbox = async () => {
  try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch (error) { console.error('Inbox sign-in failed', error); }
};
const logChatMessage = async (role, content) => {
  try {
    await addDoc(collection(db, 'chat_events'), {
      sessionId: chatSessionId,
      role,
      content,
      clientAt: Date.now(),
      createdAt: serverTimestamp()
    });
  } catch (error) { console.error('Chat logging error:', error); }
};

// Set VITE_N8N_CHAT_WEBHOOK in .env.local or your deployment environment.
const chatWebhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK;
const chatOpen = ref(false);
const chatInput = ref('');
const chatSending = ref(false);
const chatMessagesEl = ref(null);
const chatSessionId = `portfolio-${crypto.randomUUID?.() || Date.now().toString(36)}`;
const chatSuggestions = ['What are your skills?', 'Tell me about your projects'];
const chatMessages = ref([{ id: 1, role: 'assistant', content: "Hi! I'm Benjie's portfolio assistant. Ask me about his skills, projects, or experience." }]);
const scrollChatToBottom = async () => { await nextTick(); if (chatMessagesEl.value) chatMessagesEl.value.scrollTop = chatMessagesEl.value.scrollHeight; };
const toggleChat = async () => { chatOpen.value = !chatOpen.value; if (chatOpen.value) await scrollChatToBottom(); };
const getChatReply = (data) => { const item = Array.isArray(data) ? data[0] : data; if (typeof item === 'string') return item; return item?.reply || item?.text || item?.output || item?.message || item?.response || item?.data?.reply || ''; };
const runAssistantDemo = async () => {
  const message = assistantDemoInput.value.trim();
  if (!message || assistantDemoLoading.value || !chatWebhookUrl) return;
  assistantDemoLoading.value = true;
  assistantDemoReply.value = '';
  try {
    const response = await fetch(chatWebhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, chatInput: message, sessionId: `showcase-${crypto.randomUUID?.() || Date.now().toString(36)}`, showcaseDemo: true }) });
    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
    const reply = getChatReply(await response.json());
    if (!reply) throw new Error('empty-response');
    assistantDemoReply.value = reply;
  } catch (error) {
    console.error('Assistant demo error:', error);
    assistantDemoReply.value = 'The live assistant is temporarily unavailable. Please try again shortly.';
  } finally { assistantDemoLoading.value = false; }
};
const sendChatMessage = async (suggestion = '') => {
  const text = (suggestion || chatInput.value).trim();
  if (!text || chatSending.value) return;
  chatMessages.value.push({ id: Date.now(), role: 'user', content: text }); chatInput.value = ''; chatSending.value = true; await scrollChatToBottom();
  logChatMessage('user', text);
  try {
    if (!chatWebhookUrl) throw new Error('missing-webhook');
    const response = await fetch(chatWebhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, chatInput: text, sessionId: chatSessionId }) });
    if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
    const reply = getChatReply(await response.json()); if (!reply) throw new Error('empty-response');
    chatMessages.value.push({ id: Date.now() + 1, role: 'assistant', content: reply });
    logChatMessage('assistant', reply);
  } catch (error) {
    console.error('Chatbot error:', error);
    chatMessages.value.push({ id: Date.now() + 1, role: 'assistant', content: !chatWebhookUrl ? 'The assistant is being set up. Please add the n8n webhook URL to VITE_N8N_CHAT_WEBHOOK.' : 'Sorry, I could not reach the assistant right now. Please try again shortly.' });
  } finally { chatSending.value = false; await scrollChatToBottom(); }
};

// Terminal Typing Effect
const terminalCommandText = ref("");
const terminalOutputText = ref("");
const showCursor1 = ref(true);
const showCursor2 = ref(false);

const startTypingEffect = async () => {
  const cmd = "whoami";
  const output = "Computer Science  |  UI/UX + Frontend  |  Agentic AI";
  
  await new Promise(r => setTimeout(r, 800));
  
  for (let i = 0; i < cmd.length; i++) {
    terminalCommandText.value += cmd[i];
    await new Promise(r => setTimeout(r, 100));
  }
  
  await new Promise(r => setTimeout(r, 400));
  
  showCursor1.value = false;
  showCursor2.value = true;
  
  for (let i = 0; i < output.length; i++) {
    terminalOutputText.value += output[i];
    await new Promise(r => setTimeout(r, 20));
  }
};
const showResponsiveAlert = () => {
  if (window.innerWidth <= 820) {
    alert("Thanks for visiting on your phone! My portfolio is also fully optimized for Desktop.");
  } else {
    alert("Thanks for visiting on your PC! My portfolio is also fully optimized for Mobile viewing.");
  }
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const printCV = () => {
  window.print();
};

const downloadCV = async () => {
  const element = document.getElementById('printable-cv');
  if (!element) return;

  // Dynamically load html2pdf.js from CDN
  if (!window.html2pdf) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  const wrapper = element;
  const prevOverflow = wrapper.style.overflow;
  const prevMaxHeight = wrapper.style.maxHeight;
  const prevHeight = wrapper.style.height;
  wrapper.style.overflow = 'visible';
  wrapper.style.maxHeight = 'none';
  wrapper.style.height = 'auto';

  const opt = {
    margin:       [8, 10, 8, 10],
    filename:     'Benjie_Lipalam_CV.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };

  await window.html2pdf().set(opt).from(element).save();

  wrapper.style.overflow = prevOverflow;
  wrapper.style.maxHeight = prevMaxHeight;
  wrapper.style.height = prevHeight;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
  }
};

const changeTheme = (themeName) => {
  activeTheme.value = themeName;
  const roots = {
    orange: {
      primary: '#ea580c', // Orange
      secondary: '#d97706', // Gold
      glow: 'rgba(234, 88, 12, 0.08)',
      badge: 'rgba(234, 88, 12, 0.06)',
      badgeText: '#c2410c',
      glow1: 'rgba(234, 88, 12, 0.45)',
      glow2: 'rgba(217, 119, 6, 0.3)',
      glow3: 'rgba(234, 88, 12, 0.15)',
      darkBgPrimary: '#431400',
      darkBgSecondary: '#5e1c00'
    },
    teal: {
      primary: '#0d9488', // Teal
      secondary: '#0284c7', // Sky Blue
      glow: 'rgba(13, 148, 136, 0.08)',
      badge: 'rgba(13, 148, 136, 0.06)',
      badgeText: '#0f766e',
      glow1: 'rgba(13, 148, 136, 0.45)',
      glow2: 'rgba(2, 132, 199, 0.3)',
      glow3: 'rgba(13, 148, 136, 0.15)',
      darkBgPrimary: '#002f2a',
      darkBgSecondary: '#00473f'
    },
    blue: {
      primary: '#2563eb', // Blue
      secondary: '#6366f1', // Indigo
      glow: 'rgba(37, 99, 235, 0.10)',
      badge: 'rgba(37, 99, 235, 0.08)',
      badgeText: '#1d4ed8',
      glow1: 'rgba(37, 99, 235, 0.45)',
      glow2: 'rgba(99, 102, 241, 0.3)',
      glow3: 'rgba(37, 99, 235, 0.15)',
      darkBgPrimary: '#071842',
      darkBgSecondary: '#0a2366'
    }
  };
  const theme = roots[themeName];
  document.documentElement.style.setProperty('--accent-purple', theme.primary);
  document.documentElement.style.setProperty('--accent-blue', theme.secondary);
  document.documentElement.style.setProperty('--accent-glow', theme.glow);
  document.documentElement.style.setProperty('--badge-bg', theme.badge);
  document.documentElement.style.setProperty('--badge-text', theme.badgeText);
  document.documentElement.style.setProperty('--hero-glow-1', theme.glow1);
  document.documentElement.style.setProperty('--hero-glow-2', theme.glow2);
  document.documentElement.style.setProperty('--hero-glow-3', theme.glow3);
  document.documentElement.style.setProperty('--dark-bg-primary', theme.darkBgPrimary);
  document.documentElement.style.setProperty('--dark-bg-secondary', theme.darkBgSecondary);
};

// Projects State & Github Fetching
const projects = ref([]);
const customRepoDetails = {
  'my-soroban.studio': {
    title: 'my-soroban.studio',
    subtitle: 'Blockchain & Smart Contracts',
    description: 'A blockchain-based project built using the Rust programming language and the Soroban smart contract platform.',
    tags: ['Rust', 'Blockchain', 'Smart Contracts', 'Soroban'],
    liveLink: 'https://github.com/webjie28/my-soroban.studio'
  },
  'n8n-auto-clock-in-out': {
    title: 'Auto Clock-In/Out',
    subtitle: 'n8n Workflow Automation',
    description: 'Automated work clock-in and clock-out system using n8n, Railway, and Gmail API.',
    tags: ['n8n', 'Automation', 'JavaScript', 'Railway', 'Gmail API'],
    liveLink: 'https://github.com/webjie28/n8n-auto-clock-in-out'
  },
  'AI-recruitment-agent-n8n': {
    title: 'AI Recruitment Agent',
    subtitle: 'n8n Workflow Automation',
    description: 'An automated AI-driven recruitment agent workflow designed using n8n for intelligent candidate processing.',
    tags: ['n8n', 'AI', 'Automation', 'HTML'],
    liveLink: 'https://ai-recruitment-agent-n8n.vercel.app/'
  },
  'Sales-Reports-Analysis-on-Automotive-Spare-Parts-Business-Using-Decision-Support-System': {
    title: 'Automotive Spare Parts DSS',
    subtitle: 'Full-Stack DSS Development',
    description: 'A group thesis project developed by three Computer Science students at Cavite State University. Built to automate inventory forecasting for automotive spare parts businesses — implementing statistical forecasting models, a responsive React and TypeScript frontend dashboard, and a backend powered by Node.js, Express.js, and Python.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Python', 'Algorithms', 'Inventory Forecasting'],
    liveLink: 'https://automotive-spare-parts-dss-thesis.vercel.app'
  },
  'DailylifeTrackingsystem': {
    title: 'Daily Life Tracking System',
    subtitle: 'Web App Development & Analytics',
    description: 'An interactive productivity system programmed to track habits and daily schedules. Features custom data-visualization charts, local state managers, and a clean responsive UI to help users analyze personal time-allocation trends.',
    tags: ['Vue.js', 'Web App Development', 'State Management', 'UI/UX Design', 'Data Visualization'],
    liveLink: 'https://dailylife-trackingsystem.vercel.app/#/'
  },
  'MNLLUMIERE': {
    title: 'MNLLUMIERE E-Commerce',
    subtitle: 'Web Application & E-Commerce',
    description: 'A responsive and modern e-commerce web application focused on providing a seamless digital shopping experience. Built with a robust JavaScript ecosystem and optimized for both performance and visual aesthetics across mobile and desktop devices.',
    tags: ['JavaScript', 'Web Development', 'Responsive UI', 'E-Commerce'],
    liveLink: 'https://mnllumiere.vercel.app'
  }
};

onMounted(async () => {
  const updateScrollProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  };
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  onAuthStateChanged(auth, (user) => {
    inboxUser.value = user;
    if (user?.email === import.meta.env.VITE_ADMIN_EMAIL) {
      onSnapshot(query(collection(db, 'chat_events'), orderBy('clientAt', 'desc'), limit(200)), (snapshot) => {
        const sessions = new Map();
        snapshot.docs.map(item => ({ id: item.id, ...item.data() })).reverse().forEach((event) => {
          if (!sessions.has(event.sessionId)) sessions.set(event.sessionId, { id: event.sessionId, messages: [] });
          sessions.get(event.sessionId).messages.push(event);
        });
        chatSessions.value = [...sessions.values()].sort((a, b) => (b.messages.at(-1)?.clientAt || 0) - (a.messages.at(-1)?.clientAt || 0));
        if (!selectedChatId.value && chatSessions.value[0]) selectedChatId.value = chatSessions.value[0].id;
      });
    }
  });
  window.addEventListener('hashchange', () => { isInbox.value = location.hash === '#inbox'; });
  // Trigger terminal animation
  startTypingEffect();

  // Trigger theme set
  changeTheme('orange');

  // Intersection Observer for scroll-reveal animations
  const observerOptions = {
    root: null,
    rootMargin: '0px -10% -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  // Intersection Observer for Scrollytelling steps
  const stepObserverOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0.1
  };

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stepNum = parseInt(entry.target.dataset.step);
        activeStep.value = stepNum;
      }
    });
  }, stepObserverOptions);

  try {
    const repoNames = [
      'my-soroban.studio',
      'Sales-Reports-Analysis-on-Automotive-Spare-Parts-Business-Using-Decision-Support-System',
      'DailylifeTrackingsystem',
      'MNLLUMIERE'
    ];

    const promises = repoNames.map(name => 
      fetch(`https://api.github.com/repos/webjie28/${name}`)
        .then(res => res.json())
        .then(data => ({ ...data, _repoName: name })) // Keep track of the original requested name for fallbacks
    );
    
    const fetchedProjects = await Promise.all(promises);
    
    const mapProjectData = (proj) => {
      // Fallback if GitHub API rate limit is exceeded
      const repoName = proj.name || proj._repoName;
      const customData = customRepoDetails[repoName] || {};
      
      return {
        ...proj,
        id: proj.id || Math.random().toString(36).substr(2, 9), // Fallback ID
        customTitle: customData.title || repoName || 'Project',
        customSubtitle: customData.subtitle || 'Personal Project',
        customDescription: customData.description || proj.description || 'No description available.',
        tags: customData.tags || ['GitHub Repo'],
        displayLink: customData.liveLink || proj.homepage || proj.html_url || '#'
      };
    };

    projects.value = fetchedProjects.map(mapProjectData);

    // Observe dynamic elements after render
    setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
      });
      document.querySelectorAll('.scrolly-step').forEach(step => {
        stepObserver.observe(step);
      });
    }, 100);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  // Observe existing static elements
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
  document.querySelectorAll('.scrolly-step').forEach(step => {
    stepObserver.observe(step);
  });
});

// Contact Form Setup
const contactForm = ref({
  name: '',
  email: '',
  message: ''
});
const isSubmitted = ref(false);
const isSending = ref(false);
const sendError = ref(false);

const submitContact = async () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) return;

  isSending.value = true;
  sendError.value = false;

  try {
    await addDoc(collection(db, 'messages'), {
      name: contactForm.value.name,
      email: contactForm.value.email,
      message: contactForm.value.message,
      subject: `New Portfolio Message from ${contactForm.value.name}`,
      createdAt: serverTimestamp()
    });

    isSubmitted.value = true;
    contactForm.value = { name: '', email: '', message: '' };
    setTimeout(() => { isSubmitted.value = false; }, 5000);
  } catch (err) {
    console.error('Submission error:', err);
    sendError.value = true;
    setTimeout(() => { sendError.value = false; }, 5000);
  } finally {
    isSending.value = false;
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

/* Floating n8n chatbot */
.inbox-overlay { position: fixed; inset: 0; z-index: 1000; display: flex; flex-direction: column; background: #101114; color: #f7f7f5; }.inbox-header { display:flex; justify-content:space-between; align-items:center; padding:18px 5vw; border-bottom:1px solid #2b2d33; }.inbox-header strong,.inbox-header span { display:block; }.inbox-header span { margin-top:3px; color:#a8a29e; font-size:.82rem; }.inbox-header button { border:0; background:transparent; color:#fff; font-size:30px; cursor:pointer; }.inbox-login,.inbox-empty { margin:auto; text-align:center; color:#d6d3d1; }.inbox-login button { margin-top:16px; padding:12px 16px; border:0; border-radius:10px; background:#ea580c; color:#fff; font:inherit; cursor:pointer; }.inbox-content { flex:1; min-height:0; display:grid; grid-template-columns:320px 1fr; }.inbox-content aside { overflow:auto; padding:14px; border-right:1px solid #2b2d33; }.inbox-content aside button { display:block; width:100%; padding:13px; margin-bottom:8px; border:1px solid #2b2d33; border-radius:10px; text-align:left; background:#18191d; color:#f7f7f5; cursor:pointer; }.inbox-content aside button.selected { border-color:#ea580c; background:#2a1a12; }.inbox-content aside strong,.inbox-content aside small { display:block; }.inbox-content aside small { overflow:hidden; margin-top:5px; color:#a8a29e; text-overflow:ellipsis; white-space:nowrap; }.inbox-content main { overflow:auto; padding:28px; }.inbox-message { max-width:680px; padding:12px 14px; margin:10px 0; border-radius:12px; line-height:1.5; }.inbox-message.user { margin-left:auto; background:#ea580c; }.inbox-message.assistant { background:#24262c; } @media(max-width:700px){.inbox-content{grid-template-columns:1fr}.inbox-content aside{max-height:180px;border-right:0;border-bottom:1px solid #2b2d33}}
.chatbot-shell { position: fixed; right: 24px; bottom: 24px; z-index: 500; display: flex; flex-direction: column; align-items: flex-end; gap: 14px; }.chatbot-panel { width: min(380px, calc(100vw - 32px)); height: min(520px, calc(100vh - 110px)); display: flex; flex-direction: column; overflow: hidden; background: var(--card-bg, #fff); border: 1px solid var(--card-border, rgba(0,0,0,.1)); border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,.2); }.chatbot-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 18px; color: #fff; background: linear-gradient(135deg, var(--accent-purple, #ea580c), var(--accent-blue, #d97706)); }.chatbot-title { display: flex; align-items: center; gap: 10px; }.chatbot-title strong,.chatbot-title small { display: block; }.chatbot-title strong { font-size: .9rem; }.chatbot-title small { font-size: .7rem; opacity: .8; margin-top: 2px; }.chatbot-status { width: 10px; height: 10px; border-radius: 50%; background: #86efac; box-shadow: 0 0 0 3px rgba(255,255,255,.2); }.chatbot-icon-btn { border: 0; background: transparent; color: #fff; font-size: 27px; cursor: pointer; line-height: 1; }.chatbot-messages { flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 12px; background: var(--bg-secondary, #fafaf9); }.chat-message { max-width: 86%; padding: 10px 13px; border-radius: 14px; font-size: .86rem; line-height: 1.55; white-space: pre-wrap; }.chat-message.assistant { align-self: flex-start; background: var(--card-bg, #fff); color: var(--text-primary, #1c1917); border-bottom-left-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,.05); }.chat-message.user { align-self: flex-end; color: #fff; background: var(--accent-purple, #ea580c); border-bottom-right-radius: 4px; }.chat-typing { display: flex; align-items: center; gap: 4px; min-height: 18px; }.chat-typing i { width: 6px; height: 6px; display: block; border-radius: 50%; background: currentColor; opacity: .45; animation: chatBounce 1.2s infinite; }.chat-typing i:nth-child(2) { animation-delay: .15s; }.chat-typing i:nth-child(3) { animation-delay: .3s; }.chatbot-suggestions { display: flex; gap: 7px; overflow-x: auto; padding: 9px 14px; border-top: 1px solid var(--card-border, rgba(0,0,0,.08)); background: var(--card-bg, #fff); }.chatbot-suggestions button { white-space: nowrap; border: 1px solid var(--accent-purple, #ea580c); color: var(--accent-purple, #ea580c); background: transparent; border-radius: 999px; padding: 5px 9px; font: inherit; font-size: .72rem; cursor: pointer; }.chatbot-form { display: flex; gap: 9px; padding: 12px 14px 14px; background: var(--card-bg, #fff); }.chatbot-form input { min-width: 0; flex: 1; border: 1px solid var(--card-border, rgba(0,0,0,.16)); border-radius: 10px; padding: 10px 12px; color: var(--text-primary, #1c1917); background: transparent; font: inherit; font-size: .85rem; outline-color: var(--accent-purple, #ea580c); }.chatbot-form button,.chatbot-launcher { display: grid; place-items: center; border: 0; color: #fff; background: var(--accent-purple, #ea580c); cursor: pointer; }.chatbot-form button { width: 42px; border-radius: 10px; }.chatbot-form button:disabled { opacity: .5; cursor: not-allowed; }.chatbot-launcher { width: 58px; height: 58px; border-radius: 50%; box-shadow: 0 8px 25px rgba(234,88,12,.35); transition: transform .2s ease; }.chatbot-launcher:hover { transform: translateY(-2px); }.chatbot-launcher span { font-size: 32px; line-height: 1; }.chat-pop-enter-active,.chat-pop-leave-active { transition: opacity .2s ease, transform .2s ease; }.chat-pop-enter-from,.chat-pop-leave-to { opacity: 0; transform: translateY(10px) scale(.97); } @keyframes chatBounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-4px); } } @media (max-width: 480px) { .chatbot-shell { right: 16px; bottom: 16px; }.chatbot-panel { height: min(510px, calc(100vh - 95px)); }.chatbot-launcher { width: 54px; height: 54px; } }

/* --- Custom Retro Mac Cursors --- */

body, html {
  cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDEyIDIwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIwIiB5PSIyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEiIHk9IjIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIwIiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEiIHk9IjMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjAiIHk9IjQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMSIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIyIiB5PSI0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIwIiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzIiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIwIiB5PSI2IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iNiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzIiB5PSI2IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNSIgeT0iNiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI2IiB5PSI2IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjAiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIyIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjMiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjYiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNyIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIwIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI2IiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjciIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIwIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI2IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjciIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjAiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjMiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjYiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjciIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjgiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjkiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIwIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI2IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI3IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI4IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI5IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMCIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjAiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjIiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjMiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjYiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjciIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjgiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjkiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEwIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMSIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMSIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMyIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNiIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNyIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMCIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMSIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNSIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOCIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMSIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNSIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNyIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMCIgeT0iMTYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMSIgeT0iMTYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNSIgeT0iMTYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iMTYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNyIgeT0iMTYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOCIgeT0iMTYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iMTciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNyIgeT0iMTciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOCIgeT0iMTciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOSIgeT0iMTciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iMTgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNyIgeT0iMTgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOCIgeT0iMTgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOSIgeT0iMTgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNyIgeT0iMTkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iOCIgeT0iMTkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+') 1 1, auto !important;
}

a, button, .cta-btn, .project-card, .social-icon-btn, .hero-social-link, [role="button"] {
  cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE5IDE2Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjEiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNCIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSIxIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjYiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNyIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI0IiB5PSIyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI3IiB5PSIyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHk9IjMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNSIgeT0iMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI2IiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjciIHk9IjMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSI0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjYiIHk9IjQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNyIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMCIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMSIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMyIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxNCIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxNiIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxNyIgeT0iNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI0IiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjkiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTEiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTMiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTQiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTUiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTYiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTciIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTgiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMyIgeT0iNiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iNiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI3IiB5PSI2IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTEiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTIiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTMiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTQiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTUiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTYiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTciIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTgiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjQiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI2IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjciIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMiIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMyIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxNCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxNiIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxNyIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxOCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjIiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMyIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI0IiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjUiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI3IiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjkiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTEiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTIiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTQiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTUiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTYiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTciIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTgiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjIiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMyIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI0IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjUiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI3IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjkiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTIiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTMiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTQiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTUiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTYiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTciIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTgiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMCIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMiIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNCIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iOCIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjExIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMiIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTMiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxNSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTYiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE3IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxOCIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMSIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMyIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNCIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNSIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNyIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iOCIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iOSIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjExIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMiIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTMiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxNSIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTYiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE3IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxOCIgeT0iExIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNSIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iOCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iOSIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTAiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTMiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE0IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxNSIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTYiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE3IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIzIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI0IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI1IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI3IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI4IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI5IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTEiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEyIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMyIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTQiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE1IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI2IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI3IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI4IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMCIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTEiIHk9IjE0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEyIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMTQiIHk9IjE0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjYiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjciIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjgiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjkiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjEwIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMSIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTIiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48L3N2Zz4=') 6 1, pointer !important;
}

p, h1, h2, h3, h4, h5, h6, span {
  cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjE0IiB2aWV3Qm94PSIwIDAgOCAxNCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjIiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMyIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI0IiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNSIgeT0iMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSIzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSI2IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI1IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjMiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjQiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjUiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjYiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjciIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJibGFjayIvPjwvc3ZnPg==') 5 8, text;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px; /* Offset for sticky navbar */
}

:root {
  --bg-primary: #fdfcfb;
  --bg-secondary: #fffaf5;
  --accent-purple: #ea580c;
  --accent-blue: #d97706;
  --accent-glow: rgba(234, 88, 12, 0.08);
  --badge-bg: rgba(234, 88, 12, 0.06);
  --badge-text: #c2410c;
  --text-primary: #1c1917;
  --text-secondary: #57534e;
  --card-bg: rgba(255, 255, 255, 0.45);
  --card-border: rgba(255, 255, 255, 0.85);
  --shadow-color: rgba(120, 50, 0, 0.06);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  min-height: 100vh;
}

.portfolio-app {
  min-height: 100vh;
}

.portfolio-container {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 1;
}

/* Background Blurry Glows (Sunset Light Theme) */
.bg-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(150px);
  z-index: -1;
  pointer-events: none;
  opacity: 0.35;
  transition: all 0.8s ease;
}

.bg-glow-1 {
  top: 10%;
  left: -5%;
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, var(--accent-purple), transparent 75%);
}

.bg-glow-2 {
  bottom: 10%;
  right: -5%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--accent-blue), transparent 75%);
}

/* 🧭 Sticky Navigation Bar (Archi Green Inspiration) */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(253, 252, 251, 0.75);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.01);
  z-index: 100;
  transition: all 0.3s ease;
}

.nav-content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
}

.nav-logo {
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 800;
  display: flex;
  align-items: center;
}

.logo-text {
  color: var(--text-primary);
}

.logo-dot {
  color: var(--accent-purple);
  transition: color 0.3s ease;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--accent-purple);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-cta-btn {
  text-decoration: none;
  background: var(--text-primary);
  color: var(--bg-primary);
  padding: 0.65rem 1.4rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.88rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.nav-cta-btn:hover {
  background: var(--accent-purple);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 6px 15px var(--accent-glow);
}

/* Accent Theme Switcher */
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(0, 0, 0, 0.03);
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.theme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.theme-dot.orange { background-color: #ea580c; }
.theme-dot.teal { background-color: #0d9488; }
.theme-dot.blue { background-color: #2563eb; }

.theme-dot:hover {
  transform: scale(1.2);
}

.theme-dot.active {
  border-color: #ffffff;
  transform: scale(1.1);
}

/* 🖼️ FULL SCREEN HERO SECTION */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 3rem;
  position: relative;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 4rem;
  width: 100%;
}

@media (max-width: 820px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.hero-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 820px) {
  .hero-left {
    align-items: center;
    text-align: center;
  }
}

.hero-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent-purple);
  margin-bottom: 1.25rem;
  transition: color 0.3s ease;
}

/* NEW PINIA-STYLE HERO TYPOGRAPHY */
.hero-badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem; /* ~12px */
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.dark-theme .hero-badge {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 850;
  line-height: 1.1;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;
  color: var(--text-primary);
  display: flex;
}

@media (max-width: 820px) {
  .hero-title {
    justify-content: center;
  }
}

.pinia-accent {
  color: var(--accent-purple);
}

.hero-tagline {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.hero-desc.muted {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 400px;
}

.hero-ctas {
  display: flex;
  gap: 1.25rem;
}

.cta-btn {
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.github-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* PINIA BUTTONS */
.pinia-primary-btn {
  background: var(--accent-purple);
  color: #ffffff !important;
  border: none;
  box-shadow: 0 4px 15px var(--hero-glow-2, rgba(0,0,0,0.2));
}

.pinia-primary-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px var(--hero-glow-1, rgba(0,0,0,0.3));
}

.pinia-secondary-btn {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.pinia-secondary-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: translateY(-2px) scale(1.02);
}

.dark-theme .pinia-secondary-btn {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}
.dark-theme .pinia-secondary-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* HERO AMBIENT GLOW LAYERS */
.hero-section {
  position: relative;
}

.hero-glow-layer {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
  filter: blur(120px);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.dark-theme .hero-glow-layer.primary-glow {
  opacity: 0.3;
  background: radial-gradient(circle, var(--accent-purple), transparent 70%);
  width: 60vw;
  height: 60vw;
  max-width: 800px;
  max-height: 800px;
  top: 50%;
  right: -10%;
  transform: translateY(-50%);
  animation: glow-pulse-slow 8s infinite alternate ease-in-out;
}

.dark-theme .hero-glow-layer.secondary-glow {
  opacity: 0.12;
  background: radial-gradient(circle, var(--accent-blue), transparent 70%);
  width: 40vw;
  height: 40vw;
  max-width: 500px;
  max-height: 500px;
  bottom: -10%;
  left: -5%;
}

@keyframes glow-pulse-slow {
  from { transform: translateY(-50%) scale(1); }
  to { transform: translateY(-50%) scale(1.1); }
}

/* STAGGERED ENTRANCE ANIMATIONS */
@media (prefers-reduced-motion: no-preference) {
  .animate-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .stagger-1 { animation-delay: 100ms; }
  .stagger-2 { animation-delay: 250ms; }
  .stagger-3 { animation-delay: 400ms; }
  .stagger-4 { animation-delay: 550ms; }
  .stagger-5 { animation-delay: 700ms; }
}

@media (prefers-reduced-motion: reduce) {
  .animate-in {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
}

.hero-image-frame {
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: 32px;
  border: 4px solid rgba(255, 255, 255, 0.85);
  background: var(--card-bg);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12); /* Soft shadow for light mode */
  animation: float 6s ease-in-out infinite;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  box-sizing: border-box;
}

.hero-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 800;
  color: #ffffff;
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
}

.hero-quick-facts {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* Force them to stay on one line */
  justify-content: center;
  gap: 0.6rem;
  align-items: center;
  margin-top: 0.75rem; /* Moved up closer to the picture */
  width: max-content; /* Allow it to be wider than the 320px image container */
  max-width: 100vw;
  box-sizing: border-box;
}

.hero-fact-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: #f3f4f6; /* Gray background so the dots pop */
  padding: 0.5rem 1rem;
  border-radius: 999px; /* Pill shape for horizontal tags */
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, color 0.2s ease, background 0.2s ease;
  letter-spacing: 0.01em;
  width: auto; /* Auto width based on content */
  box-sizing: border-box;
}

.fact-bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  animation: 2.4s ease-out 0s infinite normal none running pulse-dot;
}

@keyframes pulse-dot {
  0% {
    box-shadow: 0 0 0 0 var(--pulse-color);
  }
  70% {
    box-shadow: 0 0 0 6px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

.fact-bullet.orange { 
  background-color: #ea580c; 
  --pulse-color: rgba(234, 88, 12, 0.6);
}
.fact-bullet.green { 
  background-color: #10b981; 
  --pulse-color: rgba(16, 185, 129, 0.6);
}
.fact-bullet.blue { 
  background-color: #3b82f6; 
  --pulse-color: rgba(59, 130, 246, 0.6);
}

.hero-fact-tag:hover {
  transform: translateX(4px);
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.04);
}

.dark-theme .hero-fact-tag {
  background: #1f2937; /* Dark gray */
  border-color: #374151;
}

.dark-theme .hero-fact-tag:hover {
  background: #374151;
  color: #ffffff;
}

.hero-terminal {
  background: #2b4382;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  margin: 1.5rem 0; /* Add margin to breathe within paragraphs */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  overflow: hidden;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08); /* Clean border */
}

.hero-terminal:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

.terminal-header {
  background: #f6f6f6;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  margin: 0;
  border-radius: 8px 8px 0 0; /* Force border radius to fix bleeding */
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.terminal-dots .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dots .dot.red { background: #ea580c; }
.terminal-dots .dot.yellow { background: #0d9488; }
.terminal-dots .dot.blue { background: #2563eb; }

.terminal-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #999;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.terminal-body {
  padding: 6px 12px;
  color: #ffffff;
  line-height: 1.4;
  text-align: left;
}

.terminal-line {
  margin-bottom: 0;
}

.terminal-user {
  color: #a2c6f9;
  margin-right: 6px;
}

.terminal-command {
  color: #ffffff;
}

.terminal-output {
  color: #ffffff;
  font-weight: 500;
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #ffffff;
  margin-left: 4px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

/* Header & Section Styles */
.chapter-section {
  margin-bottom: 8rem;
  scroll-margin-top: 100px;
}

.glass-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 3.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px var(--shadow-color);
}

.chapter-header {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.chapter-subtitle {
  color: var(--text-secondary);
  font-size: 1.05rem;
  margin-bottom: 3.5rem;
  line-height: 1.6;
}

/* SECTION 1: THE ORIGIN styling */
.story-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

@media (max-width: 820px) {
  .story-layout {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

.story-text p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.story-text strong {
  color: var(--text-primary);
}

.lead-text {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--text-primary), var(--accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.75rem !important;
}

.journey-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  padding-left: 1.75rem;
  border-left: 2px solid rgba(0, 0, 0, 0.04);
}

.timeline-step {
  position: relative;
}

.step-marker {
  position: absolute;
  left: calc(-1.75rem - 6px);
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-purple);
  border: 2px solid var(--bg-primary);
  box-shadow: 0 0 10px var(--accent-glow);
  transition: background-color 0.3s ease;
}

.step-content h5 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.step-content p {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* Skills Highlight */
.skills-highlight {
  margin-top: 2.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.skill-icon-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--accent-purple);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.skill-category h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.skill-category p {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* SECTION 2: CREATIONS styling */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 15px 35px var(--shadow-color);
  position: relative;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 25px 50px var(--shadow-color), 0 0 25px var(--accent-glow);
}

.project-header {
  margin-bottom: 1.5rem;
}

.project-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  background: var(--badge-bg);
  color: var(--badge-text);
  border: 1px solid rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  line-height: 1.4;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 800;
  line-height: 1.35;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.project-desc {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.25rem;
}

.tag {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.04);
  color: var(--text-secondary);
}

.project-footer {
  margin-top: auto;
}

.view-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.view-btn svg {
  transition: transform 0.3s ease;
}

.view-btn:hover {
  color: var(--accent-purple);
}

.view-btn:hover svg {
  transform: translate(2px, -2px);
}

/* 💎 SECTION 3: STICKY SCROLLYTELLING styling 💎 */
.scrollytelling-wrapper {
  padding: 4rem 3.5rem !important;
}

.scrollytelling-container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 820px) {
  .scrollytelling-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.scrolly-visual {
  position: sticky;
  top: 140px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

@media (max-width: 820px) {
  .scrolly-visual {
    position: sticky;
    top: 70px;
    height: 300px;
    margin-bottom: 0;
    z-index: 10;
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
}

.browser-mockup {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.browser-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #f4f3f2;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.browser-header .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background-color: #ff5f56; }
.dot.yellow { background-color: #ffbd2e; }
.dot.green { background-color: #27c93f; }

.browser-url {
  margin-left: 1.5rem;
  font-size: 0.75rem;
  color: #787776;
  font-family: monospace;
  background: #ffffff;
  padding: 0.25rem 2rem;
  border-radius: 6px;
  flex-grow: 1;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.browser-body {
  width: 100%;
  height: 280px;
  overflow: hidden;
  position: relative;
  background: #fbfaf9;
}

@media (max-width: 820px) {
  .browser-body {
    height: 200px;
  }
}

.screenshot-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.thesis-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0;
  transition: opacity 0.6s ease-in-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transform: scale(1.05);
}

.thesis-img.active {
  opacity: 1;
  transform: scale(1);
}


/* Highlight tags */
.highlight-overlay {
  position: absolute;
  border: 3px solid var(--accent-purple);
  border-radius: 8px;
  background: rgba(234, 88, 12, 0.06);
  box-shadow: 0 0 25px var(--accent-glow);
  animation: fadeIn 0.4s ease;
  z-index: 10;
  transition: border-color 0.3s ease;
}

.chart-highlight {
  top: 15%;
  left: 20%;
  width: 60%;
  height: 52%;
}

.alert-highlight {
  top: 48%;
  left: 55%;
  width: 40%;
  height: 44%;
}

.highlight-text {
  position: absolute;
  bottom: -28px;
  left: 0;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  white-space: nowrap;
}

.pulse-indicator {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-purple);
  animation: pulse 1.5s infinite;
}

/* Scrolling Narrative Column */
.scrolly-text-column {
  display: flex;
  flex-direction: column;
  gap: 8rem;
  padding: 3rem 0;
}

.scrolly-step {
  opacity: 0.35;
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: scale(0.95);
  text-align: left;
}

.scrolly-step.active {
  opacity: 1;
  transform: scale(1);
}

.step-num-badge {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: var(--badge-bg);
  color: var(--badge-text);
  display: inline-block;
  margin-bottom: 1.25rem;
  transition: all 0.3s ease;
}

.scrolly-step h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.scrolly-step p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* SECTION 4: CONNECTION styling */
.contact-wrapper {
  max-width: 950px;
  margin: 0 auto;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 4rem;
}

@media (max-width: 820px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.contact-details h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.contact-details p {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.details-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.detail-icon {
  font-size: 1.3rem;
}

.detail-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.detail-link:hover {
  color: var(--accent-purple);
  text-decoration: underline;
}

.social-btn.large {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.social-btn.large:hover {
  background: var(--accent-purple);
  color: #ffffff;
  box-shadow: 0 6px 15px var(--accent-glow);
}

.contact-form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.success-banner {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.15);
  padding: 1.25rem;
  border-radius: 14px;
  margin-bottom: 1rem;
  animation: fadeIn 0.4s ease;
}

.success-banner h4 {
  color: #059669;
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
}

.success-banner p {
  color: #065f46;
  font-size: 0.9rem;
  line-height: 1.45;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.form-input {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 0.9rem 1.1rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.form-input:focus {
  border-color: var(--accent-purple);
  box-shadow: 0 0 12px var(--accent-glow);
  background: rgba(255, 255, 255, 0.95);
}

.submit-btn {
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue));
  color: #ffffff;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px var(--accent-glow);
  margin-top: 0.5rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--accent-glow);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Footer Section */
.portfolio-footer-nav {
  text-align: center;
  padding-top: 3rem;
  border-top: 1px solid rgba(0, 0, 0, 0.03);
  color: #878685;
  font-size: 0.8rem;
  margin-top: 5rem;
  padding-bottom: 4rem;
}

/* 💎 Scroll-Reveal Animations Styling 💎 */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered project cards */
.project-grid .project-card:nth-child(1) { transition-delay: 0.05s; }
.project-grid .project-card:nth-child(2) { transition-delay: 0.25s; }

/* Staggered journey steps */
.journey-timeline .timeline-step:nth-child(1) { transition-delay: 0.1s; }
.journey-timeline .timeline-step:nth-child(2) { transition-delay: 0.3s; }
.journey-timeline .timeline-step:nth-child(3) { transition-delay: 0.5s; }

/* Staggered core competency cards */
.skills-grid .skill-category:nth-child(1) { transition-delay: 0.1s; }
.skills-grid .skill-category:nth-child(2) { transition-delay: 0.3s; }

/* Staggered contact layout */
.contact-details { transition-delay: 0.1s; }
.contact-form { transition-delay: 0.3s; }

/* General Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Staggered entrance animations (DailylifeTracking-style fadeInUp) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.5s ease both;
}

.animate-in:nth-child(1) { animation-delay: 0s; }
.animate-in:nth-child(2) { animation-delay: 0.06s; }
.animate-in:nth-child(3) { animation-delay: 0.12s; }
.animate-in:nth-child(4) { animation-delay: 0.18s; }
.animate-in:nth-child(5) { animation-delay: 0.24s; }
.animate-in:nth-child(6) { animation-delay: 0.30s; }
.animate-in:nth-child(7) { animation-delay: 0.36s; }
.animate-in:nth-child(8) { animation-delay: 0.42s; }

/* 📄 Curriculum Vitae Modal CSS */
.cv-nav-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;
}

.cv-nav-btn:hover {
  color: var(--accent-purple);
}

button.cta-btn {
  cursor: pointer;
  font-family: inherit;
}

.cv-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 9, 8, 0.6);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem 1rem;
}

.cv-modal-card {
  width: 100%;
  max-width: 850px;
  height: 90vh;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 20px;
  overflow: hidden;
}

.cv-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(20, 18, 16, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.cv-modal-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
}

.cv-header-actions {
  display: flex;
  gap: 0.75rem;
}

.cv-action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.cv-action-btn.download-btn {
  background: var(--accent-purple);
  color: #ffffff;
  border-color: var(--accent-purple);
}

.cv-action-btn.download-btn:hover {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
}

.cv-action-btn.print-btn {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.1);
}

.cv-action-btn.print-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.cv-action-btn.close-btn {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.1);
}

.cv-action-btn.close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.cv-document-wrapper {
  flex-grow: 1;
  background: #ffffff !important;
  color: #000000 !important;
  padding: 1rem 2rem 1.5rem 2rem;
  overflow-y: auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-family: Georgia, 'Times New Roman', Times, serif;
  line-height: 1.4;
}

/* Document Formatting */
.cv-doc-header {
  border-bottom: 1px solid #000000 !important;
  padding-bottom: 0.5rem;
  margin-bottom: 0.25rem;
  text-align: center;
}

.cv-name {
  font-size: 1.7rem;
  font-weight: bold;
  color: #000000 !important;
  margin: 0 0 0.25rem 0;
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.cv-contact-line {
  font-size: 0.82rem;
  color: #000000 !important;
  line-height: 1.5;
  text-align: center;
}

.cv-link {
  color: #000000 !important;
  text-decoration: underline;
}

.cv-link:hover {
  color: #333333 !important;
}

.cv-link-accent {
  color: var(--accent-purple, #ea580c) !important;
  text-decoration: underline;
  font-weight: bold;
}

.cv-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.35rem;
}

.cv-section-heading {
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #000000 !important;
  margin: 0;
  padding-left: 0.6rem;
  border-left: 3px solid var(--accent-purple, #ea580c);
}

.cv-edu-item {
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.cv-edu-details {
  display: flex;
  flex-direction: column;
}

.cv-school-name {
  font-weight: bold;
  color: #000000 !important;
}

.cv-degree-name {
  color: #000000 !important;
}

.cv-project-item {
  margin-bottom: 0.35rem;
}

.cv-project-title {
  font-size: 0.85rem;
  font-weight: bold;
  color: #000000 !important;
  margin: 0 0 0.15rem 0;
}

.cv-tech-stack {
  font-weight: normal;
  color: #444444 !important;
}

.cv-bullets {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  line-height: 1.35;
  color: #000000 !important;
  list-style-type: disc;
}

.cv-bullets li {
  margin-bottom: 0.2rem;
  color: #000000 !important;
}

.cv-skills-content {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #000000 !important;
}

.cv-skills-content p {
  margin: 0 0 0.4rem 0;
  color: #000000 !important;
}

.cv-skills-content strong {
  font-weight: bold;
  color: #000000 !important;
}

/* 🖨️ Printable CSS Override */
@media print {
  @page {
    size: A4 portrait;
    margin: 8mm 10mm 8mm 10mm;
  }

  /* Completely hide the main application to fix the extra/blank pages issue */
  .portfolio-app {
    display: none !important;
  }

  body, html {
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Show only the CV modal backdrop/card in flat format */
  .cv-modal-backdrop {
    display: block !important;
    position: static !important;
    background: #ffffff !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    height: auto !important;
    overflow: visible !important;
  }

  .cv-modal-card {
    position: static !important;
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    max-height: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
    margin: 0 !important;
    background: #ffffff !important;
    overflow: visible !important;
  }

  .cv-modal-header,
  .no-print {
    display: none !important;
  }

  .cv-document-wrapper {
    display: flex !important;
    flex-direction: column !important;
    padding: 0 !important;
    margin: 0 !important;
    gap: 0.2rem !important;
    font-size: 9pt !important;
    line-height: 1.2 !important;
    background: #ffffff !important;
    overflow: visible !important;
  }

  .cv-doc-header {
    border-bottom: 1px solid #000000 !important;
    padding-bottom: 0.4rem !important;
    margin-bottom: 0.2rem !important;
    text-align: center !important;
  }

  .cv-name {
    font-size: 1.5rem !important;
    margin: 0 0 0.1rem 0 !important;
  }

  .cv-contact-line {
    font-size: 8.5pt !important;
  }

  .cv-link-accent {
    color: #000000 !important;
  }

  .cv-section {
    gap: 0.15rem !important;
    margin-bottom: 0.15rem !important;
  }

  .cv-section-heading {
    font-size: 0.95rem !important;
    letter-spacing: 0.03em !important;
    border-left-color: #000000 !important;
  }

  .cv-edu-item {
    font-size: 8pt !important;
    margin-bottom: 0.1rem !important;
  }

  .cv-project-item {
    margin-bottom: 0.15rem !important;
  }

  .cv-project-title {
    font-size: 8.5pt !important;
    margin-bottom: 0.02rem !important;
  }

  .cv-tech-stack {
    color: #444444 !important;
  }

  .cv-bullets {
    font-size: 7.8pt !important;
    padding-left: 1rem !important;
  }

  .cv-bullets li {
    margin-bottom: 0.05rem !important;
  }

  .cv-skills-content {
    font-size: 8.2pt !important;
  }

  .cv-skills-content p {
    margin-bottom: 0.1rem !important;
  }

  /* Prevent elements from breaking across pages */
  .cv-section,
  .cv-edu-item,
  .cv-project-item {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
}

/* 🌙 Dark Mode Variables Override */
.dark-theme {
  --bg-primary: var(--dark-bg-primary, #050505);
  --bg-secondary: var(--dark-bg-secondary, #0a0a0a);
  --text-primary: #f5f5f4;
  --text-secondary: #b8b4af;
  --card-bg: rgba(15, 15, 15, 0.65);
  --card-border: rgba(255, 255, 255, 0.05);
  --shadow-color: rgba(0, 0, 0, 0.7);
  --badge-bg: rgba(var(--accent-rgb, 234, 88, 12), 0.12);
}

.dark-theme .bg-glow {
  opacity: 0;
  display: none;
}

/* Pinia-style glow for Avatar in Dark Mode - Main Light Source */
.dark-theme .hero-image-frame {
  box-shadow: 0 30px 60px var(--shadow-color), 
              0 0 100px var(--hero-glow-1, rgba(230, 255, 0, 0.45)), 
              0 0 250px var(--hero-glow-2, rgba(0, 255, 120, 0.3)),
              0 0 450px var(--hero-glow-3, rgba(0, 255, 120, 0.15));
}

/* Navbar */
.dark-theme .navbar {
  background: rgba(10, 9, 8, 0.8);
  border-bottom-color: rgba(255, 255, 255, 0.04);
}

/* Hero secondary button */
.dark-theme .secondary-btn {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.dark-theme .secondary-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--accent-purple);
}

/* Nav CTA button */
.dark-theme .nav-cta-btn {
  background: var(--text-primary);
  color: var(--bg-primary);
}

/* Project cards */
.dark-theme .project-card {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark-theme .project-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 25px var(--accent-glow);
}

/* Project badges */
.dark-theme .project-badge {
  background: rgba(255, 255, 255, 0.06);
  color: var(--accent-purple);
  border-color: rgba(255, 255, 255, 0.04);
}

/* Tags */
.dark-theme .tag {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.06);
  color: var(--text-secondary);
}

/* View button */
.dark-theme .view-btn {
  color: var(--text-primary);
}

.dark-theme .view-btn:hover {
  color: var(--accent-purple);
}

/* Browser Mockup */
.dark-theme .browser-mockup {
  background: #1a1918;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

.dark-theme .browser-header {
  background: #1e1d1b;
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

.dark-theme .browser-url {
  background: rgba(255, 255, 255, 0.05);
  color: #a8a29e;
  border-color: rgba(255, 255, 255, 0.04);
}

.dark-theme .browser-body {
  background: #141312;
}

/* Scrolly step badges */
.dark-theme .step-num-badge {
  background: rgba(255, 255, 255, 0.06);
  color: var(--accent-purple);
}

/* Journey Timeline */
.dark-theme .journey-timeline {
  border-left-color: rgba(255, 255, 255, 0.06);
}

.dark-theme .step-marker {
  border-color: var(--bg-primary);
}

/* Lead text gradient */
.dark-theme .lead-text {
  background: linear-gradient(90deg, var(--text-primary), var(--accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Typewriter text gradient */
.dark-theme .typewriter-text {
  background: linear-gradient(135deg, var(--text-primary) 30%, var(--accent-purple) 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Form inputs */
.dark-theme .form-input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}

.dark-theme .form-input:focus {
  background: rgba(255, 255, 255, 0.07);
  border-color: var(--accent-purple);
}

.dark-theme .form-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

/* Contact details */
.dark-theme .detail-link {
  color: var(--text-primary);
}

.dark-theme .detail-link:hover {
  color: var(--accent-purple);
}

/* Social / GitHub button */
.dark-theme .social-btn.large {
  background: var(--text-primary);
  color: var(--bg-primary);
}

.dark-theme .social-btn.large:hover {
  background: var(--accent-purple);
  color: #ffffff;
}

/* Theme Switcher pill */
.dark-theme .theme-switcher {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.06);
}

.dark-theme .theme-dot.active {
  border-color: rgba(255, 255, 255, 0.6);
}

/* Hero badge */
.dark-theme .hero-badge {
  color: var(--accent-purple);
}

/* Hero image frame */
.dark-theme .hero-image-frame {
  border-color: rgba(255, 255, 255, 0.08);
}

/* Skills section */
.dark-theme .skill-icon-title {
  color: var(--accent-purple);
}

/* Glass card overlay */
.dark-theme .glass-card {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
}

/* Footer */
.dark-theme .portfolio-footer-nav {
  border-top-color: rgba(255, 255, 255, 0.04);
  color: #6b6966;
}

/* Success / Error banners in dark mode */
.dark-theme .success-banner {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

.dark-theme .success-banner h4 {
  color: #34d399;
}

.dark-theme .success-banner p {
  color: #6ee7b7;
}

.dark-theme .error-banner {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
}

.dark-theme .error-banner h4 {
  color: #f87171;
}

.dark-theme .error-banner p {
  color: #fca5a5;
}

/* Dark/Light Mode Toggle Button styling */
.nav-controls {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.dark-mode-toggle {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
}

.dark-mode-toggle:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.dark-theme .dark-mode-toggle {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark-theme .dark-mode-toggle:hover {
  background: #ffffff;
  color: #000000;
}

/* Responsive Indicator Badge */
.responsive-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
}

.responsive-indicator:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.dark-theme .responsive-indicator {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.dark-theme .responsive-indicator:hover {
  background: #ffffff;
  color: #000000;
}

.responsive-indicator .show-on-mobile {
  display: none;
}

.responsive-indicator .show-on-desktop {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 820px) {
  .responsive-indicator .show-on-desktop {
    display: none;
  }
  .responsive-indicator .show-on-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.auth-toggle-btn {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
}

.auth-toggle-btn:hover {
  background: var(--accent-purple);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--accent-glow);
}

.dark-theme .auth-toggle-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark-theme .auth-toggle-btn:hover {
  background: var(--accent-purple);
  color: #ffffff;
}


/* ============================================
   🏋️ WEEKLY ROUTINES STYLE
   ============================================ */
.routine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.75rem;
  margin-top: 2rem;
}

.routine-day.sub-card {
  padding: 1.75rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dark-theme .routine-day.sub-card {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.04);
}

.day-header {
  margin-bottom: 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 0.75rem;
}

.dark-theme .day-header {
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

.day-badge {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background: var(--badge-bg);
  color: var(--badge-text);
  display: inline-block;
  margin-bottom: 0.5rem;
}

.day-header h4 {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary);
}

.exercise-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
}

.exercise-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.exercise-item.done {
  color: var(--text-primary);
}

.checkbox {
  font-weight: bold;
  font-size: 0.95rem;
  color: #a8a29e;
  user-select: none;
  flex-shrink: 0;
  line-height: 1;
  display: inline-block;
  margin-top: 1px;
}

.exercise-item.done .checkbox {
  color: var(--accent-purple);
  text-shadow: 0 0 8px var(--accent-glow);
}

.exercise-name {
  font-weight: 500;
}

.exercise-item.done .exercise-name {
  font-weight: 600;
}

.sets-reps {
  font-size: 0.82rem;
  color: #78716c;
  font-weight: 400;
}

.dark-theme .sets-reps {
  color: #a8a29e;
}


/* ============================================
   🍔 HAMBURGER MENU BUTTON (hidden on desktop)
   ============================================ */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 201;
  min-width: 44px;
  min-height: 44px;
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.hamburger-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile menu backdrop overlay */
.mobile-menu-backdrop {
  display: none;
}

/* Mobile-only extras container (hidden on desktop) */
.mobile-menu-extras {
  display: none;
}

/* Mobile controls row inside mobile menu */
.mobile-controls-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

/* Error banner */
.error-banner {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.15);
  padding: 1.25rem;
  border-radius: 14px;
  margin-bottom: 1rem;
  animation: fadeIn 0.4s ease;
}

.error-banner h4 {
  color: #dc2626;
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
}

.error-banner p {
  color: #991b1b;
  font-size: 0.9rem;
  line-height: 1.45;
}

/* ============================================
   📱 TABLET BREAKPOINT (max-width: 768px)
   ============================================ */
@media (max-width: 768px) {
  /* --- Hamburger visible --- */
  .hamburger-btn {
    display: flex;
    order: 3;
  }

  /* --- Nav links become mobile slide-out --- */
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: var(--bg-primary);
    flex-direction: column;
    gap: 0;
    padding: 100px 2rem 2rem 2rem;
    z-index: 200;
    transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
    border-left: 1px solid var(--card-border);
    overflow-y: auto;
  }

  .nav-links.mobile-open {
    right: 0;
  }

  .nav-links a,
  .nav-links .cv-nav-btn {
    font-size: 1.05rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    text-align: left;
    width: 100%;
    display: block;
  }

  .nav-links .cv-nav-btn {
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  /* Show mobile extras inside the mobile menu */
  .mobile-menu-extras {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .mobile-menu-extras .nav-cta-btn {
    text-align: center;
    display: block;
    width: 100%;
  }

  /* Mobile menu backdrop */
  .mobile-menu-backdrop {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 199;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .mobile-menu-backdrop.active {
    opacity: 1;
    pointer-events: all;
  }

  /* Hide desktop nav-right on mobile */
  .nav-right {
    display: none;
  }

  /* Dark theme mobile menu */
  .dark-theme .nav-links {
    background: var(--bg-primary);
    border-left-color: rgba(255, 255, 255, 0.05);
  }

  .dark-theme .nav-links a,
  .dark-theme .nav-links .cv-nav-btn {
    border-bottom-color: rgba(255, 255, 255, 0.04);
  }

  .dark-theme .mobile-menu-extras {
    border-top-color: rgba(255, 255, 255, 0.06);
  }

  /* --- Navbar height adjust --- */
  .navbar {
    height: 64px;
  }

  html {
    scroll-padding-top: 80px;
  }

  /* --- Hero section --- */
  .hero-section {
    padding-top: 80px;
    min-height: auto;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .hero-left {
    align-items: center;
    text-align: center;
    order: 2;
  }

  .hero-right {
    order: 1;
  }

  .hero-title {
    font-size: 2.8rem;
    justify-content: center;
  }

  .hero-desc {
    font-size: 0.95rem;
    max-width: 100%;
  }

  .hero-image-frame {
    width: 240px;
    height: 240px;
    border-radius: 24px;
  }

  .hero-ctas {
    flex-wrap: wrap;
    justify-content: center;
  }

  /* --- Chapter sections --- */
  .chapter-section {
    margin-bottom: 5rem;
  }

  .glass-card {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }

  .chapter-header {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .chapter-subtitle {
    font-size: 0.95rem;
    margin-bottom: 2.5rem;
  }

  /* --- Origin section --- */
  .story-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .lead-text {
    font-size: 1.1rem;
  }

  /* --- Skills --- */
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  /* --- Projects --- */
  .project-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-card {
    padding: 2rem;
    border-radius: 20px;
  }

  /* --- Scrollytelling --- */
  .scrollytelling-wrapper {
    padding: 2rem 1.5rem !important;
  }

  .scrollytelling-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .scrolly-visual {
    position: sticky;
    top: 70px;
    height: 260px;
    margin-bottom: 0;
    z-index: 10;
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .browser-body {
    height: 180px;
  }

  .scrolly-text-column {
    gap: 4rem;
    padding: 1rem 0;
  }

  .scrolly-step h3 {
    font-size: 1.25rem;
  }

  /* --- Contact --- */
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .contact-wrapper {
    max-width: 100%;
  }

  /* Touch targets for form inputs */
  .form-input {
    padding: 0.85rem 1rem;
    font-size: 16px; /* Prevents iOS auto-zoom */
  }

  .submit-btn {
    min-height: 48px;
    font-size: 1rem;
  }

  .social-btn.large {
    min-height: 48px;
  }

  /* --- CV Modal --- */
  .cv-modal-backdrop {
    padding: 0;
  }

  .cv-modal-card {
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  .cv-modal-header {
    padding: 0.85rem 1rem;
  }

  .cv-modal-header h3 {
    font-size: 1rem;
  }

  .cv-action-btn {
    padding: 0.45rem 0.75rem;
    font-size: 0.8rem;
  }

  .cv-action-btn span {
    display: none;
  }

  .cv-document-wrapper {
    padding: 1rem 1.25rem;
  }

  .cv-name {
    font-size: 1.4rem;
  }

  .cv-contact-line {
    font-size: 0.78rem;
  }

  /* --- Footer --- */
  .portfolio-footer-nav {
    margin-top: 3rem;
    padding-bottom: 3rem;
  }

  /* --- Background glows size down --- */
  .bg-glow-1 {
    width: 350px;
    height: 350px;
  }

  .bg-glow-2 {
    width: 400px;
    height: 400px;
  }

  /* --- Custom Mobile Animations (Kakaiba) --- */
  /* We remove transition-delay: 0s for timeline-step to allow them to reveal one by one */
  .project-grid .project-card.reveal-on-scroll,
  .skills-grid .skill-category.reveal-on-scroll {
    transition-delay: 0s !important;
  }

  .project-grid {
    perspective: 1000px;
  }
  .project-grid .project-card.reveal-on-scroll {
    transform: translateY(60px) rotateX(15deg) scale(0.9);
    opacity: 0;
    transform-origin: center bottom;
    transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .project-grid .project-card.reveal-on-scroll.revealed {
    transform: translateY(0) rotateX(0) scale(1);
    opacity: 1;
  }

  /* Timeline steps alternating slide left and right */
  .journey-timeline .timeline-step.reveal-on-scroll {
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .journey-timeline .timeline-step.reveal-on-scroll:nth-child(odd) {
    transform: translateX(-60px) scale(0.95);
  }
  .journey-timeline .timeline-step.reveal-on-scroll:nth-child(even) {
    transform: translateX(60px) scale(0.95);
  }
  .journey-timeline .timeline-step.reveal-on-scroll.revealed {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

/* ============================================
   📱 SMALL MOBILE BREAKPOINT (max-width: 480px)
   ============================================ */
@media (max-width: 480px) {
  /* --- Container padding --- */
  .portfolio-container {
    padding: 0 1rem;
  }

  /* --- Navbar --- */
  .navbar {
    height: 56px;
  }

  .nav-content {
    padding: 0 1rem;
  }

  .nav-logo {
    font-size: 1.35rem;
  }

  html {
    scroll-padding-top: 70px;
  }

  /* --- Hero --- */
  .hero-section {
    padding-top: 70px;
    padding-bottom: 2rem;
  }

  .hero-content {
    gap: 2rem;
  }

  .hero-badge {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
  }

  .hero-title {
    font-size: 2.2rem;
    margin-bottom: 1.25rem;
  }

  /* Fix typewriter for small screens */
  .typewriter-text {
    font-size: inherit;
    white-space: nowrap;
  }

  .hero-desc {
    font-size: 0.9rem;
    margin-bottom: 2rem;
    line-height: 1.65;
  }

  .hero-image-frame {
    width: 200px;
    height: 200px;
    border-radius: 20px;
    border-width: 3px;
  }

  .hero-ctas {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }


  .cta-btn {
    text-align: center;
    width: 100%;
    padding: 0.85rem 1.5rem;
    font-size: 0.9rem;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* --- Sections --- */
  .chapter-section {
    margin-bottom: 3.5rem;
    scroll-margin-top: 70px;
  }

  .glass-card {
    padding: 1.5rem 1.15rem;
    border-radius: 16px;
  }

  /* Shrink Origin layout to fit 2-columns on mobile */
  #origin .glass-card {
    padding: 1.25rem 0.75rem;
  }
  #origin .story-layout {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  #origin .story-text p {
    font-size: 0.72rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
  }
  #origin .lead-text {
    font-size: 0.85rem;
    margin-bottom: 0.75rem !important;
  }
  #origin .chapter-header {
    font-size: 1.35rem;
    margin-bottom: 0.75rem;
  }
  #origin .journey-timeline {
    padding-left: 0.75rem;
    gap: 1rem;
  }
  #origin .step-marker {
    left: calc(-0.75rem - 4px);
    width: 8px;
    height: 8px;
  }
  #origin .step-content h5 {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  #origin .step-content p {
    font-size: 0.65rem;
    line-height: 1.35;
  }

  .chapter-header {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .chapter-subtitle {
    font-size: 0.88rem;
    margin-bottom: 2rem;
    line-height: 1.55;
  }

  /* --- Origin section --- */
  .story-text p {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .lead-text {
    font-size: 1.05rem;
  }

  .journey-timeline {
    padding-left: 1.25rem;
    gap: 1.5rem;
  }

  .step-marker {
    left: calc(-1.25rem - 5px);
    width: 8px;
    height: 8px;
  }

  .step-content h5 {
    font-size: 0.92rem;
  }

  .step-content p {
    font-size: 0.82rem;
  }

  /* --- Skills --- */
  .section-title {
    font-size: 1.25rem;
  }

  .skill-category h4 {
    font-size: 1.05rem;
  }

  .skill-category p {
    font-size: 0.88rem;
  }

  /* --- Projects --- */
  .project-card {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .project-badge {
    font-size: 0.68rem;
  }

  .project-title {
    font-size: 1.2rem;
  }

  .project-desc {
    font-size: 0.88rem;
    margin-bottom: 1.5rem;
  }

  .project-tags {
    margin-bottom: 1.5rem;
  }

  .tag {
    font-size: 0.72rem;
    padding: 0.2rem 0.5rem;
  }

  .view-btn {
    font-size: 0.85rem;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  /* --- Scrollytelling --- */
  .scrollytelling-wrapper {
    padding: 1.5rem 1.15rem !important;
  }

  .scrolly-visual {
    position: sticky;
    top: 56px;
    height: 220px;
    margin-bottom: 0;
    z-index: 10;
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    margin-left: -1.15rem;
    margin-right: -1.15rem;
    padding-left: 1.15rem;
    padding-right: 1.15rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .browser-mockup {
    border-radius: 12px;
  }

  .browser-header {
    padding: 0.5rem 0.85rem;
    gap: 0.35rem;
  }

  .browser-header .dot {
    width: 8px;
    height: 8px;
  }

  .browser-url {
    font-size: 0.6rem;
    margin-left: 0.75rem;
    padding: 0.2rem 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .browser-body {
    height: 160px;
  }

  .scrolly-text-column {
    gap: 3rem;
    padding: 0.5rem 0;
  }

  .step-num-badge {
    font-size: 0.68rem;
    padding: 0.3rem 0.65rem;
  }

  .scrolly-step h3 {
    font-size: 1.15rem;
    margin-bottom: 0.75rem;
  }

  .scrolly-step p {
    font-size: 0.88rem;
    line-height: 1.6;
  }

  /* --- Contact --- */
  .contact-details h3 {
    font-size: 1.2rem;
  }

  .contact-details p {
    font-size: 0.9rem;
  }

  .detail-item {
    font-size: 0.85rem;
    gap: 0.6rem;
  }

  .detail-link {
    word-break: break-all;
  }

  .form-group label {
    font-size: 0.82rem;
  }

  .form-input {
    padding: 0.8rem 0.9rem;
    font-size: 16px;
    border-radius: 10px;
  }

  .submit-btn {
    padding: 0.85rem;
    border-radius: 10px;
    min-height: 48px;
    font-size: 0.92rem;
  }

  .social-btn.large {
    padding: 0.85rem;
    border-radius: 10px;
    font-size: 0.9rem;
    min-height: 48px;
  }

  .success-banner,
  .error-banner {
    padding: 1rem;
    border-radius: 12px;
  }

  .success-banner h4,
  .error-banner h4 {
    font-size: 0.95rem;
  }

  .success-banner p,
  .error-banner p {
    font-size: 0.82rem;
  }

  /* --- CV Modal --- */
  .cv-modal-card {
    border-radius: 0;
  }

  .cv-modal-header {
    padding: 0.75rem 0.85rem;
  }

  .cv-modal-header h3 {
    font-size: 0.9rem;
  }

  .cv-header-actions {
    gap: 0.5rem;
  }

  .cv-action-btn {
    padding: 0.4rem 0.55rem;
    min-width: 44px;
    min-height: 44px;
    justify-content: center;
  }

  .cv-document-wrapper {
    padding: 0.75rem 0.85rem 1rem;
    font-size: 0.8rem;
  }

  .cv-name {
    font-size: 1.2rem;
  }

  .cv-section-heading {
    font-size: 0.95rem;
  }

  .cv-contact-line {
    font-size: 0.72rem;
  }

  .cv-edu-item {
    font-size: 0.78rem;
  }

  .cv-project-title {
    font-size: 0.78rem;
  }

  .cv-bullets {
    font-size: 0.72rem;
    padding-left: 1rem;
  }

  .cv-skills-content {
    font-size: 0.78rem;
  }

  /* --- Footer --- */
  .portfolio-footer-nav {
    font-size: 0.72rem;
    padding-bottom: 2.5rem;
    margin-top: 2rem;
  }

  /* --- Background glows --- */
  .bg-glow-1 {
    width: 250px;
    height: 250px;
  }

  .bg-glow-2 {
    width: 300px;
    height: 300px;
  }
}

/* ============================================
   📱 EXTRA SMALL (max-width: 360px)
   ============================================ */
@media (max-width: 360px) {
  .hero-title {
    font-size: 1.85rem;
  }

  .hero-desc {
    font-size: 0.85rem;
  }

  .chapter-header {
    font-size: 1.35rem;
  }

  .glass-card {
    padding: 1.25rem 1rem;
  }

  .nav-logo {
    font-size: 1.2rem;
  }
}

/* Senior design pass: editorial motion and system storytelling */
.scroll-progress { position: fixed; z-index: 950; top: 0; left: 0; width: 100%; height: 3px; transform-origin: left; background: linear-gradient(90deg, var(--accent-purple), #fb923c, var(--accent-blue)); box-shadow: 0 2px 14px var(--accent-glow); }
.hero-section::after { content: ''; position: absolute; inset: 12% 4% 10%; pointer-events: none; border: 1px solid rgba(234,88,12,.08); border-radius: 36px; mask-image: linear-gradient(to bottom, #000, transparent 70%); }
.hero-scroll-cue { position: absolute; left: 50%; bottom: 1.7rem; transform: translateX(-50%); display: grid; justify-items: center; gap: .55rem; color: var(--text-secondary); text-decoration: none; font-size: .68rem; letter-spacing: .13em; text-transform: uppercase; font-weight: 700; }
.hero-scroll-cue i { width: 1px; height: 34px; display: block; background: linear-gradient(var(--accent-purple), transparent); animation: scrollCue 1.8s ease-in-out infinite; }
.hero-image-frame { isolation: isolate; }
.system-flow { margin: 2.5rem 0 3rem; padding: 2rem; border-radius: 22px; display: grid; grid-template-columns: 1fr 1.1fr; gap: 2rem; overflow: hidden; position: relative; color: #fff; background: linear-gradient(125deg, #1c1917, #382114); box-shadow: 0 25px 55px rgba(73,35,4,.18); }
.system-flow::before { content:''; position:absolute; width:300px; height:300px; border-radius:50%; right:-80px; top:-190px; background:radial-gradient(circle,rgba(251,146,60,.36),transparent 65%); }
.system-flow-copy,.flow-nodes { position:relative; z-index:1; }.eyebrow { display:block; margin-bottom:.7rem; color:#fdba74; text-transform:uppercase; letter-spacing:.12em; font-weight:800; font-size:.68rem; }.system-flow h3 { max-width:420px; font-size:clamp(1.45rem,2.3vw,2rem); line-height:1.15; }.system-flow p { margin-top:.8rem; max-width:480px; color:#d6d3d1; line-height:1.65; font-size:.91rem; }.flow-nodes { display:flex; align-items:center; justify-content:center; gap:.7rem; }.flow-node { width:105px; min-height:105px; padding:1rem .75rem; display:grid; align-content:space-between; border:1px solid rgba(255,255,255,.18); border-radius:18px; background:rgba(255,255,255,.08); backdrop-filter:blur(8px); animation: nodeFloat 4.5s ease-in-out infinite; }.flow-node:nth-of-type(2){animation-delay:.5s}.flow-node:nth-of-type(3){animation-delay:1s}.flow-node.accent { border-color:#fb923c; background:rgba(234,88,12,.28); }.flow-node b { color:#fdba74; font-size:.72rem; }.flow-node span { font-size:.83rem; font-weight:800; }.flow-nodes > i { width:24px; height:1px; background:linear-gradient(90deg,#fb923c,rgba(255,255,255,.25)); position:relative; }.flow-nodes > i::after { content:'›'; position:absolute; right:-3px; top:50%; transform:translateY(-53%); color:#fdba74; }.project-card::before { content:''; position:absolute; inset:0; opacity:0; background:linear-gradient(135deg,rgba(255,255,255,.55),transparent 45%); transition:opacity .35s ease; pointer-events:none; }.project-card:hover::before { opacity:1; }
.workflow-demo-heading { max-width:680px; margin:4.5rem auto 1.5rem; text-align:center; }.workflow-demo-heading h3 { font-size:clamp(1.35rem,2.6vw,2rem); line-height:1.2; }.workflow-demo-heading p { margin-top:.8rem; color:var(--text-secondary); font-size:.93rem; line-height:1.65; }.workflow-demo-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; }.workflow-demo-card { min-height:250px; display:flex; flex-direction:column; padding:1.35rem; border:1px solid var(--card-border); border-radius:20px; background:rgba(255,255,255,.56); box-shadow:0 14px 34px var(--shadow-color); transition:transform .3s ease,box-shadow .3s ease; }.workflow-demo-card:hover { transform:translateY(-5px); box-shadow:0 24px 50px rgba(112,54,5,.15); }.workflow-demo-top { display:flex; justify-content:space-between; align-items:center; gap:.8rem; color:var(--badge-text); font-size:.63rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }.workflow-demo-top b { padding:.3rem .45rem; border-radius:999px; color:#15803d; background:#dcfce7; font-size:.58rem; }.workflow-demo-card h3 { margin:.9rem 0 .5rem; font-size:1.18rem; }.workflow-demo-card>p { color:var(--text-secondary); font-size:.84rem; line-height:1.55; }.workflow-mini-flow { display:flex; align-items:center; gap:.38rem; margin-top:1.1rem; overflow:hidden; color:var(--badge-text); font-size:.67rem; font-weight:800; white-space:nowrap; }.workflow-mini-flow span { padding:.42rem .55rem; border:1px solid var(--card-border); border-radius:8px; background:var(--badge-bg); }.workflow-mini-flow i { color:var(--accent-purple); font-style:normal; }.workflow-demo-link { width:100%; display:flex; align-items:center; justify-content:space-between; margin-top:auto; padding:1.15rem 0 0; border:0; color:var(--text-primary); background:transparent; font:inherit; font-size:.8rem; font-weight:800; text-align:left; cursor:pointer; }.workflow-demo-link span { color:var(--accent-purple); font-size:1rem; }.workflow-demo-card.violet .workflow-demo-top,.workflow-demo-card.violet .workflow-mini-flow { color:#7c3aed; }.workflow-demo-card.blue .workflow-demo-top,.workflow-demo-card.blue .workflow-mini-flow { color:#2563eb; }.workflow-demo-card.green .workflow-demo-top,.workflow-demo-card.green .workflow-mini-flow { color:#059669; }.workflow-modal-backdrop { position:fixed; z-index:900; inset:0; display:grid; place-items:center; padding:1.25rem; background:rgba(28,25,23,.62); backdrop-filter:blur(9px); }.workflow-modal { width:min(850px,100%); position:relative; padding:clamp(1.5rem,4vw,3rem); border:1px solid rgba(255,255,255,.24); border-radius:28px; color:#fff; background:linear-gradient(135deg,#1c1917,#4a2410); box-shadow:0 28px 90px rgba(0,0,0,.4); }.workflow-modal-close { position:absolute; top:1rem; right:1rem; width:36px; height:36px; border:1px solid rgba(255,255,255,.25); border-radius:50%; color:#fff; background:rgba(255,255,255,.08); font-size:1.45rem; cursor:pointer; }.workflow-modal-kicker { display:block; color:#fdba74; font-size:.68rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }.workflow-modal h2 { max-width:670px; margin:.6rem 0; font-size:clamp(1.65rem,4vw,2.7rem); }.workflow-modal>p { max-width:680px; color:#e7e5e4; line-height:1.65; }.workflow-canvas { display:flex; align-items:stretch; gap:.55rem; margin:2rem 0 1.25rem; overflow-x:auto; padding:1rem; border:1px solid rgba(255,255,255,.13); border-radius:18px; background:rgba(0,0,0,.18); }.workflow-canvas-node { min-width:170px; flex:1; padding:1rem; border:1px solid rgba(253,186,116,.38); border-radius:13px; background:rgba(255,255,255,.07); }.workflow-canvas-node b,.workflow-canvas-node span,.workflow-canvas-node small { display:block; }.workflow-canvas-node b { color:#fdba74; font-size:.67rem; }.workflow-canvas-node span { margin:.55rem 0; font-weight:800; }.workflow-canvas-node small { color:#d6d3d1; font-size:.72rem; line-height:1.45; }.workflow-canvas>i { align-self:center; color:#fdba74; font-size:1.2rem; font-style:normal; }.workflow-modal-note { display:flex; gap:.65rem; align-items:flex-start; padding:.8rem .9rem; border-radius:12px; color:#dcfce7; background:rgba(22,163,74,.15); font-size:.8rem; line-height:1.45; }.workflow-modal-note b { white-space:nowrap; }.workflow-source-link { display:inline-flex; gap:.55rem; align-items:center; margin-top:1.35rem; color:#fdba74; font-size:.78rem; font-weight:800; }.workflow-modal-enter-active,.workflow-modal-leave-active { transition:opacity .22s ease; }.workflow-modal-enter-active .workflow-modal,.workflow-modal-leave-active .workflow-modal { transition:transform .22s ease,opacity .22s ease; }.workflow-modal-enter-from,.workflow-modal-leave-to { opacity:0; }.workflow-modal-enter-from .workflow-modal,.workflow-modal-leave-to .workflow-modal { opacity:0; transform:translateY(14px) scale(.98); } @media(max-width:760px){.workflow-demo-grid{grid-template-columns:1fr}.workflow-demo-heading{margin-top:3.25rem}.workflow-canvas{align-items:flex-start}.workflow-canvas>i{margin-top:3rem}.workflow-modal-note{flex-direction:column;gap:.15rem}}
@keyframes scrollCue { 50% { transform: translateY(8px); opacity:.3; } } @keyframes nodeFloat { 50% { transform: translateY(-7px); } }
@media (max-width: 760px) { .hero-scroll-cue { display:none; }.system-flow { grid-template-columns:1fr; padding:1.5rem; }.flow-nodes { justify-content:flex-start; }.flow-node { width:90px; min-height:88px; }.flow-nodes > i { width:12px; } }
@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; } }

.toolbelt { width:min(1080px, calc(100% - 3rem)); margin:-1.8rem auto 4.5rem; position:relative; z-index:2; }.toolbelt > p { margin:0 0 .85rem 1rem; color:var(--text-secondary); font-size:.68rem; font-weight:800; letter-spacing:.13em; text-transform:uppercase; }.toolbelt-mask { overflow:hidden; padding:.6rem 0; mask-image:linear-gradient(90deg,transparent,black 9%,black 91%,transparent); }.toolbelt-track { width:max-content; display:flex; gap:.8rem; animation:toolMarquee 28s linear infinite; }.toolbelt-track:hover { animation-play-state:paused; }.tool-card { min-width:136px; height:70px; display:flex; align-items:center; gap:.7rem; padding:0 1rem; border:1px solid var(--card-border); border-radius:16px; background:rgba(255,255,255,.64); box-shadow:0 10px 28px var(--shadow-color); color:var(--text-primary); font-size:.84rem; font-weight:800; transition:transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease, background .25s ease; cursor:default; }.tool-card:hover { transform:translateY(-7px) scale(1.08); background:#fff; box-shadow:0 18px 35px rgba(120,50,0,.17); }.tool-mark { width:32px; height:32px; display:grid; place-items:center; border-radius:10px; background:color-mix(in srgb,currentColor 12%,white); font-size:1rem; font-weight:900; }.dark-theme .tool-card { background:rgba(31,41,55,.72); border-color:rgba(255,255,255,.12); }.dark-theme .tool-card:hover { background:#273142; } @keyframes toolMarquee { to { transform:translateX(calc(-50% - .4rem)); } }

/* Real-capture motion reels */
.reel-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1.4rem; margin-top:2.25rem; }.system-reel { overflow:hidden; border:1px solid var(--card-border); border-radius:24px; background:rgba(255,255,255,.52); box-shadow:0 16px 40px var(--shadow-color); transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s ease; }.system-reel:hover { transform:translateY(-7px); box-shadow:0 28px 60px rgba(112,54,5,.16); }.reel-stage { height:250px; display:block; position:relative; overflow:hidden; background:#171717; }.reel-stage>video { width:100%; height:100%; display:block; object-fit:cover; object-position:top center; transform:scale(1.01); transition:transform .8s cubic-bezier(.2,.8,.2,1); }.system-reel:hover .reel-stage>video { transform:scale(1.08); }.reel-overlay { position:absolute; inset:13% 8%; width:84% !important; height:74% !important; border:1px solid rgba(255,255,255,.3); border-radius:10px; box-shadow:0 18px 35px rgba(0,0,0,.38); opacity:0; transform:translateY(14px) rotate(-2deg) !important; transition:opacity .55s ease,transform .55s cubic-bezier(.2,.8,.2,1) !important; }.system-reel:hover .reel-overlay { opacity:1; transform:translateY(0) rotate(-2deg) !important; }.reel-stage::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,transparent 48%,rgba(0,0,0,.75)); pointer-events:none; }.reel-scan { position:absolute; z-index:1; left:0; right:0; top:-30%; height:28%; background:linear-gradient(transparent,rgba(255,255,255,.16),transparent); animation:reelScan 5s linear infinite; }.reel-play { position:absolute; z-index:2; left:16px; top:16px; width:36px; height:36px; display:grid; place-items:center; border-radius:50%; padding-left:2px; color:#fff; background:rgba(0,0,0,.44); border:1px solid rgba(255,255,255,.35); font-size:.72rem; transition:transform .3s ease,background .3s ease; }.system-reel:hover .reel-play { transform:scale(1.15); background:var(--accent-purple); }.reel-duration { position:absolute; z-index:2; bottom:12px; right:13px; color:#fff; font-size:.65rem; font-weight:800; letter-spacing:.08em; }.reel-copy { padding:1.35rem 1.45rem 1.5rem; }.reel-copy>span { display:block; color:var(--badge-text); font-size:.66rem; font-weight:800; letter-spacing:.09em; text-transform:uppercase; }.reel-copy h3 { margin:.6rem 0 .55rem; font-size:1.3rem; line-height:1.2; }.reel-copy p { min-height:4.2em; color:var(--text-secondary); font-size:.88rem; line-height:1.58; }.reel-copy small { display:inline-block; margin-top:1.1rem; padding:.38rem .62rem; border-radius:999px; background:var(--badge-bg); color:var(--badge-text); font-size:.68rem; font-weight:800; }.system-reel.violet .reel-copy>span,.system-reel.violet .reel-copy small { color:#7c3aed; }.system-reel.blue .reel-copy>span,.system-reel.blue .reel-copy small { color:#2563eb; }.system-reel.green .reel-copy>span,.system-reel.green .reel-copy small { color:#059669; } @keyframes reelScan { 0%,55% { transform:translateY(0); opacity:0; } 62% { opacity:1; } 85%,100% { transform:translateY(500%); opacity:0; } } @media(max-width:760px){.reel-grid{grid-template-columns:1fr}.reel-stage{height:220px}.reel-copy p{min-height:0}} @media(prefers-reduced-motion:reduce){.reel-scan{display:none}.reel-overlay{transition:none}.system-reel:hover .reel-stage>video{transform:none}}
.reel-stage iframe { width:147%; height:147%; border:0; background:#fff; transform:scale(.68); transform-origin:top left; }.assistant-demo { min-height:250px; display:flex; flex-direction:column; color:#fff; background:linear-gradient(135deg,#221812,#5a2107); }.assistant-demo-head { display:flex; align-items:center; gap:.55rem; padding:1rem 1.15rem; border-bottom:1px solid rgba(255,255,255,.13); }.assistant-demo-head span { width:9px; height:9px; border-radius:50%; background:#86efac; box-shadow:0 0 0 4px rgba(134,239,172,.15); }.assistant-demo-head b { font-size:.86rem; }.assistant-demo-head small { margin-left:auto; color:#fed7aa; font-size:.62rem; }.assistant-demo-body { flex:1; padding:1.15rem; color:#fff7ed; font-size:.86rem; line-height:1.55; overflow:auto; }.assistant-demo-body p { margin:0; }.assistant-demo form { display:flex; gap:.55rem; padding:1rem; background:rgba(0,0,0,.16); }.assistant-demo input { min-width:0; flex:1; border:1px solid rgba(255,255,255,.22); border-radius:9px; padding:.68rem .75rem; color:#fff; background:rgba(255,255,255,.1); outline:none; }.assistant-demo input::placeholder { color:#fed7aa; }.assistant-demo button { border:0; border-radius:9px; padding:.68rem .8rem; background:#fb923c; color:#1c1917; font:inherit; font-size:.76rem; font-weight:800; cursor:pointer; }.assistant-demo button:disabled { opacity:.55; cursor:wait; }
.workflow-canvas-node.trigger { border-color:rgba(96,165,250,.62); }.workflow-canvas-node.trigger b { color:#93c5fd; }.workflow-canvas-node.code { border-color:rgba(251,146,60,.58); }.workflow-canvas-node.code b { color:#fdba74; }.workflow-canvas-node.if { border-color:rgba(74,222,128,.65); }.workflow-canvas-node.if b { color:#86efac; }.workflow-canvas { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:.7rem; overflow:visible; }.workflow-canvas-node { min-width:0; padding:.8rem; }.workflow-canvas-node b { font-size:.58rem; }.workflow-canvas-node span { margin:.48rem 0; font-size:.82rem; }.workflow-canvas-node small { font-size:.66rem; line-height:1.4; }.workflow-canvas>i { display:none; } @media(max-width:600px){.workflow-canvas{grid-template-columns:repeat(2,minmax(0,1fr));}}
.video-workflow-stages { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem; max-height:52vh; margin:2rem 0 1.25rem; padding-right:.2rem; overflow:auto; }.video-workflow-stage { padding:1rem; border:1px solid rgba(255,255,255,.15); border-radius:16px; background:rgba(0,0,0,.16); }.video-workflow-stage>span { color:#fdba74; font-size:.65rem; font-weight:800; letter-spacing:.1em; }.video-workflow-stage h3 { margin:.42rem 0; font-size:1rem; }.video-workflow-stage p { color:#d6d3d1; font-size:.76rem; line-height:1.48; }.video-workflow-nodes { display:flex; flex-wrap:wrap; gap:.35rem; margin-top:.8rem; }.video-workflow-nodes b { padding:.35rem .45rem; border:1px solid rgba(251,146,60,.32); border-radius:7px; color:#fed7aa; background:rgba(251,146,60,.1); font-size:.62rem; line-height:1.25; } @media(max-width:650px){.video-workflow-stages{grid-template-columns:1fr;max-height:55vh;}}
.tool-mark img { width:19px; height:19px; display:block; object-fit:contain; }.dark-theme .tool-card { color:#f8fafc; background:rgba(28,36,50,.94); border-color:rgba(148,163,184,.27); box-shadow:0 12px 28px rgba(0,0,0,.28); }.dark-theme .tool-card:hover { background:#263247; box-shadow:0 18px 35px rgba(0,0,0,.42); }.dark-theme .tool-mark { background:rgba(255,255,255,.1); }.dark-theme .system-reel,.dark-theme .workflow-demo-card { border-color:rgba(148,163,184,.3); background:linear-gradient(145deg,rgba(30,41,59,.98),rgba(17,24,39,.98)); box-shadow:0 18px 42px rgba(0,0,0,.32); }.dark-theme .system-reel:hover,.dark-theme .workflow-demo-card:hover { box-shadow:0 28px 60px rgba(0,0,0,.48); }.dark-theme .reel-copy h3,.dark-theme .workflow-demo-card h3,.dark-theme .workflow-demo-link { color:#f8fafc; }.dark-theme .reel-copy p,.dark-theme .workflow-demo-card>p { color:#cbd5e1; }.dark-theme .workflow-mini-flow span { color:#e2e8f0; border-color:rgba(148,163,184,.26); background:rgba(15,23,42,.72); }.dark-theme .workflow-demo-top b { color:#bbf7d0; background:rgba(22,163,74,.28); }.dark-theme .system-reel .reel-copy small { background:rgba(15,23,42,.72); }
.origin-editorial,.feature-shell { border:0; background:transparent; box-shadow:none; }.origin-editorial { padding:2.5rem 0 0; }.origin-head,.section-heading-row { display:grid; grid-template-columns:88px minmax(0,1fr); gap:1.25rem; align-items:start; }.section-index { display:block; color:var(--accent-purple); font-size:.78rem; font-weight:900; letter-spacing:.12em; line-height:1.2; }.section-eyebrow { display:block; margin-bottom:.7rem; color:var(--accent-purple); font-size:.68rem; font-weight:900; letter-spacing:.13em; text-transform:uppercase; }.origin-head h2 { max-width:740px; font-size:clamp(2.5rem,6vw,5.8rem); letter-spacing:-.075em; line-height:.93; }.origin-story { display:grid; grid-template-columns:1.1fr .9fr; gap:3rem; max-width:1000px; margin:4rem 0 5.5rem 88px; }.origin-statement { max-width:600px; color:var(--text-primary); font-size:clamp(1.45rem,2.7vw,2.3rem); font-weight:700; letter-spacing:-.04em; line-height:1.18; }.origin-copy { padding-top:.4rem; }.origin-copy p { color:var(--text-secondary); font-size:1rem; line-height:1.75; }.origin-copy p+p { margin-top:1.15rem; }.origin-milestones { display:grid; grid-template-columns:repeat(3,1fr); margin-left:88px; border-top:1px solid var(--card-border); border-bottom:1px solid var(--card-border); }.origin-milestones article { min-height:190px; padding:1.5rem 1.35rem 1.7rem; border-left:1px solid var(--card-border); }.origin-milestones article:last-child { border-right:1px solid var(--card-border); }.origin-milestones span,.competency-list article>span { color:var(--accent-purple); font-size:.66rem; font-weight:900; letter-spacing:.1em; }.origin-milestones h3 { margin:2.6rem 0 .65rem; font-size:1.15rem; }.origin-milestones p { color:var(--text-secondary); font-size:.84rem; line-height:1.55; }.competency-rail { display:grid; grid-template-columns:.85fr 1.65fr; gap:3rem; margin:6rem 0 1rem 88px; padding-top:1.35rem; border-top:1px solid var(--card-border); }.competency-intro h3 { max-width:260px; font-size:clamp(1.55rem,2.6vw,2.4rem); letter-spacing:-.045em; line-height:1.05; }.competency-intro p { margin-top:1rem; max-width:285px; color:var(--text-secondary); font-size:.9rem; line-height:1.55; }.competency-list { border-top:1px solid var(--card-border); }.competency-list article { display:grid; grid-template-columns:55px 1fr; gap:.85rem; padding:1.25rem 0; border-bottom:1px solid var(--card-border); }.competency-list h4 { font-size:1.15rem; }.competency-list p { margin-top:.35rem; color:var(--text-secondary); font-size:.88rem; line-height:1.55; }.feature-shell { padding:0; }.section-heading-row { margin-bottom:1.2rem; }.section-heading-row .chapter-header { margin:0; }.feature-shell>.chapter-subtitle { max-width:680px; margin:0 0 2.7rem 88px; }.feature-works .reel-grid { margin-top:1.5rem; }.feature-automation .system-flow { margin-top:1.4rem; }.feature-automation .workflow-demo-heading { margin-top:4.2rem; }.thesis-shell .chapter-subtitle { max-width:780px; }.contact-wrapper { max-width:none; position:relative; overflow:hidden; padding:clamp(2.2rem,6vw,5.5rem); border-radius:30px; color:#fff; background:radial-gradient(circle at 88% 10%,rgba(251,146,60,.26),transparent 25%),linear-gradient(135deg,#17110e,#33150a); box-shadow:0 26px 70px rgba(80,35,5,.22); }.contact-wrapper::after { content:'05'; position:absolute; right:4%; bottom:-7%; color:rgba(255,255,255,.05); font-size:clamp(10rem,22vw,21rem); font-weight:900; letter-spacing:-.12em; pointer-events:none; }.contact-wrapper>* { position:relative; z-index:1; }.contact-wrapper .section-eyebrow { color:#fdba74; }.contact-wrapper .chapter-header { max-width:610px; margin-bottom:.8rem; color:#fff; font-size:clamp(2.2rem,5vw,4.4rem); letter-spacing:-.065em; line-height:.95; }.contact-wrapper .chapter-subtitle { max-width:700px; margin-bottom:3.5rem; color:#fed7aa; }.contact-wrapper .contact-details h3 { color:#fff; }.contact-wrapper .contact-details p,.contact-wrapper .detail-item { color:#e7e5e4; }.contact-wrapper .detail-link { color:#fff; }.contact-wrapper .form-input { color:#fff; border-color:rgba(255,255,255,.2); background:rgba(255,255,255,.08); }.contact-wrapper .form-input::placeholder { color:#d6d3d1; }.contact-wrapper .form-group label { color:#fff; }.contact-wrapper .submit-btn { background:#fb923c; color:#241009; }.dark-theme .origin-milestones,.dark-theme .competency-rail,.dark-theme .competency-list,.dark-theme .origin-milestones article,.dark-theme .competency-list article { border-color:rgba(148,163,184,.24); }.dark-theme .contact-wrapper { background:radial-gradient(circle at 88% 10%,rgba(251,146,60,.2),transparent 25%),linear-gradient(135deg,#0f172a,#1c1917); box-shadow:0 26px 70px rgba(0,0,0,.38); } @media(max-width:760px){.origin-head,.section-heading-row{grid-template-columns:1fr;gap:.65rem}.origin-story{grid-template-columns:1fr;margin:2.5rem 0 3.5rem}.origin-milestones{grid-template-columns:1fr;margin-left:0}.origin-milestones article,.origin-milestones article:last-child{min-height:0;border-left:0;border-right:0}.origin-milestones h3{margin:1rem 0 .45rem}.competency-rail{grid-template-columns:1fr;gap:2rem;margin:4rem 0 0}.feature-shell>.chapter-subtitle{margin-left:0}.contact-wrapper{border-radius:22px}.contact-wrapper .contact-layout{gap:2.2rem}}
</style>
