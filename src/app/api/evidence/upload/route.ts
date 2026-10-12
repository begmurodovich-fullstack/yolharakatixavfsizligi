import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { promises as fsPromises } from 'fs';
import path from 'path';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

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

    // presetUrl faqat data: bilan boshlanmasin
    if (presetUrl && presetUrl.startsWith('data:')) {
      return NextResponse.json(
        { message: "Noto'g'ri rasm manzili: base64 qabul qilinmaydi" },
        { status: 400 }
      );
    }

    let finalImageUrl = presetUrl || '';

    if (file && file.size > 0) {
      // Fayl turi tekshiruvi
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { message: 'Faqat JPG, PNG, WebP yoki GIF rasm fayllari qabul qilinadi' },
          { status: 400 }
        );
      }

      // Hajm tekshiruvi
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { message: `Rasm hajmi ${MAX_FILE_SIZE / 1024 / 1024} MB dan oshmasligi kerak` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = ALLOWED_EXTENSIONS[file.type] || 'jpg';

      // Xavfsiz noyob fayl nomi (crypto bilan)
      const uniqueId = crypto.randomBytes(16).toString('hex');
      const filename = `evi_${uniqueId}.${ext}`;

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'evidence');

      // Asinxron fayl yozish
      await fsPromises.mkdir(uploadDir, { recursive: true });
      await fsPromises.writeFile(path.join(uploadDir, filename), buffer);
      finalImageUrl = `/uploads/evidence/${filename}`;
    }

    if (!finalImageUrl) {
      return NextResponse.json(
        { message: 'Rasm fayli yuklanmadi' },
        { status: 400 }
      );
    }

    // Bazada saqlash: image_url data: bilan boshlanmasligi shart
    const evidenceId = `evi-${crypto.randomBytes(8).toString('hex')}`;

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
