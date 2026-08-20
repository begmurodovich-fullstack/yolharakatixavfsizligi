'use client';

import React, { useState, useEffect } from 'react';
import { ComparativeAverages } from '@/services/statisticsService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface BenchmarkBarChartProps {
  averages: ComparativeAverages | null;
  schoolName: string;
}

export function BenchmarkBarChart({ averages, schoolName }: BenchmarkBarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const schoolScore = averages?.schoolScore ?? 84;
  const districtAvg = averages?.districtAverage ?? 78;
  const regionAvg = averages?.regionAverage ?? 74;
  const republicAvg = averages?.republicAverage ?? 71;

  const data = [
    {
      name: schoolName,
      shortName: 'Maktabingiz',
      score: schoolScore,
      fill: '#0d9488', // Teal
      isPrimary: true,
    },
    {
      name: 'Tuman o‘rtachasi',
      shortName: 'Tuman',
      score: districtAvg,
      fill: '#334155', // Slate
      isPrimary: false,
    },
    {
      name: 'Viloyat o‘rtachasi',
      shortName: 'Viloyat',
      score: regionAvg,
      fill: '#475569',
      isPrimary: false,
    },
    {
      name: 'Respublika o‘rtachasi',
      shortName: 'Respublika',
      score: republicAvg,
      fill: '#64748b',
      isPrimary: false,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Hududiy Qiyosiy Ko‘rsatkich
            </h3>
            <p className="text-[11px] text-slate-500">
              Maktab bali va tuman / viloyat / respublika o‘rtacha qiymatlari
            </p>
          </div>
        </div>
      </div>

      {mounted && (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 20 }}>
              <XAxis
                dataKey="shortName"
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
              />
              <YAxis domain={[0, 100]} unit=" ball" tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                formatter={(value: number) => [`${value} ball`, 'Natija']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 text-center">
        Maktabingiz barcha hududiy o‘rtacha ko‘rsatkichlardan yuqori natija qayd etmoqda.
      </div>
    </div>
  );
}
