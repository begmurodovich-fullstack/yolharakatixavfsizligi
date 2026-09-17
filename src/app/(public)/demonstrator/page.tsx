'use client';

import React from 'react';
import { Sr4sDemonstrator } from '@/components/sr4s/Sr4sDemonstrator';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DemonstratorPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:underline font-mono mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bosh sahifaga qaytish</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-teal-400" />
              <span>SR4S Interaktiv Demonstratori (O‘zbekiston)</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Birlashgan Millatlar Tashkiloti va iRAP tomonidan tavsiya etilgan "Star Rating for Schools" yo‘l xavfsizligi interaktiv kalkulyatori.
            </p>
          </div>
        </div>

        {/* SR4S Demonstrator Component */}
        <Sr4sDemonstrator />
      </div>
    </div>
  );
}
