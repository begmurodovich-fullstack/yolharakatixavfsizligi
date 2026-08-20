'use client';

import React from 'react';
import { Region, District, ScoreStatus, CoordinateStatus } from '@/types';
import { Input } from '@/components/ui/input';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SchoolFilterBarProps {
  regions: Region[];
  districts: District[];
  selectedRegionId: string;
  onRegionChange: (id: string) => void;
  selectedDistrictId: string;
  onDistrictChange: (id: string) => void;
  selectedScoreStatus: ScoreStatus | 'ALL';
  onScoreStatusChange: (status: ScoreStatus | 'ALL') => void;
  selectedCoordStatus: CoordinateStatus | 'ALL';
  onCoordStatusChange: (status: CoordinateStatus | 'ALL') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onReset: () => void;
  totalResults: number;
}

export function SchoolFilterBar({
  regions,
  districts,
  selectedRegionId,
  onRegionChange,
  selectedDistrictId,
  onDistrictChange,
  selectedScoreStatus,
  onScoreStatusChange,
  selectedCoordStatus,
  onCoordStatusChange,
  searchQuery,
  onSearchChange,
  onReset,
  totalResults,
}: SchoolFilterBarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      {/* Search and Reset Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Maktab raqami, nomi yoki direktor F.I.Sh..."
            className="pl-9 text-xs h-10 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <span className="text-xs font-mono font-bold text-slate-500">
            Topildi: {totalResults} ta maktab
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-xs font-semibold gap-1.5 border-slate-200 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Filtrni tozalash</span>
          </Button>
        </div>
      </div>

      {/* Dropdown Selectors & Status Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        {/* Region Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Viloyat:
          </label>
          <select
            value={selectedRegionId}
            onChange={(e) => {
              onRegionChange(e.target.value);
              onDistrictChange('ALL');
            }}
            className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="ALL">Barcha viloyatlar</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Tuman / Shahar:
          </label>
          <select
            value={selectedDistrictId}
            onChange={(e) => onDistrictChange(e.target.value)}
            disabled={selectedRegionId === 'ALL'}
            className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50"
          >
            <option value="ALL">Barcha tumanlar</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Score Status Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Xavfsizlik darajasi:
          </label>
          <select
            value={selectedScoreStatus}
            onChange={(e) => onScoreStatusChange(e.target.value as any)}
            className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="ALL">Barcha darajalar</option>
            <option value="GREEN">🟢 Yashil (≥80 ball)</option>
            <option value="YELLOW">🟡 Sariq (50-79 ball)</option>
            <option value="RED">🔴 Qizil (&lt;50 ball)</option>
          </select>
        </div>

        {/* Coordinate Status Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Geolokatsiya holati:
          </label>
          <select
            value={selectedCoordStatus}
            onChange={(e) => onCoordStatusChange(e.target.value as any)}
            className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="ALL">Barcha holatlar</option>
            <option value={CoordinateStatus.VERIFIED}>Tasdiqlangan</option>
            <option value={CoordinateStatus.PENDING}>Tekshiruvda</option>
            <option value={CoordinateStatus.REJECTED}>Rad etilgan</option>
          </select>
        </div>
      </div>
    </div>
  );
}
