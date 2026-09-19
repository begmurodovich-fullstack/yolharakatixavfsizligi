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
  Camera,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MOCK_QUESTIONS } from '@/data/mock/criteria';

export default function MezonlarPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEvidenceOnly, setFilterEvidenceOnly] = useState(false);

  const filteredQuestions = useMemo(() => {
    return MOCK_QUESTIONS.filter((q) => {
      if (filterEvidenceOnly && !q.requiresEvidence) return false;
      if (!searchQuery.trim()) return true;
      const term = searchQuery.toLowerCase().trim();
      return (
        q.text.toLowerCase().includes(term) ||
        (q.code && q.code.toLowerCase().includes(term)) ||
        (q.description && q.description.toLowerCase().includes(term)) ||
        q.options.some((opt) => opt.label.toLowerCase().includes(term))
      );
    });
  }, [searchQuery, filterEvidenceOnly]);

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
            Maktab Yo‘l Xavfsizligining 40 ta Rasmiy Mezoni
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            O‘zbekiston Respublikasi umumta’lim maktablari atrofidagi yo‘l infratuzilmasi xavfsizligini
            baholash uchun mo‘ljallangan 40 ta rasmiy xalqaro iRAP SR4S ko‘rsatkichlari katalogi.
          </p>

          {/* Quick Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-4xl">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Jami Mezonlar</span>
              <span className="text-xl font-black text-slate-900 font-mono">40 ta Savol</span>
            </div>
            <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-200">
              <span className="text-[11px] font-semibold text-teal-700 block">Foto Dalil Talab</span>
              <span className="text-xl font-black text-teal-900 font-mono">28 ta mezon</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Reyting Tizimi</span>
              <span className="text-xl font-black text-slate-900 font-mono">1–5 Yulduz (5★)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Standart Versiyasi</span>
              <span className="text-xl font-black text-emerald-700 font-mono">iRAP SR4S v1.7</span>
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
              placeholder="Mezon yoki savol bo‘yicha qidirish (masalan: SR4S-01, trotuar, tezlik)..."
              className="pl-10 bg-slate-50 border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterEvidenceOnly(!filterEvidenceOnly)}
              className={'px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ' + (
                filterEvidenceOnly
                  ? 'bg-teal-700 text-white border-teal-700 font-bold shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              )}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Faqat foto-dalilli mezonlar</span>
            </button>
            <span className="text-xs text-slate-500 font-mono pl-2">
              Natija: <strong>{filteredQuestions.length}</strong> ta mezon
            </span>
          </div>
        </div>

        {/* 40 Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => (
            <Card
              key={q.id}
              className="bg-white border-slate-200 overflow-hidden shadow-xs hover:border-teal-500/40 transition-all rounded-2xl"
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Question Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-teal-300 font-mono font-bold text-xs">
                      {q.code || ('SR4S-' + String(index + 1).padStart(2, '0'))}
                    </span>
                    {q.requiresEvidence && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                        <Camera className="w-3 h-3" />
                        <span>Foto dalil talab etiladi</span>
                      </span>
                    )}
                    {q.subType && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                        {q.subType === 'LEFT' ? '👈 Chap tomon' : '👉 O‘ng tomon'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {q.text}
                  </h3>
                  {q.description && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {q.description}
                    </p>
                  )}
                </div>

                {/* Guide Image & Options Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2 items-start">
                  {/* Guide Image (if present) */}
                  {q.guideImage && (
                    <div className="lg:col-span-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-1 relative group">
                      <div className="relative h-44 w-full rounded-lg overflow-hidden bg-slate-200">
                        <Image
                          src={q.guideImage}
                          alt={q.text}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                      <div className="p-1.5 text-center">
                        <span className="text-[10px] font-mono text-slate-500 font-medium">
                          Xalqaro namuna rasmi
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Options List */}
                  <div className={q.guideImage ? 'lg:col-span-8 space-y-2' : 'lg:col-span-12 space-y-2'}>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Mavjud baholash variantlari:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => (
                        <div
                          key={opt.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start justify-between gap-2 hover:bg-slate-100/80 transition-colors"
                        >
                          <span className="font-medium text-slate-800 leading-relaxed">
                            {opt.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="rounded-2xl bg-slate-900 text-white p-8 text-center space-y-4 shadow-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-900/60 text-teal-300 border border-teal-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Maktablar uchun o‘z-o‘zini baholash</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white max-w-2xl mx-auto">
            Maktabingiz yo‘l xavfsizligini 40 ta mezon bo‘yicha baholashga tayyormisiz?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Maktab mas’ul xodimlari o‘z login va parollari bilan kabinetga kirib, barcha 40 ta savolga
            haqiqiy foto-dalillar bilan javob berishlari mumkin.
          </p>
          <div className="pt-2">
            <Link href={user ? '/school/criteria' : '/login'}>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm px-6 gap-2">
                <span>{user ? 'Baholashni boshlash' : 'Kabinetga kirish'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
