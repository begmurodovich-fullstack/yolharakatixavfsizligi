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
      <div className="border-b border-slate-200 bg-slate-50/70 hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-2">
            {SCHOOL_NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors',
                    active
                      ? 'bg-white text-teal-800 shadow-2xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4',
                      active ? 'text-teal-700' : 'text-slate-400'
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile bottom navigation bar for high-touch mobile accessibility */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xs py-1 px-2 shadow-lg">
        <div className="flex justify-around items-center">
          {SCHOOL_NAV_ITEMS.slice(0, 5).map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center py-1 px-2 rounded-md text-[10px] font-medium transition-colors',
                  active ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
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
