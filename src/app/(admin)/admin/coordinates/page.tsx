'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { adminService } from '@/services/adminService';
import { useToast } from '@/components/ui/toast';
import { School, CoordinateStatus, Region, District } from '@/types';

import { CoordinateVerificationCard } from '@/features/admin/components';

import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Search,
  Check,
  X,
  CheckSquare,
  Square,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/cn';

export default function AdminCoordinatesPage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [schools, setSchools] = useState<School[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Filter States
  const [selectedRegionId, setSelectedRegionId] = useState<string>('ALL');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<CoordinateStatus | 'ALL'>(CoordinateStatus.PENDING);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load regions & districts initially
  useEffect(() => {
    Promise.all([schoolService.getRegions(), schoolService.getDistricts()])
      .then(([regList, distList]) => {
        setRegions(regList);
        setDistricts(distList);
      })
      .catch((err) => console.error('Error loading regions/districts:', err));
  }, []);

  // Fetch schools from PostgreSQL based on filters
  const fetchCoordinates = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setSelectedIds(new Set()); // clear selection on reload

    try {
      const data = await schoolService.getSchools({
        regionId: selectedRegionId !== 'ALL' ? selectedRegionId : undefined,
        districtId: selectedDistrictId !== 'ALL' ? selectedDistrictId : undefined,
        coordinateStatus: statusFilter !== 'ALL' ? statusFilter : undefined,
        searchQuery: searchQuery.trim() || undefined,
        limit: 500,
      });

      const validCoords = (data || []).filter(
        (s) => s.coordinates?.latitude != null && s.coordinates?.longitude != null
      );

      setSchools(validCoords);
    } catch (err: any) {
      console.error('Admin coordinates load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || "Geolokatsiya ma'lumotlarini yuklashda xatolik.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedRegionId, selectedDistrictId, statusFilter, searchQuery]);

  useEffect(() => {
    fetchCoordinates();
  }, [fetchCoordinates]);

  // Cascading districts
  const filteredDistricts = useMemo(() => {
    if (selectedRegionId === 'ALL') return districts;
    return districts.filter((d) => d.regionId === selectedRegionId);
  }, [districts, selectedRegionId]);

  // ----- Single Actions -----
  const handleVerify = async (schoolId: string) => {
    if (!user) return;
    try {
      const updated = await adminService.verifyCoordinates(schoolId, CoordinateStatus.VERIFIED, user);
      setSchools((prev) => prev.filter((s) => s.id !== schoolId));
      setSelectedIds((prev) => { const n = new Set(prev); n.delete(schoolId); return n; });
      success(`${updated.name} koordinatalari tasdiqlandi va xaritaga qo'shildi!`, 'Tasdiqlandi ✅');
    } catch (e: any) {
      toastError(e?.message || 'Tasdiqlashda xatolik', 'Xatolik');
    }
  };

  const handleReject = async (schoolId: string) => {
    if (!user) return;
    try {
      const updated = await adminService.verifyCoordinates(schoolId, CoordinateStatus.REJECTED, user);
      setSchools((prev) => prev.filter((s) => s.id !== schoolId));
      setSelectedIds((prev) => { const n = new Set(prev); n.delete(schoolId); return n; });
      success(`${updated.name} koordinatalari rad etildi.`, 'Rad etildi ❌');
    } catch (e: any) {
      toastError(e?.message || 'Rad etishda xatolik', 'Xatolik');
    }
  };

  // ----- Bulk Selection -----
  const allPendingIds = useMemo(
    () => schools.filter((s) => s.coordinateStatus === CoordinateStatus.PENDING).map((s) => s.id),
    [schools]
  );

  const allSelected = allPendingIds.length > 0 && allPendingIds.every((id) => selectedIds.has(id));
  const someSelected = selectedIds.size > 0;

  const handleToggleSelect = (schoolId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(schoolId)) next.delete(schoolId);
      else next.add(schoolId);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allPendingIds));
    }
  };

  // ----- Bulk Actions -----
  const handleBulkVerify = async () => {
    if (!user || selectedIds.size === 0) return;
    setIsBulkLoading(true);
    const ids = Array.from(selectedIds);
    let doneCount = 0;
    let failCount = 0;

    for (const id of ids) {
      try {
        await adminService.verifyCoordinates(id, CoordinateStatus.VERIFIED, user);
        setSchools((prev) => prev.filter((s) => s.id !== id));
        doneCount++;
      } catch {
        failCount++;
      }
    }

    setSelectedIds(new Set());
    setIsBulkLoading(false);
    success(
      `${doneCount} ta maktab koordinatalari tasdiqlandi${failCount > 0 ? `, ${failCount} ta xatolik` : ''}.`,
      'Ommaviy tasdiqlash ✅'
    );
  };

  const handleBulkReject = async () => {
    if (!user || selectedIds.size === 0) return;
    setIsBulkLoading(true);
    const ids = Array.from(selectedIds);
    let doneCount = 0;
    let failCount = 0;

    for (const id of ids) {
      try {
        await adminService.verifyCoordinates(id, CoordinateStatus.REJECTED, user);
        setSchools((prev) => prev.filter((s) => s.id !== id));
        doneCount++;
      } catch {
        failCount++;
      }
    }

    setSelectedIds(new Set());
    setIsBulkLoading(false);
    success(
      `${doneCount} ta maktab koordinatalari rad etildi${failCount > 0 ? `, ${failCount} ta xatolik` : ''}.`,
      'Ommaviy rad etish ❌'
    );
  };

  const pendingCount = schools.length;

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Geodeziya va Xarita</span>
            <span>•</span>
            <span>Maktablar joylashuvini tasdiqlash</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Geolokatsiya Koordinatalarini Tasdiqlash
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Maktab mas'ullari kiritgan GPS koordinatalarini tekshirish va tasdiqlash. Faqat tasdiqlangan maktablar ommaviy xaritada aks etadi.
          </p>
        </div>

        {pendingCount > 0 ? (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-bold w-fit">
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

      {/* 2. Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { value: CoordinateStatus.PENDING, label: 'Kutilmoqda', color: 'amber' },
              { value: CoordinateStatus.VERIFIED, label: 'Tasdiqlangan', color: 'emerald' },
              { value: CoordinateStatus.REJECTED, label: 'Rad etilgan', color: 'rose' },
              { value: 'ALL' as const, label: 'Barchasi', color: 'slate' },
            ].map(({ value, label, color }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
                  statusFilter === value
                    ? `bg-${color}-600 text-white shadow-2xs`
                    : `bg-${color}-50 text-${color}-900 border border-${color}-200 hover:bg-${color}-100`
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Natija: <strong className="text-slate-900">{schools.length} ta</strong>
          </span>
        </div>

        {/* Cascading Region + District + Search */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Viloyat:</label>
            <select
              value={selectedRegionId}
              onChange={(e) => { setSelectedRegionId(e.target.value); setSelectedDistrictId('ALL'); }}
              className="w-full text-xs h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold px-3 focus:ring-slate-900 focus:border-slate-900"
            >
              <option value="ALL">Barcha viloyatlar</option>
              {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Tuman:</label>
            <select
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              disabled={filteredDistricts.length === 0}
              className="w-full text-xs h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold px-3 focus:ring-slate-900 focus:border-slate-900 disabled:opacity-50"
            >
              <option value="ALL">Barcha tumanlar</option>
              {filteredDistricts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Qidiruv:</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Maktab nomi yoki raqami..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs h-10 pl-9 rounded-xl border-slate-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bulk Action Toolbar — shows when 1+ selected */}
      {someSelected && (
        <div className="sticky top-20 z-20 rounded-2xl border border-teal-300 bg-teal-50 p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
            >
              {allSelected ? (
                <CheckSquare className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              {allSelected ? 'Hammasini bekor qilish' : 'Hammasini tanlash'}
            </button>
            <span className="text-xs font-mono font-bold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-300">
              {selectedIds.size} ta tanlangan
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedIds(new Set())}
              disabled={isBulkLoading}
              className="text-xs border-slate-300 text-slate-600 rounded-xl h-9 px-4"
            >
              Bekor qilish
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleBulkReject}
              disabled={isBulkLoading}
              className="text-xs font-bold border-rose-300 text-rose-700 hover:bg-rose-50 rounded-xl h-9 px-4 gap-1.5"
            >
              {isBulkLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <X className="w-3.5 h-3.5" />
              )}
              {selectedIds.size} tasini rad etish
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleBulkVerify}
              disabled={isBulkLoading}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl h-9 px-4 shadow-xs gap-1.5"
            >
              {isBulkLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              {selectedIds.size} tasini tasdiqlash
            </Button>
          </div>
        </div>
      )}

      {/* 4. Select All + Count row (above cards, only when PENDING shown) */}
      {!isLoading && schools.length > 0 && statusFilter === CoordinateStatus.PENDING && (
        <div className="flex items-center justify-between px-1">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            {allSelected ? (
              <CheckSquare className="w-4 h-4 text-teal-600" />
            ) : (
              <Square className="w-4 h-4 text-slate-400" />
            )}
            <span>{allSelected ? 'Hammasini belgilashni olib tashlash' : `Barchasini tanlash (${allPendingIds.length} ta)`}</span>
          </button>
          <span className="text-xs text-slate-400 font-mono">
            {selectedIds.size} / {allPendingIds.length} tanlangan
          </span>
        </div>
      )}

      {/* 5. Cards Grid or Empty / Loading / Error State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      ) : hasError ? (
        <div className="py-12 bg-white rounded-2xl border border-slate-200">
          <ErrorState
            title="Koordinatalarni yuklab bo'lmadi"
            message={errorMessage || "Ma'lumotlarni olishda xatolik yuz berdi."}
            onRetry={fetchCoordinates}
          />
        </div>
      ) : schools.length === 0 ? (
        <div className="py-16 bg-white rounded-2xl border border-slate-200">
          <EmptyState
            icon={CheckCircle2}
            title={
              statusFilter === CoordinateStatus.PENDING
                ? "Tasdiqlash kutilayotgan geolokatsiyalar yo'q (0 ta)"
                : "Ushbu filtr bo'yicha geolokatsiyalar topilmadi"
            }
            description={
              statusFilter === CoordinateStatus.PENDING
                ? "Hozircha hech bir maktab o'z GPS lokatsiyasini yubormadi. Maktab direktori birinchi marta tizimga kirib koordinata kiritgach, bu yerda paydo bo'ladi."
                : "Tanlangan viloyat yoki tuman bo'yicha mos keluvchi maktablar topilmadi."
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <CoordinateVerificationCard
              key={school.id}
              school={school}
              isSelected={selectedIds.has(school.id)}
              onToggleSelect={handleToggleSelect}
              onVerify={handleVerify}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
