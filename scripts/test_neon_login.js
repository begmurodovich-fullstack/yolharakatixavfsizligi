const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function checkLogins() {
  const admins = await pool.query("SELECT email, password_hash, role FROM users WHERE role IN ('SUPER_ADMIN', 'ADMIN')");
  console.log('Admin accounts in Neon:', admins.rows);

  const sampleSchools = await pool.query("SELECT email, password_hash, name, is_first_login FROM users WHERE school_id IS NOT NULL LIMIT 5");
  console.log('Sample school accounts in Neon:', sampleSchools.rows);

  await pool.end();
}

checkLogins().catch(console.error);
