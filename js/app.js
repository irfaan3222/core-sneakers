/**
 * CORE FOOTWEAR - Interactive E-Commerce & Continuous Video Engine
 * Blue & White Aesthetic Edition
 */

// --- APPLICATION STATE ---
const state = {
  currentCurrency: 'INR',
  currencyRates: {
    INR: { symbol: 'Rs. ', rate: 1, format: (val) => `Rs. ${val.toLocaleString('en-IN')}.00` },
    USD: { symbol: '$', rate: 0.012, format: (val) => `$${Math.round(val * 0.012)}` },
    EUR: { symbol: '€', rate: 0.011, format: (val) => `€${Math.round(val * 0.011)}` },
    GBP: { symbol: 'Â£', rate: 0.0095, format: (val) => `Â£${Math.round(val * 0.0095)}` }
  },
  activeGenderFilter: 'all',
  sortBy: 'featured',
  cardImageIndices: {},
  heroSlideIndex: 0,
  heroAutoPlayTimer: null,
  cart: JSON.parse(localStorage.getItem('core_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('core_wishlist') || '[]'),
  appliedPromo: null,
  activeQuickViewProduct: null,
  activeReel: null
};

// Fallback image generator
function getSvgShoeFallback(name, color = '#0a0a0a') {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700" fill="%23f0f5ff"><rect width="600" height="700" fill="%23f0f5ff"/><g transform="translate(80, 220)"><path d="M40 180 C80 180, 110 170, 140 130 C170 90, 240 50, 310 60 C370 70, 420 120, 440 180 C410 200, 370 210, 320 210 C240 210, 150 205, 40 205 Z" fill="${encodeURIComponent(color)}" opacity="0.9"/><path d="M30 195 C120 195, 280 200, 450 195 C460 215, 440 240, 410 245 C320 250, 120 250, 20 235 C10 215, 20 195, 30 195 Z" fill="%23051336"/><text x="220" y="290" font-family="sans-serif" font-weight="900" font-size="22" fill="%230047ff" text-anchor="middle" letter-spacing="4">CORE FOOTWEAR</text></g></svg>`;
}

// --- CURRENCY FORMATTER ---
function formatPrice(amountInInr) {
  const curr = state.currencyRates[state.currentCurrency];
  return curr.format(amountInInr);
}


// ==========================================
// GOOGLE DRIVE IMAGE URL RESOLVER
// Converts standard Drive share links into direct high-speed CDN images
// ==========================================
function resolveGoogleDriveImageUrl(url) {
  if (!url) return '';
  url = String(url).trim();
  if (!url) return '';

  // Extract Google Drive ID from standard share link or ID param
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return 'https://lh3.googleusercontent.com/d/' + fileMatch[1];
  }

  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return 'https://lh3.googleusercontent.com/d/' + idMatch[1];
  }

  return url;
}

// ==========================================
// GOOGLE SHEETS REAL-TIME SYNC ENGINE
// ==========================================
let GOOGLE_SHEET_ID = localStorage.getItem('CORE_GOOGLE_SHEET_ID') || '1a9FObadct2sQWoJRyGkmOwt2VqrDyUuYxQhvcyycTqA';

function parseCSV(text) {
  const lines = [];
  let row = [''];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') lines.push(row);
  return lines;
}

function parseProductsFromCsv(csvText) {
  const rows = parseCSV(csvText.replace(/^\uFEFF/, ''));
  if (!rows || rows.length < 2) return [];

  const headers = rows[0].map(h => h.trim().toLowerCase());
  const getCol = (row, ...names) => {
    for (const name of names) {
      const idx = headers.indexOf(name.toLowerCase());
      if (idx !== -1 && row[idx] !== undefined) return row[idx].trim();
    }
    return '';
  };

  const products = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length === 0 || !row[0]) continue;

    const id = getCol(row, 'id') || `shoe-${r}`;
    const name = getCol(row, 'name', 'title') || 'CORE Sneaker';
    const gender = (getCol(row, 'gender') || 'unisex').toLowerCase();
    const category = (getCol(row, 'category') || 'sneakers').toLowerCase();
    const price = parseFloat((getCol(row, 'price (inr)', 'price') || '0').replace(/[^0-9.]/g, '')) || 0;
    const originalPrice = parseFloat((getCol(row, 'original price', 'mrp') || '0').replace(/[^0-9.]/g, '')) || Math.round(price * 1.25);
    const rating = parseFloat(getCol(row, 'rating')) || 4.9;
    const reviewsCount = parseInt(getCol(row, 'reviews count', 'reviews')) || 50;
    const badge = getCol(row, 'badge') || 'BESTSELLER';
    const section = (getCol(row, 'section') || 'all').toLowerCase();
    
    // Parse sizes
    const rawSizes = getCol(row, 'sizes');
    const sizes = rawSizes ? rawSizes.split(',').map(s => s.trim()).filter(Boolean) : ["UK 7", "UK 8", "UK 9", "UK 10"];
    
    // Parse colors
    const rawColors = getCol(row, 'colors');
    const colors = rawColors ? rawColors.split(',').map(c => {
      const cname = c.trim();
      return { name: cname, hex: '#111111' };
    }) : [{ name: 'Monochrome', hex: '#111111' }];

    // Parse images (resolving Google Drive links)
    const rawImages = getCol(row, 'images', 'image');
    let images = rawImages ? rawImages.split(/[\n,]+/).map(s => resolveGoogleDriveImageUrl(s)).filter(Boolean) : [];
    if (images.length === 0) {
      images = ['assets/products/core-fatlace-white.jpg'];
    }

    const description = getCol(row, 'description') || 'Architectural luxury footwear designed for performance and everyday style.';
    const rawDetails = getCol(row, 'details');
    const details = rawDetails ? rawDetails.split(/[|\n]+/).map(d => d.trim()).filter(Boolean) : ['Breathable upper', 'Cushioned sole'];

    products.push({
      id,
      name,
      gender,
      category,
      price,
      originalPrice,
      rating,
      reviewsCount,
      badge,
      section,
      sizes,
      colors,
      images,
      description,
      details
    });
  }
  return products;
}

