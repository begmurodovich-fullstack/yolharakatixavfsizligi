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
  MOCK_SCHOOLS,
  MOCK_REGIONS,
  MOCK_DISTRICTS,
  MOCK_USERS,
  MOCK_PERIODS,
  MOCK_CRITERIA,
  MOCK_QUESTIONS,
  MOCK_ASSESSMENTS,
  MOCK_EVIDENCE,
  MOCK_NOTIFICATIONS,
  MOCK_AUDIT_LOGS,
} from '@/data/mock';

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
  SchoolRankingOverview,
  Notification,
  Evidence,
  Coordinate,
  AuditLog,
  CoordinateStatus,
  EvidenceStatus,
  AssessmentStatus,
} from '@/types';

import { evaluateScore } from '@/lib/scoreRules';
import { findCurrentPeriod } from '@/lib/periodRules';

/**
 * In-memory state containers to support prototype updates during session
 */
let schoolsState = [...MOCK_SCHOOLS];
let usersState = [...MOCK_USERS];
let assessmentsState = [...MOCK_ASSESSMENTS];
let evidenceState = [...MOCK_EVIDENCE];
let notificationsState = [...MOCK_NOTIFICATIONS];
let auditLogsState = [...MOCK_AUDIT_LOGS];

export class MockSchoolRepository implements ISchoolRepository {
  async getAll(params?: SchoolFilterParams): Promise<School[]> {
    let filtered = [...schoolsState];

    if (params?.regionId) {
      filtered = filtered.filter((s) => s.regionId === params.regionId);
    }
    if (params?.districtId) {
      filtered = filtered.filter((s) => s.districtId === params.districtId);
    }
    if (params?.status) {
      filtered = filtered.filter((s) => s.status === params.status);
    }
    if (params?.coordinateStatus) {
      filtered = filtered.filter((s) => s.coordinateStatus === params.coordinateStatus);
    }
    if (params?.searchQuery) {
      const q = params.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.schoolNumber.includes(q) ||
          s.regionName.toLowerCase().includes(q) ||
          s.districtName.toLowerCase().includes(q) ||
          s.directorName.toLowerCase().includes(q)
      );
    }
    if (params?.scoreStatus) {
      filtered = filtered.filter(
        (s) => evaluateScore(s.currentScore).status === params.scoreStatus
      );
    }

