# MR. BANDS — Style Guide

Visual language reference for the MR. BANDS portfolio. The design system is dark, neon-accented and rooted in geometric brutalism.

---

## 1. Design Tokens

Tokens are declared in `src/index.css` via Tailwind v4's `@theme` block and also available as CSS custom properties set at runtime via JavaScript.

### Colours

| Token | Value | Use |
|---|---|---|
| `--color-bg` / `--bg` | `#0a0a0a` | Page background |
| `--color-card` / `--card` | `#111111` | Card / surface background |
| `--color-line` / `--line` | `#222222` | Borders and dividers |
| `--color-muted` / `--muted` | `#bcbcbc` | Secondary / body text |
| `--color-cyan` | `#00f0ff` | Accent 1 (default) |
| `--color-magenta` | `#ff00c8` | Accent 2 |
| `--color-yellow` | `#f5ff00` | Accent 3 / ticker |
| `--color-orange` | `#ff6a00` | Accent 4 |
| `--accent` *(runtime)* | cycles every 3.5 s | Active accent; set via JS on `<html>` |

**Accent cycling** is driven by `AppContext` → `CYCLE_ACCENT` action. The four accent colours rotate every 3500 ms unless `prefers-reduced-motion` is set.

### Typography

| Token | Family | Use |
|---|---|---|
| `--font-sans` | Inter | Body text, paragraphs |
| `--font-mono` | JetBrains Mono | Nav links, labels, badges, code |
| `--font-display` | Space Grotesk | Headings (`h1`–`h3`), section titles |

All headings are uppercase with `letter-spacing: 0.06em`.

Heading sizes follow a fluid scale:
- Hero `<h1>`: `clamp(2.8rem, 13vw, 9rem)`
- Section titles: `text-3xl md:text-4xl` (1.875–2.25 rem)
- Card / article titles: `text-base` (1 rem)

---

## 2. Layout

### Container

```
width: min(1120px, 92vw);
margin: 0 auto;
```

All page content uses `w-[min(1120px,92vw)] mx-auto`.

### Section padding

- Default: `py-24` (6 rem top/bottom)
- Mobile breakpoint (`max-width: 720px`): `py-[4.8rem]`

### Responsive breakpoints (Tailwind defaults)

| Alias | Width |
|---|---|
| `sm` | ≥ 640 px |
| `md` | ≥ 768 px |
| `lg` | ≥ 1024 px |

---

## 3. Components

### Buttons

Three variants — all uppercase, `letter-spacing: 0.08em`.

```
.btn          – transparent, border: #222
.btn-primary  – gradient fill (accent → accent 80%), dark text, no border
.btn-outline  – transparent background, inherits border
```

On hover: `border-color: accent`, `box-shadow: 0 0 20px accent/35%`.

In JSX the same patterns are inlined via `style={}` to use the live accent value.

### Cards (`.card`)

```
background: #111;
border: 1px solid #222;
padding: 1rem;
transition: transform, border-color, box-shadow  (0.25 s)
```

Hover: lift `translateY(-4px)`, accent border, accent glow.

The art preview area (`.art`) is 210 px tall with animated background gradients and an overlay that fades in on hover.

### Filter Buttons (Obras page)

```
border: 1px solid #222;  color: #bcbcbc;
Active / hover: border-color: accent;  color: accent;
```

Font: JetBrains Mono, 0.75 rem, uppercase.

### Form Fields (`<input>`, `<select>`, `<textarea>`)

```
background: #0d0d0d;
border: 1px solid #222;
color: #f7f7f7;
padding: 0.7rem 0.75rem;
focus → border-color: accent  (via onFocus/onBlur handlers)
```

Labels: JetBrains Mono, 0.85 rem, uppercase, tracking 0.05 em.

### Badge (`.badge`)

Pill-style tag for skills / categories:

```
border: 1px solid #222;
padding: 0.3rem 0.7rem;
font: JetBrains Mono 0.75 rem uppercase;
color: #bcbcbc;
hover → border-color & color: accent (inline)
```

Badges optionally include a small geometric shape icon (see Geometric Icons).

### Geometric Icons

Three clip-path shapes used as inline decorators:

