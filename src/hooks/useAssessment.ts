'use client';

import { useState, useEffect, useCallback } from 'react';
import { Assessment, Criterion, Question, AssessmentPeriod, AssessmentAnswer } from '@/types';
import { assessmentService } from '@/services/assessmentService';
import { useAuth } from './useAuth';

export function useAssessment(schoolId?: string, periodId?: string) {
  const { user } = useAuth();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState<AssessmentPeriod | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveSchoolId = schoolId || user?.schoolId;

  const loadAssessmentData = useCallback(async () => {
    if (!effectiveSchoolId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const [period, critList, questList, assessmentData] = await Promise.all([
        assessmentService.getCurrentPeriod(),
        assessmentService.getCriteria(),
        assessmentService.getQuestions(),
        assessmentService.getAssessment(effectiveSchoolId, periodId),
      ]);

      setCurrentPeriod(period);
      setCriteria(critList);
      setQuestions(questList);
      setAssessment(assessmentData);
    } catch (err: any) {
      setError(err?.message || 'Baholash ma\'lumotlarini yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  }, [effectiveSchoolId, periodId]);

  useEffect(() => {
    loadAssessmentData();
  }, [loadAssessmentData]);

  const saveDraft = useCallback(
    async (answers: Record<string, AssessmentAnswer>) => {
      if (!effectiveSchoolId || !user) return;
      setIsSaving(true);
      try {
        const updated = await assessmentService.saveDraftAssessment(
          effectiveSchoolId,
          answers,
          user
        );
        setAssessment(updated);
        return updated;
      } finally {
        setIsSaving(false);
      }
    },
    [effectiveSchoolId, user]
  );

  const submit = useCallback(
    async (answers: Record<string, AssessmentAnswer>) => {
      if (!effectiveSchoolId || !user) return;
      setIsSaving(true);
      try {
        const submitted = await assessmentService.submitAssessment(
          effectiveSchoolId,
          answers,
          user
        );
        setAssessment(submitted);
        return submitted;
      } finally {
        setIsSaving(false);
      }
    },
    [effectiveSchoolId, user]
  );

  return {
    assessment,
    criteria,
    questions,
    currentPeriod,
    isLoading,
    isSaving,
    error,
    saveDraft,
    submit,
    reload: loadAssessmentData,
  };
}
