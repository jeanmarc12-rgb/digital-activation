const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const enableMotion = !prefersReducedMotion && hasFinePointer;

// ── Nav scroll state + mobile toggle ──
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

// ── Hero entrance (title line-reveal + stat count-up) ──
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.getElementById('heroTitle').classList.add('revealed');
    document.querySelector('.hero').classList.add('revealed');
    document.querySelectorAll('.stat-num').forEach(animateCount);
  });
});

// ── Scroll reveal (IntersectionObserver) ──
const revealEls = document.querySelectorAll('[data-reveal]');
document.querySelectorAll('.stagger').forEach(group => {
  group.querySelectorAll(':scope > [data-reveal]').forEach((el, i) => {
    el.style.setProperty('--i', i);
  });
});
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── Timeline — SVG line draw when section enters view ──
const timeline = document.getElementById('timeline');
if (timeline) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timeline.classList.add('revealed');
        timelineObserver.unobserve(timeline);
      }
    });
  }, { threshold: 0.2 });
  timelineObserver.observe(timeline);
}

// ── Bento tilt-on-hover (desktop only) ──
if (enableMotion) {
  document.querySelectorAll('.tilt').forEach(card => {
    let raf = null;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(800px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateZ(0)`;
      });
    });
    card.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // ── Magnetic buttons ──
  document.querySelectorAll('.magnetic').forEach(el => {
    let raf = null;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.3;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
    });
    el.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = 'translate(0, 0)';
    });
  });

  // ── Custom cursor ring ──
  const cursorRing = document.getElementById('cursorRing');
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2, rx = cx, ry = cy;
  window.addEventListener('mousemove', (e) => {
    cx = e.clientX; cy = e.clientY;
    cursorRing.classList.add('active');
  });
  document.querySelectorAll('a, button, .tilt').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
  (function loop() {
    rx += (cx - rx) * 0.18;
    ry += (cy - ry) * 0.18;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
}

// ── Pedir Orçamento — WhatsApp pré-preenchido por produto ──
const WHATSAPP_NUMBER = '351918737731';
document.querySelectorAll('.bento-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const produto = btn.dataset.produto;
    const msg = `Olá! Gostaria de pedir um orçamento para: ${produto}.\n\nPodem ajudar-me com mais informação?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
  });
});

// ── Cookie banner ──
const cookieBanner = document.getElementById('cookieBanner');
if (!localStorage.getItem('cookieConsent')) {
  setTimeout(() => cookieBanner.classList.add('visible'), 1400);
}
document.getElementById('cookieAccept').addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'accepted');
  cookieBanner.classList.remove('visible');
});
document.getElementById('cookieReject').addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'essential');
  cookieBanner.classList.remove('visible');
});
