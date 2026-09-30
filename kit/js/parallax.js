import { finePointer, prefersReducedMotion, rafThrottle } from './prefs.js';

/** Max offset of the dot grid, in px, when the pointer reaches a screen edge. */
const RANGE = 12;

/** A [data-parallax] layer drifts slightly against the pointer (desktop only). */
export function initParallax() {
  const grid = document.querySelector('[data-parallax]');
  if (!grid || prefersReducedMotion || !finePointer) return;
  const move = rafThrottle((x, y) => {
    grid.style.translate = `${(x / innerWidth - 0.5) * RANGE}px ${(y / innerHeight - 0.5) * RANGE}px`;
  });
  addEventListener('pointermove', (e) => move(e.clientX, e.clientY), { passive: true });
}
