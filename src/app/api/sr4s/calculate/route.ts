import { NextRequest, NextResponse } from 'next/server';
import { buildOfficialSr4sPayload } from '@/lib/sr4sPayloadMapper';
import { calculateIrapSr4s } from '@/lib/sr4sCalculation';
import { AttributeDefinition, OFFICIAL_40_ATTRIBUTES_DATA } from '@/data/sr4sAttributesData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface OfficialSr4sResult {
  starRatingScore: string;
  banding: number[];
  starRating: number;
  decimalStarRating: string;
  along: string;
  crossingSide: string;
  crossingMain: string;
}

export async function POST(req: NextRequest) {
  let attributes: AttributeDefinition[] = [];
  let answers: Record<string, string> = {};

  try {
    const body = await req.json();
    if (body.attributes && Array.isArray(body.attributes)) {
      attributes = body.attributes;
    }
    if (body.answers && typeof body.answers === 'object') {
      answers = body.answers;
    }
  } catch {
    // Agar body bo'sh bo'lsa, default attributes ishlatiladi
  }

  if (attributes.length === 0 && Object.keys(answers).length === 0) {
    attributes = OFFICIAL_40_ATTRIBUTES_DATA;
  }

  // 1. Rasmiy SR4S parametrlarini shakllantirish
  const payloadParams = buildOfficialSr4sPayload(attributes.length > 0 ? attributes : answers);
  const payloadString = payloadParams.toString();

  // 2. Tashqi SR4S serverga so'rov: AbortController bilan 8s timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch('https://results.starratingforschools.org/model/V31a', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Origin: 'https://results.starratingforschools.org',
        Referer: 'https://results.starratingforschools.org/demonstrator',
      },
      body: payloadString,
      signal: controller.signal,
    });

    // Timeout'ni tozalash: response.text() dan oldin emas, keyin
    let rawText: string;
    try {
      rawText = await response.text();
    } finally {
      clearTimeout(timeoutId);
    }

    // Javobdan birinchi to'liq JSON blokini ajratib olish
    let jsonStr = rawText.trim();
    if (jsonStr.includes('}{')) {
      jsonStr = jsonStr.split('}{')[0] + '}';
    } else if (jsonStr.includes('}\n{')) {
      jsonStr = jsonStr.split('}\n{')[0] + '}';
    } else if (jsonStr.includes('}\r\n{')) {
      jsonStr = jsonStr.split('}\r\n{')[0] + '}';
    }

    const parsed: Partial<OfficialSr4sResult> = JSON.parse(jsonStr);

    if (
      parsed.decimalStarRating !== undefined &&
      parsed.starRatingScore !== undefined &&
      parsed.along !== undefined &&
      parsed.crossingMain !== undefined
    ) {
      return NextResponse.json({
        success: true,
        source: 'irap_official',
        data: {
          starRatingScore: String(parsed.starRatingScore),
          banding: parsed.banding || [200, 54, 24, 9, 3],
          starRating: Number(parsed.starRating),
          decimalStarRating: String(parsed.decimalStarRating),
          along: String(parsed.along),
          crossingSide: String(parsed.crossingSide),
          crossingMain: String(parsed.crossingMain),
        },
      });
    }

    throw new Error('Missing expected calculation fields in response');
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn('[SR4S API] External official engine call failed, using fallback engine:', err?.message || err);

    // 3. Fallback: ichki hisoblash dvigatelidan foydalanish
    // Fallback natijasi aniq "fallback" source bilan qaytariladi
    const localAttributes = attributes.length > 0 ? attributes : OFFICIAL_40_ATTRIBUTES_DATA;
    const fallbackRes = calculateIrapSr4s(localAttributes);

    return NextResponse.json({
      success: true,
      source: 'fallback',
      fallbackReason: err?.name === 'AbortError' ? 'timeout' : 'connection_error',
      data: {
        starRatingScore: String(fallbackRes.srsScore),
        banding: [200, 54, 24, 9, 3],
        starRating: fallbackRes.starCount,
        decimalStarRating: fallbackRes.decimalScore,
        along: String(fallbackRes.ctsAlong),
        crossingSide: String(fallbackRes.crossingSide),
        crossingMain: String(fallbackRes.crossingMain),
      },
    });
  }
}
