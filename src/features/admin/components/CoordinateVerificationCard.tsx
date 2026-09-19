'use client';

import React from 'react';
import { School, CoordinateStatus } from '@/types';
import { GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Check,
  X,
  Compass,
  School as SchoolIcon,
  Navigation,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface CoordinateVerificationCardProps {
  school: School;
  isSelected: boolean;
  onToggleSelect: (schoolId: string) => void;
  onVerify: (schoolId: string) => Promise<void>;
  onReject: (schoolId: string) => Promise<void>;
}

export function CoordinateVerificationCard({
  school,
  isSelected,
  onToggleSelect,
  onVerify,
  onReject,
}: CoordinateVerificationCardProps) {
  const isPending = school.coordinateStatus === CoordinateStatus.PENDING;

  const lat = school.coordinates?.latitude || 40.1582;
  const lng = school.coordinates?.longitude || 64.9117;
  const zoom = 16;
  const n = Math.pow(2, zoom);
  const tileX = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const tileY = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  const satelliteTileUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${tileY}/${tileX}`;
  const hybridLabelUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/${zoom}/${tileY}/${tileX}`;

  return (
    <div
      className={cn(
        'rounded-2xl border bg-white shadow-xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all',
        isSelected
          ? 'border-teal-500 ring-2 ring-teal-500/30 shadow-teal-100'
          : 'border-slate-200'
      )}
    >
      {/* Top: Satellite Preview + Checkbox */}
      <div className="relative h-48 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Real Satellite Tiles */}
        <img
          src={satelliteTileUrl}
          alt={`Sun'iy yo'ldosh: ${school.name}`}
          className="absolute inset-0 w-full h-full object-cover brightness-95 filter"
          loading="lazy"
        />
        <img
          src={hybridLabelUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none" />

        {/* Checkbox for bulk select */}
        <button
          type="button"
          onClick={() => onToggleSelect(school.id)}
          className={cn(
            'absolute top-3 right-3 z-20 flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all',
            isSelected
              ? 'bg-teal-500 border-teal-400 text-white'
              : 'bg-slate-900/80 border-slate-400 text-white hover:border-teal-400 backdrop-blur-xs'
          )}
        >
          {isSelected && <Check className="w-3.5 h-3.5" />}
        </button>

        {/* Center Pin */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white shadow-xl ring-4 ring-teal-500/40 border-2 border-white">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 backdrop-blur-xs text-white border border-teal-500/40 text-[10px] font-mono font-bold shadow-md">
            {lat.toFixed(6)}, {lng.toFixed(6)}
          </div>
        </div>

        <div className="absolute top-3 left-3 z-10">
          <GenericStatusBadge status={school.coordinateStatus} />
        </div>

        {/* External Map Link */}
        <a
          href={`https://maps.google.com/?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Google Xaritada ko‘rish"
          className="absolute bottom-2.5 right-2.5 z-20 px-2 py-1 bg-slate-950/85 hover:bg-slate-900 text-teal-300 text-[10px] font-bold rounded-lg border border-teal-600/40 backdrop-blur-xs shadow-md transition-colors flex items-center gap-1"
        >
          <span>Xaritada ochish ↗</span>
        </a>
      </div>

      {/* Details */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div>
            <div className="flex items-center gap-2">
              <SchoolIcon className="w-4 h-4 text-teal-600 shrink-0" />
              <h3 className="text-sm font-extrabold text-slate-900 truncate">
                {school.name}
              </h3>
            </div>
            <div className="text-xs text-slate-500 pl-6">
              {school.districtName}, {school.regionName}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-teal-600" />
                <span>Kenglik:</span>
              </span>
              <strong className="font-mono">{school.coordinates?.latitude}</strong>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-teal-600" />
                <span>Uzunlik:</span>
              </span>
              <strong className="font-mono">{school.coordinates?.longitude}</strong>
            </div>

            {school.coordinates?.addressNotes && (
              <div className="pt-1 border-t border-slate-200/60 text-[11px] text-slate-500 truncate">
                Mo&apos;ljal: {school.coordinates.addressNotes}
              </div>
            )}
          </div>
        </div>

        {/* Per-card Action Buttons (only for PENDING) */}
        {isPending && (
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400 font-mono truncate">
              {school.directorName}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onReject(school.id)}
                className="text-xs font-bold border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl h-8 px-3"
              >
                <X className="w-3.5 h-3.5" />
                <span>Rad</span>
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => onVerify(school.id)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl h-8 px-3 shadow-xs gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Tasdiqlash</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
