'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  MapPin,
  ClipboardCheck,
  Camera,
  LineChart,
  Trophy,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  GraduationCap,
  Activity,
  CheckCircle2,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Maktab geolokatsiyasi va ro‘yxatga olish',
    desc: 'O‘zbekiston Respublikasidagi 10 110 ta maktabning aniq GPS koordinatalari, maktab ma’muriyati va hududiy mas’ullar yagona milliy bazaga kiritiladi.',
    icon: MapPin,
    badge: '1-bosqich: GPS & Profil',
  },
  {
    step: '02',
    title: '40 ta xalqaro SR4S parametri bo‘yicha baholash',
    desc: 'Maktab atrofidagi piyodalar yo‘lagi (chap/o‘ng), svetoforlar, tezlik mezonlari, yo‘l chiziqlari va ko‘rinish masofalari 7 ta modulda baholanadi.',
    icon: ClipboardCheck,
    badge: '2-bosqich: SR4S Standart',
  },
  {
    step: '03',
    title: 'Foto-dalillar va daliliy ekspertiza',
    desc: 'Har bir tanlangan parametr uchun maktab mas’uli real fotosuratlarni yuklaydi. Barcha fotosuratlar geolokatsiya va sana bilan biriktiriladi.',
    icon: Camera,
    badge: '3-bosqich: Haqiqiy Fotosuratlar',
  },
  {
    step: '04',
    title: 'YHXX Inspektori moderatsiyasi va Star Rating',
    desc: 'Tuman va viloyat YHXX inspektorlari taqdim etilgan ma’lumotlarni tekshirib, xalqaro iRAP matematik modeli asosida 1.0 dan 5.0 yulduzgacha reyting belgilaydi.',
    icon: LineChart,
    badge: '4-bosqich: YHXX Ekspertizasi',
  },
  {
    step: '05',
    title: 'Interaktiv Xarita, Reyting va Investitsiya',
    desc: 'Xavfli (1-2 yulduz) maktablar xaritada qizil rangda ajratilib, hokimiyat va yo‘l xizmatlari tomonidan sun’iy notekislik, svetofor va yo‘lak qurish dasturiga kiritiladi.',
    icon: Trophy,
    badge: '5-bosqich: Amaliy Chora-tadbirlar',
  },
];

