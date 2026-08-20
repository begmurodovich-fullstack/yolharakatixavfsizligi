'use client';

import React, { useState } from 'react';
import { User, School } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
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
} from 'lucide-react';
import { apiClient } from '@/lib/apiClient';
import { GpsLocationPicker } from '@/components/common/GpsLocationPicker';

interface FirstLoginOnboardingModalProps {
  user: User;
  school: School | null;
  onComplete: (updatedUser: User, updatedSchool: School) => void;
}

export function FirstLoginOnboardingModal({
  user,
  school,
  onComplete,
}: FirstLoginOnboardingModalProps) {
  const { success, error: toastError } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Director & Students
  const [directorName, setDirectorName] = useState(school?.directorName || '');
  const [studentCount, setStudentCount] = useState(school?.studentCount || 750);

  // Step 3: Coordinates
  const [latitude, setLatitude] = useState(school?.coordinates?.latitude?.toString() || '40.1032');
  const [longitude, setLongitude] = useState(school?.coordinates?.longitude?.toString() || '64.6756');
  const [addressNotes, setAddressNotes] = useState(
    school?.coordinates?.addressNotes || `${school?.name || 'Maktab'} asosiy kirish darvozasi ro‘parasida`
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Next
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

  // Handle Final Submit to PostgreSQL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response: any = await apiClient('/auth/onboarding', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          schoolId: school?.id || user.schoolId,
          newPassword,
          directorName,
          studentCount: Number(studentCount),
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          addressNotes,
        }),
      });

      // Update local stored user
      const stored = localStorage.getItem('srsp_auth_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(
          'srsp_auth_user',
          JSON.stringify({
            ...parsed,
            isFirstLogin: false,
          })
        );
      }

      success(
        'Dastlabki sozlash muvaffaqiyatli yakunlandi va ma’lumotlar bazaga yozildi!',
        'Xush kelibsiz!'
      );

      onComplete(response.user, response.school);
    } catch (err: any) {
      console.error('Onboarding submit error:', err);
      const msg = err?.message || 'Ma’lumotlarni saqlashda xatolik yuz berdi';
      setErrorMessage(msg);
      toastError(msg, 'Xatolik');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200" />

      {/* Dialog Body */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 space-y-6">
        {/* Header Banner */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 shadow-sm">
            <Sparkles className="h-7 w-7" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-1.5">
              Dastlabki Faollashtirish (Onboarding)
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {school?.name || 'Maktab'} Tizimiga Xush Kelibsiz!
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Xavfsizlik talablariga muvofiq, birinchi kirishda yangi parol o‘rnatish va maktab koordinatalarini tasdiqlash lozim.
            </p>
          </div>
        </div>

        {/* 3-Step Progress Indicator */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div
            className={`h-1.5 rounded-full transition-all ${
              step >= 1 ? 'bg-teal-600' : 'bg-slate-200'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all ${
              step >= 2 ? 'bg-teal-600' : 'bg-slate-200'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all ${
              step >= 3 ? 'bg-teal-600' : 'bg-slate-200'
            }`}
          />
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium animate-in shake duration-150">
            {errorMessage}
          </div>
        )}

        {/* Step 1: Password Setup */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pb-1 border-b border-slate-100">
              <KeyRound className="w-4 h-4 text-teal-600" />
              <span>1-qadam: Yangi doimiy parol o‘rnatish</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Yangi xavfsiz parol:
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Kamida 6 ta belgi (masalan: Maktab#2026)"
                  className="text-xs h-10 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Yangi parolni qayta kiriting:
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Parolni tasdiqlang"
                  className="text-xs h-10 rounded-xl"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 font-medium pt-1"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-teal-600" />}
                <span>Parollarni {showPassword ? 'yashirish' : 'ko‘rsatish'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Director & School Details */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pb-1 border-b border-slate-100">
              <UserCheck className="w-4 h-4 text-teal-600" />
              <span>2-qadam: Mas’ul shaxs va o‘quvchilar soni</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Maktab direktori F.I.Sh.:
                </label>
                <Input
                  type="text"
                  value={directorName}
                  onChange={(e) => setDirectorName(e.target.value)}
                  placeholder="masalan: Qodirov Jamshid Anvarovich"
                  className="text-xs h-10 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Jami o‘quvchilar soni:
                </label>
                <Input
                  type="number"
                  value={studentCount}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  placeholder="masalan: 750"
                  className="text-xs h-10 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Geolocation Coordinates */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pb-1 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>3-qadam: Maktabning GPS koordinatalari</span>
            </div>

            <GpsLocationPicker
              latitude={latitude}
              longitude={longitude}
              onChangeLatitude={setLatitude}
              onChangeLongitude={setLongitude}
              addressNotes={addressNotes}
              onChangeAddressNotes={setAddressNotes}
              isDark={false}
            />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="text-xs font-semibold rounded-xl gap-1"
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
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs gap-1.5 rounded-xl h-10 px-5 shadow-xs"
            >
              <span>Davom etish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs gap-1.5 rounded-xl h-10 px-6 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Bazaga yozilmoqda...' : 'Saqlash va Boshlash'}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
