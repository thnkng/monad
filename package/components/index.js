/**
 * Monad Design System - Web Components
 * 
 * Import all components:
 * import 'monad/components';
 * 
 * Or individual components:
 * import 'monad/components/modal';
 * import 'monad/components/alert';
 * import 'monad/components/dropdown';
 */

export { default as MonadModal } from './modal/index.js';
export { default as MonadAlert } from './alert/index.js';
export { default as MonadDropdown } from './dropdown/index.js';

// Auto-register all components
import './modal/index.js';
import './alert/index.js';
import './dropdown/index.js';
