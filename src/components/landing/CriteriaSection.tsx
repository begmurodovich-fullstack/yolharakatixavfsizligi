'use client';

import React from 'react';
import { Sr4sDemonstrator } from '@/components/sr4s/Sr4sDemonstrator';
import { Sparkles } from 'lucide-react';

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
            Maktab yo‘l xavfsizligining 40 ta rasmiy mezoni
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            BMT va iRAP xalqaro metodologiyasi asosida maktab atrofidagi barcha yo‘l infratuzilmasi 40 ta rasmiy mezon va foto-dalillar asosida to‘liq baholanadi.
          </p>
        </div>

        {/* Embedded Interactive SR4S Demonstrator / Calculator */}
        <Sr4sDemonstrator />
      </div>
    </section>
  );
}
