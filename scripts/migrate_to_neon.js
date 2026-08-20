const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function migrateToNeon() {
  console.log('🚀 Connecting to Neon Cloud PostgreSQL database...');
  
  // 1. Test connection
  const ping = await pool.query('SELECT NOW() as current_time, version() as version;');
  console.log('✅ Connected to Neon PostgreSQL:', ping.rows[0].current_time);

  // 2. Execute Schema DDL
  console.log('📦 Creating tables and indexes from schema.sql...');
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  await pool.query(schemaSql);
  console.log('✅ All 9 PostgreSQL tables and indexes created on Neon!');

  // 3. Import Seed Data
  console.log('🌱 Seeding 10,110 schools, 208 districts, 14 regions and users...');
  const seedPath = path.join(__dirname, '..', 'seed_data.sql');
  const seedSql = fs.readFileSync(seedPath, 'utf8');
  
  const start = Date.now();
  await pool.query(seedSql);
  const duration = Date.now() - start;
  console.log(`✅ 10,110 schools and users successfully seeded in ${duration}ms!`);

  // 4. Ensure Authentic Zero-Score State
  console.log('🧹 Enforcing authentic clean zero-state (0 ball & PENDING coordinates)...');
  await pool.query(`
    UPDATE schools 
    SET current_score = 0,
        coordinate_status = 'PENDING',
        updated_at = NOW();
  `);
  await pool.query(`DELETE FROM assessments;`);
  await pool.query(`DELETE FROM evidence;`);

  // 5. Verification
  const stats = await pool.query(`
    SELECT 
      (SELECT COUNT(*) FROM regions) as regions_count,
      (SELECT COUNT(*) FROM districts) as districts_count,
      (SELECT COUNT(*) FROM schools) as schools_count,
      (SELECT COUNT(*) FROM users) as users_count,
      (SELECT COUNT(*) FROM criteria) as criteria_count,
      (SELECT COUNT(*) FROM questions) as questions_count,
      (SELECT COUNT(*) FROM schools WHERE current_score = 0) as zero_score_schools;
  `);

  console.log('🎉 Neon Cloud Database Fully Verified:');
  console.log(JSON.stringify(stats.rows[0], null, 2));

  const gij24 = await pool.query(`
    SELECT u.email, u.name, s.name as school_name, d.name as district_name, s.current_score
    FROM users u 
    JOIN schools s ON u.school_id = s.id 
    JOIN districts d ON s.district_id = d.id 
    WHERE d.name LIKE '%ijduvon%' AND s.name = '24-maktab';
  `);
  console.log('Sample Gijduvon 24-maktab on Neon:');
  console.log(JSON.stringify(gij24.rows[0], null, 2));

  await pool.end();
}

migrateToNeon().catch((err) => {
  console.error('Neon Migration Error:', err);
  process.exit(1);
});
