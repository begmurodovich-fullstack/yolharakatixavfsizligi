'use client';

import React from 'react';
import { CriterionScoreInfo } from './CriteriaOverview';
import { Lightbulb, AlertCircle, CheckCircle2, ShieldAlert, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface RecommendationCardProps {
  criterionScores: CriterionScoreInfo[];
  hasMissingEvidence?: boolean;
}

export function RecommendationCard({ criterionScores, hasMissingEvidence }: RecommendationCardProps) {
  // Generate recommendations dynamically from weakest criteria
  const sortedAsc = [...criterionScores].sort((a, b) => a.percentage - b.percentage);

  const recommendations: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    actionText: string;
  }> = [];

  if (hasMissingEvidence) {
    recommendations.push({
      id: 'rec-evidence',
      title: 'Majburiy foto-dalillarni to‘ldiring',
      description: 'Ekspert tasdiqlashi uchun maktab darvozasi va piyodalar o‘tish joyining yangi fotosuratlarini yuklang.',
      severity: 'HIGH',
      actionText: 'Foto yuklash',
    });
  }

  // Iterate over weak criteria to generate recommendations
  sortedAsc.slice(0, 3).forEach((item) => {
    if (item.percentage < 60) {
      recommendations.push({
        id: `rec-${item.criterion.id}`,
        title: `${item.criterion.title} infratuzilmasini yaxshilash`,
        description: `Ko‘rsatkich ${item.percentage}% ni tashkil qilmoqda. Tuman Yo‘l Harakati Xavfsizligi xizmatiga murojaat qilish tavsiya etiladi.`,
        severity: 'HIGH',
        actionText: 'Tafsilotlar',
      });
    } else if (item.percentage < 80) {
      recommendations.push({
        id: `rec-${item.criterion.id}`,
        title: `${item.criterion.title} holatini qayta ko‘rib chiqish`,
        description: `Ko‘rsatkich ${item.percentage}% (O‘rtacha). Standart talablari bo‘yicha texnik kamchiliklarni bartaraf eting.`,
        severity: 'MEDIUM',
        actionText: 'Ko‘rib chiqish',
      });
    }
  });

  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec-maintain',
      title: 'Xavfsizlik darajasini bir maromda saqlang',
      description: 'Maktabingiz barcha mezonlar bo‘yicha a’lo darajani egallagan. Doimiy profilaktika va nazoratni davom ettiring.',
      severity: 'LOW',
      actionText: 'Monitoring',
    });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Yaxshilash Bo‘yicha Tavsiyalar
            </h2>
            <p className="text-xs text-slate-500">
              Avtomatik tahlil asosida shakllantirilgan manzilli choralar
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {recommendations.map((rec) => {
          let badgeClass = 'bg-rose-50 text-rose-800 border-rose-200';
          let badgeLabel = 'Yuqori daraja';
          if (rec.severity === 'MEDIUM') {
            badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
            badgeLabel = 'O‘rta daraja';
          } else if (rec.severity === 'LOW') {
            badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
            badgeLabel = 'Tavsiya';
          }

          return (
            <div
              key={rec.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white hover:border-teal-500 hover:shadow-xs transition-all"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border ${badgeClass}`}>
                    {badgeLabel}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {rec.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {rec.description}
                </p>
              </div>

              <Link href="/school/assessment" className="shrink-0 self-end sm:self-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-teal-700 hover:text-teal-900 hover:border-teal-300 shadow-2xs transition-all">
                  <span>{rec.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
