import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const status = searchParams.get('status');

    let sql = `
      SELECT e.*, s.name as school_name, s.school_number, q.text as question_text, c.title as criterion_title
      FROM evidence e
      JOIN schools s ON e.school_id = s.id
      LEFT JOIN questions q ON e.question_id = q.id
      LEFT JOIN criteria c ON q.criterion_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (schoolId) {
      sql += ` AND e.school_id = $${paramIndex++}`;
      params.push(schoolId);
    }

    if (status && status !== 'ALL') {
      sql += ` AND e.status = $${paramIndex++}`;
      params.push(status);
    }

    sql += ` ORDER BY e.uploaded_at DESC`;

    const rows = await query(sql, params);

    const formatted = rows.map((e) => ({
      id: e.id,
      schoolId: e.school_id,
      schoolName: e.school_name,
      schoolNumber: e.school_number,
      questionId: e.question_id,
      questionText: e.question_text,
      criterionTitle: e.criterion_title,
      imageUrl: e.image_url,
      caption: e.caption,
      status: e.status,
      reviewReason: e.review_reason,
      reviewedBy: e.reviewed_by,
      reviewedAt: e.reviewed_at,
      uploadedBy: e.uploaded_by,
      uploadedAt: e.uploaded_at,
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error('Evidence API GET error:', error);
    return NextResponse.json(
      { message: error?.message || 'Foto-dalillarni olishda xatolik' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id = `evi-${Date.now()}`,
      schoolId,
      questionId,
      imageUrl,
      caption,
      uploadedBy,
    } = body;

    if (!schoolId || !imageUrl) {
      return NextResponse.json({ message: 'Maktab ID va rasm URL kiritilishi shart' }, { status: 400 });
    }

    const rows = await query(
      `INSERT INTO evidence (id, school_id, question_id, image_url, caption, status, uploaded_by, uploaded_at)
       VALUES ($1, $2, $3, $4, $5, 'PENDING', $6, NOW())
       RETURNING *`,
      [id, schoolId, questionId || 'q1_1', imageUrl, caption || '', uploadedBy || null]
    );

    return NextResponse.json(rows[0]);
  } catch (error: any) {
    console.error('Evidence API POST error:', error);
    return NextResponse.json(
      { message: error?.message || 'Foto-dalilni saqlashda xatolik' },
      { status: 500 }
    );
  }
}
