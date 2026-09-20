const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function setDinara() {
  await pool.query("UPDATE users SET password_hash = 'dinara2002' WHERE school_id = 'sch-3837';");
  console.log('✅ Password set to dinara2002 for Qiziltepa 24-maktab');
  
  const check = await pool.query(`
    SELECT u.email, u.password_hash, u.is_first_login, s.name, s.director_name, s.latitude, s.longitude, s.current_score
    FROM users u
    JOIN schools s ON u.school_id = s.id
    WHERE s.id = 'sch-3837';
  `);
  console.log('Verified state:', check.rows[0]);
  await pool.end();
}

setDinara().catch(console.error);
