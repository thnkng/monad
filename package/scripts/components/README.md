# Monad Web Components

Custom Elements (Web Components) para o Monad Design System. Framework-agnostic, reutilizáveis e totalmente estilizados.

## 🎯 Componentes Disponíveis

- ✅ **MonadAlert** - Mensagens de alerta dismissíveis
- ✅ **MonadBreadcrumb** - Navegação hierárquica (trilha de migalhas)
- ✅ **MonadDropdown** - Menus dropdown com posicionamento
- ✅ **MonadMenu** - Menus de navegação vertical/horizontal
- ✅ **MonadModal** - Diálogos overlay com backdrop
- ✅ **MonadPagination** - Controles de navegação entre páginas
- ✅ **MonadProgress** - Barras de progresso com animações
- ✅ **MonadTabs** - Organização de conteúdo em abas
- ✅ **MonadTag** - Tags/chips removíveis
- ✅ **MonadToast** - Notificações não-intrusivas
- ✅ **MonadTooltip** - Informações contextuais no hover

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
