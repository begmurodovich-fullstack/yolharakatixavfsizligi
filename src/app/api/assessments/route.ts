import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const periodId = searchParams.get('periodId');

    let sql = `
      SELECT a.*, s.name as school_name, s.region_id, s.district_id, s.current_score as school_current_score,
             s.can_reassess, s.reassess_reason
      FROM assessments a
      JOIN schools s ON a.school_id = s.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (schoolId) {
      sql += ` AND a.school_id = $${paramIndex++}`;
      params.push(schoolId);
    }

    if (periodId) {
      sql += ` AND a.period_id = $${paramIndex++}`;
      params.push(periodId);
    }

    sql += ` ORDER BY a.updated_at DESC`;

    const rows = await query(sql, params);

    const formatted = rows.map((a) => ({
      id: a.id,
      schoolId: a.school_id,
      schoolName: a.school_name,
      periodId: a.period_id,
      status: a.status,
      canReassess: Boolean(a.can_reassess),
      reassessReason: a.reassess_reason || null,
      score: a.total_score ?? a.score ?? 0,
      maxScore: a.max_score || 100,
      percentage: a.percentage ?? (a.total_score ?? 0),
      answers: a.answers || {},
      criterionScores: a.criterion_scores || {},
      reviewerNotes: a.reviewer_notes,
      verifiedBy: a.reviewed_by,
      verifiedAt: a.reviewed_at,
      submittedBy: a.submitted_by,
      submittedAt: a.submitted_at,
      createdAt: a.created_at,
      updatedAt: a.updated_at,
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error('Assessments API GET error:', error);
    return NextResponse.json(
      { message: error?.message || 'Baholashlarni olishda xatolik' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      schoolId,
      periodId = 'period-2026-q1',
      status = 'SUBMITTED',
      score = 0,
      maxScore = 100,
      percentage = 0,
      answers = {},
      criterionScores = {},
      reviewerNotes = '',
      submittedBy = null,
    } = body;

    if (!schoolId) {
      return NextResponse.json({ message: 'Maktab ID kiritilishi shart' }, { status: 400 });
    }

    // 1. Check that all 40 criteria have been selected
    const answerKeys = Object.keys(answers || {});
    if (answerKeys.length < 40) {
      return NextResponse.json(
        {
          message: `Xatolik: Barcha 40 ta mezon to‘liq baholanishi shart! Hozirda 40 tadan faqat ${answerKeys.length} tasi kiritilgan. Iltimos, barcha 40 ta mezonni to‘liq belgilang.`,
        },
        { status: 400 }
      );
    }

    // 2. Check if school already submitted and if re-assessment permission is granted
    const schoolRow = await query(
      `SELECT id, can_reassess, reassess_reason FROM schools WHERE id = $1 LIMIT 1`,
      [schoolId]
    );
    const canReassess = schoolRow.length > 0 ? Boolean(schoolRow[0].can_reassess) : false;

    const existing = await query(
      `SELECT id, status, total_score FROM assessments WHERE school_id = $1 AND period_id = $2 LIMIT 1`,
      [schoolId, periodId]
    );

    if (existing.length > 0) {
      const prev = existing[0];
      // If already submitted or verified and NOT allowed to retake:
      if (
        (prev.status === 'SUBMITTED' || prev.status === 'VERIFIED') &&
        prev.status !== 'RETAKE_ALLOWED' &&
        !canReassess
      ) {
        return NextResponse.json(
          {
            message:
              'Ushbu maktab allaqachon yo‘l xavfsizligi monitoringi bo‘yicha baholashdan o‘tgan! Qayta baholash uchun hududiy IIV YHXX administratori ruxsati talab qilinadi.',
            isLocked: true,
          },
          { status: 403 }
        );
      }
    }

    // Determine score status
    const numericScore = Number(score) || 0;
    const scoreStatus = numericScore >= 80 ? 'GREEN' : numericScore >= 50 ? 'YELLOW' : 'RED';
    const finalPercentage = percentage || numericScore;

    const targetId = existing.length > 0 ? existing[0].id : (body.id || `ass-${schoolId}-${periodId}`);

    const rows = await query(
      `INSERT INTO assessments (
        id, school_id, period_id, status, total_score, max_score, percentage,
        answers, criterion_scores, reviewer_notes, score_status, submitted_by, submitted_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE 
      SET status = EXCLUDED.status,
          total_score = EXCLUDED.total_score,
          max_score = EXCLUDED.max_score,
          percentage = EXCLUDED.percentage,
          answers = EXCLUDED.answers,
          criterion_scores = EXCLUDED.criterion_scores,
          reviewer_notes = EXCLUDED.reviewer_notes,
          score_status = EXCLUDED.score_status,
          submitted_by = COALESCE(EXCLUDED.submitted_by, assessments.submitted_by),
          submitted_at = NOW(),
          updated_at = NOW()
      RETURNING *`,
      [
        targetId,
        schoolId,
        periodId,
        'SUBMITTED', // Reset to SUBMITTED once retake is submitted
        numericScore,
        maxScore,
        finalPercentage,
        JSON.stringify(answers),
        JSON.stringify(criterionScores || {}),
        reviewerNotes,
        scoreStatus,
        submittedBy || null,
      ]
    );

    // Also update school's current_score in schools table and lock re-assessment until new permission
    await query(
      `UPDATE schools 
       SET current_score = $1, 
           can_reassess = FALSE, 
           reassess_reason = NULL, 
           updated_at = NOW() 
       WHERE id = $2`,
      [numericScore, schoolId]
    );

    const a = rows[0];
    return NextResponse.json({
      id: a.id,
      schoolId: a.school_id,
      periodId: a.period_id,
      status: a.status,
      score: a.total_score,
      maxScore: a.max_score,
      percentage: a.percentage,
      answers: a.answers || {},
      criterionScores: a.criterion_scores || {},
      reviewerNotes: a.reviewer_notes,
      submittedAt: a.submitted_at,
      updatedAt: a.updated_at,
    });
  } catch (error: any) {
    console.error('Assessments API POST error:', error);
    return NextResponse.json(
      { message: error?.message || 'Baholashni saqlashda xatolik' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, reviewerNotes, reviewedBy, action, reason, schoolId, adminName } = body;

    if (!id) {
      return NextResponse.json({ message: 'Baholash ID kiritilishi shart' }, { status: 400 });
    }

    // 1. Action: ALLOW_RETAKE (Qayta baholashga ruxsat berish)
    if (action === 'ALLOW_RETAKE') {
      const assRows = await query(
        `UPDATE assessments 
         SET status = 'RETAKE_ALLOWED',
             reviewer_notes = COALESCE($1, reviewer_notes),
             updated_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [reason ? `Qayta baholash ruxsati: ${reason}` : 'Qayta baholash ruxsati berildi', id]
      );

      if (assRows.length === 0) {
        return NextResponse.json({ message: 'Baholash topilmadi' }, { status: 404 });
      }

      const a = assRows[0];
      const targetSchoolId = schoolId || a.school_id;

      // Update school table can_reassess to true
      await query(
        `UPDATE schools 
         SET can_reassess = TRUE, 
             reassess_reason = $1, 
             updated_at = NOW() 
         WHERE id = $2`,
        [reason || 'Administrator tomonidan qayta baholashga ruxsat berildi', targetSchoolId]
      );

      // Audit Log
      await query(
        `INSERT INTO audit_logs (id, actor_name, actor_role, action, target, target_id, new_value, timestamp)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
        [
          `log-retake-${Date.now()}`,
          adminName || 'YHXX Administratori',
          'ADMIN',
          'ALLOW_REASSESSMENT',
          'School Assessment',
          targetSchoolId,
          JSON.stringify({ assessmentId: id, schoolId: targetSchoolId, reason, status: 'RETAKE_ALLOWED' }),
        ]
      ).catch((e) => console.warn('Audit log write error:', e));

      return NextResponse.json({
        message: 'Maktabga qayta baholash uchun ruxsat berildi!',
        assessment: {
          ...a,
          canReassess: true,
          reassessReason: reason,
        },
      });
    }

    // 2. Action: REVOKE_RETAKE (Ruxsatni bekor qilish)
    if (action === 'REVOKE_RETAKE') {
      const assRows = await query(
        `UPDATE assessments 
         SET status = 'SUBMITTED',
             updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      if (assRows.length === 0) {
        return NextResponse.json({ message: 'Baholash topilmadi' }, { status: 404 });
      }

      const a = assRows[0];
      const targetSchoolId = schoolId || a.school_id;

      await query(
        `UPDATE schools 
         SET can_reassess = FALSE, 
             reassess_reason = NULL, 
             updated_at = NOW() 
         WHERE id = $1`,
        [targetSchoolId]
      );

      return NextResponse.json({
        message: 'Qayta baholash ruxsati bekor qilindi!',
        assessment: a,
      });
    }

    // 3. Normal Verification or Rejection
    const rows = await query(
      `UPDATE assessments
       SET status = COALESCE($1, status),
           reviewer_notes = COALESCE($2, reviewer_notes),
           reviewed_by = COALESCE($3, reviewed_by),
           reviewed_at = NOW(),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [status || null, reviewerNotes || null, reviewedBy || null, id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Baholash topilmadi' }, { status: 404 });
    }

    const a = rows[0];

    // If verified, ensure school's current_score is synced
    if (status === 'VERIFIED') {
      await query(`UPDATE schools SET current_score = $1, updated_at = NOW() WHERE id = $2`, [
        a.total_score,
        a.school_id,
      ]);
    }

    return NextResponse.json({
      id: a.id,
      schoolId: a.school_id,
      status: a.status,
      score: a.total_score,
      maxScore: a.max_score,
      percentage: a.percentage,
      reviewerNotes: a.reviewer_notes,
      verifiedBy: a.reviewed_by,
      verifiedAt: a.reviewed_at,
      updatedAt: a.updated_at,
    });
  } catch (error: any) {
    console.error('Assessments API PATCH error:', error);
    return NextResponse.json(
      { message: error?.message || 'Baholashni tasdiqlashda xatolik' },
      { status: 500 }
    );
  }
}
