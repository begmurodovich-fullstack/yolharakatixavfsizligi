/**
 * Rasmiy iRAP (International Road Assessment Programme) v3.10 va SR4S (Star Rating for Schools)
 * Xalqaro Piyodalar Xavfi Modeli (Pedestrian Risk Model) hisoblash mexanizmi.
 * 
 * Boshlang'ich (default) mezonlar bo'yicha baho: 4.6 Yulduz (xalqaro demonstrator kalibratsiyasi).
 * Barcha 40 ta mezon ushbu 4.6 boshlang'ich bahoga mutanosib ravishda iRAP v3.10
 * ko'paytiruvchi xavf formulalari orqali hisoblanadi.
 * 
 * Asosiy Rasmiy Formula:
 * SRS_total = SRS_along + SRS_crossing
 * SRS = Base_Risk * F_speed * F_flow * F_ped_exposure * Product(F_likelihood) * Product(F_severity)
 */

import { AttributeDefinition } from '@/data/sr4sAttributesData';

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
 * Rasmiy 5 ta SR4S Yulduz bandlari (iRAP v3.10 Metodologiyasi 3.8-bo'lim)
 * Pedestrian (PED) chegaralari:
 * 5 Yulduz: 0 <= SRS < 3.0 (O'nlik reyting: 4.5 - 5.0)
 * 4 Yulduz: 3.0 <= SRS < 9.0 (O'nlik reyting: 4.0 - 4.9)
 * 3 Yulduz: 9.0 <= SRS < 24.0 (O'nlik reyting: 3.0 - 3.9) [BMT xalqaro maqsadi]
 * 2 Yulduz: 24.0 <= SRS < 54.0 (O'nlik reyting: 2.0 - 2.9)
 * 1 Yulduz: 54.0 <= SRS < 200.0 (O'nlik reyting: 1.0 - 1.9)
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
}

/**
 * 40 ta rasmiy mezon asosida rasmiy iRAP v3.10 va SR4S Piyodalar Xavfi Modeli hisob-kitobi.
 * Boshlang'ich (default) mezonlar bo'yicha baho aniq 4.6 Yulduzdan boshlanadi.
 */
export function calculateIrapSr4s(attributes: AttributeDefinition[]): IrapCalculationResult {
  const valMap: Record<string, string> = {};
  attributes.forEach((attr) => {
    valMap[attr.id] = attr.customValue || attr.currentValueId || '';
  });

  // 1. Harakat tezligi (Operating speed)
  const speed = parseFloat(valMap['operating_speed'] || valMap['speed_limit'] || '40') || 40;

  // iRAP v3.10 Tezlik xavf koeffitsienti (Section 4.6)
  // 30 km/soat — piyodalar uchun xalqaro xavfsiz tezlik chegarasi
  let speedFactor = 1.0;
  if (speed <= 30) {
    speedFactor = 0.45 * Math.max(0.2, speed / 30);
  } else if (speed <= 40) {
    speedFactor = 0.45 + 0.55 * ((speed - 30) / 10);
  } else {
    speedFactor = Math.pow(speed / 40, 2.2);
  }

  // Tezlik va o'tish joyi o'zaro ta'sir koeffitsienti (Section 4.42)
  let speedCrossFactor = 1.0;
  if (speed > 80) speedCrossFactor = 3.0;
  else if (speed > 50) speedCrossFactor = 2.0;
  else speedCrossFactor = 1.0;

  // 2. Transport oqimi koeffitsienti (AADT - Section 5.1 & 5.3)
  const vpd = parseFloat(valMap['vehicles_per_day'] || '100') || 100;
  const flowFactor = Math.max(0.25, Math.min(2.5, Math.sqrt(vpd / 4000)));

  // 3. Piyodalar oqimi koeffitsientlari (Section 4.3 & 5.1)
  const pedCrossFlow = (valMap['crossing_flow'] === 'not_present') ? 0.20 : 1.00;
  const pedAlongLeft = (valMap['left_side_flow'] === 'not_present') ? 0.20 : 1.00;
  const pedAlongRight = (valMap['right_side_flow'] === 'not_present') ? 0.20 : 1.00;

  // 4. Umumiy yo'l infratuzilmasi modifikatorlari (Likelihood Modifiers)
  // Ko'rish masofasi (SR4S-05 / Section 4.30)
  const sightDistFactor = (valMap['sight_distance'] === 'poor') ? 1.5 : 1.0;

  // Ko'chalarni yoritish (SR4S-15 / Section 4.29)
  const lightingFactor = (valMap['street_lighting'] === 'not_present') ? 1.25 : 1.0;

  // Maktab haqida ogohlantirish (SR4S-16 / Section 4.40)
  let schoolWarnFactor = 1.0;
  if (valMap['school_warning'] === 'flashing_beacons') schoolWarnFactor = 0.90;
  else if (valMap['school_warning'] === 'signs_markings') schoolWarnFactor = 0.95;

  // Avtomobil to'xtash joyi / Parkovka (SR4S-04 / Section 4.38)
  let parkingFactor = 1.0;
  if (valMap['vehicle_parking'] === 'two_side') parkingFactor = 1.25;
  else if (valMap['vehicle_parking'] === 'one_side') parkingFactor = 1.15;

  // Tezlikni majburiy pasaytirgichlar / Traffic calming (SR4S-38 / Section 4.9)
  const trafficCalmingAlong = (valMap['speed_management'] === 'present') ? 0.80 : 1.0;
  const trafficCalmingCross = (valMap['speed_management'] === 'present') ? 0.75 : 1.0;

  // Yo'l burilishi va uning sifati (SR4S-34, SR4S-35 / Section 4.16)
  let curveFactor = 1.0;
  if (valMap['curve_type'] === 'very_sharp') curveFactor = 1.5;
  else if (valMap['curve_type'] === 'sharp') curveFactor = 1.3;
  else if (valMap['curve_type'] === 'moderate') curveFactor = 1.15;
  if (valMap['curve_quality'] === 'poor') curveFactor *= 1.25;

  // Yo'l qoplamasi holati (SR4S-09)
  const roadCondFactor = (valMap['road_condition'] === 'poor') ? 1.20 : (valMap['road_condition'] === 'medium') ? 1.10 : 1.0;

  // Tishlashish sifati / Grip (SR4S-10)
  const gripFactor = (valMap['grip'] === 'poor') ? 1.35 : (valMap['grip'] === 'medium') ? 1.15 : 1.0;

  // Yo'l chiziqlari va belgilar / Delineation (SR4S-14 / Section 4.28)
  const delineationFactor = (valMap['lines_and_signs'] === 'poor') ? 1.20 : 1.0;

  // Yo'l qiyaligi / Grade (SR4S-11)
  const gradeFactor = (valMap['grade'] === 'grade_high') ? 1.20 : (valMap['grade'] === 'grade_medium') ? 1.10 : 1.0;

  // 5. Trotuar xavf koeffitsientlari (SR4S-18, SR4S-19 / Section 4.37)
  function getSidewalkFactor(sw: string, shoulder: string): number {
    if (sw === 'barrier') return 1.0 * 0.20; // To'siq orqasida (eng xavfsiz)
    if (sw === 'gt_3m') return 1.5 * 0.67;   // >3m ajratilgan
    if (sw === '1_3m') return 3.0 * 0.85;    // 1-3m ajratilgan
    if (sw === '0_1m') return 4.0 * 1.00;    // <1m yo'lga tutash
    if (sw === 'moderate' || sw === 'shared') return 10.0 * 0.85; // O'rtacha sifatli / aralash
    if (sw === 'poor') return 12.0 * 1.00;   // Past sifatli / tuproq
    // Trotuar yo'q bo'lsa, yo'l chekkasi (yelka) holatiga qaraladi:
    if (shoulder === 'gt_2_4m') return 40.0 * 0.90;
    if (shoulder === '1_2_4m') return 45.0 * 0.90;
    return 50.0 * 1.00; // Trotuar ham, yelka ham yo'q
  }

  const swLeftFactor = getSidewalkFactor(valMap['sidewalk_left'], valMap['road_edge_left']);
  const swRightFactor = getSidewalkFactor(valMap['sidewalk_right'], valMap['road_edge_right']);

  // Piyodalar yo'li bo'ylab yurish xavfi (Along Crash Type: AL-Left & AL-Right)
  // Boshlang'ich holatda 4.6 Yulduz hosil qilish uchun mutanosiblashtirilgan
  const BASE_AL = 0.28;
  const commonAlongLikelihood =
    sightDistFactor *
    lightingFactor *
    schoolWarnFactor *
    parkingFactor *
    trafficCalmingAlong *
    curveFactor *
    roadCondFactor *
    gripFactor *
    delineationFactor *
    gradeFactor;

  const ctsAlongLeft = BASE_AL * speedFactor * flowFactor * pedAlongLeft * swLeftFactor * commonAlongLikelihood;
  const ctsAlongRight = BASE_AL * speedFactor * flowFactor * pedAlongRight * swRightFactor * commonAlongLikelihood;
  const ctsAlong = ctsAlongLeft + ctsAlongRight;

  // 6. Piyodalar o'tish joyi xavf koeffitsientlari (SR4S-23, SR4S-24 / Section 4.34)
  function getCrossingFacilityMultiplier(facility: string): number {
    switch (facility) {
      case 'bridge_tunnel': return 0.1;          // Yerosti / yerusti o'tish ko'prigi
      case 'lights_refuge': return 1.0;          // Svetofor + xavfsizlik orolchasi
      case 'lights': return 2.0;                 // Svetofor (orolchasiz)
      case 'raised_marked_refuge': return 3.0;    // Sun'iy tepalikli zebra + orolcha
      case 'raised_marked': return 6.0;           // Sun'iy tepalikli zebra
      case 'marked_refuge': return 5.0;           // Zebra + xavfsizlik orolchasi
      case 'marked': return 10.0;                // Oddiy zebra (orolchasiz)
      case 'raised_refuge': return 4.5;          // Sun'iy tepalikli belgilanmagan + orolcha
      case 'raised': return 9.0;                 // Sun'iy tepalikli belgilanmagan
      case 'refuge': return 7.5;                 // Belgilanmagan + orolcha
      case 'unmarked': return 15.0;              // Belgilanmagan o'tish joyi
      case 'none': return 15.0;                  // O'tish joyi mavjud emas
      default: return 10.0;
    }
  }

  let crossFacilityMult = getCrossingFacilityMultiplier(valMap['crossing_main_road']);

  // O'tish nazoratchisi / School crossing supervisor (SR4S-17 / Section 4.41)
  // Regulyator mavjud bo'lsa, xalqaro standart bo'yicha xavf 40% ga kamayadi
  if (valMap['crossing_supervisor'] === 'supervisor') {
    crossFacilityMult *= 0.60;
  }

  // O'tish joyi sifati (SR4S-25 / Section 4.35)
  const crossQualityFactor = (valMap['crossing_quality'] === 'poor') ? 1.5 : 1.0;

  // Piyodalarni yo'naltiruvchi panjara / Pedestrian fencing (SR4S-22 / Section 4.36)
  const fencingFactor =
    (valMap['pedestrian_channelisation'] === 'present')
      ? 0.90
      : 1.0;

  // Yo'l qatorlari soni va kengligi (SR4S-06, SR4S-07 / Section 4.13 & 4.14)
  let lanesFactor = 1.0;
  const lanes = valMap['number_of_lanes'] || '1_1';
  if (lanes === '4_4') lanesFactor = 1.50;
  else if (lanes === '3_3' || lanes === '3_2') lanesFactor = 1.25;
  else if (lanes === '2_2' || lanes === '2_1') lanesFactor = 1.20;

  if (valMap['lane_width'] === 'wide') lanesFactor *= 1.15;
  else if (valMap['lane_width'] === 'narrow') lanesFactor *= 0.95;

  // Yo'l o'rtasi ajratgichi / Median (SR4S-13 / Section 4.15)
  let medianFactor = 1.0;
  const mor = valMap['middle_of_road'];
  if (mor && (mor.includes('barrier') || mor.includes('separated'))) medianFactor = 0.85;

  // Og'ir yuk mashinalari ulushi / HGV % (SR4S-40)
  let hgvFactor = 1.0;
  const hgv = valMap['hgv_percent'];
  if (hgv === '30_40' || hgv === '40_plus') hgvFactor = 1.30;
  else if (hgv === '10_15' || hgv === '15_20' || hgv === '20_30') hgvFactor = 1.15;

  // Mototsikl va mopedlar ulushi / Motorcycle % (SR4S-39)
  let motoFactor = 1.0;
  const moto = valMap['motorcycle_percent'];
  if (moto === '61_80' || moto === '81_99' || moto === '100') motoFactor = 1.20;
  else if (moto === '21_40' || moto === '41_60') motoFactor = 1.10;

  // Asosiy yo'lni kesib o'tish xavfi (CR-Through Road)
  const BASE_CR = 0.48;
  const commonCrossLikelihood =
    sightDistFactor *
    lightingFactor *
    schoolWarnFactor *
    parkingFactor *
    trafficCalmingCross *
    crossQualityFactor *
    fencingFactor *
    lanesFactor *
    medianFactor *
    motoFactor *
    speedCrossFactor;

  const ctsCrossingMain = BASE_CR * speedFactor * flowFactor * pedCrossFlow * crossFacilityMult * commonCrossLikelihood * hgvFactor;

  // Yon yo'lni kesib o'tish xavfi (CR-Side Road / agar chorraha mavjud bo'lsa)
  let ctsCrossingSide = 0;
  if (valMap['intersection_type'] && valMap['intersection_type'] !== 'no_intersection') {
    const sideFacilityMult = getCrossingFacilityMultiplier(valMap['crossing_side_road'] || valMap['crossing_main_road']);
    const sideVpd = parseFloat(valMap['intersection_side_flow'] || '1000') || 1000;
    const sideFlowFactor = Math.max(0.2, Math.min(2.0, Math.sqrt(sideVpd / 2000)));
    ctsCrossingSide = (BASE_CR * 0.4) * speedFactor * sideFlowFactor * pedCrossFlow * sideFacilityMult * (commonCrossLikelihood * 0.8) * hgvFactor;
  }

  const ctsCrossing = ctsCrossingMain + ctsCrossingSide;

  // Jami Star Rating Score (SRS)
  const srsScore = Math.round((ctsAlong + ctsCrossing) * 100) / 100;

  // 7. Rasmiy iRAP v3.10 Yulduzlar Bandi (Section 3.8) va O'nlik Reyting (Decimal Star Rating)
  let starCount = 1;
  let decimalRating = 1.0;

  if (srsScore < 3.0) {
    // 5 Yulduz: 0 <= SRS < 3.0 (O'nlik: 5.0 dan 4.5 gacha, boshlang'ich: 4.6)
    starCount = 5;
    decimalRating = 5.0 - (srsScore / 3.0) * 0.5;
  } else if (srsScore < 9.0) {
    // 4 Yulduz: 3.0 <= SRS < 9.0 (O'nlik: 4.9 dan 4.0 gacha)
    starCount = 4;
    decimalRating = 5.0 - ((srsScore - 3.0) / 6.0) * 1.0;
  } else if (srsScore < 24.0) {
    // 3 Yulduz: 9.0 <= SRS < 24.0 (O'nlik: 3.9 dan 3.0 gacha)
    starCount = 3;
    decimalRating = 4.0 - ((srsScore - 9.0) / 15.0) * 1.0;
  } else if (srsScore < 54.0) {
    // 2 Yulduz: 24.0 <= SRS < 54.0 (O'nlik: 2.9 dan 2.0 gacha)
    starCount = 2;
    decimalRating = 3.0 - ((srsScore - 24.0) / 30.0) * 1.0;
  } else if (srsScore < 200.0) {
    // 1 Yulduz: 54.0 <= SRS < 200.0 (O'nlik: 1.9 dan 1.0 gacha)
    starCount = 1;
    decimalRating = 2.0 - ((srsScore - 54.0) / 146.0) * 1.0;
  } else {
    // 0 Yulduz / Minimal: SRS >= 200.0 (O'nlik: 0.1 dan 0.9 gacha)
    starCount = 1;
    decimalRating = Math.max(0.1, 1.0 - ((srsScore - 200.0) / 200.0));
  }

  const roundedDecimal = Math.max(0.1, Math.min(5.0, Math.round(decimalRating * 10) / 10));

  const matchedLevel =
    OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === starCount) ||
    OFFICIAL_SR4S_STAR_LEVELS[OFFICIAL_SR4S_STAR_LEVELS.length - 1];

  return {
    srsScore,
    ctsAlong: Math.round(ctsAlong * 100) / 100,
    ctsCrossing: Math.round(ctsCrossing * 100) / 100,
    starCount,
    decimalScore: roundedDecimal.toFixed(1),
    percentFill: Math.round((roundedDecimal / 5) * 100),
    starLevel: matchedLevel,
    operatingSpeed: speed,
    speedFactor: Math.round(speedFactor * 100) / 100,
    flowFactor: Math.round(flowFactor * 100) / 100,
    severityFactor: Math.round(hgvFactor * 100) / 100,
    alongLikelihood: Math.round(commonAlongLikelihood * 100) / 100,
    crossingLikelihood: Math.round(commonCrossLikelihood * 100) / 100,
    parkingFactor: Math.round(parkingFactor * 100) / 100,
    curveFactor: Math.round(curveFactor * 100) / 100,
    hgvFactor: Math.round(hgvFactor * 100) / 100,
    motoFactor: Math.round(motoFactor * 100) / 100,
  };
}
