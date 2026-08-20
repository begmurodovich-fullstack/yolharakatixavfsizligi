'use client';

import React from 'react';
import { School } from '@/types';
import { ScoreStatusBadge, GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  X,
  School as SchoolIcon,
  UserCheck,
  Users,
  MapPin,
  Compass,
  Trophy,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface SchoolDetailModalProps {
  school: School | null;
  onClose: () => void;
  onResetPassword: (schoolId: string) => Promise<void>;
  onToggleStatus: (schoolId: string) => Promise<void>;
}

export function SchoolDetailModal({
  school,
  onClose,
  onResetPassword,
  onToggleStatus,
}: SchoolDetailModalProps) {
  if (!school) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Dialog Body */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-150 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
              <SchoolIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {school.name}
              </h2>
              <p className="text-xs text-slate-500">
                {school.districtName}, {school.regionName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scores & Status Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Joriy Ball:</div>
            <div className="text-xl font-black text-slate-900 font-mono">
              {school.currentScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Xavfsizlik Holati:</div>
            <div className="pt-0.5">
              <ScoreStatusBadge score={school.currentScore} showScore={false} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Geolokatsiya:</div>
            <div className="pt-0.5">
              <GenericStatusBadge status={school.coordinateStatus} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Faollik:</div>
            <div className="font-bold text-slate-900">
              {school.status === 'ACTIVE' ? '🟢 Faol' : '🔴 Nofaol'}
            </div>
          </div>
        </div>

        {/* Responsible Person & School Info */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 space-y-3 text-xs">
          <div className="font-bold text-slate-900 border-b border-slate-200/60 pb-2">
            Muassasa va Mas’ul Shaxs Tafsilotlari:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" />
              <span>Direktor: <strong className="text-slate-900">{school.directorName}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <span>O‘quvchilar: <strong className="text-slate-900">{school.studentCount} nafar</strong></span>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>Koordinatalar: {school.coordinates.latitude.toFixed(4)}, {school.coordinates.longitude.toFixed(4)}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span className="truncate">Mo‘ljal: {school.coordinates.addressNotes || 'Belgilanmagan'}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onResetPassword(school.id)}
              className="text-xs font-semibold rounded-xl border-slate-200 w-full sm:w-auto"
            >
              Parolni tiklash
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onToggleStatus(school.id)}
              className={`text-xs font-semibold rounded-xl w-full sm:w-auto ${
                school.status === 'ACTIVE'
                  ? 'border-rose-200 text-rose-700 hover:bg-rose-50'
                  : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {school.status === 'ACTIVE' ? 'Bloklash' : 'Faollashtirish'}
            </Button>
          </div>

          <Button
            type="button"
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl px-5 w-full sm:w-auto"
          >
            Yopish
          </Button>
        </div>
      </div>
    </div>
  );
}
