'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { notificationService } from '@/services/notificationService';
import { useToast } from '@/components/ui/toast';
import { Notification, NotificationType } from '@/types';

import {
  NotificationHeader,
  NotificationFilterTabs,
  NotificationItem,
} from '@/features/notifications/components';

import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Bell } from 'lucide-react';

export default function SchoolNotificationsPage() {
  const { user } = useAuth();
  const { success } = useToast();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadNotifications = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const notifs = await notificationService.getUserNotifications(
        user?.id,
        user?.role
      );
      setNotifications(notifs);
    } catch (err: any) {
      console.error('Notifications load error:', err);
      setHasError(true);
      setErrorMessage(err?.message || 'Bildirishnomalarni yuklashda xatolik.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Handle Mark as Read
  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (e) {
      console.error('Failed to mark notification as read:', e);
    }
  };

  // Handle Mark All as Read
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead(user?.id);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      success('Barcha bildirishnomalar o‘qilgan deb belgilandi!', 'Yangilandi');
    } catch (e) {
      console.error('Failed to mark all as read:', e);
    }
  };

  // Filter notifications
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'ALL') return notifications;
    if (activeFilter === 'UNREAD') return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === activeFilter);
  }, [notifications, activeFilter]);

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  // Error State
  if (hasError) {
    return (
      <div className="py-12">
        <ErrorState
          title="Bildirishnomalarni yuklab bo‘lmadi"
          message={errorMessage || 'Ma’lumotlarni olishda xatolik yuz berdi.'}
          onRetry={loadNotifications}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Banner */}
      <NotificationHeader
        totalCount={notifications.length}
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      {/* 2. Filter Tabs */}
      <NotificationFilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        unreadCount={unreadCount}
      />

      {/* 3. Notifications Feed */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="Bildirishnomalar mavjud emas"
          description={
            activeFilter === 'UNREAD'
              ? 'Sizda yangi o‘qilmagan bildirishnomalar yo‘q.'
              : 'Tanlangan parametr bo‘yicha hozircha hech qanday bildirishnoma mavjud emas.'
          }
          className="py-12"
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
