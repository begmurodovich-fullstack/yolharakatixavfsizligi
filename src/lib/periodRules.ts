import { AssessmentPeriod, Assessment } from '@/types';

/**
 * Validates whether a given period is currently active.
 */
export function isPeriodActive(period: AssessmentPeriod | null | undefined): boolean {
  if (!period) return false;
  return period.isCurrent;
}

/**
 * Filter a list of periods to return the single active current period.
 */
export function findCurrentPeriod(periods: AssessmentPeriod[]): AssessmentPeriod | null {
  return periods.find((p) => p.isCurrent) || null;
}

/**
 * CRITICAL BUSINESS RULE:
 * Filters assessment data so that ONLY the current active assessment period
 * influences the live school score, current rankings, and active statistics.
 * 
 * Historical assessments from past periods are excluded from current score calculation.
 */
export function filterCurrentPeriodAssessments(
  assessments: Assessment[],
  currentPeriodId: string
): Assessment[] {
  return assessments.filter((a) => a.periodId === currentPeriodId);
}

/**
 * Isolates historical assessments for archival and trend inspection.
 */
export function filterHistoricalAssessments(
  assessments: Assessment[],
  currentPeriodId: string
): Assessment[] {
  return assessments.filter((a) => a.periodId !== currentPeriodId);
}
