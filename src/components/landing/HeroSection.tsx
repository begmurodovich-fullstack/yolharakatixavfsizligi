'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UzbekistanSafetyMapVisual } from './UzbekistanSafetyMapVisual';
import { Shield, ArrowRight, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="bosh-sahifa" className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-900 text-teal-400 border border-slate-800 shadow-xs">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>MAKTABLAR YO‘L XAVFSIZLIGI MONITORINGI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
              Har bir maktab atrofida{' '}
              <span className="text-teal-700 underline decoration-teal-300 decoration-wavy underline-offset-8">
                xavfsiz yo‘l.
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              O‘zbekiston Respublikasi umumta’lim maktablari atrofidagi yo‘l infratuzilmasi,
              piyodalar o‘tish joylari va harakat xavfsizligi holatini yagona milliy standart
              asosida monitoring qilish, baholash va yaxshilash platformasi.
            </p>

            {/* Feature highlights bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>8 ta davlat standarti mezoni</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Foto-dalillar asosida shaffof tekshiruv</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Viloyat, tuman va maktab reytinglari</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Geolokatsiya va xaritalashtirish</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-2 shadow-md hover:shadow-lg transition-all h-12 px-7 text-sm">
                  <span>Tizimga kirish</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <a href="#platform">
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold gap-2 h-12 px-6 text-sm">
                  <BookOpen className="w-4 h-4 text-teal-700" />
                  <span>Platforma haqida</span>
                </Button>
              </a>
            </div>

            {/* Prototype note */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200">
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>V1 Prototip versiya: Test rejimida barcha foydalanuvchi rollari uchun ochiq</span>
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
