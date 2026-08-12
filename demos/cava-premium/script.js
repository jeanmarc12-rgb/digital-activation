// Scroll reveal (IntersectionObserver) — entrada suave por secção/card
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

// Nav scroll
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

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Pedir Orçamento — abre WhatsApp com mensagem pré-preenchida por produto
const WHATSAPP_NUMBER = '351918737731';
document.querySelectorAll('.btn-orcamento').forEach(btn => {
  btn.addEventListener('click', () => {
    const produto = btn.dataset.produto;
    const msg = `Olá! Gostaria de pedir um orçamento para: ${produto}.\n\nPodem ajudar-me com mais informação?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
  });
});

// Cookie banner
const cookieBanner = document.getElementById("cookieBanner");
if (!localStorage.getItem("cookieConsent")) {
  setTimeout(() => cookieBanner.classList.add("visible"), 1200);
}
document.getElementById("cookieAccept").addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "accepted");
  cookieBanner.classList.remove("visible");
});
document.getElementById("cookieReject").addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "essential");
  cookieBanner.classList.remove("visible");
});
