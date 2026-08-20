'use client';

import React, { useEffect, useState } from 'react';
import { statisticsService, NationalStatisticsSummary } from '@/services/statisticsService';
import { schoolService } from '@/services/schoolService';
import { School, ShieldAlert, Map, Building2, CheckCircle2 } from 'lucide-react';

export function MetricsStrip() {
  const [stats, setStats] = useState<NationalStatisticsSummary | null>(null);
  const [regionCount, setRegionCount] = useState(14);
  const [districtCount, setDistrictCount] = useState(208);

  useEffect(() => {
    statisticsService.getNationalSummary().then((s) => setStats(s)).catch(() => {});
    schoolService.getRegions().then((r) => setRegionCount(r.length)).catch(() => {});
    schoolService.getDistricts().then((d) => setDistrictCount(d.length)).catch(() => {});
  }, []);

  const totalSchoolsDisplay = stats?.totalSchools ? stats.totalSchools.toLocaleString() : '10 110';

  const metrics = [
    {
      label: 'Monitoringdagi maktablar',
      value: `${totalSchoolsDisplay} ta`,
      subtext: 'Respublika bo‘yicha to‘liq reyestr',
      icon: School,
    },
    {
      label: 'Yo‘l xavfsizligi mezoni',
      value: '8 ta',
      subtext: '100 ballik milliy standart',
      icon: ShieldAlert,
    },
    {
      label: 'Qamrab olingan tumanlar',
      value: `${districtCount} ta`,
      subtext: 'Shahar va tumanlar',
      icon: Building2,
    },
    {
      label: 'Qamrab olingan hududlar',
      value: `${regionCount} ta`,
      subtext: 'Barcha viloyatlar va Qoraqalpogʻiston',
      icon: Map,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        {/* Header tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Milliy monitoring tizimi ko‘rsatkichlari (PostgreSQL)</span>
          </div>
          <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full font-bold">
            Real Ma’lumotlar Bazasi (2025–2026 O‘quv yili)
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-teal-700 shadow-2xs">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
