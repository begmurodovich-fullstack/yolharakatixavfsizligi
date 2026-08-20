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
  UserCheck,
  Navigation,
  Clock,
} from 'lucide-react';

interface CoordinateVerificationCardProps {
  school: School;
  onVerify: (schoolId: string) => Promise<void>;
  onReject: (schoolId: string) => Promise<void>;
}

export function CoordinateVerificationCard({
  school,
  onVerify,
  onReject,
}: CoordinateVerificationCardProps) {
  const isPending = school.coordinateStatus === CoordinateStatus.PENDING;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all space-y-4">
      {/* Top Map Simulator Preview */}
      <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center p-4">
        {/* Map Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Center Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg ring-4 ring-teal-500/30">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-white border border-slate-700 text-[10px] font-mono font-bold">
            {school.coordinates.latitude.toFixed(4)}, {school.coordinates.longitude.toFixed(4)}
          </div>
        </div>

        <div className="absolute top-3 left-3 z-10">
          <GenericStatusBadge status={school.coordinateStatus} />
        </div>
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
              <strong className="font-mono">{school.coordinates.latitude}</strong>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-teal-600" />
                <span>Uzunlik:</span>
              </span>
              <strong className="font-mono">{school.coordinates.longitude}</strong>
            </div>

            {school.coordinates.addressNotes && (
              <div className="pt-1 border-t border-slate-200/60 text-[11px] text-slate-500 truncate">
                Mo‘ljal: {school.coordinates.addressNotes}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400 font-mono">
            {school.directorName}
          </span>

          {isPending && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onReject(school.id)}
                className="text-xs font-bold border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl h-8.5 px-3"
              >
                <X className="w-3.5 h-3.5" />
                <span>Rad etish</span>
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => onVerify(school.id)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl h-8.5 px-3 shadow-xs gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Tasdiqlash</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
