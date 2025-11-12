/**
 * MonadPagination Web Component
 * Navigation between pages of content
 * 
 * @example
 * <monad-pagination current="1" total="10" siblings="1"></monad-pagination>
 */

class MonadPagination extends HTMLElement {
  constructor() {
    super();
    this._current = 1;
    this._total = 1;
    this._siblings = 1;
  }

  static get observedAttributes() {
    return ['current', 'total', 'siblings', 'variant', 'size'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'current') this._current = parseInt(newValue) || 1;
      if (name === 'total') this._total = parseInt(newValue) || 1;
      if (name === 'siblings') this._siblings = parseInt(newValue) || 1;
      this.render();
    }
  }

  get current() {
    return this._current;
  }

  set current(value) {
    this._current = parseInt(value) || 1;
    this.setAttribute('current', this._current);
  }

  get total() {
    return this._total;
  }

  set total(value) {
    this._total = parseInt(value) || 1;
    this.setAttribute('total', this._total);
  }

  get siblings() {
    return this._siblings;
  }

  set siblings(value) {
    this._siblings = parseInt(value) || 1;
    this.setAttribute('siblings', this._siblings);
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

  generatePageNumbers() {
    const pages = [];
    const start = Math.max(2, this._current - this._siblings);
    const end = Math.min(this._total - 1, this._current + this._siblings);

    // Always show first page
    pages.push(1);

    // Add ellipsis if needed
    if (start > 2) {
      pages.push('...');
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (end < this._total - 1) {
      pages.push('...');
    }

    // Always show last page (if more than 1 page)
    if (this._total > 1) {
      pages.push(this._total);
    }

    return pages;
  }

  render() {
    // Build class list
    const classes = ['pagination'];
    if (this.variant) classes.push(`pagination-${this.variant}`);
    if (this.size) classes.push(`pagination-${this.size}`);

    this.className = classes.join(' ');

    const pages = this.generatePageNumbers();
    
    this.innerHTML = `
      <button class="pagination-prev hoverable" ${this._current === 1 ? 'disabled' : ''}>
        Anterior
      </button>
      ${pages.map(page => {
        if (page === '...') {
          return '<span class="pagination-ellipsis">...</span>';
        }
        const isActive = page === this._current;
        return `<button class="${isActive ? 'active' : 'hoverable'}" data-page="${page}">${page}</button>`;
      }).join('')}
      <button class="pagination-next hoverable" ${this._current === this._total ? 'disabled' : ''}>
        Próximo
      </button>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Previous button
    const prevBtn = this.querySelector('.pagination-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.goToPrevious());
    }

    // Next button
    const nextBtn = this.querySelector('.pagination-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.goToNext());
    }

    // Page buttons
    const pageButtons = this.querySelectorAll('[data-page]');
    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        this.goToPage(page);
      });
    });
  }

  goToPage(page) {
    if (page < 1 || page > this._total || page === this._current) return;

    const oldPage = this._current;
    this.current = page;

    this.dispatchEvent(new CustomEvent('page-change', {
      bubbles: true,
      detail: { page, oldPage, total: this._total }
    }));
  }

  goToNext() {
    if (this._current < this._total) {
      this.goToPage(this._current + 1);
    }
  }

  goToPrevious() {
    if (this._current > 1) {
      this.goToPage(this._current - 1);
    }
  }
}

customElements.define('monad-pagination', MonadPagination);

export default MonadPagination;
