const { Pool } = require('pg');

const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const LOCAL_DATABASE_URL = 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db';

const SR4S_CRITERIA = [
  {
    id: 'crit-road-env',
    title: 'Yo‘l atrof-muhiti va yer bo‘limi',
    description: 'Maktab atrofidagi hududning rivojlanganlik turi, yer uchastkasidan foydalanish va ko‘rinish masofasi (SR4S Section 3)',
    icon: 'Building2',
    sort_order: 1,
    max_score: 15,
  },
  {
    id: 'crit-road-type',
    title: 'Yo‘l turi va harakat bo‘laklari',
    description: 'Harakat bo‘laklari soni, bo‘lak kengligi, yo‘l qoplamasi sifati va ilashish ko‘rsatkichi (SR4S Section 4)',
    icon: 'Gauge',
    sort_order: 2,
    max_score: 15,
  },
  {
    id: 'crit-median-features',
    title: 'Qatnov qismini ajratuvchi elementlar',
    description: 'Qarama-qarshi transport oqimlarini ajratuvchi o‘q chiziqlari, maysazor va xavfsizlik to‘siqlari (SR4S Section 5)',
    icon: 'Split',
    sort_order: 3,
    max_score: 10,
  },
  {
    id: 'crit-school-zone',
    title: 'Maktab xavfsizlik zonasi va patruli',
    description: 'Maktab zonasi ogohlantirish belgilari, miltillovchi T.7 svetoforlar va dars vaqtidagi patrul nazorati (SR4S Section 6)',
    icon: 'ShieldAlert',
    sort_order: 4,
    max_score: 20,
  },
  {
    id: 'crit-sidewalks',
    title: 'Piyodalar yo‘lakchalari (Trotuarlar)',
    description: 'Maktabga olib boruvchi trotuarlarning mavjudligi, qatnov qismidan ajratilganlik masofasi va sifati (SR4S Section 7)',
    icon: 'Footprints',
    sort_order: 5,
    max_score: 15,
  },
  {
    id: 'crit-pedestrian-crossing',
    title: 'Piyodalar o‘tish joyi va inshootlari',
    description: 'Piyodalar o‘tish joyining turi (Zebra, svetoforli, sun’iy notekislik ustidagi, ko‘prik) va yoritilganligi (SR4S Section 8-9)',
    icon: 'Route',
    sort_order: 6,
    max_score: 15,
  },
  {
    id: 'crit-speed-management',
    title: 'Tezlikni jilovlash va pasaytirish',
    description: 'Ruxsat etilgan maksimal tezlik cheklovi, sun’iy notekisliklar va tungi ko‘cha yoritgichlari (SR4S Section 15)',
    icon: 'Zap',
    sort_order: 7,
    max_score: 10,
  },
];

