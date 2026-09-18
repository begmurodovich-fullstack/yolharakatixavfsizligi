import { NextRequest, NextResponse } from 'next/server';
import { APP_CONFIG } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = APP_CONFIG.telegramBotToken;
  const host = request.headers.get('host') || 'yolharakatixavfsizligi.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const webhookUrl = `${protocol}://${host}/api/telegram/webhook`;

  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'info';

  if (action === 'set') {
    const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
    const data = await res.json();
    return NextResponse.json({
      action: 'setWebhook',
      webhookUrl,
      result: data,
    });
  }

  if (action === 'delete') {
    const res = await fetch(`https://api.telegram.org/bot${token}/deleteWebhook`);
    const data = await res.json();
    return NextResponse.json({
      action: 'deleteWebhook',
      result: data,
    });
  }

  // Default: getWebhookInfo
  const res = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`);
  const data = await res.json();
  return NextResponse.json({
    currentWebhookInfo: data,
    targetWebhookUrl: webhookUrl,
    howToSet: `${protocol}://${host}/api/telegram/set-webhook?action=set`,
  });
}
