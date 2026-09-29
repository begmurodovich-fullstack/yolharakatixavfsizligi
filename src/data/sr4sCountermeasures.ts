/**
 * ============================================================================
 * Star Rating for Schools (SR4S) Qarshi Chora-Tadbirlar Matritsasi
 * (Countermeasures Matrix for School Road Safety)
 * 
 * Dissertatsiyaning chora-tadbirlar matritsasi va amaliy tavsiyalar qismi asosida:
 * 1 Yulduz (Oʻta yuqori xavf / Kiritilishi shart)
 * 2 Yulduz (Yuqori xavf / Tezkor aralashuv)
 * 3 Yulduz (Oʻrta xavf / Standart daraja)
 * 4–5 Yulduz (Past xavf / Xavfsiz zona)
 * ============================================================================
 */

export interface Sr4sCountermeasureTier {
  stars: number;
  tierKey: '1-star' | '2-star' | '3-star' | '4-5-star';
  title: string;
  riskLevel: string;
  starIcon: string;
  badgeLabel: string;
  riskFactors: string[];
  planText: string;
  actionItems: string[];
  proposalText?: string;
  urgency: 'CRITICAL' | 'URGENT' | 'STANDARD' | 'MAINTENANCE';
  badgeClass: string;
  borderClass: string;
  bgClass: string;
  accentColor: string;
}

