'use client';

import React from 'react';
import Link from 'next/link';
import { Assessment, AssessmentStatus } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { GenericStatusBadge } from '@/components/ui/status-badge';
import {
  ClipboardCheck,
  Camera,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  FileQuestion,
} from 'lucide-react';

interface AssessmentProgressCardProps {
  assessment: Assessment | null;
  totalQuestions: number;
}

export function AssessmentProgressCard({ assessment, totalQuestions }: AssessmentProgressCardProps) {
  const questionsCount = totalQuestions > 0 ? totalQuestions : 40;
  const answersCount = assessment ? Object.keys(assessment.answers || {}).length : 0;
  const unansweredCount = Math.max(0, questionsCount - answersCount);
  const completionPercentage = questionsCount > 0 ? Math.round((answersCount / questionsCount) * 100) : 0;

  // Evidence count calculation
  const evidenceList = assessment?.evidence || [];
  const uploadedEvidenceCount = evidenceList.length;

  const isCompleted = answersCount >= questionsCount && questionsCount > 0;
  const isVerified = assessment?.status === AssessmentStatus.VERIFIED;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Baholash Jarayoni
              </h2>
              <p className="text-xs text-slate-500">
                7 ta modul va 40 ta SR4S parametri
              </p>
            </div>
          </div>

          <GenericStatusBadge status={assessment?.status || AssessmentStatus.IN_PROGRESS} />
        </div>

        {/* Progress Metrics */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {answersCount} <span className="text-sm text-slate-400 font-medium font-sans">/ {questionsCount} mezon</span>
            </div>
            <div className="text-lg font-bold font-mono text-teal-700">
              {completionPercentage}%
            </div>
          </div>

          <Progress value={completionPercentage} className="h-2" />

          {/* Quick status row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 flex items-center gap-3">
              <FileQuestion className="w-5 h-5 text-slate-500 shrink-0" />
              <div className="text-xs leading-tight">
                <div className="font-bold text-slate-900">
                  {unansweredCount === 0 && answersCount > 0
                    ? 'Barchasi to‘ldirilgan'
                    : answersCount === 0
                    ? 'Baholash boshlanmagan'
                    : `${unansweredCount} ta savol qoldi`}
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">Mezonlar holati</div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 flex items-center gap-3">
              <Camera className="w-5 h-5 text-teal-600 shrink-0" />
              <div className="text-xs leading-tight">
                <div className="font-bold text-slate-900">
                  {uploadedEvidenceCount} ta foto yuklangan
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">Dalillar holati</div>
              </div>
            </div>
          </div>

          {isVerified && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 flex items-start gap-3 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="font-semibold">Tasdiqlangan:</strong> Maktab ma’lumotlari va dalillari
                mas’ul inspektor tomonidan to‘liq tekshirildi.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 border-t border-slate-100">
        <Link href="/school/criteria" className="w-full block">
          <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold gap-2 h-10 rounded-xl shadow-xs">
            <span>Xavfsizlik mezonlarini ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
