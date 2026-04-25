/* ================================================
   COLOR RUN TRÉVOUX 2026 – Interactions JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Smooth scroll on anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile nav if open
      closeMobileNav();
    });
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - headerH - 20) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Mobile burger menu ---- */
  const burgerBtn  = document.querySelector('.burger-btn');
  const mainNav    = document.querySelector('.main-nav');
  const navOverlay = document.getElementById('nav-overlay');

  // Active la transition seulement après le chargement initial pour éviter
  // l'animation parasite causée par le changement right:auto → right:-100%
  requestAnimationFrame(() => mainNav?.classList.add('nav-animated'));

  const openMobileNav = () => {
    burgerBtn.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  burgerBtn?.addEventListener('click', () => {
    burgerBtn.classList.contains('open') ? closeMobileNav() : openMobileNav();
  });
  navOverlay?.addEventListener('click', closeMobileNav);

  /* ---- Scroll animations (Intersection Observer) ---- */
  const animEls = document.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animEls.forEach(el => observer.observe(el));

  /* ---- Countdown to 27 September 2026 ---- */
  const eventDate = new Date('2026-09-27T09:00:00');

  const pad = n => String(n).padStart(2, '0');

  const updateCountdown = () => {
    const now  = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent    = '000';
      document.getElementById('cd-hours').textContent   = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cd-days').textContent    = String(days).padStart(3, '0');
    document.getElementById('cd-hours').textContent   = pad(hours);
    document.getElementById('cd-minutes').textContent = pad(minutes);
    document.getElementById('cd-seconds').textContent = pad(seconds);
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---- Video modal ---- */
  const modal       = document.getElementById('video-modal');
  const modalClose  = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const videoIframe = document.getElementById('video-iframe');
  // Replace with your actual YouTube video ID
  const VIDEO_URL   = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';

  const openModal = () => {
    modal.hidden = false;
    videoIframe.src = VIDEO_URL;
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    videoIframe.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.video-thumb, .play-btn').forEach(el => {
    el.addEventListener('click', openModal);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });
  });

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  /* ---- Header shadow on scroll ---- */
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    siteHeader?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

});
