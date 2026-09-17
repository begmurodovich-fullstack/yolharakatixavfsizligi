import { Criterion, Question } from '@/types';

/**
 * Official Uzbek "Nazorat ro'yxat parametrlari" matching the user's uploaded checklist.
 * Total Max Score = 100 Points across 7 Core Modules.
 */

export const MOCK_CRITERIA: Criterion[] = [
  {
    id: 'crit-road-env',
    title: 'Yerda foydalanish va hudud parametrlari',
    description: 'Yerda foydalanish turi (chap/o‘ng), hudud turi, avtoturargoh va ko‘rinish masofasi',
    icon: 'Building2',
    questionCount: 4,
    maxScore: 15,
    order: 1,
  },
  {
    id: 'crit-road-type',
    title: 'Tasmalar, yo‘l holati va tutqich',
    description: 'Tasmalar soni, tasma kengligi, tebranish tasmachalari, yo‘l holati, tutqich va baho (nishablik)',
    icon: 'Gauge',
    questionCount: 4,
    maxScore: 15,
    order: 2,
  },
  {
    id: 'crit-median-features',
    title: 'Qatnov qismi va yo‘lning o‘rtasi',
    description: 'Qatnov qismi turi, yo‘lning o‘rtasi (metall/beton to‘siq), chiziqlar, belgilar va ko‘cha yoritgichi',
    icon: 'Split',
    questionCount: 3,
    maxScore: 15,
    order: 3,
  },
  {
    id: 'crit-school-zone',
    title: 'Maktab ogohlantirish belgisi va trotuarlar',
    description: 'Maktab haqida ogohlantirish belgisi, piyodalar yo‘lagi (chap/o‘ng), chetki tasma kengligi va panjaralar',
    icon: 'ShieldAlert',
    questionCount: 3,
    maxScore: 15,
    order: 4,
  },
  {
    id: 'crit-pedestrian-crossing',
    title: 'Piyodalar o‘tish joyi va oqimlar',
    description: 'Asosiy va tutashma yo‘lni kesib o‘tish, o‘tish sifati, kunlik avtomobillar hamda o‘tish oqimi',
    icon: 'Route',
    questionCount: 3,
    maxScore: 15,
    order: 5,
  },
  {
    id: 'crit-intersections-curves',
    title: 'Kesishuv (Chorraha) va egri chiziqlar',
    description: 'Kesishuv turi, chorraha sifati, egri chiziq turi va egri chiziq sifati',
    icon: 'GitFork',
    questionCount: 2,
    maxScore: 10,
    order: 6,
  },
  {
    id: 'crit-speed-management',
    title: 'Tezlik cheklovi va tezlikni boshqarish',
    description: 'Tezlik cheklovi, ishchi tezlik va tezlikni boshqarish (sun’iy notekisliklar)',
    icon: 'Zap',
    questionCount: 2,
    maxScore: 15,
    order: 7,
  },
];