async function syncFromGoogleSheet() {
  if (!GOOGLE_SHEET_ID) return;
  const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv`;
  console.log('[CORE Sync] Fetching live catalog from Google Sheet:', GOOGLE_SHEET_ID);
  
  try {
    const res = await fetch(csvUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csvData = await res.text();
    const liveProducts = parseProductsFromCsv(csvData);
    
    if (liveProducts && liveProducts.length > 0) {
      // Update global catalog
      PRODUCTS_DATA.splice(0, PRODUCTS_DATA.length, ...liveProducts);
      renderProducts();
      console.log(`[CORE Sync] ✓ Live synced ${liveProducts.length} products from Google Sheet successfully!`);
      
      // Subtle notification indicator
      showSyncToast(`✓ Live synced ${liveProducts.length} products from Google Sheet`);
    }
  } catch (err) {
    console.warn('[CORE Sync] Unable to fetch Google Sheet, keeping local catalog:', err);
  }
}

function showSyncToast(msg) {
  let toast = document.getElementById('core-sync-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'core-sync-toast';
    toast.className = 'fixed bottom-4 left-4 z-50 px-4 py-2 bg-black/90 text-white border border-white/20 text-xs font-mono-code font-bold rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none opacity-0 translate-y-2';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.remove('opacity-0', 'translate-y-2');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
  }, 3500);
}

function setGoogleSheetId(id) {
  if (!id) {
    localStorage.removeItem('CORE_GOOGLE_SHEET_ID');
    GOOGLE_SHEET_ID = '';
    console.log('[CORE Sync] Google Sheet disconnected. Using default catalog.');
    showSyncToast('Google Sheet disconnected.');
    return;
  }
  const match = id.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  const cleanId = match ? match[1] : id.trim();
  localStorage.setItem('CORE_GOOGLE_SHEET_ID', cleanId);
  GOOGLE_SHEET_ID = cleanId;
  syncFromGoogleSheet();
}
window.setGoogleSheetId = setGoogleSheetId;
window.syncFromGoogleSheet = syncFromGoogleSheet;

// --- DOM READY INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initFilters();
  renderProducts();
  renderReels();
  initReelsAutoScroll();
  renderFaqs();
  updateCartBadge();
  setupEventListeners();
  setupCurrencySelector();
  setupTrackScrollListeners();
  checkGoogleSheetOnLoad();
});


function checkGoogleSheetOnLoad() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('sheet')) {
    setGoogleSheetId(params.get('sheet'));
  } else if (GOOGLE_SHEET_ID) {
    syncFromGoogleSheet();
  }
}

// --- HERO BANNER SLIDER ---
function initHeroSlider() {
  const track = document.getElementById('hero-slider-track');
  const dots = document.querySelectorAll('.hero-dot');
  if (!track) return;

  const slidesCount = document.querySelectorAll('.hero-slide').length;

  window.setHeroSlide = (idx) => {
    state.heroSlideIndex = (idx + slidesCount) % slidesCount;
    track.style.transform = `translateX(-${state.heroSlideIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === state.heroSlideIndex));
  };

  window.changeHeroSlide = (delta) => {
    setHeroSlide(state.heroSlideIndex + delta);
  };

  // Auto-play sliding every 6 seconds
  const startAutoPlay = () => {
    clearInterval(state.heroAutoPlayTimer);
    state.heroAutoPlayTimer = setInterval(() => changeHeroSlide(1), 6000);
  };

  const stopAutoPlay = () => clearInterval(state.heroAutoPlayTimer);

  track.parentElement.addEventListener('mouseenter', stopAutoPlay);
  track.parentElement.addEventListener('mouseleave', startAutoPlay);
  startAutoPlay();
}

// --- SECTION HORIZONTAL SLIDING ENGINE ---
function slideSection(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const cardWidth = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 24 : 340;
  const scrollAmount = cardWidth * 1.5;
  track.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

function setupTrackScrollListeners() {
  const tracks = [
    { trackId: 'must-have-slider-track', barId: 'must-have-progress-bar' },
    { trackId: 'men-slider-track', barId: 'men-progress-bar' },
    { trackId: 'women-slider-track', barId: 'women-progress-bar' },
    { trackId: 'archive-slider-track', barId: 'archive-progress-bar' },
    { trackId: 'outdoor-slider-track', barId: 'outdoor-progress-bar' },
    { trackId: 'reels-slider-track', barId: 'reels-progress-bar' }
  ];

  tracks.forEach(({ trackId, barId }) => {
    const track = document.getElementById(trackId);
    const bar = document.getElementById(barId);
    if (!track || !bar) return;

    track.addEventListener('scroll', () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll > 0) {
        const progress = (track.scrollLeft / maxScroll) * 100;
        bar.style.transform = `translateX(${progress * 2.5}%)`;
      }
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => { isDown = false; });
    track.addEventListener('mouseup', () => { isDown = false; });
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.6;
      track.scrollLeft = scrollLeft - walk;
    });
  });
}

// --- FILTER & TAB NAVIGATION ---
function initFilters() {
  const genderTabs = document.querySelectorAll('.gender-tab');
  genderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      genderTabs.forEach(t => t.classList.remove('filter-tab-active', 'bg-[#0a0a0a]', 'text-white'));
      tab.classList.add('filter-tab-active', 'bg-[#0a0a0a]', 'text-white');
      state.activeGenderFilter = tab.dataset.gender;
      renderProducts();
    });
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }
}

