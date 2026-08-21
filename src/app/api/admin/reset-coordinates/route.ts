import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// One-time cleanup endpoint — call once from browser then it's done
// GET /api/admin/reset-coordinates
export async function GET(request: NextRequest) {
  // Simple secret check so random visitors can't trigger it
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== 'yhxx-reset-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check current state
    const before = await query(`
      SELECT coordinate_status, COUNT(*) as count
      FROM schools
      GROUP BY coordinate_status
      ORDER BY count DESC;
    `);

    // Set ALL schools to NOT_SUBMITTED and null out any coordinates
    const updateResult = await query(`
      UPDATE schools
      SET coordinate_status = 'NOT_SUBMITTED',
          latitude = NULL,
          longitude = NULL,
          address_notes = NULL,
          current_score = 0,
          updated_at = NOW();
    `);

    // Clear all test data
    await query('DELETE FROM assessments;');
    await query('DELETE FROM evidence;');
    await query('DELETE FROM audit_logs;');
    await query('DELETE FROM notifications;');

    // Verify after
    const after = await query(`
      SELECT coordinate_status, COUNT(*) as count
      FROM schools
      GROUP BY coordinate_status
      ORDER BY count DESC;
    `);

    return NextResponse.json({
      success: true,
      message: 'Neon database 100% tozalandi',
      before: before,
      updated_rows: updateResult.length,
      after: after,
    });
  } catch (error: any) {
    console.error('Reset error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
