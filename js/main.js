/* ============================================================
   DermaSoZo — main.js
   Shared JavaScript: Nav, Scroll Reveal, Counters, FAQ, etc.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Mobile Navigation
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  const mobileOverlay = document.querySelector('.nav__mobile-overlay');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  function openMobileNav() {
    hamburger?.classList.add('open');
    mobileNav?.classList.add('open');
    mobileOverlay?.classList.add('open');
    mobileOverlay && (mobileOverlay.style.display = 'block');
    document.body.style.overflow = 'hidden';
    // Accessibility
    hamburger?.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      if (mobileOverlay && !mobileOverlay.classList.contains('open')) {
        mobileOverlay.style.display = 'none';
      }
    }, 400);
  }

  hamburger?.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMobileNav() : openMobileNav();
  });

  mobileOverlay?.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ----------------------------------------------------------
     2. Sticky Nav — Glass Background on Scroll
  ---------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* ----------------------------------------------------------
     3. Scroll Reveal (IntersectionObserver)
  ---------------------------------------------------------- */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
  }

  /* ----------------------------------------------------------
     4. Counter Animation
  ---------------------------------------------------------- */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-counter'), 10);
            const suffix = el.getAttribute('data-counter-suffix') || '';
            const prefix = el.getAttribute('data-counter-prefix') || '';
            const duration = 2000;
            const startTime = performance.now();

            function step(now) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out quad
              const eased = 1 - (1 - progress) * (1 - progress);
              const current = Math.round(eased * target);
              el.textContent = prefix + current.toLocaleString() + suffix;
              if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(el => observer.observe(el));
  }

  /* ----------------------------------------------------------
     5. Smooth Scroll for Anchor Links
  ---------------------------------------------------------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
      const y = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: y, behavior: 'smooth' });
      closeMobileNav();
    }
  });

  /* ----------------------------------------------------------
     6. FAQ Accordion
  ---------------------------------------------------------- */
  function initFAQ() {
    document.querySelectorAll('.faq__question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq__item');
        const isOpen = item.classList.contains('open');

        // Close all
        item.closest('.faq__list')?.querySelectorAll('.faq__item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ----------------------------------------------------------
     7. Active Nav Link Highlighting
  ---------------------------------------------------------- */
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.split('/').pop();
      if (href === currentPage || (currentPage === '' && href === 'home.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ----------------------------------------------------------
     8. Parallax (subtle hero background)
  ---------------------------------------------------------- */
  function initParallax() {
    const heroBg = document.querySelector('.hero__bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Init all on DOMContentLoaded
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    animateCounters();
    initFAQ();
    setActiveNavLink();
    initParallax();
  });
})();
