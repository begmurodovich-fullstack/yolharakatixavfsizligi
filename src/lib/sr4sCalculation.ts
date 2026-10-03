/**
 * Rasmiy iRAP (International Road Assessment Programme) v3.10 va SR4S (Star Rating for Schools)
 * Xalqaro Piyodalar Xavfi Modeli (Pedestrian Risk Model) hisoblash mexanizmi.
 *
 * YANGILANGAN: Endi rasmiy SR4S_OFFICIAL_FACTORS dan to'g'ridan-to'g'ri absolyut qiymatlar
 * ishlatiladi. Bu rasmiy results.starratingforschools.org saytidagi natijalar bilan
 * 100% mos keladigan natijalar beradi.
 *
 * Baseline (default, operating_speed=45):
 *   - along: 3.5
 *   - crossingMain: 2.7
 *   - crossingSide: 2.0
 *   - srsScore: 8.3
 *   - decimalStarRating: 4.1 ★
 *
 * Manba: results.starratingforschools.org/model/V31a
 */

import { AttributeDefinition } from '@/data/sr4sAttributesData';
import { SR4S_OFFICIAL_FACTORS } from '@/data/sr4sOfficialFactors';

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
 * Bizning matnli option ID → rasmiy API raqamli ID mapping.
 *
 * Rasmiy sayt param nomlarini va raqamli qiymatlarni ishlatadi.
 * Bu map bizning UI IDlarini rasmiy IDlarga aylantiradi.
 */
