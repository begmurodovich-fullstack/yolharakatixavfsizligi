import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const totalSchoolsRes = await query(`
      SELECT 
        COUNT(*) as total_schools,
        COUNT(CASE WHEN coordinate_status = 'VERIFIED' THEN 1 END) as verified_coords,
        COUNT(CASE WHEN coordinate_status = 'PENDING' THEN 1 END) as pending_coords,
        AVG(current_score) as avg_score,
        COUNT(CASE WHEN current_score >= 80 THEN 1 END) as green_count,
        COUNT(CASE WHEN current_score >= 50 AND current_score < 80 THEN 1 END) as yellow_count,
        COUNT(CASE WHEN current_score < 50 THEN 1 END) as red_count
      FROM schools
    `);

    const stats = totalSchoolsRes[0];

    const evidencePendingRes = await query(`
      SELECT COUNT(*) as pending_evidence FROM evidence WHERE status = 'PENDING'
    `);
    const assessmentPendingRes = await query(`
      SELECT COUNT(*) as pending_assessments FROM assessments WHERE status = 'SUBMITTED'
    `);

    // Regional breakdown
    const regionalRows = await query(`
      SELECT 
        r.id as region_id,
        r.name as region_name,
        COUNT(s.id) as total_schools,
        COALESCE(AVG(s.current_score), 0) as average_score,
        COALESCE(
          (COUNT(CASE WHEN s.coordinate_status = 'VERIFIED' THEN 1 END)::float / NULLIF(COUNT(s.id), 0) * 100)::int, 
          0
        ) as verified_percent
      FROM regions r
      LEFT JOIN schools s ON r.id = s.region_id
      GROUP BY r.id, r.name
      ORDER BY r.name ASC
    `);

    const formattedRegional = regionalRows.map((row) => ({
      regionId: row.region_id,
      regionName: row.region_name,
      totalSchools: Number(row.total_schools) || 0,
      averageScore: Math.round(Number(row.average_score) || 0),
      verifiedPercent: Number(row.verified_percent) || 0,
    }));

    return NextResponse.json({
      totalSchools: Number(stats.total_schools) || 0,
      verifiedCoordinatesCount: Number(stats.verified_coords) || 0,
      pendingCoordinatesCount: Number(stats.pending_coords) || 0,
      pendingEvidenceCount: Number(evidencePendingRes[0]?.pending_evidence) || 0,
      pendingAssessmentsCount: Number(assessmentPendingRes[0]?.pending_assessments) || 0,
      republicAverageScore: Math.round(Number(stats.avg_score) || 0),
      greenCount: Number(stats.green_count) || 0,
      yellowCount: Number(stats.yellow_count) || 0,
      redCount: Number(stats.red_count) || 0,
      regionalBreakdown: formattedRegional,
    });
  } catch (error: any) {
    console.error('Admin Dashboard Summary API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Admin statistikasini olishda xatolik' },
      { status: 500 }
    );
  }
}
