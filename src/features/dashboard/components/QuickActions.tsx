'use client';

import React from 'react';
import Link from 'next/link';
import {
  ClipboardCheck,
  Trophy,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Printer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onOpenPassport?: () => void;
}

export function QuickActions({ onOpenPassport }: QuickActionsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Tezkor Amallar
            </h2>
            <p className="text-xs text-slate-500">
              Maktab boshqaruvining asosiy bo‘limlari
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/school/assessment" className="block">
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-teal-50/40 hover:border-teal-500 transition-all flex flex-col justify-between h-full group space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-teal-700 text-white shadow-2xs">
                <ClipboardCheck className="w-4 h-4" />
              </span>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-700 transition-colors" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-950">
                Baholash anketasi
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                8 ta mezon savollarini to‘ldirish va foto yuklash
              </p>
            </div>
          </div>
        </Link>

        <Link href="/school/rankings" className="block">
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-teal-50/40 hover:border-teal-500 transition-all flex flex-col justify-between h-full group space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-amber-600 text-white shadow-2xs">
                <Trophy className="w-4 h-4" />
              </span>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-700 transition-colors" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-950">
                Maktablar Reytingi
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tuman, viloyat va respublika o‘rinlari
              </p>
            </div>
          </div>
        </Link>

        <Link href="/school/statistics" className="block">
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-teal-50/40 hover:border-teal-500 transition-all flex flex-col justify-between h-full group space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-slate-900 text-teal-400 shadow-2xs">
                <BarChart3 className="w-4 h-4" />
              </span>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-700 transition-colors" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-950">
                Tahliliy Statistika
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Radar, qiyosiy grafiklar va tarixiy o‘sish
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Official Passport Banner */}
      {onOpenPassport && (
        <div className="p-5 rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50/80 to-emerald-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase font-bold text-teal-800 tracking-wider">
              Rasmiy Hujjat • PDF Pasport
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              Maktab Yo‘l Xavfsizligi Pasporti (Chop etish / PDF Yuklab olish)
            </div>
            <p className="text-xs text-slate-600">
              8 ta mezon xulosalari, QR-kodli haqiqiylik muhri va rasmiy YHXX blankasi
            </p>
          </div>

          <Button
            type="button"
            onClick={onOpenPassport}
            className="bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl h-10 px-5 gap-2 shrink-0 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Pasportni Ochish</span>
          </Button>
        </div>
      )}
    </div>
  );
}
