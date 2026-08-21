'use client';

import React from 'react';
import { RankingEntry, RankingScope } from '@/types';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { MapPin, School as SchoolIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface RankingTableProps {
  entries: RankingEntry[];
  currentSchoolId: string;
  scope: RankingScope;
}

export function RankingTable({ entries, currentSchoolId, scope }: RankingTableProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
        Qidiruv va filtrlar bo‘yicha hech qanday maktab topilmadi.
      </div>
    );
  }

  const getRankBadge = (rank: number, score: number) => {
    if (score === 0) {
      return (
        <span className="inline-flex items-center justify-center h-7 px-2 rounded-lg bg-slate-100 text-slate-500 border border-slate-200 font-mono text-[11px]">
          -
        </span>
      );
    }
    if (rank === 1) {
      return (
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 font-mono font-black text-xs shadow-2xs">
          #1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-slate-200 text-slate-800 border border-slate-300 font-mono font-black text-xs shadow-2xs">
          #2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-amber-700/10 text-amber-900 border border-amber-300 font-mono font-black text-xs shadow-2xs">
          #3
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 font-mono font-bold text-xs">
        #{rank}
      </span>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-4 px-5 w-24 text-center">O‘rin</th>
              <th className="py-4 px-5">Maktab nomi</th>
              <th className="py-4 px-5">Hudud</th>
              <th className="py-4 px-5 text-right">Ball</th>
              <th className="py-4 px-5 text-center w-36">Holat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((entry) => {
              const isCurrentSchool = entry.entityId === currentSchoolId;
              const isAssessed = entry.score > 0;

              return (
                <tr
                  key={entry.entityId}
                  className={cn(
                    'transition-colors',
                    isCurrentSchool
                      ? 'bg-teal-50/70 hover:bg-teal-50 border-l-4 border-l-teal-700 font-semibold'
                      : 'hover:bg-slate-50/70'
                  )}
                >
                  {/* Rank Column */}
                  <td className="py-4 px-5 text-center">
                    <div className="flex flex-col items-center justify-center">
                      {getRankBadge(entry.rank, entry.score)}
                    </div>
                  </td>

                  {/* School Name & Current Indicator */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-2 rounded-xl shrink-0',
                          isCurrentSchool
                            ? 'bg-teal-700 text-white'
                            : 'bg-slate-100 text-slate-500'
                        )}
                      >
                        <SchoolIcon className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              'text-xs sm:text-sm',
                              isCurrentSchool
                                ? 'font-black text-teal-950'
                                : 'font-semibold text-slate-900'
                            )}
                          >
                            {entry.entityName}
                          </span>

                          {isCurrentSchool && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-teal-800 text-white shadow-2xs">
                              Sizning maktabingiz
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Region / District */}
                  <td className="py-4 px-5 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {entry.districtName ? `${entry.districtName}, ` : ''}
                        {entry.regionName}
                      </span>
                    </div>
                  </td>

                  {/* Score */}
                  <td className="py-4 px-5 text-right font-mono font-bold text-slate-900">
                    {isAssessed ? `${entry.score} ball` : '0 ball'}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5 text-center">
                    {isAssessed ? (
                      <ScoreStatusBadge score={entry.score} />
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        Baholanmagan
                      </span>
                    )}
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
