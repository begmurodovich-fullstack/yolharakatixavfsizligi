/**
 * Assessment, Criteria, Questions, Evidence, and Periods Domain Types
 */

export enum AssessmentStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum EvidenceStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface QuestionOption {
  id: string;
  label: string;
  points: number;
}

export interface Question {
  id: string;
  criterionId: string;
  text: string;
  description?: string;
  options: QuestionOption[];
  points: number;
  requiresEvidence: boolean;
  helpGuidance?: string;
}

export interface Criterion {
  id: string;
  title: string;
  description: string;
  icon: string;
  questionCount: number;
  maxScore: number;
  currentScore?: number;
  percentage?: number;
  status?: string;
  order?: number;
}

export interface Evidence {
  id: string;
  questionId: string;
  schoolId: string;
  imageUrl: string;
  caption?: string;
  status: EvidenceStatus;
  reviewReason?: string;
  uploadedBy?: string;
  uploadedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface AssessmentPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  academicYear: string;
  description?: string;
}

export interface AssessmentAnswer {
  questionId: string;
  selectedOptionId?: string;
  pointsAwarded: number;
  notes?: string;
  evidenceIds: string[];
}

export interface Assessment {
  id: string;
  schoolId: string;
  periodId: string;
  status: AssessmentStatus;
  answers: Record<string, AssessmentAnswer>;
  evidence: Evidence[];
  score: number;
  maxScore: number;
  percentage: number;
  submittedAt?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  reviewerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentSubmissionPayload {
  schoolId: string;
  periodId: string;
  answers: Record<string, AssessmentAnswer>;
  evidence: Omit<Evidence, 'id' | 'status' | 'uploadedAt'>[];
}