export const SR4S_COUNTERMEASURES_MATRIX: Sr4sCountermeasureTier[] = [
  {
    stars: 1,
    tierKey: '1-star',
    title: '1 Yulduz',
    riskLevel: 'Oʻta yuqori xavf / Kiritilishi shart',
    starIcon: '⭐️',
    badgeLabel: '1 Yulduz — Oʻta yuqori xavf (Kiritilishi shart)',
    riskFactors: [
      'Harakat tezligi 50 km/h va undan yuqori.',
      'Piyodalar oʻtish joyi, "Zebra" va belgilari mutlaqo yoʻq.',
      'Trotuar yoʻq, bolalar yoʻlning qatnov qismida yurishga majbur.',
      'Koʻrinuvchanlik toʻsintilar sababli oʻta yomon.',
    ],
    planText:
      'SR4S boʻyicha 1 yulduzli (oʻta yuqori xavf) uchastkalarda muhandislik aralashuvi majburiy hisoblanadi. Qarshi chora-tadbirlar:',
    actionItems: [
      'Oʻz DSt 3283 muvofiq 5.16.1/5.16.2 belgilari va 1.14.1 (\'Zebra\') chizigʻini tashkil etish.',
      'Harakat tezligini pasaytirish uchun koʻtarilgan piyodalar oʻtish joyini (raised crossing) yoki sun\'iy gʻov va 3.24 (30 km/h) belgisini oʻrnatish.',
      'Qatnov qismidan ajratilgan piyodalar trotuari barpo etish va saqlash toʻsiqlarini (fencing) oʻrnatish.',
    ],
    proposalText:
      'SR4S boʻyicha 1 yulduzli (oʻta yuqori xavf) uchastkalarda muhandislik aralashuvi majburiy hisoblanadi. Qarshi chora-tadbirlar: 1. Oʻz DSt 3283 muvofiq 5.16.1/5.16.2 belgilari va 1.14.1 (\'Zebra\') chizigʻini tashkil etish. 2. Harakat tezligini pasaytirish uchun koʻtarilgan piyodalar oʻtish joyini (raised crossing) yoki sun\'iy gʻov va 3.24 (30 km/h) belgisini oʻrnatish. 3. Qatnov qismidan ajratilgan piyodalar trotuari barpo etish va saqlash toʻsiqlarini (fencing) oʻrnatish.',
    urgency: 'CRITICAL',
    badgeClass: 'bg-black text-amber-300 border-zinc-800',
    borderClass: 'border-zinc-800',
    bgClass: 'bg-zinc-100/70',
    accentColor: '#000000',
  },
  {
    stars: 2,
    tierKey: '2-star',
    title: '2 Yulduz',
    riskLevel: 'Yuqori xavf / Tezkor aralashuv',
    starIcon: '⭐️⭐️',
    badgeLabel: '2 Yulduz — Yuqori xavf (Tezkor aralashuv)',
    riskFactors: [
      'Piyodalar oʻtish joyi bor, lekin tezlik yuqori (40-50 km/h).',
      'Yoʻl 2 va undan ortiq tasmali, xavfsizlik orolchasi yoʻq.',
      'Ogohlantiruvchi (1.21 "Bolalar") belgisi oʻrnatilmagan.',
      'Tungi yoritish yetarsiz.',
    ],
    planText:
      'SR4S boʻyicha 2 yulduzli uchastkalarda tezkor muhandislik-texnik choralar koʻriladi. Qarshi chora-tadbirlar:',
    actionItems: [
      'Maktabga yetmasdan 50–100 m masofada 1.21 (\'Bolalar\') belgisi va yoʻlda 1.23 dublyaj chizigʻini tushirish.',
      'Koʻp tasmali yoʻllarda piyodalarning bosqichli oʻtishi uchun xavfsizlik orolchasini (refuge island) barpo etish.',
      'Yoʻl qoplamasiga shovqin soluvchi tebranish tasmachalarini (rumble strips) yotqizish va LED yoritish ustunlarini oʻrnatish.',
    ],
    proposalText:
      'SR4S boʻyicha 2 yulduzli uchastkalarda tezkor muhandislik-texnik choralar koʻriladi. Qarshi chora-tadbirlar: 1. Maktabga yetmasdan 50–100 m masofada 1.21 (\'Bolalar\') belgisi va yoʻlda 1.23 dublyaj chizigʻini tushirish. 2. Koʻp tasmali yoʻllarda piyodalarning bosqichli oʻtishi uchun xavfsizlik orolchasini (refuge island) barpo etish. 3. Yoʻl qoplamasiga shovqin soluvchi tebranish tasmachalarini (rumble strips) yotqizish va LED yoritish ustunlarini oʻrnatish.',
    urgency: 'URGENT',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
    borderClass: 'border-rose-400',
    bgClass: 'bg-rose-50/50',
    accentColor: '#ef4444',
  },
  {
    stars: 3,
    tierKey: '3-star',
    title: '3 Yulduz',
    riskLevel: 'Oʻrta xavf / Standart daraja',
    starIcon: '⭐️⭐️⭐️',
    badgeLabel: '3 Yulduz — Oʻrta xavf (Standart daraja)',
    riskFactors: [
      'Yoʻl belgilari va "Zebra" mavjud, lekin chiziqlar oʻchgan.',
      'Tezlik 30-40 km/h atrofida.',
      'Piyodalar trotuari bor, lekin maktab darvozasi oldida saqlash toʻsigʻi yoʻq.',
    ],
    planText:
      'SR4S boʻyicha 3 yulduzli (minimal qabul qilinadigan) uchastkalarda mavjud infratuzilmani modernizatsiya qilish amalga oshiriladi. Qarshi chora-tadbirlar:',
    actionItems: [
      'Oʻchgan 1.14.1 (\'Zebra\') va chiziqlarni yuqori chidamlilikka ega termoplastik materiallar bilan yangilash.',
      'Maktab darvozasi qarshisida bolalarning yoʻlga toʻsatdan chiqib ketishining oldini oluvchi piyodalar saqlash toʻsigʻini oʻrnatish.',
      'Belgilarning nur qaytaruvchanligini (3M plyonkalar) tekshirish va yangilash.',
    ],
    proposalText:
      'SR4S boʻyicha 3 yulduzli (minimal qabul qilinadigan) uchastkalarda mavjud infratuzilmani modernizatsiya qilish amalga oshiriladi. Qarshi chora-tadbirlar: 1. Oʻchgan 1.14.1 (\'Zebra\') va chiziqlarni yuqori chidamlilikka ega termoplastik materiallar bilan yangilash. 2. Maktab darvozasi qarshisida bolalarning yoʻlga toʻsatdan chiqib ketishining oldini oluvchi piyodalar saqlash toʻsigʻini oʻrnatish. 3. Belgilarning nur qaytaruvchanligini (3M plyonkalar) tekshirish va yangilash.',
    urgency: 'STANDARD',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
    borderClass: 'border-amber-400',
    bgClass: 'bg-amber-50/40',
    accentColor: '#f59e0b',
  },
  {
    stars: 4,
    tierKey: '4-5-star',
    title: '4–5 Yulduz',
    riskLevel: 'Past xavf / Xavfsiz zona',
    starIcon: '⭐️⭐️⭐️⭐️ / ⭐️⭐️⭐️⭐️⭐️',
    badgeLabel: '4–5 Yulduz — Xavfsiz zona',
    riskFactors: [
      'Tezlik cheklovi (30 km/h) toʻliq ta\'minlangan.',
      'Piyodalar ajratilgan, koʻtarilgan oʻtish joylari va toʻsiqlar bor.',
      'Tungi yoritish va koʻrinuvchanlik a\'lo darajada.',
    ],
    planText:
      'SR4S boʻyicha 4–5 yulduzli uchastkalar xavfsiz hisoblanadi. Qarshi chora-tadbirlar:',
    actionItems: [
      'Mavjud yoʻl harakatini tashkillashtirish texnik vositalarini (YHTTV) ishchi holatda saqlash va davriy audit oʻtkazish.',
      'Yoʻl chiziqlari va yoritish tizimini doimiy ekspluatatsiya qilish va texnik xizmat koʻrsatish.',
    ],
    proposalText:
      'SR4S boʻyicha 4–5 yulduzli uchastkalar xavfsiz hisoblanadi. Qarshi chora-tadbirlar: 1. Mavjud yoʻl harakatini tashkillashtirish texnik vositalarini (YHTTV) ishchi holatda saqlash va davriy audit oʻtkazish. 2. Yoʻl chiziqlari va yoritish tizimini doimiy ekspluatatsiya qilish va texnik xizmat koʻrsatish.',
    urgency: 'MAINTENANCE',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    borderClass: 'border-emerald-400',
    bgClass: 'bg-emerald-50/40',
    accentColor: '#10b981',
  },
];

