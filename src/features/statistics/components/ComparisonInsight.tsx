'use client';

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

import { normalizeScore } from '@/lib/scoreRules';

interface ComparisonInsightProps {
  schoolScore: number;
  districtAverage: number;
}

export function ComparisonInsight({
  schoolScore,
  districtAverage,
}: ComparisonInsightProps) {
  const normSchool = normalizeScore(schoolScore);
  const normDistrict = normalizeScore(districtAverage);
  const diff = Number((normSchool - normDistrict).toFixed(1));
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
                <span className="text-teal-300 font-extrabold font-mono">+{diff.toFixed(1)} ball</span> yuqori natijaga ega.
              </>
            ) : (
              <>
                Sizning maktabingiz tuman o‘rtacha ko‘rsatkichidan{' '}
                <span className="text-amber-300 font-extrabold font-mono">{diff.toFixed(1)} ball</span> pastroq natijaga ega.
              </>
            )}
          </h2>

          {normSchool < 3.0 ? (
            <p className="text-xs text-slate-300 leading-relaxed">
              BMT va iRAP tavsiyasiga ko‘ra, maktab hududi xavfsizlik darajasi kamida <strong className="text-white font-semibold">3 Yulduz (≥3.0 ball)</strong> bo‘lishi lozim. 40 ta parametr tahlili asosida tezlikni cheklash va xavfsiz piyodalar o‘tish joyini tashkil etish talab etiladi.
            </p>
          ) : (
            <p className="text-xs text-slate-300 leading-relaxed">
              Maktab atrofi xavfsizlik ko‘rsatkichi BMT va iRAP xalqaro standartining <strong className="text-white font-semibold">xavfsiz ta’lim hududi talablariga (≥3⭐)</strong> to‘liq muvofiq keladi.
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
