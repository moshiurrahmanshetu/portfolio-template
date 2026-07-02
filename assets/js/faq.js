/**
 * ============================================================================
 * REENI - FAQ PAGE INTERACTIVE ENGINE (v1.0)
 * ============================================================================
 * Handles page-specific FAQ interactions:
 * - Real-time live searching across 20+ Q&As
 * - Category filter chips (General, Services, Pricing, Support, Development)
 * - Dynamic empty search states
 * - Auto close other accordions on search/filter to prevent visual clutter
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const initFaqEngine = () => {
    const searchInput = document.getElementById('faq-search-input');
    const clearBtn = document.getElementById('faq-search-clear-btn');
    const filterBtns = document.querySelectorAll('.faq-filter-btn');
    const accordionItems = document.querySelectorAll('.accordion-item-faq');
    const noResults = document.getElementById('faq-no-results');

    if (accordionItems.length === 0) return;

    let activeCategory = 'all';
    let searchQuery = '';

    const filterFaqItems = () => {
      let visibleCount = 0;

      accordionItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const questionText = item.querySelector('.accordion-button').textContent.toLowerCase();
        const bodyText = item.querySelector('.accordion-body').textContent.toLowerCase();
        
        const matchesCategory = (activeCategory === 'all' || itemCategory === activeCategory);
        const matchesSearch = (questionText.includes(searchQuery) || bodyText.includes(searchQuery));

        if (matchesCategory && matchesSearch) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
          
          // Collapse if it was open
          const button = item.querySelector('.accordion-button');
          const collapse = item.querySelector('.accordion-collapse');
          if (button && !button.classList.contains('collapsed')) {
            button.classList.add('collapsed');
            button.setAttribute('aria-expanded', 'false');
            if (collapse) collapse.classList.remove('show');
          }
        }
      });

      // Toggle No Results Found Message
      if (noResults) {
        if (visibleCount === 0) {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      }
    };

    // Category Filter Buttons
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Set Active State
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          activeCategory = btn.getAttribute('data-filter');
          filterFaqItems();
        });
      });
    }

    // Live Search input
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.toLowerCase().trim();

        // Toggle clear button
        if (clearBtn) {
          if (searchQuery.length > 0) {
            clearBtn.style.display = 'block';
          } else {
            clearBtn.style.display = 'none';
          }
        }

        filterFaqItems();
      });
    }

    // Search Clear Button click
    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        filterFaqItems();
        searchInput.focus();
      });
    }
  };

  initFaqEngine();
});
