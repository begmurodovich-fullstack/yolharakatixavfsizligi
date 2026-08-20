'use client';

import { useAuth } from './useAuth';
import { Permission, hasPermission, canAccessSchool, canEditSchool, isAdmin, isSuperAdmin } from '@/lib/permissions';
import { UserRole } from '@/types';

export function usePermissions() {
  const { user } = useAuth();

  return {
    user,
    role: user?.role,
    isSchoolUser: user?.role === UserRole.SCHOOL_USER,
    isAdmin: isAdmin(user),
    isSuperAdmin: isSuperAdmin(user),
    can: (permission: Permission) => hasPermission(user, permission),
    canAccessSchool: (schoolId: string) => canAccessSchool(user, schoolId),
    canEditSchool: (schoolId: string) => canEditSchool(user, schoolId),
  };
}
