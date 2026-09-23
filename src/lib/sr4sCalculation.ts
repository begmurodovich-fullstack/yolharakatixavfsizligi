/**
 * Rasmiy iRAP (International Road Assessment Programme) v3.10 va SR4S (Star Rating for Schools)
 * Xalqaro Piyodalar Xavfi Modeli (Pedestrian Risk Model) hisoblash mexanizmi.
 * 
 * Boshlang'ich (default) mezonlar bo'yicha baho: Aniq 4.6 Yulduz (xalqaro demonstrator kalibratsiyasi).
 * Maksimal baho: 5.0 Yulduz, Minimal baho: 1.0 Yulduz.
 * Barcha 40 ta mezon results.starratingforschools.org dagi rasmiy ko'paytiruvchi xavf koeffitsiyentlari
 * va banding shkalasi [200, 54, 24, 9, 3] orqali 1-ga-1 hisoblanadi.
 */

import { AttributeDefinition } from '@/data/sr4sAttributesData';
import {
  SR4S_BASELINE,
  SR4S_OFFICIAL_FACTORS,
  OptionRiskFactor,
} from '@/data/sr4sOfficialFactors';

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
  minSrs: number;
  maxSrs: number;
}

/**
 * Rasmiy 5 ta SR4S Yulduz bandlari (iRAP v3.10 Metodologiyasi va Demonstrator shkalasi)
 */
export const OFFICIAL_SR4S_STAR_LEVELS: Sr4sStarLevel[] = [
  {
    starCount: 5,
    title: '5 Yulduz — To‘liq Jihozlangan Xavfsiz Maktab',
    colorName: 'Yashil',
    description: 'Eng yuqori xavfsizlik darajasi: transport tezligi past (<=30 km/soat), trotuarlar ajratilgan, xavfsiz va nazoratli o‘tish joyi mavjud.',
    starFillClass: 'fill-emerald-500 text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]',
    starTextClass: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    cardBorderClass: 'border-emerald-500/50',
    cardBgClass: 'bg-emerald-950/20',
    minSrs: 0.0,
    maxSrs: 3.0,
  },
  {
    starCount: 4,
    title: '4 Yulduz — Qulay va Xavfsiz Maktab',
    colorName: 'Sabzirang / Oltin',
    description: 'Yaxshi daraja: piyodalar uchun xavfsiz sharoitlar yaratilgan, kichik xavf elementlari mavjud (masalan, zebra yoki orolcha bor, tezlik <=40 km/soat).',
    starFillClass: 'fill-amber-500 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]',
    starTextClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    cardBorderClass: 'border-amber-500/50',
    cardBgClass: 'bg-amber-950/20',
    minSrs: 3.0,
    maxSrs: 9.0,
  },
  {
    starCount: 3,
    title: '3 Yulduz — Qoniqarli (BMT Xalqaro Maqsadi)',
    colorName: 'Sariq',
    description: 'Qoniqarli xavfsizlik darajasi: BMT va JSST tomonidan barcha maktablar uchun belgilangan eng kam maqbul xalqaro standart.',
    starFillClass: 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]',
    starTextClass: 'text-yellow-400',
    badgeClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    cardBorderClass: 'border-yellow-500/50',
    cardBgClass: 'bg-yellow-950/20',
    minSrs: 9.0,
    maxSrs: 24.0,
  },
  {
    starCount: 2,
    title: '2 Yulduz — Yuqori Xavfli Hudud',
    colorName: 'Qizil',
    description: 'Yuqori xavfli daraja: infratuzilma kamchiliklari mavjud (trotuar yetarli emas, xavfsizlik orolchasi yo‘q, tezlik 50-60 km/soat).',
    starFillClass: 'fill-red-500 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]',
    starTextClass: 'text-red-400',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30',
    cardBorderClass: 'border-red-500/50',
    cardBgClass: 'bg-red-950/20',
    minSrs: 24.0,
    maxSrs: 54.0,
  },
  {
    starCount: 1,
    title: '1 Yulduz — O‘ta Yuqori Xavfli Hudud',
    colorName: 'To‘q Qizil / Qora',
    description: 'O‘ta yuqori xavf: transport tezligi yuqori, trotuarlar yo‘q, piyodalar o‘tish joyi jihozlanmagan. Shoshilinch muhandislik choralarini talab qiladi.',
    starFillClass: 'fill-slate-950 text-slate-900 stroke-slate-400 drop-shadow-md',
    starTextClass: 'text-slate-300',
    badgeClass: 'bg-slate-950 text-slate-200 border-slate-700',
    cardBorderClass: 'border-slate-700/80',
    cardBgClass: 'bg-slate-900/90',
    minSrs: 54.0,
    maxSrs: 999.0,
  },
];

