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
      // Query ONLY schools with PENDING coordinates from PostgreSQL API
      const [pendingSchools, allRegions] = await Promise.all([
        schoolService.getSchools({ coordinateStatus: CoordinateStatus.PENDING }),
        schoolService.getRegions(),
      ]);

      const submittedCoords = (pendingSchools || []).filter(
        (s) => s.coordinates?.latitude != null && s.coordinates?.longitude != null
      );

      setSchools(submittedCoords);
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
      setSchools((prev) => prev.filter((s) => s.id !== schoolId));
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
      setSchools((prev) => prev.filter((s) => s.id !== schoolId));
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
      if (s.coordinates?.latitude == null || s.coordinates?.longitude == null) return false;
      if (statusFilter !== 'ALL' && s.coordinateStatus !== statusFilter) return false;
      if (regionFilter !== 'ALL' && s.regionId !== regionFilter) return false;
      return true;
    });
  }, [schools, statusFilter, regionFilter]);

  const pendingCount = schools.length;

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

        {pendingCount > 0 ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-bold w-fit">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{pendingCount} ta maktab tekshiruv kutmoqda</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold w-fit">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kutilayotgan navbat toza (0 ta)</span>
          </span>
        )}
      </div>

      {/* 2. Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            Tasdiqlash kutilmoqda ({pendingCount})
          </button>
        </div>

        {/* Region Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="text-xs h-9 rounded-xl border-slate-200 bg-slate-50 text-slate-800 font-semibold px-3 py-1 focus:ring-slate-900 focus:border-slate-900 w-full sm:w-56"
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

      {/* 3. Cards Grid */}
      {filteredSchools.length === 0 ? (
        <div className="py-16 bg-white rounded-2xl border border-slate-200 text-center">
          <EmptyState
            icon={CheckCircle2}
            title="Tasdiqlash kutilayotgan geolokatsiyalar yo‘q (0 ta)"
            description="Hozircha hech bir maktab o‘z GPS lokatsiyasini yubormadi. Maktab direktori birinchi marta tizimga kirib yoki profilidan koordinata yuborganda, ushbu navbatda tekshirish uchun paydo bo‘ladi."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <CoordinateVerificationCard
              key={school.id}
              school={school}
              onVerify={() => handleVerify(school.id)}
              onReject={() => handleReject(school.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
