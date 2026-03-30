/**
 * Sunnyside Agency Landing Page - Main JavaScript
 * Handles interactive features like mobile menu toggle, navigation, animations, and DOM interactions
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
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      // Add focus to first menu link for accessibility
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.focus();
    }
  };

  /**
   * Close mobile menu
   */
  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
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

  // Set initial aria-expanded state
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
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
document.querySelectorAll('section, article, picture').forEach(el => {
  observer.observe(el);
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================

/**
 * Update scroll progress bar
 */
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  // Create progress bar if it doesn't exist
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
  }
  
  progressBar.style.transform = `scaleX(${scrolled / 100})`;
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

/**
 * Highlight active navigation link based on scroll position
 */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active', 'text-yellow');
    }
  });
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

// ========================================
// LAZY LOADING IMAGES
// ========================================

/**
 * Lazy load images with Intersection Observer
 */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========================================
// PARALLAX EFFECT (OPTIONAL)
// ========================================

/**
 * Subtle parallax on hero section
 */
const heroSection = document.getElementById('hero');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxElements = heroSection.querySelectorAll('picture');
    parallaxElements.forEach(el => {
      el.style.transform = `translateY(${scrollY * 0.3}px)`;
    });
  });
}

// ========================================
// FORM VALIDATION (IF NEEDED)
// ========================================

/**
 * Simple form validation helper
 */
const validateForm = (form) => {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('invalid');
      isValid = false;
    } else {
      input.classList.remove('invalid');
    }
  });
  
  return isValid;
};

// Attach validation to any forms
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    if (!validateForm(form)) {
      e.preventDefault();
    }
  });
});
