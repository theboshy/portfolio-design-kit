// Read once at startup: both are stable for the lifetime of a page view in practice.
export const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(pointer: fine)').matches;

/** Coalesces a high-frequency event (scroll, pointermove) into at most one call per frame. */
export function rafThrottle(fn) {
  let frame = 0;
  let lastArgs;
  return (...args) => {
    lastArgs = args;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...lastArgs);
    });
  };
}
