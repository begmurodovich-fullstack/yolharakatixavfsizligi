'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
  Criterion,
  Question,
} from '@/types';

import {
  StatisticsKpiGrid,
  ComparisonInsight,
  CriteriaRadarChart,
  BenchmarkBarChart,
  HistoricalTrendChart,
  CriteriaPerformanceGrid,
  ActionPlan,
} from '@/features/statistics/components';

import { StrongWeakCriteria, CriterionScoreInfo } from '@/features/dashboard/components';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { BarChart3, Calendar, School as SchoolIcon } from 'lucide-react';

export default function SchoolStatisticsPage() {
  const { user } = useAuth();

  const [school, setSchool] = useState<School | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<AssessmentPeriod | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [averages, setAverages] = useState<ComparativeAverages | null>(null);
  const [trendData, setTrendData] = useState<HistoricalTrendItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const targetSchoolId = user?.schoolId || 'sch-bux-gij-24';
      const resolvedSchool = await schoolService.getSchoolById(targetSchoolId);

      if (!resolvedSchool) {
        throw new Error('Maktab ma’lumotlari topilmadi.');
      }
      setSchool(resolvedSchool);

      // Current Period
      const activePeriod = await assessmentService.getCurrentPeriod();
      setCurrentPeriod(activePeriod);

      // Criteria, Questions, Assessment
      const [critList, questList, activeAssessment] = await Promise.all([
        assessmentService.getCriteria(),
        assessmentService.getQuestions(),
        activePeriod ? assessmentService.getAssessment(resolvedSchool.id, activePeriod.id) : null,
      ]);
      setCriteria(critList);
      setQuestions(questList);
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

  // Compute criteria breakdown from assessment
  const criterionScores: CriterionScoreInfo[] = useMemo(() => {
    if (!criteria.length) return [];

    const answersMap = assessment?.answers || {};

    return criteria.map((crit) => {
      const critQuestions = questions.filter((q) => q.criterionId === crit.id);
      let earned = 0;

      critQuestions.forEach((q) => {
        const ans = answersMap[q.id];
        if (ans) {
          earned += ans.pointsAwarded || 0;
        }
      });

      if (critQuestions.length > 0 && Object.keys(answersMap).length === 0 && school) {
        earned = Math.round((school.currentScore / 100) * crit.maxScore);
      }

      const percentage = crit.maxScore > 0 ? Math.round((earned / crit.maxScore) * 100) : 0;

      return {
        criterion: crit,
        earnedScore: earned,
        maxScore: crit.maxScore,
        percentage,
      };
    });
  }, [criteria, questions, assessment, school]);

  const strongestCriterion = useMemo(() => {
    if (!criterionScores.length) return undefined;
    return [...criterionScores].sort((a, b) => b.percentage - a.percentage)[0];
  }, [criterionScores]);

  const weakestCriterion = useMemo(() => {
    if (!criterionScores.length) return undefined;
    return [...criterionScores].sort((a, b) => a.percentage - b.percentage)[0];
  }, [criterionScores]);

  const answeredQuestionsCount = Object.keys(assessment?.answers || {}).length;
  const uploadedEvidenceCount = assessment?.evidence?.length || 4;

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
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <SchoolIcon className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-semibold text-slate-800">{school.name}</span>
            <span>•</span>
            <span>{school.districtName}</span>
            <span>•</span>
            <span>{school.regionName}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Xavfsizlik Ko‘rsatkichlari Statistikasi va Dinamika
          </h1>
        </div>

        {currentPeriod && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-mono text-xs w-fit">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>{currentPeriod.name}</span>
          </span>
        )}
      </div>

      {/* 2. Top KPI Grid */}
      <StatisticsKpiGrid
        schoolScore={school.currentScore}
        averages={averages}
        totalQuestions={questions.length}
        answeredQuestions={answeredQuestionsCount}
        uploadedEvidenceCount={uploadedEvidenceCount}
        requiredEvidenceCount={4}
        strongestCriterion={strongestCriterion}
        weakestCriterion={weakestCriterion}
      />

      {/* 3. Analytical Comparison Insight */}
      <ComparisonInsight
        schoolScore={school.currentScore}
        districtAverage={averages?.districtAverage ?? 78}
        weakestCriterion={weakestCriterion}
      />

      {/* 4. Visualizations Grid: Radar & Benchmark Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <CriteriaRadarChart criterionScores={criterionScores} />
        </div>
        <div className="lg:col-span-6">
          <BenchmarkBarChart averages={averages} schoolName={school.name} />
        </div>
      </div>

      {/* 5. Historical Trend Section */}
      <HistoricalTrendChart trendData={trendData} />

      {/* 6. 8 Criteria Performance Grid */}
      <CriteriaPerformanceGrid criterionScores={criterionScores} />

      {/* 7. Strong and Focus Criteria Cards */}
      <StrongWeakCriteria criterionScores={criterionScores} />

      {/* 8. Action Plan */}
      <ActionPlan criterionScores={criterionScores} />
    </div>
  );
}
