import React from 'react';
import { cn } from '@/lib/cn';
import {
  ScoreStatus,
  AssessmentStatus,
  CoordinateStatus,
  EvidenceStatus,
  SchoolStatus,
} from '@/types';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck, Star } from 'lucide-react';
import { Sr4sGoldStars } from '@/components/ui/sr4s-icon';
import { getStarColorInfo } from '@/lib/scoreRules';

export function getStarRating(score: number): {
  stars: number;
  label: string;
  badgeClass: string;
  darkBadgeClass: string;
  starIcons: string;
  description: string;
  shortLabel: string;
  colorHex: string;
  textClass: string;
} {
  const info = getStarColorInfo(score);
  const starIcons = info.stars === 0 ? '⚪️' : '⭐️'.repeat(info.stars);
  return {
    stars: info.stars,
    label: info.label,
    shortLabel: info.shortLabel,
    badgeClass: info.badgeClass,
    darkBadgeClass: info.darkBadgeClass,
    starIcons,
    description: info.description,
    colorHex: info.colorHex,
    textClass: info.textClass,
  };
}

interface StarRatingBadgeProps {
  score?: number;
  stars?: number;
  showIcons?: boolean;
  className?: string;
}

export function StarRatingBadge({
  score = 0,
  stars: customStars,
  showIcons = true,
  className,
}: StarRatingBadgeProps) {
  const info = getStarRating(customStars !== undefined ? customStars : score);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap select-none shrink-0',
        info.badgeClass,
        className
      )}
    >
      <span>{info.label}</span>
    </span>
  );
}

interface ScoreStatusBadgeProps {
  score: number;
  maxScore?: number;
  showIcon?: boolean;
  showScore?: boolean;
  className?: string;
}

export function ScoreStatusBadge({
  score,
  showIcon = true,
  showScore = true,
  className,
}: ScoreStatusBadgeProps) {
  const info = getStarRating(score);

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap select-none shrink-0',
        info.badgeClass,
        className
      )}
    >
      <span>{info.label}</span>
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

    case AssessmentStatus.RETAKE_ALLOWED:
      label = 'Qayta baholashga ruxsat berilgan';
      colorClass = 'bg-indigo-50 text-indigo-700 border-indigo-200 font-bold';
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

    case CoordinateStatus.NOT_SUBMITTED:
    case AssessmentStatus.NOT_STARTED:
      label = 'Kiritilmagan / Yuborilmagan';
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