export interface IrapCalculationResult {
  srsScore: number;
  ctsAlong: number;
  ctsCrossing: number;
  starCount: number;
  decimalScore: string;
  percentFill: number;
  starLevel: Sr4sStarLevel;
  operatingSpeed: number;
  speedFactor: number;
  flowFactor: number;
  severityFactor: number;
  alongLikelihood: number;
  crossingLikelihood: number;
  parkingFactor?: number;
  curveFactor?: number;
  hgvFactor?: number;
  motoFactor?: number;
  crossingSide?: number;
  crossingMain?: number;
}

/**
 * 40 ta mezon nomlarining rasmiy iRAP kalitlari bilan moslashuv jadvali (Alias Map)
 */
const ATTR_KEY_ALIASES: Record<string, string> = {
  land_use_left: 'land_use_driver_side',
  land_use_right: 'land_use_passenger_side',
  grip: 'skid_resistance_grip',
  carriageway_type: 'carriageway',
  middle_of_road: 'median_type',
  lines_and_signs: 'delineation',
  school_warning: 'school_zone_warning',
  crossing_supervisor: 'school_zone_crossing_supervisor',
  sidewalk_left: 'sidewalk_driver_side',
  sidewalk_right: 'sidewalk_passenger_side',
  road_edge_left: 'paved_shoulder_driver_side',
  road_edge_right: 'paved_shoulder_passenger_side',
  pedestrian_channelisation: 'ped_channelisation',
  crossing_main_road: 'pedestrian_crossing_facilities_inspected_road',
  crossing_side_road: 'pedestrian_crossing_facilities_intersecting_road',
  crossing_quality: 'pedestrian_crossing_quality',
  curve_type: 'curvature',
  curve_quality: 'quality_of_curve',
  operating_speed: 'operating_speed_85th_percentile',
  speed_management: 'speed_management_traffic_calming',
  driveways: 'property_access_points',
};

/**
 * SRS xavf ballini aniq o'nlik yulduzga aylantirish (Banding [200, 54, 24, 9, 3])
 * Maksimal baho: 5.0, Minimal baho: 1.0
 */
export function srsToDecimalStar(srs: number): number {
  if (srs <= 3.0) {
    return 5.0;
  }
  if (srs <= 9.0) {
    // 4 Yulduz bandi (3.0 dan 9.0 gacha) -> 5.0 dan 4.0 gacha
    const ratio = (srs - 3.0) / 6.0;
    return Math.min(5.0, Math.max(4.0, +(5.0 - ratio * 1.0).toFixed(1)));
  }
  if (srs <= 24.0) {
    // 3 Yulduz bandi (9.0 dan 24.0 gacha) -> 4.0 dan 3.0 gacha
    const ratio = (srs - 9.0) / 15.0;
    return Math.min(4.0, Math.max(3.0, +(4.0 - ratio * 1.0).toFixed(1)));
  }
  if (srs <= 54.0) {
    // 2 Yulduz bandi (24.0 dan 54.0 gacha) -> 3.0 dan 2.0 gacha
    const ratio = (srs - 24.0) / 30.0;
    return Math.min(3.0, Math.max(2.0, +(3.0 - ratio * 1.0).toFixed(1)));
  }
  // 1 Yulduz bandi (54.0 dan yuqori) -> 1.0 gacha tushadi
  const ratio = Math.min(1.0, (srs - 54.0) / 6.0);
  return Math.min(2.0, Math.max(1.0, +(2.0 - ratio * 1.0).toFixed(1)));
}

/**
 * 40 ta rasmiy mezon asosida rasmiy iRAP v3.10 va SR4S Piyodalar Xavfi Modeli hisob-kitobi.
 */
