'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sr4sDemonstrator } from '@/components/sr4s/Sr4sDemonstrator';
import { ShieldCheck, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

export default function DemonstratorPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Official-style SR4S Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                  STAR<span className="text-teal-600 font-extrabold">★</span>RATING
                </span>
                <span className="text-xs font-bold text-slate-500 hidden sm:inline-block border-l border-slate-300 pl-2">
                  FOR SCHOOLS (UZBEKISTAN)
                </span>
              </div>
            </Link>

            {/* FIA Foundation partner indicator */}
            <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 font-medium pl-4 border-l border-slate-200">
              <span>Rasmiy metodologiya:</span>
              <span className="font-bold text-slate-700">iRAP / FIA FOUNDATION</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/mezonlar"
              className="text-xs font-semibold text-slate-600 hover:text-teal-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors hidden sm:inline-block"
            >
              40 ta Mezon
            </Link>
            <Link
              href="/login"
              className="text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              Tizimga kirish
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Breadcrumb & Intro */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700 font-medium group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Bosh sahifaga qaytish</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>SR4S Interaktiv Demonstratori</span>
            </h1>
          </div>
        </div>

        {/* SR4S 1-to-1 Demonstrator Component */}
        <Sr4sDemonstrator />
      </main>
    </div>
  );
}

