'use client';

import React from 'react';
import { ComparativeAverages } from '@/services/statisticsService';
import { Progress } from '@/components/ui/progress';
import { GitCompare, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';

interface RankingComparisonProps {
  averages: ComparativeAverages | null;
  schoolName: string;
  districtName?: string;
  regionName?: string;
}

export function RankingComparison({
  averages,
  schoolName,
  districtName = 'Qiziltepa tumani',
  regionName = 'Navoiy viloyati',
}: RankingComparisonProps) {
  const schoolScore = averages?.schoolScore ?? 0;
  const districtAvg = averages?.districtAverage ?? 0;
  const regionAvg = averages?.regionAverage ?? 0;
  const republicAvg = averages?.republicAverage ?? 0;

  const comparisonItems = [
    {
      label: schoolName,
      sublabel: 'Sizning maktabingiz',
      score: schoolScore,
      isPrimary: true,
      color: '#0d9488',
    },
    {
      label: 'Tuman o‘rtachasi',
      sublabel: districtName,
      score: districtAvg,
      isPrimary: false,
      color: '#64748b',
    },
    {
      label: 'Viloyat o‘rtachasi',
      sublabel: regionName,
      score: regionAvg,
      isPrimary: false,
      color: '#64748b',
    },
    {
      label: 'Respublika o‘rtachasi',
      sublabel: 'O‘zbekiston Respublikasi',
      score: republicAvg,
      isPrimary: false,
      color: '#64748b',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Qiyosiy Taqqoslash
            </h2>
            <p className="text-xs text-slate-500">
              Maktab bali va hududiy o‘rtacha ko‘rsatkichlar
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
          Joriy davr
        </span>
      </div>

      <div className="space-y-4">
        {comparisonItems.map((item) => (
          <div
            key={item.label}
            className={`p-3.5 rounded-xl border transition-all ${
              item.isPrimary
                ? 'border-teal-300 bg-teal-50/40 shadow-2xs'
                : 'border-slate-100 bg-slate-50/50'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <div>
                <span className={`font-bold ${item.isPrimary ? 'text-teal-950 text-sm' : 'text-slate-800'}`}>
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-400 block">{item.sublabel}</span>
              </div>
              <div className="text-right">
                <span className={`font-extrabold font-mono ${item.isPrimary ? 'text-teal-700 text-base' : 'text-slate-700'}`}>
                  {item.score > 0 ? `${((item.score / 100) * 4 + 1).toFixed(1)} ★` : '0 (Baholanmagan)'}
                </span>
                <span className="text-[10px] text-slate-400 block">{item.score > 0 ? '5 yulduzli' : 'Kutilmoqda'}</span>
              </div>
            </div>

            <Progress
              value={item.score}
              className={`h-2 ${item.isPrimary ? 'bg-teal-100' : 'bg-slate-200'}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-700 font-medium">
        <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
        <span>
          {schoolScore > 0 ? (
            <>
              Maktabingiz ko‘rsatkichi: <strong>{((schoolScore / 100) * 4 + 1).toFixed(1)} ★</strong>.
            </>
          ) : (
            'Maktabingiz hali o‘z-o‘zini baholashdan o‘tkazilmagan (Baholash kutilmoqda).'
          )}
        </span>
      </div>
    </div>
  );
}
