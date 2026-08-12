// ── Loading screen — barra de progresso 0-100% ──
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderPct = document.getElementById('loaderPct');

(function runLoader() {
  let pct = 0;
  const step = () => {
    pct += Math.random() * 18 + 6;
    if (pct >= 100) pct = 100;
    loaderFill.style.width = pct + '%';
    loaderPct.textContent = Math.round(pct) + '%';
    if (pct < 100) {
      setTimeout(step, 90 + Math.random() * 90);
    } else {
      setTimeout(() => {
        loader.classList.add('done');
        document.getElementById('heroContent').classList.add('loaded');
      }, 250);
    }
  };
  step();
})();

// ── Scroll progress bar ──
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}

// ── Hero parallax (desativado se o utilizador preferir menos movimento) ──
const heroParallax = document.getElementById('heroParallax');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateParallax() {
  if (!heroParallax || prefersReducedMotion) return;
  const y = window.scrollY;
  if (y < window.innerHeight * 1.2) {
    heroParallax.style.transform = `translateY(${y * 0.35}px)`;
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});
updateScrollProgress();

// ── Nav scroll state ──
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

// ── Sector cards — toggle por toque/click (não depender só de hover) ──
document.querySelectorAll('.sector-hover-card').forEach(card => {
  card.addEventListener('click', () => {
    const wasActive = card.classList.contains('active');
    document.querySelectorAll('.sector-hover-card.active').forEach(c => c.classList.remove('active'));
    if (!wasActive) card.classList.add('active');
  });
});

// ── Pedir Orçamento — WhatsApp pré-preenchido por produto ──
const WHATSAPP_NUMBER = '351918737731';
document.querySelectorAll('.btn-orcamento').forEach(btn => {
  btn.addEventListener('click', () => {
    const produto = btn.dataset.produto;
    const msg = `Olá! Gostaria de pedir um orçamento para: ${produto}.\n\nPodem ajudar-me com mais informação?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
  });
});

// ── Cookie banner ──
const cookieBanner = document.getElementById("cookieBanner");
if (!localStorage.getItem("cookieConsent")) {
  setTimeout(() => cookieBanner.classList.add("visible"), 1800);
}
document.getElementById("cookieAccept").addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "accepted");
  cookieBanner.classList.remove("visible");
});
document.getElementById("cookieReject").addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "essential");
  cookieBanner.classList.remove("visible");
});
