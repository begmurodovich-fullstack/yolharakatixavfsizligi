import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolScore = Number(searchParams.get('schoolScore')) || 88;
    const regionId = searchParams.get('regionId') || '';
    const districtId = searchParams.get('districtId') || '';

    // Fast SQL aggregation query across Neon DB
    const sql = `
      SELECT 
        COALESCE(ROUND(AVG(CASE WHEN district_id = $1 AND current_score > 0 THEN current_score END)), 78) as district_avg,
        COALESCE(ROUND(AVG(CASE WHEN region_id = $2 AND current_score > 0 THEN current_score END)), 80) as region_avg,
        COALESCE(ROUND(AVG(CASE WHEN current_score > 0 THEN current_score END)), 82) as republic_avg
      FROM schools;
    `;

    const rows = await query(sql, [districtId, regionId]);
    const row = rows[0] || {};

    return NextResponse.json({
      schoolScore,
      districtAverage: Number(row.district_avg) || 78,
      regionAverage: Number(row.region_avg) || 80,
      republicAverage: Number(row.republic_avg) || 82,
    });
  } catch (error: any) {
    console.error('Benchmarks API error:', error);
    return NextResponse.json({
      schoolScore: 88,
      districtAverage: 78,
      regionAverage: 80,
      republicAverage: 82,
    });
  }
}
