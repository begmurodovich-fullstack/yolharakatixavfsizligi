'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { assessmentService } from '@/services/assessmentService';
import { rankingService } from '@/services/rankingService';
import { statisticsService, ComparativeAverages } from '@/services/statisticsService';
import { notificationService } from '@/services/notificationService';

import {
  School,
  Assessment,
  AssessmentPeriod,
  Criterion,
  Question,
  SchoolRankingOverview,
  Notification,
} from '@/types';

import {
  SchoolWelcomeCard,
  LargeRankingCard,
  AssessmentProgressCard,
  CriteriaOverview,
  StrongWeakCriteria,
  RecommendationCard,
  StatisticsPreview,
  RankingComparison,
  NotificationList,
  QuickActions,
  CriterionScoreInfo,
} from '@/features/dashboard/components';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { FirstLoginOnboardingModal } from '@/features/auth/components/FirstLoginOnboardingModal';
import { SchoolPassportModal } from '@/features/reports/components/SchoolPassportModal';

export default function SchoolDashboardPage() {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPassport, setShowPassport] = useState(false);

  useEffect(() => {
    if (user?.isFirstLogin) {
      setShowOnboarding(true);
    }
  }, [user]);

  const [school, setSchool] = useState<School | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<AssessmentPeriod | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [rankingOverview, setRankingOverview] = useState<SchoolRankingOverview | null>(null);
  const [averages, setAverages] = useState<ComparativeAverages | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      // 1. Resolve school identity for the authenticated user from PostgreSQL
      const targetSchoolId = user?.schoolId;
      let resolvedSchool: School | null = null;

      if (targetSchoolId) {
        resolvedSchool = await schoolService.getSchoolById(targetSchoolId);
      }

      if (!resolvedSchool) {
        const allSchools = await schoolService.getSchools();
        if (allSchools.length > 0) {
          resolvedSchool = allSchools[0];
        }
      }

      if (!resolvedSchool) {
        throw new Error('Maktab ma’lumotlari topilmadi.');
      }
      setSchool(resolvedSchool);

      // 2. Derive currently active assessment period
      const activePeriod = await assessmentService.getCurrentPeriod();
      setCurrentPeriod(activePeriod);

      // 3. Load criteria & questions
      const [criteriaList, questionList] = await Promise.all([
        assessmentService.getCriteria(),
        assessmentService.getQuestions(),
      ]);
      setCriteria(criteriaList);
      setQuestions(questionList);

      // 4. Load school assessment for active period
      const activeAssessment = activePeriod
        ? await assessmentService.getAssessment(resolvedSchool.id, activePeriod.id)
        : null;
      setAssessment(activeAssessment);

      // 5. Load ranking overview for active period
      const rankOverview = await rankingService.getSchoolRankingOverview(
        resolvedSchool.id,
        activePeriod?.id
      );
      setRankingOverview(rankOverview);

      // 6. Load comparative benchmarks
      const benchmarkAverages = await statisticsService.getComparativeAverages(
        resolvedSchool.currentScore,
        resolvedSchool.regionId,
        resolvedSchool.districtId
      );
      setAverages(benchmarkAverages);

      // 7. Load school user notifications
      const notifs = await notificationService.getUserNotifications(
        user?.id,
        user?.role
      );
      setNotifications(notifs);
    } catch (err: any) {
      console.error('Dashboard load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Ma’lumotlarni yuklashda xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Compute 8 criteria performances based on assessment answers
  const criterionScores: CriterionScoreInfo[] = useMemo(() => {
    if (!criteria.length) return [];

    const answersMap = assessment?.answers || {};

    return criteria.map((crit) => {
      // Find questions for this criterion
      const critQuestions = questions.filter((q) => q.criterionId === crit.id);
      let earned = 0;

      critQuestions.forEach((q) => {
        const ans = answersMap[q.id];
        if (ans) {
          earned += ans.pointsAwarded || 0;
        }
      });

      // If no answered questions in this mock, use proportionate score
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

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-36 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Skeleton className="lg:col-span-7 h-72 rounded-2xl" />
          <Skeleton className="lg:col-span-5 h-72 rounded-2xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (hasError || !school) {
    return (
      <div className="py-12">
        <ErrorState
          title="Boshqaruv panelini yuklab bo‘lmadi"
          message={errorMessage || 'Maktab ma’lumotlarini olishda texnik xatolik yuz berdi.'}
          onRetry={loadDashboardData}
        />
      </div>
    );
  }

  const hasMissingEvidence = (assessment?.evidence?.length || 0) < 4;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. School Identity & Current Period Header */}
      <SchoolWelcomeCard
        school={school}
        currentPeriod={currentPeriod}
      />

      {/* 2. Top Key Section: Large Ranking Card & Assessment Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <LargeRankingCard
            rankingOverview={rankingOverview}
            currentScore={school.currentScore}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <AssessmentProgressCard
            assessment={assessment}
            totalQuestions={questions.length}
          />
        </div>
      </div>

      {/* 3. 8 Criteria Overview */}
      <CriteriaOverview criterionScores={criterionScores} />

      {/* 4. Strong and Weak Areas */}
      <StrongWeakCriteria criterionScores={criterionScores} />

      {/* 5. Recommendations Card */}
      <RecommendationCard
        criterionScores={criterionScores}
        hasMissingEvidence={hasMissingEvidence}
      />

      {/* 6. Analytics & Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <StatisticsPreview criterionScores={criterionScores} />
        </div>
        <div className="lg:col-span-5">
          <RankingComparison averages={averages} schoolName={school.name} />
        </div>
      </div>

      {/* 7. Notifications & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <NotificationList notifications={notifications} />
        </div>
        <div className="lg:col-span-5">
          <QuickActions onOpenPassport={() => setShowPassport(true)} />
        </div>
      </div>

      {/* Official Road Safety Passport Modal */}
      {showPassport && school && (
        <SchoolPassportModal
          school={school}
          criteria={criteria}
          assessment={assessment}
          isOpen={showPassport}
          onClose={() => setShowPassport(false)}
        />
      )}

      {/* First-Login Onboarding Wizard Modal */}
      {showOnboarding && user && (
        <FirstLoginOnboardingModal
          user={user}
          school={school}
          onComplete={(updatedUser, updatedSchool) => {
            setShowOnboarding(false);
            if (updatedSchool) setSchool(updatedSchool);
          }}
        />
      )}
    </div>
  );
}
