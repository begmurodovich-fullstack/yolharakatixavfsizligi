'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import {
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MOCK_CRITERIA, MOCK_QUESTIONS } from '@/data/mock/criteria';
import { Sr4sPictogram, Sr4sPictoType } from '@/components/ui/sr4s-icon';

const MODULE_PICTO_MAP: Record<number, Sr4sPictoType> = {
  1: 'sidewalk',
  2: 'crossing',
  3: 'speed',
  4: 'school_zone',
  5: 'traffic_calming',
  6: 'sight_distance',
  7: 'lighting',
};

export default function MezonlarPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCriterionId, setSelectedCriterionId] = useState<string | null>(null);
  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({
    'crit-road-geometry': true,
    'crit-school-signs': true,
    'crit-pedestrian-sidewalks': true,
    'crit-crossings-flow': true,
    'crit-intersections-access': true,
    'crit-speeds-traffic': true,
    'crit-street-lighting': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedCriteria((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCriteria = useMemo(() => {
    if (!searchQuery.trim()) {
      if (selectedCriterionId) {
        return MOCK_CRITERIA.filter((c) => c.id === selectedCriterionId);
      }
      return MOCK_CRITERIA;
    }
    const q = searchQuery.toLowerCase().trim();
    return MOCK_CRITERIA.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        MOCK_QUESTIONS.some(
          (qu) =>
            qu.criterionId === c.id &&
            (qu.text.toLowerCase().includes(q) || (qu.code && qu.code.toLowerCase().includes(q)))
        )
    );
  }, [searchQuery, selectedCriterionId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-white pt-10 pb-12 border-b border-slate-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-teal-50 text-teal-800 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>XALQARO iRAP SR4S STANDARTLARI</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Maktab Yo‘l Xavfsizligining Rasmiy Mezonlari
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            O‘zbekiston Respublikasi umumta’lim maktablari atrofidagi yo‘l infratuzilmasini baholash uchun
            mo‘ljallangan 7 ta asosiy yo‘nalish va 40 ta xalqaro SR4S parametri katalogi.
          </p>

          {/* Test Notice */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5 max-w-3xl">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Eslatma:</strong> Mezonlar va metodologiya hozirda pilot sinov (test) rejimida qo‘llanilmoqda. Barcha qoidalar va baholash ko‘rsatkichlari amaliyotda tekshirib borilmoqda.
            </span>
          </div>

          {/* Quick Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Jami Modullar</span>
              <span className="text-lg font-bold text-slate-900">7 ta Modul</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Rasmiy Parametrlar</span>
              <span className="text-lg font-bold text-teal-700">40 ta SR4S</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Reyting Tizimi</span>
              <span className="text-lg font-bold text-slate-900">5 Yulduz (5★)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Xalqaro Standart</span>
              <span className="text-lg font-bold text-emerald-600">iRAP SR4S v1.7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mezon yoki savol bo‘yicha qidirish (masalan: trotuar, tezlik)..."
              className="pl-10 bg-slate-50 border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 rounded-xl"
            />
          </div>

          {/* Module Filter buttons */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCriterionId(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCriterionId === null
                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Barchasi (7)
            </button>
            {MOCK_CRITERIA.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCriterionId(c.id === selectedCriterionId ? null : c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCriterionId === c.id
                    ? 'bg-teal-700 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Modul {c.order}
              </button>
            ))}
          </div>
        </div>

        {/* Criteria Modules List */}
        <div className="space-y-6">
          {filteredCriteria.map((criterion) => {
            const questions = MOCK_QUESTIONS.filter((q) => q.criterionId === criterion.id);
            const isExpanded = !!expandedCriteria[criterion.id] || searchQuery.trim().length > 0;

            return (
              <Card
                key={criterion.id}
                className="bg-white border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all rounded-2xl"
              >
                {/* Module Header */}
                <div
                  onClick={() => toggleExpand(criterion.id)}
                  className="p-5 sm:p-6 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer flex items-center justify-between gap-4 select-none border-b border-slate-200"
                >
                  <div className="flex items-center gap-4">
                    <Sr4sPictogram type={MODULE_PICTO_MAP[criterion.order ?? 1] || 'speed'} size={48} className="rounded-2xl shadow-xs shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        Modul {criterion.order}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {questions.length} ta savol • Maksimal {criterion.maxScore} ball
                      </span>
                    </div>
                    <h2 className="text-base sm:text-xl font-bold text-slate-900">
                      {criterion.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {criterion.description}
                    </p>
                    </div>
                  </div>

                  <div className="shrink-0 p-2 rounded-xl bg-white border border-slate-200 text-slate-500 shadow-2xs">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Questions Body */}
                {isExpanded && (
                  <CardContent className="p-4 sm:p-6 space-y-6 bg-white">
                    {questions.map((q, qIndex) => {
                      const isRight = q.subType === 'RIGHT';

                      return (
                        <div
                          key={q.id}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4 hover:border-teal-500/40 transition-all"
                        >
                          {/* Question Top Info */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className="bg-slate-900 text-teal-300 font-mono text-xs">
                                {q.code || `SR4S-${qIndex + 1}`}
                              </Badge>
                              {isRight ? (
                                <Badge className="bg-amber-100 text-amber-900 text-xs border border-amber-300">
                                  👉 O‘ng tomon yo‘lagi
                                </Badge>
                              ) : q.subType === 'LEFT' ? (
                                <Badge className="bg-sky-100 text-sky-900 text-xs border border-sky-300">
                                  👈 Chap tomon yo‘lagi
                                </Badge>
                              ) : null}
                              <span className="text-xs font-semibold text-slate-600">
                                Maksimal ball: {q.points} ball
                              </span>
                            </div>
                          </div>

                          {/* Question Text & Official Guide Image */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                            <div className="md:col-span-8 space-y-3">
                              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                                {q.text}
                              </h3>
                              {(q.helpGuidance || q.description) && (
                                <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed flex items-start gap-2">
                                  <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                                  <span>{q.helpGuidance || q.description}</span>
                                </p>
                              )}

                              {/* Answer Options List */}
                              <div className="space-y-2 pt-2">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                  Standart Javob Variantlari:
                                </span>
                                <div className="grid grid-cols-1 gap-2">
                                  {q.options?.map((opt) => (
                                    <div
                                      key={opt.id}
                                      className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-2xs"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0" />
                                        <span>{opt.label}</span>
                                      </div>
                                      <span className="font-mono text-xs text-teal-700 font-bold shrink-0 ml-2">
                                        +{opt.points} ball
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Official Guide Preview Screenshot */}
                            {q.guideImage && (
                              <div className="md:col-span-4 bg-white p-3 rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
                                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                                  Rasmiy iRAP Standart Ko‘rgazmasi:
                                </span>
                                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                  <Image
                                    src={q.guideImage}
                                    alt={q.text}
                                    fill
                                    className={`object-contain p-1 ${isRight ? 'scale-x-[-1]' : ''}`}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <section className="py-12 bg-white border-t border-slate-200 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Maktabingizni ushbu mezonlar asosida baholang
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Maktab hisobi orqali tizimga kirib, so‘rovnomani to‘ldiring va rasmiy yulduz reytingini oling.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            {user ? (
              <Link href={user.role === 'SCHOOL_USER' ? '/school/criteria' : '/admin'}>
                <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm px-6 gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Baholashni Boshlash</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm px-6">
                  Tizimga Kirish va Baholash
                </Button>
              </Link>
            )}
            <Link href="/platform">
              <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs sm:text-sm px-6">
                Platforma Mexanizmi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