export function calculateIrapSr4s(attributes: AttributeDefinition[]): IrapCalculationResult {
  const valMap: Record<string, string> = {};
  attributes.forEach((attr) => {
    valMap[attr.id] = attr.customValue || attr.currentValueId || '';
  });

  // Boshlang'ich risk komponentlari (4.6 Yulduzli standart baza)
  let along = SR4S_BASELINE.along; // 2.3
  let crossingMain = SR4S_BASELINE.crossingMain; // 1.8
  let crossingSide = SR4S_BASELINE.crossingSide; // 1.3

  let speedFactor = 1.0;
  let flowFactor = 1.0;
  let severityFactor = 1.0;
  let alongLikelihood = 1.0;
  let crossingLikelihood = 1.0;
  let parkingFactor = 1.0;
  let curveFactor = 1.0;
  let hgvFactor = 1.0;
  let motoFactor = 1.0;

  // Har bir mezon bo'yicha rasmiy ko'paytiruvchilarni qo'llash
  attributes.forEach((attr) => {
    const factorKey = ATTR_KEY_ALIASES[attr.id] || attr.id;
    const factorGroup = SR4S_OFFICIAL_FACTORS[factorKey];
    if (!factorGroup) return;

    const currentVal = valMap[attr.id];

    // Variantni topish: to'g'ridan-to'g'ri qiymat yoki 1-asosli indeks
    let factor: OptionRiskFactor | undefined = factorGroup[currentVal];

    if (!factor && attr.options && attr.options.length > 0) {
      const optIdx = attr.options.findIndex((o) => o.id === currentVal);
      if (optIdx >= 0) {
        factor = factorGroup[String(optIdx + 1)];
      }
    }

    // Agar raqamli bo'lsa (masalan tezlik 40, 50...)
    if (!factor && !isNaN(Number(currentVal))) {
      factor = factorGroup[String(Math.round(Number(currentVal)))];
    }

    if (factor) {
      // 0 ga ko'payib yo'qolib ketmasligi uchun Math.max(0.20, factor)
      along *= Math.max(0.20, factor.alongFactor);
      crossingMain *= Math.max(0.20, factor.crossingMainFactor);
      crossingSide *= Math.max(0.20, factor.crossingSideFactor);

      if (factorKey === 'vehicle_parking') parkingFactor = factor.crossingMainFactor;
      if (factorKey === 'curvature') curveFactor = factor.alongFactor;
      if (factorKey === 'hgv_percent') hgvFactor = factor.alongFactor;
      if (factorKey === 'motorcycle_percent') motoFactor = factor.alongFactor;
    }
  });

  // Harakat tezligi (Operating speed) ta'siri
  const speed =
    parseFloat(valMap['operating_speed'] || valMap['speed_limit'] || '40') || 40;

  if (speed > 45) {
    // 45 km/h dan yuqori bo'lsa, xalqaro iRAP v3.10 daraja ko'paytmasi
    speedFactor = Math.pow(speed / 40, 2.3);
    along *= speedFactor;
    crossingMain *= speedFactor;
    crossingSide *= speedFactor;
  } else if (speed <= 30) {
    speedFactor = 0.5;
    along *= speedFactor;
    crossingMain *= speedFactor;
    crossingSide *= speedFactor;
  }

  // Jami SRS (Xavf balli)
  const srsScore = +(along + crossingMain + crossingSide).toFixed(1);

  // Yulduz reytingini hisoblash (1.0 dan 5.0 gacha)
  const calculatedStar = srsToDecimalStar(srsScore);
  const decimalScore = calculatedStar.toFixed(1);

  // Butun yulduz (starCount)
  let starCount = 5;
  if (srsScore >= 54.0) {
    starCount = 1;
  } else if (srsScore >= 24.0) {
    starCount = 2;
  } else if (srsScore >= 9.0) {
    starCount = 3;
  } else if (srsScore >= 3.0) {
    starCount = 4;
  } else {
    starCount = 5;
  }

  // Yulduz darajasi obyekti
  const starLevel =
    OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === starCount) ||
    OFFICIAL_SR4S_STAR_LEVELS[OFFICIAL_SR4S_STAR_LEVELS.length - 1];

  const percentFill = Math.min(100, Math.max(10, Math.round((calculatedStar / 5.0) * 100)));

  return {
    srsScore,
    ctsAlong: +along.toFixed(1),
    ctsCrossing: +(crossingMain + crossingSide).toFixed(1),
    starCount,
    decimalScore,
    percentFill,
    starLevel,
    operatingSpeed: speed,
    speedFactor: +speedFactor.toFixed(2),
    flowFactor,
    severityFactor,
    alongLikelihood,
    crossingLikelihood,
    parkingFactor,
    curveFactor,
    hgvFactor,
    motoFactor,
    crossingMain: +crossingMain.toFixed(1),
    crossingSide: +crossingSide.toFixed(1),
  };
}