    return filtered;
  }

  async getById(id: string): Promise<School | null> {
    const school = schoolsState.find((s) => s.id === id);
    return school ? { ...school } : null;
  }

  async getByNumberAndDistrict(schoolNumber: string, districtId: string): Promise<School | null> {
    const school = schoolsState.find(
      (s) => s.schoolNumber === schoolNumber && s.districtId === districtId
    );
    return school ? { ...school } : null;
  }

  async getRegions(): Promise<Region[]> {
    return [...MOCK_REGIONS];
  }

  async getDistricts(regionId?: string): Promise<District[]> {
    if (regionId) {
      return MOCK_DISTRICTS.filter((d) => d.regionId === regionId);
    }
    return [...MOCK_DISTRICTS];
  }

  async updateSchool(id: string, updates: Partial<School>): Promise<School> {
    const idx = schoolsState.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error(`School with ID ${id} not found`);

    schoolsState[idx] = {
      ...schoolsState[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return { ...schoolsState[idx] };
  }

  async updateCoordinates(id: string, coordinate: Coordinate): Promise<School> {
    const idx = schoolsState.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error(`School with ID ${id} not found`);

    schoolsState[idx] = {
      ...schoolsState[idx],
      coordinates: coordinate,
      coordinateStatus: coordinate.status,
      updatedAt: new Date().toISOString(),
    };
    return { ...schoolsState[idx] };
  }
}

export class MockUserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    return [...usersState];
  }

  async getById(id: string): Promise<User | null> {
    const user = usersState.find((u) => u.id === id);
    return user ? { ...user } : null;
  }

  async getByEmail(email: string): Promise<User | null> {
    const normalized = email.toLowerCase().trim();
    const user = usersState.find((u) => u.email.toLowerCase().trim() === normalized);
    return user ? { ...user } : null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const idx = usersState.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error(`User with ID ${id} not found`);

    usersState[idx] = {
      ...usersState[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return { ...usersState[idx] };
  }
}

export class MockAssessmentRepository implements IAssessmentRepository {
  async getBySchoolAndPeriod(schoolId: string, periodId: string): Promise<Assessment | null> {
    const assessment = assessmentsState.find(
      (a) => a.schoolId === schoolId && a.periodId === periodId
    );
    return assessment ? { ...assessment } : null;
  }

  async getPeriods(): Promise<AssessmentPeriod[]> {
    return [...MOCK_PERIODS];
  }

  async getCurrentPeriod(): Promise<AssessmentPeriod | null> {
    return findCurrentPeriod(MOCK_PERIODS);
  }

  async getAllAssessments(periodId?: string): Promise<Assessment[]> {
    if (periodId) {
      return assessmentsState.filter((a) => a.periodId === periodId);
    }
    return [...assessmentsState];
  }

  async saveAssessment(
    payload: Partial<Assessment> & { schoolId: string; periodId: string }
  ): Promise<Assessment> {
    const idx = assessmentsState.findIndex(
      (a) => a.schoolId === payload.schoolId && a.periodId === payload.periodId
    );

    const now = new Date().toISOString();
    let updatedAssessment: Assessment;

    if (idx >= 0) {
      updatedAssessment = {
        ...assessmentsState[idx],
        ...payload,
        updatedAt: now,
      };
      assessmentsState[idx] = updatedAssessment;
    } else {
      updatedAssessment = {
        id: `ass-${payload.schoolId}-${Date.now()}`,
        status: AssessmentStatus.IN_PROGRESS,
        answers: {},
        evidence: [],
        score: 0,
        maxScore: 100,
        percentage: 0,
        createdAt: now,
        updatedAt: now,
        ...payload,
      };
      assessmentsState.push(updatedAssessment);
    }

    return { ...updatedAssessment };
  }

  async updateStatus(
    assessmentId: string,
    status: AssessmentStatus,
    notes?: string,
    verifiedBy?: string
  ): Promise<Assessment> {
    const idx = assessmentsState.findIndex((a) => a.id === assessmentId);
    if (idx === -1) throw new Error(`Assessment with ID ${assessmentId} not found`);

    const now = new Date().toISOString();
    assessmentsState[idx] = {
      ...assessmentsState[idx],
      status,
      reviewerNotes: notes !== undefined ? notes : assessmentsState[idx].reviewerNotes,
      verifiedBy: verifiedBy || assessmentsState[idx].verifiedBy,
      verifiedAt: status === AssessmentStatus.VERIFIED ? now : assessmentsState[idx].verifiedAt,
      updatedAt: now,
    };

    return { ...assessmentsState[idx] };
  }
}

export class MockCriterionRepository implements ICriterionRepository {
  async getAllCriteria(): Promise<Criterion[]> {
    return [...MOCK_CRITERIA].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getCriterionById(id: string): Promise<Criterion | null> {
    const crit = MOCK_CRITERIA.find((c) => c.id === id);
    return crit ? { ...crit } : null;
  }

  async getAllQuestions(criterionId?: string): Promise<Question[]> {
    if (criterionId) {
      return MOCK_QUESTIONS.filter((q) => q.criterionId === criterionId);
    }
    return [...MOCK_QUESTIONS];
  }

  async getQuestionById(id: string): Promise<Question | null> {
    const q = MOCK_QUESTIONS.find((item) => item.id === id);
    return q ? { ...q } : null;
  }
}

export class MockRankingRepository implements IRankingRepository {
  async getRepublicRankings(periodId: string): Promise<RankingEntry[]> {
    const sorted = [...schoolsState].sort((a, b) => b.currentScore - a.currentScore);
    let currentRank = 1;

    return sorted.map((school, index) => {
      if (index > 0 && school.currentScore < sorted[index - 1].currentScore) {
        currentRank = index + 1;
      }
      const evalResult = evaluateScore(school.currentScore);
      const sameScoreCount = sorted.filter((s) => s.currentScore === school.currentScore).length;

      return {
        rank: currentRank,
        entityId: school.id,
        entityName: school.name,
        scope: RankingScope.REPUBLIC,
        regionId: school.regionId,
        regionName: school.regionName,
        districtId: school.districtId,
        districtName: school.districtName,
        score: school.currentScore,
        maxScore: 100,
        percentage: evalResult.percentage,
        scoreStatus: evalResult.status,
        assessmentPeriodId: periodId,
        schoolCount: sameScoreCount,
      };
    });
  }

  async getRegionRankings(periodId: string, regionId?: string): Promise<RankingEntry[]> {
    const schools = regionId
      ? schoolsState.filter((s) => s.regionId === regionId)
      : [...schoolsState];

    const sorted = schools.sort((a, b) => b.currentScore - a.currentScore);
    let currentRank = 1;

    return sorted.map((school, index) => {
      if (index > 0 && school.currentScore < sorted[index - 1].currentScore) {
        currentRank = index + 1;
      }
      const evalResult = evaluateScore(school.currentScore);
      const sameScoreCount = sorted.filter((s) => s.currentScore === school.currentScore).length;

      return {
        rank: currentRank,
        entityId: school.id,
        entityName: school.name,
        scope: RankingScope.REGION,
        regionId: school.regionId,
        regionName: school.regionName,
        districtId: school.districtId,
        districtName: school.districtName,
        score: school.currentScore,
        maxScore: 100,
        percentage: evalResult.percentage,
        scoreStatus: evalResult.status,
        assessmentPeriodId: periodId,
        schoolCount: sameScoreCount,
      };
    });
  }

  async getDistrictRankings(periodId: string, districtId?: string): Promise<RankingEntry[]> {
    const schools = districtId
      ? schoolsState.filter((s) => s.districtId === districtId)
      : [...schoolsState];

    const sorted = schools.sort((a, b) => b.currentScore - a.currentScore);
    let currentRank = 1;

    return sorted.map((school, index) => {
      if (index > 0 && school.currentScore < sorted[index - 1].currentScore) {
        currentRank = index + 1;
      }
      const evalResult = evaluateScore(school.currentScore);
      const sameScoreCount = sorted.filter((s) => s.currentScore === school.currentScore).length;

      return {
        rank: currentRank,
        entityId: school.id,
        entityName: school.name,
        scope: RankingScope.DISTRICT,
        regionId: school.regionId,
        regionName: school.regionName,
        districtId: school.districtId,
        districtName: school.districtName,
        score: school.currentScore,
        maxScore: 100,
        percentage: evalResult.percentage,
        scoreStatus: evalResult.status,
        assessmentPeriodId: periodId,
        schoolCount: sameScoreCount,
      };
    });
  }

  async getSchoolRankingOverview(
    schoolId: string,
    periodId: string
  ): Promise<SchoolRankingOverview | null> {
    const school = schoolsState.find((s) => s.id === schoolId);
    if (!school) return null;

    const repRankings = await this.getRepublicRankings(periodId);
    const regRankings = await this.getRegionRankings(periodId, school.regionId);
    const distRankings = await this.getDistrictRankings(periodId, school.districtId);

    const repEntry = repRankings.find((r) => r.entityId === schoolId);
    const regEntry = regRankings.find((r) => r.entityId === schoolId);
    const distEntry = distRankings.find((r) => r.entityId === schoolId);

    const currentPeriod = findCurrentPeriod(MOCK_PERIODS);
    const evalResult = evaluateScore(school.currentScore);

    return {
      schoolId: school.id,
      schoolName: school.name,
      schoolNumber: school.schoolNumber,
      regionName: school.regionName,
      districtName: school.districtName,
      periodId,
      periodName: currentPeriod?.name || 'Joriy davr',
      currentScore: school.currentScore,
      maxScore: 100,
      percentage: evalResult.percentage,
      scoreStatus: evalResult.status,
      republicRank: repEntry ? repEntry.rank : 1,
      totalRepublicSchools: repRankings.length,
      regionRank: regEntry ? regEntry.rank : 1,
      totalRegionSchools: regRankings.length,
      districtRank: distEntry ? distEntry.rank : 1,
      totalDistrictSchools: distRankings.length,
    };
  }
}

export class MockNotificationRepository implements INotificationRepository {
  async getUserNotifications(userId?: string, role?: string): Promise<Notification[]> {
    return notificationsState.filter((n) => {
      if (userId && n.userId === userId) return true;
      if (role && n.targetRole === role) return true;
      return false;
    });
  }

  async markAsRead(id: string): Promise<boolean> {
    const idx = notificationsState.findIndex((n) => n.id === id);
    if (idx >= 0) {
      notificationsState[idx].read = true;
      return true;
    }
    return false;
  }

  async markAllAsRead(userId?: string): Promise<boolean> {
    notificationsState = notificationsState.map((n) =>
      !userId || n.userId === userId ? { ...n, read: true } : n
    );
    return true;
  }
}

export class MockEvidenceRepository implements IEvidenceRepository {
  async getAll(): Promise<Evidence[]> {
    return [...evidenceState];
  }

  async getBySchool(schoolId: string): Promise<Evidence[]> {
    return evidenceState.filter((e) => e.schoolId === schoolId);
  }

  async getByQuestion(questionId: string, schoolId: string): Promise<Evidence[]> {
    return evidenceState.filter((e) => e.questionId === questionId && e.schoolId === schoolId);
  }

  async getAllPending(): Promise<Evidence[]> {
    return evidenceState.filter((e) => e.status === EvidenceStatus.PENDING);
  }

  async updateStatus(
    id: string,
    status: EvidenceStatus,
    reviewReason?: string,
    reviewerId?: string
  ): Promise<Evidence> {
    const idx = evidenceState.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error(`Evidence with ID ${id} not found`);

    evidenceState[idx] = {
      ...evidenceState[idx],
      status,
      reviewReason,
      reviewedBy: reviewerId,
      reviewedAt: new Date().toISOString(),
    };

    return { ...evidenceState[idx] };
  }

  async uploadEvidence(evidence: Omit<Evidence, 'id' | 'uploadedAt'>): Promise<Evidence> {
    const newEntry: Evidence = {
      id: `ev-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
      ...evidence,
    };
    evidenceState.push(newEntry);
    return { ...newEntry };
  }
}

export class MockCoordinateRepository implements ICoordinateRepository {
  async getPendingCoordinates(): Promise<School[]> {
    return schoolsState.filter((s) => s.coordinateStatus === CoordinateStatus.PENDING);
  }

  async updateCoordinateStatus(
    schoolId: string,
    status: CoordinateStatus,
    verifierId?: string
  ): Promise<School> {
    const idx = schoolsState.findIndex((s) => s.id === schoolId);
    if (idx === -1) throw new Error(`School with ID ${schoolId} not found`);

    const now = new Date().toISOString();
    schoolsState[idx] = {
      ...schoolsState[idx],
      coordinateStatus: status,
      coordinates: {
        ...schoolsState[idx].coordinates,
        status,
        verifiedBy: verifierId,
        verifiedAt: now,
      },
      updatedAt: now,
    };

    return { ...schoolsState[idx] };
  }
}

export class MockAuditLogRepository implements IAuditLogRepository {
  async getLogs(limit = 50): Promise<AuditLog[]> {
    return [...auditLogsState]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async logAction(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...log,
    };
    auditLogsState.unshift(newLog);
    return { ...newLog };
  }
}
