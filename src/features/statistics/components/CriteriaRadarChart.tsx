'use client';

import React, { useState, useEffect } from 'react';
import { CriterionScoreInfo } from '@/features/dashboard/components';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Activity, Shield } from 'lucide-react';

interface CriteriaRadarChartProps {
  criterionScores: CriterionScoreInfo[];
}

export function CriteriaRadarChart({ criterionScores }: CriteriaRadarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = criterionScores.map((item) => ({
    subject: item.criterion.title.split(' ')[0] + ' ' + (item.criterion.title.split(' ')[1] || ''),
    fullName: item.criterion.title,
    schoolScore: item.percentage,
    standard: 80, // State benchmark requirement
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              8 Mezon Bo‘yicha Ko‘p Qirrali Profil (Radar)
            </h3>
            <p className="text-[11px] text-slate-500">
              Maktab natijasi va davlat standarti (&ge;80%) taqqoslanishi
            </p>
          </div>
        </div>
      </div>

      {mounted && (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={{ fontSize: 9 }} />
              <Tooltip
                formatter={(value: any, name: any) => [
                  `${value}%`,
                  name === 'schoolScore' || name === 'Maktabingiz' ? 'Maktabingiz' : 'Davlat standarti',
                ]}
                labelFormatter={(_label: any, payload: any) => {
                  if (payload && payload[0]?.payload) {
                    return payload[0].payload.fullName || '';
                  }
                  return '';
                }}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              />
              {/* Benchmark Radar */}
              <Radar
                name="Davlat standarti"
                dataKey="standard"
                stroke="#94a3b8"
                strokeDasharray="3 3"
                fill="#94a3b8"
                fillOpacity={0.15}
              />
              {/* School Radar */}
              <Radar
                name="Maktabingiz"
                dataKey="schoolScore"
                stroke="#0d9488"
                fill="#0d9488"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
          <span className="font-semibold text-slate-700">Maktabingiz natijasi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400 border border-dashed border-slate-600" />
          <span className="text-slate-500">Davlat talabi (80%)</span>
        </div>
      </div>
    </div>
  );
}
