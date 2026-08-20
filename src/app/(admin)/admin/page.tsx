'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { adminService, AdminDashboardSummary } from '@/services/adminService';
import { AuditLog } from '@/types';
import {
  AdminStatGrid,
  RegionalDistributionCard,
  PendingQueueCard,
  RecentAuditLogsCard,
} from '@/features/admin/components';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { ShieldCheck, Calendar, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const [dashSummary, auditLogs] = await Promise.all([
        adminService.getDashboardSummary(),
        adminService.getAuditLogs(5),
      ]);
      setSummary(dashSummary);
      setLogs(auditLogs);
    } catch (err: any) {
      console.error('Admin dashboard load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Dashboard ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-36 rounded-2xl" />
        </div>
        <Skeleton className="h-80 w-full rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (hasError || !summary) {
    return (
      <div className="py-12">
        <ErrorState
          title="Dashboard ma’lumotlarini yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">O‘zbekiston Respublikasi</span>
            <span>•</span>
            <span>Ichki Ishlar Vazirligi JXD YHXX</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Maktablar Yo‘l Xavfsizligi Boshqaruv Markazi
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Respublika bo‘yicha maktablar xavfsizlik monitoringi, geolokatsiya tasdiqlash va foto-dalillar ekspertizasi.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold w-fit">
          <Calendar className="w-3.5 h-3.5 text-teal-400" />
          <span>2025-2026 Bahorgi monitoring</span>
        </span>
      </div>

      {/* 2. Top KPI Cards */}
      <AdminStatGrid summary={summary} />

      {/* 3. Regional Score Breakdown */}
      <RegionalDistributionCard regionalBreakdown={summary.regionalBreakdown} />

      {/* 4. Action Queue & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PendingQueueCard
          pendingEvidenceCount={summary.pendingEvidenceCount}
          pendingCoordinatesCount={summary.pendingCoordinatesCount}
          pendingAssessmentsCount={summary.pendingAssessmentsCount}
        />
        <RecentAuditLogsCard logs={logs} />
      </div>
    </div>
  );
}
