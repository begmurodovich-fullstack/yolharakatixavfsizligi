'use client';

import React from 'react';
import { School, AssessmentPeriod } from '@/types';
import { GenericStatusBadge } from '@/components/ui/status-badge';
import { School as SchoolIcon, Calendar, MapPin, UserCheck, ShieldCheck } from 'lucide-react';

interface SchoolWelcomeCardProps {
  school: School;
  currentPeriod: AssessmentPeriod | null;
}

export function SchoolWelcomeCard({ school, currentPeriod }: SchoolWelcomeCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Identity & Hierarchy */}
        <div className="space-y-3">
          {/* Breadcrumb Hierarchy & Period Tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
              <SchoolIcon className="w-3.5 h-3.5 text-teal-600" />
              <span>{school.name}</span>
            </span>

            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium">{school.districtName}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium">{school.regionName}</span>

            {currentPeriod && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-[11px] ml-auto lg:ml-2">
                <Calendar className="w-3 h-3 text-teal-400" />
                <span>Joriy davr: {currentPeriod.name}</span>
              </span>
            )}
          </div>

          {/* Main Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {school.name} yo‘l xavfsizligi holati
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Joriy monitoring natijalari va maktabingiz xavfsizlik ko‘rsatkichlarini bir joyda kuzating.
            </p>
          </div>

          {/* Subordinate Meta Info: Director, Students, Coordinates */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-slate-400" />
              <span>Direktor: <strong className="text-slate-800 font-semibold">{school.directorName}</strong></span>
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div className="flex items-center gap-1.5">
              <span>O‘quvchilar soni: <strong className="text-slate-800 font-semibold">{school.studentCount || 0} nafar</strong></span>
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span className="font-mono text-slate-600">
                {school.coordinates.latitude.toFixed(4)}, {school.coordinates.longitude.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Coordinate Status Guarantee */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
          <div className="text-left lg:text-right">
            <div className="text-[11px] text-slate-400 font-medium">Geolokatsiya holati:</div>
            <div className="mt-1">
              <GenericStatusBadge status={school.coordinateStatus} />
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-teal-700 font-medium mt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Davlat reyestrida tasdiqlangan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
