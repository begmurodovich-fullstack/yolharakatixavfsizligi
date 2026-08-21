import {
  School,
  SchoolFilterParams,
  User,
  Role,
  Assessment,
  AssessmentStatus,
  Evidence,
  EvidenceStatus,
  CoordinateStatus,
  AuditLog,
  Region,
  District,
} from '@/types';
import { isAdmin, isSuperAdmin } from '@/lib/permissions';
import { apiClient } from '@/lib/apiClient';
import { schoolService } from './schoolService';

export interface AdminDashboardSummary {
  totalSchools: number;
  verifiedCoordinatesCount: number;
  pendingCoordinatesCount: number;
  pendingEvidenceCount: number;
  pendingAssessmentsCount: number;
  republicAverageScore: number;
  greenCount: number;
  yellowCount: number;
  redCount: number;
  regionalBreakdown: Array<{
    regionId: string;
    regionName: string;
    totalSchools: number;
    averageScore: number;
    verifiedPercent: number;
  }>;
}

export class AdminService {
  async getDashboardSummary(): Promise<AdminDashboardSummary> {
    try {
      const summary = await apiClient<AdminDashboardSummary>('/admin/dashboard');
      if (summary) {
        return summary;
      }
    } catch (e) {
      console.error('Admin summary API error:', e);
    }

    return {
      totalSchools: 10110,
      verifiedCoordinatesCount: 0,
      pendingCoordinatesCount: 0,
      pendingEvidenceCount: 0,
      pendingAssessmentsCount: 0,
      republicAverageScore: 0,
      greenCount: 0,
      yellowCount: 0,
      redCount: 0,
      regionalBreakdown: [],
    };
  }

  async getAllEvidence(): Promise<Evidence[]> {
    try {
      const evidence = await apiClient<Evidence[]>('/evidence');
      if (Array.isArray(evidence)) return evidence;
      return [];
    } catch {
      return [];
    }
  }

  async reviewEvidence(
    evidenceId: string,
    status: EvidenceStatus,
    reason: string,
    user: User
  ): Promise<Evidence> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar foto-dalillarni tekshirishi mumkin");
    }

    return apiClient<Evidence>(`/evidence`, {
      method: 'PATCH',
      body: JSON.stringify({ id: evidenceId, status, reviewReason: reason, reviewedBy: user.id }),
    });
  }

  async getPendingCoordinates(): Promise<School[]> {
    const list = await schoolService.getSchools({ coordinateStatus: CoordinateStatus.PENDING });
    return list.filter((s) => s.coordinates?.latitude != null && s.coordinates?.longitude != null);
  }

  async verifyCoordinates(
    schoolId: string,
    status: CoordinateStatus,
    user: User,
    reason?: string
  ): Promise<School> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar geolokatsiyani tasdiqlashi mumkin");
    }

    return apiClient<School>(`/schools/${schoolId}`, {
      method: 'PATCH',
      body: JSON.stringify({ coordinateStatus: status }),
    });
  }

  async getAllAssessments(periodId?: string): Promise<Assessment[]> {
    try {
      const assessments = await apiClient<Assessment[]>('/assessments', {
        params: periodId ? { periodId } : {},
      });
      if (Array.isArray(assessments)) return assessments;
      return [];
    } catch {
      return [];
    }
  }

  async verifyAssessment(
    assessmentId: string,
    status: AssessmentStatus.VERIFIED | AssessmentStatus.REJECTED,
    notes: string,
    user: User
  ): Promise<Assessment> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar baholashni tasdiqlashi mumkin");
    }

    return apiClient<Assessment>(`/assessments`, {
      method: 'PATCH',
      body: JSON.stringify({
        id: assessmentId,
        status,
        reviewerNotes: notes,
        reviewedBy: user.id,
      }),
    });
  }

  async getAuditLogs(limit = 100): Promise<AuditLog[]> {
    try {
      const logs = await apiClient<AuditLog[]>('/admin/audit-logs', { params: { limit } });
      if (Array.isArray(logs)) return logs;
      return [];
    } catch {
      return [];
    }
  }

  async resetSchoolPassword(schoolId: string, user: User): Promise<string> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar maktab parolini qayta tiklashi mumkin");
    }

    const school = await schoolService.getSchoolById(schoolId);
    if (!school) throw new Error("Maktab topilmadi");

    const defaultPassword = `Maktab@${school.schoolNumber}`;

    await apiClient(`/schools/${schoolId}`, {
      method: 'PATCH',
      body: JSON.stringify({ passwordHash: defaultPassword, isFirstLogin: true }),
    });

    return defaultPassword;
  }

  async toggleSchoolStatus(schoolId: string, user: User): Promise<School> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar maktab holatini o‘zgartirishi mumkin");
    }

    const school = await schoolService.getSchoolById(schoolId);
    if (!school) throw new Error("Maktab topilmadi");

    const nextStatus = school.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    return apiClient<School>(`/schools/${schoolId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: nextStatus }),
    });
  }

  async getAdminUsers(): Promise<User[]> {
    try {
      const users = await apiClient<User[]>('/users');
      if (Array.isArray(users)) return users;
      return [];
    } catch {
      return [];
    }
  }

  async createAdmin(
    payload: {
      name: string;
      email: string;
      role: Role.ADMIN | Role.SUPER_ADMIN;
      regionId?: string;
    },
    currentUser: User
  ): Promise<User> {
    if (!isSuperAdmin(currentUser)) {
      throw new Error("Faqat bosh administrator yangi admin yarata oladi");
    }

    return apiClient<User>('/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export const adminService = new AdminService();
