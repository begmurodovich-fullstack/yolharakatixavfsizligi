import { RankingEntry, SchoolRankingOverview } from '@/types';
import { repositories } from '@/repositories';

export interface RegionalHeatmapItem {
  regionId: string;
  regionName: string;
  shortName: string;
  rank: number;
  totalSchools: number;
  totalStudents: number;
  studentsFormatted: string;
  assessedSchoolsCount: number;
  averageScore: number;
  starRating: number;
  distribution: {
    safe: { count: number; percent: number };
    moderate: { count: number; percent: number };
    risk: { count: number; percent: number };
  };
}

export class RankingService {
  async getRepublicRankings(periodId?: string): Promise<RankingEntry[]> {
    const targetPeriod = periodId || (await repositories.assessment.getCurrentPeriod())?.id;
    if (!targetPeriod) return [];
    return repositories.ranking.getRepublicRankings(targetPeriod);
  }

  async getRegionRankings(regionId?: string, periodId?: string): Promise<RankingEntry[]> {
    const targetPeriod = periodId || (await repositories.assessment.getCurrentPeriod())?.id;
    if (!targetPeriod) return [];
    return repositories.ranking.getRegionRankings(targetPeriod, regionId);
  }

  async getDistrictRankings(districtId?: string, periodId?: string): Promise<RankingEntry[]> {
    const targetPeriod = periodId || (await repositories.assessment.getCurrentPeriod())?.id;
    if (!targetPeriod) return [];
    return repositories.ranking.getDistrictRankings(targetPeriod, districtId);
  }

  async getSchoolRankingOverview(schoolId: string, periodId?: string): Promise<SchoolRankingOverview | null> {
    const targetPeriod = periodId || (await repositories.assessment.getCurrentPeriod())?.id;
    if (!targetPeriod) return null;
    return repositories.ranking.getSchoolRankingOverview(schoolId, targetPeriod);
  }

  async getRegionalHeatmap(): Promise<RegionalHeatmapItem[]> {
    try {
      const res = await fetch('/api/statistics/regional-heatmap', { cache: 'no-store' });
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      console.error('Failed to fetch regional heatmap:', e);
      return [];
    }
  }
}

export const rankingService = new RankingService();
