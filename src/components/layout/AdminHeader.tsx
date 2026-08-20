'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { DemoAccountSwitcher } from '@/features/auth/components/DemoAccountSwitcher';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, Crown, Shield } from 'lucide-react';

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

export function AdminHeader({ onOpenMobileSidebar }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const { isSuperAdmin } = usePermissions();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left side: Mobile trigger & breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Portal:</span>
          <span className="text-sm font-bold text-slate-900">
            Respublika Monitoring va Nazorat Paneli
          </span>
        </div>
      </div>

      {/* Right side: Role badge, Persona switcher, Logout */}
      <div className="flex items-center gap-3">
        {/* Role Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border">
          {isSuperAdmin ? (
            <span className="flex items-center gap-1 text-amber-800 bg-amber-50 border-amber-200">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              Bosh Administrator (Super Admin)
            </span>
          ) : (
            <span className="flex items-center gap-1 text-blue-800 bg-blue-50 border-blue-200">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              Viloyat Administratori
            </span>
          )}
        </div>

        <DemoAccountSwitcher />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => logout()}
          className="text-slate-600 hover:text-rose-600 gap-1"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Chiqish</span>
        </Button>
      </div>
    </header>
  );
}
