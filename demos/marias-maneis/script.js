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

// Tamanhos select
document.querySelectorAll('.tamanhos-btns').forEach(group => {
  group.querySelectorAll('.tam').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.tam').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

// Filtros de categoria
const filtroBtns = document.querySelectorAll('.filtro-btn');
const cards = document.querySelectorAll('.produto-card');

filtroBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    cards.forEach(card => {
      if (cat === 'todos' || card.dataset.cat.includes(cat)) {
        card.style.display = '';
        setTimeout(() => card.classList.add('visible'), 10);
      } else {
        card.classList.remove('visible');
        setTimeout(() => card.style.display = 'none', 200);
      }
    });
  });
});

// Inicializar todos visíveis
cards.forEach(c => c.classList.add('visible'));

// Carrinho
let cart = [];
const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function renderCart() {
  const total = cart.reduce((s, i) => s + i.preco * i.qty, 0);
  cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);
  cartTotal.textContent = `€${total}`;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">O seu carrinho está vazio.</p>';
    cartFooter.style.display = 'none';
    return;
  }

  const linhas = cart.map(i => `• ${i.qty}x ${i.nome} (Tam: ${i.tam}) — €${i.preco * i.qty}`).join('\n');
  const msg = `Olá! Gostaria de fazer uma encomenda:\n\n${linhas}\n\nTotal: €${total}\n\nPodiam confirmar disponibilidade? Obrigado!`;
  document.getElementById('whatsappBtn').href = `https://wa.me/351964723101?text=${encodeURIComponent(msg)}`;

  cartFooter.style.display = 'block';
  cartItems.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <strong>${item.nome}</strong>
        <span>Tam: ${item.tam}</span>
      </div>
      <div class="cart-item-right">
        <div class="cart-qty">
          <button onclick="changeQty(${i}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${i}, 1)">+</button>
        </div>
        <span class="cart-item-preco">€${item.preco * item.qty}</span>
        <button class="cart-remove" onclick="removeItem(${i})">✕</button>
      </div>
    </div>
  `).join('');
}

window.changeQty = (i, delta) => {
  cart[i].qty = Math.max(1, cart[i].qty + delta);
  renderCart();
};

window.removeItem = (i) => {
  cart.splice(i, 1);
  renderCart();
};

document.querySelectorAll('.btn-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.produto-card');
    const nome = btn.dataset.nome;
    const preco = parseInt(btn.dataset.preco);
    const tam = card.querySelector('.tam.active')?.textContent || 'Único';

    const existing = cart.find(i => i.nome === nome && i.tam === tam);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ nome, preco, tam, qty: 1 });
    }

    // Feedback visual
    btn.textContent = '✓ Adicionado';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = '+ Carrinho';
      btn.classList.remove('added');
    }, 1500);

    renderCart();
    openCart();
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
