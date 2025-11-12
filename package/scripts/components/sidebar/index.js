// ============================================
// Sidebar Web Component
// ============================================
// Interactive sidebar with collapse/expand functionality

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
  }

  render() {
    // Find or create toggle button
    let toggle = this.querySelector('.sidebar-toggle');
    if (!toggle) {
      const header = this.querySelector('.sidebar-header');
      if (header) {
        toggle = document.createElement('button');
        toggle.className = 'sidebar-toggle hoverable';
        toggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
        toggle.setAttribute('aria-label', 'Toggle sidebar');
        header.appendChild(toggle);
      }
    }

    // Create overlay for mobile
    if (!document.querySelector('.sidebar-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
    }
  }

  setupEventListeners() {
    // Toggle button
    const toggle = this.querySelector('.sidebar-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }

    // Overlay click (mobile)
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.close());
    }

    // Keyboard shortcut (Ctrl+B or Cmd+B)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        this.toggle();
      }
    });

    // Escape key to close (mobile)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobile && this.classList.contains('open')) {
        this.close();
      }
    });

    // Responsive check
    window.addEventListener('resize', () => this.checkMobile());

    // Active link tracking
    this.trackActiveLink();
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
    
    // Store preference
    localStorage.setItem('monad-sidebar-collapsed', 'true');
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('sidebar-collapse', {
      bubbles: true,
      detail: { collapsed: true }
    }));
  }

  expand() {
    this.classList.remove('collapsed');
    this.isCollapsed = false;
    this.setAttribute('aria-expanded', 'true');
    
    // Store preference
    localStorage.setItem('monad-sidebar-collapsed', 'false');
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('sidebar-expand', {
      bubbles: true,
      detail: { collapsed: false }
    }));
  }

  open() {
    this.classList.add('open');
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
      overlay.classList.add('visible');
    }
    document.body.style.overflow = 'hidden';
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('sidebar-open', {
      bubbles: true
    }));
  }

  close() {
    this.classList.remove('open');
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
      overlay.classList.remove('visible');
    }
    document.body.style.overflow = '';
    
    // Dispatch event
    this.dispatchEvent(new CustomEvent('sidebar-close', {
      bubbles: true
    }));
  }

  checkMobile() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== this.isMobile) {
      if (!this.isMobile) {
        // Desktop: restore collapsed state
        const collapsed = localStorage.getItem('monad-sidebar-collapsed') === 'true';
        if (collapsed) {
          this.collapse();
        } else {
          this.expand();
        }
        this.close();
      } else {
        // Mobile: start closed
        this.classList.remove('collapsed');
        this.close();
      }
    }
  }

  trackActiveLink() {
    const links = this.querySelectorAll('.sidebar-link');
    const currentPath = window.location.pathname;
    
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
      
      link.addEventListener('click', (e) => {
        // Remove active from all
        links.forEach(l => l.classList.remove('active'));
        // Add to clicked
        link.classList.add('active');
        
        // Close on mobile after click
        if (this.isMobile) {
          setTimeout(() => this.close(), 150);
        }
      });
    });
  }

  // Public API
  isOpen() {
    return this.classList.contains('open');
  }

  isCollapsedState() {
    return this.isCollapsed;
  }
}

// Register custom element
customElements.define('monad-sidebar', MonadSidebar);

export default MonadSidebar;
