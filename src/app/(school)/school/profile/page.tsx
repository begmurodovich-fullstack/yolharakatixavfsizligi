'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { useToast } from '@/components/ui/toast';
import { School } from '@/types';

import {
  SchoolInfoCard,
  CoordinateManagerCard,
  SecurityPasswordCard,
} from '@/features/profile/components';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { MapPin, School as SchoolIcon } from 'lucide-react';

export default function SchoolProfilePage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [school, setSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    } catch (err: any) {
      console.error('Profile load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Profil ma’lumotlarini yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle director update
  const handleUpdateDirector = async (directorName: string, studentCount: number) => {
    if (!school || !user) return;
    try {
      const updated = await schoolService.updateSchoolProfile(
        school.id,
        { directorName, studentCount },
        user
      );
      setSchool(updated);
      success('Maktab ma’lumotlari muvaffaqiyatli saqlandi!', 'Yangilandi');
    } catch (err: any) {
      toastError(err?.message || 'Ma’lumotlarni saqlashda xatolik', 'Xatolik');
    }
  };

  // Handle coordinates update
  const handleSubmitCoordinates = async (
    lat: number,
    lng: number,
    addressNotes: string
  ) => {
    if (!school || !user) return;
    try {
      const updated = await schoolService.updateSchoolCoordinates(
        school.id,
        lat,
        lng,
        addressNotes,
        user
      );
      setSchool(updated);
      success('Koordinatalar tasdiqlash uchun yuborildi!', 'Yuborildi');
    } catch (err: any) {
      toastError(err?.message || 'Koordinatalarni yuborishda xatolik', 'Xatolik');
    }
  };

  // Handle password update
  const handleChangePassword = async (oldPass: string, newPass: string) => {
    if (!user) return;
    try {
      await schoolService.changePassword(user.id, oldPass, newPass, user);
      success('Hisob paroli muvaffaqiyatli yangilandi!', 'Xavfsizlik');
    } catch (err: any) {
      toastError(err?.message || 'Parolni yangilashda xatolik', 'Xatolik');
      throw err;
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  // Error state
  if (hasError || !school) {
    return (
      <div className="py-12">
        <ErrorState
          title="Profilni yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <SchoolIcon className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-semibold text-slate-800">{school.name}</span>
            <span>•</span>
            <span>{school.districtName}</span>
            <span>•</span>
            <span>{school.regionName}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Geolokatsiya va Muassasa Profili
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Maktab geolokatsiyasini xaritada belgilash, mas’ul ma’lumotlarini yangilash va hisob xavfsizligini boshqarish.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-900 border border-teal-200 text-xs font-mono font-bold w-fit">
          <MapPin className="w-4 h-4 text-teal-600" />
          <span>{school.coordinates.latitude.toFixed(4)}, {school.coordinates.longitude.toFixed(4)}</span>
        </div>
      </div>

      {/* 2. School Main Information */}
      <SchoolInfoCard
        school={school}
        onUpdateDirector={handleUpdateDirector}
      />

      {/* 3. Coordinate & Map Manager */}
      <CoordinateManagerCard
        school={school}
        onSubmitCoordinates={handleSubmitCoordinates}
      />

      {/* 4. Security & Password Manager */}
      <SecurityPasswordCard onChangePassword={handleChangePassword} />
    </div>
  );
}
