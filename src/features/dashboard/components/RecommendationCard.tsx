import React from 'react';
import { CriterionScoreInfo } from './CriteriaOverview';
import { Lightbulb, AlertCircle, CheckCircle2, ShieldAlert, ArrowUpRight, Wrench } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { getCountermeasureByScore } from '@/data/sr4sCountermeasures';

interface RecommendationCardProps {
  criterionScores: CriterionScoreInfo[];
  schoolScore?: number;
  hasMissingEvidence?: boolean;
}

export function RecommendationCard({ criterionScores, schoolScore, hasMissingEvidence }: RecommendationCardProps) {
  const hasAnyAssessed = criterionScores.some((c) => c.earnedScore > 0);
  const cm = schoolScore !== undefined ? getCountermeasureByScore(schoolScore) : null;

  const recommendations: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    actionText: string;
  }> = [];

  if (!hasAnyAssessed) {
    recommendations.push({
      id: 'rec-start',
      title: 'Maktab yo‘l harakati xavfsizligi monitoringini boshlang',
      description: 'Maktab atrofidagi piyodalar o‘tish joyi, yo‘l belgilari va trotuarlar holati bo‘yicha 7 ta asosiy mezon parametrlariga javob bering.',
      severity: 'LOW',
      actionText: 'Baholashni boshlash',
    });
  } else {
    // Generate recommendations dynamically from weakest criteria
    const sortedAsc = [...criterionScores].sort((a, b) => a.percentage - b.percentage);

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

      {/* Primary SR4S Countermeasure Proposal */}
      {cm && (
        <div className={cn('p-5 rounded-2xl border space-y-3.5', cm.borderClass, cm.bgClass)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-200/70 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{cm.starIcon}</span>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {cm.title}: {cm.riskLevel}
                </h3>
                <span className="text-[11px] text-slate-500">
                  SR4S Metodologiyasi bo‘yicha majburiy qarshi chora-tadbirlar rejasi
                </span>
              </div>
            </div>
            <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-bold border self-start sm:self-center', cm.badgeClass)}>
              {cm.badgeLabel}
            </span>
          </div>

          <p className="text-xs font-semibold text-slate-900 italic leading-relaxed">
            &quot;{cm.planText}&quot;
          </p>

          <ol className="space-y-1.5 text-xs text-slate-800 font-medium">
            {cm.actionItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="font-mono font-bold text-teal-800 bg-white px-1.5 py-0.2 rounded border border-slate-200 shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>

          {cm.riskFactors.length > 0 && (schoolScore ?? 0) < 75 && (
            <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-700">
              <span className="font-bold text-slate-900">Aniqlangan Infratuzilma Holati (Risk Omillari): </span>
              <span>{cm.riskFactors.join(' ')}</span>
            </div>
          )}
        </div>
      )}

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
