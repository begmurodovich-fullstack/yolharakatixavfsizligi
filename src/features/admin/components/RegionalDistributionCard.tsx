'use client';

import React, { useState, useEffect } from 'react';
import { AdminDashboardSummary } from '@/services/adminService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Map, TrendingUp } from 'lucide-react';

interface RegionalDistributionCardProps {
  regionalBreakdown: AdminDashboardSummary['regionalBreakdown'];
}

export function RegionalDistributionCard({ regionalBreakdown }: RegionalDistributionCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = regionalBreakdown.map((r) => ({
    name: r.regionName.replace(' viloyati', '').replace(' shahri', ''),
    fullName: r.regionName,
    averageScore: r.averageScore,
    schools: r.totalSchools,
    verifiedPercent: r.verifiedPercent,
    fill: r.averageScore >= 80 ? '#10b981' : r.averageScore >= 60 ? '#0d9488' : '#f59e0b',
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Hududlar Kesimida O‘rtacha Xavfsizlik Bali
            </h2>
            <p className="text-xs text-slate-500">
              Viloyatlar va Toshkent shahri maktablarining monitoring natijalari
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
          <TrendingUp className="w-4 h-4" />
          <span>Davlat standarti: &ge;80 ball</span>
        </div>
      </div>

      {mounted && (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 25 }}>
              <XAxis
                dataKey="name"
                interval={0}
                angle={-20}
                textAnchor="end"
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                height={45}
              />
              <YAxis domain={[0, 100]} unit=" ball" tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                formatter={(value: any, _name: any, props: any) => [
                  `${value} ball (${props.payload.schools} ta maktab, ${props.payload.verifiedPercent}% geolokatsiya tasdiqlangan)`,
                  props.payload.fullName,
                ]}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="averageScore" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
