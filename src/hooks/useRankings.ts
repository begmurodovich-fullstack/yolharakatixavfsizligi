'use client';

import { useState, useEffect, useCallback } from 'react';
import { RankingEntry, SchoolRankingOverview, RankingScope } from '@/types';
import { rankingService } from '@/services/rankingService';

export function useRankings(scope: RankingScope = RankingScope.REPUBLIC, entityId?: string) {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [schoolOverview, setSchoolOverview] = useState<SchoolRankingOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRankings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (scope === RankingScope.REPUBLIC) {
        const data = await rankingService.getRepublicRankings();
        setRankings(data);
      } else if (scope === RankingScope.REGION) {
        const data = await rankingService.getRegionRankings(entityId);
        setRankings(data);
      } else if (scope === RankingScope.DISTRICT) {
        const data = await rankingService.getDistrictRankings(entityId);
        setRankings(data);
      } else if (scope === RankingScope.SCHOOL && entityId) {
        const overview = await rankingService.getSchoolRankingOverview(entityId);
        setSchoolOverview(overview);
      }
    } catch (err: any) {
      setError(err?.message || 'Reyting ma\'lumotlarini yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  }, [scope, entityId]);

  useEffect(() => {
    loadRankings();
  }, [loadRankings]);

  return {
    rankings,
    schoolOverview,
    isLoading,
    error,
    reload: loadRankings,
  };
}
