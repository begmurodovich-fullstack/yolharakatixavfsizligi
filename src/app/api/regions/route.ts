import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await query('SELECT id, name FROM regions ORDER BY name ASC');
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Regions API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Hududlarni olishda xatolik' },
      { status: 500 }
    );
  }
}
