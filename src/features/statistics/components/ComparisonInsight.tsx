'use client';

import React from 'react';
import { CriterionScoreInfo } from '@/features/dashboard/components';
import { Sparkles, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface ComparisonInsightProps {
  schoolScore: number;
  districtAverage: number;
  weakestCriterion?: CriterionScoreInfo;
}

export function ComparisonInsight({
  schoolScore,
  districtAverage,
  weakestCriterion,
}: ComparisonInsightProps) {
  const diff = schoolScore - districtAverage;
  const isAboveAverage = diff >= 0;

  return (
    <div className="rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-900 to-slate-900 text-white p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Tizimli Tahliliy Xulosa</span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
            {isAboveAverage ? (
              <>
                Sizning maktabingiz tuman o‘rtacha ko‘rsatkichidan{' '}
                <span className="text-teal-300 font-extrabold font-mono">+{diff} ball</span> yuqori natijaga ega.
              </>
            ) : (
              <>
                Sizning maktabingiz tuman o‘rtacha ko‘rsatkichidan{' '}
                <span className="text-amber-300 font-extrabold font-mono">{diff} ball</span> pastroq natijaga ega.
              </>
            )}
          </h2>

          {weakestCriterion && (
            <p className="text-xs text-slate-300 leading-relaxed">
              Natijani yaxshilash va xavfsizlik darajasini oshirish uchun asosiy imkoniyat nuqtasi:{' '}
              <strong className="text-white font-semibold">{weakestCriterion.criterion.title}</strong>{' '}
              ({weakestCriterion.percentage}% bajarilgan).
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-teal-200 font-semibold backdrop-blur-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Joriy monitoring davri</span>
          </span>
        </div>
      </div>
    </div>
  );
}
