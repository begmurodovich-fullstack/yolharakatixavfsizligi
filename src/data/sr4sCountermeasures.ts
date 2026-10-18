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
  tierKey: '1-star' | '2-star' | '3-star' | '4-star' | '5-star' | '4-5-star';
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
    title: '1 Yulduz (Qora)',
    riskLevel: 'Oʻta xavfli / Shoshilinch chora zarur',
    starIcon: '⭐️',
    badgeLabel: '1 Yulduz (Qora) — Oʻta xavfli',
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
    badgeClass: 'bg-slate-950 text-white border-black',
    borderClass: 'border-slate-800',
    bgClass: 'bg-slate-900/10',
    accentColor: '#0f172a',
  },
  {
    stars: 2,
    tierKey: '2-star',
    title: '2 Yulduz (Qizil)',
    riskLevel: 'Xavfli / Tezkor aralashuv',
    starIcon: '⭐️⭐️',
    badgeLabel: '2 Yulduz (Qizil) — Xavfli daraja',
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
    title: '3 Yulduz (Sariq)',
    riskLevel: 'Oʻrtacha / BMT standarti',
    starIcon: '⭐️⭐️⭐️',
    badgeLabel: '3 Yulduz (Sariq) — Oʻrtacha daraja',
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
    badgeClass: 'bg-yellow-50 text-yellow-900 border-yellow-300',
    borderClass: 'border-yellow-400',
    bgClass: 'bg-yellow-50/40',
    accentColor: '#eab308',
  },
  {
    stars: 4,
    tierKey: '4-star',
    title: '4 Yulduz (Sabzi rang)',
    riskLevel: 'Yaxshi xavfsizlik darajasi',
    starIcon: '⭐️⭐️⭐️⭐️',
    badgeLabel: '4 Yulduz (Sabzi rang) — Yaxshi zona',
    riskFactors: [
      'Tezlik cheklovi (30 km/h) ta\'minlangan.',
      'Piyodalar oʻtish joylari va toʻsiqlar mavjud.',
      'Koʻrinuvchanlik yetarli.',
    ],
    planText:
      'SR4S boʻyicha 4 yulduzli uchastkalar yaxshi va xavfsiz hisoblanadi. Tavsiya etiladigan choralar:',
    actionItems: [
      'Mavjud yoʻl harakatini tashkillashtirish texnik vositalarini (YHTTV) doimiy texnik nazoratda saqlash.',
      'Mavsumiy yoʻl chiziqlari va belgilarni yangilab turish.',
    ],
    proposalText:
      'SR4S boʻyicha 4 yulduzli uchastkalar yaxshi xavfsizlik darajasiga ega. Tavsiya etiladigan choralar: 1. Mavjud yoʻl harakatini tashkillashtirish texnik vositalarini (YHTTV) doimiy nazoratda saqlash. 2. Mavsumiy yoʻl chiziqlari va belgilarni muntazam profilaktika qilish.',
    urgency: 'MAINTENANCE',
    badgeClass: 'bg-orange-50 text-orange-900 border-orange-300',
    borderClass: 'border-orange-400',
    bgClass: 'bg-orange-50/40',
    accentColor: '#f97316',
  },
  {
    stars: 5,
    tierKey: '5-star',
    title: '5 Yulduz (Yashil)',
    riskLevel: 'Namunali xavfsiz hudud',
    starIcon: '⭐️⭐️⭐️⭐️⭐️',
    badgeLabel: '5 Yulduz (Yashil) — Namunali zona',
    riskFactors: [
      'Tezlik cheklovi (30 km/h) toʻliq ta\'minlangan.',
      'Piyodalar ajratilgan, koʻtarilgan oʻtish joylari va toʻsiqlar bor.',
      'Tungi yoritish va koʻrinuvchanlik a\'lo darajada.',
    ],
    planText:
      'SR4S boʻyicha 5 yulduzli uchastkalar namunali xavfsiz hisoblanadi. Qarshi chora-tadbirlar:',
    actionItems: [
      'Mavjud namunali infratuzilmani ishchi holatda saqlash va davriy audit oʻtkazish.',
      'Yoʻl chiziqlari va aqlli yoritish tizimini doimiy ekspluatatsiya qilish.',
    ],
    proposalText:
      'SR4S boʻyicha 5 yulduzli uchastkalar namunali xavfsiz hisoblanadi. Qarshi chora-tadbirlar: 1. Namunali infratuzilmani mukammal ishchi holatda saqlash va davriy audit oʻtkazish. 2. Innovatsion xavfsizlik texnologiyalarini qoʻllab-quvvatlash.',
    urgency: 'MAINTENANCE',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    borderClass: 'border-emerald-400',
    bgClass: 'bg-emerald-50/40',
    accentColor: '#22c55e',
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
  if (normalizedStars === 4) return SR4S_COUNTERMEASURES_MATRIX[3];
  return SR4S_COUNTERMEASURES_MATRIX[4]; // 5
}

/**
 * 0..100 yoki 1..5 shkala balli bo'yicha mos Qarshi Chora-Tadbir rejasini qaytaradi
 */
export function getCountermeasureByScore(score: number): Sr4sCountermeasureTier {
  if (score === undefined || score === null || score <= 0) {
    return SR4S_COUNTERMEASURES_MATRIX[0];
  }

  // 1.0 - 5.0 shkala bo'yicha
  const norm = score > 5.0 ? score / 20 : score;
  return getCountermeasureByStars(norm);
}
