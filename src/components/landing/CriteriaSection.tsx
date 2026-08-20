'use client';

import React, { useEffect, useState } from 'react';
import { assessmentService } from '@/services/assessmentService';
import { Criterion } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ShieldAlert,
  Footprints,
  Gauge,
  Fence,
  Route,
  Car,
  Users,
  GraduationCap,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert,
  Footprints,
  Gauge,
  Fence,
  Route,
  Car,
  Users,
  GraduationCap,
};

export function CriteriaSection() {
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    assessmentService.getCriteria().then((res) => {
      setCriteria(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <section id="mezonlar" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>STANDARTLAR VA TALABLAR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Yo‘l xavfsizligining 8 ta asosiy mezoni
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Har bir maktab atrofidagi infratuzilma Davlat standarti va xavfsizlik talablariga
            muvofiq 100 ballik shkala bo‘yicha 8 yo‘nalishda kompleks tekshiriladi.
          </p>
        </div>

        {/* Criteria Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((crit, idx) => {
            const Icon = ICON_MAP[crit.icon] || ShieldAlert;
            const sampleCompliance = [92, 85, 78, 64, 72, 80, 88, 90][idx % 8];

            return (
              <Card
                key={crit.id}
                className="border-slate-200 bg-white hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100 shadow-2xs">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-slate-100 text-slate-800 border border-slate-200">
                      {crit.maxScore} ball
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 font-semibold">
                    MEZON #{idx + 1}
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900 mt-1 leading-snug">
                    {crit.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {crit.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-medium text-slate-500">
                      <span>Respublika bo‘yicha o‘rtacha:</span>
                      <span className="font-bold text-slate-800">{sampleCompliance}%</span>
                    </div>
                    <Progress value={sampleCompliance} showColorByScore className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Evaluation Thresholds Informative Note */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-100 text-teal-800">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Baholash shkalasi tasnifi:</div>
              <div className="text-slate-600">Maktablar to‘plagan umumiy ballga qarab 3 toifaga ajratiladi.</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Yashil (&ge;80 ball): Xavfsiz
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Sariq (50-79 ball): O‘rtacha
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-semibold">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Qizil (&lt;50 ball): Yuqori xavf
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
