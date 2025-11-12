/**
 * MonadDropdown - Semantic Dropdown using native HTML
 * 
 * Usage with semantic HTML:
 * <monad-dropdown>
 *   <button>Options ▾</button>
 *   <menu class="dropdown">
 *     <li><button class="hoverable">Edit</button></li>
 *     <li><button class="hoverable">Delete</button></li>
 *   </menu>
 * </monad-dropdown>
 * 
 * JavaScript API:
 * dropdown.open()
 * dropdown.close()
 * dropdown.toggle()
 * dropdown.addEventListener('dropdown-open', () => {})
 * dropdown.addEventListener('dropdown-close', () => {})
 */

class MonadDropdown extends HTMLElement {
  constructor() {
    super();
    this._isOpen = false;
  }

  connectedCallback() {
    this.init();
    this.setupEventListeners();
  }

  init() {
    // Find trigger (first button or element with role="button")
    this._trigger = this.querySelector('button:first-of-type, [role="button"]:first-of-type');
    
    // Find menu (menu tag or element with role="menu")
    this._menu = this.querySelector('menu, [role="menu"]');

    if (!this._trigger || !this._menu) {
      console.warn('MonadDropdown: Missing trigger button or menu element');
      return;
    }

    // Ensure proper classes
    if (!this._menu.classList.contains('dropdown')) {
      this._menu.classList.add('dropdown');
    }

    // Set initial state
    this._menu.hidden = true;
    this._menu.setAttribute('aria-hidden', 'true');
    
    // Link trigger to menu
    this._trigger.setAttribute('aria-haspopup', 'true');
    this._trigger.setAttribute('aria-expanded', 'false');
    
    // Set positioning
    const position = this.getAttribute('position');
    if (position) {
      this._menu.classList.add(`dropdown-${position}`);
    }

    // Wrapper styling
    this.style.position = 'relative';
    this.style.display = 'inline-block';
  }

  setupEventListeners() {
    if (!this._trigger || !this._menu) return;

    // Toggle on trigger click
    this._trigger.addEventListener('click', (e) => {
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
        this._trigger.focus();
      }
    };
    document.addEventListener('keydown', this._escapeHandler);

    // Close when menu item is clicked
    const menuButtons = this._menu.querySelectorAll('button, a');
    menuButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.close();
      });
    });

    // Keyboard navigation in menu
    this._menu.addEventListener('keydown', (e) => {
      this.handleMenuKeyboard(e);
    });
  }

  handleMenuKeyboard(e) {
    if (!this._menu) return;

    const items = Array.from(this._menu.querySelectorAll('button:not([disabled]), a:not([disabled])'));
    const currentIndex = items.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex].focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0].focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1].focus();
        break;
    }
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._clickOutsideHandler);
    document.removeEventListener('keydown', this._escapeHandler);
  }

  open() {
    if (this._isOpen || !this._menu || !this._trigger) return;
    
    this._isOpen = true;
    this._menu.hidden = false;
    this._menu.setAttribute('aria-hidden', 'false');
    this._menu.classList.add('visible');
    this._trigger.setAttribute('aria-expanded', 'true');
    
    // Focus first menu item
    const firstItem = this._menu.querySelector('button:not([disabled]), a:not([disabled])');
    if (firstItem) {
      setTimeout(() => firstItem.focus(), 50);
    }
    
    this.dispatchEvent(new CustomEvent('dropdown-open', {
      bubbles: true,
      detail: { menu: this._menu }
    }));
  }

  close() {
    if (!this._isOpen || !this._menu || !this._trigger) return;
    
    this._isOpen = false;
    this._menu.hidden = true;
    this._menu.setAttribute('aria-hidden', 'true');
    this._menu.classList.remove('visible');
    this._trigger.setAttribute('aria-expanded', 'false');
    
    this.dispatchEvent(new CustomEvent('dropdown-close', {
      bubbles: true,
      detail: { menu: this._menu }
    }));
  }

  toggle() {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  // Public API
  get isOpen() {
    return this._isOpen;
  }
}

customElements.define('monad-dropdown', MonadDropdown);

export default MonadDropdown;
