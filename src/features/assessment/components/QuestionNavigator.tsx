'use client';

import React from 'react';
import { Question, AssessmentAnswer, Evidence, EvidenceStatus } from '@/types';
import { Check, AlertTriangle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

interface QuestionNavigatorProps {
  questions: Question[];
  answers: Record<string, AssessmentAnswer>;
  evidenceList: Evidence[];
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
}

export function QuestionNavigator({
  questions,
  answers,
  evidenceList,
  currentIndex,
  onSelectQuestion,
}: QuestionNavigatorProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2.5 px-1">
        <span>Savollar ro‘yxati ({questions.length} ta)</span>
        <div className="flex items-center gap-3 text-[11px] font-normal text-slate-500 hidden sm:flex">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> To‘ldirilgan
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Foto kerak
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-slate-300" /> Javobsiz
          </span>
        </div>
      </div>

      {/* Horizontal Scrollable Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const ans = answers[q.id];
          const isAnswered = !!ans?.selectedOptionId;

          // Check evidence for this question
          const qEvidence = evidenceList.filter((e) => e.questionId === q.id);
          const hasRejected = qEvidence.some((e) => e.status === EvidenceStatus.REJECTED);
          const hasValidEvidence = qEvidence.some(
            (e) => e.status === EvidenceStatus.APPROVED || e.status === EvidenceStatus.PENDING
          );

          const isMissingEvidence = q.requiresEvidence && (!hasValidEvidence || hasRejected);

          let stateClasses = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300';
          let statusIcon = null;

          if (isAnswered) {
            if (isMissingEvidence) {
              stateClasses = 'border-amber-400 bg-amber-50 text-amber-900 font-bold';
              statusIcon = <AlertTriangle className="w-2.5 h-2.5 text-amber-600 absolute -top-1 -right-1" />;
            } else {
              stateClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
              statusIcon = <Check className="w-2.5 h-2.5 text-emerald-700 absolute -top-1 -right-1" />;
            }
          }

          if (isCurrent) {
            stateClasses += ' ring-2 ring-slate-900 ring-offset-1 border-slate-900 bg-slate-900 text-white';
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              aria-label={`Savol #${idx + 1}: ${isAnswered ? 'Javoblangan' : 'Javobsiz'}`}
              className={cn(
                'relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl border text-xs font-mono transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-900',
                stateClasses
              )}
            >
              <span>{idx + 1}</span>
              {statusIcon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
