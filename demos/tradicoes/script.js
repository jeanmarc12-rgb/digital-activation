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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

// CMS Content Loader — carrega _data/content.json e _data/menu.json
async function initCMS() {
  const [infoRes, menuRes] = await Promise.all([
    fetch("_data/content.json").catch(() => null),
    fetch("_data/menu.json").catch(() => null)
  ]);

  const info = infoRes && infoRes.ok ? await infoRes.json().catch(() => null) : null;
  const menu = menuRes && menuRes.ok ? await menuRes.json().catch(() => null) : null;

  if (info) {
    // Actualiza todos os links tel:
    if (info.phone) {
      document.querySelectorAll("a[href^=\"tel:\"]").forEach(a => { a.href = "tel:" + info.phone; });
      const ph = document.getElementById("cms-phone");
      if (ph) ph.textContent = info.phone_display || info.phone;
      const phAlt = document.getElementById("cms-phone-alt");
      if (phAlt && info.phone_alt) { phAlt.href = "tel:" + info.phone_alt; phAlt.textContent = info.phone_alt_display || info.phone_alt; }
    }
    // Horário
    const hoursEl = document.getElementById("cms-hours");
    if (hoursEl && info.hours_days) {
      const open = info.hours_open || "";
      const close = info.hours_close || "";
      const morning = info.hours_morning || "";
      const afternoon = info.hours_afternoon || "";
      const closed = info.hours_closed_note || "";
      const range = morning ? `${morning} · ${afternoon}` : `${open} – ${close}`;
      hoursEl.innerHTML = `${info.hours_days}<br/>${range}<br/><em>${closed}</em>`;
    }
    // Morada
    const addrEl = document.getElementById("cms-address");
    if (addrEl && info.address_street) {
      addrEl.innerHTML = `${info.address_street}<br/>${info.address_postal} ${info.address_city}`;
    }
  }

  // Ementa (restaurantes)
  if (menu && menu.categories) {
    const menuEl = document.getElementById("cms-menu");
    if (menuEl) {
      menuEl.innerHTML = menu.categories.map(cat => `
        <div class="ementa-category">
          <h3 class="ementa-cat-title">${cat.emoji} ${cat.title}</h3>
          <ul class="ementa-list">
            ${cat.items.map(item => `
              <li>
                <div class="ementa-item">
                  <span class="ementa-name">${item.name}</span>
                  <span class="ementa-price">${item.price}</span>
                </div>
                <span class="ementa-desc">${item.description}</span>
              </li>`).join("")}
          </ul>
        </div>`).join("");
      const nota = document.querySelector(".ementa-nota");
      if (nota && menu.note) nota.textContent = "* " + menu.note;
    }
  }
}

initCMS();
