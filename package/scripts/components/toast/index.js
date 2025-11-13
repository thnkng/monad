/**
 * MonadToast - Toast 100% autônomo
 * 
 * Uso simples (sem JavaScript):
 * 
 * <button data-toast="Salvo com sucesso!" data-toast-type="success">
 *   Salvar
 * </button>
 * 
 * Ou via JavaScript helper:
 * window.monad.toast('Mensagem', 'success');
 * 
 * Ou declarativo:
 * <monad-toast type="success" message="Bem-vindo!" auto-show></monad-toast>
 */

class MonadToast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._duration = 3000;
    this._timeoutId = null;
  }

  static get observedAttributes() {
    return ['type', 'message', 'duration', 'icon'];
  }

  connectedCallback() {
    this.render();
    
    // Auto-show se atributo presente
    if (this.hasAttribute('auto-show')) {
      setTimeout(() => this.show(), 100);
    }
  }

  disconnectedCallback() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot) {
      this.render();
    }
  }

  get type() {
    return this.getAttribute('type') || 'info';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get message() {
    return this.getAttribute('message') || '';
  }

  set message(value) {
    this.setAttribute('message', value);
  }

  get duration() {
    return parseInt(this.getAttribute('duration')) || this._duration;
  }

  set duration(value) {
    this.setAttribute('duration', value);
  }

  getIcon() {
    const custom = this.getAttribute('icon');
    if (custom) return custom;
    
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[this.type] || 'ℹ';
  }
  
  getColors() {
    const colors = {
      success: 'var(--state-flow, #33d469)',
      error: 'var(--state-break, #ff5c5c)',
      warning: 'var(--state-pulse, #ffc14d)',
      info: 'var(--thought, #1e3a5f)'
    };
    return colors[this.type] || colors.info;
  }

  render() {
    const color = this.getColors();
    const icon = this.getIcon();
    const message = this.message || this.textContent;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          min-width: 20rem;
          max-width: 28rem;
          padding: var(--space-4, 1rem) var(--space-5, 1.25rem);
          background: var(--color-surface, var(--cloud-pure, #FFFFFF));
          border-left: 3px solid ${color};
          border-radius: var(--radius-md, 8px);
          box-shadow: var(--shadow-medium, 0 4px 12px rgba(0,0,0,0.1));
          display: flex;
          align-items: center;
          gap: var(--space-3, 0.75rem);
          margin-bottom: var(--space-3, 0.75rem);
          animation: slideIn 250ms ease-out;
          color: var(--color-on-surface, var(--graphite-mind, #0D1117));
        }
        
        :host(.dismissing) {
          animation: slideOut 200ms ease-in forwards;
        }
        
        .toast-icon {
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${color};
          color: white;
          border-radius: var(--radius-sm, 6px);
          font-weight: var(--font-weight-bold, 700);
          font-size: var(--font-size-medium, 1rem);
          flex-shrink: 0;
        }
        
        .toast-message {
          flex: 1;
          margin: 0;
          font-size: var(--font-size-medium, 1rem);
          line-height: 1.5;
        }
        
        .toast-close {
          width: 1.5rem;
          height: 1.5rem;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm, 6px);
          color: var(--silver-depth, #8A8A8A);
          cursor: pointer;
          font-size: 1.25rem;
          line-height: 1;
          transition: all var(--motion-duration-fast, 150ms);
          flex-shrink: 0;
        }
        
        .toast-close:hover {
          background: var(--cloud-silent, #F4F4F4);
          color: var(--graphite-mind, #0D1117);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOut {
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      </style>
      
      <div class="toast-icon">${icon}</div>
      <p class="toast-message">${message}</p>
      <button class="toast-close" aria-label="Fechar" type="button">×</button>
    `;
    
    const closeBtn = this.shadowRoot.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.hide());
  }

  show() {
    this.classList.remove('dismissing');
    
    this.dispatchEvent(new CustomEvent('toast-show', {
      bubbles: true,
      detail: { type: this.type, message: this.message }
    }));

    if (this.duration > 0) {
      this._timeoutId = setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  hide() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }

    this.classList.add('dismissing');

    this.dispatchEvent(new CustomEvent('toast-hide', {
      bubbles: true,
      detail: { type: this.type, message: this.message }
    }));

    setTimeout(() => {
      this.remove();
    }, 200);
  }
}

customElements.define('monad-toast', MonadToast);

// Helper global: window.monad.toast()
if (!window.monad) window.monad = {};

window.monad.toast = function(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.style.cssText = `
      position: fixed;
      top: var(--space-5, 1.25rem);
      right: var(--space-5, 1.25rem);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('monad-toast');
  toast.type = type;
  toast.message = message;
  toast.duration = duration;
  toast.style.pointerEvents = 'auto';
  
  container.appendChild(toast);
  toast.show();

  return toast;
};

// Setup triggers em botões com data-toast
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-toast]');
  if (!trigger) return;
  
  const message = trigger.getAttribute('data-toast');
  const type = trigger.getAttribute('data-toast-type') || 'info';
  const duration = parseInt(trigger.getAttribute('data-toast-duration')) || 3000;
  
  window.monad.toast(message, type, duration);
});

export default MonadToast;
