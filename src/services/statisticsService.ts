import { repositories } from '@/repositories';
import { ScoreStatus } from '@/types';
import { evaluateScore } from '@/lib/scoreRules';
import { apiClient } from '@/lib/apiClient';


export interface NationalStatisticsSummary {
  totalSchools: number;
  assessedCount: number;
  averageScore: number | null;  // null = hech kim baholanmagan
  safeCount: number;
  moderateCount: number;
  highRiskCount: number;
  safePercentage: number;
  moderatePercentage: number;
  highRiskPercentage: number;
  verifiedCoordinatesCount: number;
  pendingCoordinatesCount: number;
  periodName: string;
  error?: boolean;
}

export interface ComparativeAverages {
  schoolScore: number;
  districtAverage: number | null;  // null = baholanmagan
  regionAverage: number | null;
  republicAverage: number | null;
}

export interface HistoricalTrendItem {
  periodId: string;
  periodName: string;
  shortName: string;
  score: number;
  isCurrent: boolean;
  status: ScoreStatus;
}

export class StatisticsService {
  async getNationalSummary(): Promise<NationalStatisticsSummary> {
    try {
      const summary = await apiClient<NationalStatisticsSummary>('/statistics/summary');
      if (summary && !summary.error) {
        return summary;
      }
    } catch (e) {
      console.warn('Statistics summary API failed:', e);
    }

    // Xato holati — uydirma son emas, aniq xato holati
    return {
      totalSchools: 0,
      assessedCount: 0,
      averageScore: null,
      safeCount: 0,
      moderateCount: 0,
      highRiskCount: 0,
      safePercentage: 0,
      moderatePercentage: 0,
      highRiskPercentage: 0,
      verifiedCoordinatesCount: 0,
      pendingCoordinatesCount: 0,
      periodName: "2025\u20132026 o\u2018quv yili (III chorak)",
      error: true,
    };
  }

  /**
   * Maktab uchun taqqoslama benchmark o'rtachalarini hisoblash
   */
  async getComparativeAverages(
    schoolScore: number,
    regionId: string,
    districtId: string
  ): Promise<ComparativeAverages> {
    try {
      const res = await apiClient<ComparativeAverages>('/statistics/benchmarks', {
        params: {
          schoolScore,
          regionId: regionId || '',
          districtId: districtId || '',
        },
      });
      if (res && !('error' in res)) {
        return res;
      }
    } catch (e) {
      console.warn('Benchmarks API failed:', e);
    }

    return {
      schoolScore,
      districtAverage: null,
      regionAverage: null,
      republicAverage: null,
    };
  }

  /**
   * Maktabning tarixiy ko'rsatkichlarini olish
   */
  async getHistoricalSchoolTrend(schoolId: string, currentScore: number): Promise<HistoricalTrendItem[]> {
    const periods = await repositories.assessment.getPeriods();
    const currentPeriod = periods.find((p) => p.isCurrent);

    if (!currentScore || currentScore === 0) {
      return [];
    }

    return [
      {
        periodId: currentPeriod?.id || 'period-2026-q1',
        periodName: currentPeriod?.name || '2025-2026 Bahorgi monitoring',
        shortName: '2026 Bahor (Joriy)',
        score: currentScore,
        isCurrent: true,
        status: evaluateScore(currentScore).status,
      },
    ];
  }
}

export const statisticsService = new StatisticsService();
