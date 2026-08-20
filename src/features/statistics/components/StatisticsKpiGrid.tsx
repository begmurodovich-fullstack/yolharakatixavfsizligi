'use client';

import React from 'react';
import { ComparativeAverages } from '@/services/statisticsService';
import { CriterionScoreInfo } from '@/features/dashboard/components';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import {
  Trophy,
  Building2,
  Map,
  Globe,
  ClipboardCheck,
  Camera,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface StatisticsKpiGridProps {
  schoolScore: number;
  averages: ComparativeAverages | null;
  totalQuestions: number;
  answeredQuestions: number;
  uploadedEvidenceCount: number;
  requiredEvidenceCount: number;
  strongestCriterion?: CriterionScoreInfo;
  weakestCriterion?: CriterionScoreInfo;
}

export function StatisticsKpiGrid({
  schoolScore,
  averages,
  totalQuestions,
  answeredQuestions,
  uploadedEvidenceCount,
  requiredEvidenceCount,
  strongestCriterion,
  weakestCriterion,
}: StatisticsKpiGridProps) {
  const districtAvg = averages?.districtAverage ?? 78;
  const regionAvg = averages?.regionAverage ?? 74;
  const republicAvg = averages?.republicAverage ?? 71;

  return (
    <div className="space-y-4">
      {/* Top 4 Score Benchmark Cards */}
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
              {schoolScore} <span className="text-sm text-teal-700 font-normal">/ 100</span>
            </div>
            <ScoreStatusBadge score={schoolScore} className="text-xs py-0.5 px-2.5" />
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
              {districtAvg} <span className="text-sm text-slate-400 font-normal">ball</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold block">
              +{schoolScore - districtAvg} ball farq
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
              {regionAvg} <span className="text-sm text-slate-400 font-normal">ball</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold block">
              +{schoolScore - regionAvg} ball farq
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
              {republicAvg} <span className="text-sm text-slate-400 font-normal">ball</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold block">
              +{schoolScore - republicAvg} ball farq
            </span>
          </div>
        </div>
      </div>

      {/* Bottom 4 Status Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 5. Questions Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 sm:p-5 flex items-center gap-3.5 shadow-xs">
          <div className="p-3 rounded-xl bg-teal-50 text-teal-700 shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-slate-500 font-medium">Savollar holati</div>
            <div className="text-base font-extrabold text-slate-900 font-mono">
              {answeredQuestions} / {totalQuestions}
            </div>
          </div>
        </div>

        {/* 6. Evidence Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4.5 sm:p-5 flex items-center gap-3.5 shadow-xs">
          <div className="p-3 rounded-xl bg-teal-50 text-teal-700 shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-slate-500 font-medium">Foto-dalillar</div>
            <div className="text-base font-extrabold text-slate-900 font-mono">
              {uploadedEvidenceCount} / {requiredEvidenceCount}
            </div>
          </div>
        </div>

        {/* 7. Strongest Criterion */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4.5 sm:p-5 flex items-center gap-3.5 shadow-xs">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-emerald-800 font-medium">Eng kuchli mezon</div>
            <div className="text-xs font-extrabold text-emerald-950 truncate">
              {strongestCriterion?.criterion.title || 'Piyodalar o‘tish joyi'}
            </div>
          </div>
        </div>

        {/* 8. Weakest Criterion */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4.5 sm:p-5 flex items-center gap-3.5 shadow-xs">
          <div className="p-3 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-amber-800 font-medium">E’tibor talab mezon</div>
            <div className="text-xs font-extrabold text-amber-950 truncate">
              {weakestCriterion?.criterion.title || 'Yo‘l belgilari'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
