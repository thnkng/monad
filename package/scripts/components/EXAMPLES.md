# Exemplos de Uso — Monad Web Components

> **Componentes 100% autônomos** — Funcionam apenas com HTML, sem JavaScript manual necessário.

---

## 🎭 Modal

### Uso básico (sem JavaScript)

```html
<!-- Modal -->
<monad-modal id="my-modal" title="Confirmação">
  <p>Tem certeza que deseja continuar?</p>
  <div slot="footer">
    <button data-modal-close>Cancelar</button>
    <button class="graphite-core" data-modal-close>Confirmar</button>
  </div>
</monad-modal>

<!-- Trigger -->
<button data-modal-target="my-modal" class="thought">
  Abrir Modal
</button>
```

### Com slots personalizados

```html
<monad-modal id="custom-modal" size="large">
  <div slot="header">
    <h2>Título Customizado</h2>
    <span class="badge state-flow">Novo</span>
  </div>
  
  <p>Conteúdo principal aqui...</p>
  
  <div slot="footer">
    <button data-modal-close>Fechar</button>
  </div>
</monad-modal>
```

### Abrir automaticamente

```html
<monad-modal id="welcome" title="Bem-vindo!" open>
  <p>Esta é sua primeira visita!</p>
</monad-modal>
```

### API JavaScript (opcional)

```javascript
const modal = document.getElementById('my-modal');

// Métodos
modal.open();
modal.close();
modal.toggle();

// Propriedade
console.log(modal.isOpen); // true/false

// Eventos
modal.addEventListener('modal-open', () => {
  console.log('Modal aberto!');
});
```

---

## 🍞 Toast

### Uso com botões (sem JavaScript)

```html
<button data-toast="Salvo com sucesso!" data-toast-type="success">
  Salvar
</button>

<button data-toast="Erro ao processar" data-toast-type="error">
  Deletar
</button>

<button 
  data-toast="Aguarde um momento..." 
  data-toast-type="info"
  data-toast-duration="5000">
  Processar
</button>
```

### Helper global (JavaScript)

```javascript
// Simples
window.monad.toast('Operação concluída!', 'success');

// Com duração customizada
window.monad.toast('Carregando...', 'info', 5000);

// Tipos: 'success', 'error', 'warning', 'info'
window.monad.toast('Atenção!', 'warning');
```

### Declarativo (auto-exibir)

```html
<monad-toast 
  type="success" 
  message="Bem-vindo ao sistema!" 
  duration="3000"
  auto-show>
</monad-toast>
```

---

## 📋 Dropdown

### Uso básico

```html
<monad-dropdown>
  <button>Opções ▾</button>
  <ul>
    <li><a href="#edit">Editar</a></li>
    <li><a href="#delete">Excluir</a></li>
    <li><a href="#share">Compartilhar</a></li>
  </ul>
</monad-dropdown>
```

### Com menu estruturado

```html
<monad-dropdown position="left">
  <button class="graphite-core">Menu</button>
  <menu>
    <li><button>Novo arquivo</button></li>
    <li><button>Abrir...</button></li>
    <hr>
    <li><button>Salvar</button></li>
  </menu>
</monad-dropdown>
```

### Posicionamento

```html
<!-- Opções: bottom (padrão), top, left, right -->
<monad-dropdown position="right">
  <button>⚙️</button>
  <ul>
    <li><a href="/settings">Configurações</a></li>
    <li><a href="/logout">Sair</a></li>
  </ul>
</monad-dropdown>
```

---

## 📑 Tabs

### Uso básico

```html
<monad-tabs>
  <div>
    <button active>Visão Geral</button>
    <button>Configurações</button>
    <button>Histórico</button>
  </div>
  
  <div>
    <h3>Visão Geral</h3>
    <p>Dashboard com métricas...</p>
  </div>
  
  <div>
    <h3>Configurações</h3>
    <p>Opções do sistema...</p>
  </div>
  
  <div>
    <h3>Histórico</h3>
    <p>Atividades recentes...</p>
  </div>
</monad-tabs>
```

### Com lista

```html
<monad-tabs>
  <ul>
    <li><button active>Tab 1</button></li>
    <li><button>Tab 2</button></li>
    <li><button>Tab 3</button></li>
  </ul>
  
  <div>Conteúdo 1</div>
  <div>Conteúdo 2</div>
  <div>Conteúdo 3</div>
</monad-tabs>
```

### API JavaScript (opcional)

