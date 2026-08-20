'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface AssessmentNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export function AssessmentNavigation({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onComplete,
}: AssessmentNavigationProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4">
      {/* Previous Button */}
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirst}
        className="gap-1.5 text-xs font-semibold h-10 px-4 border-slate-300"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Oldingi savol</span>
      </Button>

      <span className="text-xs font-mono font-bold text-slate-500 hidden sm:inline">
        {currentIndex + 1} / {totalQuestions}
      </span>

      {/* Next or Complete Button */}
      {isLast ? (
        <Button
          type="button"
          onClick={onComplete}
          className="bg-teal-700 hover:bg-teal-800 text-white gap-2 text-xs font-bold h-10 px-6 shadow-xs"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Tugatish va Tekshirish</span>
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNext}
          className="bg-slate-900 hover:bg-slate-800 text-white gap-1.5 text-xs font-bold h-10 px-5 shadow-xs"
        >
          <span>Keyingi savol</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
