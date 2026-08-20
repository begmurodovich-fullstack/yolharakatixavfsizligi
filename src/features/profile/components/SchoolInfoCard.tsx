'use client';

import React, { useState } from 'react';
import { School } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  School as SchoolIcon,
  UserCheck,
  Users,
  Save,
} from 'lucide-react';

interface SchoolInfoCardProps {
  school: School;
  onUpdateDirector: (directorName: string, studentCount: number) => Promise<void>;
}

export function SchoolInfoCard({ school, onUpdateDirector }: SchoolInfoCardProps) {
  const [directorName, setDirectorName] = useState(school.directorName || '');
  const [studentCount, setStudentCount] = useState(school.studentCount || 840);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onUpdateDirector(directorName, Number(studentCount));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <SchoolIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Maktabning Asosiy Ma’lumotlari
            </h2>
            <p className="text-xs text-slate-500">
              Davlat reyestridagi muassasa profili va mas’ul shaxs
            </p>
          </div>
        </div>
      </div>

      {/* Institution Hierarchy Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Viloyat:</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900">{school.regionName}</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tuman / Shahar:</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900">{school.districtName}</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-1.5 shadow-2xs">
          <div className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Muassasa nomi:</div>
          <div className="text-xs sm:text-sm font-black text-teal-950">{school.name}</div>
        </div>
      </div>

      {/* Editable Details Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Maktab direktori F.I.Sh.:</span>
            </label>
            <Input
              type="text"
              value={directorName}
              onChange={(e) => setDirectorName(e.target.value)}
              placeholder="masalan: Abdullayev Jamshid Anvarovich"
              className="text-xs h-10 rounded-xl"
              required
            />
            <p className="text-[11px] text-slate-400">
              Direktor ismi maktab profili va rasmiy xulosalarda ko‘rsatiladi.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-teal-600" />
              <span>Jami o‘quvchilar soni:</span>
            </label>
            <Input
              type="number"
              value={studentCount}
              onChange={(e) => setStudentCount(Number(e.target.value))}
              placeholder="masalan: 850"
              className="text-xs h-10 rounded-xl"
              required
            />
            <p className="text-[11px] text-slate-400">
              Maktabdagi umumiy ta’lim oluvchi bolalar soni.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            size="sm"
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold gap-1.5 text-xs h-10 px-5 rounded-xl shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saqlanmoqda...' : 'Ma’lumotlarni saqlash'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
