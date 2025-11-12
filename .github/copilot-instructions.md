# GitHub Copilot Instructions — Monad Design System

## 🎯 Project Identity

**Monad** is a minimalist atomic design system built on principles of clarity, visual silence, and emotional precision. Every line of code serves a purpose — nothing is decorative.

**Key Facts:**
- SCSS-based design system with Web Components for interactive elements
- Structure: `tokens/` → `base/` → `atoms/` → `molecules/` → `utilities/`
- Build output: `dist/styles/monad.css` and `dist/scripts/monad.js`
- Philosophy: Silence by default, interaction by opt-in

---

## 🧬 Philosophy (Core Principles)

### 1. Clarity before form
- Every element must exist for a reason
- No pixel is decorative; everything communicates
- Beauty lies in precision, not ornamentation
- **Implementation:** Semantic HTML tags styled directly, minimal class dependencies

### 2. Visual silence
- Space is as important as content
- Elements are silent by default — interactions require opt-in
- Generous spacing allows the eye to breathe
- **Implementation:** `.hoverable` class required for hover effects, never automatic

### 3. Emotional precision
- Interfaces are never neutral — they evoke trust, lightness, calm
- Every curve, color, and rhythm carries emotional intent
- Naming is poetic: `graphite-mind`, `cloud-silent`, `ember-energy`
- **Implementation:** All tokens use evocative names, not generic labels

### 4. Scalability without noise
- A system is only good if it can grow without losing harmony
- Seek universal patterns, not fleeting conventions
- Auto-generate variants via loops, never hard-code
- **Implementation:** SCSS loops generate all color variants automatically

### 5. Humanity at the center
- Invisible technology — disappears so human experience prevails
- In the end, everything is about people — not code
- Developer experience (DX) is user experience
- **Implementation:** Clean API, semantic naming, comprehensive accessibility

---

## 📐 Project Architecture

```
package/
├── styles/
│   ├── monad.scss              # Main entry point
│   ├── tokens/                 # Design tokens (colors, spacing, typography, motion, effects)
│   ├── base/                   # HTML resets & semantic typography
│   ├── atoms/                  # HTML elements (button, input, select, link, etc.)
│   ├── molecules/              # Composite components (.card, .badge, .modal, etc.)
│   └── utilities/              # Layout primitives (grid, margin, padding, icons)
├── scripts/
│   ├── components/             # Web Components (modal, dropdown, tabs, toast, etc.)
│   └── icons.js                # Icon system
scripts/
└── js-build.mjs                # Build script
dist/
├── styles/monad.css            # Compiled CSS
└── scripts/monad.js            # Compiled JS
```

**Golden Rules:**
- Atoms = HTML tags styled directly (`button`, `input`)
- Molecules = CSS classes for composite components (`.card`, `.badge`)
- All interactive behavior = Web Components (`<monad-modal>`)
- All values = tokens (never hard-code)

---

## 🎨 Code Style Guidelines

### Naming Conventions

**✅ DO:**
```scss
// Semantic, poetic names
.avatar.small           // Size variants: small, medium, large, extra-large
button.graphite-core    // Color variants: {palette}-{shade}
button.hoverable        // Explicit opt-in for interactions
--space-4               // Numeric tokens (4 = 16px)
--motion-duration-fast  // Descriptive motion tokens
```

**❌ DON'T:**
```scss
// Cryptic abbreviations or inconsistent patterns
.avatar-sm              // Use "small" not "sm"
.btn-primary-lg-v2      // Avoid nested abbreviations
.avatar.avatar-xl       // Never repeat base class in variant
button:hover { }        // No automatic hover (requires .hoverable)
padding: 16px;          // Never hard-code (use var(--space-4))
```

### Color System

**Complete palette structure** (from `tokens/_colors.scss`):

