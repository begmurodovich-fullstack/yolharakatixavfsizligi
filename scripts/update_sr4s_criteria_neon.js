const { Pool } = require('pg');

const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const LOCAL_DATABASE_URL = 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db';

const SR4S_CRITERIA = [
  {
    id: 'crit-road-env',
    title: 'Yerda foydalanish va hudud parametrlari',
    description: 'Yerda foydalanish turi (chap/o‘ng), hudud turi, avtoturargoh va ko‘rinish masofasi',
    icon: 'Building2',
    sort_order: 1,
    max_score: 15,
  },
  {
    id: 'crit-road-type',
    title: 'Tasmalar, yo‘l holati va tutqich',
    description: 'Tasmalar soni, tasma kengligi, tebranish tasmachalari, yo‘l holati, tutqich va baho (nishablik)',
    icon: 'Gauge',
    sort_order: 2,
    max_score: 15,
  },
  {
    id: 'crit-median-features',
    title: 'Qatnov qismi va yo‘lning o‘rtasi',
    description: 'Qatnov qismi turi, yo‘lning o‘rtasi (metall/beton to‘siq), chiziqlar, belgilar va ko‘cha yoritgichi',
    icon: 'Split',
    sort_order: 3,
    max_score: 15,
  },
  {
    id: 'crit-school-zone',
    title: 'Maktab ogohlantirish belgisi va trotuarlar',
    description: 'Maktab haqida ogohlantirish belgisi, piyodalar yo‘lagi (chap/o‘ng), chetki tasma kengligi va panjaralar',
    icon: 'ShieldAlert',
    sort_order: 4,
    max_score: 15,
  },
  {
    id: 'crit-pedestrian-crossing',
    title: 'Piyodalar o‘tish joyi va oqimlar',
    description: 'Asosiy va tutashma yo‘lni kesib o‘tish, o‘tish sifati, kunlik avtomobillar hamda o‘tish oqimi',
    icon: 'Route',
    sort_order: 5,
    max_score: 15,
  },
  {
    id: 'crit-intersections-curves',
    title: 'Kesishuv (Chorraha) va egri chiziqlar',
    description: 'Kesishuv turi, chorraha sifati, egri chiziq turi va egri chiziq sifati',
    icon: 'GitFork',
    sort_order: 6,
    max_score: 10,
  },
  {
    id: 'crit-speed-management',
    title: 'Tezlik cheklovi va tezlikni boshqarish',
    description: 'Tezlik cheklovi, ishchi tezlik va tezlikni boshqarish (sun’iy notekisliklar)',
    icon: 'Zap',
    sort_order: 7,
    max_score: 15,
  },
];

