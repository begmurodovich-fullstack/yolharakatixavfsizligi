'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import {
  OFFICIAL_40_ATTRIBUTES_DATA,
  AttributeDefinition,
  AttributeOption,
} from '@/data/sr4sAttributesData';
import {
  Star,
  RotateCcw,
  Check,
  X,
  Save,
  Loader2,
} from 'lucide-react';

export type { AttributeDefinition, AttributeOption };

export interface Sr4sStarLevel {
  starCount: number;
  title: string;
  colorName: string;
  description: string;
  starFillClass: string;
  starTextClass: string;
  badgeClass: string;
  cardBorderClass: string;
  cardBgClass: string;
  minStar: number;
  maxStar: number;
}

// 5 OFFICIAL SR4S STAR LEVEL DEFINITIONS
export const SR4S_STAR_LEVELS: Sr4sStarLevel[] = [
  {
    starCount: 1,
    title: '1 Yulduz — Infratuzilma Yetishmaydi',
    colorName: 'Qora',
    description: "Infratuzilmaning yetishmasligi, transport oqimining juda ko'pligi va yuqori tezlik",
    starFillClass: 'fill-slate-950 text-slate-900 stroke-slate-400 drop-shadow-md',
    starTextClass: 'text-slate-300',
    badgeClass: 'bg-slate-950 text-slate-200 border-slate-700',
    cardBorderClass: 'border-slate-700/80',
    cardBgClass: 'bg-slate-900/90',
    minStar: 1.0,
    maxStar: 1.9,
  },
  {
    starCount: 2,
    title: '2 Yulduz — Yuqori Xavf',
    colorName: 'Qizil',
    description: "Infratuzilma yo'qligi, yaxshi bo'lmagan sharoit va chorrahadan uzoqda joylashgani",
    starFillClass: 'fill-red-500 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]',
    starTextClass: 'text-red-400',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30',
    cardBorderClass: 'border-red-500/50',
    cardBgClass: 'bg-red-950/20',
    minStar: 2.0,
    maxStar: 2.9,
  },
  {
    starCount: 3,
    title: '3 Yulduz — O‘rtacha Xavfsiz (BMT Maqsadi)',
    colorName: 'Sariq',
    description: "Infratuzilmaning yetishmasligi, transport oqimining kamligi va past tezlik",
    starFillClass: 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]',
    starTextClass: 'text-yellow-400',
    badgeClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    cardBorderClass: 'border-yellow-500/50',
    cardBgClass: 'bg-yellow-950/20',
    minStar: 3.0,
    maxStar: 3.9,
  },
  {
    starCount: 4,
    title: '4 Yulduz — Qulay va Xavfsiz',
    colorName: 'Sabzirang',
    description: 'Xavfsizlik uchun qulay sharoit',
    starFillClass: 'fill-amber-500 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]',
    starTextClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    cardBorderClass: 'border-amber-500/50',
    cardBgClass: 'bg-amber-950/20',
    minStar: 4.0,
    maxStar: 4.9,
  },
  {
    starCount: 5,
    title: '5 Yulduz — To‘liq Jihozlangan Xavfsiz',
    colorName: 'Yashil',
    description: "To'liq jihozlangan yo'l, xavfsiz o'tish joyi va sokin harakat",
    starFillClass: 'fill-emerald-500 text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]',
    starTextClass: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    cardBorderClass: 'border-emerald-500/50',
    cardBgClass: 'bg-emerald-950/20',
    minStar: 5.0,
    maxStar: 5.0,
  },
];

