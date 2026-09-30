import { prefersReducedMotion, rafThrottle } from './prefs.js';

/** A [data-timeline] draws itself as you scroll; each dot lights up when the line reaches it. */
export function initTimeline() {
  document.querySelectorAll('[data-timeline]').forEach((timeline) => {
    const items = [...timeline.querySelectorAll('.tl-item')];

    if (prefersReducedMotion) {
      items.forEach((item) => item.classList.add('is-lit'));
      return;
    }

    const update = () => {
      const mark = innerHeight * 0.6; // the "pen" sits at 60% of the viewport height
      const rect = timeline.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));
      timeline.style.setProperty('--tl-progress', String(progress));
      items.forEach((item) => item.classList.toggle('is-lit', item.getBoundingClientRect().top + 12 < mark));
    };
    addEventListener('scroll', rafThrottle(update), { passive: true });
    update();
  });
}
