import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export type Sr4sPictoType =
  | 'speed'
  | 'sidewalk'
  | 'crossing'
  | 'traffic_calming'
  | 'school_zone'
  | 'sight_distance'
  | 'bicycle'
  | 'lighting';

interface Sr4sPictoProps {
  type: Sr4sPictoType;
  size?: number;
  className?: string;
  alt?: string;
}

const PICTO_MAP: Record<Sr4sPictoType, { src: string; title: string }> = {
  speed: { src: '/sr4s_icons/picto_speed.svg', title: 'Harakat tezligi chegarasi (30 km/soat)' },
  sidewalk: { src: '/sr4s_icons/picto_sidewalk.svg', title: 'Piyodalar yo‘lkasi (Trotoar)' },
  crossing: { src: '/sr4s_icons/picto_crossing.svg', title: 'Piyodalar o‘tish joyi (Zebra)' },
  traffic_calming: { src: '/sr4s_icons/picto_traffic_calming.svg', title: 'Tezlik pasaytirgich (Sun’iy notekislik)' },
  school_zone: { src: '/sr4s_icons/picto_school_zone.svg', title: 'Maktab hududi belgisi' },
  sight_distance: { src: '/sr4s_icons/picto_sight_distance.svg', title: 'Ko‘rinish masofasi va ko‘rish burchagi' },
  bicycle: { src: '/sr4s_icons/picto_bicycle.svg', title: 'Velosiped yo‘lagi' },
  lighting: { src: '/sr4s_icons/picto_lighting.svg', title: 'Tungi yoritish tizimi' },
};

export function Sr4sPictogram({ type, size = 40, className, alt }: Sr4sPictoProps) {
  const info = PICTO_MAP[type] || PICTO_MAP.speed;
  return (
    <div
      className={cn('inline-flex items-center justify-center shrink-0 select-none', className)}
      style={{ width: size, height: size }}
      title={info.title}
    >
      <Image
        src={info.src}
        alt={alt || info.title}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        unoptimized
      />
    </div>
  );
}

interface Sr4sStarBadgeProps {
  stars: number; // 0 for unassessed, 1-5 for rated
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Sr4sStarBadge({ stars, size = 'md', className }: Sr4sStarBadgeProps) {
  const isUnassessed = !stars || stars <= 0;
  const src = isUnassessed ? '/sr4s_icons/sr4s_unassessed.svg' : `/sr4s_icons/sr4s_star_${Math.min(5, Math.max(1, stars))}.svg`;
  
  const dimensions = {
    sm: { w: 120, h: 46 },
    md: { w: 160, h: 62 },
    lg: { w: 200, h: 78 },
  }[size];

  return (
    <div
      className={cn('inline-flex items-center justify-center select-none shrink-0', className)}
      style={{ width: dimensions.w, height: dimensions.h }}
      title={isUnassessed ? 'Baholanmagan (Kutilmoqda)' : `${stars} Yulduzli Xavfsizlik`}
    >
      <Image
        src={src}
        alt={isUnassessed ? 'Baholanmagan' : `${stars} Yulduz`}
        width={dimensions.w}
        height={dimensions.h}
        className="w-full h-full object-contain drop-shadow-sm"
        unoptimized
      />
    </div>
  );
}

export function Sr4sGoldStars({ stars, size = 18, className }: { stars: number; size?: number; className?: string }) {
  if (!stars || stars <= 0) {
    return (
      <span className={cn('text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200', className)}>
        ⚪️ Baholanmagan
      </span>
    );
  }

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= stars ? '#FFC72C' : 'rgba(203, 213, 225, 0.4)'}
          stroke={i <= stars ? '#D97706' : '#94A3B8'}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-xs"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}
