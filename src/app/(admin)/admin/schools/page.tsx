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
import { School as SchoolIcon } from 'lucide-react';

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

  // Modals
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const [allSchools, allRegions, allDistricts] = await Promise.all([
        schoolService.getSchools(),
        schoolService.getRegions(),
        schoolService.getDistricts(),
      ]);
      setSchools(allSchools);
      setRegions(allRegions);
      setDistricts(allDistricts);
    } catch (err: any) {
      console.error('Admin schools load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Maktablar ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle cascading districts
  const filteredDistricts = useMemo(() => {
    if (selectedRegionId === 'ALL') return districts;
    return districts.filter((d) => d.regionId === selectedRegionId);
  }, [districts, selectedRegionId]);

  // Handle multi-level filter matching
  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      // Region filter
      if (selectedRegionId !== 'ALL' && school.regionId !== selectedRegionId) return false;

      // District filter
      if (selectedDistrictId !== 'ALL' && school.districtId !== selectedDistrictId) return false;

      // Score status filter
      if (selectedScoreStatus !== 'ALL') {
        const score = school.currentScore;
        if (selectedScoreStatus === 'GREEN' && score < 80) return false;
        if (selectedScoreStatus === 'YELLOW' && (score < 50 || score >= 80)) return false;
        if (selectedScoreStatus === 'RED' && score >= 50) return false;
      }

      // Coordinate status filter
      if (selectedCoordStatus !== 'ALL' && school.coordinateStatus !== selectedCoordStatus) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = school.name.toLowerCase().includes(q);
        const matchNumber = school.schoolNumber.includes(q);
        const matchDirector = school.directorName.toLowerCase().includes(q);
        const matchDistrict = school.districtName.toLowerCase().includes(q);
        if (!matchName && !matchNumber && !matchDirector && !matchDistrict) return false;
      }

      return true;
    });
  }, [
    schools,
    selectedRegionId,
    selectedDistrictId,
    selectedScoreStatus,
    selectedCoordStatus,
    searchQuery,
  ]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegionId('ALL');
    setSelectedDistrictId('ALL');
    setSelectedScoreStatus('ALL');
    setSelectedCoordStatus('ALL');
    setSearchQuery('');
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

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="py-12">
        <ErrorState
          title="Maktablarni yuklab bo‘lmadi"
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
            <SchoolIcon className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Milliy Reyestr</span>
            <span>•</span>
            <span>Umumiy ta’lim muassasalari</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Respublika Maktablar Reyestri
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Maktablar yo‘l xavfsizligi holati, hisoblar xavfsizligi va geolokatsiya statuslarini markazlashtirilgan boshqarish.
          </p>
        </div>
      </div>

      {/* 2. Cascading Filter Bar */}
      <SchoolFilterBar
        regions={regions}
        districts={filteredDistricts}
        selectedRegionId={selectedRegionId}
        onRegionChange={setSelectedRegionId}
        selectedDistrictId={selectedDistrictId}
        onDistrictChange={setSelectedDistrictId}
        selectedScoreStatus={selectedScoreStatus}
        onScoreStatusChange={setSelectedScoreStatus}
        selectedCoordStatus={selectedCoordStatus}
        onCoordStatusChange={setSelectedCoordStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleResetFilters}
        totalResults={filteredSchools.length}
      />

      {/* 3. Schools Admin Table */}
      <SchoolAdminTable
        schools={filteredSchools}
        onViewSchool={setSelectedSchool}
        onResetPassword={handleResetPassword}
        onToggleStatus={handleToggleStatus}
      />

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
