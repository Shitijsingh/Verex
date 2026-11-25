/**
 * WEMONDE ENTERPRISE LANDING PAGE - MAIN CONTROLLER
 * Vanilla ES6+ | High-Performance | Zero Dependencies | WCAG 2.2 Compliant
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     01. DOM READY & INITIALIZATION
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initStickyHeader();
    initMobileNav();
    initScrollSpy();
    initCounters();
    initServicesTabs();
    initTestimonialSlider();
    initFaqAccordion();
    initContactForm();
    initBackToTop();
    initScrollReveal();
  });

  /* ------------------------------------------------------------------------
     02. SCROLL PROGRESS INDICATOR
     ------------------------------------------------------------------------ */
  function initScrollProgressBar() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  /* ------------------------------------------------------------------------
     03. STICKY HEADER
     ------------------------------------------------------------------------ */
  function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 30) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ------------------------------------------------------------------------
     04. MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------------------ */
  function initMobileNav() {
    const toggleBtn = document.querySelector('.nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const closeBtn = drawer ? drawer.querySelector('.mobile-nav__close') : null;
    const navLinks = drawer
      ? drawer.querySelectorAll('.mobile-nav__link, .mobile-nav-drawer__footer a')
      : [];
    const outsideRegions = document.querySelectorAll('header, main, footer, .back-to-top');

    if (!toggleBtn || !drawer || !backdrop) return;

    drawer.inert = true;

    const openMenu = () => {
      drawer.inert = false;
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      outsideRegions.forEach((el) => {
        el.inert = true;
      });

      drawer.classList.add('open');
      backdrop.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-locked');

      // Focus close button first for immediate keyboard/screen-reader dismissal
      const firstFocusable = closeBtn || drawer.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    };

    const closeMenu = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      drawer.inert = true;
      drawer.removeAttribute('aria-modal');
      drawer.removeAttribute('role');
      outsideRegions.forEach((el) => {
        el.inert = false;
      });

      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-locked');
      toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    backdrop.addEventListener('click', closeMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     05. ACTIVE NAVIGATION SCROLLSPY
     ------------------------------------------------------------------------ */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
    if (!sections.length || !navLinks.length) return;

    const onScroll = () => {
      const scrollPos = window.scrollY + 160;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     06. ANIMATED STATISTICS COUNTERS
     ------------------------------------------------------------------------ */
  function initCounters() {
    const statElements = document.querySelectorAll('[data-counter]');
    if (!statElements.length) return;

    let hasCounted = false;

    const easeOutQuad = (t) => t * (2 - t);

    const animateValue = (el, start, end, duration, decimals = 0, suffix = '') => {
      let startTime = null;

      const step = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentVal = start + (end - start) * easedProgress;

        el.textContent = currentVal.toFixed(decimals) + suffix;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = end.toFixed(decimals) + suffix;
        }
      };

      window.requestAnimationFrame(step);
    };

    const startAllCounters = () => {
      if (hasCounted) return;
      hasCounted = true;

      statElements.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-counter'));
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = prefersReducedMotion ? 10 : 2000;

        animateValue(el, 0, target, duration, decimals, suffix);
      });
    };

    // IntersectionObserver to trigger counting when visible
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAllCounters();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );

      const statsSection = document.getElementById('statistics') || document.querySelector('.stats-bar');
      if (statsSection) {
        observer.observe(statsSection);
      } else {
        startAllCounters();
      }
    } else {
      startAllCounters();
    }
  }

  /* ------------------------------------------------------------------------
     07. SERVICES INTERACTIVE TABS
     ------------------------------------------------------------------------ */
  function initServicesTabs() {
    const tabButtons = document.querySelectorAll('.services-tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    if (!tabButtons.length || !serviceCards.length) return;

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        // Update active button state
        tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter / highlight cards
        serviceCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-service-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     08. TESTIMONIAL SLIDER WITH TOUCH / SWIPE
     ------------------------------------------------------------------------ */
  function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-btn--prev');
    const nextBtn = document.querySelector('.slider-btn--next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval = null;

    // Create dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const updateDots = () => {
      const dots = document.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoSlide();
      });
    }

    // Auto Advance
    const startAutoSlide = () => {
      if (prefersReducedMotion) return;
      autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 7000);
    };

    const resetAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      }
    };

    // Pause on hover
    const sliderWrapper = document.querySelector('.testimonials-slider');
    if (sliderWrapper) {
      sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      sliderWrapper.addEventListener('mouseleave', startAutoSlide);
      sliderWrapper.addEventListener('focusin', () => clearInterval(autoSlideInterval));
      sliderWrapper.addEventListener('focusout', startAutoSlide);
    }

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          goToSlide(currentIndex + 1); // Swiped left
        } else {
          goToSlide(currentIndex - 1); // Swiped right
        }
        resetAutoSlide();
      }
    };

    startAutoSlide();
  }

  /* ------------------------------------------------------------------------
     09. ACCESSIBLE FAQ ACCORDION
     ------------------------------------------------------------------------ */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question-btn');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items (exclusive accordion behavior)
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle clicked item
        if (isActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     10. CONSULTATION CONTACT FORM & VALIDATION
     ------------------------------------------------------------------------ */
  function initContactForm() {
    const form = document.getElementById('consultationForm');
    if (!form) return;

    const nameInput = form.querySelector('#fullName');
    const emailInput = form.querySelector('#workEmail');
    const phoneInput = form.querySelector('#phone');
    const serviceSelect = form.querySelector('#serviceRequired');
    const messageInput = form.querySelector('#projectDetails');
    const submitBtn = form.querySelector('#submitBtn');
    const formStatus = form.querySelector('#formStatus');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s+\-()]{7,20}$/;

    const setFieldError = (input, message) => {
      input.classList.add('error');
      input.setAttribute('aria-invalid', 'true');
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
    };

    const clearFieldError = (input) => {
      input.classList.remove('error');
      input.removeAttribute('aria-invalid');
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    };

    // Live validation on blur
    [nameInput, emailInput, phoneInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('blur', () => {
        validateField(input);
      });
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });

    const validateField = (input) => {
      if (!input.value.trim() && input.hasAttribute('required')) {
        setFieldError(input, 'This field is required.');
        return false;
      }

      if (input === emailInput && input.value.trim()) {
        if (!emailRegex.test(input.value.trim())) {
          setFieldError(input, 'Please enter a valid business email address.');
          return false;
        }
      }

      if (input === phoneInput && input.value.trim()) {
        if (!phoneRegex.test(input.value.trim())) {
          setFieldError(input, 'Please enter a valid contact phone number.');
          return false;
        }
      }

      clearFieldError(input);
      return true;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      if (!validateField(nameInput)) isValid = false;
      if (!validateField(emailInput)) isValid = false;
      if (phoneInput.value.trim() && !validateField(phoneInput)) isValid = false;

      if (!isValid) {
        // Focus first invalid element
        const firstError = form.querySelector('.form-control.error');
        if (firstError) firstError.focus();
        return;
      }

      // Simulate asynchronous enterprise form submission
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Transmitting Request...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>Inquiry Received Successfully!</strong>
            <p style="margin-top: 4px; font-size: 0.875rem;">A Wemonde Enterprise Solutions Architect will review your specifications and contact you within 2 business hours.</p>
          `;
          formStatus.style.display = 'block';
          formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 1400);
    });
  }

  /* ------------------------------------------------------------------------
     11. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    const handleScroll = () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  }

  /* ------------------------------------------------------------------------
     12. SCROLL REVEAL (INTERSECTION OBSERVER)
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    // Enable animated entrance only when JS & IntersectionObserver are operational
    document.body.classList.add('js-reveal');

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => {
      // Check if element is already in the initial viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        revealObserver.observe(el);
      }
    });
  }
})();
