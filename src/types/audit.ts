/**
 * System Audit Trail and Activity Log Types
 */

export enum AuditAction {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  UPDATE_SCHOOL_PROFILE = 'UPDATE_SCHOOL_PROFILE',
  SUBMIT_ASSESSMENT = 'SUBMIT_ASSESSMENT',
  VERIFY_ASSESSMENT = 'VERIFY_ASSESSMENT',
  REJECT_ASSESSMENT = 'REJECT_ASSESSMENT',
  REVIEW_EVIDENCE = 'REVIEW_EVIDENCE',
  UPDATE_COORDINATES = 'UPDATE_COORDINATES',
  VERIFY_COORDINATES = 'VERIFY_COORDINATES',
  REJECT_COORDINATES = 'REJECT_COORDINATES',
  CREATE_ADMIN = 'CREATE_ADMIN',
  UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS',
  SYSTEM_CONFIG_UPDATE = 'SYSTEM_CONFIG_UPDATE',
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: AuditAction;
  target: string;
  targetId?: string;
  timestamp: string;
  oldValue?: string | Record<string, unknown>;
  newValue?: string | Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}
