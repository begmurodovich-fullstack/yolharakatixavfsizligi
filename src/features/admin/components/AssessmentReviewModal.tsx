'use client';

import React, { useState } from 'react';
import { Assessment, AssessmentStatus, School, Criterion, Question } from '@/types';
import { ScoreStatusBadge, GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  X,
  ClipboardCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  School as SchoolIcon,
  Calendar,
} from 'lucide-react';

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
  criteria,
  questions,
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

        {/* Score and Status Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
              Umumiy Ball:
            </div>
            <div className="text-2xl font-black text-teal-950 font-mono">
              {assessment.score} <span className="text-xs font-normal text-teal-700">/ {assessment.maxScore}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Muvofiqlik:
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {assessment.percentage}%
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Holat:
            </div>
            <div className="pt-0.5">
              <GenericStatusBadge status={assessment.status} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Xavfsizlik:
            </div>
            <div className="pt-0.5">
              <ScoreStatusBadge score={assessment.score} showScore={false} />
            </div>
          </div>
        </div>

        {/* Criteria Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Mezonlar bo‘yicha to‘plangan ballar:
          </h3>

          <div className="space-y-2">
            {criteria.map((c) => {
              const critQuestions = questions.filter((q) => q.criterionId === c.id);
              let critEarned = 0;
              let critMax = 0;

              critQuestions.forEach((q) => {
                critMax += q.points;
                const ans = assessment.answers?.[q.id];
                critEarned += ans?.pointsAwarded || 0;
              });

              return (
                <div
                  key={c.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
                >
                  <div className="font-semibold text-slate-800">{c.title}</div>
                  <div className="font-mono font-bold text-slate-900">
                    {critEarned} / {critMax} ball
                  </div>
                </div>
              );
            })}
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
