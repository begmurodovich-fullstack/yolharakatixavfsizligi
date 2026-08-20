'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DEMO_ACCOUNTS } from '@/lib/constants';
import { UserRole } from '@/types';
import { cn } from '@/lib/cn';
import { UserCheck, ChevronDown, Shield, School, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DemoAccountSwitcherProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export function DemoAccountSwitcher({ className, variant = 'compact' }: DemoAccountSwitcherProps) {
  const { user, switchAccount, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSwitch = async (role: UserRole) => {
    setIsOpen(false);
    await switchAccount(role);
    if (role === UserRole.SCHOOL_USER) {
      router.push('/school');
    } else {
      router.push('/admin');
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return Crown;
      case UserRole.ADMIN:
        return Shield;
      case UserRole.SCHOOL_USER:
      default:
        return School;
    }
  };

  const CurrentIcon = user ? getRoleIcon(user.role) : UserCheck;

  if (variant === 'full') {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-3', className)}>
        {DEMO_ACCOUNTS.map((account) => {
          const isSelected = user?.email === account.email;
          const Icon = getRoleIcon(account.role);

          return (
            <button
              key={account.email}
              type="button"
              onClick={() => handleSwitch(account.role)}
              disabled={isLoading}
              className={cn(
                'flex flex-col text-left p-4 rounded-xl border transition-all',
                isSelected
                  ? 'border-teal-600 bg-teal-50/70 ring-2 ring-teal-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={cn(
                    'p-2 rounded-lg',
                    isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </span>
                {isSelected && (
                  <span className="text-xs font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                    Faol hisob
                  </span>
                )}
              </div>
              <div className="font-semibold text-slate-900 text-sm">{account.label}</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{account.email}</div>
              <p className="text-xs text-slate-600 mt-2 line-clamp-2">{account.description}</p>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('relative inline-block text-left', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
      >
        <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
        <CurrentIcon className="w-3.5 h-3.5 text-slate-500" />
        <span className="max-w-[130px] truncate">{user ? user.name : 'Demo hisob'}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl border border-slate-200 bg-white shadow-xl z-50 p-2 animate-in fade-in-50 zoom-in-95">
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <div className="text-xs font-semibold text-slate-900">Demo hisobni almashtirish</div>
              <div className="text-[11px] text-slate-500">Prototip rollarini sinash</div>
            </div>
            <div className="space-y-1">
              {DEMO_ACCOUNTS.map((account) => {
                const isSelected = user?.email === account.email;
                const Icon = getRoleIcon(account.role);

                return (
                  <button
                    key={account.email}
                    onClick={() => handleSwitch(account.role)}
                    className={cn(
                      'w-full text-left flex items-start gap-2.5 p-2 rounded-lg text-xs transition-colors',
                      isSelected
                        ? 'bg-teal-50 text-teal-900 font-medium'
                        : 'text-slate-700 hover:bg-slate-100'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4 mt-0.5 shrink-0',
                        isSelected ? 'text-teal-600' : 'text-slate-400'
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate">{account.label}</div>
                      <div className="text-[11px] text-slate-400 truncate">{account.email}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
