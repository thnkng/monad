# Monad Web Components

Custom Elements for the Monad Design System. Framework-agnostic, reusable, and fully styled.

## Installation

```bash
npm install monad-design-system
```

## Usage

### Import All Components

```javascript
import 'monad/components';
```

### Import Individual Components

```javascript
import 'monad/components/modal';
import 'monad/components/alert';
import 'monad/components/dropdown';
```

## Components

### MonadModal

Modal dialog with backdrop, animations, and keyboard support.

```html
<monad-modal id="my-modal">
  <div slot="header">
    <h3>Title</h3>
  </div>
  <div slot="body">
    <p>Content goes here</p>
  </div>
  <div slot="footer">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</monad-modal>
```

**JavaScript API:**
```javascript
const modal = document.getElementById('my-modal');

modal.open();
modal.close();
modal.toggle();

modal.addEventListener('open', () => console.log('opened'));
modal.addEventListener('close', () => console.log('closed'));
```

**Attributes:**
- `open` - Opens the modal
- `size` - Modal size: `small`, `large`, `full`

---

### MonadAlert

Alert/Toast notifications with auto-dismiss.

```html
<monad-alert type="success" dismissible>
  Operation completed!
</monad-alert>

<monad-alert type="error" dismissible duration="5000">
  <strong>Error:</strong> Something went wrong
</monad-alert>
```

**JavaScript API:**
```javascript
// Create toast programmatically
MonadAlert.toast('Saved!', 'success', 3000);

const alert = document.querySelector('monad-alert');
alert.dismiss();
alert.show();
alert.hide();
```

**Attributes:**
- `type` - Alert type: `info`, `success`, `warning`, `error`
- `dismissible` - Shows close button
- `duration` - Auto-dismiss after milliseconds
- `toast` - Position as toast (top-right corner)

---

### MonadDropdown

Dropdown menu with click-outside and keyboard support.

```html
<monad-dropdown>
  <button slot="trigger">Options</button>
  <div slot="menu">
    <div class="dropdown-header">Actions</div>
    <button class="dropdown-item">Edit</button>
    <button class="dropdown-item">Delete</button>
  </div>
</monad-dropdown>
```

**JavaScript API:**
```javascript
const dropdown = document.querySelector('monad-dropdown');

dropdown.open();
dropdown.close();
dropdown.toggle();

dropdown.addEventListener('open', () => console.log('opened'));
dropdown.addEventListener('close', () => console.log('closed'));
```

**Attributes:**
- `open` - Opens the dropdown
- `position` - Menu position: `right`, `top`

---

## Features

✅ **Framework-agnostic** - Works with React, Vue, Angular, or vanilla JS  
✅ **Fully styled** - Uses Monad CSS variables  
✅ **Keyboard accessible** - ESC to close, proper focus management  
✅ **Event-driven** - Listen to open/close events  
✅ **Shadow DOM** - Encapsulated styles  
✅ **Progressive enhancement** - Works without JavaScript (where possible)

## Browser Support

All modern browsers that support Custom Elements v1:
- Chrome/Edge 67+
- Firefox 63+
- Safari 13.1+

For older browsers, use a polyfill like [@webcomponents/webcomponentsjs](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs).

## License

MIT