// --- PRODUCT GRID & SLIDERS RENDERING ---
function renderProducts() {
  const mustHaveTrack = document.getElementById('must-have-slider-track');
  const menTrack = document.getElementById('men-slider-track');
  const womenTrack = document.getElementById('women-slider-track');
  const archiveTrack = document.getElementById('archive-slider-track');
  const outdoorTrack = document.getElementById('outdoor-slider-track');
  const allProductsContainer = document.getElementById('all-products-grid');

  let filtered = [...PRODUCTS_DATA];

  // Gender filter
  if (state.activeGenderFilter !== 'all') {
    filtered = filtered.filter(p => p.gender === state.activeGenderFilter || p.gender === 'unisex');
  }

  // Sorting
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // 1. MUST HAVE SLIDER
  // MEN EXCLUSIVE COLLECTION SLIDER
  if (menTrack) {
    const menItems = PRODUCTS_DATA.filter(p => p.gender === 'men' || p.section === 'men-collection');
    menTrack.innerHTML = menItems.map(p => '<div class="slider-item">' + createProductCardHtml(p) + '</div>').join('');
  }

  // WOMEN EXCLUSIVE COLLECTION SLIDER
  if (womenTrack) {
    const womenItems = PRODUCTS_DATA.filter(p => p.gender === 'women' || p.section === 'women-collection');
    womenTrack.innerHTML = womenItems.map(p => '<div class="slider-item">' + createProductCardHtml(p) + '</div>').join('');
  }

  if (mustHaveTrack) {
    const mustHaveItems = filtered.filter(p => p.section === 'must-have');
    mustHaveTrack.innerHTML = mustHaveItems.map(p => `
      <div class="slider-item">
        ${createProductCardHtml(p)}
      </div>
    `).join('');
  }

  // 2. ARCHIVE ICONIC DROPS SLIDER (The 4 user uploaded shoes)
  if (archiveTrack) {
    const archiveItems = filtered.filter(p => [
      'core-fatlace-superstar',
      'core-oldskool-canvas',
      'core-air-stride-retro',
      'core-shell-superstar-black'
    ].includes(p.id));
    archiveTrack.innerHTML = (archiveItems.length > 0 ? archiveItems : filtered.slice(0, 4)).map(p => `
      <div class="slider-item">
        ${createProductCardHtml(p)}
      </div>
    `).join('');
  }

  // 3. OUTDOOR LAWN SLIDER
  if (outdoorTrack) {
    const outdoorItems = filtered.filter(p => p.section === 'earth-tones');
    outdoorTrack.innerHTML = (outdoorItems.length > 0 ? outdoorItems : filtered.slice(4, 7)).map(p => `
      <div class="slider-item">
        ${createProductCardHtml(p)}
      </div>
    `).join('');
  }

  // 4. Complete Deep Tone Silhouettes Collection Grid
  if (allProductsContainer) {
    allProductsContainer.innerHTML = filtered.map(p => createProductCardHtml(p)).join('');
  }

  bindCardInteractions();
}

// Generates Product Card HTML (CLEAN: No black text overlaying the shoe photos)
function createProductCardHtml(product) {
  const currentImgIdx = state.cardImageIndices[product.id] || 0;
  const isWishlisted = state.wishlist.includes(product.id);

  // In-Card Slides Track with photos
  const slidesHtml = product.images.map((imgUrl, idx) => `
    <img 
      src="${resolveGoogleDriveImageUrl(imgUrl)}" 
      alt="${product.name} Angle ${idx + 1}" 
      class="card-slide-image" 
      ${idx === 0 ? '' : 'loading="lazy"'}
      onerror="this.onerror=null; this.style.background='#f5f5f5'; this.style.padding='20%'; this.style.objectFit='contain'; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%23f5f5f5%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 font-size=%228%22 fill=%22%23999%22%3ECORE%3C/text%3E%3C/svg%3E'" 
    />
  `).join('');

  // Pagination dots
  const dotsHtml = product.images.map((img, idx) => `
    <span class="card-dot ${idx === currentImgIdx ? 'active' : ''}" data-product-id="${product.id}" data-idx="${idx}" title="Slide to angle ${idx + 1}"></span>
  `).join('');

  return `
    <div class="shoe-card group cursor-pointer" data-product-id="${product.id}" onclick="openQuickView('${product.id}')">
      
      <!-- Pure Unobstructed Media Viewport (NO text overlaying the photo!) -->
      <div class="shoe-card-media relative">
        
        <!-- Sliding Track -->
        <div class="card-slides-track" id="card-track-${product.id}" style="transform: translateX(-${currentImgIdx * 100}%)">
          ${slidesHtml}
        </div>

        <!-- In-Card Left / Right Hover Slide Arrows -->
        <button class="card-slide-arrow prev" onclick="slideCardImage('${product.id}', -1, event)" title="Previous photo">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button class="card-slide-arrow next" onclick="slideCardImage('${product.id}', 1, event)" title="Next photo">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
        </button>

        <!-- Carousel Pagination Dots -->
        <div class="card-dots-indicator" onclick="event.stopPropagation()">
          ${dotsHtml}
        </div>

        <!-- Quick View Pill Button on Hover -->
        <div class="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
          <button onclick="event.stopPropagation(); openQuickView('${product.id}')" class="w-full py-2.5 bg-[#0a0a0a] hover:bg-[#000000] text-white text-xs font-display font-bold uppercase tracking-wider rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5">
            <span>Quick View & Sizes</span>
          </button>
        </div>
      </div>

      <!-- Clean Product Details Neatly Formatted BELOW Image -->
      <div class="p-2 sm:p-5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <div class="flex items-start justify-between gap-1 mb-1">
            <span class="text-[9px] sm:text-[11px] font-mono-code font-bold uppercase text-[#0a0a0a] tracking-wider block truncate">
              ${product.gender} • ${product.category}
            </span>
            <button class="wishlist-btn p-0.5 text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0" onclick="toggleWishlist('${product.id}', event)" title="Save to wishlist">
              <svg class="w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'currentColor'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <h3 class="font-display text-[11px] sm:text-base font-bold text-neutral-900 group-hover:text-[#0a0a0a] transition-colors leading-tight mb-1 sm:mb-3 line-clamp-2">
            ${product.name}
          </h3>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pt-1.5 sm:pt-3 border-t border-neutral-100 mt-1 gap-0.5 sm:gap-2">
          <div class="flex items-baseline gap-1 sm:gap-2 flex-wrap">
            <span class="font-mono-code font-bold text-xs sm:text-base text-[#0a0a0a]">
              ${formatPrice(product.price)}
            </span>
            <span class="text-[9px] sm:text-xs font-mono-code text-neutral-400 line-through">
              ${formatPrice(product.originalPrice)}
            </span>
          </div>
          <span class="hidden md:inline-block text-[11px] font-mono-code font-bold text-[#0a0a0a] bg-neutral-100 px-2 py-0.5 rounded-full group-hover:bg-[#0a0a0a] group-hover:text-white transition-all">
            View Pair
          </span>
        </div>
      </div>

    </div>
  `;
}

