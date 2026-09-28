import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const rows = await query<{ id: string; name: string }>(
      'SELECT id, name FROM regions ORDER BY name ASC'
    );

    // Guaranteed deduplication by normalized name
    const seen = new Set<string>();
    const uniqueRows = rows.filter((r) => {
      const normalized = r.name.trim().toLowerCase().replace(/['`ʻ’‘]/g, "'");
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });

    return NextResponse.json(uniqueRows, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    console.error('Regions API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Hududlarni olishda xatolik' },
      { status: 500 }
    );
  }
}
