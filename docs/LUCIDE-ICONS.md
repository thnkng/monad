# 🎨 Guia de Uso: Lucide Icons + Monad

O Monad Design System é totalmente compatível com [Lucide Icons](https://lucide.dev/icons/) - uma biblioteca de ícones SVG limpos, consistentes e open-source.

## 📦 Instalação

```bash
npm install lucide
```

Ou via CDN:

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

## 🚀 Uso Básico

### Método 1: Via HTML (data-lucide)

```html
<!-- Ícone simples -->
<i data-lucide="home"></i>

<!-- Com tamanho customizado -->
<i data-lucide="settings" data-size="24"></i>

<!-- Com stroke customizado -->
<i data-lucide="heart" data-stroke-width="1.5"></i>

<!-- Com cor -->
<i data-lucide="star" data-color="#FFD700"></i>

<!-- Inicializar todos os ícones -->
<script>
  import { replaceIcons } from 'monad/icons';
  replaceIcons();
</script>
```

### Método 2: Via JavaScript

```javascript
import { createIcon } from 'monad/icons';
import { Home, Settings, Heart } from 'lucide';

// Criar ícone
const homeIcon = createIcon(Home, { size: 20 });
document.body.appendChild(homeIcon);

// Com opções
const heartIcon = createIcon(Heart, {
  size: 24,
  strokeWidth: 1.5,
  color: '#ff5c5c'
});
```

### Método 3: Direto do Lucide

```javascript
import { createIcons, Home, Settings } from 'lucide';

// Inicializar ícones no DOM
createIcons({
  icons: {
    Home,
    Settings
  },
  attrs: {
    class: 'monad-icon',
    'stroke-width': 2
  }
});
```

## 🎯 Uso em Componentes Monad

### Botões

```html
<!-- Botão com ícone -->
<button class="graphite-core">
  <i data-lucide="download" data-size="16"></i>
  Download
</button>

<!-- Botão apenas ícone -->
<button class="icon-only graphite-core" aria-label="Fechar">
  <i data-lucide="x"></i>
</button>

<!-- Via JavaScript -->
<script>
  import { createIconButton } from 'monad/icons';
  import { Download } from 'lucide';
  
  const btn = createIconButton(Download, {
    variant: 'graphite-core',
    ariaLabel: 'Baixar arquivo'
  });
</script>
```

### Menu

```html
<monad-menu>
  <monad-menu-label>Principal</monad-menu-label>
  <monad-menu-item>
    <i data-lucide="home" data-size="20"></i>
    Dashboard
  </monad-menu-item>
  <monad-menu-item>
    <i data-lucide="bar-chart" data-size="20"></i>
    Relatórios
  </monad-menu-item>
  <monad-menu-item>
    <i data-lucide="users" data-size="20"></i>
    Usuários
  </monad-menu-item>
</monad-menu>
```

### Breadcrumb

```html
<monad-breadcrumb>
  <monad-breadcrumb-item href="/">
    <i data-lucide="home" data-size="16"></i>
    Home
  </monad-breadcrumb-item>
  <monad-breadcrumb-item href="/produtos">
    Produtos
  </monad-breadcrumb-item>
  <monad-breadcrumb-item>
    Detalhes
  </monad-breadcrumb-item>
</monad-breadcrumb>
```

### Tabs

```html
<monad-tabs>
  <button slot="tab" active>
    <i data-lucide="layout-dashboard" data-size="16"></i>
    Visão Geral
  </button>
  <button slot="tab">
    <i data-lucide="settings" data-size="16"></i>
    Configurações
  </button>
  <button slot="tab">
    <i data-lucide="clock" data-size="16"></i>
    Histórico
  </button>
  
  <div slot="panel">Conteúdo 1</div>
  <div slot="panel">Conteúdo 2</div>
  <div slot="panel">Conteúdo 3</div>
</monad-tabs>
```

### Alert

```html
<div class="alert alert-success">
  <i data-lucide="check-circle" data-size="20"></i>
  <strong>Sucesso!</strong> Operação concluída.
</div>

<div class="alert alert-error">
  <i data-lucide="x-circle" data-size="20"></i>
  <strong>Erro!</strong> Algo deu errado.
</div>
```

### Input com Ícone

```html
<div class="input-with-icon">
  <input type="text" placeholder="Buscar...">
  <i data-lucide="search" data-size="18"></i>
</div>

<div class="input-with-icon">
  <input type="email" placeholder="Email">
  <i data-lucide="mail" data-size="18"></i>
</div>
```

### Empty State

```html
<div class="empty-state">
  <div class="empty-state-icon">
    <i data-lucide="inbox" data-size="64"></i>
  </div>
  <h3>Nenhum resultado encontrado</h3>
  <p>Tente ajustar sua busca</p>
  <button class="graphite-core">
    <i data-lucide="rotate-ccw" data-size="16"></i>
    Limpar Filtros
  </button>
</div>
```

### Toast

```javascript
import { MonadToast } from 'monad/components';
import { CheckCircle } from 'lucide';

const toast = document.createElement('monad-toast');
toast.innerHTML = `
  <i data-lucide="check-circle"></i>
  <p>Salvo com sucesso!</p>
  <button class="toast-close">×</button>
`;
toast.show();
```

## 📏 Tamanhos de Ícones

Use as classes de tamanho do Monad:

```html
<i data-lucide="star" class="monad-icon-xsmall"></i>  <!-- 12px -->
<i data-lucide="star" class="monad-icon-small"></i>   <!-- 16px -->
<i data-lucide="star" class="monad-icon-medium"></i>  <!-- 20px (padrão) -->
<i data-lucide="star" class="monad-icon-large"></i>   <!-- 24px -->
<i data-lucide="star" class="monad-icon-xlarge"></i>  <!-- 32px -->
```

Ou via atributo:

```html
<i data-lucide="star" data-size="12"></i>
<i data-lucide="star" data-size="16"></i>
<i data-lucide="star" data-size="20"></i>
<i data-lucide="star" data-size="24"></i>
<i data-lucide="star" data-size="32"></i>
```

## 🎨 Cores

Ícones herdam a cor do texto por padrão (`currentColor`):

```html
<!-- Herda cor do texto -->
<p class="text-flow">
  <i data-lucide="check"></i> Sucesso
</p>

<!-- Cor direta no ícone -->
<i data-lucide="heart" class="break"></i>
<i data-lucide="star" class="pulse"></i>
<i data-lucide="info" class="thought"></i>

<!-- Todas as paletas funcionam -->
<i data-lucide="home" class="graphite-core"></i>
<i data-lucide="settings" class="thought-focus"></i>
```

## ✨ Animações

```html
<!-- Ícone girando (loading) -->
<i data-lucide="loader-2" class="icon-spin"></i>

<!-- Ícone pulsando -->
<i data-lucide="wifi" class="icon-pulse"></i>

<!-- Hover interativo -->
<i data-lucide="heart" class="hoverable"></i>

<!-- Pressable -->
<button class="icon-only">
  <i data-lucide="x" class="pressable"></i>
</button>
```

## 📖 Ícones Recomendados por Contexto

### Ações
- **Fechar**: `x`, `x-circle`
- **Confirmar**: `check`, `check-circle`
- **Adicionar**: `plus`, `plus-circle`
- **Remover**: `minus`, `minus-circle`
- **Editar**: `pencil`, `edit`
- **Deletar**: `trash-2`, `x`
- **Salvar**: `save`, `check`
- **Download**: `download`
- **Upload**: `upload`

### Navegação
- **Menu**: `menu`, `more-vertical`, `more-horizontal`
- **Home**: `home`
- **Voltar**: `arrow-left`, `chevron-left`
- **Avançar**: `arrow-right`, `chevron-right`
- **Expandir**: `chevron-down`, `arrow-down`
- **Recolher**: `chevron-up`, `arrow-up`
- **Link externo**: `external-link`

### Status
- **Informação**: `info`, `alert-circle`
- **Sucesso**: `check-circle`, `check`
- **Aviso**: `alert-triangle`, `alert-octagon`
- **Erro**: `x-circle`, `alert-circle`
- **Ajuda**: `help-circle`, `circle-help`
- **Loading**: `loader-2`, `loader`

### Comum
- **Buscar**: `search`
- **Configurações**: `settings`, `sliders`
- **Usuário**: `user`, `user-circle`
- **Usuários**: `users`
- **Calendário**: `calendar`
- **Relógio**: `clock`
- **Favorito**: `heart`, `star`
- **Email**: `mail`, `at-sign`
- **Telefone**: `phone`
- **Arquivo**: `file`, `file-text`
- **Pasta**: `folder`, `folder-open`
- **Imagem**: `image`
- **Vídeo**: `video`
- **Filtro**: `filter`
- **Ordenar**: `arrow-up-down`

## 🔧 API JavaScript

```javascript
import {
  createIcon,
  replaceIcons,
  addIcon,
  createIconButton,
  ICON_SIZES,
  MONAD_ICONS
} from 'monad/icons';

// Criar ícone
const icon = createIcon(Home, { size: 20 });

// Substituir todos [data-lucide]
replaceIcons();

// Adicionar ícone a elemento
addIcon(button, Download, { size: 16 });

// Criar botão com ícone
const btn = createIconButton(X, {
  variant: 'break',
  ariaLabel: 'Fechar'
});

// Tamanhos constantes
console.log(ICON_SIZES.small); // 16

// Ícones recomendados
console.log(MONAD_ICONS.success); // 'check-circle'
```

## 🌐 Browser Support

Lucide funciona em todos os navegadores modernos:
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+

## 📚 Recursos

- **Galeria completa**: https://lucide.dev/icons/
- **Documentação Lucide**: https://lucide.dev/guide/
- **Monad Docs**: Ver `docs/index.html`

## 💡 Dicas

1. **Performance**: Use apenas os ícones que precisa com imports específicos
2. **Acessibilidade**: Sempre adicione `aria-label` em botões apenas com ícone
3. **Consistência**: Use o mesmo stroke-width (2) em todo o design
4. **Semântica**: Prefira ícones reconhecíveis universalmente
5. **Tamanho**: Use 16px em botões, 20px em menus, 24px em headers

## 🎯 Exemplo Completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Monad + Lucide</title>
  <link rel="stylesheet" href="dist/styles/monad.css">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <header class="graphite-mind">
    <div class="container flex flex-between items-center">
      <h2>
        <i data-lucide="zap"></i>
        Monad App
      </h2>
      <nav class="cluster-base">
        <a href="#" class="hoverable">
          <i data-lucide="home" data-size="18"></i>
          Home
        </a>
        <a href="#" class="hoverable">
          <i data-lucide="users" data-size="18"></i>
          Users
        </a>
        <button class="icon-only" aria-label="Settings">
          <i data-lucide="settings"></i>
        </button>
      </nav>
    </div>
  </header>

  <main class="section-spacious">
    <div class="container">
      <monad-tabs>
        <button slot="tab" active>
          <i data-lucide="layout-dashboard"></i>
          Dashboard
        </button>
        <button slot="tab">
          <i data-lucide="bar-chart"></i>
          Analytics
        </button>
        
        <div slot="panel">
          <div class="card interactive hoverable">
            <i data-lucide="trending-up" data-size="32" class="flow"></i>
            <h3>1,234</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div slot="panel">
          <p>Analytics content...</p>
        </div>
      </monad-tabs>
    </div>
  </main>

  <script type="module">
    import { replaceIcons } from './dist/monad.js';
    
    // Inicializar todos os ícones
    lucide.createIcons({
      attrs: {
        class: 'monad-icon',
        'stroke-width': 2
      }
    });
  </script>
</body>
</html>
```

---

**✨ Pronto!** O Monad agora está totalmente integrado com Lucide Icons.
