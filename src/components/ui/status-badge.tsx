import React from 'react';
import { cn } from '@/lib/cn';
import {
  ScoreStatus,
  AssessmentStatus,
  CoordinateStatus,
  EvidenceStatus,
  SchoolStatus,
} from '@/types';
import { evaluateScore } from '@/lib/scoreRules';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

interface ScoreStatusBadgeProps {
  score: number;
  maxScore?: number;
  showIcon?: boolean;
  showScore?: boolean;
  className?: string;
}

export function ScoreStatusBadge({
  score,
  maxScore = 100,
  showIcon = true,
  showScore = true,
  className,
}: ScoreStatusBadgeProps) {
  const evalResult = evaluateScore(score, maxScore);

  let Icon = ShieldCheck;
  if (evalResult.status === ScoreStatus.YELLOW) Icon = AlertTriangle;
  if (evalResult.status === ScoreStatus.RED) Icon = XCircle;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
        evalResult.badgeClass,
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {showScore ? (
        <span>
          {score} ball ({evalResult.percentage}%)
        </span>
      ) : (
        <span>{evalResult.statusLabel}</span>
      )}
    </span>
  );
}

interface GenericStatusBadgeProps {
  status: AssessmentStatus | CoordinateStatus | EvidenceStatus | SchoolStatus | string;
  className?: string;
}

export function GenericStatusBadge({ status, className }: GenericStatusBadgeProps) {
  let label = status;
  let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Clock;

  switch (status) {
    case AssessmentStatus.VERIFIED:
    case CoordinateStatus.VERIFIED:
    case EvidenceStatus.APPROVED:
    case SchoolStatus.ACTIVE:
      label = status === AssessmentStatus.VERIFIED ? 'Tasdiqlangan' : 'Tasdiqlangan / Faol';
      colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      Icon = CheckCircle2;
      break;

    case AssessmentStatus.SUBMITTED:
      label = 'Tekshiruvga yuborilgan';
      colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
      Icon = Clock;
      break;

    case AssessmentStatus.IN_PROGRESS:
    case CoordinateStatus.PENDING:
    case EvidenceStatus.PENDING:
    case SchoolStatus.PENDING_VERIFICATION:
      label = 'Kutilmoqda / Jarayonda';
      colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
      Icon = Clock;
      break;

    case AssessmentStatus.REJECTED:
    case CoordinateStatus.REJECTED:
    case EvidenceStatus.REJECTED:
    case SchoolStatus.INACTIVE:
      label = 'Rad etilgan / Nofaol';
      colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
      Icon = XCircle;
      break;

    case AssessmentStatus.NOT_STARTED:
      label = 'Boshlanmagan';
      colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
      Icon = Clock;
      break;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colorClass,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </span>
  );
}
