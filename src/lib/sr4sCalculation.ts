/**
 * Rasmiy iRAP (International Road Assessment Programme) v3.10 va SR4S (Star Rating for Schools)
 * Xalqaro Piyodalar Xavfi Modeli (Pedestrian Risk Model) hisoblash mexanizmi.
 * 
 * Boshlang'ich (Baseline) mezonlar bo'yicha baho:
 *   - along: 1.7
 *   - crossingMain: 1.9
 *   - crossingSide: 1.4
 *   - srsScore: 5.1
 *   - decimalStarRating: 4.6 ★
 *   - banding: [200, 54, 24, 9, 3]
 * 
 * Manba: results.starratingforschools.org/model/V31a
 */

import { AttributeDefinition } from '@/data/sr4sAttributesData';
import {
  SR4S_DIRECT_OPTION_FACTORS,
  DetailedOptionFactor,
} from '@/data/sr4sDirectOptionFactors';
import { SR4S_OFFICIAL_BASELINE } from '@/data/sr4sOfficialBaseline';

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
 * SRS xavf ballini aniq o'nlik yulduzga aylantirish (Rasmiy Banding [200, 54, 24, 9, 3])
 * Maksimal baho: 5.0, Minimal baho: 1.0
 */
export function srsToDecimalStar(srs: number): number {
  if (srs <= 3.0) {
    return 5.0;
  }
  if (srs <= 9.0) {
    // 4 Yulduz bandi (3.0 dan 9.0 gacha) -> 4.9 dan 4.0 gacha
    const ratio = (srs - 3.0) / (9.0 - 3.0);
    const score = 4.9 - ratio * 0.9;
    return Math.min(4.9, Math.max(4.0, +score.toFixed(1)));
  }
  if (srs <= 24.0) {
    // 3 Yulduz bandi (9.0 dan 24.0 gacha) -> 3.9 dan 3.0 gacha
    const ratio = (srs - 9.0) / (24.0 - 9.0);
    const score = 3.9 - ratio * 0.9;
    return Math.min(3.9, Math.max(3.0, +score.toFixed(1)));
  }
  if (srs <= 54.0) {
    // 2 Yulduz bandi (24.0 dan 54.0 gacha) -> 2.9 dan 2.0 gacha
    const ratio = (srs - 24.0) / (54.0 - 24.0);
    const score = 2.9 - ratio * 0.9;
    return Math.min(2.9, Math.max(2.0, +score.toFixed(1)));
  }
  // 1 Yulduz bandi (54.0 dan 200.0 gacha) -> 1.9 dan 1.0 gacha
  const ratio = Math.min(1.0, Math.max(0.0, (srs - 54.0) / (200.0 - 54.0)));
  const score = 1.9 - ratio * 0.9;
  return Math.min(1.9, Math.max(1.0, +score.toFixed(1)));
}

/**
 * 40 ta rasmiy mezon asosida rasmiy iRAP v3.10 va SR4S Piyodalar Xavfi Modeli hisob-kitobi.
 */
