/**
 * MonadModal - Modal 100% autônomo
 * 
 * Uso simples (sem JavaScript):
 * 
 * <monad-modal id="my-modal" title="Título">
 *   Conteúdo do modal aqui
 * </monad-modal>
 * 
 * <button data-modal-target="my-modal">Abrir Modal</button>
 * 
 * Recursos:
 * - Cria overlay, botão fechar, estrutura completa automaticamente
 * - Respeita temas CSS (cores do tema ativo)
 * - Suporta slots: header, body, footer
 * - Triggers via data-modal-target
 * - Abrir automaticamente: open attribute
 * - Tamanhos: size="small|large"
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
    this.setupTriggers();
    
    // Abrir se atributo presente
    if (this.hasAttribute('open')) {
      setTimeout(() => this.open(), 100);
    }
  }

  static get observedAttributes() {
    return ['open', 'size', 'title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
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
    
    if (name === 'title' && this.shadowRoot) {
      const titleEl = this.shadowRoot.querySelector('.modal-title');
      if (titleEl) titleEl.textContent = newValue;
    }
  }

  render() {
    const size = this.getAttribute('size') || 'medium';
    const title = this.getAttribute('title') || '';
    const hasFooterSlot = this.querySelector('[slot="footer"]');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 1000;
        }
        
        :host([open]) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: color-mix(in srgb, var(--graphite-mind, #0D1117) 50%, transparent);
          backdrop-filter: blur(4px);
          animation: fadeIn 200ms ease-out;
        }
        
        .modal-dialog {
          position: relative;
          width: 90%;
          max-width: 32rem;
          max-height: 90vh;
          background: var(--color-surface, var(--cloud-pure, #FFFFFF));
          border-radius: var(--radius-lg, 12px);
          box-shadow: var(--shadow-medium, 0 8px 24px rgba(0,0,0,0.12));
          display: flex;
          flex-direction: column;
          animation: slideUp 250ms ease-out;
          overflow: hidden;
        }
        
        .modal-dialog.small { max-width: 24rem; }
        .modal-dialog.large { max-width: 48rem; }
        
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-5, 1.25rem) var(--space-6, 1.5rem);
          border-bottom: 1px solid var(--color-border, var(--silver-line, #DADADA));
        }
        
        .modal-title {
          font-size: var(--font-size-large, 1.125rem);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--color-on-surface, var(--graphite-mind, #0D1117));
          margin: 0;
        }
        
        .modal-close {
          width: 2rem;
          height: 2rem;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm, 6px);
          color: var(--silver-depth, #8A8A8A);
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 1;
          transition: all var(--motion-duration-fast, 150ms);
        }
        
        .modal-close:hover {
          background: var(--cloud-silent, #F4F4F4);
          color: var(--graphite-mind, #0D1117);
        }
        
        .modal-body {
          flex: 1;
          padding: var(--space-6, 1.5rem);
          overflow-y: auto;
          color: var(--color-on-surface, var(--graphite-mind, #0D1117));
        }
        
        .modal-footer {
          display: flex;
          gap: var(--space-3, 0.75rem);
          padding: var(--space-5, 1.25rem) var(--space-6, 1.5rem);
          border-top: 1px solid var(--color-border, var(--silver-line, #DADADA));
          justify-content: flex-end;
        }
        
        .modal-footer:empty {
          display: none;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(2rem) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      </style>
      
      <div class="modal-backdrop" part="backdrop"></div>
      <div class="modal-dialog ${size}" part="dialog" role="dialog" aria-modal="true">
        <div class="modal-header" part="header">
          <slot name="header">
            <h2 class="modal-title">${title}</h2>
          </slot>
          <button class="modal-close" part="close" aria-label="Fechar" type="button">×</button>
        </div>
        <div class="modal-body" part="body">
          <slot></slot>
        </div>
        ${hasFooterSlot ? '<div class="modal-footer" part="footer"><slot name="footer"></slot></div>' : ''}
      </div>
    `;
  }

  setupEventListeners() {
    const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
    const closeButton = this.shadowRoot.querySelector('.modal-close');

    backdrop.addEventListener('click', () => this.close());
    closeButton.addEventListener('click', () => this.close());

    // ESC key
    this._escapeHandler = (e) => {
      if (e.key === 'Escape' && this._isOpen) {
        this.close();
      }
    };
    document.addEventListener('keydown', this._escapeHandler);
    
    // Botões internos com data-modal-close
    this.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-modal-close')) {
        this.close();
      }
    });
  }
  
  setupTriggers() {
    // Buscar triggers no documento
    const id = this.id;
    if (!id) return;
    
    const triggers = document.querySelectorAll(`[data-modal-target="${id}"]`);
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._escapeHandler);
  }

  updateSize() {
    const dialog = this.shadowRoot.querySelector('.modal-dialog');
    const size = this.getAttribute('size') || 'medium';
    
    dialog.className = 'modal-dialog';
    if (size !== 'medium') {
      dialog.classList.add(size);
    }
  }

  open() {
    if (this._isOpen) return;
    
    this._isOpen = true;
    this.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    
    this.dispatchEvent(new CustomEvent('modal-open', {
      bubbles: true,
      composed: true
    }));
  }

  close() {
    if (!this._isOpen) return;
    
    this._isOpen = false;
    this.removeAttribute('open');
    document.body.style.overflow = '';
    
    this.dispatchEvent(new CustomEvent('modal-close', {
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
