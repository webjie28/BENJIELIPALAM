<template>
  <div class="portfolio-app">
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
          <a v-if="isAdmin" href="#routines" @click="closeMobileMenu">Routines</a>
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
      </section>

      <main class="portfolio-main">
        
        <!-- SECTION 1: THE ORIGIN -->
        <section id="origin" class="chapter-section scroll-section reveal-on-scroll">
          <div class="intro-card glass-card">
            <h2 class="chapter-header">The Origin</h2>
            <div class="story-layout">
              <div class="story-text">
                <p class="lead-text">Where Design Meets Code</p>
                <p>
                  My journey started with a deep interest in technology, aesthetics, and user interfaces. 
                  As a Computer Science enthusiast, I quickly realized that writing backend logic is only half the picture—the real magic happens when users interact with a beautifully crafted, intuitive front-end.
                </p>

                <p>
                  By combining software engineering with clean web design principles, I focus on creating 
                  web applications that are fast, accessible, and visually timeless.
                </p>
              </div>
              
              <!-- Timeline/Journey Steps -->
              <div class="journey-timeline">
                <div class="timeline-step reveal-on-scroll">
                  <div class="step-marker"></div>
                  <div class="step-content">
                    <h5>The CS Foundation</h5>
                    <p>Studying algorithms, systems structures, and software engineering to build a solid programming background.</p>
                  </div>
                </div>
                <div class="timeline-step reveal-on-scroll">
                  <div class="step-marker"></div>
                  <div class="step-content">
                    <h5>The Design Spark</h5>
                    <p>Exploring UI/UX principles, typography, grid layouts, and color harmony to design elegant interfaces.</p>
                  </div>
                </div>
                <div class="timeline-step reveal-on-scroll">
                  <div class="step-marker"></div>
                  <div class="step-content">
                    <h5>The Synergy</h5>
                    <p>Unifying frontend engineering with clean design to build responsive web applications that deliver great user experiences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Toolkit -->
          <div class="skills-highlight glass-card reveal-on-scroll">
            <h3 class="section-title">Core Competencies</h3>
            <div class="skills-grid">
              <div class="skill-category reveal-on-scroll">
                <div class="skill-icon-title">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <h4>Computer Science &amp; Dev</h4>
                </div>
                <p>Developing reactive, state-driven frontends using Vue 3, modern JavaScript (ES6+), semantic HTML, responsive CSS layouts (Grid/Flexbox), and modular engineering principles.</p>
              </div>
              <div class="skill-category reveal-on-scroll">
                <div class="skill-icon-title">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="9" y1="9" x2="21" y2="9"></line>
                  </svg>
                  <h4>UI/UX &amp; Web Design</h4>
                </div>
                <p>Crafting intuitive layout structures, selecting balanced typography, implementing clean color palettes, and creating polished visual elements to build highly engaging user interfaces.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2: THE CREATIONS -->
        <section id="creations" class="chapter-section scroll-section reveal-on-scroll">
          <div class="glass-card">
            <h2 class="chapter-header">Selected Works</h2>
            <p class="chapter-subtitle">Live repository data fetched directly from GitHub, enriched with custom operational contexts.</p>
            
            <div class="project-grid">
              <div class="project-card reveal-on-scroll" v-for="project in projects" :key="project.id">
                <div class="project-header">
                  <span class="project-badge">{{ project.customSubtitle }}</span>
                </div>
                <h3 class="project-title">{{ project.customTitle }}</h3>
                <p class="project-desc">{{ project.customDescription }}</p>
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <div class="project-footer">
                  <a :href="project.displayLink" target="_blank" class="view-btn">
                    <span>Visit Live App</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 2.5: n8n AUTOMATIONS -->
        <section id="automations" class="chapter-section scroll-section reveal-on-scroll">
          <div class="glass-card">
            <h2 class="chapter-header">n8n Automations</h2>
            <p class="chapter-subtitle">Automated workflows built with n8n to streamline processes and integrate APIs seamlessly.</p>
            
            <div class="project-grid">
              <div class="project-card reveal-on-scroll" v-for="project in n8nProjects" :key="project.id">
                <div class="project-header">
                  <span class="project-badge">{{ project.customSubtitle }}</span>
                </div>
                <h3 class="project-title">{{ project.customTitle }}</h3>
                <p class="project-desc">{{ project.customDescription }}</p>
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <div class="project-footer">
                  <a :href="project.displayLink" target="_blank" class="view-btn">
                    <span>View Repository</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- SECTION 3: CASE STUDY (STICKY SCROLLYTELLING) -->
        <section id="thesis" class="chapter-section scroll-section reveal-on-scroll">
          <div class="glass-card scrollytelling-wrapper">
            <h2 class="chapter-header">Case Study: Thesis DSS</h2>
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
        <section v-if="isAdmin" id="routines" class="chapter-section scroll-section reveal-on-scroll">
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
          <div class="glass-card contact-wrapper">
            <h2 class="chapter-header">Get In Touch</h2>
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

                <a href="https://github.com/webjie28" target="_blank" class="social-btn large">
                  Connect on GitHub
                </a>
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
            <a href="/Benjie_Lipalam_CV.pdf" download="Benjie_Lipalam_CV.pdf" class="cv-action-btn download-btn" title="Download CV as PDF">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download PDF</span>
            </a>
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


