import { NextRequest, NextResponse } from 'next/server';
import { APP_CONFIG } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, category, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { message: 'Ism, telefon va xabar matni kiritilishi shart.' },
        { status: 400 }
      );
    }

    const categoryLabels: Record<string, string> = {
      platform: 'Platforma va Baholash',
      criteria: 'SR4S Mezonlari bo‘yicha savol',
      infrastructure: 'Maktab yo‘li infratuzilmasi muammosi',
      technical: 'Texnik nosozlik / Parolni tiklash',
      other: 'Boshqa masala',
    };

    const categoryText = categoryLabels[category] || category || 'Umumiy';
    const dateStr = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });

    const telegramMessage = `🔔 <b>YANGI MUROJAAT (Maktab Yo‘l Xavfsizligi)</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>F.I.SH:</b> ${escapeHtml(name)}\n` +
      `📞 <b>Telefon:</b> ${escapeHtml(phone)}\n` +
      `📧 <b>Email:</b> ${escapeHtml(email || 'Ko‘rsatilmadi')}\n` +
      `📂 <b>Yo‘nalish:</b> ${escapeHtml(categoryText)}\n\n` +
      `💬 <b>Xabar:</b>\n${escapeHtml(message)}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `⏱ <b>Sana:</b> ${dateStr}`;

    const token = APP_CONFIG.telegramBotToken || '8674118429:AAGnRU8AArMUsZYYQIOMx3eF8GUkxhSmpkk';
    const adminChatId = APP_CONFIG.telegramAdminChatId;

    let sentCount = 0;

    // Send only to the designated Admin Group / Chat
    if (adminChatId) {
      try {
        const sendRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: adminChatId,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        });
        const sendData = await sendRes.json();
        if (sendData.ok) sentCount = 1;
      } catch (sendErr) {
        console.error(`Failed to send to adminChatId ${adminChatId}:`, sendErr);
      }
    } else {
      console.warn('[Contact API] telegramAdminChatId is not set. Message saved locally.');
    }

    console.log(`[Contact API] Form submitted from ${name} (${phone}), sent to admin.`);

    return NextResponse.json({
      success: true,
      sentToTelegram: sentCount > 0,
      message: 'Murojaatingiz muvaffaqiyatli qabul qilindi!',
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { message: error?.message || 'Murojaatni yuborishda xatolik yuz berdi.' },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
