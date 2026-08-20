import { ScoreStatus, ScoreEvaluation } from '@/types';
import { SCORE_THRESHOLDS } from './constants';

/**
 * Evaluates a score (or raw points + max points) into standard ScoreStatus
 * (GREEN = Good, YELLOW = Average, RED = Poor).
 */
export function evaluateScore(score: number, maxScore = 100): ScoreEvaluation {
  const safeMax = maxScore > 0 ? maxScore : 100;
  const percentage = Math.min(100, Math.max(0, Math.round((score / safeMax) * 100)));

  let status: ScoreStatus;
  let statusLabel: string;
  let badgeClass: string;
  let bgClass: string;
  let textClass: string;
  let borderClass: string;

  if (percentage >= SCORE_THRESHOLDS.GREEN_MIN) {
    status = ScoreStatus.GREEN;
    statusLabel = "Xavfsiz / Yaxshi (Good)";
    badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
    bgClass = "bg-emerald-500";
    textClass = "text-emerald-700";
    borderClass = "border-emerald-500";
  } else if (percentage >= SCORE_THRESHOLDS.YELLOW_MIN) {
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

  return {
    score,
    maxScore: safeMax,
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
 * Convenience helper to get just the ScoreStatus enum from a percentage or score
 */
export function getScoreStatus(score: number, maxScore = 100): ScoreStatus {
  return evaluateScore(score, maxScore).status;
}

/**
 * Return human-readable label in Uzbek / English for ScoreStatus
 */
export function getScoreStatusLabel(status: ScoreStatus, locale: 'uz' | 'en' = 'uz'): string {
  switch (status) {
    case ScoreStatus.GREEN:
      return locale === 'uz' ? 'Xavfsiz (Yuqori)' : 'Safe (Good)';
    case ScoreStatus.YELLOW:
      return locale === 'uz' ? 'O‘rtacha' : 'Moderate (Average)';
    case ScoreStatus.RED:
      return locale === 'uz' ? 'Xavfli (Past)' : 'High Risk (Poor)';
  }
}