// In-Card Image Sliding Function
function slideCardImage(productId, delta, event) {
  if (event) event.stopPropagation();
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product || !product.images || product.images.length <= 1) return;

  const totalImages = product.images.length;
  let currentIndex = state.cardImageIndices[productId] || 0;
  currentIndex = (currentIndex + delta + totalImages) % totalImages;
  state.cardImageIndices[productId] = currentIndex;

  updateCardSlideView(productId, totalImages);
}

function updateCardSlideView(productId, totalOverride) {
  const currentIndex = state.cardImageIndices[productId] || 0;
  // Update ALL matching cards on page (category sliders + main grid)
  document.querySelectorAll(`.shoe-card[data-product-id="${productId}"]`).forEach(card => {
    const track = card.querySelector('.card-slides-track');
    if (track) {
      // Count actual images in the track for safety
      const imgs = track.querySelectorAll('.card-slide-image');
      const total = totalOverride || imgs.length;
      if (total > 0 && currentIndex < total) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }
    card.querySelectorAll('.card-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  });
}

function bindCardInteractions() {
  document.querySelectorAll('.card-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = dot.dataset.productId;
      const idx = parseInt(dot.dataset.idx, 10);
      state.cardImageIndices[pId] = idx;
      updateCardSlideView(pId);
    });
  });

  document.querySelectorAll('.shoe-card-media').forEach(media => {
    let touchStartX = 0;
    let touchEndX = 0;

    media.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    media.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const card = media.closest('.shoe-card');
      if (!card) return;
      const pId = card.dataset.productId;
      if (touchStartX - touchEndX > 40) {
        slideCardImage(pId, 1, e);
      } else if (touchEndX - touchStartX > 40) {
        slideCardImage(pId, -1, e);
      }
    }, { passive: true });
  });
}

// --- LOOKBOOK REELS SLIDER WITH CONTINUOUS AUTOPLAY & ZERO CLUTTER ---
function renderReels() {
  const reelsTrack = document.getElementById('reels-slider-track');
  if (!reelsTrack) return;

  reelsTrack.innerHTML = REELS_DATA.map(reel => `
    <div class="reel-video-card group" onclick="openReelModal('${reel.id}')">
      <!-- Clean HTML5 video element with continuous autoplay, muted, looping -->
      <video 
        src="${reel.video}" 
        poster="${reel.thumbnail}" 
        autoplay 
        playsinline 
        muted 
        loop 
        preload="auto"
        class="w-full h-full object-cover"
      ></video>

      <!-- Clean minimal overlay: NO "video reel" or "autoplay" badges! -->
      <div class="reel-clean-overlay">
        <div>
          <span class="text-[10px] font-mono-code font-bold tracking-widest uppercase text-neutral-400 block mb-1">${reel.subtitle}</span>
          <h4 class="font-display text-sm font-bold leading-tight text-white uppercase">${reel.title}</h4>
          <div class="mt-2 flex items-center justify-between text-[11px] pt-2 border-t border-white/20 text-white/90">
            <span class="font-medium">${reel.productName}</span>
            <span class="font-mono-code font-bold text-white bg-[#0a0a0a] px-2 py-0.5 rounded">${reel.productPrice}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}
// --- REELS / LOOKBOOK VIDEO SECTION AUTOSCROLL (RIGHT-BY-RIGHT) ---
function initReelsAutoScroll() {
  const track = document.getElementById('reels-slider-track');
  if (!track) return;

  let currentIdx = 0;
  let timer = null;

  function advance() {
    const cards = track.querySelectorAll('.reel-video-card');
    if (!cards || cards.length === 0) return;

    currentIdx = (currentIdx + 1) % cards.length;
    const targetCard = cards[currentIdx];
    const targetLeft = targetCard.offsetLeft - track.offsetLeft;

    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });
  }

  function start() {
    stop();
    timer = setInterval(advance, 3200);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  // Sync index when user manually swipes
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const cards = track.querySelectorAll('.reel-video-card');
      if (!cards.length) return;
      let minDiff = Infinity;
      let closestIdx = 0;
      cards.forEach((card, idx) => {
        const diff = Math.abs((card.offsetLeft - track.offsetLeft) - track.scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      currentIdx = closestIdx;
    }, 120);
  }, { passive: true });

  track.addEventListener('touchstart', stop, { passive: true });
  track.addEventListener('touchend', () => {
    setTimeout(start, 4000);
  }, { passive: true });

  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);

  start();
}


// --- FAQ ACCORDION ---
function renderFaqs() {
  const faqContainer = document.getElementById('faq-accordion');
  if (!faqContainer) return;

  faqContainer.innerHTML = FAQS_DATA.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}">
      <button class="faq-header" onclick="toggleFaq(this)">
        <span>${faq.question}</span>
        <svg class="faq-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      <div class="faq-content">
        <p class="text-neutral-600">${faq.answer}</p>
      </div>
    </div>
  `).join('');
}
// --- REELS / LOOKBOOK VIDEO SECTION AUTOSCROLL ---
function initReelsAutoScroll() {
  const track = document.getElementById('reels-slider-track');
  if (!track) return;

  let autoScrollTimer = null;

  function step() {
    if (!track) return;
    const card = track.firstElementChild;
    const scrollStep = card ? card.getBoundingClientRect().width + 16 : 250;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollStep, behavior: 'smooth' });
    }
  }

  function start() {
    stop();
    autoScrollTimer = setInterval(step, 3800);
  }

  function stop() {
    if (autoScrollTimer) clearInterval(autoScrollTimer);
  }

  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);
  track.addEventListener('touchstart', stop, { passive: true });
  track.addEventListener('touchend', () => {
    setTimeout(start, 5000);
  }, { passive: true });

  start();
}


function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) {
    item.classList.add('open');
  }
}

