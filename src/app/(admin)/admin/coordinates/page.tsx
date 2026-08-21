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
import { MapPin, Filter, Clock, CheckCircle2, Search, RotateCcw } from 'lucide-react';
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

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Load regions & districts initially
  useEffect(() => {
    Promise.all([schoolService.getRegions(), schoolService.getDistricts()])
      .then(([regList, distList]) => {
        setRegions(regList);
        setDistricts(distList);
      })
      .catch((err) => console.error('Error loading regions/districts:', err));
  }, []);

  // 2. Fetch coordinates based on Region, District, Status & Search from PostgreSQL API
  const fetchCoordinates = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await schoolService.getSchools({
        regionId: selectedRegionId !== 'ALL' ? selectedRegionId : undefined,
        districtId: selectedDistrictId !== 'ALL' ? selectedDistrictId : undefined,
        coordinateStatus: statusFilter !== 'ALL' ? statusFilter : undefined,
        searchQuery: searchQuery.trim() || undefined,
        limit: 500,
      });

      // Filter only schools that have actual coordinates submitted (latitude is not null)
      const validCoords = (data || []).filter(
        (s) => s.coordinates?.latitude != null && s.coordinates?.longitude != null
      );

      setSchools(validCoords);
    } catch (err: any) {
      console.error('Admin coordinates load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Geolokatsiya ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedRegionId, selectedDistrictId, statusFilter, searchQuery]);

  useEffect(() => {
    fetchCoordinates();
  }, [fetchCoordinates]);

  // Handle cascading districts for selected region
  const filteredDistricts = useMemo(() => {
    if (selectedRegionId === 'ALL') return districts;
    return districts.filter((d) => d.regionId === selectedRegionId);
  }, [districts, selectedRegionId]);

  // Handle Verify Action
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

  // Handle Reject Action
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

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegionId('ALL');
    setSelectedDistrictId('ALL');
    setStatusFilter(CoordinateStatus.PENDING);
    setSearchQuery('');
  };

  const pendingCount = schools.filter(
    (s) => s.coordinateStatus === CoordinateStatus.PENDING
  ).length;

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
            Maktab mas’ullari kiritgan GPS koordinatalarini hududlar va tumanlar kesimida tekshirish va tasdiqlash.
          </p>
        </div>

        {statusFilter === CoordinateStatus.PENDING && pendingCount > 0 ? (
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

      {/* 2. Full Cascading Filter Bar: Status + Region + District + Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStatusFilter(CoordinateStatus.PENDING)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
                statusFilter === CoordinateStatus.PENDING
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              )}
            >
              Tasdiqlash kutilmoqda
            </button>

            <button
              onClick={() => setStatusFilter(CoordinateStatus.VERIFIED)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
                statusFilter === CoordinateStatus.VERIFIED
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
              )}
            >
              Tasdiqlanganlar
            </button>

            <button
              onClick={() => setStatusFilter(CoordinateStatus.REJECTED)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
                statusFilter === CoordinateStatus.REJECTED
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100'
              )}
            >
              Rad etilganlar
            </button>

            <button
              onClick={() => setStatusFilter('ALL')}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              Barcha Yuborilganlar
            </button>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            Natija: <strong className="text-slate-900">{schools.length} ta maktab</strong>
          </span>
        </div>

        {/* Cascading Dropdowns & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Region Dropdown */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Viloyatni tanlang:
            </label>
            <select
              value={selectedRegionId}
              onChange={(e) => {
                setSelectedRegionId(e.target.value);
                setSelectedDistrictId('ALL');
              }}
              className="w-full text-xs h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold px-3 focus:ring-slate-900 focus:border-slate-900"
            >
              <option value="ALL">Barcha viloyatlar (Respublika)</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Cascading Dropdown */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Tumanni tanlang:
            </label>
            <select
              value={selectedDistrictId}
              disabled={selectedRegionId === 'ALL' && filteredDistricts.length === 0}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="w-full text-xs h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold px-3 focus:ring-slate-900 focus:border-slate-900 disabled:opacity-50"
            >
              <option value="ALL">
                {selectedRegionId === 'ALL' ? 'Barcha tumanlar' : 'Barcha tumanlar (Tanlangan viloyat)'}
              </option>
              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Maktab nomi yoki raqami:
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="masalan: 24 yoki Qiziltepa"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs h-10 pl-9 rounded-xl border-slate-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Cards Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      ) : hasError ? (
        <div className="py-12 bg-white rounded-2xl border border-slate-200">
          <ErrorState
            title="Koordinatalarni yuklab bo‘lmadi"
            message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
            onRetry={fetchCoordinates}
          />
        </div>
      ) : schools.length === 0 ? (
        <div className="py-16 bg-white rounded-2xl border border-slate-200 text-center">
          <EmptyState
            icon={CheckCircle2}
            title={
              statusFilter === CoordinateStatus.PENDING
                ? 'Tasdiqlash kutilayotgan geolokatsiyalar yo‘q (0 ta)'
                : 'Ushbu filtr bo‘yicha geolokatsiyalar topilmadi'
            }
            description={
              statusFilter === CoordinateStatus.PENDING
                ? 'Hozircha tanlangan hududda hech bir maktab o‘z GPS lokatsiyasini yubormadi. Maktab direktori birinchi marta tizimga kirib koordinata kiritgach, bu yerda tekshirish uchun paydo bo‘ladi.'
                : 'Tanlangan viloyat yoki tuman bo‘yicha mos keluvchi maktablar topilmadi.'
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
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
