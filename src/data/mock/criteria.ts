import { Criterion, Question } from '@/types';

export const MOCK_CRITERIA: Criterion[] = [
  {
    id: 'crit-signage',
    title: 'Yo‘l belgilari va yotiq chiziqlar',
    description: 'Maktab atrofida 1.21 "Bolalar", 3.24 "Tezlik cheklangan (30 km/soat)" va piyodalar o‘tish belgilarining mavjudligi va holati',
    icon: 'ShieldAlert',
    questionCount: 3,
    maxScore: 15,
    order: 1,
  },
  {
    id: 'crit-crossings',
    title: 'Piyodalar o‘tish joyi va svetoforlar',
    description: 'Yoritilgan "Zebra" o‘tish joylari, ogohlantiruvchi miltillovchi T.7 svetoforlari va ovozli signallar',
    icon: 'Footprints',
    questionCount: 3,
    maxScore: 20,
    order: 2,
  },
  {
    id: 'crit-speed-calming',
    title: 'Tezlikni pasaytirish vositalari',
    description: 'Standart talablariga mos sun‘iy notekisliklar (lejaщiy politseyskiy) va shovqinli chiziqlar',
    icon: 'Gauge',
    questionCount: 2,
    maxScore: 15,
    order: 3,
  },
  {
    id: 'crit-fencing',
    title: 'Hudud to‘siqlari va xavfsizlik panjaralari',
    description: 'Bolalarning to‘g‘ridan-to‘g‘ri qatnov qismiga yugurib chiqishini oldini oluvchi yo‘l cheti to‘siqlari',
    icon: 'Fence',
    questionCount: 2,
    maxScore: 10,
    order: 4,
  },
  {
    id: 'crit-sidewalks',
    title: 'Piyodalar yo‘lakchalari va xavfsiz yo‘l',
    description: 'Maktab darvozasigacha bo‘lgan uzluksiz, qulay va yorug‘ piyodalar yo‘laklarining mavjudligi',
    icon: 'Route',
    questionCount: 2,
    maxScore: 15,
    order: 5,
  },
  {
    id: 'crit-drop-off',
    title: 'O‘quvchilarni tushirish va to‘xtash joyi',
    description: 'Ota-onalar va jamoat transporti uchun ajratilgan xavfsiz "Kiss and Go" to‘xtash maydonchalari',
    icon: 'Car',
    questionCount: 2,
    maxScore: 10,
    order: 6,
  },
  {
    id: 'crit-patrol',
    title: 'Nazoratchilar va jamoatchilik patruli',
    description: 'Dars boshlanishi va tugashida maktab xodimlari yoki YHX xodimlari tomonidan navbatchilik tashkil etilishi',
    icon: 'Users',
    questionCount: 1,
    maxScore: 5,
    order: 7,
  },
  {
    id: 'crit-education',
    title: 'Yo‘l harakati qoidalari targ‘iboti va sinf xonasi',
    description: 'Maxsus jihozlangan "Yo‘l harakati xavfsizligi" o‘quv xonasi va bolalar uchun amaliy maydoncha',
    icon: 'GraduationCap',
    questionCount: 2,
    maxScore: 10,
    order: 8,
  },
];

