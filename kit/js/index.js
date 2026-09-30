// Everything at once: <script type="module" src="kit/js/index.js"></script>
// (or import only the pieces you need).
import { initCursor } from './cursor.js';
import { initHighlight } from './highlight.js';
import { initParallax } from './parallax.js';
import { initReveal } from './reveal.js';
import { initTheme } from './theme.js';
import { initTimeline } from './timeline.js';

document.documentElement.classList.add('js');
for (const init of [initHighlight, initReveal, initTheme, initTimeline, initParallax, initCursor]) init();
