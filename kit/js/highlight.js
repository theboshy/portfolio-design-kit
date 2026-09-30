// The tiny markup used in copy: "I build systems that [[hold up]] in production."
// Each highlighted word becomes its own marker span so it breaks cleanly across lines
// and is painted word by word (--hl-i staggers the animation).

const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Returns HTML for a string with [[...]] marks. */
export function highlightHTML(text) {
  let index = 0;
  return text
    .split(/\[\[|\]\]/)
    .map((chunk, i) => {
      if (!chunk) return '';
      if (i % 2 === 0) return escape(chunk);
      const words = chunk.split(' ');
      return words
        .map((word, w) => {
          const gap = w < words.length - 1;
          return (
            `<span class="hl${gap ? ' hl-gap' : ''}" style="--hl-i:${index++}">` +
            `<span class="hl-bg" aria-hidden="true"></span><span class="relative">${escape(word)}</span></span>` +
            (gap ? ' ' : '')
          );
        })
        .join('');
    })
    .join('');
}

/** Renders every [data-highlight] element from its own text content. */
export function initHighlight(root = document) {
  root.querySelectorAll('[data-highlight]').forEach((el) => {
    el.innerHTML = highlightHTML(el.textContent);
  });
}

/** The same text without markup, for aria-labels and meta tags. */
export const stripHighlight = (text) => text.replace(/\[\[|\]\]/g, '');