export const MOCK_QUESTIONS: Question[] = [
  // 1. Yerda foydalanish va hudud parametrlari
  {
    id: 'q-land-use-left-right',
    criterionId: 'crit-road-env',
    text: 'Yerda foydalanish turi (chap va o‘ng tomonda):',
    description: 'Yo‘l atroflarida joylashgan inshootlar va ob’ektlar turi.',
    points: 4,
    requiresEvidence: true,
    options: [
      { id: 'opt-land-school', label: 'Aholi punkti va maktab hududi', points: 4 },
      { id: 'opt-land-shops', label: 'Do‘konlar va tijorat ob’ektlari', points: 3 },
      { id: 'opt-land-open', label: 'Ochiq va rivojlanmagan hudud', points: 1 },
    ],
  },
  {
    id: 'q-area-type',
    criterionId: 'crit-road-env',
    text: 'Hudud turi:',
    description: 'Yo‘l o‘tadigan hududning umumiy joylashuv turi.',
    points: 3,
    requiresEvidence: false,
    options: [
      { id: 'opt-area-urban', label: 'Shahar markazi / Shahar hududi', points: 3 },
      { id: 'opt-area-suburban', label: 'Shahar cheti / Qishloq hududi', points: 2 },
    ],
  },
  {
    id: 'q-parking',
    criterionId: 'crit-road-env',
    text: 'Avtoturargoh (Yo‘l cheti to‘xtash joyi):',
    description: 'Yo‘l chetidagi avtoturargohlar mavjudligi.',
    points: 4,
    requiresEvidence: true,
    options: [
      { id: 'opt-park-none', label: 'Yo‘q (Parking yo‘q)', points: 4 },
      { id: 'opt-park-oneside', label: 'Bir tomonda bor', points: 2 },
      { id: 'opt-park-twosides', label: 'Ikki tomonda bor', points: 1 },
    ],
  },
  {
    id: 'q-sight-distance',
    criterionId: 'crit-road-env',
    text: 'Ko‘rinish masofasi:',
    description: 'Haydovchilar uchun piyodalarni ko‘rish masofasining yetarliligi.',
    points: 4,
    requiresEvidence: true,
    options: [
      { id: 'opt-sight-good', label: 'Yaxshi (Yetarli va ochiq ko‘rinish)', points: 4 },
      { id: 'opt-sight-bad', label: 'Yomon (Cheklangan yoki to‘silgan ko‘rinish)', points: 0 },
    ],
  },

  // 2. Tasmalar, yo‘l holati va tutqich
  {
    id: 'q-lanes-count-width',
    criterionId: 'crit-road-type',
    text: 'Tasmalar (Harakat bo‘laklari) soni va kengligi:',
    description: 'Yo‘lning harakatlanish bo‘laklari o‘lchami va soni.',
    points: 4,
    requiresEvidence: true,
    options: [
      { id: 'opt-lanes-2to4', label: '2-4 ta tasma (Kengligi 3.25m - 3.75m)', points: 4 },
      { id: 'opt-lanes-5plus', label: '5 ta va undan ko‘p tasmalar', points: 2 },
    ],
  },
  {
    id: 'q-rumble-stripes',
    criterionId: 'crit-road-type',
    text: 'Tebranish tasmachalari (Shovqinli chiziqlar):',
    description: 'Yo‘l chetidagi tebranish hosil qiluvchi tasmlar.',
    points: 3,
    requiresEvidence: true,
    options: [
      { id: 'opt-rumble-yes', label: 'Bor (Shovqinli tasmalar mavjud)', points: 3 },
      { id: 'opt-rumble-no', label: 'Yo‘q', points: 0 },
    ],
  },
  {
    id: 'q-road-condition-grip',
    criterionId: 'crit-road-type',
    text: 'Yo‘l holati va Tutqich (Ilashuv darajasi):',
    description: 'Asfalt holati va tormozlanish ilashishi.',
    points: 4,
    requiresEvidence: true,
    options: [
      { id: 'opt-road-good', label: 'Yaxshi va yetarli ilashuvga ega', points: 4 },
      { id: 'opt-road-medium', label: 'O‘rtacha / Ta’mirtalab', points: 2 },
      { id: 'opt-road-bad', label: 'Yomon / Chuqurchalar bor', points: 0 },
    ],
  },
  {
    id: 'q-road-grade',
    criterionId: 'crit-road-type',
    text: 'Baho (Yo‘l nishabligi):',
    description: 'Yo‘lning baland-pastligi va nishablik darajasi.',
    points: 4,
    requiresEvidence: false,
    options: [
      { id: 'opt-grade-flat', label: 'Tekis yo‘l', points: 4 },
      { id: 'opt-grade-slope', label: 'Nishablik / Tik yo‘l', points: 1 },
    ],
  },

  // 3. Qatnov qismi va yo‘lning o‘rtasi
  {
    id: 'q-carriageway-type',
    criterionId: 'crit-median-features',
    text: 'Qatnov qismi turi:',
    description: 'Yo‘lning ajratilgan yoki ajratilmaganligi.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-cway-divided', label: 'Ajratilgan qatnov qismi', points: 5 },
      { id: 'opt-cway-undivided', label: 'Ajratilmagan qatnov qismi', points: 2 },
    ],
  },
  {
    id: 'q-median-divider',
    criterionId: 'crit-median-features',
    text: 'Yo‘lning o‘rtasi (Ajratgich to‘siqlar):',
    description: 'Qarama-qarshi oqimlarni ajratuvchi metall/beton to‘siqlar.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-med-metal', label: 'Metall to‘siq', points: 5 },
      { id: 'opt-med-concrete', label: 'Beton to‘siq', points: 5 },
      { id: 'opt-med-lines', label: 'Qo‘sh chiziq', points: 3 },
      { id: 'opt-med-none', label: 'Yo‘q', points: 0 },
    ],
  },
  {
    id: 'q-lines-signs-lighting',
    criterionId: 'crit-median-features',
    text: 'Chiziqlar, belgilar va ko‘cha yoritgichi:',
    description: 'Yo‘l chiziqlari, belgilari va ko‘cha chiroqlari.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-lines-good', label: 'Qoniqarli bor va ko‘cha yoritgichlari ishlaydi', points: 5 },
      { id: 'opt-lines-bad', label: 'Qoniqarsiz bor yoki yoritgichlar yo‘q', points: 1 },
    ],
  },

  // 4. Maktab ogohlantirish belgisi va trotuarlar
  {
    id: 'q-school-sign-presence',
    criterionId: 'crit-school-zone',
    text: 'Maktab haqida ogohlantirish belgisi:',
    description: 'Maktab zonasi belgilari va chiziqlarining borligi.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-schsign-yes', label: 'Bor (1.21 "Bolalar" va tezlik belgilari o‘rnatilgan)', points: 5 },
      { id: 'opt-schsign-no', label: 'Yo‘q', points: 0 },
    ],
  },
  {
    id: 'q-sidewalk-both-sides',
    criterionId: 'crit-school-zone',
    text: 'Piyodalar yo‘lagi (chap va o‘ng tomonda):',
    description: 'Ikki tomonda trotuarning mavjudligi.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-walk-both', label: 'Tratuar bor (Ikki tomonda ham sifatli)', points: 5 },
      { id: 'opt-walk-one', label: 'Faqat bir tomonda tratuar bor', points: 3 },
      { id: 'opt-walk-none', label: 'Yo‘q', points: 0 },
    ],
  },
  {
    id: 'q-road-edge-channelization',
    criterionId: 'crit-school-zone',
    text: 'Chetki tasma kengligi va Piyodalar uchun panjaralar:',
    description: 'Yo‘l yoqasidagi chetki tasma o‘lchami (0.75m) va yo‘naltiruvchi panjaralar.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-edge-good', label: 'Chetki tasma kengligi yetarli va panjaralar o‘rnatilgan', points: 5 },
      { id: 'opt-edge-part', label: 'Chetki tasma bor (0.75m), lekin panjara yo‘q', points: 3 },
      { id: 'opt-edge-none', label: 'Chetki tasma va panjara yo‘q', points: 0 },
    ],
  },

  // 5. Piyodalar o‘tish joyi va oqimlar
  {
    id: 'q-crossing-main-side',
    criterionId: 'crit-pedestrian-crossing',
    text: 'Asosiy va tutashma yo‘lni kesib o‘tish joyi:',
    description: 'Piyodalar o‘tish joyining borligi.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-cross-both', label: 'Asosiy yo‘lda ham, tutashma yo‘lda ham bor', points: 5 },
      { id: 'opt-cross-mainonly', label: 'Faqat asosiy yo‘lni kesib o‘tish bor', points: 4 },
      { id: 'opt-cross-none', label: 'Yo‘q', points: 0 },
    ],
  },
  {
    id: 'q-crossing-quality-flow',
    criterionId: 'crit-pedestrian-crossing',
    text: 'O‘tish sifati va o‘tish oqimi:',
    description: 'Piyodalar o‘tish joyining sifati (Qoniqarli/Yomon) va oqim darajasi.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-cqual-good', label: 'Qoniqarli (Yuqori oqimda xavfsiz va aniq belgilangan)', points: 5 },
      { id: 'opt-cqual-bad', label: 'Yomon (Tushnarsiz yoki ta’mirtalab)', points: 1 },
    ],
  },
  {
    id: 'q-traffic-flow-daily',
    criterionId: 'crit-pedestrian-crossing',
    text: 'Avtomobillar / kunlik intensivlik:',
    description: 'Kun davomida yo‘ldan o‘tuvchi avtomobillar soni.',
    points: 5,
    requiresEvidence: false,
    options: [
      { id: 'opt-flow-high', label: '10 000 dan ko‘p (Yuqori oqim)', points: 5 },
      { id: 'opt-flow-med', label: '5 000 - 10 000 (O‘rtacha oqim)', points: 3 },
      { id: 'opt-flow-low', label: '5 000 dan kam (Past oqim)', points: 2 },
    ],
  },

  // 6. Kesishuv (Chorraha) va egri chiziqlar
  {
    id: 'q-intersection-type-quality',
    criterionId: 'crit-intersections-curves',
    text: 'Kesishuv (Chorraha) turi va sifati:',
    description: 'T-simon tutashma, 4 tomonlama chorraha va chorraha sifati.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-int-good', label: '4 tomonlama / T-simon chorraha (Qoniqarli holatda)', points: 5 },
      { id: 'opt-int-noint', label: 'Chorraha emas (To‘g‘ri yo‘l)', points: 4 },
      { id: 'opt-int-bad', label: 'Chorraha sifati qoniqarsiz', points: 1 },
    ],
  },
  {
    id: 'q-curve-type-quality',
    criterionId: 'crit-intersections-curves',
    text: 'Egri chiziq (Burilish) turi va sifati:',
    description: 'Yo‘lning to‘g‘ri yoki burilishliligi hamda sifat ko‘rsatkichi.',
    points: 5,
    requiresEvidence: false,
    options: [
      { id: 'opt-curve-straight', label: 'To‘g‘ri yo‘l (Burilishlarsiz)', points: 5 },
      { id: 'opt-curve-good', label: 'Burilish bor (Qoniqarli sifatda)', points: 3 },
      { id: 'opt-curve-bad', label: 'Xavfli burilish (Yomon va belgisiz)', points: 0 },
    ],
  },

  // 7. Tezlik cheklovi va tezlikni boshqarish
  {
    id: 'q-speed-limit-operating',
    criterionId: 'crit-speed-management',
    text: 'Tezlik cheklovi va Ishchi tezlik:',
    description: 'Yo‘l belgisidagi cheklov (30 km/s) va amaldagi harakat tezligi.',
    points: 8,
    requiresEvidence: true,
    options: [
      { id: 'opt-speed-30safe', label: 'Tezlik cheklovi 30 km/s (Ishchi tezlik mos keladi)', points: 8 },
      { id: 'opt-speed-50med', label: 'Tezlik cheklovi 50 km/s', points: 4 },
      { id: 'opt-speed-60high', label: 'Tezlik cheklovi 60+ km/s (Yuqori tezlik)', points: 0 },
    ],
  },
  {
    id: 'q-speed-management-calming',
    criterionId: 'crit-speed-management',
    text: 'Tezlikni boshqarish (Sun’iy notekisliklar):',
    description: 'Sun’iy notekisliklar (lejaщiy politseyskiy) va shovqinli chiziqlar.',
    points: 7,
    requiresEvidence: true,
    options: [
      { id: 'opt-calm-yes', label: 'Bor (Sun’iy notekislik o‘rnatilgan)', points: 7 },
      { id: 'opt-calm-no', label: 'Yo‘q', points: 0 },
    ],
  },
];
