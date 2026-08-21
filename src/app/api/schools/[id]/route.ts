import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const rows = await query(
      `SELECT s.*, r.name as region_name, d.name as district_name 
       FROM schools s
       LEFT JOIN regions r ON s.region_id = r.id
       LEFT JOIN districts d ON s.district_id = d.id
       WHERE s.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'Maktab topilmadi' },
        { status: 404 }
      );
    }

    const s = rows[0];
    const formattedSchool = {
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
    };

    return NextResponse.json(formattedSchool);
  } catch (error: any) {
    console.error('School by ID API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Maktabni olishda xatolik' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { directorName, studentCount, latitude, longitude, addressNotes, coordinateStatus } = body;

    const updated = await query(
      `UPDATE schools
       SET director_name = COALESCE($1, director_name),
           student_count = COALESCE($2, student_count),
           latitude = COALESCE($3, latitude),
           longitude = COALESCE($4, longitude),
           address_notes = COALESCE($5, address_notes),
           coordinate_status = COALESCE($6, coordinate_status),
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [
        directorName !== undefined ? directorName : null,
        studentCount !== undefined ? Number(studentCount) : null,
        latitude !== undefined ? parseFloat(latitude) : null,
        longitude !== undefined ? parseFloat(longitude) : null,
        addressNotes !== undefined ? addressNotes : null,
        coordinateStatus !== undefined ? coordinateStatus : null,
        id,
      ]
    );

    if (updated.length === 0) {
      return NextResponse.json({ message: 'Maktab topilmadi' }, { status: 404 });
    }

    const s = updated[0];
    return NextResponse.json({
      id: s.id,
      schoolNumber: s.school_number,
      name: s.name,
      regionId: s.region_id,
      districtId: s.district_id,
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
    });
  } catch (error: any) {
    console.error('Update school API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Maktabni yangilashda xatolik' },
      { status: 500 }
    );
  }
}