const STAKEHOLDERS = [
  {
    role: 'Maktablar va O‘qituvchilar',
    icon: GraduationCap,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    points: [
      'Maktab atrofidagi haqiqiy xavfli vaziyatni rasmiy qayd etish',
      'Yo‘l belgisi, svetofor yoki yo‘lak talab qilish uchun asosli ariza',
      'O‘quvchilar va ota-onalar xavfsizligini ta’minlash monitoringi',
    ],
  },
  {
    role: 'YHXX (Davlat Yo‘l Harakati Xavfsizligi Xizmati)',
    icon: Shield,
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    points: [
      '10 000+ ta maktab holatini yagona raqamli markazdan nazorat qilish',
      'Foto-dalillar orqali joyiga chiqmasdan dastlabki ekspertiza qilish',
      'Bolalar ishtirokidagi YTHlar profilaktikasini 100% raqamlashtirish',
    ],
  },
  {
    role: 'Mahalliy Hokimiyat va Yo‘l Tashkilotlari',
    icon: Building2,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    points: [
      'Byudjet mablag‘larini eng xavfli (1-2 yulduzli) maktablarga yo‘naltirish',
      'Infratuzilma kamchiliklarini manzilli bartaraf etish rejalari',
      'Respublika tumanlari va viloyatlari bo‘yicha shaffof reyting',
    ],
  },
  {
    role: 'Ota-onalar va Jamoatchilik',
    icon: Users,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    points: [
      'Ochiq xaritada farzandi o‘qiydigan maktab xavfsizligini ko‘rish',
      'Xavfli chorraha va yo‘llar bo‘yicha jamoatchilik nazoratini o‘rnatish',
      '5 yulduzli xavfsiz maktab hududlarini kengaytirishda ishtirok etish',
    ],
  },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-white pt-10 pb-12 border-b border-slate-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-teal-50 text-teal-800 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>MILLIY RAQAMLI PLATFORMA</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 max-w-3xl leading-tight">
            O‘zbekiston Maktablari Yo‘l Xavfsizligi Platformasi
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Ushbu platforma BMT va iRAP (International Road Assessment Programme) xalqaro metodologiyasi asosida
            O‘zbekiston Respublikasidagi barcha umumta’lim maktablari atrofidagi yo‘l infratuzilmasini kompleks monitoring qilish,
            xavflarni baholash va bolalar uchun 5 yulduzli xavfsiz muhit yaratish maqsadida ishlab chiqilgan.
          </p>

          {/* Test Notice */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5 max-w-3xl">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Eslatma:</strong> Tizim hozirda pilot sinov (test) rejimida ishlamoqda. Mezonlar, ko‘rsatkichlar va ma’lumotlar tekshiruvdan o‘tkazilmoqda.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/mezonlar">
              <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-2 text-xs sm:text-sm">
                <span>Xalqaro Mezonlarni Ko‘rish</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/map">
              <Button size="lg" variant="outline" className="border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold gap-2 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>Interaktiv Xarita</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5-Step Lifecycle */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>5 BOSQICHLI ISH JARAYONI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Platforma Qanday Ishlaydi?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Maktab ma’lumotlarini kiritishdan to yo‘l infratuzilmasini real yaxshilashgacha bo‘lgan shaffof zanjir:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {WORKFLOW_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="bg-slate-50 border-slate-200 text-slate-900 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-teal-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-lg font-black text-slate-400 font-mono">
                        {item.step}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                      {item.badge}
                    </span>
                    <CardTitle className="text-sm font-bold text-slate-900 mt-1">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stakeholders & Institutional Value */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Platformaning Ishtirokchilari va Imkoniyatlari
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tizim barcha mas’ul idoralar, maktablar va jamoatchilikni yagona maqsadda birlashtiradi:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STAKEHOLDERS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Card key={idx} className="bg-white border-slate-200 shadow-2xs">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center gap-3">
                      <span className={`p-2.5 rounded-xl border ${s.color}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <CardTitle className="text-base font-bold text-slate-900">
                        {s.role}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-2.5">
                    {s.points.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Traditional vs Modern Comparison */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Eski Qog‘ozli Baholash vs Yangi SR4S Raqamli Tizimi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Qanday qilib raqamli monitoring inson omilini kamaytiradi va haqqoniylikni kafolatlaydi?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>Eski An’anaviy Tizim</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Qog‘oz hisobotlar, ma’lumotlarning kechikishi va yo‘qolishi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Fotosurat va geolokatsiyasiz subyektiv baholash</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Respublika bo‘yicha umumiy holatni real vaqtda ko‘ra olmaslik</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Infratuzilma byudjeti qaysi maktabga eng ko‘p zarurligini aniqlash qiyinligi</span>
                </li>
              </ul>
            </div>

            {/* Modern SR4S */}
            <div className="p-6 rounded-2xl border border-teal-200 bg-teal-50/50 space-y-3">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Yangi Milliy SR4S Platformasi</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-700 font-bold">✓</span>
                  <span>100% raqamli, 10 110 ta maktab uchun yagona ma’lumotlar bazasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-700 font-bold">✓</span>
                  <span>GPS koordinatalar va foto-dalillar bilan qat’iy dalillangan ekspertiza</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-700 font-bold">✓</span>
                  <span>BMT va iRAP xalqaro formulasi asosida 1-5 Yulduzli shaffof reyting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-700 font-bold">✓</span>
                  <span>Qizil zonadagi (1-2 yulduz) maktablarga avtomatik yo‘l ta’mirlash tavsiyalari</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 bg-slate-50 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Maktabingiz Xavfsizligini Hoziroq Baholang
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Har bir maktab hisobi orqali tizimga kirib, 7 ta modul bo‘yicha so‘rovnomani to‘ldiring va rasmiy yulduz reytingini oling.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link href="/login">
              <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm px-6">
                Tizimga Kirish
              </Button>
            </Link>
            <Link href="/mezonlar">
              <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs sm:text-sm px-6">
                Mezonlarni Ko‘rish
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
