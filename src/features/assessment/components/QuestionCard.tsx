'use client';

import React from 'react';
import { Question, Criterion, AssessmentAnswer, QuestionOption } from '@/types';
import { Camera, Check, Award } from 'lucide-react';
import { cn } from '@/lib/cn';

interface QuestionCardProps {
  question: Question;
  criterion: Criterion | undefined;
  criterionIndex: number;
  totalCriteria: number;
  questionIndex: number;
  totalQuestions: number;
  currentAnswer: AssessmentAnswer | undefined;
  onSelectOption: (questionId: string, option: QuestionOption) => void;
}

export function QuestionCard({
  question,
  criterion,
  criterionIndex,
  totalCriteria,
  questionIndex,
  totalQuestions,
  currentAnswer,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
      {/* Criterion Context Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold uppercase font-mono">
            Mezon {criterionIndex} / {totalCriteria}
          </span>
          <span className="text-xs font-bold text-slate-800">
            {criterion?.title || 'Yo‘l xavfsizligi mezoni'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono font-bold text-slate-500">
            Savol {questionIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Question Text and Points */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
            {question.text}
          </h2>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold font-mono shrink-0 w-fit">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Maksimal ball: {question.points}</span>
          </span>
        </div>

        {question.description && (
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {question.description}
          </p>
        )}

        {question.requiresEvidence && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-teal-600" />
            <span>Ushbu savol bo‘yicha foto-dalil talab qilinadi</span>
          </div>
        )}
      </div>

      {/* Answer Options Radio Cards */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Javob variantini tanlang:
        </div>

        <div className="grid grid-cols-1 gap-3">
          {question.options.map((opt) => {
            const isSelected = currentAnswer?.selectedOptionId === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOption(question.id, opt)}
                className={cn(
                  'w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 group focus:outline-none focus:ring-2 focus:ring-slate-900',
                  isSelected
                    ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                    : 'border-slate-200 bg-slate-50/40 hover:bg-white hover:border-slate-300 hover:shadow-2xs'
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border transition-all shrink-0',
                      isSelected
                        ? 'border-teal-700 bg-teal-700 text-white'
                        : 'border-slate-300 bg-white group-hover:border-slate-400'
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>

                  <span
                    className={cn(
                      'text-xs sm:text-sm leading-snug',
                      isSelected ? 'font-bold text-teal-950' : 'font-medium text-slate-800'
                    )}
                  >
                    {opt.label}
                  </span>
                </div>

                <span
                  className={cn(
                    'text-xs font-mono font-bold px-2.5 py-1 rounded-md border shrink-0',
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-700'
                      : 'bg-white text-slate-700 border-slate-200'
                  )}
                >
                  +{opt.points} ball
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
