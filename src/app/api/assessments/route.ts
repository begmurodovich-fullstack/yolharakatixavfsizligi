import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const periodId = searchParams.get('periodId');

    let sql = `
      SELECT a.*, s.name as school_name, s.region_id, s.district_id 
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
      score: a.score,
      maxScore: a.max_score,
      percentage: a.percentage,
      answers: a.answers || {},
      reviewerNotes: a.reviewer_notes,
      verifiedBy: a.verified_by,
      verifiedAt: a.verified_at,
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
      id = `ass-${Date.now()}`,
      schoolId,
      periodId = 'period-2026-q1',
      status = 'SUBMITTED',
      score = 0,
      maxScore = 100,
      percentage = 0,
      answers = {},
      reviewerNotes = '',
    } = body;

    if (!schoolId) {
      return NextResponse.json({ message: 'Maktab ID kiritilishi shart' }, { status: 400 });
    }

    const rows = await query(
      `INSERT INTO assessments (id, school_id, period_id, status, score, max_score, percentage, answers, reviewer_notes, submitted_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
       ON CONFLICT (id) DO UPDATE 
       SET status = EXCLUDED.status,
           score = EXCLUDED.score,
           max_score = EXCLUDED.max_score,
           percentage = EXCLUDED.percentage,
           answers = EXCLUDED.answers,
           reviewer_notes = EXCLUDED.reviewer_notes,
           submitted_at = NOW(),
           updated_at = NOW()
       RETURNING *`,
      [
        id,
        schoolId,
        periodId,
        status,
        score,
        maxScore,
        percentage,
        JSON.stringify(answers),
        reviewerNotes,
      ]
    );

    // Also update school's current_score
    await query(`UPDATE schools SET current_score = $1, updated_at = NOW() WHERE id = $2`, [
      score,
      schoolId,
    ]);

    const a = rows[0];
    return NextResponse.json({
      id: a.id,
      schoolId: a.school_id,
      periodId: a.period_id,
      status: a.status,
      score: a.score,
      maxScore: a.max_score,
      percentage: a.percentage,
      answers: a.answers || {},
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