```scss
$colors: (
  graphite: (mind: #0D1117, deep: #1A2430, core: #2B3A4A, light: #F4F7FA),
  cloud: (pure: #F1F1F1, silent: #F4F4F4, mist: #EAEAEA),
  thought: (default: #1e3a5f, focus: #152d4a, depth: #0d1f35),
  ember: (energy: #ff9533, glow: #ffb366, burn: #e67a1a),
  silver: (line: #DADADA, balance: #B6B6B6, depth: #8A8A8A),
  sage: (calm: #b7c6b4, leaf: #9fb49f, shadow: #7a9076),
  rose: (soft: #f7c9ce, bloom: #e8a7b0, depth: #bf6975),
  sand: (light: #f3ebde, warm: #e6cfae, earth: #ca9f71),
  aether: (sky: #d1ebff, air: #b6d8fa, light: #8bc2ee),
  iris: (petal: #c8b6ff, dream: #a58aed, void: #7563b2),
  state: (flow: #33d469, pulse: #ffc14d, break: #ff5c5c)
);
```

**Semantic aliases** (auto-generated):
- `--color-surface`: cloud-pure
- `--color-on-surface`: graphite-mind
- `--color-border`: silver-line
- `--color-primary`: graphite-core
- `--color-secondary`: thought (default)
- `--color-success`: state-flow
- `--color-warning`: state-pulse
- `--color-danger`: state-break

**Usage pattern:**
```scss
// Auto-generate color variants for all components
@each $palette, $entries in c.$colors {
  @each $name, $value in $entries {
    @if $name == default {
      button.#{"" + $palette} { @include button-variant($value); }
    } @else {
      button.#{"" + $palette}-#{$name} { @include button-variant($value); }
    }
  }
}
```

### Spacing Scale

Base unit: **4px**
```scss
--space-1: 0.25rem  // 4px
--space-2: 0.5rem   // 8px
--space-3: 0.75rem  // 12px
--space-4: 1rem     // 16px
--space-5: 1.25rem  // 20px
--space-6: 1.5rem   // 24px
--space-7: 2rem     // 32px
--space-8: 2.5rem   // 40px
```

**Never hard-code values** — always use tokens.

### Motion Design

**Durations:**
- `--motion-duration-fast`: 150ms (micro-interactions)
- `--motion-duration-medium`: 250ms (transitions)
- `--motion-duration-slow`: 400ms (complex animations)

**Easing:**
- `--motion-ease-standard`: cubic-bezier(0.4, 0, 0.2, 1)
- `--motion-ease-decelerate`: cubic-bezier(0, 0, 0.2, 1) — lightness
- `--motion-ease-accelerate`: cubic-bezier(0.4, 0, 1, 1) — urgency

**Principle:** Animations are subtle, never distracting.

---

## 🔧 Component Patterns

### Atoms (HTML elements)
Real example from `atoms/_button.scss`:

```scss
@use "sass:color";
@use "../tokens/colors" as c;

// Base button styling
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  padding: var(--space-small) var(--space-medium);
  border: 1px solid transparent;
  cursor: pointer;
  background: transparent;
  color: inherit;
  box-shadow: var(--shadow-faint);
  transition:
    background-color var(--motion-duration-medium) var(--motion-ease-standard),
    transform var(--motion-duration-fast) var(--motion-ease-decelerate);
}

// Focus state
button:focus-visible {
  outline: none;
  box-shadow: var(--shadow-soft), 0 0 0 var(--ring-width) var(--ring-color);
}

// Helper mixin
@mixin button-variant($value) {
  background-color: $value;
  border-color: $value;
  $l: color.channel($value, "lightness", hsl);
  color: if($l > 60%, #0D1117, #FFFFFF);
}

// Auto-generate all color variants
@each $palette, $entries in c.$colors {
  @each $name, $value in $entries {
    @if $name == default {
      button.#{"" + $palette} {
        @include button-variant($value);
        &.hoverable:hover {
          transform: translateY(-1px) scale(1.01);
          box-shadow: var(--shadow-soft);
        }
      }
    } @else {
      button.#{"" + $palette}-#{$name} {
        @include button-variant($value);
        &.hoverable:hover {
          transform: translateY(-1px) scale(1.01);
          box-shadow: var(--shadow-soft);
        }
      }
    }
  }
}
```

**Key patterns:**
- Base element gets default styling
- Mixins calculate contrast automatically
- Loops generate all color variants
- Hover requires `.hoverable` opt-in

### Molecules (CSS classes)
Real example from `molecules/_card.scss`:

