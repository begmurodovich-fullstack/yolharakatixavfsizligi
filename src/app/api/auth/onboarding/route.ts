import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      schoolId,
      newPassword,
      directorName,
      studentCount,
      latitude,
      longitude,
      addressNotes,
    } = body;

    if (!userId || !schoolId || !newPassword) {
      return NextResponse.json(
        { message: 'Foydalanuvchi ID, maktab ID va yangi parol kiritilishi shart' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'Yangi parol kamida 6 ta belgidan iborat bo‘lishi lozim' },
        { status: 400 }
      );
    }

    // 1. Update user password and set is_first_login = FALSE
    const updatedUsers = await query(
      `UPDATE users 
       SET password_hash = $1, is_first_login = FALSE, updated_at = NOW() 
       WHERE id = $2 
       RETURNING id, email, name, role, school_id, region_id, district_id, is_first_login, is_active, created_at, updated_at`,
      [newPassword.trim(), userId]
    );

    if (updatedUsers.length === 0) {
      return NextResponse.json(
        { message: 'Foydalanuvchi topilmadi' },
        { status: 404 }
      );
    }

    const dbUser = updatedUsers[0];

    // 2. Update school director, students, and coordinates in PostgreSQL
    const updatedSchools = await query(
      `UPDATE schools 
       SET director_name = COALESCE($1, director_name),
           student_count = COALESCE($2, student_count),
           latitude = COALESCE($3, latitude),
           longitude = COALESCE($4, longitude),
           address_notes = COALESCE($5, address_notes),
           coordinate_status = 'PENDING',
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        directorName ? directorName.trim() : null,
        studentCount ? Number(studentCount) : null,
        latitude ? parseFloat(latitude) : null,
        longitude ? parseFloat(longitude) : null,
        addressNotes ? addressNotes.trim() : null,
        schoolId,
      ]
    );

    const s = updatedSchools[0];
    const schoolData = s
      ? {
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
        }
      : null;

    // 3. Log to audit_logs
    await query(
      `INSERT INTO audit_logs (id, actor_id, actor_name, actor_role, action, target, target_id, new_value)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        `aud-${Date.now()}`,
        dbUser.id,
        dbUser.name,
        dbUser.role,
        'FIRST_LOGIN_ONBOARDING',
        `${schoolData?.name || 'Maktab'} paroli va geolokatsiyasi yangilandi`,
        schoolId,
        JSON.stringify({
          directorName,
          studentCount,
          coordinates: { latitude, longitude, addressNotes },
        }),
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Ma’lumotlar muvaffaqiyatli saqlandi va dastlabki sozlash yakunlandi',
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        schoolId: dbUser.school_id,
        regionId: dbUser.region_id,
        districtId: dbUser.district_id,
        isFirstLogin: false,
        isActive: dbUser.is_active,
        createdAt: dbUser.created_at,
        updatedAt: dbUser.updated_at,
      },
      school: schoolData,
    });
  } catch (error: any) {
    console.error('Onboarding API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Onboarding saqlashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
