# Benjie Lipalam - Developer Portfolio & Interactive CV

A premium, highly responsive developer portfolio and interactive Curriculum Vitae designed to showcase professional credentials, custom software projects, and case studies.

## 🚀 Key Features

* **Interactive CV Modal**:
  * Clean, print-friendly academic serif typesetting (`Georgia`/`Times New Roman`) with zero orange highlights.
  * Direct action buttons to **Download PDF** or **Print CV** directly using native browser services.
  * Explicitly styled to ignore page theme changes (safeguarding white paper background and black text on all light/dark mode views).
* **Thesis Case Study (Sticky Scrollytelling)**:
  * A dynamic, scroll-triggered side-by-side presentation of the thesis DSS platform: **"Sales Reports Analysis On Automotive Spare Parts Business Using Decision Support System"**.
  * Visual browser mockup tracking story scroll steps to cross-fade high-resolution dashboard screenshots.
  * Reduces viewport height footprint and optimizes spacing for a snappy, tight scroll experience.
* **Snappy Typewriter Intro**:
  * An infinite looping typewriter animation that types, blinks, and erases the author's name dynamically without needing a page reload.
* **Proactive Theme Controls**:
  * Full Light and Dark Mode system overrides utilizing custom SVG toggle buttons.

---

## 🛠️ Technology Stack

* **Core Framework**: Vue 3 (Composition API / Script Setup)
* **Build System & Bundler**: Vite
* **Styling**: Vanilla CSS with custom property systems (CSS variables)
* **Automation**: Puppeteer automation scripts for screenshot capture

---

## 💻 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 2. Installation
Clone the repository and install the project dependencies:
```bash
npm install
```

### 3. Local Development
Start the local development server:
```bash
npm run dev
```

### 4. Build for Production
Compile and minify the project for production:
```bash
npm run build
```
Vite will output the optimized static build assets inside the `/dist` directory, ready to be served.

---

