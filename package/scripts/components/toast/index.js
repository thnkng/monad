/**
 * MonadToast Web Component
 * Non-intrusive notification with auto-dismiss
 * 
 * @example
 * const toast = document.createElement('monad-toast');
 * toast.type = 'success';
 * toast.message = 'Operation completed!';
 * toast.duration = 3000;
 * toast.show();
 */

class MonadToast extends HTMLElement {
  constructor() {
    super();
    this._duration = 3000;
    this._timeoutId = null;
  }

  static get observedAttributes() {
    return ['type', 'message', 'duration', 'icon'];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
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

  get icon() {
    return this.getAttribute('icon') || this.getDefaultIcon();
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }

  getDefaultIcon() {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[this.type] || 'ℹ';
  }

  render() {
    const typeClass = this.type ? `toast-${this.type}` : '';
    
    this.className = `toast ${typeClass}`;
    
    this.innerHTML = `
      <span class="toast-icon">${this.icon}</span>
      <p>${this.message || this.innerHTML}</p>
      <button class="toast-close" aria-label="Fechar">×</button>
    `;

    // Close button handler
    const closeBtn = this.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }
  }

  show() {
    // Remove dismissing class if exists
    this.classList.remove('toast-dismissing');
    
    // Dispatch show event
    this.dispatchEvent(new CustomEvent('toast-show', {
      bubbles: true,
      detail: { type: this.type, message: this.message }
    }));

    // Auto-hide after duration
    if (this.duration > 0) {
      this._timeoutId = setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  hide() {
    // Clear timeout
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }

    // Add dismissing animation
    this.classList.add('toast-dismissing');

    // Dispatch hide event
    this.dispatchEvent(new CustomEvent('toast-hide', {
      bubbles: true,
      detail: { type: this.type, message: this.message }
    }));

    // Remove after animation
    setTimeout(() => {
      this.remove();
    }, 200);
  }
}

// Static helper to create and show toast
MonadToast.show = function(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  
  // Create container if doesn't exist
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container toast-top-right';
    document.body.appendChild(container);
  }

  const toast = document.createElement('monad-toast');
  toast.type = type;
  toast.message = message;
  toast.duration = duration;
  
  container.appendChild(toast);
  toast.show();

  return toast;
};

customElements.define('monad-toast', MonadToast);

export default MonadToast;
