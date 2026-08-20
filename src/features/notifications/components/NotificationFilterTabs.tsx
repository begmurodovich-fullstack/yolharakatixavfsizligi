'use client';

import React from 'react';
import { NotificationType } from '@/types';
import { cn } from '@/lib/cn';
import { Filter } from 'lucide-react';

interface NotificationFilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  unreadCount: number;
}

export function NotificationFilterTabs({
  activeFilter,
  onFilterChange,
  unreadCount,
}: NotificationFilterTabsProps) {
  const tabs = [
    { id: 'ALL', label: 'Barchasi' },
    { id: 'UNREAD', label: `O‘qilmagan (${unreadCount})` },
    { id: NotificationType.ASSESSMENT_UPDATE, label: 'Baholash xabarlari' },
    { id: NotificationType.COORDINATE_VERIFICATION, label: 'Geolokatsiya' },
    { id: NotificationType.EVIDENCE_REVIEW, label: 'Foto-dalillar' },
    { id: NotificationType.SYSTEM, label: 'Tizim xabarlari' },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 overflow-x-auto">
      <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold px-2">
        <Filter className="w-3.5 h-3.5" />
        <span>Filtr:</span>
      </div>

      {tabs.map((tab) => {
        const isActive = activeFilter === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onFilterChange(tab.id)}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none',
              isActive
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
