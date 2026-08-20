const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://postgres:dinara2002@localhost:5432/school_road_safety_db' });

async function check() {
  const res = await pool.query(`
    SELECT u.email, u.password_hash, u.name, s.name as school_name, d.name as district_name, r.name as region_name 
    FROM users u 
    JOIN schools s ON u.school_id = s.id 
    JOIN districts d ON s.district_id = d.id 
    JOIN regions r ON s.region_id = r.id 
    WHERE d.name LIKE '%ijduvon%' AND s.name = '24-maktab';
  `);

  console.log('Gijduvon 24-maktab credentials:', JSON.stringify(res.rows, null, 2));
  pool.end();
}

check().catch(console.error);
