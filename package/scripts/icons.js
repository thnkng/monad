/**
 * Monad + Lucide Icons Integration
 * Utilities for using Lucide icons with Monad components
 * 
 * @see https://lucide.dev/
 */

import { createElement } from 'lucide';

/**
 * Create a Lucide icon element
 * @param {string|Object} iconName - Icon name or icon object from lucide
 * @param {Object} options - Icon options (size, color, strokeWidth, etc.)
 * @returns {SVGElement}
 * 
 * @example
 * import { createIcon } from 'monad/icons';
 * import { Home } from 'lucide';
 * 
 * const homeIcon = createIcon(Home, { size: 20 });
 * document.body.appendChild(homeIcon);
 */
export function createIcon(iconName, options = {}) {
  const defaults = {
    size: 20,
    strokeWidth: 2,
    color: 'currentColor',
    class: 'monad-icon'
  };

  return createElement({
    ...defaults,
    ...options,
    iconName
  });
}

/**
 * Replace icon placeholders with Lucide icons
 * Finds all elements with [data-lucide] attribute and replaces them
 * 
 * @param {HTMLElement} container - Container to search within (defaults to document.body)
 * 
 * @example
 * <i data-lucide="home" data-size="24"></i>
 * <i data-lucide="settings" data-stroke-width="1.5"></i>
 * 
 * import { replaceIcons } from 'monad/icons';
 * replaceIcons();
 */
export async function replaceIcons(container = document.body) {
  const elements = container.querySelectorAll('[data-lucide]');
  
  for (const element of elements) {
    const iconName = element.getAttribute('data-lucide');
    const size = element.getAttribute('data-size') || 20;
    const strokeWidth = element.getAttribute('data-stroke-width') || 2;
    const color = element.getAttribute('data-color') || 'currentColor';
    
    try {
      // Dynamic import of the icon
      const iconModule = await import(`lucide/dist/esm/icons/${iconName}.js`);
      const iconData = iconModule.default;
      
      const icon = createElement({
        iconName: iconData,
        size: parseInt(size),
        strokeWidth: parseFloat(strokeWidth),
        color,
        class: element.className || 'monad-icon'
      });
      
      // Copy attributes
      Array.from(element.attributes).forEach(attr => {
        if (!attr.name.startsWith('data-')) {
          icon.setAttribute(attr.name, attr.value);
        }
      });
      
      element.replaceWith(icon);
    } catch (error) {
      console.warn(`Failed to load icon: ${iconName}`, error);
    }
  }
}

/**
 * Add icon to Monad component
 * Helper to prepend/append icons to components
 * 
 * @param {HTMLElement} element - Element to add icon to
 * @param {Object} iconData - Lucide icon object
 * @param {Object} options - Icon options
 * @param {string} position - 'prepend' or 'append' (default: 'prepend')
 * 
 * @example
 * import { addIcon } from 'monad/icons';
 * import { Download } from 'lucide';
 * 
 * const button = document.querySelector('button');
 * addIcon(button, Download, { size: 16 });
 */
export function addIcon(element, iconData, options = {}, position = 'prepend') {
  const icon = createIcon(iconData, {
    size: 16,
    ...options
  });
  
  if (position === 'prepend') {
    element.insertBefore(icon, element.firstChild);
  } else {
    element.appendChild(icon);
  }
  
  return icon;
}

/**
 * Create icon-only button
 * @param {Object} iconData - Lucide icon object
 * @param {Object} options - Button and icon options
 * @returns {HTMLButtonElement}
 * 
 * @example
 * import { createIconButton } from 'monad/icons';
 * import { X } from 'lucide';
 * 
 * const closeBtn = createIconButton(X, {
 *   variant: 'graphite-core',
 *   size: 20,
 *   ariaLabel: 'Close'
 * });
 */
export function createIconButton(iconData, options = {}) {
  const {
    variant = '',
    size = 20,
    ariaLabel = '',
    onClick = null,
    ...iconOptions
  } = options;
  
  const button = document.createElement('button');
  if (variant) button.className = variant;
  if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
  
  const icon = createIcon(iconData, {
    size,
    ...iconOptions
  });
  
  button.appendChild(icon);
  
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  
  return button;
}

/**
 * Default icon sizes for Monad components
 */
export const ICON_SIZES = {
  xsmall: 12,
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 32
};

/**
 * Recommended icons for common Monad patterns
 */
export const MONAD_ICONS = {
  // Actions
  close: 'x',
  check: 'check',
  plus: 'plus',
  minus: 'minus',
  edit: 'pencil',
  delete: 'trash-2',
  save: 'save',
  download: 'download',
  upload: 'upload',
  
  // Navigation
  menu: 'menu',
  home: 'home',
  arrowLeft: 'arrow-left',
  arrowRight: 'arrow-right',
  arrowUp: 'arrow-up',
  arrowDown: 'arrow-down',
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  chevronUp: 'chevron-up',
  chevronDown: 'chevron-down',
  
  // Status
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  error: 'x-circle',
  help: 'help-circle',
  
  // Common
  search: 'search',
  settings: 'settings',
  user: 'user',
  users: 'users',
  calendar: 'calendar',
  clock: 'clock',
  heart: 'heart',
  star: 'star',
  mail: 'mail',
  phone: 'phone',
  file: 'file',
  folder: 'folder',
  image: 'image',
  video: 'video',
  link: 'link',
  external: 'external-link'
};

export default {
  createIcon,
  replaceIcons,
  addIcon,
  createIconButton,
  ICON_SIZES,
  MONAD_ICONS
};
