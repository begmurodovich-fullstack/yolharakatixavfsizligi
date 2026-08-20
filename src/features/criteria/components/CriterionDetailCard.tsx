'use client';

import React, { useState } from 'react';
import { Criterion, Question, AssessmentAnswer } from '@/types';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Progress } from '@/components/ui/progress';
import {
  ShieldAlert,
  Footprints,
  Gauge,
  Fence,
  Route,
  Car,
  Users,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Camera,
  Award,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert,
  Footprints,
  Gauge,
  Fence,
  Route,
  Car,
  Users,
  GraduationCap,
};

interface CriterionDetailCardProps {
  criterion: Criterion;
  questions: Question[];
  earnedScore: number;
  maxScore: number;
  percentage: number;
  schoolAnswers: Record<string, AssessmentAnswer>;
  defaultExpanded?: boolean;
}

export function CriterionDetailCard({
  criterion,
  questions,
  earnedScore,
  maxScore,
  percentage,
  schoolAnswers,
  defaultExpanded = false,
}: CriterionDetailCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const Icon = ICON_MAP[criterion.icon] || ShieldAlert;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all hover:border-slate-300">
      {/* Header / Summary Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 sm:p-7 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-start gap-4 min-w-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 border border-teal-100 shrink-0 mt-0.5 shadow-2xs">
            <Icon className="h-6 w-6" />
          </div>

          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400">
                Mezon #{criterion.order || 1}
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                {criterion.title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl line-clamp-2">
              {criterion.description}
            </p>
          </div>
        </div>

        {/* Right Score & Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
          <div className="text-right space-y-1.5">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-sm sm:text-base font-black font-mono text-slate-900">
                {earnedScore} <span className="text-xs font-normal text-slate-400">/ {maxScore} ball</span>
              </span>
              <ScoreStatusBadge score={percentage} showScore={false} className="text-[10px] py-0 px-2" />
            </div>
            <div className="w-28 sm:w-36 ml-auto">
              <Progress value={percentage} showColorByScore className="h-1.5" />
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Questions Accordion */}
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/60 p-6 sm:p-7 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-1">
            <span>Ushbu mezon bo‘yicha savollar va baholash rubrikasi ({questions.length} ta):</span>
            <span className="text-xs text-slate-400 font-mono">
              Maksimal ball: {maxScore}
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, qIdx) => {
              const answer = schoolAnswers[q.id];

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-3.5 shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                          Savol {qIdx + 1}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                          {q.text}
                        </h3>
                      </div>
                      {q.description && (
                        <p className="text-xs text-slate-500 pl-1 leading-relaxed">
                          {q.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                      {q.requiresEvidence && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          <Camera className="w-3 h-3 text-amber-600" />
                          <span>Foto talab qilinadi</span>
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        <Award className="w-3 h-3 text-slate-500" />
                        <span>Maks: {q.points} ball</span>
                      </span>
                    </div>
                  </div>

                  {/* Options Rubric */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
                    {q.options.map((opt) => {
                      const isSelected = answer?.selectedOptionId === opt.id;

                      return (
                        <div
                          key={opt.id}
                          className={cn(
                            'p-3 rounded-xl border text-xs flex flex-col justify-between gap-1.5 transition-all',
                            isSelected
                              ? 'border-teal-500 bg-teal-50/60 shadow-2xs'
                              : 'border-slate-200 bg-slate-50/50 text-slate-600'
                          )}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className={cn('font-semibold', isSelected ? 'text-teal-950 font-bold' : 'text-slate-700')}>
                              {opt.label}
                            </span>
                            {isSelected && (
                              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            )}
                          </div>
                          <span className={cn('font-mono font-bold text-[11px] self-end', isSelected ? 'text-teal-700' : 'text-slate-500')}>
                            +{opt.points} ball
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