// --- QUICK VIEW MODAL ---
function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  state.activeQuickViewProduct = product;
  const modal = document.getElementById('quick-view-modal');
  const modalContent = document.getElementById('quick-view-content');
  if (!modal || !modalContent) return;

  let selectedSize = product.sizes[0];
  let selectedColor = product.colors[0]?.name || '';
  let activeImg = resolveGoogleDriveImageUrl(product.images[0]);

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-6 md:p-8">
      <!-- Image Gallery -->
      <div class="space-y-4">
        <div class="aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <img id="qv-main-img" src="${activeImg}" alt="${product.name}" class="w-full h-full object-cover" />
        </div>
        <div class="grid grid-cols-3 gap-3">
          ${product.images.map((img, i) => `
            <div class="aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? 'border-[#0a0a0a]' : 'border-neutral-200 hover:border-[#0a0a0a]'}" onclick="setQuickViewImage('${img}', this)">
              <img src="${resolveGoogleDriveImageUrl(img)}" alt="Angle ${i+1}" class="w-full h-full object-cover" />
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Product Details & Sizing -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono-code uppercase tracking-wider font-bold text-[#0a0a0a]">${product.gender.toUpperCase()} • ${product.category.toUpperCase()}</span>
            <span class="text-xs font-mono-code bg-neutral-100 text-[#0a0a0a] border border-neutral-300 px-2.5 py-1 rounded-full font-bold">${product.badge}</span>
          </div>

          <h2 class="font-display text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight mb-2">${product.name}</h2>
          
          <div class="flex items-baseline gap-3 mb-4">
            <span class="text-2xl font-mono-code font-bold text-[#0a0a0a]">${formatPrice(product.price)}</span>
            <span class="text-sm font-mono-code text-neutral-400 line-through">${formatPrice(product.originalPrice)}</span>
            <span class="text-xs font-mono-code bg-neutral-200 text-[#0a0a0a] px-2 py-0.5 rounded font-bold">SAVE ${Math.round((1 - product.price/product.originalPrice)*100)}%</span>
          </div>

          <p class="text-sm text-neutral-600 mb-6 leading-relaxed">${product.description}</p>

          <!-- Color Swatches -->
          <div class="mb-5">
            <label class="block text-xs font-mono-code uppercase font-bold text-neutral-700 mb-2">Color: <span id="qv-selected-color" class="font-normal text-[#0a0a0a]">${selectedColor}</span></label>
            <div class="flex gap-2.5">
              ${product.colors.map((c, idx) => `
                <button 
                  class="w-8 h-8 rounded-full border-2 transition-all ${idx === 0 ? 'border-[#0a0a0a] scale-110 shadow-md' : 'border-neutral-300 hover:border-[#0a0a0a]'}" 
                  style="background-color: ${c.hex}" 
                  title="${c.name}"
                  onclick="selectColor('${c.name}', this)"
                ></button>
              `).join('')}
            </div>
          </div>

          <!-- Size Selector with Size Guide -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <label class="text-xs font-mono-code uppercase font-bold text-neutral-700">Select Shoe Size</label>
              <button onclick="openSizeGuide()" class="text-xs font-mono-code text-[#0a0a0a] underline hover:text-[#000000]">Size Guide (EU/UK)</button>
            </div>
            <div class="grid grid-cols-4 gap-2">
              ${product.sizes.map((sz, idx) => `
                <button 
                  class="qv-size-btn py-2.5 rounded-xl border text-xs font-mono-code font-bold transition-all ${idx === 0 ? 'bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-md' : 'border-neutral-300 text-neutral-800 hover:border-[#0a0a0a]'}"
                  onclick="selectSize('${sz}', this)"
                >${sz}</button>
              `).join('')}
            </div>
            <p class="text-[11px] font-mono-code text-blue-700 mt-2 flex items-center gap-1.5 font-bold">
              <span class="w-2 h-2 rounded-full bg-[#0a0a0a] animate-ping"></span> In stock — Ready for immediate dispatch
            </p>
          </div>

          <!-- Specs list -->
          <div class="border-t border-neutral-200 pt-4 mb-6 space-y-1.5 text-xs text-neutral-600">
            ${product.details.map(d => `<div class="flex items-center gap-2"><span class="text-[#0a0a0a]">✦</span> ${d}</div>`).join('')}
          </div>
        </div>

        <!-- Actions: Direct WhatsApp Buy Now + Add to Bag -->
        <div class="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-2.5">
          <button 
            onclick="buyNowWhatsApp('${product.id}', selectedQuickViewSize, selectedQuickViewColor)" 
            class="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12.004 0C5.372 0 0 5.373 0 12c0 2.115.548 4.103 1.512 5.836L.055 24l6.334-1.45A11.936 11.936 0 0012.004 24C18.628 24 24 18.627 24 12 24 5.373 18.628 0 12.004 0zm.015 21.84c-1.85 0-3.6-.502-5.12-1.373l-.367-.21-3.765.862.879-3.668-.23-.377a9.835 9.835 0 01-1.503-5.074c0-5.43 4.417-9.847 9.856-9.847 5.438 0 9.855 4.417 9.855 9.847 0 5.43-4.417 9.84-9.855 9.84zm5.405-7.378c-.296-.149-1.754-.866-2.026-.965-.272-.099-.47-.148-.668.149-.197.297-.767.965-.94 1.163-.173.198-.346.223-.643.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.297-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            <span>Order via WhatsApp</span>
          </button>

          <button 
            id="qv-add-cart-btn"
            onclick="addToCart('${product.id}', selectedQuickViewSize, selectedQuickViewColor)" 
            class="py-3.5 px-5 bg-[#0a0a0a] hover:bg-[#000000] text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span>Add to Bag</span>
          </button>

          <button onclick="toggleWishlist('${product.id}')" class="p-3.5 border border-neutral-300 hover:border-[#0a0a0a] hover:text-[#0a0a0a] rounded-2xl transition-all flex items-center justify-center">
            <svg class="w-5 h-5 ${state.wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-neutral-800'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  window.selectedQuickViewSize = selectedSize;
  window.selectedQuickViewColor = selectedColor;
  modal.classList.remove('hidden');
}

function setQuickViewImage(imgUrl, el) {
  const mainImg = document.getElementById('qv-main-img');
  if (mainImg) mainImg.src = resolveGoogleDriveImageUrl(imgUrl);
  el.parentElement.querySelectorAll('div').forEach(d => d.className = 'aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all border-neutral-200 hover:border-[#0a0a0a]');
  el.className = 'aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all border-[#0a0a0a] shadow-md';
}

function selectSize(sizeStr, el) {
  window.selectedQuickViewSize = sizeStr;
  document.querySelectorAll('.qv-size-btn').forEach(b => {
    b.className = 'qv-size-btn py-2.5 rounded-xl border text-xs font-mono-code font-bold transition-all border-neutral-300 text-neutral-800 hover:border-[#0a0a0a]';
  });
  el.className = 'qv-size-btn py-2.5 rounded-xl border text-xs font-mono-code font-bold transition-all bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-md';
}

function selectColor(colorName, el) {
  window.selectedQuickViewColor = colorName;
  const label = document.getElementById('qv-selected-color');
  if (label) label.innerText = colorName;
  el.parentElement.querySelectorAll('button').forEach(b => b.className = 'w-8 h-8 rounded-full border-2 transition-all border-neutral-300 hover:border-[#0a0a0a]');
  el.className = 'w-8 h-8 rounded-full border-2 transition-all border-[#0a0a0a] scale-110 shadow-md';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) modal.classList.add('hidden');
}

// --- CART STATE MANAGEMENT ---
function addToCart(productId, size, color) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const chosenSize = size || product.sizes[0];
  const chosenColor = color || product.colors[0]?.name || 'Standard';

  const existingIdx = state.cart.findIndex(item => item.id === productId && item.size === chosenSize && item.color === chosenColor);

  if (existingIdx > -1) {
    state.cart[existingIdx].quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      gender: product.gender,
      image: product.images[0],
      size: chosenSize,
      color: chosenColor,
      quantity: 1
    });
  }

  saveCart();
  updateCartBadge();
  closeQuickView();
  openCartDrawer();
  showToast(`Added ${product.name} (${chosenSize}) to Bag`);
}

function updateCartQty(idx, delta) {
  if (!state.cart[idx]) return;
  state.cart[idx].quantity += delta;
  if (state.cart[idx].quantity <= 0) {
    state.cart.splice(idx, 1);
  }
  saveCart();
  renderCartDrawerItems();
  updateCartBadge();
}

function removeCartItem(idx) {
  state.cart.splice(idx, 1);
  saveCart();
  renderCartDrawerItems();
  updateCartBadge();
  showToast('Item removed from Bag');
}

function saveCart() {
  localStorage.setItem('core_cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.innerText = totalCount;
    badge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
  });
}

// --- CART DRAWER UI ---
function openCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer-panel');
  if (!backdrop || !panel) return;

  renderCartDrawerItems();
  backdrop.classList.add('active');
  panel.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer-panel');
  if (backdrop) backdrop.classList.remove('active');
  if (panel) panel.classList.remove('active');
  document.body.style.overflow = '';
}

function renderCartDrawerItems() {
  const container = document.getElementById('cart-items-container');
  const summaryContainer = document.getElementById('cart-summary-container');
  const emptyState = document.getElementById('cart-empty-state');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    if (summaryContainer) summaryContainer.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (summaryContainer) summaryContainer.classList.remove('hidden');

  let subtotal = 0;

  container.innerHTML = state.cart.map((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="flex gap-4 py-4 border-b border-neutral-100">
        <div class="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <h4 class="font-display text-sm font-bold uppercase text-neutral-900 leading-tight">${item.name}</h4>
              <button onclick="removeCartItem(${idx})" class="text-neutral-400 hover:text-[#0a0a0a] transition-colors" title="Remove">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div class="text-[11px] font-mono-code text-neutral-500 mt-1">
              <span>Size: ${item.size}</span> • <span>${item.color}</span>
            </div>
          </div>

          <div class="flex justify-between items-center mt-2">
            <div class="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
              <button onclick="updateCartQty(${idx}, -1)" class="px-2.5 py-1 text-xs hover:bg-neutral-100 text-[#0a0a0a] font-bold">-</button>
              <span class="px-2.5 text-xs font-mono-code font-bold">${item.quantity}</span>
              <button onclick="updateCartQty(${idx}, 1)" class="px-2.5 py-1 text-xs hover:bg-neutral-100 text-[#0a0a0a] font-bold">+</button>
            </div>
            <span class="font-mono-code font-bold text-sm text-[#0a0a0a]">${formatPrice(itemTotal)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const freeShippingThreshold = 2499;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const shippingBar = document.getElementById('free-shipping-bar');
  const shippingText = document.getElementById('free-shipping-text');
  if (shippingBar && shippingText) {
    shippingBar.style.width = `${freeShippingProgress}%`;
    if (remainingForFreeShipping === 0) {
      shippingText.innerHTML = `ðŸŽ‰ <strong>Congratulations!</strong> You qualified for FREE Express Delivery!`;
      shippingBar.className = 'h-full bg-emerald-500 transition-all duration-500 rounded-full';
    } else {
      shippingText.innerHTML = `Add <strong>${formatPrice(remainingForFreeShipping)}</strong> more for <strong>FREE EXPRESS DELIVERY</strong>`;
      shippingBar.className = 'h-full bg-[#0a0a0a] transition-all duration-500 rounded-full';
    }
  }

  let discount = 0;
  if (state.appliedPromo === 'CORE10') {
    discount = Math.round(subtotal * 0.10);
  }

  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 250;
  const grandTotal = subtotal - discount + (subtotal > 0 ? shippingCost : 0);

  const subtotalElem = document.getElementById('cart-subtotal');
  const discountElem = document.getElementById('cart-discount');
  const discountRow = document.getElementById('cart-discount-row');
  const shippingElem = document.getElementById('cart-shipping');
  const totalElem = document.getElementById('cart-grand-total');

  if (subtotalElem) subtotalElem.innerText = formatPrice(subtotal);
  if (discountElem && discountRow) {
    if (discount > 0) {
      discountRow.classList.remove('hidden');
      discountElem.innerText = `-${formatPrice(discount)}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }
  if (shippingElem) shippingElem.innerText = shippingCost === 0 ? 'FREE' : formatPrice(shippingCost);
  if (totalElem) totalElem.innerText = formatPrice(grandTotal);
}

