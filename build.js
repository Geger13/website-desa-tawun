/**
 * BUILD & COMPONENT COMPILER (Senior Developer Tooling)
 * Zero-dependency build script for assembling components and running local dev server.
 *
 * Usage:
 *   node build.js           # Assembles components into index.html and creates js/bundle.js
 *   node build.js --watch   # Watches components/ for changes and re-builds automatically
 *   node build.js --serve   # Starts a fast zero-dependency local HTTP server with watch mode
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = __dirname;
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const JS_DIR = path.join(ROOT_DIR, 'js');
const INDEX_HTML = path.join(ROOT_DIR, 'index.html');
const BUNDLE_JS = path.join(ROOT_DIR, 'js', 'bundle.js');

// Shared framing components (topbar, header, footer, etc.)
const SHARED_HEAD = ['topbar.html', 'header.html'];
const SHARED_TAIL = ['footer.html', 'modals.html', 'toast.html'];

// Homepage: full landing page
const COMPONENT_ORDER = [
  'topbar.html',
  'header.html',
  'hero.html',
  'quick-access.html',
  'ticker.html',
  'stats.html',
  'footer.html',
  'modals.html',
  'toast.html'
];

// Halaman-halaman terpisah
const PAGES = [
  {
    file: 'pemerintahan.html',
    title: 'Pemerintahan Desa - Portal Resmi Desa Tawun',
    description: 'Profil, sambutan Kepala Desa, struktur organisasi aparatur (SOTK), dan kabar terkini Desa Tawun, Kecamatan Sekotong, Lombok Barat.',
    components: ['sambutan.html', 'sotk.html', 'kabar.html'],
    page: 'pemerintahan'
  },
  {
    file: 'akuntabilitas.html',
    title: 'Akuntabilitas Publik - Transparansi APBDes Desa Tawun',
    description: 'Transparansi Anggaran Dana Desa (APBDes), geotagging proyek infrastruktur pesisir, dan arsip dokumen publik JDIH Desa Tawun.',
    components: ['apbdes.html', 'pembangunan.html', 'dokumen.html'],
    page: 'akuntabilitas'
  },
  {
    file: 'geospasial.html',
    title: 'Peta GIS Geospasial - Portal Resmi Desa Tawun',
    description: 'Peta interaktif geospasial kawasan Desa Tawun, Dermaga Tawun, dan rute wisata Gili Sekotong menggunakan teknologi Leaflet GIS.',
    components: ['gis-map.html'],
    page: 'geospasial'
  },
  {
    file: 'pariwisata.html',
    title: 'Wisata Bahari Gili Sekotong - Portal Resmi Desa Tawun',
    description: 'Etalase wisata bahari Gili Nanggu, Gili Sudak, Gili Kedis, dan potensi pariwisata pesisir Desa Tawun, Sekotong, Lombok Barat.',
    components: ['wisata.html'],
    page: 'pariwisata'
  },
  {
    file: 'umkm.html',
    title: 'Etalase UMKM Mutiara & Pesisir - Portal Resmi Desa Tawun',
    description: 'Marketplace produk UMKM unggulan Desa Tawun: mutiara Lombok, kerajinan pesisir, kuliner lokal, dan produk budidaya nelayan Sekotong.',
    components: ['umkm.html'],
    page: 'umkm'
  }
];

function readComponent(filename) {
  const filePath = path.join(COMPONENTS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`[Warning] Component not found: ${filename}`);
    return '';
  }
  return fs.readFileSync(filePath, 'utf8').trim();
}

function buildPageHead(title, description, page, cssPath = 'css/style.css', leafletCssPath = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css') {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="Pemerintah Desa Tawun">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80">
  <link rel="icon" type="image/png" href="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lambang_Kabupaten_Lombok_Barat.png/240px-Lambang_Kabupaten_Lombok_Barat.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="${leafletCssPath}" crossorigin="">
  <link rel="stylesheet" href="${cssPath}">
  <style>
    /* Active nav link for this page */
    .nav-link[data-page="${page}"] { color: var(--primary) !important; font-weight: 700 !important; }
    .nav-link[data-page="${page}"]::after { width: 100% !important; opacity: 1 !important; }
    /* Page hero banner */
    .page-hero {
      background: linear-gradient(135deg, #032524 0%, #064e4b 60%, #0d9488 100%);
      padding: 60px 0 50px;
      position: relative;
      overflow: hidden;
    }
    .page-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
      background-size: 24px 24px;
    }
    .page-hero-inner { position: relative; z-index: 1; }
    .page-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(52,211,153,0.15);
      color: #34d399;
      border: 1px solid rgba(52,211,153,0.3);
      padding: 5px 16px;
      border-radius: 100px;
      font-size: 12.5px;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin-bottom: 20px;
    }
    .page-hero h1 {
      font-size: clamp(26px, 4vw, 40px);
      font-weight: 900;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 14px;
    }
    .page-hero p {
      font-size: 15px;
      color: rgba(255,255,255,0.78);
      max-width: 620px;
      line-height: 1.65;
    }
    .page-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: rgba(255,255,255,0.6);
      margin-bottom: 20px;
    }
    .page-breadcrumb a { color: #34d399; }
    .page-breadcrumb .sep { opacity: 0.5; }
  </style>
</head>
<body>`;
}

function buildPageFoot(hasLeaflet = false) {
  return `
  ${hasLeaflet ? '<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>' : ''}
  <script type="module" src="js/app.js"></script>
  <script nomodule src="js/bundle.js"></script>
</body>
</html>`;
}

function buildHtml() {
  console.log('⚡ Assembling HTML components...');

  // --- Build index.html (Homepage) ---
  const indexComponents = COMPONENT_ORDER.map(file => {
    const content = readComponent(file);
    return `  <!-- COMPONENT: ${file} -->\n  ${content.split('\n').join('\n  ')}`;
  }).join('\n\n');

  const indexHtml = buildPageHead(
    'Portal Resmi Pemerintah Desa Tawun - Kec. Sekotong, Kab. Lombok Barat, NTB',
    'Portal Digital Terpadu Desa Tawun, Kecamatan Sekotong, Kabupaten Lombok Barat, NTB. Gerbang Wisata Bahari Gili Nanggu, Gili Sudak, Gili Kedis, Transparansi Dana Desa, Layanan Surat Mandiri, Peta GIS, dan Etalase UMKM Mutiara & Pesisir.',
    'beranda'
  ) + `\n\n${indexComponents}\n` + buildPageFoot(false);

  fs.writeFileSync(INDEX_HTML, indexHtml, 'utf8');
  console.log('✅ Successfully compiled index.html');

  // --- Build sub-pages ---
  for (const page of PAGES) {
    const hasLeaflet = page.components.includes('gis-map.html') || page.components.includes('pembangunan.html');

    const sharedHead = [...SHARED_HEAD].map(f => readComponent(f)).join('\n\n');
    const sharedTail = [...SHARED_TAIL].map(f => readComponent(f)).join('\n\n');

    const pageContent = page.components.map(file => {
      const content = readComponent(file);
      return `  <!-- COMPONENT: ${file} -->\n  ${content.split('\n').join('\n  ')}`;
    }).join('\n\n');

    // Page hero banner
    const pageName = path.basename(page.file, '.html');
    const heroHtml = buildPageHeroBanner(page);

    const fullPage = buildPageHead(page.title, page.description, page.page, 'css/style.css')
      + `\n\n${sharedHead}\n\n${heroHtml}\n\n${pageContent}\n\n${sharedTail}`
      + buildPageFoot(hasLeaflet);

    fs.writeFileSync(path.join(ROOT_DIR, page.file), fullPage, 'utf8');
    console.log(`✅ Successfully compiled ${page.file}`);
  }
}

function buildPageHeroBanner(page) {
  const heroMap = {
    'pemerintahan.html': {
      badge: '<i class="fas fa-landmark"></i> Portal Pemerintahan',
      title: 'Profil & Aparatur Pemerintah Desa Tawun',
      subtitle: 'Sambutan Kepala Desa, Struktur Organisasi Tata Kerja (SOTK), dan informasi seputar kegiatan & agenda resmi Pemerintah Desa Tawun, Kecamatan Sekotong.'
    },
    'akuntabilitas.html': {
      badge: '<i class="fas fa-scale-balanced"></i> Akuntabilitas Publik',
      title: 'Transparansi APBDes & Pembangunan Desa',
      subtitle: 'Rincian Anggaran Dana Desa (APBDes), monitoring geotagging proyek infrastruktur pesisir, dan akses arsip Dokumen Hukum (JDIH) Desa Tawun.'
    },
    'geospasial.html': {
      badge: '<i class="fas fa-map-location-dot"></i> Geospasial Wilayah Bahari',
      title: 'Peta Interaktif GIS Kawasan Desa Tawun',
      subtitle: 'Eksplorasi digital titik Dermaga Tawun, gugusan Gili Nanggu, Gili Sudak, Gili Kedis, sentra mutiara, dan titik infrastruktur pesisir Sekotong.'
    },
    'pariwisata.html': {
      badge: '<i class="fas fa-umbrella-beach"></i> Wisata Bahari Sekotong',
      title: 'Destinasi Wisata Gili Kepulauan Sekotong',
      subtitle: 'Gerbang ekowisata Gili Nanggu, Gili Sudak, dan Gili Kedis. Temukan paket wisata bahari, aktivitas snorkeling, diving, dan kuliner pesisir Desa Tawun.'
    },
    'umkm.html': {
      badge: '<i class="fas fa-store"></i> Etalase UMKM Lokal',
      title: 'Marketplace Produk UMKM Mutiara & Pesisir',
      subtitle: 'Temukan produk unggulan UMKM warga Desa Tawun: mutiara Lombok asli, kerajinan pesisir, olahan laut, dan produk pemberdayaan ekonomi masyarakat Sekotong.'
    }
  };
  const h = heroMap[page.file] || { badge: '', title: page.title, subtitle: page.description };
  const pageName = path.basename(page.file, '.html');
  return `  <div class="page-hero">
    <div class="container page-hero-inner">
      <div class="page-breadcrumb">
        <a href="index.html"><i class="fas fa-home"></i> Beranda</a>
        <span class="sep">/</span>
        <span>${h.badge.replace(/<[^>]+>/g, '')}</span>
      </div>
      <div class="page-hero-badge">${h.badge}</div>
      <h1>${h.title}</h1>
      <p>${h.subtitle}</p>
    </div>
  </div>`;
}

function buildJsBundle() {
  console.log('⚡ Generating universal JS bundle (js/bundle.js)...');

  // Read data and modules
  const gisData = fs.readFileSync(path.join(JS_DIR, 'data', 'gis-data.js'), 'utf8')
    .replace(/export\s+/g, '');

  const toast = fs.readFileSync(path.join(JS_DIR, 'modules', 'toast.js'), 'utf8')
    .replace(/export\s+/g, '');

  const heroSlider = fs.readFileSync(path.join(JS_DIR, 'modules', 'hero-slider.js'), 'utf8')
    .replace(/export\s+/g, '');

  const navigation = fs.readFileSync(path.join(JS_DIR, 'modules', 'navigation.js'), 'utf8')
    .replace(/export\s+/g, '');

  const counters = fs.readFileSync(path.join(JS_DIR, 'modules', 'counters.js'), 'utf8')
    .replace(/export\s+/g, '');

  const gisMap = fs.readFileSync(path.join(JS_DIR, 'modules', 'gis-map.js'), 'utf8')
    .replace(/import\s+[^;]+;\s*/g, '')
    .replace(/export\s+/g, '');

  const projectSwitcher = fs.readFileSync(path.join(JS_DIR, 'modules', 'project-switcher.js'), 'utf8')
    .replace(/export\s+/g, '');

  const umkmFilter = fs.readFileSync(path.join(JS_DIR, 'modules', 'umkm-filter.js'), 'utf8')
    .replace(/export\s+/g, '');

  const documentSearch = fs.readFileSync(path.join(JS_DIR, 'modules', 'document-search.js'), 'utf8')
    .replace(/export\s+/g, '');

  const modal = fs.readFileSync(path.join(JS_DIR, 'modules', 'modal.js'), 'utf8')
    .replace(/export\s+/g, '');

  const forms = fs.readFileSync(path.join(JS_DIR, 'modules', 'forms.js'), 'utf8')
    .replace(/import\s+[^;]+;\s*/g, '')
    .replace(/export\s+/g, '');

  const bundle = `/**
 * PORTAL RESMI DESA TAWUN - COMPILED PRODUCTION BUNDLE
 * Auto-generated by build.js for universal browser & offline file:// execution
 */
(function() {
  'use strict';

  // --- GIS Data ---
  ${gisData}

  // --- Toast Module ---
  ${toast}

  // --- Modal Module ---
  ${modal}

  // --- Hero Slider Module ---
  ${heroSlider}

  // --- Navigation Module ---
  ${navigation}

  // --- Animated Counters Module ---
  ${counters}

  // --- Leaflet GIS Module ---
  ${gisMap}

  // --- Project Switcher Module ---
  ${projectSwitcher}

  // --- UMKM Filter Module ---
  ${umkmFilter}

  // --- Document Search Module ---
  ${documentSearch}

  // --- Citizen Forms Module ---
  ${forms}

  // Safe runner
  function runSafely(name, fn) {
    try {
      fn();
    } catch (err) {
      console.error('[Tawun Bundle] Error in ' + name + ':', err);
    }
  }

  // Bootstrap
  document.addEventListener('DOMContentLoaded', function() {
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

  window.TawunApp = {
    version: '2.0.0-bundle',
    openModal: openModal,
    closeModal: closeModal,
    showToast: showToast
  };
})();
`;

  fs.writeFileSync(BUNDLE_JS, bundle, 'utf8');
  console.log('✅ Successfully compiled js/bundle.js');
}

function build() {
  buildHtml();
  buildJsBundle();
}

let isWatching = false;
function watch() {
  if (isWatching) return;
  isWatching = true;
  build();
  console.log('\n👀 Watching components/, css/, and js/ for changes... (Press Ctrl+C to stop)');

  const watchDirs = [COMPONENTS_DIR, path.join(ROOT_DIR, 'css'), JS_DIR];
  let debounceTimeout = null;

  watchDirs.forEach(dir => {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename || filename === 'bundle.js' || filename.endsWith('.tmp')) return;

      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        console.log(`\n🔄 Change detected in ${filename}, rebuilding...`);
        build();
      }, 150);
    });
  });
}

function serve(port = 3000) {
  watch();

  const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

    const filePath = path.join(ROOT_DIR, reqPath);
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      res.writeHead(403);
      res.end('403 Forbidden');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} sedang digunakan. Mencoba port ${port + 1}...`);
      serve(port + 1);
    } else {
      console.error('[Dev Server Error]:', err);
    }
  });

  server.listen(port, () => {
    console.log(`\n🚀 Local Dev Server running at: http://localhost:${port}`);
    console.log(`📂 Serving directory: ${ROOT_DIR}\n`);
  });
}

// CLI handler
const args = process.argv.slice(2);
if (args.includes('--serve')) {
  serve();
} else if (args.includes('--watch')) {
  watch();
} else {
  build();
}
