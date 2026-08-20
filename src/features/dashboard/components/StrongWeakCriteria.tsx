'use client';

import React from 'react';
import { CriterionScoreInfo } from './CriteriaOverview';
import { CheckCircle2, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StrongWeakCriteriaProps {
  criterionScores: CriterionScoreInfo[];
}

export function StrongWeakCriteria({ criterionScores }: StrongWeakCriteriaProps) {
  // Sort descending for strong criteria
  const sortedDesc = [...criterionScores].sort((a, b) => b.percentage - a.percentage);
  const strongCriteria = sortedDesc.slice(0, 3);

  // Sort ascending for weak criteria
  const sortedAsc = [...criterionScores].sort((a, b) => a.percentage - b.percentage);
  const weakCriteria = sortedAsc.slice(0, 3);

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
          {strongCriteria.map((item) => (
            <div key={item.criterion.id} className="rounded-xl bg-white p-4 border border-emerald-100 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="font-bold text-slate-900 truncate">
                  {item.criterion.title}
                </span>
                <span className="font-bold text-emerald-700 font-mono shrink-0">
                  {item.percentage}% ({item.earnedScore}/{item.maxScore})
                </span>
              </div>
              <Progress value={item.percentage} className="h-1.5 bg-emerald-100" />
            </div>
          ))}
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
          {weakCriteria.map((item) => (
            <div key={item.criterion.id} className="rounded-xl bg-white p-4 border border-amber-100 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="font-bold text-slate-900 truncate">
                  {item.criterion.title}
                </span>
                <span className="font-bold text-amber-700 font-mono shrink-0">
                  {item.percentage}% ({item.earnedScore}/{item.maxScore})
                </span>
              </div>
              <Progress value={item.percentage} showColorByScore className="h-1.5 bg-amber-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
