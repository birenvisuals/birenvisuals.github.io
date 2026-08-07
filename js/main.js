/* ==========================================================================
   BIREN VISUALS - INTERACTIVE JAVASCRIPT ENGINE
   Pure Vanilla JS (No Frameworks)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Initialize all interactive modules
  initMobileMenu();
  initGallerySwitchers();
  initProjectFilters();
  initHeaderScroll();

  console.log('BIREN VISUALS Engine initialized successfully.');
});


/* ==========================================================================
   1. MOBILE NAVIGATION DRAWER TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !mainNav) return;

  // Toggle mobile drawer on button click
  mobileToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('active');

    mainNav.classList.toggle('active');
    mobileToggle.classList.toggle('active');

    // Update accessibility attribute
    mobileToggle.setAttribute('aria-expanded', !isOpen);
  });

  // Close drawer automatically when clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}


/* ==========================================================================
   2. INTERACTIVE SOFA GALLERY THUMBNAIL SWITCHER
   ========================================================================== */
function initGallerySwitchers() {
  const thumbButtons = document.querySelectorAll('.thumb-btn');

  thumbButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find the parent gallery container of this clicked thumbnail
      const galleryContainer = button.closest('.project-visual-column');
      if (!galleryContainer) return;

      // Find the main display image inside this project card
      const targetImgId = button.getAttribute('data-target');
      const mainImage = document.getElementById(targetImgId) || galleryContainer.querySelector('.main-render-img');
      const newSrc = button.getAttribute('data-src');

      if (mainImage && newSrc) {
        // Smooth fade-out transition
        mainImage.style.opacity = '0.3';

        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
        }, 150);
      }

      // Deactivate all thumbnail buttons in this specific project card
      const siblingThumbs = galleryContainer.querySelectorAll('.thumb-btn');
      siblingThumbs.forEach(thumb => thumb.classList.remove('active'));

      // Activate the clicked thumbnail button
      button.classList.add('active');
    });
  });
}


/* ==========================================================================
   3. CATEGORY FILTER TABS (SOFA SHOWCASE)
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-detail-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedFilter = button.getAttribute('data-filter');

      // Update active state on filter buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter project cards
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (selectedFilter === 'all' || cardCategory === selectedFilter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}


/* ==========================================================================
   4. HEADER SCROLL ELEVATION EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}