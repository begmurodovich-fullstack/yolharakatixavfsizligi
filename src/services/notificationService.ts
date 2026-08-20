import { Notification } from '@/types';
import { repositories } from '@/repositories';

export class NotificationService {
  async getUserNotifications(userId?: string, role?: string): Promise<Notification[]> {
    return repositories.notification.getUserNotifications(userId, role);
  }

  async markAsRead(id: string): Promise<boolean> {
    return repositories.notification.markAsRead(id);
  }

  async markAllAsRead(userId?: string): Promise<boolean> {
    return repositories.notification.markAllAsRead(userId);
  }
}

export const notificationService = new NotificationService();
