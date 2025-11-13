/**
 * MonadSidebar - Sidebar 100% autônomo
 * 
 * Uso simples:
 * <monad-sidebar>
 *   <header>
 *     <h1>Logo</h1>
 *   </header>
 *   <nav>
 *     <a href="/">Home</a>
 *     <a href="/about">Sobre</a>
 *   </nav>
 * </monad-sidebar>
 * 
 * Trigger externo:
 * <button data-sidebar-toggle>Menu</button>
 * 
 * Recursos:
 * - Detecta estrutura automaticamente
 * - Cria botão toggle e overlay
 * - Responsivo (collapse desktop, overlay mobile)
 * - Respeita temas CSS
 * - Persiste estado no localStorage
 * - Atalho: Ctrl/Cmd + B
 */

class MonadSidebar extends HTMLElement {
  constructor() {
    super();
    this.isCollapsed = false;
    this.isMobile = window.innerWidth <= 768;
  }

  connectedCallback() {
    this.classList.add('sidebar');
    this.render();
    this.setupEventListeners();
    this.checkMobile();
    this.setupExternalTriggers();
  }

  render() {
    // Criar toggle button se não existir
    let toggle = this.querySelector('.sidebar-toggle');
    if (!toggle) {
      const header = this.querySelector('header, .sidebar-header');
      if (header) {
        toggle = document.createElement('button');
        toggle.className = 'sidebar-toggle';
        toggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
        toggle.setAttribute('aria-label', 'Toggle sidebar');
        toggle.setAttribute('type', 'button');
        header.appendChild(toggle);
      }
    }

    // Criar overlay para mobile
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
    }
    
    this._overlay = overlay;
  }
  
  setupExternalTriggers() {
    // Botões com data-sidebar-toggle
    const triggers = document.querySelectorAll('[data-sidebar-toggle]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.toggle());
    });
  }

  setupEventListeners() {
    // Toggle button
    const toggle = this.querySelector('.sidebar-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    // Overlay click (mobile)
    if (this._overlay) {
      this._overlay.addEventListener('click', () => this.close());
    }

    // Atalho de teclado (Ctrl+B ou Cmd+B)
    this._keyboardHandler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        this.toggle();
      }
      
      // ESC para fechar (mobile)
      if (e.key === 'Escape' && this.isMobile && this.classList.contains('open')) {
        this.close();
      }
    };
    document.addEventListener('keydown', this._keyboardHandler);

    // Responsive check
    this._resizeHandler = () => this.checkMobile();
    window.addEventListener('resize', this._resizeHandler);

    // Active link tracking
    this.trackActiveLink();
  }
  
  disconnectedCallback() {
    document.removeEventListener('keydown', this._keyboardHandler);
    window.removeEventListener('resize', this._resizeHandler);
    if (this._overlay && this._overlay.parentNode) {
      this._overlay.remove();
    }
  }

  toggle() {
    if (this.isMobile) {
      this.classList.contains('open') ? this.close() : this.open();
    } else {
      this.isCollapsed ? this.expand() : this.collapse();
    }
  }

  collapse() {
    this.classList.add('collapsed');
    this.isCollapsed = true;
    this.setAttribute('aria-expanded', 'false');
    
    localStorage.setItem('monad-sidebar-collapsed', 'true');
    
    this.dispatchEvent(new CustomEvent('sidebar-collapse', {
      bubbles: true,
      detail: { collapsed: true }
    }));
  }

  expand() {
    this.classList.remove('collapsed');
    this.isCollapsed = false;
    this.setAttribute('aria-expanded', 'true');
    
    localStorage.setItem('monad-sidebar-collapsed', 'false');
    
    this.dispatchEvent(new CustomEvent('sidebar-expand', {
      bubbles: true,
      detail: { collapsed: false }
    }));
  }

  open() {
    this.classList.add('open');
    if (this._overlay) {
      this._overlay.classList.add('visible');
    }
    document.body.style.overflow = 'hidden';
    
    this.dispatchEvent(new CustomEvent('sidebar-open', {
      bubbles: true
    }));
  }

  close() {
    this.classList.remove('open');
    if (this._overlay) {
      this._overlay.classList.remove('visible');
    }
    document.body.style.overflow = '';
    
    this.dispatchEvent(new CustomEvent('sidebar-close', {
      bubbles: true
    }));
  }

  checkMobile() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== this.isMobile) {
      if (!this.isMobile) {
        // Desktop: restaurar estado colapsado
        const collapsed = localStorage.getItem('monad-sidebar-collapsed') === 'true';
        if (collapsed) {
          this.collapse();
        } else {
          this.expand();
        }
        this.close();
      } else {
        // Mobile: começar fechado
        this.classList.remove('collapsed');
        this.close();
      }
    }
  }

  trackActiveLink() {
    const links = this.querySelectorAll('a, .sidebar-link');
    const currentPath = window.location.pathname;
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href === currentPath) {
        link.classList.add('active');
      }
      
      link.addEventListener('click', () => {
        // Remover active de todos
        links.forEach(l => l.classList.remove('active'));
        // Adicionar ao clicado
        link.classList.add('active');
        
        // Fechar no mobile após clicar
        if (this.isMobile) {
          setTimeout(() => this.close(), 150);
        }
      });
    });
  }

  // API pública
  isOpen() {
    return this.classList.contains('open');
  }

  isCollapsedState() {
    return this.isCollapsed;
  }
}

customElements.define('monad-sidebar', MonadSidebar);

export default MonadSidebar;
