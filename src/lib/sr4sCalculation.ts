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
  parkingFactor?: number;
  curveFactor?: number;
  hgvFactor?: number;
  motoFactor?: number;
}

/**
 * 40 ta rasmiy mezon asosida iRAP Piyodalar Xavfi Modeli hisob-kitobi.
 * sayt1.docx dagi rasmiy baholash qoidalari bo'yicha:
 * Baza reyting: 4.6 Yulduz.
 * Faqat Wordda tilga olingan mezonlar baholashga aniq o'zgarishlar kiritadi.
 */
export function calculateIrapSr4s(attributes: AttributeDefinition[]): IrapCalculationResult {
  const valMap: Record<string, string> = {};
  attributes.forEach((attr) => {
    valMap[attr.id] = attr.customValue || attr.currentValueId || '';
  });

  // Boshlang'ich (baza) yulduzli reyting: mezonlar boshlang'ich holatida (harakat tezligi 40 km/h: +0.3) jami 4.6 Yulduz bo'lishi uchun baza 4.3 qilib mutanosiblashtirilgan
  let starScore = 4.3;

  // 1. Parkovka (vehicle_parking - SR4S-04):
  // Parkovka bir tomonlama tanlansa 0.1 ayirilsin, ikki tomonlama bolsa 0.2 ayirilsin
  const parking = valMap['vehicle_parking'];
  let parkingFactor = 1.0;
  if (parking === 'one_side') {
    starScore -= 0.1;
    parkingFactor = 1.12;
  } else if (parking === 'two_side') {
    starScore -= 0.2;
    parkingFactor = 1.25;
  }

  // 2. Ko'rinish masofasi (sight_distance - SR4S-05):
  // Ko`rinish masofasi taminlanmagan bo`lsa 0.4 ga ayirilsin
  if (valMap['sight_distance'] === 'poor') {
    starScore -= 0.4;
  }

  // 3. Qatorlar soni (number_of_lanes - SR4S-06):
  // sayt2: qatorlar soni 2&2 da 0.5 ga ayirilsin
  const lanes = valMap['number_of_lanes'];
  if (lanes === '2_1') starScore -= 0.3;
  else if (lanes === '2_2') starScore -= 0.5;
  else if (lanes === '3_2') starScore -= 0.7;
  else if (lanes === '3_3') starScore += 0.7;
  else if (lanes === '4_4') starScore += 0.6;

  // 4. Yo'l qoplamasi holati (road_condition - SR4S-09):
  // yol xolati orta va yomon bolganda 0.1 ga ayirilsin
  const roadCond = valMap['road_condition'];
  if (roadCond === 'medium' || roadCond === 'poor') {
    starScore -= 0.1;
  }

  // 5. Tishlashish koeffitsienti (grip - SR4S-10):
  // sayt2: tishlashish koeffitsienti ortada 0.4 ga ayirilsin
  const grip = valMap['grip'];
  if (grip === 'medium') starScore -= 0.4;
  else if (grip === 'poor') starScore -= 0.7;

  // 6. Yo'l qiyaligi (grade - SR4S-11):
  // yol qiyaligi 7.5 dan 10 gachada 0.1 ga, 10 dan yuqorida 0.2 ga ayirilsin
  const grade = valMap['grade'];
  if (grade === 'grade_medium') starScore -= 0.1;
  else if (grade === 'grade_high') starScore -= 0.2;

  // 7. Yo'l o'rta ajratuvchisi (middle_of_road - SR4S-13):
  const mor = valMap['middle_of_road'];
  if (
    mor === 'center_line' ||
    mor === 'wide_line' ||
    mor === 'hatching' ||
    mor === 'turn_lane' ||
    mor === 'flexible_posts' ||
    mor === 'broken_wide_markings'
  ) {
    starScore -= 0.4;
  } else if (
    mor === 'separated_0_1' ||
    mor === 'separated_1_5' ||
    mor === 'separated_5_10' ||
    mor === 'separated_10_20' ||
    mor === 'separated_20_plus' ||
    mor === 'metal_barrier' ||
    mor === 'concrete_barrier' ||
    mor === 'wire_barrier' ||
    mor === 'motorcycle_barrier'
  ) {
    starScore -= 0.3;
  }

  // 8. Yo'l chiziqlari va belgilar (lines_and_signs - SR4S-14):
  if (valMap['lines_and_signs'] === 'poor') {
    starScore -= 0.1;
  }

  // 9. Ko'chalarni yoritish (street_lighting - SR4S-15):
  if (valMap['street_lighting'] === 'not_present') {
    starScore -= 0.2;
  }

  // Maktab haqida ogohlantirish (school_warning - SR4S-16) (sayt2):
  // maktab haqida ogohlantirishda maktab zonasi belgisi yoq va yaqin atrofda maktab yoq bolsa 0.1 ayirilsin
  const schoolWarn = valMap['school_warning'];
  if (schoolWarn === 'no_school_zone' || schoolWarn === 'no_school_nearby') {
    starScore -= 0.1;
  }

  // 10. O'tish nazoratchisi (crossing_supervisor - SR4S-17) (sayt2):
  // Otish nazoratchisi bolsa 0.1 qoshilsin
  if (valMap['crossing_supervisor'] === 'supervisor') {
    starScore += 0.1;
  }

  // 11. Trotuarlar (sidewalk_left, sidewalk_right - SR4S-18, SR4S-19) (sayt2):
  // trotuar chapda yoq bolsa 1.1 ayirilsin , trotuar o’ngda yoq bolsa 1.1 ayirilsin
  // trotuar 3 m dan katta bolsa yoki tosiq orqasida bolsa 0.1 qoshilsin, tuproq yol bolsa 0.3 ayirilsin orta va velosiped yolagi bolsa 0.2 ayirilsin
  const swLeft = valMap['sidewalk_left'];
  if (swLeft === 'none') starScore -= 1.1;
  else if (swLeft === 'gt_3m' || swLeft === 'barrier') starScore += 0.1;
  else if (swLeft === 'poor') starScore -= 0.3;
  else if (swLeft === 'moderate' || swLeft === 'shared') starScore -= 0.2;

  const swRight = valMap['sidewalk_right'];
  if (swRight === 'none') starScore -= 1.1;
  else if (swRight === 'gt_3m' || swRight === 'barrier') starScore += 0.1;
  else if (swRight === 'poor') starScore -= 0.3;
  else if (swRight === 'moderate' || swRight === 'shared') starScore -= 0.2;

  // 12. O'tish joyi sifati (crossing_quality - SR4S-25):
  if (valMap['crossing_quality'] === 'poor') {
    starScore -= 0.3;
  }

  // 13. Og'ir yuk mashinalari ulushi (hgv_percent - SR4S-40):
  const hgv = valMap['hgv_percent'];
  let hgvFactor = 1.0;
  if (hgv === '10_15' || hgv === '15_20' || hgv === '20_30') {
    starScore -= 0.1;
    hgvFactor = 1.25;
  } else if (hgv === '30_40' || hgv === '40_plus') {
    starScore -= 0.2;
    hgvFactor = 1.50;
  }

  // 14. Mototsikl va mopedlar ulushi (motorcycle_percent - SR4S-39):
  const moto = valMap['motorcycle_percent'];
  let motoFactor = 1.0;
  if (
    moto === '21_40' ||
    moto === '41_60' ||
    moto === '61_80' ||
    moto === '81_99' ||
    moto === '100'
  ) {
    starScore -= 0.1;
    motoFactor = 1.15;
  }

  // 15. Yo'l burilishi turi (curve_type - SR4S-34):
  const curveType = valMap['curve_type'];
  let curveFactor = 1.0;
  if (curveType === 'moderate') {
    starScore -= 0.2;
    curveFactor = 1.10;
  } else if (curveType === 'sharp') {
    starScore -= 0.7;
    curveFactor = 1.25;
  } else if (curveType === 'very_sharp') {
    starScore -= 1.0;
    curveFactor = 1.40;
  }

  // 16. Burilish sifati va ko'rinishi (curve_quality - SR4S-35):
  if (valMap['curve_quality'] === 'poor') {
    starScore -= 0.1;
    curveFactor *= 1.20;
  }

  // 17. Tezlikni majburiy pasaytirgichlar (speed_management - SR4S-38):
  if (valMap['speed_management'] === 'present') {
    starScore += 0.2;
  }

  // 18. Chorraha xavfsizlik sifati (intersection_quality - SR4S-33):
  if (valMap['intersection_quality'] === 'poor') {
    starScore -= 0.1;
  }

  // 19. Cheklangan tezlik (speed_limit - SR4S-36) (sayt2):
  // cheklangan tezlik 75 dan 80 va ungacha 1.5 ayirilsin
  const speedLimit = parseFloat(valMap['speed_limit'] || '40') || 40;
  if (speedLimit > 80) starScore -= 1.7;
  else if (speedLimit >= 75) starScore -= 1.5;
  else if (speedLimit > 70) starScore -= 1.3;
  else if (speedLimit > 60) starScore -= 1.3;
  else if (speedLimit > 50) starScore -= 1.0;
  else if (speedLimit > 45) starScore -= 0.4;

  // 20. Haqiqiy harakat tezligi (operating_speed - SR4S-37) (sayt2):
  // harakat tezligi 30 da 0.4 qoshilsin, 40 da 0.3 qoshilsin
  const speed = parseFloat(valMap['operating_speed'] || '40') || 40;
  if (speed <= 30) starScore += 0.4;
  else if (speed <= 40) starScore += 0.3;
  else if (speed > 80) starScore -= 2.7;
  else if (speed > 70) starScore -= 1.9;
  else if (speed > 60) starScore -= 1.7;
  else if (speed > 50) starScore -= 1.3;
  else if (speed > 45) starScore -= 0.4;

  // 21. Asosiy yo'l piyodalar o'tish joyi (crossing_main_road - SR4S-23):
  const crossMain = valMap['crossing_main_road'] || 'marked';
  if (crossMain === 'none' || crossMain === 'unmarked') starScore -= 0.2;
  else if (crossMain === 'lights' || crossMain === 'bridge_tunnel' || crossMain === 'lights_refuge') starScore += 0.3;
  else if (crossMain === 'refuge' || crossMain === 'raised_marked') starScore += 0.1;
  else if (crossMain === 'marked_refuge' || crossMain === 'raised_refuge' || crossMain === 'raised_marked_refuge') starScore += 0.2;

  // 22. Yon yo'l piyodalar o'tish joyi (crossing_side_road - SR4S-24):
  const crossSide = valMap['crossing_side_road'] || 'lights';
  if (crossSide === 'none' || crossSide === 'unmarked') starScore -= 1.4;
  else if (crossSide === 'marked') starScore -= 1.0;
  else if (crossSide === 'raised') starScore -= 0.9;
  else if (crossSide === 'refuge') starScore -= 0.8;
  else if (crossSide === 'marked_refuge' || crossSide === 'raised_marked') starScore -= 0.7;
  else if (crossSide === 'raised_refuge') starScore -= 0.6;
  else if (crossSide === 'raised_marked_refuge') starScore -= 0.3;
  else if (crossSide === 'bridge_tunnel') starScore += 0.2;
  else if (crossSide === 'lights_refuge') starScore += 0.1;

  // 23. Chorraha turi va poyezd o'tish joyi (intersection_type - SR4S-30) (sayt2):
  // to`rt tomonli + burilish qatori bolsa ayirilmasin ,uch tomonli va burilish qatori da ayirilmasin, uch tomonli va burilish qatori va svetaforlida ham ayirilmasin
  // poyezd otish joyi (faolda ) va poyezd otish joyi (passiveda ) da 0.1 qoshilsin
  const interType = valMap['intersection_type'] || '4_leg';
  if (interType === 'merge_lane' || interType === 'roundabout' || interType === 'short_merge') {
    starScore -= 0.2;
  } else if (
    interType === '4_leg_turn_signal' ||
    interType === 'mini_roundabout' ||
    interType === 'diverge_lane'
  ) {
    starScore -= 0.1;
  } else if (interType === 'active_train' || interType === 'passive_train') {
    starScore += 0.1;
  } else if (interType === 'no_intersection') {
    starScore += 0.1;
  }
  // '4_leg_turn_lane', '3_leg_turn_lane', '3_leg_turn_signal' ayirilmaydi (sayt2)

  // 24. O'tish joyi piyodalar oqimi (crossing_flow - SR4S-27) (sayt2):
  // Otish joyini piyodalar oqimi mavjud emas bolsa 0.3 qoshilsin
  if (valMap['crossing_flow'] === 'not_present') {
    starScore += 0.3;
  }

  // 25. Kunlik transport oqimi (vehicles_per_day - SR4S-26) (sayt2):
  // Kunlik transport oqimi 2000 bolsa 0.3 ga ayirilsin. 4000 da bolsa 0.6 ayirilsin. 6000 da 0.7 ga ayirilsin, 8000 da 0.8 ga ayirilsin.
  // 10000 da 0.9 ga ayirilsin. 12000 da 1 ga ayirilsin. 14000 da 1.1 ga ayirilsin. 16000 da 1.2 ga ayirilsin. 20000 da 1.3 ga ayirilsin.
  // 22000 da 1.4 ga ayirilsin. 26000 da 1.5 ga ayirilsin. 28000 da 1.6 ga ayirilsin, 32000 da 1.7 ga ayirilsin. va undan yuqorida ham shuncha ayirilsin.
  const vpd = parseFloat(valMap['vehicles_per_day'] || '100') || 100;
  if (vpd >= 32000) starScore -= 1.7;
  else if (vpd >= 28000) starScore -= 1.6;
  else if (vpd >= 26000) starScore -= 1.5;
  else if (vpd >= 22000) starScore -= 1.4;
  else if (vpd >= 20000) starScore -= 1.3;
  else if (vpd >= 16000) starScore -= 1.2;
  else if (vpd >= 14000) starScore -= 1.1;
  else if (vpd >= 12000) starScore -= 1.0;
  else if (vpd >= 10000) starScore -= 0.9;
  else if (vpd >= 8000) starScore -= 0.8;
  else if (vpd >= 6000) starScore -= 0.7;
  else if (vpd >= 4000) starScore -= 0.6;
  else if (vpd >= 2000) starScore -= 0.3;

  // 26. Chorraha yon tarafdagi transport oqimi (intersection_side_flow - SR4S-32) (sayt2):
  // Chorraha yon tarafdagi transport oqimi 5000 bolsa 0.1 ayirilsin. 10000 da 0.3 ga ayirilsin. 15000 da 0.4 ga ayirilsin.
  // 20000 bolsa 0.6 ayirilsin. 25000 bolsa 0.7 ga ayirilsin. 30000 da 0.8 ga ayirilsin. 40000 da 0.9 ga ayirilsin.
  // 50000 da 1 ga ayirilsin. 60000 da 1.1 ga ayirilsin. 70000 da 1.2 ga ayirilsin va undan yuqori bolsa ham shuni ayir.
  const sideFlow = parseFloat(valMap['intersection_side_flow'] || '0') || 0;
  if (sideFlow >= 70000) starScore -= 1.2;
  else if (sideFlow >= 60000) starScore -= 1.1;
  else if (sideFlow >= 50000) starScore -= 1.0;
  else if (sideFlow >= 40000) starScore -= 0.9;
  else if (sideFlow >= 30000) starScore -= 0.8;
  else if (sideFlow >= 25000) starScore -= 0.7;
  else if (sideFlow >= 20000) starScore -= 0.6;
  else if (sideFlow >= 15000) starScore -= 0.4;
  else if (sideFlow >= 10000) starScore -= 0.3;
  else if (sideFlow >= 5000) starScore -= 0.1;

  // Yulduzli bahoni 1.0 va 5.0 oralig'ida yaxlitlash
  const roundedDecimal = Math.max(1.0, Math.min(5.0, Math.round(starScore * 10) / 10));

  // Yulduzlar soni va iRAP SRS/CTS xavf ko'rsatkichlarini mutanosib hisoblash
  let starCount = 5;
  let srsScore: number;

  if (roundedDecimal >= 4.5) {
    starCount = 5;
    srsScore = Math.max(0.1, ((5.0 - roundedDecimal) / 0.5) * 2.5);
  } else if (roundedDecimal >= 4.0) {
    starCount = 4;
    srsScore = 2.5 + ((4.5 - roundedDecimal) / 0.5) * 2.5;
  } else if (roundedDecimal >= 3.0) {
    starCount = 3;
    srsScore = 5.0 + ((4.0 - roundedDecimal) / 1.0) * 5.0;
  } else if (roundedDecimal >= 2.0) {
    starCount = 2;
    srsScore = 10.0 + ((3.0 - roundedDecimal) / 1.0) * 12.5;
  } else {
    starCount = 1;
    srsScore = 22.5 + ((2.0 - roundedDecimal) / 1.0) * 25.0;
  }

  srsScore = Math.round(srsScore * 100) / 100;
  const ctsAlong = Math.round(srsScore * 0.35 * 100) / 100;
  const ctsCrossing = Math.round((srsScore - ctsAlong) * 100) / 100;

  const matchedLevel =
    OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === starCount) ||
    OFFICIAL_SR4S_STAR_LEVELS[1];

  const speedFactor = Math.pow(speed / 50, 2.0);
  const flowBase = Math.max(0.35, Math.min(1.5, Math.log10(Math.max(vpd, 10)) / 4));

  return {
    srsScore,
    ctsAlong,
    ctsCrossing,
    starCount,
    decimalScore: roundedDecimal.toFixed(1),
    percentFill: (roundedDecimal / 5) * 100,
    starLevel: matchedLevel,
    operatingSpeed: speed,
    speedFactor: Math.round(speedFactor * 100) / 100,
    flowFactor: Math.round(flowBase * 100) / 100,
    severityFactor: Math.round(hgvFactor * motoFactor * 100) / 100,
    alongLikelihood: Math.round(parkingFactor * curveFactor * 100) / 100,
    crossingLikelihood: Math.round(parkingFactor * curveFactor * 100) / 100,
    parkingFactor: Math.round(parkingFactor * 100) / 100,
    curveFactor: Math.round(curveFactor * 100) / 100,
    hgvFactor: Math.round(hgvFactor * 100) / 100,
    motoFactor: Math.round(motoFactor * 100) / 100,
  };
}
