'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { School, Region, District } from '@/types';
import { schoolService } from '@/services/schoolService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Search,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically load Leaflet Map without SSR
const RealLeafletMap = dynamic(
  () => import('@/components/map/RealLeafletMap').then((mod) => mod.RealLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-3">
        <div className="h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono font-bold">OpenStreetMap Xaritasi Yuklanmoqda...</span>
      </div>
    ),
  }
);

export default function PublicMapPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [selectedRegionId, setSelectedRegionId] = useState<string>('ALL');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedCoordStatus, setSelectedCoordStatus] = useState<string>('VERIFIED');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load regions & verified schools from PostgreSQL
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [schList, regList] = await Promise.all([
          schoolService.getSchools({
            coordinateStatus: 'VERIFIED' as any,
            limit: 500,
          }),
          schoolService.getRegions(),
        ]);
        setSchools(schList);
        setRegions(regList);
        if (schList.length > 0) {
          setSelectedSchool(schList[0]);
        }
      } catch (e) {
        console.error('Error loading map data:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Load districts when region changes
  useEffect(() => {
    if (selectedRegionId && selectedRegionId !== 'ALL') {
      schoolService.getDistricts(selectedRegionId).then(setDistricts).catch(() => {});
    } else {
      setDistricts([]);
      setSelectedDistrictId('ALL');
    }
  }, [selectedRegionId]);

  // Trigger search / filter from PostgreSQL
  const handleFilter = async () => {
    setIsLoading(true);
    try {
      const filtered = await schoolService.getSchools({
        regionId: selectedRegionId !== 'ALL' ? selectedRegionId : undefined,
        districtId: selectedDistrictId !== 'ALL' ? selectedDistrictId : undefined,
        scoreStatus: selectedRisk !== 'ALL' ? (selectedRisk as any) : undefined,
        coordinateStatus: selectedCoordStatus !== 'ALL' ? (selectedCoordStatus as any) : undefined,
        searchQuery: searchQuery.trim() || undefined,
        limit: 500,
      });
      setSchools(filtered);
      if (filtered.length > 0) {
        setSelectedSchool(filtered[0]);
      } else {
        setSelectedSchool(null);
      }
    } catch (e) {
      console.error('Error filtering schools:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-semibold hidden sm:inline">Bosh sahifa</span>
          </Link>

          <div className="h-5 w-px bg-slate-800" />

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-slate-950 font-black shadow-md">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white">
                O‘zbekiston Maktablari Yo‘l Xavfsizligi Xaritasi
              </div>
              <div className="text-[10px] font-mono text-teal-400">
                10 110 ta maktab geolokatsiyasi (OpenStreetMap Real Xarita)
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl h-9 px-4 shadow-xs"
            >
              <span>Tizimga Kirish</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Map Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Side: Filter & Search Panel */}
        <aside className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/95 flex flex-col shrink-0 z-10">
          {/* Filters Form */}
          <div className="p-4 space-y-3 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="text"
                placeholder="Maktab raqami yoki nomi bo‘yicha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                className="pl-9 text-xs h-9 rounded-xl bg-slate-950 border-slate-800 text-white placeholder:text-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={selectedRegionId}
                onChange={(e) => setSelectedRegionId(e.target.value)}
                className="w-full text-xs h-9 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 px-2.5 focus:outline-none focus:border-teal-500 font-medium"
              >
                <option value="ALL">Barcha viloyatlar</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedDistrictId}
                disabled={districts.length === 0}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="w-full text-xs h-9 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 px-2.5 focus:outline-none focus:border-teal-500 font-medium disabled:opacity-50"
              >
                <option value="ALL">Barcha tumanlar</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="w-full text-xs h-9 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 px-2.5 focus:outline-none focus:border-teal-500 font-medium"
              >
                <option value="ALL">Barcha toifalar</option>
                <option value="GREEN">🟢 Yashil (&gt;= 80)</option>
                <option value="YELLOW">🟡 Sariq (50-79)</option>
                <option value="RED">🔴 Qizil (&lt; 50)</option>
              </select>

              <select
                value={selectedCoordStatus}
                onChange={(e) => setSelectedCoordStatus(e.target.value)}
                className="w-full text-xs h-9 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 px-2.5 focus:outline-none focus:border-teal-500 font-medium"
              >
                <option value="VERIFIED">✅ Tasdiqlanganlar</option>
                <option value="ALL">📋 Barchasi</option>
                <option value="PENDING">⏳ Kutilayotganlar</option>
              </select>
            </div>

            <Button
              type="button"
              onClick={handleFilter}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs h-9 rounded-xl"
            >
              Filtrlash va Qidirish
            </Button>
          </div>

          {/* School Results Counter */}
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Xaritada: {schools.length} ta maktab</span>
            <span className="text-teal-400 font-bold">
              {selectedCoordStatus === 'VERIFIED' ? 'Faqat Tasdiqlanganlar' : 'Barcha Maktablar'}
            </span>
          </div>

          {/* Scrollable School List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 max-h-[260px] lg:max-h-none">
            {isLoading ? (
              <div className="p-4 space-y-3">
                <Skeleton className="h-16 w-full bg-slate-800 rounded-xl" />
                <Skeleton className="h-16 w-full bg-slate-800 rounded-xl" />
                <Skeleton className="h-16 w-full bg-slate-800 rounded-xl" />
              </div>
            ) : schools.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                Ushbu filtr bo‘yicha maktab topilmadi.
              </div>
            ) : (
              schools.map((sch) => {
                const isSelected = selectedSchool?.id === sch.id;
                const score = sch.currentScore || 0;
                const isAssessed = score > 0;
                const badgeColor = !isAssessed
                  ? 'text-slate-400 bg-slate-800/80 border-slate-700'
                  : score >= 80
                  ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
                  : score >= 50
                  ? 'text-amber-400 bg-amber-950/60 border-amber-800'
                  : 'text-rose-400 bg-rose-950/60 border-rose-800';

                return (
                  <div
                    key={sch.id}
                    onClick={() => setSelectedSchool(sch)}
                    className={`p-3.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-950/50 border-l-4 border-l-teal-500'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-white line-clamp-1">
                          {sch.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {sch.districtName}, {sch.regionName}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}
                      >
                        {isAssessed ? `${score} ball` : 'Baholanmagan'}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{sch.directorName || 'Direktor kiritilmagan'}</span>
                      <span className="text-slate-400 font-semibold">
                        {sch.coordinates?.latitude || 40.1032}, {sch.coordinates?.longitude || 64.6756}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Side: Real Interactive Leaflet OpenStreetMap */}
        <main className="flex-1 relative flex flex-col bg-slate-950">
          <div className="w-full h-full min-h-[450px] relative">
            <RealLeafletMap
              schools={schools}
              selectedSchool={selectedSchool}
              onSelectSchool={setSelectedSchool}
            />

            {/* Informative Notice when no verified schools exist yet */}
            {schools.length === 0 && !isLoading && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 max-w-md w-[90%] p-5 rounded-3xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-md">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-white">
                    Hozircha Tasdiqlangan Maktablar Mavjud Emas
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Xarita faqat YHXB inspektori tomonidan geolokatsiyasi rasman tekshirilib tasdiqlangan maktablarni aks ettiradi. Maktablar birinchi marta login qilib joylashuvini yuborgach, xaritada paydo bo‘ladi.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCoordStatus('ALL');
                    schoolService
                      .getSchools({ limit: 500 })
                      .then((list) => {
                        setSchools(list);
                        if (list.length > 0) setSelectedSchool(list[0]);
                      });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold text-xs border border-slate-700 transition-colors"
                >
                  <span>Barcha maktablar ro‘yxatini ko‘rish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Floating School Details HUD */}
          {selectedSchool && (
            <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 z-10 rounded-3xl border border-slate-700/80 bg-slate-900/95 backdrop-blur-xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom-4 duration-200">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500 text-slate-950 font-black shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-teal-400">
                      Tanlangan Maktab
                    </span>
                    <h3 className="text-sm font-black text-white line-clamp-1">
                      {selectedSchool.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedSchool.districtName}, {selectedSchool.regionName}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                      selectedSchool.currentScore >= 80
                        ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
                        : selectedSchool.currentScore >= 50
                        ? 'text-amber-400 bg-amber-950/60 border-amber-800'
                        : 'text-rose-400 bg-rose-950/60 border-rose-800'
                    }`}
                  >
                    {selectedSchool.currentScore || 0} / 100 ball
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-400">
                  GPS: {selectedSchool.coordinates?.latitude || 40.1032}° N,{' '}
                  {selectedSchool.coordinates?.longitude || 64.6756}° E
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                  ✓ Tasdiqlangan
                </span>
              </div>

              <Link href="/login" className="block pt-1">
                <Button
                  size="sm"
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl h-9 gap-1.5 shadow-xs"
                >
                  <span>Maktab Portaliga Kirish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
