'use client';

import React, { useState } from 'react';
import { Assessment, AssessmentStatus, School, Criterion, Question } from '@/types';
import { GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/cn';
import { SR4S_STAR_LEVELS } from '@/components/sr4s/Sr4sDemonstrator';
import {
  X,
  ClipboardCheck,
  CheckCircle2,
  School as SchoolIcon,
  Star,
} from 'lucide-react';

/** Convert percentage (0–100) → SR4S star rating (1.0–5.0) */
function pctToStar(pct: number): number {
  const star = Number((1 + (pct / 100) * 4).toFixed(1));
  return Math.min(5.0, Math.max(1.0, star));
}

function getStarLevel(pct: number) {
  const star = pctToStar(pct);
  if (star >= 5.0) return SR4S_STAR_LEVELS[4];
  if (star >= 4.0) return SR4S_STAR_LEVELS[3];
  if (star >= 3.0) return SR4S_STAR_LEVELS[2];
  if (star >= 2.0) return SR4S_STAR_LEVELS[1];
  return SR4S_STAR_LEVELS[0];
}

interface AssessmentReviewModalProps {
  assessment: Assessment | null;
  school?: School;
  criteria: Criterion[];
  questions: Question[];
  onClose: () => void;
  onVerify: (assessmentId: string, status: AssessmentStatus.VERIFIED | AssessmentStatus.REJECTED, notes: string) => Promise<void>;
}

export function AssessmentReviewModal({
  assessment,
  school,
  criteria: _criteria,
  questions: _questions,
  onClose,
  onVerify,
}: AssessmentReviewModalProps) {
  const [inspectorNotes, setInspectorNotes] = useState(assessment?.reviewerNotes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!assessment) return null;

  const isPending = assessment.status === AssessmentStatus.SUBMITTED;

  const handleAction = async (status: AssessmentStatus.VERIFIED | AssessmentStatus.REJECTED) => {
    setIsSubmitting(true);
    try {
      await onVerify(assessment.id, status, inspectorNotes);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-150 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {school?.name || 'Maktab'} Baholash Natijalari
              </h2>
              <p className="text-xs text-slate-500">
                {school?.districtName}, {school?.regionName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SR4S Star Rating Banner */}
        {(() => {
          const pct = assessment.percentage ?? 0;
          const starVal = pctToStar(pct);
          const lvl = getStarLevel(pct);
          const filledStars = Math.round(starVal);
          return (
            <div className={cn('p-5 rounded-2xl border space-y-4', lvl.cardBgClass ?? 'bg-slate-50', lvl.cardBorderClass ?? 'border-slate-200')}>
              {/* Stars Row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    SR4S Yo&apos;l Xavfsizligi Reytingi:
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          'w-7 h-7 transition-colors',
                          s <= filledStars ? lvl.starFillClass : 'fill-slate-200 text-slate-200'
                        )}
                      />
                    ))}
                    <span className={cn('ml-2 text-2xl font-black font-mono', lvl.starTextClass)}>
                      {starVal}
                    </span>
                    <span className="text-sm text-slate-400 font-mono ml-0.5">/ 5.0</span>
                  </div>
                  <p className={cn('text-xs font-bold', lvl.starTextClass)}>
                    {lvl.title}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <GenericStatusBadge status={assessment.status} />
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border',
                      lvl.badgeClass
                    )}
                  >
                    {lvl.starCount}★ {lvl.colorName}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Indeks: {pct}%
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="px-3 py-2 rounded-xl bg-slate-950/10 border border-slate-800/20 text-xs text-slate-600 italic">
                &quot;{lvl.description}&quot;
              </div>
            </div>
          );
        })()}

        {/* SR4S Parameter Answers Overview */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            SR4S Parametrlar bo&apos;yicha baholash:
          </h3>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {Object.entries(assessment.answers || {}).length > 0 ? (
              Object.entries(assessment.answers).map(([paramId, ans]: [string, any]) => (
                <div
                  key={paramId}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
                >
                  <div className="font-semibold text-slate-800 truncate max-w-[60%]">
                    {paramId.replace('attr-', 'Parametr #')}
                    {ans.optionLabel ? <span className="text-slate-400 font-normal ml-1">— {ans.optionLabel}</span> : null}
                  </div>
                  <div className="font-mono font-bold text-slate-900">
                    {ans.pointsAwarded ?? 0} / 5 ball
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-400 italic py-4 text-center">
                Parametr javoblari mavjud emas yoki yuklanmadi.
              </div>
            )}
          </div>
        </div>

        {/* Inspector Review Notes */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-semibold text-slate-700">
            Inspektor Xulosasi / Izoh:
          </label>
          <Input
            type="text"
            value={inspectorNotes}
            onChange={(e) => setInspectorNotes(e.target.value)}
            placeholder="masalan: Maktab ma’lumotlari joyiga chiqib tekshirildi, barcha mezonlar tasdiqlandi"
            className="text-xs h-10 rounded-xl"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-xs rounded-xl w-full sm:w-auto"
          >
            Yopish
          </Button>

          {isPending && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => handleAction(AssessmentStatus.REJECTED)}
                className="text-xs font-bold text-rose-700 border-rose-200 hover:bg-rose-50 rounded-xl h-9.5 px-4 w-full sm:w-auto"
              >
                Qayta ishlashga qaytarish
              </Button>

              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleAction(AssessmentStatus.VERIFIED)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl h-9.5 px-5 shadow-xs w-full sm:w-auto gap-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Natijani tasdiqlash</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
