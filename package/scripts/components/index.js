/**
 * Monad Design System - Web Components
 * 
 * Interactive components that require JavaScript.
 * Simple components use pure CSS (see molecules/).
 * 
 * Import all components:
 * import 'monad/components';
 * 
 * Or individual components:
 * import 'monad/components/modal';
 * import 'monad/components/toast';
 * import 'monad/components/tabs';
 */

// Export all components
export { default as MonadActiveNav } from './active-nav/index.js';
export { default as MonadDropdown } from './dropdown/index.js';
export { default as MonadModal } from './modal/index.js';
export { default as MonadSidebar } from './sidebar/index.js';
export { default as MonadTabs } from './tabs/index.js';
export { default as MonadToast } from './toast/index.js';
export { default as MonadTooltip } from './tooltip/index.js';

// Auto-register all components
import './active-nav/index.js';
import './dropdown/index.js';
import './modal/index.js';
import './sidebar/index.js';
import './tabs/index.js';
import './toast/index.js';
import './tooltip/index.js';
