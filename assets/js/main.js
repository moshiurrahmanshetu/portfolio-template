/**
 * ============================================================================
 * REENI - PERSONAL PORTFOLIO HTML TEMPLATE FOUNDATION (v1.0)
 * ============================================================================
 * Vanilla JavaScript Core Engine (No Libraries / No jQuery)
 * Handles Micro-Interactions, Magnetic Physics, Theme Switcher & Scroll Reveal
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. THEME SWITCHER (CINEMATIC DARK & ELEGANT LIGHT)
     ========================================================================== */
  const initThemeEngine = () => {
    const savedTheme = localStorage.getItem('reeni_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeBtns = document.querySelectorAll('.theme-switch-btn');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('reeni_theme', nextTheme);
      });
    });
  };

  /* ==========================================================================
     02. PREMIUM PRELOADER
     ========================================================================== */
  const initPreloader = () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.preloader-bar');
    const progressText = document.querySelector('.preloader-percentage');

    if (!preloader) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 10;
      if (progress > 100) progress = 100;

      if (progressBar) progressBar.style.width = `${progress}%`;
      if (progressText) progressText.textContent = `${progress}%`;

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('is-loaded');
          document.body.classList.remove('overflow-hidden');
          triggerInitialReveal();
        }, 300);
      }
    }, 80);
  };

  /* ==========================================================================
     03. CUSTOM CURSOR & MAGNETIC PHYSICS
     ========================================================================== */
  const initCustomCursor = () => {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (!cursorDot || !cursorOutline || window.innerWidth < 992) return;

    document.body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const renderCursor = () => {
      // Lerp smoothing
      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Hover Scaling Trigger
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .card-reeni, .magnetic-wrap, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    window.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
  };

  /* Magnetic Buttons Physics */
  const initMagneticPhysics = () => {
    if (window.innerWidth < 992) return;

    const magneticItems = document.querySelectorAll('.magnetic-wrap');
    magneticItems.forEach(wrap => {
      const target = wrap.firstElementChild;
      if (!target) return;

      wrap.addEventListener('mousemove', e => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        target.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
      });

      wrap.addEventListener('mouseleave', () => {
        target.style.transform = 'translate(0px, 0px)';
      });
    });
  };

  /* ==========================================================================
     04. STICKY NAVBAR & READING PROGRESS BAR
     ========================================================================== */
  const initNavbarAndProgress = () => {
    const navbar = document.querySelector('.navbar-reeni');
    const readingBar = document.getElementById('reading-progress');
    const backToTop = document.getElementById('back-to-top');
    const progressCircle = document.querySelector('.progress-ring__circle');

    const circumference = progressCircle ? 157 : 0; // 2 * pi * r (r ~ 25)

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      // Sticky Navbar
      if (navbar) {
        if (scrollY > 50) {
          navbar.classList.add('is-sticky');
        } else {
          navbar.classList.remove('is-sticky');
        }
      }

      // Reading Progress
      if (readingBar) {
        readingBar.style.width = `${scrollPercent}%`;
      }

      // Back to Top Indicator
      if (backToTop && progressCircle) {
        if (scrollY > 400) {
          backToTop.classList.add('is-visible');
        } else {
          backToTop.classList.remove('is-visible');
        }

        const offset = circumference - (scrollPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
      }
    });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  /* ==========================================================================
     05. RIPPLE CLICK & BUTTON SHINE EFFECTS
     ========================================================================== */
  const initRippleEffect = () => {
    const rippleBtns = document.querySelectorAll('.btn-reeni, .pagination-reeni a');
    rippleBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const wave = document.createElement('span');
        wave.classList.add('ripple-wave');
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        wave.style.width = wave.style.height = `${Math.max(rect.width, rect.height)}px`;
        wave.style.transform = 'translate(-50%, -50%) scale(0)';

        this.appendChild(wave);

        setTimeout(() => {
          wave.remove();
        }, 600);
      });
    });
  };

  /* ==========================================================================
     06. 3D HOVER TILT & AMBIENT PARALLAX GLOW
     ========================================================================== */
  const init3DTiltAndParallax = () => {
    if (window.innerWidth < 992) return;

    const tiltCards = document.querySelectorAll('.hover-tilt');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });

    // Ambient mouse glow movement
    const glow1 = document.querySelector('.blur-glow-1');
    const glow2 = document.querySelector('.blur-glow-2');

    if (glow1 && glow2) {
      window.addEventListener('mousemove', e => {
        const xPercent = (e.clientX / window.innerWidth) - 0.5;
        const yPercent = (e.clientY / window.innerHeight) - 0.5;

        glow1.style.transform = `translate(${xPercent * 60}px, ${yPercent * 60}px)`;
        glow2.style.transform = `translate(${xPercent * -80}px, ${yPercent * -80}px)`;
      });
    }
  };

  /* ==========================================================================
     07. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const triggerInitialReveal = () => {
    const heroElements = document.querySelectorAll('.hero-reveal');
    heroElements.forEach((el, index) => {
      setTimeout(() => el.classList.add('revealed'), index * 150);
    });
  };

  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  };

  /* ==========================================================================
     08. NAVIGATION ACTIVE STATE HIGHLIGHT
     ========================================================================== */
  const highlightActiveNavigation = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link-reeni, .mobile-nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  /* ==========================================================================
     09. INITIALIZE CORE ENGINE
     ========================================================================== */
  initThemeEngine();
  initPreloader();
  initCustomCursor();
  initMagneticPhysics();
  initNavbarAndProgress();
  initRippleEffect();
  init3DTiltAndParallax();
  initScrollReveal();
  highlightActiveNavigation();

  /* ==========================================================================
     10. PHASE 02: TYPING ANIMATION ENGINE
     ========================================================================== */
  const initTypingEngine = () => {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = [
      "Senior Full-Stack Architect",
      "UI/UX Product Designer",
      "ThemeForest Elite Creator",
      "SaaS Design System Expert"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before typing next phrase
      }

      setTimeout(typeLoop, typeSpeed);
    };

    setTimeout(typeLoop, 1200);
  };

  /* ==========================================================================
     11. PHASE 02: SKILLS SECTION PROGRESS BAR & PERCENTAGE ENGINE
     ========================================================================== */
  const initSkillsEngine = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length || !('IntersectionObserver' in window)) return;

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const fill = card.querySelector('.skill-progress-fill');
          const percentText = card.querySelector('.skill-percentage');
          const targetPercent = parseInt(card.getAttribute('data-skill-percent') || '0', 10);

          if (fill) {
            fill.style.width = `${targetPercent}%`;
          }

          if (percentText && !card.classList.contains('animated')) {
            card.classList.add('animated');
            const duration = 1800;
            const startTime = performance.now();

            const countUp = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(ease * targetPercent);
              
              percentText.textContent = `${currentVal}%`;

              if (progress < 1) {
                requestAnimationFrame(countUp);
              } else {
                percentText.textContent = `${targetPercent}%`;
              }
            };
            requestAnimationFrame(countUp);
          }

          skillObserver.unobserve(card);
        }
      });
    }, { threshold: 0.25 });

    skillCards.forEach(card => skillObserver.observe(card));
  };

  /* ==========================================================================
     12. PHASE 02: STATISTICS COUNTERS ENGINE
     ========================================================================== */
  const initStatsCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length || !('IntersectionObserver' in window)) return;

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetVal = parseInt(el.getAttribute('data-stat-count') || '0', 10);
          const suffix = el.getAttribute('data-stat-suffix') || '';
          
          if (!el.classList.contains('counted')) {
            el.classList.add('counted');
            const duration = 2000;
            const startTime = performance.now();

            const animateCount = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 4);
              const currentNum = Math.floor(ease * targetVal);

              el.textContent = `${currentNum}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                el.textContent = `${targetVal}${suffix}`;
              }
            };
            requestAnimationFrame(animateCount);
          }

          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    statNumbers.forEach(num => statObserver.observe(num));
  };

  /* ==========================================================================
     13. PHASE 02: AOS (ANIMATE ON SCROLL) INITIALIZATION
     ========================================================================== */
  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: true,
        offset: 40
      });
    }
  };

  initTypingEngine();
  initSkillsEngine();
  initStatsCounters();
  initAOS();

});
