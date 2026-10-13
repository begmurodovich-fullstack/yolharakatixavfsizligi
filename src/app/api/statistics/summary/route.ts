import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Bitta SQL so'rovi bilan barcha statistikani olish
    const sql = `
      SELECT
        COUNT(*) as total_schools,
        COUNT(CASE WHEN current_score > 0 THEN 1 END) as assessed_count,
        ROUND(AVG(CASE WHEN current_score > 0 THEN current_score ELSE NULL END)::numeric, 1) as average_score,
        COUNT(CASE WHEN current_score >= 4.0 THEN 1 END) as safe_count,
        COUNT(CASE WHEN current_score >= 3.0 AND current_score < 4.0 THEN 1 END) as moderate_count,
        COUNT(CASE WHEN current_score > 0 AND current_score < 3.0 THEN 1 END) as high_risk_count,
        COUNT(CASE WHEN coordinate_status = 'VERIFIED' THEN 1 END) as verified_coords,
        COUNT(CASE WHEN coordinate_status = 'PENDING' THEN 1 END) as pending_coords
      FROM schools;
    `;

    const rows = await query(sql);
    const row = rows[0] || {};

    const totalSchools = Number(row.total_schools) || 0;
    const assessedCount = Number(row.assessed_count) || 0;
    // averageScore: agar baholanmagan maktablar yo'q bo'lsa null qaytarish
    const averageScoreRaw = row.average_score !== null ? Number(row.average_score) : null;
    const safeCount = Number(row.safe_count) || 0;
    const moderateCount = Number(row.moderate_count) || 0;
    const highRiskCount = Number(row.high_risk_count) || 0;
    const verifiedCoords = Number(row.verified_coords) || 0;
    const pendingCoords = Number(row.pending_coords) || 0;

    const safePercentage =
      assessedCount > 0 ? Math.round((safeCount / assessedCount) * 100) : 0;
    const moderatePercentage =
      assessedCount > 0 ? Math.round((moderateCount / assessedCount) * 100) : 0;
    const highRiskPercentage =
      assessedCount > 0 ? Math.round((highRiskCount / assessedCount) * 100) : 0;

    return NextResponse.json({
      totalSchools,
      assessedCount,
      averageScore: averageScoreRaw,          // null = hech kim baholanmagan
      safeCount,
      moderateCount,
      highRiskCount,
      safePercentage,
      moderatePercentage,
      highRiskPercentage,
      verifiedCoordinatesCount: verifiedCoords,
      pendingCoordinatesCount: pendingCoords,
      periodName: "2025\u20132026 o\u2018quv yili (III chorak)",
    });
  } catch (error: any) {
    console.error('Statistics Summary API error:', error);
    // Xato bo'lsa, uydirma son emas, xato holatini aniq ko'rsatish
    return NextResponse.json(
      { message: 'Statistika ma\'lumotlarini olishda xatolik yuz berdi', error: true },
      { status: 500 }
    );
  }
}
