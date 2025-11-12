/**
 * MonadTabs Web Component
 * Tabbed navigation for content organization
 * 
 * @example
 * <monad-tabs>
 *   <button slot="tab" active>Tab 1</button>
 *   <button slot="tab">Tab 2</button>
 *   <div slot="panel">Content 1</div>
 *   <div slot="panel">Content 2</div>
 * </monad-tabs>
 */

class MonadTabs extends HTMLElement {
  constructor() {
    super();
    this._activeIndex = 0;
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    
    // Set initial active tab
    const initialActive = this.querySelector('[slot="tab"][active]');
    if (initialActive) {
      const tabs = this.querySelectorAll('[slot="tab"]');
      this._activeIndex = Array.from(tabs).indexOf(initialActive);
    }
    
    this.updateActiveTab();
  }

  render() {
    // Create tabs container
    const tabs = this.querySelectorAll('[slot="tab"]');
    const panels = this.querySelectorAll('[slot="panel"]');

    if (!this.querySelector('.tabs')) {
      const tabsContainer = document.createElement('div');
      tabsContainer.className = 'tabs';
      
      tabs.forEach((tab, index) => {
        tab.classList.add('tab');
        if (!tab.classList.contains('hoverable')) {
          tab.classList.add('hoverable');
        }
        tab.dataset.index = index;
        tabsContainer.appendChild(tab);
      });

      this.insertBefore(tabsContainer, this.firstChild);
    }

    // Create panels container
    if (!this.querySelector('.tabs-panels')) {
      const panelsContainer = document.createElement('div');
      panelsContainer.className = 'tabs-panels';
      
      panels.forEach((panel, index) => {
        panel.classList.add('tab-content');
        panel.dataset.index = index;
        panel.style.display = 'none';
        panelsContainer.appendChild(panel);
      });

      this.appendChild(panelsContainer);
    }
  }

  attachEventListeners() {
    const tabs = this.querySelectorAll('[slot="tab"]');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        if (!tab.disabled) {
          this.setActiveTab(index);
        }
      });
    });
  }

  setActiveTab(index) {
    const tabs = this.querySelectorAll('[slot="tab"]');
    const panels = this.querySelectorAll('[slot="panel"]');

    if (index < 0 || index >= tabs.length) return;

    // Remove active from all tabs
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Hide all panels
    panels.forEach(panel => panel.style.display = 'none');

    // Set new active
    this._activeIndex = index;
    tabs[index].classList.add('active');
    panels[index].style.display = 'block';

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('tab-change', {
      bubbles: true,
      detail: { index, tab: tabs[index], panel: panels[index] }
    }));
  }

  updateActiveTab() {
    this.setActiveTab(this._activeIndex);
  }

  get activeIndex() {
    return this._activeIndex;
  }

  set activeIndex(value) {
    this.setActiveTab(value);
  }

  next() {
    const tabs = this.querySelectorAll('[slot="tab"]');
    if (this._activeIndex < tabs.length - 1) {
      this.setActiveTab(this._activeIndex + 1);
    }
  }

  previous() {
    if (this._activeIndex > 0) {
      this.setActiveTab(this._activeIndex - 1);
    }
  }
}

customElements.define('monad-tabs', MonadTabs);

export default MonadTabs;
