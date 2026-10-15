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

    // Flexible school/district email search
    const cleanSearchEmail = trimmedEmail
      .replace('@maktab.uz', '')
      .replace('@gijduvon.demo', '')
      .replace(/_tumani|_shahri|-tumani|-shahri/g, '');

    // Use parameterized queries to prevent SQL injection
    // LIKE query uses only safe alphanumeric characters
    const safeSearch = cleanSearchEmail.replace(/[^a-z0-9]/g, '');
    const likePattern = safeSearch ? `%${safeSearch}%` : '';

    const schoolIdSearch =
      trimmedEmail.startsWith('sch-') || trimmedEmail.startsWith('sch_')
        ? trimmedEmail.replace(/^sch_/, 'sch-').replace(/@maktab\.uz$/, '')
        : '';

    let targetSchoolId = '';
    if (
      trimmedEmail === 'qiziltepa24' ||
      trimmedEmail === 'qiziltepa24@maktab.uz' ||
      trimmedEmail === 'qiziltepa_24' ||
      trimmedEmail === 'maktab24' ||
      trimmedEmail === '24-maktab' ||
      trimmedEmail === '24' ||
      trimmedEmail === 'sch-3837' ||
      (trimmedEmail.includes('24') && (trimmedEmail.includes('qizil') || trimmedEmail.includes('navoiy')))
    ) {
      targetSchoolId = 'sch-3837';
    }

    let directAdminEmail = '';
    if (trimmedEmail === 'admin' || trimmedEmail === 'yhxx') directAdminEmail = 'admin@yhxx.uz';
    if (trimmedEmail === 'superadmin' || trimmedEmail === 'super') directAdminEmail = 'superadmin@monitoring.uz';

    const users = await query(
      `SELECT id, email, password_hash, name, role, school_id, region_id, district_id,
              is_first_login, is_active, created_at, updated_at
       FROM users
       WHERE (
         LOWER(email) = $1
         OR LOWER(email) = $2
         OR ($3 <> '' AND LOWER(email) = $3)
         OR ($4 <> '' AND school_id = $4)
         OR ($5 <> '' AND LOWER(email) LIKE $5)
         OR ($6 <> '' AND school_id = $6)
       ) AND is_active = true
       LIMIT 1`,
      [
        trimmedEmail,
        `${cleanSearchEmail}@maktab.uz`,
        directAdminEmail,
        targetSchoolId,
        likePattern,
        schoolIdSearch,
      ]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Login yoki parol noto'g'ri" },
        { status: 401 }
      );
    }

    const dbUser = users[0];

    // Parol tekshiruvi: faqat bazadagi password_hash bilan solishtirish.
    // Production muhitida bcrypt.compare() ishlatish tavsiya etiladi.
    const isPasswordMatch = dbUser.password_hash === trimmedPassword;

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Login yoki parol noto'g'ri" },
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
          studentCount: s.student_count != null ? Number(s.student_count) : 0,
          currentScore: Number(s.current_score) || 0,
          coordinateStatus: s.coordinate_status,
          status: s.status,
          coordinates: {
            latitude: s.latitude != null ? Number(s.latitude) : null,
            longitude: s.longitude != null ? Number(s.longitude) : null,
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
