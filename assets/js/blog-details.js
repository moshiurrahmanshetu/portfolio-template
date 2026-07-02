/**
 * ============================================================================
 * REENI - BLOG DETAILS ENGINE (v1.0)
 * ============================================================================
 * Handles page-specific premium blog interactions:
 * - Dynamic Reading Progress Indicator
 * - Code Block Clipboard Copier
 * - Interactive Comment Reply Auto-Anchor
 * - Comment Form Submitting Animation & Toast Alerts
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. DYNAMIC READING PROGRESS BAR
     ========================================================================== */
  const initReadingProgress = () => {
    const progressBar = document.getElementById('reading-progress');
    const article = document.querySelector('.blog-details-content');

    if (!progressBar || !article) return;

    window.addEventListener('scroll', () => {
      const rect = article.getBoundingClientRect();
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress percentage of the article
      let progress = 0;
      if (rect.top <= 0) {
        progress = Math.min((Math.abs(rect.top) / (articleHeight - windowHeight)) * 100, 100);
      }

      progressBar.style.width = `${progress}%`;
    });
  };

  /* ==========================================================================
     02. CODE BLOCK CLIPBOARD COPIER
     ========================================================================== */
  const initCodeCopier = () => {
    const copyButtons = document.querySelectorAll('.blog-code-copy-btn');

    if (copyButtons.length === 0) return;

    copyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const wrap = btn.closest('.blog-code-block-wrap');
        if (!wrap) return;

        const codeElement = wrap.querySelector('.blog-code-block');
        if (!codeElement) return;

        const codeText = codeElement.innerText;

        navigator.clipboard.writeText(codeText).then(() => {
          // Visual Success Feedback
          const icon = btn.querySelector('i');
          const text = btn.querySelector('.copy-text');

          const originalIconClass = icon.className;
          const originalText = text.textContent;

          icon.className = 'bi bi-check2 text-success';
          text.textContent = 'Copied!';
          text.classList.add('text-success');

          setTimeout(() => {
            icon.className = originalIconClass;
            text.textContent = originalText;
            text.classList.remove('text-success');
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      });
    });
  };

  /* ==========================================================================
     03. INTERACTIVE COMMENT REPLY AUTO-ANCHOR
     ========================================================================== */
  const initCommentReply = () => {
    const replyButtons = document.querySelectorAll('.comment-reply-btn');
    const commentForm = document.getElementById('comment-form-target');
    const messageField = document.getElementById('comment-message');

    if (replyButtons.length === 0 || !commentForm || !messageField) return;

    replyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        const commenter = btn.getAttribute('data-commenter');
        if (!commenter) return;

        // Populate message box with a nested reply mention
        messageField.value = `@${commenter} \n`;
        messageField.focus();

        // Smoothly scroll to the comment form
        commentForm.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Temporarily highlight the text area
        messageField.style.borderColor = 'var(--accent)';
        setTimeout(() => {
          messageField.style.borderColor = '';
        }, 1500);
      });
    });
  };

  /* ==========================================================================
     04. COMMENT FORM SUBMITTING ANIMATION & NOTIFICATION
     ========================================================================== */
  const initCommentForm = () => {
    const form = document.getElementById('comment-form-target');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation check
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...`;

      // Simulate network request delays
      setTimeout(() => {
        // Success notification popup
        showToastNotification('Your comment has been submitted successfully and is awaiting moderation.');

        // Reset form
        form.reset();
        form.classList.remove('was-validated');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }, 1500);
    });
  };

  /* ==========================================================================
     05. UTILITY TOAST NOTIFICATION GENERATOR
     ========================================================================== */
  const showToastNotification = (message) => {
    const toastWrap = document.createElement('div');
    toastWrap.style.position = 'fixed';
    toastWrap.style.bottom = '2rem';
    toastWrap.style.right = '2rem';
    toastWrap.style.zIndex = '99999';
    toastWrap.style.maxWidth = '360px';

    toastWrap.innerHTML = `
      <div class="toast show border-0 rounded-3 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" style="background-color: var(--surface-card); border-left: 4px solid var(--accent) !important;">
        <div class="toast-header border-bottom border-secondary border-opacity-10 d-flex justify-content-between align-items-center" style="background-color: var(--surface-card); color: var(--text-main);">
          <strong class="me-auto font-heading text-uppercase text-accent" style="font-size: 0.8rem; letter-spacing: 1px;"><i class="bi bi-patch-check-fill me-1"></i> Success</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" style="filter: var(--theme-close-filter, invert(1));"></button>
        </div>
        <div class="toast-body text-muted" style="font-size: 0.9rem; line-height: 1.6; padding: 1.25rem;">
          ${message}
        </div>
      </div>
    `;

    document.body.appendChild(toastWrap);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      toastWrap.classList.add('fade');
      setTimeout(() => {
        toastWrap.remove();
      }, 500);
    }, 5000);

    // Manual close button listener
    const closeBtn = toastWrap.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toastWrap.remove();
      });
    }
  };

  // Run initializations
  initReadingProgress();
  initCodeCopier();
  initCommentReply();
  initCommentForm();
});
