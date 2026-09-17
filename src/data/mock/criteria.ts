import { Criterion, Question } from '@/types';

/**
 * ============================================================================
 * Rasmiy Xalqaro SR4S (Star Rating for Schools / iRAP) Standarti Mezonlari
 * problems.docx talablari va 40 ta rasmiy tasvirga 1-ga-1 to'liq moslashtirilgan.
 * ============================================================================
 */

export const MOCK_CRITERIA: Criterion[] = [
  {
    id: 'crit-road-geometry',
    title: '1. Yo‘l parametrlari va geometriyasi',
    description: 'Tasmalar soni, yo‘l nishabligi, yo‘lning o‘rta qismi va chetki tasmalar holati',
    icon: 'Gauge',
    questionCount: 4,
    maxScore: 15,
    order: 1,
  },
  {
    id: 'crit-school-signs',
    title: '2. Maktab ogohlantirishi va patrul xizmati',
    description: 'Maktab ogohlantirish belgilari, tezlik cheklovlari va piyodalar patruli nazorati',
    icon: 'ShieldAlert',
    questionCount: 3,
    maxScore: 15,
    order: 2,
  },
  {
    id: 'crit-pedestrian-sidewalks',
    title: '3. Piyodalar yo‘lagi (Trotuarlar)',
    description: 'Chap va o‘ng tomondagi piyodalar yo‘lagi, to‘siqlar va chetki tasma kengligi',
    icon: 'Footprints',
    questionCount: 3,
    maxScore: 15,
    order: 3,
  },
  {
    id: 'crit-crossings-flow',
    title: '4. Piyodalar o‘tish joyi va oqimlar',
    description: 'O‘tish joyi turi, o‘tish joyi sifati, piyodalar va bolalar o‘tish oqimi',
    icon: 'Route',
    questionCount: 3,
    maxScore: 15,
    order: 4,
  },
  {
    id: 'crit-intersections-access',
    title: '5. Chorraha va hovli kirish joylari',
    description: 'Chorraha turi va sifati, burilish bo‘laklari, hovli va tijorat kirish joylari',
    icon: 'GitFork',
    questionCount: 4,
    maxScore: 15,
    order: 5,
  },
  {
    id: 'crit-speeds-traffic',
    title: '6. Tezlik va transport oqimi',
    description: 'Belgilangan va haqiqiy tezlik, kunlik avtomobillar, motosikl va yuk mashinalari ulushi',
    icon: 'Zap',
    questionCount: 4,
    maxScore: 15,
    order: 6,
  },
  {
    id: 'crit-land-environment',
    title: '7. Hudud turi va atrof-muhit',
    description: 'Hudud toifasi (shahar/qishloq), yerda foydalanish va ko‘rinish masofasi',
    icon: 'Building2',
    questionCount: 2,
    maxScore: 10,
    order: 7,
  },
];

