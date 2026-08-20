'use client';

import React from 'react';
import Link from 'next/link';
import { Assessment, School, AssessmentPeriod } from '@/types';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Calendar,
  Camera,
  ShieldCheck,
  LayoutDashboard,
  RotateCcw,
  FileCheck2,
} from 'lucide-react';

interface AssessmentSuccessStateProps {
  assessment: Assessment;
  school: School;
  currentPeriod: AssessmentPeriod | null;
  onReviewAnswers: () => void;
}

export function AssessmentSuccessState({
  assessment,
  school,
  currentPeriod,
  onReviewAnswers,
}: AssessmentSuccessStateProps) {
  const submissionDate = assessment.submittedAt
    ? new Date(assessment.submittedAt).toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleDateString('uz-UZ');

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-8">
      {/* Icon Badge */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md">
        <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
      </div>

      {/* Main Heading */}
      <div className="space-y-2 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Monitoring Muvaffaqiyatli Yuborildi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {school.name} baholash anketasi qabul qilindi!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Siz kiritgan 8 ta xavfsizlik mezoni ko‘rsatkichlari va tasdiqlovchi foto-dalillar
          mas’ul ekspertlar tekshiruviga yuborildi.
        </p>
      </div>

      {/* Summary Card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <span className="text-slate-500">Monitoring Davri:</span>
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>{currentPeriod?.name || '2025-2026 Bahorgi monitoring'}</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-slate-500">Yuborilgan vaqt:</span>
          <div className="font-bold text-slate-900 font-mono">
            {submissionDate}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-slate-500">To‘plangan dastlabki ball:</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-slate-900 font-mono">
              {assessment.score} / 100
            </span>
            <ScoreStatusBadge score={assessment.score} />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-slate-500">Yuklangan foto-dalillar:</span>
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-teal-600" />
            <span>{assessment.evidence?.length || 4} ta rasm tasdiqlash uchun tayyor</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link href="/school">
          <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-bold gap-2 text-xs h-11 px-6 shadow-xs">
            <LayoutDashboard className="w-4 h-4" />
            <span>Boshqaruv paneliga qaytish</span>
          </Button>
        </Link>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onReviewAnswers}
          className="font-bold gap-2 text-xs h-11 px-6 border-slate-300"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Javoblarni ko‘rib chiqish</span>
        </Button>
      </div>
    </div>
  );
}
