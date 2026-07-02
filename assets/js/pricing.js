/**
 * ============================================================================
 * REENI - PRICING PAGE INTERACTIVE ENGINE (v1.0)
 * ============================================================================
 * Handles page-specific pricing interactions:
 * - Billing cycle toggle switch (Monthly vs Yearly)
 * - Animated pricing value switches
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const initBillingToggle = () => {
    const toggleInput = document.getElementById('billing-toggle-input');
    const priceStarter = document.getElementById('price-starter');
    const pricePro = document.getElementById('price-pro');
    const priceEnterprise = document.getElementById('price-enterprise');
    const periodStarter = document.getElementById('period-starter');
    const periodPro = document.getElementById('period-pro');
    const periodEnterprise = document.getElementById('period-enterprise');

    if (!toggleInput || !priceStarter || !pricePro || !priceEnterprise) return;

    // Prices
    const rates = {
      starter: { monthly: '$1,490', yearly: '$1,190' },
      pro: { monthly: '$3,490', yearly: '$2,790' },
      enterprise: { monthly: '$7,990', yearly: '$6,390' }
    };

    const animateValue = (element, newValue) => {
      element.classList.add('fade-out-price');
      setTimeout(() => {
        element.textContent = newValue;
        element.classList.remove('fade-out-price');
        element.classList.add('fade-in-price');
        setTimeout(() => {
          element.classList.remove('fade-in-price');
        }, 300);
      }, 150);
    };

    toggleInput.addEventListener('change', () => {
      const isYearly = toggleInput.checked;
      const cycle = isYearly ? 'yearly' : 'monthly';
      const label = isYearly ? '/ yr' : '/ mo';

      animateValue(priceStarter, rates.starter[cycle]);
      animateValue(pricePro, rates.pro[cycle]);
      animateValue(priceEnterprise, rates.enterprise[cycle]);

      if (periodStarter) periodStarter.textContent = label;
      if (periodPro) periodPro.textContent = label;
      if (periodEnterprise) periodEnterprise.textContent = label;
    });
  };

  initBillingToggle();
});
