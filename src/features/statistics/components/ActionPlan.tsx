import React from 'react';
import { CriterionScoreInfo } from '@/features/dashboard/components';
import { ListChecks, AlertTriangle, ShieldAlert, Wrench, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { getCountermeasureByScore } from '@/data/sr4sCountermeasures';

interface ActionPlanProps {
  criterionScores: CriterionScoreInfo[];
  schoolScore?: number;
}

export function ActionPlan({ criterionScores, schoolScore }: ActionPlanProps) {
  const cm = schoolScore !== undefined ? getCountermeasureByScore(schoolScore) : null;
  // Sort ascending to target weak criteria
  const sortedAsc = [...criterionScores].sort((a, b) => a.percentage - b.percentage);
  const focusCriteria = sortedAsc.slice(0, 3);

  const planItems = focusCriteria.map((item) => {
    let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
    let problem = `${item.criterion.title} bo‘yicha talablar ${item.percentage}% bajarilgan.`;
    let recommendation = `Hududiy mas’ul inspeksiya va tuman obodonlashtirish bo‘limi bilan birgalikda standart talablariga moslashtirish lozim.`;

    if (item.percentage < 60) {
      priority = 'HIGH';
      problem = `Xavfsizlik darajasi past (${item.percentage}%). Maktab atrofida xavfli nuqtalar mavjud.`;
      recommendation = `Shoshilinch ravishda tuman komissiyasiga murojaat qilish va infratuzilmani yangilash talab etiladi.`;
    } else if (item.percentage >= 80) {
      priority = 'LOW';
      problem = `Ko‘rsatkich qoniqarli (${item.percentage}%).`;
      recommendation = `Mavjud holatni muntazam saqlab turish va o‘quvchilar bilan profilaktika ishlarini davom ettirish.`;
    }

    return {
      id: item.criterion.id,
      title: item.criterion.title,
      score: `${item.earnedScore}/${item.maxScore} ball (${item.percentage}%)`,
      problem,
      recommendation,
      priority,
    };
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <ListChecks className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Amaliy Harakatlar Rejasi (Action Plan)
            </h3>
            <p className="text-xs text-slate-500">
              Zaif ko‘rsatkichlarni bartaraf etish va xavfsizlik darajasini oshirish bo‘yicha tavsiyalar
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
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {cm.title}: {cm.riskLevel}
                </h4>
                <span className="text-[11px] text-slate-500">
                  SR4S Piyodalar Xavfi Modeli Qarshi Chora-Tadbirlar Rejasi
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

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-5">Yo‘nalish / Mezon</th>
              <th className="py-3.5 px-5">Aniqlangan Muammo</th>
              <th className="py-3.5 px-5">Tavsiya etilgan Chora</th>
              <th className="py-3.5 px-5 text-center w-28">Ustuvorlik</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {planItems.map((item) => {
              let badgeClass = 'bg-rose-50 text-rose-800 border-rose-200';
              let badgeLabel = 'Yuqori';
              if (item.priority === 'MEDIUM') {
                badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
                badgeLabel = 'O‘rta';
              } else if (item.priority === 'LOW') {
                badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                badgeLabel = 'Rejali';
              }

              return (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    <div>{item.title}</div>
                    <span className="text-[11px] text-slate-400 font-mono font-normal">
                      {item.score}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-700 max-w-xs leading-relaxed">
                    {item.problem}
                  </td>
                  <td className="py-4 px-5 text-slate-600 max-w-sm leading-relaxed">
                    {item.recommendation}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase border ${badgeClass}`}>
                      {badgeLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
