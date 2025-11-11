# GitHub Copilot Instructions — Monad Design System

## 🎯 Project Identity

**Monad** is a minimalist atomic design system built on principles of clarity, visual silence, and emotional precision. Every line of code serves a purpose — nothing is decorative.

## 🧬 Philosophy (Core Principles)

### 1. Clarity before form
- Every element must exist for a reason
- No pixel is decorative; everything communicates
- Beauty lies in precision, not ornamentation

### 2. Visual silence
- Space is as important as content
- Elements are silent by default — interactions require opt-in
- Generous spacing allows the eye to breathe

### 3. Emotional precision
- Interfaces are never neutral — they evoke trust, lightness, calm
- Every curve, color, and rhythm carries emotional intent
- Naming is poetic: `graphite-mind`, `cloud-silent`, `ember-energy`

### 4. Scalability without noise
- A system is only good if it can grow without losing harmony
- Seek universal patterns, not fleeting conventions
- Auto-generate variants via loops, never hard-code

### 5. Humanity at the center
- Invisible technology — disappears so human experience prevails
- In the end, everything is about people — not code
- Developer experience (DX) is user experience

---

## 📐 Architecture

```
tokens/          → Foundations (colors, spacing, typography, motion)
  └─ base/       → HTML resets & semantic typography
    └─ atoms/    → HTML elements styled without classes (button, input, select)
      └─ molecules/ → Composite components with classes (.card, .badge, .modal)
        └─ utilities/ → Layout primitives (grid, flex, stack, cluster)
```

**Golden Rule:** Atoms = HTML tags | Molecules = CSS classes

---

## 🎨 Code Style Guidelines

### Naming Conventions

**✅ DO:**
```scss
// Semantic, poetic names
.avatar small           // Size variants: small, medium, large, extra-large
.button graphite-core   // Color variants: {palette}-{shade}
.hoverable              // Explicit opt-in for interactions
--space-4               // Numeric tokens (4 = 16px)
--motion-duration-fast  // Descriptive motion tokens
```

**❌ DON'T:**
```scss
// Cryptic abbreviations or inconsistent patterns
.avatar-sm              // Use "small" not "sm"
.btn-primary-lg-v2      // Avoid nested abbreviations
.avatar avatar-xl       // Never repeat base class in variant
.auto-hover             // No automatic interactions
```

### Color System

**Palette structure:**
- **graphite** (primary): mind, deep, core, light
- **thought** (secondary): default, focus, depth
- **state** (feedback): flow (success), pulse (warning), break (error)
- **Accents:** ember, sage, rose, sand, aether, iris

**Usage:**
```scss
// Generate variants automatically for all components
@each $palette, $entries in $colors {
  @each $name, $value in $entries {
    .component.#{$palette}-#{$name} { @include variant($value); }
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
```scss
// Style the tag directly, generate color variants
button {
  display: inline-flex;
  padding: var(--space-small) var(--space-medium);
  border-radius: var(--radius-md);
  transition: all var(--motion-duration-fast) var(--motion-ease-standard);
}

// Hover is opt-in only
button.hoverable:hover {
  transform: translateY(-1px);
}

// Auto-generate color variants
@each $palette, $entries in $colors {
  button.#{$palette} { @include button-variant($value); }
}
```

### Molecules (CSS classes)
```scss
// Class-based composite components
.card {
  padding: var(--space-large);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-faint);
}

// Size variants: small, medium, large, extra-large
.card.large { padding: var(--space-xlarge); }

// Interactive opt-in
.card.interactive.hoverable:hover {
  transform: translateY(-2px);
}
```

### Web Components
```javascript
// Custom elements with clean API
class MonadModal extends HTMLElement {
  open() { this.setAttribute('open', ''); }
  close() { this.removeAttribute('open'); }
}

// Usage: document.getElementById('modal').open()
```

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
.avatar large, .spinner extra-large, .button large

// ✅ Purposeful elements
.badge.status::before { /* Status indicator dot */ }

// ✅ Flat, semantic selectors
.card-title { }
```

---

## 📝 Documentation Style

**Code examples must include:**
```html
<!-- ✅ Show HTML structure -->
<button class="graphite-core hoverable">Primary Button</button>

<!-- ✅ Include semantic variants -->
<button class="flow">Success</button>
<button class="pulse">Warning</button>
<button class="break">Error</button>

<!-- ✅ Show size variants -->
<div class="avatar small">...</div>
<div class="avatar medium">...</div>
<div class="avatar large">...</div>
```

**Language:** Clear, direct, calm. No marketing speak.

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

## 💡 Examples to Learn From

**Good atom:**
```scss
input[type="text"] {
  padding: var(--space-small) var(--space-medium);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color var(--motion-duration-fast);
}

input[type="text"].hoverable:hover {
  border-color: var(--color-primary);
}
```

**Good molecule:**
```scss
.badge {
  display: inline-flex;
  padding: var(--space-xsmall) var(--space-small);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-small);
  background: var(--cloud-silent);
  color: var(--graphite-mind);
}

// Auto-generate color variants
@each $palette, $entries in $colors {
  .badge.#{$palette} { @include badge-variant($value); }
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

**Version:** 1.0.0  
**Last updated:** November 11, 2025  
**Maintainer:** Thinkng

_"Technology disappears. Experience remains."_
