import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const regionId = searchParams.get('regionId');

    let sql = 'SELECT id, region_id as "regionId", name FROM districts';
    const params: any[] = [];

    if (regionId && regionId !== 'ALL') {
      sql += ' WHERE region_id = $1';
      params.push(regionId);
    }

    sql += ' ORDER BY name ASC';

    const rows = await query(sql, params);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Districts API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Tumanlarni olishda xatolik' },
      { status: 500 }
    );
  }
}
