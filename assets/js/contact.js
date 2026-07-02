/**
 * ============================================================================
 * REENI - CONTACT PAGE INTERACTIVE ENGINE (v1.0)
 * ============================================================================
 * Handles page-specific contact interactions:
 * - Selectable Service Chip Group System (syncs to hidden inputs)
 * - Premium Budget Range Slider text mapping
 * - Contact Form Validation, loading spinner and submit feedback
 * - Floating Labels visual stabilization
 * - Toast notification generation
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. SERVICE CHIP SELECTION SYSTEM
     ========================================================================== */
  const initServiceChips = () => {
    const chipBtns = document.querySelectorAll('.service-chip-btn');
    const hiddenInput = document.getElementById('contact-service');

    if (chipBtns.length === 0 || !hiddenInput) return;

    chipBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Toggle Active State
        const isAlreadyActive = btn.classList.contains('active');

        // Reset all other chips
        chipBtns.forEach(b => b.classList.remove('active'));

        if (!isAlreadyActive) {
          btn.classList.add('active');
          const value = btn.getAttribute('data-value');
          hiddenInput.value = value;
        } else {
          hiddenInput.value = ''; // Cleared selection
        }

        // Trigger manual validation check
        const form = document.getElementById('contact-form-target');
        if (form && form.classList.contains('was-validated')) {
          validateServiceInput();
        }
      });
    });
  };

  const validateServiceInput = () => {
    const hiddenInput = document.getElementById('contact-service');
    const chipGroup = document.querySelector('.service-chip-group');
    const feedback = document.getElementById('service-validation-feedback');

    if (!hiddenInput || !chipGroup || !feedback) return true;

    if (!hiddenInput.value) {
      chipGroup.style.borderColor = '#dc3545';
      feedback.style.display = 'block';
      return false;
    } else {
      chipGroup.style.borderColor = '';
      feedback.style.display = 'none';
      return true;
    }
  };

  /* ==========================================================================
     02. BUDGET SLIDER VALUE MAPPING
     ========================================================================== */
  const initBudgetSlider = () => {
    const slider = document.getElementById('budget-slider');
    const output = document.getElementById('budget-value-display');

    if (!slider || !output) return;

    const ranges = {
      1: '$1,000 - $3,000 USD',
      2: '$3,000 - $5,000 USD',
      3: '$5,000 - $10,000 USD',
      4: '$10,000 - $25,000 USD',
      5: '$25,000 - $50,000 USD',
      6: '$50,000+ USD'
    };

    const updateDisplay = () => {
      const val = slider.value;
      output.textContent = ranges[val] || '$5,000 - $10,000 USD';
    };

    slider.addEventListener('input', updateDisplay);
    updateDisplay(); // Run initially
  };

  /* ==========================================================================
     03. CONTACT FORM SUBMIT ACTION & TOAST FEEDBACK
     ========================================================================== */
  const initContactForm = () => {
    const form = document.getElementById('contact-form-target');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isServiceValid = validateServiceInput();
      const isFormValid = form.checkValidity();

      if (!isFormValid || !isServiceValid) {
        form.classList.add('was-validated');
        // Scroll to the first invalid field
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Message...`;

      // Simulate sending logic
      setTimeout(() => {
        // Success Toast Notification Popup
        showContactToast('Your project inquiry has been securely transmitted. Reeni will respond to your request within 12 hours.');

        // Reset the active service chips and input
        const chipBtns = document.querySelectorAll('.service-chip-btn');
        chipBtns.forEach(b => b.classList.remove('active'));
        const hiddenInput = document.getElementById('contact-service');
        if (hiddenInput) hiddenInput.value = '';

        // Reset Form
        form.reset();
        form.classList.remove('was-validated');

        // Reset budget display
        const budgetSlider = document.getElementById('budget-slider');
        if (budgetSlider) {
          budgetSlider.value = 3;
          const output = document.getElementById('budget-value-display');
          if (output) output.textContent = '$5,000 - $10,000 USD';
        }

        // Re-enable and reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }, 1800);
    });
  };

  /* ==========================================================================
     04. UTILITY TOAST ALERTS CREATOR
     ========================================================================== */
  const showContactToast = (message) => {
    const toastWrap = document.createElement('div');
    toastWrap.style.position = 'fixed';
    toastWrap.style.bottom = '2rem';
    toastWrap.style.right = '2rem';
    toastWrap.style.zIndex = '99999';
    toastWrap.style.maxWidth = '380px';

    toastWrap.innerHTML = `
      <div class="toast show border-0 rounded-3 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: var(--surface-card); border-left: 4px solid var(--accent) !important;">
        <div class="toast-header border-bottom border-secondary border-opacity-10 d-flex justify-content-between align-items-center" style="background-color: var(--surface-card); color: var(--text-main);">
          <strong class="me-auto font-heading text-uppercase text-accent" style="font-size: 0.8rem; letter-spacing: 1px;"><i class="bi bi-patch-check-fill me-1"></i> Inquiry Received</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" style="filter: var(--theme-close-filter, invert(1));"></button>
        </div>
        <div class="toast-body text-muted" style="font-size: 0.9rem; line-height: 1.6; padding: 1.25rem;">
          ${message}
        </div>
      </div>
    `;

    document.body.appendChild(toastWrap);

    // Auto-remove toast after 6 seconds
    setTimeout(() => {
      toastWrap.classList.add('fade');
      setTimeout(() => {
        toastWrap.remove();
      }, 500);
    }, 6000);

    // Manual close button listener
    const closeBtn = toastWrap.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toastWrap.remove();
      });
    }
  };

  // Run Initializations
  initServiceChips();
  initBudgetSlider();
  initContactForm();
});
