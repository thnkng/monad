/**
 * MonadBreadcrumb Web Component
 * Hierarchical navigation trail
 * 
 * @example
 * <monad-breadcrumb>
 *   <monad-breadcrumb-item href="/">Home</monad-breadcrumb-item>
 *   <monad-breadcrumb-item href="/products">Products</monad-breadcrumb-item>
 *   <monad-breadcrumb-item>Current</monad-breadcrumb-item>
 * </monad-breadcrumb>
 */

class MonadBreadcrumb extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['size', 'light'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateClasses();
    }
  }

  get size() {
    return this.getAttribute('size') || '';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get light() {
    return this.hasAttribute('light');
  }

  set light(value) {
    if (value) {
      this.setAttribute('light', '');
    } else {
      this.removeAttribute('light');
    }
  }

  updateClasses() {
    const classes = ['breadcrumb'];
    if (this.size) classes.push(`breadcrumb-${this.size}`);
    if (this.light) classes.push('breadcrumb-light');
    this.className = classes.join(' ');
  }

  render() {
    this.updateClasses();
  }
}

class MonadBreadcrumbItem extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['href', 'icon'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get href() {
    return this.getAttribute('href') || '';
  }

  set href(value) {
    this.setAttribute('href', value);
  }

  get icon() {
    return this.getAttribute('icon') || '';
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  render() {
    const content = this.textContent.trim();
    const iconHTML = this.icon ? `<span class="breadcrumb-icon">${this.icon}</span>` : '';

    if (this.href) {
      // Render as link
      this.innerHTML = `
        <a href="${this.href}" class="hoverable">
          ${iconHTML}
          <span>${content}</span>
        </a>
      `;
    } else {
      // Render as current page (span)
      this.innerHTML = `
        <span>
          ${iconHTML}
          <span>${content}</span>
        </span>
      `;
    }
  }
}

customElements.define('monad-breadcrumb', MonadBreadcrumb);
customElements.define('monad-breadcrumb-item', MonadBreadcrumbItem);

export { MonadBreadcrumb, MonadBreadcrumbItem };
export default MonadBreadcrumb;
