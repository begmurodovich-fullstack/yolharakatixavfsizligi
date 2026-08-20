import { RankingEntry, SchoolRankingOverview } from '@/types';
import { repositories } from '@/repositories';

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
}

export const rankingService = new RankingService();
