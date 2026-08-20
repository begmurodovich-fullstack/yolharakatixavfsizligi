'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, MapPin, ClipboardCheck, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PendingQueueCardProps {
  pendingEvidenceCount: number;
  pendingCoordinatesCount: number;
  pendingAssessmentsCount: number;
}

export function PendingQueueCard({
  pendingEvidenceCount,
  pendingCoordinatesCount,
  pendingAssessmentsCount,
}: PendingQueueCardProps) {
  const queueItems = [
    {
      title: 'Foto-dalillarni tekshirish',
      description: 'Maktablar tomonidan yuklangan infra-tuzilma fotosuratlari',
      count: pendingEvidenceCount,
      href: '/admin/evidence',
      icon: Camera,
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    {
      title: 'Geolokatsiya koordinatalari',
      description: 'Ommaviy xaritaga kiritilishi kutilayotgan maktab GPS nuqtalari',
      count: pendingCoordinatesCount,
      href: '/admin/coordinates',
      icon: MapPin,
      badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      title: 'Maktab o‘z-o‘zini baholashlari',
      description: 'Yakunlangan va inspektor tasdig‘ini kutayotgan anketalar',
      count: pendingAssessmentsCount,
      href: '/admin/assessments',
      icon: ClipboardCheck,
      badgeColor: 'bg-teal-50 text-teal-900 border-teal-200',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Kutilayotgan Tekshiruv Vazifalari
            </h2>
            <p className="text-xs text-slate-500">
              Administrator tekshiruvi va tasdig‘ini talab qiluvchi arizalar navbati
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {queueItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white hover:border-teal-500 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border ${item.badgeColor}`}>
                      {item.count} ta kutilmoqda
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>

              <Link href={item.href} className="shrink-0 self-end sm:self-center">
                <Button
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold gap-1.5 rounded-xl h-9.5 px-4"
                >
                  <span>Tekshirish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
