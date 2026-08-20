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
  CriterionDetailCard,
} from '@/features/criteria/components';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

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

      {/* 2. Search & Expand All Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mezon nomi yoki tavsifi bo‘yicha qidiruv..."
            className="pl-9 text-xs h-9.5 rounded-xl"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setExpandAll(!expandAll)}
          className="text-xs font-semibold gap-1.5 border-slate-200 self-end sm:self-auto"
        >
          {expandAll ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Barchasini yopish</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Barcha savollarni ochish</span>
            </>
          )}
        </Button>
      </div>

      {/* 3. Criteria List */}
      <div className="space-y-4">
        {filteredCriteria.map((criterion) => {
          const critQuestions = questions.filter((q) => q.criterionId === criterion.id);
          const { earned, percentage } = getCriterionMetrics(criterion.id, criterion.maxScore);

          return (
            <CriterionDetailCard
              key={criterion.id}
              criterion={criterion}
              questions={critQuestions}
              earnedScore={earned}
              maxScore={criterion.maxScore}
              percentage={percentage}
              schoolAnswers={assessment?.answers || {}}
              defaultExpanded={expandAll}
            />
          );
        })}
      </div>
    </div>
  );
}
