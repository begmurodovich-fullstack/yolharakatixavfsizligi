'use client';

import React, { useState, useEffect } from 'react';
import { HistoricalTrendItem } from '@/services/statisticsService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Info } from 'lucide-react';

interface HistoricalTrendChartProps {
  trendData: HistoricalTrendItem[];
}

export function HistoricalTrendChart({ trendData }: HistoricalTrendChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Vaqtlar Kesimidagi Dinamika (Tarixiy O‘sish)
            </h3>
            <p className="text-[11px] text-slate-500">
              O‘tgan va joriy monitoring davrlaridagi ballar o‘zgarishi
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 w-fit">
          +19 ball umumiy o‘sish
        </span>
      </div>

      {mounted && (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 15, right: 20, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="shortName"
                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
              />
              <YAxis domain={[40, 100]} unit=" ball" tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                formatter={(value: number) => [`${value} ball`, 'To‘plangan ball']}
                labelFormatter={(_label, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.periodName;
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
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0d9488"
                strokeWidth={3}
                dot={{ r: 5, fill: '#0d9488', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Historical Note Guarantee */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          <strong>Eslatma:</strong> O‘tgan davrlar natijalari faqat dinamikani tahlil qilish uchun ko‘rsatiladi
          va joriy faol reytingga ta’sir ko‘rsatmaydi.
        </span>
      </div>
    </div>
  );
}
