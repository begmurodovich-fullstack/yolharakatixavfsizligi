'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { adminService } from '@/services/adminService';
import { schoolService } from '@/services/schoolService';
import { assessmentService } from '@/services/assessmentService';
import { useToast } from '@/components/ui/toast';
import {
  Assessment,
  AssessmentStatus,
  School,
  Criterion,
  Question,
} from '@/types';

import {
  AssessmentTable,
  AssessmentReviewModal,
} from '@/features/admin/components';

import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { ClipboardCheck, Clock, Filter } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function AdminAssessmentsPage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [statusFilter, setStatusFilter] = useState<AssessmentStatus | 'ALL'>('ALL');
  const [reviewModalAssessment, setReviewModalAssessment] = useState<Assessment | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const [allAss, allSchools, allCrit, allQ] = await Promise.all([
        adminService.getAllAssessments(),
        schoolService.getSchools(),
        assessmentService.getCriteria(),
        assessmentService.getQuestions(),
      ]);
      setAssessments(allAss);
      setSchools(allSchools);
      setCriteria(allCrit);
      setQuestions(allQ);
    } catch (err: any) {
      console.error('Admin assessments load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Baholash ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Verify or Reject
  const handleVerifyAssessment = async (
    assessmentId: string,
    status: AssessmentStatus.VERIFIED | AssessmentStatus.REJECTED,
    notes: string
  ) => {
    if (!user) return;
    try {
      const updated = await adminService.verifyAssessment(assessmentId, status, notes, user);
      setAssessments((prev) => prev.map((a) => (a.id === assessmentId ? updated : a)));
      if (status === AssessmentStatus.VERIFIED) {
        success('Maktab baholashi rasmiy tasdiqlandi va yakuniy ball hisoblandi!', 'Tasdiqlandi');
      } else {
        success('Baholash arizasi qayta ishlash uchun maktabga qaytarildi.', 'Qaytarildi');
      }
    } catch (e: any) {
      toastError(e?.message || 'Amalni bajarishda xatolik', 'Xatolik');
    }
  };

  // Filter assessments
  const filteredAssessments = useMemo(() => {
    if (statusFilter === 'ALL') return assessments;
    return assessments.filter((a) => a.status === statusFilter);
  }, [assessments, statusFilter]);

  const pendingCount = assessments.filter((a) => a.status === AssessmentStatus.SUBMITTED).length;

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="py-12">
        <ErrorState
          title="Baholashlarni yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
          onRetry={loadData}
        />
      </div>
    );
  }

  const activeSchool = reviewModalAssessment
    ? schools.find((s) => s.id === reviewModalAssessment.schoolId)
    : undefined;

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ClipboardCheck className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Monitoring va Nazorat</span>
            <span>•</span>
            <span>O‘z-o‘zini baholash ekspertizasi</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Maktablar Baholash Monitoringi
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Maktablar tomonidan 8 ta mezon bo‘yicha to‘ldirilgan o‘z-o‘zini baholash anketalarini tekshirish va rasmiy tasdiqlash.
          </p>
        </div>

        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-900 border border-teal-200 text-xs font-mono font-bold w-fit">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>{pendingCount} ta maktab tasdiqlashni kutmoqda</span>
          </span>
        )}
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 overflow-x-auto">
        <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold px-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Holat:</span>
        </div>

        {[
          { id: 'ALL', label: `Barchasi (${assessments.length})` },
          { id: AssessmentStatus.SUBMITTED, label: `Kutilmoqda (${pendingCount})` },
          {
            id: AssessmentStatus.VERIFIED,
            label: `Tasdiqlangan (${assessments.filter((a) => a.status === AssessmentStatus.VERIFIED).length})`,
          },
          {
            id: AssessmentStatus.IN_PROGRESS,
            label: `Jarayonda (${assessments.filter((a) => a.status === AssessmentStatus.IN_PROGRESS).length})`,
          },
          {
            id: AssessmentStatus.REJECTED,
            label: `Qaytarilgan (${assessments.filter((a) => a.status === AssessmentStatus.REJECTED).length})`,
          },
        ].map((tab) => {
          const isActive = statusFilter === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id as any)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none',
                isActive
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Assessments Table */}
      <AssessmentTable
        assessments={filteredAssessments}
        schools={schools}
        onOpenReview={setReviewModalAssessment}
      />

      {/* 4. Review Modal */}
      {reviewModalAssessment && (
        <AssessmentReviewModal
          assessment={reviewModalAssessment}
          school={activeSchool}
          criteria={criteria}
          questions={questions}
          onClose={() => setReviewModalAssessment(null)}
          onVerify={handleVerifyAssessment}
        />
      )}
    </div>
  );
}
