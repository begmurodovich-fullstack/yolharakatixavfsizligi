'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { assessmentService } from '@/services/assessmentService';
import { useToast } from '@/components/ui/toast';
import {
  School,
  Assessment,
  AssessmentPeriod,
  Criterion,
  Question,
  Evidence,
  AssessmentAnswer,
  QuestionOption,
  AssessmentStatus,
  EvidenceStatus,
} from '@/types';

import {
  AssessmentHeader,
  QuestionNavigator,
  QuestionCard,
  EvidenceUploader,
  AssessmentNavigation,
  AssessmentReviewDialog,
  AssessmentSuccessState,
} from '@/features/assessment/components';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { EmptyState } from '@/components/ui/empty-state';
import { ClipboardList } from 'lucide-react';

export default function SchoolAssessmentPage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [school, setSchool] = useState<School | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<AssessmentPeriod | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);

  // Workflow State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AssessmentAnswer>>({});
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load active assessment data
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

      // 1. Current Active Period
      const activePeriod = await assessmentService.getCurrentPeriod();
      setCurrentPeriod(activePeriod);

      if (!activePeriod) {
        setIsLoading(false);
        return;
      }

      // 2. Criteria & Questions
      const [critList, questList] = await Promise.all([
        assessmentService.getCriteria(),
        assessmentService.getQuestions(),
      ]);
      setCriteria(critList);
      setQuestions(questList);

      // 3. Existing Assessment & Evidence
      const [activeAssessment, schoolEvidence] = await Promise.all([
        assessmentService.getAssessment(resolvedSchool.id, activePeriod.id),
        assessmentService.getEvidenceForSchool(resolvedSchool.id),
      ]);

      setAssessment(activeAssessment);
      setEvidenceList(schoolEvidence);

      if (activeAssessment?.answers) {
        setAnswers(activeAssessment.answers);
      }

      if (activeAssessment?.status === AssessmentStatus.SUBMITTED) {
        setIsSubmittedSuccess(true);
      }
    } catch (err: any) {
      console.error('Assessment load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Baholash ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Current selected question and its criterion
  const currentQuestion: Question | undefined = questions[currentIndex];
  const currentCriterion: Criterion | undefined = criteria.find(
    (c) => c.id === currentQuestion?.criterionId
  );
  const currentCriterionIndex = criteria.findIndex(
    (c) => c.id === currentQuestion?.criterionId
  ) + 1;

  // Real-time calculated score
  const calculatedScore = useMemo(() => {
    return assessmentService.calculateTotalScore(answers).score;
  }, [answers]);

  // Metrics: Answered & Evidence counts
  const answeredCount = Object.keys(answers).length;
  const questionsRequiringEvidence = useMemo(() => {
    return questions.filter((q) => q.requiresEvidence);
  }, [questions]);

  const requiredEvidenceCount = questionsRequiringEvidence.length;
  const uploadedEvidenceCount = useMemo(() => {
    // Unique questions with valid evidence
    const answeredWithEvidence = questionsRequiringEvidence.filter((q) => {
      const qEv = evidenceList.filter((e) => e.questionId === q.id);
      return qEv.some(
        (e) => e.status === EvidenceStatus.APPROVED || e.status === EvidenceStatus.PENDING
      );
    });
    return answeredWithEvidence.length;
  }, [questionsRequiringEvidence, evidenceList]);

  // Missing Evidence Questions List
  const missingEvidenceQuestions = useMemo(() => {
    const list: number[] = [];
    questions.forEach((q, idx) => {
      if (q.requiresEvidence) {
        const qEv = evidenceList.filter((e) => e.questionId === q.id);
        const hasValid = qEv.some(
          (e) => e.status === EvidenceStatus.APPROVED || e.status === EvidenceStatus.PENDING
        );
        if (!hasValid) {
          list.push(idx + 1);
        }
      }
    });
    return list;
  }, [questions, evidenceList]);

  // Unanswered Questions List
  const unansweredQuestions = useMemo(() => {
    const list: number[] = [];
    questions.forEach((q, idx) => {
      if (!answers[q.id]?.selectedOptionId) {
        list.push(idx + 1);
      }
    });
    return list;
  }, [questions, answers]);

  // Handle Option Selection
  const handleSelectOption = async (questionId: string, option: QuestionOption) => {
    const existingAnswer = answers[questionId] || {
      questionId,
      evidenceIds: [],
    };

    const updatedAnswers = {
      ...answers,
      [questionId]: {
        ...existingAnswer,
        selectedOptionId: option.id,
        pointsAwarded: option.points,
      },
    };

    setAnswers(updatedAnswers);

    // Save draft in background
    if (school && user) {
      try {
        await assessmentService.saveDraftAssessment(school.id, updatedAnswers, user);
      } catch (e) {
        console.warn('Draft autosave warning:', e);
      }
    }
  };

  // Handle Evidence Upload
  const handleUploadEvidence = async (
    questionId: string,
    imageUrl: string,
    caption: string,
    rawFile?: File
  ) => {
    if (!school || !user) return;
    try {
      const newEv = await assessmentService.uploadMockEvidence(
        school.id,
        questionId,
        imageUrl,
        caption,
        user,
        rawFile
      );

      const updatedEvidenceList = [...evidenceList, newEv];
      setEvidenceList(updatedEvidenceList);

      // Update question answer with evidence reference
      const existingAnswer = answers[questionId] || {
        questionId,
        pointsAwarded: 0,
        evidenceIds: [],
      };

      const updatedAnswers = {
        ...answers,
        [questionId]: {
          ...existingAnswer,
          evidenceIds: [...(existingAnswer.evidenceIds || []), newEv.id],
        },
      };

      setAnswers(updatedAnswers);
      await assessmentService.saveDraftAssessment(school.id, updatedAnswers, user);

      success('Foto-dalil muvaffaqiyatli saqlandi!', 'Yuklandi');
    } catch (err: any) {
      toastError(err?.message || 'Foto-dalilni yuklashda xatolik', 'Xatolik');
    }
  };

  // Final Confirmation & Submission
  const handleConfirmSubmit = async () => {
    if (!school || !user) return;
    setIsSubmitting(true);

    try {
      const submitted = await assessmentService.submitAssessment(school.id, answers, user);
      setAssessment(submitted);
      setIsReviewOpen(false);
      setIsSubmittedSuccess(true);
      success('Monitoring baholashi muvaffaqiyatli topshirildi!', 'Qabul qilindi');
    } catch (err: any) {
      toastError(err?.message || 'Baholashni yuborishda xatolik', 'Xatolik');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
      </div>
    );
  }

  // Error State
  if (hasError || !school) {
    return (
      <div className="py-12">
        <ErrorState
          title="Baholashni yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda texnik xatolik yuz berdi.'}
          onRetry={loadData}
        />
      </div>
    );
  }

  // Empty State: No active period
  if (!currentPeriod) {
    return (
      <div className="py-12">
        <EmptyState
          icon={ClipboardList}
          title="Faol monitoring davri topilmadi"
          description="Ayni paytda ochiq baholash davri mavjud emas. Yangi davr boshlanganda bu yerda savolnoma paydo bo‘ladi."
          actionLabel="Boshqaruv paneliga qaytish"
          onAction={() => (window.location.href = '/school')}
        />
      </div>
    );
  }

  // Success State after submission
  if (isSubmittedSuccess && assessment) {
    return (
      <div className="py-6">
        <AssessmentSuccessState
          assessment={assessment}
          school={school}
          currentPeriod={currentPeriod}
          onReviewAnswers={() => setIsSubmittedSuccess(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header & Progress Overview */}
      <AssessmentHeader
        school={school}
        currentPeriod={currentPeriod}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
        uploadedEvidenceCount={uploadedEvidenceCount}
        requiredEvidenceCount={requiredEvidenceCount}
        currentScore={calculatedScore}
      />

      {/* 2. Compact Ribbon Question Navigator */}
      <QuestionNavigator
        questions={questions}
        answers={answers}
        evidenceList={evidenceList}
        currentIndex={currentIndex}
        onSelectQuestion={(idx) => setCurrentIndex(idx)}
      />

      {/* 3. Main Question Card */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          criterion={currentCriterion}
          criterionIndex={currentCriterionIndex}
          totalCriteria={criteria.length}
          questionIndex={currentIndex}
          totalQuestions={questions.length}
          currentAnswer={answers[currentQuestion.id]}
          onSelectOption={handleSelectOption}
        />
      )}

      {/* 4. Evidence Upload Section if required */}
      {currentQuestion?.requiresEvidence && (
        <EvidenceUploader
          questionId={currentQuestion.id}
          evidenceList={evidenceList}
          onUploadEvidence={handleUploadEvidence}
        />
      )}

      {/* 5. Bottom Navigation Controls */}
      <AssessmentNavigation
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onPrevious={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
        onNext={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
        onComplete={() => setIsReviewOpen(true)}
      />

      {/* 6. Review & Confirmation Dialog */}
      <AssessmentReviewDialog
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
        isSubmitting={isSubmitting}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        requiredEvidenceCount={requiredEvidenceCount}
        uploadedEvidenceCount={uploadedEvidenceCount}
        calculatedScore={calculatedScore}
        missingEvidenceQuestions={missingEvidenceQuestions}
        unansweredQuestions={unansweredQuestions}
      />
    </div>
  );
}
