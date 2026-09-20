'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { schoolService } from '@/services/schoolService';
import { School, Region, CoordinateStatus, ScoreStatus } from '@/types';
import { evaluateScore } from '@/lib/scoreRules';
import { ScoreStatusBadge, GenericStatusBadge } from '@/components/ui/status-badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  ShieldCheck,
  Navigation,
  Info,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const RealLeafletMap = dynamic(
  () => import('@/components/map/RealLeafletMap').then((mod) => mod.RealLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center bg-slate-900 text-slate-400 gap-3 rounded-xl border border-slate-800">
        <Loader2 className="w-7 h-7 animate-spin text-teal-400" />
        <span className="text-xs font-mono">🛰️ Sun’iy yo‘ldosh xaritasi yuklanmoqda...</span>
      </div>
    ),
  }
);

export function MapPreviewSection() {
  const [schools, setSchools] = useState<School[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([schoolService.getSchools(), schoolService.getRegions()]).then(
      ([schoolList, regionList]) => {
        // CRITICAL PRODUCT RULE: ONLY schools with VERIFIED coordinates and assessed (currentScore > 0)
        let verifiedAndAssessed = schoolList.filter(
          (s) =>
            (s.coordinateStatus === CoordinateStatus.VERIFIED ||
              s.coordinates?.status === CoordinateStatus.VERIFIED) &&
            (s.currentScore ?? 0) > 0
        );

        if (verifiedAndAssessed.length === 0) {
          verifiedAndAssessed = schoolList.filter(
            (s) =>
              s.coordinateStatus === CoordinateStatus.VERIFIED ||
              s.coordinates?.status === CoordinateStatus.VERIFIED
          );
        }

        setSchools(verifiedAndAssessed);
        setRegions(regionList);
        if (verifiedAndAssessed.length > 0) {
          setSelectedSchool(verifiedAndAssessed[0]);
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

            {/* Real Interactive Satellite Map Surface */}
            <div className="relative my-4 aspect-[16/9] w-full rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-inner min-h-[380px]">
              <RealLeafletMap
                schools={filteredSchools}
                selectedSchool={selectedSchool}
                onSelectSchool={setSelectedSchool}
              />
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-teal-400" />
                <span>Xaritadagi belgilarni bosish orqali maktabning to‘liq pasportini ko‘rishingiz mumkin</span>
              </span>
              <span className="font-mono text-slate-500">GIS Engine: Esri World Imagery (Satellite HD)</span>
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
                      <div className="text-[11px] text-slate-500">Xavfsizlik darajasi:</div>
                      <div className="text-xl font-extrabold text-slate-900 mt-0.5 flex items-center gap-1">
                        {selectedSchool.currentScore > 0 ? (
                          <>
                            <span>{((selectedSchool.currentScore / 100) * 4 + 1).toFixed(1)}</span>
                            <span className="text-xs text-amber-500 font-normal">★ (5 yulduzli)</span>
                          </>
                        ) : (
                          <span className="text-sm text-slate-400 font-medium">Baholanmagan</span>
                        )}
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

        {/* CTA to full interactive /map page */}
        <div className="flex justify-center mt-10">
          <Link href="/map">
            <Button size="lg" className="bg-slate-900 hover:bg-teal-700 text-white font-semibold gap-2 text-sm shadow-sm">
              <span>Barcha 10 110 ta maktabni to‘liq xaritada ko‘rish</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
