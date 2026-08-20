import { User, UserRole } from '@/types';

/**
 * ============================================================================
 * IMPORTANT SECURITY NOTICE:
 * ============================================================================
 * These frontend permissions are STRICTLY FOR UX / UI PRESENTATION ONLY.
 * They control navigation display, button visibility, and client-side routing hints.
 * They DO NOT provide actual cryptographic or server-side security.
 * 
 * In production, REAL AUTHORIZATION MUST ALWAYS BE ENFORCED BY THE BACKEND API
 * AND DATABASE ROW-LEVEL / SCOPE-BASED POLICIES.
 * ============================================================================
 */

export enum Permission {
  // School user permissions
  VIEW_OWN_SCHOOL = 'VIEW_OWN_SCHOOL',
  EDIT_OWN_SCHOOL_INFO = 'EDIT_OWN_SCHOOL_INFO',
  SUBMIT_ASSESSMENT = 'SUBMIT_ASSESSMENT',
  UPLOAD_EVIDENCE = 'UPLOAD_EVIDENCE',
  UPDATE_COORDINATES = 'UPDATE_COORDINATES',
  VIEW_PUBLIC_RANKINGS = 'VIEW_PUBLIC_RANKINGS',
  VIEW_OWN_NOTIFICATIONS = 'VIEW_OWN_NOTIFICATIONS',

  // Admin permissions
  VIEW_ALL_SCHOOLS = 'VIEW_ALL_SCHOOLS',
  MANAGE_SCHOOLS = 'MANAGE_SCHOOLS',
  REVIEW_ASSESSMENTS = 'REVIEW_ASSESSMENTS',
  VERIFY_ASSESSMENTS = 'VERIFY_ASSESSMENTS',
  REVIEW_EVIDENCE = 'REVIEW_EVIDENCE',
  VERIFY_COORDINATES = 'VERIFY_COORDINATES',
  MANAGE_CRITERIA = 'MANAGE_CRITERIA',
  VIEW_ANALYTICS_MAP = 'VIEW_ANALYTICS_MAP',
  VIEW_DETAILED_STATISTICS = 'VIEW_DETAILED_STATISTICS',
  GENERATE_REPORTS = 'GENERATE_REPORTS',
  SEND_NOTIFICATIONS = 'SEND_NOTIFICATIONS',
  VIEW_AUDIT_LOGS = 'VIEW_AUDIT_LOGS',

  // Super Admin exclusive permissions
  MANAGE_ADMINS = 'MANAGE_ADMINS',
  ASSIGN_ADMIN_SCOPES = 'ASSIGN_ADMIN_SCOPES',
  MANAGE_ADMIN_PERMISSIONS = 'MANAGE_ADMIN_PERMISSIONS',
  DEACTIVATE_ADMINS = 'DEACTIVATE_ADMINS',
  MANAGE_SYSTEM_SETTINGS = 'MANAGE_SYSTEM_SETTINGS',
}

const SCHOOL_USER_PERMISSIONS: ReadonlySet<Permission> = new Set([
  Permission.VIEW_OWN_SCHOOL,
  Permission.EDIT_OWN_SCHOOL_INFO,
  Permission.SUBMIT_ASSESSMENT,
  Permission.UPLOAD_EVIDENCE,
  Permission.UPDATE_COORDINATES,
  Permission.VIEW_PUBLIC_RANKINGS,
  Permission.VIEW_OWN_NOTIFICATIONS,
]);

const ADMIN_PERMISSIONS: ReadonlySet<Permission> = new Set([
  // Inherits view own info
  Permission.VIEW_OWN_SCHOOL,
  Permission.VIEW_PUBLIC_RANKINGS,
  Permission.VIEW_OWN_NOTIFICATIONS,
  // Admin management capabilities
  Permission.VIEW_ALL_SCHOOLS,
  Permission.MANAGE_SCHOOLS,
  Permission.REVIEW_ASSESSMENTS,
  Permission.VERIFY_ASSESSMENTS,
  Permission.REVIEW_EVIDENCE,
  Permission.VERIFY_COORDINATES,
  Permission.MANAGE_CRITERIA,
  Permission.VIEW_ANALYTICS_MAP,
  Permission.VIEW_DETAILED_STATISTICS,
  Permission.GENERATE_REPORTS,
  Permission.SEND_NOTIFICATIONS,
  Permission.VIEW_AUDIT_LOGS,
]);

const SUPER_ADMIN_PERMISSIONS: ReadonlySet<Permission> = new Set([
  ...Array.from(ADMIN_PERMISSIONS),
  Permission.MANAGE_ADMINS,
  Permission.ASSIGN_ADMIN_SCOPES,
  Permission.MANAGE_ADMIN_PERMISSIONS,
  Permission.DEACTIVATE_ADMINS,
  Permission.MANAGE_SYSTEM_SETTINGS,
]);

const ROLE_PERMISSIONS_MAP: Record<UserRole, ReadonlySet<Permission>> = {
  [UserRole.SCHOOL_USER]: SCHOOL_USER_PERMISSIONS,
  [UserRole.ADMIN]: ADMIN_PERMISSIONS,
  [UserRole.SUPER_ADMIN]: SUPER_ADMIN_PERMISSIONS,
};

/**
 * Checks whether a given user has a specific permission.
 */
export function hasPermission(user: User | null | undefined, permission: Permission): boolean {
  if (!user || !user.isActive) {
    return false;
  }
  const permissions = ROLE_PERMISSIONS_MAP[user.role];
  return permissions ? permissions.has(permission) : false;
}

/**
 * Checks whether a user can view or interact with a specific school.
 * School users may only interact with their assigned schoolId.
 * Admins and Super Admins can interact with all schools (or regional scopes if assigned).
 */
export function canAccessSchool(user: User | null | undefined, schoolId: string): boolean {
  if (!user || !user.isActive) {
    return false;
  }
  if (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) {
    return true;
  }
  if (user.role === UserRole.SCHOOL_USER) {
    return user.schoolId === schoolId;
  }
  return false;
}

/**
 * Checks whether a user can edit a specific school's information.
 */
export function canEditSchool(user: User | null | undefined, targetSchoolId: string): boolean {
  if (!user || !user.isActive) {
    return false;
  }
  if (user.role === UserRole.SUPER_ADMIN || user.role === UserRole.ADMIN) {
    return true;
  }
  if (user.role === UserRole.SCHOOL_USER) {
    return user.schoolId === targetSchoolId;
  }
  return false;
}

/**
 * Checks whether a user is an administrator (ADMIN or SUPER_ADMIN).
 */
export function isAdmin(user: User | null | undefined): boolean {
  if (!user || !user.isActive) return false;
  return user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN;
}

/**
 * Checks whether a user is a Super Admin.
 */
export function isSuperAdmin(user: User | null | undefined): boolean {
  if (!user || !user.isActive) return false;
  return user.role === UserRole.SUPER_ADMIN;
}
