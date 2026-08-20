/**
 * Centralized Authentication & User Types and Enums
 */

export enum UserRole {
  SCHOOL_USER = 'SCHOOL_USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export { UserRole as Role };

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolId?: string;
  regionId?: string;
  districtId?: string;
  isFirstLogin?: boolean;
  isActive: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  token?: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface DemoAccount {
  label: string;
  email: string;
  passwordHint: string;
  role: UserRole;
  description: string;
  schoolInfo?: {
    schoolNumber: string;
    schoolName: string;
    districtName: string;
    regionName: string;
    directorName: string;
  };
}