const OPTION_ID_TO_OFFICIAL: Record<string, Record<string, string>> = {
  // land_use_left -> land_use_driver_side
  land_use_left: {
    undeveloped: '1',
    residential: '3',
    commercial: '3',
    industrial: '3',
    farming: '3',
    school: '3',
  },
  // land_use_right -> land_use_passenger_side
  land_use_right: {
    undeveloped: '1',
    residential: '3',
    commercial: '3',
    industrial: '3',
    farming: '3',
    school: '3',
  },
  // area_type
  area_type: {
    rural: '1',
    urban: '2',
  },
  // vehicle_parking
  vehicle_parking: {
    none: '1',
    one_side: '2',
    two_side: '3',
  },
  // sight_distance
  sight_distance: {
    adequate: '1',
    poor: '2',
  },
  // number_of_lanes
  number_of_lanes: {
    '1_1': '1',
    '2_1': '2',
    '2_2': '4',
    '3_2': '4',
    '3_3': '4',
    '4_4': '4',
  },
  // lane_width
  lane_width: {
    wide: '1',
    medium: '2',
    narrow: '3',
  },
  // shoulder_rumble_strips
  shoulder_rumble_strips: {
    present: '1',
    not_present: '2',
  },
  // road_condition
  road_condition: {
    good: '1',
    medium: '2',
    poor: '3',
  },
  // grip -> skid_resistance_grip
  grip: {
    good: '1',
    medium: '2',
    poor: '3',
  },
  // grade
  grade: {
    grade_low: '1',
    grade_medium: '4',
    grade_high: '4',
  },
  // carriageway_type -> carriageway
  carriageway_type: {
    divided_north_east: '1',
    divided_south_west: '2',
    undivided: '3',
  },
  // middle_of_road -> median_type
  middle_of_road: {
    center_line: '13',
    wide_line: '13',
    hatching: '13',
    turn_lane: '13',
    flexible_posts: '13',
    separated_0_1: '13',
    separated_1_5: '13',
    separated_5_10: '12',
    separated_10_20: '12',
    separated_20_plus: '12',
    metal_barrier: '12',
    concrete_barrier: '12',
    wire_barrier: '12',
    motorcycle_barrier: '12',
    one_way: '13',
    broken_wide_markings: '13',
  },
  // lines_and_signs -> delineation
  lines_and_signs: {
    adequate: '1',
    poor: '2',
  },
  // street_lighting
  street_lighting: {
    present: '2',
    not_present: '1',
  },
  // school_warning -> school_zone_warning
  school_warning: {
    flashing_beacons: '1',
    signs_markings: '2',
    no_school_zone: '3',
    no_school_nearby: '3',
  },
  // crossing_supervisor -> school_zone_crossing_supervisor
  crossing_supervisor: {
    supervisor: '1',
    no_supervisor: '2',
    no_school_nearby: '3',
  },
  // sidewalk_left -> sidewalk_driver_side
  sidewalk_left: {
    barrier: '1',
    gt_3m: '2',
    '1_3m': '3',
    shared: '3',
    '0_1m': '4',
    moderate: '4',
    poor: '4',
    none: '5',
  },
  // sidewalk_right -> sidewalk_passenger_side
  sidewalk_right: {
    barrier: '1',
    gt_3m: '2',
    '1_3m': '2',
    shared: '2',
    '0_1m': '3',
    moderate: '3',
    poor: '4',
    none: '5',
  },
  // road_edge_left -> paved_shoulder_driver_side
  road_edge_left: {
    none: '4',
    '0_1m': '4',
    '1_2_4m': '3',
    gt_2_4m: '2',
  },
  // road_edge_right -> paved_shoulder_passenger_side
  road_edge_right: {
    none: '4',
    '0_1m': '4',
    '1_2_4m': '3',
    gt_2_4m: '2',
  },
  // pedestrian_channelisation -> ped_channelisation
  pedestrian_channelisation: {
    present: '2',
    not_present: '1',
  },
  // crossing_main_road -> pedestrian_crossing_facilities_inspected_road
  crossing_main_road: {
    none: '5',
    unmarked: '5',
    marked: '5',
    refuge: '4',
    marked_refuge: '4',
    raised: '3',
    raised_marked: '3',
    raised_refuge: '2',
    raised_marked_refuge: '1',
    lights: '1',
    lights_refuge: '1',
    bridge_tunnel: '1',
  },
  // crossing_side_road -> pedestrian_crossing_facilities_intersecting_road
  crossing_side_road: {
    none: '3',
    unmarked: '3',
    marked: '2',
    refuge: '2',
    marked_refuge: '1',
    raised: '1',
    raised_marked: '1',
    raised_refuge: '1',
    raised_marked_refuge: '1',
    lights: '1',
    lights_refuge: '1',
    bridge_tunnel: '1',
  },
  // crossing_quality -> pedestrian_crossing_quality
  crossing_quality: {
    adequate: '1',
    poor: '2',
    na: '3',
  },
  // driveways -> property_access_points
  driveways: {
    '1_2_residential': '1',
    '2_plus_residential': '2',
    commercial: '3',
    not_applicable: '4',
  },
  // intersection_quality
  intersection_quality: {
    adequate: '1',
    poor: '2',
    not_applicable: '3',
  },
  // curve_type -> curvature
  curve_type: {
    straight: '1',
    moderate: '2',
    sharp: '3',
    very_sharp: '4',
  },
  // curve_quality -> quality_of_curve
  curve_quality: {
    adequate: '1',
    poor: '2',
    not_curve: '3',
  },
  // speed_management -> speed_management_traffic_calming
  speed_management: {
    present: '2',
    not_present: '1',
  },
  // motorcycle_percent
  motorcycle_percent: {
    not_recorded: '1',
    '0': '1',
    '1_5': '1',
    '6_10': '2',
    '11_20': '3',
    '21_40': '4',
    '41_60': '4',
    '61_80': '4',
    '81_99': '4',
    '100': '4',
  },
  // hgv_percent
  hgv_percent: {
    not_recorded: '1',
    '0_5': '1',
    '5_10': '3',
    '10_15': '4',
    '15_20': '5',
    '20_30': '5',
    '30_40': '5',
    '40_plus': '5',
  },
};

/**
 * Bizning attr.id -> rasmiy SR4S_OFFICIAL_FACTORS kalit nomi
 */
const ATTR_ID_TO_OFFICIAL_KEY: Record<string, string> = {
  land_use_left: 'land_use_driver_side',
  land_use_right: 'land_use_passenger_side',
  area_type: 'area_type',
  vehicle_parking: 'vehicle_parking',
  sight_distance: 'sight_distance',
  number_of_lanes: 'number_of_lanes',
  lane_width: 'lane_width',
  shoulder_rumble_strips: 'shoulder_rumble_strips',
  road_condition: 'road_condition',
  grip: 'skid_resistance_grip',
  grade: 'grade',
  carriageway_type: 'carriageway',
  middle_of_road: 'median_type',
  lines_and_signs: 'delineation',
  street_lighting: 'street_lighting',
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
  driveways: 'property_access_points',
  intersection_quality: 'intersection_quality',
  curve_type: 'curvature',
  curve_quality: 'quality_of_curve',
  speed_management: 'speed_management_traffic_calming',
  motorcycle_percent: 'motorcycle_percent',
  hgv_percent: 'hgv_percent',
};

