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

// Cookie banner
const cookieBanner = document.getElementById('cookieBanner');
if (!localStorage.getItem('cookieConsent')) {
  setTimeout(() => cookieBanner.classList.add('visible'), 1200);
}
document.getElementById('cookieAccept').addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'accepted');
  cookieBanner.classList.remove('visible');
});
document.getElementById('cookieReject').addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'essential');
  cookieBanner.classList.remove('visible');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
