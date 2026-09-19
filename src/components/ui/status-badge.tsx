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

export function getStarRating(score: number): {
  stars: number;
  label: string;
  badgeClass: string;
  starIcons: string;
  description: string;
} {
  if (!score || score <= 0) {
    return {
      stars: 0,
      label: 'Baholanmagan',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
      starIcons: '⚪️',
      description: 'Baholash hali o‘tkazilmagan',
    };
  }
  if (score >= 90) {
    return {
      stars: 5,
      label: '5 Yulduz (Namunali)',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      starIcons: '⭐️⭐️⭐️⭐️⭐️',
      description: 'Eng yuqori xavfsizlik darajasi',
    };
  }
  if (score >= 75) {
    return {
      stars: 4,
      label: '4 Yulduz (Yaxshi)',
      badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
      starIcons: '⭐️⭐️⭐️⭐️',
      description: 'Yaxshi xavfsizlik darajasi',
    };
  }
  if (score >= 60) {
    return {
      stars: 3,
      label: '3 Yulduz (O‘rtacha)',
      badgeClass: 'bg-yellow-50 text-yellow-900 border-yellow-300',
      starIcons: '⭐️⭐️⭐️',
      description: 'BMT minimal talabiga mos',
    };
  }
  if (score >= 45) {
    return {
      stars: 2,
      label: '2 Yulduz (Xavfli)',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
      starIcons: '⭐️⭐️',
      description: 'Chora ko‘rish talab etiladi',
    };
  }
  return {
    stars: 1,
    label: '1 Yulduz (O‘ta Xavfli)',
    badgeClass: 'bg-slate-900 text-amber-300 border-slate-800',
    starIcons: '⭐️',
    description: 'Shoshilinch chora zarur',
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
  const info = getStarRating(customStars ? customStars * 20 : score);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border',
        info.badgeClass,
        className
      )}
    >
      {showIcons && <Sr4sGoldStars stars={info.stars} size={14} className="shrink-0" />}
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
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border',
        info.badgeClass,
        className
      )}
    >
      <span className="text-[11px]">{info.starIcons}</span>
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