function applyPromoCode() {
  const input = document.getElementById('promo-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'CORE10') {
    state.appliedPromo = 'CORE10';
    showToast('Promo code "CORE10" applied (10% OFF)');
    renderCartDrawerItems();
  } else {
    showToast('Invalid promo code. Try "CORE10"');
  }
}

// --- WHATSAPP CHECKOUT DIRECT FLOW ---
const CORE_WHATSAPP_NUMBER = '916238469390';

function checkoutViaWhatsApp() {
  if (!state.cart || state.cart.length === 0) {
    showToast('Your bag is empty!');
    return;
  }

  let subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = state.appliedPromo === 'CORE10' ? Math.round(subtotal * 0.10) : 0;
  let shipping = subtotal >= 2499 ? 0 : 250;
  let total = subtotal - discount + shipping;

  let msg = `*NEW ORDER - CORE FOOTWEAR*\n`;
  msg += `------------------------------------\n`;
  state.cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}*\n`;
    msg += `   - Size: ${item.size || 'Standard'}\n`;
    if (item.color) msg += `   - Color: ${item.color}\n`;
    msg += `   - Qty: ${item.quantity}\n`;
    msg += `   - Price: Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
  });
  msg += `------------------------------------\n`;
  msg += `Subtotal: Rs. ${subtotal.toLocaleString('en-IN')}\n`;
  if (discount > 0) msg += `Discount (CORE10): -Rs. ${discount.toLocaleString('en-IN')}\n`;
  msg += `Shipping: ${shipping === 0 ? 'FREE Express' : 'Rs. ' + shipping}\n`;
  msg += `*Total Amount: Rs. ${total.toLocaleString('en-IN')}*\n`;
  msg += `------------------------------------\n`;
  msg += `Please confirm my order and share delivery details!`;

  const waUrl = `https://wa.me/${CORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function buyNowWhatsApp(productId, size, color) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  const selSize = size || product.sizes[0] || 'Standard';
  const selColor = color || product.colors[0]?.name || '';

  let msg = `*ORDER INQUIRY - CORE FOOTWEAR*\n`;
  msg += `------------------------------------\n`;
  msg += `I would like to purchase:\n`;
  msg += `👟 *${product.name}*\n`;
  msg += `- Size: ${selSize}\n`;
  if (selColor) msg += `- Color: ${selColor}\n`;
  msg += `- Price: Rs. ${product.price.toLocaleString('en-IN')}\n`;
  msg += `------------------------------------\n`;
  msg += `Please confirm availability and dispatch!`;

  const waUrl = `https://wa.me/${CORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('hidden');
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-order-summary');
  if (!container) return;

  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  let subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = state.appliedPromo === 'CORE10' ? Math.round(subtotal * 0.10) : 0;
  let shipping = subtotal >= 2499 ? 0 : 250;
  let total = subtotal - discount + shipping;

  container.innerHTML = `
    <div class="border-b border-neutral-200 pb-3 mb-3">
      <div class="text-xs font-mono-code font-bold uppercase text-[#0a0a0a] mb-2">Order Items (${totalCount})</div>
      <div class="max-h-40 overflow-y-auto space-y-2 pr-2">
        ${state.cart.map(item => `
          <div class="flex justify-between text-xs">
            <span class="text-neutral-700 font-medium">${item.name} (${item.size}) Ã— ${item.quantity}</span>
            <span class="font-mono-code font-bold text-[#0a0a0a]">${formatPrice(item.price * item.quantity)}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="space-y-1.5 text-xs font-mono-code">
      <div class="flex justify-between text-neutral-600"><span>Subtotal:</span><span>${formatPrice(subtotal)}</span></div>
      ${discount > 0 ? `<div class="flex justify-between text-emerald-600 font-bold"><span>Promo Discount (CORE10):</span><span>-${formatPrice(discount)}</span></div>` : ''}
      <div class="flex justify-between text-neutral-600"><span>Shipping:</span><span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
      <div class="flex justify-between text-base font-bold text-[#0a0a0a] border-t border-neutral-200 pt-2 mt-2">
        <span>Total Payable:</span><span>${formatPrice(total)}</span>
      </div>
    </div>
  `;
}

function processCheckoutOrder(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const address = form.address.value.trim();
  const city = form.city.value.trim();
  const payment = form.payment.value;

  if (!name || !phone || !address || !city) {
    alert('Please fill out all shipping details.');
    return;
  }

  const orderId = 'CORE-' + Math.floor(100000 + Math.random() * 900000);

  const modalContent = document.getElementById('checkout-modal-body');
  if (modalContent) {
    modalContent.innerHTML = `
      <div class="text-center py-10 px-4">
        <div class="w-16 h-16 bg-neutral-200 text-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 class="font-display text-2xl font-black uppercase text-neutral-900 mb-1">Order Confirmed!</h2>
        <p class="text-xs font-mono-code text-neutral-500 mb-6">Tracking Number: <strong class="text-[#0a0a0a]">${orderId}</strong></p>
        
        <div class="bg-neutral-100/50 border border-neutral-300 rounded-2xl p-5 text-left text-xs max-w-md mx-auto mb-6 space-y-2">
          <div class="flex justify-between"><strong>Recipient:</strong> <span>${name}</span></div>
          <div class="flex justify-between"><strong>Phone:</strong> <span>${phone}</span></div>
          <div class="flex justify-between"><strong>Delivery to:</strong> <span>${address}, ${city}</span></div>
          <div class="flex justify-between"><strong>Payment Mode:</strong> <span class="uppercase font-bold text-[#0a0a0a]">${payment}</span></div>
          <div class="flex justify-between border-t border-neutral-300 pt-2 font-bold text-neutral-900 text-sm">
            <span>Estimated Delivery:</span> <span>2 - 4 Business Days</span>
          </div>
        </div>

        <div class="flex gap-3 justify-center">
          <button onclick="window.print()" class="pill-btn pill-btn-outline text-xs">Print Receipt</button>
          <button onclick="finishCheckout()" class="pill-btn text-xs">Continue Shopping</button>
        </div>
      </div>
    `;
  }

  state.cart = [];
  saveCart();
  updateCartBadge();
  showToast(`Order #${orderId} placed successfully!`);
}

