'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { adminService } from '@/services/adminService';
import { schoolService } from '@/services/schoolService';
import { assessmentService } from '@/services/assessmentService';
import { useToast } from '@/components/ui/toast';
import { Evidence, EvidenceStatus, School, Question } from '@/types';

import {
  EvidenceReviewCard,
  EvidenceRejectModal,
} from '@/features/admin/components';

import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Camera, CheckCircle2, Clock, XCircle, Filter } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function AdminEvidencePage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [statusFilter, setStatusFilter] = useState<EvidenceStatus | 'ALL'>('ALL');
  const [rejectModalEvidence, setRejectModalEvidence] = useState<Evidence | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const [allEv, allSchools, allQuestions] = await Promise.all([
        adminService.getAllEvidence(),
        schoolService.getSchools(),
        assessmentService.getQuestions(),
      ]);
      setEvidenceList(allEv);
      setSchools(allSchools);
      setQuestions(allQuestions);
    } catch (err: any) {
      console.error('Admin evidence load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Foto-dalillarni yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Approve
  const handleApprove = async (id: string) => {
    if (!user) return;
    try {
      const updated = await adminService.reviewEvidence(
        id,
        EvidenceStatus.APPROVED,
        '',
        user
      );
      setEvidenceList((prev) => prev.map((e) => (e.id === id ? updated : e)));
      success('Foto-dalil muvaffaqiyatli tasdiqlandi!', 'Tasdiqlandi');
    } catch (e: any) {
      toastError(e?.message || 'Tasdiqlashda xatolik', 'Xatolik');
    }
  };

  // Handle Reject
  const handleConfirmReject = async (id: string, reason: string) => {
    if (!user) return;
    try {
      const updated = await adminService.reviewEvidence(
        id,
        EvidenceStatus.REJECTED,
        reason,
        user
      );
      setEvidenceList((prev) => prev.map((e) => (e.id === id ? updated : e)));
      success('Foto-dalil rad etildi va maktabga sababi yuborildi.', 'Rad etildi');
    } catch (e: any) {
      toastError(e?.message || 'Rad etishda xatolik', 'Xatolik');
    }
  };

  // Filter evidence
  const filteredEvidence = useMemo(() => {
    if (statusFilter === 'ALL') return evidenceList;
    return evidenceList.filter((e) => e.status === statusFilter);
  }, [evidenceList, statusFilter]);

  const pendingCount = evidenceList.filter((e) => e.status === EvidenceStatus.PENDING).length;

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="py-12">
        <ErrorState
          title="Dalillarni yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Camera className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Foto-Ekspertiza</span>
            <span>•</span>
            <span>Yo‘l infratuzilmasi dalillari</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Maktablar Foto-Dalillarini Tekshirish
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Maktab mas’ullari tomonidan yuklangan infratuzilma suratlarini ko‘rib chiqish, tasdiqlash yoki sababi bilan rad etish.
          </p>
        </div>

        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-bold w-fit">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{pendingCount} ta tekshiruv kutmoqda</span>
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
          { id: 'ALL', label: `Barchasi (${evidenceList.length})` },
          { id: EvidenceStatus.PENDING, label: `Kutilmoqda (${pendingCount})` },
          {
            id: EvidenceStatus.APPROVED,
            label: `Tasdiqlangan (${evidenceList.filter((e) => e.status === EvidenceStatus.APPROVED).length})`,
          },
          {
            id: EvidenceStatus.REJECTED,
            label: `Rad etilgan (${evidenceList.filter((e) => e.status === EvidenceStatus.REJECTED).length})`,
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

      {/* 3. Evidence Grid */}
      {filteredEvidence.length === 0 ? (
        <EmptyState
          icon={Camera}
          title="Foto-dalillar topilmadi"
          description="Tanlangan parametr bo‘yicha hozircha hech qanday foto-dalil mavjud emas."
          className="py-16"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvidence.map((ev) => {
            const school = schools.find((s) => s.id === ev.schoolId);
            const question = questions.find((q) => q.id === ev.questionId);

            return (
              <EvidenceReviewCard
                key={ev.id}
                evidence={ev}
                school={school}
                question={question}
                onApprove={handleApprove}
                onOpenRejectModal={setRejectModalEvidence}
              />
            );
          })}
        </div>
      )}

      {/* 4. Rejection Modal */}
      {rejectModalEvidence && (
        <EvidenceRejectModal
          evidence={rejectModalEvidence}
          onClose={() => setRejectModalEvidence(null)}
          onConfirmReject={handleConfirmReject}
        />
      )}
    </div>
  );
}
