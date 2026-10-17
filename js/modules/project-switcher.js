/**
 * PROJECT VIEW SWITCHER MODULE
 * Controls switching between visual timeline cards and structured data table for village projects
 */

export function initProjectViewSwitcher() {
  const btnCards = document.getElementById('view-mode-cards');
  const btnTable = document.getElementById('view-mode-table');
  const viewCards = document.getElementById('projects-cards-view');
  const viewTable = document.getElementById('projects-table-view');

  if (!btnCards || !btnTable || !viewCards || !viewTable) return;

  btnCards.addEventListener('click', () => {
    btnCards.classList.add('active');
    btnTable.classList.remove('active');
    viewCards.style.display = 'grid';
    viewTable.style.display = 'none';
  });

  btnTable.addEventListener('click', () => {
    btnTable.classList.add('active');
    btnCards.classList.remove('active');
    viewCards.style.display = 'none';
    viewTable.style.display = 'block';
  });
}
