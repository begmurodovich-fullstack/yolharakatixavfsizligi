'use client';

import React from 'react';
import { ComparativeAverages } from '@/services/statisticsService';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import {
  Trophy,
  Building2,
  Map,
  Globe,
} from 'lucide-react';

import { normalizeScore } from '@/lib/scoreRules';

interface StatisticsKpiGridProps {
  schoolScore: number;
  averages: ComparativeAverages | null;
}

export function StatisticsKpiGrid({
  schoolScore,
  averages,
}: StatisticsKpiGridProps) {
  const normScore = normalizeScore(schoolScore);
  const districtAvg = averages?.districtAverage ?? 4.0;
  const regionAvg = averages?.regionAverage ?? 3.9;
  const republicAvg = averages?.republicAverage ?? 3.8;

  const districtDiff = Number((normScore - districtAvg).toFixed(1));
  const regionDiff = Number((normScore - regionAvg).toFixed(1));
  const republicDiff = Number((normScore - republicAvg).toFixed(1));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. School Score */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between text-teal-800 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider">Maktab bali</span>
          <div className="p-2 rounded-xl bg-teal-100/80 text-teal-700">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="text-3xl sm:text-4xl font-black text-teal-950 font-mono tracking-tight">
            {normScore.toFixed(1)} <span className="text-sm text-teal-700 font-normal">ball</span>
          </div>
          <ScoreStatusBadge score={normScore} className="text-xs py-0.5 px-2.5" />
        </div>
      </div>

      {/* 2. District Avg */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between text-slate-500 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider">Tuman o‘rtachasi</span>
          <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
            <Building2 className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
            {districtAvg.toFixed(1)} <span className="text-sm text-slate-400 font-normal">ball</span>
          </div>
          <span className={`text-xs font-semibold block ${districtDiff >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {districtDiff >= 0 ? `+${districtDiff}` : districtDiff} ball farq
          </span>
        </div>
      </div>

      {/* 3. Region Avg */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between text-slate-500 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider">Viloyat o‘rtachasi</span>
          <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
            <Map className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
            {regionAvg.toFixed(1)} <span className="text-sm text-slate-400 font-normal">ball</span>
          </div>
          <span className={`text-xs font-semibold block ${regionDiff >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {regionDiff >= 0 ? `+${regionDiff}` : regionDiff} ball farq
          </span>
        </div>
      </div>

      {/* 4. Republic Avg */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between text-slate-500 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider">Respublika o‘rtachasi</span>
          <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
            <Globe className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
            {republicAvg.toFixed(1)} <span className="text-sm text-slate-400 font-normal">ball</span>
          </div>
          <span className={`text-xs font-semibold block ${republicDiff >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {republicDiff >= 0 ? `+${republicDiff}` : republicDiff} ball farq
          </span>
        </div>
      </div>
    </div>
  );
}
