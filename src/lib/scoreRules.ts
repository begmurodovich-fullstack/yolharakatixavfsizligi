import { ScoreStatus, ScoreEvaluation } from '@/types';
import { SCORE_THRESHOLDS } from './constants';

/**
 * Har qanday ballni (jumladan eski 0-100 shkalasini ham) 1.0 - 5.0 shkalaga normallashtirish.
 */
export function normalizeScore(score: number | string | null | undefined): number {
  const num = Number(score) || 0;
  if (num <= 0) return 0;
  const raw = num > 5.0 ? num / 20 : num;
  // Aniq 0.1 xona bilan kesish (hech qachon 2.9 ni 3.0 ga yoki 4.9 ni 5.0 ga sakratmaydi)
  return Math.min(5.0, Math.floor((raw + 1e-6) * 10) / 10);
}

/**
 * 1.0 - 5.0 ballik asosiy mezon bo'yicha baholash:
 * GREEN (Yaxshi): >= 4.0 ball (4-5 yulduz)
 * YELLOW (O'rtacha): >= 3.0 va < 4.0 ball (3 yulduz)
 * RED (Xavfli): > 0 va < 3.0 ball (1-2 yulduz)
 */
export function evaluateScore(score: number, maxScore = 5.0): ScoreEvaluation {
  const norm = normalizeScore(score);

  let status: ScoreStatus;
  let statusLabel: string;
  let badgeClass: string;
  let bgClass: string;
  let textClass: string;
  let borderClass: string;

  if (norm >= SCORE_THRESHOLDS.GREEN_MIN) {
    status = ScoreStatus.GREEN;
    statusLabel = "Xavfsiz / Yaxshi (Good)";
    badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
    bgClass = "bg-emerald-500";
    textClass = "text-emerald-700";
    borderClass = "border-emerald-500";
  } else if (norm >= SCORE_THRESHOLDS.YELLOW_MIN) {
    status = ScoreStatus.YELLOW;
    statusLabel = "O'rtacha / E'tibor talab (Average)";
    badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
    bgClass = "bg-amber-500";
    textClass = "text-amber-700";
    borderClass = "border-amber-500";
  } else {
    status = ScoreStatus.RED;
    statusLabel = "Xavfli / Qoniqarsiz (Poor)";
    badgeClass = "bg-rose-50 text-rose-700 border-rose-200";
    bgClass = "bg-rose-500";
    textClass = "text-rose-700";
    borderClass = "border-rose-500";
  }

  const percentage = Math.round((norm / 5.0) * 100);

  return {
    score: norm,
    maxScore: 5.0,
    percentage,
    status,
    statusLabel,
    badgeClass,
    bgClass,
    textClass,
    borderClass,
  };
}

/**
 * Convenience helper to get just the ScoreStatus enum from score
 */
export function getScoreStatus(score: number, maxScore = 5.0): ScoreStatus {
  return evaluateScore(score, maxScore).status;
}

/**
 * 1.0 - 5.0 ballik asosiy mezon bo'yicha yulduzlar mutanosib taqsimoti:
 * 5.0 -> 5★ (Namunali) - Faqat 5.0 ball bo'lgandagina 5 yulduz
 * 4.0 - 4.9 -> 4★ (Yaxshi) - Masalan 4.8 ball, 4.3 ball = 4 yulduz
 * 3.0 - 3.9 -> 3★ (O'rtacha)
 * 2.0 - 2.9 -> 2★ (Xavfli) - Masalan 2.9 ball, 2.1 ball = 2 yulduz
 * 1.0 - 1.9 -> 1★ (O'ta Xavfli)
 * 0 -> Baholanmagan
 */
export interface StarColorInfo {
  stars: number;
  starRating: string;
  name: string;
  label: string;
  shortLabel: string;
  colorHex: string;
  badgeClass: string;
  darkBadgeClass: string;
  borderClass: string;
  textClass: string;
  bgClass: string;
  pinColor: string;
  pinTextColor: string;
  description: string;
}

/**
 * Maktab raqamini nomdan yoki maydondan xatosiz aniqlash
 * Misol: "1-maktab" -> "1", "24-maktab" -> "24", "28-IDUM" -> "28"
 */
export function getSchoolDisplayNumber(sch: {
  name?: string | null;
  schoolNumber?: string | number | null;
}): string {
  if (sch?.name) {
    const match = sch.name.match(/\d+/);
    if (match) return match[0];
  }
  if (sch?.schoolNumber) {
    return String(sch.schoolNumber);
  }
  return '★';
}

/**
 * 1.0 - 5.0 ballik asosiy mezon bo'yicha yulduzlar mutanosib taqsimoti:
 * 5.0 -> 5★ (Namunali) - Yashil (#22C55E)
 * 4.0 - 4.9 -> 4★ (Yaxshi) - Sabzi rang (#F97316)
 * 3.0 - 3.9 -> 3★ (O'rtacha) - Sariq (#EAB308)
 * 2.0 - 2.9 -> 2★ (Xavfli) - Qizil (#EF4444)
 * 1.0 - 1.9 -> 1★ (O'ta Xavfli) - Qora (#0F172A)
 * 0 -> Baholanmagan
 */
