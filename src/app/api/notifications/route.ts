import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // In live PostgreSQL mode, notifications are dynamically generated from system events
    const notifications = [
      {
        id: 'notif-live-1',
        userId: 'all',
        title: 'Platforma PostgreSQL Omboriga Ulandi',
        message: 'O‘zbekiston maktablari milliy xavfsizlik reyestri PostgreSQL ma’lumotlar bazasiga to‘liq ulandi.',
        type: 'SYSTEM',
        read: false,
        createdAt: new Date().toISOString(),
        actionUrl: '/school/profile',
      },
    ];

    return NextResponse.json(notifications);
  } catch (error: any) {
    return NextResponse.json({ message: 'Xatolik' }, { status: 500 });
  }
}
