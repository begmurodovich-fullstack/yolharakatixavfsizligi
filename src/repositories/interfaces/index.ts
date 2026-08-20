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
  SchoolRankingOverview,
  Notification,
  Evidence,
  Coordinate,
  AuditLog,
  CoordinateStatus,
  EvidenceStatus,
  AssessmentStatus,
} from '@/types';

export interface ISchoolRepository {
  getAll(params?: SchoolFilterParams): Promise<School[]>;
  getById(id: string): Promise<School | null>;
  getByNumberAndDistrict(schoolNumber: string, districtId: string): Promise<School | null>;
  getRegions(): Promise<Region[]>;
  getDistricts(regionId?: string): Promise<District[]>;
  updateSchool(id: string, updates: Partial<School>): Promise<School>;
  updateCoordinates(id: string, coordinate: Coordinate): Promise<School>;
}

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
}

export interface IAssessmentRepository {
  getBySchoolAndPeriod(schoolId: string, periodId: string): Promise<Assessment | null>;
  getPeriods(): Promise<AssessmentPeriod[]>;
  getCurrentPeriod(): Promise<AssessmentPeriod | null>;
  getAllAssessments(periodId?: string): Promise<Assessment[]>;
  saveAssessment(assessment: Partial<Assessment> & { schoolId: string; periodId: string }): Promise<Assessment>;
  updateStatus(assessmentId: string, status: AssessmentStatus, notes?: string, verifiedBy?: string): Promise<Assessment>;
}

export interface ICriterionRepository {
  getAllCriteria(): Promise<Criterion[]>;
  getCriterionById(id: string): Promise<Criterion | null>;
  getAllQuestions(criterionId?: string): Promise<Question[]>;
  getQuestionById(id: string): Promise<Question | null>;
}

export interface IRankingRepository {
  getRepublicRankings(periodId: string): Promise<RankingEntry[]>;
  getRegionRankings(periodId: string, regionId?: string): Promise<RankingEntry[]>;
  getDistrictRankings(periodId: string, districtId?: string): Promise<RankingEntry[]>;
  getSchoolRankingOverview(schoolId: string, periodId: string): Promise<SchoolRankingOverview | null>;
}

export interface INotificationRepository {
  getUserNotifications(userId?: string, role?: string): Promise<Notification[]>;
  markAsRead(id: string): Promise<boolean>;
  markAllAsRead(userId?: string): Promise<boolean>;
}

export interface IEvidenceRepository {
  getAll(): Promise<Evidence[]>;
  getBySchool(schoolId: string): Promise<Evidence[]>;
  getByQuestion(questionId: string, schoolId: string): Promise<Evidence[]>;
  getAllPending(): Promise<Evidence[]>;
  updateStatus(id: string, status: EvidenceStatus, reviewReason?: string, reviewerId?: string): Promise<Evidence>;
  uploadEvidence(evidence: Omit<Evidence, 'id' | 'uploadedAt'>): Promise<Evidence>;
}

export interface ICoordinateRepository {
  getPendingCoordinates(): Promise<School[]>;
  updateCoordinateStatus(schoolId: string, status: CoordinateStatus, verifierId?: string): Promise<School>;
}

export interface IAuditLogRepository {
  getLogs(limit?: number): Promise<AuditLog[]>;
  logAction(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog>;
}
