'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { School } from '@/types';
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
  ShieldAlert,
  Lock,
  Unlock,
  AlertCircle,
  Info,
} from 'lucide-react';

export type { AttributeDefinition, AttributeOption };
export { OFFICIAL_SR4S_STAR_LEVELS, OFFICIAL_SR4S_STAR_LEVELS as SR4S_STAR_LEVELS };
export type { Sr4sStarLevel };

export interface Sr4sDemonstratorProps {
  school?: School | null;
  onSaveSuccess?: (updatedScore: number, starScore: number) => void;
}

export function Sr4sDemonstrator({ school, onSaveSuccess }: Sr4sDemonstratorProps = {}) {
  const { user } = useAuth();
  const { success, error, info } = useToast();

  const [attributes, setAttributes] = useState<AttributeDefinition[]>(OFFICIAL_40_ATTRIBUTES_DATA);
  const [activeModalAttr, setActiveModalAttr] = useState<AttributeDefinition | null>(null);
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [sliderVal, setSliderVal] = useState<number>(40);
  const [isSaving, setIsSaving] = useState(false);

  // Assessment locking & Retake state
  const [existingAssessment, setExistingAssessment] = useState<any>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isRetakeAllowed, setIsRetakeAllowed] = useState<boolean>(false);
  const [reassessReason, setReassessReason] = useState<string | null>(null);
  const [confirmedAttrIds, setConfirmedAttrIds] = useState<Set<string>>(new Set());

  // Preload previously saved assessment for this school if exists
  useEffect(() => {
    const targetSchoolId = school?.id || user?.schoolId;
    if (!targetSchoolId) return;

    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/assessments?schoolId=${targetSchoolId}`);
        if (!res.ok) return;
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0 && isMounted) {
          const latest = list[0];
          setExistingAssessment(latest);

          const retakeAllowed =
            latest.status === 'RETAKE_ALLOWED' ||
            Boolean(latest.canReassess) ||
            Boolean(school?.canReassess);
          setIsRetakeAllowed(retakeAllowed);
          setReassessReason(latest.reassessReason || school?.reassessReason || null);

          const isSubmittedOrVerified =
            latest.status === 'SUBMITTED' || latest.status === 'VERIFIED';
          setIsLocked(isSubmittedOrVerified && !retakeAllowed);

          if (retakeAllowed) {
            // Qayta baholash ruxsati bo'lsa, mezonlar boshlang'ich 4.6 holatga qaytadi va hech biri oldindan tasdiqlanmagan (0/40) bo'ladi
            setConfirmedAttrIds(new Set());
            setAttributes(OFFICIAL_40_ATTRIBUTES_DATA);
          } else if (latest.answers && typeof latest.answers === 'object') {
            const answeredKeys = Object.keys(latest.answers);
            setConfirmedAttrIds(new Set(answeredKeys));
            setAttributes((prev) =>
              prev.map((attr) => {
                const savedAns = latest.answers[attr.id];
                if (savedAns) {
                  return {
                    ...attr,
                    currentValueId: savedAns.selectedOptionId || savedAns.value || attr.currentValueId,
                    customValue: savedAns.value || attr.customValue,
                  };
                }
                return attr;
              })
            );
          }
        }
      } catch (err) {
        console.error('Failed to preload saved school assessment:', err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [school?.id, school?.canReassess, school?.reassessReason, user?.schoolId]);

  const handleConfirmAll = () => {
    if (isLocked) return;
    setConfirmedAttrIds(new Set(attributes.map((a) => a.id)));
    success('Barcha 40 ta mezon tasdiqlangan deb belgilandi!', 'Tasdiqlandi');
  };

  const handleJumpToMissing = () => {
    const missing = attributes.find((a) => !confirmedAttrIds.has(a.id));
    if (missing) {
      const el = document.getElementById(`attr-card-${missing.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      handleOpenModal(missing);
    }
  };

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
    if (isLocked) return;
    setSliderVal(val);
    setConfirmedAttrIds((prev) => new Set(prev).add(attrId));
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
    if (isLocked) {
      info('Baholash topshirilgan. O‘zgartirish uchun admin ruxsati zarur.', 'Qulflangan');
      return;
    }
    setAttributes((prev) =>
      prev.map((attr) => (attr.id === attrId ? { ...attr, currentValueId: optionId } : attr))
    );
    setConfirmedAttrIds((prev) => new Set(prev).add(attrId));
    setActiveModalAttr(null);
  };

  const handleSaveCustomInput = (attrId: string, value: string) => {
    if (isLocked) {
      info('Baholash topshirilgan. O‘zgartirish uchun admin ruxsati zarur.', 'Qulflangan');
      return;
    }
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.id === attrId
          ? { ...attr, currentValueId: value, customValue: value }
          : attr
      )
    );
    setConfirmedAttrIds((prev) => new Set(prev).add(attrId));
    setActiveModalAttr(null);
  };

  const handleReset = () => {
    if (isLocked) {
      info('Baholash topshirilgan. Qayta baholash uchun administrator ruxsati zarur.', 'Qulflangan');
      return;
    }
    setAttributes(OFFICIAL_40_ATTRIBUTES_DATA);
    setConfirmedAttrIds(new Set());
    success('Barcha 40 mezon boshlang‘ich holatga qaytarildi (Standart 4.6 Yulduz)');
  };

  const handlePreset = (level: 'safe' | 'medium' | 'danger') => {
    if (isLocked) {
      info('Baholash topshirilgan. O‘zgartirish uchun admin ruxsati zarur.', 'Qulflangan');
      return;
    }
    setConfirmedAttrIds(new Set(OFFICIAL_40_ATTRIBUTES_DATA.map((a) => a.id)));
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
          if (attr.id === 'vehicle_parking') {
            return { ...attr, currentValueId: 'none' };
          }
          if (attr.id === 'curve_type') {
            return { ...attr, currentValueId: 'straight' };
          }
          if (attr.id === 'curve_quality') {
            return { ...attr, currentValueId: 'not_curve' };
          }
          if (attr.id === 'hgv_percent') {
            return { ...attr, currentValueId: '0_5' };
          }
          if (attr.id === 'motorcycle_percent') {
            return { ...attr, currentValueId: '0' };
          }
          return attr;
        })
      );
      info('5 Yulduzli namunali xavfsiz sharoit yuklandi (Tezlik 30 km/h, patrul, orolchali zebra)');
    } else if (level === 'danger') {
      // 1-2 Yulduzli xavfli holat (Tezlik 70 km/h, trotuar yo'q, zebra yo'q, yuqori oqim, og'ir yuk va ikki tomonlama parkovka)
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
          if (attr.id === 'vehicle_parking') {
            return { ...attr, currentValueId: 'two_side' };
          }
          if (attr.id === 'curve_type') {
            return { ...attr, currentValueId: 'sharp' };
          }
          if (attr.id === 'curve_quality') {
            return { ...attr, currentValueId: 'poor' };
          }
          if (attr.id === 'hgv_percent') {
            return { ...attr, currentValueId: '20_30' };
          }
          if (attr.id === 'motorcycle_percent') {
            return { ...attr, currentValueId: '21_40' };
          }
          return attr;
        })
      );
      info('1-2 Yulduzli xavfli yo‘l sharoiti yuklandi (Tezlik yuqori, yuk mashinalari, xavfli burilish va parkovka)');
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
          if (attr.id === 'vehicle_parking') {
            return { ...attr, currentValueId: 'one_side' };
          }
          if (attr.id === 'curve_type') {
            return { ...attr, currentValueId: 'moderate' };
          }
          if (attr.id === 'curve_quality') {
            return { ...attr, currentValueId: 'adequate' };
          }
          if (attr.id === 'hgv_percent') {
            return { ...attr, currentValueId: '5_10' };
          }
          if (attr.id === 'motorcycle_percent') {
            return { ...attr, currentValueId: '6_10' };
          }
          return attr;
        })
      );
      info('3 Yulduzli o‘rtacha yo‘l sharoiti yuklandi (BMT talabi: 50 km/h, o‘tish joyi bor)');
    }
  };

  const handleSaveAssessment = async () => {
    if (isLocked) {
      error(
        'Baholash allaqachon topshirilgan va qulflangan. Qayta baholash uchun administrator ruxsati zarur.',
        'Qulflangan'
      );
      return;
    }

    if (confirmedAttrIds.size < 40) {
      const remaining = 40 - confirmedAttrIds.size;
      error(
        `Baholashni saqlash uchun barcha 40 ta mezonni ko‘rib chiqish va belgilash shart! Hozirda yana ${remaining} ta mezon belgilanmagan.`,
        '40 ta mezon to‘liq emas'
      );
      handleJumpToMissing();
      return;
    }

    setIsSaving(true);
    try {
      const targetSchoolId = school?.id || user?.schoolId || 'sch-3837';
      const starNum = parseFloat(decimalScore) || 4.6;
      const score100 = Math.round(Math.max(10, Math.min(100, starNum * 20)));

      // 40 ta mezon javoblarini shakllantirish
      const answersPayload: Record<string, any> = {};
      attributes.forEach((attr) => {
        const currentOption =
          attr.options.find((o) => o.id === attr.currentValueId) || attr.options[0];
        answersPayload[attr.id] = {
          questionId: attr.id,
          code: attr.code,
          nameUz: attr.nameUz,
          nameEn: attr.nameEn,
          selectedOptionId: attr.currentValueId,
          optionLabel: currentOption?.labelUz || attr.customValue || attr.currentValueId,
          pointsAwarded: currentOption?.scoreWeight || 4,
          value: attr.customValue || attr.currentValueId,
        };
      });

      const criterionScoresPayload = {
        srsScore,
        starRating: decimalScore,
        ctsAlong,
        ctsCrossing,
        operatingSpeed: irapResult.operatingSpeed,
        speedFactor: irapResult.speedFactor,
        flowFactor: irapResult.flowFactor,
        severityFactor: irapResult.severityFactor,
        alongLikelihood: irapResult.alongLikelihood,
        crossingLikelihood: irapResult.crossingLikelihood,
      };

      // 1. Saqlash: /api/assessments ga yuborish
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolId: targetSchoolId,
          periodId: 'period-2026-q1',
          status: 'SUBMITTED',
          score: score100,
          maxScore: 100,
          percentage: score100,
          answers: answersPayload,
          criterionScores: criterionScoresPayload,
          reviewerNotes: `SR4S 40 mezonli baholash: ${decimalScore} Yulduz (SRS: ${srsScore})`,
          submittedBy: user?.id || null,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Baholashni saqlashda xatolik yuz berdi');
      }

      // 2. Maktab joriy ballini to'g'ridan-to'g'ri yangilash
      await fetch(`/api/schools/${targetSchoolId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentScore: score100 }),
      }).catch((e) => console.warn('School current score sync warning:', e));

      // 3. Shaklni qulflash va retake huquqini yopish
      setIsLocked(true);
      setIsRetakeAllowed(false);

      // 4. Tizim bo'ylab hodisani tarqatish (header va boshqa komponentlar yangilanishi uchun)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('school-score-updated', {
            detail: { score: score100, starScore: starNum, schoolId: targetSchoolId },
          })
        );
      }

      if (onSaveSuccess) {
        onSaveSuccess(score100, starNum);
      }

      success(
        `Baholash muvaffaqiyatli saqlandi va IIV YHXX tasdiqlashiga yuborildi! Yulduzli reyting: ${decimalScore} (SRS: ${srsScore})`,
        'Muvaffaqiyatli'
      );
    } catch (err: any) {
      console.error('Save assessment error:', err);
      error(err?.message || 'Saqlashda xatolik yuz berdi', 'Xatolik');
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

      {/* Locked Status Alert Banner */}
      {isLocked && (
        <div className="mx-6 mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-start gap-3.5 text-amber-900 animate-in fade-in duration-200">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm">
            <div className="font-bold flex items-center gap-2">
              <span>Baholash topshirilgan va qulflangan (Faqat ko‘rish rejimi)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 uppercase tracking-wide">
                Bir martalik baholash
              </span>
            </div>
            <p className="mt-1 text-xs text-amber-800 leading-relaxed">
              Ushbu maktab uchun 40 ta mezonli baholash topshirilgan. Nizomga muvofiq, ma’lumotlarni o‘zgartirish yoki qayta baholash uchun IIV YHXX yoki tuman mas’uli tomonidan admin paneldan <strong>«Qayta baholashga ruxsat berish»</strong> huquqi berilishi kerak.
            </p>
          </div>
        </div>
      )}

      {/* Retake Allowed Alert Banner */}
      {isRetakeAllowed && (
        <div className="mx-6 mt-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start gap-3.5 text-indigo-950 animate-in fade-in duration-200">
          <div className="p-2 bg-indigo-100 rounded-xl text-indigo-700 shrink-0">
            <Unlock className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm">
            <div className="font-bold flex items-center gap-2">
              <span>Administrator tomonidan qayta baholashga ruxsat berilgan</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-200 text-indigo-900 uppercase tracking-wide">
                Qayta baholash faol
              </span>
            </div>
            {reassessReason && (
              <p className="mt-1 text-xs text-indigo-800">
                <strong>Ruxsat sababi:</strong> {reassessReason}
              </p>
            )}
            <p className="mt-1 text-[11px] text-indigo-700">
              40 ta mezonni to‘liq ko‘rib chiqib yangilangan bahoni saqlashingiz mumkin. Saqlangandan so‘ng forma avtomatik tarzda qayta qulflanadi.
            </p>
          </div>
        </div>
      )}

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
                className="object-contain max-h-full max-w-full drop-shadow-sm"
                priority
              />
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-700">Maktabga Xavfsiz Qadam</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              O‘zbekiston Respublikasi IIV YHXX & BMT Standarti
            </span>
          </div>

          {/* Big Star Badge */}
          <div
            className={cn(
              'w-full py-4 px-3 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 shadow-xs',
              starLevel.cardBgClass,
              starLevel.cardBorderClass
            )}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={cn(
                    'w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300',
                    s <= starCount
                      ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                      : 'text-slate-300 fill-slate-100'
                  )}
                />
              ))}
            </div>

            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={cn('text-3xl sm:text-4xl font-black tracking-tight', starLevel.starTextClass)}>
                {decimalScore}
              </span>
              <span className="text-xs font-bold text-slate-500">/ 5.0</span>
            </div>

            <div className="mt-1 text-center">
              <span className={cn('text-xs sm:text-sm font-black', starLevel.starTextClass)}>
                {starLevel.title}
              </span>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {starLevel.description}
              </p>
            </div>
          </div>

          {/* iRAP Risk Model Metrics (SRS & CTS) */}
          <div className="w-full bg-white rounded-xl border border-slate-200 p-3 space-y-2.5 text-left text-xs shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                <span>iRAP Xavf Ko‘rsatkichlari</span>
              </div>
              <span className="text-[10px] font-mono bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-semibold">
                SRS: {srsScore}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-500 flex items-center gap-1">
                  <ArrowRightLeft className="w-3 h-3 text-slate-400" />
                  <span>Bo‘ylama (Along)</span>
                </div>
                <div className="font-bold text-slate-800 mt-0.5 font-mono text-xs">
                  CTS: {ctsAlong}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-slate-500 flex items-center gap-1">
                  <ArrowRightLeft className="w-3 h-3 text-slate-400 rotate-90" />
                  <span>Kesib o‘tish (Crossing)</span>
                </div>
                <div className="font-bold text-slate-800 mt-0.5 font-mono text-xs">
                  CTS: {ctsCrossing}
                </div>
              </div>
            </div>

            {/* Scale visual guide */}
            <div className="pt-1">
              <div className="flex justify-between text-[9px] text-slate-400 mb-1 font-mono">
                <span>0 (5★)</span>
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
          {(user || school) && (
            <div className="w-full space-y-2">
              <Button
                onClick={handleSaveAssessment}
                disabled={isSaving || isLocked}
                className={cn(
                  'w-full font-bold text-xs py-2.5 rounded-xl shadow-md transition-all duration-150',
                  isLocked
                    ? 'bg-slate-300 hover:bg-slate-300 text-slate-600 cursor-not-allowed border border-slate-300'
                    : confirmedAttrIds.size < 40
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                )}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saqlanmoqda...
                  </>
                ) : isLocked ? (
                  <>
                    <Lock className="w-4 h-4 mr-2 text-slate-500" />
                    Baholash topshirilgan (Qulflangan)
                  </>
                ) : confirmedAttrIds.size < 40 ? (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2 text-amber-200" />
                    Saqlash ({confirmedAttrIds.size}/40 belgilangan)
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Maktab bahosini saqlash (40/40)
                  </>
                )}
              </Button>
              {isLocked && (
                <p className="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200 leading-tight text-center">
                  🔒 Baholash topshirilgan. Takroriy baholash uchun administrator ruxsati zarur.
                </p>
              )}
              {!isLocked && confirmedAttrIds.size < 40 && (
                <p className="text-[11px] text-amber-700 text-center leading-tight">
                  ⚠️ Saqlash uchun yana {40 - confirmedAttrIds.size} ta mezonni belgilash shart.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: The 40 Interactive Official SR4S Attributes Grid */}
        <div className="lg:col-span-8">
          {/* 40 Criteria Progress & Completion Tracker */}
          <div className="mb-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0',
                  confirmedAttrIds.size === 40
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                )}
              >
                {confirmedAttrIds.size}/40
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>40 ta Mezon To‘ldirilishi:</span>
                  {confirmedAttrIds.size === 40 ? (
                    <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> To‘liq belgilandi
                    </span>
                  ) : (
                    <span className="text-amber-800 font-semibold">
                      Yana {40 - confirmedAttrIds.size} ta mezon qoldi
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Rasmiy nizomga muvofiq, barcha 40 ta piktogramma ko‘rib chiqilishi va tasdiqlanishi shart.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {confirmedAttrIds.size < 40 && (
                <button
                  type="button"
                  onClick={handleJumpToMissing}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Qolganga o‘tish</span>
                </button>
              )}
              {!isLocked && (
                <button
                  type="button"
                  onClick={handleConfirmAll}
                  title="Barcha 40 mezonni joriy holatda tasdiqlash"
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
                >
                  Barchasini tasdiqlash
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {attributes.map((attr) => {
              const currentOption =
                attr.options.find((o) => o.id === attr.currentValueId) || attr.options[0];

              const isPurpleInput =
                attr.isInput || attr.id === 'vehicles_per_day' || attr.id === 'intersection_side_flow';

              const isConfirmed = confirmedAttrIds.has(attr.id);

              return (
                <button
                  key={attr.id}
                  id={`attr-card-${attr.id}`}
                  onClick={() => handleOpenModal(attr)}
                  type="button"
                  title={attr.nameUz + ' (' + attr.nameEn + ')'}
                  className={cn(
                    'relative flex flex-col items-center justify-between p-2.5 rounded-xl bg-white border shadow-2xs hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 text-center group min-h-[128px] focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 cursor-pointer',
                    isConfirmed ? 'border-slate-200' : 'border-amber-400 bg-amber-50/25 border-dashed',
                    isLocked ? 'opacity-90 hover:border-slate-300' : 'hover:border-teal-500'
                  )}
                >
                  {/* Status Indicator Badge */}
                  <div className="absolute top-1.5 right-1.5 z-10">
                    {isConfirmed ? (
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black shadow-2xs"
                        title="Belgilangan"
                      >
                        ✓
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black shadow-2xs animate-pulse"
                        title="Belgilanmagan!"
                      >
                        !
                      </span>
                    )}
                  </div>
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

            {isLocked && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Faqat ko‘rish rejimi:</strong> Baholash allaqachon topshirilgan va qulflangan. O‘zgartirish kiritish uchun administrator ruxsati zarur.
                </span>
              </div>
            )}

            {/* Mode 1: Numeric Input Mode */}
            {activeModalAttr.isInput ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isLocked) return;
                  handleSaveCustomInput(activeModalAttr.id, inputVal);
                }}
                className="w-full max-w-sm mx-auto mt-2 flex items-center border border-slate-300 rounded-md overflow-hidden bg-white shadow-xs focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500"
              >
                <input
                  type="text"
                  value={inputVal}
                  disabled={isLocked}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 px-4 py-3 text-base sm:text-lg text-slate-800 font-medium outline-hidden disabled:bg-slate-100 disabled:text-slate-500"
                  placeholder="Qiymatni kiriting..."
                  autoFocus={!isLocked}
                />
                {!isLocked && (
                  <button
                    type="submit"
                    className="px-4 py-3 bg-white hover:bg-slate-50 border-l border-slate-200 text-teal-600 transition-colors flex items-center justify-center cursor-pointer"
                    title="Tasdiqlash"
                  >
                    <Check className="w-5 h-5 text-teal-600 stroke-[2.5]" />
                  </button>
                )}
              </form>
            ) : activeModalAttr.isSlider ? (
              /* Mode 2: Slider Mode for Speed */
              <div className="w-full max-w-sm sm:max-w-md mx-auto my-6 flex items-center justify-center gap-4 sm:gap-6">
                <div className="relative flex-1 flex items-center">
                  <input
                    type="range"
                    min={activeModalAttr.min ?? 1}
                    max={activeModalAttr.max ?? 150}
                    step={activeModalAttr.step ?? 1}
                    value={sliderVal}
                    disabled={isLocked}
                    onChange={(e) =>
                      handleSliderChange(activeModalAttr.id, parseInt(e.target.value, 10))
                    }
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#009688] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex items-stretch border border-[#009688] rounded-md overflow-hidden bg-white shadow-2xs">
                  <input
                    type="number"
                    min={activeModalAttr.min ?? 1}
                    max={activeModalAttr.max ?? 150}
                    step={activeModalAttr.step ?? 1}
                    value={sliderVal}
                    disabled={isLocked}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        handleSliderChange(activeModalAttr.id, val);
                      }
                    }}
                    className="w-14 px-2 py-2 text-center font-bold text-slate-800 text-sm sm:text-base outline-hidden disabled:bg-slate-100 disabled:text-slate-500"
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
                      disabled={isLocked}
                      className={cn(
                        'group flex flex-col items-center justify-end p-2 transition-all rounded-lg min-w-[70px] sm:min-w-[80px]',
                        isSelected
                          ? 'border border-[#009688] shadow-2xs bg-teal-50/20'
                          : 'border border-transparent hover:border-slate-300',
                        isLocked ? 'cursor-default' : 'cursor-pointer'
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
                    YTH sodir bo‘lish ehtimoli. Trotuar kengligi va ajratilishi, o‘tish joyi turi, ko‘rish masofasi, shuningdek <strong>Avtomobil to‘xtash joyi (Parkovka — bolalarni to‘sish xavfi +12%–25%)</strong> va <strong>Yo‘l burilishi turi (+10%–35%)</strong> bevosita ta’sir qiladi.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm text-red-600">
                    Severity (Oqibat Og‘irligi)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Hodisa yuz berganda og‘ir jarohat yoki o‘lim xavfi. <strong>Og‘ir yuk mashinalari ulushi (HGV % — halokatlilikni +10%–60% ga oshiradi)</strong>, <strong>Mototsikl va mopedlar ulushi (+2%–25%)</strong>, yo‘l qiyaligi va ajratgich to‘siqlar ta’sir qiladi.
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
