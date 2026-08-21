'use client';

import React from 'react';
import { SchoolRankingOverview } from '@/types';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Building2, Map, ShieldCheck } from 'lucide-react';

interface RankingHeroCardProps {
  overview: SchoolRankingOverview | null;
  currentScore: number;
}

export function RankingHeroCard({ overview, currentScore }: RankingHeroCardProps) {
  const score = overview?.currentScore ?? currentScore ?? 0;
  const isAssessed = score > 0;

  const republicRank = isAssessed && overview?.republicRank ? `#${overview.republicRank}` : '-';
  const totalRepublic = overview?.totalRepublicSchools ?? 10110;
  const regionRank = isAssessed && overview?.regionRank ? `#${overview.regionRank}` : '-';
  const totalRegion = overview?.totalRegionSchools ?? 0;
  const districtRank = isAssessed && overview?.districtRank ? `#${overview.districtRank}` : '-';
  const totalDistrict = overview?.totalDistrictSchools ?? 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Maktabingizning Joriy Reytingdagi O‘rni
            </h2>
            <p className="text-xs text-slate-500">
              {isAssessed
                ? 'Joriy monitoring davri yakunlari bo‘yicha'
                : 'Hali baholash o‘tkazilmagan (Boshlang‘ich 0 ball)'}
            </p>
          </div>
        </div>

        <ScoreStatusBadge score={score} />
      </div>

      {/* Main Score & 3-Tier Ranking Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Score Display */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            To‘plangan jami ball:
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono">
              {score}
            </span>
            <span className="text-sm font-medium text-slate-400 font-mono">/ 100</span>
          </div>
          <Progress value={score} showColorByScore className="h-2" />
        </div>

        {/* 3 Scope Ranks */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
          {/* District Rank */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 text-center flex flex-col justify-between shadow-2xs space-y-2">
            <div className="flex items-center justify-center text-teal-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Tuman miqyosida</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 my-1 font-mono">
                {districtRank}
              </div>
              <div className="text-[11px] text-slate-500">
                {totalDistrict > 0 ? `${totalDistrict} ta maktab ichida` : 'Baholanmagan'}
              </div>
            </div>
          </div>

          {/* Region Rank */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 text-center flex flex-col justify-between shadow-2xs space-y-2">
            <div className="flex items-center justify-center text-teal-700">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Viloyat miqyosida</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 my-1 font-mono">
                {regionRank}
              </div>
              <div className="text-[11px] text-slate-500">
                {totalRegion > 0 ? `${totalRegion} ta maktab ichida` : 'Baholanmagan'}
              </div>
            </div>
          </div>

          {/* Republic Rank */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 text-center flex flex-col justify-between shadow-2xs space-y-2">
            <div className="flex items-center justify-center text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Respublika miqyosida</div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 my-1 font-mono">
                {republicRank}
              </div>
              <div className="text-[11px] text-slate-500">
                {totalRepublic > 0 ? `${totalRepublic} ta maktab ichida` : 'Baholanmagan'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
