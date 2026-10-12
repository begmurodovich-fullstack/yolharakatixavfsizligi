import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Xavfsizlik maqsadida ushbu ommaviy xavfli GET endpoint o'chirilgan (T03 talabi).
// Baza tozalash ishlari faqat nazoratli server skriptlari orqali amalga oshirilishi lozim.
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      error: 'Ushbu endpoint xavfsizlik maqsadida bekor qilingan. Baza boshqaruvi uchun xizmat skriptlaridan foydalaning.',
    },
    { status: 403 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      error: 'Ushbu amal taqiqlangan.',
    },
    { status: 403 }
  );
}
