'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { isSuperAdmin } from '@/lib/permissions';
import { cn } from '@/lib/cn';
import {
  LayoutDashboard,
  School,
  Camera,
  MapPin,
  ClipboardCheck,
  FileSpreadsheet,
  History,
  Users,
  ShieldCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isSuper = user ? isSuperAdmin(user) : false;

  const navItems = [
    {
      href: '/admin',
      label: 'Boshqaruv Paneli',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/admin/schools',
      label: 'Maktablar Reyestri',
      icon: School,
    },
    {
      href: '/admin/evidence',
      label: 'Foto-dalillarni Tekshirish',
      icon: Camera,
    },
    {
      href: '/admin/coordinates',
      label: 'Geolokatsiyani Tasdiqlash',
      icon: MapPin,
    },
    {
      href: '/admin/assessments',
      label: 'Baholash Monitoringi',
      icon: ClipboardCheck,
    },
    {
      href: '/admin/reports',
      label: 'Hisobotlar va Excel',
      icon: FileSpreadsheet,
    },
    {
      href: '/admin/audit-logs',
      label: 'Xavfsizlik va Audit Jurnali',
      icon: History,
    },
    ...(isSuper
      ? [
          {
            href: '/admin/admins',
            label: 'Adminlar Boshqaruvi',
            icon: Users,
          },
        ]
      : []),
  ];

  return (
    <aside className="h-full w-72 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-slate-950 font-black shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-teal-400 uppercase">
                ADMIN PORTAL
              </div>
              <div className="text-sm font-extrabold text-white tracking-tight leading-tight">
                Maktab Yo‘l Xavfsizligi
              </div>
            </div>
          </Link>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Tizim Boshqaruvi
          </div>

          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  'flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group',
                  isActive
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/10'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive
                        ? 'text-slate-950'
                        : 'text-slate-400 group-hover:text-teal-400'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-950" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Switcher */}
      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/50">
        {/* User Card */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
          <div className="min-w-0 space-y-0.5">
            <div className="text-xs font-bold text-white truncate">
              {user?.name || 'Administrator'}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-950 text-teal-400 border border-teal-800">
                {isSuper ? 'SUPER ADMIN' : 'ADMIN'}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Link href="/" className="block">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[11px] h-8.5 bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Saytga o‘tish</span>
            </Button>
          </Link>

          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="w-full text-[11px] h-8.5 bg-rose-950/30 border-rose-900/50 text-rose-300 hover:text-white hover:bg-rose-900/60 gap-1.5"
          >
            <LogOut className="w-3 h-3" />
            <span>Chiqish</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
