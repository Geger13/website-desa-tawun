/**
 * MODALS SYSTEM MODULE
 * Accessible modal dialog controller supporting custom triggers, backdrop dismiss, and ESC key listener
 */

export function openModal(modalId) {
  const targetModal = document.getElementById(modalId);
  if (targetModal) {
    targetModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus on first input if available
    const firstInput = targetModal.querySelector('input:not([type="hidden"]), select, textarea');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
}

export function closeModal(modalElement) {
  if (modalElement) {
    modalElement.classList.remove('active');
  } else {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }
  document.body.style.overflow = '';
}

export function initModals() {
  const triggers = document.querySelectorAll('[data-modal-target]');
  const closeBtns = document.querySelectorAll('.modal-close-btn, [data-modal-close]');
  const overlays = document.querySelectorAll('.modal-overlay');

  // Trigger buttons
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      if (targetId) {
        openModal(targetId);
      }
    });
  });

  // Close buttons
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal();
    });
  });

  // Backdrop overlay click
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Global ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}