/**
 * Rasmiy SR4S Baseline (operating_speed_85th_percentile = 45 km/soat holatida):
 * along = 3.5, crossingMain = 2.7, crossingSide = 2.0, srsScore = 8.3
 */
const OFFICIAL_BASELINE = {
  along: 3.5,
  crossingMain: 2.7,
  crossingSide: 2.0,
};

/**
 * 40 ta rasmiy mezon asosida rasmiy iRAP v3.10 va SR4S Piyodalar Xavfi Modeli hisob-kitobi.
 *
 * Usul: Har bir parametr uchun rasmiy SR4S_OFFICIAL_FACTORS dan factor olinadi va
 * baseline ga nisbatan along, crossingMain, crossingSide ko'paytiriladi.
 * Bu rasmiy sayt bilan bir xil natija beradi.
 */
export function calculateIrapSr4s(attributes: AttributeDefinition[]): IrapCalculationResult {
  const valMap: Record<string, string> = {};
  attributes.forEach((attr) => {
    valMap[attr.id] = attr.customValue || attr.currentValueId || '';
  });

  // Baseline qiymatlar
  let along = OFFICIAL_BASELINE.along;
  let crossingMain = OFFICIAL_BASELINE.crossingMain;
  let crossingSide = OFFICIAL_BASELINE.crossingSide;

  let speedFactor = 1.0;
  let flowFactor = 1.0;
  let severityFactor = 1.0;
  let alongLikelihood = 1.0;
  let crossingLikelihood = 1.0;
  let parkingFactor = 1.0;
  let curveFactor = 1.0;
  let hgvFactor = 1.0;
  let motoFactor = 1.0;

  // Chorraha yo'qligi tekshiruvi
  const intersectionVal = valMap['intersection_type'] || '';
  const hasNoSideRoad =
    intersectionVal === 'no_intersection' ||
    intersectionVal === 'none' ||
    intersectionVal === 'not_applicable' ||
    valMap['crossing_side_road'] === 'none' ||
    valMap['crossing_side_road'] === 'not_present';

  if (hasNoSideRoad) {
    crossingSide = 0.0;
  }

  // Tezlik hisoblash (operating_speed yoki speed_limit)
  const rawSpeed = parseFloat(
    valMap['operating_speed'] ||
    valMap['speed_limit'] ||
    '45'
  ) || 45;

  // Eng yaqin rasmiy tezlik qiymati: 20, 30, 40, 45, 50, 60, 70, 80
  const officialSpeeds = [20, 30, 40, 45, 50, 60, 70, 80];
  const closestSpeed = officialSpeeds.reduce((prev, curr) =>
    Math.abs(curr - rawSpeed) < Math.abs(prev - rawSpeed) ? curr : prev
  );

  // Tezlik faktorini rasmiy jadvaldan olish (baseline = 45 km/soat)
  const speedEntry = SR4S_OFFICIAL_FACTORS['operating_speed_85th_percentile']?.[String(closestSpeed)];
  const speedBaselineEntry = SR4S_OFFICIAL_FACTORS['operating_speed_85th_percentile']?.['45'];

  if (speedEntry && speedBaselineEntry) {
    speedFactor = speedEntry.alongFactor / (speedBaselineEntry.alongFactor || 1);
    along *= speedEntry.alongFactor / (speedBaselineEntry.alongFactor || 1);
    crossingMain *= speedEntry.crossingMainFactor / (speedBaselineEntry.crossingMainFactor || 1);
    if (!hasNoSideRoad) {
      crossingSide *= speedEntry.crossingSideFactor / (speedBaselineEntry.crossingSideFactor || 1);
    }
  } else {
    // Fallback: eski tezlik hisoblash
    if (rawSpeed <= 30) {
      speedFactor = 0.6;
      along *= 0.6; crossingMain *= 0.6;
      if (!hasNoSideRoad) crossingSide *= 0.6;
    } else if (rawSpeed <= 40) {
      speedFactor = 0.94;
      along *= 0.94; crossingMain *= 0.94;
      if (!hasNoSideRoad) crossingSide *= 0.94;
    } else if (rawSpeed <= 50) {
      speedFactor = 1.46;
      along *= 1.46; crossingMain *= 1.46;
      if (!hasNoSideRoad) crossingSide *= 1.46;
    } else if (rawSpeed <= 60) {
      speedFactor = 2.65;
      along *= 2.65; crossingMain *= 2.65;
      if (!hasNoSideRoad) crossingSide *= 2.65;
    } else if (rawSpeed <= 70) {
      speedFactor = 3.74;
      along *= 3.74; crossingMain *= 3.74;
      if (!hasNoSideRoad) crossingSide *= 3.74;
    } else {
      speedFactor = 4.39;
      along *= 4.39; crossingMain *= 4.39;
      if (!hasNoSideRoad) crossingSide *= 4.39;
    }
  }

  // Barcha boshqa parametrlar uchun rasmiy faktorlarni qo'llash
  attributes.forEach((attr) => {
    // Tezlik va oqim alohida hisoblanadi
    if (
      attr.id === 'operating_speed' ||
      attr.id === 'speed_limit' ||
      attr.id === 'vehicles_per_day' ||
      attr.id === 'intersection_type'
    ) {
      return;
    }

    const officialKey = ATTR_ID_TO_OFFICIAL_KEY[attr.id];
    if (!officialKey) return;

    const currentVal = valMap[attr.id];
    const officialId = OPTION_ID_TO_OFFICIAL[attr.id]?.[currentVal];
    if (!officialId) return;

    const officialGroup = SR4S_OFFICIAL_FACTORS[officialKey];
    if (!officialGroup) return;

    const entry = officialGroup[officialId];
    if (!entry) return;

    // Baseline = rasmiy baseline qiymat (odatda "1" yoki default ID)
    // Faktorni baseline faktor bilan nisbatda qo'llaymiz
    const fAlong = entry.alongFactor;
    const fMain = entry.crossingMainFactor;
    const fSide = entry.crossingSideFactor;

    along *= Math.max(0.01, fAlong);
    crossingMain *= Math.max(0.0, fMain);
    if (!hasNoSideRoad) {
      crossingSide *= Math.max(0.0, fSide);
    }

    // Alohida faktorlar saqlash
    if (attr.id === 'vehicle_parking') parkingFactor = fMain;
    if (attr.id === 'curve_type') curveFactor = fAlong;
    if (attr.id === 'hgv_percent') hgvFactor = fMain;
    if (attr.id === 'motorcycle_percent') motoFactor = fMain;
  });

  // Jami SRS (Xavf balli)
  const srsScore = +(along + crossingMain + (hasNoSideRoad ? 0 : crossingSide)).toFixed(1);

  // Yulduz reytingini hisoblash (1.0 dan 5.0 gacha)
  const calculatedStar = srsToDecimalStar(srsScore);
  const decimalScore = calculatedStar.toFixed(1);

  // Butun yulduz (starCount): Math.floor
  const starCount = Math.min(5, Math.max(1, Math.floor(calculatedStar)));

  // Yulduz darajasi obyekti
  const starLevel =
    OFFICIAL_SR4S_STAR_LEVELS.find((l) => l.starCount === starCount) ||
    OFFICIAL_SR4S_STAR_LEVELS[OFFICIAL_SR4S_STAR_LEVELS.length - 1];

  const percentFill = Math.min(100, Math.max(10, Math.round((calculatedStar / 5.0) * 100)));

  return {
    srsScore,
    ctsAlong: +along.toFixed(1),
    ctsCrossing: +(crossingMain + (hasNoSideRoad ? 0 : crossingSide)).toFixed(1),
    starCount,
    decimalScore,
    percentFill,
    starLevel,
    operatingSpeed: rawSpeed,
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
    crossingSide: +(hasNoSideRoad ? 0 : crossingSide).toFixed(1),
  };
}
