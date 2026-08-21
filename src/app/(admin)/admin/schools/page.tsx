'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { adminService } from '@/services/adminService';
import { useToast } from '@/components/ui/toast';
import {
  School,
  Region,
  District,
  ScoreStatus,
  CoordinateStatus,
} from '@/types';

import {
  SchoolFilterBar,
  SchoolAdminTable,
  SchoolDetailModal,
} from '@/features/admin/components';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { School as SchoolIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSchoolsPage() {
  const { user } = useAuth();
  const { success, info } = useToast();

  const [schools, setSchools] = useState<School[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  // Filters
  const [selectedRegionId, setSelectedRegionId] = useState('ALL');
  const [selectedDistrictId, setSelectedDistrictId] = useState('ALL');
  const [selectedScoreStatus, setSelectedScoreStatus] = useState<ScoreStatus | 'ALL'>('ALL');
  const [selectedCoordStatus, setSelectedCoordStatus] = useState<CoordinateStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 50;

  // Modals
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Initial load regions & districts
  useEffect(() => {
    Promise.all([schoolService.getRegions(), schoolService.getDistricts()])
      .then(([regList, distList]) => {
        setRegions(regList);
        setDistricts(distList);
      })
      .catch((err) => console.error('Error loading regions/districts:', err));
  }, []);

  // 2. Fetch schools dynamically from PostgreSQL on filter / search / page change
  const fetchSchools = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await schoolService.getSchools({
        regionId: selectedRegionId !== 'ALL' ? selectedRegionId : undefined,
        districtId: selectedDistrictId !== 'ALL' ? selectedDistrictId : undefined,
        scoreStatus: selectedScoreStatus !== 'ALL' ? selectedScoreStatus : undefined,
        coordinateStatus: selectedCoordStatus !== 'ALL' ? selectedCoordStatus : undefined,
        searchQuery: searchQuery.trim() || undefined,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      setSchools(data);
    } catch (err: any) {
      console.error('Admin schools load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Maktablar ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedRegionId,
    selectedDistrictId,
    selectedScoreStatus,
    selectedCoordStatus,
    searchQuery,
    page,
    pageSize,
  ]);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  // Handle cascading districts
  const filteredDistricts = useMemo(() => {
    if (selectedRegionId === 'ALL') return districts;
    return districts.filter((d) => d.regionId === selectedRegionId);
  }, [districts, selectedRegionId]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegionId('ALL');
    setSelectedDistrictId('ALL');
    setSelectedScoreStatus('ALL');
    setSelectedCoordStatus('ALL');
    setSearchQuery('');
    setPage(1);
  };

  // Reset Password Action
  const handleResetPassword = async (schoolId: string) => {
    if (!user) return;
    try {
      const defaultPass = await adminService.resetSchoolPassword(schoolId, user);
      info(
        `Maktab paroli boshlang‘ich holatga tiklandi: ${defaultPass}`,
        'Parol yangilandi'
      );
    } catch (e: any) {
      console.error('Password reset failed:', e);
    }
  };

  // Toggle School Active/Inactive
  const handleToggleStatus = async (schoolId: string) => {
    if (!user) return;
    try {
      const updated = await adminService.toggleSchoolStatus(schoolId, user);
      setSchools((prev) => prev.map((s) => (s.id === schoolId ? updated : s)));
      if (selectedSchool?.id === schoolId) {
        setSelectedSchool(updated);
      }
      success(`Maktab holati o‘zgartirildi: ${updated.status}`, 'Status yangilandi');
    } catch (e: any) {
      console.error('Status toggle failed:', e);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <SchoolIcon className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Milliy Reyestr</span>
            <span>•</span>
            <span>10 110 ta umumiy ta’lim muassasasi</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Respublika Maktablar Reyestri
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            O‘zbekistondagi barcha 10 110 ta maktabning yo‘l xavfsizligi holati, hisoblar xavfsizligi va geolokatsiya statuslarini markazlashtirilgan boshqarish.
          </p>
        </div>
      </div>

      {/* 2. Cascading Filter Bar */}
      <SchoolFilterBar
        regions={regions}
        districts={filteredDistricts}
        selectedRegionId={selectedRegionId}
        onRegionChange={(val) => {
          setSelectedRegionId(val);
          setSelectedDistrictId('ALL');
          setPage(1);
        }}
        selectedDistrictId={selectedDistrictId}
        onDistrictChange={(val) => {
          setSelectedDistrictId(val);
          setPage(1);
        }}
        selectedScoreStatus={selectedScoreStatus}
        onScoreStatusChange={(val) => {
          setSelectedScoreStatus(val);
          setPage(1);
        }}
        selectedCoordStatus={selectedCoordStatus}
        onCoordStatusChange={(val) => {
          setSelectedCoordStatus(val);
          setPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setPage(1);
        }}
        onReset={handleResetFilters}
        totalResults={schools.length}
      />

      {/* 3. Schools Admin Table */}
      {isLoading ? (
        <div className="p-12 text-center space-y-3 bg-white rounded-2xl border border-slate-200">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : hasError ? (
        <div className="py-12 bg-white rounded-2xl border border-slate-200">
          <ErrorState
            title="Maktablarni yuklab bo‘lmadi"
            message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
            onRetry={fetchSchools}
          />
        </div>
      ) : (
        <>
          <SchoolAdminTable
            schools={schools}
            onViewSchool={setSelectedSchool}
            onResetPassword={handleResetPassword}
            onToggleStatus={handleToggleStatus}
          />

          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs text-xs">
            <div className="text-slate-500 font-mono">
              Sahifa: <strong className="text-slate-900">{page}</strong> (Har sahifada {pageSize} ta maktab)
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1 || isLoading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="gap-1 rounded-xl h-9"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Oldingi</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={schools.length < pageSize || isLoading}
                onClick={() => setPage((p) => p + 1)}
                className="gap-1 rounded-xl h-9"
              >
                <span>Keyingi</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* 4. Details Modal */}
      {selectedSchool && (
        <SchoolDetailModal
          school={selectedSchool}
          onClose={() => setSelectedSchool(null)}
          onResetPassword={handleResetPassword}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
}
