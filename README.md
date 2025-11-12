# Monad

**A minimalist atomic design system built on principles of clarity, visual silence, and emotional precision.**

> _"Technology is invisible when it's done right."_

---

## What is Monad?

Monad is not just a design system — it's a philosophy applied.  
Every line of code, every color, every word serves one purpose: **making technology disappear, so human experience shines.**

Built on five core principles:
- **Clarity before form** — Every element exists for a reason
- **Visual silence** — Space is as important as content
- **Emotional precision** — Every curve, color, and rhythm carries intent
- **Scalability without noise** — Grow without losing harmony
- **Humanity at the center** — People over code, always

---

## Quick Start

### Installation

```bash
npm install monad
```

### Usage

```html
<!-- Include the CSS -->
<link rel="stylesheet" href="node_modules/monad/dist/styles/monad.css">

<!-- Use semantic HTML with optional classes -->
<button class="graphite-core hoverable">Primary Button</button>
<div class="card hoverable">
  <h3>Card Title</h3>
  <p>Card content with generous spacing.</p>
</div>
```

### Build from source

```bash
git clone https://github.com/thnkng/monad.git
cd monad
npm install
npm run build
```

---

## Architecture

```
tokens/          → Foundations (colors, spacing, typography, motion)
  └─ base/       → HTML resets & semantic typography
    └─ atoms/    → HTML elements styled without classes (button, input, select)
      └─ molecules/ → Composite components with classes (.card, .badge, .modal)
        └─ utilities/ → Layout primitives (grid, flex, stack, cluster)
```

**Golden Rule:** Atoms = HTML tags | Molecules = CSS classes

---

## Philosophy in Practice

### Atoms are HTML
Style the tag, not the class.  
`<button>` should work without `.btn`.

```html
<!-- ✅ GOOD: Semantic HTML -->
<button>Click me</button>
<input type="text" placeholder="Enter text">

<!-- ❌ AVOID: Class dependency -->
<div class="btn">Click me</div>
```

### Hovers are opt-in
Elements are silent by default. Interactions require explicit intent.

```html
<!-- ✅ GOOD: Explicit hover -->
<button class="hoverable">Interactive Button</button>

<!-- ❌ AVOID: Automatic hover everywhere -->
<button>Auto-hover (breaks visual silence)</button>
```

### Colors are poetic
Names carry emotional meaning, not arbitrary labels.

```html
<!-- ✅ GOOD: Semantic naming -->
<button class="graphite-core">Primary</button>
<button class="flow">Success</button>
<button class="pulse">Warning</button>
<button class="break">Error</button>

<!-- ❌ AVOID: Generic names -->
<button class="btn-primary-lg-v2">Button</button>
```

### Tokens, not hard-coded values
Everything uses design tokens for consistency.

```scss
// ✅ GOOD: Token-based
padding: var(--space-4);
transition: all var(--motion-duration-fast);

// ❌ AVOID: Hard-coded
padding: 16px;
transition: all 150ms;
```

---

## Key Features

### 🎨 Poetic Color System
- **graphite**: mind, deep, core, light
- **thought**: default, focus, depth
- **state**: flow (success), pulse (warning), break (error)
- **accents**: ember, sage, rose, sand, aether, iris

### 📏 4px Spacing Scale
Consistent, mathematical spacing from `--space-1` (4px) to `--space-8` (40px).

### 🎭 Motion with Intent
- `--motion-duration-fast` (150ms) — micro-interactions
- `--motion-duration-medium` (250ms) — transitions
- `--motion-duration-slow` (400ms) — complex animations
- `--motion-ease-decelerate` — lightness
- `--motion-ease-accelerate` — urgency

### ♿ Accessibility by Default
- WCAG AA contrast (4.5:1 minimum)
- `focus-visible` states on all interactive elements
- Keyboard navigation works everywhere
- Semantic HTML structure

### 🧩 Web Components
Clean JavaScript API for complex interactions:

```javascript
// Modal
document.getElementById('modal').open();
document.getElementById('modal').close();

// Dropdown
document.getElementById('dropdown').toggle();

// Toast
document.getElementById('toast').show();
```

---

## Component Examples

### Button Variants

```html
<!-- Colors -->
<button class="graphite-core hoverable">Graphite</button>
<button class="thought-focus hoverable">Thought</button>
<button class="flow hoverable">Success</button>
<button class="pulse hoverable">Warning</button>
<button class="break hoverable">Error</button>

<!-- Sizes -->
<button class="small hoverable">Small</button>
<button class="medium hoverable">Medium</button>
<button class="large hoverable">Large</button>
<button class="extra-large hoverable">Extra Large</button>
```

### Card

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Generous padding and subtle shadow.</p>
  <button class="graphite-core hoverable">Action</button>
</div>

<!-- Interactive card with hover -->
<div class="card interactive hoverable">
  <h3>Interactive Card</h3>
  <p>Lifts on hover with opt-in interaction.</p>
</div>
```

### Badge

```html
<span class="badge graphite-light">Default</span>
<span class="badge flow">Success</span>
<span class="badge pulse">Warning</span>
<span class="badge break">Error</span>
```

### Modal

```html
<monad-modal id="example-modal">
  <h2>Modal Title</h2>
  <p>Modal content with automatic overlay.</p>
  <button onclick="document.getElementById('example-modal').close()">Close</button>
</monad-modal>

<button onclick="document.getElementById('example-modal').open()">Open Modal</button>
```

---

## Documentation

- **[MANIFEST.md](./MANIFEST.md)** — Philosophy and principles
- **[ANALYSIS.md](./ANALYSIS.md)** — Coherence analysis (9.4/10 score)
- **[design-system.md](./design-system.md)** — Complete design system guide
- **[filosofia.md](./filosofia.md)** — Core philosophy

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

Monad uses modern CSS (custom properties, CSS Grid, Flexbox) without polyfills.

---

## Contributing

We welcome contributions that align with Monad's philosophy:

1. **Question necessity** — Does this element need to exist?
2. **Name with intent** — Use semantic, poetic naming
3. **Generate systematically** — Auto-generate variants via loops
4. **Test accessibility** — Keyboard navigation, screen readers, contrast
5. **Document the "why"** — Explain intent, not implementation

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

MIT © [Thinkng](https://github.com/thnkng)

---

## Credits

**Design System:** Monad  
**Philosophy:** Clarity, silence, humanity  
**Built by:** [Thinkng](https://github.com/thnkng)

_Version 1.0.0 — November 2025_

---

**Making technology disappear, so human experience shines.**