export function Sr4sDemonstrator() {
  const { user } = useAuth();
  const { success, error, info } = useToast();

  const [attributes, setAttributes] = useState<AttributeDefinition[]>(OFFICIAL_40_ATTRIBUTES_DATA);
  const [activeModalAttr, setActiveModalAttr] = useState<AttributeDefinition | null>(null);
  const [inputVal, setInputVal] = useState<string>('');
  const [sliderVal, setSliderVal] = useState<number>(40);
  const [isSaving, setIsSaving] = useState(false);

  // When opening modal, initialize inputVal or sliderVal
  const handleOpenModal = (attr: AttributeDefinition) => {
    setActiveModalAttr(attr);
    if (attr.isInput) {
      setInputVal(attr.customValue || attr.currentValueId || '');
    }
    if (attr.isSlider) {
      setSliderVal(parseInt(attr.customValue || attr.currentValueId || '40', 10));
    }
  };

  const handleSliderChange = (attrId: string, val: number) => {
    setSliderVal(val);
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.id === attrId
          ? {
              ...attr,
              currentValueId: String(val),
              customValue: String(val),
              options: [
                {
                  ...attr.options[0],
                  id: String(val),
                  labelEn: `${val} km/h`,
                  labelUz: `${val} km/h`,
                  badgeText: `${val} km/h`,
                  scoreWeight:
                    val <= 30 ? 5 : val <= 40 ? 4 : val <= 50 ? 3 : val <= 60 ? 2 : 1,
                },
              ],
            }
          : attr
      )
    );
  };

  // Dynamic Star Rating calculation
  const { decimalScore, starLevel } = useMemo(() => {
    let totalScoreWeight = 0;
    let maxPossibleScore = 0;

    attributes.forEach((attr) => {
      if (attr.isInput) {
        const num = parseFloat(attr.customValue || attr.currentValueId) || 0;
        if (attr.id === 'vehicles_per_day') {
          const weight = num <= 500 ? 5 : num <= 2000 ? 4 : num <= 8000 ? 3 : num <= 15000 ? 2 : 1;
          totalScoreWeight += weight;
        } else if (attr.id === 'intersection_side_flow') {
          const weight = num <= 500 ? 5 : num <= 2000 ? 4 : num <= 5000 ? 3 : 2;
          totalScoreWeight += weight;
        } else {
          totalScoreWeight += 4;
        }
        maxPossibleScore += 5;
      } else if (attr.isSlider) {
        const speed = parseFloat(attr.customValue || attr.currentValueId) || 40;
        const weight = speed <= 30 ? 5 : speed <= 40 ? 4 : speed <= 50 ? 3 : speed <= 60 ? 2 : 1;
        totalScoreWeight += weight;
        maxPossibleScore += 5;
      } else {
        const selected = attr.options.find((o) => o.id === attr.currentValueId) || attr.options[0];
        totalScoreWeight += selected ? selected.scoreWeight : 4;
        maxPossibleScore += 5;
      }
    });

    const ratio = totalScoreWeight / maxPossibleScore;
    const score = Math.min(5.0, Math.max(1.0, 1.0 + ratio * 4.0));
    const roundedScore = Math.round(score * 10) / 10;

    const matchedLevel =
      SR4S_STAR_LEVELS.find((l) => roundedScore >= l.minStar && roundedScore <= l.maxStar) ||
      SR4S_STAR_LEVELS[2];

    return {
      decimalScore: roundedScore.toFixed(1),
      starLevel: matchedLevel,
      percentFill: (roundedScore / 5) * 100,
    };
  }, [attributes]);

  const handleSelectOption = (attrId: string, optionId: string) => {
    setAttributes((prev) =>
      prev.map((attr) => (attr.id === attrId ? { ...attr, currentValueId: optionId } : attr))
    );
    setActiveModalAttr(null);
  };

  const handleSaveCustomInput = (attrId: string, value: string) => {
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.id === attrId
          ? { ...attr, currentValueId: value, customValue: value }
          : attr
      )
    );
    setActiveModalAttr(null);
  };

  const handleReset = () => {
    setAttributes(OFFICIAL_40_ATTRIBUTES_DATA);
    success('Barcha 40 mezon boshlang‘ich holatga qaytarildi');
  };

  const handlePreset = (level: "safe" | "medium" | "danger") => {
    setAttributes((prev) =>
      prev.map((attr) => {
        let chosen = attr.options[0];
        if (level === "safe") {
          chosen = [...attr.options].sort((a, b) => b.scoreWeight - a.scoreWeight)[0];
        } else if (level === "danger") {
          chosen = [...attr.options].sort((a, b) => a.scoreWeight - b.scoreWeight)[0];
        } else {
          const midIndex = Math.floor(attr.options.length / 2);
          chosen = attr.options[midIndex] || attr.options[0];
        }
        return { ...attr, currentValueId: chosen.id };
      })
    );
    info(
      level === "safe"
        ? '5 Yulduzli namunali xavfsiz sharoit yuklandi'
        : level === "danger"
        ? '1-2 Yulduzli xavfli yo‘l sharoiti yuklandi'
        : '3 Yulduzli o‘rtacha yo‘l sharoiti yuklandi'
    );
  };

  const handleSaveAssessment = async () => {
    setIsSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      success('Baholash muvaffaqiyatli saqlandi! Yulduzli reyting: ' + decimalScore);
    } catch {
      error('Saqlashda xatolik yuz berdi');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden font-sans">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 font-black text-xl">
            ★
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">SR4S Demonstrator</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 uppercase tracking-wide">
                40 Asl Mezon
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Har bir piktogrammani bosib uning qiymatini o‘zgartiring va yulduzli baho o‘zgarishini ko‘ring
            </p>
          </div>
        </div>

        {/* Action Presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePreset("danger")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
          >
            1★ Xavfli
          </button>
          <button
            onClick={() => handlePreset("medium")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            3★ O‘rtacha
          </button>
          <button
            onClick={() => handlePreset("safe")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            5★ Namunali
          </button>
          <button
            onClick={handleReset}
            title="Qayta tiklash"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors border border-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout (Matching results.starratingforschools.org/demonstrator) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 items-start">
        {/* Left Column (Artwork & Dynamic Star Rating) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-between text-center lg:sticky lg:top-8 bg-gradient-to-b from-slate-50/80 to-slate-100/40 p-6 rounded-2xl border border-slate-200/80">
          {/* Instruction Text */}
          <p className="text-sm font-medium text-slate-600 max-w-xs leading-snug mb-4">
            Piktogrammani tanlab, uning qiymatini o‘zgartiring va yulduzli bahoga ta’sirini ko‘ring.
          </p>

          {/* Project Logo & Branding */}
          <div className="w-full flex flex-col items-center justify-center my-3 p-4 rounded-2xl bg-white/80 border border-slate-200/90 shadow-xs backdrop-blur-xs">
            <div className="w-36 h-36 sm:w-44 sm:h-44 relative flex items-center justify-center select-none">
              <Image
                src="/logo.svg"
                alt="Maktabga Xavfsiz Qadam"
                width={176}
                height={176}
                priority
                className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 max-h-full max-w-full"
                unoptimized
              />
            </div>

            <div className="mt-2 space-y-1 text-center">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
                Maktabga Xavfsiz Qadam
              </h3>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-[10px] font-bold text-teal-800 uppercase tracking-wide">
                <span>Milliy Dastur</span>
              </div>
            </div>
          </div>

          {/* Star Rating Display */}
          <div className="w-full mt-4 pt-4 border-t border-slate-200 flex flex-col items-center">
            {/* 5 Stars Graphic */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {[1, 2, 3, 4, 5].map((starNum) => {
                const isFull = parseFloat(decimalScore) >= starNum;
                const isPartial =
                  parseFloat(decimalScore) > starNum - 1 && parseFloat(decimalScore) < starNum;
                const fraction = isPartial ? parseFloat(decimalScore) - (starNum - 1) : 0;

                return (
                  <div key={starNum} className="relative w-8 h-8 sm:w-9 sm:h-9">
                    {/* Empty star outline */}
                    <Star className="w-full h-full text-slate-300 stroke-[1.5]" />
                    {/* Filled portion */}
                    {(isFull || isPartial) && (
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: isFull ? "100%" : (fraction * 100) + "%" }}
                      >
                        <Star className="w-8 h-8 sm:w-9 sm:h-9 fill-yellow-400 text-yellow-400 stroke-yellow-500 drop-shadow-[0_2px_4px_rgba(234,179,8,0.4)]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Decimal Score Label */}
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Yulduzli reyting: <span className="text-yellow-600">{decimalScore}</span>
            </div>

            {/* Star Level Status Badge */}
            <div className={cn('mt-3 px-4 py-1.5 rounded-full text-xs font-bold border', starLevel.badgeClass)}>
              {starLevel.title}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 max-w-xs leading-relaxed">
              {starLevel.description}
            </p>

            {/* Save Button if School User */}
            {user && (
              <Button
                onClick={handleSaveAssessment}
                disabled={isSaving}
                className="mt-5 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saqlanmoqda...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Maktab uchun saqlash
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Right Column (The 40 Interactive Official Attributes Grid: 5 rows x 8 columns) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {attributes.map((attr) => {
              const currentOption =
                attr.options.find((o) => o.id === attr.currentValueId) || attr.options[0];

              const isPurpleInput = attr.isInput || attr.id === 'vehicles_per_day' || attr.id === 'intersection_side_flow';

              return (
                <button
                  key={attr.id}
                  onClick={() => handleOpenModal(attr)}
                  type="button"
                  title={attr.nameUz + " (" + attr.nameEn + ")"}
                  className="flex flex-col items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-lg hover:border-teal-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 text-center group min-h-[128px] focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                >
                  {/* Icon Graphic Container */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 relative flex items-center justify-center select-none group-hover:scale-105 transition-transform duration-200">
                    {isPurpleInput ? (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#4a3575] flex items-center justify-center p-1 shadow-2xs">
                        <span className="text-white font-bold text-xs sm:text-sm font-mono tracking-tight text-center px-1 truncate">
                          {attr.customValue || attr.currentValueId}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={currentOption?.iconSrc || '/sr4s_icons/icon-good.png'}
                          alt={attr.nameUz}
                          width={64}
                          height={64}
                          className="object-contain max-h-full max-w-full drop-shadow-2xs"
                          unoptimized
                        />

                        {/* Speed limit overlay if speed card */}
                        {attr.id === 'speed_limit' && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xs sm:text-[13px] font-black text-slate-900 leading-none">
                              {attr.customValue || attr.currentValueId}
                            </span>
                            <span className="text-[7px] font-bold text-slate-800 leading-none mt-0.5">
                              km/h
                            </span>
                          </div>
                        )}

                        {/* Operating speed overlay */}
                        {attr.id === 'operating_speed' && (
                          <div className="absolute right-0.5 bottom-0.5 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xs sm:text-[13px] font-black text-slate-900 leading-none">
                              {attr.customValue || attr.currentValueId}
                            </span>
                            <span className="text-[7px] font-bold text-slate-800 leading-none mt-0.5">
                              km/h
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Attribute Title (Uzbek primary + English code) */}
                  <div className="w-full mt-1.5 space-y-0.5">
                    <span className="text-[11px] font-bold text-slate-800 leading-tight block line-clamp-2">
                      {attr.nameUz}
                    </span>
                    <span className="text-[9px] text-slate-400 block truncate">
                      {attr.nameEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Option Picker Modal (1-to-1 match with official SR4S demonstrator) */}
      {activeModalAttr && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActiveModalAttr(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl border border-slate-100 relative px-6 sm:px-10 pt-6 pb-7 max-w-4xl w-auto min-w-[300px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red '×' close button top right */}
            <button
              onClick={() => setActiveModalAttr(null)}
              className="absolute top-2.5 right-3 text-red-500 hover:text-red-700 font-bold text-2xl leading-none transition-colors p-1 cursor-pointer"
              aria-label="Yopish"
            >
              ×
            </button>

            {/* Modal Title (Uzbek primary + English sub) */}
            <div className="text-center mb-5 select-none space-y-0.5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                {activeModalAttr.nameUz}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {activeModalAttr.nameEn}
              </p>
            </div>

            {/* Mode 1: Editable Input Mode for numeric/custom attributes */}
            {activeModalAttr.isInput ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveCustomInput(activeModalAttr.id, inputVal);
                }}
                className="w-full max-w-sm mx-auto mt-2 flex items-center border border-slate-300 rounded-md overflow-hidden bg-white shadow-xs focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 px-4 py-3 text-base sm:text-lg text-slate-800 font-medium outline-hidden"
                  placeholder="Qiymatni kiriting..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-white hover:bg-slate-50 border-l border-slate-200 text-teal-600 transition-colors flex items-center justify-center cursor-pointer"
                  title="Tasdiqlash"
                >
                  <Check className="w-5 h-5 text-teal-600 stroke-[2.5]" />
                </button>
              </form>
            ) : activeModalAttr.isSlider ? (
              /* Mode 2: Slider Mode for Speed Limit and Operating Speed (Direct Slider + Editable Input) */
              <div className="w-full max-w-sm sm:max-w-md mx-auto my-6 flex items-center justify-center gap-4 sm:gap-6">
                <div className="relative flex-1 flex items-center">
                  <input
                    type="range"
                    min={activeModalAttr.min || 10}
                    max={activeModalAttr.max || 130}
                    step={activeModalAttr.step || 5}
                    value={sliderVal}
                    onChange={(e) =>
                      handleSliderChange(activeModalAttr.id, parseInt(e.target.value, 10))
                    }
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#009688]"
                  />
                </div>
                <div className="flex items-stretch border border-[#009688] rounded-md overflow-hidden bg-white shadow-2xs">
                  <input
                    type="number"
                    min={activeModalAttr.min || 10}
                    max={activeModalAttr.max || 130}
                    step={activeModalAttr.step || 1}
                    value={sliderVal}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        handleSliderChange(activeModalAttr.id, val);
                      }
                    }}
                    className="w-14 px-2 py-2 text-center font-bold text-slate-800 text-sm sm:text-base outline-hidden"
                  />
                  <div className="bg-[#009688] text-white px-3 py-2 flex items-center justify-center font-semibold text-xs sm:text-sm select-none">
                    km/h
                  </div>
                </div>
              </div>
            ) : (
              /* Mode 3: Option Cards Horizontal Row */
              <div className="flex flex-row items-end justify-center gap-3 sm:gap-6 flex-wrap">
                {activeModalAttr.options.map((option) => {
                  const isSelected = option.id === activeModalAttr.currentValueId;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(activeModalAttr.id, option.id)}
                      type="button"
                      className={cn(
                        'group flex flex-col items-center justify-end p-2 transition-all cursor-pointer rounded-xs min-w-[70px] sm:min-w-[80px]',
                        isSelected
                          ? 'border border-[#009688] shadow-2xs'
                          : 'border border-transparent hover:border-slate-300'
                      )}
                    >
                      {/* Option Icon */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 relative flex items-center justify-center mb-1 select-none">
                        <Image
                          src={option.iconSrc}
                          alt={option.labelUz}
                          width={64}
                          height={64}
                          className="object-contain max-h-full max-w-full drop-shadow-2xs"
                          unoptimized
                        />
                      </div>

                      {/* Option Uzbek Label (Primary) */}
                      <span className="text-xs sm:text-sm text-slate-800 font-semibold text-center leading-tight max-w-[85px] sm:max-w-[100px] break-words select-none">
                        {option.labelUz}
                      </span>

                      {/* Option English subtitle (Secondary) */}
                      <span className="text-[10px] text-slate-400 text-center leading-tight mt-0.5 max-w-[85px] truncate select-none">
                        {option.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
