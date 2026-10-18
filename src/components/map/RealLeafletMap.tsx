'use client';

import React, { useEffect, useRef, useState } from 'react';
import { School } from '@/types';
import L from 'leaflet';
import { Layers, Globe } from 'lucide-react';
import { normalizeScore, getStarColorInfo, getSchoolDisplayNumber } from '@/lib/scoreRules';
import { getRoadTypeMeta } from '@/lib/roadTypes';

interface RealLeafletMapProps {
  schools: School[];
  selectedSchool: School | null;
  onSelectSchool: (school: School) => void;
}

const TILE_LAYERS = {
  satellite: {
    name: "🛰️ Sun'iy Yo'ldosh HD (Sputnik)",
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    labels:
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery &amp; GIS Community',
    maxZoom: 19,
  },
  voyager: {
    name: "🎨 Zamonaviy Ko'chalar (HD)",
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

function buildMarkerIcon(
  sch: School,
  isSelected: boolean
): L.DivIcon {
  const rawScore = sch.currentScore || 0;
  const isAssessed = rawScore > 0;
  const normScore = normalizeScore(rawScore);
  const rawNum = getSchoolDisplayNumber(sch);
  const colorInfo = getStarColorInfo(isAssessed ? normScore : 0);
  const isOneStar = colorInfo.stars === 1;
  const pinColor = isAssessed ? (isOneStar ? '#0f172a' : colorInfo.pinColor) : '#0d9488';
  const starRating = isAssessed ? normScore.toFixed(1) : '-';
  const dotColor = isOneStar ? '#ffffff' : pinColor;

  if (isSelected) {
    const selectedGlow = isOneStar
      ? 'box-shadow: 0 0 22px rgba(255,255,255,0.95), 0 8px 18px rgba(0,0,0,0.9); border: 3px solid #ffffff;'
      : `box-shadow: 0 8px 18px rgba(0,0,0,.5), 0 0 16px ${pinColor}; border: 3px solid #ffffff;`;

    return L.divIcon({
      className: 'custom-leaflet-pin selected-pin',
      html: `
        <div style="position:relative;width:200px;margin-left:-100px;margin-top:-72px;display:flex;flex-direction:column;align-items:center;pointer-events:none;">
          <div style="background:#0f172a;color:#fff;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.6);border:1.5px solid ${isOneStar ? '#ffffff' : pinColor};margin-bottom:4px;display:flex;align-items:center;gap:5px;">
            <span style="color:${dotColor};font-size:12px;">●</span>
            <span>${sch.name.length > 20 ? `${rawNum}-maktab` : sch.name}</span>
            <span style="color:${isOneStar ? '#ffffff' : pinColor};font-size:10px;font-weight:700;">★${starRating} (${normScore.toFixed(1)} ball)</span>
          </div>
          <div style="width:38px;height:38px;background-color:${pinColor};${selectedGlow}border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;">
            <span style="transform:rotate(45deg);color:#fff;font-size:12px;font-weight:900;font-family:monospace,sans-serif;text-shadow:0 1px 2px rgba(0,0,0,0.8);">${rawNum}</span>
          </div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, -60],
    });
  }

  const unselectedBorder = isOneStar ? '2.5px solid #ffffff' : '2px solid #ffffff';
  const unselectedGlow = isOneStar
    ? 'box-shadow: 0 0 12px rgba(255,255,255,0.95), 0 3px 8px rgba(0,0,0,0.9);'
    : `box-shadow: 0 3px 8px rgba(0,0,0,.4), 0 0 6px ${pinColor};`;

  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: `
      <div style="width:32px;height:32px;background-color:${pinColor};border:${unselectedBorder};border-radius:50% 50% 50% 0;transform:rotate(-45deg);${unselectedGlow}display:flex;align-items:center;justify-content:center;cursor:pointer;">
        <span style="transform:rotate(45deg);color:#fff;font-size:11px;font-weight:900;font-family:monospace,sans-serif;text-shadow:0 1px 2px rgba(0,0,0,0.8);">${rawNum}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });
}

function buildPopupContent(sch: School): string {
  const rawScore = sch.currentScore || 0;
  const isAssessed = rawScore > 0;
  const normScore = normalizeScore(rawScore);
  const lat = sch.coordinates!.latitude;
  const lng = sch.coordinates!.longitude;
  const colorInfo = getStarColorInfo(isAssessed ? normScore : 0);
  const pinColor = isAssessed ? colorInfo.pinColor : '#0d9488';
  const roadMeta = getRoadTypeMeta(sch.roadType);

  return `
    <div style="font-family:sans-serif;min-width:215px;padding:4px;">
      <div style="font-size:10px;font-weight:800;color:#0d9488;text-transform:uppercase;margin-bottom:2px;font-family:monospace;">🛰️ Tasdiqlangan Geolokatsiya</div>
      <div style="font-size:13px;font-weight:800;color:#0f172a;margin-bottom:3px;">${sch.name}</div>
      <div style="font-size:11px;color:#64748b;margin-bottom:6px;">${sch.districtName || ''}, ${sch.regionName || ''}</div>
      <div style="font-size:10px;color:#0f766e;background:#f0fdfa;padding:3px 6px;border-radius:6px;margin-bottom:6px;font-family:monospace;">📍 ${lat.toFixed(6)}, ${lng.toFixed(6)}</div>
      <div style="font-size:10px;font-weight:700;color:#1e293b;background:#f8fafc;border:1px solid #e2e8f0;padding:3px 6px;border-radius:6px;margin-bottom:8px;display:flex;align-items:center;gap:4px;">
        <span>${roadMeta.icon}</span>
        <span>${roadMeta.shortName}</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding-top:6px;border-top:1px solid #e2e8f0;">
        <span style="font-size:12px;font-weight:800;color:${pinColor};">${isAssessed ? `${normScore.toFixed(1)} ★ (${colorInfo.shortLabel})` : 'Tasdiqlangan'}</span>
        <span style="font-size:10px;font-weight:700;background:#ecfdf5;color:#065f46;padding:2px 8px;border-radius:9999px;">✓ Real Lokatsiya</span>
      </div>
    </div>
  `;
}

export function RealLeafletMap({ schools, selectedSchool, onSelectSchool }: RealLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelLayerRef = useRef<L.TileLayer | null>(null);
  // Marker map: schoolId → marker (incremental update uchun)
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());

  const [activeLayer, setActiveLayer] = useState<'satellite' | 'voyager' | 'osm'>('satellite');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // 1. Xaritani boshlang'ich holatga keltirish
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [40.5, 65.5],
      zoom: 7,
      minZoom: 5,
      maxZoom: 19,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    const baseTile = L.tileLayer(TILE_LAYERS.satellite.base, {
      attribution: TILE_LAYERS.satellite.attribution,
      maxZoom: TILE_LAYERS.satellite.maxZoom,
    }).addTo(map);
    tileLayerRef.current = baseTile;

    const labelTile = L.tileLayer(TILE_LAYERS.satellite.labels!, {
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

  // 2. Tile layer almashtiruvi
  const handleLayerChange = (layerKey: 'satellite' | 'voyager' | 'osm') => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) { map.removeLayer(tileLayerRef.current); tileLayerRef.current = null; }
    if (labelLayerRef.current) { map.removeLayer(labelLayerRef.current); labelLayerRef.current = null; }

    const cfg = TILE_LAYERS[layerKey];
    tileLayerRef.current = L.tileLayer(cfg.base, { attribution: cfg.attribution, maxZoom: cfg.maxZoom }).addTo(map);
    if (cfg.labels) {
      labelLayerRef.current = L.tileLayer(cfg.labels, { maxZoom: cfg.maxZoom }).addTo(map);
    }

    setActiveLayer(layerKey);
    setShowLayerMenu(false);
  };

  // 3. Markerlarni INCREMENTAL yangilash (clearLayers yo'q)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    // Koordinatalari mavjud bo'lgan barcha maktablar
    const verifiedSchools = schools.filter(
      (sch) =>
        sch.coordinates?.latitude !== undefined &&
        sch.coordinates?.latitude !== null &&
        !isNaN(Number(sch.coordinates.latitude)) &&
        sch.coordinates?.longitude !== undefined &&
        sch.coordinates?.longitude !== null &&
        !isNaN(Number(sch.coordinates.longitude))
    );

    // Tanlangan maktab koordinatasi bor bo'lsa qo'shish
    const displayMap = new Map(verifiedSchools.map((s) => [s.id, s]));
    if (
      selectedSchool &&
      selectedSchool.coordinates?.latitude &&
      selectedSchool.coordinates?.longitude &&
      !displayMap.has(selectedSchool.id)
    ) {
      displayMap.set(selectedSchool.id, selectedSchool);
    }

    const displayIds = new Set(displayMap.keys());
    const existingIds = new Set(markerMapRef.current.keys());

    // O'chirilgan markerlarni olib tashlash
    existingIds.forEach((id) => {
      if (!displayIds.has(id)) {
        const m = markerMapRef.current.get(id);
        if (m) markersLayer.removeLayer(m);
        markerMapRef.current.delete(id);
      }
    });

    // Yangi markerlarni qo'shish yoki mavjudlarini yangilash (icon o'zgarsa)
    displayMap.forEach((sch) => {
      const isSelected = selectedSchool?.id === sch.id;
      const lat = sch.coordinates!.latitude;
      const lng = sch.coordinates!.longitude;

      if (markerMapRef.current.has(sch.id)) {
        // Mavjud marker — faqat ikonni yangilash (qayta yaratmasdan)
        const existing = markerMapRef.current.get(sch.id)!;
        existing.setIcon(buildMarkerIcon(sch, isSelected));
        existing.setZIndexOffset(isSelected ? 2000 : 10);
      } else {
        // Yangi marker qo'shish
        const icon = buildMarkerIcon(sch, isSelected);
        const marker = L.marker([lat, lng], { icon, zIndexOffset: isSelected ? 2000 : 10 });

        marker.bindPopup(buildPopupContent(sch), { autoPan: true, closeButton: true });
        marker.on('click', () => onSelectSchool(sch));

        markersLayer.addLayer(marker);
        markerMapRef.current.set(sch.id, marker);
      }
    });

    // Dastlabki ko'rinish uchun barcha maktablarga moslash
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

  // 4. Tanlangan maktabga zoom
  const prevSelectedIdRef = useRef<string | null>(null);
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedSchool) return;

    if (prevSelectedIdRef.current !== selectedSchool.id) {
      prevSelectedIdRef.current = selectedSchool.id;
      if (!selectedSchool.coordinates?.latitude || !selectedSchool.coordinates?.longitude) return;

      const lat = selectedSchool.coordinates.latitude;
      const lng = selectedSchool.coordinates.longitude;

      map.flyTo([lat, lng], 16, { animate: true, duration: 1.2 });

      const onMoveEnd = () => {
        const activeMarker = markerMapRef.current.get(selectedSchool.id);
        if (activeMarker) activeMarker.openPopup();
        map.off('moveend', onMoveEnd);
      };
      map.on('moveend', onMoveEnd);
    }
  }, [selectedSchool]);

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([40.5, 65.5], 7, { animate: true, duration: 1.0 });
  };

  return (
    <div className="relative w-full h-full min-h-[450px]">
      <style jsx global>{`
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>

      <div ref={mapContainerRef} className="w-full h-full rounded-2xl overflow-hidden z-0" />

      {/* Xarita turi tanlash */}
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
              {(['satellite', 'voyager', 'osm'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleLayerChange(key)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                    activeLayer === key
                      ? 'bg-teal-700 text-white font-bold'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span>{TILE_LAYERS[key].name}</span>
                  {activeLayer === key && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleResetView}
          className="flex items-center gap-1.5 bg-slate-900/95 hover:bg-slate-900 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold shadow-xl border border-slate-700 backdrop-blur-md transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-teal-400" />
          <span>Respublika Ko‘rinishi</span>
        </button>
      </div>

      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-xs text-white border border-slate-700/80 text-[11px] font-mono shadow-md flex items-center gap-1.5 pointer-events-none">
        <span className="text-teal-400 font-bold">🛰️ Esri Satellite HD</span>
        <span className="text-slate-400">|</span>
        <span className="text-emerald-400 font-semibold">Faqat tasdiqlangan lokatsiyalar</span>
      </div>
    </div>
  );
}
