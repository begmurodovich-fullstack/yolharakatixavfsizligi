import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const criteriaRows = await query(
      `SELECT c.id, c.title, c.description, c.icon, c.sort_order as "sortOrder", c.sort_order as "order", c.max_score as "maxScore",
              COUNT(q.id)::int as "questionCount"
       FROM criteria c
       LEFT JOIN questions q ON c.id = q.criterion_id
       GROUP BY c.id, c.title, c.description, c.icon, c.sort_order, c.max_score
       ORDER BY c.sort_order ASC`
    );

    const questionsRows = await query(
      `SELECT id, criterion_id as "criterionId", text, description, points, requires_evidence as "requiresEvidence", options,
              code, guide_image as "guideImage", help_guidance as "helpGuidance"
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
