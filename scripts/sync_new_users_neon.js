const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  console.log('🚀 Updating Neon Cloud PostgreSQL database with new email format...');
  const seedPath = path.join(__dirname, '..', 'seed_data.sql');
  const seedSql = fs.readFileSync(seedPath, 'utf8');

  const start = Date.now();
  await pool.query(seedSql);
  const duration = Date.now() - start;
  console.log(`✅ Seed SQL executed successfully in ${duration}ms!`);

  // Verify sample schools
  const samples = await pool.query(`
    SELECT u.email, u.password_hash, u.name, s.name as school_name, d.name as district_name, r.name as region_name
    FROM users u
    JOIN schools s ON u.school_id = s.id
    JOIN districts d ON s.district_id = d.id
    JOIN regions r ON s.region_id = r.id
    WHERE (d.name ILIKE '%Qiziltepa%' AND s.school_number = '1')
       OR (d.name ILIKE '%ijduvon%' AND s.school_number = '24')
       OR (d.name ILIKE '%Samarqand%' AND s.school_number = '1')
    LIMIT 10;
  `);

  console.log('\n--- VERIFIED NEON USER ACCOUNTS ---');
  samples.rows.forEach((row, i) => {
    console.log(`${i+1}. ${row.region_name} -> ${row.district_name} (${row.school_name})`);
    console.log(`   Login (Email): ${row.email}`);
    console.log(`   Parol: ${row.password_hash}`);
    console.log('');
  });

  await pool.end();
}

main().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
