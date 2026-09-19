'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { cn } from '@/lib/cn';
import {
  Shield,
  LayoutDashboard,
  School,
  ClipboardList,
  Camera,
  MapPin,
  Trophy,
  BarChart3,
  Map,
  FileText,
  Bell,
  History,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crown,
} from 'lucide-react';

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { isSuperAdmin } = usePermissions();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const navSections = [
    {
      title: 'Asosiy va Monitoring',
      items: [
        { label: 'Boshqaruv paneli', href: '/admin', icon: LayoutDashboard, exact: true },
        { label: 'Maktablar ro‘yxati', href: '/admin/schools', icon: School },
        { label: 'Baholash tekshiruvi', href: '/admin/assessments', icon: ClipboardList },
        { label: 'Foto-dalillar nazorati', href: '/admin/evidence', icon: Camera },
        { label: 'Koordinatalar ekspertizasi', href: '/admin/coordinates', icon: MapPin },
      ],
    },
    {
      title: 'Tahlil va Reytinglar',
      items: [
        { label: 'Respublika reytingi', href: '/admin/rankings', icon: Trophy },
        { label: 'Xavfsizlik statistikasi', href: '/admin/statistics', icon: BarChart3 },
        { label: 'Interaktiv xarita', href: '/admin/map', icon: Map },
        { label: 'Eksport hisobotlar', href: '/admin/reports', icon: FileText },
      ],
    },
    {
      title: 'Tizim va Xabarlar',
      items: [
        { label: 'Bildirishnomalar', href: '/admin/notifications', icon: Bell },
        { label: 'Audit va harakatlar jurnali', href: '/admin/audit', icon: History },
      ],
    },
  ];

  const superAdminSection = {
    title: 'Bosh Boshqarma (Super Admin)',
    items: [
      { label: 'Administratorlar boshqaruvi', href: '/admin/admins', icon: Users },
      { label: 'Tizim parametrlari', href: '/admin/settings', icon: Settings },
    ],
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between">
      {/* Brand & collapse trigger */}
      <div>
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800 bg-slate-950">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 shadow-md shrink-0 font-black">
              <Shield className="h-5 w-5 fill-slate-950 text-slate-950" />
            </div>
            {!collapsed && (
              <div>
                <div className="text-sm font-extrabold text-white leading-none tracking-tight">Maktab Nazorat</div>
                <div className="text-[10px] text-teal-400 font-mono font-bold mt-0.5">ADMIN PORTAL</div>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-all"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav Links */}
        <div className="px-3 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!collapsed && (
                <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const active = isActive(item.href, item.exact);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer',
                      active
                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold shadow-lg shadow-teal-500/20 border border-teal-400/30 ring-2 ring-teal-500/20 scale-[1.02]'
                        : 'text-slate-400 font-medium hover:text-white hover:bg-slate-800/80 active:scale-95'
                    )}
                  >
                    <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-white' : 'text-slate-400')} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Super Admin Exclusive Menu Section */}
          {isSuperAdmin && (
            <div className="space-y-1 pt-3 border-t border-slate-800/80">
              {!collapsed && (
                <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  <span>{superAdminSection.title}</span>
                </div>
              )}
              {superAdminSection.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer',
                      active
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-extrabold shadow-lg shadow-amber-500/20 border border-amber-400/30 scale-[1.02]'
                        : 'text-slate-400 font-medium hover:text-white hover:bg-slate-800/80 active:scale-95'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-amber-400" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 bg-slate-900 border-r border-slate-800 transition-all duration-300 hidden md:block',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