</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
      badgeText: '#c2410c'
    },
    teal: {
      primary: '#0d9488', // Teal
      secondary: '#0284c7', // Sky Blue
      glow: 'rgba(13, 148, 136, 0.08)',
      badge: 'rgba(13, 148, 136, 0.06)',
      badgeText: '#0f766e'
    },
    blue: {
      primary: '#2563eb', // Blue
      secondary: '#6366f1', // Indigo
      glow: 'rgba(37, 99, 235, 0.10)',
      badge: 'rgba(37, 99, 235, 0.08)',
      badgeText: '#1d4ed8'
    }
  };
  const theme = roots[themeName];
  document.documentElement.style.setProperty('--accent-purple', theme.primary);
  document.documentElement.style.setProperty('--accent-blue', theme.secondary);
  document.documentElement.style.setProperty('--accent-glow', theme.glow);
  document.documentElement.style.setProperty('--badge-bg', theme.badge);
  document.documentElement.style.setProperty('--badge-text', theme.badgeText);
};

// Projects State & Github Fetching
const projects = ref([]);
const n8nProjects = ref([]);
const customRepoDetails = {
  'my-soroban.studio': {
    title: 'my-soroban.studio',
    subtitle: 'Blockchain & Smart Contracts',
    description: 'A blockchain-based project built using the Rust programming language and the Soroban smart contract platform.',
    tags: ['Rust', 'Blockchain', 'Smart Contracts', 'Soroban']
  },
  'n8n-auto-clock-in-out': {
    title: 'Auto Clock-In/Out',
    subtitle: 'n8n Workflow Automation',
    description: 'Automated work clock-in and clock-out system using n8n, Railway, and Gmail API.',
    tags: ['n8n', 'Automation', 'JavaScript', 'Railway', 'Gmail API']
  },
  'AI-recruitment-agent-n8n': {
    title: 'AI Recruitment Agent',
    subtitle: 'n8n Workflow Automation',
    description: 'An automated AI-driven recruitment agent workflow designed using n8n for intelligent candidate processing.',
    tags: ['n8n', 'AI', 'Automation', 'HTML']
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
    tags: ['Vue.js', 'Web App Development', 'State Management', 'UI/UX Design', 'Data Visualization']
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

    const n8nRepoNames = [
      'n8n-auto-clock-in-out',
      'AI-recruitment-agent-n8n'
    ];

    const promises = repoNames.map(name => 
      fetch(`https://api.github.com/repos/webjie28/${name}`)
        .then(res => res.json())
        .then(data => ({ ...data, _repoName: name })) // Keep track of the original requested name for fallbacks
    );
    
    const n8nPromises = n8nRepoNames.map(name => 
      fetch(`https://api.github.com/repos/webjie28/${name}`)
        .then(res => res.json())
        .then(data => ({ ...data, _repoName: name }))
    );
    
    const [fetchedProjects, fetchedN8nProjects] = await Promise.all([
      Promise.all(promises),
      Promise.all(n8nPromises)
    ]);
    
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
    n8nProjects.value = fetchedN8nProjects.map(mapProjectData);

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
  color: #ffc82c; /* Pinia Yellow */
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
  background: #ffc82c;
  color: #1b1b1f !important;
  border: none;
  box-shadow: 0 4px 15px rgba(255, 200, 44, 0.3);
}

.pinia-primary-btn:hover {
  background: #ffd553;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(255, 200, 44, 0.4);
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
  background: radial-gradient(circle, #ffc82c, transparent 70%);
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
  background: radial-gradient(circle, #42b883, transparent 70%);
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
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

@media (max-width: 768px) {
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
  --bg-primary: #050505;
  --bg-secondary: #0a0a0a;
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
              0 0 100px rgba(230, 255, 0, 0.45), 
              0 0 250px rgba(0, 255, 120, 0.3),
              0 0 450px rgba(0, 255, 120, 0.15);
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
</style>