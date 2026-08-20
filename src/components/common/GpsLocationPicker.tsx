'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import {
  MapPin,
  Navigation,
  Compass,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Crosshair,
  Sparkles,
} from 'lucide-react';

interface GpsLocationPickerProps {
  latitude: string;
  longitude: string;
  onChangeLatitude: (lat: string) => void;
  onChangeLongitude: (lng: string) => void;
  addressNotes?: string;
  onChangeAddressNotes?: (notes: string) => void;
  isDark?: boolean;
}

export function GpsLocationPicker({
  latitude,
  longitude,
  onChangeLatitude,
  onChangeLongitude,
  addressNotes,
  onChangeAddressNotes,
  isDark = true,
}: GpsLocationPickerProps) {
  const { success, error: toastError } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const [accuracyMeters, setAccuracyMeters] = useState<number | null>(null);

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      toastError('Qurilmangizda GPS geolokatsiya qo‘llab-quvvatlanmaydi', 'Xatolik');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const acc = Math.round(position.coords.accuracy);

        onChangeLatitude(lat);
        onChangeLongitude(lng);
        setAccuracyMeters(acc);
        setIsLocating(false);

        success(
          `Joriy GPS koordinatangiz aniqlandi (aniqlik: ±${acc} metr)!`,
          'GPS Muvaffaqiyatli'
        );
      },
      (err) => {
        setIsLocating(false);
        let msg = 'Joylashuvni aniqlab bo‘lmadi.';
        if (err.code === 1) {
          msg = 'Brauzerda geolokatsiyaga ruxsat berilmadi. Iltimos, GPS ruxsatini yoqing.';
        } else if (err.code === 2) {
          msg = 'GPS signali topilmadi. Ochiqroq joyga chiqing yoki qo‘lda kiriting.';
        }
        toastError(msg, 'GPS Xatolik');
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  const parsedLat = parseFloat(latitude) || 40.1032;
  const parsedLng = parseFloat(longitude) || 64.6756;

  return (
    <div className="space-y-4">
      {/* 1. Quick One-Tap GPS Detection Button */}
      <div
        className={`p-4 rounded-2xl border ${
          isDark
            ? 'border-teal-500/30 bg-gradient-to-r from-teal-950/60 to-slate-900'
            : 'border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50'
        } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Telefondan Avtomatik GPS Olish</span>
          </div>
          <p
            className={`text-xs ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            } leading-relaxed`}
          >
            Maktab darvozasi oldida turib tugmani bosing — telefon datchigi aniq koordinatani kiritadi.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleDetectGPS}
          disabled={isLocating}
          className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl h-10 px-4 gap-2 shrink-0 shadow-md"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Aniqlanmoqda...</span>
            </>
          ) : (
            <>
              <Crosshair className="w-4 h-4" />
              <span>📍 Mening Lokatsiyamni Aniqlash</span>
            </>
          )}
        </Button>
      </div>

      {accuracyMeters !== null && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Telefon GPS signali qabul qilindi: <strong>{latitude}, {longitude}</strong> (aniqlik: ±
            {accuracyMeters} metr)
          </span>
        </div>
      )}

      {/* 2. Visual Pin Preview Canvas */}
      <div
        className={`relative rounded-2xl border overflow-hidden h-32 flex items-center justify-center p-4 ${
          isDark
            ? 'border-slate-800 bg-slate-950'
            : 'border-slate-200 bg-slate-100'
        }`}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:16px_16px]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg ring-4 ring-teal-500/30 animate-bounce">
            <MapPin className="h-6 w-6" />
          </div>
          <div className="mt-1 px-3 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold border border-slate-700 shadow-md">
            {parsedLat}° N, {parsedLng}° E
          </div>
        </div>
      </div>

      {/* 3. Coordinate Inputs Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold flex items-center gap-1 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>Kenglik (Latitude):</span>
          </label>
          <Input
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => onChangeLatitude(e.target.value)}
            placeholder="40.1032"
            className={`text-xs h-10 font-mono rounded-xl ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-white focus:border-teal-500'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold flex items-center gap-1 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-teal-400" />
            <span>Uzunlik (Longitude):</span>
          </label>
          <Input
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => onChangeLongitude(e.target.value)}
            placeholder="64.6756"
            className={`text-xs h-10 font-mono rounded-xl ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-white focus:border-teal-500'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
            required
          />
        </div>
      </div>

      {onChangeAddressNotes && (
        <div className="space-y-1.5">
          <label
            className={`text-xs font-semibold ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Manzil bo‘yicha qo‘shimcha mo‘ljal:
          </label>
          <Input
            type="text"
            value={addressNotes || ''}
            onChange={(e) => onChangeAddressNotes(e.target.value)}
            placeholder="masalan: Maktabning asosiy kirish darvozasi ro‘parasida"
            className={`text-xs h-10 rounded-xl ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>
      )}
    </div>
  );
}
