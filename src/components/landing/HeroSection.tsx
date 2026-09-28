'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UzbekistanSafetyMapVisual } from './UzbekistanSafetyMapVisual';
import { useAuth } from '@/hooks/useAuth';
import { Shield, ArrowRight, BookOpen, CheckCircle2, Sparkles, LayoutDashboard, Award, Globe, Flame } from 'lucide-react';

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section id="bosh-sahifa" className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Background ambient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Executive Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-900 text-teal-300 border border-slate-700/80 shadow-lg shadow-slate-950/10">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>O‘ZBEKISTON RESPUBLIKASI MILLIY MONITORING TIZIMI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.12]">
              Har bir maktab atrofida{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-800">
                xavfsiz yo‘l.
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              O‘zbekiston Respublikasi umumta’lim maktablari atrofidagi yo‘l infratuzilmasi,
              piyodalar o‘tish joylari va harakat xavfsizligini xalqaro <strong className="text-slate-900 font-semibold">SR4S (Star Rating for Schools)</strong> metodikasi
              asosida monitoring qilish, baholash va yaxshilash milliy platformasi.
            </p>

            {/* Feature highlights bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>40 ta xalqaro SR4S parametri</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Foto-dalillar asosida shaffof audit</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Viloyat, tuman va maktab reytinglari</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sputnik HD geolokatsiya nazorati</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              {user ? (
                <Link href={user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? '/admin' : '/school'}>
                  <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-bold gap-2 shadow-lg shadow-teal-900/20 transition-all h-12 px-7 text-sm rounded-2xl">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{user.role === 'ADMIN' ? 'Admin panelga o‘tish' : 'Baholashni boshlash'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-bold gap-2 shadow-lg shadow-teal-900/20 transition-all h-12 px-7 text-sm rounded-2xl">
                    <span>Tizimga kirish</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}

              <Link href="/demonstrator">
                <Button size="lg" variant="outline" className="border-amber-400 bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold gap-2 h-12 px-5 text-sm rounded-2xl shadow-xs">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>★ SR4S Demonstratori</span>
                </Button>
              </Link>

              <Link href="/map">
                <Button size="lg" variant="outline" className="border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-bold gap-2 h-12 px-5 text-sm rounded-2xl shadow-xs">
                  <Globe className="w-4 h-4 text-teal-700" />
                  <span>Xarita</span>
                </Button>
              </Link>
            </div>

            {/* Accreditation ribbon */}
            <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/90 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>BMT 2030 Yo‘l Xavfsizligi Xalqaro Tashabbusi bilan uyg‘unlashtirilgan</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Map & Live Signals Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <UzbekistanSafetyMapVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