```javascript
const tabs = document.querySelector('monad-tabs');

// Métodos
tabs.next();        // Próxima tab
tabs.previous();    // Tab anterior
tabs.activeIndex = 2; // Ir para tab específica

// Propriedade
console.log(tabs.activeIndex); // 0, 1, 2...

// Evento
tabs.addEventListener('tab-change', (e) => {
  console.log('Tab ativa:', e.detail.index);
});
```

---

## 📱 Sidebar

### Uso básico

```html
<monad-sidebar>
  <header>
    <h1>Logo</h1>
  </header>
  
  <nav>
    <a href="/" class="active">🏠 Home</a>
    <a href="/projects">📁 Projetos</a>
    <a href="/settings">⚙️ Configurações</a>
  </nav>
</monad-sidebar>
```

### Com toggle externo

```html
<!-- Toggle no header da página -->
<header class="app-header">
  <button data-sidebar-toggle>☰ Menu</button>
  <h1>Minha App</h1>
</header>

<monad-sidebar>
  <nav>
    <a href="/">Home</a>
    <a href="/about">Sobre</a>
  </nav>
</monad-sidebar>
```

### Com estrutura completa

```html
<monad-sidebar>
  <header>
    <img src="logo.svg" alt="Logo">
    <!-- Botão toggle criado automaticamente -->
  </header>
  
  <nav>
    <div class="sidebar-label">Menu Principal</div>
    <a href="/" class="sidebar-link">
      <svg>...</svg>
      Dashboard
    </a>
    
    <div class="sidebar-label">Cadastros</div>
    <a href="/users" class="sidebar-link">
      <svg>...</svg>
      Usuários
    </a>
  </nav>
  
  <footer>
    <p>© 2025 Monad</p>
  </footer>
</monad-sidebar>
```

### Atalho de teclado

- **Ctrl+B** (Windows/Linux) ou **Cmd+B** (Mac): Toggle sidebar
- **ESC** (mobile): Fechar sidebar

---

## 🎨 Respeito aos Temas

Todos os componentes respeitam automaticamente os temas CSS:

```html
<!-- Tema Moonlight (GitHub Light) -->
<body theme="moonlight">
  <monad-modal id="demo" title="Modal Light">
    <p>Cores do GitHub Light aplicadas automaticamente!</p>
  </monad-modal>
</body>

<!-- Tema Midnight (GitHub Dark) -->
<body theme="midnight">
  <monad-modal id="demo" title="Modal Dark">
    <p>Cores do GitHub Dark aplicadas automaticamente!</p>
  </monad-modal>
</body>
```

**CSS Custom Properties usadas:**

- `--color-surface` (background)
- `--color-on-surface` (texto)
- `--color-border` (bordas)
- `--color-primary` (ações primárias)
- `--state-flow` (success)
- `--state-pulse` (warning)
- `--state-break` (error)
- `--space-*` (espaçamentos)
- `--radius-*` (bordas arredondadas)
- `--shadow-*` (sombras)

---

## ✨ Recursos Automáticos

### Modal
✅ Overlay com blur  
✅ Botão fechar automático  
✅ ESC para fechar  
✅ Clique fora para fechar  
✅ Scroll lock no body  
✅ Animações suaves  

### Toast
✅ Container automático  
✅ Auto-dismiss configurável  
✅ Cores por tipo (success/error/warning/info)  
✅ Botão fechar  
✅ Animação slide-in/out  
✅ Empilhamento múltiplo  

### Dropdown
✅ Posicionamento automático  
✅ Clique fora para fechar  
✅ ESC para fechar  
✅ Fecha ao clicar em item  
✅ ARIA attributes  

### Tabs
✅ Navegação por teclado (Arrow, Home, End)  
✅ Primeira tab ativa por padrão  
✅ Animação fade-in no conteúdo  
✅ ARIA attributes  

### Sidebar
✅ Botão toggle automático  
✅ Overlay mobile  
✅ Responsive (collapse/overlay)  
✅ Persiste estado no localStorage  
✅ Atalho Ctrl/Cmd+B  
✅ Active link tracking  

---

## 🎯 Filosofia

> **"A tag resolve tudo"** — Componentes devem funcionar apenas com HTML, sem JavaScript manual necessário. A API JavaScript é **opcional** para casos avançados.

**Princípios:**
1. **Declarativo** — HTML descreve o estado desejado
2. **Autônomo** — Componente cria sua própria estrutura
3. **Acessível** — ARIA, teclado, foco
4. **Temático** — Respeita cores do tema ativo
5. **Leve** — Shadow DOM, sem poluição do DOM global