export function calculateIrapSr4s(attributes: AttributeDefinition[]): IrapCalculationResult {
  const valMap: Record<string, string> = {};
  attributes.forEach((attr) => {
    valMap[attr.id] = attr.customValue || attr.currentValueId || '';
  });

  // Rasmiy Baseline: along = 1.7, crossingMain = 1.9, crossingSide = 1.4 (SRS = 5.1, Star = 4.6 ★)
  let along = SR4S_OFFICIAL_BASELINE.along;
  let crossingMain = SR4S_OFFICIAL_BASELINE.crossingMain;
  let crossingSide = SR4S_OFFICIAL_BASELINE.crossingSide;

  let speedFactor = 1.0;
  let flowFactor = 1.0;
  let severityFactor = 1.0;
  let alongLikelihood = 1.0;
  let crossingLikelihood = 1.0;
  let parkingFactor = 1.0;
  let curveFactor = 1.0;
  let hgvFactor = 1.0;
  let motoFactor = 1.0;

  // Trotuarlar (Chap va O'ng) ta'siri: ikkala tomonning o'rtachasi olinadi
  const swLeftFactor = SR4S_DIRECT_OPTION_FACTORS['sidewalk_left']?.[valMap['sidewalk_left']]?.alongFactor ?? 1.0;
  const swRightFactor = SR4S_DIRECT_OPTION_FACTORS['sidewalk_right']?.[valMap['sidewalk_right']]?.alongFactor ?? 1.0;
  const combinedSidewalkFactor = (swLeftFactor + swRightFactor) / 2;
  along *= combinedSidewalkFactor;

  // Yo'l yelkasi (Chap va O'ng)
  const edgeLeftFactor = SR4S_DIRECT_OPTION_FACTORS['road_edge_left']?.[valMap['road_edge_left']]?.alongFactor ?? 1.0;
  const edgeRightFactor = SR4S_DIRECT_OPTION_FACTORS['road_edge_right']?.[valMap['road_edge_right']]?.alongFactor ?? 1.0;
  const combinedEdgeFactor = (edgeLeftFactor + edgeRightFactor) / 2;
  along *= combinedEdgeFactor;

  // Qolgan barcha mezonlar bo'yicha to'g'ridan-to'g'ri multiplikatorlarni qo'llash
  attributes.forEach((attr) => {
    // Trotuar, yelka, tezlik va oqimlar alohida ko'rib chiqilgan
    if (
      attr.id === 'sidewalk_left' ||
      attr.id === 'sidewalk_right' ||
      attr.id === 'road_edge_left' ||
      attr.id === 'road_edge_right' ||
      attr.id === 'operating_speed' ||
      attr.id === 'speed_limit' ||
      attr.id === 'vehicles_per_day'
    ) {
      return;
    }

    const directGroup = SR4S_DIRECT_OPTION_FACTORS[attr.id];
    if (!directGroup) return;

    const currentVal = valMap[attr.id];
    const factor: DetailedOptionFactor | undefined = directGroup[currentVal];

    if (factor) {
      along *= Math.max(0.05, factor.alongFactor);
      crossingMain *= Math.max(0.05, factor.crossingMainFactor);
      crossingSide *= Math.max(0.05, factor.crossingSideFactor);

      if (attr.id === 'vehicle_parking') parkingFactor = factor.crossingMainFactor;
      if (attr.id === 'curve_type') curveFactor = factor.alongFactor;
      if (attr.id === 'hgv_percent') hgvFactor = factor.alongFactor;
      if (attr.id === 'motorcycle_percent') motoFactor = factor.alongFactor;
    }
  });

  // Harakat tezligi (Operating Speed) ta'siri
  const speed = parseFloat(valMap['operating_speed'] || valMap['speed_limit'] || '40') || 40;

  if (speed <= 30) {
    speedFactor = 0.6;
    along *= 0.6;
    crossingMain *= 0.6;
    crossingSide *= 0.6;
  } else if (speed <= 40) {
    speedFactor = 1.0;
    // 40 km/soatda faktor = 1.0
  } else if (speed <= 45) {
    speedFactor = 1.25;
    along *= 1.25;
    crossingMain *= 1.25;
    crossingSide *= 1.25;
  } else if (speed <= 50) {
    speedFactor = 1.60;
    along *= 1.60;
    crossingMain *= 1.60;
    crossingSide *= 1.60;
  } else if (speed <= 60) {
    speedFactor = 2.50;
    along *= 2.50;
    crossingMain *= 2.80;
    crossingSide *= 2.50;
  } else if (speed <= 70) {
    speedFactor = 3.80;
    along *= 3.80;
    crossingMain *= 4.50;
    crossingSide *= 3.80;
  } else {
    // 80+ km/h
    speedFactor = 5.20;
    along *= 5.20;
    crossingMain *= 6.20;
    crossingSide *= 5.20;
  }

  // Jami SRS (Xavf balli)
  const srsScore = +(along + crossingMain + crossingSide).toFixed(1);

  // Yulduz reytingini hisoblash (1.0 dan 5.0 gacha)
  const calculatedStar = srsToDecimalStar(srsScore);
  const decimalScore = calculatedStar.toFixed(1);

  // Butun yulduz (starCount): Raqam bilan 100% mutanosib
  const starCount = Math.min(5, Math.max(1, Math.floor(calculatedStar)));

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
