'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Calendar,
  LogOut,
} from 'lucide-react';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
}

export function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const { user, logout } = useAuth();

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

      {/* Right: Period Badge & User Profile */}
      <div className="flex items-center gap-3">
        {/* Active Period Badge */}
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-teal-400" />
          <span>2025-2026 Bahorgi monitoring</span>
        </span>

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
              {user?.role === 'SUPER_ADMIN' ? 'Bosh Administrator' : 'Hududiy Inspektor'}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => logout()}
            className="text-slate-600 hover:text-rose-600 gap-1 rounded-xl ml-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Chiqish</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
