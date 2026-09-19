'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface Sr4sAttributeItem {
  id: string;
  code: string;
  nameUz: string;
  nameEn: string;
  iconSrc: string;
  badgeValue?: string;
  badgeColor?: 'teal' | 'red' | 'green' | 'purple' | 'orange' | 'dark';
}

export const OFFICIAL_SR4S_40_ATTRIBUTES: Sr4sAttributeItem[] = [
  // Row 1
  { id: '1', code: 'SR4S-01', nameUz: 'Yerdan foydalanish chapda', nameEn: 'Land use left', iconSrc: '/sr4s_icons/land-use-residential.png' },
  { id: '2', code: 'SR4S-02', nameUz: 'Yerdan Foydalanish Huquqi', nameEn: 'Land Use Right', iconSrc: '/sr4s_icons/land-use-residential.png' },
  { id: '3', code: 'SR4S-03', nameUz: 'Maydon Turi', nameEn: 'Area Type', iconSrc: '/sr4s_icons/area-type-urban.png' },
  { id: '4', code: 'SR4S-04', nameUz: 'Avtomobil Mashinalar', nameEn: 'Vehicle Parking', iconSrc: '/sr4s_icons/vehicle-parking-two-sides.png' },
  { id: '5', code: 'SR4S-05', nameUz: 'Ko‘rish Masofasi', nameEn: 'Sight Distance', iconSrc: '/sr4s_icons/icon-adequate.png', badgeValue: 'ADEQUATE', badgeColor: 'teal' },
  { id: '6', code: 'SR4S-06', nameUz: 'Yo‘llar soni', nameEn: 'Number of Lanes', iconSrc: '/sr4s_icons/number-of-lanes-1-2.png', badgeValue: '1&1', badgeColor: 'teal' },
  { id: '7', code: 'SR4S-07', nameUz: 'Chiziq Kengligi', nameEn: 'Lane Width', iconSrc: '/sr4s_icons/lane-width-wide.png', badgeValue: 'WIDE', badgeColor: 'teal' },
  { id: '8', code: 'SR4S-08', nameUz: 'Elka Rumble Chiziqlar', nameEn: 'Shoulder Rumble Strips', iconSrc: '/sr4s_icons/icon-not-present.png', badgeValue: 'NOT PRESENT', badgeColor: 'red' },
  { id: '9', code: 'SR4S-09', nameUz: 'Yo‘l Holati', nameEn: 'Road Condition', iconSrc: '/sr4s_icons/icon-good.png', badgeValue: 'GOOD', badgeColor: 'teal' },
  { id: '10', code: 'SR4S-10', nameUz: 'Ushlash (Grip)', nameEn: 'Grip', iconSrc: '/sr4s_icons/icon-good.png', badgeValue: 'GOOD', badgeColor: 'teal' },

  // Row 2
  { id: '11', code: 'SR4S-11', nameUz: 'Sinf (Gradient)', nameEn: 'Grade', iconSrc: '/sr4s_icons/grade-low.png' },
  { id: '12', code: 'SR4S-12', nameUz: 'Qatnov Qismi Turi', nameEn: 'Carriageway Type', iconSrc: '/sr4s_icons/carriageway-na.png' },
  { id: '13', code: 'SR4S-13', nameUz: 'Yo‘lning o‘rtasi', nameEn: 'Middle of Road', iconSrc: '/sr4s_icons/median-broken-wide-markings.png' },
  { id: '14', code: 'SR4S-14', nameUz: 'Chiziqlar Va Belgilar', nameEn: 'Lines & Signs', iconSrc: '/sr4s_icons/icon-adequate.png', badgeValue: 'ADEQUATE', badgeColor: 'teal' },
  { id: '15', code: 'SR4S-15', nameUz: 'Ko‘chalarni Yoritish', nameEn: 'Street Lighting', iconSrc: '/sr4s_icons/icon-present.png', badgeValue: 'PRESENT', badgeColor: 'teal' },
  { id: '16', code: 'SR4S-16', nameUz: 'Maktab Haqida Ogohlantirish', nameEn: 'School Warning', iconSrc: '/sr4s_icons/school-warning-signs-markings.png' },
  { id: '17', code: 'SR4S-17', nameUz: 'O‘tish Nazoratchisi', nameEn: 'Crossing Supervisor', iconSrc: '/sr4s_icons/school-supervisor-no.png' },
  { id: '18', code: 'SR4S-18', nameUz: 'Trotuar Chapda', nameEn: 'Sidewalk Left', iconSrc: '/sr4s_icons/sidewalk-left-barrier.png' },
  { id: '19', code: 'SR4S-19', nameUz: 'Trotuar O‘ng', nameEn: 'Sidewalk Right', iconSrc: '/sr4s_icons/sidewalk-right-barrier.png' },
  { id: '20', code: 'SR4S-20', nameUz: 'Yo‘lning Chekkasi Chapda', nameEn: 'Road Edge Left', iconSrc: '/sr4s_icons/shoulder-left-wide.png' },

  // Row 3
  { id: '21', code: 'SR4S-21', nameUz: 'Yo‘lning O‘ng Tomoni', nameEn: 'Road Edge Right', iconSrc: '/sr4s_icons/shoulder-right-wide.png' },
  { id: '22', code: 'SR4S-22', nameUz: 'Piyodalarni Kanalizatsiya Qilish', nameEn: 'Pedestrian Channelisation', iconSrc: '/sr4s_icons/icon-not-present.png', badgeValue: 'NOT PRESENT', badgeColor: 'red' },
  { id: '23', code: 'SR4S-23', nameUz: 'Asosiy Yo‘lni Kesib O‘tish', nameEn: 'Crossing Main Road', iconSrc: '/sr4s_icons/crossing-marked.png' },
  { id: '24', code: 'SR4S-24', nameUz: 'Yon Yo‘lni Kesib O‘tish', nameEn: 'Crossing Side Road', iconSrc: '/sr4s_icons/crossing-side-lights.png' },
  { id: '25', code: 'SR4S-25', nameUz: 'O‘tish Sifati', nameEn: 'Crossing Quality', iconSrc: '/sr4s_icons/icon-adequate.png', badgeValue: 'ADEQUATE', badgeColor: 'teal' },
  { id: '26', code: 'SR4S-26', nameUz: 'Avtomobillar / Kun', nameEn: 'Vehicles / Day', iconSrc: '/sr4s_icons/icon-medium.png', badgeValue: '100', badgeColor: 'purple' },
  { id: '27', code: 'SR4S-27', nameUz: 'O‘tish Oqimi', nameEn: 'Crossing Flow', iconSrc: '/sr4s_icons/pedestrians-crossing-present.png', badgeValue: 'PRESENT', badgeColor: 'teal' },
  { id: '28', code: 'SR4S-28', nameUz: 'O‘ng Tomon Oqimi', nameEn: 'Right Side Flow', iconSrc: '/sr4s_icons/pedestrians-right-present.png', badgeValue: 'PRESENT', badgeColor: 'teal' },
  { id: '29', code: 'SR4S-29', nameUz: 'Chap Tomon Oqimi', nameEn: 'Left Side Flow', iconSrc: '/sr4s_icons/pedestrians-left-present.png', badgeValue: 'PRESENT', badgeColor: 'teal' },
  { id: '30', code: 'SR4S-30', nameUz: 'Kesishish Turi', nameEn: 'Intersection Type', iconSrc: '/sr4s_icons/intersection-4-leg-signal.png' },

  // Row 4
  { id: '31', code: 'SR4S-31', nameUz: 'Yo‘llar (Driveways)', nameEn: 'Driveways', iconSrc: '/sr4s_icons/driveway-commercial.png' },
  { id: '32', code: 'SR4S-32', nameUz: 'Kesishish Tomoni Oqimi', nameEn: 'Intersection Side Flow', iconSrc: '/sr4s_icons/icon-medium.png', badgeValue: '4999.00', badgeColor: 'purple' },
  { id: '33', code: 'SR4S-33', nameUz: 'Kesishish Sifati', nameEn: 'Intersection Quality', iconSrc: '/sr4s_icons/icon-adequate.png', badgeValue: 'ADEQUATE', badgeColor: 'teal' },
  { id: '34', code: 'SR4S-34', nameUz: 'Egri Chiziq Turi', nameEn: 'Curve Type', iconSrc: '/sr4s_icons/curve-straight.png' },
  { id: '35', code: 'SR4S-35', nameUz: 'Egri Chiziq Sifati', nameEn: 'Curve Quality', iconSrc: '/sr4s_icons/icon-na.png', badgeValue: 'NA', badgeColor: 'orange' },
  { id: '36', code: 'SR4S-36', nameUz: 'Tezlik Chegarasi', nameEn: 'Speed Limit', iconSrc: '/sr4s_icons/speed-limit.png' },
  { id: '37', code: 'SR4S-37', nameUz: 'Ishlash Tezligi', nameEn: 'Operating Speed', iconSrc: '/sr4s_icons/operating-speed.png' },
  { id: '38', code: 'SR4S-38', nameUz: 'Tezlikni Boshqarish', nameEn: 'Speed Management', iconSrc: '/sr4s_icons/icon-not-present.png', badgeValue: 'NOT PRESENT', badgeColor: 'red' },
  { id: '39', code: 'SR4S-39', nameUz: 'Mototsikl %', nameEn: 'Motorcycle %', iconSrc: '/sr4s_icons/motorcycle-percent-na.png', badgeValue: 'NA', badgeColor: 'teal' },
  { id: '40', code: 'SR4S-40', nameUz: 'Yuk mashinasi (HGV %)', nameEn: 'HGV %', iconSrc: '/sr4s_icons/hgv-percent-na.png', badgeValue: 'NA', badgeColor: 'teal' },
];

export function Sr4sAttributeCard({ item }: { item: Sr4sAttributeItem }) {
  return (
    <div className="flex flex-col items-center justify-between p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-500/50 transition-all text-center group h-full">
      {/* Icon Graphic */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center mb-2 select-none group-hover:scale-105 transition-transform duration-200">
        <Image
          src={item.iconSrc}
          alt={item.nameUz}
          width={80}
          height={80}
          className="object-contain max-h-full max-w-full drop-shadow-2xs"
          unoptimized
        />
      </div>

      {/* Uzbek Label & English subtitle */}
      <div className="space-y-0.5 mt-auto">
        <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight block line-clamp-2">
          {item.nameUz}
        </span>
        <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block truncate">
          {item.nameEn}
        </span>
      </div>
    </div>
  );
}

export function Sr4sAttributeGrid({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3 sm:gap-3.5">
        {OFFICIAL_SR4S_40_ATTRIBUTES.map((item) => (
          <Sr4sAttributeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
