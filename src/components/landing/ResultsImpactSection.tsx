import React from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  Trophy,
  LineChart,
  Hammer,
  RotateCw,
  TrendingUp,
} from 'lucide-react';

const IMPACT_STAGES = [
  {
    step: '1',
    title: 'Baholash',
    desc: 'Maktab rahbariyati mezonlar bo‘yicha ko‘rsatkichlarni kiritadi.',
    icon: ClipboardCheck,
  },
  {
    step: '2',
    title: 'Tekshiruv',
    desc: 'Inspektorlar dalillar haqiqiyligini tekshiradi va tasdiqlaydi.',
    icon: CheckCircle2,
  },
  {
    step: '3',
    title: 'Ball & Reyting',
    desc: 'Ochiq va xolis xavfsizlik bali hamda reytingi shakllanadi.',
    icon: Trophy,
  },
  {
    step: '4',
    title: 'Chuqur Tahlil',
    desc: 'Qaysi infratuzilma elementi yetishmasligi aniqlanadi.',
    icon: LineChart,
  },
  {
    step: '5',
    title: 'Infratuzilmani Yaxshilash',
    desc: 'Belgi o‘rnatish, chiziq tortish va yo‘lak qurish choralari ko‘riladi.',
    icon: Hammer,
  },
  {
    step: '6',
    title: 'Doimiy Nazorat',
    desc: 'Yangi o‘quv yilida qayta baholash o‘tkaziladi.',
    icon: RotateCw,
  },
];

export function ResultsImpactSection() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-teal-400 border border-slate-700 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
            <span>NATIJADORLIK VA AMALIYOT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Natijalar qanday qo‘llaniladi?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Platforma faqat ma’lumot to‘plash uchun emas, balki real xavflarni bartaraf etish
            va yo‘l harakati infratuzilmasini bosqichma-bosqich takomillashtirishga xizmat qiladi.
          </p>
        </div>

        {/* Stages Cycle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {IMPACT_STAGES.map((stg) => {
            const Icon = stg.icon;
            return (
              <div
                key={stg.step}
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 flex flex-col justify-between hover:border-teal-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-900/60 text-teal-400 border border-teal-800">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      #{stg.step}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white mb-1.5">{stg.title}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{stg.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