| Name | `clip-path` | Default colour |
|---|---|---|
| Triangle | `polygon(50% 0, 100% 100%, 0 100%)` | cyan |
| Hexagon | `polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)` | yellow |
| Diamond | `polygon(50% 0, 100% 50%, 50% 100%, 0 50%)` | magenta |

Rendered as `<span aria-hidden="true">` with inline `style={{ background, clipPath }}`.

---

## 4. Animations & Motion

All animations respect `prefers-reduced-motion: reduce` — durations are collapsed to `0.01 ms` and counts to 1.

### Declared in `src/index.css`

| Class / keyframe | Effect | Duration |
|---|---|---|
| `.glitch` | Cyan/magenta text shadow split | static (text-shadow only) |
| `.ticker-track` | Infinite horizontal scroll | 20 s linear |
| `.art-bg` (`drift`) | Background-position drift | 7 s ease-in-out alternate |
| `.ring` (`rotate`) | 360° rotation | 16 / 12 / 9 s (per ring) |
| `.reveal` | Fade + slide up on scroll | 0.6 s ease |
| `.pulse-dot` | Scale + opacity pulse | 2 s ease-in-out |
| `page-fade` | Page enter fade + slide | 0.35 s ease |
| `scroll-bounce` | Scroll indicator chevron bounce | 1.6 s ease-in-out |

### Reveal on scroll

`useReveal()` hook attaches an `IntersectionObserver` (threshold 0.15). When the element enters the viewport the class `in-view` is added, triggering the `.reveal` transition.

---

## 5. Background System

### Particle canvas

`<ParticleCanvas>` renders floating cyan dots on a fixed `<canvas>` (`z-index: -10`). Dot count scales with viewport width (`Math.floor(window.innerWidth / 45)`). Animation is paused when `reducedMotion` is true.

### Art backgrounds (`.art-1` – `.art-6`)

Six layered gradient backgrounds used in work preview cards. Each uses 2–3 gradients with brand accent colours. The `art-bg` class adds the `drift` animation.

---

## 6. Header

- Sticky, `top: 0`, `z-index: 30`
- Frosted glass: `backdrop-filter: blur(14px)`, `background: rgb(10 10 10 / 0.72)`
- Bottom border: `1px solid rgb(255 255 255 / 0.08)`
- Height: `min-height: 72px`
- Logo: JetBrains Mono, 0.92 rem, coloured with live accent + pulsing dot

Active nav link: accent colour, `text-shadow: 0 0 12px accent/60%`, bottom border visible.

Mobile menu: absolute dropdown, `background: #101010`, rendered conditionally when `menuOpen` is true in AppContext.

---

## 7. Footer

- Top border: `1px solid #222`
- Geometric watermark: clip-path pentagon, `border: 1px solid white/8%`, rotated 20°
- Font: JetBrains Mono for links and copyright; Space Grotesk for brand name

---

## 8. Accessibility

- Colour contrast: all body text (#f7f7f7 / #bcbcbc) on dark backgrounds meets WCAG AA.
- Reduced motion: all animations are suppressed globally.
- Decorative shapes use `aria-hidden="true"`.
- Interactive elements use semantic HTML (`<button>`, `<a>`, `<form>`).
- `.focus-ring` provides a 2 px cyan `outline` on `:focus-visible`.
- `.sr-only` hides text visually but keeps it accessible to screen readers.

---

## 9. File Structure

```
src/
├── index.css          # Tailwind v4 + custom CSS (tokens, animations, components)
├── main.jsx           # React entry point
├── App.jsx            # Router + global layout
├── context/
│   └── AppContext.jsx # Global state (accent, menu, filter, reducedMotion)
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ParticleCanvas.jsx
│   └── useReveal.js   # IntersectionObserver scroll-reveal hook
└── pages/
    ├── Home.jsx
    ├── Sobre.jsx
    ├── Obras.jsx
    ├── Encomendas.jsx
    └── Contato.jsx
```

---

## 10. Build & Dev

```bash
npm run dev      # Vite dev server (HMR)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

Stack: React 18 · React Router DOM 6 · Tailwind CSS v4 · @tailwindcss/vite · @vitejs/plugin-react · vite-plugin-pwa

Fonts loaded from Google Fonts (Inter 400/500/700 · JetBrains Mono 500/700 · Space Grotesk 600/700).
