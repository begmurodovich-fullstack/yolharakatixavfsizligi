'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sr4sPictogram, Sr4sPictoType } from '@/components/ui/sr4s-icon';

const FEATURED_CRITERIA: { id: string; code: string; title: string; desc: string; picto: Sr4sPictoType }[] = [
  { id: '1', code: 'SR4S-01–04', title: 'Yo‘l geometriyasi va tasmalar', desc: 'Harakat bo‘laklari soni, nishablik, markaziy ajratgich va chetki tasma kengligi', picto: 'speed' },
  { id: '2', code: 'SR4S-05–07', title: 'Maktab ogohlantirishi va patrul', desc: 'LED bolalar belgilari, YPX/navbatchi nazorati va 30 km/s tezlik chegarasi', picto: 'school_zone' },
  { id: '3', code: 'SR4S-08–10', title: 'Piyodalar yo‘lagi (Trotuarlar)', desc: 'Chap va o‘ng tomon to‘siqli trotuarlar, ko‘tarilgan yo‘laklar va himoya panjarasi', picto: 'sidewalk' },
  { id: '4', code: 'SR4S-11–13', title: 'Piyodalar o‘tish joyi (Zebra)', desc: 'Ko‘prik/yerosti o‘tish yo‘llari, svetoforli o‘tish va ko‘tarilgan xavfsiz zebra', picto: 'crossing' },
  { id: '5', code: 'SR4S-14–17', title: 'Chorraha va burilish zonalari', desc: 'Aylanma harakat, 4 tomonli chorraha, hovli kirishlari va xavfsiz burilish cho‘ntagi', picto: 'sight_distance' },
  { id: '6', code: 'SR4S-24–25', title: 'Tezlik pasaytirgich (Sun’iy notekislik)', desc: 'Trapezoidal platformalar, rezina speed hump va maxsus sariq-oq markirovkalar', picto: 'traffic_calming' },
  { id: '7', code: 'SR4S-26–27', title: 'Ko‘cha va zebra yoritilishi', desc: 'Tungi LED yoritgichlar va piyodalar o‘tish joyi ustidagi maxsus projektorlar', picto: 'lighting' },
  { id: '8', code: 'SR4S-32–33', title: 'Veloyo‘lak va xavfsiz turargoh', desc: 'Alohida velosiped yo‘laklari va maktab ichidagi xavfsiz veloturargohlar', picto: 'bicycle' },
];

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

        {/* 8 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_CRITERIA.map((crit) => (
            <Card
              key={crit.id}
              className="bg-slate-50 border-slate-200 text-slate-900 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between mb-3">
                  <Sr4sPictogram type={crit.picto} size={36} className="rounded-xl shadow-xs" />
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-200 text-slate-800">
                    {crit.code}
                  </span>
                </div>
                <CardTitle className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {crit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {crit.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          <Link href="/mezonlar">
            <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-2 text-xs sm:text-sm px-6">
              <ClipboardCheck className="w-4 h-4" />
              <span>Barcha 40 ta rasmiy mezonni ko‘rish</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/platform">
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs sm:text-sm px-6">
              <span>Platforma qanday ishlaydi?</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
