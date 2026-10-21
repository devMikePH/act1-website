document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // 2. Theme Toggle (Dark/Light mode)
  const themeToggleBtn = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  }

  // 3. Scroll Reveal Animation using Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Stop observing once it's revealed
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // 4. Custom Cursor Glow Effect
  const cursorGlow = document.querySelector('.cursor-glow');

  // Only enable on non-touch devices
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });

    // Make glow bigger when hovering over links/buttons
    const interactables = document.querySelectorAll('a, button');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '500px';
        cursorGlow.style.height = '500px';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
      });
    });
  } else {
    // Hide custom cursor on mobile/touch devices
    cursorGlow.style.display = 'none';
  }

});