import { prefersReducedMotion } from './prefs.js';

/** Apply before first paint (inline in <head> to avoid a flash). Follows the OS unless the visitor chose one. */
export function applySavedTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch {
    // Storage unavailable: fall back to the system preference.
  }
  const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}

/** Light/dark toggle on [data-theme-toggle], revealed as a circle growing from the button (View Transitions API). */
export function initTheme() {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) =>
    button.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      const apply = () => {
        root.dataset.theme = next;
        try {
          localStorage.setItem('theme', next);
        } catch {
          // Not persisted; the switch still works for this page view.
        }
      };

      if (!document.startViewTransition || prefersReducedMotion) {
        apply();
        return;
      }
      const r = button.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document
        .startViewTransition(apply)
        .ready.then(() =>
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 500, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' },
          ),
        );
    }),
  );
}
