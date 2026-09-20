const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
});

function cleanSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/[ʻ’ʼ`'‘]/g, '')
    .replace(/viloyati|viloyat|respublikasi|respublika/g, '')
    .replace(/shahri|shahar/g, 'shahar')
    .replace(/tumani|tuman/g, '')
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

async function runWithRetry(fn, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      console.log(`Attempt ${i + 1} failed: ${e.message}. Retrying in 2s...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function updateEmailsFast() {
  console.log('Connecting to Neon PostgreSQL with retry/wake up...');
  
  // 1. Wake up Neon
  await runWithRetry(async () => {
    const ping = await pool.query('SELECT NOW() as t;');
    console.log('✅ Neon is active and awake:', ping.rows[0].t);
  });

  const res = await pool.query(`
    SELECT u.id as user_id, s.school_number, r.name as reg_name, d.name as dist_name
    FROM users u
    JOIN schools s ON u.school_id = s.id
    JOIN districts d ON s.district_id = d.id
    JOIN regions r ON s.region_id = r.id;
  `);

  console.log(`Fetched ${res.rows.length} school users from Neon.`);

  const used = new Map();
  const updates = [];

  for (const row of res.rows) {
    const reg = cleanSlug(row.reg_name) || 'viloyat';
    const dist = cleanSlug(row.dist_name) || 'tuman';
    const num = row.school_number || '1';
    const baseEmail = `maktab_${num}_${reg}_${dist}@maktab.uz`;
    let email = baseEmail;

    if (used.has(baseEmail)) {
      const count = used.get(baseEmail) + 1;
      used.set(baseEmail, count);
      email = `maktab_${num}_${reg}_${dist}_${count}@maktab.uz`;
    } else {
      used.set(baseEmail, 1);
    }

    const initialPassword = `Maktab@${num}`;
    updates.push({ id: row.user_id, email, password_hash: initialPassword });
  }

  console.log('Beginning batch updates in chunks of 500...');
  const CHUNK_SIZE = 500;
  for (let i = 0; i < updates.length; i += CHUNK_SIZE) {
    const chunk = updates.slice(i, i + CHUNK_SIZE);
    const valuesList = chunk.map(u => `('${u.id}', '${u.email}', '${u.password_hash}')`).join(',');
    const sql = `
      UPDATE users as u
      SET email = v.email, password_hash = v.password_hash
      FROM (VALUES ${valuesList}) as v(id, email, password_hash)
      WHERE u.id = v.id;
    `;
    await pool.query(sql);
    console.log(`Updated ${Math.min(i + CHUNK_SIZE, updates.length)} / ${updates.length}`);
  }

  // Super Admin & Admin
  await pool.query(`
    INSERT INTO users (id, email, password_hash, name, role, is_first_login, is_active)
    VALUES 
      ('usr-super-admin', 'superadmin@yhxx.uz', 'Super@1234', 'Bosh Administrator (IIV YHXX)', 'SUPER_ADMIN', FALSE, TRUE),
      ('usr-inspector-admin', 'admin@yhxx.uz', 'Admin@1234', 'Hududiy Inspektor', 'ADMIN', FALSE, TRUE)
    ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash;
  `);

  console.log('✅ ALL USERS ON NEON UPDATED SUCCESSFULLY!');

  const samples = await pool.query(`
    SELECT u.email, u.password_hash, s.name as school_name, d.name as district_name, r.name as region_name
    FROM users u
    JOIN schools s ON u.school_id = s.id
    JOIN districts d ON s.district_id = d.id
    JOIN regions r ON s.region_id = r.id
    WHERE (d.name ILIKE '%Qiziltepa%' AND s.school_number = '1')
       OR (d.name ILIKE '%ijduvon%' AND s.school_number = '24')
       OR (d.name ILIKE '%Samarqand%' AND s.school_number = '1')
    LIMIT 6;
  `);

  console.log('\n--- VERIFIED NEON USERS ---');
  samples.rows.forEach((s, idx) => {
    console.log(`${idx + 1}. ${s.region_name} -> ${s.district_name} (${s.school_name})`);
    console.log(`   Email: ${s.email}`);
    console.log(`   Parol: ${s.password_hash}`);
  });

  await pool.end();
}

updateEmailsFast().catch(console.error);