export const MOCK_QUESTIONS: Question[] = [
  // 1. Signage
  {
    id: 'q-sign-1',
    criterionId: 'crit-signage',
    text: 'Maktabga kirish yo‘lining 100-150 metr masofasida 1.21 "Bolalar" ogohlantiruvchi yo‘l belgisi o‘rnatilganmi?',
    description: 'Belgi Davlat standarti talablariga mos kelishi va yorug‘lik qaytaruvchi plyonkaga ega bo‘lishi lozim.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-sign-1-full', label: 'Ha, har ikki tomonda to‘liq va standartga mos o‘rnatilgan', points: 5 },
      { id: 'opt-sign-1-part', label: 'Faqat bitta tomonda o‘rnatilgan yoki ta’mirtalab', points: 2 },
      { id: 'opt-sign-1-none', label: 'O‘rnatilmagan yoki yo‘q', points: 0 },
    ],
  },
  {
    id: 'q-sign-2',
    criterionId: 'crit-signage',
    text: 'Maktab hududiga yaqinlashishda 3.24 "Tezlik cheklangan (30 km/soat)" yo‘l belgisi mavjudmi?',
    description: 'Tezlikni cheklash talabi barcha kirish nuqtalarida ko‘rinadigan holatda bo‘lishi zarur.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-sign-2-full', label: 'Ha, 30 km/s belgisi to‘liq o‘rnatilgan', points: 5 },
      { id: 'opt-sign-2-part', label: 'Belgi bor, lekin eskirgan yoki ko‘rinishi to‘silgan', points: 2 },
      { id: 'opt-sign-2-none', label: 'Mavjud emas', points: 0 },
    ],
  },
  {
    id: 'q-sign-3',
    criterionId: 'crit-signage',
    text: 'Piyodalar o‘tish joyidagi 1.14.1 ("Zebra") yotiq chiziqlari yaqqol ko‘rinib turibdimi?',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-sign-3-full', label: 'Chiziqlar yangilangan, yorqin va sariq-oq tusda', points: 5 },
      { id: 'opt-sign-3-part', label: 'Chiziqlar o‘chib ketgan, ta’mir talab', points: 2 },
      { id: 'opt-sign-3-none', label: 'Chiziqlar umuman yo‘q', points: 0 },
    ],
  },

  // 2. Crossings
  {
    id: 'q-cross-1',
    criterionId: 'crit-crossings',
    text: 'Maktab asosiy chiqish darvozasi ro‘parasida piyodalar o‘tish joyi mavjudmi?',
    points: 8,
    requiresEvidence: true,
    options: [
      { id: 'opt-cross-1-full', label: 'Ha, to‘liq jihozlangan piyodalar o‘tish joyi mavjud', points: 8 },
      { id: 'opt-cross-1-part', label: 'Piyodalar o‘tish joyi bor, ammo maktabdan 100m dan uzoqda', points: 4 },
      { id: 'opt-cross-1-none', label: 'Piyodalar o‘tish joyi tashkil etilmagan', points: 0 },
    ],
  },
  {
    id: 'q-cross-2',
    criterionId: 'crit-crossings',
    text: 'Piyodalar o‘tish joyida miltillovchi T.7 turidagi sariq svetofor o‘rnatilganmi?',
    points: 7,
    requiresEvidence: true,
    options: [
      { id: 'opt-cross-2-full', label: 'Ha, ishchi holatdagi T.7 miltillovchi svetofori mavjud', points: 7 },
      { id: 'opt-cross-2-part', label: 'Svetofor bor, lekin ishlamaydi', points: 2 },
      { id: 'opt-cross-2-none', label: 'O‘rnatilmagan', points: 0 },
    ],
  },
  {
    id: 'q-cross-3',
    criterionId: 'crit-crossings',
    text: 'Tungi vaqtda piyodalar o‘tish joyini yoritish uchun maxsus yo‘naltirilgan chiroqlar mavjudmi?',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-cross-3-full', label: 'Ha, maxsus LED yoritgichlar o‘rnatilgan va ishlaydi', points: 5 },
      { id: 'opt-cross-3-part', label: 'Oddiy ko‘cha chirog‘i mavjud, maxsus yoritgich yo‘q', points: 2 },
      { id: 'opt-cross-3-none', label: 'Umuman yoritilmagan', points: 0 },
    ],
  },

  // 3. Speed Calming
  {
    id: 'q-speed-1',
    criterionId: 'crit-speed-calming',
    text: 'Piyodalar o‘tish joyidan oldin standart sun’iy notekislik (sun’iy yo‘l to‘sig‘i) o‘rnatilganmi?',
    points: 8,
    requiresEvidence: true,
    options: [
      { id: 'opt-speed-1-full', label: 'Ha, GOST talablariga mos sun’iy notekislik mavjud', points: 8 },
      { id: 'opt-speed-1-part', label: 'Nostandart yoki buzilgan holatda', points: 3 },
      { id: 'opt-speed-1-none', label: 'Mavjud emas', points: 0 },
    ],
  },
  {
    id: 'q-speed-2',
    criterionId: 'crit-speed-calming',
    text: 'Sun’iy notekislikdan oldin 5.43 "Sun’iy notekislik" yo‘l belgisi o‘rnatilganmi?',
    points: 7,
    requiresEvidence: true,
    options: [
      { id: 'opt-speed-2-full', label: 'Ha, belgi qoidaga muvofiq o‘rnatilgan', points: 7 },
      { id: 'opt-speed-2-none', label: 'Belgi o‘rnatilmagan', points: 0 },
    ],
  },

  // 4. Fencing
  {
    id: 'q-fence-1',
    criterionId: 'crit-fencing',
    text: 'Maktab darvozasi yonidagi yo‘l chetida kamida 50 metr uzunlikdagi xavfsizlik to‘siqlari (panjaralar) bormi?',
    points: 6,
    requiresEvidence: true,
    options: [
      { id: 'opt-fence-1-full', label: 'Ha, standart himoya panjaralari mavjud', points: 6 },
      { id: 'opt-fence-1-part', label: 'Panjaralar qisman o‘rnatilgan yoki siniq joylari bor', points: 3 },
      { id: 'opt-fence-1-none', label: 'Panjaralar yo‘q', points: 0 },
    ],
  },
  {
    id: 'q-fence-2',
    criterionId: 'crit-fencing',
    text: 'Maktab hududi butun perimetri bo‘ylab xavfsiz to‘silganmi?',
    points: 4,
    requiresEvidence: false,
    options: [
      { id: 'opt-fence-2-full', label: 'Ha, maktab hududi to‘liq to‘silgan', points: 4 },
      { id: 'opt-fence-2-none', label: 'Ochiq qismlari mavjud', points: 0 },
    ],
  },

  // 5. Sidewalks
  {
    id: 'q-side-1',
    criterionId: 'crit-sidewalks',
    text: 'Maktabga olib boruvchi ko‘chalarda qatnov qismidan ajratilgan piyodalar yo‘lakchasi (trotuar) mavjudmi?',
    points: 8,
    requiresEvidence: true,
    options: [
      { id: 'opt-side-1-full', label: 'Ha, ikki tomonlama sifatli trotuar mavjud', points: 8 },
      { id: 'opt-side-1-part', label: 'Faqat bitta tomonda yoki qisman asfaltlangan', points: 4 },
      { id: 'opt-side-1-none', label: 'Trotuar yo‘q, o‘quvchilar qatnov qismida yuradi', points: 0 },
    ],
  },
  {
    id: 'q-side-2',
    criterionId: 'crit-sidewalks',
    text: 'Piyodalar yo‘lakchasi to‘siqlarsiz (daraxt shoxlari, noqonuniy qurilmalar, chuqurlarsiz) holatdami?',
    points: 7,
    requiresEvidence: true,
    options: [
      { id: 'opt-side-2-full', label: 'Ha, yo‘lak toza va erkin harakatlanish imkoniyati bor', points: 7 },
      { id: 'opt-side-2-none', label: 'To‘siqlar mavjud, yurish qiyinlashgan', points: 0 },
    ],
  },

  // 6. Drop-off
  {
    id: 'q-drop-1',
    criterionId: 'crit-drop-off',
    text: 'Ota-onalar bolalarni mashinadan xavfsiz tushirishi uchun maktab darvozasidan xavfsiz masofada maxsus to‘xtash maydonchasi mavjudmi?',
    points: 6,
    requiresEvidence: true,
    options: [
      { id: 'opt-drop-1-full', label: 'Ha, maxsus ajratilgan va belgilangan to‘xtash joyi bor', points: 6 },
      { id: 'opt-drop-1-part', label: 'Noformal to‘xtash joyi bor, tartibga solinmagan', points: 3 },
      { id: 'opt-drop-1-none', label: 'To‘xtash joyi yo‘q, tirbandlik yuzaga keladi', points: 0 },
    ],
  },
  {
    id: 'q-drop-2',
    criterionId: 'crit-drop-off',
    text: 'To‘xtash joyidan maktab darvozasigacha xavfsiz piyoda marshruti ta’minlanganmi?',
    points: 4,
    requiresEvidence: false,
    options: [
      { id: 'opt-drop-2-full', label: 'Ha, bolalar yo‘lni kesib o‘tmasdan maktabga kiradi', points: 4 },
      { id: 'opt-drop-2-none', label: 'Bolalar avtomobillar harakati orasidan o‘tishga majbur', points: 0 },
    ],
  },

  // 7. Patrol
  {
    id: 'q-patrol-1',
    criterionId: 'crit-patrol',
    text: 'O‘quv kuni boshlanishi (07:30-08:30) va tugashida (12:30-13:30, 17:00-18:00) piyodalar o‘tish joyida navbatchilik tashkil etilganmi?',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-patrol-1-full', label: 'Ha, o‘qituvchilar/YHX inspektorlari muntazam navbatchilik qiladi', points: 5 },
      { id: 'opt-patrol-1-part', label: 'Faqat vaqti-vaqti bilan navbatchilik qilinadi', points: 2 },
      { id: 'opt-patrol-1-none', label: 'Navbatchilik yo‘lga qo‘yilmagan', points: 0 },
    ],
  },

  // 8. Education
  {
    id: 'q-edu-1',
    criterionId: 'crit-education',
    text: 'Maktabda "Yo‘l harakati qoidalari" bo‘yicha maxsus jihozlangan o‘quv xonasi yoki burchagi mavjudmi?',
    points: 6,
    requiresEvidence: true,
    options: [
      { id: 'opt-edu-1-full', label: 'Ha, to‘liq ko‘rgazmali qurollar va maketlar bilan jihozlangan', points: 6 },
      { id: 'opt-edu-1-part', label: 'Faqat oddiy devoriy burchak mavjud', points: 3 },
      { id: 'opt-edu-1-none', label: 'Mavjud emas', points: 0 },
    ],
  },
  {
    id: 'q-edu-2',
    criterionId: 'crit-education',
    text: 'O‘quvchilar uchun maktab hovlisida amaliy yo‘l harakati maydonchasi (avtoshaharacha yoki chizilgan marshrut) bormi?',
    points: 4,
    requiresEvidence: true,
    options: [
      { id: 'opt-edu-2-full', label: 'Ha, amaliy mashg‘ulot maydonchasi mavjud', points: 4 },
      { id: 'opt-edu-2-none', label: 'Mavjud emas', points: 0 },
    ],
  },
];
