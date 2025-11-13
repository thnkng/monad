/**
 * MonadActiveNav - Navegação ativa automática
 * 
 * Uso simples:
 * <monad-active-nav>
 *   <a href="#section1">Seção 1</a>
 *   <a href="#section2">Seção 2</a>
 *   <a href="#section3">Seção 3</a>
 * </monad-active-nav>
 * 
 * Ou com grupos:
 * <monad-active-nav>
 *   <strong>Grupo 1</strong>
 *   <a href="#item1">Item 1</a>
 *   <a href="#item2">Item 2</a>
 *   <strong>Grupo 2</strong>
 *   <a href="#item3">Item 3</a>
 * </monad-active-nav>
 * 
 * Recursos:
 * - Detecta seções automaticamente pelo href (#id)
 * - Marca link ativo ao scrollar
 * - Respeita cores do tema
 * - HTML minimalista
 */

class MonadActiveNav extends HTMLElement {
  constructor() {
    super();
    this.sections = [];
    this.links = [];
    this.observer = null;
  }

  connectedCallback() {
    // Encontrar todos os links
    this.links = Array.from(this.querySelectorAll('a[href^="#"]'));
    
    if (this.links.length === 0) {
      console.warn('MonadActiveNav: Nenhum link com href="#..." encontrado');
      return;
    }
    
    // Encontrar seções correspondentes
    this.sections = this.links
      .map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
      })
      .filter(section => section !== null);
    
    if (this.sections.length === 0) {
      console.warn('MonadActiveNav: Nenhuma seção com ID correspondente encontrada');
      return;
    }
    
    // Adicionar classes aos links
    this.links.forEach(link => {
      if (!link.classList.contains('nav-link')) {
        link.classList.add('nav-link');
      }
    });
    
    // Setup Intersection Observer
    this.setupIntersectionObserver();
    
    // Check inicial
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
      // Encontrar seção atual baseado na posição de scroll
      const scrollPosition = window.scrollY + 150;
      
      for (const section of this.sections) {
        if (section.offsetTop <= scrollPosition) {
          activeId = section.id;
        }
      }
    }

    // Remover active de todos os links
    this.links.forEach(link => link.classList.remove('active'));

    // Adicionar active ao link correspondente
    if (activeId) {
      const activeLink = this.querySelector(`a[href="#${activeId}"]`);
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
