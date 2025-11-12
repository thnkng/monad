# Monad Web Components

Custom Elements (Web Components) para interatividade complexa no Monad Design System.

**Filosofia:** Web Components apenas para funcionalidades que **realmente precisam de JavaScript**. Componentes simples usam CSS puro (veja `molecules/`).

## 🎯 Componentes Disponíveis

- ✅ **MonadDropdown** - Menus dropdown com posicionamento dinâmico e click outside
- ✅ **MonadModal** - Diálogos overlay com backdrop, ESC key e focus trap
- ✅ **MonadSidebar** - Sidebar colapsável com localStorage e mobile overlay
- ✅ **MonadTabs** - Abas com troca de painéis e keyboard navigation
- ✅ **MonadToast** - Notificações com auto-dismiss, queue e positioning
- ✅ **MonadTooltip** - Tooltips com posicionamento inteligente e hover logic

## 📦 Componentes Removidos (Agora CSS Puro)

Estes agora são moléculas CSS sem JavaScript:
- `.alert` - Alertas dismissíveis (molecules/_alert.scss)
- `<nav>.breadcrumb` - Breadcrumbs (molecules/_breadcrumb.scss)
- `<menu>` - Menus (atoms/_menu.scss)
- `.pagination` - Paginação (molecules/_pagination.scss)
- `.progress` - Barras de progresso (molecules/_progress.scss)
- `.tag` - Tags removíveis (molecules/_tag.scss)

## 📦 Instalação

```html
<!-- Incluir JavaScript compilado -->
<script src="dist/monad.js" type="module" defer></script>
```

## 🚀 Exemplos de Uso

### Toast Notification

```javascript
// Método rápido
MonadToast.show('Operação bem-sucedida!', 'success', 3000);

// Ou criar manualmente
const toast = document.createElement('monad-toast');
toast.type = 'success';
toast.message = 'Salvo com sucesso!';
toast.duration = 3000;
document.body.appendChild(toast);
toast.show();
```

### Tabs

```html
<monad-tabs>
  <button slot="tab" active>Visão Geral</button>
  <button slot="tab">Configurações</button>
  
  <div slot="panel">Conteúdo 1</div>
  <div slot="panel">Conteúdo 2</div>
</monad-tabs>
```

### Outros componentes

Veja documentação completa com exemplos detalhados de todos os componentes no arquivo principal.

## 📡 Eventos

Todos os componentes disparam eventos customizados:

- **Toast**: `toast-show`, `toast-hide`
- **Tabs**: `tab-change`
- **Tag**: `tag-remove`
- **Pagination**: `page-change`
- **Menu**: `menu-item-click`

## 🌐 Suporte a Navegadores

Chrome/Edge 67+, Firefox 63+, Safari 10.1+

## 📄 Licença

MIT
