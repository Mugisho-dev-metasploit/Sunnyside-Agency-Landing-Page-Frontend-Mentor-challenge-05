/**
 * Sunnyside Agency Landing Page - Main JavaScript
 * Handles interactive features like mobile menu toggle, navigation, and DOM interactions
 */

// ========================================
// MOBILE MENU TOGGLE
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!mobileMenuBtn || !mobileMenu) {
    console.warn('Mobile menu elements not found in DOM');
    return;
  }

  /**
   * Toggle mobile menu visibility
   */
  const toggleMenu = () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      // Add focus to first menu link for accessibility
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.focus();
    }
  };

  /**
   * Close mobile menu
   */
  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
  };

  // Toggle menu on button click
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
});

// ========================================
// SMOOTH SCROLLING & NAVIGATION
// ========================================

/**
 * Smooth scroll to section on navigation link click
 */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    // Skip if it's just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }

    const targetId = href.substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

/**
 * Trigger animations when elements enter viewport
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .testimonial-card, .gallery-item').forEach(el => {
  observer.observe(el);
});

// ========================================
// ACCESSIBILITY UTILITIES
// ========================================

/**
 * Skip to main content link handler
 */
const skipLink = document.querySelector('.skip-to-main');
if (skipLink) {
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const mainContent = document.querySelector('main') || document.querySelector('section');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  });
}

/**
 * Keyboard navigation for dropdown menus
 */
document.querySelectorAll('[role="navigation"]').forEach(nav => {
  const links = nav.querySelectorAll('a');
  
  links.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
      let nextIndex;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (index + 1) % links.length;
        links[nextIndex].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (index - 1 + links.length) % links.length;
        links[nextIndex].focus();
      }
    });
  });
});
