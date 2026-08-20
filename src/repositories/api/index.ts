import {
  ISchoolRepository,
  IUserRepository,
  IAssessmentRepository,
  ICriterionRepository,
  IRankingRepository,
  INotificationRepository,
  IEvidenceRepository,
  ICoordinateRepository,
  IAuditLogRepository,
} from '../interfaces';

import {
  School,
  SchoolFilterParams,
  Region,
  District,
  User,
  Assessment,
  AssessmentPeriod,
  Criterion,
  Question,
  RankingEntry,
  RankingScope,
  ScoreStatus,
  SchoolRankingOverview,
  Notification,
  Evidence,
  Coordinate,
  AuditLog,
  CoordinateStatus,
  EvidenceStatus,
  AssessmentStatus,
} from '@/types';

import { apiClient } from '@/lib/apiClient';

// 1. ApiSchoolRepository
export class ApiSchoolRepository implements ISchoolRepository {
  async getAll(params?: SchoolFilterParams): Promise<School[]> {
    const queryParams: Record<string, string | number> = {};
    if (params?.regionId) queryParams.regionId = params.regionId;
    if (params?.districtId) queryParams.districtId = params.districtId;
    if (params?.scoreStatus) queryParams.scoreStatus = params.scoreStatus;
    if (params?.coordinateStatus) queryParams.coordStatus = params.coordinateStatus;
    if (params?.searchQuery) queryParams.search = params.searchQuery;

    return apiClient<School[]>('/schools', { params: queryParams });
  }

  async getById(id: string): Promise<School | null> {
    return apiClient<School>(`/schools/${id}`);
  }

  async getByNumberAndDistrict(schoolNumber: string, districtId: string): Promise<School | null> {
    const schools = await apiClient<School[]>('/schools', {
      params: { districtId, search: schoolNumber },
    });
    return schools.find((s) => s.schoolNumber === schoolNumber && s.districtId === districtId) || null;
  }

  async getRegions(): Promise<Region[]> {
    return apiClient<Region[]>('/regions');
  }

  async getDistricts(regionId?: string): Promise<District[]> {
    return apiClient<District[]>('/districts', {
      params: regionId ? { regionId } : {},
    });
  }

  async updateSchool(id: string, updates: Partial<School>): Promise<School> {
    return apiClient<School>(`/schools/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async updateCoordinates(id: string, coordinate: Coordinate): Promise<School> {
    return apiClient<School>(`/schools/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(coordinate),
    });
  }
}

// 2. ApiUserRepository
export class ApiUserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    return apiClient<User[]>('/users');
  }

  async getById(id: string): Promise<User | null> {
    return apiClient<User>(`/users/${id}`);
  }

  async getByEmail(email: string): Promise<User | null> {
    return apiClient<User>(`/users/by-email?email=${encodeURIComponent(email)}`);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    return apiClient<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }
}

// 3. ApiAssessmentRepository
export class ApiAssessmentRepository implements IAssessmentRepository {
  async getBySchoolAndPeriod(schoolId: string, periodId: string): Promise<Assessment | null> {
    const assessments = await apiClient<Assessment[]>('/assessments', {
      params: { schoolId, periodId },
    });
    return assessments[0] || null;
  }

  async getPeriods(): Promise<AssessmentPeriod[]> {
    return [
      {
        id: 'period-2026-q1',
        name: '2025–2026 o‘quv yili (III chorak)',
        startDate: '2026-01-10T00:00:00Z',
        endDate: '2026-03-31T23:59:59Z',
        isCurrent: true,
        academicYear: '2025-2026',
        description: 'Joriy respublika maktablari yo‘l xavfsizligi monitoring davri',
      },
    ];
  }

  async getCurrentPeriod(): Promise<AssessmentPeriod | null> {
    return (await this.getPeriods())[0];
  }

  async getAllAssessments(periodId?: string): Promise<Assessment[]> {
    return apiClient<Assessment[]>('/assessments', {
      params: periodId ? { periodId } : {},
    });
  }

  async saveAssessment(
    assessment: Partial<Assessment> & { schoolId: string; periodId: string }
  ): Promise<Assessment> {
    return apiClient<Assessment>('/assessments', {
      method: 'POST',
      body: JSON.stringify(assessment),
    });
  }

