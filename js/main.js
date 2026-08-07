// Mobile navigation toggle
// -------------------------------------------------
// We select the button and the nav once, then listen
// for clicks. Each click flips the .is-open class,
// which the CSS uses to show/hide the menu, and we
// keep the aria-expanded attribute in sync so screen
// readers announce the menu's state correctly.

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close the mobile menu automatically if the user clicks
// a nav link (so it doesn't stay open after navigating).
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  });
});
