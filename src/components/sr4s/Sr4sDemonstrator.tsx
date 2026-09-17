'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/cn';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
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
  Zap,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  X,
  Star,
  Info,
  ArrowUpDown,
  Truck,
  Bike,
  GitFork,
  HelpCircle,
  Save,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react';

export interface AttributeOption {
  id: string;
  label: string;
  subLabel?: string;
  scoreWeight: number; // 1-5 impact rating
  renderIcon?: () => React.ReactNode;
}

export interface AttributeDefinition {
  id: string;
  name: string;
  category: string;
  currentValueId: string;
  options: AttributeOption[];
}

// Rich Custom SVG Icon Components with enhanced visual styling
function SpeedSignIcon({ limit }: { limit: string }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-rose-600 font-extrabold text-slate-950 font-mono text-[11px] shadow-md group-hover:scale-110 transition-transform duration-200">
      {limit}
    </div>
  );
}

function SchoolSignIcon() {
  return (
    <div className="w-8 h-8 bg-amber-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 font-black shadow-md rounded-md group-hover:scale-110 transition-transform duration-200">
      <SchoolIcon className="w-5 h-5 text-slate-950" />
    </div>
  );
}

function ZebraCrossingIcon() {
  return (
    <div className="w-9 h-9 bg-slate-800 rounded-xl p-1 flex flex-col justify-between border border-slate-700 shadow-md group-hover:scale-110 transition-transform duration-200">
      <div className="h-1.5 w-full bg-white rounded-xs shadow-2xs" />
      <div className="h-1.5 w-full bg-white rounded-xs shadow-2xs" />
      <div className="h-1.5 w-full bg-white rounded-xs shadow-2xs" />
    </div>
  );
}

function DividedRoadIcon() {
  return (
    <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-between px-1 border border-slate-700 shadow-md group-hover:scale-110 transition-transform duration-200">
      <div className="w-2.5 h-full bg-slate-700 border-r border-dashed border-slate-400" />
      <div className="w-1.5 h-full bg-emerald-500 shadow-sm" />
      <div className="w-2.5 h-full bg-slate-700 border-l border-dashed border-slate-400" />
    </div>
  );
}

function SidewalkIcon() {
  return (
    <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-between p-1 border border-slate-700 shadow-md group-hover:scale-110 transition-transform duration-200">
      <div className="w-3 h-full bg-emerald-600 rounded-xs flex items-center justify-center">
        <Footprints className="w-3 h-3 text-white" />
      </div>
      <div className="w-4 h-full bg-slate-700 border-l border-white/40" />
    </div>
  );
}

function SpeedBumpIcon() {
  return (
    <div className="w-9 h-9 bg-slate-800 rounded-xl flex flex-col items-center justify-center p-1 border border-slate-700 shadow-md group-hover:scale-110 transition-transform duration-200">
      <div className="w-full h-2.5 bg-amber-500 rounded-full border border-amber-300 shadow-xs" />
    </div>
  );
}

function RoundaboutIcon() {
  return (
    <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-md group-hover:scale-110 transition-transform duration-200">
      <div className="w-5 h-5 rounded-full border-2 border-dashed border-teal-400 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
      </div>
    </div>
  );
}

