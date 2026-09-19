'use client';

import React from 'react';
import { Assessment, School } from '@/types';
import { GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { School as SchoolIcon, MapPin, Eye, Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { OFFICIAL_SR4S_STAR_LEVELS, Sr4sStarLevel } from '@/lib/sr4sCalculation';

/** Calculate accurate SR4S star rating (1.0–5.0) */
function getStarVal(ass: Assessment): number {
  const crit = (ass as any).criterionScores;
  if (crit?.starRating) {
    const parsed = parseFloat(String(crit.starRating));
    if (!isNaN(parsed) && parsed >= 1.0 && parsed <= 5.0) return parsed;
  }
  if (ass.reviewerNotes) {
    const match = ass.reviewerNotes.match(/([\d\.]+)\s*Yulduz/i);
    if (match) {
      const parsed = parseFloat(match[1]);
      if (!isNaN(parsed) && parsed >= 1.0 && parsed <= 5.0) return parsed;
    }
  }
  const score = ass.score ?? ass.percentage ?? 0;
  if (score <= 0) return 1.0;
  const star = Math.round((score / 20) * 10) / 10;
  return Math.min(5.0, Math.max(1.0, star));
}

/** Get the SR4S level object for a given star score */
function getStarLevel(starVal: number): Sr4sStarLevel {
  if (starVal >= 4.5) {
    return OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === 5) || OFFICIAL_SR4S_STAR_LEVELS[0];
  }
  if (starVal >= 3.5) {
    return OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === 4) || OFFICIAL_SR4S_STAR_LEVELS[1];
  }
  if (starVal >= 2.5) {
    return OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === 3) || OFFICIAL_SR4S_STAR_LEVELS[2];
  }
  if (starVal >= 1.5) {
    return OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === 2) || OFFICIAL_SR4S_STAR_LEVELS[3];
  }
  return OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === 1) || OFFICIAL_SR4S_STAR_LEVELS[4];
}

/** Format date in Uzbek locale nicely (e.g. 19-sentabr, 2026, 23:15) */
function formatDateUz(dateStr?: string | null): string {
  if (!dateStr) return 'Loyiha holatida';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Loyiha holatida';
    const day = String(d.getDate()).padStart(2, '0');
    const months = [
      'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
      'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
    ];
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${monthName}, ${year} ${hours}:${minutes}`;
  } catch {
    return dateStr || 'Loyiha holatida';
  }
}

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
              <th className="py-4 px-5 text-center">SR4S Reytingi</th>
              <th className="py-4 px-5 text-center">Daraja</th>
              <th className="py-4 px-5 text-center">Holat</th>
              <th className="py-4 px-5">Topshirilgan vaqt</th>
              <th className="py-4 px-5 text-center w-28">Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assessments.map((ass) => {
              const school = schools.find((s) => s.id === ass.schoolId);
              const starVal = getStarVal(ass);
              const lvl = getStarLevel(starVal);
              const filledStars = Math.round(starVal);

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
                          {Object.keys(ass.answers || {}).length} ta parametr baholandi
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

                  {/* SR4S Star Rating */}
                  <td className="py-4 px-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              'w-4 h-4 transition-colors',
                              s <= filledStars
                                ? lvl.starFillClass
                                : 'fill-slate-200 text-slate-200'
                            )}
                          />
                        ))}
                      </div>
                      <span className={cn('text-[11px] font-black font-mono', lvl.starTextClass)}>
                        {starVal.toFixed(1)} / 5.0
                      </span>
                    </div>
                  </td>

                  {/* Daraja */}
                  <td className="py-4 px-5 text-center">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border',
                        lvl.badgeClass
                      )}
                    >
                      {lvl.starCount}★ {lvl.colorName}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5 text-center">
                    <GenericStatusBadge status={ass.status} />
                  </td>

                  {/* Date */}
                  <td className="py-4 px-5 text-slate-600 font-medium text-[11px] whitespace-nowrap">
                    {formatDateUz(ass.submittedAt)}
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
                      <span>Ko&apos;rish</span>
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
