/**
 * CORE SNEAKERS — Animation Engine
 * GSAP ScrollTrigger-based cinematic scroll sequence
 */

// ============================================================
// HERO OPENING ANIMATION (on load)
// ============================================================
function initHeroOpeningAnimation() {
  const logo = document.querySelector('.hero-logo');
  const scrollHint = document.querySelector('.scroll-hint');
  const glow = document.querySelector('.hero-logo-glow');

  if (!logo) return;

  // Initial state
  gsap.set(logo, { opacity: 0, scale: 0.94 });
  gsap.set(scrollHint, { opacity: 0 });

  // Opening timeline
  const tl = gsap.timeline({ delay: 0.3 });

  tl.to(logo, {
    opacity: 1,
    scale: 1,
    duration: 1.4,
    ease: 'power3.out'
  })
  .to(scrollHint, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.4');

  return tl;
}

// ============================================================
// SCROLL-DRIVEN HERO SEQUENCE (The signature O→Sneaker drop)
// ============================================================
function initHeroScrollSequence() {
  const heroWrapper = document.querySelector('.hero-wrapper');
  const heroSticky = document.querySelector('.hero-sticky');
  const logo = document.querySelector('.hero-logo');
  const logoWrap = document.querySelector('.hero-logo-wrap');
  const glow = document.querySelector('.hero-logo-glow');
  const scrollHint = document.querySelector('.scroll-hint');
  const sneaker = document.querySelector('.sneaker-hero-img');
  const sneakerWrap = document.querySelector('.sneaker-portal-wrap');
  const heroCopy = document.querySelector('.hero-copy');
  const nav = document.querySelector('.nav');
  const heroStickySel = '.hero-sticky';
  const oPortalCircle = document.querySelector('.o-portal circle');

  if (!heroWrapper) return;

  // Main pinned ScrollTrigger sequence
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: heroWrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      pin: heroSticky,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Update scroll progress bar
        const bar = document.querySelector('.scroll-progress');
        if (bar) gsap.set(bar, { scaleX: self.progress });
      }
    }
  });

  // SCENE 01–02: Logo reacts → 0–15% scroll
  masterTl.to(scrollHint, {
    opacity: 0,
    duration: 0.1
  }, 0)

  .to(logo, {
    scale: 1.06,
    duration: 0.15
  }, 0)

  // SCENE 03: O portal ring animates → 15–30%
  .to(oPortalCircle, {
    opacity: 0.8,
    strokeDashoffset: 0,
    duration: 0.15,
    ease: 'power2.inOut'
  }, 0.12)

  // SCENE 04: Sneaker begins to emerge → 25–45%
  .to(sneaker, {
    opacity: 1,
    y: '-120%',
    rotate: '-8deg',
    scale: 0.65,
    duration: 0.18,
    ease: 'power3.out'
  }, 0.22)

  // SCENE 05: Sneaker drops and enlarges → 40–65%
  .to(sneaker, {
    y: '0%',
    rotate: '0deg',
    scale: 1,
    duration: 0.28,
    ease: 'power2.out'
  }, 0.38)

  // SCENE 06: Sneaker rotates (3D illusion) → 55–70%
  .to(sneaker, {
    rotateY: 12,
    duration: 0.12,
    ease: 'power1.inOut'
  }, 0.55)
  .to(sneaker, {
    rotateY: -5,
    duration: 0.08,
    ease: 'power1.inOut'
  }, 0.67)
  .to(sneaker, {
    rotateY: 0,
    duration: 0.05,
    ease: 'power1.out'
  }, 0.75)

  // SCENE 07: Logo transitions away → 60–75%
  .to(logoWrap, {
    y: '-80%',
    scale: 0.55,
    opacity: 0,
    duration: 0.25,
    ease: 'power3.inOut'
  }, 0.52)

  // O portal ring fades
  .to(oPortalCircle, {
    opacity: 0,
    duration: 0.1
  }, 0.55)

  // SCENE 08: Background transitions
  .to(heroSticky, {
    background: '#080A14',
    duration: 0.25
  }, 0.5)

  // Sneaker moves to hero position
  .to(sneaker, {
    y: '-60px',
    duration: 0.12,
    ease: 'power2.out'
  }, 0.78)

  // SCENE 09: Copy reveals
  .to(heroCopy, {
    opacity: 1,
    y: 0,
    duration: 0.18,
    ease: 'power3.out'
  }, 0.8)

  // Nav appears
  .to(nav, {
    opacity: 1,
    duration: 0.1
  }, 0.78);

  // Initial states for hidden elements
  gsap.set(heroCopy, { y: 30 });
  gsap.set(oPortalCircle, { opacity: 0 });
  gsap.set(sneaker, { opacity: 0, y: '20%', scale: 0.3, rotate: '-20deg' });

  return masterTl;
}

// ============================================================
// SECTION REVEAL ANIMATIONS
// ============================================================
function initSectionReveals() {
  // Generic reveal-up elements
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Staggered reveal for grids
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: (i % 3) * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Why Core items
  gsap.utils.toArray('.why-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Section titles
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // New Drops horizontal scroll marquee
  initNewDropsScroll();
}

// ============================================================
// NEW DROPS HORIZONTAL MARQUEE
// ============================================================
function initNewDropsScroll() {
  const track = document.querySelector('.new-drops__track');
  if (!track) return;

  const cards = track.querySelectorAll('.drop-card');
  const totalWidth = track.scrollWidth - track.parentElement.clientWidth;

  gsap.to(track, {
    x: () => -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '.new-drops',
      start: 'top top',
      end: () => `+=${totalWidth * 1.2}`,
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });
}

// ============================================================
// CURSOR TRACKING
// ============================================================
function initCursor() {
  const dot = document.querySelector('.cursor__dot');
  const ring = document.querySelector('.cursor__ring');
  const cursor = document.querySelector('.cursor');

  if (!cursor || window.matchMedia('(max-width: 768px)').matches) {
    if (cursor) cursor.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(dot, { x: mouseX, y: mouseY });
  });

  // Lag ring for smooth feel
  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  // Hover states
  const hoverables = document.querySelectorAll('a, button, .product-card, .size-chip, .modal__size-chip, .drop-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  // Sneaker follows cursor subtly
  const sneaker = document.querySelector('.sneaker-hero-img');
  if (sneaker) {
    document.addEventListener('mousemove', e => {
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 18;
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(sneaker, {
        rotateY: xPercent,
        rotateX: -yPercent,
        duration: 1.2,
        ease: 'power2.out'
      });
    });
  }
}

// ============================================================
// MAGNETIC BUTTONS
// ============================================================
function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn--primary, .btn--blue, .btn--whatsapp');

  if (window.matchMedia('(max-width: 768px)').matches) return;

  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ============================================================
// MARQUEE TEXT (continuous scrolling brand text)
// ============================================================
function initMarqueeText() {
  const marquees = document.querySelectorAll('.marquee-inner');
  marquees.forEach(m => {
    gsap.to(m, {
      x: '-50%',
      duration: 18,
      ease: 'none',
      repeat: -1
    });
  });
}

// ============================================================
// INIT
// ============================================================
function initAnimations() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Set initial states
  gsap.set('.nav', { opacity: 0 });

  initCursor();
  initHeroOpeningAnimation();
  initHeroScrollSequence();

  // Delay section reveals until after critical animations
  ScrollTrigger.refresh();
  setTimeout(() => {
    initSectionReveals();
    initMagneticButtons();
    initMarqueeText();
    ScrollTrigger.refresh();
  }, 200);
}

// Export for app.js
window.initAnimations = initAnimations;
