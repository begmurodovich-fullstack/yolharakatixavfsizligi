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
import { repositories } from '@/repositories';
import { evaluateScore } from '@/lib/scoreRules';
import { isAdmin, isSuperAdmin } from '@/lib/permissions';
import { apiClient } from '@/lib/apiClient';

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
      if (summary && summary.totalSchools > 0) {
        return summary;
      }
    } catch (e) {
      console.warn('Admin summary API fallback:', e);
    }

    const schools = await repositories.school.getAll();
    const regions = await repositories.school.getRegions();
    const pendingEvidence = await repositories.evidence.getAllPending();
    const allAssessments = await repositories.assessment.getAllAssessments();
    const pendingAssessments = allAssessments.filter(
      (a) => a.status === AssessmentStatus.SUBMITTED
    );

    let totalScore = 0;
    let greenCount = 0;
    let yellowCount = 0;
    let redCount = 0;
    let verifiedCoords = 0;
    let pendingCoords = 0;

    schools.forEach((s) => {
      totalScore += s.currentScore;
      const evalRes = evaluateScore(s.currentScore);
      if (evalRes.status === 'GREEN') greenCount++;
      else if (evalRes.status === 'YELLOW') yellowCount++;
      else redCount++;

      if (s.coordinateStatus === CoordinateStatus.VERIFIED) verifiedCoords++;
      else if (s.coordinateStatus === CoordinateStatus.PENDING) pendingCoords++;
    });

    const republicAverageScore = schools.length > 0 ? Math.round(totalScore / schools.length) : 0;

    const regionalBreakdown = regions.map((reg) => {
      const regSchools = schools.filter((s) => s.regionId === reg.id);
      const regTotalScore = regSchools.reduce((acc, curr) => acc + curr.currentScore, 0);
      const avg = regSchools.length > 0 ? Math.round(regTotalScore / regSchools.length) : 0;
      const verifiedInReg = regSchools.filter(
        (s) => s.coordinateStatus === CoordinateStatus.VERIFIED
      ).length;
      const verifiedPct = regSchools.length > 0 ? Math.round((verifiedInReg / regSchools.length) * 100) : 0;

      return {
        regionId: reg.id,
        regionName: reg.name,
        totalSchools: regSchools.length,
        averageScore: avg,
        verifiedPercent: verifiedPct,
      };
    });

    return {
      totalSchools: schools.length,
      verifiedCoordinatesCount: verifiedCoords,
      pendingCoordinatesCount: pendingCoords,
      pendingEvidenceCount: pendingEvidence.length,
      pendingAssessmentsCount: pendingAssessments.length,
      republicAverageScore,
      greenCount,
      yellowCount,
      redCount,
      regionalBreakdown,
    };
  }

  async getAllEvidence(): Promise<Evidence[]> {
    return repositories.evidence.getAll();
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

    const updated = await repositories.evidence.updateStatus(
      evidenceId,
      status,
      reason,
      user.id
    );

    // Create notification for school
    await repositories.notification.getUserNotifications(updated.uploadedBy);

    await repositories.auditLog.logAction({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: 'REVIEW_EVIDENCE' as any,
      target: `Foto-dalil (#${evidenceId}) - ${status === EvidenceStatus.APPROVED ? 'Tasdiqlandi' : 'Rad etildi'}`,
      targetId: evidenceId,
      newValue: { status, reason },
    });

    return updated;
  }

  async getPendingCoordinates(): Promise<School[]> {
    return repositories.coordinate.getPendingCoordinates();
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

    const updated = await repositories.coordinate.updateCoordinateStatus(
      schoolId,
      status,
      user.id
    );

    await repositories.auditLog.logAction({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: 'VERIFY_COORDINATES' as any,
      target: `${updated.name} koordinatalari (${status})`,
      targetId: schoolId,
      newValue: { status, reason },
    });

    return updated;
  }

  async getAllAssessments(periodId?: string): Promise<Assessment[]> {
    return repositories.assessment.getAllAssessments(periodId);
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

    const updated = await repositories.assessment.updateStatus(
      assessmentId,
      status,
      notes,
      user.id
    );

    if (status === AssessmentStatus.VERIFIED) {
      await repositories.school.updateSchool(updated.schoolId, {
        currentScore: updated.score,
      });
    }

    await repositories.auditLog.logAction({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: (status === AssessmentStatus.VERIFIED ? 'VERIFY_ASSESSMENT' : 'REJECT_ASSESSMENT') as any,
      target: `Maktab baholash xulosasi (#${assessmentId})`,
      targetId: assessmentId,
      newValue: { status, notes, score: updated.score },
    });

    return updated;
  }

  async getAuditLogs(limit = 100): Promise<AuditLog[]> {
    return repositories.auditLog.getLogs(limit);
  }

  async resetSchoolPassword(schoolId: string, user: User): Promise<string> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar maktab parolini qayta tiklashi mumkin");
    }

    const school = await repositories.school.getById(schoolId);
    if (!school) throw new Error("Maktab topilmadi");

    const defaultPassword = `${school.schoolNumber}maktab`;

    await repositories.auditLog.logAction({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: 'RESET_SCHOOL_PASSWORD' as any,
      target: `${school.name} paroli tiklandi`,
      targetId: schoolId,
    });

    return defaultPassword;
  }

  async toggleSchoolStatus(schoolId: string, user: User): Promise<School> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar maktab holatini o‘zgartirishi mumkin");
    }

    const school = await repositories.school.getById(schoolId);
    if (!school) throw new Error("Maktab topilmadi");

    const newStatus = school.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const updated = await repositories.school.updateSchool(schoolId, {
      status: newStatus as any,
    });

    await repositories.auditLog.logAction({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: 'TOGGLE_SCHOOL_STATUS' as any,
      target: `${school.name} holati: ${newStatus}`,
      targetId: schoolId,
      newValue: { status: newStatus },
    });

    return updated;
  }

  async getAdminUsers(): Promise<User[]> {
    const all = await repositories.user.getAll();
    return all.filter((u) => u.role === Role.ADMIN || u.role === Role.SUPER_ADMIN);
  }

  async createAdmin(
    payload: {
      name: string;
      email: string;
      role: Role.ADMIN | Role.SUPER_ADMIN;
      regionId?: string;
      districtId?: string;
    },
    currentUser: User
  ): Promise<User> {
    if (!isSuperAdmin(currentUser)) {
      throw new Error("Faqat Super Administrator yangi admin yaratishi mumkin");
    }

    const newUser: User = {
      id: `usr-adm-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      isActive: true,
      regionId: payload.regionId,
      districtId: payload.districtId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await repositories.auditLog.logAction({
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action: 'CREATE_ADMIN' as any,
      target: `Yangi admin: ${payload.name} (${payload.role})`,
      targetId: newUser.id,
    });

    return newUser;
  }
}

export const adminService = new AdminService();
