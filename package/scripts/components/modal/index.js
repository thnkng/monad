/**
 * MonadModal - Custom Element for Modal Dialog
 * 
 * Usage:
 * <monad-modal id="my-modal">
 *   <div slot="header">Title</div>
 *   <div slot="body">Content</div>
 *   <div slot="footer">
 *     <button>Cancel</button>
 *     <button>Confirm</button>
 *   </div>
 * </monad-modal>
 * 
 * JavaScript API:
 * modal.open()
 * modal.close()
 * modal.addEventListener('open', () => {})
 * modal.addEventListener('close', () => {})
 */

class MonadModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    
    // Open if attribute present
    if (this.hasAttribute('open')) {
      this.open();
    }
  }

  static get observedAttributes() {
    return ['open', 'size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      if (newValue !== null) {
        this.open();
      } else {
        this.close();
      }
    }
    
    if (name === 'size' && this.shadowRoot) {
      this.updateSize();
    }
  }

  render() {
    const size = this.getAttribute('size') || '';
    const sizeClass = size ? `modal-${size}` : '';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/dist/styles/monad.css">
      <style>
        :host {
          display: none;
        }
        :host([open]) {
          display: block;
        }
      </style>
      
      <div class="modal ${sizeClass} open">
        <div class="modal-backdrop" part="backdrop"></div>
        <div class="modal-content" part="content">
          <div class="modal-header" part="header">
            <slot name="header"></slot>
            <button class="modal-close" part="close" aria-label="Close">×</button>
          </div>
          <div class="modal-body" part="body">
            <slot name="body"></slot>
            <slot></slot>
          </div>
          <div class="modal-footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
    const closeButton = this.shadowRoot.querySelector('.modal-close');

    backdrop.addEventListener('click', () => this.close());
    closeButton.addEventListener('click', () => this.close());

    // ESC key to close
    this._escapeHandler = (e) => {
      if (e.key === 'Escape' && this._isOpen) {
        this.close();
      }
    };
    document.addEventListener('keydown', this._escapeHandler);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._escapeHandler);
  }

  updateSize() {
    const modal = this.shadowRoot.querySelector('.modal');
    const size = this.getAttribute('size');
    
    modal.className = 'modal open';
    if (size) {
      modal.classList.add(`modal-${size}`);
    }
  }

  open() {
    if (this._isOpen) return;
    
    this._isOpen = true;
    this.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    
    this.dispatchEvent(new CustomEvent('open', {
      bubbles: true,
      composed: true
    }));
  }

  close() {
    if (!this._isOpen) return;
    
    this._isOpen = false;
    this.removeAttribute('open');
    document.body.style.overflow = '';
    
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  toggle() {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  get isOpen() {
    return this._isOpen;
  }
}

customElements.define('monad-modal', MonadModal);

export default MonadModal;
