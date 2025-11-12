/**
 * MonadDropdown - Custom Element for Dropdown Menu
 * 
 * Usage:
 * <monad-dropdown>
 *   <button slot="trigger">Options</button>
 *   <div slot="menu">
 *     <button class="dropdown-item">Edit</button>
 *     <button class="dropdown-item">Delete</button>
 *   </div>
 * </monad-dropdown>
 * 
 * JavaScript API:
 * dropdown.open()
 * dropdown.close()
 * dropdown.toggle()
 * dropdown.addEventListener('open', () => {})
 * dropdown.addEventListener('close', () => {})
 */

class MonadDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  static get observedAttributes() {
    return ['open', 'position'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      if (newValue !== null) {
        this.open();
      } else {
        this.close();
      }
    }
    
    if (name === 'position' && this.shadowRoot) {
      this.updatePosition();
    }
  }

  render() {
    const position = this.getAttribute('position') || '';
    const positionClass = position ? `dropdown-${position}` : '';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/dist/styles/monad.css">
      <style>
        :host {
          display: inline-block;
        }
      </style>
      
      <div class="dropdown ${positionClass}" part="dropdown">
        <div class="dropdown-trigger" part="trigger">
          <slot name="trigger"></slot>
        </div>
        <div class="dropdown-menu" part="menu">
          <slot name="menu"></slot>
          <slot></slot>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const trigger = this.shadowRoot.querySelector('.dropdown-trigger');
    
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close on click outside
    this._clickOutsideHandler = (e) => {
      if (this._isOpen && !this.contains(e.target)) {
        this.close();
      }
    };
    document.addEventListener('click', this._clickOutsideHandler);

    // Close on ESC key
    this._escapeHandler = (e) => {
      if (e.key === 'Escape' && this._isOpen) {
        this.close();
      }
    };
    document.addEventListener('keydown', this._escapeHandler);

    // Close when menu item is clicked
    const menu = this.shadowRoot.querySelector('.dropdown-menu');
    menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('dropdown-item')) {
        this.close();
      }
    });
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._clickOutsideHandler);
    document.removeEventListener('keydown', this._escapeHandler);
  }

  updatePosition() {
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    const position = this.getAttribute('position');
    
    dropdown.className = 'dropdown';
    if (position) {
      dropdown.classList.add(`dropdown-${position}`);
    }
    
    if (this._isOpen) {
      dropdown.classList.add('open');
    }
  }

  open() {
    if (this._isOpen) return;
    
    this._isOpen = true;
    this.setAttribute('open', '');
    
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    dropdown.classList.add('open');
    
    this.dispatchEvent(new CustomEvent('open', {
      bubbles: true,
      composed: true
    }));
  }

  close() {
    if (!this._isOpen) return;
    
    this._isOpen = false;
    this.removeAttribute('open');
    
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    dropdown.classList.remove('open');
    
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

customElements.define('monad-dropdown', MonadDropdown);

export default MonadDropdown;
