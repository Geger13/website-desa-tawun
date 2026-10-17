/**
 * LEAFLET GIS MAP MODULE
 * Interactive geospatial map of Desa Tawun, Dermaga Tawun, and Gili Sekotong archipelago
 */

import { TAWUN_COORDS, MAP_LOCATIONS } from '../data/gis-data.js';

export function initLeafletMap() {
  const mapElement = document.getElementById('village-map');
  if (!mapElement || typeof L === 'undefined') return;

  // Initialize Leaflet map
  const map = L.map('village-map', {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView(TAWUN_COORDS, 13);

  // Basemap Tile Layer (CartoDB Voyager)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Layer Groups
  const layerGroups = {
    pembangunan: L.layerGroup().addTo(map),
    wisata: L.layerGroup().addTo(map),
    umkm: L.layerGroup().addTo(map),
    fasilitas: L.layerGroup().addTo(map)
  };

  // Custom SVG Map Marker Pin Creator
  function createCustomIcon(bgColor, iconClass) {
    return L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="
        background: ${bgColor};
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 4px 14px rgba(0,0,0,0.3);
        border: 2px solid #ffffff;
      ">
        <i class="${iconClass}" style="transform: rotate(45deg); font-size: 14px;"></i>
      </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -32]
    });
  }

  // Populate map with data points
  MAP_LOCATIONS.forEach(loc => {
    const marker = L.marker(loc.coords, {
      icon: createCustomIcon(loc.iconColor, loc.iconClass)
    });

    const popupHtml = `
      <div class="popup-card">
        <img src="${loc.image}" alt="${loc.name}">
        <span class="popup-badge" style="background: ${loc.iconColor}15; color: ${loc.iconColor}; border: 1px solid ${loc.iconColor}30;">
          ${loc.badge}
        </span>
        <h4>${loc.name}</h4>
        <p>${loc.desc}</p>
        <a href="https://maps.google.com/?q=${loc.coords[0]},${loc.coords[1]}" target="_blank" style="
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: ${loc.iconColor};
          font-weight: 700;
          font-size: 11.5px;
          text-decoration: none;
        ">
          <i class="fas fa-location-arrow"></i> Petunjuk Arah Google Maps
        </a>
      </div>
    `;

    marker.bindPopup(popupHtml);
    if (layerGroups[loc.category]) {
      layerGroups[loc.category].addLayer(marker);
    }
  });

  // Layer Toggles Event Handlers
  const toggleBtns = document.querySelectorAll('.layer-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const layerName = btn.getAttribute('data-layer');
      if (!layerName || !layerGroups[layerName]) return;

      if (map.hasLayer(layerGroups[layerName])) {
        map.removeLayer(layerGroups[layerName]);
        btn.classList.remove('active');
      } else {
        map.addLayer(layerGroups[layerName]);
        btn.classList.add('active');
      }
    });
  });
}
