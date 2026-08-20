'use client';

import React, { useEffect, useState } from 'react';
import { statisticsService, NationalStatisticsSummary } from '@/services/statisticsService';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function StatisticsPreviewSection() {
  const [stats, setStats] = useState<NationalStatisticsSummary | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    statisticsService.getNationalSummary().then((s) => setStats(s));
  }, []);

  const categoryData = stats
    ? [
        { name: 'Xavfsiz (≥80)', value: stats.safeCount, percentage: stats.safePercentage, color: '#10b981' },
        { name: 'O‘rtacha (50-79)', value: stats.moderateCount, percentage: stats.moderatePercentage, color: '#f59e0b' },
        { name: 'Yuqori xavf (<50)', value: stats.highRiskCount, percentage: stats.highRiskPercentage, color: '#ef4444' },
      ]
    : [];

  const criteriaComplianceData = [
    { name: 'Yo‘l belgilari', score: 88, fill: '#0d9488' },
    { name: 'Piyodalar o‘tish joyi', score: 82, fill: '#0d9488' },
    { name: 'Tezlik to‘siqlari', score: 74, fill: '#0d9488' },
    { name: 'Hudud panjaralari', score: 65, fill: '#f59e0b' },
    { name: 'Piyodalar yo‘lagi', score: 70, fill: '#0d9488' },
    { name: 'To‘xtash zonalari', score: 62, fill: '#f59e0b' },
  ];

  return (
    <section id="statistika" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
            <span>ANALITIKA VA TAHLIL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Respublika bo‘yicha xavfsizlik tahlili
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Tizim maktablar bo‘yicha yig‘ilgan ballarni umumlashtirib, infratuzilmadagi eng zaif
            va eng kuchli yo‘nalishlarni avtomatik tahlil qiladi.
          </p>
        </div>

        {/* Charts & KPI Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chart: Category Distribution */}
          <Card className="lg:col-span-5 border-slate-200 bg-white shadow-xs flex flex-col justify-between">
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-900">
                  Xavfsizlik toifalari taqsimoti
                </CardTitle>
                <span className="text-xs font-semibold text-slate-500 font-mono">
                  O‘rtacha: {stats?.averageScore || 78} ball
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-6">
              {/* Category donut / bar preview */}
              {mounted && (
                <div className="h-56 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={4}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '8px',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Legends list */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="font-medium text-slate-700">{cat.name}</span>
                    </div>
                    <div className="font-bold text-slate-900">
                      {cat.value} ta ({cat.percentage}%)
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Chart: Criteria Compliance Bar Breakdown */}
          <Card className="lg:col-span-7 border-slate-200 bg-white shadow-xs">
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-900">
                  Mezonlar bo‘yicha o‘rtacha bajarilish ko‘rsatkichi (%)
                </CardTitle>
                <div className="flex items-center gap-1 text-xs text-teal-700 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Davlat standarti</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-2 space-y-4">
              {mounted && (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={criteriaComplianceData}
                      layout="vertical"
                      margin={{ top: 10, right: 20, left: 30, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(val: number) => [`${val}% bajarilgan`, 'Natija']}
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '8px',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {criteriaComplianceData.map((entry, index) => (
                          <Cell key={`bar-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Insights strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-emerald-900">Eng yuqori ko‘rsatkich:</div>
                    <div className="text-emerald-700">Yo‘l belgilari va piyodalar o‘tish joylari (88%)</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-amber-900">E’tibor talab soha:</div>
                    <div className="text-amber-700">O‘quvchilarni tushirish zonalari va panjaralar (62%)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
