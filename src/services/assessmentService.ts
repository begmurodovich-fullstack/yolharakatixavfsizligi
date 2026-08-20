import {
  Assessment,
  AssessmentPeriod,
  AssessmentStatus,
  AssessmentAnswer,
  Criterion,
  Question,
  Evidence,
  EvidenceStatus,
  User,
} from '@/types';
import { repositories } from '@/repositories';
import { evaluateScore } from '@/lib/scoreRules';
import { canAccessSchool, isAdmin } from '@/lib/permissions';

export class AssessmentService {
  async getCurrentPeriod(): Promise<AssessmentPeriod | null> {
    return repositories.assessment.getCurrentPeriod();
  }

  async getAllPeriods(): Promise<AssessmentPeriod[]> {
    return repositories.assessment.getPeriods();
  }

  async getCriteria(): Promise<Criterion[]> {
    return repositories.criterion.getAllCriteria();
  }

  async getQuestions(criterionId?: string): Promise<Question[]> {
    return repositories.criterion.getAllQuestions(criterionId);
  }

  async getAssessment(schoolId: string, periodId?: string): Promise<Assessment | null> {
    let targetPeriodId = periodId;
    if (!targetPeriodId) {
      const currentPeriod = await this.getCurrentPeriod();
      if (!currentPeriod) return null;
      targetPeriodId = currentPeriod.id;
    }
    return repositories.assessment.getBySchoolAndPeriod(schoolId, targetPeriodId);
  }

  async getEvidenceForSchool(schoolId: string): Promise<Evidence[]> {
    return repositories.evidence.getBySchool(schoolId);
  }

  async getEvidenceForQuestion(questionId: string, schoolId: string): Promise<Evidence[]> {
    return repositories.evidence.getByQuestion(questionId, schoolId);
  }

  async uploadMockEvidence(
    schoolId: string,
    questionId: string,
    imageUrl: string,
    caption?: string,
    user?: User,
    rawFile?: File
  ): Promise<Evidence> {
    if (rawFile) {
      const formData = new FormData();
      formData.append('file', rawFile);
      formData.append('schoolId', schoolId);
      formData.append('questionId', questionId);
      formData.append('caption', caption || 'Yo‘l harakati xavfsizligi foto-dalili');
      if (user) formData.append('uploadedBy', user.id);

      const res = await fetch('/api/evidence/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Rasm yuklashda xatolik yuz berdi');
      }

      const data = await res.json();
      return data.evidence;
    }

    const newEvidence = await repositories.evidence.uploadEvidence({
      schoolId,
      questionId,
      imageUrl,
      caption: caption || 'Maktab yo‘l xavfsizligi foto-dalili',
      status: EvidenceStatus.PENDING,
      uploadedBy: user?.id || 'usr-school-24',
    });

    if (user) {
      await repositories.auditLog.logAction({
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: 'UPLOAD_EVIDENCE' as any,
        target: `Foto-dalil (#${questionId})`,
        targetId: newEvidence.id,
      });
    }

    return newEvidence;
  }

  /**
   * Computes score sum based on answered questions
   */
  calculateTotalScore(answers: Record<string, AssessmentAnswer>): {
    score: number;
    maxScore: number;
    percentage: number;
  } {
    let totalPoints = 0;
    const maxScore = 100; // standard maximum points

    Object.values(answers).forEach((ans) => {
      totalPoints += ans.pointsAwarded || 0;
    });

    const evalResult = evaluateScore(totalPoints, maxScore);
    return {
      score: totalPoints,
      maxScore,
      percentage: evalResult.percentage,
    };
  }

  async saveDraftAssessment(
    schoolId: string,
    answers: Record<string, AssessmentAnswer>,
    user: User
  ): Promise<Assessment> {
    if (!canAccessSchool(user, schoolId)) {
      throw new Error("Sizda ushbu maktab baholashini tahrirlash huquqi yo'q");
    }

    const currentPeriod = await this.getCurrentPeriod();
    if (!currentPeriod) throw new Error("Faol baholash davri topilmadi");

    const { score, maxScore, percentage } = this.calculateTotalScore(answers);
    const existingEvidence = await repositories.evidence.getBySchool(schoolId);

    return repositories.assessment.saveAssessment({
      schoolId,
      periodId: currentPeriod.id,
      status: AssessmentStatus.IN_PROGRESS,
      answers,
      evidence: existingEvidence,
      score,
      maxScore,
      percentage,
    });
  }

  async submitAssessment(
    schoolId: string,
    answers: Record<string, AssessmentAnswer>,
    user: User
  ): Promise<Assessment> {
    if (!canAccessSchool(user, schoolId)) {
      throw new Error("Sizda ushbu maktab baholashini topshirish huquqi yo'q");
    }

    const currentPeriod = await this.getCurrentPeriod();
    if (!currentPeriod) throw new Error("Faol baholash davri topilmadi");

    const { score, maxScore, percentage } = this.calculateTotalScore(answers);
    const existingEvidence = await repositories.evidence.getBySchool(schoolId);

    const saved = await repositories.assessment.saveAssessment({
      schoolId,
      periodId: currentPeriod.id,
      status: AssessmentStatus.SUBMITTED,
      answers,
      evidence: existingEvidence,
      score,
      maxScore,
      percentage,
      submittedAt: new Date().toISOString(),
    });

    // Also update school's score
    await repositories.school.updateSchool(schoolId, {
      currentScore: score,
    });

    await repositories.auditLog.logAction({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: 'SUBMIT_ASSESSMENT' as any,
      target: `Maktab baholashi (${currentPeriod.name})`,
      targetId: saved.id,
    });

    return saved;
  }

  async verifyAssessment(
    assessmentId: string,
    status: AssessmentStatus.VERIFIED | AssessmentStatus.REJECTED,
    notes: string,
    user: User
  ): Promise<Assessment> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar baholashni tekshirishi mumkin");
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
      target: `Baholash natijasi (#${assessmentId})`,
      targetId: assessmentId,
      newValue: { status, notes },
    });

    return updated;
  }

  async reviewEvidence(
    evidenceId: string,
    status: EvidenceStatus,
    reason: string,
    user: User
  ): Promise<Evidence> {
    if (!isAdmin(user)) {
      throw new Error("Faqat administratorlar dalillarni tekshirishi mumkin");
    }

    const updated = await repositories.evidence.updateStatus(
      evidenceId,
      status,
      reason,
      user.id
    );

    await repositories.auditLog.logAction({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: 'REVIEW_EVIDENCE' as any,
      target: `Foto-dalil (#${evidenceId})`,
      targetId: evidenceId,
      newValue: { status, reason },
    });

    return updated;
  }
}

export const assessmentService = new AssessmentService();
