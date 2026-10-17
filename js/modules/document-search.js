/**
 * JDIH & DOCUMENT SEARCH MODULE
 * Live instant filtering for public archive, Perdes, and regulatory documents
 */

export function initDocumentSearch() {
  const searchInput = document.getElementById('searchDokumenInput');
  const docCards = document.querySelectorAll('.doc-item-card');
  const docCounter = document.getElementById('docMatchCount');

  if (!searchInput || !docCards.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let matches = 0;

    docCards.forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const category = (card.getAttribute('data-category') || '').toLowerCase();

      if (title.includes(query) || category.includes(query)) {
        card.style.display = 'flex';
        matches++;
      } else {
        card.style.display = 'none';
      }
    });

    if (docCounter) {
      docCounter.textContent = `${matches} Dokumen Tersedia`;
    }
  });
}
