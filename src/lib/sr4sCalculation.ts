/**
 * Rasmiy iRAP (International Road Assessment Programme) va SR4S (Star Rating for Schools)
 * Piyodalar Xavfi Modeli (Pedestrian Risk Model) hisoblash mexanizmi.
 * 
 * Asosiy Formula:
 * SRS = CTS(Along) + CTS(Crossing)
 * CTS = Likelihood * Severity * Operating Speed * External Flow Influence
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

// Rasmiy 5 ta SR4S Yulduz bandlari (iRAP standarti)
export const OFFICIAL_SR4S_STAR_LEVELS: Sr4sStarLevel[] = [
  {
    starCount: 5,
    title: '5 Yulduz — To‘liq Jihozlangan Xavfsiz',
    colorName: 'Yashil',
    description: 'Eng xavfsiz (piyodalar to‘liq ajratilgan, xavfsiz o‘tish joyi, tezlik ≤ 30 km/h)',
    starFillClass: 'fill-emerald-500 text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]',
    starTextClass: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    cardBorderClass: 'border-emerald-500/50',
    cardBgClass: 'bg-emerald-950/20',
    minSrs: 0.0,
    maxSrs: 2.5,
  },
  {
    starCount: 4,
    title: '4 Yulduz — Qulay va Xavfsiz',
    colorName: 'Sabzirang / Oltin',
    description: 'Yaxshi daraja, xavfsizlik uchun qulay sharoit, kichik xavf belgilari bor',
    starFillClass: 'fill-amber-500 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]',
    starTextClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    cardBorderClass: 'border-amber-500/50',
    cardBgClass: 'bg-amber-950/20',
    minSrs: 2.5,
    maxSrs: 5.0,
  },
  {
    starCount: 3,
    title: '3 Yulduz — Qoniqarli (BMT Maqsadi)',
    colorName: 'Sariq',
    description: 'Qoniqarli daraja (BMT va xalqaro eng kam maqbul xavfsizlik standarti)',
    starFillClass: 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]',
    starTextClass: 'text-yellow-400',
    badgeClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    cardBorderClass: 'border-yellow-500/50',
    cardBgClass: 'bg-yellow-950/20',
    minSrs: 5.0,
    maxSrs: 10.0,
  },
  {
    starCount: 2,
    title: '2 Yulduz — Yuqori Xavf',
    colorName: 'Qizil',
    description: 'Yuqori xavf (infratuzilma nuqsonlari yetarli, sharoit talabga javob bermaydi)',
    starFillClass: 'fill-red-500 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]',
    starTextClass: 'text-red-400',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30',
    cardBorderClass: 'border-red-500/50',
    cardBgClass: 'bg-red-950/20',
    minSrs: 10.0,
    maxSrs: 22.5,
  },
  {
    starCount: 1,
    title: '1 Yulduz — Juda Yuqori Xavf',
    colorName: 'Qora / To‘q Qizil',
    description: 'Juda yuqori xavf (tezlik yuqori, trotuar yoki xavfsiz o‘tish joyi mavjud emas)',
    starFillClass: 'fill-slate-950 text-slate-900 stroke-slate-400 drop-shadow-md',
    starTextClass: 'text-slate-300',
    badgeClass: 'bg-slate-950 text-slate-200 border-slate-700',
    cardBorderClass: 'border-slate-700/80',
    cardBgClass: 'bg-slate-900/90',
    minSrs: 22.5,
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
}

/**
 * 40 ta rasmiy mezon asosida iRAP Piyodalar Xavfi Modelini hisoblash
 */
