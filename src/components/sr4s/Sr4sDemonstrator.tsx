'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/cn';
import {
  Building2,
  Home,
  Store,
  Factory,
  Tractor,
  School as SchoolIcon,
  Trees,
  Navigation,
  Car,
  Eye,
  ShieldAlert,
  Gauge,
  Activity,
  Split,
  Maximize2,
  Sun,
  Footprints,
  Route,
  Compass,
  Zap,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  X,
  Star,
  Info,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface AttributeOption {
  id: string;
  label: string;
  subLabel?: string;
  icon?: any;
  scoreWeight: number; // 1-5 impact rating
  color?: string;
}

export interface AttributeDefinition {
  id: string;
  name: string;
  category: string;
  currentValueId: string;
  options: AttributeOption[];
}

// Initial attributes configuration matching SR4S demonstrator
const INITIAL_ATTRIBUTES: AttributeDefinition[] = [
  // Row 1
  {
    id: 'land_use_left',
    name: 'Yerda foydalanish (Chap)',
    category: 'Muhit',
    currentValueId: 'residential',
    options: [
      { id: 'undeveloped', label: 'Bo‘sh hudud', icon: Trees, scoreWeight: 5 },
      { id: 'residential', label: 'Aholi punkti', icon: Home, scoreWeight: 4 },
      { id: 'commercial', label: 'Tijorat / Bozor', icon: Store, scoreWeight: 3 },
      { id: 'industrial', label: 'Sanoat korxonasi', icon: Factory, scoreWeight: 2 },
      { id: 'farming', label: 'Qishloq xo‘jaligi', icon: Tractor, scoreWeight: 4 },
      { id: 'school', label: 'Maktab hududi', icon: SchoolIcon, scoreWeight: 5 },
    ],
  },
  {
    id: 'land_use_right',
    name: 'Yerda foydalanish (O‘ng)',
    category: 'Muhit',
    currentValueId: 'residential',
    options: [
      { id: 'undeveloped', label: 'Bo‘sh hudud', icon: Trees, scoreWeight: 5 },
      { id: 'residential', label: 'Aholi punkti', icon: Home, scoreWeight: 4 },
      { id: 'commercial', label: 'Tijorat / Bozor', icon: Store, scoreWeight: 3 },
      { id: 'industrial', label: 'Sanoat korxonasi', icon: Factory, scoreWeight: 2 },
      { id: 'farming', label: 'Qishloq xo‘jaligi', icon: Tractor, scoreWeight: 4 },
      { id: 'school', label: 'Maktab hududi', icon: SchoolIcon, scoreWeight: 5 },
    ],
  },
  {
    id: 'area_type',
    name: 'Hudud turi',
    category: 'Muhit',
    currentValueId: 'urban',
    options: [
      { id: 'urban', label: 'Shahar markazi', icon: Building2, scoreWeight: 4 },
      { id: 'rural', label: 'Qishloq / Ochiq', icon: Trees, scoreWeight: 3 },
    ],
  },
  {
    id: 'vehicle_parking',
    name: 'Avtoturargoh',
    category: 'Muhit',
    currentValueId: 'none',
    options: [
      { id: 'none', label: 'Yo‘q (Parking yo‘q)', icon: Car, scoreWeight: 5 },
      { id: 'one_side', label: 'Bir tomonda bor', icon: Car, scoreWeight: 3 },
      { id: 'two_sides', label: 'Ikki tomonda bor', icon: Car, scoreWeight: 1 },
    ],
  },
  {
    id: 'sight_distance',
    name: 'Ko‘rinish masofasi',
    category: 'Muhit',
    currentValueId: 'adequate',
    options: [
      { id: 'adequate', label: 'Yetarli (Yaxshi)', icon: Eye, scoreWeight: 5 },
      { id: 'poor', label: 'Yomon (Cheklangan)', icon: AlertTriangle, scoreWeight: 1 },
    ],
  },
  {
    id: 'number_of_lanes',
    name: 'Tasmalar soni',
    category: 'Yo‘l',
    currentValueId: 'lanes_1_1',
    options: [
      { id: 'lanes_1_1', label: '1 x 1 (Ikkita bo‘lak)', icon: Navigation, scoreWeight: 5 },
      { id: 'lanes_2_2', label: '2 x 2 (To‘rtta bo‘lak)', icon: Navigation, scoreWeight: 3 },
      { id: 'lanes_3_3', label: '3 x 3 va undan ko‘p', icon: Navigation, scoreWeight: 1 },
    ],
  },
  {
    id: 'lane_width',
    name: 'Tasma kengligi',
    category: 'Yo‘l',
    currentValueId: 'wide',
    options: [
      { id: 'wide', label: 'Keng (>3.25m)', icon: Maximize2, scoreWeight: 5 },
      { id: 'medium', label: 'O‘rtacha (2.75m-3.25m)', icon: Maximize2, scoreWeight: 4 },
      { id: 'narrow', label: 'Tor (<2.75m)', icon: Maximize2, scoreWeight: 2 },
    ],
  },
  {
    id: 'shoulder_rumble',
    name: 'Tebranish tasmachalari',
    category: 'Yo‘l',
    currentValueId: 'not_present',
    options: [
      { id: 'present', label: 'Bor (Shovqinli tasmalar)', icon: Activity, scoreWeight: 5 },
      { id: 'not_present', label: 'Yo‘q', icon: XCircle, scoreWeight: 2 },
    ],
  },

  // Row 2
  {
    id: 'road_condition',
    name: 'Yo‘l holati',
    category: 'Yo‘l',
    currentValueId: 'good',
    options: [
      { id: 'good', label: 'Yaxshi (Silliq)', icon: CheckCircle2, scoreWeight: 5 },
      { id: 'medium', label: 'O‘rtacha (Ta’mirtalab)', icon: AlertTriangle, scoreWeight: 3 },
      { id: 'poor', label: 'Yomon (Chuqurchalar bor)', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'grip',
    name: 'Yo‘l ilashishi (Tutqich)',
    category: 'Yo‘l',
    currentValueId: 'good',
    options: [
      { id: 'good', label: 'Yaxshi (A’lo ilashuv)', icon: CheckCircle2, scoreWeight: 5 },
      { id: 'medium', label: 'O‘rtacha ilashuv', icon: AlertTriangle, scoreWeight: 3 },
      { id: 'poor', label: 'Yomon (Silliq / Shag‘al)', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'grade',
    name: 'Yo‘l nishabligi (Baho)',
    category: 'Yo‘l',
    currentValueId: 'flat',
    options: [
      { id: 'flat', label: 'Tekis yo‘l (<7.5%)', icon: ArrowUpDown, scoreWeight: 5 },
      { id: 'slope', label: 'Nishablik yo‘l (≥7.5%)', icon: ArrowUpDown, scoreWeight: 2 },
    ],
  },
  {
    id: 'carriageway_type',
    name: 'Qatnov qismi turi',
    category: 'Yo‘l',
    currentValueId: 'undivided',
    options: [
      { id: 'divided', label: 'Ajratilgan qatnov qismi', icon: Split, scoreWeight: 5 },
      { id: 'undivided', label: 'Ajratilmagan qatnov qismi', icon: Split, scoreWeight: 2 },
    ],
  },
  {
    id: 'middle_of_road',
    name: 'Yo‘lning o‘rtasi',
    category: 'Yo‘l',
    currentValueId: 'centreline',
    options: [
      { id: 'barrier_metal', label: 'Metall to‘siq', icon: ShieldAlert, scoreWeight: 5 },
      { id: 'barrier_concrete', label: 'Beton to‘siq', icon: ShieldAlert, scoreWeight: 5 },
      { id: 'median_separated', label: 'Keng ajratuvchi maysazor', icon: Trees, scoreWeight: 4 },
      { id: 'double_centreline', label: 'Qo‘sh o‘q chiziq', icon: Split, scoreWeight: 3 },
      { id: 'centreline', label: 'Bitta o‘q chiziq', icon: Split, scoreWeight: 2 },
    ],
  },
  {
    id: 'lines_and_signs',
    name: 'Chiziqlar va belgilar',
    category: 'Belgilar',
    currentValueId: 'adequate',
    options: [
      { id: 'adequate', label: 'Qoniqarli (Aniq ko‘rinadi)', icon: CheckCircle2, scoreWeight: 5 },
      { id: 'poor', label: 'Qoniqarsiz (Eskirgan/Yo‘q)', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'street_lighting',
    name: 'Ko‘cha yoritgichi',
    category: 'Belgilar',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Yoritilgan)', icon: Sun, scoreWeight: 5 },
      { id: 'not_present', label: 'Yo‘q (Yoritilmagan)', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'school_warning',
    name: 'Maktab ogohlantirishi',
    category: 'Maktab',
    currentValueId: 'flashing_beacon',
    options: [
      { id: 'flashing_beacon', label: 'Miltillovchi T.7 svetofori va belgilari bor', icon: ShieldAlert, scoreWeight: 5 },
      { id: 'signs_only', label: 'Ogohlantirish belgilari bor', icon: ShieldAlert, scoreWeight: 3 },
      { id: 'none', label: 'Ogohlantirish belgilari yo‘q', icon: XCircle, scoreWeight: 1 },
    ],
  },

  // Row 3
  {
    id: 'crossing_supervisor',
    name: 'Piyodalar patruli (Nazoratchi)',
    category: 'Maktab',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Dars vaqtlarida navbatchilik bor)', icon: Users, scoreWeight: 5 },
      { id: 'not_present', label: 'Yo‘q', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'sidewalk_left',
    name: 'Piyodalar yo‘lagi (Chap)',
    category: 'Piyoda',
    currentValueId: 'behind_barrier',
    options: [
      { id: 'behind_barrier', label: 'Panjara/To‘siq ortida', icon: Footprints, scoreWeight: 5 },
      { id: 'separated', label: 'Qatnov qismidan ajratilgan (≥1m)', icon: Footprints, scoreWeight: 4 },
      { id: 'adjacent', label: 'Qatnov qismiga yondosh (<1m)', icon: Footprints, scoreWeight: 2 },
      { id: 'none', label: 'Piyodalar yo‘lagi yo‘q', icon: XCircle, scoreWeight: 0 },
    ],
  },
  {
    id: 'sidewalk_right',
    name: 'Piyodalar yo‘lagi (O‘ng)',
    category: 'Piyoda',
    currentValueId: 'behind_barrier',
    options: [
      { id: 'behind_barrier', label: 'Panjara/To‘siq ortida', icon: Footprints, scoreWeight: 5 },
      { id: 'separated', label: 'Qatnov qismidan ajratilgan (≥1m)', icon: Footprints, scoreWeight: 4 },
      { id: 'adjacent', label: 'Qatnov qismiga yondosh (<1m)', icon: Footprints, scoreWeight: 2 },
      { id: 'none', label: 'Piyodalar yo‘lagi yo‘q', icon: XCircle, scoreWeight: 0 },
    ],
  },
  {
    id: 'road_edge_left',
    name: 'Chetki tasma (Chap)',
    category: 'Piyoda',
    currentValueId: 'wide',
    options: [
      { id: 'wide', label: 'Keng chetki tasma (≥2.4m)', icon: Maximize2, scoreWeight: 5 },
      { id: 'narrow', label: 'Tor chetki tasma (0.75m-1m)', icon: Maximize2, scoreWeight: 3 },
      { id: 'none', label: 'Chetki tasma yo‘q', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'road_edge_right',
    name: 'Chetki tasma (O‘ng)',
    category: 'Piyoda',
    currentValueId: 'wide',
    options: [
      { id: 'wide', label: 'Keng chetki tasma (≥2.4m)', icon: Maximize2, scoreWeight: 5 },
      { id: 'narrow', label: 'Tor chetki tasma (0.75m-1m)', icon: Maximize2, scoreWeight: 3 },
      { id: 'none', label: 'Chetki tasma yo‘q', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'pedestrian_channelisation',
    name: 'Piyodalar panjarasi',
    category: 'Piyoda',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Muhofaza panjaralari mavjud)', icon: ShieldAlert, scoreWeight: 5 },
      { id: 'not_present', label: 'Yo‘q', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'crossing_main_road',
    name: 'Asosiy yo‘lda o‘tish joyi',
    category: 'O‘tish joyi',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Piyodalar o‘tish joyi mavjud)', icon: Route, scoreWeight: 5 },
      { id: 'not_present', label: 'Yo‘q', icon: XCircle, scoreWeight: 0 },
    ],
  },
  {
    id: 'crossing_side_road',
    name: 'Yon yo‘lda o‘tish joyi',
    category: 'O‘tish joyi',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor', icon: Route, scoreWeight: 5 },
      { id: 'not_present', label: 'Yo‘q', icon: XCircle, scoreWeight: 1 },
    ],
  },

  // Row 4
  {
    id: 'crossing_quality',
    name: 'O‘tish joyi sifati',
    category: 'O‘tish joyi',
    currentValueId: 'adequate',
    options: [
      { id: 'adequate', label: 'Qoniqarli (A’lo yoritilgan va ko‘rinadi)', icon: CheckCircle2, scoreWeight: 5 },
      { id: 'poor', label: 'Yomon (Tushnarsiz yoki ta’mirtalab)', icon: XCircle, scoreWeight: 1 },
    ],
  },
  {
    id: 'speed_limit',
    name: 'Tezlik cheklovi',
    category: 'Tezlik',
    currentValueId: 'speed_30',
    options: [
      { id: 'speed_30', label: '30 km/soat yoki undan past', icon: Zap, scoreWeight: 5 },
      { id: 'speed_40', label: '40 km/soat', icon: Zap, scoreWeight: 4 },
      { id: 'speed_50', label: '50 km/soat', icon: Zap, scoreWeight: 2 },
      { id: 'speed_60plus', label: '60 km/soat va undan yuqori', icon: Zap, scoreWeight: 0 },
    ],
  },
  {
    id: 'speed_management',
    name: 'Tezlikni pasaytirish vositasi',
    category: 'Tezlik',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Sun’iy notekislik - lejaщiy politseyskiy)', icon: CheckCircle2, scoreWeight: 5 },
      { id: 'not_present', label: 'Yo‘q', icon: XCircle, scoreWeight: 0 },
    ],
  },
];

export function Sr4sDemonstrator() {
  const [attributes, setAttributes] = useState<AttributeDefinition[]>(INITIAL_ATTRIBUTES);
  const [activeAttrId, setActiveAttrId] = useState<string | null>(null);

  // Dynamic live calculation of Star Rating & score
  const { starRating, scorePercentage, statusBadge } = useMemo(() => {
    let totalScore = 0;
    let maxTotal = attributes.length * 5;

    attributes.forEach((attr) => {
      const selectedOpt = attr.options.find((o) => o.id === attr.currentValueId);
      totalScore += selectedOpt ? selectedOpt.scoreWeight : 3;
    });

    const pct = Math.round((totalScore / maxTotal) * 100);
    // Convert pct (0-100) to SR4S Star Rating (1.0 to 5.0)
    let star = Number((1 + (pct / 100) * 4).toFixed(1));
    if (star > 5.0) star = 5.0;

    let badgeText = 'O‘rtacha Xavfsiz';
    let badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';

    if (star >= 4.0) {
      badgeText = 'A’lo — Xavfsiz Maktab Zonasi';
      badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    } else if (star < 3.0) {
      badgeText = 'Yuqori Xavf — Ta’mir va Himoya Talab';
      badgeClass = 'bg-rose-50 text-rose-800 border-rose-200';
    }

    return {
      starRating: star,
      scorePercentage: pct,
      statusBadge: { text: badgeText, className: badgeClass },
    };
  }, [attributes]);

  const activeAttr = useMemo(
    () => attributes.find((a) => a.id === activeAttrId),
    [attributes, activeAttrId]
  );

  const handleSelectOption = (attrId: string, optionId: string) => {
    setAttributes((prev) =>
      prev.map((a) => (a.id === attrId ? { ...a, currentValueId: optionId } : a))
    );
    setActiveAttrId(null);
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Top Header Banner */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-slate-950 font-black shadow-lg shadow-teal-500/20">
            <Star className="h-6 w-6 fill-slate-950" />
          </div>
          <div>
            <div className="text-[11px] font-mono font-bold tracking-widest text-teal-400 uppercase">
              XALQARO iRAP SR4S STANDARTI
            </div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Maktab Yo‘l Xavfsizligi Interaktiv Kalkulyatori
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Status:</span>
          <span className={cn('px-3 py-1 rounded-xl text-xs font-bold border', statusBadge.className)}>
            {statusBadge.text}
          </span>
        </div>
      </div>

      {/* Main Grid: Left Star Display + Right Attribute Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        {/* Left Side: Live Star Rating Display */}
        <div className="lg:col-span-5 p-8 bg-slate-950/80 border-r border-slate-800 flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-2 max-w-sm">
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              O‘ng tomondagi har bir ko‘rsatkich tugmasini bosing va maktab yo‘li xavfsizlik bali o‘zgarishini kuzating:
            </p>
          </div>

          {/* Children Illustration Placeholder / Icon */}
          <div className="relative py-4">
            <div className="flex items-center justify-center h-32 w-32 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 mx-auto shadow-2xl animate-pulse">
              <SchoolIcon className="h-16 w-16" />
            </div>
          </div>

          {/* Star Rating Display */}
          <div className="space-y-3">
            {/* 5-Star Visual Row */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => {
                const filled = starRating >= s;
                const half = starRating > s - 1 && starRating < s;
                return (
                  <Star
                    key={s}
                    className={cn(
                      'w-8 h-8 transition-all transform hover:scale-110',
                      filled
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                        : half
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'text-slate-700'
                    )}
                  />
                );
              })}
            </div>

            {/* Decimal Score Text */}
            <div>
              <div className="text-3xl font-black text-white tracking-tight">
                {starRating} <span className="text-sm font-normal text-slate-400">/ 5.0 Yulduz</span>
              </div>
              <div className="text-xs font-mono font-bold text-teal-400 mt-1">
                Umumiy Indeks: {scorePercentage}% Xavfsizlik
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 w-full max-w-xs text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-500 shrink-0" />
            <span>Xalqaro iRAP SR4S "Star Rating for Schools" metodikasi</span>
          </div>
        </div>

        {/* Right Side: Attribute Grid Tiles */}
        <div className="lg:col-span-7 p-6 bg-slate-900 overflow-y-auto max-h-[680px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {attributes.map((attr) => {
              const currentOpt = attr.options.find((o) => o.id === attr.currentValueId) || attr.options[0];
              const IconComp = currentOpt.icon || CriterionIconFallback(attr.id);

              return (
                <button
                  key={attr.id}
                  type="button"
                  onClick={() => setActiveAttrId(attr.id)}
                  className="flex flex-col items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-teal-500 hover:bg-slate-900/90 transition-all text-center group cursor-pointer shadow-sm relative overflow-hidden"
                >
                  {/* Top Badge label */}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400/90 truncate max-w-full mb-2">
                    {currentOpt.label}
                  </span>

                  {/* Center Icon */}
                  <div className="my-1.5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all shadow-inner border border-teal-500/20">
                    <IconComp className="h-6 w-6" />
                  </div>

                  {/* Bottom Attribute Name */}
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white leading-tight mt-2 line-clamp-2">
                    {attr.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Option Picker Modal (Popup when a tile is clicked) */}
      {activeAttr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 relative text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-teal-400 uppercase">
                  PARAMETR KIRSHTIRISH
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  {activeAttr.name}
                </h3>
              </div>

              <button
                onClick={() => setActiveAttrId(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Option Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {activeAttr.options.map((opt) => {
                const isSelected = activeAttr.currentValueId === opt.id;
                const OptIcon = opt.icon || CriterionIconFallback(activeAttr.id);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(activeAttr.id, opt.id)}
                    className={cn(
                      'flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all cursor-pointer group space-y-2',
                      isSelected
                        ? 'border-teal-500 bg-teal-500/20 text-white ring-2 ring-teal-500/40'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl transition-all',
                        isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-teal-400 group-hover:scale-110'
                      )}
                    >
                      <OptIcon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-bold leading-tight">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CriterionIconFallback(id: string) {
  if (id.includes('land')) return Home;
  if (id.includes('lane')) return Navigation;
  if (id.includes('sidewalk')) return Footprints;
  if (id.includes('speed')) return Zap;
  if (id.includes('crossing')) return Route;
  return Building2;
}
