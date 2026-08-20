import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ShieldAlert,
  DatabaseZap,
  FileCheck2,
  GitCompare,
  HelpCircle,
} from 'lucide-react';

const BENEFITS = [
  {
    title: 'Muammolarni erta aniqlash va oldini olish',
    description: 'Maktab atrofidagi nosoz yo‘l belgilari, o‘chib ketgan chiziqlar va yo‘lak yo‘qligi holatlarini baxtsiz hodisalar sodir bo‘lmasdan oldin aniqlash.',
    icon: ShieldAlert,
  },
  {
    title: 'Respublika bo‘yicha yagona raqamli monitoring',
    description: 'Barcha 10 000+ maktablar bo‘yicha tarqoq qog‘oz hisobotlar o‘rniga yagona, real vaqt rejimida yangilanuvchi markazlashgan axborot bazasi.',
    icon: DatabaseZap,
  },
  {
    title: 'Foto-dalillarga asoslangan shaffof baholash',
    description: 'Har bir ijobiy javob hududdan olingan haqiqiy fotosurat va geolokatsiya bilan tasdiqlanadi. Soxtalashtirishga yo‘l qo‘yilmaydi.',
    icon: FileCheck2,
  },
  {
    title: 'Hududlar bo‘yicha qiyosiy tahlil va manzilli choralar',
    description: 'Qaysi viloyat, tuman yoki maktabda xavf yuqori ekanligini ko‘rsatib, davlat byudjeti va homiylik mablag‘larini eng zarur nuqtalarga yo‘naltirish.',
    icon: GitCompare,
  },
];

export function WhyPlatformSection() {
  return (
    <section id="afzalliklar" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>DOLZARBLIK VA MAQSAD</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Nima uchun bu platforma kerak?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Bolalar xavfsizligi — davlat va jamiyatning oliy maqsadi. Raqamlashtirish orqali
            yo‘l infratuzilmasidagi har bir kamchilik nazorat ostiga olinadi.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="border-slate-200 bg-slate-50/50 hover:bg-white hover:border-teal-500 hover:shadow-md transition-all"
              >
                <CardHeader className="p-6 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white shadow-2xs shrink-0">
                      <Icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="text-base font-bold text-slate-900">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
