'use client';

import React from 'react';
import { Sr4sDemonstrator } from '@/components/sr4s/Sr4sDemonstrator';
import { Sparkles } from 'lucide-react';

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
      </div>
    </section>
  );
}
