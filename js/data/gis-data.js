/**
 * GEOSPATIAL & GIS DATA REPOSITORY
 * Titik Koordinat & Metadata Spasial Desa Tawun, Kec. Sekotong, Lombok Barat, NTB
 */

export const TAWUN_COORDS = [-8.7517, 116.0095]; // Pusat Dermaga Tawun

export const MAP_LOCATIONS = [
  // 1. Pembangunan & Infrastruktur
  {
    category: 'pembangunan',
    name: 'Revitalisasi Dermaga Wisata Tawun',
    coords: [-8.7517, 116.0095],
    badge: 'Dana Desa 2025 • Rp 180 Juta',
    desc: 'Peningkatan dermaga apung dan tambatan perahu jukung nelayan wisata.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    iconColor: '#f59e0b',
    iconClass: 'fas fa-anchor'
  },
  {
    category: 'pembangunan',
    name: 'Talud Pemecah Gelombang & Pengeringan Ikan',
    coords: [-8.7550, 116.0050],
    badge: 'APBD Lombok Barat • Rp 250 Juta',
    desc: 'Penguatan dinding tanggul penahan abrasi pesisir dan sentra jemur ikan nelayan.',
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=400&q=80',
    iconColor: '#f59e0b',
    iconClass: 'fas fa-shield-halved'
  },

  // 2. Wisata Bahari & Gili Sekotong
  {
    category: 'wisata',
    name: 'Dermaga Wisata Tawun (Pusat Island Hopping)',
    coords: [-8.7512, 116.0102],
    badge: 'Pintu Masuk Wisata • Pokdarwis Tawun',
    desc: 'Pusat embarkasi perahu jukung menuju gugusan Gili Nanggu, Sudak, dan Kedis.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80',
    iconColor: '#064e4b',
    iconClass: 'fas fa-ship'
  },
  {
    category: 'wisata',
    name: 'Pulau Gili Nanggu (Akuarium Laut Alami)',
    coords: [-8.7405, 115.9982],
    badge: 'Snorkeling Terbaik • Terumbu Karang',
    desc: 'Pulau berpasir putih dengan ribuan ikan hias jinak dan air laut toska jernih.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
    iconColor: '#064e4b',
    iconClass: 'fas fa-mask-snorkel'
  },
  {
    category: 'wisata',
    name: 'Gili Kedis (Honeymoon Island)',
    coords: [-8.7490, 116.0150],
    badge: 'Pulau Mini Eksotis • Bentuk Hati',
    desc: 'Pulau kecil berpasir putih lembut dengan pemandangan sunset matahari terbenam.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    iconColor: '#064e4b',
    iconClass: 'fas fa-heart'
  },
  {
    category: 'wisata',
    name: 'Gili Sudak (Wisata Kuliner Ikan Bakar)',
    coords: [-8.7431, 116.0090],
    badge: 'Kuliner Seafood • Pantai Tenang',
    desc: 'Sentra sajian kuliner ikan bakar segar dan bintang laut eksotis di tepian pantai.',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8418365?auto=format&fit=crop&w=400&q=80',
    iconColor: '#064e4b',
    iconClass: 'fas fa-utensils'
  },

  // 3. Etalase UMKM & Ekonomi Pesisir
  {
    category: 'umkm',
    name: 'Sentra Budidaya Mutiara Air Laut Lombok',
    coords: [-8.7570, 116.0120],
    badge: 'UMKM Unggulan • South Sea Pearl',
    desc: 'Pengrajin dan budidaya tiram mutiara air laut asli kualitas ekspor Sekotong.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
    iconColor: '#10b981',
    iconClass: 'fas fa-gem'
  },
  {
    category: 'umkm',
    name: 'Pengolahan Kacang Mete & Dodol Rumput Laut',
    coords: [-8.7535, 116.0065],
    badge: 'Kelompok Usaha Pesisir Tawun',
    desc: 'Pusat produksi oleh-oleh kacang mete oven dan olahan rumput laut pesisir.',
    image: 'https://images.unsplash.com/photo-1536591375315-1b83683e3264?auto=format&fit=crop&w=400&q=80',
    iconColor: '#10b981',
    iconClass: 'fas fa-bag-shopping'
  },

  // 4. Fasilitas Publik & Kantor Pemdes
  {
    category: 'fasilitas',
    name: 'Kantor Balai Desa Tawun',
    coords: [-8.7525, 116.0080],
    badge: 'Pusat Pelayanan Administrasi • 08.00 - 15.30 WITA',
    desc: 'Layanan administrasi kependudukan, perizinan, dan ruang koordinasi warga.',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
    iconColor: '#3b82f6',
    iconClass: 'fas fa-building-columns'
  }
];
