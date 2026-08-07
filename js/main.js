/**
 * BIREN VISUALS — Core Website Functionality
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen);
      
      // Prevent body scrolling when mobile overlay is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu automatically when any nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }


  /* ==========================================================================
     2. HEADER SCROLL EFFECT (BLUR & COMPACT SHADOW)
     ========================================================================== */
  const siteHeader = document.querySelector('.site-header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });


  /* ==========================================================================
     3. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Triggers when section reaches center viewport
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');

          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }


  /* ==========================================================================
     4. MODAL GALLERY THUMBNAIL SWITCHER
     ========================================================================== */
  const modals = document.querySelectorAll('.project-modal');

  modals.forEach(modal => {
    const mainImg = modal.querySelector('.modal-hero-img');
    const thumbnails = modal.querySelectorAll('.m-thumb');

    if (mainImg && thumbnails.length > 0) {
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
          // Update main image source
          const newSrc = thumb.getAttribute('src');
          if (newSrc) {
            mainImg.setAttribute('src', newSrc);
            mainImg.setAttribute('alt', thumb.getAttribute('alt') || 'Furniture View');
          }

          // Update active border state on thumbnails
          thumbnails.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    }

    /* Close modal when clicking outside the content box (Backdrop click) */
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (!isInDialog) {
        modal.close();
      }
    });
  });


  /* ==========================================================================
     5. SMOOTH SCROLL FOR INTERNAL ANCHORS
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

});