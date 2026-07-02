# Reeni - Premium Personal Portfolio & Agency HTML5 Template

Reeni is a commercial-grade, ultra-premium personal portfolio, resume, and agency landing HTML5 template. Crafted with luxury typography, smooth micro-interactions, dark/light ambient lighting, and high-fidelity custom vanilla JavaScript physics, Reeni is designed for creative developers, designers, architects, and SaaS agencies looking to display their expertise with cinematic style.

---

## 📂 Table of Contents
1. [Template Overview](#-template-overview)
2. [Folder Structure](#-folder-structure)
3. [Key Features](#-key-features)
4. [Customization Guide](#-customization-guide)
5. [Browser Support](#-browser-support)
6. [Credits & Sources](#-credits--sources)

---

## 🌟 Template Overview
Reeni is designed to break away from the traditional, rigid, grid-locked structures of web templates. Utilizing highly customized Bootstrap 5 grid variables, subtle glassmorphic elements, and lightweight vanilla script enhancements, it delivers an editorial, high-contrast, premium experience in both light and dark cinematic presentation modes.

---

## 📁 Folder Structure
The template codebase is organized cleanly to support developers who wish to extend, compile, or customize the template layout:

```text
├── assets/
│   ├── css/
│   │   └── style.css            # Custom Core Design System & Styling Suite
│   ├── js/
│   │   ├── main.js              # Core UI Interactions & Theme Engines
│   │   ├── blog-details.js      # Blog-specific script extensions
│   │   ├── coming-soon.js       # Launch countdown & registration scripts
│   │   ├── contact.js           # Form routing & verification alerts
│   │   ├── faq.js               # Interactive dynamic accordion behaviors
│   │   ├── pricing.js           # Dynamic billing interval selectors
│   │   └── service-details.js   # Service gallery tabs & features
│   ├── fonts/                   # Local Typography Cache
│   └── images/                  # Mock Assets & UI Visual Icons
├── documentation/
│   └── documentation.html       # Rich documentation file explaining customizations
├── index.html                   # Homepage foundation
├── about.html                   # About Me page
├── services.html                # Services & Specialties page
├── service-details.html         # Custom Service Detail case study
├── resume.html                  # Experience timeline & Interactive CV
├── portfolio.html               # Grid filters & showcase portfolio
├── portfolio-details.html       # Individual Portfolio details
├── pricing.html                 # Dynamic packaging plans
├── blog.html                    # Editorial articles journal
├── blog-details.html            # Article detail view
├── faq.html                     # Responsive help center
├── coming-soon.html             # High-performance Launch countdown screen
├── contact.html                 # Interactive secure studio inquiry
├── privacy-policy.html          # Policy document with sidebar scrollspy
├── terms-condition.html         # Terms document with sidebar scrollspy
├── 404.html                     # Cinematic Error page
├── package.json                 # Dependency manifests
└── README.md                    # This master overview file
```

---

## 🚀 Key Features
*   **W3C Valid Codebase:** Clean, valid semantic HTML5 and CSS3.
*   **No jQuery Dependency:** Built 100% on high-performance vanilla JS for rapid loading and smooth frame times.
*   **Dual UI Modes (Cinematic Dark & Elegant Light):** State persistence via `localStorage` ensures chosen preferences are remembered.
*   **Custom Cursor & Magnetic Physics:** Micro-interactions that respond to mouse velocity and wrap clickable nodes with fluid magnetic attraction.
*   **Interactive Scrolling Elements:** Smooth custom reading progress bars, dynamic scroll-reveal animations (AOS), and circular scroll progress indicators.
*   **Responsive Architecture:** Crafted using responsive breakpoints tailored elegantly for Ultra-wide desktops, standard laptops, tablets, and smartphones.
*   **Table of Contents Scrollspy:** High-contrast sidebar index navigation matching current reading progress seamlessly on long-form legal documents.

---

## 🛠️ Customization Guide

### 1. Theme Selection Mode
Reeni sets the dark visual mode by default via the `data-theme="dark"` attribute on the `<html>` root.
To change the fallback theme default, modify:
```html
<html lang="en" data-theme="light">
```

### 2. Custom Color Palette Adjustments
All primary palette parameters are maintained within CSS custom variables inside `/assets/css/style.css`. Adjusting these values propagates across the design layout instantly:
```css
:root {
  --accent: #d4af37;           /* Premium Accent Gold */
  --accent-rgb: 212, 175, 55;
  --bg-dark: #0f1012;          /* Twilight Background */
  --surface-card: #18191c;     /* Component Containers */
}
```

### 3. Countdown Configuration (Coming Soon Page)
The launch timer initializes target times inside `/assets/js/coming-soon.js`. It utilizes client-side storage persistence. Change the active duration offset to align with your personal deployment dates.

---

## 🌐 Browser Support
Reeni undergoes rigorous cross-browser testing to guarantee uniform performance:
*   Apple Safari (v15+)
*   Google Chrome (v100+)
*   Mozilla Firefox (v98+)
*   Microsoft Edge (v100+)
*   Opera & mobile WebKit viewports

---

## ✍️ Credits & Sources
*   **Grid System:** [Bootstrap v5.3](https://getbootstrap.com/)
*   **Icon Fonts:** [Bootstrap Icons](https://icons.getbootstrap.com/)
*   **Scroll Animations:** [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
*   **Google Fonts:** [Inter](https://fonts.google.com/specimen/Inter) and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
