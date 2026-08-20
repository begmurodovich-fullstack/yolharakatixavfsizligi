'use client';

import React from 'react';
import Link from 'next/link';
import { AssessmentPeriod, School } from '@/types';
import { Progress } from '@/components/ui/progress';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import {
  ClipboardCheck,
  Calendar,
  Camera,
  School as SchoolIcon,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssessmentHeaderProps {
  school: School;
  currentPeriod: AssessmentPeriod | null;
  answeredCount: number;
  totalQuestions: number;
  uploadedEvidenceCount: number;
  requiredEvidenceCount: number;
  currentScore: number;
}

export function AssessmentHeader({
  school,
  currentPeriod,
  answeredCount,
  totalQuestions,
  uploadedEvidenceCount,
  requiredEvidenceCount,
  currentScore,
}: AssessmentHeaderProps) {
  const percentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      {/* Top Bar: Back button, Period & School Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/school">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs text-slate-700 hover:text-slate-900 border-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Bosh sahifaga</span>
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <SchoolIcon className="w-3.5 h-3.5 text-teal-600" />
              <span className="font-semibold text-slate-900">{school.name}</span>
              <span>•</span>
              <span>{school.districtName}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Yo‘l Xavfsizligi O‘z-o‘zini Baholash Anketasi
            </h1>
          </div>
        </div>

        {/* Current Period & Live Score */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          {currentPeriod && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-[11px]">
              <Calendar className="w-3 h-3 text-teal-400" />
              <span>{currentPeriod.name}</span>
            </span>
          )}
          <ScoreStatusBadge score={currentScore} showScore={true} />
        </div>
      </div>

      {/* Progress & Stat Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Progress Bar Column */}
        <div className="sm:col-span-7 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              Umumiy to‘ldirilish jarayoni:
            </span>
            <span className="font-mono font-bold text-teal-700">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        {/* Stats Column */}
        <div className="sm:col-span-5 flex items-center justify-between sm:justify-end gap-6 text-xs border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-6">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <div className="font-bold text-slate-900 font-mono">
                {answeredCount} / {totalQuestions}
              </div>
              <div className="text-[10px] text-slate-400">Javoblangan</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <div className="font-bold text-slate-900 font-mono">
                {uploadedEvidenceCount} / {requiredEvidenceCount}
              </div>
              <div className="text-[10px] text-slate-400">Foto-dalillar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
