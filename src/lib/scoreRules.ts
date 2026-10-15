import { ScoreStatus, ScoreEvaluation } from '@/types';
import { SCORE_THRESHOLDS } from './constants';

/**
 * Har qanday ballni (jumladan eski 0-100 shkalasini ham) 1.0 - 5.0 shkalaga normallashtirish.
 */
export function normalizeScore(score: number | string | null | undefined): number {
  const num = Number(score) || 0;
  if (num <= 0) return 0;
  if (num > 5.0) {
    return Math.min(5.0, Number((num / 20).toFixed(1)));
  }
  return Math.min(5.0, Number(num.toFixed(1)));
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
export function scoreToStarRating(score: number): {
  starRating: string;
  starsInt: number;
} {
  const norm = normalizeScore(score);
  if (norm <= 0) {
    return { starRating: '0.0', starsInt: 0 };
  }

  const starRating = norm.toFixed(1);
  let starsInt = 1;
  if (norm >= 5.0) starsInt = 5;
  else if (norm >= 4.0) starsInt = 4;
  else if (norm >= 3.0) starsInt = 3;
  else if (norm >= 2.0) starsInt = 2;
  else starsInt = 1;

  return {
    starRating,
    starsInt,
  };
}

