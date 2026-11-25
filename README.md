# Wemonde Enterprise Landing Page

A complete, production-grade, framework-free landing page architected for **Wemonde Private Limited** (Enterprise Digital Engineering & AI Transformation).

Designed and engineered with strict adherence to modern web standards, mobile-first responsiveness (360px to 32,000px), WCAG 2.2 AA accessibility, and zero external dependencies.

---

## 1. Technical Stack & Philosophy

- **HTML5**: Semantic, accessible markup using native landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), ARIA attributes, and Schema.org JSON-LD structured data.
- **CSS3**: Custom design token architecture in `:root`, fluid typography and spacing via `clamp()`, modern CSS Flexbox and Grid, glassmorphism filters, GPU-accelerated transforms, and media queries.
- **Vanilla JavaScript (ES6+)**: Modular, performant controller running strictly in `'use strict'` mode. Uses `IntersectionObserver`, `requestAnimationFrame`, and passive event listeners.
- **SVG Vector Assets**: 100% vector graphics and custom scalable illustrations for pixel-perfect clarity on standard, Retina, 4K, 8K, and ultra-wide displays.
- **Zero Third-Party Libraries**: Strictly zero Bootstrap, Tailwind, React, Next, Vue, Angular, jQuery, GSAP, or Framer Motion. Pure vanilla code throughout.

---

## 2. Project File Structure

```
landing-page/
├── index.html                   # Semantic HTML5 document & Schema.org JSON-LD
├── assets/
│   ├── css/
│   │   ├── style.css            # Design tokens, base reset, component & section styles
│   │   └── responsive.css       # Mobile-first breakpoints, ultra-wide rules, print & reduced motion
│   ├── js/
│   │   └── main.js              # Vanilla ES6+ controller (scroll spy, counters, accordion, form, slider)
│   ├── images/
│   │   ├── hero-dashboard.svg   # High-fidelity enterprise operations control center illustration
│   │   ├── architecture-diagram.svg # 4-layer enterprise architecture stack visual
│   │   ├── case-pvr.svg         # PVR INOX high-concurrency ticketing engine visual
│   │   ├── case-apollo.svg      # Apollo Diagnostics clinical lab telemetry workflow
│   │   ├── case-cloud.svg       # Multi-cloud Kubernetes & FinOps architecture visual
│   │   ├── brand-pvr.svg        # PVR INOX partner logo
│   │   ├── brand-apollo.svg     # Apollo Diagnostics partner logo
│   │   ├── brand-maxlab.svg     # Max Lab partner logo
│   │   ├── brand-aws.svg        # AWS Partner network logo
│   │   ├── brand-gcp.svg        # Google Cloud logo
│   │   └── brand-azure.svg      # Microsoft Azure logo
│   ├── icons/
│   │   ├── logo.svg             # Wemonde corporate monogram & typography logo
│   │   ├── code.svg, ai.svg, cloud.svg, chart.svg, phone.svg, shield.svg...
│   └── fonts/                   # High-performance system-font fallback stack
└── README.md                    # Engineering documentation & testing guide
```

---

## 3. Responsive Breakpoint Matrix

The layout is engineered and tested to adapt seamlessly from **360px** up to **32,000px**:

| Viewport Width | Device Category | Layout Behavior |
|---|---|---|
| **360px – 480px** | Compact Mobile (iPhone SE, Galaxy S) | Single column, stacked CTAs, full-width touch targets (44px min), drawer navigation |
| **481px – 768px** | Standard Mobile & Phablets | 2-column stat grids, optimized touch carousels, responsive typography via `clamp()` |
| **769px – 1024px** | Tablets & Foldables (iPad, Galaxy Tab) | Asymmetric 2-column cards, drawer menu with tablet spacing, interactive service tabs |
| **1025px – 1440px** | Laptops & Desktops | Sticky glassmorphic header, 3-column service grid, 4-column timeline, full interactive dashboard |
| **1441px – 2560px** | High-Res 2K & 4K Displays | Expanded container (`max-width: 1600px`), high-DPI typography scaling |
| **2560px – 32000px** | Ultra-Wide, 8K & Multi-Monitors | Max-width containment prevents unbounded horizontal stretching; centered readable layouts |

---

## 4. Key Interactive Capabilities & Micro-Interactions

1. **Sticky Header & Scroll Progress**:
   - Fixed header activates a frosted-glass backdrop (`backdrop-filter: blur(14px)`) and subtle elevation when scrolling past 30px.
   - Dynamic 3px top progress bar indicating exact document reading progression.
2. **Accessible Mobile Navigation Drawer**:
   - Off-canvas drawer with smooth cubic-bezier transitions, backdrop blur, ESC key dismissal, body scroll-lock, and focus trapping.
3. **Animated Key Performance Metric Counters**:
   - Smooth numerical interpolation (`requestAnimationFrame` with `easeOutQuad`) triggered dynamically via `IntersectionObserver` when entering view.
4. **Interactive Service Categorization Tabs**:
   - Filterable view switching between disciplines (Software Engineering, AI & Automation, Cloud & DevOps, Cloud IVR).
5. **Interactive Executive Testimonial Slider**:
   - Multi-slide carousel supporting next/prev navigation, active dot indicators, pause-on-hover/focus, and touch swipe gestures.
6. **Accessible FAQ Accordion**:
   - Accordion utilizing dynamic `scrollHeight` animation with accessible `aria-expanded` and `aria-hidden` attributes.
7. **Interactive Consultation Request Form**:
   - Real-time client-side field validation, formatted email/phone checking, floating accessible error labels, simulated asynchronous transmission state, and confirmation modal.
8. **Scroll Reveal & Reduced Motion Compliance**:
   - Staggered entrance transitions triggered via `IntersectionObserver`. Full graceful degradation when `prefers-reduced-motion` is enabled or JavaScript is disabled.

---

## 5. Accessibility (WCAG 2.2 AA Compliance)

- **Color Contrast**: All text satisfies a minimum contrast ratio of 4.5:1 against dark backgrounds.
- **Keyboard Navigation**: Full focus ring styling (`:focus-visible`) on all interactive buttons, inputs, links, and accordion items.
- **Screen Reader Support**: Meaningful SVG titles and `role="img"` attributes, `aria-label`, `aria-expanded`, and `.sr-only` descriptions where needed.
- **Touch Target Sizes**: All interactive buttons and touch controls meet or exceed 44×44px.

---

## 6. How to Run Locally

You can open `landing-page/index.html` directly in any web browser, or serve it using any local HTTP server:

```bash
# Using Python 3:
python3 -m http.server 8080

# Or using Node.js npx:
npx serve landing-page
```

Navigate to `http://localhost:8080/landing-page/` in your browser.
# Verex
