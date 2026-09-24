/**
 * Sitio Jua e GranJua
 * Interatividades e navegacao da landing page
 * Itaberaba, Bahia
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Efeito de scroll no cabecalho
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Menu Mobile
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // 3. FAQ Acordeao
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-button');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-button');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        } else {
          questionBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // 4. Scroll Suave para Ancoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