const SR4S_QUESTIONS = [
  // 1. Road Environment
  {
    id: 'q-land-use',
    criterion_id: 'crit-road-env',
    text: 'Maktab bo‘ylab yo‘l atrofi yer uchastkasidan foydalanish turi qanday? (SR4S 3.1 Land Use)',
    description: 'Piyodalar intensivligiga bevosita ta’sir qiluvchi atrofdagi bino va inshootlar turi.',
    points: 8,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-land-school', label: 'Maktab va ta’lim muassasasi hududi (School)', points: 8 },
      { id: 'opt-land-commercial', label: 'Tijorat, bozor va jamoat joylari (Commercial)', points: 6 },
      { id: 'opt-land-residential', label: 'Aholi yashash mavzesi (Residential)', points: 4 },
      { id: 'opt-land-industrial', label: 'Sanoat yoki qishloq xo‘jaligi hududi (Industrial/Farming)', points: 2 },
      { id: 'opt-land-undeveloped', label: 'Rivojlanmagan / Bo‘sh ochiq hudud (Undeveloped)', points: 0 },
    ]),
  },
  {
    id: 'q-sight-distance',
    criterion_id: 'crit-road-env',
    text: 'Haydovchilar uchun piyodalarni ko‘rish masofasi yetarlimi? (SR4S 3.4 Sight Distance)',
    description: 'Yo‘l burilishlari, daraxtlar yoki to‘siqlar haydovchining ko‘rinishiga xalaqit bermaydimi?',
    points: 7,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-sight-adequate', label: 'Yetarli va ochiq ko‘rinish masofasi (Adequate sight distance)', points: 7 },
      { id: 'opt-sight-poor', label: 'Cheklangan yoki yomon ko‘rinish masofasi (Poor sight distance)', points: 0 },
    ]),
  },

  // 2. Road Type
  {
    id: 'q-number-of-lanes',
    criterion_id: 'crit-road-type',
    text: 'Bir yo‘nalishdagi harakat bo‘laklari soni nechta? (SR4S 4.1 Number of Lanes)',
    description: 'Bo‘laklar sonining ko‘pligi piyodalar uchun kesib o‘tish xavfini oshiradi.',
    points: 8,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-lanes-1', label: '1 ta harakat bo‘lagi (One lane in direction)', points: 8 },
      { id: 'opt-lanes-2', label: '2 ta harakat bo‘lagi (Two lanes in direction)', points: 5 },
      { id: 'opt-lanes-3plus', label: '3 va undan ortiq bo‘laklar (Three or more lanes)', points: 2 },
    ]),
  },
  {
    id: 'q-road-surface',
    criterion_id: 'crit-road-type',
    text: 'Yo‘l qoplamasining holati va ilashish sifati qanday? (SR4S 4.4 & 4.5 Road Surface/Grip)',
    description: 'Asfalt qoplamasining tekisligi va tormozlanishga tayyorligi.',
    points: 7,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-surface-good', label: 'Yaxshi, silliq va yetarli ilashuvga ega (Good condition & grip)', points: 7 },
      { id: 'opt-surface-medium', label: 'O‘rtacha, nosilliq yoki qisman darz ketgan (Medium)', points: 3 },
      { id: 'opt-surface-poor', label: 'Yomon, chuqurchalar va yemirilishlar bor (Poor)', points: 0 },
    ]),
  },

  // 3. Median Features
  {
    id: 'q-median-type',
    criterion_id: 'crit-median-features',
    text: 'Qarama-qarshi transport oqimlarini ajratuvchi vosita turi (SR4S 5.1 Median / Middle of Road)',
    description: 'Qarama-qarshi to‘qnashuvlarning oldini oluvchi va piyodalarga panoh beruvchi ajratuvchilar.',
    points: 10,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-med-barrier', label: 'Metall, beton yoki trosli xavfsizlik to‘sig‘i (Metal/Concrete barrier)', points: 10 },
      { id: 'opt-med-separated', label: 'Fizik ajratilgan maysazor / yaxlit hudud (Separated median)', points: 8 },
      { id: 'opt-med-posts', label: 'Egiluvchan ustunchalar yoki keng chiziqli ajratgich (>60cm)', points: 6 },
      { id: 'opt-med-doubleline', label: 'Qo‘sh yoki tekis o‘q chizig‘i (Centreline markings)', points: 3 },
      { id: 'opt-med-none', label: 'Ajratuvchi vosita yo‘q (None / Undivided)', points: 0 },
    ]),
  },

  // 4. School Zone
  {
    id: 'q-school-warning',
    criterion_id: 'crit-school-zone',
    text: 'Maktab zonasida ogohlantiruvchi yo‘l vositalari o‘rnatilganmi? (SR4S 6.1 School Warning)',
    description: '1.21 "Bolalar" belgisi, 3.24 "Tezlik cheklangan" va T.7 miltillovchi chiroqlar.',
    points: 10,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-warn-beacon', label: 'Miltillovchi T.7 svetofor / mayoqcha va belgilari bor (Flashing Beacon)', points: 10 },
      { id: 'opt-warn-signs', label: 'Ogohlantiruvchi yo‘l belgilari va yotiq chiziqlar bor (Signs / Markings)', points: 7 },
      { id: 'opt-warn-none', label: 'Maktab zonasi ogohlantirish belgilari yo‘q (No school warning)', points: 0 },
    ]),
  },
  {
    id: 'q-school-supervisor',
    criterion_id: 'crit-school-zone',
    text: 'Dars boshlanishi va tugashida piyodalar patruli/nazoratchi mavjudmi? (SR4S 6.2 Crossing Supervisor)',
    description: 'Maktab mas’ul xodimi yoki YHX inspektorining navbatchiligi.',
    points: 10,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-sup-present', label: 'Dars vaqtlarida navbatchi patrul/nazoratchi bor (Supervisor present)', points: 10 },
      { id: 'opt-sup-none', label: 'Navbatchi patrul mavjud emas (No supervisor)', points: 0 },
    ]),
  },

  // 5. Sidewalks
  {
    id: 'q-sidewalk-presence',
    criterion_id: 'crit-sidewalks',
    text: 'Piyodalar yo‘lakchasi (trotuar) va uning ajratilganligi (SR4S 7.1 Sidewalks)',
    description: 'Bolalarning qatnov qismiga chiqmasdan xavfsiz harakatlanish imkoniyati.',
    points: 10,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-side-barrier', label: 'Xavfsizlik to‘sig‘i/panjarasi ortidagi trotuar (Behind barrier)', points: 10 },
      { id: 'opt-side-separated', label: 'Qatnov qismidan 1m dan ortiq ajratilgan trotuar (Sidewalk ≥1m away)', points: 8 },
      { id: 'opt-side-adjacent', label: 'Qatnov qismiga yondosh trotuar (<1m away)', points: 5 },
      { id: 'opt-side-none', label: 'Piyodalar yo‘lakchasi mavjud emas (No sidewalk)', points: 0 },
    ]),
  },
  {
    id: 'q-sidewalk-quality',
    criterion_id: 'crit-sidewalks',
    text: 'Piyodalar yo‘lakchasining holati va to‘siqlarsizligi (SR4S 7.1 Sidewalk Quality)',
    description: 'Yo‘lakcha tekisligi, suv to‘planmasligi va noqonuniy to‘siqlarning yo‘qligi.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-sidequal-good', label: 'Sifatli, tekis va to‘siqlarsiz (Good quality)', points: 5 },
      { id: 'opt-sidequal-poor', label: 'Nosilliq, to‘siqlar bor yoki chuqur (Poor quality)', points: 0 },
    ]),
  },

  // 6. Pedestrian Crossing
  {
    id: 'q-crossing-type',
    criterion_id: 'crit-pedestrian-crossing',
    text: 'Piyodalar o‘tish joyining turi va inshooti (SR4S 8.1 & 9.1 Pedestrian Crossing Type)',
    description: 'Bolalarning yo‘lni kesib o‘tish ob’ekti jihozlanishi.',
    points: 10,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-crosstype-bridge', label: 'Yer usti ko‘prigi yoki Yer osti o‘tish yo‘li (Bridge or Tunnel)', points: 10 },
      { id: 'opt-crosstype-raised', label: 'Sun’iy notekislik ustiga ko‘tarilgan o‘tish joyi (Raised crossing)', points: 9 },
      { id: 'opt-crosstype-lights', label: 'Svetoforli piyodalar o‘tish joyi (Traffic lights)', points: 8 },
      { id: 'opt-crosstype-refuge', label: 'O‘rtada xavfsizlik orolchasi bor "Zebra" (Refuge island)', points: 7 },
      { id: 'opt-crosstype-marked', label: 'Oddiy belgilangan "Zebra" o‘tish joyi (Marked zebra)', points: 5 },
      { id: 'opt-crosstype-none', label: 'Piyodalar o‘tish joyi mavjud emas (No crossing)', points: 0 },
    ]),
  },
  {
    id: 'q-crossing-quality',
    criterion_id: 'crit-pedestrian-crossing',
    text: 'Piyodalar o‘tish joyining yoritilganligi va ko‘rinishi (SR4S 9.2 Crossing Quality & 5.3 Lighting)',
    description: 'Tungi yoritgichlar va haydovchilar uchun o‘tish joyining ochiq ko‘rinishi.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-crossqual-adequate', label: 'Tungi yoritgichlar bor va ko‘rinish a’lo (Adequate lighting & visibility)', points: 5 },
      { id: 'opt-crossqual-poor', label: 'Yoritilmagan yoki ko‘rinishi cheklangan (Poor visibility/lighting)', points: 0 },
    ]),
  },

  // 7. Speed Management
  {
    id: 'q-speed-limit',
    criterion_id: 'crit-speed-management',
    text: 'Maktab oldidagi ruxsat etilgan maksimal tezlik cheklovi (SR4S 15.1 Posted Speed Limit)',
    description: 'Yo‘l belgisi bo‘yicha belgilangan yuqori tezlik chegarasi.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-speed-30', label: '30 km/soat yoki undan past (30 km/h or less)', points: 5 },
      { id: 'opt-speed-40', label: '40 km/soat (40 km/h)', points: 3 },
      { id: 'opt-speed-50', label: '50 km/soat (50 km/h)', points: 1 },
      { id: 'opt-speed-60plus', label: '60 km/soat va undan yuqori (60 km/h or more)', points: 0 },
    ]),
  },
  {
    id: 'q-speed-calming',
    criterion_id: 'crit-speed-management',
    text: 'Tezlikni pasaytiruvchi sun’iy vositalar (SR4S 15.4 Speed Management)',
    description: 'Sun’iy notekisliklar (lejaщiy politseyskiy), shovqinli chiziqlar va tezlik pasaytirgichlar.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-calm-present', label: 'Sun’iy notekisliklar / shovqinli tasmlar o‘rnatilgan (Speed management present)', points: 5 },
      { id: 'opt-calm-none', label: 'Tezlikni pasaytiruvchi vositalar mavjud emas (Not present)', points: 0 },
    ]),
  },
];

async function updateDatabase(connectionString, dbName) {
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
  });

  try {
    console.log(`Connecting to ${dbName}...`);
    await pool.query('DELETE FROM questions;');
    await pool.query('DELETE FROM criteria;');

    for (const c of SR4S_CRITERIA) {
      await pool.query(
        `INSERT INTO criteria (id, title, description, icon, sort_order, max_score)
         VALUES ($1, $2, $3, $4, $5, $6);`,
        [c.id, c.title, c.description, c.icon, c.sort_order, c.max_score]
      );
    }

    for (const q of SR4S_QUESTIONS) {
      await pool.query(
        `INSERT INTO questions (id, criterion_id, text, description, points, requires_evidence, options)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb);`,
        [q.id, q.criterion_id, q.text, q.description, q.points, q.requires_evidence, q.options]
      );
    }

    console.log(`✅ ${dbName} criteria & questions updated cleanly!`);
  } catch (err) {
    console.error(`Error updating ${dbName}:`, err);
  } finally {
    await pool.end();
  }
}

async function main() {
  await updateDatabase(LOCAL_DATABASE_URL, 'Local PostgreSQL');
  await updateDatabase(NEON_DATABASE_URL, 'Neon Cloud PostgreSQL');
}

main().catch(console.error);