/**
 * Maktabning yulduz soni (1..5) bo'yicha mos Qarshi Chora-Tadbir rejasini qaytaradi
 */
export function getCountermeasureByStars(stars: number): Sr4sCountermeasureTier {
  const normalizedStars = Math.max(1, Math.min(5, Math.floor(stars || 1)));
  if (normalizedStars === 1) return SR4S_COUNTERMEASURES_MATRIX[0];
  if (normalizedStars === 2) return SR4S_COUNTERMEASURES_MATRIX[1];
  if (normalizedStars === 3) return SR4S_COUNTERMEASURES_MATRIX[2];
  return SR4S_COUNTERMEASURES_MATRIX[3]; // 4 or 5
}

/**
 * 0..100 yoki 1..5 shkala balli bo'yicha mos Qarshi Chora-Tadbir rejasini qaytaradi
 */
export function getCountermeasureByScore(score: number): Sr4sCountermeasureTier {
  if (score === undefined || score === null || score <= 0) {
    return SR4S_COUNTERMEASURES_MATRIX[0];
  }

  // Agar ball 1..5 oralig'idagi yulduz bo'lsa
  if (score <= 5.0) {
    return getCountermeasureByStars(score);
  }

  // 0..100 ball shkalasi
  if (score >= 75) {
    return SR4S_COUNTERMEASURES_MATRIX[3]; // 4-5 Yulduz (Namunali / Yaxshi)
  }
  if (score >= 60) {
    return SR4S_COUNTERMEASURES_MATRIX[2]; // 3 Yulduz (O'rtacha)
  }
  if (score >= 35) {
    return SR4S_COUNTERMEASURES_MATRIX[1]; // 2 Yulduz (Xavfli)
  }
  return SR4S_COUNTERMEASURES_MATRIX[0]; // 1 Yulduz (O'ta xavfli)
}
