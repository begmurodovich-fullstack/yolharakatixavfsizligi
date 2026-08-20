import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get('limit')) || 50, 200);

    const rows = await query(
      `SELECT id, actor_id as "actorId", actor_name as "actorName", actor_role as "actorRole", 
              action, target, target_id as "targetId", old_value as "oldValue", new_value as "newValue", timestamp
       FROM audit_logs 
       ORDER BY timestamp DESC 
       LIMIT $1`,
      [limit]
    );

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Audit logs API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Audit jurnalini olishda xatolik' },
      { status: 500 }
    );
  }
}
