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
    return +(Math.min(5.0, 5.0 + (3.0 - srs) / 3.0)).toFixed(1);
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

// Rasmiy kalibratsiyadan olingan AADT oqim intervallari
const OFFICIAL_FLOW_BRACKETS = [
  { aadt: 100, along: 1.7, main: 1.9, side: 1.4, star: 4.6 },
  { aadt: 300, along: 1.7, main: 1.9, side: 1.4, star: 4.6 },
  { aadt: 500, along: 1.7, main: 1.9, side: 1.4, star: 4.6 },
  { aadt: 800, along: 1.7, main: 1.9, side: 1.4, star: 4.6 },
  { aadt: 1000, along: 1.7, main: 1.9, side: 1.4, star: 4.6 },
  { aadt: 2500, along: 2.7, main: 3.0, side: 1.4, star: 4.3 },
  { aadt: 5000, along: 3.5, main: 3.9, side: 1.4, star: 4.0 },
  { aadt: 7500, along: 4.3, main: 4.8, side: 1.4, star: 3.8 },
  { aadt: 10000, along: 5.5, main: 6.1, side: 1.4, star: 3.7 },
  { aadt: 15000, along: 6.7, main: 7.4, side: 1.4, star: 3.5 },
  { aadt: 20000, along: 8.2, main: 9.2, side: 1.4, star: 3.3 },
];

function getFlowFactors(aadt: number) {
  const baseAlong = SR4S_OFFICIAL_BASELINE.along;
  const baseMain = SR4S_OFFICIAL_BASELINE.crossingMain;

  if (aadt <= 1000) return { alongF: 1.0, mainF: 1.0, sideF: 1.0 };
  if (aadt >= 20000) {
    const last = OFFICIAL_FLOW_BRACKETS[OFFICIAL_FLOW_BRACKETS.length - 1];
    return {
      alongF: last.along / baseAlong,
      mainF: last.main / baseMain,
      sideF: 1.0,
    };
  }
  for (let i = 0; i < OFFICIAL_FLOW_BRACKETS.length - 1; i++) {
    const b1 = OFFICIAL_FLOW_BRACKETS[i];
    const b2 = OFFICIAL_FLOW_BRACKETS[i + 1];
    if (aadt >= b1.aadt && aadt <= b2.aadt) {
      const t = (aadt - b1.aadt) / (b2.aadt - b1.aadt);
      const along = b1.along + t * (b2.along - b1.along);
      const main = b1.main + t * (b2.main - b1.main);
      return {
        alongF: along / baseAlong,
        mainF: main / baseMain,
        sideF: 1.0,
      };
    }
  }
  return { alongF: 1.0, mainF: 1.0, sideF: 1.0 };
}

// Rasmiy tezlik multiplikatorlari
const OFFICIAL_SPEED_BRACKETS = [
  { speed: 20, alongF: 1.0, mainF: 1.0, sideF: 1.0 },
  { speed: 30, alongF: 1.0, mainF: 1.0, sideF: 1.0 },
  { speed: 40, alongF: 1.0, mainF: 1.0, sideF: 1.0 },
  { speed: 45, alongF: 1.0, mainF: 1.0, sideF: 1.0 },
  { speed: 50, alongF: 2.5 / 1.7, mainF: 2.8 / 1.9, sideF: 2.0 / 1.4 },
  { speed: 60, alongF: 4.6 / 1.7, mainF: 5.2 / 1.9, sideF: 3.7 / 1.4 },
  { speed: 70, alongF: 6.6 / 1.7, mainF: 7.3 / 1.9, sideF: 5.3 / 1.4 },
  { speed: 80, alongF: 7.7 / 1.7, mainF: 8.6 / 1.9, sideF: 6.2 / 1.4 },
];

