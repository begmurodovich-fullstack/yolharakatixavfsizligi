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
  calculateIrapSr4s,
  OFFICIAL_SR4S_STAR_LEVELS,
  Sr4sStarLevel,
  IrapCalculationResult,
} from '@/lib/sr4sCalculation';
import {
  Star,
  RotateCcw,
  Check,
  X,
  Save,
  Loader2,
  HelpCircle,
  Activity,
  ArrowRightLeft,
  ShieldCheck,
  Info,
} from 'lucide-react';

export type { AttributeDefinition, AttributeOption };
export { OFFICIAL_SR4S_STAR_LEVELS, OFFICIAL_SR4S_STAR_LEVELS as SR4S_STAR_LEVELS };
export type { Sr4sStarLevel };

export function Sr4sDemonstrator() {
  const { user } = useAuth();
  const { success, error, info } = useToast();

  const [attributes, setAttributes] = useState<AttributeDefinition[]>(OFFICIAL_40_ATTRIBUTES_DATA);
  const [activeModalAttr, setActiveModalAttr] = useState<AttributeDefinition | null>(null);
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [sliderVal, setSliderVal] = useState<number>(45);
  const [isSaving, setIsSaving] = useState(false);

  // When opening modal, initialize inputVal or sliderVal
  const handleOpenModal = (attr: AttributeDefinition) => {
    setActiveModalAttr(attr);
    if (attr.isInput) {
      setInputVal(attr.customValue || attr.currentValueId || '');
    }
    if (attr.isSlider) {
      setSliderVal(parseInt(attr.customValue || attr.currentValueId || '45', 10));
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

  // Rasmiy iRAP Piyodalar Xavfi Modeli hisob-kitobi
  const irapResult: IrapCalculationResult = useMemo(() => {
    return calculateIrapSr4s(attributes);
  }, [attributes]);

  const { decimalScore, starLevel, srsScore, ctsAlong, ctsCrossing, starCount } = irapResult;

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
    success('Barcha 40 mezon boshlang‘ich holatga qaytarildi (Standart 4.4 Yulduz)');
  };

  const handlePreset = (level: 'safe' | 'medium' | 'danger') => {
    if (level === 'safe') {
      // 5 Yulduzli namunali holat (Tezlik 30 km/h, sun'iy do'nglik ustidagi zebra, patrul, keng trotuar)
      setAttributes((prev) =>
        prev.map((attr) => {
          if (attr.id === 'operating_speed') {
            return { ...attr, currentValueId: '30', customValue: '30' };
          }
          if (attr.id === 'speed_limit') {
            return { ...attr, currentValueId: '30', customValue: '30' };
          }
          if (attr.id === 'speed_management') {
            return { ...attr, currentValueId: 'present' };
          }
          if (attr.id === 'crossing_main_road') {
            return { ...attr, currentValueId: 'raised_refuge' };
          }
          if (attr.id === 'crossing_supervisor') {
            return { ...attr, currentValueId: 'supervisor' };
          }
          if (attr.id === 'sidewalk_left') {
            return { ...attr, currentValueId: 'ge_1_5m' };
          }
          if (attr.id === 'sidewalk_right') {
            return { ...attr, currentValueId: 'ge_1_5m' };
          }
          if (attr.id === 'street_lighting') {
            return { ...attr, currentValueId: 'present' };
          }
          if (attr.id === 'sight_distance') {
            return { ...attr, currentValueId: 'adequate' };
          }
          if (attr.id === 'school_warning') {
            return { ...attr, currentValueId: 'signs_markings' };
          }
          if (attr.id === 'vehicles_per_day') {
            return { ...attr, currentValueId: '200', customValue: '200' };
          }
          return attr;
        })
      );
      info('5 Yulduzli namunali xavfsiz sharoit yuklandi (Tezlik 30 km/h, patrul, orolchali zebra)');
    } else if (level === 'danger') {
      // 1-2 Yulduzli xavfli holat (Tezlik 70 km/h, trotuar yo'q, zebra yo'q, yuqori oqim)
      setAttributes((prev) =>
        prev.map((attr) => {
          if (attr.id === 'operating_speed') {
            return { ...attr, currentValueId: '70', customValue: '70' };
          }
          if (attr.id === 'speed_limit') {
            return { ...attr, currentValueId: '60', customValue: '60' };
          }
          if (attr.id === 'speed_management') {
            return { ...attr, currentValueId: 'not_present' };
          }
          if (attr.id === 'crossing_main_road') {
            return { ...attr, currentValueId: 'none' };
          }
          if (attr.id === 'crossing_supervisor') {
            return { ...attr, currentValueId: 'no_supervisor' };
          }
          if (attr.id === 'sidewalk_left') {
            return { ...attr, currentValueId: 'none' };
          }
          if (attr.id === 'sidewalk_right') {
            return { ...attr, currentValueId: 'none' };
          }
          if (attr.id === 'street_lighting') {
            return { ...attr, currentValueId: 'not_present' };
          }
          if (attr.id === 'sight_distance') {
            return { ...attr, currentValueId: 'poor' };
          }
          if (attr.id === 'number_of_lanes') {
            return { ...attr, currentValueId: '2_2' };
          }
          if (attr.id === 'vehicles_per_day') {
            return { ...attr, currentValueId: '12000', customValue: '12000' };
          }
          return attr;
        })
      );
      info('1-2 Yulduzli xavfli yo‘l sharoiti yuklandi (Tezlik yuqori, trotuar va zebra yo‘q)');
    } else {
      // 3 Yulduzli o'rtacha holat (BMT talabi)
      setAttributes((prev) =>
        prev.map((attr) => {
          if (attr.id === 'operating_speed') {
            return { ...attr, currentValueId: '50', customValue: '50' };
          }
          if (attr.id === 'speed_limit') {
            return { ...attr, currentValueId: '50', customValue: '50' };
          }
          if (attr.id === 'speed_management') {
            return { ...attr, currentValueId: 'not_present' };
          }
          if (attr.id === 'crossing_main_road') {
            return { ...attr, currentValueId: 'marked' };
          }
          if (attr.id === 'crossing_supervisor') {
            return { ...attr, currentValueId: 'no_supervisor' };
          }
          if (attr.id === 'sidewalk_left') {
            return { ...attr, currentValueId: '0_1m' };
          }
          if (attr.id === 'sidewalk_right') {
            return { ...attr, currentValueId: 'none' };
          }
          if (attr.id === 'street_lighting') {
            return { ...attr, currentValueId: 'present' };
          }
          if (attr.id === 'vehicles_per_day') {
            return { ...attr, currentValueId: '3500', customValue: '3500' };
          }
          return attr;
        })
      );
      info('3 Yulduzli o‘rtacha yo‘l sharoiti yuklandi (BMT talabi: 50 km/h, o‘tish joyi bor)');
    }
  };

  const handleSaveAssessment = async () => {
    setIsSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      success(`Baholash muvaffaqiyatli saqlandi! Yulduzli reyting: ${decimalScore} (SRS: ${srsScore})`);
    } catch {
      error('Saqlashda xatolik yuz berdi');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden font-sans">
      {/* Top Banner / Controls */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 font-black text-xl">
            ★
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">SR4S Rasmiy Kalkulyatori</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 uppercase tracking-wide">
                iRAP 40 Mezon
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Piktogrammalarni tanlab parametrlarni o‘zgartiring va xalqaro iRAP xavf formulasi bo‘yicha bahoni ko‘ring
            </p>
          </div>
        </div>

        {/* Action Presets & Formula Explainer */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowFormulaModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Formula va Mezonlar</span>
          </button>
          <button
            onClick={() => handlePreset('danger')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
          >
            1★ Xavfli
          </button>
          <button
            onClick={() => handlePreset('medium')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            3★ O‘rtacha
          </button>
          <button
            onClick={() => handlePreset('safe')}
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

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 items-start">
        {/* Left Column: Dynamic Star Rating & iRAP Risk Scores */}
        <div className="lg:col-span-4 flex flex-col items-center justify-between text-center lg:sticky lg:top-8 bg-gradient-to-b from-slate-50/80 to-slate-100/40 p-6 rounded-2xl border border-slate-200/80 space-y-4">
          {/* Instruction Text */}
          <p className="text-xs font-medium text-slate-600 max-w-xs leading-snug">
            Piktogrammani tanlab, uning qiymatini o‘zgartiring va iRAP yulduzli bahoga ta’sirini kuzating.
          </p>

          {/* Project Logo & Branding */}
          <div className="w-full flex flex-col items-center justify-center p-4 rounded-2xl bg-white/80 border border-slate-200/90 shadow-xs backdrop-blur-xs">
            <div className="w-32 h-32 sm:w-36 sm:h-36 relative flex items-center justify-center select-none">
              <Image
                src="/logo.svg"
                alt="Maktabga Xavfsiz Qadam"
                width={144}
                height={144}
                priority
                className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 max-h-full max-w-full"
                unoptimized
              />
            </div>

            <div className="mt-2 space-y-0.5 text-center">
              <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-900 bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
                Maktabga Xavfsiz Qadam
              </h3>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-[10px] font-bold text-teal-800 uppercase tracking-wide">
                <span>iRAP / SR4S Modeli</span>
              </div>
            </div>
          </div>

          {/* Star Rating Display */}
          <div className="w-full pt-3 border-t border-slate-200 flex flex-col items-center">
            {/* 5 Stars Graphic */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {[1, 2, 3, 4, 5].map((starNum) => {
                const isFull = parseFloat(decimalScore) >= starNum;
                const isPartial =
                  parseFloat(decimalScore) > starNum - 1 && parseFloat(decimalScore) < starNum;
                const fraction = isPartial ? parseFloat(decimalScore) - (starNum - 1) : 0;

                return (
                  <div key={starNum} className="relative w-8 h-8 sm:w-9 sm:h-9">
                    <Star className="w-full h-full text-slate-300 stroke-[1.5]" />
                    {(isFull || isPartial) && (
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: isFull ? '100%' : fraction * 100 + '%' }}
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
            <div className={cn('mt-2.5 px-3 py-1 rounded-full text-xs font-bold border', starLevel.badgeClass)}>
              {starLevel.title}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs leading-relaxed">
              {starLevel.description}
            </p>
          </div>

          {/* iRAP Star Rating Score (SRS) & Crash Type Scores (CTS) Breakdown Box */}
          <div className="w-full p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs text-left space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Activity className="w-4 h-4 text-teal-600" />
                <span>iRAP Xavf Indeksi (SRS)</span>
              </div>
              <span className="text-sm font-black font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {srsScore}
              </span>
            </div>

            {/* Sub-scores: Along & Crossing */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">Bo‘ylama yurish:</div>
                <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">
                  CTS<sub>Along</sub>: <span className="text-blue-600">{ctsAlong}</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">Kesib o‘tish:</div>
                <div className="text-xs font-bold text-slate-800 font-mono mt-0.5">
                  CTS<sub>Crossing</sub>: <span className="text-purple-600">{ctsCrossing}</span>
                </div>
              </div>
            </div>

            {/* Risk Formula Summary */}
            <div className="text-[10px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
              SRS = {ctsAlong} + {ctsCrossing} = <span className="font-bold text-slate-900">{srsScore}</span>
            </div>

            {/* Visual iRAP Band Meter */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-slate-500">
                <span>0</span>
                <span>2.5 (5★)</span>
                <span>5.0 (4★)</span>
                <span>10.0 (3★)</span>
                <span>22.5 (2★)</span>
                <span>&gt;22.5 (1★)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
                <div className={cn('h-full w-1/5', starCount === 5 ? 'bg-emerald-500 ring-1 ring-emerald-600' : 'bg-emerald-200')} />
                <div className={cn('h-full w-1/5', starCount === 4 ? 'bg-amber-500 ring-1 ring-amber-600' : 'bg-amber-200')} />
                <div className={cn('h-full w-1/5', starCount === 3 ? 'bg-yellow-400 ring-1 ring-yellow-500' : 'bg-yellow-200')} />
                <div className={cn('h-full w-1/5', starCount === 2 ? 'bg-red-500 ring-1 ring-red-600' : 'bg-red-200')} />
                <div className={cn('h-full w-1/5', starCount === 1 ? 'bg-slate-900 ring-1 ring-black' : 'bg-slate-300')} />
              </div>
            </div>
          </div>

          {/* Save Button for Authenticated School Users */}
          {user && (
            <Button
              onClick={handleSaveAssessment}
              disabled={isSaving}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saqlanmoqda...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Maktab bahosini saqlash
                </>
              )}
            </Button>
          )}
        </div>

        {/* Right Column: The 40 Interactive Official SR4S Attributes Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {attributes.map((attr) => {
              const currentOption =
                attr.options.find((o) => o.id === attr.currentValueId) || attr.options[0];

              const isPurpleInput =
                attr.isInput || attr.id === 'vehicles_per_day' || attr.id === 'intersection_side_flow';

              return (
                <button
                  key={attr.id}
                  onClick={() => handleOpenModal(attr)}
                  type="button"
                  title={attr.nameUz + ' (' + attr.nameEn + ')'}
                  className="flex flex-col items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-lg hover:border-teal-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 text-center group min-h-[128px] focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 cursor-pointer"
                >
                  {/* Icon Container */}
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

                        {/* Speed limit overlay */}
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

                  {/* Attribute Title */}
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

      {/* Option Picker Modal */}
      {activeModalAttr && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActiveModalAttr(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl border border-slate-100 relative px-6 sm:px-10 pt-6 pb-7 max-w-4xl w-auto min-w-[300px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalAttr(null)}
              className="absolute top-2.5 right-3 text-red-500 hover:text-red-700 font-bold text-2xl leading-none transition-colors p-1 cursor-pointer"
              aria-label="Yopish"
            >
              ×
            </button>

            <div className="text-center mb-5 select-none space-y-0.5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                {activeModalAttr.nameUz}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {activeModalAttr.nameEn} ({activeModalAttr.code})
              </p>
            </div>

            {/* Mode 1: Numeric Input Mode */}
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
              /* Mode 2: Slider Mode for Speed */
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
              /* Mode 3: Option Cards */
              <div className="flex flex-row items-end justify-center gap-3 sm:gap-6 flex-wrap">
                {activeModalAttr.options.map((option) => {
                  const isSelected = option.id === activeModalAttr.currentValueId;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(activeModalAttr.id, option.id)}
                      type="button"
                      className={cn(
                        'group flex flex-col items-center justify-end p-2 transition-all cursor-pointer rounded-lg min-w-[70px] sm:min-w-[80px]',
                        isSelected
                          ? 'border border-[#009688] shadow-2xs bg-teal-50/20'
                          : 'border border-transparent hover:border-slate-300'
                      )}
                    >
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
                      <span className="text-xs sm:text-sm text-slate-800 font-semibold text-center leading-tight max-w-[85px] sm:max-w-[100px] break-words select-none">
                        {option.labelUz}
                      </span>
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

      {/* iRAP Formula & Standards Information Modal */}
      {showFormulaModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowFormulaModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 relative p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFormulaModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold text-2xl leading-none transition-colors p-1 cursor-pointer"
            >
              ×
            </button>

            {/* Header */}
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>iRAP / SR4S Xalqaro Standarti</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Piyodalar Xavfi Modeli (Pedestrian Risk Model) Formulalari
              </h3>
              <p className="text-xs text-slate-500">
                SR4S kalkulyatori yo‘l segmentida piyoda xavfsizligini hisoblashda ikkita harakat ssenariysini baholaydi:
              </p>
            </div>

            {/* Formula Cards */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 font-mono text-center">
              <div className="text-xs text-slate-400">1. Asosiy Xavf Indeksi Formulasi:</div>
              <div className="text-base sm:text-lg font-bold text-teal-300">
                SRS = CTS<sub>bo‘ylama (Along)</sub> + CTS<sub>kesib o‘tish (Crossing)</sub>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                2. Har bir ssenariy uchun to‘qnashuv bali (CTS):
              </div>
              <div className="text-sm sm:text-base font-bold text-amber-300">
                CTS = Likelihood × Severity × Operating Speed × External Flow
              </div>
            </div>

            {/* Factors Explanation */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-teal-600" />
                <span>Formuladagi Asosiy Ko‘paytuvchi Koeffitsiyentlar</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm text-teal-700">
                    Likelihood (Ehtimollik)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    YTH yuzaga kelish ehtimoli. Bo‘ylama yurishda trotuar borligi va uning kengligi/ajratilishi; Kesib o‘tishda esa piyodalar o‘tish joyi turi (zebra, svetofor, sun‘iy do‘nglik), maktab patrul nazoratchisi va ko‘rish masofasi.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm text-red-600">
                    Severity (Oqibat Og‘irligi)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Hodisa yuz berganda og‘ir jarohat yoki o‘lim xavfi. Og‘ir yuk mashinalari ulushi (HGV %), mototsikllar, qiyalik darajasi va yo‘l o‘rtasi ajratgich to‘siqlari ta‘sir qiladi.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm text-blue-600">
                    Operating Speed (Haqiqiy Tezlik)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Xavf tezlik kvadratiga proporsional ortadi ((V/50)²). Tezlikni majburiy pasaytirgichlar (sun‘iy do‘ngliklar) mavjud bo‘lganda xavf 30% ga kamayadi.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm text-purple-600">
                    External Flow (Oqim Ta‘siri)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Kunlik avtomobillar oqimi (AADT) va piyodalar oqimi intensivligi. Transport ko‘p bo‘lgan yo‘llarda to‘qnashuv xavfi keskin oshadi.
                  </p>
                </div>
              </div>
            </div>

            {/* Bands Table */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">
                Star Rating Score (SRS) va Yulduzlar Munosabati
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Yulduz</th>
                      <th className="p-2.5">SRS Indeksi</th>
                      <th className="p-2.5">Infratuzilma Ta‘rifi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-emerald-50/40">
                      <td className="p-2.5 font-bold text-emerald-700">★★★★★ 5 Yulduz</td>
                      <td className="p-2.5 font-mono font-bold">0 – 2.5</td>
                      <td className="p-2.5 text-slate-600">Eng xavfsiz (piyodalar to‘liq ajratilgan, tezlik ≤ 30 km/h)</td>
                    </tr>
                    <tr className="bg-amber-50/40">
                      <td className="p-2.5 font-bold text-amber-700">★★★★☆ 4 Yulduz</td>
                      <td className="p-2.5 font-mono font-bold">2.5 – 5.0</td>
                      <td className="p-2.5 text-slate-600">Yaxshi daraja, kichik xavf belgilari bor</td>
                    </tr>
                    <tr className="bg-yellow-50/40">
                      <td className="p-2.5 font-bold text-yellow-700">★★★☆☆ 3 Yulduz</td>
                      <td className="p-2.5 font-mono font-bold">5.0 – 10.0</td>
                      <td className="p-2.5 text-slate-600">Qoniqarli (BMT xalqaro eng kam maqbul standarti)</td>
                    </tr>
                    <tr className="bg-red-50/40">
                      <td className="p-2.5 font-bold text-red-700">★★☆☆☆ 2 Yulduz</td>
                      <td className="p-2.5 font-mono font-bold">10.0 – 22.5</td>
                      <td className="p-2.5 text-slate-600">Yuqori xavf (infratuzilma nuqsonlari yetarli)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">★☆☆☆☆ 1 Yulduz</td>
                      <td className="p-2.5 font-mono font-bold">&gt; 22.5</td>
                      <td className="p-2.5 text-slate-600">Juda yuqori xavf (tezlik yuqori, trotuar/o‘tish joyi yo‘q)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={() => setShowFormulaModal(false)}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-5 py-2 rounded-xl"
              >
                Tushunarli, yopish
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
