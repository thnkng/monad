/**
 * MonadTabs - Tabs 100% autônomo
 * 
 * Uso simples:
 * <monad-tabs>
 *   <div>
 *     <button>Tab 1</button>
 *     <button>Tab 2</button>
 *   </div>
 *   <div>Conteúdo 1</div>
 *   <div>Conteúdo 2</div>
 * </monad-tabs>
 * 
 * Ou com lista:
 * <monad-tabs>
 *   <ul>
 *     <li><button>Tab 1</button></li>
 *     <li><button>Tab 2</button></li>
 *   </ul>
 *   <div>Conteúdo 1</div>
 *   <div>Conteúdo 2</div>
 * </monad-tabs>
 * 
 * Recursos:
 * - Detecta estrutura automaticamente
 * - Respeita temas CSS
 * - Navegação por teclado (Arrow, Home, End)
 * - Ativa tab inicial: active attribute no botão
 */

class MonadTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._activeIndex = 0;
  }

  connectedCallback() {
    this.init();
    this.setupEventListeners();
    this.updateActiveTab();
  }

  init() {
    // Detectar tabs (botões no primeiro container)
    const firstChild = this.children[0];
    let tabs = [];
    
    if (firstChild.tagName === 'UL' || firstChild.tagName === 'OL') {
      tabs = Array.from(firstChild.querySelectorAll('button, a, [role="tab"]'));
    } else {
      tabs = Array.from(firstChild.querySelectorAll('button, a, [role="tab"]'));
      if (tabs.length === 0) {
        tabs = Array.from(firstChild.children).filter(el => 
          el.tagName === 'BUTTON' || el.tagName === 'A'
        );
      }
    }
    
    // Detectar panels (demais elementos)
    const panels = Array.from(this.children).slice(1);
    
    if (tabs.length === 0) {
      console.warn('MonadTabs: Nenhum tab encontrado');
      return;
    }
    
    if (panels.length === 0) {
      console.warn('MonadTabs: Nenhum panel encontrado');
      return;
    }
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .tabs-container {
          display: flex;
          flex-direction: column;
          gap: var(--space-4, 1rem);
        }
        
        .tabs-list {
          display: flex;
          gap: var(--space-2, 0.5rem);
          border-bottom: 2px solid var(--color-border, var(--silver-line, #DADADA));
        }
        
        ::slotted(ul),
        ::slotted(ol) {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: var(--space-2, 0.5rem);
          border-bottom: 2px solid var(--color-border, var(--silver-line, #DADADA));
        }
        
        ::slotted(ul li),
        ::slotted(ol li) {
          margin: 0;
        }
        
        ::slotted(button),
        ::slotted(a) {
          padding: var(--space-3, 0.75rem) var(--space-4, 1rem);
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          color: var(--silver-depth, #8A8A8A);
          font-weight: var(--font-weight-medium, 500);
          cursor: pointer;
          transition: all var(--motion-duration-fast, 150ms);
          text-decoration: none;
        }
        
        ::slotted(button:hover),
        ::slotted(a:hover) {
          color: var(--color-on-surface, var(--graphite-mind, #0D1117));
        }
        
        ::slotted(button.active),
        ::slotted(a.active),
        ::slotted(button[active]),
        ::slotted(a[active]) {
          color: var(--color-primary, var(--thought, #1e3a5f));
          border-bottom-color: var(--color-primary, var(--thought, #1e3a5f));
        }
        
        .tab-panels {
          display: contents;
        }
        
        ::slotted([slot="panel"]) {
          display: none;
        }
        
        ::slotted([slot="panel"].active) {
          display: block;
          animation: fadeIn 200ms ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(0.5rem); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      
      <div class="tabs-container">
        <slot name="tabs"></slot>
        <div class="tab-panels">
          <slot name="panel"></slot>
        </div>
      </div>
    `;
    
    // Mover tabs para slot
    firstChild.setAttribute('slot', 'tabs');
    
    // Mover panels para slot
    panels.forEach((panel, index) => {
      panel.setAttribute('slot', 'panel');
      panel.classList.add('tab-panel');
      panel.id = `panel-${index}`;
    });
    
    // Setup tabs
    tabs.forEach((tab, index) => {
      tab.classList.add('tab');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      tab.setAttribute('aria-controls', `panel-${index}`);
      tab.id = `tab-${index}`;
      
      // Verificar tab ativo inicial
      if (tab.hasAttribute('active') || tab.classList.contains('active')) {
        this._activeIndex = index;
      }
    });
    
    this._tabs = tabs;
    this._panels = panels;
  }

  setupEventListeners() {
    if (!this._tabs) return;
    
    this._tabs.forEach((tab, index) => {
      // Click handler
      tab.addEventListener('click', (e) => {
        e.preventDefault();
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
    if (!this._tabs) return;
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (currentIndex + 1) % this._tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = (currentIndex - 1 + this._tabs.length) % this._tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = this._tabs.length - 1;
        break;
      default:
        return;
    }

    this.setActiveTab(newIndex);
    this._tabs[newIndex].focus();
  }

  setActiveTab(index) {
    if (!this._tabs || !this._panels) return;
    if (index < 0 || index >= this._tabs.length) return;

    // Atualizar tabs
    this._tabs.forEach((tab, i) => {
      const isActive = i === index;
      if (isActive) {
        tab.classList.add('active');
        tab.setAttribute('active', '');
      } else {
        tab.classList.remove('active');
        tab.removeAttribute('active');
      }
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Atualizar panels
    this._panels.forEach((panel, i) => {
      if (i === index) {
        panel.classList.add('active');
        panel.removeAttribute('hidden');
      } else {
        panel.classList.remove('active');
        panel.setAttribute('hidden', '');
      }
    });

    this._activeIndex = index;

    // Evento de mudança
    this.dispatchEvent(new CustomEvent('tab-change', {
      bubbles: true,
      detail: { 
        index, 
        tab: this._tabs[index], 
        panel: this._panels[index] 
      }
    }));
  }

  updateActiveTab() {
    this.setActiveTab(this._activeIndex);
  }

  // API pública
  get activeIndex() {
    return this._activeIndex;
  }

  set activeIndex(value) {
    this.setActiveTab(value);
  }

  next() {
    if (this._tabs && this._activeIndex < this._tabs.length - 1) {
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
