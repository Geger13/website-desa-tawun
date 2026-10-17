/**
 * UMKM MARKETPLACE MODULE
 * Category tab filtering and automated WhatsApp order message generator
 */

export function initUmkmFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.umkm-card');

  // Filter tabs click handling
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Direct WhatsApp Order Button Handlers
  const waButtons = document.querySelectorAll('.btn-whatsapp');
  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || 'Produk UMKM';
      const price = btn.getAttribute('data-price') || '';
      const phone = btn.getAttribute('data-phone') || '628123456789';

      const message = `Halo Penjual UMKM Desa Tawun Sekotong, Lombok Barat, saya tertarik memesan produk "${product}" (${price}) yang tertera pada Portal Resmi Desa Tawun. Mohon info ketersediaan stok dan metode pengirimannya. Terima kasih!`;
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  });
}
