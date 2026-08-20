'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Calendar,
  ShieldAlert,
  UserCheck,
  ChevronDown,
  Sparkles,
  Users,
  School,
  ShieldCheck,
} from 'lucide-react';
import { Role } from '@/types';
import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
}

export function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const { user, switchAccount } = useAuth();
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const router = useRouter();

  const handleSwitchDemo = async (role: Role) => {
    setShowDemoMenu(false);
    await switchAccount(role);
    if (role === Role.SCHOOL_USER) {
      router.push('/school');
    } else {
      router.push('/admin');
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Mobile Toggle & Page Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          <span className="text-xs font-bold text-slate-700">
            Respublika YHXX Monitoring Markazi
          </span>
        </div>
      </div>

      {/* Right: Period Badge, Demo Switcher, User Pill */}
      <div className="flex items-center gap-3">
        {/* Active Period Badge */}
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-teal-400" />
          <span>2025-2026 Bahorgi monitoring</span>
        </span>

        {/* Demo Switcher Dropdown */}
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            className="text-xs font-semibold gap-1.5 border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl h-9"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">Demo hisoblar</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </Button>

          {showDemoMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Rolni almashtirish
              </div>

              <button
                type="button"
                onClick={() => handleSwitchDemo(Role.SUPER_ADMIN)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Super Admin</div>
                  <div className="text-[10px] text-slate-400">To‘liq tizim boshqaruvi</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchDemo(Role.ADMIN)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Oddiy Admin</div>
                  <div className="text-[10px] text-slate-400">Tekshirish va tasdiqlash</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchDemo(Role.SCHOOL_USER)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                  <School className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Maktab Mas’uli</div>
                  <div className="text-[10px] text-slate-400">24-maktab portali</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-xs shadow-2xs font-mono">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-tight">
              {user?.name}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {user?.role}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
