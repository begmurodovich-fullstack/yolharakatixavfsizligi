const fs = require('fs');
const path = require('path');

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.toString().replace(/'/g, "''")}'`;
}

function cleanText(text) {
  if (!text) return '';
  return text.toString().trim();
}

function toLatinSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[ʻʼ`']/g, '')
    .replace(/_tumani|_shahar|_shahri/g, '')
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

async function main() {
  const jsonPath = path.join(__dirname, '..', 'schools.json');
  console.log('Reading schools.json from:', jsonPath);

  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const items = JSON.parse(rawData);

  console.log(`Total schools in JSON: ${items.length}`);

  const regionsMap = new Map();
  const districtsMap = new Map();

  let regCounter = 1;
  let distCounter = 1;

  items.forEach((item) => {
    const regName = cleanText(item.viloyat) || 'Boshqa hudud';
    const distName = cleanText(item.tuman) || 'Boshqa tuman';

    if (!regionsMap.has(regName)) {
      const regId = `reg-${regCounter++}`;
      regionsMap.set(regName, { id: regId, name: regName });
    }

    const reg = regionsMap.get(regName);
    const distKey = `${regName}___${distName}`;

    if (!districtsMap.has(distKey)) {
      const distId = `dist-${distCounter++}`;
      districtsMap.set(distKey, { id: distId, regionId: reg.id, name: distName });
    }
  });

  let sql = `-- ============================================================================
-- UZBEKISTAN SCHOOL ROAD SAFETY PLATFORM - SEED DATA SCRIPT
-- Generated for ${items.length} schools across Uzbekistan
-- ============================================================================

ROLLBACK;

ALTER TABLE IF EXISTS regions ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS regions ALTER COLUMN name TYPE VARCHAR(255);
ALTER TABLE IF EXISTS districts ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS districts ALTER COLUMN region_id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS districts ALTER COLUMN name TYPE VARCHAR(255);
ALTER TABLE IF EXISTS schools ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS schools ALTER COLUMN region_id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS schools ALTER COLUMN district_id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS users ALTER COLUMN id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS users ALTER COLUMN email TYPE VARCHAR(255);
ALTER TABLE IF EXISTS users ALTER COLUMN school_id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS users ALTER COLUMN region_id TYPE VARCHAR(100);
ALTER TABLE IF EXISTS users ALTER COLUMN district_id TYPE VARCHAR(100);

BEGIN;

-- 1. INSERT DEFAULT SUPER ADMIN & ADMIN
INSERT INTO users (id, email, password_hash, name, role, is_first_login, is_active)
VALUES 
  ('usr-super-admin', 'superadmin@yhxx.uz', 'Super@1234', 'Bosh Administrator (IIV YHXX)', 'SUPER_ADMIN', FALSE, TRUE),
  ('usr-inspector-admin', 'admin@yhxx.uz', 'Admin@1234', 'Hududiy Inspektor', 'ADMIN', FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 2. INSERT 8 SAFETY CRITERIA
INSERT INTO criteria (id, title, description, icon, sort_order, max_score)
VALUES
  ('crit-1', 'Piyodalar o‘tish joyi va yo‘l belgilari', 'Maktab oldidagi yo‘l chiziqlari, piyodalar o‘tish joyi (zebra) va 5.19.1/5.19.2 yo‘l belgilarining holati', 'Footprints', 1, 15),
  ('crit-2', 'Tezlikni cheklovchi vositalar', '30 km/soat tezlikni cheklovchi yo‘l belgilari va sun’iy yo‘l notekisliklari (yotiq politsiyachi) mavjudligi', 'Gauge', 2, 15),
  ('crit-3', 'Tashqi yoritish va ko‘rinuvchanlik', 'Tungi va qorong‘i vaqtda maktab atrofi, piyodalar yo‘lagi va chorrahalarning yoritilganlik darajasi', 'Car', 3, 10),
  ('crit-4', 'Piyodalar xavfsizlik to‘siqlari', 'Bolalarning to‘g‘ridan-to‘g‘ri qatnov qismiga yugurib chiqib ketishining oldini oluvchi metall to‘siqlar', 'Fence', 4, 15),
  ('crit-5', 'Yo‘l harakati xavfsizligi burchagi va xona', 'Maktab binosida YHQ o‘quv xonasi yoki ko‘rgazmali xavfsizlik stendlari mavjudligi', 'GraduationCap', 5, 10),
  ('crit-6', 'Xavfsiz harakatlanish sxemasi (Marshrut)', 'O‘quvchilar uchun "Uy–Maktab–Uy" xavfsiz harakatlanish sxemasining ishlab chiqilganligi', 'Route', 6, 15),
  ('crit-7', 'Jamoat va ota-onalar nazorati (Patrul)', 'Dars boshlanishi va tugash vaqtida YHQ inspektorlari, navbatchi o‘qituvchilar va ota-onalar patruli', 'Users', 7, 10),
  ('crit-8', 'Bolalarni tushirish/chiqarish (Drop-off) xavfsiz hududi', 'Maktab oldida avtomobillar tiqilinchini oldini oluvchi maxsus xavfsiz to‘xtash joyi', 'ShieldAlert', 8, 10)
ON CONFLICT (id) DO NOTHING;

-- 3. INSERT 17 QUESTIONS
INSERT INTO questions (id, criterion_id, text, description, points, requires_evidence, options)
VALUES
  ('q1_1', 'crit-1', 'Maktab oldida piyodalar o‘tish joyi (zebra) chizig‘i mavjudmi?', 'Yo‘l qoplamasida sariq-oq yoki oq chiziqlarning ko‘rinish holati', 8, TRUE, '[{"id":"opt_1_1_a","label":"To‘liq va aniq ko‘rinadi","points":8},{"id":"opt_1_1_b","label":"Qisman o‘chgan","points":4},{"id":"opt_1_1_c","label":"Mavjud emas","points":0}]'::jsonb),
  ('q1_2', 'crit-1', '5.19.1 va 5.19.2 "Piyodalar o‘tish joyi" yo‘l belgilari o‘rnatilganmi?', 'Yo‘lning ikkala tomonida standart belgilar mavjudligi', 7, TRUE, '[{"id":"opt_1_2_a","label":"Ikkala tomonda mavjud","points":7},{"id":"opt_1_2_b","label":"Faqat bir tomonda","points":3},{"id":"opt_1_2_c","label":"Mavjud emas","points":0}]'::jsonb),
  ('q2_1', 'crit-2', '3.24 "Tezlik cheklangan (30 km/soat)" yo‘l belgisi o‘rnatilganmi?', 'Maktab hududiga kirishdan kamida 50 metr oldin o‘rnatilgan bo‘lishi lozim', 7, FALSE, '[{"id":"opt_2_1_a","label":"Standart bo‘yicha o‘rnatilgan","points":7},{"id":"opt_2_1_b","label":"Mavjud emas","points":0}]'::jsonb),
  ('q2_2', 'crit-2', 'Sun’iy yo‘l notekisligi (yotiq politsiyachi) mavjudmi?', 'Transport vositalari tezligini majburiy pasaytiruvchi moslama', 8, TRUE, '[{"id":"opt_2_2_a","label":"Mavjud va talabga javob beradi","points":8},{"id":"opt_2_2_b","label":"Ta’mirtalab","points":3},{"id":"opt_2_2_c","label":"Mavjud emas","points":0}]'::jsonb),
  ('q3_1', 'crit-3', 'Maktab darvozasi va piyodalar o‘tish joyi tungi vaqtda yoritiladimi?', 'Tungi va qorong‘i vaqtda piyodalarni aniq ko‘rish imkoniyati', 10, FALSE, '[{"id":"opt_3_1_a","label":"To‘liq yoritilgan","points":10},{"id":"opt_3_1_b","label":"Qisman yoritilgan","points":5},{"id":"opt_3_1_c","label":"Yoritish mavjud emas","points":0}]'::jsonb),
  ('q4_1', 'crit-4', 'Piyodalar yo‘lakchasi bo‘ylab himoya to‘siqlari (panjara) o‘rnatilganmi?', 'Bolalarning qatnov qismiga tasodifan chiqib ketishini to‘suvchi metall panjaralar', 15, TRUE, '[{"id":"opt_4_1_a","label":"Kamida 50 metr masofada o‘rnatilgan","points":15},{"id":"opt_4_1_b","label":"Qisman o‘rnatilgan","points":7},{"id":"opt_4_1_c","label":"Mavjud emas","points":0}]'::jsonb),
  ('q5_1', 'crit-5', 'Maktabda "Yo‘l harakati qoidalari" maxsus xonasi yoki burchagi mavjudmi?', 'Ko‘rgazmali qurollar, svetofor maketlari va yo‘l belgilari bilan jihozlangan burchak', 10, FALSE, '[{"id":"opt_5_1_a","label":"Alohida jihozlangan xona mavjud","points":10},{"id":"opt_5_1_b","label":"Faqat burchak/stend mavjud","points":5},{"id":"opt_5_1_c","label":"Mavjud emas","points":0}]'::jsonb),
  ('q6_1', 'crit-6', '"Uy–Maktab–Uy" xavfsiz harakatlanish marshruti ishlab chiqilganmi?', 'Barcha sinf o‘quvchilari uchun kundalikka yopishtirilgan xavfsiz yo‘l xaritasi', 15, FALSE, '[{"id":"opt_6_1_a","label":"Barcha o‘quvchilarga tarqatilgan va tasdiqlangan","points":15},{"id":"opt_6_1_b","label":"Faqat boshlang‘ich sinflarda mavjud","points":8},{"id":"opt_6_1_c","label":"Mavjud emas","points":0}]'::jsonb),
  ('q7_1', 'crit-7', 'Dars boshlanishi va tugash vaqtida navbatchilik tashkil etilganmi?', 'YHQ inspektori yoki ota-onalar patruli tomonidan harakatni tartibga solish', 10, FALSE, '[{"id":"opt_7_1_a","label":"Doimiy navbatchilik mavjud","points":10},{"id":"opt_7_1_b","label":"Faqat ertalab navbatchilik bor","points":5},{"id":"opt_7_1_c","label":"Navbatchilik yo‘q","points":0}]'::jsonb),
  ('q8_1', 'crit-8', 'Avtomobillardan bolalarni xavfsiz tushirish uchun "Kiss & Ride" hududi mavjudmi?', 'Piyodalar harakatiga xalaqit bermaydigan to‘xtash maydoni', 10, FALSE, '[{"id":"opt_8_1_a","label":"Maxsus ajratilgan xavfsiz joy bor","points":10},{"id":"opt_8_1_b","label":"Qatnov qismida to‘xtatiladi","points":3},{"id":"opt_8_1_c","label":"Sharoit yo‘q","points":0}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 4. INSERT REGIONS
INSERT INTO regions (id, name)
VALUES
${Array.from(regionsMap.values())
  .map((r) => `  (${escapeSql(r.id)}, ${escapeSql(r.name)})`)
  .join(',\n')}
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 5. INSERT DISTRICTS
INSERT INTO districts (id, region_id, name)
VALUES
${Array.from(districtsMap.values())
  .map((d) => `  (${escapeSql(d.id)}, ${escapeSql(d.regionId)}, ${escapeSql(d.name)})`)
  .join(',\n')}
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, region_id = EXCLUDED.region_id;
`;

  const usedEmails = new Set();
  const schoolRows = [];
  const userRows = [];

  items.forEach((item, index) => {
    const regName = cleanText(item.viloyat) || 'Boshqa hudud';
    const distName = cleanText(item.tuman) || 'Boshqa tuman';
    const schoolRawName = cleanText(item.muassasa) || `${index + 1}-maktab`;

    const reg = regionsMap.get(regName);
    const dist = districtsMap.get(`${regName}___${distName}`);

    const schoolId = `sch-${index + 1}`;
    const userId = `usr-sch-${index + 1}`;

    const numMatch = schoolRawName.match(/\d+/);
    const schoolNumber = numMatch ? numMatch[0] : `${index + 1}`;
    const formattedSchoolName = schoolRawName.includes('maktab')
      ? schoolRawName
      : `${schoolRawName}-maktab`;

    // Clean human-friendly email: e.g. maktab24.gijduvon@maktab.uz
    const cleanDist = toLatinSlug(distName) || 'hudud';
    let email = `maktab_${schoolNumber}_${cleanDist}@maktab.uz`;
    if (usedEmails.has(email)) {
      email = `maktab_${schoolNumber}_${cleanDist}_${index + 1}@maktab.uz`;
    }
    usedEmails.add(email);

    const initialPassword = `Maktab@${schoolNumber}`;

    schoolRows.push(
      `(${escapeSql(schoolId)}, ${escapeSql(schoolNumber)}, ${escapeSql(
        formattedSchoolName
      )}, ${escapeSql(reg.id)}, ${escapeSql(dist.id)}, 'Direktor F.I.Sh.', 750, 40.1032, 64.6756, 'Asosiy kirish darvozasi', 'PENDING', 0, 'ACTIVE')`
    );

    userRows.push(
      `(${escapeSql(userId)}, ${escapeSql(email)}, ${escapeSql(
        initialPassword
      )}, ${escapeSql(formattedSchoolName + ' Mas’uli')}, 'SCHOOL_USER', ${escapeSql(
        schoolId
      )}, ${escapeSql(reg.id)}, ${escapeSql(dist.id)}, TRUE, TRUE)`
    );
  });

  const CHUNK_SIZE = 500;

  for (let i = 0; i < schoolRows.length; i += CHUNK_SIZE) {
    const chunk = schoolRows.slice(i, i + CHUNK_SIZE);
    sql += `\nINSERT INTO schools (id, school_number, name, region_id, district_id, director_name, student_count, latitude, longitude, address_notes, coordinate_status, current_score, status)
VALUES
${chunk.join(',\n')}
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, region_id = EXCLUDED.region_id, district_id = EXCLUDED.district_id;\n`;
  }

  for (let i = 0; i < userRows.length; i += CHUNK_SIZE) {
    const chunk = userRows.slice(i, i + CHUNK_SIZE);
    sql += `\nINSERT INTO users (id, email, password_hash, name, role, school_id, region_id, district_id, is_first_login, is_active)
VALUES
${chunk.join(',\n')}
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash;\n`;
  }

  sql += `\nCOMMIT;\n`;

  const outputPath = path.join(__dirname, '..', 'seed_data.sql');
  fs.writeFileSync(outputPath, sql, 'utf8');

  console.log(`✅ Generated seed_data.sql with human-friendly emails!`);
}

main().catch(console.error);
