import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const regionId = searchParams.get('regionId');
    const districtId = searchParams.get('districtId');
    const scoreStatus = searchParams.get('scoreStatus');
    const coordStatus = searchParams.get('coordStatus');
    const search = searchParams.get('search');
    const limit = Math.min(Number(searchParams.get('limit')) || 100, 1000);
    const offset = Number(searchParams.get('offset')) || 0;

    let sql = `
      SELECT s.*, r.name as region_name, d.name as district_name 
      FROM schools s
      LEFT JOIN regions r ON s.region_id = r.id
      LEFT JOIN districts d ON s.district_id = d.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (regionId && regionId !== 'ALL') {
      sql += ` AND s.region_id = $${paramIndex++}`;
      params.push(regionId);
    }

    if (districtId && districtId !== 'ALL') {
      sql += ` AND s.district_id = $${paramIndex++}`;
      params.push(districtId);
    }

    if (coordStatus && coordStatus !== 'ALL') {
      sql += ` AND s.coordinate_status = $${paramIndex++}`;
      params.push(coordStatus);
      if (coordStatus === 'PENDING' || coordStatus === 'VERIFIED') {
        sql += ` AND s.latitude IS NOT NULL AND s.longitude IS NOT NULL`;
      }
    }

    if (scoreStatus && scoreStatus !== 'ALL') {
      if (scoreStatus === 'GREEN') {
        sql += ` AND s.current_score >= 80`;
      } else if (scoreStatus === 'YELLOW') {
        sql += ` AND s.current_score >= 50 AND s.current_score < 80`;
      } else if (scoreStatus === 'RED') {
        sql += ` AND s.current_score < 50`;
      }
    }

    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      sql += ` AND (LOWER(s.name) LIKE $${paramIndex} OR s.school_number LIKE $${paramIndex} OR LOWER(s.director_name) LIKE $${paramIndex})`;
      paramIndex++;
      params.push(q);
    }

    sql += ` ORDER BY s.current_score DESC, s.name ASC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);

    const rows = await query(sql, params);

    const formattedSchools = rows.map((s) => ({
      id: s.id,
      schoolNumber: s.school_number,
      name: s.name,
      regionId: s.region_id,
      regionName: s.region_name,
      districtId: s.district_id,
      districtName: s.district_name,
      directorName: s.director_name,
      studentCount: s.student_count,
      currentScore: s.current_score,
      coordinateStatus: s.coordinate_status,
      status: s.status,
      coordinates: {
        latitude: s.latitude,
        longitude: s.longitude,
        addressNotes: s.address_notes,
        status: s.coordinate_status,
      },
    }));

    return NextResponse.json(formattedSchools);
  } catch (error: any) {
    console.error('Schools API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Maktablarni olishda xatolik' },
      { status: 500 }
    );
  }
}
