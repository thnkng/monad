/**
 * Monad Design System - Web Components
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
export { default as MonadAlert } from './alert/index.js';
export { MonadBreadcrumb, MonadBreadcrumbItem } from './breadcrumb/index.js';
export { default as MonadDropdown } from './dropdown/index.js';
export { MonadMenu, MonadMenuItem, MonadMenuLabel, MonadMenuDivider } from './menu/index.js';
export { default as MonadModal } from './modal/index.js';
export { default as MonadPagination } from './pagination/index.js';
export { default as MonadProgress } from './progress/index.js';
export { default as MonadTabs } from './tabs/index.js';
export { default as MonadTag } from './tag/index.js';
export { default as MonadToast } from './toast/index.js';
export { default as MonadTooltip } from './tooltip/index.js';

// Auto-register all components
import './alert/index.js';
import './breadcrumb/index.js';
import './dropdown/index.js';
import './menu/index.js';
import './modal/index.js';
import './pagination/index.js';
import './progress/index.js';
import './tabs/index.js';
import './tag/index.js';
import './toast/index.js';
import './tooltip/index.js';
