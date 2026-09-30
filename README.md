# Portfolio design kit

El lenguaje visual de [theboshy.github.io](https://theboshy.github.io) extraído para reutilizarlo: colores, tipografía, texturas, animaciones y componentes.

**Ver la hoja de diseño:** https://theboshy.github.io/portfolio-design-kit/ (o abre `index.html` con doble clic).

Papel cálido, estructura con líneas de 1px, una serif para los títulos y un resaltador amarillo como único color fuerte. Modo claro y oscuro, y todo con versión `prefers-reduced-motion`.

## Contenido

```
index.html              la hoja de diseño, construida con el propio kit
kit/
  tokens.css            colores claro/oscuro, easings, duraciones, radios, fuentes
  tailwind.css          bloque @theme para Tailwind v4 (opcional)
  base.css              body, escala tipográfica (.t-display, .t-h2, .t-body, .t-mono), layout
  motion.css            reveal, entrada del hero, text-in, ping
  components.css        resaltador, corner box, botones + border beam, chip, dot grid, marquee, timeline, cursor
  reduced-motion.css    siempre al final: neutraliza cada animación
  js/                   ES modules sin build: highlight, reveal, theme, timeline, parallax, cursor (index.js los carga todos)
```

## Usarlo en un proyecto nuevo

Copia `kit/` al proyecto.

### HTML / CSS puro

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

## Convenciones rápidas

| Qué | Cómo |
| --- | --- |
| Resaltador en un título | `<h2 class="t-h2" data-highlight>Texto [[resaltado]]</h2>` (lo procesa `js/highlight.js`) |
| Sección que entra al hacer scroll | `class="reveal"` + `<html class="js">` |
| Tarjeta con esquinas en hover | `class="cbox cbox-hover"` + `data-cursor="frame"` |
| Grilla sin bordes dobles | `class="grid-lines"` en el contenedor |
| Botón | `<span class="btn-wrap"><a class="btn btn-primary">…</a></span>` |
| Cambio de tema | cualquier botón con `data-theme-toggle` |

Reglas: el amarillo en menos del ~5% de la pantalla, radios de 2px, sin sombras en tarjetas, sin em dashes en el texto (`→` para rangos de fechas).

Los diagramas isométricos del portfolio (SVG + GSAP) no están en el kit porque dependen de sus datos; ver `docs/isometric-diagrams.md` en el repo del portfolio.

## Licencia

MIT
