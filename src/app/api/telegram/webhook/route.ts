import { NextRequest, NextResponse } from 'next/server';
import { APP_CONFIG } from '@/lib/constants';

export const dynamic = 'force-dynamic';

function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Maktabga Xavfsiz Qadam Telegram Webhook',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const token = APP_CONFIG.telegramBotToken;
    const adminChatId = APP_CONFIG.telegramAdminChatId;

    if (!token) {
      return NextResponse.json({ error: 'Telegram bot token is not configured' }, { status: 500 });
    }

    const update = await request.json();
    console.log('[Telegram Webhook Update]:', JSON.stringify(update));

    const message = update?.message;
    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const fromChatId = message.chat?.id;
    const isPrivateChat = message.chat?.type === 'private';
    const text = message.text || '';
    const fromUser = message.from;
    const senderName = [fromUser?.first_name, fromUser?.last_name].filter(Boolean).join(' ') || 'Foydalanuvchi';
    const senderUsername = fromUser?.username ? `@${fromUser.username}` : 'Mavjud emas';

    // ----------------------------------------------------
    // CASE 1: Incoming message from a Citizen / Private User
    // ----------------------------------------------------
    if (isPrivateChat) {
      // 1.1 /start or /help command
      if (text.startsWith('/start') || text.startsWith('/help')) {
        const welcomeText =
          `Assalomu alaykum, <b>${escapeHtml(senderName)}</b>!\n\n` +
          `🏫 <b>«Maktabga Xavfsiz Qadam»</b> rasmiy qo‘llab-quvvatlash xizmatiga xush kelibsiz.\n\n` +
          `Siz bu yerda:\n` +
          `• Maktab yo‘llaridagi xavfli holatlar va kamchiliklar;\n` +
          `• Svetofor, zebra, tezlik cheklovi yoki to‘siqlar o‘rnatish takliflari;\n` +
          `• Platforma va baholash bo‘yicha savollaringizni yozib qoldirishingiz mumkin.\n\n` +
          `✍️ <i>Savol yoki murojaatingizni shu yerga yozib yuboring. Mutaxassislarimiz sizga tez orada javob yozishadi.</i>`;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: welcomeText,
            parse_mode: 'HTML',
          }),
        });

        return NextResponse.json({ ok: true });
      }

      // 1.2 User sends a message/question -> Forward to Admin Group / Chat
      if (adminChatId) {
        const forwardToAdminText =
          `📩 <b>YANGI TELEGRAM MUROJAATI</b>\n` +
          `━━━━━━━━━━━━━━━━━━━━\n` +
          `👤 <b>Kimdan:</b> ${escapeHtml(senderName)}\n` +
          `📱 <b>Username:</b> ${escapeHtml(senderUsername)}\n` +
          `🆔 <b>User ID:</b> <code>#user_${fromChatId}</code>\n\n` +
          `💬 <b>Murojaat matni:</b>\n${escapeHtml(text || '(Matn yo‘q / Fayl yuborildi)')}\n` +
          `━━━━━━━━━━━━━━━━━━━━\n` +
          `⏱ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}\n\n` +
          `📌 <i>Ushbu fuqaroga javob yozish uchun shu xabarga <b>Reply (Javob berish)</b> qilib yozing.</i>`;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: adminChatId,
            text: forwardToAdminText,
            parse_mode: 'HTML',
          }),
        });

        // Send acknowledgement to user
        const receiptText =
          `✅ <b>Murojaatingiz qabul qilindi!</b>\n\n` +
          `Mutaxassislarimiz tez orada xabaringizni o‘rganib chiqib, aynan shu bot orqali sizga javob yo‘llashadi.`;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: receiptText,
            parse_mode: 'HTML',
          }),
        });
      }

      return NextResponse.json({ ok: true });
    }

    // ----------------------------------------------------
    // CASE 2: Reply from Admin Group / Support Specialist
    // ----------------------------------------------------
    const replyToMessage = message.reply_to_message;
    if (replyToMessage && String(fromChatId) === String(adminChatId)) {
      const repliedText = replyToMessage.text || '';
      
      // Match `#user_12345678` in the replied message
      const userIdMatch = repliedText.match(/#user_(\d+)/);

      if (userIdMatch && userIdMatch[1]) {
        const targetUserChatId = userIdMatch[1];
        const adminReplyText =
          `👨‍💼 <b>«Maktabga Xavfsiz Qadam» Mas’ul Xodimi Javobi:</b>\n\n` +
          `${escapeHtml(text)}\n\n` +
          `<i>Agar qo‘shimcha savollaringiz bo‘lsa, yana yozishingiz mumkin.</i>`;

        const sendRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: targetUserChatId,
            text: adminReplyText,
            parse_mode: 'HTML',
          }),
        });

        const sendData = await sendRes.json();

        if (sendData.ok) {
          // Confirm delivery in admin group
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: adminChatId,
              reply_to_message_id: message.message_id,
              text: `✅ <b>Javob fuqaroga yetkazildi!</b> (User ID: <code>${targetUserChatId}</code>)`,
              parse_mode: 'HTML',
            }),
          });
        } else {
          // Delivery error notification
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: adminChatId,
              reply_to_message_id: message.message_id,
              text: `❌ <b>Xatolik:</b> Javobni yetkazib bo‘lmadi (${sendData.description || 'Foydalanuvchi botni bloklagan bo‘lishi mumkin'}).`,
              parse_mode: 'HTML',
            }),
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('[Telegram Webhook Error]:', error);
    return NextResponse.json({ ok: false, error: error?.message }, { status: 500 });
  }
}
