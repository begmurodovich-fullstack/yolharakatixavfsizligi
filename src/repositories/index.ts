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
} from './interfaces';

import {
  ApiSchoolRepository,
  ApiUserRepository,
  ApiAssessmentRepository,
  ApiCriterionRepository,
  ApiRankingRepository,
  ApiNotificationRepository,
  ApiEvidenceRepository,
  ApiCoordinateRepository,
  ApiAuditLogRepository,
} from './api';

export * from './interfaces';
export * from './api';

/**
 * Global repository container.
 * In live database mode, connects 100% to real PostgreSQL endpoints.
 */
class RepositoryContainer {
  public school: ISchoolRepository;
  public user: IUserRepository;
  public assessment: IAssessmentRepository;
  public criterion: ICriterionRepository;
  public ranking: IRankingRepository;
  public notification: INotificationRepository;
  public evidence: IEvidenceRepository;
  public coordinate: ICoordinateRepository;
  public auditLog: IAuditLogRepository;

  constructor() {
    this.school = new ApiSchoolRepository();
    this.user = new ApiUserRepository();
    this.assessment = new ApiAssessmentRepository();
    this.criterion = new ApiCriterionRepository();
    this.ranking = new ApiRankingRepository();
    this.notification = new ApiNotificationRepository();
    this.evidence = new ApiEvidenceRepository();
    this.coordinate = new ApiCoordinateRepository();
    this.auditLog = new ApiAuditLogRepository();
  }
}

export const repositories = new RepositoryContainer();