function finishCheckout() {
  closeCheckoutModal();
  location.reload();
}

// --- REELS MODAL WITH REAL MP4 VIDEO CONTROLS ---
function openReelModal(reelId) {
  const reel = REELS_DATA.find(r => r.id === reelId);
  if (!reel) return;

  state.activeReel = reel;
  const modal = document.getElementById('reel-modal');
  const container = document.getElementById('reel-modal-container');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-5 text-white border-2 border-[#0a0a0a]">
      
      <!-- Real MP4 Video Element -->
      <video 
        id="modal-reel-video"
        src="${reel.video}" 
        autoplay 
        loop 
        playsinline
        class="absolute inset-0 w-full h-full object-cover"
      ></video>
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none"></div>

      <!-- Top Story Progress Bar & Header -->
      <div class="relative z-10 space-y-3">
        <div class="w-full bg-white/30 h-1 rounded-full overflow-hidden">
          <div class="bg-[#0a0a0a] h-full animate-[marquee_5s_linear_infinite]" style="width: 70%"></div>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] animate-ping"></span>
            <span class="font-display font-bold text-xs uppercase tracking-widest text-white">CORE</span>
          </div>
          <div class="flex items-center gap-2">
            <!-- Sound toggle button -->
            <button onclick="toggleReelAudio(this)" class="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#0a0a0a] transition-colors" title="Toggle Sound">
              <svg id="reel-sound-icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            </button>
            <button onclick="closeReelModal()" class="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black transition-colors">
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Reel Bottom Info & Shop Product Pill -->
      <div class="relative z-10 space-y-4">
        <div>
          <span class="text-[11px] font-mono-code font-bold tracking-widest uppercase text-neutral-400 block mb-1">${reel.subtitle}</span>
          <h3 class="font-display text-xl font-black uppercase text-white leading-tight">${reel.title}</h3>
          <p class="text-xs text-neutral-200 mt-2 leading-relaxed">${reel.description}</p>
        </div>

        <div class="bg-white/95 backdrop-blur-md text-neutral-900 p-3.5 rounded-2xl flex items-center justify-between shadow-xl border border-neutral-300">
          <div>
            <div class="text-xs font-display font-bold uppercase">${reel.productName}</div>
            <div class="text-xs font-mono-code font-bold text-[#0a0a0a]">${reel.productPrice}</div>
          </div>
          <button onclick="closeReelModal(); openQuickView('${reel.productLinked}')" class="pill-btn py-2 px-4 text-xs font-bold">
            Shop Pair
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function toggleReelAudio(btn) {
  const vid = document.getElementById('modal-reel-video');
  if (!vid) return;
  vid.muted = !vid.muted;
  btn.classList.toggle('bg-[#0a0a0a]', !vid.muted);
}

function closeReelModal() {
  const modal = document.getElementById('reel-modal');
  const vid = document.getElementById('modal-reel-video');
  if (vid) vid.pause();
  if (modal) modal.classList.add('hidden');
}

// --- SEARCH DRAWER ---
function openSearchDrawer() {
  const drawer = document.getElementById('search-drawer');
  if (drawer) {
    drawer.classList.remove('hidden');
    document.getElementById('search-input')?.focus();
  }
}

function closeSearchDrawer() {
  const drawer = document.getElementById('search-drawer');
  if (drawer) drawer.classList.add('hidden');
}

function handleSearch(query) {
  const container = document.getElementById('search-results');
  if (!container) return;

  const q = query.trim().toLowerCase();
  if (q.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 text-neutral-400 font-mono-code text-xs uppercase">
        Type to search across Men's & Women's footwear
      </div>
    `;
    return;
  }

  const results = PRODUCTS_DATA.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.gender.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    container.innerHTML = `<div class="text-center py-10 text-neutral-500 font-mono-code text-xs">No silhouettes match "${query}". Try 'runner', 'boots', 'fat-lace' or 'women'.</div>`;
    return;
  }

  container.innerHTML = results.map(p => `
    <div class="flex items-center gap-4 p-3 hover:bg-neutral-100/60 rounded-xl cursor-pointer transition-colors" onclick="closeSearchDrawer(); openQuickView('${p.id}')">
      <img src="${p.images[0]}" alt="${p.name}" class="w-14 h-14 object-cover rounded-lg bg-neutral-100 border border-neutral-200" />
      <div class="flex-1">
        <h4 class="font-display text-sm font-bold uppercase text-neutral-900 leading-tight">${p.name}</h4>
        <span class="text-[11px] font-mono-code text-[#0a0a0a] uppercase font-bold">${p.gender} • ${p.category}</span>
      </div>
      <span class="font-mono-code font-bold text-sm text-[#0a0a0a]">${formatPrice(p.price)}</span>
    </div>
  `).join('');
}
// --- REELS / LOOKBOOK VIDEO SECTION AUTOSCROLL ---
function initReelsAutoScroll() {
  const track = document.getElementById('reels-slider-track');
  if (!track) return;

  let autoScrollTimer = null;

  function step() {
    if (!track) return;
    const card = track.firstElementChild;
    const scrollStep = card ? card.getBoundingClientRect().width + 16 : 250;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollStep, behavior: 'smooth' });
    }
  }

  function start() {
    stop();
    autoScrollTimer = setInterval(step, 3800);
  }

  function stop() {
    if (autoScrollTimer) clearInterval(autoScrollTimer);
  }

  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);
  track.addEventListener('touchstart', stop, { passive: true });
  track.addEventListener('touchend', () => {
    setTimeout(start, 5000);
  }, { passive: true });

  start();
}


// --- WISHLIST MANAGEMENT ---
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();
  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.push(productId);
    showToast('Saved to wishlist');
  }
  localStorage.setItem('core_wishlist', JSON.stringify(state.wishlist));
  renderProducts();
}

// --- CURRENCY SELECTOR ---
function setupCurrencySelector() {
  const select = document.getElementById('currency-selector');
  if (select) {
    select.value = state.currentCurrency;
    select.addEventListener('change', (e) => {
      state.currentCurrency = e.target.value;
      renderProducts();
      renderCartDrawerItems();
      showToast(`Switched currency to ${state.currentCurrency}`);
    });
  }
}

// --- SIZE GUIDE MODAL ---
function openSizeGuide() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeSizeGuide() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) modal.classList.add('hidden');
}

// --- TOAST ENGINE ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="text-white">✦</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// --- EVENT LISTENERS SETUP ---
function setupEventListeners() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-panel');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (mobileNav && !mobileNav.classList.contains('hidden')) {
        if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
          mobileNav.classList.add('hidden');
        }
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      closeCartDrawer();
      closeSearchDrawer();
      closeReelModal();
      closeCheckoutModal();
      closeSizeGuide();
    }
  });
}



// --- BRAND CLICK HANDLER ---
function handleBrandClick(brand) {
  console.log('Brand clicked:', brand);
  // TODO: implement brand filtering
  showToast(`Brand ${brand} clicked (filter not implemented)`);
}
