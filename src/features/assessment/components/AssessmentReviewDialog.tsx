'use client';

import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Progress } from '@/components/ui/progress';
import {
  ClipboardCheck,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Send,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

interface AssessmentReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => Promise<void>;
  isSubmitting: boolean;
  totalQuestions: number;
  answeredCount: number;
  requiredEvidenceCount: number;
  uploadedEvidenceCount: number;
  calculatedScore: number;
  missingEvidenceQuestions: number[];
  unansweredQuestions: number[];
}

export function AssessmentReviewDialog({
  isOpen,
  onClose,
  onConfirmSubmit,
  isSubmitting,
  totalQuestions,
  answeredCount,
  requiredEvidenceCount,
  uploadedEvidenceCount,
  calculatedScore,
  missingEvidenceQuestions,
  unansweredQuestions,
}: AssessmentReviewDialogProps) {
  const isAllAnswered = answeredCount >= totalQuestions;
  const isAllEvidenceUploaded = uploadedEvidenceCount >= requiredEvidenceCount;
  const canSubmit = isAllAnswered && isAllEvidenceUploaded;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Baholashni Yakunlash va Tasdiqlash"
      description="Monitoring ma’lumotlarini yuborishdan oldin to‘ldirilganlik ko‘rsatkichlarini tekshiring."
      className="max-w-xl"
    >
      <div className="space-y-5 pt-2">
        {/* Score and Completeness Overview */}
        <div className="rounded-2xl bg-slate-900 text-white p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                Taxminiy Xavfsizlik Bali
              </div>
              <div className="text-3xl font-black mt-0.5">
                {calculatedScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
              </div>
            </div>
            <ScoreStatusBadge score={calculatedScore} />
          </div>

          <Progress value={calculatedScore} showColorByScore className="h-2" />
        </div>

        {/* Readiness Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Questions Check */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between ${
              isAllAnswered
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : 'border-rose-200 bg-rose-50 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2">
              {isAllAnswered ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="font-semibold">Savollar to‘ldirilgan:</span>
            </div>
            <span className="font-mono font-bold">
              {answeredCount} / {totalQuestions}
            </span>
          </div>

          {/* Evidence Check */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between ${
              isAllEvidenceUploaded
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : 'border-amber-200 bg-amber-50 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2">
              {isAllEvidenceUploaded ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Camera className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span className="font-semibold">Foto-dalillar:</span>
            </div>
            <span className="font-mono font-bold">
              {uploadedEvidenceCount} / {requiredEvidenceCount}
            </span>
          </div>
        </div>

        {/* Incomplete Warning Message if any */}
        {!canSubmit && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-950">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Yuborish uchun quyidagi kamchiliklarni bartaraf eting:</span>
            </div>

            <ul className="space-y-1 list-disc list-inside text-[11px] text-rose-800">
              {!isAllAnswered && (
                <li>
                  {totalQuestions - answeredCount} ta savol javobsiz qolgan (Savollar: #{unansweredQuestions.slice(0, 5).join(', ')})
                </li>
              )}
              {!isAllEvidenceUploaded && (
                <li>
                  {requiredEvidenceCount - uploadedEvidenceCount} ta majburiy foto-dalil yuklanmagan (Savollar: #{missingEvidenceQuestions.slice(0, 5).join(', ')})
                </li>
              )}
            </ul>
          </div>
        )}

        {canSubmit && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-emerald-950">Barcha ma’lumotlar to‘liq!</strong>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Yuborilgandan so‘ng baholash mas’ul inspektorlar tomonidan tekshiriladi va yakuniy ball belgilanadi.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-xs gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ortga qaytish</span>
          </Button>

          <Button
            type="button"
            onClick={onConfirmSubmit}
            disabled={!canSubmit || isSubmitting}
            className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold gap-2 shadow-xs disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Yuborilmoqda...' : 'Tasdiqlash va Yuborish'}</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
