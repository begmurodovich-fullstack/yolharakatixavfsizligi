'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, ClipboardCheck, KeyRound, BookOpen } from 'lucide-react';

export function CtaSection() {
  const { user } = useAuth();

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-teal-900 bg-slate-950 p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Subtle glow effect */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-950 text-teal-400 border border-teal-800">
              <Shield className="w-4 h-4" />
              <span>YAGONA MONITORING TIZIMI</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ta’lim muassasangiz xavfsizlik holatini baholashga tayyormi?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Platformaga shaxsiy kabinet orqali kiring, maktabingiz bo‘yicha 40 ta xalqaro SR4S parametri
              asosida monitoringda ishtirok eting va yulduz reytingini oling.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {user ? (
                <Link href={user.role === 'SCHOOL_USER' ? '/school/criteria' : '/admin'}>
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold gap-2 h-12 px-8 text-sm shadow-lg">
                    <ClipboardCheck className="w-4 h-4" />
                    <span>Baholashni boshlash</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold gap-2 h-12 px-8 text-sm shadow-lg">
                    <KeyRound className="w-4 h-4" />
                    <span>Tizimga kirish va Baholash</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}

              <Link href="/mezonlar">
                <Button size="lg" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white font-semibold gap-2 h-12 px-6 text-sm">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span>40 ta SR4S Mezonlari</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
