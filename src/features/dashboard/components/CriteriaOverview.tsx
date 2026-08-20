'use client';

import React from 'react';
import { Criterion } from '@/types';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Progress } from '@/components/ui/progress';
import {
  ShieldAlert,
  Footprints,
  Gauge,
  Fence,
  Route,
  Car,
  Users,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert,
  Footprints,
  Gauge,
  Fence,
  Route,
  Car,
  Users,
  GraduationCap,
};

export interface CriterionScoreInfo {
  criterion: Criterion;
  earnedScore: number;
  maxScore: number;
  percentage: number;
}

interface CriteriaOverviewProps {
  criterionScores: CriterionScoreInfo[];
}

export function CriteriaOverview({ criterionScores }: CriteriaOverviewProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Yo‘l Xavfsizligi Mezonlari Ko‘rsatkichlari
            </h2>
            <p className="text-xs text-slate-500">
              Davlat standarti bo‘yicha 8 ta yo‘nalishdagi natijalar
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 w-fit">
          Jami: 8 ta mezon
        </span>
      </div>

      {/* Grid of Criteria */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {criterionScores.map((item, idx) => {
          const Icon = ICON_MAP[item.criterion.icon] || ShieldAlert;

          return (
            <div
              key={item.criterion.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between hover:bg-white hover:border-teal-500 hover:shadow-xs transition-all space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    #{idx + 1}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  {item.criterion.title}
                </h3>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-extrabold text-slate-900 font-mono">
                    {item.earnedScore} <span className="text-[11px] text-slate-400 font-normal">/ {item.maxScore}</span>
                  </span>
                  <ScoreStatusBadge score={item.percentage} showScore={false} className="text-[10px] py-0 px-2" />
                </div>

                <Progress value={item.percentage} showColorByScore className="h-1.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
