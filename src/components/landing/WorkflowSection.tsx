import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    title: 'Maktab ma’lumotlari',
    description: 'Maktab geolokatsiyasi, hududiy ierarxiyasi va mas’ul shaxslar ro‘yxatga olinadi.',
    icon: MapPin,
    badge: 'Ierarxiya & Joylashuv',
  },
  {
    step: '02',
    title: 'Xavfsizlikni baholash',
    description: '8 ta asosiy mezon bo‘yicha maktab atrofi infratuzilmasi savolnomasi to‘ldiriladi.',
    icon: ClipboardCheck,
    badge: '100 ballik shkala',
  },
  {
    step: '03',
    title: 'Dalillarni tekshirish',
    description: 'Yo‘l belgilari, chiziqlar va panjaralarning haqiqiy foto-suratlari ekspertlar tomonidan tasdiqlanadi.',
    icon: Camera,
    badge: 'Foto-ekspertiza',
  },
  {
    step: '04',
    title: 'Natijalarni tahlil qilish',
    description: 'Avtomatlashtirilgan tizim xavf darajasini (Yashil, Sariq, Qizil) hisoblab chiqadi.',
    icon: LineChart,
    badge: 'Algoritmik baho',
  },
  {
    step: '05',
    title: 'Reyting va monitoring',
    description: 'Respublika, viloyat va tuman darajasidagi shaffof reyting shakllantirilib, choralar belgilanadi.',
    icon: Trophy,
    badge: 'Manzilli choralar',
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
      </div>
    </section>
  );
}
