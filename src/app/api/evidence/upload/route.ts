import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get('file') as File | null;
    const schoolId = formData.get('schoolId') as string | null;
    const questionId = formData.get('questionId') as string | null;
    const caption = (formData.get('caption') as string) || '';
    const uploadedBy = (formData.get('uploadedBy') as string) || null;
    const presetUrl = formData.get('presetUrl') as string | null;

    if (!schoolId || !questionId) {
      return NextResponse.json(
        { message: 'Maktab ID va savol ID kiritilishi shart' },
        { status: 400 }
      );
    }

    let finalImageUrl = presetUrl || '';

    // If actual binary file was uploaded
    if (file && file.size > 0) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { message: 'Faqat JPG, PNG yoki WebP rasm fayllari qabul qilinadi' },
          { status: 400 }
        );
      }

      // Ensure directory exists in public/uploads/evidence
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'evidence');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
      const filename = `evi_${schoolId}_${questionId}_${Date.now()}.${ext}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);
      finalImageUrl = `/uploads/evidence/${filename}`;
    }

    if (!finalImageUrl) {
      return NextResponse.json(
        { message: 'Rasm fayli yuklanmadi' },
        { status: 400 }
      );
    }

    const evidenceId = `evi-${Date.now()}`;

    const rows = await query(
      `INSERT INTO evidence (id, school_id, question_id, image_url, caption, status, uploaded_by, uploaded_at)
       VALUES ($1, $2, $3, $4, $5, 'PENDING', $6, NOW())
       RETURNING *`,
      [evidenceId, schoolId, questionId, finalImageUrl, caption, uploadedBy]
    );

    const ev = rows[0];

    return NextResponse.json({
      success: true,
      evidence: {
        id: ev.id,
        schoolId: ev.school_id,
        questionId: ev.question_id,
        imageUrl: ev.image_url,
        caption: ev.caption,
        status: ev.status,
        uploadedBy: ev.uploaded_by,
        uploadedAt: ev.uploaded_at,
      },
    });
  } catch (error: any) {
    console.error('Evidence upload API error:', error);
    return NextResponse.json(
      { message: error?.message || 'Rasm yuklashda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
