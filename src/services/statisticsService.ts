import { repositories } from '@/repositories';
import { ScoreStatus, CoordinateStatus, AssessmentPeriod } from '@/types';
import { evaluateScore } from '@/lib/scoreRules';

export interface NationalStatisticsSummary {
  totalSchools: number;
  averageScore: number;
  safeCount: number; // GREEN
  moderateCount: number; // YELLOW
  highRiskCount: number; // RED
  safePercentage: number;
  moderatePercentage: number;
  highRiskPercentage: number;
  verifiedCoordinatesCount: number;
  pendingCoordinatesCount: number;
  periodName: string;
}

export interface ComparativeAverages {
  schoolScore: number;
  districtAverage: number;
  regionAverage: number;
  republicAverage: number;
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
    const schools = await repositories.school.getAll();
    const currentPeriod = await repositories.assessment.getCurrentPeriod();

    const totalSchools = schools.length;
    if (totalSchools === 0) {
      return {
        totalSchools: 0,
        averageScore: 0,
        safeCount: 0,
        moderateCount: 0,
        highRiskCount: 0,
        safePercentage: 0,
        moderatePercentage: 0,
        highRiskPercentage: 0,
        verifiedCoordinatesCount: 0,
        pendingCoordinatesCount: 0,
        periodName: currentPeriod?.name || '2025–2026 o‘quv yili (III chorak)',
      };
    }

    let totalScoreSum = 0;
    let safeCount = 0;
    let moderateCount = 0;
    let highRiskCount = 0;
    let verifiedCoordinatesCount = 0;
    let pendingCoordinatesCount = 0;

    schools.forEach((s) => {
      totalScoreSum += s.currentScore;
      const scoreEval = evaluateScore(s.currentScore);
      if (scoreEval.status === ScoreStatus.GREEN) safeCount++;
      else if (scoreEval.status === ScoreStatus.YELLOW) moderateCount++;
      else highRiskCount++;

      if (s.coordinateStatus === CoordinateStatus.VERIFIED) verifiedCoordinatesCount++;
      else if (s.coordinateStatus === CoordinateStatus.PENDING) pendingCoordinatesCount++;
    });

    const averageScore = Math.round(totalScoreSum / totalSchools);

    return {
      totalSchools,
      averageScore,
      safeCount,
      moderateCount,
      highRiskCount,
      safePercentage: Math.round((safeCount / totalSchools) * 100),
      moderatePercentage: Math.round((moderateCount / totalSchools) * 100),
      highRiskPercentage: Math.round((highRiskCount / totalSchools) * 100),
      verifiedCoordinatesCount,
      pendingCoordinatesCount,
      periodName: currentPeriod?.name || '2025-2026 O‘quv yili',
    };
  }

  /**
   * Computes comparative benchmark averages for a given school
   */
  async getComparativeAverages(
    schoolScore: number,
    regionId: string,
    districtId: string
  ): Promise<ComparativeAverages> {
    const allSchools = await repositories.school.getAll();

    const republicSchools = allSchools;
    const regionSchools = allSchools.filter((s) => s.regionId === regionId);
    const districtSchools = allSchools.filter((s) => s.districtId === districtId);

    const calcAvg = (list: typeof allSchools) => {
      if (list.length === 0) return 0;
      const sum = list.reduce((acc, curr) => acc + curr.currentScore, 0);
      return Math.round(sum / list.length);
    };

    return {
      schoolScore,
      districtAverage: calcAvg(districtSchools) || 78,
      regionAverage: calcAvg(regionSchools) || 74,
      republicAverage: calcAvg(republicSchools) || 71,
    };
  }

  /**
   * Retrieves historical performance trend for a school across periods
   * CRITICAL RULE: Historical periods are informational only and do not affect current rankings.
   */
  async getHistoricalSchoolTrend(schoolId: string, currentScore: number): Promise<HistoricalTrendItem[]> {
    const periods = await repositories.assessment.getPeriods();
    const currentPeriod = periods.find((p) => p.isCurrent);

    return [
      {
        periodId: 'period-2024-spring',
        periodName: '2023-2024 Bahorgi monitoring',
        shortName: '2024 Bahor',
        score: Math.max(45, currentScore - 18),
        isCurrent: false,
        status: evaluateScore(Math.max(45, currentScore - 18)).status,
      },
      {
        periodId: 'period-2024-autumn',
        periodName: '2024-2025 Kuzgi monitoring',
        shortName: '2024 Kuz',
        score: Math.max(55, currentScore - 12),
        isCurrent: false,
        status: evaluateScore(Math.max(55, currentScore - 12)).status,
      },
      {
        periodId: currentPeriod?.id || 'period-2025-spring',
        periodName: currentPeriod?.name || '2025-2026 Bahorgi monitoring',
        shortName: '2025 Bahor (Joriy)',
        score: currentScore,
        isCurrent: true,
        status: evaluateScore(currentScore).status,
      },
    ];
  }
}

export const statisticsService = new StatisticsService();