// ALL 40 OFFICIAL SR4S ATTRIBUTES
const FULL_40_ATTRIBUTES: AttributeDefinition[] = [
  // ROW 1 (1-8)
  {
    id: 'land_use_left',
    name: 'Yerda foydalanish (Chap)',
    category: 'Muhit',
    currentValueId: 'residential',
    options: [
      { id: 'undeveloped', label: 'Bo‘sh hudud', scoreWeight: 5, renderIcon: () => <Trees className="w-5 h-5 text-emerald-400" /> },
      { id: 'residential', label: 'Aholi punkti', scoreWeight: 4, renderIcon: () => <Home className="w-5 h-5 text-teal-400" /> },
      { id: 'commercial', label: 'Tijorat / Bozor', scoreWeight: 3, renderIcon: () => <Store className="w-5 h-5 text-amber-400" /> },
      { id: 'industrial', label: 'Sanoat korxonasi', scoreWeight: 2, renderIcon: () => <Factory className="w-5 h-5 text-slate-400" /> },
      { id: 'farming', label: 'Qishloq xo‘jaligi', scoreWeight: 4, renderIcon: () => <Tractor className="w-5 h-5 text-lime-400" /> },
      { id: 'school', label: 'Maktab hududi', scoreWeight: 5, renderIcon: () => <SchoolIcon className="w-5 h-5 text-teal-300" /> },
    ],
  },
  {
    id: 'land_use_right',
    name: 'Yerda foydalanish (O‘ng)',
    category: 'Muhit',
    currentValueId: 'residential',
    options: [
      { id: 'undeveloped', label: 'Bo‘sh hudud', scoreWeight: 5, renderIcon: () => <Trees className="w-5 h-5 text-emerald-400" /> },
      { id: 'residential', label: 'Aholi punkti', scoreWeight: 4, renderIcon: () => <Home className="w-5 h-5 text-teal-400" /> },
      { id: 'commercial', label: 'Tijorat / Bozor', scoreWeight: 3, renderIcon: () => <Store className="w-5 h-5 text-amber-400" /> },
      { id: 'industrial', label: 'Sanoat korxonasi', scoreWeight: 2, renderIcon: () => <Factory className="w-5 h-5 text-slate-400" /> },
      { id: 'farming', label: 'Qishloq xo‘jaligi', scoreWeight: 4, renderIcon: () => <Tractor className="w-5 h-5 text-lime-400" /> },
      { id: 'school', label: 'Maktab hududi', scoreWeight: 5, renderIcon: () => <SchoolIcon className="w-5 h-5 text-teal-300" /> },
    ],
  },
  {
    id: 'area_type',
    name: 'Hudud turi',
    category: 'Muhit',
    currentValueId: 'urban',
    options: [
      { id: 'urban', label: 'Shahar markazi', scoreWeight: 4, renderIcon: () => <Building2 className="w-5 h-5 text-teal-400" /> },
      { id: 'rural', label: 'Qishloq / Ochiq', scoreWeight: 3, renderIcon: () => <Trees className="w-5 h-5 text-emerald-400" /> },
    ],
  },
  {
    id: 'vehicle_parking',
    name: 'Avtoturargoh',
    category: 'Muhit',
    currentValueId: 'none',
    options: [
      { id: 'none', label: 'Yo‘q (Parking yo‘q)', scoreWeight: 5, renderIcon: () => <XCircle className="w-5 h-5 text-emerald-400" /> },
      { id: 'one_side', label: 'Bir tomonda bor', scoreWeight: 3, renderIcon: () => <Car className="w-5 h-5 text-amber-400" /> },
      { id: 'two_sides', label: 'Ikki tomonda bor', scoreWeight: 1, renderIcon: () => <Car className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'sight_distance',
    name: 'Ko‘rinish masofasi',
    category: 'Muhit',
    currentValueId: 'adequate',
    options: [
      { id: 'adequate', label: 'Yetarli (Yaxshi)', scoreWeight: 5, renderIcon: () => <Eye className="w-5 h-5 text-emerald-400" /> },
      { id: 'poor', label: 'Yomon (Cheklangan)', scoreWeight: 1, renderIcon: () => <AlertTriangle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'number_of_lanes',
    name: 'Tasmalar soni',
    category: 'Yo‘l',
    currentValueId: 'lanes_1_1',
    options: [
      { id: 'lanes_1_1', label: '1 x 1 (Ikkita bo‘lak)', scoreWeight: 5, renderIcon: () => <Navigation className="w-5 h-5 text-teal-400" /> },
      { id: 'lanes_2_2', label: '2 x 2 (To‘rtta bo‘lak)', scoreWeight: 3, renderIcon: () => <Navigation className="w-5 h-5 text-amber-400" /> },
      { id: 'lanes_3_3', label: '3 x 3 va undan ko‘p', scoreWeight: 1, renderIcon: () => <Navigation className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'lane_width',
    name: 'Tasma kengligi',
    category: 'Yo‘l',
    currentValueId: 'wide',
    options: [
      { id: 'wide', label: 'Keng (>3.25m)', scoreWeight: 5, renderIcon: () => <Maximize2 className="w-5 h-5 text-teal-400" /> },
      { id: 'medium', label: 'O‘rtacha (2.75m-3.25m)', scoreWeight: 4, renderIcon: () => <Maximize2 className="w-5 h-5 text-amber-400" /> },
      { id: 'narrow', label: 'Tor (<2.75m)', scoreWeight: 2, renderIcon: () => <Maximize2 className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'shoulder_rumble',
    name: 'Tebranish tasmachalari',
    category: 'Yo‘l',
    currentValueId: 'not_present',
    options: [
      { id: 'present', label: 'Bor (Shovqinli tasmalar)', scoreWeight: 5, renderIcon: () => <Activity className="w-5 h-5 text-emerald-400" /> },
      { id: 'not_present', label: 'Yo‘q', scoreWeight: 2, renderIcon: () => <XCircle className="w-5 h-5 text-slate-400" /> },
    ],
  },

  // ROW 2 (9-16)
  {
    id: 'road_condition',
    name: 'Yo‘l holati',
    category: 'Yo‘l',
    currentValueId: 'good',
    options: [
      { id: 'good', label: 'Yaxshi (Silliq)', scoreWeight: 5, renderIcon: () => <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
      { id: 'medium', label: 'O‘rtacha (Ta’mirtalab)', scoreWeight: 3, renderIcon: () => <AlertTriangle className="w-5 h-5 text-amber-400" /> },
      { id: 'poor', label: 'Yomon (Chuqurchalar bor)', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'grip',
    name: 'Yo‘l ilashishi (Tutqich)',
    category: 'Yo‘l',
    currentValueId: 'good',
    options: [
      { id: 'good', label: 'Yaxshi (A’lo ilashuv)', scoreWeight: 5, renderIcon: () => <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
      { id: 'medium', label: 'O‘rtacha ilashuv', scoreWeight: 3, renderIcon: () => <AlertTriangle className="w-5 h-5 text-amber-400" /> },
      { id: 'poor', label: 'Yomon (Silliq / Shag‘al)', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'grade',
    name: 'Yo‘l nishabligi (Baho)',
    category: 'Yo‘l',
    currentValueId: 'flat',
    options: [
      { id: 'flat', label: 'Tekis yo‘l (<7.5%)', scoreWeight: 5, renderIcon: () => <ArrowUpDown className="w-5 h-5 text-teal-400" /> },
      { id: 'slope', label: 'Nishablik yo‘l (≥7.5%)', scoreWeight: 2, renderIcon: () => <ArrowUpDown className="w-5 h-5 text-amber-400" /> },
    ],
  },
  {
    id: 'carriageway_type',
    name: 'Qatnov qismi turi',
    category: 'Yo‘l',
    currentValueId: 'undivided',
    options: [
      { id: 'divided', label: 'Ajratilgan qatnov qismi', scoreWeight: 5, renderIcon: DividedRoadIcon },
      { id: 'undivided', label: 'Ajratilmagan qatnov qismi', scoreWeight: 2, renderIcon: () => <Split className="w-5 h-5 text-slate-400" /> },
    ],
  },
  {
    id: 'middle_of_road',
    name: 'Yo‘lning o‘rtasi',
    category: 'Yo‘l',
    currentValueId: 'centreline',
    options: [
      { id: 'barrier_metal', label: 'Metall to‘siq', scoreWeight: 5, renderIcon: () => <ShieldAlert className="w-5 h-5 text-teal-400" /> },
      { id: 'barrier_concrete', label: 'Beton to‘siq', scoreWeight: 5, renderIcon: () => <ShieldAlert className="w-5 h-5 text-slate-300" /> },
      { id: 'median_separated', label: 'Keng ajratuvchi maysazor', scoreWeight: 4, renderIcon: () => <Trees className="w-5 h-5 text-emerald-400" /> },
      { id: 'double_centreline', label: 'Qo‘sh o‘q chiziq', scoreWeight: 3, renderIcon: () => <Split className="w-5 h-5 text-amber-400" /> },
      { id: 'centreline', label: 'Bitta o‘q chiziq', scoreWeight: 2, renderIcon: () => <Split className="w-5 h-5 text-slate-400" /> },
    ],
  },
  {
    id: 'lines_and_signs',
    name: 'Chiziqlar va belgilar',
    category: 'Belgilar',
    currentValueId: 'adequate',
    options: [
      { id: 'adequate', label: 'Qoniqarli (Aniq ko‘rinadi)', scoreWeight: 5, renderIcon: () => <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
      { id: 'poor', label: 'Qoniqarsiz (Eskirgan/Yo‘q)', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'street_lighting',
    name: 'Ko‘cha yoritgichi',
    category: 'Belgilar',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Yoritilgan)', scoreWeight: 5, renderIcon: () => <Sun className="w-5 h-5 text-amber-400" /> },
      { id: 'not_present', label: 'Yo‘q (Yoritilmagan)', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-slate-400" /> },
    ],
  },
  {
    id: 'school_warning',
    name: 'Maktab ogohlantirishi',
    category: 'Maktab',
    currentValueId: 'flashing_beacon',
    options: [
      { id: 'flashing_beacon', label: 'Miltillovchi T.7 svetofori va belgilari bor', scoreWeight: 5, renderIcon: SchoolSignIcon },
      { id: 'signs_only', label: 'Ogohlantirish belgilari bor', scoreWeight: 3, renderIcon: () => <ShieldAlert className="w-5 h-5 text-amber-400" /> },
      { id: 'none', label: 'Ogohlantirish belgilari yo‘q', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },

  // ROW 3 (17-24)
  {
    id: 'crossing_supervisor',
    name: 'Piyodalar patruli (Nazoratchi)',
    category: 'Maktab',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Dars vaqtlarida navbatchilik bor)', scoreWeight: 5, renderIcon: () => <Users className="w-5 h-5 text-teal-400" /> },
      { id: 'not_present', label: 'Yo‘q', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-slate-400" /> },
    ],
  },
  {
    id: 'sidewalk_left',
    name: 'Piyodalar yo‘lagi (Chap)',
    category: 'Piyoda',
    currentValueId: 'behind_barrier',
    options: [
      { id: 'behind_barrier', label: 'Panjara/To‘siq ortida', scoreWeight: 5, renderIcon: SidewalkIcon },
      { id: 'separated', label: 'Qatnov qismidan ajratilgan (≥1m)', scoreWeight: 4, renderIcon: () => <Footprints className="w-5 h-5 text-emerald-400" /> },
      { id: 'adjacent', label: 'Qatnov qismiga yondosh (<1m)', scoreWeight: 2, renderIcon: () => <Footprints className="w-5 h-5 text-amber-400" /> },
      { id: 'none', label: 'Piyodalar yo‘lagi yo‘q', scoreWeight: 0, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'sidewalk_right',
    name: 'Piyodalar yo‘lagi (O‘ng)',
    category: 'Piyoda',
    currentValueId: 'behind_barrier',
    options: [
      { id: 'behind_barrier', label: 'Panjara/To‘siq ortida', scoreWeight: 5, renderIcon: SidewalkIcon },
      { id: 'separated', label: 'Qatnov qismidan ajratilgan (≥1m)', scoreWeight: 4, renderIcon: () => <Footprints className="w-5 h-5 text-emerald-400" /> },
      { id: 'adjacent', label: 'Qatnov qismiga yondosh (<1m)', scoreWeight: 2, renderIcon: () => <Footprints className="w-5 h-5 text-amber-400" /> },
      { id: 'none', label: 'Piyodalar yo‘lagi yo‘q', scoreWeight: 0, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'road_edge_left',
    name: 'Chetki tasma (Chap)',
    category: 'Piyoda',
    currentValueId: 'wide',
    options: [
      { id: 'wide', label: 'Keng chetki tasma (≥2.4m)', scoreWeight: 5, renderIcon: () => <Maximize2 className="w-5 h-5 text-teal-400" /> },
      { id: 'narrow', label: 'Tor chetki tasma (0.75m-1m)', scoreWeight: 3, renderIcon: () => <Maximize2 className="w-5 h-5 text-amber-400" /> },
      { id: 'none', label: 'Chetki tasma yo‘q', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'road_edge_right',
    name: 'Chetki tasma (O‘ng)',
    category: 'Piyoda',
    currentValueId: 'wide',
    options: [
      { id: 'wide', label: 'Keng chetki tasma (≥2.4m)', scoreWeight: 5, renderIcon: () => <Maximize2 className="w-5 h-5 text-teal-400" /> },
      { id: 'narrow', label: 'Tor chetki tasma (0.75m-1m)', scoreWeight: 3, renderIcon: () => <Maximize2 className="w-5 h-5 text-amber-400" /> },
      { id: 'none', label: 'Chetki tasma yo‘q', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'pedestrian_channelisation',
    name: 'Piyodalar panjarasi',
    category: 'Piyoda',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Muhofaza panjaralari mavjud)', scoreWeight: 5, renderIcon: () => <ShieldAlert className="w-5 h-5 text-emerald-400" /> },
      { id: 'not_present', label: 'Yo‘q', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-slate-400" /> },
    ],
  },
  {
    id: 'crossing_main_road',
    name: 'Asosiy yo‘lda o‘tish joyi',
    category: 'O‘tish joyi',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Piyodalar o‘tish joyi mavjud)', scoreWeight: 5, renderIcon: ZebraCrossingIcon },
      { id: 'not_present', label: 'Yo‘q', scoreWeight: 0, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'crossing_side_road',
    name: 'Yon yo‘lda o‘tish joyi',
    category: 'O‘tish joyi',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor', scoreWeight: 5, renderIcon: ZebraCrossingIcon },
      { id: 'not_present', label: 'Yo‘q', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-slate-400" /> },
    ],
  },

  // ROW 4 (25-32)
  {
    id: 'crossing_quality',
    name: 'O‘tish joyi sifati',
    category: 'O‘tish joyi',
    currentValueId: 'adequate',
    options: [
      { id: 'adequate', label: 'Qoniqarli (A’lo yoritilgan va ko‘rinadi)', scoreWeight: 5, renderIcon: () => <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
      { id: 'poor', label: 'Yomon (Tushnarsiz yoki ta’mirtalab)', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'vehicles_per_day',
    name: 'Kunlik avtomobillar soni',
    category: 'Oqim',
    currentValueId: 'high',
    options: [
      { id: 'high', label: '10 000 dan ko‘p (Yuqori oqim)', scoreWeight: 1, renderIcon: () => <Car className="w-5 h-5 text-rose-400" /> },
      { id: 'med_high', label: '5 000 - 10 000', scoreWeight: 2, renderIcon: () => <Car className="w-5 h-5 text-amber-400" /> },
      { id: 'medium', label: '1 000 - 5 000', scoreWeight: 4, renderIcon: () => <Car className="w-5 h-5 text-teal-400" /> },
      { id: 'low', label: '1 000 dan kam (Past oqim)', scoreWeight: 5, renderIcon: () => <Car className="w-5 h-5 text-emerald-400" /> },
    ],
  },
  {
    id: 'crossing_flow',
    name: 'Piyodalar o‘tish oqimi',
    category: 'Oqim',
    currentValueId: 'medium',
    options: [
      { id: 'high', label: 'Yuqori piyodalar oqimi', scoreWeight: 5, renderIcon: () => <Users className="w-5 h-5 text-teal-400" /> },
      { id: 'medium', label: 'O‘rtacha piyodalar oqimi', scoreWeight: 3, renderIcon: () => <Users className="w-5 h-5 text-amber-400" /> },
      { id: 'low', label: 'Past oqim', scoreWeight: 2, renderIcon: () => <Users className="w-5 h-5 text-slate-400" /> },
    ],
  },
  {
    id: 'right_side_flow',
    name: 'O‘ng tomondagi piyodalar oqimi',
    category: 'Oqim',
    currentValueId: 'medium',
    options: [
      { id: 'high', label: 'Yuqori oqim', scoreWeight: 5, renderIcon: () => <Users className="w-5 h-5 text-teal-400" /> },
      { id: 'medium', label: 'O‘rtacha oqim', scoreWeight: 3, renderIcon: () => <Users className="w-5 h-5 text-amber-400" /> },
      { id: 'low', label: 'Past oqim', scoreWeight: 2, renderIcon: () => <Users className="w-5 h-5 text-slate-400" /> },
    ],
  },
  {
    id: 'left_side_flow',
    name: 'Chap tomondagi piyodalar oqimi',
    category: 'Oqim',
    currentValueId: 'medium',
    options: [
      { id: 'high', label: 'Yuqori oqim', scoreWeight: 5, renderIcon: () => <Users className="w-5 h-5 text-teal-400" /> },
      { id: 'medium', label: 'O‘rtacha oqim', scoreWeight: 3, renderIcon: () => <Users className="w-5 h-5 text-amber-400" /> },
      { id: 'low', label: 'Past oqim', scoreWeight: 2, renderIcon: () => <Users className="w-5 h-5 text-slate-400" /> },
    ],
  },
  {
    id: 'intersection_type',
    name: 'Chorraha turi',
    category: 'Chorraha',
    currentValueId: 'none',
    options: [
      { id: 'none', label: 'Chorraha emas (To‘g‘ri yo‘l)', scoreWeight: 5, renderIcon: () => <Route className="w-5 h-5 text-emerald-400" /> },
      { id: 't_junction', label: 'T-simon tutashma (3 ta shaxobcha)', scoreWeight: 3, renderIcon: () => <GitFork className="w-5 h-5 text-amber-400" /> },
      { id: 'cross_4leg', label: '4 tomonlama chorraha (4+ shaxobcha)', scoreWeight: 2, renderIcon: () => <GitFork className="w-5 h-5 text-rose-400" /> },
      { id: 'roundabout', label: 'Aylanma chorraha (Koleco)', scoreWeight: 4, renderIcon: RoundaboutIcon },
    ],
  },
  {
    id: 'driveways',
    name: 'Hovli/Tijorat kirish joylari',
    category: 'Chorraha',
    currentValueId: 'none',
    options: [
      { id: 'none', label: 'Yo‘q (Kirish joyi yo‘q)', scoreWeight: 5, renderIcon: () => <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
      { id: 'one_two', label: '1-2 ta turar joy kirish joyi', scoreWeight: 3, renderIcon: () => <Home className="w-5 h-5 text-amber-400" /> },
      { id: 'more_two', label: '2 ta dan ko‘p kirish joylari', scoreWeight: 2, renderIcon: () => <Home className="w-5 h-5 text-rose-400" /> },
      { id: 'commercial', label: 'Tijorat / Zpravka / Bozor kirishi', scoreWeight: 1, renderIcon: () => <Store className="w-5 h-5 text-rose-500" /> },
    ],
  },
  {
    id: 'intersection_side_flow',
    name: 'Yon yo‘l avtomobil oqimi',
    category: 'Chorraha',
    currentValueId: 'medium',
    options: [
      { id: 'low', label: 'Past yon oqim', scoreWeight: 5, renderIcon: () => <Car className="w-5 h-5 text-emerald-400" /> },
      { id: 'medium', label: 'O‘rtacha yon oqim', scoreWeight: 3, renderIcon: () => <Car className="w-5 h-5 text-amber-400" /> },
      { id: 'high', label: 'Yuqori yon oqim', scoreWeight: 1, renderIcon: () => <Car className="w-5 h-5 text-rose-400" /> },
    ],
  },

  // ROW 5 (33-40)
  {
    id: 'intersection_quality',
    name: 'Chorraha sifati',
    category: 'Chorraha',
    currentValueId: 'adequate',
    options: [
      { id: 'adequate', label: 'Qoniqarli chorraha sifati', scoreWeight: 5, renderIcon: () => <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
      { id: 'poor', label: 'Yomon (Xavfli va belgisiz)', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'curve_type',
    name: 'Burilish turi',
    category: 'Burilish',
    currentValueId: 'straight',
    options: [
      { id: 'straight', label: 'To‘g‘ri yo‘l (Burilishlarsiz)', scoreWeight: 5, renderIcon: () => <Route className="w-5 h-5 text-emerald-400" /> },
      { id: 'moderate', label: 'O‘rtacha burilish', scoreWeight: 3, renderIcon: () => <GitFork className="w-5 h-5 text-amber-400" /> },
      { id: 'sharp', label: 'O‘tkir burilish (~45°)', scoreWeight: 2, renderIcon: () => <GitFork className="w-5 h-5 text-rose-400" /> },
      { id: 'very_sharp', label: 'Juda o‘tkir burilish (45°-90°)', scoreWeight: 1, renderIcon: () => <GitFork className="w-5 h-5 text-rose-500" /> },
    ],
  },
  {
    id: 'curve_quality',
    name: 'Burilish sifati',
    category: 'Burilish',
    currentValueId: 'adequate',
    options: [
      { id: 'adequate', label: 'Qoniqarli burilish sifati', scoreWeight: 5, renderIcon: () => <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
      { id: 'poor', label: 'Yomon (Belgilar va ko‘rinish yo‘q)', scoreWeight: 1, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'speed_limit',
    name: 'Tezlik cheklovi',
    category: 'Tezlik',
    currentValueId: 'speed_40',
    options: [
      { id: 'speed_30', label: '30 km/soat yoki undan past', scoreWeight: 5, renderIcon: () => <SpeedSignIcon limit="30" /> },
      { id: 'speed_40', label: '40 km/soat', scoreWeight: 4, renderIcon: () => <SpeedSignIcon limit="40" /> },
      { id: 'speed_50', label: '50 km/soat', scoreWeight: 2, renderIcon: () => <SpeedSignIcon limit="50" /> },
      { id: 'speed_60plus', label: '60 km/soat va undan yuqori', scoreWeight: 0, renderIcon: () => <SpeedSignIcon limit="60" /> },
    ],
  },
  {
    id: 'operating_speed',
    name: 'Haqiqiy tezlik (Ishchi)',
    category: 'Tezlik',
    currentValueId: 'speed_45',
    options: [
      { id: 'speed_30', label: '30 km/soat va undan past', scoreWeight: 5, renderIcon: () => <Gauge className="w-5 h-5 text-emerald-400" /> },
      { id: 'speed_45', label: '45 km/soat', scoreWeight: 3, renderIcon: () => <Gauge className="w-5 h-5 text-amber-400" /> },
      { id: 'speed_60plus', label: '60 km/soat va undan yuqori', scoreWeight: 1, renderIcon: () => <Gauge className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'speed_management',
    name: 'Tezlikni pasaytirish vositasi',
    category: 'Tezlik',
    currentValueId: 'present',
    options: [
      { id: 'present', label: 'Bor (Sun’iy notekislik - lejaщiy politseyskiy)', scoreWeight: 5, renderIcon: SpeedBumpIcon },
      { id: 'not_present', label: 'Yo‘q', scoreWeight: 0, renderIcon: () => <XCircle className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'motorcycle_percent',
    name: 'Motosikl ulushi (%)',
    category: 'Oqim',
    currentValueId: 'low',
    options: [
      { id: 'none', label: '0% (Motosikllar yo‘q)', scoreWeight: 5, renderIcon: () => <Bike className="w-5 h-5 text-emerald-400" /> },
      { id: 'low', label: '1 - 5%', scoreWeight: 4, renderIcon: () => <Bike className="w-5 h-5 text-teal-400" /> },
      { id: 'high', label: '5% dan ko‘p', scoreWeight: 2, renderIcon: () => <Bike className="w-5 h-5 text-rose-400" /> },
    ],
  },
  {
    id: 'hgv_percent',
    name: 'Yuk mashinalari ulushi (%)',
    category: 'Oqim',
    currentValueId: 'low',
    options: [
      { id: 'low', label: '0 - 5%', scoreWeight: 5, renderIcon: () => <Truck className="w-5 h-5 text-emerald-400" /> },
      { id: 'medium', label: '5 - 10%', scoreWeight: 3, renderIcon: () => <Truck className="w-5 h-5 text-amber-400" /> },
      { id: 'high', label: '10% dan ko‘p', scoreWeight: 1, renderIcon: () => <Truck className="w-5 h-5 text-rose-400" /> },
    ],
  },
];

export function Sr4sDemonstrator() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [attributes, setAttributes] = useState<AttributeDefinition[]>(FULL_40_ATTRIBUTES);
  const [activeAttrId, setActiveAttrId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Dynamic live calculation of Star Rating & score
  const { starRating, scorePercentage, calculatedScore, statusBadge } = useMemo(() => {
    let totalScore = 0;
    let maxTotal = attributes.length * 5;

    attributes.forEach((attr) => {
      const selectedOpt = attr.options.find((o) => o.id === attr.currentValueId);
      totalScore += selectedOpt ? selectedOpt.scoreWeight : 3;
    });

    const pct = Math.round((totalScore / maxTotal) * 100);
    let star = Number((1 + (pct / 100) * 4).toFixed(1));
    if (star > 5.0) star = 5.0;

    let badgeText = 'O‘rtacha Xavfsiz';
    let badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';

    if (star >= 4.0) {
      badgeText = 'A’lo — Xavfsiz Maktab Zonasi';
      badgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    } else if (star < 3.0) {
      badgeText = 'Yuqori Xavf — Ta’mir va Himoya Talab';
      badgeClass = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }

    return {
      starRating: star,
      scorePercentage: pct,
      calculatedScore: pct,
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

  // Save to database
  const handleSaveToDatabase = async () => {
    if (!user || !user.schoolId) {
      toastError("Baholashni bazaga saqlash uchun maktab hisobiga kirish lozim.", "Eslatma");
      return;
    }

    setIsSaving(true);
    try {
      const answersMap: Record<string, any> = {};
      attributes.forEach((attr) => {
        const selectedOpt = attr.options.find((o) => o.id === attr.currentValueId);
        answersMap[attr.id] = {
          optionId: attr.currentValueId,
          optionLabel: selectedOpt?.label || '',
          pointsAwarded: selectedOpt?.scoreWeight || 0,
        };
      });

      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolId: user.schoolId,
          periodId: 'period-2026-q1',
          status: 'SUBMITTED',
          score: calculatedScore,
          maxScore: 100,
          percentage: scorePercentage,
          answers: answersMap,
          reviewerNotes: `SR4S Baholash calculator orqali topshirildi: ${starRating} yulduz (${scorePercentage}%)`,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.message || "Bazaga saqlashda xatolik yuz berdi");
      }

      success(
        `Baholash ma'lumotlar bazasiga muvaffaqiyatli saqlandi! Maktab balli: ${calculatedScore} ball (${starRating} yulduz).`,
        "Bazaga Saqlandi ✅"
      );
    } catch (err: any) {
      toastError(err?.message || "Baholashni saqlashda xatolik yuz berdi", "Xatolik");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 transition-all duration-300">
      {/* Top Header Banner */}
      <div className="bg-slate-900/90 px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 font-black shadow-lg shadow-teal-500/20 transform hover:rotate-6 transition-all duration-300">
            <Star className="h-6 w-6 fill-slate-950" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-widest text-teal-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>XALQARO iRAP SR4S STANDARTI (40 TA PARAMETR)</span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              Maktab Yo‘l Xavfsizligi Interaktiv Kalkulyatori
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={cn('px-3.5 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-sm transition-all', statusBadge.className)}>
            {statusBadge.text}
          </span>

          {user && user.role === 'SCHOOL_USER' && (
            <Button
              onClick={handleSaveToDatabase}
              disabled={isSaving}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl h-9.5 px-4 gap-2 shadow-lg shadow-teal-500/20 transition-all duration-200"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Bazaga Saqlash</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Star Display + Right Attribute Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Live Star Rating Display */}
        <div className="lg:col-span-4 p-8 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 border-r border-slate-800/80 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-sm relative z-10">
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Barcha 40 ta rasmiy iRAP SR4S parametrlaridan birini bosing va maktab yulduzli reytingini jonli kuzating:
            </p>
          </div>

          {/* Children Illustration Placeholder / Icon */}
          <div className="relative py-2 relative z-10">
            <div className="flex items-center justify-center h-28 w-28 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 mx-auto shadow-2xl animate-pulse">
              <SchoolIcon className="h-14 w-14" />
            </div>
          </div>

          {/* Star Rating Display */}
          <div className="space-y-3 relative z-10">
            {/* 5-Star Visual Row */}
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => {
                const filled = starRating >= s;
                const half = starRating > s - 1 && starRating < s;
                return (
                  <Star
                    key={s}
                    className={cn(
                      'w-7 h-7 transition-all duration-300 transform hover:scale-125',
                      filled
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                        : half
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'text-slate-800'
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
                Umumiy Indeks: {scorePercentage}% Xavfsizlik ({calculatedScore} ball)
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900/80 w-full max-w-xs text-[11px] text-slate-500 flex items-center justify-center gap-1.5 relative z-10">
            <Info className="w-3.5 h-3.5 text-teal-500 shrink-0" />
            <span>Xalqaro iRAP SR4S (Coding Guide v1.7) standarti</span>
          </div>
        </div>

        {/* Right Side: 40 Attribute Grid Tiles (8 Cols on Large Screen) */}
        <div className="lg:col-span-8 p-5 bg-slate-900/90 overflow-y-auto max-h-[720px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {attributes.map((attr) => {
              const currentOpt = attr.options.find((o) => o.id === attr.currentValueId) || attr.options[0];
              const renderFn = currentOpt.renderIcon || (() => <HelpCircle className="h-5 w-5 text-teal-400" />);

              return (
                <button
                  key={attr.id}
                  type="button"
                  onClick={() => setActiveAttrId(attr.id)}
                  className="flex flex-col items-center justify-between p-2.5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 active:scale-95 transition-all duration-200 text-center group cursor-pointer relative overflow-hidden min-h-[110px]"
                >
                  {/* Top Badge label */}
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-teal-400 group-hover:text-teal-300 truncate max-w-full mb-1 transition-colors">
                    {currentOpt.label}
                  </span>

                  {/* Center Icon */}
                  <div className="my-1 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:border-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 group-hover:shadow-md transition-all duration-200 shrink-0">
                    {renderFn()}
                  </div>

                  {/* Bottom Attribute Name */}
                  <span className="text-[10px] font-bold text-slate-300 group-hover:text-white leading-tight mt-1 line-clamp-2 transition-colors">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 relative text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-teal-400 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-400" />
                  <span>PARAMETR QIYMATINI TANLANG</span>
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  {activeAttr.name}
                </h3>
              </div>

              <button
                onClick={() => setActiveAttrId(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Option Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {activeAttr.options.map((opt) => {
                const isSelected = activeAttr.currentValueId === opt.id;
                const renderOptFn = opt.renderIcon || (() => <HelpCircle className="h-5 w-5" />);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(activeAttr.id, opt.id)}
                    className={cn(
                      'flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer group space-y-2.5 active:scale-95',
                      isSelected
                        ? 'border-teal-500 bg-teal-500/20 text-white ring-2 ring-teal-500/40 shadow-lg shadow-teal-500/10'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-teal-500/50 hover:bg-slate-800/80 hover:-translate-y-0.5'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
                        isSelected ? 'bg-teal-500 text-slate-950 shadow-md' : 'bg-slate-900 text-teal-400 group-hover:scale-110'
                      )}
                    >
                      {renderOptFn()}
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
