'use client';

import React from 'react';
import { School } from '@/types';
import { ScoreStatusBadge, GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  School as SchoolIcon,
  MapPin,
  KeyRound,
  Eye,
  Lock,
  Unlock,
} from 'lucide-react';

interface SchoolAdminTableProps {
  schools: School[];
  onViewSchool: (school: School) => void;
  onResetPassword: (schoolId: string) => Promise<void>;
  onToggleStatus: (schoolId: string) => Promise<void>;
}

export function SchoolAdminTable({
  schools,
  onViewSchool,
  onResetPassword,
  onToggleStatus,
}: SchoolAdminTableProps) {
  if (schools.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
        Tanlangan filtrlar bo‘yicha maktablar topilmadi.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-4 px-5">Maktab nomi</th>
              <th className="py-4 px-5">Hudud (Viloyat / Tuman)</th>
              <th className="py-4 px-5">Direktor</th>
              <th className="py-4 px-5 text-right">Ball</th>
              <th className="py-4 px-5 text-center">Xavfsizlik Holati</th>
              <th className="py-4 px-5 text-center">Geolokatsiya</th>
              <th className="py-4 px-5 text-center w-36">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {schools.map((school) => (
              <tr key={school.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Name */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                      <SchoolIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {school.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {school.studentCount} o‘quvchi
                      </span>
                    </div>
                  </div>
                </td>

                {/* Region / District */}
                <td className="py-4 px-5 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {school.districtName}, {school.regionName}
                    </span>
                  </div>
                </td>

                {/* Director */}
                <td className="py-4 px-5 font-medium text-slate-800">
                  {school.directorName}
                </td>

                {/* Score */}
                <td className="py-4 px-5 text-right font-mono font-black text-sm text-slate-900">
                  {school.currentScore}
                  <span className="text-[10px] text-slate-400 font-normal ml-0.5">/ 100</span>
                </td>

                {/* Score Status */}
                <td className="py-4 px-5 text-center">
                  <ScoreStatusBadge score={school.currentScore} showScore={false} />
                </td>

                {/* Coordinate Status */}
                <td className="py-4 px-5 text-center">
                  <GenericStatusBadge status={school.coordinateStatus} />
                </td>

                {/* Actions */}
                <td className="py-4 px-5 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onViewSchool(school)}
                      className="text-[11px] h-8 px-2.5 rounded-lg border-slate-200"
                      title="Batafsil ko‘rish"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onResetPassword(school.id)}
                      className="text-[11px] h-8 px-2.5 rounded-lg border-slate-200 hover:border-amber-400"
                      title="Parolni tiklash"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleStatus(school.id)}
                      className={`text-[11px] h-8 px-2.5 rounded-lg ${
                        school.status === 'ACTIVE'
                          ? 'border-slate-200 text-slate-600 hover:text-rose-700'
                          : 'border-emerald-200 text-emerald-700 bg-emerald-50'
                      }`}
                      title={school.status === 'ACTIVE' ? 'Bloklash' : 'Faollashtirish'}
                    >
                      {school.status === 'ACTIVE' ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
