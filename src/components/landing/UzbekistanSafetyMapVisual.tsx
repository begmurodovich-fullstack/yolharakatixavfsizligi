'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { School, CoordinateStatus, SchoolStatus } from '@/types';
import { schoolService } from '@/services/schoolService';
import { MapPin, Activity, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

// Dynamically import Leaflet Map without SSR to prevent window undefined error
const RealLeafletMap = dynamic(
  () => import('@/components/map/RealLeafletMap').then((mod) => mod.RealLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-slate-900 text-slate-400 gap-3 rounded-xl border border-slate-800">
        <Loader2 className="w-7 h-7 animate-spin text-teal-400" />
        <span className="text-xs font-mono">🛰️ Sun’iy yo‘ldosh xaritasi yuklanmoqda...</span>
      </div>
    ),
  }
);

// Fallback sample verified & assessed schools if DB has limited entries
const FALLBACK_VERIFIED_SCHOOLS: School[] = [
  {
    id: 'sch-bux-24',
    name: '24-sonli umumiy o‘rta ta’lim maktabi',
    schoolNumber: '24',
    regionId: 'reg-bukhara',
    regionName: 'Buxoro viloyati',
    districtId: 'dis-bukhara-city',
    districtName: 'Buxoro shahri',
    directorName: 'Direktor F.I.Sh.',
    status: SchoolStatus.ACTIVE,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
    coordinates: {
      latitude: 39.7747,
      longitude: 64.4286,
      status: CoordinateStatus.VERIFIED,
    },
    coordinateStatus: CoordinateStatus.VERIFIED,
    currentScore: 84,
    studentCount: 1150,
  },
  {
    id: 'sch-tas-17',
    name: '17-sonli ixtisoslashtirilgan maktab',
    schoolNumber: '17',
    regionId: 'reg-tashkent-city',
    regionName: 'Toshkent shahri',
    districtId: 'dis-mirzo-ulugbek',
    districtName: 'Mirzo Ulug‘bek tumani',
    directorName: 'Direktor F.I.Sh.',
    status: SchoolStatus.ACTIVE,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
    coordinates: {
      latitude: 41.3265,
      longitude: 69.3242,
      status: CoordinateStatus.VERIFIED,
    },
    coordinateStatus: CoordinateStatus.VERIFIED,
    currentScore: 92,
    studentCount: 1420,
  },
  {
    id: 'sch-sam-09',
    name: '9-sonli umumiy o‘rta ta’lim maktabi',
    schoolNumber: '9',
    regionId: 'reg-samarkand',
    regionName: 'Samarqand viloyati',
    districtId: 'dis-samarkand-city',
    districtName: 'Samarqand shahri',
    directorName: 'Direktor F.I.Sh.',
    status: SchoolStatus.ACTIVE,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
    coordinates: {
      latitude: 39.6542,
      longitude: 66.9597,
      status: CoordinateStatus.VERIFIED,
    },
    coordinateStatus: CoordinateStatus.VERIFIED,
    currentScore: 88,
    studentCount: 1280,
  },
  {
    id: 'sch-fer-11',
    name: '11-sonli maktab',
    schoolNumber: '11',
    regionId: 'reg-fergana',
    regionName: 'Farg‘ona viloyati',
    districtId: 'dis-fergana-city',
    districtName: 'Farg‘ona shahri',
    directorName: 'Direktor F.I.Sh.',
    status: SchoolStatus.ACTIVE,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
    coordinates: {
      latitude: 40.3842,
      longitude: 71.7843,
      status: CoordinateStatus.VERIFIED,
    },
    coordinateStatus: CoordinateStatus.VERIFIED,
    currentScore: 82,
    studentCount: 980,
  },
];

export function UzbekistanSafetyMapVisual() {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const list = await schoolService.getSchools({
          coordinateStatus: CoordinateStatus.VERIFIED,
          limit: 100,
        });

        if (isMounted) {
          // FILTER: Only verified AND assessed schools
          const assessedAndVerified = list.filter(
            (s) =>
              (s.coordinateStatus === CoordinateStatus.VERIFIED ||
                s.coordinates?.status === CoordinateStatus.VERIFIED) &&
              s.currentScore > 0 &&
              s.coordinates?.latitude &&
              s.coordinates?.longitude
          );

          if (assessedAndVerified.length > 0) {
            setSchools(assessedAndVerified);
            setSelectedSchool(assessedAndVerified[0]);
          } else {
            // Use fallback verified & assessed schools
            setSchools(FALLBACK_VERIFIED_SCHOOLS);
            setSelectedSchool(FALLBACK_VERIFIED_SCHOOLS[0]);
          }
        }
      } catch (err) {
        console.warn('Could not fetch verified schools for landing map, using verified fallback:', err);
        if (isMounted) {
          setSchools(FALLBACK_VERIFIED_SCHOOLS);
          setSelectedSchool(FALLBACK_VERIFIED_SCHOOLS[0]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const starVal = selectedSchool ? ((selectedSchool.currentScore || 80) / 20).toFixed(1) : '4.2';

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background glow and modern frame */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-950 p-4 sm:p-5 shadow-2xl overflow-hidden text-slate-100 backdrop-blur-sm">
        {/* Header HUD */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-teal-400 font-bold tracking-wider">
              RESPUBLIKA MONITORINGI
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> 4-5★ Xavfsiz
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> 3★ O‘rta
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> 1-2★ Xavfli
            </span>
          </div>
        </div>

        {/* Real Leaflet Satellite Map View */}
        <div className="relative z-10 w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
          <RealLeafletMap
            schools={schools}
            selectedSchool={selectedSchool}
            onSelectSchool={(sch) => setSelectedSchool(sch)}
          />

          {/* High-tech Satellite Layer Badge */}
          <div className="absolute top-3 left-3 z-[400] px-2.5 py-1 rounded-lg bg-slate-900/90 text-teal-300 border border-teal-500/40 text-[10px] font-mono font-bold shadow-md backdrop-blur-xs flex items-center gap-1.5 pointer-events-none">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>🛰️ Sun’iy Yo‘ldosh (Esri World Imagery HD)</span>
          </div>
        </div>

        {/* Selected School Interactive Information Panel */}
        <div className="relative z-10 mt-3 pt-3 border-t border-slate-800/80 bg-slate-900/90 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-950/80 border border-teal-800 text-teal-400 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-slate-400 font-medium">Tanlangan maktab:</div>
              <div className="text-sm font-bold text-white truncate max-w-[220px] sm:max-w-xs">
                {selectedSchool?.name || '24-maktab'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {selectedSchool?.districtName}, {selectedSchool?.regionName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Yulduzli reyting:</div>
              <div className="text-sm font-extrabold font-mono text-emerald-400">
                {starVal} ★ ({selectedSchool?.currentScore || 84} ball)
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Holati:</div>
              <div className="text-xs font-semibold text-teal-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Tasdiqlangan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer caption with CTA */}
        <div className="relative z-10 mt-2 text-center text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-1 pt-2 border-t border-slate-800">
          <span className="flex items-center gap-1 text-slate-400">
            <Activity className="w-3 h-3 text-teal-500" />
            <span>Faqatgina ro‘yxatdan o‘tgan va baholangan maktablar ko‘rsatilmoqda</span>
          </span>
          <Link
            href="/map"
            className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 text-[11px] hover:underline"
          >
            <span>🛰️ Sun’iy yo‘ldosh xaritasini to‘liq ochish ↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
