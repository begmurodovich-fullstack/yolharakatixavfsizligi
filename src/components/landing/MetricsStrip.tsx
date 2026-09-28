'use client';

import React, { useEffect, useState } from 'react';
import { statisticsService, NationalStatisticsSummary } from '@/services/statisticsService';
import { schoolService } from '@/services/schoolService';
import { School, ShieldAlert, Map, Building2, CheckCircle2, Users, Star, Award, TrendingUp, Sparkles, Activity } from 'lucide-react';

// Custom animated counter hook
function useCountUp(endVal: number, durationMs = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * endVal));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endVal);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endVal, durationMs]);

  return count;
}

export function MetricsStrip() {
  const [stats, setStats] = useState<NationalStatisticsSummary | null>(null);
  const [regionCount, setRegionCount] = useState(14);
  const [districtCount, setDistrictCount] = useState(208);

  useEffect(() => {
    statisticsService.getNationalSummary().then((s) => setStats(s)).catch(() => {});
    schoolService.getRegions().then((r) => setRegionCount(r.length)).catch(() => {});
    schoolService.getDistricts().then((d) => setDistrictCount(d.length)).catch(() => {});
  }, []);

  const totalSchools = stats?.totalSchools || 10110;
  const animatedSchools = useCountUp(totalSchools, 1600);
  const animatedDistricts = useCountUp(districtCount, 1200);
  const animatedRegions = useCountUp(regionCount, 1000);
  const animatedStudents = useCountUp(2400, 1800); // 2.4 million in thousands

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 mb-16 relative z-10">
      {/* Luxury Container Frame */}
      <div className="rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        {/* Subtle Top Gold/Emerald Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-emerald-400 to-amber-400" />

        {/* Header Ribbon / Status Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Activity className="w-4 h-4 animate-pulse text-teal-600" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Respublika Milliy Monitoring Tizimi (Executive KPI)
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-mono">
                • BMT 2030 SDG 3.6 & 11.2 Standartlari
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Yagona Reyestr: 2025–2026 O‘quv Yili
            </span>
          </div>
        </div>

        {/* 4 Main Animated KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Jami Maktablar */}
          <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white shadow-md shadow-teal-700/20">
                <School className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                100% Qamrov
              </span>
            </div>
            <div className="text-3xl font-black text-slate-950 font-mono tracking-tight">
              {animatedSchools.toLocaleString()}+
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1">
              Monitoringdagi maktablar
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Respublika bo‘yicha to‘liq milliy reyestr
            </div>
          </div>

          {/* 2. O'quvchilar xavfsizligi */}
          <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md shadow-emerald-700/20">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Himoyada
              </span>
            </div>
            <div className="text-3xl font-black text-slate-950 font-mono tracking-tight">
              {(animatedStudents / 1000).toFixed(1)}M+
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1">
              O‘quvchi xavfsizligi nazorati
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Maktabga borish-kelish yo‘nalishlarida
            </div>
          </div>

          {/* 3. SR4S Xalqaro Standarti */}
          <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-700 text-white shadow-md shadow-indigo-700/20">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                iRAP / SR4S
              </span>
            </div>
            <div className="text-3xl font-black text-slate-950 font-mono tracking-tight">
              40 ta
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1">
              SR4S xavfsizlik parametri
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Xalqaro ilmiy akkreditatsiyalangan metodika
            </div>
          </div>

          {/* 4. Hududiy Qamrov */}
          <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md shadow-slate-900/20">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-800 bg-slate-200 px-2 py-0.5 rounded-md">
                14 / 14 Hudud
              </span>
            </div>
            <div className="text-3xl font-black text-slate-950 font-mono tracking-tight">
              {animatedDistricts} ta
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1">
              Tuman va shaharlar
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              To‘liq integratsiyalangan boshqaruv
            </div>
          </div>
        </div>

        {/* Star Rating Standard Strip (Official SR4S colors strictly preserved) */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Rasmiy SR4S Yulduzli Xavfsizlik Ko‘rsatkichlari:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006837]/10 border border-[#006837]/30 text-[#006837] font-bold">
              <span>5★</span>
              <span className="text-[11px] font-medium">Namunali (90-100)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8cc63f]/10 border border-[#8cc63f]/30 text-[#4c7c1b] font-bold">
              <span>4★</span>
              <span className="text-[11px] font-medium">Xavfsiz (75-89)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fff200]/20 border border-[#f39c12]/40 text-[#9a6300] font-bold">
              <span>3★</span>
              <span className="text-[11px] font-medium">O‘rtacha (50-74)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f15a24]/10 border border-[#f15a24]/30 text-[#c0392b] font-bold">
              <span>2★</span>
              <span className="text-[11px] font-medium">Xavfli (25-49)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#231f20]/10 border border-[#231f20]/30 text-[#231f20] font-bold col-span-2 sm:col-span-1">
              <span>1★</span>
              <span className="text-[11px] font-medium">O‘ta Xavfli (0-24)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