  async updateStatus(
    assessmentId: string,
    status: AssessmentStatus,
    notes?: string,
    verifiedBy?: string
  ): Promise<Assessment> {
    return apiClient<Assessment>(`/assessments`, {
      method: 'POST',
      body: JSON.stringify({ id: assessmentId, status, reviewerNotes: notes, verifiedBy }),
    });
  }
}

// 4. ApiCriterionRepository
export class ApiCriterionRepository implements ICriterionRepository {
  async getAllCriteria(): Promise<Criterion[]> {
    const res = await apiClient<{ criteria: Criterion[]; questions: Question[] }>('/criteria');
    return res?.criteria || [];
  }

  async getCriterionById(id: string): Promise<Criterion | null> {
    const criteria = await this.getAllCriteria();
    return criteria.find((c) => c.id === id) || null;
  }

  async getAllQuestions(criterionId?: string): Promise<Question[]> {
    const res = await apiClient<{ criteria: Criterion[]; questions: Question[] }>('/criteria');
    const questions = res?.questions || [];
    return criterionId ? questions.filter((q) => q.criterionId === criterionId) : questions;
  }

  async getQuestionById(id: string): Promise<Question | null> {
    const questions = await this.getAllQuestions();
    return questions.find((q) => q.id === id) || null;
  }
}

// 5. ApiRankingRepository
export class ApiRankingRepository implements IRankingRepository {
  private calculateScoreStatus(score: number): ScoreStatus {
    if (score >= 80) return ScoreStatus.GREEN;
    if (score >= 50) return ScoreStatus.YELLOW;
    return ScoreStatus.RED;
  }

  async getRepublicRankings(periodId: string): Promise<RankingEntry[]> {
    const schools = await apiClient<School[]>('/schools', { params: { limit: 100 } });
    return schools.map((s, index) => ({
      rank: index + 1,
      previousRank: index + 1,
      entityId: s.id,
      entityName: s.name,
      scope: RankingScope.REPUBLIC,
      regionId: s.regionId,
      regionName: s.regionName,
      districtId: s.districtId,
      districtName: s.districtName,
      score: s.currentScore,
      maxScore: 100,
      percentage: s.currentScore,
      scoreStatus: this.calculateScoreStatus(s.currentScore),
      assessmentPeriodId: periodId,
      schoolCount: schools.length,
    }));
  }

  async getRegionRankings(periodId: string, regionId?: string): Promise<RankingEntry[]> {
    const schools = await apiClient<School[]>('/schools', {
      params: { regionId: regionId || 'ALL', limit: 100 },
    });
    return schools.map((s, index) => ({
      rank: index + 1,
      previousRank: index + 1,
      entityId: s.id,
      entityName: s.name,
      scope: RankingScope.REGION,
      regionId: s.regionId,
      regionName: s.regionName,
      districtId: s.districtId,
      districtName: s.districtName,
      score: s.currentScore,
      maxScore: 100,
      percentage: s.currentScore,
      scoreStatus: this.calculateScoreStatus(s.currentScore),
      assessmentPeriodId: periodId,
      schoolCount: schools.length,
    }));
  }

  async getDistrictRankings(periodId: string, districtId?: string): Promise<RankingEntry[]> {
    const schools = await apiClient<School[]>('/schools', {
      params: { districtId: districtId || 'ALL', limit: 100 },
    });
    return schools.map((s, index) => ({
      rank: index + 1,
      previousRank: index + 1,
      entityId: s.id,
      entityName: s.name,
      scope: RankingScope.DISTRICT,
      regionId: s.regionId,
      regionName: s.regionName,
      districtId: s.districtId,
      districtName: s.districtName,
      score: s.currentScore,
      maxScore: 100,
      percentage: s.currentScore,
      scoreStatus: this.calculateScoreStatus(s.currentScore),
      assessmentPeriodId: periodId,
      schoolCount: schools.length,
    }));
  }

