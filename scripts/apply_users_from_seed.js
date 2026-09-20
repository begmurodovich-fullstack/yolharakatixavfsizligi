const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
});

async function main() {
  console.log('Reading seed_data.sql...');
  const seedPath = path.join(__dirname, '..', 'seed_data.sql');
  const content = fs.readFileSync(seedPath, 'utf8');

  // Find all INSERT INTO users blocks
  const parts = content.split('INSERT INTO users');
  console.log(`Found ${parts.length - 1} user INSERT blocks in seed_data.sql.`);

  console.log('Connecting to Neon...');
  await pool.query('SELECT 1;');

  for (let i = 1; i < parts.length; i++) {
    const insertSql = 'INSERT INTO users ' + parts[i].split(';\n')[0] + ';';
    await pool.query(insertSql);
    console.log(`Executed block ${i} / ${parts.length - 1}`);
  }

  console.log('✅ ALL USERS FROM SEED_DATA.SQL APPLIED TO NEON!');

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

main().catch(console.error);
