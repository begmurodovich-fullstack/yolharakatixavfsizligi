'use client';

import React, { useEffect, useRef, useState } from 'react';
import { School } from '@/types';
import L from 'leaflet';
import { Layers, Globe, Navigation } from 'lucide-react';

interface RealLeafletMapProps {
  schools: School[];
  selectedSchool: School | null;
  onSelectSchool: (school: School) => void;
}

const TILE_LAYERS = {
  satellite: {
    name: '🛰️ Sun’iy Yo‘ldosh HD (Sputnik)',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    labels: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery & GIS Community',
    maxZoom: 19,
  },
  voyager: {
    name: '🎨 Zamonaviy Ko‘chalar (HD)',
    base: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    labels: null,
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
  osm: {
    name: '🗺️ OpenStreetMap (Standart)',
    base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    labels: null,
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
  const labelLayerRef = useRef<L.TileLayer | null>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());

  const [activeLayer, setActiveLayer] = useState<'satellite' | 'voyager' | 'osm'>('satellite');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // 1. Initialize Map with Satellite Layer as default
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Uzbekistan: [40.5, 65.5], default zoom: 7
    const map = L.map(mapContainerRef.current, {
      center: [40.5, 65.5],
      zoom: 7,
      minZoom: 5,
      maxZoom: 19,
      zoomControl: false,
    });

    // Top Right Zoom Controls
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial Satellite Tile Layer
    const baseTile = L.tileLayer(TILE_LAYERS.satellite.base, {
      attribution: TILE_LAYERS.satellite.attribution,
      maxZoom: TILE_LAYERS.satellite.maxZoom,
    }).addTo(map);
    tileLayerRef.current = baseTile;

    // Satellite Hybrid Labels Overlay (Streets, districts, landmarks)
    const labelTile = L.tileLayer(TILE_LAYERS.satellite.labels, {
      maxZoom: TILE_LAYERS.satellite.maxZoom,
    }).addTo(map);
    labelLayerRef.current = labelTile;

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Change Tile Layer smoothly
  const handleLayerChange = (layerKey: 'satellite' | 'voyager' | 'osm') => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }
    if (labelLayerRef.current) {
      map.removeLayer(labelLayerRef.current);
      labelLayerRef.current = null;
    }

    const cfg = TILE_LAYERS[layerKey];
    tileLayerRef.current = L.tileLayer(cfg.base, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
    }).addTo(map);

    if (cfg.labels) {
      labelLayerRef.current = L.tileLayer(cfg.labels, {
        maxZoom: cfg.maxZoom,
      }).addTo(map);
    }

    setActiveLayer(layerKey);
    setShowLayerMenu(false);
  };

  // 3. Render Markers ONLY for Verified Schools with Valid Coordinates
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();
    markerMapRef.current.clear();

    // STRICT FILTER: Only show schools that have submitted coordinates and are verified
    const verifiedSchools = schools.filter(
      (sch) =>
        (sch.coordinateStatus === 'VERIFIED' || sch.coordinates?.status === 'VERIFIED') &&
        sch.coordinates?.latitude !== undefined &&
        sch.coordinates?.latitude !== null &&
        !isNaN(Number(sch.coordinates.latitude)) &&
        sch.coordinates?.longitude !== undefined &&
        sch.coordinates?.longitude !== null &&
        !isNaN(Number(sch.coordinates.longitude))
    );

    // If a selected school has valid coordinates even if not yet batch verified, allow showing it
    const displayList = [...verifiedSchools];
    if (
      selectedSchool &&
      selectedSchool.coordinates?.latitude &&
      selectedSchool.coordinates?.longitude &&
      !displayList.some((s) => s.id === selectedSchool.id)
    ) {
      displayList.push(selectedSchool);
    }

    displayList.forEach((sch) => {
      const lat = sch.coordinates!.latitude;
      const lng = sch.coordinates!.longitude;
      const score = sch.currentScore || 0;
      const isSelected = selectedSchool?.id === sch.id;
      const isAssessed = score > 0;

      const pinColor = !isAssessed
        ? '#0d9488' // Teal brand color for verified schools
        : score >= 80
        ? '#10b981' // Green (4-5 yulduz)
        : score >= 50
        ? '#f59e0b' // Yellow (3 yulduz)
        : '#ef4444'; // Red (1-2 yulduz)

      let customIcon: L.DivIcon;

      if (isSelected) {
        // High-contrast Selected Pin with Floating Title Tag
        customIcon = L.divIcon({
          className: 'custom-leaflet-pin selected-pin',
          html: `
            <div style="position: relative; width: 160px; margin-left: -80px; margin-top: -65px; display: flex; flex-direction: column; align-items: center; pointer-events: none;">
              <!-- Floating Title Banner -->
              <div style="
                background: #0f172a;
                color: #ffffff;
                padding: 4px 10px;
                border-radius: 9999px;
                font-size: 11px;
                font-weight: 800;
                white-space: nowrap;
                box-shadow: 0 4px 14px rgba(0,0,0,0.6);
                border: 1px solid #14b8a6;
                margin-bottom: 4px;
                display: flex;
                align-items: center;
                gap: 5px;
              ">
                <span style="color: ${pinColor}; font-size: 13px;">●</span>
                <span>${sch.name}</span>
                <span style="color: #94a3b8; font-size: 10px;">(${isAssessed ? `${score}b` : '✓'})</span>
              </div>

              <!-- Main Pin Body -->
              <div style="
                width: 36px;
                height: 36px;
                background-color: ${pinColor};
                border: 3px solid #ffffff;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 8px 18px rgba(0,0,0,0.5), 0 0 16px ${pinColor};
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="
                  transform: rotate(45deg);
                  color: #ffffff;
                  font-size: 11px;
                  font-weight: 900;
                  font-family: sans-serif;
                ">${isAssessed ? score : '✓'}</span>
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
              width: 28px;
              height: 28px;
              background-color: ${pinColor};
              border: 2px solid #ffffff;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              box-shadow: 0 3px 8px rgba(0,0,0,0.4);
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
              ">${isAssessed ? score : '✓'}</span>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -28],
        });
      }

      const marker = L.marker([lat, lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 2000 : 10,
      });

      const popupContent = `
        <div style="font-family: sans-serif; min-width: 210px; padding: 4px;">
          <div style="font-size: 10px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 2px; font-family: monospace; letter-spacing: 0.5px;">
            🛰️ Tasdiqlangan Geolokatsiya
          </div>
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 3px;">
            ${sch.name}
          </div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">
            ${sch.districtName || ''}, ${sch.regionName || ''}
          </div>
          <div style="font-size: 10px; color: #0f766e; background: #f0fdfa; padding: 3px 6px; border-radius: 6px; margin-bottom: 8px; font-family: monospace;">
            📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 6px; border-top: 1px solid #e2e8f0;">
            <span style="font-size: 12px; font-weight: 800; color: ${pinColor};">
              ${isAssessed ? `${((score / 100) * 4 + 1).toFixed(1)} ★ / 5.0` : 'Tasdiqlangan'}
            </span>
            <span style="font-size: 10px; font-weight: 700; background: #ecfdf5; color: #065f46; padding: 2px 8px; border-radius: 9999px;">
              ✓ Real Lokatsiya
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

    // Auto fit to verified schools if no specific school is actively selected
    if (!selectedSchool && verifiedSchools.length > 0) {
      if (verifiedSchools.length === 1) {
        map.setView(
          [verifiedSchools[0].coordinates!.latitude, verifiedSchools[0].coordinates!.longitude],
          15
        );
      } else {
        const bounds = L.latLngBounds(
          verifiedSchools.map((s) => [s.coordinates!.latitude, s.coordinates!.longitude])
        );
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
      }
    }
  }, [schools, selectedSchool, onSelectSchool]);

  // 4. Smooth Close-up Zoom when selecting school
  const prevSelectedIdRef = useRef<string | null>(null);
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedSchool) return;

    if (prevSelectedIdRef.current !== selectedSchool.id) {
      prevSelectedIdRef.current = selectedSchool.id;
      if (!selectedSchool.coordinates?.latitude || !selectedSchool.coordinates?.longitude) return;

      const lat = selectedSchool.coordinates.latitude;
      const lng = selectedSchool.coordinates.longitude;

      // Smooth satellite zoom (16x) directly to the selected school
      map.flyTo([lat, lng], 16, {
        animate: true,
        duration: 1.2,
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
    map.flyTo([40.5, 65.5], 7, { animate: true, duration: 1.0 });
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
            className="flex items-center gap-2 bg-slate-900/95 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl border border-teal-500/40 backdrop-blur-md transition-all"
          >
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Xarita: {TILE_LAYERS[activeLayer].name.split(' ')[1]}</span>
          </button>

          {showLayerMenu && (
            <div className="absolute top-11 left-0 w-60 rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl p-2 shadow-2xl space-y-1 z-20 animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => handleLayerChange('satellite')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeLayer === 'satellite'
                    ? 'bg-teal-700 text-white font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>🛰️ Sun’iy Yo‘ldosh (Sputnik HD)</span>
                {activeLayer === 'satellite' && <span>✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleLayerChange('voyager')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeLayer === 'voyager'
                    ? 'bg-teal-700 text-white font-bold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>🎨 Zamonaviy Ko‘chalar (HD)</span>
                {activeLayer === 'voyager' && <span>✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleLayerChange('osm')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeLayer === 'osm'
                    ? 'bg-teal-700 text-white font-bold'
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
          className="flex items-center gap-1.5 bg-slate-900/95 hover:bg-slate-900 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold shadow-xl border border-slate-700 backdrop-blur-md transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-teal-400" />
          <span>Respublika Ko‘rinishi</span>
        </button>
      </div>

      {/* Real Satellite HD Indicator in Bottom Left */}
      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-xs text-white border border-slate-700/80 text-[11px] font-mono shadow-md flex items-center gap-1.5 pointer-events-none">
        <span className="text-teal-400 font-bold">🛰️ Esri Satellite HD</span>
        <span className="text-slate-400">|</span>
        <span className="text-emerald-400 font-semibold">Faqat tasdiqlangan lokatsiyalar</span>
      </div>
    </div>
  );
}