```scss
@use "sass:color";
@use "../tokens/colors" as c;

// Base card
.card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-large);
  box-shadow: var(--shadow-faint);
  transition: 
    box-shadow var(--motion-duration-medium) var(--motion-ease-standard),
    transform var(--motion-duration-fast) var(--motion-ease-decelerate);
}

// Optional hover
.card.hoverable:hover {
  box-shadow: var(--shadow-soft);
}

// Variant mixins
@mixin card-variant($value) {
  border-color: $value;
  $l: color.channel($value, "lightness", hsl);
  @if $l > 60% {
    background-color: $value;
    color: #0D1117;
  } @else {
    background-color: color-mix(in srgb, $value 10%, var(--color-surface));
  }
}

// Auto-generate color variants
@each $palette, $entries in c.$colors {
  @each $name, $value in $entries {
    @if $name == default {
      .card.#{"" + $palette} { @include card-variant($value); }
    } @else {
      .card.#{"" + $palette}-#{$name} { @include card-variant($value); }
    }
  }
}

// Interactive variant
.card.interactive {
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
}

// Sub-components
.card-header {
  padding: var(--space-medium);
  border-bottom: 1px solid var(--color-border);
  margin: calc(-1 * var(--space-large)) calc(-1 * var(--space-large)) var(--space-medium);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
```

**Key patterns:**
- Base class establishes structure
- Modifier classes for variants (`.interactive`, `.hoverable`)
- Sub-components use BEM-like naming (`.card-header`)
- Color variants auto-generated with smart contrast

### Web Components
Real example pattern from `scripts/components/modal/index.js`:

```javascript
class MonadModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  open() {
    this.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.removeAttribute('open');
    document.body.style.overflow = '';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Component-scoped styles */
      </style>
      <div class="modal-overlay">
        <div class="modal-container">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('monad-modal', MonadModal);
```

**Usage:**
```html
<monad-modal id="example">
  <h2>Modal Title</h2>
  <p>Content goes here</p>
</monad-modal>

<button onclick="document.getElementById('example').open()">Open Modal</button>
```

**All available Web Components:**
- `<monad-modal>` — Overlay dialogs
- `<monad-dropdown>` — Dropdown menus
- `<monad-tabs>` — Tab navigation
- `<monad-toast>` — Toast notifications
- `<monad-tooltip>` — Contextual tooltips
- `<monad-pagination>` — Page navigation
- `<monad-progress>` — Progress indicators
- `<monad-menu>` — Navigation menus
- `<monad-alert>` — Alert messages
- `<monad-breadcrumb>` — Breadcrumb navigation
- `<monad-tag>` — Tag components

---

## 🚫 Anti-Patterns

**Never do this:**
```scss
// ❌ Automatic hover on everything
.card:hover { transform: scale(1.05); }

// ❌ Hard-coded values
padding: 16px;

// ❌ Inconsistent naming
.avatar-lg, .spinner-xl, .button-md

// ❌ Decorative elements without purpose
&::before { content: '✨'; }

// ❌ Complex nested selectors
.card .card-header .card-title span.text { }
```

**Do this instead:**
```scss
// ✅ Opt-in hover
.card.hoverable:hover { transform: translateY(-2px); }

// ✅ Token-based values
padding: var(--space-4);

// ✅ Consistent naming
.avatar.large, .spinner.extra-large, button.large

// ✅ Purposeful elements
.badge.status::before { /* Status indicator dot */ }

// ✅ Flat, semantic selectors
.card-title { }
```

---

## 📝 Documentation Style

**Code examples must include:**
```html
<!-- ✅ Show HTML structure with proper classes -->
<button class="graphite-core hoverable">Primary Button</button>

<!-- ✅ Include semantic state variants -->
<button class="state-flow hoverable">Success</button>
<button class="state-pulse hoverable">Warning</button>
<button class="state-break hoverable">Error</button>

<!-- ✅ Show size variants -->
<div class="avatar small">...</div>
<div class="avatar medium">...</div>
<div class="avatar large">...</div>
<div class="avatar extra-large">...</div>

<!-- ✅ Show modifier combinations -->
<button class="graphite-core outline hoverable">Outline</button>
<button class="thought-focus ghost hoverable">Ghost</button>

<!-- ✅ Include Web Component usage -->
<monad-modal id="example">
  <h2>Modal Title</h2>
  <p>Content here</p>
</monad-modal>
<button onclick="document.getElementById('example').open()">Open</button>
```

**Language:** Clear, direct, calm. No marketing speak. No emojis in code comments.

