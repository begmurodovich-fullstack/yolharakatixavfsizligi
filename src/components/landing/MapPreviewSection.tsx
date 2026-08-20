'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { schoolService } from '@/services/schoolService';
import { School, Region, CoordinateStatus, ScoreStatus } from '@/types';
import { evaluateScore } from '@/lib/scoreRules';
import { ScoreStatusBadge, GenericStatusBadge } from '@/components/ui/status-badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  MapPin,
  ShieldCheck,
  Navigation,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/cn';

export function MapPreviewSection() {
  const [schools, setSchools] = useState<School[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([schoolService.getSchools(), schoolService.getRegions()]).then(
      ([schoolList, regionList]) => {
        // CRITICAL PRODUCT RULE: ONLY schools with VERIFIED coordinates can be displayed on public map
        const verifiedOnly = schoolList.filter(
          (s) => s.coordinateStatus === CoordinateStatus.VERIFIED
        );
        setSchools(verifiedOnly);
        setRegions(regionList);
        if (verifiedOnly.length > 0) {
          setSelectedSchool(verifiedOnly[0]);
        }
        setIsLoading(false);
      }
    );
  }, []);

  const filteredSchools = useMemo(() => {
    if (selectedRegionId === 'all') return schools;
    return schools.filter((s) => s.regionId === selectedRegionId);
  }, [schools, selectedRegionId]);

  return (
    <section id="xarita" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>GEOLOKATSIYA VA NAZORAT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Maktablar xavfsizligini xaritada ko‘ring
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Geografik ierarxiya: <strong className="text-slate-900">Viloyat &rarr; Tuman &rarr; Maktab</strong>.
              Faqat rasmiy ekspertlar tomonidan koordinatalari tasdiqlangan maktablar ochiq xaritada aks ettiriladi.
            </p>
          </div>

          {/* Verification Badge Guarantee */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-medium text-slate-700 shrink-0">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Faqat tasdiqlangan (VERIFIED) koordinatalar</span>
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedRegionId('all')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border',
              selectedRegionId === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            )}
          >
            Barcha hududlar ({schools.length})
          </button>
          {regions.slice(0, 7).map((r) => {
            const count = schools.filter((s) => s.regionId === r.id).length;
            if (count === 0) return null;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegionId(r.id)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border',
                  selectedRegionId === r.id
                    ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                )}
              >
                {r.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Interactive Map Visual + School Selection Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map Canvas Component */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-slate-950 p-5 shadow-lg relative overflow-hidden text-slate-100 min-h-[420px] flex flex-col justify-between">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-teal-400 font-semibold">GEOLOKATSIYA MONITORINGI</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Ko‘rsatilmoqda: {filteredSchools.length} ta tasdiqlangan maktab
              </div>
            </div>

            {/* Stylized Interactive Map Surface */}
            <div className="relative my-4 aspect-[16/9] w-full rounded-xl bg-slate-900/60 border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              <svg viewBox="0 0 800 400" className="w-full h-full opacity-30 fill-slate-800 stroke-slate-700">
                <path d="M 50,110 L 130,70 L 250,60 L 310,120 L 400,120 L 470,80 L 580,130 L 650,100 L 720,130 L 830,140 L 850,190 L 780,210 L 710,190 L 630,200 L 570,260 L 530,370 L 460,380 L 430,310 L 380,280 L 310,250 L 230,220 L 160,230 L 80,200 Z" />
              </svg>

              {/* Dynamic Interactive School Markers */}
              <div className="absolute inset-0 p-8">
                {filteredSchools.map((sch) => {
                  const isSelected = selectedSchool?.id === sch.id;
                  const scoreEval = evaluateScore(sch.currentScore);

                  const leftPercent = 25 + ((sch.coordinates.longitude - 60) / 13) * 60;
                  const topPercent = 20 + ((42 - sch.coordinates.latitude) / 3.5) * 60;

                  let pinColor = 'bg-emerald-500 text-emerald-950 ring-emerald-400/40';
                  if (scoreEval.status === ScoreStatus.YELLOW) {
                    pinColor = 'bg-amber-500 text-amber-950 ring-amber-400/40';
                  } else if (scoreEval.status === ScoreStatus.RED) {
                    pinColor = 'bg-rose-500 text-rose-950 ring-rose-400/40';
                  }

                  return (
                    <div
                      key={sch.id}
                      onClick={() => setSelectedSchool(sch)}
                      style={{
                        left: `${Math.min(92, Math.max(8, leftPercent))}%`,
                        top: `${Math.min(88, Math.max(12, topPercent))}%`,
                      }}
                      className={cn(
                        'absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-20 group',
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                      )}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-teal-400/60" />
                      )}
                      <div
                        className={cn(
                          'relative flex items-center justify-center h-7 w-7 rounded-full shadow-lg font-mono font-bold text-[10px] ring-4 transition-all',
                          pinColor,
                          isSelected ? 'ring-white ring-offset-2 ring-offset-slate-900' : ''
                        )}
                      >
                        {sch.currentScore}
                      </div>

                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded shadow-xl border border-slate-700 z-40">
                        {sch.name} ({sch.currentScore} ball)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-teal-400" />
                <span>Nuqtalarni bosish orqali maktabning to‘liq pasportini ko‘rishingiz mumkin</span>
              </span>
              <span className="font-mono text-slate-500">GIS Engine: Stylized V1 Preview</span>
            </div>
          </div>

          {/* Right Column: Selected School Detail Card */}
          <div className="lg:col-span-4 space-y-4">
            {selectedSchool ? (
              <Card className="border-teal-200 bg-white shadow-md">
                <CardHeader className="p-5 pb-3 bg-slate-50/80 border-b border-slate-100 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">
                      Tanlangan maktab
                    </span>
                    <GenericStatusBadge status={selectedSchool.coordinateStatus} />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900 mt-2">
                    {selectedSchool.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 space-y-4 text-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Viloyat:</span>
                      <span className="font-bold text-slate-800">{selectedSchool.regionName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Tuman:</span>
                      <span className="font-bold text-slate-800">{selectedSchool.districtName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Direktor:</span>
                      <span className="font-semibold text-slate-700">{selectedSchool.directorName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">O‘quvchilar soni:</span>
                      <span className="font-semibold text-slate-700">{selectedSchool.studentCount || 0} nafar</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Koordinatalar:</span>
                      <span className="font-mono text-teal-700">
                        {selectedSchool.coordinates.latitude.toFixed(4)}, {selectedSchool.coordinates.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500">Joriy xavfsizlik bali:</div>
                      <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                        {selectedSchool.currentScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                      </div>
                    </div>
                    <ScoreStatusBadge score={selectedSchool.currentScore} />
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* List preview of schools in the selected region */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Hududdagi maktablar ({filteredSchools.length} ta)
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {filteredSchools.slice(0, 6).map((sch) => (
                  <button
                    key={sch.id}
                    onClick={() => setSelectedSchool(sch)}
                    className={cn(
                      'w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors',
                      selectedSchool?.id === sch.id
                        ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                        : 'hover:bg-slate-50 text-slate-700'
                    )}
                  >
                    <div className="truncate pr-2">
                      <div className="truncate">{sch.name}</div>
                      <div className="text-[10px] text-slate-400">{sch.districtName}</div>
                    </div>
                    <ScoreStatusBadge score={sch.currentScore} showScore={true} showIcon={false} className="py-0 px-2 text-[10px]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
