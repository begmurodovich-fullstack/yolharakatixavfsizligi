'use client';

import React, { useState } from 'react';
import {
  SR4S_COUNTERMEASURES_MATRIX,
  getCountermeasureByScore,
  Sr4sCountermeasureTier,
} from '@/data/sr4sCountermeasures';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Wrench,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface CountermeasuresMatrixCardProps {
  schoolScore?: number;
  compact?: boolean;
  className?: string;
  defaultOpenAll?: boolean;
}

export function CountermeasuresMatrixCard({
  schoolScore,
  compact = false,
  className,
  defaultOpenAll = false,
}: CountermeasuresMatrixCardProps) {
  const currentTier = schoolScore !== undefined ? getCountermeasureByScore(schoolScore) : null;
  const [selectedTierKey, setSelectedTierKey] = useState<string>(
    currentTier ? currentTier.tierKey : '1-star'
  );
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(defaultOpenAll || schoolScore === undefined);

  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6',
        className
      )}
    >
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 mt-0.5 shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                SR4S Standarti & Dissertatsiya Tavsiyasi
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Qarshi Chora-Tadbirlar Matritsasi (Countermeasures Matrix)
            </h3>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              Star Rating for Schools metodologiyasi bo‘yicha yulduzlar darajalariga qarab xavf omillarini bartaraf etish va muhandislik aralashuvini rejalashtirish matritsasi.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowFullMatrix(!showFullMatrix)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-all self-start sm:self-center shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-teal-600" />
          <span>{showFullMatrix ? 'Faqat joriy reja' : 'To‘liq 1–5★ matritsa'}</span>
          {showFullMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 2. Highlight for Current School (if score provided) */}
      {currentTier && !showFullMatrix && (
        <div className="space-y-4">
          <div className={cn('rounded-2xl border p-5 sm:p-6 space-y-4', currentTier.borderClass, currentTier.bgClass)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl font-mono tracking-wider">{currentTier.starIcon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {currentTier.title} ({currentTier.riskLevel})
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      Maktabingiz holati
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 font-medium">
                    Joriy ball: <strong>{schoolScore} / 100</strong>
                  </span>
                </div>
              </div>

              <span className={cn('px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1', currentTier.badgeClass)}>
                {currentTier.urgency === 'CRITICAL' && <AlertTriangle className="w-3.5 h-3.5" />}
                {currentTier.urgency === 'URGENT' && <ShieldAlert className="w-3.5 h-3.5" />}
                {currentTier.urgency === 'STANDARD' && <Wrench className="w-3.5 h-3.5" />}
                {currentTier.urgency === 'MAINTENANCE' && <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{currentTier.badgeLabel}</span>
              </span>
            </div>

            {/* Risk factors */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Aniqlangan Infratuzilma Holati (Risk Omillari):
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                {currentTier.riskFactors.map((rf, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/70">
                    <span className="text-rose-600 font-black text-xs shrink-0">•</span>
                    <span className="leading-snug">{rf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proposal / Action Plan */}
            <div className="space-y-2 pt-2 border-t border-slate-200/60">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                Dissertatsiya uchun Aniq Qarshi Chora-Tadbir Rejasi (Taklif Matni):
              </span>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
                <p className="text-xs font-semibold text-slate-800 italic leading-relaxed">
                  &quot;{currentTier.planText}&quot;
                </p>
                <ol className="space-y-1.5 text-xs text-slate-700">
                  {currentTier.actionItems.map((ai, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-mono font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200 shrink-0">
                        {idx + 1}
                      </span>
                      <span>{ai}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Full 4-Tier Matrix (Grid or Tabs) */}
      {showFullMatrix && (
        <div className="space-y-4">
          {/* Level Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SR4S_COUNTERMEASURES_MATRIX.map((tier) => {
              const isActive = selectedTierKey === tier.tierKey;
              return (
                <button
                  key={tier.tierKey}
                  type="button"
                  onClick={() => setSelectedTierKey(tier.tierKey)}
                  className={cn(
                    'p-3 rounded-xl border text-left transition-all space-y-1',
                    isActive
                      ? 'border-teal-600 bg-teal-50/60 shadow-xs ring-1 ring-teal-500'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{tier.title}</span>
                    <span className="text-xs">{tier.starIcon}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                    {tier.riskLevel}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Tier Details Card */}
          {(() => {
            const activeTier =
              SR4S_COUNTERMEASURES_MATRIX.find((t) => t.tierKey === selectedTierKey) ||
              SR4S_COUNTERMEASURES_MATRIX[0];

            return (
              <div
                className={cn(
                  'rounded-2xl border p-5 sm:p-6 space-y-5 transition-all',
                  activeTier.borderClass,
                  activeTier.bgClass
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-mono tracking-wider">{activeTier.starIcon}</span>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        {activeTier.title} ({activeTier.riskLevel})
                      </h4>
                      <p className="text-xs text-slate-600">
                        SR4S piyodalar xavfi modeli bo‘yicha belgilangan chora-tadbirlar
                      </p>
                    </div>
                  </div>

                  <span className={cn('px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1.5 self-start sm:self-center', activeTier.badgeClass)}>
                    <span>{activeTier.badgeLabel}</span>
                  </span>
                </div>

                {/* Risk Factors */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Aniqlangan Infratuzilma Holati (Risk Omillari):</span>
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {activeTier.riskFactors.map((factor, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-2xs"
                      >
                        <span className="text-rose-600 font-black text-sm shrink-0 leading-none">•</span>
                        <span className="text-slate-700 leading-snug">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Countermeasure Proposals */}
                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                    <span>Dissertatsiya uchun Aniq Qarshi Chora-Tadbir Rejasi (Taklif Matni):</span>
                  </span>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <p className="text-xs font-semibold text-slate-900 italic leading-relaxed">
                      &quot;{activeTier.planText}&quot;
                    </p>
                    <ol className="space-y-2 text-xs text-slate-700">
                      {activeTier.actionItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 shrink-0 text-[11px]">
                            {idx + 1}
                          </span>
                          <span className="pt-0.5">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
