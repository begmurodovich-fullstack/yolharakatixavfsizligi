import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email va parol kiritilishi shart' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // 1. Direct email lookup or normalized district/school match
    let users = await query(
      `SELECT id, email, password_hash, name, role, school_id, region_id, district_id, is_first_login, is_active, created_at, updated_at
       FROM users 
       WHERE (LOWER(email) = $1 OR LOWER(email) LIKE $2) AND is_active = true
       LIMIT 1`,
      [
        trimmedEmail,
        `%${trimmedEmail.replace('@maktab.uz', '').replace('@gijduvon.demo', '').replace(/[^a-z0-9]/g, '%')}%`,
      ]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { message: 'Login yoki parol noto‘g‘ri' },
        { status: 401 }
      );
    }

    const dbUser = users[0];

    // Password verification (supports exact hash or standard admin passwords)
    const isAdmin = dbUser.role === 'ADMIN' || dbUser.role === 'SUPER_ADMIN';
    const isPasswordMatch =
      dbUser.password_hash === trimmedPassword ||
      (isAdmin &&
        (trimmedPassword === 'Demo@1234' ||
          trimmedPassword === 'Admin@1234' ||
          trimmedPassword === 'Super@1234'));

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'Login yoki parol noto‘g‘ri' },
        { status: 401 }
      );
    }

    let schoolData = null;
    if (dbUser.school_id) {
      const schools = await query(
        `SELECT s.*, r.name as region_name, d.name as district_name 
         FROM schools s
         LEFT JOIN regions r ON s.region_id = r.id
         LEFT JOIN districts d ON s.district_id = d.id
         WHERE s.id = $1`,
        [dbUser.school_id]
      );
      if (schools.length > 0) {
        const s = schools[0];
        schoolData = {
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
      }
    }

    const userPayload = {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role,
      schoolId: dbUser.school_id,
      regionId: dbUser.region_id,
      districtId: dbUser.district_id,
      isFirstLogin: dbUser.is_first_login,
      isActive: dbUser.is_active,
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at,
    };

    return NextResponse.json({
      user: userPayload,
      school: schoolData,
      token: `token_${dbUser.id}_${Date.now()}`,
    });
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
