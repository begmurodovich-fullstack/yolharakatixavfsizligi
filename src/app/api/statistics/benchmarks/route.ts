import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolScore = Number(searchParams.get('schoolScore')) || 0;
    const regionId = searchParams.get('regionId') || '';
    const districtId = searchParams.get('districtId') || '';

    // Hududiy va respublika o'rtacha ballini serverda hisoblash
    const sql = `
      SELECT
        ROUND(AVG(CASE WHEN district_id = $1 AND $1 <> '' AND current_score > 0
                       THEN current_score END)::numeric, 1) as district_avg,
        ROUND(AVG(CASE WHEN region_id = $2 AND $2 <> '' AND current_score > 0
                       THEN current_score END)::numeric, 1) as region_avg,
        ROUND(AVG(CASE WHEN current_score > 0 THEN current_score END)::numeric, 1) as republic_avg
      FROM schools;
    `;

    const rows = await query(sql, [districtId, regionId]);
    const row = rows[0] || {};

    return NextResponse.json({
      schoolScore,
      // null qaytarish — uydirma son emas, hech kim baholanmagan demak
      districtAverage: row.district_avg !== null ? Number(row.district_avg) : null,
      regionAverage: row.region_avg !== null ? Number(row.region_avg) : null,
      republicAverage: row.republic_avg !== null ? Number(row.republic_avg) : null,
    });
  } catch (error: any) {
    console.error('Benchmarks API error:', error);
    return NextResponse.json(
      { message: "Benchmark ma'lumotlarini olishda xatolik", error: true },
      { status: 500 }
    );
  }
}
