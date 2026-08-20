'use client';

import React, { useState } from 'react';
import { School } from '@/types';
import { GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { GpsLocationPicker } from '@/components/common/GpsLocationPicker';
import {
  MapPin,
  Send,
  Info,
} from 'lucide-react';

interface CoordinateManagerCardProps {
  school: School;
  onSubmitCoordinates: (
    lat: number,
    lng: number,
    addressNotes: string
  ) => Promise<void>;
}

export function CoordinateManagerCard({
  school,
  onSubmitCoordinates,
}: CoordinateManagerCardProps) {
  const [lat, setLat] = useState(school.coordinates.latitude.toString());
  const [lng, setLng] = useState(school.coordinates.longitude.toString());
  const [addressNotes, setAddressNotes] = useState(
    school.coordinates.addressNotes || `${school.name} asosiy kirish darvozasi`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmitCoordinates(parseFloat(lat), parseFloat(lng), addressNotes);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Maktab Geolokatsiyasi va Xaritadagi Joylashuvi
            </h2>
            <p className="text-xs text-slate-500">
              Ommaviy xaritada to‘g‘ri aks etish uchun aniq GPS koordinatalari
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs text-slate-400 font-medium">Holat:</span>
          <GenericStatusBadge status={school.coordinateStatus} />
        </div>
      </div>

      {/* Coordinate Form with Phone GPS Picker */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <GpsLocationPicker
          latitude={lat}
          longitude={lng}
          onChangeLatitude={setLat}
          onChangeLongitude={setLng}
          addressNotes={addressNotes}
          onChangeAddressNotes={setAddressNotes}
          isDark={false}
        />

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
          <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>
            Kiritilgan koordinatalar administrator tomonidan tekshirilgach,
            ommaviy respublika maktablar xaritasida tasdiqlangan holda aks ettiriladi.
          </span>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="sm"
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl h-10 px-6 gap-2 shadow-2xs"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Saqlanmoqda...' : 'Koordinatalarni Tasdiqlashga Yuborish'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
