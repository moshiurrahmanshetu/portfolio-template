/**
 * ============================================================================
 * REENI - SERVICE DETAILS ENGINE (v1.0)
 * ============================================================================
 * Handles page-specific premium micro-interactions, such as dynamic mouse glow
 * physics for feature cards and active timeline step highlights.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     01. FEATURE CARDS MOUSE GLOW PHYSICS
     ========================================================================== */
  const initFeatureCardsGlow = () => {
    const cards = document.querySelectorAll('.feature-card-premium');
    
    if (cards.length === 0) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    });
  };

  /* ==========================================================================
     02. TIMELINE HIGHLIGHT ON SCROLL
     ========================================================================== */
  const initTimelineObserver = () => {
    const steps = document.querySelectorAll('.process-step');
    if (steps.length === 0 || !('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    steps.forEach(step => observer.observe(step));
  };

  initFeatureCardsGlow();
  initTimelineObserver();
});
