const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_KyZTrp7XQ8xl@ep-spring-snow-azgi3kt1.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function checkQiziltepa24() {
  const res = await pool.query(`
    SELECT u.id as user_id, u.email, u.password_hash, u.is_first_login, 
           s.id as school_id, s.school_number, s.name as school_name, 
           s.director_name, s.student_count, s.latitude, s.longitude, 
           s.address_notes, s.coordinate_status, s.current_score
    FROM schools s
    LEFT JOIN users u ON u.school_id = s.id
    JOIN districts d ON s.district_id = d.id
    JOIN regions r ON s.region_id = r.id
    WHERE d.name ILIKE '%Qiziltepa%' AND (s.school_number = '24' OR s.name ILIKE '%24%');
  `);

  console.log('Qiziltepa 24-maktab Current DB Record:');
  console.log(JSON.stringify(res.rows, null, 2));

  await pool.end();
}

checkQiziltepa24().catch(console.error);
