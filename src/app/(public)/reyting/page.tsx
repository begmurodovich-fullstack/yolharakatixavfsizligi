'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Medal,
  Shield,
  Search,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Star,
} from 'lucide-react';
import { rankingService } from '@/services/rankingService';
import { RankingEntry } from '@/types';
import { StarRatingBadge, getStarRating } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

export default function ReytingPage() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | '5star' | '4star' | '3star' | 'risk'>('all');

  useEffect(() => {
    rankingService.getRepublicRankings().then((res) => {
      setRankings(res);
      setIsLoading(false);
    });
  }, []);

  const filteredRankings = useMemo(() => {
    let list = [...rankings];

    if (filterType === '5star') {
      list = list.filter((item) => (item.score || 0) >= 90);
    } else if (filterType === '4star') {
      list = list.filter((item) => (item.score || 0) >= 75 && (item.score || 0) < 90);
    } else if (filterType === '3star') {
      list = list.filter((item) => (item.score || 0) >= 60 && (item.score || 0) < 75);
    } else if (filterType === 'risk') {
      list = list.filter((item) => (item.score || 0) < 60);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.entityName.toLowerCase().includes(q) ||
          (item.regionName && item.regionName.toLowerCase().includes(q)) ||
          (item.districtName && item.districtName.toLowerCase().includes(q))
      );
    }

    return list;
  }, [rankings, searchQuery, filterType]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-white pt-10 pb-12 border-b border-slate-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-50 text-amber-900 border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>RESPUBLIKA SHAFSHOF 5 YULDUZLI REYTINGI</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Maktablar Xavfsizlik Reytingi (SR4S 5 Yulduz)
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Respublika bo‘yicha 10 110 ta umumta’lim maktabining 40 ta xalqaro SR4S parametri asosida
            hisoblangan 5 yulduzli xavfsizlik reytingi va milliy yetakchilik jadvali.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                5⭐️ va 4⭐️ Namunali Maktablar
              </CardTitle>
              <Medal className="w-5 h-5 text-emerald-600" />
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                {isLoading ? '...' : `${rankings.filter((r) => (r.score || 0) >= 75).length} ta`}
              </div>
              <p className="text-xs text-slate-500 mt-1">Xalqaro yuqori xavfsizlik standarti</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Baholangan Maktablar
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-teal-600" />
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="text-2xl sm:text-3xl font-black text-teal-700">
                {isLoading ? '...' : rankings.length > 0 ? `${rankings.length} ta` : '—'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {rankings.length > 0 ? 'SR4S 40 parametr bo‘yicha baholangan' : 'Hali baholash amalga oshirilmagan'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-2xs">
            <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                1⭐️ va 2⭐️ Xavfli Zonadagi Maktablar
              </CardTitle>
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="text-2xl sm:text-3xl font-black text-rose-700">
                {isLoading ? '...' : `${rankings.filter((r) => (r.score || 0) < 60).length} ta`}
              </div>
              <p className="text-xs text-slate-500 mt-1">Tezkor infratuzilma ta’mirlanishi talab etiladi</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Maktab, tuman yoki viloyat nomi bo‘yicha qidirish..."
              className="pl-10 bg-slate-50 border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setFilterType('5star')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === '5star'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              5⭐️ Namunali
            </button>
            <button
              onClick={() => setFilterType('4star')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === '4star'
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              4⭐️ Yaxshi
            </button>
            <button
              onClick={() => setFilterType('3star')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === '3star'
                  ? 'bg-yellow-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              3⭐️ O‘rtacha
            </button>
            <button
              onClick={() => setFilterType('risk')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'risk'
                  ? 'bg-rose-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              1-2⭐️ Xavfli
            </button>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-b border-slate-200">
                <TableHead className="w-16 text-center text-slate-500 font-bold text-xs">O‘rin</TableHead>
                <TableHead className="text-slate-700 font-bold text-xs">Maktab nomi</TableHead>
                <TableHead className="text-slate-700 font-bold text-xs">Hudud / Tuman</TableHead>
                <TableHead className="text-center text-slate-700 font-bold text-xs">Yulduz Darajasi</TableHead>
                <TableHead className="text-center text-slate-700 font-bold text-xs">Xavfsizlik Toifasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                    Reyting ma’lumotlari yuklanmoqda...
                  </TableCell>
                </TableRow>
              ) : filteredRankings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                    Qidiruv bo‘yicha maktab topilmadi.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRankings.map((entry, idx) => {
                  const score = entry.score || 0;
                  const starInfo = getStarRating(score);
                  const rank = idx + 1;

                  return (
                    <TableRow
                      key={entry.entityId}
                      className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${
                        rank <= 3 ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      <TableCell className="text-center font-mono font-bold text-sm">
                        {rank === 1 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs">
                            🥇
                          </span>
                        ) : rank === 2 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs">
                            🥈
                          </span>
                        ) : rank === 3 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-xs">
                            🥉
                          </span>
                        ) : (
                          <span className="text-slate-500 font-semibold">{rank}</span>
                        )}
                      </TableCell>

                      <TableCell className="font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{entry.entityName}</span>
                          {rank <= 3 && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              Top {rank}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-600 text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{entry.regionName || 'Respublika'} {entry.districtName ? `(${entry.districtName})` : ''}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-center font-mono text-sm tracking-wider">
                        <span className="text-base">{starInfo.starIcons}</span>
                      </TableCell>

                      <TableCell className="text-center">
                        <StarRatingBadge score={score} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
