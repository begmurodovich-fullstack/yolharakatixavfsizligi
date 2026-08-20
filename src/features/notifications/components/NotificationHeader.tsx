'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck } from 'lucide-react';

interface NotificationHeaderProps {
  totalCount: number;
  unreadCount: number;
  onMarkAllAsRead: () => Promise<void>;
}

export function NotificationHeader({
  totalCount,
  unreadCount,
  onMarkAllAsRead,
}: NotificationHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Xabarnomalar Markazi
            </h1>
            <p className="text-xs text-slate-500">
              Monitoring tekshiruvi, foto-dalillar va tizim yangilanishlari
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center">
        {unreadCount > 0 && (
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold font-mono">
            {unreadCount} ta o‘qilmagan
          </span>
        )}

        {unreadCount > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-xs font-semibold gap-1.5 border-slate-200"
          >
            <CheckCheck className="w-4 h-4 text-teal-600" />
            <span>Barchasini o‘qilgan qilish</span>
          </Button>
        )}
      </div>
    </div>
  );
}
