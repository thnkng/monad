/**
 * MonadTabs Web Component
 * Semantic tabbed navigation using standard HTML elements
 * 
 * @example
 * <monad-tabs>
 *   <ul role="tablist">
 *     <li role="tab" class="active">Tab 1</li>
 *     <li role="tab">Tab 2</li>
 *     <li role="tab">Tab 3</li>
 *   </ul>
 *   <div role="tabpanel">Content 1</div>
 *   <div role="tabpanel">Content 2</div>
 *   <div role="tabpanel">Content 3</div>
 * </monad-tabs>
 */

class MonadTabs extends HTMLElement {
  constructor() {
    super();
    this._activeIndex = 0;
  }

  connectedCallback() {
    this.setAttribute('role', 'tabs');
    this.init();
    this.attachEventListeners();
    this.updateActiveTab();
  }

  init() {
    const tablist = this.querySelector('[role="tablist"]');
    const tabs = this.querySelectorAll('[role="tab"]');
    const panels = this.querySelectorAll('[role="tabpanel"]');

    if (!tablist || tabs.length === 0 || panels.length === 0) {
      console.warn('MonadTabs: Missing required elements (tablist, tabs, or panels)');
      return;
    }

    // Ensure tablist has proper class
    if (!tablist.classList.contains('tabs')) {
      tablist.classList.add('tabs');
    }

    // Setup tabs
    tabs.forEach((tab, index) => {
      if (!tab.classList.contains('tab')) {
        tab.classList.add('tab');
      }
      if (!tab.classList.contains('hoverable')) {
        tab.classList.add('hoverable');
      }
      
      // ARIA attributes
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('aria-controls', `panel-${index}`);
      tab.id = `tab-${index}`;
      
      // Check for initial active
      if (tab.classList.contains('active')) {
        this._activeIndex = index;
      }
    });

    // Setup panels
    panels.forEach((panel, index) => {
      if (!panel.classList.contains('tab-content')) {
        panel.classList.add('tab-content');
      }
      panel.setAttribute('aria-labelledby', `tab-${index}`);
      panel.id = `panel-${index}`;
      panel.hidden = true;
    });
  }

  attachEventListeners() {
    const tabs = this.querySelectorAll('[role="tab"]');
    
    tabs.forEach((tab, index) => {
      // Click handler
      tab.addEventListener('click', () => {
        if (!tab.hasAttribute('disabled')) {
          this.setActiveTab(index);
        }
      });

      // Keyboard navigation
      tab.addEventListener('keydown', (e) => {
        this.handleKeyboard(e, index);
      });
    });
  }

  handleKeyboard(e, currentIndex) {
    const tabs = this.querySelectorAll('[role="tab"]');
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    this.setActiveTab(newIndex);
    tabs[newIndex].focus();
  }

  setActiveTab(index) {
    const tabs = this.querySelectorAll('[role="tab"]');
    const panels = this.querySelectorAll('[role="tabpanel"]');

    if (index < 0 || index >= tabs.length) return;

    // Update tabs
    tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Update panels
    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });

    this._activeIndex = index;

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('tab-change', {
      bubbles: true,
      detail: { 
        index, 
        tab: tabs[index], 
        panel: panels[index] 
      }
    }));
  }

  updateActiveTab() {
    this.setActiveTab(this._activeIndex);
  }

  // Public API
  get activeIndex() {
    return this._activeIndex;
  }

  set activeIndex(value) {
    this.setActiveTab(value);
  }

  next() {
    const tabs = this.querySelectorAll('[role="tab"]');
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
