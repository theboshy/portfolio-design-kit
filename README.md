# Portfolio design kit

The visual language of [theboshy.github.io](https://theboshy.github.io), extracted for reuse: colors, type, textures, motion and components.

**See the design sheet:** https://theboshy.github.io/portfolio-design-kit/ (or open `index.html` with a double click).

Warm paper, 1px hairline structure, one serif for headings and a yellow highlighter as the only loud color. Light and dark modes, and a `prefers-reduced-motion` fallback for everything.

## Contents

```
index.html              the design sheet, built with the kit itself
kit/
  tokens.css            light/dark colors, easings, durations, radius, fonts
  tailwind.css          @theme block for Tailwind v4 (optional)
  base.css              body, type scale (.t-display, .t-h2, .t-body, .t-mono), layout
  motion.css            reveal, hero entrance, text-in, ping
  components.css        highlighter, corner box, buttons + border beam, chip, dot grid, marquee, timeline, cursor
  reduced-motion.css    always last: neutralizes every animation
  js/                   build-free ES modules: highlight, reveal, theme, timeline, parallax, cursor (index.js loads them all)
```

## Using it in a new project

Copy `kit/` into the project.

### Plain HTML / CSS

```html
<head>
  <script>
    // theme before first paint + enables the .js-only animations
    (() => {
      let saved = null;
      try { saved = localStorage.getItem('theme'); } catch {}
      const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      document.documentElement.classList.add('js');
    })();
  </script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Inter:opsz,wght@14..32,100..900&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap" />
  <link rel="stylesheet" href="kit/tokens.css" />
  <link rel="stylesheet" href="kit/base.css" />
  <link rel="stylesheet" href="kit/motion.css" />
  <link rel="stylesheet" href="kit/components.css" />
  <link rel="stylesheet" href="kit/reduced-motion.css" />
</head>
<body>
  …
  <script type="module" src="kit/js/index.js"></script>
</body>
```

### Tailwind v4 (Astro, Vite, Next…)

```css
@import 'tailwindcss';
@import '@fontsource-variable/inter';
@import '@fontsource-variable/newsreader/opsz.css';
@import '@fontsource-variable/geist-mono';

@import './kit/tokens.css';
@import './kit/tailwind.css'; /* bg-surface-bg, text-text-tertiary, border-line, font-serif… */
@import './kit/base.css';
@import './kit/motion.css';
@import './kit/components.css';
@import './kit/reduced-motion.css';
```

```sh
pnpm add @fontsource-variable/inter @fontsource-variable/newsreader @fontsource-variable/geist-mono
```

## Quick conventions

| What | How |
| --- | --- |
| Highlighter on a heading | `<h2 class="t-h2" data-highlight>Some [[highlighted]] text</h2>` (processed by `js/highlight.js`) |
| Section that enters on scroll | `class="reveal"` + `<html class="js">` |
| Card with hover corners | `class="cbox cbox-hover"` + `data-cursor="frame"` |
| Grid without double borders | `class="grid-lines"` on the container |
| Button | `<span class="btn-wrap"><a class="btn btn-primary">…</a></span>` |
| Theme switch | any button with `data-theme-toggle` |

Rules: yellow under ~5% of the screen, 2px radii, no shadows on cards, no em dashes in copy (`→` for date ranges).

The portfolio's isometric diagrams (SVG + GSAP) are not part of the kit because they depend on its data; see `docs/isometric-diagrams.md` in the portfolio repo.

## License

MIT
