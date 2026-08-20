'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { schoolService } from '@/services/schoolService';
import { School } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { apiClient } from '@/lib/apiClient';
import { GpsLocationPicker } from '@/components/common/GpsLocationPicker';
import {
  ShieldCheck,
  KeyRound,
  UserCheck,
  MapPin,
  Compass,
  Navigation,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Users,
  Eye,
  EyeOff,
  Sparkles,
  School as SchoolIcon,
  Globe,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { success, error: toastError } = useToast();

  const [school, setSchool] = useState<School | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Director & Students
  const [directorName, setDirectorName] = useState('');
  const [studentCount, setStudentCount] = useState<number>(750);

  // Step 3: Coordinates
  const [latitude, setLatitude] = useState('40.1032');
  const [longitude, setLongitude] = useState('64.6756');
  const [addressNotes, setAddressNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load user's school data from PostgreSQL
  useEffect(() => {
    async function loadSchool() {
      if (!isAuthLoading) {
        if (!user) {
          router.push('/login');
          return;
        }

        if (!user.isFirstLogin) {
          router.push('/school');
          return;
        }

        try {
          if (user.schoolId) {
            const sch = await schoolService.getSchoolById(user.schoolId);
            if (sch) {
              setSchool(sch);
              setDirectorName(sch.directorName || '');
              setStudentCount(sch.studentCount || 750);
              if (sch.coordinates) {
                setLatitude(sch.coordinates.latitude?.toString() || '40.1032');
                setLongitude(sch.coordinates.longitude?.toString() || '64.6756');
                setAddressNotes(
                  sch.coordinates.addressNotes ||
                    `${sch.name} asosiy kirish darvozasi ro‘parasida`
                );
              }
            }
          }
        } catch (e) {
          console.error('Error loading school for onboarding:', e);
        } finally {
          setIsDataLoading(false);
        }
      }
    }

    loadSchool();
  }, [user, isAuthLoading, router]);

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1) {
      if (newPassword.length < 6) {
        setErrorMessage('Yangi parol kamida 6 ta belgidan iborat bo‘lishi lozim');
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage('Kiritilgan parollar bir-biriga mos kelmadi');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!directorName.trim()) {
        setErrorMessage('Direktor F.I.Sh. kiritilishi shart');
        return;
      }
      if (!studentCount || Number(studentCount) <= 0) {
        setErrorMessage('O‘quvchilar soni to‘g‘ri kiritilishi shart');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response: any = await apiClient('/auth/onboarding', {
        method: 'POST',
        body: JSON.stringify({
          userId: user?.id,
          schoolId: school?.id || user?.schoolId,
          newPassword,
          directorName,
          studentCount: Number(studentCount),
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          addressNotes,
        }),
      });

      // Update local stored session
      const stored = localStorage.getItem('uz_road_safety_auth_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(
          'uz_road_safety_auth_user',
          JSON.stringify({
            ...parsed,
            isFirstLogin: false,
          })
        );
      }

      success(
        'Dastlabki sozlash muvaffaqiyatli yakunlandi va PostgreSQL bazasiga saqlandi!',
        'Muvaffaqiyatli'
      );

      // Redirect to school dashboard
      router.push('/school');
    } catch (err: any) {
      console.error('Onboarding submit error:', err);
      const msg = err?.message || 'Ma’lumotlarni saqlashda xatolik yuz berdi';
      setErrorMessage(msg);
      toastError(msg, 'Xatolik');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading || isDataLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-4">
          <Skeleton className="h-20 w-full bg-slate-800 rounded-2xl" />
          <Skeleton className="h-96 w-full bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 mx-auto w-full max-w-2xl flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-slate-950 font-black shadow-lg">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-teal-400 tracking-wider uppercase">
              O‘zbekiston Respublikasi
            </div>
            <div className="text-sm font-extrabold text-white">
              Maktablar Yo‘l Xavfsizligi Platformasi
            </div>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-400">
          Onboarding v1.0
        </span>
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-xl my-auto py-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-9 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-950 text-teal-400 border border-teal-800 shadow-md">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-teal-950 text-teal-400 border border-teal-800 mb-1.5">
                Dastlabki Faollashtirish
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {school?.name || 'Maktab'} Tizimiga Xush Kelibsiz!
              </h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed mt-1">
                {school?.districtName}, {school?.regionName}
              </p>
            </div>
          </div>

          {/* 3-Step Progress Indicator */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 1 ? 'bg-teal-500' : 'bg-slate-800'
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 2 ? 'bg-teal-500' : 'bg-slate-800'
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 3 ? 'bg-teal-500' : 'bg-slate-800'
              }`}
            />
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-800 text-xs text-rose-300 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Step 1: Password Setup */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 pb-2 border-b border-slate-800">
                <KeyRound className="w-4 h-4 text-teal-400" />
                <span>1-qadam: Yangi doimiy parol o‘rnatish</span>
              </div>

              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Yangi xavfsiz parol:
                  </label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Kamida 6 ta belgi (masalan: Maktab#2026)"
                    className="text-xs h-11 rounded-xl bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Yangi parolni qayta kiriting:
                  </label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Parolni tasdiqlang"
                    className="text-xs h-11 rounded-xl bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 font-medium pt-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-teal-400" />
                  )}
                  <span>Parollarni {showPassword ? 'yashirish' : 'ko‘rsatish'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Director & School Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 pb-2 border-b border-slate-800">
                <UserCheck className="w-4 h-4 text-teal-400" />
                <span>2-qadam: Mas’ul shaxs va o‘quvchilar soni</span>
              </div>

              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Maktab direktori F.I.Sh.:
                  </label>
                  <Input
                    type="text"
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    placeholder="masalan: Qodirov Jamshid Anvarovich"
                    className="text-xs h-11 rounded-xl bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Jami o‘quvchilar soni:
                  </label>
                  <Input
                    type="number"
                    value={studentCount}
                    onChange={(e) => setStudentCount(Number(e.target.value))}
                    placeholder="masalan: 750"
                    className="text-xs h-11 rounded-xl bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-teal-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Geolocation Coordinates */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 pb-2 border-b border-slate-800">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>3-qadam: Maktabning GPS koordinatalari</span>
              </div>

              <GpsLocationPicker
                latitude={latitude}
                longitude={longitude}
                onChangeLatitude={setLatitude}
                onChangeLongitude={setLongitude}
                addressNotes={addressNotes}
                onChangeAddressNotes={setAddressNotes}
                isDark={true}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="text-xs font-semibold rounded-xl gap-1 bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Orqaga</span>
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs gap-1.5 rounded-xl h-10 px-6 shadow-md"
              >
                <span>Davom etish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs gap-1.5 rounded-xl h-10 px-6 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Bazaga saqlanmoqda...' : 'Saqlash va Boshqaruvga o‘tish'}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs text-slate-600">
        © 2026 O‘zbekiston Respublikasi IIV JXD YHXX Maktablar Yo‘l Xavfsizligi Boshqaruvi
      </div>
    </div>
  );
}
