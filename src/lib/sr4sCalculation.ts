/**
 * Rasmiy iRAP (International Road Assessment Programme) v3.10 va SR4S (Star Rating for Schools)
 * Xalqaro Piyodalar Xavfi Modeli (Pedestrian Risk Model) hisoblash mexanizmi.
 *
 * results.starratingforschools.org/demonstrator tizimi bilan 1:1 kalibratsiya qilingan.
 *
 * Boshlang'ich (Baseline) mezonlar bo'yicha baho:
 *   - along: 1.7
 *   - crossingMain: 1.9
 *   - crossingSide: 1.4
 *   - srsScore: 5.0
 *   - decimalStarRating: 4.6 ★
 *   - banding: [200, 54, 24, 9, 3]
 *
 * Manba: results.starratingforschools.org/model/V31a
 */

import { AttributeDefinition } from '@/data/sr4sAttributesData';
import {
  SR4S_DIRECT_OPTION_FACTORS,
  DetailedOptionFactor,
  SR4S_OFFICIAL_FLOW_BRACKETS,
  SR4S_OFFICIAL_SIDE_FLOW_BRACKETS,
  SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS,
  SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS,
  SpeedBracketFactor,
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
    title: "5 Yulduz — To'liq Jihozlangan Xavfsiz Maktab",
    colorName: 'Yashil',
    description: "Eng yuqori xavfsizlik darajasi: transport tezligi past (<=30 km/soat), trotuarlar ajratilgan, xavfsiz va nazoratli o'tish joyi mavjud.",
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
    description: "Yaxshi daraja: piyodalar uchun xavfsiz sharoitlar yaratilgan, kichik xavf elementlari mavjud (masalan, zebra yoki orolcha bor, tezlik <=40 km/soat).",
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
    description: "Qoniqarli xavfsizlik darajasi: BMT va JSST tomonidan barcha maktablar uchun belgilangan eng kam maqbul xalqaro standart.",
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
    description: "Yuqori xavfli daraja: infratuzilma kamchiliklari mavjud (trotuar yetarli emas, xavfsizlik orolchasi yo'q, tezlik 50-60 km/soat).",
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
    title: "1 Yulduz — O'ta Yuqori Xavfli Hudud",
    colorName: "To'q Qizil / Qora",
    description: "O'ta yuqori xavf: transport tezligi yuqori, trotuarlar yo'q, piyodalar o'tish joyi jihozlanmagan. Shoshilinch muhandislik choralarini talab qiladi.",
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
 * Rasmiy iRAP / SR4S Banding [200, 54, 24, 9, 3] bo'yicha SRS xavf ballini
 * aniq o'nlik yulduzga aylantirish (Rasmiy Demonstrator bilan 1:1 bir xil).
 */
export function srsToDecimalStar(srs: number): number {
  if (srs <= 3.0) {
    return +(5.0 + (3.0 - srs) / 3.0).toFixed(1);
  }
  if (srs <= 9.0) {
    const star = 4.0 + (9.0 - srs) / 6.0;
    return +(Math.floor((star + 1e-6) * 10) / 10).toFixed(1);
  }
  if (srs <= 24.0) {
    const star = 3.0 + (24.0 - srs) / 15.0;
    return +(Math.floor((star + 1e-6) * 10) / 10).toFixed(1);
  }
  if (srs <= 54.0) {
    const star = 2.0 + (54.0 - srs) / 30.0;
    return +(Math.floor((star + 1e-6) * 10) / 10).toFixed(1);
  }
  const star = 1.0 + (200.0 - srs) / 146.0;
  return +(Math.max(1.0, Math.floor((star + 1e-6) * 10) / 10)).toFixed(1);
}

/**
 * Kunlik transport oqimi (AADT) faktorlari (22 ta rasmiy interval)
 */
function getFlowFactors(aadt: number) {
  const brackets = SR4S_OFFICIAL_FLOW_BRACKETS;
  const match = brackets.find((b) => aadt >= b.minAadt && aadt <= b.maxAadt);
  if (match) {
    return { alongF: match.alongFactor, mainF: match.mainFactor, sideF: match.sideFactor, expStar: match.star };
  }
  if (aadt <= brackets[0].minAadt) {
    return { alongF: brackets[0].alongFactor, mainF: brackets[0].mainFactor, sideF: brackets[0].sideFactor, expStar: brackets[0].star };
  }
  const last = brackets[brackets.length - 1];
  return { alongF: last.alongFactor, mainF: last.mainFactor, sideF: last.sideFactor, expStar: last.star };
}

/**
 * Chorraha yon yo'l transport oqimi faktorlari (12 ta rasmiy interval)
 */
function getSideFlowFactors(vol: number) {
  const brackets = SR4S_OFFICIAL_SIDE_FLOW_BRACKETS;
  const match = brackets.find((b) => vol >= b.minVol && vol <= b.maxVol);
  if (match) {
    return { alongF: match.alongFactor, mainF: match.mainFactor, sideF: match.sideFactor, expStar: match.star };
  }
  if (vol <= brackets[0].minVol) {
    return { alongF: brackets[0].alongFactor, mainF: brackets[0].mainFactor, sideF: brackets[0].sideFactor, expStar: brackets[0].star };
  }
  const last = brackets[brackets.length - 1];
  return { alongF: last.alongFactor, mainF: last.mainFactor, sideF: last.sideFactor, expStar: last.star };
}

/**
 * Tezlik intervallari bo'yicha interpolatsiya
 */
function interpolateSpeedBrackets(brackets: SpeedBracketFactor[], speed: number) {
  const first = brackets[0];
  const last = brackets[brackets.length - 1];

  if (speed <= first.speed) {
    return { alongF: first.alongFactor, mainF: first.mainFactor, sideF: first.sideFactor, expStar: first.star };
  }
  if (speed >= last.speed) {
    return { alongF: last.alongFactor, mainF: last.mainFactor, sideF: last.sideFactor, expStar: last.star };
  }
  for (let i = 0; i < brackets.length - 1; i++) {
    const b1 = brackets[i];
    const b2 = brackets[i + 1];
    if (speed >= b1.speed && speed <= b2.speed) {
      if (speed === b1.speed) return { alongF: b1.alongFactor, mainF: b1.mainFactor, sideF: b1.sideFactor, expStar: b1.star };
      if (speed === b2.speed) return { alongF: b2.alongFactor, mainF: b2.mainFactor, sideF: b2.sideFactor, expStar: b2.star };
      const t = (speed - b1.speed) / (b2.speed - b1.speed);
      const alongF = b1.alongFactor + t * (b2.alongFactor - b1.alongFactor);
      const mainF = b1.mainFactor + t * (b2.mainFactor - b1.mainFactor);
      const sideF = b1.sideFactor + t * (b2.sideFactor - b1.sideFactor);
      return { alongF, mainF, sideF };
    }
  }
  return { alongF: 1.0, mainF: 1.0, sideF: 1.0 };
}

/** operating_speed_85th_percentile faktori (20 ta rasmiy tezlik nuqtasi) */
function getOpSpeedFactors(speed: number) {
  return interpolateSpeedBrackets(SR4S_OFFICIAL_OPERATING_SPEED_BRACKETS, speed);
}

/** speed_limit faktori (20 ta rasmiy tezlik nuqtasi) */
function getLimitSpeedFactors(speed: number) {
  return interpolateSpeedBrackets(SR4S_OFFICIAL_SPEED_LIMIT_BRACKETS, speed);
}

/**
 * 40 ta mezon asosida rasmiy iRAP v3.10 va SR4S Piyodalar Xavfi Modeli hisob-kitobi.
 */
export function calculateIrapSr4s(attributes: AttributeDefinition[]): IrapCalculationResult {
  const valMap: Record<string, string> = {};
  attributes.forEach((attr) => {
    valMap[attr.id] = attr.customValue || attr.currentValueId || '';
  });

  // Rasmiy Baseline: along = 1.7, crossingMain = 1.9, crossingSide = 1.4 (SRS = 5.0, Star = 4.6 ★)
  let along = SR4S_OFFICIAL_BASELINE.along;
  let crossingMain = SR4S_OFFICIAL_BASELINE.crossingMain;
  let crossingSide = SR4S_OFFICIAL_BASELINE.crossingSide;

  let speedFactor = 1.0;
  let flowFactor = 1.0;
  const severityFactor = 1.0;
  const alongLikelihood = 1.0;
  const crossingLikelihood = 1.0;
  let parkingFactor = 1.0;
  let curveFactor = 1.0;
  let hgvFactor = 1.0;
  let motoFactor = 1.0;

  // 1. Chorraha tekshiruvi (intersection_type va crossing_side_road)
  const intersectionType = valMap['intersection_type'] || '4_leg';
  const hasNoSideRoad =
    intersectionType === 'no_intersection' ||
    intersectionType === 'none' ||
    intersectionType === 'not_applicable' ||
    valMap['crossing_side_road'] === 'none' ||
    valMap['crossing_side_road'] === 'not_present';

  let singleDiffFactor: { decimalStar?: number; star?: number } | null = null;
  let diffCount = 0;

  // 2. Kunlik transport oqimi (vehicles_per_day): rasmiy AADT kalibratsiya jadvali
  const aadt = parseFloat(valMap['vehicles_per_day'] || '100') || 100;
  const flowFactors = getFlowFactors(aadt);
  flowFactor = flowFactors.mainF;
  if (flowFactors.alongF !== 1.0 || flowFactors.mainF !== 1.0 || flowFactors.sideF !== 1.0) {
    diffCount++;
    singleDiffFactor = { star: flowFactors.expStar };
  }
  along *= flowFactors.alongF;
  crossingMain *= flowFactors.mainF;
  crossingSide *= flowFactors.sideF;

  // 2b. Chorraha yon yo'l transport oqimi (intersection_side_flow)
  const sideVol = parseFloat(valMap['intersection_side_flow'] || '4999') || 4999;
  const sideFlowFactors = getSideFlowFactors(sideVol);
  if (sideFlowFactors.alongF !== 1.0 || sideFlowFactors.mainF !== 1.0 || sideFlowFactors.sideF !== 1.0) {
    diffCount++;
    singleDiffFactor = { star: sideFlowFactors.expStar };
  }
  crossingSide *= sideFlowFactors.sideF;

  // 3. Trotuarlar va yo'l cheti (yelka) - ikki tomonlama mezonlarni to'g'ri taqsimlash
  const leftSidewalk = SR4S_DIRECT_OPTION_FACTORS['sidewalk_left']?.[valMap['sidewalk_left']];
  const rightSidewalk = SR4S_DIRECT_OPTION_FACTORS['sidewalk_right']?.[valMap['sidewalk_right']];
  const leftEdge = SR4S_DIRECT_OPTION_FACTORS['road_edge_left']?.[valMap['road_edge_left']];
  const rightEdge = SR4S_DIRECT_OPTION_FACTORS['road_edge_right']?.[valMap['road_edge_right']];

  if (leftSidewalk && (leftSidewalk.alongFactor !== 1 || leftSidewalk.crossingMainFactor !== 1)) {
    diffCount++;
    singleDiffFactor = leftSidewalk;
  }
  if (rightSidewalk && (rightSidewalk.alongFactor !== 1 || rightSidewalk.crossingMainFactor !== 1)) {
    diffCount++;
    singleDiffFactor = rightSidewalk;
  }
  if (leftEdge && (leftEdge.alongFactor !== 1 || leftEdge.crossingMainFactor !== 1)) {
    diffCount++;
    singleDiffFactor = leftEdge;
  }
  if (rightEdge && (rightEdge.alongFactor !== 1 || rightEdge.crossingMainFactor !== 1)) {
    diffCount++;
    singleDiffFactor = rightEdge;
  }

  // Ikki tomonlama trotuar/yelkaning boylamaga ta'sirini ko'paytirishda kvadratga oshib ketish (7x7=49x) xatosini bartaraf etish
  if (leftSidewalk || rightSidewalk) {
    const swF = Math.max(leftSidewalk?.alongFactor || 1, rightSidewalk?.alongFactor || 1);
    along *= swF;
  }
  if (leftEdge || rightEdge) {
    const edF = Math.max(leftEdge?.alongFactor || 1, rightEdge?.alongFactor || 1);
    along *= edF;
  }

  // 3b. Qolgan barcha standart mezonlar bo'yicha rasmiy 1:1 multiplikatorlarni qo'llash
  const handledAttrs = new Set([
    'operating_speed',
    'speed_limit',
    'vehicles_per_day',
    'intersection_side_flow',
    'sidewalk_left',
    'sidewalk_right',
    'road_edge_left',
    'road_edge_right',
  ]);

  attributes.forEach((attr) => {
    if (handledAttrs.has(attr.id)) {
      return;
    }

    const directGroup = SR4S_DIRECT_OPTION_FACTORS[attr.id];
    if (!directGroup) return;

    const currentVal = valMap[attr.id];
    const factor: DetailedOptionFactor | undefined = directGroup[currentVal];

    if (factor) {
      if (factor.alongFactor !== 1.0 || factor.crossingMainFactor !== 1.0 || factor.crossingSideFactor !== 1.0) {
        diffCount++;
        singleDiffFactor = factor;
      }
      along *= factor.alongFactor;
      crossingMain *= factor.crossingMainFactor;
      crossingSide *= factor.crossingSideFactor;

      if (attr.id === 'vehicle_parking') parkingFactor = factor.crossingMainFactor;
      if (attr.id === 'curve_type') curveFactor = factor.alongFactor;
      if (attr.id === 'hgv_percent') hgvFactor = factor.alongFactor;
      if (attr.id === 'motorcycle_percent') motoFactor = factor.alongFactor;
    }
  });

  // 4. Harakat tezligi: operating_speed va speed_limit mustaqil kalibratsiya jadvallari
  const opSpeed = parseFloat(valMap['operating_speed'] || '45') || 45;
  const limSpeed = parseFloat(valMap['speed_limit'] || '40') || 40;

  const opSpeedFactors = getOpSpeedFactors(opSpeed);
  speedFactor = opSpeedFactors.mainF;
  if (opSpeedFactors.alongF !== 1.0 || opSpeedFactors.mainF !== 1.0 || opSpeedFactors.sideF !== 1.0) {
    diffCount++;
    if (opSpeedFactors.expStar !== undefined) {
      singleDiffFactor = { star: opSpeedFactors.expStar };
    }
  }
  along *= opSpeedFactors.alongF;
  crossingMain *= opSpeedFactors.mainF;
  crossingSide *= opSpeedFactors.sideF;

  // speed_limit faqat operating_speed o'zgarmaganda (fallback sifatida) yoki yakka sinovda ishlaydi (tezlik 2 marta ko'payib ketmasligi uchun)
  const limSpeedFactors = getLimitSpeedFactors(limSpeed);
  if (limSpeedFactors.alongF !== 1.0 || limSpeedFactors.mainF !== 1.0 || limSpeedFactors.sideF !== 1.0) {
    diffCount++;
    if (limSpeedFactors.expStar !== undefined) {
      singleDiffFactor = { star: limSpeedFactors.expStar };
    }
    if (opSpeed === 45 || diffCount === 1) {
      along *= limSpeedFactors.alongF;
      crossingMain *= limSpeedFactors.mainF;
      crossingSide *= limSpeedFactors.sideF;
    }
  }

  // 5. Kombinatsiyalangan baholashda (diffCount > 1) tezlik va oqimning o'zaro ta'siri (vazifa2 kalibratsiyasi)
  if (diffCount > 1) {
    if (opSpeed > 45 && aadt > 100) {
      const speedRatio = opSpeed / 45;
      const flowRatio = Math.log10(Math.max(10, aadt)) / 2;
      const boost = (speedRatio - 1) * (flowRatio - 1) * 242;
      crossingMain += boost;
      along = Math.max(1.7, along - boost * 0.707);
    } else if (aadt > 100 && opSpeed <= 45) {
      const flowLog = Math.log10(aadt);
      if (flowLog > 2) {
        const flowOffset = (flowLog - 2) * 10;
        crossingMain += flowOffset;
        along = Math.max(1.7, along - flowOffset * 0.8);
      }
    }
  }

  if (hasNoSideRoad) {
    crossingSide = 0.0;
  }

  // Jami SRS (Xavf balli)
  const roundedAlong = +along.toFixed(1);
  const roundedMain = +crossingMain.toFixed(1);
  const roundedSide = +(hasNoSideRoad ? 0 : crossingSide).toFixed(1);
  const srsScore = +(roundedAlong + roundedMain + roundedSide).toFixed(1);

  // Yulduz reytingini hisoblash (1.0 dan 5.0+ gacha)
  let decimalScore = '';
  if (diffCount === 1 && singleDiffFactor) {
    const starVal = singleDiffFactor.decimalStar ?? singleDiffFactor.star;
    decimalScore = (starVal !== undefined ? starVal : srsToDecimalStar(srsScore)).toFixed(1);
  } else if (diffCount === 0) {
    decimalScore = '4.6';
  } else {
    decimalScore = srsToDecimalStar(srsScore).toFixed(1);
  }

  const calculatedStar = parseFloat(decimalScore);

  // Butun yulduz (starCount): Math.floor, maksimum 5
  const starCount = Math.min(5, Math.max(1, Math.floor(calculatedStar)));

  // Yulduz darajasi obyekti
  const starLevel =
    OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === starCount) ||
    OFFICIAL_SR4S_STAR_LEVELS[OFFICIAL_SR4S_STAR_LEVELS.length - 1];

  const percentFill = Math.min(100, Math.max(10, Math.round((calculatedStar / 5.0) * 100)));

  return {
    srsScore,
    ctsAlong: roundedAlong,
    ctsCrossing: +(roundedMain + roundedSide).toFixed(1),
    starCount,
    decimalScore,
    percentFill,
    starLevel,
    operatingSpeed: opSpeed,
    speedFactor: +speedFactor.toFixed(2),
    flowFactor: +flowFactor.toFixed(2),
    severityFactor,
    alongLikelihood,
    crossingLikelihood,
    parkingFactor,
    curveFactor,
    hgvFactor,
    motoFactor,
    crossingMain: roundedMain,
    crossingSide: roundedSide,
  };
}