export function getStarColorInfo(score: number | string | null | undefined): StarColorInfo {
  const norm = normalizeScore(score);
  if (norm <= 0) {
    return {
      stars: 0,
      starRating: '0.0',
      name: 'Baholanmagan',
      label: 'Baholanmagan',
      shortLabel: 'Baholanmagan',
      colorHex: '#64748b',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
      darkBadgeClass: 'bg-slate-800/60 text-slate-400 border-slate-700',
      borderClass: 'border-slate-300',
      textClass: 'text-slate-600',
      bgClass: 'bg-slate-100',
      pinColor: '#0d9488',
      pinTextColor: '#ffffff',
      description: 'Baholash hali o‘tkazilmagan',
    };
  }

  if (norm >= 5.0) {
    return {
      stars: 5,
      starRating: norm.toFixed(1),
      name: '5 Yulduz (Yashil)',
      label: '5 Yulduz (Namunali)',
      shortLabel: '5★ Namunali',
      colorHex: '#22c55e',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs',
      darkBadgeClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-800',
      borderClass: 'border-emerald-500',
      textClass: 'text-emerald-700',
      bgClass: 'bg-emerald-500',
      pinColor: '#22c55e',
      pinTextColor: '#ffffff',
      description: 'Eng yuqori xavfsizlik darajasi',
    };
  }

  if (norm >= 4.0) {
    return {
      stars: 4,
      starRating: norm.toFixed(1),
      name: '4 Yulduz (Sabzi rang)',
      label: '4 Yulduz (Yaxshi)',
      shortLabel: '4★ Yaxshi',
      colorHex: '#f97316',
      badgeClass: 'bg-orange-50 text-orange-900 border-orange-300 shadow-2xs',
      darkBadgeClass: 'bg-orange-950/60 text-orange-400 border-orange-800',
      borderClass: 'border-orange-500',
      textClass: 'text-orange-700',
      bgClass: 'bg-orange-500',
      pinColor: '#f97316',
      pinTextColor: '#ffffff',
      description: 'Yaxshi xavfsizlik darajasi',
    };
  }

  if (norm >= 3.0) {
    return {
      stars: 3,
      starRating: norm.toFixed(1),
      name: '3 Yulduz (Sariq)',
      label: '3 Yulduz (O‘rtacha)',
      shortLabel: '3★ O‘rtacha',
      colorHex: '#eab308',
      badgeClass: 'bg-yellow-50 text-yellow-900 border-yellow-300 shadow-2xs',
      darkBadgeClass: 'bg-yellow-950/60 text-yellow-400 border-yellow-800',
      borderClass: 'border-yellow-500',
      textClass: 'text-yellow-700',
      bgClass: 'bg-yellow-500',
      pinColor: '#eab308',
      pinTextColor: '#ffffff',
      description: 'BMT minimal talabiga mos',
    };
  }

  if (norm >= 2.0) {
    return {
      stars: 2,
      starRating: norm.toFixed(1),
      name: '2 Yulduz (Qizil)',
      label: '2 Yulduz (Xavfli)',
      shortLabel: '2★ Xavfli',
      colorHex: '#ef4444',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-300 shadow-2xs',
      darkBadgeClass: 'bg-rose-950/60 text-rose-400 border-rose-800',
      borderClass: 'border-rose-500',
      textClass: 'text-rose-700',
      bgClass: 'bg-rose-500',
      pinColor: '#ef4444',
      pinTextColor: '#ffffff',
      description: 'Chora ko‘rish talab etiladi',
    };
  }

  // 1 Yulduz -> QORA
  return {
    stars: 1,
    starRating: norm.toFixed(1),
    name: '1 Yulduz (Qora)',
    label: '1 Yulduz (O‘ta Xavfli)',
    shortLabel: '1★ O‘ta Xavfli',
    colorHex: '#0f172a',
    badgeClass: 'bg-slate-950 text-white border-black shadow-2xs',
    darkBadgeClass: 'bg-black/90 text-white border-slate-700',
    borderClass: 'border-slate-950',
    textClass: 'text-slate-950',
    bgClass: 'bg-slate-950',
    pinColor: '#0f172a',
    pinTextColor: '#ffffff',
    description: 'Shoshilinch muhandislik chorasi zarur',
  };
}

export function scoreToStarRating(score: number): {
  starRating: string;
  starsInt: number;
  colorHex: string;
  textClass: string;
} {
  const info = getStarColorInfo(score);
  return {
    starRating: info.starRating,
    starsInt: info.stars,
    colorHex: info.colorHex,
    textClass: info.textClass,
  };
}

