/**
 * MonadAlert - Custom Element for Alert/Toast Notifications
 * 
 * Usage:
 * <monad-alert type="success" dismissible>
 *   Operation completed successfully
 * </monad-alert>
 * 
 * <monad-alert type="error" dismissible duration="5000">
 *   <strong>Error</strong> Something went wrong
 * </monad-alert>
 * 
 * JavaScript API:
 * const alert = document.createElement('monad-alert');
 * alert.type = 'success';
 * alert.message = 'Saved!';
 * alert.show();
 * 
 * MonadAlert.toast('Success!', 'success', 3000);
 */

class MonadAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._timeoutId = null;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();

    // Auto dismiss if duration is set
    const duration = this.getAttribute('duration');
    if (duration) {
      this.autoDismiss(parseInt(duration));
    }
  }

  static get observedAttributes() {
    return ['type', 'dismissible', 'duration'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.shadowRoot && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const type = this.getAttribute('type') || 'info';
    const dismissible = this.hasAttribute('dismissible');
    const isToast = this.hasAttribute('toast');

    const baseClass = isToast ? 'toast' : 'alert';
    const typeClass = `${baseClass}-${type}`;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/dist/styles/monad.css">
      <style>
        :host {
          display: block;
        }
        :host([hidden]) {
          display: none;
        }
      </style>
      
      <div class="${baseClass} ${typeClass}" part="alert">
        <div class="alert-content" part="content">
          <slot></slot>
        </div>
        ${dismissible ? `
          <button class="alert-close" part="close" aria-label="Close">×</button>
        ` : ''}
      </div>
    `;

    if (dismissible) {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    const closeButton = this.shadowRoot.querySelector('.alert-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.dismiss());
    }
  }

  disconnectedCallback() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  autoDismiss(duration) {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    this._timeoutId = setTimeout(() => {
      this.dismiss();
    }, duration);
  }

  dismiss() {
    this.dispatchEvent(new CustomEvent('dismiss', {
      bubbles: true,
      composed: true
    }));

    // Add exit animation
    const alertEl = this.shadowRoot.querySelector('.alert, .toast');
    if (alertEl) {
      alertEl.classList.add('toast-exit');
      setTimeout(() => {
        this.remove();
      }, 300);
    } else {
      this.remove();
    }
  }

  show() {
    this.removeAttribute('hidden');
  }

  hide() {
    this.setAttribute('hidden', '');
  }

  get type() {
    return this.getAttribute('type') || 'info';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get message() {
    return this.textContent;
  }

  set message(value) {
    this.textContent = value;
  }

  // Static helper to create toast notifications
  static toast(message, type = 'info', duration = 3000) {
    // Create or get toast container
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const alert = document.createElement('monad-alert');
    alert.setAttribute('toast', '');
    alert.setAttribute('type', type);
    alert.setAttribute('dismissible', '');
    alert.textContent = message;

    container.appendChild(alert);

    // Auto dismiss
    alert.autoDismiss(duration);

    return alert;
  }
}

customElements.define('monad-alert', MonadAlert);

export default MonadAlert;
