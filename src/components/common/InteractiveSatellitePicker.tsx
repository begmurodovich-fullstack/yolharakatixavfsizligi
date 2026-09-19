'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Search, Loader2, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InteractiveSatellitePickerProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
  accuracyMeters?: number | null;
}

const TILE_CONFIG = {
  satellite: {
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery',
    labels: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
  },
  osm: {
    base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
};

export function InteractiveSatellitePicker({
  latitude,
  longitude,
  onLocationChange,
  accuracyMeters,
}: InteractiveSatellitePickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const baseTileRef = useRef<L.TileLayer | null>(null);
  const labelTileRef = useRef<L.TileLayer | null>(null);

  const [mode, setMode] = useState<'satellite' | 'osm'>('satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialLat = !isNaN(latitude) && latitude !== 0 ? latitude : 40.1582;
    const initialLng = !isNaN(longitude) && longitude !== 0 ? longitude : 64.9117;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 17,
      minZoom: 4,
      maxZoom: 19,
      zoomControl: false,
    });

    // Add Base Satellite Layer
    const baseTile = L.tileLayer(TILE_CONFIG.satellite.base, {
      attribution: TILE_CONFIG.satellite.attribution,
      maxZoom: TILE_CONFIG.satellite.maxZoom,
    }).addTo(map);
    baseTileRef.current = baseTile;

    // Add Hybrid Labels Overlay (Street names, cities, landmarks)
    const labelTile = L.tileLayer(TILE_CONFIG.satellite.labels, {
      maxZoom: TILE_CONFIG.satellite.maxZoom,
    }).addTo(map);
    labelTileRef.current = labelTile;

    // Draggable Pin
    const customPin = L.divIcon({
      className: 'custom-picker-pin',
      html: `
        <div style="position: relative; width: 44px; height: 50px; margin-left: -22px; margin-top: -50px; display: flex; flex-direction: column; align-items: center; cursor: grab;">
          <div style="
            background: #0f766e;
            color: #ffffff;
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 10px;
            font-weight: 800;
            white-space: nowrap;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            border: 1px solid #14b8a6;
            margin-bottom: 2px;
          ">Maktab darvozasi</div>
          <div style="
            width: 32px;
            height: 32px;
            background: #0d9488;
            border: 3px solid #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 16px rgba(0,0,0,0.6);
            color: #ffffff;
            font-size: 16px;
          ">📍</div>
          <div style="
            width: 8px;
            height: 8px;
            background: #0f766e;
            border-radius: 50%;
            margin-top: -3px;
            box-shadow: 0 0 6px rgba(0,0,0,0.4);
          "></div>
        </div>
      `,
      iconSize: [44, 50],
      iconAnchor: [22, 50],
    });

    const marker = L.marker([initialLat, initialLng], {
      draggable: true,
      icon: customPin,
    }).addTo(map);

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      onLocationChange(Number(pos.lat.toFixed(6)), Number(pos.lng.toFixed(6)));
    });

    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      onLocationChange(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
    });

    markerRef.current = marker;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Sync marker when latitude/longitude changes from external props (e.g. manual inputs or GPS)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;

    if (!isNaN(latitude) && !isNaN(longitude) && latitude !== 0 && longitude !== 0) {
      const currentPos = marker.getLatLng();
      const diffLat = Math.abs(currentPos.lat - latitude);
      const diffLng = Math.abs(currentPos.lng - longitude);

      if (diffLat > 0.00001 || diffLng > 0.00001) {
        marker.setLatLng([latitude, longitude]);
        map.panTo([latitude, longitude], { animate: true });
      }
    }
  }, [latitude, longitude]);

  // 3. Switch Tile Layer (Satellite vs OSM)
  const handleToggleMode = (newMode: 'satellite' | 'osm') => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (baseTileRef.current) map.removeLayer(baseTileRef.current);
    if (labelTileRef.current) map.removeLayer(labelTileRef.current);

    if (newMode === 'satellite') {
      baseTileRef.current = L.tileLayer(TILE_CONFIG.satellite.base, {
        attribution: TILE_CONFIG.satellite.attribution,
        maxZoom: TILE_CONFIG.satellite.maxZoom,
      }).addTo(map);

      labelTileRef.current = L.tileLayer(TILE_CONFIG.satellite.labels, {
        maxZoom: TILE_CONFIG.satellite.maxZoom,
      }).addTo(map);
    } else {
      baseTileRef.current = L.tileLayer(TILE_CONFIG.osm.base, {
        attribution: TILE_CONFIG.osm.attribution,
        maxZoom: TILE_CONFIG.osm.maxZoom,
      }).addTo(map);
      labelTileRef.current = null;
    }

    setMode(newMode);
  };

  // 4. Address search via OpenStreetMap Nominatim
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError('');

    try {
      const q = encodeURIComponent(`${searchQuery.trim()}, Uzbekistan`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=1`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const newLat = parseFloat(item.lat);
        const newLng = parseFloat(item.lon);

        if (!isNaN(newLat) && !isNaN(newLng)) {
          const map = mapInstanceRef.current;
          const marker = markerRef.current;
          if (map && marker) {
            marker.setLatLng([newLat, newLng]);
            map.flyTo([newLat, newLng], 17, { duration: 1.5 });
          }
          onLocationChange(Number(newLat.toFixed(6)), Number(newLng.toFixed(6)));
        }
      } else {
        setSearchError('Manzil topilmadi. Tuman yoki shahar nomini qo‘shib yozing.');
      }
    } catch {
      setSearchError('Qidiruvda xatolik yuz berdi.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCenterOnMarker = () => {
    const map = mapInstanceRef.current;
    if (map && !isNaN(latitude) && !isNaN(longitude)) {
      map.flyTo([latitude, longitude], 18, { duration: 1 });
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Maktab manzili, mahalla yoki tuman nomini qidiring..."
            className="pl-9 text-xs h-9.5 rounded-xl border-slate-200 bg-white shadow-xs focus:border-teal-500"
          />
        </div>
        <Button
          type="button"
          onClick={() => handleSearch()}
          disabled={isSearching}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl h-9.5 px-3.5 gap-1 shrink-0"
        >
          {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          <span>Qidirish</span>
        </Button>
      </form>

      {searchError && (
        <div className="text-[11px] text-rose-600 font-medium px-1">
          {searchError}
        </div>
      )}

      {/* Map Container */}
      <div className="relative w-full h-64 sm:h-72 rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Top-Left: Layer Switcher */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center bg-white/95 backdrop-blur-xs rounded-xl border border-slate-200 shadow-sm p-0.5 text-xs">
          <button
            type="button"
            onClick={() => handleToggleMode('satellite')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors flex items-center gap-1.5 ${
              mode === 'satellite'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🛰️ Sun’iy yo‘ldosh</span>
          </button>
          <button
            type="button"
            onClick={() => handleToggleMode('osm')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors flex items-center gap-1.5 ${
              mode === 'osm'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🗺️ Xarita</span>
          </button>
        </div>

        {/* Top-Right: Zoom Buttons */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1 bg-white/95 backdrop-blur-xs rounded-xl border border-slate-200 shadow-sm p-0.5">
          <button
            type="button"
            onClick={() => mapInstanceRef.current?.zoomIn()}
            title="Kattalashtirish"
            className="p-1.5 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => mapInstanceRef.current?.zoomOut()}
            title="Kichiklashtirish"
            className="p-1.5 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom-Right: Center on Marker Button */}
        <button
          type="button"
          onClick={handleCenterOnMarker}
          title="Markerga qaytish"
          className="absolute bottom-2.5 right-2.5 z-10 p-2 bg-white/95 backdrop-blur-xs hover:bg-white text-slate-800 hover:text-teal-700 rounded-xl border border-slate-200 shadow-md transition-all flex items-center gap-1 text-xs font-bold"
        >
          <Navigation className="w-3.5 h-3.5 text-teal-600" />
          <span className="hidden sm:inline">Markazga olish</span>
        </button>

        {/* Bottom-Left: Live Coordinates Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-xs text-white border border-slate-700/80 text-[11px] font-mono font-bold shadow-md flex items-center gap-1.5">
          <span className="text-teal-400">📍</span>
          <span>
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
        <span>💡 Pinni maktab darvozasiga suring yoki xarita ustiga bosing</span>
        {accuracyMeters && (
          <span className="text-emerald-700 font-semibold font-mono">
            GPS aniqligi: ±{accuracyMeters}m
          </span>
        )}
      </div>
    </div>
  );
}
