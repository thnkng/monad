/**
 * Active Navigation Web Component
 * Automatically highlights navigation links based on scroll position
 * Pure CSS couldn't solve this elegantly, so we use a minimal Web Component
 */

class MonadActiveNav extends HTMLElement {
  constructor() {
    super();
    this.sections = [];
    this.links = [];
    this.observer = null;
  }

  connectedCallback() {
    // Find all sections with IDs
    this.sections = Array.from(document.querySelectorAll('main section[id]'));
    
    // Find all navigation links
    this.links = Array.from(this.querySelectorAll('.sidebar-link'));
    
    // Use Intersection Observer for performance
    this.setupIntersectionObserver();
    
    // Initial check
    this.updateActiveLink();
  }

  setupIntersectionObserver() {
    const options = {
      rootMargin: '-100px 0px -66%',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveLink(entry.target.id);
        }
      });
    }, options);

    this.sections.forEach(section => {
      this.observer.observe(section);
    });
  }

  updateActiveLink(activeId) {
    if (!activeId) {
      // Find current section based on scroll position
      const scrollPosition = window.scrollY + 150;
      
      for (const section of this.sections) {
        if (section.offsetTop <= scrollPosition) {
          activeId = section.id;
        }
      }
    }

    // Remove active class from all links
    this.links.forEach(link => link.classList.remove('active'));

    // Add active class to matching link
    if (activeId) {
      const activeLink = this.querySelector(`.sidebar-link[href="#${activeId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

customElements.define('monad-active-nav', MonadActiveNav);

export default MonadActiveNav;
