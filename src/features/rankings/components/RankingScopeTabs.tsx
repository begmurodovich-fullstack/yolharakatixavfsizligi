'use client';

import React from 'react';
import { RankingScope } from '@/types';
import { Building2, Map, Globe } from 'lucide-react';
import { cn } from '@/lib/cn';

interface RankingScopeTabsProps {
  currentScope: RankingScope;
  onScopeChange: (scope: RankingScope) => void;
  districtName?: string;
  regionName?: string;
}

export function RankingScopeTabs({
  currentScope,
  onScopeChange,
  districtName = 'Tuman',
  regionName = 'Viloyat',
}: RankingScopeTabsProps) {
  const tabs = [
    {
      scope: RankingScope.DISTRICT,
      label: `Tuman reytingi (${districtName})`,
      shortLabel: districtName,
      icon: Building2,
    },
    {
      scope: RankingScope.REGION,
      label: `Viloyat reytingi (${regionName})`,
      shortLabel: regionName,
      icon: Map,
    },
    {
      scope: RankingScope.REPUBLIC,
      label: 'Respublika reytingi (Barcha maktablar)',
      shortLabel: 'Respublika',
      icon: Globe,
    },
  ];

  return (
    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = currentScope === tab.scope;
        const Icon = tab.icon;

        return (
          <button
            key={tab.scope}
            type="button"
            onClick={() => onScopeChange(tab.scope)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-900',
              isActive
                ? 'bg-white text-teal-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            )}
          >
            <Icon className={cn('w-4 h-4', isActive ? 'text-teal-700' : 'text-slate-400')} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
