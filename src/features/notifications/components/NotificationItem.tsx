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
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => Promise<void>;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ASSESSMENT_UPDATE:
        return CheckCircle2;
      case NotificationType.COORDINATE_VERIFICATION:
        return MapPin;
      case NotificationType.EVIDENCE_REVIEW:
        return Camera;
      case NotificationType.DEADLINE_ALERT:
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const Icon = getIcon(notification.type);
  const actionUrl = notification.actionUrl || '/school/assessment';

  return (
    <div
      className={cn(
        'rounded-2xl border p-5 sm:p-6 transition-all flex flex-col sm:flex-row items-start justify-between gap-5 shadow-xs',
        notification.read
          ? 'border-slate-200 bg-white'
          : 'border-teal-200 bg-teal-50/30 shadow-2xs'
      )}
    >
      <div className="flex items-start gap-4 min-w-0">
        <div
          className={cn(
            'p-3 rounded-2xl shrink-0 mt-0.5 shadow-2xs',
            notification.read
              ? 'bg-slate-100 text-slate-500'
              : 'bg-teal-700 text-white'
          )}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className={cn('text-xs sm:text-sm font-bold', notification.read ? 'text-slate-800' : 'text-teal-950')}>
              {notification.title}
            </h3>
            {!notification.read && (
              <span className="h-2 w-2 rounded-full bg-teal-600 shrink-0" />
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {notification.message}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pt-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {new Date(notification.createdAt).toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
        {!notification.read && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
            className="text-xs font-semibold gap-1.5 border-slate-200 rounded-xl"
          >
            <Check className="w-3.5 h-3.5 text-teal-600" />
            <span>O‘qildi</span>
          </Button>
        )}

        <Link href={actionUrl}>
          <Button
            type="button"
            size="sm"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold gap-1 rounded-xl px-4"
          >
            <span>Ochish</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
