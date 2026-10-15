import { RoadType } from '@/types';

export interface RoadTypeMeta {
  id: RoadType;
  name: string;
  fullName: string;
  label: string;
  shortName: string;
  description: string;
  speedLimit: string;
  badgeClass: string;
  darkBadgeClass: string;
  borderClass: string;
  icon: string;
  colorHex: string;
}

export const ROAD_TYPES: RoadType[] = ['INTERNATIONAL', 'NATIONAL', 'LOCAL', 'URBAN'];

export const ROAD_TYPES_DATA: Record<RoadType, RoadTypeMeta> = {
  INTERNATIONAL: {
    id: 'INTERNATIONAL',
    name: 'Xalqaro ahamiyatdagi yo‘l',
    fullName: 'Xalqaro ahamiyatdagi yo‘l',
    label: 'Xalqaro yo‘l',
    shortName: 'Xalqaro yo‘l',
    description: 'Yuqori tezlikdagi tranzit xalqaro avtomagistral (M-39, M-37...)',
    speedLimit: '50 - 70 km/s (maktab zonasida 30 km/s majburiy)',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-300',
    darkBadgeClass: 'bg-blue-950/70 text-blue-300 border-blue-800',
    borderClass: 'border-blue-500',
    icon: '🚗',
    colorHex: '#2563eb',
  },
  NATIONAL: {
    id: 'NATIONAL',
    name: 'Davlat ahamiyatidagi yo‘l',
    fullName: 'Davlat ahamiyatidagi yo‘l',
    label: 'Davlat yo‘li',
    shortName: 'Davlat yo‘li',
    description: 'Viloyatlararo va respublika ahamiyatidagi magistral (A-373, 4R...)',
    speedLimit: '40 - 60 km/s (maktab zonasida 30 km/s majburiy)',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-300',
    darkBadgeClass: 'bg-teal-950/70 text-teal-300 border-teal-800',
    borderClass: 'border-teal-500',
    icon: '🛣',
    colorHex: '#0d9488',
  },
  LOCAL: {
    id: 'LOCAL',
    name: 'Mahalliy ahamiyatdagi yo‘l',
    fullName: 'Mahalliy ahamiyatdagi yo‘l',
    label: 'Mahalliy yo‘l',
    shortName: 'Mahalliy yo‘l',
    description: 'Tumanlararo va qishloq hududlari orqali o‘tuvchi bog‘lovchi yo‘l',
    speedLimit: '30 - 50 km/s (maktab zonasida 30 km/s)',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
    darkBadgeClass: 'bg-amber-950/70 text-amber-300 border-amber-800',
    borderClass: 'border-amber-500',
    icon: '🏘',
    colorHex: '#d97706',
  },
  URBAN: {
    id: 'URBAN',
    name: 'Shahar va qishloq ichki ko‘chasi',
    fullName: 'Shahar va qishloq ichki ko‘chasi',
    label: 'Shahar yo‘li',
    shortName: 'Shahar yo‘li',
    description: 'Shahar, posyolka va aholi punktlari ichidagi serqatnov ko‘chalar',
    speedLimit: '30 - 50 km/s (maktab zonasida 30 km/s)',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    darkBadgeClass: 'bg-slate-800 text-slate-300 border-slate-700',
    borderClass: 'border-slate-500',
    icon: '🏙',
    colorHex: '#475569',
  },
};

export const ROAD_TYPES_LIST: RoadTypeMeta[] = [
  ROAD_TYPES_DATA.INTERNATIONAL,
  ROAD_TYPES_DATA.NATIONAL,
  ROAD_TYPES_DATA.LOCAL,
  ROAD_TYPES_DATA.URBAN,
];

export function getRoadTypeMeta(roadType?: RoadType | string | null): RoadTypeMeta {
  if (!roadType) return ROAD_TYPES_DATA.URBAN;
  const key = String(roadType).toUpperCase() as RoadType;
  return ROAD_TYPES_DATA[key] || ROAD_TYPES_DATA.URBAN;
}
