'use client';

import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Star, ShieldAlert, Navigation, Layers, Info } from 'lucide-react';
import { cn } from '@/lib/cn';
import { RoadType } from '@/types';

export interface RoadCategoryStarChartProps {
  schools?: Array<{
    id: string;
    name: string;
    currentScore: number;
    roadType?: RoadType;
    starRating?: 1 | 2 | 3 | 4 | 5;
  }>;
}

const ROAD_CATEGORIES: Array<{
  id: 'ALL' | RoadType;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    id: 'ALL',
    label: 'Barcha toifadagi yo‘llar',
    shortLabel: 'Barchasi',
    description: 'Respublika bo‘yicha barcha maktablar kesimida',
  },
  {
    id: 'INTERNATIONAL',
    label: 'Xalqaro ahamiyatdagi yo‘llar (M-39, M-37...)',
    shortLabel: 'Xalqaro yo‘llar',
    description: 'Yuqori tezlikdagi tranzit xalqaro avtomagistrallar',
  },
  {
    id: 'NATIONAL',
    label: 'Davlat ahamiyatidagi yo‘llar (A-373, 4R...)',
    shortLabel: 'Davlat yo‘llari',
    description: 'Viloyatlararo va respublika ahamiyatidagi magistrallar',
  },
  {
    id: 'LOCAL',
    label: 'Mahalliy ahamiyatdagi yo‘llar',
    shortLabel: 'Mahalliy yo‘llar',
    description: 'Tumanlararo va qishloq hududlari orqali o‘tuvchi yo‘llar',
  },
  {
    id: 'URBAN',
    label: 'Shahar va qishloq ichki ko‘chalari',
    shortLabel: 'Shahar ko‘chalari',
    description: 'Shahar markaziy ko‘chalari va aholi punkti ichki yo‘llari',
  },
];

const STAR_COLORS: Record<number, { name: string; color: string; bg: string; text: string; label: string }> = {
  5: {
    name: '5 Yulduz (Yashil)',
    color: '#16a34a',
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-700',
    label: 'O‘ta xavfsiz (5★)',
  },
  4: {
    name: '4 Yulduz (Sabzirang)',
    color: '#f97316',
    bg: 'bg-orange-50 border-orange-200',
    text: 'text-orange-700',
    label: 'Yaxshi (4★)',
  },
  3: {
    name: '3 Yulduz (Sariq)',
    color: '#eab308',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    label: 'O‘rtacha (3★)',
  },
  2: {
    name: '2 Yulduz (Qizil)',
    color: '#ef4444',
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-700',
    label: 'Yuqori xavf (2★)',
  },
  1: {
    name: '1 Yulduz (To‘q qizil)',
    color: '#991b1b',
    bg: 'bg-red-100 border-red-300',
    text: 'text-red-900',
    label: 'O‘ta xavfli (1★)',
  },
};

function calculateStar(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 50) return 3;
  if (score >= 30) return 2;
  return 1;
}

export function RoadCategoryStarChart({ schools = [] }: RoadCategoryStarChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | RoadType>('ALL');

  // Filter schools by selected road type
  const filteredSchools = useMemo(() => {
    if (selectedCategory === 'ALL') return schools;
    return schools.filter((s) => s.roadType === selectedCategory);
  }, [schools, selectedCategory]);

  // Aggregate star distributions
  const starData = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    filteredSchools.forEach((s) => {
      const star = s.starRating || calculateStar(s.currentScore || 0);
      counts[star] = (counts[star] || 0) + 1;
    });

    const total = filteredSchools.length || 1;

    return [
      { star: 5, count: counts[5], percentage: Math.round((counts[5] / total) * 100), ...STAR_COLORS[5] },
      { star: 4, count: counts[4], percentage: Math.round((counts[4] / total) * 100), ...STAR_COLORS[4] },
      { star: 3, count: counts[3], percentage: Math.round((counts[3] / total) * 100), ...STAR_COLORS[3] },
      { star: 2, count: counts[2], percentage: Math.round((counts[2] / total) * 100), ...STAR_COLORS[2] },
      { star: 1, count: counts[1], percentage: Math.round((counts[1] / total) * 100), ...STAR_COLORS[1] },
    ].filter((item) => item.count > 0 || filteredSchools.length === 0);
  }, [filteredSchools]);

  const activeCategoryMeta = ROAD_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-teal-600" />
            <span>Yo‘l toifalari bo‘yicha 5 Yulduzli tahlil</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Yo‘llar va Xavfsizlik Darajalari Taqsimoti
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeCategoryMeta?.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold font-mono text-slate-800">
            Jami: {filteredSchools.length} ta maktab
          </span>
        </div>
      </div>

      {/* Road Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {ROAD_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border',
                isActive
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              )}
            >
              <span>{cat.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Donut Chart and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Donut Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[220px]">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={starData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
              >
                {starData.map((entry, index) => (
                  <Cell key={'cell-' + index} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, item) => [
                  value + ' ta maktab (' + item.payload.percentage + '%)',
                  item.payload.name,
                ]}
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              {filteredSchools.length}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Maktab
            </span>
          </div>
        </div>

        {/* Right: Star Volumes & Breakdown Cards */}
        <div className="lg:col-span-7 space-y-2.5">
          {starData.map((item) => (
            <div
              key={item.star}
              className={cn(
                'p-3 sm:p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3',
                item.star === 1 ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50/70 border-slate-200'
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: item.color }}
                />

                <div className="flex items-center gap-1 shrink-0">
                  {Array.from({ length: item.star }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-3.5 h-3.5 fill-current',
                        item.star === 5 && 'text-emerald-500',
                        item.star === 4 && 'text-orange-500',
                        item.star === 3 && 'text-amber-500',
                        item.star === 2 && 'text-red-500',
                        item.star === 1 && 'text-slate-200'
                      )}
                    />
                  ))}
                </div>

                <span
                  className={cn(
                    'text-xs font-semibold truncate',
                    item.star === 1 ? 'text-slate-200' : 'text-slate-800'
                  )}
                >
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={cn(
                    'text-xs font-mono font-bold',
                    item.star === 1 ? 'text-white' : 'text-slate-900'
                  )}
                >
                  {item.count} ta
                </span>
                <span
                  className={cn(
                    'text-xs font-mono font-semibold px-2 py-0.5 rounded-md border',
                    item.star === 1
                      ? 'bg-slate-800 text-slate-300 border-slate-700'
                      : 'bg-white text-slate-700 border-slate-200'
                  )}
                >
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Insight */}
      <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
        <Info className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
        <span>
          Ushbu xavfsizlik darajalari BMT va xalqaro <strong>SR4S (Star Rating for Schools)</strong> metodologiyasi bo‘yicha 1 dan 5 yulduzgacha hisoblanadi.
        </span>
      </div>
    </div>
  );
}
