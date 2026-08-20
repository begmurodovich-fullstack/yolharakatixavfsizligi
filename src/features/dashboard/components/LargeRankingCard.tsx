'use client';

import React from 'react';
import { SchoolRankingOverview } from '@/types';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal, Building2, Map, Shield, TrendingUp } from 'lucide-react';

interface LargeRankingCardProps {
  rankingOverview: SchoolRankingOverview | null;
  currentScore: number;
}

export function LargeRankingCard({ rankingOverview, currentScore }: LargeRankingCardProps) {
  const score = rankingOverview?.currentScore ?? currentScore;
  const republicRank = rankingOverview?.republicRank ?? 34;
  const totalRepublic = rankingOverview?.totalRepublicSchools ?? 36;
  const regionRank = rankingOverview?.regionRank ?? 7;
  const totalRegion = rankingOverview?.totalRegionSchools ?? 14;
  const districtRank = rankingOverview?.districtRank ?? 1;
  const totalDistrict = rankingOverview?.totalDistrictSchools ?? 4;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Joriy Xavfsizlik Bali va Reyting
            </h2>
            <p className="text-xs text-slate-500">
              2025-2026 O‘quv yili baholash xulosasi
            </p>
          </div>
        </div>

        <ScoreStatusBadge score={score} />
      </div>

      {/* Main Score Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Huge Score Number & Bar */}
        <div className="md:col-span-5 space-y-3">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Umumiy To‘plangan Ball
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono">
              {score}
            </span>
            <span className="text-sm text-slate-400 font-medium font-mono">
              / 100 ball
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <Progress value={score} showColorByScore className="h-2" />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Davlat talabi: &ge;80 (Xavfsiz)</span>
              <span className="font-semibold text-slate-800">{score}% bajarilgan</span>
            </div>
          </div>
        </div>

        {/* Right: 3-Tier Hierarchy Ranking Stats */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          {/* District Rank */}
          <div className="rounded-2xl bg-teal-50/50 border border-teal-200 p-4 sm:p-5 text-center flex flex-col justify-between space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-center text-teal-700">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-teal-900">Tuman</div>
              <div className="text-xl sm:text-2xl font-black text-teal-950 my-1 font-mono">
                #{districtRank}
              </div>
            </div>
            <div className="text-[11px] text-teal-700 font-mono font-medium">
              {districtRank}/{totalDistrict} ta maktab
            </div>
          </div>

          {/* Region Rank */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 text-center flex flex-col justify-between space-y-1.5">
            <div className="flex items-center justify-center text-blue-700">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700">Viloyat</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 my-1 font-mono">
                #{regionRank}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {regionRank}/{totalRegion} ta maktab
            </div>
          </div>

          {/* Republic Rank */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 text-center flex flex-col justify-between space-y-1.5">
            <div className="flex items-center justify-center text-amber-600">
              <Medal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700">Respublika</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 my-1 font-mono">
                #{republicRank}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {republicRank}/{totalRepublic} ta maktab
            </div>
          </div>
        </div>
      </div>

      {/* Bottom context notice */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-teal-600" />
          <span>Reyting teng ballar bo‘yicha ochiq va shaffof taqsimlangan.</span>
        </div>
        <a
          href="/school/rankings"
          className="flex items-center gap-1 text-teal-700 font-bold hover:text-teal-900 transition-colors"
        >
          <span>Batafsil reyting</span>
          <TrendingUp className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
