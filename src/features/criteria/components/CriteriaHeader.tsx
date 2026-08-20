'use client';

import React from 'react';
import { AssessmentPeriod, School } from '@/types';
import { BookOpen, Calendar, School as SchoolIcon, ShieldCheck, Award } from 'lucide-react';
import { ScoreStatusBadge } from '@/components/ui/status-badge';

interface CriteriaHeaderProps {
  school: School;
  currentPeriod: AssessmentPeriod | null;
  totalCriteria: number;
  totalQuestions: number;
  schoolScore: number;
}

export function CriteriaHeader({
  school,
  currentPeriod,
  totalCriteria,
  totalQuestions,
  schoolScore,
}: CriteriaHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <SchoolIcon className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-semibold text-slate-800">{school.name}</span>
            <span>•</span>
            <span>{school.districtName}</span>
            <span>•</span>
            <span>{school.regionName}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Davlat Yo‘l Xavfsizligi Standarti Mezonlari
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Umumta’lim maktablari atrofidagi xavfsizlik holatini baholash uchun tasdiqlangan
            8 ta milliy standart mezoni va savollar rubrikasi.
          </p>
        </div>

        {currentPeriod && (
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-mono text-xs w-fit">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              <span>{currentPeriod.name}</span>
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Maktab ko‘rsatkichi:</span>
              <ScoreStatusBadge score={schoolScore} showScore={true} />
            </div>
          </div>
        )}
      </div>

      {/* Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-teal-50 text-teal-700 font-bold font-mono">
            08
          </div>
          <div>
            <div className="font-bold text-slate-900">8 ta Mezon</div>
            <div className="text-[11px] text-slate-500">Standart yo‘nalishlar</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-700 font-bold font-mono">
            {totalQuestions}
          </div>
          <div>
            <div className="font-bold text-slate-900">{totalQuestions} ta Savol</div>
            <div className="text-[11px] text-slate-500">Batafsil tekshiruv</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-700 font-bold font-mono">
            100
          </div>
          <div>
            <div className="font-bold text-slate-900">100 Maksimal Ball</div>
            <div className="text-[11px] text-slate-500">Umumiy reyting shkalasi</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 font-bold font-mono">
            &ge;80
          </div>
          <div>
            <div className="font-bold text-slate-900">&ge;80% Talabi</div>
            <div className="text-[11px] text-slate-500">Xavfsiz daraja standarti</div>
          </div>
        </div>
      </div>
    </div>
  );
}
