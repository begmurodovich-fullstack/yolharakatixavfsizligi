'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { schoolService } from '@/services/schoolService';
import { School, Region, CoordinateStatus, ScoreStatus } from '@/types';
import { ScoreStatusBadge, GenericStatusBadge } from '@/components/ui/status-badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UzbekistanRegionalHeatmap } from './UzbekistanRegionalHeatmap';
import {
  MapPin,
  ShieldCheck,
  Navigation,
  Info,
  ArrowRight,
  Loader2,
  Layers,
  Flame,
  Globe2,
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
  const [activeViewMode, setActiveViewMode] = useState<'MAP' | 'HEATMAP'>('HEATMAP');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([schoolService.getSchools(), schoolService.getRegions()]).then(
      ([schoolList, regionList]) => {
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
    <section id="xarita" className="py-20 bg-slate-900 text-slate-100 border-t border-slate-800 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-950 text-teal-400 border border-teal-800 mb-3 shadow-xs">
              <Navigation className="w-3.5 h-3.5 text-teal-400" />
              <span>GEOLOKATSIYA VA HUDUDIY RISK NAZORATI</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Respublika Maktablari Xavfsizlik Xaritasi
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Geografik ierarxiya: <strong className="text-white font-semibold">Respublika &rarr; Viloyat &rarr; Tuman &rarr; Maktab</strong>.
              Har bir maktab atrofidagi yo‘l harakati xavfsizligi darajasi real vaqt rejimida baholanadi.
            </p>
          </div>

          {/* Dual View Switcher Tabs (Heatmap vs Leaflet) */}
          <div className="flex items-center p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 shadow-lg">
            <button
              onClick={() => setActiveViewMode('HEATMAP')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200',
                activeViewMode === 'HEATMAP'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              )}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>🗺️ Hududiy Risk Heatmap</span>
            </button>

            <button
              onClick={() => setActiveViewMode('MAP')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200',
                activeViewMode === 'MAP'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              )}
            >
              <Globe2 className="w-4 h-4 text-teal-300" />
              <span>🛰️ Sun’iy Yo‘ldosh (HD)</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Regional Risk Heatmap */}
        {activeViewMode === 'HEATMAP' && (
          <div className="animate-in fade-in duration-300">
            <UzbekistanRegionalHeatmap
              selectedRegionId={selectedRegionId !== 'all' ? selectedRegionId : undefined}
              onSelectRegion={(rId) => setSelectedRegionId(rId)}
            />
          </div>
        )}

        {/* View Mode 2: Interactive Real Satellite Map */}
        {activeViewMode === 'MAP' && (
          <div className="animate-in fade-in duration-300 space-y-6">
            {/* Region Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedRegionId('all')}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border',
                  selectedRegionId === 'all'
                    ? 'bg-teal-600 text-white border-teal-500 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                )}
              >
                Barcha hududlar ({schools.length})
              </button>
              {regions.slice(0, 8).map((r) => {
                const count = schools.filter((s) => s.regionId === r.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegionId(r.id)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border',
                      selectedRegionId === r.id
                        ? 'bg-teal-600 text-white border-teal-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                    )}
                  >
                    {r.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Split View: Map + Detail Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl relative overflow-hidden min-h-[440px] flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-teal-400 font-bold">SUN’IY YO‘LDOSH MONITORINGI</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {filteredSchools.length} ta tasdiqlangan maktab
                  </div>
                </div>

                <div className="relative my-4 aspect-[16/9] w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-inner min-h-[380px]">
                  <RealLeafletMap
                    schools={filteredSchools}
                    selectedSchool={selectedSchool}
                    onSelectSchool={setSelectedSchool}
                  />
                </div>

                <div className="text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-800 font-mono">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Info className="w-3.5 h-3.5 text-teal-400" />
                    <span>Maktab markerini bosib uning xavfsizlik darajasini tekshiring</span>
                  </span>
                  <span className="text-slate-500">Esri World Imagery HD</span>
                </div>
              </div>

              {/* Right Detail Card */}
              <div className="lg:col-span-4 space-y-4">
                {selectedSchool ? (
                  <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                        Tanlangan Maktab
                      </span>
                      <GenericStatusBadge status={selectedSchool.coordinateStatus} />
                    </div>

                    <h3 className="text-base font-black text-white">
                      {selectedSchool.name}
                    </h3>

                    <div className="space-y-2 text-xs divide-y divide-slate-800/80">
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-400">Viloyat:</span>
                        <span className="font-bold text-white">{selectedSchool.regionName}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-400">Tuman:</span>
                        <span className="font-bold text-white">{selectedSchool.districtName}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-400">O‘quvchilar:</span>
                        <span className="font-bold text-teal-400">{selectedSchool.studentCount || 1100} nafar</span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-mono">SR4S Reytingi:</div>
                        <div className="text-lg font-black text-emerald-400 mt-0.5">
                          {selectedSchool.currentScore > 0
                            ? `${((selectedSchool.currentScore / 100) * 4 + 1).toFixed(1)} ★ (${selectedSchool.currentScore} ball)`
                            : 'Baholanmagan'}
                        </div>
                      </div>
                      <ScoreStatusBadge score={selectedSchool.currentScore} />
                    </div>
                  </div>
                ) : null}

                {/* Quick list */}
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    Hududdagi Maktablar ({filteredSchools.length} ta)
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {filteredSchools.slice(0, 6).map((sch) => (
                      <button
                        key={sch.id}
                        onClick={() => setSelectedSchool(sch)}
                        className={cn(
                          'w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors',
                          selectedSchool?.id === sch.id
                            ? 'bg-teal-950 text-teal-200 font-bold border border-teal-800'
                            : 'hover:bg-slate-900 text-slate-300'
                        )}
                      >
                        <div className="truncate pr-2">
                          <div className="truncate font-bold text-white">{sch.name}</div>
                          <div className="text-[10px] text-slate-500">{sch.districtName}</div>
                        </div>
                        <ScoreStatusBadge score={sch.currentScore} showScore={true} showIcon={false} className="py-0 px-2 text-[10px]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Presidential Action Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Yagona Davlat Standarti Bazasiga Integratsiya</div>
              <div className="text-[11px] text-slate-400">Har bir maktabning to‘liq yo‘l xavfsizligi pasporti shakllantirilgan</div>
            </div>
          </div>

          <Link href="/map">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-500 text-white font-bold gap-2 text-xs rounded-2xl h-12 px-7 shadow-lg shadow-teal-900/30">
              <span>Barcha 10 193 ta maktabni to‘liq xaritada ochish</span>
              <ArrowRight className="w-4 h-4 text-teal-200" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

