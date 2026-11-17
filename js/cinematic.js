/**
 * CORE Cinematic Horizontal Carousel
 * ─────────────────────────────────
 * • Slides LEFT → RIGHT automatically through 3 slides, then loops.
 * • Uses requestAnimationFrame + CSS transitions for 60fps smoothness.
 * • Subtle zoom-in on each active slide for a cinematic feel.
 * • No arrows, no dots, no interaction — pure auto-play.
 */

(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────────────────────
  const SLIDE_COUNT    = 3;
  const HOLD_MS        = 2200;    // ms each slide stays visible
  const TRANSITION_MS  = 950;     // ms of the sliding transition

  // ── State ────────────────────────────────────────────────────────────────
  let currentIndex   = 0;
  let isTransitioning = false;
  let holdTimer       = null;

  // ── DOM refs ─────────────────────────────────────────────────────────────
  let track  = null;
  let slides = null;

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** Move the track to show slide `idx` */
  function goToSlide(idx) {
    if (!track) return;

    isTransitioning = true;

    // Activate zoom on new slide
    slides.forEach(function (slide, i) {
      slide.classList.toggle('c-active', i === idx);
    });

    // Slide the track: each slide is 1/3 of the full track width (300vw),
    // so slide 0 → 0%, slide 1 → -33.333%, slide 2 → -66.666%
    const pct = -(idx * (100 / SLIDE_COUNT));
    track.style.transition = 'transform ' + TRANSITION_MS + 'ms cubic-bezier(0.76, 0, 0.24, 1)';
    track.style.transform  = 'translateX(' + pct + '%)';

    currentIndex = idx;

    // After transition ends, start the hold timer for the next slide
    setTimeout(function () {
      isTransitioning = false;
      scheduleNext();
    }, TRANSITION_MS);
  }

  /** Schedule advancing to the next slide after HOLD_MS */
  function scheduleNext() {
    clearTimeout(holdTimer);
    holdTimer = setTimeout(function () {
      if (isTransitioning) return;
      var next = (currentIndex + 1) % SLIDE_COUNT;
      goToSlide(next);
    }, HOLD_MS);
  }

  /** Kick everything off once DOM is ready */
  function init() {
    track  = document.getElementById('cinematic-track');
    if (!track) return; // carousel not on this page

    slides = Array.from(track.querySelectorAll('.cinematic-slide'));
    if (!slides.length) return;

    // Activate the first slide's zoom immediately
    slides[0].classList.add('c-active');

    // No initial transition — snap to slide 0 (already at 0%)
    track.style.transition = 'none';
    track.style.transform  = 'translateX(0%)';

    // Begin the cycle
    scheduleNext();
  }

  // ── Boot ──────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Pause on tab blur, resume on focus — no wasted CPU
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearTimeout(holdTimer);
    } else {
      if (!isTransitioning) scheduleNext();
    }
  });

})();
