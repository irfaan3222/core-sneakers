/**
 * CORE SNEAKERS — App Logic
 * Navigation, product rendering, modal, WhatsApp ordering
 */

// ============================================================
// NAV
// ============================================================
function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  let menuOpen = false;

  // Scroll-based nav background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      hamburger.setAttribute('aria-expanded', menuOpen);

      const spans = hamburger.querySelectorAll('span');
      if (menuOpen) {
        gsap.to(spans[0], { rotate: 45, y: 6.5, duration: 0.35, ease: 'power2.inOut' });
        gsap.to(spans[1], { opacity: 0, duration: 0.2 });
        gsap.to(spans[2], { rotate: -45, y: -6.5, duration: 0.35, ease: 'power2.inOut' });
      } else {
        gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.35, ease: 'power2.inOut' });
        gsap.to(spans[1], { opacity: 1, duration: 0.2 });
        gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.35, ease: 'power2.inOut' });
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.35 });
        gsap.to(spans[1], { opacity: 1, duration: 0.2 });
        gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.35 });
      });
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });
}

// ============================================================
// PRODUCT RENDERING
// ============================================================
function renderProducts(container, products, cardType = 'main') {
  if (!container || !products.length) return;

  container.innerHTML = products.map(product => {
    const discount = getDiscount(product.price, product.originalPrice);
    const badgeClass = product.badge === 'NEW' || product.badge === 'NEW DROP'
      ? 'product-card__badge--new'
      : product.badge === 'LIMITED'
        ? 'product-card__badge--limited'
        : product.badge === 'BESTSELLER'
          ? 'product-card__badge--sale'
          : '';

    const sizesHtml = product.sizes.slice(0, 5).map(s =>
      `<span class="size-chip" data-size="${s}" data-product="${product.id}">UK ${s}</span>`
    ).join('');

    const priceHtml = `
      <span class="product-card__price">${formatPrice(product.price)}</span>
      ${product.originalPrice ? `<span class="product-card__original">${formatPrice(product.originalPrice)}</span>` : ''}
      ${discount ? `<span class="product-card__discount">-${discount}%</span>` : ''}
    `;

    const imageHtml = `
      <div class="product-card__placeholder" aria-hidden="true">👟</div>
    `;

    return `
      <article class="product-card" data-product-id="${product.id}" aria-label="${product.name}">
        <div class="product-card__image-wrap">
          ${imageHtml}
          ${product.badge ? `<span class="product-card__badge ${badgeClass}">${product.badge}</span>` : ''}
          <div class="product-card__hover-cta">
            <button class="btn btn--primary" style="cursor:none;" onclick="openProductModal('${product.id}')">View Details</button>
            <button class="btn btn--whatsapp" style="cursor:none;" onclick="quickOrderWhatsApp('${product.id}')">
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Order
            </button>
          </div>
        </div>
        <div class="product-card__body">
          <div class="product-card__category">${product.category}</div>
          <div class="product-card__name">${product.name}</div>
          <div class="product-card__subtitle">${product.subtitle}</div>
          <div class="product-card__pricing">${priceHtml}</div>
          <div class="product-card__sizes">${sizesHtml}</div>
          <div class="product-card__actions">
            <button class="btn btn--outline" onclick="openProductModal('${product.id}')">View Details</button>
            <button class="btn btn--whatsapp" onclick="quickOrderWhatsApp('${product.id}')">
              <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Order
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Size chip selection
  container.querySelectorAll('.size-chip').forEach(chip => {
    chip.addEventListener('click', e => {
      const productId = chip.dataset.product;
      container.querySelectorAll(`.size-chip[data-product="${productId}"]`).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

function renderDropCards(container, products) {
  if (!container || !products.length) return;

  container.innerHTML = products.map(product => {
    return `
      <div class="drop-card">
        <div class="drop-card__image" aria-hidden="true">👟</div>
        <div class="drop-card__body">
          <div class="drop-card__tag">${product.category} · ${product.badge || 'New Drop'}</div>
          <div class="drop-card__name">${product.name}</div>
          <div class="drop-card__price">${formatPrice(product.price)}</div>
          <button class="drop-card__cta" onclick="openProductModal('${product.id}')">View & Order</button>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// PRODUCT MODAL
// ============================================================
let currentModalProduct = null;
let selectedModalSize = null;

function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  currentModalProduct = product;
  selectedModalSize = product.sizes[2] || product.sizes[0];

  const overlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal');

  if (!overlay || !modal) return;

  const discount = getDiscount(product.price, product.originalPrice);

  // Populate modal
  modal.querySelector('.modal__category').textContent = product.category;
  modal.querySelector('.modal__name').textContent = product.name;
  modal.querySelector('.modal__subtitle').textContent = product.subtitle;
  modal.querySelector('.modal__desc').textContent = product.description;

  modal.querySelector('.modal__price').textContent = formatPrice(product.price);

  const origEl = modal.querySelector('.modal__original');
  if (product.originalPrice) {
    origEl.textContent = formatPrice(product.originalPrice);
    origEl.style.display = '';
  } else {
    origEl.style.display = 'none';
  }

  const discountEl = modal.querySelector('.modal__discount');
  if (discount) {
    discountEl.textContent = `-${discount}%`;
    discountEl.style.display = '';
  } else {
    discountEl.style.display = 'none';
  }

  // Image / placeholder
  const imgSide = modal.querySelector('.modal__image-side');
  imgSide.innerHTML = `<span style="font-size:6rem">👟</span>`;

  // Sizes
  const sizesContainer = modal.querySelector('.modal__sizes');
  sizesContainer.innerHTML = product.sizes.map(s => `
    <button class="modal__size-chip ${s === selectedModalSize ? 'active' : ''}" data-size="${s}">UK ${s}</button>
  `).join('');

  sizesContainer.querySelectorAll('.modal__size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      sizesContainer.querySelectorAll('.modal__size-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedModalSize = chip.dataset.size;
    });
  });

  // WhatsApp CTA
  const waCta = modal.querySelector('.modal__wa-cta');
  if (waCta) {
    waCta.onclick = () => {
      const link = generateWhatsAppLink(product, selectedModalSize);
      window.open(link, '_blank');
    };
  }

  // Open
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
  currentModalProduct = null;
  selectedModalSize = null;
}

function quickOrderWhatsApp(productId) {
  const product = getProductById(productId);
  if (!product) return;
  // Use middle size as default
  const size = product.sizes[Math.floor(product.sizes.length / 2)];
  const link = generateWhatsAppLink(product, size);
  window.open(link, '_blank');
}

// ============================================================
// INIT ALL
// ============================================================
function initApp() {
  // Render collection
  const collectionGrid = document.querySelector('.collection-grid');
  if (collectionGrid) {
    renderProducts(collectionGrid, CORE_PRODUCTS);
  }

  // Render new drops
  const dropsTrack = document.querySelector('.new-drops__track');
  if (dropsTrack) {
    renderDropCards(dropsTrack, getNewArrivals().length ? getNewArrivals() : CORE_PRODUCTS.slice(0, 4));
    // Duplicate for visual density
    dropsTrack.innerHTML += dropsTrack.innerHTML;
  }

  // Modal close
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
  }

  const closeBtn = document.querySelector('.modal__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Init nav
  initNav();

  // Init animations (from animation.js)
  if (typeof initAnimations === 'function') {
    initAnimations();
  }
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
