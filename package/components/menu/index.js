/**
 * MonadMenu Web Component
 * Vertical navigation menu with items and sections
 * 
 * @example
 * <monad-menu variant="flow">
 *   <monad-menu-item icon="🏠" active>Dashboard</monad-menu-item>
 *   <monad-menu-item icon="📊">Reports</monad-menu-item>
 * </monad-menu>
 */

class MonadMenu extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'horizontal'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateClasses();
    }
  }

  get variant() {
    return this.getAttribute('variant') || '';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get size() {
    return this.getAttribute('size') || '';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get horizontal() {
    return this.hasAttribute('horizontal');
  }

  set horizontal(value) {
    if (value) {
      this.setAttribute('horizontal', '');
    } else {
      this.removeAttribute('horizontal');
    }
  }

  updateClasses() {
    const classes = ['menu'];
    if (this.variant) classes.push(`menu-${this.variant}`);
    if (this.size) classes.push(`menu-${this.size}`);
    if (this.horizontal) classes.push('menu-horizontal');
    this.className = classes.join(' ');
  }

  render() {
    this.updateClasses();
  }
}

class MonadMenuItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['icon', 'active', 'disabled', 'href'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get icon() {
    return this.getAttribute('icon') || '';
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  get active() {
    return this.hasAttribute('active');
  }

  set active(value) {
    if (value) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get href() {
    return this.getAttribute('href') || '';
  }

  set href(value) {
    this.setAttribute('href', value);
  }

  render() {
    const classes = ['menu-item'];
    if (this.active) classes.push('active');
    if (this.disabled) classes.push('disabled');
    if (!this.disabled) classes.push('hoverable');

    const content = this.textContent.trim();
    const iconHTML = this.icon ? `<span class="menu-icon">${this.icon}</span>` : '';

    if (this.href && !this.disabled) {
      // Render as link
      this.innerHTML = `
        <a href="${this.href}" class="${classes.join(' ')}">
          ${iconHTML}
          <span>${content}</span>
        </a>
      `;
    } else {
      // Render as button/div
      this.className = classes.join(' ');
      this.innerHTML = `
        ${iconHTML}
        <span>${content}</span>
      `;

      if (!this.disabled) {
        this.style.cursor = 'pointer';
        this.addEventListener('click', () => {
          this.handleClick();
        });
      }
    }
  }

  handleClick() {
    // Deactivate siblings
    const menu = this.closest('monad-menu');
    if (menu) {
      const siblings = menu.querySelectorAll('monad-menu-item');
      siblings.forEach(item => {
        if (item !== this) {
          item.active = false;
        }
      });
    }

    // Activate this item
    this.active = true;

    // Dispatch event
    this.dispatchEvent(new CustomEvent('menu-item-click', {
      bubbles: true,
      detail: { item: this, content: this.textContent.trim() }
    }));
  }
}

class MonadMenuLabel extends HTMLElement {
  connectedCallback() {
    this.className = 'menu-label';
  }
}

class MonadMenuDivider extends HTMLElement {
  connectedCallback() {
    this.className = 'menu-divider';
  }
}

customElements.define('monad-menu', MonadMenu);
customElements.define('monad-menu-item', MonadMenuItem);
customElements.define('monad-menu-label', MonadMenuLabel);
customElements.define('monad-menu-divider', MonadMenuDivider);

export { MonadMenu, MonadMenuItem, MonadMenuLabel, MonadMenuDivider };
export default MonadMenu;
