/**
 * MonadTooltip Web Component
 * Contextual information on hover
 * 
 * @example
 * <monad-tooltip position="top" content="Helpful information">
 *   <button>Hover me</button>
 * </monad-tooltip>
 */

class MonadTooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltip = null;
    this._showTimeout = null;
    this._hideTimeout = null;
  }

  static get observedAttributes() {
    return ['content', 'position', 'variant', 'delay'];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.clearTimeouts();
    if (this._tooltip && this._tooltip.parentNode) {
      this._tooltip.remove();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._tooltip) {
      this.updateTooltip();
    }
  }

  get content() {
    return this.getAttribute('content') || '';
  }

  set content(value) {
    this.setAttribute('content', value);
  }

  get position() {
    return this.getAttribute('position') || 'top';
  }

  set position(value) {
    this.setAttribute('position', value);
  }

  get variant() {
    return this.getAttribute('variant') || '';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get delay() {
    return parseInt(this.getAttribute('delay')) || 200;
  }

  set delay(value) {
    this.setAttribute('delay', value);
  }

  render() {
    // Wrap content in a span for positioning
    const content = Array.from(this.childNodes);
    this.innerHTML = '';
    
    const wrapper = document.createElement('span');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    
    content.forEach(node => wrapper.appendChild(node));
    this.appendChild(wrapper);
  }

  createTooltip() {
    const tooltip = document.createElement('div');
    const classes = ['tooltip', `tooltip-${this.position}`];
    if (this.variant) classes.push(`tooltip-${this.variant}`);
    
    tooltip.className = classes.join(' ');
    tooltip.textContent = this.content;
    
    document.body.appendChild(tooltip);
    return tooltip;
  }

  updateTooltip() {
    if (!this._tooltip) return;
    
    const classes = ['tooltip', `tooltip-${this.position}`];
    if (this.variant) classes.push(`tooltip-${this.variant}`);
    
    this._tooltip.className = classes.join(' ');
    this._tooltip.textContent = this.content;
  }

  positionTooltip() {
    if (!this._tooltip) return;

    const trigger = this.firstElementChild;
    const rect = trigger.getBoundingClientRect();
    const tooltipRect = this._tooltip.getBoundingClientRect();

    let top, left;

    switch (this.position) {
      case 'top':
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = rect.bottom + 8;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.right + 8;
        break;
      default:
        top = rect.top - tooltipRect.height - 8;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    }

    // Keep tooltip in viewport
    top = Math.max(8, Math.min(top, window.innerHeight - tooltipRect.height - 8));
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8));

    this._tooltip.style.top = `${top + window.scrollY}px`;
    this._tooltip.style.left = `${left + window.scrollX}px`;
  }

  show() {
    this.clearTimeouts();

    this._showTimeout = setTimeout(() => {
      if (!this._tooltip) {
        this._tooltip = this.createTooltip();
      }

      this.positionTooltip();
      
      // Force reflow for animation
      this._tooltip.offsetHeight;
      
      this._tooltip.classList.add('tooltip-show');
    }, this.delay);
  }

  hide() {
    this.clearTimeouts();

    this._hideTimeout = setTimeout(() => {
      if (this._tooltip) {
        this._tooltip.classList.remove('tooltip-show');
        
        setTimeout(() => {
          if (this._tooltip && this._tooltip.parentNode) {
            this._tooltip.remove();
            this._tooltip = null;
          }
        }, 150);
      }
    }, 100);
  }

  clearTimeouts() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
  }

  attachEventListeners() {
    const trigger = this.firstElementChild;
    if (!trigger) return;

    trigger.addEventListener('mouseenter', () => this.show());
    trigger.addEventListener('mouseleave', () => this.hide());
    trigger.addEventListener('focus', () => this.show());
    trigger.addEventListener('blur', () => this.hide());
  }
}

customElements.define('monad-tooltip', MonadTooltip);

export default MonadTooltip;
