'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MOCK_CRITERIA } from '@/data/mock/criteria';

export function CriteriaSection() {
  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>XALQARO iRAP SR4S STANDARTLARI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Maktab yo‘l xavfsizligining 7 ta asosiy moduli
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            BMT va iRAP standarti asosida maktab atrofidagi infratuzilma 7 ta asosiy modul va 23 ta rasmiy mezon bo‘yicha kompleks baholanadi.
          </p>
        </div>

        {/* 7 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_CRITERIA.map((crit) => (
            <Card
              key={crit.id}
              className="bg-slate-50 border-slate-200 text-slate-900 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    Modul {crit.order}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-semibold">
                    {crit.questionCount} ta mezon • {crit.maxScore} ball
                  </span>
                </div>
                <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                  {crit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {crit.description}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* 8th Action Card */}
          <Card className="bg-slate-900 border-slate-900 text-white flex flex-col justify-between p-5 rounded-2xl shadow-md">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>To‘liq Standartlar</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Barcha 23 ta mezon va rasmlar
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chap/o‘ng trotuarlar, yo‘l belgilari va ballar taqsimotini rasmiy sahifada o‘rganing.
              </p>
            </div>
            <div className="pt-3">
              <Link href="/mezonlar">
                <Button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs gap-1.5">
                  <span>Mezonlarni ko‘rish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <Link href="/mezonlar">
            <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-2 text-xs sm:text-sm px-6">
              <Layers className="w-4 h-4" />
              <span>Barcha 23 ta mezon va rasmlarni ko‘rish</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/platform">
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs sm:text-sm px-6">
              <span>Platforma qanday ishlaydi?</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
