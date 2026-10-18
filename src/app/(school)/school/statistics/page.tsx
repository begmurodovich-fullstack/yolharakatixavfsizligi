'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { assessmentService } from '@/services/assessmentService';
import {
  statisticsService,
  ComparativeAverages,
  HistoricalTrendItem,
} from '@/services/statisticsService';

import {
  School,
  Assessment,
  AssessmentPeriod,
} from '@/types';
import { getRoadTypeMeta } from '@/lib/roadTypes';
import { cn } from '@/lib/cn';

import {
  StatisticsKpiGrid,
  ComparisonInsight,
  BenchmarkBarChart,
  HistoricalTrendChart,
  ActionPlan,
  CountermeasuresMatrixCard,
} from '@/features/statistics/components';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { Calendar, School as SchoolIcon } from 'lucide-react';

export default function SchoolStatisticsPage() {
  const { user } = useAuth();

  const [school, setSchool] = useState<School | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<AssessmentPeriod | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [averages, setAverages] = useState<ComparativeAverages | null>(null);
  const [trendData, setTrendData] = useState<HistoricalTrendItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const targetSchoolId = user?.schoolId || 'sch-3837';
      const resolvedSchool = await schoolService.getSchoolById(targetSchoolId);

      if (!resolvedSchool) {
        throw new Error('Maktab ma’lumotlari topilmadi.');
      }
      setSchool(resolvedSchool);

      // Current Period
      const activePeriod = await assessmentService.getCurrentPeriod();
      setCurrentPeriod(activePeriod);

      // Assessment
      const activeAssessment = activePeriod
        ? await assessmentService.getAssessment(resolvedSchool.id, activePeriod.id)
        : null;
      setAssessment(activeAssessment);

      // Comparative benchmarks
      const benchmarkAverages = await statisticsService.getComparativeAverages(
        resolvedSchool.currentScore,
        resolvedSchool.regionId,
        resolvedSchool.districtId
      );
      setAverages(benchmarkAverages);

      // Historical performance trend
      const trend = await statisticsService.getHistoricalSchoolTrend(
        resolvedSchool.id,
        resolvedSchool.currentScore
      );
      setTrendData(trend);
    } catch (err: any) {
      console.error('Statistics load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Statistika ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const rawAnswersCount = assessment?.answers ? Object.keys(assessment.answers).length : 40;
  const answeredQuestionsCount = Math.min(40, rawAnswersCount > 0 ? rawAnswersCount : 40);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (hasError || !school) {
    return (
      <div className="py-12">
        <ErrorState
          title="Statistikani yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
            <SchoolIcon className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-semibold text-slate-800">{school.name}</span>
            <span>•</span>
            <span>{school.districtName}</span>
            <span>•</span>
            <span>{school.regionName}</span>
            {school.roadType && (() => {
              const meta = getRoadTypeMeta(school.roadType);
              return (
                <>
                  <span>•</span>
                  <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs', meta.badgeClass)}>
                    <span>{meta.icon}</span>
                    <span>{meta.shortName}</span>
                  </span>
                </>
              );
            })()}
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Xavfsizlik Ko‘rsatkichlari Statistikasi va Dinamika
          </h1>
          <p className="text-xs text-slate-500">
            40 ta xalqaro iRAP SR4S parametri va Yulduzli reyting (Star Rating) bo‘yicha tahlil
          </p>
        </div>

        {currentPeriod && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-mono text-xs w-fit">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>{currentPeriod.name}</span>
          </span>
        )}
      </div>

      {/* 2. Top KPI Grid: 40 Parameters & Benchmark Metrics */}
      <StatisticsKpiGrid
        schoolScore={school.currentScore}
        averages={averages}
        totalQuestions={40}
        answeredQuestions={answeredQuestionsCount}
      />

      {/* 3. Analytical Comparison Insight */}
      <ComparisonInsight
        schoolScore={school.currentScore}
        districtAverage={averages?.districtAverage ?? 4.0}
      />

      {/* 4. Visualizations Grid: Benchmark Bar & Historical Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BenchmarkBarChart averages={averages} schoolName={school.name} />
        <HistoricalTrendChart trendData={trendData} />
      </div>

      {/* 5. Countermeasures Matrix (SR4S Qarshi Chora-Tadbirlar Matritsasi) */}
      <CountermeasuresMatrixCard schoolScore={school.currentScore} />

      {/* 6. Action Plan (SR4S Amaliy Harakatlar Rejasi) */}
      <ActionPlan schoolScore={school.currentScore} />
    </div>
  );
}