  async getSchoolRankingOverview(schoolId: string, periodId: string): Promise<SchoolRankingOverview | null> {
    const school = await apiClient<School>(`/schools/${schoolId}`);
    if (!school) return null;

    const districtList = await this.getDistrictRankings(periodId, school.districtId);
    const regionList = await this.getRegionRankings(periodId, school.regionId);
    const republicList = await this.getRepublicRankings(periodId);

    const distIndex = districtList.findIndex((s) => s.entityId === schoolId);
    const regIndex = regionList.findIndex((s) => s.entityId === schoolId);
    const repIndex = republicList.findIndex((s) => s.entityId === schoolId);

    return {
      schoolId: school.id,
      schoolName: school.name,
      schoolNumber: school.schoolNumber,
      regionName: school.regionName || '',
      districtName: school.districtName || '',
      periodId,
      periodName: '2025–2026 o‘quv yili (III chorak)',
      currentScore: school.currentScore,
      maxScore: 100,
      percentage: school.currentScore,
      scoreStatus: this.calculateScoreStatus(school.currentScore),
      districtRank: distIndex >= 0 ? distIndex + 1 : 1,
      totalDistrictSchools: districtList.length || 1,
      regionRank: regIndex >= 0 ? regIndex + 1 : 1,
      totalRegionSchools: regionList.length || 1,
      republicRank: repIndex >= 0 ? repIndex + 1 : 1,
      totalRepublicSchools: republicList.length || 10110,
    };
  }
}

// 6. ApiNotificationRepository
export class ApiNotificationRepository implements INotificationRepository {
  async getUserNotifications(userId?: string, role?: string): Promise<Notification[]> {
    return apiClient<Notification[]>('/notifications');
  }

  async markAsRead(id: string): Promise<boolean> {
    return true;
  }

  async markAllAsRead(userId?: string): Promise<boolean> {
    return true;
  }
}

// 7. ApiEvidenceRepository
export class ApiEvidenceRepository implements IEvidenceRepository {
  async getAll(): Promise<Evidence[]> {
    return apiClient<Evidence[]>('/evidence');
  }

  async getBySchool(schoolId: string): Promise<Evidence[]> {
    return apiClient<Evidence[]>('/evidence', { params: { schoolId } });
  }

  async getByQuestion(questionId: string, schoolId: string): Promise<Evidence[]> {
    const list = await this.getBySchool(schoolId);
    return list.filter((e) => e.questionId === questionId);
  }

  async getAllPending(): Promise<Evidence[]> {
    return apiClient<Evidence[]>('/evidence', { params: { status: 'PENDING' } });
  }

  async updateStatus(
    id: string,
    status: EvidenceStatus,
    reviewReason?: string,
    reviewerId?: string
  ): Promise<Evidence> {
    return apiClient<Evidence>(`/evidence`, {
      method: 'POST',
      body: JSON.stringify({ id, status, reviewReason, reviewerId }),
    });
  }

  async uploadEvidence(evidence: Omit<Evidence, 'id' | 'uploadedAt'>): Promise<Evidence> {
    return apiClient<Evidence>('/evidence', {
      method: 'POST',
      body: JSON.stringify(evidence),
    });
  }
}

// 8. ApiCoordinateRepository
export class ApiCoordinateRepository implements ICoordinateRepository {
  async getPendingCoordinates(): Promise<School[]> {
    return apiClient<School[]>('/schools', { params: { coordStatus: 'PENDING' } });
  }

  async updateCoordinateStatus(
    schoolId: string,
    status: CoordinateStatus,
    verifierId?: string
  ): Promise<School> {
    return apiClient<School>(`/schools/${schoolId}`, {
      method: 'PATCH',
      body: JSON.stringify({ coordinateStatus: status }),
    });
  }
}

// 9. ApiAuditLogRepository
export class ApiAuditLogRepository implements IAuditLogRepository {
  async getLogs(limit?: number): Promise<AuditLog[]> {
    return apiClient<AuditLog[]>('/admin/audit-logs', {
      params: { limit: limit || 50 },
    });
  }

  async logAction(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    return {
      id: `aud-${Date.now()}`,
      actorId: log.actorId,
      actorName: log.actorName,
      actorRole: log.actorRole,
      action: log.action,
      target: log.target,
      targetId: log.targetId,
      oldValue: log.oldValue,
      newValue: log.newValue,
      timestamp: new Date().toISOString(),
    };
  }
}
