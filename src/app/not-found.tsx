'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Home, Map, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-2xl">
          <ShieldCheck className="h-9 w-9" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase">
            404 — SAHIFA TOPILMADI
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kechirasiz, bunday sahifa mavjud emas
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Siz qidirayotgan sahifa manzili noto‘g‘ri kiritilgan yoki o‘chirilgan bo‘lishi mumkin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white border-slate-800 text-xs rounded-xl h-10 gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Bosh Sahifa</span>
            </Button>
          </Link>

          <Link href="/login">
            <Button
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl h-10 gap-2 shadow-lg shadow-teal-500/20"
            >
              <LogIn className="w-4 h-4" />
              <span>Tizimga Kirish</span>
            </Button>
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Ommaviy Maktablar Xaritasiga o‘tish &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
