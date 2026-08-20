'use client';

import React, { useState, useEffect } from 'react';
import { CriterionScoreInfo } from './CriteriaOverview';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

interface StatisticsPreviewProps {
  criterionScores: CriterionScoreInfo[];
}

export function StatisticsPreview({ criterionScores }: StatisticsPreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = criterionScores.map((item) => ({
    name: item.criterion.title.split(' ')[0] + ' ' + (item.criterion.title.split(' ')[1] || ''),
    fullName: item.criterion.title,
    percentage: item.percentage,
    earned: item.earnedScore,
    max: item.maxScore,
    fill: item.percentage >= 80 ? '#10b981' : item.percentage >= 50 ? '#f59e0b' : '#ef4444',
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Mezonlar Bo‘yicha Natijadorlik (%)
            </h2>
            <p className="text-xs text-slate-500">
              Har bir xavfsizlik parametri bo‘yicha foiz ko‘rsatkichi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-xs text-teal-700 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Davlat normativi: &ge;80%</span>
          </div>
          <a
            href="/school/statistics"
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
          >
            <span>To‘liq statistika</span>
            <BarChart3 className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Chart Container */}
      {mounted && (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
              <XAxis
                dataKey="name"
                interval={0}
                angle={-25}
                textAnchor="end"
                tick={{ fontSize: 10, fill: '#64748b' }}
                height={50}
              />
              <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                formatter={(value: number, _name: string, props: any) => [
                  `${value}% (${props.payload.earned}/${props.payload.max} ball)`,
                  props.payload.fullName,
                ]}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
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
