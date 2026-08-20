'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { adminService } from '@/services/adminService';
import { useToast } from '@/components/ui/toast';
import { School, CoordinateStatus, Region } from '@/types';

import { CoordinateVerificationCard } from '@/features/admin/components';

import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { MapPin, Filter, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function AdminCoordinatesPage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [schools, setSchools] = useState<School[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  const [statusFilter, setStatusFilter] = useState<CoordinateStatus | 'ALL'>('ALL');
  const [regionFilter, setRegionFilter] = useState('ALL');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const [allSchools, allRegions] = await Promise.all([
        schoolService.getSchools(),
        schoolService.getRegions(),
      ]);
      setSchools(allSchools);
      setRegions(allRegions);
    } catch (err: any) {
      console.error('Admin coordinates load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Geolokatsiya ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Verify
  const handleVerify = async (schoolId: string) => {
    if (!user) return;
    try {
      const updated = await adminService.verifyCoordinates(
        schoolId,
        CoordinateStatus.VERIFIED,
        user
      );
      setSchools((prev) => prev.map((s) => (s.id === schoolId ? updated : s)));
      success(
        `${updated.name} koordinatalari tasdiqlandi va ommaviy xaritaga qo‘shildi!`,
        'Tasdiqlandi'
      );
    } catch (e: any) {
      toastError(e?.message || 'Tasdiqlashda xatolik', 'Xatolik');
    }
  };

  // Handle Reject
  const handleReject = async (schoolId: string) => {
    if (!user) return;
    try {
      const updated = await adminService.verifyCoordinates(
        schoolId,
        CoordinateStatus.REJECTED,
        user
      );
      setSchools((prev) => prev.map((s) => (s.id === schoolId ? updated : s)));
      success(
        `${updated.name} koordinatalari rad etildi va qayta kiritish uchun maktabga yuborildi.`,
        'Rad etildi'
      );
    } catch (e: any) {
      toastError(e?.message || 'Rad etishda xatolik', 'Xatolik');
    }
  };

  // Filter schools
  const filteredSchools = useMemo(() => {
    return schools.filter((s) => {
      if (statusFilter !== 'ALL' && s.coordinateStatus !== statusFilter) return false;
      if (regionFilter !== 'ALL' && s.regionId !== regionFilter) return false;
      return true;
    });
  }, [schools, statusFilter, regionFilter]);

  const pendingCount = schools.filter(
    (s) => s.coordinateStatus === CoordinateStatus.PENDING
  ).length;

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="py-12">
        <ErrorState
          title="Koordinatalarni yuklab bo‘lmadi"
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
            <MapPin className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Geodeziya va Xarita</span>
            <span>•</span>
            <span>Maktablar joylashuvi</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Geolokatsiya Koordinatalarini Tasdiqlash
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Maktab mas’ullari kiritgan GPS koordinatalarini tekshirish va tasdiqlash. Faqat tasdiqlangan maktablar ommaviy respublika xaritasida aks etadi.
          </p>
        </div>

        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-bold w-fit">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{pendingCount} ta maktab tekshiruv kutmoqda</span>
          </span>
        )}
      </div>

      {/* 2. Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 overflow-x-auto">
          <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold px-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Holat:</span>
          </div>

          {[
            { id: 'ALL', label: `Barchasi (${schools.length})` },
            { id: CoordinateStatus.PENDING, label: `Kutilmoqda (${pendingCount})` },
            {
              id: CoordinateStatus.VERIFIED,
              label: `Tasdiqlangan (${schools.filter((s) => s.coordinateStatus === CoordinateStatus.VERIFIED).length})`,
            },
            {
              id: CoordinateStatus.REJECTED,
              label: `Rad etilgan (${schools.filter((s) => s.coordinateStatus === CoordinateStatus.REJECTED).length})`,
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

        {/* Region Filter */}
        <div className="w-full sm:w-56">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="ALL">Barcha viloyatlar</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Coordinates Grid */}
      {filteredSchools.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="Koordinatalar topilmadi"
          description="Tanlangan filtrlar bo‘yicha hozircha hech qanday maktab geolokatsiyasi mavjud emas."
          className="py-16"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <CoordinateVerificationCard
              key={school.id}
              school={school}
              onVerify={handleVerify}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
