import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const periodId = searchParams.get('periodId');

    let sql = `
      SELECT a.*, s.name as school_name, s.region_id, s.district_id, s.current_score as school_current_score
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

    // Determine score status
    const numericScore = Number(score) || 0;
    const scoreStatus = numericScore >= 80 ? 'GREEN' : numericScore >= 50 ? 'YELLOW' : 'RED';
    const finalPercentage = percentage || numericScore;

    // Check if assessment already exists for school + period
    const existing = await query(
      `SELECT id FROM assessments WHERE school_id = $1 AND period_id = $2 LIMIT 1`,
      [schoolId, periodId]
    );
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
        status,
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

    // Also update school's current_score in schools table
    await query(`UPDATE schools SET current_score = $1, updated_at = NOW() WHERE id = $2`, [
      numericScore,
      schoolId,
    ]);

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
    const { id, status, reviewerNotes, reviewedBy } = body;

    if (!id) {
      return NextResponse.json({ message: 'Baholash ID kiritilishi shart' }, { status: 400 });
    }

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