const SR4S_QUESTIONS = [
  // 1. Yerda foydalanish va hudud parametrlari
  {
    id: 'q-land-use-left-right',
    criterion_id: 'crit-road-env',
    text: 'Yerda foydalanish turi (chap va o‘ng tomonda):',
    description: 'Yo‘l atroflarida joylashgan inshootlar va ob’ektlar turi.',
    points: 4,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-land-school', label: 'Aholi punkti va maktab hududi', points: 4 },
      { id: 'opt-land-shops', label: 'Do‘konlar va tijorat ob’ektlari', points: 3 },
      { id: 'opt-land-open', label: 'Ochiq va rivojlanmagan hudud', points: 1 },
    ]),
  },
  {
    id: 'q-area-type',
    criterion_id: 'crit-road-env',
    text: 'Hudud turi:',
    description: 'Yo‘l o‘tadigan hududning umumiy joylashuv turi.',
    points: 3,
    requires_evidence: false,
    options: JSON.stringify([
      { id: 'opt-area-urban', label: 'Shahar markazi / Shahar hududi', points: 3 },
      { id: 'opt-area-suburban', label: 'Shahar cheti / Qishloq hududi', points: 2 },
    ]),
  },
  {
    id: 'q-parking',
    criterion_id: 'crit-road-env',
    text: 'Avtoturargoh (Yo‘l cheti to‘xtash joyi):',
    description: 'Yo‘l chetidagi avtoturargohlar mavjudligi.',
    points: 4,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-park-none', label: 'Yo‘q (Parking yo‘q)', points: 4 },
      { id: 'opt-park-oneside', label: 'Bir tomonda bor', points: 2 },
      { id: 'opt-park-twosides', label: 'Ikki tomonda bor', points: 1 },
    ]),
  },
  {
    id: 'q-sight-distance',
    criterion_id: 'crit-road-env',
    text: 'Ko‘rinish masofasi:',
    description: 'Haydovchilar uchun piyodalarni ko‘rish masofasining yetarliligi.',
    points: 4,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-sight-good', label: 'Yaxshi (Yetarli va ochiq ko‘rinish)', points: 4 },
      { id: 'opt-sight-bad', label: 'Yomon (Cheklangan yoki to‘silgan ko‘rinish)', points: 0 },
    ]),
  },

  // 2. Tasmalar, yo‘l holati va tutqich
  {
    id: 'q-lanes-count-width',
    criterion_id: 'crit-road-type',
    text: 'Tasmalar (Harakat bo‘laklari) soni va kengligi:',
    description: 'Yo‘lning harakatlanish bo‘laklari o‘lchami va soni.',
    points: 4,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-lanes-2to4', label: '2-4 ta tasma (Kengligi 3.25m - 3.75m)', points: 4 },
      { id: 'opt-lanes-5plus', label: '5 ta va undan ko‘p tasmalar', points: 2 },
    ]),
  },
  {
    id: 'q-rumble-stripes',
    criterion_id: 'crit-road-type',
    text: 'Tebranish tasmachalari (Shovqinli chiziqlar):',
    description: 'Yo‘l chetidagi tebranish hosil qiluvchi tasmlar.',
    points: 3,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-rumble-yes', label: 'Bor (Shovqinli tasmalar mavjud)', points: 3 },
      { id: 'opt-rumble-no', label: 'Yo‘q', points: 0 },
    ]),
  },
  {
    id: 'q-road-condition-grip',
    criterion_id: 'crit-road-type',
    text: 'Yo‘l holati va Tutqich (Ilashuv darajasi):',
    description: 'Asfalt holati va tormozlanish ilashishi.',
    points: 4,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-road-good', label: 'Yaxshi va yetarli ilashuvga ega', points: 4 },
      { id: 'opt-road-medium', label: 'O‘rtacha / Ta’mirtalab', points: 2 },
      { id: 'opt-road-bad', label: 'Yomon / Chuqurchalar bor', points: 0 },
    ]),
  },
  {
    id: 'q-road-grade',
    criterion_id: 'crit-road-type',
    text: 'Baho (Yo‘l nishabligi):',
    description: 'Yo‘lning baland-pastligi va nishablik darajasi.',
    points: 4,
    requires_evidence: false,
    options: JSON.stringify([
      { id: 'opt-grade-flat', label: 'Tekis yo‘l', points: 4 },
      { id: 'opt-grade-slope', label: 'Nishablik / Tik yo‘l', points: 1 },
    ]),
  },

  // 3. Qatnov qismi va yo‘lning o‘rtasi
  {
    id: 'q-carriageway-type',
    criterion_id: 'crit-median-features',
    text: 'Qatnov qismi turi:',
    description: 'Yo‘lning ajratilgan yoki ajratilmaganligi.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-cway-divided', label: 'Ajratilgan qatnov qismi', points: 5 },
      { id: 'opt-cway-undivided', label: 'Ajratilmagan qatnov qismi', points: 2 },
    ]),
  },
  {
    id: 'q-median-divider',
    criterion_id: 'crit-median-features',
    text: 'Yo‘lning o‘rtasi (Ajratgich to‘siqlar):',
    description: 'Qarama-qarshi oqimlarni ajratuvchi metall/beton to‘siqlar.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-med-metal', label: 'Metall to‘siq', points: 5 },
      { id: 'opt-med-concrete', label: 'Beton to‘siq', points: 5 },
      { id: 'opt-med-lines', label: 'Qo‘sh chiziq', points: 3 },
      { id: 'opt-med-none', label: 'Yo‘q', points: 0 },
    ]),
  },
  {
    id: 'q-lines-signs-lighting',
    criterion_id: 'crit-median-features',
    text: 'Chiziqlar, belgilar va ko‘cha yoritgichi:',
    description: 'Yo‘l chiziqlari, belgilari va ko‘cha chiroqlari.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-lines-good', label: 'Qoniqarli bor va ko‘cha yoritgichlari ishlaydi', points: 5 },
      { id: 'opt-lines-bad', label: 'Qoniqarsiz bor yoki yoritgichlar yo‘q', points: 1 },
    ]),
  },

  // 4. Maktab ogohlantirish belgisi va trotuarlar
  {
    id: 'q-school-sign-presence',
    criterion_id: 'crit-school-zone',
    text: 'Maktab haqida ogohlantirish belgisi:',
    description: 'Maktab zonasi belgilari va chiziqlarining borligi.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-schsign-yes', label: 'Bor (1.21 "Bolalar" va tezlik belgilari o‘rnatilgan)', points: 5 },
      { id: 'opt-schsign-no', label: 'Yo‘q', points: 0 },
    ]),
  },
  {
    id: 'q-sidewalk-both-sides',
    criterion_id: 'crit-school-zone',
    text: 'Piyodalar yo‘lagi (chap va o‘ng tomonda):',
    description: 'Ikki tomonda trotuarning mavjudligi.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-walk-both', label: 'Tratuar bor (Ikki tomonda ham sifatli)', points: 5 },
      { id: 'opt-walk-one', label: 'Faqat bir tomonda tratuar bor', points: 3 },
      { id: 'opt-walk-none', label: 'Yo‘q', points: 0 },
    ]),
  },
  {
    id: 'q-road-edge-channelization',
    criterion_id: 'crit-school-zone',
    text: 'Chetki tasma kengligi va Piyodalar uchun panjaralar:',
    description: 'Yo‘l yoqasidagi chetki tasma o‘lchami (0.75m) va yo‘naltiruvchi panjaralar.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-edge-good', label: 'Chetki tasma kengligi yetarli va panjaralar o‘rnatilgan', points: 5 },
      { id: 'opt-edge-part', label: 'Chetki tasma bor (0.75m), lekin panjara yo‘q', points: 3 },
      { id: 'opt-edge-none', label: 'Chetki tasma va panjara yo‘q', points: 0 },
    ]),
  },

  // 5. Piyodalar o‘tish joyi va oqimlar
  {
    id: 'q-crossing-main-side',
    criterion_id: 'crit-pedestrian-crossing',
    text: 'Asosiy va tutashma yo‘lni kesib o‘tish joyi:',
    description: 'Piyodalar o‘tish joyining borligi.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-cross-both', label: 'Asosiy yo‘lda ham, tutashma yo‘lda ham bor', points: 5 },
      { id: 'opt-cross-mainonly', label: 'Faqat asosiy yo‘lni kesib o‘tish bor', points: 4 },
      { id: 'opt-cross-none', label: 'Yo‘q', points: 0 },
    ]),
  },
  {
    id: 'q-crossing-quality-flow',
    criterion_id: 'crit-pedestrian-crossing',
    text: 'O‘tish sifati va o‘tish oqimi:',
    description: 'Piyodalar o‘tish joyining sifati (Qoniqarli/Yomon) va oqim darajasi.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-cqual-good', label: 'Qoniqarli (Yuqori oqimda xavfsiz va aniq belgilangan)', points: 5 },
      { id: 'opt-cqual-bad', label: 'Yomon (Tushnarsiz yoki ta’mirtalab)', points: 1 },
    ]),
  },
  {
    id: 'q-traffic-flow-daily',
    criterion_id: 'crit-pedestrian-crossing',
    text: 'Avtomobillar / kunlik intensivlik:',
    description: 'Kun davomida yo‘ldan o‘tuvchi avtomobillar soni.',
    points: 5,
    requires_evidence: false,
    options: JSON.stringify([
      { id: 'opt-flow-high', label: '10 000 dan ko‘p (Yuqori oqim)', points: 5 },
      { id: 'opt-flow-med', label: '5 000 - 10 000 (O‘rtacha oqim)', points: 3 },
      { id: 'opt-flow-low', label: '5 000 dan kam (Past oqim)', points: 2 },
    ]),
  },

  // 6. Kesishuv (Chorraha) va egri chiziqlar
  {
    id: 'q-intersection-type-quality',
    criterion_id: 'crit-intersections-curves',
    text: 'Kesishuv (Chorraha) turi va sifati:',
    description: 'T-simon tutashma, 4 tomonlama chorraha va chorraha sifati.',
    points: 5,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-int-good', label: '4 tomonlama / T-simon chorraha (Qoniqarli holatda)', points: 5 },
      { id: 'opt-int-noint', label: 'Chorraha emas (To‘g‘ri yo‘l)', points: 4 },
      { id: 'opt-int-bad', label: 'Chorraha sifati qoniqarsiz', points: 1 },
    ]),
  },
  {
    id: 'q-curve-type-quality',
    criterion_id: 'crit-intersections-curves',
    text: 'Egri chiziq (Burilish) turi va sifati:',
    description: 'Yo‘lning to‘g‘ri yoki burilishliligi hamda sifat ko‘rsatkichi.',
    points: 5,
    requires_evidence: false,
    options: JSON.stringify([
      { id: 'opt-curve-straight', label: 'To‘g‘ri yo‘l (Burilishlarsiz)', points: 5 },
      { id: 'opt-curve-good', label: 'Burilish bor (Qoniqarli sifatda)', points: 3 },
      { id: 'opt-curve-bad', label: 'Xavfli burilish (Yomon va belgisiz)', points: 0 },
    ]),
  },

  // 7. Tezlik cheklovi va tezlikni boshqarish
  {
    id: 'q-speed-limit-operating',
    criterion_id: 'crit-speed-management',
    text: 'Tezlik cheklovi va Ishchi tezlik:',
    description: 'Yo‘l belgisidagi cheklov (30 km/s) va amaldagi harakat tezligi.',
    points: 8,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-speed-30safe', label: 'Tezlik cheklovi 30 km/s (Ishchi tezlik mos keladi)', points: 8 },
      { id: 'opt-speed-50med', label: 'Tezlik cheklovi 50 km/s', points: 4 },
      { id: 'opt-speed-60high', label: 'Tezlik cheklovi 60+ km/s (Yuqori tezlik)', points: 0 },
    ]),
  },
  {
    id: 'q-speed-management-calming',
    criterion_id: 'crit-speed-management',
    text: 'Tezlikni boshqarish (Sun’iy notekisliklar):',
    description: 'Sun’iy notekisliklar (lejaщiy politseyskiy) va shovqinli chiziqlar.',
    points: 7,
    requires_evidence: true,
    options: JSON.stringify([
      { id: 'opt-calm-yes', label: 'Bor (Sun’iy notekislik o‘rnatilgan)', points: 7 },
      { id: 'opt-calm-no', label: 'Yo‘q', points: 0 },
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

    console.log(`✅ ${dbName} checklist criteria & questions updated cleanly!`);
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