---

## 🎯 When Generating Code

### Always:
1. **Use tokens** — never hard-code colors, spacing, durations
2. **Generate variants** — loop through color palettes automatically
3. **Opt-in interactions** — hover requires `.hoverable` class
4. **Consistent naming** — small/medium/large/extra-large (not sm/md/lg/xl)
5. **Semantic HTML** — proper tags, ARIA labels, keyboard navigation
6. **Comment with intent** — explain "why", not "what"

### Never:
1. Hard-code pixel values
2. Create automatic hover effects
3. Use cryptic abbreviations (btn, bg, txt)
4. Nest selectors more than 2 levels deep
5. Add decorative elements without semantic purpose
6. Use `!important` (except in utility classes like `.text-{color}`)

---

## 🧪 Testing Checklist

Before committing:
- [ ] All values use tokens (no hard-coded `16px`)
- [ ] Hover effects require `.hoverable` class
- [ ] Size variants follow pattern: small/medium/large/extra-large
- [ ] Color variants auto-generated via loop
- [ ] Keyboard navigation works
- [ ] Focus states visible (`focus-visible`)
- [ ] Contrasts meet WCAG AA (4.5:1 for text)

---

## 💡 Real Implementation Examples

### From `atoms/_input.scss`:
```scss
input[type="text"],
input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: var(--space-small) var(--space-medium);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  color: var(--color-on-surface);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-medium);
  transition: border-color var(--motion-duration-fast);
}

input:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 var(--ring-width) var(--ring-color);
}
```

### From `molecules/_badge.scss`:
```scss
@use "sass:color";
@use "../tokens/colors" as c;

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-xsmall) var(--space-small);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
  background: var(--cloud-silent);
  color: var(--graphite-mind);
  border: 1px solid var(--silver-line);
  transition: all var(--motion-duration-fast);
}

@mixin badge-variant($value) {
  background-color: $value;
  border-color: $value;
  $l: color.channel($value, "lightness", hsl);
  color: if($l > 60%, #0D1117, #FFFFFF);
}

// Auto-generate all color variants
@each $palette, $entries in c.$colors {
  @each $name, $value in $entries {
    @if $name == default {
      .badge.#{"" + $palette} { @include badge-variant($value); }
    } @else {
      .badge.#{"" + $palette}-#{$name} { @include badge-variant($value); }
    }
  }
}
```

---

## 🌟 Mantras

When in doubt, remember:

1. **"Clarity before form"** — Does this element need to exist?
2. **"Silence by default"** — Should this have automatic hover?
3. **"Emotional precision"** — Does this color/name evoke the right feeling?
4. **"Scale without noise"** — Will this pattern work with 50 components?
5. **"Human first"** — Would a developer understand this in 6 months?

---

## 🔍 Quick Reference

### File Organization
- **Tokens:** `package/styles/tokens/_*.scss`
- **Base:** `package/styles/base/_base.scss`
- **Atoms:** `package/styles/atoms/_*.scss`
- **Molecules:** `package/styles/molecules/_*.scss`
- **Utilities:** `package/styles/utilities/_*.scss`
- **Web Components:** `package/scripts/components/*/index.js`
- **Build Script:** `scripts/js-build.mjs`

### Common Tasks

**Adding a new color:**
1. Add to `$colors` map in `tokens/_colors.scss`
2. All components auto-generate variants via loops
3. Test contrast with `color.channel()` function

**Creating a new atom:**
1. Create `package/styles/atoms/_element.scss`
2. Style the HTML tag directly
3. Add to `atoms/_index.scss`
4. Generate color variants with loop

**Creating a new molecule:**
1. Create `package/styles/molecules/_component.scss`
2. Define base class with tokens
3. Create variant mixins
4. Generate variants with loops
5. Add to `molecules/_index.scss`

**Creating a Web Component:**
1. Create `package/scripts/components/name/index.js`
2. Extend `HTMLElement`
3. Use Shadow DOM for encapsulation
4. Export and register in `scripts/components/index.js`

### Build Commands
```bash
npm run build        # Compile SCSS + JS → dist/
npm run watch        # Watch mode for development
```

---

**Version:** 1.1.0  
**Last updated:** November 12, 2025  
**Maintainer:** Thinkng

_"Technology disappears. Experience remains."_