export const MOCK_QUESTIONS: Question[] = [
  // ==========================================
  // 1. YO‘L PARAMETRLARI VA GEOMETRIYASI
  // ==========================================
  {
    id: 'q-lane-count',
    criterionId: 'crit-road-geometry',
    code: 'SR4S-01',
    text: 'Tasmalar soni (Qatnov qismidagi bo‘laklar soni):',
    description: 'Yo‘lning maktab oldidagi qismida jami harakatlanish tasmalarining soni.',
    points: 4,
    requiresEvidence: true,
    helpGuidance: 'Rasmiy SR4S standarti bo‘yicha 4 xil toifada baholanadi.',
    guideImage: '/sr4s-guide/image2.png',
    options: [
      { id: 'opt-lanes-1', label: '1 ta tasma (Bir tomonlama yoki tor bitta yo‘l)', points: 4, imageUrl: '/sr4s-guide/image2.png' },
      { id: 'opt-lanes-2', label: '2 ta tasma (Har bir yo‘nalish uchun bittadan tasma)', points: 3, imageUrl: '/sr4s-guide/image2.png' },
      { id: 'opt-lanes-3', label: '3 ta tasma (O‘rtada burilish yoki alohida tasma bilan)', points: 2, imageUrl: '/sr4s-guide/image3.png' },
      { id: 'opt-lanes-4', label: '4 va undan ortiq tasma (Katta magistral / ko‘p polosali)', points: 1, imageUrl: '/sr4s-guide/image3.png' },
    ],
  },
  {
    id: 'q-road-gradient',
    criterionId: 'crit-road-geometry',
    code: 'SR4S-02',
    text: 'Yo‘l nishabligi (Gradient / Qiyalik foizi):',
    description: 'Yo‘l uchastkasining qiyalik darajasi tormoz yo‘liga to‘g‘ridan-to‘g‘ri ta’sir qiladi.',
    points: 4,
    requiresEvidence: true,
    helpGuidance: 'Standart oraliqlar: 0% < t < 7.5%, 7.5% ≤ t < 10%, t ≥ 10%.',
    guideImage: '/sr4s-guide/image4.png',
    options: [
      { id: 'opt-grad-flat', label: '0% < t < 7.5% (Tekis yoki juda past nishablik)', points: 4, imageUrl: '/sr4s-guide/image4.png' },
      { id: 'opt-grad-med', label: '7.5% ≤ t < 10% (O‘rtacha nishablik)', points: 2, imageUrl: '/sr4s-guide/image5.png' },
      { id: 'opt-grad-steep', label: '10% < t (Tik nishablik / Xavfli nishablik)', points: 1, imageUrl: '/sr4s-guide/image5.png' },
    ],
  },
  {
    id: 'q-median-type',
    criterionId: 'crit-road-geometry',
    code: 'SR4S-03',
    text: 'Yo‘lning o‘rta qismi (Median / Ajratuvchi polosa turi):',
    description: 'Qarama-qarshi harakat oqimlarini ajratuvchi konstruksiya turi.',
    points: 4,
    requiresEvidence: true,
    helpGuidance: 'Metall/beton to‘siqlar yoki xavfsizlik orolchalari o‘quvchilar xavfsizligini ta’minlaydi.',
    guideImage: '/sr4s-guide/image6.png',
    options: [
      { id: 'opt-med-metal', label: 'Metall to‘siq (W-Beam yoki kabel to‘siq)', points: 4, imageUrl: '/sr4s-guide/image6.png' },
      { id: 'opt-med-concrete', label: 'Beton to‘siq (Monolit New Jersey to‘siq)', points: 4, imageUrl: '/sr4s-guide/image6.png' },
      { id: 'opt-med-island', label: 'Keng xavfsizlik ajratuvchi orolchasi (≥ 1.0 m)', points: 3, imageUrl: '/sr4s-guide/image7.png' },
      { id: 'opt-med-line', label: 'Uzluksiz markaziy chiziq (Bo‘yoq bilan)', points: 2, imageUrl: '/sr4s-guide/image7.png' },
      { id: 'opt-med-none', label: 'Ajratuvchi yo‘q / Umuman ajratilmagan', points: 1, imageUrl: '/sr4s-guide/image7.png' },
    ],
  },
  {
    id: 'q-shoulder-width',
    criterionId: 'crit-road-geometry',
    code: 'SR4S-04',
    text: 'Chetki tasma kengligi (Chap va o‘ng tomon):',
    description: 'Qatnov qismining chetidagi asfaltlangan/mustahkamlangan xavfsiz chet qismi.',
    points: 3,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image14.png',
    options: [
      { id: 'opt-sh-wide', label: 'Keng chetki tasma (≥ 2.4 metr)', points: 3, imageUrl: '/sr4s-guide/image14.png' },
      { id: 'opt-sh-med', label: 'O‘rtacha chetki tasma (1.0m – 2.4m)', points: 2, imageUrl: '/sr4s-guide/image14.png' },
      { id: 'opt-sh-narrow', label: 'Tor chetki tasma (< 1.0 metr)', points: 1, imageUrl: '/sr4s-guide/image15.png' },
      { id: 'opt-sh-none', label: 'Chetki tasma mavjud emas', points: 0, imageUrl: '/sr4s-guide/image15.png' },
    ],
  },

  // ==========================================
  // 2. MAKTAB OGOHLANTIRISHI VA PATRUL
  // ==========================================
  {
    id: 'q-school-warning-signs',
    criterionId: 'crit-school-signs',
    code: 'SR4S-05',
    text: 'Maktab ogohlantirish belgilari (Maktab zonasi):',
    description: 'Haydovchilarni maktab hududiga yaqinlashayotgani haqida ogohlantiruvchi vositalar.',
    points: 6,
    requiresEvidence: true,
    helpGuidance: 'Rasmiy standartda 4 ta asosiy variant mavjud.',
    guideImage: '/sr4s-guide/image8.png',
    options: [
      { id: 'opt-sign-flashing', label: 'Miltillovchi chiroqli (LED) zamonaviy belgi', points: 6, imageUrl: '/sr4s-guide/image8.png' },
      { id: 'opt-sign-standard', label: 'Standart 1.21 «Bolalar» yo‘l belgisi', points: 4, imageUrl: '/sr4s-guide/image8.png' },
      { id: 'opt-sign-road-marking', label: 'Yo‘l qoplamasidagi yozuv / Maktab piktogrammasi', points: 3, imageUrl: '/sr4s-guide/image9.png' },
      { id: 'opt-sign-none', label: 'Ogohlantirish belgisi mavjud emas', points: 0, imageUrl: '/sr4s-guide/image9.png' },
    ],
  },
  {
    id: 'q-crossing-patrol',
    criterionId: 'crit-school-signs',
    code: 'SR4S-06',
    text: 'Piyodalar patruli (Maktab navbatchisi / YPX xodimi):',
    description: 'Dars paytida bolalarning yo‘ldan o‘tishini tartibga soluvchi xodimlar mavjudligi.',
    points: 5,
    requiresEvidence: true,
    helpGuidance: 'Rasmiy standartda 3 ta variant mavjud.',
    guideImage: '/sr4s-guide/image10.png',
    options: [
      { id: 'opt-patrol-full', label: 'Doimiy maktab patruli / YPX xodimi tomonidan to‘liq nazorat', points: 5, imageUrl: '/sr4s-guide/image10.png' },
      { id: 'opt-patrol-peak', label: 'Faqat dars boshlanishi va tugashida navbatchi patrul', points: 3, imageUrl: '/sr4s-guide/image10.png' },
      { id: 'opt-patrol-none', label: 'Piyodalar patruli mavjud emas', points: 0, imageUrl: '/sr4s-guide/image11.png' },
    ],
  },
  {
    id: 'q-speed-limit',
    criterionId: 'crit-school-signs',
    code: 'SR4S-07',
    text: 'Belgilangan tezlik cheklovi (Maktab oldida):',
    description: 'Maktab zonasi uchun o‘rnatilgan rasmiy tezlik cheklovi (3.24 belgisi).',
    points: 4,
    requiresEvidence: true,
    guideImage: '/sr4s-guide/image31.png',
    options: [
      { id: 'opt-sp-30', label: '≤ 30 km/soat (Xalqaro xavfsiz maktab standarti)', points: 4, imageUrl: '/sr4s-guide/image31.png' },
      { id: 'opt-sp-40', label: '40 km/soat', points: 3, imageUrl: '/sr4s-guide/image31.png' },
      { id: 'opt-sp-50', label: '50 km/soat', points: 2, imageUrl: '/sr4s-guide/image32.png' },
      { id: 'opt-sp-60', label: '60 km/soat', points: 1, imageUrl: '/sr4s-guide/image32.png' },
      { id: 'opt-sp-70', label: '70+ km/soat (Tezlik cheklanmagan / Yuqori tezlik)', points: 0, imageUrl: '/sr4s-guide/image32.png' },
    ],
  },

  // ==========================================
  // 3. PIYODALAR YO‘LAGI (TROTUARLAR)
  // ==========================================
  {
    id: 'q-sidewalk-left',
    criterionId: 'crit-pedestrian-sidewalks',
    code: 'SR4S-08',
    subType: 'LEFT',
    text: 'Piyodalar yo‘lagi — Chap tomon (Sidewalk Left):',
    description: 'Yo‘lning chap tomonidagi trotuar va piyodalar harakatlanish holati.',
    points: 5,
    requiresEvidence: true,
    guideImage: '/sr4s-guide/image12.png',
    options: [
      { id: 'opt-sw-l-bar', label: 'To‘siq yoki yashil zona bilan to‘liq ajratilgan yo‘lak (≥ 1.5m)', points: 5, imageUrl: '/sr4s-guide/image12.png' },
      { id: 'opt-sw-l-elev', label: 'Ko‘tarilgan alohida trotuar (To‘siqsiz, lekin xavfsiz)', points: 4, imageUrl: '/sr4s-guide/image12.png' },
      { id: 'opt-sw-l-path', label: 'Yo‘l chetidagi asfaltlangan/shag‘alli piyoda yo‘lkasi', points: 2, imageUrl: '/sr4s-guide/image13.png' },
      { id: 'opt-sw-l-none', label: 'Piyodalar yo‘lagi mavjud emas (Piyodalar qatnov qismida)', points: 0, imageUrl: '/sr4s-guide/image13.png' },
    ],
  },
  {
    id: 'q-sidewalk-right',
    criterionId: 'crit-pedestrian-sidewalks',
    code: 'SR4S-09',
    subType: 'RIGHT',
    text: 'Piyodalar yo‘lagi — O‘ng tomon (Sidewalk Right):',
    description: 'Yo‘lning o‘ng tomonidagi trotuar va piyodalar harakatlanish holati.',
    points: 5,
    requiresEvidence: true,
    guideImage: '/sr4s-guide/image12.png',
    options: [
      { id: 'opt-sw-r-bar', label: 'To‘siq yoki yashil zona bilan to‘liq ajratilgan yo‘lak (≥ 1.5m)', points: 5, imageUrl: '/sr4s-guide/image12.png' },
      { id: 'opt-sw-r-elev', label: 'Ko‘tarilgan alohida trotuar (To‘siqsiz, lekin xavfsiz)', points: 4, imageUrl: '/sr4s-guide/image12.png' },
      { id: 'opt-sw-r-path', label: 'Yo‘l chetidagi asfaltlangan/shag‘alli piyoda yo‘lkasi', points: 2, imageUrl: '/sr4s-guide/image13.png' },
      { id: 'opt-sw-r-none', label: 'Piyodalar yo‘lagi mavjud emas (Piyodalar qatnov qismida)', points: 0, imageUrl: '/sr4s-guide/image13.png' },
    ],
  },
  {
    id: 'q-pedestrian-fencing',
    criterionId: 'crit-pedestrian-sidewalks',
    code: 'SR4S-10',
    text: 'Piyodalar himoya to‘siqlari (Panjaralar):',
    description: 'O‘quvchilarning qatnov qismiga tasodifan chiqib ketishining oldini oluvchi panjaralar.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-fnc-full', label: 'Maktab darvozasi bo‘ylab uzluksiz himoya panjarasi bor', points: 5 },
      { id: 'opt-fnc-part', label: 'Qisman o‘rnatilgan panjara', points: 3 },
      { id: 'opt-fnc-none', label: 'Himoya panjarasi mavjud emas', points: 0 },
    ],
  },

  // ==========================================
  // 4. PIYODALAR O‘TISH JOYI VA OQIMLAR
  // ==========================================
  {
    id: 'q-crossing-type',
    criterionId: 'crit-crossings-flow',
    code: 'SR4S-11',
    text: 'Asosiy piyodalar o‘tish joyi turi:',
    description: 'Maktabga kirishdagi asosiy piyodalar o‘tish yo‘lagining turi.',
    points: 6,
    requiresEvidence: true,
    guideImage: '/sr4s-guide/image16.png',
    options: [
      { id: 'opt-cr-grade', label: 'Yerusti (ko‘prik) yoki yerosti piyodalar o‘tish yo‘li', points: 6, imageUrl: '/sr4s-guide/image16.png' },
      { id: 'opt-cr-signal', label: 'Svetofor bilan tartibga solingan piyodalar o‘tish joyi', points: 5, imageUrl: '/sr4s-guide/image16.png' },
      { id: 'opt-cr-raised', label: 'Ko‘tarilgan xavfsiz "Zebra" (Speed Table / Sun’iy notekislikli)', points: 4, imageUrl: '/sr4s-guide/image17.png' },
      { id: 'opt-cr-zebra', label: 'Standart chiziqli "Zebra" (Tartibga solinmagan)', points: 2, imageUrl: '/sr4s-guide/image17.png' },
      { id: 'opt-cr-none', label: 'Piyodalar o‘tish joyi mavjud emas (Yo‘q)', points: 0, imageUrl: '/sr4s-guide/image18.png' },
    ],
  },
  {
    id: 'q-crossing-quality',
    criterionId: 'crit-crossings-flow',
    code: 'SR4S-12',
    text: 'O‘tish joyining sifati va holati:',
    description: 'Chiziqlarning ko‘rinishi, yo‘l belgilari va yoritilganlik holati.',
    points: 4,
    requiresEvidence: true,
    guideImage: '/sr4s-guide/image18.png',
    options: [
      { id: 'opt-cq-good', label: 'A’lo holatda (Aniq yangi chiziqlar, belgi va yaxshi yoritilgan)', points: 4, imageUrl: '/sr4s-guide/image18.png' },
      { id: 'opt-cq-med', label: 'Qoniqarli (Chiziqlar ko‘rinadi, lekin yoritgich yetarli emas)', points: 2, imageUrl: '/sr4s-guide/image18.png' },
      { id: 'opt-cq-poor', label: 'Ta’mirtalab (Chiziqlar o‘chib ketgan / belgisiz)', points: 1, imageUrl: '/sr4s-guide/image19.png' },
      { id: 'opt-cq-none', label: 'Mavjud emas (O‘tish joyi yo‘q bo‘lsa)', points: 0, imageUrl: '/sr4s-guide/image19.png' },
    ],
  },
  {
    id: 'q-pedestrian-flow',
    criterionId: 'crit-crossings-flow',
    code: 'SR4S-13',
    text: 'Piyodalar o‘tish oqimi (Tig‘iz paytdagi harakatlanish soni):',
    description: 'Eng tig‘iz soatda maktab oldidan o‘tuvchi o‘quvchilar va piyodalar soni.',
    points: 5,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image20.png',
    options: [
      { id: 'opt-pf-high', label: 'Yuqori oqim (Eng tig‘iz soatda > 100 nafar o‘quvchi/piyoda)', points: 5, imageUrl: '/sr4s-guide/image20.png' },
      { id: 'opt-pf-med', label: 'O‘rtacha oqim (Eng tig‘iz soatda 20 – 100 nafar o‘quvchi)', points: 3, imageUrl: '/sr4s-guide/image20.png' },
      { id: 'opt-pf-low', label: 'Kam oqim (Eng tig‘iz soatda < 20 nafar o‘quvchi)', points: 2, imageUrl: '/sr4s-guide/image21.png' },
      { id: 'opt-pf-none', label: 'Piyodalar oqimi mavjud emas / juda kam', points: 1, imageUrl: '/sr4s-guide/image21.png' },
    ],
  },

  // ==========================================
  // 5. CHORRAHA VA HOVLI KIRISH JOYILARI
  // ==========================================
  {
    id: 'q-intersection-type',
    criterionId: 'crit-intersections-access',
    code: 'SR4S-14',
    text: 'Chorraha (Kesishuv) turi:',
    description: 'Maktabga yaqin joylashgan yo‘l kesishuvi / chorraha konfiguratsiyasi.',
    points: 4,
    requiresEvidence: true,
    guideImage: '/sr4s-guide/image22.png',
    options: [
      { id: 'opt-int-roundabout', label: 'Aylanma harakatli chorraha (Kalka / Roundabout)', points: 4, imageUrl: '/sr4s-guide/image22.png' },
      { id: 'opt-int-signal-4', label: '4 tomonli svetoforli chorraha', points: 3, imageUrl: '/sr4s-guide/image22.png' },
      { id: 'opt-int-3way', label: '3 tomonli (T-simon) chorraha', points: 3, imageUrl: '/sr4s-guide/image23.png' },
      { id: 'opt-int-unsignal-4', label: '4 tomonli tartibga solinmagan chorraha (Xavfli)', points: 1, imageUrl: '/sr4s-guide/image23.png' },
      { id: 'opt-int-none', label: 'Chorraha mavjud emas (To‘g‘ri yo‘l uchastkasi)', points: 4, imageUrl: '/sr4s-guide/image27.png' },
    ],
  },
  {
    id: 'q-commercial-access',
    criterionId: 'crit-intersections-access',
    code: 'SR4S-15',
    text: 'Hovli va tijorat kirish-chiqish joylari (Property & Commercial Access):',
    description: 'Maktab atrofidagi do‘konlar, bozorlar, avtoservislar yoki hovlilarga kirish yo‘llari soni.',
    points: 4,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image24.png',
    options: [
      { id: 'opt-ca-none', label: 'Kirish-chiqish joylari mavjud emas (To‘liq yopiq)', points: 4, imageUrl: '/sr4s-guide/image24.png' },
      { id: 'opt-ca-low', label: 'Kam sonli (1–2 ta xususiy hovli kirish joyi)', points: 3, imageUrl: '/sr4s-guide/image24.png' },
      { id: 'opt-ca-med', label: 'O‘rtacha (3–5 ta turar-joy va avtoturargoh kirish joyi)', points: 2, imageUrl: '/sr4s-guide/image24.png' },
      { id: 'opt-ca-high', label: 'Zich tijorat hududi (Do‘konlar, bozor, doimiy mashina kirib-chiqishi)', points: 1, imageUrl: '/sr4s-guide/image24.png' },
    ],
  },
  {
    id: 'q-intersection-quality',
    criterionId: 'crit-intersections-access',
    code: 'SR4S-16',
    text: 'Chorraha sifati va ko‘rinish masofasi:',
    description: 'Chorrahada transport vositalari va piyodalarning ko‘rinish darajasi.',
    points: 4,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image27.png',
    options: [
      { id: 'opt-iq-good', label: 'A’lo (Keng ko‘rinish masofasi, barcha belgilar mavjud)', points: 4, imageUrl: '/sr4s-guide/image27.png' },
      { id: 'opt-iq-med', label: 'O‘rtacha ko‘rinish masofasi', points: 2, imageUrl: '/sr4s-guide/image28.png' },
      { id: 'opt-iq-poor', label: 'Ko‘rinish cheklangan (Daraxtlar, bino to‘sib qo‘ygan)', points: 1, imageUrl: '/sr4s-guide/image28.png' },
      { id: 'opt-iq-none', label: 'Mavjud emas (Chorraha yo‘q bo‘lsa)', points: 4, imageUrl: '/sr4s-guide/image27.png' },
    ],
  },
  {
    id: 'q-turning-lanes',
    criterionId: 'crit-intersections-access',
    code: 'SR4S-17',
    text: 'Burilish bo‘lagi (Cho‘ntaklar va burilish sifati):',
    description: 'Chapga yoki o‘ngga xavfsiz burilish uchun alohida tasma mavjudligi.',
    points: 3,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image29.png',
    options: [
      { id: 'opt-tl-pocket', label: 'Alohida ajratilgan xavfsiz burilish bo‘lagi (Cho‘ntak)', points: 3, imageUrl: '/sr4s-guide/image29.png' },
      { id: 'opt-tl-line', label: 'Faqat chiziq bilan belgilangan burilish zonasi', points: 2, imageUrl: '/sr4s-guide/image29.png' },
      { id: 'opt-tl-none', label: 'Mavjud emas (Alohida burilish bo‘lagi yo‘q)', points: 0, imageUrl: '/sr4s-guide/image30.png' },
    ],
  },

  // ==========================================
  // 6. TEZLIK VA TRANSPORT OQIMI
  // ==========================================
  {
    id: 'q-operating-speed',
    criterionId: 'crit-speeds-traffic',
    code: 'SR4S-18',
    text: 'Haqiqiy (ishchi) harakat tezligi (Operating Speed):',
    description: 'Avtomobillarning maktab oldida amalda harakatlanish tezligi.',
    points: 4,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image33.png',
    options: [
      { id: 'opt-os-30', label: '30 km/soat gacha (Xavfsiz tinchlantirilgan harakat)', points: 4, imageUrl: '/sr4s-guide/image33.png' },
      { id: 'opt-os-45', label: '31 – 45 km/soat', points: 3, imageUrl: '/sr4s-guide/image33.png' },
      { id: 'opt-os-60', label: '46 – 60 km/soat', points: 2, imageUrl: '/sr4s-guide/image34.png' },
      { id: 'opt-os-high', label: '> 60 km/soat (Haddan tashqari yuqori tezlik)', points: 0, imageUrl: '/sr4s-guide/image34.png' },
    ],
  },
  {
    id: 'q-daily-traffic-volume',
    criterionId: 'crit-speeds-traffic',
    code: 'SR4S-19',
    text: 'Kunlik avtomobillar oqimi (AADT - Traffic Volume):',
    description: 'Maktab oldidagi yo‘ldan bir sutkada o‘tuvchi jami transport vositalari soni.',
    points: 4,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image39.png',
    options: [
      { id: 'opt-tv-low', label: '< 1 000 avtomobil / sutka (Kam qatnovli ko‘cha)', points: 4, imageUrl: '/sr4s-guide/image39.png' },
      { id: 'opt-tv-med', label: '1 000 – 5 000 avtomobil / sutka', points: 3, imageUrl: '/sr4s-guide/image39.png' },
      { id: 'opt-tv-high', label: '5 000 – 15 000 avtomobil / sutka', points: 2, imageUrl: '/sr4s-guide/image40.png' },
      { id: 'opt-tv-vhigh', label: '> 15 000 avtomobil / sutka (O‘ta gavjum magistral)', points: 1, imageUrl: '/sr4s-guide/image40.png' },
    ],
  },
  {
    id: 'q-truck-percentage',
    criterionId: 'crit-speeds-traffic',
    code: 'SR4S-20',
    text: 'Yuk mashinalari va og‘ir transport ulushi (%):',
    description: 'Harakatdagi yuk mashinalari, avtobuslar va og‘ir texnikalarning foizi (40% gacha).',
    points: 4,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image37.png',
    options: [
      { id: 'opt-tr-0', label: '0% – 5% gacha (Deyarli yuk mashinasi o‘tmaydi)', points: 4, imageUrl: '/sr4s-guide/image37.png' },
      { id: 'opt-tr-15', label: '5% – 15% gacha', points: 3, imageUrl: '/sr4s-guide/image37.png' },
      { id: 'opt-tr-25', label: '15% – 25% gacha', points: 2, imageUrl: '/sr4s-guide/image38.png' },
      { id: 'opt-tr-40', label: '25% – 40% gacha (Yuqori yuk mashinasi oqimi)', points: 1, imageUrl: '/sr4s-guide/image38.png' },
      { id: 'opt-tr-high', label: '> 40% (Tranzit og‘ir yuk yo‘lagi)', points: 0, imageUrl: '/sr4s-guide/image38.png' },
    ],
  },
  {
    id: 'q-motorcycle-percentage',
    criterionId: 'crit-speeds-traffic',
    code: 'SR4S-21',
    text: 'Motosikl, moped va skuterlar ulushi (%):',
    description: 'Yo‘ldagi 2 g‘ildirakli motorli transport vositalarining ulushi.',
    points: 3,
    requiresEvidence: false,
    guideImage: '/sr4s-guide/image35.png',
    options: [
      { id: 'opt-mc-0', label: '0% – 5% gacha (Kam yoki yo‘q)', points: 3, imageUrl: '/sr4s-guide/image35.png' },
      { id: 'opt-mc-15', label: '5% – 15% gacha', points: 2, imageUrl: '/sr4s-guide/image35.png' },
      { id: 'opt-mc-high', label: '> 15% (Zich motosikl oqimi)', points: 1, imageUrl: '/sr4s-guide/image36.png' },
    ],
  },

  // ==========================================
  // 7. HUDUD TURI VA ATROF-MUHIT
  // ==========================================
  {
    id: 'q-area-environment',
    criterionId: 'crit-land-environment',
    code: 'SR4S-22',
    text: 'Hudud toifasi (Yo‘lning joylashuv joyi):',
    description: 'Maktab joylashgan atrof-muhit hududi.',
    points: 5,
    requiresEvidence: false,
    options: [
      { id: 'opt-ae-urban-center', label: 'Shahar markazi / Zich turar-joy hududi', points: 5 },
      { id: 'opt-ae-suburban', label: 'Shahar atrofi / Qishloq aholi punkti', points: 4 },
      { id: 'opt-ae-rural-highway', label: 'Aholi punktidan tashqari / Tranzit magistral yoqasi', points: 2 },
    ],
  },
  {
    id: 'q-sight-distance',
    criterionId: 'crit-land-environment',
    code: 'SR4S-23',
    text: 'Haydovchilar uchun ko‘rinish masofasi (Sight Distance):',
    description: 'Haydovchining maktab va piyodalar o‘tish joyini uzoqdan ko‘ra olish masofasi.',
    points: 5,
    requiresEvidence: true,
    options: [
      { id: 'opt-sd-good', label: 'A’lo (> 150 metr to‘siqsiz ko‘rinadi)', points: 5 },
      { id: 'opt-sd-med', label: 'O‘rtacha (60 – 150 metr ko‘rinadi)', points: 3 },
      { id: 'opt-sd-poor', label: 'Cheklangan (< 60 metr, burchak/daraxt to‘sgan)', points: 1 },
    ],
  },
];
