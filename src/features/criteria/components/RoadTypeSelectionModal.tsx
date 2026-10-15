'use client';

import React, { useState } from 'react';
import { RoadType } from '@/types';
import { ROAD_TYPES_LIST, RoadTypeMeta } from '@/lib/roadTypes';
import { Button } from '@/components/ui/button';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Car,
  Layers,
  Sparkles,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface RoadTypeSelectionModalProps {
  isOpen: boolean;
  currentRoadType?: RoadType | null;
  schoolName?: string;
  isMandatory?: boolean;
  onSelect: (selected: RoadType) => Promise<void>;
  onClose?: () => void;
}

export function RoadTypeSelectionModal({
  isOpen,
  currentRoadType,
  schoolName,
  isMandatory = true,
  onSelect,
  onClose,
}: RoadTypeSelectionModalProps) {
  const [selected, setSelected] = useState<RoadType>(currentRoadType || 'URBAN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onSelect(selected);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-7 relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Shield className="w-3.5 h-3.5" />
              Majburiy Bosqich • iRAP SR4S Standarti
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Maktabga yondosh avtomobil yo‘li toifasini tanlang
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            {schoolName ? <strong>{schoolName}</strong> : 'Maktab'} atrofidagi 40 ta mezonli testni bajarishdan oldin, asosiy harakatlanuvchi yo‘l toifasini belgilash shart. Ushbu ko‘rsatkich butun davlat monitoringi, statistika va tahliliy hisobotlarga tatbiq etiladi.
          </p>
        </div>

        {/* 4 Cards Selection Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-3.5 flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-teal-600" />
            <span>4 ta rasmiy yo‘l toifasidan birini tanlang:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ROAD_TYPES_LIST.map((item: RoadTypeMeta) => {
              const isChosen = selected === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className={cn(
                    'p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer text-left relative flex flex-col justify-between space-y-3 select-none',
                    isChosen
                      ? 'border-teal-600 bg-teal-50/60 shadow-md ring-2 ring-teal-500/20'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl shrink-0">{item.icon}</span>
                      <div>
                        <h3 className={cn('text-sm font-black', isChosen ? 'text-teal-950' : 'text-slate-900')}>
                          {item.shortName}
                        </h3>
                        <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                        isChosen ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 bg-white'
                      )}
                    >
                      {isChosen && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Tezlik rejimi:</span>
                    <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.speedLimit.split('(')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Eslatma:</strong> Yo‘l toifasi maktab atrofidagi ruxsat etilgan tezlik, xavf koeffitsiyenti va BMT SR4S yulduzli bahosini hisoblash algoritmining muhim poydevori hisoblanadi.
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Tanlandi: <strong className="text-slate-900">{ROAD_TYPES_LIST.find((r) => r.id === selected)?.shortName}</strong>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {!isMandatory && onClose && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto text-xs border-slate-300"
              >
                Bekor qilish
              </Button>
            )}

            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl gap-2 shadow-md"
            >
              <span>{isSubmitting ? 'Saqlanmoqda...' : 'Tasdiqlash va testni boshlash'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
