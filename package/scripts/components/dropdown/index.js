/**
 * MonadDropdown - Dropdown 100% autônomo
 * 
 * Uso simples:
 * <monad-dropdown>
 *   <button>Opções</button>
 *   <ul>
 *     <li><a href="#">Editar</a></li>
 *     <li><a href="#">Excluir</a></li>
 *   </ul>
 * </monad-dropdown>
 * 
 * Recursos:
 * - Detecta trigger e menu automaticamente
 * - Cria overlay e estrutura completa
 * - Respeita temas CSS
 * - Posicionamento: position="left|right|top|bottom"
 * - Fecha ao clicar fora ou ESC
 */

class MonadDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
  }

  connectedCallback() {
    this.init();
    this.setupEventListeners();
  }

  init() {
    // Detectar trigger (primeiro botão)
    this._trigger = this.querySelector('button, [role="button"]');
    
    // Detectar menu (menu, ul, ol, ou div)
    this._menu = this.querySelector('menu, ul, ol, div:not(:first-child)');

    if (!this._trigger) {
      console.warn('MonadDropdown: Trigger button não encontrado');
      return;
    }
    
    if (!this._menu) {
      console.warn('MonadDropdown: Menu não encontrado');
      return;
    }

    const position = this.getAttribute('position') || 'bottom';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          display: inline-block;
        }
        
        .dropdown-trigger {
          display: contents;
        }
        
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          min-width: 12rem;
          max-width: 20rem;
          padding: var(--space-2, 0.5rem);
          background: var(--color-surface, var(--cloud-pure, #FFFFFF));
          border: 1px solid var(--color-border, var(--silver-line, #DADADA));
          border-radius: var(--radius-md, 8px);
          box-shadow: var(--shadow-medium, 0 4px 12px rgba(0,0,0,0.1));
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-0.5rem);
          transition: all var(--motion-duration-fast, 150ms);
          pointer-events: none;
        }
        
        :host([open]) .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }
        
        .dropdown-menu.left { left: auto; right: 0; }
        .dropdown-menu.right { left: 0; right: auto; }
        .dropdown-menu.top { top: auto; bottom: calc(100% + 0.5rem); }
        
        ::slotted(ul),
        ::slotted(ol),
        ::slotted(menu) {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        ::slotted(li) {
          margin: 0;
        }
        
        ::slotted(a),
        ::slotted(button) {
          display: block;
          width: 100%;
          padding: var(--space-2, 0.5rem) var(--space-3, 0.75rem);
          text-align: left;
          border: none;
          background: transparent;
          color: var(--color-on-surface, var(--graphite-mind, #0D1117));
          border-radius: var(--radius-sm, 6px);
          cursor: pointer;
          transition: background var(--motion-duration-fast, 150ms);
          text-decoration: none;
        }
        
        ::slotted(a:hover),
        ::slotted(button:hover) {
          background: var(--cloud-silent, #F4F4F4);
        }
      </style>
      
      <div class="dropdown-trigger">
        <slot name="trigger"></slot>
      </div>
      <div class="dropdown-menu ${position}" part="menu" role="menu">
        <slot></slot>
      </div>
    `;
    
    // Mover trigger para slot
    this._trigger.setAttribute('slot', 'trigger');
    
    // Setup ARIA
    this._trigger.setAttribute('aria-haspopup', 'true');
    this._trigger.setAttribute('aria-expanded', 'false');
  }

  setupEventListeners() {
    if (!this._trigger) return;

    // Toggle no trigger
    this._trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Fechar ao clicar fora
    this._clickOutsideHandler = (e) => {
      if (this._isOpen && !this.contains(e.target) && !this.shadowRoot.contains(e.target)) {
        this.close();
      }
    };
    document.addEventListener('click', this._clickOutsideHandler);

    // ESC key
    this._escapeHandler = (e) => {
      if (e.key === 'Escape' && this._isOpen) {
        this.close();
        this._trigger.focus();
      }
    };
    document.addEventListener('keydown', this._escapeHandler);

    // Fechar ao clicar em item
    this.addEventListener('click', (e) => {
      const item = e.target.closest('a, button');
      if (item && item !== this._trigger) {
        setTimeout(() => this.close(), 100);
      }
    });
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._clickOutsideHandler);
    document.removeEventListener('keydown', this._escapeHandler);
  }

  open() {
    if (this._isOpen) return;
    
    this._isOpen = true;
    this.setAttribute('open', '');
    this._trigger.setAttribute('aria-expanded', 'true');
    
    this.dispatchEvent(new CustomEvent('dropdown-open', {
      bubbles: true
    }));
  }

  close() {
    if (!this._isOpen) return;
    
    this._isOpen = false;
    this.removeAttribute('open');
    this._trigger.setAttribute('aria-expanded', 'false');
    
    this.dispatchEvent(new CustomEvent('dropdown-close', {
      bubbles: true
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
