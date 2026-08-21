import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const criteriaRows = await query(
      `SELECT id, title, description, icon, sort_order as "sortOrder", max_score as "maxScore" 
       FROM criteria 
       ORDER BY sort_order ASC`
    );

    const questionsRows = await query(
      `SELECT id, criterion_id as "criterionId", text, description, points, requires_evidence as "requiresEvidence", options 
       FROM questions 
       ORDER BY id ASC`
    );

    return NextResponse.json({
      criteria: criteriaRows,
      questions: questionsRows,
    });
  } catch (error: any) {
    console.error('Criteria API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Mezonlarni olishda xatolik' },
      { status: 500 }
    );
  }
}
