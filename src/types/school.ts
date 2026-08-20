/**
 * School and Geographic Domain Types
 * Hierarchy: Region -> District -> School
 */

export interface Region {
  id: string;
  name: string;
  code?: string;
  districtCount?: number;
  schoolCount?: number;
}

export interface District {
  id: string;
  regionId: string;
  name: string;
  schoolCount?: number;
}

export enum CoordinateStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export interface Coordinate {
  latitude: number;
  longitude: number;
  status: CoordinateStatus;
  submittedBy?: string;
  verifiedBy?: string;
  submittedAt?: string;
  verifiedAt?: string;
  addressNotes?: string;
}

export enum SchoolStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export interface School {
  id: string;
  schoolNumber: string;
  name: string;
  regionId: string;
  districtId: string;
  regionName: string;
  districtName: string;
  directorName: string;
  coordinates: Coordinate;
  coordinateStatus: CoordinateStatus;
  status: SchoolStatus;
  currentScore: number;
  ranking?: number;
  studentCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolFilterParams {
  regionId?: string;
  districtId?: string;
  status?: SchoolStatus;
  coordinateStatus?: CoordinateStatus;
  searchQuery?: string;
  scoreStatus?: 'GREEN' | 'YELLOW' | 'RED';
  limit?: number;
  offset?: number;
}
