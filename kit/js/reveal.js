/** Fades .reveal sections in the first time they enter the viewport (also triggers their highlighter).
 *  Needs <html class="js"> so content stays visible without JavaScript. */
export function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}
