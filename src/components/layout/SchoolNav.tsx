'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import {
  LayoutDashboard,
  ClipboardCheck,
  Trophy,
  BarChart3,
  BookOpen,
  MapPin,
  Bell,
} from 'lucide-react';

const SCHOOL_NAV_ITEMS = [
  { label: 'Boshqaruv paneli', href: '/school', icon: LayoutDashboard, exact: true },
  { label: 'O‘z-o‘zini baholash', href: '/school/assessment', icon: ClipboardCheck },
  { label: 'Reytinglar', href: '/school/rankings', icon: Trophy },
  { label: 'Statistika', href: '/school/statistics', icon: BarChart3 },
  { label: 'Xavfsizlik mezonlari', href: '/school/criteria', icon: BookOpen },
  { label: 'Geolokatsiya va profil', href: '/school/profile', icon: MapPin },
  { label: 'Bildirishnomalar', href: '/school/notifications', icon: Bell },
];

export function SchoolNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop & Tablet navigation tabs */}
      <div className="border-b border-slate-200 bg-white shadow-2xs hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1.5 overflow-x-auto py-2.5">
            {SCHOOL_NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all duration-200 cursor-pointer',
                    active
                      ? 'bg-slate-900 text-teal-400 font-extrabold shadow-md border border-slate-800 ring-2 ring-teal-500/20 scale-[1.02]'
                      : 'text-slate-600 font-semibold hover:text-slate-900 hover:bg-slate-100/80 active:scale-95'
                  )}
                >
                  <div
                    className={cn(
                      'p-1 rounded-md transition-colors',
                      active ? 'bg-teal-500/20 text-teal-400' : 'text-slate-400'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile bottom navigation bar for high-touch mobile accessibility */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md py-1.5 px-2 shadow-2xl">
        <div className="flex justify-around items-center">
          {SCHOOL_NAV_ITEMS.slice(0, 5).map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] transition-all duration-200',
                  active
                    ? 'text-teal-700 font-extrabold bg-teal-50 scale-105 border border-teal-200/60 shadow-2xs'
                    : 'text-slate-500 font-medium hover:text-slate-800'
                )}
              >
                <Icon className={cn('w-5 h-5 mb-0.5', active ? 'text-teal-700' : 'text-slate-400')} />
                <span className="truncate max-w-[60px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
