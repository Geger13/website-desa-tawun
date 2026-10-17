/**
 * TOAST NOTIFICATION MODULE (Clean UI Architecture)
 * Provides sleek, accessible, non-blocking feedback replacing primitive alert()
 */

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      toastContainer.setAttribute('aria-live', 'polite');
      toastContainer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(toastContainer);
    }
  }
  return toastContainer;
}

const ICONS = {
  success: 'fas fa-circle-check',
  error: 'fas fa-circle-xmark',
  warning: 'fas fa-triangle-exclamation',
  info: 'fas fa-circle-info'
};

/**
 * Show a toast notification
 * @param {Object} options
 * @param {'success'|'error'|'warning'|'info'} [options.type='info']
 * @param {string} options.title
 * @param {string} options.message
 * @param {number} [options.duration=5000]
 */
export function showToast({ type = 'info', title = '', message = '', duration = 5000 }) {
  const container = ensureContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  const iconClass = ICONS[type] || ICONS.info;

  toast.innerHTML = `
    <div class="toast-icon">
      <i class="${iconClass}"></i>
    </div>
    <div class="toast-content">
      ${title ? `<div class="toast-title">${title}</div>` : ''}
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Tutup Notifikasi">
      <i class="fas fa-times"></i>
    </button>
    <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  let dismissTimeout = null;

  function dismiss() {
    if (dismissTimeout) clearTimeout(dismissTimeout);
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }

  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', dismiss);
  }

  if (duration > 0) {
    dismissTimeout = setTimeout(dismiss, duration);
  }

  return { dismiss };
}
