'use client';

import React from 'react';
import { CriterionScoreInfo } from '@/features/dashboard/components';
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

interface CriteriaPerformanceGridProps {
  criterionScores: CriterionScoreInfo[];
}

export function CriteriaPerformanceGrid({ criterionScores }: CriteriaPerformanceGridProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              8 Mezon Bo‘yicha Natijalar Tahlili
            </h3>
            <p className="text-xs text-slate-500">
              Har bir xavfsizlik parametri bo‘yicha to‘plangan ballar va bajarilish foizi
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
          8 ta mezon
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {criterionScores.map((item, idx) => {
          const Icon = ICON_MAP[item.criterion.icon] || ShieldAlert;

          return (
            <div
              key={item.criterion.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between hover:bg-white hover:border-teal-500 hover:shadow-xs transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    #{idx + 1}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1 line-clamp-2">
                  {item.criterion.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.criterion.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 mt-3">
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
