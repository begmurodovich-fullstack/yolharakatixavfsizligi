'use client';

import React from 'react';
import Link from 'next/link';
import { Notification, NotificationType } from '@/types';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Camera,
  MapPin,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface NotificationListProps {
  notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ASSESSMENT_UPDATE:
        return CheckCircle2;
      case NotificationType.COORDINATE_VERIFICATION:
        return MapPin;
      case NotificationType.EVIDENCE_REVIEW:
        return Camera;
      case NotificationType.DEADLINE_ALERT:
        return AlertTriangle;
      case NotificationType.SYSTEM:
      default:
        return Bell;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              So‘nggi Bildirishnomalar
            </h2>
            <p className="text-xs text-slate-500">
              Monitoring va tekshiruv xabarnomalari
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <span className="text-xs font-semibold text-slate-500 font-mono">
            {notifications.filter((n) => !n.read).length} ta yangi
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-400">
          Hozircha yangi bildirishnomalar yo‘q.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.slice(0, 4).map((notif) => {
            const Icon = getNotificationIcon(notif.type);
            const targetUrl = notif.actionUrl?.startsWith('/school') ? notif.actionUrl : '/school/assessment';

            return (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all ${
                  notif.read
                    ? 'border-slate-100 bg-slate-50/60'
                    : 'border-teal-200 bg-teal-50/30 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      notif.read
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-teal-700 text-white shadow-2xs'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-teal-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(notif.createdAt).toLocaleDateString('uz-UZ', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <Link
                        href={targetUrl}
                        className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-0.5 text-xs"
                      >
                        <span>Ochish</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
