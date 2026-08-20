'use client';

import React from 'react';
import { Assessment, School, AssessmentStatus } from '@/types';
import { GenericStatusBadge, ScoreStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { School as SchoolIcon, MapPin, Eye, Clock, CheckCircle2 } from 'lucide-react';

interface AssessmentTableProps {
  assessments: Assessment[];
  schools: School[];
  onOpenReview: (assessment: Assessment) => void;
}

export function AssessmentTable({
  assessments,
  schools,
  onOpenReview,
}: AssessmentTableProps) {
  if (assessments.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
        Hozircha baholash arizalari mavjud emas.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-4 px-5">Maktab</th>
              <th className="py-4 px-5">Hudud</th>
              <th className="py-4 px-5 text-right">Ball</th>
              <th className="py-4 px-5 text-center">Xavfsizlik</th>
              <th className="py-4 px-5 text-center">Holat</th>
              <th className="py-4 px-5">Topshirilgan vaqt</th>
              <th className="py-4 px-5 text-center w-28">Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assessments.map((ass) => {
              const school = schools.find((s) => s.id === ass.schoolId);

              return (
                <tr key={ass.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* School */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                        <SchoolIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">
                          {school?.name || 'Maktab'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {Object.keys(ass.answers || {}).length} ta savolga javob
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Region / District */}
                  <td className="py-4 px-5 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {school?.districtName}, {school?.regionName}
                      </span>
                    </div>
                  </td>

                  {/* Score */}
                  <td className="py-4 px-5 text-right font-mono font-black text-sm text-slate-900">
                    {ass.score}
                    <span className="text-[10px] text-slate-400 font-normal ml-0.5">/ {ass.maxScore}</span>
                  </td>

                  {/* Score Status */}
                  <td className="py-4 px-5 text-center">
                    <ScoreStatusBadge score={ass.score} showScore={false} />
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5 text-center">
                    <GenericStatusBadge status={ass.status} />
                  </td>

                  {/* Date */}
                  <td className="py-4 px-5 text-slate-500 font-mono text-[11px]">
                    {ass.submittedAt ? (
                      new Date(ass.submittedAt).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    ) : (
                      'Loyiha holatida'
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-5 text-center">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onOpenReview(ass)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl h-8.5 px-3 shadow-xs gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ko‘rish</span>
                    </Button>
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