export function calculateIrapSr4s(attributes: AttributeDefinition[]): IrapCalculationResult {
  const valMap: Record<string, string> = {};
  attributes.forEach((attr) => {
    valMap[attr.id] = attr.customValue || attr.currentValueId || '';
  });

  // 1. Haqiqiy Tezlik Koeffitsiyenti (Operating Speed Factor)
  // iRAP bazaviy tezlik: 50 km/h (1.0). Xavf tezlik kvadratiga proporsional.
  const speed = parseFloat(valMap['operating_speed'] || '40') || 40;
  let speedFactor = Math.pow(speed / 50, 2.0);

  // Tezlikni pasaytirgichlar (speed management) mavjud bo'lsa, xavf 30% ga kamayadi
  if (valMap['speed_management'] === 'present') {
    speedFactor *= 0.70;
  }

  // 2. Tashqi Harakat Oqimi (External Flow Influence)
  // AADT (kunlik transport oqimi) bo'yicha logaritmik shkala
  const vpd = parseFloat(valMap['vehicles_per_day'] || '100') || 100;
  const flowBase = Math.max(0.35, Math.min(1.5, Math.log10(Math.max(vpd, 10)) / 4));

  // 3. Hodisa Oqibati Og'irligi (Severity Factor)
  let severity = 1.0;
  
  // Og'ir yuk mashinalari ulushi
  const hgv = valMap['hgv_percent'];
  if (hgv === 'above_20') severity *= 1.35;
  else if (hgv === '10_20') severity *= 1.20;
  else if (hgv === '5_10') severity *= 1.10;

  // Mototsikl va mopedlar ulushi
  const moto = valMap['motorcycle_percent'];
  if (moto === 'above_30') severity *= 1.20;
  else if (moto === '15_30') severity *= 1.10;

  // Qiyalik (Grade)
  if (valMap['grade'] === 'grade_high') severity *= 1.15;
  else if (valMap['grade'] === 'grade_medium') severity *= 1.05;

  // Yo'l o'rtasi ajratgichi
  if (valMap['middle_of_road'] === 'physical_barrier') severity *= 0.85;

  // 4. CTS Along (Bo'ylama Harakat Xavf Bali)
  let alongLikelihood = 1.0;

  // Trotuar turi va ajratilishi (chap va o'ng tomonlar)
  const getSidewalkFactor = (sw: string) => {
    switch (sw) {
      case 'barrier':
      case 'physical_barrier_ge_1_5m': return 0.20; // Parapet/to'siq bilan to'liq ajratilgan trotuar
      case 'gt_3m': return 0.30;
      case '1_3m':
      case 'ge_1_5m': return 0.45; // Keng trotuar (1-3m)
      case '0_1m': return 0.70; // Tor trotuar (0-1m)
      case 'shared': return 0.50; // Umumiy velo-piyoda yo'lak
      case 'moderate':
      case 'informal_path': return 1.10; // Qorishiq/tuproq yo'l
      case 'poor': return 1.50;
      case 'none': return 2.20; // Trotuar mutlaqo yo'q (yo'l yoqasida yurish)
      default: return 0.70;
    }
  };
  const swLeft = valMap['sidewalk_left'] || '1_3m';
  const swRight = valMap['sidewalk_right'] || '0_1m';
  const swAvg = (getSidewalkFactor(swLeft) + getSidewalkFactor(swRight)) / 2;
  alongLikelihood *= swAvg;

  // Yo'l chekkasi (yelka) kengligi
  const getShoulderFactor = (re: string) => {
    switch (re) {
      case 'gt_2_4m':
      case 'ge_2_4m': return 0.85;
      case '1_2_4m': return 0.92;
      case '0_1m': return 1.0;
      case 'none': return 1.15;
      default: return 1.0;
    }
  };
  const reLeft = valMap['road_edge_left'] || '0_1m';
  const reRight = valMap['road_edge_right'] || '0_1m';
  alongLikelihood *= (getShoulderFactor(reLeft) + getShoulderFactor(reRight)) / 2;

  // Ko'rish masofasi
  if (valMap['sight_distance'] === 'poor') alongLikelihood *= 1.45;

  // Yo'l qoplamasi holati va grip
  if (valMap['road_condition'] === 'poor') alongLikelihood *= 1.25;
  else if (valMap['road_condition'] === 'medium') alongLikelihood *= 1.10;
  if (valMap['grip'] === 'poor') alongLikelihood *= 1.20;

  // Ko'cha yoritilishi
  if (valMap['street_lighting'] === 'not_present') alongLikelihood *= 1.35;

  // Maktab ogohlantirishi
  if (valMap['school_warning'] === 'signs_markings') alongLikelihood *= 0.85;
  else if (valMap['school_warning'] === 'none') alongLikelihood *= 1.15;

  // Kirish yo'llari (driveways)
  const driveways = valMap['driveways'];
  if (driveways === '2_plus_commercial') alongLikelihood *= 1.25;
  else if (driveways === '2_plus_residential') alongLikelihood *= 1.10;

  // Qatorlar soni
  const lanes = valMap['number_of_lanes'];
  if (lanes === '2_2') alongLikelihood *= 1.20;
  else if (lanes === '3_2' || lanes === '3_3') alongLikelihood *= 1.40;

  // Bo'ylama piyodalar oqimi
  const alongFlowMult = (valMap['left_side_flow'] === 'present' || valMap['right_side_flow'] === 'present') ? 1.0 : 0.6;

  // Bo'ylama kalibratsiya koeffitsiyenti
  const BASE_ALONG_CONST = 3.8;
  const ctsAlong = BASE_ALONG_CONST * alongLikelihood * severity * speedFactor * flowBase * alongFlowMult;

  // 5. CTS Crossing (Yo'lni Kesib O'tish Xavf Bali)
  let crossingLikelihood = 1.0;

  // Asosiy yo'l piyodalar o'tish joyi turi
  const crossMain = valMap['crossing_main_road'] || 'marked';
  switch (crossMain) {
    case 'bridge_tunnel':
    case 'grade_separated': crossingLikelihood *= 0.08; break;
    case 'lights_refuge':
    case 'signal_refuge': crossingLikelihood *= 0.25; break;
    case 'raised_refuge': crossingLikelihood *= 0.35; break;
    case 'lights':
    case 'signal_no_refuge': crossingLikelihood *= 0.45; break;
    case 'raised_marked':
    case 'raised': crossingLikelihood *= 0.50; break;
    case 'marked_refuge': crossingLikelihood *= 0.65; break;
    case 'marked': crossingLikelihood *= 0.85; break;
    case 'refuge':
    case 'refuge_only': crossingLikelihood *= 1.10; break;
    case 'unmarked':
    case 'none': crossingLikelihood *= 2.40; break;
    default: crossingLikelihood *= 0.85;
  }

  // O'tish joyi nazoratchisi (Maktab patrul xizmati - xavfni 60% ga kamaytiradi!)
  if (valMap['crossing_supervisor'] === 'supervisor') {
    crossingLikelihood *= 0.40;
  }

  // O'tish joyi sifati
  if (valMap['crossing_quality'] === 'poor') crossingLikelihood *= 1.35;

  // Yo'l qatorlari soni
  if (lanes === '2_1') crossingLikelihood *= 1.15;
  else if (lanes === '2_2') crossingLikelihood *= 1.45;
  else if (lanes === '3_2' || lanes === '3_3') crossingLikelihood *= 1.80;

  // Ko'rish masofasi
  if (valMap['sight_distance'] === 'poor') crossingLikelihood *= 1.50;

  // Chorraha turi va sifati
  const interType = valMap['intersection_type'];
  if (interType === '4_leg_signal') crossingLikelihood *= 0.90;
  else if (interType === '4_leg_roundabout' || interType === '3_leg_roundabout') crossingLikelihood *= 0.80;
  else if (interType === '4_leg' || interType === '4_leg_stop') crossingLikelihood *= 1.25;
  else if (interType === '3_leg') crossingLikelihood *= 1.10;

  if (valMap['intersection_quality'] === 'poor') crossingLikelihood *= 1.25;

  // Piyodalarni yo'naltiruvchi panjara
  if (valMap['pedestrian_channelisation'] === 'present') crossingLikelihood *= 0.85;

  // Kesib o'tish piyodalar oqimi
  const crossFlowMult = valMap['crossing_flow'] === 'present' ? 1.0 : 0.6;

  // Kesib o'tish kalibratsiya koeffitsiyenti
  const BASE_CROSSING_CONST = 3.8;
  const ctsCrossing = BASE_CROSSING_CONST * crossingLikelihood * severity * speedFactor * flowBase * crossFlowMult;

  // 6. Jami SRS (Star Rating Score)
  const srsScore = ctsAlong + ctsCrossing;

  // 7. SRS ballidan Yulduzlar Darajasiga O'tkazish (Rasmiy iRAP Bandlari):
  // 0 - 2.5: 5 Yulduz (4.5 - 5.0 oralig'i, standart parametrlar = 4.6 Yulduz)
  // 2.5 - 5.0: 4 Yulduz (4.0 - 4.5 oralig'i)
  // 5.0 - 10.0: 3 Yulduz (3.0 - 4.0 oralig'i)
  // 10.0 - 22.5: 2 Yulduz (2.0 - 3.0 oralig'i)
  // > 22.5: 1 Yulduz (1.0 - 2.0 oralig'i)
  let starCount = 3;
  let decimalVal = 3.0;

  if (srsScore <= 2.5) {
    starCount = 5;
    decimalVal = 5.0 - (srsScore / 2.5) * 0.5;
  } else if (srsScore <= 5.0) {
    starCount = 4;
    decimalVal = 4.5 - ((srsScore - 2.5) / 2.5) * 0.5;
  } else if (srsScore <= 10.0) {
    starCount = 3;
    decimalVal = 4.0 - ((srsScore - 5.0) / 5.0) * 1.0;
  } else if (srsScore <= 22.5) {
    starCount = 2;
    decimalVal = 3.0 - ((srsScore - 10.0) / 12.5) * 1.0;
  } else {
    starCount = 1;
    decimalVal = Math.max(1.0, 2.0 - ((srsScore - 22.5) / 25.0) * 1.0);
  }

  const roundedDecimal = Math.round(decimalVal * 10) / 10;
  const matchedLevel =
    OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === starCount) ||
    OFFICIAL_SR4S_STAR_LEVELS[1];

  return {
    srsScore: Math.round(srsScore * 100) / 100,
    ctsAlong: Math.round(ctsAlong * 100) / 100,
    ctsCrossing: Math.round(ctsCrossing * 100) / 100,
    starCount,
    decimalScore: roundedDecimal.toFixed(1),
    percentFill: (roundedDecimal / 5) * 100,
    starLevel: matchedLevel,
    operatingSpeed: speed,
    speedFactor: Math.round(speedFactor * 100) / 100,
    flowFactor: Math.round(flowBase * 100) / 100,
    severityFactor: Math.round(severity * 100) / 100,
    alongLikelihood: Math.round(alongLikelihood * 100) / 100,
    crossingLikelihood: Math.round(crossingLikelihood * 100) / 100,
  };
}
