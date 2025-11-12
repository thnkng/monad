/**
 * MonadTag Web Component
 * Removable label/chip for filters and categories
 * 
 * @example
 * <monad-tag variant="flow" closeable>Design</monad-tag>
 */

class MonadTag extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'closeable', 'outline'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
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

  get closeable() {
    return this.hasAttribute('closeable');
  }

  set closeable(value) {
    if (value) {
      this.setAttribute('closeable', '');
    } else {
      this.removeAttribute('closeable');
    }
  }

  get outline() {
    return this.hasAttribute('outline');
  }

  set outline(value) {
    if (value) {
      this.setAttribute('outline', '');
    } else {
      this.removeAttribute('outline');
    }
  }

  render() {
    // Build class list
    const classes = ['tag'];
    
    if (this.variant) classes.push(this.variant);
    if (this.size) classes.push(`tag-${this.size}`);
    if (this.outline) classes.push('tag-outline');
    
    this.className = classes.join(' ');

    // Get content
    const content = this.textContent.trim();
    
    // Render with close button if closeable
    if (this.closeable) {
      this.innerHTML = `
        <span class="tag-content">${content}</span>
        <button class="tag-close" aria-label="Remover">×</button>
      `;

      // Attach close handler
      const closeBtn = this.querySelector('.tag-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.remove();
        });
      }
    } else {
      this.innerHTML = `<span class="tag-content">${content}</span>`;
    }
  }

  remove() {
    // Dispatch remove event
    const event = new CustomEvent('tag-remove', {
      bubbles: true,
      cancelable: true,
      detail: { tag: this, value: this.textContent.trim() }
    });

    if (this.dispatchEvent(event)) {
      // Add removing animation
      this.classList.add('tag-removing');

      // Remove after animation
      setTimeout(() => {
        super.remove();
      }, 200);
    }
  }
}

customElements.define('monad-tag', MonadTag);

export default MonadTag;
