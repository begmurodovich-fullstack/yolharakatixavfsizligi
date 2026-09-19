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

  // Boshlang'ich (baza) yulduzli reyting: 4.6 Yulduz
  let starScore = 4.6;

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
  // qatorlar soni 2&1 da 0.3 ga ayirilsin, 2&2 da 0.4 ga ayirilsin, 3&2 da 0.7 ga ayirilsin yoki 3&3 da 0.7 qoshilsin, 4&4 da 0.6 qoshilsin
  const lanes = valMap['number_of_lanes'];
  if (lanes === '2_1') starScore -= 0.3;
  else if (lanes === '2_2') starScore -= 0.4;
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
  // tishlashish koeffitsienti ortada 0.3 ga ayirilsin va yomonda 0.7 ga ayirilsin
  const grip = valMap['grip'];
  if (grip === 'medium') starScore -= 0.3;
  else if (grip === 'poor') starScore -= 0.7;

  // 6. Yo'l qiyaligi (grade - SR4S-11):
  // yol qiyaligi 7.5 dan 10 gachada 0.1 ga, 10 dan yuqorida 0.2 ga ayirilsin
  const grade = valMap['grade'];
  if (grade === 'grade_medium') starScore -= 0.1;
  else if (grade === 'grade_high') starScore -= 0.2;

  // 7. Yo'l o'rta ajratuvchisi (middle_of_road - SR4S-13):
  // yol orta ajratuvchisi oq chiziq, keng chiziq 1 m li, shtrix li orolcha 1 metrdan katta yoki burilish qatorida moslashuvchi ustunchalarda va keng uzuq chiziqda 0.6 oraliqda ham 0.4 ayirilsin, ajratilgan qism va metal tosiq beton tosiqda, simli va motosikl xavfsizlik tosiqlarida 0.3 ga ayirilsin, bir tomonli harakatda ozgarmasin
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
  // 'one_way' da o'zgarmasin

  // 8. Yo'l chiziqlari va belgilar (lines_and_signs - SR4S-14):
  // yol chiziqlar va belgilar yetarli emas yoki ochganda 0.1 ga ayirilsin
  if (valMap['lines_and_signs'] === 'poor') {
    starScore -= 0.1;
  }

  // 9. Ko'chalarni yoritish (street_lighting - SR4S-15):
  // kochalarni yoritish mavjud emas yoki qorongi bolsa 0.2 ga ayirilsin
  if (valMap['street_lighting'] === 'not_present') {
    starScore -= 0.2;
  }

  // 10. O'tish nazoratchisi (crossing_supervisor - SR4S-17):
  // Otish nazoratchisi bolsa 0.2 qoshilsin
  if (valMap['crossing_supervisor'] === 'supervisor') {
    starScore += 0.2;
  }

  // 11. Trotuarlar (sidewalk_left - SR4S-18):
  // trotuar yoq bolsa 1 ayirilsin, trotuar 3 m dan katta bolsa yoki tosiq orqasida bolsa 0.1 qoshilsin, tuproq yol bolsa 0.3 ayirilsin orta va velosiped yolagi bolsa 0.2 ayirilsin
  const swLeft = valMap['sidewalk_left'];
  if (swLeft === 'none') starScore -= 1.0;
  else if (swLeft === 'gt_3m' || swLeft === 'barrier') starScore += 0.1;
  else if (swLeft === 'poor') starScore -= 0.3;
  else if (swLeft === 'moderate' || swLeft === 'shared') starScore -= 0.2;

  // 12. O'tish joyi sifati (crossing_quality - SR4S-25):
  // otish joyini sifati yomon bolsa 0.3 ayir
  if (valMap['crossing_quality'] === 'poor') {
    starScore -= 0.3;
  }

  // 13. Og'ir yuk mashinalari ulushi (hgv_percent - SR4S-40):
  // ogir yuk mashinalari ham 10 dan 30 foizgacha 0.1 ga 30 dan 40 gacha va undan yuqorisi 0.2 ga ozgarishi kerak
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
  // motosikllarniki ham 21 dan 100 foizgacha 0.1 ga ozgarishi kerak
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
  // yolni burilish turi ortacha burilish 0.2 ga otkir burilish 0.7 ga va ota keskin burilish 1 ga teng bolsin
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
  // burulish sifati va korinishi yomon bolsa 0.1 ga ayirilsin
  if (valMap['curve_quality'] === 'poor') {
    starScore -= 0.1;
    curveFactor *= 1.20;
  }

  // 17. Tezlikni majburiy pasaytirgichlar (speed_management - SR4S-38):
  // tezlikni majburiy pasaytirgichlar bolsa 0.2 qoshilsin
  if (valMap['speed_management'] === 'present') {
    starScore += 0.2;
  }

  // 18. Chorraha xavfsizlik sifati (intersection_quality - SR4S-33):
  // chorraha xavfsizlik sifati yomon bolsa 0.1 ga ayirilsin
  if (valMap['intersection_quality'] === 'poor') {
    starScore -= 0.1;
  }

  // 19. Cheklangan tezlik (speed_limit - SR4S-36):
  // cheklangan tezlik 45 dan oshmasa ozmarmasin agar oshsa 50 va ungacha 0.4 ayirilsin, 60 va ungacha 1 ayirilsin, 70 va ungacha 1.3 ayirilsin, 80 va ungacha 1.6 ayirilsin, 90 va ungacha va undan yuqorisiga ham 1.7 ayirilsin
  const speedLimit = parseFloat(valMap['speed_limit'] || '40') || 40;
  if (speedLimit > 80) starScore -= 1.7;
  else if (speedLimit > 70) starScore -= 1.6;
  else if (speedLimit > 60) starScore -= 1.3;
  else if (speedLimit > 50) starScore -= 1.0;
  else if (speedLimit > 45) starScore -= 0.4;

  // 20. Haqiqiy harakat tezligi (operating_speed - SR4S-37):
  // harakat tezligi 45 da ozgarmasin 50 va ungacha 0.4 ga ayirilsin, 60 da 1.3 ga ayirilsin, 70 va ungacha 1.7 ga ayirilsin, 80 tezlikda 1.9 ga ayirilsin, 90 va ungacha 2.7 ga ayirilsin
  const speed = parseFloat(valMap['operating_speed'] || '40') || 40;
  if (speed > 80) starScore -= 2.7;
  else if (speed > 70) starScore -= 1.9;
  else if (speed > 60) starScore -= 1.7;
  else if (speed > 50) starScore -= 1.3;
  else if (speed > 45) starScore -= 0.4;

  // 21. Asosiy yo'l piyodalar o'tish joyi (crossing_main_road - SR4S-23):
  // asosiy piyodalar otish joyi yoq bolsa 0.2 ayirilsin, svetoforli yoki koprik /tunnelli bolsa 0.3 qoshilsin, belgilanmagan bolsa 0.2 ayirilsin, xavfsizlik orolchali bolsa 0.1 qoshilsin, svetofor va orolchalik bolsa 0.3 qoshilsin, zebra va orolchalik bolsa 0.2 qoshilsin, kotarilgan va zebra bolsa 0.1 qoshilsin, kotarilgan va orolchalik bolsa 0.2 qoshilsin, kotarilgan va orolchalik va zebra bolsa ham 0.2 qoshilsin
  const crossMain = valMap['crossing_main_road'] || 'marked';
  if (crossMain === 'none' || crossMain === 'unmarked') starScore -= 0.2;
  else if (crossMain === 'lights' || crossMain === 'bridge_tunnel' || crossMain === 'lights_refuge') starScore += 0.3;
  else if (crossMain === 'refuge' || crossMain === 'raised_marked') starScore += 0.1;
  else if (crossMain === 'marked_refuge' || crossMain === 'raised_refuge' || crossMain === 'raised_marked_refuge') starScore += 0.2;

  // 22. Yon yo'l piyodalar o'tish joyi (crossing_side_road - SR4S-24):
  // yon yol piyodalar otish joyi yoq bolsa 1.4 ayirilsin, kotarilgan bolsa 0.9 ayirilsin, koprik /tunnelli bolsa 0.2 qoshilsin, chizilgan bolsa 1 ayirilsin, belgilanmagan bolsa 1.4 ayirilsin, xavfsizlik orolchasi bolsa 0.8 ayirilsin, svetafor va orolcha bolsa 0.1 qoshilsin, zebra va orolcha, kotarilgan va zebra bolsa 0.7 ayirilsin, kotarilgan va orolchalik bolsa 0.6 ayirilsin, kotarilgan, zebra va orolchalik bolsa 0.3 ayirilsin
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

  // 23. Chorraha turi (intersection_type - SR4S-30):
  // chorraha turida qoshilish qatori bolsa 0.2 ayirilsin, to`rt tomonli + burilish qatori bolsa 0.1 ayirilsin. to`rt tomonli + burilish qatori va svetaforli bolsa ham 0.1 ayirilsin. Aylanma harakat bolsa 0.2 ayirilsin, kichik aylanma harakatda 0.1 ayirilsin, chorraha yoq bolsa 0.1 qoshilsin, qisqa qoshilish yolagi bolsa 0.2 ayirilsin, ajratish qatori bolsa 0.1 ayirilsin
  const interType = valMap['intersection_type'] || '4_leg';
  if (interType === 'merge_lane' || interType === 'roundabout' || interType === 'short_merge') starScore -= 0.2;
  else if (
    interType === '4_leg_turn_lane' ||
    interType === '4_leg_turn_signal' ||
    interType === '3_leg_turn_lane' ||
    interType === '3_leg_turn_signal' ||
    interType === 'mini_roundabout' ||
    interType === 'diverge_lane'
  ) {
    starScore -= 0.1;
  } else if (interType === 'no_intersection') {
    starScore += 0.1;
  }

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

  const vpd = parseFloat(valMap['vehicles_per_day'] || '100') || 100;
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
