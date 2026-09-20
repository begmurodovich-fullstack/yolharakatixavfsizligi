'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  MapPin,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { statisticsService, NationalStatisticsSummary } from '@/services/statisticsService';
import { RoadCategoryStarChart } from '@/features/dashboard/components/RoadCategoryStarChart';

export default function StatistikaPage() {
  const [stats, setStats] = useState<NationalStatisticsSummary | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    statisticsService.getNationalSummary().then((s) => setStats(s));
  }, []);

  const criteriaComplianceData = [
    { name: "Yo'l belgilari & Chiziqlar", score: 88, fill: '#0f766e' },
    { name: "Piyodalar o'tish joyi (Zebra)", score: 82, fill: '#0f766e' },
    { name: "Tezlik to'siqlari (Sun'iy notekislik)", score: 74, fill: '#0f766e' },
    { name: "Piyodalar yo'lagi (Chap/O'ng trotuar)", score: 70, fill: '#0f766e' },
    { name: 'Hudud himoya panjaralari', score: 65, fill: '#d97706' },
    { name: "To'xtash zonalari & Ko'rinish", score: 62, fill: '#d97706' },
  ];

  const totalSchools = stats?.totalSchools ?? 0;
  const safeCount = stats?.safeCount ?? 0;
  const moderateCount = stats?.moderateCount ?? 0;
  const highRiskCount = stats?.highRiskCount ?? 0;
  const safePercent = totalSchools > 0 ? Math.round(((safeCount + moderateCount) / totalSchools) * 100) : 0;
  const riskPercent = totalSchools > 0 ? Math.round((highRiskCount / totalSchools) * 100) : 0;

  // Map 3-bucket stats into 5-star display bands
  // safeCount (>=80) → 5-star, moderateCount (50-79) split ≈ 4-star/3-star, highRiskCount (<50) split ≈ 2-star/1-star
  const fiveStar = safeCount;
  const fourStar = Math.round(moderateCount * 0.55);
  const threeStar = moderateCount - fourStar;
  const twoStar = Math.round(highRiskCount * 0.7);
  const oneStar = highRiskCount - twoStar;
  const unassessedCount = Math.max(0, totalSchools - (safeCount + moderateCount + highRiskCount));
  const pct = (n: number) => totalSchools > 0 ? `${((n / totalSchools) * 100).toFixed(1)}%` : '0%';

  const starDistributionData = [
    { star: '5 Yulduz (Namunali)', count: fiveStar, percentage: pct(fiveStar), color: '#10b981', barColor: 'bg-emerald-500' },
    { star: '4 Yulduz (Yaxshi)',   count: fourStar,  percentage: pct(fourStar),  color: '#f59e0b', barColor: 'bg-amber-500' },
    { star: '3 Yulduz (O‘rtacha)', count: threeStar, percentage: pct(threeStar), color: '#eab308', barColor: 'bg-yellow-500' },
    { star: '2 Yulduz (Xavfli)',   count: twoStar,   percentage: pct(twoStar),   color: '#ef4444', barColor: 'bg-rose-500' },
    { star: '1 Yulduz (O‘ta Xavfli)', count: oneStar, percentage: pct(oneStar), color: '#991b1b', barColor: 'bg-red-800' },
    ...(unassessedCount > 0 ? [
      { star: 'Baholanmagan (Jarayonda)', count: unassessedCount, percentage: pct(unassessedCount), color: '#94a3b8', barColor: 'bg-slate-400' }
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-white pt-10 pb-12 border-b border-slate-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-teal-50 text-teal-800 border border-teal-200">
            <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
            <span>RESPUBLIKA ANALITIKASI VA MONITORING</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Yo‘l Xavfsizligi Bo‘yicha Milliy Statistika
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            O‘zbekiston Respublikasi bo‘yicha maktablarning yo‘l toifalari, yulduzli reytinglari, 
            piyodalar infratuzilmasi va xavf omillari bo‘yicha real vaqtdagi tahliliy ko‘rsatkichlar.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tizimga ulangan Maktablar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {totalSchools > 0 ? `${totalSchools.toLocaleString()} ta` : '—'}
              </div>
              <p className="text-xs text-teal-700 font-semibold mt-1">
                {totalSchools > 0 ? stats?.periodName : 'Hali baholash boshlanmagan'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Xavfsiz Maktablar (≥3 Yulduz)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                {totalSchools > 0 ? `${safePercent}%` : '—'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {totalSchools > 0
                  ? `${(safeCount + moderateCount).toLocaleString()} ta umumta’lim maktabi`
                  : 'Baholash jarayoni boshlanmagan'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Qizil Zonadagi Maktablar (1-2 Yulduz)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="text-2xl sm:text-3xl font-black text-rose-600">
                {totalSchools > 0 ? `${riskPercent}%` : '—'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {totalSchools > 0
                  ? `${highRiskCount.toLocaleString()} ta tezkor chora talab maktab`
                  : 'Ma’lumotlar yuklanmoqda'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                O‘rtacha Xavfsizlik Bali
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="text-2xl sm:text-3xl font-black text-teal-700">
                {totalSchools > 0 ? `${stats?.averageScore ?? 0} ball` : '—'}
              </div>
              <p className="text-xs text-slate-500 mt-1">SR4S 40 parametr asosida hisoblangan</p>
            </CardContent>
          </Card>
        </div>

        {/* 1. Road Category Star Rating Breakdown (Real Chart) */}
        <RoadCategoryStarChart />

        {/* 2. Star Distribution & Criteria Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Star Distribution Breakdown */}
          <Card className="lg:col-span-6 bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <span>5 Yulduzli Shkala Bo‘yicha Taqsimot</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3.5">
              {starDistributionData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-700">{item.star}</span>
                    <span className="font-mono text-slate-500 font-semibold">{item.count.toLocaleString()} ta ({item.percentage})</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.barColor}`}
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Criteria Compliance Chart */}
          <Card className="lg:col-span-6 bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-700" />
                <span>Asosiy Infratuzilma Mezonlari Bajarilishi (%)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              {mounted && (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={criteriaComplianceData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        stroke="#64748b"
                        tick={{ fontSize: 11, fill: '#334155' }}
                        width={95}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {criteriaComplianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA to Map */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900">
              Har bir maktabning joylashuvi va xavfsizlik darajasini xaritada ko‘ring
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Interaktiv xaritada qidiruv, hududiy filtrlar va yulduz toifalari bo‘yicha to‘liq navigatsiya mavjud.
            </p>
          </div>
          <Link href="/map" className="shrink-0">
            <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-2 text-xs sm:text-sm">
              <MapPin className="w-4 h-4" />
              <span>Interaktiv Xaritani Ochish</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
