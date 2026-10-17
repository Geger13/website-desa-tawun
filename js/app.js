/**
 * PORTAL DIGITAL DESA TAWUN - SEKOTONG, LOMBOK BARAT, NTB
 * Master Application Bootstrap (Senior Clean Code Architecture)
 * Modular ES Architecture with Decoupled Data & Components
 */

import { initHeroSlider } from './modules/hero-slider.js';
import { initNavigation } from './modules/navigation.js';
import { initAnimatedCounters } from './modules/counters.js';
import { initLeafletMap } from './modules/gis-map.js';
import { initProjectViewSwitcher } from './modules/project-switcher.js';
import { initUmkmFilter } from './modules/umkm-filter.js';
import { initDocumentSearch } from './modules/document-search.js';
import { initModals, openModal, closeModal } from './modules/modal.js';
import { initForms } from './modules/forms.js';
import { showToast } from './modules/toast.js';

// Safe module runner with isolated error boundaries
function runSafely(moduleName, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[Desa Tawun Portal] Error initializing module "${moduleName}":`, error);
  }
}

// Bootstrap Application
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c🏛️ Portal Resmi Desa Tawun, Sekotong, Lombok Barat', 'color: #064e4b; font-size: 14px; font-weight: bold;');
  console.log('%c⚡ Clean Code Modular Architecture Active', 'color: #10b981; font-size: 12px;');

  runSafely('HeroSlider', initHeroSlider);
  runSafely('Navigation', initNavigation);
  runSafely('Counters', initAnimatedCounters);
  runSafely('LeafletGIS', initLeafletMap);
  runSafely('ProjectSwitcher', initProjectViewSwitcher);
  runSafely('UmkmFilter', initUmkmFilter);
  runSafely('DocumentSearch', initDocumentSearch);
  runSafely('Modals', initModals);
  runSafely('CitizenForms', initForms);
});

// Global API for developer console & inline events
window.TawunApp = {
  version: '2.0.0-clean',
  openModal,
  closeModal,
  showToast
};
