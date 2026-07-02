/**
 * ============================================================================
 * REENI - COMING SOON COUNTDOWN & SUBSCRIPTION ENGINE
 * ============================================================================
 * Vanilla JavaScript implementation for high-fidelity countdown performance
 * and sandbox-compliant newsletter feedback controls.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. HIGH-PERFORMANCE COUNTDOWN TIMER ENGINE
     ========================================================================== */
  const initCountdownTimer = () => {
    // Dynamic countdown target: 54 days into the future to ensure the theme
    // always displays an active, beautiful live countdown for any prospective buyer.
    const targetOffset = 54 * 24 * 60 * 60 * 1000; // 54 days in ms
    
    // Check if we have a persisted target launch date to keep countdown consistent
    let launchTime = localStorage.getItem('reeni_launch_time');
    if (!launchTime) {
      launchTime = Date.now() + targetOffset;
      localStorage.setItem('reeni_launch_time', launchTime);
    } else {
      // If the stored launch time is in the past, reset it forward to keep it alive
      if (parseInt(launchTime, 10) < Date.now()) {
        launchTime = Date.now() + targetOffset;
        localStorage.setItem('reeni_launch_time', launchTime);
      }
    }

    const targetDate = new Date(parseInt(launchTime, 10)).getTime();

    // DOM Elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const updateTimer = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance < 0) {
        // Fallback reset to keep the ThemeForest demo active
        const newTarget = Date.now() + targetOffset;
        localStorage.setItem('reeni_launch_time', newTarget);
        return;
      }

      // Calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Formatting with leading zeroes
      const formatNum = (num) => num < 10 ? `0${num}` : num;

      // Update values in DOM with optional subtle state transitions
      const updateValueWithAnim = (el, valStr) => {
        if (el.textContent !== valStr) {
          el.textContent = valStr;
          
          // Micro-interaction: subtle digit bounce transition
          el.style.transform = 'scale(1.05)';
          setTimeout(() => {
            el.style.transform = 'scale(1)';
          }, 150);
        }
      };

      updateValueWithAnim(daysEl, formatNum(days));
      updateValueWithAnim(hoursEl, formatNum(hours));
      updateValueWithAnim(minutesEl, formatNum(minutes));
      updateValueWithAnim(secondsEl, formatNum(seconds));
    };

    // Initial update and subsequent 1-second interval execution
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
  };

  /* ==========================================================================
     02. NEWSLETTER SUBSCRIPTION CONTROLLER
     ========================================================================== */
  const initNewsletterSubscription = () => {
    const form = document.getElementById('coming-soon-notify-form');
    const feedbackContainer = document.getElementById('subscription-feedback');

    if (!form || !feedbackContainer) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Retrieve inputs safely
      const nameInput = document.getElementById('subscriber-name');
      const emailInput = document.getElementById('subscriber-email');

      if (!nameInput || !emailInput) return;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      if (!name || !email) return;

      // Simulate a premium database write API call
      form.style.opacity = '0.5';
      form.style.pointerEvents = 'none';

      setTimeout(() => {
        // Inject a beautiful glassmorphic confirmation alert
        feedbackContainer.innerHTML = `
          <div class="alert-reeni-success" role="alert">
            <i class="bi bi-patch-check-fill fs-4 text-success"></i>
            <div>
              <span class="d-block fw-bold text-main">System Registered Successfully!</span>
              <span class="small text-muted">A modular launch beacon has been sent to <strong>${email}</strong>. Welcome, <strong>${name}</strong>!</span>
            </div>
          </div>
        `;

        // Clear form fields
        nameInput.value = '';
        emailInput.value = '';

        // Reset form interactive states
        form.style.opacity = '1';
        form.style.pointerEvents = 'all';

        // Auto-scroll to feedback message smoothly
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    });
  };

  // Launch execution
  initCountdownTimer();
  initNewsletterSubscription();
});
