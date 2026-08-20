'use client';

import React from 'react';
import { ScoreStatus } from '@/types';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RankingFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: ScoreStatus | 'ALL';
  onStatusFilterChange: (status: ScoreStatus | 'ALL') => void;
  totalEntries: number;
}

export function RankingFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalEntries,
}: RankingFiltersProps) {
  const statusOptions: Array<{ value: ScoreStatus | 'ALL'; label: string; badgeClass: string }> = [
    { value: 'ALL', label: 'Barcha holatlar', badgeClass: 'border-slate-300 text-slate-700' },
    { value: ScoreStatus.GREEN, label: 'Yashil (≥80 ball)', badgeClass: 'border-emerald-300 text-emerald-800 bg-emerald-50' },
    { value: ScoreStatus.YELLOW, label: 'Sariq (50-79 ball)', badgeClass: 'border-amber-300 text-amber-800 bg-amber-50' },
    { value: ScoreStatus.RED, label: 'Qizil (<50 ball)', badgeClass: 'border-rose-300 text-rose-800 bg-rose-50' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Maktab nomi yoki raqami bo‘yicha qidiruv..."
          className="pl-9 pr-8 text-xs h-10 rounded-xl"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Status Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
        <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Holat:</span>
        </div>

        {statusOptions.map((opt) => {
          const isSelected = statusFilter === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onStatusFilterChange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
