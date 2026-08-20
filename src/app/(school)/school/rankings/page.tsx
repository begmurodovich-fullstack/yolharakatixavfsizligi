'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { rankingService } from '@/services/rankingService';
import { assessmentService } from '@/services/assessmentService';
import {
  School,
  AssessmentPeriod,
  RankingEntry,
  RankingScope,
  ScoreStatus,
  SchoolRankingOverview,
} from '@/types';

import {
  RankingHeroCard,
  RankingScopeTabs,
  RankingFilters,
  RankingTable,
} from '@/features/rankings/components';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { Trophy, Calendar, School as SchoolIcon } from 'lucide-react';

export default function SchoolRankingsPage() {
  const { user } = useAuth();

  const [school, setSchool] = useState<School | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<AssessmentPeriod | null>(null);
  const [overview, setOverview] = useState<SchoolRankingOverview | null>(null);

  // Scope & Filter State
  const [scope, setScope] = useState<RankingScope>(RankingScope.DISTRICT);
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ScoreStatus | 'ALL'>('ALL');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initial Data Load
  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const targetSchoolId = user?.schoolId || 'sch-bux-gij-24';
      const resolvedSchool = await schoolService.getSchoolById(targetSchoolId);

      if (!resolvedSchool) {
        throw new Error('Maktab ma’lumotlari topilmadi.');
      }
      setSchool(resolvedSchool);

      const activePeriod = await assessmentService.getCurrentPeriod();
      setCurrentPeriod(activePeriod);

      const overviewData = await rankingService.getSchoolRankingOverview(
        resolvedSchool.id,
        activePeriod?.id
      );
      setOverview(overviewData);

      // Load district rankings by default
      const initialRankings = await rankingService.getDistrictRankings(
        resolvedSchool.districtId,
        activePeriod?.id
      );
      setRankings(initialRankings);
    } catch (err: any) {
      console.error('Rankings load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Reyting ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Handle Scope Switching
  const handleScopeChange = async (newScope: RankingScope) => {
    setScope(newScope);
    if (!school) return;

    try {
      let fetched: RankingEntry[] = [];
      if (newScope === RankingScope.DISTRICT) {
        fetched = await rankingService.getDistrictRankings(school.districtId, currentPeriod?.id);
      } else if (newScope === RankingScope.REGION) {
        fetched = await rankingService.getRegionRankings(school.regionId, currentPeriod?.id);
      } else {
        fetched = await rankingService.getRepublicRankings(currentPeriod?.id);
      }
      setRankings(fetched);
    } catch (e) {
      console.error('Failed to change ranking scope:', e);
    }
  };

  // Filter rankings by search and status
  const filteredRankings = useMemo(() => {
    return rankings.filter((entry) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const nameMatch = entry.entityName.toLowerCase().includes(query);
      const districtMatch = (entry.districtName || '').toLowerCase().includes(query);
      const regionMatch = (entry.regionName || '').toLowerCase().includes(query);
      const matchesSearch = !query || nameMatch || districtMatch || regionMatch;

      // Status match
      const matchesStatus = statusFilter === 'ALL' || entry.scoreStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rankings, searchQuery, statusFilter]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  // Error state
  if (hasError || !school) {
    return (
      <div className="py-12">
        <ErrorState
          title="Reytinglarni yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
          onRetry={loadInitialData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <SchoolIcon className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-semibold text-slate-800">{school.name}</span>
            <span>•</span>
            <span>{school.districtName}</span>
            <span>•</span>
            <span>{school.regionName}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Maktablar Yo‘l Xavfsizligi Reytingi
          </h1>
        </div>

        {currentPeriod && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-mono text-xs w-fit">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>{currentPeriod.name}</span>
          </span>
        )}
      </div>

      {/* 2. Main Hero Ranking Card */}
      <RankingHeroCard
        overview={overview}
        currentScore={school.currentScore}
      />

      {/* 3. Scope Selector Tabs */}
      <RankingScopeTabs
        currentScope={scope}
        onScopeChange={handleScopeChange}
        districtName={school.districtName}
        regionName={school.regionName}
      />

      {/* 4. Search and Status Filters */}
      <RankingFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        totalEntries={filteredRankings.length}
      />

      {/* 5. Interactive Ranking Table */}
      <RankingTable
        entries={filteredRankings}
        currentSchoolId={school.id}
        scope={scope}
      />
    </div>
  );
}
