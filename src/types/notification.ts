/**
 * System and User Notifications Domain Types
 */

export enum NotificationType {
  SYSTEM = 'SYSTEM',
  ASSESSMENT_UPDATE = 'ASSESSMENT_UPDATE',
  EVIDENCE_REVIEW = 'EVIDENCE_REVIEW',
  COORDINATE_VERIFICATION = 'COORDINATE_VERIFICATION',
  DEADLINE_ALERT = 'DEADLINE_ALERT',
}

export interface Notification {
  id: string;
  userId?: string;
  targetRole?: string;
  schoolId?: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}
