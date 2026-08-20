'use client';

import React, { useEffect, useRef, useState } from 'react';
import { School } from '@/types';
import L from 'leaflet';
import { Layers, Globe } from 'lucide-react';

interface RealLeafletMapProps {
  schools: School[];
  selectedSchool: School | null;
  onSelectSchool: (school: School) => void;
}

const TILE_LAYERS = {
  voyager: {
    name: '🎨 Zamonaviy Ko‘chalar (HD)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CartoDB & OpenStreetMap',
    maxZoom: 20,
  },
  satellite: {
    name: '🛰️ Sun’iy Yo‘ldosh (Sputnik)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery',
    maxZoom: 19,
  },
  osm: {
    name: '🗺️ Standart Topografik',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
};

export function RealLeafletMap({
  schools,
  selectedSchool,
  onSelectSchool,
}: RealLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());

  const [activeLayer, setActiveLayer] = useState<'voyager' | 'satellite' | 'osm'>('voyager');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Uzbekistan: [41.3775, 64.5853], zoom: 6
    const map = L.map(mapContainerRef.current, {
      center: [41.3775, 64.5853],
      zoom: 6,
      minZoom: 5,
      maxZoom: 19,
      zoomControl: false,
    });

    // Top Right Zoom Controls
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial Tile Layer (CartoDB Voyager HD)
    const initialTile = L.tileLayer(TILE_LAYERS.voyager.url, {
      attribution: TILE_LAYERS.voyager.attribution,
      maxZoom: TILE_LAYERS.voyager.maxZoom,
    }).addTo(map);

    tileLayerRef.current = initialTile;

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Change Tile Layer smoothly
  const handleLayerChange = (layerKey: 'voyager' | 'satellite' | 'osm') => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const cfg = TILE_LAYERS[layerKey];
    const newTile = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
    }).addTo(map);

    tileLayerRef.current = newTile;
    setActiveLayer(layerKey);
    setShowLayerMenu(false);
  };

  // 3. Render Markers & Guaranteed Visibility
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();
    markerMapRef.current.clear();

    schools.forEach((sch) => {
      const lat = sch.coordinates?.latitude || 40.1032;
      const lng = sch.coordinates?.longitude || 64.6756;
      const score = sch.currentScore || 0;
      const isSelected = selectedSchool?.id === sch.id;
      const isAssessed = score > 0;

      const pinColor = !isAssessed
        ? '#64748b' // Slate Gray for unassessed schools (0 ball)
        : score >= 80
        ? '#10b981' // Green
        : score >= 50
        ? '#f59e0b' // Yellow
        : '#ef4444'; // Red

      let customIcon: L.DivIcon;

      if (isSelected) {
        // High-contrast Selected Pin with Floating Title Tag
        customIcon = L.divIcon({
          className: 'custom-leaflet-pin selected-pin',
          html: `
            <div style="position: relative; width: 140px; margin-left: -70px; margin-top: -65px; display: flex; flex-direction: column; align-items: center; pointer-events: none;">
              <!-- Floating Title Banner -->
              <div style="
                background: #0f172a;
                color: #ffffff;
                padding: 4px 8px;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 800;
                white-space: nowrap;
                box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                border: 1px solid #334155;
                margin-bottom: 4px;
                display: flex;
                align-items: center;
                gap: 4px;
              ">
                <span style="color: ${pinColor}; font-size: 12px;">●</span>
                <span>${sch.name} (${isAssessed ? `${score} ball` : 'Baholanmagan'})</span>
              </div>

              <!-- Main Pin Body -->
              <div style="
                width: 36px;
                height: 36px;
                background-color: ${pinColor};
                border: 3px solid #ffffff;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 8px 16px rgba(0,0,0,0.45), 0 0 16px ${pinColor};
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="
                  transform: rotate(45deg);
                  color: #ffffff;
                  font-size: 12px;
                  font-weight: 900;
                  font-family: sans-serif;
                ">${score}</span>
              </div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
          popupAnchor: [0, -60],
        });
      } else {
        // Normal Crisp Pin
        customIcon = L.divIcon({
          className: 'custom-leaflet-pin',
          html: `
            <div style="
              width: 26px;
              height: 26px;
              background-color: ${pinColor};
              border: 2px solid #ffffff;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              box-shadow: 0 3px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <span style="
                transform: rotate(45deg);
                color: #ffffff;
                font-size: 9px;
                font-weight: 800;
                font-family: sans-serif;
              ">${score}</span>
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 26],
          popupAnchor: [0, -26],
        });
      }

      const marker = L.marker([lat, lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 2000 : 10,
      });

      const popupContent = `
        <div style="font-family: sans-serif; min-width: 200px; padding: 4px;">
          <div style="font-size: 10px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 2px; font-family: monospace;">
            Tanlangan Maktab
          </div>
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 3px;">
            ${sch.name}
          </div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
            ${sch.districtName || ''}, ${sch.regionName || ''}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 6px; border-top: 1px solid #e2e8f0;">
            <span style="font-size: 12px; font-weight: 800; color: ${pinColor};">
              ${isAssessed ? `${score} / 100 ball` : '0 ball (Baholanmagan)'}
            </span>
            <span style="font-size: 10px; font-weight: 700; background: ${
              isAssessed ? '#ecfdf5' : '#f1f5f9'
            }; color: ${
              isAssessed ? '#065f46' : '#475569'
            }; padding: 2px 6px; border-radius: 4px;">
              ${isAssessed ? '✓ Baholangan' : 'Kutilmoqda'}
            </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { autoPan: true, closeButton: true });

      marker.on('click', () => {
        onSelectSchool(sch);
      });

      markersLayer.addLayer(marker);
      markerMapRef.current.set(sch.id, marker);
    });
  }, [schools, selectedSchool, onSelectSchool]);

  // 4. Smooth Close-up Zoom (Yaqinlashish) when selecting school
  const prevSelectedIdRef = useRef<string | null>(null);
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedSchool) return;

    if (prevSelectedIdRef.current !== selectedSchool.id) {
      prevSelectedIdRef.current = selectedSchool.id;
      const lat = selectedSchool.coordinates?.latitude || 40.1032;
      const lng = selectedSchool.coordinates?.longitude || 64.6756;

      // Smooth zoom (15x) directly to the selected school without losing the marker
      map.flyTo([lat, lng], 15, {
        animate: true,
        duration: 1.0,
      });

      // Open popup right after flyTo animation finishes
      const onMoveEnd = () => {
        const activeMarker = markerMapRef.current.get(selectedSchool.id);
        if (activeMarker) {
          activeMarker.openPopup();
        }
        map.off('moveend', onMoveEnd);
      };

      map.on('moveend', onMoveEnd);
    }
  }, [selectedSchool]);

  // Reset to full country view
  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([41.3775, 64.5853], 6, { animate: true, duration: 1.0 });
  };

  return (
    <div className="relative w-full h-full min-h-[450px]">
      {/* Global CSS overrides for Leaflet DivIcons to prevent any clipping/borders */}
      <style jsx global>{`
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>

      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full rounded-2xl overflow-hidden z-0" />

      {/* Map Layer Switcher Control */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg border border-slate-700 backdrop-blur-md transition-all"
          >
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Xarita Turi</span>
          </button>

          {showLayerMenu && (
            <div className="absolute top-11 left-0 w-56 rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl p-2 shadow-2xl space-y-1 z-20 animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => handleLayerChange('voyager')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeLayer === 'voyager'
                    ? 'bg-teal-600 text-white font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>🎨 Zamonaviy Ko‘chalar (HD)</span>
                {activeLayer === 'voyager' && <span>✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleLayerChange('satellite')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeLayer === 'satellite'
                    ? 'bg-teal-600 text-white font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>🛰️ Sun’iy Yo‘ldosh (Sputnik)</span>
                {activeLayer === 'satellite' && <span>✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleLayerChange('osm')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeLayer === 'osm'
                    ? 'bg-teal-600 text-white font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>🗺️ Standart Topografik</span>
                {activeLayer === 'osm' && <span>✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* Full Country View Button */}
        <button
          type="button"
          onClick={handleResetView}
          className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-900 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold shadow-lg border border-slate-700 backdrop-blur-md transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-teal-400" />
          <span>Respublika Ko‘rinishi</span>
        </button>
      </div>
    </div>
  );
}
