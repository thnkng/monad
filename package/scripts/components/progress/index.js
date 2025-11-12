/**
 * MonadProgress Web Component
 * Visual progress indicator
 * 
 * @example
 * <monad-progress value="65" max="100" variant="flow" label="Upload"></monad-progress>
 */

class MonadProgress extends HTMLElement {
  constructor() {
    super();
    this._value = 0;
    this._max = 100;
  }

  static get observedAttributes() {
    return ['value', 'max', 'variant', 'size', 'label', 'indeterminate', 'striped', 'animated'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'value') this._value = parseFloat(newValue) || 0;
      if (name === 'max') this._max = parseFloat(newValue) || 100;
      this.render();
    }
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = Math.max(0, Math.min(this._max, parseFloat(val) || 0));
    this.setAttribute('value', this._value);
  }

  get max() {
    return this._max;
  }

  set max(val) {
    this._max = Math.max(0, parseFloat(val) || 100);
    this.setAttribute('max', this._max);
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

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
  }

  get striped() {
    return this.hasAttribute('striped');
  }

  set striped(value) {
    if (value) {
      this.setAttribute('striped', '');
    } else {
      this.removeAttribute('striped');
    }
  }

  get animated() {
    return this.hasAttribute('animated');
  }

  set animated(value) {
    if (value) {
      this.setAttribute('animated', '');
    } else {
      this.removeAttribute('animated');
    }
  }

  get percentage() {
    return Math.round((this._value / this._max) * 100);
  }

  render() {
    const percentage = this.percentage;
    
    // Build progress bar classes
    const barClasses = ['progress-bar'];
    if (this.variant) barClasses.push(this.variant);
    if (this.indeterminate) barClasses.push('progress-bar-indeterminate');
    if (this.striped) barClasses.push('progress-bar-striped');
    if (this.animated) barClasses.push('progress-bar-animated');

    // Build progress container classes
    const containerClasses = ['progress'];
    if (this.size) containerClasses.push(`progress-${this.size}`);

    // Render with or without label
    if (this.label) {
      this.className = 'progress-wrapper';
      this.innerHTML = `
        <div class="progress-label">
          <span>${this.label}</span>
          <span class="progress-value">${percentage}%</span>
        </div>
        <div class="${containerClasses.join(' ')}">
          <div class="${barClasses.join(' ')}" 
               style="width: ${this.indeterminate ? '40%' : percentage + '%'}"
               role="progressbar" 
               aria-valuenow="${this._value}" 
               aria-valuemin="0" 
               aria-valuemax="${this._max}">
          </div>
        </div>
      `;
    } else {
      this.className = containerClasses.join(' ');
      this.innerHTML = `
        <div class="${barClasses.join(' ')}" 
             style="width: ${this.indeterminate ? '40%' : percentage + '%'}"
             role="progressbar" 
             aria-valuenow="${this._value}" 
             aria-valuemin="0" 
             aria-valuemax="${this._max}">
        </div>
      `;
    }
  }

  increment(amount = 1) {
    this.value = this._value + amount;
  }

  decrement(amount = 1) {
    this.value = this._value - amount;
  }

  reset() {
    this.value = 0;
  }

  complete() {
    this.value = this._max;
  }
}

customElements.define('monad-progress', MonadProgress);

export default MonadProgress;
