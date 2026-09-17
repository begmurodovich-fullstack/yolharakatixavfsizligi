import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  ClipboardCheck,
  Camera,
  LineChart,
  Trophy,
  ArrowRight,
  Workflow,
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Maktab ma’lumotlari va GPS',
    description: 'Maktab geolokatsiyasi, GPS koordinatalari va hududiy mas’ul shaxslar ro‘yxatga olinadi.',
    icon: MapPin,
    badge: 'GPS & Geolokatsiya',
  },
  {
    step: '02',
    title: '40 ta SR4S parametri bo‘yicha baholash',
    description: 'Xalqaro iRAP Star Rating for Schools (v1.7) standarti asosida 40 ta muhim yo‘l infratuzilmasi parametri baholanadi.',
    icon: ClipboardCheck,
    badge: '40 ta SR4S parametri',
  },
  {
    step: '03',
    title: 'Foto-dalillarni ekspert tekshiruvi',
    description: 'Yo‘l belgilari, chiziqlar, piyodalar yo‘laklari va to‘siqlarning haqiqiy foto-suratlari ekspertlar tomonidan tasdiqlanadi.',
    icon: Camera,
    badge: 'Foto-ekspertiza',
  },
  {
    step: '04',
    title: 'Yulduzli reyting (Star Rating) tahlili',
    description: 'Avtomatlashtirilgan tizim xavfsizlik darajasini 1.0 dan 5.0 yulduzgacha (Qora, Qizil, Sariq, Sabzirang, Yashil) hisoblab chiqadi.',
    icon: LineChart,
    badge: '1 — 5 Yulduz shkalasi',
  },
  {
    step: '05',
    title: 'Reyting va manzilli xavfsizlik choralari',
    description: 'Respublika bo‘yicha shaffof monitoring yuritilib, maktab zonalari kamida 3 yulduzli xavfsizlik standartiga yetkaziladi.',
    icon: Trophy,
    badge: 'Maqsad: ≥3 Yulduz',
  },
];

export function WorkflowSection() {
  return (
    <section id="platform" className="py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>JARAYON VA MEXANIZM</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Platforma qanday ishlaydi?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Maktab atrofidagi yo‘l harakati xavfsizligini monitoring qilish ma’lumotlarni kiritishdan
            to amaliy infratuzilmani yaxshilashgacha bo‘lgan 5 bosqichli tizim orqali amalga oshiriladi.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative group">
                <Card className="h-full border-slate-200 bg-white hover:border-teal-500 hover:shadow-md transition-all duration-200">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-teal-400 group-hover:bg-teal-700 group-hover:text-white transition-colors shadow-2xs">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-lg font-black text-slate-300 font-mono group-hover:text-teal-600 transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-teal-700 tracking-wide uppercase">
                      {item.badge}
                    </div>
                    <CardTitle className="text-sm font-bold text-slate-900 mt-1">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connecting arrow indicator between steps on desktop */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-slate-400">
                    <ArrowRight className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Link to dedicated /platform page */}
        <div className="flex justify-center mt-10">
          <Link href="/platform">
            <Button size="lg" className="bg-slate-900 hover:bg-teal-700 text-white font-semibold gap-2 shadow-sm text-sm">
              <span>Platforma imkoniyatlari va mexanizmi haqida to‘liq</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
