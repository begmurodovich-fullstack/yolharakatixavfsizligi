'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { rankingService } from '@/services/rankingService';
import { RankingEntry } from '@/types';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Trophy, ArrowRight, Medal, Shield, Sparkles } from 'lucide-react';

export function RankingPreviewSection() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    rankingService.getRepublicRankings().then((res) => {
      setRankings(res.slice(0, 6)); // Top 6 for preview
      setIsLoading(false);
    });
  }, []);

  return (
    <section id="reyting" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>RESPUBLIKA SHAFSHOF REYTINGI</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Xavfsizlik natijalari va yetakchi maktablar
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Joriy baholash davri bo‘yicha to‘plangan ballar asosida barcha ta’lim muassasalarining
              avtomatik reytingi yuritiladi. Bu hududlar va maktablar o‘rtasida sog‘lom raqobatni
              va xavfsizlik infratuzilmasini yaxshilashni rag‘batlantiradi.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-700">
                <div className="p-1 rounded bg-teal-100 text-teal-800 shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <strong className="font-semibold text-slate-900">Joriy davr izolyatsiyasi:</strong> Faqat joriy
                  faol monitoring natijalari reytingga ta’sir ko‘rsatadi.
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700">
                <div className="p-1 rounded bg-teal-100 text-teal-800 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <strong className="font-semibold text-slate-900">Foto-tasdiq talabi:</strong> Ballar faqat
                  haqiqiy ekspertiza xulosasidan so‘ng hisoblanadi.
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/login">
                <Button className="bg-teal-700 hover:bg-teal-800 text-white gap-2 shadow-xs">
                  <span>Tizimga kirib to‘liq reytingni ko‘rish</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Top Ranking Table */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
              <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm">Respublika Top-6 Maktablari</span>
                </div>
                <span className="text-[11px] font-mono text-teal-300 bg-slate-800 px-2 py-0.5 rounded">
                  2025-2026 Bahorgi davr
                </span>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-14 text-center">O‘rin</TableHead>
                    <TableHead>Maktab nomi</TableHead>
                    <TableHead>Hudud / Tuman</TableHead>
                    <TableHead className="text-right">Xavfsizlik Bali</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankings.map((entry, idx) => (
                    <TableRow key={entry.entityId} className={idx < 3 ? 'bg-amber-50/20' : ''}>
                      <TableCell className="text-center font-bold text-xs">
                        {idx === 0 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800 font-bold">🥇1</span>}
                        {idx === 1 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-slate-800 font-bold">🥈2</span>}
                        {idx === 2 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-50 text-amber-900 font-bold">🥉3</span>}
                        {idx >= 3 && <span className="font-mono text-slate-500">#{entry.rank}</span>}
                      </TableCell>
                      <TableCell className="font-semibold text-xs text-slate-900">
                        {entry.entityName}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        <div className="font-medium text-slate-800">{entry.regionName}</div>
                        <div className="text-[11px] text-slate-400">{entry.districtName}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <ScoreStatusBadge score={entry.score} showScore={true} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
