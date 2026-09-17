'use client';

import React from 'react';
import { Sr4sDemonstrator } from '@/components/sr4s/Sr4sDemonstrator';
import { Sparkles, HelpCircle } from 'lucide-react';

export function CriteriaSection() {
  return (
    <section id="mezonlar" className="py-16 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>XALQARO iRAP SR4S STANDARTLARI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Maktab yo‘l xavfsizligining xalqaro mezonlari
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            BMT va iRAP standarti asosida maktab atrofidagi infratuzilma 40 ta parametr bo‘yicha kompleks baholanadi. 
            Quyida har bir parametrni interaktiv o‘zgartirib, yulduzli reytingni sinab ko‘rishingiz mumkin:
          </p>
        </div>

        {/* Embedded Interactive SR4S Demonstrator / Calculator */}
        <Sr4sDemonstrator />

        {/* Evaluation Thresholds Informative Note */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white">Yulduzli reyting darajalari (Star Rating):</div>
              <div className="text-slate-400">Maktablar to‘plagan balliga qarab 1.0 dan 5.0 yulduzgacha darajalanadi.</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              ⭐ 4.0 - 5.0 Yulduz: Xavfsiz
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              ⭐ 3.0 - 3.9 Yulduz: O‘rtacha
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              ⭐ 1.0 - 2.9 Yulduz: Yuqori Xavf
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
