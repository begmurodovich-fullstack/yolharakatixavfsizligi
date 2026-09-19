'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { assessmentService } from '@/services/assessmentService';
import {
  School,
  Assessment,
  AssessmentPeriod,
  Criterion,
  Question,
} from '@/types';

import {
  CriteriaHeader,
} from '@/features/criteria/components';
import { Sr4sDemonstrator } from '@/components/sr4s/Sr4sDemonstrator';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';

export default function SchoolCriteriaPage() {
  const { user } = useAuth();

  const [school, setSchool] = useState<School | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<AssessmentPeriod | null>(null);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandAll, setExpandAll] = useState(false);

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

      const activePeriod = await assessmentService.getCurrentPeriod();
      setCurrentPeriod(activePeriod);

      const [critList, questList, activeAssessment] = await Promise.all([
        assessmentService.getCriteria(),
        assessmentService.getQuestions(),
        activePeriod ? assessmentService.getAssessment(resolvedSchool.id, activePeriod.id) : null,
      ]);

      setCriteria(critList);
      setQuestions(questList);
      setAssessment(activeAssessment);
    } catch (err: any) {
      console.error('Criteria load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Mezonlar ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter criteria by search query
  const filteredCriteria = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return criteria;
    return criteria.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [criteria, searchQuery]);

  // Calculate scores per criterion
  const getCriterionMetrics = useCallback(
    (critId: string, maxScore: number) => {
      const critQuestions = questions.filter((q) => q.criterionId === critId);
      const answersMap = assessment?.answers || {};
      let earned = 0;

      critQuestions.forEach((q) => {
        const ans = answersMap[q.id];
        if (ans) {
          earned += ans.pointsAwarded || 0;
        }
      });

      if (critQuestions.length > 0 && Object.keys(answersMap).length === 0 && school) {
        earned = Math.round((school.currentScore / 100) * maxScore);
      }

      const percentage = maxScore > 0 ? Math.round((earned / maxScore) * 100) : 0;
      return { earned, percentage };
    },
    [questions, assessment, school]
  );

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-36 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (hasError || !school) {
    return (
      <div className="py-12">
        <ErrorState
          title="Mezonlarni yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Banner & Standards Overview */}
      <CriteriaHeader
        school={school}
        currentPeriod={currentPeriod}
        totalCriteria={criteria.length}
        totalQuestions={questions.length}
        schoolScore={school.currentScore}
      />

      {/* 2. Interactive SR4S Calculator / Demonstrator */}
      <div className="space-y-2">
        <Sr4sDemonstrator
          school={school}
          onSaveSuccess={(updatedScore) => {
            if (school) {
              setSchool({ ...school, currentScore: updatedScore });
            }
            loadData();
          }}
        />
      </div>
    </div>
  );
}
