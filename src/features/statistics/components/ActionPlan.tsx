'use client';

import React from 'react';
import { CriterionScoreInfo } from '@/features/dashboard/components';
import { ListChecks } from 'lucide-react';

interface ActionPlanProps {
  criterionScores: CriterionScoreInfo[];
}

export function ActionPlan({ criterionScores }: ActionPlanProps) {
  // Sort ascending to target weak criteria
  const sortedAsc = [...criterionScores].sort((a, b) => a.percentage - b.percentage);
  const focusCriteria = sortedAsc.slice(0, 3);

  const planItems = focusCriteria.map((item) => {
    let priority: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
    let problem = `${item.criterion.title} bo‘yicha talablar ${item.percentage}% bajarilgan.`;
    let recommendation = `Hududiy YHXX va tuman obodonlashtirish bo‘limi bilan birgalikda standart talablariga moslashtirish lozim.`;

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