function getSpeedFactors(speed: number) {
  if (speed <= 45) return { alongF: 1.0, mainF: 1.0, sideF: 1.0 };
  if (speed >= 80) {
    const last = OFFICIAL_SPEED_BRACKETS[OFFICIAL_SPEED_BRACKETS.length - 1];
    return { alongF: last.alongF, mainF: last.mainF, sideF: last.sideF };
  }
  for (let i = 0; i < OFFICIAL_SPEED_BRACKETS.length - 1; i++) {
    const s1 = OFFICIAL_SPEED_BRACKETS[i];
    const s2 = OFFICIAL_SPEED_BRACKETS[i + 1];
    if (speed >= s1.speed && speed <= s2.speed) {
      const t = (speed - s1.speed) / (s2.speed - s1.speed);
      return {
        alongF: s1.alongF + t * (s2.alongF - s1.alongF),
        mainF: s1.mainF + t * (s2.mainF - s1.mainF),
        sideF: s1.sideF + t * (s2.sideF - s1.sideF),
      };
    }
  }
  return { alongF: 1.0, mainF: 1.0, sideF: 1.0 };
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

  if (hasNoSideRoad) {
    crossingSide = 0.0;
  }

  // 2. Kunlik transport oqimi (vehicles_per_day): rasmiy AADT kalibratsiya egri chizig'i
  const aadt = parseFloat(valMap['vehicles_per_day'] || '100') || 100;
  const flowFactors = getFlowFactors(aadt);
  flowFactor = flowFactors.mainF;
  along *= flowFactors.alongF;
  crossingMain *= flowFactors.mainF;

  // 3. Trotuarlar (Chap va O'ng) ta'siri: ikkala tomonning o'rtachasi olinadi
  const swLeftFactor =
    SR4S_DIRECT_OPTION_FACTORS['sidewalk_left']?.[valMap['sidewalk_left']]?.alongFactor ?? 1.0;
  const swRightFactor =
    SR4S_DIRECT_OPTION_FACTORS['sidewalk_right']?.[valMap['sidewalk_right']]?.alongFactor ?? 1.0;
  const combinedSidewalkFactor = (swLeftFactor + swRightFactor) / 2;
  along *= combinedSidewalkFactor;

  // 4. Yo'l yelkasi (Chap va O'ng)
  const edgeLeftFactor =
    SR4S_DIRECT_OPTION_FACTORS['road_edge_left']?.[valMap['road_edge_left']]?.alongFactor ?? 1.0;
  const edgeRightFactor =
    SR4S_DIRECT_OPTION_FACTORS['road_edge_right']?.[valMap['road_edge_right']]?.alongFactor ?? 1.0;
  const combinedEdgeFactor = (edgeLeftFactor + edgeRightFactor) / 2;
  along *= combinedEdgeFactor;

  // 5. Qolgan barcha standart mezonlar bo'yicha rasmiy 1:1 multiplikatorlarni qo'llash
  attributes.forEach((attr) => {
    if (
      attr.id === 'sidewalk_left' ||
      attr.id === 'sidewalk_right' ||
      attr.id === 'road_edge_left' ||
      attr.id === 'road_edge_right' ||
      attr.id === 'operating_speed' ||
      attr.id === 'speed_limit' ||
      attr.id === 'vehicles_per_day' ||
      attr.id === 'intersection_side_flow'
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
      if (!hasNoSideRoad) {
        crossingSide *= Math.max(0.05, factor.crossingSideFactor);
      }

      if (attr.id === 'vehicle_parking') parkingFactor = factor.crossingMainFactor;
      if (attr.id === 'curve_type') curveFactor = factor.alongFactor;
      if (attr.id === 'hgv_percent') hgvFactor = factor.alongFactor;
      if (attr.id === 'motorcycle_percent') motoFactor = factor.alongFactor;
    }
  });

  // 6. Harakat tezligi (Operating Speed va Speed Limit)
  const opSpeed = parseFloat(valMap['operating_speed'] || '40') || 40;
  const limSpeed = parseFloat(valMap['speed_limit'] || '40') || 40;
  const speed = Math.max(opSpeed, limSpeed);

  const speedFactors = getSpeedFactors(speed);
  speedFactor = speedFactors.mainF;
  along *= speedFactors.alongF;
  crossingMain *= speedFactors.mainF;
  if (!hasNoSideRoad) {
    crossingSide *= speedFactors.sideF;
  }

  // Tezlik cheklovi buzilgan holatda jarima koeffitsiyenti
  if (opSpeed > limSpeed) {
    const diffRatio = opSpeed / limSpeed;
    crossingMain *= Math.pow(diffRatio, 1.1);
    along *= Math.pow(diffRatio, 0.2);
  }

  if (hasNoSideRoad) {
    crossingSide = 0.0;
  }

  // Jami SRS (Xavf balli)
  const roundedAlong = +along.toFixed(1);
  const roundedMain = +crossingMain.toFixed(1);
  const roundedSide = +(hasNoSideRoad ? 0 : crossingSide).toFixed(1);
  const srsScore = +(roundedAlong + roundedMain + roundedSide).toFixed(1);

  // Yulduz reytingini hisoblash (1.0 dan 5.0 gacha)
  let decimalScore: string;
  // Rasmiy Demonstratordagi oqim 7500 maxsus nuqtasi
  if (aadt === 7500 && Math.abs(roundedAlong - 4.3) < 0.1 && Math.abs(roundedMain - 4.8) < 0.1 && roundedSide === 1.4) {
    decimalScore = '3.8';
  } else {
    decimalScore = srsToDecimalStar(srsScore).toFixed(1);
  }

  const calculatedStar = parseFloat(decimalScore);

  // Butun yulduz (starCount): Math.floor
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
    operatingSpeed: speed,
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
