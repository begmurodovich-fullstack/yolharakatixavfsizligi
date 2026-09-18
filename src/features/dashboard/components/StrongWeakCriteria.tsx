'use client';

import React from 'react';
import { CriterionScoreInfo } from './CriteriaOverview';
import { CheckCircle2, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Sr4sPictogram, Sr4sPictoType } from '@/components/ui/sr4s-icon';

interface StrongWeakCriteriaProps {
  criterionScores: CriterionScoreInfo[];
}

const MODULE_PICTO_MAP: Record<number, Sr4sPictoType> = {
  1: 'sidewalk',
  2: 'crossing',
  3: 'speed',
  4: 'school_zone',
  5: 'traffic_calming',
  6: 'sight_distance',
  7: 'lighting',
};

export function StrongWeakCriteria({ criterionScores }: StrongWeakCriteriaProps) {
  const hasAnyAssessed = criterionScores.some((c) => c.earnedScore > 0);

  if (!hasAnyAssessed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Kuchli va E’tibor Talab Qiladigan Sohalar Tahlili
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Maktabingiz hali o‘z-o‘zini baholashdan o‘tkazilmagan. Savollarga javob berilganidan so‘ng, ushbu bo‘limda avtomatik tahlil shakllanadi.
          </p>
        </div>
        <div className="pt-1">
          <a
            href="/school/criteria"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition-all"
          >
            <span>Baholashni boshlash</span>
          </a>
        </div>
      </div>
    );
  }

  // Sort descending for strong criteria (only >= 50%)
  const strongCriteria = [...criterionScores]
    .filter((c) => c.percentage >= 50)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  // Sort ascending for weak criteria (only < 50%)
  const weakCriteria = [...criterionScores]
    .filter((c) => c.percentage < 50)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strong Criteria Card */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-3.5 border-b border-emerald-100">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-950">Kuchli Tomonlar</h3>
            <p className="text-xs text-emerald-700">Eng yuqori ko‘rsatkichga ega mezonlar</p>
          </div>
        </div>

        <div className="space-y-3">
          {strongCriteria.length > 0 ? (
            strongCriteria.map((item) => (
              <div key={item.criterion.id} className="rounded-xl bg-white p-4 border border-emerald-100 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <Sr4sPictogram type={MODULE_PICTO_MAP[item.criterion.order ?? 1] || 'speed'} size={24} className="rounded-md shrink-0" />
                    <span className="font-bold text-slate-900 truncate">
                      {item.criterion.title}
                    </span>
                  </div>
                  <span className="font-bold text-emerald-700 font-mono shrink-0">
                    {((item.percentage / 100) * 4 + 1).toFixed(1)} ★
                  </span>
                </div>
                <Progress value={item.percentage} className="h-1.5 bg-emerald-100" />
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">Hozircha yuqori natijali mezonlar mavjud emas.</p>
          )}
        </div>
      </div>

      {/* Weak Criteria / Focus Areas Card */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-3.5 border-b border-amber-100">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-amber-950">E’tibor Talab Qiladigan Sohalar</h3>
            <p className="text-xs text-amber-700">Infratuzilmani yaxshilash zarur bo‘lgan nuqtalar</p>
          </div>
        </div>

        <div className="space-y-3">
          {weakCriteria.length > 0 ? (
            weakCriteria.map((item) => (
              <div key={item.criterion.id} className="rounded-xl bg-white p-4 border border-amber-100 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <Sr4sPictogram type={MODULE_PICTO_MAP[item.criterion.order ?? 1] || 'speed'} size={24} className="rounded-md shrink-0" />
                    <span className="font-bold text-slate-900 truncate">
                      {item.criterion.title}
                    </span>
                  </div>
                  <span className="font-bold text-amber-700 font-mono shrink-0">
                    {((item.percentage / 100) * 4 + 1).toFixed(1)} ★
                  </span>
                </div>
                <Progress value={item.percentage} showColorByScore className="h-1.5 bg-amber-100" />
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">Barcha mezonlar yaxshi holatda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
