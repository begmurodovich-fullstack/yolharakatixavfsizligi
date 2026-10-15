'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Star,
  CheckCircle2,
  ChevronRight,
  School,
  Users,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { rankingService, RegionalHeatmapItem } from '@/services/rankingService';

interface RegionSafetyHeatmapProps {
  onSelectRegion?: (regionName: string | null) => void;
  selectedRegionFilter?: string | null;
}

export const RegionSafetyHeatmap: React.FC<RegionSafetyHeatmapProps> = ({
  onSelectRegion,
  selectedRegionFilter,
}) => {
  const [regions, setRegions] = useState<RegionalHeatmapItem[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('reg-2'); // Default: Andijon (as in screenshot)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    rankingService.getRegionalHeatmap().then((data) => {
      if (!isMounted) return;
      setRegions(data);
      setIsLoading(false);
      // If no specific selection, default to Andijon or top ranked
      if (data.length > 0) {
        const andijon = data.find((r) => r.regionId === 'reg-2');
        setSelectedRegionId(andijon ? andijon.regionId : data[0].regionId);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedRegion =
    regions.find((r) => r.regionId === selectedRegionId) || regions[0] || null;

  const handleCardClick = (region: RegionalHeatmapItem) => {
    setSelectedRegionId(region.regionId);
    if (onSelectRegion) {
      onSelectRegion(region.regionName);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#091528] border border-slate-800 text-white shadow-xl overflow-hidden p-4 sm:p-6 transition-all">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </span>
            <h2 className="text-xs sm:text-sm font-black tracking-wider uppercase text-emerald-400 font-mono">
              O‘zbekiston Hududiy Xavfsizlik Indeksi (Heatmap)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Viloyatlar bo‘yicha maktablar xavfsizlik darajasi, yulduzli reytingi va xavf zonalari
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1 rounded-lg bg-[#11233f] text-slate-300 border border-slate-700/70 text-xs font-mono font-medium">
            Jami: <span className="font-bold text-white">14 ta Ma’muriy Hudud</span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        {/* Left Section: Regions Grid (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 text-[11px] font-mono text-slate-400">
            <span className="font-bold tracking-wider uppercase text-slate-300">Hududni tanlang:</span>
            <span className="text-[10px] text-emerald-400 font-medium tracking-wider">
              O‘rtacha baho bo‘yicha saralangan
            </span>
          </div>

          {isLoading ? (
            <div className="h-[360px] flex flex-col items-center justify-center gap-3 text-slate-400 text-xs">
              <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
              <span>Hududiy ma’lumotlar yuklanmoqda...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {regions.map((item) => {
                const isSelected = item.regionId === selectedRegionId;
                return (
                  <button
                    key={item.regionId}
                    type="button"
                    onClick={() => handleCardClick(item)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[92px] group ${
                      isSelected
                        ? 'bg-[#0f2742] border-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.28)] ring-1 ring-emerald-400'
                        : 'bg-[#0e1d35] border-slate-800/90 hover:border-slate-700 hover:bg-[#132746]'
                    }`}
                  >
                    {/* Top Row: Rank & Star Rating */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-slate-300">
                        #{item.rank}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[11px] font-mono font-bold flex items-center gap-0.5">
                        {item.starRating.toFixed(1)} <span className="text-[9px]">★</span>
                      </span>
                    </div>

                    {/* Middle: Short Region Name */}
                    <div className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-white truncate my-1.5">
                      {item.shortName}
                    </div>

                    {/* Bottom Row: Total Schools & Avg Score */}
                    <div className="flex items-center justify-between w-full text-[11px] font-mono">
                      <span className="text-slate-400">{item.totalSchools} maktab</span>
                      <span className="font-bold text-emerald-400">{item.averageScore} ball</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section: Hududiy Xavfsizlik Pasporti (5 Cols) */}
        <div className="lg:col-span-5">
          {selectedRegion ? (
            <div className="h-full rounded-xl border border-slate-800 bg-[#0e1d35] p-5 flex flex-col justify-between shadow-inner">
              {/* Pasport Header */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase font-mono">
                      Hududiy Xavfsizlik Pasporti
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 tracking-tight">
                      {selectedRegion.regionName}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono flex items-center justify-end gap-1">
                      <span>{selectedRegion.starRating.toFixed(1)}</span>
                      <span className="text-emerald-400">★</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {selectedRegion.averageScore} ball
                    </div>
                  </div>
                </div>

                {/* KPI 2-Box Strip */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="rounded-xl bg-[#091526] border border-slate-800/90 p-3.5">
                    <span className="text-[11px] text-slate-400 block font-mono">Jami Maktablar:</span>
                    <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                      {selectedRegion.totalSchools} ta
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#091526] border border-slate-800/90 p-3.5">
                    <span className="text-[11px] text-slate-400 block font-mono">O‘quvchilar:</span>
                    <span className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                      {selectedRegion.studentsFormatted}
                    </span>
                  </div>
                </div>

                {/* SR4S Distribution */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-300">SR4S Xavfsizlik Taqsimoti:</span>
                    <span className="text-[10px] text-slate-400">Foiz hisobida</span>
                  </div>

                  {/* Multi-color segment progress bar */}
                  <div className="h-3 rounded-full overflow-hidden flex bg-slate-900 border border-slate-800 my-3 shadow-inner">
                    <div
                      style={{ width: `${selectedRegion.distribution.safe.percent}%` }}
                      className="bg-emerald-500 h-full transition-all duration-500"
                      title={`4-5★ Xavfsiz: ${selectedRegion.distribution.safe.percent}%`}
                    />
                    <div
                      style={{ width: `${selectedRegion.distribution.moderate.percent}%` }}
                      className="bg-yellow-400 h-full transition-all duration-500"
                      title={`3★ O‘rtacha: ${selectedRegion.distribution.moderate.percent}%`}
                    />
                    <div
                      style={{ width: `${selectedRegion.distribution.risk.percent}%` }}
                      className="bg-rose-500 h-full transition-all duration-500"
                      title={`1-2★ Xavfli: ${selectedRegion.distribution.risk.percent}%`}
                    />
                  </div>

                  {/* Breakdown Legend Rows */}
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-emerald-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                        <span>4-5★ Xavfsiz maktablar</span>
                      </div>
                      <span className="font-bold">
                        {selectedRegion.distribution.safe.count} ta ({selectedRegion.distribution.safe.percent}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-yellow-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
                        <span>3★ O‘rtacha daraja</span>
                      </div>
                      <span className="font-bold">
                        {selectedRegion.distribution.moderate.count} ta ({selectedRegion.distribution.moderate.percent}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-rose-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                        <span>1-2★ Tezkor chora talab</span>
                      </div>
                      <span className="font-bold">
                        {selectedRegion.distribution.risk.count} ta ({selectedRegion.distribution.risk.percent}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Notice Banner */}
              <div className="mt-5 p-3 rounded-xl bg-[#091526] border border-slate-800/90 flex items-center gap-2.5 text-[11px] text-slate-300 leading-snug">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Yo‘l harakati xavfsizligi va Maktabgacha va maktab ta’limi mas’ullari nazoratida
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
