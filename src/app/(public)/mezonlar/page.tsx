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
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { OFFICIAL_40_ATTRIBUTES_DATA, AttributeDefinition } from '@/data/sr4sAttributesData';

export default function MezonlarPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttributes = useMemo(() => {
    return OFFICIAL_40_ATTRIBUTES_DATA.filter((attr) => {
      if (!searchQuery.trim()) return true;
      const term = searchQuery.toLowerCase().trim();
      return (
        attr.nameUz.toLowerCase().includes(term) ||
        attr.nameEn.toLowerCase().includes(term) ||
        (attr.code && attr.code.toLowerCase().includes(term)) ||
        attr.options.some(
          (opt) =>
            opt.labelUz.toLowerCase().includes(term) ||
            opt.labelEn.toLowerCase().includes(term)
        )
      );
    });
  }, [searchQuery]);

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
            SR4S / iRAP ning 40 ta Rasmiy Xavfsizlik Mezoni
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            O‘zbekiston Respublikasi umumta’lim maktablari atrofidagi yo‘l infratuzilmasi xavfsizligini
            baholash uchun mo‘ljallangan 40 ta rasmiy xalqaro iRAP SR4S (Star Rating for Schools) metodikasi ko‘rsatkichlari katalogi.
          </p>

          {/* Quick Summary Strip */}
          <div className="grid grid-cols-3 gap-3 pt-3 max-w-3xl">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Jami Mezonlar</span>
              <span className="text-xl font-black text-slate-900 font-mono">40 ta Parametr</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Reyting Tizimi</span>
              <span className="text-xl font-black text-slate-900 font-mono">1–5 Yulduz (5★)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Standart Versiyasi</span>
              <span className="text-xl font-black text-teal-700 font-mono">iRAP SR4S v3.1</span>
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
              placeholder="Mezon bo‘yicha qidirish (masalan: SR4S-01, trotuar, tezlik, o‘tish joyi)..."
              className="pl-10 bg-slate-50 border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 rounded-xl"
            />
          </div>

          <span className="text-xs text-slate-500 font-mono">
            Natija: <strong>{filteredAttributes.length}</strong> ta mezon
          </span>
        </div>

        {/* 40 Attributes List */}
        <div className="space-y-4">
          {filteredAttributes.map((attr, index) => (
            <Card
              key={attr.id}
              className="bg-white border-slate-200 overflow-hidden shadow-xs hover:border-teal-500/40 transition-all rounded-2xl"
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Attribute Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-teal-300 font-mono font-bold text-xs">
                      {attr.code || `SR4S-${String(index + 1).padStart(2, '0')}`}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {attr.nameEn}
                    </span>
                  </div>
                </div>

                {/* Attribute Title */}
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {attr.nameUz}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Xalqaro baholash variantlari va xavfsizlik vazni:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {attr.options.map((opt) => (
                      <div
                        key={opt.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3 hover:bg-slate-100/90 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {opt.iconSrc ? (
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-white border border-slate-200 p-0.5">
                              <Image
                                src={opt.iconSrc}
                                alt={opt.labelUz}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0 border border-teal-200 text-xs font-mono">
                              {opt.scoreWeight || '★'}
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-800 block truncate">
                              {opt.labelUz}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {opt.labelEn}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] shrink-0 ${
                            (opt.scoreWeight || 4) >= 5
                              ? 'bg-emerald-100 text-emerald-800'
                              : (opt.scoreWeight || 4) >= 4
                              ? 'bg-teal-100 text-teal-800'
                              : (opt.scoreWeight || 4) >= 3
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {opt.scoreWeight || 4} ball
                        </span>
                      </div>
                    ))}
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
            Maktab mas’ul xodimlari o‘z login va parollari bilan kabinetga kirib, barcha 40 ta mezon bo‘yicha
            haqqoniy ko‘rsatkichlar bilan o‘z-o‘zini baholashlari mumkin.
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
