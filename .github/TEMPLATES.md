# Template Names — Poetic Architecture

## Philosophy

Layout names follow Monad's principle of **emotional precision**. Each name evokes feeling and purpose, not just technical function.

---

## Available Templates

### `canvas`
**What it evokes:** Blank slate, workspace, creation  
**Use for:** SaaS apps, admin panels, workspaces  
**Structure:** Sidebar + header + main content  
**Variants:** `.collapsed`, `.open`

```html
<body class="canvas">
  <aside class="sidebar">...</aside>
  <header>...</header>
  <main>...</main>
</body>
```

---

### `observatory`
**What it evokes:** Panoramic view, observation, metrics  
**Use for:** Dashboards, analytics, KPI views  
**Structure:** Sidebar + header + data canvas  
**Variants:** `.collapsed`

```html
<body class="observatory">
  <aside class="sidebar">...</aside>
  <header>...</header>
  <main>
    <!-- Use grid utilities for metrics -->
  </main>
</body>
```

---

### `manuscript`
**What it evokes:** Structured knowledge, documentation  
**Use for:** Documentation, guides, knowledge bases  
**Structure:** Sidebar nav + header + content sections  
**Special:** Includes typography rhythm, scroll offsets

```html
<body class="manuscript">
  <monad-active-nav>
    <aside class="sidebar">...</aside>
  </monad-active-nav>
  <header>...</header>
  <main>
    <section id="...">...</section>
  </main>
</body>
```

---

### `threshold`
**What it evokes:** Gateway, passage, transition  
**Use for:** Login, register, onboarding  
**Structure:** Centered card on gradient  
**Variants:** `.split` (with side image)

```html
<body class="threshold">
  <div>
    <!-- Auth form here -->
  </div>
</body>

<!-- Split variant -->
<body class="threshold split">
  <div><!-- Auth form --></div>
  <div style="background-image: url(...)"></div>
</body>
```

---

### `horizon`
**What it evokes:** Vast expanse, first impression, limitless  
**Use for:** Landing pages, marketing sites  
**Structure:** Sticky header + full-width sections + footer

```html
<body class="horizon">
  <header>...</header>
  <main>
    <section><!-- Hero --></section>
    <section><!-- Features --></section>
    <section><!-- CTA --></section>
  </main>
  <footer>...</footer>
</body>
```

---

### `diptych`
**What it evokes:** Two faces of one work, reflection  
**Use for:** Code editors, email builders, live preview  
**Structure:** Header + two equal columns  
**Variants:** `.left-large`, `.right-large`, `.vertical`

```html
<body class="diptych">
  <header>...</header>
  <div><!-- Editor --></div>
  <div><!-- Preview --></div>
</body>
```

---

## Design Decisions

### Why poetic names?

1. **Memorable** — "Canvas" is easier to remember than "app-layout"
2. **Evocative** — Names suggest their purpose emotionally
3. **Scalable** — New layouts follow the same pattern
4. **Philosophy-aligned** — Emotional precision in naming

### Naming Principles

- **Single word** — Simple, clean
- **Concrete imagery** — Visual metaphors
- **Universal concepts** — Not tech jargon
- **Emotional resonance** — Evokes feeling

### What we avoided

❌ `app-layout`, `dashboard-layout` — Too technical  
❌ `docs-page`, `auth-page` — Too literal  
❌ `two-column`, `sidebar-main` — Too descriptive  
❌ `workspace-layout` — Too verbose

---

## Migration Guide

Old → New:

- `app-layout` → `canvas`
- `dashboard-layout` → `observatory`
- `docs-layout` → `manuscript`
- `auth-layout` → `threshold`
- `landing-layout` → `horizon`
- `split-layout` → `diptych`

---

**"Names matter. They set expectations, evoke emotions, create experiences."**
